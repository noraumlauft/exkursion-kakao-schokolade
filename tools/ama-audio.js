/* Recorded speech. The packer inserts the MP3 paths below assets/audio. */
(function(){
  const clips=__AMA_CLIPS__;
  const papaClips=__PAPA_CLIPS__;
  /* Alle MP3s sofort beim Laden holen und im Speicher bereithalten, damit später keine Verzögerung entsteht.
     Das Ergebnis liegt auf window, weil 360°-Ansicht und Spiel im selben Fenster laufen (document.write).
     Der Cache-Speicher des Browsers erspart den Download beim nächsten Besuch. */
  const loaded=window.__amaAudioLoaded||(window.__amaAudioLoaded={});
  function toDataUrl(blob){return new Promise((ok,fail)=>{const r=new FileReader();r.onload=()=>ok(r.result);r.onerror=()=>fail(r.error);r.readAsDataURL(blob.slice(0,blob.size,'audio/mpeg'))})}
  async function fetchClip(url,store){
    let res=store?await store.match(url):null;
    if(!res){
      res=await fetch(url);
      if(!res.ok)throw new Error(res.status+' '+url);
      if(store)try{await store.put(url,res.clone())}catch(e){}
    }
    loaded[url]=await toDataUrl(await res.blob());
  }
  async function preload(urls){
    if(typeof fetch!=='function'||typeof FileReader!=='function'||location.protocol==='file:')return;
    let store=null;
    try{
      store=await caches.open('ama-audio-v1');
      const wanted=new Set(urls.map(u=>new URL(u,location.href).href));
      for(const req of await store.keys())if(!wanted.has(req.url))store.delete(req);
    }catch(e){store=null}
    const queue=urls.filter(u=>!loaded[u]);
    const worker=async()=>{while(queue.length){const url=queue.shift();if(!loaded[url])try{await fetchClip(url,store)}catch(e){/* Beim Abspielen wird die Datei dann direkt geladen. */}}};
    await Promise.all(Array.from({length:8},worker));
  }
  preload([...new Set([...Object.values(clips),...Object.values(papaClips)])]);
  function clean(text){return String(text).replace(/<[^>]+>/g,'').replace(/[👉🎒🔪🚢💡🛻⚓]/gu,'').replace(/\s+/g,' ').trim()}
  function split(text){return (clean(text).match(/[^.!?]+[.!?]*/g)||[]).map(s=>s.trim()).filter(Boolean)}
  const player=window.__amaAudioPlayer||(window.__amaAudioPlayer=new Audio());
  window.AmaAudio={
    split:split,
    has:(text,who='ama')=>split(text).every(s=>(who==='papa'?papaClips:clips)[s]),
    speaking:false,
    play:function(text,done,who='ama'){
      const bank=who==='papa'?papaClips:clips;
      let stopped=false, current=null, finish=false;
      const parts=split(text);let index=0;
      const end=()=>{if(stopped||finish)return;finish=true;this.speaking=false;if(done)done()};
      const next=()=>{
        if(stopped)return;
        if(index===parts.length){end();return}
        const part=parts[index++],src=loaded[bank[part]]||bank[part];
        if(!src){console.error('Fehlende Aufnahme:',who,part);end();return}
        current=player;current.src=src;current.preload='auto';
        let ended=false;
        const advance=()=>{if(ended||stopped)return;ended=true;next()};
        current.onended=advance;
        current.onerror=()=>{console.error('Audio konnte nicht abgespielt werden:',who,part);end()};
        this.speaking=true;
        const playing=current.play();
        if(playing&&playing.catch)playing.catch(()=>{end()});
      };
      next();
      return ()=>{stopped=true;this.speaking=false;if(current){current.onended=null;current.onerror=null;current.pause();current.removeAttribute('src');current.load()}};
    }
  };
})();
