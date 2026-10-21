import type {Book} from './content';
const img=(s:string)=>'./images/'+s+'.png';
const scenes:Record<string,string[]>={
 'neighbours-tea':['history-dombra','reading'],
 'little-bird':['children-bird','children-garden'], 'grandma-garden':['children-garden','children-bird'],
 mitten:['children-snow-story','children-snow-story'], 'three-seeds':['children-garden','children-garden'],
 'quiet-dombra':['children-dombra','history-dombra'], 'rainy-library':['children-library','reading'],
 yurt:['history-dombra','steppe'], flag:['history-independence','steppe'],republic:['history-independence','history-archive'],
 abai:['history-school','reading'], 'abai-poem':['reading','history-school'],nauryz:['children-garden','history-dombra'],
 'golden-egg':['steppe','children-garden'],memory:['history-memory','history-archive'],
 khanate:['history-camp','history-city'],'silk-roads':['history-caravan','history-city'],
 'kasym-law':['history-camp','history-city'],'tauke-law':['history-dombra','history-camp'],
 'otrar-siege':['history-city','history-caravan'],'displacement-1723':['history-memory','steppe'],
 anyraqai:['steppe','history-memory'],abylai:['history-camp','history-dombra'],
 'isatay-mahambet':['steppe','history-dombra'],'kenesary-reading':['history-camp','steppe','history-memory'],
 'altynsarin-school':['history-school','reading'],'alash-reading':['history-archive','history-school','reading'],
 'famine-memory':['history-memory','history-archive'],'war-and-home':['history-memory','history-archive'],
 jeltoqsan:['history-independence','history-memory'],'semey-test-site':['history-memory','history-independence'],
 'missed-stop':['history-independence','children-library'],'grandfather-map':['history-dombra','steppe','history-caravan'],
 'translation-choice':['reading','history-archive','children-library']
};
export function decorateBooks(books:Book[]){for(const b of books){const list=scenes[b.id]||['reading','steppe'];b.image=img(list[0]);b.illustrations=list.slice(1).map((scene,i)=>({image:img(scene),after:Math.min(b.sentences.length-1,Math.max(1,Math.floor(b.sentences.length*(i+1)/list.length))),caption:{ru:'Иллюстрация к чтению',en:'A reading illustration',kk:'Оқылымға арналған сурет'}}));}}


