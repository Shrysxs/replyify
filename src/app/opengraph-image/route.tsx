import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET() {
  const width = 1200;
  const height = 630;
  return new ImageResponse(
    (
      <div
        style={{
          width,
          height,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "#000",
          color: "#fff",
          padding: "64px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            border: "2px solid #00ff00",
            color: "#00ff00",
            padding: "8px 14px",
            fontSize: 18,
            letterSpacing: 4,
          }}
        >
          REPLYIFY
        </div>
        <div style={{ height: 24 }} />
        <div style={{ fontSize: 60, lineHeight: 1.1, fontWeight: 700 }}>
          Turn any message into a concise,
          <br /> on‑brand reply—fast.
        </div>
        <div style={{ height: 24 }} />
        <div style={{ fontSize: 24, opacity: 0.9 }}>replyify.app</div>
      </div>
    ),
    { width, height }
  );
}
