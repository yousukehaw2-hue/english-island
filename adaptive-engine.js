// v0.9.2: target-specific remediation, prerequisite gates and daily composition.
const REMEDIATION_GUIDES={
 be_subject:'主語がI・単数・複数のどれかを確認し、am / is / areを対応させよう。',
 be_vs_do:'状態を表すbe動詞と、動作を表す一般動詞の文を区別しよう。',
 third_person:'現在の習慣か、主語が三人称単数かを順に確かめよう。',
 verb_after_does:'Does / doesn\'tの後は動詞原形。-sを二重に付けないようにしよう。',
 tense_confusion:'yesterday・now・sinceなどの手がかりと、助動詞の後の動詞の形を確認しよう。',
 negative_form:'一般動詞の現在否定はdon\'t / doesn\'t＋原形。主語も確認しよう。',
 modal_base:'can・must・mayの直後は動詞原形。能力か習慣かは設問の意図も確認しよう。',
 wh_choice:'何の情報を尋ねるか確認し、場所Where・時When・人Whoを使い分けよう。',
 infinitive_form:'to＋動詞原形。「～したい」なのか「～するために」なのかを確認しよう。',
 gerund_form:'動作を目的語や主語にするときの-ing形を確認しよう。',
 comparison_form:'thanなら比較級、範囲で「最も」ならthe＋最上級を確認しよう。',
 passive_form:'主語が動作を受ける側ならbe動詞＋過去分詞を確認しよう。',
 time_confusion:'時刻・曜日・時間の長さのどれを尋ねているか確認しよう。',
 number_confusion:'種類ごとの数と合計、1週間の回数を区別して数えよう。',
 detail_missed:'設問の対象を先に確認し、but・not・変更後の情報に注目しよう。',
 main_idea_confusion:'一つの例だけでなく、全体の話題・目的・最終判断を確認しよう。',
 pronoun_reference:'先行詞が人か物か、関係節で主語か目的語かを確認しよう。',
 unsupported_inference:'本文の具体的な行動・状況を根拠にし、書かれていない事実を足さないようにしよう。',
 word_meaning:'単語の意味を確認してから、文脈の手がかりと対応させよう。'
};
function adaptiveNormalize(st){
 const out=JSON.parse(JSON.stringify(st));
 out.targetProgress=out.targetProgress&&typeof out.targetProgress==='object'?out.targetProgress:{};
 out.remediationQueue=Array.isArray(out.remediationQueue)?out.remediationQueue:[];
 out.answerSerial=Math.max(0,Number(out.answerSerial)||0);
 out.learningStage=['JHS1','JHS2','JHS3','ALL'].includes(out.learningStage)?out.learningStage:'JHS1';
 return out;
}
function targetBaseReady(st,targetId){return !!st.targetProgress?.[targetId]?.basePassed;}
function prerequisiteReady(st,skillId){
 const s=SKILL_TREE.find(x=>x.id===skillId);
 return !!s&&s.prerequisite.every(id=>
  (Number(st.skillMastery?.[id])||0)>=45||
  Object.values(LEARNING_TARGETS).some(t=>t.skill===id&&targetBaseReady(st,t.id)));
}
function schoolReady(st,q){
 const limit={JHS1:1,JHS2:2,JHS3:3,ALL:9}[st.learningStage||'JHS1']||1;
 const grade=Number((q.school_grade||'JHS1').match(/\d+/)?.[0]||1);
 return grade<=limit;
}
function questionReady(st,q){
 return prerequisiteReady(st,q.skill)&&schoolReady(st,q)&&
  (q.learning_role==='base'||targetBaseReady(st,q.target_id));
}
function adaptiveQuestPlan(raw,day,targetOverride){
 const st=adaptiveNormalize(raw),target=Math.max(8,Math.min(14,targetOverride||st.dailyGoal||12));
 const selected=[],reasons={},used=new Set(),usedTargets=new Set();
 const add=(q,reason)=>{if(q&&!used.has(q.id)&&!usedTargets.has(q.target_id)&&selected.length<target){selected.push(q);used.add(q.id);usedTargets.add(q.target_id);reasons[q.id]=reason;return true}return false};
 const byId=Object.fromEntries(bank.map(q=>[q.id,q]));
 const due=(st.reviews||[]).filter(r=>r.due<=day&&byId[r.id]).sort((a,b)=>a.due.localeCompare(b.due));
 // Keep overdue reviews represented, but do not let them consume every quest.
 let dueCount=0;for(const r of due){const q=byId[r.id];if(dueCount>=Math.ceil(target*.3))break;
  if(!st.remediationQueue.some(item=>item.targetId===q.target_id&&item.phase==='base'&&q.learning_role==='transfer')&&(questionReady(st,q)||st.questionHistory?.[q.id])){if(add(q,'due_review'))dueCount++}
 }
 // A recent error returns to the base item, then an independent context check.
 let remediationCount=0;for(const item of st.remediationQueue){
  if(remediationCount>=Math.ceil(target*.25))break;
  const t=LEARNING_TARGETS[item.targetId];if(!t)continue;
  const q=item.phase==='transfer'?bank.find(q=>q.target_id===t.id&&q.learning_role==='transfer'&&q.id!==item.sourceId)||bank.find(q=>q.target_id===t.id&&q.learning_role==='transfer'):byId[t.baseQuestionId];
  if(q&&schoolReady(st,q)&&prerequisiteReady(st,q.skill)&&add(q,'remediation_'+item.phase))remediationCount++;
 }
 // Preserve useful legacy misconception counts without filling the session with one tag.
 const legacyTags=Object.entries(st.mistakes||{}).sort((a,b)=>b[1]-a[1]).slice(0,2).map(x=>x[0]);
 if(!st.remediationQueue.length&&legacyTags.length){
  const base=bank.find(q=>q.learning_role==='base'&&questionReady(st,q)&&q.mis.some(m=>legacyTags.includes(m)));add(base,'legacy_weakness');
 }
 const weakTypes=['vocab','grammar','listening','reading'].sort((a,b)=>(st.mastery?.[a]||0)-(st.mastery?.[b]||0));
 const ready=bank.filter(q=>questionReady(st,q));
 const recent=q=>{const last=st.questionHistory?.[q.id];return last&&(new Date(day+'T12:00:00Z')-new Date(last+'T12:00:00Z'))/86400000<3};
 const rank=q=>{
  const p=st.targetProgress[q.target_id]||{};
  return (recent(q)?1000:0)+(q.learning_role==='transfer'&&!p.transferConfirmed?0:q.learning_role==='base'&&!p.basePassed?10:30)+(st.skillMastery?.[q.skill]||30);
 };
 const queues=Object.fromEntries(weakTypes.map(type=>[type,ready.filter(q=>q.type===type).sort((a,b)=>rank(a)-rank(b)||a.id.localeCompare(b.id,undefined,{numeric:true}))]));
 // Reserve one eligible question from each domain even when weakness reviews are concentrated.
 for(const type of weakTypes)if(!selected.some(q=>q.type===type)){const q=queues[type].find(q=>!used.has(q.id)&&!usedTargets.has(q.target_id));add(q,q?.learning_role==='transfer'?'transfer_check':'new_base')}
 while(selected.length<target&&weakTypes.some(t=>queues[t].length)){
  for(const type of weakTypes){while(queues[type].length&&(used.has(queues[type][0].id)||usedTargets.has(queues[type][0].target_id)))queues[type].shift();const q=queues[type].shift();add(q,q?.learning_role==='transfer'?'transfer_check':st.targetProgress[q?.target_id]?.basePassed?'base_review':'new_base');}
 }
 // Mix domains without losing the reason or source question identity.
 const result=[],mixed=Object.fromEntries(weakTypes.map(t=>[t,selected.filter(q=>q.type===t)]));let last='';
 while(result.length<selected.length){let type=weakTypes.filter(t=>mixed[t].length&&t!==last).sort((a,b)=>mixed[b].length-mixed[a].length)[0]||weakTypes.find(t=>mixed[t].length);if(!type)break;result.push(mixed[type].shift());last=type;}
 return {questions:result,reasons,counts:result.reduce((a,q)=>{const r=reasons[q.id];a[r]=(a[r]||0)+1;return a},{}),requested:target};
}
function adaptivePickDaily(st,day,targetOverride){return adaptiveQuestPlan(st,day,targetOverride).questions;}
function adaptiveApplyAnswer(raw,q,ok,day,selectedIndex){
 const out=adaptiveNormalize(raw);out.questionHistory=out.questionHistory||{};out.questionHistory[q.id]=day;out.answerSerial++;
 out.skillMastery=out.skillMastery||{};out.mastery=out.mastery||{};out.mistakes=out.mistakes||{};
 const sm=Math.max(0,Math.min(100,(out.skillMastery[q.skill]??30)+(ok?8:-7)));out.skillMastery[q.skill]=sm;
 out.mastery[q.type]=Math.max(0,Math.min(100,(out.mastery[q.type]??20)+(ok?3:-2)));
 const tag=!ok?(q.mis[selectedIndex]||q.mis.find(Boolean)):'';
 if(tag)out.mistakes[tag]=(out.mistakes[tag]||0)+1;
 const p=out.targetProgress[q.target_id]||{basePassed:false,transferConfirmed:false,transferIds:[],attempts:0};
 p.attempts++;p.lastAnswered=day;
 if(ok&&q.learning_role==='base')p.basePassed=true;
 if(ok&&q.learning_role==='transfer'&&p.basePassed){p.transferIds=[...new Set([...(p.transferIds||[]),q.id])];p.transferConfirmed=true;}
 if(!ok){p.basePassed=false;p.transferConfirmed=false;p.transferIds=[];p.lastWrong=day;}
 out.targetProgress[q.target_id]=p;
 let item=out.remediationQueue.find(r=>r.targetId===q.target_id);
 if(!ok){if(!item){item={targetId:q.target_id};out.remediationQueue.push(item)}Object.assign(item,{sourceId:q.id,tag,phase:'base',createdAt:day});}
 else if(item&&q.learning_role==='base')item.phase='transfer';
 else if(item&&q.learning_role==='transfer'&&p.basePassed)out.remediationQueue=out.remediationQueue.filter(r=>r!==item);
 const days=ok?(sm>=90?60:sm>=80?30:sm>=60?14:sm>=40?7:3):1;
 const date=new Date(day+'T12:00:00Z');date.setUTCDate(date.getUTCDate()+days);
 out.reviews=(out.reviews||[]).filter(r=>r.id!==q.id);out.reviews.push({id:q.id,due:date.toISOString().slice(0,10)});
 return out;
}
function shuffleQuestion(q,rng=Math.random){
 const order=q.c.map((_,i)=>i);for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.max(0,Math.min(.999999,Number(rng())||0))*(i+1));[order[i],order[j]]=[order[j],order[i]]}
 return {...q,c:order.map(i=>q.c[i]),a:order.indexOf(q.a),mis:order.map(i=>q.mis[i]),distractor_notes:order.map(i=>q.distractor_notes?.[i]||''),choiceOrder:order};
}
