setup(a,api){
  a.innerHTML=`<div class="stage packing-photo" role="group" aria-label="Getrocknete Kakaobohnen auf dem Hof in einen Jutesack abfüllen"><img class="packing-background" src="${PACKING_SCENE}" alt="Packplatz auf einer Kakaoplantage in Ghana: trockene braune Bohnen in einer Holzwanne, daneben eine kleine Holzpalette"><div class="packing-sack" role="img" aria-label="Leerer, offener Jutesack"><span class="packing-sack-photo" aria-hidden="true"></span><span class="packing-stamp" aria-hidden="true">KAKAO<br>60 kg</span></div><div class="packing-scoop" aria-hidden="true"><span class="packing-scoop-photo"></span></div><div class="packing-grains" aria-hidden="true"></div></div><div class="row"><button class="btn" id="shovel" type="button">🪣 Schaufeln</button></div>`;
  const st=a.querySelector('.stage'),sack=a.querySelector('.packing-sack'),scoop=a.querySelector('.packing-scoop'),grains=a.querySelector('.packing-grains'),btn=a.querySelector('#shovel');
  st.style.setProperty('--packing-sacks',`url("${PACKING_SACKS_URL}")`);
  st.style.setProperty('--packing-tool',`url("${PACKING_TOOL}")`);
  const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animations=new Set(),pending=[];
  let fill=0,busy=false,finished=false,disposed=false;
  const later=(fn,ms)=>{const id=setTimeout(()=>{if(!disposed&&st.isConnected)fn()},ms);pending.push(id);return id};
  const frame=n=>{sack.dataset.frame=String(n);sack.style.setProperty('--sack-x',(n%4)/3*100+'%');sack.style.setProperty('--sack-y',Math.floor(n/4)*100+'%')};
  frame(0);st.dataset.scoops='0';api.count(0,5);
  btn.onclick=()=>{
    if(disposed||busy||finished||fill>=5)return;
    busy=true;btn.disabled=true;
    const next=fill+1,sr=st.getBoundingClientRect(),br=sack.getBoundingClientRect(),tr=scoop.getBoundingClientRect();
    const sx=tr.left-sr.left+tr.width/2,sy=tr.top-sr.top+tr.height/2;
    const mouthX=br.left-sr.left+br.width*.5,mouthY=br.top-sr.top+br.height*(.22-fill*.01);
    const targetX=mouthX-tr.width*.33,targetY=mouthY-tr.width*.38;
    const dx=targetX-sx,dy=targetY-sy;
    scoop.style.setProperty('--scoop-cell','0%');
    const motion=scoop.animate([
      {transform:'translate(-50%,-50%) rotate(0deg)'},
      {transform:`translate(calc(-50% + ${dx*.48}px),calc(-50% + ${dy*.48-28}px)) rotate(-12deg)`,offset:.24},
      {transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) rotate(48deg)`,offset:.42},
      {transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) rotate(48deg)`,offset:.64},
      {transform:`translate(calc(-50% + ${dx*.45}px),calc(-50% + ${dy*.45-16}px)) rotate(-6deg)`,offset:.82},
      {transform:'translate(-50%,-50%) rotate(0deg)'}
    ],{duration:reduced?1:1250,easing:'ease-in-out'});
    animations.add(motion);
    later(()=>{
      scoop.style.setProperty('--scoop-cell','50%');
      grains.style.left=mouthX+'px';grains.style.top=(mouthY-tr.width*.15)+'px';
      const falling=grains.animate([{opacity:0,transform:'translate(-50%,-12%)'},{opacity:1,transform:'translate(-50%,0)',offset:.22},{opacity:0,transform:'translate(-50%,32%)'}],{duration:reduced?1:360,easing:'ease-in',fill:'none'});
      animations.add(falling);falling.onfinish=()=>animations.delete(falling);
    },reduced?0:520);
    later(()=>{frame(next);sack.setAttribute('aria-label',`Jutesack zu ${next*20} Prozent mit trockenen Kakaobohnen gefüllt`)},reduced?0:820);
    motion.onfinish=()=>{
      animations.delete(motion);if(disposed||!st.isConnected)return;
      fill=next;st.dataset.scoops=String(fill);api.count(fill,5);scoop.style.setProperty('--scoop-cell','0%');
      if(fill===5){
        later(()=>{frame(6);sack.classList.add('tied');sack.setAttribute('aria-label','Voller, zugebundener Jutesack mit ungefähr 60 Kilogramm Kakaobohnen');finished=true;api.hint('Der Sack ist voll und zugebunden!',true);api.done()},reduced?0:450);
      }else{busy=false;btn.disabled=false;api.hint('Weiter so!',true)}
    };
  };
  return()=>{disposed=true;pending.forEach(clearTimeout);animations.forEach(animation=>animation.cancel())};
 }
