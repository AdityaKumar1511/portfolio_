'use client'
import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [hovered, setHovered] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Touch device detection helper
    const handleTouch = () => {
      setIsTouch(true)
      document.body.classList.remove('has-custom-cursor')
    }
    window.addEventListener('touchstart', handleTouch, { once: true })

    // Enable custom cursor styles on body by default
    document.body.classList.add('has-custom-cursor')

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[role="button"]') ||
        target.style.cursor === 'pointer'
      ) {
        setHovered(true)
      } else {
        setHovered(false)
      }
    }

    window.addEventListener('mousemove', updatePosition)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', updatePosition)
      document.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('touchstart', handleTouch)
    }
  }, [])

  if (!mounted || isTouch) return null

  return (
    <div
      className={`custom-cursor ${hovered ? 'cursor-hovered' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  )
}
