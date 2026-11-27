// ================= SCENE 4 : inside the bank, Ms Rubin explains (23.5 - 40.7) =================
(function () {
  const c = S('s4'), T = 23.5, D = 17.2;
  box(c, { left: 0, top: 0, width: W, height: H, background: 'linear-gradient(#fff6dc, #ffe2a6)' });
  for (let i = 0; i < 9; i++) box(c, { left: i * 90, top: 0, width: 44, height: 1000, background: 'rgba(255,138,61,.12)' });
  sunburst(c, '#fff', '#ffe6a8', T, D, 1900, -420, 0.35);
  // floor
  box(c, { left: 0, top: 1000, width: W, height: 300, background: 'repeating-conic-gradient(#ff8a3d 0% 25%, #ffd9a0 0% 50%) 0 0/90px 90px' });
  box(c, { left: 0, top: 1000, width: W, height: 12, background: '#1b1f5e' });
  // panel (infographic card)
  const card = box(c, { left: 36, top: 168, width: 648, height: 530, background: '#ffffff', border: '7px solid #1b1f5e', borderRadius: 34, boxShadow: '0 12px 0 rgba(27,31,94,.25)', overflow: 'hidden' });
  tl.fromTo(card, { y: -600 }, { y: 0, duration: 0.5, ease: 'back.out(1.4)' }, T);
  const cd = box(card, { left: 0, top: 0, width: 648, height: 530 });
  dots(cd, '#8e5cff', 30, 0.1);
  // ---- phase 1: the box with your name on it (23.5 - 27.2)
  const p1 = box(cd, { left: 0, top: 0, width: 648, height: 530 });
  const crate = box(p1, { left: 170, top: 150, width: 300, height: 230, background: '#c98a52', border: '7px solid #1b1f5e', borderRadius: 10 });
  [0, 1, 2].forEach((k) => box(crate, { left: 0, top: 30 + k * 60, width: 286, height: 8, background: '#8b5a2b' }));
  box(crate, { left: 60, top: 70, width: 170, height: 78, background: '#fff', border: '5px solid #1b1f5e', borderRadius: 8, fontFamily: 'Archivo Black', fontSize: 44, textAlign: 'center', lineHeight: '68px', color: '#1b1f5e' }, 'ALFIE');
  pop(crate, T + 0.6, { rot0: -15 });
  tl.fromTo(crate, { y: 0 }, { y: -10, duration: 0.25, repeat: 9, yoyo: true, ease: 'sine.inOut' }, T + 1.1);
  const bigx = box(p1, { left: 150, top: 120, width: 340, height: 300, zIndex: 5 }, ICON.x());
  slam(bigx, T + 1.9, 0);
  const nh = tagbox(p1, 'NOT HERE!', { left: 190, top: 400, width: 270, fontSize: 40, lineHeight: '54px' }, '#ff3b5c', T + 2.4, 0, -4);
  hide(p1, 27.15, 0.15);
  // ---- phase 2: where £100 goes (27.3 - 33.3)
  const p2 = box(cd, { left: 0, top: 0, width: 648, height: 530 });
  tl.set(p2, { opacity: 0 }, 0); tl.set(p2, { opacity: 1 }, 27.3);
  const note = box(p2, { left: 150, top: 20, width: 350, height: 175 }, ICON.note('£100'));
  tl.fromTo(note, { y: -300, rotation: -20, scale: 0.4 }, { y: 0, rotation: 0, scale: 1, duration: 0.55, ease: 'back.out(1.8)' }, 27.3);
  tl.fromTo(note, { y: 0 }, { y: -8, duration: 0.3, repeat: 5, yoyo: true, ease: 'sine.inOut' }, 28);
  const lentL = tagbox(p2, 'LENT FOR HOMES', { left: 14, top: 215, width: 400, fontSize: 32, lineHeight: '46px' }, '#ff8a3d', 29.5, 0, -2);
  const cashL = tagbox(p2, 'CASH', { left: 470, top: 215, width: 160, fontSize: 32, lineHeight: '46px' }, '#2ecc71', 31.8, 0, 3);
  // houses
  const hpos = [[30, 290], [150, 270], [270, 290], [100, 380], [220, 390]];
  hpos.forEach((h, k) => {
    const e = box(p2, { left: h[0], top: h[1], width: 110, height: 110 }, ICON.house(['#ff8a3d', '#ffd23f', '#ff6fb5', '#19c3b1', '#8e5cff'][k]));
    pop(e, 29.7 + k * 0.17, { rot0: -12 });
  });
  for (let k = 0; k < 9; k++) {
    const m = box(p2, { left: 250, top: 120, width: 60, height: 30, zIndex: 6, opacity: 0 }, ICON.note('£', '#2ecc71'));
    tl.fromTo(m, { x: 0, y: 0, opacity: 1, scale: 1 }, { x: -150 + (k % 5) * 70 - 40, y: 200 + (k % 3) * 40, scale: 0.6, rotation: 360, duration: 0.5, ease: 'power2.in' }, 29.5 + k * 0.12);
    tl.set(m, { opacity: 0 }, 29.5 + k * 0.12 + 0.5);
  }
  const safe = box(p2, { left: 490, top: 290, width: 130, height: 130 }, ICON.vault());
  pop(safe, 31.8);
  const mm = box(p2, { left: 440, top: 120, width: 60, height: 30, zIndex: 6, opacity: 0 }, ICON.note('£', '#2ecc71'));
  tl.fromTo(mm, { x: 0, y: 0, opacity: 1 }, { x: 80, y: 220, scale: 0.7, duration: 0.5, ease: 'power2.in' }, 31.8);
  tl.set(mm, { opacity: 0 }, 32.35);
  // bar 90 / 10
  const bar = box(p2, { left: 24, top: 450, width: 600, height: 56, background: '#eee', border: '5px solid #1b1f5e', borderRadius: 16, overflow: 'hidden' });
  const b90 = box(bar, { left: 0, top: 0, width: 0, height: 46, background: '#ff8a3d', color: '#fff', fontFamily: 'Archivo Black', fontSize: 30, lineHeight: '46px', textAlign: 'center', overflow: 'hidden', whiteSpace: 'nowrap' }, '90% LENT');
  const b10 = box(bar, { left: 540, top: 0, width: 0, height: 46, background: '#2ecc71', color: '#fff', fontFamily: 'Archivo Black', fontSize: 24, lineHeight: '46px', textAlign: 'center', overflow: 'hidden', whiteSpace: 'nowrap' }, '10%');
  tl.to(b90, { width: 540, duration: 0.8, ease: 'power3.out' }, 29.8);
  tl.to(b10, { width: 56, duration: 0.5, ease: 'back.out(2)' }, 32.0);
  hide(p2, 33.25, 0.12);
  // ---- phase 3: where is my money (33.4 - 35)
  const p3 = box(cd, { left: 0, top: 0, width: 648, height: 530, opacity: 0 });
  tl.set(p3, { opacity: 1 }, 33.35); tl.set(p3, { opacity: 0 }, 35.0);
  [[60, 120, 150, C.yel], [240, 60, 220, C.pink], [460, 130, 160, C.org], [330, 270, 150, C.grn], [110, 300, 130, C.pur]].forEach((q, k) => {
    const e = box(p3, { left: q[0], top: q[1], width: q[2] * 0.75, height: q[2] }, ICON.q(q[3]));
    pop(e, 33.4 + k * 0.1, { rot0: -40, rot: (k - 2) * 10 });
    tl.fromTo(e, { y: 0 }, { y: -20, duration: 0.2, repeat: 3, yoyo: true, ease: 'sine.inOut' }, 33.8 + k * 0.05);
  });
  // ---- phase 4: thousands of mortgages (35 - 40.7)
  const p4 = box(cd, { left: 0, top: 0, width: 648, height: 530, opacity: 0 });
  tl.set(p4, { opacity: 1 }, 35.0);
  const mort = tagbox(p4, 'THOUSANDS OF MORTGAGES', { left: 24, top: 14, width: 600, fontSize: 31, lineHeight: '48px' }, '#8e5cff', 35.05, 0, 0);
  const grid = box(p4, { left: 0, top: 0, width: 648, height: 530 });
  const hr = mulberry32(5), hc = ['#ff8a3d', '#ffd23f', '#ff6fb5', '#19c3b1', '#8e5cff', '#3b82f6'];
  for (let k = 0; k < 24; k++) {
    const gx = 14 + (k % 6) * 100, gy = 84 + Math.floor(k / 6) * 92;
    const e = box(grid, { left: gx, top: gy, width: 92, height: 92 }, ICON.house(pick(hc, hr)));
    pop(e, 35.2 + k * 0.1, { rot0: 10 });
  }
  const ev = tagbox(p4, 'EVERYONE WANTS IT BACK TODAY!', { left: 20, top: 460, width: 608, fontSize: 28, lineHeight: '48px' }, '#ff3b5c', 38.3, 0, -2);
  const alarm = box(p4, { left: 0, top: 0, width: 648, height: 530, border: '14px solid #ff3b5c', opacity: 0, borderRadius: 24, zIndex: 9 });
  tl.set(alarm, { opacity: 1 }, 38.3);
  tl.fromTo(alarm, { opacity: 1 }, { opacity: 0.1, duration: 0.2, repeat: 9, yoyo: true }, 38.3);
  const vault = box(p4, { left: 470, top: 300, width: 160, height: 160, zIndex: 8 }, ICON.vault());
  tl.fromTo(vault, { scale: 0, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }, 38.4);
  const vs = box(p4, { left: 470, top: 260, width: 160, fontFamily: 'Archivo Black', fontSize: 30, textAlign: 'center', color: '#c8102e', zIndex: 8, background: '#fff', border: '4px solid #c8102e', borderRadius: 12 }, 'CASH: £10');
  pop(vs, 38.5);
  const cnt = { v: 10 };
  tl.to(cnt, { v: 0, duration: 1.6, ease: 'none', onUpdate: () => { vs.textContent = 'CASH: £' + Math.round(cnt.v); } }, 38.8);
  shake(vault, 38.8, 1.8, 5);
  // ---- characters
  const desk = box(c, { left: 290, top: 880, width: 440, height: 420, background: '#b5651d', border: '6px solid #1b1f5e', borderRadius: '16px 0 0 0', zIndex: 10 });
  box(c, { left: 276, top: 868, width: 470, height: 26, background: '#e0a15c', border: '6px solid #1b1f5e', borderRadius: 10, zIndex: 11 });
  box(c, { left: 306, top: 940, width: 170, height: 52, background: '#ffd23f', border: '5px solid #1b1f5e', borderRadius: 10, zIndex: 11, fontFamily: 'Archivo Black', fontSize: 24, textAlign: 'center', lineHeight: '40px', color: '#1b1f5e' }, 'MS RUBIN');
  const rub = person(c, CAST.rubin, 470, 1040, 1.1, true);
  const alf = person(c, CAST.alfie, 30, 1040, 1.15);
  tl.fromTo(rub.d, { y: 400 }, { y: 0, duration: 0.5, ease: 'back.out(1.6)' }, T);
  tl.fromTo(alf.d, { x: -300 }, { x: 0, duration: 0.5, ease: 'back.out(1.4)' }, T);
  mood(alf, T, 'panic');
  bob(rub, T + 0.6, 16, 3, 0.8); sway(rub, T + 0.6, 16, 3, 0.9);
  bob(alf, T + 0.6, 16, 5, 0.25);
  // speech
  talk(rub, 23.525, 3.575, 21); talk(rub, 27.32, 5.929, 22); talk(alf, 33.369, 1.319, 23); talk(rub, 35.028, 5.477, 24);
  mood(rub, T, 'sad'); mood(rub, 27.2, 'normal');
  tl.to(rub.aR, { rotation: -140, duration: 0.3 }, 27.5);
  tl.fromTo(rub.aR, { rotation: -140 }, { rotation: -105, duration: 0.3, repeat: 15, yoyo: true, ease: 'sine.inOut' }, 27.8);
  tl.to(rub.aR, { rotation: 0, duration: 0.3 }, 33);
  tl.to(rub.aR, { rotation: -140, duration: 0.3 }, 35.2);
  tl.fromTo(rub.aR, { rotation: -140 }, { rotation: -105, duration: 0.3, repeat: 15, yoyo: true, ease: 'sine.inOut' }, 35.5);
  tl.to(rub.aR, { rotation: 0, duration: 0.3 }, 40.4);
  bubble(c, "SORRY, ALFIE", 350, 770, T + 0.2, 2.6, 'yel', 34);
  bubble(c, 'WHAT?! WHERE IS IT?!', 300, 790, 33.4, 1.5, 'red', 34);
  tl.to(alf.d, { y: -60, duration: 0.15, ease: 'power2.out' }, 33.4);
  tl.to(alf.d, { y: 0, duration: 0.3, ease: 'bounce.out' }, 33.55);
  tl.to(alf.d, { y: -50, duration: 0.15, ease: 'power2.out' }, 38.4);
  tl.to(alf.d, { y: 0, duration: 0.3, ease: 'bounce.out' }, 38.55);
  shake(alf.d, 38.8, 1.6, 4);
  const sw = box(c, { left: 120, top: 740, width: 70, height: 70, zIndex: 15 }, ICON.q());
  pop(sw, 36.5); hide(sw, 40.4);
})();
