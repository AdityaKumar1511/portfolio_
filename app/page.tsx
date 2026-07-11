import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Ticker from '@/components/sections/Ticker'
import Projects from '@/components/sections/Projects'
import GitHub from '@/components/sections/GitHub'
import LeetCode from '@/components/sections/LeetCode'
import Experience from '@/components/sections/Experience'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Ticker />
        <Projects />
        <GitHub />
        <LeetCode />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}