"""Restore the 2D recorded voice while keeping narration inside existing speech bubbles."""
from pathlib import Path
import re,base64
p=Path(__file__).resolve().parents[1]/'index.html';s=p.read_text();m=re.search('(id="GAME">)([^<]+)',s);g=base64.b64decode(m[2]).decode()
if 'id="amaAudioRuntime"' not in g and '<!-- AMA_AUDIO_RUNTIME -->' not in g:
 idx=g.index('/* ===== Stimmen:');idx=g.rfind('<script',0,idx);g=g[:idx]+'<!-- AMA_AUDIO_RUNTIME -->\n'+g[idx:]
g=g.replace(' var Q=[], cur=null, timer=null, waitPrev=0;',' var Q=[], cur=null, timer=null, waitPrev=0, stopRecording=null;')
if 'stopRecording=AmaAudio.play(it.t' not in g:
 g=g.replace('  if(!can){timer=setTimeout(fin,900+it.t.length*55);return}', '  if(it.who!=="papa"&&window.AmaAudio){stopRecording=AmaAudio.play(it.t,function(){stopRecording=null;fin()});return}\n  if(!can){timer=setTimeout(fin,900+it.t.length*55);return}')
g=g.replace('stop:function(){Q=[];', 'stop:function(){if(stopRecording){stopRecording();stopRecording=null}Q=[];')
g=g.replace('Q.push({t:s,who:', 'Q.push({t:s.trim(),who:')
g=g.replace('S.intro+" Deine Aufgabe: "+task','S.intro+" "+task')
g=g.replace('(done>0&&done<6?"Super! ":"")+txt','txt')
g=g.replace('(nm?"Schön, dich kennenzulernen, "+nm+"! ":"")+"Komm mit! "','"Schön, dich kennenzulernen! Komm mit! "')
g=g.replace('"Willkommen zurück"+(playerName?", "+playerName:"")+"! "','"Willkommen zurück! "')
g=g.replace("speak(frage+' '+opts.join('? Oder: ')+'?')", "[frage].concat(opts).forEach(function(t,i){if(i===0)Voice.soft();Voice.say(t,{group:'read'})})")
g=g.replace("$('#spk').onclick=()=>speak(S.intro+' '+S.task);", "$('#spk').onclick=()=>{const task=document.querySelector('#modal .taskline span');speak(S.intro+' '+(task?task.textContent:S.task))};")
g=g.replace('talk=window.speechSynthesis&&speechSynthesis.speaking;', 'talk=(window.AmaAudio&&AmaAudio.speaking)||(window.speechSynthesis&&speechSynthesis.speaking);')
# Both characters use their own stored recordings, in the same sentence queue.
g=g.replace('if(it.who!=="papa"&&window.AmaAudio)', 'if(window.AmaAudio)')
g=g.replace('if(it.who!=="papa"){\n   if(window.AmaAudio)', 'if(window.AmaAudio){\n   if(window.AmaAudio)')
g=g.replace('AmaAudio.play(it.t,function(){stopRecording=null;fin()});', 'AmaAudio.play(it.t,function(){stopRecording=null;fin()},it.who);')
# Remove the additional bottom transcript, including older saved integrations.
g=re.sub(r'<style(?: id="amaCaptionStyle")?>#amaCaption\{[\s\S]*?</style>','',g)
g=re.sub(r'   var caption=document.getElementById\("amaCaption"\);\n   if\(!caption\)\{[^\n]+\}\n   caption.textContent=[^\n]+\n','',g)
g=g.replace('var caption=document.getElementById("amaCaption");if(caption)caption.hidden=true;','')
s=s[:m.start(2)]+base64.b64encode(g.encode()).decode()+s[m.end(2):];p.write_text(s)
