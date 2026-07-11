"use client";

import { useState, useEffect } from "react";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      
      // Add a small threshold (e.g. 5px) to prevent tiny scroll movements from triggering changes
      if (Math.abs(scrollY - lastScrollY) < 5) {
        return;
      }
      
      const direction = scrollY > lastScrollY ? "down" : "up";
      setScrollDirection(direction);
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, []);

  return scrollDirection;
}
