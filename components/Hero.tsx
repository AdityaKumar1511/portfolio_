'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import meta from '@/data/meta.json'
import githubDefaults from '@/data/githubDefaults.json'
import { ArrowUpRight } from './ArrowIcon'
import { useSolvedCounts } from '@/lib/cpStats'

gsap.registerPlugin(useGSAP)

type HeroProps = {
  githubContributions?: number | null
}

export default function Hero({ githubContributions }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  const solvedCounts = useSolvedCounts()
  const githubTotal = githubContributions ?? githubDefaults.stats.contributions

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '.hero-rail',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.55 }
      )
        .fromTo(
          '.hero-name-part',
          { y: 42 },
          { y: 0, duration: 0.9, stagger: 0.08 },
          '-=0.25'
        )
        .fromTo(
          '.hero-intro > *',
          { y: 16 },
          { y: 0, duration: 0.55, stagger: 0.08 },
          '-=0.55'
        )
        .fromTo(
          '.hero-foot > *',
          { y: 10 },
          { y: 0, duration: 0.45, stagger: 0.06 },
          '-=0.2'
        )
    },
    { scope: containerRef }
  )

  return (
    <section id="hero" className="hero-section" ref={containerRef}>
      <div className="hero-frame">
        <div className="hero-rail">
          <span>Aditya Kumar / Portfolio</span>
          <span>Full-stack / Applied ML</span>
        </div>

        <div className="hero-main">
          <h1 className="hero-name" aria-label="Aditya Kumar">
            <span className="hero-name-part">ADITYA</span>
            <span className="hero-name-part hero-name-accent">KUMAR</span>
          </h1>

          <div className="hero-intro">
            {meta.openToWork && (
              <div className="hero-kicker">
                <span className="hero-status-mark" aria-hidden="true" />
                <span>{meta.statusText.toUpperCase()}</span>
              </div>
            )}

            <p className="hero-lede">
              I build full-stack products and applied-ML tools. Most of the work
              goes into the unglamorous parts — data models, failure states, and
              making the interface feel instant.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="cta-primary">
                VIEW PROJECTS <ArrowUpRight size={12} />
              </a>
              <a
                href={meta.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="cta-text"
              >
                RESUME <ArrowUpRight size={12} />
              </a>
              <a href="#contact" className="cta-text">
                CONTACT <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>

        <div className="hero-foot">
          <a
            href={`https://leetcode.com/u/${meta.leetcodeUsername}/`}
            target="_blank"
            rel="noreferrer"
            className="hero-stat-link"
          >
            <span className="hero-stat-label">LeetCode</span>
            <span className="hero-stat-value">
              {solvedCounts.leetcode.toLocaleString('en-US')}+ solved
              <ArrowUpRight size={11} />
            </span>
          </a>
          <a
            href={`https://codeforces.com/profile/${meta.codeforcesUsername}`}
            target="_blank"
            rel="noreferrer"
            className="hero-stat-link"
          >
            <span className="hero-stat-label">Codeforces</span>
            <span className="hero-stat-value">
              {solvedCounts.codeforcesRating.toLocaleString('en-US')} rating
              <ArrowUpRight size={11} />
            </span>
          </a>
          <a
            href={meta.github}
            target="_blank"
            rel="noreferrer"
            className="hero-stat-link"
          >
            <span className="hero-stat-label">GitHub</span>
            <span className="hero-stat-value">
              {githubTotal.toLocaleString('en-US')} contributions
              <ArrowUpRight size={11} />
            </span>
          </a>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          min-height: 100svh;
          display: flex;
          padding: clamp(1.5rem, 4vh, 3rem) var(--pad-x);
          box-sizing: border-box;
          border-bottom: 1px solid var(--rule);
          overflow: hidden;
        }

        .hero-frame {
          width: 100%;
          max-width: 1480px;
          margin: 0 auto;
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: space-between;
          min-width: 0;
        }

        /* ── TOP RAIL ── */
        .hero-rail {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--rule);
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: rgba(212, 206, 199, 0.52);
        }

        /* ── MAIN COMPOSITION ── */
        .hero-main {
          flex: 1;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(300px, 380px);
          align-items: end;
          gap: clamp(3rem, 7vw, 8rem);
          padding-block: clamp(2.5rem, 8vh, 6rem);
          min-height: 0;
        }

        .hero-name {
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          font-family: var(--font-display), sans-serif;
          font-size: clamp(4.5rem, 13.5vw, 13rem);
          font-weight: 800;
          font-stretch: 86%;
          line-height: 0.78;
          letter-spacing: -0.055em;
          text-transform: uppercase;
          color: #f3eee8;
        }

        .hero-name-part {
          display: block;
        }

        .hero-name-accent {
          align-self: flex-end;
          color: #fa5f34;
        }

        /* ── RIGHT-HAND INTRO ── */
        .hero-intro {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.5rem;
          padding-bottom: clamp(0.25rem, 1.5vh, 1rem);
        }

        .hero-kicker {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #d4cec7;
        }

        .hero-status-mark {
          width: 7px;
          height: 7px;
          background: #fa5f34;
          flex-shrink: 0;
        }

        .hero-lede {
          margin: 0;
          max-width: 38ch;
          font-family: var(--font-sans), sans-serif;
          font-size: clamp(1rem, 1.3vw, 1.15rem);
          line-height: 1.65;
          color: rgba(212, 206, 199, 0.74);
        }

        .hero-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px 18px;
          padding-top: 0.25rem;
        }

        /* ── BOTTOM PLATFORM LINKS ── */
        .hero-foot {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          align-items: end;
          gap: clamp(1.25rem, 3vw, 3rem);
          padding-top: 18px;
          border-top: 1px solid var(--rule);
        }

        .hero-stat-link {
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 0;
          color: inherit;
          text-decoration: none;
        }

        .hero-stat-label {
          font-family: var(--font-mono), monospace;
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: rgba(212, 206, 199, 0.4);
          transition: color 180ms ease;
        }

        .hero-stat-value {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-sans), sans-serif;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.3;
          color: rgba(212, 206, 199, 0.86);
          transition: color 180ms ease;
        }

        .hero-stat-link:hover .hero-stat-label,
        .hero-stat-link:hover .hero-stat-value {
          color: #fa5f34;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 980px) {
          .hero-main {
            grid-template-columns: 1fr;
            align-items: start;
            gap: clamp(2rem, 5vh, 3rem);
            padding-block: clamp(2.5rem, 6vh, 4rem);
          }

          .hero-name {
            font-size: clamp(4.5rem, 15vw, 10rem);
          }

          .hero-name-accent {
            align-self: flex-start;
          }

          .hero-intro {
            max-width: 560px;
            padding-bottom: 0;
          }
        }

        @media (max-width: 760px) {
          .hero-rail {
            gap: 1rem;
            font-size: 9px;
          }

          .hero-foot {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .hero-stat-link {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding-block: 11px;
          }

          .hero-stat-link + .hero-stat-link {
            border-top: 1px solid rgba(212, 206, 199, 0.1);
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            padding-block: 1.25rem;
          }

          .hero-name {
            font-size: clamp(3.6rem, 18vw, 5.5rem);
          }

          .hero-lede {
            font-size: 0.95rem;
          }

          .hero-actions {
            align-items: flex-start;
            flex-direction: column;
            gap: 8px;
          }

          .hero-actions .cta-primary {
            width: 100%;
          }

          .hero-actions .cta-text {
            min-height: 30px;
          }
        }
      `}</style>
    </section>
  )
}
