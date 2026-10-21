import type {Age,Lang,Level,Question} from './content';
import type {Script} from './script';
export type Profile={name:string;ageGroup:Age;language:Lang;level:Level;script?:Script};
export type Progress={completed:string[];words:string[];mistakes:string[];activity:string[]};
export type Run={id:string;title:string;questions:Question[];kind:'lesson'|'test'|'placement'|'review'|'reading'};
