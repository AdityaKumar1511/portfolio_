'use client'

import React from 'react'
import Link from 'next/link'
import projectsData from '@/data/projects.json'
import theme from '@/data/theme.json'
import FadeIn from './FadeIn'
import { MacBookMockup, IPhoneMockup, NonLiveProjectShowcase } from './DeviceMockups'

const projects = projectsData.map(p => ({
  ...p,
  status: p.status as 'live' | 'finalist' | 'wip' | 'shipped',
}))

type ProjectStatus = 'live' | 'finalist' | 'wip' | 'shipped'

const cardBg: string[] = theme.projectCardBg
const statusColors = theme.projectStatusColors as Record<ProjectStatus, { color: string; bg: string; border: string }>

const NAV_OFFSET = 0

// Dot colors corresponding to the reference image (Green, Orange, Cyan)
const METRIC_DOT_COLORS = ['#4ade80', '#fa5f34', '#38bdf8']

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <FadeIn>
        <div className="projects-label-container">
          <span className="projects-label-line" />
          <span className="projects-label-text">Selected projects</span>
        </div>
      </FadeIn>

      <div className="projects-stack">
        {projects.map((project, i) => {
          const sc = statusColors[project.status]
          const metricStats = project.impactStats || [
            { value: 'LIVE', label: 'STATUS' },
            { value: project.year, label: 'YEAR' },
            { value: '100%', label: 'QUALITY' }
          ]

          return (
            <div
              key={project.slug}
              className="project-card-wrapper"
              style={{
                top: `${NAV_OFFSET}px`,
                zIndex: i + 1,
              }}
            >
              {/* Top Folder Tab Ear */}
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

              {/* Main Card Body */}
              <div
                className="project-card-body"
                style={{ background: cardBg[i] }}
              >
                {/* ── TOP HEADER ROW: Title & Metadata ── */}
                <FadeIn delay={i * 0.1}>
                  <div className="card-top-header">
                    {/* Big Bold Condensed Title */}
                    <h3 className="card-big-title">
                      {project.name}
                    </h3>

                    {/* Right-Side Meta Block */}
                    <div className="card-header-meta">
                      {/* Year */}
                      <div className="card-meta-year">
                        {project.year}
                      </div>

                      {/* Sub-Category Breadcrumb */}
                      <div className="card-meta-category">
                        {project.category.toUpperCase()} / {metricStats[0]?.label.toUpperCase() || 'ENGINEERING'}
                      </div>

                      {/* Tech & Highlight Badges */}
                      <div className="card-meta-pills">
                        {project.tech.map((t) => (
                          <span key={t} className="card-tech-pill">
                            {t}
                          </span>
                        ))}
                        {metricStats[0] && (
                          <span className="card-tech-pill card-tech-pill--accent">
                            {metricStats[0].value} {metricStats[0].label}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeIn>

                {/* Subtle Dashed Separator Line */}
                <div className="card-dashed-divider" />

                {/* ── 3-COLUMN SHOWCASE BODY ── */}
                <FadeIn delay={i * 0.1 + 0.08}>
                  <div className="card-content-grid">
                    {/* 1. Left Column: Description, Metric Rows, Action Buttons */}
                    <div className="col-left-info">
                      {/* Description */}
                      <p className="project-description-text">
                        {project.description.toUpperCase()}
                      </p>

                      {/* Dot-Led Metric Rows */}
                      <div className="metric-rows-container">
                        {metricStats.slice(0, 3).map((stat, statIdx) => (
                          <div key={statIdx} className="metric-row-item">
                            <div className="metric-row-left">
                              <span
                                className="metric-dot"
                                style={{ background: METRIC_DOT_COLORS[statIdx % METRIC_DOT_COLORS.length] }}
                              />
                              <span className="metric-label">
                                {stat.label.toUpperCase()}
                              </span>
                            </div>
                            <span className="metric-value-tag">
                              {stat.value.toUpperCase()}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons Row */}
                      <div className="card-actions-row">
                        {/* Live Site (or Primary Repo if no live URL) */}
                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-live-pill"
                          >
                            LIVE SITE ↗
                          </a>
                        ) : project.repoUrl ? (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-live-pill"
                          >
                            GITHUB ↗
                          </a>
                        ) : null}

                        {/* Case Study Link */}
                        <Link
                          href={`/projects/${project.slug}`}
                          className="btn-case-study"
                        >
                          CASE STUDY →
                        </Link>

                        {/* Code Repo Link */}
                        {project.repoUrl && project.liveUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-code-link"
                          >
                            CODE ↗
                          </a>
                        )}
                      </div>
                    </div>

                    {/* 2 & 3. Device Mockups (only if liveUrl exists) OR Non-Live Architecture Showcase */}
                    {project.liveUrl ? (
                      <>
                        <div className="col-center-macbook">
                          <MacBookMockup project={project} />
                        </div>
                        <div className="col-right-iphone">
                          <IPhoneMockup project={project} />
                        </div>
                      </>
                    ) : (
                      <div className="col-non-live-showcase">
                        <NonLiveProjectShowcase project={project} />
                      </div>
                    )}
                  </div>
                </FadeIn>
              </div>
            </div>
          )
        })}
      </div>

      <style>{`
        .projects-section {
          padding: clamp(4rem, 8vw, 7rem) var(--pad-x);
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
          margin-bottom: clamp(2rem, 3.5vh, 2.75rem);
          padding: 0;
        }

        .projects-label-line {
          width: 24px;
          height: 1px;
          background: #fa5f34;
        }

        .projects-label-text {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #fa5f34;
          font-weight: 700;
        }

        .projects-stack {
          display: flex;
          flex-direction: column;
          position: relative;
          padding-bottom: clamp(60px, 10vh, 100px);
        }

        .project-card-wrapper {
          position: sticky;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
          margin-bottom: clamp(60px, 8vh, 90px);
        }

        /* ── FOLDER TAB EAR ── */
        .project-tab-ear {
          height: 42px;
          clip-path: polygon(0 0, 84% 0, 100% 100%, 0 100%);
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 16px;
          position: relative;
          z-index: 2;
          flex-shrink: 0;
          transition: background 200ms ease;
        }

        .ear-number {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          font-weight: 700;
          color: #fa5f34;
          letter-spacing: 0.06em;
          flex-shrink: 0;
        }

        .ear-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .ear-name {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          color: #d4cec7;
          letter-spacing: 0.05em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* ── CARD BODY CONTAINER ── */
        .project-card-body {
          width: 100%;
          min-height: clamp(520px, 75vh, 680px);
          height: auto;
          padding: clamp(1.5rem, 2.2vw, 2.25rem);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          position: relative;
          z-index: 1;
          box-shadow: 0 -16px 48px rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 4px;
        }

        /* ── TOP HEADER ROW ── */
        .card-top-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: clamp(1rem, 1.8vw, 1.5rem);
          flex-wrap: wrap;
        }

        .card-big-title {
          font-family: 'Impact', 'Arial Black', 'Haettenschweiler', 'Franklin Gothic Bold', sans-serif;
          font-size: clamp(3.5rem, 8vw, 8rem);
          font-weight: 900;
          text-transform: uppercase;
          color: #f3eee8;
          margin: 0;
          line-height: 0.88;
          letter-spacing: -0.02em;
          flex: 1;
          min-width: 260px;
        }

        .card-header-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
          flex-shrink: 0;
          padding-bottom: 4px;
        }

        .card-meta-year {
          font-family: var(--font-geist-mono), monospace;
          font-size: 14px;
          font-weight: 800;
          color: #f3eee8;
          letter-spacing: 0.08em;
          line-height: 1;
        }

        .card-meta-category {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: rgba(212, 206, 199, 0.55);
          font-weight: 600;
        }

        .card-meta-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          justify-content: flex-end;
          align-items: center;
        }

        .card-tech-pill {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(212, 206, 199, 0.8);
          background: rgba(20, 21, 25, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 9999px;
          padding: 3px 10px;
          font-weight: 600;
        }

        .card-tech-pill--accent {
          color: #fa5f34;
          border-color: rgba(250, 95, 52, 0.3);
          background: rgba(250, 95, 52, 0.06);
        }

        /* ── DASHED SEPARATOR LINE ── */
        .card-dashed-divider {
          width: 100%;
          height: 1px;
          border-top: 1px dashed rgba(212, 206, 199, 0.16);
          margin-bottom: clamp(1.25rem, 2vw, 2rem);
        }

        /* ── 3-COLUMN CONTENT GRID ── */
        .card-content-grid {
          display: grid;
          grid-template-columns: 28fr 48fr 24fr;
          gap: clamp(1.25rem, 2vw, 2.5rem);
          align-items: stretch;
          width: 100%;
          flex: 1;
        }

        /* ── Left Column ── */
        .col-left-info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          gap: 1.25rem;
          padding-top: 4px;
        }

        .project-description-text {
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(12px, 0.95vw, 13.5px);
          font-weight: 500;
          line-height: 1.85;
          letter-spacing: 0.03em;
          color: rgba(212, 206, 199, 0.72);
          margin: 0;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 6;
          overflow: hidden;
        }

        /* Metric Rows with Indicator Dots */
        .metric-rows-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .metric-row-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 6px 10px;
          background: rgba(15, 16, 20, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }

        .metric-row-left {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }

        .metric-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .metric-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: rgba(212, 206, 199, 0.75);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .metric-value-tag {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #f3eee8;
          background: rgba(255, 255, 255, 0.06);
          padding: 2px 8px;
          border-radius: 3px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          white-space: nowrap;
        }

        /* Action Buttons Row */
        .card-actions-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          padding-top: 6px;
        }

        .btn-live-pill {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-decoration: none;
          background: #fa5f34;
          color: #0a0a0a;
          padding: 8px 18px;
          border-radius: 9999px;
          box-shadow: 0 4px 14px rgba(250, 95, 52, 0.35);
          transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
        }

        .btn-live-pill:hover {
          transform: translateY(-2px);
          background: #ff7049;
          box-shadow: 0 6px 20px rgba(250, 95, 52, 0.55);
        }

        .btn-case-study {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          text-decoration: none;
          color: #d4cec7;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 180ms ease, transform 180ms ease;
          white-space: nowrap;
        }

        .btn-case-study:hover {
          color: #fa5f34;
          transform: translateX(3px);
        }

        .btn-code-link {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-decoration: none;
          color: rgba(212, 206, 199, 0.6);
          transition: color 180ms ease;
          white-space: nowrap;
        }

        .btn-code-link:hover {
          color: #ffffff;
        }

        /* ── Mockup Columns & Architecture Showcase ── */
        .col-center-macbook {
          width: 100%;
          height: 100%;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        .col-right-iphone {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 0;
        }

        .col-non-live-showcase {
          grid-column: 2 / -1;
          width: 100%;
          height: 100%;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        /* ── RESPONSIVE BREAKPOINTS ── */
        @media (max-width: 1200px) {
          .card-content-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }

          .col-left-info {
            grid-column: 1 / -1;
          }

          .col-center-macbook {
            grid-column: 1 / 2;
          }

          .col-right-iphone {
            grid-column: 2 / 3;
          }

          .col-non-live-showcase {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 860px) {
          .card-top-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .card-header-meta {
            align-items: flex-start;
          }

          .card-meta-pills {
            justify-content: flex-start;
          }

          .card-content-grid {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }

          .col-left-info {
            grid-column: auto;
          }

          .col-center-macbook {
            grid-column: auto;
          }

          .col-right-iphone {
            grid-column: auto;
            max-width: 260px;
            margin: 0 auto;
          }
        }

        @media (max-width: 600px) {
          .project-card-body {
            padding: 1.25rem 1rem;
          }

          .card-big-title {
            font-size: 2.75rem;
          }

          .card-actions-row {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }

          .btn-live-pill {
            text-align: center;
          }
        }
      `}</style>
    </section>
  )
}
