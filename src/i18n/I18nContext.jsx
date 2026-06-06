import { createContext, useContext, useMemo } from 'react'
import { UI } from './strings.js'

export const LANGS = ['mk', 'en']
export const DEFAULT_LANG = 'mk'

export const LANG_LABELS = {
  mk: { short: 'МК', name: 'Македонски' },
  en: { short: 'EN', name: 'English' },
}

export function isLang(x) {
  return LANGS.includes(x)
}

const I18nContext = createContext(null)

function get(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj)
}

export function I18nProvider({ lang, children }) {
  const value = useMemo(() => {
    const safe = LANGS.includes(lang) ? lang : DEFAULT_LANG
    const dict = UI[safe]

    // UI string by dot-path. Falls back to the key so missing copy is obvious.
    const t = (key) => {
      const v = get(dict, key)
      return v == null ? key : v
    }

    // Resolve a bilingual data value { mk, en } to the current language.
    const pick = (obj) => {
      if (obj && typeof obj === 'object' && 'mk' in obj) return obj[safe] ?? obj[DEFAULT_LANG]
      return obj
    }

    // Build a language-prefixed path: lp('/explore') -> '/mk/explore'.
    const lp = (path = '') => {
      const p = path.startsWith('/') ? path : `/${path}`
      return `/${safe}${p === '/' ? '' : p}`
    }

    return { lang: safe, t, pick, lp }
  }, [lang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}

/** Swap the leading language segment of a path, preserving the rest. */
export function swapLangInPath(pathname, nextLang) {
  const parts = pathname.split('/').filter(Boolean)
  if (LANGS.includes(parts[0])) parts[0] = nextLang
  else parts.unshift(nextLang)
  return '/' + parts.join('/')
}
