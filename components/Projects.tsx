'use client'
import Link from 'next/link'
import projects from '@/data/projects.json'

function getProjectStyles(slug: string) {
  switch (slug) {
    case 'arbitrage':
      return {
        bg: '#ba5c43', // Terracotta Orange
        border: 'rgba(255, 255, 255, 0.15)',
        glow: 'rgba(186, 92, 67, 0.3)',
        accent: '#aed8e6', // light cyan
        btnText: '#ba5c43',
      }
    case 'nexusforge':
      return {
        bg: '#4f6d5a', // Sage Green
        border: 'rgba(255, 255, 255, 0.15)',
        glow: 'rgba(79, 109, 90, 0.3)',
        accent: '#c2ebd4', // light sage
        btnText: '#4f6d5a',
      }
    case 'skylens':
      return {
        bg: '#d0845c', // Ochre/Warm Clay
        border: 'rgba(255, 255, 255, 0.15)',
        glow: 'rgba(208, 132, 92, 0.3)',
        accent: '#f7d8c6', // light clay
        btnText: '#d0845c',
      }
    case 'cipherkit':
      return {
        bg: '#a34851', // Crimson/Muted Red
        border: 'rgba(255, 255, 255, 0.15)',
        glow: 'rgba(163, 72, 81, 0.3)',
        accent: '#f5d5d8', // light crimson
        btnText: '#a34851',
      }
    default:
      return {
        bg: '#ba5c43',
        border: 'rgba(255, 255, 255, 0.15)',
        glow: 'rgba(186, 92, 67, 0.3)',
        accent: '#aed8e6',
        btnText: '#ba5c43',
      }
  }
}

function getProjectIcon(slug: string) {
  const strokeProps = {
    viewBox: '0 0 24 24',
    width: '40',
    height: '40',
    stroke: 'currentColor',
    strokeWidth: '1.5',
    fill: 'none',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (slug) {
    case 'arbitrage':
      return (
        <svg {...strokeProps}>
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    case 'nexusforge':
      return (
        <svg {...strokeProps}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )
    case 'skylens':
      return (
        <svg {...strokeProps}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      )
    case 'cipherkit':
      return (
        <svg {...strokeProps}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M10 4v16" />
          <path d="M2 10h8" />
          <path d="M10 14h12" />
        </svg>
      )
    default:
      return (
        <svg {...strokeProps}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
  }
}

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-label-container">
        <span className="projects-label-line" />
        <span className="projects-label-text">Selected projects</span>
      </div>

      <div className="projects-stack-container">
        {projects.map((project, i) => {
          const styleConfig = getProjectStyles(project.slug)

          return (
            <div
              key={project.slug}
              className="project-card"
              style={{
                '--project-bg': styleConfig.bg,
                '--project-border': styleConfig.border,
                '--project-glow': styleConfig.glow,
                '--project-accent': styleConfig.accent,
                '--card-index': i,
              } as React.CSSProperties}
            >
              {/* Left Column: Details */}
              <div className="project-card-left">
                <span className="project-number">
                  0{i + 1} &mdash; 0{projects.length}
                </span>
                <h3 className="project-title">{project.name}</h3>
                <p className="project-desc">{project.description}</p>
                
                <div className="project-tech-tags">
                  {project.tech.map(t => (
                    <span key={t} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>

                {project.impact && (
                  <span className="project-impact">
                    &rarr; {project.impact}
                  </span>
                )}

                <div className="project-actions">
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      className="project-btn primary-btn"
                      style={{
                        color: styleConfig.btnText,
                      }}
                    >
                      Live Preview ↗
                    </Link>
                  )}
                  {project.repoUrl && (
                    <Link href={project.repoUrl} target="_blank" className="project-btn secondary-btn">
                      GitHub Repository ↗
                    </Link>
                  )}
                </div>
              </div>

              {/* Right Column: Visual Preview */}
              <div className="project-card-right">
                <div className="project-image-container">
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="project-image"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        const parent = e.currentTarget.parentElement
                        if (parent) {
                          const fallback = parent.querySelector('.project-image-fallback')
                          if (fallback) fallback.setAttribute('style', 'display: flex;')
                        }
                      }}
                    />
                  ) : null}
                  <div
                    className="project-image-fallback"
                    style={{ display: project.thumbnail ? 'none' : 'flex' }}
                  >
                    <div className="fallback-art">
                      <span className="fallback-icon">{getProjectIcon(project.slug)}</span>
                      <span className="fallback-text">{project.name.toUpperCase()}</span>
                    </div>
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
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        .projects-label-container {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 3rem;
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

        .projects-stack-container {
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
        }

        .project-card {
          --sticky-top: 100px;
          --sticky-gap: 0px;
          position: sticky;
          top: calc(var(--sticky-top) + var(--card-index) * var(--sticky-gap));
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          border-radius: 32px;
          min-height: 400px;
          box-shadow: 0 -20px 40px rgba(0, 0, 0, 0.4);
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
          box-sizing: border-box;
          border: 1px solid var(--project-border);
          background: var(--project-bg);
          color: #ffffff;
          margin-bottom: clamp(100px, 15vh, 150px);
        }

        .project-card:hover {
          border-color: rgba(255, 255, 255, 0.4);
        }

        .project-card-left {
          padding: clamp(2rem, 4vw, 3.5rem) clamp(1.5rem, 3vw, 2.5rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          text-align: left;
        }

        .project-card-right {
          position: relative;
          background: rgba(0, 0, 0, 0.15);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border-left: 1px solid var(--project-border);
        }

        .project-image-container {
          width: 100%;
          height: 100%;
          position: relative;
          min-height: 250px;
        }

        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .project-card:hover .project-image {
          transform: scale(1.04);
        }

        .project-image-fallback {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
        }

        .fallback-art {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .fallback-icon {
          color: var(--project-accent);
          opacity: 0.8;
          transition: transform 0.3s ease;
        }
        
        .project-card:hover .fallback-icon {
          transform: scale(1.1);
        }

        .fallback-text {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.7);
        }

        .project-number {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1.25rem;
          letter-spacing: 0.1em;
        }

        .project-title {
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          font-weight: 500;
          color: #ffffff;
          margin: 0 0 1.25rem 0;
          letter-spacing: -0.03em;
        }

        .project-desc {
          font-size: clamp(13px, 1.6vw, 14px);
          color: rgba(255, 255, 255, 0.9);
          max-width: 580px;
          line-height: 1.6;
          margin: 0 0 2rem 0;
        }

        .project-tech-tags {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          gap: 8px;
          margin-bottom: 2rem;
          max-width: 550px;
        }

        .tech-tag {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 99px;
          padding: 4px 12px;
          background: rgba(255, 255, 255, 0.08);
        }

        .project-impact {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          color: var(--project-accent);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 2.5rem;
          display: block;
        }

        .project-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: flex-start;
        }

        .project-btn {
          font-family: var(--font-geist-mono), monospace;
          font-size: 12px;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 999px;
          transition: all 200ms ease;
          border: 1px solid transparent;
        }

        .primary-btn {
          background: #ffffff;
          font-weight: 500;
          border: 1px solid transparent;
        }

        .primary-btn:hover {
          background: transparent !important;
          border-color: #ffffff;
          color: #ffffff !important;
        }

        .secondary-btn {
          background: transparent;
          border-color: rgba(255, 255, 255, 0.3);
          color: rgba(255, 255, 255, 0.9);
        }

        .secondary-btn:hover {
          border-color: #ffffff;
          color: #ffffff;
        }
      `}</style>
    </section>
  )
}
