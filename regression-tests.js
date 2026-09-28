// English Island v0.8.0 engine regression suite
(function(){const R=[],ok=(n,v)=>R.push({name:n,pass:!!v}),D="2026-09-28";
let s=engineMigrate(null);ok("01 defaults v8",s.version===8&&s.mastery.reading===20);
let v4=engineMigrate({version:4,stars:55,mastery:{vocab:61}});ok("02 v4 preserve",v4.stars===55&&v4.mastery.vocab===61);
ok("03 v8 fields",!!s.questionHistory&&s.graceAvailable===true&&s.facilities.garden===1);
let q=enginePickDaily(s,D,12);ok("04 daily 12",q.length===12);ok("05 interleave",q.every((x,i)=>!i||x.type!==q[i-1].type));
let due=engineMigrate({version:7,reviews:[{id:"g1",due:D}]});ok("06 due included",enginePickDaily(due,D,12).some(x=>x.id==="g1"));
let w=engineApplyAnswer(s,bank.find(x=>x.id==="g2"),false,D);ok("07 wrong +1d",w.reviews.some(x=>x.id==="g2"&&x.due==="2026-09-29"));ok("08 history recorded",w.questionHistory.g2===D);
for(const [n,sm,date] of [["09 3d",30,"2026-10-01"],["10 7d",32,"2026-10-05"],["11 14d",52,"2026-10-12"],["12 30d",72,"2026-10-28"],["13 60d",82,"2026-11-27"]]){let x=engineMigrate({version:8,skillMastery:{grammar_third:sm}});x=engineApplyAnswer(x,bank.find(z=>z.id==="g2"),true,D);ok(n,x.reviews.find(r=>r.id==="g2").due===date)}
ok("14 hard",engineFeedback(s,"hard").dailyGoal===10);ok("15 fun",engineFeedback(s,"fun").dailyGoal===13);
let min={...s,dailyGoal:8};ok("16 hard floor",engineFeedback(min,"hard").dailyGoal===8);let max={...s,dailyGoal:14};ok("17 fun ceiling",engineFeedback(max,"fun").dailyGoal===14);
ok("18 quick 5",enginePickDaily(s,D,12).slice(0,5).length===5);
let recent=engineMigrate({version:8,questionHistory:{v1:"2026-09-27"}}),rq=enginePickDaily(recent,D,12);ok("19 recent suppressed",!rq.slice(0,8).some(x=>x.id==="v1"));
let st=updateStreak({...s,lastStudy:"2026-09-27",streak:3},D);ok("20 streak next day",st.streak===4);
let gr=updateStreak({...s,lastStudy:"2026-09-26",streak:3,graceAvailable:true},D);ok("21 grace",gr.streak===4&&!gr.graceAvailable);
let br=updateStreak({...s,lastStudy:"2026-09-24",streak:9},D);ok("22 streak restart",br.streak===1);
ok("23 labels",masteryLabel(95)==="Mastered"&&masteryLabel(45)==="Growing");
ok("24 facilities",facilityLevels({...s,mastery:{vocab:61,grammar:20,listening:40,reading:80}}).library===5);
ok("25 buddy preserve",engineMigrate({...s,buddy:"cat"}).buddy==="cat");
console.table(R);console.log("RESULT",R.filter(x=>x.pass).length+"/"+R.length,R.every(x=>x.pass)?"PASS":"FAIL");return R})();