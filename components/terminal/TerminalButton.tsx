"use client";

import { useEffect } from "react";
import { useTerminal } from "@/hooks/useTerminal";

export default function TerminalButton() {
  const { toggleTerminal } = useTerminal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering when user is editing input forms, message boxes, etc.
      const active = document.activeElement;
      if (
        active &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.getAttribute("contenteditable") === "true")
      ) {
        return;
      }

      if (e.key.toLowerCase() === "t") {
        e.preventDefault();
        toggleTerminal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTerminal]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Pulse wave ring overlay */}
      <div className="absolute inset-0 rounded-xl bg-accent animate-[pulse-ring_2s_cubic-bezier(0.2,0,0,1)_infinite] pointer-events-none" />

      {/* Button Body */}
      <button
        onClick={toggleTerminal}
        className="group relative flex items-center justify-center w-[52px] h-[52px] rounded-xl bg-accent text-white font-mono font-bold text-base cursor-pointer shadow-[0_0_20px_var(--accent-glow)] hover:opacity-95 active:scale-95 transition-all duration-150"
      >
        <span>&gt;_</span>

        {/* Tooltip on Hover */}
        <span className="absolute bottom-16 right-0 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-text-primary bg-surface border border-border-subtle rounded-md opacity-0 scale-95 translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none uppercase whitespace-nowrap shadow-md">
          Open Terminal [T]
        </span>
      </button>
    </div>
  );
}
