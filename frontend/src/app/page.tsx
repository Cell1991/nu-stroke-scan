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

export default function HomePage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Model & Display Controls
  const [modelId, setModelId] = useState("vcanet");
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

  // Complete System Reset: Clears image, results, inputs, and resets all parameters to defaults
  function resetAll() {
    if (imageUrl && imageUrl.startsWith("blob:")) {
      URL.revokeObjectURL(imageUrl);
    }
    setFile(null);
    setImageUrl(null);
    setResult(null);
    setError(null);
    setIsScanning(false);
    setIsDragging(false);
    setModelId("vcanet");
    setMaskOpacity(85);
    setThreshold(50);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
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
    ctx.fillStyle = "rgba(10, 15, 29, 0.85)";
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

  return (
    <div className="h-screen w-screen bg-slate-300 text-slate-900 flex flex-col overflow-hidden font-sans p-3 gap-3 select-none">
      {/* 1. Sleek Hospital-Grade Top Navigation Bar */}
      <header className="h-14 bg-slate-200/95 border border-slate-400/60 rounded-xl px-4 flex items-center justify-between gap-4 shrink-0 shadow-xs">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow-xs">
            <Brain className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-slate-900">NU STROKE SCAN</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-300">
                Clinical AI
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-none">
              Neuro-Imaging Decision Support · Naresuan University
            </p>
          </div>
        </div>

        {/* Model Selector Pills */}
        <div className="flex items-center bg-slate-300/90 p-1 rounded-lg border border-slate-400/60 shadow-inner">
          {MODELS.map((m) => {
            const isSelected = modelId === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  setModelId(m.id);
                  setResult(null);
                }}
                className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-sky-600 text-white shadow-xs"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-200/80"
                }`}
              >
                {m.name}
              </button>
            );
          })}
        </div>
      </header>

      {/* 2. Main Workspace Layout */}
      <main className="flex-1 min-h-0 grid grid-cols-12 gap-3 overflow-hidden">
        
        {/* Left/Center Viewport Column (8 Cols) */}
        <section className="col-span-8 flex flex-col gap-2 min-h-0">
          <div className="flex-1 min-h-0 bg-slate-200/95 border border-slate-400/60 rounded-xl p-3.5 flex flex-col shadow-xs">
            
            {/* Viewport Top Bar */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-300 shrink-0">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Brain className="h-3.5 w-3.5 text-sky-600" />
                DICOM Dual Viewport
              </span>

              {/* Complete Reset Control */}
              <button
                onClick={resetAll}
                className="btn-tactile-light px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-amber-700 hover:border-amber-400 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Reset all images, inputs, results, and parameters to default"
              >
                <RotateCcw className="h-3.5 w-3.5 text-amber-600" />
                Reset All
              </button>
            </div>

            {/* Dual CT Scanners Display */}
            <div className="flex-1 min-h-0 grid grid-cols-2 gap-3">
              {/* Left: Original CT */}
              <div className="dicom-canvas-bg relative rounded-xl border border-slate-700 overflow-hidden flex items-center justify-center p-2 shadow-inner">
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-700 text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                  Original CT
                </div>
                <span className="absolute top-2.5 right-3 text-xs font-mono text-slate-500 font-bold">R</span>
                <span className="absolute bottom-2.5 right-3 text-xs font-mono text-slate-500 font-bold">L</span>

                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Original Scan"
                    className="max-h-full max-w-full object-contain pointer-events-none"
                  />
                ) : (
                  <div className="text-center text-slate-500 space-y-1">
                    <Brain className="h-8 w-8 mx-auto opacity-30 text-slate-400" />
                    <p className="text-xs text-slate-400 font-semibold">Non-Contrast CT</p>
                  </div>
                )}
              </div>

              {/* Right: AI Segmentation Mask */}
              <div className="dicom-canvas-bg relative rounded-xl border border-slate-700 overflow-hidden flex items-center justify-center p-2 shadow-inner">
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-700 text-[10px] font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                  AI Overlay
                  {result && (
                    <span className={`h-1.5 w-1.5 rounded-full ${result.detected ? "bg-red-500 animate-pulse" : "bg-emerald-400"}`} />
                  )}
                </div>
                <span className="absolute top-2.5 right-3 text-xs font-mono text-slate-500 font-bold">R</span>
                <span className="absolute bottom-2.5 right-3 text-xs font-mono text-slate-500 font-bold">L</span>

                {imageUrl ? (
                  <div className="relative h-full w-full flex items-center justify-center">
                    <img
                      src={imageUrl}
                      alt="Base Scan"
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
                  <div className="text-center text-slate-500 space-y-1">
                    <Eye className="h-8 w-8 mx-auto opacity-30 text-slate-400" />
                    <p className="text-xs text-slate-400 font-semibold">AI Lesion Mask</p>
                  </div>
                )}
              </div>
            </div>

            {/* Essential Sliders Footer: Opacity & Decision Threshold */}
            <div className="mt-3 pt-3 border-t border-slate-300 grid grid-cols-2 gap-3 shrink-0">
              {/* Mask Opacity */}
              <div className="p-2.5 rounded-xl bg-slate-300/80 border border-slate-400/50">
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                  <span className="text-red-700">Mask Opacity</span>
                  <span className="font-mono text-red-600 font-extrabold">{maskOpacity}%</span>
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
              <div className="p-2.5 rounded-xl bg-slate-300/80 border border-slate-400/50">
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                  <span className="text-slate-800">Sensitivity Threshold</span>
                  <span className="font-mono text-sky-700 font-extrabold">{threshold}%</span>
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
          <div className="bg-slate-200/95 border border-slate-400/60 rounded-xl p-3.5 flex flex-col shrink-0 shadow-xs">
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
              onDrop={handleDrop}
              className={`h-24 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-150 relative overflow-hidden ${
                isDragging
                  ? "border-sky-500 bg-sky-100/70 scale-[1.01]"
                  : "border-slate-400/60 hover:border-sky-500 bg-slate-300/60 hover:bg-slate-300/90"
              }`}
            >
              {imageUrl ? (
                <div className="flex items-center gap-3 px-3 w-full">
                  <img src={imageUrl} alt="Thumbnail" className="h-14 w-14 object-contain rounded-lg border border-slate-400 bg-black shadow-xs" />
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{file?.name ?? "Loaded CT Scan"}</p>
                    <p className="text-[11px] font-semibold text-slate-600 mt-0.5">Click or drag to replace image</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <UploadCloud className="h-6 w-6 mx-auto text-sky-600" />
                  <p className="text-xs font-bold text-slate-800">Drop CT Scan or Click to Browse</p>
                  <p className="text-[11px] text-slate-600 font-medium">DICOM PNG, JPG, WEBP (Max 25 MB)</p>
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
              <div className="mt-2 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-red-600" />
                <span className="truncate">{error}</span>
              </div>
            )}

            {/* Primary Action Button - Bold Centered Text with Clean Medical 3D Gradient */}
            <button
              onClick={runInference}
              disabled={isScanning || !imageUrl}
              className={`relative overflow-hidden mt-3 h-12 w-full rounded-xl font-black text-sm uppercase tracking-wider text-white transition-all duration-150 flex items-center justify-center cursor-pointer select-none ${
                isScanning || !imageUrl
                  ? "bg-slate-400/50 text-slate-600 border border-slate-400/60 cursor-not-allowed shadow-none"
                  : "btn-tactile-primary group"
              }`}
            >
              {isScanning ? (
                <div className="flex items-center justify-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin text-white" />
                  <span>ANALYZING SCAN...</span>
                </div>
              ) : (
                <span className="text-center drop-shadow-xs">
                  ANALYZE CT SCAN
                </span>
              )}
            </button>
          </div>

          {/* Diagnostic Outcome Card */}
          <div className="bg-slate-200/95 border border-slate-400/60 rounded-xl p-3.5 flex-1 flex flex-col min-h-0 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 pb-2 border-b border-slate-300">
              Diagnostic Summary
            </h3>

            {/* Outcome Banner */}
            <div className="mb-3">
              {result ? (
                result.detected ? (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-950 space-y-1 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 shrink-0" />
                        <span className="font-extrabold text-xs tracking-tight text-red-900">STROKE LESION DETECTED</span>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] font-extrabold rounded bg-red-600 text-white shadow-2xs">
                        POSITIVE
                      </span>
                    </div>
                    <p className="text-xs font-bold text-red-700">{result.label}</p>
                    <p className="text-[11px] text-slate-600 font-medium">Acute lesion identified by neural segmentation model.</p>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span className="font-extrabold text-xs tracking-tight text-emerald-900">NO LESION DETECTED</span>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] font-extrabold rounded bg-emerald-600 text-white shadow-2xs">
                        NEGATIVE
                      </span>
                    </div>
                    <p className="text-xs font-bold text-emerald-700">{result.label}</p>
                    <p className="text-[11px] text-slate-600 font-medium">No acute stroke lesion identified above threshold.</p>
                  </div>
                )
              ) : (
                <div className="p-3 rounded-xl bg-slate-300/80 border border-slate-400/50 text-center space-y-0.5">
                  <p className="text-xs font-bold text-slate-700">Awaiting Analysis</p>
                  <p className="text-[11px] text-slate-500 font-medium">Upload scan and click &quot;Analyze CT Scan&quot;.</p>
                </div>
              )}
            </div>

            {/* Confidence Meter */}
            <div className="space-y-1.5 mb-3">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Confidence Score</span>
                <span className="font-mono text-slate-900 font-extrabold">
                  {result ? `${(result.confidence * 100).toFixed(1)}%` : "—"}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-300 rounded-full overflow-hidden border border-slate-400/50">
                <div
                  className={`h-full transition-all duration-300 ${result?.detected ? "bg-red-500" : "bg-sky-500"}`}
                  style={{ width: result ? `${result.confidence * 100}%` : "0%" }}
                />
              </div>
            </div>

            {/* Clean Key-Value Table */}
            <div className="space-y-1.5 text-xs border-t border-slate-300 pt-2.5 text-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-300">
                <span className="text-slate-600 font-medium">Model Engine:</span>
                <span className="font-bold text-slate-900">{result?.modelLabel ?? MODELS.find((m) => m.id === modelId)?.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-300">
                <span className="text-slate-600 font-medium">Lesion ROI Area:</span>
                <span className="font-mono text-sky-700 font-extrabold">{result ? `${result.lesionArea ?? 0}%` : "—"}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600 font-medium">Sensitivity Threshold:</span>
                <span className="font-mono text-slate-900 font-bold">{threshold}%</span>
              </div>
            </div>

            {/* 100% Functional Export Actions */}
            <div className="grid grid-cols-2 gap-2 mt-auto pt-3 border-t border-slate-300">
              <button
                onClick={exportAnnotatedImage}
                disabled={!imageUrl}
                className="btn-tactile-light h-9 disabled:opacity-40 disabled:cursor-not-allowed text-slate-800 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                title="Export high-resolution annotated image composite with lesion mask overlay"
              >
                <Download className="h-3.5 w-3.5 text-slate-600" />
                Image (.png)
              </button>

              <button
                onClick={exportReportText}
                disabled={!result}
                className="btn-tactile-emerald h-9 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                title="Download formal clinical diagnostic summary text report"
              >
                <FileText className="h-3.5 w-3.5" />
                Report (.txt)
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 3. Minimal Clean Hospital Footer */}
      <footer className="h-6 flex items-center justify-between text-xs font-medium text-slate-600 px-2 shrink-0">
        <span>NU Stroke Scan v1.2 · Naresuan University Neuro-Imaging Research</span>
        <span>For Clinical Decision Support Only</span>
      </footer>
    </div>
  );
}
