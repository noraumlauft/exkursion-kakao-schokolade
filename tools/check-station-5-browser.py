"""Chromium integration check for Station 5 (requires chromedriver on PATH)."""
from pathlib import Path
import base64,json,re,subprocess,time,urllib.request
page=(Path(__file__).resolve().parent.parent/'index.html').read_text()
game=base64.b64decode(re.search(r'id="GAME">([^<]+)',page)[1]).decode()
a=game.index(' setup(a,api){',game.index("name:'Trocknen'"))+1;b=game.index('\n }},',a)
setup=game[a:b+3].replace('setup(a,api)','function(a,api)',1)
constants='\n'.join(re.findall(r'const DRYING_(?:OPEN|COVER|RAIN)="[^"]*";',game))
styles='\n'.join(re.findall(r'<style[^>]*>([\s\S]*?)</style>',game))
html='<html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>'+styles+'\nbody{margin:0;background:#f5efe4}#fixture{max-width:1100px;margin:auto}.stage.drying-photo{max-width:100%;width:100%}</style></head><body><div id="fixture"></div><script>'+constants+'\nwindow.errors=[];window.onerror=(e)=>errors.push(e);window.finished=0;window.testRandom=0;Math.random=()=>window.testRandom;const setup='+setup+';window.cleanup=setup(document.querySelector("#fixture"),{count(){},hint(){},done(){window.finished++}});</script></body></html>'
# Control game time while keeping real rendering and native input events.
html=html.replace('window.errors=[];', 'window.testCleared=false;window.setInterval=(fn)=>{window.tick=fn;return 1};window.clearInterval=()=>window.testCleared=true;window.errors=[];')
Path('/tmp/kakao-station5-live.html').write_text(html)
opener=urllib.request.build_opener(urllib.request.ProxyHandler({}))
def request(method,path,data=None):
 req=urllib.request.Request('http://127.0.0.1:9517'+path,data=None if data is None else json.dumps(data).encode(),method=method,headers={'Content-Type':'application/json'})
 with opener.open(req,timeout=30) as r:return json.load(r)['value']
log=Path('/tmp/kakao-station5-chromedriver.log').open('w')
driver=subprocess.Popen(['chromedriver','--port=9517'],stdout=log,stderr=log);session=None
try:
 for _ in range(60):
  try:request('GET','/status');break
  except Exception:time.sleep(.1)
 session=request('POST','/session',{'capabilities':{'alwaysMatch':{'browserName':'chrome','goog:chromeOptions':{'binary':'/usr/bin/chromium','args':['--headless','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--allow-file-access-from-files','--user-data-dir=/tmp/kakao-station5-browser-profile']}}}})['sessionId']
 root='/session/'+session
 def js(script):return request('POST',root+'/execute/sync',{'script':script,'args':[]})
 def wait(test):
  for _ in range(100):
   if js('return '+test):return
   time.sleep(.05)
  raise AssertionError('Timed out: '+test)
 def click():
  el=request('POST',root+'/element',{'using':'css selector','value':'#roofbtn'})['element-6066-11e4-a52e-4f735466cecf']
  request('POST',root+'/element/'+el+'/click',{})
 def shot(name):Path('/tmp/kakao-station5-'+name+'.png').write_bytes(base64.b64decode(request('GET',root+'/screenshot')))
 def state():return js('return {...document.querySelector(".drying-photo").dataset}')
 for width,reduced in [(1150,False),(1150,True),(390,False)]:
  request('POST',root+'/window/rect',{'width':width,'height':900})
  request('POST',root+'/goog/cdp/execute',{'cmd':'Emulation.setEmulatedMedia','params':{'features':[{'name':'prefers-reduced-motion','value':'reduce' if reduced else 'no-preference'}]}})
  request('POST',root+'/url',{'url':'file:///tmp/kakao-station5-live.html'})
  wait('!!document.querySelector(".drying-photo") && [...document.images].every(i=>i.complete&&i.naturalWidth>0)')
  assert state()=={'weather':'sun','covered':'false','dry':'0'}
  assert js("return getComputedStyle(document.querySelector('.rain'),'::before').backgroundImage.includes('data:image/webp;base64,')")
  assert js('return Number(getComputedStyle(document.querySelector(".roof")).opacity)')==0
  if not reduced:shot('sun-'+str(width))
  # Ama's speaking lock pauses weather and drying.
  js('const modal=document.createElement("div"),card=document.createElement("div");modal.id="modal";card.className="card amaLock";modal.appendChild(card);document.body.appendChild(modal);tick()')
  assert state()['dry']=='0';js('document.querySelector("#modal").remove()')
  click();js('tick()');assert state()['covered']=='true' and state()['dry']=='0'
  wait('Number(getComputedStyle(document.querySelector(".roof")).opacity)===1')
  click();js('window.testRandom=.9;tick()');assert state()['weather']=='rain' and state()['dry']=='17'
  js('tick()');assert state()['dry']=='7'
  click();wait('Number(getComputedStyle(document.querySelector(".roof")).opacity)===1')
  assert js('return document.querySelector("#roofbtn").getAttribute("aria-pressed")')=='true'
  if not reduced:time.sleep(.6);shot('rain-covered-'+str(width))
  js('tick()');assert state()['dry']=='7' and state()['weather']=='sun'
  click();js('window.testRandom=0;for(let i=0;i<6;i++)tick()')
  assert state()['dry']=='100';assert js('return window.finished')==1;assert js('return window.testCleared')
  assert js('return document.querySelector(".drying-progress").getAttribute("aria-valuenow")')=='100'
  js('tick()');assert js('return window.finished')==1;assert not js('return window.errors')
  assert js('return document.documentElement.scrollWidth<=window.innerWidth')
  print('Browser OK: photos, native cover button, rain protection, Ama pause, progress and completion; width='+str(width)+' reduced='+str(reduced),flush=True)
finally:
 if session:
  try:request('DELETE','/session/'+session)
  except Exception:pass
 driver.terminate();driver.wait(timeout=10);log.close()
