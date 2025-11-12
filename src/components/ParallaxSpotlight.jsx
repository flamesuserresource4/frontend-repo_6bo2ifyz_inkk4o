import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function ParallaxSpotlight() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 60])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <div ref={ref} className="relative isolate">
      <motion.div style={{ y: y1 }} className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-pink-300/30 blur-3xl" />
      <motion.div style={{ y: y2 }} className="pointer-events-none absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-amber-300/30 blur-3xl" />
      <motion.div style={{ y: y3 }} className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-fuchsia-300/20 blur-3xl" />
    </div>
  )
}
