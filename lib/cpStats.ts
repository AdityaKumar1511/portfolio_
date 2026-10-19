'use client'

import { useSyncExternalStore } from 'react'
import cpDefaults from '@/data/cpDefaults.json'

export interface CpSolvedCounts {
  leetcode: number
  codeforces: number
}

/**
 * Single source of truth for the solved counters.
 * CP writes live API values here; the hero tiles subscribe to the same store.
 */
export const CP_DEFAULTS = cpDefaults

/** Solved counts are shared by the CP cards and the hero tiles. */
export const DEFAULT_SOLVED_COUNTS: CpSolvedCounts = {
  leetcode: cpDefaults.leetcode.totalSolved,
  codeforces: cpDefaults.codeforces.solvedCount,
}

let solvedCounts: CpSolvedCounts = { ...DEFAULT_SOLVED_COUNTS }
const listeners = new Set<() => void>()

export function getSolvedCounts(): CpSolvedCounts {
  return solvedCounts
}

export function setSolvedCounts(patch: Partial<CpSolvedCounts>): void {
  const next = { ...solvedCounts, ...patch }
  if (next.leetcode === solvedCounts.leetcode && next.codeforces === solvedCounts.codeforces) return
  solvedCounts = next
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function useSolvedCounts(): CpSolvedCounts {
  return useSyncExternalStore(subscribe, getSolvedCounts, () => DEFAULT_SOLVED_COUNTS)
}
