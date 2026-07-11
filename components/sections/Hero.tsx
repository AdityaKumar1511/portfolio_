"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import metaData from "@/data/meta.json";

// ── Animated Mesh Gradient Background ──────────────────────────────
// Creates a premium, living background with multiple layered gradient orbs
// that drift slowly. Replaces Spline while the scene URL is unavailable.
// To re-enable Spline later, set SPLINE_SCENE_URL to a valid public URL.
const SPLINE_SCENE_URL: string | null = null;
// Example: "https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base dark fill */}
      <div className="absolute inset-0 bg-bg-primary" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 opacity-60">
        {/* Large indigo orb — drifts upper-left → center */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full blur-[120px]"
          style={{
            background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            top: "-15%",
            left: "-10%",
            animation: "drift-1 18s ease-in-out infinite alternate",
          }}
        />

        {/* Medium violet orb — drifts lower-right → center */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[100px]"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%)",
            bottom: "-20%",
            right: "-10%",
            animation: "drift-2 22s ease-in-out infinite alternate",
          }}
        />

        {/* Small mint accent — subtle spark */}
        <div
          className="absolute w-[300px] h-[300px] rounded-full blur-[80px]"
          style={{
            background: "radial-gradient(circle, rgba(110, 231, 183, 0.25) 0%, transparent 70%)",
            top: "55%",
            left: "60%",
            animation: "drift-3 15s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Noise grain overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Vignette overlay — grounds the gradient and ensures text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, var(--bg-primary) 80%)",
        }}
      />
    </div>
  );
}

// ── Spline wrapper (for future use) ────────────────────────────────
function SplineBackground({ sceneUrl }: { sceneUrl: string }) {
  // Lazy-load react-spline only when we have a URL
  const SplineComponent = useRef<React.ComponentType<{ scene: string }> | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    import("@splinetool/react-spline").then((mod) => {
      if (!cancelled) {
        SplineComponent.current = mod.default;
        setReady(true);
      }
    }).catch(() => {
      // Spline failed to load — fall back silently
    });
    return () => { cancelled = true; };
  }, []);

  if (!ready || !SplineComponent.current) return null;

  const Comp = SplineComponent.current;
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ filter: "hue-rotate(220deg) saturate(1.4) brightness(0.85)" }}
    >
      <Comp scene={sceneUrl} />
      {/* Vignette on top of Spline */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 20%, var(--bg-primary) 85%)",
          opacity: 0.8,
        }}
      />
    </div>
  );
}

// ── Hero Section ───────────────────────────────────────────────────
export default function Hero() {
  const [chevronOpacity, setChevronOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const opacity = Math.max(0, 1 - window.scrollY / 100);
      setChevronOpacity(opacity);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Character stagger variants
  const nameLetters = metaData.name.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.2 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const anchorLinks = [
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ height: "100svh" }}
    >
      {/* Background Layer */}
      {SPLINE_SCENE_URL ? (
        <SplineBackground sceneUrl={SPLINE_SCENE_URL} />
      ) : (
        <AnimatedBackground />
      )}

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl select-none">
        {/* Small label */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-text-muted text-[10px] sm:text-xs font-mono font-medium tracking-[0.15em] uppercase mb-4"
        >
          {metaData.role} · {metaData.college}
        </motion.p>

        {/* Staggered name */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-[clamp(2.5rem,8vw,5.5rem)] font-semibold tracking-tight text-text-primary mb-4 leading-[1.1] flex flex-wrap justify-center"
        >
          {nameLetters.map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className="inline-block"
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="text-text-secondary text-base sm:text-lg md:text-xl max-w-xl font-normal leading-relaxed"
        >
          {metaData.tagline}
        </motion.p>

        {/* Anchor pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-8"
        >
          {anchorLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="px-5 py-2.5 text-[10px] tracking-[0.12em] uppercase font-mono font-medium rounded-full border border-border-subtle/60 text-text-secondary hover:border-accent hover:text-accent backdrop-blur-sm transition-all duration-200 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        {/* Scroll chevron */}
        <motion.div
          style={{ opacity: chevronOpacity }}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mt-14 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => {
            document
              .getElementById("projects")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-[9px] font-mono text-text-muted uppercase tracking-[0.2em]">
            Explore Work
          </span>
          <ChevronDown className="w-4 h-4 text-text-muted" />
        </motion.div>
      </div>
    </section>
  );
}
