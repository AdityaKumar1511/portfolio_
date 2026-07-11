'use client'
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
  return (
    <section id="projects" className="projects-section">
      <p className="projects-header-label">
        Selected projects
      </p>

      <div className="projects-stack-container">
        {projects.map((project, i) => (
          <div
            key={project.slug}
            className="project-sticky-card"
            style={{
              top: `${100 + i * 24}px`,
              zIndex: i + 1,
            }}
          >
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
                <Link href={project.liveUrl} target="_blank" className="project-btn primary-btn">
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
        ))}
      </div>

      <style>{`
        .projects-section {
          padding: clamp(4rem, 10vw, 8rem) 24px;
          border-top: 1px solid var(--border);
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        .projects-header-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          margin-bottom: 3rem;
        }

        .projects-stack-container {
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
        }

        .project-sticky-card {
          position: sticky;
          background: #121212;
          border: 1px solid var(--border);
          border-radius: 32px;
          padding: clamp(2.5rem, 6vw, 4.5rem) 24px;
          min-height: 440px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          box-shadow: 0 -20px 40px rgba(0, 0, 0, 0.6);
          margin-bottom: clamp(60px, 10vh, 100px);
          box-sizing: border-box;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
        }

        .project-sticky-card:hover {
          border-color: rgba(255, 255, 255, 0.2);
        }

        .project-number {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
          letter-spacing: 0.1em;
        }

        .project-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 500;
          color: var(--text);
          margin: 0 0 1.25rem 0;
          letter-spacing: -0.03em;
        }

        .project-desc {
          font-size: clamp(14px, 1.8vw, 15px);
          color: var(--text-secondary);
          max-width: 580px;
          line-height: 1.6;
          margin: 0 0 2rem 0;
        }

        .project-tech-tags {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-bottom: 2rem;
          max-width: 550px;
        }

        .tech-tag {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          color: var(--text-secondary);
          border: 1px solid var(--border);
          border-radius: 99px;
          padding: 4px 12px;
          background: rgba(255, 255, 255, 0.02);
        }

        .project-impact {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          color: #aed8e6;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 2.5rem;
          display: block;
        }

        .project-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
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
          color: #0a0a0a;
          font-weight: 500;
        }

        .primary-btn:hover {
          background: transparent;
          border-color: #ffffff;
          color: #ffffff;
        }

        .secondary-btn {
          background: transparent;
          border-color: var(--border);
          color: var(--text-secondary);
        }

        .secondary-btn:hover {
          border-color: #ffffff;
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .project-sticky-card {
            margin-bottom: 40px;
            min-height: auto;
          }
        }
      `}</style>
    </section>
  )
}
