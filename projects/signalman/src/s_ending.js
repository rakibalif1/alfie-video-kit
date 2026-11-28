// ===== ENDING v2: the first image replayed (narrator ~ ghost), years later on the hill, he walks away, the red lamp fades last =====
// beats (scene s): 0 told many times | 6.7 first afternoon | 23.1 "Halloa!" | 25.9 dread | 33.8 which was the ghost | 38.4 hill, years later
// | 63.7 I know only this | 66 never again called down | 71.4 certain evenings, he walks | 85.6 the call (lamp flares) | 90 "I do not look round"
(function () {
  const c = S('ending'), w = win('ending'), T = w.T, D = w.D, t = (s) => T + Math.min(s, D - 0.3), R = rr(88);
  const root = box(c, { left: 0, top: 0, width: W, height: H, overflow: 'hidden', background: '#0a0f18' });
  const pa = box(root, { left: 0, top: 0, width: W, height: H }), pb = box(root, { left: 0, top: 0, width: W, height: H, opacity: 0 });
  const TB = 37;                                                    // dissolve from part A to part B
  const ORIA = '650px 470px';
  const grp = (p, z, o) => box(p, { left: 0, top: 0, width: W, height: H, transformOrigin: o || ORIA, zIndex: z });
  // multi-layer camera: keys [t, scale, x, y, ease]; k = depth factor
  function rig(layers, K) {
    layers.forEach(([el, k]) => {
      const v = (p) => ({ scale: 1 + (p[1] - 1) * k, x: p[2] * k, y: p[3] * k });
      gsap.set(el, v(K[0]));
      for (let i = 1; i < K.length; i++) tl.fromTo(el, v(K[i - 1]), Object.assign(v(K[i]), { duration: K[i][0] - K[i - 1][0], ease: K[i][4] || 'sine.inOut', immediateRender: false }), t(K[i - 1][0]));
    });
  }
  const clip = (p) => ({ clipPath: `polygon(${p.split(' ').map((q) => q.replace(',', 'px ') + 'px').join(',')})` });

  // ================= PART A: top of the cutting, the first afternoon replayed (0-40) =================
  const far = grp(pa, 1), near = grp(pa, 2), mid = grp(pa, 3), fg = grp(pa, 5);
  rig([[far, 0.45], [near, 1], [mid, 1.4], [fg, 1]], [[0, 1.7, 490, -255], [11, 1.55, 400, -215], [21, 1.06, 0, 0], [30, 1.14, -10, -6, 'none'], [38, 1.5, -125, -118], [41, 1.55, -130, -120, 'none']]);
  box(far, { left: -200, top: -300, width: W + 400, height: 800, background: 'linear-gradient(#7d93ab 0%, #4a5f78 45%, #1f2b3a 100%)' });
  glow(far, { x: 650, y: 190, r: 420, color: 'rgba(150,180,230,0.55)', op: 0.6, T, D: 42, flicker: false });
  mist(far, { y: 60, h: 220, op: 0.45, n: 4, T, D: 42, seed: 12, speed: 0.6 });
  ridge(near, { y: 120, h: 200, color: '#141d2a', seed: 7, amp: 34, trees: 18, treeH: 70, drift: -40, T, D: 42 });
  box(near, { left: 0, top: 0, width: W, height: H }, `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><polygon points="190,430 330,310 520,215 650,180 780,215 950,310 1090,430" fill="#111823"/><path d="M330 310 L520 215 L650 180 L780 215 L950 310" stroke="rgba(140,170,215,0.35)" stroke-width="2" fill="none"/></svg>`);
  box(near, { left: -300, top: 320, width: W + 600, height: 800, background: 'linear-gradient(#27313f 0%, #151b25 30%, #0a0e14 100%)' });
  tunnel(near, { x: 640, y: 312, w: 200, h: 132, T, D: 42 });
  glow(near, { x: 640, y: 300, r: 190, color: 'rgba(130,170,240,0.6)', op: 0.6, T, D: 42, flicker: false });
  rails(near, { vx: 640, vy: 308, x0: 440, x1: 840, y0: H + 120, T, D: 42 });
  lightCone(near, { x: 640, y: 300, len: 420, spread: 150, rot: 0, color: 'rgba(130,170,250,0.4)', op: 0.5, T, D: 42 });
  box(near, { left: 540, top: 462, width: 440, height: 130, background: 'radial-gradient(ellipse, rgba(255,60,40,0.5), rgba(0,0,0,0) 70%)', mixBlendMode: 'screen' });
  redLamp(near, { x: 782, y: 498, s: 0.62, T, D: 42 });
  glow(near, { x: 726, y: 452, r: 100, color: 'rgba(120,160,230,0.55)', op: 0.5, T, D: 42, flicker: false });
  const sm = puppet(near, { x: 726, y: 498, s: 0.5, hat: 'cap', rim: 'rgba(255,110,90,0.7)', coat: '#10151f', coat2: '#090c13' });
  sm.breathe(T, 42, 0.6);
  const fcl = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
  Object.entries({ cx: 65, cy: 42, rx: 4.2, ry: 5.4, fill: '#b4c2dc', opacity: 0 }).forEach(([k, v]) => fcl.setAttribute(k, v)); sm.P.h.appendChild(fcl);
  sm.head(-4, t(24.5), 1.2); sm.head(-16, t(25.9), 2.6);                  // he looks up at the narrator: dread
  tl.to(fcl, { opacity: 0.85, duration: 2.4, ease: 'sine.in' }, t(26.2));
  mist(near, { y: 380, h: 200, op: 0.4, n: 4, T, D: 42, seed: 14, speed: 0.5 });
  steam(near, { x: 640, y: 330, n: 5, s: 2.2, dx: 10, dy: -80, color: 'rgba(170,190,220,0.26)', T, D: 42 });
  motes(near, { x0: 520, x1: 800, y0: 300, y1: 520, n: 20, color: 'rgba(190,215,255,0.9)', T, D: 42, size: 2.2, rise: -26, seed: 31 });
  // walls with cold rim light, a weak warm afternoon shaft that thins
  cuttingWalls(mid, { innerL: 380, innerR: 900, colorL: '#241c19', colorR: '#1d1715', seed: 17 });
  box(mid, Object.assign({ left: 0, top: 0, width: W, height: H, background: 'linear-gradient(100deg, rgba(20,16,14,0) 25%, rgba(100,125,165,0.5) 100%)' }, clip('0,0 380,374 340,720 0,720')));
  box(mid, Object.assign({ left: 0, top: 0, width: W, height: H, background: 'linear-gradient(260deg, rgba(20,16,14,0) 25%, rgba(100,125,165,0.42) 100%)' }, clip('1280,0 900,374 940,720 1280,720')));
  box(mid, { left: 0, top: 0, width: W, height: H }, `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><path d="M0 0 L380 374 L340 720 M1280 0 L900 374 L940 720" stroke="rgba(160,190,230,0.45)" stroke-width="2.5" fill="none"/></svg>`);
  const beam = box(mid, Object.assign({ left: 0, top: 0, width: W, height: H, background: 'linear-gradient(115deg, rgba(255,226,160,0.2), rgba(255,226,160,0.03))', mixBlendMode: 'screen', filter: 'blur(5px)', opacity: 0.7 }, clip('380,0 760,0 1060,390 980,230')));
  tl.to(beam, { opacity: 0.35, duration: 6, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T); tl.to(beam, { opacity: 0, duration: 10, ease: 'sine.in' }, t(26));
  motes(mid, { x0: 420, x1: 900, y0: 60, y1: 340, n: 20, color: 'rgba(255,230,180,0.9)', T, D: 36, size: 2.4, rise: -24, seed: 91 });
  for (let i = 0; i < 18; i++) { const s = R() < 0.5, y = 40 + R() * 600, mx = y < 374 ? (380 * y) / 374 : 340, x = s ? 6 + R() * (mx - 12) : W - 6 - R() * (mx - 12); const g = box(mid, { left: x, top: y, width: 2.6, height: 2.6, borderRadius: '50%', background: '#e0ecff', opacity: 0.1, boxShadow: '0 0 7px 2px rgba(190,215,255,0.7)' }); tl.to(g, { opacity: 0.9, duration: 0.5 + R() * 1.4, yoyo: true, repeat: 20, ease: 'sine.inOut', repeatDelay: R() * 2 }, T + R() * 4); }
  // foreground: the narrator at the rim, from behind; a ghost of him overlaps when he calls
  box(fg, { left: 0, top: 0, width: W, height: H }, `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><polygon points="0,650 130,664 330,694 440,730 0,730" fill="#0f131a"/><path d="M0 650 L130 664 L330 694 L440 730" stroke="rgba(160,190,235,0.6)" stroke-width="2.5" fill="none"/></svg>`);
  glow(fg, { x: 235, y: 470, r: 280, color: 'rgba(150,185,240,0.6)', op: 0.5, T, D: 42, flicker: false });
  const NA = puppet(fg, { x: 215, y: 700, s: 1.45, hat: 'top', rim: 'rgba(170,205,255,0.9)' });
  NA.head(14, T, 0.1);
  NA.breathe(T, 42, 1);
  NA.head(8, t(3), 4); NA.head(14, t(10), 3); NA.head(2, t(17), 3);
  NA.arm('f', -4, -4, T, 0.1);
  NA.arm('f', -40, -118, t(21.6), 1.1);                                   // hand to mouth
  NA.arm('f', -115, -18, t(23.1), 0.7);                                   // 'Halloa! Below there!'
  NA.arm('f', -115, -48, t(23.9), 0.4); NA.arm('f', -115, 6, t(24.3), 0.4); NA.arm('f', -115, -48, t(24.7), 0.4); NA.arm('f', -115, 6, t(25.1), 0.4);
  NA.arm('f', -3, -3, t(26), 1.6);
  breathFog(fg, 205, 700 - 1.45 * 174, t(2), 30, 2.7, 34);
  const GH = puppet(fg, { x: 236, y: 700, s: 1.45, hat: 'top', coat: '#c9ddff', coat2: '#aac6f4', rim: 'rgba(235,245,255,0.95)', opacity: 0 });
  GH.g.style.filter += ' blur(0.7px) drop-shadow(0 0 12px rgba(190,220,255,0.9))'; GH.g.style.mixBlendMode = 'screen';
  GH.breathe(t(22), 16, 1.4);
  GH.arm('f', -115, -18, t(23.1), 0.7);
  for (let i = 0; i < 6; i++) GH.arm('f', -115, i % 2 ? 8 : -48, t(24 + i * 0.5), 0.5);
  GH.arm('f', -5, -5, t(27.5), 2);
  tl.to(GH.g, { opacity: 0.38, duration: 2.6, ease: 'sine.inOut' }, t(22.8));
  tl.to(GH.g, { opacity: 0.22, duration: 2.2, yoyo: true, repeat: 3, ease: 'sine.inOut' }, t(26));
  tl.to(GH.g, { x: 16, duration: 10, ease: 'sine.inOut' }, t(26));
  tl.to(GH.g, { opacity: 0, duration: 3.5, ease: 'sine.inOut' }, t(34.5));
  const fogA = box(pa, { left: 0, top: 0, width: W, height: H, opacity: 0.35, zIndex: 6 });
  mist(fogA, { y: 200, h: 340, op: 0.5, n: 5, T, D: 42, seed: 31, speed: 0.8, color: 'rgba(150,168,190,0.55)' });
  box(pa, { left: 0, top: 0, width: W, height: H, background: 'radial-gradient(ellipse at 50% 55%, rgba(60,85,130,0.22) 0%, rgba(20,30,50,0.1) 70%)', mixBlendMode: 'screen', zIndex: 7 });
  tl.to(pa, { opacity: 0, duration: 3.5, ease: 'sine.inOut' }, t(TB));

  // ================= PART B: years later, the hill at dusk (37-98) =================
  const cb = grp(pb, 1, '600px 420px');
  sky(cb, { top: '#0e1832', mid: '#2b3d6c', bot: '#8c6c78', stars: 50, T, D, seed: 41 });
  glow(cb, { x: 560, y: 400, r: 620, color: 'rgba(200,130,130,0.4)', op: 0.55, T, D, flicker: false });
  ridge(cb, { y: 372, h: 60, color: '#101827', seed: 5, amp: 10, jag: 4, T, D });
  box(cb, { left: 0, top: 428, width: W, height: 300, background: 'linear-gradient(#1a2434,#0c121b 40%,#06090f)' });
  let ln = '';
  for (let i = 0; i < 15; i++) { const x = 60 + i * 80, y = 436 - (x / W) * 16, h = 30 - i * 1.7; ln += `<rect x="${x}" y="${y - h}" width="${2.4 - i * 0.1}" height="${h}" fill="#070a10"/><path d="M${x} ${y - h + 3}Q${x + 40} ${y - h + 9} ${x + 80} ${y - h + 4 + 0.6}" stroke="#070a10" stroke-width="1" fill="none"/>`; }
  box(cb, { left: 0, top: 0, width: W, height: H }, `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${ln}<path d="M0 438L${W} 421" stroke="#070a10" stroke-width="3.5"/><path d="M0 436L${W} 419" stroke="rgba(160,185,225,.5)" stroke-width="1"/></svg>`);
  box(cb, { left: 188, top: 421, width: 26, height: 7, background: '#070a10', borderRadius: 2 }); box(cb, { left: 188, top: 423, width: 3, height: 3, borderRadius: '50%', background: '#ffd9a0', opacity: 0.9 });
  steam(cb, { x: 205, y: 420, n: 5, s: 0.7, dx: 70, dy: -38, color: 'rgba(195,205,225,0.16)', T: t(TB), D });
  mist(cb, { y: 420, h: 110, op: 0.5, n: 6, T, D, seed: 19, speed: 0.7, color: 'rgba(130,150,185,0.55)' });
  box(cb, { left: 800, top: 400, width: 420, height: 100, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,60,40,0.35), rgba(0,0,0,0) 70%)', mixBlendMode: 'screen' });
  const lampG = box(cb, { left: 1010 - 40, top: 421 - 40, width: 80, height: 80, zIndex: 30, opacity: 0 }, '<div style="position:absolute;left:0;top:0;width:80px;height:80px;border-radius:50%;background:radial-gradient(circle,rgba(255,70,45,.8),rgba(255,40,30,.2) 40%,rgba(0,0,0,0) 70%);mix-blend-mode:screen"></div><div style="position:absolute;left:37px;top:37px;width:6px;height:6px;border-radius:50%;background:#ff4a38"></div>');
  tl.set(lampG, { opacity: 0.45 }, t(TB));
  tl.to(lampG, { opacity: 0.85, duration: 1.3, yoyo: true, repeat: Math.floor((85 - TB) / 1.3), ease: 'sine.inOut' }, t(TB));
  tl.to(lampG, { opacity: 1, duration: 0.6, ease: 'sine.out' }, t(85.6)); tl.to(lampG, { opacity: 0.2, duration: 1.8, ease: 'sine.inOut' }, t(86.3));   // the call
  tl.to(lampG, { opacity: 1, duration: 0.6, ease: 'sine.out' }, t(88)); tl.to(lampG, { opacity: 0.55, duration: 2, ease: 'sine.inOut' }, t(88.7));
  tl.to(lampG, { opacity: 0, duration: 7, ease: 'sine.in' }, t(91));                                      // the red lamp goes last
  // hill, grass, narrator
  box(cb, { left: -260, top: 520, width: 1100, height: 600, borderRadius: '50%', background: 'radial-gradient(ellipse at 50% 0%,#18223a,#070a12 60%)' });
  for (let i = 0; i < 70; i++) { const x = -40 + R() * 740, k = (x - 290) / 550, y = 520 + (Math.abs(k) < 1 ? 300 * (1 - Math.sqrt(1 - k * k)) : 300) + 6, h = 18 + R() * 30, b = box(cb, { left: x, top: y - h, width: 2.2, height: h, background: '#060a12', transformOrigin: '50% 100%', rotation: (R() - 0.5) * 8 }); tl.to(b, { rotation: 9 + R() * 8, duration: 1.4 + R() * 1.4, yoyo: true, repeat: Math.floor(D / 2), ease: 'sine.inOut' }, T + R()); }
  glow(cb, { x: 345, y: 400, r: 300, color: 'rgba(150,185,245,0.5)', op: 0.5, T, D, flicker: false });   // cold backlight behind him
  const NB = puppet(cb, { x: 330, y: 540, s: 1.3, hat: 'top', rim: 'rgba(170,205,255,0.9)' });
  gsap.set(NB.g, { transformOrigin: '50% 100%' });
  NB.breathe(t(TB), 36, 1);
  NB.head(10, t(TB), 0.1); NB.head(-4, t(42), 4); NB.head(8, t(52), 3.5); NB.head(-2, t(60), 3);
  NB.head(10, t(64), 2.4);                                                 // 'I have never again called down'
  NB.head(-6, t(71.4), 2.4);                                               // 'on certain evenings... I think I hear'
  NB.arm('f', -6, -4, t(TB + 3), 1); NB.arm('f', -10, -75, t(66), 2.2); NB.arm('f', -4, -4, t(70), 1.6);   // a hand half-lifts, falls
  breathFog(cb, 322, 540 - 1.3 * 174, t(TB + 2), 33, 2.8, -30);
  // he walks away over the crest, never looking round
  const w0 = 73.5, wd = 22;
  tl.to(NB.g, { x: -230, y: 70, scale: 0.7, duration: wd, ease: 'sine.inOut' }, t(w0));
  NB.walk(t(w0), wd - 1, 0, 1.25, 1.2);
  NB.head(0, t(w0 + 0.1), 0.8);
  NB.head(3, t(85.6), 0.5); NB.head(0, t(86.4), 1.4);                       // the call reaches him; he does not turn
  for (let i = 0; i < 16; i++) { const m = box(cb, { left: R() * W, top: 300 + R() * 250, width: 2, height: 2, borderRadius: '50%', background: '#c0cfee', opacity: 0.3 }); tl.fromTo(m, { x: 0 }, { x: -200 - R() * 200, duration: 10 + R() * 8, repeat: Math.floor(D / 10), ease: 'none' }, T); }
  // darkness closes in, but the lamp stays above it
  const blk = box(cb, { left: -200, top: -200, width: W + 400, height: H + 400, background: '#03050b', opacity: 0, zIndex: 20 });
  tl.to(blk, { opacity: 0.88, duration: 9, ease: 'sine.in' }, t(84));
  tl.fromTo(pb, { opacity: 0 }, { opacity: 1, duration: 3.5, ease: 'sine.inOut', immediateRender: false }, t(TB));
  rig([[cb, 1]], [[TB, 1.0, 0, 0], [58, 1.06, 0, 0, 'none'], [64, 1.5, 255, -90], [72, 1.55, 265, -90, 'none'], [98.3, 1.5, -480, -85]]);
})();
