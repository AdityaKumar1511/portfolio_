"use client";

import { motion } from "framer-motion";
import projectsData from "@/data/projects.json";

interface ProjectItem {
  slug: string;
  name: string;
  description: string;
  tech: string[];
  impact: string;
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
  category: string;
  year?: string;
}

export default function Projects() {
  const projects = projectsData as ProjectItem[];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-[var(--border)]">
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-12">
        Selected projects
      </p>

      <div>
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              delay: index * 0.08,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="grid grid-cols-[auto_1fr_auto] gap-4 md:gap-8 items-center py-6 border-t border-[var(--border)] hover:bg-[var(--surface)] transition-colors duration-200 px-2 -mx-2 rounded-sm"
            >
              {/* Left: number + year */}
              <div className="flex flex-col items-start min-w-[80px]">
                <span className="font-mono text-[11px] text-[var(--text-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[11px] text-[var(--text-muted)] mt-0.5">
                  {project.featured ? "Featured · " : ""}
                  {project.year || "2025"}
                </span>
              </div>

              {/* Center: name + desc + tech */}
              <div className="min-w-0">
                <h3 className="text-lg font-medium text-[var(--text)]">
                  {project.name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mt-0.5 truncate">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] text-[var(--text-muted)] border border-[var(--border-muted)] px-2 py-0.5 rounded-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: view link + impact */}
              <div className="flex flex-col items-end text-right">
                <span className="text-sm text-[var(--text-secondary)]">
                  View ↗
                </span>
                <span className="font-mono text-[10px] text-[var(--text-muted)] mt-0.5 hidden md:block max-w-[150px]">
                  {project.impact}
                </span>
              </div>
            </a>
          </motion.div>
        ))}

        {/* Clean termination */}
        <div className="border-b border-[var(--border)]" />
      </div>
    </section>
  );
}
