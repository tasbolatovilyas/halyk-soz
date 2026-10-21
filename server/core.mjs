import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
export function hashPassword(password) { const salt=randomBytes(16).toString('hex'); return salt+':'+scryptSync(password,salt,64).toString('hex'); }
export function verifyPassword(password,hash) { try { const [salt,key]=hash.split(':'); const candidate=scryptSync(password,salt,64); const expected=Buffer.from(key,'hex'); return candidate.length===expected.length && timingSafeEqual(candidate,expected); } catch { return false; } }
export function cleanProfile(input) {
  if(!['child','adult','senior'].includes(input.ageGroup)) throw new Error('Выберите возрастную группу');
  if(!['ru','en','kk'].includes(input.language)) throw new Error('Выберите язык');
  if(input.ageGroup!=='child'&&!['A0','A1','A2','B1','B2','C1','C2'].includes(input.level)) throw new Error('Выберите уровень');
  const name=String(input.name||'').trim().slice(0,60);
  if(!name) throw new Error('Укажите имя');
  return {name,ageGroup:input.ageGroup,language:input.language,level:input.ageGroup==='child'?'A0':input.level,script:input.script==='latin'?'latin':'cyrillic'};
}
export function safeProgress(input) {
  const ids=(list)=>Array.isArray(list)?[...new Set(list.filter(x=>typeof x==='string'&&/^[a-z0-9-]{1,60}$/i.test(x)))].slice(0,300):[];
  return {completed:ids(input.completed),words:ids(input.words),mistakes:ids(input.mistakes),activity:ids(input.activity)};
}
