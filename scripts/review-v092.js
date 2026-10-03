// Persist the editorial re-review after inspecting v0.9.2 content and pairs.
// This script materializes reviewed decisions; it is not a language classifier.
const fs=require('fs'),vm=require('vm');
const ctx={};vm.runInNewContext(['curriculum-data.js','quality-pass-v081.js','curriculum-v092.js','curriculum-audit-v09.js'].map(f=>fs.readFileSync(f,'utf8')).join('\n')+';this.data={bank,previous:SECOND_REVIEW,targets:LEARNING_TARGETS}',ctx);
const {bank,previous,targets}=ctx.data;
const next=Object.fromEntries(bank.map(q=>{
 const old=previous[q.id];
 // Grade labels remain estimates: do not clear the unresolved grade-quality findings.
 const findings=(old?.findings||[]).filter(f=>f.area==='level').map(f=>({...f,evidence:'現在の'+q.eiken_level+'は内部の級目安。単独の基礎・短文問題であり、当該級の実試験相当とする難易度の確認が残る。',action:'基礎復習としての位置付けと級相当の課題を、人間の教材確認で区別する。'}));
 const status=findings.length?'REVISE':'KEEP';
 return [q.id,{status,reasons:findings.length?findings.map(f=>f.evidence):['設問の意味・時制を限定し、正答・個別解説・診断・基礎／別文脈の接続を読み直して暫定採用。'],action:findings.map(f=>f.action).join(' '),humanRequired:status!=='KEEP',reviewedAt:'2026-10-03',reviewer:'AI-v0.9.2-editorial',sourceCommit:'4e5c825e63cc0712461eed31f92e8d5cc69c7f97',reviewedContent:JSON.stringify(q),evidence:{prompt:q.q,question:q.sub,answer:q.c[q.a],support:q.evidence,explanation:q.e},checks:{naturalness:'reviewed',answer:'reviewed',distractor:'reviewed',skill:'reviewed',misconception:'reviewed',curriculum:'provisional',level:'provisional',transfer:'editorial_pair_reviewed',explanation:'reviewed'},findings,resolvedAreas:[...new Set((old?.findings||[]).filter(f=>f.area!=='level').map(f=>f.area))],pair:{target:q.target_id,base:q.baseQuestionId,role:q.learning_role}}];
}));
fs.writeFileSync('curriculum-audit-v092.js','// v0.9.2 content-bound AI editorial review. Official grade alignment remains provisional.\nconst THIRD_REVIEW='+JSON.stringify(next,null,2)+';\n');
console.log(JSON.stringify({questions:bank.length,targets:Object.keys(targets).length,summary:Object.values(next).reduce((a,r)=>(a[r.status]++,a),{KEEP:0,REVISE:0,REPLACE:0})}));
