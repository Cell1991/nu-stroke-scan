import { DisplayCalibration, PredictionResult } from "@/types";

export interface ExportCompositeParams {
  imageUrl: string;
  file: File | null;
  result: PredictionResult | null;
  calibration: DisplayCalibration;
  modelName: string;
  onSuccess?: () => void;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (src.startsWith("http")) img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function exportMedicalComposite({
  imageUrl,
  file,
  result,
  calibration,
  modelName,
  onSuccess,
}: ExportCompositeParams): Promise<void> {
  if (!imageUrl) return;

  const baseImg = await loadImage(imageUrl);
  // The lesion mask exactly as displayed in the viewport (same threshold and noise filtering)
  const maskImg = result?.maskUrl ? await loadImage(result.maskUrl).catch(() => null) : null;

  // Medical CT Brain Standard Matrix: the composite is exactly 512 × 512 pixels; the CT slice
  // fills the full matrix and the header/footer are drawn as translucent bands over the air region.
  const size = 512;
  const pad = 12;
  const headerH = 38;
  const footerH = 66;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, size, size);

  // 1. CT slice with active brightness & contrast
  ctx.save();
  ctx.filter = `brightness(${calibration.brightness}%) contrast(${calibration.contrast}%)`;
  ctx.drawImage(baseImg, 0, 0, size, size);
  ctx.restore();

  // 2. Lesion mask with active opacity
  if (maskImg) {
    ctx.save();
    ctx.globalAlpha = calibration.maskOpacity / 100;
    ctx.drawImage(maskImg, 0, 0, size, size);
    ctx.restore();
  }

  // 3. Header band
  ctx.fillStyle = "rgba(9, 11, 14, 0.82)";
  ctx.fillRect(0, 0, size, headerH);
  ctx.fillStyle = "#2563eb";
  ctx.fillRect(0, 0, size, 2);

  ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#f8fafc";
  ctx.fillText("NU STROKE SCAN", pad, 18);
  ctx.font = "500 10px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#94a3b8";
  ctx.fillText("Neuro-Imaging Clinical Intelligence Platform", pad, 31);

  const now = new Date();
  const pad2 = (n: number) => String(n).padStart(2, "0");
  const dateStr = `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())} ${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
  ctx.textAlign = "right";
  ctx.font = "600 11px monospace";
  ctx.fillStyle = "#94a3b8";
  ctx.fillText(dateStr, size - pad, 18);
  ctx.font = "500 10px monospace";
  ctx.fillStyle = "#64748b";
  ctx.fillText("AXIAL CT · 512 × 512 px", size - pad, 31);
  ctx.textAlign = "left";

  // 4. Footer band
  const footerY = size - footerH;
  ctx.fillStyle = "rgba(9, 11, 14, 0.82)";
  ctx.fillRect(0, footerY, size, footerH);

  const isPositive = Boolean(result?.detected && result.classification?.predicted_class !== "normal");
  const isIschemic = isPositive && result?.classification?.predicted_class === "ischemic";

  const pillX = pad;
  const pillY = footerY + 8;
  const pillH = 20;
  const pillW = !isPositive ? 160 : isIschemic ? 150 : 165;
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(pillX, pillY, pillW, pillH, 4);
  } else {
    ctx.rect(pillX, pillY, pillW, pillH);
  }
  ctx.fillStyle = !isPositive ? "rgba(16, 185, 129, 0.12)" : isIschemic ? "rgba(234, 179, 8, 0.12)" : "rgba(239, 68, 68, 0.12)";
  ctx.fill();
  ctx.strokeStyle = !isPositive ? "rgba(16, 185, 129, 0.45)" : isIschemic ? "rgba(234, 179, 8, 0.45)" : "rgba(239, 68, 68, 0.45)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.font = "bold 9px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillStyle = !isPositive ? "#34d399" : isIschemic ? "#facc15" : "#f87171";
  ctx.fillText(!isPositive ? "● NORMAL (NO LESION)" : isIschemic ? "● ISCHEMIC INFARCT" : "● HEMORRHAGIC STROKE", pillX + 8, pillY + 14);

  ctx.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillStyle = "#f8fafc";
  const classLabel = result?.classification?.predicted_label || (isPositive ? "Acute Stroke Lesion" : "No Acute Infarct/Hemorrhage");
  const classConf = result?.classification
    ? ` (${(result.classification.confidence * 100).toFixed(1)}%)`
    : result
      ? ` (${(result.confidence * 100).toFixed(1)}%)`
      : "";
  ctx.fillText(`${classLabel}${classConf}`, pad, footerY + 50);

  const midX = 198;
  ctx.font = "600 11px monospace";
  ctx.fillStyle = "#f1f5f9";
  ctx.fillText(`Lesion Area : ${result?.lesionArea ?? 0}%`, midX, footerY + 20);
  ctx.font = "500 10px monospace";
  ctx.fillStyle = "#94a3b8";
  ctx.fillText(`Sensitivity : ${calibration.threshold}%`, midX, footerY + 36);
  ctx.fillText(`Mask Opacity: ${calibration.maskOpacity}%`, midX, footerY + 50);

  ctx.textAlign = "right";
  ctx.font = "bold 11px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillStyle = "#f8fafc";
  ctx.fillText(`Model: ${modelName}`, size - pad, footerY + 20);
  ctx.font = "500 9.5px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillStyle = "#94a3b8";
  ctx.fillText("AI-Assisted Diagnostic Reference", size - pad, footerY + 36);
  ctx.fillStyle = "#64748b";
  ctx.fillText("Confirmatory Physician Review Required", size - pad, footerY + 50);
  ctx.textAlign = "left";

  const link = document.createElement("a");
  link.download = `stroke-clinical-composite-${file?.name ? file.name.replace(/\.[^/.]+$/, "") : Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
  if (onSuccess) onSuccess();
}
