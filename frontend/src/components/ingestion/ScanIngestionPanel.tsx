import React, { DragEvent, useRef, useState } from "react";
import { Activity, AlertTriangle, Brain, RefreshCw, ShieldAlert, ShieldCheck, UploadCloud } from "lucide-react";
import { MODELS } from "@/constants/models";

interface ScanIngestionPanelProps {
  file: File | null;
  imageUrl: string | null;
  error: string | null;
  isScanning: boolean;
  modelId: string;
  onModelChange: (modelId: string) => void;
  onFileSelect: (file: File) => void;
  onClearScan: () => void;
  onRunInference: () => void;
}

export function ScanIngestionPanel({
  file,
  imageUrl,
  error,
  isScanning,
  modelId,
  onModelChange,
  onFileSelect,
  onClearScan,
  onRunInference,
}: ScanIngestionPanelProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) onFileSelect(droppedFile);
  }

  return (
    <section className="col-span-3 flex flex-col gap-2.5 min-h-0 overflow-y-auto pr-0.5">
      {/* Patient Scan Ingestion */}
      <div className="rounded-2xl medical-glass-panel p-4 flex flex-col shrink-0">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-sm font-bold tracking-wider text-sky-400 uppercase flex items-center gap-2">
            <UploadCloud className="h-4.5 w-4.5 text-sky-400" />
            Patient CT Scan
          </span>
          {file && (
            <button
              onClick={onClearScan}
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 cursor-pointer transition-colors px-2 py-0.5 rounded-lg hover:bg-rose-950/40"
            >
              Clear Scan
            </button>
          )}
        </div>

        {/* Drag & Drop Upload Zone */}
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          onDrop={handleDrop}
          className={`h-48 xl:h-56 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 relative overflow-hidden p-4 ${
            isDragging
              ? "border-sky-400 bg-sky-950/40 scale-[1.01]"
              : "border-slate-700/80 hover:border-sky-400/80 bg-slate-900/50 hover:bg-slate-900/80 active:scale-[0.99]"
          }`}
        >
          {imageUrl ? (
            <div className="flex flex-col items-center gap-2.5 px-2 w-full">
              <div className="relative">
                <img
                  src={imageUrl}
                  alt="Loaded Scan"
                  className="h-20 w-20 xl:h-24 xl:w-24 object-contain rounded-xl border border-slate-700 bg-black shadow-md"
                />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-xs text-white font-bold">
                  ✓
                </span>
              </div>
              <div className="text-center w-full">
                <p className="text-sm font-bold text-white truncate max-w-[220px] mx-auto">
                  {file?.name ?? "Loaded Slice"}
                </p>
                <p className="text-xs font-medium text-sky-400 mt-1">
                  Click or drag new slice to replace
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3 py-1">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center mx-auto text-sky-400 shadow-sm">
                <UploadCloud className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-100">Drop Brain CT or Browse</p>
                <p className="text-xs text-slate-400 font-medium mt-1">
                  Supports DICOM, NIfTI, PNG, JPG (Max 25MB)
                </p>
              </div>
              <span className="inline-block px-4 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-sky-400/50 text-sky-300 text-xs font-semibold shadow-sm transition-colors">
                Select File
              </span>
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFileSelect(f);
          }}
          className="hidden"
        />

        {error && (
          <div
            className={`mt-2.5 p-3 rounded-xl border text-xs font-medium space-y-2.5 transition-all ${
              error.includes("Brain CT") || error.includes("ไม่ใช่ภาพ")
                ? "bg-rose-950/80 border-rose-500/80 text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.3)] animate-pulse"
                : "bg-red-950/60 border-red-500/50 text-red-200"
            }`}
          >
            <div className="flex items-start gap-2.5">
              {error.includes("Brain CT") || error.includes("ไม่ใช่ภาพ") ? (
                <ShieldAlert className="h-5 w-5 shrink-0 text-rose-400 mt-0.5" />
              ) : (
                <AlertTriangle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-white flex items-center gap-1.5">
                  {error.includes("Brain CT") || error.includes("ไม่ใช่ภาพ")
                    ? "ตรวจพบภาพไม่ถูกต้อง (Invalid Modality)"
                    : "เกิดข้อผิดพลาดในการประมวลผล"}
                </p>
                <p className="text-xs text-rose-300 mt-1 leading-relaxed">{error}</p>
              </div>
            </div>
            {(error.includes("Brain CT") || error.includes("ไม่ใช่ภาพ")) && (
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => {
                    onClearScan();
                    inputRef.current?.click();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <UploadCloud className="h-3.5 w-3.5" />
                  เลือกภาพ Brain CT ใหม่
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Neural Architecture & Inference */}
      <div className="rounded-2xl medical-glass-panel p-4 flex flex-col flex-1 min-h-0 justify-between">
        <div>
          <span className="text-sm font-bold tracking-wider text-sky-400 uppercase flex items-center gap-2 mb-3 shrink-0">
            <Brain className="h-4.5 w-4.5 text-sky-400" />
            Neural Architecture
          </span>

          {/* Model Architecture Buttons */}
          <div className="space-y-2.5 mb-3 overflow-y-auto">
            {MODELS.map((m) => {
              const isSelected = modelId === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => onModelChange(m.id)}
                  className={`w-full py-3 px-3.5 rounded-xl text-left transition-all cursor-pointer select-none border ${
                    isSelected
                      ? "bg-slate-800/95 border-sky-400/80 text-white shadow-lg shadow-sky-500/10 font-bold"
                      : "bg-slate-900/50 hover:bg-slate-800/60 text-slate-300 hover:text-white border-white/5 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          isSelected ? "bg-sky-400 shadow-[0_0_8px_#38bdf8]" : "bg-slate-600"
                        }`}
                      />
                      <span className="text-sm font-bold">{m.name}</span>
                    </div>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold ${
                        isSelected
                          ? "bg-sky-500/20 text-sky-300 border border-sky-400/30"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {isSelected ? "ACTIVE" : m.tag}
                    </span>
                  </div>
                  <div
                    className={`text-xs mt-1 pl-5 ${
                      isSelected ? "text-sky-300/90 font-medium" : "text-slate-400"
                    }`}
                  >
                    {m.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Group: Telemetry Info + Primary CTA Button */}
        <div className="space-y-3 pt-2">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Analysis Matrix:</span>
              <span className="font-mono text-slate-200 font-semibold">512 × 512 DICOM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Classifier:</span>
              <span className="text-sky-300 font-semibold">MaxViT Multi-Class</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Modality Screening:</span>
              <span className="text-sky-300 font-semibold flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-sky-400" />
                ResNet-18 Gatekeeper
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Lesion Segmentation:</span>
              <span className="text-emerald-300 font-semibold">Dense Attention Mask</span>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={onRunInference}
            disabled={isScanning || !imageUrl}
            className={`relative overflow-hidden h-12 w-full rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center cursor-pointer select-none active:scale-[0.98] shadow-md ${
              isScanning || !imageUrl
                ? "bg-slate-800/60 text-slate-500 border border-white/5 cursor-not-allowed shadow-none"
                : "btn-clinical-primary text-white"
            }`}
          >
            {isScanning ? (
              <div className="flex items-center justify-center gap-2.5">
                <RefreshCw className="h-4.5 w-4.5 animate-spin text-white" />
                <span>ANALYZING CT SCAN...</span>
              </div>
            ) : (
              <span className="flex items-center gap-2">
                <Activity className="h-4.5 w-4.5 text-sky-200" />
                ANALYZE BRAIN CT SCAN
              </span>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
