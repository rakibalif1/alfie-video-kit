// ===== SCENE "bank": STEP 4, A BANK ACCOUNT =====
(function () {
  const c = S('bank'), w = win('bank'), T = w.T, D = w.D, L = LS('bank');
  const st = (i) => L[i].start, en = (i) => L[i].start + L[i].dur;
  const world = box(c, { left: 0, top: 0, width: W, height: H, transformOrigin: '640px 400px' });
  bgPop(world, { color: '#ffe066', T, D });
  ground(world, { y: 545, color: '#6c757d' });
  const doors = box(world, { left: 0, top: 0, width: W, height: H });   // act 1 set: two doors, fades out for act 2
  // two doors
  const door = (x, label, bg, T0, col) => {
    box(doors, { left: x - 150, top: 145, width: 300, height: 401, background: bg, border: `6px solid ${INK}`, borderRadius: '150px 150px 0 0', boxShadow: `8px 8px 0 ${INK}`, opacity: 0 });
    const d = doors.lastChild; pop(d, T0, { from: 0.6, sfx: 'whoosh', vol: 0.4 });
    const sign = card(doors, { x, y: 104, w: 330, h: 64, html: label, size: 26, bg: col, color: '#fff', T: T0 + 0.3, rot: -2 });
    return d;
  };
  door(200, 'HIGH-STREET BANK', '#caf0f8', st(1) + 0.3, PP.blue); door(1080, 'APP BANK', '#d8f3dc', st(1) + 3.0, PP.teal);
  // clerk behind the first door: desk, form, clerk icon
  const clerk = box(doors, { left: 130, top: 225, width: 140, height: 140, opacity: 0 }, icon('user', 140, PP.sky)); pop(clerk, st(1) + 0.9);
  box(doors, { left: 110, top: 360, width: 180, height: 70, background: '#c08457', border: `5px solid ${INK}`, borderRadius: 8, opacity: 0 }); pop(doors.lastChild, st(1) + 1.2, { sfx: false });
  iconBox(doors, { x: 200, y: 392, size: 64, name: 'doc', bg: PP.white, T: st(1) + 1.5, sfx: false });
  // app door: phone with selfie and passport scan, verifying spinner
  const ph = phone(doors, { x: 1080, y: 355, s: 0.76, T: st(1) + 3.4,
    html: `<div style="text-align:center;font:900 22px Arial;padding-top:44px">SELFIE + PASSPORT</div><div style="margin:14px auto 0;width:120px;height:120px;border-radius:60px;background:#ffd6a5;border:5px solid ${INK};position:relative">${icon('user', 110)}</div><div style="margin:12px auto 0;width:170px;height:70px;border:5px dashed ${PP.blue};border-radius:10px;background:#caf0f8;font:900 22px/60px Arial;text-align:center">PASSPORT</div>` });
  const spin = box(ph.screen, { left: 98, top: 372, width: 40, height: 40, border: `7px solid ${PP.grey}`, borderTopColor: PP.blue, borderRadius: 20, opacity: 0 });
  box(ph.screen, { left: 0, top: 422, width: 236, textAlign: 'center', font: `900 24px ${FONT}`, color: PP.blue, opacity: 0 }, 'verifying…'); const vtxt = ph.screen.lastChild;
  tl.to([spin, vtxt], { opacity: 1, duration: 0.3 }, st(1) + 4.3); tl.to(spin, { rotation: 360 * 8, duration: 5.5, ease: 'none' }, st(1) + 4.3); sfx('chime', st(1) + 4.4, 0.5);
  // checklist between the doors (pen ticks)
  const list = card(doors, { x: 640, y: 290, w: 320, h: 270, html: '', bg: PP.cream, T: st(1) + 6.0, rot: 2 });
  ['ID', 'Share code', 'Proof of address'].forEach((t, i) => {
    const row = box(list, { left: 20, top: 24 + i * 74, width: 290, font: `900 28px ${FONT}`, color: INK, display: 'flex', alignItems: 'center', gap: '12px', opacity: 0 }, icon('tick', 40) + t);
    tl.to(row, { opacity: 1, duration: 0.25 }, st(1) + 6.4 + i * 1.3); sfx('tick', st(1) + 6.4 + i * 1.3, 0.8); });
  // characters
  const amina = cast(world, 'amina', { x: 410, y: 560, s: 1.15, T, D }); amina.breathe(T, D);
  const priya = cast(world, 'priya', { x: 870, y: 560, s: 1.15, flip: true, T, D }); priya.breathe(T, D);
  tl.fromTo(amina.g, { x: -520 }, { x: 0, duration: 1.1, ease: 'power3.out' }, T + 0.3); amina.walk(T + 0.3, 1.1, 0, 0.5, 1.5);
  tl.fromTo(priya.g, { x: 520 }, { x: 0, duration: 1.1, ease: 'power3.out' }, T + 0.5); priya.walk(T + 0.5, 1.1, 0, 0.5, 1.5);
  const priya2 = cast(world, 'priya', { x: 420, y: 560, s: 1.15, T, D }); priya2.breathe(T, D); priya2.g.style.opacity = 0;
  // beat 0: "Step four" headline with bank icon
  headline(world, { x: 640, y: 120, text: 'STEP 4: A BANK ACCOUNT', size: 52, color: PP.yellow, T: T + 0.4, w: 900, out: st(1) + 0.1 });
  iconBox(world, { x: 640, y: 330, size: 150, name: 'bank', bg: PP.sky, T: T + 1.2, out: st(1) + 0.1 });
  // beat 2: proof of address — doors leave, question mark, ideas fly in
  tl.to(doors, { opacity: 0, duration: 0.4 }, st(2) - 0.1);
  tl.to(priya.g, { x: 600, opacity: 0, duration: 0.4 }, st(2) - 0.1); tl.to(amina.g, { x: -150, duration: 0.8, ease: 'power2.inOut' }, st(2));
  amina.emote('sad', st(2)); amina.arm('f', -100, -90, st(2) + 0.4, 0.5);
  const q = burst(world, { x: 260, y: 130, r: 70, color: PP.yellow, T: st(2) + 0.4, out: st(3) - 0.2 }); box(world, { left: 200, top: 85, width: 120, textAlign: 'center', font: `900 80px ${FONT}`, color: INK, opacity: 0 }, '?'); pop(world.lastChild, st(2) + 0.5, { sfx: false, out: st(3) - 0.2 });
  headline(world, { x: 760, y: 80, text: 'PROOF OF ADDRESS?', size: 44, color: '#fff', T: st(2) + 0.3, w: 700, out: st(3) - 0.2 });
  [['house', 'Tenancy agreement', 2.2, PP.mint], ['doc', 'Letter from your college or employer', 4.4, PP.white], ['bank', 'Council letter', 6.0, PP.sky]].forEach((x, i) => {
    const cd = card(world, { x: 790, y: 190 + i * 110, w: 560, h: 92, html: icon(x[0], 56) + `<span style="margin-left:14px">${x[1]}</span>`, size: 28, bg: x[3], T: st(2) + x[2], rot: -2 + i * 2, out: st(3) - 0.2, sfx: false });
    tl.fromTo(cd, { x: 700 }, { x: 0, duration: 0.5, ease: 'power3.out' }, st(2) + x[2]); sfx('whoosh', st(2) + x[2], 0.4); });
  card(world, { x: 790, y: 540, w: 560, h: 70, html: 'Ask the bank what they accept', size: 28, bg: PP.yellow, T: st(2) + 8.3, rot: 1, out: st(3) - 0.2 });
  // beat 3: basic account badge
  tl.to(amina.g, { x: -220, duration: 0.6 }, st(3) - 0.2); amina.arm('f', 0, 0, st(3), 0.4); amina.emote('normal', st(3));
  tl.set(priya2.g, { opacity: 1 }, st(3) - 0.2); priya2.emote('happy', st(3) + 1);
  const bd = box(world, { left: 560, top: 100, width: 640, height: 330, opacity: 0 }); const sh = box(bd, { left: 0, top: 20, width: 220, height: 250 }, icon('shield', 220));
  box(bd, { left: 190, top: 40, width: 440, background: PP.green, color: '#fff', border: `6px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${INK}`, font: `900 50px/1.05 ${FONT}`, textAlign: 'center', padding: '22px 12px', boxSizing: 'border-box', WebkitTextStroke: `2px ${INK}`, paintOrder: 'stroke fill' }, 'BASIC ACCOUNT');
  pop(bd, st(3) + 1.2, { rot: -2, out: st(4) - 0.2 }); sfx('ding', st(3) + 1.4, 0.7);
  card(world, { x: 880, y: 330, w: 460, h: 70, html: 'no credit check', size: 34, bg: PP.white, T: st(3) + 5.4, rot: 2, out: st(4) - 0.2 });
  card(world, { x: 880, y: 415, w: 460, h: 70, html: 'no overdraft', size: 34, bg: PP.white, T: st(3) + 4.3, rot: -2, out: st(4) - 0.2 });
  // beat 4: first payslip arrives on the phone with a coin sound; "do not pay" stamp
  const ph2 = phone(world, { x: 800, y: 340, s: 0.8, T: st(4) + 0.2, html: `<div style="padding:48px 14px 0;text-align:center"><div style="font:900 30px ${FONT}">FIRST PAYSLIP</div><div style="margin-top:14px">${icon('pound', 130)}</div></div>` });
  sfx('chime', st(4) + 0.9, 0.6); sfx('coin', st(4) + 1.3, 0.8); tl.to(ph2.el, { x: '+=0' }, st(4));
  priya2.arm('f', -60, -90, st(4) + 0.3, 0.5); priya2.emote('happy', st(4) + 0.9);
  stamp(world, { x: 1075, y: 250, w: 340, size: 38, text: 'IT IS FREE', color: PP.green, T: st(4) + 3.2, out: en(4) + 0.5, rot: -6 });
  card(world, { x: 1075, y: 360, w: 340, h: 100, html: 'Never pay to arrange an account', size: 26, bg: PP.white, T: st(4) + 3.8, rot: 3, out: en(4) + 0.5 });
  // camera
  tl.fromTo(world, { scale: 1 }, { scale: 1.05, duration: D, ease: 'none' }, T);
})();
