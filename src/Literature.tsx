import originals from './abai-originals.json';
import {useState} from 'react';
import {summaries, childJourney, adultJourney, journeyContext} from './abai';
import {l} from './content';
import type {Profile} from './types';

export default function Literature({profile}: {profile: Profile}) {
 const lang = profile.language;
 const [word, setWord] = useState(0);
 const advanced = profile.ageGroup !== 'child' && ['C1', 'C2'].includes(profile.level);
 return <section className="abai-library">
  <article className="vocab-card">
   <div><img src="./images/abai.png" alt="" style={{width:240, aspectRatio:"1", objectFit:"cover", objectPosition:"left"}}/><h3>Абайдың қара сөздері</h3><label>{l('Номер слова', 'Word number', 'Сөз нөмірі')[lang]} <select value={word} onChange={event => setWord(Number(event.target.value))}>{summaries.map((_, i) => <option key={i} value={i}>{i + 1}</option>)}</select></label>{advanced ? <div lang="kk" className="abai-original">{originals[word].paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div> : <p lang="kk">{summaries[word]}</p>}
   <p><a href={originals[word].source}>{l('Источник оригинала', 'Original text source', 'Түпнұсқа дереккөзі')[lang]}</a></p></div>
  </article>
  <article className="vocab-card">
   <div><img src="./images/abai.png" alt="" style={{width:240, aspectRatio:"1", objectFit:"cover", objectPosition:"right"}}/><h3>Абай жолы</h3><p lang="kk">{profile.ageGroup === 'child' ? 'Абай — қазақтың ұлы ақыны. Оның шын есімі — Ибраһим.' : 'Абай Құнанбайұлы (1845–1904) — қазақ ақыны, ойшыл және аудармашы. Шыңғыстау өңірінде дүниеге келіп, Семейде білім алды. Пушкин, Лермонтов пен Крылов шығармаларын қазақшаға аударды. Төменде Мұхтар Әуезовтің Абай өміріне сүйеніп жазған көркем романының мазмұны берілген.'}</p><details><summary>{l('Читать пересказ', 'Read the retelling', 'Мазмұнын оқу')[lang]}</summary><div lang="kk">{profile.ageGroup === 'child' ? childJourney.map(paragraph => <p key={paragraph}>{paragraph}</p>) : adultJourney.map((chapter, index) => <section key={chapter.title}><h4>{chapter.title}</h4><p>{chapter.text}</p><p>{journeyContext[index]}</p></section>)}</div></details>
   <p><a href="https://auezovmuseum.kz/ru/history">{l('Роман Мухтара Ауэзова', 'Mukhtar Auezov’s novel', 'Мұхтар Әуезовтің романы')[lang]}</a></p></div>
  </article>
 </section>;
}





