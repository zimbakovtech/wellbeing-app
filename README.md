# Youth Wellbeing

A HBSC-inspired digital experience that turns adolescent wellbeing data into stories,
reflection and practical support. Built as a college project — a calm, editorial,
data-informed product rather than a dashboard.

**Live:** https://wellbeing.zimbakov.dev

---

## What it does

Five focused pages, one clear journey: **understand → reflect → act.**

| Page | Route | Purpose |
|------|-------|---------|
| **Home** | `/` | Premium hero, sample statistics, an HBSC explainer and the six themes. |
| **Explore Data** | `/explore` | Interactive charts (trend, gender gap, radar profile, heatmap) with age/gender/topic filters and a plain-language "what this means" panel that updates live. |
| **Topic Deep Dives** | `/topics`, `/topics/:id` | A short, readable story per theme: overview, why it matters, charts, three tips and a reflection prompt. |
| **Wellbeing Check** | `/check` | A private, ten-question self-assessment with a stepped flow, progress bar, animated score ring, radar profile and matched recommendations. *Reflective, not diagnostic.* |
| **Resources** | `/resources` | A guided breathing exercise, micro-practices and a filterable library of practical recommendations. |

Themes covered: **sleep, stress, physical activity, loneliness, digital balance, school satisfaction.**

## Design

- **Type:** Fraunces (editorial display serif) + Inter (UI/body)
- **Palette:** warm off-white paper, charcoal ink, muted slate-blue primary, calm desaturated topic accents
- **Motion:** subtle fade/lift, page cross-fades, animated charts — all respect `prefers-reduced-motion`
- **A11y:** keyboard-navigable, visible focus rings, skip link, semantic landmarks, charts carry text takeaways and per-cell values so meaning never relies on colour alone

## Tech stack

- **Vite** + **React 18** + **React Router 6**
- **Tailwind CSS** (custom design tokens in `tailwind.config.js`)
- **Recharts** for charts; a custom CSS-grid heatmap
- **Framer Motion** for motion and route transitions
- **lucide-react** icons (single, tree-shaken registry)

All data is local and static — no backend, no runtime dependencies. The figures are
**simulated, HBSC-inspired** values: they reproduce the well-documented shapes (most
indices declining from age 11 → 15, widening boy/girl gaps) without copying official tables.

## Project structure

```
src/
  data/          topics, datasets, questions, recommendations  (the data model)
  lib/           scoring + small utilities
  components/
    ui/          Button, Card, Pill, SegmentedControl, Section, Reveal, Icon…
    charts/      ChartCard + Line/Bar/Radar/Donut views + HeatmapMatrix
    layout/      Navbar, Footer, Layout, ScrollToTop, PageTransition
    *.jsx        TopicCard, InsightCard, RecommendationCard, StatCard
  pages/         Home, Explore, Topics, TopicDetail, WellbeingCheck, Resources, NotFound
```

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

Requires Node 18+ (CI uses Node 20).

## Deployment — GitHub Pages + custom domain

This repo deploys to **https://wellbeing.zimbakov.dev** automatically.

1. **GitHub Actions** ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) builds and
   publishes `dist/` to Pages on every push to `main`. In the repo: **Settings → Pages →
   Build and deployment → Source: GitHub Actions**.
2. **Custom domain** — [`public/CNAME`](public/CNAME) sets `wellbeing.zimbakov.dev`, so the
   site serves from the domain root (`base: '/'` in `vite.config.js`). Point a DNS `CNAME`
   record for `wellbeing` at `<username>.github.io`.
3. **Client-side routing** — Pages has no SPA rewrite, so [`public/404.html`](public/404.html)
   stores the requested deep link and bounces to the app, which restores it via the History
   API (script in `index.html`). Deep links like `/explore` and `/topics/sleep` work and are
   shareable.

---

*Built with care for a college project. This is a reflective wellbeing tool, not a medical
service — if anything here feels heavy, talk to someone you trust.*
