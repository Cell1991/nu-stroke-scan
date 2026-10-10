import React from "react";
import {
  Activity,
  Check,
  Copy,
  FileDown,
  Image,
} from "lucide-react";
import { motion } from "motion/react";
import { PredictionResult } from "@/types";

interface DiagnosticPanelProps {
  result: PredictionResult | null;
  modelName: string;
  threshold: number;
  hasImage: boolean;
  copiedToast: boolean;
  exportedStatus: string | null;
  onCopySummary: () => void;
  onExportImage: () => void;
  onExportReport: () => void;
}

export function DiagnosticPanel({
  result,
  modelName,
  threshold,
  hasImage,
  copiedToast,
  exportedStatus,
  onCopySummary,
  onExportImage,
  onExportReport,
}: DiagnosticPanelProps) {
  const predictedClass = result?.classification?.predicted_class;
  const isHemo = predictedClass === "hemorrhagic";
  const isIsch = predictedClass === "ischemic";

  return (
    <section
      id="diagnostic-panel"
      className="w-full lg:col-span-3 flex flex-col lg:min-h-0 lg:h-full lg:overflow-hidden bg-[#0c1017] p-2.5 sm:p-3.5 lg:p-3.5 justify-between gap-3 lg:gap-0 select-none"
    >
      {/* Top Content: Low Cognitive Load Hierarchy */}
      <div className="flex flex-col gap-2.5 sm:gap-3 lg:overflow-hidden">
        {/* Header */}
        <div className="h-7 sm:h-8 flex items-center justify-between pb-1.5 sm:pb-2 border-b border-white/10 shrink-0">
          <span className="text-xs font-bold tracking-wider text-slate-200 uppercase flex items-center gap-2">
            <Activity className="h-4 w-4 text-blue-400" strokeWidth={2} />
            Diagnostic Assessment
          </span>
          <span
            className={`text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase px-2 sm:px-2.5 py-0.5 rounded-md border flex items-center gap-1.5 shadow-sm transition-all ${
              result
                ? "bg-emerald-950/70 border-emerald-500/50 text-emerald-300 shadow-emerald-950/50 ring-1 ring-emerald-500/25"
                : "bg-blue-950/70 border-blue-500/40 text-blue-300 shadow-blue-950/40 ring-1 ring-blue-500/25"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                result
                  ? "bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]"
                  : "bg-blue-400 shadow-[0_0_5px_#60a5fa]"
              }`}
            />
            {result ? "ANALYSIS COMPLETE" : "STANDBY"}
          </span>
        </div>

        {/* 1. Primary Diagnosis Hero Card (The "What is it?" Answer in 1 Glance) */}
        <div className="shrink-0">
          {result ? (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-2.5 sm:p-3 lg:p-3.5 rounded-lg sm:rounded-xl border flex flex-col gap-2 sm:gap-2.5 ${
                isHemo
                  ? "bg-rose-950/30 border-rose-500/60 text-rose-100"
                  : isIsch
                  ? "bg-amber-950/30 border-amber-500/60 text-amber-100"
                  : "bg-emerald-950/30 border-emerald-500/60 text-emerald-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase text-slate-400 block">
                    AI Primary Finding
                  </span>
                  <h2 className="text-sm sm:text-base font-extrabold tracking-tight uppercase mt-0.5">
                    {isHemo
                      ? "Hemorrhagic Stroke"
                      : isIsch
                      ? "Ischemic Stroke"
                      : "Normal Head CT"}
                  </h2>
                </div>

                <div
                  className={`px-2.5 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm font-mono font-extrabold rounded-lg shadow-sm ${
                    isHemo
                      ? "bg-rose-600 text-white"
                      : isIsch
                      ? "bg-amber-600 text-white"
                      : "bg-emerald-600 text-white"
                  }`}
                >
                  {(result.classification ? result.classification.confidence * 100 : 0).toFixed(1)}%
                </div>
              </div>

              {/* Key Diagnostic Telemetry Strip */}
              <div className="grid grid-cols-2 gap-2 pt-1.5 sm:pt-2 border-t border-white/10 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[9px] sm:text-[10px]">LESION VOLUME</span>
                  <span className="font-bold text-white text-xs sm:text-sm">
                    {result.lesionArea > 0 ? `${result.lesionArea}%` : "0% (None)"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] sm:text-[10px]">SEGMENTATION CONF.</span>
                  <span className="font-bold text-white text-xs sm:text-sm">
                    {(result.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="p-3 sm:p-3.5 lg:p-4 rounded-lg sm:rounded-xl bg-slate-900/60 border border-white/5 text-center">
              <p className="text-sm sm:text-base font-bold text-slate-100 tracking-wide">System Ready for Analysis</p>
              <p className="text-xs text-slate-300 mt-1">
                Upload a non-contrast brain CT slice and click Analyze
              </p>
            </div>
          )}
        </div>

        {/* 2. Probability Breakdown (3 Clear Bars - Instant Comparative Glance) */}
        {result?.classification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-2.5 sm:p-3 lg:p-3.5 rounded-lg sm:rounded-xl bg-slate-900/50 border border-white/5 space-y-2 sm:space-y-2.5 lg:space-y-3 shrink-0"
          >
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wide">
              <span>Probability Distribution</span>
            </div>

            <div className="space-y-1.5 sm:space-y-2 lg:space-y-2.5">
              {result.classification.classes.map((cls) => {
                const isPrimary = cls.id === predictedClass;
                return (
                  <div key={cls.id} className="space-y-0.5 sm:space-y-1">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className={isPrimary ? "text-white font-bold" : "text-slate-300 font-semibold"}>
                        {cls.label}
                      </span>
                      <span className="font-mono font-bold text-white text-xs sm:text-sm">
                        {cls.percentage}%
                      </span>
                    </div>

                    <div className="h-2 sm:h-2.5 lg:h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${cls.percentage}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          cls.id === "hemorrhagic"
                            ? "bg-rose-500"
                            : cls.id === "ischemic"
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* 3. Study & Model Specs (Compact Clean Grid) */}
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 p-2 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl bg-slate-900/40 border border-white/5 shrink-0 font-mono">
          <div>
            <span className="text-slate-400 block text-[10px] sm:text-[11px] font-bold tracking-wider mb-0.5">MODEL</span>
            <span className="font-bold text-xs sm:text-sm text-slate-100 truncate block">
              {result?.modelLabel ?? modelName}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] sm:text-[11px] font-bold tracking-wider mb-0.5">THRESHOLD</span>
            <span className="font-bold text-xs sm:text-sm text-slate-100">{threshold}%</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] sm:text-[11px] font-bold tracking-wider mb-0.5">MODALITY</span>
            <span className="font-bold text-xs sm:text-sm text-slate-100">Brain CT (Verified)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] sm:text-[11px] font-bold tracking-wider mb-0.5">MATRIX</span>
            <span className="font-bold text-xs sm:text-sm text-slate-100">512×512 Pixel</span>
          </div>
        </div>
      </div>

      {/* Bottom Action Group: Compact on mobile, spacious on desktop */}
      <div className="space-y-1.5 sm:space-y-2 pt-1.5 sm:pt-2 border-t border-white/10 shrink-0">
        {/* Action 1: Export Image (Primary Standout) */}
        <button
          onClick={onExportImage}
          disabled={!hasImage}
          className="w-full h-9 sm:h-10 lg:h-11 disabled:opacity-35 disabled:cursor-not-allowed text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-lg sm:rounded-xl flex items-center justify-center cursor-pointer transition-all active:scale-[0.99] bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white border border-blue-400/30 shadow-lg shadow-blue-950/40 select-none"
          title="Export composite annotated image"
        >
          <div className="w-[225px] max-w-full flex items-center gap-2.5 sm:gap-3 text-left">
            {exportedStatus === "image" ? (
              <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-300 shrink-0" strokeWidth={2.2} />
            ) : (
              <Image className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white shrink-0" strokeWidth={2} />
            )}
            <span className="truncate">{exportedStatus === "image" ? "Image Exported" : "Export Composite Image"}</span>
          </div>
        </button>

        {/* Action 2: Download Report (Secondary) */}
        <button
          onClick={onExportReport}
          disabled={!result}
          className="w-full h-9 sm:h-10 lg:h-11 disabled:opacity-35 disabled:cursor-not-allowed text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-lg sm:rounded-xl flex items-center justify-center cursor-pointer transition-all active:scale-[0.99] bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 hover:border-white/20 shadow-sm select-none"
          title="Download formal clinical diagnostic report"
        >
          <div className="w-[225px] max-w-full flex items-center gap-2.5 sm:gap-3 text-left">
            {exportedStatus === "report" ? (
              <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0" strokeWidth={2.2} />
            ) : (
              <FileDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-300 shrink-0" strokeWidth={2} />
            )}
            <span className="truncate">{exportedStatus === "report" ? "Report Downloaded" : "Download Clinical Report"}</span>
          </div>
        </button>

        {/* Action 3: Copy Summary */}
        <button
          onClick={onCopySummary}
          disabled={!result}
          className="w-full h-9 sm:h-10 lg:h-11 disabled:opacity-35 disabled:cursor-not-allowed text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-lg sm:rounded-xl flex items-center justify-center cursor-pointer transition-all active:scale-[0.99] bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 hover:border-white/20 shadow-sm select-none"
          title="Copy clinical text summary to clipboard"
        >
          <div className="w-[225px] max-w-full flex items-center gap-2.5 sm:gap-3 text-left">
            {copiedToast ? (
              <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0" strokeWidth={2.2} />
            ) : (
              <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-300 shrink-0" strokeWidth={2} />
            )}
            <span className="truncate">{copiedToast ? "Summary Copied" : "Copy Clinical Summary"}</span>
          </div>
        </button>
      </div>
    </section>
  );
}
