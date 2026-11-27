// ===== HOOK: the end told first, then the light rewinds =====
(function () {
  const c = S('hook'), w = win('hook'), T = w.T, D = w.D, at = (r) => T + r, R = rr(1871);
  const world = box(c, { left: 0, top: 0, width: W, height: H, transformOrigin: '330px 330px' });
  // sky: cold twilight, with a pale afternoon sky that fades in for the rewind
  sky(world, { top: '#0a1120', mid: '#1b2a44', bot: '#51698a', stars: 38, T, D, seed: 12 });
  const daysky = box(world, { left: 0, top: 0, width: W, height: H, background: 'linear-gradient(#7d8895 0%, #a3abb4 55%, #c7cbce 100%)', opacity: 0 });
  tl.to(daysky, { opacity: 1, duration: 15, ease: 'sine.inOut' }, at(41));
  glow(world, { x: 700, y: 360, r: 520, color: 'rgba(110,140,190,0.4)', op: 0.7, T, D, flicker: false });
  ridge(world, { y: 270, h: 140, color: '#0b101b', seed: 4, amp: 30, trees: 22, treeH: 70, T, D, drift: -30 });
  // hill over the tunnel, tunnel portal, far fog
  box(world, { left: 0, top: 0, width: W, height: H }, `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><path d="M240 460 Q300 330 480 310 Q620 296 760 318 Q900 340 960 460Z" fill="#070a11"/></svg>`);
  tunnel(world, { x: 560, y: 440, w: 190, h: 110, T, D });
  box(world, { left: 0, top: 0, width: W, height: H }, `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><polygon points="387,440 694,440 662,560 700,740 380,740 430,560" fill="#090c13"/></svg>`);
  mist(world, { y: 410, h: 90, op: 0.22, n: 3, T, D, seed: 7, speed: 0.6 });
  rails(world, { vx: 560, vy: 440, x0: 430, x1: 690, y0: 700, T, D });
  // cutting banks with a cold rim light, fence on the left rim
  box(world, { left: 0, top: 0, width: W, height: H }, `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><polygon points="-200,330 330,330 385,420 430,560 380,740 -200,740" fill="#06080d"/><polygon points="1500,300 770,300 705,420 662,560 700,740 1500,740" fill="#06080d"/><path d="M330 330 L385 420 L430 560" stroke="rgba(130,160,205,0.28)" stroke-width="2" fill="none"/><path d="M770 300 L705 420 L662 560" stroke="rgba(130,160,205,0.2)" stroke-width="2" fill="none"/><g fill="#05070b"><rect x="897" y="190" width="6" height="112"/><rect x="874" y="204" width="52" height="4"/><rect x="1057" y="190" width="6" height="112"/><rect x="1034" y="204" width="52" height="4"/><rect x="1217" y="190" width="6" height="112"/><rect x="1194" y="204" width="52" height="4"/></g><path d="M880 206 Q970 240 1040 206 Q1120 240 1200 206" stroke="#05070b" stroke-width="1.6" fill="none"/><path d="M920 206 Q1000 236 1080 206 Q1160 236 1240 206" stroke="#05070b" stroke-width="1.6" fill="none"/><g fill="#05070b"><rect x="90" y="296" width="5" height="36"/><rect x="170" y="296" width="5" height="36"/><rect x="250" y="296" width="5" height="36"/><rect x="85" y="304" width="170" height="3"/><rect x="85" y="316" width="170" height="3"/></g></svg>`);
  // day haze over the landscape (lifts everything to afternoon grey at the end)
  const haze = box(world, { left: -200, top: -200, width: W + 400, height: H + 400, background: 'rgba(150,160,172,0.42)', opacity: 0 });
  tl.to(haze, { opacity: 1, duration: 15, ease: 'sine.inOut' }, at(41));
  mist(world, { y: 440, h: 140, op: 0.28, n: 3, T, D, seed: 21, speed: 0.8 });

  // stopped locomotive in the tunnel mouth (head-on, tiny), dim lamps
  const loco = box(world, { left: 410, top: 192, width: 300, height: 260, transformOrigin: '50% 100%', transform: 'scale(0.3)' }, `<svg viewBox="0 0 300 260" width="300" height="260"><rect x="60" y="40" width="180" height="200" rx="18" fill="#050609"/><rect x="40" y="130" width="220" height="110" rx="10" fill="#08090d"/><rect x="132" y="0" width="36" height="60" fill="#050609"/><circle cx="150" cy="150" r="46" fill="#07080c" stroke="#12141b" stroke-width="6"/></svg>`);
  const ll = [glow(world, { x: 545, y: 424, r: 26, color: 'rgba(255,225,160,0.9)', op: 0.7, T, D: 44, flicker: false }), glow(world, { x: 575, y: 424, r: 26, color: 'rgba(255,225,160,0.9)', op: 0.7, T, D: 44, flicker: false })];
  tl.to(ll.concat([loco]), { opacity: 0, duration: 4, ease: 'sine.in' }, at(43));
  // steam out of the tunnel (0-40 s), then back INTO it (40-58 s)
  const stOut = box(world, { left: 0, top: 0, width: W, height: H });
  steam(stOut, { x: 560, y: 380, n: 7, T, D: 40, dx: 70, dy: -130, s: 1.4 });
  steam(stOut, { x: 520, y: 410, n: 4, T: T + 2, D: 38, dx: -50, dy: -90, s: 1.0, color: 'rgba(170,185,205,0.22)' });
  tl.to(stOut, { opacity: 0, duration: 3 }, at(38));
  const stIn = box(world, { left: 0, top: 0, width: W, height: H, opacity: 0 });
  for (let i = 0; i < 7; i++) {
    const e = box(stIn, { left: 540, top: 360, width: 56, height: 56, borderRadius: '50%', background: 'rgba(200,205,215,0.3)', filter: 'blur(8px)' }), dur = 5.5;
    tl.fromTo(e, { x: 80 + R() * 40, y: -150 - R() * 30, scale: 2.8, opacity: 0 }, { x: 0, y: 20, scale: 0.4, opacity: 0.5, duration: dur, repeat: 2, ease: 'sine.in' }, at(40 + i * 0.8));
  }
  tl.to(stIn, { opacity: 1, duration: 3 }, at(40)).to(stIn, { opacity: 0, duration: 3 }, at(54));
  // 5 lantern dots near the tunnel: the consequences, implied; they dim and vanish on the rewind
  [[470, 468], [505, 478], [602, 472], [640, 466], [684, 480]].forEach((p, i) => {
    const g = box(world, { left: p[0] - 22, top: p[1] - 22, width: 44, height: 44, borderRadius: '50%', background: 'radial-gradient(circle, #fff6d0 0%, #ffb347 14%, rgba(255,140,40,0.3) 40%, rgba(0,0,0,0) 70%)', mixBlendMode: 'screen', opacity: 0.85 });
    tl.to(g, { x: (i % 2 ? -1 : 1) * (14 + R() * 22), y: (R() - 0.5) * 8, duration: 3 + R() * 2, yoyo: true, repeat: 12, ease: 'sine.inOut' }, T + R());
    tl.to(g, { opacity: 0.45, duration: 0.5 + R(), yoyo: true, repeat: 40, ease: 'sine.inOut' }, T + R() * 2);
    tl.to(g, { opacity: 0, scale: 0.4, duration: 3, ease: 'sine.in', overwrite: 'auto' }, at(40 + i * 1.8));
  });

  // the narrator: coated figure with hat at the cutting edge, head bowed, breath fog
  const s = 0.7, nx = 320, ny = 330;
  const nar = box(world, { left: nx - 45 * s, top: ny - 190 * s, width: 90 * s, height: 190 * s, opacity: 0 }, `<svg viewBox="0 0 90 190" width="100%" height="100%" style="overflow:visible"><path d="M30 54 Q45 46 62 54 L69 170 L21 170Z" fill="#05070b" stroke="rgba(150,185,230,0.4)" stroke-width="1.2"/><rect x="31" y="166" width="13" height="24" fill="#05070b"/><rect x="47" y="166" width="13" height="24" fill="#05070b"/><path d="M58 58 L64 112" stroke="#05070b" stroke-width="9" stroke-linecap="round"/><path d="M33 58 L30 112" stroke="#05070b" stroke-width="9" stroke-linecap="round"/><rect x="42" y="42" width="12" height="14" fill="#05070b"/><circle cx="50" cy="37" r="10" fill="#05070b" stroke="rgba(150,185,230,0.4)" stroke-width="1"/><g transform="rotate(8 50 30)"><ellipse cx="50" cy="29" rx="18" ry="4.5" fill="#05070b"/><path d="M38 29 L40 10 Q50 5 60 10 L62 29Z" fill="#05070b" stroke="rgba(150,185,230,0.35)" stroke-width="1"/></g></svg>`);
  tl.to(nar, { opacity: 1, duration: 4 }, at(16)).to(nar, { opacity: 0, duration: 5, ease: 'sine.in' }, at(44));
  tl.fromTo(nar, { rotation: -0.6 }, { rotation: 0.8, duration: 4, yoyo: true, repeat: 12, ease: 'sine.inOut', transformOrigin: '50% 100%' }, T);
  for (let i = 0; i < 8; i++) {
    const b = box(world, { left: nx + 15 * s - 9, top: ny - 150 * s - 9, width: 18, height: 18, borderRadius: '50%', background: 'rgba(215,225,240,0.5)', filter: 'blur(5px)', opacity: 0 });
    tl.fromTo(b, { x: 0, y: 0, scale: 0.4, opacity: 0.5 }, { x: 40 + R() * 20, y: -18 - R() * 14, scale: 2.4, opacity: 0, duration: 3.2, ease: 'sine.out' }, at(19 + i * 2.7));
  }
  // red danger lamp far below him; pulses for 40 s, then burns calm
  const rh = redLamp(world, { x: 500, y: 470, s: 0.9, T, D: 40 });
  tl.to(rh, { opacity: 0.8, duration: 3 }, at(41));
  // camera: still wide, slow push toward the narrator, then hold on the empty edge
  tl.fromTo(world, { scale: 1, x: 0, y: 0 }, { scale: 1.05, duration: 20, ease: 'none' }, T);
  tl.to(world, { scale: 1.6, x: 250, y: -20, duration: 20, ease: 'sine.inOut' }, at(20));
  tl.to(world, { scale: 1.68, x: 262, duration: 18, ease: 'none' }, at(40));
})();
