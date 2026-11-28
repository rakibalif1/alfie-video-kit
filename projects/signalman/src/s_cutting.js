// ===== SCENE 'cutting' v2: looking down the deep cutting, the call, the descent to the signalman =====
// beats (scene seconds): 0 wide | 8.5 water | 12 zigzag | 23 tunnel | 32 cellar cold | 46.6 man at red lamp | 62.5 call | 67.5 he turned
// | 71.5-77 tunnel, mouth, dark | 78 lifts his eyes (close-up) | 88.5 dread | 91 "the thing he had been waiting for"
(function () {
  const c = S('cutting'), w = win('cutting'), T = w.T, D = w.D;
  const t = (s) => T + Math.min(s, D - 0.3);
  const ORI = '650px 470px';
  const L = box(c, { left: 0, top: 0, width: W, height: H, overflow: 'hidden', background: '#0b1018' });
  const grp = (z, p) => box(p || L, { left: 0, top: 0, width: W, height: H, transformOrigin: ORI, zIndex: z });
  const far = grp(1), near = grp(2), mid = grp(3), nrCam = grp(5), nr = box(nrCam, { left: 0, top: 0, width: W, height: H });
  // ---- one camera for every depth layer (nearer layers move more = parallax) ----
  const LAY = [[far, 0.45], [near, 1], [mid, 1.7], [nrCam, 0]];
  const K = [ // [t, scale, x, y, ease]
    [0, 1.0, 0, 0], [8, 1.06, 20, 0, 'none'], [13, 1.18, 60, 10], [22, 1.15, 20, -20, 'none'], [24, 1.12, 0, 0],
    [33, 1.5, 0, 140], [41, 1.56, 0, 150, 'none'], [47, 1.25, -30, 25], [62, 2.0, -140, -92, 'none'],
    [69, 2.2, -152, -96, 'none'], [77, 1.6, 0, 185], [99, 1.6, 0, 185, 'none']];
  LAY.forEach(([el, k]) => {
    const v = (p) => ({ scale: 1 + (p[1] - 1) * k, x: p[2] * k, y: p[3] * k });
    gsap.set(el, v(K[0]));
    for (let i = 1; i < K.length; i++) tl.fromTo(el, v(K[i - 1]), Object.assign(v(K[i]), { duration: K[i][0] - K[i - 1][0], ease: K[i][4] || 'sine.inOut', immediateRender: false }), t(K[i - 1][0]));
  });

  // ---- far: dusk sky and fog above the hill (lifted, cold) ----
  box(far, { left: -200, top: -300, width: W + 400, height: 800, background: 'linear-gradient(#7d93ab 0%, #4a5f78 45%, #1f2b3a 100%)' });
  glow(far, { x: 650, y: 190, r: 420, color: 'rgba(150,180,230,0.55)', op: 0.6, T, D, flicker: false });
  mist(far, { y: 60, h: 220, op: 0.45, n: 4, T, D, seed: 12, speed: 0.6 });

  // ---- near: hill, tunnel, ground, rails, red lamp, signalman ----
  ridge(near, { y: 120, h: 200, color: '#141d2a', seed: 7, amp: 34, trees: 18, treeH: 70, drift: -40, T, D });
  box(near, { left: 0, top: 0, width: W, height: H }, `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><polygon points="190,430 330,310 520,215 650,180 780,215 950,310 1090,430" fill="#111823"/><path d="M330 310 L520 215 L650 180 L780 215 L950 310" stroke="rgba(140,170,215,0.35)" stroke-width="2" fill="none"/></svg>`);
  box(near, { left: -300, top: 320, width: W + 600, height: 800, background: 'linear-gradient(#27313f 0%, #151b25 30%, #0a0e14 100%)' });
  { const RG = rr(321); let sp = ''; for (let i = 0; i < 160; i++) { const y = 330 + Math.pow(RG(), 0.8) * 390, x = 160 + RG() * 960, w2 = 3 + RG() * 12 * ((y - 300) / 300); sp += `<rect x="${x}" y="${y}" width="${w2}" height="${1 + w2 / 6}" fill="rgba(${RG() < 0.5 ? '8,11,16' : '90,110,140'},${0.25 + RG() * 0.3})"/>`; }
    box(near, { left: 0, top: 0, width: W, height: H }, `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${sp}<ellipse cx="560" cy="560" rx="70" ry="9" fill="rgba(150,180,230,0.25)"/><ellipse cx="800" cy="520" rx="48" ry="6" fill="rgba(255,90,70,0.3)"/></svg>`); }
  tunnel(near, { x: 640, y: 312, w: 200, h: 132, T, D });
  const tg = glow(near, { x: 640, y: 300, r: 190, color: 'rgba(130,170,240,0.6)', op: 0.55, T, D, flicker: false });
  tl.to(tg, { opacity: 0.85, duration: 6, ease: 'sine.inOut' }, t(66)).to(tg, { opacity: 0.55, duration: 6, ease: 'sine.inOut' }, t(80));   // the dark gives a cold breath as he stares at it
  rails(near, { vx: 640, vy: 308, x0: 440, x1: 840, y0: H + 120, T, D });
  lightCone(near, { x: 640, y: 300, len: 420, spread: 150, rot: 0, color: 'rgba(130,170,250,0.4)', op: 0.5, T, D });
  box(near, { left: 540, top: 462, width: 440, height: 130, background: 'radial-gradient(ellipse, rgba(255,60,40,0.5), rgba(0,0,0,0) 70%)', mixBlendMode: 'screen' });
  redLamp(near, { x: 782, y: 498, s: 0.62, T, D });
  glow(near, { x: 726, y: 452, r: 100, color: 'rgba(120,160,230,0.55)', op: 0.5, T, D, flicker: false });   // cold haze behind him so his shape reads
  // signalman: puppet, back to us, motionless
  const sm = puppet(near, { x: 726, y: 498, s: 0.5, hat: 'cap', rim: 'rgba(255,110,90,0.7)', coat: '#10151f', coat2: '#090c13' });
  sm.breathe(T, D, 0.6);
  sm.head(-7, t(67.2), 1.0);                                                // 'He turned'
  tl.to(sm.g, { scaleX: 0.62, duration: 1.4, ease: 'sine.inOut', transformOrigin: '50% 100%' }, t(67.5));
  sm.head(8, t(70.8), 3.2); sm.head(-12, t(74), 3);                        // eyes to the tunnel, the mouth of it, the dark
  breathFog(near, 718, 412, t(48), 28, 3.2, -14);
  mist(near, { y: 380, h: 200, op: 0.4, n: 4, T, D, seed: 14, speed: 0.5 });
  steam(near, { x: 640, y: 330, n: 5, s: 2.2, dx: 10, dy: -80, color: 'rgba(170,190,220,0.26)', T, D });
  motes(near, { x0: 520, x1: 800, y0: 300, y1: 520, n: 22, color: 'rgba(190,215,255,0.9)', T, D, size: 2.2, rise: -26, seed: 31 });
  motes(near, { x0: 700, x1: 840, y0: 440, y1: 500, n: 10, color: 'rgba(255,120,90,0.9)', T: t(40), D: D - 40, size: 2, rise: -30, seed: 53 });

  // ---- mid: clay walls, zigzag path, sun shaft, drips ----
  const wallL = '0,0 380,374 340,720 0,720', wallR = '1280,0 900,374 940,720 1280,720';
  cuttingWalls(mid, { innerL: 380, innerR: 900, colorL: '#241c19', colorR: '#1d1715', seed: 17 });
  const clip = (p) => ({ clipPath: `polygon(${p.split(' ').map((q) => q.replace(',', 'px ') + 'px').join(',')})` });
  box(mid, Object.assign({ left: 0, top: 0, width: W, height: H, background: 'linear-gradient(100deg, rgba(20,16,14,0) 25%, rgba(100,125,165,0.5) 100%)' }, clip(wallL)));
  box(mid, Object.assign({ left: 0, top: 0, width: W, height: H, background: 'linear-gradient(260deg, rgba(20,16,14,0) 25%, rgba(100,125,165,0.42) 100%)' }, clip(wallR)));
  const R = rr(77);
  for (let i = 0; i < 16; i++) { const y = 60 + R() * 600, x0 = (y < 374 ? (380 * y) / 374 : 380 - (40 * (y - 374)) / 346) * (0.2 + R() * 0.7); const s = R() < 0.5; box(mid, { left: s ? x0 : W - x0 - 60, top: y, width: 40 + R() * 90, height: 4 + R() * 6, background: 'rgba(90,64,52,0.45)', borderRadius: 4, transform: `rotate(${s ? 18 : -18}deg)` }); }
  let tuf = ''; const RT = rr(5);
  for (let i = 0; i < 70; i++) { const u = i / 70, y = u * 374, xl = 380 * u, xr = W - 380 * u, h = 8 + RT() * 16; tuf += `<path d="M${xl - 4} ${y} l${3 + RT() * 4} ${-h} l4 ${h}Z M${xr - 4} ${y} l${-3 - RT() * 4} ${-h} l4 ${h}Z" fill="#0a0d0b"/>`; }
  box(mid, { left: 0, top: 0, width: W, height: H }, `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${tuf}<path d="M0 0 L380 374 L340 720 M1280 0 L900 374 L940 720" stroke="rgba(160,190,230,0.45)" stroke-width="2.5" fill="none"/></svg>`);
  const zz = 'M15 70 L120 150 L35 235 L230 330 L110 420 L330 520 L230 610 L330 690';
  const path = box(mid, { left: 0, top: 0, width: W, height: H }, `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" fill="none" stroke-linejoin="round" stroke-linecap="round"><path d="${zz}" stroke="#040405" stroke-width="16"/><path class="zp" d="${zz}" pathLength="1" stroke="#8a6f5a" stroke-width="8" stroke-dasharray="1" stroke-dashoffset="1" opacity="0.85"/><path d="${zz}" stroke="#c4b4a2" stroke-width="1.5" stroke-dasharray="3 9" opacity="0.45" transform="translate(0 -6)"/></svg>`);
  tl.to(path.querySelector('.zp'), { strokeDashoffset: 0, duration: 11, ease: 'sine.inOut' }, t(12.2));   // 'A zigzag path ... wound down to the line'
  const beam = box(mid, Object.assign({ left: 0, top: 0, width: W, height: H, background: 'linear-gradient(115deg, rgba(255,226,160,0.2), rgba(255,226,160,0.03))', mixBlendMode: 'screen', filter: 'blur(5px)', opacity: 0.9 }, clip('380,0 760,0 1060,390 980,230')));
  const patch = box(mid, Object.assign({ left: 0, top: 0, width: W, height: H, mixBlendMode: 'screen', opacity: 0.9 }, clip(wallR)), `<div class="abs" style="left:1000px;top:190px;width:200px;height:260px;border-radius:50%;background:radial-gradient(ellipse, rgba(255,220,150,0.6), rgba(255,200,120,0) 70%)"></div>`);
  tl.to([beam, patch], { opacity: 0.6, duration: 8, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T);
  tl.to([beam, patch], { opacity: 0, duration: 16, ease: 'sine.in' }, t(26));             // the weak sun thins out as we go down
  motes(mid, { x0: 420, x1: 900, y0: 60, y1: 340, n: 24, color: 'rgba(255,230,180,0.9)', T, D: 34, size: 2.4, rise: -24, seed: 91 });
  for (let i = 0; i < 40; i++) {                                                           // dripping water: glints and drops
    const s = R() < 0.5, y = 40 + R() * 640, mx = y < 374 ? (380 * y) / 374 : 380 - (40 * (y - 374)) / 346, x0 = 6 + R() * (mx - 12), x = s ? x0 : W - x0;
    const g = box(mid, { left: x, top: y, width: 2.6, height: 2.6, borderRadius: '50%', background: '#e0ecff', opacity: 0.1, boxShadow: '0 0 7px 2px rgba(190,215,255,0.7)' });
    tl.to(g, { opacity: 0.9, duration: 0.5 + R() * 1.4, yoyo: true, repeat: Math.floor(D / 2), ease: 'sine.inOut', repeatDelay: R() * 2 }, T + R() * 4);
    if (i % 3 === 0) { const d = box(mid, { left: x, top: y + 4, width: 1.5, height: 9, background: 'rgba(210,228,255,0.8)', opacity: 0 }); tl.fromTo(d, { y: 0, opacity: 0.8 }, { y: 70 + R() * 80, opacity: 0, duration: 0.9 + R() * 0.5, ease: 'power1.in', repeat: Math.floor(D / 3), repeatDelay: 1 + R() * 2 }, T + R() * 5); }
  }

  // ---- narrator on the rim: a puppet, calls down, then withdraws ----
  box(nr, { left: 0, top: 0, width: W, height: H }, `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><polygon points="1280,246 1150,250 1040,262 955,292 1000,314 1280,324" fill="#10141b"/><path d="M1280 246 L1150 250 L1040 262 L955 292" stroke="rgba(160,190,235,0.6)" stroke-width="2.5" fill="none"/><g fill="#0a0d12"><path d="M1000 276 l3 -14 l3 14Z M1040 264 l3 -16 l3 16Z M1100 254 l3 -15 l3 15Z M1180 250 l3 -14 l3 14Z"/></g></svg>`);
  glow(nr, { x: 1085, y: 130, r: 230, color: 'rgba(150,185,240,0.55)', op: 0.55, T, D: 78, flicker: false });
  const nar = puppet(nr, { x: 1170, y: 252, s: 0.95, hat: 'top', rim: 'rgba(160,195,250,0.85)' });
  gsap.set(nar.g, { scaleX: -1, transformOrigin: '50% 100%' });   // mirror via gsap (inline flip decomposes to a vertical flip)
  nar.walk(t(0.4), 4, -78, 0.9, 1.2);                                   // he steps to the edge
  const Pn = nar.P;
  tl.to([Pn.lf, Pn.lb, Pn.lfs, Pn.lbs, Pn.t, Pn.tail], { rotation: 0, y: 0, duration: 0.5 }, t(4.9));
  tl.to(Pn.af, { rotation: -3, duration: 0.5 }, t(4.9)); tl.to(Pn.ab, { rotation: 4, duration: 0.5 }, t(4.9));
  nar.breathe(t(5.5), D - 5.5, 1);
  nar.head(12, t(5.5), 1.6); nar.head(-3, t(14), 3); nar.head(10, t(25), 2.5); nar.head(-4, t(40), 3); nar.head(12, t(50), 3);
  nar.arm('f', -4, -4, t(5), 0.5);
  nar.arm('f', -40, -118, t(61.6), 1.0);                                   // hand to mouth: 'I called down to him'
  nar.arm('f', -115, -18, t(64.2), 0.8);                                   // 'Halloa! Below there!'
  nar.arm('f', -115, -45, t(65.1), 0.35); nar.arm('f', -115, 6, t(65.5), 0.35); nar.arm('f', -115, -45, t(65.9), 0.35); nar.arm('f', -115, 6, t(66.3), 0.35);
  nar.arm('f', -3, -3, t(67.2), 1.4);
  nar.head(14, t(62), 1.4); nar.head(6, t(66.8), 2);
  breathFog(nr, 1078, 88, t(6), 62, 2.6, -34);
  tl.to(nr, { y: -230, opacity: 0, duration: 8, ease: 'sine.in' }, t(70));

  // ---- fog thickens, light thins; a mild cold lift so no part reads black ----
  const fog = box(L, { left: 0, top: 0, width: W, height: H, opacity: 0.3, zIndex: 6 });
  mist(fog, { y: 160, h: 360, op: 0.55, n: 6, T, D, seed: 31, speed: 0.8, color: 'rgba(150,168,190,0.6)' });
  tl.to(fog, { opacity: 0.4, duration: 24 }, t(26)); tl.to(fog, { opacity: 0.5, duration: 14, ease: 'sine.in' }, t(58));
  box(L, { left: 0, top: 0, width: W, height: H, background: 'radial-gradient(ellipse at 50% 55%, rgba(60,85,130,0.22) 0%, rgba(20,30,50,0.1) 70%)', mixBlendMode: 'screen', zIndex: 7 });
  const dark = box(L, { left: 0, top: 0, width: W, height: H, background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,6,0) 40%, rgba(0,0,6,0.6) 100%)', opacity: 0.2, zIndex: 7 });
  tl.to(dark, { opacity: 0.7, duration: 60, ease: 'none' }, t(20));

  // ---- close-up: the signalman's face, turning, eyes lifting to the narrator, dread ----
  const cl = box(L, { left: 0, top: 0, width: W, height: H, opacity: 0, zIndex: 8 });
  box(cl, { left: 0, top: 0, width: W, height: H, background: 'radial-gradient(ellipse at 45% 42%, rgba(62,86,124,0.96) 0%, rgba(24,34,52,0.97) 62%, rgba(10,14,22,0.98) 100%)' });
  box(cl, { left: 200, top: 470, width: 880, height: 250, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,60,40,0.6), rgba(140,14,12,0.2) 50%, rgba(0,0,0,0) 72%)', mixBlendMode: 'screen' });
  const rg = box(cl, { left: 820, top: 120, width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,70,50,0.5), rgba(255,40,30,0) 70%)', mixBlendMode: 'screen' });
  tl.to(rg, { opacity: 0.55, duration: 1.2, yoyo: true, repeat: 20, ease: 'sine.inOut' }, t(77));
  mist(cl, { y: 420, h: 200, op: 0.3, n: 4, T: t(77), D: D - 77, seed: 41 });
  const figBox = box(cl, { left: 490, top: 100, width: 300, height: 520, transformOrigin: '150px 76px' }, `<svg viewBox="0 0 300 520" width="300" height="520" style="overflow:visible"><defs>
    <linearGradient id="cutfc" x1="0" x2="1"><stop offset="0" stop-color="#6c86ad"/><stop offset="0.6" stop-color="#2f3d54"/><stop offset="1" stop-color="#3b2429"/></linearGradient>
    <linearGradient id="cutrd" x1="0" y1="0" x2="0" y2="1"><stop offset="0.55" stop-color="#ff3b2a" stop-opacity="0"/><stop offset="1" stop-color="#ff3b2a" stop-opacity="0.4"/></linearGradient></defs>
    <path d="M40 200 Q40 140 135 125 L165 125 Q260 140 260 200 L275 420 L255 520 L45 520 L25 420Z" fill="#141b27"/>
    <path d="M62 200 L48 430 M238 200 L252 430" stroke="#2a3649" stroke-width="3" fill="none"/>
    <path d="M40 200 Q40 140 135 125 L165 125 Q260 140 260 200 L275 420 L255 520 L45 520 L25 420Z" fill="url(#cutrd)"/>
    <path d="M40 200 Q40 140 135 125" stroke="#aac4f0" stroke-width="3" fill="none" opacity="0.7"/><path d="M260 200 Q260 140 165 125" stroke="#ff6a52" stroke-width="3" fill="none" opacity="0.55"/>
    <path d="M118 112 L150 142 L182 112 L176 126 L150 150 L124 126Z" fill="#0b0f16"/>
    <g id="cutfh"><rect x="136" y="96" width="28" height="34" fill="#1c2431"/><ellipse cx="150" cy="80" rx="34" ry="42" fill="#11161f"/><ellipse cx="148" cy="76" rx="26" ry="30" fill="url(#cutfc)"/>
      <path d="M147 70 Q143 84 148 90" stroke="#9db6dc" stroke-width="1.6" fill="none" opacity="0.35"/>
      <path d="M172 52 Q176 78 168 100" stroke="#ff6a52" stroke-width="2" fill="none" opacity="0.5"/>
      <path d="M118 82 Q124 138 150 144 Q176 138 182 82 Q166 104 150 104 Q134 104 118 82Z" fill="#0a0c12"/>
      <path d="M135 100 Q150 94 165 100 Q150 106 135 100Z" fill="#06070b"/>
      <path d="M118 84 Q122 126 144 140" stroke="#cfe0ff" stroke-width="1.6" fill="none" opacity="0.4"/>
      <path d="M114 50 Q114 20 150 18 Q186 20 186 50Z" fill="#0a0e16"/><path d="M108 50 H192 L198 58 H102Z" fill="#0a0e16"/><path d="M114 30 Q150 14 186 30" stroke="#a9c3ee" stroke-width="1.6" fill="none" opacity="0.5"/>
      <g id="cutbl"><path d="M126 63 L146 67" stroke="#070a10" stroke-width="3.4" stroke-linecap="round"/></g><g id="cutbr"><path d="M174 63 L154 67" stroke="#070a10" stroke-width="3.4" stroke-linecap="round"/></g>
      <g id="cutey"><ellipse cx="138" cy="74" rx="6" ry="4.2" fill="#e4eeff"/><ellipse cx="162" cy="74" rx="6" ry="4.2" fill="#e4eeff"/>
        <g id="cutpu"><circle cx="138" cy="74" r="2.6" fill="#04050a"/><circle cx="162" cy="74" r="2.6" fill="#04050a"/><circle cx="137" cy="73" r="0.8" fill="#fff"/><circle cx="161" cy="73" r="0.8" fill="#fff"/></g>
        <path d="M131 71 Q138 68 145 71 M155 71 Q162 68 169 71" stroke="#05070b" stroke-width="2" fill="none"/></g>
    </g></svg>`);
  const q = (id) => figBox.querySelector('#' + id);
  const fh = q('cutfh'), pu = q('cutpu'), bl = q('cutbl'), br = q('cutbr'), ey = q('cutey');
  gsap.set(fh, { svgOrigin: '150 110', rotation: -7 }); gsap.set(pu, { x: -3.2, y: 1.2 }); gsap.set(ey, { svgOrigin: '150 74' });
  gsap.set(bl, { svgOrigin: '146 67' }); gsap.set(br, { svgOrigin: '154 67' });
  gsap.set(figBox, { scale: 3.0, y: 120 });
  tl.fromTo(figBox, { scale: 3.0, y: 120 }, { scale: 3.5, y: 108, duration: D - 77, ease: 'none', immediateRender: false }, t(77));
  tl.fromTo(cl, { opacity: 0 }, { opacity: 1, duration: 2.2, ease: 'sine.inOut' }, t(77.2));
  tl.to(figBox.querySelector('svg'), { y: 3, duration: 2.6, yoyo: true, repeat: 8, ease: 'sine.inOut' }, t(77));   // breathing
  tl.to(fh, { rotation: -1, duration: 5, ease: 'sine.inOut' }, t(80.5));                                         // head turns up the cutting
  tl.to(fh, { rotation: 2, duration: 4, ease: 'sine.inOut' }, t(85));
  tl.to(pu, { x: -3.2, y: 3.4, duration: 2, ease: 'sine.inOut' }, t(78.4));                                       // eyes on the dark at the tunnel's mouth
  tl.to(pu, { x: 0.2, y: -2.8, duration: 5.5, ease: 'sine.inOut' }, t(80.8));                                     // slowly lifts them up the cutting
  tl.to(pu, { x: 1.5, y: -3.4, duration: 4, ease: 'sine.inOut' }, t(88));
  tl.to(ey, { scaleY: 1.22, duration: 1.6, ease: 'sine.out' }, t(88.4));                                         // 'with dread'
  tl.to([bl, br], { y: -3, duration: 1.6, ease: 'sine.out' }, t(88.4));
  tl.to(bl, { rotation: -16, duration: 1.8, ease: 'sine.out' }, t(88.4)); tl.to(br, { rotation: 16, duration: 1.8, ease: 'sine.out' }, t(88.4));
  [82.5, 90.2, 95.8].forEach((b) => tl.to(ey, { scaleY: 0.08, duration: 0.09, yoyo: true, repeat: 1, ease: 'none' }, t(b)));   // slow blinks
  steam(cl, { x: 640, y: 282, n: 3, s: 0.45, dx: -18, dy: -50, color: 'rgba(215,230,250,0.4)', T: t(80), D: D - 80 });
  redLamp(cl, { x: 1010, y: 600, s: 1.4, T: t(77), D: D - 77 });
  motes(cl, { x0: 300, x1: 980, y0: 150, y1: 560, n: 20, color: 'rgba(255,140,110,0.8)', T: t(77), D: D - 77, size: 2.4, rise: -30, seed: 63 });
})();
