import json,re
d=json.load(open('lines.json')); DUR=round(d['dur']+0.4,1)
S='/home/user/jobguide/project/src/'
kit=open(S+'kit.js').read(); ill=open(S+'illus.js').read()
extra=''.join(open(S+f).read()+'\n' for f in ['bg_sky.js','bg_shops.js','bg_street.js','bg_gags.js'] if __import__('os').path.exists(S+f))
calls=[]
for fn,mod in [('ukSky','bg_sky.js'),('ukShops','bg_shops.js'),('ukStreet','bg_street.js'),('ukGags','bg_gags.js')]:
    if __import__('os').path.exists(S+mod): calls.append(f"{fn}(w,{{T:0,D:DUR}});")
basic = "" if calls else "BASIC_BG(w);"
html=f'''<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=1280, height=720"/>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
<style>*{{margin:0;padding:0;box-sizing:border-box}}html,body{{width:1280px;height:720px;overflow:hidden;background:#8ecae6;font-family:Arial,sans-serif}}
#root{{position:absolute;left:0;top:0;width:1280px;height:720px;overflow:hidden}}.scene{{position:absolute;left:0;top:0;width:1280px;height:720px;overflow:hidden}}.abs{{position:absolute}}
#cap{{position:absolute;left:100px;width:1080px;height:100px;bottom:18px;z-index:50}}.capl{{position:absolute;left:0;right:0;bottom:0;text-align:center;font:900 38px/1.15 "Arial Black",Arial,sans-serif;color:#fff;-webkit-text-stroke:8px #14101c;paint-order:stroke fill}}
.nm{{display:inline-block;font-size:20px;padding:3px 10px;margin-right:10px;border:4px solid #14101c;border-radius:9px;-webkit-text-stroke:0;vertical-align:middle;position:relative;top:-3px;color:#fff}}</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="{DUR}" data-width="1280" data-height="720">
<div id="s_a" class="scene clip" data-start="0" data-duration="{DUR}" data-track-index="1"></div><div id="cap"></div>
<audio id="vo" src="assets/vo.wav" data-start="0" data-duration="{DUR}" data-track-index="5" data-volume="1"></audio></div>
<script>window.__timelines=window.__timelines||{{}};const tl=gsap.timeline({{paused:true}});window.__timelines['main']=tl;const DUR={DUR},LINES={json.dumps(d['lines'])};</script>
<script>{kit}
{ill}
function BASIC_BG(w){{box(w,{{left:0,top:0,width:W,height:470,background:'linear-gradient(#7ec8f0,#d4efff)'}});box(w,{{left:0,top:470,width:W,height:250,background:'linear-gradient(#d9d2c3,#bdb5a2)'}});}}
{extra}
</script><script>
(function(){{
const c=document.getElementById('s_a'),w=box(c,{{left:0,top:0,width:W,height:H,transformOrigin:'640px 420px'}});
{basic}{''.join(calls)}
const cast=[['priya',360],['emma',640],['ada',920]],P={{}};
cast.forEach(([k,x])=>{{P[k]=illus(w,Object.assign({{x,y:702,s:1.3,T:0,D:DUR}},ICAST[k]));P[k].breathe(0,DUR);}});
const NM={{priya:['PRIYA','#2a9d8f'],emma:['EMMA','#1d3557'],ada:['ADA','#e63946']}},EM=['happy','happy','angry','happy'],X={{priya:360,emma:640,ada:920}};
LINES.forEach((l,i)=>{{const sp=P[l.who];sp.emote(EM[i],l.start);sp.talk(l.start,l.dur);sp.gesture(l.start+0.3,l.dur);sp.emote('normal',l.start+l.dur+0.1);
 Object.keys(P).forEach((k)=>{{if(k===l.who)return;const dir=X[l.who]>X[k]?1:-1;P[k].look(dir*1.6,0,l.start,0.3);P[k].head(dir*4,l.start,0.7);P[k].emote(EM[i]==='angry'?'surprised':'normal',l.start+0.2);P[k].emote('normal',l.start+l.dur*0.7);}});
 const e=document.createElement('div');e.className='capl';e.innerHTML=`<span class="nm" style="background:${{NM[l.who][1]}}">${{NM[l.who][0]}}</span>${{l.text}}`;document.getElementById('cap').appendChild(e);gsap.set(e,{{opacity:0}});tl.to(e,{{opacity:1,duration:0.15}},l.start);tl.to(e,{{opacity:0,duration:0.15}},l.start+l.dur);}});
const last=LINES[LINES.length-1];Object.keys(P).forEach((k,i)=>P[k].laugh(last.start+last.dur-0.6+i*0.15,2.2));
tl.fromTo(w,{{scale:1}},{{scale:1.06,duration:DUR,ease:'none'}},0);
}})();
tl.set({{}},{{}},DUR);window.__timelines["main"]=tl;
</script></body></html>'''
open('index.html','w').write(html); print('built',DUR,'s modules:',[c for c in calls])
