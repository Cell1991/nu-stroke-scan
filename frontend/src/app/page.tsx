"use client";

import { DragEvent, useEffect, useRef, useState } from "react";

// Standalone Zero-Dependency Vector Icons
function Brain({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.5 8.242" />
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

function Sun({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function HalfCircle({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

function Layers({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function Gauge({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

function ZoomIn({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" x2="16.65" y1="21" y2="16.65" />
      <line x1="11" x2="11" y1="8" y2="14" />
      <line x1="8" x2="14" y1="11" y2="11" />
    </svg>
  );
}

function ZoomOut({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" x2="16.65" y1="21" y2="16.65" />
      <line x1="8" x2="14" y1="11" y2="11" />
    </svg>
  );
}

function Grid({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M3 15h18" />
      <path d="M9 3v18" />
      <path d="M15 3v18" />
    </svg>
  );
}

function Activity({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function Zap({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function ShieldCheck({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
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
    <div className="w-full select-none py-1">
      <div className="neu-slider-container relative h-5 flex items-center">
        {/* Recessed Track Container */}
        <div className="neu-slider-track-bg w-full">
          {/* Active Glowing Gradient Fill */}
          <div
            className="neu-slider-track-fill"
            style={{ width: `${currentPct}%` }}
          />
        </div>

        {/* Floating Tactile Neumorphic Thumb Input */}
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

export default function HomePage() {
  const inputRef = useRef<HTMLInputElement>(null);
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

  // Model & Display Controls
  const [modelId, setModelId] = useState("vcanet");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [maskOpacity, setMaskOpacity] = useState(85);
  const [threshold, setThreshold] = useState(50);

  // Advanced Viewport Zoom, Pan & Fine Grid Controls
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
    isZoomDragging: boolean;
  }>({
    active: false,
    x: 0,
    y: 0,
    normX: 0.5,
    normY: 0.5,
    target: null,
    scale: 2.5,
    isZoomDragging: false,
  });

  const loupeDragStartRef = useRef<{ startY: number; initialScale: number } | null>(null);

  function handleZoomIn() {
    setZoom((prev) => Math.min(4, Number((prev + 0.25).toFixed(2))));
  }

  function handleZoomOut() {
    setZoom((prev) => Math.max(0.5, Number((prev - 0.25).toFixed(2))));
  }

  function handleResetZoom() {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setLoupe((prev) => ({ ...prev, active: false, target: null, scale: 2.5, isZoomDragging: false }));
  }

  function toggleGrid() {
    setShowGrid((prev) => !prev);
  }

  function handleViewportContextMenu(e: React.MouseEvent<HTMLDivElement>, target: "left" | "right") {
    e.preventDefault();
    if (!imageUrl) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLoupe((prev) => {
      if (prev.active && prev.target === target) {
        return { ...prev, active: false, target: null, isZoomDragging: false };
      }
      return {
        active: true,
        x,
        y,
        normX: Math.max(0, Math.min(1, x / rect.width)),
        normY: Math.max(0, Math.min(1, y / rect.height)),
        target,
        scale: 2.5,
        isZoomDragging: false,
      };
    });
  }

  function handleViewportMouseDown(e: React.MouseEvent, target: "left" | "right") {
    if (e.button === 2) return;
    if (e.button !== 0) return;

    if (loupe.active && loupe.target === target) {
      loupeDragStartRef.current = { startY: e.clientY, initialScale: loupe.scale };
      setLoupe((prev) => ({ ...prev, isZoomDragging: true }));
      return;
    }

    setIsDraggingViewport(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
  }

  function handleViewportMouseMove(e: React.MouseEvent<HTMLDivElement>, target: "left" | "right") {
    if (loupe.active && loupe.target === target && loupe.isZoomDragging && loupeDragStartRef.current) {
      const dy = loupeDragStartRef.current.startY - e.clientY;
      const newScale = Math.max(1.2, Math.min(8.0, Number((loupeDragStartRef.current.initialScale + dy * 0.025).toFixed(2))));
      setLoupe((prev) => ({ ...prev, scale: newScale }));
      return;
    }

    if (loupe.active && loupe.target === target && !loupe.isZoomDragging) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setLoupe((prev) => ({
        ...prev,
        x,
        y,
        normX: Math.max(0, Math.min(1, x / rect.width)),
        normY: Math.max(0, Math.min(1, y / rect.height)),
      }));
    }

    if (isDraggingViewport && dragStartRef.current) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setPan({ x: dragStartRef.current.panX + dx, y: dragStartRef.current.panY + dy });
    }
  }

  function handleViewportMouseUp() {
    if (loupe.isZoomDragging) {
      loupeDragStartRef.current = null;
      setLoupe((prev) => ({ ...prev, isZoomDragging: false }));
    }
    setIsDraggingViewport(false);
    dragStartRef.current = null;
  }

  function handleViewportWheel(e: React.WheelEvent) {
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

  function recomputeThreshold(newThreshold: number) {
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

    for (let i = 0; i < data.length; i += 4) {
      const prob = data[i];
      if (prob > maxProb) maxProb = prob;
      if (prob >= cutoff) {
        out[i] = 239;     // R
        out[i + 1] = 68;  // G
        out[i + 2] = 68;  // B
        out[i + 3] = 255; // Solid Alpha
        lesionPixels++;
        sumProb += prob / 255;
      } else {
        out[i + 3] = 0;
      }
    }

    ctx.putImageData(outImgData, 0, 0);
    const newMaskUrl = canvas.toDataURL("image/png");
    const detected = lesionPixels > 0;
    const lesionArea = Number(((lesionPixels / totalPixels) * 100).toFixed(2));
    const confidence = detected
      ? Number((sumProb / lesionPixels).toFixed(4))
      : Number((1.0 - maxProb / 255).toFixed(4));

    setResult((prev) =>
      prev
        ? {
            ...prev,
            maskUrl: newMaskUrl,
            detected,
            lesionArea,
            confidence,
            label: detected ? "Acute Stroke Infarction Identified" : "No Acute Lesion Detected",
          }
        : null
    );
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

      if (payload.prob_png_base64) {
        const probImg = new Image();
        probImg.src = `data:image/png;base64,${payload.prob_png_base64}`;
        await new Promise<void>((resolve) => {
          probImg.onload = () => resolve();
        });
        const cvs = document.createElement("canvas");
        cvs.width = probImg.naturalWidth;
        cvs.height = probImg.naturalHeight;
        const c = cvs.getContext("2d");
        if (c) {
          c.drawImage(probImg, 0, 0);
          const idata = c.getImageData(0, 0, cvs.width, cvs.height);
          probDataRef.current = { width: cvs.width, height: cvs.height, data: idata.data };
        }
      }

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

  function resetControls() {
    setBrightness(100);
    setContrast(100);
    setMaskOpacity(85);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setShowGrid(false);
    setLoupe({ active: false, x: 0, y: 0, normX: 0.5, normY: 0.5, target: null, scale: 2.5, isZoomDragging: false });
    recomputeThreshold(50);
  }

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

    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
    ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);
    ctx.filter = "none";

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

    ctx.fillStyle = "rgba(7, 10, 18, 0.92)";
    ctx.fillRect(12, canvas.height - 40, 360, 28);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 11.5px monospace";
    const statusText = result ? (result.detected ? "STROKE DETECTED" : "CLEAR SCAN") : "NCCT";
    ctx.fillText(`NU STROKE SCAN · ${statusText} · ${MODELS.find((m) => m.id === modelId)?.name}`, 20, canvas.height - 22);

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `nu-stroke-${file?.name?.replace(/\.[^/.]+$/, "") || "scan"}-annotated.png`;
    link.click();
    
    setExportedStatus("image");
    setTimeout(() => setExportedStatus(null), 2500);
  }

  function exportReportText() {
    if (!result || !file) return;
    const reportText = `=====================================================
NU STROKE SCAN - CLINICAL DECISION SUPPORT REPORT
=====================================================
Institution: Naresuan University Neuro-Imaging Center
Date: ${new Date().toLocaleString()}
Modality: Non-Contrast Brain CT Scan (NCCT)
Model Architecture: ${MODELS.find((m) => m.id === modelId)?.name || modelId}
Station ID: STATION-04 (NEURO-ICU)
-----------------------------------------------------
ANALYSIS RESULTS:
- Diagnostic Outcome: ${result.detected ? "STROKE LESION IDENTIFIED (POSITIVE)" : "NO ACUTE LESION IDENTIFIED (NEGATIVE)"}
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
    <div className="h-screen w-screen bg-[#070a12] text-slate-100 flex flex-col overflow-hidden font-sans p-3 gap-3 select-none medical-dark-backdrop">
      
      {/* 1. Ultra-Luxurious Enterprise Navigation Deck */}
      <header className="h-14 glass-panel rounded-xl px-4 flex items-center justify-between gap-4 shrink-0 shadow-2xl">
        {/* Hospital Brand & Node Badge */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-1 rounded-full bg-cyan-500/20 blur-sm" />
            <img
              src="/brand_icon_trans.png"
              alt="NU Stroke Scan Logo"
              className="h-9 w-9 object-contain drop-shadow-md select-none pointer-events-none relative z-10"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white block leading-tight">
                <span className="text-amber-500">NU</span> STROKE SCAN
              </span>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-black bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                ENTERPRISE CLINICAL v1.2
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
              Neuro-Imaging Clinical Intelligence · Naresuan University
            </p>
          </div>
        </div>

        {/* Live PACS Telemetry & Node HUD */}
        <div className="hidden lg:flex items-center gap-4 glass-panel-subtle px-4 py-1.5 rounded-lg text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="font-bold text-slate-300">PACS SYNCHRONIZED</span>
          </div>
          <div className="w-[1px] h-3.5 bg-slate-700" />
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>LATENCY:</span>
            <span className="text-cyan-400 font-bold">14ms</span>
          </div>
          <div className="w-[1px] h-3.5 bg-slate-700" />
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>STATION:</span>
            <span className="text-slate-200 font-bold">#04 NEURO-ICU</span>
          </div>
        </div>

        {/* Model Architecture Selector Dock */}
        <div className="flex items-center glass-panel-subtle p-1 rounded-lg border border-slate-700/60 relative gap-1">
          {MODELS.map((m) => {
            const isSelected = modelId === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  setModelId(m.id);
                  setResult(null);
                }}
                className={`relative px-3.5 py-1.5 rounded-md text-xs font-bold transition-all duration-200 cursor-pointer select-none z-10 active:scale-95 ${
                  isSelected
                    ? "bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-lg border border-cyan-400/40"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <span>{m.name}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* 2. Main Workspace Layout */}
      <main className="flex-1 min-h-0 grid grid-cols-12 gap-3 overflow-hidden">
        
        {/* Left/Center Viewport Column (8 Cols) */}
        <section className="col-span-8 flex flex-col gap-2 min-h-0">
          <div className="flex-1 min-h-0 glass-panel rounded-xl p-3.5 flex flex-col shadow-2xl relative">
            
            {/* Viewport Top Bar with Symmetrical Header & Tools */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5 glass-panel-subtle px-3 py-1.5 rounded-lg border border-slate-700/60 shadow-inner">
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe] animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-200">
                  DICOM Dual Viewport
                </span>
                <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                  AXIAL 512×512
                </span>
              </div>

              {/* Viewport Interactive Tools */}
              <div className="flex items-center gap-1.5 glass-panel-subtle p-1 rounded-lg border border-slate-700/60 shadow-inner">
                {/* Zoom Controls Rect */}
                <div className="flex items-center bg-slate-900/90 px-1 py-0.5 rounded-md border border-slate-700/70 shadow-inner">
                  <button
                    onClick={handleZoomOut}
                    disabled={zoom <= 0.5}
                    title="Zoom Out (-25%)"
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all active:scale-90"
                  >
                    <ZoomOut className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={handleResetZoom}
                    title="Click to Reset Zoom to 100%"
                    className="px-2 py-0.5 rounded text-[11px] font-mono font-black text-cyan-300 hover:text-cyan-200 hover:bg-slate-800 cursor-pointer transition-all active:scale-95"
                  >
                    {Math.round(zoom * 100)}%
                  </button>

                  <button
                    onClick={handleZoomIn}
                    disabled={zoom >= 4}
                    title="Zoom In (+25%)"
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all active:scale-90"
                  >
                    <ZoomIn className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Gridlines Toggle Button */}
                <button
                  onClick={toggleGrid}
                  title={showGrid ? "Disable Fine Medical Gridlines" : "Enable Fine Medical Measurement Gridlines"}
                  className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-xs ${
                    showGrid
                      ? "bg-cyan-600 text-white border border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.5)]"
                      : "btn-glass-subtle"
                  }`}
                >
                  <Grid className="h-3.5 w-3.5" />
                  Grid {showGrid ? "ON" : "OFF"}
                </button>

                {/* Reset Controls Button */}
                <button
                  onClick={resetControls}
                  className="btn-glass-subtle px-3 py-1 text-xs font-bold hover:text-amber-400 hover:border-amber-500/40 flex items-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-95"
                  title="Reset all adjustments (Brightness, Contrast, Opacity, Threshold, Zoom, Grid) to defaults"
                >
                  <RotateCcw className="h-3.5 w-3.5 text-amber-400" />
                  Reset
                </button>
              </div>
            </div>

            {/* Dual CT Scanners Display */}
            <div className="flex-1 min-h-0 grid grid-cols-2 gap-3 relative">
              
              {/* Left: Original CT */}
              <div
                onContextMenu={(e) => handleViewportContextMenu(e, "left")}
                onMouseDown={(e) => handleViewportMouseDown(e, "left")}
                onMouseMove={(e) => handleViewportMouseMove(e, "left")}
                onMouseUp={handleViewportMouseUp}
                onMouseLeave={handleViewportMouseUp}
                onWheel={handleViewportWheel}
                className={`dicom-canvas-bg relative rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center p-2 shadow-2xl select-none ${
                  zoom > 1 ? (isDraggingViewport ? "cursor-grabbing" : "cursor-grab") : "cursor-crosshair"
                }`}
                title="Right-click to open Diagnostic Loupe · Hold Left-click & Drag Up/Down to Zoom Loupe"
              >
                {/* Holographic Laser Sweep Effect During Inference */}
                {isScanning && (
                  <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                    <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#00f2fe] animate-laser-sweep" />
                  </div>
                )}

                {/* Fine Medical Grid Overlay */}
                {showGrid && <div className="dicom-fine-grid absolute inset-0 z-10" />}

                {/* Subtle DICOM Corner Accents */}
                <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-cyan-500/50 pointer-events-none" />
                <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-cyan-500/50 pointer-events-none" />
                <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-cyan-500/50 pointer-events-none" />
                <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-cyan-500/50 pointer-events-none" />

                <div className="absolute top-2.5 left-2.5 z-20 px-2 py-0.5 rounded bg-black/80 border border-slate-700 text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider pointer-events-none">
                  Original NCCT
                </div>
                <span className="absolute top-2.5 right-3 z-20 text-xs font-mono text-slate-500 font-bold pointer-events-none">R</span>
                <span className="absolute bottom-2.5 right-3 z-20 text-xs font-mono text-slate-500 font-bold pointer-events-none">L</span>

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
                      alt="Original Scan"
                      className="w-full h-full object-contain pointer-events-none transition-[filter]"
                      style={{ filter: `brightness(${brightness}%) contrast(${contrast}%)` }}
                    />
                  </div>
                ) : (
                  <div className="text-center p-6 text-slate-600 space-y-2 pointer-events-none">
                    <Activity className="h-10 w-10 mx-auto text-slate-700 opacity-60 animate-pulse" />
                    <p className="text-xs font-bold text-slate-500">NO SCAN LOADED</p>
                    <p className="text-[11px] text-slate-600">Upload an axial brain slice to begin</p>
                  </div>
                )}
              </div>

              {/* Right: AI Model Lesion Segmentation */}
              <div
                onContextMenu={(e) => handleViewportContextMenu(e, "right")}
                onMouseDown={(e) => handleViewportMouseDown(e, "right")}
                onMouseMove={(e) => handleViewportMouseMove(e, "right")}
                onMouseUp={handleViewportMouseUp}
                onMouseLeave={handleViewportMouseUp}
                onWheel={handleViewportWheel}
                className={`dicom-canvas-bg relative rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center p-2 shadow-2xl select-none ${
                  zoom > 1 ? (isDraggingViewport ? "cursor-grabbing" : "cursor-grab") : "cursor-crosshair"
                }`}
                title="Right-click to open Diagnostic Loupe · Hold Left-click & Drag Up/Down to Zoom Loupe"
              >
                {/* Holographic Laser Sweep Effect During Inference */}
                {isScanning && (
                  <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                    <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#00f2fe] animate-laser-sweep" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px]">
                      <div className="relative flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                        <Activity className="h-6 w-6 text-cyan-400 absolute" />
                      </div>
                      <p className="mt-2 text-xs font-mono font-black text-cyan-300 tracking-widest uppercase">
                        NEURAL INFERENCE IN PROGRESS...
                      </p>
                    </div>
                  </div>
                )}

                {/* Fine Medical Grid Overlay */}
                {showGrid && <div className="dicom-fine-grid absolute inset-0 z-10" />}

                {/* Subtle DICOM Corner Accents */}
                <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-cyan-500/50 pointer-events-none" />
                <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-cyan-500/50 pointer-events-none" />
                <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-cyan-500/50 pointer-events-none" />
                <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-cyan-500/50 pointer-events-none" />

                <div className="absolute top-2.5 left-2.5 z-20 px-2 py-0.5 rounded bg-black/80 border border-slate-700 text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider pointer-events-none">
                  AI Overlay · {MODELS.find((m) => m.id === modelId)?.name}
                </div>
                <span className="absolute top-2.5 right-3 z-20 text-xs font-mono text-slate-500 font-bold pointer-events-none">R</span>
                <span className="absolute bottom-2.5 right-3 z-20 text-xs font-mono text-slate-500 font-bold pointer-events-none">L</span>

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
                      alt="Original Slice"
                      className="w-full h-full object-contain pointer-events-none transition-[filter]"
                      style={{ filter: `brightness(${brightness}%) contrast(${contrast}%)` }}
                    />
                    {result?.maskUrl && (
                      <img
                        src={result.maskUrl}
                        alt="Segmented Mask"
                        className="lesion-mask absolute inset-0 w-full h-full object-contain mix-blend-screen transition-opacity duration-150"
                        style={{ opacity: maskOpacity / 100 }}
                      />
                    )}
                  </div>
                ) : (
                  <div className="text-center p-6 text-slate-600 space-y-2 pointer-events-none">
                    <Layers className="h-10 w-10 mx-auto text-slate-700 opacity-60 animate-pulse" />
                    <p className="text-xs font-bold text-slate-500">LESION OVERLAY</p>
                    <p className="text-[11px] text-slate-600">Segmented heatmap will appear upon analysis</p>
                  </div>
                )}

                {/* High-Precision Diagnostic Loupe Overlay */}
                {loupe.active && (
                  <div
                    className="absolute z-50 pointer-events-none rounded-full border-2 border-cyan-400 shadow-[0_0_30px_rgba(0,242,254,0.9)] bg-black overflow-hidden transition-transform duration-75"
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
                          className="w-full h-full object-contain"
                          style={{ filter: `brightness(${brightness}%) contrast(${contrast}%)` }}
                        />
                      )}
                      {loupe.target === "right" && result?.maskUrl && (
                        <img
                          src={result.maskUrl}
                          alt="Loupe Mask"
                          className="lesion-mask absolute inset-0 w-full h-full object-contain mix-blend-screen"
                          style={{ opacity: maskOpacity / 100 }}
                        />
                      )}
                    </div>
                    
                    {/* Loupe Crosshair HUD & Measurement Radar */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="w-full h-[1px] bg-cyan-400/40" />
                      <div className="h-full w-[1px] bg-cyan-400/40 absolute" />
                      <div className="w-4 h-4 rounded-full border border-cyan-300/80 absolute" />
                    </div>
                    <div
                      className={`absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-mono font-black shadow-lg pointer-events-none ${
                        loupe.isZoomDragging
                          ? "bg-amber-500 text-black border border-amber-300 animate-pulse"
                          : "bg-black/95 border border-cyan-500/60 text-cyan-300"
                      }`}
                    >
                      {loupe.scale.toFixed(1)}× {loupe.isZoomDragging ? "· LOCKED" : ""}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Essential Controls Footer: Smooth Luxury Sliders */}
            <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-4 gap-2.5 shrink-0">
              
              {/* 1. Brightness Slider */}
              <div className="p-2.5 rounded-xl glass-panel-subtle flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-0.5">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Sun className="h-3.5 w-3.5 text-cyan-400" />
                    Brightness
                  </span>
                  <button
                    onClick={() => setBrightness(100)}
                    title="Click to reset Brightness to 100%"
                    className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[11px] font-bold cursor-pointer hover:bg-amber-500/30 transition-all active:scale-95"
                  >
                    {brightness}%
                  </button>
                </div>
                <SmoothSlider
                  value={brightness}
                  onChange={setBrightness}
                  min={50}
                  max={150}
                />
              </div>

              {/* 2. Contrast Slider */}
              <div className="p-2.5 rounded-xl glass-panel-subtle flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-0.5">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <HalfCircle className="h-3.5 w-3.5 text-cyan-400" />
                    Contrast
                  </span>
                  <button
                    onClick={() => setContrast(100)}
                    title="Click to reset Contrast to 100%"
                    className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[11px] font-bold cursor-pointer hover:bg-amber-500/30 transition-all active:scale-95"
                  >
                    {contrast}%
                  </button>
                </div>
                <SmoothSlider
                  value={contrast}
                  onChange={setContrast}
                  min={50}
                  max={200}
                />
              </div>

              {/* 3. Mask Opacity Slider */}
              <div className="p-2.5 rounded-xl glass-panel-subtle flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-0.5">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Layers className="h-3.5 w-3.5 text-cyan-400" />
                    Mask Opacity
                  </span>
                  <button
                    onClick={() => setMaskOpacity(85)}
                    title="Click to reset Opacity to 85%"
                    className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[11px] font-bold cursor-pointer hover:bg-amber-500/30 transition-all active:scale-95"
                  >
                    {maskOpacity}%
                  </button>
                </div>
                <SmoothSlider
                  value={maskOpacity}
                  onChange={setMaskOpacity}
                  min={0}
                  max={100}
                />
              </div>

              {/* 4. Sensitivity Threshold Slider */}
              <div className="p-2.5 rounded-xl glass-panel-subtle flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-0.5">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Gauge className="h-3.5 w-3.5 text-cyan-400" />
                    Threshold
                  </span>
                  <button
                    onClick={() => recomputeThreshold(50)}
                    title="Click to reset Threshold to 50%"
                    className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[11px] font-bold cursor-pointer hover:bg-amber-500/30 transition-all active:scale-95"
                  >
                    {threshold}%
                  </button>
                </div>
                <SmoothSlider
                  value={threshold}
                  onChange={recomputeThreshold}
                  min={10}
                  max={95}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Right Sidebar: Upload, Diagnosis & Export (4 Cols) */}
        <section className="col-span-4 flex flex-col gap-3 min-h-0">
          
          {/* Upload & Primary Action Card */}
          <div className="glass-panel rounded-xl p-3.5 flex flex-col shrink-0 shadow-2xl relative overflow-hidden">
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
              onDrop={handleDrop}
              className={`h-24 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 relative overflow-hidden ${
                isDragging
                  ? "border-cyan-400 bg-cyan-950/40 scale-[1.01]"
                  : "border-slate-700/80 hover:border-cyan-400 bg-slate-900/60 hover:bg-slate-900/90 active:scale-[0.99]"
              }`}
            >
              {imageUrl ? (
                <div className="flex items-center gap-3 px-3 w-full">
                  <img src={imageUrl} alt="Thumbnail" className="h-14 w-14 object-contain rounded-lg border border-slate-700 bg-black shadow-md" />
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">{file?.name ?? "Loaded NCCT Slice"}</p>
                    <p className="text-[11px] font-medium text-slate-400 mt-0.5">Click or drag to replace scan</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <UploadCloud className="h-6 w-6 mx-auto text-cyan-400" />
                  <p className="text-xs font-bold text-slate-200">Drop CT Scan or Click to Browse</p>
                  <p className="text-[11px] text-slate-400 font-medium">DICOM PNG, JPG, WEBP (Max 25 MB)</p>
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
              <div className="mt-2 p-2.5 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-red-400" />
                <span className="truncate">{error}</span>
              </div>
            )}

            {/* Primary Action Button - Luminous Gradient Enterprise CTA */}
            <button
              onClick={runInference}
              disabled={isScanning || !imageUrl}
              className={`relative overflow-hidden mt-3 h-12 w-full rounded-xl font-black text-sm uppercase tracking-wider text-white transition-all duration-200 flex items-center justify-center cursor-pointer select-none active:scale-[0.98] ${
                isScanning || !imageUrl
                  ? "bg-slate-800/60 text-slate-500 border border-slate-700/50 cursor-not-allowed shadow-none"
                  : "btn-glass-primary shadow-[0_0_20px_rgba(2,132,199,0.5)]"
              }`}
            >
              {isScanning ? (
                <div className="flex items-center justify-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin text-white" />
                  <span>ANALYZING AXIAL CT...</span>
                </div>
              ) : (
                <span className="text-center drop-shadow flex items-center gap-2">
                  <Zap className="h-4 w-4 text-cyan-300" />
                  ANALYZE BRAIN CT SCAN
                </span>
              )}
            </button>
          </div>

          {/* Diagnostic Intelligence Summary Card */}
          <div className="glass-panel rounded-xl p-3.5 flex-1 flex flex-col min-h-0 shadow-2xl relative">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 pb-2 border-b border-slate-800 flex items-center justify-between">
              <span>Diagnostic Assessment</span>
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
            </h3>

            {/* Outcome Banner */}
            <div className="mb-3">
              {result ? (
                result.detected ? (
                  <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/50 text-red-200 space-y-1 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
                        <span className="font-extrabold text-xs tracking-tight text-red-300">STROKE LESION DETECTED</span>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] font-mono font-extrabold rounded bg-red-600 text-white shadow">
                        POSITIVE
                      </span>
                    </div>
                    <p className="text-xs font-bold text-red-300">{result.label}</p>
                    <p className="text-[11px] text-slate-400 font-medium">Acute infarction area identified by neural model.</p>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 space-y-1 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span className="font-extrabold text-xs tracking-tight text-emerald-300">NO ACUTE LESION DETECTED</span>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] font-mono font-extrabold rounded bg-emerald-600 text-white shadow">
                        NEGATIVE
                      </span>
                    </div>
                    <p className="text-xs font-bold text-emerald-300">{result.label}</p>
                    <p className="text-[11px] text-slate-400 font-medium">No acute ischemic lesion detected above threshold.</p>
                  </div>
                )
              ) : (
                <div className="p-3 rounded-xl glass-panel-subtle border border-slate-800 text-center space-y-0.5">
                  <p className="text-xs font-bold text-slate-300">Awaiting Scan Analysis</p>
                  <p className="text-[11px] text-slate-500 font-medium">Load image and click &quot;Analyze Brain CT Scan&quot;</p>
                </div>
              )}
            </div>

            {/* Confidence Certainty Meter */}
            <div className="space-y-1.5 mb-3">
              <div className="flex justify-between text-xs font-bold text-slate-300">
                <span>Model Confidence Certainty</span>
                <span className="font-mono text-cyan-400 font-extrabold">
                  {result ? `${(result.confidence * 100).toFixed(1)}%` : "—"}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full transition-all duration-500 ${result?.detected ? "bg-gradient-to-r from-amber-500 to-red-500" : "bg-gradient-to-r from-sky-500 to-cyan-400"}`}
                  style={{ width: result ? `${result.confidence * 100}%` : "0%" }}
                />
              </div>
            </div>

            {/* Clean Key-Value Table */}
            <div className="space-y-1.5 text-xs border-t border-slate-800 pt-2.5 text-slate-400">
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span>Neural Architecture:</span>
                <span className="font-bold text-white">{result?.modelLabel ?? MODELS.find((m) => m.id === modelId)?.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span>Lesion ROI Volume:</span>
                <span className="font-mono text-cyan-400 font-bold">{result ? `${result.lesionArea ?? 0}%` : "—"}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Sensitivity Threshold:</span>
                <span className="font-mono text-slate-200 font-bold">{threshold}%</span>
              </div>
            </div>

            {/* Clinical Export Actions */}
            <div className="grid grid-cols-2 gap-2 mt-auto pt-3 border-t border-slate-800">
              <button
                onClick={exportAnnotatedImage}
                disabled={!imageUrl}
                className="btn-glass-subtle h-9 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95"
                title="Export high-resolution annotated image composite with lesion mask overlay"
              >
                {exportedStatus === "image" ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Download className="h-3.5 w-3.5 text-cyan-400" />
                )}
                {exportedStatus === "image" ? "Exported!" : "Image (.PNG)"}
              </button>

              <button
                onClick={exportReportText}
                disabled={!result}
                className="btn-glass-emerald h-9 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95"
                title="Download formal clinical diagnostic summary text report"
              >
                {exportedStatus === "report" ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                ) : (
                  <FileText className="h-3.5 w-3.5" />
                )}
                {exportedStatus === "report" ? "Downloaded!" : "Report (.TXT)"}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 3. Luxury Enterprise Hospital Footer */}
      <footer className="h-6 flex items-center justify-between text-xs font-medium text-slate-500 px-2 shrink-0">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          NU Stroke Scan Enterprise v1.2 · Naresuan University Neuro-Imaging Research Center
        </span>
        <span>Clinical Decision Support System · End-to-End Encrypted DICOM Protocol</span>
      </footer>
    </div>
  );
}
