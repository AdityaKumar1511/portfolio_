'use client'
import { useState } from 'react'

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
  tagline: string
}

export default function HowIWork() {
  const disciplines: DisciplineData[] = [
    {
      id: 'frontend',
      name: 'Frontend',
      icon: '🖥️',
      tagline: 'Interfaces that feel inevitable.',
      tech: ['React', 'TypeScript', 'Tailwind', 'Next.js', 'Notion', 'Figma'],
      nodes: [
        { num: 1, title: 'Wireframing', icon: '🖋️' },
        { num: 2, title: 'Reference', icon: '🖼️' },
        { num: 3, title: 'UI Design', icon: '📐' },
        { num: 4, title: 'Research', icon: '🔍' },
        { num: 5, title: 'Assets', icon: '📦' },
        { num: 6, title: 'Prototype', icon: '▶️' },
        { num: 7, title: 'Components', icon: '🧱' },
        { num: 8, title: 'State', icon: '🔄' },
        { num: 9, title: 'Routing', icon: '🔀' },
        { num: 10, title: 'API Layer', icon: '🌐' },
        { num: 11, title: 'Accessibility', icon: '👁️' },
        { num: 12, title: 'Testing', icon: '🧪' },
        { num: 13, title: 'Ship', icon: '🚀' },
      ],
    },
    {
      id: 'backend',
      name: 'Backend',
      icon: '⚙️',
      tagline: 'High performance data pipes.',
      tech: ['Node.js', 'Go', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
      nodes: [
        { num: 1, title: 'DB Schema', icon: '🗄️' },
        { num: 2, title: 'Auth Security', icon: '🔐' },
        { num: 3, title: 'API Design', icon: '🔌' },
        { num: 4, title: 'Validation', icon: '🛡️' },
        { num: 5, title: 'Middleware', icon: '🌉' },
        { num: 6, title: 'Caching', icon: '⚡' },
        { num: 7, title: 'Async Workers', icon: '🛠️' },
        { num: 8, title: 'Message Queue', icon: '📬' },
        { num: 9, title: 'Error Logging', icon: '📝' },
        { num: 10, title: 'Rate Limiting', icon: '🚦' },
        { num: 11, title: 'Unit Tests', icon: '✅' },
        { num: 12, title: 'Containerize', icon: '🐳' },
        { num: 13, title: 'Deploy', icon: '🚀' },
      ],
    },
    {
      id: 'fullstack',
      name: 'Full Stack',
      icon: '🥞',
      tagline: 'End-to-end software architect.',
      tech: ['Next.js', 'PostgreSQL', 'Prisma', 'Supabase', 'Vercel', 'Git'],
      nodes: [
        { num: 1, title: 'Architecture', icon: '🗺️' },
        { num: 2, title: 'API Routes', icon: '🛣️' },
        { num: 3, title: 'Prisma Setup', icon: '💎' },
        { num: 4, title: 'Auth Setup', icon: '🔑' },
        { num: 5, title: 'Shared Types', icon: '🏷️' },
        { num: 6, title: 'UI Scaffold', icon: '🏗️' },
        { num: 7, title: 'State Link', icon: '🔗' },
        { num: 8, title: 'CRUD Actions', icon: '💾' },
        { num: 9, title: 'Form Handling', icon: '📥' },
        { num: 10, title: 'File Storage', icon: '☁️' },
        { num: 11, title: 'Optimistic UI', icon: '✨' },
        { num: 12, title: 'CI/CD Pipelines', icon: '🔄' },
        { num: 13, title: 'Launch', icon: '🚀' },
      ],
    },
    {
      id: 'agentic_ai',
      name: 'Agentic AI',
      icon: '🧠',
      tagline: 'Autonomous AI architectures.',
      tech: ['Python', 'OpenAI', 'LangChain', 'Pinecone', 'FastAPI', 'Docker'],
      nodes: [
        { num: 1, title: 'System Prompt', icon: '💬' },
        { num: 2, title: 'Tool Schema', icon: '🛠️' },
        { num: 3, title: 'Agent Loop', icon: '🔄' },
        { num: 4, title: 'Vector Store', icon: '📐' },
        { num: 5, title: 'Short Memory', icon: '💭' },
        { num: 6, title: 'Long Memory', icon: '🧠' },
        { num: 7, title: 'Cost Tracker', icon: '💳' },
        { num: 8, title: 'Output Parser', icon: '📊' },
        { num: 9, title: 'Guardrails', icon: '🚧' },
        { num: 10, title: 'LLM Routing', icon: '🔀' },
        { num: 11, title: 'Eval Suite', icon: '🧪' },
        { num: 12, title: 'Latency Opt', icon: '⏱️' },
        { num: 13, title: 'API Host', icon: '🚀' },
      ],
    },
    {
      id: 'generative_ai',
      name: 'Generative AI',
      icon: '🎨',
      tagline: 'Model synthesis & pipelines.',
      tech: ['Python', 'PyTorch', 'HuggingFace', 'Pinecone', 'Streamlit'],
      nodes: [
        { num: 1, title: 'Model Selection', icon: '🤖' },
        { num: 2, title: 'Prompt Eng', icon: '✍️' },
        { num: 3, title: 'Embeddings', icon: '🔢' },
        { num: 4, title: 'Vector DB', icon: '📦' },
        { num: 5, title: 'Chunking Config', icon: '✂️' },
        { num: 6, title: 'Retrieval RAG', icon: '📖' },
        { num: 7, title: 'Context Aug', icon: '➕' },
        { num: 8, title: 'Synthesize', icon: '🎭' },
        { num: 9, title: 'RLHF Alignment', icon: '⚖️' },
        { num: 10, title: 'API Wrapper', icon: '🌐' },
        { num: 11, title: 'Streaming Resp', icon: '🌊' },
        { num: 12, title: 'Benchmark', icon: '📊' },
        { num: 13, title: 'Ship', icon: '🚀' },
      ],
    },
    {
      id: 'blockchain',
      name: 'Blockchain',
      icon: '🔗',
      tagline: 'Trustless decentralized protocols.',
      tech: ['Solidity', 'Hardhat', 'Wagmi', 'Ethers', 'Chainlink'],
      nodes: [
        { num: 1, title: 'Protocol Spec', icon: '📄' },
        { num: 2, title: 'Contract Code', icon: '✍️' },
        { num: 3, title: 'Local Mocking', icon: '🧪' },
        { num: 4, title: 'Unit Tests', icon: '✅' },
        { num: 5, title: 'Gas Analysis', icon: '⛽' },
        { num: 6, title: 'Auditing', icon: '🕵️' },
        { num: 7, title: 'Testnet Deploy', icon: '🌐' },
        { num: 8, title: 'DApp Web3 Sync', icon: '🔌' },
        { num: 9, title: 'Wallet Links', icon: '💳' },
        { num: 10, title: 'Event Watcher', icon: '👀' },
        { num: 11, title: 'Optimistic UI', icon: '✨' },
        { num: 12, title: 'Mainnet Deploy', icon: '🚀' },
        { num: 13, title: 'DAO Escrow', icon: '⚖️' },
      ],
    },
  ]

  const [activeDisc, setActiveDisc] = useState<DisciplineData>(disciplines[0])

  // Mapping grid positions for the 13-node serpentine path
  const gridPositions = [
    { r: 1, c: 1 }, { r: 1, c: 2 }, { r: 1, c: 3 }, { r: 1, c: 4 }, // Row 1: Left to Right (1,2,3,4)
    { r: 2, c: 4 }, { r: 2, c: 3 }, { r: 2, c: 2 }, { r: 2, c: 1 }, // Row 2: Right to Left (5,6,7,8)
    { r: 3, c: 1 }, { r: 3, c: 2 }, { r: 3, c: 3 }, { r: 3, c: 4 }, // Row 3: Left to Right (9,10,11,12)
    { r: 4, c: 4 }, // Row 4: Far Right (13)
  ]

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
                <span className="disc-icon">{d.icon}</span>
                <span className="disc-name">{d.name}</span>
              </button>
            ))}
          </div>

          <p className="disc-tagline">{activeDisc.tagline}</p>

          <span className="sidebar-group-title" style={{ marginTop: '2.5rem' }}>Tech Stack</span>
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
              {/* Connection lines layer (pure SVG rendered beneath nodes) */}
              <svg className="connections-svg">
                {/* Row 1 horizontal */}
                <line x1="12.5%" y1="12.5%" x2="87.5%" y2="12.5%" />
                {/* Row 1 to Row 2 turn */}
                <path d="M 87.5% 12.5% C 96% 12.5%, 96% 37.5%, 87.5% 37.5%" fill="none" />
                {/* Row 2 horizontal */}
                <line x1="87.5%" y1="37.5%" x2="12.5%" y2="37.5%" />
                {/* Row 2 to Row 3 turn */}
                <path d="M 12.5% 37.5% C 4% 37.5%, 4% 62.5%, 12.5% 62.5%" fill="none" />
                {/* Row 3 horizontal */}
                <line x1="12.5%" y1="62.5%" x2="87.5%" y2="62.5%" />
                {/* Row 3 to Row 4 turn */}
                <path d="M 87.5% 62.5% C 96% 62.5%, 96% 87.5%, 87.5% 87.5%" fill="none" />
              </svg>

              {/* The Node Graph grid layout */}
              <div className="nodes-grid">
                {activeDisc.nodes.map((node, index) => {
                  const pos = gridPositions[index] || { r: 4, c: 4 }
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
                        <span className="node-icon">{node.icon}</span>
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
          background: var(--text-muted);
        }

        .hiw-label-text {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
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
          font-size: 16px;
        }

        .disc-name {
          font-size: 13px;
          font-weight: 500;
        }

        .disc-tagline {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 1rem;
          margin-bottom: 0;
          font-style: italic;
          padding-left: 4px;
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
          aspect-ratio: 1.5; /* Lock aspect ratio to maintain alignment with SVG connections */
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
          stroke-dasharray: 4 4; /* Dotted line styling */
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
          grid-template-rows: repeat(4, 1fr);
          z-index: 2;
        }

        .node-cell-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .node-number {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          color: var(--text-muted);
          margin-bottom: 6px;
          background: #080808;
          padding: 0 4px;
          border-radius: 50%;
        }

        .node-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--surface-2);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 250ms ease;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }

        .node-cell-wrapper:hover .node-box {
          border-color: #e07a5f;
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(224, 122, 95, 0.2);
        }

        .node-icon {
          font-size: 18px;
        }

        .node-title {
          font-family: var(--font-geist-mono), monospace;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
          margin-top: 8px;
          text-align: center;
          background: #080808;
          padding: 0 4px;
        }

        @media (max-width: 1024px) {
          .hiw-board {
            grid-template-columns: 1fr;
          }

          .hiw-sidebar {
            border-right: none;
            border-bottom: 1px solid var(--border);
            width: 100%;
          }

          .tech-stack-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </section>
  )
}
