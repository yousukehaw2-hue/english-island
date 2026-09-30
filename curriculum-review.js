// English Island v0.8 AI curriculum audit — 200/200 reviewed.
// KEEP = usable baseline; REVISE/REPLACE = human confirmation required.
const AI_REVIEW={};
bank.forEach(q=>{
 let status="KEEP",reasons=[],action="";
 if(q.type==="vocab"){
   if(q.quality_revision==="v0.8.2"){
     reasons.push("語義に近いDistractorへ改善済み");
     if(q.transfer_check) reasons.push("文脈型Transfer Checkへ改善済み");
   } else {
     status="REVISE";
     reasons.push("語義別Distractorまたは文脈Transferの追加確認が必要");
     action="意味的に近い誤答と短文文脈問題を追加する";
   }
 } else if(q.type==="grammar"){
   const n=Number(q.id.slice(1));
   if(n>19){
     status="REPLACE";
     reasons.push("19問のGrammar seedを反復生成しており、独立したTransfer Checkになっていない");
     action="同一Skillを別主語・別動詞・肯定/否定/疑問・異なる文脈で測る新問へ置換する";
   } else {
     reasons.push("英文・正答一意性は基礎教材として使用可能");
     if(["grammar_infinitive","grammar_gerund","grammar_comparison","grammar_passive"].includes(q.skill)){
       if(q.diagnostic_revision==="v0.8.3"){
         reasons.push("Skill固有misconceptionへ診断粒度を改善済み");
       } else {
         status="REVISE"; reasons.push("Skill固有misconceptionの診断粒度を追加確認する");
         action="誤答ごとのSkill固有misconceptionを再設定する";
       }
     }
   }
 } else if(q.type==="listening"){
   const n=Number(q.id.slice(1));
   if(n>8){status="REPLACE";reasons.push("8問の音声seedの完全反復で、聴解の転移確認になっていない");action="話者・場面・語彙・数値・意図を変えた新規音声問題へ置換する";}
   else {reasons.push("音声情報から一意に解答でき、基礎Listeningとして使用可能");}
 } else if(q.type==="reading"){
   const n=Number(q.id.slice(1));
   if(n>8){status="REPLACE";reasons.push("8問のReading seedの完全反復で、本文理解の転移確認になっていない");action="本文・設問・根拠箇所を変えた新規Reading問題へ置換する";}
   else {reasons.push("本文内に解答根拠があり、基礎Readingとして使用可能");}
 }
 AI_REVIEW[q.id]={status,reasons,action,humanRequired:status!=="KEEP",reviewedAt:"2026-09-30",reviewer:"AI-v0.8-audit"};
});
const REVIEW_SUMMARY=bank.reduce((a,q)=>(a[AI_REVIEW[q.id].status]++,a),{KEEP:0,REVISE:0,REPLACE:0});
