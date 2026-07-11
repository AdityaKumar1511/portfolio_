'use client'
export default function Contact() {
  return (
    <section id="contact" style={{
      padding: 'clamp(5rem,12vw,10rem) 24px',
      borderTop: '1px solid var(--border)',
      maxWidth: '1400px',
      margin: '0 auto',
      width: '100%',
      textAlign: 'center',
    }}>
      <p style={{ fontFamily: 'var(--font-geist-mono), monospace',
        fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em',
        color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Let&apos;s build something
      </p>

      <h2 style={{
        fontSize: 'clamp(2.5rem, 8vw, 6rem)',
        fontWeight: 600,
        letterSpacing: '-0.04em',
        lineHeight: 0.92,
        color: 'var(--text)',
        marginBottom: '2.5rem',
      }}>
        Have a hard<br />problem?
      </h2>

      <a
        href="mailto:aditya.kumar00706@gmail.com"
        style={{
          fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
          color: 'var(--text-secondary)',
          textDecoration: 'underline',
          textUnderlineOffset: '6px',
          textDecorationColor: 'var(--border)',
          transition: 'all 200ms',
          display: 'inline-block',
          marginBottom: '3rem',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = 'var(--text)'
          e.currentTarget.style.textDecorationColor = 'var(--text)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = 'var(--text-secondary)'
          e.currentTarget.style.textDecorationColor = 'var(--border)'
        }}
      >
        aditya.kumar00706@gmail.com ↗
      </a>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem',
        flexWrap: 'wrap' }}>
        {[
          { label: 'GitHub', href: 'https://github.com/AdityaKumar1511' },
          { label: 'LinkedIn', href: 'https://linkedin.com/in/aditya-kumar-57a988374/' },
          { label: 'Email', href: 'mailto:aditya.kumar00706@gmail.com' },
        ].map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer"
            style={{ fontSize: '13px', color: 'var(--text-muted)',
              textDecoration: 'none', transition: 'color 150ms' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
            {label}
          </a>
        ))}
      </div>
    </section>
  )
}