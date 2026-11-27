// ================= SCENE 5 : what a bank run is + Northern Rock (40.7 - 57.4) =================
(function () {
  const c = S('s5'), T = 40.7, D = 16.7;
  box(c, { left: 0, top: 0, width: W, height: H, background: 'linear-gradient(#2a1a5e, #c8102e)' });
  sunburst(c, '#ff3b5c', '#8e1a3a', T, D, 1900, -420, 0.4);
  dots(c, '#ffd23f', 40, 0.12);
  const card = box(c, { left: 36, top: 168, width: 648, height: 530, background: '#ffffff', border: '7px solid #1b1f5e', borderRadius: 34, boxShadow: '0 12px 0 rgba(0,0,0,.3)', overflow: 'hidden' });
  tl.fromTo(card, { y: -600 }, { y: 0, duration: 0.5, ease: 'back.out(1.4)' }, T);
  // ---------- part A : gauge (40.7 - 47.5)
  const A = box(card, { left: 0, top: 0, width: 648, height: 530 });
  const arc = (a0, a1, col) => { const f = (a) => [200 + 150 * Math.cos(a * Math.PI / 180), 200 + 150 * Math.sin(a * Math.PI / 180)]; const p0 = f(a0), p1 = f(a1); return `<path d="M${p0[0]} ${p0[1]} A150 150 0 0 1 ${p1[0]} ${p1[1]}" fill="none" stroke="${col}" stroke-width="46" stroke-linecap="butt"/>`; };
  const g = box(A, { left: 64, top: 30, width: 520, height: 312 });
  g.innerHTML = `<svg viewBox="0 0 400 240" width="100%" height="100%" style="overflow:visible"><path d="M32 200 A168 168 0 0 1 368 200" fill="none" stroke="#1b1f5e" stroke-width="64"/>${arc(180, 240, '#2ecc71')}${arc(240, 300, '#ffd23f')}${arc(300, 360, '#ff3b5c')}<g class="nd"><path d="M192 200 L200 52 L208 200Z" fill="#1b1f5e"/><circle cx="200" cy="200" r="16" fill="#1b1f5e"/><circle cx="200" cy="200" r="6" fill="#ffd23f"/></g></svg>`;
  const nd = g.querySelector('.nd');
  gsap.set(nd, { svgOrigin: '200 200', rotation: -88 });
  tl.fromTo(g, { scale: 0, opacity: 0, transformOrigin: '50% 80%' }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }, T + 0.3);
  tl.to(nd, { rotation: -20, duration: 2.0, ease: 'power2.inOut' }, T + 0.9);
  tl.to(nd, { rotation: 30, duration: 1.8, ease: 'power2.in' }, T + 3.0);
  tl.to(nd, { rotation: 86, duration: 1.0, ease: 'elastic.out(1, 0.35)' }, T + 4.8);
  tl.fromTo(nd, { x: 0 }, { x: 3, duration: 0.05, repeat: 60, yoyo: true }, T + 1.5);
  const pct = box(A, { left: 0, top: 318, width: 648, fontFamily: 'Archivo Black', fontSize: 84, textAlign: 'center', color: '#c8102e', WebkitTextStroke: '3px #1b1f5e', paintOrder: 'stroke fill' }, '0%');
  const pv = { v: 0 };
  tl.to(pv, { v: 100, duration: 5.4, ease: 'power1.in', onUpdate: () => { pct.textContent = Math.round(pv.v) + '%'; } }, T + 0.9);
  const cyc = tagbox(A, 'PANIC  =  THE CRISIS', { left: 60, top: 440, width: 528, fontSize: 42, lineHeight: '64px' }, '#ff3b5c', 45.3, 0, -2);
  tl.set(A, { opacity: 1 }, 0); hide(A, 47.4, 0.15);
  // ---------- part B : Northern Rock timeline (47.5 - 57.4)
  const B = box(card, { left: 0, top: 0, width: 648, height: 530, opacity: 0 });
  tl.set(B, { opacity: 1 }, 47.5);
  dots(B, '#3b82f6', 30, 0.1);
  const nrb = box(B, { left: 44, top: 28, width: 190, height: 160 }, ICON.bank());
  pop(nrb, 47.6, { rot0: -25 });
  const nrt = tagbox(B, 'NORTHERN ROCK', { left: 240, top: 62, width: 380, fontSize: 31, lineHeight: '58px' }, '#1b1f5e', 47.8, 0, 2);
  const ex = box(B, { left: 100, top: 60, width: 90, height: 90, zIndex: 5 }, ICON.x()); // flashes at nationalised
  tl.set(ex, { opacity: 0 }, 0);
  // 4 days
  const days = [];
  for (let k = 0; k < 4; k++) {
    const d = box(B, { left: 30 + k * 150, top: 215, width: 130, height: 143 }, ICON.cal(k + 1));
    pop(d, 49.5 + k * 0.45, { rot0: 12 });
    days.push(d);
  }
  const d4 = tagbox(B, '4 DAYS OF QUEUES', { left: 60, top: 372, width: 528, fontSize: 40, lineHeight: '58px' }, '#ff8a3d', 51.2, 0, -2);
  // guarantee
  const sh = box(B, { left: 232, top: 195, width: 180, height: 216, zIndex: 8 }, ICON.shield());
  const gt = tagbox(B, 'GOVERNMENT GUARANTEE', { left: 24, top: 420, width: 600, fontSize: 34, lineHeight: '56px' }, '#19c3b1', 52.2, 0, 2);
  [days, [d4]].forEach((arr) => arr.forEach((e) => hide(e, 51.9, 0.2)));
  tl.set(sh, { opacity: 0 }, 0);
  pop(sh, 52.2, { rot0: -15 });
  tl.fromTo(sh, { y: 0 }, { y: -12, duration: 0.35, repeat: 5, yoyo: true, ease: 'sine.inOut' }, 52.8);
  hide(sh, 54.6, 0.2); hide(gt, 54.6, 0.2);
  // five months
  const mo = box(B, { left: 14, top: 215, width: 620, height: 130, display: 'flex', gap: '10px', justifyContent: 'center' });
  for (let k = 0; k < 5; k++) {
    const m = box(mo, { position: 'relative', width: 118, height: 130 }, ICON.cal('M' + (k + 1), '#fff'));
    m.style.position = 'relative'; m.style.left = '0';
    pop(m, 54.7 + k * 0.28, { rot0: -12 });
  }
  const nat = box(B, { left: 40, top: 300, width: 568, height: 120, background: '#ff3b5c', color: '#fff', fontFamily: 'Archivo Black', fontSize: 56, textAlign: 'center', lineHeight: '104px', border: '8px solid #fff', outline: '6px solid #c8102e', borderRadius: 18, letterSpacing: 2, zIndex: 9, opacity: 0 }, 'NATIONALISED');
  slam(nat, 55.5, -8);
  shake(card, 55.5, 0.5, 5);
  const fm = tagbox(B, '5 MONTHS LATER', { left: 150, top: 450, width: 350, fontSize: 36, lineHeight: '54px' }, '#8e5cff', 54.8, 0, 2);
  // ---------- the crowd at the bottom: panics, then calms down at the guarantee
  const rr = mulberry32(404);
  const crowd = [];
  [{ g: 930, s: 0.5, n: 12, sp: 58 }, { g: 1030, s: 0.62, n: 8, sp: 88 }].forEach((row, ri) => {
    for (let i = 0; i < row.n; i++) {
      const fx = 4 + i * row.sp + rr() * 10;
      const P = person(c, crowdOpts(rr), fx - 150 / 2 * (1 - row.s), row.g, row.s, rr() < 0.2);
      const st = T + 0.4 + (i * 0.35 + ri * 0.2);
      tl.fromTo(P.d, { y: 300, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'back.out(1.8)' }, st);
      mood(P, st, 'panic');
      bob(P, st, 6.0, 8, 0.12 + rr() * 0.08);
      tl.fromTo(P.aL, { rotation: -150 }, { rotation: -100, duration: 0.14, repeat: 40, yoyo: true }, st);
      tl.fromTo(P.aR, { rotation: 150 }, { rotation: 100, duration: 0.17, repeat: 34, yoyo: true }, st);
      talk(P, st, 5.5, i + 40);
      // calm at the government guarantee
      tl.to([P.aL, P.aR], { rotation: 0, duration: 0.3 }, 47.4);
      tl.to(P.bd, { y: 0, duration: 0.3 }, 47.4);
      mood(P, 47.5, 'sad');
      bob(P, 47.6, 4, 2, 0.8);
      mood(P, 52.3, 'happy');
      tl.fromTo(P.aL, { rotation: 0 }, { rotation: -160, duration: 0.25, repeat: 13, yoyo: true }, 52.5 + rr() * 0.3);
      bob(P, 52.6, 4.5, 14, 0.2);
      crowd.push(P);
    }
  });
  // "!" and "?" bursts
  for (let k = 0; k < 6; k++) {
    const e = box(c, { left: 60 + k * 110, top: 760 + (k % 2) * 40, width: 60, height: 80, zIndex: 20 }, ICON.q([C.yel, C.org, C.pink][k % 3]));
    pop(e, 41.6 + k * 0.5);
    tl.fromTo(e, { y: 0 }, { y: -16, duration: 0.2, repeat: 7, yoyo: true }, 42 + k * 0.5);
    hide(e, 46.6 + k * 0.1);
  }
  coinsBurst(c, 360, 880, 55.5, 16, 12, 56, 420);
})();
