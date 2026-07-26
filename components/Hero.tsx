'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import meta from '@/data/meta.json'
import heroData from '@/data/hero.json'

const roles = heroData.roles

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
      <motion.div className="hero-top-row" {...fadeUp(0.1)}>
        <span className="hero-status">
          OPEN TO <span className="hero-status-green">INTERNSHIP</span>
        </span>
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

      <div className={`overlay-menu ${menuOpen ? 'is-open' : ''}`}>
        <nav className="overlay-nav">
          {NAV_LINKS.map(link => (
            <a
              key={link.id}
              href={link.href || `#${link.id}`}
              onClick={() => setMenuOpen(false)}
              {...(link.href?.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="hero-main">
        <div className="hero-text">
          <motion.div className="card-name-block" {...fadeUp(0.25)}>
            <h2 className="card-name">{name}</h2>
          </motion.div>

          <motion.div className="dynamic-role-wrapper" {...fadeUp(0.4)}>
            <span className="static-text role-static-text">{heroData.statementPrefix}</span>
            <span key={roleIndex} className="animated-role">{roles[roleIndex]}</span>
          </motion.div>

          <motion.p className="img-statement" {...fadeUp(0.55)} dangerouslySetInnerHTML={{ __html: heroData.statement }} />
        </div>

      </div>

      <motion.div className="scroll-cue" {...fadeUp(1.2)}>
        <span className="scroll-cmd">$ scroll <span className="scroll-flag">--down</span></span>
        <span className="scroll-cursor">_</span>
      </motion.div>

      <style>{`

        .hero-section {
          min-height: 100svh;
          max-height: 100svh;
          padding: 16px 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
          background: transparent;
          color: #fafafa;
          position: relative;
        }

        .hero-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding-bottom: 1rem;
        }

        .hero-status {
          font-family: var(--font-geist-mono), monospace;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #777777;
        }

        .hero-status-green {
          color: #4ade80;
          font-weight: 700;
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          background: transparent;
          border: 1px solid #333;
          border-radius: 4px;
          cursor: pointer;
          padding: 6px;
          z-index: 1001;
          transition: border-color 0.2s ease;
        }

        .hamburger:hover {
          border-color: #666;
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
          background: #fafafa;
          color: #0d0d0d;
        }

        .hero-main {
          display: flex;
          align-items: flex-end;
          padding-top: 0.5rem;
        }

        .hero-text {
          flex: 1;
          max-width: 50%;
        }

        .card-name-block {
          margin-top: 0;
        }

        .card-name {
          font-family: 'Impact', 'Arial Black', 'Haettenschweiler', 'Franklin Gothic Bold', sans-serif;
          font-size: clamp(4rem, 7vw, 6rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          color: #f0e6d3;
          line-height: 0.95;
          margin: 0;
          text-transform: uppercase;
        }

        .dynamic-role-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(15px, 2vw, 20px);
          margin-top: clamp(0.75rem, 1.5vh, 1rem);
        }

        .static-text {
          color: #777777;
        }

        .animated-role {
          color: #3ec8e0;
          font-weight: 500;
          display: inline-block;
          animation: roleFadeIn 0.3s ease forwards;
        }

        @keyframes roleFadeIn {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .img-statement {
          font-size: clamp(1.4rem, 2.5vw, 2.2rem);
          font-weight: 500;
          line-height: 1.35;
          color: #fafafa;
          letter-spacing: -0.02em;
          max-width: 720px;
          margin-top: clamp(0.75rem, 2vh, 1.5rem);
        }

        .scroll-cue {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding-bottom: 1.5rem;
        }

        .scroll-cmd {
          font-family: var(--font-geist-mono), monospace;
          font-size: 12px;
          color: #888;
          letter-spacing: 0.05em;
        }

        .scroll-flag {
          color: #aaa;
        }

        .scroll-cursor {
          font-family: var(--font-geist-mono), monospace;
          font-size: 12px;
          color: #888;
          animation: cursorBlink 1s step-end infinite;
        }

        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @media (max-width: 640px) {
          .hero-section {
            padding: 20px 20px;
          }

          .overlay-menu {
            padding-right: 20px;
            justify-content: flex-end;
          }

          .overlay-nav {
            gap: 10px;
          }

          .overlay-nav a {
            min-width: 180px;
            font-size: 13px;
            padding: 12px 24px;
          }

          .hero-main {
            flex-direction: column;
            padding-top: 1rem;
            align-items: flex-start;
          }

          .card-name-block {
            margin-top: 0.75rem;
          }

          .card-name {
            font-size: clamp(2.5rem, 10vw, 3.5rem);
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
            margin-top: 0.75rem;
            line-height: 1.35;
          }

          .scroll-cue {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
