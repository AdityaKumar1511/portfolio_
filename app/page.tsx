import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import About from "@/components/sections/About";
import Achievements from "@/components/sections/Achievements";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      
      {/* Scrollable sections */}
      <main className="flex-1 w-full flex flex-col">
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Achievements />
        <Blog />
        <Contact />
      </main>


      <Footer />
    </>
  );
}

