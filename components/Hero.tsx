'use client'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="hero" className="hero-section">
      {/* Ambient glow orbs */}
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />
      <div className="hero-glow hero-glow-3" />

      {/* Top Navbar details */}
      <div className="hero-top-nav">
        <span className="nav-item">Aditya Kumar</span>
        <div className="nav-center-container">
          <span className="nav-item-line" />
          <span className="nav-item">Full-Stack Engineer</span>
          <span className="nav-item-line" />
        </div>
        <div className="work-status-upper">
          <span className="status-dot" />
          <span className="nav-item">Open to work</span>
        </div>
      </div>

      {/* Main typography */}
      <div className="hero-center-content">
        <h1 className="hero-title">
          <span className="title-row fade-in-up" style={{ animationDelay: '0.1s' }}>Engineering</span>
          <span className="title-row fade-in-up" style={{ animationDelay: '0.25s' }}>systems that</span>
          <span className="title-row fade-in-up title-accent" style={{ animationDelay: '0.4s' }}>
            scale<span className="title-dot">.</span>
          </span>
        </h1>
        
        <p className="hero-subtitle fade-in" style={{ animationDelay: '0.7s' }}>
          Fast, resilient systems — from the data layer to the last pixel.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="hero-bottom-content fade-in" style={{ animationDelay: '0.9s' }}>
        <span className="scroll-label">Scroll Down</span>
        <div className="scroll-line-container">
          <div className="scroll-line" />
        </div>
      </div>

      {/* CSS Styles */}
      <style>{`
        .hero-section {
          height: 100svh;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
          background: #0a0a0a;
          color: #fafafa;
          position: relative;
          overflow: hidden;
        }

        /* Ambient glow orbs */
        .hero-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }

        .hero-glow-1 {
          width: 600px;
          height: 600px;
          top: -120px;
          right: -100px;
          background: radial-gradient(circle, rgba(224, 122, 95, 0.15) 0%, transparent 70%);
          filter: blur(80px);
          animation: glowPulse1 8s ease-in-out infinite alternate;
        }

        .hero-glow-2 {
          width: 500px;
          height: 500px;
          bottom: -60px;
          left: -80px;
          background: radial-gradient(circle, rgba(174, 216, 230, 0.1) 0%, transparent 70%);
          filter: blur(90px);
          animation: glowPulse2 10s ease-in-out infinite alternate;
        }

        .hero-glow-3 {
          width: 350px;
          height: 350px;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(224, 122, 95, 0.08) 0%, transparent 70%);
          filter: blur(60px);
          animation: glowPulse3 6s ease-in-out infinite alternate;
        }

        @keyframes glowPulse1 {
          0% { opacity: 0.6; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.15); }
        }

        @keyframes glowPulse2 {
          0% { opacity: 0.5; transform: scale(1); }
          100% { opacity: 0.9; transform: scale(1.1); }
        }

        @keyframes glowPulse3 {
          0% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.2); }
        }

        .hero-top-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding-top: 12px;
          z-index: 10;
        }

        .nav-center-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-item-line {
          width: 24px;
          height: 1px;
          background: var(--text-muted);
        }

        .nav-item {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
        }

        .hero-center-content {
          text-align: center;
          margin: auto 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          position: relative;
          z-index: 1;
        }

        .hero-title {
          font-size: clamp(3rem, 8.5vw, 7rem);
          font-weight: 500;
          line-height: 0.95;
          letter-spacing: -0.04em;
          color: var(--text);
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title-row {
          display: block;
        }

        .title-accent {
          color: #e07a5f; /* Rusty/terracotta orange */
          position: relative;
        }

        .title-dot {
          color: var(--text);
          margin-left: 2px;
        }

        .hero-subtitle {
          font-size: clamp(14px, 2vw, 17px);
          color: var(--text-secondary);
          max-width: 480px;
          line-height: 1.6;
          margin: 0;
          font-weight: 400;
        }

        .hero-bottom-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          gap: 8px;
          padding-bottom: 12px;
          z-index: 10;
        }

        .scroll-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: var(--text-muted);
        }

        .scroll-line-container {
          height: 48px;
          width: 1px;
          position: relative;
          overflow: hidden;
          margin: 4px 0;
        }

        .scroll-line {
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, transparent, var(--text-muted), transparent);
          animation: scrollDown 2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }

        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        .work-status-upper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #e07a5f;
          display: inline-block;
        }

        /* Animations */
        .fade-in-up {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .fade-in {
          opacity: 0;
          animation: fadeIn 0.8s ease forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .hero-top-nav {
            flex-direction: column;
            gap: 8px;
          }
          .nav-center-container {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
