"use client";

import { motion } from "framer-motion";

const socialLinks = [
  { name: "GitHub", url: "https://github.com/AdityaKumar1511" },
  { name: "LeetCode", url: "https://leetcode.com/AdityaKumar1511" },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/aditya-kumar-57a988374/",
  },
  { name: "Twitter", url: "https://twitter.com" },
];

export default function Contact() {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 border-t border-[var(--border)]">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-6">
          Let&apos;s build something
        </p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2.5rem,7vw,5rem)] font-semibold tracking-tight leading-[0.95]"
        >
          Have a hard problem?
        </motion.h2>

        <motion.a
          href="mailto:aditya.kumar00706@gmail.com"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-[1.1rem] text-[var(--text-secondary)] underline underline-offset-4 decoration-[var(--border)] hover:text-[var(--text)] hover:decoration-[var(--text)] transition-all duration-200 mt-8 block"
        >
          aditya.kumar00706@gmail.com ↗
        </motion.a>

        <div className="mt-12 flex justify-center gap-8">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[var(--text-muted)] hover:text-[var(--text)] underline underline-offset-2 decoration-transparent hover:decoration-current transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
