// Scoring for the Wellbeing Check. Pure functions, language-agnostic - they
// return ids and numbers; the UI resolves band titles/messages and dimension
// labels through i18n.

import { QUESTIONS, DIMENSIONS, MAX_PER_QUESTION } from '../data/questions.js'

const DIM_KEYS = Object.keys(DIMENSIONS)

/**
 * @param {Record<string, number>} answers  questionId -> chosen value (0–3)
 * @returns {{
 *   overall: number,
 *   dimensions: Array<{ id, label, accent, topicId, score }>,
 *   bandId: 'thriving'|'steady'|'finding'|'low',
 *   focus: Array<dimension>,    // up to 2 lowest dimensions
 *   strengths: Array<dimension> // up to 2 highest dimensions
 * }}
 */
export function scoreAssessment(answers) {
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

  return {
    overall,
    dimensions,
    bandId: bandFor(overall),
    focus: sortedAsc.slice(0, 2),
    strengths: [...dimensions].sort((a, b) => b.score - a.score).slice(0, 2),
  }
}

function bandFor(overall) {
  if (overall >= 75) return 'thriving'
  if (overall >= 60) return 'steady'
  if (overall >= 45) return 'finding'
  return 'low'
}

export const TOTAL_QUESTIONS = QUESTIONS.length
