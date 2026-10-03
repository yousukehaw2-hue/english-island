// Round 2 uses content-bound editorial decisions, never ID/revision-tag KEEP rules.
function reviewForQuestion(q,items=THIRD_REVIEW){
 const r=items[q.id];
 if(!r||r.reviewedContent!==JSON.stringify(q))return {status:"REVISE",humanRequired:true,reasons:["教材内容がレビュー時点から変更されたため再レビューが必要。"],action:"英文・正答・診断・属性を再レビューする。",findings:[],checks:{},stale:true};
 return r;
}
const AI_REVIEW=Object.fromEntries(bank.map(q=>[q.id,reviewForQuestion(q)]));
const REVIEW_SUMMARY=bank.reduce((a,q)=>(a[AI_REVIEW[q.id].status]++,a),{KEEP:0,REVISE:0,REPLACE:0});
function analyzeSkillCoverage(questions=bank,tree=SKILL_TREE,reviews=AI_REVIEW){
 return tree.map(s=>{
  const rows=questions.filter(q=>q.skill===s.id),transfers=rows.filter(q=>q.transfer_check),base=rows.filter(q=>!q.transfer_check);
  const groups=Object.fromEntries([...new Set(rows.map(q=>q.sibling_group))].map(g=>[g,rows.filter(q=>q.sibling_group===g).map(q=>q.id)]));
  return {id:s.id,name:s.name,domain:s.domain,total:rows.length,base:base.length,transfer:transfers.length,transferRatio:rows.length?transfers.length/rows.length:0,keep:rows.filter(q=>reviews[q.id]?.status==='KEEP').length,revise:rows.filter(q=>reviews[q.id]?.status==='REVISE').length,replace:rows.filter(q=>reviews[q.id]?.status==='REPLACE').length,ids:rows.map(q=>q.id),groups,prerequisite:s.prerequisite,school:s.school,eiken:s.eiken,belowPlanningMinimum:rows.length<3,hasBaseAndTransfer:base.length>0&&transfers.length>0,verifiedTransferPairs:transfers.filter(q=>{const b=questions.find(b=>b.id===q.baseQuestionId);return q.transferPairReviewed&&b?.learning_role==='base'&&b.target_id===q.target_id&&b.type===q.type&&JSON.stringify([b.q,b.sub,b.speech])!==JSON.stringify([q.q,q.sub,q.speech])}).length};
 });
}
const SKILL_COVERAGE=analyzeSkillCoverage();
const AUDIT_SYSTEM_FINDINGS=[
 {priority:"P1",issue:"学年・英検級は内部の目安。41問には級相当の難易度確認が残る。学校教科書や実試験との公式対応ではない。"},
 {priority:"P2",issue:"Writing・Speakingの7 Skillは未収録。基礎／別文脈の正答は長期的な習得の保証ではない。"}
];
