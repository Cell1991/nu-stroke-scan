"use client";

import React, { useEffect, useState } from "react";
import { Check, Loader2, ShieldCheck, Cpu, Sparkles, Activity } from "lucide-react";

interface Step {
  id: number;
  label: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PIPELINE_STEPS: Step[] = [
  {
    id: 1,
    label: "Modality Gatekeeper",
    sub: "ResNet-18 axial brain verification",
    icon: ShieldCheck,
  },
  {
    id: 2,
    label: "Tri-Architecture Segmentation",
    sub: "VCA-Net, DLKA & Patcher parallel inferencing",
    icon: Cpu,
  },
  {
    id: 3,
    label: "MaxViT Pathological Classifier",
    sub: "Deep vision feature stroke subtype evaluation",
    icon: Sparkles,
  },
  {
    id: 4,
    label: "Physiological Tissue Attenuation",
    sub: "Quantitative Hounsfield density mapping",
    icon: Activity,
  },
];

export function ScanningPipelineHUD() {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    // Progressively cycle through stages during inference
    const t1 = setTimeout(() => setCurrentStep(2), 650);
    const t2 = setTimeout(() => setCurrentStep(3), 1350);
    const t3 = setTimeout(() => setCurrentStep(4), 2100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-5 lg:p-6 select-none animate-in fade-in duration-200">
      <div className="w-full max-w-[315px] sm:max-w-sm rounded-2xl bg-slate-900/95 border border-blue-500/40 p-3 sm:p-5 shadow-2xl space-y-2 sm:space-y-4">
        {/* Header HUD Status */}
        <div className="flex items-center justify-between pb-2 sm:pb-3 border-b border-white/10">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-blue-500"></span>
            </span>
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
              Clinical Pipeline
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-800/60">
            Phase {currentStep}/4
          </span>
        </div>

        {/* Pipeline Step List */}
        <div className="space-y-1 sm:space-y-2 lg:space-y-2.5">
          {PIPELINE_STEPS.map((step) => {
            const isDone = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className={`flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-300 ${
                  isCurrent
                    ? "bg-blue-600/15 border border-blue-500/40 text-white"
                    : isDone
                    ? "bg-slate-800/40 border border-white/5 text-slate-300"
                    : "opacity-40 border border-transparent text-slate-500"
                }`}
              >
                <div
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isDone
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : isCurrent
                      ? "bg-blue-500 text-white shadow-sm"
                      : "bg-slate-800 text-slate-500 border border-white/5"
                  }`}
                >
                  {isDone ? (
                    <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
                  ) : isCurrent ? (
                    <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                  ) : (
                    <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[11px] sm:text-xs font-semibold truncate leading-tight">
                    {step.label}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 truncate leading-tight mt-0.5 font-mono">
                    {step.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Animated Processing Status Bar */}
        <div className="pt-1 sm:pt-2">
          <div className="flex justify-between text-[9px] sm:text-[10px] font-mono text-slate-400 mb-0.5 sm:mb-1">
            <span>Neural Processing</span>
            <span>{currentStep === 1 ? "25%" : currentStep === 2 ? "55%" : currentStep === 3 ? "80%" : "98%"}</span>
          </div>
          <div className="h-1 sm:h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-500 rounded-full"
              style={{
                width: currentStep === 1 ? "25%" : currentStep === 2 ? "55%" : currentStep === 3 ? "80%" : "98%",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
