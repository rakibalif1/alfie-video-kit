// ===== BAMBOO: the grove beyond the hut (scene 'bamboo'). Sway pauses 15.5-26.5 s, a pale doorway glows after the call =====
(function () {
  const w = win('bamboo'), c = S('bamboo'), T = w.T, D = w.D, L = box(c, { left: 0, top: 0, width: W, height: H });
  const PA = 15.5, PB = 26.5; // pause window (seconds into the scene)
  // --- sky, haze behind the grove, stars that vanish when he hears it
  sky(L, { top: '#03050f', mid: '#0b1636', bot: '#1f3a68', stars: 0, moon: { x: 960, y: 120, r: 26 }, T, D });
  const stars = box(L, { left: 0, top: 0, width: W, height: 320 }), RS = rr(4);
  for (let i = 0; i < 45; i++) { const s = box(stars, { left: RS() * W, top: RS() * 300, width: 1 + RS() * 2, height: 1 + RS() * 2, borderRadius: '50%', background: '#fff', opacity: 0.3 + RS() * 0.6 }); tl.to(s, { opacity: 0.1, duration: 1.5 + RS() * 2, yoyo: true, repeat: 6, ease: 'sine.inOut' }, T + RS() * 2); }
  tl.to(stars, { opacity: 0, duration: 3, ease: 'sine.in' }, T + 12.5);
  box(L, { left: 0, top: 250, width: W, height: 360, background: 'linear-gradient(rgba(60,90,150,0), rgba(110,150,210,0.38) 70%, rgba(150,185,235,0.3))' });
  // pale moonlight slits between the stalks
  const RL = rr(12);
  for (let i = 0; i < 9; i++) { const sl = box(L, { left: 80 + RL() * 1100, top: 120 + RL() * 120, width: 3 + RL() * 5, height: 300 + RL() * 220, background: 'linear-gradient(rgba(215,230,255,0), rgba(215,230,255,0.55) 50%, rgba(215,230,255,0))', filter: 'blur(2px)', opacity: 0.5 }); tl.to(sl, { opacity: 0.2 + RL() * 0.2, duration: 3 + RL() * 2, yoyo: true, repeat: Math.floor(D / 5), ease: 'sine.inOut' }, T); }
  // the doorway: one gap in the stalks that glows cold white-blue after the call, then dims
  const DX = 930, door = box(L, { left: DX - 55, top: 250, width: 110, height: 340, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(235,245,255,0.95) 0%, rgba(150,190,255,0.5) 40%, rgba(0,0,0,0) 72%)', mixBlendMode: 'screen', opacity: 0, filter: 'blur(3px)' });
  tl.to(door, { opacity: 0.55, duration: 4, ease: 'sine.inOut' }, T + 24.6).to(door, { opacity: 0.38, duration: 3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T + 28.6).to(door, { opacity: 0, duration: 5, ease: 'sine.in' }, T + 35.5);
  // --- stalk layers. rev mirrors the sway (same seed), fan tilts stalks away from the lamp
  function stalks(p, o) {
    const R = rr(o.seed), RT = rr(o.seed + 500), amp = o.amp || 1;
    for (let i = 0; i < o.n; i++) {
      let x; do { x = o.x0 + R() * (o.x1 - o.x0); } while (o.gap && x > o.gap[0] && x < o.gap[1]);
      const h = o.h * (0.8 + R() * 0.4), wd = o.w * (0.7 + R() * 0.6); let nodes = '', leaves = '';
      for (let k = 1; k < 9; k++) nodes += `<rect x="-2" y="${(h / 9) * k}" width="${wd + 4}" height="${Math.max(3, wd * 0.3)}" fill="#000" opacity="0.5"/>`;
      if (o.leaves) for (let b = 0; b < 4; b++) { const by = h * (0.01 + b * 0.07 + R() * 0.03), dir = R() < 0.5 ? -1 : 1; for (let q = 0; q < 3; q++) leaves += `<path d="M0 0 Q14 -5 38 9 Q15 5 0 0Z" fill="${o.color}" transform="translate(${wd / 2} ${by}) rotate(${dir < 0 ? 180 - 20 * q + 30 : 20 * q - 20}) scale(${o.leaves})"/>`; }
      const fan = o.fan !== undefined ? Math.max(-9, Math.min(9, (x - o.fan) / 45)) : 0, sgn = o.rev ? -1 : 1;
      const st = box(p, { left: x, top: o.y - h, width: wd, height: h, transformOrigin: '50% 100%', opacity: o.op ?? 1, filter: o.blur ? `blur(${o.blur}px)` : '' }, `<svg viewBox="0 0 ${wd} ${h}" width="${wd}" height="${h}" style="overflow:visible"><rect width="${wd}" height="${h}" rx="${wd / 2.4}" fill="${o.color}"/>${nodes}${leaves}</svg>`);
      const base = fan + sgn * (RT() - 0.5) * 3; let t = T + RT() * 1.2, a = base;
      tl.set(st, { rotation: base }, T);
      while (t < T + PA - 3) { const d = 2 + RT() * 1.8; a = fan + sgn * (RT() < 0.5 ? -1 : 1) * (1.2 + RT() * 3.2) * amp; tl.to(st, { rotation: a, duration: d, ease: 'sine.inOut' }, t); t += d; }
      tl.to(st, { rotation: fan + sgn * (RT() - 0.5) * 0.6, duration: 2.6, ease: 'sine.out' }, Math.max(t, T + PA - 2.6)); // settle and hold still
      t = T + PB + RT() * 0.8; // sway resumes, slowly
      while (t < T + D + 4) { const d = 3.4 + RT() * 2; a = fan + sgn * (RT() < 0.5 ? -1 : 1) * (0.8 + RT() * 1.8) * amp; tl.to(st, { rotation: a, duration: d, ease: 'sine.inOut' }, t); t += d; }
      if (o.knock && !o.rev) for (let k = 0; k < 4; k++) tl.to(st, { rotation: '+=0.7', duration: 0.12, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T + 2 + RT() * (PA - 5)); // hollow knocking
    }
  }
  const GAP = [DX - 70, DX + 70];
  stalks(L, { seed: 21, n: 26, x0: 0, x1: W, y: 520, h: 640, w: 7, color: '#24405e', op: 0.85, blur: 1.5, amp: 0.7, gap: GAP, leaves: 0.8 }); // far, hazy
  mist(L, { y: 430, h: 140, op: 0.35, n: 4, T, D, seed: 5 });
  stalks(L, { seed: 31, n: 16, x0: 0, x1: 1000, y: 596, h: 820, w: 26, color: '#0f2024', op: 0.62, blur: 3, amp: 1.2, rev: true, fan: 420 }); // shadow-stalks: opposite sway
  stalks(L, { seed: 41, n: 24, x0: -20, x1: W, y: 600, h: 760, w: 13, color: '#06100d', amp: 1, gap: GAP, leaves: 1, knock: true }); // mid
  // --- Arun walks in from the left, his lamp bends toward the grove while he listens
  const s = 0.62, g = box(L, { left: -40 * s, top: 585 - 180 * s, width: 80 * s, height: 180 * s });
  g.innerHTML = `<svg viewBox="0 0 80 180" width="100%" height="100%" style="overflow:visible"><rect id="b" x="34" y="92" width="11" height="80" rx="5" fill="#050608" transform-origin="39 92"/><path d="M26 30 Q26 18 40 18 Q54 18 54 32 L56 96 L24 96Z" fill="#07090e"/><circle cx="40" cy="12" r="12" fill="#07090e"/><path d="M38 40 L56 66 L62 96" stroke="#07090e" stroke-width="9" stroke-linecap="round" fill="none"/><rect id="f" x="34" y="92" width="11" height="80" rx="5" fill="#090b11" transform-origin="39 92"/></svg>`;
  const lg = box(L, { left: 0, top: 0, width: 1, height: 1 }), lm = lamp(lg, { x: 36 * s, y: 585 - 78 * s, s: s * 1.1, T, D, r: 120 });
  glow(lg, { x: 36 * s, y: 585 - 78 * s, r: 330, color: 'rgba(255,170,70,0.5)', op: 0.5, T, D });
  const bk = g.querySelector('#b'), fr = g.querySelector('#f'), segs = [[0, PA - 0.8, -80, 470, 0.7], [PB + 0.4, D, 470, 800, 1.0]];
  tl.set([g, lg], { x: -80 }, T);
  segs.forEach(([a, b, x0, x1, st]) => {
    tl.fromTo([g, lg], { x: x0 }, { x: x1, duration: b - a, ease: 'none' }, T + a);
    tl.fromTo(fr, { rotation: 22 }, { rotation: -22, duration: st, repeat: Math.floor((b - a) / st), yoyo: true, ease: 'sine.inOut' }, T + a);
    tl.fromTo(bk, { rotation: -22 }, { rotation: 22, duration: st, repeat: Math.floor((b - a) / st), yoyo: true, ease: 'sine.inOut' }, T + a);
    tl.fromTo(g, { y: 0 }, { y: -2.5, duration: st / 2, repeat: Math.floor((b - a) / st) * 2 + 1, yoyo: true, ease: 'sine.inOut' }, T + a);
  });
  tl.to([fr, bk], { rotation: 0, duration: 0.9, overwrite: 'auto' }, T + PA - 0.6).to(g, { y: 0, duration: 0.5, overwrite: 'auto' }, T + PA - 0.6);
  tl.to(lm, { skewX: -16, x: '+=0', rotation: -6, duration: 2.5, ease: 'sine.inOut', transformOrigin: '50% 100%' }, T + PA + 0.5).to(lm, { skewX: 0, rotation: 0, duration: 3, ease: 'sine.inOut' }, T + PB + 1);
  // --- the near stalks in front, huge and blurred, and the grove that closes behind him
  stalks(L, { seed: 51, n: 2, x0: -30, x1: 60, y: 760, h: 1000, w: 55, color: '#010302', blur: 6, amp: 0.5 });
  stalks(L, { seed: 52, n: 2, x0: 1170, x1: 1260, y: 760, h: 1000, w: 50, color: '#010302', blur: 6, amp: 0.5 });
  const cl = box(L, { left: 0, top: 0, width: W, height: H, opacity: 0 }); stalks(cl, { seed: 61, n: 7, x0: 20, x1: 460, y: 620, h: 780, w: 18, color: '#030806', amp: 0.4, leaves: 1 });
  tl.to(cl, { opacity: 1, duration: 7, ease: 'sine.inOut' }, T + 34);
  // --- ground, ground fog, and the extra mist that swirls while everything holds still
  box(L, { left: 0, top: 585, width: W, height: 140, background: 'linear-gradient(#050a0c, #020405 40%)' });
  mist(L, { y: 560, h: 110, op: 0.3, n: 4, T, D, seed: 7 });
  const sw = box(L, { left: 0, top: 0, width: W, height: H, opacity: 0 }); mist(sw, { y: 300, h: 260, op: 0.45, n: 5, T: T + PA - 3, D: PB - PA + 6, speed: 1.4, seed: 17 });
  tl.to(sw, { opacity: 1, duration: 3 }, T + PA - 3).to(sw, { rotation: 4, duration: PB - PA + 4, ease: 'sine.inOut', transformOrigin: '50% 60%' }, T + PA - 3).to(sw, { opacity: 0.2, duration: 5 }, T + PB);
  const dk = box(L, { left: 0, top: 0, width: W, height: H, background: '#02040a', opacity: 0 }); tl.to(dk, { opacity: 0.22, duration: 3 }, T + PA - 2).to(dk, { opacity: 0, duration: 4 }, T + PB + 2);
  // --- slow camera push, steady during the pause, then toward the doorway
  tl.fromTo(L, { scale: 1, x: 0, transformOrigin: '50% 55%' }, { scale: 1.04, x: -10, duration: PA, ease: 'none' }, T).to(L, { scale: 1.05, duration: PB - PA, ease: 'none' }, T + PA).to(L, { scale: 1.1, x: -60, duration: D - PB, ease: 'none' }, T + PB);
})();
