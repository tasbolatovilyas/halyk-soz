import {createClient} from '@supabase/supabase-js';

const allowedOrigins=new Set([
 'https://tasbolatovilyas.github.io',
 'http://localhost:5173',
 'http://127.0.0.1:5173',
]);

Deno.serve(async(req)=>{
 const origin=req.headers.get('origin')||'';
 const headers:Record<string,string>={
  'Access-Control-Allow-Headers':'authorization, apikey, content-type, x-client-info',
  'Access-Control-Allow-Methods':'POST, OPTIONS',
  'Vary':'Origin',
 };
 if(allowedOrigins.has(origin))headers['Access-Control-Allow-Origin']=origin;
 if(req.method==='OPTIONS')return new Response('ok',{headers});
 if(req.method!=='POST')return new Response(JSON.stringify({error:'Method not allowed'}),{status:405,headers:{...headers,'Content-Type':'application/json'}});
 if(origin&&!allowedOrigins.has(origin))return new Response(JSON.stringify({error:'Origin not allowed'}),{status:403,headers:{...headers,'Content-Type':'application/json'}});

 const authorization=req.headers.get('authorization')||'';
 const token=authorization.match(/^Bearer\s+(.+)$/i)?.[1];
 if(!token)return new Response(JSON.stringify({error:'Sign in required'}),{status:401,headers:{...headers,'Content-Type':'application/json'}});

 const url=Deno.env.get('SUPABASE_URL');
 const anonKey=Deno.env.get('SUPABASE_ANON_KEY')||Deno.env.get('SUPABASE_PUBLISHABLE_KEY');
 const adminKey=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')||Deno.env.get('SUPABASE_SECRET_KEY');
 if(!url||!anonKey||!adminKey)return new Response(JSON.stringify({error:'Account service is not configured'}),{status:500,headers:{...headers,'Content-Type':'application/json'}});

 const userClient=createClient(url,anonKey,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data:{user},error:authError}=await userClient.auth.getUser(token);
 if(authError||!user)return new Response(JSON.stringify({error:'Session is invalid or expired'}),{status:401,headers:{...headers,'Content-Type':'application/json'}});

 const admin=createClient(url,adminKey,{auth:{persistSession:false,autoRefreshToken:false}});
 const {error:deleteError}=await admin.auth.admin.deleteUser(user.id);
 if(deleteError)return new Response(JSON.stringify({error:'Could not delete the account. Please try again.'}),{status:500,headers:{...headers,'Content-Type':'application/json'}});
 return new Response(JSON.stringify({ok:true}),{status:200,headers:{...headers,'Content-Type':'application/json'}});
});
