// ===== SCENE 1 "cold": THE TWO SUITCASES (cold open). Arrival hall, split screen PATH A / PATH B, title. =====
(function () {
  const c = S('cold'), w = win('cold'), T = w.T, D = w.D, L = LS('cold');
  const st = (i) => L[i].start;
  const R = rr(21);
  // suitcase hung on a puppet's hand (child of the puppet group so it travels with it)
  const suit = (p, s) => box(p.g, { left: 74 * s, top: 138 * s, width: 70 * s, height: 70 * s, filter: `drop-shadow(3px 3px 0 ${INK})` }, icon('suitcase', 70 * s));
  // stop-walking helper: legs/arms back to rest after a walk cycle of period p started at t0 for dur d
  const rest = (p, per, t0, d) => { const e = t0 + per * (Math.floor(d / per) + 1) + 0.05; tl.to([p.P.lf, p.P.lb, p.P.lfs, p.P.lbs, p.P.t, p.P.h, p.P.tail], { rotation: 0, y: 0, duration: 0.25 }, e); tl.to(p.P.af, { rotation: -4, duration: 0.25 }, e); tl.to(p.P.ab, { rotation: 4, duration: 0.25 }, e); };

  // ================= PART 1: ARRIVAL HALL (0.5 to 10.8) =================
  const hall = box(c, { left: 0, top: 0, width: W, height: H, transformOrigin: '1090px 360px', background: 'linear-gradient(#2e3b68,#1d2748)' });
  ground(hall, { y: 470, color: '#5c6584' });
  box(hall, { left: 0, top: 470, width: W, height: 250, background: 'repeating-linear-gradient(90deg,rgba(255,255,255,.08) 0 4px,transparent 4px 120px)' });
  for (let i = 0; i < 3; i++) {   // rainy dusk windows
    const pane = box(hall, { left: 50 + i * 295, top: 90, width: 275, height: 250, background: 'linear-gradient(#5a4a78,#e07a5f)', border: `7px solid ${INK}`, overflow: 'hidden' });
    for (let k = 0; k < 14; k++) { const d = 0.5 + R() * 0.3, r = box(pane, { left: R() * 270, top: -40, width: 3, height: 30, background: 'rgba(255,255,255,.6)', borderRadius: 2 }); tl.fromTo(r, { y: 0 }, { y: 300, duration: d, repeat: Math.floor(10 / d), ease: 'none' }, T + R() * 0.5); }
  }
  box(hall, { left: 945, top: 150, width: 290, height: 60, background: PP.blue, border: `6px solid ${INK}`, borderRadius: 10, color: '#fff', font: `900 34px/48px ${FONT}`, textAlign: 'center', letterSpacing: '3px' }, 'ARRIVALS');
  box(hall, { left: 955, top: 225, width: 270, height: 245, background: '#ffe9a8', border: `7px solid ${INK}` });
  box(hall, { left: 1086, top: 225, width: 8, height: 245, background: INK });
  // everyday travellers in the background (cast extras walk across)
  const stroll = (key, x0, x1, t0, t1, flip, per) => { const p = cast(hall, key, { x: x0, y: 505, s: 1.0, flip, T: t0, D: t1 - t0 }); p.breathe(t0, t1 - t0); p.walk(t0, t1 - t0, 0, per, 2); suit(p, 1.0); tl.to(p.g, { x: x1 - x0, duration: t1 - t0, ease: 'none' }, t0); return p; };
  stroll('amina', -150, 1350, T, 9.5, false, 0.6); stroll('priya', 1400, -200, T + 0.5, 9.5, true, 0.6); stroll('kofi', -450, 1100, T + 1.5, 10, false, 0.55);
  // the two heroes with the same blue suitcase
  const chidi = cast(hall, 'chidi', { x: -90, y: 560, s: 1.3, T, D: 10.5 }); chidi.breathe(T, 10.5); suit(chidi, 1.3);
  const rahim = cast(hall, 'rahim', { x: -270, y: 560, s: 1.3, T, D: 10.5 }); rahim.breathe(T, 10.5); suit(rahim, 1.3);
  chidi.walk(1.8, 3.0, 0, 0.55, 2); tl.to(chidi.g, { x: 520, duration: 3.0, ease: 'power1.out' }, 1.8); rest(chidi, 0.55, 1.8, 3.0);
  rahim.walk(2.4, 3.8, 0, 0.55, 2); tl.to(rahim.g, { x: 970, duration: 3.8, ease: 'power1.out' }, 2.4); rest(rahim, 0.55, 2.4, 3.8);
  // narration beats: LAGOS / DHAKA tags, then £2,000 over both
  card(hall, { x: 430, y: 235, w: 210, h: 58, html: 'LAGOS', size: 32, bg: PP.orange, T: 4.5, rot: -4, out: 9.4 });
  card(hall, { x: 700, y: 235, w: 210, h: 58, html: 'DHAKA', size: 32, bg: PP.teal, color: '#fff', T: 6.1, rot: 4, out: 9.4 });
  card(hall, { x: 565, y: 140, w: 340, h: 72, html: '£2,000 each', size: 38, bg: PP.yellow, T: 8.9, rot: -2, out: 10.3 }); sfx('cash', 9.0, 0.6);
  // camera pushes through the doors, white flash into the split screen
  tl.to(hall, { scale: 3.6, duration: 1.3, ease: 'power2.in' }, 9.4); sfx('whoosh', 9.5, 0.7);

  // ================= PART 2: SPLIT SCREEN (10.8 to 39.2) =================
  const split = box(c, { left: 0, top: 0, width: W, height: H, transformOrigin: '640px 400px', opacity: 0 });
  tl.set(split, { opacity: 1 }, 10.8); tl.set(hall, { opacity: 0 }, 10.85);
  tl.fromTo(split, { scale: 1 }, { scale: 1.06, duration: 28, ease: 'none' }, 10.8);
  const half = (x, tint) => { const h = box(split, { left: x, top: 0, width: 640, height: H, overflow: 'hidden', background: 'linear-gradient(#ced4da,#e9ecef)' });
    skyline(h, { y: 520, seed: 31, colors: ['#8d99ae', '#adb5bd', '#6c757d'] }); ground(h, { y: 540, color: '#6c757d' });
    box(h, { left: 0, top: 0, width: 640, height: H, background: tint }); return h; };
  const A = half(0, 'rgba(230,57,70,0.22)'), B = half(640, 'rgba(56,176,0,0.20)');
  box(split, { left: 637, top: 0, width: 6, height: H, background: INK });
  card(A, { x: 320, y: 140, w: 230, h: 66, html: 'PATH A', size: 36, bg: PP.red, color: '#fff', T: 10.9, rot: -3 });
  card(B, { x: 320, y: 140, w: 230, h: 66, html: 'PATH B', size: 36, bg: PP.green, color: '#fff', T: 11.0, rot: 3 });
  const barA = moneyBar(A, { x: 80, y: 200, w: 120, h: 340, color: PP.red, label: '£2,000', size: 22, T: 11.1 });
  const barB = moneyBar(B, { x: 560, y: 200, w: 120, h: 340, color: PP.green, label: '£2,000', size: 22, T: 11.2 });
  const cA = cast(A, 'chidi', { x: 330, y: 560, s: 1.25, T: 10.8, D: 29 }); cA.breathe(10.8, 29); suit(cA, 1.25);
  bus(B, { x: 0, y: 545, s: 0.9, T: 26.4, from: 800, to: 20, D: 2 });
  const cB = cast(B, 'rahim', { x: 350, y: 560, s: 1.25, T: 10.8, D: 29 }); cB.breathe(10.8, 29); suit(cB, 1.25);
  talkLines(cA, 'cold', 'C'); talkLines(cB, 'cold', 'R');
  // DAY counter ticks 1 to 30 fast
  const ctr = card(split, { x: 640, y: 135, w: 200, h: 130, html: '<div><div style="font-size:24px;color:#e63946">DAY</div><div class="num" style="font-size:64px;line-height:1">1</div></div>', bg: PP.white, T: 11.2 });
  const num = ctr.querySelector('.num');
  for (let d = 2; d <= 30; d++) { const t = 11.4 + (d - 2) * 0.17; tl.set(num, { textContent: d }, t); if (d % 3 === 0) sfx('tick', t, 0.5); }
  tl.fromTo(ctr, { scale: 1 }, { scale: 1.25, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, 16.4); sfx('ding', 16.4, 0.7);
  // LEFT: spending icons fly out of Chidi toward the draining bar
  [['phone', 0.82], ['laptop', 0.6], ['sofa', 0.4], ['doc', 0.2], ['pound', 0.08]].forEach(([n, f], i) => {
    const t = 11.9 + i * 0.9, y = 250 + (i % 3) * 55;
    const e = iconBox(A, { x: 440, y, size: 90, name: n, bg: PP.yellow, T: t, sfx: false });
    tl.to(e, { x: 80 - 440, y: 360 - y, scale: 0.5, opacity: 0, duration: 0.55, ease: 'power2.in' }, t + 0.55);
    barA.set(f, t + 1.0, 0.35); sfx('thud', t + 1.0, 0.8);
    cA.arm('f', -60, -40, t, 0.25); cA.arm('f', 0, 0, t + 0.5, 0.4);
  });
  cA.emote('surprised', 12.2); cA.emote('sad', 14.4);
  // "sleeping on a friend's sofa": sofa pops in, Chidi sinks into it with an empty phone
  const sofa = box(A, { left: 180, top: 331, width: 300, height: 300, filter: `drop-shadow(6px 6px 0 ${INK})`, opacity: 0 }, icon('sofa', 300));
  pop(sofa, 15.2, { sfx: 'thud' }); tl.to(cA.g, { y: 42, duration: 0.5, ease: 'power2.out' }, 15.3); tl.to([cA.P.lf, cA.P.lb], { opacity: 0, duration: 0.1 }, 15.4); cA.head(10, 15.5, 0.8);
  iconBox(A, { x: 215, y: 440, size: 80, name: 'phone', bg: PP.grey, T: 16.0, sfx: false });
  // RIGHT: icons fly in with a ding
  [['sim', 17.9, 100, 290], ['card', 18.7, 215, 290], ['stethoscope', 19.9, 100, 400], ['bus', 20.8, 215, 400]].forEach(([n, t, x, y]) => {
    const e = iconBox(B, { x, y, size: 92, name: n, bg: PP.mint, T: t, out: 24.9, sfx: false }); gsap.set(e, { opacity: 0 });
    tl.fromTo(e, { x: 700, y: -80, opacity: 0, scale: 0.6 }, { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }, t);
    sfx('ding', t + 0.5, 0.7); cB.emote('happy', t + 0.5);
  });
  barB.set(0.97, 19.0, 0.4); barB.set(0.94, 21.0, 0.4);
  // "most of that money is still in the bank"
  card(B, { x: 335, y: 240, w: 290, h: 110, html: 'STILL IN THE BANK', size: 30, bg: PP.yellow, T: 25.1, rot: -3 }); sfx('chime', 25.2, 0.6);
  tl.fromTo(barB.el, { scale: 1 }, { scale: 1.08, duration: 0.25, yoyo: true, repeat: 3 }, 25.3);
  // bus rolls in behind Rahim, he waves
  sfx('whoosh', 26.4, 0.5);
  cB.arm('f', -150, -25, 27.4, 0.4); tl.to(cB.P.aff, { rotation: -55, duration: 0.25, yoyo: true, repeat: 7 }, 27.9);
  // "not luck, not money, the order"
  stamp(split, { x: 640, y: 330, w: 330, size: 46, text: 'NOT LUCK', T: 30.2, out: 34.4, rot: -6 });
  stamp(split, { x: 640, y: 430, w: 360, size: 46, text: 'NOT MONEY', T: 31.2, out: 34.4, rot: 5 });
  card(split, { x: 640, y: 530, w: 420, h: 76, html: 'IT WAS THE ORDER', size: 34, bg: PP.yellow, T: 32.6, rot: -2, out: 34.7 });
  tl.to(ctr, { opacity: 0, duration: 0.3 }, 34.5);
  // "just arrived ... or about to ... stay with me"
  card(split, { x: 640, y: 260, w: 400, h: 76, html: 'JUST ARRIVED', size: 38, bg: PP.sky, T: 36.0, rot: -3, out: 39.1 });
  card(split, { x: 640, y: 360, w: 400, h: 76, html: 'OR ABOUT TO', size: 38, bg: PP.pink, color: '#fff', T: 37.4, rot: 3, out: 39.1 });
  card(split, { x: 640, y: 460, w: 400, h: 76, html: 'STAY WITH ME', size: 38, bg: PP.mint, T: 38.3, rot: -2, out: 39.1 });
  cA.emote('normal', 34.8); cB.emote('happy', 34.8);

  // ================= PART 3: TITLE (last 7 s) =================
  const cover = box(c, { left: 0, top: 0, width: W, height: H, opacity: 0 }); bgPop(cover, { color: PP.yellow, T: 39.0, D: 8 });
  tl.to(cover, { opacity: 1, duration: 0.4 }, 39.0); sfx('whoosh', 39.1, 0.7);
  burst(cover, { x: 640, y: 320, r: 280, color: PP.orange, T: 39.3 }); burst(cover, { x: 190, y: 330, r: 170, color: PP.pink, T: 39.5 }); burst(cover, { x: 1090, y: 330, r: 170, color: PP.blue, T: 39.6 });
  headline(cover, { x: 640, y: 215, text: 'YOUR FIRST 30 DAYS<br>IN THE UK', size: 86, w: 1200, color: '#fff', T: 39.5, rot: -2 }); sfx('chime', 39.6, 0.8);
  card(cover, { x: 400, y: 520, w: 220, h: 66, html: 'FIRST', size: 36, bg: PP.green, color: '#fff', T: 41.0, rot: -3 });
  card(cover, { x: 640, y: 520, w: 220, h: 66, html: 'NEXT', size: 36, bg: PP.blue, color: '#fff', T: 42.1, rot: 2 });
  card(cover, { x: 880, y: 520, w: 220, h: 66, html: 'NEVER', size: 36, bg: PP.red, color: '#fff', T: 44.0, rot: -2 });
  // flash into the split screen
  const flash = box(c, { left: 0, top: 0, width: W, height: H, background: '#fff', opacity: 0 });
  tl.to(flash, { opacity: 1, duration: 0.45, ease: 'power2.in' }, 10.35); tl.to(flash, { opacity: 0, duration: 0.5 }, 10.85);
})();
