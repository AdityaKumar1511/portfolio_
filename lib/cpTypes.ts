export interface CfHistoryEntry {
  contestId: number
  contestName: string
  handle: string
  rank: number
  ratingUpdateTimeSeconds: number
  oldRating: number
  newRating: number
}

export interface CodeforcesData {
  rating: number
  maxRating: number
  contests: number
  solved: number
  tier: {
    label: string
    color: string
  }
  history: CfHistoryEntry[]
}

export interface LeetCodeData {
  solved: number
  easy: number
  medium: number
  hard: number
  ranking: string | null
  rating: number | null
  contests: number | null
  globalRank: number | null
  topPercent: number | null
  badge: string | null
}

export interface CPData {
  cf: CodeforcesData | null
  lc: LeetCodeData | null
  fetchedAt: number
}

export function computeCfTier(rating: number): { label: string; color: string } {
  if (rating >= 2400) return { label: 'GRANDMASTER', color: '#f9b6c3' }
  if (rating >= 2100) return { label: 'MASTER', color: '#ffd2a1' }
  if (rating >= 1900) return { label: 'CANDIDATE MASTER', color: '#e8b4e8' }
  if (rating >= 1600) return { label: 'EXPERT', color: '#adcaff' }
  if (rating >= 1400) return { label: 'SPECIALIST', color: '#aed8e6' }
  if (rating >= 1200) return { label: 'PUPIL', color: '#c2ebd4' }
  return { label: 'NEWBIE', color: '#d4cec7' }
}
