// Topic catalogue - the editorial + data backbone of the app.
// Every visible string is bilingual: { mk, en }. Numbers are HBSC-inspired and
// illustrative (simulated for this project, not official tables). Copy is kept
// short on purpose - one line of overview, one of why, one-line tips.

const L = (mk, en) => ({ mk, en })

export const TOPICS = [
  {
    id: 'sleep',
    accent: 'sleep',
    icon: 'Moon',
    name: L('Сон', 'Sleep'),
    tagline: L('Тивката основа на сѐ друго.', 'The quiet foundation for everything else.'),
    overview: L(
      'Сонот го обновува телото и умот. Тинејџерите имаат потреба од 8–10 часа.',
      'Sleep restores body and mind. Teenagers need 8–10 hours.',
    ),
    why: L(
      'Краткиот сон го намалува расположението и концентрацијата - еден од најсилните дневни сигнали.',
      'Short sleep lowers mood and focus - one of the clearest daily signals of wellbeing.',
    ),
    metricLabel: L('Индекс на сон', 'Sleep index'),
    stat: {
      value: L('6.9ч', '6.9h'),
      label: L('Просечен сон на 15', 'Average sleep at 15'),
      sub: L('од 8.4ч на 11 год.', 'down from 8.4h at age 11'),
    },
    insight: L(
      'Сонот постојано опаѓа со возраста, најмногу меѓу 13 и 15.',
      'Sleep declines steadily with age, sharpest between 13 and 15.',
    ),
    tips: [
      { title: L('Фиксирај го будењето', 'Anchor your wake time'), body: L('Исто време на станување, дури и викенд.', 'The same wake-up, even at weekends.') },
      { title: L('Затемни го последниот час', 'Dim the last hour'), body: L('Помалку светло и телефонот подалеку од кревет.', 'Less light, phone away from the bed.') },
      { title: L('Ритуал за смирување', 'A wind-down ritual'), body: L('Туш, истегнување или книга пред спиење.', 'Shower, stretch or read before bed.') },
    ],
    reflection: L('Се чувствуваш ли одморен повеќето училишни утра?', 'Do you feel rested most school mornings?'),
    raw: {
      label: L('Просечен сон во училишна ноќ', 'Average sleep on school nights'),
      unit: L('ч', 'h'),
      series: { 11: 8.4, 13: 7.6, 15: 6.9 },
      reference: { value: 9, label: L('Препорачано', 'Recommended') },
    },
  },
  {
    id: 'stress',
    accent: 'stress',
    icon: 'HeartPulse',
    name: L('Стрес', 'Stress'),
    tagline: L('Притисокот е нормален - да те смачка е сигналот.', 'Pressure is normal - feeling crushed is the signal.'),
    overview: L(
      'Малку стрес изострува фокус. Постојаниот притисок е тоа што ја троши благосостојбата.',
      'A little stress sharpens focus. Constant pressure is what wears wellbeing down.',
    ),
    why: L(
      'Притисокот од училиште расте со годините и е почест кај девојчињата.',
      'School pressure rises through adolescence and is reported more often by girls.',
    ),
    metricLabel: L('Индекс на ниско ниво на стрес', 'Low-stress index'),
    stat: {
      value: L('46%', '46%'),
      label: L('Чувствуваат притисок од училиште', 'Feel pressured by school'),
      sub: L('до 15 год., од 22% на 11', 'by age 15, up from 22%'),
    },
    insight: L(
      'Стресот е повисок кај постарите, а разликата меѓу момчиња и девојчиња се шири.',
      'Stress is higher among older students, and the boy–girl gap widens with age.',
    ),
    tips: [
      { title: L('Именувај го', 'Name it'), body: L('Запиши што те мачи - нејасниот притисок изгледа поголем.', 'Write down what worries you - vague pressure feels bigger.') },
      { title: L('Дишење во квадрат', 'Box breathing'), body: L('Вдишувај 4, задржи 4, издишувај 4, задржи 4.', 'In for 4, hold 4, out 4, hold 4.') },
      { title: L('Намали го чекорот', 'Shrink the next step'), body: L('Замени „заврши го проектот“ со „напиши една реченица“.', 'Swap “finish the project” for “write one line”.') },
    ],
    reflection: L('Кога има притисок, имаш ли начин да го ослободиш?', 'When pressure builds, do you have a way to let it out?'),
    raw: {
      label: L('Дел што чувствува притисок од училиште', 'Share feeling pressured by school'),
      unit: '%',
      series: { 11: 22, 13: 34, 15: 46 },
      reference: null,
      invert: true,
    },
  },
  {
    id: 'activity',
    accent: 'activity',
    icon: 'Footprints',
    name: L('Физичка активност', 'Physical Activity'),
    tagline: L('Лек што веќе го имаш.', 'Medicine you already own.'),
    overview: L(
      'Околу 60 минути движење дневно го подига расположението и сонот - но активноста паѓа со возраста.',
      'Around 60 minutes a day lifts mood and sleep - but activity falls with age.',
    ),
    why: L(
      'Активните млади имаат подобро расположение и сон. Падот е поостар кај девојчињата.',
      'Active young people report better mood and sleep. The decline is steeper for girls.',
    ),
    metricLabel: L('Индекс на активност', 'Activity index'),
    stat: {
      value: L('1 на 5', '1 in 5'),
      label: L('Доволно активни на 15', 'Meet activity guidelines at 15'),
      sub: L('наспроти 1 на 3 на 11 год.', 'vs 1 in 3 at age 11'),
    },
    insight: L(
      'Дневната активност паѓа со возраста, а помалку девојчиња го достигнуваат препорачаниот час.',
      'Daily activity falls with age, and fewer girls reach the recommended hour.',
    ),
    tips: [
      { title: L('Прикачи го на навика', 'Stack it onto a habit'), body: L('Прошетај дел од патот или истегни се додека нешто се вчитува.', 'Walk part of the way, or stretch while something loads.') },
      { title: L('Биди во друштво', 'Make it social'), body: L('Прошетка со пријател се брои двојно.', 'A walk with a friend counts twice.') },
      { title: L('Спушти ја летвата', 'Lower the bar'), body: L('Десет минути не е ништо - често победува совршен тренинг.', 'Ten minutes is not nothing - often beats the perfect workout.') },
    ],
    reflection: L('Како се чувствува телото откако ќе се движиш?', 'How does your body feel after you move?'),
    raw: {
      label: L('Дел што е доволно активен дневно', 'Share meeting daily activity guidelines'),
      unit: '%',
      series: { 11: 33, 13: 26, 15: 20 },
      reference: null,
    },
  },
  {
    id: 'loneliness',
    accent: 'loneliness',
    icon: 'Users',
    name: L('Осаменост', 'Loneliness'),
    tagline: L('Можеш да си опкружен, а сепак невидлив.', 'You can be surrounded and still feel unseen.'),
    overview: L(
      'Осаменоста е јазот меѓу врската што ја имаш и онаа што ја сакаш. Честа е и не кажува ништо за твојата вредност.',
      'Loneliness is the gap between the connection you have and the one you want. It’s common, and says nothing about your worth.',
    ),
    why: L(
      'Осаменоста расте со возраста, но цврстите пријателства најмногу заштитуваат.',
      'Loneliness rises with age, but strong friendships are the clearest protective factor.',
    ),
    metricLabel: L('Индекс на поврзаност', 'Connection index'),
    stat: {
      value: L('28%', '28%'),
      label: L('Често се чувствуваат осамено на 15', 'Often feel lonely at 15'),
      sub: L('од 14% на 11 год.', 'up from 14% at age 11'),
    },
    insight: L(
      'Осаменоста расте со возраста, но поддржувачките пријателства голем дел го ублажуваат.',
      'Loneliness rises with age, but supportive friendships buffer much of it.',
    ),
    tips: [
      { title: L('Јави се прв', 'Reach first'), body: L('Прати ја пораката што би сакал некој да ти ја прати.', 'Send the message you wish someone would send you.') },
      { title: L('Редовен, мал контакт', 'Small, regular contact'), body: L('Една стабилна врска вреди повеќе од многу површни.', 'One steady connection beats many shallow ones.') },
      { title: L('Заедничка активност', 'Shared activity'), body: L('Игра или прошетка зближуваат без притисок.', 'A game or a walk builds closeness without pressure.') },
    ],
    reflection: L('Има ли некој до кого би се обратил оваа недела?', 'Is there someone you could reach out to this week?'),
    raw: {
      label: L('Дел што често се чувствува осамено', 'Share who often feel lonely'),
      unit: '%',
      series: { 11: 14, 13: 21, 15: 28 },
      reference: null,
      invert: true,
    },
  },
  {
    id: 'digital',
    accent: 'digital',
    icon: 'Smartphone',
    name: L('Дигитална рамнотежа', 'Digital Balance'),
    tagline: L('Целта не е помалку екран - туку повеќе од она што е важно.', 'The goal isn’t less screen - it’s more of what matters.'),
    overview: L(
      'Екраните поврзуваат и забавуваат. Рамнотежата е дали времето онлајн те остава подобро или испразнето.',
      'Screens connect and entertain. Balance is whether time online leaves you better or emptier.',
    ),
    why: L(
      'Доцната, пасивна употреба се поврзува со послаб сон и расположение. Намерната употреба изгледа поздраво.',
      'Late, passive use is linked with poorer sleep and mood. Intentional use looks far healthier.',
    ),
    metricLabel: L('Индекс на дигитална рамнотежа', 'Digital balance index'),
    stat: {
      value: L('41%', '41%'),
      label: L('Сметаат дека користат екрани премногу', 'Feel they use screens too much'),
      sub: L('на 15 год.', 'at age 15'),
    },
    insight: L(
      'Послабата дигитална рамнотежа се поврзува со пониска благосостојба, особено навечер.',
      'Lower digital balance tracks with lower wellbeing, especially at night.',
    ),
    tips: [
      { title: L('Заштити ја спалната', 'Protect the bedroom'), body: L('Полни го телефонот надвор од собата.', 'Charge your phone outside the room.') },
      { title: L('Бирај, не скролај', 'Curate, don’t scroll'), body: L('Следи сметки што те смируваат; стиши ги оние што те споредуваат.', 'Follow accounts that calm you; mute the ones that make you compare.') },
      { title: L('Замени, не сечи', 'Trade, don’t cut'), body: L('Замени едно скролање со нешто офлајн што го сакаш.', 'Swap one scroll for something offline you enjoy.') },
    ],
    reflection: L('По време онлајн, обично се чувствуваш подобро или попразно?', 'After time online, do you feel better or emptier?'),
    raw: {
      label: L('Дел што смета дека користи екрани премногу', 'Share who feel they use screens too much'),
      unit: '%',
      series: { 11: 24, 13: 33, 15: 41 },
      reference: null,
      invert: true,
    },
  },
  {
    id: 'school',
    accent: 'school',
    icon: 'GraduationCap',
    name: L('Задоволство од училиште', 'School Satisfaction'),
    tagline: L('Да го сакаш училиштето е чувство на припадност.', 'Liking school is about belonging.'),
    overview: L(
      'Задоволството од училиште покажува дали младите чувствуваат припадност и смисла.',
      'School satisfaction reflects whether young people feel they belong and find meaning.',
    ),
    why: L(
      'Да го сакаш училиштето ја штити благосостојбата, а опаѓа со годините. Поддршката го задржува.',
      'Liking school protects wellbeing and falls through the teens. Feeling supported holds it up.',
    ),
    metricLabel: L('Индекс на училиште', 'School index'),
    stat: {
      value: L('32%', '32%'),
      label: L('Многу го сакаат училиштето на 15', 'Like school “a lot” at 15'),
      sub: L('од 58% на 11 год.', 'down from 58% at age 11'),
    },
    insight: L(
      'Задоволството од училиште опаѓа со возраста, но чувството на припадност го забавува падот.',
      'School satisfaction declines with age, but belonging slows the fall.',
    ),
    tips: [
      { title: L('Најди едно сидро', 'Find one anchor'), body: L('Предмет, секција или личност што ја менува целата ден.', 'A subject, club or person that changes the whole day.') },
      { title: L('Барај го „зошто“', 'Ask for the why'), body: L('Поврзи ја работата со нешто до кое ти е грижа.', 'Connect the work to something you care about.') },
      { title: L('Кажи навреме', 'Speak up early'), body: L('Да кажеш дека ти е тешко е сила, не слабост.', 'Saying you’re struggling is a strength, not a weakness.') },
    ],
    reflection: L('Што е едно нешто од училиште што навистина би ти недостасувало?', 'What is one thing about school you’d actually miss?'),
    raw: {
      label: L('Дел што многу го сака училиштето', 'Share who like school “a lot”'),
      unit: '%',
      series: { 11: 58, 13: 44, 15: 32 },
      reference: null,
    },
  },
]

export const TOPIC_MAP = Object.fromEntries(TOPICS.map((t) => [t.id, t]))

// Tailwind-friendly accent helpers per topic (explicit so the JIT sees them).
export const ACCENT = {
  sleep: { hex: '#6C7BB3' },
  stress: { hex: '#C58A6A' },
  activity: { hex: '#6E9E84' },
  loneliness: { hex: '#9080AE' },
  digital: { hex: '#5C92A0' },
  school: { hex: '#5E83B3' },
}
