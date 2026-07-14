import { motion } from 'framer-motion'

interface Beam {
  color: string
  duration: number
  x: number[]
  opacity: number[]
  rotate: number
}

const beams: Beam[] = [
  {
    color: 'from-blue-500/30 to-transparent',
    duration: 20,
    x: [0, 100, 0],
    opacity: [0.3, 0.6, 0.3],
    rotate: 15,
  },
  {
    color: 'from-purple-500/20 to-transparent',
    duration: 25,
    x: [0, -80, 0],
    opacity: [0.2, 0.5, 0.2],
    rotate: -10,
  },
]

export function AnimatedBeams() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {beams.map((beam, i) => (
        <motion.div
          key={i}
          className={`absolute left-1/2 top-0 h-[60vh] w-px bg-gradient-to-b ${beam.color}`}
          style={{ rotate: beam.rotate, transformOrigin: 'top center' }}
          animate={{ x: beam.x, opacity: beam.opacity }}
          transition={{
            duration: beam.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
