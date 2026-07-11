export default function Ticker() {
  const items = [
    'TypeScript', 'React', 'Next.js', 'Node.js', 'FastAPI',
    'Python', 'PostgreSQL', 'MongoDB', 'Docker', 'XGBoost',
    'Solidity', 'Wagmi', 'C++17', 'CMake', 'GitHub Actions',
    'Vercel', 'Supabase', 'Redis', 'Git', 'Linux'
  ];
  const text = items.join(' / ') + ' / ';

  return (
    <div className="border-y border-[var(--border)] py-4 overflow-hidden select-none"
         style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {/* Duplicate for seamless loop */}
        {[text, text].map((t, idx) => (
          <span key={idx} className="font-mono text-[12px] text-[var(--text-muted)] 
                                      whitespace-nowrap px-4">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
