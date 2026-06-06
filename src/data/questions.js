// Wellbeing Check — a short, reflective self-assessment (not a diagnostic tool).
//
// Each question maps to one wellbeing dimension and offers four options scored
// 0–3, where 3 always represents the healthier pattern. Dimensions mirror the
// explore topics so results connect straight back to the rest of the app.

export const DIMENSIONS = {
  sleep: { label: 'Sleep', accent: 'sleep', topicId: 'sleep' },
  stress: { label: 'Stress', accent: 'stress', topicId: 'stress' },
  activity: { label: 'Activity', accent: 'activity', topicId: 'activity' },
  connection: { label: 'Connection', accent: 'loneliness', topicId: 'loneliness' },
  digital: { label: 'Digital balance', accent: 'digital', topicId: 'digital' },
  school: { label: 'School', accent: 'school', topicId: 'school' },
}

export const QUESTIONS = [
  {
    id: 'sleep_hours',
    dimension: 'sleep',
    text: 'On a typical school night, how much sleep do you get?',
    help: 'Most teenagers feel best on 8–10 hours.',
    options: [
      { label: 'Less than 6 hours', value: 0 },
      { label: 'About 6–7 hours', value: 1 },
      { label: 'About 7–8 hours', value: 2 },
      { label: '8 hours or more', value: 3 },
    ],
  },
  {
    id: 'sleep_rested',
    dimension: 'sleep',
    text: 'How rested do you feel on school mornings?',
    options: [
      { label: 'Rarely rested', value: 0 },
      { label: 'Sometimes', value: 1 },
      { label: 'Often rested', value: 2 },
      { label: 'Almost always', value: 3 },
    ],
  },
  {
    id: 'stress_school',
    dimension: 'stress',
    text: 'How often do you feel stressed by schoolwork?',
    options: [
      { label: 'Almost always', value: 0 },
      { label: 'Often', value: 1 },
      { label: 'Sometimes', value: 2 },
      { label: 'Rarely', value: 3 },
    ],
  },
  {
    id: 'stress_cope',
    dimension: 'stress',
    text: 'When pressure builds up, I have a way to deal with it.',
    options: [
      { label: 'Rarely true', value: 0 },
      { label: 'Sometimes true', value: 1 },
      { label: 'Often true', value: 2 },
      { label: 'Almost always true', value: 3 },
    ],
  },
  {
    id: 'activity_days',
    dimension: 'activity',
    text: 'In a usual week, how many days are you active for about an hour?',
    help: 'Anything that gets you moving and a little out of breath counts.',
    options: [
      { label: '0–1 days', value: 0 },
      { label: '2–3 days', value: 1 },
      { label: '4–5 days', value: 2 },
      { label: '6–7 days', value: 3 },
    ],
  },
  {
    id: 'connection_support',
    dimension: 'connection',
    text: 'How often do you feel supported by friends or family?',
    options: [
      { label: 'Rarely', value: 0 },
      { label: 'Sometimes', value: 1 },
      { label: 'Often', value: 2 },
      { label: 'Almost always', value: 3 },
    ],
  },
  {
    id: 'connection_lonely',
    dimension: 'connection',
    text: 'How often do you feel lonely?',
    options: [
      { label: 'Almost always', value: 0 },
      { label: 'Often', value: 1 },
      { label: 'Sometimes', value: 2 },
      { label: 'Rarely', value: 3 },
    ],
  },
  {
    id: 'digital_interfere',
    dimension: 'digital',
    text: 'How often does screen time get in the way of sleep, plans or focus?',
    options: [
      { label: 'Almost always', value: 0 },
      { label: 'Often', value: 1 },
      { label: 'Sometimes', value: 2 },
      { label: 'Rarely', value: 3 },
    ],
  },
  {
    id: 'digital_feel',
    dimension: 'digital',
    text: 'After spending time online, I usually feel…',
    options: [
      { label: 'Worse than before', value: 0 },
      { label: 'A bit drained', value: 1 },
      { label: 'About the same', value: 2 },
      { label: 'Better or recharged', value: 3 },
    ],
  },
  {
    id: 'school_look_forward',
    dimension: 'school',
    text: 'How often do you look forward to going to school?',
    options: [
      { label: 'Rarely', value: 0 },
      { label: 'Sometimes', value: 1 },
      { label: 'Often', value: 2 },
      { label: 'Almost always', value: 3 },
    ],
  },
]

export const MAX_PER_QUESTION = 3
