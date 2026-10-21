import {createContext,useContext} from 'react';
export type Script='cyrillic'|'latin';
// An explicitly educational transliteration, not a claim about an official alphabet.
const alphabet:Record<string,string>={'а':'a','ә':'ä','б':'b','в':'v','г':'g','ғ':'ğ','д':'d','е':'e','ё':'io','ж':'j','з':'z','и':'i','й':'i','к':'k','қ':'q','л':'l','м':'m','н':'n','ң':'ñ','о':'o','ө':'ö','п':'p','р':'r','с':'s','т':'t','у':'u','ұ':'ū','ү':'ü','ф':'f','х':'h','һ':'h','ц':'ts','ч':'ç','ш':'ş','щ':'şş','ъ':'','ы':'y','і':'i','ь':'','э':'e','ю':'iu','я':'ia'};
export function toLatin(text:string){return [...text].map(char=>{const lower=char.toLocaleLowerCase();const mapped=alphabet[lower];if(mapped===undefined)return char;return char===lower?mapped:mapped.charAt(0).toUpperCase()+mapped.slice(1);}).join('');}
export const ScriptContext=createContext<Script>('cyrillic');
export const useScript=()=>useContext(ScriptContext);
export const scriptText=(text:string,script:Script)=>script==='latin'?toLatin(text):text;
export const normalized=(text:string)=>text.normalize('NFKC').toLocaleLowerCase().replace(/\u0307/g,'').replace(/[.,!?—–:;«»“”"']/g,'').replace(/\s+/g,' ').trim();
export const answerMatches=(input:string,expected:string)=>normalized(input)===normalized(expected)||normalized(input)===normalized(toLatin(expected));
export function K({children}:{children:string}){return <>{scriptText(children,useScript())}</>;}
