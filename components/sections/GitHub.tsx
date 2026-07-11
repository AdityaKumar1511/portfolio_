'use client'
import { useEffect, useState } from 'react'

interface GitHubEvent {
  type: string
  repo: { name: string }
  created_at: string
}

const USERNAME = 'AdityaKumar1511'

export default function GitHub() {
  const [events, setEvents] = useState<GitHubEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=10`)
      .then(r => r.json())
      .then((data: GitHubEvent[]) => {
        setEvents(Array.isArray(data) ? data.slice(0, 7) : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const getIcon = (type: string) => {
    if (type === 'PushEvent') return '↑'
    if (type === 'ForkEvent') return '⑂'
    if (type === 'CreateEvent') return '✦'
    if (type === 'PullRequestEvent') return '⇄'
    return '·'
  }

  const getLabel = (e: GitHubEvent) => {
    const repo = e.repo.name.split('/')[1]
    if (e.type === 'PushEvent') return `Pushed commits to main · ${repo}`
    if (e.type === 'ForkEvent') return `Forked a repository · ${repo}`
    if (e.type === 'CreateEvent') return `Created repository · ${repo}`
    if (e.type === 'PullRequestEvent') return `Pull request · ${repo}`
    return `Activity · ${repo}`
  }

  return (
    <section id="github" style={{
      padding: 'clamp(4rem,10vw,8rem) 24px',
      borderTop: '1px solid var(--border)',
      maxWidth: '1400px',
      margin: '0 auto',
      width: '100%',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: '3rem' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em',
            color: 'var(--text-muted)', marginBottom: '12px' }}>
            Open source
          </p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 500,
            letterSpacing: '-0.02em', color: 'var(--text)', lineHeight: 1.15 }}>
            Building in public.
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px',
          border: '1px solid var(--border)', borderRadius: '4px',
          padding: '4px 10px' }}>
          <span className="pulse-dot" style={{ width: '6px', height: '6px',
            borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '10px', color: 'var(--text-muted)' }}>
            Live
          </span>
        </div>
      </div>

      <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer"
        style={{ fontFamily: 'var(--font-geist-mono), monospace',
          fontSize: '13px', color: 'var(--text-secondary)',
          textDecoration: 'none', display: 'block', marginBottom: '3rem',
          transition: 'color 150ms' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
        @{USERNAME} ↗
      </a>

      {/* Heatmap */}
      <div style={{ marginBottom: '3rem', overflow: 'hidden', borderRadius: '8px' }}>
        <img
          src={`https://ghchart.rshah.org/444444/${USERNAME}`}
          alt="GitHub contributions"
          style={{ width: '100%', maxWidth: '600px',
            filter: 'invert(1) opacity(0.2)', display: 'block' }}
        />
      </div>

      {/* Recent activity */}
      <div>
        <p style={{ fontFamily: 'var(--font-geist-mono), monospace',
          fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em',
          color: 'var(--text-muted)', marginBottom: '12px' }}>
          Recent activity
        </p>
        <h3 style={{ fontSize: '18px', fontWeight: 500, color: 'var(--text)',
          marginBottom: '1.5rem' }}>
          Latest pushes &amp; pull requests.
        </h3>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{ height: '44px', background: 'var(--surface)',
                borderRadius: '6px', opacity: 0.5 }} />
            ))}
          </div>
        ) : events.length > 0 ? (
          <div>
            {events.map((event, i) => (
              <a key={i}
                href={`https://github.com/${event.repo.name}`}
                target="_blank" rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '12px',
                  borderBottom: '1px solid var(--border)', padding: '12px 8px',
                  textDecoration: 'none', transition: 'background 150ms',
                  borderRadius: '4px', margin: '0 -8px' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <span style={{ fontFamily: 'var(--font-geist-mono), monospace',
                  color: 'var(--text-muted)', fontSize: '13px',
                  width: '16px', flexShrink: 0 }}>
                  {getIcon(event.type)}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {getLabel(event)}
                </span>
              </a>
            ))}
          </div>
        ) : (
          <p style={{ fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '12px', color: 'var(--text-muted)' }}>
            No recent activity found.
          </p>
        )}
      </div>
    </section>
  )
}