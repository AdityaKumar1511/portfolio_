'use client';
import { useEffect, useState } from 'react';

interface LCStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  totalSubmissions: number;
}

export default function LeetCode() {
  const [stats, setStats] = useState<LCStats | null>(null);
  const [loading, setLoading] = useState(true);
  const username = 'AdityaKumar1511';

  useEffect(() => {
    fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`)
      .then(r => r.json())
      .then(data => {
        setStats({
          totalSolved: data.totalSolved ?? 282,
          easySolved: data.easySolved ?? 150,
          mediumSolved: data.mediumSolved ?? 110,
          hardSolved: data.hardSolved ?? 22,
          ranking: data.ranking ?? 0,
          totalSubmissions: data.totalSubmissions ?? 0,
        });
        setLoading(false);
      })
      .catch(() => {
        // Fallback to known stats if API fails
        setStats({ 
          totalSolved: 282, 
          easySolved: 150, 
          mediumSolved: 110, 
          hardSolved: 22, 
          ranking: 0, 
          totalSubmissions: 0 
        });
        setLoading(false);
      });
  }, []);

  const statItems = stats ? [
    { label: 'Total Solved', value: stats.totalSolved },
    { label: 'Easy', value: stats.easySolved },
    { label: 'Medium', value: stats.mediumSolved },
    { label: 'Hard', value: stats.hardSolved },
  ] : [];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-[var(--border)]">
      <div className="flex justify-between items-start mb-12">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-3">
            Problem solving
          </p>
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-medium tracking-tight text-[var(--text)]">
            Sharpening the algorithms.
          </h2>
        </div>
        <span className="flex items-center gap-2 font-mono text-[10px] text-[var(--text-muted)] 
                         border border-[var(--border)] px-2 py-1 rounded-sm mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      </div>

      <a href={`https://leetcode.com/u/${username}/`} target="_blank" rel="noreferrer"
         className="font-mono text-[13px] text-[var(--text-secondary)] hover:text-[var(--text)] 
                    transition-colors block mb-12">
        @{username} · LeetCode ↗
      </a>

      {/* Stats grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 bg-[var(--surface)] rounded animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {statItems.map(item => (
            <div key={item.label}>
              <p className="text-[2rem] font-semibold text-[var(--text)] font-mono leading-none">
                {item.value}
              </p>
              <p className="font-mono text-[11px] text-[var(--text-muted)] mt-1 uppercase tracking-wider">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* LeetCode stats card embed */}
      <div className="overflow-hidden rounded-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://leetcard.jacoblin.cool/${username}?theme=dark&font=Geist+Mono&ext=heatmap&border=0&radius=12`}
          alt="LeetCode stats"
          className="w-full max-w-lg opacity-80"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>
    </section>
  );
}
