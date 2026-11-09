setup(a,api){
  const portions=[3,4,2,5,3,4,2,5,4,3,5],total=portions.reduce((sum,n)=>sum+n,0);
  window.__s3NB=total;
  a.innerHTML=`<div class="stage opening-photo" role="group" aria-label="Kakaofrucht öffnen und in kleinen Portionen leeren"><img class="opening-background" src="${OPENING_SCENE}" alt="Holzklotz in einer Kakaoplantage"><button class="bigpod" aria-label="Kakaofrucht längs aufschneiden, dreimal tippen"><span class="opening-pod-sprite"></span><span class="ck"></span><span class="ck"></span><span class="ck"></span></button><div class="bowl" role="group" aria-label="Leere Schüssel für 40 Kakaobohnen"><div class="bin"></div></div><div class="opening-blade" aria-hidden="true"><img src="${HARVEST_MACHETE}" alt=""></div></div>`;
  const st=a.firstElementChild,bp=st.querySelector('.bigpod'),blade=st.querySelector('.opening-blade');
  let hits=0,striking=false,disposed=false,moving=false,collected=0,step=0;
  const animations=new Set(),pending=[];
  st.style.setProperty('--opening-pods',`url("${OPENING_PODS}")`);
  st.style.setProperty('--opening-stages',`url("${OPENING_STAGES_URL}")`);
  st.style.setProperty('--opening-bean',`url("${OPENING_BEAN}")`);
  const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const later=(fn,ms)=>{const id=setTimeout(()=>{if(!disposed&&st.isConnected)fn()},ms);pending.push(id);return id};
  const frame=(el,n)=>{el.dataset.frame=String(n);el.style.setProperty('--stage-x',(n%4)/3*100+'%');el.style.setProperty('--stage-y',Math.floor(n/4)/2*100+'%')};
  const bean=(i)=>{const el=document.createElement('span');el.className='portion-bean';el.style.setProperty('--bean-cell',(i%3)*50+'%');el.setAttribute('aria-hidden','true');return el};
  api.count(0,3);
  bp.onclick=()=>{
    if(disposed||striking||hits>=3)return;
    striking=true;bp.disabled=true;
    blade.classList.remove('strike');void blade.offsetWidth;blade.classList.add('strike');
    later(()=>{
      hits++;api.count(hits,3);
      bp.classList.remove('hit');void bp.offsetWidth;bp.classList.add('hit');
      const cracks=bp.querySelectorAll('.ck');if(cracks[hits-1])cracks[hits-1].classList.add('on');
      if(hits<3){api.hint('Der Längsschnitt wird tiefer. Noch einmal!',true);later(()=>{blade.classList.remove('strike');striking=false;bp.disabled=false},reduced?0:230);return}
      later(()=>{
        bp.remove();blade.classList.remove('strike');
        st.insertAdjacentHTML('beforeend',`<div class="op r emptying-half" role="img" aria-label="Leere zweite Hälfte der Kakaofruchtschale" style="--stage-x:100%;--stage-y:100%"><span class="emptying-photo" aria-hidden="true"></span></div><button class="op l extraction-pod emptying-half" type="button"><span class="emptying-photo" aria-hidden="true"></span></button>`);
        const pod=st.querySelector('.extraction-pod'),bin=st.querySelector('.bin'),bowl=st.querySelector('.bowl');
        frame(pod,0);api.count(0,total);
        const label=()=>pod.setAttribute('aria-label',`${portions[step]} Kakaobohnen mit Fruchtfleisch herausnehmen. Noch ${total-collected} Bohnen in der Frucht.`);
        label();api.hint('Nimm jeweils 2 bis 5 Bohnen mit ihrem weißen Fruchtfleisch heraus.',true);
        pod.onclick=()=>{
          if(disposed||moving||step>=portions.length)return;
          moving=true;pod.disabled=true;
          const amount=portions[step],sr=st.getBoundingClientRect(),pr=pod.getBoundingClientRect(),wr=bowl.getBoundingClientRect();
          const sx=pr.left-sr.left+pr.width*.52,sy=pr.top-sr.top+pr.height*(.30+step*.025);
          const tx=wr.left-sr.left+wr.width*.5,ty=wr.top-sr.top+wr.height*.46;
          const flight=document.createElement('div');flight.className='portion-flight';flight.setAttribute('aria-hidden','true');
          const size=pr.width*.24;
          Object.assign(flight.style,{left:sx+'px',top:sy+'px',width:size+'px',height:size+'px'});
          for(let i=0;i<amount;i++){
            const item=bean(collected+i);
            Object.assign(item.style,{left:(14+(i%2)*33)+'%',top:(6+Math.floor(i/2)*24)+'%',width:'53%',height:'53%',transform:`rotate(${-22+i*17}deg)`});
            flight.appendChild(item);
          }
          st.appendChild(flight);
          // A real generated photograph replaces the entire filled half at each step.
          frame(pod,step+1);
          const dx=tx-sx,dy=ty-sy;
          const anim=flight.animate([
            {transform:'translate(-50%,-50%) rotate(-18deg)'},
            {transform:`translate(calc(-50% + ${dx*.45}px),calc(-50% + ${dy*.45-30}px)) rotate(4deg)`,offset:.45},
            {transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) rotate(18deg) scale(.72)`}
          ],{duration:reduced?1:720,easing:'ease-in-out',fill:'forwards'});
          animations.add(anim);
          anim.onfinish=()=>{
            animations.delete(anim);flight.remove();
            if(disposed||!st.isConnected)return;
            for(let i=0;i<amount;i++){
              const index=collected+i,item=bean(index);
              item.classList.add('bowl-bean');
              Object.assign(item.style,{left:(10+(index%7)*10)+'%',top:(22+Math.floor(index/7)*7)+'%',width:'22%',height:'31%',transform:`rotate(${-55+(index%5)*24}deg)`});
              bin.appendChild(item);
            }
            collected+=amount;step++;moving=false;api.count(collected,total);
            bowl.setAttribute('aria-label',`Schüssel mit ${collected} von ${total} Kakaobohnen und ihrem Fruchtfleisch`);
            if(step===portions.length){
              pod.setAttribute('aria-label','Leere Kakaofruchtschale. Alle 40 Bohnen liegen in der Schüssel.');
              api.hint('Geschafft! Alle 40 Bohnen und ihr Fruchtfleisch liegen in der Schüssel.',true);api.done();
            }else{
              pod.disabled=false;label();api.hint(`${amount} Bohnen gesammelt. Die Frucht wird Stück für Stück leerer.`,true);
            }
          };
        };
      },reduced?0:240);
    },reduced?0:403);
  };
  return ()=>{disposed=true;pending.forEach(clearTimeout);animations.forEach(anim=>anim.cancel());st.querySelectorAll('.portion-flight').forEach(el=>el.remove())};
 }
