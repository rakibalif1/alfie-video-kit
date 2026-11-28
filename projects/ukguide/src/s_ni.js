// ===== SCENE 7 "ni": STEP 5, NATIONAL INSURANCE NUMBER (and first payslip). =====
(function () {
  const c = S('ni'), w = win('ni'), T = w.T, D = w.D, L = LS('ni');
  const st = (i) => L[i].start, en = (i) => L[i].start + L[i].dur, rel = (i, f) => L[i].start + L[i].dur * f;
  const world = box(c, { left: 0, top: 0, width: W, height: H, transformOrigin: '640px 400px' });
  bgPop(world, { color: PP.yellow, T, D });
  const dark = box(world, { left: -60, top: -60, width: W + 120, height: H + 120, background: '#1d3557', opacity: 0 });   // cool tint for the scam beat
  tl.to(dark, { opacity: 0.55, duration: 0.5 }, st(3) - 0.2); tl.to(dark, { opacity: 0, duration: 0.6 }, st(6) + L[6].dur - 0.3);
  ground(world, { y: 560, color: '#6c757d' });
  const hide = (el, t0, t1) => { tl.to(el, { opacity: 0, duration: 0.3 }, t0); };
  // ---- beat A (line 0): Rahim and the big NI card with a placeholder pattern, typed out
  const rahim = cast(world, 'rahim', { x: 250, y: 560, s: 1.3, T, D }); rahim.breathe(T, D);
  const ni = card(world, { x: 700, y: 290, w: 560, h: 300, html: '', bg: PP.white, T: T + 0.5, rot: -2, out: st(1) - 0.2 });
  box(ni, { left: 0, top: 0, width: 550, height: 80, background: PP.blue, color: '#fff', font: `900 40px/80px ${FONT}`, textAlign: 'center', letterSpacing: '3px' }, 'NI NUMBER');
  const pat = box(ni, { left: 0, top: 130, width: 550, textAlign: 'center', font: `900 66px ${FONT}`, color: INK, letterSpacing: '2px' }, '');
  pat.innerHTML = 'QQ 12 34 56 C'.split('').map((ch) => `<span style="white-space:pre;opacity:0">${ch}</span>`).join('');
  [...pat.children].forEach((s, i) => { tl.to(s, { opacity: 1, duration: 0.05 }, st(0) + 1.5 + i * 0.18); if (i !== 2 && i !== 5 && i !== 8 && i !== 11) sfx('tick', st(0) + 1.5 + i * 0.18, 0.5); });
  iconBox(world, { x: 450, y: 470, size: 90, name: 'pound', bg: PP.white, T: rel(0, 0.55), out: st(1) - 0.2 }); iconBox(world, { x: 560, y: 470, size: 90, name: 'doc', bg: PP.white, T: rel(0, 0.62), out: st(1) - 0.2 });
  // ---- beat B (line 1): Rahim starts at a cafe counter; share-code notice floats
  const walkX = 640, ex = st(1) - 0.3;
  tl.to(rahim.g, { x: walkX, duration: 1.2, ease: 'sine.inOut' }, ex); rahim.walk(ex, 1.2, 0, 0.5, 1.5);
  const cafe = [];
  cafe.push(box(world, { left: 560, top: 150, width: 260, height: 64, background: PP.pink, border: `6px solid ${INK}`, borderRadius: 12, boxShadow: `6px 6px 0 ${INK}`, color: '#fff', font: `900 40px/52px ${FONT}`, textAlign: 'center', opacity: 0 }, 'CAFÉ'));
  const counter = box(world, { left: 700, top: 440, width: 420, height: 120, background: '#b5835a', border: `6px solid ${INK}`, borderRadius: 8, opacity: 0 }); box(counter, { left: -6, top: -6, width: 420, height: 22, background: '#8a5a33', border: `6px solid ${INK}` });
  const cup = box(world, { left: 990, top: 392, width: 46, height: 44, background: '#fff', border: `5px solid ${INK}`, borderRadius: '4px 4px 18px 18px', opacity: 0 });
  [cafe[0], counter, cup].forEach((e, i) => pop(e, st(1) + 0.1 + i * 0.15, { sfx: i ? false : 'pop', vol: 0.5 }));
  const rtw = card(world, { x: 330, y: 170, w: 430, h: 110, html: 'Right to work: share code', size: 32, bg: PP.mint, T: rel(1, 0.45), rot: -3 });
  tl.to(rtw, { y: -10, duration: 1.1, yoyo: true, repeat: 8, ease: 'sine.inOut' }, rel(1, 0.45) + 0.5);
  const way = card(world, { x: 330, y: 330, w: 430, h: 100, html: 'NI number: on its way', size: 32, bg: PP.white, T: rel(1, 0.8), rot: 2 }); iconBox(world, { x: 130, y: 330, size: 80, name: 'clock', bg: PP.white, T: rel(1, 0.8) + 0.2, out: st(2) - 0.3 });
  [rtw, way, cafe[0], counter, cup].forEach((e) => hide(e, st(2) - 0.3));
  tl.to(rahim.g, { x: -60, duration: 1.0, ease: 'sine.inOut' }, st(2) - 0.4); rahim.walk(st(2) - 0.4, 1.0, 0, 0.5, 1.5);
  // ---- beat C (line 2): world map, red cross abroad, pin on the UK, GOV.UK, calendar, BRP/eVisa
  const map = card(world, { x: 640, y: 270, w: 620, h: 340, html: '', bg: '#a9d6e5', T: st(2) + 0.3, rot: -1, out: st(3) - 0.3 });
  const land = (pts) => `<polygon points="${pts}" fill="#b7e4c7" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
  box(map, { left: 0, top: 0, width: 610, height: 330, overflow: 'hidden' }, `<svg viewBox="0 0 610 330" width="610" height="330">${land('40,60 130,35 200,60 190,120 150,170 110,150 60,110')}${land('150,185 200,190 215,250 185,320 160,260')}${land('290,60 330,50 350,80 320,110 290,100')}${land('290,120 350,115 380,170 350,260 320,250 295,180')}${land('350,45 520,40 570,100 520,170 450,190 400,150 360,110')}${land('490,235 560,230 575,285 510,290')}<polygon points="268,62 281,55 286,80 271,86" fill="#ffe066" stroke="${INK}" stroke-width="4"/></svg>`);
  iconBox(world, { x: 760, y: 240, size: 80, name: 'xmark', bg: PP.white, T: rel(2, 0.05), out: st(3) - 0.3 });
  card(world, { x: 760, y: 330, w: 340, h: 54, html: 'Apply from abroad', size: 28, bg: PP.red, color: '#fff', T: rel(2, 0.08), rot: 2, out: st(3) - 0.3 });
  const pin = iconBox(world, { x: 610, y: 150, size: 84, name: 'pin', bg: PP.white, T: rel(2, 0.17), out: st(3) - 0.3 });
  tl.fromTo(pin, { y: -150 }, { y: 0, duration: 0.5, ease: 'bounce.out' }, rel(2, 0.17)); sfx('thud', rel(2, 0.17) + 0.35, 0.6);
  card(world, { x: 640, y: 500, w: 640, h: 66, html: 'Apply here, after you arrive', size: 29, bg: PP.green, color: '#fff', T: rel(2, 0.19), rot: -1, out: st(3) - 0.3 });
  card(world, { x: 830, y: 110, w: 190, h: 56, html: 'GOV.UK', size: 30, bg: PP.navy, color: '#fff', T: rel(2, 0.3), rot: 4, out: st(3) - 0.3 });
  card(world, { x: 1140, y: 190, w: 230, h: 220, html: `<div>${icon('calendar', 76)}<div style="margin-top:6px">UP TO<br>4 WEEKS</div></div>`, size: 30, bg: PP.white, T: rel(2, 0.45), rot: 3, out: st(3) - 0.3 });
  card(world, { x: 1140, y: 420, w: 230, h: 150, html: 'Check your BRP or eVisa account', size: 28, bg: PP.cream, T: rel(2, 0.72), rot: -3, out: st(3) - 0.3 });
  tl.to(rahim.g, { opacity: 0, duration: 0.3 }, st(3) - 0.5);
  // ---- beat D (lines 3 to 6): Slick Sid offers a "fast-track", Chidi panics, Kiran stamps SCAM
  const slick = cast(world, 'slick', { x: 1060, y: 560, s: 1.3, flip: true, T, D }); slick.breathe(T, D); slick.g.style.opacity = 0;
  const chidi = cast(world, 'chidi', { x: 300, y: 560, s: 1.3, T, D }); chidi.breathe(T, D); chidi.g.style.opacity = 0;
  const kiran = cast(world, 'kiran', { x: 520, y: 560, s: 1.3, T, D }); kiran.breathe(T, D); kiran.g.style.opacity = 0;
  talkLines(slick, 'ni', 'A'); talkLines(chidi, 'ni', 'C'); talkLines(kiran, 'ni', 'K');
  tl.fromTo(slick.g, { x: 400, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, st(3) - 0.3); slick.walk(st(3) - 0.3, 0.8, 0, 0.5, 1.5);
  tl.fromTo(chidi.g, { x: -400, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, st(3) - 0.2); chidi.walk(st(3) - 0.2, 0.8, 0, 0.5, 1.5);
  const fast = card(world, { x: 690, y: 330, w: 380, h: 130, html: 'NI number fast-track £200', size: 34, bg: PP.white, T: st(3) + 1.0, rot: 3, out: en(6) + 0.2 }); sfx('cash', st(3) + 1.2, 0.5);
  slick.arm('f', -70, -30, st(3) + 1.0, 0.5);
  speech(world, { x: 940, y: 160, w: 420, text: L[3].text, who: 'SLICK SID', color: PP.purple, tail: 'right', T: st(3), D: L[3].dur });
  speech(world, { x: 420, y: 165, w: 420, text: L[4].text, who: 'CHIDI', color: '#ff7b00', tail: 'right', T: st(4), D: L[4].dur + 0.1 }); chidi.arm('f', -50, -40, st(4), 0.4);
  tl.fromTo(kiran.g, { x: -500, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, st(5) - 0.7); kiran.walk(st(5) - 0.7, 0.7, 0, 0.5, 1.5); kiran.arm('f', -80, -50, st(5) + 0.2, 0.4);
  speech(world, { x: 640, y: 165, w: 400, text: L[5].text, who: 'KIRAN', color: '#2a9d8f', tail: 'left', T: st(5), D: L[5].dur + 0.1 });
  stamp(world, { x: 690, y: 330, w: 560, size: 42, text: "SCAM, IT'S FREE", T: st(5) + 1.1, out: en(6) + 0.2, rot: -9 });
  sfx('buzz', st(5) + 1.3, 0.4);
  // ---- beat E (lines 7 and 8): payslip, minimum wage, free help, no fee for a job
  [slick, chidi, kiran].forEach((p) => tl.to(p.g, { opacity: 0, duration: 0.3 }, en(6) + 0.1));
  const rahim2 = cast(world, 'rahim', { x: 1150, y: 560, s: 1.3, flip: true, T, D }); rahim2.breathe(T, D); rahim2.g.style.opacity = 0;
  tl.fromTo(rahim2.g, { opacity: 0, x: 300 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, st(7) - 0.4); rahim2.walk(st(7) - 0.4, 0.8, 0, 0.5, 1.5);
  const slip = card(world, { x: 470, y: 280, w: 540, h: 410, html: '', bg: PP.white, T: st(7) + 0.2, rot: -2, out: st(8) - 0.1 });
  box(slip, { left: 0, top: 10, width: 530, textAlign: 'center', font: `900 32px ${FONT}`, color: PP.blue }, 'PAYSLIP');
  ['Pay', 'Tax', 'National Insurance'].forEach((t, i) => { const r = box(slip, { left: 22, top: 62 + i * 58, width: 486, height: 48, background: PP.grey, border: `4px solid ${INK}`, borderRadius: 10, display: 'flex', alignItems: 'center', padding: '0 14px', boxSizing: 'border-box', font: `800 28px Arial`, color: INK, opacity: 0 }, t);
    tl.to(r, { opacity: 1, duration: 0.25 }, rel(7, 0.1 + i * 0.07)); sfx('tick', rel(7, 0.1 + i * 0.07), 0.6); });
  const min = box(slip, { left: 22, top: 246, width: 486, height: 138, background: PP.yellow, border: `5px solid ${INK}`, borderRadius: 12, display: 'flex', alignItems: 'center', gap: '12px', padding: '0 14px', boxSizing: 'border-box', font: `900 32px/1.1 ${FONT}`, color: INK, opacity: 0 }, `<div>£12.71 per hour minimum, age 21+</div>` + icon('tick', 56));
  tl.to(min, { opacity: 1, duration: 0.3 }, rel(7, 0.4)); sfx('cash', rel(7, 0.4), 0.6); sfx('ding', rel(7, 0.4) + 0.3, 0.5);
  card(world, { x: 930, y: 190, w: 300, h: 140, html: 'Paid less? You can get free help', size: 30, bg: PP.mint, T: rel(7, 0.62), rot: 3, out: st(8) - 0.1 });
  card(world, { x: 930, y: 380, w: 300, h: 140, html: 'Rates change every April. Check GOV.UK', size: 28, bg: PP.cream, T: rel(7, 0.8), rot: -3, out: st(8) - 0.1 });
  rahim2.arm('f', -60, -40, rel(7, 0.4), 0.5); rahim2.emote('happy', rel(7, 0.4));
  card(world, { x: 500, y: 270, w: 540, h: 170, html: 'An employer cannot charge you for a job', size: 38, bg: PP.white, T: st(8) + 0.3, rot: -2 });
  iconBox(world, { x: 150, y: 270, size: 110, name: 'xmark', bg: PP.white, T: st(8) + 0.7 }); iconBox(world, { x: 850, y: 270, size: 110, name: 'pound', bg: PP.white, T: st(8) + 0.9 });
  rahim2.emote('sad', st(8)); rahim2.emote('happy', st(8) + 3);
  tl.fromTo(world, { scale: 1 }, { scale: 1.05, duration: D, ease: 'none' }, T);
})();
