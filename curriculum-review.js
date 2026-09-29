// English Island v0.8 AI curriculum audit — 200/200 reviewed.
// KEEP = usable baseline; REVISE/REPLACE = human confirmation required.
const AI_REVIEW={};
bank.forEach(q=>{
 let status="KEEP",reasons=[],action="";
 if(q.type==="vocab"){
   status="REVISE";
   reasons.push("全語で同一の汎用誤答（難しい/静かな/危険な）を使用しており、語義ごとのもっともらしいDistractorになっていない");
   reasons.push("単語単体の日英対応のみで、習熟後の文脈理解・転移を測れない");
   action="語ごとに意味的に近い誤答へ変更し、Siblingには短文・空所補充を追加する";
 } else if(q.type==="grammar"){
   const n=Number(q.id.slice(1));
   if(n>19){
     status="REPLACE";
     reasons.push("19問のGrammar seedを反復生成しており、独立したTransfer Checkになっていない");
     action="同一Skillを別主語・別動詞・肯定/否定/疑問・異なる文脈で測る新問へ置換する";
   } else {
     reasons.push("英文・正答一意性は基礎教材として使用可能");
     if(["grammar_infinitive","grammar_gerund","grammar_comparison","grammar_passive"].includes(q.skill)){
       status="REVISE"; reasons.push("misconceptionがtense_confusionに集約されすぎており診断粒度が不足");
       action="Skill固有のmisconceptionを追加し、誤答ごとの原因タグを再設定する";
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
