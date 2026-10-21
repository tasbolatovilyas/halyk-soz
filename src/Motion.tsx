import type {CSSProperties} from 'react';
/** Short word-by-word reveal without delaying access to the complete text. */
export function RevealText({text}:{text:string}){
 return <span className="reveal-text">{text.split(/(\s+)/).map((part,i)=>/^\s+$/.test(part)?part:<span key={i} style={{'--word-delay':`${Math.min(i/2,12)*22}ms`} as CSSProperties}>{part}</span>)}</span>;
}
