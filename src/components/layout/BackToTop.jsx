import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Icon from '../ui/Icon.jsx'

/** Floating "back to top" control - fades in once the page is scrolled. */
export default function BackToTop() {
  const [show, setShow] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-5 right-5 z-40 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-surface/90 text-ink shadow-lift backdrop-blur-md transition-colors hover:bg-surface active:scale-95"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <Icon name="ArrowUp" className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
