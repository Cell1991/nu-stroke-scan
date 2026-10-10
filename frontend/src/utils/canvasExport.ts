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

    // 1. Sleek Medical Dark Slate Backdrop (#090b0e)
    ctx.fillStyle = "#090b0e";
    ctx.fillRect(0, 0, canvasW, canvasH);

    // Top Accent Line (Modern Solid Medical Blue)
    ctx.fillStyle = "#2563eb";
    ctx.fillRect(0, 0, canvasW, 2);

    // 2. Header Section
    ctx.font = "bold 15px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillStyle = "#f8fafc";
    ctx.fillText("NU STROKE SCAN", pad, 28);

    ctx.font = "500 12px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText("Neuro-Imaging Clinical Intelligence Platform", pad, 46);

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
    ctx.moveTo(pad, footerY - 10);
    ctx.lineTo(canvasW - pad, footerY - 10);
    ctx.stroke();

    const isPositive = Boolean(result?.detected && result.classification?.predicted_class !== "normal");
    const isIschemic = isPositive && result?.classification?.predicted_class === "ischemic";

    // Column 1 (Left): Diagnostic Finding & Classification (width ~40%)
    const pillX = pad;
    const pillY = footerY + 2;
    const pillH = 24;
    const pillW = !isPositive ? 190 : isIschemic ? 215 : 225;
    const pillRadius = 5;

    ctx.beginPath();
    if (typeof ctx.roundRect === "function") {
      ctx.roundRect(pillX, pillY, pillW, pillH, pillRadius);
    } else {
      ctx.rect(pillX, pillY, pillW, pillH);
    }
    ctx.fillStyle = !isPositive
      ? "rgba(16, 185, 129, 0.12)"
      : isIschemic
        ? "rgba(234, 179, 8, 0.12)"
        : "rgba(239, 68, 68, 0.12)";
    ctx.fill();
    ctx.strokeStyle = !isPositive
      ? "rgba(16, 185, 129, 0.45)"
      : isIschemic
        ? "rgba(234, 179, 8, 0.45)"
        : "rgba(239, 68, 68, 0.45)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = "bold 10px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillStyle = !isPositive ? "#34d399" : isIschemic ? "#facc15" : "#f87171";
    ctx.fillText(
      !isPositive
        ? "● NORMAL (NO LESION)"
        : isIschemic
          ? "● ISCHEMIC INFARCT"
          : "● HEMORRHAGIC STROKE",
      pillX + 10,
      pillY + 16
    );

    // Primary Classification Label below Pill
    ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillStyle = "#f8fafc";
    const classLabel = result?.classification?.predicted_label || (isPositive ? "Acute Stroke Lesion" : "No Acute Infarct/Hemorrhage");
    const classConf = result?.classification
      ? ` (${(result.classification.confidence * 100).toFixed(1)}%)`
      : (result ? ` (${(result.confidence * 100).toFixed(1)}%)` : "");
    ctx.fillText(`${classLabel}${classConf}`, pad, footerY + 48);

    // Column 2 (Middle): Quantitative Biomarkers (Strictly centered horizontally)
    const midX = Math.round(canvasW * 0.44);
    ctx.font = "600 12px monospace";
    ctx.fillStyle = "#f1f5f9";
    ctx.fillText(`Lesion Area : ${result?.lesionArea ?? 0}%`, midX, footerY + 18);

    ctx.font = "500 11px monospace";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText(`Sensitivity : ${calibration.threshold}%`, midX, footerY + 35);
    ctx.fillText(`Mask Opacity: ${calibration.maskOpacity}%`, midX, footerY + 50);

    // Column 3 (Right): Model & Compliance Disclaimer
    ctx.textAlign = "right";
    ctx.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillStyle = "#f8fafc";
    ctx.fillText(`Model: ${result?.modelLabel || modelName}`, canvasW - pad, footerY + 18);

    ctx.font = "500 10.5px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText("AI-Assisted Diagnostic Reference", canvasW - pad, footerY + 35);
    ctx.fillStyle = "#64748b";
    ctx.fillText("Confirmatory Physician Review Required", canvasW - pad, footerY + 50);
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
