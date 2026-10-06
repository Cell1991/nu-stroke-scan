"use client";

import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";

// Native Minimalist Vector Icons
function IconBrain({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15A2.5 2.5 0 0 1 9.5 22h-1A3.5 3.5 0 0 1 5 18.5V17a3 3 0 0 1-3-3v-1.5A2.5 2.5 0 0 1 4.5 10H5a3.5 3.5 0 0 1 3.5-3.5h1zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 2.5 2.5h1a3.5 3.5 0 0 0 3.5-3.5V17a3 3 0 0 0 3-3v-1.5A2.5 2.5 0 0 0 19.5 10H19a3.5 3.5 0 0 0-3.5-3.5h-1z" />
    </svg>
  );
}

function IconActivity({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function IconLayers({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function IconUpload({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 16l-4-4m0 0l-4 4m4-4v12M4 14.5A5.5 5.5 0 018 9h.5A7 7 0 1120 13a4.5 4.5 0 01-4 4.5" />
    </svg>
  );
}

function IconRefresh({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

function IconChevronRight({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function IconImage({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function IconRotateCcw({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M1 4v6h6M3.51 15a9 9 0 102.13-9.36L1 10" />
    </svg>
  );
}

function IconSliders({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

function IconAlertTriangle({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4m0 4h.01" />
    </svg>
  );
}

function IconCheckCircle({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconDownload({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function IconFileText({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

type ScanResult = {
  label: string;
  confidence: number;
  maskUrl: string;
  detected: boolean;
  lesionArea?: number;
  modelLabel?: string;
  inputSize?: [number, number];
};

const MAX_FILE_SIZE = 25 * 1024 * 1024;

const MODEL_OPTIONS = [
  {
    id: "vcanet",
    name: "VCA-Net",
    description: "Visual Cortex Attention Network (V1/V2/V4 + IT) for acute stroke lesion detection.",
    recommended: true,
  },
  {
    id: "dlka",
    name: "Deformable LKA",
    description: "MaxViT + Deformable Large Kernel Attention for adaptive boundary segmentation.",
    recommended: false,
  },
  {
    id: "patcher",
    name: "Patcher (SegFormer)",
    description: "Hierarchical Patch Transformer with multi-scale receptive fields for acute stroke.",
    recommended: false,
  },
];

// Generator for sample Brain CT scan data URL
function generateSampleCTDataUrl(withLesion: boolean = true): string {
  if (typeof document === "undefined") return "";
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  ctx.fillStyle = "#05070a";
  ctx.fillRect(0, 0, 256, 256);

  ctx.beginPath();
  ctx.ellipse(128, 128, 95, 110, 0, 0, 2 * Math.PI);
  ctx.fillStyle = "#2a3441";
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(128, 128, 88, 102, 0, 0, 2 * Math.PI);
  ctx.fillStyle = "#78879b";
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(128, 128, 82, 96, 0, 0, 2 * Math.PI);
  ctx.fillStyle = "#475569";
  ctx.fill();

  ctx.fillStyle = "#1e293b";
  ctx.beginPath();
  ctx.ellipse(115, 118, 12, 35, -0.2, 0, 2 * Math.PI);
  ctx.ellipse(141, 118, 12, 35, 0.2, 0, 2 * Math.PI);
  ctx.fill();

  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(128, 35);
  ctx.lineTo(128, 220);
  ctx.stroke();

  if (withLesion) {
    ctx.fillStyle = "#1e2430";
    ctx.beginPath();
    ctx.ellipse(152, 110, 24, 18, 0.3, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "#27303f";
    ctx.beginPath();
    ctx.ellipse(155, 112, 16, 12, 0.2, 0, 2 * Math.PI);
    ctx.fill();
  }

  return canvas.toDataURL("image/png");
}

const MEDICAL_PRESETS = [
  { id: "default", name: "Standard CT", wl: 50, ww: 100, brightness: 100, contrast: 100 },
  { id: "stroke", name: "⚡ Stroke Window", wl: 38, ww: 38, brightness: 105, contrast: 135 },
  { id: "brain", name: "🧠 Brain Tissue", wl: 45, ww: 75, brightness: 100, contrast: 115 },
  { id: "blood", name: "🩸 Hemorrhage", wl: 65, ww: 110, brightness: 100, contrast: 110 },
  { id: "bone", name: "💀 Bone / Skull", wl: 80, ww: 180, brightness: 95, contrast: 120 },
];

export default function HomePage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // DICOM & Medical PACS Controls
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [windowLevel, setWindowLevel] = useState(50);
  const [windowWidth, setWindowWidth] = useState(100);
  const [activePreset, setActivePreset] = useState("default");
  const [maskOpacity, setMaskOpacity] = useState(80);
  const [confidenceThreshold, setConfidenceThreshold] = useState(50);
  const [modelId, setModelId] = useState("vcanet");
  const [invertColors, setInvertColors] = useState(false);

  useEffect(() => {
    return () => {
      if (imageUrl && imageUrl.startsWith("blob:")) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  function processSelectedFile(selectedFile: File) {
    setError(null);
    setResult(null);
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid brain CT scan image (PNG, JPG, or WEBP).");
      return;
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("Image size exceeds 25 MB threshold.");
      return;
    }
    if (imageUrl && imageUrl.startsWith("blob:")) URL.revokeObjectURL(imageUrl);
    setFile(selectedFile);
    setImageUrl(URL.createObjectURL(selectedFile));
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) processSelectedFile(selectedFile);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function handleDragEnter(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      processSelectedFile(droppedFile);
    }
  }

  function loadSampleCTScan() {
    setError(null);
    setResult(null);
    const sampleDataUrl = generateSampleCTDataUrl(true);
    setImageUrl(sampleDataUrl);
    
    fetch(sampleDataUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const sampleFile = new File([blob], "sample_brain_ct_stroke.png", { type: "image/png" });
        setFile(sampleFile);
      });
  }

  async function scanImage() {
    if (!imageUrl) {
      setError("Please select or load a brain CT scan image first.");
      return;
    }
    setError(null);
    setIsScanning(true);
    try {
      let activeFile = file;
      if (!activeFile && imageUrl) {
        const res = await fetch(imageUrl);
        const blob = await res.blob();
        activeFile = new File([blob], "ct_scan_input.png", { type: "image/png" });
        setFile(activeFile);
      }

      const formData = new FormData();
      formData.append("file", activeFile!);
      formData.append("model", modelId);
      formData.append("threshold", String(confidenceThreshold / 100));

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/analysis`, {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as {
        detail?: string;
        label?: string;
        confidence?: number;
        mask_png_base64?: string;
        lesion_detected?: boolean;
        lesion_area_percentage?: number;
        model_label?: string;
        input_size?: [number, number];
      };

      if (!response.ok) throw new Error(payload.detail ?? "Analysis request failed.");
      if (!payload.label || payload.confidence === undefined || !payload.mask_png_base64) {
        throw new Error("Received incomplete analysis response payload.");
      }

      const isDetected = payload.lesion_detected ?? payload.confidence >= confidenceThreshold / 100;

      setResult({
        label: payload.label,
        confidence: payload.confidence,
        maskUrl: `data:image/png;base64,${payload.mask_png_base64}`,
        detected: isDetected,
        lesionArea: payload.lesion_area_percentage,
        modelLabel: payload.model_label,
        inputSize: payload.input_size,
      });
    } catch (scanError) {
      setError(scanError instanceof Error ? scanError.message : "Failed to complete brain scan analysis.");
    } finally {
      setIsScanning(false);
    }
  }

  function applyPreset(presetId: string) {
    const p = MEDICAL_PRESETS.find((item) => item.id === presetId);
    if (!p) return;
    setActivePreset(p.id);
    setWindowLevel(p.wl);
    setWindowWidth(p.ww);
    setBrightness(p.brightness);
    setContrast(p.contrast);
  }

  function resetAdjustments() {
    setActivePreset("default");
    setWindowLevel(50);
    setWindowWidth(100);
    setBrightness(100);
    setContrast(100);
    setMaskOpacity(80);
    setInvertColors(false);
  }

  function exportResult() {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `nu-stroke-scan-${file?.name ?? "result"}.png`;
    link.click();
  }

  function exportReport() {
    if (!result || !file) return;
    const reportText = `=====================================================
NU STROKE SCAN - AI DIAGNOSTIC DECISION SUPPORT REPORT
=====================================================
Institution: Naresuan University Neuro-Imaging Center
Date: ${new Date().toLocaleString()}
Patient ID: #PT-2026-9042
Modality: Non-Contrast Brain CT Scan
Model Architecture: ${MODEL_OPTIONS.find((m) => m.id === modelId)?.name || modelId}
-----------------------------------------------------
AI MODEL OUTPUT:
- Detection Outcome: ${result.detected ? "STROKE LESION DETECTED (POSITIVE)" : "NO LESION DETECTED (NEGATIVE)"}
- Model Prediction Label: ${result.label}
- AI Confidence: ${(result.confidence * 100).toFixed(1)}%
- Lesion Area (ROI): ${result.lesionArea ?? 0}%
- Decision Threshold: ${confidenceThreshold}%
- Image Source: ${file.name}
-----------------------------------------------------
CLINICAL NOTICE:
This output is generated directly by the deep learning segmentation model.
Automated analysis must be confirmed by a licensed medical practitioner.
=====================================================`;

    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `nu-stroke-report-${file.name.replace(/\.[^/.]+$/, "")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  // Real-time Medical PACS VOI LUT Transfer calculation
  const normWw = Math.max(0.15, windowWidth / 100);
  const normWl = windowLevel / 100;
  const lutSlope = Number(((1 / normWw) * (contrast / 100)).toFixed(4));
  const lutIntercept = Number((- (1 / normWw) * (contrast / 100) * (normWl - normWw / 2) + (brightness - 100) / 200).toFixed(4));

  const imageFilterStyle: React.CSSProperties = {
    filter: `url(#pacs-medical-filter) ${invertColors ? "invert(100%)" : ""}`,
  };

  const selectedModelInfo = MODEL_OPTIONS.find((m) => m.id === modelId);

  return (
    <div className="h-screen w-screen bg-slate-900 text-slate-100 flex flex-col overflow-hidden font-sans p-2 gap-2">
      {/* Hardware-Accelerated Medical PACS VOI LUT Transfer Filter */}
      <svg className="absolute w-0 h-0 pointer-events-none opacity-0 -z-50" aria-hidden="true">
        <filter id="pacs-medical-filter" colorInterpolationFilters="sRGB">
          <feComponentTransfer>
            <feFuncR type="linear" slope={lutSlope} intercept={lutIntercept} />
            <feFuncG type="linear" slope={lutSlope} intercept={lutIntercept} />
            <feFuncB type="linear" slope={lutSlope} intercept={lutIntercept} />
          </feComponentTransfer>
        </filter>
      </svg>

      {/* 1. Header (Deep Slate PACS Header) */}
      <header className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 shadow-sm flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-sky-600 text-white flex items-center justify-center shadow-md">
            <IconBrain className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-black tracking-tight text-white leading-none">NU STROKE SCAN</h1>
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-sky-950 text-sky-300 border border-sky-700">
                Medical AI Workstation
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-300 mt-0.5 leading-none">
              AI-Assisted Neuro-Imaging Decision Support Workstation · Naresuan University
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadSampleCTScan}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 transition cursor-pointer shadow-2xs flex items-center gap-1.5"
          >
            Load Sample CT Scan
          </button>
          <div className="h-5 w-px bg-slate-700 hidden sm:block" />
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            System Active
          </div>
        </div>
      </header>

      {/* 2. Main Workspace Grid (100% Fit in Viewport) */}
      <main className="flex-1 min-h-0 grid grid-cols-12 gap-2.5 overflow-hidden">
        
        {/* Left Column: Model Select & Input (3 Cols) */}
        <section className="col-span-3 flex flex-col gap-2.5 min-h-0">
          {/* Card 1: AI Model Engine */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-2xs p-3">
            <div className="flex items-center justify-between mb-2 border-b border-slate-700 pb-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wide text-white flex items-center gap-1.5">
                <IconLayers className="h-4 w-4 text-sky-400" />
                01. AI Model Engine
              </h2>
              <span className="text-[11px] font-bold text-sky-300 bg-sky-950 px-1.5 py-0.5 rounded border border-sky-800">
                PyTorch 2.5
              </span>
            </div>

            <div className="space-y-1.5">
              {MODEL_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setModelId(opt.id);
                    setResult(null);
                  }}
                  className={`w-full text-left p-2 rounded-lg border transition cursor-pointer ${
                    modelId === opt.id
                      ? "bg-sky-950/80 border-2 border-sky-500 text-white font-bold shadow-2xs"
                      : "bg-slate-900/60 border border-slate-700 hover:bg-slate-700/60 text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      {opt.name}
                      {opt.recommended && (
                        <span className="bg-emerald-900 text-emerald-200 text-[10px] font-bold px-1.5 py-0.2 rounded border border-emerald-700">
                          Default
                        </span>
                      )}
                    </span>
                    <div
                      className={`h-3.5 w-3.5 rounded-full border-2 flex items-center justify-center ${
                        modelId === opt.id ? "border-sky-400 bg-sky-500 text-slate-950" : "border-slate-500"
                      }`}
                    >
                      {modelId === opt.id && <div className="h-1.5 w-1.5 rounded-full bg-slate-950" />}
                    </div>
                  </div>
                  <p className="text-[11px] font-medium text-slate-300 mt-0.5 leading-tight">{opt.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Card 2: CT Scan Input */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-2xs p-3 flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-2 border-b border-slate-700 pb-1.5 shrink-0">
              <h2 className="text-xs font-bold uppercase tracking-wide text-white flex items-center gap-1.5">
                <IconUpload className="h-4 w-4 text-sky-400" />
                02. CT Scan Input
              </h2>
              <span className="text-[11px] font-bold text-slate-300">Max 25MB</span>
            </div>

            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`group flex-1 min-h-0 border-2 border-dashed rounded-xl p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 relative overflow-hidden ${
                isDragging
                  ? "border-sky-400 bg-sky-950/80 ring-2 ring-sky-400/50 scale-[1.01] shadow-lg shadow-sky-950"
                  : "border-slate-600 hover:border-sky-400 bg-slate-900/60 hover:bg-slate-700/50"
              }`}
            >
              {isDragging ? (
                <div className="space-y-1.5 pointer-events-none animate-pulse">
                  <IconUpload className="h-9 w-9 mx-auto text-sky-400 animate-bounce" />
                  <p className="text-xs font-black text-sky-300 uppercase tracking-wide">Drop CT Image Here</p>
                  <p className="text-[11px] font-semibold text-slate-300">Release file to load scan</p>
                </div>
              ) : imageUrl ? (
                <div className="relative h-full w-full flex items-center justify-center">
                  <img src={imageUrl} alt="Scan Preview" className="max-h-full max-w-full object-contain rounded-lg border border-slate-700" />
                  <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-lg text-white font-bold text-xs gap-1.5 backdrop-blur-2xs">
                    <IconRefresh className="h-4 w-4" /> Change Image (or Drop New File)
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <IconUpload className="h-8 w-8 mx-auto text-sky-400 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-bold text-white">Click or Drag CT Image Here</p>
                  <p className="text-[11px] font-semibold text-slate-300">Supports PNG, JPG, WEBP formats</p>
                </div>
              )}
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={scanImage}
              disabled={isScanning || !imageUrl}
              className="mt-2.5 w-full h-10 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-black text-xs uppercase tracking-wide rounded-lg shadow-sm transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              {isScanning ? (
                <>
                  <IconRefresh className="h-4 w-4 animate-spin text-white" />
                  Analyzing Neural Network...
                </>
              ) : (
                <>
                  <IconBrain className="h-4 w-4" />
                  Analyze CT Scan Now
                  <IconChevronRight className="h-4 w-4 ml-auto" />
                </>
              )}
            </button>

            <div className="mt-2 pt-2 border-t border-slate-700 flex items-center justify-between text-[11px] font-bold text-slate-300 shrink-0">
              <span className="truncate max-w-[150px]" title={file?.name}>
                {file ? file.name : "No image selected"}
              </span>
              <span>{file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Awaiting scan"}</span>
            </div>
          </div>
        </section>

        {/* Center Column: Dual Viewer & Sliders (6 Cols) */}
        <section className="col-span-6 flex flex-col gap-2.5 min-h-0">
          <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-2xs p-3 flex-1 flex flex-col min-h-0">
            {/* DICOM Toolbar Header */}
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-700 shrink-0">
              <h2 className="text-xs font-bold uppercase tracking-wide text-white flex items-center gap-1.5">
                <IconImage className="h-4 w-4 text-sky-400" />
                03. DICOM Visual Comparison & Windowing
              </h2>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInvertColors(!invertColors)}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold border transition cursor-pointer ${
                    invertColors ? "bg-white text-slate-950 border-white" : "bg-slate-700 text-white border-slate-600 hover:bg-slate-600"
                  }`}
                >
                  Invert
                </button>
                <button
                  onClick={resetAdjustments}
                  className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white border border-amber-500 shadow-2xs transition cursor-pointer flex items-center gap-1.5"
                  title="คืนค่าการปรับแต่งทั้งหมดกลับเป็นค่ามาตรฐาน"
                >
                  <IconRotateCcw className="h-3.5 w-3.5" /> คืนค่าเริ่มต้น (Reset All)
                </button>
              </div>
            </div>

            {/* DICOM Display Canvas */}
            <div className="grid grid-cols-2 gap-2.5 flex-1 min-h-0">
              {/* Left Canvas: Original CT Scan */}
              <div className="flex flex-col min-h-0">
                <div className="dicom-canvas-bg relative flex-1 rounded-xl border-2 border-slate-900 overflow-hidden flex items-center justify-center p-1.5">
                  <span className="absolute top-2 left-2.5 text-xs font-mono text-slate-400 font-bold">R</span>
                  <span className="absolute top-2 right-2.5 text-xs font-mono text-slate-400 font-bold">L</span>
                  <span className="absolute bottom-2 left-2.5 text-xs font-mono text-slate-400 font-bold">A</span>
                  <span className="absolute bottom-2 right-2.5 text-xs font-mono text-slate-400 font-bold">P</span>

                  {imageUrl ? (
                    <img src={imageUrl} alt="Original CT" style={imageFilterStyle} className="max-h-full max-w-full object-contain" />
                  ) : (
                    <div className="text-center text-slate-500 space-y-1">
                      <IconBrain className="h-8 w-8 mx-auto opacity-40 text-slate-400" />
                      <p className="text-xs font-bold text-slate-400">Original Non-Contrast CT</p>
                    </div>
                  )}
                </div>
                <p className="text-center text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1 shrink-0">
                  Original Non-Contrast CT
                </p>
              </div>

              {/* Right Canvas: AI Segmented Mask Overlay */}
              <div className="flex flex-col min-h-0">
                <div className="dicom-canvas-bg relative flex-1 rounded-xl border-2 border-slate-900 overflow-hidden flex items-center justify-center p-1.5">
                  <span className="absolute top-2 left-2.5 text-xs font-mono text-slate-400 font-bold">R</span>
                  <span className="absolute top-2 right-2.5 text-xs font-mono text-slate-400 font-bold">L</span>
                  <span className="absolute bottom-2 left-2.5 text-xs font-mono text-slate-400 font-bold">A</span>
                  <span className="absolute bottom-2 right-2.5 text-xs font-mono text-slate-400 font-bold">P</span>

                  {imageUrl ? (
                    <div className="relative h-full w-full flex items-center justify-center">
                      <img src={imageUrl} alt="Base CT Scan" style={imageFilterStyle} className="max-h-full max-w-full object-contain" />
                      {result?.maskUrl && (
                        <img
                          src={result.maskUrl}
                          alt="Segmented Lesion Mask"
                          className="lesion-mask absolute inset-0 max-h-full max-w-full m-auto object-contain transition-opacity duration-150 pointer-events-none select-none"
                          style={{ opacity: maskOpacity / 100 }}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="text-center text-slate-500 space-y-1">
                      <IconActivity className="h-8 w-8 mx-auto opacity-40 text-slate-400" />
                      <p className="text-xs font-bold text-slate-400">AI Segmented Mask</p>
                    </div>
                  )}
                </div>
                <p className="text-center text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1 shrink-0">
                  AI Segmented Lesion Mask
                </p>
              </div>
            </div>

            {/* Medical PACS CT Window Presets Bar */}
            <div className="mt-2 p-1.5 rounded-lg bg-slate-900/90 border border-slate-700 flex items-center justify-between gap-1.5 shrink-0">
              <span className="text-[11px] font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-1 shrink-0 px-1">
                <IconSliders className="h-3.5 w-3.5 text-sky-400" />
                Medical CT Presets:
              </span>
              <div className="flex items-center gap-1 overflow-x-auto">
                {MEDICAL_PRESETS.map((p) => {
                  const isActive = activePreset === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => applyPreset(p.id)}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold transition flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                        isActive
                          ? "bg-sky-600 text-white ring-1 ring-sky-300 shadow-sm"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700"
                      }`}
                    >
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Precision PACS Sliders Grid (4 Sliders) */}
            <div className="mt-2 grid grid-cols-4 gap-2 shrink-0">
              {/* Window Level (WL) */}
              <div className="p-1.5 rounded-lg bg-slate-900/70 border border-slate-700/80">
                <div className="flex justify-between text-xs font-bold text-slate-200 mb-1">
                  <span>Level (WL)</span>
                  <span className="font-mono text-sky-400 font-bold">{windowLevel}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={windowLevel}
                  onChange={(e) => {
                    setWindowLevel(Number(e.target.value));
                    setActivePreset("custom");
                  }}
                  className="medical-slider"
                  title="Window Level / Center (ความหนาแน่นกึ่งกลาง)"
                />
              </div>

              {/* Window Width (WW / Contrast) */}
              <div className="p-1.5 rounded-lg bg-slate-900/70 border border-slate-700/80">
                <div className="flex justify-between text-xs font-bold text-slate-200 mb-1">
                  <span>Width (WW)</span>
                  <span className="font-mono text-sky-400 font-bold">{windowWidth}%</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="200"
                  value={windowWidth}
                  onChange={(e) => {
                    setWindowWidth(Number(e.target.value));
                    setActivePreset("custom");
                  }}
                  className="medical-slider"
                  title="Window Width (ความกว้างช่วงคอนทราสต์)"
                />
              </div>

              {/* Brightness Gain */}
              <div className="p-1.5 rounded-lg bg-slate-900/70 border border-slate-700/80">
                <div className="flex justify-between text-xs font-bold text-slate-200 mb-1">
                  <span>Brightness</span>
                  <span className="font-mono text-sky-400 font-bold">{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="140"
                  value={brightness}
                  onChange={(e) => {
                    setBrightness(Number(e.target.value));
                    setActivePreset("custom");
                  }}
                  className="medical-slider"
                  title="Brightness Gain (ความสว่างภาพ)"
                />
              </div>

              {/* Mask Opacity (0% - 100% Solid) */}
              <div className="p-1.5 rounded-lg bg-slate-900/70 border border-slate-700/80 ring-1 ring-red-500/30">
                <div className="flex justify-between text-xs font-bold text-slate-200 mb-1">
                  <span className="text-red-300">Mask Opacity</span>
                  <span className="font-mono text-red-400 font-extrabold">{maskOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={maskOpacity}
                  onChange={(e) => setMaskOpacity(Number(e.target.value))}
                  className="medical-slider"
                  title="100% = Solid Opaque Cover (ทับทึบ 100%)"
                />
              </div>
            </div>

            {/* Decision Threshold & Quick Reset Bar */}
            <div className="mt-2 p-2 rounded-lg bg-slate-900/80 border border-slate-700 flex items-center justify-between gap-3 shrink-0">
              <div className="flex-1">
                <div className="flex justify-between text-xs font-bold text-slate-200 mb-1">
                  <span className="flex items-center gap-1.5">
                    <IconSliders className="h-4 w-4 text-sky-400" />
                    Decision Confidence Threshold
                  </span>
                  <span className="font-mono text-sky-400 font-bold">{confidenceThreshold}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="95"
                  value={confidenceThreshold}
                  onChange={(e) => {
                    setConfidenceThreshold(Number(e.target.value));
                    setResult(null);
                  }}
                  className="medical-slider"
                />
              </div>

              <button
                type="button"
                onClick={resetAdjustments}
                className="h-9 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-600 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
                title="คืนค่าการแสดงผลและแถบเลื่อนทั้งหมดเป็นค่ามาตรฐาน"
              >
                <IconRotateCcw className="h-4 w-4 text-amber-400" />
                คืนค่าที่ปรับ
              </button>
            </div>
          </div>
        </section>

        {/* Right Column: Outcomes & Export (3 Cols) */}
        <section className="col-span-3 flex flex-col gap-2.5 min-h-0">
          {/* Card 1: Diagnostic Outcome Summary */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-2xs p-3 flex flex-col">
            <h2 className="text-xs font-bold uppercase tracking-wide text-white mb-2 border-b border-slate-700 pb-1.5 flex items-center gap-1.5">
              <IconActivity className="h-4 w-4 text-sky-400" />
              04. Diagnostic Summary
            </h2>

            {/* Status Banner */}
            <div className="mb-2">
              {result ? (
                result.detected ? (
                  <div className="p-2.5 rounded-lg bg-red-950/90 border-2 border-red-500 text-red-100 space-y-0.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <IconAlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
                        <span className="font-black text-xs tracking-tight text-red-100">STROKE LESION DETECTED</span>
                      </div>
                      <span className="px-1.5 py-0.2 text-[10px] font-bold rounded bg-red-800 text-red-100 border border-red-600">
                        POSITIVE
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-red-200 leading-tight">
                      {result.label}
                    </p>
                    <p className="text-[10px] font-medium text-slate-300 leading-tight">
                      โมเดลระบุพบตำแหน่งรอยโรคหลอดเลือดสมองในภาพสแกน
                    </p>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-lg bg-emerald-950/90 border-2 border-emerald-500 text-emerald-100 space-y-0.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <IconCheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span className="font-black text-xs tracking-tight text-emerald-100">NO LESION DETECTED</span>
                      </div>
                      <span className="px-1.5 py-0.2 text-[10px] font-bold rounded bg-emerald-800 text-emerald-100 border border-emerald-600">
                        NEGATIVE
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-emerald-200 leading-tight">
                      {result.label}
                    </p>
                    <p className="text-[10px] font-medium text-slate-300 leading-tight">
                      ไม่พบรอยโรคหลอดเลือดสมองเกินเกณฑ์ Threshold ที่กำหนด
                    </p>
                  </div>
                )
              ) : (
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300 text-center space-y-0.5">
                  <p className="text-xs font-bold text-white">Scan Not Analyzed</p>
                  <p className="text-[11px] font-semibold text-slate-400">Click &quot;Analyze CT Scan&quot; to run model.</p>
                </div>
              )}
            </div>

            {/* AI Confidence Meter */}
            <div className="space-y-1 mb-2">
              <div className="flex justify-between text-xs font-bold text-slate-200">
                <span>AI Confidence Score:</span>
                <span className="font-mono text-xs text-white font-bold">
                  {result ? `${(result.confidence * 100).toFixed(1)}%` : "—"}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                <div
                  className={`h-full transition-all duration-300 ${
                    result?.detected ? "bg-red-500" : "bg-sky-500"
                  }`}
                  style={{ width: result ? `${result.confidence * 100}%` : "0%" }}
                />
              </div>
            </div>

            {/* High-Contrast Metadata Table */}
            <div className="space-y-1 text-xs border-t border-slate-700 pt-1.5">
              <div className="flex justify-between py-0.5 border-b border-slate-700/60">
                <span className="font-bold text-slate-300">Model Outcome:</span>
                <span className="font-bold">
                  {result ? (
                    result.detected ? (
                      <span className="text-red-400 font-extrabold">Lesion Detected (Positive)</span>
                    ) : (
                      <span className="text-emerald-400 font-extrabold">No Lesion (Negative)</span>
                    )
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-700/60">
                <span className="font-bold text-slate-300">Lesion Area (%):</span>
                <span className="font-mono font-bold text-sky-400">
                  {result ? `${result.lesionArea ?? 0}%` : "—"}
                </span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-700/60">
                <span className="font-bold text-slate-300">Model Engine:</span>
                <span className="font-bold text-white">{result?.modelLabel ?? selectedModelInfo?.name}</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-700/60">
                <span className="font-bold text-slate-300">Model Resolution:</span>
                <span className="font-mono font-bold text-white">
                  {result?.inputSize ? `${result.inputSize[0]} x ${result.inputSize[1]} px` : (modelId === "patcher" ? "256 x 256 px" : "224 x 224 px")}
                </span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="font-bold text-slate-300">Decision Threshold:</span>
                <span className="font-mono font-bold text-white">{confidenceThreshold}%</span>
              </div>
            </div>
          </div>

          {/* Card 2: Clinical Export Actions */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-2xs p-3 flex-1 flex flex-col min-h-0">
            <h2 className="text-xs font-bold uppercase tracking-wide text-white mb-1.5 border-b border-slate-700 pb-1.5 flex items-center gap-1.5 shrink-0">
              <IconDownload className="h-4 w-4 text-sky-400" />
              05. Export Options
            </h2>

            <p className="text-[11px] font-semibold text-slate-300 mb-2 leading-tight shrink-0">
              Export annotated DICOM scan previews or generate formal decision reports.
            </p>

            <div className="space-y-2 mt-auto">
              <button
                type="button"
                onClick={exportResult}
                disabled={!imageUrl}
                className="w-full h-9 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg border border-slate-600 transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <IconImage className="h-4 w-4 text-slate-300" />
                Export Image Preview
              </button>

              <button
                type="button"
                onClick={exportReport}
                disabled={!result}
                className="w-full h-9 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg shadow-2xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <IconFileText className="h-4 w-4" />
                Download Report (.TXT)
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 4. Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 px-3 py-1 text-center text-[11px] font-bold text-slate-400 rounded-t-lg shrink-0">
        NU STROKE SCAN Workstation v1.2 · Naresuan University Neuro-Imaging Research Group · For Decision Support Only
      </footer>
    </div>
  );
}
