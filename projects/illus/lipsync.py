#!/usr/bin/env python3
"""Mouth cues per line from real audio.
usage: lipsync.py vo.wav lines.json out.json [--fallback] [--threads N]
lines.json: {"lines":[{"who","text"(or "say"),"start","dur"}...]} (start/dur in seconds in vo.wav's timeline)
out.json:   {"tool":"rhubarb"|"amplitude","lines":[{"who","start","dur","cues":[{"t","shape","s"?}]}]}
t is seconds RELATIVE to the line start; shape is A..F (A closed, B small, C open, D wide, E round, F pucker);
s:1 marks a stressed (loud) onset: the rig nods the head and lifts brows there.
Rhubarb is run with --extendedShapes "" so only A-F are produced. Falls back to RMS-envelope visemes
if the binary is missing or --fallback is given."""
import json, os, subprocess, sys, tempfile, wave
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
RHUBARB = os.path.join(HERE, '..', 'tools', 'rhubarb', 'Rhubarb-Lip-Sync-1.14.0-Linux', 'rhubarb')
PAD = 0.15  # seconds of audio kept after each line


def read_wav(p):
    w = wave.open(p)
    sr, ch, sw = w.getframerate(), w.getnchannels(), w.getsampwidth()
    assert sw == 2, '16-bit wav expected'
    a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
    if ch > 1:
        a = a.reshape(-1, ch).mean(1)
    return a, sr


def write_wav(p, a, sr):
    w = wave.open(p, 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
    w.writeframes((np.clip(a, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()


def envelope(a, sr, hop=0.02):
    n = int(sr * hop)
    return np.array([np.sqrt((a[i:i + n] ** 2).mean() + 1e-12) for i in range(0, len(a) - n + 1, n)]), hop


def amplitude_cues(a, sr):
    """No-text fallback: loudness -> A/B/C/D, 0.07 s minimum hold."""
    e, hop = envelope(a, sr)
    m = e.max() or 1
    e = np.convolve(e / m, np.ones(3) / 3, 'same')
    cues, last, lt = [], None, -9
    for i, v in enumerate(e):
        sh = 'A' if v < 0.06 else 'B' if v < 0.2 else 'C' if v < 0.5 else 'D'
        t = i * hop
        if sh != last and t - lt >= 0.07:
            cues.append({'t': round(t, 3), 'shape': sh}); last, lt = sh, t
    return cues


def rhubarb_cues(a, sr, text, threads):
    with tempfile.TemporaryDirectory() as d:
        wp, tp, op = (os.path.join(d, n) for n in ('l.wav', 'd.txt', 'c.json'))
        write_wav(wp, a, sr); open(tp, 'w').write(text)
        subprocess.run([RHUBARB, '-q', '-f', 'json', '-d', tp, '--extendedShapes', '', '--threads', str(threads), '-o', op, wp],
                       check=True, stdout=subprocess.DEVNULL)
        mc = json.load(open(op))['mouthCues']
    return [{'t': round(c['start'], 3), 'shape': c['value']} for c in mc]


def mark_stress(cues, a, sr):
    e, hop = envelope(a, sr)
    if not len(e): return
    m = e.max(); s = np.convolve(e, np.ones(5) / 5, 'same'); last = -9
    for i in range(2, len(s) - 2):
        t = i * hop
        if s[i] > 0.6 * m and s[i] >= s[i - 1] and s[i] >= s[i + 1] and t - last > 0.5:
            last = t
            # attach to the latest open-ish cue at or before the peak (else nearest)
            cand = [c for c in cues if c['t'] <= t and c['shape'] in 'CDE']
            if cand: cand[-1]['s'] = 1


def main():
    args = [x for x in sys.argv[1:] if not x.startswith('--')]
    fb = '--fallback' in sys.argv
    threads = int(sys.argv[sys.argv.index('--threads') + 1]) if '--threads' in sys.argv else 1
    if '--threads' in sys.argv: args.remove(str(threads))
    wav, lines, out = args[:3]
    a, sr = read_wav(wav)
    data = json.load(open(lines)); L = data['lines'] if isinstance(data, dict) else data
    tool = 'amplitude' if fb or not os.path.exists(RHUBARB) else 'rhubarb'
    res = []
    for l in L:
        s0 = int(l['start'] * sr); s1 = min(len(a), int((l['start'] + l['dur'] + PAD) * sr))
        seg = a[s0:s1]
        cues = rhubarb_cues(seg, sr, l.get('say') or l['text'], threads) if tool == 'rhubarb' else amplitude_cues(seg, sr)
        mark_stress(cues, seg, sr)
        res.append({'who': l.get('who'), 'start': l['start'], 'dur': l['dur'], 'cues': cues})
    json.dump({'tool': tool, 'lines': res}, open(out, 'w'), indent=1)
    for r in res:
        print(r['who'], len(r['cues']), 'cues, shapes', ''.join(sorted({c['shape'] for c in r['cues']})), 'stress', sum(1 for c in r['cues'] if c.get('s')))


if __name__ == '__main__':
    main()
