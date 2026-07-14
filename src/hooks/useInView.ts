import { useEffect, useRef, useState, type RefObject } from 'react'

export function useInView(
  ref: RefObject<Element | null>,
  options?: {
    root?: Element | null
    rootMargin?: string
    threshold?: number | number[]
  }
) {
  const [inView, setInView] = useState(false)
  const seen = useRef(false)
  // Stabilise options in a ref so an inline object literal at the call site
  // does not cause the effect to re-run (and recreate the observer) every render
  const optionsRef = useRef(options)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !seen.current) {
        seen.current = true
        setInView(true)
        obs.disconnect()
      }
    }, optionsRef.current)
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref]) // options intentionally excluded — stabilised via ref above

  return inView
}
