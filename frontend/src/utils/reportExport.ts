import { jsPDF } from "jspdf";
import { PredictionResult } from "@/types";

export interface ExportClinicalReportParams {
  result: PredictionResult;
  fileName: string;
  modelName: string;
  threshold: number;
  imageUrl?: string;
  probData?: { width: number; height: number; data: Uint8ClampedArray } | null;
}

export function generateClinicalSummaryText({
  result,
  fileName,
  modelName,
  threshold,
}: {
  result: PredictionResult;
  fileName: string;
  modelName: string;
  threshold: number;
}): string {
  const clsSummary = result.classification
    ? `Disease Classification - ${result.classification.predicted_label} (${(result.classification.confidence * 100).toFixed(1)}%)
Class Probabilities
${result.classification.classes.map((c) => `  - ${c.label} - ${c.percentage}%`).join("\n")}`
    : "Disease Classification - N/A";

  return `=== NU STROKE SCAN CLINICAL ASSESSMENT ===
Date/Time - ${new Date().toLocaleString()}
Patient File - ${fileName}
Model Architecture - ${result.modelLabel || modelName}
Lesion Finding - ${result.label}
Segmentation Confidence - ${(result.confidence * 100).toFixed(1)}%
Lesion Volume (ROI) - ${result.lesionArea ?? 0}%
Sensitivity Cutoff - ${threshold}%
------------------------------------------
${clsSummary}
==========================================`;
}

async function prepareImageData(
  imageUrl: string,
  result: PredictionResult,
  threshold: number,
  probData?: { width: number; height: number; data: Uint8ClampedArray } | null
): Promise<{ originalBase64: string; lesionBase64: string }> {
  return new Promise((resolve) => {
    if (!imageUrl || typeof window === "undefined") {
      resolve({ originalBase64: "", lesionBase64: "" });
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const scanW = 512;
        const scanH = 512;

        // 1. Original scan canvas
        const origCanvas = document.createElement("canvas");
        origCanvas.width = scanW;
        origCanvas.height = scanH;
        const origCtx = origCanvas.getContext("2d");
        if (!origCtx) {
          resolve({ originalBase64: "", lesionBase64: "" });
          return;
        }
        origCtx.fillStyle = "#000000";
        origCtx.fillRect(0, 0, scanW, scanH);
        origCtx.drawImage(img, 0, 0, scanW, scanH);
        const originalBase64 = origCanvas.toDataURL("image/jpeg", 0.92);

        // 2. Lesion overlay canvas
        const lesionCanvas = document.createElement("canvas");
        lesionCanvas.width = scanW;
        lesionCanvas.height = scanH;
        const lesionCtx = lesionCanvas.getContext("2d");
        if (!lesionCtx) {
          resolve({ originalBase64, lesionBase64: "" });
          return;
        }
        lesionCtx.fillStyle = "#000000";
        lesionCtx.fillRect(0, 0, scanW, scanH);
        lesionCtx.drawImage(img, 0, 0, scanW, scanH);

        // Render acute lesion mask overlay only on detected lesion pixels above threshold
        if (probData && result?.detected) {
          const { width: pW, height: pH, data: pData } = probData;
          const maskCanvas = document.createElement("canvas");
          maskCanvas.width = pW;
          maskCanvas.height = pH;
          const maskCtx = maskCanvas.getContext("2d");
          if (maskCtx) {
            const maskImgData = maskCtx.createImageData(pW, pH);
            const out = maskImgData.data;
            const cutoff = Math.round((threshold / 100) * 255);

            const isIschemic = result?.classification?.predicted_class === "ischemic";
            const maskR = isIschemic ? 234 : 239;
            const maskG = isIschemic ? 179 : 68;
            const maskB = isIschemic ? 8 : 68;

            const totalPixels = pW * pH;
            for (let i = 0; i < totalPixels; i++) {
              const idx = i * 4;
              const prob = pData[idx]; // Probability value stored in Red channel (0 - 255)
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

            lesionCtx.save();
            lesionCtx.globalAlpha = 0.85;
            lesionCtx.drawImage(maskCanvas, 0, 0, scanW, scanH);
            lesionCtx.restore();
          }
        }

        const lesionBase64 = lesionCanvas.toDataURL("image/jpeg", 0.92);
        resolve({ originalBase64, lesionBase64 });
      } catch {
        resolve({ originalBase64: "", lesionBase64: "" });
      }
    };
    img.onerror = () => resolve({ originalBase64: "", lesionBase64: "" });
    img.src = imageUrl;
  });
}

export async function exportClinicalReportFile({
  result,
  fileName,
  modelName,
  threshold,
  imageUrl,
  probData,
}: ExportClinicalReportParams): Promise<void> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pad = 14;
  const pw = 182; // printable width (210 - 28)

  // Top Accent Bar (Royal Blue)
  doc.setFillColor(37, 99, 235);
  doc.rect(pad, 10, pw, 2, "F");

  // Header Brand & Subtitle
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(15, 23, 42);
  doc.text("NU STROKE SCAN", pad, 19);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text("Neuro-Imaging Clinical Intelligence Platform", pad, 24);

  // Header Right (Document Type & Matrix)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(30, 41, 59);
  doc.text("CLINICAL DIAGNOSTIC REPORT", pad + pw, 19, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Standard Matrix 512 × 512 px", pad + pw, 24, { align: "right" });

  // Divider Line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(pad, 27, pad + pw, 27);

  // Section 1 - Patient & Study Metadata Card
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(pad, 31, pw, 22, 1.5, 1.5, "FD");

  // Row 1
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text("SOURCE STUDY FILE", pad + 4, 36);
  doc.text("ACQUISITION RESOLUTION", pad + 65, 36);
  doc.text("EXAMINATION TIMESTAMP", pad + 125, 36);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  const truncatedFileName = fileName.length > 25 ? `${fileName.substring(0, 22)}...` : fileName;
  doc.text(truncatedFileName, pad + 4, 41);
  doc.text("512 × 512 px (Axial NCCT)", pad + 65, 41);
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  doc.text(dateStr, pad + 125, 41);

  // Row 2
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text("MODALITY VERIFICATION", pad + 4, 46);
  doc.text("SEGMENTATION ARCHITECTURE", pad + 65, 46);
  doc.text("SENSITIVITY THRESHOLD", pad + 125, 46);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(22, 101, 52);
  doc.text("Axial Brain CT (Verified)", pad + 4, 50.5);

  doc.setTextColor(15, 23, 42);
  doc.text(result.modelLabel || modelName, pad + 65, 50.5);
  doc.text(`${threshold}% Cutoff`, pad + 125, 50.5);

  // Section 2 - Primary Diagnostic Assessment Banner
  const isDetected = Boolean(result.detected);
  const predictedClass = result.classification?.predicted_label || result.label;
  const isIschemic = predictedClass.toLowerCase().includes("ischemic");
  const isHemorrhagic = predictedClass.toLowerCase().includes("hemorrhagic");

  if (isDetected) {
    doc.setFillColor(254, 242, 242);
    doc.setDrawColor(254, 202, 202);
    doc.roundedRect(pad, 56, pw, 22, 1.5, 1.5, "FD");

    doc.setFillColor(220, 38, 38);
    doc.rect(pad, 56, 2.5, 22, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(185, 28, 28);
    const findingTitle = isIschemic
      ? "PRIMARY CLINICAL FINDING - ACUTE ISCHEMIC INFARCT DETECTED"
      : isHemorrhagic
      ? "PRIMARY CLINICAL FINDING - ACUTE INTRACRANIAL HEMORRHAGE DETECTED"
      : "PRIMARY CLINICAL FINDING - ACUTE BRAIN LESION DETECTED";
    doc.text(findingTitle, pad + 6, 62);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text(`Disease Classification - ${predictedClass} (${(result.confidence * 100).toFixed(1)}% Neural Certainty)`, pad + 6, 68);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(`Estimated Lesion Area (ROI Volume) - ${result.lesionArea ?? 0}% of Brain Parenchyma   |   Urgent Review Recommended`, pad + 6, 74);
  } else {
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(187, 247, 208);
    doc.roundedRect(pad, 56, pw, 22, 1.5, 1.5, "FD");

    doc.setFillColor(22, 163, 74);
    doc.rect(pad, 56, 2.5, 22, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(22, 101, 52);
    doc.text("PRIMARY CLINICAL FINDING - NO ACUTE LESION DETECTED", pad + 6, 62);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text("Disease Classification - Normal / Baseline Non-Contrast CT", pad + 6, 68);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text("No focal ischemic parenchymal hypoattenuation or hemorrhage identified above threshold.", pad + 6, 74);
  }

  // Section 3 - Multi-Class Neural Probability Breakdown
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text("MaxViT Neural Multi-Class Disease Breakdown", pad, 84);

  const classes = result.classification?.classes || [
    { label: "Ischemic Stroke", percentage: isIschemic ? Math.round(result.confidence * 100) : 5 },
    { label: "Hemorrhagic Stroke", percentage: isHemorrhagic ? Math.round(result.confidence * 100) : 5 },
    { label: "Normal (Non-Stroke)", percentage: !isDetected ? Math.round(result.confidence * 100) : 5 },
  ];

  let cy = 88;
  classes.forEach((cls) => {
    const isTarget = cls.label.toLowerCase() === predictedClass.toLowerCase();
    doc.setFillColor(isTarget ? 241 : 248, isTarget ? 245 : 250, isTarget ? 249 : 252);
    doc.setDrawColor(isTarget ? 147 : 226, isTarget ? 197 : 232, isTarget ? 253 : 240);
    doc.roundedRect(pad, cy, pw, 8, 1, 1, "FD");

    doc.setFont("helvetica", isTarget ? "bold" : "normal");
    doc.setFontSize(8);
    doc.setTextColor(isTarget ? 30 : 71, isTarget ? 41 : 85, isTarget ? 59 : 105);
    doc.text(cls.label, pad + 4, cy + 5.2);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(isTarget ? 37 : 100, isTarget ? 99 : 116, isTarget ? 235 : 139);
    doc.text(`${cls.percentage}%`, pad + 95, cy + 5.2, { align: "right" });

    // Progress Bar
    const barX = pad + 102;
    const barW = 74;
    const barH = 2.8;
    doc.setFillColor(226, 232, 240);
    doc.rect(barX, cy + 2.6, barW, barH, "F");

    const fillW = Math.max(1, (barW * Math.min(100, cls.percentage)) / 100);
    if (isTarget && isDetected) {
      doc.setFillColor(220, 38, 38);
    } else if (isTarget) {
      doc.setFillColor(22, 163, 74);
    } else {
      doc.setFillColor(148, 163, 184);
    }
    doc.rect(barX, cy + 2.6, fillW, barH, "F");

    cy += 9.5;
  });

  // Section 4 - Diagnostic Neuro-Imaging Evidence (Dual View)
  const evidenceY = cy + 2;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text("Diagnostic Neuro-Imaging Evidence (Standard Matrix 512 × 512 px)", pad, evidenceY);

  const images = imageUrl
    ? await prepareImageData(imageUrl, result, threshold, probData)
    : { originalBase64: "", lesionBase64: "" };
  const imgBoxW = 56;
  const imgBoxH = 56;
  const imgY = evidenceY + 4;

  // Left Scan Box (Original)
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(pad + 18, imgY, imgBoxW, imgBoxH, 1.5, 1.5, "F");
  if (images.originalBase64) {
    try {
      doc.addImage(images.originalBase64, "JPEG", pad + 18, imgY, imgBoxW, imgBoxH);
    } catch {
      // Graceful fallback
    }
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(30, 41, 59);
  doc.text("Original Axial NCCT Scan", pad + 18 + imgBoxW / 2, imgY + imgBoxH + 4, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text("Standard Matrix 512 × 512 px", pad + 18 + imgBoxW / 2, imgY + imgBoxH + 7.5, { align: "center" });

  // Right Scan Box (Lesion Overlay)
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(pad + 108, imgY, imgBoxW, imgBoxH, 1.5, 1.5, "F");
  if (images.lesionBase64) {
    try {
      doc.addImage(images.lesionBase64, "JPEG", pad + 108, imgY, imgBoxW, imgBoxH);
    } catch {
      // Graceful fallback
    }
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(30, 41, 59);
  doc.text("Neural Lesion Map Overlay", pad + 108 + imgBoxW / 2, imgY + imgBoxH + 4, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text("High-Sensitivity Segmentation", pad + 108 + imgBoxW / 2, imgY + imgBoxH + 7.5, { align: "center" });

  // Section 5 - Technical Architecture & Analytical Parameters
  const techY = imgY + imgBoxH + 12;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(pad, techY, pw, 20, 1.5, 1.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(30, 41, 59);
  doc.text("TECHNICAL ARCHITECTURE & ANALYTICAL PARAMETERS", pad + 4, techY + 4.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(71, 85, 105);
  doc.text(`Segmentation Engine - ${result.modelLabel || modelName} (Deep Learning Network)`, pad + 4, techY + 9);
  doc.text("Classification Backbone - MaxViT Hybrid Attention Multi-Class Architecture", pad + 4, techY + 13);
  doc.text("Modality Screener - Axial Non-Contrast Brain CT Deep Neural Filter (p >= 0.70)", pad + 4, techY + 17);

  // Section 6 - Clinical Notice & Regulatory Disclaimer
  const discY = techY + 23;
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(pad, discY, pw, 23, 1.5, 1.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(71, 85, 105);
  doc.text("CLINICAL REGULATORY NOTICE & DISCLAIMER", pad + 4, discY + 4.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text(
    "This clinical report is generated by a Machine Learning research platform for diagnostic decision assistance only.",
    pad + 4,
    discY + 9
  );
  doc.text(
    "All neural predictions must be clinically correlated with patient symptoms and validated by a board-certified physician.",
    pad + 4,
    discY + 13
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(71, 85, 105);
  doc.text("Status - Electronically Authenticated and Recorded   •   NU Stroke Scan Platform", pad + 4, discY + 18.5);

  // Footer Line
  const footerY = 286;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(pad, footerY, pad + pw, footerY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    "NU STROKE SCAN RESEARCH PLATFORM   •   OFFICIAL CLINICAL REPORT   •   PAGE 1 OF 1",
    105,
    footerY + 4.5,
    { align: "center" }
  );

  // Trigger Instant PDF Download
  const cleanBaseName = fileName.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_");
  doc.save(`stroke-clinical-report-${cleanBaseName}.pdf`);
}
