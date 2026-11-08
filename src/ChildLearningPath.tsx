import {Check,Lock,Play,RotateCcw,Sparkles,Star} from 'lucide-react';
import type {Lang,Level,Lesson} from './content';
import {l,levels} from './content';

const stageArt:Record<Level,string>={
 A0:'./images/kids-path-school.jpg',A1:'./images/kids-path-play.jpg',A2:'./images/kids-path-morning.jpg',
 B1:'./images/kids-path-adventure.jpg',B2:'./images/child-history-khanate-2.webp',C1:'./images/child-history-school-2.webp',C2:'./images/child-history-republic-2.webp'
};
const stageCopy:Record<Level,{ru:string;en:string;kk:string;sub:{ru:string;en:string;kk:string}}>={
 A0:{ru:'Первые слова',en:'First words',kk:'Алғашқы сөздер',sub:{ru:'Смотрим, слушаем и знакомимся',en:'Look, listen and get to know new words',kk:'Қарап, тыңдап, жаңа сөздерді үйренеміз'}},
 A1:{ru:'Короткие фразы',en:'Short phrases',kk:'Қысқа сөйлемдер',sub:{ru:'Учимся говорить о том, что рядом',en:'Talk about the world around us',kk:'Айналамыз туралы айтуды үйренеміз'}},
 A2:{ru:'Новые открытия',en:'New discoveries',kk:'Жаңа жаңалықтар',sub:{ru:'Соединяем слова и рассказываем',en:'Connect words and tell little stories',kk:'Сөздерді байланыстырып, әңгімелейміз'}},
 B1:{ru:'Смелые разговоры',en:'Confident conversations',kk:'Еркін әңгіме',sub:{ru:'Делимся мыслями и впечатлениями',en:'Share ideas and impressions',kk:'Ой мен әсерді бөлісеміз'}},
 B2:{ru:'Большой мир',en:'A wider world',kk:'Үлкен әлем',sub:{ru:'Читаем и узнаём больше',en:'Read and discover more',kk:'Оқып, көбірек білеміз'}},
 C1:{ru:'Истории и идеи',en:'Stories and ideas',kk:'Әңгімелер мен ойлар',sub:{ru:'Понимаем детали и смысл',en:'Understand details and meaning',kk:'Егжей-тегжей мен мағынаны түсінеміз'}},
 C2:{ru:'Мастерская слова',en:'Word explorers',kk:'Сөз шеберханасы',sub:{ru:'Закрепляем путь и открываем новое',en:'Keep learning and discover something new',kk:'Үйренгенді бекітіп, жаңаны ашамыз'}}
};

export default function ChildLearningPath({lessons,completed,lang,onStart}:{lessons:Lesson[];completed:string[];lang:Lang;onStart:(lesson:Lesson)=>void}){
 const doneCount=lessons.filter(item=>completed.includes(item.id)).length;
 const nextIndex=lessons.findIndex(item=>!completed.includes(item.id));
 const openIndex=nextIndex<0?lessons.length:nextIndex;
 const grouped=levels.map((level,index)=>({level,index,lessons:lessons.map((item,lessonIndex)=>({item,lessonIndex})).filter(row=>row.item.level===level)})).filter(group=>group.lessons.length);
 return <div className="child-learning-path">
  <header className="child-path-heading"><span className="eyebrow"><Sparkles size={16}/>{l('ТВОЁ ПРИКЛЮЧЕНИЕ','YOUR ADVENTURE','СЕНІҢ САЯХАТЫҢ')[lang]}</span><h1>{l('Мой путь','My path','Менің жолым')[lang]}</h1><p>{l('Проходи уроки один за другим — новые ступеньки откроются сами.','Complete lessons in order. New steps will open as you go.','Сабақтарды ретімен өт — келесі қадамдар өздігінен ашылады.')[lang]}</p></header>
  <section className="child-path-progress" aria-label={l('Прогресс обучения','Learning progress','Оқу барысы')[lang]}>
   <div className="child-path-progress-top"><span><Star size={19}/>{l('Твои шаги','Your steps','Қадамдарың')[lang]}</span><strong>{doneCount} / {lessons.length}</strong></div>
   <div className="child-path-meter" role="progressbar" aria-valuemin={0} aria-valuemax={lessons.length} aria-valuenow={doneCount} aria-label={l('Пройденные уроки','Completed lessons','Өткен сабақтар')[lang]}><i style={{width:`${lessons.length?doneCount/lessons.length*100:0}%`}}/></div>
   <small>{lessons.length?l('Каждый урок — новая находка!','Every lesson is a new discovery!','Әр сабақ — жаңа жаңалық!')[lang]:l('Скоро здесь появятся уроки.','Lessons will appear here soon.','Жақында мұнда сабақтар пайда болады.')[lang]}</small>
  </section>
  {grouped.map((group)=><section className="child-path-stage" key={group.level}>
   <header className="child-stage-heading"><img src={stageArt[group.level]} alt="" loading="lazy"/><div><span>{l(`ЭТАП ${group.index+1}`,`STAGE ${group.index+1}`,`${group.index+1}-КЕЗЕҢ`)[lang]}</span><h2>{stageCopy[group.level][lang]}</h2><p>{stageCopy[group.level].sub[lang]}</p></div></header>
   <ol className="child-stage-steps">{group.lessons.map(({item,lessonIndex})=>{
    const isDone=completed.includes(item.id),isOpen=lessonIndex<=openIndex,isCurrent=!isDone&&lessonIndex===openIndex;
    return <li key={item.id} className={`child-path-step ${lessonIndex%2?'right':'left'} ${isDone?'done':''} ${isCurrent?'current':''} ${!isOpen?'locked':''}`}>
     <span className="child-path-marker" aria-hidden="true">{isDone?<Check size={20}/>:isOpen?<Play size={17} fill="currentColor"/>:<Lock size={17}/>}</span>
     <button type="button" className="child-path-card" disabled={!isOpen} onClick={()=>onStart(item)}>
      <span className="child-path-step-no">{l(`ШАГ ${lessonIndex+1}`,`STEP ${lessonIndex+1}`,`${lessonIndex+1}-ҚАДАМ`)[lang]}</span>
      <strong>{item.title[lang]}</strong>
      <span className="child-path-card-status">{isDone?<><Check size={15}/>{l('Пройдено · можно повторить','Done · play again','Өтілді · қайта ойнауға болады')[lang]}</>:isCurrent?<><Play size={14}/>{l('Твой следующий урок','Your next lesson','Келесі сабағың')[lang]}</>:<><Lock size={14}/>{l('Сначала пройди предыдущий урок','Finish the previous lesson first','Алдымен алдыңғы сабақты аяқта')[lang]}</>}</span>
      {isCurrent?<span className="child-path-start">{l('Начать','Start','Бастау')[lang]} <Play size={14} fill="currentColor"/></span>:null}
      {isDone?<RotateCcw className="child-path-replay" size={17}/>:null}
     </button>
    </li>;
   })}</ol>
  </section>)}
 </div>;
}
