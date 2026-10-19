'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Pure cubic ease-out curve.
 * Monotonically increases from 0 to 1 without overshoot.
 */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Strict count-up hook:
 * - Returns null when target is null.
 * - Always clamped to [0, target].
 * - Animates once when visible becomes true.
 * - Renders target immediately when prefers-reduced-motion is active.
 */
export function useCountUp(
  target: number | null,
  visible: boolean,
  duration = 1200
): number | null {
  const [value, setValue] = useState<number | null>(() => (target === null ? null : 0))
  const started = useRef(false)

  useEffect(() => {
    if (target === null || !visible) return

    // Resolve the final value on the next frame so state is never set
    // synchronously inside the effect body.
    const reduce = prefersReducedMotion()
    if (reduce || started.current) {
      const frameId = requestAnimationFrame(() => setValue(target))
      return () => cancelAnimationFrame(frameId)
    }
    started.current = true

    let frameId = 0
    const start = performance.now()

    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(progress)

      // Strictly clamp to [0, target]
      const current = Math.max(0, Math.min(target, Math.round(eased * target)))
      setValue(current)

      if (progress < 1) {
        frameId = requestAnimationFrame(step)
      } else {
        setValue(target)
      }
    }

    frameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameId)
  }, [target, visible, duration])

  if (target === null) return null
  return value
}

export default useCountUp
