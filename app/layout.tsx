import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/hooks/useTheme";
import ScrollProgress from "@/components/layout/ScrollProgress";
import SideDotNav from "@/components/layout/SideDotNav";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { TerminalProvider } from "@/hooks/useTerminal";
import TerminalButton from "@/components/terminal/TerminalButton";
import TerminalModal from "@/components/terminal/TerminalModal";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adityakumar.dev"),
  title: "Aditya Kumar — Portfolio",
  description:
    "Full-stack developer and ML builder. CSE undergrad at NIT Patna.",
  keywords: [
    "Aditya Kumar",
    "NIT Patna",
    "portfolio",
    "developer",
    "full-stack",
    "machine learning",
    "React",
    "Next.js",
  ],
  openGraph: {
    title: "Aditya Kumar — Portfolio",
    description:
      "Full-stack developer and ML builder. CSE undergrad at NIT Patna.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    url: "https://YOUR_DOMAIN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Kumar — Portfolio",
    description:
      "Full-stack developer and ML builder. CSE undergrad at NIT Patna.",
  },
};

const themeInitializerScript = `
  (function() {
    try {
      var savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', savedTheme);
      } else {
        var systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', systemTheme);
      }
    } catch (e) {}
  })()
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializerScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <TerminalProvider>
            <LoadingScreen />
            <ScrollProgress />
            <SideDotNav />
            {children}
            <TerminalButton />
            <TerminalModal />
            <Analytics />
          </TerminalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}




