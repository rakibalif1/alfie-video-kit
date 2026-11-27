// ================= SCENE 1 : the queue outside the bank (0 - 12.5) =================
(function () {
  const c = S('s1'), T = 0, D = 12.5;
  box(c, { left: 0, top: 0, width: W, height: H, background: 'linear-gradient(#4cc3ff 0%, #bfeaff 55%, #ffe9b8 100%)' });
  sunburst(c, '#ffffff', '#ffe27a', T, D, 1900, -380, 0.35);
  const sun = box(c, { left: 520, top: 150, width: 130, height: 130, borderRadius: '50%', background: '#ffd23f', border: '6px solid #1b1f5e' });
  tl.fromTo(sun, { y: 0 }, { y: -18, duration: 1.2, repeat: 9, yoyo: true, ease: 'sine.inOut' }, T);
  cloudDrift(c, T, D, 4, 21);
  box(c, { left: 0, top: 690, width: W, height: 600, background: '#cfd8e3' });
  box(c, { left: 0, top: 690, width: W, height: 14, background: '#1b1f5e' });
  box(c, { left: 0, top: 1090, width: W, height: 200, background: '#4a4f6e' });
  for (let i = 0; i < 6; i++) box(c, { left: i * 140 + 10, top: 1170, width: 80, height: 14, background: '#ffd23f', borderRadius: 7 });
  const bank = box(c, { left: 70, top: 215, width: 580, height: 490 }, ICON.bank());
  const sign = box(c, { left: 175, top: 395, width: 370, height: 56, background: '#1b1f5e', borderRadius: 8, color: '#ffd23f', fontSize: 34, fontFamily: 'Archivo Black', textAlign: 'center', lineHeight: '56px', border: '4px solid #ffd23f', letterSpacing: 4 }, 'THE BANK');
  [bank, sign].forEach((e) => tl.fromTo(e, { y: 420, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'back.out(1.4)' }, T + 0.1));
  const date = box(c, { left: 60, top: 168, width: 600, height: 88, background: '#ff3b5c', color: '#fff', fontSize: 52, fontFamily: 'Archivo Black', textAlign: 'center', lineHeight: '78px', border: '6px solid #1b1f5e', borderRadius: 14, letterSpacing: 3, zIndex: 40, opacity: 0 }, 'SEPTEMBER 2007');
  slam(date, 0.4, -4);
  tl.to(date, { opacity: 0, y: -30, duration: 0.25 }, 5.2);
  const rows = [{ g: 900, s: 0.5, n: 14, sp: 50 }, { g: 975, s: 0.62, n: 11, sp: 64 }, { g: 1060, s: 0.76, n: 9, sp: 82 }];
  const rr = mulberry32(77);
  rows.forEach((row, ri) => {
    for (let i = 0; i < row.n; i++) {
      const fx = 6 + i * row.sp + (rr() * 10);
      const arrive = fx - 150 / 2 * (1 - row.s);
      const P = person(c, crowdOpts(rr), arrive, row.g, row.s, rr() < 0.15);
      const dly = 0.5 + (row.n - i) * 0.18 + ri * 0.25;
      tl.fromTo(P.d, { x: -(arrive + 220) }, { x: 0, duration: 1.4 + i * 0.05, ease: 'power2.out' }, dly);
      walk(P, dly, 1.4 + i * 0.05, 0.26, 24);
      bob(P, dly + 2.2, 9, 3 + rr() * 3, 0.45 + rr() * 0.3);
      sway(P, dly + 2.2, 9, 4, 0.8);
    }
  });
  const q = tagbox(c, 'THE QUEUE', { left: 30, top: 600, width: 330, fontSize: 46, lineHeight: '62px' }, '#8e5cff', 2.4, 3.4, -3); q.style.zIndex = 30;
  const th = tagbox(c, 'THOUSANDS', { left: 390, top: 640, width: 300, fontSize: 40, lineHeight: '54px' }, '#ff8a3d', 3.3, 2.6, 4); th.style.zIndex = 31;
  const rob = box(c, { left: 232, top: 480, width: 256, height: 256, zIndex: 35 });
  rob.innerHTML = `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="100" r="96" fill="#fff" stroke="#1b1f5e" stroke-width="8"/><circle cx="100" cy="104" r="48" fill="#f2c7a0" stroke="#1b1f5e" stroke-width="5"/><path d="M52 70 Q100 20 148 70 L148 88 Q100 66 52 88Z" fill="#222"/><rect x="52" y="82" width="96" height="28" rx="10" fill="#222"/><circle cx="80" cy="96" r="7" fill="#fff"/><circle cx="120" cy="96" r="7" fill="#fff"/><path d="M80 134 Q100 148 120 134" stroke="#1b1f5e" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="100" cy="100" r="86" fill="none" stroke="#ff3b5c" stroke-width="16"/><path d="M38 38 L162 162" stroke="#ff3b5c" stroke-width="16" stroke-linecap="round"/></svg>`;
  pop(rob, 7.2, { d: 0.45, rot0: -20 });
  tl.fromTo(rob, { y: 0 }, { y: -14, duration: 0.3, repeat: 7, yoyo: true, ease: 'sine.inOut' }, 7.7);
  hide(rob, 10.0, 0.25);
  const zero = tagbox(c, 'STOLEN: £0', { left: 130, top: 745, width: 460, fontSize: 56, lineHeight: '72px' }, '#2ecc71', 8.3, 2.0, 3); zero.style.zIndex = 36;
  const crack = box(c, { left: 250, top: 250, width: 220, height: 300, opacity: 0, zIndex: 20 }, `<svg viewBox="0 0 100 150" width="100%" height="100%"><path class="ck" d="M52 0 L38 30 L58 50 L34 84 L56 104 L40 150" fill="none" stroke="#1b1f5e" stroke-width="5" stroke-linejoin="round" stroke-dasharray="320" stroke-dashoffset="320"/></svg>`);
  tl.set(crack, { opacity: 1 }, 10.4);
  tl.to(crack.querySelector('.ck'), { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, 10.4);
  shake(bank, 10.4, 1.4, 5);
  [[110, 120, 100], [540, 300, 130], [330, 140, 90], [470, 140, 110]].forEach((qq, k) => {
    const e = box(c, { left: qq[0], top: qq[1] + 60, width: qq[2] * 0.75, height: qq[2], zIndex: 33 }, ICON.q([C.yel, C.pink, C.org, C.grn][k]));
    pop(e, 10.5 + k * 0.18, { rot0: -30, rot: (k - 1.5) * 8 });
    tl.fromTo(e, { y: 0 }, { y: -18, duration: 0.3, repeat: 3, yoyo: true, ease: 'sine.inOut' }, 11 + k * 0.1);
  });
})();
