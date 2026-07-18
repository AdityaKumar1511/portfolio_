'use client'
import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub' },
  { id: 'leetcode', label: 'CP' },
  { id: 'how-i-work', label: 'How I Work' },
  { id: 'contact', label: 'Contact' },
]

export default function ProgressRail() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const [visible, setVisible] = useState(false)

  // Delay mount animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800)
    return () => clearTimeout(t)
  }, [])

  // Scroll-based section tracking — picks the section whose top
  // is closest to 40% of the viewport height for accurate sync
  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const target = window.innerHeight * 0.4
        let bestIdx = 0
        let bestDist = Infinity

        for (let i = 0; i < SECTIONS.length; i++) {
          const el = document.getElementById(SECTIONS[i].id)
          if (!el) continue
          const rect = el.getBoundingClientRect()
          // Distance from section top to the target line
          const dist = Math.abs(rect.top - target)
          // Also consider if we're inside this section
          const insideSection = rect.top <= target && rect.bottom > target
          if (insideSection) {
            bestIdx = i
            bestDist = 0
            break
          }
          if (dist < bestDist) {
            bestDist = dist
            bestIdx = i
          }
        }

        // Edge case: if scrolled to very bottom, activate last section
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 50) {
          bestIdx = SECTIONS.length - 1
        }

        setActiveIdx(bestIdx)
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // run once on mount
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className="progress-rail"
        aria-label="Page progress"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {/* Vertical line */}
        <div className="rail-line" />

        {/* Dots */}
        {SECTIONS.map((sec, i) => {
          const isActive = i === activeIdx
          const isPast = i < activeIdx
          const isHovered = i === hoverIdx

          return (
            <button
              key={sec.id}
              className={`rail-dot-btn ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}
              onClick={() => handleClick(sec.id)}
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
              aria-label={`Navigate to ${sec.label}`}
              aria-current={isActive ? 'true' : undefined}
            >
              {/* Dot */}
              <span className="rail-dot">
                <span className="rail-dot-core" />
                {isActive && <span className="rail-dot-ring" />}
              </span>

              {/* Label — only on hover */}
              <span
                className="rail-label"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateX(0)' : 'translateX(-6px)',
                }}
              >
                {sec.label}
              </span>
            </button>
          )
        })}
      </nav>

      <style>{`
        .progress-rail {
          position: fixed;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 9000;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          transition: opacity 0.6s ease;
        }

        /* The thin vertical line behind the dots */
        .rail-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1.5px;
          transform: translateX(-50%);
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(160, 160, 160, 0.3) 10%,
            rgba(160, 160, 160, 0.3) 90%,
            transparent 100%
          );
          pointer-events: none;
        }

        /* Button wrapper for each dot */
        .rail-dot-btn {
          position: relative;
          display: flex;
          align-items: center;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          outline: none;
          -webkit-tap-highlight-color: transparent;
        }

        .rail-dot-btn:focus-visible {
          outline: none;
        }

        .rail-dot-btn:focus-visible .rail-dot-core {
          box-shadow: 0 0 0 2px #e07a5f;
        }

        /* Dot container — holds core + ring */
        .rail-dot {
          position: relative;
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Core circle */
        .rail-dot-core {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(160, 160, 160, 0.55);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          z-index: 2;
        }

        .rail-dot-btn:hover .rail-dot-core {
          background: rgba(250, 250, 250, 0.85);
          transform: scale(1.4);
        }

        .rail-dot-btn.past .rail-dot-core {
          background: rgba(224, 122, 95, 0.6);
        }

        .rail-dot-btn.active .rail-dot-core {
          width: 10px;
          height: 10px;
          background: #e07a5f;
          box-shadow: 0 0 14px rgba(224, 122, 95, 0.6);
        }

        /* Outer ring pulse for active dot */
        .rail-dot-ring {
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          border: 1.5px solid rgba(224, 122, 95, 0.4);
          animation: railRingPulse 2.2s ease-in-out infinite;
          z-index: 1;
        }

        @keyframes railRingPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.8); opacity: 0; }
        }

        /* Hover label */
        .rail-label {
          position: absolute;
          left: calc(100% + 12px);
          white-space: nowrap;
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: rgba(250, 250, 250, 0.65);
          pointer-events: none;
          transition: opacity 0.25s ease, transform 0.25s ease;
          user-select: none;
        }

        .rail-dot-btn.active .rail-label {
          color: #e07a5f;
        }

        /* Hide on mobile + small tablets */
        @media (max-width: 1024px) {
          .progress-rail {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
