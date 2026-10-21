import test from 'node:test';
import assert from 'node:assert/strict';
import {hashPassword,verifyPassword,cleanProfile,safeProgress} from './core.mjs';
test('password hashing uses salt and rejects wrong password',()=>{const a=hashPassword('test-password');assert.notEqual(a,hashPassword('test-password'));assert.ok(verifyPassword('test-password',a));assert.equal(verifyPassword('wrong',a),false);});
test('child profile always starts without a placement level',()=>{assert.equal(cleanProfile({name:'A',ageGroup:'child',language:'en',level:'B1'}).level,'A0');assert.throws(()=>cleanProfile({name:'A',ageGroup:'adult',language:'ru',level:'fake'}));});
test('progress rejects invalid identifiers and duplicates',()=>{assert.deepEqual(safeProgress({completed:['greeting','greeting','<script>'],words:null}).completed,['greeting']);});
test('advanced levels and script preference survive profile validation',()=>{for(const level of ['B2','C1','C2']){const p=cleanProfile({name:'Learner',ageGroup:'adult',language:'en',level,script:'latin'});assert.equal(p.level,level);assert.equal(p.script,'latin');}assert.equal(cleanProfile({name:'Kid',ageGroup:'child',language:'ru',level:'C1',script:'latin'}).level,'A0');});
