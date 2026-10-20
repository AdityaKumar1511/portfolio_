'use client'
import meta from '@/data/meta.json'
import contactData from '@/data/contact.json'
import socialsData from '@/data/socials.json'
import FadeIn from './FadeIn'
import { ArrowUpRight } from './ArrowIcon'

export default function Contact() {
  const { email } = meta

  return (
    <section id="contact" className="contact-section">
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
        {email} <ArrowUpRight size={14} />
      </a>
      <p className="contact-response-time">{contactData.responseTime}</p>
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
          padding: clamp(5rem, 12vw, 10rem) var(--pad-x);
          border-top: 1px solid var(--border);
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          text-align: center;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          background-image: repeating-linear-gradient(
            135deg,
            rgba(212, 206, 199, 0.035) 0 1px,
            transparent 1px 10px
          );
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
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #fa5f34;
          font-weight: 500;
        }

        .contact-heading {
          font-family: var(--font-display), sans-serif;
          font-size: clamp(2.5rem, 7vw, 5rem);
          font-weight: 700;
          font-stretch: 90%;
          letter-spacing: -0.04em;
          line-height: 0.92;
          color: var(--text);
          margin-top: 0.5rem;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 1;
        }

        .contact-email-link {
          font-family: var(--font-mono), monospace;
          font-size: clamp(0.85rem, 1.8vw, 1.1rem);
          color: #fa5f34;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 0.5rem;
          position: relative;
          z-index: 1;
          transition: opacity 200ms;
        }

        .contact-email-link:hover {
          opacity: 0.7;
        }

        .contact-response-time {
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #d4cec7;
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
          color: #d4cec7;
          text-decoration: none;
          transition: color 200ms ease, background 200ms ease;
        }

        .contact-social-cell:hover {
          color: #d4cec7;
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
            padding: clamp(4rem, 15vw, 5rem) var(--pad-x);
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
            padding: 3rem var(--pad-x);
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
