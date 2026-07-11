'use client'
import { useEffect, useState } from 'react'

// ⚠️ REPLACE THIS with your actual LeetCode username
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

  const statItems = [
    { label: 'Total Solved', value: stats.totalSolved },
    { label: 'Easy', value: stats.easySolved },
    { label: 'Medium', value: stats.mediumSolved },
    { label: 'Hard', value: stats.hardSolved },
  ]

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
          textDecoration: 'none', display: 'block', marginBottom: '3rem',
          transition: 'color 150ms'
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
        @{USERNAME} · LeetCode ↗
      </a>

      {/* Stats grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '2rem', marginBottom: '3rem'
      }}>
        {statItems.map(item => (
          <div key={item.label}>
            <p style={{
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 600, color: 'var(--text)', lineHeight: 1,
              opacity: loading ? 0.3 : 1, transition: 'opacity 300ms'
            }}>
              {item.value}
            </p>
            <p style={{
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: '11px', color: 'var(--text-muted)',
              textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '6px'
            }}>
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* LeetCard embed */}
      <div style={{ overflow: 'hidden', borderRadius: '12px' }}>
        <img
          src={`https://leetcard.jacoblin.cool/${USERNAME}?theme=dark&font=Geist+Mono&ext=heatmap&border=0&radius=12`}
          alt="LeetCode stats card"
          style={{
            maxWidth: '480px', width: '100%', opacity: 0.8,
            display: 'block', borderRadius: '12px'
          }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      </div>
    </section>
  )
}