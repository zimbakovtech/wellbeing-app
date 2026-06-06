import Button from '../components/ui/Button.jsx'

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="eyebrow">
        <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
        404
      </span>
      <h1 className="mt-5 max-w-lg text-4xl leading-tight text-balance sm:text-5xl">
        This page took a moment for itself.
      </h1>
      <p className="mt-4 max-w-md text-lg text-ink-muted">
        We couldn’t find what you were looking for — but the rest of the experience is right
        here.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button to="/" icon="ArrowLeft">
          Back to home
        </Button>
        <Button to="/explore" variant="secondary" iconRight="ArrowRight">
          Explore the data
        </Button>
      </div>
    </section>
  )
}
