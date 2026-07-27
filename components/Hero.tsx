'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import meta from '@/data/meta.json'
import heroData from '@/data/hero.json'
import socials from '@/data/socials.json'
import dynamic from 'next/dynamic'

const PdfPreview = dynamic(() => import('./PdfPreview'), { ssr: false })

const roles = heroData.roles

const DESKTOP_NAV = [
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'about', label: 'ABOUT' },
]

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
  { id: 'github', label: 'GitHub', href: meta.github },
  { id: 'resume', label: 'Resume', href: meta.resumeUrl },
]

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
})

export default function Hero() {
  const { name } = meta
  const [roleIndex, setRoleIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 1500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <section id="hero" className="hero-section">
      <motion.div className="hero-top-bar" {...fadeUp(0.1)}>
        <span className="availability">
          AVAILABILITY <span className="availability-highlight">OPEN TO Internships.</span>
        </span>
        <nav className="desktop-nav">
          {DESKTOP_NAV.map((link) => (
            <a key={link.id} href={`#${link.id}`}>
              {link.label}
            </a>
          ))}
        </nav>
        <button
          className={`hamburger ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </motion.div>

      <div className="hero-body">
        <motion.div className="hero-name-area" {...fadeUp(0.25)}>
          <h2 className="card-name">{name}</h2>
        </motion.div>

        <motion.div className="social-sidebar" {...fadeUp(0.4)}>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d={s.svgPath} />
              </svg>
            </a>
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={`empty-${i}`} className="social-empty" />
          ))}
        </motion.div>

        <div className="hero-content">
          <div className="hero-content-upper">
            <motion.div className="hero-cta-row" {...fadeUp(0.4)}>
              <span className="role-text">
                <span className="role-prefix">{heroData.statementPrefix}</span>
                <span key={roleIndex} className="animated-role">
                  {roles[roleIndex]}
                </span>
              </span>
              <a className="see-work-link" href="#projects">
                SEE MY WORK ↗
              </a>
            </motion.div>
          </div>
          <div className="hero-content-lower">
            <motion.p
              className="hero-statement"
              {...fadeUp(0.55)}
              dangerouslySetInnerHTML={{ __html: heroData.statement }}
            />
          </div>
        </div>

        <motion.div className="resume-card" {...fadeUp(0.3)}>
          <div className="resume-pdf-preview">
            <PdfPreview src={meta.resumeUrl} />
          </div>
          <a
            className="resume-btn"
            href={meta.resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            Download Resume
          </a>
        </motion.div>
      </div>

      <div className={`overlay-menu ${menuOpen ? 'is-open' : ''}`}>
        <nav className="overlay-nav">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href || `#${link.id}`}
              onClick={() => setMenuOpen(false)}
              {...(link.href?.startsWith('http')
                ? { target: '_blank', rel: 'noreferrer' }
                : {})}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <style>{`
        .hero-section {
          min-height: 100svh;
          max-height: 100svh;
          padding: 16px 0;
          display: flex;
          flex-direction: column;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
          background: transparent;
          color: #fafafa;
          position: relative;
        }

        .hero-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding-bottom: 1rem;
          border-bottom: 0.5px solid #fff;
          flex-shrink: 0;
        }

        .availability {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #fff;
        }

        .availability-highlight {
          color: #4ade80;
          font-weight: 600;
        }

        .desktop-nav {
          display: flex;
          gap: 28px;
        }

        .desktop-nav a {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #fff;
          text-decoration: none;
          transition: color 0.2s;
        }

        .desktop-nav a:hover {
          color: #c97b4b;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          background: transparent;
          border: 0.5px solid #fff;
          border-radius: 4px;
          cursor: pointer;
          padding: 6px;
          z-index: 1001;
          transition: border-color 0.2s ease;
        }

        .hamburger:hover {
          border-color: #fff;
        }

        .hamburger span {
          display: block;
          width: 100%;
          height: 2px;
          background: #fafafa;
          border-radius: 1px;
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }

        .hamburger.is-open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .hamburger.is-open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.is-open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        .hero-body {
          display: grid;
          grid-template-columns: 160px 1fr 160px;
          grid-template-rows: auto 1fr;
          flex: 1;
          min-height: 0;
        }

        .hero-name-area {
          grid-column: 1 / 3;
          grid-row: 1;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-top: clamp(1.5rem, 3vh, 2rem);
          padding-bottom: clamp(1.5rem, 3vh, 2rem);
          border-bottom: 0.5px solid #fff;
        }

        .card-name {
          font-family: 'Impact', 'Arial Black', 'Haettenschweiler', 'Franklin Gothic Bold', sans-serif;
          font-size: clamp(5rem, 10vw, 10rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          color: #f0e6d3;
          line-height: 0.9;
          margin: 0;
          text-transform: uppercase;
        }

        .social-sidebar {
          grid-column: 1;
          grid-row: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          box-shadow: inset 1px 0 0 0 #fff;
          height: 100%;
          overflow: hidden;
        }

        .social-sidebar a {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-right: 0.5px solid #fff;
          border-bottom: 0.5px solid #fff;
          color: #fff;
          transition: color 0.2s, background 0.2s;
          text-decoration: none;
        }

        .social-sidebar a:hover {
          color: #fafafa;
          background: rgba(255, 255, 255, 0.05);
        }

        .social-sidebar a svg {
          width: 20px;
          height: 20px;
        }

        .social-empty {
          aspect-ratio: 1;
          border-right: 0.5px solid #fff;
          border-bottom: 0.5px solid #fff;
        }

        .hero-content {
          grid-column: 2 / -1;
          grid-row: 2;
          display: flex;
          flex-direction: column;
          padding-left: clamp(1rem, 2vw, 2rem);
        }

        .hero-content-upper {
          min-height: 80px;
          display: flex;
          align-items: center;
          width: 100%;
          position: relative;
        }

        .hero-content-upper::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: calc(-1 * clamp(1rem, 2vw, 2rem));
          right: 0;
          border-bottom: 0.5px solid #fff;
        }

        .hero-content-lower {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-cta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .role-text {
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(14px, 1.8vw, 18px);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .role-prefix {
          color: #fff;
        }

        .animated-role {
          color: #c97b4b;
          font-weight: 500;
          display: inline-block;
          animation: roleFadeIn 0.3s ease forwards;
        }

        @keyframes roleFadeIn {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .see-work-link {
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(14px, 1.8vw, 18px);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #fafafa;
          text-decoration: none;
          transition: color 0.2s;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .see-work-link:hover {
          color: #c97b4b;
        }

        .hero-statement {
          font-size: clamp(1.4rem, 2.8vw, 2.6rem);
          font-weight: 500;
          line-height: 1.35;
          color: #fafafa;
          letter-spacing: -0.02em;
          max-width: 720px;
          margin: 0;
          text-align: center;
        }

        .resume-card {
          grid-column: 3;
          grid-row: 1;
          border-left: 0.5px solid #fff;
          border-bottom: 0.5px solid #fff;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 8px;
          overflow: hidden;
        }

        .resume-pdf-preview {
          flex: 0 1 auto;
          overflow: hidden;
          border: 0.5px solid #fff;
          margin-bottom: 8px;
          min-height: 0;
          max-height: 120px;
        }

        .resume-btn {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          color: #0a0a0a;
          text-decoration: none;
          padding: 10px 12px;
          background: #fafafa;
          text-align: center;
          transition: all 0.2s;
          display: block;
          width: 100%;
          box-sizing: border-box;
        }

        .resume-btn:hover {
          background: #0a0a0a;
          color: #fafafa;
        }

        .overlay-menu {
          position: fixed;
          top: 0;
          right: 0;
          width: 100%;
          height: 100svh;
          background: #0d0d0d;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 48px;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          overflow: hidden;
          overscroll-behavior: none;
          touch-action: none;
        }

        .overlay-menu.is-open {
          transform: translateX(0);
          pointer-events: auto;
        }

        .overlay-nav {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }

        .overlay-nav a {
          font-family: var(--font-geist-mono), monospace;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #fafafa;
          text-decoration: none;
          padding: 14px 32px;
          background: #1a1a1a;
          display: block;
          min-width: 220px;
          text-align: right;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .overlay-nav a:hover {
          background: #c97b4b;
          color: #0d0d0d;
        }

        @media (max-width: 1024px) {
          .hero-body {
            grid-template-columns: 140px 1fr 140px;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 16px 20px;
            max-height: none;
            min-height: 100svh;
          }

          .desktop-nav {
            display: none;
          }

          .hamburger {
            display: flex;
          }

          .hero-body {
            grid-template-columns: 60px 1fr auto;
            grid-template-rows: auto auto 1fr;
          }

          .hero-name-area {
            grid-column: 1 / -1;
            grid-row: 1;
            justify-content: flex-start;
            padding-bottom: 1rem;
          }

          .card-name {
            font-size: clamp(2.5rem, 9vw, 4rem);
          }

          .resume-card {
            grid-column: 3;
            grid-row: 1;
            border-left: none;
            border-bottom: 0.5px solid #fff;
            max-width: 200px;
          }

          .resume-pdf-preview {
            display: none;
          }

          .resume-btn {
            font-size: 10px;
            padding: 8px 10px;
          }

          .social-sidebar {
            grid-column: 1;
            grid-row: 2 / 4;
            grid-template-columns: 1fr;
            height: auto;
            overflow: visible;
          }

          .social-sidebar a svg {
            width: 16px;
            height: 16px;
          }

          .social-sidebar a:nth-child(3),
          .social-sidebar a:nth-child(4),
          .social-sidebar a:nth-child(5) {
            display: none;
          }

          .social-empty {
            display: none;
          }

          .hero-content {
            grid-column: 2 / -1;
            grid-row: 2;
            padding-left: 1rem;
          }

          .hero-content-upper {
            min-height: auto;
          }

          .hero-content-upper::after {
            display: none;
          }

          .hero-content-lower {
            flex: none;
          }

          .hero-cta-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .role-prefix {
            display: none;
          }

          .role-text {
            font-size: 13px;
          }

          .animated-role {
            font-size: 13px;
          }

          .see-work-link {
            margin-left: 0;
          }

          .hero-statement {
            font-size: clamp(1rem, 4vw, 1.4rem);
            text-align: left;
          }

          .overlay-menu {
            padding-right: 20px;
          }

          .overlay-nav {
            gap: 10px;
          }

          .overlay-nav a {
            min-width: 180px;
            font-size: 13px;
            padding: 12px 24px;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            padding: 12px 16px;
          }

          .card-name {
            font-size: clamp(2.2rem, 9vw, 3.5rem);
          }

          .resume-card {
            display: none;
          }

          .hero-content {
            padding-left: 0.75rem;
          }

          .hero-statement {
            font-size: clamp(0.9rem, 4.5vw, 1.2rem);
            text-align: left;
          }
        }
      `}</style>
    </section>
  )
}
