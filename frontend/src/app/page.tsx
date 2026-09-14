"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

type ScanResult = {
  label: string;
  confidence: number;
  maskUrl: string;
};

const MAX_FILE_SIZE = 15 * 1024 * 1024;

export default function HomePage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [maskOpacity, setMaskOpacity] = useState(72);

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setError(null);
    setResult(null);
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please choose a CT image in PNG, JPG, WEBP, or DICOM preview format.");
      return;
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("The image is larger than 15 MB. Please choose a smaller file.");
      return;
    }
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setFile(selectedFile);
    setImageUrl(URL.createObjectURL(selectedFile));
  }

  async function scanImage() {
    if (!file || !imageUrl) {
      setError("Please browse and select a brain CT image first.");
      return;
    }
    setError(null);
    setIsScanning(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/analysis`, { method: "POST", body: formData });
      const payload = (await response.json()) as { detail?: string; label?: string; confidence?: number; mask_png_base64?: string };
      if (!response.ok) throw new Error(payload.detail ?? "The image could not be analyzed.");
      if (!payload.label || payload.confidence === undefined || !payload.mask_png_base64) throw new Error("The analysis response was incomplete.");
      setResult({ label: payload.label, confidence: payload.confidence, maskUrl: `data:image/png;base64,${payload.mask_png_base64}` });
    } catch (scanError) {
      setError(scanError instanceof Error ? scanError.message : "The image could not be analyzed.");
    } finally {
      setIsScanning(false);
    }
  }

  function exportResult() {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `nu-stroke-scan-${file?.name ?? "result"}`;
    link.click();
  }

  const imageStyle = { filter: `brightness(${brightness}%) contrast(${contrast}%)` };

  return (
    <main className="app-shell min-h-screen text-[#f6f2e9]">
      <div className="app-frame mx-auto max-w-[1600px] px-5 py-6 sm:px-8 lg:px-10">
        <header className="workspace-header flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <span className="brand-mark"><span /></span>
            <div><p className="font-display text-xl font-bold tracking-tight sm:text-2xl">NU STROKE SCAN</p><p className="brand-subtitle">Neuro imaging workspace</p></div>
          </div>
          <div className="flex items-center gap-4 text-right">
            <div className="hidden sm:block">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">Prototype workspace</p>
              <p className="mt-1 text-xs text-white/70">Decision support tool</p>
            </div>
            <span className="status-chip"><span /> Demo mode</span>
          </div>
        </header>

        <section className="workspace-grid grid gap-5 py-7 lg:grid-cols-[240px_minmax(0,1fr)_265px]">
          <aside className="panel flex flex-col p-4">
            <div className="mb-5 flex items-center justify-between">
              <div><p className="section-kicker">01 / Input</p><h2 className="panel-title">Upload scan</h2></div>
              <span className="text-xl text-[#ff7c3a]">＋</span>
            </div>

            <button type="button" onClick={() => inputRef.current?.click()} className="upload-zone group" aria-label="Choose a CT scan image">
              {imageUrl ? <img src={imageUrl} alt="Selected CT scan preview" className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100" /> : <><span className="text-4xl text-white/25">⌁</span><span className="mt-3 text-xs text-white/45">Drop CT image here</span><span className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/25">PNG / JPG / WEBP</span></>}
            </button>
            <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFileChange} className="hidden" />

            <button type="button" onClick={() => inputRef.current?.click()} className="secondary-button mt-4"><span className="button-icon">↥</span>Browse image</button>
            <button type="button" onClick={scanImage} disabled={isScanning} className="primary-button mt-3">{isScanning ? "Analyzing..." : "Scan now"}<span className="button-icon">→</span></button>
            <div className="mt-auto border-t border-white/10 pt-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">Selected file</p>
              <p className="mt-2 truncate text-xs text-white/70">{file?.name ?? "No image selected"}</p>
              <p className="mt-1 text-[10px] text-white/35">{file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Waiting for input"}</p>
            </div>
          </aside>

          <section className="panel p-4 sm:p-5">
            <div className="mb-5 flex items-end justify-between">
              <div><p className="section-kicker">02 / Analysis</p><h2 className="panel-title">Scan comparison</h2></div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/35">{result ? "Complete" : "Awaiting scan"}</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <ImagePane label="Before" imageUrl={imageUrl} style={imageStyle} />
              <ImagePane label="After / segmentation" imageUrl={imageUrl} maskUrl={result?.maskUrl} style={imageStyle} maskOpacity={maskOpacity} />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4 border-y border-white/10 py-4">
              <div className="metric-cell"><p className="metric-label">Result</p><p className={`mt-1 font-display text-xl font-bold ${result ? "text-[#ff9270]" : "text-white/30"}`}>{result?.label ?? "—"}</p></div>
              <div className="metric-cell"><p className="metric-label">Confidence</p><p className="mt-1 font-display text-xl font-bold text-white/85">{result ? `${(result.confidence * 100).toFixed(0)}%` : "—"}</p></div>
            </div>
            <div className="grid gap-3 pt-1 sm:grid-cols-3">
              <RangeControl label="Brightness" value={brightness} min={60} max={150} onChange={setBrightness} suffix={`${brightness - 100 > 0 ? "+" : ""}${brightness - 100}`} />
              <RangeControl label="Contrast" value={contrast} min={60} max={160} onChange={setContrast} suffix={`${contrast - 100 > 0 ? "+" : ""}${contrast - 100}`} />
              <RangeControl label="Mask opacity" value={maskOpacity} min={0} max={100} onChange={setMaskOpacity} suffix={`${maskOpacity}`} />
            </div>
          </section>

          <aside className="panel flex flex-col p-4">
            <div className="mb-5"><p className="section-kicker">03 / Output</p><h2 className="panel-title">Result preview</h2></div>
            <div className="output-preview">{imageUrl ? <div className="relative"><img src={imageUrl} alt="Output preview" style={imageStyle} className="max-h-full w-full object-contain" />{result && <img src={result.maskUrl} alt="Predicted lesion mask" className="lesion-mask absolute inset-0 h-full w-full object-contain" style={{ opacity: maskOpacity / 100 }} />}</div> : <span className="text-center text-xs text-white/30">Your analyzed image<br />will appear here</span>}</div>
            <div className="mt-auto pt-5"><p className="text-[10px] leading-5 text-white/35">Export includes the selected image preview. Model output will be connected here once the inference endpoint is ready.</p><button type="button" onClick={exportResult} disabled={!result} className="primary-button mt-4 w-full justify-center disabled:cursor-not-allowed disabled:opacity-30">Export image <span className="button-icon">↓</span></button></div>
          </aside>
        </section>

        <footer className="flex flex-col gap-2 border-t border-white/10 pt-4 text-[10px] uppercase tracking-[0.16em] text-white/30 sm:flex-row sm:items-center sm:justify-between"><span>AI-assisted imaging / Prototype v0.1</span><span>Not for clinical diagnosis</span></footer>
      </div>
      {error && <div role="alert" className="fixed bottom-6 left-1/2 z-20 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between gap-4 border border-[#ff9270]/30 bg-[#21151a] px-4 py-3 text-xs text-[#ffb49d] shadow-2xl"><span>{error}</span><button type="button" onClick={() => setError(null)} className="text-lg text-white/60" aria-label="Dismiss error">×</button></div>}
    </main>
  );
}

function ImagePane({ label, imageUrl, maskUrl, style, maskOpacity = 72 }: { label: string; imageUrl: string | null; maskUrl?: string; style: React.CSSProperties; maskOpacity?: number }) {
  return <div><div className="image-pane">{imageUrl ? <div className="relative h-full w-full"><img src={imageUrl} alt={`${label} CT scan`} style={style} className="h-full w-full object-contain" />{maskUrl && <img src={maskUrl} alt="Predicted lesion mask" className="lesion-mask absolute inset-0 h-full w-full object-contain" style={{ opacity: maskOpacity / 100 }} />}</div> : <div className="empty-image"><span className="text-3xl text-white/15">◌</span><span>Upload an image to begin</span></div>}</div><p className="mt-2 text-center text-[10px] uppercase tracking-[0.18em] text-white/45">{label}</p></div>;
}

function RangeControl({ label, value, min, max, suffix, onChange }: { label: string; value: number; min: number; max: number; suffix: string; onChange: (value: number) => void }) {
  return <label className="block"><span className="flex justify-between text-[10px] text-white/55"><span>{label}</span><span className="range-value">{suffix}</span></span><input aria-label={label} type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} className="range-input mt-2 w-full" /></label>;
}
