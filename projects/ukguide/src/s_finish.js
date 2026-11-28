// ===== SCENE "finish": THE 30-DAY CHECKLIST + CLOSING =====
(function () {
  const c = S('finish'), w = win('finish'), T = w.T, D = w.D, L = LS('finish');
  const st = (i) => L[i].start, en = (i) => L[i].start + L[i].dur;
  const world = box(c, { left: 0, top: 0, width: W, height: H, transformOrigin: '640px 400px' });
  bgPop(world, { color: '#fff1d6', T, D });
  const floor = ground(world, { y: 548, color: '#a98467' });
  // actor helper: puppet visible only between t0 and t1
  const actor = (key, o, t0, t1) => { const p = cast(world, key, Object.assign({ opacity: 0, T: t0, D: t1 - t0 }, o)); p.breathe(t0, t1 - t0); tl.set(p.g, { opacity: 1 }, t0); tl.set(p.g, { opacity: 0 }, t1); return p; };
  // beat 0: title
  headline(world, { x: 640, y: 210, text: 'YOUR 30-DAY CHECKLIST', size: 72, color: PP.yellow, T: T + 0.1, w: 1100, out: st(1) + 0.2 });
  iconBox(world, { x: 640, y: 400, size: 130, name: 'calendar', bg: PP.white, T: T + 0.6, out: st(1) + 0.2 });
  // beat 1-4: the wall checklist, four columns, each row stamped as the narrator says it
  const wall = box(world, { left: 0, top: 0, width: W, height: H }); tl.to(wall, { opacity: 0, duration: 0.3 }, st(5) - 0.1);
  const board = box(wall, { left: 18, top: 62, width: 1244, height: 430, background: '#fffdf5', border: `6px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${INK}`, opacity: 0 }); pop(board, st(1) + 0.1, { sfx: 'whoosh', vol: 0.4, from: 0.8 });
  const cols = [
    { h: 'DAY 1–3', col: PP.red, i: 1, rows: [['eVisa and share code', 1.4], ['Cheap SIM', 3.3], ['Safe room', 4.9]] },
    { h: 'WEEK 1', col: PP.blue, i: 2, rows: [['Bank account', 1.4], ['GP', 2.6]] },
    { h: 'WEEKS 2–4', col: PP.teal, i: 3, rows: [['NI number', 1.5], ['Job applications', 3.9], ['Register to vote (if eligible)', 5.4]] },
    { h: 'MONTH 2–3', col: PP.purple, i: 4, rows: [['Think about credit', 5.0], ['Contract SIM', 6.4], ['Bigger purchases', 7.3]] }];
  cols.forEach((k, ci) => {
    const cx = 33 + 145 + ci * 308;
    card(wall, { x: cx, y: 120, w: 290, h: 90, html: icon('calendar', 48) + `<span style="margin-left:10px">${k.h}</span>`, size: 32, bg: k.col, color: '#fff', T: st(k.i) + 0.1, rot: -1.5 + ci });
    k.rows.forEach((r, ri) => {
      const y = 225 + ri * 100, t = st(k.i) + r[1];
      card(wall, { x: cx, y, w: 290, h: 84, html: r[0], size: 26, bg: PP.white, T: t - 0.25, rot: ri % 2 ? 1 : -1, sfx: false });
      const tk = box(wall, { left: cx + 100, top: y - 62, width: 62, height: 62, opacity: 0 }, icon('tick', 62)); tl.set(tk, { scale: 3, rotation: 20 }, 0);
      tl.to(tk, { opacity: 1, scale: 1, rotation: -8, duration: 0.18, ease: 'power4.in' }, t); sfx('stamp', t + 0.15, 0.8); });
  });
  // beat 5-7: what is NOT on the list (crossed out), Chidi and Kiran
  const kiran = actor('kiran', { x: 190, y: 560, s: 1.2 }, st(5) - 0.2, st(8) - 0.2), chidi = actor('chidi', { x: 1120, y: 560, s: 1.2, flip: true }, st(5) - 0.2, st(8) - 0.2);
  [['phone', 'A new phone', 1.3, 440], ['laptop', 'A new laptop', 2.4, 650], ['sofa', 'A new sofa', 3.5, 860]].forEach((x) => {
    iconBox(world, { x: x[3], y: 300, size: 150, name: x[0], bg: PP.white, T: st(5) + x[2], out: st(8) - 0.2, sfx: 'pop' });
    iconBox(world, { x: x[3] + 20, y: 320, size: 120, name: 'xmark', bg: 'rgba(0,0,0,0)', T: st(5) + x[2] + 0.45, out: st(8) - 0.2, sfx: 'buzz' }); });
  card(world, { x: 650, y: 460, w: 520, h: 80, html: 'THEY CAN WAIT', size: 42, bg: PP.yellow, T: st(5) + 4.1, rot: -2, out: st(8) - 0.2 });
  chidi.emote('sad', st(6)); chidi.talk(st(6), L[6].dur); kiran.emote('happy', st(7)); kiran.talk(st(7), L[7].dur); kiran.arm('f', -50, -30, st(7), 0.5);
  speech(world, { x: 900, y: 130, w: 380, text: L[6].text, who: 'CHIDI', color: '#ff7b00', tail: 'right', T: st(6), D: L[6].dur + 0.2 });
  speech(world, { x: 420, y: 130, w: 400, text: L[7].text, who: 'KIRAN', color: '#2a9d8f', tail: 'left', T: st(7), D: L[7].dur + 0.2 });
  // beat 8: the calm disclaimer, shown once
  const k2 = actor('kiran', { x: 150, y: 560, s: 1.0 }, st(8) - 0.2, st(9) - 0.2), c2 = actor('chidi', { x: 300, y: 560, s: 1.0 }, st(8) - 0.2, st(9) - 0.2);
  card(world, { x: 800, y: 180, w: 780, h: 170, html: 'General information,<br>correct as of November 2026.<br>Not legal advice. Always check GOV.UK.', size: 28, bg: PP.white, T: st(8) + 0.4, rot: -1, out: st(9) - 0.2 });
  iconBox(world, { x: 340, y: 180, size: 90, name: 'shield', bg: PP.white, T: st(8) + 0.9, out: st(9) - 0.2, sfx: 'chime' });
  card(world, { x: 800, y: 370, w: 780, h: 130, html: 'Complicated? Ask Citizens Advice, or a regulated immigration adviser', size: 30, bg: PP.mint, T: st(8) + 12, rot: 1, out: st(9) - 0.2 });
  // beat 9-10: sun comes out, six characters together, a double-decker passes
  const sky = box(world, { left: -60, top: -60, width: W + 120, height: H + 120, background: `radial-gradient(circle, rgba(255,255,255,.35) 2.6px, transparent 3px) 0 0/26px 26px, #8ecae6`, opacity: 0 }); tl.to(sky, { opacity: 1, duration: 1.5 }, st(9));
  const sun = box(world, { left: 930, top: 120, width: 200, height: 200, borderRadius: 100, background: PP.yellow, border: `6px solid ${INK}`, boxShadow: '0 0 0 18px rgba(255,224,102,.45), 0 0 0 40px rgba(255,224,102,.25)', opacity: 0 }); tl.fromTo(sun, { opacity: 0, y: 260 }, { opacity: 1, y: 0, duration: 3, ease: 'power2.out' }, st(9) + 0.5); sfx('chime', st(9) + 1, 0.6);
  const sk = skyline(world, { y: 548, seed: 21, T, D, drift: -40 }); gsap.set(sk, { opacity: 0 }); tl.to(sk, { opacity: 1, duration: 1.5 }, st(9));
  const road = box(world, { left: -20, top: 548, width: W + 40, height: H - 548 + 20, background: '#6c757d', borderTop: `6px solid ${INK}`, opacity: 0 }); tl.to(road, { opacity: 1, duration: 1.2 }, st(9));
  bus(world, { x: 0, y: 548, s: 0.9, T: st(10) + 0.5, from: -520, to: 1400, D: 8 }); sfx('whoosh', st(10) + 0.8, 0.5);
  const line = [['rahim', 380, 'DHAKA', 1.0], ['priya', 520, 'DELHI', 2.0], ['amina', 660, 'KARACHI', 3.0], ['kiran', 800, null], ['chidi', 940, 'LAGOS', 6.0], ['kofi', 1080, 'ACCRA', 7.2]];
  line.forEach((x, i) => {
    const p = actor(x[0], { x: x[1], y: 560, s: 1.05 }, st(9) - 0.2, T + D + 1); tl.fromTo(p.g, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.6)' }, st(9) + 0.8 + i * 0.5); p.emote('happy', st(9) + 2 + i * 0.3);
    p.arm('f', -150 + (i % 2) * 20, -20, st(10) + 0.4 + i * 0.2, 0.5); p.arm('f', -140, -50, st(10) + 1.6 + i * 0.2, 0.4);
    if (x[2]) card(world, { x: x[1], y: 300, w: 150, h: 44, html: x[2], size: 22, bg: PP.white, T: st(10) + x[3], rot: i % 2 ? 3 : -3, r: 12 }); });
  // camera: gentle push, then a slow pull-back at the end
  tl.fromTo(world, { scale: 1 }, { scale: 1.04, duration: st(9) - T, ease: 'none' }, T); tl.to(world, { scale: 1, duration: 4, ease: 'sine.inOut' }, st(9)); tl.to(world, { scale: 0.96, y: -10, duration: en(10) - st(10), ease: 'sine.inOut' }, st(10));
})();
