// ===== SCENE 8 "gp": STEP 6, REGISTER WITH A GP. =====
(function () {
  const c = S('gp'), w = win('gp'), T = w.T, D = w.D, L = LS('gp');
  const st = (i) => L[i].start, en = (i) => L[i].start + L[i].dur;
  const world = box(c, { left: 0, top: 0, width: W, height: H, transformOrigin: '640px 400px' });
  bgPop(world, { color: '#caf0f8', T, D });
  skyline(world, { y: 540, seed: 31, T, D, drift: -50, colors: ['#9db4c0', '#b7c9d4', '#c9d6df'], minH: 120, maxH: 250 });
  ground(world, { y: 540, color: '#8d99ae' });
  // surgery: own simple cross sign, no NHS logo
  box(world, { left: 760, top: 200, width: 470, height: 340, background: '#fff8e1', border: `6px solid ${INK}`, borderRadius: 8 });
  box(world, { left: 790, top: 230, width: 260, height: 130, background: '#bde0fe', border: `5px solid ${INK}` });
  box(world, { left: 1110, top: 370, width: 90, height: 170, background: PP.blue, border: `5px solid ${INK}` });
  const sign = box(world, { left: 800, top: 150, width: 380, height: 66, background: PP.blue, border: `6px solid ${INK}`, borderRadius: 12, boxShadow: `6px 6px 0 ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', font: `900 34px ${FONT}`, color: '#fff', opacity: 0 }, icon('cross', 46) + 'GP SURGERY');
  pop(sign, T + 0.3, { from: 0.5, sfx: 'pop', vol: 0.5 });
  // cast
  const kofi = cast(world, 'kofi', { x: 150, y: 560, s: 1.2, T, D }); kofi.breathe(T, D);
  const priya = cast(world, 'priya', { x: 900, y: 560, s: 1.2, flip: true, T, D }); priya.breathe(T, D);
  box(world, { left: 800, top: 470, width: 200, height: 80, background: '#b5835a', border: `5px solid ${INK}`, borderRadius: 6 });
  const kiran = cast(world, 'kiran', { x: 1130, y: 560, s: 1.2, flip: true, T, D }); kiran.breathe(T, D); kiran.g.style.opacity = 0;
  talkLines(kiran, 'gp', 'K');
  tl.fromTo(kofi.g, { x: -320 }, { x: 0, duration: 1.8, ease: 'power2.out' }, T + 0.2); kofi.walk(T + 0.2, 1.8, 0, 0.5, 1.5);
  sfx('ding', T + 1.8, 0.4);
  // beat 1 (find a GP): phone with search + map + pin drop
  const mapHtml = `<div style="position:absolute;left:0;top:0;width:236px;height:84px;background:${PP.blue};color:#fff;font:900 26px/84px Arial,sans-serif;text-align:center">Find a GP</div>
    <svg style="position:absolute;left:0;top:84px" width="236" height="388" viewBox="0 0 236 388"><rect width="236" height="408" fill="#b7e4c7"/><path d="M0 120 H236 M0 270 H236 M70 0 V408 M170 0 V408" stroke="#fff" stroke-width="14"/><path d="M0 200 L236 330" stroke="#8ecae6" stroke-width="22"/><circle cx="60" cy="90" r="9" fill="#adb5bd"/><circle cx="190" cy="220" r="9" fill="#adb5bd"/><circle cx="110" cy="340" r="9" fill="#adb5bd"/></svg>`;
  const ph = phone(world, { x: 480, y: 330, s: 0.78, html: mapHtml, T: st(1) + 0.3 });
  const pin = box(ph.screen, { left: 82, top: 150, width: 72, height: 72, opacity: 0 }, icon('pin', 72));
  tl.fromTo(pin, { y: -200, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'bounce.out' }, st(1) + 2.6); sfx('pop', st(1) + 2.7, 0.7); sfx('chime', st(1) + 3.2, 0.5);
  tl.to(ph.el, { opacity: 0, x: -60, duration: 0.3 }, st(2) + 0.2);
  kofi.arm('f', -60, -30, st(1) + 0.6, 0.5); kofi.arm('f', 0, 0, st(2), 0.5);
  // beat 2 (the form): ticks on Name/Date of birth/Address, ID and Proof of address crossed out
  const form = card(world, { x: 560, y: 262, w: 430, h: 380, html: '', bg: PP.white, T: st(2) + 0.3, rot: -2 });
  box(form, { left: 0, top: 10, width: 420, textAlign: 'center', font: `900 30px ${FONT}`, color: PP.blue }, 'REGISTER');
  const rows = ['Name', 'Date of birth', 'Address', 'ID', 'Proof of address'];
  rows.forEach((t, i) => {
    const no = i > 2, tt = st(2) + (no ? 4.3 + (i - 3) * 1.0 : 1.2 + i * 1.0);
    const r = box(form, { left: 22, top: 62 + i * 60, width: 376, height: 50, background: no ? '#dee2e6' : '#fff', border: `4px solid ${INK}`, borderRadius: 10, display: 'flex', alignItems: 'center', gap: '12px', padding: '0 12px', boxSizing: 'border-box', font: `800 27px Arial`, color: no ? '#868e96' : INK, textDecoration: no ? 'line-through' : 'none', opacity: 0 }, (no ? icon('xmark', 34) : icon('tick', 34)) + t);
    tl.to(r, { opacity: 1, duration: 0.25 }, tt); sfx(no ? 'buzz' : 'chime', tt, no ? 0.35 : 0.5); });
  stamp(world, { x: 640, y: 492, w: 360, size: 34, text: 'NOT REQUIRED', color: PP.red, T: st(2) + 6.3, out: st(4) - 0.2, rot: -6 });
  tl.to(form, { opacity: 0, duration: 0.3 }, st(4) - 0.2);
  // beat 3 (Kiran): slides in with the line
  kiran.g.style.opacity = 1; tl.fromTo(kiran.g, { x: 300 }, { x: 0, duration: 0.8, ease: 'power3.out' }, st(3) - 0.4); kiran.walk(st(3) - 0.4, 0.8, 0, 0.5, 1.5); kiran.arm('f', -80, -50, st(3) + 0.2, 0.4);
  speech(world, { x: 1000, y: 110, w: 420, text: L[3].text, who: 'KIRAN', color: '#2a9d8f', tail: 'right', T: st(3), D: L[3].dur + 0.4 });
  // beat 4 (they are full: ask for it in writing)
  speech(world, { x: 700, y: 130, w: 300, text: "We're full.", who: 'RECEPTION', color: PP.purple, tail: 'right', T: st(4) + 0.6, D: 3 });
  priya.emote('sad', st(4) + 0.6); kofi.emote('sad', st(4) + 0.6);
  card(world, { x: 400, y: 190, w: 380, h: 120, html: 'Please tell me why, in writing', size: 30, bg: PP.yellow, T: st(4) + 3.2, rot: -3, out: st(5) - 0.3 }); kofi.arm('f', -120, -30, st(4) + 3.2, 0.5); kofi.emote('normal', st(4) + 3.2);
  card(world, { x: 490, y: 340, w: 400, h: 74, html: 'Healthwatch can help', size: 30, bg: PP.mint, T: st(4) + 8.2, rot: 2, out: st(5) - 0.3 });
  tl.to(kofi.g, { x: 40, duration: 1.2, ease: 'sine.inOut' }, st(4) + 3.2); tl.to(kofi.g, { x: 0, duration: 1, ease: 'sine.inOut' }, st(5) - 1.4);
  // beat 5 (111, 999, pharmacy)
  const three = [['111', 'urgent, not emergency', 'phone', PP.orange, 340, 0.1], ['999', 'emergency', 'phone', PP.red, 640, 0.36], ['PHARMACY', 'small problems', 'cross', PP.mint, 940, 0.62]];
  three.forEach((t, i) => card(world, { x: t[4], y: 215, w: 280, h: 190, bg: t[3], color: i === 1 ? '#fff' : INK, T: st(5) + L[5].dur * t[5], rot: -3 + i * 3, size: 28,
    html: `<div>${icon(t[2], 56)}<div style="font-size:${i === 2 ? 38 : 60}px;line-height:1.05">${t[0]}</div><div style="font-size:24px;line-height:1.1">${t[1]}</div></div>` }));
  sfx('ring', st(5) + L[5].dur * 0.1, 0.5); sfx('ding', st(5) + L[5].dur * 0.62, 0.5);
  priya.emote('happy', st(5)); kofi.emote('happy', st(5) + 1); kofi.arm('f', 0, 0, st(5), 0.4);
  tl.fromTo(world, { scale: 1 }, { scale: 1.05, duration: D, ease: 'none' }, T);
})();
