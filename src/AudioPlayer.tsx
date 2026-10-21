import {Pause,Play,RotateCcw,Square,Volume2} from 'lucide-react';
import {audioKey,playKazakh,setAudioRate,stopAudio,toggleAudio,useAudio} from './audio';
import {l,type Lang} from './content';
export default function AudioPlayer({texts,lang,label,onMissing,compact=false}:{texts:string[];lang:Lang;label?:string;onMissing:()=>void;compact?:boolean}){
 const audio=useAudio(),active=audio.key===audioKey(texts),playing=active&&audio.status==='playing',paused=active&&audio.status==='paused',loading=active&&audio.status==='loading';
 return <div className={`audio-player ${playing?'is-playing':''}`} role="group" aria-label={l('Озвучка на казахском','Kazakh audio','Қазақша дыбыстау')[lang]}>
  <button type="button" className="outline audio-main" disabled={loading} onClick={()=>toggleAudio(texts,onMissing)}>{playing?<Pause size={18}/>:paused?<Play size={18}/>:<Volume2 size={18}/>}<span>{loading?l('Готовим звук…','Loading audio…','Дыбыс жүктелуде…')[lang]:playing?l('Пауза','Pause','Кідірту')[lang]:paused?l('Продолжить','Resume','Жалғастыру')[lang]:label||l('Послушать','Listen','Тыңдау')[lang]}</span><i className="audio-bars" aria-hidden="true"><b/><b/><b/><b/></i></button>
  {active?<><button type="button" className="icon-btn" onClick={()=>void playKazakh(texts,onMissing)} aria-label={l('Повторить с начала','Repeat from start','Басынан қайталау')[lang]}><RotateCcw size={16}/></button><button type="button" className="icon-btn" onClick={stopAudio} aria-label={l('Остановить','Stop','Тоқтату')[lang]}><Square size={16}/></button></>:null}
  {!compact?<button type="button" className="audio-speed" onClick={()=>setAudioRate(audio.rate===1 ? .8 : 1)} aria-label={l('Скорость воспроизведения','Playback speed','Ойнату жылдамдығы')[lang]} aria-pressed={audio.rate!==1}>{audio.rate===1?'1×':'0.8×'}</button>:null}
 </div>;
}
