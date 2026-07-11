'use client'
export default function Experience() {
  const items = [
    { num: '01', role: 'Open Source Contributor', org: 'GSSoC', period: '2024 — Present' },
    { num: '02', role: 'Hackathon Lead (CodeBlooded)', org: 'ISRO BAH 2026', period: '2026' },
    { num: '03', role: 'Competitive Programmer', org: 'Codeforces + LeetCode', period: '2023 — Present' },
    { num: '04', role: 'Project Lead', org: 'NIT Patna', period: '2025 — Present' },
  ]

  return (
    <section id="experience" style={{
      padding: 'clamp(4rem,10vw,8rem) 24px',
      borderTop: '1px solid var(--border)',
      maxWidth: '1400px',
      margin: '0 auto',
      width: '100%',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '4rem', alignItems: 'start' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em',
            color: 'var(--text-muted)', marginBottom: '12px' }}>
            Experience
          </p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 500,
            letterSpacing: '-0.02em', color: 'var(--text)', lineHeight: 1.15 }}>
            Where I&apos;ve built.
          </h2>
        </div>

        <div>
          {items.map((item, i) => (
            <div key={i} style={{
              borderTop: '1px solid var(--border)',
              padding: '20px 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '16px',
            }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--font-geist-mono), monospace',
                  fontSize: '11px', color: 'var(--text-muted)', paddingTop: '3px',
                  flexShrink: 0 }}>
                  {item.num}
                </span>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)',
                    marginBottom: '4px' }}>
                    {item.role}
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    {item.org}
                  </p>
                </div>
              </div>
              <span style={{ fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: '11px', color: 'var(--text-muted)', flexShrink: 0 }}>
                {item.period}
              </span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--border)' }} />
        </div>
      </div>
    </section>
  )
}