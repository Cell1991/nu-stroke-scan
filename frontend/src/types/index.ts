export type HealthResponse = {
  status: string;
};

export type StrokeSubtype = "normal" | "hemorrhagic" | "ischemic";

export interface ModelOption {
  id: string;
  name: string;
  desc: string;
  tag: string;
}

export interface ClassificationClass {
  id: StrokeSubtype;
  label: string;
  probability: number;
  percentage: number;
}

export interface ClassificationData {
  predicted_class: StrokeSubtype;
  predicted_label: string;
  confidence: number;
  probabilities: Record<string, number>;
  classes: ClassificationClass[];
}

export interface PredictionResult {
  label: string;
  confidence: number;
  maskUrl: string;
  detected: boolean;
  lesionArea: number;
  modelLabel?: string;
  inputSize?: [number, number];
  classification?: ClassificationData | null;
}

export interface DisplayCalibration {
  brightness: number;
  contrast: number;
  maskOpacity: number;
  threshold: number;
}

export interface PanOffset {
  x: number;
  y: number;
}
