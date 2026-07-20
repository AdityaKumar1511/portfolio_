import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import CustomCursor from '@/components/CustomCursor'
import meta from '@/data/meta.json'
import './globals.css'

export const metadata: Metadata = {
  title: meta.seo.title,
  description: meta.seo.description,
  openGraph: {
    title: meta.seo.title,
    description: meta.seo.description,
    url: meta.seo.url,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}>
        <CustomCursor />
        
        {children}
      </body>
    </html>
  )
}