import React, { DragEvent, useRef, useState } from "react";
import { Activity, Cpu, RefreshCw, UploadCloud } from "lucide-react";
import { motion } from "motion/react";
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
    <section
      id="ingestion-panel"
      className="w-full lg:col-span-3 flex flex-col lg:min-h-0 lg:h-full lg:overflow-hidden bg-[#0c1017] border-b lg:border-b-0 lg:border-r border-slate-800/80 p-2.5 sm:p-3.5 lg:p-3.5 justify-between gap-3 lg:gap-0"
    >
      {/* Top Section: Study Ingestion & Models */}
      <div className="flex flex-col gap-2.5 sm:gap-3 lg:gap-3.5 lg:overflow-hidden">
        {/* Header */}
        <div className="h-7 sm:h-8 flex items-center justify-between pb-1.5 sm:pb-2 border-b border-white/10 shrink-0">
          <span className="text-xs font-bold tracking-wider text-slate-200 uppercase flex items-center gap-2">
            <UploadCloud className="h-4 w-4 text-blue-400" />
            Patient Study Ingestion
          </span>
          {file && (
            <button
              onClick={onClearScan}
              className="text-xs sm:text-sm font-bold text-rose-400 hover:text-rose-300 cursor-pointer transition-colors px-2 py-0.5 rounded-lg hover:bg-rose-950/50"
            >
              Clear
            </button>
          )}
        </div>

        {/* Upload / Loaded Scan Card (Enhanced Clinical Dropzone) */}
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
          className={`group relative rounded-xl flex items-center justify-center text-center cursor-pointer transition-all overflow-hidden shrink-0 select-none ${
            imageUrl
              ? "h-40 sm:h-48 lg:h-56 p-2 sm:p-3 bg-slate-900/60 border border-slate-700/80 hover:border-slate-600 shadow-inner"
              : "h-32 sm:h-38 lg:h-44 p-3 sm:p-4 border border-dashed border-blue-500/30 hover:border-blue-400/60 bg-gradient-to-b from-blue-950/20 via-slate-900/60 to-slate-950/80 hover:bg-slate-900/80 hover:shadow-[0_0_24px_rgba(59,130,246,0.15)] shadow-sm"
          } ${isDragging ? "border-blue-400 bg-blue-950/40 ring-2 ring-blue-500/30" : ""}`}
        >
          {/* Subtle Ambient Radial Glow */}
          {!imageUrl && (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_75%)] pointer-events-none group-hover:bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.18),transparent_75%)] transition-colors duration-500" />
          )}

          {imageUrl ? (
            <div className="flex flex-col items-center justify-center h-full w-full gap-2 relative z-10">
              <div className="flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden">
                <img
                  src={imageUrl}
                  alt="Loaded Scan"
                  className="h-full w-full max-h-32 sm:max-h-36 lg:max-h-40 object-contain rounded-lg bg-black border border-slate-800/80 shadow-md"
                />
              </div>
              <div className="text-center w-full px-2 shrink-0">
                <p className="text-xs font-semibold text-slate-100 truncate">
                  {file?.name ?? "Axial Brain Slice"}
                </p>
                <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono mt-0.5">
                  512×512 Pixel • Axial NCCT
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5 sm:gap-2 relative z-10">
              {/* Animated Icon Badge with Sonar Ping */}
              <div className="relative flex items-center justify-center mb-0.5">
                <div className="absolute h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-blue-500/15 animate-ping opacity-25 pointer-events-none" />
                <div className="relative h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600/30 via-blue-950/60 to-slate-900 border border-blue-400/35 shadow-md shadow-blue-500/15 flex items-center justify-center group-hover:scale-105 group-hover:border-blue-400/60 transition-all duration-300">
                  <UploadCloud className="h-4 w-4 sm:h-4.5 sm:w-4.5 lg:h-5 lg:w-5 text-blue-400 group-hover:text-blue-300 transition-colors group-hover:-translate-y-0.5 duration-300 animate-pulse" />
                </div>
              </div>

              {/* Action Prompt */}
              <p className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white transition-colors tracking-wide">
                Drop CT Slice or Click to Browse
              </p>

              {/* Medical Specs Pill with Glowing Pulse Dot */}
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-950/40 border border-blue-500/25 text-[10px] sm:text-[11px] font-mono font-medium text-blue-300/90 group-hover:border-blue-400/40 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]" />
                <span>PNG / JPG • 512×512 Pixel</span>
              </div>
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFileSelect(f);
          }}
          className="hidden"
        />

        {/* Model Selection Header */}
        <div className="shrink-0 pt-0.5 sm:pt-1">
          <span className="text-xs font-bold tracking-wider text-slate-200 uppercase flex items-center gap-2 mb-1.5 sm:mb-2 lg:mb-2.5">
            <Cpu className="h-4 w-4 text-blue-400" />
            Segmentation Model
          </span>

          {/* Models Radio List */}
          <div className="space-y-1.5 sm:space-y-2 lg:space-y-2.5">
            {MODELS.map((m) => {
              const isSelected = modelId === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => onModelChange(m.id)}
                  className={`w-full px-3 py-2 sm:px-3.5 sm:py-2.5 lg:px-4 lg:py-3 rounded-xl text-left transition-all cursor-pointer select-none border relative overflow-hidden ${
                    isSelected
                      ? "bg-gradient-to-r from-blue-600/35 via-indigo-600/25 to-blue-950/60 border-blue-400 ring-2 ring-blue-500/40 shadow-xl shadow-blue-950/70"
                      : "bg-[#090d14]/75 hover:bg-slate-900/60 text-slate-400 border-white/[0.05] hover:border-slate-700/80 opacity-70 hover:opacity-100"
                  }`}
                >
                  {/* Active glowing accent strip and top illumination */}
                  {isSelected && (
                    <>
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-300 via-blue-400 to-indigo-500 shadow-[0_0_12px_rgba(56,189,248,1)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_0%,rgba(96,165,250,0.2),transparent)] pointer-events-none" />
                    </>
                  )}

                  <div className="flex items-center justify-between relative z-10">
                    <span className={`font-black text-xs sm:text-sm tracking-wide ${isSelected ? "text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]" : "text-slate-300"}`}>
                      {m.name}
                    </span>

                    <span
                      className={`text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-md border transition-all ${
                        isSelected
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-300/60 text-white font-extrabold shadow-md shadow-blue-600/40 ring-1 ring-blue-400/40"
                          : "bg-slate-950/80 border-white/[0.05] text-slate-400"
                      }`}
                    >
                      {m.tag}
                    </span>
                  </div>

                  <p
                    className={`text-[11px] sm:text-xs mt-0.5 sm:mt-1 lg:mt-1.5 leading-snug sm:leading-relaxed relative z-10 transition-colors ${
                      isSelected ? "text-blue-100 font-semibold" : "text-slate-400/80"
                    }`}
                  >
                    {m.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section: Telemetry & Primary Action */}
      <div className="space-y-2 lg:space-y-2.5 pt-2 lg:pt-2.5 border-t border-white/10 shrink-0">
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 p-2 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl bg-slate-900/60 border border-white/10 font-mono">
          <div>
            <span className="text-slate-400 block text-[10px] sm:text-[11px] font-bold tracking-wider mb-0.5">MATRIX</span>
            <span className="text-slate-100 font-bold text-xs sm:text-sm">512×512 Pixel</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] sm:text-[11px] font-bold tracking-wider mb-0.5">CLASSIFIER</span>
            <span className="text-slate-100 font-bold text-xs sm:text-sm">MaxViT Multi-Class</span>
          </div>
        </div>

        <motion.button
          whileHover={!isScanning && imageUrl ? { scale: 1.015 } : {}}
          whileTap={!isScanning && imageUrl ? { scale: 0.985 } : {}}
          onClick={onRunInference}
          disabled={isScanning || !imageUrl}
          className={`w-full h-12 sm:h-14 lg:h-16 py-2.5 sm:py-3.5 lg:py-4 rounded-xl lg:rounded-2xl font-black text-sm sm:text-base uppercase tracking-wider transition-all flex items-center justify-center cursor-pointer select-none shadow-xl ${
            isScanning || !imageUrl
              ? "bg-slate-800/40 text-slate-500 border border-white/5 cursor-not-allowed shadow-none"
              : "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white border border-blue-400/40 shadow-blue-900/50 hover:shadow-blue-600/30 ring-1 ring-blue-400/30"
          }`}
        >
          {isScanning ? (
            <div className="flex items-center gap-2.5 sm:gap-3">
              <RefreshCw className="h-5 w-5 lg:h-6 lg:w-6 animate-spin text-white" />
              <span>Processing Scan...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 sm:gap-3">
              <Activity className="h-5 w-5 lg:h-6 lg:w-6 text-white" strokeWidth={2.5} />
              <span>Analyze Brain CT</span>
            </div>
          )}
        </motion.button>
      </div>
    </section>
  );
}
