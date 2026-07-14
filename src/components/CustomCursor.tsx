import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMediaQuery } from '@/hooks'

const SPRING = { stiffness: 200, damping: 25 }

export function CustomCursor() {
  const isCoarse = useMediaQuery('(pointer: coarse)')
  const [hovered, setHovered] = useState(false)

  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)
  const x = useSpring(rawX, SPRING)
  const y = useSpring(rawY, SPRING)

  useEffect(() => {
    if (isCoarse) return
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }
    const over = (e: MouseEvent) => {
      const t = e.target as Element
      setHovered(
        !!t.closest(
          'a, button, [role="button"], input, textarea, select, label'
        )
      )
    }
    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [isCoarse, rawX, rawY])

  if (isCoarse) return null

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full border border-white mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: hovered ? 48 : 32, height: hovered ? 48 : 32 }}
        transition={SPRING}
      />
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full bg-white mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: hovered ? 6 : 4, height: hovered ? 6 : 4 }}
        transition={SPRING}
      />
    </>
  )
}
