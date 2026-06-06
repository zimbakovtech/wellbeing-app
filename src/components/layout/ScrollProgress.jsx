import { motion, useScroll } from 'framer-motion'

/**
 * Thin reading-progress bar pinned to the very top of the viewport. Driven by
 * scroll position (not a timed animation), so it's safe under reduced motion.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
