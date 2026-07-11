import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://adityakumar.dev"),
  title: "Aditya Kumar — Full-Stack Engineer",
  description:
    "Full-stack engineer building fast, resilient systems — from the data layer to the last pixel.",
  keywords: [
    "Aditya Kumar",
    "NIT Patna",
    "portfolio",
    "developer",
    "full-stack",
    "engineer",
    "React",
    "Next.js",
    "TypeScript",
  ],
  openGraph: {
    title: "Aditya Kumar — Full-Stack Engineer",
    description:
      "Full-stack engineer building fast, resilient systems — from the data layer to the last pixel.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    url: "https://adityakumar.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Kumar — Full-Stack Engineer",
    description:
      "Full-stack engineer building fast, resilient systems — from the data layer to the last pixel.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      style={
        {
          "--font-sans": GeistSans.style.fontFamily,
          "--font-mono": GeistMono.style.fontFamily,
        } as React.CSSProperties
      }
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
