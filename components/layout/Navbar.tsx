"use client";

import { useState, useEffect } from "react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Download } from "lucide-react";

export default function Navbar() {
  const scrollDirection = useScrollDirection();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 80) {
        if (scrollDirection === "up") {
          setIsVisible(true);
        } else if (scrollDirection === "down") {
          setIsVisible(false);
        }
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Check current scroll position on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollDirection]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, y: -100, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -100, x: "-50%" }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-4 left-1/2 z-40 w-fit max-w-[90vw] flex items-center justify-between gap-6 px-6 py-2.5 rounded-full border border-border-subtle bg-bg-secondary/70 backdrop-blur-md shadow-lg"
          style={{ transform: "translateX(-50%)" }}
        >
          {/* Logo / Name */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "hero")}
            className="text-sm font-semibold tracking-tight text-text-primary hover:text-accent transition-colors"
          >
            Aditya Kumar
          </a>

          {/* Section links */}
          <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-text-secondary">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className="hover:text-text-primary transition-colors py-1 px-2 rounded-md"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Theme & Resume */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-accent hover:opacity-90 active:scale-95 rounded-full cursor-pointer transition-all duration-150 shadow-[0_2px_10px_var(--accent-glow)]"
            >
              <span>Resume</span>
              <Download className="w-3 h-3" />
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
