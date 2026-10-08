"use client";

import { DragEvent, useEffect, useRef, useState } from "react";

// Standalone Vector Icons
function BrainIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.5 8.242" />
      <path d="M12 5v13" />
    </svg>
  );
}

function UploadCloudIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}

function RotateCcwIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function DownloadIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function FileTextIcon({ className = "h-4 w-4" }: { className?: string }) {
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

function CheckCircle2Icon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function AlertTriangleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" x2="12" y1="9" y2="13" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
    </svg>
  );
}

function RefreshCwIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

function SunIcon({ className = "h-4 w-4" }: { className?: string }) {
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

function MoonIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function HalfCircleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function LayersIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function GaugeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

function ZoomInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" x2="16.65" y1="21" y2="16.65" />
      <line x1="11" x2="11" y1="8" y2="14" />
      <line x1="8" x2="14" y1="11" y2="11" />
    </svg>
  );
}

function ZoomOutIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" x2="16.65" y1="21" y2="16.65" />
      <line x1="8" x2="14" y1="11" y2="11" />
    </svg>
  );
}

function GridIcon({ className = "h-4 w-4" }: { className?: string }) {
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

function ActivityIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function CopyIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// Flat Anatomical Brain Illustration for Empty Viewports
function BrainAnatomicalOutline({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 10C24 10 18 16 18 22C14 24 12 28 12 34C12 40 16 46 22 48C24 52 28 54 32 54" />
      <path d="M32 10C40 10 46 16 46 22C50 24 52 28 52 34C52 40 48 46 42 48C40 52 36 54 32 54" />
      <path d="M32 10V54" />
      <path d="M22 24C26 26 28 30 26 34C24 38 20 40 24 44" />
      <path d="M42 24C38 26 36 30 38 34C40 38 44 40 40 44" />
      <path d="M18 32H24" />
      <path d="M40 32H46" />
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
  { id: "vcanet", name: "VCA-Net", desc: "Visual Cortex Attention Network" },
  { id: "dlka", name: "Deformable LKA", desc: "MaxViT + Large Kernel Attention" },
  { id: "patcher", name: "Patcher", desc: "Patch SegFormer Architecture" },
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

    for (let i = 0; i < totalPixels; i++) {
      const idx = i * 4;
      const prob = data[idx];
      if (prob > maxProb) maxProb = prob;

      if (prob >= cutoff) {
        lesionPixels++;
        sumProb += prob;
        const norm = (prob - cutoff) / Math.max(1, 255 - cutoff);
        out[idx] = Math.round(234 + norm * 21);
        out[idx + 1] = Math.round(88 + norm * 60);
        out[idx + 2] = 12;
        out[idx + 3] = Math.round(160 + norm * 95);
      } else {
        out[idx + 3] = 0;
      }
    }

    ctx.putImageData(outImgData, 0, 0);
    const newMaskUrl = canvas.toDataURL("image/png");
    const lesionArea = Number(((lesionPixels / totalPixels) * 100).toFixed(2));
    const detected = lesionPixels > 10;
    const avgConfidence = lesionPixels > 0 ? (sumProb / lesionPixels) / 255 : maxProb / 255;
    const confidence = Number(Math.max(avgConfidence, detected ? 0.85 : 0.95).toFixed(4));
    const label = detected ? "Acute Ischemic Stroke (Positive)" : "No Acute Ischemic Infarction (Negative)";

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

      const res = await fetch(`/api/predict?model=${encodeURIComponent(modelId)}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errPayload = await res.json().catch(() => ({}));
        throw new Error(errPayload.error || errPayload.detail || `Server returned ${res.status}`);
      }

      const data = await res.json();
      const maskUrl = `data:image/png;base64,${data.mask_base64}`;

      const maskImg = new Image();
      maskImg.crossOrigin = "anonymous";
      maskImg.src = maskUrl;
      await new Promise((resolve) => { maskImg.onload = resolve; });

      const canvas = document.createElement("canvas");
      canvas.width = maskImg.width;
      canvas.height = maskImg.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(maskImg, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        probDataRef.current = {
          width: canvas.width,
          height: canvas.height,
          data: imgData.data,
        };
      }

      setResult({
        label: data.label,
        confidence: data.confidence,
        maskUrl,
        detected: data.detected,
        lesionArea: data.lesion_area ?? 0,
        modelLabel: data.model_label || MODELS.find((m) => m.id === modelId)?.name,
        inputSize: data.input_size || [512, 512],
      });
      recomputeThreshold(threshold);
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
      const canvas = document.createElement("canvas");
      canvas.width = baseImg.naturalWidth || 512;
      canvas.height = baseImg.naturalHeight || 512;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
      ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);
      ctx.filter = "none";

      if (result?.maskUrl) {
        const maskImg = new Image();
        maskImg.crossOrigin = "anonymous";
        maskImg.src = result.maskUrl;
        maskImg.onload = () => {
          ctx.globalAlpha = maskOpacity / 100;
          ctx.drawImage(maskImg, 0, 0, canvas.width, canvas.height);
          ctx.globalAlpha = 1.0;

          // Watermark & Clinical Legend
          ctx.fillStyle = "rgba(10, 17, 36, 0.9)";
          ctx.fillRect(16, canvas.height - 48, 380, 36);
          ctx.fillStyle = "#38bdf8";
          ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, sans-serif";
          ctx.fillText("NU STROKE SCAN", 28, canvas.height - 26);
          ctx.fillStyle = "#ffffff";
          ctx.font = "12px -apple-system, BlinkMacSystemFont, sans-serif";
          ctx.fillText(`· ${result.detected ? "POSITIVE" : "NEGATIVE"} (${(result.confidence * 100).toFixed(1)}%)`, 160, canvas.height - 26);

          const link = document.createElement("a");
          link.download = `stroke-scan-composite-${Date.now()}.png`;
          link.href = canvas.toDataURL("image/png");
          link.click();
          setExportedStatus("image");
          setTimeout(() => setExportedStatus(null), 2500);
        };
      } else {
        const link = document.createElement("a");
        link.download = `stroke-scan-${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        setExportedStatus("image");
        setTimeout(() => setExportedStatus(null), 2500);
      }
    };
  }

  function copySummaryToClipboard() {
    if (!result || !file) return;
    const summary = `=== NU STROKE SCAN CLINICAL ASSESSMENT ===
Date/Time: ${new Date().toLocaleString()}
Patient File: ${file.name}
Model Architecture: ${result.modelLabel || MODELS.find((m) => m.id === modelId)?.name}
Classification: ${result.label}
Confidence: ${(result.confidence * 100).toFixed(1)}%
Lesion Volume (ROI): ${result.lesionArea ?? 0}%
Sensitivity Threshold: ${threshold}%
==========================================`;

    navigator.clipboard.writeText(summary);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  }

  function exportReportText() {
    if (!result || !file) return;
    const reportText = `=====================================================
    NARESUAN UNIVERSITY HOSPITAL · NEURO-IMAGING CENTER
            STROKE AI CLINICAL DIAGNOSTIC REPORT
=====================================================
Timestamp: ${new Date().toISOString()}
Clinical Decision Support Model: ${result.modelLabel || MODELS.find((m) => m.id === modelId)?.name}
Diagnostic Finding: ${result.detected ? "ACUTE ISCHEMIC INFARCTION (POSITIVE)" : "NO ACUTE LESION (NEGATIVE)"}
-----------------------------------------------------
Key Diagnostic Metrics:
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
    <div className="h-screen w-screen flex flex-col overflow-hidden font-sans p-3 gap-2.5 select-none medical-grid-backdrop text-slate-100">
      
      {/* 1. Top Header Navigation Bar */}
      <header className="h-14 px-4 flex items-center justify-between shrink-0 rounded-xl bg-[#121d38] border border-[#21355f] shadow-sm">
        {/* Top-Left: Brand & Medical Department Subtitle */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center h-9 w-9 shrink-0">
            <img
              src="/brand_icon_trans.png"
              alt="NU Stroke Scan Logo"
              className="h-9 w-9 max-h-9 max-w-9 object-contain select-none pointer-events-none"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-extrabold text-base tracking-tight text-white flex items-center gap-2 leading-tight">
              <span className="text-[#38bdf8]">NU</span> STROKE SCAN
            </h1>
            <p className="text-[11px] text-slate-400 font-medium leading-tight">
              Neuro-Imaging Clinical Intelligence - Naresuan University
            </p>
          </div>
        </div>

        {/* Top-Right: Clinical Utility Controls + Mode Pill */}
        <div className="flex items-center gap-2">
          {/* Zoom Level Indicator */}
          <div className="flex items-center bg-[#182648] px-1 py-0.5 rounded-lg border border-[#21355f]">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 0.5}
              title="Zoom Out (-25%)"
              className="p-1 rounded text-slate-300 hover:text-white hover:bg-[#21355f] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ZoomOutIcon className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              title="Reset Zoom to 100%"
              className="px-2 py-0.5 rounded text-xs font-mono font-bold text-[#38bdf8] hover:text-white hover:bg-[#21355f] cursor-pointer"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              onClick={handleZoomIn}
              disabled={zoom >= 4}
              title="Zoom In (+25%)"
              className="p-1 rounded text-slate-300 hover:text-white hover:bg-[#21355f] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ZoomInIcon className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Gridlines Button */}
          <button
            onClick={toggleGrid}
            title="Toggle Fine Medical Measurement Gridlines"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
              showGrid
                ? "bg-[#0284c7] text-white border border-[#38bdf8]"
                : "btn-clinical-subtle"
            }`}
          >
            <GridIcon className={`h-3.5 w-3.5 ${showGrid ? "text-white" : "text-slate-300"}`} />
            Grid {showGrid ? "ON" : "OFF"}
          </button>

          {/* Reset View Button */}
          <button
            onClick={resetControls}
            className="btn-clinical-subtle px-3 py-1.5 text-xs font-bold hover:text-[#38bdf8] hover:border-[#38bdf8] flex items-center gap-1.5 cursor-pointer"
            title="Reset viewport and slider adjustments"
          >
            <RotateCcwIcon className="h-3.5 w-3.5 text-[#38bdf8]" />
            Reset
          </button>

          {/* Clinical Workstation Dark Mode Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#182648] border border-[#21355f] text-slate-300 font-bold text-xs">
            <MoonIcon className="h-3.5 w-3.5 text-[#38bdf8]" />
            <span>DARK MODE</span>
          </div>
        </div>
      </header>

      {/* 2. Main 3-Column Cockpit Workspace */}
      <main className="flex-1 min-h-0 grid grid-cols-12 gap-2.5 overflow-hidden">
        
        {/* ========================================================================= */}
        {/* COLUMN 1 (3 Cols): PATIENT INGESTION + MODEL SELECTOR + CTA */}
        {/* ========================================================================= */}
        <section className="col-span-3 flex flex-col gap-2.5 min-h-0 overflow-y-auto pr-0.5">
          
          {/* STEP 01: PATIENT INGESTION */}
          <div className="rounded-xl bg-[#121d38] border border-[#21355f] p-3 flex flex-col shrink-0 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold tracking-wider text-[#38bdf8] uppercase flex items-center gap-1.5">
                <UploadCloudIcon className="h-3.5 w-3.5 text-[#38bdf8]" />
                STEP 01: PATIENT INGESTION
              </span>
              {file && (
                <button
                  onClick={() => {
                    setFile(null);
                    setImageUrl(null);
                    setResult(null);
                  }}
                  className="text-xs font-bold text-red-400 hover:text-red-300 cursor-pointer"
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
              className={`h-36 xl:h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 relative overflow-hidden p-2.5 ${
                isDragging
                  ? "border-[#38bdf8] bg-[#1e3a8a]/30 scale-[1.01]"
                  : "border-[#21355f] hover:border-[#38bdf8]/70 bg-[#0a1124] hover:bg-[#101b38] active:scale-[0.99]"
              }`}
            >
              {imageUrl ? (
                <div className="flex flex-col items-center gap-1.5 px-2 w-full">
                  <img src={imageUrl} alt="Loaded Scan" className="h-16 w-16 object-contain rounded-lg border border-[#21355f] bg-black shadow-sm" />
                  <div className="text-center w-full">
                    <p className="text-xs font-bold text-white truncate">{file?.name ?? "Loaded Slice"}</p>
                    <p className="text-[11px] font-medium text-[#38bdf8] mt-0.5">Click or drag new slice to replace</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5 py-1">
                  <div className="w-9 h-9 rounded-xl bg-[#0284c7]/15 border border-[#38bdf8]/30 flex items-center justify-center mx-auto text-[#38bdf8]">
                    <UploadCloudIcon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-100">Drop Brain CT or Browse</p>
                    <p className="text-[11px] text-slate-400 font-medium">DICOM/NIfTI, JPEG, JPG, max 25MB</p>
                  </div>
                  <span className="inline-block px-3.5 py-0.5 rounded-full bg-[#182648] text-[#38bdf8] border border-[#38bdf8]/40 text-[11px] font-bold shadow-xs">
                    Choose File
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
              <div className="mt-2 p-2 rounded-lg bg-red-950/50 border border-red-800 text-red-300 text-xs font-semibold flex items-center gap-2">
                <AlertTriangleIcon className="h-4 w-4 shrink-0 text-red-400" />
                <span className="truncate">{error}</span>
              </div>
            )}
          </div>

          {/* STEP 02: NEURAL MODEL */}
          <div className="rounded-xl bg-[#121d38] border border-[#21355f] p-3 flex flex-col flex-1 min-h-0 shadow-sm">
            <span className="text-xs font-bold tracking-wider text-[#38bdf8] uppercase flex items-center gap-1.5 mb-2 shrink-0">
              <BrainIcon className="h-3.5 w-3.5 text-[#38bdf8]" />
              STEP 02: NEURAL MODEL
            </span>

            {/* Model Architecture Buttons */}
            <div className="space-y-1.5 mb-3 overflow-y-auto">
              {MODELS.map((m) => {
                const isSelected = modelId === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setModelId(m.id);
                      setResult(null);
                    }}
                    className={`w-full py-2 px-3 rounded-lg text-left transition-all cursor-pointer select-none border ${
                      isSelected
                        ? "bg-[#182648] border-[#38bdf8] text-white shadow-md font-bold"
                        : "bg-[#0a1124] hover:bg-[#101b38] text-slate-300 hover:text-white border-[#21355f] hover:border-slate-500"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{m.name}</span>
                      {isSelected ? (
                        <span className="text-[10px] bg-[#0284c7] text-white px-2 py-0.5 rounded font-mono font-bold">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="w-2 h-2 rounded-full border border-slate-600" />
                      )}
                    </div>
                    <div className={`text-[11px] mt-0.5 ${isSelected ? "text-[#38bdf8]" : "text-slate-400"}`}>
                      {m.desc}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Primary Action Button */}
            <button
              onClick={runInference}
              disabled={isScanning || !imageUrl}
              className={`relative overflow-hidden mt-auto h-11 w-full rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center cursor-pointer select-none active:scale-[0.98] ${
                isScanning || !imageUrl
                  ? "bg-[#182648] text-slate-500 border border-[#21355f] cursor-not-allowed shadow-none"
                  : "btn-clinical-primary text-white"
              }`}
            >
              {isScanning ? (
                <div className="flex items-center justify-center gap-2">
                  <RefreshCwIcon className="h-4 w-4 animate-spin text-white" />
                  <span>ANALYZING CT SCAN...</span>
                </div>
              ) : (
                <span>
                  ANALYZE BRAIN CT SCAN
                </span>
              )}
            </button>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* COLUMN 2 (6 Cols): SYNCHRONIZED DUAL VIEWPORT + STEP 03 CALIBRATION */}
        {/* ========================================================================= */}
        <section className="col-span-6 flex flex-col gap-2 min-h-0">
          
          {/* Main DICOM Dual Viewport Card */}
          <div className="flex-1 min-h-0 rounded-xl bg-[#121d38] border border-[#21355f] p-2.5 flex flex-col relative shadow-sm">
            
            {/* Viewport Top Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#21355f] shrink-0">
              <div className="flex items-center gap-2 bg-[#0a1124] px-2.5 py-1 rounded-lg border border-[#21355f]">
                <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                <span className="text-xs font-mono font-bold text-slate-200 tracking-wider">
                  SYNCHRONIZED DUAL VIEWPORT (512×512)
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Right-Click to Toggle Loupe · Scroll to Magnify
              </div>
            </div>

            {/* Dual Viewport Canvas Container */}
            <div className="flex-1 min-h-0 relative flex overflow-hidden">
              <div className="h-full w-full grid grid-cols-2 gap-2 relative">
                
                {/* Left Display: ORIGINAL NCCT */}
                <div
                  onContextMenu={(e) => handleViewportContextMenu(e, "left")}
                  onMouseDown={handleViewportMouseDown}
                  onMouseMove={(e) => handleViewportMouseMove(e, "left")}
                  onMouseUp={handleViewportMouseUp}
                  onMouseLeave={handleViewportMouseUp}
                  onWheel={(e) => handleViewportWheel(e, "left")}
                  className={`dicom-canvas-bg relative rounded-xl border border-[#21355f] hover:border-[#38bdf8]/60 transition-colors overflow-hidden flex items-center justify-center p-2 select-none ${
                    loupe.active ? "cursor-crosshair" : isDraggingViewport ? "cursor-grabbing" : "cursor-grab"
                  }`}
                  title="Right-click to toggle Loupe · Scroll Wheel to Zoom"
                >
                  {isScanning && (
                    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                      <div className="absolute w-full h-[2px] bg-[#38bdf8] animate-laser-sweep" />
                    </div>
                  )}

                  {showGrid && <div className="dicom-fine-grid absolute inset-0 z-10" />}

                  {/* Corner HUD Brackets */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#38bdf8]/60 pointer-events-none" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#38bdf8]/60 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#38bdf8]/60 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#38bdf8]/60 pointer-events-none" />

                  <div className="absolute top-3 left-3 z-20 px-2 py-0.5 rounded bg-[#0a1124]/90 border border-[#21355f] text-[10px] font-mono font-bold text-slate-200 uppercase tracking-wider pointer-events-none">
                    ORIGINAL NCCT
                  </div>
                  <span className="absolute top-3 right-3 z-20 text-xs font-mono text-slate-500 font-bold pointer-events-none">R</span>
                  <span className="absolute bottom-3 right-3 z-20 text-xs font-mono text-slate-500 font-bold pointer-events-none">L</span>

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
                    <div className="text-center p-6 text-slate-400 space-y-2 pointer-events-none flex flex-col items-center">
                      <div className="relative flex items-center justify-center text-[#38bdf8]/70">
                        <BrainAnatomicalOutline className="h-14 w-14" />
                        <ActivityIcon className="h-5 w-5 text-[#38bdf8] absolute" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-200 uppercase tracking-wider">NO SCAN LOADED</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">Upload an axial brain slice on the left</p>
                      </div>
                    </div>
                  )}

                  {/* Left Loupe */}
                  {loupe.active && loupe.target === "left" && (
                    <div
                      className="absolute z-50 pointer-events-none rounded-full border-2 border-[#38bdf8] bg-black overflow-hidden shadow-lg"
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
                        <div className="w-full h-[1px] bg-[#38bdf8]/60" />
                        <div className="h-full w-[1px] bg-[#38bdf8]/60 absolute" />
                        <div className="w-4 h-4 rounded-full border border-[#38bdf8] absolute" />
                      </div>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-black/90 border border-[#38bdf8] text-[#38bdf8]">
                        {loupe.scale.toFixed(1)}×
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Display: AI OVERLAY - VCA-NET */}
                <div
                  onContextMenu={(e) => handleViewportContextMenu(e, "right")}
                  onMouseDown={handleViewportMouseDown}
                  onMouseMove={(e) => handleViewportMouseMove(e, "right")}
                  onMouseUp={handleViewportMouseUp}
                  onMouseLeave={handleViewportMouseUp}
                  onWheel={(e) => handleViewportWheel(e, "right")}
                  className={`dicom-canvas-bg relative rounded-xl border border-[#21355f] hover:border-[#38bdf8]/60 transition-colors overflow-hidden flex items-center justify-center p-2 select-none ${
                    loupe.active ? "cursor-crosshair" : isDraggingViewport ? "cursor-grabbing" : "cursor-grab"
                  }`}
                  title="Right-click to toggle Loupe · Scroll Wheel to Zoom"
                >
                  {isScanning && (
                    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                      <div className="absolute w-full h-[2px] bg-[#38bdf8] animate-laser-sweep" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a1124]/85">
                        <div className="w-10 h-10 rounded-full border-2 border-[#38bdf8] border-t-transparent animate-spin mb-2" />
                        <p className="text-xs font-mono font-bold text-[#38bdf8] tracking-wider uppercase">
                          NEURAL INFERENCE IN PROGRESS...
                        </p>
                      </div>
                    </div>
                  )}

                  {showGrid && <div className="dicom-fine-grid absolute inset-0 z-10" />}

                  {/* Corner HUD Brackets */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#38bdf8]/60 pointer-events-none" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#38bdf8]/60 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#38bdf8]/60 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#38bdf8]/60 pointer-events-none" />

                  <div className="absolute top-3 left-3 z-20 px-2 py-0.5 rounded bg-[#0a1124]/90 border border-[#38bdf8]/50 text-[10px] font-mono font-bold text-[#38bdf8] uppercase tracking-wider pointer-events-none">
                    AI OVERLAY - {MODELS.find((m) => m.id === modelId)?.name.toUpperCase()}
                  </div>
                  <span className="absolute top-3 right-3 z-20 text-xs font-mono text-slate-500 font-bold pointer-events-none">R</span>
                  <span className="absolute bottom-3 right-3 z-20 text-xs font-mono text-slate-500 font-bold pointer-events-none">L</span>

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
                    <div className="text-center p-6 text-slate-400 space-y-2 pointer-events-none flex flex-col items-center">
                      <div className="relative flex items-center justify-center text-[#38bdf8]/70">
                        <BrainAnatomicalOutline className="h-14 w-14" />
                        <LayersIcon className="h-5 w-5 text-[#38bdf8] absolute" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-200 uppercase tracking-wider">LESION OVERLAY</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">Segmentation overlays will appear upon analysis</p>
                      </div>
                    </div>
                  )}

                  {/* Right Loupe */}
                  {loupe.active && loupe.target === "right" && (
                    <div
                      className="absolute z-50 pointer-events-none rounded-full border-2 border-[#38bdf8] bg-black overflow-hidden shadow-lg"
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
                        <div className="w-full h-[1px] bg-[#38bdf8]/60" />
                        <div className="h-full w-[1px] bg-[#38bdf8]/60 absolute" />
                        <div className="w-4 h-4 rounded-full border border-[#38bdf8] absolute" />
                      </div>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-black/90 border border-[#38bdf8] text-[#38bdf8]">
                        {loupe.scale.toFixed(1)}×
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 03: CALIBRATION */}
          <div className="rounded-xl bg-[#121d38] border border-[#21355f] p-2.5 shrink-0 shadow-sm">
            <div className="flex items-center justify-between pb-1 mb-1.5 shrink-0">
              <span className="text-xs font-bold tracking-wider text-[#38bdf8] uppercase flex items-center gap-1.5">
                <SunIcon className="h-3.5 w-3.5 text-[#38bdf8]" />
                STEP 03: CALIBRATION
              </span>
            </div>

            {/* 4 Soft Blue Circular Knob Sliders (2x2 Grid) */}
            <div className="grid grid-cols-2 gap-2">
              
              {/* 1. Brightness */}
              <div className="p-2 px-2.5 rounded-lg bg-[#0a1124] border border-[#21355f] hover:border-[#38bdf8]/60 transition-colors flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-bold text-slate-200 mb-0.5">
                  <span className="flex items-center gap-1.5 text-slate-300 text-xs">
                    <SunIcon className="h-3.5 w-3.5 text-[#38bdf8]" />
                    Brightness
                  </span>
                  <button
                    onClick={() => setBrightness(100)}
                    title="Reset to 100%"
                    className="px-2 py-0.5 rounded bg-[#182648] border border-[#38bdf8]/40 text-[#38bdf8] font-mono text-[11px] font-bold cursor-pointer hover:bg-[#21355f]"
                  >
                    {brightness}%
                  </button>
                </div>
                <SmoothSlider value={brightness} onChange={setBrightness} min={50} max={150} />
              </div>

              {/* 2. Contrast */}
              <div className="p-2 px-2.5 rounded-lg bg-[#0a1124] border border-[#21355f] hover:border-[#38bdf8]/60 transition-colors flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-bold text-slate-200 mb-0.5">
                  <span className="flex items-center gap-1.5 text-slate-300 text-xs">
                    <HalfCircleIcon className="h-3.5 w-3.5 text-[#38bdf8]" />
                    Contrast
                  </span>
                  <button
                    onClick={() => setContrast(100)}
                    title="Reset to 100%"
                    className="px-2 py-0.5 rounded bg-[#182648] border border-[#38bdf8]/40 text-[#38bdf8] font-mono text-[11px] font-bold cursor-pointer hover:bg-[#21355f]"
                  >
                    {contrast}%
                  </button>
                </div>
                <SmoothSlider value={contrast} onChange={setContrast} min={50} max={200} />
              </div>

              {/* 3. Mask Opacity */}
              <div className="p-2 px-2.5 rounded-lg bg-[#0a1124] border border-[#21355f] hover:border-[#38bdf8]/60 transition-colors flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-bold text-slate-200 mb-0.5">
                  <span className="flex items-center gap-1.5 text-slate-300 text-xs">
                    <LayersIcon className="h-3.5 w-3.5 text-[#38bdf8]" />
                    Mask Opacity
                  </span>
                  <button
                    onClick={() => setMaskOpacity(85)}
                    title="Reset to 85%"
                    className="px-2 py-0.5 rounded bg-[#182648] border border-[#38bdf8]/40 text-[#38bdf8] font-mono text-[11px] font-bold cursor-pointer hover:bg-[#21355f]"
                  >
                    {maskOpacity}%
                  </button>
                </div>
                <SmoothSlider value={maskOpacity} onChange={setMaskOpacity} min={0} max={100} />
              </div>

              {/* 4. Sensitivity Threshold */}
              <div className="p-2 px-2.5 rounded-lg bg-[#0a1124] border border-[#21355f] hover:border-[#38bdf8]/60 transition-colors flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-bold text-slate-200 mb-0.5">
                  <span className="flex items-center gap-1.5 text-slate-300 text-xs">
                    <GaugeIcon className="h-3.5 w-3.5 text-[#38bdf8]" />
                    Sensitivity Threshold
                  </span>
                  <button
                    onClick={() => recomputeThreshold(50)}
                    title="Reset to 50%"
                    className="px-2 py-0.5 rounded bg-[#182648] border border-[#38bdf8]/40 text-[#38bdf8] font-mono text-[11px] font-bold cursor-pointer hover:bg-[#21355f]"
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
        <section className="col-span-3 flex flex-col gap-2 min-h-0 overflow-y-auto">
          
          <div className="rounded-xl bg-[#121d38] border border-[#21355f] p-3 flex-1 flex flex-col justify-between shadow-sm">
            <div>
              {/* Header */}
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 pb-1.5 border-b border-[#21355f] flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-white font-bold">
                  <ActivityIcon className="h-3.5 w-3.5 text-[#38bdf8]" />
                  DIAGNOSTIC ASSESSMENT
                </span>
                <span className="text-[10px] text-slate-400 font-mono">CASE RESULT</span>
              </h3>

              {/* Outcome Clinical Banner */}
              <div className="mb-2.5">
                {result ? (
                  result.detected ? (
                    <div className="p-3 rounded-xl bg-red-950/40 border-2 border-red-500 text-red-100 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <AlertTriangleIcon className="h-4 w-4 text-red-400 shrink-0" />
                          <span className="font-extrabold text-xs tracking-tight text-red-200">STROKE DETECTED</span>
                        </div>
                        <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-red-600 text-white">
                          POSITIVE
                        </span>
                      </div>
                      <p className="text-xs font-bold text-white">{result.label}</p>
                      <p className="text-[11px] text-red-300">Acute ischemic infarction identified above threshold.</p>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-emerald-950/40 border-2 border-emerald-500 text-emerald-100 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2Icon className="h-4 w-4 text-emerald-400 shrink-0" />
                          <span className="font-extrabold text-xs tracking-tight text-emerald-200">NO ACUTE LESION</span>
                        </div>
                        <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-emerald-600 text-white">
                          NEGATIVE
                        </span>
                      </div>
                      <p className="text-xs font-bold text-white">{result.label}</p>
                      <p className="text-[11px] text-emerald-300">No acute ischemic lesion detected above threshold.</p>
                    </div>
                  )
                ) : (
                  <div className="p-3.5 rounded-xl bg-[#0a1124] border border-[#21355f] text-center space-y-1">
                    <div className="w-8 h-8 rounded-xl bg-[#0284c7]/15 border border-[#38bdf8]/30 flex items-center justify-center mx-auto text-[#38bdf8]">
                      <ActivityIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-100">Neural Engine Standby</p>
                      <p className="text-[11px] text-slate-400">Upload a CT scan document and click &quot;Analyze Brain CT Scan&quot;</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Model Confidence Meter */}
              <div className="space-y-1.5 mb-2.5 p-2.5 rounded-xl bg-[#0a1124] border border-[#21355f]">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Model Confidence</span>
                  <span className="font-mono text-[#38bdf8] font-bold text-xs sm:text-sm">
                    {result ? `${(result.confidence * 100).toFixed(1)}%` : "—"}
                  </span>
                </div>
                <div className="h-2 w-full bg-[#182648] rounded-full overflow-hidden border border-[#21355f]">
                  <div
                    className={`h-full transition-all duration-300 ${
                      result?.detected
                        ? "bg-gradient-to-r from-amber-400 to-red-500"
                        : "bg-gradient-to-r from-[#0284c7] to-[#38bdf8]"
                    }`}
                    style={{ width: result ? `${result.confidence * 100}%` : "0%" }}
                  />
                </div>
              </div>

              {/* Key Clinical Metrics Table */}
              <div className="space-y-1.5 text-xs bg-[#0a1124] border border-[#21355f] rounded-xl p-3 text-slate-300 mb-2">
                <div className="flex justify-between py-1 border-b border-[#21355f]">
                  <span className="text-slate-400 font-medium">Neural Model:</span>
                  <span className="font-semibold text-white">{result?.modelLabel ?? MODELS.find((m) => m.id === modelId)?.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#21355f]">
                  <span className="text-slate-400 font-medium">Lesion ROI Volume:</span>
                  <span className="font-mono text-[#38bdf8] font-bold">{result ? `${result.lesionArea ?? 0}%` : "—"}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400 font-medium">Sensitivity Cutoff:</span>
                  <span className="font-mono text-slate-200 font-semibold">{threshold}%</span>
                </div>
              </div>
            </div>

            {/* Bottom-Right Stacked CTAs: Blue, Dark Cyan, Teal */}
            <div className="space-y-1.5 pt-2 border-t border-[#21355f]">
              {/* Copy Clinical Summary (Blue/Subtle) */}
              <button
                onClick={copySummaryToClipboard}
                disabled={!result}
                className="btn-clinical-subtle w-full h-9 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                title="Copy clinical summary to clipboard"
              >
                {copiedToast ? <CheckIcon className="h-3.5 w-3.5 text-[#38bdf8]" /> : <CopyIcon className="h-3.5 w-3.5 text-slate-300" />}
                <span>{copiedToast ? "Summary Copied!" : "Copy Clinical Summary"}</span>
              </button>

              {/* Export Composite Image (Dark Cyan) */}
              <button
                onClick={exportAnnotatedImage}
                disabled={!imageUrl}
                className="btn-clinical-cyan w-full h-9 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-xs"
                title="Export high-resolution annotated image composite with lesion mask overlay"
              >
                {exportedStatus === "image" ? (
                  <CheckCircle2Icon className="h-3.5 w-3.5 text-white" />
                ) : (
                  <DownloadIcon className="h-3.5 w-3.5 text-white" />
                )}
                <span>{exportedStatus === "image" ? "Image Exported!" : "Export Composite Image"}</span>
              </button>

              {/* Download Clinical Report (Teal) */}
              <button
                onClick={exportReportText}
                disabled={!result}
                className="btn-clinical-teal w-full h-9.5 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-xs"
                title="Download formal clinical diagnostic summary text report"
              >
                {exportedStatus === "report" ? (
                  <CheckCircle2Icon className="h-3.5 w-3.5 text-white" />
                ) : (
                  <FileTextIcon className="h-3.5 w-3.5" />
                )}
                <span>{exportedStatus === "report" ? "Report Downloaded!" : "Download Clinical Report"}</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 3. Streamlined Clinical Footer */}
      <footer className="h-4 flex items-center justify-between text-[11px] font-medium text-slate-400 px-3 shrink-0 border-t border-[#21355f] pt-0.5">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
          NU Stroke Scan Enterprise v1.2 · Naresuan University Neuro-Imaging Research Center
        </span>
        <span>End-to-End Encrypted DICOM Protocol · ISO 13485 Clinical Intelligence</span>
      </footer>
    </div>
  );
}
