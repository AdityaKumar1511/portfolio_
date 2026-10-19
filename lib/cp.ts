import 'server-only'
import { unstable_cache } from 'next/cache'
import meta from '@/data/meta.json'
import {
  CfHistoryEntry,
  CodeforcesData,
  LeetCodeData,
  CPData,
  computeCfTier,
} from './cpTypes'

export type { CfHistoryEntry, CodeforcesData, LeetCodeData, CPData }
export { computeCfTier }

const CF_HANDLE = meta.codeforcesUsername
const LC_USERNAME = meta.leetcodeUsername

async function fetchCodeforcesRaw(): Promise<CodeforcesData> {
  const [ratingRes, statusRes] = await Promise.all([
    fetch(`https://codeforces.com/api/user.rating?handle=${CF_HANDLE}`, {
      signal: AbortSignal.timeout(8000),
    }),
    fetch(`https://codeforces.com/api/user.status?handle=${CF_HANDLE}`, {
      signal: AbortSignal.timeout(8000),
    }),
  ])

  if (!ratingRes.ok) {
    throw new Error(`Codeforces rating API failed with status ${ratingRes.status}`)
  }
  if (!statusRes.ok) {
    throw new Error(`Codeforces status API failed with status ${statusRes.status}`)
  }

  const ratingJson = await ratingRes.json()
  const statusJson = await statusRes.json()

  if (ratingJson.status !== 'OK' || !Array.isArray(ratingJson.result)) {
    throw new Error('Codeforces rating API returned non-OK status')
  }
  if (statusJson.status !== 'OK' || !Array.isArray(statusJson.result)) {
    throw new Error('Codeforces status API returned non-OK status')
  }

  const history: CfHistoryEntry[] = ratingJson.result
  if (history.length === 0) {
    throw new Error('Codeforces contest history is empty')
  }

  const rating = history[history.length - 1].newRating
  const maxRating = Math.max(...history.map((h) => h.newRating))
  const contests = history.length

  const solvedSet = new Set<string>()
  statusJson.result.forEach((sub: { verdict?: string; problem?: { contestId?: number; index?: string } }) => {
    if (sub.verdict === 'OK' && sub.problem?.contestId && sub.problem?.index) {
      solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`)
    }
  })
  const solved = solvedSet.size

  // Validation: numbers must be finite and >= 0, CF rating can never exceed maxRating
  if (!Number.isFinite(rating) || rating < 0) throw new Error('Invalid CF rating')
  if (!Number.isFinite(maxRating) || maxRating < 0) throw new Error('Invalid CF maxRating')
  if (rating > maxRating) throw new Error('CF rating cannot exceed maxRating')
  if (!Number.isFinite(contests) || contests < 0) throw new Error('Invalid CF contests')
  if (!Number.isFinite(solved) || solved < 0) throw new Error('Invalid CF solved count')

  const tier = computeCfTier(rating)

  return {
    rating,
    maxRating,
    contests,
    solved,
    tier,
    history,
  }
}

async function fetchLeetCodeRaw(): Promise<LeetCodeData> {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        profile {
          ranking
        }
      }
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        topPercentage
        badge {
          name
        }
      }
    }
  `

  const res = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Referer: 'https://leetcode.com',
    },
    body: JSON.stringify({ query, variables: { username: LC_USERNAME } }),
    signal: AbortSignal.timeout(8000),
  })

  if (!res.ok) {
    throw new Error(`LeetCode GraphQL failed with status ${res.status}`)
  }

  const json = await res.json()
  const data = json.data

  if (!data?.matchedUser?.submitStatsGlobal?.acSubmissionNum) {
    throw new Error('LeetCode response missing matchedUser submission data')
  }

  const acStats = data.matchedUser.submitStatsGlobal.acSubmissionNum as Array<{
    difficulty: string
    count: number
  }>

  const findCount = (diff: string) => acStats.find((s) => s.difficulty === diff)?.count ?? 0

  const easy = findCount('Easy')
  const medium = findCount('Medium')
  const hard = findCount('Hard')
  const solved = easy + medium + hard

  // Validate numbers: must be finite and >= 0
  if (!Number.isFinite(easy) || easy < 0) throw new Error('Invalid LC easy count')
  if (!Number.isFinite(medium) || medium < 0) throw new Error('Invalid LC medium count')
  if (!Number.isFinite(hard) || hard < 0) throw new Error('Invalid LC hard count')
  if (!Number.isFinite(solved) || solved < 0) throw new Error('Invalid LC solved count')

  const ranking = data.matchedUser.profile?.ranking
    ? Number(data.matchedUser.profile.ranking).toLocaleString()
    : null

  const ucr = data.userContestRanking
  const rating =
    ucr && typeof ucr.rating === 'number' && Number.isFinite(ucr.rating)
      ? Math.round(ucr.rating)
      : null

  const contests =
    ucr && typeof ucr.attendedContestsCount === 'number' && Number.isFinite(ucr.attendedContestsCount)
      ? ucr.attendedContestsCount
      : null

  const globalRank =
    ucr && typeof ucr.globalRanking === 'number' && Number.isFinite(ucr.globalRanking)
      ? ucr.globalRanking
      : null

  const topPercent =
    ucr && typeof ucr.topPercentage === 'number' && Number.isFinite(ucr.topPercentage)
      ? Number(ucr.topPercentage.toFixed(1))
      : null

  const badge = ucr?.badge?.name ? String(ucr.badge.name) : null

  return {
    solved,
    easy,
    medium,
    hard,
    ranking,
    rating,
    contests,
    globalRank,
    topPercent,
    badge,
  }
}

// Wrap each fetcher in unstable_cache with revalidate: 3600
const getCachedCodeforces = unstable_cache(
  async () => fetchCodeforcesRaw(),
  ['cp-codeforces-data-v1'],
  { revalidate: 3600 }
)

const getCachedLeetCode = unstable_cache(
  async () => fetchLeetCodeRaw(),
  ['cp-leetcode-data-v1'],
  { revalidate: 3600 }
)

export async function getCPData(): Promise<CPData> {
  const [cfSettled, lcSettled] = await Promise.allSettled([
    getCachedCodeforces(),
    getCachedLeetCode(),
  ])

  return {
    cf: cfSettled.status === 'fulfilled' ? cfSettled.value : null,
    lc: lcSettled.status === 'fulfilled' ? lcSettled.value : null,
    fetchedAt: Date.now(),
  }
}
