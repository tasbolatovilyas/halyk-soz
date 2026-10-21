export type CrosswordEntry={word:string;clue:string};
export type PlacedEntry=CrosswordEntry&{row:number;col:number;vertical:boolean;number:number};
export function buildCrossword(entries:CrosswordEntry[]){
 const grid=new Map<string,{char:string;directions:Set<boolean>}>();
 const placed:PlacedEntry[]=[];
 const key=(r:number,c:number)=>`${r},${c}`;
 const cleaned=entries.map(e=>({...e,word:e.word.toLocaleUpperCase().replace(/[^\p{L}]/gu,'')})).filter(e=>e.word.length>1&&e.word.length<20).sort((a,b)=>b.word.length-a.word.length);
 function fits(word:string,row:number,col:number,vertical:boolean){let overlaps=0;const dr=vertical?1:0,dc=vertical?0:1;
  if(grid.has(key(row-dr,col-dc))||grid.has(key(row+dr*word.length,col+dc*word.length)))return false;
  for(let i=0;i<word.length;i++){const r=row+dr*i,c=col+dc*i,cell=grid.get(key(r,c));if(cell){if(cell.char!==word[i]||cell.directions.has(vertical))return false;overlaps++;}else if(vertical?(grid.has(key(r,c-1))||grid.has(key(r,c+1))):(grid.has(key(r-1,c))||grid.has(key(r+1,c))))return false;}
  return placed.length===0||overlaps>0;
 }
 function place(e:CrosswordEntry,row:number,col:number,vertical:boolean){placed.push({...e,row,col,vertical,number:0});[...e.word].forEach((char,i)=>{const at=key(row+(vertical?i:0),col+(vertical?0:i));const old=grid.get(at);if(old)old.directions.add(vertical);else grid.set(at,{char,directions:new Set([vertical])});});}
 if(cleaned.length)place(cleaned[0],0,0,false);
 let pending=cleaned.slice(1);for(let pass=0;pass<3;pass++){const next:CrosswordEntry[]=[];for(const e of pending){let done=false;for(const [at,cell]of grid){if(done)break;const [r,c]=at.split(',').map(Number);for(let i=0;i<e.word.length&&!done;i++)if(e.word[i]===cell.char)for(const v of [true,false]){const row=r-(v?i:0),col=c-(v?0:i);if(fits(e.word,row,col,v)){place(e,row,col,v);done=true;break;}}}if(!done)next.push(e);}pending=next;}
 const coords=[...grid.keys()].map(at=>at.split(',').map(Number));const minR=Math.min(0,...coords.map(p=>p[0])),minC=Math.min(0,...coords.map(p=>p[1]));const maxR=Math.max(0,...coords.map(p=>p[0])),maxC=Math.max(0,...coords.map(p=>p[1]));
 const cells=new Map<string,string>();for(const[at,cell]of grid){const[r,c]=at.split(',').map(Number);cells.set(key(r-minR,c-minC),cell.char);}
 const normalized=placed.map(e=>({...e,row:e.row-minR,col:e.col-minC}));const starts=[...new Set(normalized.map(e=>key(e.row,e.col)))].sort((a,b)=>{const[ar,ac]=a.split(',').map(Number),[br,bc]=b.split(',').map(Number);return ar-br||ac-bc;});for(const e of normalized)e.number=starts.indexOf(key(e.row,e.col))+1;
 return {cells,entries:normalized,rows:maxR-minR+1,cols:maxC-minC+1};
}
