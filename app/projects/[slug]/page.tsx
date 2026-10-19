import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { caseStudies } from '@/data/caseStudiesData'
import projectsData from '@/data/projects.json'
import { MacBookMockup, IPhoneMockup, NonLiveProjectShowcase } from '@/components/DeviceMockups'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const study = caseStudies[slug]
  if (!study) return { title: 'Project Case Study' }

  return {
    title: `${study.title} — Case Study | Aditya Kumar`,
    description: study.subtitle,
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const study = caseStudies[slug]

  if (!study) {
    notFound()
  }

  // Find previous and next project for bottom navigation
  const slugs = Object.keys(caseStudies)
  const currentIndex = slugs.indexOf(slug)
  const prevSlug = slugs[(currentIndex - 1 + slugs.length) % slugs.length]
  const nextSlug = slugs[(currentIndex + 1) % slugs.length]
  const prevProject = caseStudies[prevSlug]
  const nextProject = caseStudies[nextSlug]

  const rawProject = projectsData.find((p) => p.slug === slug) || {
    slug: study.slug,
    name: study.title,
    category: study.category,
    liveUrl: study.liveUrl || null,
    thumbnail: study.thumbnail || null,
    impactStats: study.stats,
    statusLabel: study.statusLabel,
  }

  return (
    <div className="case-study-root">
      {/* ── TOP NAV BAR ── */}
      <nav className="case-study-nav">
        <div className="nav-container">
          <Link href="/#projects" className="back-link">
            <span className="back-arrow">←</span>
            <span>BACK TO PROJECTS</span>
          </Link>

          <div className="nav-center-badge">
            <span className="dot-live" />
            <span>CASE STUDY // {study.title.toUpperCase()}</span>
          </div>

          <div className="nav-actions">
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="nav-btn-live"
              >
                LIVE SITE ↗
              </a>
            )}
            {study.repoUrl && (
              <a
                href={study.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="nav-btn-code"
              >
                GITHUB ↗
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* ── HERO HEADER SECTION ── */}
      <header className="case-hero-section">
        <div className="case-hero-container">
          {/* Breadcrumb & Year */}
          <div className="case-hero-meta-row">
            <span className="meta-category-tag">{study.category}</span>
            <span className="meta-divider">/</span>
            <span className="meta-year-tag">{study.year}</span>
            <span className="meta-divider">/</span>
            <span className="meta-status-pill">{study.statusLabel}</span>
          </div>

          {/* Huge Main Title */}
          <h1 className="case-main-title">{study.title}</h1>

          {/* Tagline */}
          <p className="case-tagline-text">{study.tagline}</p>

          {/* Executive Subtitle */}
          <p className="case-subtitle-text">{study.subtitle}</p>

          {/* Action Links */}
          <div className="case-hero-cta-row">
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="hero-live-button"
              >
                VISIT PRODUCTION APP ↗
              </a>
            )}
            {study.repoUrl && (
              <a
                href={study.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="hero-repo-button"
              >
                SOURCE CODE REPOSITORY ↗
              </a>
            )}
          </div>
        </div>
      </header>

      {/* ── KEY METRICS / IMPACT STATS RIBBON ── */}
      <section className="stats-ribbon-section">
        <div className="stats-ribbon-grid">
          {study.stats.map((stat, i) => (
            <div key={i} className="stat-card">
              <span className="stat-number">{stat.value}</span>
              <span className="stat-title">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SHOWCASE SECTION: Device Mockups (for live projects) OR Architecture Showcase ── */}
      <section className="device-showcase-section">
        {study.liveUrl ? (
          <>
            <div className="device-showcase-header">
              <span className="section-label-chip">00 // INTERFACE ARCHITECTURE</span>
              <h2 className="section-title">Responsive Design & Layout</h2>
              <p className="section-intro">
                High-fidelity view of the user experience optimized for desktop productivity and mobile execution.
              </p>
            </div>

            <div className="dual-device-grid">
              <div className="dual-device-macbook">
                <MacBookMockup project={rawProject} />
              </div>
              <div className="dual-device-iphone">
                <IPhoneMockup project={rawProject} />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="device-showcase-header">
              <span className="section-label-chip">00 // TECHNICAL ARCHITECTURE</span>
              <h2 className="section-title">System Blueprint & Verification</h2>
              <p className="section-intro">
                Engineering telemetry, compilation pipelines, and mathematical model validation metrics.
              </p>
            </div>

            <div className="w-full max-w-[1100px] mx-auto">
              <NonLiveProjectShowcase project={rawProject} />
            </div>
          </>
        )}
      </section>

      {/* ── MAIN DEEP DIVE ARTICLE ── */}
      <main className="case-study-content-container">
        {/* 01: Executive Overview */}
        <section className="content-block">
          <div className="block-meta">
            <span className="block-num">01</span>
            <span className="block-chip">EXECUTIVE SUMMARY</span>
          </div>
          <h2 className="block-heading">Project Overview</h2>
          <p className="block-paragraph">{study.overview}</p>
        </section>

        {/* 02: Problem & Solution Split */}
        <section className="content-block-grid">
          <div className="problem-box">
            <div className="box-header text-amber-400">
              <span className="box-icon">⚠️</span>
              <span className="box-tag">THE PROBLEM</span>
            </div>
            <h3 className="box-title">System Inefficiencies & Bottlenecks</h3>
            <p className="box-paragraph">{study.problem}</p>
          </div>

          <div className="solution-box">
            <div className="box-header text-emerald-400">
              <span className="box-icon">💡</span>
              <span className="box-tag">THE SOLUTION</span>
            </div>
            <h3 className="box-title">Engineering Architecture</h3>
            <p className="box-paragraph">{study.solution}</p>
          </div>
        </section>

        {/* 03: Architecture & Pipeline */}
        <section className="content-block">
          <div className="block-meta">
            <span className="block-num">02</span>
            <span className="block-chip">SYSTEM DESIGN</span>
          </div>
          <h2 className="block-heading">Architecture & Execution Flow</h2>
          <p className="block-paragraph">{study.architecture.overview}</p>

          <div className="architecture-steps-grid">
            {study.architecture.steps.map((step, idx) => (
              <div key={idx} className="arch-step-card">
                <span className="arch-step-num">{step.number}</span>
                <h4 className="arch-step-title">{step.title}</h4>
                <p className="arch-step-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 04: Tech Stack Deep Dive */}
        <section className="content-block">
          <div className="block-meta">
            <span className="block-num">03</span>
            <span className="block-chip">TECHNOLOGY CHOICES</span>
          </div>
          <h2 className="block-heading">Tech Stack & Rationale</h2>
          <p className="block-paragraph">
            Every layer in the stack was selected to maximize throughput, minimize operational friction, and maintain sub-second latency.
          </p>

          <div className="tech-stack-table">
            {study.techStack.map((item, i) => (
              <div key={i} className="tech-stack-row">
                <div className="tech-name-col">
                  <span className="tech-name-badge">{item.name}</span>
                  <span className="tech-role-text">{item.role}</span>
                </div>
                <div className="tech-reason-col">
                  <p className="tech-reason-text">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 05: Engineering Challenges */}
        <section className="content-block">
          <div className="block-meta">
            <span className="block-num">04</span>
            <span className="block-chip">TECHNICAL RIGOR</span>
          </div>
          <h2 className="block-heading">Hard-Won Engineering Challenges</h2>

          <div className="challenges-grid">
            {study.engineeringChallenges.map((item, i) => (
              <div key={i} className="challenge-card">
                <div className="challenge-header">
                  <span className="challenge-tag">CHALLENGE // 0{i + 1}</span>
                  <h4 className="challenge-title">{item.challenge}</h4>
                </div>
                <div className="challenge-solution">
                  <span className="solution-tag">ENGINEERING RESOLUTION</span>
                  <p className="solution-text">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 06: Key Features & Results */}
        <section className="content-block">
          <div className="block-meta">
            <span className="block-num">05</span>
            <span className="block-chip">CAPABILITIES & OUTCOMES</span>
          </div>
          <h2 className="block-heading">Key Features & Validated Results</h2>

          <ul className="features-list">
            {study.keyFeatures.map((feat, i) => (
              <li key={i} className="feature-item">
                <span className="feature-bullet">›</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          <div className="results-banner">
            <span className="results-label">MEASURED OUTCOME</span>
            <p className="results-text">{study.results}</p>
          </div>
        </section>
      </main>

      {/* ── FOOTER NAVIGATION ── */}
      <footer className="case-footer">
        <div className="case-footer-container">
          <div className="footer-nav-grid">
            <Link href={`/projects/${prevProject.slug}`} className="footer-nav-card">
              <span className="footer-nav-dir">← PREVIOUS CASE STUDY</span>
              <span className="footer-nav-title">{prevProject.title}</span>
              <span className="footer-nav-cat">{prevProject.category}</span>
            </Link>

            <Link href={`/projects/${nextProject.slug}`} className="footer-nav-card footer-nav-card--right">
              <span className="footer-nav-dir">NEXT CASE STUDY →</span>
              <span className="footer-nav-title">{nextProject.title}</span>
              <span className="footer-nav-cat">{nextProject.category}</span>
            </Link>
          </div>

          <div className="footer-bottom-bar">
            <Link href="/#projects" className="return-home-link">
              ← RETURN TO MAIN PORTFOLIO
            </Link>
          </div>
        </div>
      </footer>

      {/* ── STYLES ── */}
      <style>{`
        .case-study-root {
          min-height: 100vh;
          background: #09090b;
          color: #d4cec7;
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          padding-top: 70px;
        }

        /* ── Top Nav ── */
        .case-study-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: rgba(9, 9, 11, 0.88);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          z-index: 100;
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          height: 100%;
          padding: 0 var(--pad-x);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          font-weight: 700;
          color: #d4cec7;
          text-decoration: none;
          letter-spacing: 0.1em;
          transition: color 150ms ease, transform 150ms ease;
        }

        .back-link:hover {
          color: #fa5f34;
          transform: translateX(-3px);
        }

        .nav-center-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: rgba(212, 206, 199, 0.6);
        }

        .dot-live {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #fa5f34;
          animation: pulse-dot 2s infinite;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nav-btn-live {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          font-weight: 800;
          background: #fa5f34;
          color: #0a0a0a;
          padding: 6px 14px;
          border-radius: 9999px;
          text-decoration: none;
          letter-spacing: 0.08em;
          transition: transform 150ms ease, background 150ms ease;
        }

        .nav-btn-live:hover {
          transform: translateY(-1px);
          background: #ff7049;
        }

        .nav-btn-code {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          font-weight: 700;
          color: #d4cec7;
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 5px 12px;
          border-radius: 4px;
          text-decoration: none;
          letter-spacing: 0.08em;
          transition: border-color 150ms ease, color 150ms ease;
        }

        .nav-btn-code:hover {
          border-color: #d4cec7;
          color: #fff;
        }

        /* ── Hero ── */
        .case-hero-section {
          padding: clamp(3rem, 6vw, 5rem) var(--pad-x) 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .case-hero-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .case-hero-meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(212, 206, 199, 0.6);
          margin-bottom: 1rem;
        }

        .meta-category-tag {
          color: #fa5f34;
        }

        .meta-divider {
          opacity: 0.3;
        }

        .meta-status-pill {
          background: rgba(255, 255, 255, 0.06);
          padding: 2px 8px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #f3eee8;
        }

        .case-main-title {
          font-family: 'Impact', 'Arial Black', 'Haettenschweiler', 'Franklin Gothic Bold', sans-serif;
          font-size: clamp(3.5rem, 9vw, 8rem);
          font-weight: 900;
          text-transform: uppercase;
          line-height: 0.9;
          letter-spacing: -0.02em;
          color: #f3eee8;
          margin: 0 0 1rem 0;
        }

        .case-tagline-text {
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(12px, 1.2vw, 15px);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #fa5f34;
          margin: 0 0 1.25rem 0;
        }

        .case-subtitle-text {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: clamp(16px, 1.6vw, 21px);
          line-height: 1.65;
          color: rgba(212, 206, 199, 0.85);
          max-width: 900px;
          margin: 0 0 2rem 0;
        }

        .case-hero-cta-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .hero-live-button {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: #fa5f34;
          color: #0a0a0a;
          padding: 12px 24px;
          border-radius: 9999px;
          text-decoration: none;
          box-shadow: 0 6px 20px rgba(250, 95, 52, 0.4);
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .hero-live-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(250, 95, 52, 0.6);
        }

        .hero-repo-button {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #d4cec7;
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 11px 22px;
          border-radius: 9999px;
          text-decoration: none;
          transition: border-color 180ms ease, color 180ms ease;
        }

        .hero-repo-button:hover {
          border-color: #fa5f34;
          color: #fa5f34;
        }

        /* ── Stats Ribbon ── */
        .stats-ribbon-section {
          background: #0d0e12;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding: 2rem var(--pad-x);
        }

        .stats-ribbon-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-number {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: clamp(2rem, 3.5vw, 3.25rem);
          font-weight: 900;
          color: #f3eee8;
          line-height: 1;
        }

        .stat-title {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(212, 206, 199, 0.55);
        }

        /* ── Device Showcase ── */
        .device-showcase-section {
          padding: clamp(3rem, 6vw, 5rem) var(--pad-x);
          max-width: 1400px;
          margin: 0 auto;
        }

        .device-showcase-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-label-chip {
          display: inline-block;
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          font-weight: 700;
          color: #fa5f34;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .section-title {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: clamp(2rem, 4vw, 3.5rem);
          text-transform: uppercase;
          color: #f3eee8;
          margin: 0 0 10px 0;
          letter-spacing: -0.01em;
        }

        .section-intro {
          font-family: var(--font-geist-mono), monospace;
          font-size: 12px;
          color: rgba(212, 206, 199, 0.6);
          max-width: 600px;
          margin: 0 auto;
        }

        .dual-device-grid {
          display: grid;
          grid-template-columns: 65fr 35fr;
          gap: 2.5rem;
          align-items: stretch;
        }

        .dual-device-macbook {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .dual-device-iphone {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        /* ── Content Container ── */
        .case-study-content-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 var(--pad-x) 5rem;
          display: flex;
          flex-direction: column;
          gap: clamp(3rem, 5vw, 4.5rem);
        }

        .content-block {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .block-meta {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .block-num {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: 1.5rem;
          color: #fa5f34;
          line-height: 1;
        }

        .block-chip {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(212, 206, 199, 0.5);
        }

        .block-heading {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: clamp(1.75rem, 3.2vw, 2.75rem);
          text-transform: uppercase;
          color: #f3eee8;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .block-paragraph {
          font-size: 16px;
          line-height: 1.8;
          color: rgba(212, 206, 199, 0.8);
          margin: 0;
        }

        /* Problem & Solution Grid */
        .content-block-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .problem-box,
        .solution-box {
          padding: 1.75rem;
          border-radius: 8px;
          background: rgba(18, 19, 23, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .problem-box {
          border-top: 2px solid #fbbf24;
        }

        .solution-box {
          border-top: 2px solid #34d399;
        }

        .box-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
        }

        .box-title {
          font-size: 18px;
          font-weight: 700;
          color: #f3eee8;
          margin: 0;
        }

        .box-paragraph {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(212, 206, 199, 0.75);
          margin: 0;
        }

        /* Architecture Steps */
        .architecture-steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem;
          margin-top: 1rem;
        }

        .arch-step-card {
          padding: 1.5rem;
          background: #111216;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .arch-step-num {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: 2rem;
          color: #fa5f34;
          line-height: 1;
        }

        .arch-step-title {
          font-family: var(--font-geist-mono), monospace;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #f3eee8;
          margin: 0;
        }

        .arch-step-desc {
          font-size: 13px;
          line-height: 1.6;
          color: rgba(212, 206, 199, 0.65);
          margin: 0;
        }

        /* Tech Stack Table */
        .tech-stack-table {
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          overflow: hidden;
          background: #101115;
          margin-top: 1rem;
        }

        .tech-stack-row {
          display: grid;
          grid-template-columns: 260px 1fr;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          gap: 1.5rem;
          align-items: center;
        }

        .tech-stack-row:last-child {
          border-bottom: none;
        }

        .tech-name-col {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .tech-name-badge {
          font-family: var(--font-geist-mono), monospace;
          font-size: 12px;
          font-weight: 800;
          color: #f3eee8;
        }

        .tech-role-text {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          color: #fa5f34;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .tech-reason-text {
          font-size: 13.5px;
          line-height: 1.6;
          color: rgba(212, 206, 199, 0.75);
          margin: 0;
        }

        /* Challenges Grid */
        .challenges-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          margin-top: 1rem;
        }

        .challenge-card {
          padding: 1.5rem;
          background: #111216;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .challenge-tag {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          font-weight: 700;
          color: #fa5f34;
          letter-spacing: 0.12em;
          display: block;
          margin-bottom: 4px;
        }

        .challenge-title {
          font-size: 16px;
          font-weight: 700;
          color: #f3eee8;
          margin: 0;
        }

        .challenge-solution {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-left: 2px solid #34d399;
          border-radius: 2px;
        }

        .solution-tag {
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          font-weight: 800;
          color: #34d399;
          letter-spacing: 0.1em;
          display: block;
          margin-bottom: 4px;
        }

        .solution-text {
          font-size: 13.5px;
          line-height: 1.65;
          color: rgba(212, 206, 199, 0.8);
          margin: 0;
        }

        /* Features List */
        .features-list {
          list-style: none;
          padding: 0;
          margin: 0.5rem 0 1rem;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14.5px;
          line-height: 1.6;
          color: rgba(212, 206, 199, 0.85);
        }

        .feature-bullet {
          color: #fa5f34;
          font-weight: 900;
          font-size: 16px;
        }

        .results-banner {
          margin-top: 1.5rem;
          padding: 1.5rem;
          background: rgba(250, 95, 52, 0.06);
          border: 1px solid rgba(250, 95, 52, 0.25);
          border-radius: 6px;
        }

        .results-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: #fa5f34;
          display: block;
          margin-bottom: 6px;
        }

        .results-text {
          font-size: 15px;
          line-height: 1.7;
          color: #f3eee8;
          margin: 0;
          font-weight: 500;
        }

        /* ── Footer ── */
        .case-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          background: #0b0c10;
          padding: 4rem var(--pad-x) 3rem;
        }

        .case-footer-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-nav-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .footer-nav-card {
          padding: 2rem;
          background: #111216;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 6px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: border-color 200ms ease, transform 200ms ease;
        }

        .footer-nav-card:hover {
          border-color: #fa5f34;
          transform: translateY(-2px);
        }

        .footer-nav-card--right {
          text-align: right;
        }

        .footer-nav-dir {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          font-weight: 700;
          color: #fa5f34;
          letter-spacing: 0.12em;
        }

        .footer-nav-title {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: 1.75rem;
          color: #f3eee8;
          text-transform: uppercase;
          line-height: 1.1;
        }

        .footer-nav-cat {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          color: rgba(212, 206, 199, 0.45);
          text-transform: uppercase;
        }

        .footer-bottom-bar {
          text-align: center;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .return-home-link {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #d4cec7;
          text-decoration: none;
          transition: color 150ms ease;
        }

        .return-home-link:hover {
          color: #fa5f34;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .dual-device-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .content-block-grid {
            grid-template-columns: 1fr;
          }

          .tech-stack-row {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }

          .footer-nav-grid {
            grid-template-columns: 1fr;
          }

          .footer-nav-card--right {
            text-align: left;
          }

          .nav-center-badge {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}
