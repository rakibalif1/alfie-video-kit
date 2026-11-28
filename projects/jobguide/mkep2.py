# script.md (tagged "## SCENE n [name] —") -> episode.json. Month fixed here.
import re, json
MONTH = "November 2026"
t = open('script.md').read()
cap = [("S-I-A","SIA"),("A-I","AI"),("G-P","GP"),("N-H-S","NHS"),("U.K.","UK"),("twelve pounds seventy-one","£12.71"),("ten pounds eighty-five","£10.85")]
say = [("SAFERjobs","safer jobs"),("JobsAware","jobs aware"),("Totaljobs","Total jobs"),("LinkedIn","Linked In"),("ChatGPT","Chat G P T"),("Canva","Can va"),("Gemini","Jem in eye"),("GOV.UK","gov dot U K"),("Karachi","Kuh rah chee"),
       ("Dhaka","Dah ka"),("Accra","Uh krah"),("Kathmandu","Kat man doo"),("Colombo","Kuh lum bo"),("Lagos","Lay goss"),("Delhi","Del ee"),("eVisa","ee Visa")]
scene = None; lines = []
for ln in t.splitlines():
    m = re.match(r'^## SCENE \d+ \[(\w+)\]', ln)
    if m: scene = m.group(1); continue
    if ln.startswith('---') and scene and 'FACT CHECK' in ln: break
    m = re.match(r'^([NSALPKC])\[(\w+)\](?:\{([\d.]+)\})?:\s*(.+)$', ln)
    if m and scene:
        who, emo, pause, txt = m.group(1), m.group(2), m.group(3), m.group(4).replace('{{MONTH_YEAR}}', MONTH)
        d = {"who": who, "emotion": emo, "text": txt, "scene": scene}
        if pause: d["pause"] = float(pause)
        lines.append(d)
for d in lines:
    c = d["text"]; s = d["text"]
    for a, b in cap: c = c.replace(a, b)
    for a, b in say: s = s.replace(a, b)
    d["text"] = c; d["say"] = s
EMO = {"calm":[1.0,0,1,0.35],"cheer":[1.08,0.5,1,0.3],"excited":[1.12,1.0,1.05,0.25],"surprised":[1.06,1.0,1,0.35],"worried":[1.0,0.3,1,0.35],"sad":[0.9,-0.8,0.95,0.5],
       "angry":[1.06,-0.8,1.1,0.35],"sly":[0.95,-0.5,1,0.3],"hush":[0.92,-0.8,0.92,0.45],"panic":[1.12,1.5,1.1,0.25],"story":[0.95,-0.3,1,0.5]}
CHECKS = {"visa":"CHECK: your eVisa or decision letter, and your university visa team","survive":"CHECK: gov.uk (SIA licence and right to work)","cv":"CHECK: nationalcareers.service.gov.uk (CV advice)",
  "tools":"TIP: never paste passport or ID numbers into AI tools","scams":"REPORT: reportfraud.police.uk · FREE HELP: Citizens Advice","linkedin":"TIP: never pay anyone who contacts you on LinkedIn",
  "find":"CHECK: the employer on the Register of Licensed Sponsors (GOV.UK)","study":"CHECK: gov.uk (Graduate visa and Skilled Worker rules)"}
ep = {"title":"How to Get a Job in the UK","series":"UK SURVIVAL GUIDE · PART 2","format":"landscape",
 "voices":{"N":["bf_isabella",1.0,"en-gb",-1.0],"K":["bm_lewis",1.05,"en-gb"],"C":["am_puck",1.1,"en-us"],"S":["am_michael",1.08,"en-us"],"A":["bm_fable",0.97,"en-gb"],"L":["bm_george",1.15,"en-gb"],"P":["bm_daniel",0.97,"en-gb"]},
 "emo":EMO,"pace":{"scene_lead":0.7,"short_gap":0.2,"short_lead":0.0,"q_gap":0.15,"ell_gap":0.2},
 "chain":"highpass=f=65,equalizer=f=150:t=q:w=1:g=4.5,equalizer=f=3000:t=q:w=1.2:g=0.4,equalizer=f=7500:t=q:w=1:g=-3.5,acompressor=threshold=-26dB:ratio=3.5:attack=10:release=350:makeup=6,aecho=0.9:0.5:34|80:0.09|0.05,alimiter=limit=0.95",
 "month":MONTH,"checks":CHECKS,"next":"Subscribe for Part 3: money, credit and sending money home","lines":lines}
json.dump(ep, open('episode.json','w'), indent=1, ensure_ascii=False)
from collections import OrderedDict
sc = OrderedDict(); [sc.__setitem__(l['scene'], sc.get(l['scene'], 0) + 1) for l in lines]
print(len(lines), 'lines;', dict(sc))
