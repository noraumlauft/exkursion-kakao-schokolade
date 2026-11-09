setup(a,api){
  a.innerHTML=`<div class="stage ferment-photo" role="group" aria-label="Fermentierung von Kakaobohnen auf Bananenblättern">
   <img class="ferment-scene ferment-fresh" src="${FERMENTATION_OPEN}" alt="Frische Kakaobohnen mit weißem Fruchtfleisch auf Bananenblättern im ghanaischen Plantagenwald">
   <img class="ferment-scene ferment-brown" src="${FERMENTATION_BROWN}" alt="Fermentierte braune Kakaobohnen auf Bananenblättern">
   <img class="ferment-cover" src="${FERMENTATION_COVER}" alt="">
   <img class="ferment-paddle" src="${FERMENTATION_PADDLE}" alt="">
   <div class="daylbl">Tag 1 von 6</div><div class="tlbl">25 °C</div><div class="thermo"><div class="tf"></div></div>
  </div>
  <div class="row"><button class="btn" id="fermentbtn">🍃 Mit Bananenblättern zudecken</button></div>`;
  let day=1,covered=false,needTurn=false,busy=false,finished=false,disposed=false;
  const timers=[];
  const stage=a.querySelector('.ferment-photo'),btn=a.querySelector('#fermentbtn');
  const reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const render=()=>{
   stage.classList.toggle('is-covered',covered);
   stage.classList.toggle('needs-turn',needTurn);
   const progress=(day-1)/5;
   a.querySelector('.daylbl').textContent=`Tag ${day} von 6`;
   const temp=25+(day-1)*5;
   a.querySelector('.tlbl').textContent=temp+' °C';
   a.querySelector('.tf').style.height=(20+progress*75)+'%';
   a.querySelector('.ferment-brown').style.opacity=progress;
   if(finished){btn.textContent='✅ Fermentierung abgeschlossen';btn.disabled=true;btn.classList.add('green')}
   else if(needTurn){btn.textContent='🔄 Bohnen durchrühren';btn.disabled=busy;btn.classList.add('green')}
   else if(!covered){btn.textContent='🍃 Mit Bananenblättern zudecken';btn.disabled=busy;btn.classList.remove('green')}
   else{btn.textContent='☀️ Einen Tag vergehen lassen';btn.disabled=busy;btn.classList.remove('green')}
   api.count(day,6);
  };
  const hint=(text,good=false)=>api.hint(text,good);
  btn.onclick=()=>{
   if(disposed||busy||finished)return;
   if(needTurn){
    busy=true;stage.classList.add('is-turning');render();
    const wait=reduce?20:900;
    timers.push(setTimeout(()=>{
     if(disposed||!stage.isConnected)return;
     stage.classList.remove('is-turning','needs-turn');needTurn=false;covered=true;busy=false;
     hint('Gut durchgerührt – die Bohnen sind wieder unter Bananenblättern zugedeckt.',true);render();
    },wait));
    hint('Die Bohnen werden mit dem Holzpaddel vorsichtig durchgerührt.');
    return;
   }
   if(!covered){covered=true;hint('Die Bananenblätter halten Wärme und Feuchtigkeit im Bohnenhaufen.',true);render();return}
   if(day>=6)return;
   day++;
   if(day===2||day===4){covered=false;needTurn=true;hint(`Tag ${day}: Zeit, die Bohnen aufzudecken und durchzurühren!`);render();return}
   if(day===6){finished=true;hint('Nach sechs Tagen sind die Bohnen fermentiert und braun.',true);render();api.done();return}
   hint(`Tag ${day}: Unter den Blättern gären die Bohnen weiter.`,true);render();
  };
  render();
  return ()=>{disposed=true;timers.forEach(clearTimeout);btn.onclick=null};
}
