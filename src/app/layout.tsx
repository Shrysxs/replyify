import type { Metadata } from "next";
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
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
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
      <body className={`${vt323.variable} antialiased`}> 
        {children}
      </body>
    </html>
  );
}
