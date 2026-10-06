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
from app.services.stroke_model import MODEL_SPECS, load_model, prepare_image

logger = logging.getLogger(__name__)

# Medical PACS highlight color (Carmine / Deep Red: 239, 68, 68)
_MASK_COLOR = (239, 68, 68)


@lru_cache(maxsize=4)
def get_model(model_id: str):
    if model_id not in MODEL_SPECS:
        model_id = "vcanet"
    spec = MODEL_SPECS[model_id]
    checkpoint_path = settings.resolve_checkpoint(model_id)
    logger.info("Loading model %s from %s", model_id, checkpoint_path)
    return load_model(spec, checkpoint_path, torch.device("cpu"))


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

    spec = MODEL_SPECS[model_id]
    try:
        model = get_model(model_id)
    except Exception as exc:
        logger.error("Failed to load requested model %s: %s. Falling back to VCA-Net.", model_id, exc)
        spec = MODEL_SPECS["vcanet"]
        model = get_model("vcanet")
        model_id = "vcanet"

    tensor = prepare_image(image, spec.input_size, spec.norm_mean, spec.norm_std)

    with torch.inference_mode():
        output = model(tensor)
        # Squeeze down to (H, W)
        if output.dim() == 4:
            output = output[0, 0]
        elif output.dim() == 3:
            output = output[0]
        probabilities = output if spec.outputs_probability else torch.sigmoid(output)

    prob_np = probabilities.cpu().numpy()
    mask = (prob_np >= selected_threshold).astype(np.uint8) * 255
    detected = bool((mask > 0).any())

    total_pixels = prob_np.size
    lesion_pixels = int(np.count_nonzero(mask > 0))
    lesion_area_pct = round((lesion_pixels / total_pixels) * 100.0, 2)

    if detected:
        positive_probs = prob_np[mask > 0]
        confidence = float(np.mean(positive_probs))
        label = "Acute Stroke Lesion Detected"
    else:
        confidence = float(1.0 - np.max(prob_np))
        label = "No Acute Lesion Detected"

    # Solid alpha mask on detected lesion so frontend slider has full 0-100% dynamic opacity control
    rgba_image = _mask_to_rgba(mask, color=_MASK_COLOR)
    mask_pil = Image.fromarray(rgba_image, mode="RGBA")

    # Resize mask to original uploaded image dimensions with crisp NEAREST interpolation
    mask_resized = mask_pil.resize((image.width, image.height), Image.NEAREST)

    buffer = io.BytesIO()
    mask_resized.save(buffer, format="PNG", optimize=True)
    mask_b64 = base64.b64encode(buffer.getvalue()).decode("ascii")

    return {
        "filename": upload.filename or "scan.png",
        "model": model_id,
        "model_label": spec.label,
        "input_size": [spec.input_size, spec.input_size],
        "original_size": [image.width, image.height],
        "lesion_detected": detected,
        "label": label,
        "confidence": round(float(confidence), 4),
        "lesion_area_percentage": lesion_area_pct,
        "threshold": selected_threshold,
        "mask_width": image.width,
        "mask_height": image.height,
        "mask_png_base64": mask_b64,
    }
