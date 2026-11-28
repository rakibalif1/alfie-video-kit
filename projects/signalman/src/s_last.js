// ===== SCENE 'last' v2: the long day, the last evening, the ghost at the tunnel, the run down, the men with lamps =====
// Timeline re-timed to the new narration (seconds from scene start, D = 93.1): walk 0-20 | edge 17.5-65 (figure 24, waving 35, "believed" 43, cold 58) | run 64.5-71 | men with lamps 70-93 (he lifts his head 84)
(function () {
  const c = S('last'), w = win('last'), T = w.T, D = w.D;
  const t = (s) => T + Math.min(s, D - 0.4);
  const L = box(c, { left: 0, top: 0, width: W, height: H, overflow: 'hidden', background: '#080a10' });
  const fadeIO = (el, a, b, c2, d) => { tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: b - a, ease: 'sine.inOut' }, t(a)); if (c2 !== undefined) tl.to(el, { opacity: 0, duration: d - c2, ease: 'sine.inOut' }, t(c2)); };
  const slab = (css) => Object.assign({ left: 0, top: 0, width: W, height: H }, css || {});
  const cam = (s, cx, cy) => ({ scale: s, x: -(cx - 640) * s, y: -(cy - 360) * s });
  const svgNS = 'http://www.w3.org/2000/svg';
  // wet rail reflections: glossy streaks along both rails, shimmering
  const wet = (p, o) => {
    const id = 'wg' + Math.floor(Math.random() * 1e6);
    const e = box(p, slab({ opacity: o.op ?? 0.6 }), `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="${o.y0}" x2="0" y2="${o.vy}"><stop offset="0" stop-color="${o.col}" stop-opacity="0"/><stop offset="0.35" stop-color="${o.col}" stop-opacity="0.85"/><stop offset="1" stop-color="${o.col}" stop-opacity="0"/></linearGradient></defs><path d="M${o.xl + 3} ${o.y0} L${o.vx - 1} ${o.vy}" stroke="url(#${id})" stroke-width="5" fill="none"/><path d="M${o.xr - 3} ${o.y0} L${o.vx + 1} ${o.vy}" stroke="url(#${id})" stroke-width="5" fill="none"/></svg>`);
    e.style.mixBlendMode = 'screen';
    tl.to(e, { opacity: (o.op ?? 0.6) * 0.55, duration: 1.7, yoyo: true, repeat: Math.max(1, Math.floor(o.D / 1.7)), ease: 'sine.inOut' }, o.T);
    return e;
  };
  const softCold = (p, x, y, r, op) => box(p, { left: x - r, top: y - r, width: 2 * r, height: 2 * r, borderRadius: '50%', background: 'radial-gradient(circle, rgba(190,215,255,0.8) 0%, rgba(120,160,230,0.25) 40%, rgba(0,0,0,0) 70%)', opacity: op, mixBlendMode: 'screen' });
  // ---------- sky cycle: dawn -> noon -> dusk (cross-fades), shared by the whole scene
  const sk = (g, z) => box(L, slab({ background: g, zIndex: z }));
  sk('linear-gradient(#6d7479 0%, #9aa0a2 55%, #c8c4b8 100%)', 1);
  const noon = sk('linear-gradient(#aebcc6 0%, #cdd6da 60%, #e4e4dc 100%)', 1); noon.style.opacity = 0;
  const dusk = sk('linear-gradient(#1a1a33 0%, #3a2742 45%, #7a4650 80%, #946056 100%)', 1); dusk.style.opacity = 0;
  fadeIO(noon, 4, 8, 11, 16); tl.fromTo(dusk, { opacity: 0 }, { opacity: 1, duration: 8, ease: 'sine.inOut' }, t(12));

  // ---------- PART A (0-20): open country time-lapse, the walker keeps going; camera tracks him
  const A = box(L, slab({ zIndex: 2 })), Aw = box(A, slab({ transformOrigin: '380px 480px' }));
  const RC = rr(8);
  for (let i = 0; i < 9; i++) { const cl = box(Aw, { left: RC() * W, top: 30 + RC() * 220, width: 320 + RC() * 360, height: 70 + RC() * 70, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(225,230,236,0.6), rgba(0,0,0,0) 70%)', filter: 'blur(12px)', opacity: 0.35 + RC() * 0.3 }); tl.fromTo(cl, { x: 500 }, { x: -1700, duration: 36 + RC() * 20, ease: 'none' }, T - 8 + RC() * 6); }
  ridge(Aw, { y: 300, h: 190, color: '#59616b', seed: 3, amp: 40, drift: -200, T: T, D: 22 });
  ridge(Aw, { y: 360, h: 150, color: '#394048', seed: 4, amp: 28, trees: 8, treeH: 50, drift: -330, T: T, D: 22 });
  box(Aw, slab({ top: 400, height: 320, background: 'linear-gradient(#566052, #2a3028 40%, #12150f)' }));
  ridge(Aw, { y: 380, h: 90, color: '#1d241b', seed: 9, amp: 10, jag: 14, trees: 10, treeH: 40, drift: -450, T: T, D: 22 });
  ridge(Aw, { y: 440, h: 110, color: '#12170f', seed: 5, amp: 14, jag: 18, trees: 0, drift: -560, T: T, D: 22 });
  box(Aw, { left: -50, top: 548, width: W + 100, height: 40, background: 'linear-gradient(#7a7a72, #3e3e3a)', opacity: 0.85 });
  // the walker: by day plain, at dusk he carries a lamp (two identical puppets cross-fade)
  const wd = puppet(Aw, { x: 380, y: 562, s: 0.78, hat: 'top', coat: '#0e1118', coat2: '#07090d', rim: 'rgba(255,235,200,0.55)' });
  wd.walk(T, 20, 0, 0.62, 2.2); wd.head(-4, t(4), 2); wd.head(5, t(9), 2.5); wd.head(-3, t(13), 2.5);
  const wl = puppet(Aw, { x: 380, y: 562, s: 0.78, hat: 'top', coat: '#0e1118', coat2: '#07090d', rim: 'rgba(255,190,120,0.65)', lamp: 'right', T: T, D: 20, opacity: 0 });
  wl.walk(T, 20, 0, 0.62, 2.2); wl.head(-4, t(4), 2); wl.head(5, t(9), 2.5); wl.head(-3, t(13), 2.5);
  tl.to(wl.g, { opacity: 1, duration: 2, ease: 'sine.inOut' }, t(12.5)); tl.to(wd.g, { opacity: 0, duration: 2, ease: 'sine.inOut' }, t(12.5));
  const tint = box(Aw, slab({ background: 'rgba(40,20,55,0.7)', opacity: 0, mixBlendMode: 'multiply' }));
  tl.to(tint, { opacity: 0.7, duration: 8, ease: 'sine.in' }, t(12));
  mist(Aw, { y: 420, h: 140, op: 0.32, n: 3, T: T, D: 22, seed: 15 });
  motes(Aw, { x0: 100, x1: 1200, y0: 250, y1: 560, n: 18, color: 'rgba(255,245,225,0.8)', T: T, D: 20, size: 2.2, rise: -26, seed: 12 });
  tl.fromTo(Aw, { scale: 1 }, { scale: 1.04, duration: 5, ease: 'none' }, T);
  tl.to(Aw, { scale: 1.5, duration: 6, ease: 'sine.inOut' }, t(5));
  tl.to(Aw, { scale: 1.56, duration: 4, ease: 'none' }, t(11));
  tl.to(Aw, { scale: 1.08, duration: 5, ease: 'sine.inOut' }, t(15));
  tl.to(A, { opacity: 0, duration: 2.5, ease: 'sine.inOut' }, t(17.6));

  // ---------- PART B and C: top edge of the cutting at dusk; ghost at the tunnel mouth (17.5-65)
  const O = '700px 380px', grp = (z) => box(L, slab({ transformOrigin: O, zIndex: z, opacity: 0 }));
  const far = grp(3), near = grp(4), mid = grp(5);
  const camG = (g, k, segs) => segs.forEach(([a, b, s0, s1, y0, y1, ease]) => tl.fromTo(g, { scale: 1 + (s0 - 1) * k, y: y0 * k }, { scale: 1 + (s1 - 1) * k, y: y1 * k, duration: b - a, ease: ease || 'sine.inOut' }, t(a)));
  const SEGS = [[17.5, 28, 1, 1.04, 0, 0, 'none'], [28, 33, 1.04, 1.4, 0, -10], [33, 43, 1.4, 1.26, -10, -6, 'none'], [43, 52, 1.26, 2.0, -6, -22], [52, 62.5, 2.0, 2.16, -22, -26, 'none']];
  // far hills with a moon
  ridge(far, { y: 130, h: 210, color: '#1e1832', seed: 7, amp: 34, trees: 16, treeH: 70, drift: -24, T: t(17.5), D: 48 });
  softCold(far, 1010, 90, 260, 0.55); box(far, { left: 998, top: 78, width: 24, height: 24, borderRadius: '50%', background: 'radial-gradient(circle at 38% 36%, #fff, #e6eeff 60%, #b9c6e6)', boxShadow: '0 0 40px 10px rgba(180,205,255,0.5)' });
  box(near, slab({ top: 0 }), `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><polygon points="170,450 330,320 520,225 650,190 780,225 950,320 1110,450" fill="#171629"/><path d="M170 450 L330 320 L520 225 L650 190 L780 225 L950 320 L1110 450" stroke="rgba(150,180,230,0.4)" stroke-width="2" fill="none"/></svg>`);
  box(near, { left: -300, top: 340, width: W + 600, height: 800, background: 'linear-gradient(#2e2f48 0%, #1a1b2a 40%, #0b0c14 100%)' });
  tunnel(near, { x: 640, y: 332, w: 260, h: 170, T: t(17.5), D: 50 });
  rails(near, { vx: 640, vy: 328, x0: 400, x1: 880, y0: H + 120, T: t(17.5), D: 50 });
  wet(near, { vx: 640, vy: 328, xl: 400, xr: 880, y0: H + 120, col: 'rgba(150,185,255,1)', op: 0.55, T: t(17.5), D: 50 });
  wet(near, { vx: 640, vy: 328, xl: 405, xr: 875, y0: 560, col: 'rgba(255,70,50,1)', op: 0.5, T: t(21), D: 45 });
  redLamp(near, { x: 800, y: 438, s: 0.5, T: t(17.5), D: 50 });
  box(near, { left: 640, top: 400, width: 300, height: 120, background: 'radial-gradient(ellipse, rgba(255,50,30,0.38), rgba(0,0,0,0) 70%)', mixBlendMode: 'screen' });
  // the ghost: pale translucent man, left arm across the face, right arm waves from 35 s
  const gh = box(near, { left: 656, top: 290, width: 104, height: 169, opacity: 0, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 80 130" width="104" height="169" style="overflow:visible"><defs><linearGradient id="gg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8f2ff" stop-opacity="0.85"/><stop offset="1" stop-color="#9ec0ff" stop-opacity="0.12"/></linearGradient></defs><g fill="url(#gg)" stroke="#dcecff" stroke-opacity="0.75" stroke-width="1.4"><path d="M24 30 Q24 22 40 22 Q56 22 56 32 L58 100 L52 128 L42 128 L40 104 L38 128 L28 128 L22 100Z"/><circle cx="40" cy="14" r="10"/><path id="la" d="M30 36 Q18 46 40 18" fill="none" stroke-width="7" stroke-linecap="round" stroke-opacity="0.8"/><g id="ra"><path d="M54 34 L74 4" fill="none" stroke-width="7" stroke-linecap="round" stroke-opacity="0.8"/></g></g></svg>`);
  const ghG = glow(near, { x: 708, y: 390, r: 110, color: 'rgba(170,205,255,0.6)', op: 0, T: t(24), D: 40, flicker: false });
  tl.fromTo(gh, { opacity: 0 }, { opacity: 0.85, duration: 3.5, ease: 'sine.in' }, t(24.5)); tl.to(ghG, { opacity: 0.85, duration: 3.5 }, t(24.5));
  tl.fromTo(gh, { y: 0 }, { y: -4, duration: 2.6, yoyo: true, repeat: 13, ease: 'sine.inOut' }, t(24.5));
  tl.to(gh, { opacity: 0.66, duration: 2.2, yoyo: true, repeat: 14, ease: 'sine.inOut' }, t(29));
  const ra = gh.querySelector('#ra'); gsap.set(ra, { svgOrigin: '54 34', rotation: 70 });
  tl.to(ra, { rotation: -18, duration: 1.2, ease: 'sine.inOut' }, t(34.6)); tl.to(ra, { rotation: 22, duration: 0.9, yoyo: true, repeat: 29, ease: 'sine.inOut' }, t(35.8));
  tl.to([gh, ghG], { opacity: 0, duration: 2 }, t(62.8));
  cuttingWalls(mid, { innerL: 380, innerR: 900, colorL: '#1c1520', colorR: '#171119', seed: 23 });
  box(mid, slab({ background: 'linear-gradient(100deg, rgba(20,16,14,0) 35%, rgba(80,95,150,0.36) 100%)', clipPath: 'polygon(0px 0px,380px 374px,340px 720px,0px 720px)' }));
  box(mid, slab({ background: 'linear-gradient(260deg, rgba(20,16,14,0) 35%, rgba(80,95,150,0.3) 100%)', clipPath: 'polygon(1280px 0px,900px 374px,940px 720px,1280px 720px)' }));
  box(mid, slab(), `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><path d="M15 70 L120 150 L35 235 L230 330 L110 420 L330 520 L230 610 L330 690" fill="none" stroke="#6a5a4e" stroke-width="7" stroke-linejoin="round" opacity="0.65"/></svg>`);
  [far, near, mid].forEach((g) => fadeIO(g, 17.5, 20.5));
  camG(far, 0.55, SEGS); camG(near, 1, SEGS); camG(mid, 1.25, SEGS);
  [[far, -12], [near, 0], [mid, 14]].forEach(([g, dx]) => tl.fromTo(g, { x: -dx }, { x: dx, duration: 45, ease: 'none' }, t(17.5)));   // slow parallax slide
  // cold air rising out of the cutting, light rain, dust in the red/cold light
  const RF = rr(44), fogUp = box(L, slab({ zIndex: 6 }));
  for (let i = 0; i < 12; i++) { const e = box(fogUp, { left: 100 + RF() * 1000, top: 400 + RF() * 280, width: 380 + RF() * 300, height: 120, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(150,170,205,0.55), rgba(0,0,0,0) 70%)', filter: 'blur(14px)', opacity: 0 }), dur = 8 + RF() * 5; tl.fromTo(e, { y: 0 }, { y: -330, duration: dur, ease: 'none', repeat: Math.ceil(48 / dur) }, t(17.5) + RF() * 4); tl.fromTo(e, { opacity: 0 }, { opacity: 0.4, duration: dur / 2, yoyo: true, repeat: 2 * Math.ceil(48 / dur) + 1, ease: 'sine.inOut' }, t(17.5) + RF() * 4); }
  const rn = box(L, slab({ zIndex: 11, opacity: 0, pointerEvents: 'none' })); rain(rn, { n: 60, len: 30, op: 0.26, T: t(19), D: 72, seed: 7 });
  tl.to(rn, { opacity: 1, duration: 3 }, t(19)).to(rn, { opacity: 0, duration: 3 }, t(88));
  motes(far, { x0: 300, x1: 1000, y0: 250, y1: 560, n: 22, color: 'rgba(200,220,255,0.9)', T: t(17.5), D: 48, size: 2.4, seed: 53 });
  // narrator at the rim, with his lamp: walks in, stops, breathes; the lamp hand trembles
  const nb = puppet(L, { x: 270, y: 640, s: 1.05, hat: 'top', coat: '#0c111d', coat2: '#060910', rim: 'rgba(165,200,255,0.7)', lamp: 'right', T: t(17.5), D: 48, opacity: 0 });
  nb.g.style.zIndex = 7;
  tl.to(nb.g, { opacity: 1, duration: 1.6, ease: 'sine.out' }, t(17.6));
  tl.fromTo(nb.g, { x: -230 }, { x: 0, duration: 3.4, ease: 'power1.out' }, t(17.5));
  nb.walk(t(17.5), 3.4, 0, 0.68, 1.5);
  tl.to([nb.P.lf, nb.P.lb, nb.P.lfs, nb.P.lbs], { rotation: 0, duration: 0.6 }, t(21)); tl.to(nb.P.t, { rotation: 0, y: 0, duration: 0.6 }, t(21)); nb.arm('b', 4, 0, t(21), 0.6); nb.arm('f', -4, -4, t(21), 0.6);
  nb.breathe(t(21.8), 41, 1.1);
  nb.head(8, t(22), 2); nb.head(-2, t(27), 2); nb.head(10, t(30.5), 2.4); nb.head(2, t(40), 2.5); nb.head(-4, t(43.5), 2); nb.head(3, t(56), 2.5);
  tl.to(nb.P.aff, { rotation: '+=3', duration: 0.1, yoyo: true, repeat: 190, ease: 'sine.inOut' }, t(43.5));   // lamp hand shakes
  tl.to(nb.g, { scale: 1.28, x: -60, duration: 9, ease: 'sine.inOut', transformOrigin: '50% 100%' }, t(43));
  // the cold comes up the cutting
  const cold = box(L, slab({ zIndex: 8, background: 'radial-gradient(ellipse at 50% 112%, rgba(150,190,255,0.5) 0%, rgba(80,120,220,0.18) 45%, rgba(0,0,0,0) 72%)', opacity: 0 }));
  tl.to(cold, { opacity: 0.95, duration: 6, ease: 'sine.in' }, t(57.5)); tl.to(cold, { opacity: 0, duration: 1.4 }, t(64.6));
  mist(cold, { y: 380, h: 300, op: 0.3, n: 4, T: t(55), D: 12, seed: 51, color: 'rgba(160,190,235,0.5)' });
  [far, near, mid, fogUp].forEach((g) => tl.to(g, { opacity: 0, duration: 1.2 }, t(64.8)));
  // "I ran": he bolts down the path, the lamp swings, the walls stream past
  tl.to(nb.g, { x: -420, y: 150, scale: 1.7, opacity: 0, duration: 1.5, ease: 'power2.in', transformOrigin: '50% 100%' }, t(64.5));
  tl.fromTo([nb.P.lf, nb.P.lb], { rotation: 0 }, { rotation: (i) => (i ? 38 : -38), duration: 0.17, yoyo: true, repeat: 8, ease: 'sine.inOut' }, t(64.4));
  // ---------- RUSH (64.6-71): down the zigzag
  const RU = box(L, slab({ zIndex: 9, opacity: 0, background: 'linear-gradient(#1b1e36, #2c2433)' })), RR = rr(66);
  for (let i = 0; i < 46; i++) { const side = RR() < 0.5, e = box(RU, { left: side ? RR() * 380 : W - RR() * 380, top: 0, width: 2 + RR() * 8, height: 120 + RR() * 260, background: `rgba(${110 + RR() * 50},${95 + RR() * 30},${95 + RR() * 30},${0.14 + RR() * 0.3})`, filter: 'blur(1.5px)' }), dur = 0.7 + RR() * 0.6; tl.fromTo(e, { y: 800 }, { y: -500, duration: dur, ease: 'none', repeat: Math.ceil(7 / dur) }, t(64.6) + RR() * dur); }
  for (let i = 0; i < 5; i++) { const b = box(RU, { left: 260 + i * 120, top: 0, width: 520, height: 22, background: 'rgba(120,100,86,0.6)', transform: 'rotate(-24deg)' }); tl.fromTo(b, { y: 800, x: 200 }, { y: -400, x: -300, duration: 1.4, ease: 'none', repeat: 4 }, t(64.6) + i * 0.28); }
  box(RU, slab({ background: 'radial-gradient(ellipse at 50% 60%, rgba(130,160,210,0.3), rgba(0,0,0,0) 55%), radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 40%, rgba(0,0,6,0.8) 100%)' }));
  const swing = box(RU, { left: 640 - 220, top: 430, width: 440, height: 440, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,190,100,0.85), rgba(255,140,40,0.3) 40%, rgba(0,0,0,0) 70%)', mixBlendMode: 'screen' });
  tl.fromTo(swing, { x: -110 }, { x: 110, duration: 0.34, yoyo: true, repeat: 18, ease: 'sine.inOut' }, t(64.6));
  tl.fromTo(RU, { opacity: 0 }, { opacity: 1, duration: 1.0 }, t(64.6)); tl.to(RU, { opacity: 0, duration: 2.6, ease: 'sine.inOut' }, t(69.4));
  // ---------- BOTTOM (70-93): the men with lamps held low, ghost gone; he lifts his head to me
  const B = box(L, slab({ zIndex: 10, opacity: 0, transformOrigin: '640px 360px' }));
  box(B, slab({ background: 'linear-gradient(#1a2038, #232940 55%, #0e1018)' }));
  softCold(B, 960, 120, 360, 0.45);
  tunnel(B, { x: 640, y: 330, w: 300, h: 190, T: t(70), D: 24 });
  rails(B, { vx: 640, vy: 330, x0: 330, x1: 950, y0: H + 100, T: t(70), D: 24 });
  wet(B, { vx: 640, vy: 330, xl: 330, xr: 950, y0: H + 100, col: 'rgba(255,175,95,1)', op: 0.55, T: t(70), D: 24 });
  box(B, slab({ background: 'radial-gradient(ellipse at 50% 72%, rgba(255,165,75,0.4), rgba(0,0,0,0) 58%)', mixBlendMode: 'screen' }));
  box(B, { left: 530, top: 485, width: 240, height: 80 }, `<svg viewBox="0 0 240 80" width="240" height="80"><path d="M10 70 Q20 30 70 24 Q130 18 190 40 Q214 52 206 70 Q110 82 10 70Z" fill="#9c9e9a"/><path d="M50 34 Q100 28 160 40 M30 56 Q110 66 190 56" stroke="#66686a" stroke-width="3" fill="none"/><path d="M200 50 L232 44 L234 58 L204 64Z M208 66 L236 62 L238 74 L210 76Z" fill="#050506"/></svg>`);
  const men = [[420, 0.85, 1, 0, 'top'], [520, 0.95, 1, 1, 'cap'], [830, 0.9, -1, 2, 'top'], [915, 0.8, -1, 3, 'cap']];
  men.forEach(([x, s, dir, k, hat]) => {
    box(B, { left: x - 90 * s, top: 500, width: 180 * s, height: 44 * s, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,175,80,0.5), rgba(0,0,0,0) 70%)', mixBlendMode: 'screen' });
    const wrap = box(B, { left: x, top: 520, width: 0, height: 0 }); gsap.set(wrap, { scaleX: dir });
    const m = puppet(wrap, { x: 0, y: 0, s, hat, coat: '#0b0f19', coat2: '#06080e', rim: 'rgba(255,175,95,0.7)', lamp: 'right', T: t(70), D: 23 });
    m.breathe(t(70), 23, 1.2);
    tl.fromTo(m.P.t, { rotation: 6 }, { rotation: 12 + k * 2, duration: 3 + k * 0.5, ease: 'sine.inOut' }, t(70.5));
    m.head(14 + k * 3, t(70.5), 2.5); m.head(8, t(78 + k), 2.5);
    m.arm('f', -8, -16, t(70.5), 1.5);
    if (k === 2) { m.arm('b', -30, -80, t(76.5), 1.6); m.arm('b', 6, 0, t(80.5), 1.8); }
    if (k === 1) {
      const fc = document.createElementNS(svgNS, 'ellipse'); fc.setAttribute('cx', 63); fc.setAttribute('cy', 41); fc.setAttribute('rx', 6.5); fc.setAttribute('ry', 8.5); fc.setAttribute('fill', '#c4d2ec'); fc.setAttribute('opacity', 0); m.P.h.appendChild(fc);
      const eyes = document.createElementNS(svgNS, 'g'); eyes.innerHTML = '<ellipse cx="60" cy="39" rx="1.5" ry="1" fill="#101420"/><ellipse cx="67" cy="39" rx="1.5" ry="1" fill="#101420"/>'; eyes.setAttribute('opacity', 0); m.P.h.appendChild(eyes);
      m.head(-34, t(83.8), 3.2); tl.to(fc, { opacity: 0.6, duration: 2.2 }, t(85)); tl.to(eyes, { opacity: 0.9, duration: 1.6 }, t(86.2));
      tl.to(m.P.t, { rotation: 0, duration: 2.5, ease: 'sine.inOut' }, t(83.5));
    }
  });
  mist(B, { y: 500, h: 160, op: 0.3, n: 4, T: t(70), D: 24, seed: 71 });
  motes(B, { x0: 300, x1: 1000, y0: 300, y1: 560, n: 22, color: 'rgba(255,215,150,0.9)', T: t(70), D: 24, size: 2.4, seed: 81 });
  tl.fromTo(B, { opacity: 0 }, { opacity: 1, duration: 2.5 }, t(69.9));
  tl.fromTo(B, cam(1.0, 640, 380), { ...cam(1.12, 640, 380), duration: 12, ease: 'none' }, t(70));
  tl.to(B, { ...cam(1.9, 522, 372), duration: 5.5, ease: 'sine.inOut' }, t(82.2));
  tl.to(B, { ...cam(1.98, 522, 372), duration: 6, ease: 'none' }, t(87.7));
  tl.fromTo(B, { rotation: 0.2 }, { rotation: -0.2, duration: 7, yoyo: true, repeat: 3, ease: 'sine.inOut' }, t(70));
})();
