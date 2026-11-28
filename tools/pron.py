# Pronunciation fixes for Kokoro. Use: from pron import say_text; say = say_text(text).
# Verified by synthesising with Kokoro and transcribing with faster-whisper (see projects/illus/research/PRON_NOTES.md).
import json, os, re
_M = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "pron_map.json")))
def say_text(t):
    t = re.sub(r"\bU\.K\.", "UK", t)                      # "U.K." is read as "you, Kay" with a pause: normalise first
    while True:                                            # G-P, N-H-S, H-M-R-C, B-R-P -> spaced capital letters
        n = re.sub(r"\b([A-Z])-(?=[A-Z](?:-|\b))", lambda m: m.group(1) + " ", t)
        if n == t: break
        t = n
    for k in sorted(_M, key=len, reverse=True):
        if _M[k] != k: t = re.sub(r"(?<![A-Za-z])" + re.escape(k) + r"(?![A-Za-z])", _M[k].replace("\\", "\\\\"), t)
    return t
