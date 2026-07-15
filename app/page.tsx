import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Ticker from '@/components/Ticker'
import HowIWork from '@/components/HowIWork'
import Projects from '@/components/Projects'
import GitHub from '@/components/GitHub'
import LeetCode from '@/components/LeetCode'
import Experience from '@/components/Experience'
import ConnectTicker from '@/components/ConnectTicker'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <>
      {/* <Navbar /> */}
      <main>
        <Hero />
        <About />
        <Ticker />
        <Experience />
        <Projects />
        <GitHub />
        <LeetCode />
        <HowIWork />
        <ConnectTicker />
        <Contact />
      </main>
      <Footer />
    </>
  )
}