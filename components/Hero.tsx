'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import {
  Code,
  FileText,
  Mail,
  ArrowUpRight,
  Sparkles,
  Terminal
} from 'lucide-react'
import meta from '@/data/meta.json'
import StackPlayground from '@/components/StackPlayground'
import KineticMarquee from '@/components/KineticMarquee'
import { useSolvedCounts } from '@/lib/cpStats'

gsap.registerPlugin(useGSAP)

function GithubIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function CodeforcesIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.424 5.424 0 0 0 .349.987 5.317 5.317 0 0 0 1.163 1.612 6.174 6.174 0 0 0 1.484 1.016 5.602 5.602 0 0 0 1.466.506l.205.046a5.294 5.294 0 0 0 2.106-.054l.188-.044a3.93 3.93 0 0 0 1.113-.454l2.836-1.676a1.368 1.368 0 0 0-.213-2.406 1.363 1.363 0 0 0-.964-.048l-2.836 1.676a1.24 1.24 0 0 1-.358.133 2.458 2.458 0 0 1-1.14-.044l-.185-.042a2.874 2.874 0 0 1-.756-.264 3.335 3.335 0 0 1-.795-.544 2.6 2.6 0 0 1-.564-.782 2.698 2.698 0 0 1-.174-.494 2.755 2.755 0 0 1-.03-1.179 2.6 2.6 0 0 1 .59-1.04l3.854-4.126 5.406-5.788a.26.26 0 0 1 .38.012l2.72 2.913a.26.26 0 0 1-.013.38l-5.406 5.789a1.368 1.368 0 0 0 .998 2.314 1.363 1.363 0 0 0 1.003-.43l5.406-5.789a2.987 2.987 0 0 0 .089-4.182l-2.72-2.913A2.987 2.987 0 0 0 13.483 0z" />
      <path d="M3.483 14.196a1.368 1.368 0 0 0-.194 1.926l2.72 3.462a2.987 2.987 0 0 0 4.183.361l6.676-5.25a1.374 1.374 0 1 0-1.7-2.158l-6.676 5.25a.26.26 0 0 1-.362-.031l-2.72-3.462a1.368 1.368 0 0 0-1.927-.098z" />
    </svg>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const solvedCounts = useSolvedCounts()

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '.bento-poster',
        { opacity: 0, scale: 0.98, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          '.bento-card',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 },
          '-=0.4'
        )
        .fromTo(
          '.hero-cutout-img',
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'back.out(1.2)' },
          '-=0.5'
        )
    },
    { scope: containerRef }
  )

  return (
    <section id="hero" className="hero-bento-section" ref={containerRef}>
      {/* ── MAIN BENTO POSTER CANVAS ── */}
      <div className="bento-poster">
        <div className="bento-grid-container">
          {/* ══════════════════════════════════════════════
              LEFT COLUMN: Title, Philosophy, Identity
          ══════════════════════════════════════════════ */}
          <div className="bento-col bento-col-left">
            {/* Card L1: Big Stylized Title */}
            <div className="bento-card card-dark card-l1">
              <div className="card-pill-tag">
                <span className="dot-pulse" />
                <span>ENGINEER // BUILDER</span>
              </div>
              <h1 className="title-artistic">
                ADITYA <br />
                <span className="text-[#fa5f34]">KUMAR</span>
              </h1>
              <p className="card-sub-tag">
                FULL-STACK &amp; ML ENTHUSIAST · NITP &apos;29
              </p>
            </div>

            {/* Card L2: Architectural Quote */}
            <div className="bento-card card-dark card-l2">
              <span className="quote-label">CORE PHILOSOPHY //</span>
              <blockquote className="quote-text">
                &ldquo;PRODUCTION-GRADE SYSTEMS AT THE INTERSECTION OF METICULOUS ENGINEERING AND PURPOSEFUL DESIGN. BUILDING FOR RELIABILITY, ZERO CRUFT, AND SUB-SECOND VELOCITY.&rdquo;
              </blockquote>
              <div className="quote-author-row">
                <span className="quote-author">ADITYA KUMAR</span>
                <span className="quote-dash">—</span>
                <span className="quote-loc">PATNA, IN</span>
              </div>
            </div>

            {/* Card L3: Stacked Identity Pills */}
            <div className="bento-card-stack">
              {/* GitHub Identity Card */}
              <a
                href={meta.github}
                target="_blank"
                rel="noreferrer"
                className="action-pill-card action-pill-github group"
              >
                <div className="action-pill-left">
                  <div className="action-pill-icon-box action-pill-icon-dark">
                    <GithubIcon size={16} className="text-[#f3eee8]" />
                  </div>
                  <div className="action-pill-text">
                    <span className="action-pill-title text-[#f3eee8]">
                      @{meta.githubUsername}
                    </span>
                    <span className="action-pill-subtitle">
                      40+ Open Source Repos
                    </span>
                  </div>
                </div>
                <div className="action-pill-arrow action-pill-arrow-dark group-hover:border-[#fa5f34] group-hover:text-[#fa5f34]">
                  <ArrowUpRight size={15} />
                </div>
              </a>

              {/* Status / Opportunity Card (Vibrant Burnt Orange) */}
              <a
                href="#contact"
                className="action-pill-card action-pill-orange group"
              >
                <div className="action-pill-left">
                  <div className="action-pill-icon-box action-pill-icon-orange">
                    <Sparkles size={16} className="text-black" />
                  </div>
                  <div className="action-pill-text">
                    <span className="action-pill-title text-black">
                      OPEN FOR INTERNSHIPS
                    </span>
                    <span className="action-pill-subtitle text-black/80">
                      Available now
                    </span>
                  </div>
                </div>
                <div className="action-pill-arrow action-pill-arrow-orange group-hover:bg-black group-hover:text-white">
                  <ArrowUpRight size={15} />
                </div>
              </a>
            </div>
          </div>

          {/* ══════════════════════════════════════════════
              CENTER COLUMN: Stack Playground, Main Showcase, Cutout
          ══════════════════════════════════════════════ */}
          <div className="bento-col bento-col-center">
            {/* Card C1: Physics Tech-Stack Playground */}
            <StackPlayground />

            {/* Card C2: The Vibrant Centerpiece Card (Orange Accent) */}
            <div className="bento-card card-orange-showcase">
              {/* Top Navigation Strip */}
              <div className="showcase-nav-row">
                <a href="#projects" className="nav-chip">PROJECTS</a>
                <a href="#about" className="nav-chip">ABOUT</a>
                <a href="#experience" className="nav-chip">WORK</a>
                <a href="#github" className="nav-chip">CODE</a>
                <a href="#contact" className="nav-chip">CONTACT</a>
              </div>

              {/* Bold Title & Sub-heading */}
              <div className="showcase-title-block">
                <h2 className="showcase-heading">AND THIS IS ME</h2>
                <span className="showcase-caption">FULL-STACK · ML · SYSTEMS</span>
              </div>

              {/* Mini Project Previews */}
              <div className="showcase-cards-row">
                {/* Mini Preview 1: Arbitrage */}
                <a href="#projects" className="mini-preview-card group">
                  <div className="mini-preview-img-wrap">
                    <Image
                      src="/projects/arb.webp"
                      alt="Arbitrage Crypto Intel"
                      width={180}
                      height={110}
                      unoptimized
                      className="mini-preview-img group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="mini-preview-meta">
                    <span className="mini-preview-name">ARBITRAGE</span>
                    <span className="mini-preview-tag">CRYPTO INTEL ↗</span>
                  </div>
                </a>

                {/* Mini Preview 2: NexusForce */}
                <a href="#projects" className="mini-preview-card group">
                  <div className="mini-preview-img-wrap">
                    <Image
                      src="/projects/nex.webp"
                      alt="NexusForce Escrow"
                      width={180}
                      height={110}
                      unoptimized
                      className="mini-preview-img group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="mini-preview-meta">
                    <span className="mini-preview-name">NEXUSFORCE</span>
                    <span className="mini-preview-tag">WEB3 ESCROW ↗</span>
                  </div>
                </a>
              </div>

              {/* Bottom Interactive Command Bar */}
              <div className="showcase-command-bar">
                <Terminal size={12} className="text-black/70 flex-shrink-0" />
                <span className="font-mono text-[9px] uppercase tracking-wider text-black font-semibold truncate">
                  $ scroll --down to explore portfolio dossiers
                </span>
                <span className="command-caret" />
              </div>

              {/* ── THE PERSON CUTOUT OVERLAY ── */}
              <div className="hero-cutout-container" aria-hidden="true">
                <Image
                  src="/profile.png"
                  alt="Aditya Kumar"
                  width={420}
                  height={560}
                  priority
                  unoptimized
                  className="hero-cutout-img"
                />
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════
              RIGHT COLUMN: Kinetic Typography, 5 Controls, Motto
          ══════════════════════════════════════════════ */}
          <div className="bento-col bento-col-right">
            {/* Card R1: Orange Kinetic-Typography Card */}
            <KineticMarquee />

            {/* Card R2: 5-Tile Action Controls */}
            <div className="control-grid-2x2">
              {/* Button 1: LeetCode */}
              <a
                href={`https://leetcode.com/u/${meta.leetcodeUsername}/`}
                target="_blank"
                rel="noreferrer"
                className="control-box group"
                title="LeetCode Profile"
              >
                <Code size={18} className="control-icon-orange group-hover:scale-110 transition-transform" />
                <span className="control-label">LEETCODE</span>
                <span className="control-sub">{solvedCounts.leetcode}+ Solved</span>
              </a>

              {/* Button 2: GitHub */}
              <a
                href={meta.github}
                target="_blank"
                rel="noreferrer"
                className="control-box group"
                title="GitHub Repositories"
              >
                <GithubIcon size={18} className="control-icon-grey group-hover:scale-110 transition-transform" />
                <span className="control-label">GITHUB</span>
                <span className="control-sub">40+ Repos</span>
              </a>

              {/* Button 3: Resume PDF */}
              <a
                href={meta.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="control-box group"
                title="Download Resume"
              >
                <FileText size={18} className="control-icon-orange group-hover:scale-110 transition-transform" />
                <span className="control-label">RESUME</span>
                <span className="control-sub">PDF ↗</span>
              </a>

              {/* Button 4: Codeforces */}
              <a
                href={`https://codeforces.com/profile/${meta.codeforcesUsername}`}
                target="_blank"
                rel="noreferrer"
                className="control-box group"
                title="Codeforces Profile"
              >
                <CodeforcesIcon size={18} className="control-icon-orange group-hover:scale-110 transition-transform" />
                <span className="control-label">CODEFORCES</span>
                <span className="control-sub">Pupil</span>
              </a>

              {/* Button 5: Contact Mail (full width) */}
              <a
                href="#contact"
                className="control-box control-span group"
                title="Contact Aditya"
              >
                <span className="control-span-left">
                  <Mail size={18} className="control-icon-grey group-hover:scale-110 transition-transform" />
                  <span className="control-label">CONNECT</span>
                </span>
                <span className="control-sub">&lt;24h reply</span>
              </a>
            </div>

            {/* Card R3: Large Stylized Architectural Motto */}
            <div className="bento-card card-dark card-r3">
              <span className="motto-chip">STATEMENT //</span>
              <h4 className="motto-text">
                SHIP FAST. <br />
                BUILD DEEP. <br />
                SCALE HIGH.
              </h4>
              <p className="motto-caption">
                WHERE ROBUST LOGIC MEETS AESTHETIC INTEGRITY.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ── SECTION ROOT & GLOBAL LINK NORMALIZATION ── */
        .hero-bento-section {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(2rem, 4vw, 3.5rem) var(--pad-x);
          box-sizing: border-box;
          overflow: hidden;
        }

        /* Prevent any default browser blue or underlines across all hero links */
        .hero-bento-section a,
        .hero-bento-section a:visited,
        .hero-bento-section a:hover,
        .hero-bento-section a:active {
          text-decoration: none !important;
          color: inherit;
        }

        /* ── GRID CANVAS (cards sit directly on page background) ── */
        .bento-poster {
          position: relative;
          width: 100%;
          max-width: 1480px;
          box-sizing: border-box;
        }

        /* ── 3-COLUMN BENTO GRID ── */
        .bento-grid-container {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 28fr 44fr 28fr;
          gap: clamp(12px, 1.5vw, 18px);
          align-items: stretch;
          width: 100%;
        }

        .bento-col {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.5vw, 18px);
          min-width: 0;
        }

        /* ── GENERIC BENTO CARD STYLES ── */
        .bento-card {
          position: relative;
          border-radius: clamp(16px, 2vw, 24px);
          padding: clamp(1.1rem, 1.6vw, 1.5rem);
          box-sizing: border-box;
          overflow: hidden;
        }

        .card-dark {
          background: #16171c;
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }

        /* ── LEFT COLUMN CARDS ── */
        .card-l1 {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 180px;
        }

        .card-pill-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-geist-mono), monospace;
          font-size: 9.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(212, 206, 199, 0.65);
          text-decoration: none !important;
          border-bottom: none !important;
        }

        .dot-pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #fa5f34;
          animation: pulse-dot 2s infinite;
        }

        .title-artistic {
          font-family: 'Impact', 'Arial Black', 'Haettenschweiler', 'Franklin Gothic Bold', sans-serif;
          font-size: clamp(2.4rem, 4.2vw, 4rem);
          font-weight: 900;
          text-transform: uppercase;
          line-height: 0.9;
          letter-spacing: -0.02em;
          color: #f3eee8;
          margin: 0.75rem 0;
          text-decoration: none !important;
        }

        .card-sub-tag {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          color: rgba(212, 206, 199, 0.6);
          letter-spacing: 0.08em;
          margin: 0;
          text-decoration: none !important;
        }

        .card-l2 {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 12px;
          flex: 1;
        }

        .quote-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 9.5px;
          font-weight: 700;
          color: #fa5f34;
          letter-spacing: 0.12em;
          text-decoration: none !important;
          border-bottom: none !important;
        }

        .quote-text {
          font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
          font-style: italic;
          font-size: clamp(13px, 1.1vw, 15px);
          line-height: 1.7;
          letter-spacing: 0.02em;
          color: rgba(212, 206, 199, 0.88);
          margin: 0;
          text-decoration: none !important;
        }

        .quote-author-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          color: rgba(212, 206, 199, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          text-decoration: none !important;
        }

        /* ── GITHUB & INTERNSHIP ACTION PILLS ── */
        .bento-card-stack {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .action-pill-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-radius: 16px;
          text-decoration: none !important;
          transition: all 180ms ease;
          box-sizing: border-box;
          min-height: 58px;
        }

        .action-pill-left {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .action-pill-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .action-pill-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .action-pill-title {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11.5px;
          font-weight: 800;
          letter-spacing: 0.05em;
          line-height: 1.2;
          white-space: nowrap;
          text-decoration: none !important;
        }

        .action-pill-subtitle {
          font-family: var(--font-geist-mono), monospace;
          font-size: 9.5px;
          font-weight: 500;
          line-height: 1.2;
          white-space: nowrap;
          color: #a8a29e !important;
          text-decoration: none !important;
        }

        .action-pill-arrow {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 180ms ease;
        }

        /* GitHub card styles */
        .action-pill-github {
          background: #18191e;
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #f3eee8 !important;
        }

        .action-pill-github:hover {
          border-color: rgba(250, 95, 52, 0.5);
          background: #1d1e24;
          transform: translateY(-2px);
        }

        .action-pill-icon-dark {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .action-pill-arrow-dark {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #d4cec7 !important;
        }

        /* Orange Internship Card styles */
        .action-pill-orange {
          background: linear-gradient(135deg, #fa5f34 0%, #f75225 100%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #000000 !important;
        }

        .action-pill-orange:hover {
          background: #ff6e47;
          transform: translateY(-2px);
        }

        .action-pill-icon-orange {
          background: rgba(0, 0, 0, 0.15);
        }

        .action-pill-orange .action-pill-subtitle {
          color: rgba(0, 0, 0, 0.8) !important;
        }

        .action-pill-arrow-orange {
          background: rgba(0, 0, 0, 0.15);
          color: #000000 !important;
        }

        /* ── CENTER COLUMN CARDS ── */
        /* The Vibrant Orange Centerpiece Card */
        .card-orange-showcase {
          position: relative;
          background: linear-gradient(145deg, #fa5f34 0%, #e84d22 100%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #0a0a0a;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 380px;
          flex: 1;
          overflow: visible;
        }

        .showcase-nav-row {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .nav-chip {
          font-family: var(--font-geist-mono), monospace;
          font-size: 9.5px;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #0a0a0a !important;
          background: rgba(255, 255, 255, 0.25);
          padding: 4px 10px;
          border-radius: 9999px;
          text-decoration: none !important;
          transition: background 150ms ease, transform 150ms ease;
        }

        .nav-chip:hover {
          background: #ffffff;
          transform: translateY(-1px);
        }

        .showcase-title-block {
          position: relative;
          z-index: 5;
          margin-top: 1rem;
          max-width: 55%;
        }

        .showcase-heading {
          font-family: 'Impact', 'Arial Black', 'Haettenschweiler', sans-serif;
          font-size: clamp(2rem, 3.8vw, 3.5rem);
          font-weight: 900;
          text-transform: uppercase;
          line-height: 0.9;
          letter-spacing: -0.01em;
          color: #0a0a0a;
          margin: 0;
          text-decoration: none !important;
        }

        .showcase-caption {
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: rgba(10, 10, 10, 0.7);
          margin-top: 4px;
          display: block;
        }

        /* Mini Project Preview Cards */
        .showcase-cards-row {
          position: relative;
          z-index: 5;
          display: flex;
          gap: 10px;
          margin: 1.25rem 0;
          max-width: 60%;
        }

        .mini-preview-card {
          flex: 1;
          background: rgba(10, 10, 12, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          padding: 6px;
          text-decoration: none !important;
          display: flex;
          flex-direction: column;
          gap: 6px;
          backdrop-filter: blur(8px);
          transition: transform 180ms ease, border-color 180ms ease;
        }

        .mini-preview-card:hover {
          transform: translateY(-3px);
          border-color: #ffffff;
        }

        .mini-preview-img-wrap {
          width: 100%;
          aspect-ratio: 16/10;
          border-radius: 8px;
          overflow: hidden;
          background: #000;
        }

        .mini-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .mini-preview-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2px;
        }

        .mini-preview-name {
          font-family: var(--font-geist-mono), monospace;
          font-size: 8px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.05em;
        }

        .mini-preview-tag {
          font-family: var(--font-geist-mono), monospace;
          font-size: 7px;
          color: #fa5f34;
          font-weight: 700;
        }

        /* Command Bar */
        .showcase-command-bar {
          position: relative;
          z-index: 5;
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 9999px;
          padding: 6px 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          max-width: 80%;
          backdrop-filter: blur(10px);
        }

        .command-caret {
          width: 6px;
          height: 11px;
          background: #0a0a0a;
          display: inline-block;
          animation: caretBlink 1s infinite;
        }

        /* ── HERO CUTOUT IMAGE ── */
        .hero-cutout-container {
          position: absolute;
          right: -25px;
          bottom: 0;
          top: -30px;
          width: 62%;
          pointer-events: none;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          overflow: visible;
        }

        .hero-cutout-img {
          height: 118%;
          max-height: 520px;
          width: auto;
          object-fit: contain;
          object-position: bottom right;
          filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.75)) grayscale(15%);
          transform-origin: bottom center;
        }

        /* ── RIGHT COLUMN CARDS ── */
        .card-telemetry {
          background: linear-gradient(135deg, #fa5f34 0%, #eb552a 100%);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #0a0a0a;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* 2x2 Squircle Action Controls */
        .control-grid-2x2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .control-box {
          background: #16171c;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 12px 14px;
          text-decoration: none !important;
          color: #f3eee8 !important;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 82px;
          transition: all 180ms ease;
        }

        .control-box:hover {
          transform: translateY(-3px);
          border-color: rgba(250, 95, 52, 0.5);
          background: #1c1d24;
        }

        .control-icon-orange {
          color: #fa5f34 !important;
        }

        .control-icon-grey {
          color: #d4cec7 !important;
        }

        .control-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          font-weight: 800;
          color: #f3eee8 !important;
          letter-spacing: 0.08em;
          margin-top: 6px;
          text-decoration: none !important;
        }

        .control-sub {
          font-family: var(--font-geist-mono), monospace;
          font-size: 8.5px;
          color: #a8a29e !important;
          text-decoration: none !important;
        }

        .control-box.control-span {
          grid-column: 1 / -1;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          min-height: 64px;
        }

        .control-span-left {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .control-box.control-span .control-label {
          margin-top: 0;
        }

        /* Card R3: Motto */
        .card-r3 {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          min-height: 140px;
        }

        .motto-chip {
          font-family: var(--font-geist-mono), monospace;
          font-size: 8.5px;
          font-weight: 800;
          color: #fa5f34;
          letter-spacing: 0.15em;
          text-decoration: none !important;
          border-bottom: none !important;
        }

        .motto-text {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: clamp(1.4rem, 2.2vw, 2.1rem);
          line-height: 1;
          text-transform: uppercase;
          color: #f3eee8;
          margin: 6px 0;
          letter-spacing: -0.01em;
          text-decoration: none !important;
        }

        .motto-caption {
          font-family: var(--font-geist-mono), monospace;
          font-size: 8px;
          color: rgba(212, 206, 199, 0.45);
          letter-spacing: 0.08em;
          margin: 0;
        }

        /* ── RESPONSIVE BREAKPOINTS ── */
        @media (max-width: 1100px) {
          .bento-grid-container {
            grid-template-columns: 1fr 1fr;
          }

          .bento-col-left {
            grid-column: 1 / 2;
          }

          .bento-col-right {
            grid-column: 2 / 3;
          }

          .bento-col-center {
            grid-column: 1 / -1;
            order: -1;
          }

          .hero-cutout-container {
            width: 45%;
            right: 0;
          }
        }

        @media (max-width: 768px) {
          .hero-bento-section {
            padding: 1.5rem 1rem;
          }

          .bento-grid-container {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .bento-col-center {
            grid-column: auto;
          }

          .bento-col-left {
            grid-column: auto;
          }

          .bento-col-right {
            grid-column: auto;
          }

          .card-orange-showcase {
            min-height: 440px;
          }

          .showcase-title-block,
          .showcase-cards-row,
          .showcase-command-bar {
            max-width: 100%;
          }

          .hero-cutout-container {
            width: 55%;
            top: auto;
            bottom: -10px;
            right: -10px;
            opacity: 0.9;
          }

          .hero-cutout-img {
            max-height: 320px;
          }

          .title-artistic {
            font-size: 2.75rem;
          }
        }
      `}</style>
    </section>
  )
}
