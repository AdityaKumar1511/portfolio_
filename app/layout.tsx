import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import CustomCursor from '@/components/CustomCursor'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aditya Kumar — Portfolio',
  description: 'Full-stack developer and ML builder. CSE undergrad at NIT Patna.',
  openGraph: {
    title: 'Aditya Kumar — Portfolio',
    description: 'Full-stack developer and ML builder. CSE undergrad at NIT Patna.',
    url: 'https://adityakumar15.vercel.app',
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