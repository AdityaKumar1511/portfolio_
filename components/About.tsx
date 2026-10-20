import meta from '@/data/meta.json'
import aboutData from '@/data/about.json'
import FadeIn from './FadeIn'
import { ArrowUpRight } from './ArrowIcon'

export default function About() {
  const { github, resumeUrl } = meta
  const { serial, heading, bio, githubBtnLabel, resumeBtnLabel, principle } = aboutData

  return (
    <section id="about" className="about-section">
      <FadeIn>
        <div className="about-shell">
          <div className="about-top">
            <span className="about-label">
              <span className="about-label-line" />
              About / 02
            </span>
            <span className="about-serial">{serial}</span>
          </div>

          <div className="about-grid">
            <div className="about-heading-col">
              <h2 className="about-heading" style={{ whiteSpace: 'pre-line' }}>
                {heading}
              </h2>
              <span className="about-rule" aria-hidden="true" />
            </div>

            <div className="about-copy-col">
              <p
                className="about-bio"
                dangerouslySetInnerHTML={{ __html: bio }}
              />

              <div className="about-actions">
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="about-action-primary"
                >
                  {githubBtnLabel} <ArrowUpRight size={12} />
                </a>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="about-action-link"
                >
                  {resumeBtnLabel} <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>

          <div className="about-principle">
            <span className="about-principle-label">Principle /</span>
            <p>{principle}</p>
          </div>
        </div>
      </FadeIn>

      <style>{`
        .about-section {
          position: relative;
          padding: clamp(4.5rem, 10vh, 8rem) var(--pad-x);
          border-top: 1px solid var(--rule);
          background: transparent;
        }

        .about-section::before {
          content: "";
          position: absolute;
          top: clamp(12px, 2vw, 24px);
          left: var(--pad-x);
          width: 14px;
          height: 14px;
          border-top: 1px solid rgba(212, 206, 199, 0.32);
          border-left: 1px solid rgba(212, 206, 199, 0.32);
          pointer-events: none;
        }

        .about-section::after {
          content: "";
          position: absolute;
          bottom: clamp(12px, 2vw, 24px);
          right: var(--pad-x);
          width: 14px;
          height: 14px;
          border-bottom: 1px solid rgba(212, 206, 199, 0.32);
          border-right: 1px solid rgba(212, 206, 199, 0.32);
          pointer-events: none;
        }

        .about-shell {
          width: 100%;
          max-width: 1480px;
          margin: 0 auto;
        }

        .about-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--rule);
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.14em;
        }

        .about-label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #fa5f34;
          font-weight: 700;
        }

        .about-label-line {
          width: 28px;
          height: 1px;
          background: #fa5f34;
          flex-shrink: 0;
        }

        .about-serial {
          color: rgba(212, 206, 199, 0.46);
        }

        .about-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
          gap: clamp(3rem, 7vw, 8rem);
          align-items: start;
          padding-block: clamp(3rem, 7vh, 6rem);
        }

        .about-heading {
          margin: 0;
          font-family: var(--font-display), sans-serif;
          font-size: clamp(2.4rem, 5.4vw, 5.75rem);
          font-weight: 800;
          font-stretch: 88%;
          line-height: 0.94;
          letter-spacing: -0.045em;
          color: #f3eee8;
        }

        .about-rule {
          display: block;
          width: clamp(80px, 11vw, 150px);
          height: 3px;
          margin-top: clamp(1.5rem, 3.5vh, 2.5rem);
          background: #fa5f34;
        }

        .about-copy-col {
          padding-left: clamp(2rem, 4vw, 4rem);
          border-left: 1px solid var(--rule);
        }

        .about-bio {
          margin: 0;
          max-width: 54ch;
          font-family: var(--font-sans), sans-serif;
          font-size: clamp(1rem, 1.3vw, 1.1rem);
          line-height: 1.75;
          color: rgba(212, 206, 199, 0.78);
        }

        .about-bio .highlight {
          color: #fa5f34;
          font-weight: 600;
        }

        .about-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px 22px;
          margin-top: clamp(2rem, 4vh, 2.75rem);
        }

        .about-action-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 11px 18px;
          background: #fa5f34;
          color: #0a0a0a;
          border: 1px solid #fa5f34;
          border-radius: 2px;
          box-shadow: 4px 4px 0 #000;
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          text-decoration: none;
          white-space: nowrap;
          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            background 180ms ease;
        }

        .about-action-primary:hover {
          background: #ff7049;
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 #000;
        }

        .about-action-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding-bottom: 3px;
          color: rgba(212, 206, 199, 0.78);
          border-bottom: 1px solid rgba(212, 206, 199, 0.28);
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          text-decoration: none;
          white-space: nowrap;
          transition: color 180ms ease, border-color 180ms ease;
        }

        .about-action-link:hover {
          color: #fa5f34;
          border-color: #fa5f34;
        }

        .about-principle {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: clamp(1.5rem, 5vw, 5rem);
          padding-top: 18px;
          border-top: 1px solid var(--rule);
        }

        .about-principle-label {
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #fa5f34;
          white-space: nowrap;
        }

        .about-principle p {
          margin: 0;
          max-width: 68ch;
          font-family: var(--font-sans), sans-serif;
          font-size: clamp(0.95rem, 1.2vw, 1.05rem);
          line-height: 1.6;
          color: rgba(212, 206, 199, 0.62);
          text-align: right;
        }

        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: clamp(2.25rem, 5vh, 3rem);
            padding-block: clamp(2.75rem, 6vh, 4rem);
          }

          .about-copy-col {
            padding-left: 0;
            border-left: 0;
          }

          .about-bio {
            max-width: 62ch;
          }

          .about-principle {
            align-items: flex-start;
            flex-direction: column;
            gap: 10px;
          }

          .about-principle p {
            text-align: left;
          }
        }

        @media (max-width: 600px) {
          .about-section {
            padding-block: clamp(3.5rem, 8vh, 5rem);
          }

          .about-top {
            font-size: 9px;
          }

          .about-heading {
            font-size: clamp(2.4rem, 9vw, 3.25rem);
          }

          .about-rule {
            margin-top: 1.5rem;
          }

          .about-actions {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
          }

          .about-action-primary,
          .about-action-link {
            justify-content: center;
            width: 100%;
          }

          .about-action-link {
            padding-bottom: 0;
            border-bottom: 0;
          }
        }
      `}</style>
    </section>
  )
}
