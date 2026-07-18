'use client'

import React, { useState, useEffect } from 'react'

export default function MobileExperience({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isPortrait, setIsPortrait] = useState(false)
  const [gateMounted, setGateMounted] = useState(false)
  const [gateFadeOut, setGateFadeOut] = useState(false)
  const [showSwipeHint, setShowSwipeHint] = useState(false)

  useEffect(() => {
    setMounted(true)

    const checkDevice = () => {
      const mobileQuery = window.matchMedia('(max-width: 768px)')
      const portraitQuery = window.matchMedia('(orientation: portrait)')
      
      const mobile = mobileQuery.matches
      const portrait = portraitQuery.matches
      
      setIsMobile(mobile)
      setIsPortrait(portrait)
    }

    checkDevice()

    window.addEventListener('resize', checkDevice)
    window.addEventListener('orientationchange', checkDevice)

    return () => {
      window.removeEventListener('resize', checkDevice)
      window.removeEventListener('orientationchange', checkDevice)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    if (isMobile) {
      if (isPortrait) {
        setGateMounted(true)
        setGateFadeOut(false)
        setShowSwipeHint(false)
      } else {
        // Landscape mode
        setShowSwipeHint(true)
        const hintTimer = setTimeout(() => {
          setShowSwipeHint(false)
        }, 3000)

        if (gateMounted) {
          setGateFadeOut(true)
          const timer = setTimeout(() => {
            setGateMounted(false)
          }, 400)
          return () => {
            clearTimeout(timer)
            clearTimeout(hintTimer)
          }
        } else {
          // Direct load in landscape
          setGateMounted(true)
          setGateFadeOut(false)
          const fadeTimer = setTimeout(() => {
            setGateFadeOut(true)
          }, 1000)
          const unmountTimer = setTimeout(() => {
            setGateMounted(false)
          }, 1400)
          return () => {
            clearTimeout(fadeTimer)
            clearTimeout(unmountTimer)
            clearTimeout(hintTimer)
          }
        }
      }
    } else {
      setGateMounted(false)
      setGateFadeOut(false)
      setShowSwipeHint(false)
    }
  }, [isMobile, isPortrait, mounted])

  if (!mounted) {
    return <>{children}</>
  }

  const wrapperClass = isMobile && !isPortrait ? 'mobile-landscape-wrapper' : ''

  return (
    <>
      <div className={wrapperClass} style={{ position: 'relative' }}>
        {children}
        {isMobile && !isPortrait && showSwipeHint && (
          <div className="swipe-hint">
            Swipe &rarr;
          </div>
        )}
      </div>

      {gateMounted && (
        <div className={`orientation-gate ${gateFadeOut ? 'fade-out' : ''}`}>
          <div className="gate-content">
            <div className="phone-icon-container">
              <svg className="phone-rotator" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Phone outline */}
                <rect x="35" y="15" width="30" height="70" rx="5" stroke="#fafafa" strokeWidth="3" />
                <circle cx="50" cy="80" r="2" fill="#fafafa" />
                {/* Screen */}
                <rect x="39" y="22" width="22" height="50" rx="2" fill="rgba(250,250,250,0.1)" />
                {/* Curved arrow around it */}
                <path d="M 80 50 A 30 30 0 0 0 50 20" stroke="#444444" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M 50 15 L 50 25 L 45 20 Z" fill="#444444" />
              </svg>
            </div>
            <h1 className="gate-title">Rotate your device</h1>
            <p className="gate-subtext">This site is best experienced in landscape mode</p>
          </div>
        </div>
      )}

      <style>{`
        .orientation-gate {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity 400ms ease;
        }

        .orientation-gate.fade-out {
          opacity: 0;
          pointer-events: none;
        }

        .gate-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          text-align: center;
          padding: 24px;
        }

        .phone-icon-container {
          width: 80px;
          height: 80px;
          margin-bottom: 8px;
        }

        .phone-rotator {
          width: 100%;
          height: 100%;
          animation: phoneRotate 1.5s ease-in-out infinite;
        }

        @keyframes phoneRotate {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(90deg);
          }
        }

        .gate-title {
          font-family: var(--font-geist-sans), system-ui, -apple-system, sans-serif;
          font-size: clamp(1.5rem, 6vw, 2rem);
          font-weight: 500;
          color: #fafafa;
          margin: 0;
        }

        .gate-subtext {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #444444;
          margin: 0;
        }

        .swipe-hint {
          position: absolute;
          bottom: 24px;
          right: 24px;
          font-family: var(--font-geist-mono), monospace;
          font-size: 12px;
          color: rgba(250, 250, 250, 0.6);
          background: rgba(20, 20, 20, 0.6);
          padding: 8px 16px;
          border-radius: 999px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 100;
          pointer-events: none;
          animation: fadeOutHint 0.5s ease 2.5s forwards;
        }

        @keyframes fadeOutHint {
          to {
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
