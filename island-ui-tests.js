// Exercise production UI wiring and quest completion without browser dependencies.
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync('index.html','utf8');
function makeDocument(){
 const nodes=[],ids={};
 function element(tag,attrs={}){
  const node={tagName:tag,dataset:{},style:{},children:[],textContent:'',attrs,
   classList:{add(){},remove(){},toggle(){}},
   setAttribute(k,v){this.attrs[k]=v},
   replaceChildren(){this.children=[]},appendChild(n){this.children.push(n)}};
  for(const [k,v] of Object.entries(attrs))if(k.startsWith('data-'))node.dataset[k.slice(5).replace(/-([a-z])/g,(_,x)=>x.toUpperCase())]=v;
  Object.defineProperty(node,'className',{get(){return this.attrs.class||''},set(v){this.attrs.class=v}});
  Object.defineProperty(node,'innerHTML',{get(){return this.markup||''},set(value){this.markup=value;parse(value)}});
  nodes.push(node);if(attrs.id)ids[attrs.id]=node;return node;
 }
 function parse(markup){for(const m of markup.matchAll(/<([a-z]+)\b([^>]*)>/g)){
  const attrs={};for(const a of m[2].matchAll(/([\w-]+)(?:="([^"]*)"|='([^']*)')?/g))attrs[a[1]]=a[2]??a[3]??'';element(m[1],attrs);
 }}
 parse(html);
 const doc={createElement:t=>element(t),getElementById:id=>ids[id]||null,
  querySelectorAll(selector){
   if(selector.startsWith('.'))return nodes.filter(n=>(n.attrs.class||'').split(' ').includes(selector.slice(1)));
   const m=selector.match(/^\[([^=\]]+)(?:="([^"]*)")?\]$/);
   return m?nodes.filter(n=>Object.hasOwn(n.attrs,m[1])&&(m[2]===undefined||n.attrs[m[1]]===m[2])):[];
  }};return doc;
}
const store=new Map();
const storage={getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)};
function boot(){const context={document:makeDocument(),localStorage:storage,window:{},navigator:{},scrollTo(){},console,setTimeout(){},location:{reload(){}}};
 vm.createContext(context);
 for(const m of html.matchAll(/<script src="\.\/(.*?)"><\/script>/g))vm.runInContext(fs.readFileSync(m[1],'utf8'),context,{filename:m[1]});
 vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],context,{filename:'index.html'});return context;
}
let app=boot();
const scenes=app.document.querySelectorAll('[data-island-scene]');assert.equal(scenes.length,2);
assert(app.document.querySelectorAll('[data-facility="library"]').length>=3,'reading facility missing');
vm.runInContext('state.diagnosed=true;qs=bank.slice(0,5);mode="daily";begin();correct=0;finish();',app);
const decorations=app.document.querySelectorAll('[data-island-decorations]');
assert(decorations.every(n=>n.children.length===1),'completed quest did not decorate both scenes');
assert(app.document.getElementById('islandReward').textContent.includes('飾りが1個'),'completion does not report growth');
app=boot();assert(app.document.querySelectorAll('[data-island-decorations]').every(n=>n.children.length===1),'reload lost existing growth');
vm.runInContext('state.mastery={vocab:80,grammar:60,listening:40,reading:100};state.stars=360;save();',app);
assert(app.document.querySelectorAll('[data-facility-level="library"]').every(n=>n.textContent==='Lv.6'));
assert(app.document.querySelectorAll('[data-island-scene]').every(n=>n.dataset.growthStage==='3'));
assert.equal(JSON.parse(storage.getItem('ei-state')).stars,360);
console.log('PASS production island rendering, quest reward, reload persistence and four facility growth.');
vm.runInContext('state=engineMigrate(null);state.diagnosed=true;mode="daily";qs=[bank.find(q=>q.id==="v1")];begin();answer((qs[0].a+1)%4,document.getElementById("answers").children[(qs[0].a+1)%4]);',app);
assert(app.document.getElementById('feedback').innerHTML.includes('次の確認'),'missing remediation guidance');
assert.equal(JSON.parse(storage.getItem('ei-state')).remediationQueue.length,1);
app=boot();vm.runInContext('mode="daily";qs=pickDaily();begin();',app);
assert(vm.runInContext('qs.some(q=>q.id==="v1")&&state.remediationQueue[0].phase==="base"',app),'reload did not schedule remediation');
vm.runInContext('qs=[bank.find(q=>q.id==="v1")];begin();answer(qs[0].a,document.getElementById("answers").children[qs[0].a]);',app);
assert.equal(JSON.parse(storage.getItem('ei-state')).remediationQueue[0].phase,'transfer');
app=boot();vm.runInContext('mode="daily";qs=pickDaily();begin();',app);
assert(vm.runInContext('qs.some(q=>q.target_id===bank.find(b=>b.id==="v1").target_id&&q.learning_role==="transfer")',app),'next quest did not include transfer');
console.log('PASS production choice answers, feedback, saved remediation and next-quest transfer wiring.');
vm.runInContext('state.stars=5400;state.buddy="squirrel";state.studyDays=Array.from({length:21},(_,i)=>new Date(Date.UTC(2026,0,i+1)).toISOString().slice(0,10));save();',app);
assert(app.document.querySelectorAll('[data-island-landmarks]').every(n=>n.children.length===9),'long-term landmarks missing');
assert(app.document.querySelectorAll('[data-buddy]').every(n=>n.dataset.character==='squirrel'&&n.dataset.buddyLook==='21'),'buddy illustration/accessory missing');
app=boot();assert(app.document.querySelectorAll('[data-island-landmarks]').every(n=>n.children.length===9),'reload lost milestones');
vm.runInContext('state.stars=14400;save();',app);
assert(app.document.querySelectorAll('[data-island-chapter]').every(n=>n.textContent.includes('夏')),'season chapter missing');
console.log('PASS permanent landmarks, buddy art/accessories, migration and seasonal chapter UI.');
