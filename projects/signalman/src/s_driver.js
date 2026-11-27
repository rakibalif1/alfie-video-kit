// ===== SCENE driver: the cutting at night, the box with the covered shape, the driver's amber flashback, the narrator =====
(function () {
  const c = S('driver'), w = win('driver'), T = w.T, D = w.D, R = rr(707);
  const at = (f) => T + D * f;
  const world = box(c, { left: 0, top: 0, width: W, height: H });
  drift(world, T, D, { s0: 1.0, s1: 1.05, x0: 0, x1: -12, y0: 0, y1: -4 });

  // pose figure: arm across the face + waving arm. dark:true = solid silhouette (the driver), else pale ghost
  function pose(p, o) {   // o: {x,y(feet),s,T0,T1,per,max,dark,fin}
    const s = o.s, id = 'pg' + ((o.x * 7 + o.T0) | 0), col = o.dark ? '#050403' : '#f2f7ff', fill = o.dark ? '#050403' : '#e9f2ff';
    const g = box(p, { left: o.x - 60 * s, top: o.y - 230 * s, width: 120 * s, height: 230 * s, opacity: 0, filter: o.dark ? 'none' : 'drop-shadow(0 0 7px rgba(215,232,255,0.95)) drop-shadow(0 0 22px rgba(120,165,255,0.6))' });
    g.innerHTML = `<svg viewBox="0 0 120 230" width="100%" height="100%" style="overflow:visible"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${fill}" stop-opacity="0.85"/><stop offset="0.65" stop-color="${o.dark ? '#050403' : '#b8cdf2'}" stop-opacity="${o.dark ? 1 : 0.5}"/><stop offset="1" stop-color="${o.dark ? '#050403' : '#8aa6e0'}" stop-opacity="${o.dark ? 1 : 0}"/></linearGradient></defs><path d="M36 58 Q50 50 66 56 Q72 80 74 130 Q80 180 88 224 Q70 214 62 226 Q50 214 38 226 Q30 214 24 224 Q36 170 40 130 Q38 90 36 58Z" fill="url(#${id})"/><circle cx="52" cy="34" r="14" fill="${fill}" fill-opacity="${o.dark ? 1 : 0.8}"/><path d="M40 64 Q22 62 27 46 Q32 34 52 32" stroke="${col}" stroke-opacity="0.92" stroke-width="9" stroke-linecap="round" fill="none"/><g class="ga"><path d="M66 60 Q86 52 96 34 Q102 22 100 8" stroke="${col}" stroke-opacity="0.92" stroke-width="8" stroke-linecap="round" fill="none"/><circle cx="100" cy="5" r="6" fill="${col}"/></g></svg>`;
    const arm = g.querySelector('.ga');
    tl.fromTo(g, { opacity: 0 }, { opacity: o.max || 0.8, duration: o.fin || 2.5, ease: 'sine.inOut' }, o.T0);
    tl.fromTo(arm, { rotation: -16, svgOrigin: '66 60' }, { rotation: 24, svgOrigin: '66 60', duration: o.per, repeat: Math.floor((o.T1 - o.T0) / o.per), yoyo: true, ease: 'sine.inOut' }, o.T0 + 0.5);
    tl.to(g, { opacity: 0, duration: o.fout || 2.5, ease: 'sine.in' }, o.T1);
    return g;
  }
  // simple standing silhouette (side-ish). o: {x,y,s,col,hat,flip,reach}
  function stand(p, o) {
    const s = o.s || 1, e = box(p, { left: o.x - 40 * s, top: o.y - 190 * s, width: 80 * s, height: 190 * s, transform: o.flip ? 'scaleX(-1)' : 'none' });
    const col = o.col || '#07090e';
    e.innerHTML = `<svg viewBox="0 0 80 190" width="100%" height="100%" style="overflow:visible"><rect x="30" y="100" width="9" height="86" rx="4" fill="${col}"/><rect x="42" y="100" width="9" height="86" rx="4" fill="${col}"/><path d="M26 36 Q40 28 54 36 L58 118 L24 118Z" fill="${col}"/><circle cx="40" cy="20" r="11" fill="${col}"/>${o.hat ? `<rect x="26" y="9" width="28" height="4" fill="${col}"/><rect x="30" y="-6" width="20" height="16" rx="2" fill="${col}"/>` : ''}${o.reach ? `<path d="M34 44 L2 76" stroke="${col}" stroke-width="9" stroke-linecap="round"/>` : `<path d="M30 44 L26 100" stroke="${col}" stroke-width="8" stroke-linecap="round"/>`}</svg>`;
    return e;
  }
  const NIGHT = { top: '#03040e', mid: '#0a1330', bot: '#1c2b52' };
  // cutting backdrop: sky, ridge, tunnel, walls, rails. o: {x,y,w,h,vy}
  function cutting(p, o) {
    sky(p, { ...o.sky, stars: o.stars ?? 50, seed: o.seed || 61, T: o.T, D: o.D });
    ridge(p, { y: o.ry ?? 260, h: 260, color: o.ridge || '#0a0d17', amp: 70, seed: (o.seed || 61) + 1, trees: 18, treeH: 90, T: o.T, D: o.D, drift: -30 });
    box(p, { left: 0, top: o.y, width: W, height: H - o.y, background: o.ground || '#06070b' });
    tunnel(p, { x: o.x, y: o.y, w: o.w, h: o.h, T: o.T, D: o.D, seed: 4 });
    if (o.walls !== false) cuttingWalls(p, { innerL: o.iL ?? 330, innerR: o.iR ?? 950, colorL: o.wall || '#0b0a0d', colorR: o.wall || '#0b0a0d' });
    rails(p, { vx: o.x, vy: o.y, x0: o.x - o.w * 0.5, x1: o.x + o.w * 0.5, y0: o.y0 ?? 740 });
  }

  // ---------- BASE: night cutting (parts A, B, C) ----------
  const night = box(world, { left: 0, top: 0, width: W, height: H });
  cutting(night, { sky: NIGHT, x: 560, y: 440, w: 330, h: 250, T: T, D: D, seed: 61 });
  mist(night, { y: 420, h: 160, op: 0.32, n: 4, T: T, D: D, speed: 1.2, seed: 8 });
  // locomotive waiting in the dark at the right, steam drifting, faint firebox glow
  box(night, { left: 930, top: 380, width: 360, height: 190, background: 'linear-gradient(#07080c,#030406)', borderRadius: '70px 8px 0 0' });
  box(night, { left: 1010, top: 320, width: 30, height: 64, background: '#05060a' }); box(night, { left: 1140, top: 340, width: 44, height: 48, borderRadius: '22px 22px 0 0', background: '#06070b' });
  glow(night, { x: 1100, y: 520, r: 120, color: 'rgba(255,110,30,0.55)', op: 0.5, T: T, D: D });
  steam(night, { x: 1025, y: 320, n: 6, dx: -40, dy: -170, s: 1.6, color: 'rgba(190,195,210,0.25)', T: T, D: D });
  // bank + lamp + driver (head in hands) for parts B and C
  box(night, { left: 520, top: 520, width: 760, height: 200, background: '#050507', borderRadius: '60% 40% 0 0 / 50% 30% 0 0' });
  const dlamp = lamp(night, { x: 880, y: 536, s: 1.1, T: T, D: D });
  box(night, { left: 640, top: 588, width: 400, height: 40, background: 'radial-gradient(ellipse, rgba(255,170,80,0.28), rgba(0,0,0,0) 70%)' });
  const drv = box(night, { left: 700, top: 440, width: 120, height: 130, opacity: 0, filter: 'drop-shadow(3px 0 2px rgba(255,160,70,0.5))' });
  drv.innerHTML = `<svg viewBox="0 0 120 130" width="100%" height="100%" style="overflow:visible"><path d="M50 118 Q34 80 54 50" stroke="#07090e" stroke-width="26" stroke-linecap="round" fill="none"/><path d="M50 120 L96 96" stroke="#07090e" stroke-width="20" stroke-linecap="round"/><path d="M96 96 L100 126" stroke="#07090e" stroke-width="14" stroke-linecap="round"/><path d="M60 72 Q88 82 80 46" stroke="#0a0c12" stroke-width="9" stroke-linecap="round" fill="none"/><circle cx="68" cy="40" r="12" fill="#07090e"/></svg>`;
  tl.fromTo(drv, { opacity: 0 }, { opacity: 1, duration: 3 }, at(0.27));
  tl.to(drv, { y: 2, duration: 2.2, yoyo: true, repeat: Math.floor(D * 0.7 / 2.2), ease: 'sine.inOut' }, at(0.3));  // slow sobbing breath
  // narrator stands motionless throughout
  const nar = stand(night, { x: 410, y: 585, s: 1.5, hat: true, col: '#05070c' });
  // PART A group: lamps, bystanders, blue-coat man taking the narrator's arm
  const grp = box(night, { left: 0, top: 0, width: W, height: H });
  [{ x: 200, s: 1.45 }, { x: 270, s: 1.35 }, { x: 300, s: 1.5, hat: true }].forEach((m) => stand(grp, { x: m.x, y: 585, s: m.s, hat: m.hat, col: '#05070c' }));
  stand(grp, { x: 520, y: 585, s: 1.5, flip: true, reach: true, hat: true, col: '#0d1a3a' });
  lamp(grp, { x: 330, y: 470, s: 1.3, T: T, D: D * 0.3 }); lamp(grp, { x: 560, y: 505, s: 1.2, T: T, D: D * 0.3 });
  box(grp, { left: 200, top: 560, width: 460, height: 40, background: 'radial-gradient(ellipse, rgba(255,170,80,0.3), rgba(0,0,0,0) 70%)' });
  tl.to(grp, { opacity: 0, duration: 3.5, ease: 'sine.in' }, at(0.27));

  // ---------- INTERIOR: the signal box, cloth-covered shape, dead stove ----------
  const inn = box(c, { left: 0, top: 0, width: W, height: H, opacity: 0, background: '#07060a', zIndex: 3 });
  let pl = ''; for (let i = 0; i < 26; i++) pl += `<rect x="${i * 50}" y="0" width="2" height="560" fill="#000" opacity="${0.35 + R() * 0.3}"/>`;
  box(inn, { left: 0, top: 0, width: W, height: 560, background: 'linear-gradient(#0c0b10, #120e0f 70%, #08060a)' }, `<svg width="${W}" height="560">${pl}</svg>`);
  box(inn, { left: 0, top: 540, width: W, height: 180, background: 'linear-gradient(#0a0707, #030203)' });
  box(inn, { left: 753, top: 0, width: 14, height: 420, background: '#0c0a0b' }); box(inn, { left: 710, top: 410, width: 100, height: 130, borderRadius: '34px 34px 8px 8px', background: 'linear-gradient(90deg,#08080a,#16151a 50%,#08080a)' });
  box(inn, { left: 738, top: 450, width: 44, height: 34, borderRadius: 4, background: '#050405' });   // dead stove door
  steam(inn, { x: 760, y: 120, n: 2, dx: 12, dy: -60, s: 0.9, color: 'rgba(110,115,130,0.12)', T: T, D: D });
  box(inn, { left: 1040, top: 110, width: 120, height: 160, background: 'linear-gradient(#0a0b12,#12172a)', border: '8px solid #050405', boxSizing: 'border-box' });
  // the covered shape: long cloth mound, folds, boots at the end
  box(inn, { left: 270, top: 468, width: 560, height: 110, filter: 'drop-shadow(0 6px 10px #000)' }, `<svg viewBox="0 0 560 110" width="560" height="110"><path d="M0 104 Q10 60 70 48 Q130 30 210 40 Q300 22 380 36 Q450 40 500 60 L522 100 L0 106Z" fill="#7d8594"/><path d="M0 104 Q10 60 70 48 Q130 30 210 40 Q300 22 380 36 Q450 40 500 60 L522 100 L0 106Z" fill="url(#cl)"/><defs><linearGradient id="cl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#05060a" stop-opacity="0.75"/><stop offset="0.6" stop-color="#05060a" stop-opacity="0.15"/><stop offset="1" stop-color="#05060a" stop-opacity="0.5"/></linearGradient></defs><path d="M120 50 Q150 80 130 104 M240 38 Q270 74 255 104 M360 36 Q385 70 372 104" stroke="#3a4050" stroke-width="3" fill="none" opacity="0.8"/><path d="M500 60 Q560 56 556 84 L530 98 L508 90Z" fill="#8a909c" opacity="0.35"/><rect x="516" y="66" width="30" height="40" rx="8" fill="#050405"/><rect x="540" y="62" width="28" height="42" rx="8" fill="#08070a"/><rect x="516" y="96" width="36" height="8" rx="3" fill="#161316"/></svg>`);
  const iLamp = lamp(inn, { x: 620, y: 520, s: 1.3, T: T, D: D }); box(inn, { left: 520, top: 540, width: 480, height: 50, background: 'radial-gradient(ellipse, rgba(255,175,80,0.2), rgba(0,0,0,0) 70%)' });
  for (let i = 0; i < 16; i++) { const m = box(inn, { left: 300 + R() * 600, top: 250 + R() * 280, width: 2.5, height: 2.5, borderRadius: '50%', background: '#ffd9a0', opacity: 0 }); tl.fromTo(m, { y: 0, opacity: 0 }, { y: -30 - R() * 40, opacity: 0.5, duration: 4 + R() * 3, yoyo: true, repeat: Math.floor(D * 0.2 / 6), ease: 'sine.inOut' }, T + R() * 6); }
  tl.fromTo(inn, { opacity: 0 }, { opacity: 1, duration: 2.5, ease: 'sine.inOut' }, at(0.12)).to(inn, { opacity: 0, duration: 2.5, ease: 'sine.inOut' }, at(0.27) - 1);
  tl.fromTo(inn, { scale: 1.0 }, { scale: 1.05, transformOrigin: '50% 80%', duration: D * 0.17, ease: 'none' }, at(0.12));

  // ---------- B: amber flashback bubble above the driver ----------
  const t0 = at(0.33), L = D * 0.37;         // bubble lives t0 .. t0+L
  const fb = box(c, { left: 0, top: 0, width: W, height: H, opacity: 0, zIndex: 5, filter: 'sepia(0.4) saturate(1.2)' });
  const mk2 = 'radial-gradient(ellipse 360px 250px at 640px 235px, #000 55%, rgba(0,0,0,0) 100%)'; fb.style.webkitMaskImage = mk2; fb.style.maskImage = mk2;
  cutting(fb, { sky: { top: '#3a2a30', mid: '#b97a52', bot: '#f2b774' }, stars: 0, x: 640, y: 340, w: 250, h: 190, ry: 190, ridge: '#2a1a1a', ground: '#2b1b17', wall: '#1d1412', iL: 460, iR: 820, y0: 480, T: t0, D: L, seed: 25 });
  redLamp(fb, { x: 520, y: 392, s: 0.6, T: t0, D: L });
  const sg = box(fb, { left: 690, top: 316, width: 36, height: 80, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 36 80" width="100%" height="100%"><circle cx="15" cy="9" r="7" fill="#07090e"/><path d="M8 17 Q18 14 28 17 L30 54 L6 54Z" fill="#07090e"/><rect x="9" y="52" width="6" height="26" fill="#07090e"/><rect x="19" y="52" width="6" height="26" fill="#07090e"/><path d="M8 20 L5 46 M28 20 L31 46" stroke="#07090e" stroke-width="5" stroke-linecap="round"/></svg>`);
  tl.to(sg, { scaleX: 0.4, duration: 1.4, ease: 'sine.inOut' }, t0 + 17);                          // turns too late
  trainHeadOn(fb, { x: 640, y: 372, T: t0 + 11, D: 9, s0: 0.06, s1: 1.7 });
  const cab = box(fb, { left: 0, top: 0, width: W, height: H, opacity: 0 });
  box(cab, { left: 420, top: 40, width: 440, height: 380, borderRadius: 16, background: 'linear-gradient(#ffd27a, #e07a28 70%, #8a3a14)', border: '14px solid #070606', boxSizing: 'border-box', boxShadow: '0 0 60px 12px rgba(255,150,50,0.5)' });
  steam(cab, { x: 560, y: 360, n: 3, dx: 20, dy: -120, s: 1.2, color: 'rgba(255,220,170,0.25)', T: t0, D: L });
  pose(cab, { x: 640, y: 412, s: 1.2, T0: t0 + 20.5, T1: t0 + 25.5, per: 0.35, max: 1, dark: true, fin: 0.8, fout: 0.8 });
  tl.fromTo(cab, { opacity: 0 }, { opacity: 1, duration: 1.2 }, t0 + 20).to(cab, { opacity: 0, duration: 1, ease: 'sine.in' }, t0 + 25.8);
  const wf = box(fb, { left: 0, top: 0, width: W, height: H, background: '#fff6e8', opacity: 0 });   // soft white flash, slow rise and fall
  tl.fromTo(wf, { opacity: 0 }, { opacity: 0.92, duration: 1.6, ease: 'sine.in' }, t0 + 26).to(wf, { opacity: 0, duration: 3, ease: 'sine.out' }, t0 + 27.8);
  tl.fromTo(fb, { opacity: 0 }, { opacity: 1, duration: 3, ease: 'sine.inOut' }, t0).to(fb, { opacity: 0, duration: 2.6, ease: 'sine.inOut' }, t0 + L - 2.6);

  // ---------- C: the narrator, motionless; the ghost pose faintly over the driver, then gone ----------
  pose(night, { x: 756, y: 572, s: 0.56, T0: at(0.78), T1: at(0.9), per: 0.9, max: 0.34, fin: 4, fout: 4 });
  tl.to(night, { scale: 1.1, x: 40, transformOrigin: '38% 50%', duration: D * 0.3, ease: 'sine.inOut' }, at(0.7));
})();
