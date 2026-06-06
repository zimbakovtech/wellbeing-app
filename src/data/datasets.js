// Wellbeing index dataset.
//
// Every topic sits on one 0–100 "wellbeing index" where higher is always better
// (so radar reads consistently even for negatively-framed topics like stress).
// Values are HBSC-inspired and simulated: they reproduce the documented shapes
// (indices declining 11 → 15, widening boy/girl gaps) without being official.
//
// Accessors return numbers, bare age labels and bilingual { mk, en } topic
// names; pages localize the names before passing them to charts.

import { TOPICS, TOPIC_MAP } from './topics.js'

export const AGES = [11, 13, 15]

export const GENDERS = ['all', 'female', 'male'] // labels resolved via i18n

// score[topicId][gender] = [age11, age13, age15]
const SCORES = {
  sleep: { female: [79, 66, 54], male: [80, 71, 63] },
  stress: { female: [78, 60, 44], male: [83, 72, 60] },
  activity: { female: [70, 58, 47], male: [78, 69, 62] },
  loneliness: { female: [80, 68, 56], male: [84, 76, 68] },
  digital: { female: [74, 62, 52], male: [78, 70, 62] },
  school: { female: [80, 66, 56], male: [78, 68, 60] },
}

const avg = (a, b) => Math.round((a + b) / 2)
for (const id of Object.keys(SCORES)) {
  const { female, male } = SCORES[id]
  SCORES[id].all = female.map((v, i) => avg(v, male[i]))
}

const ageIndex = (age) => AGES.indexOf(age)

export function getScore(topicId, gender, age) {
  return SCORES[topicId]?.[gender]?.[ageIndex(age)] ?? null
}

/** Series across ages for line charts: [{ name: '11', value }]. */
export function getAgeSeries(topicId, gender) {
  return AGES.map((age) => ({ name: String(age), value: getScore(topicId, gender, age) }))
}

/** Girls vs boys for one topic across ages, for the grouped bar chart. */
export function getGenderComparison(topicId) {
  return AGES.map((age) => ({
    age: String(age),
    Girls: getScore(topicId, 'female', age),
    Boys: getScore(topicId, 'male', age),
  }))
}

/** Radar profile across every topic; `name` is bilingual, localize in the page. */
export function getRadarProfile(gender, age) {
  return TOPICS.map((t) => ({
    topicId: t.id,
    name: t.name,
    value: getScore(t.id, gender, age),
  }))
}

/** Thriving / coping / struggling split, keyed (localize the labels in the UI). */
export function getDistribution(topicId, gender, age) {
  const score = getScore(topicId, gender, age) ?? 60
  const thriving = Math.round(score * 0.85)
  const struggling = Math.round((100 - score) * 0.7)
  const coping = 100 - thriving - struggling
  return [
    { key: 'thriving', value: thriving },
    { key: 'coping', value: coping },
    { key: 'struggling', value: struggling },
  ]
}

/** Overall index = mean across all topics for a gender + age. */
export function getOverallIndex(gender, age) {
  const vals = TOPICS.map((t) => getScore(t.id, gender, age))
  return Math.round(vals.reduce((s, v) => s + v, 0) / vals.length)
}

export { TOPIC_MAP }
