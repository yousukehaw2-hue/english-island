// Island growth is derived from existing learning records; no save-data reset.
const ISLAND_FACILITIES={
 garden:{domain:'vocab',name:'ことばの庭',icons:['🌱','🌿','🌷','🌳','🌳🌷','🌳🌷🌻']},
 workshop:{domain:'grammar',name:'文法の工房',icons:['⛺','🛖','🏠','🏡','🏡🔨','🏡🔨⚙️']},
 music:{domain:'listening',name:'音楽ひろば',icons:['🎵','🎶','🎸','🎹','🎹🎸','🎹🎸🎺']},
 library:{domain:'reading',name:'読書の図書館',icons:['📖','📚','🏠📖','🏛️','🏛️📚','🏛️📚🦉']}
};
function islandGrowthView(st){
 const stars=Math.max(0,Math.floor(Number(st.stars)||0));
 const levels=facilityLevels({...st,mastery:st.mastery||{}});
 const facilities=Object.fromEntries(Object.entries(ISLAND_FACILITIES).map(([key,f])=>{
  const mastery=Math.max(0,Math.min(100,Number(st.mastery?.[f.domain])||0));
  const level=Math.max(1,Math.min(6,levels[key]));
  return [key,{...f,level,mastery,icon:f.icons[level-1],nextMastery:level<6?level*20:null}];
 }));
 return {stars,level:1+Math.floor(stars/120),stage:Math.min(4,Math.floor(stars/120)),progress:stars%120,remaining:120-stars%120,decorations:Math.min(12,Math.floor(stars/30)),facilities};
}
function renderIslandGrowth(st,doc=document){
 const view=islandGrowthView(st);
 doc.querySelectorAll('[data-island-scene]').forEach(scene=>{
  scene.dataset.growthStage=String(view.stage);
  scene.setAttribute('aria-label','島レベル'+view.level+'、飾り'+view.decorations+'個');
 });
 for(const [key,f] of Object.entries(view.facilities)){
  doc.querySelectorAll('[data-facility="'+key+'"]').forEach(el=>{el.textContent=f.icon;el.setAttribute('aria-label',f.name+' レベル'+f.level);});
  doc.querySelectorAll('[data-facility-level="'+key+'"]').forEach(el=>{el.textContent='Lv.'+f.level;});
  doc.querySelectorAll('[data-facility-next="'+key+'"]').forEach(el=>{el.textContent=f.nextMastery===null?'すくすく育ったよ！':'次の成長まで習熟度あと'+Math.max(0,f.nextMastery-f.mastery);});
 }
 const ornaments=['🌼','🌻','🪴','🦋','🌺','🍄','🌸','🐚','🌼','🦋','🌻','🌺'];
 doc.querySelectorAll('[data-island-decorations]').forEach(el=>{
  el.replaceChildren();
  ornaments.slice(0,view.decorations).forEach((icon,i)=>{const span=doc.createElement('span');span.textContent=icon;span.style.left=(12+(i%6)*13)+'%';span.style.top=(i<6?76:19)+'%';el.appendChild(span);});
 });
 doc.querySelectorAll('[data-island-progress]').forEach(el=>{el.style.width=(view.progress/120*100)+'%';});
 doc.querySelectorAll('[data-island-next]').forEach(el=>{el.textContent='島 Lv.'+view.level+' ・次のレベルまであと'+view.remaining+' Stars';});
 return view;
}
