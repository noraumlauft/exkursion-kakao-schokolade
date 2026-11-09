from pathlib import Path
import re,json,subprocess,time,urllib.request,base64
page=(Path(__file__).resolve().parent.parent/'index.html').read_text()
s=base64.b64decode(re.search(r'<script[^>]*id="GAME"[^>]*>([\s\S]*?)</script>',page)[1]).decode()
a=s.index(' setup(a,api){',s.index("name:'Öffnen'"))+1;b=s.index('\n }},',a);setup=s[a:b+3].replace('setup(a,api)','function(a,api)',1)
cs='\n'.join(re.findall(r'const (?:OPENING_SCENE|OPENING_PODS|HARVEST_MACHETE)="[^"]*";',s));styles='\n'.join(re.findall(r'<style[^>]*>([\s\S]*?)</style>',s))
html='<html><head><style>'+styles+'\nbody{margin:0;background:#eae3d6}.stage.opening-photo{max-width:1100px;width:100%;margin:0 auto}</style></head><body><div id="preview"></div><script>'+cs+'\nwindow.errors=[];window.onerror=(e)=>errors.push(e);window.finished=0;const setup='+setup+';window.cleanup=setup(document.querySelector("#preview"),{count(n,max){window.progress=[n,max]},hint(){},done(){window.finished++}});</script></body></html>';Path('/tmp/kakao-station3-live.html').write_text(html)
opener=urllib.request.build_opener(urllib.request.ProxyHandler({}))
def request(method,path,data=None):
 req=urllib.request.Request('http://localhost:9516'+path,data=None if data is None else json.dumps(data).encode(),method=method,headers={'Content-Type':'application/json'})
 with opener.open(req,timeout=30) as r:return json.load(r)['value']
log=Path('/tmp/kakao-chromedriver.log').open('w');driver=subprocess.Popen(['chromedriver','--port=9516'],stdout=log,stderr=log)
session=None
try:
 for _ in range(50):
  try:request('GET','/status');break
  except Exception:time.sleep(.1)
 session=request('POST','/session',{'capabilities':{'alwaysMatch':{'browserName':'chrome','goog:chromeOptions':{'binary':'/usr/bin/chromium','args':['--headless','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--user-data-dir=/tmp/kakao-webdriver-profile','--allow-file-access-from-files','--window-size=1150,820']}}}})['sessionId']
 root='/session/'+session
 def js(script):return request('POST',root+'/execute/sync',{'script':script,'args':[]})
 def wait(script):
  for _ in range(100):
   if js('return '+script):return
   time.sleep(.05)
  raise AssertionError('Timed out: '+script)
 def shot(name):Path('/tmp/kakao-'+name+'.png').write_bytes(base64.b64decode(request('GET',root+'/screenshot')))
 for reduced in [False,True]:
  request('POST',root+'/goog/cdp/execute',{'cmd':'Emulation.setEmulatedMedia','params':{'features':[{'name':'prefers-reduced-motion','value':'reduce' if reduced else 'no-preference'}]}})
  request('POST',root+'/url',{'url':'file:///tmp/kakao-station3-live.html'})
  wait('!!document.querySelector(".bigpod")')
  for i in range(3):
   js('document.querySelector(".bigpod").click();document.querySelector(".bigpod").click()')
   wait('!!document.querySelector(".core-piece")' if i==2 else '!document.querySelector(".bigpod").disabled')
  wait('[...document.images].every(i=>i.complete)')
  if not reduced:time.sleep(.5);shot('extraction-full')
  assert js('return window.finished')==0
  # Actual WebDriver clicks verify CSS hit testing against each clipped, rotated region.
  for i in range(12):
   # Pick an interior point: center of the polygon, transformed through the rotated pod.
   script='''const b=document.querySelectorAll('.core-piece')[%d],p=b.parentElement.parentElement,r=p.getBoundingClientRect(),w=p.offsetWidth,h=p.offsetHeight;
const pts=b.style.clipPath.match(/[\\d.]+/g).map(Number);let x=0,y=0;for(let k=0;k<pts.length;k+=2){x+=pts[k];y+=pts[k+1]}x/=pts.length/2;y/=pts.length/2;
const lx=b.offsetLeft+b.offsetWidth*x/100-w/2,ly=b.offsetTop+b.offsetHeight*y/100-h/2,a=-52*Math.PI/180;
return {x:Math.round(r.left+r.width/2+lx*Math.cos(a)-ly*Math.sin(a)),y:Math.round(r.top+r.height/2+lx*Math.sin(a)+ly*Math.cos(a))}'''%i
   point=js(script)
   request('POST',root+'/actions',{'actions':[{'type':'pointer','id':'mouse','parameters':{'pointerType':'mouse'},'actions':[{'type':'pointerMove','duration':0,'x':point['x'],'y':point['y']},{'type':'pointerDown','button':0},{'type':'pointerUp','button':0}]}]})
   wait('document.querySelectorAll(".core-in-bowl").length==='+str(i+1))
   if i==5 and not reduced:shot('extraction-half')
  assert js('return window.finished')==1
  assert js('return window.progress')==[12,12]
  assert not js('return window.errors')
  assert js('return document.querySelectorAll(".core-flight").length')==0
  if not reduced:shot('extraction-empty')
  print('Browser OK: 3 cuts, 12 actual pointer clicks, correct delivery and completion; reduced='+str(reduced))
finally:
 if session:
  try:request('DELETE','/session/'+session)
  except Exception:pass
 driver.terminate();driver.wait(timeout=10);log.close()
