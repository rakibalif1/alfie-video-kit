// ===== BELL: dread in the box (bell + shaking hand), the two men at the table, the climb out of the cutting =====
(function () {
  const c = S('bell'), w = win('bell'), T = w.T, D = w.D, at = (r) => T + r, R = rr(5521);
  const lay = () => box(c, { left: 0, top: 0, width: W, height: H });
  const la = lay(), lb = lay(), lc = lay();
  tl.fromTo(lb, { opacity: 0 }, { opacity: 1, duration: 3, ease: 'sine.inOut' }, at(39)).to(lb, { opacity: 0, duration: 3, ease: 'sine.inOut' }, at(64));
  tl.fromTo(lc, { opacity: 0 }, { opacity: 1, duration: 3, ease: 'sine.inOut' }, at(64));
  tl.to(la, { opacity: 0, duration: 3, ease: 'sine.inOut' }, at(39));
  const svgs = (p, css, vb, inner) => box(p, css, `<svg viewBox="${vb}" width="100%" height="100%" style="overflow:visible">${inner}</svg>`);

  // ---------- A (0-40 s): the brass bell, the shaking hand ----------
  box(la, { left: 0, top: 0, width: W, height: H, background: 'linear-gradient(90deg,#0b0706,#1b110b 70%,#26170d)' });
  let pl = ''; for (let i = 0; i < 14; i++) pl += `<rect x="${i * 96}" y="0" width="3" height="${H}" fill="#050303" opacity="0.7"/>`;
  box(la, { left: 0, top: 0, width: W, height: H }, `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${pl}<path d="M560 -10 V150 M520 -10 Q540 80 556 150" stroke="#050303" stroke-width="3" fill="none"/></svg>`);
  glow(la, { x: 1080, y: 180, r: 560, color: 'rgba(255,170,70,0.65)', op: 0.85, T, D: 42 });
  const bell = svgs(la, { left: 410, top: 120, width: 300, height: 300, transformOrigin: '50% 8%' }, '0 0 300 300', `<defs><linearGradient id="brs" x1="0" x2="1"><stop offset="0" stop-color="#3a2508"/><stop offset="0.45" stop-color="#b98a2e"/><stop offset="0.62" stop-color="#f3cf78"/><stop offset="1" stop-color="#7a5217"/></linearGradient></defs><rect x="138" y="0" width="24" height="40" fill="#0a0706"/><rect x="120" y="30" width="60" height="16" rx="6" fill="#120c07"/><path d="M45 235 Q45 80 150 58 Q255 80 255 235 L282 252 L18 252Z" fill="url(#brs)"/><path d="M20 252 H280" stroke="#2a1a06" stroke-width="6"/><path d="M80 120 Q90 90 130 76" stroke="rgba(255,240,190,0.55)" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M215 140 Q222 190 226 230" stroke="rgba(40,20,5,0.55)" stroke-width="10" fill="none"/><circle cx="150" cy="268" r="14" fill="#2a1c0a"/>`);
  const ring = (t0) => { const e = box(la, { left: 560 - 170, top: 340 - 170, width: 340, height: 340, borderRadius: '50%', border: '2px solid rgba(255,225,160,0.7)', opacity: 0 }); tl.fromTo(e, { scale: 0.45, opacity: 0.75 }, { scale: 1.9, opacity: 0, duration: 1.8, ease: 'sine.out' }, t0); };
  [15.2, 16.1, 22.4, 23.3].forEach((t, i) => { ring(at(t)); let a = 1.8; for (let k = 0; k < 14; k++, a *= 0.8) tl.to(bell, { rotation: (k % 2 ? -1 : 1) * a, duration: 0.07, ease: 'sine.inOut' }, at(t) + k * 0.07); tl.to(bell, { rotation: 0, duration: 0.1 }, at(t) + 1.0); });
  const hand = svgs(la, { left: 880, top: 400, width: 280, height: 240 }, '0 0 280 240', `<path d="M170 130 L290 250 L180 260 L110 170Z" fill="#0d0907"/><rect x="40" y="20" width="108" height="118" rx="10" fill="#2b2a31"/><rect x="40" y="20" width="14" height="118" rx="6" fill="rgba(255,190,110,0.35)"/><path d="M148 44 Q190 44 190 82 Q190 112 148 112" stroke="#2b2a31" stroke-width="14" fill="none"/><ellipse cx="94" cy="20" rx="54" ry="8" fill="#14120f"/><g fill="#6b4630"><rect x="86" y="46" width="70" height="20" rx="10"/><rect x="82" y="68" width="74" height="20" rx="10"/><rect x="86" y="90" width="70" height="20" rx="10"/><path d="M60 58 Q92 34 110 40 L110 64 Q80 70 62 96Z"/><path d="M110 100 L180 130 L150 170 L100 120Z"/></g><path d="M88 48 H152 M84 70 H152 M88 92 H152" stroke="rgba(255,200,130,0.5)" stroke-width="2"/>`);
  for (let t = 0; t < 40; t += 0.06) { const k = 1 + 2.2 * Math.min(1, t / 14); tl.set(hand, { x: (R() - 0.5) * 2 * k, y: (R() - 0.5) * 1.6 * k, rotation: (R() - 0.5) * 0.7 * k }, at(t)); }
  steam(la, { x: 985, y: 410, n: 3, T, D: 40, dx: 14, dy: -70, s: 0.5, color: 'rgba(210,205,200,0.18)' });
  for (let i = 0; i < 16; i++) { const m = box(la, { left: 200 + R() * 900, top: 150 + R() * 400, width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,220,160,0.5)', opacity: 0.2 + R() * 0.4 }); tl.to(m, { x: (R() - 0.5) * 60, y: -30 - R() * 40, duration: 8 + R() * 8, ease: 'sine.inOut' }, T); }
  tl.fromTo(la, { scale: 1 }, { scale: 1.07, duration: 42, ease: 'none', transformOrigin: '560px 300px' }, T);

  // ---------- B (40-65 s): faces at the table ----------
  box(lb, { left: 0, top: 0, width: W, height: H, background: 'linear-gradient(#0a0807,#140e0a)' });
  svgs(lb, { left: 960, top: 90, width: 160, height: 160, opacity: 0.55 }, '0 0 300 300', `<path d="M45 235 Q45 80 150 58 Q255 80 255 235 L282 252 L18 252Z" fill="#3b2a10"/><path d="M80 120 Q90 90 130 76" stroke="rgba(255,225,150,0.4)" stroke-width="6" fill="none"/>`);
  const sg = svgs(lb, { left: 540, top: 110, width: 280, height: 380, transformOrigin: '50% 90%' }, '0 0 280 380', `<defs><radialGradient id="uf" cx="0.5" cy="1.05" r="0.95"><stop offset="0" stop-color="#d89a62"/><stop offset="0.45" stop-color="#7c4d34"/><stop offset="1" stop-color="#150d0b"/></radialGradient></defs><path d="M10 380 Q20 270 100 250 L180 250 Q260 270 270 380Z" fill="#17110e" stroke="rgba(255,170,90,0.35)" stroke-width="2"/><path d="M118 230 H162 V262 H118Z" fill="#2a1a12"/><ellipse cx="140" cy="140" rx="68" ry="88" fill="url(#uf)"/><path d="M76 150 Q80 232 140 252 Q200 232 204 150 Q196 190 140 196 Q84 190 76 150Z" fill="#0d0807"/><path d="M104 214 Q140 232 176 214 Q140 224 104 214Z" fill="#c68a58" opacity="0.2"/><path d="M108 214 Q140 198 172 214" stroke="#050303" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M130 166 Q140 176 150 166" stroke="#e7b07a" stroke-width="4" fill="none" opacity="0.8"/><path d="M96 98 Q112 84 130 96 L128 108 Q112 98 98 110Z M150 96 Q168 84 184 98 L182 110 Q168 98 152 108Z" fill="#070404"/><ellipse cx="112" cy="116" rx="13" ry="7" fill="#0a0605"/><ellipse cx="168" cy="116" rx="13" ry="7" fill="#0a0605"/><g id="eyes"><ellipse cx="112" cy="117" rx="7" ry="3.6" fill="#d9c9b0"/><ellipse cx="168" cy="117" rx="7" ry="3.6" fill="#d9c9b0"/><circle cx="115" cy="116" r="2.8" fill="#080504"/><circle cx="171" cy="116" r="2.8" fill="#080504"/><circle cx="116" cy="115" r="0.9" fill="#fff"/><circle cx="172" cy="115" r="0.9" fill="#fff"/></g><path d="M72 70 Q140 10 208 70 Q200 50 140 40 Q80 50 72 70Z" fill="#0a0605"/>`);
  tl.fromTo(sg, { scale: 1 }, { scale: 1.018, duration: 4, yoyo: true, repeat: 7, ease: 'sine.inOut' }, at(39));
  box(lb, { left: 0, top: 500, width: W, height: 240, background: 'linear-gradient(#2a1a10,#0d0705 70%)' });
  glow(lb, { x: 720, y: 470, r: 360, color: 'rgba(255,170,70,0.8)', op: 0.9, T: at(39), D: 27 });
  lamp(lb, { x: 720, y: 450, s: 1.5, T: at(39), D: 27 });
  const hnd = (x, flip) => svgs(lb, { left: x, top: 490, width: 190, height: 110, transform: `scaleX(${flip})` }, '0 0 190 110', `<path d="M-30 70 L40 40 L60 100 L-30 110Z" fill="#0b0807"/><g fill="#8a5a3e"><rect x="44" y="34" width="110" height="36" rx="16"/><rect x="40" y="56" width="120" height="22" rx="11"/><path d="M60 70 Q110 82 150 70 L148 92 Q100 100 62 92Z"/><rect x="132" y="30" width="46" height="14" rx="7" transform="rotate(14 132 37)"/></g><path d="M48 38 Q100 28 150 40" stroke="rgba(255,205,140,0.6)" stroke-width="3" fill="none"/>`);
  const h1 = hnd(250, 1), h2 = hnd(440, -1);
  tl.to([h1, h2], { y: -1.5, duration: 3.2, yoyo: true, repeat: 7, ease: 'sine.inOut' }, at(40));
  mist(lb, { y: 120, h: 300, op: 0.08, color: 'rgba(255,200,140,0.5)', n: 2, T: at(39), D: 27, seed: 3 });
  tl.fromTo(lb, { scale: 1 }, { scale: 1.07, duration: 27, ease: 'none', transformOrigin: '640px 260px' }, at(39));

  // ---------- C (65-98 s): the climb out of the cutting ----------
  sky(lc, { top: '#04060d', mid: '#101a2b', bot: '#33435e', stars: 40, moon: { x: 980, y: 110, r: 13 }, T: at(64), D: 35, seed: 8 });
  ridge(lc, { y: 80, h: 140, color: '#070a12', seed: 6, amp: 30, trees: 20, treeH: 80, T: at(64), D: 35, drift: -30 });
  box(lc, { left: 0, top: 0, width: W, height: H }, `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><polygon points="-200,760 -200,690 300,650 380,600 1300,50 1300,760" fill="#07090e"/><path d="M380 600 L1300 50" stroke="rgba(130,160,205,0.2)" stroke-width="2"/><path d="M520 575 L1090 520 L720 445 L1130 375 L950 290 L1180 235" stroke="#141720" stroke-width="12" stroke-linejoin="round" fill="none"/><path d="M520 575 L1090 520 L720 445 L1130 375 L950 290 L1180 235" stroke="rgba(120,140,170,0.1)" stroke-width="2" stroke-linejoin="round" fill="none"/></svg>`);
  mist(lc, { y: 250, h: 320, op: 0.42, n: 5, T: at(64), D: 35, seed: 11, speed: 2.4 });
  // far below: tunnel mouth + the red lamp, receding as he climbs
  const vale = box(lc, { left: 0, top: 0, width: W, height: H }); vale.style.transformOrigin = '300px 552px';
  svgs(vale, { left: 270, top: 520, width: 60, height: 34 }, '0 0 60 34', '<rect x="0" y="0" width="60" height="34" fill="#16100f"/><path d="M8 34 V16 Q30 -4 52 16 V34Z" fill="#000"/>');
  redLamp(vale, { x: 238, y: 553, s: 0.4, T: at(64), D: 34 });
  tl.to(vale, { scale: 0.55, opacity: 0.8, duration: 32, ease: 'sine.out' }, at(65));
  // walker with lamp, long shadow, pools of light; zigzags up
  const pos = box(lc, { left: -40, top: -180, width: 80, height: 180, transformOrigin: '40px 180px' }), fl = box(pos, { left: 0, top: 0, width: 80, height: 180, transformOrigin: '40px 90px' });
  const pool = box(fl, { left: -60, top: 150, width: 200, height: 54, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,170,70,0.4), rgba(0,0,0,0) 70%)', mixBlendMode: 'screen' });
  svgs(fl, { left: 0, top: 0, width: 80, height: 180 }, '0 0 80 180', `<path d="M40 176 L-80 182 L-74 172 L40 168Z" fill="rgba(0,0,0,0.5)" style="filter:blur(2px)"/><g class="lb"><rect x="34" y="92" width="11" height="80" rx="5" fill="#030407" transform-origin="39 92"/></g><path d="M26 30 Q26 18 40 18 Q54 18 54 32 L58 104 L22 104Z" fill="#05070b"/><circle cx="40" cy="14" r="9" fill="#05070b"/><ellipse cx="40" cy="8" rx="16" ry="3" fill="#05070b"/><rect x="31" y="-6" width="18" height="14" fill="#05070b"/><path d="M44 40 L60 66 L68 82" stroke="#05070b" stroke-width="8" stroke-linecap="round" fill="none"/><rect x="63" y="82" width="9" height="13" rx="2" fill="#ffd27a"/><g class="lf"><rect x="34" y="92" width="11" height="80" rx="5" fill="#07090e" transform-origin="39 92"/></g>`);
  const lg = box(fl, { left: 0, top: 0, width: 80, height: 180, transformOrigin: '68px 90px' }); glow(lg, { x: 68, y: 90, r: 120, T: at(64), D: 35 });
  const lb2 = fl.querySelector('.lb rect'), lf = fl.querySelector('.lf rect');
  const P = [[520, 575, 0.95], [1090, 520, 0.85], [720, 445, 0.76], [1130, 375, 0.66], [950, 290, 0.58], [1180, 235, 0.5]];
  tl.set(pos, { x: P[0][0], y: P[0][1], scale: P[0][2] }, T).set(fl, { scaleX: 1 }, T);
  let t = at(66), dir = 1;
  for (let i = 1; i < P.length; i++) {
    const d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]) / 62, nd = P[i][0] > P[i - 1][0] ? 1 : -1, n = Math.max(1, Math.round(d / 0.7));
    if (nd !== dir) { tl.set(fl, { scaleX: nd }, t); dir = nd; }
    tl.to(pos, { x: P[i][0], y: P[i][1], scale: P[i][2], duration: d, ease: 'none' }, t);
    tl.fromTo(lf, { rotation: 20, svgOrigin: '39 92' }, { rotation: -20, svgOrigin: '39 92', duration: d / n, repeat: n - 1, yoyo: true, ease: 'sine.inOut' }, t);
    tl.fromTo(lb2, { rotation: -20, svgOrigin: '39 92' }, { rotation: 20, svgOrigin: '39 92', duration: d / n, repeat: n - 1, yoyo: true, ease: 'sine.inOut' }, t);
    t += d;
    if (i < P.length - 1) { if (nd === 1) tl.set(fl, { scaleX: -1 }, t); tl.set([lf, lb2], { rotation: 0 }, t); t += 1.5; }
  }
  tl.to([lg, pool], { scale: 0.5, opacity: 0.75, duration: 32, ease: 'sine.out' }, at(65));
  mist(lc, { y: 330, h: 260, op: 0.2, n: 3, T: at(64), D: 35, seed: 31, speed: 3 });
  tl.fromTo(lc, { scale: 1.04, y: -10 }, { scale: 1.0, y: 0, duration: 35, ease: 'none', transformOrigin: '640px 300px' }, at(64));
})();
