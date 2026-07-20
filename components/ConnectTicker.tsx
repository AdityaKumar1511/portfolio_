'use client'
import meta from '@/data/meta.json'

export default function ConnectTicker() {
  const text = meta.tickerText
  const items = Array.from({ length: 16 }, (_, i) => i)

  return (
    <div className="connect-ticker-wrapper">
      <div className="connect-ticker-container">
        <div className="animate-marquee connect-ticker-track">
          {items.map((_, idx) => (
            <div key={idx} className="connect-ticker-item">
              <span className="connect-ticker-text">{text}</span>
              <span className="connect-ticker-slash">/</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .connect-ticker-wrapper {
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: transparent;
          padding: 24px 0;
          overflow: hidden;
          width: 100%;
        }

        .connect-ticker-container {
          display: flex;
          width: 100%;
          overflow: hidden;
        }

        .connect-ticker-track {
          display: flex;
          align-items: center;
          gap: 40px;
          width: max-content;
        }

        .connect-ticker-item {
          display: flex;
          align-items: center;
          gap: 40px;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .connect-ticker-text {
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(14px, 2.5vw, 18px);
          font-weight: 500;
          color: var(--text);
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        .connect-ticker-slash {
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(14px, 2.5vw, 18px);
          font-weight: 600;
          color: #e07a5f;
        }
      `}</style>
    </div>
  )
}
