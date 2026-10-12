"use client";

import React, { useState, useEffect } from "react";
import { Maximize, Minimize } from "lucide-react";

interface VendorFullscreenDocument extends Document {
  webkitFullscreenElement?: Element;
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  webkitExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
}

interface VendorFullscreenElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

export function HeaderBar() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as VendorFullscreenDocument;
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
      const doc = document as VendorFullscreenDocument;
      const docEl = document.documentElement as VendorFullscreenElement;

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
      <div className="sm:hidden relative z-10 flex items-center shrink-0">
        <button
          type="button"
          onClick={toggleFullscreen}
          className={`relative flex items-center justify-center h-9 w-9 rounded-xl backdrop-blur-md active:scale-95 transition-all duration-300 group cursor-pointer overflow-hidden ${
            isFullscreen
              ? "bg-gradient-to-b from-emerald-950/70 via-slate-900/90 to-slate-950 border border-emerald-500/50 shadow-[0_0_16px_rgba(16,185,129,0.25)]"
              : "bg-gradient-to-b from-slate-800/80 via-slate-900/90 to-slate-950 border border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_2px_8px_rgba(0,0,0,0.6),0_0_12px_rgba(34,211,238,0.12)] hover:shadow-[0_0_18px_rgba(34,211,238,0.3)]"
          }`}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {/* Subtle Top-Edge Specular Sheen */}
          <div
            className={`absolute inset-x-0 top-0 h-[1px] pointer-events-none transition-colors ${
              isFullscreen
                ? "bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
                : "bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
            }`}
          />

          {/* Ambient Background Glow on Hover / Active */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
              isFullscreen
                ? "bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_70%)]"
                : "bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_70%)] opacity-70 group-hover:opacity-100"
            }`}
          />

          {/* Icon with Medical Optics Glow */}
          {isFullscreen ? (
            <>
              <Minimize
                className="h-4 w-4 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] transition-transform duration-200 group-hover:scale-110 shrink-0"
                strokeWidth={2.2}
              />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
            </>
          ) : (
            <Maximize
              className="h-4 w-4 text-cyan-300 group-hover:text-cyan-200 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)] transition-transform duration-200 group-hover:scale-110 shrink-0"
              strokeWidth={2.2}
            />
          )}
        </button>
      </div>

      {/* Right: Subtitle anchored across the workstation bar (Desktop: hidden on mobile) */}
      <div className="hidden sm:flex items-center gap-2 relative z-10">
        <span className="text-sm font-bold tracking-wider text-slate-300 uppercase font-mono">
          Neuro-Imaging Clinical Intelligence
        </span>
      </div>
    </header>
  );
}
