'use client'
import meta from '@/data/meta.json'

export default function Contact() {
  const { email } = meta

  return (
    <section id="contact" className="contact-section">
      {/* Ambient glow orbs */}
      <div className="contact-glow contact-glow-2" />

      <div className="contact-label-container">
        <span className="contact-label-text">Let&apos;s build what&apos;s next</span>
      </div>

      <h2 className="contact-heading">
        Let&apos;s turn vision<br></br>
        into code.
      </h2>

      <a href={`mailto:${email}`} className="contact-email-link">
        {email} ↗
      </a>
      <p className="contact-response-time">Usually responds in &lt;24 hours</p>

      <div className="contact-socials">
        <a href="https://linkedin.com/in/aditya-kumar-57a988374/" target="_blank" rel="noreferrer" className="contact-social-cell" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor" className="contact-social-svg">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
        <a href={`mailto:${email}`} className="contact-social-cell" aria-label="Email">
          <svg viewBox="0 0 24 24" fill="currentColor" className="contact-social-svg">
            <path d="M22 4H2C0.9 4 0 4.9 0 6V18C0 19.1 0.9 20 2 20H22C23.1 20 24 19.1 24 18V6C24 4.9 23.1 4 22 4ZM20.6 6L12 11.2L3.4 6H20.6ZM2 18V7.8L12 14L22 7.8V18H2Z" />
          </svg>
        </a>
        <a href="https://codolio.com/profile/adi321" target="_blank" rel="noreferrer" className="contact-social-cell" aria-label="Codolio">
          <svg viewBox="0 0 24 24" fill="currentColor" className="contact-social-svg">
            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
          </svg>
        </a>
        <a href="https://www.instagram.com/_aditya_srivastav_/?hl=en" target="_blank" rel="noreferrer" className="contact-social-cell" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="currentColor" className="contact-social-svg">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
          </svg>
        </a>
        <a href="https://x.com/KumarAdity48332" target="_blank" rel="noreferrer" className="contact-social-cell" aria-label="X">
          <svg viewBox="0 0 24 24" fill="currentColor" className="contact-social-svg">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      </div>

      <style>{`
        .contact-section {
          max-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
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
            padding: clamp(4rem, 15vw, 5rem) 24px;
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
