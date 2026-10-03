(function(){let n=0;const check=(label,v)=>{if(!v)throw Error(label);n++};const base=defaultState(),snapshot=JSON.stringify(base);
for(const [i,m] of ISLAND_MILESTONES.entries()){const v=islandLongtermView({...base,stars:m.stars});check('unlock '+i,v.unlocked.length===i+1);check('next threshold '+i,v.remaining>0&&v.progress===0);if(i)check('locked before boundary '+i,islandLongtermView({...base,stars:m.stars-1}).unlocked.length===i)}
check('old stars restore all milestones',islandLongtermView({...base,stars:5400}).unlocked.length===9);
check('spring chapter',islandLongtermView({...base,stars:12600}).chapter===1);check('summer chapter',islandLongtermView({...base,stars:14400}).season.name==='きらめく夏');check('endless seasons',islandLongtermView({...base,stars:19800}).chapter===5&&islandLongtermView({...base,stars:19800}).remaining===1800);
check('no spend/reset',JSON.stringify(base)===snapshot);
for(const days of [0,7,21,60]){const studyDays=Array.from({length:days},(_,i)=>new Date(Date.UTC(2026,0,i+1)).toISOString().slice(0,10));const v=islandLongtermView({...base,studyDays:[...studyDays,...studyDays]});check('unique study days '+days,v.studyDays===days&&v.buddyStage.days===days)}
check('season cycle progress bounded',Array.from({length:50},(_,i)=>islandLongtermView({...base,stars:i*733})).every(v=>v.progress>=0&&v.progress<1));
console.log('PASS '+n+' long-term growth checks.');})();
