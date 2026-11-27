// ===== BOX: the signal box interior. Narrator arrives, talks with the signalman, leaves at dusk; red lamp pulses in the window =====
(function () {
  const c = S('box'), w = win('box'), T = w.T, D = w.D, K = D / 98, A = (s) => T + s * K;
  const cam = box(c, { left: 0, top: 0, width: W, height: H, transformOrigin: '0 0' });
  const R = rr(77);
  // ---- back wall: rain-darkened planks, beams, wet stains
  box(cam, { left: 0, top: 0, width: W, height: 600, background: 'repeating-linear-gradient(90deg,#1c150f 0 58px,#0a0705 58px 61px)' });
  box(cam, { left: 0, top: 0, width: W, height: 600, background: 'linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,0) 45%,rgba(0,0,0,.35))' });
  for (let i = 0; i < 9; i++) box(cam, { left: R() * W, top: 0, width: 18 + R() * 40, height: 150 + R() * 320, background: 'linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,0))' });
  box(cam, { left: 0, top: 0, width: W, height: 38, background: '#0a0705' });
  box(cam, { left: 0, top: 592, width: W, height: 130, background: 'repeating-linear-gradient(0deg,#0d0906 0 26px,#050302 26px 29px)' });
  // ---- window to the line: dusk, rails, red lamp
  box(cam, { left: 690, top: 100, width: 260, height: 250, background: '#0b0806' });
  const wn = box(cam, { left: 710, top: 120, width: 220, height: 210, overflow: 'hidden', background: 'linear-gradient(#10182e,#2a3350 52%,#6d5048 100%)' });
  box(wn, { left: 0, top: 118, width: 220, height: 100, background: 'linear-gradient(#0c1018,#05070c)' });
  rails(wn, { vx: 110, vy: 122, x0: -40, x1: 260, y0: 230, T, D });
  box(wn, { left: 0, top: 100, width: 220, height: 40, background: 'linear-gradient(rgba(150,165,190,0),rgba(150,165,190,.28),rgba(150,165,190,0))', filter: 'blur(6px)' });
  redLamp(wn, { x: 168, y: 134, s: 0.6, T, D });
  rain(wn, { n: 34, op: 0.35, len: 22, T, D });
  box(wn, { left: 0, top: 0, width: 220, height: 210, background: 'linear-gradient(115deg,rgba(255,255,255,.07),rgba(255,255,255,0) 35%)' });
  box(cam, { left: 806, top: 120, width: 7, height: 210, background: '#0b0806' }); box(cam, { left: 710, top: 216, width: 220, height: 6, background: '#0b0806' }); box(cam, { left: 684, top: 340, width: 272, height: 10, background: '#18100a' });
  const shaft = box(cam, { left: 640, top: 130, width: 340, height: 470, clipPath: 'polygon(25% 0,75% 0,100% 100%,-10% 100%)', background: 'linear-gradient(rgba(120,150,215,.14),rgba(120,150,215,0))', mixBlendMode: 'screen', filter: 'blur(5px)' });
  tl.to(shaft, { opacity: 0.55, duration: 5, yoyo: true, repeat: Math.floor(D / 5), ease: 'sine.inOut' }, T);
  // ---- door to the dusk (left)
  box(cam, { left: 18, top: 128, width: 176, height: 466, background: '#0a0705' });
  const dr = box(cam, { left: 32, top: 142, width: 148, height: 452, overflow: 'hidden', background: 'linear-gradient(#1b2644,#3b4562 45%,#7a5f58 100%)' });
  [[-20, 250, 200], [10, 330, 170], [-30, 390, 190]].forEach(([x, y, wd], i) => { const f = box(dr, { left: x, top: y, width: wd, height: 90, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(190,200,220,.5),rgba(0,0,0,0) 70%)', filter: 'blur(10px)' }); tl.to(f, { x: 40 - i * 30, duration: D, ease: 'none' }, T); });
  rain(dr, { n: 22, op: 0.3, len: 20, T, D, seed: 9 });
  box(cam, { left: 30, top: 592, width: 190, height: 110, clipPath: 'polygon(0 0,100% 0,70% 100%,-30% 100%)', background: 'linear-gradient(rgba(120,140,190,.28),rgba(120,140,190,0))', mixBlendMode: 'screen' });
  // ---- bell (silent) and telegraph
  box(cam, { left: 583, top: 40, width: 2, height: 160, background: '#050403' });
  box(cam, { left: 530, top: 196, width: 110, height: 90, background: '#100b07', borderRadius: 6 });
  box(cam, { left: 562, top: 200, width: 46, height: 62 }, '<svg viewBox="0 0 50 62" width="100%" height="100%"><defs><linearGradient id="br"><stop offset="0" stop-color="#d9a441"/><stop offset=".6" stop-color="#7a5418"/><stop offset="1" stop-color="#2d1d08"/></linearGradient></defs><path d="M25 4Q7 8 8 36L3 48H47L42 36Q43 8 25 4Z" fill="url(#br)"/><circle cx="25" cy="53" r="5" fill="#5a3d12"/></svg>');
  box(cam, { left: 500, top: 428, width: 110, height: 30, borderRadius: 4, background: 'linear-gradient(#7a5a22,#2a1a08)' });
  box(cam, { left: 508, top: 450, width: 50, height: 6, background: '#c9a24a', borderRadius: 3 });
  const dial = box(cam, { left: 530, top: 372, width: 60, height: 60 }, '<svg viewBox="0 0 60 60" width="100%" height="100%"><circle cx="30" cy="30" r="27" fill="#e0cfa0" stroke="#8a6322" stroke-width="4"/><path d="M12 22L8 18M48 22L52 18M30 6V0" stroke="#4a3010" stroke-width="2"/><line id="ndl" x1="30" y1="34" x2="30" y2="8" stroke="#111" stroke-width="2.4"/><circle cx="30" cy="34" r="3" fill="#111"/></svg>');
  const ndl = dial.querySelector('#ndl');
  for (let t = 2; t < D - 3;) { const burst = 2 + Math.floor(R() * 4); for (let i = 0; i < burst; i++) { tl.to(ndl, { rotation: (i % 2 ? -20 : 20), svgOrigin: '30 34', duration: 0.07, ease: 'power1.out' }, T + t + i * 0.26); } t += burst * 0.26 + 3 + R() * 5; }
  // ---- levers (red / blue tops)
  box(cam, { left: 196, top: 296, width: 230, height: 296, background: 'rgba(8,6,4,.55)' });
  const lv = [];
  for (let i = 0; i < 6; i++) { const x = 216 + i * 34, l = box(cam, { left: x - 4, top: 330, width: 8, height: 234, transformOrigin: '50% 100%', background: 'linear-gradient(90deg,#34343a,#0b0b0e)', rotation: (R() - 0.5) * 3 }); box(l, { left: -8, top: -8, width: 24, height: 34, borderRadius: 5, background: [0, 1, 4].includes(i) ? 'linear-gradient(90deg,#b0242a,#5e0e12)' : 'linear-gradient(90deg,#2a62b8,#10305e)' }); lv.push(l); }
  box(cam, { left: 196, top: 560, width: 230, height: 16, background: '#0d0b0a' });
  [[3, 54, 64, -17], [1, 58, 68, -15], [4, 76, 90, 16]].forEach(([i, a, b, r]) => { tl.to(lv[i], { rotation: r, duration: 1.8, ease: 'sine.inOut' }, A(a)); tl.to(lv[i], { rotation: 0, duration: 2, ease: 'sine.inOut' }, A(b)); });
  // ---- stove and pipe with leaking smoke
  box(cam, { left: 1137, top: 0, width: 16, height: 440, background: 'linear-gradient(90deg,#26221f,#0a0908)' });
  [150, 290].forEach((y) => box(cam, { left: 1133, top: y, width: 24, height: 8, background: '#050403' }));
  box(cam, { left: 1078, top: 436, width: 136, height: 14, background: '#0c0a09' }); box(cam, { left: 1088, top: 448, width: 116, height: 144, background: 'linear-gradient(90deg,#241d18,#0f0c0a)' });
  box(cam, { left: 1110, top: 490, width: 72, height: 62, background: '#080403', border: '3px solid #050302' });
  fire(cam, { x: 1146, y: 546, s: 1, T, D });
  steam(cam, { x: 1145, y: 290, n: 5, T, D, dx: -25, dy: -120, s: 0.8, color: 'rgba(150,150,165,0.2)' });
  steam(cam, { x: 1145, y: 150, n: 4, T, D, dx: 20, dy: -90, s: 0.8, color: 'rgba(150,150,165,0.16)' });
  // ---- desk, ledger, lamp
  box(cam, { left: 490, top: 456, width: 414, height: 16, background: '#3a2616' }); box(cam, { left: 500, top: 472, width: 394, height: 28, background: '#150e09' }); box(cam, { left: 640, top: 478, width: 70, height: 16, border: '2px solid #2a1b10', background: '#0b0705' });
  box(cam, { left: 505, top: 500, width: 14, height: 92, background: '#0d0805' }); box(cam, { left: 874, top: 500, width: 14, height: 92, background: '#0d0805' });
  box(cam, { left: 624, top: 440, width: 90, height: 17, transform: 'skewX(-18deg)', background: 'linear-gradient(90deg,#cdbd96,#8d7e5c)' }); box(cam, { left: 668, top: 438, width: 3, height: 19, background: '#2a2014' });
  lamp(cam, { x: 828, y: 420, s: 1.4, r: 330, T, D });
  glow(cam, { x: 828, y: 440, r: 190, op: 0.5, T, D });
  // ---- figures
  let uid = 0;
  function stander(o) {
    const s = 1.8, id = 'lg' + uid++, g = box(cam, { left: o.x - 50 * s, top: 590 - 200 * s, width: 100 * s, height: 200 * s, transformOrigin: '50% 100%', filter: 'drop-shadow(4px 0 5px rgba(255,170,70,.45))' });
    g.innerHTML = `<svg viewBox="0 0 100 200" width="100%" height="100%" style="overflow:visible"><defs><radialGradient id="${id}"><stop offset="0" stop-color="#fff6c8"/><stop offset=".25" stop-color="rgba(255,190,90,.7)"/><stop offset="1" stop-color="rgba(255,150,40,0)"/></radialGradient></defs><g class="la"><rect x="38" y="112" width="11" height="84" rx="4" fill="#06070a"/></g><g class="lb"><rect x="51" y="112" width="11" height="84" rx="4" fill="#0a0b0f"/></g><path d="M27 54Q27 40 50 40Q73 40 73 54L77 128H23Z" fill="#07090e"/><rect x="24" y="48" width="9" height="66" rx="4" fill="#07090e"/><circle cx="50" cy="27" r="11" fill="#0a0b10"/>${o.hat ? '<rect x="39" y="3" width="22" height="14" fill="#05060a"/><rect x="33" y="15" width="34" height="3" fill="#05060a"/>' : '<path d="M39 24Q40 14 51 15Q61 16 61 25Q50 19 39 24Z" fill="#030304"/>'}${o.beard ? '<path d="M40 28Q50 54 60 28Q50 37 40 28Z" fill="#030304"/>' : ''}<g class="arm"><rect x="66" y="48" width="9" height="66" rx="4" fill="#07090e"/>${o.lamp ? `<circle cx="70" cy="118" r="52" fill="url(#${id})"/><rect x="65" y="110" width="10" height="14" fill="#2b2012"/><rect x="67" y="113" width="6" height="8" fill="#fff2b0"/>` : ''}</g></svg>`;
    if (o.flip) tl.set(g, { scaleX: -1 }, 0);
    tl.to(g, { scaleY: 1.01, duration: 2.6, yoyo: true, repeat: Math.floor(D / 2.6), ease: 'sine.inOut' }, T);
    return { g, x: o.x, la: g.querySelector('.la'), lb: g.querySelector('.lb'), arm: g.querySelector('.arm') };
  }
  function sitter(o) {
    const s = 1.8, g = box(cam, { left: o.x - 70 * s, top: 590 - 170 * s, width: 140 * s, height: 170 * s, filter: 'drop-shadow(-4px 0 5px rgba(255,170,70,.5)) drop-shadow(3px 0 6px rgba(255,120,40,.3))' });
    const face = o.face ? '<defs><linearGradient id="sk"><stop offset="0" stop-color="#d89a58"/><stop offset=".45" stop-color="#6a4326"/><stop offset="1" stop-color="#0e0907"/></linearGradient></defs><rect x="76" y="46" width="12" height="14" fill="#0e0907"/><ellipse cx="82" cy="36" rx="13" ry="15" fill="url(#sk)"/><path d="M68 34Q67 17 84 18Q99 20 97 40L92 30Q81 23 70 35Z" fill="#050403"/><path d="M68 30L82 28L81 34L69 35Z" fill="#050403"/><circle cx="74" cy="37" r="1.5" fill="#ffd9a0"/><path d="M68 38L63 45L69 46Z" fill="#c68a4c"/><path d="M69 43Q70 64 84 62Q97 58 96 41Q90 52 82 50Q74 48 69 43Z" fill="#040303"/>' : '<circle cx="82" cy="36" r="12" fill="#0a0b10"/><rect x="71" y="14" width="22" height="14" fill="#05060a"/><rect x="65" y="26" width="34" height="3" fill="#05060a"/>';
    g.innerHTML = `<svg viewBox="0 0 140 170" width="100%" height="100%" style="overflow:visible"><rect x="96" y="60" width="9" height="108" fill="#0a0806"/><rect x="58" y="120" width="48" height="7" fill="#0a0806"/><rect x="62" y="127" width="5" height="41" fill="#0a0806"/><rect x="98" y="127" width="5" height="41" fill="#0a0806"/><path d="M74 122L76 58Q86 46 100 56L102 122Z" fill="#07090e"/><rect x="30" y="112" width="52" height="14" rx="6" fill="#06070a"/><rect x="26" y="116" width="13" height="52" rx="5" fill="#06070a"/>${face}<path d="M84 62L70 100L48 112" stroke="#07090e" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="46" cy="112" r="6.5" fill="${o.face ? '#7a4d2a' : '#0a0b10'}"/></svg>`;
    if (o.flip) tl.set(g, { scaleX: -1 }, 0);
    tl.to(g, { scaleY: 1.012, duration: 3, yoyo: true, repeat: Math.floor(D / 3), ease: 'sine.inOut', transformOrigin: '50% 100%' }, T);
    return g;
  }
  const vis = (el, a, b) => { tl.set(el, { opacity: a ? 0 : 1 }, 0); if (a) tl.to(el, { opacity: 1, duration: 1 }, A(a - 0.5)); if (b) tl.to(el, { opacity: 0, duration: 1 }, A(b - 0.5)); };
  const walk = (f, x0, x1, a, b) => { const n = Math.max(1, Math.round((b - a) * K / 0.8)), d = (b - a) * K / (n + 1); tl.fromTo(f.g, { x: x0 - f.x }, { x: x1 - f.x, duration: (b - a) * K, ease: 'sine.inOut' }, A(a)); tl.fromTo(f.la, { rotation: 16, svgOrigin: '44 114' }, { rotation: -16, svgOrigin: '44 114', duration: d, repeat: n, yoyo: true, ease: 'sine.inOut' }, A(a)); tl.fromTo(f.lb, { rotation: -16, svgOrigin: '56 114' }, { rotation: 16, svgOrigin: '56 114', duration: d, repeat: n, yoyo: true, ease: 'sine.inOut' }, A(a)); tl.set([f.la, f.lb], { rotation: 0, svgOrigin: '50 114' }, A(b) + 0.02); };
  // narrator: walks in from the door, offers a hand, walks to his stool, sits; later rises and leaves
  const NA = stander({ x: 740, hat: 1 }); vis(NA.g, 0, 31.5);
  tl.set(NA.g, { x: 130 - 740 }, 0); walk(NA, 130, 740, 0.5, 9);
  tl.to(NA.arm, { rotation: -88, svgOrigin: '70 52', duration: 1.6, ease: 'sine.inOut' }, A(12)); tl.to(NA.arm, { rotation: 0, svgOrigin: '70 52', duration: 1.8, ease: 'sine.inOut' }, A(19.5));
  tl.to(NA.g, { scaleX: -1, duration: 0.6 }, A(25.2)); walk(NA, 740, 430, 26, 31.5);
  const NS = sitter({ x: 440, flip: 1 }); vis(NS, 31, 70);
  const NB = stander({ x: 430, hat: 1 }); vis(NB.g, 70, 0); tl.to(NB.g, { scaleX: -1, duration: 0.6 }, A(73));
  walk(NB, 430, 130, 74, 85); tl.to(NB.g, { scaleX: 1, duration: 0.8 }, A(86));
  // signalman: stands unmoving, sits for the talk (the push-in), then stands with the hand-lamp
  const SA = stander({ x: 890, beard: 1, flip: 1 }); vis(SA.g, 0, 30); tl.to(SA.g, { x: 60, duration: 2.5, ease: 'sine.inOut' }, A(27));
  const SS = sitter({ x: 955, face: 1 }); vis(SS, 29.5, 84);
  const SL = stander({ x: 950, beard: 1, flip: 1, lamp: 1 }); vis(SL.g, 83.5, 0);
  tl.to(SL.arm, { rotation: -148, svgOrigin: '70 52', duration: 3, ease: 'sine.inOut' }, A(88)); tl.to(SL.arm, { rotation: -128, svgOrigin: '70 52', duration: 1.4, yoyo: true, repeat: 5, ease: 'sine.inOut' }, A(91.5));
  glow(cam, { x: 930, y: 345, r: 130, color: 'rgba(255,165,70,0.55)', op: 0.4, T, D });
  // red light spilling into the room as he signals
  const red = box(cam, { left: 560, top: 40, width: 520, height: 460, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(255,40,30,.55),rgba(0,0,0,0) 68%)', mixBlendMode: 'screen', opacity: 0 });
  tl.to(red, { opacity: 0.38, duration: 1.2, yoyo: true, repeat: Math.floor((98 - 84) / 1.2), ease: 'sine.inOut' }, A(84));
  // dust motes in the lamp light
  for (let i = 0; i < 28; i++) { const m = box(cam, { left: 430 + R() * 640, top: 150 + R() * 400, width: 2 + R() * 2, height: 2 + R() * 2, borderRadius: '50%', background: '#ffe2b0', opacity: 0.15 + R() * 0.4 }), dur = 5 + R() * 5; tl.to(m, { x: (R() - 0.5) * 70, y: -30 - R() * 50, opacity: 0.05, duration: dur, yoyo: true, repeat: Math.floor(D / dur) + 1, ease: 'sine.inOut' }, T); }
  // ---- slow camera: tiny drift, long push-in on the signalman, pull back to the door
  tl.fromTo(cam, { scale: 1, x: 0, y: 0 }, { scale: 1.05, x: -32, y: -18, duration: 29 * K, ease: 'none' }, T);
  tl.to(cam, { scale: 1.8, x: -980, y: -300, duration: 40.5 * K, ease: 'sine.inOut' }, A(29));
  tl.to(cam, { scale: 1, x: 0, y: 0, duration: 15 * K, ease: 'sine.inOut' }, A(70));
  tl.to(cam, { scale: 1.04, x: -26, y: -14, duration: 13 * K, ease: 'none' }, A(85));
  box(c, { left: 0, top: 0, width: W, height: H, background: 'radial-gradient(ellipse at 55% 50%,rgba(0,0,0,0) 35%,rgba(0,0,0,.5) 100%)', zIndex: 5 });
})();
