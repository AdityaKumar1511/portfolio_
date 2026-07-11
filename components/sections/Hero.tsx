'use client'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const lines = ['Engineering', 'systems that', 'scale.']

  return (
    <section
      id="hero"
      style={{
        minHeight: '100svh',
        padding: '0 24px',
        paddingTop: '56px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Top meta row */}
      <div style={{ display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: 'clamp(3rem, 8vw, 6rem)',
        paddingTop: '40px' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '11px', color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '6px' }}>
            Developer — 01
          </p>
          <p style={{ fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '11px', color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Full-Stack Engineer
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>
            Open to work — 2026
          </p>
          <p style={{ fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '11px', color: 'var(--text-muted)' }}>
            Scroll ↓
          </p>
        </div>
      </div>

      {/* Hero heading */}
      <h1 style={{
        fontSize: 'clamp(3.5rem, 9vw, 8rem)',
        fontWeight: 600,
        lineHeight: 0.92,
        letterSpacing: '-0.04em',
        color: 'var(--text)',
        margin: 0,
      }}>
        {lines.map((line, i) => (
          <span
            key={line}
            style={{
              display: 'block',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(50px)',
              transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
            }}
          >
            {line}
          </span>
        ))}
      </h1>

      {/* Subtext */}
      <p style={{
        marginTop: '2rem',
        fontSize: '16px',
        color: 'var(--text-secondary)',
        maxWidth: '400px',
        lineHeight: 1.6,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.7s ease 0.5s',
      }}>
        Fast, resilient systems — from the data layer to the last pixel.
      </p>

      {/* Anchor pills */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginTop: '2.5rem',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.7s ease 0.65s',
      }}>
        {[
          { label: 'Projects', id: 'projects' },
          { label: 'About', id: 'about' },
          { label: 'GitHub', id: 'github' },
          { label: 'Contact', id: 'contact' },
        ].map(({ label, id }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: '999px',
              padding: '8px 20px',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 200ms',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--text-secondary)'
              e.currentTarget.style.color = 'var(--text)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Bottom links */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginTop: '3rem',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.7s ease 0.75s',
      }}>
        <a href="https://github.com/AdityaKumar1511" target="_blank" rel="noreferrer"
          style={{ fontSize: '13px', color: 'var(--text-secondary)',
            textDecoration: 'underline', textUnderlineOffset: '4px',
            textDecorationColor: 'var(--border)', transition: 'color 150ms' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
          View GitHub →
        </a>
        <span style={{ width: '1px', height: '14px', background: 'var(--border)' }} />
        <span style={{ fontFamily: 'var(--font-geist-mono), monospace',
          fontSize: '11px', color: 'var(--text-muted)' }}>
          ↓ scroll
        </span>
      </div>
    </section>
  )
}