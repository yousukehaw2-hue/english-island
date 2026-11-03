// Island visual decluttering: presentation-only; no saved learning data is changed.
const ISLAND_AREAS=[
 {id:'center',name:'中央広場',icon:'🏡',description:'相棒と島の中心。成長した名所をひとつだけ紹介します。'},
 {id:'garden',name:'ことばの庭',icon:'🌷',description:'Vocabularyの成長を楽しむ場所。'},
 {id:'workshop',name:'文法の工房',icon:'🔨',description:'Grammarの成長を楽しむ場所。'},
 {id:'library',name:'読書の図書館',icon:'📚',description:'Readingの成長を楽しむ場所。'},
 {id:'music',name:'音楽ひろば',icon:'🎵',description:'Listeningの成長を楽しむ場所。'}
];
let selectedIslandArea='center';
function islandLayoutModel(st,area=selectedIslandArea){
 const long=islandLongtermView(st),growth=islandGrowthView(st);
 const selected=ISLAND_AREAS.find(a=>a.id===area)||ISLAND_AREAS[0];
 return {selected,landmark:long.unlocked.at(-1),decorations:Math.min(3,growth.decorations),
  facility:selected.id==='center'?null:growth.facilities[selected.id]};
}
function renderIslandLayout(st,doc=document){
 const model=islandLayoutModel(st);
 doc.querySelectorAll('[data-island-scene]').forEach(scene=>{
  scene.dataset.area=model.selected.id;
  scene.setAttribute('aria-label',model.selected.name+'。'+(model.facility?'レベル'+model.facility.level:'島の中央広場'));
 });
 doc.querySelectorAll('[data-island-area-tabs]').forEach(el=>{
  el.replaceChildren();
  ISLAND_AREAS.forEach(area=>{
   const b=doc.createElement('button');b.type='button';b.className='islandAreaTab'+(area.id===model.selected.id?' active':'');
   b.textContent=area.icon+' '+area.name;b.setAttribute('aria-pressed',String(area.id===model.selected.id));
   b.addEventListener('click',()=>{selectedIslandArea=area.id;renderIslandLayout(st,doc)});
   el.appendChild(b);
  });
 });
 doc.querySelectorAll('[data-island-area-description]').forEach(el=>{
  el.textContent=model.selected.description+(model.facility?' 現在 Lv.'+model.facility.level:'');
 });
 doc.querySelectorAll('[data-island-landmarks]').forEach(el=>{
  el.replaceChildren();
  if(model.selected.id==='center'&&model.landmark){
   const n=doc.createElement('span');n.textContent=model.landmark.icon;n.className='islandFeaturedLandmark';
   n.setAttribute('aria-label',model.landmark.name);el.appendChild(n);
  }
 });
 doc.querySelectorAll('[data-island-decorations]').forEach(el=>{
  el.replaceChildren();
  const ornaments=['🌼','🦋','🌷'];
  for(let i=0;i<model.decorations;i++){
   const n=doc.createElement('span');n.textContent=ornaments[i];n.className='islandQuietDecor islandQuietDecor'+i;el.appendChild(n);
  }
 });
 doc.querySelectorAll('[data-island-scene] [data-facility]').forEach(el=>{
  el.hidden=model.selected.id==='center'||el.dataset.facility!==model.selected.id;
 });
}
