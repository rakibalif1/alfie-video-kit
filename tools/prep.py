# Turns episode.json into lines.txt ("N: text" per line) for the voice step.
import json, sys, os
d = sys.argv[1]; ep = json.load(open(os.path.join(d, "episode.json")))
open(os.path.join(d, "lines.txt"), "w").write("\n".join(f'{l["who"]}' + (f'[{l["emotion"]}]' if l.get("emotion") else '') + f': {l["text"]}' for l in ep["lines"]) + "\n")
print(len(ep["lines"]), "lines")
if ep.get("voices"):
    json.dump(ep["voices"], open(os.path.join(d, "voices.json"), "w"))
