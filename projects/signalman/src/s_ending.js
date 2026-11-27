// ===== ENDING: the first image replayed (narrator ~ ghost), years later on the hill, he walks away, the red lamp fades last =====
(function () {
  const c = S('ending'), w = win('ending'), T = w.T, D = w.D, K = D / 95, A = (s) => T + s * K, R = rr(88);
  const root = box(c, { left: 0, top: 0, width: W, height: H, overflow: 'hidden', background: '#02030a' });
  const pa = box(root, { left: 0, top: 0, width: W, height: H }), pb = box(root, { left: 0, top: 0, width: W, height: H, opacity: 0 });
  // narrator seen from behind; arm group 'arm' pivots at (70,52)
  function back(p, o) {
    const s = o.s, g = box(p, { left: o.x - 50 * s, top: o.y - 200 * s, width: 100 * s, height: 200 * s, transformOrigin: '50% 100%', filter: o.rim ? 'drop-shadow(0 0 3px rgba(150,195,255,.85)) drop-shadow(0 0 9px rgba(120,160,255,.4))' : 'drop-shadow(0 0 2px rgba(120,150,210,.35))' });
    g.innerHTML = `<svg viewBox="0 0 100 200" width="100%" height="100%" style="overflow:visible"><g class="la"><rect x="38" y="112" width="11" height="84" rx="4" fill="#05060a"/></g><g class="lb"><rect x="51" y="112" width="11" height="84" rx="4" fill="#090a0e"/></g><path d="M27 54Q27 40 50 40Q73 40 73 54L79 134L21 134Z" fill="#06080d"/><rect x="24" y="48" width="9" height="68" rx="4" fill="#06080d"/><circle cx="50" cy="27" r="11" fill="#07080d"/><rect x="39" y="3" width="22" height="14" fill="#04050a"/><rect x="33" y="15" width="34" height="3" fill="#04050a"/><g class="arm"><rect x="66" y="48" width="9" height="68" rx="4" fill="#06080d"/></g></svg>`;
    return { g, x: o.x, arm: g.querySelector('.arm'), la: g.querySelector('.la'), lb: g.querySelector('.lb') };
  }
  // ================= PART A: top of the cutting (0-35) =================
  const cam = box(pa, { left: 0, top: 0, width: W, height: H, transformOrigin: '650px 470px' });
  box(cam, { left: -200, top: -300, width: W + 400, height: 800, background: 'linear-gradient(#4f5f74 0%,#33435a 45%,#141b26 100%)' });
  mist(cam, { y: 60, h: 220, op: 0.4, n: 4, T, D: 35 * K, seed: 12, speed: 0.6 });
  ridge(cam, { y: 120, h: 200, color: '#0c1118', seed: 7, amp: 34, trees: 18, treeH: 70, T, D });
  box(cam, { left: -300, top: 320, width: W + 600, height: 800, background: 'linear-gradient(#1b212b 0%,#0d1117 30%,#06080b 100%)' });
  tunnel(cam, { x: 640, y: 312, w: 200, h: 132, T, D });
  rails(cam, { vx: 640, vy: 308, x0: 440, x1: 840, y0: H + 120, T, D });
  box(cam, { left: 640, top: 470, width: 260, height: 120, background: 'radial-gradient(ellipse,rgba(255,50,30,.35),rgba(0,0,0,0) 70%)', mixBlendMode: 'screen' });
  redLamp(cam, { x: 760, y: 492, s: 0.55, T, D: 35 * K });
  const sm = box(cam, { left: 690, top: 396, width: 60, height: 100, transformOrigin: '50% 100%' }, '<svg viewBox="0 0 60 100" width="60" height="100" style="overflow:visible"><rect x="20" y="62" width="8" height="36" rx="3" fill="#050608"/><rect x="32" y="62" width="8" height="36" rx="3" fill="#050608"/><path d="M14 22Q14 14 30 14Q46 14 46 24L48 70H12Z" fill="#07090e"/><g class="hd"><circle cx="30" cy="10" r="10" fill="#07090e"/><ellipse class="fc" cx="30" cy="11" rx="5" ry="6" fill="#aab6cc" opacity="0"/></g></svg>');
  tl.to(sm.querySelector('.fc'), { opacity: 0.8, duration: 3, ease: 'sine.in' }, A(9));
  tl.to(sm.querySelector('.hd'), { rotation: -14, svgOrigin: '30 20', duration: 3, ease: 'sine.inOut' }, A(8));
  mist(cam, { y: 380, h: 200, op: 0.35, n: 4, T, D, seed: 14, speed: 0.5 });
  steam(cam, { x: 640, y: 330, n: 4, s: 2.2, dx: 10, dy: -80, color: 'rgba(160,175,200,0.18)', T, D: 35 * K });
  cuttingWalls(cam, { innerL: 380, innerR: 900, colorL: '#14100e', colorR: '#0f0c0c', seed: 17 });
  // narrator at the rim, cold rim light, calling down; ghost pose overlaps him
  const NA = back(cam, { x: 215, y: 735, s: 1.55, rim: 1 });
  tl.to(NA.arm, { rotation: -150, svgOrigin: '70 52', duration: 2.4, ease: 'sine.inOut' }, A(5)); tl.to(NA.arm, { rotation: 0, svgOrigin: '70 52', duration: 3, ease: 'sine.inOut' }, A(12));
  tl.to(NA.g, { scaleY: 1.012, duration: 2.8, yoyo: true, repeat: Math.floor(35 * K / 2.8), ease: 'sine.inOut' }, T);
  const gs = box(cam, { left: 230 - 50 * 1.55, top: 735 - 200 * 1.55, width: 155, height: 310, opacity: 0, filter: 'drop-shadow(0 0 10px rgba(190,220,255,.95)) blur(.6px)' },
    '<svg viewBox="0 0 100 200" width="100%" height="100%" style="overflow:visible"><path d="M27 54Q27 40 50 40Q73 40 73 54L79 134L21 134Z" fill="rgba(200,222,255,.62)"/><rect x="38" y="112" width="11" height="84" rx="4" fill="rgba(200,222,255,.5)"/><rect x="51" y="112" width="11" height="84" rx="4" fill="rgba(200,222,255,.5)"/><circle cx="50" cy="27" r="11" fill="rgba(215,232,255,.7)"/><path d="M30 54L42 22L56 28" stroke="rgba(215,232,255,.8)" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g class="wv"><rect x="66" y="48" width="9" height="68" rx="4" fill="rgba(215,232,255,.75)" transform="rotate(150 70 52)"/></g></svg>');
  tl.to(gs, { opacity: 0.5, x: -22, duration: 3, ease: 'sine.inOut' }, A(17)); tl.to(gs, { opacity: 0, x: 20, duration: 4, ease: 'sine.inOut' }, A(24));
  tl.fromTo(gs.querySelector('.wv'), { rotation: -10, svgOrigin: '70 52' }, { rotation: 12, svgOrigin: '70 52', duration: 1.1, yoyo: true, repeat: 5, ease: 'sine.inOut' }, A(17));
  tl.fromTo(cam, { scale: 1 }, { scale: 1.12, duration: 35 * K, ease: 'none' }, T);
  tl.to(pa, { opacity: 0, duration: 3, ease: 'sine.inOut' }, A(33));
  // ================= PART B: years later, the hill at dusk (35-70) =================
  const cb = box(pb, { left: 0, top: 0, width: W, height: H, transformOrigin: '600px 420px' });
  sky(cb, { top: '#03050f', mid: '#14224a', bot: '#5a4650', stars: 50, T, D, seed: 41 });
  ridge(cb, { y: 372, h: 60, color: '#0a0f1a', seed: 5, amp: 10, jag: 4, T, D });
  box(cb, { left: 0, top: 428, width: W, height: 300, background: 'linear-gradient(#0c121c,#05080d 40%,#020306)' });
  let ln = '';
  for (let i = 0; i < 15; i++) { const x = 60 + i * 80, y = 436 - (x / W) * 16, h = 30 - i * 1.7; ln += `<rect x="${x}" y="${y - h}" width="${2.4 - i * 0.1}" height="${h}" fill="#04060a"/><path d="M${x} ${y - h + 3}Q${x + 40} ${y - h + 9} ${x + 80} ${y - h + 4 + 0.6}" stroke="#04060a" stroke-width="1" fill="none"/>`; }
  box(cb, { left: 0, top: 0, width: W, height: H }, `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${ln}<path d="M0 438L${W} 421" stroke="#04060a" stroke-width="3.5"/><path d="M0 436L${W} 419" stroke="rgba(150,175,215,.35)" stroke-width="1"/></svg>`);
  box(cb, { left: 188, top: 421, width: 26, height: 7, background: '#04060a', borderRadius: 2 }); box(cb, { left: 188, top: 423, width: 3, height: 3, borderRadius: '50%', background: '#ffd9a0', opacity: 0.8 });
  steam(cb, { x: 205, y: 420, n: 5, s: 0.7, dx: 70, dy: -38, color: 'rgba(195,205,225,0.1)', T: A(33), D });
  mist(cb, { y: 420, h: 110, op: 0.5, n: 6, T, D, seed: 19, speed: 0.7, color: 'rgba(120,140,170,0.5)' });
  const lampG = box(cb, { left: 1010 - 40, top: 421 - 40, width: 80, height: 80, zIndex: 30, opacity: 0 }, '<div style="position:absolute;left:0;top:0;width:80px;height:80px;border-radius:50%;background:radial-gradient(circle,rgba(255,70,45,.7),rgba(255,40,30,.15) 40%,rgba(0,0,0,0) 70%);mix-blend-mode:screen"></div><div style="position:absolute;left:37px;top:37px;width:6px;height:6px;border-radius:50%;background:#ff4a38"></div>');
  const legs = Math.max(2, Math.floor((A(73) - A(35)) / 1.3));
  tl.set(lampG, { opacity: 0.4 }, A(35)); tl.to(lampG, { opacity: 0.85, duration: 1.3, yoyo: true, repeat: legs - 1, ease: 'sine.inOut' }, A(35));
  tl.set(lampG, { opacity: 0.45 }, A(74));
  [[74.1, 77.6], [78.8, 82.4]].forEach(([a, b]) => { tl.to(lampG, { opacity: 1, duration: 0.6, ease: 'sine.out' }, A(a)); tl.to(lampG, { opacity: 0.12, duration: 2.2, ease: 'sine.inOut' }, A(a + 0.7)); });
  tl.to(lampG, { opacity: 0.55, duration: 2, ease: 'sine.inOut' }, A(83)); tl.to(lampG, { opacity: 0, duration: 4, ease: 'sine.in' }, A(90));
  // hill, grass, narrator
  box(cb, { left: -260, top: 520, width: 1100, height: 600, borderRadius: '50%', background: 'radial-gradient(ellipse at 50% 0%,#0b1018,#03050a 60%)' });
  for (let i = 0; i < 70; i++) { const x = -40 + R() * 740, k = (x - 290) / 550, y = 520 + (Math.abs(k) < 1 ? 300 * (1 - Math.sqrt(1 - k * k)) : 300) + 6, h = 18 + R() * 30, b = box(cb, { left: x, top: y - h, width: 2.2, height: h, background: '#030509', transformOrigin: '50% 100%', rotation: (R() - 0.5) * 8 }); tl.to(b, { rotation: 9 + R() * 8, duration: 1.4 + R() * 1.4, yoyo: true, repeat: Math.floor(D / 2), ease: 'sine.inOut' }, T + R()); }
  const NB = back(cb, { x: 330, y: 540, s: 1.3, rim: 0 });
  tl.set(NB.g, { scaleX: 0.78 }, 0);
  tl.to(NB.g, { skewX: 1.6, duration: 2.2, yoyo: true, repeat: Math.floor(D / 2.2), ease: 'sine.inOut' }, T);
  tl.to(NB.g, { scaleY: 1.01, duration: 3, yoyo: true, repeat: Math.floor((A(69) - T) / 3), ease: 'sine.inOut' }, T);
  // he walks away over the crest, never looking round
  const n = 12, d = (23 * K) / (n + 1);
  tl.to(NB.g, { x: -230, y: 70, scaleX: 0.62, scaleY: 0.8, duration: 23 * K, ease: 'sine.inOut' }, A(70));
  tl.fromTo(NB.la, { rotation: 14, svgOrigin: '44 114' }, { rotation: -14, svgOrigin: '44 114', duration: d, repeat: n, yoyo: true, ease: 'sine.inOut' }, A(70));
  tl.fromTo(NB.lb, { rotation: -14, svgOrigin: '56 114' }, { rotation: 14, svgOrigin: '56 114', duration: d, repeat: n, yoyo: true, ease: 'sine.inOut' }, A(70));
  // wind-driven dusk particles
  for (let i = 0; i < 16; i++) { const m = box(cb, { left: R() * W, top: 300 + R() * 250, width: 2, height: 2, borderRadius: '50%', background: '#b6c6e6', opacity: 0.2 }); tl.fromTo(m, { x: 0 }, { x: -200 - R() * 200, duration: 10 + R() * 8, repeat: Math.floor(D / 10), ease: 'none' }, T); }
  // darken everything but the lamp
  const blk = box(cb, { left: -200, top: -200, width: W + 400, height: H + 400, background: '#000', opacity: 0, zIndex: 20 });
  tl.to(blk, { opacity: 0.97, duration: 7 * K, ease: 'sine.in' }, A(80));
  tl.fromTo(pb, { opacity: 0 }, { opacity: 1, duration: 3, ease: 'sine.inOut', immediateRender: false }, A(33));
  tl.set(pb, { opacity: 0 }, 0);
  tl.fromTo(cb, { scale: 1 }, { scale: 1.05, duration: 37 * K, ease: 'none' }, A(33));
  tl.to(cb, { scale: 1.45, x: -480, y: -85, duration: 28 * K, ease: 'sine.inOut' }, A(69));
})();
