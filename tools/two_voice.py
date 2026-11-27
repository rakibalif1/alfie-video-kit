# Multi-voice voiceover for /stick-figure. In a reel folder, lines.txt has one sentence per line: "N: text" or "P: text".
# Writes script.json, audio/vo.wav, audio/lines.json. Voices: edit VOICES or put voices.json in the reel folder.
import json, os, re, shutil, subprocess, tempfile
import numpy as np, soundfile as sf
from kokoro_onnx import Kokoro, EspeakConfig
import espeakng_loader
MODELS = os.path.join(os.environ.get("ALFIE_HOME", os.path.expanduser("~/.alfie")), "models")
VOICES = {"N": ["bm_lewis", 0.95, "en-gb"], "A": ["am_michael", 1.08, "en-us"], "C": ["af_heart", 1.1, "en-us"], "V": ["af_bella", 1.05, "en-us"], "R": ["bf_isabella", 1.0, "en-gb"], "S": ["af_nicole", 1.05, "en-us"]}  # N narrator, A Alfie, V/R/S/C extras (override in episode.json "voices"): voice, speed, language
if os.path.exists("voices.json"): VOICES.update(json.load(open("voices.json")))
data = espeakng_loader.get_data_path()
if len(data) > 100:
    short = os.path.join(tempfile.gettempdir(), "kokoro-espeak-ng-data")
    if not os.path.exists(os.path.join(short, "phontab")): shutil.rmtree(short, ignore_errors=True); shutil.copytree(data, short)
    data = short
EMO = {"calm": (1.0, 0.0, 1.0), "excited": (1.1, 1.5, 1.1), "panic": (1.2, 2.5, 1.15), "sad": (0.88, -1.0, 0.9), "angry": (1.08, -1.5, 1.2), "cheer": (1.12, 2.0, 1.15), "worried": (1.08, 1.0, 1.0), "sly": (0.92, -0.5, 0.95), "story": (0.93, -1.0, 1.0), "hush": (0.86, -2.0, 0.85), "ghostly": (0.9, -1.5, 0.9), "old": (0.93, -3.0, 1.0), "dread": (0.84, -2.5, 0.88)}
ECHO = {"ghostly"}  # speed x, pitch semitones, gain
def fx(s, sr, semis, gain, echo=False):
    flt = []
    if abs(semis) > 0.05:   # pitch shift that keeps the duration (ffmpeg resample + tempo trick)
        r = 2 ** (semis / 12); flt.append(f"asetrate={sr * r:.1f},aresample={sr},atempo={1 / r:.5f}")
    if echo: flt.append("aecho=0.8:0.6:90|180:0.35|0.2")
    if flt:
        p = subprocess.run(["ffmpeg", "-v", "error", "-f", "f32le", "-ar", str(sr), "-ac", "1", "-i", "-", "-af", ",".join(flt), "-f", "f32le", "-"], input=s.astype(np.float32).tobytes(), capture_output=True)
        if p.returncode == 0 and p.stdout: s = np.frombuffer(p.stdout, dtype=np.float32)
    return np.clip(s * gain, -1, 1)
cfg = EspeakConfig(lib_path=espeakng_loader.get_library_path(), data_path=data)
k = Kokoro(MODELS + "/kokoro-v1.0.onnx", MODELS + "/voices-v1.0.bin", espeak_config=cfg)
os.makedirs("audio", exist_ok=True); out, meta, t, sr = [], [], 0.0, 24000
for i, raw in enumerate(l.strip() for l in open("lines.txt") if l.strip()):
    m = re.match(r"^([A-Z]{1,4})(?:\[(\w+)\])?(?:\{([\d.]+)\})?:\s*(.+)$", raw); who, emo, pause, text = (m.group(1), m.group(2) or "calm", float(m.group(3) or 0), m.group(4)) if m else ("N", "calm", 0.0, raw)
    v = VOICES[who] + ["en-us"]; e = EMO.get(emo, EMO["calm"]); s, sr = k.create(text, voice=v[0], speed=v[1] * e[0], lang=v[2]); s = fx(s, sr, e[1], e[2], emo in ECHO)
    idx = np.where(np.abs(s) > 0.01)[0]; s = s[max(0, idx[0] - 480): idx[-1] + 1200]
    gap = 0.12 + (0.12 if text.endswith(("?", "!")) else 0) + (0.10 if meta and meta[-1]["who"] != who else 0) + pause
    meta.append({"i": i, "who": who, "text": text, "start": round(t, 3), "dur": round(len(s) / sr, 3)})
    out += [s, np.zeros(int(gap * sr), dtype=s.dtype)]; t += len(s) / sr + gap
sf.write("audio/vo.wav", np.concatenate(out), sr)
json.dump([m["text"] for m in meta], open("script.json", "w"), indent=1); json.dump(meta, open("audio/lines.json", "w"), indent=1)
print(len(meta), "lines", round(t, 1), "s, voices", sorted({m["who"] for m in meta}))
