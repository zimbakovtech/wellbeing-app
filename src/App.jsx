import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout.jsx'
import ScrollToTop from './components/layout/ScrollToTop.jsx'
import PageTransition from './components/layout/PageTransition.jsx'
import { I18nProvider, isLang, DEFAULT_LANG, LANGS } from './i18n/I18nContext.jsx'

// Route-level code splitting keeps the chart libraries off the initial load.
const Home = lazy(() => import('./pages/Home.jsx'))
const Explore = lazy(() => import('./pages/Explore.jsx'))
const Topics = lazy(() => import('./pages/Topics.jsx'))
const TopicDetail = lazy(() => import('./pages/TopicDetail.jsx'))
const WellbeingCheck = lazy(() => import('./pages/WellbeingCheck.jsx'))
const Resources = lazy(() => import('./pages/Resources.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

const page = (el) => <PageTransition>{el}</PageTransition>

function PageLoader() {
  return (
    <div className="container-page flex min-h-[60vh] items-center justify-center" aria-busy="true">
      <span className="h-7 w-7 animate-spin rounded-full border-2 border-line border-t-ink" aria-label="Loading" />
    </div>
  )
}

/** Pick the preferred language: stored choice, else Macedonian (primary). */
function preferredLang() {
  try {
    const stored = localStorage.getItem('wb-lang')
    if (isLang(stored)) return stored
  } catch {
    /* storage may be unavailable */
  }
  return DEFAULT_LANG
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${preferredLang()}`} replace />} />
      <Route path=":lang/*" element={<LocalizedApp />} />
    </Routes>
  )
}

function LocalizedApp() {
  const { lang } = useParams()
  const location = useLocation()

  // Keep <html lang> in sync (hooks must run unconditionally — guard inside).
  useEffect(() => {
    if (isLang(lang)) document.documentElement.lang = lang
  }, [lang])

  // Unknown leading segment (e.g. an old un-prefixed deep link) → send it to the
  // preferred language, preserving the rest of the path.
  if (!isLang(lang)) {
    const rest = location.pathname.replace(/^\/+/, '')
    return <Navigate to={`/${preferredLang()}/${rest}`} replace />
  }

  return (
    <I18nProvider lang={lang}>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait" initial={false} key={lang}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={page(<Home />)} />
              <Route path="explore" element={page(<Explore />)} />
              <Route path="topics" element={page(<Topics />)} />
              <Route path="topics/:topicId" element={page(<TopicDetail />)} />
              <Route path="check" element={page(<WellbeingCheck />)} />
              <Route path="resources" element={page(<Resources />)} />
              <Route path="*" element={page(<NotFound />)} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </Layout>
    </I18nProvider>
  )
}

export { LANGS }
