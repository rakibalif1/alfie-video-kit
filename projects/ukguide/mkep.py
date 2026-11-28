# script.md -> episode.json (captions text + TTS "say" text + banter lines). Month is fixed here.
import re, json
MONTH = "November 2026"
t = open('script.md').read()
names = {'1':'cold','1B':'safety','2':'rule','3':'status','4':'sim','5':'home','6':'bank','7':'ni','8':'gp','9':'apps','10':'vote','11':'scams','12':'extras','13':'finish'}
cap = [("G-P","GP"),("N-H-S","NHS"),("U-K-V-I","UKVI"),("N-I number","NI number"),("N-I","NI"),("T-F-L","TfL"),("T-V","TV"),("B-R-P","BRP"),("H-M-R-C","HMRC"),("U.K.","UK"),("one-one-one","111"),("nine-nine-nine","999"),("one-one-one,","111,"),
       ("twelve pounds seventy-one","£12.71"),("two hundred pounds","£200")]
say = [("giffgaff","giff gaff"),("Lebara","Le bara"),("Lyca","Lie ka"),("Voxi","Vox ee"),("Dhaka","Dah ka"),("Accra","Uh krah"),("Kathmandu","Kat man doo"),("Colombo","Kuh lum bo"),("Karachi","Kuh rah chee"),("Lagos","Lay goss"),
       ("Monzo","Mon zo"),("Citymapper","City mapper"),("GOV.UK","gov dot U K"),("Delhi","Del ee"),("Healthwatch","Health watch"),("eVisa","ee Visa"),("Ofcom","Of com")]
scene = None; lines = []
for ln in t.splitlines():
    m = re.match(r'^## SCENE (\w+) —', ln)
    if m: scene = names[m.group(1)]; continue
    m = re.match(r'^([NSALP])\[(\w+)\](?:\{([\d.]+)\})?:\s*(.+)$', ln)
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
# banter: (scene, anchor substring of the line to insert AFTER, [(who, emo, text)])
B = [("safety","check the official GOV.UK",[("K","calm","Rule zero. Check GOV.UK. Always."),("C","sly","Even on a Sunday?"),("K","sly","Especially on a Sunday.")]),
 ("rule","You need the newest phone",[("C","excited","Yes! The newest phone! And the laptop! Take my money!")]),
 ("rule","Nobody here will judge you",[("K","sly","Used phone. Same screen. Zero stress."),("C","sad","But it is not shiny..."),("K","calm","Shiny is expensive, Chidi.")]),
 ("status","Employers, landlords, and banks",[("C","worried","What is a share code?"),("K","calm","Your digital handshake. You make it on GOV.UK.")]),
 ("sim","And here is where people get trapped",[("C","excited","Twenty-four months? Sign me up!"),("K","angry","Chidi. Pen down. Now.")]),
 ("home","Just send me the money today",[("C","excited","Cash is fine, he says! Easy!"),("K","angry","Red flag. Giant red flag.")]),
 ("ni","For two hundred pounds",[("C","panic","Fast-track? Two hundred pounds? Take it!"),("K","angry","Scam. The number is free. Always free.")]),
 ("gp","own guidance",[("K","calm","No ID needed. Know your rights.")]),
 ("apps","Indeed, for jobs",[("C","excited","Indeed! I am hired already!"),("K","sly","Apply first, Chidi. Pay never.")]),
 ("scams","This is the Home Office",[("C","panic","The Home Office! I will pay now!"),("K","calm","Hang up. Breathe. Call a friend.")]),
 ("finish","Notice what is not on the list",[("C","sad","Not even a small phone?"),("K","cheer","Day thirty-one, Chidi. Day thirty-one.")])]
out = []
for i, d in enumerate(lines):
    out.append(d)
    for sc, anc, add in B:
        if d["scene"] == sc and anc in d["text"] + d["say"]:
            for who, emo, tx in add: out.append({"who": who, "emotion": emo, "text": tx, "scene": sc})
assert len(out) == len(lines) + sum(len(a) for _, _, a in B), (len(out), len(lines))
EMO = {"calm":[1.0,0,1,0.35],"cheer":[1.08,0.5,1,0.3],"excited":[1.12,1.0,1.05,0.25],"surprised":[1.06,1.0,1,0.35],"worried":[1.0,0.3,1,0.35],"sad":[0.9,-0.8,0.95,0.5],
       "angry":[1.06,-0.8,1.1,0.35],"sly":[0.95,-0.5,1,0.3],"hush":[0.92,-0.8,0.92,0.45],"panic":[1.12,1.5,1.1,0.25],"story":[0.95,-0.3,1,0.5]}
ep = {"title":"Your First 30 Days in the UK","series":"UK SURVIVAL GUIDE","format":"landscape",
 "cast":{"N":{"name":"Narrator"},"K":{"name":"Kiran"},"C":{"name":"Chidi"},"S":{"name":"Mr Deal"},"A":{"name":"Slick Sid"},"L":{"name":"Mr Rush"},"P":{"name":"Officer Fake"}},
 "voices":{"N":["bf_isabella",1.0,"en-gb",-1.0],"K":["bm_lewis",1.05,"en-gb"],"C":["am_puck",1.1,"en-us"],"S":["am_michael",1.08,"en-us"],"A":["bm_fable",0.97,"en-gb"],"L":["bm_george",1.15,"en-gb"],"P":["bm_daniel",0.97,"en-gb"]},
 "emo":EMO,"pace":{"scene_lead":0.7,"short_gap":0.2,"short_lead":0.0,"q_gap":0.15,"ell_gap":0.2},
 "chain":"highpass=f=65,equalizer=f=150:t=q:w=1:g=4.5,equalizer=f=3000:t=q:w=1.2:g=0.4,equalizer=f=7500:t=q:w=1:g=-3.5,acompressor=threshold=-26dB:ratio=3.5:attack=10:release=350:makeup=6,aecho=0.9:0.5:34|80:0.09|0.05,alimiter=limit=0.95",
 "month":MONTH,"lines":out}
json.dump(ep, open('episode.json','w'), indent=1, ensure_ascii=False)
w = sum(len(l['text'].split()) for l in out); print(len(out),'lines',w,'words; scenes:',[(n,sum(1 for l in out if l['scene']==n)) for n in names.values()])
