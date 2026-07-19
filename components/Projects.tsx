'use client'

const projects = [
  {
    slug: 'arbitrage',
    name: 'Arbitrage',
    status: 'live' as const,
    statusLabel: 'Live',
    category: 'Web',
    description: 'Live crypto price tracker with real-time email alerts',
    year: '2025',
    tech: ['Next.js', 'Supabase', 'Firecrawl', 'Resend', 'Vercel'],
    impact: 'Tracks 50+ assets in real-time',
    liveUrl: 'https://arbitrage.vercel.app',
    repoUrl: 'https://github.com/AdityaKumar1511/arbitrage',
    thumbnail: '/projects/arb.webp',
  },
  {
    slug: 'nexusforge',
    name: 'NexusForge',
    status: 'shipped' as const,
    statusLabel: 'Shipped',
    category: 'Blockchain',
    description: 'Blockchain escrow platform governed by a DAO tribunal',
    year: '2024',
    tech: ['Wagmi', 'Chainlink VRF', 'IPFS', 'Firebase'],
    impact: 'Multi-sig escrow with verifiable randomness',
    liveUrl: 'https://nexusforge.vercel.app',
    repoUrl: 'https://github.com/AdityaKumar1511/nexusforge',
    thumbnail: '/projects/nex.webp',
  },
  {
    slug: 'skylens',
    name: 'SkyLens',
    status: 'finalist' as const,
    statusLabel: 'Finalist',
    category: 'Machine Learning',
    description: 'Satellite imagery analysis platform with ML-powered terrain classification',
    year: '2025',
    tech: ['Python', 'TensorFlow', 'FastAPI', 'MapboxGL', 'AWS'],
    impact: 'Processes 10k+ images daily with 94% accuracy',
    liveUrl: 'https://skylens.vercel.app',
    repoUrl: 'https://github.com/AdityaKumar1511/skylens',
    thumbnail: null,
  },
  {
    slug: 'cipherkit',
    name: 'CipherKit',
    status: 'wip' as const,
    statusLabel: 'In Progress',
    category: 'Developer Tools',
    description: 'End-to-end encrypted messaging SDK for developers',
    year: '2026',
    tech: ['Rust', 'WebAssembly', 'TypeScript', 'libsodium'],
    impact: 'Sub-1ms encryption overhead per message',
    liveUrl: null,
    repoUrl: 'https://github.com/AdityaKumar1511/cipherkit',
    thumbnail: null,
  },
] as const

type ProjectStatus = 'live' | 'finalist' | 'wip' | 'shipped'

const cardBg: string[] = ['#0e0e0e', '#131313', '#181818', '#1e1e1e']

const statusColors: Record<ProjectStatus, { color: string; bg: string; border: string }> = {
  live:     { color: '#4ade80', bg: 'rgba(74,222,128,0.08)',  border: 'rgba(74,222,128,0.2)'  },
  finalist: { color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.2)'  },
  wip:      { color: '#888888', bg: 'rgba(136,136,136,0.08)', border: 'rgba(136,136,136,0.2)' },
  shipped:  { color: '#aed8e6', bg: 'rgba(174,216,230,0.08)', border: 'rgba(174,216,230,0.2)' },
}

const NAV_OFFSET = 0

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-label-container">
        <span className="projects-label-line" />
        <span className="projects-label-text">Selected projects</span>
      </div>

      <div className="projects-stack">
        {projects.map((project, i) => {
          const sc = statusColors[project.status]
          return (
            <div
              key={project.slug}
              className="project-card-wrapper"
              style={{
                top: `${NAV_OFFSET}px`,
                zIndex: i + 1,
              }}
            >
              <div
                className="project-tab-ear"
                style={{
                  width: `calc(100% / ${projects.length})`,
                  marginLeft: `calc(100% / ${projects.length} * ${i})`,
                  background: cardBg[i],
                }}
              >
                <span className="ear-number">0{i + 1}</span>
                <span className="ear-dot" style={{ background: sc.color }} />
                <span className="ear-name">{project.name}</span>
              </div>

              <div
                className="project-card-body"
                style={{ background: cardBg[i] }}
              >
                <div className="card-hero-row">
                  <h3 className="card-hero-title">{project.name}</h3>
                  <div className="card-hero-meta">
                    <span className="card-hero-year">{project.year}</span>
                    <span className="card-hero-category">{project.category}</span>
                    <span
                      className="card-status-badge"
                      style={{
                        color: sc.color,
                        background: sc.bg,
                        border: `1px solid ${sc.border}`,
                      }}
                    >
                      {project.status === 'live' && '● '}
                      {project.status === 'finalist' && '◎ '}
                      {project.status === 'wip' && '○ '}
                      {project.status === 'shipped' && '✓ '}
                      {project.statusLabel}
                    </span>
                    <div className="card-hero-pills">
                      {project.tech.map(t => (
                        <span key={t} className="card-pill">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <hr className="card-hr" />

                <div className="card-showcase">
                  <div className="card-showcase-left">
                    <p className="card-desc">{project.description}</p>
                    {project.impact && (
                      <span className="card-impact">{project.impact}</span>
                    )}
                    <div className="card-actions">
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer"
                          className="card-btn card-btn-primary">
                          LIVE ↗
                        </a>
                      )}
                      {project.repoUrl && (
                        <a href={project.repoUrl} target="_blank" rel="noreferrer"
                          className="card-btn card-btn-secondary">
                          REPO ↗
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="card-showcase-right">
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.name}
                        className="card-thumbnail-img"
                      />
                    ) : (
                      <div className="card-thumbnail-fallback">
                        <span className="card-thumbnail-fallback-num">0{i + 1}</span>
                        <span className="card-thumbnail-fallback-label">{project.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <style>{`

  .projects-section {
    padding: clamp(4rem, 10vw, 8rem) 24px;
    border-top: 1px solid var(--border);
    max-width: 1800px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
  }

  .projects-label-container {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: clamp(2rem, 4vh, 3rem);
  }

  .projects-label-line {
    width: 24px;
    height: 1px;
    background: #ff5f38;
  }

  .projects-label-text {
    font-family: var(--font-geist-mono), monospace;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #ff5f38;
    font-weight: 700;
  }

  .projects-stack {
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: clamp(60px, 12vh, 120px);
  }

  .project-card-wrapper {
    position: sticky;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-bottom: clamp(60px, 10vh, 100px);
  }

  /* ── TAB EAR ── */
  .project-tab-ear {
    height: 44px;
    clip-path: polygon(0 0, 82% 0, 100% 100%, 0 100%);
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 14px;
    position: relative;
    z-index: 2;
    flex-shrink: 0;
    transition: background 200ms ease;
  }

  .ear-number {
    font-family: var(--font-geist-mono), monospace;
    font-size: 10px;
    font-weight: 700;
    color: #e07a5f;
    letter-spacing: 0.06em;
    flex-shrink: 0;
  }

  .ear-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .ear-name {
    font-family: var(--font-geist-mono), monospace;
    font-size: 11px;
    color: #aaaaaa;
    letter-spacing: 0.03em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 200ms ease;
  }

  .project-card-wrapper:hover .ear-name {
    color: #cccccc;
  }

  /* ── CARD BODY ── */
  .project-card-body {
    width: 100%;
    height: calc(100svh - 44px);
    overflow: hidden;
    padding: clamp(1.25rem, 2.5vw, 2rem) clamp(1.5rem, 3vw, 2.5rem);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
    box-shadow: 0 -16px 48px rgba(0, 0, 0, 0.6);
  }

  /* ── TOP ZONE: Hero Row ── */
  .card-hero-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: clamp(0.75rem, 1.5vw, 1rem);
  }

  .card-hero-title {
    font-family: 'Impact', 'Arial Black', 'Haettenschweiler', 'Franklin Gothic Bold', sans-serif;
    font-size: clamp(3rem, 5.5vw, 4.5rem);
    font-weight: 900;
    text-transform: uppercase;
    color: #ffffff;
    margin: 0;
    line-height: 0.95;
    letter-spacing: -0.02em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    min-width: 0;
  }

  .card-hero-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
    flex-shrink: 0;
    padding-top: 6px;
  }

  .card-hero-year {
    font-family: 'Impact', 'Arial Black', 'Haettenschweiler', 'Franklin Gothic Bold', sans-serif;
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    font-weight: 900;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1;
  }

  .card-hero-category {
    font-family: var(--font-geist-mono), monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: rgba(255, 255, 255, 0.5);
  }

  .card-status-badge {
    font-family: var(--font-geist-mono), monospace;
    font-size: 10px;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 999px;
    letter-spacing: 0.06em;
  }

  .card-hero-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: flex-end;
    margin-top: 4px;
  }

  .card-pill {
    font-family: var(--font-geist-mono), monospace;
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 3px;
    padding: 4px 10px;
    background: rgba(255, 255, 255, 0.04);
  }

  /* ── SEPARATOR ── */
  .card-hr {
    border: none;
    border-top: 1px dashed rgba(255, 255, 255, 0.12);
    margin: 0 0 clamp(0.75rem, 1.5vw, 1rem) 0;
  }

  /* ── BOTTOM ZONE: 2-Column Showcase ── */
  .card-showcase {
    display: grid;
    grid-template-columns: 55fr 45fr;
    gap: 16px;
    min-height: 0;
    flex: 1;
  }

  .card-showcase-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8px 0;
  }

  .card-desc {
    font-family: var(--font-geist-mono), monospace;
    font-size: 11px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.55);
    line-height: 1.9;
    letter-spacing: 0.05em;
    margin: 0 0 1.5rem 0;
  }

  .card-impact {
    font-family: var(--font-geist-mono), monospace;
    font-size: 10px;
    text-transform: uppercase;
    color: #ff5f38;
    letter-spacing: 0.08em;
    margin-bottom: 1.5rem;
    display: block;
  }

  .card-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .card-btn {
    font-family: var(--font-geist-mono), monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 3px;
    transition: all 200ms ease;
    border: 1px solid transparent;
  }

  .card-btn-primary {
    background: #ff5f38;
    color: #121212;
    font-weight: 700;
    border-color: transparent;
  }

  .card-btn-primary:hover {
    background: transparent;
    border-color: #ff5f38;
    color: #ff5f38;
  }

  .card-btn-secondary {
    background: transparent;
    color: rgba(255, 255, 255, 0.6);
    border-color: rgba(255, 255, 255, 0.15);
  }

  .card-btn-secondary:hover {
    border-color: rgba(255, 255, 255, 0.5);
    color: #ffffff;
  }

  /* ── Right: Thumbnail ── */
  .card-showcase-right {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 0;
  }

  .card-thumbnail-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    display: block;
  }

  .card-thumbnail-fallback {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: 1px dashed rgba(255, 255, 255, 0.08);
    background: #1a1a1a;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .card-thumbnail-fallback-num {
    font-family: 'Impact', 'Arial Black', 'Haettenschweiler', 'Franklin Gothic Bold', sans-serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 900;
    color: rgba(255, 255, 255, 0.08);
  }

  .card-thumbnail-fallback-label {
    font-family: var(--font-geist-mono), monospace;
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: rgba(255, 255, 255, 0.15);
  }

  /* ── MOBILE ── */
  @media (max-width: 900px) {
    .card-hero-row {
      flex-direction: column;
      gap: 1rem;
    }

    .card-hero-title {
      font-size: clamp(2rem, 10vw, 3.5rem);
      white-space: normal;
    }

    .card-hero-meta {
      align-items: flex-start;
    }

    .card-showcase {
      grid-template-columns: 1fr;
      gap: 16px;
      min-height: auto;
    }

    .card-showcase-right {
      min-height: 180px;
    }
  }

  @media (max-width: 768px) {
    .projects-stack {
      padding-bottom: calc(100svh + 60px);
    }

    .project-card-wrapper {
      margin-bottom: 0;
    }

    .project-tab-ear {
      min-width: 60px;
      height: 36px;
      padding: 0 10px;
    }

    .ear-name {
      display: none;
    }

    .project-card-body {
      min-height: 100svh;
      height: auto;
      padding: 1.5rem 1.25rem;
    }

    .card-hero-title {
      font-size: 2rem;
    }

    .card-actions {
      flex-direction: column;
      align-items: center;
    }

    .card-btn {
      width: 100%;
      text-align: center;
    }

    .card-showcase-right {
      min-height: 140px;
    }

    .card-showcase {
      min-height: auto;
    }
  }

  @media (max-width: 480px) {
    .projects-section {
      padding: 3rem 16px;
    }

    .project-card-body {
      padding: 1.25rem 1rem;
    }

    .card-hero-title {
      font-size: 1.6rem;
    }
  }

`}</style>
    </section>
  )
}
