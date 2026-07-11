import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-vrd7.vercel.app'),
  title: 'Aditya Kumar — Portfolio',
  description: 'Full-stack developer and ML builder. CSE undergrad at NIT Patna.',
  openGraph: {
    title: 'Aditya Kumar — Portfolio',
    description: 'Full-stack developer and ML builder. CSE undergrad at NIT Patna.',
    url: 'https://portfolio-vrd7.vercel.app',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Kumar — Portfolio',
    description: 'Full-stack developer and ML builder. CSE undergrad at NIT Patna.',
    images: ['/og-image.png'],
  }
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
