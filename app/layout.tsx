import type { Metadata } from 'next'
import { Bricolage_Grotesque, Martian_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import CustomCursor from '@/components/CustomCursor'
import Magnetic from '@/components/Magnetic'
import SmoothScroll from '@/components/SmoothScroll'
import DraftingBackground from '@/components/DraftingBackground'
import meta from '@/data/meta.json'
import 'lenis/dist/lenis.css'
import './globals.css'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz', 'wdth'],
  variable: '--font-display',
  display: 'swap',
})

const sans = localFont({
  src: [
    { path: './fonts/Switzer-Variable.woff2', weight: '100 900', style: 'normal' },
    { path: './fonts/Switzer-VariableItalic.woff2', weight: '100 900', style: 'italic' },
  ],
  variable: '--font-sans',
  display: 'swap',
})

const mono = Martian_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(meta.seo.url),
  title: meta.seo.title,
  description: meta.seo.description,
  openGraph: {
    type: 'website',
    siteName: meta.name,
    locale: 'en_US',
    title: meta.seo.title,
    description: meta.seo.description,
    url: meta.seo.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.seo.title,
    description: meta.seo.description,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body style={{ fontFamily: 'var(--font-sans), system-ui, sans-serif' }}>
        <DraftingBackground />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <noscript>
          <style>{`.fade-in { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <CustomCursor />
        <Magnetic />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
