"use client";

import { useEffect, useRef, useState } from "react";
import { MODELS, MAX_FILE_SIZE } from "@/constants/models";
import { PanOffset, PredictionResult } from "@/types";
import { exportMedicalComposite } from "@/utils/canvasExport";
import { recomputeMaskFromProbability } from "@/utils/maskRecompute";
import { exportClinicalReportFile, generateClinicalSummaryText } from "@/utils/reportExport";

import { HeaderBar } from "@/components/header/HeaderBar";
import { ScanIngestionPanel } from "@/components/ingestion/ScanIngestionPanel";
import { DualViewport } from "@/components/viewport/DualViewport";
import { DisplayCalibrationPanel } from "@/components/controls/DisplayCalibrationPanel";
import { DiagnosticPanel } from "@/components/diagnostic/DiagnosticPanel";

interface CachedModelAnalysis {
  result: PredictionResult;
  probData: { width: number; height: number; data: Uint8ClampedArray } | null;
}

export default function Home() {
  const probDataRef = useRef<{ width: number; height: number; data: Uint8ClampedArray } | null>(null);
  const dragStartRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const allModelsCacheRef = useRef<Record<string, CachedModelAnalysis>>({});

  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isDraggingViewport, setIsDraggingViewport] = useState(false);
  const [exportedStatus, setExportedStatus] = useState<string | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);

  // Model & Display Controls
  const [modelId, setModelId] = useState("vcanet");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [maskOpacity, setMaskOpacity] = useState(85);
  const [threshold, setThreshold] = useState(50);

  // Viewport Zoom, Pan & Fine Grid Controls
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState<PanOffset>({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState(false);

  // Diagnostic Loupe State
  const [loupe, setLoupe] = useState<{
    active: boolean;
    x: number;
    y: number;
    normX: number;
    normY: number;
    target: "left" | "right" | null;
    scale: number;
  }>({
    active: false,
    x: 0,
    y: 0,
    normX: 0.5,
    normY: 0.5,
    target: null,
    scale: 3.0,
  });

  const activeModel = MODELS.find((m) => m.id === modelId) ?? MODELS[0];

  useEffect(() => {
    return () => {
      if (imageUrl && imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  function handleZoomIn() {
    setZoom((prev) => Math.min(4, Number((prev + 0.25).toFixed(2))));
  }

  function handleZoomOut() {
    setZoom((prev) => Math.max(0.5, Number((prev - 0.25).toFixed(2))));
  }

  function handleResetZoom() {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }

  function toggleGrid() {
    setShowGrid((prev) => !prev);
  }

  function resetControls() {
    setBrightness(100);
    setContrast(100);
    setMaskOpacity(85);
    applyThreshold(50);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setShowGrid(false);
    setLoupe((prev) => ({ ...prev, active: false }));
  }

  function handleViewportMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    if (e.button === 2) return;
    setIsDraggingViewport(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  }

  function handleViewportMouseMove(e: React.MouseEvent<HTMLDivElement>, targetSide: "left" | "right") {
    if (loupe.active) {
      const rect = e.currentTarget.getBoundingClientRect();
      const rawX = e.clientX - rect.left;
      const rawY = e.clientY - rect.top;
      const normX = Math.max(0, Math.min(1, rawX / rect.width));
      const normY = Math.max(0, Math.min(1, rawY / rect.height));

      setLoupe((prev) => ({
        ...prev,
        x: rawX,
        y: rawY,
        normX,
        normY,
        target: targetSide,
      }));
      return;
    }

    if (!isDraggingViewport || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPan({
      x: dragStartRef.current.panX + dx,
      y: dragStartRef.current.panY + dy,
    });
  }

  function handleViewportMouseUp() {
    setIsDraggingViewport(false);
    dragStartRef.current = null;
  }

  function handlePanStep(dx: number, dy: number) {
    setPan((prev) => ({
      x: Math.round(prev.x + dx),
      y: Math.round(prev.y + dy),
    }));
  }

  function handleResetPan() {
    setPan({ x: 0, y: 0 });
  }

  function handleViewportContextMenu(e: React.MouseEvent<HTMLDivElement>, targetSide: "left" | "right") {
    e.preventDefault();
    if (!imageUrl) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    const normX = Math.max(0, Math.min(1, rawX / rect.width));
    const normY = Math.max(0, Math.min(1, rawY / rect.height));

    setLoupe((prev) => ({
      ...prev,
      active: !prev.active || prev.target !== targetSide,
      x: rawX,
      y: rawY,
      normX,
      normY,
      target: targetSide,
      scale: prev.scale < 3.0 ? 3.0 : prev.scale,
    }));
  }

  function handleViewportWheel(e: React.WheelEvent<HTMLDivElement>, targetSide: "left" | "right") {
    e.preventDefault();
    e.stopPropagation();

    if (loupe.active && loupe.target === targetSide) {
      const delta = e.deltaY < 0 ? 0.3 : -0.3;
      setLoupe((prev) => ({
        ...prev,
        scale: Math.max(1.5, Math.min(6.0, Number((prev.scale + delta).toFixed(1)))),
      }));
      return;
    }

    if (e.deltaY < 0) {
      setZoom((prev) => Math.min(4, Number((prev + 0.15).toFixed(2))));
    } else {
      setZoom((prev) => Math.max(0.5, Number((prev - 0.15).toFixed(2))));
    }
  }

  async function extractProbDataFromB64(
    probB64: string
  ): Promise<{ width: number; height: number; data: Uint8ClampedArray } | null> {
    if (!probB64) return null;
    return new Promise((resolve) => {
      const probImg = new Image();
      probImg.crossOrigin = "anonymous";
      probImg.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = probImg.width || 512;
        canvas.height = probImg.height || 512;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(null);
          return;
        }
        ctx.drawImage(probImg, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        resolve({
          width: canvas.width,
          height: canvas.height,
          data: imgData.data,
        });
      };
      probImg.onerror = () => resolve(null);
      probImg.src = `data:image/png;base64,${probB64}`;
      setTimeout(() => resolve(null), 3500);
    });
  }

  function handleFile(selectedFile: File) {
    setError(null);
    setResult(null);
    probDataRef.current = null;
    allModelsCacheRef.current = {};
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid brain CT scan image (PNG or JPG).");
      return;
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File size exceeds 25 MB.");
      return;
    }
    if (imageUrl && imageUrl.startsWith("blob:")) {
      URL.revokeObjectURL(imageUrl);
    }
    setFile(selectedFile);
    setImageUrl(URL.createObjectURL(selectedFile));
  }

  function handleClearScan() {
    setFile(null);
    setImageUrl(null);
    setResult(null);
    probDataRef.current = null;
    allModelsCacheRef.current = {};
    setError(null);
  }

  function applyThreshold(
    newThreshold: number,
    overrideClass?: string,
    overrideProbData?: { width: number; height: number; data: Uint8ClampedArray } | null,
    targetResult?: PredictionResult | null
  ) {
    setThreshold(newThreshold);
    const baseResult = targetResult !== undefined ? targetResult : result;
    const strokeClass = overrideClass ?? baseResult?.classification?.predicted_class;
    const activeProbData = overrideProbData !== undefined ? overrideProbData : probDataRef.current;
    const recomputed = recomputeMaskFromProbability({
      probData: activeProbData,
      threshold: newThreshold,
      strokeClass,
    });

    if (recomputed) {
      setResult((prev) => (prev ? { ...prev, ...recomputed } : null));
    }
  }

  function handleModelChange(newModelId: string) {
    setModelId(newModelId);
    const cached = allModelsCacheRef.current[newModelId];
    if (cached) {
      probDataRef.current = cached.probData;
      setResult(cached.result);
      applyThreshold(
        threshold,
        cached.result.classification?.predicted_class,
        cached.probData,
        cached.result
      );
    }
  }

  async function runInference() {
    if (!file) {
      setError("Please select or drop a CT scan file first.");
      return;
    }
    setIsScanning(true);
    setError(null);

    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      document.getElementById("viewport-panel")?.scrollIntoView({ behavior: "smooth" });
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("model", modelId);
      formData.append("threshold", String(threshold / 100));

      const res = await fetch(`/api/predict?model=${encodeURIComponent(modelId)}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errPayload = await res.json().catch(() => ({}));
        const message =
          errPayload.detail?.message ||
          errPayload.detail ||
          errPayload.error ||
          `Server returned ${res.status}`;
        throw new Error(typeof message === "string" ? message : JSON.stringify(message));
      }

      interface RawInferenceModelOutput {
        prob_png_base64?: string;
        mask_base64?: string;
        mask_png_base64?: string;
        label?: string;
        confidence?: number;
        detected?: boolean;
        lesion_detected?: boolean;
        lesion_area?: number;
        lesion_area_percentage?: number;
        model_label?: string;
        input_size?: [number, number];
        classification?: PredictionResult["classification"];
        modality?: PredictionResult["modality"];
      }

      const data = await res.json();

      // Print received detection results for all models to browser console
      console.group("[NU STROKE SCAN] Inference Results Received");
      console.log("Raw Response Data:", data);

      if (data.modality) {
        console.group("Modality Screener (ResNet-18)");
        console.log(`Status: ${data.modality.is_valid ? "VALID BRAIN CT" : "INVALID"}`);
        console.log(`Brain CT Probability: ${(Number(data.modality.brain_ct_probability ?? 0) * 100).toFixed(2)}%`);
        console.log(`Confidence: ${(Number(data.modality.confidence ?? 0) * 100).toFixed(2)}%`);
        console.groupEnd();
      }

      if (data.classification) {
        console.group("Disease Classifier (MaxViT)");
        console.log(`Prediction: ${data.classification.predicted_label} (${data.classification.predicted_class})`);
        console.log(`Confidence: ${(Number(data.classification.confidence ?? 0) * 100).toFixed(2)}%`);
        if (data.classification.classes) {
          console.table(data.classification.classes);
        }
        console.groupEnd();
      }

      const rawModels = (data.models && typeof data.models === "object" ? data.models : { [modelId]: data }) as Record<string, RawInferenceModelOutput>;

      console.group("Segmentation Models Detection Summary");
      Object.entries(rawModels).forEach(([mId, mData]) => {
        const detected = Boolean(mData.detected ?? mData.lesion_detected);
        const area = mData.lesion_area ?? mData.lesion_area_percentage ?? 0;
        const conf = Number(mData.confidence ?? 0);
        console.log(`• Model [${mData.model_label || mId}]:`, {
          detection: detected ? "LESION DETECTED" : "NO LESION",
          confidence: `${(conf * 100).toFixed(2)}%`,
          lesionArea: `${area}%`,
          label: mData.label,
        });
      });
      console.groupEnd();
      console.groupEnd();

      const newCache: Record<string, CachedModelAnalysis> = {};

      for (const [mId, mData] of Object.entries(rawModels)) {
        const probB64 = mData.prob_png_base64 || mData.mask_base64 || mData.mask_png_base64;
        const initialMaskUrl = (mData.mask_base64 || mData.mask_png_base64)
          ? `data:image/png;base64,${mData.mask_base64 || mData.mask_png_base64}`
          : "";
        const pData = probB64 ? await extractProbDataFromB64(probB64) : null;
        const matchingModelOption = MODELS.find((m) => m.id === mId);

        newCache[mId] = {
          probData: pData,
          result: {
            label: mData.label || "Analysis Complete",
            confidence: Number(mData.confidence ?? 0.95),
            maskUrl: initialMaskUrl,
            detected: Boolean(mData.detected ?? mData.lesion_detected),
            lesionArea: mData.lesion_area ?? mData.lesion_area_percentage ?? 0,
            modelLabel: mData.model_label || matchingModelOption?.name || mId,
            inputSize: mData.input_size || [512, 512],
            classification: mData.classification || null,
            modality: mData.modality || null,
          },
        };
      }

      allModelsCacheRef.current = newCache;

      const activeAnalysis = newCache[modelId] || Object.values(newCache)[0];
      if (activeAnalysis) {
        probDataRef.current = activeAnalysis.probData;
        setResult(activeAnalysis.result);
        applyThreshold(
          threshold,
          activeAnalysis.result.classification?.predicted_class,
          activeAnalysis.probData,
          activeAnalysis.result
        );
      }
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Inference failed. Please ensure the backend is running.");
    } finally {
      setIsScanning(false);
    }
  }

  function exportAnnotatedImage() {
    if (!imageUrl) return;
    exportMedicalComposite({
      imageUrl,
      file,
      result,
      probData: probDataRef.current,
      calibration: { brightness, contrast, maskOpacity, threshold },
      modelName: activeModel.name,
      onSuccess: () => {
        setExportedStatus("image");
        setTimeout(() => setExportedStatus(null), 2500);
      },
    });
  }

  function copySummaryToClipboard() {
    if (!result || !file) return;
    const text = generateClinicalSummaryText({
      result,
      fileName: file.name,
      modelName: activeModel.name,
      threshold,
    });
    navigator.clipboard.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  }

  async function exportReportText() {
    if (!result || !file) return;
    await exportClinicalReportFile({
      result,
      fileName: file.name,
      modelName: activeModel.name,
      threshold,
      imageUrl: imageUrl || undefined,
      probData: probDataRef.current,
    });
    setExportedStatus("report");
    setTimeout(() => setExportedStatus(null), 2500);
  }

  return (
    <div className="min-h-screen w-full lg:h-screen lg:w-screen flex flex-col overflow-y-auto lg:overflow-hidden font-sans select-none bg-[#080a0f] text-slate-100 scroll-smooth">
      <HeaderBar />

      <main className="flex-1 flex flex-col lg:grid lg:grid-cols-12 lg:min-h-0 lg:overflow-hidden">
        <ScanIngestionPanel
          file={file}
          imageUrl={imageUrl}
          error={error}
          isScanning={isScanning}
          modelId={modelId}
          onModelChange={handleModelChange}
          onFileSelect={handleFile}
          onClearScan={handleClearScan}
          onRunInference={runInference}
        />

        <section
          id="viewport-panel"
          className="w-full lg:col-span-6 flex flex-col lg:min-h-0 lg:h-full border-b lg:border-b-0 lg:border-r border-slate-800/80 lg:overflow-hidden"
        >
          <DualViewport
            imageUrl={imageUrl}
            result={result}
            modelName={activeModel.name}
            isScanning={isScanning}
            errorMessage={error}
            zoom={zoom}
            pan={pan}
            showGrid={showGrid}
            brightness={brightness}
            contrast={contrast}
            maskOpacity={maskOpacity}
            loupe={loupe}
            isDraggingViewport={isDraggingViewport}
            onMouseDown={handleViewportMouseDown}
            onMouseMove={handleViewportMouseMove}
            onMouseUp={handleViewportMouseUp}
            onContextMenu={handleViewportContextMenu}
            onWheel={handleViewportWheel}
            onAnalyze={runInference}
            onClear={handleClearScan}
            onPanStep={handlePanStep}
            onResetPan={handleResetPan}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetZoom={handleResetZoom}
            onToggleGrid={toggleGrid}
            onResetAll={resetControls}
          />

          <DisplayCalibrationPanel
            zoom={zoom}
            showGrid={showGrid}
            brightness={brightness}
            contrast={contrast}
            maskOpacity={maskOpacity}
            threshold={threshold}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetZoom={handleResetZoom}
            onToggleGrid={toggleGrid}
            onResetAll={resetControls}
            onBrightnessChange={setBrightness}
            onContrastChange={setContrast}
            onMaskOpacityChange={setMaskOpacity}
            onThresholdChange={applyThreshold}
          />
        </section>

        <DiagnosticPanel
          result={result}
          modelName={activeModel.name}
          threshold={threshold}
          hasImage={Boolean(imageUrl)}
          copiedToast={copiedToast}
          exportedStatus={exportedStatus}
          onCopySummary={copySummaryToClipboard}
          onExportImage={exportAnnotatedImage}
          onExportReport={exportReportText}
        />
      </main>
    </div>
  );
}
