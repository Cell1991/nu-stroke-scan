"use client";

import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";

// Standalone Zero-Dependency Vector Icons
function Brain({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M12 5v13" />
    </svg>
  );
}

function UploadCloud({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}

function RotateCcw({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function Sliders({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <line x1="4" x2="4" y1="21" y2="14" />
      <line x1="4" x2="4" y1="10" y2="3" />
      <line x1="12" x2="12" y1="21" y2="12" />
      <line x1="12" x2="12" y1="8" y2="3" />
      <line x1="20" x2="20" y1="21" y2="16" />
      <line x1="20" x2="20" y1="12" y2="3" />
      <line x1="1" x2="7" y1="14" y2="14" />
      <line x1="9" x2="15" y1="8" y2="8" />
      <line x1="17" x2="23" y1="16" y2="16" />
    </svg>
  );
}

function Download({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function FileText({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

function CheckCircle2({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function AlertTriangle({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" x2="12" y1="9" y2="13" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
    </svg>
  );
}

function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function RefreshCw({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

function Eye({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function Sparkles({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
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

const MODELS = [
  { id: "vcanet", name: "VCA-Net", desc: "Visual Cortex Attention" },
  { id: "dlka", name: "Deformable LKA", desc: "MaxViT + Large Kernel" },
  { id: "patcher", name: "Patcher", desc: "Patch SegFormer" },
];

const PRESETS = [
  { id: "default", name: "Standard", wl: 50, ww: 100 },
  { id: "stroke", name: "Stroke Window", wl: 38, ww: 38 },
  { id: "brain", name: "Brain Tissue", wl: 45, ww: 75 },
];

// Helper to generate a clean demo brain CT scan
function generateDemoCTScan(): string {
  if (typeof document === "undefined") return "";
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  ctx.fillStyle = "#05070a";
  ctx.fillRect(0, 0, 256, 256);

  // Skull outline
  ctx.beginPath();
  ctx.ellipse(128, 128, 95, 110, 0, 0, 2 * Math.PI);
  ctx.fillStyle = "#2a3441";
  ctx.fill();

  // Bone
  ctx.beginPath();
  ctx.ellipse(128, 128, 88, 102, 0, 0, 2 * Math.PI);
  ctx.fillStyle = "#78879b";
  ctx.fill();

  // Brain parenchyma
  ctx.beginPath();
  ctx.ellipse(128, 128, 82, 96, 0, 0, 2 * Math.PI);
  ctx.fillStyle = "#475569";
  ctx.fill();

  // Ventricles
  ctx.fillStyle = "#1e293b";
  ctx.beginPath();
  ctx.ellipse(115, 118, 12, 35, -0.2, 0, 2 * Math.PI);
  ctx.ellipse(141, 118, 12, 35, 0.2, 0, 2 * Math.PI);
  ctx.fill();

  // Midline
  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(128, 35);
  ctx.lineTo(128, 220);
  ctx.stroke();

  // Stroke lesion area
  ctx.fillStyle = "#1e2430";
  ctx.beginPath();
  ctx.ellipse(152, 110, 24, 18, 0.3, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = "#27303f";
  ctx.beginPath();
  ctx.ellipse(155, 112, 16, 12, 0.2, 0, 2 * Math.PI);
  ctx.fill();

  return canvas.toDataURL("image/png");
}

export default function HomePage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // PACS & Display Controls
  const [modelId, setModelId] = useState("vcanet");
  const [activePreset, setActivePreset] = useState("default");
  const [windowLevel, setWindowLevel] = useState(50);
  const [windowWidth, setWindowWidth] = useState(100);
  const [maskOpacity, setMaskOpacity] = useState(85);
  const [threshold, setThreshold] = useState(50);

  useEffect(() => {
    return () => {
      if (imageUrl && imageUrl.startsWith("blob:")) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  function handleFile(selectedFile: File) {
    setError(null);
    setResult(null);
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid brain CT scan image (PNG, JPG, or WEBP).");
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

  function loadDemoScan() {
    setError(null);
    setResult(null);
    const demoUrl = generateDemoCTScan();
    setImageUrl(demoUrl);
    fetch(demoUrl)
      .then((r) => r.blob())
      .then((b) => {
        setFile(new File([b], "demo_brain_ct.png", { type: "image/png" }));
      });
  }

  async function runInference() {
    if (!imageUrl) {
      setError("Please load or upload a CT scan image first.");
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
      formData.append("threshold", String(threshold / 100));

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/analysis`, {
        method: "POST",
        body: formData,
      });

      const payload = await response.json();
      if (!response.ok) throw new Error(payload.detail ?? "Inference failed.");

      const isDetected = payload.lesion_detected ?? payload.confidence >= threshold / 100;

      setResult({
        label: payload.label,
        confidence: payload.confidence,
        maskUrl: `data:image/png;base64,${payload.mask_png_base64}`,
        detected: isDetected,
        lesionArea: payload.lesion_area_percentage,
        modelLabel: payload.model_label,
        inputSize: payload.input_size,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis request failed.");
    } finally {
      setIsScanning(false);
    }
  }

  function applyPreset(presetId: string) {
    const p = PRESETS.find((item) => item.id === presetId);
    if (!p) return;
    setActivePreset(p.id);
    setWindowLevel(p.wl);
    setWindowWidth(p.ww);
  }

  function resetControls() {
    setActivePreset("default");
    setWindowLevel(50);
    setWindowWidth(100);
    setMaskOpacity(85);
    setThreshold(50);
  }

  // Real composite image export with overlay & metadata
  async function exportAnnotatedImage() {
    if (!imageUrl) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const baseImg = new Image();
    baseImg.crossOrigin = "anonymous";
    baseImg.src = imageUrl;
    await new Promise((resolve) => {
      baseImg.onload = resolve;
    });

    canvas.width = baseImg.naturalWidth || 512;
    canvas.height = baseImg.naturalHeight || 512;

    // Draw CT image
    ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);

    // Overlay lesion mask
    if (result?.maskUrl) {
      const maskImg = new Image();
      maskImg.crossOrigin = "anonymous";
      maskImg.src = result.maskUrl;
      await new Promise((resolve) => {
        maskImg.onload = resolve;
      });
      ctx.globalAlpha = maskOpacity / 100;
      ctx.drawImage(maskImg, 0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1.0;
    }

    // Overlay watermark badge
    ctx.fillStyle = "rgba(10, 15, 29, 0.75)";
    ctx.fillRect(12, canvas.height - 38, 280, 26);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 11px sans-serif";
    const statusText = result ? (result.detected ? "STROKE DETECTED" : "NO LESION") : "CT SCAN";
    ctx.fillText(`NU STROKE SCAN · ${statusText} · ${MODELS.find((m) => m.id === modelId)?.name}`, 20, canvas.height - 21);

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `nu-stroke-${file?.name?.replace(/\.[^/.]+$/, "") || "scan"}-annotated.png`;
    link.click();
  }

  function exportReportText() {
    if (!result || !file) return;
    const reportText = `=====================================================
NU STROKE SCAN - CLINICAL DECISION SUPPORT REPORT
=====================================================
Institution: Naresuan University Neuro-Imaging Center
Date: ${new Date().toLocaleString()}
Modality: Non-Contrast Brain CT Scan
Model Architecture: ${MODELS.find((m) => m.id === modelId)?.name || modelId}
-----------------------------------------------------
ANALYSIS RESULTS:
- Outcome: ${result.detected ? "STROKE LESION DETECTED (POSITIVE)" : "NO LESION DETECTED (NEGATIVE)"}
- Prediction: ${result.label}
- Confidence: ${(result.confidence * 100).toFixed(1)}%
- Lesion Area (ROI): ${result.lesionArea ?? 0}%
- Threshold: ${threshold}%
- Source File: ${file.name}
-----------------------------------------------------
Notice: This is an AI-assisted diagnostic aid and must
be verified by a certified healthcare professional.
=====================================================`;

    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `stroke-report-${file.name.replace(/\.[^/.]+$/, "")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  // PACS VOI LUT Transfer calculation
  const normWw = Math.max(0.15, windowWidth / 100);
  const normWl = windowLevel / 100;
  const lutSlope = Number(((1 / normWw)).toFixed(4));
  const lutIntercept = Number((- (1 / normWw) * (normWl - normWw / 2)).toFixed(4));

  const imageFilterStyle: React.CSSProperties = {
    filter: `url(#pacs-lut-filter)`,
  };

  return (
    <div className="h-screen w-screen bg-[#090D16] text-slate-100 flex flex-col overflow-hidden font-sans p-3 gap-3 select-none">
      {/* Hardware-Accelerated PACS LUT Filter */}
      <svg className="absolute w-0 h-0 pointer-events-none opacity-0 -z-50" aria-hidden="true">
        <filter id="pacs-lut-filter" colorInterpolationFilters="sRGB">
          <feComponentTransfer>
            <feFuncR type="linear" slope={lutSlope} intercept={lutIntercept} />
            <feFuncG type="linear" slope={lutSlope} intercept={lutIntercept} />
            <feFuncB type="linear" slope={lutSlope} intercept={lutIntercept} />
          </feComponentTransfer>
        </filter>
      </svg>

      {/* 1. Sleek Top Navigation Bar */}
      <header className="h-12 bg-slate-900/80 border border-slate-800/80 rounded-xl px-4 flex items-center justify-between gap-4 shrink-0 backdrop-blur-md">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow-xs">
            <Brain className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm tracking-tight text-white">NU STROKE SCAN</span>
            <span className="text-[10px] font-medium text-slate-400 border-l border-slate-700 pl-2">
              Neuro-Imaging AI
            </span>
          </div>
        </div>

        {/* Model Selector Pills */}
        <div className="flex items-center bg-slate-950/60 p-0.5 rounded-lg border border-slate-800">
          {MODELS.map((m) => {
            const isSelected = modelId === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  setModelId(m.id);
                  setResult(null);
                }}
                className={`px-3 py-1 rounded-md text-xs font-medium transition cursor-pointer ${
                  isSelected
                    ? "bg-sky-600 text-white shadow-xs font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {m.name}
              </button>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={loadDemoScan}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-sky-400" />
            Demo Scan
          </button>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Ready
          </div>
        </div>
      </header>

      {/* 2. Main Workspace Layout */}
      <main className="flex-1 min-h-0 grid grid-cols-12 gap-3 overflow-hidden">
        
        {/* Left/Center Viewport Column (8 Cols) */}
        <section className="col-span-8 flex flex-col gap-2 min-h-0">
          <div className="flex-1 min-h-0 bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 flex flex-col">
            
            {/* Viewport Top Bar */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 shrink-0">
              {/* Presets */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-medium text-slate-400 mr-1 flex items-center gap-1">
                  <Sliders className="h-3.5 w-3.5 text-slate-400" /> Window:
                </span>
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => applyPreset(p.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition cursor-pointer ${
                      activePreset === p.id
                        ? "bg-sky-600 text-white shadow-xs font-semibold"
                        : "bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              {/* Reset Control */}
              <button
                onClick={resetControls}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer flex items-center gap-1"
                title="Reset windowing and threshold to default"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            </div>

            {/* Dual CT Scanners Display */}
            <div className="flex-1 min-h-0 grid grid-cols-2 gap-3">
              {/* Left: Original CT */}
              <div className="dicom-canvas-bg relative rounded-xl border border-slate-800/80 overflow-hidden flex items-center justify-center p-2">
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Original CT
                </div>
                <span className="absolute top-2.5 right-3 text-xs font-mono text-slate-600 font-semibold">R</span>
                <span className="absolute bottom-2.5 right-3 text-xs font-mono text-slate-600 font-semibold">L</span>

                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Original Scan"
                    style={imageFilterStyle}
                    className="max-h-full max-w-full object-contain pointer-events-none"
                  />
                ) : (
                  <div className="text-center text-slate-600 space-y-1">
                    <Brain className="h-8 w-8 mx-auto opacity-30 text-slate-400" />
                    <p className="text-xs text-slate-500 font-medium">Non-Contrast CT</p>
                  </div>
                )}
              </div>

              {/* Right: AI Segmentation Mask */}
              <div className="dicom-canvas-bg relative rounded-xl border border-slate-800/80 overflow-hidden flex items-center justify-center p-2">
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-[10px] font-semibold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  AI Overlay
                  {result && (
                    <span className={`h-1.5 w-1.5 rounded-full ${result.detected ? "bg-red-400" : "bg-emerald-400"}`} />
                  )}
                </div>
                <span className="absolute top-2.5 right-3 text-xs font-mono text-slate-600 font-semibold">R</span>
                <span className="absolute bottom-2.5 right-3 text-xs font-mono text-slate-600 font-semibold">L</span>

                {imageUrl ? (
                  <div className="relative h-full w-full flex items-center justify-center">
                    <img
                      src={imageUrl}
                      alt="Base Scan"
                      style={imageFilterStyle}
                      className="max-h-full max-w-full object-contain pointer-events-none"
                    />
                    {result?.maskUrl && (
                      <img
                        src={result.maskUrl}
                        alt="Segmented Mask"
                        className="lesion-mask absolute inset-0 max-h-full max-w-full m-auto object-contain transition-opacity duration-150 pointer-events-none"
                        style={{ opacity: maskOpacity / 100 }}
                      />
                    )}
                  </div>
                ) : (
                  <div className="text-center text-slate-600 space-y-1">
                    <Eye className="h-8 w-8 mx-auto opacity-30 text-slate-400" />
                    <p className="text-xs text-slate-500 font-medium">AI Lesion Mask</p>
                  </div>
                )}
              </div>
            </div>

            {/* Essential Controls Footer */}
            <div className="mt-3 pt-2.5 border-t border-slate-800/80 grid grid-cols-4 gap-3 shrink-0">
              {/* Level (WL) */}
              <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/60">
                <div className="flex justify-between text-[11px] font-medium text-slate-400 mb-1.5">
                  <span>Window Level</span>
                  <span className="font-mono text-sky-400">{windowLevel}%</span>
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
                />
              </div>

              {/* Width (WW) */}
              <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/60">
                <div className="flex justify-between text-[11px] font-medium text-slate-400 mb-1.5">
                  <span>Window Width</span>
                  <span className="font-mono text-sky-400">{windowWidth}%</span>
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
                />
              </div>

              {/* Mask Opacity */}
              <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/60">
                <div className="flex justify-between text-[11px] font-medium text-slate-400 mb-1.5">
                  <span className="text-red-300">Mask Opacity</span>
                  <span className="font-mono text-red-400 font-semibold">{maskOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={maskOpacity}
                  onChange={(e) => setMaskOpacity(Number(e.target.value))}
                  className="medical-slider"
                />
              </div>

              {/* Sensitivity Threshold */}
              <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/60">
                <div className="flex justify-between text-[11px] font-medium text-slate-400 mb-1.5">
                  <span>Threshold</span>
                  <span className="font-mono text-sky-400">{threshold}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="95"
                  value={threshold}
                  onChange={(e) => {
                    setThreshold(Number(e.target.value));
                    setResult(null);
                  }}
                  className="medical-slider"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Right Sidebar: Upload, Diagnosis & Export (4 Cols) */}
        <section className="col-span-4 flex flex-col gap-3 min-h-0">
          
          {/* Upload & Action Card */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 flex flex-col shrink-0">
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
              onDrop={handleDrop}
              className={`h-24 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition relative overflow-hidden ${
                isDragging
                  ? "border-sky-400 bg-sky-950/30"
                  : "border-slate-800 hover:border-slate-700 bg-slate-950/30 hover:bg-slate-900/50"
              }`}
            >
              {imageUrl ? (
                <div className="flex items-center gap-3 px-3 w-full">
                  <img src={imageUrl} alt="Thumbnail" className="h-14 w-14 object-contain rounded-lg border border-slate-800 bg-black" />
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-200 truncate">{file?.name ?? "Loaded CT Scan"}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Click or drag to replace image</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <UploadCloud className="h-6 w-6 mx-auto text-sky-400" />
                  <p className="text-xs font-medium text-slate-200">Drop CT Scan or Click to Browse</p>
                  <p className="text-[10px] text-slate-500">DICOM PNG, JPG, WEBP (Max 25 MB)</p>
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
              <div className="mt-2 p-2 rounded-lg bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-red-400" />
                <span className="truncate">{error}</span>
              </div>
            )}

            {/* Primary Action Button */}
            <button
              onClick={runInference}
              disabled={isScanning || !imageUrl}
              className="mt-2.5 h-10 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Running Neural Analysis...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4" />
                  Analyze CT Scan
                  <ArrowRight className="h-4 w-4 ml-auto opacity-70" />
                </>
              )}
            </button>
          </div>

          {/* Diagnostic Outcome Card */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 flex-1 flex flex-col min-h-0">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 pb-1.5 border-b border-slate-800/80">
              Diagnostic Summary
            </h3>

            {/* Outcome Banner */}
            <div className="mb-3">
              {result ? (
                result.detected ? (
                  <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-red-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
                        <span className="font-bold text-xs tracking-tight text-red-200">STROKE LESION DETECTED</span>
                      </div>
                      <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-red-900/80 text-red-100 border border-red-700">
                        POSITIVE
                      </span>
                    </div>
                    <p className="text-xs font-medium text-red-300">{result.label}</p>
                    <p className="text-[11px] text-slate-400">Acute lesion identified by neural segmentation model.</p>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-emerald-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span className="font-bold text-xs tracking-tight text-emerald-200">NO LESION DETECTED</span>
                      </div>
                      <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-emerald-900/80 text-emerald-100 border border-emerald-700">
                        NEGATIVE
                      </span>
                    </div>
                    <p className="text-xs font-medium text-emerald-300">{result.label}</p>
                    <p className="text-[11px] text-slate-400">No acute stroke lesion identified above threshold.</p>
                  </div>
                )
              ) : (
                <div className="p-3 rounded-lg bg-slate-950/30 border border-slate-800/60 text-center space-y-1">
                  <p className="text-xs font-medium text-slate-300">Awaiting Analysis</p>
                  <p className="text-[11px] text-slate-500">Upload scan and click &quot;Analyze CT Scan&quot;.</p>
                </div>
              )}
            </div>

            {/* Confidence Meter */}
            <div className="space-y-1.5 mb-3">
              <div className="flex justify-between text-[11px] font-medium text-slate-400">
                <span>Confidence Score</span>
                <span className="font-mono text-white font-semibold">
                  {result ? `${(result.confidence * 100).toFixed(1)}%` : "—"}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full transition-all duration-300 ${result?.detected ? "bg-red-500" : "bg-sky-500"}`}
                  style={{ width: result ? `${result.confidence * 100}%` : "0%" }}
                />
              </div>
            </div>

            {/* Clean Key-Value Table */}
            <div className="space-y-1 text-xs border-t border-slate-800/80 pt-2 text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800/40">
                <span className="text-slate-400">Model Engine:</span>
                <span className="font-medium text-white">{result?.modelLabel ?? MODELS.find((m) => m.id === modelId)?.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/40">
                <span className="text-slate-400">Lesion ROI Area:</span>
                <span className="font-mono text-sky-400 font-semibold">{result ? `${result.lesionArea ?? 0}%` : "—"}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Sensitivity Threshold:</span>
                <span className="font-mono text-slate-300">{threshold}%</span>
              </div>
            </div>

            {/* 100% Functional Export Actions */}
            <div className="grid grid-cols-2 gap-2 mt-auto pt-3 border-t border-slate-800/80">
              <button
                onClick={exportAnnotatedImage}
                disabled={!imageUrl}
                className="h-8 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
                title="Export high-resolution annotated image composite with lesion mask overlay"
              >
                <Download className="h-3.5 w-3.5" />
                Image (.png)
              </button>

              <button
                onClick={exportReportText}
                disabled={!result}
                className="h-8 bg-emerald-600/90 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-medium rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                title="Download formal clinical diagnostic summary text report"
              >
                <FileText className="h-3.5 w-3.5" />
                Report (.txt)
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 3. Minimal Footer */}
      <footer className="h-6 flex items-center justify-between text-[11px] text-slate-500 px-2 shrink-0">
        <span>NU Stroke Scan v1.2 · Naresuan University Neuro-Imaging Research</span>
        <span>For Clinical Decision Support Only</span>
      </footer>
    </div>
  );
}
