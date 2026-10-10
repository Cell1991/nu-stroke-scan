import React from "react";

export function HeaderBar() {
  return (
    <header className="h-12 sm:h-14 lg:h-16 px-3 sm:px-4 flex items-center justify-between shrink-0 bg-gradient-to-r from-[#0a0d14] via-[#0f1422] to-[#0a0d14] border-b border-white/[0.08] relative shadow-md select-none overflow-hidden">
      {/* Ambient Top Lighting & Bottom Glow Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_-20%,rgba(59,130,246,0.12),transparent)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/35 to-transparent pointer-events-none" />

      {/* Left: Brand Identity (Aligned with panel content below) */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 relative z-10">
        {/* Illuminated Medical Brand Badge */}
        <div className="relative flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 lg:h-11 lg:w-11 shrink-0 select-none">
          <div className="absolute inset-0 rounded-xl bg-orange-500/15 blur-sm pointer-events-none" />
          <img
            src="/logo.png"
            alt="NU Stroke Scan Logo"
            className="h-7 w-7 sm:h-9 sm:w-9 lg:h-10 lg:w-10 object-contain relative z-10 select-none pointer-events-none drop-shadow-[0_0_14px_rgba(249,115,22,0.5)]"
          />
        </div>

        {/* Title - Scaled to match Logo height with ultra-bold presence */}
        <div className="flex flex-col justify-center">
          <h1
            className="font-display font-black text-lg sm:text-[24px] md:text-[28px] tracking-wide uppercase leading-none select-none bg-gradient-to-r from-amber-300 via-orange-500 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(249,115,22,0.45)]"
            style={{ fontWeight: 900 }}
          >
            NU STROKE SCAN
          </h1>
          {/* Fallback subtitle for mobile/narrow viewports */}
          <span className="sm:hidden text-[10px] text-orange-200/70 font-mono tracking-wider uppercase mt-1 leading-none">
            Neuro-Imaging Clinical Intelligence
          </span>
        </div>
      </div>

      {/* Right: Subtitle anchored across the workstation bar (Desktop) */}
      <div className="hidden sm:flex items-center gap-2 relative z-10">
        <span className="text-sm font-bold tracking-wider text-slate-300 uppercase font-mono">
          Neuro-Imaging Clinical Intelligence
        </span>
      </div>
    </header>
  );
}
