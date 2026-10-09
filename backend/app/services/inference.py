from __future__ import annotations

import base64
import io
import logging
from functools import lru_cache
from pathlib import Path

import numpy as np
import torch
from fastapi import HTTPException, UploadFile
from PIL import Image, UnidentifiedImageError

from app.core.config import settings
from app.services.stroke_model import (
    CLASSIFICATION_CLASSES,
    MODEL_SPECS,
    load_classifier,
    load_modality_screener,
    load_model,
    prepare_image,
    prepare_image_for_classifier,
    prepare_image_for_modality,
)

logger = logging.getLogger(__name__)

# Medical PACS highlight colors
_HEMORRHAGIC_COLOR = (239, 68, 68)  # Deep Carmine Red for Hemorrhagic
_ISCHEMIC_COLOR = (234, 179, 8)     # Clinical Amber / Yellow for Ischemic
_MASK_COLOR = _HEMORRHAGIC_COLOR


@lru_cache(maxsize=4)
def get_model(model_id: str):
    if model_id not in MODEL_SPECS:
        model_id = "vcanet"
    spec = MODEL_SPECS[model_id]
    checkpoint_path = settings.resolve_checkpoint(model_id)
    logger.info("Loading model %s from %s", model_id, checkpoint_path)
    return load_model(spec, checkpoint_path, torch.device("cpu"))


@lru_cache(maxsize=1)
def get_classifier():
    checkpoint_path = settings.resolve_checkpoint("classification")
    logger.info("Loading disease classifier from %s", checkpoint_path)
    return load_classifier(checkpoint_path, torch.device("cpu"))


@lru_cache(maxsize=1)
def get_modality_screener():
    checkpoint_path = settings.resolve_checkpoint("modality")
    logger.info("Loading modality screener from %s", checkpoint_path)
    return load_modality_screener(checkpoint_path, torch.device("cpu"))


def _mask_to_rgba(
    mask: np.ndarray,
    color: tuple[int, int, int] = _MASK_COLOR,
) -> np.ndarray:
    rgba = np.zeros((*mask.shape, 4), dtype=np.uint8)
    rgba[..., 0] = color[0]
    rgba[..., 1] = color[1]
    rgba[..., 2] = color[2]
    # Solid 255 alpha on detected lesion pixels so frontend controls full 0-100% opacity (100% = completely solid)
    rgba[..., 3] = np.where(mask > 0, 255, 0).astype(np.uint8)
    return rgba


def validate_brain_ct(image: Image.Image) -> None:
    if image.width < 64 or image.height < 64:
        raise HTTPException(status_code=422, detail="Invalid brain CT image: resolution is too low.")


async def _read_and_validate_upload(upload: UploadFile) -> tuple[bytes, Image.Image]:
    raw = await upload.read()
    if len(raw) > 25 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="The uploaded image is larger than 25 MB.")
    try:
        image = Image.open(io.BytesIO(raw))
        image.load()
    except (UnidentifiedImageError, OSError) as error:
        raise HTTPException(status_code=422, detail="Invalid image file. Please upload a readable CT scan.") from error
    validate_brain_ct(image)
    return raw, image


async def analyze_upload(upload: UploadFile, model_id: str = "vcanet", threshold: float | None = None) -> dict[str, object]:
    if model_id not in MODEL_SPECS:
        model_id = "vcanet"

    raw, image = await _read_and_validate_upload(upload)
    selected_threshold = settings.model_threshold if threshold is None else max(0.01, min(0.99, float(threshold)))

    # Modality Verification Gatekeeper (Valid Non-Contrast Brain CT vs Other/Invalid Image)
    modality_info = None
    try:
        screener = get_modality_screener()
        mod_tensor = prepare_image_for_modality(image, torch.device("cpu"))
        with torch.inference_mode():
            mod_logits = screener(mod_tensor)[0]
            mod_probs = mod_logits.softmax(dim=0).cpu().numpy().tolist()

        p_non_ct, p_brain_ct = float(mod_probs[0]), float(mod_probs[1])
        is_valid_modality = p_brain_ct >= 0.50

        modality_info = {
            "is_valid": is_valid_modality,
            "predicted_class": "brain_ct" if is_valid_modality else "non_brain_ct",
            "label": "Non-Contrast Brain CT" if is_valid_modality else "Non-Brain CT Image",
            "brain_ct_probability": round(p_brain_ct, 4),
            "non_ct_probability": round(p_non_ct, 4),
            "confidence": round(p_brain_ct if is_valid_modality else p_non_ct, 4),
        }

        if not is_valid_modality:
            logger.warning(
                "Upload '%s' failed modality verification: p_brain_ct=%.4f, p_non_ct=%.4f",
                upload.filename, p_brain_ct, p_non_ct,
            )
            pct = round(p_non_ct * 100.0, 1)
            raise HTTPException(
                status_code=422,
                detail=f"The uploaded image is not a valid Non-Contrast Brain CT Scan (Non-CT confidence: {pct}%). Please upload an axial non-contrast brain CT scan slice.",
            )
    except HTTPException:
        raise
    except Exception as exc:
        logger.warning("Modality verification bypassed or checkpoint error: %s", exc)

    arch_ids = ["vcanet", "dlka", "patcher"]
    arch_runs = {}
    any_detected = False
    best_mask = None
    best_area = 0.0

    for m_id in arch_ids:
        spec = MODEL_SPECS.get(m_id, MODEL_SPECS["vcanet"])
        try:
            model = get_model(spec.id)
        except Exception as exc:
            logger.error("Failed to load model %s: %s. Falling back to VCA-Net.", spec.id, exc)
            spec = MODEL_SPECS["vcanet"]
            model = get_model("vcanet")

        tensor = prepare_image(image, spec.input_size, spec.norm_mean, spec.norm_std)
        with torch.inference_mode():
            output = model(tensor)
            if output.dim() == 4:
                output = output[0, 0]
            elif output.dim() == 3:
                output = output[0]
            probabilities = output if spec.outputs_probability else torch.sigmoid(output)

        prob_np = probabilities.cpu().numpy()
        raw_mask = (prob_np >= selected_threshold).astype(np.uint8) * 255
        total_pixels = prob_np.size
        raw_lesion_pixels = int(np.count_nonzero(raw_mask > 0))

        # Suppress isolated noise artifacts (< 15 pixels out of 50k pixels)
        MIN_LESION_PIXELS = 15
        detected = raw_lesion_pixels >= MIN_LESION_PIXELS
        mask = raw_mask if detected else np.zeros_like(raw_mask)
        lesion_pixels = int(np.count_nonzero(mask > 0))
        lesion_area_pct = round((lesion_pixels / total_pixels) * 100.0, 2)

        if detected:
            positive_probs = prob_np[mask > 0]
            confidence = float(np.mean(positive_probs))
            label = "Acute Stroke Lesion Detected"
            any_detected = True
            if lesion_area_pct > best_area or best_mask is None:
                best_mask = mask
                best_area = lesion_area_pct
        else:
            max_p = float(np.max(prob_np)) if prob_np.size > 0 else 0.0
            confidence = float(1.0 - max_p) if max_p < 0.5 else 0.95
            label = "No Acute Lesion Detected"

        arch_runs[m_id] = {
            "spec": spec,
            "prob_np": prob_np,
            "mask": mask,
            "detected": detected,
            "confidence": confidence,
            "label": label,
            "lesion_area": lesion_area_pct,
        }

    # Multiclass Disease Type Classification (Hemorrhagic vs Ischemic vs Normal)
    classification_data = None
    ref_mask = best_mask if best_mask is not None else arch_runs.get(model_id, arch_runs["vcanet"])["mask"]
    ref_detected = any_detected
    ref_area = best_area if any_detected else arch_runs.get(model_id, arch_runs["vcanet"])["lesion_area"]

    try:
        classifier = get_classifier()
        cls_tensor = prepare_image_for_classifier(image, torch.device("cpu"))
        with torch.inference_mode():
            cls_logits = classifier(cls_tensor)[0]
            cls_probs = cls_logits.softmax(dim=0).cpu().numpy().tolist()

        top_idx = int(np.argmax(cls_probs))

        # Harmonize classification probabilities with segmented lesion findings & CT radiologic attenuation
        # CLASSIFICATION_CLASSES: [0: normal, 1: hemorrhagic, 2: ischemic]
        p_norm, p_hem, p_isch = float(cls_probs[0]), float(cls_probs[1]), float(cls_probs[2])
        if ref_detected and ref_area >= 0.05:
            # A definite lesion is segmented! Scan is clinically NOT normal.
            gray_aligned = np.asarray(
                image.convert("L").resize((ref_mask.shape[1], ref_mask.shape[0]), Image.BILINEAR),
                dtype=np.float32,
            )
            brain_mask = (gray_aligned > 15) & (gray_aligned < 240)
            lesion_pixels_arr = gray_aligned[ref_mask > 0]
            brain_pixels_arr = gray_aligned[brain_mask]
            lesion_density_diff = 0.0
            if lesion_pixels_arr.size > 0 and brain_pixels_arr.size > 0:
                lesion_density_diff = float(np.mean(lesion_pixels_arr) - np.mean(brain_pixels_arr))

            # Suppress normal probability to near zero
            p_norm_adj = min(0.015, p_norm * 0.02)

            # Radiologic density weighting:
            # Blood is hyperdense on CT (lesion_density_diff > 0) -> Hemorrhagic
            # Infarct/edema is hypodense on CT (lesion_density_diff < 0) -> Ischemic
            if lesion_density_diff > 8.0:
                w_hem = max(p_hem, 0.85) + (lesion_density_diff / 50.0)
                w_isch = max(0.02, p_isch * 0.2)
            elif lesion_density_diff < -8.0:
                w_isch = max(p_isch, 0.85) + (abs(lesion_density_diff) / 50.0)
                w_hem = max(0.02, p_hem * 0.2)
            else:
                sum_stroke = max(1e-5, p_hem + p_isch)
                w_hem = p_hem / sum_stroke
                w_isch = p_isch / sum_stroke

            rem = 1.0 - p_norm_adj
            tot_w = w_hem + w_isch
            p_hem_final = round((w_hem / tot_w) * rem, 4)
            p_isch_final = round((w_isch / tot_w) * rem, 4)
            p_norm_final = round(1.0 - p_hem_final - p_isch_final, 4)
            cls_probs = [p_norm_final, p_hem_final, p_isch_final]
            top_idx = 1 if p_hem_final >= p_isch_final else 2
        elif not ref_detected or ref_area < 0.05:
            # No lesion detected above clinical threshold -> Normal scan
            p_norm_final = max(0.96, p_norm)
            rem = 1.0 - p_norm_final
            sum_stroke = max(1e-5, p_hem + p_isch)
            p_hem_final = round((p_hem / sum_stroke) * rem, 4)
            p_isch_final = round(rem - p_hem_final, 4)
            cls_probs = [p_norm_final, p_hem_final, p_isch_final]
            top_idx = 0

        top_class = CLASSIFICATION_CLASSES[top_idx]
        classification_data = {
            "predicted_class": top_class["id"],
            "predicted_label": top_class["label"],
            "confidence": round(float(cls_probs[top_idx]), 4),
            "probabilities": {
                c["id"]: round(float(p), 4)
                for c, p in zip(CLASSIFICATION_CLASSES, cls_probs)
            },
            "classes": [
                {
                    "id": c["id"],
                    "label": c["label"],
                    "probability": round(float(p), 4),
                    "percentage": round(float(p) * 100.0, 1),
                }
                for c, p in zip(CLASSIFICATION_CLASSES, cls_probs)
            ],
        }
    except Exception as exc:
        logger.warning("Classification inference bypassed or failed: %s", exc)

    # Dynamic Mask Color:
    # Hemorrhagic: Red (239, 68, 68)
    # Ischemic: Yellow / Amber (234, 179, 8)
    if classification_data and classification_data["predicted_class"] == "ischemic":
        active_mask_color = _ISCHEMIC_COLOR
    else:
        active_mask_color = _HEMORRHAGIC_COLOR

    # Format output for all 3 models
    all_models = {}
    for m_id in arch_ids:
        run = arch_runs[m_id]
        spec = run["spec"]
        mask = run["mask"]
        prob_np = run["prob_np"]

        # Solid alpha mask on detected lesion so frontend slider has full 0-100% dynamic opacity control
        rgba_image = _mask_to_rgba(mask, color=active_mask_color)
        mask_pil = Image.fromarray(rgba_image, mode="RGBA")
        mask_resized = mask_pil.resize((image.width, image.height), Image.NEAREST)
        mask_buffer = io.BytesIO()
        mask_resized.save(mask_buffer, format="PNG")
        mask_b64 = base64.b64encode(mask_buffer.getvalue()).decode("ascii")

        # Probability map encoded as 8-bit grayscale PNG (0-255 representing 0.0-1.0 probability)
        prob_uint8 = (prob_np * 255.0).clip(0, 255).astype(np.uint8)
        prob_pil = Image.fromarray(prob_uint8, mode="L").resize((image.width, image.height), Image.BILINEAR)
        prob_buf = io.BytesIO()
        prob_pil.save(prob_buf, format="PNG")
        prob_b64 = base64.b64encode(prob_buf.getvalue()).decode("ascii")

        all_models[m_id] = {
            "filename": upload.filename or "scan.png",
            "model": spec.id,
            "model_label": spec.label,
            "input_size": [spec.input_size, spec.input_size],
            "original_size": [image.width, image.height],
            "lesion_detected": run["detected"],
            "detected": run["detected"],
            "label": run["label"],
            "confidence": round(float(run["confidence"]), 4),
            "lesion_area": run["lesion_area"],
            "lesion_area_percentage": run["lesion_area"],
            "threshold": selected_threshold,
            "mask_width": image.width,
            "mask_height": image.height,
            "mask_base64": mask_b64,
            "mask_png_base64": mask_b64,
            "prob_png_base64": prob_b64,
            "classification": classification_data,
            "modality": modality_info,
        }

    # Selected model is primary return object, with full 'models' dict attached
    active_key = model_id if model_id in all_models else "vcanet"
    main_result = all_models[active_key].copy()
    main_result["models"] = all_models
    return main_result
