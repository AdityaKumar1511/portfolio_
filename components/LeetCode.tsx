'use client'
import { useEffect, useState } from 'react'

const USERNAME = 'Adi_2007'

interface LCStats {
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
}

export default function LeetCode() {
  const [stats, setStats] = useState<LCStats>({
    totalSolved: 282,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${USERNAME}`)
      .then(r => r.json())
      .then(data => {
        if (data.totalSolved) {
          setStats({
            totalSolved: data.totalSolved ?? 282,
            easySolved: data.easySolved ?? 0,
            mediumSolved: data.mediumSolved ?? 0,
            hardSolved: data.hardSolved ?? 0,
          })
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <section id="leetcode" style={{
      padding: 'clamp(4rem,10vw,8rem) 24px',
      borderTop: '1px solid var(--border)',
      maxWidth: '1400px',
      margin: '0 auto',
      width: '100%',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: '3rem'
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em',
            color: 'var(--text-muted)', marginBottom: '12px'
          }}>
            Problem solving
          </p>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 500,
            letterSpacing: '-0.02em', color: 'var(--text)', lineHeight: 1.15
          }}>
            Sharpening the algorithms.
          </h2>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          border: '1px solid var(--border)', borderRadius: '4px',
          padding: '4px 10px'
        }}>
          <span className="pulse-dot" style={{
            width: '6px', height: '6px',
            borderRadius: '50%', background: '#34d399', display: 'inline-block'
          }} />
          <span style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '10px', color: 'var(--text-muted)'
          }}>
            Live
          </span>
        </div>
      </div>

      <a href={`https://leetcode.com/u/${USERNAME}/`} target="_blank" rel="noreferrer"
        style={{
          fontFamily: 'var(--font-geist-mono), monospace',
          fontSize: '13px', color: 'var(--text-secondary)',
          textDecoration: 'none', display: 'block', marginBottom: '2rem',
          transition: 'color 150ms'
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
        @{USERNAME} · LeetCode ↗
      </a>

      {/* 2-column: Stats card + LeetCard */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        alignItems: 'start',
      }} className="lc-grid">
        {/* Left: Stats card */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '2rem',
        }}>
          {/* Big number */}
          <p style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            fontWeight: 700,
            color: 'var(--text)',
            lineHeight: 1,
            margin: 0,
            opacity: loading ? 0.3 : 1,
            transition: 'opacity 300ms',
          }}>
            {stats.totalSolved}
          </p>
          <p style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '12px', color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '0.1em',
            marginTop: '8px',
          }}>
            Problems Solved
          </p>

          {/* Difficulty breakdown */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '1rem',
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border)',
          }}>
            {[
              { label: 'Easy', value: stats.easySolved, color: '#34d399' },
              { label: 'Medium', value: stats.mediumSolved, color: '#fbbf24' },
              { label: 'Hard', value: stats.hardSolved, color: '#f87171' },
            ].map(item => (
              <div key={item.label}>
                <p style={{
                  fontFamily: 'var(--font-geist-mono), monospace',
                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  fontWeight: 600,
                  color: 'var(--text)',
                  lineHeight: 1,
                  margin: 0,
                  opacity: loading ? 0.3 : 1,
                  transition: 'opacity 300ms',
                }}>
                  {item.value}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: item.color, display: 'inline-block',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-geist-mono), monospace',
                    fontSize: '10px', color: 'var(--text-muted)',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}>
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: LeetCard heatmap embed */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em',
            color: 'var(--text-muted)',
          }}>
            Activity heatmap
          </p>
          <img
            src={`https://leetcard.jacoblin.cool/${USERNAME}?theme=dark&font=Geist+Mono&ext=heatmap&border=0&radius=12`}
            alt="LeetCode stats card"
            style={{
              width: '100%', opacity: 0.85,
              display: 'block', borderRadius: '8px',
            }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .lc-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
