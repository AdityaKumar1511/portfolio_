"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function About() {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-6">
            About Me
          </p>
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-medium tracking-tight mb-6">
            Where Code Meets Craft
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] text-[15px] leading-relaxed">
            <p>
              I&apos;m a second-year CSE student at NIT Patna with a deep focus
              on building production-grade full-stack applications. From
              real-time crypto trackers to decentralized escrow systems, I
              engineer systems that are fast, type-safe, and built to scale.
            </p>
            <p>
              My stack spans TypeScript, React, Next.js, Node, Go, and Solidity
              on the backend, with PostgreSQL, Redis, and GraphQL powering the
              data layer. I believe in clean architecture, strong types, and
              shipping code that works under pressure.
            </p>
          </div>
          <a
            href="https://github.com/AdityaKumar1511"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 text-sm text-[var(--text-secondary)] hover:text-[var(--text)] underline underline-offset-4 decoration-[var(--border)] transition-colors"
          >
            View GitHub →
          </a>
        </motion.div>

        {/* Right column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4"
        >
          {/* Profile image or placeholder */}
          <div className="w-[280px] h-[280px] relative overflow-hidden rounded-2xl border border-[var(--border)]">
            {imgError ? (
              <div className="w-full h-full flex items-center justify-center bg-[var(--surface)]">
                <span className="font-mono text-5xl text-[var(--text-muted)]">
                  AK
                </span>
              </div>
            ) : (
              <Image
                src="/profile.jpg"
                alt="Aditya Kumar"
                fill
                className="object-cover"
                onError={() => setImgError(true)}
              />
            )}
          </div>

          {/* Quality badges */}
          <div className="flex gap-2 flex-wrap">
            {["Clean Code", "Fast Systems", "Type Safe"].map((badge) => (
              <span
                key={badge}
                className="border border-[var(--border)] rounded-lg px-3 py-2 text-[12px] font-mono text-[var(--text-secondary)]"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Stars row */}
          <div className="flex items-center gap-2">
            <span className="text-[var(--text-secondary)] text-sm">
              ★★★★★
            </span>
            <span className="text-[11px] text-[var(--text-muted)]">
              Trusted by teams
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
