
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

export interface ModalityValidation {
  is_valid: boolean;
  predicted_class: "brain_ct" | "non_brain_ct";
  label: string;
  brain_ct_probability: number;
  non_ct_probability: number;
  confidence: number;
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
  modality?: ModalityValidation | null;
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
