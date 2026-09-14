from __future__ import annotations

import base64
import io
from functools import lru_cache
from pathlib import Path

import numpy as np
import torch
from fastapi import HTTPException, UploadFile
from PIL import Image, UnidentifiedImageError

from app.core.config import settings
from app.services.stroke_model import load_model, prepare_image


@lru_cache(maxsize=1)
def get_model():
    model_path = Path(settings.model_path)
    if not model_path.exists():
        raise RuntimeError(f"Model checkpoint not found: {model_path}")
    return load_model(model_path, torch.device("cpu"))


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


async def analyze_upload(upload: UploadFile, threshold: float | None = None) -> dict[str, object]:
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
    selected_threshold = settings.model_threshold if threshold is None else max(0.0, min(1.0, threshold))
    model = get_model()
    tensor = prepare_image(image, settings.model_input_size)
    with torch.inference_mode():
        probabilities = torch.sigmoid(model(tensor))[0, 0]
    mask = probabilities.ge(selected_threshold).to(torch.uint8).mul(255).numpy()
    detected = bool(mask.any())
    positive = probabilities[mask > 0]
    confidence = float(positive.mean().item()) if detected else float((1 - probabilities).mean().item())

    mask_image = Image.fromarray(mask, mode="L")
    buffer = io.BytesIO()
    mask_image.save(buffer, format="PNG", optimize=True)
    return {
        "filename": upload.filename or "scan",
        "input_size": [settings.model_input_size, settings.model_input_size],
        "lesion_detected": detected,
        "label": "Lesion detected" if detected else "No lesion detected",
        "confidence": round(confidence, 4),
        "threshold": selected_threshold,
        "mask_width": settings.model_input_size,
        "mask_height": settings.model_input_size,
        "mask_png_base64": base64.b64encode(buffer.getvalue()).decode("ascii"),
    }