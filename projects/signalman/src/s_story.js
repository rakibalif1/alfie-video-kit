// ===== SCENE story: night at the stove, three memory visions (tunnel / dusk train / now with the bell) =====
(function () {
  const c = S('story'), w = win('story'), T = w.T, D = w.D, R = rr(404);
  const at = (f) => T + D * f;                       // fraction of scene -> absolute seconds
  const world = box(c, { left: 0, top: 0, width: W, height: H }), push = box(world, { left: 0, top: 0, width: W, height: H });
  drift(world, T, D, { s0: 1.0, s1: 1.05, x0: 0, x1: -10, y0: 0, y1: -6 });

  // ---------- ghost: pale translucent man, left arm across face, right arm waving ----------
  function ghost(p, o) {   // o: {x,y(feet),s,T0,T1(fade out start),per(wave period),fin}
    const s = o.s, g = box(p, { left: o.x - 60 * s, top: o.y - 230 * s, width: 120 * s, height: 230 * s, opacity: 0, filter: 'drop-shadow(0 0 7px rgba(215,232,255,0.95)) drop-shadow(0 0 24px rgba(120,165,255,0.65))' });
    g.innerHTML = `<svg viewBox="0 0 120 230" width="100%" height="100%" style="overflow:visible"><defs><linearGradient id="gg${o.x | 0}${o.T0 | 0}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef5ff" stop-opacity="0.85"/><stop offset="0.65" stop-color="#b8cdf2" stop-opacity="0.5"/><stop offset="1" stop-color="#8aa6e0" stop-opacity="0"/></linearGradient></defs><g class="gb"><path d="M36 58 Q50 50 66 56 Q72 80 74 130 Q80 180 88 224 Q70 214 62 226 Q50 214 38 226 Q30 214 24 224 Q36 170 40 130 Q38 90 36 58Z" fill="url(#gg${o.x | 0}${o.T0 | 0})"/><circle cx="52" cy="34" r="14" fill="#e9f2ff" fill-opacity="0.8"/></g><path d="M40 64 Q22 62 27 46 Q32 34 52 32" stroke="#f2f7ff" stroke-opacity="0.9" stroke-width="9" stroke-linecap="round" fill="none"/><g class="ga"><path d="M66 60 Q86 52 96 34 Q102 22 100 8" stroke="#f2f7ff" stroke-opacity="0.9" stroke-width="8" stroke-linecap="round" fill="none"/><circle cx="100" cy="5" r="6" fill="#f2f7ff" fill-opacity="0.9"/></g></svg>`;
    const arm = g.querySelector('.ga'), body = g.querySelector('.gb'), n = Math.floor((o.T1 - o.T0) / o.per);
    tl.fromTo(g, { opacity: 0 }, { opacity: 0.8, duration: o.fin || 2.5, ease: 'sine.inOut' }, o.T0);
    tl.fromTo(arm, { rotation: -16, svgOrigin: '66 60' }, { rotation: 24, svgOrigin: '66 60', duration: o.per, repeat: n, yoyo: true, ease: 'sine.inOut' }, o.T0 + 1);
    tl.fromTo(body, { skewX: -2, svgOrigin: '52 226' }, { skewX: 2, svgOrigin: '52 226', duration: 2.4, repeat: Math.floor((o.T1 - o.T0) / 2.4), yoyo: true, ease: 'sine.inOut' }, o.T0);
    for (let t = o.T0 + 2; t < o.T1; t += 0.25 + R() * 0.3) tl.set(g, { opacity: 0.66 + R() * 0.2 }, t);
    if (o.T1 < T + D - 1) tl.to(g, { opacity: 0, duration: 2, ease: 'sine.in' }, o.T1);
    return g;
  }

  // ---------- vision container with soft memory mask ----------
  function vision(f0, f1, cx, cy, rx, ry, tint) {
    const t0 = at(f0), L = D * (f1 - f0), v = box(c, { left: 0, top: 0, width: W, height: H, opacity: 0, zIndex: 5, filter: tint || 'none' });
    const m = `radial-gradient(ellipse ${rx}px ${ry}px at ${cx}px ${cy}px, #000 48%, rgba(0,0,0,0) 100%)`; v.style.webkitMaskImage = m; v.style.maskImage = m;
    const scn = box(v, { left: 0, top: 0, width: W, height: H });
    tl.fromTo(v, { opacity: 0 }, { opacity: 1, duration: 3, ease: 'sine.inOut' }, t0).to(v, { opacity: 0, duration: 3, ease: 'sine.inOut' }, t0 + L - 3);
    return { v, scn, t0, L };
  }
  // tunnel mouth with red lamp, rails, cutting walls. o: {top,mid,bot,stars,seed}
  function tunnelScene(p, o, t0, L) {
    sky(p, { top: o.top, mid: o.mid, bot: o.bot, stars: o.stars, seed: o.seed, T: t0, D: L });
    ridge(p, { y: 290, h: 250, color: '#0a0d17', amp: 70, seed: o.seed + 1, trees: 18, treeH: 90, T: t0, D: L, drift: -30 });
    box(p, { left: 0, top: 470, width: W, height: 250, background: '#06070b' });
    tunnel(p, { x: 620, y: 470, w: 380, h: 280, T: t0, D: L, seed: o.seed + 2 });
    cuttingWalls(p, { innerL: 330, innerR: 930, seed: o.seed + 3, colorL: '#0b0a0d', colorR: '#0b0a0d' });
    rails(p, { vx: 620, vy: 470, x0: 380, x1: 900, y0: 740 });
    redLamp(p, { x: 800, y: 540, s: 1.0, T: t0, D: L });
    mist(p, { y: 430, h: 150, op: 0.3, n: 3, T: t0, D: L, seed: o.seed + 4 });
  }

  // ---------- BASE: the box interior at night ----------
  let planks = ''; for (let i = 0; i < 26; i++) planks += `<rect x="${i * 50}" y="0" width="2" height="560" fill="#000" opacity="${0.35 + R() * 0.3}"/>`;
  box(push, { left: 0, top: 0, width: W, height: 560, background: 'linear-gradient(#0d0a0b, #130d0b 60%, #090607)' }, `<svg width="${W}" height="560">${planks}</svg>`);
  box(push, { left: 0, top: 560, width: W, height: 160, background: 'linear-gradient(#0a0605, #030203)' });
  box(push, { left: 0, top: 556, width: W, height: 6, background: '#1b110c' });
  // small window with wind-blown mist and a far red lamp
  const wn = box(push, { left: 120, top: 130, width: 190, height: 190, overflow: 'hidden', background: 'linear-gradient(#0a1230, #1a2848)', border: '8px solid #060405', boxSizing: 'border-box' });
  mist(wn, { y: 60, h: 120, op: 0.45, n: 3, T: T, D: D, speed: 2.2, seed: 12 });
  box(wn, { left: 120, top: 112, width: 8, height: 8, borderRadius: '50%', background: '#ff3b2a', boxShadow: '0 0 18px 8px rgba(255,50,30,0.6)' });
  box(wn, { left: 88, top: 0, width: 5, height: 190, background: '#060405' });
  // wall lamp
  lamp(push, { x: 420, y: 230, s: 1.2, T: T, D: D });
  // wall shadows of the two men (flicker with the fire)
  const sh1 = box(push, { left: 600, top: 250, width: 120, height: 300, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', filter: 'blur(22px)' }), sh2 = box(push, { left: 880, top: 270, width: 120, height: 280, borderRadius: '50%', background: 'rgba(0,0,0,0.45)', filter: 'blur(22px)' });
  for (let t = T; t < T + D; t += 0.35 + R() * 0.3) { tl.to(sh1, { x: (R() - 0.5) * 22, scaleY: 0.96 + R() * 0.1, duration: 0.4, ease: 'sine.inOut' }, t); tl.to(sh2, { x: (R() - 0.5) * 22, scaleY: 0.96 + R() * 0.1, duration: 0.4, ease: 'sine.inOut' }, t); }
  // stove, pipe, door glow, embers
  box(push, { left: 753, top: 0, width: 14, height: 460, background: 'linear-gradient(90deg,#0a0809,#1a1413,#0a0809)' });
  box(push, { left: 706, top: 452, width: 108, height: 108, borderRadius: '36px 36px 8px 8px', background: 'linear-gradient(90deg,#0b0807,#221612 50%,#0b0807)', border: '1px solid rgba(255,140,60,0.3)' });
  box(push, { left: 722, top: 556, width: 8, height: 14, background: '#050303' }); box(push, { left: 790, top: 556, width: 8, height: 14, background: '#050303' });
  const door = box(push, { left: 738, top: 492, width: 44, height: 34, borderRadius: 4, background: 'linear-gradient(#ffd27a,#ff7a18)', opacity: 0.9 });
  for (let t = T; t < T + D; t += 0.1 + R() * 0.14) tl.set(door, { opacity: 0.65 + R() * 0.35 }, t);
  steam(push, { x: 760, y: 190, n: 5, dx: 40, dy: -110, s: 1.3, color: 'rgba(120,120,130,0.2)', T: T, D: D });
  const fg = glow(push, { x: 760, y: 500, r: 380, T: T, D: D, op: 0.85 });
  [at(0.065), at(0.47)].forEach((t) => tl.to(fg, { scale: 1.12, duration: 1.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t));
  for (let i = 0; i < 9; i++) { const e = box(push, { left: 750 + R() * 20, top: 480, width: 3, height: 3, borderRadius: '50%', background: '#ffb347', opacity: 0, boxShadow: '0 0 6px #ff8a3d' }); const du = 3 + R() * 2.5; tl.fromTo(e, { y: 0, x: 0, opacity: 0.9 }, { y: -(120 + R() * 150), x: (R() - 0.5) * 80, opacity: 0, duration: du, repeat: Math.floor(D / du), ease: 'sine.out' }, T + R() * 6); }
  // two seated silhouettes facing the stove
  function sitter(x, flip, o) {
    const e = box(push, { left: x - 80, top: 560 - 228, width: 160, height: 230, transform: flip ? 'scaleX(-1)' : 'none', filter: `drop-shadow(${flip ? -4 : 4}px 0 2px rgba(255,150,60,0.55))` });
    e.innerHTML = `<svg viewBox="0 0 160 230" width="100%" height="100%" style="overflow:visible"><rect x="22" y="92" width="5" height="64" fill="#040304"/><rect x="22" y="152" width="62" height="6" fill="#040304"/><rect x="26" y="158" width="5" height="68" fill="#040304"/><rect x="76" y="158" width="5" height="68" fill="#040304"/><path d="M40 64 Q34 104 40 152 L74 152 L78 92 Q82 66 62 58Z" fill="#07090e"/><path d="M48 148 L108 146" stroke="#07090e" stroke-width="21" stroke-linecap="round"/><path d="M108 148 L112 216" stroke="#07090e" stroke-width="16" stroke-linecap="round"/><path d="M110 220 L134 220" stroke="#07090e" stroke-width="9" stroke-linecap="round"/><path d="M62 82 Q88 108 102 138" stroke="#0a0c12" stroke-width="11" stroke-linecap="round" fill="none"/><g class="hd"><circle cx="64" cy="38" r="14" fill="#07090e"/>${o.beard ? '<path d="M62 42 Q80 40 80 52 Q74 70 60 62Z" fill="#07090e"/><rect x="66" y="26" width="16" height="5" fill="#07090e"/>' : '<rect x="50" y="22" width="28" height="5" rx="2" fill="#07090e"/><rect x="55" y="6" width="18" height="18" rx="2" fill="#07090e"/>'}</g></svg>`;
    return e.querySelector('.hd');
  }
  const hS = sitter(560, false, { beard: true }), hN = sitter(960, true, {});
  const nod = (h, t, a) => tl.to(h, { rotation: a, svgOrigin: '60 52', duration: 1.4, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t);
  [0.03, 0.09, 0.15, 0.24, 0.3, 0.37, 0.45, 0.62, 0.7, 0.9].forEach((f, i) => nod(i % 2 ? hS : hN, at(f), i % 2 ? 7 : -5));
  for (let k = 0; k < 4; k++) tl.to(hS, { rotation: k % 2 ? 10 : -10, svgOrigin: '60 52', duration: 0.9, ease: 'sine.inOut' }, at(0.43) + k * 0.95);   // interlude 2: the signalman shakes his head
  tl.to(hS, { rotation: 0, svgOrigin: '60 52', duration: 1, ease: 'sine.inOut' }, at(0.43) + 3.9);
  // wind in the tunnel: low drifting mist across the room, and a gap-draught at the floor
  mist(push, { y: 400, h: 190, op: 0.2, n: 5, T: T, D: D, speed: 2.6, seed: 31 });
  // the bell on the wall (hangs silent until the end)
  const bx = 1175, by = 150, bg = box(push, { left: bx - 90, top: by - 90, width: 180, height: 180 });
  const cold = box(bg, { left: 0, top: 0, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(190,215,255,0.45), rgba(0,0,0,0) 65%)', opacity: 0, mixBlendMode: 'screen' });
  box(bg, { left: 62, top: 14, width: 56, height: 12, background: '#050404', borderRadius: 2 });
  const bell = box(bg, { left: 70, top: 20, width: 40, height: 62, transformOrigin: '50% 4px' }, `<svg viewBox="0 0 40 62" width="100%" height="100%" style="overflow:visible"><rect x="18" y="0" width="4" height="12" fill="#050404"/><path d="M20 8 Q4 12 4 40 L0 50 H40 L36 40 Q36 12 20 8Z" fill="#3a2610" stroke="#0a0604" stroke-width="1.5"/><path d="M36 40 L40 50 H34Z" fill="#e0a850"/><path d="M26 16 Q34 22 34 40" stroke="#c9944a" stroke-width="2" fill="none" opacity="0.8"/><circle cx="20" cy="54" r="4" fill="#120a05"/><path d="M20 8 Q4 12 4 40 L0 50 H40 L36 40 Q36 12 20 8Z" fill="none" stroke="#d6e6ff" stroke-width="1.6" class="rim" opacity="0"/></svg>`);
  const rim = bell.querySelector('.rim');
  const v3a = at(0.789), L3 = D * 0.211;
  tl.to(cold, { opacity: 0.8, duration: 10, ease: 'sine.inOut' }, v3a + 2); tl.to(rim, { opacity: 0.9, duration: 10 }, v3a + 2);
  const swayAmp = [0.8, 1.6, 2.6, 3.8, 5, 6.2, 6.6, 7.2]; let st = v3a + L3 - 9.5;
  swayAmp.forEach((a, i) => { tl.to(bell, { rotation: (i % 2 ? -1 : 1) * a, duration: 1.15, ease: 'sine.inOut' }, st); st += 1.15; });
  // interlude 1 is darker
  const dim = box(push, { left: 0, top: 0, width: W, height: H, background: '#000', opacity: 0.38 }); tl.to(dim, { opacity: 0.05, duration: D * 0.3, ease: 'none' }, T);

  // ---------- VISION 1: a year ago, night, ghost, then the crash implied ----------
  const V1 = vision(0.158, 0.395, 640, 360, 760, 470, 'saturate(0.8) brightness(0.95)');
  tunnelScene(V1.scn, { top: '#03040e', mid: '#0a1330', bot: '#1c2b52', stars: 55, seed: 71 }, V1.t0, V1.L);
  ghost(V1.scn, { x: 665, y: 535, s: 1.25, T0: V1.t0 + 4, T1: V1.t0 + 22, per: 0.3, fin: 2.5 });
  for (let t = V1.t0 + 6.5; t < V1.t0 + 22; t += 0.06 + R() * 0.06) tl.set(V1.scn, { x: (R() - 0.5) * 5, y: (R() - 0.5) * 3.5 }, t);
  tl.set(V1.scn, { x: 0, y: 0 }, V1.t0 + 22.1);
  const cb = glow(V1.scn, { x: 620, y: 430, r: 300, color: 'rgba(255,115,28,0.95)', op: 0, T: V1.t0, D: V1.L, flicker: false });
  tl.fromTo(cb, { opacity: 0, scale: 0.25 }, { opacity: 1, scale: 1.5, duration: 8, ease: 'power2.out' }, V1.t0 + 22);
  const core = glow(V1.scn, { x: 620, y: 440, r: 120, color: 'rgba(255,225,160,0.95)', op: 0, T: V1.t0, D: V1.L, flicker: false });
  tl.fromTo(core, { opacity: 0, scale: 0.3 }, { opacity: 0.9, scale: 1.3, duration: 6, ease: 'power2.out' }, V1.t0 + 22.4);
  [0, 1.6].forEach((d) => { const ring = box(V1.scn, { left: 620 - 60, top: 440 - 42, width: 120, height: 84, borderRadius: '50%', border: '3px solid rgba(255,175,95,0.75)', boxShadow: '0 0 20px 4px rgba(255,140,50,0.4)', opacity: 0 }); tl.fromTo(ring, { scale: 0.2, opacity: 0.85 }, { scale: 8, opacity: 0, duration: 6.5, ease: 'power2.out' }, V1.t0 + 23 + d); });
  for (let i = 0; i < 13; i++) { const ex = 620 + (R() - 0.5) * 1000, d0 = V1.t0 + 23.5 + R() * 4.5, e = box(V1.scn, { left: 618, top: 438, width: 5, height: 5, borderRadius: '50%', background: '#ffe2a0', boxShadow: '0 0 10px 3px rgba(255,190,90,0.8)', opacity: 0 }); tl.fromTo(e, { x: 0, y: 0, scale: 0.4, opacity: 0.95 }, { x: ex - 620, y: 300 + R() * 60, scale: 2.8, opacity: 0, duration: 3 + R() * 1.2, ease: 'power2.in' }, d0); }

  // ---------- VISION 2: dusk, ghost again, a train of lit windows slides past ----------
  const V2 = vision(0.579, 0.789, 640, 360, 780, 480, 'saturate(0.8) brightness(0.95)');
  tunnelScene(V2.scn, { top: '#141a30', mid: '#38364f', bot: '#8a5a50', stars: 6, seed: 93 }, V2.t0, V2.L);
  ghost(V2.scn, { x: 665, y: 535, s: 1.25, T0: V2.t0 + 3, T1: V2.t0 + 11, per: 1.7, fin: 3 });
  const train = box(V2.scn, { left: 0, top: 350, width: 2600, height: 230 });
  let tr = ''; for (let i = 0; i < 5; i++) { const x0 = i * 454; tr += `<rect x="${x0}" y="30" width="440" height="140" rx="8" fill="#06070a"/><rect x="${x0}" y="22" width="440" height="12" rx="6" fill="#0b0c11"/>`; for (let k = 0; k < 6; k++) { const wx = x0 + 28 + k * 66; tr += `<rect x="${wx}" y="62" width="50" height="54" rx="4" fill="url(#wg)"/>`; if (i === 2 && k === 3) tr += `<circle cx="${wx + 25}" cy="86" r="9" fill="#06070a"/><path d="M${wx + 8} 116 Q${wx + 10} 98 ${wx + 25} 96 Q${wx + 40} 98 ${wx + 42} 116Z" fill="#06070a"/><path d="M${wx + 15} 80 Q${wx + 25} 70 ${wx + 35} 80 L${wx + 33} 76 Q${wx + 25} 68 ${wx + 17} 76Z" fill="#06070a"/>`; } for (const wx of [60, 360]) tr += `<circle cx="${x0 + wx}" cy="182" r="16" fill="#050507"/>`; }
  tr += `<rect x="2270" y="50" width="170" height="120" rx="6" fill="#050608"/><rect x="2380" y="0" width="30" height="56" fill="#050608"/><rect x="2290" y="84" width="40" height="44" fill="url(#wg)"/>`;
  train.innerHTML = `<svg viewBox="0 0 2600 230" width="2600" height="230"><defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd48a"/><stop offset="1" stop-color="#e88a30"/></linearGradient></defs>${tr}</svg>`;
  const trainGlow = box(V2.scn, { left: 0, top: 520, width: W, height: 70, background: 'linear-gradient(rgba(255,170,70,0.0), rgba(255,150,60,0.22), rgba(255,150,60,0))' });
  tl.fromTo(train, { x: -2560 }, { x: 640 - 1161, duration: 14, ease: 'sine.out' }, V2.t0 + 12);
  tl.fromTo(trainGlow, { opacity: 0 }, { opacity: 1, duration: 4 }, V2.t0 + 12);
  const halo = glow(V2.scn, { x: 640, y: 436, r: 90, color: 'rgba(255,200,120,0.55)', op: 0, T: V2.t0, D: V2.L, flicker: false }); tl.to(halo, { opacity: 0.8, duration: 4 }, V2.t0 + 22);

  // ---------- VISION 3: now. ghost at the lamp, slowly waving; the bell waits on the wall ----------
  const V3 = vision(0.789, 1.0, 280, 340, 380, 400, 'saturate(0.85) brightness(1.0)');
  V3.scn.style.left = '-340px';
  tunnelScene(V3.scn, { top: '#02030a', mid: '#08102a', bot: '#14213f', stars: 70, seed: 111 }, V3.t0, V3.L);
  ghost(V3.scn, { x: 665, y: 535, s: 1.25, T0: V3.t0 + 3, T1: V3.t0 + V3.L + 5, per: 1.5, fin: 4 });
  // slow push toward the bell at the very end
  tl.to(push, { scale: 1.1, x: -70, y: 14, transformOrigin: '90% 20%', duration: 12, ease: 'sine.inOut' }, V3.t0 + V3.L - 14);
})();
