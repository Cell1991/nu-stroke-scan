"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Crosshair,
  Grid,
  Move,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { PanOffset } from "@/types";

interface MobilePanControllerProps {
  pan: PanOffset;
  zoom: number;
  showGrid: boolean;
  onPanStep: (dx: number, dy: number) => void;
  onResetPan: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onResetZoom?: () => void;
  onToggleGrid?: () => void;
  onResetAll?: () => void;
}

export function MobilePanController({
  pan,
  zoom,
  showGrid,
  onPanStep,
  onResetPan,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onToggleGrid,
  onResetAll,
}: MobilePanControllerProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeDirection, setActiveDirection] = useState<string | null>(null);

  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopGlide = () => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    setActiveDirection(null);
  };

  const startGlide = (dir: string, dx: number, dy: number) => {
    stopGlide();
    setActiveDirection(dir);
    // Instant precision nudge on press
    onPanStep(dx, dy);

    // Continuous glide if held for more than 220ms
    holdTimeoutRef.current = setTimeout(() => {
      holdIntervalRef.current = setInterval(() => {
        onPanStep(dx * 0.45, dy * 0.45);
      }, 40);
    }, 220);
  };

  useEffect(() => {
    return () => {
      stopGlide();
    };
  }, []);

  const isShifted = pan.x !== 0 || pan.y !== 0;

  return (
    <div className="lg:hidden w-full select-none bg-slate-900/95 border border-slate-800 rounded-xl p-2 sm:p-2.5 shadow-lg shadow-black/40">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-white/10">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
          <Move className="h-3.5 w-3.5 text-cyan-400" />
          <span>Precision Viewport Navigation</span>
          {isShifted && (
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              Panned
            </span>
          )}
        </div>

        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          type="button"
          className="text-[10px] text-slate-400 hover:text-white px-2 py-0.5 rounded border border-white/10 bg-slate-800/60 active:scale-95 transition-all"
        >
          {isCollapsed ? "แสดง" : "ย่อ"}
        </button>
      </div>

      {/* Main Controls Layout */}
      {!isCollapsed && (
        <div className="flex items-center justify-between gap-3 pt-0.5">
          {/* ========================================================= */}
          {/* LEFT: 4-WAY CLINICAL DIRECTIONAL D-PAD & CENTER           */}
          {/* ========================================================= */}
          <div className="flex flex-col items-center gap-1 shrink-0">
            <div className="relative w-[104px] h-[104px] rounded-full bg-slate-950/90 border border-slate-800 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),0_4px_12px_rgba(0,0,0,0.4)] flex items-center justify-center select-none">
              {/* Internal Accent Ring & Cross Lines */}
              <div className="absolute inset-1.5 rounded-full border border-slate-800/80 pointer-events-none" />
              <div className="absolute w-[1px] h-full bg-slate-800/40 pointer-events-none" />
              <div className="absolute h-[1px] w-full bg-slate-800/40 pointer-events-none" />

              {/* Up Button */}
              <button
                type="button"
                onPointerDown={(e) => {
                  e.preventDefault();
                  startGlide("up", 0, -25);
                }}
                onPointerUp={stopGlide}
                onPointerLeave={stopGlide}
                onPointerCancel={stopGlide}
                className={`absolute top-1 left-1/2 -translate-x-1/2 w-8 h-8 rounded-t-full flex items-center justify-center transition-all cursor-pointer ${
                  activeDirection === "up"
                    ? "bg-cyan-500/25 text-cyan-300 scale-95"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
                title="Pan Up"
              >
                <ChevronUp className="h-4 w-4" />
              </button>

              {/* Down Button */}
              <button
                type="button"
                onPointerDown={(e) => {
                  e.preventDefault();
                  startGlide("down", 0, 25);
                }}
                onPointerUp={stopGlide}
                onPointerLeave={stopGlide}
                onPointerCancel={stopGlide}
                className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-8 rounded-b-full flex items-center justify-center transition-all cursor-pointer ${
                  activeDirection === "down"
                    ? "bg-cyan-500/25 text-cyan-300 scale-95"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
                title="Pan Down"
              >
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Left Button */}
              <button
                type="button"
                onPointerDown={(e) => {
                  e.preventDefault();
                  startGlide("left", -25, 0);
                }}
                onPointerUp={stopGlide}
                onPointerLeave={stopGlide}
                onPointerCancel={stopGlide}
                className={`absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-l-full flex items-center justify-center transition-all cursor-pointer ${
                  activeDirection === "left"
                    ? "bg-cyan-500/25 text-cyan-300 scale-95"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
                title="Pan Left"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Right Button */}
              <button
                type="button"
                onPointerDown={(e) => {
                  e.preventDefault();
                  startGlide("right", 25, 0);
                }}
                onPointerUp={stopGlide}
                onPointerLeave={stopGlide}
                onPointerCancel={stopGlide}
                className={`absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-r-full flex items-center justify-center transition-all cursor-pointer ${
                  activeDirection === "right"
                    ? "bg-cyan-500/25 text-cyan-300 scale-95"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
                title="Pan Right"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Center Recenter Button */}
              <button
                type="button"
                onClick={onResetPan}
                className={`z-10 w-8 h-8 rounded-full flex items-center justify-center border transition-all active:scale-90 shadow-sm cursor-pointer ${
                  isShifted
                    ? "bg-cyan-950/80 text-cyan-300 border-cyan-500/60 hover:bg-cyan-900"
                    : "bg-slate-900 text-slate-400 border-slate-700/80 hover:text-white hover:bg-slate-800"
                }`}
                title="Center View (0, 0)"
              >
                <Crosshair className="h-3.5 w-3.5" />
              </button>
            </div>

            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
              Pan Nudge
            </span>
          </div>

          {/* ========================================================= */}
          {/* RIGHT: ZOOM STEPPER & BALANCED TOOLS (GRID & RESET)      */}
          {/* ========================================================= */}
          <div className="flex-1 flex flex-col justify-center gap-2 self-stretch py-0.5">
            {/* Row 1: Zoom In/Out Stepper (Full Width) */}
            <div className="h-9.5 flex items-center justify-between bg-slate-950/80 border border-slate-700/80 rounded-xl px-2 shadow-sm">
              <button
                onClick={onZoomOut}
                disabled={zoom <= 0.5}
                type="button"
                className="h-7 w-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 active:scale-95 transition-all"
                title="Zoom Out"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={onResetZoom}
                type="button"
                className="px-2 text-xs font-mono font-bold text-cyan-300 hover:text-cyan-200 active:scale-95 transition-all"
                title="Reset Zoom to 100%"
              >
                {Math.round(zoom * 100)}%
              </button>

              <button
                onClick={onZoomIn}
                disabled={zoom >= 4}
                type="button"
                className="h-7 w-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 active:scale-95 transition-all"
                title="Zoom In"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Row 2: Equal Proportional Grid & Reset All Buttons */}
            <div className="grid grid-cols-2 gap-2">
              {/* Grid ON/OFF Button */}
              <button
                onClick={onToggleGrid}
                type="button"
                className={`h-9.5 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all border active:scale-95 shadow-sm whitespace-nowrap ${
                  showGrid
                    ? "bg-blue-600/30 text-blue-300 border-blue-400/60 shadow-blue-950/50"
                    : "bg-slate-950/80 text-slate-300 border-slate-700/80 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Grid className={`h-3.5 w-3.5 shrink-0 ${showGrid ? "text-cyan-300" : "text-slate-400"}`} />
                <span className="whitespace-nowrap">Grid {showGrid ? "ON" : "OFF"}</span>
              </button>

              {/* Reset All Button */}
              <button
                onClick={onResetAll}
                type="button"
                className="h-9.5 px-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-950/80 border border-slate-700/80 hover:bg-slate-800 active:scale-95 flex items-center justify-center gap-1.5 transition-all shadow-sm whitespace-nowrap"
                title="Reset Calibration & View"
              >
                <RotateCcw className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                <span className="whitespace-nowrap">Reset All</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
