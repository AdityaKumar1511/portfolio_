'use client'
import { useState, useEffect } from 'react'
import disciplinesData from '@/data/howIWork.json'

type NodeStep = {
  num: number
  title: string
  icon: string
}

type DisciplineData = {
  id: string
  name: string
  icon: string
  nodes: NodeStep[]
  tech: string[]
}

// Classic SVG icon helper to replace emojis
function getIconSvg(symbol: string) {
  const strokeProps = {
    viewBox: '0 0 24 24',
    width: '24',
    height: '24',
    stroke: 'currentColor',
    strokeWidth: '2',
    fill: 'none',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (symbol) {
    // Disciplines
    case '🖥️': // Frontend
      return (
        <svg {...strokeProps}>
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )
    case '⚙️': // Backend
      return (
        <svg {...strokeProps}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      )
    case '🥞': // Full Stack
    case '🧱': // Components
      return (
        <svg {...strokeProps}>
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polygon points="2 17 12 22 22 17" />
          <polygon points="2 12 12 17 22 12" />
        </svg>
      )
    case '🧠': // Agentic AI / Long Memory
    case '💭': // Short Memory
      return (
        <svg {...strokeProps}>
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2z" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z" />
        </svg>
      )
    case '🎨': // Generative AI
      return (
        <svg {...strokeProps}>
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.32115 19.4626 5.34007 20.2114 4.93856 20.6763C4.4283 21.2671 4.79632 22 5.57861 22H12Z" />
          <circle cx="7.5" cy="10.5" r="1.5" />
          <circle cx="11.5" cy="7.5" r="1.5" />
          <circle cx="16.5" cy="9.5" r="1.5" />
          <circle cx="15.5" cy="14.5" r="1.5" />
        </svg>
      )
    case '🔗': // State Link / Blockchain / Wallet links
      return (
        <svg {...strokeProps}>
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      )

    // Nodes
    case '🖋️': // Wireframing
    case '✍️': // Prompt Eng / Contract Code
      return (
        <svg {...strokeProps}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      )
    case '🖼️': // Reference
      return (
        <svg {...strokeProps}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      )
    case '📐': // UI Design / Vector Store
      return (
        <svg {...strokeProps}>
          <path d="M22 16V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2z" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-8" />
          <path d="M18 22H6a2 2 0 0 1-2-2" />
        </svg>
      )
    case '🔍': // Research
      return (
        <svg {...strokeProps}>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      )
    case '📦': // Assets / Vector DB
      return (
        <svg {...strokeProps}>
          <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
          <polygon points="12 22.08 12 12 3 6.92 3 17.16 12 22.08" />
          <polygon points="12 22.08 21 17.16 21 6.92 12 12 12 22.08" />
          <polygon points="12 12 21 6.92 12 2 3 6.92 12 12" />
        </svg>
      )
    case '▶️': // Prototype
      return (
        <svg {...strokeProps}>
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      )
    case '🔄': // State / CI/CD / Agent Loop
      return (
        <svg {...strokeProps}>
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </svg>
      )
    case '🔀': // Routing / LLM Routing
      return (
        <svg {...strokeProps}>
          <polyline points="16 3 21 3 21 8" />
          <line x1="4" y1="20" x2="21" y2="3" />
          <polyline points="21 16 21 21 16 21" />
          <line x1="15" y1="15" x2="21" y2="21" />
          <line x1="4" y1="4" x2="9" y2="9" />
        </svg>
      )
    case '🌐': // API Layer / Testnet Deploy / API Wrapper
      return (
        <svg {...strokeProps}>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    case '👁️': // Accessibility
    case '👀': // Event Watcher
      return (
        <svg {...strokeProps}>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    case '🧪': // Testing / Eval Suite / Local Mocking
      return (
        <svg {...strokeProps}>
          <path d="M2 22h20" />
          <path d="M7 2h10" />
          <path d="M9 2v5.1a6 6 0 0 0 1.25 3.65l5.5 7.1a2 2 0 0 1-1.6 3.15H9.85a2 2 0 0 1-1.6-3.15l5.5-7.1A6 6 0 0 0 15 7.1V2" />
        </svg>
      )
    case '🚀': // Ship / Deploy / Launch / API Host / Mainnet Deploy
      return (
        <svg {...strokeProps}>
          <path d="M4.5 16.5c-1.5 1.26-2 3.1-2 4.14a.5.5 0 0 0 .8.41c1.04-.5 2.88-1 4.14-2.5a.5.5 0 0 0-.25-.8c-.7-.16-1.5-.4-2.19-.75a.5.5 0 0 0-.5.5z" />
          <path d="M21 3s-3.5 1.5-6 4.5a20.48 20.48 0 0 0-4.5 7h4.5a.5.5 0 0 1 .5.5v2.5a.5.5 0 0 1-.5.5h-2.5a.5.5 0 0 1-.5-.5v-4.5a20.48 20.48 0 0 0-7 4.5c-3 2.5-4.5 6-4.5 6s3.5-1.5 6-4.5a20.48 20.48 0 0 0 4.5-7h-4.5a.5.5 0 0 1-.5-.5v-2.5a.5.5 0 0 1 .5-.5h2.5a.5.5 0 0 1 .5.5v4.5a20.48 20.48 0 0 0 7-4.5C19.5 6.5 21 3 21 3z" />
        </svg>
      )
    case '🗄️': // DB Schema
      return (
        <svg {...strokeProps}>
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      )
    case '🔐': // Auth Security
      return (
        <svg {...strokeProps}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )
    case '🔌': // API Design / DApp Web3 Sync
      return (
        <svg {...strokeProps}>
          <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
          <line x1="12" y1="2" x2="12" y2="12" />
        </svg>
      )
    case '🛡️': // Validation
      return (
        <svg {...strokeProps}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    case '🌉': // Middleware
      return (
        <svg {...strokeProps}>
          <path d="M3 10H21" />
          <path d="M6 6L21 21" />
          <path d="M3 21h18" />
        </svg>
      )
    case '⚡': // Caching
      return (
        <svg {...strokeProps}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      )
    case '🛠️': // Async Workers / Tool Schema
      return (
        <svg {...strokeProps}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      )
    case '📬': // Message Queue
      return (
        <svg {...strokeProps}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      )
    case '📝': // Error Logging
      return (
        <svg {...strokeProps}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      )
    case '🚦': // Rate Limiting
      return (
        <svg {...strokeProps}>
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <circle cx="12" cy="7" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="17" r="2" />
        </svg>
      )
    case '✅': // Unit Tests
      return (
        <svg {...strokeProps}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )
    case '🐳': // Containerize
      return (
        <svg {...strokeProps}>
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      )
    case '🗺️': // Architecture
      return (
        <svg {...strokeProps}>
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
          <line x1="8" y1="2" x2="8" y2="18" />
          <line x1="16" y1="6" x2="16" y2="22" />
        </svg>
      )
    case '🛣️': // API Routes
      return (
        <svg {...strokeProps}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18" />
          <path d="M15 3v18" />
          <path d="M12 3v18" strokeDasharray="2 2" />
        </svg>
      )
    case '💎': // Prisma Setup
      return (
        <svg {...strokeProps}>
          <polygon points="6 2 18 2 22 8 12 22 2 8 6 2" />
        </svg>
      )
    case '🔑': // Auth Setup
      return (
        <svg {...strokeProps}>
          <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
        </svg>
      )
    case '🏷️': // Shared Types
      return (
        <svg {...strokeProps}>
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
      )
    case '🏗️': // UI Scaffold
      return (
        <svg {...strokeProps}>
          <rect x="2" y="2" width="20" height="20" rx="2" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="12" y1="2" x2="12" y2="22" />
        </svg>
      )
    case '💾': // CRUD Actions
      return (
        <svg {...strokeProps}>
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          <polyline points="17 21 17 13 7 13 7 21" />
          <polyline points="7 3 7 8 15 8" />
        </svg>
      )
    case '📥': // Form Handling
      return (
        <svg {...strokeProps}>
          <polyline points="15 10 12 13 9 10" />
          <line x1="12" y1="2" x2="12" y2="13" />
          <path d="M20 4v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4" />
        </svg>
      )
    case '☁️': // File Storage
      return (
        <svg {...strokeProps}>
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      )
    case '✨': // Optimistic UI
      return (
        <svg {...strokeProps}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    case '💬': // System Prompt
      return (
        <svg {...strokeProps}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      )
    case '💳': // Cost Tracker
      return (
        <svg {...strokeProps}>
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      )
    case '📊': // Output Parser / Benchmark
      return (
        <svg {...strokeProps}>
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    case '🚧': // Guardrails
      return (
        <svg {...strokeProps}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      )
    case '⏱️': // Latency Opt
      return (
        <svg {...strokeProps}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    case '🤖': // Model Selection
      return (
        <svg {...strokeProps}>
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M12 2v2" />
          <path d="M5 11V9a7 7 0 0 1 14 0v2" />
          <circle cx="9" cy="16" r="1" />
          <circle cx="15" cy="16" r="1" />
        </svg>
      )
    case '🔢': // Embeddings
      return (
        <svg {...strokeProps}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
          <line x1="9" y1="3" x2="9" y2="21" />
          <line x1="15" y1="3" x2="15" y2="21" />
        </svg>
      )
    case '✂️': // Chunking Config
      return (
        <svg {...strokeProps}>
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="9.8" y1="8.2" x2="20" y2="17" />
          <line x1="20" y1="7" x2="9.8" y2="15.8" />
        </svg>
      )
    case '📖': // Retrieval RAG
      return (
        <svg {...strokeProps}>
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      )
    case '➕': // Context Aug
      return (
        <svg {...strokeProps}>
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      )
    case '🎭': // Synthesize
      return (
        <svg {...strokeProps}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeDasharray="1 1" />
        </svg>
      )
    case '⚖️': // RLHF Alignment / DAO Escrow
      return (
        <svg {...strokeProps}>
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="5" y1="7" x2="19" y2="7" />
          <path d="M5 7c0 4 3 7 7 7s7-3 7-7" />
        </svg>
      )
    case '🌊': // Streaming Resp
      return (
        <svg {...strokeProps}>
          <path d="M2 12a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5 5 5 0 0 1-5 5H7a5 5 0 0 1-5-5z" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      )
    case '📄': // Protocol Spec
      return (
        <svg {...strokeProps}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      )
    case '⛽': // Gas Analysis
      return (
        <svg {...strokeProps}>
          <path d="M3 22V2h10l4 4v16" />
          <line x1="8" y1="12" x2="12" y2="12" />
        </svg>
      )
    case '🕵️': // Auditing
      return (
        <svg {...strokeProps}>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <path d="M11 7v8" />
        </svg>
      )
    default:
      return (
        <svg {...strokeProps}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
  }
}

export default function HowIWork() {
  const disciplines: DisciplineData[] = disciplinesData as DisciplineData[]

  const [activeDisc, setActiveDisc] = useState<DisciplineData>(disciplines[0])
  const [use3Col, setUse3Col] = useState(false)

  useEffect(() => {
    const check = () => setUse3Col(window.innerWidth <= 480)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // 4-col serpentine: rows 1-3
  const gridPositions4Col = [
    { r: 1, c: 1 }, { r: 1, c: 2 }, { r: 1, c: 3 }, { r: 1, c: 4 },
    { r: 2, c: 4 }, { r: 2, c: 3 }, { r: 2, c: 2 }, { r: 2, c: 1 },
    { r: 3, c: 1 }, { r: 3, c: 2 }, { r: 3, c: 3 }, { r: 3, c: 4 },
  ]
  // 3-col serpentine: rows 1-4
  const gridPositions3Col = [
    { r: 1, c: 1 }, { r: 1, c: 2 }, { r: 1, c: 3 },
    { r: 2, c: 3 }, { r: 2, c: 2 }, { r: 2, c: 1 },
    { r: 3, c: 1 }, { r: 3, c: 2 }, { r: 3, c: 3 },
    { r: 4, c: 3 }, { r: 4, c: 2 }, { r: 4, c: 1 },
  ]

  const gridPositions = use3Col ? gridPositions3Col : gridPositions4Col

  return (
    <section id="how-i-work" className="hiw-section">
      {/* Header Block */}
      <div className="hiw-header">
        <div className="hiw-left-header">
          <div className="hiw-label-container">
            <span className="hiw-label-line" />
            <span className="hiw-label-text">How I Work</span>
          </div>
          <h2 className="hiw-heading">
            Pick a discipline, trace the pipeline.
          </h2>
        </div>
        <div className="hiw-right-header">
          <span>SIX PRACTICES I WORK ACROSS — EACH ONE A NODE GRAPH FROM BRIEF TO SHIP.</span>
        </div>
      </div>

      {/* Main Board Container */}
      <div className="hiw-board">
        {/* Sidebar */}
        <div className="hiw-sidebar">
          <span className="sidebar-group-title">Discipline</span>
          <div className="discipline-buttons">
            {disciplines.map(d => (
              <button
                key={d.id}
                onClick={() => setActiveDisc(d)}
                className={`disc-btn ${activeDisc.id === d.id ? 'active-disc-btn' : ''}`}
              >
                <span className="disc-icon">{getIconSvg(d.icon)}</span>
                <span className="disc-name">{d.name}</span>
              </button>
            ))}
          </div>

          <span className="sidebar-group-title" style={{ marginTop: '2rem' }}>Tech Stack</span>
          <div className="tech-stack-grid">
            {activeDisc.tech.map(t => (
              <div key={t} className="tech-stack-badge">
                <span className="tech-badge-name">{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Node Graph Panel */}
        <div className="hiw-graph-panel">
          <div className="graph-header">
            <span className="graph-path">~/pipeline · {activeDisc.name.toUpperCase()}</span>
            <span className="graph-nodes-count">{activeDisc.nodes.length} Nodes</span>
          </div>

          <div className="nodes-scroller">
            <div className="nodes-grid-container">
              {/* Desktop connection lines (4-col, 3-row serpentine) */}
              <svg className="connections-svg" viewBox="0 0 800 450" preserveAspectRatio="none">
                <line x1="100" y1="75" x2="700" y2="75" />
                <path d="M 700 75 C 770 75, 770 225, 700 225" fill="none" />
                <line x1="700" y1="225" x2="100" y2="225" />
                <path d="M 100 225 C 30 225, 30 375, 100 375" fill="none" />
                <line x1="100" y1="375" x2="700" y2="375" />
              </svg>

              {/* Mobile connection lines (3-col, 4-row serpentine) */}
              <svg className="connections-svg-mobile" viewBox="0 0 800 700" preserveAspectRatio="none">
                <line x1="133" y1="87" x2="667" y2="87" />
                <path d="M 667 87 C 730 87, 730 262, 667 262" fill="none" />
                <line x1="667" y1="262" x2="133" y2="262" />
                <path d="M 133 262 C 70 262, 70 437, 133 437" fill="none" />
                <line x1="133" y1="437" x2="667" y2="437" />
                <path d="M 667 437 C 730 437, 730 612, 667 612" fill="none" />
                <line x1="667" y1="612" x2="133" y2="612" />
              </svg>

              {/* The Node Graph grid layout */}
              <div className="nodes-grid">
                {activeDisc.nodes.map((node, index) => {
                  const pos = gridPositions[index] || { r: 3, c: 4 }
                  return (
                    <div
                      key={node.num}
                      className="node-cell-wrapper"
                      style={{
                        gridRow: pos.r,
                        gridColumn: pos.c,
                      }}
                    >
                      <span className="node-number">{node.num}</span>
                      <div className="node-box">
                        <span className="node-icon">{getIconSvg(node.icon)}</span>
                      </div>
                      <span className="node-title">{node.title}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style>{`
        .hiw-section {
          padding: clamp(4rem, 10vw, 8rem) 24px;
          border-top: 1px solid var(--border);
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }



        .hiw-header {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 3rem;
          align-items: start;
          margin-bottom: 3.5rem;
        }

        .hiw-label-container {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1.5rem;
        }

        .hiw-label-line {
          width: 24px;
          height: 1px;
          background: #ff5f38;
        }

        .hiw-label-text {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #ff5f38;
          font-weight: 700;
        }

        .hiw-heading {
          font-size: clamp(2rem, 4.5vw, 3.5rem);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: var(--text);
          line-height: 1.1;
          margin: 0;
        }

        .hiw-right-header {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          line-height: 1.8;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          padding-top: 2.8rem;
        }

        /* The Dashboard board container */
        .hiw-board {
          display: grid;
          grid-template-columns: 280px 1fr;
          border: 1px solid var(--border);
          border-radius: 24px;
          background: var(--surface);
          overflow: hidden;
        }

        /* Sidebar panel */
        .hiw-sidebar {
          padding: 2rem;
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          background: #0d0d0d;
        }

        .sidebar-group-title {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
          display: block;
        }

        .discipline-buttons {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 100%;
        }

        .disc-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          background: transparent;
          border: 1px solid transparent;
          cursor: pointer;
          color: var(--text-secondary);
          transition: all 200ms ease;
          text-align: left;
        }

        .disc-btn:hover {
          background: var(--surface-2);
          color: var(--text);
        }

        .active-disc-btn {
          background: var(--surface-2);
          border-color: rgba(224, 122, 95, 0.3); /* Terracotta tint */
          color: var(--text);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .disc-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
        }

        .active-disc-btn .disc-icon {
          color: #e07a5f;
        }

        .disc-name {
          font-size: 13px;
          font-weight: 500;
        }

        .tech-stack-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          width: 100%;
        }

        .tech-stack-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 6px;
          border-radius: 8px;
          background: var(--surface-2);
          border: 1px solid var(--border);
        }

        .tech-badge-name {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          color: var(--text-secondary);
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        /* Node Graph Panel */
        .hiw-graph-panel {
          display: flex;
          flex-direction: column;
          background: #080808;
          position: relative;
        }

        .graph-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid var(--border);
          background: #0d0d0d;
        }

        .graph-path {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        }

        .graph-nodes-count {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          color: #e07a5f;
          font-weight: 500;
        }

        .nodes-scroller {
          flex: 1;
          padding: 3rem 2rem;
          overflow-x: auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nodes-grid-container {
          position: relative;
          width: 100%;
          max-width: 800px;
          min-width: 650px;
          aspect-ratio: 1.77; /* maintain alignment with SVG connections */
        }

        /* Background Connections SVG */
        .connections-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .connections-svg line,
        .connections-svg path {
          stroke: var(--border);
          stroke-width: 1.5px;
          stroke-dasharray: 4 4;
        }

        .connections-svg-mobile {
          display: none;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .connections-svg-mobile line,
        .connections-svg-mobile path {
          stroke: var(--border);
          stroke-width: 1.5px;
          stroke-dasharray: 4 4;
        }

        /* The nodes positioning grid */
        .nodes-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(3, 1fr);
          z-index: 2;
        }

        .node-cell-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 100%;
          height: 100%;
        }

        .node-number {
          position: absolute;
          top: clamp(4px, 1.5vh, 12px);
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          color: var(--text-muted);
          background: #080808;
          padding: 0 4px;
          border-radius: 50%;
        }

        .node-box {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: var(--surface-2);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 250ms ease;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          z-index: 5;
        }

        .node-cell-wrapper:hover .node-box {
          border-color: #e07a5f;
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(224, 122, 95, 0.2);
        }

        .node-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
        }

        .node-cell-wrapper:hover .node-icon {
          color: var(--text);
        }

        .node-title {
          position: absolute;
          bottom: clamp(4px, 1.5vh, 12px);
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
          text-align: center;
          background: #080808;
          padding: 0 4px;
          white-space: nowrap;
        }


        @media (max-width: 1024px) {
          .hiw-board {
            grid-template-columns: 1fr;
          }

          .hiw-sidebar {
            border-right: none;
            border-bottom: 1px solid var(--border);
            width: 100%;
            padding: 1.5rem;
          }

          .discipline-buttons {
            flex-direction: row;
            overflow-x: auto;
            width: 100%;
            padding-bottom: 8px;
            scrollbar-width: none;
          }

          .discipline-buttons::-webkit-scrollbar {
            display: none;
          }

          .disc-btn {
            flex-shrink: 0;
            width: auto;
            white-space: nowrap;
          }

          .tech-stack-grid {
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          }

          .nodes-grid-container {
            min-width: auto;
          }
        }

        @media (max-width: 768px) {
          .hiw-header {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            margin-bottom: 2rem;
          }

          .hiw-right-header {
            padding-top: 0;
          }

          .hiw-sidebar {
            padding: 1rem;
          }

          .discipline-buttons {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
            overflow: visible;
          }

          .disc-btn {
            width: 100%;
            flex-shrink: 1;
            white-space: nowrap;
            justify-content: center;
            padding: 10px 12px;
          }

          .tech-stack-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .nodes-scroller {
            padding: 2rem 1rem;
            justify-content: flex-start;
          }

          .node-box {
            width: 36px;
            height: 36px;
            border-radius: 8px;
          }

          .node-icon svg {
            width: 14px;
            height: 14px;
          }

          .node-title {
            font-size: 7px;
            bottom: -6px;
          }
        }

        @media (max-width: 480px) {
          .hiw-section {
            padding: 3rem 16px;
          }

          .hiw-sidebar {
            padding: 0.75rem;
          }

          .discipline-buttons {
            grid-template-columns: repeat(3, 1fr);
            gap: 4px;
          }

          .disc-btn {
            padding: 8px 8px;
            gap: 6px;
            border-radius: 8px;
          }

          .disc-name {
            font-size: 11px;
          }

          .disc-icon svg {
            width: 14px;
            height: 14px;
          }

          .tech-stack-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 4px;
          }

          .tech-stack-badge {
            padding: 4px 4px;
          }

          .tech-badge-name {
            font-size: 8px;
          }

          .nodes-grid-container {
            min-width: auto;
            aspect-ratio: 0.7;
          }

          .nodes-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(4, 1fr);
          }

          .nodes-scroller {
            padding: 2rem 0.5rem;
            justify-content: center;
          }

          .connections-svg {
            display: none;
          }

          .connections-svg-mobile {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
          }

          .connections-svg-mobile line,
          .connections-svg-mobile path {
            stroke: rgba(255, 255, 255, 0.15);
            stroke-width: 2px;
            stroke-dasharray: 6 6;
          }

          .node-box {
            width: 36px;
            height: 36px;
            border-radius: 8px;
          }

          .node-icon svg {
            width: 14px;
            height: 14px;
          }

          .node-number {
            font-size: 7px;
            top: -2px;
          }

          .node-title {
            font-size: 6px;
            bottom: -6px;
            white-space: nowrap;
          }
        }
      `}</style>
    </section>
  )
}
