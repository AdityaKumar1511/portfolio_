'use client'
import { useEffect, useRef, useState } from 'react'

import meta from '@/data/meta.json'

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
    totalSolved: 282,
    easySolved: 120,
    mediumSolved: 140,
    hardSolved: 22,
    ranking: '3,054,682',
    contestRating: 1542,
    contestGlobalRanking: 84320,
    topPercentage: 12.5,
    contestAttendance: 8,
  })

  const [cfStats, setCfStats] = useState<CodeforcesStats>({
    rating: 1204,
    maxRating: 1250,
    rank: 'pupil',
    maxRank: 'pupil',
    solvedCount: 145,
    contestsCount: 15,
    contribution: 0,
    friendOfCount: 12,
    avatar: 'https://userpic.codeforces.org/no-avatar.jpg',
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
    // Set dynamic sync time
    const now = new Date()
    const hrs = now.getHours()
    setSyncedTime(`${hrs === 0 ? 12 : hrs}H AGO`)

    const controllers = Array.from({ length: 5 }, () => new AbortController())
    const timeouts = controllers.map(c => setTimeout(() => c.abort(), 8000))

    // LeetCode Profile (Vercel-hosted, no cold starts)
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

    // LeetCode Contest (Vercel-hosted)
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

    // Codeforces Info
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

    // Codeforces Rating / Contests
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

    // Codeforces Status / Solved
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

  // Helper for Codeforces Rank Colors
  const getCfRankColor = (rankName: string) => {
    const r = rankName.toLowerCase()
    if (r.includes('newbie')) return '#e0e0e0' // soft white/gray
    if (r.includes('pupil')) return '#c2ebd4' // soft green
    if (r.includes('specialist')) return '#aed8e6' // soft cyan
    if (r.includes('expert')) return '#adcaff' // soft blue
    if (r.includes('candidate master')) return '#e8b4e8' // soft purple
    if (r.includes('master')) return '#ffd2a1' // soft orange
    if (r.includes('grandmaster')) return '#f9b6c3' // soft red
    return '#ffffff'
  }

  return (
    <section id="leetcode" className="leetcode-redesign-section">
      {/* Upper header segment */}
      <div className="section-header">
        <div className="section-label-container">
          <span className="section-label-line" />
          <span className="section-label-text">Competitive Programming</span>
        </div>

        {/* Right-aligned meta details */}
        <div className="header-meta">
          <div className="meta-sync">
            <span className="meta-sync-dot" />
            <span>SYNCED {syncedTime}</span>
          </div>
        </div>
      </div>

      {/* Main header title */}
      <h2 className="main-heading">
        Sharpening the algorithms.
      </h2>

      {/* Content grid containing side-by-side cards */}
      <div className="cp-content-grid">

        {/* LeetCode Card */}
        <div className="cp-card leetcode-card" ref={lcRef}>
          <div className="card-top">
            <div className="brand-info">
              <span className="brand-logo lc-logo"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.424 5.424 0 0 0 .349.987 5.317 5.317 0 0 0 1.163 1.612 6.174 6.174 0 0 0 1.484 1.016 5.602 5.602 0 0 0 1.466.506l.205.046a5.294 5.294 0 0 0 2.106-.054l.188-.044a3.93 3.93 0 0 0 1.113-.454l2.836-1.676a1.368 1.368 0 0 0-.213-2.406 1.363 1.363 0 0 0-.964-.048l-2.836 1.676a1.24 1.24 0 0 1-.358.133 2.458 2.458 0 0 1-1.14-.044l-.185-.042a2.874 2.874 0 0 1-.756-.264 3.335 3.335 0 0 1-.795-.544 2.6 2.6 0 0 1-.564-.782 2.698 2.698 0 0 1-.174-.494 2.755 2.755 0 0 1-.03-1.179 2.6 2.6 0 0 1 .59-1.04l3.854-4.126 5.406-5.788a.26.26 0 0 1 .38.012l2.72 2.913a.26.26 0 0 1-.013.38l-5.406 5.789a1.368 1.368 0 0 0 .998 2.314 1.363 1.363 0 0 0 1.003-.43l5.406-5.789a2.987 2.987 0 0 0 .089-4.182l-2.72-2.913A2.987 2.987 0 0 0 13.483 0z" /><path d="M3.483 14.196a1.368 1.368 0 0 0-.194 1.926l2.72 3.462a2.987 2.987 0 0 0 4.183.361l6.676-5.25a1.374 1.374 0 1 0-1.7-2.158l-6.676 5.25a.26.26 0 0 1-.362-.031l-2.72-3.462a1.368 1.368 0 0 0-1.927-.098z" /></svg></span>
              <div className="brand-details">
                <h3 className="brand-name">LeetCode</h3>
                <a href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`} target="_blank" rel="noreferrer" className="profile-link">
                  @{LEETCODE_USERNAME.toUpperCase()} ↗
                </a>
              </div>
            </div>
            {lcStats.ranking && (
              <span className="global-rank-badge">Rank #{lcStats.ranking}</span>
            )}
          </div>

          <div className="rating-display">
            <span className="rating-label">Contest Rating</span>
            <span className="rating-value">{lcContestRating}</span>
          </div>

          <div className="stats-sections">
            <div className="stats-section-block">
              <h4 className="block-title font-mono">Practice</h4>
              <div className="stats-2x2">
                <div className="stat-item">
                  <span className="stat-num">{lcTotalSolved}</span>
                  <span className="stat-name">Solved</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num lc-easy">{lcEasySolved}</span>
                  <span className="stat-name">Easy</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num lc-medium">{lcMediumSolved}</span>
                  <span className="stat-name">Medium</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num lc-hard">{lcHardSolved}</span>
                  <span className="stat-name">Hard</span>
                </div>
              </div>
            </div>

            <div className="stats-section-block">
              <h4 className="block-title font-mono">Contest</h4>
              <div className="stats-2x2">
                <div className="stat-item">
                  <span className="stat-num">{lcContestRating}</span>
                  <span className="stat-name">Rating</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">
                    {lcGlobalRanking > 0 ? `#${lcGlobalRanking.toLocaleString()}` : '—'}
                  </span>
                  <span className="stat-name">Global Rank</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">{lcTopPercent}%</span>
                  <span className="stat-name">Top %</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">{lcAttendance}</span>
                  <span className="stat-name">Attended</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Codeforces Card */}
        <div className="cp-card codeforces-card" ref={cfRef}>
          <div className="card-top">
            <div className="brand-info">
              <span className="brand-logo cf-logo"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M4.5 7.5A2.25 2.25 0 0 0 2.25 9.75v9a2.25 2.25 0 0 0 4.5 0v-9A2.25 2.25 0 0 0 4.5 7.5zm7.5-5.25A2.25 2.25 0 0 0 9.75 4.5v14.25a2.25 2.25 0 0 0 4.5 0V4.5A2.25 2.25 0 0 0 12 2.25zm7.5 10.5a2.25 2.25 0 0 0-2.25 2.25v3.75a2.25 2.25 0 0 0 4.5 0V15a2.25 2.25 0 0 0-2.25-2.25z" /></svg></span>
              <div className="brand-details">
                <h3 className="brand-name">Codeforces</h3>
                <a href={`https://codeforces.com/profile/${CODEFORCES_USERNAME}`} target="_blank" rel="noreferrer" className="profile-link">
                  @{CODEFORCES_USERNAME.toUpperCase()} ↗
                </a>
              </div>
            </div>
            <span className="global-rank-badge font-mono" style={{ color: getCfRankColor(cfStats.rank), borderColor: getCfRankColor(cfStats.rank) }}>
              {cfStats.rank ? cfStats.rank.toUpperCase() : 'NEWBIE'}
            </span>
          </div>

          <div className="rating-display">
            <span className="rating-label">Contest Rating</span>
            <span className="rating-value" style={{ color: getCfRankColor(cfStats.rank) }}>
              {cfRating > 0 ? cfRating : '—'}
            </span>
          </div>

          <div className="stats-sections">
            <div className="stats-section-block">
              <h4 className="block-title font-mono">Practice</h4>
              <div className="stats-2x2">
                <div className="stat-item">
                  <span className="stat-num">{cfSolvedCount}</span>
                  <span className="stat-name">Solved</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num font-semibold font-mono" style={{ color: getCfRankColor(cfStats.rank), fontSize: '13px', textTransform: 'capitalize' }}>
                    {cfStats.rank || 'newbie'}
                  </span>
                  <span className="stat-name">Current Rank</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num font-semibold font-mono" style={{ color: getCfRankColor(cfStats.maxRank), fontSize: '13px', textTransform: 'capitalize' }}>
                    {cfStats.maxRank || 'newbie'}
                  </span>
                  <span className="stat-name">Max Rank</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">{cfMaxRating > 0 ? cfMaxRating : '—'}</span>
                  <span className="stat-name">Max Rating</span>
                </div>
              </div>
            </div>

            <div className="stats-section-block">
              <h4 className="block-title font-mono">Contest</h4>
              <div className="stats-2x2">
                <div className="stat-item">
                  <span className="stat-num">{cfRating > 0 ? cfRating : '—'}</span>
                  <span className="stat-name">Rating</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">{cfContestsCount}</span>
                  <span className="stat-name">Contests</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">{cfContribution}</span>
                  <span className="stat-name">Contribution</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">{cfFriendOfCount}</span>
                  <span className="stat-name">Friends</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* CSS Styles */}
      <style>{`
        .leetcode-redesign-section {
          padding: clamp(4rem, 10vw, 8rem) 24px;
          border-top: 1px solid var(--border);
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .section-label-container {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .section-label-line {
          width: 24px;
          height: 1px;
          background: #ff5f38;
        }

        .section-label-text {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #ff5f38;
          font-weight: 700;
        }

        .header-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
        }

        .meta-sync {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          color: var(--text-muted);
        }

        .meta-sync-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ff5f38;
          display: inline-block;
        }

        .main-heading {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: var(--text);
          line-height: 1.1;
          margin: 0 0 3rem 0;
        }

        .cp-content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          width: 100%;
        }

        .cp-card {
          border-radius: 28px;
          padding: clamp(1.5rem, 4vw, 2.5rem);
          display: flex;
          flex-direction: column;
          gap: 2rem;
          color: #ffffff;
        }

        .leetcode-card {
          background: #FF9800;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .codeforces-card {
          background: #009BB4;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .leetcode-card:hover,
        .codeforces-card:hover {
          border-color: rgba(255, 255, 255, 0.4);
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .brand-info {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .brand-logo {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          font-family: var(--font-geist-mono), monospace;
        }

        .lc-logo {
          background: #ffffff;
          color: #d69730;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .cf-logo {
          background: #ffffff;
          color: #4a729f;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .brand-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .brand-name {
          font-size: 18px;
          font-weight: 600;
          color: #000000;
          margin: 0;
        }

        .profile-link {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: color 150ms;
        }

        .profile-link:hover {
          color: #000000;
        }

        .global-rank-badge {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          color: #000000;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 6px 14px;
          border-radius: 99px;
        }

        .rating-display {
          display: flex;
          flex-direction: column;
          gap: 6px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          padding-bottom: 1.5rem;
        }

        .rating-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.7);
        }

        .rating-value {
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(2.25rem, 4vw, 2.75rem);
          font-weight: 700;
          color: #000000;
          line-height: 1;
        }

        .stats-sections {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .stats-section-block {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .block-title {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #000000;
          margin: 0;
          border-left: 2px solid #000000;
          padding-left: 8px;
          line-height: 1;
        }

        .stats-2x2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem 1rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-num {
          font-family: var(--font-geist-mono), monospace;
          font-size: 18px;
          font-weight: 600;
          color: #000000;
          line-height: 1.2;
        }

        .stat-name {
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.85);
          letter-spacing: 0.05em;
        }

        .lc-easy {
          color: #c2ebd4;
        }

        .lc-medium {
          color: #fce69a;
        }

        .lc-hard {
          color: #f9b6c3;
        }

        @media (max-width: 1024px) {
          .cp-content-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 580px) {
          .stats-sections {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 480px) {
          .cp-card {
            padding: 1.25rem;
            border-radius: 20px;
          }

          .stat-num {
            font-size: 15px;
          }

          .rating-value {
            font-size: clamp(1.75rem, 8vw, 2.25rem);
          }

          .leetcode-redesign-section {
            padding: 3rem 16px;
          }
        }
      `}</style>
    </section>
  )
}
