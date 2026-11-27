// ===== SCENE 'cutting': looking down the deep cutting, the call, the descent to the signalman =====
(function () {
  const c = S('cutting'), w = win('cutting'), T = w.T, D = w.D;
  const t = (s) => T + Math.min(s, D - 0.5);
  const ORI = '650px 470px';
  const L = box(c, { left: 0, top: 0, width: W, height: H, overflow: 'hidden', background: '#05070b' });
  // camera keyframes (seconds into scene -> value) applied to each depth group
  const cam = (el, k, ys) => k.forEach((v, i) => { if (!i) return; tl.fromTo(el, { scale: k[i - 1][1], y: ys[i - 1] }, { scale: v[1], y: ys[i], duration: v[0] - k[i - 1][0], ease: i === k.length - 1 ? 'sine.inOut' : 'none' }, t(k[i - 1][0])); });
  const grp = (z) => box(L, { left: 0, top: 0, width: W, height: H, transformOrigin: ORI, zIndex: z });
  const far = grp(1), near = grp(2), mid = grp(3);
  // ---- far: cold dusk sky, fog above the hill
  box(far, { left: -200, top: -300, width: W + 400, height: 800, background: 'linear-gradient(#5d6e82 0%, #35465a 45%, #141b26 100%)' });
  mist(far, { y: 60, h: 220, op: 0.4, n: 4, T: T, D: D, seed: 12, speed: 0.6 });
  cam(far, [[0, 1], [43, 1.06], [56, 1.15], [80, 1.5]], [0, -4, -10, -30]);
  // ---- near: hill, tunnel, ground, rails, red lamp, signalman
  ridge(near, { y: 120, h: 200, color: '#0c1118', seed: 7, amp: 34, trees: 18, treeH: 70, drift: -40, T: T, D: D });
  box(near, { left: 0, top: 0, width: W, height: H }, `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><polygon points="190,430 330,310 520,215 650,180 780,215 950,310 1090,430" fill="#0a0d12"/></svg>`);
  box(near, { left: -300, top: 320, width: W + 600, height: 800, background: 'linear-gradient(#1b212b 0%, #0d1117 30%, #06080b 100%)' });
  tunnel(near, { x: 640, y: 312, w: 200, h: 132, T: T, D: D });
  box(near, { left: 560, top: 275, width: 160, height: 60, background: 'radial-gradient(ellipse, rgba(120,150,200,0.3), rgba(0,0,0,0) 70%)', mixBlendMode: 'screen' });
  rails(near, { vx: 640, vy: 308, x0: 440, x1: 840, y0: H + 120, T: T, D: D });
  box(near, { left: 640, top: 470, width: 260, height: 120, background: 'radial-gradient(ellipse, rgba(255,50,30,0.35), rgba(0,0,0,0) 70%)', mixBlendMode: 'screen' });
  redLamp(near, { x: 760, y: 492, s: 0.55, T: T, D: D });
  // signalman, back to us, small
  const sm = box(near, { left: 690, top: 396, width: 60, height: 100, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 60 100" width="60" height="100" style="overflow:visible"><rect x="20" y="62" width="8" height="36" rx="3" fill="#050608"/><rect x="32" y="62" width="8" height="36" rx="3" fill="#050608"/><path d="M14 22 Q14 14 30 14 Q46 14 46 24 L48 70 L12 70Z" fill="#07090e"/><path d="M12 26 L8 62 M48 26 L52 62" stroke="#07090e" stroke-width="6" stroke-linecap="round"/><g id="hd" style="transform-origin:30px 12px"><circle cx="30" cy="9" r="8.5" fill="#06080c"/><path d="M21 6 Q30 -3 39 6 L41 7 H19Z" fill="#040507"/><ellipse id="fc" cx="35" cy="11" rx="3.4" ry="4.2" fill="#9fb4d6" opacity="0"/></g></svg>`);
  const hd = sm.querySelector('#hd'), fc = sm.querySelector('#fc');
  tl.fromTo(sm, { scaleX: 1 }, { scaleX: 0.6, duration: 1.2, ease: 'sine.inOut' }, t(60));     // 'He turned' toward the tunnel
  tl.fromTo(hd, { rotation: 0 }, { rotation: -3, duration: 5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t(61));
  tl.to(hd, { rotation: -16, duration: 2.6, ease: 'sine.inOut' }, t(67));                      // slowly lifts his head up the cutting
  tl.to(sm, { scaleX: 0.95, duration: 2.4, ease: 'sine.inOut' }, t(67.4));
  tl.to(fc, { opacity: 0.85, duration: 2, ease: 'sine.in' }, t(68.5));
  tl.fromTo(sm, { y: 0 }, { y: -1.2, duration: 2.4, yoyo: true, repeat: Math.floor(D / 2.4), ease: 'sine.inOut' }, T);
  steam(near, { x: 722, y: 402, n: 3, s: 0.25, dx: -6, dy: -22, color: 'rgba(200,215,235,0.3)', T: t(30), D: D });
  mist(near, { y: 380, h: 200, op: 0.35, n: 4, T: T, D: D, seed: 14, speed: 0.5 });
  steam(near, { x: 640, y: 330, n: 4, s: 2.2, dx: 10, dy: -80, color: 'rgba(160,175,200,0.18)', T: T, D: D });
  cam(near, [[0, 1], [43, 1.12], [56, 1.32], [80, 2.2]], [0, -8, -26, -50]);
  // ---- mid: clay walls, zigzag path, sun shaft, drips
  const wallL = '0,0 380,374 340,720 0,720', wallR = '1280,0 900,374 940,720 1280,720';
  cuttingWalls(mid, { innerL: 380, innerR: 900, colorL: '#14100e', colorR: '#0f0c0c', seed: 17 });
  const clip = (p) => ({ clipPath: `polygon(${p.split(' ').map((q) => q.replace(',', 'px ') + 'px').join(',')})` });
  box(mid, Object.assign({ left: 0, top: 0, width: W, height: H, background: 'linear-gradient(100deg, rgba(20,16,14,0) 30%, rgba(70,88,115,0.4) 100%)' }, clip(wallL)));
  box(mid, Object.assign({ left: 0, top: 0, width: W, height: H, background: 'linear-gradient(260deg, rgba(20,16,14,0) 30%, rgba(70,88,115,0.3) 100%)' }, clip(wallR)));
  const R = rr(77);
  for (let i = 0; i < 16; i++) { const y = 60 + R() * 600, x0 = (y < 374 ? (380 * y) / 374 : 380 - (40 * (y - 374)) / 346) * (0.2 + R() * 0.7); const s = R() < 0.5; box(mid, { left: s ? x0 : W - x0 - 60, top: y, width: 40 + R() * 90, height: 4 + R() * 6, background: 'rgba(60,40,32,0.4)', borderRadius: 4, transform: `rotate(${s ? 18 : -18}deg)` }); }
  let tuf = ''; const RT = rr(5);
  for (let i = 0; i < 70; i++) { const u = i / 70, y = u * 374, xl = 380 * u, xr = W - 380 * u, h = 8 + RT() * 16; tuf += `<path d="M${xl - 4} ${y} l${3 + RT() * 4} ${-h} l4 ${h}Z M${xr - 4} ${y} l${-3 - RT() * 4} ${-h} l4 ${h}Z" fill="#050605"/>`; }
  box(mid, { left: 0, top: 0, width: W, height: H }, `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${tuf}<path d="M0 0 L380 374 L340 720 M1280 0 L900 374 L940 720" stroke="rgba(150,175,210,0.28)" stroke-width="2" fill="none"/></svg>`);
  const zz = 'M15 70 L120 150 L35 235 L230 330 L110 420 L330 520 L230 610 L330 690';
  const path = box(mid, { left: 0, top: 0, width: W, height: H }, `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" fill="none" stroke-linejoin="round" stroke-linecap="round"><path d="${zz}" stroke="#030304" stroke-width="16"/><path class="zp" d="${zz}" pathLength="1" stroke="#6b5646" stroke-width="8" stroke-dasharray="1" stroke-dashoffset="1" opacity="0.75"/><path d="${zz}" stroke="#a89888" stroke-width="1.5" stroke-dasharray="3 9" opacity="0.4" transform="translate(0 -6)"/></svg>`);
  tl.to(path.querySelector('.zp'), { strokeDashoffset: 0, duration: 14, ease: 'sine.inOut' }, t(10));   // the zigzag path draws down the wall
  const beam = box(mid, Object.assign({ left: 0, top: 0, width: W, height: H, background: 'linear-gradient(115deg, rgba(255,226,160,0.13), rgba(255,226,160,0.02))', mixBlendMode: 'screen', filter: 'blur(5px)', opacity: 0.9 }, clip('380,0 760,0 1060,390 980,230')));
  const patch = box(mid, Object.assign({ left: 0, top: 0, width: W, height: H, mixBlendMode: 'screen', opacity: 0.9 }, clip(wallR)), `<div class="abs" style="left:1000px;top:190px;width:200px;height:260px;border-radius:50%;background:radial-gradient(ellipse, rgba(255,220,150,0.5), rgba(255,200,120,0) 70%)"></div>`);
  tl.to([beam, patch], { opacity: 0.55, duration: 8, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T);
  tl.to([beam, patch], { opacity: 0, duration: 14, ease: 'sine.in' }, t(52));                     // the weak sun thins out as we descend
  for (let i = 0; i < 34; i++) {                                                                  // dripping water: glints and drops
    const s = R() < 0.5, y = 40 + R() * 640, mx = y < 374 ? (380 * y) / 374 : 380 - (40 * (y - 374)) / 346, x0 = 6 + R() * (mx - 12), x = s ? x0 : W - x0;
    const g = box(mid, { left: x, top: y, width: 2.4, height: 2.4, borderRadius: '50%', background: '#cfe0ff', opacity: 0.1, boxShadow: '0 0 6px 2px rgba(190,215,255,0.6)' });
    tl.to(g, { opacity: 0.8, duration: 0.5 + R() * 1.4, yoyo: true, repeat: Math.floor(D / 2), ease: 'sine.inOut', repeatDelay: R() * 2 }, T + R() * 4);
    if (i % 3 === 0) { const d = box(mid, { left: x, top: y + 4, width: 1.5, height: 9, background: 'rgba(200,220,255,0.7)', opacity: 0 }); tl.fromTo(d, { y: 0, opacity: 0.8 }, { y: 70 + R() * 80, opacity: 0, duration: 0.9 + R() * 0.5, ease: 'power1.in', repeat: Math.floor(D / 3), repeatDelay: 1 + R() * 2 }, T + R() * 5); }
  }
  cam(mid, [[0, 1], [43, 1.16], [56, 1.4], [80, 2.7]], [0, -10, -34, -70]);
  // ---- narrator on the rim, calling down (he rises out of frame during the descent)
  const nr = box(L, { left: 0, top: 0, width: W, height: H, zIndex: 5 });
  box(nr, { left: 0, top: -4, width: W, height: 40, background: 'linear-gradient(#010203, rgba(1,2,3,0))' });
  box(nr, { left: 930, top: 40, width: 150, height: 150 }, `<svg viewBox="0 0 150 150" width="150" height="150" style="overflow:visible"><path d="M18 -60 L22 20 Q30 44 75 46 Q120 44 128 20 L132 -60Z" fill="#020304"/><circle cx="75" cy="66" r="19" fill="#020304"/><path d="M57 60 Q57 34 75 34 Q93 34 93 60Z" fill="#010203"/><rect x="50" y="58" width="50" height="5" rx="2" fill="#010203"/><g id="arm" style="transform-origin:112px 30px"><path d="M112 30 L100 62" stroke="#020304" stroke-width="13" stroke-linecap="round"/></g></svg>`);
  const nrFig = nr.children[1], arm = nrFig.querySelector('#arm');
  tl.set(arm, { rotation: 168 }, 0);
  tl.to(arm, { rotation: 0, duration: 1.0, ease: 'sine.out' }, t(55.4));
  tl.to(arm, { rotation: 168, duration: 1.6, ease: 'sine.inOut' }, t(60.5));
  tl.fromTo(nrFig, { y: 0 }, { y: 3, duration: 3, yoyo: true, repeat: 8, ease: 'sine.inOut' }, T);
  glow(nr, { x: 1005, y: 130, r: 120, color: 'rgba(160,190,230,0.12)', op: 0.6, T: T, D: 56, flicker: false });
  tl.to(nr, { y: -260, opacity: 0, duration: 16, ease: 'sine.in' }, t(58));
  // ---- fog thickens, light thins
  const fog = box(L, { left: 0, top: 0, width: W, height: H, opacity: 0.3, zIndex: 6 });
  mist(fog, { y: 160, h: 360, op: 0.55, n: 6, T: T, D: D, seed: 31, speed: 0.8, color: 'rgba(150,168,190,0.6)' });
  tl.to(fog, { opacity: 0.5, duration: 20 }, t(30)); tl.to(fog, { opacity: 0.95, duration: 14, ease: 'sine.in' }, t(58));
  const dark = box(L, { left: 0, top: 0, width: W, height: H, background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,6,0) 25%, rgba(0,0,6,0.9) 100%)', opacity: 0.25, zIndex: 7 });
  tl.to(dark, { opacity: 1, duration: 60, ease: 'none' }, t(20));
  // ---- ending: bearded signalman facing us, cold rim light, red glow on the ground
  const cl = box(L, { left: 0, top: 0, width: W, height: H, opacity: 0, zIndex: 8 });
  box(cl, { left: 0, top: 0, width: W, height: H, background: 'radial-gradient(ellipse at 50% 42%, rgba(30,42,62,0.92) 0%, rgba(5,7,12,0.97) 70%)' });
  box(cl, { left: 240, top: 500, width: 800, height: 220, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,45,30,0.55), rgba(120,10,10,0.15) 50%, rgba(0,0,0,0) 72%)', mixBlendMode: 'screen' });
  mist(cl, { y: 420, h: 200, op: 0.3, n: 4, T: t(70), D: D - 70, seed: 41 });
  const fig = box(cl, { left: 490, top: 100, width: 300, height: 520, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 300 520" width="300" height="520"><defs><linearGradient id="fcg" x1="0" x2="1"><stop offset="0" stop-color="#2b3a52"/><stop offset="1" stop-color="#0b0f16"/></linearGradient><linearGradient id="rd" x1="0" y1="0" x2="0" y2="1"><stop offset="0.6" stop-color="#ff3b2a" stop-opacity="0"/><stop offset="1" stop-color="#ff3b2a" stop-opacity="0.35"/></linearGradient></defs><path d="M40 200 Q40 140 135 125 L165 125 Q260 140 260 200 L275 420 L255 520 L45 520 L25 420Z" fill="#06080c"/><path d="M62 200 L48 430 M238 200 L252 430" stroke="#121823" stroke-width="3" fill="none"/><path d="M40 200 Q40 140 135 125 L165 125 Q260 140 260 200 L275 420 L255 520 L45 520 L25 420Z" fill="url(#rd)"/><ellipse cx="150" cy="80" rx="34" ry="42" fill="#090b10"/><ellipse cx="148" cy="76" rx="25" ry="29" fill="url(#fcg)"/><path d="M118 82 Q124 138 150 144 Q176 138 182 82 Q166 102 150 102 Q134 102 118 82Z" fill="#040508"/><path d="M114 50 Q114 20 150 18 Q186 20 186 50Z" fill="#05070b"/><path d="M108 50 H192 L198 58 H102Z" fill="#05070b"/><path d="M128 63 L146 68 M172 63 L154 68" stroke="#05070b" stroke-width="3" stroke-linecap="round"/><ellipse cx="138" cy="74" rx="5.5" ry="3.8" fill="#d6e4ff" opacity="0.85"/><ellipse cx="162" cy="74" rx="5.5" ry="3.8" fill="#d6e4ff" opacity="0.85"/><circle cx="138" cy="74" r="2.2" fill="#04050a"/><circle cx="162" cy="74" r="2.2" fill="#04050a"/><g fill="none" stroke-linecap="round"><path d="M117 56 Q110 92 124 122 M42 196 Q46 150 118 130" stroke="#b9d3ff" stroke-width="7" opacity="0.18"/><path d="M117 56 Q110 92 124 122 M42 196 Q46 150 118 130" stroke="#d8e8ff" stroke-width="2" opacity="0.85"/></g></svg>`);
  steam(cl, { x: 640, y: 240, n: 3, s: 0.4, dx: -14, dy: -46, color: 'rgba(210,225,245,0.35)', T: t(71), D: D - 71 });
  redLamp(cl, { x: 930, y: 590, s: 1.3, T: t(71), D: D - 71 });
  tl.fromTo(cl, { opacity: 0 }, { opacity: 1, duration: 5, ease: 'sine.inOut' }, t(71.5));
  tl.fromTo(fig, { scale: 1 }, { scale: 1.015, duration: 4, yoyo: true, repeat: 3, ease: 'sine.inOut' }, t(72));
  tl.to(sm, { opacity: 0, duration: 3 }, t(73));
})();
