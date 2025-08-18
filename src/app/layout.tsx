import type { Metadata, Viewport } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Replyify",
    template: "%s · Replyify",
  },
  description: "Turn any message into a concise, on‑brand reply—fast.",
  applicationName: "Replyify",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Replyify",
    description: "Turn any message into a concise, on‑brand reply—fast.",
    siteName: "Replyify",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "Replyify" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Replyify",
    description: "Turn any message into a concise, on‑brand reply—fast.",
    images: ["/twitter-image"],
  },
};

// Next.js 15: define viewport in a dedicated export instead of metadata
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.groq.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//api.groq.com" />
      </head>
      <body className={`${vt323.variable} antialiased min-h-screen w-full relative overflow-x-hidden bg-[#020617]`}>
        {/* Emerald Radial Glow Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              `radial-gradient(circle 500px at 50% 300px, rgba(16,185,129,0.35), transparent)`,
          }}
        />
        {/* X Profile Link */}
        <a
          href="https://x.com/xshrey_9"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open X profile @xshrey_9"
          className="fixed top-4 right-4 z-20 border border-white/30 px-3 py-1.5 text-xs uppercase tracking-widest hover:border-white/60 hover:text-[var(--accent)] hover:shadow-[0_0_20px_#00ff0033] transition-colors"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            className="block"
          >
            {/* Simple Icons: X (brand) */}
            <path
              fill="currentColor"
              d="M18.244 2.25 12.98 8.248 8.6 2.25H2l7.513 9.898L2 21.75h6.6l4.38-5.998 5.27 5.998H23l-7.9-9.76 7.4-9.74h-4.256Z"
            />
          </svg>
          <span className="sr-only">X</span>
        </a>
        {/* App Content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
