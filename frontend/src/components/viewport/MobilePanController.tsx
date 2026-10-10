"use client";

import React, { useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Compass, Move, RotateCcw } from "lucide-react";
import { PanOffset } from "@/types";

interface MobilePanControllerProps {
  pan: PanOffset;
  zoom: number;
  onPanStep: (dx: number, dy: number) => void;
  onResetPan: () => void;
}

export function MobilePanController({
  pan,
  zoom,
  onPanStep,
  onResetPan,
}: MobilePanControllerProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const repeatTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timers on release
  const stopContinuousPan = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (repeatTimerRef.current) {
      clearInterval(repeatTimerRef.current);
      repeatTimerRef.current = null;
    }
  };

  // Start pan on pointer down (tap immediately, then hold to pan continuously)
  const startContinuousPan = (dx: number, dy: number) => {
    // Initial single tap
    onPanStep(dx, dy);

    stopContinuousPan();

    // After 220ms, start continuous interval
    holdTimerRef.current = setTimeout(() => {
      repeatTimerRef.current = setInterval(() => {
        onPanStep(dx * 0.4, dy * 0.4);
      }, 50);
    }, 220);
  };

  const isShifted = pan.x !== 0 || pan.y !== 0;
  const STEP = 35;

  return (
    <div className="lg:hidden w-full select-none bg-slate-900/95 border border-slate-800 rounded-xl p-2 sm:p-2.5 shadow-lg shadow-black/40">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
          <Move className="h-3.5 w-3.5 text-blue-400" />
          <span>Viewport Controller</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
            Mobile Pan
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isShifted && (
            <button
              onClick={onResetPan}
              type="button"
              className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-blue-600/20 text-blue-300 border border-blue-400/40 hover:bg-blue-600/30 active:scale-95 transition-all flex items-center gap-1"
            >
              <RotateCcw className="h-2.5 w-2.5" />
              Center
            </button>
          )}

          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            type="button"
            className="text-[10px] text-slate-400 hover:text-white px-1.5 py-0.5 rounded border border-white/10 bg-slate-800/60 active:scale-95 transition-all"
          >
            {isCollapsed ? "แสดงปุ่ม" : "ย่อ"}
          </button>
        </div>
      </div>

      {/* Main Controller Body */}
      {!isCollapsed && (
        <div className="flex items-center justify-between gap-3 pt-0.5">
          {/* Directional Pad (D-Pad) */}
          <div className="grid grid-cols-3 gap-1 w-[124px] shrink-0">
            {/* Top Row: [ ] [Up] [ ] */}
            <div />
            <button
              type="button"
              onPointerDown={() => startContinuousPan(0, -STEP)}
              onPointerUp={stopContinuousPan}
              onPointerLeave={stopContinuousPan}
              onPointerCancel={stopContinuousPan}
              className="h-9 w-9 rounded-lg bg-slate-800 border border-slate-700/80 active:bg-blue-600 active:border-blue-400 active:scale-95 text-slate-200 active:text-white flex items-center justify-center shadow-md transition-all touch-manipulation cursor-pointer"
              title="ขยับขึ้น (Pan Up)"
            >
              <ChevronUp className="h-5 w-5" />
            </button>
            <div />

            {/* Middle Row: [Left] [Center/Reset] [Right] */}
            <button
              type="button"
              onPointerDown={() => startContinuousPan(-STEP, 0)}
              onPointerUp={stopContinuousPan}
              onPointerLeave={stopContinuousPan}
              onPointerCancel={stopContinuousPan}
              className="h-9 w-9 rounded-lg bg-slate-800 border border-slate-700/80 active:bg-blue-600 active:border-blue-400 active:scale-95 text-slate-200 active:text-white flex items-center justify-center shadow-md transition-all touch-manipulation cursor-pointer"
              title="ขยับซ้าย (Pan Left)"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={onResetPan}
              className={`h-9 w-9 rounded-lg border active:scale-95 flex items-center justify-center shadow-md transition-all touch-manipulation cursor-pointer ${
                isShifted
                  ? "bg-blue-600/30 border-blue-400/50 text-blue-300"
                  : "bg-slate-800/60 border-slate-700/50 text-slate-400"
              }`}
              title="กลับจุดกึ่งกลาง (Reset Center)"
            >
              <Compass className="h-4 w-4" />
            </button>

            <button
              type="button"
              onPointerDown={() => startContinuousPan(STEP, 0)}
              onPointerUp={stopContinuousPan}
              onPointerLeave={stopContinuousPan}
              onPointerCancel={stopContinuousPan}
              className="h-9 w-9 rounded-lg bg-slate-800 border border-slate-700/80 active:bg-blue-600 active:border-blue-400 active:scale-95 text-slate-200 active:text-white flex items-center justify-center shadow-md transition-all touch-manipulation cursor-pointer"
              title="ขยับขวา (Pan Right)"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Bottom Row: [ ] [Down] [ ] */}
            <div />
            <button
              type="button"
              onPointerDown={() => startContinuousPan(0, STEP)}
              onPointerUp={stopContinuousPan}
              onPointerLeave={stopContinuousPan}
              onPointerCancel={stopContinuousPan}
              className="h-9 w-9 rounded-lg bg-slate-800 border border-slate-700/80 active:bg-blue-600 active:border-blue-400 active:scale-95 text-slate-200 active:text-white flex items-center justify-center shadow-md transition-all touch-manipulation cursor-pointer"
              title="ขยับลง (Pan Down)"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
            <div />
          </div>

          {/* Info & Instructions */}
          <div className="flex-1 flex flex-col justify-between py-0.5 text-right">
            <div className="space-y-0.5">
              <div className="text-[11px] font-mono font-semibold text-slate-300">
                X: <span className={pan.x !== 0 ? "text-blue-300" : ""}>{pan.x > 0 ? `+${pan.x}` : pan.x}</span> | Y:{" "}
                <span className={pan.y !== 0 ? "text-blue-300" : ""}>{pan.y > 0 ? `+${pan.y}` : pan.y}</span>
              </div>
              <div className="text-[10px] text-slate-400">
                Zoom: <span className="text-slate-200 font-mono font-semibold">{Math.round(zoom * 100)}%</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400/90 leading-tight">
              กดครั้งเดียวเพื่อขยับทีละสเต็ป หรือกดค้างเพื่อเลื่อนภาพต่อเนื่อง
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
