'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function About() {
  const [imgErr, setImgErr] = useState(false)

  return (
    <section id="about" style={{
      padding: 'clamp(4rem,10vw,8rem) 24px',
      borderTop: '1px solid var(--border)',
      maxWidth: '1400px',
      margin: '0 auto',
      width: '100%',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '4rem',
        alignItems: 'start',
      }}>
        {/* Left: text */}
        <div>
          <p style={{ fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em',
            color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            About Me
          </p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 500,
            letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '1.5rem',
            lineHeight: 1.15 }}>
            Where Code Meets Craft
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              'My interest in CS sparked when I realized programming is the closest thing to magic — the ability to conceive an idea and build a fully functional product with just code. As a Computer Science undergrad at NIT Patna, I\'ve turned that fascination into a daily practice.',
              'Right now I\'m split between full-stack application development and machine learning systems. Arbitrage (a real-time crypto price tracker with automated email alerts) and NexusForge (a decentralized escrow DAO) are my two flagship builds.',
              'I\'m looking for software engineering internships and open-source collaborations where I can contribute to production-grade systems. Fast-paced teams working on hard problems — that\'s the environment I want.',
              'Outside of shipping code, you\'ll find me on Codeforces and LeetCode, grinding algorithms. I have a deep interest in cinematic UI design — the kind of interfaces that feel alive.',
            ].map((p, i) => (
              <p key={i} style={{ fontSize: '15px', color: 'var(--text-secondary)',
                lineHeight: 1.7 }}>
                {p}
              </p>
            ))}
          </div>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '2rem' }}>
            {[
              { label: 'GitHub ↗', href: 'https://github.com/AdityaKumar1511' },
              { label: 'LinkedIn ↗', href: 'https://linkedin.com/in/aditya-kumar-57a988374/' },
              { label: 'Email ↗', href: 'mailto:aditya.kumar00706@gmail.com' },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                style={{ fontSize: '13px', color: 'var(--text-muted)',
                  textDecoration: 'none', transition: 'color 150ms' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: photo + badges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Profile image or initials */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '280px',
            aspectRatio: '1', borderRadius: '16px', overflow: 'hidden',
            border: '1px solid var(--border)', background: 'var(--surface)' }}>
            {!imgErr ? (
              <Image
                src="/profile.jpg"
                alt="Aditya Kumar"
                fill
                style={{ objectFit: 'cover' }}
                onError={() => setImgErr(true)}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex',
                alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-geist-mono), monospace',
                  fontSize: '4rem', color: 'var(--text-muted)', fontWeight: 300 }}>
                  AK
                </span>
              </div>
            )}
          </div>

          {/* Quality badges */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['Clean Code', 'Fast Systems', 'Type Safe'].map(badge => (
              <span key={badge} style={{
                fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: '11px', color: 'var(--text-secondary)',
                border: '1px solid var(--border)', borderRadius: '6px',
                padding: '6px 12px',
              }}>
                {badge}
              </span>
            ))}
          </div>

          {/* Stars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>★★★★★</span>
            <span style={{ fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: '11px', color: 'var(--text-muted)' }}>
              Trusted by teams
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}