// ===== SCENE "scams": THE SCAM SPECIAL (colours drain to cool, then return warm) =====
(function () {
  const c = S('scams'), w = win('scams'), T = w.T, D = w.D, L = LS('scams');
  const st = (i) => L[i].start, en = (i) => L[i].start + L[i].dur;
  const world = box(c, { left: 0, top: 0, width: W, height: H, transformOrigin: '640px 400px' });
  // warm world underneath, cool/dark overlay fades in at the start and out again at the end
  bgPop(world, { color: PP.yellow, T, D }); const gw = ground(world, { y: 548, color: '#a98467' });
  const cool = box(world, { left: 0, top: 0, width: W, height: H, opacity: 0 });
  bgPop(cool, { color: '#2b3a55', dot: 'rgba(255,255,255,0.09)', T, D });
  ground(cool, { y: 548, color: '#1b2433' });
  box(cool, { left: 0, top: 0, width: W, height: H, background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 40%, rgba(5,8,20,0.55) 100%)' });
  tl.to(cool, { opacity: 1, duration: 2.2, ease: 'sine.inOut' }, T + 0.3); tl.to(cool, { opacity: 0, duration: 2.0, ease: 'sine.inOut' }, st(8) + 0.4);
  sfx('thud', T + 0.4, 0.4);
  const vis = (p, spans) => { tl.set(p.g, { opacity: 0 }, 0); spans.forEach((s) => { tl.set(p.g, { opacity: 1 }, s[0]); tl.set(p.g, { opacity: 0 }, s[1]); }); };
  const mk2 = (key, o) => { const p = cast(world, key, Object.assign({ T, D }, o)); p.breathe(T, D); p.g.style.opacity = 0; return p; };
  const fake = mk2('fake', { x: 1070, y: 560, s: 1.25, flip: true }), chidi = mk2('chidi', { x: 430, y: 560, s: 1.25 }), kiran = mk2('kiran', { x: 230, y: 560, s: 1.25 }), slick = mk2('slick', { x: 1060, y: 560, s: 1.3, flip: true });
  vis(fake, [[st(1) - 0.3, st(5) - 0.1]]); vis(chidi, [[st(1) - 0.3, st(5) - 0.1], [st(6) - 0.2, st(7) - 0.2], [st(8) - 0.2, st(9) - 0.2]]); vis(kiran, [[st(3) - 0.5, st(5) - 0.1], [st(7) - 0.2, st(9) - 0.2]]); vis(slick, [[st(5) + 4.6, st(6) - 0.1]]);
  talkLines(fake, 'scams', 'P'); talkLines(chidi, 'scams', 'C'); talkLines(kiran, 'scams', 'K');
  const scam = (o) => card(world, Object.assign({ w: 480, h: 96, size: 25, bg: PP.white, html: `<div style="text-align:left"><span style="background:#e63946;color:#fff;padding:1px 10px;border-radius:8px;font-size:19px;margin-right:6px">SCAM</span><br>${o.text}</div>` }, o));
  // beat 0: title
  headline(world, { x: 640, y: 180, text: 'THE SCAM SPECIAL', size: 76, color: '#fff', T: T + 0.8, w: 1000, out: st(1) - 0.2 });
  iconBox(world, { x: 640, y: 400, size: 150, name: 'warn', bg: PP.white, T: T + 1.6, out: st(1) - 0.2, sfx: 'buzz' });
  // beat 1-3: Officer Fake's call, Chidi panics, Kiran calms him
  const old = box(world, { left: 975, top: 310, width: 30, height: 100, background: '#868e96', border: `5px solid ${INK}`, borderRadius: 16, opacity: 0, transform: 'rotate(28deg)' }); tl.set(old, { opacity: 1 }, st(1) - 0.2); tl.set(old, { opacity: 0 }, st(5) - 0.1); tl.to(old, { rotation: 22, duration: 0.2, yoyo: true, repeat: 20 }, st(1));
  sfx('ring', st(1) - 0.3, 0.6); sfx('ring', st(1) + 1.3, 0.5);
  fake.arm('f', -130, -100, st(1) - 0.3, 0.5); scam({ x: 290, y: 120, T: st(1) + 1.0, rot: -2, out: st(6) - 0.1, text: 'Phone call: "We are the Home Office, pay now"', h: 110, size: 23 }); sfx('buzz', st(1) + 1.0, 0.3);
  speech(world, { x: 880, y: 205, w: 540, text: L[1].text, who: 'OFFICER FAKE', color: '#1d3557', tail: 'right', T: st(1), D: L[1].dur + 0.1, size: 26 });
  speech(world, { x: 470, y: 225, w: 360, text: L[2].text, who: 'CHIDI', color: '#ff7b00', tail: 'right', T: st(2), D: L[2].dur + 0.2 });
  chidi.arm('f', -40, -60, st(2), 0.4); chidi.arm('b', -40, -60, st(2), 0.4); tl.to(chidi.g, { y: -10, duration: 0.12, yoyo: true, repeat: 7 }, st(2));
  tl.fromTo(kiran.g, { x: -420 }, { x: 0, duration: 0.8, ease: 'power3.out' }, st(3) - 0.5); kiran.walk(st(3) - 0.5, 0.8, 0, 0.5, 1.5); kiran.arm('f', -70, -30, st(3) + 0.8, 0.5);
  speech(world, { x: 300, y: 235, w: 400, text: L[3].text, who: 'KIRAN', color: '#2a9d8f', tail: 'left', T: st(3), D: L[3].dur + 0.2 });
  chidi.arm('f', 0, 0, st(3) + 0.8, 0.5); chidi.arm('b', 0, 0, st(3) + 0.8, 0.5); chidi.emote('sad', st(3) + 1); sfx('chime', st(3) + 1.4, 0.4);
  // beat 4: "That is not the Home Office"
  stamp(world, { x: 800, y: 130, w: 600, size: 32, text: 'NOT THE HOME OFFICE', T: st(4) + 0.3, out: st(5) - 0.1, rot: -4 });
  card(world, { x: 800, y: 235, w: 560, h: 80, html: 'Never: pay by email, or into a personal bank account', size: 24, bg: PP.white, T: st(4) + 3.0, rot: 1, out: st(5) - 0.1 });
  // beat 5: Home Office never asks (small card), then the pattern: four more scam cards, Slick Sid smooths his hair
  [['Job offer, but pay a fee', 3.0], ['Visa "guaranteed" for a big fee', 4.2], ['Room you have not seen, pay first', 5.1], ['Agent selling NI number or appointments', 5.9]].forEach((x, i) =>
    { const e = scam({ x: 290, y: 212 + i * 104, T: st(5) + x[1], rot: i % 2 ? 2 : -2, out: st(6) - 0.1, text: x[0], sfx: false, size: 22 }); tl.fromTo(e, { x: -500 }, { x: 0, duration: 0.45, ease: 'power3.out' }, st(5) + x[1]); sfx('whoosh', st(5) + x[1], 0.5); });
  headline(world, { x: 890, y: 120, text: 'PAY FIRST?', size: 60, color: PP.red, T: st(5) + 6.8, w: 600, out: st(6) - 0.1 });
  [0, 1, 2, 3].forEach((i) => { slick.arm('f', -150, -125, st(5) + 5.0 + i * 1.2, 0.5); slick.arm('f', -120, -140, st(5) + 5.5 + i * 1.2, 0.5); }); slick.emote('sly', st(5) + 4.6);
  // beat 5: losing savings, too ashamed
  chidi.emote('sad', st(6)); chidi.head(14, st(6) + 0.5, 1);
  [0, 1, 2].forEach((i) => { const e = iconBox(world, { x: 720 + i * 150, y: 380, size: 100, name: 'pound', bg: PP.white, T: st(6) + 0.6 + i * 0.5, out: st(6) + 2.8 + i * 0.5, sfx: 'cash' }); tl.to(e, { y: -180, x: 80, duration: 2.2, ease: 'power1.in' }, st(6) + 0.9 + i * 0.5); });
  card(world, { x: 860, y: 190, w: 560, h: 110, html: 'Many feel too ashamed to tell anyone', size: 32, bg: PP.white, T: st(6) + 3.4, rot: 2, out: st(7) - 0.2 });
  // beat 6: Register of Licensed Sponsors on GOV.UK
  const reg = box(world, { left: 360, top: 90, width: 800, height: 400, background: '#fff', border: `6px solid ${INK}`, borderRadius: 18, boxShadow: `9px 9px 0 ${INK}`, opacity: 0, overflow: 'hidden' });
  box(reg, { left: 0, top: 0, width: 800, height: 64, background: PP.grey, borderBottom: `5px solid ${INK}`, font: `900 26px/54px Arial`, paddingLeft: 24, boxSizing: 'border-box' }, '🔒 gov.uk');
  box(reg, { left: 0, top: 84, width: 800, textAlign: 'center', font: `900 40px/1.1 ${FONT}`, color: PP.navy }, 'Register of<br>Licensed Sponsors');
  pop(reg, st(7) + 4.0, { from: 0.7, out: st(8) - 0.2, sfx: 'whoosh', vol: 0.5 });
  const mag = iconBox(world, { x: 1000, y: 430, size: 130, name: 'search', bg: PP.white, T: st(7) + 7.5, out: st(8) - 0.2 }); tl.to(mag, { x: -240, y: -60, duration: 2.5, ease: 'sine.inOut' }, st(7) + 8.2);
  const yes = card(world, { x: 580, y: 435, w: 330, h: 70, html: icon('tick', 44) + '<span style="margin-left:10px">On the register</span>', size: 26, bg: PP.mint, T: st(7) + 11.0, rot: -2, out: st(8) - 0.2 });
  const no = card(world, { x: 940, y: 435, w: 330, h: 70, html: icon('xmark', 44) + '<span style="margin-left:10px">Not on it: cannot sponsor</span>', size: 22, bg: '#ffd6d6', T: st(7) + 12.6, rot: 2, out: st(8) - 0.2 });
  kiran.arm('f', -75, -30, st(7) + 4.0, 0.5); kiran.arm('f', 0, 0, st(7) + 13.5, 0.5);
  // beat 7: warm colours return, ESCAPE ROUTE panel
  headline(world, { x: 860, y: 62, text: 'ESCAPE ROUTE', size: 56, color: PP.green, T: st(8) + 0.6, w: 700, out: st(9) - 0.2 });
  [['Report Fraud (police)', 'shield', PP.sky, 7.5], ['Citizens Advice', 'user', PP.mint, 10.2], ['Migrant Help', 'key', PP.white, 11.2]].forEach((x, i) => {
    const e = card(world, { x: 860, y: 200 + i * 110, w: 560, h: 90, html: icon(x[1], 54) + `<span style="margin-left:14px">${x[0]}</span>`, size: 30, bg: x[2], T: st(8) + x[3], rot: i % 2 ? 1 : -1, out: st(9) - 0.2, sfx: false }); tl.fromTo(e, { x: 600 }, { x: 0, duration: 0.5, ease: 'back.out(1.4)' }, st(8) + x[3]); sfx('ding', st(8) + x[3] + 0.1, 0.5); });
  stamp(world, { x: 860, y: 520, w: 360, size: 36, text: 'THEY ARE FREE', color: PP.green, T: st(8) + 12.3, out: st(9) - 0.2, rot: -4 });
  kiran.emote('happy', st(8) + 5); chidi.emote('normal', st(8) + 1); chidi.arm('f', 0, 0, st(8), 0.2);
  // beat 8: golden rule, padlock closes on the phone
  const ph = phone(world, { x: 380, y: 330, s: 0.8, T: st(9) + 0.3, html: `<div style="padding:60px 14px;text-align:center;font:900 30px ${FONT}">YOUR PHONE</div>` });
  const lock = iconBox(world, { x: 380, y: 330, size: 200, name: 'lock', bg: PP.white, T: st(9) + 1.8, sfx: false }); tl.fromTo(lock, { y: -300 }, { y: 0, duration: 0.5, ease: 'bounce.out' }, st(9) + 1.8); sfx('thud', st(9) + 2.1, 0.8); sfx('chime', st(9) + 2.4, 0.5);
  card(world, { x: 880, y: 300, w: 560, h: 170, html: 'Anything real is free,<br>or can wait a day', size: 40, bg: PP.yellow, T: st(9) + 0.6, rot: 2 });
  tl.fromTo(world, { scale: 1 }, { scale: 1.05, duration: D, ease: 'none' }, T);
})();
