'use client'
import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Skip on touch-only devices
    const hasPointer = window.matchMedia('(pointer: fine)').matches
    if (!hasPointer) return

    setMounted(true)
    document.body.classList.add('has-custom-cursor')

    const onMove = (e: MouseEvent) => {
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

    const onLeave = () => {
      setVisible(false)
    }

    const onEnter = () => {
      setVisible(true)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      document.body.classList.remove('has-custom-cursor')
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
