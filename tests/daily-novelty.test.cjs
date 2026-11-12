// Run with: node tests/daily-novelty.test.cjs
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const types=['vocab','grammar','listening','reading'];
const bank=[];const targets={};for(const [i,type] of types.entries())for(let j=0;j<4;j++){const id=type+j,target_id='target-'+id;bank.push({id,type,target_id,skill:'s'+i,learning_role:'base',school_grade:'JHS1',mis:[]});targets[target_id]={id:target_id,skill:'s'+i,baseQuestionId:id};}
const context={bank,LEARNING_TARGETS:targets,SKILL_TREE:types.map((_,i)=>({id:'s'+i,prerequisite:[]})),console};vm.createContext(context);vm.runInContext(fs.readFileSync('adaptive-engine.js','utf8'),context);
const st={learningStage:'JHS1',dailyGoal:8,mastery:Object.fromEntries(types.map(t=>[t,20])),skillMastery:{},targetProgress:{},questionHistory:{},reviews:[],remediationQueue:[],mistakes:{}};
const first=context.adaptiveQuestPlan(st,'2026-11-12',8).questions;assert.equal(first.length,8);assert.equal(new Set(first.map(q=>q.id)).size,8);
for(const q of first)st.questionHistory[q.id]='2026-11-12';
const second=context.adaptiveQuestPlan(st,'2026-11-13',8).questions;
assert.equal(second.length,8);assert.equal(second.filter(q=>st.questionHistory[q.id]).length,0,'unseen questions must be preferred');
assert.equal(new Set(second.map(q=>q.type)).size,4,'retain skill domain variety');
console.log('Daily Quest novelty regression tests PASS');
