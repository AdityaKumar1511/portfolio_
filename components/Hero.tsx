'use client'
import { useEffect, useState } from 'react'
import meta from '@/data/meta.json'
import heroData from '@/data/hero.json'
import socialsData from '@/data/socials.json'
import projectsData from '@/data/projects.json'

interface ContributionDay {
  date: string;
  count: number;
}

interface DenoContributionsResponse {
  contributions: ContributionDay[];
}

const roles = heroData.roles
const featuredProject = projectsData.find(p => p.featured)

export default function Hero() {
  const { name } = meta
  const [roleIndex, setRoleIndex] = useState(0)

  // Interval timer to change roles every second
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 1500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="hero" className="hero-section">
      {/* Bento Grid */}
      <div className="bento-grid">
        {/* CARD 1 UPPER — Name + Statement */}
        <div className="bento-card card-1-upper" style={{ gridColumn: '1 / 3', gridRow: '1 / 3', animationDelay: '0.05s' }}>
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Zone A — Top labels */}
            <div className="card-top-split">
              <span className="card-label card-label-year">{heroData.portfolioLabel}</span>
              <span className="card-label">{heroData.collegeLabel}</span>
            </div>

            {/* Zone B — Name */}
            <div className="card-name-block">
              <h2 className="card-name">{name}</h2>
            </div>

            {/* Dynamic changing roles line */}
            <div className="dynamic-role-wrapper">
              <span className="static-text role-static-text">{heroData.statementPrefix}</span>
              <span key={roleIndex} className="animated-role">{roles[roleIndex]}</span>
            </div>

            {/* Zone D — Paragraph style like in img */}
            <p className="img-statement" dangerouslySetInnerHTML={{ __html: heroData.statement }} />
          </div>
        </div>

        {/* CARD 3 — Open to Work */}
        <div className="bento-card card-3" style={{ gridColumn: '3 / 4', gridRow: '1 / 2', animationDelay: '0.18s' }}>
          <div className="card-top">
            <span className="card-label">{heroData.statusCard.label}</span>
          </div>
          <div className="status-middle">
            <span className="status-text">
              {heroData.statusCard.statusLine1}<br />
              <span style={{ color: heroData.statusCard.statusColor }}>{heroData.statusCard.statusLine2}</span>
            </span>
          </div>
          <div className="status-bottom">
            {heroData.statusCard.bottomText}
          </div>
        </div>

        {/* CARD 4 — Arbitrage project */}
        <div className="bento-card card-4" style={{ gridColumn: '3 / 4', gridRow: '2 / 3', animationDelay: '0.24s' }}>
          <div className="card-top-row">
            <span className="card-label">FEATURED PROJECT</span>
            <span className="live-pill">● {featuredProject?.statusLabel?.toUpperCase()}</span>
          </div>
          <div className="project-body">
            <h3 className="project-name">{featuredProject?.name}</h3>
            <p className="project-desc">{featuredProject?.heroDescription?.split(' with ')[0]} with <span style={{ color: '#aed8e6' }}>{featuredProject?.heroDescription?.split(' with ')[1]}</span></p>
            <div className="tech-pills">
              {featuredProject?.heroTech?.map(t => (
                <span key={t} className="tech-pill">{t}</span>
              ))}
            </div>
          </div>
          <div className="project-links">
            <a href={featuredProject?.liveUrl || '#'} target="_blank" rel="noreferrer" className="proj-btn proj-btn-live">Live Preview ↗</a>
            <a href={featuredProject?.repoUrl || '#'} target="_blank" rel="noreferrer" className="proj-btn proj-btn-git">GitHub ↗</a>
          </div>
        </div>

        {/* CARD 1 LOWER — Social Links Grid */}
        <div className="social-grid" style={{ gridColumn: '1 / 2', gridRow: '3 / 4', animationDelay: '0.30s' }}>
          {socialsData.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-cell" aria-label={s.label}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="social-svg">
                <path d={s.svgPath} />
              </svg>
            </a>
          ))}
        </div>

        {/* CARD 6 — Resume preview card */}
        <div className="bento-card resume-card" style={{ gridColumn: '2 / 4', gridRow: '3 / 4', animationDelay: '0.36s' }}>
          <div className="resume-card-inner">

            {/* Left side: label + CTA */}
            <div className="resume-left">
              <span className="card-label">{heroData.resumeCard.label}</span>

              <div className="resume-text-block">
                <p className="resume-title">{heroData.resumeCard.title}</p>
                <p className="resume-desc" dangerouslySetInnerHTML={{ __html: heroData.resumeCard.description }} />
              </div>

              <a href={heroData.resumeCard.pdfSrc} target="_blank" rel="noreferrer" className="resume-download-btn">
                {heroData.resumeCard.downloadLabel}
              </a>
            </div>

            {/* Right side: PDF preview iframe */}
            <div className="resume-preview-wrapper">
              <iframe
                src={`${heroData.resumeCard.pdfSrc}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                className="resume-iframe"
                title="Resume Preview"
              />
              <div className="resume-preview-overlay" />
            </div>

          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=Playfair+Display:ital,wght@1,500;1,600&display=swap');

        .hero-section {
          height: 100svh;
          max-height: 100svh;
          padding: 24px;
          display: flex;
          flex-direction: column;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
          background: #0a0a0a;
          color: #fafafa;
          position: relative;
          overflow: hidden;
        }

        /* Bento Grid Layout */
        .bento-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          grid-template-rows: 0.8fr 1.2fr 0.7fr;
          gap: 0;
          height: calc(100svh - 48px);
          max-height: calc(100svh - 48px);
          overflow: hidden;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }

        /* Base Card Styles */
        .bento-card {
          background: #0a0a0a;
          border: none;
          border-radius: 0;
          padding: 24px;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        /* Card Placement & Delays */
        @keyframes bentoIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .bento-card {
          animation: bentoIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        /* Common Elements */
        .card-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #777777;
        }

        .card-top-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }

        /* Card 1 Specifics */
        .card-top-split {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .card-name-block {
          margin-top: clamp(1.5rem, 4vh, 3rem);
        }

        .card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.5rem, 6.5vw, 5.5rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          color: #f0e6d3;
          line-height: 0.95;
          margin: 0;
        }

        /* Dynamic changing roles */
        .dynamic-role-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(14px, 1.8vw, 18px);
          margin-top: clamp(1.25rem, 3vh, 2rem);
        }

        .static-text {
          color: #777777;
        }

        .animated-role {
          color: #009BB4;
          font-weight: 500;
          display: inline-block;
          animation: slideFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes slideFadeIn {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Statement from img */
        .img-statement {
          font-size: clamp(1.6rem, 2.8vw, 2.3rem);
          font-weight: 500;
          line-height: 1.35;
          color: #fafafa;
          letter-spacing: -0.02em;
          max-width: 720px;
          margin-top: clamp(1.5rem, 3.5vh, 2.5rem);
        }

        /* Social links grid */
        .social-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          height: 100%;
          background: #0a0a0a;
          animation: bentoIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .social-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #BBBBBB;
          text-decoration: none;
          transition: color 200ms ease, background 200ms ease;
          border-right: 1px solid #1f1f1f;
        }

        .social-cell:last-child {
          border-right: none;
        }

        .social-cell:hover {
          color: #999999;
          background: #111111;
        }

        .social-svg {
          width: 32px;
          height: 32px;
        }

        /* ========== Card 3 ========== */
        .status-middle {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: auto 0;
        }

        .status-text {
          font-size: 18px;
          font-weight: 500;
          color: #fafafa;
          line-height: 1.2;
        }

        .status-bottom {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          color: #777777;
        }

        /* ========== Card 4 ========== */
        .live-pill {
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          color: #4ade80;
          border: 1px solid rgba(74, 222, 128, 0.2);
          border-radius: 999px;
          padding: 3px 8px;
          background: rgba(74, 222, 128, 0.05);
          flex-shrink: 0;
        }

        .project-body {
          margin: auto 0;
        }

        .project-name {
          font-size: 22px;
          font-weight: 500;
          color: #fafafa;
          letter-spacing: -0.02em;
          margin: 8px 0 0 0;
        }

        .project-desc {
          font-size: 12px;
          color: #999999;
          line-height: 1.5;
          margin: 4px 0 0 0;
        }

        .tech-pills {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-top: 12px;
        }

        .tech-pill {
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          color: #888888;
          border: 1px solid #222222;
          border-radius: 4px;
          padding: 2px 7px;
          background: transparent;
        }

        .project-links {
          display: flex;
          gap: 8px;
          margin-top: 16px;
        }

        .proj-btn {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          text-decoration: none;
          border-radius: 8px;
          padding: 6px 12px;
          transition: all 150ms;
          box-sizing: border-box;
        }

        .proj-btn-live {
          color: #fafafa;
          background: #1a1a1a;
          border: 1px solid #333333;
        }

        .proj-btn-live:hover {
          border-color: #1a1a1a;
          color: #1a1a1a;
          background-color: #fafafa;
        }

        .proj-btn-git {
          color: #fafafa;
          background: #1a1a1a;
          border: 1px solid #333333;
        }

        .proj-btn-git:hover {
          border-color: #1a1a1a;
          color: #1a1a1a;
          background-color: #fafafa;
        }

        /* ========== Card 6 (Resume) ========== */
        .resume-card {
          padding: 0;
          overflow: hidden;
          position: relative;
          min-height: 0;
          height: 100%;
        }

        .resume-card-inner {
          display: flex;
          flex-direction: row;
          height: 100%;
          max-height: 100%;
          width: 100%;
          overflow: hidden;
        }

        .resume-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 20px 24px;
          min-width: 200px;
          width: 220px;
          flex-shrink: 0;
          border-right: 1px solid #1f1f1f;
          overflow: hidden;
          min-height: 0;
          gap: 5px;
        }

        .resume-title {
          font-size: 16px;
          font-weight: 500;
          color: #fafafa;
          margin: 0 0 4px 0;
        }

        .resume-desc {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          color: #777777;
          margin: 0;
        }

        .resume-text-block {
          margin: auto 0;
        }

        .resume-download-btn {
          display: inline-block;
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          color: #fafafa;
          background: #1a1a1a;
          border: 1px solid #333333;
          border-radius: 8px;
          padding: 8px 14px;
          text-decoration: none;
          transition: all 150ms;
          white-space: nowrap;
          align-self: flex-start;
        }

        .resume-download-btn:hover {
          border-color: #1a1a1a;
          color: #1a1a1a;
          background-color: #fafafa;
        }

        .resume-preview-wrapper {
          flex: 1;
          position: relative;
          overflow: hidden;
          max-width: 100%;
          min-height: 0;
          min-width: 0;
          background: #0a0a0a;
        }

        .resume-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 200%;
          transform: scale(0.5);
          transform-origin: top left;
          pointer-events: none;
          border: none;
        }

        .resume-preview-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 40%,
            rgba(10, 10, 10, 0.95) 100%
          );
          pointer-events: none;
        }

        /* Divider lines for Desktop (>= 1025px) */
        @media (min-width: 1025px) {
          .card-1-upper {
            border-right: 1px solid #1f1f1f;
            border-bottom: 1px solid #1f1f1f;
          }
          .card-3 {
            border-bottom: 1px solid #1f1f1f;
          }
          .card-4 {
            border-bottom: 1px solid #1f1f1f;
          }
          .card-1-lower {
            border-right: 1px solid #1f1f1f;
          }
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .bento-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
            height: auto;
            min-height: calc(100svh - 48px);
            padding-bottom: 24px;
            overflow: visible;
            max-height: none;
          }

          .card-1-upper {
            grid-column: 1 / 3 !important;
            grid-row: auto !important;
            min-height: 280px;
            border-bottom: 1px solid #1f1f1f;
            border-right: none;
          }

          .card-3 {
            grid-column: 1 !important;
            grid-row: auto !important;
            border-right: 1px solid #1f1f1f;
            border-bottom: 1px solid #1f1f1f;
          }

          .card-4 {
            grid-column: 2 !important;
            grid-row: auto !important;
            border-bottom: 1px solid #1f1f1f;
            border-right: none;
          }

          .card-1-lower {
            grid-column: 1 !important;
            grid-row: auto !important;
            border-right: 1px solid #1f1f1f;
            border-bottom: none;
          }

          .resume-card {
            grid-column: 2 !important;
            grid-row: auto !important;
            border: none;
          }

          .hero-statement {
            max-width: 100%;
          }
        }

        @media (max-width: 640px) {
          .bento-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            height: auto;
            gap: 0;
            overflow: visible;
            max-height: none;
          }

          .card-1-upper {
            grid-column: auto !important;
            grid-row: auto !important;
            min-height: 260px;
            border-bottom: 1px solid #1f1f1f;
            border-right: none;
          }

          .card-3 {
            grid-column: auto !important;
            grid-row: auto !important;
            border-bottom: 1px solid #1f1f1f;
            border-right: none;
          }

          .card-4 {
            grid-column: auto !important;
            grid-row: auto !important;
            border-bottom: 1px solid #1f1f1f;
            border-right: none;
          }

          .card-1-lower {
            grid-column: auto !important;
            grid-row: auto !important;
            border-bottom: 1px solid #1f1f1f;
            border-right: none;
          }

          .resume-card {
            grid-column: auto !important;
            grid-row: auto !important;
            border: none;
          }

          .resume-card-inner {
            flex-direction: column;
          }

          .resume-left {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid #1f1f1f;
          }

          .resume-preview-wrapper {
            height: 160px;
          }

          .resume-iframe {
            transform: scale(0.45) translateY(0) !important;
            width: 222% !important;
            height: 222% !important;
          }

          .statement-text {
            font-size: 13px;
            line-height: 1.7;
          }

          .tw-path, .tw-command, .tw-role {
            font-size: 12px;
          }

          .card-top-split {
            flex-direction: column;
            gap: 4px;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            padding: 12px;
          }

          .bento-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
            height: auto;
            gap: 0;
            overflow: visible;
            max-height: none;
            min-height: unset;
          }

          .bento-card {
            padding: 12px;
          }

          /* Card 1 — condensed hero */
          .card-1-upper {
            grid-column: 1 / 3 !important;
            grid-row: auto !important;
            min-height: 280px;
            border-bottom: 1px solid #1f1f1f;
            border-right: none;
          }

          .card-label-year {
            /* restored — visible on mobile */
          }

          .card-name-block {
            margin-top: 0.75rem;
          }

          .card-name {
            font-size: clamp(2rem, 10vw, 2.8rem);
          }

          .role-static-text {
            display: none;
          }

          .dynamic-role-wrapper {
            margin-top: 0.5rem;
            font-size: 12px;
            gap: 0;
          }

          .animated-role {
            font-size: 12px;
          }

          .img-statement {
            font-size: clamp(0.85rem, 4vw, 1.2rem);
            margin-top: 1rem;
            line-height: 1.35;
          }

          /* Card 3 — Status */
          .card-3 {
            grid-column: 1 !important;
            grid-row: auto !important;
            border-bottom: 1px solid #1f1f1f;
            border-right: 1px solid #1f1f1f;
            padding: 12px;
            min-height: 130px;
          }

          .status-middle {
            margin: 0;
          }

          .status-text {
            font-size: 13px;
          }

          .status-bottom {
            font-size: 8px;
          }

          /* Card 4 — Featured project */
          .card-4 {
            grid-column: 2 !important;
            grid-row: auto !important;
            border-bottom: 1px solid #1f1f1f;
            border-right: none;
            padding: 12px;
            min-height: 130px;
          }

          .card-4 .live-pill {
            /* restored — visible on mobile */
          }

          .card-4 .project-name {
            font-size: 14px;
            margin: 0;
          }

          .card-4 .project-desc {
            font-size: 10px;
            margin: 2px 0 0 0;
          }

          .card-4 .tech-pills {
            margin-top: 6px;
            gap: 4px;
          }

          .card-4 .tech-pill {
            font-size: 7px;
            padding: 1px 5px;
          }

          .card-4 .project-links {
            /* restored — visible on mobile */
          }

          /* Social grid */
          .social-grid {
            grid-column: 1 / 3 !important;
            grid-row: auto !important;
            border-bottom: 1px solid #1f1f1f;
            aspect-ratio: unset;
            height: 64px;
          }

          .social-svg {
            width: 20px;
            height: 20px;
          }

          /* Resume card */
          .resume-card {
            grid-column: 1 / 3 !important;
            grid-row: auto !important;
            border: none;
          }

          .resume-card-inner {
            flex-direction: row;
            align-items: center;
          }

          .resume-left {
            width: 100%;
            border-right: none;
            padding: 12px 16px;
            flex-direction: row;
            align-items: center;
            gap: 12px;
            min-width: unset;
          }

          .resume-text-block {
            margin: 0;
          }

          .resume-title {
            font-size: 13px;
            margin: 0;
          }

          .resume-desc {
            font-size: 8px;
          }

          .resume-download-btn {
            font-size: 10px;
            padding: 6px 10px;
            align-self: center;
            white-space: nowrap;
          }

          .resume-preview-wrapper {
            display: none;
          }

          .card-top-split {
            flex-direction: row;
            gap: 0;
          }
        }
      `}</style>
    </section>
  )
}
