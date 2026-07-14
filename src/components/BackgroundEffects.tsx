import { useEffect, useRef } from 'react'

export function BackgroundEffects() {
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = spotlightRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      el.style.setProperty('--mx', `${e.clientX}px`)
      el.style.setProperty('--my', `${e.clientY}px`)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      {/* Spotlight */}
      <div ref={spotlightRef} className="spotlight absolute inset-0" />

      {/* Aurora blobs */}
      {/* Blue */}
      <div
        className="aurora absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          top: '-30%',
          left: '20%',
          filter: 'blur(120px)',
          background: 'rgba(59,130,246,0.12)',
        }}
      />
      {/* Purple */}
      <div
        className="aurora absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          bottom: '-20%',
          right: '10%',
          filter: 'blur(120px)',
          animationDelay: '-3s',
          background: 'rgba(147,51,234,0.10)',
        }}
      />
      {/* Cyan */}
      <div
        className="aurora absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          left: '60%',
          top: '40%',
          filter: 'blur(100px)',
          animationDelay: '-6s',
          background: 'rgba(6,182,212,0.08)',
        }}
      />
    </div>
  )
}
