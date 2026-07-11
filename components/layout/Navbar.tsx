'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '0 24px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 300ms ease',
      }}
    >
      <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>
        Aditya Kumar
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {['projects', 'about', 'contact'].map(id => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              textTransform: 'capitalize',
              transition: 'color 150ms',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            {id}
          </button>
        ))}

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px',
          border: '1px solid var(--border)', borderRadius: '999px',
          padding: '4px 10px', }}>
          <span className="pulse-dot" style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#34d399', display: 'inline-block',
          }} />
          <span style={{ fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '11px', color: 'var(--text-muted)' }}>
            Open to work
          </span>
        </div>

        <Link href="/resume.pdf" target="_blank"
          style={{ fontSize: '13px', color: 'var(--text-secondary)',
            textDecoration: 'none', transition: 'color 150ms' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
          Resume ↗
        </Link>
      </div>
    </nav>
  )
}