import { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/utils.js'
import Icon from '../ui/Icon.jsx'
import Button from '../ui/Button.jsx'
import { useI18n, LANGS, LANG_LABELS, swapLangInPath } from '../../i18n/I18nContext.jsx'

function Wordmark({ to, label, onClick }) {
  return (
    <Link to={to} onClick={onClick} className="group flex items-center gap-2.5" aria-label={label}>
      <img
        src="/favicon.png"
        alt=""
        width="36"
        height="36"
        className="h-9 w-9 rounded-xl object-cover transition-transform duration-300 ease-gentle group-hover:-rotate-6"
      />
      <span className="font-display text-lg font-medium tracking-tight text-ink">{label}</span>
    </Link>
  )
}

function LangSwitch({ className, scope = 'd' }) {
  const { lang, t } = useI18n()
  const location = useLocation()
  const navigate = useNavigate()
  const reduce = useReducedMotion()

  const go = (next) => {
    if (next === lang) return
    try {
      localStorage.setItem('wb-lang', next)
    } catch {
      /* storage may be unavailable; default routing still works */
    }
    navigate(swapLangInPath(location.pathname, next) + location.hash, { replace: false })
  }

  return (
    <div
      role="group"
      aria-label={t('langSwitch')}
      className={cn('inline-flex rounded-full border border-line bg-paper p-0.5', className)}
    >
      {LANGS.map((code) => {
        const active = code === lang
        return (
          <button
            key={code}
            onClick={() => go(code)}
            aria-pressed={active}
            className={cn(
              'relative cursor-pointer rounded-full px-2.5 py-1 text-xs font-semibold transition-colors duration-200 active:scale-95',
              active ? 'text-ink' : 'text-ink-faint hover:text-ink',
            )}
          >
            {active && (
              <motion.span
                layoutId={`lang-active-${scope}`}
                className="absolute inset-0 rounded-full bg-surface shadow-soft"
                transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10">{LANG_LABELS[code].short}</span>
          </button>
        )
      })}
    </div>
  )
}

export default function Navbar() {
  const { t, lp } = useI18n()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const reduce = useReducedMotion()
  const closeRef = useRef(null)

  const NAV = [
    { to: lp('/'), label: t('nav.home'), end: true },
    { to: lp('/explore'), label: t('nav.explore') },
    { to: lp('/topics'), label: t('nav.topics') },
    { to: lp('/check'), label: t('nav.check') },
    { to: lp('/resources'), label: t('nav.resources') },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on route change.
  useEffect(() => setOpen(false), [location.pathname])

  // Lock scroll, close on Escape, and move focus into the drawer while open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) {
      const onKey = (e) => e.key === 'Escape' && setOpen(false)
      window.addEventListener('keydown', onKey)
      const id = requestAnimationFrame(() => closeRef.current?.focus())
      return () => {
        window.removeEventListener('keydown', onKey)
        cancelAnimationFrame(id)
        document.body.style.overflow = ''
      }
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Staggered entrance for the drawer links (skipped under reduced motion).
  const listV = { closed: {}, open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }
  const itemV = reduce
    ? { closed: { opacity: 1 }, open: { opacity: 1 } }
    : { closed: { opacity: 0, x: 20 }, open: { opacity: 1, x: 0 } }

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-300 ease-gentle',
        scrolled ? 'border-b border-line bg-paper/85 backdrop-blur-md' : 'border-b border-transparent bg-paper/0',
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between sm:h-[4.5rem]">
        <Wordmark to={lp('/')} label={t('brand')} />

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
          <li className="ml-2 flex items-center gap-2">
            <LangSwitch />
            <Button to={lp('/check')} size="sm" variant="primary" iconRight="ArrowRight">
              {t('common.startCheck')}
            </Button>
          </li>
        </ul>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <LangSwitch scope="m" />
          <button
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-ink transition-colors hover:bg-ink/[0.05] active:scale-95"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Icon name="Menu" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer — slides in from the right */}
      <AnimatePresence>
        {open && (
          <div className="md:hidden">
            {/* Scrim */}
            <motion.div
              className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.25 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label={t('nav.home')}
              className="fixed right-0 top-0 z-50 flex h-dvh w-[82%] max-w-xs flex-col border-l border-line bg-paper shadow-lift"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 360, damping: 38 }}
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <Wordmark to={lp('/')} label={t('brand')} onClick={() => setOpen(false)} />
                <button
                  ref={closeRef}
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-ink transition-colors hover:bg-ink/[0.05] active:scale-95"
                >
                  <Icon name="X" />
                </button>
              </div>

              <motion.ul
                className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4"
                variants={listV}
                initial="closed"
                animate="open"
              >
                {NAV.map((item) => (
                  <motion.li key={item.to} variants={itemV}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors',
                          isActive ? 'bg-ink/[0.05] text-ink' : 'text-ink-soft hover:bg-ink/[0.04]',
                        )
                      }
                    >
                      {item.label}
                      <Icon name="ChevronRight" className="h-4 w-4 text-ink-faint" />
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="border-t border-line p-4">
                <Button to={lp('/check')} className="w-full" iconRight="ArrowRight">
                  {t('common.takeCheck')}
                </Button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </header>
  )
}
