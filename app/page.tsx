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

export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <Ticker />
      <Projects />
      <Experience />
      <GitHub />
      <CP />
      <HowIWork />
      <ConnectTicker />
      <Contact />
    </main>
  )
}