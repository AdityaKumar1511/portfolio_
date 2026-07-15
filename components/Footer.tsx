'use client'
import meta from '@/data/meta.json'
import links from '@/data/socials.json'

export default function Footer() {
  const { name, location } = meta

  return (
    <footer className="footer">
      <p className="footer-copyright">
        {name} · {location}
      </p>

      <div className="footer-links">
        {links.map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" className="footer-link">
            {label}
          </a>
        ))}
      </div>

      <style>{`
        .footer {
          border-top: 1px solid var(--border);
          padding: 20px 24px;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          box-sizing: border-box;
        }

        .footer-copyright {
          font-family: var(--font-geist-mono), monospace;
          font-size: 12px;
          color: var(--text-muted);
          margin: 0;
        }

        .footer-links {
          display: flex;
          gap: 24px;
        }

        .footer-link {
          font-family: var(--font-geist-mono), monospace;
          font-size: 12px;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 150ms;
        }

        .footer-link:hover {
          color: var(--text);
        }

        @media (max-width: 640px) {
          .footer {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            gap: 16px;
            padding: 32px 24px;
          }

          .footer-links {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  )
}
