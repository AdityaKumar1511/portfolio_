'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import meta from '@/data/meta.json'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setIsOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const { name, navLinks, openToWork, resumeUrl } = meta

  return (
    <nav
      className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
    >
      <span className="navbar-logo">
        {name}
      </span>

      {/* Desktop Menu */}
      <div className="nav-desktop-menu">
        {navLinks.map(id => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="nav-link-btn"
          >
            {id}
          </button>
        ))}

        {openToWork && (
          <div className="work-status-pill">
            <span className="pulse-dot status-dot-green" />
            <span className="work-status-text">
              Open to work
            </span>
          </div>
        )}

        <Link
          href={resumeUrl}
          target="_blank"
          className="nav-resume-link"
        >
          Resume ↗
        </Link>
      </div>

      {/* Hamburger Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="nav-hamburger-btn"
        aria-label="Toggle Menu"
      >
        <span className={`hamburger-line ${isOpen ? 'line-1-open' : ''}`} />
        <span className={`hamburger-line ${isOpen ? 'line-2-open' : ''}`} />
        <span className={`hamburger-line ${isOpen ? 'line-3-open' : ''}`} />
      </button>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Drawer Panel */}
      <div className={`mobile-drawer ${isOpen ? 'mobile-drawer-open' : ''}`}>
        <div className="drawer-header">
          <span className="navbar-logo">{name}</span>
          <button onClick={() => setIsOpen(false)} className="drawer-close-btn">
            &times;
          </button>
        </div>

        <div className="drawer-content">
          {navLinks.map(id => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="drawer-link-btn"
            >
              {id}
            </button>
          ))}

          {openToWork && (
            <div className="work-status-pill drawer-status-pill">
              <span className="pulse-dot status-dot-green" />
              <span className="work-status-text">Open to work</span>
            </div>
          )}

          <Link
            href={resumeUrl}
            target="_blank"
            className="drawer-resume-link"
            onClick={() => setIsOpen(false)}
          >
            Resume ↗
          </Link>
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          padding: 0 24px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: all 300ms ease;
          z-index: 50;
        }

        .navbar-scrolled {
          background: rgba(10,10,10,0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }

        .navbar-logo {
          font-size: 14px;
          font-weight: 500;
          color: var(--text);
        }

        .nav-desktop-menu {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-link-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 13px;
          color: var(--text-secondary);
          text-transform: capitalize;
          transition: color 150ms;
          font-family: inherit;
        }

        .nav-link-btn:hover {
          color: var(--text);
        }

        .work-status-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 4px 10px;
        }

        .status-dot-green {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #34d399;
          display: inline-block;
        }

        .work-status-text {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          color: var(--text-muted);
        }

        .nav-resume-link {
          font-size: 13px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 150ms;
        }

        .nav-resume-link:hover {
          color: var(--text);
        }

        /* Hamburger button */
        .nav-hamburger-btn {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 18px;
          height: 14px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          box-sizing: border-box;
          z-index: 60;
        }

        .hamburger-line {
          width: 100%;
          height: 2px;
          background-color: var(--text);
          transition: all 250ms ease;
        }

        /* Hamburger Animation */
        .line-1-open {
          transform: translateY(6px) rotate(45deg);
        }
        .line-2-open {
          opacity: 0;
        }
        .line-3-open {
          transform: translateY(-6px) rotate(-45deg);
        }

        /* Mobile Drawer */
        .mobile-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 55;
        }

        .mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 280px;
          height: 100vh;
          background: #0f0f0f;
          border-left: 1px solid var(--border);
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
          z-index: 56;
          padding: 24px;
          transform: translateX(100%);
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          gap: 2rem;
          box-sizing: border-box;
        }

        .mobile-drawer-open {
          transform: translateX(0);
        }

        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .drawer-close-btn {
          background: none;
          border: none;
          color: var(--text);
          font-size: 24px;
          cursor: pointer;
          padding: 0;
        }

        .drawer-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.5rem;
        }

        .drawer-link-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          color: var(--text-secondary);
          text-transform: capitalize;
          transition: color 150ms;
          font-family: inherit;
          padding: 8px 0;
          width: 100%;
          text-align: left;
        }

        .drawer-link-btn:hover {
          color: var(--text);
        }

        .drawer-status-pill {
          margin-top: 1rem;
          align-self: flex-start;
        }

        .drawer-resume-link {
          font-size: 16px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 150ms;
          padding: 8px 0;
          width: 100%;
          text-align: left;
        }

        .drawer-resume-link:hover {
          color: var(--text);
        }

        @media (max-width: 767px) {
          .nav-desktop-menu {
            display: none;
          }
          .nav-hamburger-btn {
            display: flex;
          }
        }
      `}</style>
    </nav>
  )
}
