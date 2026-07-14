import { useEffect } from 'react'
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion'

const SPRING = { stiffness: 50, damping: 20 }

interface ParallaxValues {
  x: MotionValue<number>
  y: MotionValue<number>
}

export function useParallax(strength = 10): ParallaxValues {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, SPRING)
  const y = useSpring(rawY, SPRING)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // normalize to -1…1 then scale by strength
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2 * strength)
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2 * strength)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawX, rawY, strength])

  return { x, y }
}
