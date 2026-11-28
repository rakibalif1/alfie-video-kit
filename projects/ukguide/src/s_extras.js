// ===== SCENE 12 "extras": THE EXTRAS. Noticeboard, five pinned cards flip one by one. =====
(function () {
  const c = S('extras'), w = win('extras'), T = w.T, D = w.D, L = LS('extras');
  const st = (i) => L[i].start, en = (i) => L[i].start + L[i].dur;
  const world = box(c, { left: 0, top: 0, width: W, height: H, transformOrigin: '640px 330px' });
  bgPop(world, { color: PP.sky, T, D });
  skyline(world, { y: 560, seed: 23, T, D, drift: -50, colors: ['#8d99ae', '#a9b4c8', '#b8c0d0'], minH: 120, maxH: 260 });
  ground(world, { y: 560, color: '#6c757d' });
  // board: wooden frame + cork
  const board = box(world, { left: 290, top: 70, width: 800, height: 425, background: '#c98b4f', border: `8px solid #6b4226`, borderRadius: 14, boxShadow: `9px 9px 0 ${INK}`, opacity: 0 });
  box(board, { left: 0, top: 0, width: '100%', height: '100%', background: `radial-gradient(circle, rgba(60,30,10,.28) 2px, transparent 3px) 0 0/16px 16px`, borderRadius: 8 });
  pop(board, T + 0.2, { from: 0.8, sfx: 'whoosh', vol: 0.5 });
  tl.fromTo(board, { y: 0 }, { y: -4, duration: 2.5, yoyo: true, repeat: Math.floor(D / 2.5), ease: 'sine.inOut' }, T);
  // cast: Priya + Amina left (face right), Kofi right (flipped)
  const priya = cast(world, 'priya', { x: 90, y: 560, s: 1.0, T, D }); priya.breathe(T, D);
  const amina = cast(world, 'amina', { x: 205, y: 560, s: 1.0, T, D }); amina.breathe(T, D);
  const kofi = cast(world, 'kofi', { x: 1185, y: 560, s: 1.0, flip: true, T, D }); kofi.breathe(T, D);
  [priya, amina, kofi].forEach((p) => p.emote('happy', T + 0.5));
  // card data: [title, detail, icon, colour, x, y, line index, delay in line]
  const defs = [
    ['COUNCIL TAX', 'Register. Discounts may apply', 'house', PP.yellow, 420, 192, 1, 0.4],
    ['DRIVING', '12 months, then UK licence', 'car', PP.sky, 690, 192, 2, 0.4],
    ['SCHOOL', 'Apply via your local council', 'school', PP.mint, 960, 192, 3, 0.4],
    ['TV LICENCE', 'Only live TV or iPlayer', 'tv', '#ffc8dd', 555, 388, 3, null],
    ['ENGLISH', 'Free or cheap classes', 'book', PP.orange, 825, 388, 4, 0.4]];
  defs[3][7] = L[3].dur * 0.55;
  const cw = 240, ch = 180, front = [], icons = [];
  defs.forEach((d, i) => {
    const rot = [-2, 1.5, -1.5, 2, -1][i], card0 = box(world, { left: d[4] - cw / 2, top: d[5] - ch / 2, width: cw, height: ch, opacity: 0 });
    const back = box(card0, { left: 0, top: 0, width: cw, height: ch, background: PP.cream, border: `5px solid ${INK}`, borderRadius: 16, boxShadow: `7px 7px 0 ${INK}`, boxSizing: 'border-box', font: `900 90px/${ch - 10}px ${FONT}`, color: '#adb5bd', textAlign: 'center' }, '?');
    const fr = box(card0, { left: 0, top: 0, width: cw, height: ch, background: d[3], border: `5px solid ${INK}`, borderRadius: 16, boxShadow: `7px 7px 0 ${INK}`, boxSizing: 'border-box', opacity: 0 });
    const ic = box(fr, { left: (cw - 10) / 2 - 29, top: 4, width: 58, height: 58, transformOrigin: '50% 60%', filter: `drop-shadow(3px 3px 0 ${INK})` }, icon(d[2], 58, PP.white));
    box(fr, { left: 0, top: 70, width: cw - 10, textAlign: 'center', font: `900 29px/1.1 ${FONT}`, color: INK }, d[0]);
    box(fr, { left: 8, top: 108, width: cw - 26, textAlign: 'center', font: `800 22px/1.12 Arial, sans-serif`, color: INK }, d[1]);
    box(card0, { left: cw / 2 - 13, top: -12, width: 26, height: 26, borderRadius: 13, background: PP.red, border: `4px solid ${INK}`, boxShadow: '2px 3px 0 rgba(0,0,0,.4)' });
    gsap.set(card0, { rotation: rot });
    // pinned face-down in turn, then flipped at its line
    pop(card0, T + 0.6 + i * 0.25, { from: 0.3, rot, sfx: 'pop', vol: 0.4 });
    const f = st(d[6]) + d[7];
    tl.to(back, { scaleX: 0, duration: 0.2, ease: 'power2.in' }, f); tl.set(back, { opacity: 0 }, f + 0.2);
    tl.set(fr, { opacity: 1, scaleX: 0 }, f + 0.2); tl.to(fr, { scaleX: 1, duration: 0.25, ease: 'back.out(2)' }, f + 0.2);
    tl.to(card0, { y: -10, scale: 1.08, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' }, f + 0.1);
    sfx('swish', f, 0.5); sfx('chime', f + 0.3, 0.45);
    front.push(card0); icons.push(ic);
  });
  const t = (i) => st(defs[i][6]) + defs[i][7] + 0.6;
  // simple animated icons, one per card
  tl.to(icons[0], { rotation: 8, scale: 1.15, duration: 0.3, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t(0));            // house wobbles
  tl.fromTo(icons[1], { x: -70 }, { x: 70, duration: 1.4, ease: 'power1.inOut', yoyo: true, repeat: 5 }, t(1));              // car drives across
  tl.to(icons[2], { rotation: -10, duration: 0.18, yoyo: true, repeat: 9, ease: 'sine.inOut' }, t(2));                       // school bell shake
  tl.to(icons[3], { opacity: 0.35, duration: 0.12, yoyo: true, repeat: 9 }, t(3));                                          // tv flicker
  tl.to(icons[4], { scaleX: -1, duration: 0.35, yoyo: true, repeat: 5, ease: 'power2.inOut' }, t(4));                      // book page flip
  // driving: the 12-months moment pulses (about a third into the line), then theory-test nudge
  tl.to(front[1], { scale: 1.2, duration: 0.3, yoyo: true, repeat: 1, ease: 'back.out(2)' }, st(2) + L[2].dur * 0.3); sfx('ding', st(2) + L[2].dur * 0.3, 0.5);
  tl.to(front[1], { scale: 1.12, duration: 0.3, yoyo: true, repeat: 1 }, st(2) + L[2].dur * 0.55); sfx('tick', st(2) + L[2].dur * 0.55, 0.6);
  // footer
  const ft = card(world, { x: 690, y: 530, w: 840, h: 58, html: 'CHECK GOV.UK FOR YOUR OWN SITUATION', size: 28, bg: PP.navy, color: PP.yellow, T: Math.min(st(4) + 2.2, en(4) - 3), rot: -1 });
  sfx('stamp', Math.min(st(4) + 2.2, en(4) - 3) + 0.2, 0.7);
  // characters react to each card
  priya.arm('f', -60, -40, st(1) + 0.4, 0.5); priya.arm('f', 0, 0, st(2) - 0.3, 0.5); priya.head(8, st(1), 0.5);
  kofi.arm('f', -70, -30, st(2) + 0.4, 0.5); kofi.arm('f', 0, 0, st(3) - 0.3, 0.5); kofi.emote('surprised', st(2) + L[2].dur * 0.3); kofi.emote('happy', st(3));
  amina.arm('f', -60, -40, st(3) + 0.4, 0.5); amina.emote('sly', st(3) + L[3].dur * 0.55); amina.arm('f', 0, 0, st(4) - 0.3, 0.5);
  amina.arm('f', -150, -20, st(4) + 0.5, 0.5); priya.arm('f', -150, -20, st(4) + 0.6, 0.5); kofi.arm('f', -150, -20, st(4) + 0.7, 0.5);
  [priya, amina, kofi].forEach((p) => p.emote('happy', st(4) + 0.5));
  // camera drift
  tl.fromTo(world, { scale: 1 }, { scale: 1.04, duration: D, ease: 'none' }, T);
})();
