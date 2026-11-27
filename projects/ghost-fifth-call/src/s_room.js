// ===== ROOM: Arun's room above the post office, rain on tin, the flame leans (scene 'room') =====
(function () {
  const w = win('room'), c = S('room'), T = w.T, D = w.D, R = rr(505);
  const L = box(c, { left: 0, top: 0, width: W, height: H, transformOrigin: '640px 470px' });
  const FL = 572, LX = 620, LYb = 488;                         // floor line, lamp x, table top
  // ---- wall, floor, light pools
  box(L, { left: 0, top: 0, width: W, height: FL, background: 'linear-gradient(#0b0912, #1a1219 70%, #20151a)' });
  for (let i = 0; i < 6; i++) box(L, { left: 0, top: 120 + i * 80 + R() * 20, width: W, height: 2, background: 'rgba(255,200,150,0.035)' });
  box(L, { left: 0, top: FL, width: W, height: H - FL, background: 'linear-gradient(#1a0f0d, #070405)' });
  box(L, { left: 0, top: FL - 2, width: W, height: 4, background: '#050304' });
  const wallPool = box(L, { left: LX - 560, top: 470 - 400, width: 1120, height: 800, background: 'radial-gradient(ellipse, rgba(255,150,60,0.42) 0%, rgba(255,120,40,0.14) 40%, rgba(0,0,0,0) 70%)', mixBlendMode: 'screen' });
  for (let t = 0; t < D; t += 0.14 + R() * 0.22) tl.set(wallPool, { opacity: 0.78 + R() * 0.22 }, T + t);
  // ---- tin roof band with ribs and a faint rain shimmer
  const roof = box(L, { left: 0, top: 0, width: W, height: 74, background: 'linear-gradient(#050408, #0e0b12)' });
  for (let x = 0; x < W; x += 26) box(roof, { left: x, top: 0, width: 3, height: 74, background: 'rgba(120,130,160,0.14)' });
  box(L, { left: 0, top: 72, width: W, height: 6, background: '#030206' });
  const shim = box(roof, { left: 0, top: 0, width: W, height: 74, background: 'linear-gradient(90deg, rgba(150,170,220,0), rgba(150,170,220,0.12), rgba(150,170,220,0))' });
  tl.fromTo(shim, { x: -400, opacity: 0 }, { x: 400, opacity: 1, duration: 5, repeat: Math.floor(D / 5), ease: 'sine.inOut' }, T + 11);
  // drips from the roof into a tin bucket and onto the floor
  box(L, { left: 760, top: 540, width: 54, height: 32, background: '#0b0a10', borderRadius: '3px 3px 8px 8px', borderTop: '2px solid #2a2a3a' });
  [[787, 1.15], [250, 1.6]].forEach(([x, per], k) => {
    const d = box(L, { left: x - 2, top: 78, width: 4, height: 10, borderRadius: '50%', background: 'rgba(170,190,230,0.55)', opacity: 0 });
    const sp = box(L, { left: x - 16, top: k ? FL + 6 : 548, width: 32, height: 8, borderRadius: '50%', border: '1px solid rgba(170,190,230,0.5)', opacity: 0 });
    for (let t = 12 + k * 0.4; t < D; t += per) {
      tl.fromTo(d, { y: 0, opacity: 0.8 }, { y: (k ? FL - 80 : 452), opacity: 0.8, duration: 0.55, ease: 'power2.in' }, T + t).set(d, { opacity: 0 }, T + t + 0.55);
      tl.fromTo(sp, { scale: 0.3, opacity: 0.6 }, { scale: 1.4, opacity: 0, duration: 0.6, ease: 'sine.out' }, T + t + 0.55);
    }
  });
  // ---- charpoy (low rope bed), table
  const bx = 70, bw = 470, by = 502;
  [bx + 8, bx + bw - 20].forEach((x) => { box(L, { left: x, top: by, width: 14, height: FL - by, background: '#0a0605' }); });
  box(L, { left: bx, top: by - 6, width: bw, height: 16, background: '#120a07', borderRadius: 4 });
  for (let i = 0; i < 24; i++) box(L, { left: bx + 6 + i * 19.3, top: by - 4, width: 2, height: 10, background: 'rgba(190,140,90,0.12)' });
  box(L, { left: bx + 6, top: by - 22, width: 130, height: 20, background: '#17100f', borderRadius: '10px 6px 2px 2px' });
  box(L, { left: 570, top: LYb, width: 150, height: 10, background: '#120b08', borderRadius: 2 });
  [578, 700].forEach((x) => box(L, { left: x, top: LYb + 10, width: 10, height: FL - LYb - 10, background: '#0a0605' }));
  box(L, { left: LX - 70, top: LYb - 2, width: 140, height: 3, background: 'rgba(255,190,110,0.35)' });
  // ---- window with shutter at right (cold storm light, rain, cracks)
  const wx = 940, wy = 140, ww = 220, wh = 300;
  const win_ = box(L, { left: wx, top: wy, width: ww, height: wh, overflow: 'hidden', background: 'linear-gradient(#2a3f78, #101a3c 60%, #0a1230)' });
  for (let i = 0; i < 34; i++) {
    const s = box(win_, { left: R() * ww, top: -50, width: 1.3, height: 26 + R() * 18, background: 'linear-gradient(rgba(190,210,255,0), rgba(190,210,255,0.8))', transform: 'rotate(10deg)', opacity: 0 });
    const dur = 0.35 + R() * 0.25;
    tl.set(s, { opacity: 1 }, T + 10 + R()).fromTo(s, { y: -60 }, { y: wh + 40, x: 40, duration: dur, repeat: Math.floor((D - 10) / dur), ease: 'none' }, T + 10 + R() * dur);
  }
  const stormGlow = box(win_, { left: 0, top: 0, width: ww, height: wh, background: 'rgba(170,200,255,0.5)', opacity: 0 });
  const shutter = box(L, { left: wx - 8, top: wy - 8, width: ww + 16, height: wh + 16, transformOrigin: '50% 0%' });
  box(shutter, { left: 0, top: 0, width: ww + 16, height: wh + 16, border: '8px solid #0c0705', boxSizing: 'border-box' });
  for (let i = 0; i < 7; i++) box(shutter, { left: 8 + i * 29.5, top: 8, width: 24, height: wh, background: 'linear-gradient(90deg, #130b07, #1d120b 50%, #100906)' });
  [70, 220].forEach((y) => box(shutter, { left: 8, top: y, width: ww, height: 14, background: '#0b0604' }));
  box(L, { left: wx - 14, top: wy + wh + 8, width: ww + 28, height: 12, background: '#0c0705' });
  const coldPool = box(L, { left: wx - 330, top: wy - 200, width: 880, height: 700, background: 'radial-gradient(ellipse, rgba(80,120,210,0.28) 0%, rgba(40,70,160,0.08) 45%, rgba(0,0,0,0) 70%)', mixBlendMode: 'screen' });
  // thunder through the slats (subtle, slow)
  [15.5, 21.5, 30.5, 38.5].forEach((t) => {
    tl.to(stormGlow, { opacity: 0.55, duration: 0.25, ease: 'sine.out' }, T + t).to(stormGlow, { opacity: 0, duration: 1.6, ease: 'sine.in' }, T + t + 0.3);
    tl.to(coldPool, { opacity: 1.8, duration: 0.25 }, T + t).to(coldPool, { opacity: 1, duration: 1.6 }, T + t + 0.3);
    flash(L, T + t, 0.07);
  });
  // shutter bars tremble: after 'Open the window', fainter while the voice moves into the room
  tl.fromTo(shutter, { rotation: -0.5 }, { rotation: 0.5, duration: 0.09, repeat: 36, yoyo: true, ease: 'sine.inOut' }, T + 28.7);
  tl.fromTo(shutter, { rotation: -0.25 }, { rotation: 0.25, duration: 0.11, repeat: 70, yoyo: true, ease: 'sine.inOut' }, T + 33.8);
  // ---- lamp on table, flame leans toward the window
  const lp = lamp(L, { x: LX, y: LYb - 48, s: 1.6, T, D });
  const fl = box(L, { left: LX - 8, top: LYb - 48 - 6, width: 16, height: 38, borderRadius: '50% 50% 50% 50% / 70% 70% 30% 30%', background: 'radial-gradient(#fff, #ffe9a0 60%, rgba(255,200,100,0))', transformOrigin: '50% 100%', mixBlendMode: 'screen' });
  for (let t = 0; t < D; t += 0.1 + R() * 0.12) tl.set(fl, { scaleY: 0.85 + R() * 0.3, scaleX: 0.9 + R() * 0.2 }, T + t);
  tl.to(fl, { rotation: 13, x: 2, duration: 2.5, ease: 'sine.inOut' }, T + 23.9);
  tl.to(fl, { rotation: 20, x: 3, duration: 4, ease: 'sine.inOut' }, T + 29);
  tl.to(wallPool, { x: 26, duration: 3, ease: 'sine.inOut' }, T + 24);
  // ---- Arun (seated silhouette) and his big shadow on the wall
  const body = (cl) => `<svg viewBox="0 0 140 190" width="100%" height="100%" style="overflow:visible"><g fill="none" stroke="${cl}" stroke-linecap="round" stroke-linejoin="round"><path d="M52 104 L66 48" stroke-width="30"/><path d="M60 104 L112 104 L113 160 L128 162" stroke-width="15"/><path d="M70 52 L98 96" stroke-width="11"/></g><circle cx="86" cy="26" r="14" fill="${cl}"/></svg>`;
  const aw = 140 * 1.15, ah = 190 * 1.15;
  const arun = box(L, { left: 400 - 60 * 1.15, top: 502 - 104 * 1.15, width: aw, height: ah, zIndex: 3 }, body('#070508'));
  box(arun, { left: 0, top: 0, width: aw, height: ah }, `<svg viewBox="0 0 140 190" width="100%" height="100%" style="overflow:visible"><g fill="none" stroke="rgba(255,175,80,0.75)" stroke-linecap="round" stroke-width="1.6"><path d="M96 40 Q102 22 99 17"/><path d="M82 102 L112 96"/><path d="M121 108 L121 150"/></g></svg>`);
  tl.fromTo(arun, { rotation: 0 }, { rotation: 1.2, duration: 0.4, repeat: Math.floor(D / 0.4), yoyo: true, ease: 'sine.inOut', transformOrigin: '40% 90%' }, T); // shaking, barely
  const wallClip = box(L, { left: 0, top: 78, width: W, height: FL - 78, overflow: 'hidden' });
  const sh = box(wallClip, { left: 20, top: 90, width: 420, height: 570, opacity: 0.7, filter: 'blur(7px)', transformOrigin: '60% 78%' }, body('#000'));
  sh.firstChild.style.transform = 'scaleX(-1)';
  for (let t = 0; t < D; t += 0.13 + R() * 0.2) tl.set(sh, { scaleY: 1 + (R() - 0.5) * (t > 24 ? 0.07 : 0.04), scaleX: 1 + (R() - 0.5) * 0.04, x: (R() - 0.5) * (t > 24 ? 10 : 5), opacity: 0.6 + R() * 0.15 }, T + t);
  // a second, smaller shape appears beside his shadow, lingers, fades
  const ex = box(wallClip, { left: 400, top: 270, width: 150, height: 330, opacity: 0, filter: 'blur(6px)', transformOrigin: '50% 100%' }, '<svg viewBox="0 0 60 150" width="100%" height="100%" style="overflow:visible"><circle cx="30" cy="14" r="11" fill="#000"/><path d="M18 28 Q30 24 42 28 L47 100 L40 150 L20 150 L13 100Z" fill="#000"/></svg>');
  tl.to(ex, { opacity: 0.42, duration: 3, ease: 'sine.inOut' }, T + 34).to(ex, { rotation: 2, x: 8, duration: 2.5, yoyo: true, repeat: 2, ease: 'sine.inOut' }, T + 34).to(ex, { opacity: 0, duration: 3.5, ease: 'sine.in' }, T + 41.5);
  // ---- dust motes in the lamp light, vignette, slow camera push
  for (let i = 0; i < 14; i++) { const m = box(L, { left: 440 + R() * 360, top: 330 + R() * 200, width: 2, height: 2, borderRadius: '50%', background: '#ffd9a0', opacity: 0.2 + R() * 0.4 }); tl.to(m, { x: (R() - 0.5) * 60, y: -20 - R() * 40, opacity: 0.05, duration: 4 + R() * 3, yoyo: true, repeat: Math.floor(D / 6), ease: 'sine.inOut' }, T + R() * 3); }
  box(L, { left: 0, top: 0, width: W, height: H, zIndex: 30, background: 'radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.6) 100%)' });
  tl.fromTo(L, { scale: 1.0, x: 0 }, { scale: 1.09, x: -14, duration: D, ease: 'none' }, T);
})();
