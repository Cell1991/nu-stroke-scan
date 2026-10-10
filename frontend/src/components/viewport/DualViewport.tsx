import React from "react";
import { Brain, Columns2, ShieldAlert } from "lucide-react";
import { PanOffset, PredictionResult } from "@/types";
import { ScanningPipelineHUD } from "./ScanningPipelineHUD";

interface LoupeState {
  active: boolean;
  x: number;
  y: number;
  normX: number;
  normY: number;
  target: "left" | "right" | null;
  scale: number;
}

interface DualViewportProps {
  imageUrl: string | null;
  result: PredictionResult | null;
  modelName: string;
  isScanning: boolean;
  errorMessage?: string | null;
  zoom: number;
  pan: PanOffset;
  showGrid: boolean;
  brightness: number;
  contrast: number;
  maskOpacity: number;
  loupe: LoupeState;
  isDraggingViewport: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>, targetSide: "left" | "right") => void;
  onMouseUp: () => void;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement>, targetSide: "left" | "right") => void;
  onWheel: (e: React.WheelEvent<HTMLDivElement>, targetSide: "left" | "right") => void;
  onAnalyze?: () => void;
  onClear?: () => void;
}

export function DualViewport({
  imageUrl,
  result,
  modelName,
  isScanning,
  errorMessage,
  zoom,
  pan,
  showGrid,
  brightness,
  contrast,
  maskOpacity,
  loupe,
  isDraggingViewport,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onContextMenu,
  onWheel,
  onAnalyze,
  onClear,
}: DualViewportProps) {
  const predictedClass = result?.classification?.predicted_class;
  const isIschemic = predictedClass === "ischemic";
  const isHemo = predictedClass === "hemorrhagic";
  const hasAnalyzed = Boolean(result || isScanning);

  // Draw.io Style Infinite Synchronized Grid: Scales dynamically with zoom & translates with pan
  const minorGridSize = Math.max(8, 20 * zoom);
  const majorGridSize = Math.max(40, 100 * zoom);
  const gridPosition = `calc(50% + ${pan.x}px) calc(50% + ${pan.y}px)`;
  const gridBackgroundSize = `${minorGridSize}px ${minorGridSize}px, ${minorGridSize}px ${minorGridSize}px, ${majorGridSize}px ${majorGridSize}px, ${majorGridSize}px ${majorGridSize}px`;
  const gridBackgroundPosition = `${gridPosition}, ${gridPosition}, ${gridPosition}, ${gridPosition}`;

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 relative overflow-hidden bg-[#080a0f] p-3.5 pb-2.5">
      {/* Viewport Top Header */}
      <div className="h-8 flex items-center justify-between pb-2 border-b border-white/10 shrink-0 select-none">
        <span className="text-xs font-bold tracking-wider text-slate-200 uppercase flex items-center gap-2">
          <Columns2 className="h-4 w-4 text-blue-400" />
          Dual Viewport
        </span>
      </div>

      {/* Dual Viewport Canvas Container */}
      <div className="flex-1 min-h-0 relative flex overflow-hidden">
        <div className="h-full w-full grid grid-cols-2 gap-2 relative">
          {/* ========================================================= */}
          {/* LEFT DISPLAY: ORIGINAL NCCT                              */}
          {/* ========================================================= */}
          <div
            onContextMenu={(e) => onContextMenu(e, "left")}
            onMouseDown={onMouseDown}
            onMouseMove={(e) => onMouseMove(e, "left")}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onWheel={(e) => onWheel(e, "left")}
            className={`dicom-canvas-bg relative rounded-xl border border-slate-800/80 hover:border-slate-700/80 transition-all overflow-hidden flex items-center justify-center p-2 select-none ${
              loupe.active ? "cursor-crosshair" : isDraggingViewport ? "cursor-grabbing" : "cursor-grab"
            }`}
            title="Right-click to toggle Loupe · Scroll Wheel to Zoom"
          >
            {isScanning && (
              <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                <div className="absolute w-full h-[1.5px] bg-blue-500/80 animate-laser-sweep" />
              </div>
            )}

            {showGrid && (
              <div
                className="dicom-fine-grid absolute inset-0 z-10 pointer-events-none"
                style={{
                  backgroundSize: gridBackgroundSize,
                  backgroundPosition: gridBackgroundPosition,
                }}
              />
            )}

            {/* Clean Header Badge */}
            <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none px-2 py-0.5 rounded bg-black/80 border border-white/10 text-[11px] font-mono font-bold text-slate-200 uppercase">
              ORIGINAL NCCT
            </div>

            {/* Anatomical Orientation Markers (R on Left, L on Right) */}
            {imageUrl && (
              <>
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-[11px] font-mono font-bold text-slate-400">
                  R
                </span>
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-[11px] font-mono font-bold text-slate-400">
                  L
                </span>
              </>
            )}

            {/* Image Render */}
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
              <div className="text-center p-6 text-slate-400 pointer-events-none">
                <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">NO SCAN LOADED</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Upload a brain CT slice</p>
              </div>
            )}

            {/* Left Loupe Magnifier */}
            {loupe.active && loupe.target === "left" && (
              <div
                className="absolute z-50 pointer-events-none rounded-full border border-cyan-400 bg-black overflow-hidden shadow-2xl"
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
                  {showGrid && (
                    <div
                      className="dicom-fine-grid absolute inset-0 z-10 pointer-events-none"
                      style={{
                        backgroundSize: gridBackgroundSize,
                        backgroundPosition: gridBackgroundPosition,
                      }}
                    />
                  )}
                </div>
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-full h-[1px] bg-cyan-400/30" />
                  <div className="h-full w-[1px] bg-cyan-400/30 absolute" />
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/90 border border-slate-700 text-cyan-300">
                  {loupe.scale.toFixed(1)}×
                </div>
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* RIGHT DISPLAY: AI OVERLAY                                */}
          {/* ========================================================= */}
          <div
            onContextMenu={(e) => onContextMenu(e, "right")}
            onMouseDown={onMouseDown}
            onMouseMove={(e) => onMouseMove(e, "right")}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onWheel={(e) => onWheel(e, "right")}
            className={`dicom-canvas-bg relative rounded-xl border border-slate-800/80 hover:border-slate-700/80 transition-all overflow-hidden flex items-center justify-center p-2 select-none ${
              loupe.active ? "cursor-crosshair" : isDraggingViewport ? "cursor-grabbing" : "cursor-grab"
            }`}
            title="Right-click to toggle Loupe · Scroll Wheel to Zoom"
          >
            {isScanning && <ScanningPipelineHUD />}

            {showGrid && !errorMessage && hasAnalyzed && (
              <div
                className="dicom-fine-grid absolute inset-0 z-10 pointer-events-none"
                style={{
                  backgroundSize: gridBackgroundSize,
                  backgroundPosition: gridBackgroundPosition,
                }}
              />
            )}

            {/* Clean Floating Header */}
            {errorMessage ? (
              <div className="absolute top-2.5 left-2.5 z-30 flex items-center gap-1.5 pointer-events-none">
                <div className="px-2 py-0.5 rounded bg-rose-950/90 border border-rose-500/50 text-[11px] font-mono font-bold text-rose-300 uppercase flex items-center gap-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                  INVALID SCAN
                </div>
              </div>
            ) : hasAnalyzed ? (
              <div className="absolute top-2.5 left-2.5 z-30 flex items-center gap-1.5 pointer-events-none">
                <div className="px-2 py-0.5 rounded bg-black/80 border border-white/10 text-[11px] font-mono font-bold text-slate-200 uppercase">
                  AI OVERLAY - {modelName.toUpperCase()}
                </div>

                {result?.detected && (
                  <div
                    className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wide border flex items-center ${
                      isIschemic
                        ? "bg-amber-950/80 border-amber-500/50 text-amber-300"
                        : "bg-rose-950/80 border-rose-500/50 text-rose-300"
                    }`}
                  >
                    <span>
                      {isIschemic ? "ISCHEMIC" : isHemo ? "HEMORRHAGIC" : "LESION"}
                    </span>
                  </div>
                )}
              </div>
            ) : null}

            {/* Anatomical Orientation Markers (R on Left, L on Right) */}
            {hasAnalyzed && !errorMessage && (
              <>
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-[11px] font-mono font-bold text-slate-400">
                  R
                </span>
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-[11px] font-mono font-bold text-slate-400">
                  L
                </span>
              </>
            )}

            {/* Image and Lesion Mask Render */}
            {errorMessage ? (() => {
              const lowerErr = errorMessage.toLowerCase();
              const isConnectionError =
                lowerErr.includes("unreachable") ||
                lowerErr.includes("connection refused") ||
                lowerErr.includes("failed to fetch") ||
                lowerErr.includes("503") ||
                lowerErr.includes("backend is running");

              return (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onClear) onClear();
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      if (onClear) onClear();
                    }
                  }}
                  className="group relative z-20 h-full w-full flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden bg-slate-950/80 hover:bg-rose-950/30 backdrop-blur-sm rounded-xl border border-rose-500/25 hover:border-rose-500/60 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-rose-950/50"
                  title="Click to clear and upload a new scan"
                >
                  {/* Ambient glow background */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.12),transparent_70%)] group-hover:bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.25),transparent_70%)] transition-all duration-300 pointer-events-none" />

                  {/* Animated Graphic Element */}
                  <div className="relative flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                    {/* Outer pulse wave */}
                    <div className="absolute h-20 w-20 rounded-full bg-rose-500/15 group-hover:bg-rose-500/25 animate-ping pointer-events-none transition-colors" />
                    
                    {/* Concentric radar rings */}
                    <div className="absolute h-18 w-18 rounded-full border border-rose-500/30 group-hover:border-rose-400/50 bg-rose-500/5 group-hover:bg-rose-500/10 animate-pulse transition-all" />
                    <div className="absolute h-14 w-14 rounded-full border border-rose-500/50 group-hover:border-rose-400/70 transition-colors" />

                    {/* Core Icon Badge */}
                    <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-rose-900/90 via-slate-900 to-rose-950 border border-rose-500/70 group-hover:border-rose-400 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.5)] shadow-xl shadow-rose-950/80 flex items-center justify-center text-rose-400 group-hover:text-rose-300 transition-all duration-300">
                      <ShieldAlert className="h-6 w-6 text-rose-400 group-hover:text-rose-300 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)] transition-all" strokeWidth={2.2} />
                    </div>
                  </div>

                  {/* Single-Glance Minimal Cognitive Load Text */}
                  <div className="relative z-10 text-center max-w-sm px-4">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-rose-950/80 border border-rose-500/40 group-hover:border-rose-400/60 text-rose-300 group-hover:text-rose-200 shadow-sm shadow-rose-950/50 mb-2.5 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse shadow-[0_0_6px_#f43f5e]" />
                      CLICK ANYWHERE TO CLEAR
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-white uppercase group-hover:scale-[1.02] transition-transform duration-200">
                      {isConnectionError ? "AI Backend Disconnected" : "Invalid Scan Image"}
                    </h3>
                    <p className="text-xs text-slate-300 group-hover:text-slate-200 font-medium mt-1 transition-colors">
                      {isConnectionError
                        ? "Cannot reach AI inference server. Click here to reset."
                        : "Click card to clear and select a valid axial head CT scan."}
                    </p>
                  </div>
                </div>
              );
            })() : hasAnalyzed && imageUrl ? (
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
            ) : imageUrl ? (
              <div
                role="button"
                tabIndex={0}
                onClick={onAnalyze}
                onMouseDown={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onAnalyze?.();
                  }
                }}
                className="relative z-20 h-full w-full flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden bg-slate-950/80 backdrop-blur-sm rounded-xl border border-blue-500/25 hover:border-blue-400/70 hover:bg-slate-900/90 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-2xl hover:shadow-blue-950/70"
                title="Click anywhere to analyze scan"
              >
                {/* Ambient glow background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)] group-hover:bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.28),transparent_70%)] transition-all duration-300 pointer-events-none" />

                {/* Animated Graphic Element */}
                <div className="relative flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                  {/* Outer pulse wave */}
                  <div className="absolute h-20 w-20 rounded-full bg-blue-500/15 group-hover:bg-blue-500/25 animate-ping pointer-events-none transition-colors" />

                  {/* Concentric radar rings */}
                  <div className="absolute h-18 w-18 rounded-full border border-blue-500/30 group-hover:border-blue-400/50 bg-blue-500/5 group-hover:bg-blue-500/10 animate-pulse transition-all" />
                  <div className="absolute h-14 w-14 rounded-full border border-cyan-400/50 group-hover:border-cyan-300 transition-colors" />

                  {/* Core Icon Badge */}
                  <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-900/90 via-slate-900 to-indigo-950 border border-blue-400/70 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] shadow-xl shadow-blue-950/80 flex items-center justify-center text-blue-300 transition-all duration-300">
                    <Brain className="h-6 w-6 text-blue-300 group-hover:text-cyan-200 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)] group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,1)] transition-all" strokeWidth={2} />
                  </div>
                </div>

                {/* Single-Glance Minimal Cognitive Load Text */}
                <div className="relative z-10 text-center max-w-sm px-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-blue-950/80 border border-blue-500/40 group-hover:border-cyan-400/60 text-blue-300 group-hover:text-cyan-200 shadow-sm shadow-blue-950/50 mb-2.5 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]" />
                    CLICK ANYWHERE TO START
                  </div>

                  <h3 className="text-lg sm:text-xl font-black tracking-tight uppercase flex flex-wrap items-center justify-center gap-1.5 text-white group-hover:scale-[1.03] transition-transform duration-200">
                    <span>CLICK</span>
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(56,189,248,0.6)]">
                      &ldquo;ANALYZE BRAIN CT&rdquo;
                    </span>
                  </h3>

                  <p className="text-xs text-slate-400 group-hover:text-slate-300 font-medium mt-1 tracking-wide transition-colors">
                    Click card or bottom button to run segmentation
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center p-6 text-slate-400 pointer-events-none">
                <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">LESION OVERLAY</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Upload a CT scan slice to begin</p>
              </div>
            )}

            {/* Right Loupe Magnifier */}
            {!errorMessage && hasAnalyzed && loupe.active && loupe.target === "right" && (
              <div
                className="absolute z-50 pointer-events-none rounded-full border border-indigo-400 bg-black overflow-hidden shadow-2xl"
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
                  {showGrid && (
                    <div
                      className="dicom-fine-grid absolute inset-0 z-10 pointer-events-none"
                      style={{
                        backgroundSize: gridBackgroundSize,
                        backgroundPosition: gridBackgroundPosition,
                      }}
                    />
                  )}
                </div>
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-full h-[1px] bg-indigo-400/30" />
                  <div className="h-full w-[1px] bg-indigo-400/30 absolute" />
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/90 border border-slate-700 text-indigo-300">
                  {loupe.scale.toFixed(1)}×
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
