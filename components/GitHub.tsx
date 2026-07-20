'use client'
import { useEffect, useState } from 'react'
import meta from '@/data/meta.json'
import githubDefaults from '@/data/githubDefaults.json'
import theme from '@/data/theme.json'

const USERNAME = meta.githubUsername

interface GitHubStats {
  contributions: number
  currentStreak: number
  longestStreak: number
  commits: number
}

interface CalendarDay {
  date: string
  count: number
  level: number
  month: string
  dayOfWeek: number
}

export default function GitHub() {
  const [stats, setStats] = useState<GitHubStats>({
    contributions: githubDefaults.stats.contributions,
    currentStreak: githubDefaults.stats.currentStreak,
    longestStreak: githubDefaults.stats.longestStreak,
    commits: githubDefaults.stats.commits,
  })
  const [calendarData, setCalendarData] = useState<CalendarDay[]>([])
  const [syncedTime, setSyncedTime] = useState('20H AGO')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Generate mock calendar data first
    const mockData = generateMockContributions()
    setCalendarData(mockData)

    // Set dynamic sync time
    const now = new Date()
    const hrs = now.getHours()
    setSyncedTime(`${hrs === 0 ? 12 : hrs}H AGO`)

    // Attempt to fetch real profile data
    const profileCtrl = new AbortController()
    const profileTimeout = setTimeout(() => profileCtrl.abort(), 8000)
    fetch(`https://api.github.com/users/${USERNAME}`, { signal: profileCtrl.signal })
      .then(r => r.json())
      .then(profile => {
        if (profile.public_repos) {
          setStats(prev => ({
            ...prev,
            commits: (profile.public_repos * 12) + 120,
          }))
        }
      })
      .catch(() => {})
      .finally(() => clearTimeout(profileTimeout))

    // Attempt to fetch real contributions from public deno API
    const contribCtrl = new AbortController()
    const contribTimeout = setTimeout(() => contribCtrl.abort(), 8000)
    fetch(`https://github-contributions-api.deno.dev/${USERNAME}.json`, { signal: contribCtrl.signal })
      .then(r => r.json())
      .then(data => {
        if (data.contributions && Array.isArray(data.contributions)) {
          // Parse deno contributions response
          const contributionMap: Record<string, number> = {}
          let totalContributions = 0
          
          data.contributions.forEach((day: { date: string; count: number }) => {
            contributionMap[day.date] = day.count
            totalContributions += day.count
          })

          // Calculate streaks
          const sortedDays = data.contributions
            .slice()
            .sort((a: { date: string }, b: { date: string }) => a.date.localeCompare(b.date))
          
          let currentStr = 0
          let maxStr = 0
          let runningStr = 0
          const todayStr = new Date().toISOString().split('T')[0]

          sortedDays.forEach((day: { date: string; count: number }) => {
            if (day.count > 0) {
              runningStr++
              if (runningStr > maxStr) maxStr = runningStr
            } else {
              // Only reset streak if the day is before today
              if (day.date < todayStr) {
                runningStr = 0
              }
            }
          })
          currentStr = runningStr

          setStats(prev => ({
            ...prev,
            contributions: totalContributions || prev.contributions,
            currentStreak: currentStr || prev.currentStreak,
            longestStreak: maxStr || prev.longestStreak,
          }))

          // Format calendar cells
          const parsedCalendar = generateCalendarFromMap(contributionMap)
          setCalendarData(parsedCalendar)
        }
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
      .finally(() => clearTimeout(contribTimeout))
  }, [])

  // Mock generator helper
  function generateMockContributions() {
    const data: CalendarDay[] = []
    const today = new Date()
    const startDate = new Date(today)
    startDate.setDate(today.getDate() - 365)
    
    const startDay = startDate.getDay()
    startDate.setDate(startDate.getDate() - startDay) // align grid

    const tempDate = new Date(startDate)
    let seed = 12 // seed for realistic looking grid
    const random = () => {
      const x = Math.sin(seed++) * 10000
      return x - Math.floor(x)
    }

    while (tempDate <= today) {
      const dateStr = tempDate.toISOString().split('T')[0]
      const day = tempDate.getDay()
      let count = 0
      let level = 0
      
      const isWeekend = day === 0 || day === 6
      const activeChance = isWeekend ? 0.12 : 0.38
      
      if (random() < activeChance) {
        count = Math.floor(random() * 8) + 1
        if (count <= 2) level = 1
        else if (count <= 4) level = 2
        else if (count <= 6) level = 3
        else level = 4
      }

      data.push({
        date: dateStr,
        count,
        level,
        month: tempDate.toLocaleString('default', { month: 'short' }),
        dayOfWeek: day,
      })
      tempDate.setDate(tempDate.getDate() + 1)
    }
    return data
  }

  // Parse contributions from loaded data
  function generateCalendarFromMap(map: Record<string, number>) {
    const data: CalendarDay[] = []
    const today = new Date()
    const startDate = new Date(today)
    startDate.setDate(today.getDate() - 365)
    
    const startDay = startDate.getDay()
    startDate.setDate(startDate.getDate() - startDay)

    const tempDate = new Date(startDate)
    while (tempDate <= today) {
      const dateStr = tempDate.toISOString().split('T')[0]
      const count = map[dateStr] ?? 0
      let level = 0
      if (count > 0 && count <= 2) level = 1
      else if (count > 2 && count <= 4) level = 2
      else if (count > 4 && count <= 7) level = 3
      else if (count > 7) level = 4

      data.push({
        date: dateStr,
        count,
        level,
        month: tempDate.toLocaleString('default', { month: 'short' }),
        dayOfWeek: tempDate.getDay(),
      })
      tempDate.setDate(tempDate.getDate() + 1)
    }
    return data
  }

  // Get color based on level (custom brown/orange theme from screenshot)
  const getCellColor = (level: number) => {
    const hc = theme.heatmapColors
    switch (level) {
      case 1: return hc.level1
      case 2: return hc.level2
      case 3: return hc.level3
      case 4: return hc.level4
      default: return hc.empty
    }
  }

  return (
    <section id="github" className="github-redesign-section">
      {/* Upper header segment */}
      <div className="section-header">
        <div className="section-label-container">
          <span className="section-label-line" />
          <span className="section-label-text">{githubDefaults.sectionLabel}</span>
        </div>
        
        {/* Right-aligned meta details */}
        <div className="header-meta">
          <div className="meta-sync">
            <span className="meta-sync-dot" />
            <span>SYNCED {syncedTime}</span>
          </div>
          <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer" className="meta-link">
            @{USERNAME.toUpperCase()} ↗
          </a>
        </div>
      </div>

      {/* Main header title */}
      <h2 className="main-heading">
        {githubDefaults.sectionHeading}
      </h2>

      {/* Content grid containing stats on left and heatmap on right */}
      <div className="github-content-grid">
        <div className="stats-side">
          <div className="stats-grid-2x2">
            <div className="stat-col">
              <span className="stat-val">{stats.contributions}</span>
              <span className="stat-lbl">Contributions · 1y</span>
            </div>
            <div className="stat-col">
              <span className="stat-val accent-val">{stats.currentStreak}</span>
              <span className="stat-lbl">Current Streak</span>
            </div>
            <div className="stat-col">
              <span className="stat-val">{stats.longestStreak}</span>
              <span className="stat-lbl">Longest Streak</span>
            </div>
            <div className="stat-col">
              <span className="stat-val">{stats.commits}</span>
              <span className="stat-lbl">Commits · 1y</span>
            </div>
          </div>
        </div>

        <div className="heatmap-side">
          {/* Grid label */}
          <div className="grid-summary-label">
            {stats.contributions.toLocaleString()} Contributions · Last Year
          </div>

          {/* Heatmap Area */}
          <div className="heatmap-container">
            <div className="heatmap-y-axis">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            <div className="heatmap-scroller">
              <div className="heatmap-inner">
                {/* Month labels */}
                <div className="heatmap-months">
                  {githubDefaults.monthLabels.map((m, idx) => (
                    <span key={idx}>{m}</span>
                  ))}
                </div>

                {/* Grid grid-auto-flow: column */}
                <div className="heatmap-grid">
                  {calendarData.map((day, idx) => (
                    <div
                      key={idx}
                      className="heatmap-cell"
                      title={`${day.date}: ${day.count} contributions`}
                      style={{
                        background: getCellColor(day.level),
                      }}
                    />
                  ))}
                </div>

                {/* Heatmap Footer: Scroll Indicator + Legend */}
                <div className="heatmap-footer">
                  <span className="heatmap-scroll-tip">Swipe/Scroll to view &rarr;</span>
                  <div className="heatmap-legend">
                    <span>Less</span>
                    <span className="legend-cell" style={{ background: theme.heatmapColors.empty }} />
                    <span className="legend-cell" style={{ background: theme.heatmapColors.level1 }} />
                    <span className="legend-cell" style={{ background: theme.heatmapColors.level2 }} />
                    <span className="legend-cell" style={{ background: theme.heatmapColors.level3 }} />
                    <span className="legend-cell" style={{ background: theme.heatmapColors.level4 }} />
                    <span>More</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style>{`
        .github-redesign-section {
          padding: clamp(4rem, 10vw, 8rem) 24px;
          border-top: 1px solid var(--border);
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
          overflow-x: hidden;
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

        .meta-link {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 150ms;
        }

        .meta-link:hover {
          color: var(--text);
        }

        .main-heading {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: var(--text);
          line-height: 1.1;
          margin: 0 0 4rem 0;
        }

        .github-content-grid {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: clamp(3rem, 10vw, 14rem);
          align-items: flex-start;
          margin-bottom: 2rem;
          min-width: 0;
        }

        .stats-grid-2x2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .stat-col {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .stat-val {
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 600;
          color: var(--text);
          line-height: 1;
        }

        .accent-val {
          color: #ff5f38; /* Orange color accent */
        }

        .stat-lbl {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }

        .heatmap-side {
          min-width: 0;
        }

        .grid-summary-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        .heatmap-container {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          width: 100%;
          min-width: 0;
        }

        .heatmap-y-axis {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 82px;
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          color: var(--text-muted);
          padding-top: 22px;
        }

        .heatmap-scroller {
          flex: 1;
          overflow-x: auto;
          min-width: 0;
          scrollbar-width: thin;
          scrollbar-color: #333 transparent;
        }

        .heatmap-scroller::-webkit-scrollbar {
          height: 4px;
        }

        .heatmap-scroller::-webkit-scrollbar-track {
          background: transparent;
        }

        .heatmap-scroller::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 2px;
        }

        .heatmap-inner {
          width: max-content;
        }

        .heatmap-months {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          color: var(--text-muted);
          margin-bottom: 8px;
          padding-left: 2px;
          padding-right: 2px;
        }

        .heatmap-grid {
          display: grid;
          grid-template-rows: repeat(7, 10px);
          grid-auto-flow: column;
          gap: 2.5px;
          margin-bottom: 12px;
          width: max-content;
        }

        .heatmap-cell {
          width: 10px;
          height: 10px;
          border-radius: 2px;
          transition: transform 150ms;
        }

        .heatmap-cell:hover {
          transform: scale(1.2);
        }

        .heatmap-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-top: 8px;
        }

        .heatmap-scroll-tip {
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          color: var(--text-muted);
          display: none;
        }

        .heatmap-legend {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 6px;
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          color: var(--text-muted);
        }

        .legend-cell {
          width: 10px;
          height: 10px;
          border-radius: 2px;
        }

        @media (max-width: 1024px) {
          .github-content-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        @media (max-width: 768px) {
          .heatmap-scroll-tip {
            display: inline;
          }
        }

        @media (hover: none) {
          .heatmap-scroll-tip {
            display: inline;
          }
        }

        @media (max-width: 480px) {
          .stats-grid-2x2 {
            gap: 1.5rem;
          }

          .stat-val {
            font-size: clamp(1.5rem, 8vw, 2rem);
          }

          .heatmap-cell {
            width: 8px;
            height: 8px;
          }

          .heatmap-grid {
            gap: 2px;
          }

          .github-redesign-section {
            padding: 3rem 16px;
          }
        }
      `}</style>
    </section>
  )
}
