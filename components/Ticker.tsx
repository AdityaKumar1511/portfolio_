export default function Ticker() {
  const items = [
    "TypeScript",
    "React",
    "Next.js",
    "Node",
    "Go",
    "PostgreSQL",
    "Redis",
    "GraphQL",
    "AWS",
    "Docker",
    "Kubernetes",
    "Rust",
    "Python",
    "FastAPI",
    "Solidity",
    "Wagmi",
  ];

  const track = items.join(" / ") + " / ";

  return (
    <section className="py-8 border-y border-[var(--border)] overflow-hidden group">
      <div className="marquee-track group-hover:[animation-play-state:paused]">
        <span className="font-mono text-[13px] text-[var(--text-muted)]">
          {track}
        </span>
        <span className="font-mono text-[13px] text-[var(--text-muted)]">
          {track}
        </span>
      </div>
    </section>
  );
}
