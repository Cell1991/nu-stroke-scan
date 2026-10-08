import React from "react";

export function FooterBar() {
  return (
    <footer className="h-5 flex items-center justify-between text-xs font-medium text-slate-500 px-3 shrink-0 border-t border-white/5 pt-0.5 select-none">
      <span className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
        NU Stroke Scan · Naresuan University Hospital Neuro-Imaging Research Center
      </span>
      <span>DICOM 3.0 Compatible · Clinical AI Workstation</span>
    </footer>
  );
}
