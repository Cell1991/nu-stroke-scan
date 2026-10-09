from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Callable

import numpy as np
import torch
from PIL import Image
from torch import Tensor, nn

from app.architectures import build_dlka, build_patcher, build_vcanet


def strip_orig_mod_prefix(state_dict: dict, prefix: str = "_orig_mod.") -> dict:
    """Undo the torch.compile() key prefix so a plain module can strict-load a checkpoint."""
    return {(k[len(prefix) :] if k.startswith(prefix) else k): v for k, v in state_dict.items()}


def map_patcher_keys(state_dict: dict) -> dict:
    """Remap PyTorch Lightning checkpoint keys to PatcherSegFormer keys."""
    mapped = {}
    for k, v in state_dict.items():
        if k.startswith("model.backbone."):
            mapped[k[len("model.backbone.") :]] = v
        elif k.startswith("model.decode_head."):
            mapped[k[len("model.decode_head.") :]] = v
    return mapped


@dataclass(frozen=True)
class ModelSpec:
    id: str
    label: str
    input_size: int
    norm_mean: list[float] | None
    norm_std: list[float] | None
    outputs_probability: bool
    build: Callable[[], nn.Module]


# DLKA normalization stats from training config
_DLKA_NORM_MEAN = [0.17936552250532273]
_DLKA_NORM_STD = [0.30729273223622366]

# Patcher normalization stats (CT HU / intensity stats: 54.305 / 255, 148.049 / 255)
_PATCHER_NORM_MEAN = [54.305244 / 255.0]
_PATCHER_NORM_STD = [148.0489 / 255.0]

MODEL_SPECS: dict[str, ModelSpec] = {
    "vcanet": ModelSpec(
        id="vcanet",
        label="VCA-Net",
        input_size=224,
        norm_mean=None,
        norm_std=None,
        outputs_probability=False,
        build=build_vcanet,
    ),
    "dlka": ModelSpec(
        id="dlka",
        label="Deformable LKA",
        input_size=224,
        norm_mean=_DLKA_NORM_MEAN,
        norm_std=_DLKA_NORM_STD,
        outputs_probability=False,
        build=build_dlka,
    ),
    "patcher": ModelSpec(
        id="patcher",
        label="Patcher (SegFormer)",
        input_size=256,
        norm_mean=_PATCHER_NORM_MEAN,
        norm_std=_PATCHER_NORM_STD,
        outputs_probability=False,
        build=build_patcher,
    ),
}


def load_model(spec: ModelSpec, checkpoint_path: Path, device: torch.device) -> nn.Module:
    if not checkpoint_path.is_file():
        raise RuntimeError(f"Model checkpoint not found: {checkpoint_path}")

    model = spec.build()
    checkpoint = torch.load(checkpoint_path, map_location=device, weights_only=False)

    if spec.id == "patcher":
        sd = checkpoint.get("state_dict", checkpoint)
        mapped = map_patcher_keys(sd)
        model.load_state_dict(mapped, strict=True)
    else:
        sd = checkpoint.get("state_dict", checkpoint)
        cleaned = strip_orig_mod_prefix(sd)
        model.load_state_dict(cleaned, strict=True)

    model.to(device).eval()
    return model


CLASSIFICATION_CLASSES = [
    {"id": "normal", "label": "Normal (No Stroke)"},
    {"id": "hemorrhagic", "label": "Hemorrhagic Stroke"},
    {"id": "ischemic", "label": "Ischemic Stroke"},
]


def load_classifier(checkpoint_path: Path, device: torch.device) -> nn.Module:
    import logging
    import timm

    logger = logging.getLogger(__name__)

    if not checkpoint_path.is_file():
        raise RuntimeError(f"Classifier checkpoint not found: {checkpoint_path}")

    checkpoint = torch.load(checkpoint_path, map_location=device, weights_only=False)
    sd = checkpoint.get("state_dict", checkpoint)
    cleaned = strip_orig_mod_prefix(sd)

    # Automatically detect and support MaxViT architecture variant (base, tiny, small)
    for model_name in ["maxvit_base_tf_224", "maxvit_tiny_tf_224", "maxvit_small_tf_224"]:
        try:
            model = timm.create_model(model_name, pretrained=False, num_classes=3)
            model.load_state_dict(cleaned, strict=True)
            logger.info("Successfully loaded classifier architecture '%s' from %s", model_name, checkpoint_path)
            model.to(device).eval()
            return model
        except Exception:
            continue

    raise RuntimeError(f"Failed to load classifier checkpoint into supported MaxViT architectures: {checkpoint_path}")



def prepare_image_for_classifier(image: Image.Image, device: torch.device) -> Tensor:
    imagenet_mean = torch.tensor([0.485, 0.456, 0.406], device=device).view(1, 3, 1, 1)
    imagenet_std = torch.tensor([0.229, 0.224, 0.225], device=device).view(1, 3, 1, 1)

    grayscale = image.convert("L").resize((224, 224), Image.BILINEAR)
    arr = np.asarray(grayscale, dtype=np.float32) / 255.0
    tensor = torch.from_numpy(arr).float().to(device).unsqueeze(0).unsqueeze(0).repeat(1, 3, 1, 1)
    tensor = (tensor - imagenet_mean) / imagenet_std
    return tensor


def prepare_image(
    image: Image.Image,
    size: int,
    mean: list[float] | None = None,
    std: list[float] | None = None,
) -> Tensor:
    grayscale = image.convert("L").resize((size, size), Image.BILINEAR)
    array = np.asarray(grayscale, dtype=np.float32) / 255.0
    tensor = torch.from_numpy(array).unsqueeze(0).unsqueeze(0)  # (1, 1, H, W)
    if mean is not None and std is not None:
        mean_t = torch.tensor(mean, dtype=torch.float32).view(1, -1, 1, 1)
        std_t = torch.tensor(std, dtype=torch.float32).view(1, -1, 1, 1)
        tensor = (tensor - mean_t) / std_t
    return tensor


def load_modality_screener(checkpoint_path: Path, device: torch.device) -> nn.Module:
    """Load ResNet-18 modality verification gatekeeper checkpoint."""
    import torchvision.models as models

    if not checkpoint_path.is_file():
        raise RuntimeError(f"Modality screener checkpoint not found: {checkpoint_path}")

    model = models.resnet18(weights=None)
    model.fc = nn.Linear(512, 2)
    checkpoint = torch.load(checkpoint_path, map_location=device, weights_only=False)
    sd = checkpoint.get("state_dict", checkpoint)
    cleaned = strip_orig_mod_prefix(sd)
    model.load_state_dict(cleaned, strict=True)
    model.to(device).eval()
    return model


def prepare_image_for_modality(image: Image.Image, device: torch.device) -> Tensor:
    """Prepare RGB image normalized with ImageNet stats for ResNet-18 modality screener."""
    imagenet_mean = torch.tensor([0.485, 0.456, 0.406], device=device).view(1, 3, 1, 1)
    imagenet_std = torch.tensor([0.229, 0.224, 0.225], device=device).view(1, 3, 1, 1)

    rgb = image.convert("RGB").resize((224, 224), Image.BILINEAR)
    arr = np.asarray(rgb, dtype=np.float32) / 255.0  # (224, 224, 3)
    tensor = torch.from_numpy(arr).permute(2, 0, 1).float().to(device).unsqueeze(0)  # (1, 3, 224, 224)
    tensor = (tensor - imagenet_mean) / imagenet_std
    return tensor
