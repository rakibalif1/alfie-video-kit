# Synthesised ambient sound bed (no samples, no keys): python ambience.py scenes.json out.wav
# Layers: drone, wind, crickets, frogs, rain, thunder, fire crackle, heartbeat, bamboo knocks, dawn birds. Levels per scene are set in CUES.
import json, sys, numpy as np, soundfile as sf
SR = 24000; sc = json.load(open(sys.argv[1])); DUR = sc["DUR"]; S = sc["SC"]; n = int(DUR * SR); rng = np.random.default_rng(7); t = np.arange(n) / SR
def bandnoise(lo, hi):
    f = np.fft.rfft(rng.standard_normal(n)); fr = np.fft.rfftfreq(n, 1 / SR); f[(fr < lo) | (fr > hi)] = 0
    x = np.fft.irfft(f, n); return x / (np.abs(x).max() + 1e-9)
def smooth(x, sec):
    k = max(1, int(sec * SR)); c = np.cumsum(np.insert(x, 0, 0)); return (c[k:] - c[:-k]) / k if False else np.convolve(x, np.ones(k) / k, mode="same")
def env_from(cues):   # per-layer level over time, interpolated between scene midpoints
    xs, ys = [0], [cues.get("intro", 0)]
    for name, v in S.items(): xs.append((v["t0"] + v["t1"]) / 2); ys.append(cues.get(name, 0))
    xs.append(DUR); ys.append(cues.get("outro", 0)); return np.interp(t, xs, ys)
CUES = {  # scene: level 0..1
 "drone":   dict(intro=.5, dusk=.25, road=.3, watchman=.25, bamboo=.35, pond=.5, room=.4, dark=.65, dawn=.2, outro=.3),
 "wind":    dict(intro=.25, dusk=.15, road=.3, watchman=.25, bamboo=.6, pond=.25, room=.45, dark=.15, dawn=.2, outro=.15),
 "crickets":dict(intro=.4, dusk=.55, road=.45, watchman=.25, bamboo=.12, pond=.15, room=0, dark=0, dawn=.1, outro=0),
 "frogs":   dict(intro=.3, dusk=.7, road=.6, watchman=.4, bamboo=.2, pond=.55, room=.1, dark=0, dawn=0, outro=0),
 "rain":    dict(intro=0, dusk=0, road=.05, watchman=.1, bamboo=.1, pond=.1, room=.85, dark=.55, dawn=.05, outro=0),
 "fire":    dict(watchman=.55),
 "heart":   dict(room=.15, dark=.7, dawn=.0),
 "knock":   dict(bamboo=.6),
 "birds":   dict(dawn=.5, outro=.4),
}
if len(sys.argv) > 3:   # optional cue file: {"cues": {layer: {scene: level}}, "events": [[type, scene, fraction], ...]}
    _c = json.load(open(sys.argv[3])); CUES.update({k: v for k, v in _c.get("cues", {}).items()}); EVENTS = _c.get("events", [])
else: EVENTS = []
mix = np.zeros(n)
# drone: low unsettling cluster with slow beating
d = sum(np.sin(2 * np.pi * f * t + ph) * a for f, ph, a in [(55, 0, 1), (55.7, 1, .8), (82.4, 2, .5), (58.3, 3, .35), (110.5, 4, .25)])
mix += .30 * env_from(CUES["drone"]) * d / 3 * (0.75 + 0.25 * np.sin(2 * np.pi * t / 9))
# wind with gusts
w = bandnoise(120, 900); gust = 0.5 + 0.5 * np.sin(2 * np.pi * t / 11 + 1) * np.sin(2 * np.pi * t / 7); mix += .55 * env_from(CUES["wind"]) * w * (0.3 + 0.7 * gust)
# rain
r = bandnoise(1800, 9000); mix += .35 * env_from(CUES["rain"]) * r * (0.8 + 0.2 * bandnoise(0.1, 2)[:n])
# crickets: chirps of 3 pulses
cr = np.zeros(n)
for v in range(7):
    f0 = 4100 + v * 130; period = 0.55 + v * 0.07; ph = rng.random() * period
    chirp = ((t + ph) % period) < 0.18; pulse = (np.sin(2 * np.pi * 30 * (t + ph)) > 0.2)
    cr += np.sin(2 * np.pi * f0 * t) * (chirp & pulse) * 0.5
mix += .12 * env_from(CUES["crickets"]) * cr
# frogs: random croak bursts
fg = np.zeros(n)
for _ in range(int(DUR * 5)):
    s0 = rng.integers(0, n - SR); L = int(SR * (0.12 + rng.random() * 0.25)); f = 220 + rng.random() * 260
    tt = np.arange(L) / SR; seg = np.sin(2 * np.pi * f * tt) * (np.sin(2 * np.pi * 26 * tt) > 0) * np.hanning(L); fg[s0:s0 + L] += seg
mix += .16 * env_from(CUES["frogs"]) * fg
# thunder in the room scene and once in the dark
th = np.zeros(n)
for name, off in [("room", .35), ("room", .8), ("dark", .15)]:
    if name not in S: continue
    s0 = int((S[name]["t0"] + off * (S[name]["t1"] - S[name]["t0"])) * SR); L = int(SR * 3.5); e = np.exp(-np.arange(L) / (SR * 0.9)) * np.minimum(1, np.arange(L) / (SR * .12))
    th[s0:s0 + L] += bandnoise(30, 140)[:L] * e * 1.6
mix += .5 * th
# fire crackle
fc = np.zeros(n)
for _ in range(int(DUR * 14)):
    s0 = rng.integers(0, n - 400); L = int(rng.integers(60, 300)); fc[s0:s0 + L] += rng.standard_normal(L) * np.exp(-np.arange(L) / (L / 4)) * rng.random()
mix += .35 * env_from(CUES["fire"]) * fc
# heartbeat: thump-thump, rate rises in the dark
hb = np.zeros(n); _hs = [k for k, v in CUES["heart"].items() if v > 0 and k in S] or ["room"]; _hs = [k for k in _hs if k in S]; hb0 = S[_hs[0]]["t0"] if _hs else DUR + 1; hb1 = S[_hs[-1]]["t1"] if _hs else DUR + 2; tcur = hb0; bpm = 58
while tcur < DUR:
    for off, a in [(0, 1.0), (0.22, 0.7)]:
        s0 = int((tcur + off) * SR); L = int(SR * 0.22)
        if s0 + L < n: tt = np.arange(L) / SR; hb[s0:s0 + L] += np.sin(2 * np.pi * 58 * tt) * np.exp(-tt * 18) * a
    frac = np.clip((tcur - hb0) / max(1, (hb1 - hb0)), 0, 1); tcur += 60 / (bpm + 22 * frac)
mix += .65 * env_from(CUES["heart"]) * hb
# bamboo knocks
kb = np.zeros(n)
for _ in range(int(DUR * 0.9)):
    s0 = rng.integers(0, n - SR // 2); L = int(SR * 0.3); tt = np.arange(L) / SR; kb[s0:s0 + L] += (np.sin(2 * np.pi * (170 + rng.random() * 60) * tt) + 0.4 * rng.standard_normal(L)) * np.exp(-tt * 22) * (0.4 + rng.random() * 0.6)
mix += .30 * env_from(CUES["knock"]) * kb
# dawn birds
bd = np.zeros(n)
for _ in range(int(DUR * 1.2)):
    s0 = rng.integers(0, n - SR); L = int(SR * (0.08 + rng.random() * 0.12)); tt = np.arange(L) / SR; f = 2400 + rng.random() * 1400
    bd[s0:s0 + L] += np.sin(2 * np.pi * (f + 900 * tt / (L / SR)) * tt) * np.hanning(L)
mix += .10 * env_from(CUES["birds"]) * bd
# tunnel howl, telegraph clicks, bell strikes, passing trains (cue-file layers)
if "howl" in CUES:
    hw = bandnoise(90, 420) * (0.5 + 0.5 * np.sin(2 * np.pi * t / 6.5)) + 0.5 * np.sin(2 * np.pi * (170 + 25 * np.sin(2 * np.pi * t / 9)) * t) * (0.5 + 0.5 * np.sin(2 * np.pi * t / 13 + 1))
    mix += .5 * env_from(CUES["howl"]) * hw
if "telegraph" in CUES:
    tg = np.zeros(n)
    for _ in range(int(DUR * 0.5)):
        s0 = rng.integers(0, n - SR); k = int(rng.integers(3, 9))
        for j in range(k): p = s0 + int(j * SR * 0.07 * (0.6 + rng.random())); tg[p:p + 90] += np.sin(2 * np.pi * 1500 * np.arange(90) / SR) * np.exp(-np.arange(90) / 25)
    mix += .35 * env_from(CUES["telegraph"]) * tg
for typ, sc_name, frac in EVENTS:
    s0 = int((S[sc_name]["t0"] + frac * (S[sc_name]["t1"] - S[sc_name]["t0"])) * SR)
    if typ == "bell":
        L = int(SR * 4); tt = np.arange(L) / SR; b = (np.sin(2 * np.pi * 1180 * tt) + 0.6 * np.sin(2 * np.pi * 1910 * tt) + 0.3 * np.sin(2 * np.pi * 2870 * tt)) * np.exp(-tt * 1.3) * np.minimum(1, tt * 400)
        if s0 + L < n: mix[s0:s0 + L] += 0.55 * b
    if typ in ("train", "trainfar"):
        L = int(SR * 9); tt = np.arange(L) / SR; amp = (np.sin(np.pi * tt / 9) ** 2) * (0.25 if typ == "trainfar" else 1.0)
        rumble = bandnoise(30, 160)[:L] * amp * 1.2; chug = (np.sin(2 * np.pi * (3 + 2 * tt / 9) * tt) > 0.7) * bandnoise(60, 700)[:L] * amp * 0.9
        clack = (np.sin(2 * np.pi * (6 + 3 * tt / 9) * tt) > 0.96) * bandnoise(800, 3500)[:L] * amp * 0.8; whistle = np.sin(2 * np.pi * (780 + 90 * np.sin(tt * 2)) * tt) * (tt > 3) * (tt < 6.5) * amp * 0.35
        if s0 + L < n: mix[s0:s0 + L] += 0.6 * (rumble + chug + clack + whistle)
# fade in/out, normalise
mix *= np.minimum(1, t / 2.0) * np.minimum(1, (DUR - t) / 2.5); mix = mix / (np.abs(mix).max() + 1e-9) * 0.6
sf.write(sys.argv[2], mix.astype(np.float32), SR); print("ambience", round(DUR, 1), "s ->", sys.argv[2])
