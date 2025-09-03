import { NextResponse } from "next/server";
import { generateText } from "@/lib/llm";
import { apiCache, stableKey } from "@/lib/cache";

// Ensure Node runtime and avoid caching.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      rawInput,
      baseText,
      tone,
      persona,
      goal,
      topic,
      context,
      system,
      model,
      temperature,
      maxTokens,
      stop,
    } = body ?? {};

    const toStr = (v: unknown) => (typeof v === "string" ? v.trim() : "");
    const input = toStr(typeof rawInput === "string" ? rawInput : baseText);
    if (!input || typeof input !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'rawInput' (or legacy 'baseText')" },
        { status: 400 }
      );
    }
    if ([tone, persona, goal].some((v) => v !== undefined && typeof v !== "string")) {
      return NextResponse.json(
        { error: "'tone', 'persona', and 'goal' must be strings" },
        { status: 400 }
      );
    }

    // Build a normalized cache key (omit empties)
    const cacheKey = stableKey({
      route: "/api/generate",
      input,
      tone: toStr(tone),
      persona: toStr(persona),
      goal: toStr(goal),
      topic: toStr(topic),
      context: toStr(context),
      system: toStr(system),
      model: toStr(model),
      temperature,
      maxTokens,
      stop,
    });

    const cached = apiCache.get(cacheKey);
    if (cached) {
      return NextResponse.json({ text: cached, cached: true }, { status: 200 });
    }

    const output = await generateText({
      input,
      tone: toStr(tone),
      persona: toStr(persona),
      goal: toStr(goal),
      topic: toStr(topic),
      context: toStr(context),
      system: toStr(system),
      model: toStr(model),
      temperature,
      maxTokens,
      stop,
    });

    // Cache successful output
    if (output) apiCache.set(cacheKey, output);

    // Removed debug logging for better performance

    return NextResponse.json({ text: output }, { status: 200 });
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
