import Hero from '@/components/Hero'
import About from '@/components/About'
import Ticker from '@/components/Ticker'
import HowIWork from '@/components/HowIWork'
import Projects from '@/components/Projects'
import GitHub from '@/components/GitHub'
import CP from '@/components/CP'
import Experience from '@/components/Experience'
import ConnectTicker from '@/components/ConnectTicker'
import Contact from '@/components/Contact'
import { getCPData } from '@/lib/cp'
import { getGithubData } from '@/lib/github'

export const revalidate = 3600

export default async function Page() {
  const [cpData, githubData] = await Promise.all([
    getCPData(),
    getGithubData(),
  ])

  return (
    <main>
      <Hero />
      <About />
      <Ticker />
      <Projects />
      <Experience />
      <GitHub initialData={githubData} />
      <CP initialData={cpData} />
      <HowIWork />
      <ConnectTicker />
      <Contact />
    </main>
  )
}