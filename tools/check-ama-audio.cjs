const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const root=path.join(__dirname,'..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'assets/audio/ama-manifest.json'),'utf8'));
const papaManifest=JSON.parse(fs.readFileSync(path.join(root,'assets/audio/papa-manifest.json'),'utf8'));
const papaClips=Object.fromEntries(papaManifest.clips.map(c=>[c.text,c.file]));
const clips=Object.fromEntries(manifest.clips.map(c=>[c.text,c.file]));
let audios=[];
class Audio {
 constructor(src){this.src=src;audios.push(this)}
 play(){return Promise.resolve()}
 pause(){this.paused=true}
 removeAttribute(){this.src=''}
 load(){}
}
const context={window:{},Audio,console};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'ama-audio.js'),'utf8').replace('__AMA_CLIPS__',JSON.stringify(clips)).replace('__PAPA_CLIPS__',JSON.stringify(papaClips)),context);
const api=context.window.AmaAudio;
function covered(t){assert(api.has(t),'Missing recording: '+t)}
const source=fs.readFileSync(path.join(root,'index.html'),'utf8');
const game=Buffer.from(source.match(/id="GAME">([^<]+)/)[1],'base64').toString();
const papaText=game.match(/var PAPA_TXT="([^"]+)"/)[1];
assert.equal(papaManifest.clips.map(c=>c.text).join(' '),papaText);
assert(api.has(papaText,'papa'));assert(!api.has(papaText,'ama'));
let papaEnded=0;api.play(papaText,()=>papaEnded++,'papa');
for(const c of papaManifest.clips){assert.equal(audios[0].src,papaClips[c.text]);audios[0].onended()}
assert.equal(papaEnded,1);
const story=vm.runInNewContext(source.match(/const STORY_ALL=(\[[\s\S]*?\]);/)[1]);
story.forEach(s=>covered(s.t));
const words=vm.runInNewContext('('+source.match(/const WORDS=(\{[\s\S]*?\});/)[1]+')');
Object.values(words).forEach(w=>{covered(w.w);if(w.mehr)covered(w.w+'. '+w.mehr)});
const tasks=vm.runInNewContext(game.match(/var TXT=(\[[\s\S]*?\]);/)[1]);
tasks.forEach(s=>covered(s.i+' '+s.t));
for(let n=30;n<=50;n++)covered(`Tippe auf die Frucht, bis sie aufgeht. In dieser Frucht sind ${n} Bohnen – sammle alle ${n} in die Schüssel!`);
for(const m of game.matchAll(/fact:'([^']+)'/g))covered('Wusstest du? '+m[1]);
for(const v of ['T','HT','AMA_TXT'])for(const m of game.matchAll(new RegExp('var '+v+'="([^"]+)"','g')))covered(m[1]);
for(const m of game.matchAll(/Voice.say\("([^"]+)"/g))covered(m[1]);
for(const m of game.matchAll(/say:"([^"]+)"/g))covered(m[1]);
const quiz=vm.runInNewContext(game.match(/const QUIZ=(\[[\s\S]*?\]);/)[1]);
quiz.forEach(([q,opts])=>[q,...opts].forEach(covered));
const names=['Kakaobaum','Ernte','Öffnen','Gären','Trocknen','Abpacken'];
const carried=['die Machete','den Korb mit reifen Früchten','die Schüssel mit Bohnen','den Korb mit fermentierten Bohnen','den Korb mit getrockneten Bohnen'];
names.forEach((name,i)=>['',' – heb unterwegs die Machete auf',...carried.flatMap(c=>[' – nimm '+c+' mit',' – du brauchst '+c])].forEach(need=>covered(`👉 Lauf zu Station ${i+1}: ${name}${need}`)));
let ended=0;
const stop=api.play(story[0].t,()=>ended++);
assert.equal(ended,0);assert(api.speaking);
let guard=100;while(api.speaking){assert(guard-->0);audios[0].onended()}
assert.equal(ended,1);assert(!api.speaking);
const cancel=api.play(story[1].t,()=>ended++);const stale=audios[0].onended;
cancel();stale();assert.equal(audios.length,1);assert(audios[0].paused);assert.equal(ended,1);assert(!api.speaking);
for(const c of [...manifest.clips,...papaManifest.clips])assert(fs.statSync(path.join(root,'assets/audio',c.file)).size>1000);
assert(source.includes('id="amaAudioRuntime"'));assert(game.includes('id="amaAudioRuntime"'));
for(const [label,doc] of [['panorama',source],['game',game]]){
 const data=JSON.parse(doc.match(/const clips=(\{[^\n]+\});/)[1]);
 const papaData=JSON.parse(doc.match(/const papaClips=(\{[^\n]+\});/)[1]);
 const audioUrl=file=>`assets/audio/${file}?v=${require('crypto').createHash('sha256').update(fs.readFileSync(path.join(root,'assets/audio',file))).digest('hex').slice(0,8)}`;
 for(const c of papaManifest.clips)assert.equal(papaData[c.text],audioUrl(c.file));
 for(const c of manifest.clips)assert.equal(data[c.text],audioUrl(c.file),label+': audio path differs from assets');
 assert(!doc.includes('data:audio/'),label+': audio must not be embedded');

 for(const m of doc.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g))if(!/type="text\/plain"/.test(m[1]))new vm.Script(m[2],{filename:label});
}
// Exercise the actual embedded controller, with no additional bottom transcript.
const controller=game.slice(game.indexOf('(function(){',game.indexOf('/* ===== Stimmen:')),game.indexOf('/* ===== Ama erklärt die Aufgaben'));
let finish2D=null;const timers=[],spoken=[];
const doc={querySelectorAll:()=>[],getElementById(){throw Error('Unexpected extra narration element')},createElement(){throw Error('Unexpected extra narration element')}};
const gameContext={document:doc,console,setTimeout:fn=>{timers.push(fn);return timers.length},clearTimeout(){},AmaAudio:{play(t,done,who){assert(api.has(t,who));spoken.push({text:t,who});finish2D=done;return ()=>{finish2D=null}}}};
gameContext.window=gameContext;
vm.runInNewContext(controller,gameContext);
gameContext.Voice.say('Toll, dass du uns hilfst.');assert(finish2D,'2D narration must use the recordings');
finish2D();while(timers.length)timers.shift()();gameContext.Voice.stop();
spoken.length=0;
gameContext.Voice.say(papaText,{who:'papa'});gameContext.Voice.say('Toll, dass du uns hilfst.',{who:'ama'});
for(let i=0;i<papaManifest.clips.length+1;i++){assert(finish2D);const finish=finish2D;finish2D=null;finish();while(timers.length)timers.shift()()}
assert.deepEqual(spoken.map(x=>x.who),['papa','papa','papa','papa','ama']);
assert.deepEqual(spoken.slice(0,4).map(x=>x.text),papaManifest.clips.map(c=>c.text));assert(!gameContext.Voice.busy());
assert(!game.includes('amaCaption'),'2D must not contain an additional bottom transcript');
console.log(`OK: ${manifest.clips.length} Ama + ${papaManifest.clips.length} Papa MP3s; speaker routing and queued voice changes; exact text coverage, all bean counts and navigation variants; sequence/end/cancel; embedded game and panorama script syntax.`);
