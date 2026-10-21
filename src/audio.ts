import {useSyncExternalStore} from 'react';
type State={status:'idle'|'loading'|'playing'|'paused';key:string;text:string;rate:number};
type Manifest={voice:string;entries:Record<string,string>};
const initial:State={status:'idle',key:'',text:'',rate:1};
let state=initial,revision=0,player:HTMLAudioElement|null=null,manifest:Promise<Manifest>|null=null;
let cancelSegment:(()=>void)|null=null;
const listeners=new Set<()=>void>();
const canonical=(text:string)=>text.normalize('NFC').replace(/\s+/g,' ').trim();
export const audioKey=(texts:string[])=>texts.map(canonical).join('\n');
function update(next:Partial<State>){state={...state,...next};listeners.forEach(fn=>fn());}
export const useAudio=()=>useSyncExternalStore(fn=>{listeners.add(fn);return()=>listeners.delete(fn);},()=>state,()=>initial);
function loadManifest(){return manifest??=fetch('./audio/manifest.json').then(r=>{if(!r.ok)throw new Error('Audio unavailable');return r.json();}).catch(error=>{manifest=null;throw error;});}
export function stopAudio(){revision++;cancelSegment?.();cancelSegment=null;if(player){player.pause();player.removeAttribute('src');player.load();player=null;}if(typeof speechSynthesis!=='undefined')speechSynthesis.cancel();update({status:'idle',key:'',text:''});}
export function pauseAudio(){if(state.status!=='playing')return;player?.pause();if(!player&&typeof speechSynthesis!=='undefined')speechSynthesis.pause();update({status:'paused'});}
export function resumeAudio(){if(state.status!=='paused')return;if(player)void player.play().then(()=>update({status:'playing'})).catch(()=>stopAudio());else{speechSynthesis.resume();update({status:'playing'});}}
export function setAudioRate(rate:number){update({rate});if(player)player.playbackRate=rate;}
async function segment(text:string,token:number){
 let path:string|undefined;
 try{path=(await loadManifest()).entries[text];}catch{/* An installed Kazakh voice can still be used. */}
 if(token!==revision)return;
 if(path){
  await new Promise<void>((resolve,reject)=>{
   const audio=new Audio(path.replace(/^\/+/,'./'));player=audio;audio.preload='auto';audio.playbackRate=state.rate;
   const clean=()=>{audio.onended=null;audio.onerror=null;cancelSegment=null;};
   cancelSegment=()=>{clean();resolve();};
   audio.onended=()=>{clean();resolve();};audio.onerror=()=>{clean();reject(new Error('Audio file unavailable'));};
   void audio.play().then(()=>{if(token===revision)update({status:'playing',text});else{audio.pause();clean();resolve();}}).catch(error=>{clean();reject(error);});
  });return;
 }
 if(typeof speechSynthesis==='undefined')throw new Error('No Kazakh audio');
 let voice=speechSynthesis.getVoices().find(v=>v.lang.toLowerCase().startsWith('kk'));
 if(!voice){await new Promise(resolve=>setTimeout(resolve,700));voice=speechSynthesis.getVoices().find(v=>v.lang.toLowerCase().startsWith('kk'));}
 if(token!==revision)return;if(!voice)throw new Error('No Kazakh voice');
 await new Promise<void>((resolve,reject)=>{player=null;const utterance=new SpeechSynthesisUtterance(text);utterance.lang='kk-KZ';utterance.voice=voice;utterance.rate=state.rate*.9;utterance.onend=()=>{cancelSegment=null;resolve();};utterance.onerror=()=>{cancelSegment=null;reject(new Error('Speech unavailable'));};cancelSegment=resolve;speechSynthesis.speak(utterance);update({status:'playing',text});});
}
export async function playKazakh(input:string[],onMissing:()=>void=()=>{}){
 const texts=input.map(canonical).filter(Boolean);if(!texts.length)return;
 stopAudio();const token=revision;update({status:'loading',key:audioKey(texts)});
 try{for(const text of texts){if(token!==revision)return;update({text});await segment(text,token);}if(token===revision){player=null;update({status:'idle',text:'',key:''});}}
 catch{if(token===revision){stopAudio();onMissing();}}
}
export function toggleAudio(texts:string[],onMissing:()=>void){if(state.key===audioKey(texts)&&state.status==='playing')pauseAudio();else if(state.key===audioKey(texts)&&state.status==='paused')resumeAudio();else if(state.key!==audioKey(texts)||state.status!=='loading')void playKazakh(texts,onMissing);}
