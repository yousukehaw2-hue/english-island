const fs=require('fs'),vm=require('vm');
const html=fs.readFileSync('index.html','utf8');
const tests=fs.readFileSync('regression-tests.js','utf8');
const script=(html.match(/<script>([\s\S]*?)<\/script>/)||[])[1];
if(!script) throw new Error('index.html script not found');
const cut=script.indexOf('let state;try');
if(cut<0) throw new Error('pure engine boundary not found');
let engine=fs.readFileSync('curriculum-data.js','utf8')+'\n'+fs.readFileSync('quality-pass-v081.js','utf8')+'\n'+fs.readFileSync('curriculum-v092.js','utf8')+'\n'+fs.readFileSync('curriculum-audit-v09.js','utf8')+'\n'+fs.readFileSync('curriculum-audit-v092.js','utf8')+'\n'+fs.readFileSync('curriculum-review.js','utf8')+'\n'+script.slice(0,cut);
engine += '\n'+fs.readFileSync('island-growth.js','utf8')+'\n'+fs.readFileSync('island-longterm.js','utf8')+'\n'+fs.readFileSync('adaptive-engine.js','utf8')+'\n'+tests+'\n'+fs.readFileSync('adaptive-tests.js','utf8')+'\n'+fs.readFileSync('longterm-tests.js','utf8');
fs.writeFileSync('.ci-generated-tests.js',engine);
console.log('Generated executable regression suite from production engine.');

// ci-trigger: 2026-09-29

