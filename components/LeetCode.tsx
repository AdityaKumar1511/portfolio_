'use client'
import { useEffect, useState } from 'react'

const LEETCODE_USERNAME = 'Adi_2007'
const CODEFORCES_USERNAME = 'aditya.kumar00706'

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

export default function LeetCode() {
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

  useEffect(() => {
    // Set dynamic sync time
    const now = new Date()
    const hrs = now.getHours()
    setSyncedTime(`${hrs === 0 ? 12 : hrs}H AGO`)

    // LeetCode Profile
    fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${LEETCODE_USERNAME}`)
      .then(r => r.json())
      .then(data => {
        if (data && data.totalSolved !== undefined) {
          setLcStats(prev => ({
            ...prev,
            totalSolved: data.totalSolved,
            easySolved: data.easySolved,
            mediumSolved: data.mediumSolved,
            hardSolved: data.hardSolved,
            ranking: data.ranking ? Number(data.ranking).toLocaleString() : prev.ranking,
          }))
        }
      })
      .catch(() => {})

    // LeetCode Contest
    fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/contest`)
      .then(r => r.json())
      .then(data => {
        if (data && data.contestRating !== undefined) {
          setLcStats(prev => ({
            ...prev,
            contestRating: Math.round(data.contestRating),
            contestGlobalRanking: data.contestGlobalRanking || prev.contestGlobalRanking,
            topPercentage: data.topPercentage || prev.topPercentage,
            contestAttendance: data.contestAttendance || (data.contestParticipation ? data.contestParticipation.filter((p: any) => p.attended).length : prev.contestAttendance),
          }))
        }
      })
      .catch(() => {})

    // Codeforces Info
    fetch(`https://codeforces.com/api/user.info?handles=${CODEFORCES_USERNAME}`)
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
      .catch(() => {})

    // Codeforces Rating / Contests
    fetch(`https://codeforces.com/api/user.rating?handle=${CODEFORCES_USERNAME}`)
      .then(r => r.json())
      .then(data => {
        if (data && data.status === 'OK' && Array.isArray(data.result)) {
          setCfStats(prev => ({
            ...prev,
            contestsCount: data.result.length,
          }))
        }
      })
      .catch(() => {})

    // Codeforces Status / Solved
    fetch(`https://codeforces.com/api/user.status?handle=${CODEFORCES_USERNAME}`)
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
  }, [])

  // Helper for Codeforces Rank Colors
  const getCfRankColor = (rankName: string) => {
    const r = rankName.toLowerCase()
    if (r.includes('newbie')) return '#9e9e9e' // gray
    if (r.includes('pupil')) return '#4caf50' // green
    if (r.includes('specialist')) return '#00bcd4' // cyan
    if (r.includes('expert')) return '#2196f3' // blue
    if (r.includes('candidate master')) return '#aa00aa' // violet
    if (r.includes('master')) return '#ff9800' // orange
    if (r.includes('grandmaster')) return '#f44336' // red
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
        <div className="cp-card leetcode-card">
          <div className="card-top">
            <div className="brand-info">
              <span className="brand-logo lc-logo">LC</span>
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
            <span className="rating-value">{lcStats.contestRating}</span>
          </div>

          <div className="stats-sections">
            <div className="stats-section-block">
              <h4 className="block-title font-mono">Practice</h4>
              <div className="stats-2x2">
                <div className="stat-item">
                  <span className="stat-num">{lcStats.totalSolved}</span>
                  <span className="stat-name">Solved</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num lc-easy">{lcStats.easySolved}</span>
                  <span className="stat-name">Easy</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num lc-medium">{lcStats.mediumSolved}</span>
                  <span className="stat-name">Medium</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num lc-hard">{lcStats.hardSolved}</span>
                  <span className="stat-name">Hard</span>
                </div>
              </div>
            </div>

            <div className="stats-section-block">
              <h4 className="block-title font-mono">Contest</h4>
              <div className="stats-2x2">
                <div className="stat-item">
                  <span className="stat-num">{lcStats.contestRating}</span>
                  <span className="stat-name">Rating</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">
                    {lcStats.contestGlobalRanking > 0 ? `#${lcStats.contestGlobalRanking.toLocaleString()}` : '—'}
                  </span>
                  <span className="stat-name">Global Rank</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">{lcStats.topPercentage}%</span>
                  <span className="stat-name">Top %</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">{lcStats.contestAttendance}</span>
                  <span className="stat-name">Attended</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Codeforces Card */}
        <div className="cp-card codeforces-card">
          <div className="card-top">
            <div className="brand-info">
              <span className="brand-logo cf-logo">CF</span>
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
              {cfStats.rating > 0 ? cfStats.rating : '—'}
            </span>
          </div>

          <div className="stats-sections">
            <div className="stats-section-block">
              <h4 className="block-title font-mono">Practice</h4>
              <div className="stats-2x2">
                <div className="stat-item">
                  <span className="stat-num">{cfStats.solvedCount}</span>
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
                  <span className="stat-num">{cfStats.maxRating > 0 ? cfStats.maxRating : '—'}</span>
                  <span className="stat-name">Max Rating</span>
                </div>
              </div>
            </div>

            <div className="stats-section-block">
              <h4 className="block-title font-mono">Contest</h4>
              <div className="stats-2x2">
                <div className="stat-item">
                  <span className="stat-num">{cfStats.rating > 0 ? cfStats.rating : '—'}</span>
                  <span className="stat-name">Rating</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">{cfStats.contestsCount}</span>
                  <span className="stat-name">Contests</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">{cfStats.contribution}</span>
                  <span className="stat-name">Contribution</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">{cfStats.friendOfCount}</span>
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
          align-items: flex-start;
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
          background: var(--text-muted);
        }

        .section-label-text {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
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
          background: #111111;
          border: 1px solid var(--border);
          border-radius: 28px;
          padding: clamp(1.5rem, 4vw, 2.5rem);
          display: flex;
          flex-direction: column;
          gap: 2rem;
          transition: all 400ms cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .cp-card:hover {
          transform: translateY(-4px);
        }

        .leetcode-card:hover {
          border-color: rgba(255, 161, 22, 0.3);
          box-shadow: 0 20px 45px rgba(255, 161, 22, 0.04);
        }

        .codeforces-card:hover {
          border-color: rgba(59, 130, 246, 0.3);
          box-shadow: 0 20px 45px rgba(59, 130, 246, 0.04);
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
          background: rgba(255, 161, 22, 0.08);
          color: #ffa116;
          border: 1px solid rgba(255, 161, 22, 0.15);
        }

        .cf-logo {
          background: rgba(59, 130, 246, 0.08);
          color: #3b82f6;
          border: 1px solid rgba(59, 130, 246, 0.15);
        }

        .brand-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .brand-name {
          font-size: 18px;
          font-weight: 600;
          color: var(--text);
          margin: 0;
        }

        .profile-link {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 150ms;
        }

        .profile-link:hover {
          color: var(--text);
        }

        .global-rank-badge {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 6px 14px;
          border-radius: 99px;
        }

        .rating-display {
          display: flex;
          flex-direction: column;
          gap: 6px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 1.5rem;
        }

        .rating-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }

        .rating-value {
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(2.25rem, 4vw, 2.75rem);
          font-weight: 700;
          color: var(--text);
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
          color: var(--text-muted);
          margin: 0;
          border-left: 2px solid;
          padding-left: 8px;
          line-height: 1;
        }

        .leetcode-card .block-title {
          border-color: #ffa116;
        }

        .codeforces-card .block-title {
          border-color: #3b82f6;
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
          color: var(--text);
          line-height: 1.2;
        }

        .stat-name {
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .lc-easy {
          color: #00b8a3;
        }

        .lc-medium {
          color: #ffc01e;
        }

        .lc-hard {
          color: #ff2d55;
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
      `}</style>
    </section>
  )
}
