(function(){const assert=(n,v)=>{if(!v)throw Error(n);count++},day='2026-10-03';let count=0;
const find=id=>bank.find(q=>q.id===id),fresh=()=>engineMigrate(null),unlocked=()=>({...fresh(),learningStage:'ALL',skillMastery:Object.fromEntries(SKILL_TREE.map(s=>[s.id,50]))});
let st=unlocked(),base=find('v1'),transfer=bank.find(q=>q.target_id===base.target_id&&q.learning_role==='transfer');
assert('transfer requires base',!questionReady(st,transfer));st=engineApplyAnswer(st,base,true,day,base.a);assert('base unlocks transfer',questionReady(st,transfer));
st=engineApplyAnswer(st,transfer,false,day,(transfer.a+1)%4);assert('wrong resets certification',!st.targetProgress[base.target_id].basePassed&&st.remediationQueue[0].phase==='base');
let plan=adaptiveQuestPlan(st,'2026-10-04',12);assert('return to base rather than wrong transfer',plan.questions.some(q=>q.id===base.id)&&!plan.questions.some(q=>q.id===transfer.id));
st=engineApplyAnswer(st,base,true,day,base.a);assert('queue advances to transfer',st.remediationQueue[0].phase==='transfer');plan=adaptiveQuestPlan(st,day,12);assert('transfer appears in quest',plan.questions.some(q=>q.id===transfer.id));
st=engineApplyAnswer(st,transfer,true,day,transfer.a);assert('remediation cleared after transfer',!st.remediationQueue.length&&st.targetProgress[base.target_id].transferConfirmed);
const before=JSON.stringify(base),shuffled=shuffleQuestion(base,()=>0);assert('shuffle retains answer',shuffled.c[shuffled.a]===base.c[base.a]);assert('source untouched',before===JSON.stringify(base));
for(let i=0;i<4;i++){assert('diagnostic follows choice',shuffled.mis[i]===base.mis[shuffled.choiceOrder[i]]);assert('note follows choice',shuffled.distractor_notes[i]===base.distractor_notes[shuffled.choiceOrder[i]])}
const wrong=(shuffled.a+1)%4,after=engineApplyAnswer(unlocked(),shuffled,false,day,wrong);assert('chosen diagnostic recorded once',after.mistakes[shuffled.mis[wrong]]===1);
assert('advanced prerequisite gated',!questionReady(fresh(),find('g14')));assert('stage gated',!schoolReady(fresh(),find('g67')));
const original={...fresh(),stars:170,buddy:'cat',reviews:[{id:'g1',due:day}]},migrated=engineMigrate(original);assert('legacy record preserved',migrated.stars===170&&migrated.buddy==='cat'&&migrated.reviews.length===1);assert('no invented certification',!Object.keys(migrated.targetProgress).length);
assert('all targets paired',Object.values(LEARNING_TARGETS).every(t=>bank.some(q=>q.target_id===t.id&&q.learning_role==='base')&&bank.some(q=>q.target_id===t.id&&q.learning_role==='transfer')));
assert('distinct grammar knowledge',find('g14').target_id!==find('g52').target_id&&find('g18').target_id!==find('g56').target_id);
for(const size of [8,12,14]){const p=adaptiveQuestPlan(unlocked(),day,size);assert('quest length '+size,p.questions.length===size);assert('quest domains '+size,new Set(p.questions.map(q=>q.type)).size===4);assert('unique targets '+size,new Set(p.questions.map(q=>q.target_id)).size===size);assert('all ready '+size,p.questions.every(q=>questionReady(unlocked(),q)))}
console.log('PASS '+count+' adaptive learning checks.');})();
