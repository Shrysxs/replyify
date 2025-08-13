import "dotenv/config";
import { NextResponse } from "next/server";
import { generateText } from "../../../lib/hf";

// Ensure Node runtime and avoid caching.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'prompt' in request body" },
        { status: 400 }
      );
    }
    const text = await generateText(prompt);
    if (!text) {
      return NextResponse.json(
        { error: "Generation failed or empty response" },
        { status: 502 }
      );
    }
    return NextResponse.json([{ generated_text: text }]);
  } catch (err) {
    const isProd = process.env.NODE_ENV === "production";
    const message = err instanceof Error ? err.message : String(err);
    console.error("/api/generate error:", err);
    return NextResponse.json(
      { error: isProd ? "Internal server error" : message },
      { status: 500 }
    );
  }
}
