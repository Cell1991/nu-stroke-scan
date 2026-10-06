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

function Sparkles({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}

function Split({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M8 19H5c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h3" />
      <path d="M16 5h3c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2h-3" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>
  );
}

function Columns({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M12 3v18" />
    </svg>
  );
}

function Maximize2({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" x2="14" y1="3" y2="10" />
      <line x1="3" x2="10" y1="21" y2="14" />
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

// Live Canvas ECG Waveform Animation
function ECGMonitor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;
    let step = 0;
    const width = canvas.width;
    const height = canvas.height;

    const render = () => {
      ctx.fillStyle = "rgba(248, 250, 252, 0.25)";
      ctx.fillRect(0, 0, width, height);

      ctx.beginPath();
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "#10b981";
      ctx.shadowBlur = 4;

      for (let x = 0; x < width; x++) {
        const offset = (x + step) % width;
        let y = height / 2;

        // Simulate QRS cardiac spike
        const pos = offset % 60;
        if (pos === 20) y -= 3;
        else if (pos === 24) y += 5;
        else if (pos === 27) y -= 12;
        else if (pos === 30) y += 6;
        else if (pos === 35) y -= 2;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      step = (step + 1.2) % width;
      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} width={64} height={20} className="h-5 w-16 rounded bg-slate-100 border border-slate-200" />;
}

export default function HomePage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const probDataRef = useRef<{ width: number; height: number; data: Uint8ClampedArray } | null>(null);
  const dragStartRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const wiperRef = useRef<HTMLDivElement>(null);
  
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingViewport, setIsDraggingViewport] = useState(false);
  const [exportedStatus, setExportedStatus] = useState<string | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);

  // Viewport Modes: 'dual' | 'split' | 'theater'
  const [viewportMode, setViewportMode] = useState<"dual" | "split" | "theater">("dual");
  const [wiperPos, setWiperPos] = useState(50); // 0% to 100%
  const [isDraggingWiper, setIsDraggingWiper] = useState(false);
  const [theaterShowOverlay, setTheaterShowOverlay] = useState(true);

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
    target: "left" | "right" | "theater" | null;
    scale: number;
    isZoomDragging: boolean;
  }>({
    active: false,
    x: 0,
    y: 0,
    normX: 0.5,
    normY: 0.5,
    target: null,
    scale: 3.0,
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
    setLoupe((prev) => ({ ...prev, active: false, target: null, scale: 3.0, isZoomDragging: false }));
  }

  function toggleGrid() {
    setShowGrid((prev) => !prev);
  }

  function applyPreset(preset: "standard" | "stroke" | "bone") {
    if (preset === "standard") {
      setBrightness(100);
      setContrast(100);
    } else if (preset === "stroke") {
      setBrightness(108);
      setContrast(145);
    } else if (preset === "bone") {
      setBrightness(90);
      setContrast(185);
    }
  }

  function handleViewportContextMenu(e: React.MouseEvent<HTMLDivElement>, target: "left" | "right" | "theater") {
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
        scale: 3.0,
        isZoomDragging: false,
      };
    });
  }

  function handleViewportMouseDown(e: React.MouseEvent, target: "left" | "right" | "theater") {
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

  function handleViewportMouseMove(e: React.MouseEvent<HTMLDivElement>, target: "left" | "right" | "theater") {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDraggingWiper && wiperRef.current) {
      const wRect = wiperRef.current.getBoundingClientRect();
      const pct = Math.max(5, Math.min(95, ((e.clientX - wRect.left) / wRect.width) * 100));
      setWiperPos(pct);
      return;
    }

    if (loupe.active && loupe.target === target && loupe.isZoomDragging && loupeDragStartRef.current) {
      const dy = loupeDragStartRef.current.startY - e.clientY;
      const newScale = Math.max(3.0, Math.min(8.0, Number((loupeDragStartRef.current.initialScale + dy * 0.025).toFixed(2))));
      setLoupe((prev) => ({ ...prev, scale: newScale }));
      return;
    }

    if (loupe.active && loupe.target === target && !loupe.isZoomDragging) {
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
    setIsDraggingWiper(false);
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

      const apiEndpoint = process.env.NEXT_PUBLIC_API_URL
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/analysis`
        : "/api/analysis";

      const response = await fetch(apiEndpoint, {
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
    setLoupe({ active: false, x: 0, y: 0, normX: 0.5, normY: 0.5, target: null, scale: 3.0, isZoomDragging: false });
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
    <div className="h-screen w-screen bg-[#f0f4f9] text-slate-900 flex flex-col overflow-hidden font-sans p-2.5 gap-2.5 select-none medical-vibrant-backdrop">
      
      {/* 1. Ultra-Clean Medical Enterprise Navigation Deck */}
      <header className="h-14 glass-panel-vibrant rounded-xl px-4 flex items-center justify-between gap-4 shrink-0 shadow-sm border border-slate-200/90 bg-white/95">
        {/* Hospital Brand & Node Badge */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-1 rounded-full bg-orange-500/20 blur-sm animate-pulse" />
            <img
              src="/brand_icon_trans.png"
              alt="NU Stroke Scan Logo"
              className="h-10 w-10 object-contain drop-shadow-[0_2px_8px_rgba(249,115,22,0.4)] select-none pointer-events-none relative z-10"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
                <span className="text-orange-600 font-black">NU</span> STROKE SCAN
              </span>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-black bg-orange-50 text-orange-700 border border-orange-200 shadow-xs">
                ENTERPRISE CLINICAL v1.2
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
              Neuro-Imaging Clinical Intelligence · Naresuan University
            </p>
          </div>
        </div>

        {/* Live PACS Telemetry & Node HUD with Live Animated ECG */}
        <div className="hidden lg:flex items-center gap-3.5 glass-panel-subtle bg-slate-50/90 px-3.5 py-1.5 rounded-lg text-xs font-mono border border-slate-200/90 shadow-xs">
          <div className="flex items-center gap-2">
            <ECGMonitor />
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            <span className="font-bold text-emerald-700 text-[11px]">PACS SYNC</span>
          </div>
          <div className="w-[1px] h-3.5 bg-slate-300" />
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
            <span>LATENCY:</span>
            <span className="text-orange-600 font-bold">12ms</span>
          </div>
          <div className="w-[1px] h-3.5 bg-slate-300" />
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
            <span>NODE:</span>
            <span className="text-slate-800 font-bold">#04 NEURO-ICU</span>
          </div>
        </div>

        {/* Model Architecture Selector Dock */}
        <div className="flex items-center glass-panel-subtle bg-slate-100/90 p-1 rounded-lg border border-slate-200 shadow-inner relative gap-1">
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
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30 border border-orange-400"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                }`}
              >
                <span>{m.name}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* 2. Main Workspace Layout */}
      <main className="flex-1 min-h-0 grid grid-cols-12 gap-2.5 overflow-hidden">
        
        {/* Left/Center Viewport Column (8 Cols) */}
        <section className="col-span-8 flex flex-col gap-2 min-h-0">
          <div className="flex-1 min-h-0 glass-panel-vibrant rounded-xl p-3 flex flex-col shadow-sm relative border border-slate-200/90 bg-white/95">
            
            {/* Viewport Top Bar with Multi-Mode Tabs & Medical Tools */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 shrink-0">
              
              {/* Mode Switcher Dock */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 shadow-inner">
                <button
                  onClick={() => setViewportMode("dual")}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 ${
                    viewportMode === "dual"
                      ? "bg-white text-orange-600 shadow-xs border border-slate-200 font-extrabold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  title="Dual Synchronized Viewports (Side-by-side 512×512)"
                >
                  <Columns className="h-3.5 w-3.5 text-orange-500" />
                  <span>Dual View</span>
                </button>

                <button
                  onClick={() => setViewportMode("split")}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 ${
                    viewportMode === "split"
                      ? "bg-white text-orange-600 shadow-xs border border-slate-200 font-extrabold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  title="Split Comparison Wiper (Swipe curtain to compare AI mask)"
                >
                  <Split className="h-3.5 w-3.5 text-orange-500" />
                  <span>Curtain Wiper</span>
                </button>

                <button
                  onClick={() => setViewportMode("theater")}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 ${
                    viewportMode === "theater"
                      ? "bg-white text-orange-600 shadow-xs border border-slate-200 font-extrabold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  title="Single Cinema Focus Theater"
                >
                  <Maximize2 className="h-3.5 w-3.5 text-orange-500" />
                  <span>Cinema Focus</span>
                </button>
              </div>

              {/* Viewport Interactive Tools */}
              <div className="flex items-center gap-1.5">
                
                {/* Clinical Window Presets */}
                <div className="hidden xl:flex items-center gap-1 bg-slate-100 p-0.5 rounded-md border border-slate-200 text-[11px] font-bold text-slate-600">
                  <button onClick={() => applyPreset("standard")} className="px-2 py-0.5 hover:bg-white hover:text-orange-600 rounded cursor-pointer transition-all">Brain</button>
                  <button onClick={() => applyPreset("stroke")} className="px-2 py-0.5 hover:bg-white hover:text-orange-600 rounded cursor-pointer transition-all">Stroke</button>
                  <button onClick={() => applyPreset("bone")} className="px-2 py-0.5 hover:bg-white hover:text-orange-600 rounded cursor-pointer transition-all">Bone</button>
                </div>

                {/* Zoom Controls Rect */}
                <div className="flex items-center bg-slate-50 px-1 py-0.5 rounded-md border border-slate-200 shadow-xs">
                  <button
                    onClick={handleZoomOut}
                    disabled={zoom <= 0.5}
                    title="Zoom Out (-25%)"
                    className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all active:scale-90"
                  >
                    <ZoomOut className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={handleResetZoom}
                    title="Click to Reset Zoom to 100%"
                    className="px-2 py-0.5 rounded text-[11px] font-mono font-black text-orange-600 hover:text-orange-700 hover:bg-orange-50 cursor-pointer transition-all active:scale-95"
                  >
                    {Math.round(zoom * 100)}%
                  </button>

                  <button
                    onClick={handleZoomIn}
                    disabled={zoom >= 4}
                    title="Zoom In (+25%)"
                    className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all active:scale-90"
                  >
                    <ZoomIn className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Gridlines Toggle Button */}
                <button
                  onClick={toggleGrid}
                  title={showGrid ? "Disable Fine Medical Gridlines" : "Enable Fine Medical Measurement Gridlines"}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-xs ${
                    showGrid
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white border border-orange-400 shadow-sm"
                      : "btn-vibrant-subtle"
                  }`}
                >
                  <Grid className={`h-3.5 w-3.5 ${showGrid ? "text-white" : "text-slate-600"}`} />
                  Grid {showGrid ? "ON" : "OFF"}
                </button>

                {/* Reset Controls Button */}
                <button
                  onClick={resetControls}
                  className="btn-vibrant-subtle px-2.5 py-1 text-xs font-bold hover:text-orange-600 hover:border-orange-400 flex items-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-95"
                  title="Reset all adjustments to defaults"
                >
                  <RotateCcw className="h-3.5 w-3.5 text-orange-600" />
                  Reset
                </button>
              </div>
            </div>

            {/* Viewport Center Canvas: Dynamic Switcher between Dual, Curtain Split, and Cinema Focus */}
            <div className="flex-1 min-h-0 relative flex overflow-hidden">
              
              {/* MODE 1: DUAL VIEW (Synchronized 2-Up) */}
              {viewportMode === "dual" && (
                <div className="h-full w-full grid grid-cols-2 gap-2.5 relative">
                  
                  {/* Left: Original CT */}
                  <div
                    onContextMenu={(e) => handleViewportContextMenu(e, "left")}
                    onMouseDown={(e) => handleViewportMouseDown(e, "left")}
                    onMouseMove={(e) => handleViewportMouseMove(e, "left")}
                    onMouseUp={handleViewportMouseUp}
                    onMouseLeave={handleViewportMouseUp}
                    onWheel={handleViewportWheel}
                    className={`dicom-canvas-bg relative rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-colors overflow-hidden flex items-center justify-center p-2 shadow-2xl select-none ${
                      loupe.active ? "cursor-crosshair" : isDraggingViewport ? "cursor-grabbing" : "cursor-grab"
                    }`}
                    title="Right-click to open Diagnostic Loupe · Hold Left-click & Drag Up/Down to Zoom Loupe"
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

                    <div className="absolute top-2.5 left-2.5 z-20 px-2 py-0.5 rounded bg-black/85 border border-orange-500/30 text-[10px] font-mono font-bold text-slate-200 uppercase tracking-wider pointer-events-none shadow-md">
                      Original NCCT
                    </div>
                    <span className="absolute top-2.5 right-3 z-20 text-xs font-mono text-orange-400/70 font-bold pointer-events-none">R</span>
                    <span className="absolute bottom-2.5 right-3 z-20 text-xs font-mono text-orange-400/70 font-bold pointer-events-none">L</span>

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
                      <div className="text-center p-6 text-slate-500 space-y-2 pointer-events-none">
                        <Activity className="h-10 w-10 mx-auto text-orange-500/60 animate-pulse" />
                        <p className="text-xs font-bold text-slate-300">NO SCAN LOADED</p>
                        <p className="text-[11px] text-slate-400">Upload an axial brain slice or pick a sample</p>
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
                          className={`absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-black shadow-lg pointer-events-none ${
                            loupe.isZoomDragging
                              ? "bg-amber-400 text-black border border-amber-200 animate-pulse"
                              : "bg-black/95 border border-orange-400 text-orange-300"
                          }`}
                        >
                          {loupe.scale.toFixed(1)}× {loupe.isZoomDragging ? "· LOCKED" : ""}
                        </div>
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
                    className={`dicom-canvas-bg relative rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-colors overflow-hidden flex items-center justify-center p-2 shadow-2xl select-none ${
                      loupe.active ? "cursor-crosshair" : isDraggingViewport ? "cursor-grabbing" : "cursor-grab"
                    }`}
                    title="Right-click to open Diagnostic Loupe · Hold Left-click & Drag Up/Down to Zoom Loupe"
                  >
                    {isScanning && (
                      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                        <div className="absolute w-full h-[3px] bg-gradient-to-r from-transparent via-orange-400 to-transparent shadow-[0_0_24px_#f97316] animate-laser-sweep" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-[2px]">
                          <div className="relative flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full border-2 border-orange-400 border-t-transparent animate-spin shadow-[0_0_14px_#f97316]" />
                            <Activity className="h-6 w-6 text-orange-400 absolute" />
                          </div>
                          <p className="mt-2 text-xs font-mono font-black text-orange-300 tracking-widest uppercase drop-shadow-[0_0_8px_#f97316]">
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

                    <div className="absolute top-2.5 left-2.5 z-20 px-2 py-0.5 rounded bg-black/85 border border-orange-500/30 text-[10px] font-mono font-bold text-orange-300 uppercase tracking-wider pointer-events-none shadow-md">
                      AI Overlay · {MODELS.find((m) => m.id === modelId)?.name}
                    </div>
                    <span className="absolute top-2.5 right-3 z-20 text-xs font-mono text-orange-400/70 font-bold pointer-events-none">R</span>
                    <span className="absolute bottom-2.5 right-3 z-20 text-xs font-mono text-orange-400/70 font-bold pointer-events-none">L</span>

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
                      <div className="text-center p-6 text-slate-500 space-y-2 pointer-events-none">
                        <Layers className="h-10 w-10 mx-auto text-orange-400/60 animate-pulse" />
                        <p className="text-xs font-bold text-slate-300">LESION OVERLAY</p>
                        <p className="text-[11px] text-slate-400">Segmented heatmap will appear upon analysis</p>
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
                          className={`absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-black shadow-lg pointer-events-none ${
                            loupe.isZoomDragging
                              ? "bg-amber-400 text-black border border-amber-200 animate-pulse"
                              : "bg-black/95 border border-orange-400 text-orange-300"
                          }`}
                        >
                          {loupe.scale.toFixed(1)}× {loupe.isZoomDragging ? "· LOCKED" : ""}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* MODE 2: SPLIT WIPER CURTAIN (Swipe comparison) */}
              {viewportMode === "split" && (
                <div
                  ref={wiperRef}
                  onMouseDown={(e) => {
                    if (e.button === 0) setIsDraggingWiper(true);
                  }}
                  onMouseMove={(e) => handleViewportMouseMove(e, "theater")}
                  onMouseUp={handleViewportMouseUp}
                  className="h-full w-full dicom-canvas-bg rounded-xl border border-orange-500/25 overflow-hidden relative select-none cursor-ew-resize p-2"
                >
                  {showGrid && <div className="dicom-fine-grid absolute inset-0 z-10" />}

                  {/* Left Side: Original Image Container */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt="Original Base"
                        className="w-full h-full object-contain pointer-events-none transition-[filter]"
                        style={{ filter: `brightness(${brightness}%) contrast(${contrast}%)` }}
                      />
                    )}
                  </div>

                  {/* Right Side: AI Overlay with Clip-path curtain */}
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ clipPath: `inset(0 0 0 ${wiperPos}%)` }}
                  >
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt="AI Base"
                        className="w-full h-full object-contain pointer-events-none"
                        style={{ filter: `brightness(${brightness}%) contrast(${contrast}%)` }}
                      />
                    )}
                    {result?.maskUrl && (
                      <img
                        src={result.maskUrl}
                        alt="Mask Overlay"
                        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                        style={{ opacity: maskOpacity / 100 }}
                      />
                    )}
                  </div>

                  {/* Draggable Glowing Divider Bar */}
                  <div
                    className="absolute top-0 bottom-0 z-30 pointer-events-none flex items-center justify-center"
                    style={{ left: `${wiperPos}%`, transform: "translateX(-50%)" }}
                  >
                    <div className="w-[2px] h-full bg-orange-500 shadow-[0_0_12px_#f97316]" />
                    <div className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white border-2 border-white flex items-center justify-center shadow-lg wiper-divider-handle cursor-ew-resize pointer-events-auto">
                      <Split className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 z-20 px-2 py-0.5 rounded bg-black/85 border border-slate-700 text-[10px] font-mono font-bold text-slate-200">
                    ORIGINAL NCCT ({Math.round(wiperPos)}%)
                  </div>
                  <div className="absolute top-3 right-3 z-20 px-2 py-0.5 rounded bg-black/85 border border-orange-500/40 text-[10px] font-mono font-bold text-orange-300">
                    AI OVERLAY ({Math.round(100 - wiperPos)}%)
                  </div>
                </div>
              )}

              {/* MODE 3: THEATER FOCUS */}
              {viewportMode === "theater" && (
                <div
                  onContextMenu={(e) => handleViewportContextMenu(e, "theater")}
                  onMouseDown={(e) => handleViewportMouseDown(e, "theater")}
                  onMouseMove={(e) => handleViewportMouseMove(e, "theater")}
                  onMouseUp={handleViewportMouseUp}
                  onMouseLeave={handleViewportMouseUp}
                  onWheel={handleViewportWheel}
                  className={`h-full w-full dicom-canvas-bg rounded-xl border border-orange-500/25 overflow-hidden relative flex items-center justify-center p-2 select-none ${
                    loupe.active ? "cursor-crosshair" : isDraggingViewport ? "cursor-grabbing" : "cursor-grab"
                  }`}
                >
                  {showGrid && <div className="dicom-fine-grid absolute inset-0 z-10" />}

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
                        alt="Theater Scan"
                        className="w-full h-full object-contain pointer-events-none transition-[filter]"
                        style={{ filter: `brightness(${brightness}%) contrast(${contrast}%)` }}
                      />
                      {result?.maskUrl && theaterShowOverlay && (
                        <img
                          src={result.maskUrl}
                          alt="Theater Mask"
                          className="lesion-mask absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-150"
                          style={{ opacity: maskOpacity / 100 }}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="text-center p-6 text-slate-500 space-y-2 pointer-events-none">
                      <Maximize2 className="h-12 w-12 mx-auto text-orange-500/60 animate-pulse" />
                      <p className="text-xs font-bold text-slate-300">THEATER VIEWPORT READY</p>
                      <p className="text-[11px] text-slate-400">Load CT scan for high-resolution single-pane analysis</p>
                    </div>
                  )}

                  {/* Toggle Overlay Button in Theater */}
                  {result && (
                    <button
                      onClick={() => setTheaterShowOverlay((prev) => !prev)}
                      className={`absolute bottom-3 right-3 z-30 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all shadow-md active:scale-95 ${
                        theaterShowOverlay
                          ? "bg-orange-500 text-white border border-orange-300 shadow-orange-500/40"
                          : "bg-black/90 text-slate-300 border border-slate-700"
                      }`}
                    >
                      AI Lesion Mask: {theaterShowOverlay ? "VISIBLE" : "HIDDEN"}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Essential Controls Footer: Smooth Luxury Sliders with Click-to-Reset Badges */}
            <div className="mt-2.5 pt-2 border-t border-slate-200 grid grid-cols-4 gap-2 shrink-0">
              
              {/* 1. Brightness */}
              <div className="p-2 rounded-xl glass-panel-subtle bg-slate-50/90 flex flex-col justify-between border border-slate-200 hover:border-orange-300 transition-colors shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-0.5">
                  <span className="flex items-center gap-1.5 text-slate-700 font-bold">
                    <Sun className="h-3.5 w-3.5 text-orange-500" />
                    Brightness
                  </span>
                  <button
                    onClick={() => setBrightness(100)}
                    title="Click to reset to 100%"
                    className="px-1.5 py-0.5 rounded bg-orange-100/90 border border-orange-200 text-orange-700 font-mono text-[10px] font-bold cursor-pointer hover:bg-orange-200/90 transition-all active:scale-95"
                  >
                    {brightness}%
                  </button>
                </div>
                <SmoothSlider value={brightness} onChange={setBrightness} min={50} max={150} />
              </div>

              {/* 2. Contrast */}
              <div className="p-2 rounded-xl glass-panel-subtle bg-slate-50/90 flex flex-col justify-between border border-slate-200 hover:border-orange-300 transition-colors shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-0.5">
                  <span className="flex items-center gap-1.5 text-slate-700 font-bold">
                    <HalfCircle className="h-3.5 w-3.5 text-orange-500" />
                    Contrast
                  </span>
                  <button
                    onClick={() => setContrast(100)}
                    title="Click to reset to 100%"
                    className="px-1.5 py-0.5 rounded bg-orange-100/90 border border-orange-200 text-orange-700 font-mono text-[10px] font-bold cursor-pointer hover:bg-orange-200/90 transition-all active:scale-95"
                  >
                    {contrast}%
                  </button>
                </div>
                <SmoothSlider value={contrast} onChange={setContrast} min={50} max={200} />
              </div>

              {/* 3. Mask Opacity */}
              <div className="p-2 rounded-xl glass-panel-subtle bg-slate-50/90 flex flex-col justify-between border border-slate-200 hover:border-orange-300 transition-colors shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-0.5">
                  <span className="flex items-center gap-1.5 text-slate-700 font-bold">
                    <Layers className="h-3.5 w-3.5 text-orange-500" />
                    Mask Opacity
                  </span>
                  <button
                    onClick={() => setMaskOpacity(85)}
                    title="Click to reset to 85%"
                    className="px-1.5 py-0.5 rounded bg-orange-100/90 border border-orange-200 text-orange-700 font-mono text-[10px] font-bold cursor-pointer hover:bg-orange-200/90 transition-all active:scale-95"
                  >
                    {maskOpacity}%
                  </button>
                </div>
                <SmoothSlider value={maskOpacity} onChange={setMaskOpacity} min={0} max={100} />
              </div>

              {/* 4. Sensitivity Threshold */}
              <div className="p-2 rounded-xl glass-panel-subtle bg-slate-50/90 flex flex-col justify-between border border-slate-200 hover:border-orange-300 transition-colors shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-0.5">
                  <span className="flex items-center gap-1.5 text-slate-700 font-bold">
                    <Gauge className="h-3.5 w-3.5 text-orange-500" />
                    Threshold
                  </span>
                  <button
                    onClick={() => recomputeThreshold(50)}
                    title="Click to reset to 50%"
                    className="px-1.5 py-0.5 rounded bg-orange-100/90 border border-orange-200 text-orange-700 font-mono text-[10px] font-bold cursor-pointer hover:bg-orange-200/90 transition-all active:scale-95"
                  >
                    {threshold}%
                  </button>
                </div>
                <SmoothSlider value={threshold} onChange={recomputeThreshold} min={10} max={95} />
              </div>
            </div>
          </div>
        </section>

        {/* Right Sidebar: Upload, Diagnosis & Export (4 Cols) */}
        <section className="col-span-4 flex flex-col gap-2.5 min-h-0">
          
          {/* Upload & Primary Action Card */}
          <div className="glass-panel-vibrant rounded-xl p-3 flex flex-col shrink-0 shadow-sm relative overflow-hidden border border-slate-200/90 bg-white/95">
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
              onDrop={handleDrop}
              className={`h-20 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 relative overflow-hidden ${
                isDragging
                  ? "border-orange-500 bg-orange-50/90 scale-[1.01] shadow-md shadow-orange-500/20"
                  : "border-slate-300 hover:border-orange-400 bg-slate-50/90 hover:bg-slate-100/90 active:scale-[0.99]"
              }`}
            >
              {imageUrl ? (
                <div className="flex items-center gap-3 px-3 w-full">
                  <img src={imageUrl} alt="Thumbnail" className="h-12 w-12 object-contain rounded-lg border border-slate-200 bg-black shadow-md" />
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{file?.name ?? "Loaded NCCT Slice"}</p>
                    <p className="text-[10px] font-medium text-orange-600 mt-0.5">Click or drag to replace scan</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-0.5">
                  <UploadCloud className="h-5 w-5 mx-auto text-orange-500 animate-bounce" />
                  <p className="text-xs font-bold text-slate-800">Drop CT Scan or Click to Browse</p>
                  <p className="text-[10px] text-slate-500 font-medium">DICOM PNG, JPG, WEBP (Max 25 MB)</p>
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
              <div className="mt-2 p-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 shadow-xs">
                <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
                <span className="truncate">{error}</span>
              </div>
            )}

            {/* Primary Action Button - Luminous Gradient Enterprise CTA */}
            <button
              onClick={runInference}
              disabled={isScanning || !imageUrl}
              className={`relative overflow-hidden mt-2.5 h-11 w-full rounded-xl font-black text-xs uppercase tracking-wider text-white transition-all duration-200 flex items-center justify-center cursor-pointer select-none active:scale-[0.98] ${
                isScanning || !imageUrl
                  ? "bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed shadow-none"
                  : "btn-vibrant-primary shadow-lg shadow-orange-500/25"
              }`}
            >
              {isScanning ? (
                <div className="flex items-center justify-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin text-white" />
                  <span>ANALYZING AXIAL BRAIN CT...</span>
                </div>
              ) : (
                <span className="text-center drop-shadow flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-200 fill-amber-300" />
                  ANALYZE BRAIN CT SCAN
                </span>
              )}
            </button>
          </div>

          {/* Diagnostic Intelligence Summary Card */}
          <div className="glass-panel-vibrant rounded-xl p-3 flex-1 flex flex-col min-h-0 shadow-sm relative border border-slate-200/90 bg-white/95">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 pb-1.5 border-b border-slate-200 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-900 font-extrabold">
                <ShieldCheck className="h-4 w-4 text-orange-500" />
                Diagnostic Assessment
              </span>
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            </h3>

            {/* Outcome Banner */}
            <div className="mb-2">
              {result ? (
                result.detected ? (
                  <div className="p-2.5 rounded-xl bg-red-50 border-2 border-red-400 text-red-900 space-y-0.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 animate-pulse" />
                        <span className="font-extrabold text-xs tracking-tight text-red-700">STROKE LESION DETECTED</span>
                      </div>
                      <span className="px-2 py-0.5 text-[9px] font-mono font-extrabold rounded bg-red-600 text-white shadow-xs">
                        POSITIVE
                      </span>
                    </div>
                    <p className="text-xs font-bold text-red-800">{result.label}</p>
                    <p className="text-[10px] text-slate-600 font-medium">Acute ischemic infarction identified above threshold.</p>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border-2 border-emerald-400 text-emerald-900 space-y-0.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span className="font-extrabold text-xs tracking-tight text-emerald-700">NO ACUTE LESION DETECTED</span>
                      </div>
                      <span className="px-2 py-0.5 text-[9px] font-mono font-extrabold rounded bg-emerald-600 text-white shadow-xs">
                        NEGATIVE
                      </span>
                    </div>
                    <p className="text-xs font-bold text-emerald-800">{result.label}</p>
                    <p className="text-[10px] text-slate-600 font-medium">No acute ischemic lesion detected above sensitivity threshold.</p>
                  </div>
                )
              ) : (
                <div className="p-2.5 rounded-xl glass-panel-subtle bg-slate-50 border border-slate-200 text-center space-y-0.5 shadow-xs">
                  <div className="flex items-center justify-center gap-1 text-orange-600 text-xs font-bold">
                    <Activity className="h-4 w-4" />
                    <span>Neural Engine Ready</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Load CT scan slice and click &quot;Analyze Brain CT Scan&quot;</p>
                </div>
              )}
            </div>

            {/* Confidence Certainty Meter */}
            <div className="space-y-1 mb-2">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>Model Confidence Certainty</span>
                <span className="font-mono text-orange-600 font-black text-xs">
                  {result ? `${(result.confidence * 100).toFixed(1)}%` : "—"}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden border border-slate-300 shadow-inner">
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

            {/* Key Metrics Table */}
            <div className="space-y-1 text-xs border-t border-slate-200 pt-2 text-slate-700">
              <div className="flex justify-between py-0.5 border-b border-slate-100">
                <span className="text-slate-500">Neural Architecture:</span>
                <span className="font-bold text-slate-900">{result?.modelLabel ?? MODELS.find((m) => m.id === modelId)?.name}</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-100">
                <span className="text-slate-500">Lesion ROI Volume:</span>
                <span className="font-mono text-orange-600 font-bold">{result ? `${result.lesionArea ?? 0}%` : "—"}</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-500">Sensitivity Threshold:</span>
                <span className="font-mono text-slate-900 font-bold">{threshold}%</span>
              </div>
            </div>

            {/* Clinical Export & Copy Actions */}
            <div className="grid grid-cols-3 gap-1.5 mt-auto pt-2 border-t border-slate-200">
              <button
                onClick={copySummaryToClipboard}
                disabled={!result}
                className="btn-vibrant-subtle h-8 disabled:opacity-30 disabled:cursor-not-allowed text-[11px] font-bold rounded-lg flex items-center justify-center gap-1 cursor-pointer shadow-xs transition-all active:scale-95"
                title="Copy clinical diagnostic summary to clipboard"
              >
                {copiedToast ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3 text-slate-600" />}
                {copiedToast ? "Copied!" : "Summary"}
              </button>

              <button
                onClick={exportAnnotatedImage}
                disabled={!imageUrl}
                className="btn-vibrant-subtle h-8 disabled:opacity-30 disabled:cursor-not-allowed text-[11px] font-bold rounded-lg flex items-center justify-center gap-1 cursor-pointer shadow-xs transition-all active:scale-95"
                title="Export high-resolution annotated image composite with lesion mask overlay"
              >
                {exportedStatus === "image" ? (
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                ) : (
                  <Download className="h-3 w-3 text-orange-500" />
                )}
                {exportedStatus === "image" ? "Exported!" : "Image"}
              </button>

              <button
                onClick={exportReportText}
                disabled={!result}
                className="btn-vibrant-emerald h-8 disabled:opacity-30 disabled:cursor-not-allowed text-white text-[11px] font-bold rounded-lg flex items-center justify-center gap-1 cursor-pointer shadow-xs transition-all active:scale-95"
                title="Download formal clinical diagnostic summary text report"
              >
                {exportedStatus === "report" ? (
                  <CheckCircle2 className="h-3 w-3 text-white" />
                ) : (
                  <FileText className="h-3 w-3" />
                )}
                {exportedStatus === "report" ? "Saved!" : "Report"}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 3. Luxury Enterprise Hospital Footer */}
      <footer className="h-5 flex items-center justify-between text-[11px] font-medium text-slate-500 px-2 shrink-0">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_6px_#f97316]" />
          NU Stroke Scan Enterprise v1.2 · Naresuan University Neuro-Imaging Research Center
        </span>
        <span>Clinical Decision Support System · End-to-End Encrypted DICOM Protocol</span>
      </footer>
    </div>
  );
}
