import originals from './abai-originals.json';
import {summaries, childJourney, adultJourney, journeyContext} from './abai';
import {l, type Book} from './content';
import type {Profile} from './types';

export function abaiBooks(profile: Profile): Book[] {
 const child = profile.ageGroup === 'child';
 const advanced = !child && ['C1', 'C2'].includes(profile.level);
 const common = {
  genre: 'literature' as const, level: profile.level, childSafe: true,
  color: 'sage', art: 'book', image: './images/abai.png',
  paragraphsPerPage: 1,
 };
 const sentence = (kk: string) => ({kk, ru: '', en: ''});
 const collection: Book = {
  ...common,
  id: 'abai-words',
  image: './images/abai-words.png',
  title: l('Слова назидания Абая', 'Abai’s Words of Edification', 'Абайдың қара сөздері'),
  description: l('45 слов Абая с озвучкой и словарём', '45 readings with audio and vocabulary', '45 қара сөз, дыбыстау және сөздік'),
  source: 'https://abai.institute/qara-sozder',
  sentences: summaries.map((summary, index) => {
   const original = originals[index].paragraphs;
   const excerpt = original.join(' ').length > 6500;
   const text = advanced ? (excerpt ? original.slice(0, 5) : original).join('\n\n') : summary;
   return sentence((index + 1) + '-сөз' + (advanced && excerpt ? ' (үзінді)' : '') + '\n\n' + text);
  }),
  check: l('Что Абай советует делать с полезными знаниями?', 'What does Abai encourage us to do with useful knowledge?', 'Абай пайдалы білім туралы қандай кеңес береді?'),
  options: [l('Учиться и применять знания', 'Learn and put knowledge to use', 'Үйреніп, білгеніңді қолдану'), l('Учиться ради похвалы', 'Learn for praise', 'Мақтау үшін оқу'), l('Полагаться только на богатство', 'Rely only on wealth', 'Тек байлыққа сену')],
  answer: 0,
 };
 const journey: Book = {
  ...common,
  id: 'abai-journey',
  title: l('Путь Абая', 'The Path of Abai', 'Абай жолы'),
  description: l('Пересказ романа Мухтара Ауэзова', 'A retelling of Mukhtar Auezov’s novel', 'Мұхтар Әуезов романының мазмұны'),
  source: 'https://auezovmuseum.kz/ru/history',
  note: 'adaptation',
  sentences: (child ? childJourney : adultJourney.map((chapter, index) => [chapter.title, chapter.text, journeyContext[index]].join('\n\n'))).map(sentence),
  check: l('Кем стал Абай?', 'What did Abai become?', 'Абай кім болды?'),
  options: [l('Поэтом', 'A poet', 'Ақын'), l('Купцом', 'A merchant', 'Саудагер'), l('Врачом', 'A doctor', 'Дәрігер')],
  answer: 0,
 };
 const words: Book[] = collection.sentences.map(({kk}, index) => ({
  ...collection,
  id: 'abai-word-' + (index + 1),
  genre: 'abai',
  title: l('Абай · Слово ' + (index + 1), 'Abai · Word ' + (index + 1), (index + 1) + '-қара сөз'),
  source: originals[index].source,
  sentences: kk.split('\n\n').slice(1).map(sentence),
  paragraphsPerPage: 3,
 }));
 return [journey, ...words];
}

export const abaiGlossary: Record<string, {ru: string; en: string}> = {
 түйгенін: {ru: 'то, что понял и усвоил', en: 'what one has learned'},
 ақыл: {ru: 'разум, рассудок', en: 'reason, wisdom'},
 қайрат: {ru: 'воля, сила духа', en: 'willpower'},
 әділет: {ru: 'справедливость', en: 'justice'},
 әділдік: {ru: 'справедливость', en: 'fairness'},
 мейірім: {ru: 'доброта, милосердие', en: 'kindness, compassion'},
 ғибадат: {ru: 'богослужение, поклонение', en: 'worship'},
 зере: {ru: 'Зере, бабушка Абая', en: 'Zere, Abai’s grandmother'},
 жыршы: {ru: 'исполнитель эпических сказаний', en: 'epic storyteller'},
 қажылық: {ru: 'паломничество в Мекку', en: 'pilgrimage to Mecca'},
 шәкірт: {ru: 'ученик', en: 'pupil'},
 мұра: {ru: 'наследие', en: 'legacy'},
 ұстаным: {ru: 'убеждение, принцип', en: 'conviction, principle'},
 әулет: {ru: 'род, семья', en: 'family lineage'},
 өткінші: {ru: 'преходящий', en: 'fleeting'},
 намыс: {ru: 'честь, достоинство', en: 'honour, dignity'},
};
