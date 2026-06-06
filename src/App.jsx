import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout.jsx'
import ScrollToTop from './components/layout/ScrollToTop.jsx'
import PageTransition from './components/layout/PageTransition.jsx'

// Route-level code splitting keeps the chart libraries off the initial load —
// each page (and the recharts it needs) is fetched on first visit.
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

export default function App() {
  const location = useLocation()
  return (
    <>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          {/* mode="wait" cross-fades pages; the persistent shell stays mounted. */}
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={page(<Home />)} />
              <Route path="/explore" element={page(<Explore />)} />
              <Route path="/topics" element={page(<Topics />)} />
              <Route path="/topics/:topicId" element={page(<TopicDetail />)} />
              <Route path="/check" element={page(<WellbeingCheck />)} />
              <Route path="/resources" element={page(<Resources />)} />
              <Route path="*" element={page(<NotFound />)} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </Layout>
    </>
  )
}
