"""Convert PNG images embedded in index.html (panorama and nested game) to WebP.

GitHub rejects files over 100 MB. Safe to re-run: only remaining PNGs are converted.
The original PNGs stay in assets/.
"""
import base64,io,re
from pathlib import Path
from PIL import Image
QUALITY=90
p=Path(__file__).resolve().parents[1]/'index.html'
s=p.read_text()
def webp(match):
    image=Image.open(io.BytesIO(base64.b64decode(match[1])));out=io.BytesIO()
    image.save(out,'WEBP',quality=QUALITY,method=6)
    return 'data:image/webp;base64,'+base64.b64encode(out.getvalue()).decode()
def convert(doc):return re.sub(r'data:image/png;base64,([A-Za-z0-9+/=]+)',webp,doc)
# Blob helpers named the MIME type literally; take it from the data URI instead.
def blob_type(doc):return re.sub(r"(atob\((\w+)\.split\(','\)\[1\]\),c=>c\.charCodeAt\(0\)\);return URL\.createObjectURL\(new Blob\(\[bytes\],\{type:)'image/png'",lambda m:f"{m[1]}{m[2]}.slice(5,{m[2]}.indexOf(';'))",doc)
m=re.search(r'(id="GAME">)([^<]+)',s)
game=blob_type(convert(base64.b64decode(m[2]).decode()))
result=convert(s[:m.start(2)])+base64.b64encode(game.encode()).decode()+convert(s[m.end(2):])
p.write_text(result)
print(f'{len(s.encode())/1e6:.1f} MB -> {len(result.encode())/1e6:.1f} MB')
