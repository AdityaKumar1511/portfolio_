import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import GitHub from '@/components/GitHub'
import CP from '@/components/CP'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'
import { getCPData } from '@/lib/cp'
import { getGithubData } from '@/lib/github'

export const revalidate = 3600

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default async function Page() {
  const [cpData, githubData] = await Promise.all([
    getCPData(),
    getGithubData(),
  ])

  return (
    <main id="main-content">
      <Hero githubContributions={githubData?.total ?? null} />
      <About />
      <Projects />
      <Experience />
      <GitHub initialData={githubData} />
      <CP initialData={cpData} />
      <Contact />
    </main>
  )
}