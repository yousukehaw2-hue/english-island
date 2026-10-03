// Permanent unlocks use cumulative Stars; seasonal chapters continue beyond the last landmark.
const ISLAND_MILESTONES=[
 {stars:0,name:'はじまりの浜辺',icon:'🐚',x:8,y:77},
 {stars:120,name:'花の小道',icon:'🌷',x:26,y:76},
 {stars:360,name:'ピクニック広場',icon:'🧺',x:67,y:68},
 {stars:720,name:'小さな桟橋',icon:'⛵',x:82,y:76},
 {stars:1200,name:'森のキャンプ場',icon:'🏕️',x:13,y:29},
 {stars:1800,name:'果樹園',icon:'🍎',x:70,y:30},
 {stars:2700,name:'島のカフェ',icon:'☕',x:45,y:22},
 {stars:3900,name:'お花の温室',icon:'🪴',x:7,y:55},
 {stars:5400,name:'灯台の丘',icon:'🗼',x:86,y:37},
 {stars:7200,name:'星空の展望台',icon:'🔭',x:60,y:13},
 {stars:9600,name:'海辺のステージ',icon:'🎪',x:32,y:12},
 {stars:12600,name:'島のお祝い広場',icon:'🎡',x:76,y:53}
];
const ISLAND_SEASONS=[{name:'花咲く春',color:'#bce3a1',icon:'🌸'},{name:'きらめく夏',color:'#93d49f',icon:'🌻'},{name:'実りの秋',color:'#e0c58e',icon:'🍁'},{name:'きらきら冬',color:'#cee5dc',icon:'❄️'}];
function islandLongtermView(st){
 const stars=Math.max(0,Math.floor(Number(st.stars)||0)),unlocked=ISLAND_MILESTONES.filter(m=>stars>=m.stars);
 const chapter=stars<12600?0:1+Math.floor((stars-12600)/1800),season=ISLAND_SEASONS[(Math.max(1,chapter)-1)%4];
 const next=ISLAND_MILESTONES.find(m=>m.stars>stars)||{stars:12600+chapter*1800,name:ISLAND_SEASONS[chapter%4].name+'の章',icon:ISLAND_SEASONS[chapter%4].icon};
 const previous=chapter?12600+(chapter-1)*1800:unlocked[unlocked.length-1].stars;
 const studyDays=new Set((st.studyDays||[]).filter(d=>/^\d{4}-\d{2}-\d{2}$/.test(d))).size;
 const buddyStages=[{days:0,name:'島の新しい友だち',icon:'🌱'},{days:7,name:'おさんぽ仲間',icon:'🌼'},{days:21,name:'島の探検家',icon:'🎒'},{days:60,name:'島の案内人',icon:'👑'}];
 const buddyStage=buddyStages.filter(m=>studyDays>=m.days).at(-1),buddyNext=buddyStages.find(m=>m.days>studyDays);
 return {stars,unlocked,chapter,season,next,remaining:next.stars-stars,progress:(stars-previous)/(next.stars-previous),studyDays,buddyStage,buddyNext};
}
function renderIslandLongterm(st,doc=document){
 const v=islandLongtermView(st);
 doc.querySelectorAll('[data-island-scene]').forEach(el=>{el.dataset.chapter=String(v.chapter);el.dataset.districts=String(v.unlocked.length);if(v.chapter)el.style.background=v.season.color;});
 doc.querySelectorAll('[data-island-landmarks]').forEach(el=>{el.replaceChildren();v.unlocked.forEach(m=>{const n=doc.createElement('span');n.textContent=m.icon;n.style.left=m.x+'%';n.style.top=m.y+'%';n.setAttribute('aria-label',m.name);el.appendChild(n)});});
 doc.querySelectorAll('[data-island-chapter]').forEach(el=>el.textContent=v.chapter?v.season.icon+' '+v.season.name+' 第'+v.chapter+'章':'🌿 '+v.unlocked.at(-1).name);
 doc.querySelectorAll('[data-island-unlock-next]').forEach(el=>el.textContent=v.next.icon+' '+v.next.name+'まであと'+v.remaining+' Stars');
 doc.querySelectorAll('[data-island-unlock-progress]').forEach(el=>el.style.width=Math.round(v.progress*100)+'%');
 doc.querySelectorAll('[data-island-milestones]').forEach(el=>{el.replaceChildren();ISLAND_MILESTONES.forEach(m=>{const n=doc.createElement('div');n.className='milestone'+(v.stars>=m.stars?' unlocked':'');n.textContent=(v.stars>=m.stars?'✓ ':'🔒 ')+m.icon+' '+m.name+' ・'+m.stars+' Stars';el.appendChild(n)});});
 doc.querySelectorAll('[data-buddy-stage]').forEach(el=>el.textContent=v.buddyStage.icon+' '+v.buddyStage.name+' ・学習'+v.studyDays+'日');
 doc.querySelectorAll('[data-buddy-next]').forEach(el=>el.textContent=v.buddyNext?'あと'+(v.buddyNext.days-v.studyDays)+'日学ぶと「'+v.buddyNext.name+'」へ。連続でなくても大丈夫！':'これからも一緒に島の季節をめぐろう！');
 doc.querySelectorAll('[data-buddy-accessory]').forEach(el=>el.textContent=v.buddyStage.days?v.buddyStage.icon:'');
 return v;
}
function renderBuddyIllustration(st,doc=document){
 const key=['rabbit','squirrel','cat'].includes(st.buddy)?st.buddy:'rabbit';
 doc.querySelectorAll('[data-buddy]').forEach(el=>{el.textContent='';el.dataset.character=key;const stage=islandLongtermView(st).buddyStage;el.dataset.buddyLook=String(stage.days);if(stage.days){const accessory=doc.createElement('span');accessory.className='buddyAccessory';accessory.textContent=stage.icon;el.appendChild(accessory)}el.setAttribute('role','img');el.setAttribute('aria-label',({rabbit:'ラビィ',squirrel:'リッタ',cat:'ミュウ'})[key]);});
}
