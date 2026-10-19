'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'

import meta from '@/data/meta.json'
import cpDefaults from '@/data/cpDefaults.json'
import FadeIn from './FadeIn'
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
  CfHistoryEntry,
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
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)'

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
}

const FALLBACK_CF: CodeforcesData = {
  rating: cpDefaults.codeforces.rating,
  maxRating: Math.max(cpDefaults.codeforces.rating, cpDefaults.codeforces.maxRating),
  contests: cpDefaults.codeforces.contestsCount,
  solved: cpDefaults.codeforces.solvedCount,
  tier: computeCfTier(cpDefaults.codeforces.rating),
  history: [],
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

/* ── Odometer ── */
function Odometer({ value, visible, reduced }: { value: number; visible: boolean; reduced: boolean }) {
  const digits = String(Math.max(0, Math.round(value))).split('')

  return (
    <span className="cp-odo" aria-label={String(value)}>
      {digits.map((digit, i) => {
        const target = Number(digit)
        const rolled = reduced || visible ? target : 0
        return (
          <span className="cp-odo-slot" key={`${digits.length}-${i}`} aria-hidden="true">
            <span
              className="cp-odo-strip"
              style={{
                transform: `translate3d(0, -${rolled * 10}%, 0)`,
                transitionDelay: reduced ? '0ms' : `${i * 85}ms`,
              }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <span className="cp-odo-cell" key={n}>{n}</span>
              ))}
            </span>
          </span>
        )
      })}
    </span>
  )
}

/* ── Ticker strip ── */
function TickerStrip({ items, accent, entered }: { items: string[]; accent: string; entered: boolean }) {
  const line = items.filter(Boolean).join('  ★  ')
  return (
    <div className="cp-ticker" data-entered={entered} style={{ background: accent }}>
      <div className="cp-ticker-track">
        <span className="cp-ticker-text">{line} ★ </span>
        <span className="cp-ticker-text" aria-hidden="true">{line} ★ </span>
      </div>
    </div>
  )
}

/* ── LeetCode Concentric Multi-Ring Donut ── */
const LC_RINGS = [
  { key: 'easy' as const, label: 'EASY', color: PAPER },
  { key: 'medium' as const, label: 'MED', color: AMBER },
  { key: 'hard' as const, label: 'HARD', color: ORANGE },
]

function RingDonut({
  easy,
  medium,
  hard,
  total,
  visible,
  reduced,
}: {
  easy: number
  medium: number
  hard: number
  total: number
  visible: boolean
  reduced: boolean
}) {
  const values = { easy, medium, hard }
  const radii = [80, 62, 44]
  const stroke = 9
  const size = 220
  const solvedTotal = Math.max(1, easy + medium + hard)

  return (
    <div className="cp-donut-wrap">
      <div className="cp-donut-graphic">
        <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`LeetCode solved breakdown: ${easy} easy, ${medium} medium, ${hard} hard out of ${solvedTotal}`}>
          <defs>
            <filter id="cpRingGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {LC_RINGS.map((ring, index) => {
            const radius = radii[index]
            const circumference = 2 * Math.PI * radius
            const ratio = Math.min(1, Math.max(0.012, values[ring.key] / solvedTotal))
            const finalOffset = circumference * (1 - ratio)
            return (
              <g key={ring.key} transform={`rotate(-90 ${size / 2} ${size / 2})`}>
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={PAPER} strokeOpacity="0.09" strokeWidth={stroke} />
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={ring.color}
                  strokeWidth={stroke}
                  strokeDasharray={circumference}
                  strokeDashoffset={reduced || visible ? finalOffset : circumference}
                  className="cp-ring"
                  style={{
                    transitionDelay: reduced ? '0ms' : `${index * 130}ms`,
                    filter: index === 1 ? 'url(#cpRingGlow)' : undefined,
                  }}
                />
              </g>
            )
          })}
        </svg>
        <div className="cp-donut-center">
          <span className="cp-donut-total">{total}</span>
          <span className="cp-donut-cap">SOLVED</span>
        </div>
      </div>
      <div className="cp-legend">
        {LC_RINGS.map((ring, i) => (
          <span className="cp-chip" key={ring.key}>
            <span className="cp-chip-idx">0{i + 1}</span>
            <i className="cp-chip-dot" style={{ background: ring.color }} />
            <span className="cp-chip-label">{ring.label}</span>
            <span className="cp-chip-val">{values[ring.key]}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Codeforces Rating History Chart ── */
function RatingChart({
  history,
  maxRating,
  visible,
  reduced,
  loading,
}: {
  history: CfHistoryEntry[]
  maxRating: number
  visible: boolean
  reduced: boolean
  loading: boolean
}) {
  const [hover, setHover] = useState<number | null>(null)
  const width = 520
  const height = 190
  const pad = { top: 22, right: 68, bottom: 26, left: 38 }

  const active = hover !== null && history[hover] ? history[hover] : null

  const ratings = history.map((entry) => entry.newRating)
  const allVals = ratings.length > 0 ? ratings : [maxRating]

  const rawMin = Math.min(...allVals, maxRating)
  const rawMax = Math.max(...allVals, maxRating)

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
    if (history.length === 0) return null
    const count = history.length
    const x = (i: number) => pad.left + (count <= 1 ? innerW / 2 : (i / (count - 1)) * innerW)
    const y = (rating: number) =>
      pad.top + (1 - (rating - yDomainMin) / (yDomainMax - yDomainMin || 1)) * innerH

    const pts = history.map((entry, index) => [x(index), y(entry.newRating)] as [number, number])
    const line = pts.reduce((acc, [px, py], i) => (i === 0 ? `M ${px} ${py}` : `${acc} L ${px} ${py}`), '')
    const area = `${line} L ${x(count - 1)} ${pad.top + innerH} L ${x(0)} ${pad.top + innerH} Z`
    return { x, y, line, area, count, pts }
  }, [history, yDomainMin, yDomainMax, innerW, innerH, pad.left, pad.top])

  if (!geo || history.length === 0) {
    return (
      <div className="cp-chart-empty">
        <span className="cp-chart-empty-mark">{loading ? '◌' : '⊘'}</span>
        <span className="cp-chart-empty-title">
          {loading ? 'SYNCING RATING HISTORY' : 'NO RATING TELEMETRY FOUND'}
        </span>
        <span className="cp-chart-empty-sub">
          {loading ? 'CF.API // AWAITING CONTEST DATA' : 'OFFLINE OR NO CONTEST HISTORY RETURNED'}
        </span>
        {!loading && <span className="cp-chart-empty-sub">LIVE STATS ABOVE ARE STILL SYNCED</span>}
      </div>
    )
  }

  const maxY = geo.y(maxRating)
  const lastX = geo.x(history.length - 1)
  const lastY = geo.y(history[history.length - 1].newRating)

  return (
    <div className="cp-chart-wrap">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="cp-chart"
        preserveAspectRatio="none"
        role="img"
        aria-label="Codeforces rating trajectory"
      >
        <defs>
          <linearGradient id="cpChartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ELECTRIC} stopOpacity="0.32" />
            <stop offset="65%" stopColor={ELECTRIC} stopOpacity="0.08" />
            <stop offset="100%" stopColor={ELECTRIC} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cpChartStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={ELECTRIC} stopOpacity="0.65" />
            <stop offset="70%" stopColor={ELECTRIC} stopOpacity="1" />
            <stop offset="100%" stopColor={PAPER} stopOpacity="0.95" />
          </linearGradient>
          <filter id="cpChartGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
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
                fillOpacity="0.35"
                className="cp-chart-axis-lbl"
              >
                {tickVal}
              </text>
            </g>
          )
        })}

        {/* Max rating dashed line with right-padded MAX label */}
        <line
          x1={pad.left}
          x2={pad.left + innerW}
          y1={maxY}
          y2={maxY}
          stroke={ELECTRIC}
          strokeOpacity="0.55"
          strokeDasharray="4 4"
        />
        <text
          x={width - 6}
          y={maxY + 3}
          textAnchor="end"
          fill={ELECTRIC}
          className="cp-chart-max"
        >
          MAX {maxRating}
        </text>

        <path d={geo.area} fill="url(#cpChartFill)" className="cp-chart-area" data-visible={visible || reduced} />
        <path
          d={geo.line}
          fill="none"
          stroke="url(#cpChartStroke)"
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
          r={7}
          fill={ELECTRIC}
          fillOpacity="0.25"
          filter="url(#cpChartGlow)"
          className="cp-chart-halo"
        />
        <circle
          cx={lastX}
          cy={lastY}
          r={3.5}
          fill={PAPER}
          stroke={ELECTRIC}
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
            top: `${Math.max(6, (geo.y(active.newRating) / height) * 100 - 4)}%`,
          }}
        >
          <span className="cp-chart-tip-name">{active.contestName}</span>
          <span className="cp-chart-tip-meta">
            <b>{active.newRating}</b>
            <i style={{ color: active.newRating >= active.oldRating ? PAPER : ORANGE }}>
              {active.newRating >= active.oldRating ? '▲' : '▼'}
              {Math.abs(active.newRating - active.oldRating)}
            </i>
            <em>#{active.rank}</em>
          </span>
        </div>
      )}
    </div>
  )
}

function useCardMotion(enabled: boolean) {
  const cleanup = useRef<(() => void) | null>(null)

  const attach = (el: HTMLElement | null) => {
    cleanup.current?.()
    cleanup.current = null
    if (!el || !enabled) return

    let frame = 0
    let targetX = 0
    let targetY = 0

    const apply = () => {
      frame = 0
      el.style.setProperty('--tilt-x', `${targetY * 4}deg`)
      el.style.setProperty('--tilt-y', `${-targetX * 4}deg`)
      el.style.setProperty('--shift-x', `${targetX * 6}px`)
      el.style.setProperty('--shift-y', `${targetY * 6}px`)
    }

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      el.style.setProperty('--mx', `${x}px`)
      el.style.setProperty('--my', `${y}px`)
      targetX = (x / rect.width - 0.5) * 2
      targetY = (y / rect.height - 0.5) * 2
      if (!frame) frame = requestAnimationFrame(apply)
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
      el.style.setProperty('--tilt-x', '0deg')
      el.style.setProperty('--tilt-y', '0deg')
      el.style.setProperty('--shift-x', '0px')
      el.style.setProperty('--shift-y', '0px')
      el.style.setProperty('--mx', '50%')
      el.style.setProperty('--my', '50%')
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    cleanup.current = () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }

  useEffect(() => () => cleanup.current?.(), [])
  return attach
}

function StatCell({ index, value, label, accent }: { index: string; value: string; label: string; accent?: string }) {
  return (
    <div className="cp-cell">
      <span className="cp-cell-idx">{index}</span>
      <span className="cp-cell-value" style={accent ? { color: accent } : undefined}>{value}</span>
      <span className="cp-cell-label">{label}</span>
    </div>
  )
}

function Stickers({
  rank,
  live,
  bestLabel,
  bestValue,
  rankColor,
}: {
  rank: string
  live: string
  bestLabel: string
  bestValue: string
  rankColor?: string
}) {
  return (
    <div className="cp-stickers" aria-hidden="true">
      <span className="cp-sticker cp-sticker-rank" style={rankColor ? { color: rankColor, borderColor: rankColor } : undefined}>
        {rank}
      </span>
      <span className="cp-sticker cp-sticker-live">
        <i className="cp-live-dot" />
        {live}
      </span>
      <span className="cp-sticker cp-sticker-best">
        <small>{bestLabel}</small>
        <b>{bestValue}</b>
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   CardShell: Restructured into .card-frame > .card-inner
   Strict uniform --gap, off-white crop marks, hard shadow on .card-frame only,
   content & tickers inside .card-inner, footer pinned to bottom
   ───────────────────────────────────────────────────────── */
function CardShell({
  accent,
  fig,
  sys,
  number,
  handle,
  ticker,
  rank,
  live,
  bestLabel,
  bestValue,
  rankColor,
  rating,
  ghostRating,
  ratingColor,
  heroLabel,
  heroFoot,
  visual,
  stats,
  profileHref,
  reduced,
  finePointer,
}: {
  accent: string
  fig: string
  sys: string
  number: string
  handle: string
  ticker: string[]
  rank: string
  live: string
  bestLabel: string
  bestValue: string
  rankColor?: string
  rating: number | null
  ghostRating?: number | string | null
  ratingColor?: string
  heroLabel: string
  heroFoot: React.ReactNode
  visual: React.ReactNode
  stats: React.ReactNode
  profileHref: string
  reduced: boolean
  finePointer: boolean
}) {
  const [cardRef, entered] = useInView<HTMLElement>(0.12)
  const attachMotion = useCardMotion(finePointer && !reduced)

  return (
    <div className="cp-stage">
      <article
        ref={(node) => {
          cardRef.current = node
          attachMotion(node)
        }}
        className="card-frame"
        data-entered={entered}
        style={{ '--accent': accent } as React.CSSProperties}
      >
        {/* 4 L-shaped crop marks: 12px, 2px stroke, in off-white 2px from frame corners */}
        <div className="card-crop-marks" aria-hidden="true">
          <span className="crop-mark crop-tl" />
          <span className="crop-mark crop-tr" />
          <span className="crop-mark crop-bl" />
          <span className="crop-mark crop-br" />
        </div>

        {/* Stickers are children of .card-frame so they can overlap the edge */}
        <Stickers rank={rank} live={live} bestLabel={bestLabel} bestValue={bestValue} rankColor={rankColor} />

        {/* Inner Card Frame */}
        <div className="card-inner">
          <div className="cp-noise" aria-hidden="true" />
          <div className="cp-halftone" aria-hidden="true" />
          <div className="cp-spotlight" aria-hidden="true" />

          {/* Ticker strip inside .card-inner */}
          <TickerStrip items={ticker} accent={accent} entered={entered} />

          {/* Content panel */}
          <div className="cp-body">
            <span className="cp-anno cp-anno-tl">{fig}</span>
            <span className="cp-anno cp-anno-tr">{sys}</span>
            <span className="cp-anno cp-anno-bl">{number}</span>
            <span className="cp-anno cp-anno-br">@{handle}</span>

            {/* Hero number with static ghost copy cleanly clipped inside .cp-hero */}
            <div className="cp-hero">
              {ghostRating !== undefined && ghostRating !== null && (
                <div className="cp-ghost" aria-hidden="true">{ghostRating}</div>
              )}
              <span className="cp-hero-label">{heroLabel}</span>
              <div className="cp-hero-number" style={ratingColor ? { color: ratingColor } : undefined}>
                {rating !== null ? (
                  <Odometer value={rating} visible={entered} reduced={reduced} />
                ) : (
                  <span>—</span>
                )}
              </div>
              <div className="cp-hero-foot">{heroFoot}</div>
            </div>

            {/* Visuals: Donut / Chart */}
            <div className="cp-visual">{visual}</div>

            {/* 4-cell stats grid */}
            <div className="cp-stats">{stats}</div>
          </div>

          {/* Footer pinned to bottom of .card-inner */}
          <a className="cp-footer" href={profileHref} target="_blank" rel="noreferrer">
            <span className="cp-footer-label">VIEW PROFILE</span>
            <span className="cp-footer-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
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

  // Client-side offline cache safety net (never refetching from browser)
  useEffect(() => {
    let frame = 0
    try {
      const saved = localStorage.getItem('cp-last-good')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (!initialData?.cf && parsed.cf) {
          frame = requestAnimationFrame(() => setCf(parsed.cf))
        }
        if (!initialData?.lc && parsed.lc) {
          frame = requestAnimationFrame(() => setLc(parsed.lc))
        }
      }
      if (initialData?.cf || initialData?.lc) {
        localStorage.setItem(
          'cp-last-good',
          JSON.stringify({
            cf: initialData?.cf ?? cf,
            lc: initialData?.lc ?? lc,
            savedAt: Date.now(),
          })
        )
      }
    } catch {
      // Ignore localStorage access errors
    }
    return () => cancelAnimationFrame(frame)
  }, [initialData, cf, lc])

  // Sync latest solved counts to shared external store
  useEffect(() => {
    setSolvedCounts({
      leetcode: lc.solved,
      codeforces: cf.solved,
    })
  }, [lc.solved, cf.solved])

  const [syncedTime, setSyncedTime] = useState('JUST NOW')

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (initialData?.fetchedAt) {
        const hours = Math.floor((Date.now() - initialData.fetchedAt) / (1000 * 60 * 60))
        setSyncedTime(`${Math.max(1, hours)}H AGO`)
        return
      }
      const hrs = new Date().getHours()
      setSyncedTime(`${hrs === 0 ? 12 : hrs}H AGO`)
    })
    return () => cancelAnimationFrame(frame)
  }, [initialData?.fetchedAt])

  const reduced = useMediaQuery(REDUCED_QUERY)
  const finePointer = useMediaQuery(FINE_POINTER_QUERY, false)

  const [lcSectionRef, lcVisible] = useInView<HTMLDivElement>(0.12)
  const [cfSectionRef, cfVisible] = useInView<HTMLDivElement>(0.12)

  // Animated counts reading strictly from normalized data using non-overshoot easeOutCubic
  const lcTotal = useCountUp(lc.solved, lcVisible)
  const lcEasy = useCountUp(lc.easy, lcVisible)
  const lcMedium = useCountUp(lc.medium, lcVisible)
  const lcHard = useCountUp(lc.hard, lcVisible)
  const lcRating = useCountUp(lc.rating, lcVisible)
  const lcContests = useCountUp(lc.contests, lcVisible)

  const cfSolved = useCountUp(cf.solved, cfVisible)
  const cfRating = useCountUp(cf.rating, cfVisible)
  const cfContests = useCountUp(cf.contests, cfVisible)

  // LeetCode Ticker items reading from normalized object
  const lcTicker = [
    `${lc.solved} SOLVED`,
    lc.topPercent !== null ? `TOP ${lc.topPercent}%` : '',
    lc.contests !== null ? pluralize(lc.contests, 'CONTEST', 'CONTESTS') : '',
    lc.rating !== null ? `${lc.rating} RATING` : '',
    'KEEP SOLVING',
  ].filter(Boolean)

  // Codeforces Ticker items reading from normalized object
  const cfTicker = [
    `${cf.rating} ★ ${cf.tier.label}`,
    pluralize(cf.contests, 'CONTEST', 'CONTESTS'),
    `${cf.solved} SOLVED`,
    `MAX ${cf.maxRating}`,
    'KEEP SOLVING',
  ].filter(Boolean)

  // LeetCode Best Rank sticker value
  const lcBestSticker = lc.globalRank !== null
    ? `#${lc.globalRank.toLocaleString()}`
    : lc.ranking
    ? `#${lc.ranking}`
    : '—'

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

      <FadeIn delay={0.08}>
        <div className="cp-heading-row">
          <h2 className="cp-heading">{cpDefaults.sectionHeading}</h2>
          <span className="cp-heading-mark" aria-hidden="true">[ 02 // 07 ]</span>
        </div>
      </FadeIn>

      <div className="cp-grid">
        {/* ── CARD 01: LEETCODE ── */}
        <div ref={lcSectionRef} className="cp-col">
          <CardShell
            accent={AMBER}
            fig="FIG. 01"
            sys="SYS.LC // 2026"
            number="N°001"
            handle={LEETCODE_USERNAME.toUpperCase()}
            ticker={lcTicker}
            rank={lc.topPercent !== null ? `TOP ${lc.topPercent}%` : 'LEETCODE'}
            live="LIVE"
            bestLabel="BEST RANK"
            bestValue={lcBestSticker}
            rating={lcRating}
            ghostRating={lc.rating}
            heroLabel="CONTEST RATING // LC"
            heroFoot={
              <>
                <span className="cp-hero-delta">
                  {pluralize(lc.contests ?? 0, 'CONTEST', 'CONTESTS')} ATTENDED
                </span>
                {lc.badge && <span className="cp-hero-sub">{lc.badge.toUpperCase()}</span>}
              </>
            }
            visual={
              <>
                <div className="cp-chart-head">
                  <span>SOLVE TELEMETRY // BREAKDOWN</span>
                </div>
                <RingDonut
                  easy={lcEasy ?? lc.easy}
                  medium={lcMedium ?? lc.medium}
                  hard={lcHard ?? lc.hard}
                  total={lcTotal ?? lc.solved}
                  visible={lcVisible}
                  reduced={reduced}
                />
              </>
            }
            stats={
              <>
                <StatCell index="01" value={String(lcTotal ?? lc.solved)} label="SOLVED" />
                <StatCell
                  index="02"
                  value={lcContests !== null ? String(lcContests) : lc.contests !== null ? String(lc.contests) : '—'}
                  label={lc.contests === 1 ? 'CONTEST' : 'CONTESTS'}
                />
                <StatCell
                  index="03"
                  value={
                    lc.globalRank !== null
                      ? `#${lc.globalRank.toLocaleString()}`
                      : lc.ranking
                      ? `#${lc.ranking}`
                      : '—'
                  }
                  label="GLOBAL RANK"
                />
                <StatCell
                  index="04"
                  value={lc.topPercent !== null ? `${lc.topPercent}%` : '—'}
                  label="TOP PERCENT"
                  accent={AMBER}
                />
              </>
            }
            profileHref={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
            reduced={reduced}
            finePointer={finePointer}
          />
        </div>

        {/* ── CARD 02: CODEFORCES ── */}
        <div ref={cfSectionRef} className="cp-col">
          <CardShell
            accent={ELECTRIC}
            fig="FIG. 02"
            sys="SYS.CF // 2026"
            number="N°002"
            handle={CODEFORCES_USERNAME.toUpperCase()}
            ticker={cfTicker}
            rank={cf.tier.label}
            rankColor={cf.tier.color}
            live="LIVE"
            bestLabel="MAX"
            bestValue={String(cf.maxRating)}
            rating={cfRating ?? cf.rating}
            ghostRating={cf.rating}
            ratingColor={cf.tier.color}
            heroLabel="CONTEST RATING // CF"
            heroFoot={
              <>
                <span className="cp-hero-delta" style={{ color: cf.tier.color }}>
                  MAX {cf.maxRating} · {cf.tier.label}
                </span>
                <span className="cp-hero-sub">{cf.tier.label} TIER</span>
              </>
            }
            visual={
              <>
                <div className="cp-chart-head">
                  <span>RATING HISTORY // {pluralize(cf.history.length || cf.contests, 'CONTEST', 'CONTESTS')}</span>
                  <span className="cp-chart-head-live">LAST {cf.rating}</span>
                </div>
                <RatingChart
                  history={cf.history}
                  maxRating={cf.maxRating}
                  visible={cfVisible}
                  reduced={reduced}
                  loading={false}
                />
              </>
            }
            stats={
              <>
                <StatCell index="01" value={String(cfSolved ?? cf.solved)} label="SOLVED" />
                <StatCell
                  index="02"
                  value={String(cfContests ?? cf.contests)}
                  label={cf.contests === 1 ? 'CONTEST' : 'CONTESTS'}
                />
                <StatCell
                  index="03"
                  value={cf.maxRating > 0 ? String(cf.maxRating) : '—'}
                  label="MAX RATING"
                  accent={ELECTRIC}
                />
                <StatCell
                  index="04"
                  value={cf.tier.label}
                  label="CURRENT TIER"
                  accent={cf.tier.color}
                />
              </>
            }
            profileHref={`https://codeforces.com/profile/${CODEFORCES_USERNAME}`}
            reduced={reduced}
            finePointer={finePointer}
          />
        </div>
      </div>

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
          box-shadow: 0 0 12px rgba(250, 95, 52, 0.55);
        }

        .cp-label-text {
          font-family: var(--font-geist-mono), monospace;
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
          font-family: var(--font-geist-mono), monospace;
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

        @keyframes cpPulse {
          0% { box-shadow: 0 0 0 0 rgba(250, 95, 52, 0.55); opacity: 1; }
          70% { box-shadow: 0 0 0 7px rgba(250, 95, 52, 0); opacity: 0.5; }
          100% { box-shadow: 0 0 0 0 rgba(250, 95, 52, 0); opacity: 1; }
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
          font-family: 'Impact', 'Arial Black', 'Haettenschweiler', 'Franklin Gothic Bold', sans-serif;
          font-size: clamp(2.3rem, 6vw, 5rem);
          font-weight: 900;
          letter-spacing: -0.025em;
          color: var(--cp-paper);
          line-height: 0.88;
          margin: 0;
          text-transform: uppercase;
          text-wrap: balance;
        }

        .cp-heading-mark {
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(9px, 0.78vw, 11px);
          letter-spacing: 0.18em;
          color: var(--cp-paper);
          opacity: 0.38;
          white-space: nowrap;
          padding-bottom: 4px;
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
          font-family: var(--font-geist-mono), monospace;
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
          box-shadow: 0 0 8px var(--accent);
          animation: cpBlink 1.4s steps(2, end) infinite;
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
          background:
            radial-gradient(120% 85% at 12% 0%, rgba(255, 255, 255, 0.05), transparent 58%),
            linear-gradient(168deg, #111116 0%, #0a0a0c 48%, #070708 100%);
          overflow: hidden;
        }

        /* Spotlight traces the inner card */
        .cp-spotlight {
          position: absolute;
          inset: 0;
          border-radius: 1px;
          padding: 1px;
          background: radial-gradient(
            260px circle at var(--mx, 50%) var(--my, 50%),
            var(--accent),
            transparent 65%
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 240ms ease;
          pointer-events: none;
          z-index: 9;
        }

        .card-frame:hover .cp-spotlight { opacity: 0.85; }

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
          font-family: var(--font-geist-mono), monospace;
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
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(7px, 0.58vw, 8.5px);
          letter-spacing: 0.16em;
          color: var(--cp-paper);
          opacity: 0.4;
          text-transform: uppercase;
          white-space: nowrap;
          pointer-events: none;
        }
        .cp-anno-tl { top: clamp(1.2rem, 2.2vw, 1.7rem); left: clamp(1.35rem, 2.5vw, 2rem); }
        .cp-anno-tr { top: clamp(1.2rem, 2.2vw, 1.7rem); right: clamp(1.35rem, 2.5vw, 2rem); }
        .cp-anno-bl { bottom: clamp(1.15rem, 2vw, 1.7rem); left: clamp(1.35rem, 2.5vw, 2rem); }
        .cp-anno-br { bottom: clamp(1.15rem, 2vw, 1.7rem); right: clamp(1.35rem, 2.5vw, 2rem); }

        /* ── HERO NUMBER: overflow hidden clips ghost cleanly inside card ── */
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
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(7.5px, 0.64vw, 9px);
          letter-spacing: 0.24em;
          font-weight: 700;
          color: var(--accent);
          margin-bottom: clamp(2px, 0.4vw, 5px);
        }

        .cp-ghost {
          position: absolute;
          z-index: 0;
          left: clamp(-14px, -1.2vw, -6px);
          top: clamp(0.3rem, 1.2vw, 0.9rem);
          font-family: 'Impact', 'Arial Black', 'Haettenschweiler', 'Franklin Gothic Bold', sans-serif;
          font-size: clamp(4.8rem, 9.8vw, 8.8rem);
          font-weight: 900;
          line-height: 0.72;
          letter-spacing: -0.045em;
          color: transparent;
          -webkit-text-stroke: 1.3px rgba(243, 238, 232, 0.22);
          opacity: 0.5;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }

        .cp-hero-number {
          position: relative;
          z-index: 2;
          display: flex;
          font-family: 'Impact', 'Arial Black', 'Haettenschweiler', 'Franklin Gothic Bold', sans-serif;
          font-size: clamp(3.4rem, 7.4vw, 5.8rem);
          font-weight: 900;
          line-height: 0.82;
          letter-spacing: -0.035em;
          font-variant-numeric: tabular-nums;
          color: var(--cp-paper);
          text-shadow: 0 0 42px color-mix(in srgb, var(--accent) 24%, transparent);
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
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(8px, 0.64vw, 9.5px);
          letter-spacing: 0.14em;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--cp-paper);
        }

        .cp-hero-sub {
          font-family: var(--font-geist-mono), monospace;
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
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(7px, 0.58vw, 8.5px);
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: var(--cp-paper);
          opacity: 0.55;
        }

        .cp-chart-head-live { color: var(--cp-blue); opacity: 1; font-weight: 700; }

        .cp-chart-wrap { position: relative; width: 100%; }
        .cp-chart { display: block; overflow: visible; }

        .cp-chart-axis-lbl {
          font-family: var(--font-geist-mono), monospace;
          font-size: 7px;
          letter-spacing: 0.04em;
        }

        .cp-chart-max {
          font-family: var(--font-geist-mono), monospace;
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
          font-family: var(--font-geist-mono), monospace;
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
          font-family: var(--font-geist-mono), monospace;
          font-size: 8.5px;
        }
        .cp-chart-tip-meta b { font-size: 11px; color: var(--cp-blue); }
        .cp-chart-tip-meta i { font-style: normal; font-size: 7.5px; }
        .cp-chart-tip-meta em { font-style: normal; font-size: 7.5px; color: var(--cp-paper); opacity: 0.5; }

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
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px; font-weight: 800; letter-spacing: 0.18em; color: var(--cp-paper);
        }
        .cp-chart-empty-sub {
          font-family: var(--font-geist-mono), monospace;
          font-size: 7px; letter-spacing: 0.12em; color: var(--cp-paper); opacity: 0.4;
        }

        /* ── DONUT ── */
        .cp-donut-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(0.7rem, 1.3vw, 1rem);
          padding: clamp(0.2rem, 0.6vw, 0.5rem) 0;
        }

        .cp-donut-graphic { position: relative; width: clamp(150px, 20vw, 200px); aspect-ratio: 1; }
        .cp-donut-graphic svg { width: 100%; height: 100%; display: block; }
        .cp-ring { transition: stroke-dashoffset 1400ms cubic-bezier(0.16, 1, 0.3, 1); }

        .cp-donut-center {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1px;
          pointer-events: none;
        }

        .cp-donut-total {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: clamp(1.9rem, 3.4vw, 2.6rem);
          line-height: 0.9;
          color: var(--cp-paper);
        }

        .cp-donut-cap {
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(6.5px, 0.55vw, 8px);
          font-weight: 800;
          letter-spacing: 0.22em;
          color: var(--cp-orange);
        }

        .cp-legend {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: clamp(5px, 0.8vw, 9px);
          width: 100%;
        }

        .cp-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: clamp(3px, 0.45vw, 5px) clamp(6px, 0.75vw, 9px);
          background: rgba(243, 238, 232, 0.04);
          border: 1px solid rgba(243, 238, 232, 0.16);
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(7px, 0.6vw, 8.5px);
          letter-spacing: 0.08em;
        }
        .cp-chip-idx { color: var(--cp-paper); opacity: 0.35; font-size: 0.85em; }
        .cp-chip-dot { width: 5px; height: 5px; }
        .cp-chip-label { color: var(--cp-paper); opacity: 0.6; }
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
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(6px, 0.5vw, 7.5px);
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--cp-paper);
          opacity: 0.28;
        }

        .cp-cell-value {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: clamp(1.15rem, 1.9vw, 1.7rem);
          line-height: 1;
          letter-spacing: -0.01em;
          color: var(--cp-paper);
          font-variant-numeric: tabular-nums;
          overflow-wrap: anywhere;
        }

        .cp-cell-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(6.5px, 0.54vw, 8px);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--cp-paper);
          opacity: 0.5;
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
          font-family: 'Impact', 'Arial Black', 'Haettenschweiler', sans-serif;
          font-size: clamp(1.05rem, 1.8vw, 1.5rem);
          font-weight: 900;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          line-height: 1;
        }

        .cp-footer-arrow {
          font-size: clamp(1rem, 1.5vw, 1.25rem);
          font-weight: 900;
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cp-footer:hover .cp-footer-arrow,
        .cp-footer:focus-visible .cp-footer-arrow { transform: translate3d(6px, -5px, 0); }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .cp-grid { grid-template-columns: minmax(0, 1fr); }
          .cp-ghost { font-size: clamp(4.5rem, 14vw, 8rem); }
        }

        @media (max-width: 640px) {
          .cp-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .cp-cell:nth-child(2n) { border-right: none; }
          .cp-cell:nth-child(-n + 2) { border-bottom: 1px solid rgba(243, 238, 232, 0.14); }
          .cp-anno-tr, .cp-anno-br { display: none; }
          .cp-stickers { top: 2.8rem; right: -4px; max-width: 50%; }
          .cp-heading-mark { display: none; }
          .cp-ghost { opacity: 0.32; }
          .cp-chart-tip { max-width: 150px; }
        }

        @media (max-width: 400px) {
          .cp-sticker { letter-spacing: 0.06em; }
          .cp-hero-number { font-size: clamp(3rem, 14vw, 3.6rem); }
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
          .cp-ring { transition: none !important; }
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
