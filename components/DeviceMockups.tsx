'use client'

import React from 'react'

interface ProjectProps {
  slug: string
  name: string
  category: string
  liveUrl?: string | null
  thumbnail?: string | null
  impactStats?: { value: string; label: string }[]
  statusLabel?: string
}

/* ─────────────────────────────────────────────────────────────
   MacBook 13" Mockup (Pixel-Perfect match to Image 2)
───────────────────────────────────────────────────────────── */
export function MacBookMockup({ project }: { project: ProjectProps }) {
  const displayUrl = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '').toUpperCase()
    : `${project.slug.toUpperCase()}.VERCEL.APP`

  return (
    <div className="device-mockup-wrapper">
      {/* Device Header Tag: Matching Image 2 */}
      <div className="device-header-row">
        <span className="device-label-text">
          MACBOOK 13&quot;
        </span>
        <span className="device-dot-orange" />
      </div>

      {/* MacBook Window Chassis */}
      <div className="macbook-chassis">
        {/* macOS Top Chrome / Navigation Bar */}
        <div className="macbook-chrome">
          {/* Traffic Light Buttons */}
          <div className="macbook-dots">
            <span className="macbook-dot macbook-dot--red" />
            <span className="macbook-dot macbook-dot--yellow" />
            <span className="macbook-dot macbook-dot--green" />
          </div>

          {/* URL / Domain Header in Center */}
          <div className="macbook-url-bar">
            <span className="macbook-url-dot" />
            <span className="macbook-url-text">
              {displayUrl}
            </span>
          </div>

          {/* Right Tech Spec */}
          <div className="macbook-spec-text">
            MACBOOK 13&quot; · 16:10 · 1440 × 900
          </div>
        </div>

        {/* MacBook Screen Viewport: Rich SaaS UI Preview matching Image 2 */}
        <div className="macbook-viewport">
          {project.slug === 'arbitrage' ? (
            <ArbitrageDesktopView />
          ) : project.slug === 'nexusforce' ? (
            <NexusForceDesktopView />
          ) : (
            <GenericDesktopView project={project} />
          )}

          {/* Screen Glare Overlay */}
          <div className="macbook-glare" />
        </div>
      </div>

      <style>{`
        .device-mockup-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          user-select: none;
        }

        .device-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 8px;
          padding-left: 2px;
          padding-right: 2px;
        }

        .device-label-text {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #a8a29e;
        }

        .device-dot-orange {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #fa5f34;
          box-shadow: 0 0 8px rgba(250, 95, 52, 0.7);
        }

        .macbook-chassis {
          position: relative;
          flex: 1;
          width: 100%;
          min-height: 360px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: #0d0e12;
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.95);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .macbook-chrome {
          height: 38px;
          padding: 0 14px;
          background: #14151a;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }

        .macbook-dots {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }

        .macbook-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }
        .macbook-dot--red { background: #ff5f56; }
        .macbook-dot--yellow { background: #ffbd2e; }
        .macbook-dot--green { background: #27c93f; }

        .macbook-url-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 3px 12px;
          border-radius: 4px;
          background: #090a0d;
          border: 1px solid rgba(255, 255, 255, 0.06);
          max-width: 300px;
          overflow: hidden;
        }

        .macbook-url-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #10b981;
          flex-shrink: 0;
          box-shadow: 0 0 6px rgba(16, 185, 129, 0.6);
        }

        .macbook-url-text {
          font-family: var(--font-geist-mono), monospace;
          font-size: 9.5px;
          letter-spacing: 0.1em;
          color: #d4cec7;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .macbook-spec-text {
          font-family: var(--font-geist-mono), monospace;
          font-size: 8.5px;
          color: #666;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .macbook-viewport {
          position: relative;
          flex: 1;
          width: 100%;
          background: #08090c;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 16px 20px;
          box-sizing: border-box;
        }

        .macbook-glare {
          pointer-events: none;
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, transparent 60%);
        }

        @media (max-width: 640px) {
          .macbook-spec-text { display: none; }
          .macbook-viewport { padding: 12px 14px; }
        }
      `}</style>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   iPhone 14 Pro Max Mockup (Pixel-Perfect match to Image 2)
───────────────────────────────────────────────────────────── */
export function IPhoneMockup({ project }: { project: ProjectProps }) {
  return (
    <div className="iphone-mockup-wrapper">
      {/* Device Header Tag: Matching Image 2 */}
      <div className="iphone-header-row">
        <span className="iphone-label-text">
          IPHONE 14 PRO MAX
        </span>
        <span className="device-dot-orange" />
      </div>

      {/* iPhone Outer Hardware Chassis: Titanium frame with side buttons & bevel */}
      <div className="iphone-outer-chassis">
        {/* Left Side Hardware Buttons (Notches) */}
        <span className="iphone-side-btn iphone-btn-action" />
        <span className="iphone-side-btn iphone-btn-vol-up" />
        <span className="iphone-side-btn iphone-btn-vol-down" />
        {/* Right Side Power Button Notch */}
        <span className="iphone-side-btn iphone-btn-power" />

        {/* Inner Screen Bezel */}
        <div className="iphone-bezel">
          {/* Inner Display Screen */}
          <div className="iphone-display">
            {/* Status Bar & Dynamic Island */}
            <div className="iphone-status-bar">
              {/* Clock */}
              <span className="iphone-status-time">9:41</span>

              {/* Dynamic Island Capsule */}
              <div className="iphone-dynamic-island">
                <span className="island-lens" />
                <span className="island-sensor" />
              </div>

              {/* Signal & Battery Icons */}
              <div className="iphone-status-icons">
                <span>5G</span>
                <span className="battery-icon">
                  <span className="battery-level" />
                </span>
              </div>
            </div>

            {/* Mobile Screen Body Content */}
            <div className="iphone-screen-content">
              {project.slug === 'arbitrage' ? (
                <ArbitrageMobileView />
              ) : project.slug === 'nexusforce' ? (
                <NexusForceMobileView />
              ) : (
                <GenericMobileView project={project} />
              )}
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="iphone-home-bar-wrap">
              <span className="iphone-home-bar" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .iphone-mockup-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          user-select: none;
        }

        .iphone-header-row {
          width: 200px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 8px;
          padding-left: 2px;
          padding-right: 2px;
        }

        .iphone-label-text {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #a8a29e;
        }

        .iphone-outer-chassis {
          position: relative;
          width: 200px;
          flex: 1;
          min-height: 360px;
          max-height: 440px;
          border-radius: 42px;
          padding: 3px;
          background: linear-gradient(180deg, #2a2c33 0%, #1a1b20 50%, #121316 100%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.95);
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        /* Hardware button notches */
        .iphone-side-btn {
          position: absolute;
          background: #2a2c33;
          border-radius: 2px;
        }
        .iphone-btn-action { left: -5px; top: 56px; width: 3px; height: 16px; border-top-left-radius: 2px; border-bottom-left-radius: 2px; }
        .iphone-btn-vol-up { left: -5px; top: 88px; width: 3px; height: 28px; border-top-left-radius: 2px; border-bottom-left-radius: 2px; }
        .iphone-btn-vol-down { left: -5px; top: 126px; width: 3px; height: 28px; border-top-left-radius: 2px; border-bottom-left-radius: 2px; }
        .iphone-btn-power { right: -5px; top: 76px; width: 3px; height: 38px; border-top-right-radius: 2px; border-bottom-right-radius: 2px; }

        .iphone-bezel {
          position: relative;
          border-radius: 39px;
          background: #000;
          padding: 2px;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-sizing: border-box;
        }

        .iphone-display {
          position: relative;
          border-radius: 35px;
          background: #09090c;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          box-sizing: border-box;
        }

        .iphone-status-bar {
          padding: 8px 14px 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 20;
          flex-shrink: 0;
        }

        .iphone-status-time {
          font-family: var(--font-geist-mono), monospace;
          font-size: 7.5px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          letter-spacing: -0.02em;
        }

        .iphone-dynamic-island {
          width: 66px;
          height: 17px;
          background: #000;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 8px;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.8);
        }

        .island-lens {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #101622;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .island-sensor {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 4px #10b981;
        }

        .iphone-status-icons {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-geist-mono), monospace;
          font-size: 7px;
          color: rgba(255, 255, 255, 0.85);
        }

        .battery-icon {
          width: 11px;
          height: 6px;
          border-radius: 2px;
          border: 1px solid rgba(255, 255, 255, 0.85);
          padding: 1px;
          display: inline-flex;
          align-items: center;
        }

        .battery-level {
          width: 100%;
          height: 100%;
          background: #fff;
          border-radius: 1px;
        }

        .iphone-screen-content {
          flex: 1;
          padding: 6px 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          box-sizing: border-box;
        }

        .iphone-home-bar-wrap {
          padding-bottom: 6px;
          padding-top: 4px;
          display: flex;
          justify-content: center;
          z-index: 20;
          flex-shrink: 0;
        }

        .iphone-home-bar {
          width: 76px;
          height: 3px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.45);
        }
      `}</style>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Desktop Showcase Views (Arbitrage, NexusForce, Generic)
   Matching the rich SaaS aesthetic of Image 2
───────────────────────────────────────────────────────────── */

function ArbitrageDesktopView() {
  return (
    <div className="preview-wrap">
      {/* Top Navbar */}
      <div className="preview-nav">
        <div className="preview-brand">
          <span className="brand-badge">⚡</span>
          <span className="brand-name">
            Arbitrage <span className="brand-ver">v2.4 // PRO</span>
          </span>
        </div>

        {/* Nav Links */}
        <div className="preview-links">
          <span className="preview-link preview-link--active">Screener</span>
          <span className="preview-link">Spread Matrix</span>
          <span className="preview-link">Order Depth</span>
          <span className="preview-link">Webhooks</span>
        </div>

        {/* Live Status Pill */}
        <div className="status-pill-stream">
          <span className="stream-dot" />
          <span>50+ ASSETS STREAMING</span>
        </div>
      </div>

      {/* Hero Headline & Value Proposition */}
      <div className="preview-hero">
        <div className="hero-pill-tag">
          <span>● SUB-SECOND CRYPTO ARBITRAGE ENGINE</span>
        </div>
        <h3 className="hero-headline">
          Real-Time Cross-Exchange Price Spreads.
        </h3>
        <p className="hero-subtext">
          Autonomous multi-exchange scanner monitors 50+ pairs across Binance, Bybit, OKX &amp; Uniswap with sub-second alert triggers.
        </p>
      </div>

      {/* Live Spread Telemetry Cards */}
      <div className="preview-cards-grid">
        <div className="telemetry-card">
          <div className="card-row-top">
            <span className="pair-title">BTC/USDT</span>
            <span className="spread-badge-green">+2.4%</span>
          </div>
          <div className="pair-exchanges">Binance ↔ Bybit</div>
          <div className="pair-prices">$98,420 ↔ $98,715</div>
          <div className="pair-latency">LATENCY: 420ms</div>
        </div>

        <div className="telemetry-card">
          <div className="card-row-top">
            <span className="pair-title">SOL/USDC</span>
            <span className="spread-badge-green">+3.8%</span>
          </div>
          <div className="pair-exchanges">Raydium ↔ OKX</div>
          <div className="pair-prices">$198.40 ↔ $204.10</div>
          <div className="pair-latency">LATENCY: 310ms</div>
        </div>

        <div className="telemetry-card">
          <div className="card-row-top">
            <span className="pair-title">ETH/USDT</span>
            <span className="spread-badge-amber">+1.2%</span>
          </div>
          <div className="pair-exchanges">Uniswap ↔ Kraken</div>
          <div className="pair-prices">$3,410 ↔ $3,448</div>
          <div className="pair-latency">LATENCY: 580ms</div>
        </div>
      </div>

      {/* Interactive Terminal Bar */}
      <div className="terminal-bar">
        <div className="terminal-left">
          <span className="terminal-prompt">&gt;_</span>
          <span className="terminal-cmd">npx arbitrage monitor --pairs=BTC,SOL,ETH --threshold=1.5%</span>
        </div>
        <span className="terminal-action">EXECUTE ↗</span>
      </div>

      <style>{`
        .preview-wrap {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-family: var(--font-geist-mono), monospace;
          gap: 10px;
        }

        .preview-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 8px;
        }

        .preview-brand {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .brand-badge {
          width: 18px;
          height: 18px;
          border-radius: 4px;
          background: #fa5f34;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: #000;
          font-weight: 900;
        }

        .brand-name {
          font-size: 11px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.05em;
        }

        .brand-ver {
          color: #fa5f34;
          font-size: 8px;
          font-weight: 400;
          margin-left: 4px;
        }

        .preview-links {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 8.5px;
          color: rgba(212, 206, 199, 0.6);
        }

        .preview-link--active {
          color: #fa5f34;
          font-weight: 700;
        }

        .status-pill-stream {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 2px 8px;
          border-radius: 9999px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #10b981;
          font-size: 7.5px;
          font-weight: 700;
        }

        .stream-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px #10b981;
        }

        .preview-hero {
          text-align: center;
          padding: 4px 0;
        }

        .hero-pill-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 2px 10px;
          border-radius: 9999px;
          background: rgba(250, 95, 52, 0.1);
          border: 1px solid rgba(250, 95, 52, 0.3);
          color: #fa5f34;
          font-size: 7.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          margin-bottom: 6px;
        }

        .hero-headline {
          font-size: clamp(13px, 1.3vw, 16px);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.25;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .hero-subtext {
          font-size: 8.5px;
          line-height: 1.5;
          color: rgba(212, 206, 199, 0.7);
          max-width: 420px;
          margin: 4px auto 0;
        }

        .preview-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .telemetry-card {
          padding: 8px 10px;
          border-radius: 6px;
          background: #111217;
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .card-row-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .pair-title {
          font-size: 8.5px;
          font-weight: 700;
          color: #fff;
        }

        .spread-badge-green {
          font-size: 7.5px;
          font-weight: 800;
          color: #10b981;
          background: rgba(16, 185, 129, 0.15);
          padding: 1px 4px;
          border-radius: 2px;
        }

        .spread-badge-amber {
          font-size: 7.5px;
          font-weight: 800;
          color: #f59e0b;
          background: rgba(245, 158, 11, 0.15);
          padding: 1px 4px;
          border-radius: 2px;
        }

        .pair-exchanges {
          font-size: 7px;
          color: #888;
        }

        .pair-prices {
          font-size: 7.5px;
          font-weight: 700;
          color: #d4cec7;
        }

        .pair-latency {
          font-size: 6.5px;
          color: #10b981;
          margin-top: 2px;
        }

        .terminal-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 10px;
          border-radius: 6px;
          background: #0d0f13;
          border: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 8px;
        }

        .terminal-left {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #888;
          overflow: hidden;
        }

        .terminal-prompt { color: #fa5f34; font-weight: 700; }
        .terminal-cmd { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .terminal-action {
          color: #fa5f34;
          font-weight: 800;
          cursor: pointer;
          flex-shrink: 0;
          margin-left: 8px;
        }
      `}</style>
    </div>
  )
}

function NexusForceDesktopView() {
  return (
    <div className="preview-wrap">
      <div className="preview-nav">
        <div className="preview-brand">
          <span className="brand-badge" style={{ background: '#6366f1', color: '#fff' }}>🛡️</span>
          <span className="brand-name">
            NexusForce <span className="brand-ver" style={{ color: '#818cf8' }}>// ESCROW DAO</span>
          </span>
        </div>

        <div className="preview-links">
          <span className="preview-link" style={{ color: '#818cf8', fontWeight: 700 }}>Active Tribunals</span>
          <span className="preview-link">VRF Verifier</span>
          <span className="preview-link">IPFS Anchors</span>
        </div>

        <div className="status-pill-stream" style={{ background: 'rgba(99, 102, 241, 0.1)', borderColor: 'rgba(99, 102, 241, 0.3)', color: '#818cf8' }}>
          <span className="stream-dot" style={{ background: '#818cf8', boxShadow: '0 0 6px #818cf8' }} />
          <span>CHAINLINK VRF VERIFIED</span>
        </div>
      </div>

      <div className="preview-hero">
        <div className="hero-pill-tag" style={{ background: 'rgba(99, 102, 241, 0.1)', borderColor: 'rgba(99, 102, 241, 0.3)', color: '#818cf8' }}>
          <span>● TRUSTLESS DECENTRALIZED DISPUTE RESOLUTION</span>
        </div>
        <h3 className="hero-headline">
          DAO-Governed Multi-Sig Escrow.
        </h3>
        <p className="hero-subtext">
          Smart contracts release funds upon multi-party consensus or unbiased juror arbitration with on-chain VRF randomness.
        </p>
      </div>

      <div style={{ padding: '8px 12px', borderRadius: '6px', background: '#111217', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
          <span style={{ fontSize: '8.5px', fontWeight: 700, color: '#fff' }}>ESCROW CONTRACT #4092</span>
          <span style={{ fontSize: '7.5px', fontWeight: 800, color: '#10b981', background: 'rgba(16, 185, 129, 0.15)', padding: '1px 5px', borderRadius: '2px' }}>
            12.50 ETH LOCKED
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '7.5px', color: '#888', marginTop: '6px' }}>
          <span>JUROR CONSENSUS: 4 / 5 VOTED</span>
          <span style={{ color: '#818cf8', fontWeight: 700 }}>VRF SEED #8942-A VALID</span>
        </div>
        <div style={{ width: '100%', height: '4px', background: '#222', borderRadius: '9999px', marginTop: '6px', overflow: 'hidden' }}>
          <div style={{ width: '80%', height: '100%', background: 'linear-gradient(90deg, #6366f1, #10b981)' }} />
        </div>
      </div>

      <div className="terminal-bar">
        <span style={{ color: '#888' }}>IPFS PROOF: ipfs://bafybeigdyrzt5x9f4...</span>
        <span className="terminal-action" style={{ color: '#818cf8' }}>VIEW TRIBUNAL →</span>
      </div>
    </div>
  )
}

function GenericDesktopView({ project }: { project: ProjectProps }) {
  return (
    <div className="preview-wrap">
      <div className="preview-nav">
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>{project.name.toUpperCase()}</span>
        <span style={{ fontSize: '8px', fontWeight: 700, color: '#fa5f34', padding: '2px 8px', borderRadius: '4px', background: 'rgba(250,95,52,0.1)', border: '1px solid rgba(250,95,52,0.3)' }}>
          {project.category.toUpperCase()}
        </span>
      </div>

      <div className="preview-hero">
        <h3 className="hero-headline">{project.name} Production Interface</h3>
        <p className="hero-subtext">
          High-performance distributed architecture optimized for scale and reliability.
        </p>
      </div>

      <div className="preview-cards-grid">
        {project.impactStats?.map((s, i) => (
          <div key={i} className="telemetry-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#fa5f34' }}>{s.value}</div>
            <div style={{ fontSize: '7px', color: '#888', textTransform: 'uppercase', marginTop: '2px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="terminal-bar" style={{ justifyContent: 'center', color: '#888' }}>
        LIVE ARCHITECTURE TELEMETRY ACTIVE
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mobile Showcase Views (Arbitrage, NexusForce, Generic)
   Matching the rich mobile aesthetic of Image 2
───────────────────────────────────────────────────────────── */

function ArbitrageMobileView() {
  return (
    <div className="mobile-view-wrap">
      {/* Mobile Header Bar */}
      <div className="mobile-header">
        <div className="mobile-brand">
          <span className="mobile-icon">⚡</span>
          <span className="mobile-title">Arbitrage</span>
        </div>
        <span className="mobile-live-pill">LIVE</span>
      </div>

      {/* Mini Hero */}
      <div className="mobile-hero">
        <span className="mobile-tag">● REAL-TIME ENGINE</span>
        <h4 className="mobile-headline">Never Miss a Price Drop.</h4>
        <p className="mobile-desc">
          Track 50+ pairs across DEX &amp; CEX in sub-second latency.
        </p>
      </div>

      {/* Primary Mobile CTA Button */}
      <div className="mobile-cta-btn">
        Track Live Rates →
      </div>

      {/* Mobile Stream Ticker List */}
      <div className="mobile-ticker-list">
        <div className="mobile-ticker-item">
          <div>
            <div className="mobile-pair-name">BTC/USDT</div>
            <div className="mobile-pair-sub">Binance ↔ Bybit</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="mobile-gain">+2.4%</div>
            <div className="mobile-lat">420ms</div>
          </div>
        </div>

        <div className="mobile-ticker-item">
          <div>
            <div className="mobile-pair-name">SOL/USDC</div>
            <div className="mobile-pair-sub">Raydium ↔ OKX</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="mobile-gain">+3.8%</div>
            <div className="mobile-lat">310ms</div>
          </div>
        </div>
      </div>

      {/* Quick Alert Snippet */}
      <div className="mobile-footer-pill">
        <span>AUTO ALERTS: ACTIVE</span>
        <span style={{ color: '#fa5f34', fontWeight: 800 }}>24/7 UP</span>
      </div>

      <style>{`
        .mobile-view-wrap {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-family: var(--font-geist-mono), monospace;
          gap: 4px;
        }

        .mobile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 4px;
        }

        .mobile-brand {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .mobile-icon {
          width: 14px;
          height: 14px;
          border-radius: 3px;
          background: #fa5f34;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          color: #000;
          font-weight: 900;
        }

        .mobile-title {
          font-size: 8.5px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.04em;
        }

        .mobile-live-pill {
          font-size: 6px;
          font-weight: 800;
          color: #10b981;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 1px 5px;
          border-radius: 9999px;
        }

        .mobile-hero {
          text-align: center;
          padding: 2px 0;
        }

        .mobile-tag {
          font-size: 6px;
          font-weight: 800;
          color: #fa5f34;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          display: block;
        }

        .mobile-headline {
          font-size: 9.5px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          margin: 2px 0 0;
        }

        .mobile-desc {
          font-size: 6.5px;
          line-height: 1.35;
          color: rgba(212, 206, 199, 0.7);
          margin: 2px 0 0;
        }

        .mobile-cta-btn {
          width: 100%;
          padding: 5px 0;
          border-radius: 6px;
          background: linear-gradient(90deg, #fa5f34 0%, #ff7a45 100%);
          color: #000;
          font-weight: 800;
          font-size: 7.5px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          text-align: center;
          box-shadow: 0 4px 10px rgba(250, 95, 52, 0.3);
        }

        .mobile-ticker-list {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .mobile-ticker-item {
          padding: 4px 6px;
          border-radius: 4px;
          background: #121318;
          border: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .mobile-pair-name {
          font-size: 7.5px;
          font-weight: 700;
          color: #fff;
        }

        .mobile-pair-sub {
          font-size: 5.5px;
          color: #777;
        }

        .mobile-gain {
          font-size: 7px;
          font-weight: 800;
          color: #10b981;
        }

        .mobile-lat {
          font-size: 5.5px;
          color: #777;
        }

        .mobile-footer-pill {
          padding: 3px 6px;
          border-radius: 4px;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 6px;
          color: #888;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
    </div>
  )
}

function NexusForceMobileView() {
  return (
    <div className="mobile-view-wrap">
      <div className="mobile-header">
        <div className="mobile-brand">
          <span className="mobile-icon" style={{ background: '#6366f1', color: '#fff' }}>🛡️</span>
          <span className="mobile-title">NexusForce</span>
        </div>
        <span className="mobile-live-pill" style={{ color: '#818cf8', background: 'rgba(99, 102, 241, 0.15)', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
          WEB3
        </span>
      </div>

      <div className="mobile-hero">
        <span className="mobile-tag" style={{ color: '#818cf8' }}>● DAO DISPUTE ESCROW</span>
        <h4 className="mobile-headline">Trustless Multi-Sig.</h4>
        <p className="mobile-desc">
          Chainlink VRF randomized juror tribunal.
        </p>
      </div>

      <div className="mobile-cta-btn" style={{ background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)', color: '#fff' }}>
        View Active Escrows →
      </div>

      <div style={{ padding: '5px 8px', borderRadius: '4px', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '7.5px', fontWeight: 700, color: '#fff' }}>ESCROW #4092</span>
          <span style={{ fontSize: '7px', fontWeight: 800, color: '#10b981' }}>12.5 ETH</span>
        </div>
        <div style={{ width: '100%', height: '3px', background: '#222', borderRadius: '9999px', margin: '4px 0', overflow: 'hidden' }}>
          <div style={{ width: '80%', height: '100%', background: '#818cf8' }} />
        </div>
        <div style={{ fontSize: '6px', color: '#888', textAlign: 'center' }}>4 / 5 JURORS CONFIRMED</div>
      </div>

      <div className="mobile-footer-pill">
        <span>ON-CHAIN VRF</span>
        <span style={{ color: '#818cf8', fontWeight: 700 }}>VERIFIED ✓</span>
      </div>
    </div>
  )
}

function GenericMobileView({ project }: { project: ProjectProps }) {
  return (
    <div className="mobile-view-wrap">
      <div className="mobile-header">
        <span className="mobile-title">{project.name}</span>
        <span className="mobile-live-pill">MOBILE</span>
      </div>

      <div className="mobile-hero">
        <h4 className="mobile-headline">{project.name}</h4>
        <p className="mobile-desc">{project.category}</p>
      </div>

      <div className="mobile-cta-btn">
        Open Interface →
      </div>

      <div className="mobile-ticker-list">
        {project.impactStats?.slice(0, 2).map((s, i) => (
          <div key={i} className="mobile-ticker-item">
            <span style={{ fontSize: '6.5px', color: '#888' }}>{s.label}</span>
            <span style={{ fontSize: '7px', fontWeight: 700, color: '#fff' }}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Non-Live Project Showcase: Architectural Blueprint & Telemetry
───────────────────────────────────────────────────────────── */

export function NonLiveProjectShowcase({ project }: { project: ProjectProps }) {
  if (project.slug === 'skylens') {
    return <SkyLensArchitectureShowcase />
  }

  if (project.slug === 'cipherkit') {
    return <CipherKitArchitectureShowcase />
  }

  return <GenericArchitectureShowcase project={project} />
}

function SkyLensArchitectureShowcase() {
  return (
    <div className="device-mockup-wrapper">
      <div className="device-header-row">
        <span className="device-label-text" style={{ color: '#22d3ee' }}>
          ENGINEERING // SATELLITE GEOSPATIAL TELEMETRY
        </span>
        <span className="device-dot-orange" style={{ background: '#22d3ee', boxShadow: '0 0 8px #22d3ee' }} />
      </div>

      <div className="showcase-2col-card" style={{ borderColor: 'rgba(34, 211, 238, 0.25)', background: '#080d13' }}>
        <div className="showcase-col">
          <div className="showcase-col-header" style={{ borderBottomColor: 'rgba(34, 211, 238, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22d3ee', display: 'inline-block' }} />
              <span style={{ fontSize: '9.5px', fontWeight: 700, color: '#67e8f9', letterSpacing: '0.08em' }}>
                SENTINEL-5P TROPOMI PIPELINE
              </span>
            </div>
            <span style={{ fontSize: '8px', background: '#083344', color: '#67e8f9', border: '1px solid rgba(6, 182, 212, 0.5)', padding: '1px 6px', borderRadius: '3px' }}>
              L2 GRANULES
            </span>
          </div>

          <div style={{ position: 'relative', height: '140px', borderRadius: '8px', border: '1px solid rgba(6, 182, 212, 0.25)', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
              <div style={{ width: '130px', height: '130px', borderRadius: '50%', border: '1px solid rgba(34, 211, 238, 0.15)' }} />
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '1px solid rgba(34, 211, 238, 0.25)' }} />
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(34, 211, 238, 0.35)' }} />
              <div style={{ position: 'absolute', width: '100%', height: '1px', background: 'rgba(34, 211, 238, 0.15)' }} />
              <div style={{ position: 'absolute', height: '100%', width: '1px', background: 'rgba(34, 211, 238, 0.15)' }} />
            </div>

            <div style={{ position: 'absolute', top: '8px', left: '10px', fontSize: '8px', color: '#fcd34d', fontWeight: 700 }}>
              ● NO2 SPIKE: 28.61° N, 77.20° E [NCR]
            </div>
            <div style={{ position: 'absolute', bottom: '8px', right: '10px', fontSize: '8px', color: '#34d399', fontWeight: 700 }}>
              ● SO2 NORMAL: 19.07° N, 72.87° E
            </div>

            <div style={{ textAlign: 'center', zIndex: 10 }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#a5f3fc', letterSpacing: '0.08em' }}>
                10,000+ SQ KM SCAN
              </div>
              <div style={{ fontSize: '8px', color: 'rgba(103, 232, 249, 0.8)', marginTop: '2px' }}>
                COPERNICUS OPEN ACCESS STREAM
              </div>
            </div>
          </div>

          <div className="showcase-col-footer" style={{ borderTopColor: 'rgba(34, 211, 238, 0.15)' }}>
            <span>RES: 3.5×5.5 KM</span>
            <span style={{ color: '#67e8f9', fontWeight: 700 }}>NETCDF4 MESH DECODE</span>
            <span style={{ color: '#fa5f34', fontWeight: 700 }}>TEAM CODEBLOODED</span>
          </div>
        </div>

        <div className="showcase-col" style={{ background: '#060a10' }}>
          <div className="showcase-col-header" style={{ borderBottomColor: 'rgba(34, 211, 238, 0.2)' }}>
            <span style={{ fontSize: '9.5px', fontWeight: 700, color: '#67e8f9', letterSpacing: '0.08em' }}>
              XGBOOST ML REGRESSION MATRIX
            </span>
            <span style={{ fontSize: '8px', background: '#022c22', color: '#6ee7b7', border: '1px solid rgba(16, 185, 129, 0.5)', padding: '1px 6px', borderRadius: '3px', fontWeight: 700 }}>
              94% ACCURACY
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: 'auto 0' }}>
            <div className="telemetry-bar-row">
              <span style={{ color: '#888' }}>CPCB Ground Station R² Fit</span>
              <span style={{ color: '#34d399', fontWeight: 700 }}>0.941 Validation</span>
            </div>
            <div className="telemetry-bar-row">
              <span style={{ color: '#888' }}>FastAPI Asynchronous Inference</span>
              <span style={{ color: '#67e8f9', fontWeight: 700 }}>&lt;45ms Latency</span>
            </div>
            <div className="telemetry-bar-row">
              <span style={{ color: '#888' }}>Spatial Indexing</span>
              <span style={{ color: '#e5e5e5', fontWeight: 700 }}>MongoDB 2dsphere</span>
            </div>
          </div>

          <div className="showcase-col-footer" style={{ borderTopColor: 'rgba(34, 211, 238, 0.15)' }}>
            <span style={{ color: '#666' }}>CONTAINER: DOCKER / GDAL</span>
            <span style={{ color: '#22d3ee', fontWeight: 700 }}>LEAFLET CHOROPLETH</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function CipherKitArchitectureShowcase() {
  return (
    <div className="device-mockup-wrapper">
      <div className="device-header-row">
        <span className="device-label-text" style={{ color: '#fa5f34' }}>
          SYSTEMS // ZERO-DEPENDENCY C++17 SPEC
        </span>
        <span className="device-dot-orange" />
      </div>

      <div className="showcase-2col-card" style={{ borderColor: 'rgba(255, 255, 255, 0.12)', background: '#0d0d10' }}>
        <div className="showcase-col">
          <div className="showcase-col-header" style={{ borderBottomColor: 'rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#fa5f34', display: 'inline-block' }} />
              <span style={{ fontSize: '9.5px', fontWeight: 700, color: '#e5e5e5', letterSpacing: '0.08em' }}>
                CMAKE FETCHCONTENT DISTRIBUTION
              </span>
            </div>
            <span style={{ fontSize: '8px', background: '#1c1c1c', color: '#a3a3a3', border: '1px solid #333', padding: '1px 6px', borderRadius: '3px' }}>
              C++17 STATIC
            </span>
          </div>

          <div style={{ padding: '10px', borderRadius: '6px', background: '#000', border: '1px solid rgba(255,255,255,0.08)', fontSize: '8px', lineHeight: '1.6', margin: 'auto 0' }}>
            <div style={{ color: '#666' }}># Link via modern CMake in 3 lines:</div>
            <div style={{ color: '#34d399' }}>FetchContent_Declare(cipherkit GIT_REPOSITORY ...)</div>
            <div style={{ color: '#d4d4d4' }}>FetchContent_MakeAvailable(cipherkit)</div>
            <div style={{ color: '#67e8f9' }}>target_link_libraries(app PRIVATE cipherkit::cipherkit)</div>
          </div>

          <div className="showcase-col-footer" style={{ borderTopColor: 'rgba(255,255,255,0.08)' }}>
            <span>ZERO HEAP ALLOC</span>
            <span style={{ color: '#fa5f34', fontWeight: 700 }}>CONSTEXPR TABLES</span>
            <span>HEADER + STATIC</span>
          </div>
        </div>

        <div className="showcase-col" style={{ background: '#09090c' }}>
          <div className="showcase-col-header" style={{ borderBottomColor: 'rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '9.5px', fontWeight: 700, color: '#e5e5e5', letterSpacing: '0.08em' }}>
              GOOGLE TEST SUITE &amp; MATRIX
            </span>
            <span style={{ fontSize: '8px', background: '#022c22', color: '#6ee7b7', border: '1px solid rgba(16, 185, 129, 0.5)', padding: '1px 6px', borderRadius: '3px', fontWeight: 700 }}>
              100% COVERAGE
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: 'auto 0' }}>
            <div className="telemetry-bar-row">
              <span style={{ color: '#888' }}>Ubuntu 24.04 (GCC 13, Clang 17)</span>
              <span style={{ color: '#34d399', fontWeight: 700 }}>PASS ✓</span>
            </div>
            <div className="telemetry-bar-row">
              <span style={{ color: '#888' }}>macOS Sonoma (Apple Clang 15)</span>
              <span style={{ color: '#34d399', fontWeight: 700 }}>PASS ✓</span>
            </div>
            <div className="telemetry-bar-row">
              <span style={{ color: '#888' }}>Windows 11 (MSVC 19.38)</span>
              <span style={{ color: '#34d399', fontWeight: 700 }}>PASS ✓</span>
            </div>
          </div>

          <div className="showcase-col-footer" style={{ borderTopColor: 'rgba(255,255,255,0.08)' }}>
            <span style={{ color: '#666' }}>BASE64 SPEED: 1.84 GB/S</span>
            <span style={{ color: '#67e8f9', fontWeight: 700 }}>FUZZ TESTED: 0 FAILS</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function GenericArchitectureShowcase({ project }: { project: ProjectProps }) {
  return (
    <div className="device-mockup-wrapper">
      <div className="device-header-row">
        <span className="device-label-text">
          ARCHITECTURE // TECHNICAL BLUEPRINT
        </span>
        <span className="device-dot-orange" />
      </div>

      <div className="showcase-2col-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>{project.name} ARCHITECTURE</span>
          <span style={{ fontSize: '8.5px', fontWeight: 700, color: '#fa5f34' }}>{project.statusLabel}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: 'auto 0' }}>
          {project.impactStats?.map((s, i) => (
            <div key={i} className="telemetry-bar-row">
              <span style={{ color: '#888' }}>{s.label}</span>
              <span style={{ color: '#fff', fontWeight: 700 }}>{s.value}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: '8px', color: '#666', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px' }}>
          CATEGORY: {project.category.toUpperCase()}
        </div>
      </div>

      <style>{`
        .showcase-2col-card {
          position: relative;
          flex: 1;
          min-height: 360px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: #080d13;
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.95);
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: var(--font-geist-mono), monospace;
        }

        @media (max-width: 768px) {
          .showcase-2col-card {
            grid-template-columns: 1fr;
            min-height: auto;
          }
        }

        .showcase-col {
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
        }

        .showcase-col:last-child {
          border-right: none;
        }

        .showcase-col-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 8px;
        }

        .showcase-col-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 8px;
          font-size: 8px;
          color: #888;
        }

        .telemetry-bar-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 10px;
          border-radius: 4px;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.06);
          font-size: 8px;
        }
      `}</style>
    </div>
  )
}
