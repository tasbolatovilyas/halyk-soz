import {createClient} from '@supabase/supabase-js';
import type {Profile,Progress} from './types';

const env=(import.meta as ImportMeta & {env:Record<string,string|undefined>}).env;
const url=env.VITE_SUPABASE_URL;
const publishableKey=env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const cloudAuthEnabled=Boolean(url&&publishableKey);
export const supabase=cloudAuthEnabled?createClient(url!,publishableKey!,{
 auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true},
}):null;

const emptyProgress:Progress={completed:[],words:[],mistakes:[],activity:[]};

export async function loadCloudAccount(userId:string,fallbackProfile:Profile){
 if(!supabase)throw new Error('Облачные аккаунты пока не настроены.');
 const {data,error}=await supabase.from('user_data').select('profile,progress').eq('user_id',userId).maybeSingle();
 if(error)throw error;
 if(data)return {profile:data.profile as Profile,progress:{...emptyProgress,...data.progress} as Progress};
 const initial={user_id:userId,profile:fallbackProfile,progress:emptyProgress};
 const {error:saveError}=await supabase.from('user_data').insert(initial);
 if(saveError)throw saveError;
 return {profile:fallbackProfile,progress:emptyProgress};
}

export async function saveCloudProfile(userId:string,profile:Profile){
 if(!supabase)throw new Error('Облачные аккаунты пока не настроены.');
 const {error}=await supabase.from('user_data').update({profile}).eq('user_id',userId);
 if(error)throw error;
}

export async function saveCloudProgress(userId:string,progress:Progress){
 if(!supabase)throw new Error('Облачные аккаунты пока не настроены.');
 const {error}=await supabase.from('user_data').update({progress}).eq('user_id',userId);
 if(error)throw error;
}

export async function deleteCloudAccount(){
 if(!supabase)throw new Error('Облачные аккаунты пока не настроены.');
 const {error}=await supabase.functions.invoke('delete-account',{body:{}});
 if(error)throw error;
 await supabase.auth.signOut({scope:'local'});
}
