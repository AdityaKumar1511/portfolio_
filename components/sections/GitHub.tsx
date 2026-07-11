'use client';
import { useEffect, useState } from 'react';

interface GitHubEvent {
  type: string;
  repo: { name: string; url: string };
  created_at: string;
}

export default function GitHub() {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const username = 'AdityaKumar1511';

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/events/public?per_page=10`)
      .then(r => r.json())
      .then((data: GitHubEvent[]) => {
        setEvents(Array.isArray(data) ? data.slice(0, 7) : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getIcon = (type: string) => {
    if (type === 'PushEvent') return '↑';
    if (type === 'ForkEvent') return '⑂';
    if (type === 'CreateEvent') return '✦';
    if (type === 'PullRequestEvent') return '⇄';
    return '·';
  };

  const getLabel = (event: GitHubEvent) => {
    const repo = event.repo.name.split('/')[1];
    if (event.type === 'PushEvent') return `Pushed commits to main · ${repo}`;
    if (event.type === 'ForkEvent') return `Forked a repository · ${repo}`;
    if (event.type === 'CreateEvent') return `Created repository · ${repo}`;
    if (event.type === 'PullRequestEvent') return `Pull request · ${repo}`;
    return `Activity · ${repo}`;
  };

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-[var(--border)]">
      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-3">
            Open source
          </p>
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-medium tracking-tight text-[var(--text)]">
            Building in public.
          </h2>
        </div>
        <span className="flex items-center gap-2 font-mono text-[10px] text-[var(--text-muted)] 
                         border border-[var(--border)] px-2 py-1 rounded-sm mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      </div>

      {/* GitHub link */}
      <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer"
         className="font-mono text-[13px] text-[var(--text-secondary)] hover:text-[var(--text)] 
                    transition-colors block mb-12">
        @{username} ↗
      </a>

      {/* Contribution heatmap */}
      <div className="mb-12 overflow-hidden rounded-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://ghchart.rshah.org/444444/${username}`}
          alt="GitHub contribution chart"
          className="w-full max-w-2xl"
          style={{ filter: 'invert(1) opacity(0.25)' }}
        />
      </div>

      {/* Recent activity */}
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-3">
          Recent activity
        </p>
        <h3 className="text-lg font-medium text-[var(--text)] mb-6">
          Latest pushes &amp; pull requests.
        </h3>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 bg-[var(--surface)] rounded animate-pulse" />
            ))}
          </div>
        ) : events.length > 0 ? (
          <div>
            {events.map((event, i) => (
              <a key={i}
                 href={`https://github.com/${event.repo.name}`}
                 target="_blank" rel="noreferrer"
                 className="flex items-center gap-3 border-b border-[var(--border)] py-3
                            hover:bg-[var(--surface)] transition-colors px-2 -mx-2 rounded-sm group">
                <span className="font-mono text-[var(--text-muted)] text-[13px] w-4 flex-shrink-0">
                  {getIcon(event.type)}
                </span>
                <span className="text-[13px] text-[var(--text-secondary)] group-hover:text-[var(--text)] 
                                 transition-colors">
                  {getLabel(event)}
                </span>
              </a>
            ))}
          </div>
        ) : (
          <p className="font-mono text-[12px] text-[var(--text-muted)]">
            No recent activity found.
          </p>
        )}
      </div>
    </section>
  );
}
