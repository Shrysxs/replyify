import { NextResponse } from "next/server";
import { generateText } from "@/lib/llm";
import { apiCache, stableKey } from "@/lib/cache";

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

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return withCors(
        NextResponse.json({ error: "Content-Type must be application/json" }, { status: 415 })
      );
    }

    const body = await req.json();
    const { prompt, context, system, model, temperature, maxTokens, stop } = body ?? {};

    const toStr = (v: unknown) => (typeof v === "string" ? v.trim() : "");
    const input = toStr(prompt);

    if (!input) {
      return withCors(
        NextResponse.json({ error: "Missing or invalid 'prompt'" }, { status: 400 })
      );
    }

    const cacheKey = stableKey({
      route: "/api/reply",
      prompt: input,
      context: toStr(context),
      system: toStr(system),
      model: toStr(model),
      temperature,
      maxTokens,
      stop,
    });

    const cached = apiCache.get(cacheKey);
    if (cached) {
      return withCors(NextResponse.json({ text: cached, cached: true }, { status: 200 }));
    }

    const text = await generateText({ input, context: toStr(context), system: toStr(system), model: toStr(model), temperature, maxTokens, stop });

    if (text) apiCache.set(cacheKey, text);

    if (!text) {
      return withCors(
        NextResponse.json({ error: "Generation failed or empty response" }, { status: 502 })
      );
    }

    const envModel = process.env.GROQ_MODEL?.trim() || "meta-llama/llama-4-scout-17b-16e-instruct";
    return withCors(NextResponse.json({ text, model: envModel }, { status: 200 }));
  } catch (err) {
    const isProd = process.env.NODE_ENV === "production";
    const message = err instanceof Error ? err.message : String(err);
    console.error("/api/reply error:", err);
    return withCors(
      NextResponse.json({ error: isProd ? "Internal server error" : message }, { status: 500 })
    );
  }
}
