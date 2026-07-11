"use client";

import { useEffect, useState } from "react";
import metaData from "@/data/meta.json";
import { Mail } from "lucide-react";

// Inline custom SVGs for brand icons since lucide-react deprecated them
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!mounted) {
    return null;
  }

  return (
    <footer className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12 mt-20 border-t border-border-subtle bg-bg-primary text-text-secondary text-sm">
      {/* Row 1 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <span className="font-semibold text-text-primary tracking-tight">
          {metaData.name}
        </span>
        {metaData.openToWork && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-border-subtle bg-surface">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-mint"></span>
            </span>
            <span className="text-xs font-medium tracking-wide uppercase text-text-primary">
              {metaData.statusText}
            </span>
          </div>
        )}
      </div>

      {/* Social links block */}
      <div className="flex items-center justify-center gap-6 py-4 border-y border-border-subtle mb-8">
        <a
          href={metaData.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text-primary transition-colors p-2 cursor-pointer"
          aria-label="GitHub Profile"
        >
          <GithubIcon className="w-5 h-5" />
        </a>
        <a
          href={metaData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text-primary transition-colors p-2 cursor-pointer"
          aria-label="LinkedIn Profile"
        >
          <LinkedinIcon className="w-5 h-5" />
        </a>
        <a
          href={`mailto:${metaData.email}`}
          className="hover:text-text-primary transition-colors p-2 cursor-pointer"
          aria-label="Send Email"
        >
          <Mail className="w-5 h-5" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text-primary transition-colors p-2 cursor-pointer"
          aria-label="Twitter Profile"
        >
          <TwitterIcon className="w-5 h-5" />
        </a>
      </div>


      {/* Row 2 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
        <span>
          © {new Date().getFullYear()} {metaData.name}. All rights reserved.
        </span>
        <button
          onClick={handleBackToTop}
          className="flex items-center gap-1.5 px-4 py-2 border border-border-subtle rounded-full bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong cursor-pointer transition-all duration-200"
        >
          <span>↑ Back to top</span>
        </button>
      </div>
    </footer>
  );
}
