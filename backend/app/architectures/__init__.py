from __future__ import annotations

import sys
from pathlib import Path
import torch.nn as nn

from app.architectures.vcanet import VCANet
from app.architectures.patcher import PatcherSegFormer


def build_vcanet() -> nn.Module:
    return VCANet(in_channels=1, out_channels=1)


def build_patcher() -> nn.Module:
    return PatcherSegFormer()


def build_dlka() -> nn.Module:
    dlka_dir = Path(__file__).parent / "dlka"
    if str(dlka_dir) not in sys.path:
        sys.path.insert(0, str(dlka_dir))

    from networks.MaxViT_deform_LKA import MaxViT_deformableLKAFormer

    return MaxViT_deformableLKAFormer(num_classes=1, pretrain=False)
