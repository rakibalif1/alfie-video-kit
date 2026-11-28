# Synthesised light music bed + sound effects for pop-art explainers (no samples, no keys).
# usage: python popmusic.py scenes.json sfx.json out.wav [moods.json]
#   scenes.json: {"SC": {name: {t0,t1}}, "DUR": s}   sfx.json: [[name, time_s, vol], ...]   moods: {scene: "major"|"minor"|"hope"} default major
import json, sys, numpy as np, soundfile as sf
SR = 24000
sc = json.load(open(sys.argv[1])); DUR = sc["DUR"]; S = sc["SC"]; sfxl = json.load(open(sys.argv[2])); moods = json.load(open(sys.argv[4])) if len(sys.argv) > 4 else {}
n = int(DUR * SR); out = np.zeros(n, dtype=np.float32); rng = np.random.default_rng(3)
def add(buf, t, vol=1.0):
    i = int(t * SR);
    if i >= n or i < 0: return
    j = min(n, i + len(buf)); out[i:j] += (buf[:j - i] * vol).astype(np.float32)
def env(L, a=0.004, d=0.2): t = np.arange(L) / SR; return np.minimum(1, t / a) * np.exp(-t / d)
def tone(f, L, harm=(1, .5, .25), d=0.25, a=0.004):
    t = np.arange(int(L * SR)) / SR; y = sum(h * np.sin(2 * np.pi * f * (k + 1) * t) for k, h in enumerate(harm)); return y * env(len(t), a, d)
def noise(L, d=0.1): x = rng.standard_normal(int(L * SR)); return x * env(len(x), 0.002, d)
def lp(x, k): c = np.cumsum(np.insert(x, 0, 0)); k = max(1, int(k)); return (c[k:] - c[:-k]) / k if len(x) > k else x
NOTE = lambda m: 440 * 2 ** ((m - 69) / 12)
# ---- sound effects
def S_stamp(): return np.concatenate([tone(70, .32, (1, .6), .12), np.zeros(0)]) * 1.0 + np.pad(noise(.12, .05) * .6, (0, int(.2 * SR)))[:int(.32 * SR)]
def S_pop(): t = np.arange(int(.14 * SR)) / SR; return np.sin(2 * np.pi * (420 + 1600 * t) * t) * env(len(t), .002, .05) * .8
def S_ding(): return tone(1318, .9, (1, .35, .12), .35) * .7
def S_whoosh(): x = lp(noise(.45, .22), 6); return np.pad(x, (0, 0)) * 3
def S_swish(): x = lp(noise(.3, .12), 3); return x * 2
def S_cash(): return np.concatenate([tone(1760, .12, (1, .5), .06), tone(2349, .5, (1, .4), .22)]) * .6 + 0
def S_buzz(): t = np.arange(int(.45 * SR)) / SR; return np.sign(np.sin(2 * np.pi * 110 * t)) * env(len(t), .01, .4) * .35
def S_tick(): return noise(.03, .01) * .6
def S_chime(): return np.concatenate([tone(NOTE(72), .18, (1, .3), .15), tone(NOTE(76), .18, (1, .3), .15), tone(NOTE(79), .7, (1, .3), .35)]) * .6
def S_ring(): return np.concatenate([tone(880, .09, (1, .5), .2), np.zeros(int(.04 * SR)), tone(880, .09, (1, .5), .2), np.zeros(int(.3 * SR)), tone(880, .09, (1, .5), .2), np.zeros(int(.04 * SR)), tone(880, .09, (1, .5), .2)])
def S_coin(): return tone(1568, .35, (1, .4, .2), .12) * .6
def S_thud(): return tone(55, .4, (1, .5), .15) * 1.2
SFX = {"stamp": S_stamp, "pop": S_pop, "ding": S_ding, "whoosh": S_whoosh, "swish": S_swish, "cash": S_cash, "buzz": S_buzz, "tick": S_tick, "chime": S_chime, "ring": S_ring, "coin": S_coin, "thud": S_thud}
# ---- music bed: 100 bpm, 4-bar loops per mood
BPM = 100; B = 60 / BPM
PROG = {"major": [(48, [60, 64, 67]), (45, [57, 60, 64]), (41, [53, 57, 60]), (43, [55, 59, 62])], "hope": [(48, [60, 64, 67]), (43, [55, 59, 62]), (45, [57, 60, 64]), (41, [53, 57, 60])], "minor": [(45, [57, 60, 64]), (41, [53, 57, 60]), (38, [50, 53, 57]), (40, [52, 56, 59])]}
names = sorted(S, key=lambda k: S[k]["t0"])
for name in names:
    t0, t1 = S[name]["t0"], S[name]["t1"]; mood = moods.get(name, "major"); prog = PROG[mood]; vol = 0.55 if mood == "minor" else 0.8; t = t0; bar = 0
    while t < t1 - 0.2:
        root, chord = prog[bar % 4]
        add(tone(NOTE(root - 12), B * 1.9, (1, .3), .5), t, .5 * vol)                      # bass
        for k in range(8):                                                                  # arpeggio (marimba-ish)
            nt = chord[[0, 1, 2, 1, 0, 2, 1, 2][k] % 3] + (12 if k % 4 == 3 else 0)
            if mood == "minor" and k % 2: continue
            add(tone(NOTE(nt), B * .5, (1, .45, .2), .22), t + k * B / 2, .32 * vol)
        for k in range(4):
            if mood != "minor": add(S_thud() * .35, t + k * B, .5 * vol)
            if mood != "minor": add(noise(.05, .02) * .25, t + k * B + B / 2, vol)         # hat on the off-beat
        t += 2 * B; bar += 1
for nm, tt, v in sfxl:
    f = SFX.get(nm)
    if f: add(f().astype(np.float32), float(tt), float(v) * 0.55)
out = np.clip(out / (np.abs(out).max() + 1e-9) * 0.7, -1, 1)
sf.write(sys.argv[3], out, SR); print("music+sfx", round(DUR, 1), "s,", len(sfxl), "sfx ->", sys.argv[3])
