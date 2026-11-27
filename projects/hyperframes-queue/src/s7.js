// ================= SCENE 7 : Alfie learns, the three rules (66.2 - 78.8) =================
(function () {
  const c = S('s7'), T = 66.2, D = 12.6;
  box(c, { left: 0, top: 0, width: W, height: H, background: 'linear-gradient(#a8e6ff, #ffe0f0 70%)' });
  sunburst(c, '#ffffff', '#ffd6ec', T, D, 1900, -420, 0.5);
  cloudDrift(c, T, D, 3, 17);
  box(c, { left: 0, top: 960, width: W, height: 400, background: '#5fd068' });
  box(c, { left: 0, top: 960, width: W, height: 12, background: '#1b1f5e' });
  for (let i = 0; i < 8; i++) { const f = box(c, { left: 30 + i * 95, top: 1000 + (i % 3) * 18, width: 26, height: 26, borderRadius: '50%', background: [C.pink, C.yel, '#fff'][i % 3], border: '4px solid #1b1f5e' }); }
  const alf = person(c, CAST.alfie, 60, 1050, 1.15);
  const viv = person(c, CAST.vivi, 450, 1050, 1.15, true);
  tl.fromTo(alf.d, { x: -300 }, { x: 0, duration: 0.5, ease: 'back.out(1.4)' }, T);
  tl.fromTo(viv.d, { x: 300 }, { x: 0, duration: 0.5, ease: 'back.out(1.4)' }, T);
  // --- part A : sad Alfie, rain cloud, pig, lightbulb, price tag
  mood(alf, T + 0.1, 'sad');
  tl.to(alf.hd, { rotation: 10, y: 4, duration: 0.5 }, T + 0.3);
  talk(alf, 66.201, 1.649, 31); talk(viv, 68.19, 3.532, 32);
  mood(viv, 68.1, 'happy');
  const rain = box(c, { left: 40, top: 560, width: 260, height: 140, zIndex: 8 }, ICON.cloud('#9aa3c7'));
  pop(rain, T + 0.4);
  tl.fromTo(rain, { x: 0 }, { x: 10, duration: 0.6, repeat: 3, yoyo: true, ease: 'sine.inOut' }, T + 1);
  for (let k = 0; k < 9; k++) {
    const dr = box(c, { left: 80 + k * 24, top: 690, width: 8, height: 26, borderRadius: 4, background: '#3b82f6', zIndex: 7, opacity: 0 });
    tl.fromTo(dr, { y: 0, opacity: 1 }, { y: 200, opacity: 0.2, duration: 0.5, ease: 'none', repeat: 3, delay: 0 }, T + 0.6 + k * 0.07);
    tl.set(dr, { opacity: 0 }, 68.2);
  }
  hide(rain, 68.2, 0.25);
  const sun = box(c, { left: 90, top: 570, width: 140, height: 140, borderRadius: '50%', background: '#ffd23f', border: '6px solid #1b1f5e', zIndex: 8 });
  pop(sun, 68.4); hide(sun, 71.8, 0.2);
  tl.to(alf.hd, { rotation: 0, y: 0, duration: 0.4 }, 68.5);
  mood(alf, 68.5, 'normal');
  const pig = box(c, { left: 200, top: 210, width: 320, height: 266 }, ICON.pig());
  pop(pig, T + 0.5, { rot0: -20 });
  tl.fromTo(pig, { y: 0 }, { y: -14, duration: 0.3, repeat: 7, yoyo: true, ease: 'sine.inOut' }, T + 1);
  const pt = box(c, { left: 420, top: 190, width: 130, height: 130, zIndex: 6 }, ICON.tick());
  pop(pt, T + 1.2);
  const nn = bubble(c, 'STILL THERE!', 360, 200, T + 1.4, 0.9, 'grn', 38);
  hide(pig, 68.15, 0.2); hide(pt, 68.15, 0.2);
  const bulbBg = box(c, { left: 120, top: 150, width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(#fff6a8, rgba(255,246,168,0) 65%)' });
  pop(bulbBg, 68.3, { d: 0.5 });
  const bulb = box(c, { left: 250, top: 190, width: 220, height: 286 }, ICON.bulb());
  pop(bulb, 68.3, { rot0: 30 });
  tl.fromTo(bulb, { rotation: 0 }, { rotation: 6, duration: 0.2, repeat: 7, yoyo: true }, 68.9);
  bubble(c, 'NOT FOR NOTHING!', 520, 600, 68.4, 1.8, 'yel', 36);
  [[170, 200], [520, 200], [140, 380], [570, 400]].forEach((s, k) => { const st = box(c, { left: s[0], top: s[1], width: 70, height: 70, zIndex: 7 }, ICON.star()); pop(st, 68.6 + k * 0.1, { rot0: 90 }); tl.fromTo(st, { rotation: 0 }, { rotation: 40, duration: 0.5, repeat: 5, yoyo: true }, 69); hide(st, 70.6); });
  hide(bulb, 70.2, 0.2); hide(bulbBg, 70.2, 0.2);
  // price tag swinging
  const tag = box(c, { left: 150, top: 170, width: 420, height: 400, zIndex: 9 });
  tag.innerHTML = `<svg viewBox="0 0 420 400" width="100%" height="100%"><path d="M210 0 V70" stroke="#1b1f5e" stroke-width="8"/><path d="M60 140 L160 80 H360 Q390 80 390 110 V340 Q390 370 360 370 H160 Q150 370 140 362 L40 280 Q20 262 40 244Z" fill="#ff3b5c" stroke="#1b1f5e" stroke-width="8" stroke-linejoin="round" transform="translate(0,0)"/><circle cx="120" cy="226" r="20" fill="#fff" stroke="#1b1f5e" stroke-width="7"/><text x="270" y="190" text-anchor="middle" font-family="Archivo Black, Poppins" font-size="62" fill="#fff" stroke="#1b1f5e" stroke-width="8" paint-order="stroke">PANIC</text><text x="270" y="280" text-anchor="middle" font-family="Archivo Black, Poppins" font-size="62" fill="#ffd23f" stroke="#1b1f5e" stroke-width="8" paint-order="stroke">£££</text><text x="270" y="340" text-anchor="middle" font-family="Archivo Black, Poppins" font-size="30" fill="#fff" stroke="#1b1f5e" stroke-width="6" paint-order="stroke">EXPENSIVE!</text></svg>`;
  tl.fromTo(tag, { y: -500, rotation: 0, transformOrigin: '50% 0%', opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'bounce.out' }, 70.2);
  tl.fromTo(tag, { rotation: -14 }, { rotation: 14, duration: 0.45, repeat: 3, yoyo: true, ease: 'sine.inOut', transformOrigin: '50% 0%' }, 70.7);
  hide(tag, 71.75, 0.2);
  // --- part B : the three rules (71.9 - 78.8)
  const cards = [
    { t: 72.0, txt: 'KNOW WHERE YOUR MONEY LIVES', col: '#ff8a3d', ic: 'house' },
    { t: 74.2, txt: 'STAY CALM', col: '#19c3b1', ic: 'breath' },
    { t: 75.5, txt: 'CHECK WHAT IS PROTECTED', col: '#8e5cff', ic: 'shield' },
  ];
  cards.forEach((cd, k) => {
    const y = 180 + k * 195;
    const e = box(c, { left: 40, top: y, width: 640, height: 170, background: cd.col, border: '7px solid #1b1f5e', borderRadius: 30, boxShadow: '0 10px 0 rgba(27,31,94,.3)', zIndex: 10 });
    const ic = box(e, { left: 16, top: 14, width: 120, height: 130, background: '#fff', borderRadius: 22, border: '5px solid #1b1f5e', display: 'flex', alignItems: 'center', justifyContent: 'center' });
    if (cd.ic === 'house') ic.innerHTML = `<div style="width:90px;height:90px">${ICON.house('#ffd23f')}</div>`;
    if (cd.ic === 'shield') ic.innerHTML = `<div style="width:84px;height:100px">${ICON.shield()}</div>`;
    if (cd.ic === 'breath') { ic.innerHTML = `<div class="br" style="width:84px;height:84px;border-radius:50%;background:radial-gradient(#fff,#8fe8de);border:5px solid #1b1f5e"></div>`; tl.fromTo(ic.firstChild, { scale: 0.6 }, { scale: 1.15, duration: 1.1, repeat: 3, yoyo: true, ease: 'sine.inOut' }, cd.t + 0.4); }
    const n = box(e, { left: 150, top: 14, width: 470, height: 140, color: '#fff', fontFamily: 'Archivo Black', fontSize: cd.txt.length > 20 ? 38 : 56, lineHeight: cd.txt.length > 20 ? '44px' : '60px', display: 'flex', alignItems: 'center', WebkitTextStroke: '6px #1b1f5e', paintOrder: 'stroke fill' }, cd.txt);
    const tk = box(e, { left: 560, top: -26, width: 76, height: 76, zIndex: 3 }, ICON.tick());
    tl.fromTo(e, { x: 800, opacity: 0, rotation: 6 }, { x: 0, opacity: 1, rotation: 0, duration: 0.5, ease: 'back.out(1.5)' }, cd.t);
    pop(tk, cd.t + 0.55, { rot0: -90 });
    tl.set(e, { opacity: 0 }, 78.75);
  });
  const nfa = box(c, { left: 180, top: 92, width: 500, height: 72, background: '#ffd23f', border: '6px dashed #1b1f5e', borderRadius: 16, fontFamily: 'Archivo Black', fontSize: 30, textAlign: 'center', lineHeight: '60px', color: '#1b1f5e', zIndex: 12 }, 'NOT FINANCIAL ADVICE');
  slam(nfa, 77.2, 3);
  // calm breathing characters
  [alf, viv].forEach((P, k) => {
    tl.to(P.d, { scaleY: (k ? 1.15 : 1.15) * 1.04, duration: 1.1, repeat: 5, yoyo: true, ease: 'sine.inOut' }, 72);
    tl.to([P.aL, P.aR], { rotation: (i) => (i ? 25 : -25), duration: 1.1, repeat: 5, yoyo: true, ease: 'sine.inOut' }, 72);
    mood(P, 72, 'happy');
  });
  tl.fromTo(viv.hd, { rotation: -5 }, { rotation: 5, duration: 0.4, repeat: 15, yoyo: true, ease: 'sine.inOut' }, 72);
})();

// ================= SCENE 8 : tea (78.8 - 81.4) =================
(function () {
  const c = S('s8'), T = 78.8, D = 2.6;
  box(c, { left: 0, top: 0, width: W, height: H, background: 'linear-gradient(#ffd98a, #ff9e7a)' });
  sunburst(c, '#fff3c4', '#ffb347', T, D, 1900, -400, 0.5);
  dots(c, '#fff', 40, 0.18);
  box(c, { left: 0, top: 960, width: W, height: 400, background: '#b5651d' });
  box(c, { left: 0, top: 960, width: W, height: 12, background: '#1b1f5e' });
  const alf = person(c, CAST.alfie, 90, 1050, 1.2);
  const viv = person(c, CAST.vivi, 430, 1050, 1.2, true);
  tl.fromTo(alf.d, { y: 500 }, { y: 0, duration: 0.4, ease: 'back.out(1.6)' }, T - 0.05);
  tl.fromTo(viv.d, { y: 500 }, { y: 0, duration: 0.4, ease: 'back.out(1.6)' }, T + 0.05);
  mood(alf, T, 'happy'); mood(viv, T, 'happy');
  talk(alf, 78.83, 2.13, 41);
  tl.to(alf.aR, { rotation: -130, duration: 0.3 }, T + 0.3);
  tl.fromTo(viv.aL, { rotation: 0 }, { rotation: 160, duration: 0.2, repeat: 7, yoyo: true }, T + 0.4);
  const cup = box(c, { left: 215, top: 650, width: 130, height: 117, zIndex: 6 }, ICON.cup());
  pop(cup, T + 0.3, { rot0: -30 });
  for (let k = 0; k < 3; k++) {
    const st = box(c, { left: 245 + k * 24, top: 590, width: 22, height: 80, zIndex: 6, opacity: 0, borderRadius: 12, background: 'rgba(255,255,255,.8)' });
    tl.fromTo(st, { y: 20, opacity: 0, scaleY: 0.6 }, { y: -70, opacity: 0.9, scaleY: 1.2, duration: 0.7, repeat: 3, ease: 'sine.out' }, T + 0.5 + k * 0.2);
  }
  bubble(c, 'FANCY A CUP OF TEA?', 360, 470, T + 0.25, 2.2, 'yel', 44);
  confetti(c, 360, 700, T + 0.5, 50, 22);
  const end = tagbox(c, 'THE QUEUE', { left: 190, top: 190, width: 340, fontSize: 48, lineHeight: '64px' }, '#8e5cff', T + 0.6, 0, -3);
})();
