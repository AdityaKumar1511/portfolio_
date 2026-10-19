import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import CustomCursor from '@/components/CustomCursor'
import Magnetic from '@/components/Magnetic'
import SmoothScroll from '@/components/SmoothScroll'
import meta from '@/data/meta.json'
import 'lenis/dist/lenis.css'
import './globals.css'

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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}>
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