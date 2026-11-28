// ===== SCENE 2 "rule": THE GOLDEN RULE: NEED, NOT WANT. REFERENCE EXAMPLE for the team (copy this structure). =====
(function () {
  const c = S('rule'), w = win('rule'), T = w.T, D = w.D, L = LS('rule');          // L[i] = i-th line of this scene: {start, dur, who, text}
  const st = (i) => L[i].start, en = (i) => L[i].start + L[i].dur;
  const world = box(c, { left: 0, top: 0, width: W, height: H, transformOrigin: '640px 400px' });  // everything inside `world` so the camera can push
  // set: sky, skyline, pavement, shop front
  bgPop(world, { color: '#bde0fe', T, D });
  skyline(world, { y: 520, seed: 11, T, D, drift: -60 });
  ground(world, { y: 540, color: '#6c757d' });
  box(world, { left: 800, top: 190, width: 440, height: 360, background: '#fff', border: `6px solid ${INK}`, borderRadius: 10 });
  box(world, { left: 780, top: 170, width: 480, height: 50, background: 'repeating-linear-gradient(90deg,#e63946 0 40px,#fff 40px 80px)', border: `6px solid ${INK}` });
  box(world, { left: 830, top: 250, width: 230, height: 190, background: '#caf0f8', border: `5px solid ${INK}` });   // shop window
  iconBox(world, { x: 905, y: 340, size: 96, name: 'phone', bg: PP.sky, T: T + 0.4, sfx: false });
  iconBox(world, { x: 1000, y: 340, size: 96, name: 'laptop', bg: PP.sky, T: T + 0.55, sfx: false });
  // characters: Mr Deal at his shop (faces left), Chidi in the middle, Kiran walks in later
  const deal = cast(world, 'mrdeal', { x: 1130, y: 560, s: 1.3, flip: true, T, D }); deal.breathe(T, D);
  const chidi = cast(world, 'chidi', { x: 470, y: 560, s: 1.3, T, D }); chidi.breathe(T, D);
  const kiran = cast(world, 'kiran', { x: 200, y: 560, s: 1.3, T, D }); kiran.breathe(T, D); kiran.g.style.opacity = 0;
  talkLines(deal, 'rule', 'S'); talkLines(chidi, 'rule', 'C'); talkLines(kiran, 'rule', 'K');
  // beat 1 (Mr Deal's pitch): price tags fly in, Chidi's eyes go wide, he leans toward the shop
  const tags = [['£1,100 phone', 130], ['£1,400 laptop', 200], ['24-month contract', 270]].map((x, i) => card(world, { x: 640, y: x[1], w: 330, h: 64, html: x[0], size: 28, bg: i === 2 ? PP.pink : PP.white, color: i === 2 ? '#fff' : INK, T: st(0) + 0.5 + i * 0.7, rot: -3 + i * 3 }));
  chidi.emote('surprised', st(0) + 1); chidi.arm('f', -35, -20, st(0) + 1, 0.6); tl.to(chidi.g, { x: 50, duration: 1.2, ease: 'sine.inOut' }, st(0) + 1);
  sfx('cash', st(0) + 0.7, 0.6); sfx('cash', st(0) + 1.4, 0.6);
  // beat 2 (Kiran: "No. No, no, no."): he slides in, NOT YET stamps slam on every tag
  kiran.g.style.opacity = 1; tl.fromTo(kiran.g, { x: -420 }, { x: 0, duration: 1.0, ease: 'power3.out' }, st(2)); kiran.walk(st(2), 1.0, 0, 0.5, 1.5);
  kiran.arm('f', -80, -50, st(2) + 1.1, 0.4);
  tags.forEach((e, i) => stamp(world, { x: 640, y: 130 + i * 70, w: 230, size: 34, text: 'NOT YET', T: st(2) + 1.3 + i * 0.5, out: st(3) + 1, rot: -10 + i * 6 }));
  sfx('buzz', st(2) + 1.2, 0.5);
  // beat 3 (the golden rule): shop fades, a need-list pad appears with ticks, then a calendar "Day 30"
  tags.forEach((e) => tl.to(e, { opacity: 0, duration: 0.3 }, st(3) + 1.1));
  const pad = card(world, { x: 700, y: 345, w: 420, h: 320, html: '', bg: PP.cream, T: st(3) + 1.2, rot: 2 });
  headline(world, { x: 700, y: 90, text: 'NEED THIS WEEK', size: 40, color: PP.yellow, T: st(3) + 1.3, w: 560, out: en(6) + 1 });
  ['Food', 'A bed (second-hand is fine)', 'Bus pass', 'Cheap SIM', 'Work clothes'].forEach((t, i) => {
    const row = box(pad, { left: 28, top: 14 + i * 60, width: 380, font: `800 26px Arial`, color: INK, display: 'flex', alignItems: 'center', gap: '12px', opacity: 0 }, icon('tick', 36) + t); tl.to(row, { opacity: 1, x: 0, duration: 0.3 }, st(4) + i * 0.8); sfx('tick', st(4) + i * 0.8, 0.8); });
  const cal = card(world, { x: 700, y: 330, w: 300, h: 300, html: '<div><div style="font-size:30px;color:#e63946">DAY</div><div style="font-size:120px;line-height:1">30</div><div style="font-size:24px">everything else waits</div></div>', bg: PP.white, T: st(5) + 0.3, rot: -3 });
  tl.to(pad, { opacity: 0, duration: 0.3 }, st(5) + 0.2);
  // beat 4 (a used phone works the same): £60 second-hand phone with a tick
  tl.to(cal, { opacity: 0, duration: 0.3 }, st(6) + 0.2);
  iconBox(world, { x: 700, y: 300, size: 150, name: 'phone', bg: PP.mint, T: st(6) + 0.5, out: en(6) + 1 });
  card(world, { x: 860, y: 230, w: 220, h: 70, html: '£60 used', size: 34, bg: PP.yellow, T: st(6) + 0.9, rot: 4, out: en(6) + 1 }); iconBox(world, { x: 900, y: 320, size: 80, name: 'tick', bg: PP.white, T: st(6) + 1.3, out: en(6) + 1 });
  // banter bubbles (timed to their lines)
  speech(world, { x: 470, y: 150, w: 400, text: L[1].text, who: 'CHIDI', color: '#ff7b00', tail: 'right', T: st(1), D: L[1].dur + 0.2 });
  [7, 8, 9].forEach((i) => speech(world, { x: L[i].who === 'K' ? 260 : 520, y: 170, w: 400, text: L[i].text, who: L[i].who === 'K' ? 'KIRAN' : 'CHIDI', color: L[i].who === 'K' ? '#2a9d8f' : '#ff7b00', tail: L[i].who === 'K' ? 'left' : 'right', T: st(i), D: L[i].dur + 0.2 }));
  chidi.arm('f', -10, -5, st(8), 0.4); chidi.emote('sad', st(8)); kiran.arm('f', -60, -70, st(9), 0.5);
  // camera: slow push all scene, tighter on the final exchange
  tl.fromTo(world, { scale: 1 }, { scale: 1.05, duration: D, ease: 'none' }, T); tl.to(world, { scale: 1.12, x: -40, duration: 3, ease: 'sine.inOut' }, st(7));
  // little extras
  tl.to(chidi.P.h, { rotation: 5, duration: 1.4, yoyo: true, repeat: Math.floor(D / 2.8), ease: 'sine.inOut' }, T);
})();
