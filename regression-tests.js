// English Island v0.7.4 regression scenarios.
// Copy/paste into browser console after app loads, or run through a browser test harness.
(function(){
 const R=[];const ok=(name,v)=>R.push({name,pass:!!v});
 let st=engineMigrate(null);ok("new user defaults",st.version===7&&!st.diagnosed&&st.mastery.reading===20);
 let legacy=engineMigrate({version:4,stars:55,mastery:{vocab:61},reviews:[{id:"g1",due:"2026-09-28"}]});
 ok("v4 migration preserves data",legacy.stars===55&&legacy.mastery.vocab===61&&legacy.mastery.reading===20);
 let q=enginePickDaily(legacy,"2026-09-28",12);ok("daily target",q.length===12);ok("due review included",q.some(x=>x.id==="g1"));
 ok("category interleave",q.every((x,i)=>i===0||x.type!==q[i-1].type));
 let wrong=engineApplyAnswer(st,bank.find(x=>x.id==="g2"),false,"2026-09-28");ok("wrong schedules next day",wrong.reviews.some(x=>x.id==="g2"&&x.due==="2026-09-29"));
 let strong=engineMigrate({version:7,skillMastery:{grammar_third:90}});strong=engineApplyAnswer(strong,bank.find(x=>x.id==="g2"),true,"2026-09-28");ok("mastered schedules 60 days",strong.reviews.some(x=>x.id==="g2"&&x.due==="2026-11-27"));
 let hard=engineFeedback(st,"hard"),fun=engineFeedback(st,"fun");ok("hard reduces load",hard.dailyGoal===10);ok("fun increases load",fun.dailyGoal===13);
 let quick=enginePickDaily(st,"2026-09-28",12).slice(0,5);ok("quick is 5",quick.length===5);
 let reload=engineMigrate(JSON.parse(JSON.stringify(wrong)));ok("reload preserves review",reload.reviews.some(x=>x.id==="g2"));
 ok("buddy preserved",engineMigrate({...st,buddy:"cat"}).buddy==="cat");
 console.table(R);console.log("RESULT",R.filter(x=>x.pass).length+"/"+R.length,R.every(x=>x.pass)?"PASS":"FAIL");return R;
})();