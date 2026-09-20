'use client'
import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Code, GraduationCap } from 'lucide-react'
import meta from '@/data/meta.json'

gsap.registerPlugin(useGSAP)

function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

const TYPING_ROLES = [
  'Full-Stack Developer',
  'Systems Programmer',
  'Building Web Apps',
]

const TYPE_SPEED = 55
const DELETE_SPEED = 28
const HOLD_MS = 1600

const STATS = [
  { icon: Code, label: 'LeetCode · 1800+', href: `https://leetcode.com/u/${meta.leetcodeUsername}/` },
  { icon: GithubMark, label: 'GitHub · 40+ repos', href: meta.github },
  { icon: GraduationCap, label: "NIT Patna · '29", href: null as string | null },
]

const firstName = meta.name.split(' ')[0]
const lastName = meta.name.split(' ')[1] || ''

export default function Hero() {
  const scopeRef = useRef<HTMLDivElement>(null)
  const typeRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let roleIndex = 0
    let charIndex = 0
    let deleting = false
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      const role = TYPING_ROLES[roleIndex]
      if (typeRef.current) {
        typeRef.current.textContent = role.slice(0, charIndex)
      }

      if (!deleting) {
        charIndex++
        if (charIndex > role.length) {
          deleting = true
          timer = setTimeout(tick, HOLD_MS)
          return
        }
      } else {
        charIndex--
        if (charIndex === 0) {
          deleting = false
          roleIndex = (roleIndex + 1) % TYPING_ROLES.length
        }
      }

      timer = setTimeout(tick, deleting ? DELETE_SPEED : TYPE_SPEED)
    }

    timer = setTimeout(tick, TYPE_SPEED)
    return () => clearTimeout(timer)
  }, [])

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '.hero-eyebrow',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        .fromTo(
          '.hero-name',
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.7 },
          '-=0.25'
        )
        .call(() => {}, [], '+=0.05')
        .fromTo(
          '.hero-para',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          '+=0.1'
        )
        .fromTo(
          '.hero-cta-row > *',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          '-=0.2'
        )
        .fromTo(
          '.hero-divider',
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.5, transformOrigin: 'center' },
          '-=0.2'
        )
        .fromTo(
          '.hero-stats',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        )
    },
    { scope: scopeRef }
  )

  return (
    <section id="hero" className="hero-section" ref={scopeRef}>
      <div className="hero-inner">
        <div className="hero-eyebrow">
          available for internships
        </div>

        <h1 className="hero-name">
          <span className="hero-name-line">{firstName}</span>
          {' '}
          <span className="hero-name-line hero-name-line--muted">{lastName}</span>
        </h1>

        <div className="hero-typewriter">
          <span className="hero-typewriter-text" ref={typeRef} />
          <span className="hero-typewriter-caret" aria-hidden="true" />
        </div>

        <p className="hero-para">
          I build production-grade digital products at the intersection of
          meticulous engineering and purposeful design.
        </p>

        <div className="hero-cta-row">
          <a className="hero-btn hero-btn--primary" href={meta.resumeUrl} target="_blank" rel="noreferrer">
            View Resume ↗
          </a>
          <a className="hero-btn hero-btn--outline" href="#projects">
            See My Work ↗
          </a>
        </div>

        <div className="hero-divider" />

        <div className="hero-stats">
          {STATS.map((stat) => {
            const Icon = stat.icon
            const content = (
              <>
                <Icon size={14} strokeWidth={1.75} />
                <span>{stat.label}</span>
              </>
            )
            return stat.href ? (
              <a key={stat.label} className="hero-stat" href={stat.href} target="_blank" rel="noreferrer">
                {content}
              </a>
            ) : (
              <span key={stat.label} className="hero-stat">
                {content}
              </span>
            )
          })}
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100svh;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 96px var(--pad-x) 48px;
          box-sizing: border-box;
          overflow: hidden;
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 900px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-geist-mono), monospace;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #d4cec7;
          padding: 8px 16px;
          border: 1px solid rgba(212, 206, 199, 0.15);
          border-radius: 2px;
          margin-bottom: clamp(1.5rem, 4vh, 2.5rem);
        }

        .hero-name {
          margin: 0;
          font-family: 'Impact', 'Arial Black', 'Haettenschweiler', 'Franklin Gothic Bold', sans-serif;
          font-size: clamp(3rem, 9vw, 6rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          line-height: 0.95;
          color: #d4cec7;
          white-space: nowrap;
        }

        .hero-name-line { display: inline; }

        .hero-typewriter {
          display: flex;
          align-items: center;
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          color: #fa5f34;
          min-height: 1.4em;
          margin-top: clamp(1.25rem, 3vh, 2rem);
        }

        .hero-typewriter-caret {
          width: 2px;
          height: 1.1em;
          margin-left: 4px;
          background: #fa5f34;
          animation: caretBlink 1s steps(1) infinite;
        }

        @keyframes caretBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .hero-para {
          max-width: 620px;
          margin: clamp(1.5rem, 4vh, 2.25rem) 0 0;
          font-size: clamp(0.95rem, 1.8vw, 1.15rem);
          line-height: 1.7;
          color: #d4cec7;
        }

        .hero-cta-row {
          display: flex;
          gap: 14px;
          margin-top: clamp(1.75rem, 4.5vh, 2.5rem);
          flex-wrap: wrap;
          justify-content: center;
        }

        .hero-btn {
          font-family: var(--font-geist-mono), monospace;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 13px 30px;
          border-radius: 2px;
          text-decoration: none;
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }

        .hero-btn:hover {
          transform: translateY(-2px);
        }

        .hero-btn--primary {
          background: #fa5f34;
          color: #0a0a0a;
        }

        .hero-btn--primary:hover {
          background: #c75b3f;
        }

        .hero-btn--outline {
          border: 1px solid rgba(212, 206, 199, 0.35);
          color: #d4cec7;
          background: transparent;
        }

        .hero-btn--outline:hover {
          border-color: #fa5f34;
          color: #fa5f34;
        }

        .hero-divider {
          width: 160px;
          height: 1px;
          background: rgba(212, 206, 199, 0.2);
          margin: clamp(2rem, 5vh, 3rem) 0 clamp(1.25rem, 3vh, 2rem);
        }

        .hero-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          font-family: var(--font-geist-mono), monospace;
          font-size: 12px;
          color: #d4cec7;
        }

        .hero-stat {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #d4cec7;
          text-decoration: none;
          padding: 0 10px;
          transition: color 0.2s ease;
        }

        a.hero-stat:hover {
          color: #d4cec7;
        }

        @media (max-width: 768px) {
          .hero-name {
            white-space: normal;
          }

          .hero-name-line { display: block; }

          .hero-name-line--muted { color: #d4cec7; }
        }

        @media (max-width: 640px) {
          .hero-stat { padding: 0 8px; }
        }
      `}</style>
    </section>
  )
}
