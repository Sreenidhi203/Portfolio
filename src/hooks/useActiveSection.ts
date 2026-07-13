import { useEffect, useRef, useState } from 'react'
import { SECTION_IDS } from '@/constants'

export function useActiveSection() {
  const [active, setActive] = useState<string>('')
  const ratios = useRef<Record<string, number>>({})

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          ratios.current[id] = entry.intersectionRatio
          // O(n) max scan — avoids sort + array allocation on every scroll tick
          let bestId = ''
          let bestRatio = 0
          for (const [k, v] of Object.entries(ratios.current)) {
            if (v > bestRatio) { bestRatio = v; bestId = k }
          }
          if (bestId && bestRatio > 0) setActive(bestId)
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1] },
      )

      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return active
}
