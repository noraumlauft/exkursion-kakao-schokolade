from pathlib import Path
import re,json,subprocess,time,urllib.request,base64
page=(Path(__file__).resolve().parent.parent/'index.html').read_text()
s=base64.b64decode(re.search(r'<script[^>]*id="GAME"[^>]*>([\s\S]*?)</script>',page)[1]).decode()
a=s.index(' setup(a,api){',s.index("name:'Öffnen'"))+1;b=s.index('\n }},',a);setup=s[a:b+3].replace('setup(a,api)','function(a,api)',1)
cs='\n'.join(re.findall(r'const (?:OPENING_SCENE|OPENING_PODS|OPENING_STAGES|OPENING_BEAN|HARVEST_MACHETE)="[^"]*";',s));cs+='\n'+re.search(r'const OPENING_STAGES_URL=[^\n]+',s)[0];styles='\n'.join(re.findall(r'<style[^>]*>([\s\S]*?)</style>',s))
html='<html><head><style>'+styles+'\nbody{margin:0;background:#eae3d6}.stage.opening-photo{max-width:1100px;width:100%;margin:0 auto}</style></head><body><div id="preview"></div><script>'+cs+'\nwindow.errors=[];window.onerror=(e)=>errors.push(e);window.finished=0;const setup='+setup+';window.cleanup=setup(document.querySelector("#preview"),{count(n,max){window.progress=[n,max]},hint(){},done(){window.finished++}});</script></body></html>';Path('/tmp/kakao-photo-stages-live.html').write_text(html)
opener=urllib.request.build_opener(urllib.request.ProxyHandler({}))
def request(method,path,data=None):
 req=urllib.request.Request('http://localhost:9517'+path,data=None if data is None else json.dumps(data).encode(),method=method,headers={'Content-Type':'application/json'})
 with opener.open(req,timeout=30) as r:return json.load(r)['value']
log=Path('/tmp/kakao-photo-stages-driver.log').open('w');driver=subprocess.Popen(['chromedriver','--port=9517'],stdout=log,stderr=log)
session=None
try:
 for _ in range(50):
  try:request('GET','/status');break
  except Exception:time.sleep(.1)
 session=request('POST','/session',{'capabilities':{'alwaysMatch':{'browserName':'chrome','goog:chromeOptions':{'binary':'/usr/bin/chromium','args':['--headless','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--user-data-dir=/tmp/kakao-photo-stages-profile','--allow-file-access-from-files','--window-size=1150,820']}}}})['sessionId']
 root='/session/'+session
 def js(script):return request('POST',root+'/execute/sync',{'script':script,'args':[]})
 def wait(script):
  for _ in range(100):
   if js('return '+script):return
   time.sleep(.05)
  raise AssertionError('Timed out: '+script)
 def shot(name):Path('/tmp/kakao-'+name+'.png').write_bytes(base64.b64decode(request('GET',root+'/screenshot')))
 for reduced,width in [(False,1150),(True,1150),(False,430)]:
  request('POST',root+'/window/rect',{'width':width,'height':1000})
  request('POST',root+'/goog/cdp/execute',{'cmd':'Emulation.setEmulatedMedia','params':{'features':[{'name':'prefers-reduced-motion','value':'reduce' if reduced else 'no-preference'}]}})
  request('POST',root+'/url',{'url':'file:///tmp/kakao-photo-stages-live.html'})
  wait('!!document.querySelector(".bigpod")')
  for i in range(3):
   js('document.querySelector(".bigpod").click();document.querySelector(".bigpod").click()')
   wait('!!document.querySelector(".extraction-pod")' if i==2 else '!document.querySelector(".bigpod").disabled')
  wait('[...document.images].every(i=>i.complete)')
  assert js('return window.finished')==0
  collected=0
  for i,amount in enumerate([3,4,2,5,3,4,2,5,4,3,5]):
   point=js("const r=document.querySelector('.extraction-pod').getBoundingClientRect();return {x:Math.round(r.left+r.width/2),y:Math.round(r.top+r.height/2)}")
   request('POST',root+'/actions',{'actions':[{'type':'pointer','id':'mouse','parameters':{'pointerType':'mouse'},'actions':[{'type':'pointerMove','duration':0,'x':point['x'],'y':point['y']},{'type':'pointerDown','button':0},{'type':'pointerUp','button':0}]}]})
   collected+=amount
   wait('document.querySelectorAll(".bowl-bean").length==='+str(collected))
   assert js('return window.progress')==[collected,40]
   assert js('return document.querySelector(".extraction-pod").dataset.frame')==str(i+1)
   if i==4 and not reduced:shot('photo-stages-half-'+str(width))
  assert js('return window.finished')==1
  assert js('return window.progress')==[40,40]
  assert not js('return window.errors')
  assert js('return document.querySelectorAll(".portion-flight").length')==0
  if not reduced:shot('photo-stages-empty-'+str(width))
  print('Browser OK: three cuts, 11 actual clicks, 12 photographic states, exactly 40 beans; reduced='+str(reduced)+' width='+str(width),flush=True)

finally:
 if session:
  try:request('DELETE','/session/'+session)
  except Exception:pass
 driver.terminate();driver.wait(timeout=10);log.close()
