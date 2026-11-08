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
  const passed=profile.level==='C2'&&done.has('exam-C2');
  return <section className="learning-route" aria-labelledby={titleId}>
    <h2 id={titleId}>{tr(l('Мой маршрут','My learning path','Менің оқу жолым'))} · {profile.level}</h2>
    <label>{tr(l('Пройдено уроков','Lessons completed','Аяқталған сабақтар'))}: {count} / {units.length}
      <progress value={count} max={units.length}/></label>
    {next?<button className="route-action" onClick={()=>onStudy(next)}>{tr(l('Следующий урок','Next lesson','Келесі сабақ'))}: {tr(next.title)}</button>:
      child||passed?<p>{tr(l('Уровень пройден! Можно повторить любимый урок.','Level complete! Revisit a favourite lesson.','Деңгей аяқталды! Ұнаған сабақты қайталауға болады.'))}</p>:
      <button className="route-action" onClick={onExam}>{tr(l('Пройти итоговый тест','Take the level test','Қорытынды тест тапсыру'))}</button>}
    <details><summary>{tr(l('Все шаги маршрута','All steps','Барлық қадамдар'))}</summary>
      <ol>{units.map(unit=><li key={unit.id} aria-current={unit===next?'step':undefined}>
        <button onClick={()=>onStudy(unit)}>{tr(unit.title)}</button>
        {done.has(unit.id)?' · '+tr(l('Пройдено','Completed','Аяқталды')):null}</li>)}</ol>
    </details>
    {!child&&!passed&&<small>{tr(l('После всех уроков — итоговый тест. Проходной результат: 70%.','Complete all lessons to take the level test. Pass with 70%.','Барлық сабақтан кейін қорытынды тест ашылады. Өту үшін 70% қажет.'))}</small>}
  </section>;
}
