import { useEffect, useRef, useState } from 'react'

export function useCountUp(target: number, duration = 1600) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement | null>(null)
  const started = useRef(false)

  useEffect(() => {
    // Reset so animation re-runs if target changes
    started.current = false
    const el = ref.current
    if (!el) return

    let rafId: number

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        const startTime = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - startTime) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setCount(Math.floor(eased * target))
          if (p < 1) {
            rafId = requestAnimationFrame(tick)
          } else {
            setCount(target)
          }
        }
        rafId = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [target, duration])

  return { count, ref }
}
