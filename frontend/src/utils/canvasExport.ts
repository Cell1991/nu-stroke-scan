import { DisplayCalibration, PredictionResult } from "@/types";

export interface ExportCompositeParams {
  imageUrl: string;
  file: File | null;
  result: PredictionResult | null;
  probData: { width: number; height: number; data: Uint8ClampedArray } | null;
  calibration: DisplayCalibration;
  modelName: string;
  onSuccess?: () => void;
}

export function exportMedicalComposite({
  imageUrl,
  file,
  result,
  probData,
  calibration,
  modelName,
  onSuccess,
}: ExportCompositeParams): void {
  if (!imageUrl) return;

  const baseImg = new Image();
  baseImg.crossOrigin = "anonymous";

  baseImg.onload = () => {
    const origW = baseImg.naturalWidth || 512;
    const origH = baseImg.naturalHeight || 512;

    // Scale up small scans to high-resolution (min 512x512) for publication/PACS grade quality
    const scanDisplaySize = Math.max(origW, origH, 512);
    const scanW = scanDisplaySize;
    const scanH = scanDisplaySize;

    const pad = 24;
    const headerH = 60;
    const footerH = 88;
    const canvasW = scanW + pad * 2;
    const canvasH = scanH + headerH + footerH + pad * 2;

    const canvas = document.createElement("canvas");
    canvas.width = canvasW;
    canvas.height = canvasH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. Sleek Medical Dark Slate Backdrop (#080c15)
    ctx.fillStyle = "#080c15";
    ctx.fillRect(0, 0, canvasW, canvasH);

    // Top Accent Line (Sky blue gradient)
    const grad = ctx.createLinearGradient(0, 0, canvasW, 0);
    grad.addColorStop(0, "#0284c7");
    grad.addColorStop(0.5, "#38bdf8");
    grad.addColorStop(1, "#6366f1");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvasW, 3);

    // 2. Header Section
    ctx.font = "bold 15px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillStyle = "#38bdf8";
    ctx.fillText("NU STROKE SCAN", pad, 28);

    ctx.font = "500 12px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText("Neuro-Imaging Clinical Intelligence · Naresuan University Hospital", pad, 46);

    // Header Right (Date & Resolution)
    const now = new Date();
    const pad2 = (n: number) => String(n).padStart(2, "0");
    const dateStr = `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())} ${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
    ctx.textAlign = "right";
    ctx.font = "600 12px monospace";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText(dateStr, canvasW - pad, 28);

    ctx.font = "500 11px monospace";
    ctx.fillStyle = "#64748b";
    ctx.fillText(`AXIAL CT · ${origW} × ${origH} px`, canvasW - pad, 46);
    ctx.textAlign = "left";

    // Header Divider Line
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, headerH);
    ctx.lineTo(canvasW - pad, headerH);
    ctx.stroke();

    // 3. Central CT Scan Area
    const scanX = pad;
    const scanY = headerH + pad;

    ctx.fillStyle = "#000000";
    ctx.fillRect(scanX, scanY, scanW, scanH);

    // Draw CT with active brightness & contrast
    ctx.save();
    ctx.filter = `brightness(${calibration.brightness}%) contrast(${calibration.contrast}%)`;
    ctx.drawImage(baseImg, scanX, scanY, scanW, scanH);
    ctx.restore();

    // Draw Lesion Mask DIRECTLY from probData using active threshold & opacity
    if (probData) {
      const { width: pW, height: pH, data: pData } = probData;
      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = pW;
      maskCanvas.height = pH;
      const maskCtx = maskCanvas.getContext("2d");
      if (maskCtx) {
        const maskImgData = maskCtx.createImageData(pW, pH);
        const out = maskImgData.data;
        const cutoff = Math.round((calibration.threshold / 100) * 255);

        const isIschemic = result?.classification?.predicted_class === "ischemic";
        const maskR = isIschemic ? 234 : 239;
        const maskG = isIschemic ? 179 : 68;
        const maskB = isIschemic ? 8 : 68;

        const totalPixels = pW * pH;
        for (let i = 0; i < totalPixels; i++) {
          const idx = i * 4;
          const prob = pData[idx];
          if (prob >= cutoff) {
            out[idx] = maskR;
            out[idx + 1] = maskG;
            out[idx + 2] = maskB;
            out[idx + 3] = 255;
          } else {
            out[idx + 3] = 0;
          }
        }
        maskCtx.putImageData(maskImgData, 0, 0);

        // Draw onto composite canvas with current active maskOpacity
        ctx.save();
        ctx.globalAlpha = calibration.maskOpacity / 100;
        ctx.drawImage(maskCanvas, scanX, scanY, scanW, scanH);
        ctx.restore();
      }
    }

    // Frame border around scan
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1;
    ctx.strokeRect(scanX, scanY, scanW, scanH);

    // 4. Footer Section
    const footerY = scanY + scanH + pad;

    // Footer Divider Line
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, footerY - 12);
    ctx.lineTo(canvasW - pad, footerY - 12);
    ctx.stroke();

    const isPositive = Boolean(result?.detected && result.classification?.predicted_class !== "normal");
    const isIschemic = isPositive && result?.classification?.predicted_class === "ischemic";

    // Status Pill Badge (Top of footer)
    const pillX = pad;
    const pillY = footerY;
    const pillH = 26;
    const pillW = !isPositive ? 220 : isIschemic ? 240 : 250;
    const pillRadius = 6;

    ctx.beginPath();
    if (typeof ctx.roundRect === "function") {
      ctx.roundRect(pillX, pillY, pillW, pillH, pillRadius);
    } else {
      ctx.rect(pillX, pillY, pillW, pillH);
    }
    ctx.fillStyle = !isPositive
      ? "rgba(16, 185, 129, 0.15)"
      : isIschemic
        ? "rgba(234, 179, 8, 0.15)"
        : "rgba(239, 68, 68, 0.15)";
    ctx.fill();
    ctx.strokeStyle = !isPositive
      ? "rgba(16, 185, 129, 0.5)"
      : isIschemic
        ? "rgba(234, 179, 8, 0.5)"
        : "rgba(239, 68, 68, 0.5)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = "bold 11px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillStyle = !isPositive ? "#34d399" : isIschemic ? "#facc15" : "#f87171";
    ctx.fillText(
      !isPositive
        ? "● NORMAL HEAD CT (NEGATIVE)"
        : isIschemic
          ? "● ISCHEMIC INFARCT (YELLOW MASK)"
          : "● HEMORRHAGIC STROKE (RED MASK)",
      pillX + 12,
      pillY + 17
    );

    // Primary Classification Label below Pill
    ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillStyle = "#f8fafc";
    const classLabel = result?.classification?.predicted_label || (isPositive ? "Acute Stroke Lesion" : "No Lesion Observed");
    const classConf = result?.classification
      ? ` (${(result.classification.confidence * 100).toFixed(1)}%)`
      : (result ? ` (${(result.confidence * 100).toFixed(1)}%)` : "");
    ctx.fillText(`${classLabel}${classConf}`, pad, footerY + 48);

    // Center: Quantitative Metrics
    const midX = Math.round(canvasW * 0.44);
    ctx.font = "600 12px monospace";
    ctx.fillStyle = "#e2e8f0";
    ctx.fillText(`Lesion Area : ${result?.lesionArea ?? 0}%`, midX, footerY + 18);

    ctx.font = "500 11px monospace";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText(`Cutoff Sens : ${calibration.threshold}%`, midX, footerY + 36);
    ctx.fillText(`Overlay Opa : ${calibration.maskOpacity}%`, midX, footerY + 52);

    // Right side: AI Model info & Clinical disclaimer
    ctx.textAlign = "right";
    ctx.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillStyle = "#38bdf8";
    ctx.fillText(`Model: ${result?.modelLabel || modelName}`, canvasW - pad, footerY + 18);

    ctx.font = "500 11px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillStyle = "#64748b";
    ctx.fillText("AI-Assisted Diagnostic Reference", canvasW - pad, footerY + 36);
    ctx.fillText("Confirmatory Radiologist Review Required", canvasW - pad, footerY + 52);
    ctx.textAlign = "left";

    // Download PNG synchronously
    const link = document.createElement("a");
    link.download = `stroke-clinical-composite-${file?.name ? file.name.replace(/\.[^/.]+$/, "") : Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    if (onSuccess) onSuccess();
  };

  baseImg.src = imageUrl;
}
