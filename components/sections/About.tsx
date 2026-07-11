"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import metaData from "@/data/meta.json";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Inline brand icon SVGs
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Pinning and animations only run on desktop screens (>= 1024px)
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      if (!isDesktop) return;

      const paragraphs = gsap.utils.toArray<HTMLElement>(".about-paragraph");

      // Setup scroll-pinned timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80px", // aligns with navbar clearance
          end: "+=150%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Animate paragraph elements in sequence
      paragraphs.forEach((p, index) => {
        if (index === 0) {
          tl.fromTo(
            p,
            { opacity: 0.15, y: 20 },
            { opacity: 1, y: 0, duration: 1.5 }
          );
        } else {
          tl.fromTo(
            p,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.5 },
            "+=0.8" // timeline delay gap
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full bg-bg-primary overflow-hidden">
      <section
        id="about"
        className="py-24 md:py-32 px-6 md:px-12 lg:px-24 w-full max-w-7xl mx-auto flex flex-col gap-12"
      >
        {/* Section Heading */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-medium tracking-tight text-text-primary">
              About Me
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
          </div>
          <p className="text-text-secondary text-sm md:text-base max-w-xl">
            My journey, focus, and what drives me.
          </p>
        </div>

        {/* Two-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column - Text Content */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-text-secondary text-sm sm:text-base leading-relaxed">
            <p className="about-paragraph transition-all duration-300 font-normal">
              My interest in computer science sparked when I realized programming is the closest thing to magic—the ability to conceive an idea out of thin air and build a fully functional product with just code. As a Computer Science undergrad at NIT Patna, I have turned this fascination into a daily practice of engineering applications that solve real-world problems.
            </p>
            <p className="about-paragraph transition-all duration-300 lg:opacity-0 font-normal">
              Currently, my focus is divided between full-stack application development and machine learning systems. I love creating fast interfaces and tying them into data models. This balance reflects in my recent creations like <span className="text-text-primary font-medium">Arbitrage</span> (a real-time crypto price tracking dashboard with sub-second alert scanning) and <span className="text-text-primary font-medium">NexusForge</span> (a decentralized escrow smart contract governance portal).
            </p>
            <p className="about-paragraph transition-all duration-300 lg:opacity-0 font-normal">
              As I step into my next academic year, I am looking for software engineering internships and open-source project collaborations where I can contribute to production-grade repositories. I enjoy working in fast-paced teams and tackling tricky architectural hurdles.
            </p>
            <p className="about-paragraph transition-all duration-300 lg:opacity-0 font-normal">
              Outside of building web apps, you will find me participating in competitive programming challenges on Codeforces and LeetCode, sharpening my data structures and algorithmic efficiency. I am also deeply interested in design craft, cinematic UI colors, and smooth animations that make user interfaces feel alive.
            </p>

            {/* Social Links Row */}
            <div className="flex items-center gap-4 mt-4 py-2">
              <a
                href={metaData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border-subtle bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong transition-all duration-200 cursor-pointer"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4.5 h-4.5" />
              </a>
              <a
                href={metaData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border-subtle bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong transition-all duration-200 cursor-pointer"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4.5 h-4.5" />
              </a>
              <a
                href={`mailto:${metaData.email}`}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border-subtle bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong transition-all duration-200 cursor-pointer"
                aria-label="Send Email"
              >
                <Mail className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <div className="lg:col-span-5 flex justify-center lg:sticky lg:top-32">
            <div className="relative w-full max-w-[360px] aspect-square rounded-2xl overflow-hidden border border-border-subtle bg-surface shadow-xl">
              <Image
                src="/profile.jpg"
                alt="Aditya Kumar Profile Portrait"
                fill
                sizes="(max-width: 1024px) 360px, 400px"
                className="object-cover transition-transform duration-500 hover:scale-103"
                priority={false}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
