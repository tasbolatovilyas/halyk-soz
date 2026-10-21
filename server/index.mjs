import http from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { randomBytes } from 'node:crypto';
import { mkdirSync, existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {hashPassword,verifyPassword,cleanProfile,safeProgress} from './core.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
mkdirSync(path.join(root,'data'),{recursive:true});
const db=new DatabaseSync(process.env.SOZ_DB_PATH||path.join(root,'data/soz.sqlite'));
db.exec(`PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY,email TEXT UNIQUE NOT NULL,password TEXT NOT NULL,profile TEXT NOT NULL,progress TEXT NOT NULL DEFAULT '{}'); CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY,user_id INTEGER NOT NULL,expires INTEGER NOT NULL);`);
const empty={completed:[],words:[],mistakes:[],activity:[]};
const limits=new Map();
function reply(res,status,data){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(data));}
function userFor(req){const token=(req.headers.cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith('soz_session='))?.slice(12);if(!token)return null;return db.prepare('SELECT users.* FROM sessions JOIN users ON users.id=sessions.user_id WHERE token=? AND expires>?').get(token,Date.now());}
function session(res,id){const token=randomBytes(32).toString('hex');db.prepare('INSERT INTO sessions VALUES(?,?,?)').run(token,id,Date.now()+7*86400000);res.setHeader('Set-Cookie',`soz_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=604800`);}
function payload(user){return {profile:JSON.parse(user.profile),progress:{...empty,...JSON.parse(user.progress)}};}
const server=http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://127.0.0.1');
  if(!url.pathname.startsWith('/api/')){
   const dist=path.join(root,'dist');let file=path.join(dist,decodeURIComponent(url.pathname));if(!file.startsWith(dist+path.sep)&&file!==dist)return reply(res,403,{error:'Forbidden'});if(!existsSync(file)||url.pathname==='/')file=path.join(dist,'index.html');
   if(!existsSync(file))return reply(res,404,{error:'Run npm run dev or npm run build first'});
   const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp','.mp3':'audio/mpeg','.json':'application/json; charset=utf-8'};
   const data=readFileSync(file),ext=path.extname(file),headers={'Content-Type':types[ext]||'application/octet-stream','Cache-Control':ext==='.json'?'no-cache':'public, max-age=3600'};
   if(ext==='.mp3'){
    headers['Accept-Ranges']='bytes';
    if(req.headers.range){
     const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
     let start=0,end=data.length-1;
     if(match&&match[1]){start=Number(match[1]);if(match[2])end=Math.min(Number(match[2]),end);}
     else if(match&&match[2])start=Math.max(0,data.length-Number(match[2]));
     else{res.writeHead(416,{'Content-Range':'bytes */'+data.length});res.end();return;}
     if(start> end||start>=data.length){res.writeHead(416,{'Content-Range':'bytes */'+data.length});res.end();return;}
     res.writeHead(206,{...headers,'Content-Range':'bytes '+start+'-'+end+'/'+data.length,'Content-Length':end-start+1});res.end(data.subarray(start,end+1));return;
    }
   }
   res.writeHead(200,{...headers,'Content-Length':data.length});res.end(data);return;
  }
  if(req.method==='GET'&&url.pathname==='/api/health')return reply(res,200,{ok:true});
  if(req.method==='GET'&&url.pathname==='/api/me'){const user=userFor(req);return reply(res,user?200:401,user?payload(user):{error:'Войдите в аккаунт'});}
  if(req.method!=='POST')return reply(res,405,{error:'Method not allowed'});
  if(req.headers.origin&&req.headers.origin!==`http://${req.headers.host}`&&!['http://127.0.0.1:5173','http://localhost:5173'].includes(req.headers.origin))return reply(res,403,{error:'Недопустимый источник запроса'});
  let raw='';for await(const part of req){raw+=part;if(raw.length>64000)return reply(res,413,{error:'Запрос слишком большой'});}let body;try{body=JSON.parse(raw||'{}');}catch{return reply(res,400,{error:'Некорректный запрос'});}
  if(['/api/register','/api/login'].includes(url.pathname)){
   const ip=req.socket.remoteAddress;const limit=limits.get(ip)||{count:0,until:Date.now()+60000};if(limit.until<Date.now()){limit.count=0;limit.until=Date.now()+60000;}limit.count++;limits.set(ip,limit);if(limit.count>30)return reply(res,429,{error:'Слишком много попыток. Подождите минуту.'});
   const email=String(body.email||'').trim().toLowerCase();const password=String(body.password||'');if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254)return reply(res,400,{error:'Укажите корректный email'});if(password.length<8||password.length>128)return reply(res,400,{error:'Пароль должен содержать от 8 до 128 символов'});
   if(url.pathname==='/api/register'){
    const profile=cleanProfile(body);if(db.prepare('SELECT id FROM users WHERE email=?').get(email))return reply(res,409,{error:'Этот email уже зарегистрирован'});
    const result=db.prepare('INSERT INTO users(email,password,profile,progress) VALUES(?,?,?,?)').run(email,hashPassword(password),JSON.stringify(profile),JSON.stringify(empty));session(res,Number(result.lastInsertRowid));return reply(res,201,{profile,progress:empty});
   }
   const user=db.prepare('SELECT * FROM users WHERE email=?').get(email);if(!user||!verifyPassword(password,user.password))return reply(res,401,{error:'Неверный email или пароль'});session(res,user.id);return reply(res,200,payload(user));
  }
  const user=userFor(req);if(!user)return reply(res,401,{error:'Войдите в аккаунт'});
  if(url.pathname==='/api/logout'){const token=(req.headers.cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith('soz_session='))?.slice(12);db.prepare('DELETE FROM sessions WHERE token=?').run(token||'');res.setHeader('Set-Cookie','soz_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0');return reply(res,200,{ok:true});}
  if(url.pathname==='/api/profile'){const current=JSON.parse(user.profile);const profile=cleanProfile(current.ageGroup==='child'?{...body,ageGroup:'child',level:'A0'}:body);db.prepare('UPDATE users SET profile=? WHERE id=?').run(JSON.stringify(profile),user.id);return reply(res,200,{profile});}
  if(url.pathname==='/api/progress'){const progress=safeProgress(body);db.prepare('UPDATE users SET progress=? WHERE id=?').run(JSON.stringify(progress),user.id);return reply(res,200,{progress});}
  return reply(res,404,{error:'Не найдено'});
 }catch(error){console.error(error.message);reply(res,400,{error:error.message||'Ошибка сервера'});}
});
server.listen(Number(process.env.PORT||3001),'127.0.0.1',()=>console.log('SÖZ API: http://127.0.0.1:'+ (process.env.PORT||3001)));
