import Link from 'next/link'
import meta from '@/data/meta.json'

export default function NotFound() {
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
          fontFamily: 'var(--font-geist-mono), monospace',
          fontSize: '12px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#fa5f34',
        }}
      >
        404 // Route not found
      </span>
      <h1
        style={{
          fontSize: 'clamp(3rem, 9vw, 7rem)',
          lineHeight: 0.92,
          letterSpacing: '-0.05em',
          margin: 0,
          color: '#d4cec7',
        }}
      >
        This page
        <br />
        doesn&apos;t exist.
      </h1>
      <p style={{ maxWidth: '520px', color: '#a1a1aa', lineHeight: 1.7 }}>
        The link may be outdated, or the project may have moved. Head back to the
        portfolio and pick up where you left off.
      </p>
      <Link
        href="/"
        style={{
          alignSelf: 'flex-start',
          fontFamily: 'var(--font-geist-mono), monospace',
          fontSize: '12px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#0a0a0a',
          background: '#d4cec7',
          padding: '12px 20px',
          textDecoration: 'none',
        }}
      >
        Back to {meta.name.split(' ')[0]} →
      </Link>
    </main>
  )
}
