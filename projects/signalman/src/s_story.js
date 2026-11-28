// ===== SCENE story (v2): night at the stove, three memory visions (tunnel / dusk train / now with the bell) =====
(function () {
  const c = S('story'), w = win('story'), T = w.T, D = w.D, R = rr(404);
  const K = D / 185.5;                               // beats are written in seconds of the 185.5 s window (matches the new narration)
  const sec = (r) => T + r * K, ks = (r) => r * K;
  const world = box(c, { left: 0, top: 0, width: W, height: H }), push = box(world, { left: 0, top: 0, width: W, height: H });

  // ----- camera on the world box (explicit from/to so seeking anywhere is safe) -----
  let cur = { scale: 1, x: 0, y: 0 };
  const cam = (a, b, s, Px, Py, tx = 640, ty = 360, ease = 'sine.inOut') => {
    const to = { scale: s, x: tx - 640 - (Px - 640) * s, y: ty - 360 - (Py - 360) * s };
    tl.fromTo(world, { ...cur }, { ...to, duration: ks(b - a), ease }, sec(a)); cur = to;
  };
  tl.fromTo(world, { rotation: -0.25 }, { rotation: 0.25, duration: 9, yoyo: true, repeat: Math.ceil(D / 9), ease: 'sine.inOut' }, T);
  // breathing that leaves the arms free
  const breathe = (p, T0, D0, amt = 1) => {
    const n = Math.max(1, Math.floor(D0 / 3.4));
    tl.to(p.P.t, { scaleY: 1 + 0.014 * amt, duration: 1.7, yoyo: true, repeat: n * 2, ease: 'sine.inOut' }, T0);
    tl.to(p.P.h, { y: -1.1 * amt, duration: 1.7, yoyo: true, repeat: n * 2, ease: 'sine.inOut' }, T0 + 0.15);
    tl.to(p.P.tail, { rotation: 1.6, duration: 2.4, yoyo: true, repeat: Math.floor(D0 / 2.4), ease: 'sine.inOut' }, T0);
    tl.to(p.g, { rotation: 0.5 * amt, duration: 4.5, yoyo: true, repeat: Math.max(1, Math.floor(D0 / 4.5)), ease: 'sine.inOut', transformOrigin: '50% 100%' }, T0);
  };
  const pool = (p, x, y, w2, h2, col, op = 1) => box(p, { left: x - w2 / 2, top: y - h2 / 2, width: w2, height: h2, background: `radial-gradient(ellipse, ${col}, rgba(0,0,0,0) 70%)`, mixBlendMode: 'screen', opacity: op });
  const beats = (fn, list) => list.forEach((b) => fn(...b));

  // ---------- ghost: pale translucent man, left arm across face, right arm waving (slow, then wild) ----------
  function ghost(p, o) {   // o: {x,y(feet),s,T0,T1(fade out start),waveT,fastT,fin}
    const s = o.s, uid = `gg${o.x | 0}${o.T0 | 0}`;
    const g = box(p, { left: o.x - 60 * s, top: o.y - 230 * s, width: 120 * s, height: 230 * s, opacity: 0, filter: 'drop-shadow(0 0 7px rgba(215,232,255,0.95)) drop-shadow(0 0 26px rgba(120,165,255,0.7))' });
    g.innerHTML = `<svg viewBox="0 0 120 230" width="100%" height="100%" style="overflow:visible"><defs><linearGradient id="${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef5ff" stop-opacity="0.9"/><stop offset="0.65" stop-color="#b8cdf2" stop-opacity="0.55"/><stop offset="1" stop-color="#8aa6e0" stop-opacity="0"/></linearGradient></defs><g class="gb"><path d="M36 58 Q50 50 66 56 Q72 80 74 130 Q80 180 88 224 Q70 214 62 226 Q50 214 38 226 Q30 214 24 224 Q36 170 40 130 Q38 90 36 58Z" fill="url(#${uid})"/></g><g class="gh"><circle cx="52" cy="34" r="14" fill="#e9f2ff" fill-opacity="0.85"/><rect x="38" y="19" width="28" height="4" rx="2" fill="#e9f2ff" fill-opacity="0.8"/><rect x="42" y="8" width="20" height="13" rx="2" fill="#e9f2ff" fill-opacity="0.75"/></g><g class="gl"><path d="M40 64 Q22 62 27 46 Q32 34 52 32" stroke="#f2f7ff" stroke-opacity="0.95" stroke-width="9" stroke-linecap="round" fill="none"/></g><g class="ga"><path d="M66 60 Q86 52 96 34 Q102 22 100 8" stroke="#f2f7ff" stroke-opacity="0.95" stroke-width="8" stroke-linecap="round" fill="none"/><circle cx="100" cy="5" r="6" fill="#f2f7ff" fill-opacity="0.95"/></g></svg>`;
    const arm = g.querySelector('.ga'), body = g.querySelector('.gb'), head = g.querySelector('.gh'), la = g.querySelector('.gl');
    const wv = o.waveT, fa = o.fastT, E = o.T1;
    tl.fromTo(g, { opacity: 0 }, { opacity: 0.85, duration: o.fin || 2.5, ease: 'sine.inOut' }, o.T0);
    gsap.set(arm, { svgOrigin: '66 60' }); gsap.set(head, { svgOrigin: '52 48' }); gsap.set(la, { svgOrigin: '40 64' });
    tl.fromTo(arm, { rotation: -6 }, { rotation: 8, duration: 1.8, repeat: Math.max(1, Math.floor((wv - o.T0) / 1.8)), yoyo: true, ease: 'sine.inOut' }, o.T0 + 1);   // arm half-raised, trembling
    tl.fromTo(arm, { rotation: -16 }, { rotation: 24, duration: 0.75, repeat: Math.max(1, Math.floor((fa - wv) / 0.75)), yoyo: true, ease: 'sine.inOut' }, wv);   // waving
    tl.fromTo(arm, { rotation: -22 }, { rotation: 30, duration: 0.3, repeat: Math.max(1, Math.floor((E - fa) / 0.3)), yoyo: true, ease: 'sine.inOut' }, fa);       // wildly
    tl.fromTo(body, { skewX: -2, svgOrigin: '52 226' }, { skewX: 2, svgOrigin: '52 226', duration: 2.4, repeat: Math.floor((E - o.T0) / 2.4), yoyo: true, ease: 'sine.inOut' }, o.T0);
    tl.fromTo(head, { rotation: -4 }, { rotation: 5, duration: 2.1, repeat: Math.floor((E - o.T0) / 2.1), yoyo: true, ease: 'sine.inOut' }, o.T0);   // head turning away from the sight
    tl.fromTo(la, { rotation: -3 }, { rotation: 4, duration: 1.6, repeat: Math.floor((E - o.T0) / 1.6), yoyo: true, ease: 'sine.inOut' }, o.T0);
    tl.fromTo(g, { y: -3 }, { y: 4, duration: 3.1, repeat: Math.floor((E - o.T0) / 3.1), yoyo: true, ease: 'sine.inOut' }, o.T0);          // floats
    for (let t = o.T0 + 2; t < E; t += 0.3 + R() * 0.35) tl.set(g, { opacity: 0.68 + R() * 0.2 }, t);
    if (E < T + D - 1) tl.to(g, { opacity: 0, duration: 2, ease: 'sine.in' }, E);
    // cold halo + floor fog under it
    const hl = glow(p, { x: o.x, y: o.y - 150 * s, r: 210 * s, color: 'rgba(120,165,255,0.55)', op: 0, T: o.T0, D: E - o.T0 + 2, flicker: false });
    tl.to(hl, { opacity: 0.8, duration: o.fin || 2.5 }, o.T0).to(hl, { opacity: 0, duration: 2 }, E);
    return { g, halo: hl };
  }

  // ---------- vision container with soft memory mask (lives inside the camera world) ----------
  function vision(a, b, cx, cy, rx, ry, tint) {
    const t0 = sec(a), L = ks(b - a), v = box(world, { left: 0, top: 0, width: W, height: H, opacity: 0, zIndex: 5, filter: tint || 'none' });
    const m = `radial-gradient(ellipse ${rx}px ${ry}px at ${cx}px ${cy}px, #000 52%, rgba(0,0,0,0) 100%)`; v.style.webkitMaskImage = m; v.style.maskImage = m;
    const scn = box(v, { left: 0, top: 0, width: W, height: H });
    tl.fromTo(v, { opacity: 0 }, { opacity: 1, duration: 3, ease: 'sine.inOut' }, t0).to(v, { opacity: 0, duration: 3, ease: 'sine.inOut' }, t0 + L - 3);
    return { v, scn, t0, L };
  }
  // tunnel mouth with red lamp, rails, cutting walls, cold glow, drifting motes. o: {top,mid,bot,stars,seed}
  function tunnelScene(p, o, t0, L) {
    const far = box(p, { left: 0, top: 0, width: W, height: H });
    sky(far, { top: o.top, mid: o.mid, bot: o.bot, stars: o.stars, seed: o.seed, T: t0, D: L, moon: o.moon });
    ridge(far, { y: 290, h: 250, color: o.ridge || '#111a2c', amp: 70, seed: o.seed + 1, trees: 18, treeH: 90, T: t0, D: L, drift: -30 });
    tl.to(far, { x: -22, duration: L, ease: 'none' }, t0);
    box(p, { left: 0, top: 470, width: W, height: 250, background: 'linear-gradient(#10172a,#090c16)' });
    tunnel(p, { x: 620, y: 470, w: 380, h: 280, T: t0, D: L, seed: o.seed + 2 });
    cuttingWalls(p, { innerL: 330, innerR: 930, seed: o.seed + 3, colorL: '#161a2a', colorR: '#161a2a' });
    rails(p, { vx: 620, vy: 470, x0: 380, x1: 900, y0: 740 });
    glow(p, { x: 620, y: 420, r: 280, color: 'rgba(95,135,215,0.5)', op: 0.6, T: t0, D: L, flicker: false });   // cold light from the arch
    mist(p, { y: 430, h: 150, op: 0.38, n: 3, T: t0, D: L, seed: o.seed + 4, color: 'rgba(150,175,215,0.5)' });
    redLamp(p, { x: 800, y: 540, s: 1.0, T: t0, D: L });
    pool(p, 800, 560, 360, 60, 'rgba(255,60,40,0.4)', 0.8);                                                   // red light pooling on the rails
    motes(p, { x0: 380, x1: 900, y0: 300, y1: 560, n: 18, color: 'rgba(200,220,255,0.9)', T: t0, D: L, size: 2.4, rise: -30, seed: o.seed });
  }

  // ---------- BASE: the box interior at night ----------
  let planks = ''; for (let i = 0; i < 26; i++) planks += `<rect x="${i * 50}" y="0" width="2" height="560" fill="#000" opacity="${0.3 + R() * 0.25}"/>`;
  box(push, { left: 0, top: 0, width: W, height: 560, background: 'linear-gradient(#2a2229, #3a2a2a 60%, #1c1417)' }, `<svg width="${W}" height="560">${planks}</svg>`);
  box(push, { left: 0, top: 560, width: W, height: 160, background: 'linear-gradient(#2a1d1b, #0c0809)' });
  box(push, { left: 0, top: 556, width: W, height: 6, background: '#3a2418' });
  // small window with wind-blown mist and a far red lamp; moonlight beam falls into the room
  const wn = box(push, { left: 120, top: 130, width: 190, height: 190, overflow: 'hidden', background: 'linear-gradient(#1a2a60, #4a6aa6)', border: '8px solid #060405', boxSizing: 'border-box' });
  mist(wn, { y: 60, h: 120, op: 0.5, n: 3, T: T, D: D, speed: 2.2, seed: 12 });
  box(wn, { left: 120, top: 112, width: 8, height: 8, borderRadius: '50%', background: '#ff3b2a', boxShadow: '0 0 18px 8px rgba(255,50,30,0.6)' });
  box(wn, { left: 88, top: 0, width: 5, height: 190, background: '#060405' });
  lightCone(push, { x: 215, y: 320, len: 520, spread: 250, rot: -38, color: 'rgba(160,195,255,0.45)', op: 0.5, T, D });
  // wall lamp
  lamp(push, { x: 420, y: 230, s: 1.2, r: 230, T: T, D: D });
  // stove, pipe, door glow, embers
  box(push, { left: 753, top: 0, width: 14, height: 460, background: 'linear-gradient(90deg,#1a1413,#3a2c28,#1a1413)' });
  box(push, { left: 706, top: 452, width: 108, height: 108, borderRadius: '36px 36px 8px 8px', background: 'linear-gradient(90deg,#171110,#3a2822 50%,#171110)', border: '1px solid rgba(255,140,60,0.5)' });
  box(push, { left: 722, top: 556, width: 8, height: 14, background: '#050303' }); box(push, { left: 790, top: 556, width: 8, height: 14, background: '#050303' });
  const door = box(push, { left: 738, top: 492, width: 44, height: 34, borderRadius: 4, background: 'linear-gradient(#ffd27a,#ff7a18)', opacity: 0.9 });
  for (let t = T; t < T + D; t += 0.12 + R() * 0.14) tl.set(door, { opacity: 0.65 + R() * 0.35 }, t);
  steam(push, { x: 760, y: 190, n: 5, dx: 40, dy: -110, s: 1.3, color: 'rgba(170,170,185,0.25)', T: T, D: D });
  const fg = glow(push, { x: 760, y: 500, r: 460, T: T, D: D, op: 0.9 });
  pool(push, 760, 585, 1000, 110, 'rgba(255,150,70,0.55)', 0.9);
  [sec(12), sec(88), sec(150)].forEach((t) => tl.to(fg, { scale: 1.12, duration: 1.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t));
  for (let i = 0; i < 12; i++) { const e = box(push, { left: 750 + R() * 20, top: 480, width: 3, height: 3, borderRadius: '50%', background: '#ffb347', opacity: 0, boxShadow: '0 0 6px #ff8a3d' }); const du = 3 + R() * 2.5; tl.fromTo(e, { y: 0, x: 0, opacity: 0.9 }, { y: -(120 + R() * 150), x: (R() - 0.5) * 80, opacity: 0, duration: du, repeat: Math.floor(D / du), ease: 'sine.out' }, T + R() * 6); }
  motes(push, { x0: 400, x1: 1100, y0: 200, y1: 500, n: 30, color: 'rgba(255,215,160,0.9)', T, D, size: 2.4, rise: -40, seed: 5 });
  // the two men sit at their desks, facing the stove
  const sig = puppet(push, { x: 520, y: 525, s: 1.25, hat: 'cap', coat: '#1c2438', coat2: '#0d1222', rim: 'rgba(255,175,100,0.85)' });
  const nar = puppet(push, { x: 1000, y: 525, s: 1.25, hat: 'top', rim: 'rgba(255,175,100,0.85)', flip: true });
  nar.g.style.transform = ''; gsap.set(nar.g, { scaleX: -1 });
  [sig, nar].forEach((p) => gsap.set([p.P.lb, p.P.lf], { opacity: 0 }));
  breathe(sig, T, D, 1.2); breathe(nar, T + 0.7, D, 1.0);
  pool(push, 760, 400, 900, 380, 'rgba(255,150,70,0.22)', 1);
  // desks in front of them (lit along the stove side), instrument, cup
  const desk = (x, wd) => { box(push, { left: x, top: 452, width: wd, height: 150, background: 'linear-gradient(#3a2a22,#190f0c)' }); box(push, { left: x, top: 450, width: wd, height: 3, background: 'rgba(255,180,100,0.6)' }); };
  desk(360, 300); desk(870, 300);
  box(push, { left: 572, top: 412, width: 70, height: 40, background: 'linear-gradient(#6a4a22,#2a1a0c)', border: '2px solid #0a0604', boxSizing: 'border-box' });
  box(push, { left: 600, top: 424, width: 14, height: 8, background: '#ffd27a', opacity: 0.85 });
  box(push, { left: 920, top: 424, width: 20, height: 26, borderRadius: '2px 2px 6px 6px', background: '#5a4a3a', border: '2px solid #0a0604', boxSizing: 'border-box' });
  steam(push, { x: 930, y: 420, n: 2, dx: 8, dy: -50, s: 0.5, color: 'rgba(210,210,220,0.3)', T: T, D: D });
  mist(push, { y: 480, h: 130, op: 0.18, n: 4, T: T, D: D, speed: 2.4, seed: 31 });
  // ---- life: signalman (left) tells it, narrator (right) listens ----
  beats((a, b, c2) => sig.head(a, sec(b), c2), [[-4, 3, 2], [6, 6, 2], [-3, 14, 1.4], [-6, 22, 1.6], [10, 28.2, 2], [4, 40, 2], [-8, 52, 2], [0, 66, 2], [5, 76, 2], [-4, 86, 2.4], [6, 100, 2], [2, 106, 2], [4, 130, 2], [-6, 156, 2.5], [18, 171.7, 2.2], [-6, 176, 2], [12, 180, 2]]);
  for (let k = 0; k < 4; k++) tl.to(sig.P.h, { rotation: k % 2 ? 10 : -10, duration: 0.9, ease: 'sine.inOut' }, sec(122.4) + k * 0.95);   // "I thought so too": he shakes his head
  sig.head(0, sec(126.4), 1.2);
  beats((a, b, c2, d, e) => sig.arm(a, b, c2, sec(d), e), [
    ['f', -50, -45, 14, 1.2], ['f', -8, -8, 17.5, 1.5],                      // "I will tell you": open hand
    ['b', -60, -35, 21.6, 1.2], ['f', -60, -35, 21.8, 1.2], ['b', -6, -6, 24.4, 1.5], ['f', -6, -6, 24.6, 1.5],   // "something wrong with this place"
    ['f', -88, -6, 25.2, 1.0], ['f', -8, -8, 28.4, 1.6],                    // "I see something here": points
    ['f', 100, 80, 51.8, 1.0], ['f', 96, 76, 56, 3],                         // arm across his face, as the figure's
    ['b', 150, 20, 60.3, 1.0], ['b', 172, -10, 61.4, 0.5], ['b', 150, 20, 61.9, 0.5], ['b', 172, -10, 62.4, 0.5], ['b', 150, 20, 62.9, 0.5], ['b', 172, -10, 63.6, 0.3], ['b', 150, 20, 64.0, 0.3], ['b', 172, -10, 64.4, 0.3], ['b', 150, 20, 64.8, 0.3], ['b', 5, 5, 66.5, 1.6],
    ['f', 8, 6, 67.5, 1.4], ['f', -88, -4, 69.4, 0.6], ['f', -88, -4, 71, 0.4], ['f', -8, -8, 72.2, 1.6],   // "Stop. Stop."
    ['b', -70, -30, 92.8, 1.4], ['b', -8, -8, 97, 2],                       // the crash, told
    ['f', 100, 80, 138, 1.0], ['f', 96, 76, 141, 3], ['b', 150, 20, 141.7, 0.8], ['b', 172, -10, 142.5, 0.4], ['b', 150, 20, 143.0, 0.4], ['b', 172, -10, 143.5, 0.4], ['b', 5, 5, 145.5, 1.6], ['f', 6, 6, 146, 1.4],
    ['f', -40, -70, 147, 1.0], ['f', -34, -80, 148.5, 0.5], ['f', -40, -70, 149.2, 0.5], ['f', -34, -80, 150, 0.5], ['f', -6, -6, 152, 1.6],       // tapping the telegraph
    ['f', 30, 30, 160, 3], ['f', 5, 5, 170, 3], ['b', 20, 20, 172, 2.5], ['b', 4, 4, 177, 2], ['f', -50, -50, 177.4, 1.2], ['f', -4, -4, 181.4, 2]]);
  beats((a, b, c2) => nar.head(a, sec(b), c2), [[6, 4, 2], [-4, 13, 2], [8, 22, 1.6], [-6, 25.2, 1.6], [4, 33, 2.4], [-6, 47, 2], [8, 60, 2.4], [-8, 75, 2], [4, 88, 2.4], [8, 100, 2], [0, 104, 1.6], [-5, 112, 2], [6, 118, 2], [-6, 126.2, 2], [6, 138, 2.4], [-4, 150, 2.4], [8, 160, 2.4], [14, 171, 2], [-8, 176, 2], [4, 182, 2]]);
  beats((a, b, c2, d, e) => nar.arm(a, b, c2, sec(d), e), [
    ['f', 50, 115, 45, 1.8], ['f', 44, 108, 56, 4], ['f', -6, -6, 62, 2],       // hand to his chin at the reveal
    ['f', 20, 50, 84, 2], ['f', -6, -6, 90, 2],
    ['f', -60, -45, 103.4, 1.0], ['f', -50, -60, 107, 1.2], ['f', -64, -40, 110, 1.2], ['f', -8, -8, 114, 1.8],     // "what a reasonable man says"
    ['f', 8, 8, 120, 2], ['f', 52, 118, 126.5, 1.6], ['f', 48, 110, 136, 4], ['f', -6, -6, 142, 2],
    ['b', 12, 12, 154, 2.4], ['b', 4, 4, 164, 2.4], ['f', 40, 100, 172, 2], ['f', -4, -4, 180, 2.4]]);
  breathFog(push, 520 + 8, 525 - 176 * 1.25, sec(10), ks(170), 3.0, 30);
  breathFog(push, 1000 - 8, 525 - 176 * 1.25, sec(12), ks(170), 3.2, -30);
  // the bell on the wall (hangs silent until the end)
  const bx = 1175, by = 150, bg = box(push, { left: bx - 90, top: by - 90, width: 180, height: 180 });
  const cold = box(bg, { left: 0, top: 0, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(190,215,255,0.45), rgba(0,0,0,0) 65%)', opacity: 0.15, mixBlendMode: 'screen' });
  box(bg, { left: 62, top: 14, width: 56, height: 12, background: '#050404', borderRadius: 2 });
  const bell = box(bg, { left: 70, top: 20, width: 40, height: 62, transformOrigin: '50% 4px' }, `<svg viewBox="0 0 40 62" width="100%" height="100%" style="overflow:visible"><rect x="18" y="0" width="4" height="12" fill="#050404"/><path d="M20 8 Q4 12 4 40 L0 50 H40 L36 40 Q36 12 20 8Z" fill="#5a3c18" stroke="#0a0604" stroke-width="1.5"/><path d="M36 40 L40 50 H34Z" fill="#e0a850"/><path d="M26 16 Q34 22 34 40" stroke="#e0b060" stroke-width="2" fill="none" opacity="0.9"/><circle cx="20" cy="54" r="4" fill="#120a05"/><path d="M20 8 Q4 12 4 40 L0 50 H40 L36 40 Q36 12 20 8Z" fill="none" stroke="#d6e6ff" stroke-width="1.6" class="rim" opacity="0.2"/></svg>`);
  const rim = bell.querySelector('.rim');
  const v3a = sec(174.5);
  tl.to(cold, { opacity: 0.8, duration: ks(11), ease: 'sine.inOut' }, v3a); tl.to(rim, { opacity: 0.9, duration: ks(11) }, v3a);
  tl.to(bell, { rotation: 0.6, duration: 2.6, yoyo: true, repeat: Math.floor(ks(160) / 2.6), ease: 'sine.inOut' }, T);    // the slightest tremble all along
  const swayAmp = [0.8, 1.6, 2.6, 3.8, 5, 6.2, 6.6, 7.2]; let st = T + D - 9.5;
  swayAmp.forEach((a, i) => { tl.to(bell, { rotation: (i % 2 ? -1 : 1) * a, duration: 1.15, ease: 'sine.inOut' }, st); st += 1.15; });

  // ---------- VISION 1: a year ago, night, the figure at the tunnel (45 s), the arch empty, the crash implied ----------
  const V1 = vision(30, 104.5, 640, 360, 780, 480, 'saturate(0.85) brightness(1.0)');
  tunnelScene(V1.scn, { top: '#0b1634', mid: '#1f3468', bot: '#54739f', stars: 55, seed: 71, moon: { x: 1000, y: 120, r: 20 } }, V1.t0, V1.L);
  const g1 = ghost(V1.scn, { x: 665, y: 535, s: 1.25, T0: sec(45), T1: sec(83.4), waveT: sec(60.2), fastT: sec(63.6), fin: 3 });
  const cry = glow(V1.scn, { x: 665, y: 330, r: 330, color: 'rgba(190,215,255,0.75)', op: 0, T: V1.t0, D: V1.L, flicker: false });
  [[40.4, 2.4], [75.1, 3.4]].forEach(([t, d]) => {                                      // two cries: a flinch of cold light and a small shake
    tl.fromTo(cry, { opacity: 0 }, { opacity: 0.7, duration: 0.4, ease: 'sine.out' }, sec(t)).to(cry, { opacity: 0, duration: d, ease: 'sine.in' }, sec(t) + 0.4);
    for (let u = sec(t); u < sec(t) + d; u += 0.07 + R() * 0.06) tl.set(V1.scn, { x: (R() - 0.5) * 5 * (1 - (u - sec(t)) / d), y: (R() - 0.5) * 3.5 * (1 - (u - sec(t)) / d) }, u);
    tl.set(V1.scn, { x: 0, y: 0 }, sec(t) + d + 0.1);
  });
  const cb = glow(V1.scn, { x: 620, y: 430, r: 300, color: 'rgba(255,115,28,0.95)', op: 0, T: V1.t0, D: V1.L, flicker: false });
  tl.fromTo(cb, { opacity: 0, scale: 0.25 }, { opacity: 1, duration: ks(8), ease: 'power2.out' }, sec(93.5)).to(cb, { scale: 1.5, duration: ks(8), ease: 'power2.out' }, sec(93.5));
  const core = glow(V1.scn, { x: 620, y: 440, r: 120, color: 'rgba(255,225,160,0.95)', op: 0, T: V1.t0, D: V1.L, flicker: false });
  tl.fromTo(core, { opacity: 0, scale: 0.3 }, { opacity: 0.9, scale: 1.3, duration: ks(6), ease: 'power2.out' }, sec(94));
  [0, 1.6].forEach((d) => { const ring = box(V1.scn, { left: 620 - 60, top: 440 - 42, width: 120, height: 84, borderRadius: '50%', border: '3px solid rgba(255,175,95,0.75)', boxShadow: '0 0 20px 4px rgba(255,140,50,0.4)', opacity: 0 }); tl.fromTo(ring, { scale: 0.2, opacity: 0.85 }, { scale: 8, opacity: 0, duration: ks(6.5), ease: 'power2.out' }, sec(94.5) + d); });
  for (let i = 0; i < 13; i++) { const ex = 620 + (R() - 0.5) * 1000, d0 = sec(95 + R() * 4.5), e = box(V1.scn, { left: 618, top: 438, width: 5, height: 5, borderRadius: '50%', background: '#ffe2a0', boxShadow: '0 0 10px 3px rgba(255,190,90,0.8)', opacity: 0 }); tl.fromTo(e, { x: 0, y: 0, scale: 0.4, opacity: 0.95 }, { x: ex - 620, y: 300 + R() * 60, scale: 2.8, opacity: 0, duration: 3 + R() * 1.2, ease: 'power2.in' }, d0); }

  // ---------- VISION 2: dusk, the figure again (130-146 s), then a train of lit windows slides slowly to a halt ----------
  const V2 = vision(126, 177, 640, 360, 800, 490, 'saturate(0.85) brightness(1.0)');
  tunnelScene(V2.scn, { top: '#262c4a', mid: '#5a4a68', bot: '#c0785a', stars: 6, seed: 93, ridge: '#2a2236' }, V2.t0, V2.L);
  ghost(V2.scn, { x: 665, y: 535, s: 1.25, T0: sec(130), T1: sec(146), waveT: sec(141.6), fastT: sec(144.2), fin: 3 });
  const train = box(V2.scn, { left: 0, top: 350, width: 2600, height: 230 });
  let tr = ''; for (let i = 0; i < 5; i++) { const x0 = i * 454; tr += `<rect x="${x0}" y="30" width="440" height="140" rx="8" fill="#0c0d12"/><rect x="${x0}" y="22" width="440" height="12" rx="6" fill="#171923"/>`; for (let k = 0; k < 6; k++) { const wx = x0 + 28 + k * 66; tr += `<rect x="${wx}" y="62" width="50" height="54" rx="4" fill="url(#wg)"/>`; if (i === 2 && k === 3) tr += `<circle cx="${wx + 25}" cy="86" r="9" fill="#06070a"/><path d="M${wx + 8} 116 Q${wx + 10} 98 ${wx + 25} 96 Q${wx + 40} 98 ${wx + 42} 116Z" fill="#06070a"/><path d="M${wx + 15} 80 Q${wx + 25} 70 ${wx + 35} 80 L${wx + 33} 76 Q${wx + 25} 68 ${wx + 17} 76Z" fill="#06070a"/>`; } for (const wx of [60, 360]) tr += `<circle cx="${x0 + wx}" cy="182" r="16" fill="#08090c"/>`; }
  tr += `<rect x="2270" y="50" width="170" height="120" rx="6" fill="#0c0d12"/><rect x="2380" y="0" width="30" height="56" fill="#0c0d12"/><rect x="2290" y="84" width="40" height="44" fill="url(#wg)"/>`;
  train.innerHTML = `<svg viewBox="0 0 2600 230" width="2600" height="230"><defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd48a"/><stop offset="1" stop-color="#e88a30"/></linearGradient></defs>${tr}</svg>`;
  const trainGlow = box(V2.scn, { left: 0, top: 500, width: W, height: 110, background: 'linear-gradient(rgba(255,170,70,0.0), rgba(255,150,60,0.32), rgba(255,150,60,0))' });
  tl.fromTo(train, { x: -2560 }, { x: 640 - 1161, duration: ks(17), ease: 'sine.out' }, sec(155.5));
  tl.fromTo(trainGlow, { opacity: 0 }, { opacity: 1, duration: 4 }, sec(155.5));
  steam(V2.scn, { x: 1000, y: 360, n: 4, dx: -60, dy: -90, s: 1.4, color: 'rgba(210,205,215,0.28)', T: sec(155.5), D: ks(20) });
  const halo = glow(V2.scn, { x: 640, y: 436, r: 120, color: 'rgba(255,200,120,0.6)', op: 0, T: V2.t0, D: V2.L, flicker: false }); tl.to(halo, { opacity: 0.85, duration: 4 }, sec(166));

  // ---------- VISION 3: now. the figure at the lamp, slowly waving; the bell waits on the wall (174.5 s -> end) ----------
  const V3 = vision(174.5, 185.5, 280, 340, 400, 420, 'saturate(0.9) brightness(1.0)');
  V3.scn.style.left = '-340px';
  tunnelScene(V3.scn, { top: '#091226', mid: '#16244a', bot: '#2e4676', stars: 70, seed: 111, moon: { x: 1000, y: 120, r: 20 } }, V3.t0, V3.L);
  ghost(V3.scn, { x: 665, y: 535, s: 1.25, T0: V3.t0 + 1, T1: V3.t0 + V3.L + 5, waveT: V3.t0 + 2, fastT: V3.t0 + 3, fin: 3 });
  // slow push toward the bell at the very end
  tl.to(push, { scale: 1.1, x: -70, y: 14, transformOrigin: '90% 20%', duration: ks(12), ease: 'sine.inOut' }, T + D - ks(12));

  // ---------- CAMERA PLAN ----------
  cam(0, 0.01, 1.0, 640, 360, 640, 360, 'none');
  cam(0.01, 13, 1.1, 600, 350, 640, 370);                  // wide of the room, push toward the signalman
  cam(13, 24, 1.32, 540, 330, 640, 350);                    // close on him: "I will tell you ... something wrong with this place"
  cam(24, 33, 1.05, 760, 400);                              // across to the stove as the vision opens
  cam(33, 43, 1.1, 640, 380);                               // the cutting a year ago, drifting
  cam(43, 52, 1.95, 665, 330, 640, 370);                    // push in on the figure at the tunnel mouth: the reveal
  cam(52, 70, 2.05, 665, 330, 640, 372, 'none');            // hold close while the arm covers the face and the other waves
  cam(70, 84, 1.3, 640, 400);                               // pull back at "Stop. Stop. Look out!"
  cam(84, 94, 1.55, 640, 420);                              // into the empty black arch
  cam(94, 104, 1.0, 640, 360);                              // the flare, wide
  cam(104, 126, 1.2, 760, 340, 640, 360, 'none');           // back in the box: the two men and the stove, slow drift
  cam(126, 138, 1.15, 640, 380);                            // dusk vision
  cam(138, 147, 1.7, 665, 340, 640, 370);                   // the figure again, close
  cam(147, 156, 1.0, 640, 360);                             // pull out: the telegraph, the wait
  cam(156, 166, 1.15, 640, 470, 640, 380, 'none');          // the train slides past
  cam(166, 173, 1.85, 640, 440, 640, 380);                  // slow push to the carriage window
  cam(173, 178, 1.0, 640, 360);
  cam(178, 185.5, 1.08, 820, 300, 640, 360, 'none');
})();
