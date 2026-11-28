// ===== SCENE driver (v2): the cutting at night, the hut with the covered shape, the driver's amber recollection, the narrator =====
(function () {
  const c = S('driver'), w = win('driver'), T = w.T, D = w.D, R = rr(707);
  const K = D / 104.8;                       // beats below are written in seconds of the 104.8 s window
  const sec = (r) => T + r * K, ks = (r) => r * K;
  const world = box(c, { left: 0, top: 0, width: W, height: H });
  // ----- camera on the world box: explicit from/to so seeking anywhere is safe -----
  let cur = { scale: 1, x: 0, y: 0 };
  const cam = (a, b, s, Px, Py, tx = 640, ty = 360, ease = 'sine.inOut') => {
    const to = { scale: s, x: tx - 640 - (Px - 640) * s, y: ty - 360 - (Py - 360) * s };
    tl.fromTo(world, { ...cur }, { ...to, duration: ks(b - a), ease }, sec(a)); cur = to;
  };
  tl.fromTo(world, { rotation: -0.25 }, { rotation: 0.25, duration: 9, yoyo: true, repeat: Math.ceil(D / 9), ease: 'sine.inOut' }, T);   // slow sway
  // local breathing (torso, head, coat tail, whole-body sway) that leaves the arms free for gestures
  const breathe = (p, T0, D0, amt = 1, sway = true) => {
    const n = Math.max(1, Math.floor(D0 / 3.4));
    tl.to(p.P.t, { scaleY: 1 + 0.014 * amt, duration: 1.7, yoyo: true, repeat: n * 2, ease: 'sine.inOut' }, T0);
    tl.to(p.P.h, { y: -1.1 * amt, duration: 1.7, yoyo: true, repeat: n * 2, ease: 'sine.inOut' }, T0 + 0.15);
    tl.to(p.P.tail, { rotation: 1.6, duration: 2.4, yoyo: true, repeat: Math.floor(D0 / 2.4), ease: 'sine.inOut' }, T0);
    if (sway) tl.to(p.g, { rotation: 0.5 * amt, duration: 4.5, yoyo: true, repeat: Math.max(1, Math.floor(D0 / 4.5)), ease: 'sine.inOut', transformOrigin: '50% 100%' }, T0);
  };

  // pale ghost pose (arm across the face + waving arm)
  function pose(p, o) {
    const s = o.s, id = 'pg' + ((o.x * 7 + o.T0) | 0), col = '#f2f7ff', fill = '#e9f2ff';
    const g = box(p, { left: o.x - 60 * s, top: o.y - 230 * s, width: 120 * s, height: 230 * s, opacity: 0, filter: 'drop-shadow(0 0 7px rgba(215,232,255,0.95)) drop-shadow(0 0 22px rgba(120,165,255,0.6))' });
    g.innerHTML = `<svg viewBox="0 0 120 230" width="100%" height="100%" style="overflow:visible"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${fill}" stop-opacity="0.85"/><stop offset="0.65" stop-color="#b8cdf2" stop-opacity="0.5"/><stop offset="1" stop-color="#8aa6e0" stop-opacity="0"/></linearGradient></defs><path d="M36 58 Q50 50 66 56 Q72 80 74 130 Q80 180 88 224 Q70 214 62 226 Q50 214 38 226 Q30 214 24 224 Q36 170 40 130 Q38 90 36 58Z" fill="url(#${id})"/><circle cx="52" cy="34" r="14" fill="${fill}" fill-opacity="0.8"/><path d="M40 64 Q22 62 27 46 Q32 34 52 32" stroke="${col}" stroke-opacity="0.92" stroke-width="9" stroke-linecap="round" fill="none"/><g class="ga"><path d="M66 60 Q86 52 96 34 Q102 22 100 8" stroke="${col}" stroke-opacity="0.92" stroke-width="8" stroke-linecap="round" fill="none"/><circle cx="100" cy="5" r="6" fill="${col}"/></g></svg>`;
    const arm = g.querySelector('.ga');
    tl.fromTo(g, { opacity: 0 }, { opacity: o.max || 0.8, duration: o.fin || 2.5, ease: 'sine.inOut' }, o.T0);
    tl.fromTo(arm, { rotation: -16, svgOrigin: '66 60' }, { rotation: 24, svgOrigin: '66 60', duration: o.per, repeat: Math.floor((o.T1 - o.T0) / o.per), yoyo: true, ease: 'sine.inOut' }, o.T0 + 0.5);
    tl.to(g, { opacity: 0, duration: o.fout || 2.5, ease: 'sine.in' }, o.T1);
    return g;
  }
  // backdrop: sky (far), ridge (far), ground, tunnel, walls, rails. o.far = container for sky + ridge (parallax)
  function cutting(p, o) {
    const fp = o.far || p;
    sky(fp, { ...o.sky, stars: o.stars ?? 60, seed: o.seed || 61, T: o.T, D: o.D, moon: o.moon });
    ridge(fp, { y: o.ry ?? 250, h: 260, color: o.ridge || '#111a2c', amp: 70, seed: (o.seed || 61) + 1, trees: 18, treeH: 90, T: o.T, D: o.D, drift: -30 });
    box(p, { left: 0, top: o.y, width: W, height: H - o.y, background: o.ground || 'linear-gradient(#10172a, #090c16)' });
    tunnel(p, { x: o.x, y: o.y, w: o.w, h: o.h, T: o.T, D: o.D, seed: 4 });
    if (o.walls !== false) cuttingWalls(p, { innerL: o.iL ?? 330, innerR: o.iR ?? 950, colorL: o.wall || '#161a2a', colorR: o.wall || '#161a2a' });
    rails(p, { vx: o.x, vy: o.y, x0: o.x - o.w * 0.5, x1: o.x + o.w * 0.5, y0: o.y0 ?? 740, color: o.rail });
  }
  const pool = (p, x, y, w, h, col, op = 1) => box(p, { left: x - w / 2, top: y - h / 2, width: w, height: h, background: `radial-gradient(ellipse, ${col}, rgba(0,0,0,0) 70%)`, mixBlendMode: 'screen', opacity: op });

  // ================= NIGHT CUTTING =================
  const night = box(world, { left: 0, top: 0, width: W, height: H });
  const far = box(night, { left: 0, top: 0, width: W, height: H });
  cutting(night, { far, sky: { top: '#0b1634', mid: '#1f3468', bot: '#54739f' }, moon: { x: 980, y: 118, r: 22 }, x: 560, y: 440, w: 330, h: 250, T, D, seed: 61 });
  tl.to(far, { x: -26, duration: D, ease: 'none' }, T);
  glow(night, { x: 560, y: 380, r: 260, color: 'rgba(90,130,210,0.45)', op: 0.55, T, D, flicker: false });   // cold glow out of the tunnel
  mist(night, { y: 420, h: 160, op: 0.4, n: 4, T, D, speed: 1.2, seed: 8, color: 'rgba(150,175,215,0.5)' });
  lightCone(night, { x: 980, y: 140, len: 560, spread: 280, rot: 34, color: 'rgba(150,185,255,0.42)', op: 0.5, T, D });   // moonlight into the cutting
  // locomotive waiting in the dark at the right, firebox glow, steam, embers
  box(night, { left: 1010, top: 372, width: 380, height: 200, background: 'linear-gradient(#1a1e2c,#0b0d14)', borderRadius: '70px 8px 0 0' });
  box(night, { left: 1090, top: 312, width: 30, height: 64, background: '#0e1119' }); box(night, { left: 1220, top: 334, width: 44, height: 48, borderRadius: '22px 22px 0 0', background: '#0e1119' });
  box(night, { left: 1010, top: 372, width: 380, height: 3, background: 'rgba(150,185,255,0.35)' });
  glow(night, { x: 1140, y: 520, r: 190, color: 'rgba(255,115,35,0.7)', op: 0.8, T, D });
  steam(night, { x: 1105, y: 312, n: 6, dx: -50, dy: -180, s: 1.7, color: 'rgba(190,200,220,0.3)', T, D });
  motes(night, { x0: 1030, x1: 1250, y0: 330, y1: 540, n: 16, color: 'rgba(255,150,60,0.95)', T, D, size: 2.6, rise: -110, seed: 31 });
  // foreground bank (driver sits on it) with a rim of warm light
  box(night, { left: 0, top: 0, width: W, height: H }, `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><defs><linearGradient id="bk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b2133"/><stop offset="0.5" stop-color="#0d111c"/><stop offset="1" stop-color="#070910"/></linearGradient></defs><path d="M560 640 Q620 526 760 514 Q900 506 1000 524 L1290 566 L1290 720 L560 720Z" fill="url(#bk)"/><path d="M620 556 Q690 520 760 514 Q900 506 1000 524" stroke="rgba(255,175,100,0.5)" stroke-width="2.4" fill="none"/></svg>`);
  // the driver's hurricane lamp on the bank + big warm pool (the key light)
  pool(night, 900, 590, 620, 96, 'rgba(255,170,80,0.55)', 0.9);
  lamp(night, { x: 930, y: 530, s: 1.25, r: 230, T, D });
  lightCone(night, { x: 930, y: 440, len: 260, spread: 230, rot: 0, color: 'rgba(255,190,110,0.28)', op: 0.5, T, D });
  // the signalman's red lamp by the tunnel mouth
  redLamp(night, { x: 505, y: 478, s: 0.95, T, D });
  // ---- Part A group: bystanders with lamps, the man in the blue coat who takes the narrator's arm ----
  const grp = box(night, { left: 0, top: 0, width: W, height: H });
  pool(grp, 330, 575, 600, 90, 'rgba(255,170,80,0.5)', 0.9);
  const by1 = puppet(grp, { x: 190, y: 570, s: 1.12, hat: 'top', lamp: 'right', T, D: ks(12), rim: 'rgba(255,190,120,0.6)' });
  const by2 = puppet(grp, { x: 292, y: 572, s: 1.05, hat: 'cap', rim: 'rgba(255,190,120,0.6)' });
  const man = puppet(grp, { x: 585, y: 570, s: 1.12, hat: 'cap', flip: true, coat: '#243a78', coat2: '#142250', rim: 'rgba(160,190,255,0.75)' });
  man.g.style.transform = ''; gsap.set(man.g, { scaleX: -1 });
  [by1, by2, man].forEach((p, i) => breathe(p, T + i * 0.4, ks(14), 1));
  by1.head(-8, sec(1.5), 2); by1.head(6, sec(5), 2.2); by1.head(-6, sec(9), 2);
  by2.head(8, sec(2), 2); by2.head(-6, sec(6.5), 2.2); by2.arm('f', -20, -60, sec(7.5), 1.6); by2.arm('f', -4, -4, sec(10), 1.4);
  man.arm('f', -78, -18, sec(0.2), 0.9); man.arm('f', -72, -14, sec(3.8), 1.4); man.arm('f', -80, -20, sec(4.9), 0.8);   // reaches for, holds the narrator's arm
  man.head(-6, sec(1), 1.4); man.head(5, sec(4.2), 1.6);
  man.arm('b', -125, -30, sec(8.9), 1.0); man.arm('b', -118, -20, sec(10), 1.0);        // gestures toward the tunnel: "the engine got him"
  tl.to(grp, { opacity: 0, duration: 1.0, ease: 'sine.in' }, sec(12.8));
  // ---- the narrator: stands throughout, listens ----
  const nar = puppet(night, { x: 428, y: 572, s: 1.12, hat: 'top', rim: 'rgba(150,185,255,0.7)' });
  breathe(nar, T, D, 1.1);
  nar.head(4, T, 0.2); nar.head(10, sec(3.6), 1.8); nar.head(-2, sec(9.5), 2.4);                                          // bowed at "He is gone, sir"
  nar.arm('f', 22, 4, sec(0.8), 0.6); nar.arm('f', 6, 2, sec(2.6), 1.6);                                                   // his arm is taken
  nar.arm('f', -4, -4, sec(12.5), 2);
  nar.head(-8, sec(17), 3); nar.head(2, sec(24), 3); nar.head(8, sec(30), 2.6);                                          // looks toward tunnel, then toward the driver
  nar.head(-4, sec(44), 2.4); nar.head(6, sec(49), 2.6);
  nar.head(-9, sec(56), 0.5);                                                                                             // the shout reaches him
  nar.arm('f', 60, 120, sec(62), 1.6); nar.arm('f', 58, 112, sec(66), 3); nar.arm('f', -3, -3, sec(71), 2);              // hand to his lips: "I did not say a word"
  nar.head(8, sec(77), 2.2); nar.head(-3, sec(86), 3); nar.head(7, sec(93), 2.6); nar.head(-1, sec(99), 3);
  nar.arm('b', 14, 10, sec(80), 1.5); nar.arm('b', 4, 4, sec(88), 2);
  nar.arm('f', 4, 3, sec(33), 2); nar.arm('f', -4, -2, sec(40), 2.5); nar.arm('f', 3, 2, sec(52), 2);
  breathFog(night, 428 + 8, 572 - 176 * 1.12, sec(16), ks(88), 2.9, 36);
  // ---- the driver, sitting on the bank, head in his hands ----
  const dw = box(night, { left: 0, top: 0, width: W, height: H });
  gsap.set(dw, { rotation: 5, transformOrigin: '805px 640px' });
  const drv = puppet(dw, { x: 805, y: 640, s: 1.1, hat: 'cap', coat: '#1a2036', coat2: '#0c1020', rim: 'rgba(255,175,100,0.8)', opacity: 0 });
  gsap.set([drv.P.lb, drv.P.lf], { opacity: 0 });
  drv.arm('f', 100, 80, T, 0.1); drv.arm('b', -100, -80, T, 0.1); drv.head(26, T, 0.1);                                   // head down into both hands
  tl.to(drv.g, { opacity: 1, duration: 3 }, sec(15));
  breathe(drv, sec(15), ks(90), 2.4, false);
  for (let t = 17; t < 100; t += 6.5 + R() * 3) tl.to(drv.g, { y: 3, duration: 0.55, yoyo: true, repeat: 3, ease: 'sine.inOut' }, sec(t));   // shoulders shaking
  drv.head(20, sec(48), 2); drv.head(32, sec(56), 2.5); drv.head(24, sec(70), 3); drv.head(10, sec(95), 3);
  drv.arm('b', -86, -60, sec(96), 2.2); drv.arm('f', 92, 60, sec(96), 2.2);                                                // lowers his hands a little, at the very end
  breathFog(night, 805 - 4, 640 - 190 * 1.1, sec(20), ks(80), 3.2, -28);
  motes(night, { x0: 600, x1: 1100, y0: 380, y1: 560, n: 22, color: 'rgba(255,215,160,0.9)', T, D, size: 2.4, rise: -50, seed: 91 });
  box(night, { left: 0, top: 0, width: W, height: H, clipPath: 'inset(0 400px 0 0)' }, `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><defs><linearGradient id="bk2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b2133"/><stop offset="0.5" stop-color="#0d111c"/><stop offset="1" stop-color="#070910"/></linearGradient></defs><path d="M560 640 Q620 526 760 514 Q900 506 1000 524 L1290 566 L1290 720 L560 720Z" fill="url(#bk2)"/><path d="M620 556 Q690 520 760 514 Q900 506 1000 524" stroke="rgba(255,175,100,0.5)" stroke-width="2.4" fill="none"/></svg>`);   // bank in front of the driver's lower body
  // ghost over the driver: "I knew the gesture ... now I knew whose it was"
  pose(night, { x: 706, y: 560, s: 1.0, T0: sec(73), T1: sec(82), per: 0.8, max: 0.4, fin: 3.5, fout: 3.5 });
  pose(night, { x: 580, y: 480, s: 0.85, T0: sec(94), T1: sec(101), per: 0.9, max: 0.3, fin: 3, fout: 3 });
  // foreground mist + grass silhouettes (nearest layer, strongest parallax)
  const near = box(night, { left: 0, top: 0, width: W, height: H });
  mist(near, { y: 560, h: 170, op: 0.4, n: 3, T, D, speed: 1.6, seed: 44, color: 'rgba(150,175,215,0.5)' });
  let gr = ''; for (let i = 0; i < 46; i++) { const x = R() * 1500 - 100, hh = 30 + R() * 60; gr += `<path d="M${x} 730 Q${x + (R() - 0.5) * 24} ${730 - hh * 0.6} ${x + (R() - 0.5) * 36} ${730 - hh}" stroke="#04060b" stroke-width="${2 + R() * 2.5}" fill="none"/>`; }
  box(near, { left: -100, top: 0, width: W + 200, height: H }, `<svg viewBox="-100 0 ${W + 200} ${H}" width="${W + 200}" height="${H}">${gr}</svg>`);
  tl.to(near, { x: -34, duration: D, ease: 'none' }, T);

  // ================= INTERIOR: the signal hut, the covered shape, the dead stove (10.7 - 16.5 s) =================
  const inn = box(c, { left: 0, top: 0, width: W, height: H, opacity: 0, background: '#14101a', zIndex: 3 });
  let pl = ''; for (let i = 0; i < 26; i++) pl += `<rect x="${i * 50}" y="0" width="2" height="560" fill="#000" opacity="${0.3 + R() * 0.25}"/>`;
  box(inn, { left: 0, top: 0, width: W, height: 580, background: 'linear-gradient(#2a2433, #3a2a2c 70%, #1a1318)' }, `<svg width="${W}" height="580">${pl}</svg>`);
  box(inn, { left: 0, top: 540, width: W, height: 180, background: 'linear-gradient(#2a1d1d, #0e0a0b)' });
  box(inn, { left: 120, top: 90, width: 170, height: 170, background: 'linear-gradient(#5a7fc0,#243a72)', border: '9px solid #0a0809', boxSizing: 'border-box' }, `<svg width="152" height="152"><rect x="72" y="0" width="7" height="152" fill="#0a0809"/><rect x="0" y="72" width="152" height="7" fill="#0a0809"/></svg>`);
  lightCone(inn, { x: 205, y: 250, len: 500, spread: 270, rot: -42, color: 'rgba(160,195,255,0.5)', op: 0.55, T: sec(10.5), D: ks(8) });
  box(inn, { left: 1100, top: 300, width: 130, height: 200, background: 'linear-gradient(#2a1d1a,#140e0e)', border: '4px solid #08060a', boxSizing: 'border-box' });   // telegraph shelf
  box(inn, { left: 1122, top: 330, width: 86, height: 50, background: '#3a2b1d', border: '3px solid #0a0809', boxSizing: 'border-box' });
  box(inn, { left: 1045, top: 120, width: 12, height: 330, background: '#1a1416' }); box(inn, { left: 1000, top: 440, width: 100, height: 120, borderRadius: '34px 34px 8px 8px', background: 'linear-gradient(90deg,#0e0e12,#2a2a34 50%,#0e0e12)' });
  box(inn, { left: 1030, top: 478, width: 40, height: 30, borderRadius: 4, background: '#060507' });   // dead stove door
  steam(inn, { x: 1051, y: 140, n: 2, dx: 12, dy: -60, s: 0.9, color: 'rgba(130,140,160,0.14)', T: sec(10.5), D: ks(8) });
  // the covered shape: long cloth mound, folds, boots at the end
  box(inn, { left: 250, top: 452, width: 560, height: 110, filter: 'drop-shadow(0 6px 10px #000)' }, `<svg viewBox="0 0 560 110" width="560" height="110"><defs><linearGradient id="cl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#05060a" stop-opacity="0.55"/><stop offset="0.55" stop-color="#05060a" stop-opacity="0.05"/><stop offset="1" stop-color="#05060a" stop-opacity="0.3"/></linearGradient></defs><path d="M0 104 Q10 60 70 48 Q130 30 210 40 Q300 22 380 36 Q450 40 500 60 L522 100 L0 106Z" fill="#a4acbc"/><path d="M0 104 Q10 60 70 48 Q130 30 210 40 Q300 22 380 36 Q450 40 500 60 L522 100 L0 106Z" fill="url(#cl)"/><path d="M120 50 Q150 80 130 104 M240 38 Q270 74 255 104 M360 36 Q385 70 372 104" stroke="#4a5266" stroke-width="3" fill="none" opacity="0.8"/><path d="M70 48 Q130 30 210 40 Q300 22 380 36" stroke="rgba(190,215,255,0.6)" stroke-width="2.5" fill="none"/><rect x="516" y="66" width="30" height="40" rx="8" fill="#0a090c"/><rect x="540" y="62" width="28" height="42" rx="8" fill="#100e12"/><rect x="516" y="96" width="36" height="8" rx="3" fill="#26202a"/></svg>`);
  box(inn, { left: 870, top: 492, width: 110, height: 70, background: 'linear-gradient(#3b2a1c,#1a110c)', border: '3px solid #0a0809', boxSizing: 'border-box' });   // crate with the lamp
  pool(inn, 760, 590, 800, 120, 'rgba(255,170,80,0.5)', 0.9);
  lamp(inn, { x: 925, y: 462, s: 1.5, r: 260, T: sec(10.5), D: ks(8) });
  const moth = box(inn, { left: 925, top: 440, width: 4, height: 4, borderRadius: '50%', background: '#fff2d0', boxShadow: '0 0 6px #ffd9a0', opacity: 0.9 });
  tl.fromTo(moth, { x: -26 }, { x: 26, duration: 0.9, yoyo: true, repeat: 12, ease: 'sine.inOut' }, sec(10.5));
  tl.fromTo(moth, { y: -18 }, { y: 18, duration: 1.3, yoyo: true, repeat: 8, ease: 'sine.inOut' }, sec(10.5));
  motes(inn, { x0: 200, x1: 960, y0: 250, y1: 540, n: 30, color: 'rgba(255,225,180,0.9)', T: sec(10.5), D: ks(8), size: 2.6, rise: -40, seed: 12 });
  tl.fromTo(inn, { opacity: 0 }, { opacity: 1, duration: ks(1.6), ease: 'sine.inOut' }, sec(10.7)).to(inn, { opacity: 0, duration: ks(1.6), ease: 'sine.inOut' }, sec(14.9));
  tl.fromTo(inn, { scale: 1.0 }, { scale: 1.12, transformOrigin: '66% 78%', duration: ks(5.6), ease: 'none' }, sec(10.7));

  // ================= B: the driver's amber recollection above his head (34.6 - 73.4 s) =================
  const t0 = sec(34.6), L = ks(38.8);
  const fb = box(world, { left: 0, top: 0, width: W, height: H, opacity: 0, zIndex: 5, filter: 'sepia(0.35) saturate(1.25)' });
  const mk2 = 'radial-gradient(ellipse 400px 280px at 640px 235px, #000 58%, rgba(0,0,0,0) 100%)'; fb.style.webkitMaskImage = mk2; fb.style.maskImage = mk2;
  cutting(fb, { sky: { top: '#4a3238', mid: '#c98258', bot: '#ffc27c' }, stars: 0, x: 640, y: 340, w: 250, h: 190, ry: 190, ridge: '#3a2420', ground: 'linear-gradient(#4a2e24,#2b1b17)', wall: '#2e201c', iL: 460, iR: 820, y0: 480, T: t0, D: L, seed: 25, rail: '#3a2a26' });
  redLamp(fb, { x: 520, y: 392, s: 0.6, T: t0, D: L });
  // the signalman, back to the train, watching his red lamp: tiny puppet, breathing; at the last moment he turns his head
  const sg = puppet(fb, { x: 612, y: 400, s: 0.5, hat: 'cap', flip: true, rim: 'rgba(255,205,140,0.85)' });
  sg.g.style.transform = ''; gsap.set(sg.g, { scaleX: -1 });
  breathe(sg, t0, L, 1.2); sg.head(-6, t0 + 6, 2); sg.head(8, t0 + 12, 2);
  sg.arm('f', -12, -30, t0 + 9, 1.5); sg.arm('f', -3, -3, t0 + 13, 1.5);
  sg.head(-22, t0 + ks(17), 1.2);                                                       // turns too late
  trainHeadOn(fb, { x: 640, y: 372, T: t0 + ks(11), D: ks(9), s0: 0.06, s1: 1.7 });
  steam(fb, { x: 640, y: 330, n: 3, dx: 30, dy: -90, s: 1.2, color: 'rgba(255,225,185,0.3)', T: t0 + ks(10), D: ks(12) });
  motes(fb, { x0: 450, x1: 830, y0: 150, y1: 420, n: 14, color: 'rgba(255,225,170,0.9)', T: t0, D: L, size: 2.2, rise: -30, seed: 52 });
  // the cab: bright window, the driver leaning out, one arm across his eyes, the other waving
  const cab = box(fb, { left: 0, top: 0, width: W, height: H, opacity: 0 });
  box(cab, { left: 420, top: 40, width: 440, height: 380, borderRadius: 16, background: 'linear-gradient(#ffd98a, #f08a34 68%, #a04818)', border: '14px solid #1a1010', boxSizing: 'border-box', boxShadow: '0 0 70px 16px rgba(255,160,60,0.55)' });
  glow(cab, { x: 640, y: 200, r: 260, color: 'rgba(255,230,160,0.55)', op: 0.7, T: t0, D: L });
  steam(cab, { x: 540, y: 380, n: 3, dx: 20, dy: -120, s: 1.2, color: 'rgba(255,225,180,0.3)', T: t0, D: L });
  const cd = puppet(cab, { x: 640, y: 440, s: 1.45, hat: 'cap', coat: '#0b0a0d', coat2: '#050406', rim: 'rgba(255,215,150,0.9)' });
  gsap.set([cd.P.lb, cd.P.lf], { opacity: 0 });
  const c0 = t0 + ks(20.6);
  tl.to(cd.P.t, { scaleY: 1.03, duration: 0.5, yoyo: true, repeat: 11, ease: 'sine.inOut' }, t0 + ks(20));
  cd.arm('f', 100, 80, c0, 0.6);                                                        // front arm across his eyes
  cd.arm('b', 150, 20, c0, 0.7); cd.head(-10, c0, 0.6);                                  // other arm up
  tl.to(cd.P.ab, { rotation: 172, duration: 0.3, yoyo: true, repeat: 17, ease: 'sine.inOut' }, c0 + 0.8);   // waves
  tl.to(cd.P.abf, { rotation: -22, duration: 0.3, yoyo: true, repeat: 17, ease: 'sine.inOut' }, c0 + 0.9);
  tl.to(cd.g, { rotation: -4, y: -6, duration: 0.6, yoyo: true, repeat: 7, ease: 'sine.inOut', transformOrigin: '50% 100%' }, c0 + 0.5);   // leans, shouting
  tl.fromTo(cab, { opacity: 0 }, { opacity: 1, duration: 1.2 }, t0 + ks(20)).to(cab, { opacity: 0, duration: 1.1, ease: 'sine.in' }, t0 + ks(25.8));
  const wf = box(fb, { left: 0, top: 0, width: W, height: H, background: '#fff2e0', opacity: 0 });   // soft white flash, slow rise and fall
  tl.fromTo(wf, { opacity: 0 }, { opacity: 0.85, duration: 1.6, ease: 'sine.in' }, t0 + ks(26)).to(wf, { opacity: 0, duration: 3, ease: 'sine.out' }, t0 + ks(27.8));
  tl.fromTo(fb, { opacity: 0 }, { opacity: 1, duration: 3, ease: 'sine.inOut' }, t0).to(fb, { opacity: 0, duration: 2.6, ease: 'sine.inOut' }, t0 + L - 2.6);

  // ================= CAMERA PLAN =================
  cam(0, 0.01, 1.0, 640, 360, 640, 360, 'none');
  cam(0.01, 10.8, 1.14, 480, 440, 640, 390);               // wide, then push toward the narrator and the man who takes his arm
  cam(10.8, 16.5, 1.3, 505, 420, 640, 380);                 // (hidden by the hut) re-aim at the red lamp and tunnel mouth
  cam(16.5, 33, 1.2, 540, 430, 640, 385, 'none');           // slow drift, red lamp pulsing by the tunnel mouth
  cam(33, 46, 1.0, 640, 360);                                // pull out: driver, lamp and the recollection bubble
  cam(46, 54, 1.1, 640, 300);
  cam(54, 62, 1.5, 640, 240, 640, 330);                      // close on the cab for the shout
  cam(62, 74, 1.0, 640, 360);
  cam(74, 92, 1.5, 450, 400, 540, 350);                     // medium on the narrator, red lamp glowing at his shoulder
  cam(92, 104.8, 1.64, 450, 400, 540, 350, 'none');
})();
