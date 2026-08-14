'use client'
import { useEffect } from 'react'

const MAGNET_RANGE = 140
const MAX_OFFSET = 18
const LERP = 0.18
const RESCAN_EVERY = 60

type Offset = { x: number; y: number }

export default function Magnetic() {
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const supported = 'translate' in document.documentElement.style
    if (!fine || reduced || !supported) return

    const mouse = { x: -9999, y: -9999 }
    const offsets = new Map<HTMLElement, Offset>()
    let els: HTMLElement[] = []
    let frame = 0
    let raf = 0

    const scan = () => {
      els = Array.from(document.querySelectorAll<HTMLElement>('a, button, [role="button"]'))
        .filter((el) => el.getAttribute('data-magnetic-ignore') === null)
      for (const el of offsets.keys()) {
        if (!els.includes(el)) offsets.delete(el)
      }
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const tick = () => {
      if (frame++ % RESCAN_EVERY === 0) scan()

      for (const el of els) {
        const rect = el.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) continue

        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = mouse.x - cx
        const dy = mouse.y - cy
        const dist = Math.hypot(dx, dy)

        let tx = 0
        let ty = 0
        if (dist < MAGNET_RANGE && dist > 0.01) {
          const strength = (1 - dist / MAGNET_RANGE) * MAX_OFFSET
          tx = (dx / dist) * strength
          ty = (dy / dist) * strength
        }

        let cur = offsets.get(el)
        if (!cur) {
          cur = { x: tx, y: ty }
          offsets.set(el, cur)
        }
        cur.x += (tx - cur.x) * LERP
        cur.y += (ty - cur.y) * LERP

        if (Math.abs(cur.x) > 0.05 || Math.abs(cur.y) > 0.05) {
          el.style.translate = `${cur.x.toFixed(2)}px ${cur.y.toFixed(2)}px`
        } else if (el.style.translate) {
          el.style.translate = ''
        }
      }

      raf = requestAnimationFrame(tick)
    }

    scan()
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      for (const el of els) el.style.translate = ''
    }
  }, [])

  return null
}
