export interface GithubDay {
  date: string // "YYYY-MM-DD"
  contributionCount: number
  weekday: number // 0 = Sun, 1 = Mon, ..., 6 = Sat
}

export interface GithubData {
  total: number
  commits: number
  currentStreak: number
  longestStreak: number
  days: GithubDay[]
  fetchedAt: number
}
