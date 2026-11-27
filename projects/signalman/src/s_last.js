// ===== SCENE 'last': the long day, the last evening, the ghost at the tunnel, the run down, the men with lamps =====
(function () {
  const c = S('last'), w = win('last'), T = w.T, D = w.D;
  const t = (s) => T + Math.min(s, D - 0.4);
  const L = box(c, { left: 0, top: 0, width: W, height: H, overflow: 'hidden', background: '#05070b' });
  const fadeIO = (el, a, b, c2, d) => { tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: b - a, ease: 'sine.inOut' }, t(a)); if (c2 !== undefined) tl.to(el, { opacity: 0, duration: d - c2, ease: 'sine.inOut' }, t(c2)); };
  const slab = (css) => Object.assign({ left: 0, top: 0, width: W, height: H }, css || {});
  // ---------- sky cycle: dawn -> noon -> dusk (cross-fades), shared by the whole scene
  const sk = (g, z) => box(L, slab({ background: g, zIndex: z }));
  sk('linear-gradient(#6d7479 0%, #9aa0a2 55%, #c8c4b8 100%)', 1);
  const noon = sk('linear-gradient(#aebcc6 0%, #cdd6da 60%, #e4e4dc 100%)', 1); noon.style.opacity = 0;
  const dusk = sk('linear-gradient(#10101f 0%, #2c1d36 45%, #6a3846 80%, #8a5a50 100%)', 1); dusk.style.opacity = 0;
  fadeIO(noon, 5, 10, 14, 20); tl.fromTo(dusk, { opacity: 0 }, { opacity: 1, duration: 8, ease: 'sine.inOut' }, t(15));
  // ---------- PART A: open country time-lapse
  const A = box(L, slab({ zIndex: 2 }));
  const RC = rr(8);
  for (let i = 0; i < 9; i++) { const cl = box(A, { left: RC() * W, top: 30 + RC() * 220, width: 320 + RC() * 360, height: 70 + RC() * 70, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(225,230,236,0.6), rgba(0,0,0,0) 70%)', filter: 'blur(12px)', opacity: 0.35 + RC() * 0.3 }); tl.fromTo(cl, { x: 500 }, { x: -1700, duration: 36 + RC() * 20, ease: 'none' }, T - 8 + RC() * 6); }
  ridge(A, { y: 300, h: 190, color: '#59616b', seed: 3, amp: 40, drift: -260, T: T, D: 25 });
  ridge(A, { y: 360, h: 150, color: '#394048', seed: 4, amp: 28, trees: 8, treeH: 50, drift: -420, T: T, D: 25 });
  box(A, slab({ top: 400, height: 320, background: 'linear-gradient(#566052, #2a3028 40%, #12150f)' }));
  ridge(A, { y: 380, h: 90, color: '#1d241b', seed: 9, amp: 10, jag: 14, trees: 10, treeH: 40, drift: -560, T: T, D: 25 });
  ridge(A, { y: 440, h: 110, color: '#12170f', seed: 5, amp: 14, jag: 18, trees: 0, drift: -700, T: T, D: 25 });
  box(A, { left: -50, top: 548, width: W + 100, height: 40, background: 'linear-gradient(#6a6a64, #3a3a36)', opacity: 0.8 });
  ridge(A, { y: 560, h: 150, color: '#07090a', seed: 6, amp: 18, jag: 24, trees: 0, drift: -1100, T: T, D: 25 });
const wk = box(A, { left: 350, top: 436, width: 60, height: 124 }, `<svg viewBox="0 0 60 124" width="100%" height="100%" style="overflow:visible"><g class="lg1" style="transform-origin:30px 70px"><path d="M30 70 L30 120" stroke="#050607" stroke-width="9" stroke-linecap="round"/></g><g class="lg2" style="transform-origin:30px 70px"><path d="M30 70 L30 120" stroke="#0a0c10" stroke-width="9" stroke-linecap="round"/></g><path d="M16 32 Q16 20 30 20 Q44 20 44 32 L46 76 L14 76Z" fill="#07090d"/><path d="M44 32 L52 62" stroke="#07090d" stroke-width="7" stroke-linecap="round"/><circle cx="30" cy="11" r="8.5" fill="#07090d"/><path d="M19 9 H41 M23 9 Q30 -4 37 9Z" stroke="#050608" stroke-width="3" fill="#050608"/></svg>`);
  tl.fromTo(wk.querySelector('.lg1'), { rotation: 24 }, { rotation: -24, duration: 0.5, yoyo: true, repeat: 50, ease: 'sine.inOut' }, T);
  tl.fromTo(wk.querySelector('.lg2'), { rotation: -24 }, { rotation: 24, duration: 0.5, yoyo: true, repeat: 50, ease: 'sine.inOut' }, T);
  tl.fromTo(wk, { y: 0 }, { y: -3, duration: 0.25, yoyo: true, repeat: 100, ease: 'sine.inOut' }, T);
  const tint = box(A, slab({ background: 'rgba(40,20,55,0.7)', opacity: 0, mixBlendMode: 'multiply' }));
  tl.to(tint, { opacity: 0.85, duration: 9, ease: 'sine.in' }, t(15));
  mist(A, { y: 420, h: 140, op: 0.3, n: 3, T: T, D: 26, seed: 15 });
  tl.to(A, { opacity: 0, duration: 2.5, ease: 'sine.inOut' }, t(24));
  // ---------- PART B and C: top edge of the cutting at dusk; ghost at the tunnel mouth
  const O = '700px 380px', grp = (z) => box(L, slab({ transformOrigin: O, zIndex: z, opacity: 0 }));
  const far = grp(3), near = grp(4), mid = grp(5);
  const cam = (els, ks, ys) => ks.forEach((k, i) => { if (i) tl.fromTo(els, { scale: ks[i - 1][1], y: ys[i - 1] }, { scale: k[1], y: ys[i], duration: k[0] - ks[i - 1][0], ease: 'sine.inOut' }, t(ks[i - 1][0])); });
  ridge(far, { y: 130, h: 210, color: '#150f1c', seed: 7, amp: 34, trees: 16, treeH: 70, drift: -30, T: t(24), D: 30 });
  box(near, slab({ top: 0 }), `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><polygon points="170,450 330,320 520,225 650,190 780,225 950,320 1110,450" fill="#0a0a10"/></svg>`);
  box(near, { left: -300, top: 340, width: W + 600, height: 800, background: 'linear-gradient(#232234 0%, #0d0d14 35%, #05060a 100%)' });
  tunnel(near, { x: 640, y: 332, w: 260, h: 170, T: t(24), D: 50 });
  rails(near, { vx: 640, vy: 328, x0: 400, x1: 880, y0: H + 120, T: t(24), D: 50 });
  redLamp(near, { x: 800, y: 438, s: 0.5, T: t(24), D: 50 });
  box(near, { left: 640, top: 400, width: 300, height: 120, background: 'radial-gradient(ellipse, rgba(255,50,30,0.32), rgba(0,0,0,0) 70%)', mixBlendMode: 'screen' });
  // the ghost: pale translucent man, left arm across the face, right arm waving
  const gh = box(near, { left: 656, top: 290, width: 104, height: 169, opacity: 0, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 80 130" width="104" height="169" style="overflow:visible"><defs><linearGradient id="gg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8f2ff" stop-opacity="0.8"/><stop offset="1" stop-color="#9ec0ff" stop-opacity="0.1"/></linearGradient></defs><g fill="url(#gg)" stroke="#dcecff" stroke-opacity="0.7" stroke-width="1.4"><path d="M24 30 Q24 22 40 22 Q56 22 56 32 L58 100 L52 128 L42 128 L40 104 L38 128 L28 128 L22 100Z"/><circle cx="40" cy="14" r="10"/><path id="la" d="M30 36 Q18 46 40 18" fill="none" stroke-width="7" stroke-linecap="round" stroke-opacity="0.8"/><g id="ra" style="transform-origin:54px 34px"><path d="M54 34 L74 4" fill="none" stroke-width="7" stroke-linecap="round" stroke-opacity="0.8"/></g></g></svg>`);
  const ghG = glow(near, { x: 704, y: 390, r: 90, color: 'rgba(170,205,255,0.55)', op: 0, T: t(46), D: 25, flicker: false });
  tl.fromTo(gh, { opacity: 0 }, { opacity: 0.8, duration: 4, ease: 'sine.in' }, t(46)); tl.to(ghG, { opacity: 0.8, duration: 4 }, t(46));
  tl.fromTo(gh, { y: 0 }, { y: -4, duration: 2.6, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t(46));
  tl.fromTo(gh.querySelector('#ra'), { rotation: -18 }, { rotation: 22, duration: 0.9, yoyo: true, repeat: 15, ease: 'sine.inOut' }, t(48));
  tl.to([gh, ghG], { opacity: 0, duration: 2.5 }, t(55.5));
  cuttingWalls(mid, { innerL: 380, innerR: 900, colorL: '#100c0f', colorR: '#0b090c', seed: 23 });
  box(mid, slab({ background: 'linear-gradient(100deg, rgba(20,16,14,0) 35%, rgba(60,70,110,0.28) 100%)', clipPath: 'polygon(0px 0px,380px 374px,340px 720px,0px 720px)' }));
  box(mid, slab({ background: 'linear-gradient(260deg, rgba(20,16,14,0) 35%, rgba(60,70,110,0.24) 100%)', clipPath: 'polygon(1280px 0px,900px 374px,940px 720px,1280px 720px)' }));
  box(mid, slab(), `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><path d="M15 70 L120 150 L35 235 L230 330 L110 420 L330 520 L230 610 L330 690" fill="none" stroke="#5a4a3e" stroke-width="7" stroke-linejoin="round" opacity="0.6"/></svg>`);
  [far, near, mid].forEach((g) => fadeIO(g, 24, 27.5));
  // cold air rising out of the cutting
  const RF = rr(44), fogUp = box(L, slab({ zIndex: 6 }));
  for (let i = 0; i < 12; i++) { const e = box(fogUp, { left: 100 + RF() * 1000, top: 400 + RF() * 280, width: 380 + RF() * 300, height: 120, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(150,170,205,0.55), rgba(0,0,0,0) 70%)', filter: 'blur(14px)', opacity: 0 }), dur = 8 + RF() * 5; tl.fromTo(e, { y: 0 }, { y: -330, duration: dur, ease: 'none', repeat: Math.ceil(50 / dur) }, t(24) + RF() * 4); tl.fromTo(e, { opacity: 0 }, { opacity: 0.4, duration: dur / 2, yoyo: true, repeat: 2 * Math.ceil(50 / dur) + 1, ease: 'sine.inOut' }, t(24) + RF() * 4); }
  cam([far, near, mid], [[0, 1], [24, 1], [44, 1.08], [54, 1.9]], [0, 0, -4, -50]);
  // narrator at the rim, back to us, frozen
  const nb = box(L, { left: 210, top: 410, width: 120, height: 220, opacity: 0, zIndex: 7, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 120 220" width="120" height="220"><rect x="42" y="150" width="14" height="70" rx="6" fill="#020304"/><rect x="64" y="150" width="14" height="70" rx="6" fill="#020304"/><path d="M28 56 Q28 40 60 38 Q92 40 92 58 L98 160 L22 160Z" fill="#030405"/><path d="M24 62 L18 140 M96 62 L102 140" stroke="#030405" stroke-width="12" stroke-linecap="round"/><circle cx="60" cy="24" r="15" fill="#030405"/><path d="M44 20 Q44 2 60 2 Q76 2 76 20Z M38 20 H82 V25 H38Z" fill="#020304"/></svg>`);
  tl.fromTo(nb, { opacity: 0, x: -220 }, { opacity: 1, x: 0, duration: 8, ease: 'sine.out' }, t(26));
  tl.fromTo(nb, { y: 0 }, { y: -4, duration: 0.5, yoyo: true, repeat: 15, ease: 'sine.inOut' }, t(26));
  tl.to(nb, { x: -420, y: 120, scale: 1.4, opacity: 0, duration: 1.4, ease: 'power2.in' }, t(54.3));
  const cold = box(L, slab({ zIndex: 8, background: 'radial-gradient(ellipse at 50% 112%, rgba(150,190,255,0.5) 0%, rgba(80,120,220,0.18) 45%, rgba(0,0,0,0) 72%)', opacity: 0 }));
  tl.to(cold, { opacity: 0.95, duration: 12, ease: 'sine.in' }, t(45)); tl.to(cold, { opacity: 0, duration: 3 }, t(60));
  mist(cold, { y: 380, h: 300, op: 0.3, n: 4, T: t(44), D: 18, seed: 51, color: 'rgba(160,190,235,0.5)' });
  [far, near, mid, fogUp, cold].forEach((g) => tl.to(g, { opacity: 0, duration: 1.6 }, t(60.2)));
  // ---------- RUSH: down the zigzag, walls streaming past
  const RU = box(L, slab({ zIndex: 9, opacity: 0, background: 'linear-gradient(#08080e, #151219)' })), RR = rr(66);
  for (let i = 0; i < 46; i++) { const side = RR() < 0.5, e = box(RU, { left: side ? RR() * 380 : W - RR() * 380, top: 0, width: 2 + RR() * 8, height: 120 + RR() * 260, background: `rgba(${90 + RR() * 50},${80 + RR() * 30},${80 + RR() * 30},${0.12 + RR() * 0.3})`, filter: 'blur(1.5px)' }), dur = 0.7 + RR() * 0.6; tl.fromTo(e, { y: 800 }, { y: -500, duration: dur, ease: 'none', repeat: Math.ceil(8 / dur) }, t(54.5) + RR() * dur); }
  for (let i = 0; i < 5; i++) { const b = box(RU, { left: 260 + i * 120, top: 0, width: 520, height: 22, background: 'rgba(110,90,76,0.55)', transform: 'rotate(-24deg)' }); tl.fromTo(b, { y: 800, x: 200 }, { y: -400, x: -300, duration: 1.4, ease: 'none', repeat: 5 }, t(54.5) + i * 0.28); }
  box(RU, slab({ background: 'radial-gradient(ellipse at 50% 60%, rgba(120,150,200,0.25), rgba(0,0,0,0) 55%), radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 35%, rgba(0,0,4,0.9) 100%)' }));
  tl.fromTo(RU, { opacity: 0 }, { opacity: 1, duration: 1.2 }, t(54.3)); tl.to(RU, { opacity: 0, duration: 2.5, ease: 'sine.inOut' }, t(61.4));
  // ---------- BOTTOM: the men with lamps held low, ghost gone
  const B = box(L, slab({ zIndex: 10, opacity: 0, transformOrigin: '50% 60%' }));
  box(B, slab({ background: 'linear-gradient(#0a0c14, #12141c 55%, #07080c)' }));
  tunnel(B, { x: 640, y: 330, w: 300, h: 190, T: t(61), D: 14 });
  rails(B, { vx: 640, vy: 330, x0: 330, x1: 950, y0: H + 100, T: t(61), D: 14 });
  box(B, slab({ background: 'radial-gradient(ellipse at 50% 72%, rgba(255,160,70,0.28), rgba(0,0,0,0) 55%)', mixBlendMode: 'screen' }));
  box(B, { left: 530, top: 485, width: 240, height: 80 }, `<svg viewBox="0 0 240 80" width="240" height="80"><path d="M10 70 Q20 30 70 24 Q130 18 190 40 Q214 52 206 70 Q110 82 10 70Z" fill="#8d8f8c"/><path d="M50 34 Q100 28 160 40 M30 56 Q110 66 190 56" stroke="#5c5e60" stroke-width="3" fill="none"/><path d="M200 50 L232 44 L234 58 L204 64Z M208 66 L236 62 L238 74 L210 76Z" fill="#050506"/></svg>`);
  const men = [[430, 0.85, 1, 0], [520, 0.95, 1, 1], [820, 0.9, -1, 2], [900, 0.8, -1, 3]];
  men.forEach(([x, s, dir, k]) => {
    const m = box(B, { left: x - 45 * s, top: 520 - 150 * s, width: 90 * s, height: 150 * s, transform: `scaleX(${dir})` }, `<svg viewBox="0 0 90 150" width="100%" height="100%" style="overflow:visible"><rect x="30" y="86" width="11" height="60" rx="4" fill="#040507"/><rect x="46" y="86" width="11" height="60" rx="4" fill="#040507"/><g class="tr" style="transform-origin:44px 90px"><path d="M26 30 Q26 18 44 18 Q62 18 62 32 L64 92 L24 92Z" fill="#06080c"/><path d="M58 34 L72 76" stroke="#06080c" stroke-width="9" stroke-linecap="round"/><g class="hd" style="transform-origin:44px 18px"><circle cx="48" cy="10" r="10" fill="#05070b"/><path d="M38 6 Q48 -5 58 6 L60 8 H36Z" fill="#030406"/><ellipse class="fc" cx="55" cy="12" rx="3.6" ry="4.6" fill="#b8c8e6" opacity="0"/></g></g></svg>`);
    lamp(B, { x: x + dir * 38 * s, y: 508, s: 0.7, T: t(61), D: 14 });
    tl.fromTo(m.querySelector('.tr'), { rotation: 20 + k * 3 }, { rotation: 26 + k * 3, duration: 3 + k * 0.4, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t(62));
    if (k === 1) { const hd = m.querySelector('.hd'), fc = m.querySelector('.fc'); tl.fromTo(hd, { rotation: 18 }, { rotation: -42, duration: 3.2, ease: 'sine.inOut' }, t(67)); tl.to(fc, { opacity: 0.8, duration: 2.2 }, t(69)); }
  });
  mist(B, { y: 500, h: 160, op: 0.3, n: 4, T: t(61), D: 14, seed: 71 });
  tl.fromTo(B, { opacity: 0, scale: 1 }, { opacity: 1, duration: 2.5 }, t(62.4)); tl.to(B, { scale: 1.09, duration: D - 62.4, ease: 'none' }, t(62.4));
})();
