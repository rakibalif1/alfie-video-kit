// ===== SCENE "safety": CORRECT AS OF NOVEMBER 2026 / CHECK GOV.UK FIRST =====
(function () {
  const c = S('safety'), w = win('safety'), T = w.T, D = w.D, L = LS('safety');
  const st = (i) => L[i].start, en = (i) => L[i].start + L[i].dur;
  const world = box(c, { left: 0, top: 0, width: W, height: H, transformOrigin: '640px 400px' });
  bgPop(world, { color: '#bde0fe', T, D });
  ground(world, { y: 548, color: '#6c757d' });
  // beat 0: calendar page flips to NOVEMBER 2026, shield stamps beside it
  const g0 = box(world, { left: 0, top: 0, width: W, height: H }); tl.to(g0, { opacity: 0, duration: 0.3 }, st(1) - 0.1);
  const cal = card(g0, { x: 400, y: 320, w: 380, h: 340, html: '', bg: PP.white, T: T + 0.3, rot: -3 });
  box(cal, { left: -5, top: -5, width: 380, height: 90, background: PP.red, border: `5px solid ${INK}`, borderRadius: '18px 18px 0 0', color: '#fff', font: `900 40px/80px ${FONT}`, textAlign: 'center', boxSizing: 'border-box' }, 'NOVEMBER');
  box(cal, { left: 0, top: 100, width: 370, textAlign: 'center', font: `900 120px/1 ${FONT}`, color: INK }, '2026');
  [60, 190, 310].forEach((x) => box(cal, { left: x, top: -22, width: 22, height: 44, background: '#adb5bd', border: `4px solid ${INK}`, borderRadius: 10 }));
  const page = box(cal, { left: -5, top: -5, width: 380, height: 340, background: PP.white, border: `5px solid ${INK}`, borderRadius: 18, transformOrigin: '50% 0%', boxSizing: 'border-box' });   // blank page that flips away
  box(page, { left: 0, top: 0, width: 370, height: 90, background: PP.red, borderRadius: '13px 13px 0 0' });
  tl.to(page, { rotationX: -100, opacity: 0, duration: 0.7, ease: 'power2.in' }, st(0) + 2.0); sfx('whoosh', st(0) + 2.0, 0.5);
  iconBox(g0, { x: 790, y: 250, size: 190, name: 'shield', bg: PP.white, T: st(0) + 3.6, sfx: 'chime' });
  stamp(g0, { x: 790, y: 430, w: 600, size: 28, text: 'CORRECT AS OF NOVEMBER 2026', color: PP.green, T: st(0) + 4.5, rot: -4 });
  // beat 1: rules change often
  iconBox(world, { x: 450, y: 300, size: 190, name: 'warn', bg: PP.white, T: st(1) + 0.3, out: st(2) - 0.1 });
  card(world, { x: 830, y: 300, w: 470, h: 130, html: 'UK rules change', size: 44, bg: PP.yellow, T: st(1) + 0.9, rot: 2, out: st(2) - 0.1 });
  tl.to(world.lastChild, { rotation: -2, duration: 0.15, yoyo: true, repeat: 7 }, st(1) + 1.5);
  // beat 2: browser window gov.uk with a magnifier
  const br = box(world, { left: 230, top: 95, width: 820, height: 420, background: '#fff', border: `6px solid ${INK}`, borderRadius: 18, boxShadow: `9px 9px 0 ${INK}`, opacity: 0, overflow: 'hidden' });
  box(br, { left: 0, top: 0, width: 820, height: 70, background: PP.grey, borderBottom: `5px solid ${INK}` });
  [PP.red, PP.yellow, PP.green].forEach((col, i) => box(br, { left: 18 + i * 30, top: 24, width: 20, height: 20, borderRadius: 10, background: col, border: `3px solid ${INK}` }));
  box(br, { left: 130, top: 12, width: 650, height: 46, background: '#fff', border: `4px solid ${INK}`, borderRadius: 24, font: `900 28px/38px Arial`, paddingLeft: 24, boxSizing: 'border-box' }, '🔒 gov.uk');
  box(br, { left: 0, top: 110, width: 820, textAlign: 'center', font: `900 52px/1.15 ${FONT}`, color: INK }, 'UK rules change.<br><span style="color:#e63946">Check GOV.UK first.</span>');
  pop(br, st(2) + 0.2, { out: st(3) - 0.2, from: 0.7, sfx: 'whoosh', vol: 0.5 });
  const mag = iconBox(world, { x: 760, y: 420, size: 160, name: 'search', bg: PP.white, T: st(2) + 1.5, out: st(3) - 0.2 });
  tl.to(mag, { x: -380, y: -40, duration: 3, ease: 'sine.inOut' }, st(2) + 2.5); tl.to(mag, { x: -100, y: 10, duration: 3, ease: 'sine.inOut' }, st(2) + 5.6);
  card(world, { x: 990, y: 535, w: 400, h: 66, html: icon('cross', 46) + '<span style="margin-left:10px">Health? NHS website</span>', size: 26, bg: PP.mint, T: st(2) + 8.2, rot: 3, out: st(3) - 0.2 });
  // beat 3-5: Kiran and Chidi banter
  const kiran = cast(world, 'kiran', { x: 400, y: 560, s: 1.4, T: st(3) - 0.4, D: D - (st(3) - T) + 0.4, opacity: 0 }); kiran.breathe(st(3) - 0.4, 12);
  const chidi = cast(world, 'chidi', { x: 880, y: 560, s: 1.4, flip: true, T: st(3) - 0.4, D: D - (st(3) - T) + 0.4, opacity: 0 }); chidi.breathe(st(3) - 0.4, 12);
  tl.fromTo(kiran.g, { x: -500, opacity: 1 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, st(3) - 0.4); kiran.walk(st(3) - 0.4, 0.9, 0, 0.5, 1.5);
  tl.fromTo(chidi.g, { x: 500, opacity: 1 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, st(3) - 0.4); chidi.walk(st(3) - 0.4, 0.9, 0, 0.5, 1.5);
  talkLines(kiran, 'safety', 'K'); talkLines(chidi, 'safety', 'C');
  headline(world, { x: 640, y: 66, text: 'RULE ZERO: CHECK GOV.UK', size: 44, color: PP.yellow, T: st(3) + 0.1, w: 1000, out: en(5) + 1 });
  kiran.arm('f', -70, -40, st(3) + 0.6, 0.5); chidi.arm('f', -20, -10, st(4), 0.4); kiran.arm('f', 0, -20, st(4) + 0.8, 0.5);
  [[3, 'K'], [4, 'C'], [5, 'K']].forEach((x) => speech(world, { x: x[1] === 'K' ? 400 : 880, y: 205, w: x[0] === 3 ? 440 : 380, text: L[x[0]].text, who: x[1] === 'K' ? 'KIRAN' : 'CHIDI', color: x[1] === 'K' ? '#2a9d8f' : '#ff7b00', tail: x[1] === 'K' ? 'left' : 'right', T: st(x[0]), D: L[x[0]].dur + 0.2 }));
  tl.fromTo(world, { scale: 1 }, { scale: 1.05, duration: D, ease: 'none' }, T);
})();
