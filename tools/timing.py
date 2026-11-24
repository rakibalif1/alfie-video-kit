# Builds tl.json (line times + 30 fps mouth openness from the voice audio) for the scene page.
import json, sys, os, wave
import numpy as np
d = sys.argv[1]; w = wave.open(os.path.join(d, "audio/vo.wav")); sr = w.getframerate()
a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(float) / 32768
fps = 30; hop = sr // fps; n = int(len(a) / sr * fps) + 1
r = [float(np.sqrt(np.mean(a[i*hop:(i+1)*hop] ** 2))) if a[i*hop:(i+1)*hop].size else 0.0 for i in range(n)]
m = max(r) or 1.0
json.dump({"fps": fps, "dur": len(a) / sr, "lines": json.load(open(os.path.join(d, "audio/lines.json"))),
           "mouth": [round(min(1, x / m * 1.6), 3) for x in r]}, open(os.path.join(d, "tl.json"), "w"))
print("frames", n, "duration", round(len(a) / sr, 2))
