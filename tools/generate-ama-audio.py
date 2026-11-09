"""Render manifest texts with natural name pronunciation and audible dash pauses.
Requires edge-tts and ffmpeg. Existing unchanged recordings are retained.
"""
import argparse,asyncio,hashlib,json,re,tempfile,wave
from pathlib import Path
import edge_tts

ROOT=Path(__file__).resolve().parents[1]
DASH=re.compile(r'\s*[–—]\s*|\s+-\s+')
def speech_parts(text):
    # This changes pronunciation only; the displayed transcript stays unchanged.
    return [re.sub(r'\bAmas?\b',lambda m:'Ahmas' if m[0]=='Amas' else 'Ahma',p.strip()) for p in DASH.split(text) if p.strip()]
async def command(*args):
    proc=await asyncio.create_subprocess_exec(*args,stdout=asyncio.subprocess.PIPE,stderr=asyncio.subprocess.PIPE)
    out,err=await proc.communicate()
    if proc.returncode:raise RuntimeError(err.decode())
    return out
async def main(manifest_path=None):
    manifest_path=Path(manifest_path) if manifest_path else ROOT/'assets/audio/ama-manifest.json'
    folder=manifest_path.parent
    manifest=json.loads(manifest_path.read_text())
    state_path=folder/manifest_path.name.replace('-manifest.json','-render-state.json')
    state=json.loads(state_path.read_text()) if state_path.exists() else {}
    sem=asyncio.Semaphore(3)
    async def render(clip):
        target=folder/clip['file'];text=clip['text']
        leading_dash=bool(re.match(r'^\s*[–—-](?:\s|$)',text))
        signature=hashlib.sha256(json.dumps([text,manifest['voice'],manifest['rate'],manifest['pitch'],manifest.get('dash_pause_ms',350),'Ahma-v3-leading' if leading_dash else 'Ahma-v2']).encode()).hexdigest()
        expressive=bool(DASH.search(text) or re.search(r'\bAmas?\b',text))
        if target.exists() and target.stat().st_size>1000 and (state.get(clip['file'])==signature or (clip['file'] not in state and not expressive)):
            state[clip['file']]=signature;return
        async with sem:
            for attempt in range(4):
                try:
                    with tempfile.TemporaryDirectory(prefix='ama-speech-') as tmpdir:
                        parts=speech_parts(text);pcm=[]
                        for i,part in enumerate(parts):
                            mp3=Path(tmpdir)/f'{i}.mp3'
                            await edge_tts.Communicate(part,manifest['voice'],rate=manifest['rate'],pitch=manifest['pitch']).save(str(mp3))
                            pcm.append(await command('ffmpeg','-v','error','-i',str(mp3),'-f','s16le','-ar','24000','-ac','1','pipe:1'))
                        silence=bytes(int(24000*manifest.get('dash_pause_ms',350)/1000)*2)
                        wav=Path(tmpdir)/'speech.wav'
                        with wave.open(str(wav),'wb') as out:
                            out.setnchannels(1);out.setsampwidth(2);out.setframerate(24000);out.writeframes((silence if leading_dash else b'')+silence.join(pcm))
                        result=Path(tmpdir)/'speech.mp3'
                        await command('ffmpeg','-v','error','-i',str(wav),'-codec:a','libmp3lame','-b:a','64k',str(result))
                        target.write_bytes(result.read_bytes())
                    state[clip['file']]=signature
                    print(clip['file'],flush=True);return
                except Exception:
                    if attempt==3:raise
                    await asyncio.sleep(2*(attempt+1))
    await asyncio.gather(*(render(clip) for clip in manifest['clips']))
    state_path.write_text(json.dumps(state,indent=2)+'\n')
if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--manifest',type=Path,help='Audio manifest; defaults to Ama')
    asyncio.run(main(parser.parse_args().manifest))
