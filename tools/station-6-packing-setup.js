setup(a,api){
  a.innerHTML=`<div class="stage packing-photo" role="group" aria-label="Kakaobohnen mit einer Schaufel in einen Jutesack füllen">
   <img class="packing-background" src="${PACKING_SCENE}" alt="Trockene Kakaobohnen in einer Holzwanne auf einer Kakaoplantage in Ghana; daneben steht ein Jutesack auf einer Palette">
   <div class="packing-sack" role="img" aria-label="Leerer, offener Jutesack"><span class="packing-sack-photo" aria-hidden="true"></span><span class="packing-stamp" aria-hidden="true">KAKAO<br>60 kg</span></div>
   <button class="packing-scoop" type="button" id="packing-scoop" aria-label="Gefüllte Schaufel. Zieh sie zum offenen Sack."><span class="packing-scoop-photo" aria-hidden="true"></span></button>
   <div class="packing-grains" aria-hidden="true"></div>
  </div><div class="row packing-help" id="packing-help" role="status" aria-live="polite">Zieh die gefüllte Schaufel zum offenen Sack.</div>`;
  const st=a.querySelector('.stage'),sack=a.querySelector('.packing-sack'),scoop=a.querySelector('#packing-scoop'),grains=a.querySelector('.packing-grains'),help=a.querySelector('#packing-help');
  st.style.setProperty('--packing-sacks',`url("${PACKING_SACKS_URL}")`);
  st.style.setProperty('--packing-tool',`url("${PACKING_TOOL}")`);
  const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animations=new Set(),pending=[];
  let fill=0,busy=false,disposed=false,phase='loaded',drag=null,center=null;
  const later=(fn,ms)=>{const id=setTimeout(()=>{if(!disposed&&st.isConnected)fn()},ms);pending.push(id);return id};
  const frame=n=>{sack.dataset.frame=String(n);sack.style.setProperty('--sack-x',(n%4)/3*100+'%');sack.style.setProperty('--sack-y',Math.floor(n/4)*100+'%')};
  const setCenter=(x,y)=>{const r=st.getBoundingClientRect();center={x,y};scoop.style.left=(x/r.width*100)+'%';scoop.style.top=(y/r.height*100)+'%'};
  const stageSize=()=>{const r=st.getBoundingClientRect();return{width:r.width,height:r.height}};
  const home=()=>{const r=stageSize();return{x:r.width*.24,y:r.height*.58}};
  const mouth=()=>{const sr=st.getBoundingClientRect(),br=sack.getBoundingClientRect();return{x:br.left-sr.left+br.width*.5,y:br.top-sr.top+br.height*.22,width:br.width,height:br.height}};
  const inMouth=(x,y)=>{const m=mouth();return Math.abs(x-m.x)<m.width*.24&&y>m.y-m.height*.18&&y<m.y+m.height*.18};
  const inTray=(x,y)=>{const s=stageSize();return x<s.width*.48&&y>s.height*.43&&y<s.height*.82};
  const setPhase=(next)=>{
   phase=next;scoop.dataset.phase=next;
   if(next==='loaded'){scoop.style.setProperty('--scoop-cell','0%');scoop.setAttribute('aria-label','Gefüllte Schaufel. Zieh sie zum offenen Sack.');help.textContent=fill?'Die Schaufel ist wieder voll. Zieh sie zum Sack.':'Zieh die gefüllte Schaufel zum offenen Sack.'}
   else if(next==='empty'){scoop.style.setProperty('--scoop-cell','50%');scoop.setAttribute('aria-label','Leere Schaufel. Zieh sie zurück zur Bohnenwanne zum Nachfüllen.');help.textContent='Zieh die leere Schaufel zurück zur Bohnenwanne. Dort füllt sie sich wieder.'}
   else{scoop.setAttribute('aria-label','Der Sack ist voll.');help.textContent='Der Sack ist voll und zugebunden.'}
  };
  const keyboardAction=()=>{
   if(busy||disposed||phase==='done')return;
   if(phase==='loaded'){const m=mouth();setCenter(m.x,m.y);pour()}
   else{setCenter(home().x,home().y);refill()}
  };
  const refill=()=>{
   if(busy||phase!=='empty')return;
   busy=true;setCenter(home().x,home().y);scoop.classList.add('is-refilling');
   later(()=>{scoop.classList.remove('is-refilling');busy=false;setPhase('loaded');api.hint('Die Schaufel ist wieder voll. Zieh sie zum Sack.',true)},reduced?10:420);
  };
  const pour=()=>{
   if(busy||phase!=='loaded'||fill>=5)return;
   busy=true;scoop.classList.add('is-pouring');scoop.setAttribute('aria-disabled','true');
   const m=mouth(),next=fill+1;
   grains.style.left=m.x+'px';grains.style.top=(m.y-m.height*.13)+'px';
   const motion=scoop.animate([{transform:'translate(-50%,-50%) rotate(0deg)'},{transform:'translate(-50%,-50%) rotate(52deg)',offset:.34},{transform:'translate(-50%,-50%) rotate(52deg)',offset:.65},{transform:'translate(-50%,-50%) rotate(0deg)'}],{duration:reduced?1:720,easing:'ease-in-out'});animations.add(motion);
   later(()=>{
    scoop.style.setProperty('--scoop-cell','50%');
    frame(next);sack.setAttribute('aria-label',`Jutesack zu ${next*20} Prozent mit trockenen Kakaobohnen gefüllt`);
    const falling=grains.animate([{opacity:0,transform:'translate(-50%,-10%) scale(.8)'},{opacity:1,transform:'translate(-50%,0) scale(1)',offset:.2},{opacity:0,transform:'translate(-50%,34%) scale(.88)'}],{duration:reduced?1:420,easing:'ease-in',fill:'none'});animations.add(falling);falling.onfinish=()=>animations.delete(falling);
   },reduced?0:245);
   motion.onfinish=()=>{
    animations.delete(motion);if(disposed||!st.isConnected)return;
    scoop.classList.remove('is-pouring');scoop.removeAttribute('aria-disabled');fill=next;st.dataset.scoops=String(fill);api.count(fill,5);
    if(fill===5){setPhase('done');later(()=>{setCenter(home().x,home().y);later(()=>{frame(6);sack.classList.add('tied');finished();},reduced?10:420)},reduced?0:150)}
    else{busy=false;setPhase('empty');api.hint('Die Bohnen sind im Sack. Zieh die leere Schaufel zurück zur Bohnenwanne.',true)}
   };
  };
  const finished=()=>{busy=false;api.hint('Der Sack ist voll und zugebunden!',true);api.done()};
  const currentCenter=()=>{const r=scoop.getBoundingClientRect(),sr=st.getBoundingClientRect();return{x:r.left-sr.left+r.width*.5,y:r.top-sr.top+r.height*.5}};
  const startDrag=e=>{
   if(disposed||busy||phase==='done'||e.button>0)return;e.preventDefault();
   const c=currentCenter();drag={id:e.pointerId,downX:e.clientX,downY:e.clientY,x:c.x,y:c.y,moved:false};
   scoop.classList.add('is-dragging');scoop.setPointerCapture(e.pointerId);
  };
  const moveDrag=e=>{
   if(!drag||e.pointerId!==drag.id)return;e.preventDefault();
   const dx=e.clientX-drag.downX,dy=e.clientY-drag.downY;if(Math.hypot(dx,dy)>4)drag.moved=true;
   const r=stageSize();setCenter(Math.max(0,Math.min(r.width,drag.x+dx)),Math.max(0,Math.min(r.height,drag.y+dy)));
  };
  const endDrag=e=>{
   if(!drag||e.pointerId!==drag.id)return;e.preventDefault();
   const moved=drag.moved,c=currentCenter();drag=null;scoop.classList.remove('is-dragging');
   if(phase==='loaded'&&inMouth(c.x,c.y)){setCenter(mouth().x,mouth().y);pour()}
   else if(phase==='empty'&&inTray(c.x,c.y))refill();
   else{const target=phase==='loaded'?home():mouth();setCenter(target.x,target.y);if(moved)api.hint(phase==='loaded'?'Zieh die Schaufel bis über die offene Sacköffnung.':'Zieh die leere Schaufel zurück zur Bohnenwanne.',false)}
  };
  frame(0);st.dataset.scoops='0';api.count(0,5);setPhase('loaded');
  const h=home();setCenter(h.x,h.y);
  const onKeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();keyboardAction()}};
  scoop.addEventListener('pointerdown',startDrag);scoop.addEventListener('pointermove',moveDrag);scoop.addEventListener('pointerup',endDrag);scoop.addEventListener('pointercancel',endDrag);scoop.addEventListener('keydown',onKeydown);
  return()=>{disposed=true;pending.forEach(clearTimeout);animations.forEach(animation=>animation.cancel());scoop.removeEventListener('pointerdown',startDrag);scoop.removeEventListener('pointermove',moveDrag);scoop.removeEventListener('pointerup',endDrag);scoop.removeEventListener('pointercancel',endDrag);scoop.removeEventListener('keydown',onKeydown)};
 }
