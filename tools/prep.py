# Turns episode.json into lines.txt ("N: text" per line) for the voice step.
import json, sys, os
d = sys.argv[1]; ep = json.load(open(os.path.join(d, "episode.json")))
open(os.path.join(d, "lines.txt"), "w").write("\n".join(f'{l["who"]}: {l["text"]}' for l in ep["lines"]) + "\n")
print(len(ep["lines"]), "lines")
