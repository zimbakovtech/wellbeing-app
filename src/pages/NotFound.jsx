import Button from '../components/ui/Button.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'

export default function NotFound() {
  const { t, lp } = useI18n()
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="eyebrow">
        <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
        {t('notFound.code')}
      </span>
      <h1 className="mt-5 max-w-lg text-4xl leading-tight text-balance sm:text-5xl">{t('notFound.title')}</h1>
      <p className="mt-4 max-w-md text-lg text-ink-muted">{t('notFound.lead')}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button to={lp('/')} icon="ArrowLeft">
          {t('notFound.backHome')}
        </Button>
        <Button to={lp('/explore')} variant="secondary" iconRight="ArrowRight">
          {t('common.exploreData')}
        </Button>
      </div>
    </section>
  )
}
