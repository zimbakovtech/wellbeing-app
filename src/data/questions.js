// Wellbeing Check - a short, reflective self-assessment (not diagnostic).
// Bilingual { mk, en }. Each question maps to one dimension; options scored 0–3
// where 3 is always the healthier pattern. Dimensions mirror the explore topics.

const L = (mk, en) => ({ mk, en })

export const DIMENSIONS = {
  sleep: { label: L('Сон', 'Sleep'), accent: 'sleep', topicId: 'sleep' },
  stress: { label: L('Стрес', 'Stress'), accent: 'stress', topicId: 'stress' },
  activity: { label: L('Активност', 'Activity'), accent: 'activity', topicId: 'activity' },
  connection: { label: L('Поврзаност', 'Connection'), accent: 'loneliness', topicId: 'loneliness' },
  digital: { label: L('Дигитална рамнотежа', 'Digital balance'), accent: 'digital', topicId: 'digital' },
  school: { label: L('Училиште', 'School'), accent: 'school', topicId: 'school' },
}

export const QUESTIONS = [
  {
    id: 'sleep_hours',
    dimension: 'sleep',
    text: L('Во вообичаена училишна ноќ, колку спиеш?', 'On a typical school night, how much sleep do you get?'),
    help: L('Повеќето тинејџери се најдобро на 8–10 часа.', 'Most teenagers feel best on 8–10 hours.'),
    options: [
      { label: L('Помалку од 6 часа', 'Less than 6 hours'), value: 0 },
      { label: L('Околу 6–7 часа', 'About 6–7 hours'), value: 1 },
      { label: L('Околу 7–8 часа', 'About 7–8 hours'), value: 2 },
      { label: L('8 часа или повеќе', '8 hours or more'), value: 3 },
    ],
  },
  {
    id: 'sleep_rested',
    dimension: 'sleep',
    text: L('Колку одморен се чувствуваш училишните утра?', 'How rested do you feel on school mornings?'),
    options: [
      { label: L('Ретко одморен', 'Rarely rested'), value: 0 },
      { label: L('Понекогаш', 'Sometimes'), value: 1 },
      { label: L('Често одморен', 'Often rested'), value: 2 },
      { label: L('Речиси секогаш', 'Almost always'), value: 3 },
    ],
  },
  {
    id: 'stress_school',
    dimension: 'stress',
    text: L('Колку често чувствуваш стрес од училиште?', 'How often do you feel stressed by schoolwork?'),
    options: [
      { label: L('Речиси секогаш', 'Almost always'), value: 0 },
      { label: L('Често', 'Often'), value: 1 },
      { label: L('Понекогаш', 'Sometimes'), value: 2 },
      { label: L('Ретко', 'Rarely'), value: 3 },
    ],
  },
  {
    id: 'stress_cope',
    dimension: 'stress',
    text: L('Кога ќе се натрупа притисок, имам начин да се справам.', 'When pressure builds up, I have a way to deal with it.'),
    options: [
      { label: L('Ретко точно', 'Rarely true'), value: 0 },
      { label: L('Понекогаш точно', 'Sometimes true'), value: 1 },
      { label: L('Често точно', 'Often true'), value: 2 },
      { label: L('Речиси секогаш точно', 'Almost always true'), value: 3 },
    ],
  },
  {
    id: 'activity_days',
    dimension: 'activity',
    text: L('Во вообичаена недела, колку денови си активен околу еден час?', 'In a usual week, how many days are you active for about an hour?'),
    help: L('Сѐ што те раздвижува и малку задишува се брои.', 'Anything that gets you moving and a little out of breath counts.'),
    options: [
      { label: L('0–1 ден', '0–1 days'), value: 0 },
      { label: L('2–3 дена', '2–3 days'), value: 1 },
      { label: L('4–5 дена', '4–5 days'), value: 2 },
      { label: L('6–7 дена', '6–7 days'), value: 3 },
    ],
  },
  {
    id: 'connection_support',
    dimension: 'connection',
    text: L('Колку често се чувствуваш поддржан од пријатели или семејство?', 'How often do you feel supported by friends or family?'),
    options: [
      { label: L('Ретко', 'Rarely'), value: 0 },
      { label: L('Понекогаш', 'Sometimes'), value: 1 },
      { label: L('Често', 'Often'), value: 2 },
      { label: L('Речиси секогаш', 'Almost always'), value: 3 },
    ],
  },
  {
    id: 'connection_lonely',
    dimension: 'connection',
    text: L('Колку често се чувствуваш осамено?', 'How often do you feel lonely?'),
    options: [
      { label: L('Речиси секогаш', 'Almost always'), value: 0 },
      { label: L('Често', 'Often'), value: 1 },
      { label: L('Понекогаш', 'Sometimes'), value: 2 },
      { label: L('Ретко', 'Rarely'), value: 3 },
    ],
  },
  {
    id: 'digital_interfere',
    dimension: 'digital',
    text: L('Колку често екраните пречат на сонот, плановите или фокусот?', 'How often does screen time get in the way of sleep, plans or focus?'),
    options: [
      { label: L('Речиси секогаш', 'Almost always'), value: 0 },
      { label: L('Често', 'Often'), value: 1 },
      { label: L('Понекогаш', 'Sometimes'), value: 2 },
      { label: L('Ретко', 'Rarely'), value: 3 },
    ],
  },
  {
    id: 'digital_feel',
    dimension: 'digital',
    text: L('По време поминато онлајн, обично се чувствувам…', 'After spending time online, I usually feel…'),
    options: [
      { label: L('Полошо од порано', 'Worse than before'), value: 0 },
      { label: L('Малку испразнето', 'A bit drained'), value: 1 },
      { label: L('Отприлика исто', 'About the same'), value: 2 },
      { label: L('Подобро или освежено', 'Better or recharged'), value: 3 },
    ],
  },
  {
    id: 'school_look_forward',
    dimension: 'school',
    text: L('Колку често со нетрпение чекаш да одиш на училиште?', 'How often do you look forward to going to school?'),
    options: [
      { label: L('Ретко', 'Rarely'), value: 0 },
      { label: L('Понекогаш', 'Sometimes'), value: 1 },
      { label: L('Често', 'Often'), value: 2 },
      { label: L('Речиси секогаш', 'Almost always'), value: 3 },
    ],
  },
]

export const MAX_PER_QUESTION = 3
