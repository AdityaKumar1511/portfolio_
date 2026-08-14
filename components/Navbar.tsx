'use client'
import { useEffect, useState } from 'react'
import meta from '@/data/meta.json'
import socials from '@/data/socials.json'

export default function Navbar() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const ids = meta.sections.map((s) => s.id)
    const els = ids
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
      <header className="chrome-top">
        <a className="chrome-brand" href="#hero">
          ADI
        </a>

        <nav className="chrome-links" aria-label="Sections">
          {meta.sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`chrome-link ${active === section.id ? 'is-active' : ''}`}
              data-magnetic-ignore
            >
              {section.label}
            </a>
          ))}
        </nav>
      </header>

      <aside className="chrome-left" aria-label="Social links">
        {socials.map((s) => (
          <a
            key={s.label}
            className="chrome-social"
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            title={s.label}
            data-magnetic-ignore
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d={s.svgPath} />
            </svg>
          </a>
        ))}
      </aside>

      <style>{`
        .chrome-top {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1001;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          padding: var(--corner-y) var(--corner-x);
          pointer-events: none;
        }

        .chrome-top > * {
          pointer-events: auto;
        }

        .chrome-brand {
          font-family: var(--font-geist-mono), monospace;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #fafafa;
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.2s ease;
        }

        .chrome-brand:hover {
          color: #e07a5f;
        }

        .chrome-links {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: flex-start;
          gap: 2px;
        }

        .chrome-link {
          position: relative;
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #a0a0a0;
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.2s ease;
        }

        .chrome-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1px;
          background: #e07a5f;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
        }

        .chrome-link:hover {
          color: #fafafa;
        }

        .chrome-link:hover::after {
          transform: scaleX(1);
        }

        .chrome-link.is-active {
          color: #e07a5f;
        }

        .chrome-link.is-active::after {
          transform: scaleX(1);
        }

        .chrome-left {
          position: fixed;
          left: var(--corner-x);
          bottom: var(--corner-y);
          z-index: 1001;
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
        }

        .chrome-social {
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a0a0a0;
          text-decoration: none;
          padding: 4px;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .chrome-social:hover {
          color: #e07a5f;
          transform: translateY(-2px);
        }

        .chrome-social svg {
          width: 16px;
          height: 16px;
        }

        @media (max-width: 768px) {
          .chrome-top {
            padding: var(--corner-y) var(--corner-x);
            gap: 10px;
          }

          .chrome-brand {
            font-size: 12px;
          }

          .chrome-links {
            gap: 1px;
          }

          .chrome-link {
            font-size: 10px;
          }

          .chrome-left {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .chrome-top {
            padding: var(--corner-y) var(--corner-x);
          }

          .chrome-brand {
            font-size: 11px;
          }

          .chrome-link {
            font-size: 9px;
            letter-spacing: 0.08em;
            padding: 2px 0;
          }
        }
      `}</style>
    </>
  )
}
