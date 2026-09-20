'use client'
import { useEffect, useRef, useState } from 'react'
import { useLenis } from 'lenis/react'
import meta from '@/data/meta.json'
import socials from '@/data/socials.json'

type Line = React.ReactNode

function External({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="t-link" href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

function Usage({ cmd, desc }: { cmd: string; desc: string }) {
  return (
    <>
      <span className="t-cmd">{cmd}</span>
      <span className="t-sep"> — </span>
      <span className="t-desc">{desc}</span>
    </>
  )
}

const WELCOME: Line[] = [
  <span key="w0" className="t-brand">
    Welcome to {meta.name}&apos;s portfolio terminal.
  </span>,
  <span key="w1" className="t-dim">
    Type <span className="t-cmd">help</span> to see available commands.
  </span>,
]

const HELP: Line[] = [
  <Usage key="h-help" cmd="help" desc="Show available commands" />,
  <Usage key="h-about" cmd="about" desc="Who I am" />,
  <Usage key="h-experience" cmd="experience" desc="What I do" />,
  <Usage key="h-projects" cmd="projects" desc="Jump to projects" />,
  <Usage key="h-socials" cmd="socials" desc="All my links" />,
  <Usage key="h-contact" cmd="contact" desc="Email me" />,
  <Usage key="h-resume" cmd="resume" desc="View my resume" />,
  <Usage key="h-whoami" cmd="whoami" desc="Current user" />,
  <Usage key="h-ls" cmd="ls" desc="List sections" />,
  <Usage key="h-clear" cmd="clear" desc="Clear the terminal" />,
  <Usage key="h-exit" cmd="exit" desc="Close the terminal" />,
]

function runCommand(cmdRaw: string): Line[] {
  const cmd = cmdRaw.trim().toLowerCase()

  switch (cmd) {
    case 'help':
      return [<Usage key="u" cmd="usage:" desc="command" />, ...HELP]

    case 'about':
      return [
        <span key="a0">
          <span className="t-lbl">name</span> {meta.name}
        </span>,
        <span key="a1">
          <span className="t-lbl">role</span> {meta.role}
        </span>,
        <span key="a2" className="t-dim">
          {meta.tagline}
        </span>,
        <span key="a3">
          <span className="t-lbl">college</span> {meta.college}
        </span>,
        <span key="a4">
          <span className="t-lbl">year</span> {meta.year}
        </span>,
        <span key="a5">
          <span className="t-lbl">location</span> {meta.location}
        </span>,
        <span key="a6" className="t-dim">
          status: {meta.statusText}
        </span>,
      ]

    case 'whoami':
      return [<span key="w">{meta.name} — {meta.role}</span>]

    case 'experience':
      return [
        <span key="e0">
          <span className="t-lbl">role</span> {meta.role}
        </span>,
        <span key="e1" className="t-dim">
          {meta.tagline}
        </span>,
        <span key="e2">
          <span className="t-lbl">status</span> {meta.statusText}
        </span>,
        <span key="e3" className="t-dim">
          see the experience section:{' '}
          <External href="#experience">#experience</External>
        </span>,
      ]

    case 'projects':
      return [
        <span key="p0" className="t-dim">
          browse my work in the projects section:{' '}
          <External href="#projects">#projects</External>
        </span>,
      ]

    case 'socials':
      return socials.map((s) => (
        <span key={s.label}>
          <span className="t-lbl">{s.label}</span>{' '}
          <External href={s.href}>{s.href}</External>
        </span>
      ))

    case 'contact':
    case 'email':
      return [
        <span key="c0">
          <span className="t-lbl">email</span>{' '}
          <External href={`mailto:${meta.email}`}>{meta.email}</External>
        </span>,
        <span key="c1" className="t-dim">
          I usually reply within a day.
        </span>,
      ]

    case 'resume':
      return [
        <span key="r0">
          <External href={meta.resumeUrl}>open resume ↗</External>
        </span>,
      ]

    case 'github':
      return [
        <span key="g0">
          <External href={meta.github}>{meta.github}</External>
        </span>,
      ]

    case 'ls':
      return [
        <span key="l0">
          <span className="t-cmd">about/</span>{' '}
          <span className="t-cmd">experience/</span>{' '}
          <span className="t-cmd">projects/</span>{' '}
          <span className="t-cmd">github/</span>{' '}
          <span className="t-cmd">leetcode/</span>{' '}
          <span className="t-cmd">how-i-work/</span>{' '}
          <span className="t-cmd">contact/</span>
        </span>,
      ]

    case 'clear':
      return []

    case 'exit':
    case 'quit':
      return [<span key="x" className="t-dim">closing terminal…</span>]

    case '':
      return []

    default:
      return [
        <span key="nf">
          <span className="t-err">command not found:</span> {cmd}
        </span>,
        <span key="nf2" className="t-dim">
          type <span className="t-cmd">help</span> to see available commands.
        </span>,
      ]
  }
}

export default function Terminal() {
  const lenis = useLenis()
  const [open, setOpen] = useState(false)
  const [history, setHistory] = useState<Line[]>(WELCOME)
  const [input, setInput] = useState('')
  const outputRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const welcomed = useRef(false)

  useEffect(() => {
    if (!open) return

    if (!welcomed.current) {
      welcomed.current = true
    }

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    lenis?.stop()
    inputRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      lenis?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [open, lenis])

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [history, open])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = input
    const output = runCommand(cmd)
    setHistory((h) => [...h, <span key={h.length} className="t-prompt-line"><span className="t-prompt">$</span> {cmd || '\u00A0'}</span>, ...output])
    setInput('')

    if (cmd.trim().toLowerCase() === 'clear') {
      setHistory([])
      return
    }
    if (cmd.trim().toLowerCase() === 'exit' || cmd.trim().toLowerCase() === 'quit') {
      setTimeout(() => setOpen(false), 250)
    }
  }

  return (
    <>
      <button
        className="terminal-btn"
        onClick={() => setOpen(true)}
        aria-label="Open terminal"
        title="Open terminal"
      >
        <span className="terminal-btn-icon">{'>_'}</span>
      </button>

      {open && (
        <div className="terminal-overlay" data-lenis-prevent onClick={() => setOpen(false)}>
          <div
            className="terminal-window"
            role="dialog"
            aria-modal="true"
            aria-label="Terminal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="terminal-titlebar">
              <div className="terminal-dots">
                <span className="terminal-dot terminal-dot-red" onClick={() => setOpen(false)} />
                <span className="terminal-dot terminal-dot-yellow" />
                <span className="terminal-dot terminal-dot-green" />
              </div>
              <span className="terminal-title">
                {meta.name.toLowerCase().replace(/\s+/g, '-')}@portfolio: ~
              </span>
              <button className="terminal-close" onClick={() => setOpen(false)} aria-label="Close terminal">
                ✕
              </button>
            </div>

            <div className="terminal-body" ref={outputRef}>
              {history.map((line, i) => (
                <div key={i} className="t-line">
                  {line}
                </div>
              ))}
            </div>

            <form className="terminal-input-row" onSubmit={submit}>
              <span className="t-prompt">$</span>
              <input
                ref={inputRef}
                className="terminal-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                aria-label="Terminal input"
              />
            </form>
          </div>
        </div>
      )}

      <style>{`
        .terminal-btn {
          position: fixed;
          right: var(--corner-x);
          bottom: var(--corner-y);
          z-index: 1001;
          width: 44px;
          height: 44px;
          border-radius: 2px;
          border: 1px solid rgba(212, 206, 199, 0.18);
          background: rgba(10, 10, 10, 0.7);
          color: #d4cec7;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        }

        .terminal-btn:hover {
          color: #fa5f34;
          border-color: #fa5f34;
          background: rgba(250, 95, 52, 0.08);
        }

        .terminal-btn-icon {
          font-family: var(--font-geist-mono), monospace;
          font-size: 13px;
          font-weight: 700;
        }

        .terminal-overlay {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--pad-x);
          animation: tFadeIn 0.2s ease;
        }

        .terminal-window {
          width: min(760px, 100%);
          height: min(520px, 80vh);
          background: #0b0b0b;
          border: 1px solid #2a2a2a;
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.7);
          animation: tPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes tFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes tPop {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .terminal-titlebar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: #141414;
          border-bottom: 1px solid #222;
          flex-shrink: 0;
        }

        .terminal-dots {
          display: flex;
          gap: 7px;
        }

        .terminal-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: inline-block;
        }

        .terminal-dot-red { background: #ff5f57; cursor: pointer; }
        .terminal-dot-yellow { background: #febc2e; }
        .terminal-dot-green { background: #28c840; }

        .terminal-title {
          flex: 1;
          text-align: center;
          font-family: var(--font-geist-mono), monospace;
          font-size: 12px;
          color: #d4cec7;
          letter-spacing: 0.04em;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .terminal-close {
          background: transparent;
          border: none;
          color: #d4cec7;
          cursor: pointer;
          font-size: 13px;
          padding: 4px;
          line-height: 1;
          transition: color 0.15s ease;
        }

        .terminal-close:hover {
          color: #d4cec7;
        }

        .terminal-body {
          flex: 1;
          overflow-y: auto;
          padding: 20px 20px 8px;
          font-family: var(--font-geist-mono), monospace;
          font-size: 13px;
          line-height: 1.75;
          color: #d4cec7;
          scrollbar-width: thin;
          scrollbar-color: #333 transparent;
        }

        .terminal-body::-webkit-scrollbar {
          width: 4px;
        }

        .terminal-body::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 2px;
        }

        .t-line {
          white-space: pre-wrap;
          word-break: break-word;
        }

        .t-prompt-line {
          color: #d4cec7;
          margin-top: 6px;
        }

        .t-prompt {
          color: #fa5f34;
          font-weight: 700;
          margin-right: 8px;
        }

        .t-prompt-line .t-prompt {
          margin-right: 0;
        }

        .t-cmd {
          color: #fa5f34;
        }

        .t-lbl {
          color: #fa5f34;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-size: 11px;
          margin-right: 8px;
        }

        .t-dim {
          color: #d4cec7;
        }

        .t-err {
          color: #ff5f57;
        }

        .t-brand {
          color: #d4cec7;
          font-weight: 600;
        }

        .t-sep {
          color: #d4cec7;
        }

        .t-desc {
          color: #d4cec7;
        }

        .t-link {
          color: #d4cec7;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.15s ease;
        }

        .t-link:hover {
          color: #fa5f34;
        }

        .terminal-input-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px 16px;
          flex-shrink: 0;
        }

        .terminal-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #d4cec7;
          font-family: var(--font-geist-mono), monospace;
          font-size: 13px;
          caret-color: #fa5f34;
          padding: 0;
        }

        @media (max-width: 768px) {
          .terminal-btn {
            display: none;
          }

          .terminal-body {
            font-size: 12px;
            padding: 16px 14px 6px;
          }

          .terminal-input-row {
            padding: 8px 14px 14px;
          }

          .terminal-input {
            font-size: 12px;
          }
        }
      `}</style>
    </>
  )
}
