"use client";

import { motion } from "framer-motion";
import TechPill from "@/components/ui/TechPill";
import skillsData from "@/data/skills.json";

export default function Skills() {
  const categories = Object.entries(skillsData);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="skills"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 w-full max-w-7xl mx-auto flex flex-col gap-12"
    >
      {/* Heading Block */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-medium tracking-tight text-text-primary">
            Tech Stack
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
        </div>
        <p className="text-text-secondary text-sm md:text-base max-w-xl">
          Tools I reach for
        </p>
      </div>

      {/* Grid Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {categories.map(([category, items]) => (
          <motion.div
            key={category}
            variants={cardVariants}
            className="bg-surface border border-border-subtle hover:border-border-strong rounded-2xl p-6 transition-all duration-300 hover:shadow-lg flex flex-col gap-4"
          >
            {/* Category Name */}
            <h3 className="text-[10px] sm:text-xs font-mono font-semibold tracking-wider text-text-muted uppercase">
              {category}
            </h3>

            {/* Pills Grid */}
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <TechPill key={item} name={item} />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
