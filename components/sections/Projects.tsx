'use client';
import projects from '@/data/projects.json';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-24 border-t border-[var(--border)]">
      {/* Section label */}
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-12">
        Selected projects
      </p>

      {/* Numbered list */}
      <div>
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-[var(--border)] py-6 
                       grid grid-cols-[60px_1fr_auto] md:grid-cols-[80px_1fr_auto] 
                       gap-4 md:gap-8 items-start
                       hover:bg-[var(--surface)] transition-colors duration-200
                       px-2 -mx-2 rounded-lg group cursor-pointer"
          >
            {/* Left: number + year */}
            <div className="pt-1">
              <p className="font-mono text-[11px] text-[var(--text-muted)]">
                0{i + 1}
              </p>
              <p className="font-mono text-[10px] text-[var(--text-muted)] mt-1">
                {project.year || '2025'}
              </p>
              {project.featured && (
                <p className="font-mono text-[9px] text-[var(--text-muted)] mt-1 uppercase tracking-wider">
                  Featured
                </p>
              )}
            </div>

            {/* Center: name + desc + pills */}
            <div>
              <h3 className="text-[15px] font-medium text-[var(--text)] leading-snug">
                {project.name}
              </h3>
              <p className="text-[13px] text-[var(--text-secondary)] mt-1 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {project.tech.map(t => (
                  <span key={t} 
                    className="font-mono text-[10px] text-[var(--text-muted)] 
                               border border-[var(--border)] px-2 py-0.5 rounded-sm">
                    {t}
                  </span>
                ))}
              </div>
              {project.impact && (
                <p className="font-mono text-[11px] text-[var(--text-muted)] mt-2">
                  → {project.impact}
                </p>
              )}
            </div>

            {/* Right: links */}
            <div className="flex flex-col gap-2 items-end pt-1">
              {project.liveUrl && (
                <Link href={project.liveUrl} target="_blank"
                  className="text-[12px] text-[var(--text-secondary)] hover:text-[var(--text)] 
                             font-mono transition-colors"
                  onClick={e => e.stopPropagation()}>
                  Live ↗
                </Link>
              )}
              {project.repoUrl && (
                <Link href={project.repoUrl} target="_blank"
                  className="text-[12px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] 
                             font-mono transition-colors"
                  onClick={e => e.stopPropagation()}>
                  GitHub ↗
                </Link>
              )}
            </div>
          </motion.div>
        ))}
        {/* Closing border */}
        <div className="border-t border-[var(--border)]" />
      </div>
    </section>
  );
}
