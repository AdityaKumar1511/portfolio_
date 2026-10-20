'use client'

import React, { useEffect, useRef } from 'react'

interface KineticRow {
  words: string[]
  outline: boolean
  speed: number
  dir: number
}

const ROWS: KineticRow[] = [
  { words: ['BUILD', 'SHIP'], outline: false, speed: 62, dir: 1 },
  { words: ['ITERATE', 'REPEAT'], outline: true, speed: 48, dir: -1 },
  { words: ['SHIP', 'BUILD', 'ITERATE', 'REPEAT'], outline: false, speed: 86, dir: 1 }
]

const REPEATS = 4

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

export default function KineticMarquee() {
  const rootRef = useRef<HTMLDivElement>(null)
  const trackRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tracks = trackRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!tracks.length) return

    let widths: number[] = tracks.map(t => t.scrollWidth / 2)
    const pos = tracks.map(() => 0)

    let raf = 0
    let last = 0
    let hover = 1
    let hoverTarget = 1
    let impulse = 0
    let lastPtrX = 0
    let hasPtr = false
    let lastScrollY = window.scrollY

    const measure = () => {
      widths = tracks.map(t => t.scrollWidth / 2)
    }

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (!last) last = now
      let dt = (now - last) / 1000
      last = now
      if (dt > 0.05) dt = 0.05

      hover += (hoverTarget - hover) * Math.min(1, dt * 6)
      impulse *= Math.pow(0.06, dt)

      tracks.forEach((track, i) => {
        const row = ROWS[i]
        const w = widths[i] || 1
        pos[i] += (row.dir * row.speed * hover + impulse) * dt
        const offset = ((pos[i] % w) + w) % w
        track.style.transform = `translate3d(${-offset}px, 0, 0) skewX(-6deg)`
      })
    }

    const onEnter = () => {
      hoverTarget = 2.5
    }
    const onLeave = () => {
      hoverTarget = 1
    }
    const onMove = (e: PointerEvent) => {
      if (!hasPtr) {
        lastPtrX = e.clientX
        hasPtr = true
        return
      }
      const dx = e.clientX - lastPtrX
      lastPtrX = e.clientX
      impulse = clamp(impulse + dx * 3, -1400, 1400)
    }
    const onScroll = () => {
      const y = window.scrollY
      const dy = y - lastScrollY
      lastScrollY = y
      impulse = clamp(impulse + dy * 7, -1200, 1200)
    }
    const onWheel = (e: WheelEvent) => {
      impulse = clamp(impulse + e.deltaY * 2.5, -1200, 1200)
    }
    const onResize = () => {
      measure()
    }

    root.addEventListener('pointerenter', onEnter)
    root.addEventListener('pointerleave', onLeave)
    root.addEventListener('pointermove', onMove)
    root.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    raf = requestAnimationFrame(frame)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        measure()
      })
    }

    return () => {
      cancelAnimationFrame(raf)
      root.removeEventListener('pointerenter', onEnter)
      root.removeEventListener('pointerleave', onLeave)
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="bento-card card-telemetry kinetic-card" ref={rootRef}>
      <div className="kinetic-header">
        <span className="kinetic-label">ALWAYS SHIPPING //</span>
      </div>
      <div className="kinetic-body">
        {ROWS.map((row, i) => (
          <div key={i} className={`kinetic-row${row.outline ? ' is-outline' : ''}`}>
            <div
              className="kinetic-track"
              ref={el => {
                trackRefs.current[i] = el
              }}
            >
              {Array.from({ length: 2 }).map((_, g) => (
                <span className="kinetic-group" key={g}>
                  {Array.from({ length: REPEATS }).map((_, k) =>
                    row.words.map((word, wi) => (
                      <span className="kinetic-word" key={`${k}-${wi}`}>
                        {word}
                      </span>
                    ))
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .kinetic-card {
          --kg: clamp(12px, 1.6vw, 26px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          height: clamp(190px, 15vw, 235px);
          overflow: hidden;
        }

        .kinetic-header {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .kinetic-label {
          font-family: var(--font-mono), monospace;
          font-size: 9.5px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(10, 10, 10, 0.85);
        }

        .kinetic-body {
          position: relative;
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: clamp(2px, 0.5vw, 8px);
        }

        .kinetic-row {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .kinetic-track {
          display: flex;
          align-items: center;
          width: max-content;
          will-change: transform;
        }

        .kinetic-group {
          display: flex;
          align-items: center;
          gap: var(--kg);
          padding-right: var(--kg);
        }

        .kinetic-word {
          font-family: var(--font-display), sans-serif;
          font-weight: 800;
          font-stretch: 90%;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          line-height: 0.95;
          font-size: clamp(1.5rem, 3vw, 2.4rem);
          color: #0a0a0a;
        }

        .kinetic-row.is-outline .kinetic-word {
          color: transparent;
          -webkit-text-stroke: 1.5px #0a0a0a;
        }

        @media (prefers-reduced-motion: reduce) {
          .kinetic-track {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  )
}
