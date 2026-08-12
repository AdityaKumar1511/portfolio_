'use client'
import { useState } from 'react'
import Image from 'next/image'
import meta from '@/data/meta.json'
import aboutData from '@/data/about.json'
import FadeIn from './FadeIn'

export default function About() {
  const [imgErr, setImgErr] = useState(false)

  const { name, github, resumeUrl, profileImage } = meta
  const { serial, heading, bio, fallbackInitials, githubBtnLabel, resumeBtnLabel } = aboutData

  return (
    <section id="about" className="about-section-outer">
      <FadeIn>
      <div className="about-card-container">
        {/* Header inside rust card */}
        <div className="about-card-header">
          <span className="card-brand">{name}</span>
          <span className="card-label">About Me</span>
          <span className="card-serial">{serial}</span>
        </div>

        {/* 2-column layout */}
        <div className="about-card-grid">
          
          {/* Left Column: Heading + Bio + Buttons */}
          <div className="about-col-left">
            <h2 className="about-card-heading" style={{ whiteSpace: 'pre-line' }}>
              {heading}
            </h2>
            <p className="about-card-bio" dangerouslySetInnerHTML={{ __html: bio }} />
            
            <div className="about-buttons-row">
              <a href={github} target="_blank" rel="noreferrer" className="github-pill-btn">
                {githubBtnLabel}
              </a>
              <a href={resumeUrl} target="_blank" rel="noreferrer" className="github-pill-btn">
                {resumeBtnLabel}
              </a>
            </div>
          </div>

          {/* Right Column: Profile Image Frame (stretched to fill card height) */}
          <div className="about-col-right">
            <div className="profile-image-wrapper">
              {!imgErr ? (
                <Image
                  src={profileImage}
                  alt={name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  style={{ objectFit: 'cover' }}
                  onError={() => setImgErr(true)}
                  priority
                />
              ) : (
                <div className="profile-fallback">
                  <span className="fallback-initials">{fallbackInitials}</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      </FadeIn>

      <div className="wave wave-bottom" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <defs>
            <pattern id="about-noise" width="128" height="128" patternUnits="userSpaceOnUse">
              <image href="/noise.png" x="0" y="0" width="128" height="128" preserveAspectRatio="xMidYMid slice" />
            </pattern>
            <clipPath id="about-wave-clip">
              <path d="M0,0 C180,40 340,80 520,60 C700,40 820,-10 1000,30 C1180,70 1320,40 1440,20 L1440,100 L0,100 Z" />
            </clipPath>
          </defs>
          <path d="M0,0 C180,40 340,80 520,60 C700,40 820,-10 1000,30 C1180,70 1320,40 1440,20 L1440,100 L0,100 Z" fill="#0a0a0a" />
          <g clipPath="url(#about-wave-clip)" opacity="0.05">
            <rect width="1440" height="100" fill="url(#about-noise)" />
          </g>
        </svg>
      </div>

      <style>{`
        .about-section-outer {
          padding: 24px 0;
          background: #ba5c43;
          width: 100%;
          box-sizing: border-box;
          position: relative;
        }

        .wave {
          position: absolute;
          left: 0;
          width: 100%;
          height: clamp(60px, 10vw, 110px);
          z-index: 0;
          pointer-events: none;
        }

        .wave svg {
          display: block;
          width: 100%;
          height: 100%;
        }

        .wave-bottom {
          bottom: 0;
        }

        .about-card-container {
          position: relative;
          z-index: 1;
        }

        @media (min-width: 1025px) {
          .about-section-outer {
            height: 100vh;
            max-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          .about-card-container {
            height: calc(100% - 48px);
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;
            padding: clamp(1.5rem, 3.5vh, 4.5rem) clamp(2rem, 5vw, 4.5rem) !important;
          }

          .about-card-header {
            margin-bottom: clamp(1rem, 2.5vh, 2.5rem) !important;
          }

          .about-card-grid {
            flex: 1;
            align-items: stretch !important;
          }
        }

        .about-card-container {
          padding: clamp(2rem, 5vw, 4.5rem);
          color: #ffffff;
        }

        .about-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255, 255, 255, 0.7);
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          padding-bottom: 1.5rem;
          margin-bottom: 3rem;
        }

        .card-brand {
          color: #0d0d0d;
        }

        .card-serial {
          color: #0d0d0d;
        }

        .about-card-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: clamp(2rem, 5vw, 4.5rem);
          align-items: stretch;
        }

        /* Left Column */
        .about-col-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }

        .about-card-heading {
          font-size: clamp(2rem, 4.5vw, 3.25rem);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 2rem 0;
        }

        .about-card-bio {
          font-size: clamp(14px, 1.8vw, 15px);
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 2.5rem 0;
          max-width: 540px;
        }

        .highlight {
          color: #0d0d0d; /* Charcoal brand accent highlight */
          font-weight: 600;
        }

        .about-buttons-row {
          display: flex;
          gap: 12px;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .github-pill-btn {
          background: #ffffff;
          color: #ba5c43;
          font-size: 13px;
          font-weight: 500;
          padding: 12px 28px;
          border-radius: 999px;
          text-decoration: none;
          display: inline-block;
          transition: all 250ms ease;
          border: 1px solid transparent;
        }

        .github-pill-btn:hover {
          background: transparent;
          border-color: #ffffff;
          color: #ffffff;
        }

        /* Right Column: Profile Image Frame */
        .about-col-right {
          display: flex;
          justify-content: center;
          align-items: stretch;
          height: 100%;
        }

        .profile-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 380px;
          border-radius: 24px;
          overflow: hidden;
          background: rgba(0,0,0,0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .profile-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.15);
        }

        .fallback-initials {
          font-family: var(--font-geist-mono), monospace;
          font-size: 4rem;
          color: #ffffff;
          font-weight: 300;
        }

        @media (max-width: 1024px) {
          .about-card-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
            align-items: start;
          }
          
          .about-col-right {
            order: -1;
            height: auto;
          }

          .profile-image-wrapper {
            aspect-ratio: 0.85;
            min-height: 280px;
          }
        }

        @media (max-width: 640px) {
          .wave {
            height: 48px;
          }

          .about-card-container {
            padding: clamp(1.5rem, 5vw, 2rem);
          }

          .about-card-header {
            flex-wrap: wrap;
            gap: 8px;
            padding-bottom: 1rem;
            margin-bottom: 2rem;
          }

          .profile-image-wrapper {
            min-height: 240px;
          }

          .about-buttons-row {
            flex-direction: column;
            width: 100%;
          }

          .github-pill-btn {
            width: 100%;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .about-section-outer {
            padding: 16px;
          }
        }
      `}</style>
    </section>
  )
}
