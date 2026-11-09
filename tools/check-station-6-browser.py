"""Real Chromium checks for the photographic packing station (ChromeDriver required)."""
from pathlib import Path
import base64,json,re,subprocess,time,urllib.request
page=(Path(__file__).resolve().parent.parent/'index.html').read_text()
game=base64.b64decode(re.search(r'id="GAME">([^<]+)',page)[1]).decode()
a=game.index(' setup(a,api){',game.index("name:'Abpacken'"))+1;b=game.index('\n }}\n];',a)
setup=game[a:b+3].replace('setup(a,api)','function(a,api)',1)
constants='\n'.join(re.findall(r'const PACKING_(?:SCENE|SACKS|TOOL)="[^"]*";',game))+ '\n' + re.search(r'const PACKING_SACKS_URL=[^\n]+',game)[0]
styles='\n'.join(re.findall(r'<style[^>]*>([\s\S]*?)</style>',game))
html='<html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>'+styles+'\nbody{margin:0;background:#f5efe4}#fixture{max-width:1100px;margin:auto}.stage.packing-photo{max-width:100%;width:100%}</style></head><body><div id="fixture"></div><script>'+constants+'\nwindow.errors=[];window.onerror=(e)=>errors.push(e);window.finished=0;const setup='+setup+';window.cleanup=setup(document.querySelector("#fixture"),{count(n,m){window.progress=[n,m]},hint(){},done(){window.finished++;window.cleanup()}});Promise.all([PACKING_SCENE,PACKING_SACKS,PACKING_TOOL].map(src=>new Promise((resolve,reject)=>{const img=new Image();img.onload=resolve;img.onerror=reject;img.src=src}))).then(()=>window.assetsReady=true);</script></body></html>'
Path('/tmp/kakao-station6-live.html').write_text(html)
opener=urllib.request.build_opener(urllib.request.ProxyHandler({}))
def request(method,path,data=None):
 req=urllib.request.Request('http://127.0.0.1:9518'+path,data=None if data is None else json.dumps(data).encode(),method=method,headers={'Content-Type':'application/json'})
 with opener.open(req,timeout=30) as r:return json.load(r)['value']
log=Path('/tmp/kakao-station6-chromedriver.log').open('w');driver=subprocess.Popen(['chromedriver','--port=9518'],stdout=log,stderr=log);session=None
try:
 for _ in range(60):
  try:request('GET','/status');break
  except Exception:time.sleep(.1)
 session=request('POST','/session',{'capabilities':{'alwaysMatch':{'browserName':'chrome','goog:chromeOptions':{'binary':'/usr/bin/chromium','args':['--headless','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--allow-file-access-from-files','--user-data-dir=/tmp/kakao-station6-browser-profile']}}}})['sessionId'];root='/session/'+session
 def js(script):return request('POST',root+'/execute/sync',{'script':script,'args':[]})
 def wait(test):
  for _ in range(150):
   if js('return '+test):return
   time.sleep(.04)
  raise AssertionError('Timed out: '+test)
 def click():
  el=request('POST',root+'/element',{'using':'css selector','value':'#shovel'})['element-6066-11e4-a52e-4f735466cecf'];request('POST',root+'/element/'+el+'/click',{})
 def shot(name):Path('/tmp/kakao-station6-'+name+'.png').write_bytes(base64.b64decode(request('GET',root+'/screenshot')))
 for width,reduced in [(1150,False),(1150,True),(390,False)]:
  request('POST',root+'/window/rect',{'width':width,'height':900});request('POST',root+'/goog/cdp/execute',{'cmd':'Emulation.setEmulatedMedia','params':{'features':[{'name':'prefers-reduced-motion','value':'reduce' if reduced else 'no-preference'}]}})
  request('POST',root+'/url',{'url':'file:///tmp/kakao-station6-live.html'});wait('!!window.assetsReady')
  assert js('return window.progress')==[0,5]
  assert js("return getComputedStyle(document.querySelector('.packing-sack-photo')).backgroundImage.startsWith('url(\"blob:')")
  if not reduced:shot('empty-'+str(width))
  for i in range(5):
   if reduced and i==2:
    # Native keyboard activation verifies the accessible button path too.
    element=request('POST',root+'/element',{'using':'css selector','value':'#shovel'})['element-6066-11e4-a52e-4f735466cecf'];request('POST',root+'/element/'+element+'/value',{'text':'\ue007'})
   else:click()
   if not reduced:js('document.querySelector("#shovel").click();document.querySelector("#shovel").click()')
   if i==0 and width==1150 and not reduced:time.sleep(.59);shot('pouring')
   if i==4 and width==1150 and not reduced:
    wait('document.querySelector(".packing-sack").dataset.frame==="5"');assert js('return window.finished')==0;shot('full-open')
   wait('window.finished===1' if i==4 else 'window.progress[0]==='+str(i+1)+' && !document.querySelector("#shovel").disabled')
   assert js('return window.progress')==[i+1,5]
   if i==1 and not reduced:shot('part-filled-'+str(width))
  assert js('return document.querySelector(".packing-sack").dataset.frame')=='6'
  assert js('return window.finished')==1
  assert js('return document.querySelector("#shovel").disabled')
  assert not js('return window.errors')
  assert js('return document.documentElement.scrollWidth<=window.innerWidth')
  if not reduced:shot('tied-'+str(width))
  # Closing during an active scoop must never complete a hidden station.
  request('POST',root+'/url',{'url':'file:///tmp/kakao-station6-live.html'});wait('!!window.assetsReady');click();js('window.cleanup()');time.sleep(.1 if reduced else 1.4)
  assert js('return window.finished')==0
  print('Browser OK: five native clicks, no double-counts, photographic fill states, tied completion, keyboard and cancellation; width='+str(width)+' reduced='+str(reduced),flush=True)
finally:
 if session:
  try:request('DELETE','/session/'+session)
  except Exception:pass
 driver.terminate();driver.wait(timeout=10);log.close()
