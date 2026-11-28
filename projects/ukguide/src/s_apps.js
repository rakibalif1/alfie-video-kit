// ===== SCENE "apps": STEP 7, THE APPS THAT RUN YOUR LIFE. A phone home screen builds icon by icon, each tile opens a short demo card. =====
(function () {
  const c = S('apps'), w = win('apps'), T = w.T, D = w.D, L = LS('apps');
  const st = (i) => L[i].start, en = (i) => L[i].start + L[i].dur;
  const world = box(c, { left: 0, top: 0, width: W, height: H, transformOrigin: '640px 360px' });
  bgPop(world, { color: PP.yellow, T, D });
  box(world, { left: 0, top: 560, width: W, height: 160, background: PP.orange, borderTop: `6px solid ${INK}` });
  // ---- cast: banter pair on the right, facing the phone
  const chidi = cast(world, 'chidi', { x: 1030, y: 560, s: 1.0, flip: true, T, D }); chidi.breathe(T, D);
  const kiran = cast(world, 'kiran', { x: 1160, y: 560, s: 1.0, flip: true, T, D }); kiran.breathe(T, D);
  talkLines(chidi, 'apps', 'C'); talkLines(kiran, 'apps', 'K');
  // ---- phone with a 3x3 home screen
  const PX = 290, PY = 345;
  const ph = phone(world, { x: PX, y: PY, T: T + 0.3 });
  ph.screen.style.background = `linear-gradient(160deg, ${PP.blue}, ${PP.purple})`;
  const apps = [['suitcase', PP.yellow, 'JOBS'], ['map', PP.mint, 'MAPS'], ['bus', PP.sky, 'BUS'], ['train', PP.white, 'TRAINS'], ['clock', PP.orange, 'TfL Go'], ['cross', PP.white, 'NHS'], ['bank', PP.pink, 'BANK'], ['shield', PP.yellow, 'GOV.UK'], ['sofa', PP.mint, 'MARKET']];
  const tile = apps.map((a, i) => {
    const cx = 40 + (i % 3) * 78, cy = 100 + Math.floor(i / 3) * 112;
    const t = box(ph.screen, { left: cx - 33, top: cy - 33, width: 66, height: 66, opacity: 0 }, `<div style="width:66px;height:66px;background:${a[1]};border:4px solid ${INK};border-radius:18px;box-sizing:border-box;display:flex;align-items:center;justify-content:center">${icon(a[0], 44)}</div>`);
    box(t, { left: -10, top: 70, width: 86, textAlign: 'center', font: '900 14px Arial', color: '#fff' }, a[2]);
    pop(t, T + 1.2 + i * 0.5, { vol: 0.35 + (i % 3) * 0.1 });
    return { el: t, wx: PX - 130 + 12 + cx, wy: PY - 250 + 14 + cy };
  });
  // tile "opens": the tile bounces and a ring flies out of it
  const open = (i, t) => {
    tl.to(tile[i].el, { scale: 1.3, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, t);
    const r = box(world, { left: tile[i].wx - 33, top: tile[i].wy - 33, width: 66, height: 66, border: `6px solid ${PP.red}`, borderRadius: '50%', opacity: 0 });
    tl.fromTo(r, { opacity: 1, scale: 1 }, { opacity: 0, scale: 3.2, duration: 0.7, ease: 'power2.out', immediateRender: false }, t); sfx('whoosh', t, 0.4);
  };
  headline(world, { x: 700, y: 190, text: 'STEP 7: APPS', size: 74, color: '#fff', T: T + 0.8, w: 640, out: st(1) + 0.2, rot: -3 });
  headline(world, { x: 700, y: 300, text: 'Your phone = your toolbox', size: 40, color: PP.white, T: st(0) + 3.2, w: 560, out: st(1) + 0.2, rot: 2 });
  headline(world, { x: 700, y: 360, text: 'free, today', size: 44, color: PP.red, T: st(0) + 4.4, w: 500, out: st(1) + 0.2, rot: -2 });
  // ---- demo card shell (400x400) with a title chip. returns the card element
  const shell = (t, out, title, bg, col) => {
    const e = card(world, { x: 700, y: 355, w: 400, h: 400, html: '', bg: bg || PP.cream, T: t, rot: 1.5, out, sfx: 'whoosh' });
    box(e, { left: 0, top: 0, width: 390, height: 52, background: col || PP.blue, color: '#fff', font: `900 28px/52px ${FONT}`, textAlign: 'center', borderRadius: '13px 13px 0 0', letterSpacing: '2px' }, title); return e;
  };
  const kid = (e, css, html, t, o = {}) => pop(box(e, css, html), t, Object.assign({ sfx: 'pop', vol: 0.4 }, o));
  const row = (e, y, ic, txt, t, bg) => kid(e, { left: 16, top: y, width: 358, height: 54, background: bg || '#fff', border: `4px solid ${INK}`, borderRadius: 12, font: '900 26px Arial', display: 'flex', alignItems: 'center', gap: '12px', padding: '0 12px', boxSizing: 'border-box', color: INK }, icon(ic, 34) + txt, t);

  // ===== beat 1 (line 1): JOBS demo + "Never pay to apply"
  open(0, st(1) + 0.2);
  const o1 = st(4) - 0.1;
  const d1 = shell(st(1) + 0.5, o1, 'JOBS', PP.cream, PP.blue);
  row(d1, 62, 'suitcase', '<span style="background:#ced4da;width:190px;height:16px;border-radius:8px"></span>', st(1) + 1.8);
  row(d1, 122, 'suitcase', '<span style="background:#ced4da;width:150px;height:16px;border-radius:8px"></span>', st(1) + 2.4);
  kid(d1, { left: 8, top: 190, width: 374, height: 64, background: PP.red, color: '#fff', border: `4px solid ${INK}`, borderRadius: 12, font: `900 30px/64px ${FONT}`, textAlign: 'center', boxSizing: 'border-box' }, 'Never pay to apply', st(1) + 5.2, { sfx: 'buzz', vol: 0.4 });
  [['Training', 8.9], ['Uniform', 9.9], ['"Background check"', 11.0]].forEach((x, i) => row(d1, 266 + i * 42 - (i ? 0 : 0), 'xmark', x[0], st(1) + x[1], '#ffe8e8').style.height = '38px');
  stamp(world, { x: 1020, y: 270, w: 300, size: 38, text: 'NEVER PAY', T: st(1) + 12.0, out: o1, rot: -8 });
  // banter bubbles (already voiced)
  speech(world, { x: 940, y: 112, w: 330, text: L[2].text, who: 'CHIDI', color: '#ff7b00', tail: 'right', T: st(2), D: L[2].dur + 0.3 });
  speech(world, { x: 1040, y: 112, w: 340, text: L[3].text, who: 'KIRAN', color: '#2a9d8f', tail: 'right', T: st(3), D: L[3].dur + 0.3 });
  chidi.arm('f', -120, -30, st(2), 0.3); chidi.arm('f', 0, 0, st(3) + 0.4, 0.5); kiran.arm('f', -70, -60, st(3) + 0.2, 0.4); kiran.arm('f', 0, 0, st(4), 0.5);

  // ===== beat 2 (line 4): MAPS with blue dot, bus routes, "7 minutes"
  open(1, st(4) + 0.2);
  const o2 = st(5) - 0.1;
  const d2 = shell(st(4) + 0.5, o2, 'MAPS', '#e8f5e9', PP.teal);
  const map = box(d2, { left: 0, top: 52, width: 390, height: 338, opacity: 0 }, `<svg viewBox="0 0 390 338" width="390" height="338"><rect width="390" height="338" fill="#e9f5db"/><path d="M-10 250 Q120 200 200 270 T400 230 V300 Q300 340 200 320 T-10 300Z" fill="#8ecae6" stroke="${INK}" stroke-width="3"/><rect x="250" y="30" width="110" height="80" rx="16" fill="#95d5b2" stroke="${INK}" stroke-width="3"/><path d="M0 120 H390 M120 0 V338 M270 0 V200" stroke="#fff" stroke-width="16"/><path d="M0 120 H390 M120 0 V338 M270 0 V200" stroke="${INK}" stroke-width="2" stroke-dasharray="10 12"/><path id="rt1" d="M60 300 V120 H270 V40" fill="none" stroke="${PP.red}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="560" stroke-dashoffset="560"/><path id="rt2" d="M120 20 V120 H270 V190" fill="none" stroke="${PP.purple}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="400" stroke-dashoffset="400"/></svg>`);
  tl.to(map, { opacity: 1, duration: 0.3 }, st(4) + 0.9);
  const dot = box(d2, { left: 100, top: 52 + 104, width: 40, height: 40, background: PP.blue, border: '5px solid #fff', borderRadius: '50%', boxShadow: `0 0 0 3px ${INK}`, opacity: 0 }); pop(dot, st(4) + 1.2, { vol: 0.4 });
  const pulse = box(d2, { left: 100, top: 52 + 104, width: 40, height: 40, border: `5px solid ${PP.blue}`, borderRadius: '50%', opacity: 0 });
  tl.fromTo(pulse, { opacity: 0.9, scale: 1 }, { opacity: 0, scale: 3, duration: 1.1, repeat: 5, ease: 'power1.out', immediateRender: false }, st(4) + 1.4);
  const busb = kid(d2, { left: 316, top: 62, width: 64, height: 64, background: '#fff', border: `4px solid ${INK}`, borderRadius: 16, boxSizing: 'border-box', paddingTop: 4, paddingLeft: 4 }, icon('bus', 46), st(4) + 2.2);
  const tap = box(d2, { left: 316, top: 62, width: 64, height: 64, border: `6px solid ${PP.orange}`, borderRadius: '50%', opacity: 0 }); tl.fromTo(tap, { opacity: 1, scale: 0.8 }, { opacity: 0, scale: 2.2, duration: 0.6, immediateRender: false }, st(4) + 2.9); sfx('tick', st(4) + 2.9, 0.8);
  const r1 = d2.querySelector('#rt1'), r2 = d2.querySelector('#rt2');
  tl.to(r1, { strokeDashoffset: 0, duration: 1.1, ease: 'power1.inOut' }, st(4) + 3.3); tl.to(r2, { strokeDashoffset: 0, duration: 0.9, ease: 'power1.inOut' }, st(4) + 4.0); sfx('swish', st(4) + 3.3, 0.4);
  kid(d2, { left: 242, top: 60, width: 56, height: 56 }, icon('pin', 50), st(4) + 4.6);
  const pop7 = kid(d2, { left: 70, top: 262, width: 250, height: 92, background: PP.yellow, border: `5px solid ${INK}`, borderRadius: 16, boxShadow: `5px 5px 0 ${INK}`, font: `900 42px/46px ${FONT}`, textAlign: 'center', boxSizing: 'border-box', paddingTop: 6, color: INK }, '7 minutes<div style="font:800 20px Arial">walk to the stop</div>', st(4) + 5.8, { sfx: 'ding', vol: 0.8, rot: -3 });

  // ===== beat 3 (line 5): bus times board counting down, then Citymapper, Trainline ticket, TfL Go
  open(2, st(5) + 0.2);
  const o3 = st(5) + 6.2, d3 = shell(st(5) + 0.5, o3, 'BUS TIMES', PP.navy, PP.red);
  kid(d3, { left: 20, top: 70, width: 350, height: 90, background: '#000', border: `4px solid ${PP.yellow}`, borderRadius: 12, boxSizing: 'border-box', color: PP.yellow, font: `900 22px/86px ${FONT}`, paddingLeft: 14 }, 'NEXT BUS', st(5) + 1.0);
  [7, 6, 5, 4, 3, 'DUE'].forEach((n, i) => { const b = box(d3, { left: 220, top: 70, width: 150, height: 90, color: PP.yellow, font: `900 ${n === 'DUE' ? 42 : 58}px/86px ${FONT}`, textAlign: 'center', opacity: 0 }, n === 'DUE' ? n : n + "'");
    tl.set(b, { opacity: 1 }, st(5) + 1.3 + i * 0.65); if (i < 5) tl.set(b, { opacity: 0 }, st(5) + 1.3 + (i + 1) * 0.65); sfx('tick', st(5) + 1.3 + i * 0.65, 0.35); });
  kid(d3, { left: 20, top: 176, width: 350, height: 56, background: PP.sky, border: `4px solid ${INK}`, borderRadius: 12, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: '12px', padding: '0 12px', font: '900 26px Arial', color: INK }, icon('card', 36) + 'Tickets in the app', st(5) + 2.6);
  kid(d3, { left: 60, top: 258, width: 270, height: 70, background: PP.pink, color: '#fff', border: `4px solid ${INK}`, borderRadius: 14, font: `900 34px/62px ${FONT}`, textAlign: 'center', boxSizing: 'border-box' }, 'Citymapper', st(5) + 4.6, { rot: -3 });
  open(3, st(5) + 6.2);
  const d4 = shell(st(5) + 6.5, en(5) + 0.1, 'TRAINS', PP.cream, PP.blue);
  const tk = kid(d4, { left: 24, top: 74, width: 342, height: 150, background: '#fff', border: `4px solid ${INK}`, borderRadius: 14, boxSizing: 'border-box' }, `<div style="position:absolute;left:14px;top:12px">${icon('train', 62)}</div><div style="position:absolute;left:90px;top:16px;font:900 30px Arial">TRAIN TICKET</div><div style="position:absolute;left:14px;right:14px;top:92px;height:46px;background:repeating-linear-gradient(90deg,${INK} 0 5px,#fff 5px 9px,${INK} 9px 11px,#fff 11px 18px)"></div><div style="position:absolute;left:0;right:0;top:80px;border-top:4px dashed ${INK}"></div>`, st(5) + 7.2, { rot: -2 });
  kid(d4, { left: 60, top: 240, width: 270, height: 64, background: PP.teal, color: '#fff', border: `4px solid ${INK}`, borderRadius: 14, font: `900 34px/56px ${FONT}`, textAlign: 'center', boxSizing: 'border-box' }, 'Trainline', st(5) + 8.4, { rot: 2 });
  kid(d4, { left: 60, top: 316, width: 270, height: 64, background: PP.orange, color: INK, border: `4px solid ${INK}`, borderRadius: 14, font: `900 34px/56px ${FONT}`, textAlign: 'center', boxSizing: 'border-box' }, 'TfL Go', st(5) + 11.4, { rot: -2 });

  // ===== beat 4 (line 6): NHS App, banking app, GOV.UK bookmark
  open(5, st(6) + 0.2);
  const d5 = shell(st(6) + 0.5, en(6) + 0.1, 'ADD THESE', PP.cream, PP.green);
  row(d5, 70, 'cross', 'NHS App', st(6) + 0.9, PP.white);
  kid(d5, { left: 30, top: 128, width: 330, font: '800 22px Arial', color: INK }, 'health records · prescriptions', st(6) + 1.8, { sfx: false });
  kid(d5, { left: 316, top: 74, width: 50, height: 50 }, icon('tick', 48), st(6) + 3.0, { sfx: 'ding', vol: 0.6 });
  open(6, st(6) + 4.1);
  row(d5, 176, 'bank', 'Banking app', st(6) + 4.3, PP.white);
  kid(d5, { left: 316, top: 180, width: 50, height: 50 }, icon('tick', 48), st(6) + 5.0, { sfx: 'ding', vol: 0.6 });
  open(7, st(6) + 5.6);
  row(d5, 282, 'shield', 'GOV.UK', st(6) + 5.8, PP.white);
  kid(d5, { left: 30, top: 340, width: 330, font: '800 22px Arial', color: INK }, 'saved as a bookmark', st(6) + 6.8, { sfx: false });
  kid(d5, { left: 316, top: 286, width: 50, height: 50 }, icon('tick', 48), st(6) + 7.2, { sfx: 'ding', vol: 0.6 });

  // ===== beat 5 (line 7): marketplace with a GBP 5 chair, golden rule, then the finale on the phone
  open(8, st(7) + 0.2);
  const o5 = st(7) + 3.6, d6 = shell(st(7) + 0.5, o5, 'SECOND-HAND', PP.mint, PP.purple);
  kid(d6, { left: 100, top: 62, width: 190, height: 200 }, `<svg viewBox="0 0 100 110" width="190" height="209" style="overflow:visible;stroke:${INK};stroke-width:4;stroke-linejoin:round"><rect x="26" y="6" width="48" height="52" rx="6" fill="${PP.orange}"/><rect x="18" y="54" width="64" height="16" rx="5" fill="${PP.yellow}"/><path d="M26 70 L20 106 M74 70 L80 106 M34 70 V100 M66 70 V100" stroke-linecap="round" fill="none"/></svg>`, st(7) + 0.8);
  kid(d6, { left: 255, top: 80, width: 110, height: 70, background: PP.red, color: '#fff', border: `4px solid ${INK}`, borderRadius: 14, font: `900 44px/62px ${FONT}`, textAlign: 'center', boxSizing: 'border-box', boxShadow: `4px 4px 0 ${INK}` }, '£5', st(7) + 1.3, { rot: 8, sfx: 'cash', vol: 0.7 });
  kid(d6, { left: 14, top: 266, width: 112, height: 48, background: '#fff', border: `4px solid ${INK}`, borderRadius: 10, font: '900 26px/40px Arial', textAlign: 'center', boxSizing: 'border-box' }, 'Vinted', st(7) + 1.8);
  kid(d6, { left: 134, top: 266, width: 242, height: 48, background: '#fff', border: `4px solid ${INK}`, borderRadius: 10, font: '900 19px/40px Arial', textAlign: 'center', boxSizing: 'border-box' }, 'Facebook Marketplace', st(7) + 2.4);
  kid(d6, { left: 14, top: 326, width: 362, height: 50, background: PP.yellow, border: `4px solid ${INK}`, borderRadius: 12, font: `900 21px/42px ${FONT}`, textAlign: 'center', boxSizing: 'border-box' }, 'Golden rule: need, not want', st(7) + 3.0, { sfx: 'tick', vol: 0.8 });
  // finale: phone shakes, home screen reads "9 apps, 0 debts"
  const F = st(7) + 3.7;
  const fin = box(ph.screen, { left: 0, top: 0, width: 236, height: 472, background: PP.navy, color: PP.yellow, font: `900 50px/1.1 ${FONT}`, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0 }, `9 apps,<br><span style="color:#fff">0 debts</span>`);
  tl.to(fin, { opacity: 1, duration: 0.25 }, F + 0.3); tl.to(ph.el, { x: '+=8', duration: 0.05, yoyo: true, repeat: 7 }, F); sfx('thud', F, 0.6); sfx('chime', F + 0.4, 0.8);
  headline(world, { x: 760, y: 220, text: '9 apps, 0 debts', size: 70, color: PP.yellow, T: F + 0.5, w: 640, rot: -3 });
  burst(world, { x: 760, y: 250, r: 190, color: PP.pink, T: F + 0.4 });
  // keep headline above the burst (re-append)
  world.appendChild(world.lastChild.previousSibling);
  chidi.emote('happy', F + 0.4); kiran.emote('happy', F + 0.4); kiran.arm('f', -100, -20, F + 0.5, 0.5); chidi.arm('f', -120, -20, F + 0.6, 0.5);
  // camera: slow push, small
  tl.fromTo(world, { scale: 1 }, { scale: 1.04, duration: D, ease: 'none' }, T);
})();
