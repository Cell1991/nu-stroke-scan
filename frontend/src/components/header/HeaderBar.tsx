import React from "react";

export function HeaderBar() {
  return (
    <header className="h-14 px-5 flex items-center justify-between shrink-0 rounded-2xl medical-glass-panel">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-blue-600/30 to-sky-400/20 border border-sky-400/30 p-1.5 shadow-inner">
          <img
            src="/brand_icon_trans.png"
            alt="NU Stroke Scan Logo"
            className="h-7 w-7 object-contain select-none pointer-events-none drop-shadow-md"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div>
            <h1 className="font-bold text-base tracking-tight flex items-center gap-1.5 leading-tight">
              <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                NU STROKE SCAN
              </span>
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-medium leading-tight">
            Neuro-Imaging Clinical Intelligence · Naresuan University Hospital
          </p>
        </div>
      </div>
    </header>
  );
}
