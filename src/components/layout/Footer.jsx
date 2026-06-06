import { Link } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'
import { useI18n } from '../../i18n/I18nContext.jsx'

export default function Footer() {
  const { t, lp } = useI18n()

  const links = [
    { to: lp('/explore'), label: t('nav.explore') },
    { to: lp('/topics'), label: t('nav.topics') },
    { to: lp('/check'), label: t('nav.check') },
    { to: lp('/resources'), label: t('nav.resources') },
  ]

  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <img src="/favicon.png" alt="" aria-hidden="true" className="h-9 w-9 rounded-xl" />
              <span className="font-display text-lg text-ink">{t('brand')}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{t('footer.tagline')}</p>
          </div>

          <nav aria-label={t('footer.exploreCol')}>
            <h3 className="text-2xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
              {t('footer.exploreCol')}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-quiet text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-2xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
              {t('footer.supportTitle')}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{t('footer.supportText')}</p>
            <a
              href="https://www.who.int/health-topics/adolescent-health"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:underline"
            >
              <Icon name="LifeBuoy" className="h-4 w-4" />
              {t('footer.findSupport')}
              <Icon name="ArrowUpRight" className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center">
          <p>{t('footer.rights')}</p>
          <p>{t('footer.dataNote')}</p>
        </div>
      </div>
    </footer>
  )
}
