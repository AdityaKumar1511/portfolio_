'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function About() {
  const [imgErr, setImgErr] = useState(false)

  const bioText = "Full-stack engineer shipping fast, resilient systems — from the data layer to the last pixel. Correctness, performance, and code that stays a pleasure to maintain."

  return (
    <section id="about" className="about-section-outer">
      <div className="about-card-container">
        {/* Header inside rust card */}
        <div className="about-card-header">
          <span className="card-brand">Aditya Kumar</span>
          <span className="card-label">About Me</span>
          <span className="card-serial">Developer — 01</span>
        </div>

        {/* 3-column layout */}
        <div className="about-card-grid">
          
          {/* Left Column: Heading + Bio + GitHub Button + Trusted Badge */}
          <div className="about-col-left">
            <h2 className="about-card-heading">
              Where Code<br />Meets Craft
            </h2>
            <p className="about-card-bio">
              {bioText}
            </p>
            
            <a href="https://github.com/AdityaKumar1511" target="_blank" rel="noreferrer" className="github-pill-btn">
              View GitHub →
            </a>

            {/* Translucent Trusted Pill */}
            <div className="trusted-badge-pill">
              <div className="avatar-overlap">
                <span className="avatar-circle" style={{ background: '#f6c5af', zIndex: 4 }} />
                <span className="avatar-circle" style={{ background: '#aed8e6', zIndex: 3, marginLeft: '-8px' }} />
                <span className="avatar-circle" style={{ background: '#bfe3d1', zIndex: 2, marginLeft: '-8px' }} />
                <span className="avatar-circle" style={{ background: '#f5dfb8', zIndex: 1, marginLeft: '-8px' }} />
              </div>
              <div className="trusted-details">
                <span className="trusted-stars">★★★★★</span>
                <span className="trusted-txt">Trusted by teams</span>
              </div>
            </div>
          </div>

          {/* Center Column: Cutout / Profile Image Frame */}
          <div className="about-col-center">
            <div className="profile-image-wrapper">
              {!imgErr ? (
                <Image
                  src="/profile.jpg"
                  alt="Aditya Kumar"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  style={{ objectFit: 'cover' }}
                  onError={() => setImgErr(true)}
                />
              ) : (
                <div className="profile-fallback">
                  <span className="fallback-initials">AK</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Values badges + Featured Project Card */}
          <div className="about-col-right">
            {/* Value Indicators */}
            <div className="value-indicators">
              <div className="val-indicator">
                <span className="val-icon">&lt;&gt;</span>
                <span className="val-label">Clean Code</span>
              </div>
              <div className="val-indicator">
                <span className="val-icon">⚡</span>
                <span className="val-label">Fast Systems</span>
              </div>
              <div className="val-indicator">
                <span className="val-icon">🛡️</span>
                <span className="val-label">Type Safe</span>
              </div>
            </div>

            {/* Featured Project Card (White Background) */}
            <div className="featured-card">
              <div className="featured-card-box">
                {/* Simulated Project UI Frame */}
                <div className="simulated-ui">
                  <div className="ui-dot-row">
                    <span className="ui-dot" />
                    <span className="ui-dot" />
                    <span className="ui-dot" />
                  </div>
                  <div className="ui-body-line" style={{ width: '60%' }} />
                  <div className="ui-body-line" style={{ width: '80%', opacity: 0.5 }} />
                </div>
              </div>
              <div className="featured-card-content">
                <span className="feat-card-label">Featured Project</span>
                <h4 className="feat-card-title">Arbitrage</h4>
                <p className="feat-card-desc">
                  Live crypto tracker with automated scan alerts.
                </p>
                <a href="https://github.com/AdityaKumar1511/arbitrage" target="_blank" rel="noreferrer" className="feat-card-btn">
                  View ↗
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .about-section-outer {
          padding: 24px;
          background: #0a0a0a;
          width: 100%;
          box-sizing: border-box;
        }

        .about-card-container {
          background: #ba5c43; /* Terracotta/Rust red-orange */
          border-radius: 40px;
          padding: clamp(2rem, 5vw, 4.5rem);
          color: #ffffff;
          max-width: 1352px;
          margin: 0 auto;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
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
          color: #aed8e6; /* Light cyan brand accent */
        }

        .card-serial {
          color: #aed8e6;
        }

        .about-card-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr 1fr;
          gap: 3.5rem;
          align-items: start;
        }

        /* Left Column */
        .about-col-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
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
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 2.5rem 0;
          max-width: 360px;
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
          margin-bottom: 3rem;
        }

        .github-pill-btn:hover {
          background: transparent;
          border-color: #ffffff;
          color: #ffffff;
        }

        .trusted-badge-pill {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 10px 16px;
          border-radius: 16px;
        }

        .avatar-overlap {
          display: flex;
          align-items: center;
        }

        .avatar-circle {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1.5px solid #ba5c43;
          display: inline-block;
        }

        .trusted-details {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .trusted-stars {
          color: #f5dfb8;
          font-size: 12px;
        }

        .trusted-txt {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.8);
        }

        /* Center Column: Portrait Image Frame */
        .about-col-center {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }

        .profile-image-wrapper {
          position: relative;
          width: 100%;
          max-width: 320px;
          aspect-ratio: 0.78; /* Editorial aspect ratio */
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

        /* Right Column */
        .about-col-right {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .value-indicators {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 0 4px;
        }

        .val-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .val-icon {
          font-size: 18px;
        }

        .val-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.8);
        }

        /* Featured Card */
        .featured-card {
          background: #ffffff;
          border-radius: 28px;
          padding: 20px;
          color: #0a0a0a;
          box-shadow: 0 15px 30px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .featured-card-box {
          background: #121212;
          border-radius: 18px;
          aspect-ratio: 1.6;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          border: 1px solid #222222;
        }

        .simulated-ui {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: #1a1a1a;
          border-radius: 10px;
          padding: 12px;
          box-sizing: border-box;
        }

        .ui-dot-row {
          display: flex;
          gap: 4px;
        }

        .ui-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: inline-block;
        }

        .ui-body-line {
          height: 6px;
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
        }

        .featured-card-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0 4px;
        }

        .feat-card-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #ba5c43; /* Terracotta text color */
          font-weight: 600;
          margin-bottom: 6px;
        }

        .feat-card-title {
          font-size: 22px;
          font-weight: 600;
          margin: 0 0 6px 0;
          color: #0a0a0a;
        }

        .feat-card-desc {
          font-size: 13px;
          line-height: 1.4;
          color: #666666;
          margin: 0 0 16px 0;
        }

        .feat-card-btn {
          background: #ba5c43;
          color: #ffffff;
          font-size: 12px;
          font-weight: 500;
          padding: 10px 22px;
          border-radius: 999px;
          text-decoration: none;
          display: inline-block;
          transition: background 200ms;
        }

        .feat-card-btn:hover {
          background: #a34e37;
        }

        @media (max-width: 1024px) {
          .about-card-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          
          .about-col-center {
            order: -1; /* Place picture at the top for tablets/mobiles */
          }
        }
      `}</style>
    </section>
  )
}
