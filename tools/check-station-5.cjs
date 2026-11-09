const fs=require('fs'),assert=require('assert'),path=require('path');
const page=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const game=Buffer.from(page.match(/id="GAME">([^<]+)/)[1],'base64').toString();
const station=game.indexOf("name:'Trocknen'");const start=game.indexOf(' setup(a,api){',station)+1,end=game.indexOf('\n }},',start);
assert(start>0&&end>start);const source=game.slice(start,end+3);assert.equal(source.trim(),fs.readFileSync(path.join(__dirname,'station-5-drying-setup.js'),'utf8').trim());
const setupCode=source.replace(/^setup\(a,api\)/,'function(a,api)');
for(const [name,file]of [['DRYING_OPEN','station-5-trocknungsanlage-offen-v2.png'],['DRYING_COVER','station-5-trocknungsanlage-abgedeckt-v2.png'],['DRYING_RAIN','station-5-regentropfen.png']]){
 const png=fs.readFileSync(path.join(__dirname,'../assets',file));assert.equal(png.readUInt32BE(16)/png.readUInt32BE(20),1.5);assert(new RegExp('const '+name+'="data:image/webp;base64,[A-Za-z0-9+/=]+";').test(game));
}
function create(){
 const elements={};for(const key of ['.stage','.roof','#roofbtn','.bf','.bar span','.drying-progress','.wicon','.rain']){
  const e={isConnected:true,dataset:{},style:{setProperty(k,v){this[k]=v}},attributes:{},classes:new Set(),setAttribute(k,v){this.attributes[k]=v}};
  e.classList={toggle(k,v){if(v)e.classes.add(k);else e.classes.delete(k)}};elements[key]=e;
 }
 const stage=elements['.stage'];const area={querySelector:k=>elements[k]};let tick,active=true,locked=false,finished=0,calls=0;const random=[];
 const math=Object.create(Math);math.random=()=>{calls++;return random.length?random.shift():0};
 const setup=new Function('DRYING_OPEN','DRYING_COVER','DRYING_RAIN','document','Math','setInterval','clearInterval','return '+setupCode)('open-photo','covered-photo','rain-photo',{querySelector:()=>locked?{}:null},math,fn=>{tick=fn;return 1},()=>{active=false});
 const cleanup=setup(area,{hint(){},count(){},done(){finished++}});
 return {elements,area,stage,random,cleanup,click:()=>elements['#roofbtn'].onclick(),tick:()=>tick(),setLock:v=>{locked=v},get dry(){return Number(stage.dataset.dry)},get weather(){return stage.dataset.weather},get active(){return active},get finished(){return finished},get randomCalls(){return calls}};
}
{
 const t=create();assert(t.area.innerHTML.includes('open-photo'));assert(t.area.innerHTML.includes('covered-photo'));assert(!t.area.innerHTML.includes('class="table"'));
 for(let i=0;i<6;i++)t.tick();assert.equal(t.dry,100);assert.equal(t.finished,1);assert(!t.active);assert(t.elements['#roofbtn'].disabled);
 t.tick();t.click();assert.equal(t.finished,1);assert.equal(t.stage.dataset.covered,'false');assert.equal(t.elements['.drying-progress'].attributes['aria-valuenow'],'100');
}
{
 const t=create();t.click();assert.equal(t.stage.dataset.covered,'true');assert.equal(t.elements['#roofbtn'].attributes['aria-pressed'],'true');assert.equal(t.elements['.roof'].attributes['aria-hidden'],'false');t.tick();assert.equal(t.dry,0);
 t.click();t.random.push(.9);t.tick();assert.equal(t.dry,17);assert.equal(t.weather,'rain');
 t.random.push(.9);t.tick();assert.equal(t.dry,7);assert.equal(t.weather,'rain');
 t.click();t.random.push(.9);t.tick();assert.equal(t.dry,7);assert.equal(t.weather,'sun'); // At most two consecutive rain intervals.
 t.tick();assert.equal(t.dry,7);t.click();t.tick();assert.equal(t.dry,24);
}
{
 const t=create();t.random.push(.9,.9,.9);t.tick();t.tick();t.tick();assert.equal(t.dry,0); // Rain cannot reduce progress below zero.
 t.setLock(true);const weather=t.weather,calls=t.randomCalls;t.tick();assert.equal(t.dry,0);assert.equal(t.weather,weather);assert.equal(t.randomCalls,calls);
 t.setLock(false);t.cleanup();assert(!t.active);t.tick();t.click();assert.equal(t.dry,0);assert.equal(t.finished,0);
}
{
 const t=create();t.stage.isConnected=false;t.tick();assert.equal(t.dry,0);assert.equal(t.finished,0);
}
assert(game.includes('background-image:var(--drying-rain)'));
assert(!game.includes('transparent 0 29px,#e5f1ff80'));
console.log('OK: Station 5: embedded photo states; sun/rain and cover rules; 0–100% progress; Ama pause; max two rain intervals; completion once and cleanup.');
