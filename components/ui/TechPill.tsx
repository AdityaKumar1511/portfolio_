"use client";

interface TechPillProps {
  name: string;
}

export default function TechPill({ name }: TechPillProps) {
  return (
    <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-surface-2 border border-border-subtle text-text-secondary hover:border-border-strong hover:text-text-primary transition-colors duration-200 uppercase tracking-[0.04em] whitespace-nowrap">
      {name}
    </span>
  );
}
