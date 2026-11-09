const fs=require('fs'),assert=require('assert'),path=require('path');
const source=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const s=Buffer.from(source.match(/id="GAME">([^<]+)/)[1],'base64').toString();
const a=s.indexOf(' setup(a,api){',s.indexOf("name:'Öffnen'"))+1,b=s.indexOf('\n }},',a);
assert(a>0&&b>a);const code=s.slice(a,b+3).replace(/^setup\(a,api\)/,'function(a,api)');
const portionSizes=[3,4,2,5,3,4,2,5,4,3,5];
assert(portionSizes.every(n=>n>=2&&n<=5));assert.equal(portionSizes.reduce((a,b)=>a+b),40);
const png=require('./webp-info.cjs')(fs.readFileSync(path.join(__dirname,'../assets/station-3-frucht-leeren-stufen.webp')));
assert.equal(png.width/4,png.height/3);assert(png.alpha);
assert(/const OPENING_STAGES="data:image\/webp;base64,[A-Za-z0-9+\/=]+";/.test(s));
for(const reduced of [false,true])for(const scenario of ['complete','closeCut','closeFlight','detached']){
 let clock=0,queue=[],counts=[],finished=0,animations=[],cleanup;
 const schedule=(fn,ms)=>{const t={fn,at:clock+ms};queue.push(t);return t};
 const cancel=t=>{queue=queue.filter(q=>q!==t)};
 const flush=()=>{let limit=1000;while(queue.length){assert(limit-->0);queue.sort((a,b)=>a.at-b.at);const t=queue.shift();clock=t.at;t.fn()}};
 function el(){const e={dataset:{},style:{setProperty(k,v){this[k]=v}},classes:new Set(),children:[],listeners:{},
  getBoundingClientRect(){return {left:100,top:100,width:100,height:100}},
  classList:{add(c){e.classes.add(c)},remove(c){e.classes.delete(c)}},remove(){e.removed=true},setAttribute(k,v){e[k]=v},
  appendChild(x){e.children.push(x)},
  animate(frames,opts){const anim={cancel(){cancel(this.task)}};animations.push(anim);Object.defineProperty(anim,'onfinish',{set(fn){anim.task=schedule(fn,opts.duration)}});return anim}};return e}
 const bp=el(),blade=el(),bin=el(),bowl=el(),pod=el(),cracks=[el(),el(),el()];bp.querySelectorAll=()=>cracks;
 const st=el();st.isConnected=true;
 st.querySelector=q=>({'.bigpod':bp,'.opening-blade':blade,'.bin':bin,'.bowl':bowl,'.extraction-pod':pod}[q]);
 st.querySelectorAll=()=>st.children.filter(x=>x.className==='portion-flight'&&!x.removed);
 st.insertAdjacentHTML=(where,html)=>{st.markup=html};
 const win={matchMedia:()=>({matches:reduced})};
 const setup=new Function('OPENING_SCENE','OPENING_PODS','OPENING_STAGES_URL','OPENING_BEAN','HARVEST_MACHETE','document','window','setTimeout','clearTimeout','return '+code)('scene','pods','states','beans','machete',{createElement:el},win,schedule,cancel);
 cleanup=setup({firstElementChild:st},{count:(n,max)=>counts.push([n,max]),hint(){},done(){finished++;cleanup()}});
 assert.equal(win.__s3NB,40);assert.deepEqual(counts,[[0,3]]);
 if(scenario==='closeCut'){bp.onclick();cleanup();flush();assert.equal(finished,0);assert(!st.markup);continue}
 for(let i=0;i<3;i++){bp.onclick();bp.onclick();flush();if(i<2){assert(!bp.removed);assert.equal(counts.at(-1)[0],i+1)}}
 assert(bp.removed);assert.deepEqual(counts.at(-1),[0,40]);assert.equal(pod.dataset.frame,'0');
 assert(st.markup.includes('<button class="op l extraction-pod'));assert(!st.markup.includes('core-cover'));assert(!st.markup.includes('clip-path'));
 if(scenario==='closeFlight'||scenario==='detached'){
  pod.onclick();if(scenario==='closeFlight')cleanup();else st.isConnected=false;
  flush();assert.equal(finished,0);assert.equal(bin.children.length,0);assert(st.children.every(x=>x.removed));continue
 }
 let collected=0;
 for(let i=0;i<portionSizes.length;i++){
  assert(pod['aria-label'].includes(portionSizes[i]+' Kakaobohnen'));
  pod.onclick();pod.onclick();
  assert.equal(st.children.at(-1).children.length,portionSizes[i]);
  assert.equal(pod.dataset.frame,String(i+1));assert.equal(bin.children.length,collected);assert.equal(finished,0);
  flush();collected+=portionSizes[i];assert.deepEqual(counts.at(-1),[collected,40]);assert.equal(bin.children.length,collected);
 }
 assert.equal(finished,1);assert.equal(pod.dataset.frame,'11');assert.equal(animations.length,11);assert(pod.disabled);
 pod.onclick();flush();assert.equal(finished,1);assert.equal(bin.children.length,40);assert(st.children.every(x=>x.removed));
}
console.log('OK: Station 3: three cuts; twelve RGBA photo states; 11 portions of 2–5, exactly 40 beans; counts after arrival, double-click protection, cleanup, reduced motion.');
