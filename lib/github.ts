import 'server-only'
import { unstable_cache } from 'next/cache'
import meta from '@/data/meta.json'
import { GithubDay, GithubData } from './githubTypes'

export type { GithubDay, GithubData }

const GITHUB_LOGIN = meta.githubUsername || 'AdityaKumar1511'

interface RawContributionDay {
  date: string
  contributionCount: number
  weekday: number
}

interface RawWeek {
  contributionDays: RawContributionDay[]
}

interface GraphQLResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        totalCommitContributions: number
        contributionCalendar: {
          totalContributions: number
          weeks: RawWeek[]
        }
      }
    }
  }
  errors?: Array<{ message: string }>
}

function calculateStreaks(days: GithubDay[]): { longestStreak: number; currentStreak: number } {
  if (days.length === 0) return { longestStreak: 0, currentStreak: 0 }

  // 1. Longest streak: longest run of consecutive days with count > 0
  let longestStreak = 0
  let running = 0
  for (const day of days) {
    if (day.contributionCount > 0) {
      running++
      if (running > longestStreak) {
        longestStreak = running
      }
    } else {
      running = 0
    }
  }

  // 2. Current streak: run of consecutive days with count > 0 ending today,
  // or ending yesterday if today's count is 0 and the day isn't over yet.
  let endIndex = days.length - 1
  if (days[endIndex].contributionCount === 0) {
    endIndex--
  }

  let currentStreak = 0
  while (endIndex >= 0 && days[endIndex].contributionCount > 0) {
    currentStreak++
    endIndex--
  }

  return { longestStreak, currentStreak }
}

async function fetchGithubRaw(): Promise<GithubData> {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    throw new Error('GITHUB_TOKEN environment variable is not defined')
  }

  const now = new Date()
  const to = now.toISOString()
  const from = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString()

  const query = `
    query getContributions($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                weekday
              }
            }
          }
        }
      }
    }
  `

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token.trim()}`,
      'User-Agent': 'portfolio-app',
    },
    body: JSON.stringify({
      query,
      variables: {
        login: GITHUB_LOGIN,
        from,
        to,
      },
    }),
    signal: AbortSignal.timeout(8000),
  })

  if (!res.ok) {
    throw new Error(`GitHub GraphQL API HTTP error: ${res.status} ${res.statusText}`)
  }

  const json: GraphQLResponse = await res.json()

  if (json.errors && json.errors.length > 0) {
    throw new Error(`GitHub GraphQL error: ${json.errors[0].message}`)
  }

  const collection = json.data?.user?.contributionsCollection
  const calendar = collection?.contributionCalendar

  if (!collection || !calendar || !Array.isArray(calendar.weeks)) {
    throw new Error('Malformed GitHub GraphQL response')
  }

  // Flatten weeks into one sorted days[] array (SINGLE SOURCE OF TRUTH)
  const days: GithubDay[] = []
  for (const week of calendar.weeks) {
    if (Array.isArray(week.contributionDays)) {
      for (const day of week.contributionDays) {
        days.push({
          date: day.date,
          contributionCount: day.contributionCount,
          weekday: day.weekday,
        })
      }
    }
  }

  days.sort((a, b) => a.date.localeCompare(b.date))

  // Validate days
  if (days.length === 0) {
    throw new Error('GitHub days array is empty')
  }

  for (const day of days) {
    if (!Number.isFinite(day.contributionCount) || day.contributionCount < 0) {
      throw new Error(`Invalid contributionCount: ${day.contributionCount}`)
    }
  }

  // Validate freshness: last day must be within 2 days of now
  const lastDay = days[days.length - 1]
  const lastDayTime = new Date(`${lastDay.date}T23:59:59Z`).getTime()
  const diffDays = (Date.now() - lastDayTime) / (1000 * 60 * 60 * 24)
  if (diffDays > 2) {
    throw new Error(`GitHub data is stale: last date in data is ${lastDay.date}`)
  }

  // Derive stats from days[] only
  const total = days.reduce((sum, d) => sum + d.contributionCount, 0)
  const { longestStreak, currentStreak } = calculateStreaks(days)
  const commits = collection.totalCommitContributions ?? 0

  return {
    total,
    commits,
    currentStreak,
    longestStreak,
    days,
    fetchedAt: Date.now(),
  }
}

const getCachedGithubData = unstable_cache(
  async () => fetchGithubRaw(),
  ['github-contributions-data-v1'],
  { revalidate: 3600 }
)

export async function getGithubData(): Promise<GithubData | null> {
  try {
    return await getCachedGithubData()
  } catch (err) {
    console.error('getGithubData failed:', err)
    return null
  }
}
