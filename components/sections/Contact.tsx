"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Copy, Check, Send } from "lucide-react";
import metaData from "@/data/meta.json";

// Inline brand icon SVGs
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

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(metaData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback
    }
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 w-full max-w-7xl mx-auto flex flex-col gap-12"
    >
      {/* Heading Block */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-medium tracking-tight text-text-primary">
            Get in Touch
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
        </div>
        <p className="text-text-secondary text-sm md:text-base max-w-xl">
          I check email daily. No ghosts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column - Contact Details */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-text-primary text-lg font-medium">Let's build something together</h3>
            <p className="text-text-secondary text-sm leading-relaxed max-w-md">
              Whether you want to discuss a software engineering internship opportunity, collaborate on an open-source project, or just talk tech, feel free to reach out!
            </p>
          </div>

          {/* Copyable Email Card */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono font-semibold tracking-wider text-text-muted uppercase">
              Direct Email
            </span>
            <div className="group relative flex items-center justify-between gap-4 p-4 rounded-xl border border-border-subtle bg-surface hover:border-border-strong hover:bg-surface-2 transition-all duration-300 w-full max-w-md">
              <a
                href={`mailto:${metaData.email}`}
                className="text-text-primary group-hover:text-accent font-mono text-sm sm:text-base font-semibold truncate transition-colors"
              >
                {metaData.email}
              </a>
              <button
                onClick={handleCopyEmail}
                className="flex items-center justify-center p-2 rounded-lg border border-border-subtle bg-surface-2 text-text-secondary hover:text-text-primary hover:border-border-strong transition-all duration-200 cursor-pointer flex-shrink-0"
                aria-label="Copy email address"
              >
                {copied ? <Check className="w-4 h-4 text-mint" /> : <Copy className="w-4 h-4" />}
              </button>

              {/* Copied Overlay Indicator */}
              <AnimatePresence>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -top-10 right-4 px-2.5 py-1 text-[10px] font-mono font-semibold text-white bg-mint rounded-md shadow-sm"
                  >
                    COPIED!
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Social Links Card */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono font-semibold tracking-wider text-text-muted uppercase">
              Networks
            </span>
            <div className="flex items-center gap-4">
              <a
                href={metaData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border-subtle bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong transition-all duration-200 cursor-pointer"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4.5 h-4.5" />
              </a>
              <a
                href={metaData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border-subtle bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong transition-all duration-200 cursor-pointer"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Formspree Form */}
        <div className="lg:col-span-7 bg-surface border border-border-subtle rounded-2xl p-6 md:p-8 w-full shadow-sm hover:border-border-strong transition-all duration-300">
          <form
            action="https://formspree.io/f/PLACEHOLDER"
            method="POST"
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-[10px] font-mono font-semibold tracking-wider text-text-secondary uppercase"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="John Doe"
                  className="px-4 py-2.5 rounded-xl border border-border-subtle bg-surface-2 text-text-primary placeholder-text-muted/60 text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Email field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-[10px] font-mono font-semibold tracking-wider text-text-secondary uppercase"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="johndoe@example.com"
                  className="px-4 py-2.5 rounded-xl border border-border-subtle bg-surface-2 text-text-primary placeholder-text-muted/60 text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            {/* Message field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-[10px] font-mono font-semibold tracking-wider text-text-secondary uppercase"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={5}
                required
                placeholder="Hi Aditya, I'd like to talk about..."
                className="px-4 py-2.5 rounded-xl border border-border-subtle bg-surface-2 text-text-primary placeholder-text-muted/60 text-sm focus:outline-none focus:border-accent resize-none transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-mono font-bold uppercase tracking-wider text-xs rounded-full hover:opacity-90 active:scale-[0.98] transition-all duration-150 cursor-pointer shadow-[0_2px_10px_var(--accent-glow)] self-end"
            >
              <span>Send Message</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
