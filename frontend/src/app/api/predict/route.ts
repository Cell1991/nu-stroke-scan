import { NextRequest, NextResponse } from "next/server";

const BACKEND_CANDIDATES = [
  process.env.INTERNAL_API_URL,
  "http://backend:8000",
  process.env.NEXT_PUBLIC_API_URL,
  "http://127.0.0.1:8000",
  "http://localhost:8000",
].filter(Boolean) as string[];

async function forwardToBackend(req: NextRequest, endpoint: string) {
  const url = new URL(req.url);
  const search = url.search;
  const formData = await req.formData();

  let lastError: unknown = null;

  for (const baseUrl of BACKEND_CANDIDATES) {
    try {
      const targetUrl = `${baseUrl.replace(/\/$/, "")}${endpoint}${search}`;
      
      const outboundFormData = new FormData();
      for (const [key, value] of formData.entries()) {
        outboundFormData.append(key, value);
      }

      const res = await fetch(targetUrl, {
        method: "POST",
        body: outboundFormData,
      });

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
        "AI Backend Unreachable: Could not connect to backend server at http://backend:8000 or http://localhost:8000. Please check that the backend container is started in Docker Desktop.",
      detail: String(lastError || "Connection refused"),
    },
    { status: 503 }
  );
}

export async function POST(req: NextRequest) {
  return forwardToBackend(req, "/api/predict");
}
