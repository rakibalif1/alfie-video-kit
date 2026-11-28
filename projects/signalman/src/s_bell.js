// ===== BELL v2: dread in the box (still bell, shaking hand), the two men at the table, the climb out of the cutting =====
// Timeline (seconds from scene start, D = 133.2): A bell room 0-52 | B table 49-113.5 | C climb 110-133.2
(function () {
  const c = S('bell'), w = win('bell'), T = w.T, D = w.D, at = (r) => T + r, R = rr(5521);
  const lay = () => box(c, { left: 0, top: 0, width: W, height: H });
  const la = lay(), lb = lay(), lc = lay();
  tl.set(lb, { opacity: 0 }, T).set(lc, { opacity: 0 }, T);
  tl.to(la, { opacity: 0, duration: 3, ease: 'sine.inOut' }, at(49));
  tl.fromTo(lb, { opacity: 0 }, { opacity: 1, duration: 3, ease: 'sine.inOut' }, at(49)).to(lb, { opacity: 0, duration: 3.4, ease: 'sine.inOut' }, at(110));
  tl.fromTo(lc, { opacity: 0 }, { opacity: 1, duration: 3.4, ease: 'sine.inOut' }, at(110));
  const svgs = (p, css, vb, inner) => box(p, css, `<svg viewBox="${vb}" width="100%" height="100%" style="overflow:visible">${inner}</svg>`);
  const cam = (s, cx, cy) => ({ scale: s, x: -(cx - 640) * s, y: -(cy - 360) * s });
  const world = (p) => box(p, { left: 0, top: 0, width: W, height: H, transformOrigin: '640px 360px' });
  // cold-white soft light pool (screen blend)
  const cold = (p, x, y, r, op, T0, D0, col) => {
    const e = box(p, { left: x - r, top: y - r, width: 2 * r, height: 2 * r, borderRadius: '50%', background: `radial-gradient(circle, ${col || 'rgba(205,225,255,0.85)'} 0%, rgba(140,175,235,0.28) 38%, rgba(0,0,0,0) 70%)`, opacity: op, mixBlendMode: 'screen' });
    tl.to(e, { opacity: op * 0.75, duration: 3.2, yoyo: true, repeat: Math.max(1, Math.floor(D0 / 3.2)), ease: 'sine.inOut' }, T0);
    return e;
  };
  const rimL = (api, col) => { api.g.style.filter = `drop-shadow(-2px 0 0 ${col}) drop-shadow(0 0 6px rgba(0,0,0,0.6))`; };
  const window_ = (p, x, y, ww, hh) => {
    box(p, { left: x - 10, top: y - 10, width: ww + 20, height: hh + 20, background: '#0c0907' });
    box(p, { left: x, top: y, width: ww, height: hh, background: 'linear-gradient(#c6d9f2, #7d9bc6)', opacity: 0.85 });
    box(p, { left: x + ww / 2 - 3, top: y, width: 6, height: hh, background: '#0c0907' }); box(p, { left: x, top: y + hh * 0.46, width: ww, height: 6, background: '#0c0907' });
    cold(p, x + ww / 2, y + hh / 2, ww * 1.1, 0.55, T, D, 'rgba(190,215,255,0.7)');
  };

  // ======================= A (0-52 s): the bell, the shaking hand =======================
  const wa = world(la), far = box(wa, { left: 0, top: 0, width: W, height: H }), near = box(wa, { left: 0, top: 0, width: W, height: H });
  box(far, { left: -600, top: -400, width: W + 1200, height: H + 800, background: 'linear-gradient(90deg,#1a110c,#2e1c11 55%,#40271a)' });
  let pl = ''; for (let i = -7; i < 22; i++) pl += `<rect x="${i * 96}" y="-400" width="3" height="${H + 800}" fill="#0a0504" opacity="0.65"/><rect x="${i * 96 + 3}" y="-400" width="2" height="${H + 800}" fill="rgba(255,200,140,0.07)"/>`;
  box(far, { left: 0, top: 0, width: W, height: H }, `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="overflow:visible">${pl}<path d="M560 -400 V150" stroke="#0a0504" stroke-width="3" fill="none"/><rect x="470" y="104" width="180" height="14" rx="3" fill="#120b07"/><rect x="540" y="-400" width="40" height="510" fill="#150d08"/></svg>`);
  window_(far, 110, 56, 190, 170);
  // warm wall pool behind the bell, then the bell
  glow(far, { x: 560, y: 270, r: 420, color: 'rgba(255,180,95,0.5)', op: 0.7, T, D: 52 });
  const bell = svgs(near, { left: 410, top: 120, width: 300, height: 300, transformOrigin: '50% 8%' }, '0 0 300 300', `<defs><linearGradient id="brs" x1="0" x2="1"><stop offset="0" stop-color="#3a2508"/><stop offset="0.45" stop-color="#b98a2e"/><stop offset="0.62" stop-color="#f3cf78"/><stop offset="1" stop-color="#7a5217"/></linearGradient></defs><rect x="138" y="0" width="24" height="40" fill="#0a0706"/><rect x="120" y="30" width="60" height="16" rx="6" fill="#120c07"/><path d="M45 235 Q45 80 150 58 Q255 80 255 235 L282 252 L18 252Z" fill="url(#brs)"/><path d="M20 252 H280" stroke="#2a1a06" stroke-width="6"/><path d="M80 120 Q90 90 130 76" stroke="rgba(255,240,190,0.55)" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M215 140 Q222 190 226 230" stroke="rgba(40,20,5,0.55)" stroke-width="10" fill="none"/><circle cx="150" cy="268" r="14" fill="#2a1c0a"/><path d="M72 128 Q84 92 128 72" stroke="rgba(235,245,255,0.9)" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M52 232 Q50 130 84 96" stroke="rgba(190,215,255,0.5)" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M60 246 L232 246" stroke="rgba(220,235,255,0.3)" stroke-width="2"/>`);
  // cold window light falls on the bell
  lightCone(near, { x: 215, y: 215, len: 460, spread: 150, rot: -66, color: 'rgba(200,222,255,0.5)', op: 0.5, T, D: 52 });
  const bellCold = cold(near, 548, 215, 250, 0.4, T, 52);
  tl.to(bellCold, { opacity: 0.8, duration: 12, ease: 'sine.inOut' }, at(34));   // the stillness grows colder, brighter
  // the ring: the bell swings visibly (7 deg, decaying), expanding rings
  const ring = (t0) => { const e = box(near, { left: 560 - 170, top: 340 - 170, width: 340, height: 340, borderRadius: '50%', border: '2px solid rgba(255,230,170,0.7)', opacity: 0 }); tl.fromTo(e, { scale: 0.45, opacity: 0.7 }, { scale: 2.0, opacity: 0, duration: 2.4, ease: 'sine.out', immediateRender: false }, t0); };
  [17.6, 23.2, 27.6].forEach((t0) => {
    ring(at(t0)); ring(at(t0 + 0.9));
    let a = 7, tt = at(t0);
    for (let k = 0; k < 13; k++, a *= 0.78) { tl.to(bell, { rotation: (k % 2 ? -1 : 1) * a, duration: 0.34, ease: 'sine.inOut' }, tt); tt += 0.34; }
    tl.to(bell, { rotation: 0, duration: 0.3, ease: 'sine.out' }, tt);
  });
  // the signalman: puppet behind the shaking hand, lit warm from the hanging lamp, turns his head to the wall
  const sig = puppet(near, { x: 1095, y: 672, s: 1.9, hat: 'cap', coat: '#17100d', coat2: '#0c0807', rim: 'rgba(255,175,95,0.7)' });
  gsap.set([sig.P.lb, sig.P.lf, sig.P.af], { opacity: 0 });
  sig.breathe(T, 52, 1.3);
  sig.head(2, T, 0.1); sig.head(-3, at(6), 3); sig.head(-12, at(13.2), 1.6); sig.head(-6, at(19), 2.5); sig.head(4, at(26), 2.2); sig.head(-10, at(34.6), 2.4); sig.head(-4, at(43), 3);
  lamp(far, { x: 1195, y: 170, s: 1.8, r: 330, T, D: 52 });
  box(far, { left: 1194, top: -400, width: 3, height: 540, background: '#0a0504' });
  // the narrator in the foreground, watching him
  const nar = puppet(near, { x: 150, y: 800, s: 2.4, hat: 'top', coat: '#0b101c', coat2: '#060910' });
  rimL(nar, 'rgba(165,200,255,0.65)'); gsap.set([nar.P.lb, nar.P.lf], { opacity: 0 });
  nar.breathe(T, 52, 1.2); nar.head(8, T, 0.1); nar.head(14, at(12), 2.2); nar.head(8, at(25), 2.5); nar.head(16, at(31), 2.8); nar.head(10, at(40), 3);
  nar.arm('f', -6, -22, at(19), 1.8); nar.arm('f', 0, 0, at(24), 2.2);
  // the mug and the shaking hand
  const hand = svgs(near, { left: 880, top: 400, width: 280, height: 240 }, '0 0 280 240', `<path d="M170 130 L290 250 L180 260 L110 170Z" fill="#150e0b"/><rect x="40" y="20" width="108" height="118" rx="10" fill="#4a4a54"/><rect x="40" y="20" width="14" height="118" rx="6" fill="rgba(255,190,110,0.5)"/><path d="M148 44 Q190 44 190 82 Q190 112 148 112" stroke="#4a4a54" stroke-width="14" fill="none"/><ellipse cx="94" cy="20" rx="54" ry="8" fill="#1c1916"/><g fill="#8a5a3e"><rect x="86" y="46" width="70" height="20" rx="10"/><rect x="82" y="68" width="74" height="20" rx="10"/><rect x="86" y="90" width="70" height="20" rx="10"/><path d="M60 58 Q92 34 110 40 L110 64 Q80 70 62 96Z"/><path d="M110 100 L180 130 L150 170 L100 120Z"/></g><path d="M88 48 H152 M84 70 H152 M88 92 H152" stroke="rgba(255,210,150,0.6)" stroke-width="2"/>`);
  for (let t = 0; t < 52; t += 0.06) { const k = 1 + 2.4 * Math.min(1, t / 22); tl.set(hand, { x: (R() - 0.5) * 2 * k, y: (R() - 0.5) * 1.6 * k, rotation: (R() - 0.5) * 0.8 * k }, at(t)); }
  steam(near, { x: 985, y: 415, n: 4, T, D: 52, dx: 16, dy: -80, s: 0.6, color: 'rgba(225,218,210,0.3)' });
  motes(near, { x0: 880, x1: 1280, y0: 80, y1: 520, n: 22, color: 'rgba(255,215,150,0.9)', T, D: 52, size: 2.4, seed: 31 });
  motes(near, { x0: 250, x1: 720, y0: 60, y1: 430, n: 28, color: 'rgba(210,228,255,0.95)', T, D: 52, size: 2.4, rise: -26, seed: 41 });
  // camera: tight on the hand and the signalman, eyes to the wall -> pan to the bell, push in; still bell in the close-up
  tl.fromTo(wa, cam(1.3, 960, 420), { ...cam(1.37, 940, 420), duration: 12.2, ease: 'none' }, T);
  tl.to(wa, { ...cam(1.1, 640, 300), duration: 5, ease: 'sine.inOut' }, at(12.2));
  tl.to(wa, { ...cam(1.28, 600, 290), duration: 16.8, ease: 'none' }, at(17.2));
  tl.to(wa, { ...cam(1.52, 575, 285), duration: 13, ease: 'sine.inOut' }, at(34));
  tl.to(wa, { ...cam(1.58, 575, 285), duration: 5, ease: 'none' }, at(47));
  tl.fromTo(wa, { rotation: -0.25 }, { rotation: 0.25, duration: 9, yoyo: true, repeat: 5, ease: 'sine.inOut' }, T);
  tl.fromTo(far, { x: 14 }, { x: -14, duration: 52, ease: 'none' }, T);       // parallax: far layer drifts against the camera
  tl.fromTo(near, { x: -8 }, { x: 8, duration: 52, ease: 'none' }, T);

  // ======================= B (49-113.5 s): faces at the table =======================
  const wb = world(lb), bfar = box(wb, { left: 0, top: 0, width: W, height: H }), bnear = box(wb, { left: 0, top: 0, width: W, height: H });
  box(bfar, { left: -600, top: -400, width: W + 1200, height: H + 800, background: 'linear-gradient(90deg,#1b130e,#2c1b11 50%,#3a2415)' });
  let pl2 = ''; for (let i = -7; i < 22; i++) pl2 += `<rect x="${i * 110}" y="-400" width="3" height="${H + 800}" fill="#0a0504" opacity="0.6"/>`;
  box(bfar, { left: 0, top: 0, width: W, height: H }, `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="overflow:visible">${pl2}</svg>`);
  window_(bfar, 70, 70, 230, 250);
  lightCone(bfar, { x: 185, y: 230, len: 760, spread: 230, rot: -58, color: 'rgba(175,205,255,0.4)', op: 0.5, T: at(49), D: 65 });
  svgs(bfar, { left: 960, top: 90, width: 160, height: 160, opacity: 0.8 }, '0 0 300 300', `<path d="M45 235 Q45 80 150 58 Q255 80 255 235 L282 252 L18 252Z" fill="#5a421a"/><path d="M80 120 Q90 90 130 76" stroke="rgba(235,245,255,0.7)" stroke-width="6" fill="none"/><rect x="120" y="30" width="60" height="16" rx="6" fill="#120c07"/>`);
  cold(bfar, 1040, 160, 170, 0.45, at(49), 65);
  glow(bfar, { x: 780, y: 330, r: 520, color: 'rgba(255,175,85,0.65)', op: 0.85, T: at(49), D: 65 });
  // the narrator: big foreground silhouette at the left, back-lit by the window; he listens, then speaks
  const nb = puppet(bnear, { x: 160, y: 1130, s: 4.0, hat: 'top', coat: '#0b101c', coat2: '#060910' });
  rimL(nb, 'rgba(165,200,255,0.7)'); gsap.set([nb.P.lb, nb.P.lf], { opacity: 0 });
  nb.breathe(at(49), 65, 1.4);
  nb.head(5, at(49), 0.1); nb.head(-2, at(56), 3); nb.head(7, at(64), 2.4); nb.head(-1, at(76), 3); nb.head(9, at(88), 3); nb.head(14, at(92.5), 2.6); nb.head(3, at(99), 2.5); nb.head(-3, at(106), 3);
  nb.arm('f', -34, -62, at(99.5), 2.0); nb.arm('f', -22, -40, at(104), 1.8); nb.arm('f', 0, 0, at(109), 2.2);
  breathFog(bnear, 230, 360, at(52), 56, 3.2, 26);
  // the signalman's face (bust), alive: breath, sway, blinks, eyes that look and drop
  const sg = svgs(bnear, { left: 540, top: 110, width: 280, height: 380, transformOrigin: '50% 90%' }, '0 0 280 380', `<defs><radialGradient id="uf" cx="0.5" cy="1.05" r="0.95"><stop offset="0" stop-color="#e4a870"/><stop offset="0.45" stop-color="#8e5a3c"/><stop offset="1" stop-color="#2a1a14"/></radialGradient></defs><path d="M10 380 Q20 270 100 250 L180 250 Q260 270 270 380Z" fill="#24190f" stroke="rgba(255,170,90,0.5)" stroke-width="2"/><path d="M118 230 H162 V262 H118Z" fill="#3a2418"/><ellipse cx="140" cy="140" rx="68" ry="88" fill="url(#uf)"/><path d="M76 150 Q80 232 140 252 Q200 232 204 150 Q196 190 140 196 Q84 190 76 150Z" fill="#150d0a"/><path d="M104 214 Q140 232 176 214 Q140 224 104 214Z" fill="#c68a58" opacity="0.2"/><path d="M108 214 Q140 198 172 214" stroke="#050303" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M141 126 L136 162 Q142 169 150 164" stroke="#b97d52" stroke-width="3.5" fill="none" opacity="0.8" stroke-linecap="round"/><path d="M96 98 Q112 84 130 96 L128 108 Q112 98 98 110Z M150 96 Q168 84 184 98 L182 110 Q168 98 152 108Z" fill="#070404"/><ellipse cx="112" cy="116" rx="13" ry="7" fill="#0a0605"/><ellipse cx="168" cy="116" rx="13" ry="7" fill="#0a0605"/><g id="eyes"><ellipse cx="112" cy="117" rx="7" ry="3.6" fill="#e6d6bc"/><ellipse cx="168" cy="117" rx="7" ry="3.6" fill="#e6d6bc"/><circle cx="115" cy="116" r="2.8" fill="#080504"/><circle cx="171" cy="116" r="2.8" fill="#080504"/><circle cx="116" cy="115" r="0.9" fill="#fff"/><circle cx="172" cy="115" r="0.9" fill="#fff"/></g><path d="M72 70 Q140 10 208 70 Q200 50 140 40 Q80 50 72 70Z" fill="#0a0605"/><path d="M76 150 Q70 110 90 70" stroke="rgba(170,200,255,0.5)" stroke-width="3" fill="none"/>`);
  sg.style.filter = 'drop-shadow(-3px 0 0 rgba(160,195,255,0.45))';
  tl.fromTo(sg, { scale: 1, rotation: 0 }, { scale: 1.016, rotation: 0.8, duration: 3.6, yoyo: true, repeat: 17, ease: 'sine.inOut' }, at(49));
  const eyes = sg.querySelector('#eyes'); gsap.set(eyes, { svgOrigin: '140 117' });
  for (let t = 53; t < 110; t += 4.2 + R() * 2.4) tl.to(eyes, { scaleY: 0.08, duration: 0.07, yoyo: true, repeat: 1 }, at(t));
  [[49, -4, 0], [58, -9, 0], [64, 0, -3], [70, -8, 0], [78, 3, 1], [86, -2, 2], [91.7, 0, 5], [97, -8, 1], [104, -6, 1]].forEach((e) => tl.to(eyes, { x: e[1], y: e[2], duration: 0.9, ease: 'sine.inOut' }, at(e[0])));
  tl.to(sg, { rotation: 3.5, y: 6, duration: 2.6, ease: 'sine.inOut' }, at(91.5)).to(sg, { rotation: 0.5, y: 0, duration: 4, ease: 'sine.inOut' }, at(97));  // head drops when he cannot finish
  // table, lamp, his hands
  box(bnear, { left: -600, top: 500, width: W + 1200, height: 400, background: 'linear-gradient(#4a2f1b,#1a0f08 55%,#0e0804)' });
  box(bnear, { left: -600, top: 499, width: W + 1200, height: 3, background: 'rgba(255,195,125,0.55)' });
  glow(bnear, { x: 790, y: 470, r: 420, color: 'rgba(255,175,80,0.8)', op: 0.9, T: at(49), D: 65 });
  lamp(bnear, { x: 790, y: 452, s: 1.5, T: at(49), D: 65 });
  const hnd = (x, flip) => svgs(bnear, { left: x, top: 470, width: 190, height: 110, transform: `scaleX(${flip})` }, '0 0 190 110', `<path d="M-30 70 L40 40 L60 100 L-30 110Z" fill="#150e0b"/><g fill="#9a6644"><rect x="44" y="34" width="110" height="36" rx="16"/><rect x="40" y="56" width="120" height="22" rx="11"/><path d="M60 70 Q110 82 150 70 L148 92 Q100 100 62 92Z"/><rect x="132" y="30" width="46" height="14" rx="7" transform="rotate(14 132 37)"/></g><path d="M48 38 Q100 28 150 40" stroke="rgba(255,215,160,0.7)" stroke-width="3" fill="none"/>`);
  const h1 = hnd(585, 1), h2 = hnd(865, -1);
  tl.to([h1, h2], { y: -1.6, duration: 3.2, yoyo: true, repeat: 19, ease: 'sine.inOut' }, at(49));
  for (let t = 76; t < 93; t += 0.07) { const k = Math.min(1, (t - 76) / 8) * (t > 91.5 ? Math.max(0, 1 - (t - 91.5) * 1.2) : 1); tl.set([h1, h2], { x: (R() - 0.5) * 2.4 * k, rotation: (R() - 0.5) * 0.9 * k }, at(t)); }
  mist(bfar, { y: 120, h: 300, op: 0.1, color: 'rgba(255,200,140,0.5)', n: 2, T: at(49), D: 65, seed: 3 });
  motes(bnear, { x0: 500, x1: 1100, y0: 120, y1: 480, n: 26, color: 'rgba(255,215,150,0.9)', T: at(49), D: 65, size: 2.4, seed: 61 });
  motes(bnear, { x0: 60, x1: 500, y0: 100, y1: 440, n: 18, color: 'rgba(205,225,255,0.9)', T: at(49), D: 65, size: 2.2, seed: 71 });
  // camera: wide two-shot, slow tightening push, close-up on his face at "He could not finish", then back out for the doctor line
  tl.fromTo(wb, cam(1.0, 680, 330), { ...cam(1.1, 700, 320), duration: 36, ease: 'none' }, at(49));
  tl.to(wb, { ...cam(1.2, 700, 310), duration: 12, ease: 'none' }, at(85));
  tl.to(wb, { ...cam(1.9, 690, 255), duration: 6.5, ease: 'sine.inOut' }, at(85.5));
  tl.to(wb, { ...cam(1.98, 690, 260), duration: 6, ease: 'none' }, at(92));
  tl.to(wb, { ...cam(1.12, 560, 340), duration: 8, ease: 'sine.inOut' }, at(97));
  tl.to(wb, { ...cam(1.22, 540, 330), duration: 14, ease: 'none' }, at(105));
  tl.fromTo(wb, { rotation: 0.2 }, { rotation: -0.2, duration: 8, yoyo: true, repeat: 8, ease: 'sine.inOut' }, at(49));
  tl.fromTo(bfar, { x: 10 }, { x: -10, duration: 65, ease: 'none' }, at(49));

  // ======================= C (110-133 s): the climb out of the cutting =======================
  const wc = world(lc), C0 = 110;
  // wide sky backdrop (the camera can drift sideways without showing an edge)
  box(wc, { left: -700, top: -500, width: W + 1400, height: 500, background: '#04060d' });
  box(wc, { left: -700, top: 0, width: W + 1400, height: H, background: 'linear-gradient(#04060d 0%, #131f35 55%, #546a96 100%)' });
  sky(wc, { top: '#04060d', mid: '#131f35', bot: '#546a96', stars: 44, moon: { x: 980, y: 110, r: 14 }, T: at(C0), D: 24, seed: 8 });
  cold(wc, 980, 110, 330, 0.5, at(C0), 24);
  ridge(wc, { y: 90, h: 140, color: '#0b1019', seed: 6, amp: 30, trees: 20, treeH: 80, T: at(C0), D: 24, drift: -24 });
  box(wc, { left: 0, top: 0, width: W, height: H }, `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="overflow:visible"><polygon points="-900,1200 -900,690 300,650 380,600 1300,50 1900,-290 1900,1200" fill="#0b0f18"/><path d="M380 600 L1300 50 L1900 -290" stroke="rgba(150,180,225,0.42)" stroke-width="3" fill="none"/><path d="M-900 690 L300 650 L380 600" stroke="rgba(150,180,225,0.25)" stroke-width="2" fill="none"/><path d="M520 575 L1090 520 L720 445 L1130 375 L950 290 L1180 235" stroke="#2c3242" stroke-width="14" stroke-linejoin="round" fill="none"/><path d="M520 575 L1090 520 L720 445 L1130 375 L950 290 L1180 235" stroke="rgba(170,190,225,0.28)" stroke-width="2" stroke-linejoin="round" fill="none"/></svg>`);
  lightCone(wc, { x: 980, y: 120, len: 620, spread: 210, rot: 28, color: 'rgba(175,205,255,0.4)', op: 0.45, T: at(C0), D: 24 });
  mist(wc, { y: 250, h: 320, op: 0.5, color: 'rgba(150,175,210,0.55)', n: 5, T: at(C0), D: 24, seed: 11, speed: 2.4 });
  // far below: tunnel mouth + the red lamp, receding as he climbs
  const vale = box(wc, { left: 0, top: 0, width: W, height: H }); vale.style.transformOrigin = '300px 552px';
  glow(vale, { x: 290, y: 540, r: 170, color: 'rgba(130,170,240,0.55)', op: 0.6, T: at(C0), D: 24, flicker: false });
  svgs(vale, { left: 270, top: 520, width: 60, height: 34 }, '0 0 60 34', '<rect x="0" y="0" width="60" height="34" fill="#1f1816"/><path d="M8 34 V16 Q30 -4 52 16 V34Z" fill="#000"/>');
  redLamp(vale, { x: 238, y: 553, s: 0.5, T: at(C0), D: 24 });
  tl.to(vale, { scale: 0.6, opacity: 0.85, duration: 22, ease: 'sine.out' }, at(C0 + 2));
  // the climber: puppet with a lamp, zigzags up the hillside
  const pos = box(wc, { left: 0, top: 0, width: 0, height: 0 }), fl = box(pos, { left: 0, top: 0, width: 0, height: 0 });
  box(fl, { left: -110, top: -22, width: 260, height: 56, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,175,80,0.55), rgba(0,0,0,0) 70%)', mixBlendMode: 'screen' });
  const wk = puppet(fl, { x: 0, y: 0, s: 0.8, hat: 'top', coat: '#0e131f', coat2: '#070a12', rim: 'rgba(165,200,255,0.7)', lamp: 'right', T: at(C0), D: 24 });
  const Pp = [[520, 575, 0.95], [1090, 520, 0.85], [720, 445, 0.76], [1130, 375, 0.66], [950, 290, 0.58], [1180, 235, 0.5]];
  const t0 = at(C0 + 3.4);
  tl.set(pos, { x: Pp[0][0], y: Pp[0][1], scale: Pp[0][2] }, T).set(fl, { scaleX: 1 }, T);
  wk.walk(t0, 19.5, 0, 0.72, 2.5);
  wk.head(-5, t0 + 6, 2.5); wk.head(4, t0 + 12, 2.5);
  let t = t0, dir = 1;
  for (let i = 1; i < Pp.length; i++) {
    const d = Math.hypot(Pp[i][0] - Pp[i - 1][0], Pp[i][1] - Pp[i - 1][1]) / 100, nd = Pp[i][0] > Pp[i - 1][0] ? 1 : -1;
    if (nd !== dir) { tl.set(fl, { scaleX: nd }, t); dir = nd; }
    tl.to(pos, { x: Pp[i][0], y: Pp[i][1], scale: Pp[i][2], duration: d, ease: 'none' }, t);
    t += d;
  }
  mist(wc, { y: 330, h: 260, op: 0.28, color: 'rgba(150,175,210,0.5)', n: 3, T: at(C0), D: 24, seed: 31, speed: 3 });
  motes(wc, { x0: 400, x1: 1250, y0: 150, y1: 600, n: 24, color: 'rgba(215,230,255,0.9)', T: at(C0), D: 24, size: 2.4, seed: 91 });
  tl.fromTo(wc, cam(1.02, 640, 405), { ...cam(1.3, 900, 335), duration: 23, ease: 'sine.inOut' }, at(C0));
  tl.fromTo(wc, { rotation: -0.2 }, { rotation: 0.2, duration: 8, yoyo: true, repeat: 3, ease: 'sine.inOut' }, at(C0));
})();
