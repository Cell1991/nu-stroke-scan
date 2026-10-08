import { ModelOption } from "@/types";

export const MAX_FILE_SIZE = 25 * 1024 * 1024;

export const MODELS: ModelOption[] = [
  {
    id: "vcanet",
    name: "VCA-Net",
    desc: "Visual Cortex Attention Network",
    tag: "High Sensitivity",
  },
  {
    id: "dlka",
    name: "Deformable LKA",
    desc: "MaxViT + Large Kernel Attention",
    tag: "Deformable Conv",
  },
  {
    id: "patcher",
    name: "Patcher",
    desc: "Patch SegFormer Architecture",
    tag: "Multi-Scale Transformer",
  },
];
