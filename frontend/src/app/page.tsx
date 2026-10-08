"use client";

import { DragEvent, useEffect, useRef, useState } from "react";

// Standalone High-Precision Vector Icons (Zero external dependencies)
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

function Moon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
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





function Copy({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function Check({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" />
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
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("nu_stroke_theme") as "light" | "dark" | null;
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
      if (saved === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  function toggleTheme() {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("nu_stroke_theme", next);
      if (next === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  }

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
    setLoupe((prev) => ({ ...prev, active: false, target: null, scale: 3.0 }));
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
        return { ...prev, active: false, target: null };
      }
      return {
        active: true,
        x,
        y,
        normX: Math.max(0, Math.min(1, x / rect.width)),
        normY: Math.max(0, Math.min(1, y / rect.height)),
        target,
        scale: 3.0,
      };
    });
  }

  function handleViewportMouseDown(e: React.MouseEvent) {
    if (e.button === 2) return;
    if (e.button !== 0) return;

    setIsDraggingViewport(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
  }

  function handleViewportMouseMove(e: React.MouseEvent<HTMLDivElement>, target: "left" | "right") {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (loupe.active && loupe.target === target) {
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
    setIsDraggingViewport(false);
    dragStartRef.current = null;
  }

  function handleViewportWheel(e: React.WheelEvent, target: "left" | "right") {
    e.preventDefault();
    if (loupe.active && loupe.target === target) {
      // Mouse Wheel Zoom for Diagnostic Loupe Magnification
      if (e.deltaY < 0) {
        setLoupe((prev) => ({
          ...prev,
          scale: Math.min(8.0, Number((prev.scale + 0.25).toFixed(2))),
        }));
      } else {
        setLoupe((prev) => ({
          ...prev,
          scale: Math.max(3.0, Number((prev.scale - 0.25).toFixed(2))),
        }));
      }
      return;
    }

    // Default Canvas Viewport Zoom
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

      const apiEndpoint = process.env.NEXT_PUBLIC_API_URL
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/analysis`
        : "/api/analysis";

      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      });

      let payload: Record<string, unknown>;
      try {
        payload = (await response.json()) as Record<string, unknown>;
      } catch {
        if (!response.ok) {
          throw new Error(
            `Backend connection failed (${response.status}). Please make sure FastAPI backend is running on port 8000.`
          );
        }
        throw new Error("Invalid response received from AI server.");
      }

      if (!response.ok) {
        const errorDetail = (payload.detail as string | undefined) ?? (payload.message as string | undefined) ?? "Inference failed.";
        throw new Error(errorDetail);
      }

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

      const isDetected =
        (payload.lesion_detected as boolean | undefined) ??
        ((payload.confidence as number) >= threshold / 100);

      setResult({
        label: (payload.label as string) || "Diagnostic Complete",
        confidence: typeof payload.confidence === "number" ? payload.confidence : 0,
        maskUrl: `data:image/png;base64,${(payload.mask_png_base64 as string) || ""}`,
        detected: isDetected,
        lesionArea: payload.lesion_area_percentage as number | undefined,
        modelLabel: payload.model_label as string | undefined,
        inputSize: payload.input_size as [number, number] | undefined,
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
    setLoupe({ active: false, x: 0, y: 0, normX: 0.5, normY: 0.5, target: null, scale: 3.0 });
    recomputeThreshold(50);
  }

  function copySummaryToClipboard() {
    if (!result) return;
    const summary = `NU STROKE SCAN REPORT
Diagnosis: ${result.detected ? "STROKE LESION IDENTIFIED" : "NEGATIVE CLEAR SCAN"}
Neural Architecture: ${MODELS.find((m) => m.id === modelId)?.name || modelId}
Model Certainty: ${(result.confidence * 100).toFixed(1)}%
Lesion Volume Area: ${result.lesionArea ?? 0}%
Sensitivity Cutoff: ${threshold}%
Institution: Naresuan University Neuro-Imaging Center`;
    navigator.clipboard.writeText(summary);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
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

    ctx.fillStyle = "rgba(15, 23, 42, 0.92)";
    ctx.fillRect(12, canvas.height - 40, 380, 28);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 11px monospace";
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
    <div className={`h-screen w-screen flex flex-col overflow-hidden font-sans p-3 gap-2 select-none transition-colors duration-300 ${theme === "dark" ? "dark bg-[#12141a] text-gray-100" : "bg-[#d8dde6] text-gray-900"} medical-vibrant-backdrop`}>
      
      {/* 1. Seamless High-Tech Navigation Deck */}
      <header className="h-14 px-3 flex items-center justify-between shrink-0 border-b border-gray-200/70 dark:border-gray-800/70 bg-transparent">
        {/* Hospital Brand & Node Badge */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-1 rounded-full bg-orange-500/20 blur-sm animate-pulse" />
            <img
              src="/brand_icon_trans.png"
              alt="NU Stroke Scan Logo"
              className="h-10 w-10 object-contain drop-shadow-[0_2px_8px_rgba(249,115,22,0.4)] select-none pointer-events-none relative z-10"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-black text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white block leading-tight">
              <span className="text-orange-500">NU</span> STROKE SCAN
            </h1>
            <p className="text-xs text-slate-500 dark:text-gray-400 font-medium leading-tight">
              Neuro-Imaging Clinical Intelligence · Naresuan University
            </p>
          </div>
        </div>

        {/* Theme Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          title={theme === "dark" ? "Switch to High-Contrast Light Mode" : "Switch to Deep Clinical Dark Mode"}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-gray-300 dark:border-gray-700/80 bg-gray-100/80 dark:bg-gray-800/60 hover:border-orange-400 dark:hover:border-orange-500 text-slate-700 dark:text-gray-200 font-bold text-xs cursor-pointer shadow-xs transition-all active:scale-95 select-none"
        >
          {theme === "dark" ? (
            <>
              <Sun className="h-3.5 w-3.5 text-amber-400 animate-spin-slow" />
              <span>LIGHT MODE</span>
            </>
          ) : (
            <>
              <Moon className="h-3.5 w-3.5 text-orange-600" />
              <span>DARK MODE</span>
            </>
          )}
        </button>
      </header>

      {/* 2. Main Workspace Layout: Seamless 3-Column Cockpit Canvas */}
      <main className="flex-1 min-h-0 grid grid-cols-12 gap-3.5 overflow-hidden pt-1">
        
        {/* ========================================================================= */}
        {/* COLUMN 1 (3 Cols): PATIENT INGESTION + MODEL SELECTOR + INFERENCE CTA */}
        {/* ========================================================================= */}
        <section className="col-span-3 flex flex-col gap-3 min-h-0 overflow-y-auto pr-0.5">
          
          {/* STEP 1: Case Ingestion & Upload */}
          <div className="flex flex-col shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono font-extrabold tracking-wider text-orange-500 uppercase flex items-center gap-1.5">
                <UploadCloud className="h-4 w-4" />
                Step 01 · Ingestion
              </span>
              {file && (
                <button
                  onClick={() => {
                    setFile(null);
                    setImageUrl(null);
                    setResult(null);
                  }}
                  className="text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 cursor-pointer"
                >
                  Clear Scan
                </button>
              )}
            </div>

            {/* Drag & Drop Box */}
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
              onDrop={handleDrop}
              className={`h-40 xl:h-44 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 relative overflow-hidden p-3 ${
                isDragging
                  ? "border-orange-500 bg-orange-50/90 dark:bg-orange-950/40 scale-[1.01] shadow-md shadow-orange-500/20"
                  : "border-gray-300 dark:border-gray-700/80 hover:border-orange-400 dark:hover:border-orange-500 bg-gray-50/60 dark:bg-gray-800/30 hover:bg-gray-100/80 dark:hover:bg-gray-800/50 active:scale-[0.99]"
              }`}
            >
              {imageUrl ? (
                <div className="flex flex-col items-center gap-2 px-3 w-full">
                  <img src={imageUrl} alt="Thumbnail" className="h-18 w-18 object-contain rounded-lg border border-gray-300 dark:border-gray-700 bg-black shadow-sm" />
                  <div className="text-center w-full">
                    <p className="text-sm font-bold text-slate-900 dark:text-gray-100 truncate">{file?.name ?? "Loaded NCCT Slice"}</p>
                    <p className="text-xs font-medium text-orange-600 dark:text-orange-400 mt-0.5">Click or drag new slice to replace scan</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5 py-1">
                  <div className="w-10 h-10 rounded-full bg-orange-100/90 dark:bg-orange-950/60 flex items-center justify-center mx-auto shadow-xs border border-orange-200 dark:border-orange-800/80">
                    <UploadCloud className="h-5 w-5 text-orange-600 dark:text-orange-400 animate-bounce" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-gray-200">Drop Brain CT or Browse</p>
                    <p className="text-[11px] text-slate-500 dark:text-gray-400 font-medium mt-0.5">DICOM PNG, JPG, WEBP (Max 25 MB)</p>
                  </div>
                  <span className="inline-block px-3 py-0.5 rounded-full bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/40 text-[11px] font-bold shadow-xs">
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
              <div className="mt-2 p-2.5 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/80 text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2 shadow-xs">
                <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
                <span className="truncate">{error}</span>
              </div>
            )}
          </div>

          {/* STEP 2: Neural Model Architecture & Primary Analysis Action */}
          <div className="flex flex-col flex-1 min-h-0">
            <span className="text-xs font-mono font-extrabold tracking-wider text-orange-500 uppercase flex items-center gap-1.5 mb-2">
              <Brain className="h-4 w-4" />
              Step 02 · Neural Model
            </span>

            {/* Model Architecture Selector Vertical Stack */}
            <div className="space-y-1.5 mb-3">
              {MODELS.map((m) => {
                const isSelected = modelId === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setModelId(m.id);
                      setResult(null);
                    }}
                    className={`w-full py-2.5 px-3 rounded-xl text-left transition-all cursor-pointer select-none border ${
                      isSelected
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md border-orange-400 font-extrabold"
                        : "bg-gray-50/80 dark:bg-gray-800/40 hover:bg-gray-100/90 dark:hover:bg-gray-800/70 text-slate-700 dark:text-gray-200 border-gray-200/80 dark:border-gray-700/70"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">{m.name}</span>
                      {isSelected && <span className="text-[10px] bg-white/25 px-2 py-0.5 rounded text-white font-mono font-bold">ACTIVE</span>}
                    </div>
                    <div className={`text-xs mt-0.5 ${isSelected ? "text-orange-100" : "text-slate-500 dark:text-gray-400"}`}>
                      {m.desc}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Primary Action Button - Luminous Gradient Enterprise CTA */}
            <button
              onClick={runInference}
              disabled={isScanning || !imageUrl}
              className={`relative overflow-hidden mt-auto h-12 w-full rounded-xl font-black text-sm uppercase tracking-wider text-white transition-all duration-200 flex items-center justify-center cursor-pointer select-none active:scale-[0.98] ${
                isScanning || !imageUrl
                  ? "bg-gray-200 dark:bg-gray-800/60 text-gray-400 dark:text-gray-500 border border-gray-300 dark:border-gray-700/60 cursor-not-allowed shadow-none"
                  : "btn-vibrant-primary shadow-lg shadow-orange-500/25"
              }`}
            >
              {isScanning ? (
                <div className="flex items-center justify-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin text-white" />
                  <span>ANALYZING CT SCAN...</span>
                </div>
              ) : (
                <span className="text-center drop-shadow">
                  ANALYZE BRAIN CT SCAN
                </span>
              )}
            </button>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* COLUMN 2 (6 Cols): SYNCHRONIZED DUAL VIEWPORT + CALIBRATION SLIDERS UNDER */}
        {/* ========================================================================= */}
        <section className="col-span-6 flex flex-col gap-2.5 min-h-0">
          
          {/* Main DICOM Viewport Section */}
          <div className="flex-1 min-h-0 flex flex-col relative">
            
            {/* Viewport Top Bar with Synchronized Badge & Medical Tools */}
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-gray-200/70 dark:border-gray-800/70 shrink-0">
              
              {/* Synchronized Dual Indicator */}
              <div className="flex items-center gap-2 bg-gray-100/80 dark:bg-gray-800/50 px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700/60">
                <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_6px_#f97316]" />
                <span className="text-xs sm:text-sm font-mono font-black text-slate-800 dark:text-gray-200 uppercase tracking-wider">
                  Synchronized Dual Viewport (512×512)
                </span>
              </div>

              {/* Viewport Interactive Tools */}
              <div className="flex items-center gap-2">
                
                {/* Zoom Controls Rect */}
                <div className="flex items-center bg-gray-50 dark:bg-gray-800/60 px-1 py-0.5 rounded-md border border-gray-200 dark:border-gray-700/70 shadow-xs">
                  <button
                    onClick={handleZoomOut}
                    disabled={zoom <= 0.5}
                    title="Zoom Out (-25%)"
                    className="p-1 rounded text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all active:scale-90"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>

                  <button
                    onClick={handleResetZoom}
                    title="Click to Reset Zoom to 100%"
                    className="px-2 py-0.5 rounded text-xs font-mono font-black text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:bg-orange-50 dark:hover:bg-gray-700 cursor-pointer transition-all active:scale-95"
                  >
                    {Math.round(zoom * 100)}%
                  </button>

                  <button
                    onClick={handleZoomIn}
                    disabled={zoom >= 4}
                    title="Zoom In (+25%)"
                    className="p-1 rounded text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all active:scale-90"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                </div>

                {/* Gridlines Toggle Button */}
                <button
                  onClick={toggleGrid}
                  title={showGrid ? "Disable Fine Medical Gridlines" : "Enable Fine Medical Measurement Gridlines"}
                  className={`px-3 py-1 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-xs ${
                    showGrid
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white border border-orange-400 shadow-sm"
                      : "btn-vibrant-subtle"
                  }`}
                >
                  <Grid className={`h-4 w-4 ${showGrid ? "text-white" : "text-slate-600 dark:text-gray-300"}`} />
                  Grid {showGrid ? "ON" : "OFF"}
                </button>

                {/* Reset Controls Button */}
                <button
                  onClick={resetControls}
                  className="btn-vibrant-subtle px-3 py-1 text-xs sm:text-sm font-bold hover:text-orange-600 dark:hover:text-orange-400 hover:border-orange-400 flex items-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-95"
                  title="Reset all adjustments to defaults"
                >
                  <RotateCcw className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  Reset
                </button>
              </div>
            </div>

            {/* Viewport Center Canvas: Pure Synchronized Dual View */}
            <div className="flex-1 min-h-0 relative flex overflow-hidden">
              <div className="h-full w-full grid grid-cols-2 gap-2.5 relative">
                
                {/* Left: Original CT */}
                <div
                  onContextMenu={(e) => handleViewportContextMenu(e, "left")}
                  onMouseDown={handleViewportMouseDown}
                  onMouseMove={(e) => handleViewportMouseMove(e, "left")}
                  onMouseUp={handleViewportMouseUp}
                  onMouseLeave={handleViewportMouseUp}
                  onWheel={(e) => handleViewportWheel(e, "left")}
                  className={`dicom-canvas-bg relative rounded-xl border border-gray-800/80 hover:border-orange-500/40 transition-colors overflow-hidden flex items-center justify-center p-2 shadow-2xl select-none ${
                    loupe.active ? "cursor-crosshair" : isDraggingViewport ? "cursor-grabbing" : "cursor-grab"
                  }`}
                  title="Right-click to toggle Diagnostic Loupe · Scroll Wheel to Magnify"
                >
                  {isScanning && (
                    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                      <div className="absolute w-full h-[3px] bg-gradient-to-r from-transparent via-orange-400 to-transparent shadow-[0_0_24px_#f97316] animate-laser-sweep" />
                    </div>
                  )}

                  {showGrid && <div className="dicom-fine-grid absolute inset-0 z-10" />}

                  <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-orange-400/70 pointer-events-none shadow-[0_0_6px_rgba(249,115,22,0.4)]" />
                  <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-orange-400/70 pointer-events-none shadow-[0_0_6px_rgba(249,115,22,0.4)]" />
                  <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-orange-400/70 pointer-events-none shadow-[0_0_6px_rgba(249,115,22,0.4)]" />
                  <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-orange-400/70 pointer-events-none shadow-[0_0_6px_rgba(249,115,22,0.4)]" />

                  <div className="absolute top-2.5 left-2.5 z-20 px-2.5 py-1 rounded bg-black/85 border border-orange-500/30 text-xs font-mono font-bold text-gray-200 uppercase tracking-wider pointer-events-none shadow-md">
                    Original NCCT
                  </div>
                  <span className="absolute top-2.5 right-3 z-20 text-sm font-mono text-orange-400/80 font-black pointer-events-none">R</span>
                  <span className="absolute bottom-2.5 right-3 z-20 text-sm font-mono text-orange-400/80 font-black pointer-events-none">L</span>

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
                    <div className="text-center p-6 text-gray-500 space-y-2 pointer-events-none">
                      <Activity className="h-11 w-11 mx-auto text-orange-500/60 animate-pulse" />
                      <p className="text-sm font-bold text-gray-300">NO SCAN LOADED</p>
                      <p className="text-xs text-gray-400">Upload an axial brain slice on the left</p>
                    </div>
                  )}

                  {/* Left Loupe */}
                  {loupe.active && loupe.target === "left" && (
                    <div
                      className="absolute z-50 pointer-events-none rounded-full border-2 border-orange-400 shadow-[0_0_35px_rgba(249,115,22,1)] bg-black overflow-hidden"
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
                        <div className="w-full h-[1px] bg-orange-400/60" />
                        <div className="h-full w-[1px] bg-orange-400/60 absolute" />
                        <div className="w-4 h-4 rounded-full border border-orange-300 absolute shadow-[0_0_8px_#f97316]" />
                      </div>
                      <div
                        className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold shadow-lg pointer-events-none bg-black/95 border border-orange-400 text-orange-300"
                      >
                        {loupe.scale.toFixed(1)}×
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: AI Model Lesion Segmentation */}
                <div
                  onContextMenu={(e) => handleViewportContextMenu(e, "right")}
                  onMouseDown={handleViewportMouseDown}
                  onMouseMove={(e) => handleViewportMouseMove(e, "right")}
                  onMouseUp={handleViewportMouseUp}
                  onMouseLeave={handleViewportMouseUp}
                  onWheel={(e) => handleViewportWheel(e, "right")}
                  className={`dicom-canvas-bg relative rounded-xl border border-gray-800/80 hover:border-orange-500/40 transition-colors overflow-hidden flex items-center justify-center p-2 shadow-2xl select-none ${
                    loupe.active ? "cursor-crosshair" : isDraggingViewport ? "cursor-grabbing" : "cursor-grab"
                  }`}
                  title="Right-click to toggle Diagnostic Loupe · Scroll Wheel to Magnify"
                >
                  {isScanning && (
                    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                      <div className="absolute w-full h-[3px] bg-gradient-to-r from-transparent via-orange-400 to-transparent shadow-[0_0_24px_#f97316] animate-laser-sweep" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-[2px]">
                        <div className="relative flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full border-2 border-orange-400 border-t-transparent animate-spin shadow-[0_0_14px_#f97316]" />
                          <Activity className="h-6 w-6 text-orange-400 absolute" />
                        </div>
                        <p className="mt-2 text-xs sm:text-sm font-mono font-black text-orange-300 tracking-widest uppercase drop-shadow-[0_0_8px_#f97316]">
                          NEURAL INFERENCE IN PROGRESS...
                        </p>
                      </div>
                    </div>
                  )}

                  {showGrid && <div className="dicom-fine-grid absolute inset-0 z-10" />}

                  <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-orange-400/70 pointer-events-none shadow-[0_0_6px_rgba(249,115,22,0.4)]" />
                  <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-orange-400/70 pointer-events-none shadow-[0_0_6px_rgba(249,115,22,0.4)]" />
                  <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-orange-400/70 pointer-events-none shadow-[0_0_6px_rgba(249,115,22,0.4)]" />
                  <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-orange-400/70 pointer-events-none shadow-[0_0_6px_rgba(249,115,22,0.4)]" />

                  <div className="absolute top-2.5 left-2.5 z-20 px-2.5 py-1 rounded bg-black/85 border border-orange-500/30 text-xs font-mono font-bold text-orange-300 uppercase tracking-wider pointer-events-none shadow-md">
                    AI Overlay · {MODELS.find((m) => m.id === modelId)?.name}
                  </div>
                  <span className="absolute top-2.5 right-3 z-20 text-sm font-mono text-orange-400/80 font-black pointer-events-none">R</span>
                  <span className="absolute bottom-2.5 right-3 z-20 text-sm font-mono text-orange-400/80 font-black pointer-events-none">L</span>

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
                          className="lesion-mask absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-150"
                          style={{ opacity: maskOpacity / 100 }}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="text-center p-6 text-gray-500 space-y-2 pointer-events-none">
                      <Layers className="h-11 w-11 mx-auto text-orange-400/60 animate-pulse" />
                      <p className="text-sm font-bold text-gray-300">LESION OVERLAY</p>
                      <p className="text-xs text-gray-400">Segmented heatmap will appear upon analysis</p>
                    </div>
                  )}

                  {/* Right Loupe */}
                  {loupe.active && loupe.target === "right" && (
                    <div
                      className="absolute z-50 pointer-events-none rounded-full border-2 border-orange-400 shadow-[0_0_35px_rgba(249,115,22,1)] bg-black overflow-hidden"
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
                            className="lesion-mask absolute inset-0 w-full h-full object-contain pointer-events-none"
                            style={{ opacity: maskOpacity / 100 }}
                          />
                        )}
                      </div>
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        <div className="w-full h-[1px] bg-orange-400/60" />
                        <div className="h-full w-[1px] bg-orange-400/60 absolute" />
                        <div className="w-4 h-4 rounded-full border border-orange-300 absolute shadow-[0_0_8px_#f97316]" />
                      </div>
                      <div
                        className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold shadow-lg pointer-events-none bg-black/95 border border-orange-400 text-orange-300"
                      >
                        {loupe.scale.toFixed(1)}×
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3: DICOM Calibration Sliders (Directly Under Viewports) */}
          <div className="shrink-0">
            <div className="flex items-center justify-between pb-1 mb-1.5 shrink-0">
              <span className="text-xs font-mono font-extrabold tracking-wider text-orange-500 uppercase flex items-center gap-1.5">
                <Sun className="h-4 w-4" />
                Step 03 · Calibration
              </span>
            </div>

            {/* 4 Sliders Grid (2x2) */}
            <div className="grid grid-cols-2 gap-2">
              
              {/* 1. Brightness */}
              <div className="p-2 px-2.5 rounded-xl bg-gray-50/70 dark:bg-gray-800/30 flex flex-col justify-between border border-gray-200 dark:border-gray-700/60 hover:border-orange-300 dark:hover:border-orange-500/40 transition-colors shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-gray-200 mb-0.5">
                  <span className="flex items-center gap-1.5 text-slate-700 dark:text-gray-200 font-bold text-xs">
                    <Sun className="h-3.5 w-3.5 text-orange-500" />
                    Brightness
                  </span>
                  <button
                    onClick={() => setBrightness(100)}
                    title="Click to reset to 100%"
                    className="px-2 py-0.5 rounded bg-orange-100/90 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/80 text-orange-700 dark:text-orange-300 font-mono text-[11px] font-bold cursor-pointer hover:bg-orange-200/90 dark:hover:bg-orange-900/80 transition-all active:scale-95"
                  >
                    {brightness}%
                  </button>
                </div>
                <SmoothSlider value={brightness} onChange={setBrightness} min={50} max={150} />
              </div>

              {/* 2. Contrast */}
              <div className="p-2 px-2.5 rounded-xl bg-gray-50/70 dark:bg-gray-800/30 flex flex-col justify-between border border-gray-200 dark:border-gray-700/60 hover:border-orange-300 dark:hover:border-orange-500/40 transition-colors shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-gray-200 mb-0.5">
                  <span className="flex items-center gap-1.5 text-slate-700 dark:text-gray-200 font-bold text-xs">
                    <HalfCircle className="h-3.5 w-3.5 text-orange-500" />
                    Contrast
                  </span>
                  <button
                    onClick={() => setContrast(100)}
                    title="Click to reset to 100%"
                    className="px-2 py-0.5 rounded bg-orange-100/90 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/80 text-orange-700 dark:text-orange-300 font-mono text-[11px] font-bold cursor-pointer hover:bg-orange-200/90 dark:hover:bg-orange-900/80 transition-all active:scale-95"
                  >
                    {contrast}%
                  </button>
                </div>
                <SmoothSlider value={contrast} onChange={setContrast} min={50} max={200} />
              </div>

              {/* 3. Mask Opacity */}
              <div className="p-2 px-2.5 rounded-xl bg-gray-50/70 dark:bg-gray-800/30 flex flex-col justify-between border border-gray-200 dark:border-gray-700/60 hover:border-orange-300 dark:hover:border-orange-500/40 transition-colors shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-gray-200 mb-0.5">
                  <span className="flex items-center gap-1.5 text-slate-700 dark:text-gray-200 font-bold text-xs">
                    <Layers className="h-3.5 w-3.5 text-orange-500" />
                    Mask Opacity
                  </span>
                  <button
                    onClick={() => setMaskOpacity(85)}
                    title="Click to reset to 85%"
                    className="px-2 py-0.5 rounded bg-orange-100/90 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/80 text-orange-700 dark:text-orange-300 font-mono text-[11px] font-bold cursor-pointer hover:bg-orange-200/90 dark:hover:bg-orange-900/80 transition-all active:scale-95"
                  >
                    {maskOpacity}%
                  </button>
                </div>
                <SmoothSlider value={maskOpacity} onChange={setMaskOpacity} min={0} max={100} />
              </div>

              {/* 4. Sensitivity Threshold */}
              <div className="p-2 px-2.5 rounded-xl bg-gray-50/70 dark:bg-gray-800/30 flex flex-col justify-between border border-gray-200 dark:border-gray-700/60 hover:border-orange-300 dark:hover:border-orange-500/40 transition-colors shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-gray-200 mb-0.5">
                  <span className="flex items-center gap-1.5 text-slate-700 dark:text-gray-200 font-bold text-xs">
                    <Gauge className="h-3.5 w-3.5 text-orange-500" />
                    Sensitivity Threshold
                  </span>
                  <button
                    onClick={() => recomputeThreshold(50)}
                    title="Click to reset to 50%"
                    className="px-2 py-0.5 rounded bg-orange-100/90 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/80 text-orange-700 dark:text-orange-300 font-mono text-[11px] font-bold cursor-pointer hover:bg-orange-200/90 dark:hover:bg-orange-900/80 transition-all active:scale-95"
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
        {/* COLUMN 3 (3 Cols): DIAGNOSTIC ASSESSMENT & CLINICAL EXPORT PANEL */}
        {/* ========================================================================= */}
        <section className="col-span-3 flex flex-col gap-2.5 min-h-0 overflow-y-auto">
          
          <div className="flex-1 flex flex-col relative">
            <h3 className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-700 dark:text-gray-300 mb-2 pb-1.5 border-b border-gray-200/70 dark:border-gray-800/70 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-900 dark:text-white font-extrabold">
                <Activity className="h-4 w-4 text-orange-500" />
                Diagnostic Assessment
              </span>
            </h3>

            {/* Outcome Banner */}
            <div className="mb-2.5">
              {result ? (
                result.detected ? (
                  <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border-2 border-red-400 dark:border-red-800 text-red-900 dark:text-red-200 space-y-1.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4.5 w-4.5 text-red-600 dark:text-red-400 shrink-0 animate-pulse" />
                        <span className="font-extrabold text-sm tracking-tight text-red-700 dark:text-red-300">STROKE DETECTED</span>
                      </div>
                      <span className="px-2.5 py-0.5 text-[10px] font-mono font-extrabold rounded bg-red-600 text-white shadow-xs">
                        POSITIVE
                      </span>
                    </div>
                    <p className="text-sm font-bold text-red-800 dark:text-red-200">{result.label}</p>
                    <p className="text-xs text-slate-600 dark:text-gray-300 font-medium leading-relaxed">Acute ischemic infarction identified above threshold.</p>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 space-y-1.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="font-extrabold text-sm tracking-tight text-emerald-700 dark:text-emerald-300">NO ACUTE LESION</span>
                      </div>
                      <span className="px-2.5 py-0.5 text-[10px] font-mono font-extrabold rounded bg-emerald-600 text-white shadow-xs">
                        NEGATIVE
                      </span>
                    </div>
                    <p className="text-sm font-bold text-emerald-800 dark:text-emerald-200">{result.label}</p>
                    <p className="text-xs text-slate-600 dark:text-gray-300 font-medium leading-relaxed">No acute ischemic lesion detected above sensitivity threshold.</p>
                  </div>
                )
              ) : (
                <div className="p-3.5 rounded-xl bg-gray-50/70 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/60 text-center space-y-1.5 shadow-xs">
                  <div className="w-9 h-9 rounded-full bg-orange-100/90 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/80 flex items-center justify-center mx-auto text-orange-600 dark:text-orange-400 shadow-xs">
                    <Activity className="h-4.5 w-4.5 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-gray-200">Neural Engine Standby</p>
                    <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-0.5">Upload a CT scan slice on the left and click &quot;Analyze Brain CT Scan&quot;</p>
                  </div>
                </div>
              )}
            </div>

            {/* Model Confidence Certainty Progress Meter */}
            <div className="space-y-1.5 mb-2.5 p-2.5 rounded-xl bg-gray-50/70 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/60 shadow-xs">
              <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-800 dark:text-gray-200">
                <span>Model Confidence</span>
                <span className="font-mono text-orange-600 dark:text-orange-400 font-black text-sm sm:text-base">
                  {result ? `${(result.confidence * 100).toFixed(1)}%` : "—"}
                </span>
              </div>
              <div className="h-2.5 w-full bg-gray-200 dark:bg-gray-700/60 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700 shadow-inner">
                <div
                  className={`h-full transition-all duration-500 ${
                    result?.detected
                      ? "bg-gradient-to-r from-amber-400 via-rose-500 to-red-600 shadow-sm"
                      : "bg-gradient-to-r from-orange-400 via-amber-400 to-emerald-500 shadow-sm"
                  }`}
                  style={{ width: result ? `${result.confidence * 100}%` : "0%" }}
                />
              </div>
            </div>

            {/* Key Clinical Metrics */}
            <div className="space-y-2 text-xs sm:text-sm bg-gray-50/70 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/60 rounded-xl p-3 text-slate-700 dark:text-gray-200 mb-3 shadow-xs">
              <div className="flex justify-between py-0.5 border-b border-gray-200/70 dark:border-gray-700/50">
                <span className="text-slate-500 dark:text-gray-400 font-medium">Neural Model:</span>
                <span className="font-bold text-slate-900 dark:text-gray-100">{result?.modelLabel ?? MODELS.find((m) => m.id === modelId)?.name}</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-gray-200/70 dark:border-gray-700/50">
                <span className="text-slate-500 dark:text-gray-400 font-medium">Lesion ROI Volume:</span>
                <span className="font-mono text-orange-600 dark:text-orange-400 font-bold">{result ? `${result.lesionArea ?? 0}%` : "—"}</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-500 dark:text-gray-400 font-medium">Sensitivity Cutoff:</span>
                <span className="font-mono text-slate-900 dark:text-gray-100 font-bold">{threshold}%</span>
              </div>
            </div>

            {/* Clinical Action Buttons */}
            <div className="space-y-2 mt-auto pt-2 border-t border-gray-200/70 dark:border-gray-800/70">
              <button
                onClick={copySummaryToClipboard}
                disabled={!result}
                className="btn-vibrant-subtle w-full h-10 disabled:opacity-30 disabled:cursor-not-allowed text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all active:scale-95"
                title="Copy clinical diagnostic summary to clipboard"
              >
                {copiedToast ? <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="h-4 w-4 text-slate-600 dark:text-gray-400" />}
                <span>{copiedToast ? "Diagnostic Summary Copied!" : "Copy Clinical Summary"}</span>
              </button>

              <button
                onClick={exportAnnotatedImage}
                disabled={!imageUrl}
                className="btn-vibrant-subtle w-full h-10 disabled:opacity-30 disabled:cursor-not-allowed text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all active:scale-95"
                title="Export high-resolution annotated image composite with lesion mask overlay"
              >
                {exportedStatus === "image" ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Download className="h-4 w-4 text-orange-500 dark:text-orange-400" />
                )}
                <span>{exportedStatus === "image" ? "Image Exported!" : "Export Composite Image"}</span>
              </button>

              <button
                onClick={exportReportText}
                disabled={!result}
                className="btn-vibrant-emerald w-full h-10 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all active:scale-95"
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

      {/* 3. Luxury Enterprise Hospital Footer */}
      <footer className="h-5 flex items-center justify-between text-xs font-medium text-gray-500 px-2 shrink-0 border-t border-gray-200/50 dark:border-gray-800/50 pt-1">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_6px_#f97316]" />
          NU Stroke Scan Enterprise v1.2 · Naresuan University Neuro-Imaging Research Center
        </span>
        <span>Clinical Decision Support System · End-to-End Encrypted DICOM Protocol</span>
      </footer>
    </div>
  );
}
