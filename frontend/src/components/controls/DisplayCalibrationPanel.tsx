import React from "react";
import { Eye, Grid, Layers, RotateCcw, Sliders, Sun, ZoomIn, ZoomOut } from "lucide-react";
import { SmoothSlider } from "@/components/ui/SmoothSlider";

interface DisplayCalibrationPanelProps {
  zoom: number;
  showGrid: boolean;
  brightness: number;
  contrast: number;
  maskOpacity: number;
  threshold: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onToggleGrid: () => void;
  onResetAll: () => void;
  onBrightnessChange: (val: number) => void;
  onContrastChange: (val: number) => void;
  onMaskOpacityChange: (val: number) => void;
  onThresholdChange: (val: number) => void;
}

export function DisplayCalibrationPanel({
  zoom,
  showGrid,
  brightness,
  contrast,
  maskOpacity,
  threshold,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onToggleGrid,
  onResetAll,
  onBrightnessChange,
  onContrastChange,
  onMaskOpacityChange,
  onThresholdChange,
}: DisplayCalibrationPanelProps) {
  return (
    <div className="shrink-0 bg-[#0c1017] border-t border-slate-800/80 p-2 sm:p-2.5 select-none">
      {/* Calibration Header & Quick Controls */}
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-1.5 sm:gap-2 pb-1.5 mb-1.5 border-b border-white/10">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-xs font-semibold tracking-wider text-slate-200 uppercase flex items-center gap-1.5">
            <Sliders className="h-3.5 w-3.5 text-blue-400" />
            Display & Windowing Calibration
          </span>
        </div>

        {/* Viewport Tools: Zoom, Grid, Reset (Desktop only - on mobile, merged into MobilePanController) */}
        <div className="hidden lg:flex items-center gap-1.5 sm:gap-2.5 flex-wrap">
          {/* Zoom stepper */}
          <div className="h-7 sm:h-8 flex items-center bg-slate-900/90 px-1 sm:px-1.5 rounded-lg sm:rounded-xl border border-white/10 shadow-sm text-xs select-none">
            <button
              onClick={onZoomOut}
              disabled={zoom <= 0.5}
              title="Zoom Out"
              className="h-5 w-5 sm:h-6 sm:w-6 rounded-md sm:rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
            >
              <ZoomOut className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </button>
            <button
              onClick={onResetZoom}
              title="Reset Zoom"
              className="px-1.5 sm:px-2.5 text-xs font-extrabold font-mono text-slate-100 hover:text-blue-300 cursor-pointer transition-colors"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              onClick={onZoomIn}
              disabled={zoom >= 4}
              title="Zoom In"
              className="h-5 w-5 sm:h-6 sm:w-6 rounded-md sm:rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
            >
              <ZoomIn className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </button>
          </div>

          <button
            onClick={onToggleGrid}
            className={`h-7 sm:h-8 px-2.5 sm:px-3.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer transition-all border shadow-sm shrink-0 select-none whitespace-nowrap ${
              showGrid
                ? "bg-blue-600/25 text-blue-300 border-blue-400/50 shadow-blue-950/40 ring-1 ring-blue-400/30"
                : "bg-slate-900/90 text-slate-300 border-white/10 hover:text-white hover:bg-slate-800 hover:border-white/20"
            }`}
          >
            <Grid className={`h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 ${showGrid ? "text-blue-300" : "text-slate-400"}`} />
            <span className="whitespace-nowrap">Grid {showGrid ? "ON" : "OFF"}</span>
          </button>

          <button
            onClick={onResetAll}
            className="h-7 sm:h-8 px-2.5 sm:px-3.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold tracking-wide text-slate-300 hover:text-white bg-slate-900/90 border border-white/10 hover:bg-slate-800 hover:border-white/20 flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-all shadow-sm active:scale-[0.98]"
            title="Reset calibration sliders"
          >
            <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* 4 Spacious Sliders Arranged in 2 Rows (2x2 Grid) */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5">
        {/* Row 1, Col 1: Brightness */}
        <div className="px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl bg-slate-900/60 border border-white/5 space-y-1 sm:space-y-1.5">
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-200">
            <span className="flex items-center gap-1.5 sm:gap-2 font-semibold">
              <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400" />
              Brightness
            </span>
            <span className="font-mono font-bold text-xs sm:text-sm text-slate-100">{brightness}%</span>
          </div>
          <SmoothSlider
            value={brightness}
            onChange={onBrightnessChange}
            min={50}
            max={150}
            defaultValue={100}
          />
        </div>

        {/* Row 1, Col 2: Contrast */}
        <div className="px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl bg-slate-900/60 border border-white/5 space-y-1 sm:space-y-1.5">
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-200">
            <span className="flex items-center gap-1.5 sm:gap-2 font-semibold">
              <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400" />
              Contrast
            </span>
            <span className="font-mono font-bold text-xs sm:text-sm text-slate-100">{contrast}%</span>
          </div>
          <SmoothSlider
            value={contrast}
            onChange={onContrastChange}
            min={50}
            max={200}
            defaultValue={100}
          />
        </div>

        {/* Row 2, Col 1: Mask Opacity */}
        <div className="px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl bg-slate-900/60 border border-white/5 space-y-1 sm:space-y-1.5">
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-200">
            <span className="flex items-center gap-1.5 sm:gap-2 font-semibold">
              <Layers className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400" />
              Mask Opacity
            </span>
            <span className="font-mono font-bold text-xs sm:text-sm text-slate-100">{maskOpacity}%</span>
          </div>
          <SmoothSlider
            value={maskOpacity}
            onChange={onMaskOpacityChange}
            min={0}
            max={100}
            defaultValue={85}
          />
        </div>

        {/* Row 2, Col 2: Sensitivity Threshold */}
        <div className="px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl bg-slate-900/60 border border-white/5 space-y-1 sm:space-y-1.5">
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-200">
            <span className="flex items-center gap-1.5 sm:gap-2 font-semibold">
              <Sliders className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400" />
              Threshold
            </span>
            <span className="font-mono font-bold text-xs sm:text-sm text-slate-100">{threshold}%</span>
          </div>
          <SmoothSlider
            value={threshold}
            onChange={onThresholdChange}
            min={10}
            max={95}
            defaultValue={50}
          />
        </div>
      </div>
    </div>
  );
}
