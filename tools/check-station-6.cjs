const fs=require('fs'),assert=require('assert'),path=require('path');
const page=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');const game=Buffer.from(page.match(/id="GAME">([^<]+)/)[1],'base64').toString();
const a=game.indexOf(' setup(a,api){',game.indexOf("name:'Abpacken'"))+1,b=game.indexOf('\n }}\n];',a);assert(a>0&&b>a);
const source=game.slice(a,b+3);assert.equal(source.trim(),fs.readFileSync(path.join(__dirname,'station-6-packing-setup.js'),'utf8').trim());const setupCode=source.replace(/^setup\(a,api\)/,'function(a,api)');
for(const [name,file,ratio,alpha] of [['PACKING_SCENE','station-6-packplatz.webp',1.5,false],['PACKING_SACKS','station-6-jutesack-fuellstufen.webp',2,true],['PACKING_TOOL','station-6-schaufel-und-bohnen.webp',3,true]]){
 const png=require('./webp-info.cjs')(fs.readFileSync(path.join(__dirname,'../assets',file)));assert(Math.abs(png.width-png.height*ratio)<=1);if(alpha)assert(png.alpha);assert(new RegExp('const '+name+'="data:image/webp;base64,[A-Za-z0-9+/=]+";').test(game));
}
for(const reduced of [false,true])for(const scenario of ['complete','closeLift','closePour','closeTie','detached']){
 let now=0,queue=[],counts=[],finished=0,cleanup;const animations=[];
 const schedule=(fn,ms)=>{const t={fn,at:now+ms};queue.push(t);return t};const cancel=t=>{queue=queue.filter(q=>q!==t)};
 const advance=target=>{let limit=1000;while(queue.some(t=>t.at<=target)){assert(limit-->0);queue.sort((a,b)=>a.at-b.at);const t=queue.shift();now=t.at;t.fn()}now=target};
 const flush=()=>{let limit=1000;while(queue.length){assert(limit-->0);advance(Math.min(...queue.map(t=>t.at)))}};
 const elements={};for(const key of ['.stage','.packing-sack','.packing-scoop','.packing-grains','#shovel']){
  const e={dataset:{},isConnected:true,style:{setProperty(k,v){this[k]=v}},attributes:{},classes:new Set(),setAttribute(k,v){this.attributes[k]=v},getBoundingClientRect(){return{left:100,top:100,width:100,height:100}}};
  e.classList={add:k=>e.classes.add(k)};e.animate=(frames,options)=>{const anim={cancelled:false,cancel(){this.cancelled=true;cancel(this.task)}};animations.push(anim);Object.defineProperty(anim,'onfinish',{set(fn){anim.task=schedule(fn,options.duration)}});return anim};elements[key]=e;
 }
 const area={querySelector:k=>elements[k]};const sack=elements['.packing-sack'],stage=elements['.stage'],button=elements['#shovel'];
 const setup=new Function('PACKING_SCENE','PACKING_SACKS_URL','PACKING_TOOL','window','setTimeout','clearTimeout','return '+setupCode)('scene','sacks','tool',{matchMedia:()=>({matches:reduced})},schedule,cancel);
 cleanup=setup(area,{count:(n,max)=>counts.push([n,max]),hint(){},done(){finished++;cleanup()}});
 assert.deepEqual(counts,[[0,5]]);assert.equal(sack.dataset.frame,'0');let aborted=false;
 for(let i=0;i<5;i++){
  button.onclick();button.onclick();button.onclick();assert(button.disabled);assert.equal(counts.at(-1)[0],i);assert.equal(finished,0);
  if((scenario==='closeLift'&&i===0)||(scenario==='detached'&&i===0)){if(scenario==='detached')stage.isConnected=false;else cleanup();flush();assert.equal(finished,0);assert.equal(counts.at(-1)[0],0);aborted=true;break}
  if(scenario==='closePour'&&i===0){if(!reduced)advance(now+600);cleanup();flush();assert.equal(finished,0);assert.equal(counts.at(-1)[0],0);aborted=true;break}
  if(scenario==='closeTie'&&i===4&&!reduced){advance(now+1300);assert.equal(sack.dataset.frame,'5');assert.equal(finished,0);cleanup();flush();assert.equal(finished,0);aborted=true;break}
  flush();assert.deepEqual(counts.at(-1),[i+1,5]);assert.equal(stage.dataset.scoops,String(i+1));assert.equal(sack.dataset.frame,String(i<4?i+1:6));if(i<4)assert(!button.disabled);
 }
 if(aborted)continue;
 assert.equal(finished,1);assert(button.disabled);assert(sack.classes.has('tied'));assert(sack.attributes['aria-label'].includes('60 Kilogramm'));
 button.onclick();flush();assert.equal(finished,1);assert.equal(counts.at(-1)[0],5);assert.equal(animations.length,10);
}
console.log('OK: Station 6: embedded photographs, five guarded scoops, progressive sack fill, pouring before completion, tied final state, close/detach cleanup and reduced motion.');
