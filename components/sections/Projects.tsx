"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "@/components/ui/ProjectCard";
import projectsData from "@/data/projects.json";
import { Project } from "@/types";

export default function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const projects = projectsData as Project[];

  const handleScroll = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const firstCard = track.firstElementChild as HTMLElement;
    if (!firstCard) return;

    const cardWidth = firstCard.clientWidth;
    const gap = 16; // 1rem gap
    const scrollAmount = cardWidth + gap;

    if (direction === "left") {
      track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      track.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleTrackScroll = () => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const firstCard = track.firstElementChild as HTMLElement;
    if (!firstCard) return;

    const cardWidth = firstCard.clientWidth;
    const gap = 16;
    const scrollAmount = cardWidth + gap;

    // Calculate the index based on current scroll position
    const index = Math.round(track.scrollLeft / scrollAmount);
    // Boundary check
    setCurrentIndex(Math.max(0, Math.min(index, projects.length - 1)));
  };

  // Keyboard navigation when focusing on the carousel
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handleScroll("left");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleScroll("right");
    }
  };

  return (
    <section
      id="projects"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 w-full max-w-7xl mx-auto flex flex-col gap-12 outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Projects showcase"
    >
      {/* Heading Block */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-medium tracking-tight text-text-primary">
            Selected Work
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
        </div>
        <p className="text-text-secondary text-sm md:text-base max-w-xl">
          A few things I've built recently. Sourced directly from JSON data files.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Edge Gradient Mask */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        />

        {/* Carousel Track */}
        <div
          ref={trackRef}
          onScroll={handleTrackScroll}
          className="flex overflow-x-scroll scroll-snap-type-x-mandatory gap-4 px-[10%] [&::-webkit-scrollbar]:hidden scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {/* Arrow Controls */}
        {/* Left Arrow */}
        <button
          onClick={() => handleScroll("left")}
          disabled={currentIndex === 0}
          className={`absolute left-3 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-11 h-11 rounded-full border border-border-subtle bg-surface text-text-primary shadow-md transition-all duration-200 cursor-pointer ${
            currentIndex === 0
              ? "opacity-30 pointer-events-none"
              : "hover:border-accent hover:text-accent active:scale-95"
          }`}
          aria-label="Previous project"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => handleScroll("right")}
          disabled={currentIndex === projects.length - 1}
          className={`absolute right-3 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-11 h-11 rounded-full border border-border-subtle bg-surface text-text-primary shadow-md transition-all duration-200 cursor-pointer ${
            currentIndex === projects.length - 1
              ? "opacity-30 pointer-events-none"
              : "hover:border-accent hover:text-accent active:scale-95"
          }`}
          aria-label="Next project"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex items-center justify-center gap-2">
        {projects.map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={index}
              onClick={() => {
                if (!trackRef.current) return;
                const track = trackRef.current;
                const firstCard = track.firstElementChild as HTMLElement;
                if (!firstCard) return;

                const cardWidth = firstCard.clientWidth;
                const gap = 16;
                track.scrollTo({
                  left: index * (cardWidth + gap),
                  behavior: "smooth",
                });
              }}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                isActive
                  ? "bg-accent w-5"
                  : "bg-text-muted/40 hover:bg-text-secondary"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          );
        })}
      </div>
    </section>
  );
}
