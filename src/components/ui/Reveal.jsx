import { motion, useReducedMotion } from 'framer-motion'

/**
 * Scroll-into-view reveal. Subtle fade + lift, once. Respects reduced-motion:
 * when the user prefers reduced motion it renders content immediately, no shift.
 */
export default function Reveal({ children, delay = 0, y = 12, className, as = 'div' }) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  )
}
