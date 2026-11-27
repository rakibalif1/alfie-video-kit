// ===== WATCHMAN: Bhola's hut at the halfway point (scene 'watchman') =====
(function () {
  const w = win('watchman'), c = S('watchman'), T = w.T, D = w.D, R = rr(404);
  const L = box(c, { left: 0, top: 0, width: W, height: H, transformOrigin: '700px 520px' });
  const FX = 580, FY = 545, GY = 540; // fire x, fire base y, ground y
  // --- sky, far land, water behind the embankment
  sky(L, { top: '#03050f', mid: '#0a1538', bot: '#1c3466', stars: 70, moon: { x: 190, y: 118, r: 20 }, T, D, seed: 12 });
  ridge(L, { y: 300, h: 150, color: '#0c1530', seed: 4, amp: 30, drift: -26, T, D });
  ridge(L, { y: 360, h: 150, color: '#070c1c', seed: 15, amp: 26, trees: 26, treeH: 70, drift: -50, T, D });
  water(L, { y: 470, h: 70, T, D, seed: 3 });
  mist(L, { y: 440, h: 80, op: 0.3, n: 3, T, D, seed: 5 });
  // --- embankment ground with a warm pool of firelight
  box(L, { left: 0, top: GY - 6, width: W, height: 60, background: 'linear-gradient(#17151c, #08080d)' });
  box(L, { left: 0, top: GY + 52, width: W, height: 200, background: 'linear-gradient(#050913, #010208)' });
  const pool = box(L, { left: FX - 480, top: GY - 30, width: 960, height: 120, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,150,60,0.55) 0%, rgba(255,110,30,0.2) 45%, rgba(0,0,0,0) 72%)', mixBlendMode: 'screen' });
  for (let t = 0; t < D; t += 0.14 + R() * 0.2) tl.set(pool, { opacity: 0.7 + R() * 0.3 }, T + t);
  // fire reflected as amber streaks in the black water in front
  for (let i = 0; i < 6; i++) { const s = box(L, { left: FX - 30 + (R() - 0.5) * 60, top: GY + 62 + i * 14, width: 40 + R() * 70, height: 2, background: 'rgba(255,170,80,0.35)' }); tl.to(s, { x: (R() - 0.5) * 40, opacity: 0.1, duration: 1.5 + R(), yoyo: true, repeat: Math.floor(D / 2.2), ease: 'sine.inOut' }, T); }
  // --- the hut: tin roof, dark door lit from inside
  const hut_ = box(L, { left: 720, top: 330, width: 420, height: 215 }, `<svg viewBox="0 0 420 215" width="100%" height="100%" style="overflow:visible"><defs><linearGradient id="hd" x1="0" x2="1"><stop offset="0" stop-color="#6a3414"/><stop offset="1" stop-color="#1a0d08"/></linearGradient></defs>
    <rect x="12" y="98" width="396" height="117" fill="#0a0a12"/><rect x="40" y="116" width="112" height="99" fill="url(#hd)"/><rect x="190" y="130" width="40" height="34" fill="#0e1a30" opacity="0.8"/>
    <rect x="8" y="96" width="9" height="119" fill="#050509"/><rect x="150" y="100" width="8" height="115" fill="#050509"/>
    <path d="M-14 96 L432 34 L432 60 L-14 118Z" fill="#141c2e"/>${Array.from({ length: 40 }, (_, i) => `<path d="M${-12 + i * 11.2} ${97 - i * 1.55} L${-12 + i * 11.2} ${119 - i * 1.55}" stroke="#05080f" stroke-width="2.2" opacity="0.7"/>`).join('')}
    <path d="M-14 96 L432 34" stroke="#8fb0e8" stroke-width="2" opacity="0.5"/><path d="M-14 118 L-14 96" stroke="#ff9a4a" stroke-width="2" opacity="0.7"/>
    <path d="M300 38 L300 14 L316 14 L316 36" fill="#0a0a12"/></svg>`);
  // --- Bhola: seated old man in profile facing the fire, shawl, thin beard
  const bh = box(L, { left: 585, top: 290, width: 250, height: 250 }, `<svg viewBox="0 0 200 200" width="100%" height="100%" style="overflow:visible"><defs><linearGradient id="bg" x1="0" x2="1"><stop offset="0" stop-color="#6b3a18"/><stop offset="0.4" stop-color="#1c1411"/><stop offset="1" stop-color="#07070b"/></linearGradient></defs>
    <path d="M62 200 C56 160 66 112 98 90 C122 80 146 96 154 130 C166 160 172 182 178 200Z" fill="url(#bg)"/>
    <path d="M58 200 L52 172 Q58 150 84 160 L100 200Z" fill="url(#bg)"/><path d="M92 112 Q70 128 64 152" stroke="#2a1a12" stroke-width="12" stroke-linecap="round" fill="none"/>
    <g id="tail"><path d="M152 112 Q178 124 190 176 L170 182 Q168 150 150 134Z" fill="#0a0a10"/></g>
    <g id="head"><path d="M82 48 Q96 34 112 46 L114 82 L96 86 Q94 80 84 78Z" fill="url(#bg)"/><circle cx="98" cy="62" r="17" fill="url(#bg)"/><path d="M82 58 L70 68 L83 72Z" fill="#4a2a16"/><path d="M80 72 Q80 96 96 102 Q91 86 96 74Z" fill="#7a6a60" opacity="0.8"/><path d="M80 44 Q98 28 116 44 Q112 52 98 50 Q88 50 80 52Z" fill="#1d1a22"/></g>
    <path class="rim" d="M62 200 C56 160 66 112 98 90" stroke="#ffb066" stroke-width="2" fill="none" opacity="0.6"/><path class="rim" d="M58 200 L52 172 Q58 152 78 160" stroke="#ffb066" stroke-width="2" fill="none" opacity="0.6"/></svg>`);
  const head = bh.querySelector('#head'), tail = bh.querySelector('#tail'), rims = bh.querySelectorAll('.rim');
  gsap.set(head, { svgOrigin: '100 90', rotation: -7 }); gsap.set(tail, { svgOrigin: '152 112' });
  tl.to(head, { rotation: -10, duration: 4, yoyo: true, repeat: 2, ease: 'sine.inOut' }, T);   // nodding at the fire
  tl.to(head, { rotation: -1, x: -3, duration: 1.4, ease: 'sine.inOut' }, T + 11.2);          // turns to the lamp
  tl.to(head, { rotation: 15, x: 0, duration: 1.6, ease: 'sine.inOut' }, T + 12.8);           // then the sky
  tl.to(head, { rotation: -2, x: -2, duration: 1.4, ease: 'sine.inOut' }, T + 14.8);          // then Arun
  tl.to(head, { rotation: -9, x: 0, duration: 5, ease: 'sine.inOut' }, T + 31);               // looks down as the fire dies
  tl.fromTo(tail, { rotation: -3 }, { rotation: 3, duration: 1.7, yoyo: true, repeat: Math.floor(D / 1.7), ease: 'sine.inOut' }, T);
  tl.to(tail, { rotation: 11, duration: 1.2, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T + 18); // wind rises with the warning
  // --- fire (own wrapper so it can flare / shrink), embers, smoke
  const fw = box(L, { left: 0, top: 0, width: W, height: H, transformOrigin: `${FX}px ${FY}px` });
  fire(fw, { x: FX, y: FY, s: 1.7, T, D });
  [17.1, 20.9, 24.2, 27.4].forEach((t) => { tl.to(fw, { scale: 1.32, rotation: -3, duration: 0.55, ease: 'power2.out' }, T + t).to(fw, { scale: 1, rotation: 0, duration: 1.7, ease: 'sine.inOut' }, T + t + 0.55); tl.to(rims, { opacity: 1, duration: 0.5 }, T + t).to(rims, { opacity: 0.6, duration: 1.7 }, T + t + 0.55); });
  tl.to(fw, { scale: 0.42, rotation: 5, duration: 5, ease: 'sine.inOut' }, T + 30.5);
  tl.to(rims, { opacity: 0.2, duration: 5 }, T + 30.5); tl.to(pool, { scaleX: 0.7, scaleY: 0.7, duration: 6, transformOrigin: '50% 50%' }, T + 30.5);
  for (let i = 0; i < 18; i++) {
    const e = box(L, { left: FX - 14, top: FY - 60, width: 3 + R() * 2.5, height: 3 + R() * 2.5, borderRadius: '50%', background: '#ffb347', boxShadow: '0 0 6px 2px rgba(255,140,40,0.8)', opacity: 0 }), dur = 2.5 + R() * 2.5;
    tl.fromTo(e, { y: 0, x: (R() - 0.5) * 30, opacity: 0.95 }, { y: -(170 + R() * 160), x: 20 + R() * 90, opacity: 0, duration: dur, repeat: Math.floor(D / dur), ease: 'sine.out' }, T + R() * dur);
  }
  const sw = box(L, { left: 0, top: 0, width: W, height: H, transformOrigin: `${FX}px ${FY - 60}px` });
  for (let i = 0; i < 7; i++) { const sm = box(sw, { left: FX - 22, top: FY - 130, width: 54, height: 54, borderRadius: '50%', background: 'rgba(175,180,205,0.42)', filter: 'blur(10px)', opacity: 0 }); tl.fromTo(sm, { y: 0, x: 0, opacity: 0.8, scale: 0.5 }, { y: -230, x: 20 + R() * 30, opacity: 0, scale: 2.8, duration: 6.5, repeat: Math.floor(D / 6.5), ease: 'sine.out' }, T + i * 0.95); }
  tl.to(sw, { rotation: 4, duration: 8, ease: 'sine.inOut' }, T + 15);
  tl.to(sw, { rotation: 46, duration: 7, ease: 'sine.inOut' }, T + 30.5); // smoke bends toward the dark path ahead
  glow(L, { x: FX, y: FY - 40, r: 360, op: 0.55, T, D });
  // --- Arun walks in from the left with his lamp and stands, long shadow on the ground
  const AX = 430;
  const sh = box(L, { left: AX - 330, top: GY + 2, width: 340, height: 42, transformOrigin: '100% 0%', opacity: 0 }, '<svg viewBox="0 0 340 42" width="100%" height="100%" preserveAspectRatio="none"><path d="M340 0 L40 20 Q8 24 6 34 Q14 42 44 40 L340 22Z" fill="#000" opacity="0.85"/></svg>');
  tl.fromTo(sh, { scaleX: 0.3, opacity: 0 }, { scaleX: 0.85, opacity: 1, duration: 3, ease: 'sine.out' }, T + 8);
  tl.to(sh, { scaleX: 1.25, duration: 14, ease: 'none' }, T + 16);
  const arun = man(L, { x: -90, y: GY + 4, s: 1.05, T: T + 5.5, D: 5.5, from: 0, to: AX + 90, lamp: true });
  tl.to(arun.querySelectorAll('rect'), { rotation: 0, duration: 0.5 }, T + 11);
  tl.to(arun, { y: 0, duration: 0.5 }, T + 11);
  // --- foreground reeds, framing the shot
  [[10, 230], [40, 180], [80, 250], [120, 150], [1120, 170], [1160, 240], [1200, 190], [1245, 260]].forEach(([x, h], i) => {
    const r_ = box(L, { left: x, top: 720 - h, width: 5, height: h, background: '#020308', borderRadius: 3, transformOrigin: '50% 100%' });
    tl.fromTo(r_, { rotation: -3 - R() * 2 }, { rotation: 3 + R() * 2, duration: 2.2 + R() * 1.5, yoyo: true, repeat: Math.floor(D / 3), ease: 'sine.inOut' }, T + R());
  });
  mist(L, { y: 520, h: 70, op: 0.22, n: 3, T, D, seed: 31 });
  // faint aleya far on the dark path, only late
  const al = box(L, { left: 0, top: 0, width: W, height: H, opacity: 0.55 }); orbs(al, { n: 3, x0: 960, x1: 1230, y0: 430, y1: 500, T: T + 31, D: D - 31, seed: 9 });
  // --- camera: slow drift, push-in on Bhola during the warning, then settle
  tl.fromTo(L, { scale: 1 }, { scale: 1.07, duration: 16, ease: 'none' }, T);
  tl.to(L, { scale: 1.4, x: -8, duration: 14, ease: 'sine.inOut' }, T + 16);
  tl.to(L, { scale: 1.46, duration: D - 30, ease: 'none' }, T + 30);
  // --- cold blue creeping in from the right edge (screen fixed)
  const cold = box(c, { left: 360, top: 0, width: 920, height: H, background: 'linear-gradient(90deg, rgba(40,90,190,0), rgba(60,120,230,0.6))', mixBlendMode: 'screen', opacity: 0 });
  tl.to(cold, { opacity: 1, duration: 8, ease: 'sine.inOut' }, T + 30.5);
  box(c, { left: 0, top: 590, width: W, height: 130, background: 'linear-gradient(rgba(2,3,8,0), rgba(2,3,8,0.7))' });
})();
