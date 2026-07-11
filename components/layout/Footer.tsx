'use client'
export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '20px 24px',
      maxWidth: '1400px',
      margin: '0 auto',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '12px',
    }}>
      <p style={{ fontFamily: 'var(--font-geist-mono), monospace',
        fontSize: '12px', color: 'var(--text-muted)' }}>
        Aditya Kumar · Patna, IN
      </p>

      <div style={{ display: 'flex', gap: '24px' }}>
        {[
          { label: 'GitHub', href: 'https://github.com/AdityaKumar1511' },
          { label: 'LinkedIn', href: 'https://linkedin.com/in/aditya-kumar-57a988374/' },
          { label: 'Email', href: 'mailto:aditya.kumar00706@gmail.com' },
        ].map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer"
            style={{ fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: '12px', color: 'var(--text-muted)',
              textDecoration: 'none', transition: 'color 150ms' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
            {label}
          </a>
        ))}
      </div>
    </footer>
  )
}