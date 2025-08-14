"use client";
import { useState } from "react";

export default function ReplyForm() {
  const [rawInput, setRawInput] = useState("");
  const [tone, setTone] = useState("Casual");
  const [persona, setPersona] = useState("Startup Founder");
  const [goal, setGoal] = useState("Engage followers");
  const [topic, setTopic] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    try {
      setLoading(true);
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawInput, tone, persona, goal, topic }),
      });
      const json = await res.json();
      setReply(json.reply || json.error || "");
    } catch (e) {
      setReply(String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 space-y-4">
      <textarea
        value={rawInput}
        onChange={(e) => setRawInput(e.target.value)}
        placeholder="Enter your rough draft or idea..."
        className="w-full p-2 border rounded"
        rows={6}
      />
      <div className="flex flex-wrap gap-2">
        <input
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          placeholder="Tone"
          className="p-1 border rounded"
        />
        <input
          value={persona}
          onChange={(e) => setPersona(e.target.value)}
          placeholder="Persona"
          className="p-1 border rounded"
        />
        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Goal"
          className="p-1 border rounded"
        />
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Topic (optional)"
          className="p-1 border rounded"
        />
      </div>
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
      >
        {loading ? "Thinking..." : "Generate Reply"}
      </button>
      {reply && (
        <div className="space-y-2">
          <h3 className="font-semibold">Replyify result:</h3>
          <p className="whitespace-pre-wrap">{reply}</p>
        </div>
      )}
    </div>
  );
}
