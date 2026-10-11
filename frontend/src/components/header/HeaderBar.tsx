"use client";

import React, { useState, useEffect } from "react";
import { Maximize, Minimize } from "lucide-react";

export function HeaderBar() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as any;
      const isFull = !!(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      );
      setIsFullscreen(isFull);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      const doc = document as any;
      const docEl = document.documentElement as any;

      if (
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      ) {
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        } else if (doc.mozCancelFullScreen) {
          await doc.mozCancelFullScreen();
        } else if (doc.msExitFullscreen) {
          await doc.msExitFullscreen();
        }
      } else {
        if (docEl.requestFullscreen) {
          await docEl.requestFullscreen();
        } else if (docEl.webkitRequestFullscreen) {
          await docEl.webkitRequestFullscreen();
        } else if (docEl.mozRequestFullScreen) {
          await docEl.mozRequestFullScreen();
        } else if (docEl.msRequestFullscreen) {
          await docEl.msRequestFullscreen();
        }
      }
    } catch (err) {
      console.warn("Fullscreen toggle error", err);
    }
  };

  return (
    <header className="h-14 sm:h-16 lg:h-[68px] px-3.5 sm:px-5 flex items-center justify-between shrink-0 bg-gradient-to-r from-[#0a0d14] via-[#0f1422] to-[#0a0d14] border-b border-white/[0.08] relative shadow-md select-none overflow-hidden">
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

      {/* Right: Mobile Fullscreen Button (Far Right, strictly mobile only: sm:hidden) */}
      <button
        type="button"
        onClick={toggleFullscreen}
        className="sm:hidden relative z-10 flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 active:scale-95 transition-all shadow-sm shrink-0 cursor-pointer"
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      >
        {isFullscreen ? (
          <>
            <Minimize className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300">Exit</span>
          </>
        ) : (
          <>
            <Maximize className="h-3.5 w-3.5 text-slate-300 shrink-0" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300">Full</span>
          </>
        )}
      </button>

      {/* Right: Subtitle anchored across the workstation bar (Desktop: hidden on mobile) */}
      <div className="hidden sm:flex items-center gap-2 relative z-10">
        <span className="text-sm font-bold tracking-wider text-slate-300 uppercase font-mono">
          Neuro-Imaging Clinical Intelligence
        </span>
      </div>
    </header>
  );
}
