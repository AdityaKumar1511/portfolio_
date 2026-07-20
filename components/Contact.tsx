'use client'
import meta from '@/data/meta.json'
import contactData from '@/data/contact.json'
import socialsData from '@/data/socials.json'
import FadeIn from './FadeIn'

export default function Contact() {
  const { email } = meta

  return (
    <section id="contact" className="contact-section">
      {/* Ambient glow orbs */}
      <div className="contact-glow contact-glow-2" />

      <div className="contact-label-container">
        <FadeIn>
        <span className="contact-label-text">{contactData.label}</span>
        </FadeIn>
      </div>

      <FadeIn delay={0.1}>
      <h2 className="contact-heading">
        {contactData.heading1}<br></br>
        {contactData.heading2}
      </h2>
      </FadeIn>

      <FadeIn delay={0.2}>
      <a href={`mailto:${email}`} className="contact-email-link">
        {email} ↗
      </a>
      <p className="contact-response-time" dangerouslySetInnerHTML={{ __html: contactData.responseTime }} />
      </FadeIn>

      <FadeIn delay={0.3}>
      <div className="contact-socials">
        {socialsData.map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="contact-social-cell" aria-label={s.label}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="contact-social-svg">
              <path d={s.svgPath} />
            </svg>
          </a>
        ))}
      </div>
      </FadeIn>

      <style>{`
        .contact-section {
          max-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: clamp(5rem, 12vw, 10rem) 0;
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
          margin-top: 1rem;
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
          font-size: clamp(2.5rem, 7vw, 5rem);
          font-weight: 600;
          letter-spacing: -0.04em;
          line-height: 0.92;
          color: var(--text);
          margin-top: 0.5rem;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 1;
        }

        .contact-email-link {
          font-family: var(--font-geist-mono), monospace;
          font-size: clamp(0.85rem, 1.8vw, 1.1rem);
          color: #ff5f38;
          text-decoration: none;
          display: inline-block;
          margin-bottom: 0.5rem;
          position: relative;
          z-index: 1;
          transition: opacity 200ms;
        }

        .contact-email-link:hover {
          opacity: 0.7;
        }

        .contact-response-time {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #777777;
          margin: 0 0 2.5rem 0;
          position: relative;
          z-index: 1;
        }

        .contact-socials {
          display: flex;
          justify-content: center;
          gap: 0;
          position: relative;
          z-index: 1;
        }

        .contact-social-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 72px;
          height: 72px;
          color: #BBBBBB;
          text-decoration: none;
          transition: color 200ms ease, background 200ms ease;
        }

        .contact-social-cell:hover {
          color: #999999;
          background: #111111;
        }

        .contact-social-svg {
          width: 36px;
          height: 36px;
        }

        @media (max-width: 640px) {
          .contact-section {
            max-height: none;
            min-height: auto;
            padding: clamp(4rem, 15vw, 5rem) 0;
          }

          .contact-heading {
            font-size: clamp(2rem, 10vw, 2.5rem);
          }
        }

        @media (max-width: 480px) {
          .contact-social-cell {
            width: 56px;
            height: 56px;
          }

          .contact-social-svg {
            width: 28px;
            height: 28px;
          }

          .contact-section {
            padding: 3rem 16px;
          }

          .contact-email-link {
            font-size: clamp(0.75rem, 3.5vw, 0.85rem);
            word-break: break-all;
          }
        }
      `}</style>
    </section>
  )
}
