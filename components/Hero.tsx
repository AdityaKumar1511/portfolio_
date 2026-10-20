'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import meta from '@/data/meta.json'
import { ArrowUpRight, ArrowRight } from './ArrowIcon'
import { useSolvedCounts } from '@/lib/cpStats'

gsap.registerPlugin(useGSAP)

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const solvedCounts = useSolvedCounts()

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
          { opacity: 0, y: 42 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 },
          '-=0.25'
        )
        .fromTo(
          '.hero-intro > *',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
          '-=0.55'
        )
        .fromTo(
          '.hero-foot > *',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 },
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
          <span>Full-stack &amp; ML</span>
          <span>2026</span>
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
              <a href="#projects" className="hero-cta">
                VIEW PROJECTS <ArrowUpRight size={13} />
              </a>
              <a
                href={meta.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="hero-cta-secondary"
              >
                RESUME <ArrowUpRight size={12} />
              </a>
              <a href="#contact" className="hero-text-link">
                CONTACT <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>

        <div className="hero-foot">
          <div className="hero-fact">
            <span className="hero-fact-label">Focus</span>
            <span className="hero-fact-value">Full-stack / Applied ML</span>
          </div>
          <div className="hero-fact">
            <span className="hero-fact-label">Education</span>
            <span className="hero-fact-value">NIT Patna · CSE ’29</span>
          </div>
          <div className="hero-fact">
            <span className="hero-fact-label">LeetCode</span>
            <span className="hero-fact-value">{solvedCounts.leetcode}+ solved</span>
          </div>
          <a
            href={meta.github}
            target="_blank"
            rel="noreferrer"
            className="hero-foot-link"
          >
            GitHub <ArrowUpRight size={11} />
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
          gap: 14px 18px;
          padding-top: 0.25rem;
        }

        .hero-cta,
        .hero-cta-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          text-decoration: none;
          white-space: nowrap;
          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            background 180ms ease,
            border-color 180ms ease,
            color 180ms ease;
        }

        .hero-cta {
          padding: 11px 18px;
          background: #fa5f34;
          color: #0a0a0a;
          border: 1px solid #fa5f34;
          border-radius: 2px;
          box-shadow: 4px 4px 0 #000;
        }

        .hero-cta:hover {
          background: #ff7049;
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 #000;
        }

        .hero-cta-secondary {
          padding: 10px 16px;
          background: transparent;
          color: #d4cec7;
          border: 1px solid rgba(212, 206, 199, 0.32);
          border-radius: 2px;
        }

        .hero-cta-secondary:hover {
          color: #fa5f34;
          border-color: #fa5f34;
          transform: translate(-1px, -1px);
        }

        .hero-text-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(212, 206, 199, 0.68);
          text-decoration: none;
          border-bottom: 1px solid rgba(212, 206, 199, 0.24);
          padding-bottom: 3px;
          transition: color 180ms ease, border-color 180ms ease;
        }

        .hero-text-link:hover {
          color: #fa5f34;
          border-color: #fa5f34;
        }

        /* ── BOTTOM FACT RAIL ── */
        .hero-foot {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr)) auto;
          align-items: end;
          gap: clamp(1.25rem, 3vw, 3rem);
          padding-top: 18px;
          border-top: 1px solid var(--rule);
        }

        .hero-fact {
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 0;
        }

        .hero-fact-label {
          font-family: var(--font-mono), monospace;
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: rgba(212, 206, 199, 0.4);
        }

        .hero-fact-value {
          font-family: var(--font-sans), sans-serif;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.3;
          color: rgba(212, 206, 199, 0.86);
        }

        .hero-foot-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #d4cec7;
          text-decoration: none;
          white-space: nowrap;
          transition: color 180ms ease;
        }

        .hero-foot-link:hover {
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
          .hero-rail span:nth-child(2) {
            display: none;
          }

          .hero-foot {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 16px 20px;
          }

          .hero-foot .hero-fact:first-child {
            grid-column: 1 / -1;
          }

          .hero-foot-link {
            grid-column: 1 / -1;
            padding-top: 2px;
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
            gap: 12px;
          }

          .hero-cta,
          .hero-cta-secondary {
            width: 100%;
          }

          .hero-text-link {
            align-self: flex-start;
          }
        }
      `}</style>
    </section>
  )
}
