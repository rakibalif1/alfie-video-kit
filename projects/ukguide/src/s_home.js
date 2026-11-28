// ===== SCENE "home": STEP 3, A SAFE PLACE TO LIVE. Mr Rush rushes at a door, red flags turn into green ticks, deposit scheme, calm landlord = good sign. =====
(function () {
  const c = S('home'), w = win('home'), T = w.T, D = w.D, L = LS('home');
  const st = (i) => L[i].start, en = (i) => L[i].start + L[i].dur;
  const world = box(c, { left: 0, top: 0, width: W, height: H, transformOrigin: '640px 400px' });
  bgPop(world, { color: '#bde0fe', T, D });
  // terraced street: row of brick houses behind the action
  const cols = ['#c8553d', '#b5838d', '#e09f3e', '#9e2a2b', '#d4a373', '#b56576', '#c8553d', '#e09f3e'];
  for (let i = 0; i < 8; i++) {
    const x = -20 + i * 180, col = cols[i];
    box(world, { left: x, top: 170, width: 170, height: 380 }, `<svg viewBox="0 0 170 380" width="170" height="380"><path d="M0 120 L85 20 L170 120Z" fill="#5c677d" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><rect x="3" y="118" width="164" height="262" fill="${col}" stroke="${INK}" stroke-width="5"/><rect x="24" y="146" width="44" height="54" fill="#caf0f8" stroke="${INK}" stroke-width="4"/><rect x="102" y="146" width="44" height="54" fill="#caf0f8" stroke="${INK}" stroke-width="4"/><rect x="62" y="262" width="46" height="118" rx="4" fill="${i === 6 ? PP.teal : PP.navy}" stroke="${INK}" stroke-width="4"/><circle cx="99" cy="324" r="4" fill="#ffd166"/></svg>`);
  }
  ground(world, { y: 540, color: '#6c757d' });
  // cast: Chidi (eager) and Kiran; Mr Rush at the door of the green-door house
  const chidi = cast(world, 'chidi', { x: 440, y: 560, s: 1.3, T, D }); chidi.breathe(T, D);
  const kiran = cast(world, 'kiran', { x: 215, y: 560, s: 1.3, T, D }); kiran.breathe(T, D); kiran.g.style.opacity = 0;
  const rush = cast(world, 'mrrush', { x: 1160, y: 560, s: 1.3, flip: true, T, D }); rush.breathe(T, D); rush.g.style.opacity = 0;
  talkLines(rush, 'home', 'L'); talkLines(chidi, 'home', 'C'); talkLines(kiran, 'home', 'K');
  // beat 0: Mr Rush rushes in with the keys
  rush.g.style.opacity = 1; tl.fromTo(rush.g, { x: 500 }, { x: 0, duration: 0.9, ease: 'power3.out' }, st(0) + 3.2); rush.walk(st(0) + 3.2, 0.9, 0, 0.3, 2.5); sfx('whoosh', st(0) + 3.2, 0.5);
  headline(world, { x: 720, y: 150, text: 'STEP 3: A SAFE PLACE TO LIVE', size: 46, color: PP.yellow, T: T + 0.6, w: 760, out: st(1) - 0.2 });
  headline(world, { x: 720, y: 270, text: 'Where you sleep', size: 54, color: '#fff', T: T + 2.0, w: 600, out: st(1) - 0.2, rot: 2 });
  iconBox(world, { x: 1010, y: 400, size: 84, name: 'key', bg: PP.yellow, T: st(1) + 0.4, out: st(2) + 1, sfx: false }); sfx('coin', st(1) + 0.4, 0.5);
  tl.to(rush.g, { x: -14, duration: 0.12, yoyo: true, repeat: 15 }, st(1) + 0.5);
  rush.arm('f', -70, -40, st(1), 0.4);
  // beat 1-3: the pitch and the banter
  speech(world, { x: 880, y: 170, w: 470, text: L[1].text, who: 'MR RUSH', color: PP.red, tail: 'right', T: st(1), D: L[1].dur + 0.2, size: 27 });
  speech(world, { x: 610, y: 150, w: 360, text: L[2].text, who: 'CHIDI', color: '#ff7b00', tail: 'left', T: st(2), D: L[2].dur + 0.3 });
  chidi.arm('f', -30, -20, st(2), 0.4); tl.to(chidi.g, { x: 40, duration: 1, ease: 'sine.inOut' }, st(2));
  kiran.g.style.opacity = 1; tl.fromTo(kiran.g, { x: -320 }, { x: 0, duration: 0.8, ease: 'power3.out' }, st(3) - 0.9); kiran.walk(st(3) - 0.9, 0.8, 0, 0.5, 1.5);
  speech(world, { x: 345, y: 150, w: 340, text: L[3].text, who: 'KIRAN', color: '#2a9d8f', tail: 'left', T: st(3), D: L[3].dur + 0.3 });
  kiran.arm('f', -90, -30, st(3) + 0.2, 0.4); kiran.arm('f', 0, 0, st(4) + 0.8, 0.5); chidi.emote('surprised', st(3) + 0.3);
  stamp(world, { x: 700, y: 400, w: 330, size: 40, text: 'RED FLAG', T: st(3) + 0.7, out: st(4) + 0.4, rot: -8 }); sfx('buzz', st(3) + 0.7, 0.4);
  // beat 4: three red flags, each waves then gets a cross; green ticks follow
  const flags = [['Pay now for a room you haven’t seen', 1.0], ['Pay cash, no receipt', 3.2], ['No written agreement', 5.2]].map((f, i) => {
    const y = 140 + i * 82, e = card(world, { x: 780, y, w: 470, h: 72, html: icon('warn', 36) + `<span style="margin-left:8px">${f[0]}</span>`, size: 20, bg: '#fff', T: st(4) + f[1], rot: -2 + i * 2, out: st(5) - 0.1, sfx: 'thud' });
    tl.to(e, { rotation: 3, duration: 0.18, yoyo: true, repeat: 3 }, st(4) + f[1] + 0.5);
    iconBox(world, { x: 1030, y: y - 22, size: 56, name: 'xmark', bg: PP.white, T: st(4) + f[1] + 1.0, out: st(5) - 0.1, sfx: false }); sfx('stamp', st(4) + f[1] + 1.05, 0.5); return e; });
  const green = (txt, y, t) => card(world, { x: 780, y, w: 430, h: 58, html: icon('tick', 36) + `<span style="margin-left:10px">${txt}</span>`, size: 26, bg: PP.mint, T: t, rot: 0, sfx: 'ding' });
  green('See the room first', 405, st(4) + 2.6);
  green('Written agreement', 472, st(4) + 6.2);
  chidi.arm('f', 0, 0, st(4) + 1, 0.4);
  // beat 5: right-to-rent check and the share code (calm, normal)
  const r1 = card(world, { x: 780, y: 160, w: 450, h: 90, html: icon('key', 46) + '<span style="margin-left:12px">Right-to-rent check</span>', size: 28, bg: PP.sky, T: st(5) + 0.5, out: st(6) - 0.1 });
  const r2 = card(world, { x: 780, y: 255, w: 380, h: 64, html: 'Your share code', size: 30, bg: PP.yellow, T: st(5) + 3.2, rot: 2, out: st(6) - 0.1 });
  const r3 = card(world, { x: 780, y: 320, w: 380, h: 56, html: icon('tick', 34) + '<span style="margin-left:10px">Normal. Legal.</span>', size: 26, bg: PP.white, T: st(5) + 5.4, out: st(6) - 0.1, sfx: 'tick' });
  chidi.emote('normal', st(5)); kiran.arm('f', -40, -50, st(5) + 4, 0.5); kiran.arm('f', 0, 0, st(6), 0.5);
  // beat 6: deposit protected: vault, label, 30 DAYS clock, 5 weeks envelope
  const vault = box(world, { left: 490, top: 100, width: 150, height: 150, filter: `drop-shadow(5px 5px 0 ${INK})` }, `<svg viewBox="0 0 100 100" width="150" height="150" style="stroke:${INK};stroke-width:4;stroke-linejoin:round"><rect x="6" y="10" width="88" height="80" rx="10" fill="#adb5bd"/><rect x="16" y="20" width="68" height="60" rx="6" fill="#ced4da"/><circle cx="50" cy="50" r="20" fill="${PP.yellow}"/><circle cx="50" cy="50" r="6" fill="${INK}"/><path d="M50 30 V70 M30 50 H70" stroke-width="4"/><rect x="14" y="90" width="12" height="6" fill="${INK}"/><rect x="74" y="90" width="12" height="6" fill="${INK}"/></svg>`);
  pop(vault, st(6) + 0.5, { out: st(7) - 0.1, sfx: 'coin' });
  card(world, { x: 795, y: 160, w: 240, h: 100, html: icon('clock', 50) + '<span style="margin-left:10px;white-space:nowrap">30 DAYS</span>', size: 34, bg: PP.white, T: st(6) + 5.0, out: st(7) - 0.1, rot: -2 });
  card(world, { x: 780, y: 300, w: 450, h: 70, html: 'government-approved deposit scheme', size: 22, bg: PP.cream, T: st(6) + 3.0, out: st(7) - 0.1, rot: 1 });
  green('Deposit protected', 539, st(6) + 7.0);
  card(world, { x: 985, y: 160, w: 130, h: 100, html: '<div>5 weeks<div style="font:800 16px Arial">deposit cap</div></div>', size: 28, bg: '#fff3b0', T: st(6) + 8.6, out: st(7) - 0.1, rot: 5 });
  // beat 7: a calm landlord is a good sign; a rushing one is a warning
  card(world, { x: 780, y: 150, w: 450, h: 90, html: icon('tick', 46) + '<span style="margin-left:12px">CALM = good sign</span>', size: 30, bg: PP.mint, T: st(7) + 0.6, out: en(7) + 1, rot: -1 });
  card(world, { x: 780, y: 265, w: 450, h: 90, html: icon('warn', 46) + '<span style="margin-left:12px">RUSHING = warning</span>', size: 30, bg: '#ffb3b3', T: st(7) + 3.0, rot: 1, out: en(7) + 1, sfx: 'buzz' });
  rush.emote('sly', st(7) + 3.0); tl.to(rush.g, { x: -30, duration: 0.15, yoyo: true, repeat: 11 }, st(7) + 3.2); sfx('whoosh', st(7) + 3.2, 0.4);
  // camera: slow push, tighter at the end
  tl.fromTo(world, { scale: 1 }, { scale: 1.04, duration: D, ease: 'none' }, T); tl.to(world, { scale: 1.08, x: -30, duration: 3, ease: 'sine.inOut' }, st(7));
})();
