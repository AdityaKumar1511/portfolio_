'use client'

export default function Experience() {
  const items = [
    { num: '01', role: 'Open Source Contributor', org: 'GSSoC', period: '2024 — Present' },
    { num: '02', role: 'Hackathon Lead (CodeBlooded)', org: 'ISRO BAH 2026', period: '2026' },
    { num: '03', role: 'Competitive Programmer', org: 'Codeforces + LeetCode', period: '2023 — Present' },
    { num: '04', role: 'Project Lead', org: 'NIT Patna', period: '2025 — Present' },
  ]

  return (
    <section id="experience" className="experience-section">
      <div className="experience-grid">
        {/* Left Column (Sticky) */}
        <div className="experience-left">
          <div>
            <div className="experience-label-container">
              <span className="experience-label-line" />
              <span className="experience-label-text">Experience</span>
            </div>
            <h2 className="experience-heading">
              Where I&apos;ve built.
            </h2>
          </div>
          {/* Decorative dot at the bottom of the sticky section */}
          <div className="experience-dot" />
        </div>

        {/* Right Column (List of Experience Rows) */}
        <div className="experience-list">
          {items.map((item, i) => (
            <div key={i} className="experience-row">
              {/* Number */}
              <span className="experience-num">{item.num}</span>
              
              {/* Role Title */}
              <h3 className="experience-role">{item.role}</h3>
              
              {/* Organization */}
              <span className="experience-org">{item.org}</span>
              
              {/* Period */}
              <span className="experience-period">{item.period}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded CSS for layout and responsiveness */}
      <style>{`
        .experience-section {
          padding: clamp(4rem, 10vw, 8rem) 24px;
          border-top: 1px solid var(--border);
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        .experience-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 4rem;
          align-items: start;
        }

        .experience-left {
          position: sticky;
          top: 120px;
          height: calc(80vh - 120px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .experience-label-container {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 2rem;
        }

        .experience-label-line {
          width: 24px;
          height: 1px;
          background: var(--text-muted);
        }

        .experience-label-text {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
        }

        .experience-heading {
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: var(--text);
          line-height: 1.1;
          margin: 0;
        }

        .experience-dot {
          width: 8px;
          height: 8px;
          background: var(--text);
          border-radius: 50%;
          margin-top: auto;
          margin-left: 36px;
        }

        .experience-list {
          display: flex;
          flex-direction: column;
        }

        .experience-row {
          display: grid;
          grid-template-columns: 50px 1fr 180px 130px;
          gap: 24px;
          align-items: baseline;
          padding: 48px 0;
          border-bottom: 1px solid var(--border);
        }

        .experience-row:first-of-type {
          border-top: 1px solid var(--border);
        }

        .experience-num {
          font-family: var(--font-geist-mono), monospace;
          font-size: 13px;
          font-weight: 600;
          color: #ff5f38; /* Accent red/orange color from screenshot */
        }

        .experience-role {
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 500;
          color: var(--text);
          margin: 0;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .experience-org {
          font-family: var(--font-geist-mono), monospace;
          font-size: 12px;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        .experience-period {
          font-family: var(--font-geist-mono), monospace;
          font-size: 12px;
          color: var(--text-muted);
          text-align: right;
        }

        @media (max-width: 1024px) {
          .experience-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .experience-left {
            position: static;
            height: auto;
            gap: 1.5rem;
          }

          .experience-dot {
            display: none;
          }

          .experience-row {
            grid-template-columns: 40px 1fr auto;
            padding: 32px 0;
            gap: 16px;
          }

          .experience-org {
            grid-column: 2;
            margin-top: 2px;
          }

          .experience-period {
            grid-column: 3;
            grid-row: 1 / 3;
            align-self: center;
          }
        }

        @media (max-width: 640px) {
          .experience-row {
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding: 24px 0;
          }

          .experience-period {
            text-align: left;
            margin-top: 4px;
          }
        }
      `}</style>
    </section>
  )
}
