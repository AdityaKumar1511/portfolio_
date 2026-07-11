"use client";

import { useActiveSection } from "@/hooks/useActiveSection";

export default function SideDotNav() {
  const sections = [
    { id: "hero", label: "Intro" },
    { id: "projects", label: "Work" },
    { id: "skills", label: "Skills" },
    { id: "about", label: "About" },
    { id: "achievements", label: "Achievements" },
    { id: "contact", label: "Contact" },
  ];

  const sectionIds = sections.map((s) => s.id);
  const activeSection = useActiveSection(sectionIds);

  const handleDotClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-5 items-center">
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={(e) => handleDotClick(e, section.id)}
            className="group relative flex items-center justify-center p-1.5 cursor-pointer"
            aria-label={`Scroll to ${section.label}`}
          >
            {/* Tooltip */}
            <span className="absolute right-8 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-text-primary bg-surface border border-border-subtle rounded-md opacity-0 scale-95 translate-x-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none uppercase whitespace-nowrap">
              {section.label}
            </span>

            {/* Dot */}
            <span
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-accent scale-125 shadow-[0_0_8px_var(--accent-glow)]"
                  : "bg-text-muted/40 hover:bg-text-secondary scale-100"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
