from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Callable

import numpy as np
import torch
from PIL import Image
from torch import Tensor, nn


def strip_orig_mod_prefix(state_dict: dict, prefix: str = "_orig_mod.") -> dict:
    """Undo the torch.compile() key prefix so a plain module can strict-load a checkpoint."""
    return {(k[len(prefix) :] if k.startswith(prefix) else k): v for k, v in state_dict.items()}


def _build_vcanet() -> nn.Module:
    # Resolves via PYTHONPATH=/model-src/vcanet_ct (see docker-compose.yml) --
    # the real, trained architecture, not a hand-rolled reimplementation.
    from model import VCANet  # type: ignore[import-not-found]

    return VCANet(in_channels=1, out_channels=1)


def _build_dlka() -> nn.Module:
    # Resolves via PYTHONPATH=/model-src/dlka_ct_2d (see docker-compose.yml).
    from networks.MaxViT_deform_LKA import MaxViT_deformableLKAFormer  # type: ignore[import-not-found]

    return MaxViT_deformableLKAFormer(num_classes=1)


@dataclass(frozen=True)
class ModelSpec:
    id: str
    label: str
    input_size: int
    norm_mean: list[float] | None
    norm_std: list[float] | None
    outputs_probability: bool  # True: forward() already ends in sigmoid. False: raw logits.
    build: Callable[[], nn.Module]


# DLKA normalization stats from dlka_ct/2D/eval_external.py / compute_norm_stats.py.
_DLKA_NORM_MEAN = [0.17936552250532273]
_DLKA_NORM_STD = [0.30729273223622366]

MODEL_SPECS: dict[str, ModelSpec] = {
    "vcanet": ModelSpec(
        id="vcanet",
        label="VCA-Net",
        input_size=224,
        norm_mean=None,
        norm_std=None,
        outputs_probability=True,
        build=_build_vcanet,
    ),
    "dlka": ModelSpec(
        id="dlka",
        label="Deformable LKA",
        input_size=224,
        norm_mean=_DLKA_NORM_MEAN,
        norm_std=_DLKA_NORM_STD,
        outputs_probability=False,
        build=_build_dlka,
    ),
}


def load_model(spec: ModelSpec, checkpoint_path: Path, device: torch.device) -> nn.Module:
    if not checkpoint_path.is_file():
        raise RuntimeError(f"Model checkpoint not found: {checkpoint_path}")
    model = spec.build()
    checkpoint = torch.load(checkpoint_path, map_location=device, weights_only=True)
    model.load_state_dict(strip_orig_mod_prefix(checkpoint), strict=True)
    model.to(device).eval()
    return model


def prepare_image(image: Image.Image, size: int, mean: list[float] | None = None, std: list[float] | None = None) -> Tensor:
    grayscale = image.convert("L").resize((size, size), Image.BILINEAR)
    array = np.asarray(grayscale, dtype=np.float32) / 255.0
    tensor = torch.from_numpy(array).unsqueeze(0).unsqueeze(0)  # (1, 1, H, W)
    if mean is not None and std is not None:
        mean_t = torch.tensor(mean, dtype=torch.float32).view(1, -1, 1, 1)
        std_t = torch.tensor(std, dtype=torch.float32).view(1, -1, 1, 1)
        tensor = (tensor - mean_t) / std_t
    return tensor
