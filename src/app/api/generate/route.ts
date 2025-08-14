import "dotenv/config";
import { NextResponse } from "next/server";
import { buildPrompt } from "@/utils/buildPrompt";
import { generateFromGroq } from "@/services/groq";

// Ensure Node runtime and avoid caching.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { rawInput, baseText, tone, persona, goal, topic } = body ?? {};

    const input = typeof rawInput === "string" ? rawInput : baseText;
    if (!input || typeof input !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'rawInput' (or legacy 'baseText')" },
        { status: 400 }
      );
    }
    if ([tone, persona, goal].some((v) => typeof v !== "string")) {
      return NextResponse.json(
        { error: "'tone', 'persona', and 'goal' must be strings" },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(input, tone, persona, goal, topic);
    const output = await generateFromGroq(prompt);

    if (process.env.NODE_ENV !== "production") {
      try {
        console.debug("/api/generate -> success, preview:", output.slice(0, 200));
      } catch {}
    }

    return NextResponse.json({ reply: output }, { status: 200 });
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
