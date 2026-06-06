import { Link } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'

const COLS = [
  {
    title: 'Explore',
    links: [
      { to: '/explore', label: 'Explore Data' },
      { to: '/topics', label: 'Topic Deep Dives' },
      { to: '/check', label: 'Wellbeing Check' },
      { to: '/resources', label: 'Resources' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-paper">
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
              <span className="font-display text-lg text-ink">Youth Wellbeing</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              A HBSC-inspired digital experience that turns adolescent wellbeing data into
              stories, reflection and practical support.
            </p>
          </div>

          {COLS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-2xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="link-quiet text-sm">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="text-2xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
              If you need support now
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              This is a reflective tool, not a medical service. If you’re struggling, talk to
              someone you trust — a friend, family member, teacher or counsellor.
            </p>
            <a
              href="https://www.who.int/health-topics/adolescent-health"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:underline"
            >
              <Icon name="LifeBuoy" className="h-4 w-4" />
              Find youth support
              <Icon name="ArrowUpRight" className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center">
          <p>
            © {2026} Youth Wellbeing. Built as a student project with HBSC-inspired,
            illustrative data.
          </p>
          <p>Data shown is simulated for educational purposes.</p>
        </div>
      </div>
    </footer>
  )
}
