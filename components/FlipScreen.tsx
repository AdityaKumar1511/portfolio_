'use client'
import { useEffect, useState } from 'react'

export default function FlipScreen() {
  const [show, setShow] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Start fade-out after 1.0s, then unmount at 1.4s
    const fadeTimer = setTimeout(() => setFadeOut(true), 1000)
    const hideTimer = setTimeout(() => setShow(false), 1400)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!show) return null

  return (
    <>
      <div className={`flip-overlay ${fadeOut ? 'fade-out' : ''}`}>
        {/* Rotating phone SVG */}
        <div className="flip-icon-wrapper">
          <svg
            className="flip-icon"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Phone body */}
            <rect
              x="30" y="12" width="40" height="72"
              rx="6" ry="6"
              stroke="rgba(250,250,250,0.85)"
              strokeWidth="2.5"
              fill="none"
            />
            {/* Screen */}
            <rect
              x="34" y="20" width="32" height="52"
              rx="2" ry="2"
              fill="rgba(250,250,250,0.08)"
            />
            {/* Home button dot */}
            <circle cx="50" cy="79" r="2.5" fill="rgba(250,250,250,0.4)" />
            {/* Rotation arrow */}
            <path
              d="M78 50 C78 32, 68 22, 50 18"
              stroke="#e07a5f"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M54 13 L50 18 L55 21"
              stroke="#e07a5f"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M22 50 C22 68, 32 78, 50 82"
              stroke="#e07a5f"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M46 87 L50 82 L45 79"
              stroke="#e07a5f"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        <p className="flip-text">Rotate your device</p>
        <span className="flip-subtext">Best viewed in landscape</span>
      </div>

      <style>{`
        .flip-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: none;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          background: rgba(10, 10, 10, 0.92);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          opacity: 1;
          transition: opacity 0.4s ease;
        }

        .flip-overlay.fade-out {
          opacity: 0;
          pointer-events: none;
        }

        /* Only show on mobile */
        @media (max-width: 1024px) {
          .flip-overlay {
            display: flex;
          }
        }

        .flip-icon-wrapper {
          animation: flipRock 1.4s ease-in-out infinite;
        }

        .flip-icon {
          width: 80px;
          height: 80px;
        }

        @keyframes flipRock {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-25deg); }
          75% { transform: rotate(25deg); }
        }

        .flip-text {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: 18px;
          font-weight: 500;
          color: rgba(250, 250, 250, 0.9);
          letter-spacing: -0.01em;
          margin: 0;
        }

        .flip-subtext {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--text-muted);
        }
      `}</style>
    </>
  )
}
