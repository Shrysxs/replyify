import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-ui",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Replyify — Context-Aware Writing",
  description: "Transform your thoughts into polished, context-aware writing. Generate professional, on-brand text with persona, tone, and goal controls.",
  keywords: ["AI text generation", "context-aware writing", "professional writing", "text polishing", "AI writing assistant"],
  authors: [{ name: "Shrysxs", url: "https://x.com/Shrysxs" }],
  creator: "Shrysxs",
  applicationName: "Replyify",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Replyify — Context-Aware Writing",
    description: "Transform your thoughts into polished, context-aware writing with AI-powered customization.",
    siteName: "Replyify",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "Replyify" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Replyify — Context-Aware Writing",
    description: "Transform your thoughts into polished, context-aware writing.",
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
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
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
      <body className={`${inter.variable} ${jetbrains.variable} antialiased min-h-screen w-full relative overflow-x-hidden gpu-accelerated`}>
        {/* Enhanced vignette backdrop */}
        <div
          className="fixed inset-0 z-0 pointer-events-none will-change-opacity"
          aria-hidden="true"
          style={{
            background: `radial-gradient(1400px 700px at 75% -5%, rgba(255,255,255,0.04), transparent 65%),
                         radial-gradient(1000px 500px at 25% -5%, rgba(0,212,255,0.06), transparent 60%),
                         linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(10,10,10,0.8) 95%)`,
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
