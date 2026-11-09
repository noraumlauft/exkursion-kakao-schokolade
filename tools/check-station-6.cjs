const fs=require('fs'),assert=require('assert'),path=require('path');
const root=path.join(__dirname,'..');
const page=fs.readFileSync(path.join(root,'index.html'),'utf8');
const game=Buffer.from(page.match(/id="GAME">([^<]+)/)[1],'base64').toString();
const source=fs.readFileSync(path.join(__dirname,'station-6-packing-setup.js'),'utf8').trim();
assert(game.includes(source),'embedded drag-and-refill setup differs from its source');
for(const [name,file,ratio,alpha] of [
 ['PACKING_SCENE','station-6-packplatz.webp',1.5,false],
 ['PACKING_SACKS','station-6-jutesack-fuellstufen-v2.webp',2,true],
 ['PACKING_TOOL','station-6-schaufel-und-bohnen-v2.webp',3,true]
]){
 const image=require('./webp-info.cjs')(fs.readFileSync(path.join(root,'assets',file)));
 assert(Math.abs(image.width-image.height*ratio)<=1,`${file}: unexpected sprite proportions`);
 if(alpha)assert(image.alpha,`${file}: transparent background missing`);
 assert(new RegExp('const '+name+'="data:image/webp;base64,[A-Za-z0-9+/=]+";').test(game),`${name}: image missing from embedded game`);
}
for(const required of ['pointerdown','pointermove','pointerup','pointercancel','inMouth','inTray','setPhase(\'empty\')','setPhase(\'loaded\')','aria-live="polite"'])
 assert(source.includes(required),`missing drag interaction detail: ${required}`);
assert(!source.includes('id="shovel"'),'old click-to-shovel button remains');
console.log('OK: Station 6 embeds smaller-bean atlases and a finger-drag scoop flow with pour, return-to-tray refill, keyboard access and live instructions.');
