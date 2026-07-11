"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTerminal } from "@/hooks/useTerminal";
import { executeCommand } from "./terminalCommands";

interface HistoryItem {
  command: string;
  output: string | string[];
}

export default function TerminalModal() {
  const { isOpen, closeTerminal } = useTerminal();
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "init",
      output: [
        "Welcome to Aditya Kumar's Portfolio Terminal CLI v1.0.0",
        "Type 'help' to see list of available commands or explore folders.",
        "",
      ],
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Close modal when pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeTerminal();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeTerminal]);

  // Scroll terminal output to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  // Focus the command input whenever the terminal opens or the body is clicked
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputValue.trim();
    if (!value) return;

    const result = executeCommand(
      value,
      () => setHistory([]),
      closeTerminal
    );

    // If exit or clear was typed, executeCommand actions take care of it,
    // otherwise we add it to output log history
    const commandLower = value.split(/\s+/)[0].toLowerCase();
    if (commandLower !== "clear" && commandLower !== "exit") {
      setHistory((prev) => [...prev, { command: value, output: result.output }]);
      if (result.action) {
        result.action();
      }
    } else if (commandLower === "clear") {
      setHistory([]);
    } else if (commandLower === "exit") {
      closeTerminal();
    }

    setInputValue("");
  };

  const handleWindowClick = () => {
    inputRef.current?.focus();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop Cover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeTerminal}
            className="absolute inset-0 bg-black/85 backdrop-blur-xs cursor-pointer"
          />

          {/* Centered Terminal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleWindowClick}
            className="relative z-10 w-[90vw] max-w-[680px] h-[70vh] max-h-[420px] rounded-xl border border-border bg-[#0D0D0D] shadow-2xl flex flex-col overflow-hidden text-text-secondary"
          >
            {/* Header Title Bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-[#161616]">
              {/* Three macOS dots */}
              <div className="flex items-center gap-1.5 flex-1">
                <button
                  onClick={closeTerminal}
                  className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-75 transition-all cursor-pointer"
                  aria-label="Close terminal"
                />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>

              {/* Title */}
              <span className="font-mono text-xs text-text-muted flex-1 text-center whitespace-nowrap">
                portfolio — zsh
              </span>

              {/* Spacer/Close Button */}
              <div className="flex-1 flex justify-end">
                <button
                  onClick={closeTerminal}
                  className="font-mono text-xs text-text-muted hover:text-text-primary px-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Terminal Screen Body */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 font-mono text-xs sm:text-sm leading-relaxed"
            >
              {/* Output History Map */}
              {history.map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  {/* Prompt Line (skip for system init messages) */}
                  {item.command !== "init" && (
                    <div className="flex items-center gap-2 text-accent font-semibold">
                      <span>[ ~ ] &gt;</span>
                      <span className="text-text-primary font-normal">{item.command}</span>
                    </div>
                  )}

                  {/* Response output blocks */}
                  <div className="text-text-secondary whitespace-pre-wrap pl-2 border-l border-border/50">
                    {Array.isArray(item.output) ? (
                      item.output.map((line, lIdx) => <div key={lIdx}>{line}</div>)
                    ) : (
                      <div>{item.output}</div>
                    )}
                  </div>
                </div>
              ))}

              {/* Live Input Prompt Line */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
                <span className="text-accent font-bold flex-shrink-0">[ ~ ] &gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-text-primary caret-accent font-mono p-0"
                  aria-label="Terminal input"
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck="false"
                />
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
