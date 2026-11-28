// ===== SCENE "status": STEP 1, PROVE WHO YOU ARE (eVisa + share code). BRP card fades, phone login, share code, three vignettes, Chidi asks / Kiran answers. =====
(function () {
  const c = S('status'), w = win('status'), T = w.T, D = w.D, L = LS('status');
  const st = (i) => L[i].start, en = (i) => L[i].start + L[i].dur;
  const world = box(c, { left: 0, top: 0, width: W, height: H, transformOrigin: '640px 360px' });
  bgPop(world, { color: PP.mint, T, D });
  box(world, { left: 0, top: 560, width: W, height: 160, background: PP.teal, borderTop: `6px solid ${INK}` });
  const chidi = cast(world, 'chidi', { x: 110, y: 560, s: 1.2, T, D }); chidi.breathe(T, D);
  const kiran = cast(world, 'kiran', { x: 1170, y: 560, s: 1.2, flip: true, T, D }); kiran.breathe(T, D); kiran.g.style.opacity = 0;
  talkLines(chidi, 'status', 'C'); talkLines(kiran, 'status', 'K');
  // ---- beat 0: title card, Day 1-3 burst, BRP card
  headline(world, { x: 640, y: 80, text: 'STEP 1<br>Prove who you are', size: 62, color: '#fff', T: T + 0.5, w: 900, out: st(1) + 0.3, rot: -2 });
  burst(world, { x: 1010, y: 410, r: 125, color: PP.orange, T: st(0) + 2.2, out: st(1) + 0.3 });
  headline(world, { x: 1010, y: 385, text: 'Day 1–3', size: 46, color: '#fff', T: st(0) + 2.4, w: 220, out: st(1) + 0.3, rot: 4 });
  const brp = box(world, { left: 390, top: 300, width: 340, height: 210, background: '#bde0fe', border: `6px solid ${INK}`, borderRadius: 20, boxShadow: `7px 7px 0 ${INK}`, opacity: 0 },
    `<div style="position:absolute;left:18px;top:16px;font:900 34px ${FONT};color:${INK}">BRP card</div><div style="position:absolute;left:18px;top:80px">${icon('id', 90)}</div><div style="position:absolute;left:130px;top:96px;width:180px;height:14px;background:${INK};opacity:.5;border-radius:7px"></div><div style="position:absolute;left:130px;top:126px;width:130px;height:14px;background:${INK};opacity:.5;border-radius:7px"></div>`);
  pop(brp, st(0) + 4.4, { rot: -3, vol: 0.5 });
  chidi.arm('f', -40, -50, st(0) + 4.4, 0.5);
  // ---- beat 1: BRP slides left and fades to a ghost outline, phone slides in with the UKVI login and eVisa tick
  tl.to(brp, { x: -170, duration: 0.8, ease: 'power2.in' }, st(1) + 2.0); sfx('swish', st(1) + 2.0, 0.5);
  tl.to(brp, { opacity: 0.22, duration: 0.8 }, st(1) + 2.4); tl.to(brp, { opacity: 0, duration: 0.3 }, st(2));
  tl.set(brp, { background: 'rgba(255,255,255,0)', borderStyle: 'dashed' }, st(1) + 2.9);
  chidi.arm('f', 0, 0, st(1) + 2.0, 0.5);
  const ph = phone(world, { x: 640, y: 370, s: 0.92, T: st(1) + 4.0 });
  const grp = (t0) => { const g = box(ph.screen, { left: 0, top: 0, width: 236, height: 472, background: '#fff', opacity: 0 }); if (t0 !== undefined) tl.set(g, { opacity: 1 }, t0); return g; };
  const hdr = (g, txt, col) => box(g, { left: 0, top: 0, width: 236, height: 62, background: col || PP.blue, color: '#fff', font: `900 24px/62px ${FONT}`, textAlign: 'center', paddingTop: 12, boxSizing: 'border-box', lineHeight: '50px' }, txt);
  const login = grp(st(1) + 4.1); hdr(login, 'UKVI account');
  box(login, { left: 84, top: 84, width: 68, height: 68 }, icon('user', 68, PP.sky));
  box(login, { left: 28, top: 170, width: 180, height: 38, background: '#dee2e6', borderRadius: 10 });
  const ev = box(login, { left: 20, top: 232, width: 196, height: 60, background: PP.cream, border: `4px solid ${INK}`, borderRadius: 12, font: `900 28px/52px ${FONT}`, paddingLeft: 14, boxSizing: 'border-box' }, 'eVisa');
  const evTick = box(login, { left: 150, top: 238, width: 50, height: 50 }, icon('tick', 50)); pop(evTick, st(1) + 6.6, { sfx: 'ding', vol: 0.8 });
  // ---- beat 2: three vignettes (employer, landlord, bank clerk), then the share code close-up
  tl.to(ph.el, { x: -310, duration: 0.7, ease: 'power3.inOut' }, st(2) - 0.1); sfx('swish', st(2) - 0.1, 0.4);
  const strips = [['suitcase', 'Employer', PP.yellow, 0.4], ['house', 'Landlord', PP.sky, 1.7], ['bank', 'Bank clerk', PP.pink, 3.0]].map((v, i) => {
    const e = card(world, { x: 830, y: 170 + i * 126, w: 590, h: 104, html: '', bg: '#fff', T: st(2) + v[3], rot: i - 1, sfx: false, out: st(2) + 4.3 });
    box(e, { left: 12, top: 8, width: 76, height: 76 }, icon(v[0], 76, v[2])); box(e, { left: 100, top: 22, width: 200, font: `900 28px ${FONT}`, color: INK }, v[1]);
    box(e, { left: 290, top: 12, width: 280, height: 68, background: PP.yellow, border: `4px solid ${INK}`, borderRadius: 12, font: `900 24px/62px ${FONT}`, textAlign: 'center', boxSizing: 'border-box', color: INK }, 'Share code, please');
    sfx('stamp', st(2) + v[3] + 0.2, 0.5); tl.to(e, { y: 7, duration: 0.15, yoyo: true, repeat: 3 }, st(2) + v[3] + 0.9); return e; });
  const cg = grp(st(2) + 4.2); hdr(cg, 'Share code', PP.green);
  box(cg, { left: 20, top: 110, width: 196, height: 70, background: PP.green, border: `4px solid ${INK}`, borderRadius: 14, color: '#fff', font: `900 24px/62px ${FONT}`, textAlign: 'center', boxSizing: 'border-box' }, 'Get a share code');
  const tap = box(ph.screen, { left: 98, top: 118, width: 40, height: 40, border: `6px solid ${PP.orange}`, borderRadius: '50%', opacity: 0 }); tl.fromTo(tap, { opacity: 1, scale: 0.6 }, { opacity: 0, scale: 2.4, duration: 0.6, immediateRender: false }, st(2) + 4.7); sfx('tick', st(2) + 4.7, 0.8);
  const big = card(world, { x: 830, y: 330, w: 590, h: 330, html: '', bg: PP.cream, T: st(2) + 4.9, rot: 0, out: st(5) - 0.1, sfx: 'whoosh' });
  box(big, { left: 20, top: 16, width: 540, height: 70, background: PP.green, border: `4px solid ${INK}`, borderRadius: 14, color: '#fff', font: `900 32px/62px ${FONT}`, textAlign: 'center', boxSizing: 'border-box' }, 'Get a share code');
  'W12345678'.split('').forEach((ch, i) => { const b = box(big, { left: 22 + i * 58, top: 112, width: 52, height: 76, background: '#fff', border: `4px solid ${INK}`, borderRadius: 10, font: `900 44px/68px ${FONT}`, textAlign: 'center', boxSizing: 'border-box', color: INK }, ch); pop(b, st(2) + 5.6 + i * 0.12, { sfx: false, d: 0.3 }); });
  sfx('ding', st(2) + 6.9, 0.9);
  const clk = box(big, { left: 120, top: 224, width: 330, height: 76, background: PP.yellow, border: `4px solid ${INK}`, borderRadius: 14, font: `900 30px/68px ${FONT}`, textAlign: 'center', boxSizing: 'border-box', color: INK }, `<span style="display:inline-block;vertical-align:middle;margin-right:10px">${icon('clock', 44)}</span>time-limited`); pop(clk, st(2) + 8.7, { sfx: 'tick' });
  const cgTxt = box(cg, { left: 20, top: 210, width: 196, font: `900 30px ${FONT}`, textAlign: 'center', color: INK, letterSpacing: '1px', opacity: 0 }, 'W12345678'); tl.to(cgTxt, { opacity: 1, duration: 0.3 }, st(2) + 6.9);
  // ---- beat 3-4: Chidi asks, Kiran answers
  speech(world, { x: 340, y: 105, w: 340, text: L[3].text, who: 'CHIDI', color: '#ff7b00', tail: 'left', T: st(3), D: L[3].dur + 0.3 });
  chidi.arm('f', -100, -30, st(3), 0.3); chidi.arm('f', 0, 0, st(5), 0.5); chidi.emote('surprised', st(3));
  kiran.g.style.opacity = 1; tl.fromTo(kiran.g, { x: 320 }, { x: 0, duration: 0.8, ease: 'power3.out' }, st(4) - 1.1); kiran.walk(st(4) - 1.1, 0.8, 0, 0.5, 1.5);
  speech(world, { x: 960, y: 105, w: 440, text: L[4].text, who: 'KIRAN', color: '#2a9d8f', tail: 'right', T: st(4), D: L[4].dur + 0.3 });
  kiran.arm('f', -80, -60, st(4) + 0.3, 0.4); kiran.arm('f', 0, 0, st(5), 0.5);
  iconBox(world, { x: 1060, y: 330, size: 100, name: 'shield', bg: PP.white, T: st(4) + 2.2, out: st(5), label: 'GOV.UK', sfx: 'ding' });
  // ---- beat 5: check your name, date of birth, passport
  const chk = grp(st(5) - 0.1); hdr(chk, 'Check', PP.navy);
  ['Name', 'Date of birth', 'Passport'].forEach((t, i) => {
    box(chk, { left: 18, top: 90 + i * 90, width: 200, height: 70, background: PP.cream, border: `4px solid ${INK}`, borderRadius: 12, font: `900 22px/62px ${FONT}`, paddingLeft: 12, boxSizing: 'border-box' }, t);
    const tk = box(chk, { left: 160, top: 100 + i * 90, width: 50, height: 50 }, icon('tick', 50)); pop(tk, st(5) + 3.2 + i * 1.2, { sfx: 'tick', vol: 0.8 }); });
  card(world, { x: 830, y: 170, w: 520, h: 80, html: 'Check your details', size: 34, bg: PP.yellow, T: st(5) + 0.8, out: st(6) - 0.1, rot: -2 });
  [['Name', 3.0], ['Date of birth', 4.2], ['Passport details', 5.4]].forEach((t, i) => card(world, { x: 760 + i * 130, y: 290, w: i === 2 ? 200 : 180, h: 56, html: t[0], size: 20, bg: PP.white, T: st(5) + t[1], out: st(6) - 0.1, rot: i - 1 }));
  iconBox(world, { x: 760, y: 420, size: 110, name: 'key', bg: PP.sky, T: st(5) + 8.0, out: st(6) - 0.1, label: 'a room' }); iconBox(world, { x: 900, y: 420, size: 110, name: 'suitcase', bg: PP.yellow, T: st(5) + 9.4, out: st(6) - 0.1, label: 'a job' });
  [760, 900].forEach((x, i) => iconBox(world, { x: x + 36, y: 380, size: 60, name: 'xmark', bg: PP.white, T: st(5) + 8.6 + i * 1.4, out: st(6) - 0.1, sfx: false }));
  // ---- beat 6: free, only on the official GOV.UK website
  const gu = grp(st(6) - 0.1); hdr(gu, 'GOV.UK', PP.green); box(gu, { left: 68, top: 120, width: 100, height: 100 }, icon('shield', 100)); box(gu, { left: 20, top: 250, width: 196, height: 60, background: '#e9ecef', border: `3px solid ${INK}`, borderRadius: 30, font: '900 20px/54px Arial', textAlign: 'center', boxSizing: 'border-box' }, 'gov.uk');
  burst(world, { x: 760, y: 260, r: 120, color: PP.pink, T: st(6) + 1.0, out: st(7) - 0.1 });
  headline(world, { x: 760, y: 232, text: 'FREE', size: 66, color: '#fff', T: st(6) + 1.1, w: 260, out: st(7) - 0.1, rot: -4 });
  card(world, { x: 960, y: 440, w: 330, h: 80, html: icon('lock', 44) + '<span style="margin-left:10px">GOV.UK only</span>', size: 28, bg: PP.white, T: st(6) + 3.8, out: st(7) - 0.1, rot: 3 });
  // ---- beat 7: still changing, check the page on GOV.UK
  iconBox(world, { x: 760, y: 180, size: 100, name: 'bell', bg: PP.yellow, T: st(7) + 0.6, out: en(7) + 1, label: 'still changing' });
  card(world, { x: 860, y: 400, w: 560, h: 130, html: 'View and prove your immigration status', size: 32, bg: PP.sky, T: st(7) + 3.6, out: en(7) + 1, rot: -2 });
  iconBox(world, { x: 1160, y: 390, size: 70, name: 'shield', bg: PP.white, T: st(7) + 4.2, out: en(7) + 1, sfx: 'ding' });
  // camera
  tl.fromTo(world, { scale: 1 }, { scale: 1.04, duration: D, ease: 'none' }, T);
})();
