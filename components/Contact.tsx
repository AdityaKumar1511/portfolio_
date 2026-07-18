'use client'
import meta from '@/data/meta.json'
import links from '@/data/socials.json'

export default function Contact() {
  const { email } = meta

  return (
    <section id="contact" className="contact-section">
      {/* Ambient glow orbs */}
      <div className="contact-glow contact-glow-2" />

      <div className="contact-label-container">
        <span className="contact-label-text">Let&apos;s build something</span>
      </div>

      <h2 className="contact-heading">
        Have a hard<br />problem?
      </h2>

      <a
        href={`mailto:${email}`}
        className="contact-email"
      >
        {email} ↗
      </a>

      <div className="contact-links">
        {links.map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" className="contact-link">
            {label}
          </a>
        ))}
      </div>

      <style>{`
        .contact-section {
          padding: clamp(5rem, 12vw, 10rem) 24px;
          border-top: 1px solid var(--border);
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          text-align: center;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }

        /* Ambient glow orbs */
        .contact-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }

        .contact-glow-2 {
          width: 400px;
          height: 400px;
          bottom: -80px;
          right: -60px;
          background: radial-gradient(circle, rgba(174, 216, 230, 0.08) 0%, transparent 70%);
          filter: blur(70px);
          animation: contactGlow2 10s ease-in-out infinite alternate;
        }

        @keyframes contactGlow2 {
          0% { opacity: 0.4; transform: scale(1); }
          100% { opacity: 0.8; transform: scale(1.12); }
        }

        .contact-label-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
        }

        .contact-label-text {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #ff5f38;
          font-weight: 700;
        }

        .contact-heading {
          font-size: clamp(2.5rem, 8vw, 6rem);
          font-weight: 600;
          letter-spacing: -0.04em;
          line-height: 0.92;
          color: var(--text);
          margin-bottom: 2.5rem;
          position: relative;
          z-index: 1;
        }

        .contact-email {
          font-size: clamp(0.9rem, 2vw, 1.15rem);
          color: var(--text-secondary);
          text-decoration: underline;
          text-underline-offset: 6px;
          text-decoration-color: var(--border);
          transition: all 200ms;
          display: inline-block;
          margin-bottom: 3rem;
          position: relative;
          z-index: 1;
        }

        .contact-email:hover {
          color: var(--text);
          text-decoration-color: var(--text);
        }

        .contact-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .contact-link {
          font-size: 13px;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 150ms;
        }

        .contact-link:hover {
          color: var(--text);
        }
      `}</style>
    </section>
  )
}
