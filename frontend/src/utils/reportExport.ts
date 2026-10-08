import { PredictionResult } from "@/types";

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
    ? `Disease Classification: ${result.classification.predicted_label} (${(result.classification.confidence * 100).toFixed(1)}%)
Class Probabilities:
${result.classification.classes.map((c) => `  - ${c.label}: ${c.percentage}%`).join("\n")}`
    : "Disease Classification: N/A";

  return `=== NU STROKE SCAN CLINICAL ASSESSMENT ===
Date/Time: ${new Date().toLocaleString()}
Patient File: ${fileName}
Model Architecture: ${result.modelLabel || modelName}
Lesion Finding: ${result.label}
Segmentation Confidence: ${(result.confidence * 100).toFixed(1)}%
Lesion Volume (ROI): ${result.lesionArea ?? 0}%
Sensitivity Cutoff: ${threshold}%
------------------------------------------
${clsSummary}
==========================================`;
}

export function exportClinicalReportFile({
  result,
  fileName,
  modelName,
  threshold,
}: {
  result: PredictionResult;
  fileName: string;
  modelName: string;
  threshold: number;
}): void {
  const clsReport = result.classification
    ? `Primary Disease Classification: ${result.classification.predicted_label} (${(result.classification.confidence * 100).toFixed(1)}%)
Probability Breakdown:
${result.classification.classes.map((c) => `  - ${c.label}: ${c.percentage}%`).join("\n")}`
    : "Primary Disease Classification: N/A";

  const reportText = `=====================================================
    NARESUAN UNIVERSITY HOSPITAL · NEURO-IMAGING CENTER
            STROKE AI CLINICAL DIAGNOSTIC REPORT
=====================================================
Timestamp: ${new Date().toISOString()}
Segmentation Architecture: ${result.modelLabel || modelName}
Lesion Segmentation Finding: ${result.detected ? "ACUTE LESION DETECTED (POSITIVE)" : "NO ACUTE LESION (NEGATIVE)"}
-----------------------------------------------------
Multi-Class Disease Classification (MaxViT):
${clsReport}
-----------------------------------------------------
Key Segmentation Metrics:
- Neural Classification: ${result.label}
- Confidence Certainty: ${(result.confidence * 100).toFixed(1)}%
- Lesion Area (ROI Volume): ${result.lesionArea ?? 0}%
- Sensitivity Cutoff: ${threshold}%
- Source File: ${fileName}
-----------------------------------------------------
Notice: This is an AI-assisted diagnostic aid and must
be verified by a certified healthcare professional.
=====================================================`;

  const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `stroke-clinical-report-${fileName.replace(/\.[^/.]+$/, "")}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}
