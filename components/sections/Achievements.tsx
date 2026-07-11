"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import achievementsData from "@/data/achievements.json";

interface Achievement {
  title: string;
  description: string;
  date: string;
  link: string;
  badge: string;
}

type TabType = "hackathons" | "competitive" | "openSource";

export default function Achievements() {
  const [activeTab, setActiveTab] = useState<TabType>("hackathons");

  const tabItems = [
    { id: "hackathons" as TabType, label: "Hackathons" },
    { id: "competitive" as TabType, label: "Competitive Programming" },
    { id: "openSource" as TabType, label: "Open Source" },
  ];

  const currentItems = achievementsData[activeTab] as Achievement[];

  return (
    <section id="achievements" className="py-24 px-6 md:px-12 lg:px-24 border-t border-[var(--border)]">
      {/* Section label */}
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-4">
        Achievements
      </p>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-[clamp(1.75rem,4vw,2.5rem)] font-medium tracking-tight mb-12"
      >
        Milestones &amp; recognition.
      </motion.h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-x-1 gap-y-2 mb-8">
        {tabItems.map((tab, idx) => (
          <span key={tab.id} className="flex items-center">
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`font-mono text-[12px] pb-0.5 transition-colors duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "text-[var(--text)] border-b border-[var(--text)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }`}
            >
              {tab.label}
            </button>
            {idx < tabItems.length - 1 && (
              <span className="text-[var(--text-muted)] mx-2 font-mono text-[12px]">
                ·
              </span>
            )}
          </span>
        ))}
      </div>

      {/* Items list */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {currentItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.04,
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border-t border-[var(--border)] py-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex gap-4 items-start">
                <span className="font-mono text-[11px] text-[var(--text-muted)] pt-0.5">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[15px] font-medium text-[var(--text)]">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-[var(--text-secondary)] mt-1 leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-row md:flex-col md:items-end justify-between md:justify-center items-center gap-2 font-mono text-[11px] pl-8 md:pl-0">
                <div className="flex gap-2">
                  <span className="text-[var(--text-muted)] uppercase tracking-wider text-[9px] border border-[var(--border)] px-1.5 py-0.5 rounded-sm">
                    {item.badge}
                  </span>
                  <span className="text-[var(--text-muted)] mt-0.5">
                    {item.date}
                  </span>
                </div>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors mt-0.5"
                  >
                    Details ↗
                  </a>
                )}
              </div>
            </motion.div>
          ))}
          <div className="border-t border-[var(--border)]" />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
