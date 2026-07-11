"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string; url: string };
  created_at: string;
}

const GITHUB_USER = "AdityaKumar1511";

const fallbackStats = {
  contributions: "500+",
  streak: "7",
  longestStreak: "30",
  commits: "500+",
};

export default function GitHub() {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=7`
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setEvents(data.slice(0, 7));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const getEventText = (event: GitHubEvent) => {
    const repo = event.repo.name.split("/")[1] || event.repo.name;
    switch (event.type) {
      case "PushEvent":
        return `Pushed commits to ${repo}`;
      case "CreateEvent":
        return `Created branch in ${repo}`;
      case "PullRequestEvent":
        return `Pull request in ${repo}`;
      case "IssuesEvent":
        return `Issue activity in ${repo}`;
      case "WatchEvent":
        return `Starred ${repo}`;
      case "ForkEvent":
        return `Forked ${repo}`;
      default:
        return `Activity in ${repo}`;
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "PushEvent":
        return "↑";
      case "ForkEvent":
        return "⑂";
      case "PullRequestEvent":
        return "⇅";
      default:
        return "●";
    }
  };

  const stats = [
    { value: fallbackStats.contributions, label: "Contributions · 1y" },
    { value: fallbackStats.streak, label: "Current streak" },
    { value: fallbackStats.longestStreak, label: "Longest streak" },
    { value: fallbackStats.commits, label: "Commits · 1y" },
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-[var(--border)]">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-2">
            Open source
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[1.75rem] font-medium tracking-tight"
          >
            Building in public.
          </motion.h2>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] border border-[var(--border)] px-2 py-0.5 rounded-sm text-[var(--text-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      </div>

      {/* GitHub link */}
      <a
        href={`https://github.com/${GITHUB_USER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[13px] text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
      >
        @{GITHUB_USER} ↗
      </a>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
        {stats.map((stat) => (
          <div key={stat.label}>
            <span className="text-[2rem] font-semibold text-[var(--text)] block">
              {stat.value}
            </span>
            <span className="font-mono text-[11px] text-[var(--text-muted)]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <div className="mt-12 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://ghchart.rshah.org/${GITHUB_USER}`}
          alt="GitHub contributions heatmap"
          className="w-full max-w-2xl"
          style={{ filter: "invert(1) opacity(0.3)" }}
        />
      </div>

      {/* Recent activity */}
      <div className="mt-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-4">
          Recent activity
        </p>
        <h3 className="text-lg font-medium mb-6">
          Latest pushes &amp; pull requests.
        </h3>

        <div>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="border-b border-[var(--border)] py-3 flex items-center gap-3"
                >
                  <div className="w-4 h-4 rounded bg-[var(--surface-2)] animate-pulse" />
                  <div className="h-3 w-64 rounded bg-[var(--surface-2)] animate-pulse" />
                </div>
              ))
            : events.map((event) => (
                <a
                  key={event.id}
                  href={`https://github.com/${event.repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-[var(--border)] py-3 flex items-center gap-3 hover:bg-[var(--surface)] transition-colors px-1 -mx-1"
                >
                  <span className="font-mono text-[var(--text-muted)] w-4 text-center">
                    {getEventIcon(event.type)}
                  </span>
                  <span className="text-[13px] text-[var(--text-secondary)]">
                    {getEventText(event)}
                  </span>
                </a>
              ))}
          {!loading && events.length === 0 && (
            <p className="text-[13px] text-[var(--text-muted)] py-3">
              No recent public activity available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
