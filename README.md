<div align="center">

<!-- Animated Medical Hero Banner -->
<img src="docs/assets/hero-banner.svg" alt="NU Stroke Scan Banner" width="100%" />

<br/><br/>

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.5%20%7C%201.12-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.0-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<br/>

<p align="center">
  <b>Detection and Localization of Brain Stroke Lesions in CT Images Using Deep Learning</b><br/>
  <i>Senior Research Thesis · Department of Computer Science and Information Technology, Faculty of Science, Naresuan University</i>
</p>

<!-- Animated Medical Divider -->
<img src="docs/assets/divider.svg" alt="Divider" width="100%" />

</div>

---

## Executive Summary & Research Background

**NU Stroke Scan** is an AI-powered **Clinical Decision Support System (CDSS)** developed as an undergraduate senior research thesis in Computer Science at Naresuan University (Academic Year 2/2568).

Stroke is one of the leading global and national causes of mortality and persistent disability. Rapid differential diagnosis between **Ischemic Stroke** (blood vessel occlusion) and **Hemorrhagic Stroke** (intracranial hemorrhage) on **Non-Contrast Brain Computed Tomography (NCCT)** is essential, as clinical therapeutic pathways differ fundamentally (Powers et al., 2019). While NCCT is universally available in emergency settings, manual radiological interpretation is constrained by radiologist availability, time sensitivity, and inter-observer diagnostic variability.

To address these challenges, this research implements a multi-model deep learning pipeline integrated into a modern clinical web platform:
1. **Comparative Lesion Segmentation Benchmark**: Implementing and evaluating three distinct deep learning architectures (**D-LKA Net**, **VCA-Net**, and **Patcher SegFormer**) under identical preprocessing and evaluation conditions (Zafari-Ghadim et al., 2024).
2. **Multiclass Disease Classification**: Deploying a fine-tuned **MaxViT** Transformer model categorizing scans into **Normal**, **Hemorrhagic Stroke**, and **Ischemic Stroke** (82.85% Test Accuracy, Macro-F1 76.35%).
3. **Radiologic Attenuation Harmonization**: Harmonizing deep learning outputs with CT Hounsfield density differences (hyperdense bleeding vs. hypodense infarct) and dynamic color-coded overlays (**Crimson Red** for Hemorrhagic, **Amber Yellow** for Ischemic).
4. **Clinical Diagnostic Workspace**: A web application featuring an interactive 2.5×–8.0× Diagnostic Loupe, 1:1 Synchronized Dual Viewport, Heuristic Input Guardrails, and Medical Composite Image Export.

---

<!-- Animated Medical Divider -->
<div align="center">
  <img src="docs/assets/divider.svg" alt="Divider" width="100%" />
</div>

## Clinical Diagnostic Workspace

<!-- Custom High-Definition SVG Features Matrix -->
<img src="docs/assets/features-grid.svg" alt="Clinical Workspace Features" width="100%" />

<br/>

The clinical interface is engineered for high-precision radiological examination and rapid decision support:

### 1. Real-Time 2.5× to 8.0× Diagnostic Loupe
- **Cursor Tracking**: Right-click anywhere on the scan to activate an optical magnifying loupe that tracks the mouse cursor in real-time.
- **Dynamic Scale Control**: Drag vertically or roll the mouse wheel within the active loupe to dynamically scale magnification from **1.2× up to 8.0×**, enabling sub-millimeter inspection of ischemic penumbral tissue and low-contrast lesion boundaries.

### 2. 1:1 Synchronized Dual-Pane Viewport
- **Comparative Side-by-Side Display**: Unaugmented raw NCCT scan (Left) alongside the AI-generated lesion probability overlay (Right).
- **Synchronized Navigation**: Pan and zoom (0.5× to 4.0×) are bidirectionally linked between both viewports, with a calibrated anatomical grid reticle for spatial coordinate referencing.

### 3. Dual-Color Lesion Mask & CT Density Harmonization
- **Color-Coded Diagnostic Masks**:
  - **Crimson Red (`#EF4444`)**: Indicates acute hemorrhagic lesions (hyperdense on CT).
  - **Amber / Yellow (`#F59E0B` / `#EAB308`)**: Indicates acute ischemic infarction (hypodense on CT).
- **Radiologic Attenuation Engine**: Automatically cross-references segmented lesion pixel densities ($\Delta\text{HU} > +8\text{ HU}$ vs. $\Delta\text{HU} < -8\text{ HU}$) with MaxViT classification logits to prevent discordant clinical outputs.

### 4. Zero-Latency Dynamic Thresholding & Noise Suppression
- **Continuous Grayscale Probability Streaming**: The backend streams 8-bit continuous probability maps, enabling the clinician to adjust decision sensitivity thresholds ($1\% \le t \le 99\%$) live on HTML5 Canvas without server round-trips.
- **Isolated Artifact Suppression**: Automatically suppresses false-positive noise artifacts smaller than 15 pixels.

### 5. Professional Medical Composite Image Export
- **PACS-Grade Framing**: Generates downloadable clinical composite images with dark slate framing, baking in active windowing (brightness, contrast), mask opacity, decision threshold, patient scan dimensions, and diagnostic summary metadata.

### 6. Formal Clinical Diagnostic Report (PDF) & Summary
- **Vector A4 PDF Report**: One-click generation of formal A4 clinical diagnostic reports using `jsPDF`, complete with patient file metadata, modality verification, dual-pane original vs. lesion scans, multi-class probability breakdown, and radiological recommendations.
- **Structured Clipboard Export**: One-click copy of clinical assessment findings to clipboard for EMR/PACS reporting.

### 7. Responsive Mobile Console with 360° MOBA Virtual Joystick
- **360° Free Analog Navigation**: Touchscreen virtual joystick designed for mobile review, offering full 360-degree continuous panning with analog speed scaling, pointer capture, and automatic spring-back.
- **Unified Quick Controls**: Integrated stepper zoom (`- 100% +`), grid toggle, center re-alignment, and calibration reset in a single high-tech gaming console.
- **Zero Desktop Interference**: Strictly isolated with Tailwind `lg:hidden` to ensure desktop workstation layout and mouse interactions remain 100% untouched.

---

<!-- Animated Medical Divider -->
<div align="center">
  <img src="docs/assets/divider.svg" alt="Divider" width="100%" />
</div>

## Deep Learning Suite & Experimental Results

<!-- Custom High-Definition SVG Models Suite -->
<img src="docs/assets/models-architecture.svg" alt="Deep Learning Suite Architecture" width="100%" />

<br/>

### 1. Lesion Segmentation Architectures & Adaptations

All models were adapted to process single-channel $224 \times 224$ normalized Brain CT tensors:

- **D-LKA Net (Deformable Large Kernel Attention Network)** (Azad et al., 2023):
  - **Encoder**: 4-stage hierarchical MaxViT backbone ($[2, 2, 5, 2]$ blocks) extracting multi-axis local grid and global axial attention features at resolutions $H/4, H/8, H/16, H/32$.
  - **Decoder**: 4-stage 2D D-LKA decoder with deformable convolution kernels that dynamically deform receptive fields to match irregular stroke contours.
  - **Loss Function**: $\mathcal{L}_{\text{D-LKA}} = 0.6 \cdot \mathcal{L}_{\text{Dice}} + 0.4 \cdot \mathcal{L}_{\text{BCE with Logits}}$.
  - **Optimization**: 100 epochs, batch size 8, SGD (initial LR 0.05) with `torch.compile()` and `bfloat16` autocast.

- **VCA-Net (Visual Cortex Anatomy Alike Neural Network)** (Li, 2021):
  - **Architecture**: Emulates the ventral visual pathway: V1 (6 conv layers with 4 parallel sub-paths), V2 (Inception multi-scale blocks), V4 (multi-scale feature integration), and Inferior Temporal (IT) bottleneck + 4 upsampling blocks.
  - **Loss Function**: Combined Focal Loss, Dice Loss, and BCELoss (with numerical stability value clamping on EML Loss).
  - **Optimization**: 100 epochs, `torch.compile()` and `bfloat16` autocast.

- **Patcher SegFormer (Patch Transformer + Mixture-of-Experts Decoder)** (Ou et al., 2023):
  - **Encoder**: 4 stacked Patcher blocks grouping pixels into $32 \times 32$ regions (8px overlap padding) and $2 \times 2$ patch tokens into Vision Transformers.
  - **Decoder**: Mixture-of-Experts (MoE) 4-stage gating network computing per-pixel expert weights.
  - **Runtime**: Isolated microservice running PyTorch 1.12.1 + `mmcv-full` on port `8001`.
  - **Loss Function**: $\mathcal{L}_{\text{Patcher}} = \mathcal{L}_{\text{BCE}} + \mathcal{L}_{\text{IoU}}$.

### 2. Quantitative Segmentation Benchmark on External Test Set ($n=199$ cases)

Evaluated on an independent external test set of 199 Brain CT cases (35 lesion-positive, 164 no-lesion) using three standardized Dice Similarity Coefficient (DSC) metrics:

| Model Architecture | Aggregated DSC (Pixel-Pooled) | Slice-Based DSC (Lesion-Only) | Volume-Based DSC (All Cases) | Backbone Architecture |
| :--- | :---: | :---: | :---: | :--- |
| **D-LKA Net** | **0.5355** | **0.8758** | 0.7621 | MaxViT + Deformable LKA Decoder |
| **VCA-Net** | 0.5150 | 0.8063 | **0.7800** | Visual Cortex Ventral Pathway CNN |
| **Patcher SegFormer** | *Pending* | *Pending* | *Pending* | Patch Transformer + MoE Decoder |

> **Key Finding**: D-LKA Net achieves superior delineation of true lesion boundaries (Slice-based DSC 0.8758 vs. 0.8063), while VCA-Net demonstrates strong true-negative background specificity across non-lesion slices (Volume-based DSC 0.7800).

### 3. Multiclass Disease-Type Classification (MaxViT)

A dedicated classification model was fine-tuned to categorize scans into 3 disease classes:

| Classification Metric | Test Set Score ($n=997$ Cases) | Class-Wise F1-Score Breakdown | Training Details |
| :--- | :---: | :--- | :--- |
| **Overall Accuracy** | **82.85%** | • **Normal**: $F_1 = 0.894$<br/>• **Hemorrhagic**: $F_1 = 0.713$<br/>• **Ischemic**: $F_1 = 0.684$ | • Backbone: `maxvit_tiny_tf_224`<br/>• Pretrained ImageNet weights<br/>• Class-weighted Cross-Entropy<br/>• Early stopping (Epoch 70) |
| **Macro Precision** | **76.48%** |
| **Macro Recall** | **76.26%** |
| **Macro F1-Score** | **76.35%** |

---

<!-- Animated Medical Divider -->
<div align="center">
  <img src="docs/assets/divider.svg" alt="Divider" width="100%" />
</div>

## Preprocessing Pipeline (5-Step Unified Protocol)

```
Raw DICOM Scan ➔ [1. CT Windowing (WL:40, WW:80)] ➔ [2. HSV Mask Extraction]
               ➔ [3. Case-Level Patient Split]    ➔ [4. Resize 224×224 & Normalize]
               ➔ [5. Offline Albumentations Data Augmentation] ➔ .npy + manifest.csv
```

1. **CT Brain Windowing**: Converts raw DICOM to Hounsfield Units (HU) using `RescaleSlope` and `RescaleIntercept`, clipping to brain window ($\text{WL} = 40, \text{WW} = 80 \implies [0, 80]\text{ HU}$) and stretching to 8-bit grayscale PNG.
2. **HSV Mask Extraction**: Extracts binary lesion masks from dataset overlays via saturation thresholding in HSV color space.
3. **Case-Level Data Split**: 70% Training ($4,655\text{ cases} / 9,310\text{ slices}$ augmented), 15% Validation ($998\text{ cases} / 998\text{ slices}$), and 15% Test ($997\text{ cases} / 997\text{ slices}$) using fixed Seed 42. Partitioned at the patient case level to prevent slice-level data leakage (Tampu et al., 2022).
4. **Resize & Normalization**: Standardized to $224 \times 224 \times 1$ with zero-center normalization ($\mu = 0.179, \sigma = 0.307$).
5. **Offline Data Augmentation**: Training set only (Rotation $\pm 15^\circ$, Scaling $0.9-1.1$, Translation $\pm 10\%$, Horizontal Flip $p=0.5$).

---

<!-- Animated Medical Divider -->
<div align="center">
  <img src="docs/assets/divider.svg" alt="Divider" width="100%" />
</div>

## 3-Tier System Architecture & Topology

<!-- Custom High-Definition SVG System Architecture -->
<img src="docs/assets/system-architecture.svg" alt="3-Tier Clinical System Architecture" width="100%" />

<br/>

The system is engineered as an enterprise-grade 3-Tier containerized platform:

1. **Presentation Tier (`frontend`)**: Next.js 15 App Router running React 19, TypeScript, Tailwind CSS, Framer Motion, and HTML5 Canvas on port `3000`.
2. **Application & Gateway Tier (`backend`)**: FastAPI asynchronous gateway on port `8000` with Pydantic V2 validation, Brain Guardrail engine, PyTorch 2.5 CPU/CUDA runners, and proxy routing.
3. **Microservices & Persistence Tier**:
   - **Patcher Microservice**: Isolated container running Python 3.8 / PyTorch 1.12.1 / `mmcv-full` on port `8001`.
   - **PostgreSQL 16**: Relational storage on port `5432` with SQLAlchemy 2.x ORM and Alembic schema migrations.
   - **Model Checkpoints**: Read-only bind mounts providing model weights (`best.pth`, `best.ckpt`).

---

<!-- Animated Medical Divider -->
<div align="center">
  <img src="docs/assets/divider.svg" alt="Divider" width="100%" />
</div>

## Clinical Inference Pipeline

<!-- Custom High-Definition SVG Pipeline Flow -->
<img src="docs/assets/inference-pipeline.svg" alt="Clinical Image Processing Pipeline" width="100%" />

<br/>

The end-to-end diagnostic workflow executes across five deterministic stages:
1. **Ingestion**: Clinician uploads an axial Brain CT slice (`PNG`, `JPG`, or `DICOM`).
2. **Guardrail Validation**: Validates grayscale format, skull contour ratio, and HU intensity.
3. **Preprocessing**: Normalizes the scan into a $224 \times 224 \times 1$ batch tensor.
4. **Ensemble / Forward Inference**: Selected segmentation network outputs Sigmoid probability logits while MaxViT classifies disease type.
5. **Harmonization & Display**: Radiologic attenuation engine assigns mask color (**Red** for Hemorrhagic, **Yellow** for Ischemic), suppresses noise specks, and presents the interactive 2.5×–8.0× Loupe workspace.

---

<!-- Animated Medical Divider -->
<div align="center">
  <img src="docs/assets/divider.svg" alt="Divider" width="100%" />
</div>

## REST API Reference

### 1. Perform Stroke Lesion Analysis
```http
POST /api/analysis
Content-Type: multipart/form-data
```

| Field | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `file` | `Binary File` | **Yes** | — | Non-contrast brain CT scan (`PNG`, `JPG`, `DICOM slice`) |
| `model` | `string` | No | `vcanet` | Architecture ID: `vcanet`, `dlka`, or `patcher` |
| `threshold` | `float` | No | `0.50` | Binary segmentation cutoff ($0.01 \le t \le 0.99$) |

**Response Schema:**
```json
{
  "filename": "ct_scan_slice.png",
  "model": "dlka",
  "model_label": "Deformable LKA",
  "detected": true,
  "label": "Acute Stroke Lesion Detected",
  "confidence": 0.942,
  "lesion_area_percentage": 3.85,
  "mask_png_base64": "iVBORw0KGgoAAAANSUhEUgAAA...",
  "prob_png_base64": "iVBORw0KGgoAAAANSUhEUgAAA...",
  "classification": {
    "predicted_class": "hemorrhagic",
    "predicted_label": "Hemorrhagic Stroke",
    "confidence": 0.9245,
    "classes": [
      { "id": "normal", "label": "Normal (No Stroke)", "probability": 0.015, "percentage": 1.5 },
      { "id": "hemorrhagic", "label": "Hemorrhagic Stroke", "probability": 0.9245, "percentage": 92.5 },
      { "id": "ischemic", "label": "Ischemic Stroke", "probability": 0.0605, "percentage": 6.0 }
    ]
  }
}
```

### 2. Query Supported Model Architectures
```http
GET /api/analysis/models
```

---

<!-- Animated Medical Divider -->
<div align="center">
  <img src="docs/assets/divider.svg" alt="Divider" width="100%" />
</div>

## Quick Start & Deployment Guide

### Prerequisites
- [Docker Engine](https://docs.docker.com/engine/install/) & Docker Compose (v2.20+)
- Node.js (v20+) & Python 3.12+ *(for local dev)*

### 1. Model Weights & Automated Checkpoint Downloader

Production model weights (~1.43 GB total) are hosted on [GitHub Releases (v1.0.0-weights)](https://github.com/Cell1991/nu-stroke-scan/releases/tag/v1.0.0-weights).

```bash
# Automated 1-Click Download (Standalone)
python scripts/download_checkpoints.py

# Or on Windows, simply double-click:
download_checkpoints.bat
```
*(Note: Running `start.bat` or `.\start.ps1` will automatically check for missing checkpoints and download them before starting).*

### 2. One-Click Launch with All-in-One Scripts (Windows / PowerShell)

```bash
# Clone the repository
git clone https://github.com/Cell1991/nu-stroke-scan.git
cd nu-stroke-scan

# Option A: One-click Batch launcher (auto-downloads weights + starts backend, frontend & ngrok tunnel)
start.bat

# Option B: One-click PowerShell launcher
.\start.ps1

# Option C: Docker Compose container stack
docker compose up --build
```

### 3. Service Endpoints

| Service Tier | Port & Protocol | URL |
| :--- | :--- | :--- |
| **Clinical Web UI** | HTTP / 3000 | [`http://localhost:3000`](http://localhost:3000) |
| **FastAPI Backend Gateway** | HTTP / 8000 | [`http://localhost:8000`](http://localhost:8000) |
| **Interactive Swagger UI** | HTTP / 8000 | [`http://localhost:8000/docs`](http://localhost:8000/docs) |
| **ReDoc Documentation** | HTTP / 8000 | [`http://localhost:8000/redoc`](http://localhost:8000/redoc) |
| **PostgreSQL Database** | TCP / 5432 | `localhost:5432` |

---

<!-- Animated Medical Divider -->
<div align="center">
  <img src="docs/assets/divider.svg" alt="Divider" width="100%" />
</div>

## Research & Academic Attribution

<div align="center">
  <p><b>Senior Research Thesis · Academic Year 2/2568</b><br/>
  <b>Department of Computer Science and Information Technology</b><br/>
  <i>Faculty of Science, Naresuan University, Phitsanulok, Thailand</i></p>

  <table align="center" style="border: none; background: transparent;">
    <tr style="border: none; background: transparent;">
      <td align="center" style="border: none; padding: 12px; background: transparent;">
        <a href="https://github.com/Cell1991">
          <img src="docs/assets/author-chu.svg" alt="Thanaphat Chichu - UI/UX & System Architect" width="380px" />
        </a>
      </td>
      <td align="center" style="border: none; padding: 12px; background: transparent;">
        <a href="https://github.com/Rednoselittledog">
          <img src="docs/assets/author-kanin.svg" alt="Kanin Noisiri - Deep Learning & AI Scientist" width="380px" />
        </a>
      </td>
    </tr>
  </table>

  <br/>

  <table align="center" width="90%">
    <thead>
      <tr>
        <th align="left">Student Researcher</th>
        <th align="left">Student ID &amp; Degree</th>
        <th align="left">Primary Academic &amp; Technical Contributions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><b>Thanaphat Chichu</b><br/><code>@Cell1991</code></td>
        <td><b>66312244</b><br/>B.Sc. (Computer Science)</td>
        <td>Architected the Next.js 15 App Router web application, 2.5×–8.0× diagnostic loupe magnifier, 1:1 synchronized dual-pane viewport, stepped neumorphic windowing system, medical composite image export, FastAPI gateway integration, and deployment infrastructure.</td>
      </tr>
      <tr>
        <td><b>Kanin Noisiri</b><br/><code>@Rednoselittledog</code></td>
        <td><b>66310653</b><br/>B.Sc. (Computer Science)</td>
        <td>Designed and implemented the 5-step preprocessing pipeline, adapted and trained deep learning models (D-LKA Net, VCA-Net, Patcher SegFormer, MaxViT 3-Class Classifier) on NVIDIA A100 GPUs, and conducted quantitative benchmark evaluations.</td>
      </tr>
    </tbody>
  </table>

  <br/>

  <table align="center" width="75%">
    <thead>
      <tr>
        <th align="left">Academic Role</th>
        <th align="left">Faculty Member</th>
        <th align="left">Affiliation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><b>Thesis Advisor</b></td>
        <td><b>Assoc. Prof. Dr. Jakkrit Snae Namahoot</b></td>
        <td>Department of Computer Science and Information Technology, Faculty of Science, Naresuan University</td>
      </tr>
      <tr>
        <td><b>Committee Member</b></td>
        <td><b>Lect. Phisetphong Suthaphan</b></td>
        <td>Department of Computer Science and Information Technology, Faculty of Science, Naresuan University</td>
      </tr>
      <tr>
        <td><b>Committee Member</b></td>
        <td><b>Lect. Wuttipong Ruenthong</b></td>
        <td>Department of Computer Science and Information Technology, Faculty of Science, Naresuan University</td>
      </tr>
    </tbody>
  </table>
</div>

<br/>

---

<div align="center">

> [!NOTE]
> **Clinical Research Notice & Academic Disclaimer**: This software platform is developed exclusively for academic research, medical imaging benchmark evaluation, and clinical decision support purposes. It is intended to assist qualified healthcare professionals and should not replace certified radiological diagnosis.

<br/>

<sub>© 2026 NU Stroke Scan Research Project · Department of Computer Science and Information Technology, Naresuan University</sub>

</div>
