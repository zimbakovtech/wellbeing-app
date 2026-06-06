// Scoring for the Wellbeing Check. Pure functions — no side effects — so the
// result page is easy to reason about and test.

import { QUESTIONS, DIMENSIONS, MAX_PER_QUESTION } from '../data/questions.js'

const DIM_KEYS = Object.keys(DIMENSIONS)

/**
 * @param {Record<string, number>} answers  questionId -> chosen value (0–3)
 * @returns {{
 *   overall: number,
 *   dimensions: Array<{ id, label, accent, topicId, score }>,
 *   band: { id, title, message },
 *   focus: Array<dimension>,   // up to 2 lowest dimensions
 *   strengths: Array<dimension> // up to 2 highest dimensions
 * }}
 */
export function scoreAssessment(answers) {
  // Collect raw points per dimension.
  const buckets = Object.fromEntries(DIM_KEYS.map((k) => [k, []]))
  for (const q of QUESTIONS) {
    const v = answers[q.id]
    if (typeof v === 'number') buckets[q.dimension].push(v)
  }

  const dimensions = DIM_KEYS.map((id) => {
    const vals = buckets[id]
    const score = vals.length
      ? Math.round((vals.reduce((s, v) => s + v, 0) / (vals.length * MAX_PER_QUESTION)) * 100)
      : 0
    return { id, ...DIMENSIONS[id], score }
  })

  const overall = Math.round(dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length)

  const sortedAsc = [...dimensions].sort((a, b) => a.score - b.score)
  const focus = sortedAsc.slice(0, 2)
  const strengths = [...dimensions].sort((a, b) => b.score - a.score).slice(0, 2)

  return { overall, dimensions, band: bandFor(overall), focus, strengths }
}

function bandFor(overall) {
  if (overall >= 75)
    return {
      id: 'thriving',
      title: 'Thriving and balanced',
      message:
        'Your habits and supports are working in your favour. Keep noticing what helps — and lean on it when life gets busier.',
    }
  if (overall >= 60)
    return {
      id: 'steady',
      title: 'Steady, with room to grow',
      message:
        'A solid foundation overall. A small, focused change in one area could lift how the rest of your week feels.',
    }
  if (overall >= 45)
    return {
      id: 'finding',
      title: 'Finding your footing',
      message:
        'Some parts are working harder than others right now. That is normal — picking one gentle place to start can make a real difference.',
    }
  return {
    id: 'low',
    title: 'Running a little low',
    message:
      'A few areas are asking for some care at the moment. Be kind to yourself, start small, and remember that reaching out to someone you trust is a strength.',
  }
}

/** Total number of questions — used for the progress indicator. */
export const TOTAL_QUESTIONS = QUESTIONS.length
