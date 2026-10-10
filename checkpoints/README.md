# Checkpoints Directory

This directory stores the production deep learning model weights used by the NU STROKE SCAN inference engine.

| Model ID | Architecture | File | Input Size | Preprocessing / Normalization | Output |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `vcanet` | Visual Cortex Attention Network (V1/V2/V4/IT) | `vcanet_best.pth` | 224 x 224 | Grayscale [0, 1] | Binary Lesion Mask |
| `dlka` | MaxViT + Deformable Large Kernel Attention | `dlka_best.pth` | 224 x 224 | Mean=0.1794, Std=0.3073 | Binary Lesion Mask |
| `patcher` | Pure PyTorch SegFormer / PatchTransformer | `patcher_best.ckpt` | 256 x 256 | Mean=0.2130, Std=0.5806 | Binary Lesion Mask |
| `classification` | Multiclass Stroke Classifier | `classification_best.pth` | 224 x 224 | Mean=0.485, Std=0.229 | Multi-class Probabilities |
| `modality` | Non-Contrast Brain CT Screener | `modality.pth` | 224 x 224 | Mean=0.485, Std=0.229 | Binary Modality Verification |

---

## 📥 How to Download Model Weights

Model weights are hosted in GitHub Releases [v1.0.0-weights](https://github.com/Cell1991/nu-stroke-scan/releases/tag/v1.0.0-weights).

### Option 1: Automatic Download (Recommended)
Run the automated downloader from the project root:
```bash
python scripts/download_checkpoints.py
```
*(On Windows, you can simply double-click `download_checkpoints.bat` or run `start.bat` / `start.ps1`, which automatically checks and downloads missing checkpoints before starting).*

### Option 2: Manual Download
Download the checkpoint assets from [GitHub Releases v1.0.0-weights](https://github.com/Cell1991/nu-stroke-scan/releases/tag/v1.0.0-weights) and place them directly into this `checkpoints/` folder.
