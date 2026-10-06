<div align="center">

<!-- Animated Medical Hero Banner -->
<img src="docs/assets/hero-banner.svg" alt="NU Stroke Scan Banner" width="100%" />

<br/><br/>

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.5%20%7C%201.12-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.0-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
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

**NU Stroke Scan** is a **Clinical Decision Support System (CDSS)** developed as an undergraduate graduation research thesis in Computer Science at Naresuan University (Semester 2/2568).

Stroke is a leading cause of mortality and long-term disability globally and within Thailand. Immediate differentiation between ischemic stroke and hemorrhagic stroke on **Non-Contrast Brain Computed Tomography (NCCT)** is crucial, as therapeutic pathways differ substantially. While NCCT is universally accessible in emergency settings, radiological interpretation is subject to inter-observer variability, expert availability constraints, and time sensitivity.

This research addresses these challenges by:
1. Conducting a rigorous, controlled comparative evaluation of three specialized deep learning segmentation architectures (**VCA-Net**, **D-LKA Net**, and **Patcher SegFormer**) adapted specifically for 2D Brain CT stroke lesion localization under identical preprocessing and evaluation protocols (Zafari-Ghadim et al., 2024).
2. Implementing an end-to-end, production-grade clinical web application prototype combining modern web technologies (**Next.js 15 App Router**, **FastAPI**, **PostgreSQL 16**, **Docker**) with interactive diagnostic tools (2.5×–8.0× Diagnostic Loupe, 1:1 Synchronized Dual Viewport, and Heuristic Input Guardrails).

---

<!-- Animated Medical Divider -->
<div align="center">
  <img src="docs/assets/divider.svg" alt="Divider" width="100%" />
</div>

## Clinical Diagnostic Workspace

<!-- Custom High-Definition SVG Features Matrix -->
<img src="docs/assets/features-grid.svg" alt="Clinical Workspace Features" width="100%" />

<br/>

The clinical interface is tailored for rapid radiological examination and lesion verification:

### 1. Real-Time 2.5× to 8.0× Diagnostic Loupe
- **Cursor Tracking**: Right-click anywhere across the scan to summon a high-magnification optical loupe that smoothly tracks the cursor in real-time.
- **Vertical Drag Zoom**: Left-click and drag vertically within the active loupe to dynamically scale magnification from **1.2× up to 8.0×**, allowing precise inspection of subtle, low-contrast ischemic penumbral tissue and microvascular contours.

### 2. 1:1 Synchronized Dual-Pane Viewport
- **Side-by-Side Comparative Display**: Displays the unaugmented raw NCCT slice (Left) alongside the AI-generated lesion segmentation overlay (Right).
- **Synchronized Pan & Zoom**: Panning and zoom levels (0.5× to 4.0×) are bidirectionally locked between both viewports, complemented by a toggleable anatomical reticle grid for coordinate spatial referencing.

### 3. Automated Pre-Inference Brain CT Guardrails
- **Heuristic Multi-Check Engine**: Automatically validates single-channel grayscale integrity, Hounsfield Unit (HU) intensity distributions, and skull contour cranial aspect ratios.
- **Strict Input Sanitization**: Rejects invalid non-CT illustrations, corrupted image streams, non-brain anatomy, and off-axis slices with descriptive clinical guidance before passing tensors to deep learning runners.

### 4. Stepped Neumorphic Windowing & Dynamic Thresholding
- **Radiological Controls**: Stepped slider interface for brightness, contrast, and mask alpha blending.
- **Client-Side Live Recalibration**: Modify model decision confidence thresholds ($0\% \le t \le 100\%$) with instantaneous HTML5 Canvas re-rendering, eliminating repetitive network overhead.

---

<!-- Animated Medical Divider -->
<div align="center">
  <img src="docs/assets/divider.svg" alt="Divider" width="100%" />
</div>

## Deep Learning Architectures & Benchmark

<!-- Custom High-Definition SVG Models Suite -->
<img src="docs/assets/models-architecture.svg" alt="Deep Learning Suite Architecture" width="100%" />

<br/>

### Architecture Implementations & Adaptations

Each architecture was adapted to consume single-channel $224 \times 224$ normalized Brain CT tensors:

1. **D-LKA Net (Deformable Large Kernel Attention Network)** (Azad et al., 2023):
   - **Encoder**: 4-stage hierarchical MaxViT backbone ($[2, 2, 5, 2]$ blocks) extracting multi-axis local grid and global axial attention features at resolutions $H/4, H/8, H/16, H/32$.
   - **Decoder**: 4-stage 2D D-LKA decoder with deformable convolution kernels that dynamically adjust sampling positions to fit irregular lesion morphology, linked via element-wise addition skip connections.
   - **Loss Function**: $\mathcal{L}_{\text{D-LKA}} = 0.6 \cdot \mathcal{L}_{\text{Dice}} + 0.4 \cdot \mathcal{L}_{\text{BCE with Logits}}$.
   - **Optimization**: Trained from scratch (100 epochs, batch size 8, initial LR 0.05 with SGD) using `torch.compile()` and `bfloat16` autocast.

2. **VCA-Net (Visual Cortex Anatomy Alike Neural Network)** (Li, 2021):
   - **Architecture**: Emulates the ventral visual pathway of the human brain: V1 (6 conv layers with 4 parallel sub-paths), V2 (Inception multi-scale blocks), V4 (multi-scale feature integration), and Inferior Temporal (IT) bottleneck followed by a 4-layer upsampling block.
   - **Loss Function**: Combined Focal Loss, Dice Loss, and BCELoss (with numerical stability value clamping on EML Loss to prevent NaN/Inf gradients during mixed precision).
   - **Optimization**: 100 epochs, `torch.compile()` and `bfloat16` autocast, scheduler configured to maximize validation Dice score.

3. **Patcher SegFormer (Patch Transformer + Mixture-of-Experts Decoder)** (Ou et al., 2023):
   - **Encoder**: 4 stacked Patcher blocks grouping pixels into $32 \times 32$ regions (8px overlap padding) and $2 \times 2$ fine-grained patch tokens fed into Vision Transformers.
   - **Decoder**: Mixture-of-Experts (MoE) 4-stage gating network computing per-pixel weights to emphasize boundary tokens versus global interior tokens.
   - **Runtime**: Isolated containerized microservice running PyTorch 1.12.1 + `mmcv-full` on port `8001`.
   - **Loss Function**: $\mathcal{L}_{\text{Patcher}} = \mathcal{L}_{\text{BCE}} + \mathcal{L}_{\text{IoU}}$.

### Quantitative Evaluation on External Test Set ($n=199$ cases)

The evaluation was conducted on an independent external test set of 199 Brain CT cases (35 lesion-positive, 164 no-lesion) using three standardized Dice Similarity Coefficient (DSC) metrics:

| Model Architecture | Aggregated DSC (Pixel-Pooled) | Slice-Based DSC (Lesion-Only) | Volume-Based DSC (All Cases) | Training Epochs & Hardware |
| :--- | :---: | :---: | :---: | :--- |
| **D-LKA Net** | **0.5355** | **0.8758** | 0.7621 | 100 Epochs · NVIDIA A100 SXM4 80GB |
| **VCA-Net** | 0.5150 | 0.8063 | **0.7800** | 100 Epochs · NVIDIA A100 SXM4 80GB |
| **Patcher SegFormer** | *Pending* | *Pending* | *Pending* | 100 Epochs · MMCV Microservice |

> **Key Finding**: D-LKA Net demonstrates superior contour delineation on actual lesion tissue (Slice-based DSC 0.8758 vs. 0.8063), while VCA-Net scores marginally higher on volume-wide metrics dominated by true-negative (no-lesion) cases.

---

<!-- Animated Medical Divider -->
<div align="center">
  <img src="docs/assets/divider.svg" alt="Divider" width="100%" />
</div>

## Preprocessing Pipeline (5-Step Unified Standard)

```
Raw DICOM Scan ➔ [1. CT Windowing (WL:40, WW:80)] ➔ [2. HSV Mask Extraction]
               ➔ [3. Case-Level Patient Split]    ➔ [4. Resize 224×224 & Normalize]
               ➔ [5. Offline Albumentations Data Augmentation] ➔ .npy + manifest.csv
```

1. **CT Brain Windowing**: DICOM to Hounsfield Units (HU) conversion using `RescaleSlope` and `RescaleIntercept`. Values are clipped to standard brain window ($\text{WL} = 40, \text{WW} = 80 \implies [0, 80]\text{ HU}$) and scaled to 8-bit grayscale PNGs.
2. **HSV Mask Extraction**: Saturation thresholding in HSV color space to extract binary lesion masks from dataset overlays.
3. **Case-Level Data Split (Patient-Level)**: Split into 70% Training ($4,655\text{ cases} / 9,310\text{ slices}$ augmented), 15% Validation ($998\text{ cases} / 998\text{ slices}$), and 15% Test ($997\text{ cases} / 997\text{ slices}$) using fixed Seed 42. Split at the patient case level to prevent slice-level data leakage (Tampu et al., 2022).
4. **Resize & Normalization**: Standardized to $224 \times 224 \times 1$ with zero-center normalization ($\mu = 0.179, \sigma = 0.307$).
5. **Offline Data Augmentation**: Applied exclusively to training set (Rotation $\pm 15^\circ$, Scaling $0.9-1.1$, Translation $\pm 10\%$, Horizontal Flip $p=0.5$).

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

1. **Presentation Tier (`frontend`)**: Next.js 15 App Router running React 19, TypeScript, Tailwind CSS, and HTML5 Canvas on port `3000`.
2. **Application & Gateway Tier (`backend`)**: FastAPI asynchronous gateway on port `8000` with Pydantic V2 schema validation, Brain Guardrail engine, native PyTorch 2.5 inference runners, and proxy routing.
3. **Microservices & Persistence Tier**:
   - **Patcher Microservice**: Isolated container running Python 3.8 / PyTorch 1.12.1 / `mmcv-full` on port `8001`.
   - **PostgreSQL 16**: Relational storage on port `5432` with SQLAlchemy 2.x ORM and Alembic migrations.
   - **Model Checkpoint Volumes**: Read-only bind mounts providing model weights (`best.pth`, `best.ckpt`).

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
2. **Guardrail Validation**: Heuristic engine validates grayscale format, skull aspect ratio, and HU intensity.
3. **Preprocessing**: Normalizes the scan into a $224 \times 224 \times 1$ batch tensor.
4. **Model Execution**: Selected neural network executes forward inference, outputting Sigmoid-scaled probability logits.
5. **Display & Decision**: Client receives lesion area ratio, confidence score, and mask stream for interactive inspection with the 2.5×–8.0× Loupe.

---

<!-- Animated Medical Divider -->
<div align="center">
  <img src="docs/assets/divider.svg" alt="Divider" width="100%" />
</div>

## REST API Reference

### 1. Execute Stroke Lesion Segmentation
```http
POST /api/analysis
Content-Type: multipart/form-data
```

| Field | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `file` | `Binary File` | **Yes** | — | Brain CT image (`PNG`, `JPG`, `DICOM slice`) |
| `model` | `string` | No | `vcanet` | Architecture ID: `vcanet`, `dlka`, or `patcher` |
| `threshold` | `float` | No | `0.50` | Binary segmentation cutoff ($0.0 \le t \le 1.0$) |

**Response Schema:**
```json
{
  "detected": true,
  "label": "Ischemic Stroke Lesion Detected",
  "confidence": 0.942,
  "lesion_area_pct": 3.85,
  "model_label": "VCA-Net (Visual Cortex Attention)",
  "mask_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...",
  "input_size": [224, 224],
  "processing_time_ms": 142.5
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

### 1. One-Click Launch with Docker Compose

```bash
# Clone the repository
git clone https://github.com/Cell1991/nu-stroke-scan.git
cd nu-stroke-scan

# Configure environment variables
cp .env.example .env

# Build and start all clinical microservices
docker compose up --build
```

### 2. Service Endpoints

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
          <img src="docs/assets/author-chu.svg" alt="Thanaphat Jeeju - UI/UX & System Architect" width="380px" />
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
        <td><b>Thanaphat Jeeju</b><br/>(นายธนภัทร จีจู)<br/><code>@Cell1991</code></td>
        <td><b>66312244</b><br/>B.Sc. (Computer Science)</td>
        <td>Architected the Next.js 15 App Router web application, 2.5×–8.0× diagnostic loupe magnifier, 1:1 synchronized dual-pane viewport, stepped neumorphic windowing system, FastAPI gateway integration, and Docker deployment infrastructure.</td>
      </tr>
      <tr>
        <td><b>Kanin Noisiri</b><br/>(นายคณิน น้อยศิริ)<br/><code>@Rednoselittledog</code></td>
        <td><b>66310653</b><br/>B.Sc. (Computer Science)</td>
        <td>Designed and implemented the 5-step preprocessing pipeline, adapted and trained deep learning models (D-LKA Net, VCA-Net, Patcher SegFormer) on NVIDIA A100 GPUs, containerized MMCV microservices, and performed quantitative benchmark evaluations.</td>
      </tr>
    </tbody>
  </table>

  <br/>

  <table align="center" width="70%">
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
        <td><b>Assoc. Prof. Dr. Jakkrit Snae Namahoot</b><br/>(รองศาสตราจารย์ ดร.จักรกฤษณ์ เสน่ห์ นมะหุต)</td>
        <td>Department of Computer Science and Information Technology, Faculty of Science, Naresuan University</td>
      </tr>
      <tr>
        <td><b>Committee Member</b></td>
        <td><b>Lect. Phisetphong Suthaphan</b><br/>(อาจารย์พิเศษพงศ์ สุธาพันธ์)</td>
        <td>Department of Computer Science and Information Technology, Faculty of Science, Naresuan University</td>
      </tr>
      <tr>
        <td><b>Committee Member</b></td>
        <td><b>Lect. Wuttipong Ruenthong</b><br/>(อาจารย์วุฒิพงษ์ เรือนทอง)</td>
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
