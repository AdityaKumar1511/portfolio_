export default function Ticker() {
  const items = [
    'TypeScript','React','Next.js','Node.js','FastAPI','Python',
    'PostgreSQL','MongoDB','Docker','XGBoost','Solidity','Wagmi',
    'C++17','CMake','GitHub Actions','Vercel','Supabase','Git','Linux',
  ]
  const text = items.join(' / ') + ' / '

  return (
    <div style={{
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      padding: '14px 0',
      overflow: 'hidden',
      WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
    }}>
      <div className="animate-marquee" style={{ display: 'flex', width: 'max-content' }}>
        {[text, text].map((t, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '12px',
            color: 'var(--text-muted)',
            whiteSpace: 'nowrap',
            padding: '0 16px',
          }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
