'use client'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import meta from '@/data/meta.json'

const LINK_IDS = meta.sections.map((s) => s.id)
const NAV_LINKS = meta.sections.filter((s) => s.id === 'about' || s.id === 'projects')

function Logo() {
  return (
    <svg
      className="nav-logo-svg"
      viewBox="0 0 76 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      <path d="M2 24 L12 4 L22 24" />
      <path d="M6.5 17 L17.5 17" />
      <path d="M32 4 H40 L50 14 L40 24 H32 Z" />
      <path d="M60 4 L72 4" />
      <path d="M66 4 L66 24" />
      <path d="M60 24 L72 24" />
    </svg>
  )
}

export default function Navbar() {
  const [active, setActive] = useState('hero')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const els = LINK_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return
        const top = visible.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        )[0]
        setActive(top.target.id)
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <header className="nav-header">
        <a className="nav-logo" href="/#hero" data-magnetic-ignore>
          <Logo />
        </a>

        <div className="nav-menu-wrap">
          <nav
            className={`nav-menu${open ? ' nav-menu--open' : ''}`}
            aria-label="Sections"
          >
            <div className="nav-menu-links">
              {NAV_LINKS.map((section) => (
                <a
                  key={section.id}
                  href={`/#${section.id}`}
                  className={`nav-menu-link ${active === section.id ? 'is-active' : ''}`}
                  data-magnetic-ignore
                  onClick={() => setOpen(false)}
                >
                  {section.label}
                </a>
              ))}
            </div>

            <a
              className="nav-cta"
              href="/#contact"
              data-magnetic-ignore
              onClick={() => setOpen(false)}
            >
              Contact
            </a>
          </nav>

          <button
            className="nav-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            data-magnetic-ignore
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <style>{`
        .nav-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1001;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: var(--corner-y) var(--corner-x);
          pointer-events: none;
          background: transparent;
        }

        .nav-logo {
          pointer-events: auto;
          display: inline-flex;
          align-items: center;
          color: #d4cec7;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .nav-logo:hover {
          color: #fa5f34;
        }

        .nav-logo-svg {
          display: block;
          height: 20px;
          width: auto;
        }

        .nav-menu-wrap {
          position: relative;
          pointer-events: auto;
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px;
          border-radius: 2px;
          background: #e6e0d8;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
        }

        .nav-menu-links {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .nav-menu-link {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #0a0a0a;
          text-decoration: none;
          padding: 8px 13px;
          border-radius: 2px;
          white-space: nowrap;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .nav-menu-link:hover {
          background: rgba(10, 10, 10, 0.08);
        }

        .nav-menu-link.is-active {
          background: rgba(10, 10, 10, 0.12);
        }

        .nav-cta {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #fa5f34;
          background: #0a0a0a;
          text-decoration: none;
          padding: 9px 18px;
          border-radius: 2px;
          white-space: nowrap;
          margin-left: 2px;
          box-shadow: 0 0 0 rgba(250, 95, 52, 0);
          transition: transform 0.2s ease, box-shadow 0.25s ease;
        }

        .nav-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 18px rgba(250, 95, 52, 0.45);
        }

        .nav-toggle {
          display: none;
          pointer-events: auto;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 2px;
          border: 1px solid rgba(212, 206, 199, 0.18);
          background: transparent;
          color: #d4cec7;
          cursor: pointer;
          transition: color 0.2s ease, border-color 0.2s ease;
        }

        .nav-toggle:hover {
          color: #fa5f34;
          border-color: #fa5f34;
        }

        @media (max-width: 768px) {
          .nav-logo-svg {
            height: 18px;
          }

          .nav-toggle {
            display: flex;
          }

          .nav-menu {
            position: absolute;
            top: calc(100% + 10px);
            right: 0;
            flex-direction: column;
            align-items: stretch;
            gap: 4px;
            padding: 8px;
            border-radius: 4px;
            min-width: 180px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-8px);
            transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
          }

          .nav-menu--open {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }

          .nav-menu-links {
            flex-direction: column;
            align-items: stretch;
            gap: 2px;
          }

          .nav-menu-link {
            padding: 11px 14px;
            border-radius: 2px;
          }

          .nav-cta {
            text-align: center;
            margin-left: 0;
            margin-top: 4px;
            padding: 12px 18px;
            border-radius: 2px;
          }
        }
      `}</style>
    </>
  )
}
