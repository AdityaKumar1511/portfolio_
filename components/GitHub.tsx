'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import meta from '@/data/meta.json'
import githubDefaults from '@/data/githubDefaults.json'
import theme from '@/data/theme.json'
import FadeIn from './FadeIn'
import { GithubData, GithubDay } from '@/lib/githubTypes'
import useCountUp from '@/hooks/useCountUp'

const USERNAME = meta.githubUsername || 'AdityaKumar1511'

interface HeatmapDay {
  date: string
  count: number
  weekday: number
  level: number
  tooltip: string
}

interface WeekColumn {
  days: (HeatmapDay | null)[]
}

function useInView<T extends HTMLElement>(threshold = 0.16): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -6% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, visible]
}

export default function GitHub({ initialData }: { initialData?: GithubData | null }) {
  const [data, setData] = useState<GithubData | null>(() => initialData ?? null)
  const [isOfflineCopy, setIsOfflineCopy] = useState(false)

  // Local storage caching safety net
  useEffect(() => {
    try {
      if (initialData) {
        setData(initialData)
        setIsOfflineCopy(false)
        localStorage.setItem('gh-last-good', JSON.stringify(initialData))
      } else {
        const saved = localStorage.getItem('gh-last-good')
        if (saved) {
          const parsed = JSON.parse(saved) as GithubData
          if (parsed && Array.isArray(parsed.days) && parsed.days.length > 0) {
            setData(parsed)
            setIsOfflineCopy(true)
          }
        }
      }
    } catch {
      // Ignore localStorage failures
    }
  }, [initialData])

  const [sectionRef, inView] = useInView<HTMLElement>(0.12)

  // Synced time label derived strictly from fetchedAt
  const syncedTime = useMemo(() => {
    if (!data?.fetchedAt) return null
    const diffMinutes = Math.floor((Date.now() - data.fetchedAt) / (1000 * 60))
    if (diffMinutes < 60) {
      return `${Math.max(1, diffMinutes)}m`
    }
    const diffHours = Math.floor(diffMinutes / 60)
    return `${diffHours}h`
  }, [data?.fetchedAt])

  // Count up animations reading from normalized data
  const countContributions = useCountUp(data ? data.total : null, inView)
  const countCurrentStreak = useCountUp(data ? data.currentStreak : null, inView)
  const countLongestStreak = useCountUp(data ? data.longestStreak : null, inView)
  const countCommits = useCountUp(data ? data.commits : null, inView)

  // Formatted displays (single source of truth with toLocaleString)
  const displayContributions = countContributions !== null
    ? countContributions.toLocaleString('en-US')
    : data
    ? data.total.toLocaleString('en-US')
    : '—'

  const displayCurrentStreak = countCurrentStreak !== null
    ? countCurrentStreak.toLocaleString('en-US')
    : data
    ? data.currentStreak.toLocaleString('en-US')
    : '—'

  const displayLongestStreak = countLongestStreak !== null
    ? countLongestStreak.toLocaleString('en-US')
    : data
    ? data.longestStreak.toLocaleString('en-US')
    : '—'

  const displayCommits = countCommits !== null
    ? countCommits.toLocaleString('en-US')
    : data
    ? data.commits.toLocaleString('en-US')
    : '—'

  // Heatmap calculation
  const { weekColumns, monthLabels } = useMemo(() => {
    if (!data || !data.days || data.days.length === 0) {
      return { weekColumns: [], monthLabels: [] }
    }

    // 1. Calculate quartiles of non-zero counts
    const nonZero = data.days
      .map((d) => d.contributionCount)
      .filter((c) => c > 0)
      .sort((a, b) => a - b)

    let q1 = 1
    let q2 = 2
    let q3 = 3
    if (nonZero.length > 0) {
      q1 = nonZero[Math.floor(nonZero.length * 0.25)] || 1
      q2 = nonZero[Math.floor(nonZero.length * 0.5)] || Math.max(q1 + 1, 2)
      q3 = nonZero[Math.floor(nonZero.length * 0.75)] || Math.max(q2 + 1, 3)

      if (q2 <= q1) q2 = q1 + 1
      if (q3 <= q2) q3 = q2 + 1
    }

    const getLevel = (count: number): number => {
      if (count <= 0) return 0
      if (count <= q1) return 1
      if (count <= q2) return 2
      if (count <= q3) return 3
      return 4
    }

    const formatTooltip = (count: number, dateStr: string): string => {
      const [y, m, d] = dateStr.split('-').map(Number)
      const dt = new Date(Date.UTC(y, m - 1, d))
      const weekdayShort = dt.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' })
      const monthShort = dt.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })
      const dayNum = dt.getUTCDate()
      const year = dt.getUTCFullYear()
      const word = count === 1 ? 'contribution' : 'contributions'
      return `${count} ${word} on ${weekdayShort}, ${monthShort} ${dayNum}, ${year}`
    }

    // 2. Group into weeks, padding first week so row = weekday (Sun=0..Sat=6)
    const columns: WeekColumn[] = []
    let currentWeek: (HeatmapDay | null)[] = new Array(7).fill(null)

    for (const day of data.days) {
      const level = getLevel(day.contributionCount)
      const heatmapDay: HeatmapDay = {
        date: day.date,
        count: day.contributionCount,
        weekday: day.weekday,
        level,
        tooltip: formatTooltip(day.contributionCount, day.date),
      }

      currentWeek[day.weekday] = heatmapDay

      if (day.weekday === 6) {
        columns.push({ days: currentWeek })
        currentWeek = new Array(7).fill(null)
      }
    }

    if (currentWeek.some((d) => d !== null)) {
      columns.push({ days: currentWeek })
    }

    // 3. Month labels: placed over the first week column where the month starts
    const labels: Array<{ weekIndex: number; label: string }> = []
    let lastLabeledCol = -4
    let currentMonthStr = ''

    columns.forEach((week, colIdx) => {
      for (const d of week.days) {
        if (d) {
          const [y, m] = d.date.split('-').map(Number)
          const dt = new Date(Date.UTC(y, m - 1, 1))
          const mStr = dt.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })
          if (mStr !== currentMonthStr) {
            currentMonthStr = mStr
            if (colIdx - lastLabeledCol >= 3 && colIdx <= columns.length - 2) {
              labels.push({ weekIndex: colIdx, label: mStr })
              lastLabeledCol = colIdx
            }
            break
          }
        }
      }
    })

    return { weekColumns: columns, monthLabels: labels }
  }, [data])

  // Skeleton placeholders when data is unavailable
  const skeletonWeeks = useMemo(() => {
    return Array.from({ length: 53 }, (_, col) => col)
  }, [])

  const getCellColor = (level: number) => {
    const hc = theme.heatmapColors
    switch (level) {
      case 1:
        return hc.level1
      case 2:
        return hc.level2
      case 3:
        return hc.level3
      case 4:
        return hc.level4
      default:
        return hc.empty
    }
  }

  return (
    <section id="github" ref={sectionRef} className="github-redesign-section">
      {/* Upper header segment */}
      <FadeIn>
        <div className="section-header">
          <div className="section-label-container">
            <span className="section-label-line" />
            <span className="section-label-text">{githubDefaults.sectionLabel}</span>
          </div>

          {/* Right-aligned meta details */}
          <div className="header-meta">
            {data ? (
              <div className="meta-sync">
                <span className="meta-sync-dot" />
                <span>SYNCED {syncedTime ? `${syncedTime.toUpperCase()} AGO` : 'RECENTLY'}</span>
                {isOfflineCopy && <span className="meta-offline-tag">OFFLINE COPY</span>}
              </div>
            ) : (
              <div className="meta-sync">
                <span className="meta-unavailable-dot" />
                <span className="meta-unavailable-tag">DATA UNAVAILABLE</span>
              </div>
            )}
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="meta-link"
            >
              @{USERNAME.toUpperCase()} ↗
            </a>
          </div>
        </div>
      </FadeIn>

      {/* Main header title */}
      <FadeIn delay={0.1}>
        <h2 className="main-heading">{githubDefaults.sectionHeading}</h2>
      </FadeIn>

      {/* Content grid containing stats on left and heatmap on right */}
      <div className="github-content-grid">
        <FadeIn delay={0.2}>
          <div className="stats-side">
            <div className="stats-grid-2x2">
              <div className="stat-col">
                <span className="stat-val">{displayContributions}</span>
                <span className="stat-lbl">Contributions · 1y</span>
              </div>
              <div className="stat-col">
                <span className="stat-val accent-val">{displayCurrentStreak}</span>
                <span className="stat-lbl">Current Streak</span>
              </div>
              <div className="stat-col">
                <span className="stat-val">{displayLongestStreak}</span>
                <span className="stat-lbl">Longest Streak</span>
              </div>
              <div className="stat-col">
                <span className="stat-val">{displayCommits}</span>
                <span
                  className="stat-lbl"
                  title="Direct commit contributions to default branches over the past 365 days"
                >
                  Commits · 1y (Default Branches)
                </span>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="heatmap-side">
            {/* Grid label */}
            <div className="grid-summary-label">
              {data
                ? `${data.total.toLocaleString('en-US')} Contributions · Last Year`
                : 'Contributions · Last Year'}
            </div>

            {/* Heatmap Area */}
            <div className="heatmap-container">
              {/* Y-axis labels strictly placed on rows 1, 3, and 5 (gridRow 2, 4, 6) */}
              <div className="heatmap-y-axis" aria-hidden="true">
                <span className="y-axis-label" style={{ gridRow: 2 }}>
                  Mon
                </span>
                <span className="y-axis-label" style={{ gridRow: 4 }}>
                  Wed
                </span>
                <span className="y-axis-label" style={{ gridRow: 6 }}>
                  Fri
                </span>
              </div>

              <div className="heatmap-scroller">
                <div className="heatmap-inner">
                  {/* Month labels */}
                  <div
                    className="heatmap-months"
                    style={
                      {
                        '--col-count': weekColumns.length || 53,
                      } as React.CSSProperties
                    }
                  >
                    {monthLabels.map(({ weekIndex, label }) => (
                      <span
                        key={`${weekIndex}-${label}`}
                        className="heatmap-month-label"
                        style={{ gridColumnStart: weekIndex + 1 }}
                      >
                        {label}
                      </span>
                    ))}
                  </div>

                  {/* Heatmap Grid */}
                  <div
                    className="heatmap-grid"
                    role="grid"
                    aria-label="GitHub Contributions Heatmap"
                  >
                    {weekColumns.length > 0 ? (
                      weekColumns.map((col, colIdx) => (
                        <div key={colIdx} className="heatmap-column" role="row">
                          {col.days.map((day, rowIdx) =>
                            day ? (
                              <div
                                key={`${colIdx}-${rowIdx}`}
                                className="heatmap-cell"
                                tabIndex={0}
                                role="gridcell"
                                aria-label={day.tooltip}
                                title={day.tooltip}
                                style={{
                                  backgroundColor: getCellColor(day.level),
                                }}
                              />
                            ) : (
                              <div
                                key={`${colIdx}-${rowIdx}`}
                                className="heatmap-cell heatmap-cell-pad"
                                aria-hidden="true"
                              />
                            )
                          )}
                        </div>
                      ))
                    ) : (
                      /* Skeleton empty state */
                      skeletonWeeks.map((colIdx) => (
                        <div key={colIdx} className="heatmap-column">
                          {Array.from({ length: 7 }, (_, rowIdx) => (
                            <div
                              key={rowIdx}
                              className="heatmap-cell heatmap-cell-skeleton"
                              style={{ backgroundColor: theme.heatmapColors.empty }}
                            />
                          ))}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Heatmap Footer: Scroll Indicator + Legend */}
                  <div className="heatmap-footer">
                    <span className="heatmap-scroll-tip">Swipe/Scroll to view &rarr;</span>
                    <div className="heatmap-legend" aria-hidden="true">
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
        </FadeIn>
      </div>

      {/* CSS Styles */}
      <style>{`
        .github-redesign-section {
          padding: clamp(4rem, 10vw, 8rem) var(--pad-x);
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
          background: #fa5f34;
        }

        .section-label-text {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #fa5f34;
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
          background: #fa5f34;
          display: inline-block;
          box-shadow: 0 0 8px rgba(250, 95, 52, 0.4);
        }

        .meta-unavailable-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #71717a;
          display: inline-block;
        }

        .meta-offline-tag {
          font-size: 9px;
          letter-spacing: 0.08em;
          color: #fa5f34;
          border: 1px solid rgba(250, 95, 52, 0.4);
          padding: 1px 5px;
          border-radius: 2px;
          margin-left: 4px;
        }

        .meta-unavailable-tag {
          font-size: 9px;
          letter-spacing: 0.08em;
          color: #71717a;
          border: 1px solid rgba(113, 113, 122, 0.4);
          padding: 1px 5px;
          border-radius: 2px;
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
          font-variant-numeric: tabular-nums;
        }

        .accent-val {
          color: #fa5f34;
        }

        .stat-lbl {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          line-height: 1.3;
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

        /* Y-axis labels strictly placed on rows 1, 3, 5 */
        .heatmap-y-axis {
          display: grid;
          grid-template-rows: repeat(7, 10px);
          gap: 2.5px;
          align-items: center;
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          color: var(--text-muted);
          padding-top: 20px;
        }

        .y-axis-label {
          line-height: 10px;
          display: block;
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
          display: grid;
          grid-template-columns: repeat(var(--col-count, 53), 10px);
          gap: 2.5px;
          height: 14px;
          margin-bottom: 6px;
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          color: var(--text-muted);
        }

        .heatmap-month-label {
          white-space: nowrap;
          line-height: 14px;
        }

        .heatmap-grid {
          display: flex;
          gap: 2.5px;
          margin-bottom: 12px;
          width: max-content;
        }

        .heatmap-column {
          display: grid;
          grid-template-rows: repeat(7, 10px);
          gap: 2.5px;
        }

        .heatmap-cell {
          width: 10px;
          height: 10px;
          border-radius: 2px;
          outline: none;
          transition: transform 140ms ease, box-shadow 140ms ease;
          box-sizing: border-box;
        }

        .heatmap-cell-pad {
          background-color: transparent;
          pointer-events: none;
        }

        .heatmap-cell:hover,
        .heatmap-cell:focus-visible {
          transform: scale(1.35);
          z-index: 5;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.8);
          border: 1px solid rgba(243, 238, 232, 0.4);
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

          .heatmap-months {
            grid-template-columns: repeat(var(--col-count, 53), 8px);
            gap: 2px;
          }

          .heatmap-column {
            grid-template-rows: repeat(7, 8px);
            gap: 2px;
          }

          .heatmap-grid {
            gap: 2px;
          }

          .heatmap-y-axis {
            grid-template-rows: repeat(7, 8px);
            gap: 2px;
          }

          .y-axis-label {
            line-height: 8px;
          }

          .github-redesign-section {
            padding: 3rem var(--pad-x);
          }
        }
      `}</style>
    </section>
  )
}
