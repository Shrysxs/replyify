"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    try {
      setLoading(true);
      setError(null);
      setResult("");
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
      }
      const data = await res.json();
      setResult(data?.[0]?.generated_text || "No response");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-8 flex flex-col gap-6 items-center">
      <h1 className="text-3xl font-semibold">Replyify</h1>

      <textarea
        className="w-full max-w-2xl h-48 p-3 border rounded-md bg-transparent"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your message"
      />

      <button
        className="px-4 py-2 rounded-md bg-black text-white disabled:opacity-50"
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {error && (
        <p className="text-red-500 text-sm max-w-2xl break-words">{error}</p>
      )}

      <p className="max-w-2xl whitespace-pre-wrap">{result}</p>
    </div>
  );
}
