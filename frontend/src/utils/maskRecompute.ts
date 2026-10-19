import { ClassificationData } from "@/types";

export interface RecomputeThresholdParams {
  probData: { width: number; height: number; data: Uint8ClampedArray } | null;
  threshold: number;
  strokeType?: "ischemic" | "hemorrhagic" | "normal";
  strokeClass?: string;
  originalClassification?: ClassificationData | null;
}

export interface RecomputeThresholdResult {
  maskUrl: string;
  lesionArea: number;
  detected: boolean;
  confidence: number;
  label: string;
  classification?: ClassificationData | null;
}

export function recomputeMaskFromProbability({
  probData,
  threshold,
  strokeType,
  strokeClass,
  originalClassification,
}: RecomputeThresholdParams): RecomputeThresholdResult | null {
  if (!probData) return null;

  const { width, height, data } = probData;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  const outImgData = ctx.createImageData(width, height);
  const out = outImgData.data;
  const cutoff = Math.round((threshold / 100) * 255);

  let lesionPixels = 0;
  let sumProb = 0;
  let maxProb = 0;
  const totalPixels = width * height;

  // Resolve immutable baseline stroke subtype:
  // If strokeType or strokeClass is explicitly ischemic, or if ischemic was the top stroke class originally
  const isIschemic =
    strokeType === "ischemic" ||
    (!strokeType && strokeClass === "ischemic") ||
    (!strokeType &&
      !strokeClass &&
      originalClassification?.probabilities &&
      (originalClassification.probabilities["ischemic"] ?? 0) >
        (originalClassification.probabilities["hemorrhagic"] ?? 0));

  // Hemorrhagic: Red (239, 68, 68), Ischemic: Yellow / Amber (234, 179, 8)
  const maskR = isIschemic ? 234 : 239;
  const maskG = isIschemic ? 179 : 68;
  const maskB = isIschemic ? 8 : 68;

  for (let i = 0; i < totalPixels; i++) {
    const idx = i * 4;
    const prob = data[idx];
    if (prob > maxProb) maxProb = prob;

    if (prob >= cutoff) {
      lesionPixels++;
      sumProb += prob;
      out[idx] = maskR;
      out[idx + 1] = maskG;
      out[idx + 2] = maskB;
      out[idx + 3] = 255;
    } else {
      out[idx + 3] = 0;
    }
  }

  // Same noise filter as the backend: drop 4-connected regions smaller than 100 pixels at the
  // 224 × 224 model resolution (scaled to the resolution of this probability map).
  const minComponent = Math.max(1, Math.round((100 * totalPixels) / (224 * 224)));
  const visited = new Uint8Array(totalPixels);
  const stack: number[] = [];
  const component: number[] = [];
  for (let start = 0; start < totalPixels; start++) {
    if (visited[start] || out[start * 4 + 3] === 0) continue;
    component.length = 0;
    stack.push(start);
    visited[start] = 1;
    while (stack.length) {
      const p = stack.pop()!;
      component.push(p);
      const x = p % width;
      const neighbors = [p - width, p + width, x > 0 ? p - 1 : -1, x < width - 1 ? p + 1 : -1];
      for (const q of neighbors) {
        if (q >= 0 && q < totalPixels && !visited[q] && out[q * 4 + 3] !== 0) {
          visited[q] = 1;
          stack.push(q);
        }
      }
    }
    if (component.length < minComponent) {
      for (const p of component) {
        out[p * 4 + 3] = 0;
        lesionPixels--;
        sumProb -= data[p * 4];
      }
    }
  }

  const detected = lesionPixels >= minComponent;

  if (!detected) {
    // Zero out alpha channel completely if no lesion exceeds clinical threshold
    for (let i = 0; i < totalPixels; i++) {
      out[i * 4 + 3] = 0;
    }
  }

  ctx.putImageData(outImgData, 0, 0);
  const maskUrl = canvas.toDataURL("image/png");
  const lesionArea = detected ? Number(((lesionPixels / totalPixels) * 100).toFixed(2)) : 0;
  // Mean lesion probability when a lesion is shown; otherwise 1 − the highest pixel probability
  const confidence = Number((detected ? sumProb / lesionPixels / 255 : 1 - maxProb / 255).toFixed(4));
  const label = detected
    ? isIschemic
      ? "Acute Ischemic Infarction (Yellow Mask)"
      : "Acute Hemorrhagic Stroke (Red Mask)"
    : "No Acute Lesion Detected";

  // The disease-type classification comes from the MaxViT classifier and does not depend on the
  // segmentation threshold, so it is passed through unchanged.
  const updatedClassification = originalClassification;

  return {
    maskUrl,
    lesionArea,
    detected,
    confidence,
    label,
    classification: updatedClassification,
  };
}
