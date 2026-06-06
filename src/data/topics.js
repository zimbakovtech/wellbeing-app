// Topic catalogue — the editorial + data backbone of the app.
// Each topic carries its identity (icon, accent), human-language content
// (overview / why it matters / tips / reflection) and a relatable "raw"
// statistic used for storytelling on the deep-dive pages.
//
// Numbers are HBSC-inspired and believable, but are illustrative simulated
// figures created for this project — not a direct copy of official tables.

export const TOPICS = [
  {
    id: 'sleep',
    name: 'Sleep',
    accent: 'sleep',
    icon: 'Moon',
    tagline: 'The quiet foundation everything else is built on.',
    overview:
      'Sleep is when the adolescent brain consolidates memory, regulates mood and recovers. Most teenagers need 8–10 hours, yet school start times, screens and social life pull the other way.',
    why: 'Short sleep is linked with lower mood, weaker concentration in class and more conflict with others. It is one of the strongest everyday signals of how wellbeing is trending.',
    metricLabel: 'Sleep wellbeing index',
    stat: { value: '6.9h', label: 'Average on school nights at 15', sub: 'down from 8.4h at age 11' },
    insight: 'Sleep appears to decline steadily with age, with the sharpest drop between 13 and 15.',
    tips: [
      { title: 'Anchor your wake time', body: 'A consistent wake-up — even at weekends — steadies your body clock more than chasing extra hours.' },
      { title: 'Dim the last hour', body: 'Lower light and put the phone across the room. Screens in bed are the most common reason sleep slips.' },
      { title: 'Wind-down ritual', body: 'A short, repeatable routine — shower, stretch, read — signals to your brain that the day is closing.' },
    ],
    reflection: 'Do you feel genuinely rested on most school mornings?',
    raw: {
      label: 'Average hours slept on school nights',
      unit: 'h',
      series: { 11: 8.4, 13: 7.6, 15: 6.9 },
      reference: { value: 9, label: 'Recommended' },
    },
  },
  {
    id: 'stress',
    name: 'Stress',
    accent: 'stress',
    icon: 'HeartPulse',
    tagline: 'Pressure is normal — feeling crushed by it is the signal.',
    overview:
      'A little stress sharpens focus. Sustained pressure — from schoolwork, expectations and comparison — is what wears wellbeing down. Recognising it early is half the work.',
    why: 'School-related pressure rises through adolescence and is reported more often by girls. It shapes sleep, mood and how supported young people feel.',
    metricLabel: 'Low-stress wellbeing index',
    stat: { value: '46%', label: 'Feel pressured by schoolwork at 15', sub: 'up from 22% at age 11' },
    insight: 'Stress is higher among older students, and the gap between boys and girls widens with age.',
    tips: [
      { title: 'Name it to tame it', body: 'Writing down what is worrying you reduces its grip. Vague pressure feels bigger than the words for it.' },
      { title: 'Box breathing', body: 'Breathe in for four, hold four, out four, hold four. Two minutes resets a racing system.' },
      { title: 'Shrink the next step', body: 'Swap “finish the project” for “open the doc and write one line.” Momentum beats motivation.' },
    ],
    reflection: 'When you feel pressure, do you have a way to let it out?',
    raw: {
      label: 'Share feeling pressured by schoolwork',
      unit: '%',
      series: { 11: 22, 13: 34, 15: 46 },
      reference: null,
      invert: true,
    },
  },
  {
    id: 'activity',
    name: 'Physical Activity',
    accent: 'activity',
    icon: 'Footprints',
    tagline: 'Movement is medicine you already own.',
    overview:
      'Guidelines suggest around 60 minutes of moderate activity a day. Movement lifts mood and sleep as much as it builds the body — but activity tends to fall as teenagers get older.',
    why: 'Active young people report better mood, sleep and confidence. The decline through the teens — steeper for girls — is one of the clearest wellbeing patterns in the data.',
    metricLabel: 'Activity wellbeing index',
    stat: { value: '1 in 5', label: 'Meet daily activity guidelines at 15', sub: 'compared with 1 in 3 at age 11' },
    insight: 'Daily activity falls with age, and fewer girls than boys reach the recommended hour.',
    tips: [
      { title: 'Stack it onto a habit', body: 'Walk part of the commute, stretch while a video loads. Activity you attach to routine actually sticks.' },
      { title: 'Make it social', body: 'A walk with a friend counts twice — for the body and for connection. Company makes it repeatable.' },
      { title: 'Lower the bar', body: 'Ten minutes is not nothing. Done often, short movement beats the perfect workout you skip.' },
    ],
    reflection: 'How does your body usually feel after you move?',
    raw: {
      label: 'Share meeting daily activity guidelines',
      unit: '%',
      series: { 11: 33, 13: 26, 15: 20 },
      reference: null,
    },
  },
  {
    id: 'loneliness',
    name: 'Loneliness',
    accent: 'loneliness',
    icon: 'Users',
    tagline: 'You can be surrounded by people and still feel unseen.',
    overview:
      'Loneliness is the gap between the connection you have and the connection you want. It is common in adolescence and says nothing about your worth — but it deserves attention.',
    why: 'Reported loneliness rises with age and is closely tied to mood and stress. Strong peer relationships are the clearest protective factor against it.',
    metricLabel: 'Connection wellbeing index',
    stat: { value: '28%', label: 'Often feel lonely at 15', sub: 'up from 14% at age 11' },
    insight: 'Loneliness rises with age, but supportive friendships appear to buffer much of the effect.',
    tips: [
      { title: 'Reach first', body: 'Send the message you wish someone would send you. Most people are waiting for the same nudge.' },
      { title: 'Small, regular contact', body: 'One steady connection beats many shallow ones. Consistency matters more than crowd size.' },
      { title: 'Shared activity, not pressure', body: 'Doing something side by side — a game, a walk — builds closeness without the weight of “let’s talk”.' },
    ],
    reflection: 'Is there someone you could reach out to this week?',
    raw: {
      label: 'Share who often feel lonely',
      unit: '%',
      series: { 11: 14, 13: 21, 15: 28 },
      reference: null,
      invert: true,
    },
  },
  {
    id: 'digital',
    name: 'Digital Balance',
    accent: 'digital',
    icon: 'Smartphone',
    tagline: 'The goal isn’t less screen — it’s more of what matters.',
    overview:
      'Screens connect, entertain and inform. Balance is about whether time online leaves you feeling better or drained, and whether it crowds out sleep, movement and people.',
    why: 'Heavy, late and passive use is associated with lower sleep and mood. Intentional, social use looks far healthier — so balance matters more than raw hours.',
    metricLabel: 'Digital balance index',
    stat: { value: '41%', label: 'Feel they use screens too much at 15', sub: 'and 1 in 3 use them right before sleep' },
    insight: 'Lower digital balance tracks with lower self-reported wellbeing, especially when use spills into the night.',
    tips: [
      { title: 'Protect the bedroom', body: 'Charge devices outside the room. This single change improves sleep more than any app timer.' },
      { title: 'Curate, don’t scroll', body: 'Follow accounts that leave you calmer or inspired; mute the ones that leave you comparing.' },
      { title: 'Trade, don’t cut', body: 'Swap one scroll session for something offline you enjoy. Replacing beats restricting.' },
    ],
    reflection: 'After time online, do you usually feel better or emptier?',
    raw: {
      label: 'Share who feel they use screens too much',
      unit: '%',
      series: { 11: 24, 13: 33, 15: 41 },
      reference: null,
      invert: true,
    },
  },
  {
    id: 'school',
    name: 'School Satisfaction',
    accent: 'school',
    icon: 'GraduationCap',
    tagline: 'Liking school is about belonging, not just grades.',
    overview:
      'School satisfaction reflects whether young people feel they belong, are treated fairly and find meaning in their day. It shapes motivation and mood well beyond the classroom.',
    why: 'Liking school protects wellbeing and tends to fall through the teens. Feeling supported by teachers and classmates is what holds it up.',
    metricLabel: 'School wellbeing index',
    stat: { value: '32%', label: 'Like school “a lot” at 15', sub: 'down from 58% at age 11' },
    insight: 'School satisfaction declines with age, but a sense of belonging slows the fall.',
    tips: [
      { title: 'Find one anchor', body: 'A subject, club or person you look forward to changes how the whole day feels.' },
      { title: 'Ask for the why', body: 'Connecting work to something you care about turns box-ticking into something with meaning.' },
      { title: 'Speak up early', body: 'Telling a teacher you are struggling — before it snowballs — is a strength, not a weakness.' },
    ],
    reflection: 'What is one thing about school you’d actually miss?',
    raw: {
      label: 'Share who like school “a lot”',
      unit: '%',
      series: { 11: 58, 13: 44, 15: 32 },
      reference: null,
    },
  },
]

export const TOPIC_MAP = Object.fromEntries(TOPICS.map((t) => [t.id, t]))

// Tailwind-friendly accent class helpers per topic (kept explicit so Tailwind's
// JIT can see every class string at build time — no dynamic concatenation).
export const ACCENT = {
  sleep: { hex: '#6C7BB3', text: 'text-topic-sleep', bg: 'bg-topic-sleep', soft: 'bg-[#6C7BB3]/10', ring: 'ring-[#6C7BB3]/30' },
  stress: { hex: '#C58A6A', text: 'text-topic-stress', bg: 'bg-topic-stress', soft: 'bg-[#C58A6A]/10', ring: 'ring-[#C58A6A]/30' },
  activity: { hex: '#6E9E84', text: 'text-topic-activity', bg: 'bg-topic-activity', soft: 'bg-[#6E9E84]/10', ring: 'ring-[#6E9E84]/30' },
  loneliness: { hex: '#9080AE', text: 'text-topic-loneliness', bg: 'bg-topic-loneliness', soft: 'bg-[#9080AE]/10', ring: 'ring-[#9080AE]/30' },
  digital: { hex: '#5C92A0', text: 'text-topic-digital', bg: 'bg-topic-digital', soft: 'bg-[#5C92A0]/10', ring: 'ring-[#5C92A0]/30' },
  school: { hex: '#5E83B3', text: 'text-topic-school', bg: 'bg-topic-school', soft: 'bg-[#5E83B3]/10', ring: 'ring-[#5E83B3]/30' },
}
