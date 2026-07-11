"use client";

import { useState, useEffect } from "react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-[var(--border)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <span className="text-sm font-medium text-[var(--text)]">
        Aditya Kumar
      </span>

      <div className="flex items-center gap-6">
        <span className="flex items-center gap-2 text-[11px] font-mono border border-[var(--border)] px-3 py-1 rounded-full text-[var(--text-secondary)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Open to work
        </span>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline text-[13px] text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
        >
          Resume ↗
        </a>

        <a
          href="https://github.com/AdityaKumar1511"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
        >
          <GithubIcon className="w-4 h-4" />
        </a>
      </div>
    </nav>
  );
}
