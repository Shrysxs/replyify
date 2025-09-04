import type { Metadata, Viewport } from "next";
import { VT323 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Replyify - Context-Aware Text Generation",
  description: "Polish your thoughts into context-aware replies instantly. Generate professional, personalized text with AI-powered persona, tone, and goal customization.",
  keywords: ["AI text generation", "context-aware replies", "professional writing", "text polishing", "AI writing assistant"],
  authors: [{ name: "Shrysxs", url: "https://x.com/Shrysxs" }],
  creator: "Shrysxs",
  applicationName: "Replyify",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Replyify - Context-Aware Text Generation",
    description: "Polish your thoughts into context-aware replies instantly. Generate professional, personalized text with AI-powered customization.",
    siteName: "Replyify",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "Replyify" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Replyify - Context-Aware Text Generation",
    description: "Polish your thoughts into context-aware replies instantly.",
    creator: "@Shrysxs",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
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
      <body className={`${vt323.variable} antialiased min-h-screen w-full relative overflow-x-hidden bg-black`}>
        {/* Dark Noise Colored Background */}
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: "#000000",
            backgroundImage: `
        radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.2) 1px, transparent 0),
        radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.18) 1px, transparent 0),
        radial-gradient(circle at 1px 1px, rgba(236, 72, 153, 0.15) 1px, transparent 0)
      `,
            backgroundSize: "20px 20px, 30px 30px, 25px 25px",
            backgroundPosition: "0 0, 10px 10px, 15px 5px",
          }}
        />
        {/* App Content */}
        <div className="relative z-10">
          {children}
          {/* Vercel Analytics */}
          <Analytics />
        </div>
      </body>
    </html>
  );
}
