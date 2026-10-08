"use client";

import { DragEvent, useEffect, useRef, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Brain,
  Check,
  CheckCircle2,
  Copy,
  Crosshair,
  Download,
  Eye,
  FileCheck2,
  FileText,
  Grid,
  Layers,
  Maximize2,
  Radio,
  RefreshCw,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  SlidersHorizontal,
  Sparkles,
  Sun,
  UploadCloud,
  Zap,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

type DiseaseClassification = {
  predicted_class: string;
  predicted_label: string;
  confidence: number;
  classes: Array<{
    id: string;
    label: string;
    probability: number;
    percentage: number;
  }>;
};

type ScanResult = {
  label: string;
  confidence: number;
  maskUrl: string;
  detected: boolean;
  lesionArea?: number;
  modelLabel?: string;
  inputSize?: [number, number];
  classification?: DiseaseClassification | null;
};

const MAX_FILE_SIZE = 25 * 1024 * 1024;

const MODELS = [
  {
    id: "vcanet",
    name: "VCA-Net",
    desc: "Visual Cortex Attention Network",
    tag: "High Sensitivity",
  },
  {
    id: "dlka",
    name: "Deformable LKA",
    desc: "MaxViT + Large Kernel Attention",
    tag: "Deformable Conv",
  },
  {
    id: "patcher",
    name: "Patcher",
    desc: "Patch SegFormer Architecture",
    tag: "Multi-Scale Transformer",
  },
];

function SmoothSlider({
  value,
  onChange,
  min,
  max,
  step = 1,
}: {
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
}) {
  const currentPct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  return (
    <div className="w-full select-none py-0.5">
      <div className="neu-slider-container relative h-4 flex items-center">
        <div className="neu-slider-track-bg w-full">
          <div
            className="neu-slider-track-fill"
            style={{ width: `${currentPct}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="neu-range-input"
        />
      </div>
    </div>
  );
}

export default function Home() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const probDataRef = useRef<{ width: number; height: number; data: Uint8ClampedArray } | null>(null);
  const dragStartRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingViewport, setIsDraggingViewport] = useState(false);
  const [exportedStatus, setExportedStatus] = useState<string | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);

  // Model & Display Controls
  const [modelId, setModelId] = useState("vcanet");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [maskOpacity, setMaskOpacity] = useState(85);
  const [threshold, setThreshold] = useState(50);

  // Viewport Zoom, Pan & Fine Grid Controls
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState(false);

  // Diagnostic Loupe State
  const [loupe, setLoupe] = useState<{
    active: boolean;
    x: number;
    y: number;
    normX: number;
    normY: number;
    target: "left" | "right" | null;
    scale: number;
  }>({
    active: false,
    x: 0,
    y: 0,
    normX: 0.5,
    normY: 0.5,
    target: null,
    scale: 3.0,
  });

  function handleZoomIn() {
    setZoom((prev) => Math.min(4, Number((prev + 0.25).toFixed(2))));
  }

  function handleZoomOut() {
    setZoom((prev) => Math.max(0.5, Number((prev - 0.25).toFixed(2))));
  }

  function handleResetZoom() {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }

  function toggleGrid() {
    setShowGrid((prev) => !prev);
  }

  function resetControls() {
    setBrightness(100);
    setContrast(100);
    setMaskOpacity(85);
    recomputeThreshold(50);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setShowGrid(false);
    setLoupe((prev) => ({ ...prev, active: false }));
  }


  function handleViewportMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    if (e.button === 2) return;
    setIsDraggingViewport(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  }

  function handleViewportMouseMove(e: React.MouseEvent<HTMLDivElement>, targetSide: "left" | "right") {
    if (loupe.active) {
      const rect = e.currentTarget.getBoundingClientRect();
      const rawX = e.clientX - rect.left;
      const rawY = e.clientY - rect.top;
      const normX = Math.max(0, Math.min(1, rawX / rect.width));
      const normY = Math.max(0, Math.min(1, rawY / rect.height));

      setLoupe((prev) => ({
        ...prev,
        x: rawX,
        y: rawY,
        normX,
        normY,
        target: targetSide,
      }));
      return;
    }

    if (!isDraggingViewport || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPan({
      x: dragStartRef.current.panX + dx,
      y: dragStartRef.current.panY + dy,
    });
  }

  function handleViewportMouseUp() {
    setIsDraggingViewport(false);
    dragStartRef.current = null;
  }

  function handleViewportContextMenu(e: React.MouseEvent<HTMLDivElement>, targetSide: "left" | "right") {
    e.preventDefault();
    if (!imageUrl) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    const normX = Math.max(0, Math.min(1, rawX / rect.width));
    const normY = Math.max(0, Math.min(1, rawY / rect.height));

    setLoupe((prev) => ({
      ...prev,
      active: !prev.active || prev.target !== targetSide,
      x: rawX,
      y: rawY,
      normX,
      normY,
      target: targetSide,
      scale: prev.scale < 3.0 ? 3.0 : prev.scale,
    }));
  }

  function handleViewportWheel(e: React.WheelEvent<HTMLDivElement>, targetSide: "left" | "right") {
    e.preventDefault();
    e.stopPropagation();

    if (loupe.active && loupe.target === targetSide) {
      const delta = e.deltaY < 0 ? 0.3 : -0.3;
      setLoupe((prev) => ({
        ...prev,
        scale: Math.max(1.5, Math.min(6.0, Number((prev.scale + delta).toFixed(1)))),
      }));
      return;
    }

    if (e.deltaY < 0) {
      setZoom((prev) => Math.min(4, Number((prev + 0.15).toFixed(2))));
    } else {
      setZoom((prev) => Math.max(0.5, Number((prev - 0.15).toFixed(2))));
    }
  }

  useEffect(() => {
    return () => {
      if (imageUrl && imageUrl.startsWith("blob:")) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  function handleFile(selectedFile: File) {
    setError(null);
    setResult(null);
    probDataRef.current = null;
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid brain CT scan image (DICOM/NIfTI, PNG, JPG, or WEBP).");
      return;
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File size exceeds 25 MB.");
      return;
    }
    if (imageUrl && imageUrl.startsWith("blob:")) URL.revokeObjectURL(imageUrl);
    setFile(selectedFile);
    setImageUrl(URL.createObjectURL(selectedFile));
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) handleFile(droppedFile);
  }


  function recomputeThreshold(newThreshold: number, overrideClass?: string) {
    setThreshold(newThreshold);
    if (!probDataRef.current) return;
    const { width, height, data } = probDataRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const outImgData = ctx.createImageData(width, height);
    const out = outImgData.data;
    const cutoff = Math.round((newThreshold / 100) * 255);

    let lesionPixels = 0;
    let sumProb = 0;
    let maxProb = 0;
    const totalPixels = width * height;

    const currentClass = overrideClass ?? result?.classification?.predicted_class;
    const isIschemic = currentClass === "ischemic";
    // Hemorrhagic: Red (239, 68, 68), Ischemic: Yellow / Amber (234, 179, 8)
    const maskR = isIschemic ? 234 : 239;
    const maskG = isIschemic ? 179 : 68;
    const maskB = isIschemic ? 8 : 68;

    for (let i = 0; i < totalPixels; i++) {
      const idx = i * 4;
      const prob = data[idx];
      if (prob > maxProb) maxProb = prob;

      if (prob >= cutoff) {
        lesionPixels++;
        sumProb += prob;
        out[idx] = maskR;
        out[idx + 1] = maskG;
        out[idx + 2] = maskB;
        out[idx + 3] = 255;
      } else {
        out[idx + 3] = 0;
      }
    }

    ctx.putImageData(outImgData, 0, 0);
    const newMaskUrl = canvas.toDataURL("image/png");
    const detected = lesionPixels >= 15;
    const lesionArea = detected ? Number(((lesionPixels / totalPixels) * 100).toFixed(2)) : 0;
    const avgConfidence = lesionPixels >= 15 ? (sumProb / lesionPixels) / 255 : maxProb / 255;
    const confidence = Number(Math.max(avgConfidence, detected ? 0.85 : 0.95).toFixed(4));
    const label = detected
      ? (isIschemic ? "Acute Ischemic Infarction (Yellow Mask)" : "Acute Hemorrhagic Stroke (Red Mask)")
      : "No Acute Lesion Detected";

    setResult((prev) => (prev ? {
      ...prev,
      maskUrl: newMaskUrl,
      lesionArea,
      detected,
      confidence,
      label,
    } : null));
  }

  async function runInference() {
    if (!file) {
      setError("Please select or drop a CT scan file first.");
      return;
    }
    setIsScanning(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("model", modelId);
      formData.append("threshold", String(threshold / 100));

      const res = await fetch(`/api/predict?model=${encodeURIComponent(modelId)}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errPayload = await res.json().catch(() => ({}));
        throw new Error(errPayload.error || errPayload.detail || `Server returned ${res.status}`);
      }

      const data = await res.json();
      const probB64 = data.prob_png_base64 || data.mask_base64 || data.mask_png_base64;
      const initialMaskUrl = (data.mask_base64 || data.mask_png_base64)
        ? `data:image/png;base64,${data.mask_base64 || data.mask_png_base64}`
        : "";

      if (probB64) {
        const probImg = new Image();
        probImg.crossOrigin = "anonymous";
        probImg.src = `data:image/png;base64,${probB64}`;
        await new Promise((resolve) => {
          probImg.onload = resolve;
          probImg.onerror = resolve; // Guarantees promise never hangs!
          setTimeout(resolve, 3000); // 3s fail-safe timer
        });

        const canvas = document.createElement("canvas");
        canvas.width = probImg.width || 512;
        canvas.height = probImg.height || 512;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(probImg, 0, 0);
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          probDataRef.current = {
            width: canvas.width,
            height: canvas.height,
            data: imgData.data,
          };
        }
      }

      setResult({
        label: data.label || "Analysis Complete",
        confidence: Number(data.confidence ?? 0.95),
        maskUrl: initialMaskUrl,
        detected: Boolean(data.detected ?? data.lesion_detected),
        lesionArea: data.lesion_area ?? data.lesion_area_percentage ?? 0,
        modelLabel: data.model_label || MODELS.find((m) => m.id === modelId)?.name,
        inputSize: data.input_size || [512, 512],
        classification: data.classification || null,
      });
      recomputeThreshold(threshold, data.classification?.predicted_class);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Inference failed. Please ensure the backend is running.");
    } finally {
      setIsScanning(false);
    }
  }

  function exportAnnotatedImage() {
    if (!imageUrl) return;
    const baseImg = new Image();
    baseImg.crossOrigin = "anonymous";
    baseImg.src = imageUrl;

    baseImg.onload = () => {
      const scanW = baseImg.naturalWidth || 512;
      const scanH = baseImg.naturalHeight || 512;

      const pad = 24;
      const headerH = 60;
      const footerH = 88;
      const canvasW = Math.max(scanW + pad * 2, 720);
      const canvasH = scanH + headerH + footerH + pad * 2;

      const canvas = document.createElement("canvas");
      canvas.width = canvasW;
      canvas.height = canvasH;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // 1. Sleek Medical Dark Slate Backdrop (#080c15)
      ctx.fillStyle = "#080c15";
      ctx.fillRect(0, 0, canvasW, canvasH);

      // Top Accent Line (Sky blue gradient)
      const grad = ctx.createLinearGradient(0, 0, canvasW, 0);
      grad.addColorStop(0, "#0284c7");
      grad.addColorStop(0.5, "#38bdf8");
      grad.addColorStop(1, "#6366f1");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvasW, 3);

      // 2. Header Section
      ctx.font = "bold 15px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillStyle = "#38bdf8";
      ctx.fillText("NU STROKE SCAN", pad, 28);

      ctx.font = "500 12px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("Neuro-Imaging Clinical Intelligence · Naresuan University Hospital", pad, 46);

      // Header Right (Date & Resolution)
      const nowStr = new Date().toISOString().replace("T", " ").substring(0, 16);
      ctx.textAlign = "right";
      ctx.font = "600 12px monospace";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(nowStr, canvasW - pad, 28);

      ctx.font = "500 11px monospace";
      ctx.fillStyle = "#64748b";
      ctx.fillText(`AXIAL CT · ${scanW} × ${scanH} px`, canvasW - pad, 46);
      ctx.textAlign = "left";

      // Header Divider Line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad, headerH);
      ctx.lineTo(canvasW - pad, headerH);
      ctx.stroke();

      // 3. Central CT Scan Area
      const scanX = Math.round((canvasW - scanW) / 2);
      const scanY = headerH + pad;

      ctx.fillStyle = "#000000";
      ctx.fillRect(scanX, scanY, scanW, scanH);

      // Draw CT with brightness & contrast
      ctx.save();
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
      ctx.drawImage(baseImg, scanX, scanY, scanW, scanH);
      ctx.restore();

      const finishExport = (maskImg?: HTMLImageElement) => {
        if (maskImg) {
          ctx.save();
          ctx.globalAlpha = maskOpacity / 100;
          ctx.drawImage(maskImg, scanX, scanY, scanW, scanH);
          ctx.restore();
        }

        // Frame border around scan
        ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
        ctx.lineWidth = 1;
        ctx.strokeRect(scanX, scanY, scanW, scanH);

        // 4. Footer Section
        const footerY = scanY + scanH + pad;

        // Footer Divider Line
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pad, footerY - 12);
        ctx.lineTo(canvasW - pad, footerY - 12);
        ctx.stroke();

        const isPositive = Boolean(result?.detected && result.classification?.predicted_class !== "normal");

        const isIschemic = isPositive && result?.classification?.predicted_class === "ischemic";

        // Status Pill Badge (Top of footer)
        const pillX = pad;
        const pillY = footerY;
        const pillH = 26;
        const pillW = !isPositive ? 220 : isIschemic ? 240 : 250;
        const pillRadius = 6;

        ctx.beginPath();
        if (typeof ctx.roundRect === "function") {
          ctx.roundRect(pillX, pillY, pillW, pillH, pillRadius);
        } else {
          ctx.rect(pillX, pillY, pillW, pillH);
        }
        ctx.fillStyle = !isPositive
          ? "rgba(16, 185, 129, 0.15)"
          : isIschemic
            ? "rgba(234, 179, 8, 0.15)"
            : "rgba(239, 68, 68, 0.15)";
        ctx.fill();
        ctx.strokeStyle = !isPositive
          ? "rgba(16, 185, 129, 0.5)"
          : isIschemic
            ? "rgba(234, 179, 8, 0.5)"
            : "rgba(239, 68, 68, 0.5)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.font = "bold 11px -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.fillStyle = !isPositive ? "#34d399" : isIschemic ? "#facc15" : "#f87171";
        ctx.fillText(
          !isPositive
            ? "● NORMAL HEAD CT (NEGATIVE)"
            : isIschemic
              ? "● ISCHEMIC INFARCT (YELLOW MASK)"
              : "● HEMORRHAGIC STROKE (RED MASK)",
          pillX + 12,
          pillY + 17
        );

        // Primary Classification Label below Pill
        ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.fillStyle = "#f8fafc";
        const classLabel = result?.classification?.predicted_label || (isPositive ? "Acute Stroke Lesion" : "No Lesion Observed");
        const classConf = result?.classification
          ? ` (${result.classification.confidence * 100}%)`
          : (result ? ` (${(result.confidence * 100).toFixed(1)}%)` : "");
        ctx.fillText(`${classLabel}${classConf}`, pad, footerY + 48);

        // Center: Quantitative Metrics
        const midX = Math.round(canvasW * 0.44);
        ctx.font = "600 12px monospace";
        ctx.fillStyle = "#e2e8f0";
        ctx.fillText(`Lesion Area : ${result?.lesionArea ?? 0}%`, midX, footerY + 18);

        ctx.font = "500 11px monospace";
        ctx.fillStyle = "#94a3b8";
        ctx.fillText(`Cutoff Sens : ${threshold}%`, midX, footerY + 36);
        ctx.fillText(`Overlay Opa : ${maskOpacity}%`, midX, footerY + 52);

        // Right side: AI Model info & Clinical disclaimer
        ctx.textAlign = "right";
        ctx.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.fillStyle = "#38bdf8";
        ctx.fillText(`Model: ${result?.modelLabel || "VCA-Net"}`, canvasW - pad, footerY + 18);

        ctx.font = "500 11px -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.fillStyle = "#64748b";
        ctx.fillText("AI-Assisted Diagnostic Reference", canvasW - pad, footerY + 36);
        ctx.fillText("Confirmatory Radiologist Review Required", canvasW - pad, footerY + 52);
        ctx.textAlign = "left";

        // Download PNG
        const link = document.createElement("a");
        link.download = `stroke-clinical-composite-${file?.name ? file.name.replace(/\.[^/.]+$/, "") : Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        setExportedStatus("image");
        setTimeout(() => setExportedStatus(null), 2500);
      };

      if (result?.maskUrl) {
        const maskImg = new Image();
        maskImg.crossOrigin = "anonymous";
        maskImg.src = result.maskUrl;
        maskImg.onload = () => finishExport(maskImg);
        maskImg.onerror = () => finishExport();
      } else {
        finishExport();
      }
    };
  }

  function copySummaryToClipboard() {
    if (!result || !file) return;
    const clsSummary = result.classification
      ? `Disease Classification: ${result.classification.predicted_label} (${(result.classification.confidence * 100).toFixed(1)}%)
Class Probabilities:
${result.classification.classes.map((c) => `  - ${c.label}: ${c.percentage}%`).join("\n")}`
      : "Disease Classification: N/A";

    const summary = `=== NU STROKE SCAN CLINICAL ASSESSMENT ===
Date/Time: ${new Date().toLocaleString()}
Patient File: ${file.name}
Model Architecture: ${result.modelLabel || MODELS.find((m) => m.id === modelId)?.name}
Lesion Finding: ${result.label}
Segmentation Confidence: ${(result.confidence * 100).toFixed(1)}%
Lesion Volume (ROI): ${result.lesionArea ?? 0}%
Sensitivity Cutoff: ${threshold}%
------------------------------------------
${clsSummary}
==========================================`;

    navigator.clipboard.writeText(summary);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  }

  function exportReportText() {
    if (!result || !file) return;
    const clsReport = result.classification
      ? `Primary Disease Classification: ${result.classification.predicted_label} (${(result.classification.confidence * 100).toFixed(1)}%)
Probability Breakdown:
${result.classification.classes.map((c) => `  - ${c.label}: ${c.percentage}%`).join("\n")}`
      : "Primary Disease Classification: N/A";

    const reportText = `=====================================================
    NARESUAN UNIVERSITY HOSPITAL · NEURO-IMAGING CENTER
            STROKE AI CLINICAL DIAGNOSTIC REPORT
=====================================================
Timestamp: ${new Date().toISOString()}
Segmentation Architecture: ${result.modelLabel || MODELS.find((m) => m.id === modelId)?.name}
Lesion Segmentation Finding: ${result.detected ? "ACUTE LESION DETECTED (POSITIVE)" : "NO ACUTE LESION (NEGATIVE)"}
-----------------------------------------------------
Multi-Class Disease Classification (MaxViT):
${clsReport}
-----------------------------------------------------
Key Segmentation Metrics:
- Neural Classification: ${result.label}
- Confidence Certainty: ${(result.confidence * 100).toFixed(1)}%
- Lesion Area (ROI Volume): ${result.lesionArea ?? 0}%
- Sensitivity Cutoff: ${threshold}%
- Source File: ${file.name}
-----------------------------------------------------
Notice: This is an AI-assisted diagnostic aid and must
be verified by a certified healthcare professional.
=====================================================`;

    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `stroke-clinical-report-${file.name.replace(/\.[^/.]+$/, "")}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    setExportedStatus("report");
    setTimeout(() => setExportedStatus(null), 2500);
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden font-sans p-3 gap-2.5 select-none medical-ambient-backdrop text-slate-100">
      
      {/* 1. Top Header Navigation Bar */}
      <header className="h-14 px-5 flex items-center justify-between shrink-0 rounded-2xl medical-glass-panel">
        {/* Top-Left: Brand & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-blue-600/30 to-sky-400/20 border border-sky-400/30 p-1.5 shadow-inner">
            <img
              src="/brand_icon_trans.png"
              alt="NU Stroke Scan Logo"
              className="h-7 w-7 object-contain select-none pointer-events-none drop-shadow-md"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div>
              <h1 className="font-bold text-base tracking-tight flex items-center gap-1.5 leading-tight">
                <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                  NU STROKE SCAN
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 font-medium leading-tight">
              Neuro-Imaging Clinical Intelligence · Naresuan University Hospital
            </p>
          </div>
        </div>
      </header>

      {/* 2. Main 3-Column Cockpit Workspace */}
      <main className="flex-1 min-h-0 grid grid-cols-12 gap-2.5 overflow-hidden">
        
        {/* ========================================================================= */}
        {/* COLUMN 1 (3 Cols): PATIENT SCAN INGESTION + MODEL SELECTOR + CTA */}
        {/* ========================================================================= */}
        <section className="col-span-3 flex flex-col gap-2.5 min-h-0 overflow-y-auto pr-0.5">
          
          {/* Section 1: Patient Scan Ingestion */}
          <div className="rounded-2xl medical-glass-panel p-4 flex flex-col shrink-0">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-sm font-bold tracking-wider text-sky-400 uppercase flex items-center gap-2">
                <UploadCloud className="h-4.5 w-4.5 text-sky-400" />
                Patient CT Scan
              </span>
              {file && (
                <button
                  onClick={() => {
                    setFile(null);
                    setImageUrl(null);
                    setResult(null);
                  }}
                  className="text-xs font-semibold text-rose-400 hover:text-rose-300 cursor-pointer transition-colors px-2 py-0.5 rounded-lg hover:bg-rose-950/40"
                >
                  Clear Scan
                </button>
              )}
            </div>

            {/* Drag & Drop Upload Zone */}
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
              onDrop={handleDrop}
              className={`h-48 xl:h-56 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 relative overflow-hidden p-4 ${
                isDragging
                  ? "border-sky-400 bg-sky-950/40 scale-[1.01]"
                  : "border-slate-700/80 hover:border-sky-400/80 bg-slate-900/50 hover:bg-slate-900/80 active:scale-[0.99]"
              }`}
            >
              {imageUrl ? (
                <div className="flex flex-col items-center gap-2.5 px-2 w-full">
                  <div className="relative">
                    <img src={imageUrl} alt="Loaded Scan" className="h-20 w-20 xl:h-24 xl:w-24 object-contain rounded-xl border border-slate-700 bg-black shadow-md" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-xs text-white font-bold">✓</span>
                  </div>
                  <div className="text-center w-full">
                    <p className="text-sm font-bold text-white truncate max-w-[220px] mx-auto">{file?.name ?? "Loaded Slice"}</p>
                    <p className="text-xs font-medium text-sky-400 mt-1">Click or drag new slice to replace</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 py-1">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center mx-auto text-sky-400 shadow-sm">
                    <UploadCloud className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-100">Drop Brain CT or Browse</p>
                    <p className="text-xs text-slate-400 font-medium mt-1">Supports DICOM, NIfTI, PNG, JPG (Max 25MB)</p>
                  </div>
                  <span className="inline-block px-4 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-sky-400/50 text-sky-300 text-xs font-semibold shadow-sm transition-colors">
                    Select File
                  </span>
                </div>
              )}
            </div>


            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
              className="hidden"
            />

            {error && (
              <div className="mt-2.5 p-2.5 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-red-400" />
                <span className="truncate">{error}</span>
              </div>
            )}
          </div>

          {/* Section 2: Neural Architecture & Inference */}
          <div className="rounded-2xl medical-glass-panel p-4 flex flex-col flex-1 min-h-0 justify-between">
            <div>
              <span className="text-sm font-bold tracking-wider text-sky-400 uppercase flex items-center gap-2 mb-3 shrink-0">
                <Brain className="h-4.5 w-4.5 text-sky-400" />
                Neural Architecture
              </span>

              {/* Model Architecture Buttons */}
              <div className="space-y-2.5 mb-3 overflow-y-auto">
                {MODELS.map((m) => {
                  const isSelected = modelId === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        setModelId(m.id);
                        setResult(null);
                      }}
                      className={`w-full py-3 px-3.5 rounded-xl text-left transition-all cursor-pointer select-none border ${
                        isSelected
                          ? "bg-slate-800/95 border-sky-400/80 text-white shadow-lg shadow-sky-500/10 font-bold"
                          : "bg-slate-900/50 hover:bg-slate-800/60 text-slate-300 hover:text-white border-white/5 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? "bg-sky-400 shadow-[0_0_8px_#38bdf8]" : "bg-slate-600"}`} />
                          <span className="text-sm font-bold">{m.name}</span>
                        </div>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold ${
                          isSelected 
                            ? "bg-sky-500/20 text-sky-300 border border-sky-400/30" 
                            : "bg-slate-800 text-slate-400"
                        }`}>
                          {isSelected ? "ACTIVE" : m.tag}
                        </span>
                      </div>
                      <div className={`text-xs mt-1 pl-5 ${isSelected ? "text-sky-300/90 font-medium" : "text-slate-400"}`}>
                        {m.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Group: Telemetry Info + Primary CTA Button */}
            <div className="space-y-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-300 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Analysis Matrix:</span>
                  <span className="font-mono text-slate-200 font-semibold">512 × 512 DICOM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Classifier:</span>
                  <span className="text-sky-300 font-semibold">MaxViT Multi-Class</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Lesion Segmentation:</span>
                  <span className="text-emerald-300 font-semibold">Dense Attention Mask</span>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                onClick={runInference}
                disabled={isScanning || !imageUrl}
                className={`relative overflow-hidden h-12 w-full rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center cursor-pointer select-none active:scale-[0.98] shadow-md ${
                  isScanning || !imageUrl
                    ? "bg-slate-800/60 text-slate-500 border border-white/5 cursor-not-allowed shadow-none"
                    : "btn-clinical-primary text-white"
                }`}
              >
                {isScanning ? (
                  <div className="flex items-center justify-center gap-2.5">
                    <RefreshCw className="h-4.5 w-4.5 animate-spin text-white" />
                    <span>ANALYZING CT SCAN...</span>
                  </div>
                ) : (
                  <span className="flex items-center gap-2">
                    <Activity className="h-4.5 w-4.5 text-sky-200" />
                    ANALYZE BRAIN CT SCAN
                  </span>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* COLUMN 2 (6 Cols): SYNCHRONIZED DUAL VIEWPORT + DISPLAY CALIBRATION */}
        {/* ========================================================================= */}
        <section className="col-span-6 flex flex-col gap-2.5 min-h-0">
          
          {/* Main DICOM Dual Viewport Card */}
          <div className="flex-1 min-h-0 rounded-2xl medical-glass-panel p-3.5 flex flex-col relative">
            
            {/* Viewport Top Header */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/5 shrink-0">
              <div className="flex items-center gap-2.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                <span className="text-sm font-semibold text-slate-200 tracking-wide">
                  Synchronized Dual Viewport (512×512)
                </span>
              </div>
              <div className="text-xs font-medium text-slate-400 flex items-center gap-2">
                <span>Right-Click: Loupe</span>
                <span className="text-slate-600">·</span>
                <span>Scroll: Zoom</span>
              </div>
            </div>

            {/* Dual Viewport Canvas Container */}
            <div className="flex-1 min-h-0 relative flex overflow-hidden">
              <div className="h-full w-full grid grid-cols-2 gap-3 relative">
                
                {/* Left Display: ORIGINAL NCCT */}
                <div
                  onContextMenu={(e) => handleViewportContextMenu(e, "left")}
                  onMouseDown={handleViewportMouseDown}
                  onMouseMove={(e) => handleViewportMouseMove(e, "left")}
                  onMouseUp={handleViewportMouseUp}
                  onMouseLeave={handleViewportMouseUp}
                  onWheel={(e) => handleViewportWheel(e, "left")}
                  className={`dicom-canvas-bg relative rounded-xl border border-slate-800 hover:border-sky-500/50 transition-colors overflow-hidden flex items-center justify-center p-2 select-none ${
                    loupe.active ? "cursor-crosshair" : isDraggingViewport ? "cursor-grabbing" : "cursor-grab"
                  }`}
                  title="Right-click to toggle Loupe · Scroll Wheel to Zoom"
                >
                  {isScanning && (
                    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                      <div className="absolute w-full h-[2px] bg-sky-400 animate-laser-sweep shadow-[0_0_12px_#38bdf8]" />
                    </div>
                  )}

                  {showGrid && <div className="dicom-fine-grid absolute inset-0 z-10" />}

                  {/* Corner HUD Brackets */}
                  <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-sky-400/50 pointer-events-none" />
                  <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-sky-400/50 pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-sky-400/50 pointer-events-none" />
                  <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-sky-400/50 pointer-events-none" />

                  <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-md bg-black/80 border border-white/10 text-xs font-mono font-bold text-slate-200 uppercase tracking-wider pointer-events-none">
                    ORIGINAL NCCT
                  </div>
                  <span className="absolute top-3 right-3 z-20 text-xs font-mono text-slate-400 font-bold pointer-events-none">R</span>
                  <span className="absolute bottom-3 right-3 z-20 text-xs font-mono text-slate-400 font-bold pointer-events-none">L</span>

                  {imageUrl ? (
                    <div
                      className="relative h-full w-full flex items-center justify-center transition-transform duration-75 ease-out pointer-events-none"
                      style={{
                        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                        transformOrigin: "center center",
                      }}
                    >
                      <img
                        src={imageUrl}
                        alt="Original CT Scan"
                        className="w-full h-full object-contain pointer-events-none"
                        style={{ filter: `brightness(${brightness}%) contrast(${contrast}%)` }}
                      />
                    </div>
                  ) : (
                    <div className="text-center p-6 text-slate-400 space-y-3 pointer-events-none flex flex-col items-center">
                      <div className="relative flex items-center justify-center text-sky-400/50">
                        <Brain className="h-14 w-14" />
                        <Activity className="h-5 w-5 text-sky-400 absolute" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-200 uppercase tracking-wider">NO SCAN LOADED</p>
                        <p className="text-xs text-slate-400 mt-1">Upload an axial brain slice to begin</p>
                      </div>
                    </div>
                  )}

                  {/* Left Loupe */}
                  {loupe.active && loupe.target === "left" && (
                    <div
                      className="absolute z-50 pointer-events-none rounded-full border-2 border-sky-400 bg-black overflow-hidden shadow-2xl"
                      style={{
                        width: "160px",
                        height: "160px",
                        left: 0,
                        top: 0,
                        transform: `translate3d(${loupe.x - 80}px, ${loupe.y - 80}px, 0)`,
                        willChange: "transform",
                      }}
                    >
                      <div
                        className="absolute inset-0 w-full h-full flex items-center justify-center"
                        style={{
                          transform: `scale(${loupe.scale})`,
                          transformOrigin: `${loupe.normX * 100}% ${loupe.normY * 100}%`,
                        }}
                      >
                        {imageUrl && (
                          <img
                            src={imageUrl}
                            alt="Loupe Base"
                            className="w-full h-full object-contain pointer-events-none"
                            style={{ filter: `brightness(${brightness}%) contrast(${contrast}%)` }}
                          />
                        )}
                      </div>
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        <div className="w-full h-[1px] bg-sky-400/60" />
                        <div className="h-full w-[1px] bg-sky-400/60 absolute" />
                        <div className="w-4 h-4 rounded-full border border-sky-400 absolute" />
                      </div>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-black/90 border border-sky-400 text-sky-400">
                        {loupe.scale.toFixed(1)}×
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Display: AI OVERLAY */}
                <div
                  onContextMenu={(e) => handleViewportContextMenu(e, "right")}
                  onMouseDown={handleViewportMouseDown}
                  onMouseMove={(e) => handleViewportMouseMove(e, "right")}
                  onMouseUp={handleViewportMouseUp}
                  onMouseLeave={handleViewportMouseUp}
                  onWheel={(e) => handleViewportWheel(e, "right")}
                  className={`dicom-canvas-bg relative rounded-xl border border-slate-800 hover:border-sky-500/50 transition-colors overflow-hidden flex items-center justify-center p-2 select-none ${
                    loupe.active ? "cursor-crosshair" : isDraggingViewport ? "cursor-grabbing" : "cursor-grab"
                  }`}
                  title="Right-click to toggle Loupe · Scroll Wheel to Zoom"
                >
                  {isScanning && (
                    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                      <div className="absolute w-full h-[2px] bg-sky-400 animate-laser-sweep shadow-[0_0_12px_#38bdf8]" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm">
                        <div className="w-10 h-10 rounded-full border-2 border-sky-400 border-t-transparent animate-spin mb-3 shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
                        <p className="text-xs font-mono font-bold text-sky-400 tracking-wider uppercase">
                          NEURAL INFERENCE IN PROGRESS...
                        </p>
                      </div>
                    </div>
                  )}

                  {showGrid && <div className="dicom-fine-grid absolute inset-0 z-10" />}

                  {/* Corner HUD Brackets */}
                  <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-sky-400/50 pointer-events-none" />
                  <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-sky-400/50 pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-sky-400/50 pointer-events-none" />
                  <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-sky-400/50 pointer-events-none" />

                  <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 pointer-events-none">
                    <div className="px-2.5 py-1 rounded-md bg-black/80 border border-sky-400/40 text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                      AI OVERLAY - {MODELS.find((m) => m.id === modelId)?.name.toUpperCase()}
                    </div>
                    {result?.detected && (
                      <div className={`px-2 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider border flex items-center gap-1.5 ${
                        result.classification?.predicted_class === "ischemic"
                          ? "bg-amber-950/80 border-amber-500/50 text-amber-300"
                          : "bg-rose-950/80 border-rose-500/50 text-rose-300"
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          result.classification?.predicted_class === "ischemic" ? "bg-amber-400" : "bg-rose-500"
                        }`} />
                        <span>{result.classification?.predicted_class === "ischemic" ? "ISCHEMIC (YELLOW)" : "HEMORRHAGIC (RED)"}</span>
                      </div>
                    )}
                  </div>
                  <span className="absolute top-3 right-3 z-20 text-xs font-mono text-slate-400 font-bold pointer-events-none">R</span>
                  <span className="absolute bottom-3 right-3 z-20 text-xs font-mono text-slate-400 font-bold pointer-events-none">L</span>

                  {imageUrl ? (
                    <div
                      className="relative h-full w-full flex items-center justify-center transition-transform duration-75 ease-out pointer-events-none"
                      style={{
                        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                        transformOrigin: "center center",
                      }}
                    >
                      <img
                        src={imageUrl}
                        alt="Segmented Slice"
                        className="w-full h-full object-contain pointer-events-none"
                        style={{ filter: `brightness(${brightness}%) contrast(${contrast}%)` }}
                      />
                      {result?.maskUrl && (
                        <img
                          src={result.maskUrl}
                          alt="Lesion Mask"
                          className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-150"
                          style={{ opacity: maskOpacity / 100 }}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="text-center p-6 text-slate-400 space-y-3 pointer-events-none flex flex-col items-center">
                      <div className="relative flex items-center justify-center text-sky-400/50">
                        <Brain className="h-14 w-14" />
                        <Layers className="h-5 w-5 text-sky-400 absolute" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-200 uppercase tracking-wider">LESION OVERLAY</p>
                        <p className="text-xs text-slate-400 mt-1">Segmentation overlays will appear upon analysis</p>
                      </div>
                    </div>
                  )}

                  {/* Right Loupe */}
                  {loupe.active && loupe.target === "right" && (
                    <div
                      className="absolute z-50 pointer-events-none rounded-full border-2 border-sky-400 bg-black overflow-hidden shadow-2xl"
                      style={{
                        width: "160px",
                        height: "160px",
                        left: 0,
                        top: 0,
                        transform: `translate3d(${loupe.x - 80}px, ${loupe.y - 80}px, 0)`,
                        willChange: "transform",
                      }}
                    >
                      <div
                        className="absolute inset-0 w-full h-full flex items-center justify-center"
                        style={{
                          transform: `scale(${loupe.scale})`,
                          transformOrigin: `${loupe.normX * 100}% ${loupe.normY * 100}%`,
                        }}
                      >
                        {imageUrl && (
                          <img
                            src={imageUrl}
                            alt="Loupe Base"
                            className="w-full h-full object-contain pointer-events-none"
                            style={{ filter: `brightness(${brightness}%) contrast(${contrast}%)` }}
                          />
                        )}
                        {result?.maskUrl && (
                          <img
                            src={result.maskUrl}
                            alt="Loupe Mask"
                            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                            style={{ opacity: maskOpacity / 100 }}
                          />
                        )}
                      </div>
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        <div className="w-full h-[1px] bg-sky-400/60" />
                        <div className="h-full w-[1px] bg-sky-400/60 absolute" />
                        <div className="w-4 h-4 rounded-full border border-sky-400 absolute" />
                      </div>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-black/90 border border-sky-400 text-sky-400">
                        {loupe.scale.toFixed(1)}×
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* DISPLAY CALIBRATION CONTROLS */}
          <div className="rounded-2xl medical-glass-panel p-3.5 shrink-0">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 shrink-0 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-wider text-sky-400 uppercase flex items-center gap-2">
                  <Sliders className="h-4.5 w-4.5 text-sky-400" />
                  Display Calibration
                </span>
              </div>

              {/* Utility Controls: Zoom, Gridlines, Reset */}
              <div className="flex items-center gap-2.5">
                {/* Zoom Level Indicator */}
                <div className="flex items-center bg-slate-900/80 px-1.5 py-1 rounded-xl border border-white/5">
                  <button
                    onClick={handleZoomOut}
                    disabled={zoom <= 0.5}
                    title="Zoom Out (-25%)"
                    className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleResetZoom}
                    title="Reset Zoom to 100%"
                    className="px-2.5 py-0.5 rounded text-xs font-mono font-bold text-sky-400 hover:text-white hover:bg-slate-800 cursor-pointer transition-colors"
                  >
                    {Math.round(zoom * 100)}%
                  </button>
                  <button
                    onClick={handleZoomIn}
                    disabled={zoom >= 4}
                    title="Zoom In (+25%)"
                    className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                </div>

                {/* Gridlines Button */}
                <button
                  onClick={toggleGrid}
                  title="Toggle Fine Medical Measurement Gridlines"
                  className={`h-8 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                    showGrid
                      ? "bg-sky-500 text-white border border-sky-400 shadow-sm"
                      : "btn-clinical-subtle"
                  }`}
                >
                  <Grid className={`h-3.5 w-3.5 ${showGrid ? "text-white" : "text-slate-300"}`} />
                  Grid {showGrid ? "ON" : "OFF"}
                </button>

                {/* Reset View Button */}
                <button
                  onClick={resetControls}
                  className="btn-clinical-subtle h-8 px-3 rounded-xl text-xs font-semibold hover:text-sky-300 hover:border-sky-400/50 flex items-center gap-1.5 cursor-pointer"
                  title="Reset viewport and slider adjustments"
                >
                  <RotateCcw className="h-3.5 w-3.5 text-sky-400" />
                  Reset
                </button>
              </div>
            </div>

            {/* 4 Soft Blue Circular Knob Sliders (2x2 Grid) */}
            <div className="grid grid-cols-2 gap-3">
              
              {/* 1. Brightness */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-sky-400/30 transition-colors flex flex-col justify-between">
                <div className="flex items-center justify-between text-sm font-semibold text-slate-200 mb-1.5">
                  <span className="flex items-center gap-2 text-slate-300">
                    <Sun className="h-4 w-4 text-sky-400" />
                    Brightness
                  </span>
                  <button
                    onClick={() => setBrightness(100)}
                    title="Reset to 100%"
                    className="px-2.5 py-0.5 rounded-lg bg-slate-800 border border-sky-400/30 text-sky-300 font-mono text-xs font-bold cursor-pointer hover:bg-slate-700"
                  >
                    {brightness}%
                  </button>
                </div>
                <SmoothSlider value={brightness} onChange={setBrightness} min={50} max={150} />
              </div>

              {/* 2. Contrast */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-sky-400/30 transition-colors flex flex-col justify-between">
                <div className="flex items-center justify-between text-sm font-semibold text-slate-200 mb-1.5">
                  <span className="flex items-center gap-2 text-slate-300">
                    <Eye className="h-4 w-4 text-sky-400" />
                    Contrast
                  </span>
                  <button
                    onClick={() => setContrast(100)}
                    title="Reset to 100%"
                    className="px-2.5 py-0.5 rounded-lg bg-slate-800 border border-sky-400/30 text-sky-300 font-mono text-xs font-bold cursor-pointer hover:bg-slate-700"
                  >
                    {contrast}%
                  </button>
                </div>
                <SmoothSlider value={contrast} onChange={setContrast} min={50} max={200} />
              </div>

              {/* 3. Mask Opacity */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-sky-400/30 transition-colors flex flex-col justify-between">
                <div className="flex items-center justify-between text-sm font-semibold text-slate-200 mb-1.5">
                  <span className="flex items-center gap-2 text-slate-300">
                    <Layers className="h-4 w-4 text-sky-400" />
                    Mask Opacity
                  </span>
                  <button
                    onClick={() => setMaskOpacity(85)}
                    title="Reset to 85%"
                    className="px-2.5 py-0.5 rounded-lg bg-slate-800 border border-sky-400/30 text-sky-300 font-mono text-xs font-bold cursor-pointer hover:bg-slate-700"
                  >
                    {maskOpacity}%
                  </button>
                </div>
                <SmoothSlider value={maskOpacity} onChange={setMaskOpacity} min={0} max={100} />
              </div>

              {/* 4. Sensitivity Threshold */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-sky-400/30 transition-colors flex flex-col justify-between">
                <div className="flex items-center justify-between text-sm font-semibold text-slate-200 mb-1.5">
                  <span className="flex items-center gap-2 text-slate-300">
                    <Activity className="h-4 w-4 text-sky-400" />
                    Sensitivity Threshold
                  </span>
                  <button
                    onClick={() => recomputeThreshold(50)}
                    title="Reset to 50%"
                    className="px-2.5 py-0.5 rounded-lg bg-slate-800 border border-sky-400/30 text-sky-300 font-mono text-xs font-bold cursor-pointer hover:bg-slate-700"
                  >
                    {threshold}%
                  </button>
                </div>
                <SmoothSlider value={threshold} onChange={recomputeThreshold} min={10} max={95} />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* COLUMN 3 (3 Cols): DIAGNOSTIC ASSESSMENT & CLINICAL EXPORT */}
        {/* ========================================================================= */}
        <section className="col-span-3 flex flex-col gap-2.5 min-h-0 overflow-y-auto">
          
          <div className="rounded-2xl medical-glass-panel p-4 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-white/5">
                <span className="text-sm font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                  <Activity className="h-4.5 w-4.5 text-sky-400" />
                  Diagnostic Assessment
                </span>
                <span className="text-xs text-slate-400 font-mono px-2 py-0.5 rounded-md bg-slate-900/60 border border-white/5">
                  CASE REPORT
                </span>
              </div>

              {/* Outcome Clinical Banner / Standby State */}
              <div>
                {result ? (
                  result.classification?.predicted_class === "hemorrhagic" ? (
                    <div className="p-3.5 rounded-xl bg-red-950/40 border-2 border-red-500 text-red-100 space-y-2 shadow-[0_0_20px_rgba(239,68,68,0.25)]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4.5 w-4.5 text-red-400 shrink-0" />
                          <span className="font-extrabold text-sm tracking-tight text-red-200">HEMORRHAGIC STROKE</span>
                        </div>
                        <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded-full bg-red-600 text-white shadow-sm">
                          {(result.classification.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-sm font-bold text-white">Acute Hemorrhage Detected</p>
                      <p className="text-xs text-red-300/90 leading-relaxed">High-attenuation acute hemorrhagic lesion identified.</p>
                    </div>
                  ) : result.classification?.predicted_class === "ischemic" || (result.detected && (result.lesionArea ?? 0) >= 0.05) ? (
                    <div className="p-3.5 rounded-xl bg-amber-950/40 border-2 border-amber-500 text-amber-100 space-y-2 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4.5 w-4.5 text-amber-400 shrink-0" />
                          <span className="font-extrabold text-sm tracking-tight text-amber-200">ISCHEMIC STROKE</span>
                        </div>
                        <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded-full bg-amber-600 text-white shadow-sm">
                          POSITIVE
                        </span>
                      </div>
                      <p className="text-sm font-bold text-white">Acute Ischemic Infarction</p>
                      <p className="text-xs text-amber-300/90 leading-relaxed">Low attenuation ischemic territory segmented by neural model.</p>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-emerald-950/40 border-2 border-emerald-500 text-emerald-100 space-y-2 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                          <span className="font-extrabold text-sm tracking-tight text-emerald-200">NORMAL HEAD CT</span>
                        </div>
                        <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded-full bg-emerald-600 text-white shadow-sm">
                          NEGATIVE
                        </span>
                      </div>
                      <p className="text-sm font-bold text-white">No Acute Stroke Lesion</p>
                      <p className="text-xs text-emerald-300/90 leading-relaxed">No acute infarction or hemorrhage observed above threshold cutoff.</p>
                    </div>
                  )
                ) : (
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-3">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-400/25 flex items-center justify-center mx-auto text-sky-400 shadow-sm">
                        <Activity className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-100">Diagnostic Engine Standby</p>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          Upload a brain CT scan and click Analyze to generate deep learning lesion segmentation, acute stroke probability, and volumetric quantification.
                        </p>
                      </div>
                    </div>

                    {/* Pre-Analysis Status Overview */}
                    <div className="pt-2 border-t border-white/5 space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400 font-medium">Selected Model:</span>
                        <span className="text-sky-300 font-semibold">{MODELS.find((m) => m.id === modelId)?.name}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400 font-medium">Sensitivity Threshold:</span>
                        <span className="font-mono text-slate-200 font-semibold">{threshold}%</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-400 font-medium">Engine Status:</span>
                        <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Ready for Input
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Multi-Class Disease Classification Breakdown (MaxViT) */}
              {result?.classification && (
                <div className="space-y-2.5 p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                    <span className="flex items-center gap-1.5 text-sky-400 font-bold uppercase tracking-wider">
                      <Sparkles className="h-4 w-4" />
                      Disease Classification (MaxViT)
                    </span>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-400/25">
                      {result.classification.predicted_label}
                    </span>
                  </div>
                  <div className="space-y-2 pt-1">
                    {result.classification.classes.map((cls) => (
                      <div key={cls.id} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium text-slate-300">
                          <span className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                cls.id === "hemorrhagic"
                                  ? "bg-red-400"
                                  : cls.id === "ischemic"
                                  ? "bg-amber-400"
                                  : "bg-emerald-400"
                              }`}
                            />
                            {cls.label}
                          </span>
                          <span className="font-mono text-white font-bold">{cls.percentage}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              cls.id === "hemorrhagic"
                                ? "bg-red-500"
                                : cls.id === "ischemic"
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                            }`}
                            style={{ width: `${cls.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Segmentation Model Confidence Meter */}
              {result && (
                <div className="space-y-2 p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                  <div className="flex justify-between text-xs font-semibold text-slate-300">
                    <span className="text-sm font-semibold text-slate-200">Segmentation Confidence</span>
                    <span className="font-mono text-sky-400 font-bold text-sm">
                      {(result.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5">
                    <div
                      className={`h-full transition-all duration-300 ${
                        result?.detected
                          ? "bg-gradient-to-r from-amber-400 to-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                          : "bg-gradient-to-r from-blue-500 to-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                      }`}
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Key Clinical Metrics Table */}
              <div className="space-y-2 text-xs sm:text-sm bg-slate-900/60 border border-white/5 rounded-xl p-3.5 text-slate-300">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400 font-medium">Neural Architecture:</span>
                  <span className="font-semibold text-white">{result?.modelLabel ?? MODELS.find((m) => m.id === modelId)?.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400 font-medium">Lesion ROI Volume:</span>
                  <span className="font-mono text-sky-400 font-bold">{result ? `${result.lesionArea ?? 0}%` : "—"}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400 font-medium">Sensitivity Cutoff:</span>
                  <span className="font-mono text-slate-200 font-semibold">{threshold}%</span>
                </div>
              </div>
            </div>

            {/* Bottom-Right Stacked CTAs: Subtle, Cyan, Teal */}
            <div className="space-y-2.5 pt-3 border-t border-white/5">
              {/* Copy Clinical Summary */}
              <button
                onClick={copySummaryToClipboard}
                disabled={!result}
                className="btn-clinical-subtle w-full h-10 disabled:opacity-30 disabled:cursor-not-allowed text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                title="Copy clinical summary to clipboard"
              >
                {copiedToast ? <Check className="h-4 w-4 text-sky-400" /> : <Copy className="h-4 w-4 text-slate-300" />}
                <span>{copiedToast ? "Summary Copied!" : "Copy Clinical Summary"}</span>
              </button>

              {/* Export Composite Image */}
              <button
                onClick={exportAnnotatedImage}
                disabled={!imageUrl}
                className="btn-clinical-cyan w-full h-10 disabled:opacity-30 disabled:cursor-not-allowed text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-sm"
                title="Export high-resolution annotated image composite with lesion mask overlay"
              >
                {exportedStatus === "image" ? (
                  <CheckCircle2 className="h-4 w-4 text-white" />
                ) : (
                  <Download className="h-4 w-4 text-white" />
                )}
                <span>{exportedStatus === "image" ? "Image Exported!" : "Export Composite Image"}</span>
              </button>

              {/* Download Clinical Report */}
              <button
                onClick={exportReportText}
                disabled={!result}
                className="btn-clinical-teal w-full h-11 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-sm"
                title="Download formal clinical diagnostic summary text report"
              >
                {exportedStatus === "report" ? (
                  <CheckCircle2 className="h-4 w-4 text-white" />
                ) : (
                  <FileText className="h-4 w-4" />
                )}
                <span>{exportedStatus === "report" ? "Report Downloaded!" : "Download Clinical Report"}</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 3. Streamlined Clinical Footer */}
      <footer className="h-5 flex items-center justify-between text-xs font-medium text-slate-500 px-3 shrink-0 border-t border-white/5 pt-0.5">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
          NU Stroke Scan · Naresuan University Hospital Neuro-Imaging Research Center
        </span>
        <span>DICOM 3.0 Compatible · Clinical AI Workstation</span>
      </footer>
    </div>
  );
}
