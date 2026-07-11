"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, ArrowUpRight } from "lucide-react";

interface BlogPost {
  title: string;
  date: string;
  platform: string;
  link: string;
  readTime: string;
}

export default function Blog() {
  const posts: BlogPost[] = [
    {
      title: "How to Build a High-Performance Real-Time Crypto Price Tracker",
      date: "May 12, 2026",
      platform: "Hashnode",
      link: "https://hashnode.com",
      readTime: "6 min read",
    },
    {
      title: "Understanding Escrow Smart Contracts & Decentralized Governance",
      date: "April 28, 2026",
      platform: "Dev.to",
      link: "https://dev.to",
      readTime: "8 min read",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="blog"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 w-full max-w-7xl mx-auto flex flex-col gap-12"
    >
      {/* Heading Block */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-medium tracking-tight text-text-primary">
            Writing
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
        </div>
        <p className="text-text-secondary text-sm md:text-base max-w-xl">
          Thoughts, guides, and developer stories.
        </p>
      </div>

      {/* Grid List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {posts.map((post, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="group flex flex-col justify-between bg-surface border border-border-subtle hover:border-border-strong rounded-2xl p-6 transition-all duration-300 hover:shadow-lg gap-4"
          >
            <div className="flex flex-col gap-3">
              {/* Header Row: Platform & Date & Read Time */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-text-muted text-xs">
                <span className="font-mono text-[10px] tracking-wider font-semibold uppercase px-2.5 py-0.5 rounded-full bg-surface-2 border border-border-subtle text-text-secondary">
                  {post.platform}
                </span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </div>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-text-primary text-base sm:text-lg font-medium tracking-tight group-hover:text-accent transition-colors leading-snug">
                {post.title}
              </h3>
            </div>

            {/* Read on Platform Link */}
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-text-secondary hover:text-accent font-semibold mt-2 w-fit transition-colors group-hover:translate-x-0.5 cursor-pointer"
            >
              <span>Read on {post.platform}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer link to view all */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex justify-center md:justify-start mt-4"
      >
        <a
          href="https://hashnode.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-text-secondary hover:text-accent group transition-all duration-200 cursor-pointer"
        >
          <span>All Posts</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </motion.div>
    </section>
  );
}
