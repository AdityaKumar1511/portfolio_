"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LEETCODE_USER = "AdityaKumar1511";

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
}

const fallback: LeetCodeStats = {
  totalSolved: 282,
  easySolved: 95,
  mediumSolved: 150,
  hardSolved: 37,
  ranking: 150000,
};

export default function LeetCode() {
  const [stats, setStats] = useState<LeetCodeStats>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USER}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.totalSolved) {
          setStats({
            totalSolved: data.totalSolved || fallback.totalSolved,
            easySolved: data.easySolved || fallback.easySolved,
            mediumSolved: data.mediumSolved || fallback.mediumSolved,
            hardSolved: data.hardSolved || fallback.hardSolved,
            ranking: data.ranking || fallback.ranking,
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statItems = [
    { value: stats.ranking.toLocaleString(), label: "World rank" },
    { value: stats.totalSolved.toString(), label: "Total solved" },
    { value: stats.easySolved.toString(), label: "Easy" },
    { value: stats.mediumSolved.toString(), label: "Medium" },
    { value: stats.hardSolved.toString(), label: "Hard" },
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-[var(--border)]">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-2">
            Problem solving
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[1.75rem] font-medium tracking-tight"
          >
            Sharpening the algorithms.
          </motion.h2>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] border border-[var(--border)] px-2 py-0.5 rounded-sm text-[var(--text-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mt-4">
        {statItems.map((item) => (
          <div key={item.label}>
            {loading ? (
              <div className="h-8 w-16 rounded bg-[var(--surface-2)] animate-pulse" />
            ) : (
              <span className="text-[2rem] font-semibold text-[var(--text)] block">
                {item.value}
              </span>
            )}
            <span className="font-mono text-[11px] text-[var(--text-muted)]">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Heatmap / LeetCode card */}
      <div className="mt-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://leetcard.jacoblin.cool/${LEETCODE_USER}?theme=dark&font=Baloo_2&ext=heatmap`}
          alt="LeetCode stats heatmap"
          className="w-full max-w-lg rounded-lg opacity-80"
        />
      </div>
    </section>
  );
}
