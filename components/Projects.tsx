'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import projects from '@/data/projects.json'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activePanelIndex, setActivePanelIndex] = useState<number | null>(null)

  useGSAP(() => {
    const panels = gsap.utils.toArray<HTMLElement>('.panel')
    const totalPanels = panels.length

    panels.forEach((panel, i) => {
      const isLast = i === totalPanels - 1

      ScrollTrigger.create({
        trigger: panel,
        start: 'top top',
        end: 'bottom top',
        pin: !isLast,
        pinSpacing: false,
        onEnter: () => {
          setActivePanelIndex(i)
        },
        onEnterBack: () => {
          setActivePanelIndex(i)
        },
      })
    })

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, { scope: containerRef })

  return (
    <section id="projects">
      <div className="proj-section-label">
        <span className="proj-label-accent" />
        <span className="proj-label-text">Featured Work</span>
      </div>

      <div className="proj-stack" ref={containerRef}>
        {projects.map((project, i) => (
          <section
            key={project.slug}
            className="panel"
            data-index={i}
            style={{ zIndex: i + 1 }}
          >
            <div className="panel-inner">
              <div className="proj-hero">
                <div className="proj-hero-left">
                  <h3 className="proj-hero-title">{project.name}</h3>
                </div>
                <div className="proj-hero-right">
                  <span className="proj-hero-year">{project.year}</span>
                  <span className="proj-hero-category">{project.category}</span>
                  <div className="proj-hero-tags">
                    {project.tech.map(t => (
                      <span key={t} className="proj-pill">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="proj-dashed" />

              <div className="proj-grid">
                <div className="proj-grid-left">
                  <p className="proj-desc">{project.description}</p>
                  {project.impact && (
                    <span className="proj-impact">{project.impact}</span>
                  )}
                  <div className="proj-actions">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        className="proj-btn proj-btn-primary"
                      >
                        LIVE ↗
                      </Link>
                    )}
                    {project.repoUrl && (
                      <Link
                        href={project.repoUrl}
                        target="_blank"
                        className="proj-btn proj-btn-secondary"
                      >
                        REPO ↗
                      </Link>
                    )}
                  </div>
                </div>

                <div className="proj-grid-center">
                  <div className="proj-preview-card proj-preview-main">
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.name}
                        className="proj-preview-img"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          const fallback = e.currentTarget.parentElement?.querySelector('.proj-preview-placeholder')
                          if (fallback) (fallback as HTMLElement).style.display = 'flex'
                        }}
                      />
                    ) : null}
                    <div
                      className="proj-preview-placeholder"
                      style={{ display: project.thumbnail ? 'none' : 'flex' }}
                    >
                      <div className="proj-circle-mask">
                        <span className="proj-circle-label">
                          {activePanelIndex === i ? 'TERMINAL' : `FEATURED WORK 0${String(i + 1).padStart(2, '0')}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="proj-grid-right">
                  <div className="proj-preview-card proj-preview-sub">
                    <div className="proj-preview-placeholder">
                      <div className="proj-circle-mask small">
                        <span className="proj-circle-label">CLI VIEW</span>
                      </div>
                    </div>
                  </div>
                  <div className="proj-preview-card proj-preview-sub">
                    <div className="proj-preview-placeholder">
                      <div className="proj-circle-mask small">
                        <span className="proj-circle-label">METRICS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <style>{`
        /* ── Section wrapper ── */
        #projects {
          background: var(--bg);
        }

        .proj-section-label {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: clamp(4rem, 10vw, 8rem) 24px 0;
        }

        .proj-label-accent {
          width: 28px;
          height: 3px;
          background: #ff5f38;
          display: block;
        }

        .proj-label-text {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #ff5f38;
          font-weight: 700;
        }

        /* ── Panel stack ── */
        .proj-stack {
          position: relative;
        }

        /* ── Each panel — the core stacking mechanic ── */
        .panel {
          position: relative;
          height: 100vh;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          overflow: hidden;
          will-change: transform;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          box-sizing: border-box;
        }

        .panel-inner {
          width: 100%;
          max-width: 1800px;
          margin: 0 auto;
          padding: 0 48px;
          box-sizing: border-box;
        }

        /* ── Hero Row ── */
        .proj-hero {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: clamp(1.5rem, 3vw, 2rem);
        }

        .proj-hero-left {
          flex: 1;
          min-width: 0;
        }

        .proj-hero-title {
          font-family: 'Impact', 'Arial Black', 'Haettenschweiler', 'Franklin Gothic Bold', sans-serif;
          font-size: clamp(3rem, 8vw, 5.5rem);
          font-weight: 900;
          text-transform: uppercase;
          color: #ffffff;
          margin: 0;
          line-height: 0.95;
          letter-spacing: -0.02em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .proj-hero-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          flex-shrink: 0;
          padding-top: 6px;
        }

        .proj-hero-year {
          font-family: 'Impact', 'Arial Black', 'Haettenschweiler', 'Franklin Gothic Bold', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 900;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1;
        }

        .proj-hero-category {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.5);
        }

        .proj-hero-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          justify-content: flex-end;
          margin-top: 4px;
        }

        .proj-pill {
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

        /* ── Dashed Divider ── */
        .proj-dashed {
          border-top: 1px dashed rgba(255, 255, 255, 0.12);
          margin-bottom: clamp(1.5rem, 3vw, 2rem);
        }

        /* ── Grid Showcase ── */
        .proj-grid {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          gap: 16px;
          min-height: 280px;
        }

        .proj-grid-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 8px 0;
        }

        .proj-desc {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.9;
          letter-spacing: 0.05em;
          margin: 0 0 1.5rem 0;
        }

        .proj-impact {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          color: #ff5f38;
          letter-spacing: 0.08em;
          margin-bottom: 1.5rem;
          display: block;
        }

        .proj-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .proj-btn {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 3px;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .proj-btn-primary {
          background: #ff5f38;
          color: #121212;
          font-weight: 700;
          border-color: transparent;
        }

        .proj-btn-primary:hover {
          background: transparent;
          border-color: #ff5f38;
          color: #ff5f38;
        }

        .proj-btn-secondary {
          background: transparent;
          color: rgba(255, 255, 255, 0.6);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .proj-btn-secondary:hover {
          border-color: rgba(255, 255, 255, 0.5);
          color: #ffffff;
        }

        /* ── Preview Cards ── */
        .proj-preview-card {
          background: #1a1a1a;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }

        .proj-preview-main {
          width: 100%;
          height: 100%;
          min-height: 250px;
        }

        .proj-preview-sub {
          flex: 1;
        }

        .proj-grid-center {
          display: flex;
        }

        .proj-grid-center .proj-preview-main {
          flex: 1;
        }

        .proj-grid-right {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .proj-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .proj-preview-card:hover .proj-preview-img {
          transform: scale(1.04);
        }

        .proj-preview-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1a1a1a;
        }

        .proj-circle-mask {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, transparent 70%);
          border: 1px dashed rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-12deg);
        }

        .proj-circle-mask.small {
          width: 80px;
          height: 80px;
        }

        .proj-circle-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.2);
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }

        .proj-circle-mask.small .proj-circle-label {
          font-size: 8px;
          writing-mode: horizontal-tb;
          transform: none;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .proj-hero {
            flex-direction: column;
            gap: 1rem;
          }

          .proj-hero-title {
            font-size: clamp(2rem, 10vw, 3.5rem);
            white-space: normal;
          }

          .proj-hero-right {
            align-items: flex-start;
          }

          .proj-grid {
            grid-template-columns: 1fr;
            gap: 16px;
            min-height: auto;
          }

          .proj-grid-right {
            flex-direction: row;
            gap: 16px;
          }

          .proj-preview-main {
            min-height: 200px;
          }
        }

        @media (max-width: 480px) {
          .proj-grid-right {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  )
}
