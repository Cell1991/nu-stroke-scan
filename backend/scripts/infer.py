"""Unified single-image inference CLI for all 4 trained models in NU Stroke Scan:
1. Disease Classification (MaxViT: Hemorrhagic vs Ischemic vs Normal)
2. VCA-Net (Visual Cortex Attention Network Segmentation)
3. Deformable LKA (MaxViT + Large Kernel Attention Segmentation)
4. Patcher (Patch SegFormer Architecture Segmentation)

Usage:
    python backend/scripts/infer.py --model classification --image scan.png
    python backend/scripts/infer.py --model vcanet          --image scan.png
    python backend/scripts/infer.py --model dlka            --image scan.png
    python backend/scripts/infer.py --model patcher         --image scan.png
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

import numpy as np
import torch
from PIL import Image

HERE = Path(__file__).resolve().parent
BACKEND_DIR = HERE.parent
ROOT = BACKEND_DIR.parent
CHECKPOINTS_DIR = ROOT / "checkpoints"

sys.path.insert(0, str(BACKEND_DIR))

from app.services.stroke_model import (
    CLASSIFICATION_CLASSES,
    MODEL_SPECS,
    load_classifier,
    load_model,
    prepare_image,
    prepare_image_for_classifier,
)


def load_image_224(path: Path) -> np.ndarray:
    if path.suffix == ".npy":
        return np.load(path).astype(np.float32)
    image = Image.open(path).convert("L").resize((224, 224), Image.BILINEAR)
    return np.asarray(image, dtype=np.float32) / 255.0


def save_mask(mask: np.ndarray, image_path: Path, output: Path | None) -> Path:
    out_path = output or image_path.with_name(image_path.stem + "_mask.png")
    Image.fromarray((mask * 255).astype(np.uint8)).save(out_path)
    return out_path


def report_segmentation(probs: np.ndarray, threshold: float, image_path: Path, output: Path | None):
    mask = probs > threshold
    detected = bool(mask.any())
    confidence = float(probs[mask].mean()) if detected else float((1 - probs).mean())
    out_path = save_mask(mask, image_path, output)
    print(f"lesion_detected: {detected}")
    print(f"confidence:      {confidence:.4f}")
    print(f"lesion coverage: {mask.mean():.4%} of image")
    print(f"mask saved to:   {out_path}")


def run_classification(image_path: Path, checkpoint: str | None):
    ckpt_path = Path(checkpoint) if checkpoint else (CHECKPOINTS_DIR / "classification_best.pth")
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = load_classifier(ckpt_path, device)

    image = Image.open(image_path)
    tensor = prepare_image_for_classifier(image, device)

    with torch.no_grad():
        probs = model(tensor).softmax(dim=1)[0].cpu().numpy().tolist()

    pred_idx = int(np.argmax(probs))
    pred_class = CLASSIFICATION_CLASSES[pred_idx]
    print(f"Predicted Diagnosis: {pred_class['label']}")
    print(f"Confidence:          {probs[pred_idx]:.4f}")
    print("Class Probabilities:")
    for c, p in zip(CLASSIFICATION_CLASSES, probs):
        print(f"  {c['label']:22s} {p*100:6.2f}%")


def run_segmentation(model_id: str, image_path: Path, checkpoint: str | None, threshold: float, output: Path | None):
    spec = MODEL_SPECS[model_id]
    target_ckpt = {
        "vcanet": CHECKPOINTS_DIR / "vcanet_best.pth",
        "dlka": CHECKPOINTS_DIR / "dlka_best.pth",
        "patcher": CHECKPOINTS_DIR / "patcher_best.ckpt",
    }[model_id]

    ckpt_path = Path(checkpoint) if checkpoint else target_ckpt
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = load_model(spec, ckpt_path, device)

    image = Image.open(image_path)
    tensor = prepare_image(image, spec.input_size, spec.norm_mean, spec.norm_std).to(device)

    with torch.no_grad():
        out = model(tensor)
        if out.dim() == 4:
            out = out[0, 0]
        elif out.dim() == 3:
            out = out[0]
        probs = (out if spec.outputs_probability else torch.sigmoid(out)).cpu().numpy()

    report_segmentation(probs, threshold, image_path, output)


def main():
    ap = argparse.ArgumentParser(description="NU Stroke Scan Unified CLI")
    ap.add_argument("--model", required=True, choices=["classification", "vcanet", "dlka", "patcher"])
    ap.add_argument("--image", required=True, type=Path)
    ap.add_argument("--checkpoint", default=None, help="Path to checkpoint file")
    ap.add_argument("--threshold", type=float, default=0.5, help="Segmentation threshold cutoff")
    ap.add_argument("--output", type=Path, default=None, help="Output mask destination")
    args = ap.parse_args()

    if args.model == "classification":
        run_classification(args.image, args.checkpoint)
    else:
        run_segmentation(args.model, args.image, args.checkpoint, args.threshold, args.output)


if __name__ == "__main__":
    main()
