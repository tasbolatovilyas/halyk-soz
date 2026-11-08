import {useId} from 'react';
import {l, type Lesson, type Local} from './content';
import type {Profile, Progress} from './types';
import './learning-route.css';

export function LearningRoute({profile,progress,units,onStudy,onExam}:{profile:Profile;progress:Progress;units:Lesson[];onStudy:(item:Lesson)=>void;onExam:()=>void}) {
  const titleId=useId();
  const tr=(v:Local)=>v[profile.language];
  if(!units.length)return null;
  const done=new Set(progress.completed);
  const count=units.filter(unit=>done.has(unit.id)).length;
  const next=units.find(unit=>!done.has(unit.id));
  const child=profile.ageGroup==='child';
  const senior=profile.ageGroup==='senior';
  const passed=profile.level==='C2'&&done.has('exam-C2');
  return <section className={`learning-route ${profile.ageGroup}`} aria-labelledby={titleId}>
    <div className="route-heading"><div><span className="route-eyebrow">{senior?tr(l('ВАШ ТЕКУЩИЙ УРОВЕНЬ','YOUR CURRENT LEVEL','ҚАЗІРГІ ДЕҢГЕЙІҢІЗ')):tr(l('ПЛАН ОБУЧЕНИЯ','LEARNING PLAN','ОҚУ ЖОСПАРЫ'))}</span><h2 id={titleId}>{tr(l('Мой маршрут','My learning path','Менің оқу жолым'))} · {profile.level}</h2></div><span className="route-level">{profile.level}</span></div>
    <label className="route-progress-label">{tr(l('Пройдено уроков','Lessons completed','Аяқталған сабақтар'))}: <strong>{count} / {units.length}</strong>
      <progress value={count} max={units.length}/></label>
    {next?<div className="route-next"><span>{senior?tr(l('СЕЙЧАС','UP NEXT','КЕЛЕСІ ҚАДАМ')):tr(l('СЛЕДУЮЩИЙ ШАГ','NEXT STEP','КЕЛЕСІ ҚАДАМ'))}</span><button className="route-action" onClick={()=>onStudy(next)}><span>{tr(next.title)}</span><span className="route-action-hint">{tr(l('Открыть урок','Open lesson','Сабақты ашу'))} →</span></button></div>:
      child||passed?<p className="route-finished">{tr(l('Уровень пройден! Можно повторить любимый урок.','Level complete! Revisit a favourite lesson.','Деңгей аяқталды! Ұнаған сабақты қайталауға болады.'))}</p>:
      <div className="route-next"><span>{tr(l('ВСЕ УРОКИ ЗАВЕРШЕНЫ','ALL LESSONS COMPLETE','БАРЛЫҚ САБАҚ АЯҚТАЛДЫ'))}</span><button className="route-action" onClick={onExam}>{tr(l('Пройти итоговый тест','Take the level test','Қорытынды тест тапсыру'))}<span className="route-action-hint">{tr(l('Для перехода на следующий уровень','To move to the next level','Келесі деңгейге өту үшін'))}</span></button></div>}
    <details className="route-details"><summary>{tr(l('Посмотреть все уроки уровня','See every lesson in this level','Деңгейдің барлық сабағын көру'))}</summary>
      <ol>{units.map(unit=><li key={unit.id} aria-current={unit===next?'step':undefined}>
        <button onClick={()=>onStudy(unit)}>{tr(unit.title)}</button>
        {done.has(unit.id)?<span className="route-done"> · {tr(l('Пройдено','Completed','Аяқталды'))}</span>:unit===next?<span className="route-current"> · {tr(l('Следующий урок','Next lesson','Келесі сабақ'))}</span>:null}</li>)}</ol>
    </details>
    {!child&&!passed&&<small>{tr(l('После всех уроков — итоговый тест. Проходной результат: 70%.','Complete all lessons to take the level test. Pass with 70%.','Барлық сабақтан кейін қорытынды тест ашылады. Өту үшін 70% қажет.'))}</small>}
  </section>;
}
