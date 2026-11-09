/* Recorded speech. The packer inserts offline MP3 data. */
(function(){
  const clips=__AMA_CLIPS__;
  const papaClips=__PAPA_CLIPS__;
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
        const part=parts[index++],src=bank[part];
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
