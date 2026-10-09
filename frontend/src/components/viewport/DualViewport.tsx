import React from "react";
import { Activity, Brain, Layers } from "lucide-react";
import { PanOffset, PredictionResult } from "@/types";

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
}

export function DualViewport({
  imageUrl,
  result,
  modelName,
  isScanning,
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
}: DualViewportProps) {
  return (
    <div className="flex-1 min-h-0 rounded-2xl medical-glass-panel p-3.5 flex flex-col relative">
      {/* Viewport Top Header */}
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-white/5">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
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
            onContextMenu={(e) => onContextMenu(e, "left")}
            onMouseDown={onMouseDown}
            onMouseMove={(e) => onMouseMove(e, "left")}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onWheel={(e) => onWheel(e, "left")}
            className={`dicom-canvas-bg relative rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors overflow-hidden flex items-center justify-center p-2 select-none ${
              loupe.active ? "cursor-crosshair" : isDraggingViewport ? "cursor-grabbing" : "cursor-grab"
            }`}
            title="Right-click to toggle Loupe · Scroll Wheel to Zoom"
          >
            {isScanning && (
              <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                <div className="absolute w-full h-[1.5px] bg-blue-500/80 animate-laser-sweep" />
              </div>
            )}

            {showGrid && <div className="dicom-fine-grid absolute inset-0 z-10" />}

            {/* Corner HUD Brackets */}
            <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-slate-700/60 pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-slate-700/60 pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-slate-700/60 pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-slate-700/60 pointer-events-none" />

            <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-md bg-black/80 border border-white/10 text-xs font-mono font-bold text-slate-200 uppercase tracking-wider pointer-events-none">
              ORIGINAL NCCT
            </div>
            <span className="absolute top-3 right-3 z-20 text-xs font-mono text-slate-400 font-bold pointer-events-none">
              R
            </span>
            <span className="absolute bottom-3 right-3 z-20 text-xs font-mono text-slate-400 font-bold pointer-events-none">
              L
            </span>

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
                <div className="relative flex items-center justify-center text-slate-600">
                  <Brain className="h-14 w-14" />
                  <Activity className="h-5 w-5 text-slate-400 absolute" />
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
                className="absolute z-50 pointer-events-none rounded-full border border-slate-300/80 bg-black overflow-hidden shadow-2xl"
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
                  <div className="w-full h-[1px] bg-white/40" />
                  <div className="h-full w-[1px] bg-white/40 absolute" />
                  <div className="w-4 h-4 rounded-full border border-white/50 absolute" />
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-black/90 border border-slate-700 text-slate-200">
                  {loupe.scale.toFixed(1)}×
                </div>
              </div>
            )}
          </div>

          {/* Right Display: AI OVERLAY */}
          <div
            onContextMenu={(e) => onContextMenu(e, "right")}
            onMouseDown={onMouseDown}
            onMouseMove={(e) => onMouseMove(e, "right")}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onWheel={(e) => onWheel(e, "right")}
            className={`dicom-canvas-bg relative rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors overflow-hidden flex items-center justify-center p-2 select-none ${
              loupe.active ? "cursor-crosshair" : isDraggingViewport ? "cursor-grabbing" : "cursor-grab"
            }`}
            title="Right-click to toggle Loupe · Scroll Wheel to Zoom"
          >
            {isScanning && (
              <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                <div className="absolute w-full h-[1.5px] bg-blue-500/80 animate-laser-sweep" />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm">
                  <div className="w-9 h-9 rounded-full border-2 border-slate-700 border-t-blue-500 animate-spin mb-3" />
                  <p className="text-xs font-mono font-bold text-slate-200 tracking-wider uppercase">
                    NEURAL INFERENCE IN PROGRESS...
                  </p>
                </div>
              </div>
            )}

            {showGrid && <div className="dicom-fine-grid absolute inset-0 z-10" />}

            {/* Corner HUD Brackets */}
            <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-slate-700/60 pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-slate-700/60 pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-slate-700/60 pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-slate-700/60 pointer-events-none" />

            <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 pointer-events-none">
              <div className="px-2.5 py-1 rounded-md bg-black/80 border border-white/10 text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
                AI OVERLAY - {modelName.toUpperCase()}
              </div>
              {result?.detected && (
                <div
                  className={`px-2 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider border flex items-center gap-1.5 ${
                    result.classification?.predicted_class === "ischemic"
                      ? "bg-amber-950/80 border-amber-500/50 text-amber-300"
                      : "bg-rose-950/80 border-rose-500/50 text-rose-300"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      result.classification?.predicted_class === "ischemic" ? "bg-amber-400" : "bg-rose-500"
                    }`}
                  />
                  <span>
                    {result.classification?.predicted_class === "ischemic"
                      ? "ISCHEMIC (YELLOW)"
                      : "HEMORRHAGIC (RED)"}
                  </span>
                </div>
              )}
            </div>
            <span className="absolute top-3 right-3 z-20 text-xs font-mono text-slate-400 font-bold pointer-events-none">
              R
            </span>
            <span className="absolute bottom-3 right-3 z-20 text-xs font-mono text-slate-400 font-bold pointer-events-none">
              L
            </span>

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
                <div className="relative flex items-center justify-center text-slate-600">
                  <Brain className="h-14 w-14" />
                  <Layers className="h-5 w-5 text-slate-400 absolute" />
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
                className="absolute z-50 pointer-events-none rounded-full border border-slate-300/80 bg-black overflow-hidden shadow-2xl"
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
                  <div className="w-full h-[1px] bg-white/40" />
                  <div className="h-full w-[1px] bg-white/40 absolute" />
                  <div className="w-4 h-4 rounded-full border border-white/50 absolute" />
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-black/90 border border-slate-700 text-slate-200">
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
