const fs=require('fs'),path=require('path'),assert=require('assert');
const root=path.join(__dirname,'..'),page=fs.readFileSync(path.join(root,'index.html'),'utf8'),s=Buffer.from(page.match(/id="GAME">([^<]+)/)[1],'base64').toString();
const a=s.indexOf(' setup(a,api){',s.indexOf("name:'Öffnen'"))+1,b=s.indexOf('\n }},',a),method=s.slice(a,b+3);
assert.equal(method.trim(),fs.readFileSync(path.join(__dirname,'station-3-photo-stages-setup.js'),'utf8').trim());
const code=method.replace(/^setup\(a,api\)/,'function(a,api)');
const png=fs.readFileSync(path.join(root,'assets/station-3-frucht-leeren-stufen.png'));
assert.equal(png.readUInt32BE(16)/4,png.readUInt32BE(20)/3);assert.equal(png[25],6);
assert(s.includes('const OPENING_STAGES="data:image/png;base64,'+png.toString('base64')+'";'));
for(const reduced of [false,true])for(const scenario of ['complete','closeCut','closeFlight','detached']){
 let queue=[],counts=[],finished=0,cleanup;
 const later=(fn,ms)=>{const t={fn,ms};queue.push(t);return t},cancel=t=>queue=queue.filter(x=>x!==t);
 const flush=()=>{let guard=1000;while(queue.length){assert(guard-->0);queue.sort((a,b)=>a.ms-b.ms);queue.shift().fn()}};
 function el(){const e={dataset:{},style:{setProperty(k,v){this[k]=v}},classes:new Set(),children:[],getBoundingClientRect:()=>({left:100,top:100,width:100,height:100}),
 classList:{add(c){e.classes.add(c)},remove(c){e.classes.delete(c)}},remove(){e.removed=true},setAttribute(k,v){e[k]=v},appendChild(x){e.children.push(x)},
 animate(frames,opts){const anim={cancel(){cancel(this.task)}};Object.defineProperty(anim,'onfinish',{set(fn){anim.task=later(fn,opts.duration)}});return anim}};return e}
 const st=el(),bp=el(),blade=el(),pod=el(),bin=el(),bowl=el();st.isConnected=true;bp.querySelectorAll=()=>[el(),el(),el()];
 st.querySelector=q=>({'.bigpod':bp,'.opening-blade':blade,'.extraction-pod':pod,'.bin':bin,'.bowl':bowl}[q]);
 st.querySelectorAll=()=>st.children.filter(x=>x.className==='portion-flight'&&!x.removed);st.insertAdjacentHTML=(where,html)=>st.markup=html;
 const win={matchMedia:()=>({matches:reduced})};
 const setup=new Function('OPENING_SCENE','OPENING_PODS','OPENING_STAGES_URL','OPENING_BEAN','HARVEST_MACHETE','document','window','setTimeout','clearTimeout','return '+code)('scene','pods','stages','beans','machete',{createElement:el},win,later,cancel);
 cleanup=setup({firstElementChild:st},{count:(n,max)=>counts.push([n,max]),hint(){},done(){finished++;cleanup()}});
 assert.equal(win.__s3NB,40);assert.deepEqual(counts,[[0,3]]);
 if(scenario==='closeCut'){bp.onclick();cleanup();flush();assert(!st.markup);continue}
 for(let i=0;i<3;i++){bp.onclick();bp.onclick();flush();if(i<2)assert(!bp.removed)}
 assert(bp.removed);assert.deepEqual(counts.at(-1),[0,40]);assert.equal(pod.dataset.frame,'0');
 assert(st.markup.includes('<button class="op l extraction-pod'));assert(!st.markup.includes('clip-path'));
 if(scenario==='closeFlight'||scenario==='detached'){pod.onclick();if(scenario==='closeFlight')cleanup();else st.isConnected=false;flush();assert.equal(finished,0);assert.equal(bin.children.length,0);assert(st.children.every(x=>x.removed));continue}
 let collected=0;
 for(let i=0;i<11;i++){
  const amount=Number(pod['aria-label'].match(/^\d+/)[0]);assert(amount>=2&&amount<=5);
  pod.onclick();pod.onclick();assert.equal(st.children.at(-1).children.length,amount);assert.equal(bin.children.length,collected);assert.equal(pod.dataset.frame,String(i+1));
  flush();collected+=amount;assert.deepEqual(counts.at(-1),[collected,40]);assert.equal(bin.children.length,collected);
 }
 assert.equal(collected,40);assert.equal(finished,1);assert(pod.disabled);assert.equal(pod.dataset.frame,'11');pod.onclick();flush();assert.equal(finished,1);
}
console.log('OK: 12 photographic RGBA states; exactly 40 beans in portions of 2–5; no polygon masking; double-click protection, arrival counts and cleanup in both motion modes.');
