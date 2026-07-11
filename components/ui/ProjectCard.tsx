"use client";

import Image from "next/image";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative flex-shrink-0 w-[80vw] md:w-[58vw] lg:w-[46vw] h-[60vh] min-h-[400px] max-h-[520px] rounded-[20px] overflow-hidden scroll-snap-align-center border border-border-subtle bg-surface transition-all duration-300 hover:border-border-strong hover:shadow-[0_0_0_1px_var(--accent-glow),0_20px_40px_rgba(0,0,0,0.3)]">
      {/* Thumbnail Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={project.thumbnail}
          alt={`${project.name} Thumbnail`}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 58vw, 46vw"
          className="object-cover transition-transform duration-500 group-hover:scale-104"
          priority={false}
        />
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-x-0 bottom-0 h-[70%] p-6 flex flex-col justify-end gap-3 z-10"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)",
        }}
      >
        {/* Tech Pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((techItem, index) => (
            <span
              key={index}
              className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-white/70"
            >
              {techItem}
            </span>
          ))}
        </div>

        {/* Project Name */}
        <h3 className="text-white text-lg sm:text-xl font-medium tracking-tight">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-white/75 text-xs sm:text-sm leading-relaxed max-w-xl">
          {project.description}
        </p>

        {/* Impact Stat */}
        <div className="text-accent font-mono text-[11px] font-semibold uppercase tracking-wider">
          {project.impact}
        </div>

        {/* Links Row */}
        <div className="flex items-center gap-2 mt-1">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-[10px] sm:text-xs font-mono font-medium border border-white/20 px-3 py-1.5 rounded-full text-white/80 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all duration-200 cursor-pointer"
          >
            Live Demo ↗
          </a>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-[10px] sm:text-xs font-mono font-medium border border-white/20 px-3 py-1.5 rounded-full text-white/80 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all duration-200 cursor-pointer"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </div>
  );
}
