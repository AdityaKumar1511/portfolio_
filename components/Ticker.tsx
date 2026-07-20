'use client'
import meta from '@/data/meta.json'

export default function Ticker() {
  const items = meta.tickerSkills || []

  // Duplicate items array multiple times to guarantee an unbroken marquee scroller
  const marqueeItems = [...items, ...items, ...items, ...items]

  return (
    <div className="ticker-wrapper">
      <div className="ticker-container">
        <div className="animate-marquee ticker-track">
          {marqueeItems.map((item, idx) => (
            <div key={idx} className="ticker-item">
              <span className="ticker-text">{item}</span>
              <span className="ticker-slash">/</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .ticker-wrapper {
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: transparent;
          padding: 24px 0;
          overflow: hidden;
          width: 100%;
        }

        .ticker-container {
          display: flex;
          width: 100%;
          overflow: hidden;
        }

        .ticker-track {
          display: flex;
          align-items: center;
          gap: 40px;
          width: max-content;
        }

        .ticker-item {
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .ticker-text {
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(14px, 2.5vw, 18px);
          font-weight: 500;
          color: var(--text);
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        .ticker-slash {
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(14px, 2.5vw, 18px);
          font-weight: 600;
          color: #e07a5f; /* Rust/terracotta orange */
        }
      `}</style>
    </div>
  )
}
