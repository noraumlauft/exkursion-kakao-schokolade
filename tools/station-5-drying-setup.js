setup(a,api){
  const SUN=`<svg viewBox="0 0 60 60" width="64" height="64"><g stroke="#f7c531" stroke-width="4" stroke-linecap="round">${[0,45,90,135,180,225,270,315].map(d=>`<line x1="30" y1="6" x2="30" y2="12" transform="rotate(${d} 30 30)"/>`).join('')}</g><circle cx="30" cy="30" r="13" fill="#f7c531"/></svg>`;
  const CLOUD=`<svg viewBox="0 0 70 60" width="74" height="64"><g fill="#e7ecef"><ellipse cx="25" cy="28" rx="16" ry="12"/><ellipse cx="42" cy="24" rx="18" ry="15"/><ellipse cx="35" cy="34" rx="26" ry="10"/></g><g stroke="#5a8ad0" stroke-width="3" stroke-linecap="round"><line x1="22" y1="46" x2="19" y2="55"/><line x1="35" y1="46" x2="32" y2="55"/><line x1="48" y1="46" x2="45" y2="55"/></g></svg>`;
  a.innerHTML=`<div class="stage s5 drying-photo" role="group" aria-label="Erhöhte Trocknungsanlage für Kakaobohnen in Ghana"><img class="drying-scene" src="${DRYING_OPEN}" alt="Braune Kakaobohnen auf einfachen Brettern mit schlanken Rundholzstützen; kleine verzweigte Kakaobäume und hohe Schattenbäume auf einem Hof in Ghana"><img class="roof open" src="${DRYING_COVER}" alt="Trocknungsanlage mit ausgebreiteter blauer Regenplane" aria-hidden="true"><div class="drying-weather-shade" aria-hidden="true"></div><div class="rain" aria-hidden="true"></div><div class="wicon" role="status" aria-live="polite"></div></div>
   <div class="row"><button class="btn" id="roofbtn" type="button" aria-pressed="false">🟦 Plane drauf</button></div><div class="bar drying-progress" role="progressbar" aria-label="Trocknungsfortschritt" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="bf"></div><span>Trocken: 0 %</span></div>`;
  const st=a.querySelector('.stage'),roof=a.querySelector('.roof'),btn=a.querySelector('#roofbtn'),bf=a.querySelector('.bf'),lbl=a.querySelector('.bar span'),bar=a.querySelector('.drying-progress'),wi=a.querySelector('.wicon'),rain=a.querySelector('.rain');
  st.style.setProperty('--drying-rain',`url("${DRYING_RAIN}")`);
  let open=true,weather='sun',dry=0,rains=0,disposed=false,finished=false,iv=null;
  const describe=()=>{
    st.dataset.weather=weather;st.dataset.covered=String(!open);st.dataset.dry=String(dry);
    st.setAttribute('aria-label',`Trocknungsanlage in Ghana. ${weather==='sun'?'Sonne':'Regen'}. ${open?'Bohnen liegen offen.':'Bohnen sind mit der Plane abgedeckt.'}`);
  };
  const setW=w=>{
    weather=w;wi.innerHTML=(w==='sun'?SUN:CLOUD)+`<span>${w==='sun'?'Sonne':'Regen'}</span>`;
    st.classList.toggle('stormy',w==='rain');rain.classList.toggle('on',w==='rain');describe();
  };
  btn.onclick=()=>{
    if(disposed||finished)return;
    open=!open;roof.classList.toggle('open',open);roof.setAttribute('aria-hidden',String(open));
    btn.textContent=open?'🟦 Plane drauf':'☀️ Plane runter';btn.setAttribute('aria-pressed',String(!open));describe();
  };
  setW('sun');
  const tick=()=>{
    if(disposed||finished||!st.isConnected||document.querySelector('#modal .card.amaLock'))return;
    if(weather==='sun'&&open){dry=Math.min(100,dry+17);api.hint('Die Sonne trocknet die Bohnen ☀️',true)}
    else if(weather==='sun'){api.hint('Die Sonne scheint – nimm die Plane runter!')}
    else if(!open){api.hint('Gut geschützt! 👍',true)}
    else{dry=Math.max(0,dry-10);api.hint('Oh nein, die Bohnen werden nass! Plane drauf!')}
    bf.style.width=dry+'%';lbl.textContent=`Trocken: ${dry} %`;bar.setAttribute('aria-valuenow',String(dry));describe();
    if(dry>=100){finished=true;clearInterval(iv);btn.disabled=true;api.hint('Die Bohnen sind trocken!',true);api.done();return}
    let next=Math.random()<.6?'sun':'rain';if(next==='rain')rains++;else rains=0;if(rains>2){next='sun';rains=0}setW(next);
  };
  iv=setInterval(tick,2000);api.count('💧','');
  return()=>{disposed=true;clearInterval(iv)};
 }
