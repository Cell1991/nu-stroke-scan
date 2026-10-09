import { NextRequest, NextResponse } from "next/server";

function getCandidates(): string[] {
  if (process.env.INTERNAL_API_URL) {
    return [
      process.env.INTERNAL_API_URL,
      "http://backend:8000",
      "http://127.0.0.1:8000",
      "http://localhost:8000",
    ];
  }
  return [
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000",
    "http://127.0.0.1:8000",
    "http://localhost:8000",
    "http://backend:8000",
  ];
}

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const search = url.search;
  const formData = await req.formData();
  const candidates = Array.from(new Set(getCandidates()));

  let lastError: unknown = null;

  for (const baseUrl of candidates) {
    try {
      const targetUrl = `${baseUrl.replace(/\/$/, "")}/api/analysis${search}`;
      
      const outboundFormData = new FormData();
      for (const [key, value] of formData.entries()) {
        outboundFormData.append(key, value);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 90000);

      const res = await fetch(targetUrl, {
        method: "POST",
        body: outboundFormData,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok || res.status < 500) {
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
      }
    } catch (err) {
      lastError = err;
    }
  }

  return NextResponse.json(
    {
      error:
        "AI Backend Unreachable: Could not connect to backend server at http://backend:8000 or http://localhost:8000.",
      detail: String(lastError || "Connection refused"),
    },
    { status: 503 }
  );
}
