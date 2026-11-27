
// ===== captions: short chunks, timed inside each narrated line by character share =====
(function () {
  const caps = document.getElementById('caps');
  LINES.forEach((l) => {
    const raw = l.text.match(/[^,.;:!?…]+[,.;:!?…"]*\s*/g) || [l.text];
    const chunks = []; let cur = '';
    raw.forEach((p) => { cur += p; if (cur.split(/\s+/).filter(Boolean).length >= 5) { chunks.push(cur.trim()); cur = ''; } });
    if (cur.trim()) { if (chunks.length && cur.split(/\s+/).filter(Boolean).length < 3) chunks[chunks.length - 1] += ' ' + cur.trim(); else chunks.push(cur.trim()); }
    const total = chunks.reduce((a, b) => a + b.length, 0); let t = l.start + 0.05;
    chunks.forEach((ch) => {
      const d = (l.dur - 0.1) * (ch.length / total), e = mk(caps, 'cap ' + l.who, null, ch);
      tl.fromTo(e, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: Math.min(0.3, d * 0.4), ease: 'sine.out' }, t);
      tl.to(e, { opacity: 0, duration: Math.min(0.25, d * 0.3) }, t + d - Math.min(0.25, d * 0.3));
      t += d;
    });
  });
})();

// ===== grain jitter, scene fades, intro and outro =====
tl.to(document.getElementById('grain'), { x: -60, y: 40, duration: 0.7, ease: 'steps(7)', repeat: Math.floor(DUR / 0.7) }, 0);
Object.keys(SC).forEach((n) => { if (n !== 'intro' && n !== 'outro') { const w = win(n); fadeScene(S(n), w.T, w.D, 1.6, 1.4); } });
tl.set({}, {}, DUR);
window.__timelines["main"] = tl;
