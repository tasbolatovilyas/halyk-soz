import type {ReactNode} from 'react';
export function cultureShape(kind:string):ReactNode|null{
 switch(kind){
 case 'shanyrak':return <><circle cx="80" cy="70" r="49" fill="#e8c47e"/><circle cx="80" cy="70" r="39" fill="#f5ead3"/><path d="M42 56q38 27 76 0M42 70q38 27 76 0M42 84q38 27 76 0M66 32q27 38 0 76M80 32q27 38 0 76M94 32q27 38 0 76" fill="none" stroke="#aa7e50"/></>;
 case 'lattice':return <><path d="M25 24h110v96H25Z" fill="#f0e5c9"/>{[0,1,2,3,4].map(i=><path key={i} d={`M${25+i*22} 120 135 ${120-i*19}M${25+i*22} 24 135 ${24+i*19}M25 ${24+i*19} ${135-i*22} 120M25 ${120-i*19} ${135-i*22} 24`} stroke="#b68a58" fill="none"/>)}</>;
 case 'felt':return <><path d="M25 28h110v85H25Z" fill="#e8d6b1"/><path d="m25 113 12 13h109l-11-13" fill="#d5bd91"/><path d="M42 47h76v48H42Z" fill="none" stroke="#bd8167"/><path d="m60 71 20-13 20 13-20 13Z" fill="#8ba68c"/><path d="M20 32h5m-5 13h5m-5 13h5m-5 13h5m-5 13h5m-5 13h5m-5 13h5" fill="none"/></>;
 case 'notes':return <><path d="M60 35v64m0-58 52-15v61M60 53l52-15" strokeWidth="5" fill="none"/><ellipse cx="46" cy="101" rx="15" ry="11" fill="#c9856c"/><ellipse cx="98" cy="88" rx="15" ry="11" fill="#e2b868"/></>;
 case 'strings':return <><path d="m62 18-9 100q28 12 56 0L98 18Z" fill="#e0bd7e"/><path d="M75 22v90m12-90v90" stroke="#496458" strokeWidth="3"/><path d="M66 106h29" strokeWidth="5"/></>;
 case 'pit':return <><rect x="20" y="30" width="120" height="85" rx="18" fill="#c99d69"/><ellipse cx="80" cy="72" rx="37" ry="24" fill="#8f704d"/><ellipse cx="80" cy="76" rx="28" ry="15" fill="#ac875c"/></>;
 case 'counters':return <>{[[48,51],[87,39],[112,70],[72,82],[41,104],[101,113]].map(([x,y],i)=><ellipse key={i} cx={x} cy={y} rx="14" ry="11" fill={i%2?'#d4b577':'#b8b695'}/>)}</>;
 case 'arrow':return <><path d="M32 104V65q0-28 28-28h53m-21-20 22 20-22 21" strokeWidth="8" stroke="#628b75" fill="none"/><circle cx="32" cy="111" r="12" fill="#e4bd76"/></>;
 default:return null;
 }
}
