"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

interface SmoothSliderProps {
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
  defaultValue?: number;
}

export function SmoothSlider({
  value,
  onChange,
  min,
  max,
  step = 1,
  defaultValue,
}: SmoothSliderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const currentPct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  const defaultPct =
    defaultValue !== undefined
      ? Math.max(0, Math.min(100, ((defaultValue - min) / (max - min)) * 100))
      : null;

  return (
    <div
      className="w-full select-none py-1 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDragging(false);
      }}
    >
      {/* Slider Track Area */}
      <div className="relative h-6 flex items-center cursor-pointer">
        {/* Track Base */}
        <div className="relative w-full h-[5px] rounded-full bg-slate-950/80 border border-white/5 overflow-hidden">
          {/* Active Gradient Fill Track (Locked exactly to thumb center) */}
          <div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{
              width: `calc(8px + (100% - 16px) * (${currentPct} / 100))`,
              background: "linear-gradient(90deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%)",
              transition: isDragging ? "none" : "width 150ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 150ms ease",
              boxShadow: isDragging
                ? "0 0 10px rgba(59, 130, 246, 0.6)"
                : isHovered
                ? "0 0 6px rgba(59, 130, 246, 0.3)"
                : "none",
            }}
          />

          {/* Default Marker */}
          {defaultPct !== null && (
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-white/20 pointer-events-none"
              style={{ left: `calc(8px + (100% - 16px) * (${defaultPct} / 100))` }}
            />
          )}
        </div>

        {/* Outer Positioning Wrapper (Always strictly vertically & horizontally centered) */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-20 flex items-center justify-center"
          style={{
            left: `calc(8px + (100% - 16px) * (${currentPct} / 100))`,
            transition: isDragging ? "none" : "left 150ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Apple/Medical Style Sleek White Thumb with Spring Scale */}
          <motion.div
            animate={{
              scale: isDragging ? 1.25 : isHovered ? 1.12 : 1,
            }}
            transition={{ type: "spring", stiffness: 450, damping: 25 }}
            className={`w-4 h-4 rounded-full bg-white transition-shadow duration-150 ${
              isDragging
                ? "shadow-[0_0_12px_rgba(59,130,246,0.8),0_2px_6px_rgba(0,0,0,0.5)] border border-blue-400"
                : isHovered
                ? "shadow-[0_0_8px_rgba(59,130,246,0.4),0_1px_4px_rgba(0,0,0,0.4)] border border-slate-200"
                : "shadow-[0_1px_4px_rgba(0,0,0,0.4)] border border-slate-300"
            }`}
          />
        </div>

        {/* Native Range Input with Pointer Capture for Fast Fluid Dragging */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onPointerDown={(e) => {
            setIsDragging(true);
            try {
              e.currentTarget.setPointerCapture(e.pointerId);
            } catch {}
          }}
          onPointerUp={(e) => {
            setIsDragging(false);
            try {
              e.currentTarget.releasePointerCapture(e.pointerId);
            } catch {}
          }}
          onPointerCancel={() => setIsDragging(false)}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-grab active:cursor-grabbing z-30 m-0"
        />
      </div>
    </div>
  );
}
