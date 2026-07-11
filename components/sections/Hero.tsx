"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Hero() {
  return (
    <section className="h-[100svh] flex flex-col justify-between px-6 md:px-12 lg:px-24 pt-32 pb-20">
      {/* Top row */}
      <div className="flex justify-between items-start">
        <div>
          <p className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-[0.15em]">
            Developer — 01
          </p>
          <p className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-[0.15em] mt-2">
            Full-Stack Engineer
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[11px] text-[var(--text-muted)]">
            Open to work — 2026
          </p>
          <p className="font-mono text-[11px] text-[var(--text-muted)] mt-2">
            Scroll ↓
          </p>
        </div>
      </div>

      {/* Hero Heading */}
      <div className="mt-16 md:mt-24">
        <h1 className="text-[clamp(3.5rem,9vw,8rem)] font-semibold tracking-[-0.04em] leading-[0.92] text-[var(--text)]">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease }}
            >
              Engineering
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.12, duration: 0.8, ease }}
            >
              systems that
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.24, duration: 0.8, ease }}
            >
              scale.
            </motion.span>
          </span>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 text-base text-[var(--text-secondary)] max-w-sm"
        >
          Fast, resilient systems — from the data layer to the last pixel.
        </motion.p>
      </div>

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-12 flex items-center gap-6"
      >
        <a
          href="https://github.com/AdityaKumar1511"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[var(--text-secondary)] hover:text-[var(--text)] underline underline-offset-4 decoration-[var(--border)] transition-colors"
        >
          View GitHub →
        </a>
        <span className="w-px h-4 bg-[var(--border)]" />
        <span className="font-mono text-[11px] text-[var(--text-muted)]">
          ↓ scroll
        </span>
      </motion.div>
    </section>
  );
}
