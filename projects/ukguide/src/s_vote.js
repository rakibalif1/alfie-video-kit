// ===== SCENE 10 "vote": STEP 8, REGISTER TO VOTE (carefully). Serious but friendly. =====
(function () {
  const c = S('vote'), w = win('vote'), T = w.T, D = w.D, L = LS('vote');
  const st = (i) => L[i].start, en = (i) => L[i].start + L[i].dur, rel = (i, f) => L[i].start + L[i].dur * f;
  const world = box(c, { left: 0, top: 0, width: W, height: H, transformOrigin: '640px 400px' });
  bgPop(world, { color: '#e2d4f0', T, D });
  skyline(world, { y: 560, seed: 41, T, D, drift: -50, colors: ['#9a8fb5', '#aea4c6', '#c1b8d6'], minH: 110, maxH: 240 });
  ground(world, { y: 560, color: '#6c757d' });
  const kiran = cast(world, 'kiran', { x: 150, y: 560, s: 1.2, T, D }); kiran.breathe(T, D);
  const amina = cast(world, 'amina', { x: 320, y: 560, s: 1.2, T, D }); amina.breathe(T, D);
  tl.fromTo(kiran.g, { x: -300 }, { x: 0, duration: 1.2, ease: 'power2.out' }, T + 0.2); kiran.walk(T + 0.2, 1.2, 0, 0.5, 1.5);
  tl.fromTo(amina.g, { x: -300 }, { x: 0, duration: 1.2, ease: 'power2.out' }, T + 0.5); amina.walk(T + 0.5, 1.2, 0, 0.5, 1.5);
  const OUT = (el, t) => tl.to(el, { opacity: 0, duration: 0.3 }, t);
  const gone = [];   // elements that leave together at the end of each beat
  // ---- beat A (line 0): polling station door and a ballot box, a ballot paper drops in
  const bld = box(world, { left: 780, top: 230, width: 440, height: 330, background: '#fff8e1', border: `6px solid ${INK}`, borderRadius: 8, opacity: 0 });
  const door = box(world, { left: 950, top: 360, width: 100, height: 200, background: PP.red, border: `6px solid ${INK}`, borderRadius: '50px 50px 0 0', opacity: 0 });
  const knob = box(world, { left: 1028, top: 465, width: 14, height: 14, borderRadius: 7, background: PP.yellow, border: `3px solid ${INK}`, opacity: 0 });
  [bld, door, knob].forEach((e, i) => pop(e, T + 0.4 + i * 0.1, { from: 0.8, sfx: i ? false : 'pop', vol: 0.5 }));
  const sign = card(world, { x: 1000, y: 180, w: 400, h: 70, html: 'POLLING STATION', size: 32, bg: PP.navy, color: '#fff', T: T + 0.9, rot: -2 });
  const bbox = box(world, { left: 610, top: 440, width: 150, height: 120, background: PP.blue, border: `6px solid ${INK}`, borderRadius: 8, boxShadow: `6px 6px 0 ${INK}`, opacity: 0 });
  box(bbox, { left: 28, top: 14, width: 88, height: 12, background: INK, borderRadius: 6 });
  pop(bbox, T + 1.4, { from: 0.5, sfx: 'pop', vol: 0.5 });
  const paper = box(world, { left: 650, top: 330, width: 70, height: 100, background: '#fff', border: `5px solid ${INK}`, opacity: 0 }, icon('tick', 40));
  paper.firstChild.style.cssText += ';position:absolute;left:11px;top:25px';
  tl.fromTo(paper, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, T + 2.5); tl.to(paper, { y: 100, duration: 0.7, ease: 'power2.in' }, T + 2.9); tl.to(paper, { opacity: 0, duration: 0.1 }, T + 3.55); sfx('swish', T + 2.9, 0.5); sfx('thud', T + 3.5, 0.5);
  [bld, door, knob, sign, bbox].forEach((e) => OUT(e, st(1) - 0.2));
  // ---- beat B (line 1): GOV.UK-styled page (own design) with the eligibility checklist
  const page = card(world, { x: 770, y: 290, w: 600, h: 440, html: '', bg: PP.white, T: st(1) + 0.2, rot: -1, out: st(2) - 0.2 });
  box(page, { left: 0, top: 0, width: 590, height: 60, background: PP.navy, color: '#fff', font: `900 30px/60px ${FONT}`, padding: '0 20px', boxSizing: 'border-box', borderRadius: '10px 10px 0 0' }, 'GOV.UK');
  box(page, { left: 0, top: 68, width: 590, textAlign: 'center', font: `900 42px ${FONT}`, color: PP.blue }, 'Register to vote');
  [['British citizen', 130, 66, 0.25], ['Irish citizen', 204, 66, 0.5], ['Citizen of some Commonwealth countries with permission to be in the UK', 278, 124, 0.7]].forEach((r, i) => {
    const row = box(page, { left: 20, top: r[1], width: 550, height: r[2], background: PP.grey, border: `4px solid ${INK}`, borderRadius: 12, display: 'flex', alignItems: 'center', gap: '12px', padding: '0 14px', boxSizing: 'border-box', font: `800 ${i === 2 ? 28 : 32}px/1.1 Arial`, color: INK, opacity: 0 }, icon('tick', 44) + `<div>${r[0]}</div>`);
    tl.to(row, { opacity: 1, duration: 0.25 }, rel(1, r[3])); sfx('tick', rel(1, r[3]), 0.7); sfx('chime', rel(1, r[3]) + 0.05, 0.3); });
  kiran.arm('f', -70, -30, st(1) + 0.5, 0.5); kiran.arm('f', 0, 0, st(2) - 0.3, 0.5);
  // ---- beat C (line 2): six Commonwealth countries ticked, as plain-text badges (no flags)
  headline(world, { x: 780, y: 80, text: 'COMMONWEALTH', size: 46, color: PP.yellow, T: st(2) + 0.1, w: 600, out: st(3) - 0.2 });
  [['India', PP.orange], ['Pakistan', PP.green], ['Bangladesh', PP.teal], ['Sri Lanka', PP.purple], ['Nigeria', PP.blue], ['Ghana', PP.pink]].forEach((n, i) => {
    const x = 590 + (i % 3) * 210, y = 200 + Math.floor(i / 3) * 110, t0 = rel(2, 0.1 + i * 0.045);
    card(world, { x, y, w: 200, h: 84, html: `<div>${n[0]}</div>`, size: n[0].length > 8 ? 26 : 30, bg: n[1], color: '#fff', T: t0, rot: [-3, 2, -2, 3, -1, 2][i], out: st(3) - 0.2 });
    iconBox(world, { x: x + 78, y: y - 38, size: 50, name: 'tick', bg: PP.white, T: t0 + 0.4, out: st(3) - 0.2, sfx: false }); sfx('tick', t0 + 0.4, 0.5); });
  card(world, { x: 800, y: 430, w: 600, h: 100, html: 'Citizen + permission to be here = you can usually register', size: 28, bg: PP.white, T: rel(2, 0.78), rot: 1, out: st(3) - 0.2 });
  amina.emote('happy', st(2)); amina.arm('f', -150, -20, rel(2, 0.8), 0.5); amina.arm('f', 0, 0, st(3) - 0.2, 0.5);
  // ---- beat D (line 3): Nepal, grey question mark, then the rules differ and check GOV.UK
  const np = card(world, { x: 700, y: 250, w: 360, h: 240, html: `<div><div style="font:900 90px/1 Arial,sans-serif;color:#868e96">?</div><div style="font-size:46px">NEPAL</div><div style="font-size:28px;color:#495057">not Commonwealth</div></div>`, bg: '#dee2e6', T: st(3) + 0.2, rot: -2, out: en(3) + 0.3 });
  card(world, { x: 1100, y: 190, w: 300, h: 120, html: 'Rules can differ for each person', size: 28, bg: PP.cream, T: rel(3, 0.4), rot: 3, out: en(3) + 0.3 });
  card(world, { x: 1100, y: 360, w: 300, h: 140, html: `<div>${icon('shield', 44)}<div>Check GOV.UK: Register to vote</div></div>`, size: 28, bg: PP.mint, T: rel(3, 0.68), rot: -2, out: en(3) + 0.3 });
  amina.emote('sad', st(3) + 0.2); kiran.arm('f', -60, -50, rel(3, 0.68), 0.5); kiran.arm('f', 0, 0, en(3), 0.4);
  // ---- beat E (line 4): not eligible = do not register; red "!" and a legal scale
  const bang = box(world, { left: 560, top: 250, width: 140, height: 140, borderRadius: 70, background: PP.red, border: `7px solid ${INK}`, boxShadow: `7px 7px 0 ${INK}`, color: '#fff', font: `900 100px/130px ${FONT}`, textAlign: 'center', opacity: 0 }, '!');
  pop(bang, st(4) + 0.1, { sfx: 'buzz', vol: 0.5, out: en(4) + 0.3 });
  const scale = box(world, { left: 760, top: 240, width: 170, height: 170, filter: `drop-shadow(5px 5px 0 ${INK})`, opacity: 0 }, `<svg viewBox="0 0 120 120" width="170" height="170" style="overflow:visible"><path d="M60 16 V100 M30 102 H90 M18 38 H102" stroke="${INK}" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M18 38 L6 72 H30Z M102 38 L90 72 H114Z" fill="#ffd166" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><circle cx="60" cy="16" r="8" fill="#ffd166" stroke="${INK}" stroke-width="5"/></svg>`);
  pop(scale, st(4) + 0.4, { sfx: 'thud', vol: 0.5, out: en(4) + 0.3 }); tl.to(scale, { rotation: 4, duration: 0.5, yoyo: true, repeat: 4, ease: 'sine.inOut' }, st(4) + 0.9);
  card(world, { x: 760, y: 150, w: 600, h: 80, html: 'Not eligible? Do not register.', size: 36, bg: PP.red, color: '#fff', T: st(4) + 0.3, rot: -1, out: en(4) + 0.3 });
  kiran.emote('angry', st(4)); kiran.arm('f', -90, -60, st(4) + 0.2, 0.4); kiran.arm('f', 0, 0, en(4), 0.4);
  // ---- beat F (line 5): if eligible, five minutes, house + arrow + credit report
  const five = card(world, { x: 770, y: 130, w: 560, h: 90, html: `Eligible? Register: about 5 minutes`, size: 32, bg: PP.green, color: '#fff', T: st(5) + 0.3, rot: -1 });
  iconBox(world, { x: 580, y: 300, size: 130, name: 'house', bg: PP.white, T: rel(5, 0.38), label: 'Electoral roll', lsize: 26 });
  headline(world, { x: 770, y: 255, text: '→', size: 110, color: PP.yellow, T: rel(5, 0.5), w: 160, rot: 0 });
  iconBox(world, { x: 960, y: 300, size: 130, name: 'doc', bg: PP.white, T: rel(5, 0.58), label: 'Credit report', lsize: 26 });
  card(world, { x: 770, y: 490, w: 780, h: 100, html: 'On the electoral roll = easier to prove your address', size: 30, bg: PP.white, T: rel(5, 0.66), rot: 1 });
  sfx('ding', rel(5, 0.66), 0.5); amina.emote('happy', st(5)); kiran.emote('happy', st(5)); amina.arm('f', -60, -40, st(5) + 0.5, 0.5);
  tl.fromTo(world, { scale: 1 }, { scale: 1.04, duration: D, ease: 'none' }, T);
})();
