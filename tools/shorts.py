# Cuts vertical Shorts out of a long episode. episode.json holds "shorts": [{"name": "hook", "lines": [0, 5]}] (inclusive line numbers).
# Writes <episode>/shorts/<name>/episode.json (portrait, same cast, sets, crowd), ready for make.sh.
import json, os, sys, copy
d = sys.argv[1]; ep = json.load(open(os.path.join(d, "episode.json")))
L = ep["lines"]; setof = []
for i, l in enumerate(L): setof.append(l.get("set") or (setof[i - 1] if i else next(iter(ep["sets"]))))
def shift(o, a, b, keys):
    n = b - a + 1
    for k in keys:
        if k in o: o[k] = min(max(o[k] - a, 0 if o[k] >= a else -99), n - 1) if a <= o[k] <= b else (-99 if o[k] < a else n + 99)
for s in ep.get("shorts", []):
    a, b = s["lines"]; e = copy.deepcopy(ep); e.pop("shorts", None); e.pop("format", None)
    e["title"] = ep.get("title", "") + " (" + s["name"] + ")"; e["lines"] = L[a:b + 1]
    if "set" not in e["lines"][0]: e["lines"][0]["set"] = setof[a]
    for p in list(e.get("props", [])):
        if p.get("toLine", p.get("fromLine", 0)) < a or p.get("fromLine", 0) > b: e["props"].remove(p)
        else: p["fromLine"] = max(p.get("fromLine", 0) - a, 0); p["toLine"] = min(p.get("toLine", p["fromLine"] + a) - a, b - a)
    for name, st in e["sets"].items():
        for p in list(st.get("pieces", [])):
            if "fromLine" in p:
                if p.get("toLine", p["fromLine"]) < a or p["fromLine"] > b: st["pieces"].remove(p)
                else: p["fromLine"] = max(p["fromLine"] - a, 0); p["toLine"] = min(p.get("toLine", p["fromLine"] + a) - a, b - a)
    for x in e.get("extras", []):
        if "react" in x: x["react"]["from"] = x["react"]["from"] - a; x["react"]["to"] = x["react"]["to"] - a
    out = os.path.join(d, "shorts", s["name"]); os.makedirs(out, exist_ok=True); json.dump(e, open(os.path.join(out, "episode.json"), "w"), indent=1)
    print("short", s["name"], "lines", a, "to", b)
