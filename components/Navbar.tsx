'use client'
import { useEffect, useState } from 'react'
import meta from '@/data/meta.json'
import socials from '@/data/socials.json'

const PROFILES = [
  { label: 'GitHub', href: meta.github },
  { label: 'LeetCode', href: `https://leetcode.com/u/${meta.leetcodeUsername}/` },
  { label: 'Codeforces', href: `https://codeforces.com/profile/${meta.codeforcesUsername}` },
  { label: 'Resume', href: meta.resumeUrl },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

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
    <>
      <header className="navbar">
        <button
          className={`hamburger ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div
        className={`overlay-menu ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="overlay-grain" aria-hidden="true" />

        <div className="overlay-inner">
          <div className="overlay-group overlay-sections">
            <span className="overlay-group-label">Sections</span>
            <div className="overlay-section-tiles">
              {meta.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="tile-index">
                    {String(meta.sections.indexOf(section) + 1).padStart(2, '0')}
                  </span>
                  <span className="tile-name">{section.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="overlay-side">
            <div className="overlay-group">
              <span className="overlay-group-label">Profiles</span>
              {PROFILES.map((profile) => (
                <a
                  key={profile.label}
                  href={profile.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  {profile.label} ↗
                </a>
              ))}
            </div>
            <div className="overlay-group">
              <span className="overlay-group-label">Socials</span>
              <div className="overlay-socials">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    onClick={() => setMenuOpen(false)}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d={s.svgPath} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1001;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 32px;
          background: transparent;
          pointer-events: none;
        }

        .navbar > * {
          pointer-events: auto;
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          background: transparent;
          border: none;
          cursor: pointer;
          z-index: 1002;
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
          left: 0;
          width: 100%;
          height: 100svh;
          background: #0d0d0d;
          z-index: 1000;
          visibility: hidden;
          pointer-events: none;
          overflow: hidden;
          overscroll-behavior: none;
          touch-action: none;
          transition: visibility 0s linear 0.65s;
        }

        .overlay-menu.is-open {
          visibility: visible;
          pointer-events: auto;
          transition: visibility 0s;
        }

        .overlay-grain {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-color: #ba5c43;
          background-image: url('/noise.png');
          background-size: 128px 128px;
          background-blend-mode: multiply;
          clip-path: inset(0 0 0 100%);
          transition: clip-path 0.6s cubic-bezier(0.77, 0, 0.175, 1);
        }

        .overlay-menu.is-open .overlay-grain {
          clip-path: inset(0 0 0 0);
        }

        .overlay-inner {
          position: relative;
          z-index: 1;
          height: 100%;
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
          grid-template-rows: 1fr;
          gap: clamp(2rem, 5vw, 4rem);
          padding: 96px clamp(24px, 5vw, 64px) 40px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .overlay-menu.is-open .overlay-inner {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.45s;
        }

        .overlay-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .overlay-group-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #fafafa;
        }

        .overlay-sections {
          min-height: 0;
        }

        .overlay-section-tiles {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(4, 1fr);
          gap: clamp(8px, 1.2vw, 14px);
          min-height: 0;
        }

        .overlay-section-tiles a {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 6px;
          padding: clamp(12px, 1.6vw, 20px);
          background: #171717;
          border: 0.5px solid rgba(255, 255, 255, 0.08);
          text-decoration: none;
          overflow: hidden;
          position: relative;
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
        }

        .overlay-section-tiles a:hover {
          background: #c97b4b;
          border-color: #c97b4b;
          transform: translateY(-2px);
        }

        .overlay-section-tiles a:hover .tile-name {
          color: #0d0d0d;
        }

        .tile-index {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.14em;
          color: #fafafa;
          transition: color 0.25s ease;
        }

        .overlay-section-tiles a:hover .tile-index {
          color: rgba(13, 13, 13, 0.6);
        }

        .tile-name {
          font-family: 'Impact', 'Arial Black', 'Haettenschweiler', 'Franklin Gothic Bold', sans-serif;
          font-size: clamp(1.4rem, 2.6vw, 2.2rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          line-height: 1;
          color: #fafafa;
          transition: color 0.25s ease;
        }

        .overlay-side {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 24px;
          min-height: 0;
        }

        .overlay-side .overlay-group a {
          font-family: var(--font-geist-mono), monospace;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #fafafa;
          text-decoration: none;
          padding: 14px 18px;
          background: #1a1a1a;
          display: block;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .overlay-side .overlay-group a:hover {
          background: #c97b4b;
          color: #0d0d0d;
        }

        .overlay-socials {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .overlay-socials a {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px 0;
          background: #1a1a1a;
        }

        .overlay-socials a svg {
          width: 18px;
          height: 18px;
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 16px 20px;
          }

          .overlay-menu {
            overflow-y: auto;
          }

          .overlay-inner {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            gap: 32px;
            padding: 88px 20px 32px;
            min-height: 100%;
            height: auto;
          }

          .overlay-section-tiles {
            grid-template-rows: none;
            grid-auto-rows: minmax(88px, auto);
          }

          .overlay-side {
            gap: 32px;
          }
        }

        @media (max-width: 480px) {
          .navbar {
            padding: 12px 16px;
          }

          .tile-name {
            font-size: clamp(1.2rem, 6vw, 1.5rem);
          }
        }
      `}</style>
    </>
  )
}
