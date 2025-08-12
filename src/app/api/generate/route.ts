import { NextResponse } from "next/server";

// Server-only API route to generate text using an external provider
// IMPORTANT: Put your API key in an environment variable, e.g., HF_API_KEY, and NEVER expose it on the client.
// Example below uses Hugging Face Inference API which returns data like: [{ generated_text: "..." }]
// Create .env.local with: HF_API_KEY=your_hf_api_key

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'prompt' in request body" },
        { status: 400 }
      );
    }

    const apiKey = process.env.HF_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server misconfiguration: HF_API_KEY is not set" },
        { status: 500 }
      );
    }

    // You can change the model to any suitable text-generation model you prefer
    const modelUrl = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

    const upstream = await fetch(modelUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.7,
          return_full_text: false,
        },
      }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      return NextResponse.json(
        { error: "Upstream provider error", details: errText },
        { status: upstream.status }
      );
    }

    // The HF Inference API for text-generation returns: Array<{ generated_text: string }>
    const data = await upstream.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error("/api/generate error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
