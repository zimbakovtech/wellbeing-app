import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/utils.js'
import Icon from '../ui/Icon.jsx'
import Button from '../ui/Button.jsx'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/explore', label: 'Explore Data' },
  { to: '/topics', label: 'Topics' },
  { to: '/check', label: 'Wellbeing Check' },
  { to: '/resources', label: 'Resources' },
]

function Wordmark() {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="Youth Wellbeing — home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-paper transition-transform duration-300 ease-gentle group-hover:-rotate-6">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M4 15c2 0 2-7 4-7s2 7 4 7 2-7 4-7"
            stroke="#7298C2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-display text-lg font-medium tracking-tight text-ink">
        Youth Wellbeing
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on route change.
  useEffect(() => setOpen(false), [location.pathname])

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-300 ease-gentle',
        scrolled
          ? 'border-b border-line bg-paper/85 backdrop-blur-md'
          : 'border-b border-transparent bg-paper/0',
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between sm:h-[4.5rem]">
        <Wordmark />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200',
                    isActive ? 'text-ink' : 'text-ink-muted hover:text-ink',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-ink"
                        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
          <li className="ml-2">
            <Button to="/check" size="sm" variant="primary" iconRight="ArrowRight">
              Start check
            </Button>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-ink transition-colors hover:bg-ink/[0.05] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <Icon name={open ? 'X' : 'Menu'} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container-page border-t border-line bg-paper/95 pb-5 pt-2 backdrop-blur-md">
              <ul className="flex flex-col">
                {NAV.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors',
                          isActive ? 'bg-ink/[0.05] text-ink' : 'text-ink-soft hover:bg-ink/[0.03]',
                        )
                      }
                    >
                      {item.label}
                      <Icon name="ChevronRight" className="h-4 w-4 text-ink-faint" />
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="mt-3 px-4">
                <Button to="/check" className="w-full" iconRight="ArrowRight">
                  Start the wellbeing check
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
