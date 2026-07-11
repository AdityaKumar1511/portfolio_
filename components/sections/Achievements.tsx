"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import achievementsData from "@/data/achievements.json";
import { Award, Code2, Globe, Calendar, ArrowUpRight } from "lucide-react";

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
    { id: "hackathons" as TabType, label: "Hackathons", icon: Award },
    { id: "competitive" as TabType, label: "Competitive Programming", icon: Code2 },
    { id: "openSource" as TabType, label: "Open Source", icon: Globe },
  ];

  const currentItems = achievementsData[activeTab] as Achievement[];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="achievements"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 w-full max-w-7xl mx-auto flex flex-col gap-12"
    >
      {/* Heading Block */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-medium tracking-tight text-text-primary">
            Achievements
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
        </div>
        <p className="text-text-secondary text-sm md:text-base max-w-xl">
          Hackathons, coding challenges, and community contributions.
        </p>
      </div>

      {/* Tabs Switcher Control */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1.5 rounded-2xl bg-surface-2 border border-border-subtle w-fit self-center sm:self-start">
        {tabItems.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-2 px-4 py-2 text-xs font-mono font-medium rounded-xl transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-accent text-white shadow-sm"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid wrapper triggered on tab key changes */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {currentItems.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group flex flex-col justify-between bg-surface border border-border-subtle hover:border-border-strong rounded-2xl p-6 transition-all duration-300 hover:shadow-lg gap-4"
            >
              <div className="flex flex-col gap-3">
                {/* Header Row: Badge & Date */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] font-mono tracking-wider font-semibold uppercase px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent">
                    {item.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-text-muted text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-text-primary text-base sm:text-lg font-medium tracking-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Footer Anchor Link */}
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-text-secondary hover:text-accent font-medium mt-2 w-fit transition-colors group-hover:translate-x-0.5 cursor-pointer"
              >
                <span>Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
