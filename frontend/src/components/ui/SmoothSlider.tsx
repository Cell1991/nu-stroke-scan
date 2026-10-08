import React from "react";

interface SmoothSliderProps {
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
}

export function SmoothSlider({
  value,
  onChange,
  min,
  max,
  step = 1,
}: SmoothSliderProps) {
  const currentPct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  return (
    <div className="w-full select-none py-0.5">
      <div className="neu-slider-container relative h-4 flex items-center">
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
