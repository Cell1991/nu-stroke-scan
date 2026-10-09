import React from "react";
import {
  Activity,
  AlertTriangle,
  Check,
  CheckCircle2,
  Copy,
  Download,
  FileText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
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
  return (
    <section className="col-span-3 flex flex-col gap-2.5 min-h-0 overflow-y-auto">
      <div className="rounded-2xl medical-glass-panel p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-white/5">
            <span className="text-sm font-semibold tracking-wide text-slate-200 flex items-center gap-2">
              <Activity className="h-4 w-4 text-slate-400" />
              Diagnostic Assessment
            </span>
            <span className="text-xs text-slate-400 font-mono px-2 py-0.5 rounded-md bg-slate-900/60 border border-white/5">
              CASE REPORT
            </span>
          </div>

          {/* Outcome Clinical Banner / Standby State */}
          <div>
            {result ? (
              result.classification?.predicted_class === "hemorrhagic" ? (
                <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/80 text-rose-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4.5 w-4.5 text-rose-400 shrink-0" />
                      <span className="font-bold text-sm tracking-tight text-rose-200">
                        HEMORRHAGIC STROKE
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded-full bg-rose-600 text-white shadow-sm">
                      {(result.classification.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white">Acute Hemorrhage Detected</p>
                  <p className="text-xs text-rose-300/80 leading-relaxed">
                    High-attenuation acute hemorrhagic lesion identified.
                  </p>
                </div>
              ) : result.classification?.predicted_class === "ischemic" ? (
                <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/80 text-amber-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4.5 w-4.5 text-amber-400 shrink-0" />
                      <span className="font-bold text-sm tracking-tight text-amber-200">
                        ISCHEMIC STROKE
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded-full bg-amber-600 text-white shadow-sm">
                      {result.classification
                        ? `${(result.classification.confidence * 100).toFixed(1)}%`
                        : "POSITIVE"}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white">Acute Ischemic Infarction</p>
                  <p className="text-xs text-amber-300/80 leading-relaxed">
                    Low attenuation ischemic territory segmented by neural model.
                  </p>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/80 text-emerald-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                      <span className="font-bold text-sm tracking-tight text-emerald-200">
                        NORMAL HEAD CT
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded-full bg-emerald-600 text-white shadow-sm">
                      {result.classification
                        ? `${(result.classification.confidence * 100).toFixed(1)}%`
                        : "NEGATIVE"}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white">No Acute Stroke Lesion</p>
                  <p className="text-xs text-emerald-300/80 leading-relaxed">
                    No acute infarction or hemorrhage observed above threshold cutoff.
                  </p>
                </div>
              )
            ) : (
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-3">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center mx-auto text-slate-400">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200">Diagnostic Engine Standby</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Upload a brain CT scan and click Analyze to generate deep learning lesion
                      segmentation, acute stroke probability, and volumetric quantification.
                    </p>
                  </div>
                </div>

                {/* Pre-Analysis Status Overview */}
                <div className="pt-2 border-t border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400 font-medium">Selected Model:</span>
                    <span className="text-slate-200 font-semibold">{modelName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400 font-medium">Sensitivity Threshold:</span>
                    <span className="font-mono text-slate-200 font-semibold">{threshold}%</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400 font-medium">Engine Status:</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Ready for Input
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Multi-Class Disease Classification Breakdown (MaxViT) */}
          {result?.classification && (
            <div className="space-y-2.5 p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-200 font-semibold tracking-wide">
                  <Sparkles className="h-3.5 w-3.5 text-slate-400" />
                  Disease Classification (MaxViT)
                </span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-200 border border-slate-700">
                  {result.classification.predicted_label}
                </span>
              </div>
              <div className="space-y-2 pt-1">
                {result.classification.classes.map((cls) => (
                  <div key={cls.id} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-slate-300">
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            cls.id === "hemorrhagic"
                              ? "bg-red-400"
                              : cls.id === "ischemic"
                              ? "bg-amber-400"
                              : "bg-emerald-400"
                          }`}
                        />
                        {cls.label}
                      </span>
                      <span className="font-mono text-white font-bold">{cls.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          cls.id === "hemorrhagic"
                            ? "bg-red-500"
                            : cls.id === "ischemic"
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                        }`}
                        style={{ width: `${cls.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Segmentation Model Confidence Meter */}
          {result && (
            <div className="space-y-2 p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span className="text-sm font-semibold text-slate-200">Segmentation Confidence</span>
                <span className="font-mono text-slate-200 font-bold text-sm">
                  {(result.confidence * 100).toFixed(1)}%
                </span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5">
                <div
                  className={`h-full transition-all duration-300 ${
                    result?.detected
                      ? "bg-rose-500"
                      : "bg-blue-600"
                  }`}
                  style={{ width: `${result.confidence * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Key Clinical Metrics Table */}
          <div className="space-y-2 text-xs sm:text-sm bg-slate-900/60 border border-white/5 rounded-xl p-3.5 text-slate-300">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400 font-medium">Neural Architecture:</span>
              <span className="font-semibold text-white">{result?.modelLabel ?? modelName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400 font-medium">Lesion ROI Volume:</span>
              <span className="font-mono text-slate-200 font-bold">
                {result ? `${result.lesionArea ?? 0}%` : "—"}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400 font-medium">Sensitivity Cutoff:</span>
              <span className="font-mono text-slate-200 font-semibold">{threshold}%</span>
            </div>
            {result?.modality && (
              <div className="flex justify-between py-1">
                <span className="text-slate-400 font-medium">Modality Gate:</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1.5 text-xs">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  Verified Brain CT ({(result.modality.confidence * 100).toFixed(1)}%)
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom-Right Stacked CTAs */}
        <div className="space-y-2.5 pt-3 border-t border-white/5">
          {/* Copy Clinical Summary */}
          <button
            onClick={onCopySummary}
            disabled={!result}
            className="btn-clinical-subtle w-full h-10 disabled:opacity-30 disabled:cursor-not-allowed text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            title="Copy clinical summary to clipboard"
          >
            {copiedToast ? (
              <Check className="h-4 w-4 text-emerald-400" />
            ) : (
              <Copy className="h-4 w-4 text-slate-300" />
            )}
            <span>{copiedToast ? "Summary Copied!" : "Copy Clinical Summary"}</span>
          </button>

          {/* Export Composite Image */}
          <button
            onClick={onExportImage}
            disabled={!hasImage}
            className="btn-clinical-cyan w-full h-10 disabled:opacity-30 disabled:cursor-not-allowed text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-sm"
            title="Export high-resolution annotated image composite with lesion mask overlay"
          >
            {exportedStatus === "image" ? (
              <CheckCircle2 className="h-4 w-4 text-white" />
            ) : (
              <Download className="h-4 w-4 text-white" />
            )}
            <span>{exportedStatus === "image" ? "Image Exported!" : "Export Composite Image"}</span>
          </button>

          {/* Download Clinical Report */}
          <button
            onClick={onExportReport}
            disabled={!result}
            className="btn-clinical-teal w-full h-11 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-sm"
            title="Download formal clinical diagnostic summary text report"
          >
            {exportedStatus === "report" ? (
              <CheckCircle2 className="h-4 w-4 text-white" />
            ) : (
              <FileText className="h-4 w-4" />
            )}
            <span>{exportedStatus === "report" ? "Report Downloaded!" : "Download Clinical Report"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
