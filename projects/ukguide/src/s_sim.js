// ===== SCENE 4 "sim": STEP 2, THE SIM (and why NOT a contract) =====
(function () {
  const c = S('sim'), w = win('sim'), T = w.T, D = w.D, L = LS('sim');
  const st = (i) => L[i].start, en = (i) => L[i].start + L[i].dur;
  const world = box(c, { left: 0, top: 0, width: W, height: H, transformOrigin: '640px 400px' });
  // backdrops: blue (phone number), phone shop, bright mint (SIM)
  bgPop(world, { color: '#bde0fe', T, D });
  const shop = box(world, { left: 0, top: 0, width: W, height: H, opacity: 0 });
  box(shop, { left: -20, top: -20, width: W + 40, height: H + 40, background: `radial-gradient(circle, rgba(20,16,28,.12) 2.6px, transparent 3px) 0 0/26px 26px, #ffd6a5` });
  ground(shop, { y: 540, color: '#9c6644' });
  [0, 1, 2, 3].forEach((i) => iconBox(shop, { x: 560 + i * 150, y: 200 + (i % 2) * 20, size: 70, name: i % 2 ? 'phone' : 'laptop', bg: PP.sky, T: st(1) + 0.3 + i * 0.1, sfx: false, out: 244.2 }));
  const deal = cast(shop, 'mrdeal', { x: 1100, y: 560, s: 1.3, flip: true, T: st(1), D: 31 }); deal.breathe(st(1), 31);
  box(shop, { left: 560, top: 450, width: 760, height: 130, background: '#c9a227', border: `6px solid ${INK}`, borderRadius: 8, boxShadow: `0 -8px 0 #a87f1a inset` });
  card(shop, { x: 1000, y: 110, w: 330, h: 64, html: 'PHONE SHOP', size: 34, bg: PP.red, color: '#fff', T: st(1) + 0.2, rot: -2, out: 244.2 });
  const bright = box(world, { left: 0, top: 0, width: W, height: H, opacity: 0 }); bgPop(bright, { color: PP.mint, T: 244, D: 28 });
  tl.to(shop, { opacity: 1, duration: 0.4 }, 213.4); tl.to(shop, { opacity: 0, duration: 0.4 }, 244.2); tl.to(bright, { opacity: 1, duration: 0.4 }, 244.2); sfx('whoosh', 213.4, 0.5); sfx('whoosh', 244.2, 0.6);
  // characters
  const chidi = cast(world, 'chidi', { x: 330, y: 560, s: 1.3, T, D }); chidi.breathe(T, D);
  const kiran = cast(world, 'kiran', { x: 140, y: 560, s: 1.3, T, D }); kiran.breathe(T, D); kiran.g.style.opacity = 0;
  talkLines(chidi, 'sim', 'C'); talkLines(kiran, 'sim', 'K');

  // beat 1: "A phone number ... jobs, bank, doctor"
  headline(world, { x: 640, y: 66, text: 'STEP 2: A PHONE NUMBER', size: 46, w: 900, color: PP.yellow, T: st(0) + 0.3, out: 213.3 });
  const ph = phone(world, { x: 640, y: 350, s: 0.72, T: st(0) + 1.2, html: `<div style="padding:30px 10px;text-align:center;font:900 28px/1.2 Arial">${icon('phone', 90)}<br>YOUR<br>NUMBER</div>` });
  tl.to(ph.el, { opacity: 0, duration: 0.3 }, 213.2);
  [['doc', 'JOBS', 209.3], ['bank', 'BANK', 210.2], ['cross', 'DOCTOR', 211.1]].forEach(([n, lab, t], i) => iconBox(world, { x: 890 + i * 150, y: 330, size: 110, name: n, bg: PP.sky, label: lab, lsize: 28, T: t, out: 213.2 }));
  tl.to(ph.el, { rotation: 4, duration: 0.08, yoyo: true, repeat: 7 }, 212.3); sfx('ring', 212.3, 0.5);
  chidi.arm('f', -60, -40, st(0) + 1.5, 0.5); chidi.emote('happy', st(0) + 1.5);

  // beat 2: contract slides over, calendar flips to 24
  const paper = iconBox(world, { x: 1000, y: 410, size: 190, name: 'doc', bg: '#fff', T: 215.0, sfx: false, out: 226.4 });
  tl.to(paper, { x: -380, duration: 1.0, ease: 'power3.out' }, 215.2); sfx('swish', 215.2, 0.5);
  const lab24 = card(world, { x: 640, y: 330, w: 270, h: 70, html: '24 MONTHS', size: 36, bg: PP.red, color: '#fff', T: 216.2, rot: -3, out: 226.4 });
  const cal = card(world, { x: 640, y: 190, w: 230, h: 150, html: '<div><div style="font-size:26px;color:#e63946">MONTH</div><div class="num" style="font-size:80px;line-height:1">1</div></div>', bg: PP.white, T: 216.8, rot: 3, out: 226.4 });
  const num = cal.querySelector('.num'); for (let m = 2; m <= 24; m++) { tl.set(num, { textContent: m }, 217.4 + (m - 2) * 0.1); if (m % 3 === 0) sfx('tick', 217.4 + (m - 2) * 0.1, 0.5); }
  stamp(world, { x: 640, y: 440, w: 300, size: 40, text: 'NOT YET', T: 221.4, out: 222.6, rot: -8 });
  chidi.emote('surprised', 218.5);
  // banter: Chidi signs, chain locks, Kiran stops him
  speech(world, { x: 430, y: 130, w: 420, text: L[2].text, who: 'CHIDI', color: '#ff7b00', tail: 'right', T: st(2), D: L[2].dur + 0.2 });
  const pen = box(world, { left: 392, top: 330, width: 12, height: 72, background: PP.blue, border: `3px solid ${INK}`, borderRadius: 5, rotation: 30, opacity: 0 });
  tl.to(pen, { opacity: 1, duration: 0.1 }, st(2)); tl.to(pen, { x: 14, duration: 0.1, yoyo: true, repeat: 7 }, st(2) + 0.1); sfx('tick', st(2) + 0.2, 0.6); sfx('tick', st(2) + 0.5, 0.6);
  chidi.arm('f', -50, -50, st(2), 0.3); chidi.emote('happy', st(2));
  const chain = box(world, { left: 262, top: 522, width: 190, height: 56, opacity: 0 }, '<svg viewBox="0 0 190 56" width="190" height="56"><g fill="none" stroke="#e63946" stroke-width="8">' + [0, 1, 2, 3, 4].map((i) => `<ellipse cx="${20 + i * 26}" cy="${i % 2 ? 38 : 24}" rx="16" ry="${i % 2 ? 7 : 11}" stroke="${INK}" stroke-width="12"/><ellipse cx="${20 + i * 26}" cy="${i % 2 ? 38 : 24}" rx="16" ry="${i % 2 ? 7 : 11}"/>`).join('') + '</g></svg>');
  pop(chain, 223.4, { sfx: 'thud' }); sfx('tick', 223.7, 0.6); sfx('tick', 223.9, 0.6);
  iconBox(world, { x: 460, y: 540, size: 56, name: 'lock', bg: PP.yellow, T: 223.6, sfx: false, out: 262.9 });
  kiran.g.style.opacity = 1; tl.fromTo(kiran.g, { x: -420 }, { x: 0, duration: 0.9, ease: 'power3.out' }, 224.0); kiran.walk(224.0, 0.9, 0, 0.5, 1.5); kiran.arm('f', -85, -50, 224.9, 0.4); kiran.emote('angry', 224.5);
  speech(world, { x: 330, y: 150, w: 420, text: L[3].text, who: 'KIRAN', color: '#2a9d8f', tail: 'left', T: st(3), D: L[3].dur + 0.3 });
  tl.to(pen, { y: 190, rotation: 150, opacity: 0, duration: 0.5, ease: 'power2.in' }, 224.8); sfx('thud', 225.2, 0.6); chidi.arm('f', 0, 0, 224.8, 0.4); chidi.emote('sad', 225.2);

  // beat 3: no credit history, refused, deposit, 22 more months
  const gauge = (() => { const pt = (a) => [180 + 140 * Math.cos(a * Math.PI / 180), 170 - 140 * Math.sin(a * Math.PI / 180)], arc = (a0, a1, col) => { const p0 = pt(a0), p1 = pt(a1); return `<path d="M${p0[0]} ${p0[1]} A140 140 0 0 1 ${p1[0]} ${p1[1]}" fill="none" stroke="${col}" stroke-width="28"/>`; };
    const nd = pt(173); return `<div><svg viewBox="0 0 360 190" width="320" height="170" style="overflow:visible">${arc(180, 120, '#e63946')}${arc(120, 60, '#ffd166')}${arc(60, 0, '#38b000')}<line x1="180" y1="170" x2="${nd[0] * 0.72 + 180 * 0.28}" y2="${nd[1] * 0.72 + 170 * 0.28}" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><circle cx="180" cy="170" r="14" fill="${INK}"/></svg><div style="font-size:80px;line-height:1">0</div><div style="font-size:28px;line-height:1.1">no UK credit history yet</div></div>`; })();
  card(world, { x: 640, y: 280, w: 390, h: 390, html: gauge, bg: PP.white, T: 226.9, rot: -2, out: 233.2 });
  stamp(world, { x: 640, y: 330, w: 300, size: 46, text: 'REFUSED', T: 229.7, out: 233.0, rot: -9 });
  iconBox(world, { x: 980, y: 200, size: 110, name: 'pound', bg: PP.yellow, label: 'DEPOSIT', lsize: 30, T: 232.0, out: 238.0 }); sfx('cash', 232.0, 0.6);
  card(world, { x: 640, y: 190, w: 280, h: 96, html: 'IN 2 MONTHS...', size: 32, bg: PP.sky, T: 233.7, rot: -3, out: 238.0 });
  card(world, { x: 640, y: 330, w: 420, h: 110, html: 'STILL PAYING<br>22 MORE', size: 40, bg: PP.red, color: '#fff', T: 235.6, rot: 2, out: 238.0 }); sfx('buzz', 235.7, 0.4);

  // beat 4: price creeps up in the small print
  const small = card(world, { x: 700, y: 300, w: 430, h: 330, html: '', bg: PP.cream, T: 238.4, rot: -2, out: 243.9, sfx: 'swish' });
  box(small, { left: 24, top: 18, width: 380, font: `900 28px ${FONT}`, color: INK }, 'SMALL PRINT');
  for (let r = 0; r < 7; r++) box(small, { left: 24, top: 68 + r * 22, width: 380 - (r % 3) * 50, height: 8, background: '#adb5bd', borderRadius: 4 });
  ['£18', '£21', '£24'].forEach((p, i) => { const e = card(world, { x: 700, y: 350, w: 190, h: 90, html: p, size: 54, bg: i === 2 ? PP.red : PP.yellow, color: i === 2 ? '#fff' : INK, T: 238.9 + i * 1.3, rot: 4, out: i === 2 ? 243.9 : 238.9 + (i + 1) * 1.3, sfx: false }); sfx('tick', 238.95 + i * 1.3, 0.7); });
  iconBox(world, { x: 860, y: 215, size: 110, name: 'search', bg: PP.sky, T: 241.4, out: 243.9 });
  chidi.emote('sad', 238.3); kiran.arm('f', -40, -30, 238.5, 0.5);

  // beat 5: bright pay-as-you-go SIM, calendar, brand badges
  card(world, { x: 690, y: 165, w: 380, h: 140, html: 'PAY AS YOU GO<br>30-DAY SIM ONLY', size: 28, bg: PP.yellow, T: 244.7, rot: -2, out: 262.8 });
  iconBox(world, { x: 930, y: 165, size: 100, name: 'sim', bg: PP.white, T: 246.0, out: 262.8, sfx: false }); sfx('pop', 246.0, 0.8);
  card(world, { x: 1130, y: 165, w: 260, h: 140, html: '30 DAYS<br><span style="font-size:24px">leave anytime</span>', size: 38, bg: PP.white, T: 247.4, rot: 3, out: 262.8 });
  [['giffgaff', 640, 330, PP.pink, 249.8], ['Lebara', 880, 330, PP.blue, 251.3], ['Lyca', 1120, 330, PP.orange, 251.9], ['Voxi', 760, 410, PP.purple, 252.7], ['Asda Mobile', 1020, 410, PP.green, 253.4]].forEach(([t, x, y, bg, tt]) => {
    card(world, { x, y, w: t === 'Asda Mobile' ? 270 : 220, h: 64, html: t, size: 30, bg, color: '#fff', T: tt, rot: x % 2 ? 2 : -2, out: 262.8, sfx: false }); sfx('ding', tt + 0.1, 0.5); });
  card(world, { x: 880, y: 525, w: 720, h: 96, html: 'popular no-credit-check options<br><span style="font-size:26px">(check current terms)</span>', size: 30, bg: PP.white, T: 256.4, rot: -1, out: 262.8 });
  kiran.emote('happy', 245); chidi.emote('happy', 246); chidi.arm('f', -35, -20, 246, 0.5);

  // beat 6: no chains, stop any time, contract waits
  tl.to(chain, { y: 120, rotation: 25, opacity: 0, duration: 0.7, ease: 'power2.in' }, 263.0); sfx('thud', 263.4, 0.7);
  card(world, { x: 760, y: 190, w: 400, h: 110, html: '30 DAYS<br>NO CHAINS', size: 44, bg: PP.green, color: '#fff', T: 262.2, rot: -3 }); sfx('chime', 262.3, 0.7);
  stamp(world, { x: 760, y: 340, w: 440, size: 44, text: 'STOP ANY TIME', T: 264.3, color: PP.teal, rot: 4 });
  iconBox(world, { x: 960, y: 480, size: 120, name: 'doc', bg: '#fff', label: 'LATER', lsize: 30, T: 266.0 });
  chidi.emote('happy', 263); chidi.arm('f', -140, -20, 264.3, 0.4); kiran.arm('f', -100, -30, 265, 0.5);
  // camera push
  tl.fromTo(world, { scale: 1 }, { scale: 1.05, duration: D, ease: 'none' }, T);
})();
