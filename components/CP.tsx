'use client'

import React, { useCallback, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from 'react'

import meta from '@/data/meta.json'
import cpDefaults from '@/data/cpDefaults.json'
import FadeIn from './FadeIn'
import { ArrowUpRight } from './ArrowIcon'
import {
  setSolvedCounts,
  useSolvedCounts,
  getSolvedCounts,
  DEFAULT_SOLVED_COUNTS,
} from '@/lib/cpStats'
import {
  CPData,
  CodeforcesData,
  LeetCodeData,
  computeCfTier,
} from '@/lib/cpTypes'
import useCountUp from '@/hooks/useCountUp'

export { useSolvedCounts, setSolvedCounts, getSolvedCounts, DEFAULT_SOLVED_COUNTS }

const LEETCODE_USERNAME = meta.leetcodeUsername
const CODEFORCES_USERNAME = meta.codeforcesUsername

const AMBER = '#ffa116'
const ELECTRIC = '#00a3ff'
const ORANGE = '#fa5f34'
const PAPER = '#f3eee8'
const INK = '#070708'

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

function pluralize(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`
}

const FALLBACK_LC: LeetCodeData = {
  solved: cpDefaults.leetcode.easySolved + cpDefaults.leetcode.mediumSolved + cpDefaults.leetcode.hardSolved,
  easy: cpDefaults.leetcode.easySolved,
  medium: cpDefaults.leetcode.mediumSolved,
  hard: cpDefaults.leetcode.hardSolved,
  ranking: cpDefaults.leetcode.ranking ? String(cpDefaults.leetcode.ranking) : null,
  rating: cpDefaults.leetcode.contestRating,
  contests: cpDefaults.leetcode.contestAttendance,
  globalRank: cpDefaults.leetcode.contestGlobalRanking,
  topPercent: cpDefaults.leetcode.topPercentage,
  badge: null,
  history: cpDefaults.leetcode.contestHistory,
}

const FALLBACK_CF: CodeforcesData = {
  rating: cpDefaults.codeforces.rating,
  maxRating: Math.max(cpDefaults.codeforces.rating, cpDefaults.codeforces.maxRating),
  contests: cpDefaults.codeforces.contestsCount,
  solved: cpDefaults.codeforces.solvedCount,
  tier: computeCfTier(cpDefaults.codeforces.rating),
  history: [],
}

type DataSource = 'live' | 'cache' | 'fallback'

function sourceLabel(source: DataSource): string {
  if (source === 'live') return 'LIVE'
  if (source === 'cache') return 'CACHED'
  return 'OFFLINE'
}

function useMediaQuery(query: string, fallback = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (typeof window === 'undefined' || !window.matchMedia) return () => {}
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    [query]
  )

  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return fallback
    return window.matchMedia(query).matches
  }, [query, fallback])

  return useSyncExternalStore(subscribe, getSnapshot, () => fallback)
}

function useInView<T extends HTMLElement>(threshold = 0.16): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      const frame = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(frame)
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

/* ── LeetCode difficulty legend rings ── */
const LC_RINGS = [
  { key: 'easy' as const, label: 'EASY', color: PAPER },
  { key: 'medium' as const, label: 'MED', color: AMBER },
  { key: 'hard' as const, label: 'HARD', color: ORANGE },
]

/* ── Shared rating chart point ── */
interface RatingPoint {
  label: string
  rating: number
  rank: number | null
  delta: number | null
}

/* ── LeetCode difficulty breakdown plate ── */
function DifficultyPlate({ easy, medium, hard }: { easy: number; medium: number; hard: number }) {
  const values = { easy, medium, hard }
  return (
    <div className="cp-difficulty-plate">
      <span className="cp-stat-plate-label">Difficulty</span>
      <div className="cp-difficulty-rows">
        {LC_RINGS.map((ring) => (
          <span className="cp-difficulty-row" key={ring.key}>
            <i className="cp-difficulty-dot" style={{ background: ring.color }} />
            <span className="cp-difficulty-name">{ring.label}</span>
            <span className="cp-difficulty-value">{values[ring.key]}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Rating history chart (shared by LeetCode + Codeforces) ── */
function RatingChart({
  points,
  accent,
  referenceValue = null,
  referenceLabel = 'MAX',
  visible,
  reduced,
  loading,
  ariaLabel,
  emptyTitle,
  emptySub,
}: {
  points: RatingPoint[]
  accent: string
  referenceValue?: number | null
  referenceLabel?: string
  visible: boolean
  reduced: boolean
  loading: boolean
  ariaLabel: string
  emptyTitle: string
  emptySub: string
}) {
  const [hover, setHover] = useState<number | null>(null)
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const fillId = `cpFill${uid}`
  const strokeId = `cpStroke${uid}`

  const width = 520
  const height = 190
  const pad = { top: 22, right: 68, bottom: 26, left: 38 }

  const active = hover !== null && points[hover] ? points[hover] : null
  const hasReference = referenceValue !== null

  const ratings = points.map((entry) => entry.rating)
  const domainVals = ratings.length > 0 ? ratings : hasReference ? [referenceValue as number] : [0]

  const rawMin = Math.min(...domainVals, ...(hasReference ? [referenceValue as number] : []))
  const rawMax = Math.max(...domainVals, ...(hasReference ? [referenceValue as number] : []))

  // Domain [min - 100, max + 100]
  const yDomainMin = Math.max(0, rawMin - 100)
  const yDomainMax = rawMax + 100

  // 4-5 clean round ticks
  const tickStep = Math.max(50, Math.ceil((yDomainMax - yDomainMin) / 4 / 50) * 50)
  const ticks: number[] = []
  for (let t = Math.ceil(yDomainMin / tickStep) * tickStep; t <= yDomainMax; t += tickStep) {
    ticks.push(t)
  }

  const innerW = width - pad.left - pad.right
  const innerH = height - pad.top - pad.bottom

  const geo = useMemo(() => {
    if (points.length === 0) return null
    const count = points.length
    const x = (i: number) => pad.left + (count <= 1 ? innerW / 2 : (i / (count - 1)) * innerW)
    const y = (rating: number) =>
      pad.top + (1 - (rating - yDomainMin) / (yDomainMax - yDomainMin || 1)) * innerH

    const pts = points.map((entry, index) => [x(index), y(entry.rating)] as [number, number])
    const line = pts.reduce((acc, [px, py], i) => (i === 0 ? `M ${px} ${py}` : `${acc} L ${px} ${py}`), '')
    const area = `${line} L ${x(count - 1)} ${pad.top + innerH} L ${x(0)} ${pad.top + innerH} Z`
    return { x, y, line, area, count, pts }
  }, [points, yDomainMin, yDomainMax, innerW, innerH, pad.left, pad.top])

  if (!geo || points.length === 0) {
    return (
      <div className="cp-chart-empty">
        <span className="cp-chart-empty-mark">{loading ? '◌' : '⊘'}</span>
        <span className="cp-chart-empty-title">
          {loading ? 'SYNCING RATING HISTORY' : emptyTitle}
        </span>
        <span className="cp-chart-empty-sub">
          {loading ? 'AWAITING CONTEST DATA' : emptySub}
        </span>
        {!loading && <span className="cp-chart-empty-sub">LIVE STATS ABOVE ARE STILL SYNCED</span>}
      </div>
    )
  }

  const maxY = hasReference ? geo.y(referenceValue as number) : 0
  const lastX = geo.x(points.length - 1)
  const lastY = geo.y(points[points.length - 1].rating)

  return (
    <div className="cp-chart-wrap">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="cp-chart"
        preserveAspectRatio="none"
        role="img"
        aria-label={ariaLabel}
      >
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.32" />
            <stop offset="65%" stopColor={accent} stopOpacity="0.08" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
          <linearGradient id={strokeId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={accent} stopOpacity="0.65" />
            <stop offset="70%" stopColor={accent} stopOpacity="1" />
            <stop offset="100%" stopColor={PAPER} stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines for ticks */}
        {ticks.map((tickVal) => {
          const yPos = geo.y(tickVal)
          return (
            <g key={tickVal}>
              <line
                x1={pad.left}
                x2={pad.left + innerW}
                y1={yPos}
                y2={yPos}
                stroke={PAPER}
                strokeOpacity="0.08"
                strokeDasharray="2 3"
              />
              <text
                x={pad.left - 5}
                y={yPos + 3}
                textAnchor="end"
                fill={PAPER}
                fillOpacity="0.6"
                className="cp-chart-axis-lbl"
              >
                {tickVal}
              </text>
            </g>
          )
        })}

        {/* Optional peak/reference dashed line with right-padded label */}
        {hasReference && (
          <>
            <line
              x1={pad.left}
              x2={pad.left + innerW}
              y1={maxY}
              y2={maxY}
              stroke={accent}
              strokeOpacity="0.55"
              strokeDasharray="4 4"
            />
            <text
              x={width - 6}
              y={maxY + 3}
              textAnchor="end"
              fill={PAPER}
              className="cp-chart-max"
            >
              {referenceLabel} {referenceValue}
            </text>
          </>
        )}

        <path d={geo.area} fill={`url(#${fillId})`} className="cp-chart-area" data-visible={visible || reduced} />
        <path
          d={geo.line}
          fill="none"
          stroke={`url(#${strokeId})`}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          pathLength={1}
          className="cp-chart-line"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: reduced || visible ? 0 : 1,
          }}
        />

        {/* Last rating point halo and dot */}
        <circle
          cx={lastX}
          cy={lastY}
          r={5}
          fill={accent}
          fillOpacity="0.2"
          className="cp-chart-halo"
        />
        <circle
          cx={lastX}
          cy={lastY}
          r={3.5}
          fill={PAPER}
          stroke={accent}
          strokeWidth="2"
          className="cp-chart-dot"
        />

        {/* Interactive hover columns */}
        {geo.pts.map(([px], index) => {
          const band = innerW / geo.count
          return (
            <rect
              key={index}
              x={px - band / 2}
              y={pad.top}
              width={band}
              height={innerH}
              fill="transparent"
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(null)}
            />
          )
        })}
      </svg>

      {active && hover !== null && (
        <div
          className="cp-chart-tip"
          style={{
            left: `${Math.min(Math.max(geo.x(hover) / width, 0.14), 0.84) * 100}%`,
            top: `${Math.max(6, (geo.y(active.rating) / height) * 100 - 4)}%`,
          }}
        >
          <span className="cp-chart-tip-name">{active.label}</span>
          <span className="cp-chart-tip-meta">
            <b>{active.rating}</b>
            {active.delta !== null && (
              <i style={{ color: active.delta >= 0 ? PAPER : ORANGE }}>
                {active.delta >= 0 ? '▲' : '▼'}
                {Math.abs(active.delta)}
              </i>
            )}
            {active.rank !== null && <em>#{active.rank}</em>}
          </span>
        </div>
      )}
    </div>
  )
}

function StatPlate({
  value,
  label,
  accent,
}: {
  value: string
  label: string
  accent?: string
}) {
  return (
    <div className="cp-stat-plate">
      <span className="cp-stat-plate-value" style={accent ? { color: accent } : undefined}>
        {value}
      </span>
      <span className="cp-stat-plate-label">{label}</span>
    </div>
  )
}

type PlatformStat =
  | { value: string; label: string; accent?: boolean }
  | { node: React.ReactNode }

/* ── GitHub-style platform row: stat plates left, rating chart right ── */
function PlatformRow({
  accent,
  fig,
  platform,
  handle,
  href,
  status,
  stats,
  chartLabel,
  chartMeta,
  chart,
  chartFoot,
  rowRef,
}: {
  accent: string
  fig: string
  platform: string
  handle: string
  href: string
  status: string
  stats: PlatformStat[]
  chartLabel: string
  chartMeta: string
  chart: React.ReactNode
  chartFoot?: React.ReactNode
  rowRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div
      ref={rowRef}
      className="cp-platform"
      style={{ '--row-accent': accent } as React.CSSProperties}
    >
      <FadeIn>
        <div className="cp-platform-head">
          <div className="cp-platform-ident">
            <span className="cp-platform-line" />
            <span className="cp-platform-fig">{fig}</span>
            <span className="cp-platform-name">{platform}</span>
            <span className={`cp-platform-status${status === 'LIVE' ? '' : ' is-offline'}`}>
              <i className="cp-platform-status-dot" />
              {status}
            </span>
          </div>
          <a className="cp-platform-link" href={href} target="_blank" rel="noreferrer">
            @{handle} <ArrowUpRight size={12} />
          </a>
        </div>
      </FadeIn>

      <div className="cp-platform-grid">
        <FadeIn delay={0.08}>
          <div className="cp-platform-stats">
            {stats.map((stat, index) =>
              'node' in stat ? (
                <div className="cp-stat-plate" key={`custom-${index}`}>
                  {stat.node}
                </div>
              ) : (
                <StatPlate
                  key={`${stat.label}-${index}`}
                  value={stat.value}
                  label={stat.label}
                  accent={stat.accent ? accent : undefined}
                />
              )
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.14}>
          <div className="cp-platform-chart">
            <div className="cp-chart-head">
              <span>{chartLabel}</span>
              <span className="cp-chart-head-live" style={{ color: accent }}>{chartMeta}</span>
            </div>
            <div className="cp-platform-chart-body">{chart}</div>
            {chartFoot ? <div className="cp-platform-chart-foot">{chartFoot}</div> : null}
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Main Component: Competitive Programming Section
   ───────────────────────────────────────────────────────── */
export default function CP({ initialData }: { initialData?: CPData }) {
  // Normalized data state initialized from server props or fallbacks
  const [lc, setLc] = useState<LeetCodeData>(() => initialData?.lc ?? FALLBACK_LC)
  const [cf, setCf] = useState<CodeforcesData>(() => initialData?.cf ?? FALLBACK_CF)
  const [lcSource, setLcSource] = useState<DataSource>(() => (initialData?.lc ? 'live' : 'fallback'))
  const [cfSource, setCfSource] = useState<DataSource>(() => (initialData?.cf ? 'live' : 'fallback'))

  // Load the last known-good snapshot once when the server has no live data.
  // cf/lc are intentionally NOT dependencies here: setting them must not re-run
  // this effect (that caused an infinite render loop in the previous version).
  useEffect(() => {
    let cfFrame = 0
    let lcFrame = 0

    try {
      if (!initialData?.cf) {
        const savedCf = localStorage.getItem('cp-last-good-cf')
        if (savedCf) {
          const parsed = JSON.parse(savedCf) as CodeforcesData
          if (parsed && typeof parsed.rating === 'number' && Array.isArray(parsed.history)) {
            cfFrame = requestAnimationFrame(() => {
              setCf(parsed)
              setCfSource('cache')
            })
          }
        }
      }

      if (!initialData?.lc) {
        const savedLc = localStorage.getItem('cp-last-good-lc')
        if (savedLc) {
          const parsed = JSON.parse(savedLc) as LeetCodeData
          if (parsed && typeof parsed.solved === 'number' && Array.isArray(parsed.history)) {
            lcFrame = requestAnimationFrame(() => {
              setLc(parsed)
              setLcSource('cache')
            })
          }
        }
      }
    } catch {
      // Ignore localStorage access errors
    }

    return () => {
      cancelAnimationFrame(cfFrame)
      cancelAnimationFrame(lcFrame)
    }
  }, [initialData])

  // Persist only real API data, never fallback/cached values.
  useEffect(() => {
    try {
      if (initialData?.cf) {
        localStorage.setItem('cp-last-good-cf', JSON.stringify(initialData.cf))
      }
      if (initialData?.lc) {
        localStorage.setItem('cp-last-good-lc', JSON.stringify(initialData.lc))
      }
    } catch {
      // Ignore localStorage access errors
    }
  }, [initialData])

  // Keep state in sync if a fresh server payload arrives after mount.
  useEffect(() => {
    if (!initialData) return

    const frame = requestAnimationFrame(() => {
      if (initialData.cf) {
        setCf(initialData.cf)
        setCfSource('live')
      }
      if (initialData.lc) {
        setLc(initialData.lc)
        setLcSource('live')
      }
    })

    return () => cancelAnimationFrame(frame)
  }, [initialData])

  // Sync latest solved counts + Codeforces rating to the shared external store
  useEffect(() => {
    setSolvedCounts({
      leetcode: lc.solved,
      codeforces: cf.solved,
      codeforcesRating: cf.rating,
    })
  }, [lc.solved, cf.solved, cf.rating])

  const [syncedTime, setSyncedTime] = useState('JUST NOW')

  useEffect(() => {
    if (!initialData?.fetchedAt) return

    const update = () => {
      const minutes = Math.max(0, Math.floor((Date.now() - initialData.fetchedAt) / 60000))
      if (minutes < 1) {
        setSyncedTime('JUST NOW')
      } else if (minutes < 60) {
        setSyncedTime(`${minutes}M AGO`)
      } else {
        const hours = Math.floor(minutes / 60)
        setSyncedTime(hours < 24 ? `${hours}H AGO` : `${Math.floor(hours / 24)}D AGO`)
      }
    }

    const frame = requestAnimationFrame(update)
    const interval = setInterval(update, 60000)
    return () => {
      cancelAnimationFrame(frame)
      clearInterval(interval)
    }
  }, [initialData?.fetchedAt])

  const reduced = useMediaQuery(REDUCED_QUERY)

  const [lcSectionRef, lcVisible] = useInView<HTMLDivElement>(0.12)
  const [cfSectionRef, cfVisible] = useInView<HTMLDivElement>(0.12)

  // Animated counts reading strictly from normalized data using non-overshoot easeOutCubic
  const lcTotal = useCountUp(lc.solved, lcVisible)
  const lcEasy = useCountUp(lc.easy, lcVisible)
  const lcMedium = useCountUp(lc.medium, lcVisible)
  const lcHard = useCountUp(lc.hard, lcVisible)
  const lcContests = useCountUp(lc.contests, lcVisible)

  const cfSolved = useCountUp(cf.solved, cfVisible)
  const cfContests = useCountUp(cf.contests, cfVisible)

  // Flatten both contest histories into a shared chart-ready shape
  const lcPoints = useMemo<RatingPoint[]>(
    () =>
      lc.history.map((entry, i) => ({
        label: entry.contestName,
        rating: entry.rating,
        rank: entry.ranking > 0 ? entry.ranking : null,
        delta: i > 0 ? entry.rating - lc.history[i - 1].rating : null,
      })),
    [lc.history]
  )

  const cfPoints = useMemo<RatingPoint[]>(
    () =>
      cf.history.map((entry) => ({
        label: entry.contestName,
        rating: entry.newRating,
        rank: entry.rank,
        delta: entry.newRating - entry.oldRating,
      })),
    [cf.history]
  )

  const hasLive = lcSource === 'live' || cfSource === 'live'
  const hasCache = lcSource === 'cache' || cfSource === 'cache'
  const syncLabel = hasLive
    ? `SYNCED ${syncedTime}`
    : hasCache
    ? 'CACHED DATA'
    : 'OFFLINE SNAPSHOT'

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
              <span className={`cp-sync-dot${hasLive ? '' : ' is-offline'}`} />
              <span>{syncLabel}</span>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.08}>
        <div className="cp-heading-row">
          <h2 className="cp-heading">{cpDefaults.sectionHeading}</h2>
        </div>
      </FadeIn>

      <PlatformRow
        rowRef={lcSectionRef}
        accent={AMBER}
        fig="FIG. 01"
        platform="LEETCODE"
        handle={LEETCODE_USERNAME.toUpperCase()}
        href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
        status={sourceLabel(lcSource)}
        stats={[
          { value: String(lcTotal ?? lc.solved), label: 'Solved' },
          {
            value: lcContests !== null ? String(lcContests) : lc.contests !== null ? String(lc.contests) : '—',
            label: lc.contests === 1 ? 'Contest' : 'Contests',
          },
          {
            node: (
              <DifficultyPlate
                easy={lcEasy ?? lc.easy}
                medium={lcMedium ?? lc.medium}
                hard={lcHard ?? lc.hard}
              />
            ),
          },
          { value: lc.topPercent !== null ? `${lc.topPercent}%` : '—', label: 'Top Percent', accent: true },
        ]}
        chartLabel={`RATING HISTORY // ${pluralize(lc.history.length || (lc.contests ?? 0), 'CONTEST', 'CONTESTS')}`}
        chartMeta={lc.rating !== null ? `LAST ${lc.rating}` : 'NO RATING'}
        chart={
          <RatingChart
            points={lcPoints}
            accent={AMBER}
            visible={lcVisible}
            reduced={reduced}
            loading={false}
            ariaLabel="LeetCode contest rating trajectory"
            emptyTitle="NO CONTEST HISTORY"
            emptySub="OFFLINE OR NO RATED CONTESTS RETURNED"
          />
        }
      />

      <PlatformRow
        rowRef={cfSectionRef}
        accent={ELECTRIC}
        fig="FIG. 02"
        platform="CODEFORCES"
        handle={CODEFORCES_USERNAME.toUpperCase()}
        href={`https://codeforces.com/profile/${CODEFORCES_USERNAME}`}
        status={sourceLabel(cfSource)}
        stats={[
          { value: String(cfSolved ?? cf.solved), label: 'Solved' },
          {
            value: cfContests !== null ? String(cfContests) : String(cf.contests),
            label: cf.contests === 1 ? 'Contest' : 'Contests',
          },
          { value: cf.maxRating > 0 ? String(cf.maxRating) : '—', label: 'Max Rating', accent: true },
          { value: cf.tier.label, label: 'Current Tier' },
        ]}
        chartLabel={`RATING HISTORY // ${pluralize(cf.history.length || cf.contests, 'CONTEST', 'CONTESTS')}`}
        chartMeta={cf.rating > 0 ? `LAST ${cf.rating}` : 'NO RATING'}
        chart={
          <RatingChart
            points={cfPoints}
            accent={ELECTRIC}
            referenceValue={cf.maxRating}
            referenceLabel="MAX"
            visible={cfVisible}
            reduced={reduced}
            loading={false}
            ariaLabel="Codeforces rating trajectory"
            emptyTitle="NO RATING TELEMETRY FOUND"
            emptySub="OFFLINE OR NO CONTEST HISTORY RETURNED"
          />
        }
        chartFoot={
          <>
            <span className="cp-platform-tier" style={{ color: cf.tier.color }}>{cf.tier.label} TIER</span>
            <span className="cp-platform-foot-note">MAX {cf.maxRating}</span>
          </>
        }
      />

      <style>{`
        .cp-section {
          --cp-amber: ${AMBER};
          --cp-blue: ${ELECTRIC};
          --cp-orange: ${ORANGE};
          --cp-paper: ${PAPER};
          --cp-ink: ${INK};
          position: relative;
          padding: clamp(3.75rem, 8.5vw, 7.5rem) var(--pad-x);
          border-top: 1px solid var(--border);
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
          overflow-x: clip;
        }

        .cp-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-bottom: clamp(0.85rem, 1.8vw, 1.35rem);
        }

        .cp-label-container { display: flex; align-items: center; gap: 12px; }

        .cp-label-line {
          width: clamp(18px, 3.5vw, 32px);
          height: 2px;
          background: var(--cp-orange);
        }

        .cp-label-text {
          font-family: var(--font-mono), monospace;
          font-size: clamp(9px, 0.72vw, 11px);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--cp-orange);
          font-weight: 800;
        }

        .cp-header-meta { display: flex; align-items: center; }

        .cp-sync {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-mono), monospace;
          font-size: clamp(9px, 0.7vw, 10.5px);
          letter-spacing: 0.12em;
          color: var(--cp-paper);
          opacity: 0.7;
          white-space: nowrap;
        }

        .cp-sync-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--cp-orange);
          flex-shrink: 0;
          animation: cpPulse 2s ease-out infinite;
        }

        .cp-sync-dot.is-offline {
          background: #71717a;
          animation: none;
        }

        @keyframes cpPulse {
          0% { opacity: 1; }
          70% { opacity: 0.35; }
          100% { opacity: 1; }
        }

        .cp-heading-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1.5rem;
          border-bottom: 1px solid rgba(243, 238, 232, 0.14);
          padding-bottom: clamp(0.9rem, 2.2vw, 1.5rem);
          margin-bottom: clamp(2rem, 4.5vw, 3.25rem);
        }

        .cp-heading {
          font-family: var(--font-display), sans-serif;
          font-size: clamp(2rem, 4.5vw, 3.5rem);
          font-weight: 700;
          font-stretch: 92%;
          letter-spacing: -0.03em;
          color: var(--cp-paper);
          line-height: 1.1;
          margin: 0;
          text-wrap: balance;
        }

        /* ── EQUAL HEIGHT GRID WITH ALIGN-ITEMS: STRETCH ── */
        .cp-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(1.75rem, 3.4vw, 3.25rem);
          width: 100%;
          align-items: stretch;
        }

        .cp-col {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-width: 0;
        }

        .cp-stage {
          position: relative;
          min-width: 0;
          perspective: 1500px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        /* ── CARD FRAME: outer 1px border, padding = --gap, hard offset shadow, isolation: isolate ── */
        .card-frame {
          --gap: clamp(6px, 0.6vw, 10px);
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
          box-sizing: border-box;
          padding: var(--gap);
          border: 1px solid rgba(243, 238, 232, 0.24);
          border-radius: 2px;
          background: #09090b;
          box-shadow: 10px 10px 0 0 var(--accent);
          isolation: isolate;
          transform: translate3d(0, 34px, 0) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
          opacity: 0;
          transition:
            transform 800ms cubic-bezier(0.16, 1, 0.3, 1),
            opacity 640ms ease,
            box-shadow 260ms ease;
          will-change: transform, opacity;
        }

        .card-frame[data-entered='true'] {
          transform: translate3d(0, 0, 0) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
          opacity: 1;
        }

        .card-frame:hover {
          box-shadow: 14px 14px 0 0 var(--accent);
        }

        /* ── CROP MARKS: 4 L-shaped marks (12px, 2px stroke) in off-white inside gap ── */
        .card-crop-marks {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 12;
        }

        .crop-mark {
          position: absolute;
          width: 12px;
          height: 12px;
          box-sizing: border-box;
        }

        .crop-tl {
          top: 2px;
          left: 2px;
          border-top: 2px solid var(--cp-paper);
          border-left: 2px solid var(--cp-paper);
        }

        .crop-tr {
          top: 2px;
          right: 2px;
          border-top: 2px solid var(--cp-paper);
          border-right: 2px solid var(--cp-paper);
        }

        .crop-bl {
          bottom: 2px;
          left: 2px;
          border-bottom: 2px solid var(--cp-paper);
          border-left: 2px solid var(--cp-paper);
        }

        .crop-br {
          bottom: 2px;
          right: 2px;
          border-bottom: 2px solid var(--cp-paper);
          border-right: 2px solid var(--cp-paper);
        }

        /* ── STICKERS: children of .card-frame so they can overlap the edge ── */
        .cp-stickers {
          position: absolute;
          z-index: 25;
          top: clamp(5.4rem, 6.4vw, 6.2rem);
          right: clamp(-8px, -0.8vw, -4px);
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: clamp(5px, 0.65vw, 8px);
          pointer-events: none;
          max-width: 48%;
        }

        .cp-sticker {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono), monospace;
          font-size: clamp(7.5px, 0.65vw, 9.5px);
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: clamp(3px, 0.5vw, 6px) clamp(7px, 0.9vw, 11px);
          background: #08080a;
          border: 1px solid rgba(243, 238, 232, 0.45);
          color: var(--cp-paper);
          white-space: nowrap;
          box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.75);
          opacity: 0;
          will-change: transform, opacity;
        }

        .card-frame[data-entered='true'] .cp-sticker {
          opacity: 1;
          transition: opacity 420ms ease, transform 560ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .cp-sticker-rank {
          transform: rotate(-6deg) translate3d(calc(var(--shift-x, 0px) * 0.9), calc(var(--shift-y, 0px) * 0.9), 0) scale(0.7);
        }
        .card-frame[data-entered='true'] .cp-sticker-rank {
          transform: rotate(-6deg) translate3d(calc(var(--shift-x, 0px) * 0.9), calc(var(--shift-y, 0px) * 0.9), 0) scale(1);
          transition-delay: 420ms;
        }

        .cp-sticker-live {
          transform: rotate(4deg) translate3d(calc(var(--shift-x, 0px) * 0.6), calc(var(--shift-y, 0px) * 0.6), 0) scale(0.7);
        }
        .card-frame[data-entered='true'] .cp-sticker-live {
          transform: rotate(4deg) translate3d(calc(var(--shift-x, 0px) * 0.6), calc(var(--shift-y, 0px) * 0.6), 0) scale(1);
          transition-delay: 500ms;
        }

        .cp-sticker-best {
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
          line-height: 1.15;
          background: var(--accent);
          border-color: var(--accent);
          color: #08080a;
          transform: rotate(-2deg) translate3d(calc(var(--shift-x, 0px) * 0.45), calc(var(--shift-y, 0px) * 0.45), 0) scale(0.7);
        }
        .card-frame[data-entered='true'] .cp-sticker-best {
          transform: rotate(-2deg) translate3d(calc(var(--shift-x, 0px) * 0.45), calc(var(--shift-y, 0px) * 0.45), 0) scale(1);
          transition-delay: 580ms;
        }
        .cp-sticker-best small { font-size: 0.72em; letter-spacing: 0.16em; opacity: 0.75; }
        .cp-sticker-best b { font-size: 1.3em; letter-spacing: 0.02em; }

        .cp-live-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent);
          animation: cpBlink 1.4s steps(2, end) infinite;
        }

        .cp-sticker-live.is-offline .cp-live-dot {
          background: #71717a;
          box-shadow: none;
          animation: none;
        }

        @keyframes cpBlink {
          0%, 45% { opacity: 1; }
          50%, 95% { opacity: 0.15; }
          100% { opacity: 1; }
        }

        /* ── CARD INNER: inner 1px border, overflow hidden, flex column, height 100% ── */
        .card-inner {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
          box-sizing: border-box;
          border: 1px solid rgba(243, 238, 232, 0.16);
          border-radius: 1px;
          background: linear-gradient(168deg, #111116 0%, #0a0a0c 48%, #070708 100%);
          overflow: hidden;
        }

        .cp-noise {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.35;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
          z-index: 0;
        }

        .cp-halftone {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(rgba(243, 238, 232, 0.18) 1px, transparent 1px);
          background-size: 14px 14px;
          opacity: 0.15;
          -webkit-mask-image: radial-gradient(125% 105% at 82% 6%, #000 8%, transparent 76%);
          mask-image: radial-gradient(125% 105% at 82% 6%, #000 8%, transparent 76%);
          z-index: 0;
        }

        /* ── TICKER: inside .card-inner ── */
        .cp-ticker {
          position: relative;
          z-index: 7;
          overflow: hidden;
          color: #08080a;
          border-bottom: 1px solid rgba(0, 0, 0, 0.35);
          opacity: 0;
          transform: translate3d(-7%, 0, 0);
          transition: opacity 480ms ease 140ms, transform 760ms cubic-bezier(0.16, 1, 0.3, 1) 140ms;
        }

        .cp-ticker[data-entered='true'] { opacity: 1; transform: translate3d(0, 0, 0); }

        .cp-ticker-track {
          display: flex;
          width: max-content;
          padding: clamp(5px, 0.6vw, 8px) 0;
          animation: cpMarquee 26s linear infinite;
          will-change: transform;
        }

        .cp-ticker:hover .cp-ticker-track { animation-play-state: paused; }

        @keyframes cpMarquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        .cp-ticker-text {
          display: inline-block;
          padding-right: clamp(10px, 1.2vw, 16px);
          font-family: var(--font-mono), monospace;
          font-size: clamp(9px, 0.76vw, 11px);
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* ── BODY: flex 1 inside .card-inner, stretches to keep cards equal height ── */
        .cp-body {
          position: relative;
          z-index: 3;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: clamp(1rem, 1.9vw, 1.45rem);
          padding: clamp(1.35rem, 2.5vw, 2rem);
          padding-top: clamp(1.5rem, 2.7vw, 2.1rem);
          box-sizing: border-box;
        }

        /* mono annotations */
        .cp-anno {
          position: absolute;
          z-index: 4;
          font-family: var(--font-mono), monospace;
          font-size: clamp(7px, 0.58vw, 8.5px);
          letter-spacing: 0.16em;
          color: var(--cp-paper);
          opacity: 0.72;
          text-transform: uppercase;
          white-space: nowrap;
          pointer-events: none;
        }
        .cp-anno-tl { top: clamp(1.2rem, 2.2vw, 1.7rem); left: clamp(1.35rem, 2.5vw, 2rem); }
        .cp-anno-tr { top: clamp(1.2rem, 2.2vw, 1.7rem); right: clamp(1.35rem, 2.5vw, 2rem); }
        .cp-anno-bl { bottom: clamp(1.15rem, 2vw, 1.7rem); left: clamp(1.35rem, 2.5vw, 2rem); }
        .cp-anno-br { bottom: clamp(1.15rem, 2vw, 1.7rem); right: clamp(1.35rem, 2.5vw, 2rem); }

        /* ── HERO NUMBER ── */
        .cp-hero {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          padding-top: clamp(1.4rem, 2.6vw, 2.1rem);
          padding-bottom: clamp(0.35rem, 0.8vw, 0.6rem);
        }

        .cp-hero-label {
          display: block;
          position: relative;
          z-index: 2;
          font-family: var(--font-mono), monospace;
          font-size: clamp(7.5px, 0.64vw, 9px);
          letter-spacing: 0.24em;
          font-weight: 700;
          color: var(--accent);
          margin-bottom: clamp(2px, 0.4vw, 5px);
        }

        .cp-hero-number {
          position: relative;
          z-index: 2;
          display: flex;
          font-family: var(--font-display), sans-serif;
          font-size: clamp(3.4rem, 7.4vw, 5.8rem);
          font-weight: 800;
          font-stretch: 92%;
          line-height: 0.82;
          letter-spacing: -0.04em;
          font-variant-numeric: tabular-nums;
          color: var(--cp-paper);
        }

        .cp-odo { display: inline-flex; }
        .cp-odo-slot { display: block; height: 1em; overflow: hidden; line-height: 0.82; }
        .cp-odo-strip {
          display: flex;
          flex-direction: column;
          transition: transform 1450ms cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }
        .cp-odo-cell { display: block; height: 1em; line-height: 0.82; }

        .cp-hero-foot {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-top: clamp(0.4rem, 0.9vw, 0.75rem);
          padding-top: clamp(0.35rem, 0.8vw, 0.6rem);
          border-top: 1px dashed rgba(243, 238, 232, 0.16);
        }

        .cp-hero-delta {
          font-family: var(--font-mono), monospace;
          font-size: clamp(8px, 0.64vw, 9.5px);
          letter-spacing: 0.14em;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--cp-paper);
        }

        .cp-hero-sub {
          font-family: var(--font-mono), monospace;
          font-size: clamp(7px, 0.56vw, 8.5px);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          border: 1px solid var(--accent);
          padding: 1px 6px;
          border-radius: 2px;
          white-space: nowrap;
        }

        /* ── VISUAL PANELS ── */
        .cp-visual {
          position: relative;
          border: 1px solid rgba(243, 238, 232, 0.13);
          background:
            repeating-linear-gradient(135deg, rgba(243, 238, 232, 0.022) 0 1px, transparent 1px 7px),
            rgba(0, 0, 0, 0.3);
          padding: clamp(0.7rem, 1.3vw, 1.05rem);
          overflow: hidden;
        }

        .cp-chart-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 6px;
          font-family: var(--font-mono), monospace;
          font-size: clamp(7px, 0.58vw, 8.5px);
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: var(--cp-paper);
          opacity: 0.82;
        }

        .cp-chart-head-live { color: var(--cp-paper); opacity: 1; font-weight: 700; }

        .cp-chart-wrap { position: relative; width: 100%; }
        .cp-chart { display: block; overflow: visible; }

        .cp-chart-axis-lbl {
          font-family: var(--font-mono), monospace;
          font-size: 7px;
          letter-spacing: 0.04em;
        }

        .cp-chart-max {
          font-family: var(--font-mono), monospace;
          font-size: 7.5px;
          letter-spacing: 0.1em;
          font-weight: 800;
        }

        .cp-chart-area { opacity: 0; transition: opacity 900ms ease 520ms; }
        .cp-chart-area[data-visible='true'] { opacity: 1; }

        .cp-chart-line {
          transition: stroke-dashoffset 1600ms cubic-bezier(0.33, 1, 0.68, 1) 120ms;
        }

        .cp-chart-halo, .cp-chart-dot {
          opacity: 0;
          transition: opacity 480ms ease 1250ms;
        }

        .cp-chart-wrap:has(.cp-chart-area[data-visible='true']) .cp-chart-dot,
        .cp-chart-wrap:has(.cp-chart-area[data-visible='true']) .cp-chart-halo { opacity: 1; }

        .cp-chart-tip {
          position: absolute;
          z-index: 5;
          transform: translate(-50%, -100%);
          display: flex;
          flex-direction: column;
          gap: 3px;
          max-width: 190px;
          padding: 6px 8px;
          background: #101014;
          border: 1px solid rgba(243, 238, 232, 0.3);
          box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.65);
          pointer-events: none;
        }

        .cp-chart-tip-name {
          font-family: var(--font-mono), monospace;
          font-size: 7.5px;
          letter-spacing: 0.05em;
          line-height: 1.3;
          color: var(--cp-paper);
          opacity: 0.82;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .cp-chart-tip-meta {
          display: flex;
          align-items: baseline;
          gap: 7px;
          font-family: var(--font-mono), monospace;
          font-size: 8.5px;
        }
        .cp-chart-tip-meta b { font-size: 11px; color: var(--cp-paper); }
        .cp-chart-tip-meta i { font-style: normal; font-size: 7.5px; }
        .cp-chart-tip-meta em { font-style: normal; font-size: 7.5px; color: var(--cp-paper); opacity: 0.72; }

        .cp-chart-empty {
          min-height: clamp(140px, 18vw, 180px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 1rem;
          text-align: center;
          border: 1px dashed rgba(243, 238, 232, 0.18);
          background: repeating-linear-gradient(45deg, rgba(0, 163, 255, 0.05) 0 2px, transparent 2px 8px);
        }
        .cp-chart-empty-mark { font-size: 24px; line-height: 1; color: var(--cp-blue); opacity: 0.6; }
        .cp-chart-empty-title {
          font-family: var(--font-mono), monospace;
          font-size: 9px; font-weight: 800; letter-spacing: 0.18em; color: var(--cp-paper);
        }
        .cp-chart-empty-sub {
          font-family: var(--font-mono), monospace;
          font-size: 7px; letter-spacing: 0.12em; color: var(--cp-paper); opacity: 0.72;
        }

        /* ── DIFFICULTY LEGEND ── */
        .cp-legend {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: clamp(5px, 0.8vw, 9px);
          width: 100%;
        }

        .cp-legend-inline {
          justify-content: flex-start;
          margin-top: clamp(8px, 1.2vw, 12px);
        }

        .cp-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: clamp(3px, 0.45vw, 5px) clamp(6px, 0.75vw, 9px);
          background: rgba(243, 238, 232, 0.04);
          border: 1px solid rgba(243, 238, 232, 0.16);
          font-family: var(--font-mono), monospace;
          font-size: clamp(7px, 0.6vw, 8.5px);
          letter-spacing: 0.08em;
        }
        .cp-chip-idx { color: var(--cp-paper); opacity: 0.65; font-size: 0.85em; }
        .cp-chip-dot { width: 5px; height: 5px; }
        .cp-chip-label { color: var(--cp-paper); opacity: 0.82; }
        .cp-chip-val { color: var(--cp-paper); font-weight: 800; }

        /* ── STATS MATRIX ── */
        .cp-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border: 1px solid rgba(243, 238, 232, 0.16);
          background: rgba(0, 0, 0, 0.34);
        }

        .cp-cell {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 2px;
          min-height: clamp(64px, 7.5vw, 84px);
          padding: clamp(0.6rem, 1.1vw, 0.9rem) clamp(0.45rem, 0.85vw, 0.75rem);
          border-right: 1px solid rgba(243, 238, 232, 0.14);
          min-width: 0;
        }
        .cp-cell:last-child { border-right: none; }

        .cp-cell-idx {
          position: absolute;
          top: 5px;
          right: 6px;
          font-family: var(--font-mono), monospace;
          font-size: clamp(6px, 0.5vw, 7.5px);
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--cp-paper);
          opacity: 0.6;
        }

        .cp-cell-value {
          font-family: var(--font-display), sans-serif;
          font-size: clamp(1.15rem, 1.9vw, 1.7rem);
          font-weight: 700;
          font-stretch: 92%;
          line-height: 1;
          letter-spacing: -0.01em;
          color: var(--cp-paper);
          font-variant-numeric: tabular-nums;
          overflow-wrap: anywhere;
        }

        .cp-cell-label {
          font-family: var(--font-mono), monospace;
          font-size: clamp(6.5px, 0.54vw, 8px);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--cp-paper);
          opacity: 0.8;
        }

        /* ── FOOTER: inside .card-inner, pinned to bottom ── */
        .cp-footer {
          position: relative;
          z-index: 6;
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          width: 100%;
          box-sizing: border-box;
          padding: clamp(0.75rem, 1.4vw, 1.05rem) clamp(1rem, 2vw, 1.5rem);
          background: rgba(243, 238, 232, 0.04);
          border-top: 1px solid rgba(243, 238, 232, 0.18);
          border-left: none;
          border-right: none;
          border-bottom: none;
          color: var(--cp-paper);
          text-decoration: none;
          overflow: hidden;
          transition: color 200ms ease, border-color 200ms ease;
          isolation: isolate;
        }

        /* fill sweep */
        .cp-footer::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 340ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cp-footer:hover::before,
        .cp-footer:focus-visible::before { transform: scaleX(1); }
        .cp-footer:hover, .cp-footer:focus-visible { color: #08080a; border-color: var(--accent); }

        .cp-footer-label {
          font-family: var(--font-display), sans-serif;
          font-size: clamp(1.05rem, 1.8vw, 1.5rem);
          font-weight: 800;
          font-stretch: 92%;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          line-height: 1;
        }

        .cp-footer-arrow {
          display: inline-flex;
          align-items: center;
          font-size: clamp(1rem, 1.5vw, 1.25rem);
          font-weight: 900;
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cp-footer:hover .cp-footer-arrow,
        .cp-footer:focus-visible .cp-footer-arrow { transform: translate3d(6px, -5px, 0); }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .cp-grid { grid-template-columns: minmax(0, 1fr); }
        }

        @media (max-width: 640px) {
          .cp-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .cp-cell:nth-child(2n) { border-right: none; }
          .cp-cell:nth-child(-n + 2) { border-bottom: 1px solid rgba(243, 238, 232, 0.14); }
          .cp-anno-tr, .cp-anno-br { display: none; }
          .cp-stickers { top: 2.8rem; right: -4px; max-width: 50%; }
          .cp-chart-tip { max-width: 150px; }
        }

        @media (max-width: 400px) {
          .cp-sticker { letter-spacing: 0.06em; }
          .cp-hero-number { font-size: clamp(3rem, 14vw, 3.6rem); }
        }

        /* ── GITHUB-STYLE PLATFORM ROWS ── */
        .cp-platform {
          --row-accent: var(--cp-paper);
          margin-top: clamp(2.5rem, 5vw, 4rem);
        }

        .cp-platform + .cp-platform {
          margin-top: clamp(3.25rem, 6vw, 5rem);
        }

        .cp-platform-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          padding-bottom: 0.9rem;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid rgba(243, 238, 232, 0.14);
        }

        .cp-platform-ident {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
          flex-wrap: wrap;
        }

        .cp-platform-line {
          width: 22px;
          height: 2px;
          background: var(--row-accent);
          flex-shrink: 0;
        }

        .cp-platform-fig {
          font-family: var(--font-mono), monospace;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--cp-paper);
          opacity: 0.45;
          white-space: nowrap;
        }

        .cp-platform-name {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: var(--cp-paper);
          white-space: nowrap;
        }

        .cp-platform-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono), monospace;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--cp-paper);
          opacity: 0.62;
          white-space: nowrap;
        }

        .cp-platform-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--row-accent);
          flex-shrink: 0;
        }

        .cp-platform-status.is-offline .cp-platform-status-dot {
          background: #71717a;
        }

        .cp-platform-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 9999px;
          background: var(--row-accent);
          color: #0a0a0a;
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 3px 3px 0 #000;
          transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
        }

        .cp-platform-link:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 #000;
          filter: brightness(1.08);
        }

        .cp-platform-grid {
          display: grid;
          grid-template-columns: minmax(300px, 0.85fr) minmax(0, 1.65fr);
          gap: clamp(1.5rem, 4vw, 4rem);
          align-items: stretch;
        }

        .cp-platform-grid > .fade-in {
          min-width: 0;
          height: 100%;
        }

        .cp-platform-stats {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-auto-rows: 1fr;
          gap: 12px;
          height: 100%;
        }

        .cp-stat-plate {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 8px;
          padding: 1.15rem;
          min-width: 0;
          border: 1px solid rgba(243, 238, 232, 0.16);
          background: rgba(255, 255, 255, 0.015);
          box-shadow: 3px 3px 0 #000;
          box-sizing: border-box;
        }

        .cp-stat-plate-value {
          font-family: var(--font-display), sans-serif;
          font-size: clamp(2rem, 3.2vw, 3rem);
          font-weight: 800;
          font-stretch: 90%;
          line-height: 1;
          letter-spacing: -0.02em;
          color: var(--cp-paper);
          font-variant-numeric: tabular-nums;
          overflow-wrap: anywhere;
        }

        .cp-stat-plate-label {
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          line-height: 1.4;
          color: var(--cp-paper);
          opacity: 0.62;
          min-height: 2.4em;
        }

        .cp-difficulty-plate {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.65rem;
          width: 100%;
        }

        .cp-difficulty-plate .cp-stat-plate-label {
          min-height: 0;
        }

        .cp-difficulty-rows {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .cp-difficulty-row {
          display: flex;
          align-items: center;
          gap: 7px;
          min-width: 0;
        }

        .cp-difficulty-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .cp-difficulty-name {
          font-family: var(--font-mono), monospace;
          font-size: 8.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--cp-paper);
          opacity: 0.62;
        }

        .cp-difficulty-value {
          margin-left: auto;
          font-family: var(--font-display), sans-serif;
          font-size: 1.15rem;
          font-weight: 800;
          font-stretch: 92%;
          line-height: 1;
          letter-spacing: -0.01em;
          color: var(--cp-paper);
          font-variant-numeric: tabular-nums;
        }

        .cp-platform-chart {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 1.15rem;
          border: 1px solid rgba(243, 238, 232, 0.16);
          background: rgba(255, 255, 255, 0.015);
          box-shadow: 4px 4px 0 #000;
          box-sizing: border-box;
        }

        .cp-platform-chart .cp-chart-head {
          flex-shrink: 0;
          margin-bottom: 0.9rem;
          font-size: 10px;
          letter-spacing: 0.1em;
          opacity: 0.75;
        }

        .cp-platform-chart-body {
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .cp-platform-chart .cp-chart-wrap,
        .cp-platform-chart .cp-chart {
          width: 100%;
        }

        .cp-platform-chart .cp-chart {
          height: auto;
        }

        .cp-platform-chart-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          flex-shrink: 0;
          margin-top: 0.9rem;
          padding-top: 0.9rem;
          border-top: 1px solid rgba(243, 238, 232, 0.1);
        }

        .cp-platform-chart-foot .cp-legend-inline {
          margin-top: 0;
        }

        .cp-platform-tier,
        .cp-platform-foot-note {
          font-family: var(--font-mono), monospace;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .cp-platform-foot-note {
          color: var(--cp-paper);
          opacity: 0.55;
        }

        @media (max-width: 1024px) {
          .cp-platform-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }

          .cp-platform-stats {
            height: auto;
          }

          .cp-platform-chart {
            height: auto;
          }
        }

        @media (max-width: 640px) {
          .cp-platform {
            margin-top: 2.5rem;
          }

          .cp-platform + .cp-platform {
            margin-top: 3rem;
          }

          .cp-platform-head {
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 0.85rem;
          }

          .cp-platform-link {
            font-size: 10px;
            padding: 7px 14px;
          }

          .cp-stat-plate {
            padding: 0.9rem;
          }

          .cp-stat-plate-value {
            font-size: clamp(1.5rem, 8vw, 2rem);
          }

          .cp-stat-plate-label {
            font-size: 9px;
            min-height: 2.8em;
          }

          .cp-platform-chart {
            padding: 0.9rem;
          }

          .cp-platform-chart .cp-chart-head {
            font-size: 9px;
          }
        }

        @media (max-width: 480px) {
          .cp-platform-grid {
            gap: 10px;
          }

          .cp-platform-stats {
            gap: 10px;
          }

          .cp-platform-fig {
            display: none;
          }

          .cp-platform-chart .cp-chart-head {
            font-size: 8px;
            letter-spacing: 0.08em;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .card-frame,
          .card-frame[data-entered='true'] {
            transform: none !important;
            opacity: 1 !important;
            transition: none !important;
          }
          .cp-ticker,
          .cp-ticker[data-entered='true'] {
            transform: none !important;
            opacity: 1 !important;
            transition: none !important;
          }
          .cp-ticker-track { animation: none !important; }
          .cp-sticker,
          .card-frame[data-entered='true'] .cp-sticker {
            opacity: 1 !important;
            transition: none !important;
            transform: rotate(-6deg) !important;
          }
          .card-frame[data-entered='true'] .cp-sticker-live { transform: rotate(4deg) !important; }
          .card-frame[data-entered='true'] .cp-sticker-best { transform: rotate(-2deg) !important; }
          .cp-odo-strip { transition: none !important; }
          .cp-chart-line { transition: none !important; }
          .cp-chart-area, .cp-chart-dot, .cp-chart-halo {
            opacity: 1 !important;
            transition: none !important;
          }
          .cp-footer::before { transition: none !important; }
          .cp-live-dot, .cp-sync-dot { animation: none !important; opacity: 1 !important; }
          .cp-spotlight { display: none !important; }
        }
      `}</style>
    </section>
  )
}
