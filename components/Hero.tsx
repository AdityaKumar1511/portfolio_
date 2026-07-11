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
        height: '100svh',
        padding: '0 24px',
        paddingTop: '56px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* ── Top: meta labels ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '20px',
        alignItems: 'end',
        paddingTop: '32px',
      }}>
        <div>
          <p style={{ fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '11px', color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '4px' }}>
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
            fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
            Open to work — 2026
          </p>
          <p style={{ fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '11px', color: 'var(--text-muted)' }}>
            Scroll ↓
          </p>
        </div>
      </div>

      {/* ── Center: heading + subtext ── */}
      <div>
        <h1 style={{
          fontSize: 'clamp(3rem, 7.5vw, 6.5rem)',
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
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
              }}
            >
              {line}
            </span>
          ))}
        </h1>

        <p style={{
          marginTop: '1.5rem',
          fontSize: '15px',
          color: 'var(--text-secondary)',
          maxWidth: '420px',
          lineHeight: 1.6,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.7s ease 0.5s',
        }}>
          Fast, resilient systems — from the data layer to the last pixel.
        </p>
      </div>

      {/* ── Bottom: pills + links ── */}
      <div style={{ paddingBottom: '40px' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.7s ease 0.65s',
          marginBottom: '1.5rem',
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

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
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
      </div>
    </section>
  )
}
