"""Package the editable photographic emptying scene into the latest embedded game."""
from pathlib import Path
import re,base64
root=Path(__file__).resolve().parents[1];p=root/'index.html';s=p.read_text();m=re.search('(id="GAME">)([^<]+)',s);g=base64.b64decode(m[2]).decode()
a=g.index(' setup(a,api){',g.index("name:'Öffnen'"))+1;b=g.index('\n }},',a)
g=g[:a]+(root/'tools/station-3-photo-stages-setup.js').read_text().rstrip()+g[b+3:]
if 'const OPENING_STAGES=' not in g:
 asset=base64.b64encode((root/'assets/station-3-frucht-leeren-stufen.png').read_bytes()).decode()
 g=g.replace('const OPENING_SCENE=',f'const OPENING_STAGES="data:image/png;base64,{asset}";\nconst OPENING_SCENE=',1)
if 'const OPENING_STAGES_URL=' not in g:
 g=g.replace('const OPENING_SCENE=',"const OPENING_STAGES_URL=(()=>{const bytes=Uint8Array.from(atob(OPENING_STAGES.split(',')[1]),c=>c.charCodeAt(0));return URL.createObjectURL(new Blob([bytes],{type:'image/png'}))})();\nconst OPENING_SCENE=",1)
if '.opening-photo .emptying-half{' not in g:g=g.replace('</style>',(root/'tools/station-3-photo-stages.css').read_text()+'</style>',1)
extra='Nimm immer 2 bis 5 Bohnen mit ihrem Fruchtfleisch heraus, bis die Frucht leer ist.'
g=g.replace('Dann sammle die Bohnen ein."','Dann sammle die Bohnen ein. '+extra+'"').replace('" in die Schüssel!";','" in die Schüssel! '+extra+'";')
p.write_text(s[:m.start(2)]+base64.b64encode(g.encode()).decode()+s[m.end(2):])
