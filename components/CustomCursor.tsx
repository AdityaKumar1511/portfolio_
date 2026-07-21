'use client'
import { useEffect, useRef, useState } from 'react'

const TRAIL_LENGTH = 10
const LERP_FACTOR = 0.35

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: -100, y: -100 })
  const posHistoryRef = useRef<{ x: number; y: number }[]>([])
  const trailPosRef = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }))
  )
  const rafRef = useRef<number>(0)
  const [hovered, setHovered] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hasPointer = window.matchMedia('(pointer: fine)').matches
    if (!hasPointer) return

    setMounted(true)
    document.body.classList.add('has-custom-cursor')

    // Create trail container
    const container = document.createElement('div')
    container.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:999998;'
    document.body.appendChild(container)
    containerRef.current = container

    // Create trail particles
    const particles: HTMLDivElement[] = []
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const el = document.createElement('div')
      el.className = 'custom-cursor-trail'
      const t = i / (TRAIL_LENGTH - 1)
      const size = 8 - t * 6
      el.style.width = `${size}px`
      el.style.height = `${size}px`
      el.style.opacity = '0'
      container.appendChild(el)
      particles.push(el)
    }
    trailRef.current = particles

    // Animation loop
    const animate = () => {
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // Push to history
      posHistoryRef.current.unshift({ x: mx, y: my })
      if (posHistoryRef.current.length > TRAIL_LENGTH * 2) {
        posHistoryRef.current.length = TRAIL_LENGTH * 2
      }

      // Update trail particles
      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const histIdx = Math.min(i * 2, posHistoryRef.current.length - 1)
        const target = posHistoryRef.current[histIdx] || { x: mx, y: my }
        const cur = trailPosRef.current[i]

        cur.x += (target.x - cur.x) * LERP_FACTOR
        cur.y += (target.y - cur.y) * LERP_FACTOR

        const el = particles[i]
        el.style.transform = `translate(${cur.x}px, ${cur.y}px) translate(-50%, -50%)`

        // Opacity: fade out toward tail, also fade based on movement
        const dx = mx - cur.x
        const dy = my - cur.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const t = i / (TRAIL_LENGTH - 1)
        const baseOpacity = 0.5 - t * 0.45
        const movementFade = Math.min(dist / 80, 1)
        el.style.opacity = String(baseOpacity * movementFade)
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
      if (!visible) setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return

      const isInteractive =
        !!target.closest('a, button, input, textarea, select, [role="button"]') ||
        getComputedStyle(target).cursor === 'pointer'

      const isText =
        !!target.closest('p, span, h1, h2, h3, h4, h5, h6, li, label, td, th, dt, dd, figcaption, blockquote, cite, strong, em, b, i, u, small, code, pre, summary')

      setHovered(isInteractive || isText)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      cancelAnimationFrame(rafRef.current)
      container.remove()
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [visible])

  if (!mounted) return null

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${hovered ? 'cursor-hovered' : ''}`}
      style={{
        opacity: visible ? 1 : 0,
        left: '-100px',
        top: '-100px',
      }}
    />
  )
}
