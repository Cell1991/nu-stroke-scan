# Checkpoints Directory

This directory stores the production deep learning model weights used by the NU STROKE SCAN inference engine.

| Model ID | Architecture | File | Input Size | Preprocessing / Normalization | Output |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `vcanet` | Visual Cortex Attention Network (V1/V2/V4/IT) | `vcanet_best.pth` | 224 x 224 | Grayscale [0, 1] | Binary Lesion Mask |
| `dlka` | MaxViT + Deformable Large Kernel Attention | `dlka_best.pth` | 224 x 224 | Mean=0.1794, Std=0.3073 | Binary Lesion Mask |
| `patcher` | Pure PyTorch SegFormer / PatchTransformer | `patcher_best.ckpt` | 256 x 256 | Mean=0.2130, Std=0.5806 | Binary Lesion Mask |

> **Note**: Binary model weights (`*.pth`, `*.ckpt`) are excluded from Git via `.gitignore`.
