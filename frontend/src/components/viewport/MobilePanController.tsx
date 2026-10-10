"use client";

import React, { useEffect, useRef, useState } from "react";
import { Compass, Gamepad2, Grid, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
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
  const [isDragging, setIsDragging] = useState(false);
  const [knob, setKnob] = useState({ x: 0, y: 0 });

  const baseRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const knobPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  const MAX_RADIUS = 30; // Max joystick thumb travel

  // Continuous 60fps pan loop while joystick is held
  const startPanLoop = () => {
    if (animFrameRef.current) return;

    const tick = () => {
      if (!isDraggingRef.current) return;

      const { x, y } = knobPosRef.current;
      const dist = Math.hypot(x, y);

      if (dist > 3) {
        // Linear/quadratic speed curve for fine-tuned MOBA-like control
        const speed = (dist / MAX_RADIUS) * 5.5;
        const angle = Math.atan2(y, x);
        const stepX = Math.cos(angle) * speed;
        const stepY = Math.sin(angle) * speed;

        onPanStep(stepX, stepY);
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
  };

  const stopPanLoop = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!baseRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    // Capture pointer so moves outside bounds still track
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if capture fails
    }

    const rect = baseRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    centerRef.current = { x: centerX, y: centerY };

    isDraggingRef.current = true;
    setIsDragging(true);

    const rawDx = e.clientX - centerX;
    const rawDy = e.clientY - centerY;
    const dist = Math.hypot(rawDx, rawDy);

    let kx = rawDx;
    let ky = rawDy;
    if (dist > MAX_RADIUS) {
      const angle = Math.atan2(rawDy, rawDx);
      kx = Math.cos(angle) * MAX_RADIUS;
      ky = Math.sin(angle) * MAX_RADIUS;
    }

    knobPosRef.current = { x: kx, y: ky };
    setKnob({ x: kx, y: ky });

    startPanLoop();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    const rawDx = e.clientX - centerRef.current.x;
    const rawDy = e.clientY - centerRef.current.y;
    const dist = Math.hypot(rawDx, rawDy);

    let kx = rawDx;
    let ky = rawDy;
    if (dist > MAX_RADIUS) {
      const angle = Math.atan2(rawDy, rawDx);
      kx = Math.cos(angle) * MAX_RADIUS;
      ky = Math.sin(angle) * MAX_RADIUS;
    }

    knobPosRef.current = { x: kx, y: ky };
    setKnob({ x: kx, y: ky });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    isDraggingRef.current = false;
    setIsDragging(false);
    stopPanLoop();

    knobPosRef.current = { x: 0, y: 0 };
    setKnob({ x: 0, y: 0 });
  };

  // Cleanup loop on unmount
  useEffect(() => {
    return () => {
      stopPanLoop();
    };
  }, []);

  const isShifted = pan.x !== 0 || pan.y !== 0;

  return (
    <div className="lg:hidden w-full select-none bg-slate-900/95 border border-slate-800 rounded-xl p-2 sm:p-2.5 shadow-lg shadow-black/40">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-white/10">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
          <Gamepad2 className="h-3.5 w-3.5 text-cyan-400" />
          <span>Viewport Controller & Tools</span>
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

      {/* Main Unified Controls Layout */}
      {!isCollapsed && (
        <div className="flex items-center justify-between gap-3 pt-0.5">
          {/* ========================================================= */}
          {/* LEFT: 360° MOBA VIRTUAL JOYSTICK                         */}
          {/* ========================================================= */}
          <div className="flex flex-col items-center gap-1 shrink-0">
            <div
              ref={baseRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative w-[104px] h-[104px] rounded-full bg-slate-950/90 border-2 border-slate-700/80 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),0_4px_12px_rgba(0,0,0,0.4)] flex items-center justify-center select-none touch-none cursor-grab active:cursor-grabbing"
              title="หมุนจอย 360° อิสระเพื่อเลื่อนมุมมอง"
            >
              {/* Internal Accent Ring & Crosshair */}
              <div className="absolute inset-2.5 rounded-full border border-slate-800 pointer-events-none" />
              <div className="absolute w-[1px] h-full bg-slate-800/60 pointer-events-none" />
              <div className="absolute h-[1px] w-full bg-slate-800/60 pointer-events-none" />

              {/* Directional Indicator Ticks */}
              <span className="absolute top-1 text-[8px] font-mono text-slate-500 pointer-events-none">▲</span>
              <span className="absolute bottom-1 text-[8px] font-mono text-slate-500 pointer-events-none">▼</span>
              <span className="absolute left-1.5 text-[8px] font-mono text-slate-500 pointer-events-none">◀</span>
              <span className="absolute right-1.5 text-[8px] font-mono text-slate-500 pointer-events-none">▶</span>

              {/* MOBA Thumbstick Knob */}
              <div
                className={`absolute w-12 h-12 rounded-full flex items-center justify-center pointer-events-none shadow-xl ${
                  isDragging
                    ? "bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-800 border-2 border-cyan-300 ring-4 ring-cyan-400/30 scale-105"
                    : "bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 border-2 border-slate-600 shadow-slate-950"
                }`}
                style={{
                  transform: `translate3d(${knob.x}px, ${knob.y}px, 0)`,
                  transition: isDragging ? "none" : "transform 140ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                }}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full transition-colors ${
                    isDragging
                      ? "bg-white shadow-[0_0_8px_#ffffff]"
                      : "bg-slate-400/80"
                  }`}
                />
              </div>
            </div>

            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">
              360° Free Pan
            </span>
          </div>

          {/* ========================================================= */}
          {/* RIGHT: ZOOM / GRID / RESET TOOLS                          */}
          {/* ========================================================= */}
          <div className="flex-1 flex flex-col justify-between gap-1.5 self-stretch py-0.5">
            {/* Row 1: Zoom In/Out Stepper */}
            <div className="h-8 flex items-center justify-between bg-slate-950/80 border border-slate-700/80 rounded-xl px-1.5 shadow-sm">
              <button
                onClick={onZoomOut}
                disabled={zoom <= 0.5}
                type="button"
                className="h-6 w-6 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 active:scale-95 transition-all"
                title="Zoom Out"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={onResetZoom}
                type="button"
                className="px-2 text-xs font-mono font-black text-cyan-300 hover:text-cyan-200 active:scale-95 transition-all"
                title="Reset Zoom to 100%"
              >
                {Math.round(zoom * 100)}%
              </button>

              <button
                onClick={onZoomIn}
                disabled={zoom >= 4}
                type="button"
                className="h-6 w-6 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 active:scale-95 transition-all"
                title="Zoom In"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Row 2: Grid ON/OFF Button */}
            <button
              onClick={onToggleGrid}
              type="button"
              className={`h-7.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all border active:scale-95 shadow-sm ${
                showGrid
                  ? "bg-blue-600/30 text-blue-300 border-blue-400/60 shadow-blue-950/50"
                  : "bg-slate-950/80 text-slate-300 border-slate-700/80 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Grid className={`h-3.5 w-3.5 ${showGrid ? "text-cyan-300" : "text-slate-400"}`} />
              <span>Grid {showGrid ? "ON" : "OFF"}</span>
            </button>

            {/* Row 3: Re-Center & Reset Calibration Buttons */}
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={onResetPan}
                type="button"
                className={`h-7 px-1.5 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 transition-all border active:scale-95 ${
                  isShifted
                    ? "bg-cyan-950/70 text-cyan-300 border-cyan-500/50 shadow-sm"
                    : "bg-slate-950/80 text-slate-400 border-slate-700/80 hover:text-white"
                }`}
                title="Re-center View to (0,0)"
              >
                <Compass className="h-3 w-3" />
                <span>Center</span>
              </button>

              <button
                onClick={onResetAll}
                type="button"
                className="h-7 px-1.5 rounded-xl text-[11px] font-bold text-slate-300 hover:text-white bg-slate-950/80 border border-slate-700/80 active:scale-95 flex items-center justify-center gap-1 transition-all"
                title="Reset All Calibration"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
