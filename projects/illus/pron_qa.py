#!/usr/bin/env python3
"""Pronunciation QA for Kokoro (bf_isabella, en-gb) using faster-whisper as an approximate listener.

Two phases because the two libraries live in different venvs:
  synth  (run with /tmp/alfie-test/venv/bin/python)       -> wavs in out/pron_wav/ + out/pron_cases.json
  score  (run with /home/user/illus2-job/venv/bin/python) -> out/pron_results.json, pron_map.json
  run    (either python) runs: synth, score, ctx-synth, ctx-score, then writes pron_map.json + PRON_REPORT data.
Usage:  python3 pron_qa.py run [word ...]      (no words = everything)
Candidates are ("label", "text"|"ipa", value). "ipa" values replace only the target word; the carrier sentence is
phonemised by espeak and the IPA is spliced in, then sent to Kokoro with is_phonemes=True.
"""
import json, os, re, subprocess, sys, hashlib
HERE = os.path.dirname(os.path.abspath(__file__))
WAV = os.path.join(HERE, "pron_wav"); os.makedirs(WAV, exist_ok=True)
KPY = "/tmp/alfie-test/venv/bin/python"; WPY = "/home/user/illus2-job/venv/bin/python"
NEUTRAL = "Then they said {W}, and left."      # neutral carrier: gives Whisper no topical hint
VOICE, LANG = "bf_isabella", "en-gb"

def T(*xs): return [(x, "text", x) for x in xs]
def I(**kw): return [(k, "ipa", v) for k, v in kw.items()]
# word -> (context carrier, regex Whisper must produce (after normalisation), candidates)
W = {
 "UK":        ("Get a bank account in the {W}.", r"\buk\b", T("UK", "U.K.", "U K", "you kay", "U-K") + I(ipa_a="jˌuːkˈeɪ", ipa_b="jˈuːkˈeɪ", ipa_c="jˈuː kˈeɪ")),
 "SIM":       ("Buy a cheap {W} online.", r"\bsim\b", T("SIM", "Sim", "sim", "simm", "S.I.M.") + I(ipa_a="sˈɪm", ipa_b="sɪm")),
 "SIM card":  ("Please buy a {W} today.", r"\bsim cards?\b", T("SIM card", "Sim card", "sim card", "simm card") + I(ipa_a="sˈɪm kˈɑːd", ipa_b="sˈɪm kˈɑːdz")),
 "GP":        ("Book an appointment with your {W}.", r"\bgp\b", T("GP", "G P", "G.P.", "gee pee", "G-P") + I(ipa_a="ʤˌiːpˈiː", ipa_b="ʤˈiː pˈiː")),
 "NHS":       ("Call the {W} for free advice.", r"\bnhs\b", T("NHS", "N H S", "N.H.S.", "en aitch ess", "N-H-S") + I(ipa_a="ˌɛnˌeɪʧˈɛs")),
 "HMRC":      ("Log in to {W} online.", r"\bhmrc\b", T("HMRC", "H M R C", "H.M.R.C.", "aitch em are see", "H-M-R-C") + I(ipa_a="ˌeɪʧˌɛmˌɑːsˈiː")),
 "GOV.UK":    ("Check the rules on {W} first.", r"\bgov ?(dot )?uk\b", T("GOV.UK", "gov dot U K", "gov dot UK", "gov dot you kay", "Gov U K") + I(ipa_a="ɡˈʌv dˈɒt jˌuːkˈeɪ", ipa_b="ɡˈɒv dˈɒt jˌuːkˈeɪ")),
 "NI number": ("You will need an {W} to work.", r"\bni numbers?\b", T("NI number", "N I number", "N.I. number", "en eye number", "N-I number") + I(ipa_a="ˌɛnˈaɪ nˈʌmbɐ")),
 "BRP":       ("Show your {W} at the door.", r"\bbrp\b", T("BRP", "B R P", "B.R.P.", "bee are pee", "B-R-P") + I(ipa_a="bˌiːˌɑːpˈiː")),
 "UKVI":      ("Contact {W} about your visa.", r"\bukvi\b", T("UKVI", "U K V I", "U.K.V.I.", "you kay vee eye", "U-K-V-I") + I(ipa_a="jˌuːkˌeɪvˌiːˈaɪ")),
 "eVisa":     ("Check your {W} online.", r"\b(e|ee) ?visa\b", T("eVisa", "ee Visa", "e-Visa", "E visa", "ee vee za") + I(ipa_a="ˈiːvˌiːzɐ", ipa_b="ˈiː vˈiːzɐ")),
 "CV":        ("Send your {W} today.", r"\bcv\b", T("CV", "C V", "C.V.", "see vee", "C-V") + I(ipa_a="sˌiːvˈiː")),
 "SIA":       ("You need an {W} licence.", r"\bsia\b", T("SIA", "S I A", "S.I.A.", "ess eye ay", "S-I-A") + I(ipa_a="ˌɛsˌaɪˈeɪ")),
 "LinkedIn":  ("Update your {W} profile.", r"\blinked ?in\b", T("LinkedIn", "Linked In", "Linkedin", "Linkt In", "Linked-In") + I(ipa_a="lˈɪŋkt ɪn", ipa_b="lˈɪŋktɪn")),
 "Indeed":    ("Look for jobs on {W}.", r"\bindeed\b", T("Indeed", "In deed", "in-deed") + I(ipa_a="ɪndˈiːd")),
 "Reed":      ("Look for jobs on {W}.", r"\breed\b", T("Reed", "Reed.", "Read", "Reed jobs") + I(ipa_a="ɹˈiːd")),
 "Tesco":     ("Buy it at {W}.", r"\btesco\b", T("Tesco", "Tess co", "Tes co", "Tessko") + I(ipa_a="tˈɛskəʊ", ipa_b="tˈɛskoʊ")),
 "Greggs":    ("Buy lunch at {W}.", r"\b(greggs|gregs|greg s)\b", T("Greggs", "Gregs", "Greg's", "Greggz") + I(ipa_a="ɡɹˈɛɡz")),
 "Lebara":    ("Choose a plan from {W}.", r"\b(lebara|lebarra|libara)\b", T("Lebara", "Le bara", "Leh bar ah", "Lebarah", "Lay bara") + I(ipa_a="lɪbˈɑːɹɐ", ipa_b="lɛbˈɑːɹɐ")),
 "Lyca":      ("Choose a plan from {W}.", r"\b(lyca|lyka|lycamobile|lica|lika|laika)\b", T("Lyca", "Lie ka", "Lye ka", "Lyka", "Lyca Mobile") + I(ipa_a="lˈaɪkɐ")),
 "giffgaff":  ("Choose a plan from {W}.", r"\b(giff ?gaff|gif ?gaff|gift ?gaff)\b", T("giffgaff", "giff gaff", "gif gaff", "Giffgaff") + I(ipa_a="ɡˈɪfɡˌaf", ipa_b="ɡˈɪf ɡˈaf")),
 "Voxi":      ("Choose a plan from {W}.", r"\b(voxi|voxy|voxie|vocsi|voksi)\b", T("Voxi", "Vox ee", "Vox-ee", "Voxy") + I(ipa_a="vˈɒksi")),
 "Monzo":     ("Open an account with {W}.", r"\bmonzo\b", T("Monzo", "Mon zo", "Mon-zo", "Monzoh") + I(ipa_a="mˈɒnzəʊ")),
 "Dhaka":     ("My cousin flew from {W}.", r"\b(dhaka|dakha|dacca|daka|dakka|dhakka)\b", T("Dhaka", "Dah ka", "Dakka", "Dacca") + I(ipa_a="dˈɑːkɐ", ipa_b="dˈakɐ")),
 "Accra":     ("My cousin flew from {W}.", r"\b(accra|acra|akra|ankara)\b", T("Accra", "Uh krah", "A cra", "Ah crah") + I(ipa_a="ɐkɹˈɑː", ipa_b="ˈakɹɐ")),
 "Kathmandu": ("My cousin flew from {W}.", r"\b(kathmandu|katmandu|kathmando)\b", T("Kathmandu", "Kat man doo", "Kath man doo", "Cat man do") + I(ipa_a="kˌatmandˈuː", ipa_b="kˌɑːtmɑːndˈuː")),
 "Colombo":   ("My cousin flew from {W}.", r"\b(colombo|columbo|kolombo|colombo's)\b", T("Colombo", "Kuh lum bo", "Co lom bo", "Colum bo") + I(ipa_a="kɐlˈʌmbəʊ", ipa_b="kɐlˈɒmbəʊ")),
 "Karachi":   ("My cousin flew from {W}.", r"\b(karachi|karatchi|karaci|kurachi)\b", T("Karachi", "Kuh rah chee", "Ka rah chi", "Karahchi") + I(ipa_a="kɐɹˈɑːʧi", ipa_b="kɐɹˈɑːʧiː")),
 "Lagos":     ("My cousin flew from {W}.", r"\blagos\b", T("Lagos", "Lay goss", "Lay gos", "Lah gos") + I(ipa_a="lˈeɪɡɒs")),
 "Delhi":     ("My cousin flew from {W}.", r"\b(delhi|dehli|dilli|delly|deli)\b", T("Delhi", "Del ee", "Dell ee", "Dilli") + I(ipa_a="dˈɛli")),
 "Ofcom":     ("Complain to {W} about it.", r"\b(ofcom|of com|off com)\b", T("Ofcom", "Of com", "Off com", "Off-com") + I(ipa_a="ˈɒfkɒm", ipa_b="ˈɒf kɒm")),
 "Citizens Advice": ("Ask {W} for free help.", r"\bcitizens advice\b", T("Citizens Advice", "Citizens advise", "Citizens Ad vice") + I(ipa_a="sˈɪtɪzənz ɐdvˈaɪs")),
 "Healthwatch": ("Tell {W} about your visit.", r"\b(healthwatch|health watch)\b", T("Healthwatch", "Health watch", "Health-watch", "Helth watch") + I(ipa_a="hˈɛlθwɒʧ")),
 "TfL":       ("Check {W} before you travel.", r"\btfl\b", T("TfL", "T F L", "T.F.L.", "tee eff ell", "Transport for London") + I(ipa_a="tˌiːˌɛfˈɛl")),
}
# Context experiment: the same target in different sentence positions / with a comma / at lower speed.
CTX_WORDS = ["UK", "SIM", "GP", "NHS"]
CTX_FRAMES = {"end": "Get a bank account in the {W}.", "end_comma": "Get a bank account, in the {W}.", "mid": "The {W} is a big place to live.",
              "clause_end": "In the {W}, you need a bank account.", "comma_before": "Rules vary, {W}, by region.", "start": "{W} is a big place to live."}
CTX_SPEEDS = [1.0, 0.9, 0.8]

def norm(s):
    s = s.lower().replace("’", "'")
    s = re.sub(r"(?<=\w)\.(?=\w)", "", s)           # u.k -> uk, gov.uk -> govuk
    s = re.sub(r"(?<=\b[a-z])\.(?=\s|$)", "", s)    # trailing dot of an initial (u.k. -> uk)
    s = re.sub(r"[^a-z0-9']+", " ", s).replace("'", " ").strip()
    toks, out, run = s.split(), [], []
    for t in toks + [""]:                           # collapse runs of 2+ single letters ("u k" -> "uk"), keep "a"/"i" alone
        if len(t) == 1 and t.isalpha(): run.append(t); continue
        if len(run) >= 2: out.append("".join(run))
        else: out += run
        run = []
        if t: out.append(t)
    return " ".join(out)

# ------------------------------------------------------------------ synth (Kokoro venv)
def load_kokoro():
    import tempfile, shutil
    from kokoro_onnx import Kokoro, EspeakConfig
    import espeakng_loader
    M = "/tmp/alfie-test/models"; data = espeakng_loader.get_data_path()
    if len(data) > 100:
        short = os.path.join(tempfile.gettempdir(), "kokoro-espeak-ng-data")
        if not os.path.exists(os.path.join(short, "phontab")): shutil.rmtree(short, ignore_errors=True); shutil.copytree(data, short)
        data = short
    return Kokoro(M + "/kokoro-v1.0.onnx", M + "/voices-v1.0.bin", espeak_config=EspeakConfig(lib_path=espeakng_loader.get_library_path(), data_path=data))

def splice_ipa(k, carrier, ipa):
    """Phonemise the carrier around {W} with espeak and put the hand-written IPA in the gap."""
    pre, suf = carrier.split("{W}")
    pp = k.tokenizer.phonemize(pre, LANG).strip() if pre.strip() else ""
    sp = k.tokenizer.phonemize(suf, LANG).strip() if suf.strip() else ""
    return (pp + " " if pp else "") + ipa + ((" " if sp and sp[0] not in ",.;:!?" else "") + sp if sp else "")

def synth_case(k, carrier, kind, value, speed):
    key = hashlib.md5(repr((carrier, kind, value, speed, VOICE)).encode()).hexdigest()[:12]
    path = os.path.join(WAV, key + ".wav")
    if os.path.exists(path): return path, None
    import soundfile as sf
    if kind == "ipa":
        ph = splice_ipa(k, carrier, value); s, sr = k.create(ph, voice=VOICE, speed=speed, lang=LANG, is_phonemes=True)
    else:
        ph = k.tokenizer.phonemize(carrier.replace("{W}", value), LANG); s, sr = k.create(carrier.replace("{W}", value), voice=VOICE, speed=speed, lang=LANG)
    sf.write(path, s, sr); return path, ph

def synth_all(cases):
    k = load_kokoro()
    for i, c in enumerate(cases):
        if c["kind"] == "ipa":
            unk = [ch for ch in c["value"] if ch not in k.tokenizer.vocab and ch != " "]
            if unk: print("WARNING unknown IPA chars", c["word"], c["label"], unk, flush=True)
        c["wav"], c["phonemes"] = synth_case(k, c["carrier"], c["kind"], c["value"], c["speed"])
        if i % 20 == 0: print("synth", i, "/", len(cases), flush=True)
    return cases

# ------------------------------------------------------------------ score (whisper venv)
def load16k(path):
    import numpy as np
    r = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-f", "f32le", "-ac", "1", "-ar", "16000", "-"], capture_output=True, check=True)
    return np.frombuffer(r.stdout, dtype=np.float32)

def score_all(cases):
    from faster_whisper import WhisperModel
    m = WhisperModel("base.en", device="cpu", compute_type="int8", cpu_threads=2, download_root=os.path.join(HERE, "whisper_models"))
    for i, c in enumerate(cases):
        segs, _ = m.transcribe(load16k(c["wav"]), language="en", beam_size=5, word_timestamps=True, condition_on_previous_text=False, temperature=0.0)
        words = [w for s in segs for w in s.words]
        text = "".join(w.word for w in words).strip()
        c["heard"] = text; c["norm"] = norm(text); c["hit"] = bool(re.search(c["pattern"], c["norm"]))
        probs = [w.probability for w in words] or [0]
        c["mean_prob"] = round(sum(probs) / len(probs), 3); c["min_prob"] = round(min(probs), 3)
        c["dur"] = round(words[-1].end - words[0].start, 2) if words else 0
        if i % 20 == 0: print("score", i, "/", len(cases), flush=True)
    return cases

def build_cases(words):
    cases = []
    for w, (ctx, pat, cands) in W.items():
        if words and w not in words: continue
        for label, kind, val in cands:
            for cname, carrier in (("ctx", ctx), ("neutral", NEUTRAL)):
                cases.append(dict(set="main", word=w, label=label, kind=kind, value=val, carrier_name=cname, carrier=carrier, pattern=pat, speed=1.0))
    return cases

def build_ctx(best):
    cases = []
    for w in CTX_WORDS:
        ctx, pat, cands = W[w]; kind, val = best.get(w, ("text", w))
        for fname, fr in CTX_FRAMES.items():
            for sp in CTX_SPEEDS:
                cases.append(dict(set="ctx", word=w, label=fname, kind=kind, value=val, carrier_name=fname, carrier=fr, pattern=pat, speed=sp))
    return cases

def pick_best(res):
    """Per word: most hits over the two carriers, then mean Whisper confidence; text beats IPA on an exact tie only if within 0.02."""
    best, table = {}, {}
    for w in W:
        rows = [r for r in res if r["set"] == "main" and r["word"] == w]
        if not rows: continue
        g = {}
        for r in rows: g.setdefault((r["label"], r["kind"], r["value"]), []).append(r)
        sc = []
        for key, rs in g.items():
            hits = sum(r["hit"] for r in rs); mp = sum(r["mean_prob"] for r in rs) / len(rs)
            sc.append((hits + mp + (0.02 if key[1] == "text" else 0), hits, round(mp, 3), key, [r["heard"] for r in rs]))
        sc.sort(key=lambda x: -x[0]); table[w] = sc; best[w] = sc[0]
    return best, table

def main():
    cmd = sys.argv[1] if len(sys.argv) > 1 else "run"; args = sys.argv[2:]
    if cmd == "synth":   # internal: kokoro venv. cases json in/out
        cases = json.load(open(args[0])); json.dump(synth_all(cases), open(args[0], "w"), ensure_ascii=False, indent=1); return
    if cmd == "score":   # internal: whisper venv
        cases = json.load(open(args[0])); json.dump(score_all(cases), open(args[0], "w"), ensure_ascii=False, indent=1); return
    def pipeline(cases, name):
        p = os.path.join(HERE, name); json.dump(cases, open(p, "w"), ensure_ascii=False)
        subprocess.run([KPY, os.path.abspath(__file__), "synth", p], check=True)
        subprocess.run([WPY, os.path.abspath(__file__), "score", p], check=True)
        return json.load(open(p))
    main_res = pipeline(build_cases(args), "pron_results_main.json")
    best, table = pick_best(main_res)
    ctx_res = pipeline(build_ctx({w: (b[3][1], b[3][2]) for w, b in best.items()}), "pron_results_ctx.json")
    pm = {}
    for w, b in best.items():
        label, kind, val = b[3]; pm[w] = val if kind == "text" else "ipa:" + val
    json.dump(pm, open(os.path.join(HERE, "pron_map.json"), "w"), ensure_ascii=False, indent=1)
    with open(os.path.join(HERE, "pron_summary.txt"), "w") as f:
        for w, sc in table.items():
            f.write("== %s (best: %s)\n" % (w, sc[0][3][0]))
            for s in sc: f.write("  %-14s %-5s hits=%d conf=%.3f  heard=%s\n" % (s[3][0], s[3][1], s[1], s[2], " | ".join(s[4])))
        f.write("\n== CONTEXT/SPEED\n")
        for w in CTX_WORDS:
            for fname in CTX_FRAMES:
                row = [r for r in ctx_res if r["word"] == w and r["carrier_name"] == fname]
                f.write("  %-4s %-12s %s\n" % (w, fname, "  ".join("sp%.1f:%s/%.2f[%s]" % (r["speed"], "OK" if r["hit"] else "NO", r["mean_prob"], r["heard"]) for r in row)))
    print("done")

if __name__ == "__main__": main()
