from __future__ import annotations

import base64
import io
from functools import lru_cache
from pathlib import Path

import httpx
import numpy as np
import torch
from fastapi import HTTPException, UploadFile
from PIL import Image, UnidentifiedImageError

from app.core.config import settings
from app.services.stroke_model import MODEL_SPECS, load_model, prepare_image

_CHECKPOINTS = {
    "vcanet": lambda: settings.vcanet_checkpoint,
    "dlka": lambda: settings.dlka_checkpoint,
}


@lru_cache(maxsize=None)
def get_model(model_id: str):
    spec = MODEL_SPECS[model_id]
    checkpoint_path = Path(_CHECKPOINTS[model_id]())
    return load_model(spec, checkpoint_path, torch.device("cpu"))


# Lesion highlight color. The mask is encoded as alpha (0 = fully
# transparent background, 255 = solid lesion) so the frontend can render it
# directly with plain opacity -- no CSS filter trickery needed to fake
# transparency out of an opaque grayscale image.
_MASK_COLOR = (220, 38, 38)


def _mask_to_rgba(mask: np.ndarray) -> np.ndarray:
    rgba = np.zeros((*mask.shape, 4), dtype=np.uint8)
    rgba[..., 0] = _MASK_COLOR[0]
    rgba[..., 1] = _MASK_COLOR[1]
    rgba[..., 2] = _MASK_COLOR[2]
    rgba[..., 3] = mask
    return rgba


def validate_brain_ct(image: Image.Image) -> None:
    if image.width < 128 or image.height < 128:
        raise HTTPException(status_code=422, detail="Invalid brain CT image: image resolution is too small.")

    rgb = np.asarray(image.convert("RGB"), dtype=np.float32) / 255.0
    channel_difference = np.mean(np.abs(rgb[:, :, 0] - rgb[:, :, 1])) + np.mean(np.abs(rgb[:, :, 1] - rgb[:, :, 2]))
    grayscale = np.mean(rgb, axis=2)
    border = np.concatenate((grayscale[0, :], grayscale[-1, :], grayscale[:, 0], grayscale[:, -1]))
    center = grayscale[grayscale.shape[0] // 4 : grayscale.shape[0] * 3 // 4, grayscale.shape[1] // 4 : grayscale.shape[1] * 3 // 4]
    if channel_difference > 0.08:
        raise HTTPException(status_code=422, detail="Invalid image: please upload a grayscale brain CT scan.")
    if float(center.mean()) < 0.08 or float(center.std()) < 0.025 or float(center.mean()) <= float(border.mean()) + 0.01:
        raise HTTPException(status_code=422, detail="Invalid image: the uploaded file does not look like a brain CT scan.")


async def _read_and_validate_upload(upload: UploadFile) -> tuple[bytes, Image.Image]:
    if not upload.content_type or not upload.content_type.startswith("image/"):
        raise HTTPException(status_code=422, detail="Invalid file: upload a PNG, JPG, or WEBP brain CT image.")
    raw = await upload.read()
    if len(raw) > 15 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="The uploaded image is larger than 15 MB.")
    try:
        image = Image.open(io.BytesIO(raw))
        image.load()
    except (UnidentifiedImageError, OSError) as error:
        raise HTTPException(status_code=422, detail="Invalid image file. Please upload a readable CT image.") from error
    validate_brain_ct(image)
    return raw, image


async def _analyze_patcher(raw: bytes, filename: str, content_type: str, threshold: float) -> dict[str, object]:
    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{settings.patcher_service_url}/infer",
                files={"file": (filename, raw, content_type)},
                data={"threshold": str(threshold)},
            )
    except httpx.HTTPError as error:
        raise HTTPException(status_code=502, detail="The Patcher model service is unavailable.") from error
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    payload = response.json()
    payload["model"] = "patcher"
    return payload


async def analyze_upload(upload: UploadFile, model_id: str = "vcanet", threshold: float | None = None) -> dict[str, object]:
    if model_id not in {"vcanet", "dlka", "patcher"}:
        raise HTTPException(status_code=422, detail=f"Unknown model '{model_id}'.")

    raw, image = await _read_and_validate_upload(upload)
    selected_threshold = settings.model_threshold if threshold is None else max(0.0, min(1.0, threshold))

    if model_id == "patcher":
        return await _analyze_patcher(raw, upload.filename or "scan", upload.content_type or "image/png", selected_threshold)

    spec = MODEL_SPECS[model_id]
    model = get_model(model_id)
    tensor = prepare_image(image, spec.input_size, spec.norm_mean, spec.norm_std)
    with torch.inference_mode():
        output = model(tensor)[0, 0]
        probabilities = output if spec.outputs_probability else torch.sigmoid(output)
    mask = probabilities.ge(selected_threshold).to(torch.uint8).mul(255).numpy()
    detected = bool(mask.any())
    positive = probabilities[mask > 0]
    confidence = float(positive.mean().item()) if detected else float((1 - probabilities).mean().item())

    mask_image = Image.fromarray(_mask_to_rgba(mask), mode="RGBA")
    buffer = io.BytesIO()
    mask_image.save(buffer, format="PNG", optimize=True)
    return {
        "filename": upload.filename or "scan",
        "input_size": [spec.input_size, spec.input_size],
        "lesion_detected": detected,
        "label": "Lesion detected" if detected else "No lesion detected",
        "confidence": round(confidence, 4),
        "threshold": selected_threshold,
        "mask_width": spec.input_size,
        "mask_height": spec.input_size,
        "mask_png_base64": base64.b64encode(buffer.getvalue()).decode("ascii"),
        "model": model_id,
    }
