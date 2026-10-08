import React from "react";
import { Activity, Eye, Grid, Layers, RotateCcw, Sliders, Sun, ZoomIn, ZoomOut } from "lucide-react";
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
    <div className="rounded-2xl medical-glass-panel p-3.5 shrink-0">
      <div className="flex items-center justify-between pb-2.5 mb-2.5 shrink-0 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-wider text-sky-400 uppercase flex items-center gap-2">
            <Sliders className="h-4.5 w-4.5 text-sky-400" />
            Display Calibration
          </span>
        </div>

        {/* Utility Controls: Zoom, Gridlines, Reset */}
        <div className="flex items-center gap-2.5">
          {/* Zoom Level Indicator */}
          <div className="flex items-center bg-slate-900/80 px-1.5 py-1 rounded-xl border border-white/5">
            <button
              onClick={onZoomOut}
              disabled={zoom <= 0.5}
              title="Zoom Out (-25%)"
              className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              onClick={onResetZoom}
              title="Reset Zoom to 100%"
              className="px-2.5 py-0.5 rounded text-xs font-mono font-bold text-sky-400 hover:text-white hover:bg-slate-800 cursor-pointer transition-colors"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              onClick={onZoomIn}
              disabled={zoom >= 4}
              title="Zoom In (+25%)"
              className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>

          {/* Gridlines Button */}
          <button
            onClick={onToggleGrid}
            title="Toggle Fine Medical Measurement Gridlines"
            className={`h-8 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
              showGrid
                ? "bg-sky-500 text-white border border-sky-400 shadow-sm"
                : "btn-clinical-subtle"
            }`}
          >
            <Grid className={`h-3.5 w-3.5 ${showGrid ? "text-white" : "text-slate-300"}`} />
            Grid {showGrid ? "ON" : "OFF"}
          </button>

          {/* Reset View Button */}
          <button
            onClick={onResetAll}
            className="btn-clinical-subtle h-8 px-3 rounded-xl text-xs font-semibold hover:text-sky-300 hover:border-sky-400/50 flex items-center gap-1.5 cursor-pointer"
            title="Reset viewport and slider adjustments"
          >
            <RotateCcw className="h-3.5 w-3.5 text-sky-400" />
            Reset
          </button>
        </div>
      </div>

      {/* 4 Soft Blue Circular Knob Sliders (2x2 Grid) */}
      <div className="grid grid-cols-2 gap-3">
        {/* 1. Brightness */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-sky-400/30 transition-colors flex flex-col justify-between">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-200 mb-1.5">
            <span className="flex items-center gap-2 text-slate-300">
              <Sun className="h-4 w-4 text-sky-400" />
              Brightness
            </span>
            <button
              onClick={() => onBrightnessChange(100)}
              title="Reset to 100%"
              className="px-2.5 py-0.5 rounded-lg bg-slate-800 border border-sky-400/30 text-sky-300 font-mono text-xs font-bold cursor-pointer hover:bg-slate-700"
            >
              {brightness}%
            </button>
          </div>
          <SmoothSlider value={brightness} onChange={onBrightnessChange} min={50} max={150} />
        </div>

        {/* 2. Contrast */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-sky-400/30 transition-colors flex flex-col justify-between">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-200 mb-1.5">
            <span className="flex items-center gap-2 text-slate-300">
              <Eye className="h-4 w-4 text-sky-400" />
              Contrast
            </span>
            <button
              onClick={() => onContrastChange(100)}
              title="Reset to 100%"
              className="px-2.5 py-0.5 rounded-lg bg-slate-800 border border-sky-400/30 text-sky-300 font-mono text-xs font-bold cursor-pointer hover:bg-slate-700"
            >
              {contrast}%
            </button>
          </div>
          <SmoothSlider value={contrast} onChange={onContrastChange} min={50} max={200} />
        </div>

        {/* 3. Mask Opacity */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-sky-400/30 transition-colors flex flex-col justify-between">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-200 mb-1.5">
            <span className="flex items-center gap-2 text-slate-300">
              <Layers className="h-4 w-4 text-sky-400" />
              Mask Opacity
            </span>
            <button
              onClick={() => onMaskOpacityChange(85)}
              title="Reset to 85%"
              className="px-2.5 py-0.5 rounded-lg bg-slate-800 border border-sky-400/30 text-sky-300 font-mono text-xs font-bold cursor-pointer hover:bg-slate-700"
            >
              {maskOpacity}%
            </button>
          </div>
          <SmoothSlider value={maskOpacity} onChange={onMaskOpacityChange} min={0} max={100} />
        </div>

        {/* 4. Sensitivity Threshold */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-sky-400/30 transition-colors flex flex-col justify-between">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-200 mb-1.5">
            <span className="flex items-center gap-2 text-slate-300">
              <Activity className="h-4 w-4 text-sky-400" />
              Sensitivity Threshold
            </span>
            <button
              onClick={() => onThresholdChange(50)}
              title="Reset to 50%"
              className="px-2.5 py-0.5 rounded-lg bg-slate-800 border border-sky-400/30 text-sky-300 font-mono text-xs font-bold cursor-pointer hover:bg-slate-700"
            >
              {threshold}%
            </button>
          </div>
          <SmoothSlider value={threshold} onChange={onThresholdChange} min={10} max={95} />
        </div>
      </div>
    </div>
  );
}
