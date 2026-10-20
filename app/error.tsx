'use client'

import { useEffect, type ReactNode } from 'react'
import { ArrowRight } from '@/components/ArrowIcon'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}): ReactNode {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main
      id="main-content"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '24px',
        padding: 'clamp(6rem, 12vw, 10rem) var(--pad-x)',
        maxWidth: '900px',
        margin: '0 auto',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '12px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#fa5f34',
        }}
      >
        Runtime error
      </span>
      <h1
        style={{
          fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
          lineHeight: 0.95,
          letterSpacing: '-0.04em',
          margin: 0,
          color: '#d4cec7',
        }}
      >
        Something went wrong.
      </h1>
      <p style={{ maxWidth: '520px', color: '#a1a1aa', lineHeight: 1.7 }}>
        The page hit an unexpected error. Try again, or return to the homepage.
      </p>
      <button
        type="button"
        onClick={reset}
        style={{
          alignSelf: 'flex-start',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '12px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#0a0a0a',
          background: '#d4cec7',
          border: 'none',
          padding: '12px 20px',
          cursor: 'pointer',
        }}
      >
        Try again <ArrowRight size={14} />
      </button>
    </main>
  )
}
