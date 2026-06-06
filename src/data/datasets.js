// Wellbeing index dataset.
//
// Every topic is expressed on a single 0–100 "wellbeing index" where higher is
// always better (so the radar / heatmap read consistently, even for topics like
// stress or loneliness that are framed negatively in the real world).
//
// Values are HBSC-inspired simulated figures: they reproduce the well-documented
// shapes — most indices decline from age 11 → 15, and several gaps widen between
// boys and girls — without claiming to be official statistics.

import { TOPICS, TOPIC_MAP } from './topics.js'

export const AGES = [11, 13, 15]

export const GENDERS = [
  { id: 'all', label: 'All' },
  { id: 'female', label: 'Girls' },
  { id: 'male', label: 'Boys' },
]

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

// Derive the "all" series as the mean of girls + boys.
for (const id of Object.keys(SCORES)) {
  const { female, male } = SCORES[id]
  SCORES[id].all = female.map((v, i) => avg(v, male[i]))
}

const ageIndex = (age) => AGES.indexOf(age)

/** Single index value for a topic at a given gender + age. */
export function getScore(topicId, gender, age) {
  return SCORES[topicId]?.[gender]?.[ageIndex(age)] ?? null
}

/** Series across all ages for a topic + gender — shaped for line/bar charts. */
export function getAgeSeries(topicId, gender) {
  return AGES.map((age) => ({
    age: `Age ${age}`,
    ageNum: age,
    value: getScore(topicId, gender, age),
  }))
}

/**
 * Comparison series for one topic across ages, split by gender — used for the
 * grouped bar chart so the boy/girl gap is visible.
 */
export function getGenderComparison(topicId) {
  return AGES.map((age) => ({
    age: `Age ${age}`,
    Girls: getScore(topicId, 'female', age),
    Boys: getScore(topicId, 'male', age),
  }))
}

/** Radar profile across every topic for a fixed gender + age. */
export function getRadarProfile(gender, age) {
  return TOPICS.map((t) => ({
    topic: t.name,
    topicId: t.id,
    value: getScore(t.id, gender, age),
    fullMark: 100,
  }))
}

/** Topic × age matrix for the heatmap, for a fixed gender. */
export function getHeatmap(gender) {
  return TOPICS.map((t) => ({
    topicId: t.id,
    topic: t.name,
    values: AGES.map((age) => ({ age, value: getScore(t.id, gender, age) })),
  }))
}

/**
 * Distribution for the donut: bucket the chosen topic+gender+age index into a
 * "thriving / coping / struggling" split. Buckets are derived from the headline
 * index so the donut always agrees with the other charts.
 */
export function getDistribution(topicId, gender, age) {
  const score = getScore(topicId, gender, age) ?? 60
  const thriving = Math.round(score * 0.85)
  const struggling = Math.round((100 - score) * 0.7)
  const coping = 100 - thriving - struggling
  return [
    { name: 'Thriving', value: thriving },
    { name: 'Coping', value: coping },
    { name: 'Struggling', value: struggling },
  ]
}

/** Overall wellbeing index = mean across all topics for a gender + age. */
export function getOverallIndex(gender, age) {
  const vals = TOPICS.map((t) => getScore(t.id, gender, age))
  return Math.round(vals.reduce((s, v) => s + v, 0) / vals.length)
}

/** Topic with the steepest decline between 11 and 15 (for headline insight). */
export function getSteepestDecline(gender = 'all') {
  let worst = null
  for (const t of TOPICS) {
    const s = SCORES[t.id][gender]
    const drop = s[0] - s[s.length - 1]
    if (!worst || drop > worst.drop) worst = { topic: t, drop }
  }
  return worst
}

export { TOPIC_MAP }
