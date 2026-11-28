# Dramatic narration for ghost stories: run in an episode folder that holds episode.json (and voices.json).
# Differences from two_voice.py: slower base pace, clause-level phrasing, pauses that follow punctuation and story weight,
# long hangs around short punchy lines, a longer breath at each new scene, and a warm "storyteller" audio chain.
# Writes audio/vo.wav + audio/lines.json (same format as two_voice.py, so timing.py and the scene page work unchanged).
import json, os, re, shutil, subprocess, tempfile
import numpy as np, soundfile as sf
from kokoro_onnx import Kokoro, EspeakConfig
import espeakng_loader
MODELS = os.path.join(os.environ.get("ALFIE_HOME", os.path.expanduser("~/.alfie")), "models")
ep = json.load(open("episode.json")); VOICES = ep.get("voices", {})
# speed multiplier, pitch semitones, gain, gap-after (seconds) for each emotion tag
EMO = {"calm": (0.90, 0.0, 1.0, 0.55), "story": (0.86, -0.8, 1.0, 0.65), "hush": (0.80, -1.8, 0.88, 0.80), "dread": (0.76, -2.4, 0.9, 1.00),
       "ghostly": (0.82, -1.5, 0.9, 1.20), "sad": (0.82, -1.2, 0.9, 0.85), "old": (0.88, -3.0, 1.0, 0.65), "worried": (0.92, 0.6, 1.0, 0.55),
       "angry": (0.95, -1.0, 1.1, 0.6), "panic": (1.0, 1.5, 1.1, 0.5)}
ECHO = {"ghostly"}
EMO.update({k: tuple(v) for k, v in ep.get("emo", {}).items()})            # episode.json "emo" overrides/adds presets
PACE = {"scene_lead": 1.1, "short_gap": 0.55, "short_lead": 0.35, "q_gap": 0.25, "ell_gap": 0.3}; PACE.update(ep.get("pace", {}))
PUNCT = {",": 0.30, ";": 0.50, ":": 0.50, "—": 0.50, "-": 0.40, "...": 0.80, "…": 0.80}   # pause after a clause ending in this
data = espeakng_loader.get_data_path()
if len(data) > 100:
    short = os.path.join(tempfile.gettempdir(), "kokoro-espeak-ng-data")
    if not os.path.exists(os.path.join(short, "phontab")): shutil.rmtree(short, ignore_errors=True); shutil.copytree(data, short)
    data = short
k = Kokoro(MODELS + "/kokoro-v1.0.onnx", MODELS + "/voices-v1.0.bin", espeak_config=EspeakConfig(lib_path=espeakng_loader.get_library_path(), data_path=data))
SR = 24000

def fx(s, semis, gain, echo):
    flt = []
    if abs(semis) > 0.05:
        r = 2 ** (semis / 12); flt.append(f"asetrate={SR * r:.1f},aresample={SR},atempo={1 / r:.5f}")
    if echo: flt.append("aecho=0.8:0.6:90|180:0.35|0.2")
    if flt:
        p = subprocess.run(["ffmpeg", "-v", "error", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-", "-af", ",".join(flt), "-f", "f32le", "-"], input=s.astype(np.float32).tobytes(), capture_output=True)
        if p.returncode == 0 and p.stdout: s = np.frombuffer(p.stdout, dtype=np.float32)
    return np.clip(s * gain, -1, 1)

def trim(s):
    idx = np.where(np.abs(s) > 0.008)[0]
    return s[max(0, idx[0] - 300): idx[-1] + 900] if len(idx) else s

def clauses(text):
    """Split into phrases at ellipses, semicolons, colons, dashes and (when long) commas. Returns [(phrase, pause_after)]."""
    parts = re.findall(r"[^,;:—…]+(?:\.\.\.|[,;:—…])?\s*", text) or [text]
    out, cur = [], ""
    for p in parts:
        cur += p
        end = next((m for m in ("...", "…", ";", ":", "—", ",") if cur.rstrip().endswith(m)), None)
        words = len(cur.split())
        if end in ("...", "…", ";", ":", "—") or (end == "," and words >= 6):
            out.append((cur.strip(), PUNCT[end])); cur = ""
    if cur.strip(): out.append((cur.strip(), 0.0))
    return out

GS = float(os.environ.get("GAPSCALE", "1.0"))   # scales every pause: 0.8 = tighter, 1.2 = slower
os.makedirs("audio/cache", exist_ok=True)
lines = ep["lines"]; wav, meta, t, prev_scene = [], [], 0.0, None
for i, l in enumerate(lines):
    who, emo, text = l["who"], l.get("emotion") or "calm", l["text"]
    v = VOICES[who]; e = EMO.get(emo, EMO["calm"]); words = len(text.split()); speak = l.get("say", text); pitch = e[1] + (v[3] if len(v) > 3 else 0)
    ck = "audio/cache/%d_%08x.npy" % (i, int(__import__("hashlib").md5(repr((speak, v[0], v[1], emo, pitch)).encode()).hexdigest()[:8], 16))
    if os.path.exists(ck): s = np.load(ck)
    else:
        segs = []
        for ph, pause in clauses(speak):
            s, _ = k.create(ph, voice=v[0], speed=v[1] * e[0], lang=v[2] if len(v) > 2 else "en-gb")
            segs += [trim(s), np.zeros(int(pause * GS * SR), dtype=np.float32)]
        s = fx(np.concatenate(segs[:-1]) if len(segs) > 1 else segs[0], pitch, e[2], emo in ECHO); np.save(ck, s)
    gap = e[3] + (PACE["q_gap"] if text.rstrip().endswith("?") else 0) + (PACE["short_gap"] if words <= 6 else 0) + (PACE["ell_gap"] if text.rstrip().endswith("...") else 0)
    gap = (gap + float(l.get("pause", 0))) * GS
    lead = 0.0
    if l["scene"] != prev_scene and i: lead += PACE["scene_lead"]                       # a breath as the scene changes
    if words <= 6 and i and lines[i - 1]["scene"] == l["scene"]: lead += PACE["short_lead"]   # short line: let the last one land first
    lead *= GS
    if lead: wav.append(np.zeros(int(lead * SR), dtype=np.float32)); t += lead
    meta.append({"i": i, "who": who, "text": text, "start": round(t, 3), "dur": round(len(s) / SR, 3)})
    wav += [s, np.zeros(int(gap * SR), dtype=np.float32)]; t += len(s) / SR + gap; prev_scene = l["scene"]
    if i % 20 == 0: print(i, round(t, 1), flush=True)
raw = np.concatenate(wav); os.makedirs("audio", exist_ok=True)
sf.write("audio/_raw.wav", raw, SR)
# storyteller chain: low rumble out, warm body, clear presence, gentle de-ess, even level, a hint of room
CHAIN0 = "highpass=f=70,equalizer=f=180:t=q:w=1:g=2.5,equalizer=f=3200:t=q:w=1.2:g=1.8,deesser=i=0.35,acompressor=threshold=-22dB:ratio=3:attack=15:release=250:makeup=4,aecho=0.9:0.55:38|85:0.10|0.06,alimiter=limit=0.95"
CHAIN = ep.get("chain", CHAIN0)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", "audio/_raw.wav", "-af", CHAIN, "-ar", "44100", "-ac", "1", "-c:a", "pcm_s16le", "audio/vo.wav"], check=True)
os.remove("audio/_raw.wav")
json.dump(meta, open("audio/lines.json", "w"), indent=1)
print(len(meta), "lines", round(t, 1), "s")
