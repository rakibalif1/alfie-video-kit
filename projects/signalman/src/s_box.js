// ===== BOX v2: the signal box interior. Narrator arrives, the room is shown, they talk and sit, he leaves; the red lamp waits in the window =====
// All beat times below are RELATIVE seconds inside the scene (matched to the voice lines, window 174.63-294.96).
(function () {
  const c = S('box'), w = win('box'), T = w.T, D = w.D, a = (r) => T + (r < 18 ? r : r + 3), R = rr(77);   // beats from r=18 on sit 3 s later: the voice lines 29-30 ('I went down') open the scene
  const NS = 'http://www.w3.org/2000/svg';
  const rig = box(c, { left: 0, top: 0, width: W, height: H, transformOrigin: '50% 50%', background: '#0a0705' });
  tl.set(rig, { scale: 1.025 }, 0);
  tl.fromTo(rig, { rotation: -0.25 }, { rotation: 0.25, duration: 7, yoyo: true, repeat: Math.ceil(D / 7), ease: 'sine.inOut', immediateRender: false }, T);
  const cam = box(rig, { left: 0, top: 0, width: W, height: H, transformOrigin: '0 0' });
  const back = box(cam, { left: 0, top: 0, width: W, height: H });
  const mid = box(cam, { left: 0, top: 0, width: W, height: H });
  const cl = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const camXY = (cx, cy, sc) => ({ x: cl(640 - cx * sc, W - W * sc, 0), y: cl(330 - cy * sc, H - H * sc, 0), scale: sc });
  const cm = (cx, cy, sc, r, d, ease = 'sine.inOut') => { const v = camXY(cx, cy, sc); tl.to(cam, { ...v, duration: d, ease }, a(r)); tl.to(mid, { x: v.x * 0.05, y: v.y * 0.05, duration: d, ease }, a(r)); };
  const c0 = camXY(700, 380, 1.05);
  tl.set(cam, c0, 0); tl.set(mid, { x: c0.x * 0.05, y: c0.y * 0.05 }, 0);
  const pool = (p, x, y, rx, ry, col, op, per) => { const e = box(p, { left: x - rx, top: y - ry, width: rx * 2, height: ry * 2, borderRadius: '50%', background: `radial-gradient(ellipse,${col} 0%,rgba(0,0,0,0) 70%)`, mixBlendMode: 'screen', opacity: op }); if (per) tl.to(e, { opacity: op * 0.7, duration: per, yoyo: true, repeat: Math.ceil(D / per), ease: 'sine.inOut' }, T); return e; };

  // ---------- BACK LAYER: wall, floor, window, door ----------
  box(back, { left: 0, top: 0, width: W, height: 600, background: 'repeating-linear-gradient(90deg,#43301f 0 58px,#1d140d 58px 61px)' });
  box(back, { left: 0, top: 0, width: W, height: 600, background: 'linear-gradient(rgba(8,10,22,.6),rgba(0,0,0,0) 48%,rgba(0,0,0,.18))' });
  for (let i = 0; i < 9; i++) box(back, { left: R() * W, top: 0, width: 18 + R() * 40, height: 150 + R() * 320, background: 'linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,0))' });
  box(back, { left: 0, top: 0, width: W, height: 38, background: '#1a110b' });
  box(back, { left: 0, top: 586, width: W, height: 140, background: 'repeating-linear-gradient(0deg,#3a2a1c 0 26px,#17100a 26px 29px)' });
  box(back, { left: 0, top: 584, width: W, height: 4, background: '#0d0805' });
  // window to the line (dusk blue, rails, red lamp)
  box(back, { left: 690, top: 100, width: 260, height: 250, background: '#241810' });
  const wn = box(back, { left: 710, top: 120, width: 220, height: 210, overflow: 'hidden', background: 'linear-gradient(#233560,#44578a 52%,#9a7468 100%)' });
  box(wn, { left: 0, top: 118, width: 220, height: 100, background: 'linear-gradient(#18202e,#0c1118)' });
  rails(wn, { vx: 110, vy: 122, x0: -40, x1: 260, y0: 230, T, D });
  box(wn, { left: 0, top: 100, width: 220, height: 40, background: 'linear-gradient(rgba(170,185,215,0),rgba(170,185,215,.34),rgba(170,185,215,0))', filter: 'blur(6px)' });
  redLamp(wn, { x: 168, y: 134, s: 0.6, T, D });
  rain(wn, { n: 34, op: 0.4, len: 22, T, D });
  box(wn, { left: 0, top: 0, width: 220, height: 210, background: 'linear-gradient(115deg,rgba(255,255,255,.1),rgba(255,255,255,0) 35%)' });
  box(back, { left: 806, top: 120, width: 7, height: 210, background: '#241810' }); box(back, { left: 710, top: 216, width: 220, height: 6, background: '#241810' }); box(back, { left: 684, top: 340, width: 272, height: 10, background: '#3a2818' });
  // cold fill from the window: a shaft and a pool on the floor
  lightCone(back, { x: 820, y: 330, len: 330, spread: 190, rot: 10, color: 'rgba(120,155,235,0.45)', op: 0.5, T, D });
  pool(back, 850, 600, 300, 60, 'rgba(110,140,220,.45)', 0.7, 6);
  // door to the dusk (left)
  box(back, { left: 18, top: 128, width: 176, height: 466, background: '#1a110b' });
  const dr = box(back, { left: 32, top: 142, width: 148, height: 452, overflow: 'hidden', background: 'linear-gradient(#2c3d68,#566794 45%,#a58578 100%)' });
  [[-20, 250, 200], [10, 330, 170], [-30, 390, 190]].forEach(([x, y, wd], i) => { const f = box(dr, { left: x, top: y, width: wd, height: 90, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(200,210,230,.55),rgba(0,0,0,0) 70%)', filter: 'blur(10px)' }); tl.to(f, { x: 40 - i * 30, duration: D, ease: 'none' }, T); });
  rain(dr, { n: 22, op: 0.35, len: 20, T, D, seed: 9 });
  box(back, { left: 30, top: 588, width: 220, height: 120, clipPath: 'polygon(0 0,100% 0,70% 100%,-30% 100%)', background: 'linear-gradient(rgba(130,155,215,.4),rgba(130,155,215,0))', mixBlendMode: 'screen' });
  pool(back, 110, 360, 150, 260, 'rgba(120,150,220,.28)', 0.8, 7);

  // ---------- MID LAYER: bell, telegraph, levers, stove, desk, lamp ----------
  box(mid, { left: 196, top: 296, width: 230, height: 296, background: 'rgba(14,10,7,.5)' });
  const lv = [];
  for (let i = 0; i < 6; i++) { const x = 216 + i * 34, l = box(mid, { left: x - 4, top: 330, width: 8, height: 234, transformOrigin: '50% 100%', background: 'linear-gradient(90deg,#5a5a64,#1a1a20)', transform: `rotate(${((R() - 0.5) * 3).toFixed(2)}deg)` }); box(l, { left: -8, top: -8, width: 24, height: 34, borderRadius: 5, background: [0, 1, 4].includes(i) ? 'linear-gradient(90deg,#c0303a,#6e1218)' : 'linear-gradient(90deg,#3a76d0,#16407a)' }); lv.push(l); }
  box(mid, { left: 196, top: 560, width: 230, height: 16, background: '#1c1612' });
  [[2, 3, -16, 12], [4, 3.6, 15, 12.5], [1, 100.5, -14, 104.5]].forEach(([i, r1, rot, r2]) => { tl.to(lv[i], { rotation: rot, duration: 1.8, ease: 'sine.inOut' }, a(r1)); tl.to(lv[i], { rotation: 0, duration: 2, ease: 'sine.inOut' }, a(r2)); });
  // bell on the wall (hangs, sways a hair) and telegraph
  box(mid, { left: 583, top: 40, width: 2, height: 160, background: '#120c08' });
  box(mid, { left: 530, top: 196, width: 110, height: 90, background: '#22180f', borderRadius: 6 });
  const bell = box(mid, { left: 562, top: 200, width: 46, height: 62, transformOrigin: '50% 0%' }, '<svg viewBox="0 0 50 62" width="100%" height="100%"><defs><linearGradient id="br"><stop offset="0" stop-color="#f0bd58"/><stop offset=".6" stop-color="#9a6c22"/><stop offset="1" stop-color="#3d280c"/></linearGradient></defs><path d="M25 4Q7 8 8 36L3 48H47L42 36Q43 8 25 4Z" fill="url(#br)"/><circle cx="25" cy="53" r="5" fill="#6e4a16"/></svg>');
  tl.fromTo(bell, { rotation: -1.1 }, { rotation: 1.1, duration: 3.2, yoyo: true, repeat: Math.ceil(D / 3.2), ease: 'sine.inOut', immediateRender: false }, T);
  box(mid, { left: 500, top: 428, width: 110, height: 30, borderRadius: 4, background: 'linear-gradient(#9a7430,#3a2610)' });
  box(mid, { left: 508, top: 450, width: 50, height: 6, background: '#dcb458', borderRadius: 3 });
  const dial = box(mid, { left: 530, top: 372, width: 60, height: 60 }, '<svg viewBox="0 0 60 60" width="100%" height="100%"><circle cx="30" cy="30" r="27" fill="#eadcae" stroke="#9a722a" stroke-width="4"/><path d="M12 22L8 18M48 22L52 18M30 6V0" stroke="#4a3010" stroke-width="2"/><line id="ndl" x1="30" y1="34" x2="30" y2="8" stroke="#111" stroke-width="2.4"/><circle cx="30" cy="34" r="3" fill="#111"/></svg>');
  const ndl = dial.querySelector('#ndl');
  const click = (r, n) => { for (let i = 0; i < n; i++) tl.to(ndl, { rotation: (i % 2 ? -20 : 20), svgOrigin: '30 34', duration: 0.07, ease: 'power1.out' }, a(r) + i * 0.26); };
  click(5.5, 3); click(17, 2); click(29.3, 3); click(31.6, 2); click(33.1, 4);
  for (let r = 40; r < D - 4; r += 6 + R() * 6) click(r, 2 + Math.floor(R() * 3));
  // stove, pipe, fire
  box(mid, { left: 1137, top: 0, width: 16, height: 440, background: 'linear-gradient(90deg,#4a413b,#17130f)' });
  [150, 290].forEach((y) => box(mid, { left: 1133, top: y, width: 24, height: 8, background: '#0c0907' }));
  box(mid, { left: 1078, top: 436, width: 136, height: 14, background: '#241c17' }); box(mid, { left: 1088, top: 448, width: 116, height: 144, background: 'linear-gradient(90deg,#4a3a30,#1c1612)' });
  box(mid, { left: 1110, top: 486, width: 72, height: 66, background: 'linear-gradient(#a8400e,#3a1206)', border: '3px solid #0c0605' });
  fire(mid, { x: 1146, y: 548, s: 1.2, T, D });
  steam(mid, { x: 1145, y: 290, n: 5, T, D, dx: -25, dy: -120, s: 0.8, color: 'rgba(170,170,185,0.24)' });
  steam(mid, { x: 1145, y: 150, n: 4, T, D, dx: 20, dy: -90, s: 0.8, color: 'rgba(170,170,185,0.2)' });
  // desk, ledger, lamp
  box(mid, { left: 490, top: 456, width: 414, height: 16, background: '#7a5632' }); box(mid, { left: 500, top: 472, width: 394, height: 28, background: '#2c1d12' }); box(mid, { left: 640, top: 478, width: 70, height: 16, border: '2px solid #4a3220', background: '#1a110a' });
  box(mid, { left: 505, top: 500, width: 14, height: 90, background: '#24170d' }); box(mid, { left: 874, top: 500, width: 14, height: 90, background: '#24170d' });
  box(mid, { left: 624, top: 440, width: 90, height: 17, transform: 'skewX(-18deg)', background: 'linear-gradient(90deg,#e0d0a8,#a39470)' }); box(mid, { left: 668, top: 438, width: 3, height: 19, background: '#3a2c1c' });
  lamp(mid, { x: 828, y: 418, s: 1.5, r: 340, T, D });
  glow(mid, { x: 828, y: 420, r: 230, op: 0.55, T, D });
  // light pools: lamp on wall and floor, fire on the right
  pool(back, 830, 400, 420, 300, 'rgba(255,165,80,.5)', 0.8, 4.3);
  pool(back, 830, 600, 360, 55, 'rgba(255,170,90,.5)', 0.8, 3.7);
  pool(back, 1110, 470, 330, 300, 'rgba(255,100,35,.5)', 0.8, 2.3);
  pool(back, 1060, 610, 260, 50, 'rgba(255,110,40,.55)', 0.8, 2.9);
  glow(mid, { x: 1060, y: 380, r: 200, color: 'rgba(255,110,40,0.55)', op: 0.5, T, D });

  // ---------- figures ----------
  let uid = 0;
  const NARR = { coat: '#2d3753', coat2: '#182036', hat: 'top', beard: false }, SIGN = { coat: '#3b3028', coat2: '#201813', hat: 'none', beard: true };
  function dress(p, o, flip) {
    const id = 'fc' + uid++, P = p.P;
    p.g.style.filter = `drop-shadow(${flip ? -2 : 2}px 0 0 rgba(255,172,92,.8)) drop-shadow(${flip ? 1.5 : -1.5}px 0 0 rgba(120,165,245,.55)) drop-shadow(0 0 6px rgba(0,0,0,.5))`;
    const f = document.createElementNS(NS, 'g');
    f.innerHTML = `<defs><linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="0.2"><stop offset="0" stop-color="#3a2416"/><stop offset=".5" stop-color="#a06a3c"/><stop offset="1" stop-color="#f4bd7c"/></linearGradient></defs><ellipse cx="62" cy="41" rx="9.5" ry="12.5" fill="url(#${id}s)"/><path d="M59 36.5 L71 34 L71.5 37 L60 39Z" fill="#0b0705"/><circle cx="67" cy="39.5" r="1.2" fill="#fff0cc"/><path d="M71 40 L76 47 L70.5 47Z" fill="#d89c60"/>${o.beard ? '<path d="M50 41 Q52 60 64 58 Q75 56 72 42 Q68 50 61 49 Q54 49 50 41Z" fill="#0b0705"/><path d="M62 47 Q68 45 73 47 Q68 50 62 47Z" fill="#0b0705"/>' : '<path d="M62 47.5 Q68 45.5 73 47.5 Q68 49.5 62 47.5Z" fill="#150d08"/>'}${o.hat === 'none' ? '<path d="M48 38 Q46 19 61 20 Q76 20 72 36 Q69 28 60 28 Q53 29 48 38Z" fill="#0a0705"/>' : ''}`;
    P.h.insertBefore(f, P.h.children[2] || null);
    const ov = document.createElementNS(NS, 'path');
    ov.setAttribute('d', 'M38 64 Q60 55 82 64 L90 160 Q60 170 30 160Z'); ov.setAttribute('fill', `url(#${id}w)`);
    const dd = document.createElementNS(NS, 'defs'); dd.innerHTML = `<linearGradient id="${id}w" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="rgba(255,170,90,0)"/><stop offset="1" stop-color="rgba(255,175,95,.42)"/></linearGradient>`;
    P.t.insertBefore(dd, P.tail); P.t.insertBefore(ov, P.tail);
    [P.abf, P.aff].forEach((e) => e.querySelector('circle').setAttribute('fill', '#a56c3c'));
  }
  function breathe2(p, T0, D0, amt = 1) {
    const rep = Math.max(1, Math.ceil(D0 / 1.7) - 1);
    tl.to(p.P.t, { scaleY: 1 + 0.016 * amt, duration: 1.7, yoyo: true, repeat: rep, ease: 'sine.inOut' }, T0);
    tl.to(p.P.h, { y: -1.4 * amt, duration: 1.7, yoyo: true, repeat: rep, ease: 'sine.inOut' }, T0 + 0.2);
    tl.to(p.P.tail, { rotation: 1.8, duration: 2.4, yoyo: true, repeat: Math.max(1, Math.ceil(D0 / 2.4) - 1), ease: 'sine.inOut' }, T0);
  }
  function walk2(p, T0, D0, x0, x1, per = 0.72, lean = 2) {
    const P = p.P, n = Math.max(1, Math.round(D0 / per)), rp = n - 1, dd = n * per, o = { immediateRender: false, yoyo: true, repeat: rp };
    tl.fromTo(P.lf, { rotation: 24 }, { rotation: -24, duration: per, ease: 'sine.inOut', ...o }, T0);
    tl.fromTo(P.lb, { rotation: -24 }, { rotation: 24, duration: per, ease: 'sine.inOut', ...o }, T0);
    tl.fromTo(P.lfs, { rotation: 4 }, { rotation: 32, duration: per, ease: 'sine.in', ...o }, T0);
    tl.fromTo(P.lbs, { rotation: 32 }, { rotation: 4, duration: per, ease: 'sine.out', ...o }, T0);
    tl.fromTo(P.af, { rotation: -12 }, { rotation: 12, duration: per, ease: 'sine.inOut', ...o }, T0);
    tl.fromTo(P.ab, { rotation: 12 }, { rotation: -12, duration: per, ease: 'sine.inOut', ...o }, T0);
    tl.fromTo(P.t, { rotation: -lean, y: 0 }, { rotation: lean, y: -2.6, duration: per / 2, ease: 'sine.inOut', immediateRender: false, yoyo: true, repeat: n * 2 - 1 }, T0);
    tl.fromTo(P.tail, { rotation: -5 }, { rotation: 7, duration: per, ease: 'sine.inOut', ...o }, T0);
    tl.fromTo(p.g, { x: x0 }, { x: x1, duration: dd, ease: 'none', immediateRender: false }, T0);
    tl.to([P.lf, P.lb, P.lfs, P.lbs, P.t, P.tail], { rotation: 0, y: 0, duration: 0.4, ease: 'sine.out' }, T0 + dd);
    tl.to(P.af, { rotation: -4, duration: 0.5 }, T0 + dd); tl.to(P.ab, { rotation: 4, duration: 0.5 }, T0 + dd);
  }
  const heads = (p, L) => L.forEach(([r, deg, d]) => p.head(deg, a(r), d ?? 2));
  const fade = (el, r0, r1, d = 1) => { if (r0 != null) tl.to(el, { opacity: 1, duration: d }, a(r0)); if (r1 != null) tl.to(el, { opacity: 0, duration: d }, a(r1)); };
  function standing(x, o, flip) {
    const p = puppet(mid, { x, y: 588, s: 1.8, hat: o.hat, coat: o.coat, coat2: o.coat2, flip, opacity: 0 });
    dress(p, o, flip); breathe2(p, T, D, 1); return p;
  }
  function seated(x, dir, o) {
    const grp = box(mid, { left: 0, top: 0, width: W, height: H, opacity: 0 }), k = dir, col = o.beard ? '#1d1814' : '#1c2234';
    const pt = (arr) => arr.map(([dx, y]) => `${x + dx * k},${y}`).join(' ');
    const legs = box(grp, { left: 0, top: 0, width: W, height: H, filter: `drop-shadow(${k > 0 ? 2 : -2}px 0 0 rgba(255,170,90,.55))` });
    legs.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><polygon points="${pt([[-8, 480], [74, 484], [74, 510], [-8, 508]])}" fill="${col}"/><polygon points="${pt([[60, 490], [82, 490], [80, 578], [62, 578]])}" fill="${col}"/><polygon points="${pt([[58, 572], [100, 576], [102, 588], [58, 588]])}" fill="#0a0806"/></svg>`;
    const p = puppet(grp, { x, y: 630, s: 1.8, hat: o.hat, coat: o.coat, coat2: o.coat2, flip: k < 0 });
    gsap.set([p.P.lb, p.P.lf], { opacity: 0 }); gsap.set(p.P.tail, { opacity: 0 });
    dress(p, o, k < 0);
    gsap.set(p.P.af, { rotation: -25 }); gsap.set(p.P.aff, { rotation: 8 });
    pool(grp, x + k * 8, 306, 100, 100, 'rgba(255,175,95,.5)', 0.55, 1.9);
    breathe2(p, T, D, 1.1); p.grp = grp; return p;
  }
  // furniture the men sit on
  const stoolX = 700, chairX = 960;
  box(mid, { left: stoolX - 40, top: 508, width: 80, height: 10, background: '#6a4a2c', borderRadius: 3 });
  [-32, 26].forEach((dx) => box(mid, { left: stoolX + dx, top: 518, width: 7, height: 68, background: '#2c1e12' })); box(mid, { left: stoolX - 30, top: 548, width: 60, height: 4, background: '#2c1e12' });
  box(mid, { left: chairX - 44, top: 508, width: 88, height: 10, background: '#6a4a2c', borderRadius: 3 });
  [-36, 30].forEach((dx) => box(mid, { left: chairX + dx, top: 518, width: 7, height: 68, background: '#2c1e12' }));
  box(mid, { left: chairX + 48, top: 360, width: 9, height: 160, background: '#4a321e' }); box(mid, { left: chairX + 42, top: 352, width: 22, height: 10, background: '#5a3c24', borderRadius: 3 });

  const NSt = standing(110, NARR, false), SGt = standing(1000, SIGN, true);   // narrator walks in from the door; signalman waits
  const NQ = seated(stoolX, 1, NARR), SQ = seated(chairX, -1, SIGN);
  const nx = (x) => x - 110, sx = (x) => x - 1000;
  // hand lamp for the signalman (hidden until he takes it up)
  const hx = 84, lg = document.createElementNS(NS, 'g');
  lg.innerHTML = `<defs><radialGradient id="hlg"><stop offset="0" stop-color="#fff3c4" stop-opacity=".95"/><stop offset=".3" stop-color="#ffbe5c" stop-opacity=".6"/><stop offset="1" stop-color="#ff9628" stop-opacity="0"/></radialGradient></defs><circle cx="${hx}" cy="146" r="44" fill="url(#hlg)"/><line x1="${hx}" y1="127" x2="${hx}" y2="137" stroke="#222" stroke-width="1.4"/><rect x="${hx - 5}" y="137" width="10" height="14" rx="2" fill="#2a1d0f" stroke="#e0b878" stroke-width="1"/><rect x="${hx - 3}" y="140" width="6" height="8" fill="#ffe6a0"/>`;
  SGt.P.aff.appendChild(lg); gsap.set(lg, { svgOrigin: `${hx} 127`, opacity: 0 });

  // ----- narrator standing: enters from the door, offers a hand that is not taken, looks over the room -----
  fade(NSt.g, 0.4, null, 1.6);
  walk2(NSt, a(1.8), 9.6, 0, nx(470), 0.76, 2);
  NSt.arm('f', -78, -12, a(13.6), 1.5); NSt.arm('f', -4, -4, a(18.2), 1.8);
  heads(NSt, [[0, 3, 0.1], [4, -3, 2.5], [11.5, -6, 2], [15, 0, 2.2], [19, 5, 2.4], [24, -8, 2.5], [29.5, -14, 2], [34.5, -18, 2], [38, -3, 1.5], [42, 5, 2], [46, -2, 1.5], [47.6, -9, 0.8], [50.5, 3, 1.4], [53, 6, 2.2], [57, 4, 2.2], [60, 0, 1]]);
  tl.to(NSt.P.t, { y: -3, duration: 0.16, yoyo: true, repeat: 11, ease: 'sine.inOut' }, a(46.7));                  // he laughs a little
  NSt.arm('f', -40, -50, a(43.5), 1.2); NSt.arm('f', -4, -4, a(45.2), 1.4);                                       // "Who?" with a small gesture
  walk2(NSt, a(37.3), 4.0, nx(470), nx(650), 0.8, 1.5);                                                          // steps closer to talk, out of the telegraph shots
  walk2(NSt, a(58.4), 3.0, nx(650), nx(700), 0.75, 1.5);                                                          // to his stool
  fade(NSt.g, null, 61, 0.7);

  // ----- signalman standing: waits, watches the window, answers, shakes his head -----
  tl.set(SGt.g, { opacity: 1 }, 0);
  heads(SGt, [[0, 0, 0.1], [3, -7, 2.5], [8, 0, 2], [12, 6, 2], [18, -3, 2.5], [22, 3, 2.5], [28, -2, 2], [34, -3, 2], [37.2, -6, 1.2], [43, 4, 2], [50, 7, 2.5], [54.2, 8, 0.5], [54.8, -8, 0.5], [55.4, 7, 0.5], [56.1, -2, 0.7], [58, 6, 2], [60, 0, 1]]);
  SGt.arm('f', -12, -22, a(4.5), 1.6); SGt.arm('f', -4, -4, a(9), 1.8); SGt.arm('f', -8, -30, a(22), 1.6); SGt.arm('f', -4, -4, a(27), 1.8);
  SGt.arm('f', -158, -18, a(38.2), 1.2); SGt.arm('f', -4, -4, a(41.6), 1.6);                                    // "You spoke from up there": a hand lifted toward the cutting
  SGt.arm('f', -170, -125, a(54.4), 1.0); SGt.arm('f', -4, -4, a(58.4), 1.6);                                   // "I don't know": hand to the brow
  walk2(SGt, a(33.8), 3.0, 0, sx(960), 0.9, 1.2);
  fade(SGt.g, null, 61, 0.7);

  // ----- seated talk 61-98: nods, hands, small turns of the head -----
  tl.to(NQ.grp, { opacity: 1, duration: 0.9 }, a(60.6)); tl.to(SQ.grp, { opacity: 1, duration: 0.9 }, a(60.8));
  tl.fromTo(NQ.g, { y: -8 }, { y: 0, duration: 0.8, ease: 'power2.out', immediateRender: false }, a(60.6)); tl.fromTo(SQ.g, { y: -8 }, { y: 0, duration: 0.8, ease: 'power2.out', immediateRender: false }, a(60.8));
  heads(NQ, [[60, 0, 0.1], [64, 5, 2], [68, -2, 2], [72, 6, 2.5], [77, -4, 2], [81, 3, 2], [86, 7, 2.5], [90, -4, 2], [94, 5, 2.5], [97, 0, 1]]);
  heads(SQ, [[60, -3, 0.1], [63.5, -7, 2], [67, 2, 2], [70.5, 9, 2.4], [75.5, 14, 2.6], [80, -3, 1.8], [84, 5, 2.2], [89, 1, 2.4], [93.5, -6, 2.4], [97, 2, 1.4]]);
  NQ.arm('f', -55, -40, a(65.5), 1.2); NQ.arm('f', -25, 8, a(68.5), 1.6); NQ.arm('f', -60, -70, a(75), 1.6); NQ.arm('f', -25, 8, a(79), 1.6); NQ.arm('f', -34, -4, a(88), 1.3); NQ.arm('f', -25, 8, a(91.5), 1.6);
  SQ.arm('f', -58, -42, a(63.8), 1.2); SQ.arm('f', -25, 8, a(66.5), 1.6); SQ.arm('f', -75, -75, a(70.5), 1.5); SQ.arm('f', -30, -25, a(74), 1.8); SQ.arm('f', -60, -20, a(78), 1.3); SQ.arm('f', -25, 8, a(81), 1.8);
  SQ.arm('f', -34, -60, a(84), 1.6); SQ.arm('f', -30, -30, a(88), 1.6); SQ.arm('f', -42, -8, a(91.5), 1.4); SQ.arm('f', -25, 8, a(95), 1.6);

  // ----- E: he rises, leaves for the door, turns back; the signalman takes his lamp and waves it -----
  tl.to(NQ.grp, { opacity: 0, duration: 0.6 }, a(97.8)); tl.to(SQ.grp, { opacity: 0, duration: 0.6 }, a(98.4));
  tl.set(NSt.g, { opacity: 0, x: nx(700), scaleX: -1 }, a(97.7)); tl.to(NSt.g, { opacity: 1, duration: 0.6 }, a(97.8));
  heads(NSt, [[98, -4, 1.4], [101, 0, 1.5], [106.2, -6, 1.2], [109.5, 5, 1.8], [113, -3, 2], [117, 4, 2]]);
  NSt.arm('f', -8, -70, a(98.4), 1.2); NSt.arm('f', -4, -4, a(99.9), 0.8);                           // hand to his hat: "I promised to come back"
  walk2(NSt, a(100.8), 5.8, nx(700), nx(150), 0.8, 2);
  tl.to(NSt.g, { scaleX: 1, duration: 0.7, ease: 'sine.inOut' }, a(107.2));                            // turns back at the door
  fade(NSt.g, null, 118.8, 1.1);
  tl.set(SGt.g, { opacity: 0, x: sx(960) }, a(98.3)); tl.to(SGt.g, { opacity: 1, duration: 0.6 }, a(98.4));
  heads(SGt, [[98.5, 2, 0.1], [103, -5, 2], [107.5, 4, 1.6], [110.5, -6, 1.6], [113.5, -10, 1.8], [117, -6, 2.2]]);
  walk2(SGt, a(101.6), 1.6, sx(960), sx(948), 0.8, 1);
  tl.to(lg, { opacity: 1, duration: 1.0 }, a(102.4));
  SGt.arm('f', -30, -40, a(104.2), 1.6); SGt.arm('f', -12, -20, a(108), 1.6);
  SGt.arm('f', -160, -22, a(113.4), 1.6);                                                              // "I will wave my lamp"
  for (let i = 0; i < 2; i++) { SGt.arm('f', -140, -22, a(115.2 + i * 1.2), 0.55); SGt.arm('f', -166, -22, a(115.75 + i * 1.2), 0.55); }
  tl.to(lg, { rotation: 12, duration: 0.8, yoyo: true, repeat: 24, ease: 'sine.inOut' }, a(103));
  const lampGlow = glow(mid, { x: 850, y: 232, r: 260, color: 'rgba(255,190,100,0.6)', op: 0, T, D: 0.1, flicker: false });
  tl.to(lampGlow, { opacity: 0.85, duration: 2 }, a(113.6));
  // red light of the window grows into the room as he signals
  const red = box(mid, { left: 520, top: 20, width: 620, height: 540, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(255,50,35,.6),rgba(0,0,0,0) 68%)', mixBlendMode: 'screen', opacity: 0.06 });
  tl.to(red, { opacity: 0.2, duration: 1.4, yoyo: true, repeat: Math.floor(60 / 1.4), ease: 'sine.inOut' }, a(30));
  tl.to(red, { opacity: 0.42, duration: 1.2, yoyo: true, repeat: Math.floor(16 / 1.2), ease: 'sine.inOut' }, a(104));

  // ---------- life: dust in the lamp and fire light, cold motes at the window, a foreground blur ----------
  motes(mid, { x0: 600, x1: 1120, y0: 200, y1: 570, n: 38, color: 'rgba(255,225,170,0.9)', T, D, size: 2.8, rise: -40, seed: 31 });
  motes(mid, { x0: 690, x1: 960, y0: 120, y1: 420, n: 16, color: 'rgba(190,210,255,0.9)', T, D, size: 2.2, rise: -26, seed: 44 });
  motes(mid, { x0: 1040, x1: 1210, y0: 300, y1: 540, n: 12, color: 'rgba(255,150,60,0.95)', T, D, size: 2.4, rise: -90, seed: 52 });
  const fg = box(c, { left: 0, top: 0, width: W, height: H, pointerEvents: 'none' });
  const fb = box(fg, { left: -120, top: 600, width: 360, height: 160, background: 'radial-gradient(ellipse,rgba(10,6,4,.8),rgba(0,0,0,0) 70%)', filter: 'blur(14px)' });
  tl.to(fb, { x: 90, duration: D, ease: 'none' }, T);
  box(c, { left: 0, top: 0, width: W, height: H, background: 'radial-gradient(ellipse at 52% 50%,rgba(0,0,0,0) 45%,rgba(0,0,0,.32) 100%)', zIndex: 5 });

  // ---------- camera ----------
  cm(560, 390, 1.22, 0, 11);
  cm(720, 385, 1.1, 11, 9.5);
  cm(900, 410, 1.12, 20.5, 3.5);
  cm(1120, 460, 2.0, 24, 1.6, 'power2.inOut');          // a fire
  cm(790, 410, 1.9, 25.8, 1.2, 'power2.inOut');          // a desk, the lamp
  cm(670, 420, 2.3, 27.2, 1.4, 'power2.inOut');          // a book to write in
  cm(560, 395, 2.0, 28.8, 1.5, 'power2.inOut');          // the telegraph
  cm(555, 385, 2.1, 30.3, 3.4, 'none');
  cm(590, 235, 2.0, 33.8, 2.0, 'power2.inOut');          // the bell
  cm(810, 380, 1.38, 37, 3.2);
  cm(830, 375, 1.5, 40.2, 11.8, 'none');
  cm(960, 325, 1.95, 52, 3.5);                           // he did not laugh
  cm(955, 318, 2.05, 55.5, 3.5, 'none');
  cm(830, 390, 1.3, 59, 4);
  cm(880, 360, 1.6, 63, 19, 'none');
  cm(950, 312, 2.15, 82, 7);                             // close-up on the signalman as he confesses
  cm(952, 306, 2.3, 89, 8.5, 'none');
  cm(800, 390, 1.25, 97.5, 3.5);
  cm(430, 400, 1.2, 101, 5.5);
  cm(250, 380, 1.7, 106.5, 2.5);
  cm(870, 330, 1.45, 109.2, 3.8);
  cm(900, 285, 1.75, 113, 7);                            // the lamp is waved
})();
