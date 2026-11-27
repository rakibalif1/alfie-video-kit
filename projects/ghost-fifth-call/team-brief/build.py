# Builds index.html from ../episode.json + ../tl.json (scene windows come from the narration timing) and src/*.js
import json, os, sys, glob
here = os.path.dirname(os.path.abspath(__file__)); os.chdir(here)
ep = json.load(open("../episode.json")); tl = json.load(open("../tl.json"))
OFF, TAIL = 3.0, 5.0
order = []
for l, m in zip(ep["lines"], tl["lines"]):
    if l["scene"] not in [o[0] for o in order]: order.append((l["scene"], m["start"] + OFF))
voice_end = tl["dur"] + OFF
SC = {"intro": {"t0": 0.0, "t1": OFF}}
for i, (n, t0) in enumerate(order):
    t1 = order[i + 1][1] if i + 1 < len(order) else voice_end + 1.5
    SC[n] = {"t0": round(t0 if i else OFF, 2), "t1": round(t1, 2)}
DUR = round(voice_end + TAIL, 2)
SC["outro"] = {"t0": SC[order[-1][0]]["t1"], "t1": DUR}
LINES = [{"who": l["who"], "text": l["text"], "start": round(m["start"] + OFF, 2), "dur": round(m["dur"], 2), "scene": l["scene"]} for l, m in zip(ep["lines"], tl["lines"])]
scenes = "\n".join(f'      <div id="s_{n}" class="scene clip" data-start="{v["t0"]}" data-duration="{round(v["t1"] - v["t0"], 2)}" data-track-index="1"></div>' for n, v in SC.items())
head = open("src/head.html").read().replace("{{DUR}}", str(DUR)).replace("{{SCENES}}", scenes)
data = f"const SC = {json.dumps(SC)};\nconst LINES = {json.dumps(LINES)};\nconst DUR = {DUR};\nconst OFF = {OFF};\n"
args = sys.argv[1:]; outs = [a for a in args if a.startswith('--out=')]; OUTP = outs[0][6:] if outs else 'index.html'; only = [a for a in args if not a.startswith('--')]   # python3 build.py road --out=/tmp/w_road.html builds only scene file src/s_road.js
parts = [head, data, open("src/kit.js").read()]
for f in sorted(glob.glob("src/s_*.js")):
    if not only or os.path.basename(f)[2:-3] in only: parts.append(open(f).read())
parts += [open("src/final.js").read(), "\n    </script>\n  </body>\n</html>\n"]
open(OUTP, "w").write("\n".join(parts)); json.dump({"SC": SC, "DUR": DUR}, open("scenes.json", "w"), indent=1)
print("built", OUTP, " duration", DUR, "s  scenes:", ", ".join(f"{n} {v['t0']}-{v['t1']}" for n, v in SC.items()))
