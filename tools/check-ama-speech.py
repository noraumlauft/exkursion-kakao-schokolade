"""Verify pronunciation preparation, explicit dash pauses and every MP3 decoder."""
import concurrent.futures,importlib.util,json,re,subprocess
from pathlib import Path
root=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('speech',root/'tools/generate-ama-audio.py');speech=importlib.util.module_from_spec(spec);spec.loader.exec_module(speech)
assert speech.speech_parts('Hi, ich bin Ama!')==['Hi, ich bin Ahma!']
assert speech.speech_parts('Amas Haus – hier wohnt Ama.')==['Ahmas Haus','hier wohnt Ahma.']
assert speech.speech_parts('Heute - und morgen.')==['Heute','und morgen.']
assert speech.speech_parts('Kakao-Bohnen')==['Kakao-Bohnen']
assert speech.speech_parts('– du brauchst den Kakaosack')==['du brauchst den Kakaosack']
m=json.loads((root/'assets/audio/ama-manifest.json').read_text())
assert m['dash_pause_ms']==350
for text in ['Ich wohne hier – auf unserer Kakaoplantage in Ghana.','Die Bohnen schmecken noch bitter – gar nicht nach Schokolade!']:
    c=next(c for c in m['clips'] if c['text']==text)
    r=subprocess.run(['ffmpeg','-hide_banner','-i',str(root/'assets/audio'/c['file']),'-af','silencedetect=noise=-45dB:d=0.32','-f','null','-'],capture_output=True,text=True,check=True)
    pauses=[float(v) for v in re.findall(r'silence_duration: ([\d.]+)',r.stderr)]
    assert any(v>=.34 for v in pauses),(text,pauses)
# A dash after sentence punctuation may be at the start of its own clip.
c=next(c for c in m['clips'] if c['text']=='– du brauchst den Kakaosack')
r=subprocess.run(['ffmpeg','-hide_banner','-i',str(root/'assets/audio'/c['file']),'-af','silencedetect=noise=-45dB:d=0.32','-f','null','-'],capture_output=True,text=True,check=True)
assert re.search(r'silence_start: 0(?:\s|$)',r.stderr),r.stderr
assert any(float(v)>=.34 for v in re.findall(r'silence_duration: ([\d.]+)',r.stderr))
def check(c):
    r=subprocess.run(['ffmpeg','-v','error','-i',str(root/'assets/audio'/c['file']),'-f','null','-'],capture_output=True)
    assert r.returncode==0,(c['file'],r.stderr)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:list(pool.map(check,m['clips']))
print(f"OK: fluent-name rendering input, hyphen/dash handling, 350 ms pauses in encoded samples; {len(m['clips'])} MP3s decode without errors.")
