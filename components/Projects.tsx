'use client'
import { useState } from 'react'
import Link from 'next/link'

const projects = [
  {
    slug: 'arbitrage',
    name: 'Arbitrage',
    description: 'Live crypto price tracker with real-time email alerts and automated scanning',
    tech: ['Next.js', 'Supabase', 'Firecrawl', 'Resend', 'Vercel'],
    impact: 'Tracks 50+ assets in real-time',
    liveUrl: 'https://arbitrage.vercel.app',
    repoUrl: 'https://github.com/AdityaKumar1511/arbitrage',
    featured: true,
    year: '2025',
  },
  {
    slug: 'nexusforge',
    name: 'NexusForge',
    description: 'Decentralized blockchain escrow platform governed by a DAO tribunal',
    tech: ['Wagmi', 'Chainlink VRF', 'IPFS', 'Firebase'],
    impact: 'Multi-sig escrow with verifiable randomness',
    liveUrl: '',
    repoUrl: 'https://github.com/AdityaKumar1511/nexusforge',
    featured: false,
    year: '2024',
  },
  {
    slug: 'skylens',
    name: 'SkyLens',
    description: 'Satellite AQI and HCHO detection using Sentinel-5P TROPOMI data for ISRO BAH',
    tech: ['Next.js', 'FastAPI', 'XGBoost', 'Leaflet', 'MongoDB', 'Docker'],
    impact: 'ISRO BAH 2026 finalist — Team CodeBlooded',
    liveUrl: '',
    repoUrl: 'https://github.com/AdityaKumar1511',
    featured: true,
    year: '2026',
  },
  {
    slug: 'cipherkit',
    name: 'CipherKit',
    description: 'C++17 static library of classical ciphers distributed via CMake FetchContent',
    tech: ['C++17', 'CMake', 'GoogleTest', 'GitHub Actions', 'Doxygen'],
    impact: 'CI matrix across Ubuntu / macOS / Windows',
    liveUrl: '',
    repoUrl: 'https://github.com/AdityaKumar1511',
    featured: false,
    year: '2025',
  },
]

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="projects" style={{
      padding: 'clamp(4rem,10vw,8rem) 24px',
      borderTop: '1px solid var(--border)',
      maxWidth: '1400px',
      margin: '0 auto',
      width: '100%',
    }}>
      <p style={{
        fontFamily: 'var(--font-geist-mono), monospace',
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        color: 'var(--text-muted)',
        marginBottom: '3rem',
      }}>
        Selected projects
      </p>

      <div>
        {projects.map((project, i) => (
          <div
            key={project.slug}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              borderTop: '1px solid var(--border)',
              padding: '24px 12px',
              display: 'grid',
              gridTemplateColumns: '70px 1fr auto',
              gap: '24px',
              alignItems: 'start',
              background: hoveredIndex === i ? 'var(--surface)' : 'transparent',
              borderLeft: hoveredIndex === i ? '2px solid var(--text-muted)' : '2px solid transparent',
              transition: 'background 200ms, border-left 200ms',
              borderRadius: '8px',
              margin: '0 -12px',
            }}
          >
            {/* Left: number + year */}
            <div>
              <p style={{ fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                0{i + 1}
              </p>
              <p style={{ fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: '10px', color: 'var(--text-muted)' }}>
                {project.year}
              </p>
              {project.featured && (
                <p style={{ fontFamily: 'var(--font-geist-mono), monospace',
                  fontSize: '9px', color: 'var(--text-muted)',
                  textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>
                  Featured
                </p>
              )}
            </div>

            {/* Center: content */}
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text)',
                marginBottom: '6px', lineHeight: 1.3 }}>
                {project.name}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)',
                lineHeight: 1.6, marginBottom: '12px' }}>
                {project.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px',
                marginBottom: '8px' }}>
                {project.tech.map(t => (
                  <span key={t} style={{
                    fontFamily: 'var(--font-geist-mono), monospace',
                    fontSize: '10px',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    padding: '2px 8px',
                  }}>
                    {t}
                  </span>
                ))}
              </div>
              {project.impact && (
                <p style={{ fontFamily: 'var(--font-geist-mono), monospace',
                  fontSize: '11px', color: 'var(--text-muted)' }}>
                  → {project.impact}
                </p>
              )}
            </div>

            {/* Right: links */}
            <div style={{ display: 'flex', flexDirection: 'column',
              gap: '8px', alignItems: 'flex-end', paddingTop: '2px' }}>
              {project.liveUrl && (
                <Link href={project.liveUrl} target="_blank"
                  style={{ fontFamily: 'var(--font-geist-mono), monospace',
                    fontSize: '12px', color: 'var(--text-secondary)',
                    textDecoration: 'none', transition: 'color 150ms' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                  Live ↗
                </Link>
              )}
              {project.repoUrl && (
                <Link href={project.repoUrl} target="_blank"
                  style={{ fontFamily: 'var(--font-geist-mono), monospace',
                    fontSize: '12px', color: 'var(--text-muted)',
                    textDecoration: 'none', transition: 'color 150ms' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                  GitHub ↗
                </Link>
              )}
            </div>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--border)' }} />
      </div>
    </section>
  )
}
