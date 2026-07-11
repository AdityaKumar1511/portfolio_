"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Discipline =
  | "Frontend"
  | "Backend"
  | "Full Stack"
  | "AI/ML"
  | "Blockchain";

interface PipelineStep {
  name: string;
  sub: string;
}

const pipelines: Record<Discipline, PipelineStep[]> = {
  Frontend: [
    { name: "Wireframing", sub: "Layout" },
    { name: "Reference", sub: "Inspiration" },
    { name: "UI Design", sub: "Figma" },
    { name: "Research", sub: "UX Patterns" },
    { name: "Assets", sub: "Media" },
    { name: "Prototyping", sub: "Interactive" },
    { name: "Components", sub: "React" },
    { name: "State", sub: "Management" },
    { name: "Routing", sub: "Navigation" },
    { name: "API Layer", sub: "Integration" },
    { name: "Accessibility", sub: "A11y" },
    { name: "Testing", sub: "E2E" },
    { name: "Ship", sub: "Deploy" },
  ],
  Backend: [
    { name: "Architecture", sub: "Design" },
    { name: "Schema", sub: "Database" },
    { name: "APIs", sub: "REST/GraphQL" },
    { name: "Auth", sub: "Security" },
    { name: "Caching", sub: "Redis" },
    { name: "Queue", sub: "Jobs" },
    { name: "Observability", sub: "Logging" },
    { name: "Testing", sub: "Unit/Int" },
    { name: "Docs", sub: "OpenAPI" },
    { name: "Deploy", sub: "CI/CD" },
  ],
  "Full Stack": [
    { name: "Brief", sub: "Requirements" },
    { name: "Design", sub: "UI/UX" },
    { name: "Frontend", sub: "Client" },
    { name: "Backend", sub: "Server" },
    { name: "Integration", sub: "API" },
    { name: "Auth", sub: "Security" },
    { name: "Testing", sub: "Full" },
    { name: "Ship", sub: "Deploy" },
  ],
  "AI/ML": [
    { name: "Data", sub: "Collection" },
    { name: "EDA", sub: "Analysis" },
    { name: "Feature Eng", sub: "Transform" },
    { name: "Model", sub: "Training" },
    { name: "Eval", sub: "Metrics" },
    { name: "API", sub: "Serving" },
    { name: "Frontend", sub: "Dashboard" },
    { name: "Monitor", sub: "MLOps" },
  ],
  Blockchain: [
    { name: "Spec", sub: "Whitepaper" },
    { name: "Contract", sub: "Solidity" },
    { name: "Testing", sub: "Hardhat" },
    { name: "Audit", sub: "Security" },
    { name: "Frontend", sub: "dApp" },
    { name: "Deploy", sub: "Mainnet" },
    { name: "Monitor", sub: "On-chain" },
  ],
};

const disciplines: Discipline[] = [
  "Frontend",
  "Backend",
  "Full Stack",
  "AI/ML",
  "Blockchain",
];

export default function Pipeline() {
  const [active, setActive] = useState<Discipline>("Frontend");
  const steps = pipelines[active];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-[var(--border)]">
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-4">
        How I work
      </p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-[clamp(1.75rem,4vw,2.5rem)] font-medium tracking-tight mb-12"
      >
        Pick a discipline, trace the pipeline.
      </motion.h2>

      {/* Discipline tabs */}
      <div className="flex flex-wrap gap-x-1 gap-y-2 mb-4">
        {disciplines.map((d, i) => (
          <span key={d} className="flex items-center">
            <button
              onClick={() => setActive(d)}
              className={`font-mono text-[12px] pb-0.5 transition-colors duration-200 cursor-pointer ${
                active === d
                  ? "text-[var(--text)] border-b border-[var(--text)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }`}
            >
              {d}
            </button>
            {i < disciplines.length - 1 && (
              <span className="text-[var(--text-muted)] mx-2 font-mono text-[12px]">
                ·
              </span>
            )}
          </span>
        ))}
      </div>

      {/* Path label */}
      <p className="font-mono text-[11px] text-[var(--text-muted)] mb-8">
        ~/pipeline · {active.toLowerCase()} · {steps.length} nodes
      </p>

      {/* Pipeline grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 border border-[var(--border)]"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: i * 0.04,
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="p-4 border-r border-b border-[var(--border)]"
            >
              <span className="font-mono text-[11px] text-[var(--text-muted)] block mb-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[13px] font-medium text-[var(--text)] block">
                {step.name}
              </span>
              <span className="font-mono text-[10px] text-[var(--text-muted)] mt-0.5 block">
                {step.sub}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
