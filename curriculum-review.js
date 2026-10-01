// Round 2 uses content-bound editorial decisions, never ID/revision-tag KEEP rules.
function reviewForQuestion(q,items=SECOND_REVIEW){
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
  return {id:s.id,name:s.name,domain:s.domain,total:rows.length,base:base.length,transfer:transfers.length,transferRatio:rows.length?transfers.length/rows.length:0,keep:rows.filter(q=>reviews[q.id]?.status==='KEEP').length,revise:rows.filter(q=>reviews[q.id]?.status==='REVISE').length,replace:rows.filter(q=>reviews[q.id]?.status==='REPLACE').length,ids:rows.map(q=>q.id),groups,prerequisite:s.prerequisite,school:s.school,eiken:s.eiken,belowPlanningMinimum:rows.length<3,hasBaseAndTransfer:base.length>0&&transfers.length>0,verifiedTransferPairs:0};
 });
}
const SKILL_COVERAGE=analyzeSkillCoverage();
const AUDIT_SYSTEM_FINDINGS=[
 {priority:"P0",issue:"意味的に複数成立する正答を修正し再レビューする。CIの選択肢文字列一意性は意味の一意性を保証しない。"},
 {priority:"P1",issue:"60問のVocabularyの正答がすべて先頭。出題時に選択肢と正答・診断タグを同時に並べ替える。"},
 {priority:"P1",issue:"105問の置換済み問題の解説が汎用文。規則・根拠と誤答理由を個別に書く。"},
 {priority:"P1",issue:"SiblingはSkill全体のグループで、Transferはフラグのみ。対象知識を共有するbase/transferの明示リンクと独立レビューが必要。"},
 {priority:"P1",issue:"問題の学年・級には生成順や置換前属性の継承が残る。現在の級判定は推定で、学校教科書との公式対応ではない。"},
 {priority:"P2",issue:"未収録7 Skillと1問の2 Skillを補う。最低3問は今回の設計上の目安で、教育的習得を保証する基準ではない。"}
];
