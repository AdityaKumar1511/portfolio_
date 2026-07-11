"use client";

import React, { createContext, useContext, useState } from "react";

interface TerminalContextType {
  isOpen: boolean;
  openTerminal: () => void;
  closeTerminal: () => void;
  toggleTerminal: () => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openTerminal = () => setIsOpen(true);
  const closeTerminal = () => setIsOpen(false);
  const toggleTerminal = () => setIsOpen((prev) => !prev);

  return (
    <TerminalContext.Provider value={{ isOpen, openTerminal, closeTerminal, toggleTerminal }}>
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error("useTerminal must be used within a TerminalProvider");
  }
  return context;
}
