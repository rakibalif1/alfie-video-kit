// ================= SCENE 2 : living room, the news (12.5 - 18.4) =================
(function () {
  const c = S('s2'), T = 12.5, D = 5.9;
  box(c, { left: 0, top: 0, width: W, height: H, background: 'linear-gradient(#ffd98a, #ffb86b)' });
  dots(c, '#ff8a3d', 44, 0.25);
  sunburst(c, '#fff3c4', '#ffcf7a', T, D, 1900, -300, 0.35);
  box(c, { left: 0, top: 960, width: W, height: 400, background: '#b5651d' });
  box(c, { left: 0, top: 960, width: W, height: 12, background: '#1b1f5e' });
  for (let i = 0; i < 6; i++) box(c, { left: i * 130 - 20, top: 972, width: 6, height: 300, background: '#8b4513', opacity: 0.6, transform: 'skewX(-8deg)' });
  // the TV
  const tv = box(c, { left: 36, top: 150, width: 648, height: 420, background: '#1b1f5e', borderRadius: 36, boxShadow: '0 12px 0 rgba(0,0,0,.25)' });
  const scr = box(c, { left: 56, top: 170, width: 608, height: 380, borderRadius: 22, background: 'linear-gradient(#3b82f6,#19c3b1)', overflow: 'hidden' });
  dots(scr, '#fff', 22, 0.12);
  const scan = box(scr, { left: 0, top: 0, width: 608, height: 380, background: 'repeating-linear-gradient(0deg, rgba(0,0,0,.08) 0 3px, transparent 3px 7px)' });
  tl.fromTo(tv, { y: -700 }, { y: 0, duration: 0.55, ease: 'back.out(1.3)' }, T - 0.05);
  tl.fromTo(scr, { y: -700 }, { y: 0, duration: 0.55, ease: 'back.out(1.3)' }, T - 0.05);
  const live = box(scr, { left: 14, top: 12, width: 100, height: 40, background: '#ff3b5c', color: '#fff', fontFamily: 'Archivo Black', fontSize: 26, textAlign: 'center', lineHeight: '40px', borderRadius: 8 }, '• LIVE');
  tl.fromTo(live, { opacity: 1 }, { opacity: 0.25, duration: 0.3, repeat: 15, yoyo: true }, T);
  const bn = box(scr, { left: 0, top: 70, width: 608, height: 76, background: '#ff3b5c', color: '#fff', fontFamily: 'Archivo Black', fontSize: 52, textAlign: 'center', lineHeight: '76px', letterSpacing: 3, borderTop: '5px solid #fff', borderBottom: '5px solid #fff' }, 'BREAKING NEWS');
  tl.fromTo(bn, { x: 700 }, { x: 0, duration: 0.4, ease: 'power3.out' }, T + 0.3);
  tl.fromTo(bn, { backgroundColor: '#ff3b5c' }, { backgroundColor: '#c8102e', duration: 0.25, repeat: 17, yoyo: true }, T + 0.7);
  // reporter inside the TV
  const rep = person(scr, { skin: '#f2c7a0', hair: '#222', hs: 'short', top: '#fff', pants: '#222' }, 20, 330, 0.55);
  tl.fromTo(rep.d, { x: -200 }, { x: 0, duration: 0.5, ease: 'power3.out' }, T + 0.6);
  talk(rep, T + 0.9, 4.5, 4);
  const mic = box(scr, { left: 98, top: 215, width: 20, height: 56, background: '#222', borderRadius: 8, border: '3px solid #fff' });
  box(mic, { left: -6, top: -14, width: 28, height: 28, background: '#ff3b5c', borderRadius: '50%', border: '3px solid #fff' });
  tl.fromTo(mic, { opacity: 0 }, { opacity: 1, duration: 0.2 }, T + 0.9);
  const sbank = box(scr, { left: 380, top: 150, width: 180, height: 154 }, ICON.bank());
  tl.fromTo(sbank, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }, T + 1.0);
  shake(sbank, T + 1.6, 3.5, 4);
  const sx = box(scr, { left: 430, top: 160, width: 90, height: 90, zIndex: 3 }, ICON.x());
  pop(sx, T + 1.9, { rot0: 20 });
  // the news-ticker registry block fills the lower third of the screen (mounted via #tvwrap)
  // characters
  const vivi = person(c, CAST.vivi, 70, 1030, 1.1);
  tl.fromTo(vivi.d, { x: -300 }, { x: 0, duration: 0.7, ease: 'power3.out' }, T);
  walk(vivi, T, 0.7, 0.2, 30);
  talk(vivi, 12.512, 2.84, 2);
  tl.to(vivi.aR, { rotation: -150, duration: 0.25 }, T + 0.9);
  tl.fromTo(vivi.aR, { rotation: -150 }, { rotation: -115, duration: 0.2, repeat: 11, yoyo: true }, T + 1.1);
  mood(vivi, T + 0.7, 'panic');
  bubble(c, 'ALFIE!! ALFIE!!', 255, 690, T + 0.5, 1.0, 'yel', 40);
  bubble(c, 'BANK IN TROUBLE!', 270, 690, T + 1.6, 1.3, 'red', 38);
  const alfie = person(c, CAST.alfie, 440, 1030, 1.1, true);
  bob(alfie, T, 3.2, 3, 0.5);
  mood(alfie, T, 'normal');
  const cup = box(c, { left: 440, top: 800, width: 66, height: 60, zIndex: 6 }, ICON.cup());
  tl.fromTo(cup, { rotation: 0, y: 0, opacity: 1 }, { y: 0, duration: 0.01 }, T);
  tl.fromTo(alfie.aL, { rotation: 0 }, { rotation: 110, duration: 0.3 }, T + 0.2);
  // alfie hears the news at 15.69
  const A0 = 15.691;
  tl.to(alfie.d, { y: -90, duration: 0.18, ease: 'power2.out' }, A0 - 0.1);
  tl.to(alfie.d, { y: 0, duration: 0.25, ease: 'bounce.out' }, A0 + 0.08);
  mood(alfie, A0 - 0.1, 'panic');
  talk(alfie, A0, 2.3, 5);
  tl.to(alfie.aL, { rotation: 20, duration: 0.2 }, A0 - 0.1);
  tl.to(cup, { y: -420, x: 80, rotation: 540, duration: 0.5, ease: 'power2.out' }, A0 - 0.1);
  tl.to(cup, { y: 260, opacity: 0, duration: 0.5, ease: 'power2.in' }, A0 + 0.4);
  for (let i = 0; i < 6; i++) {
    const d = box(c, { left: 470 + i * 14, top: 760, width: 16, height: 16, background: '#c98a52', borderRadius: '50%', zIndex: 6, opacity: 0 });
    tl.fromTo(d, { x: 0, y: 0, opacity: 1 }, { x: (i - 2.5) * 50, y: -260 - i * 12, duration: 0.45, ease: 'power2.out' }, A0 - 0.05);
    tl.to(d, { y: 200, opacity: 0, duration: 0.5, ease: 'power2.in' }, A0 + 0.4);
  }
  bubble(c, 'MY SAVINGS!!', 500, 700, A0 + 0.1, 1.4, 'red', 40);
  bubble(c, 'EVERYTHING!', 500, 700, A0 + 1.5, 0.95, 'red', 40);
  const pig = box(c, { left: 560, top: 575, width: 120, height: 100, zIndex: 8 }, ICON.pig());
  pop(pig, A0 + 0.4);
  shake(pig, A0 + 0.8, 1.6, 6);
  const sp = box(c, { left: 575, top: 590, width: 70, height: 70, zIndex: 9 }, ICON.q());
  pop(sp, A0 + 1.6);
  hide(sp, 18.2, 0.15); hide(pig, 18.2, 0.15);
})();

// ================= SCENE 3 : the dash to the bank (18.4 - 23.5) =================
(function () {
  const c = S('s3'), T = 18.4, D = 5.1;
  box(c, { left: 0, top: 0, width: W, height: H, background: 'linear-gradient(#ff8a3d, #ffd23f 60%, #ffe9b8)' });
  sunburst(c, '#fff3c4', '#ffb347', T, D, 1900, -400, 0.4);
  // parallax buildings
  const mkCity = (y, hmin, hmax, cols, spd, seed, op) => {
    const g = box(c, { left: 0, top: 0, width: 2200, height: 1000, opacity: op });
    const r = mulberry32(seed); let x = 0;
    while (x < 2200) { const w = 90 + r() * 90, h = hmin + r() * (hmax - hmin); const b = box(g, { left: x, top: y - h, width: w, height: h + 400, background: pick(cols, r), border: '4px solid #1b1f5e', borderRadius: '10px 10px 0 0' }); for (let k = 0; k < 6; k++) box(b, { left: 12 + (k % 2) * 36, top: 18 + Math.floor(k / 2) * 40, width: 20, height: 20, background: '#fff6c8', opacity: .8 }); x += w + 10; }
    tl.fromTo(g, { x: 0 }, { x: -spd * D, duration: D, ease: 'none' }, T);
  };
  mkCity(740, 160, 420, ['#7b68ee', '#8e5cff', '#6a5acd'], 120, 3, 1);
  mkCity(820, 120, 300, ['#ff6fb5', '#ff3b5c', '#ff8a3d', '#19c3b1'], 300, 8, 1);
  box(c, { left: 0, top: 880, width: W, height: 500, background: '#4a4f6e' });
  box(c, { left: 0, top: 880, width: W, height: 14, background: '#1b1f5e' });
  const dash = box(c, { left: 0, top: 1130, width: 2000, height: 16 });
  for (let i = 0; i < 14; i++) box(dash, { left: i * 140, top: 0, width: 80, height: 14, background: '#ffd23f', borderRadius: 7 });
  tl.fromTo(dash, { x: 0 }, { x: -560, duration: 0.5, ease: 'none', repeat: 9 }, T);
  speedLines(c, T, D, 16, 5);
  // far bank grows on the right
  const fb = box(c, { left: 480, top: 640, width: 340, height: 290, zIndex: 3 }, ICON.bank());
  tl.fromTo(fb, { scale: 0.4, x: 260, transformOrigin: '0% 100%' }, { scale: 1, x: 0, duration: D, ease: 'power1.in' }, T);
  // runners
  const vivi = person(c, CAST.vivi, 150, 1090, 1.15);
  const alfie = person(c, CAST.alfie, 360, 1090, 1.15);
  gsap.set(alfie.d, { zIndex: 5 });
  [vivi, alfie].forEach((P, k) => {
    walk(P, T, D, 0.2, 38);
    tl.fromTo(P.d, { x: -260 }, { x: 0, duration: 0.6, ease: 'power3.out' }, T);
    tl.fromTo(P.d, { rotation: 0 }, { rotation: 7, duration: 0.2 }, T);
    mood(P, T, 'panic');
  });
  tl.fromTo(alfie.d, { x: 0 }, { x: 0, duration: 0.01 }, T + 1);
  talk(vivi, 18.355, 2.3, 8);
  talk(alfie, 21.0, 2.2, 9);
  bubble(c, 'GET IN THE QUEUE!', 360, 740, T + 0.2, 2.1, 'yel', 40);
  bubble(c, 'ALL MY MONEY!', 420, 720, 21.0, 2.3, 'red', 42);
  // banknotes + coins fly out of Alfie's pockets
  const r = mulberry32(31);
  for (let i = 0; i < 12; i++) {
    const isNote = i % 3 === 0;
    const e = box(c, { left: 360, top: 880, width: isNote ? 100 : 54, height: isNote ? 50 : 54, opacity: 0, zIndex: 4 }, isNote ? ICON.note('£', '#2ecc71') : ICON.coin());
    const st = 21.0 + i * 0.16;
    tl.fromTo(e, { x: 0, y: 0, opacity: 1, rotation: 0 }, { x: -300 - r() * 200, y: -120 - r() * 200, rotation: r() * 720 - 360, duration: 0.5, ease: 'power2.out' }, st);
    tl.to(e, { y: '+=' + (260 + r() * 100), x: '-=' + (200 + r() * 160), opacity: 0, duration: 0.6, ease: 'power1.in' }, st + 0.5);
  }
})();
