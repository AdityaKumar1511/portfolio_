"use client";

import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent server hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />; // Spacer during SSR
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-9 h-9 rounded-full border border-border-subtle bg-surface hover:bg-surface-2 hover:border-border-strong text-text-secondary hover:text-text-primary transition-all duration-200 cursor-pointer"
      aria-label="Toggle dark/light theme"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-amber" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
}
