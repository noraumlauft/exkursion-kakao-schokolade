"""Browser checks for the photographic packing station and its drag/refill loop."""
from pathlib import Path
import base64,json,re,subprocess,time,urllib.request
from urllib.error import HTTPError

root=Path(__file__).resolve().parent.parent
page=(root/'index.html').read_text()
game=base64.b64decode(re.search(r'id="GAME">([^<]+)',page)[1]).decode()
a=game.index(' setup(a,api){',game.index("name:'Abpacken'"))+1
b=game.index('\n }\n];',a)
setup=game[a:b+2].strip().replace('setup(a,api)','function(a,api)',1)
constants='\n'.join(re.findall(r'const PACKING_(?:SCENE|SACKS|TOOL)="[^"]*";',game))+'\n'+re.search(r'const PACKING_SACKS_URL=[^\n]+',game)[0]
styles='\n'.join(re.findall(r'<style[^>]*>([\s\S]*?)</style>',game))
html='<html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>'+styles+'\nbody{margin:0;background:#f5efe4}#fixture{max-width:1100px;margin:auto}.stage.packing-photo{max-width:100%;width:100%}</style></head><body><div id="fixture"></div><script>'+constants+'\nwindow.errors=[];window.onerror=(e)=>errors.push(e);window.finished=0;const setup='+setup+';window.cleanup=setup(document.querySelector("#fixture"),{count(n,m){window.progress=[n,m]},hint(t){window.hint=t},done(){window.finished++;window.cleanup()}});Promise.all([PACKING_SCENE,PACKING_SACKS,PACKING_TOOL].map(src=>new Promise((resolve,reject)=>{const img=new Image();img.onload=resolve;img.onerror=reject;img.src=src}))).then(()=>window.assetsReady=true);</script></body></html>'
Path('/tmp/kakao-station6-live.html').write_text(html)
opener=urllib.request.build_opener(urllib.request.ProxyHandler({}))
def request(method,path,data=None):
 req=urllib.request.Request('http://127.0.0.1:9518'+path,data=None if data is None else json.dumps(data).encode(),method=method,headers={'Content-Type':'application/json'})
 try:
  with opener.open(req,timeout=30) as r:return json.load(r)['value']
 except HTTPError as exc:
  print('ChromeDriver error:',exc.read().decode(errors='replace'),flush=True)
  raise
log=Path('/tmp/kakao-station6-chromedriver.log').open('w');driver=subprocess.Popen(['chromedriver','--port=9518'],stdout=log,stderr=log);session=None
try:
 for _ in range(60):
  try:request('GET','/status');break
  except Exception:time.sleep(.1)
 session=request('POST','/session',{'capabilities':{'alwaysMatch':{'browserName':'chrome','goog:chromeOptions':{'binary':'/usr/bin/chromium','args':['--headless','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--allow-file-access-from-files','--user-data-dir=/tmp/kakao-station6-browser-profile-v2']}}}})['sessionId'];rootp='/session/'+session
 def js(script):return request('POST',rootp+'/execute/sync',{'script':script,'args':[]})
 def cdp(cmd,params):return request('POST',rootp+'/goog/cdp/execute',{'cmd':cmd,'params':params})
 def wait(test):
  for _ in range(180):
   if js('return '+test):return
   time.sleep(.04)
  raise AssertionError('Timed out: '+test)
 def element_point(expr):return js('const r=('+expr+').getBoundingClientRect();return {x:Math.round(r.left+r.width/2),y:Math.round(r.top+r.height/2)}')
 def pointer_move(start,end,pointer_type='mouse'):
  if pointer_type=='touch':
   cdp('Emulation.setTouchEmulationEnabled',{'enabled':True,'maxTouchPoints':1})
   cdp('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':start['x'],'y':start['y'],'id':1}]})
   cdp('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':round((start['x']+end['x'])/2),'y':round((start['y']+end['y'])/2),'id':1}]})
   cdp('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':end['x'],'y':end['y'],'id':1}]})
   cdp('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]})
  else:
   request('POST',rootp+'/actions',{'actions':[{'type':'pointer','id':'finger','parameters':{'pointerType':'mouse'},'actions':[{'type':'pointerMove','duration':0,'x':start['x'],'y':start['y']},{'type':'pointerDown','button':0},{'type':'pointerMove','duration':350,'x':end['x'],'y':end['y']},{'type':'pointerUp','button':0}]}]})
 def drag_scoop(target,pointer_type='mouse'):
  start=element_point('document.querySelector("#packing-scoop")');pointer_move(start,target,pointer_type)
 def sack_mouth():return element_point('(()=>{const s=document.querySelector(".packing-sack"),r=s.getBoundingClientRect();return {getBoundingClientRect:()=>({left:r.left+r.width*.5-1,top:r.top+r.height*.22-1,width:2,height:2})}})()')
 def refill_target():return js('const s=document.querySelector(".stage"),r=s.getBoundingClientRect();return {x:Math.round(r.left+r.width*.24),y:Math.round(r.top+r.height*.58)}')
 def press_key():
  e=request('POST',rootp+'/element',{'using':'css selector','value':'#packing-scoop'})['element-6066-11e4-a52e-4f735466cecf'];request('POST',rootp+'/element/'+e+'/value',{'text':'\ue007'})
 def shot(name):Path('/tmp/kakao-station6-'+name+'.png').write_bytes(base64.b64decode(request('GET',rootp+'/screenshot')))
 for width,reduced in [(1150,False),(1150,True),(390,False)]:
  request('POST',rootp+'/window/rect',{'width':width,'height':900});request('POST',rootp+'/goog/cdp/execute',{'cmd':'Emulation.setEmulatedMedia','params':{'features':[{'name':'prefers-reduced-motion','value':'reduce' if reduced else 'no-preference'}]}})
  request('POST',rootp+'/url',{'url':'file:///tmp/kakao-station6-live.html'});wait('!!window.assetsReady')
  assert js('return window.progress')==[0,5]
  assert js('return document.querySelector("#packing-scoop").dataset.phase')=='loaded'
  assert js('return getComputedStyle(document.querySelector(".packing-sack-photo")).backgroundImage.startsWith(\'url("blob:\')')
  if not reduced:shot('drag-empty-'+str(width))
  for i in range(5):
   if reduced:press_key()
   else:drag_scoop(sack_mouth(),'touch' if width==390 else 'mouse')
   if i==0 and width==1150 and not reduced:time.sleep(.28);shot('drag-pouring')
   wait('window.progress[0]==='+str(i+1))
   if i==4 and width==1150 and not reduced:
    wait('document.querySelector(".packing-sack").dataset.frame==="5"');assert js('return window.finished')==0;shot('full-open')
   if i<4:
    wait('document.querySelector("#packing-scoop").dataset.phase==="empty"')
    if reduced:press_key()
    else:drag_scoop(refill_target(),'touch' if width==390 else 'mouse')
    wait('document.querySelector("#packing-scoop").dataset.phase==="loaded"')
    assert js('return window.finished')==0
    if i==1 and not reduced:shot('part-filled-'+str(width))
  wait('window.finished===1')
  assert js('return document.querySelector(".packing-sack").dataset.frame')=='6'
  assert js('return document.querySelector(".packing-scoop").dataset.phase')=='done'
  assert not js('return window.errors')
  assert js('return document.documentElement.scrollWidth<=window.innerWidth')
  if not reduced:shot('tied-drag-'+str(width))
  # Closing during a pour cancels its animation and completion timer.
  request('POST',rootp+'/url',{'url':'file:///tmp/kakao-station6-live.html'});wait('!!window.assetsReady')
  if reduced:press_key()
  else:drag_scoop(sack_mouth())
  js('window.cleanup()');time.sleep(.1 if reduced else .9)
  assert js('return window.finished')==0
  print('Browser OK: drag, pour, refill, completion and cleanup; width='+str(width)+' reduced='+str(reduced),flush=True)
finally:
 if session:
  try:request('DELETE','/session/'+session)
  except Exception:pass
 driver.terminate();driver.wait(timeout=10);log.close()
