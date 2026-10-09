import React from "react";

export function HeaderBar() {
  return (
    <header className="h-14 px-5 flex items-center justify-between shrink-0 rounded-2xl medical-glass-panel">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center h-10 w-10 shrink-0 rounded-xl bg-slate-800/90 border border-white/10 p-1.5 shadow-sm">
          <img
            src="/brand_icon_trans.png"
            alt="NU Stroke Scan Logo"
            className="h-7 w-7 object-contain select-none pointer-events-none"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="font-semibold text-base tracking-tight text-slate-100 leading-tight">
            NU STROKE SCAN
          </h1>
          <p className="text-xs text-slate-400 font-normal leading-tight">
            Neuro-Imaging Clinical Intelligence · Naresuan University Hospital
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 border border-white/5 text-xs text-slate-400 font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <span>Clinical Workstation</span>
      </div>
    </header>
  );
}
