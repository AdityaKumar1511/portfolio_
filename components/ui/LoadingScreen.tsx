"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [shouldShow, setShouldShow] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // If already fully loaded on mount, do not show
    if (document.readyState === "complete") {
      setIsLoaded(true);
      return;
    }

    // Show loading screen only if it takes more than 300ms to load
    const timer = setTimeout(() => {
      if ((document.readyState as string) !== "complete") {
        setShouldShow(true);
      }
    }, 300);

    const handleLoad = () => {
      setIsLoaded(true);
    };

    if ((document.readyState as string) === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  // Show loading screen if shouldShow is true, and it is not fully loaded yet
  const isVisible = shouldShow && !isLoaded;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-primary text-text-primary select-none pointer-events-none"
        >
          <div className="flex flex-col items-center">
            {/* Centered AK initials */}
            <div className="flex overflow-hidden text-6xl md:text-8xl font-light tracking-widest relative pb-4">
              <motion.span
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="font-sans font-extralight"
              >
                A
              </motion.span>
              <motion.span
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="font-sans font-extralight"
              >
                K
              </motion.span>

              {/* Accent colored underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.7 }}
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent origin-center"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
