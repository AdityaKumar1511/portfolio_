"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    role: "Open Source Contributor",
    context: "GSSoC",
    period: "2024 — Present",
  },
  {
    role: "Hackathon Lead (CodeBlooded)",
    context: "ISRO BAH 2026",
    period: "2026",
  },
  {
    role: "Competitive Programmer",
    context: "Codeforces + LeetCode",
    period: "2023 — Present",
  },
  {
    role: "Project Lead",
    context: "NIT Patna",
    period: "2025 — Present",
  },
];

export default function Experience() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-4">
            Experience
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[1.75rem] font-medium tracking-tight"
          >
            Where I&apos;ve built.
          </motion.h2>
        </div>

        {/* Right */}
        <div>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: i * 0.08,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border-t border-[var(--border)] py-6 flex items-start justify-between gap-4"
            >
              <div className="flex gap-4">
                <span className="font-mono text-[11px] text-[var(--text-muted)] mt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-medium text-[var(--text)]">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {exp.context}
                  </p>
                </div>
              </div>
              <span className="font-mono text-[11px] text-[var(--text-muted)] whitespace-nowrap">
                {exp.period}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
