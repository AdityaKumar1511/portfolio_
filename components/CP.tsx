'use client'
import { useEffect, useRef, useState } from 'react'

import meta from '@/data/meta.json'
import cpDefaults from '@/data/cpDefaults.json'
import theme from '@/data/theme.json'
import FadeIn from './FadeIn'

const LEETCODE_USERNAME = meta.leetcodeUsername
const CODEFORCES_USERNAME = meta.codeforcesUsername

interface LeetCodeStats {
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  ranking: number | string
  contestRating: number
  contestGlobalRanking: number
  topPercentage: number
  contestAttendance: number
}

interface CodeforcesStats {
  rating: number
  maxRating: number
  rank: string
  maxRank: string
  solvedCount: number
  contestsCount: number
  contribution: number
  friendOfCount: number
  avatar: string
}

function useCardVisibility(ref: { current: HTMLElement | null }): boolean {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
  return visible
}

function useCountUp(target: number, visible: boolean, duration = 1200): number {
  const [value, setValue] = useState(0)
  const animated = useRef(false)
  const targetRef = useRef(target)
  targetRef.current = target

  useEffect(() => {
    if (!visible || animated.current) return
    animated.current = true
    const finalTarget = targetRef.current
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(2, -10 * progress)
      setValue(Math.round(eased * finalTarget))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [visible, duration])

  return value
}

export default function CP() {
  const [lcStats, setLcStats] = useState<LeetCodeStats>({
    totalSolved: cpDefaults.leetcode.totalSolved,
    easySolved: cpDefaults.leetcode.easySolved,
    mediumSolved: cpDefaults.leetcode.mediumSolved,
    hardSolved: cpDefaults.leetcode.hardSolved,
    ranking: cpDefaults.leetcode.ranking,
    contestRating: cpDefaults.leetcode.contestRating,
    contestGlobalRanking: cpDefaults.leetcode.contestGlobalRanking,
    topPercentage: cpDefaults.leetcode.topPercentage,
    contestAttendance: cpDefaults.leetcode.contestAttendance,
  })

  const [cfStats, setCfStats] = useState<CodeforcesStats>({
    rating: cpDefaults.codeforces.rating,
    maxRating: cpDefaults.codeforces.maxRating,
    rank: cpDefaults.codeforces.rank,
    maxRank: cpDefaults.codeforces.maxRank,
    solvedCount: cpDefaults.codeforces.solvedCount,
    contestsCount: cpDefaults.codeforces.contestsCount,
    contribution: cpDefaults.codeforces.contribution,
    friendOfCount: cpDefaults.codeforces.friendOfCount,
    avatar: cpDefaults.codeforces.avatar,
  })

  const [syncedTime, setSyncedTime] = useState('20H AGO')
  const [loading, setLoading] = useState(true)

  const lcRef = useRef<HTMLDivElement>(null)
  const cfRef = useRef<HTMLDivElement>(null)
  const lcVisible = useCardVisibility(lcRef)
  const cfVisible = useCardVisibility(cfRef)

  const lcTotalSolved = useCountUp(lcStats.totalSolved, lcVisible)
  const lcEasySolved = useCountUp(lcStats.easySolved, lcVisible)
  const lcMediumSolved = useCountUp(lcStats.mediumSolved, lcVisible)
  const lcHardSolved = useCountUp(lcStats.hardSolved, lcVisible)
  const lcContestRating = useCountUp(lcStats.contestRating, lcVisible)
  const lcGlobalRanking = useCountUp(lcStats.contestGlobalRanking, lcVisible)
  const lcTopPercent = useCountUp(lcStats.topPercentage, lcVisible)
  const lcAttendance = useCountUp(lcStats.contestAttendance, lcVisible)

  const cfSolvedCount = useCountUp(cfStats.solvedCount, cfVisible)
  const cfRating = useCountUp(cfStats.rating, cfVisible)
  const cfMaxRating = useCountUp(cfStats.maxRating, cfVisible)
  const cfContestsCount = useCountUp(cfStats.contestsCount, cfVisible)
  const cfContribution = useCountUp(cfStats.contribution, cfVisible)
  const cfFriendOfCount = useCountUp(cfStats.friendOfCount, cfVisible)

  useEffect(() => {
    const now = new Date()
    const hrs = now.getHours()
    setSyncedTime(`${hrs === 0 ? 12 : hrs}H AGO`)

    const controllers = Array.from({ length: 5 }, () => new AbortController())
    const timeouts = controllers.map(c => setTimeout(() => c.abort(), 8000))

    fetch(`https://leetcode-api-pied.vercel.app/user/${LEETCODE_USERNAME}`, { signal: controllers[0].signal })
      .then(r => r.json())
      .then(data => {
        if (data && data.submitStats) {
          const stats = data.submitStats.acSubmissionNum || []
          const find = (d: string) => stats.find((s: { difficulty: string; count: number }) => s.difficulty === d)?.count || 0
          setLcStats(prev => ({
            ...prev,
            totalSolved: find('All'),
            easySolved: find('Easy'),
            mediumSolved: find('Medium'),
            hardSolved: find('Hard'),
            ranking: data.profile?.ranking ? Number(data.profile.ranking).toLocaleString() : prev.ranking,
          }))
        }
      })
      .catch(() => { })
      .finally(() => clearTimeout(timeouts[0]))

    fetch(`https://leetcode-api-pied.vercel.app/user/${LEETCODE_USERNAME}/contests`, { signal: controllers[1].signal })
      .then(r => r.json())
      .then(data => {
        const history = data?.userContestRankingHistory
        if (Array.isArray(history)) {
          const attended = history.filter((h: { attended: boolean }) => h.attended)
          if (attended.length > 0) {
            const avgRating = attended.reduce((sum: number, h: { rating: number }) => sum + (h.rating || 0), 0) / attended.length
            const latest = attended[attended.length - 1]
            setLcStats(prev => ({
              ...prev,
              contestRating: Math.round(avgRating),
              contestGlobalRanking: latest.ranking || prev.contestGlobalRanking,
              topPercentage: prev.topPercentage,
              contestAttendance: attended.length,
            }))
          }
        }
      })
      .catch(() => { })
      .finally(() => clearTimeout(timeouts[1]))

    fetch(`https://codeforces.com/api/user.info?handles=${CODEFORCES_USERNAME}`, { signal: controllers[2].signal })
      .then(r => r.json())
      .then(data => {
        if (data && data.status === 'OK' && data.result && data.result[0]) {
          const info = data.result[0]
          setCfStats(prev => ({
            ...prev,
            rating: info.rating || prev.rating,
            maxRating: info.maxRating || prev.maxRating,
            rank: info.rank || prev.rank,
            maxRank: info.maxRank || prev.maxRank,
            contribution: info.contribution !== undefined ? info.contribution : prev.contribution,
            friendOfCount: info.friendOfCount !== undefined ? info.friendOfCount : prev.friendOfCount,
            avatar: info.avatar || prev.avatar,
          }))
        }
      })
      .catch(() => { })
      .finally(() => clearTimeout(timeouts[2]))

    fetch(`https://codeforces.com/api/user.rating?handle=${CODEFORCES_USERNAME}`, { signal: controllers[3].signal })
      .then(r => r.json())
      .then(data => {
        if (data && data.status === 'OK' && Array.isArray(data.result)) {
          setCfStats(prev => ({
            ...prev,
            contestsCount: data.result.length,
          }))
        }
      })
      .catch(() => { })
      .finally(() => clearTimeout(timeouts[3]))

    fetch(`https://codeforces.com/api/user.status?handle=${CODEFORCES_USERNAME}`, { signal: controllers[4].signal })
      .then(r => r.json())
      .then(data => {
        if (data && data.status === 'OK' && Array.isArray(data.result)) {
          const solved = new Set()
          data.result.forEach((submission: any) => {
            if (submission.verdict === 'OK' && submission.problem) {
              const contestId = submission.problem.contestId
              const index = submission.problem.index
              solved.add(`${contestId}-${index}`)
            }
          })
          setCfStats(prev => ({
            ...prev,
            solvedCount: solved.size || prev.solvedCount,
          }))
        }
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
      .finally(() => clearTimeout(timeouts[4]))
  }, [])

  const getCfRankColor = (rankName: string) => {
    const r = rankName.toLowerCase()
    for (const [key, color] of Object.entries(theme.cfRankColors)) {
      if (r.includes(key)) return color
    }
    return theme.cfRankColors.default
  }

  return (
    <section id="leetcode" className="cp-section">
      <FadeIn>
      <div className="cp-header">
        <div className="cp-label-container">
          <span className="cp-label-line" />
          <span className="cp-label-text">{cpDefaults.sectionLabel}</span>
        </div>
        <div className="cp-header-meta">
          <div className="cp-sync">
            <span className="cp-sync-dot" />
            <span>SYNCED {syncedTime}</span>
          </div>
        </div>
      </div>
      </FadeIn>

      <FadeIn delay={0.1}>
      <h2 className="cp-heading">
        {cpDefaults.sectionHeading}
      </h2>
      </FadeIn>

      <div className="cp-grid">

        <FadeIn delay={0.2}>
        <div className="cp-card" ref={lcRef}>
          <div className="cp-card-left-accent" style={{ background: '#FF9800' }} />
          <div className="cp-card-inner">
            <div className="cp-card-top">
              <div className="cp-brand">
                <span className="cp-brand-icon" style={{ color: '#FF9800' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.424 5.424 0 0 0 .349.987 5.317 5.317 0 0 0 1.163 1.612 6.174 6.174 0 0 0 1.484 1.016 5.602 5.602 0 0 0 1.466.506l.205.046a5.294 5.294 0 0 0 2.106-.054l.188-.044a3.93 3.93 0 0 0 1.113-.454l2.836-1.676a1.368 1.368 0 0 0-.213-2.406 1.363 1.363 0 0 0-.964-.048l-2.836 1.676a1.24 1.24 0 0 1-.358.133 2.458 2.458 0 0 1-1.14-.044l-.185-.042a2.874 2.874 0 0 1-.756-.264 3.335 3.335 0 0 1-.795-.544 2.6 2.6 0 0 1-.564-.782 2.698 2.698 0 0 1-.174-.494 2.755 2.755 0 0 1-.03-1.179 2.6 2.6 0 0 1 .59-1.04l3.854-4.126 5.406-5.788a.26.26 0 0 1 .38.012l2.72 2.913a.26.26 0 0 1-.013.38l-5.406 5.789a1.368 1.368 0 0 0 .998 2.314 1.363 1.363 0 0 0 1.003-.43l5.406-5.789a2.987 2.987 0 0 0 .089-4.182l-2.72-2.913A2.987 2.987 0 0 0 13.483 0z" /><path d="M3.483 14.196a1.368 1.368 0 0 0-.194 1.926l2.72 3.462a2.987 2.987 0 0 0 4.183.361l6.676-5.25a1.374 1.374 0 1 0-1.7-2.158l-6.676 5.25a.26.26 0 0 1-.362-.031l-2.72-3.462a1.368 1.368 0 0 0-1.927-.098z" /></svg>
                </span>
                <div className="cp-brand-text">
                  <span className="cp-brand-name">LeetCode</span>
                  <a href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`} target="_blank" rel="noreferrer" className="cp-profile-link">
                    @{LEETCODE_USERNAME.toUpperCase()} ↗
                  </a>
                </div>
              </div>
              {lcStats.ranking && (
                <span className="cp-rank-badge">#{lcStats.ranking}</span>
              )}
            </div>

            <div className="cp-rating-row">
              <span className="cp-rating-label">Contest Rating</span>
              <span className="cp-rating-value">{lcContestRating}</span>
            </div>

            <hr className="cp-divider" />

            <div className="cp-stats-row">
              <div className="cp-stat">
                <span className="cp-stat-value">{lcTotalSolved}</span>
                <span className="cp-stat-label">Solved</span>
              </div>
              <div className="cp-stat">
                <span className="cp-stat-value cp-lc-easy">{lcEasySolved}</span>
                <span className="cp-stat-label">Easy</span>
              </div>
              <div className="cp-stat">
                <span className="cp-stat-value cp-lc-medium">{lcMediumSolved}</span>
                <span className="cp-stat-label">Medium</span>
              </div>
              <div className="cp-stat">
                <span className="cp-stat-value cp-lc-hard">{lcHardSolved}</span>
                <span className="cp-stat-label">Hard</span>
              </div>
            </div>

            <hr className="cp-divider" />

            <div className="cp-stats-row">
              <div className="cp-stat">
                <span className="cp-stat-value">
                  {lcGlobalRanking > 0 ? `#${lcGlobalRanking.toLocaleString()}` : '—'}
                </span>
                <span className="cp-stat-label">Global Rank</span>
              </div>
              <div className="cp-stat">
                <span className="cp-stat-value">{lcTopPercent}%</span>
                <span className="cp-stat-label">Top %</span>
              </div>
              <div className="cp-stat">
                <span className="cp-stat-value">{lcAttendance}</span>
                <span className="cp-stat-label">Contests</span>
              </div>
              <div className="cp-stat">
                <a href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`} target="_blank" rel="noreferrer" className="cp-card-link">
                  Profile ↗
                </a>
              </div>
            </div>
          </div>
        </div>
        </FadeIn>

        <FadeIn delay={0.3}>
        <div className="cp-card" ref={cfRef}>
          <div className="cp-card-left-accent" style={{ background: '#009BB4' }} />
          <div className="cp-card-inner">
            <div className="cp-card-top">
              <div className="cp-brand">
                <span className="cp-brand-icon" style={{ color: '#009BB4' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4.5 7.5A2.25 2.25 0 0 0 2.25 9.75v9a2.25 2.25 0 0 0 4.5 0v-9A2.25 2.25 0 0 0 4.5 7.5zm7.5-5.25A2.25 2.25 0 0 0 9.75 4.5v14.25a2.25 2.25 0 0 0 4.5 0V4.5A2.25 2.25 0 0 0 12 2.25zm7.5 10.5a2.25 2.25 0 0 0-2.25 2.25v3.75a2.25 2.25 0 0 0 4.5 0V15a2.25 2.25 0 0 0-2.25-2.25z" /></svg>
                </span>
                <div className="cp-brand-text">
                  <span className="cp-brand-name">Codeforces</span>
                  <a href={`https://codeforces.com/profile/${CODEFORCES_USERNAME}`} target="_blank" rel="noreferrer" className="cp-profile-link">
                    @{CODEFORCES_USERNAME.toUpperCase()} ↗
                  </a>
                </div>
              </div>
              <span className="cp-rank-badge" style={{ color: getCfRankColor(cfStats.rank), borderColor: getCfRankColor(cfStats.rank) }}>
                {cfStats.rank ? cfStats.rank.toUpperCase() : 'NEWBIE'}
              </span>
            </div>

            <div className="cp-rating-row">
              <span className="cp-rating-label">Contest Rating</span>
              <span className="cp-rating-value" style={{ color: getCfRankColor(cfStats.rank) }}>
                {cfRating > 0 ? cfRating : '—'}
              </span>
            </div>

            <hr className="cp-divider" />

            <div className="cp-stats-row">
              <div className="cp-stat">
                <span className="cp-stat-value">{cfSolvedCount}</span>
                <span className="cp-stat-label">Solved</span>
              </div>
              <div className="cp-stat">
                <span className="cp-stat-value" style={{ color: getCfRankColor(cfStats.rank), fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}>
                  {cfStats.rank || 'newbie'}
                </span>
                <span className="cp-stat-label">Rank</span>
              </div>
              <div className="cp-stat">
                <span className="cp-stat-value" style={{ color: getCfRankColor(cfStats.maxRank), fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}>
                  {cfStats.maxRank || 'newbie'}
                </span>
                <span className="cp-stat-label">Max Rank</span>
              </div>
              <div className="cp-stat">
                <span className="cp-stat-value">{cfMaxRating > 0 ? cfMaxRating : '—'}</span>
                <span className="cp-stat-label">Max Rating</span>
              </div>
            </div>

            <hr className="cp-divider" />

            <div className="cp-stats-row">
              <div className="cp-stat">
                <span className="cp-stat-value">{cfContestsCount}</span>
                <span className="cp-stat-label">Contests</span>
              </div>
              <div className="cp-stat">
                <span className="cp-stat-value">{cfContribution}</span>
                <span className="cp-stat-label">Contribution</span>
              </div>
              <div className="cp-stat">
                <span className="cp-stat-value">{cfFriendOfCount}</span>
                <span className="cp-stat-label">Friends</span>
              </div>
              <div className="cp-stat">
                <a href={`https://codeforces.com/profile/${CODEFORCES_USERNAME}`} target="_blank" rel="noreferrer" className="cp-card-link">
                  Profile ↗
                </a>
              </div>
            </div>
          </div>
        </div>
        </FadeIn>

      </div>

      <style>{`
        .cp-section {
          padding: clamp(4rem, 10vw, 8rem) 48px;
          border-top: 1px solid var(--border);
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        .cp-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .cp-label-container {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .cp-label-line {
          width: 24px;
          height: 1px;
          background: #ff5f38;
        }

        .cp-label-text {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #ff5f38;
          font-weight: 700;
        }

        .cp-header-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
        }

        .cp-sync {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          color: var(--text-muted);
        }

        .cp-sync-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ff5f38;
          display: inline-block;
        }

        .cp-heading {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: var(--text);
          line-height: 1.1;
          margin: 0 0 3rem 0;
        }

        .cp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          width: 100%;
        }

        .cp-card {
          position: relative;
          background: #111111;
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          transition: border-color 200ms ease;
        }

        .cp-card:hover {
          border-color: rgba(255, 255, 255, 0.15);
        }

        .cp-card-left-accent {
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          border-radius: 20px 0 0 20px;
        }

        .cp-card-inner {
          padding: clamp(1.5rem, 3vw, 2rem);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .cp-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .cp-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .cp-brand-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .cp-brand-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .cp-brand-name {
          font-size: 16px;
          font-weight: 600;
          color: var(--text);
        }

        .cp-profile-link {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 150ms;
        }

        .cp-profile-link:hover {
          color: var(--text);
        }

        .cp-rank-badge {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
          padding: 5px 12px;
          border-radius: 99px;
          white-space: nowrap;
        }

        .cp-rating-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cp-rating-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }

        .cp-rating-value {
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 600;
          color: var(--text);
          line-height: 1;
        }

        .cp-divider {
          border: none;
          border-top: 1px dashed rgba(255, 255, 255, 0.08);
          margin: 0;
        }

        .cp-stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .cp-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cp-stat-value {
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          font-weight: 600;
          color: var(--text);
          line-height: 1.2;
        }

        .cp-stat-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }

        .cp-lc-easy {
          color: #c2ebd4;
        }

        .cp-lc-medium {
          color: #fce69a;
        }

        .cp-lc-hard {
          color: #f9b6c3;
        }

        .cp-card-link {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          font-weight: 600;
          color: #ff5f38;
          text-decoration: none;
          transition: opacity 150ms;
          align-self: flex-start;
          padding-top: 4px;
        }

        .cp-card-link:hover {
          opacity: 0.7;
        }

        @media (max-width: 1024px) {
          .cp-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 580px) {
          .cp-stats-row {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .cp-section {
            padding: 3rem 20px;
          }

          .cp-card-inner {
            padding: 1.25rem;
          }

          .cp-stat-value {
            font-size: 1rem;
          }

          .cp-rating-value {
            font-size: clamp(1.75rem, 8vw, 2.25rem);
          }
        }
      `}</style>
    </section>
  )
}
