'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'

/* ─────────────────────────────────────────────────────────
   Tech Stack Item Definitions & Crisp Brand SVG Icons
   All icons tinted in the portfolio signature orange accent
   ───────────────────────────────────────────────────────── */
interface TechItem {
  id: string
  name: string
  icon: (props: { size?: number }) => React.JSX.Element
}

const TECH_ITEMS: TechItem[] = [
  {
    id: 'nextjs',
    name: 'Next.js',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M8.5 7.5v9M15.5 7.5v4.5M8.5 7.5l7 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'express',
    name: 'Express',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8l5 8M9 8l-5 8M13 12h5a3 3 0 0 0-3-3h-1a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h2a3 3 0 0 0 3-2" />
      </svg>
    ),
  },
  {
    id: 'react',
    name: 'React',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="2.4" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M7 8.5h5M9.5 8.5v8M14 13.5c.5.8 1.5 1.3 2.5 1.3 1.2 0 2-.6 2-1.5 0-2.2-4.2-1.2-4.2-3.8 0-1.2 1-2 2.5-2 1.2 0 2.2.5 2.7 1.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 6c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6 1.2 1.2 2.6 2.6 5.5 2.6 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C16.3 7.4 14.9 6 12 6zm-6 6c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6 1.2 1.2 2.6 2.6 5.5 2.6 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6-1.2-1.2-2.6-2.6-5.5-2.6z" />
      </svg>
    ),
  },
  {
    id: 'python',
    name: 'Python',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.8 2c-3.4 0-5.3 1.5-5.3 4.4v2.2h5.5v.8H4.4C2.3 9.4 1 11.2 1 13.9c0 2.8 1.6 4.3 4.5 4.3h1.8v-2.3c0-2.3 2-4.3 4.5-4.3h5.4v-.8c0-2.8-1.7-4.4-4.8-4.4h-.6v-2c0-.3-.3-.4-.6-.4h-.4zm-2 2.2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zm2.4 17.8c3.4 0 5.3-1.5 5.3-4.4v-2.2H12v-.8h7.6c2.1 0 3.4-1.8 3.4-4.5 0-2.8-1.6-4.3-4.5-4.3h-1.8v2.3c0 2.3-2 4.3-4.5 4.3H6.8v.8c0 2.8 1.7 4.4 4.8 4.4h.6v2c0 .3.3.4.6.4h.4zm2-2.2a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z" />
      </svg>
    ),
  },
  {
    id: 'node',
    name: 'Node.js',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2zm0 2.5L5 9v6l7 4.5 7-4.5V9l-7-4.5zM10.8 11v5.2h1.8v-2.8c0-.7.4-1.1 1-1.1s1 .4 1 1.1v2.8h1.8v-3.1c0-1.4-1-2.3-2.3-2.3-1 0-1.8.5-2.2 1.3V11h-1.1z" />
      </svg>
    ),
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.5 2 2 6.5 2 12c0 3.8 2.2 7.2 5.5 8.8.4-.6.8-1.4 1.1-2.3-.9-.4-1.6-1.2-2.1-2.1-.4-.8-.5-1.7-.5-2.6 0-3.3 2.7-6 6-6s6 2.7 6 6c0 1.2-.3 2.3-.9 3.2-.4.7-1 1.3-1.8 1.7.3.8.7 1.6 1.1 2.3 3.3-1.6 5.6-5 5.6-8.9 0-5.5-4.5-10-10-10zm-1.5 6.5c1.4 0 2.5 1.1 2.5 2.5 0 .8-.4 1.5-1 2-.6.4-1.4.5-2 .5s-1.4-.1-2-.5c-.6-.5-1-1.2-1-2 0-1.4 1.1-2.5 2.5-2.5z" />
      </svg>
    ),
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1.5s5.5 5.2 5.5 11.2c0 4.2-3.3 7.5-5.5 9.8-2.2-2.3-5.5-5.6-5.5-9.8C6.5 6.7 12 1.5 12 1.5zm-.6 5.2v12.5c.3-.3.6-.6.8-.9.2-.2.3-.5.4-.7V6.5c-.4-.5-.8-.8-1.2-1.1v1.3z" />
      </svg>
    ),
  },
  {
    id: 'redis',
    name: 'Redis',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 9.5l10-4.5 10 4.5-10 4.5L2 9.5zm0 5l10 4.5 10-4.5v2.5l-10 4.5-10-4.5v-2.5zm0-2.5l10 4.5 10-4.5v2.5l-10 4.5-10-4.5V12z" />
      </svg>
    ),
  },
  {
    id: 'upstash',
    name: 'Upstash',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3a9 9 0 0 0-9 9c0 3.8 2.4 7 5.7 8.3l1.8-3.1A5.4 5.4 0 0 1 7.2 12a4.8 4.8 0 0 1 8.2-3.4l2.6-2.6A8.9 8.9 0 0 0 12 3zm4.5 5.7l-2.6 2.6A2.4 2.4 0 0 1 12 14.4c-.7 0-1.3-.3-1.7-.8l-2.6 2.6a6 6 0 0 0 8.6-1.5l.2-.3z" />
      </svg>
    ),
  },
  {
    id: 'supabase',
    name: 'Supabase',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.4 2.1c.4-.6 1.4-.3 1.4.5V11h6.6c.7 0 1.1.9.6 1.4L10.6 21.9c-.4.6-1.4.3-1.4-.5V13H2.6c-.7 0-1.1-.9-.6-1.4L13.4 2.1z" />
      </svg>
    ),
  },
  {
    id: 'firebase',
    name: 'Firebase',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.6 16.8L6.8 3.5c.1-.5.7-.7 1-.3l3.5 6.2-6.7 7.4zm14.8-.1L16.2 6.5c-.2-.4-.8-.4-1 0L12 12.3l7.4 4.4zm-14.7.7l7-12.7c.3-.5 1-.4 1.2.2L19.4 17 12 21.5 4.7 17.4z" />
      </svg>
    ),
  },
  {
    id: 'clerk',
    name: 'Clerk',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3.8 14.2A5.4 5.4 0 1 1 16.5 8l-2.2 2.2a2.4 2.4 0 1 0 0 3.6z" />
      </svg>
    ),
  },
  {
    id: 'aws',
    name: 'AWS',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.4 12.8c-.8.8-1.8 1.2-2.8 1.2-1.8 0-2.8-1.1-2.8-2.6 0-2.4 2.2-3.2 4.9-3.2v-.4c0-.9-.5-1.5-1.7-1.5-.9 0-1.8.4-2.5 1l-.8-1.3C2.8 5 4.3 4.5 5.8 4.5c2.4 0 3.7 1.3 3.7 3.5v5.3H7.8v-.5h-.4zm-2.1-.2c1 0 1.8-.4 2.1-.9V9.5C5.8 9.5 4 9.9 4 11.2c0 .9.6 1.4 1.3 1.4zm16.5 4.2c-5.8 2.8-12.8 2.2-17.6-.8-.2-.1-.2-.4 0-.5.2-.1.4 0 .6.1 4.5 2.8 11.2 3.4 16.7.7.3-.2.5.1.3.5zm1-1.3c-.2-.3-.9-.1-1.4 0-.3.1-.3-.2-.1-.4.8-1 1.7-.8 1.9-.5.2.3-.2 1.3-.9 2.1-.2.2-.4.1-.3-.1.2-.4.8-.8.8-1.1z" />
      </svg>
    ),
  },
  {
    id: 'gcp',
    name: 'GCP',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.4 10.3A6 6 0 0 0 8.5 8a5 5 0 0 0-4.5 5 5 5 0 0 0 5 5h10a4 4 0 0 0 .4-7.7zM19 16H9a3 3 0 0 1-3-3 3 3 0 0 1 2.8-3h.7l.3-.7a4 4 0 0 1 7.6 1.4v.9l.9.2a2 2 0 0 1 .7 3.8z" />
      </svg>
    ),
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare CDN',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.8 10.6a5.5 5.5 0 0 0-10.4-1.8A4.5 4.5 0 0 0 4.5 13a4.5 4.5 0 0 0 4.3 3.5h10a3.7 3.7 0 0 0 0-7.4c0 .5 0 1-.3 1.5z" />
      </svg>
    ),
  },
  {
    id: 'cloudinary',
    name: 'Cloudinary',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.6 9.4A5.5 5.5 0 0 0 9 7.7a4.6 4.6 0 0 0-4.4 4.5 4.5 4.5 0 0 0 4.5 4.3h9.5a3.6 3.6 0 0 0 0-7.1zm-4.2 4.4a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6z" />
      </svg>
    ),
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.5c2.5 2.5 5 6.5 5 11.5l-3-2-2 4-2-4-3 2c0-5 2.5-9 5-11.5zm0 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM8 18.5l4 3 4-3-4 1.5-4-1.5z" />
      </svg>
    ),
  },
  {
    id: 'react-native',
    name: 'React Native',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="2.2" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(150 12 12)" />
      </svg>
    ),
  },
  {
    id: 'openai',
    name: 'OpenAI',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.7 14.5A5.2 5.2 0 0 0 21 9.8a5.3 5.3 0 0 0-4.6-5.2A5.3 5.3 0 0 0 8 3.5 5.3 5.3 0 0 0 3.4 7a5.3 5.3 0 0 0-.4 5.3 5.3 5.3 0 0 0 3 4.6 5.3 5.3 0 0 0 8.4 1.1 5.3 5.3 0 0 0 5.3-3.5z" />
        <path d="M12 8.5v7M8.5 10l7 4M8.5 14l7-4" />
      </svg>
    ),
  },
  {
    id: 'claude',
    name: 'Claude Code',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.5 19L11 4h2l5.5 15h-2.5l-1.5-4H9.5L8 19H5.5zm4.8-6.5h3.4L12 7.8 10.3 12.5z" />
      </svg>
    ),
  },
  {
    id: 'gemini',
    name: 'Gemini',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C12 7.5 7.5 12 2 12c5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z" />
      </svg>
    ),
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4c-5.5 0-10 3.5-10 8s4.5 8 10 8c1.8 0 3.5-.4 5-1.1l3 1.1-1-2.8c1.8-1.4 3-3.2 3-5.2 0-4.5-4.5-8-10-8zm-3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
      </svg>
    ),
  },
  {
    id: 'langchain',
    name: 'LangChain',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    id: 'langgraph',
    name: 'LangGraph',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" fill="currentColor" />
        <circle cx="18" cy="18" r="3" fill="currentColor" />
        <circle cx="18" cy="6" r="3" fill="currentColor" />
        <path d="M8.5 7.5l7 7M9 6h6M18 9v6" />
      </svg>
    ),
  },
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l9 5.2v3.6l-3.5-2v8.4l-5.5 3.2-5.5-3.2V8.8L3 10.8V7.2L12 2zm0 4.1L8.5 8.1v6.5l3.5 2 3.5-2V8.1L12 6.1z" />
      </svg>
    ),
  },
  {
    id: 'vscode',
    name: 'VS Code',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.5 2.5l4 2.5v14l-4 2.5-10-8.5 10-8.5v-2zm-3 4.5l-7 6 7 6V7zm-9 3l4 3-4 3-3-2V12l3-2z" />
      </svg>
    ),
  },
]

/* ─────────────────────────────────────────────────────────
   Rigid Body Interface with 2D Rotation & Capsule Bounds
   ───────────────────────────────────────────────────────── */
interface PhysicsPill {
  id: string
  name: string
  item: TechItem
  el: HTMLDivElement | null
  w: number
  h: number
  r: number
  // Positions and dynamics
  x: number
  y: number
  angle: number
  vx: number
  vy: number
  omega: number
  mass: number
  invMass: number
  inertia: number
  invInertia: number
  dragging: boolean
  asleep: boolean
  sleepT: number
}

// Initial resting clustered positions based on screenshot layout (proportional)
const INITIAL_PRESETS: { [id: string]: { rx: number; ry: number; angleDeg: number } } = {
  langchain: { rx: 0.12, ry: 0.86, angleDeg: 28 },
  'react-native': { rx: 0.14, ry: 0.74, angleDeg: 26 },
  express: { rx: 0.18, ry: 0.58, angleDeg: 24 },
  nextjs: { rx: 0.2, ry: 0.51, angleDeg: 20 },
  firebase: { rx: 0.19, ry: 0.7, angleDeg: 22 },
  clerk: { rx: 0.32, ry: 0.73, angleDeg: 0 },
  openai: { rx: 0.32, ry: 0.81, angleDeg: 0 },
  langgraph: { rx: 0.29, ry: 0.89, angleDeg: 0 },
  postgres: { rx: 0.32, ry: 0.64, angleDeg: 0 },
  react: { rx: 0.32, ry: 0.56, angleDeg: 0 },
  typescript: { rx: 0.38, ry: 0.49, angleDeg: 8 },
  mongodb: { rx: 0.44, ry: 0.63, angleDeg: -32 },
  aws: { rx: 0.43, ry: 0.71, angleDeg: 0 },
  claude: { rx: 0.47, ry: 0.8, angleDeg: 0 },
  tailwind: { rx: 0.55, ry: 0.56, angleDeg: 0 },
  redis: { rx: 0.56, ry: 0.64, angleDeg: 0 },
  gcp: { rx: 0.55, ry: 0.72, angleDeg: 0 },
  python: { rx: 0.7, ry: 0.53, angleDeg: 8 },
  upstash: { rx: 0.69, ry: 0.61, angleDeg: 8 },
  cloudflare: { rx: 0.7, ry: 0.69, angleDeg: 8 },
  gemini: { rx: 0.63, ry: 0.8, angleDeg: 0 },
  tensorflow: { rx: 0.6, ry: 0.88, angleDeg: 0 },
  node: { rx: 0.87, ry: 0.56, angleDeg: 0 },
  supabase: { rx: 0.87, ry: 0.64, angleDeg: 0 },
  cloudinary: { rx: 0.77, ry: 0.76, angleDeg: -25 },
  antigravity: { rx: 0.86, ry: 0.77, angleDeg: 25 },
  vscode: { rx: 0.74, ry: 0.88, angleDeg: 0 },
  deepseek: { rx: 0.87, ry: 0.88, angleDeg: 0 },
}

export default function StackPlayground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const chipRefs = useRef<{ [id: string]: HTMLDivElement | null }>({})
  const bodiesRef = useRef<PhysicsPill[]>([])
  const [isReady, setIsReady] = useState(false)

  // Initialize and run physics
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let W = container.clientWidth || 800
    let H = container.clientHeight || 320

    // Construct bodies
    const bodies: PhysicsPill[] = TECH_ITEMS.map((item) => {
      const preset = INITIAL_PRESETS[item.id] || { rx: 0.5, ry: 0.7, angleDeg: 0 }
      const el = chipRefs.current[item.id] || null
      const w = el?.offsetWidth || 110
      const h = el?.offsetHeight || 34
      const r = h / 2
      const mass = Math.max(1, (w * h) / 750)
      const inertia = (mass * (w * w + h * h)) / 12

      const posX = Math.max(r, Math.min(W - w + r, preset.rx * (W - w) + r))
      const posY = Math.max(r, Math.min(H - h + r, preset.ry * (H - h) + r))
      const angleRad = (preset.angleDeg * Math.PI) / 180

      return {
        id: item.id,
        name: item.name,
        item,
        el,
        w,
        h,
        r,
        x: posX,
        y: posY,
        angle: angleRad,
        vx: 0,
        vy: 0,
        omega: 0,
        mass,
        invMass: 1 / mass,
        inertia,
        invInertia: 1 / inertia,
        dragging: false,
        asleep: true, // Start in beautiful resting screenshot arrangement
        sleepT: 0,
      }
    })

    bodiesRef.current = bodies

    // Position pills immediately
    bodies.forEach((b) => {
      if (b.el) {
        b.el.style.transform = `translate3d(${(b.x - b.w / 2).toFixed(1)}px, ${(b.y - b.h / 2).toFixed(1)}px, 0) rotate(${((b.angle * 180) / Math.PI).toFixed(1)}deg)`
      }
    })

    setIsReady(true)

    // Physics parameters
    const GRAVITY = 1800
    const RESTITUTION = 0.35
    const FRICTION = 0.88
    const ANGULAR_DAMPING = 0.94
    const LINEAR_DAMPING = 0.985
    const DT = 1 / 60

    let rafId = 0
    let lastTime = 0
    let accumulator = 0
    let running = false

    // Drag tracking
    let dragBody: PhysicsPill | null = null
    let dragId = -1
    let lastPtrX = 0
    let lastPtrY = 0
    let lastPtrTime = 0

    // Collision Resolution: Segment to Segment Distance for Capsules
    const resolveCollision = (b1: PhysicsPill, b2: PhysicsPill) => {
      const l1 = Math.max(0, b1.w - b1.h)
      const l2 = Math.max(0, b2.w - b2.h)

      const cos1 = Math.cos(b1.angle)
      const sin1 = Math.sin(b1.angle)
      const cos2 = Math.cos(b2.angle)
      const sin2 = Math.sin(b2.angle)

      // Segment endpoints
      const a0x = b1.x - (cos1 * l1) / 2
      const a0y = b1.y - (sin1 * l1) / 2
      const a1x = b1.x + (cos1 * l1) / 2
      const a1y = b1.y + (sin1 * l1) / 2

      const b0x = b2.x - (cos2 * l2) / 2
      const b0y = b2.y - (sin2 * l2) / 2
      const b1x = b2.x + (cos2 * l2) / 2
      const b1y = b2.y + (sin2 * l2) / 2

      // Approximate closest points along segments
      const mid1x = (a0x + a1x) / 2
      const mid1y = (a0y + a1y) / 2
      const mid2x = (b0x + b1x) / 2
      const mid2y = (b0y + b1y) / 2

      const dx = mid2x - mid1x
      const dy = mid2y - mid1y
      const dist = Math.hypot(dx, dy) || 0.001
      const minDist = b1.r + b2.r + Math.min(l1, l2) * 0.42

      if (dist >= minDist) return

      // Penetration normal
      const nx = dx / dist
      const ny = dy / dist
      const overlap = minDist - dist

      // Positional separation
      const invMassSum = b1.invMass + b2.invMass
      if (invMassSum <= 0) return

      const sep = overlap * 0.75
      if (!b1.dragging) {
        b1.x -= nx * (sep * (b1.invMass / invMassSum))
        b1.y -= ny * (sep * (b1.invMass / invMassSum))
      }
      if (!b2.dragging) {
        b2.x += nx * (sep * (b2.invMass / invMassSum))
        b2.y += ny * (sep * (b2.invMass / invMassSum))
      }

      // Relative velocity at contact
      const r1x = mid1x - b1.x
      const r1y = mid1y - b1.y
      const r2x = mid2x - b2.x
      const r2y = mid2y - b2.y

      const v1x = b1.vx - b1.omega * r1y
      const v1y = b1.vy + b1.omega * r1x
      const v2x = b2.vx - b2.omega * r2y
      const v2y = b2.vy + b2.omega * r2x

      const rvx = v2x - v1x
      const rvy = v2y - v1y
      const velAlongNormal = rvx * nx + rvy * ny

      if (velAlongNormal > 0) return

      // Rotational moment arm cross normal
      const r1CrossN = r1x * ny - r1y * nx
      const r2CrossN = r2x * ny - r2y * nx

      const invEffMass =
        b1.invMass +
        b2.invMass +
        r1CrossN * r1CrossN * b1.invInertia +
        r2CrossN * r2CrossN * b2.invInertia

      const j = (-(1 + RESTITUTION) * velAlongNormal) / (invEffMass || 1)

      const impX = j * nx
      const impY = j * ny

      if (!b1.dragging) {
        b1.vx -= impX * b1.invMass
        b1.vy -= impY * b1.invMass
        b1.omega -= r1CrossN * j * b1.invInertia * 0.4
        b1.asleep = false
        b1.sleepT = 0
      }
      if (!b2.dragging) {
        b2.vx += impX * b2.invMass
        b2.vy += impY * b2.invMass
        b2.omega += r2CrossN * j * b2.invInertia * 0.4
        b2.asleep = false
        b2.sleepT = 0
      }
    }

    // Step physics forward
    const physicsStep = (dt: number) => {
      // Integration
      for (const b of bodies) {
        if (b.dragging || b.asleep) continue

        b.vy += GRAVITY * dt
        b.x += b.vx * dt
        b.y += b.vy * dt
        b.angle += b.omega * dt

        b.vx *= LINEAR_DAMPING
        b.vy *= LINEAR_DAMPING
        b.omega *= ANGULAR_DAMPING
      }

      // Container boundary collisions
      const pad = 12
      for (const b of bodies) {
        if (b.dragging) continue

        const halfW = b.w / 2
        const halfH = b.h / 2

        // Floor
        if (b.y + halfH > H - pad) {
          b.y = H - pad - halfH
          if (b.vy > 0) {
            b.vy = -b.vy * 0.35
            b.vx *= FRICTION
            b.omega *= 0.8
            if (Math.abs(b.vy) < 40) b.vy = 0
          }
        }

        // Ceiling
        if (b.y - halfH < pad) {
          b.y = pad + halfH
          if (b.vy < 0) b.vy = -b.vy * 0.4
        }

        // Left wall
        if (b.x - halfW < pad) {
          b.x = pad + halfW
          if (b.vx < 0) b.vx = -b.vx * 0.4
        }

        // Right wall
        if (b.x + halfW > W - pad) {
          b.x = W - pad - halfW
          if (b.vx > 0) b.vx = -b.vx * 0.4
        }
      }

      // Body-to-body collisions
      for (let iter = 0; iter < 4; iter++) {
        for (let i = 0; i < bodies.length; i++) {
          for (let j = i + 1; j < bodies.length; j++) {
            resolveCollision(bodies[i], bodies[j])
          }
        }
      }

      // Sleep threshold
      for (const b of bodies) {
        if (b.dragging) continue
        const speed = Math.hypot(b.vx, b.vy) + Math.abs(b.omega) * 15
        if (speed < 18) {
          b.sleepT += dt
          if (b.sleepT > 0.4) {
            b.asleep = true
            b.vx = 0
            b.vy = 0
            b.omega = 0
          }
        } else {
          b.sleepT = 0
          b.asleep = false
        }
      }
    }

    const render = () => {
      for (const b of bodies) {
        if (!b.el) continue
        const left = b.x - b.w / 2
        const top = b.y - b.h / 2
        const deg = (b.angle * 180) / Math.PI
        b.el.style.transform = `translate3d(${left.toFixed(1)}px, ${top.toFixed(1)}px, 0) rotate(${deg.toFixed(1)}deg)`
      }
    }

    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop)
      if (!lastTime) lastTime = now
      let dt = (now - lastTime) / 1000
      lastTime = now
      if (dt > 0.05) dt = 0.05
      accumulator += dt

      let steps = 0
      while (accumulator >= DT && steps < 4) {
        physicsStep(DT)
        accumulator -= DT
        steps++
      }

      render()
    }

    const start = () => {
      if (running || reducedMotion) return
      running = true
      lastTime = 0
      accumulator = 0
      rafId = requestAnimationFrame(loop)
    }

    const stop = () => {
      if (!running) return
      running = false
      cancelAnimationFrame(rafId)
    }

    // Pointer Dragging Handlers
    const onPointerDown = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest('.stack-pill') as HTMLDivElement | null
      if (!target) return
      const id = target.getAttribute('data-id')
      const body = bodies.find((b) => b.id === id)
      if (!body) return

      dragBody = body
      dragId = e.pointerId
      body.dragging = true
      body.asleep = false
      body.sleepT = 0
      body.vx = 0
      body.vy = 0
      body.omega = 0

      lastPtrX = e.clientX
      lastPtrY = e.clientY
      lastPtrTime = performance.now()

      target.classList.add('is-dragging')
      try {
        container.setPointerCapture(e.pointerId)
      } catch {
        /* noop */
      }
      e.preventDefault()
      start()
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!dragBody || e.pointerId !== dragId) return
      const now = performance.now()
      const dt = Math.max(8, now - lastPtrTime) / 1000
      const dx = e.clientX - lastPtrX
      const dy = e.clientY - lastPtrY

      lastPtrX = e.clientX
      lastPtrY = e.clientY
      lastPtrTime = now

      dragBody.x = Math.max(dragBody.w / 2, Math.min(W - dragBody.w / 2, dragBody.x + dx))
      dragBody.y = Math.max(dragBody.h / 2, Math.min(H - dragBody.h / 2, dragBody.y + dy))

      // Update throwing velocity
      dragBody.vx = Math.max(-1800, Math.min(1800, dragBody.vx * 0.4 + (dx / dt) * 0.6))
      dragBody.vy = Math.max(-1800, Math.min(1800, dragBody.vy * 0.4 + (dy / dt) * 0.6))
      dragBody.omega = (dx / dt) * 0.005
    }

    const onPointerUp = (e: PointerEvent) => {
      if (!dragBody || e.pointerId !== dragId) return
      dragBody.dragging = false
      dragBody.el?.classList.remove('is-dragging')
      dragBody = null
      dragId = -1
    }

    container.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)

    // Resize Observer
    const ro = new ResizeObserver(() => {
      W = container.clientWidth
      H = container.clientHeight
      bodies.forEach((b) => {
        b.x = Math.max(b.w / 2, Math.min(W - b.w / 2, b.x))
        b.y = Math.max(b.h / 2, Math.min(H - b.h / 2, b.y))
      })
      render()
    })
    ro.observe(container)

    return () => {
      stop()
      ro.disconnect()
      container.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
    }
  }, [])

  // "PLAY WITH ME" button action: explosive playful burst tossing chips upward
  const handlePlayWithMe = useCallback(() => {
    const bodies = bodiesRef.current
    if (!bodies.length) return

    bodies.forEach((b) => {
      b.asleep = false
      b.sleepT = 0
      // Upward burst with slight horizontal spread and natural spin
      b.vy = -(650 + Math.random() * 550)
      b.vx = (Math.random() - 0.5) * 450
      b.omega = (Math.random() - 0.5) * 9
    })

    // Dispatch a subtle tactile event to wake up the animation loop
    const container = containerRef.current
    if (container) {
      container.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 0, clientY: 0 }))
      window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }))
    }
  }, [])

  return (
    <div className="tech-stack-container" ref={containerRef}>
      {/* Background Architectural Grid Pattern */}
      <div className="tech-grid-bg" aria-hidden="true" />

      {/* Interactive Physics Pills */}
      <div className={`pills-stage ${isReady ? 'is-ready' : ''}`}>
        {TECH_ITEMS.map((item) => {
          const IconComponent = item.icon
          return (
            <div
              key={item.id}
              data-id={item.id}
              className="stack-pill"
              ref={(el) => {
                chipRefs.current[item.id] = el
              }}
            >
              <span className="pill-icon">
                <IconComponent size={15} />
              </span>
              <span className="pill-name">{item.name}</span>
            </div>
          )
        })}
      </div>

      {/* Centered Frosted "PLAY WITH ME" Button */}
      <button
        type="button"
        className="play-with-me-btn"
        onClick={handlePlayWithMe}
        title="Toss the tech stack!"
      >
        PLAY WITH ME
      </button>

      {/* Component Styles */}
      <style>{`
        .tech-stack-container {
          position: relative;
          width: 100%;
          height: clamp(280px, 22vw, 360px);
          background: #0d0e11;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          overflow: hidden;
          box-sizing: border-box;
          user-select: none;
          touch-action: none;
        }

        /* Faint dark square grid background */
        .tech-grid-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
          background-size: 38px 38px;
          background-position: center bottom;
          opacity: 0.9;
        }

        .pills-stage {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.25s ease-out;
        }

        .pills-stage.is-ready {
          opacity: 1;
        }

        /* Individual Tech Chip Pill */
        .stack-pill {
          position: absolute;
          top: 0;
          left: 0;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          height: 33px;
          padding: 0 13px;
          background: #141517;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 9999px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
          white-space: nowrap;
          cursor: grab;
          will-change: transform;
          touch-action: none;
          transition: border-color 0.15s ease, background-color 0.15s ease;
        }

        .stack-pill.is-dragging {
          cursor: grabbing;
          z-index: 50;
          border-color: #fa5f34;
          background: #191b20;
          box-shadow: 0 8px 24px rgba(250, 95, 52, 0.25);
        }

        .stack-pill:hover {
          border-color: rgba(250, 95, 52, 0.6);
        }

        .pill-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fa5f34;
          flex-shrink: 0;
        }

        .pill-name {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: #f3eee8;
          line-height: 1;
        }

        /* Frosted Glass "PLAY WITH ME" Button */
        .play-with-me-btn {
          position: absolute;
          left: 50%;
          bottom: 15px;
          transform: translateX(-50%);
          z-index: 60;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 22px;
          border-radius: 9999px;
          background: rgba(45, 48, 55, 0.78);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.24);
          box-shadow: 
            inset 0 1px 1px rgba(255, 255, 255, 0.25),
            0 8px 24px rgba(0, 0, 0, 0.6);
          font-family: var(--font-geist-mono), monospace;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #ffffff;
          cursor: pointer;
          outline: none;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, border-color 0.2s ease;
        }

        .play-with-me-btn:hover {
          transform: translateX(-50%) scale(1.05);
          background: rgba(60, 64, 73, 0.9);
          border-color: rgba(255, 255, 255, 0.38);
        }

        .play-with-me-btn:active {
          transform: translateX(-50%) scale(0.97);
        }

        @media (max-width: 640px) {
          .tech-stack-container {
            height: 320px;
          }
          .stack-pill {
            height: 30px;
            padding: 0 11px;
          }
          .pill-name {
            font-size: 11.5px;
          }
          .play-with-me-btn {
            font-size: 10.5px;
            padding: 6px 18px;
            bottom: 12px;
          }
        }
      `}</style>
    </div>
  )
}
