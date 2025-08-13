import "dotenv/config";
import { NextResponse } from "next/server";
import { generateText } from "../../../lib/hf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || "*";

function withCors(resp: NextResponse) {
  resp.headers.set("Access-Control-Allow-Origin", ALLOW_ORIGIN);
  resp.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  resp.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  resp.headers.set("Access-Control-Max-Age", "86400");
  return resp;
}

export async function OPTIONS() {
  return withCors(new NextResponse(null, { status: 204 }));
}

function buildPrompt({
  system,
  context,
  prompt,
}: {
  system?: string;
  context?: string;
  prompt: string;
}) {
  const parts: string[] = [];
  if (typeof system === "string" && system.trim()) {
    parts.push(system.trim());
  } else {
    parts.push(
      "You are a helpful assistant. Use the provided context when available. Output only the answer, no role tags. Be concise and relevant."
    );
  }
  if (typeof context === "string" && context.trim()) {
    parts.push(
      `Context (authoritative, use this to answer):\n${context.trim()}`
    );
    parts.push(
      `Task:\n${prompt}\n\nConstraints:\n- Base your answer strictly on the context above.\n- If the context lacks the information, say you don't know.\n- No preambles; just the answer.`
    );
  } else {
    // No context supplied; still answer succinctly
    parts.push(prompt);
  }
  return parts.join("\n\n");
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return withCors(
        NextResponse.json({ error: "Content-Type must be application/json" }, { status: 415 })
      );
    }

    const body = await req.json();
    const { prompt, context, system } = body ?? {};

    if (!prompt || typeof prompt !== "string") {
      return withCors(
        NextResponse.json({ error: "Missing or invalid 'prompt'" }, { status: 400 })
      );
    }

    const composed = buildPrompt({ system, context, prompt });
    const text = await generateText(composed);

    if (!text) {
      return withCors(
        NextResponse.json({ error: "Generation failed or empty response" }, { status: 502 })
      );
    }

    const model = process.env.HF_MODEL?.trim() || "tiiuae/falcon-7b-instruct";
    return withCors(NextResponse.json({ text, model }, { status: 200 }));
  } catch (err) {
    const isProd = process.env.NODE_ENV === "production";
    const message = err instanceof Error ? err.message : String(err);
    console.error("/api/reply error:", err);
    return withCors(
      NextResponse.json({ error: isProd ? "Internal server error" : message }, { status: 500 })
    );
  }
}
