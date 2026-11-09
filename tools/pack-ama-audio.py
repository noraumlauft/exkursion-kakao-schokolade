"""Embed assets/audio MP3s in both the panorama and the nested game."""
import base64,json,re,subprocess,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
subprocess.run([sys.executable,str(ROOT/'tools/integrate-photo-stages.py')],check=True)
subprocess.run([sys.executable,str(ROOT/'tools/integrate-ama-game.py')],check=True)
p=ROOT/'index.html'
s=p.read_text()
manifest=json.loads((ROOT/'assets/audio/ama-manifest.json').read_text())
clips={clip['text']:'data:audio/mpeg;base64,'+base64.b64encode((ROOT/'assets/audio'/clip['file']).read_bytes()).decode() for clip in manifest['clips']}
papa_manifest=json.loads((ROOT/'assets/audio/papa-manifest.json').read_text())
papa_clips={clip['text']:'data:audio/mpeg;base64,'+base64.b64encode((ROOT/'assets/audio'/clip['file']).read_bytes()).decode() for clip in papa_manifest['clips']}
runtime=(ROOT/'tools/ama-audio.js').read_text().replace('__AMA_CLIPS__',json.dumps(clips,ensure_ascii=False,separators=(',',':'))).replace('__PAPA_CLIPS__',json.dumps(papa_clips,ensure_ascii=False,separators=(',',':')))
block='<script id="amaAudioRuntime">'+runtime+'</script>'
def embed(doc):
    if '<!-- AMA_AUDIO_RUNTIME -->' in doc:return doc.replace('<!-- AMA_AUDIO_RUNTIME -->',block)
    doc,count=re.subn(r'<script id="amaAudioRuntime">[\s\S]*?</script>',lambda _:block,doc)
    if count!=1:raise ValueError('Expected exactly one audio runtime')
    return doc
game=re.search(r'(<script type="text/plain" id="GAME">)([^<]+)',s)
g=embed(base64.b64decode(game[2]).decode())
s=s[:game.start(2)]+base64.b64encode(g.encode()).decode()+s[game.end(2):]
s=embed(s)
p.write_text(s)
print(f'Embedded {len(clips)} Ama and {len(papa_clips)} Papa MP3 recordings in panorama and game.')
