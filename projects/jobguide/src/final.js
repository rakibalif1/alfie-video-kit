// ===== global layer: captions, corner badge, GOV.UK check tags, scene pop-in, end card =====
(function () {
  const caps = document.getElementById('caps'), COL = { N: '#3a86ff', K: '#2a9d8f', C: '#ff7b00', S: '#d00000', A: '#7b2cbf', L: '#6c757d', P: '#1d3557' }, NAME = { N: '', K: 'KIRAN', C: 'CHIDI', S: 'MR DEAL', A: 'SLICK SID', L: 'MR RUSH', P: 'OFFICER FAKE' };
  LINES.forEach((l) => {
    const raw = l.text.match(/[^,.;:!?…]+[,.;:!?…"]*\s*/g) || [l.text];
    const chunks = []; let cur = '';
    raw.forEach((p) => { cur += p; if (cur.split(/\s+/).filter(Boolean).length >= 5) { chunks.push(cur.trim()); cur = ''; } });
    if (cur.trim()) { if (chunks.length && cur.split(/\s+/).filter(Boolean).length < 3) chunks[chunks.length - 1] += ' ' + cur.trim(); else chunks.push(cur.trim()); }
    const cap8 = (ch) => { const w = ch.split(/\s+/); if (w.length <= 9) return [ch]; const n = Math.ceil(w.length / 8), sz = Math.ceil(w.length / n); const o = []; for (let i = 0; i < w.length; i += sz) o.push(w.slice(i, i + sz).join(' ')); return o; };
    const flat = []; chunks.forEach((ch) => cap8(ch).forEach((x) => flat.push(x)));
    const total = flat.reduce((a, b) => a + b.length, 0); let t = l.start + 0.03;
    flat.forEach((ch, i) => {
      const d = (l.dur - 0.06) * (ch.length / total), tag = (i === 0 && NAME[l.who]) ? `<span class="nm" style="background:${COL[l.who]}">${NAME[l.who]}</span>` : '', e = mk(caps, 'cap', null, tag + ch);
      tl.fromTo(e, { opacity: 0, y: 8, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: Math.min(0.18, d * 0.4), ease: 'back.out(2)' }, t);
      tl.to(e, { opacity: 0, duration: Math.min(0.12, d * 0.3) }, t + d - Math.min(0.12, d * 0.3)); t += d;
    });
  });
})();
// corner badge from the scene after the safety note until the end
(function () {
  document.getElementById('badget').textContent = `Info as of ${MONTH} · Always check GOV.UK`;
  const names = Object.keys(SC).filter((n) => n !== 'intro' && n !== 'outro'), b = document.getElementById('badge'), t0 = SC[names[2]].t0; window.LASTSCENE = names[names.length - 1];
  tl.fromTo(b, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(2)' }, t0); tl.to(b, { opacity: 0, duration: 0.4 }, SC[window.LASTSCENE].t1 - 0.5);
})();
// "CHECK:" tags, top-right, 6 s at the start of each step
(function () {
  const CHK = EPCHECKS;
  Object.keys(CHK).forEach((n) => { if (!SC[n]) return; const e = mk(document.getElementById('root'), 'chk', null, CHK[n]); const t = SC[n].t0 + 1.0;
    tl.fromTo(e, { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' }, t); tl.to(e, { opacity: 0, duration: 0.4 }, t + 6); sfx('swish', t, 0.3); });
})();
// scene pop-in
Object.keys(SC).forEach((n) => { if (n !== 'intro' && n !== 'outro') { const w = win(n); tl.fromTo(S(n), { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' }, w.T); sfx('whoosh', w.T, 0.5); } });
// end card
(function () {
  const w = win('outro'), c = S('outro'), T = w.T;
  bgPop(c, { color: PP.yellow, T, D: w.D });
  headline(c, { x: 640, y: 70, text: 'YOU ARE NOT BEHIND.<br>YOU ARE JUST BEGINNING.', size: 62, color: '#fff', T: T + 0.3, w: 1100 });
  const row = ['kiran', 'chidi', 'rahim', 'amina', 'priya', 'kofi'];
  row.forEach((k, i) => { const p = cast(c, k, { x: 190 + i * 180, y: 560, s: 1.05 }); p.breathe(T, w.D); p.blink(T, w.D); p.arm('f', -150, -10, T + 1 + i * 0.25, 0.5); tl.to(p.P.af, { rotation: -130, duration: 0.35, yoyo: true, repeat: 7, ease: 'sine.inOut' }, T + 1.6 + i * 0.25); p.g.style.opacity = 0; tl.to(p.g, { opacity: 1, y: 0, duration: 0.4 }, T + 0.5 + i * 0.15); });
  card(c, { x: 640, y: 305, w: 880, h: 78, html: EPNEXT, size: 30, bg: PP.white, T: T + 1.2 });
  box(c, { left: 90, top: 636, width: 1100, textAlign: 'center', font: '700 17px/1.3 Arial', color: INK, background: 'rgba(255,255,255,.85)', border: `3px solid ${INK}`, borderRadius: 12, padding: '8px 14px' }, `Information correct as of ${MONTH} · General information, not legal advice · Always check GOV.UK`);
})();
tl.to(document.getElementById('fade'), { opacity: 1, duration: 0.8 }, DUR - 0.9);
tl.set({}, {}, DUR);
window.__timelines["main"] = tl;
