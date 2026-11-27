// ===== DAWN: morning after + closing lines (scene 'dawn'). Beats follow the real voice timing: rooster 0-8, room 8.6-17.6, telegram 17.6-26.9, grandmother 26.9-37.4, five orbs 37.4-52 =====
(function () {
  const w = win('dawn'), c = S('dawn'), T = w.T, D = w.D, t_ = (t) => T + t;
  box(c, { left: 0, top: 0, width: W, height: H, background: '#000' });
  const layer = (a, b, first) => { const g = box(c, { left: 0, top: 0, width: W, height: H }); if (!first) tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.8 }, t_(a)); if (b) tl.to(g, { opacity: 0, duration: 0.9 }, t_(b)); return g; };
  const motes = (p, n, x0, y0, x1, y1, seed, a, d) => { const R = rr(seed); for (let i = 0; i < n; i++) { const m = box(p, { left: x0 + R() * (x1 - x0), top: y0 + R() * (y1 - y0), width: 2 + R() * 2.5, height: 2 + R() * 2.5, borderRadius: '50%', background: '#e8f0ff', opacity: 0.2 + R() * 0.45, filter: 'blur(0.6px)' }); tl.to(m, { y: -50 + R() * 90, x: 30 - R() * 60, opacity: 0.1, duration: 3 + R() * 3, yoyo: true, repeat: Math.floor(d / 4), ease: 'sine.inOut' }, t_(a)); } };
  const beam = (p, x0, w0, x1, w1, y0, y1, op) => { const o = box(p, { left: 0, top: 0, width: W, height: H, filter: 'blur(9px)', mixBlendMode: 'screen', opacity: op }); box(o, { left: 0, top: 0, width: W, height: H, background: 'linear-gradient(rgba(200,225,255,0.55), rgba(200,225,255,0.05))', clipPath: `polygon(${x0}px ${y0}px, ${x0 + w0}px ${y0}px, ${x1 + w1}px ${y1}px, ${x1}px ${y1}px)` }); return o; };
  const sil = '#06080d';
  // ---- 1. pre-dawn through the window, rooster on the fence (0-8.9 s)
  const g1 = layer(0, 8.4, true);
  box(g1, { left: 0, top: 0, width: W, height: 560, background: 'linear-gradient(#18223a 0%, #34476a 40%, #7d8aa3 66%, #e0a077 100%)' });
  const sun = box(g1, { left: 190, top: 220, width: 900, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,175,100,0.9) 0%, rgba(255,140,80,0.3) 40%, rgba(0,0,0,0) 70%)', mixBlendMode: 'screen', opacity: 0.1 });
  tl.to(sun, { opacity: 0.85, duration: 8, ease: 'sine.inOut' }, T);
  ridge(g1, { y: 400, h: 140, color: '#26324a', seed: 5, amp: 26, T, D: 9, drift: -20 }); ridge(g1, { y: 440, h: 110, color: '#10141f', seed: 9, amp: 18, trees: 16, treeH: 60, T, D: 9, drift: -36 });
  hut(g1, { x: 300, y: 500, s: 0.9, lit: false, T, D: 9 }); hut(g1, { x: 520, y: 492, s: 0.6, T, D: 9, lit: false });
  mist(g1, { y: 450, h: 100, op: 0.3, n: 4, T, D: 9 });
  box(g1, { left: 0, top: 500, width: W, height: 230, background: 'linear-gradient(#0d1018, #05060a 60%)' });
  box(g1, { left: 480, top: 535, width: 800, height: 7, background: sil }); box(g1, { left: 480, top: 565, width: 800, height: 6, background: sil });
  for (let x = 500; x < 1280; x += 85) box(g1, { left: x, top: 515, width: 9, height: 70, background: sil });
  const ro = box(g1, { left: 790, top: 401, width: 120, height: 140 }, `<svg viewBox="0 0 120 140" width="120" height="140" style="overflow:visible" fill="${sil}"><path d="M34 86 Q-4 70 6 18 Q12 8 14 22 Q16 50 40 70Z"/><path d="M34 90 Q4 90 -6 52 Q4 54 16 62 Q30 74 42 78Z"/><ellipse cx="58" cy="88" rx="32" ry="24"/><rect x="52" y="108" width="4" height="26"/><rect x="66" y="108" width="4" height="26"/><g id="neck"><path d="M60 84 Q74 64 76 40 L90 42 Q92 70 82 96Z"/><circle cx="88" cy="36" r="10"/><path d="M84 28 Q86 14 90 24 Q94 14 96 26Q92 28 90 28Z"/><path d="M96 33 L113 37 L96 41Z"/><path id="jaw" d="M96 41 L110 43 L96 46Z"/></g></svg>`);
  const neck = ro.querySelector('#neck'), jaw = ro.querySelector('#jaw');
  tl.to(neck, { rotation: -4, svgOrigin: '70 80', duration: 2, yoyo: true, repeat: 2, ease: 'sine.inOut' }, T + 1);
  tl.to(neck, { scaleY: 1.3, rotation: -16, svgOrigin: '70 80', duration: 0.6, ease: 'back.out' }, T + 5.8).to(neck, { scaleY: 1.22, duration: 0.35, yoyo: true, repeat: 3 }, T + 6.4).to(neck, { scaleY: 1, rotation: 0, svgOrigin: '70 80', duration: 1 }, T + 8);
  tl.to(jaw, { rotation: 20, svgOrigin: '96 41', duration: 0.25, yoyo: true, repeat: 5 }, T + 6.1);
  const fr = { background: '#04050a' }; box(g1, { left: 0, top: 0, width: 46, height: 590, ...fr }); box(g1, { left: 1234, top: 0, width: 46, height: 590, ...fr }); box(g1, { left: 0, top: 0, width: W, height: 34, ...fr }); box(g1, { left: 0, top: 588, width: W, height: 132, ...fr }); box(g1, { left: 636, top: 0, width: 8, height: 590, ...fr }); box(g1, { left: 0, top: 300, width: W, height: 8, ...fr });
  drift(g1, T, 9, { s1: 1.05, x1: -20, origin: '68% 75%' });
  // ---- 2. cold daylight in the post office room: postmaster, Arun with white hair, the bolted door (8.6-17.9 s)
  const g2 = layer(8.2, 17.0);
  box(g2, { left: 0, top: 0, width: W, height: 500, background: 'linear-gradient(#8b98a9, #55627a)' }); box(g2, { left: 0, top: 495, width: W, height: 230, background: 'linear-gradient(#3a404c, #14171d)' });
  box(g2, { left: 90, top: 110, width: 170, height: 220, background: '#d4e4f7', boxShadow: '0 0 60px rgba(210,230,255,0.7)' }); box(g2, { left: 170, top: 110, width: 6, height: 220, background: '#2a303c' }); box(g2, { left: 90, top: 215, width: 170, height: 6, background: '#2a303c' });
  beam(g2, 90, 170, 330, 300, 120, 590, 0.55);
  box(g2, { left: 930, top: 90, width: 210, height: 440, background: 'linear-gradient(90deg,#241b14,#30241a 50%,#241b14)' }); for (let i = 1; i < 5; i++) box(g2, { left: 930 + i * 42, top: 90, width: 2, height: 440, background: '#120d09' });
  box(g2, { left: 944, top: 288, width: 16, height: 40, background: '#6b717c' }); box(g2, { left: 1086, top: 288, width: 16, height: 40, background: '#6b717c' }); box(g2, { left: 944, top: 301, width: 150, height: 13, borderRadius: 6, background: 'linear-gradient(#c3c8d0,#6e747e)' }); box(g2, { left: 1004, top: 292, width: 20, height: 30, borderRadius: 8, background: '#4a4f58' });
  const gl = box(g2, { left: 944, top: 301, width: 30, height: 13, background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.8), rgba(255,255,255,0))', mixBlendMode: 'screen' }); tl.fromTo(gl, { x: 0, opacity: 0 }, { x: 120, opacity: 1, duration: 2.2, repeat: 2, repeatDelay: 1.5, ease: 'sine.inOut' }, t_(10));
  box(g2, { left: 250, top: 403, width: 480, height: 72, borderRadius: 10, background: 'linear-gradient(#59627a,#3a4258)' }); box(g2, { left: 250, top: 473, width: 480, height: 22, background: '#24201e' }); box(g2, { left: 262, top: 495, width: 14, height: 40, background: '#24201e' }); box(g2, { left: 706, top: 495, width: 14, height: 40, background: '#24201e' });
  const ar = box(g2, { left: 400, top: 140, width: 260, height: 400, transformOrigin: '40% 100%' }, `<svg viewBox="0 0 260 400" width="260" height="400" style="overflow:visible"><rect x="62" y="236" width="130" height="34" rx="16" fill="#252a38"/><rect x="170" y="250" width="32" height="130" rx="14" fill="#252a38"/><rect x="170" y="372" width="50" height="16" rx="8" fill="#15181f"/><path d="M70 120 Q70 95 110 92 Q150 95 150 125 L156 250 L60 250Z" fill="#2b3040"/><g id="hd"><circle cx="112" cy="62" r="28" fill="#d2c6c0"/><path d="M84 58 Q80 26 112 28 Q144 28 140 58 Q132 42 112 42 Q96 42 84 58Z" fill="#f4f4f7"/><path d="M84 48 Q76 68 86 84 Q90 62 96 52Z" fill="#f4f4f7"/><rect x="123" y="64" width="9" height="2.5" fill="#3a3340"/></g><path d="M84 112 Q68 180 112 232" stroke="#2b3040" stroke-width="22" fill="none" stroke-linecap="round"/><circle cx="118" cy="238" r="11" fill="#d2c6c0"/><circle cx="136" cy="240" r="10" fill="#c8bcb6"/></svg>`);
  tl.to(ar.querySelector('#hd'), { rotation: 5, svgOrigin: '112 90', duration: 4, yoyo: true, repeat: 2, ease: 'sine.inOut' }, t_(8.6)); tl.to(ar, { y: 3, duration: 2.5, yoyo: true, repeat: 4, ease: 'sine.inOut' }, t_(8.6));
  const pm = box(g2, { left: 700, top: 100, width: 200, height: 440, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 200 440" width="200" height="440" fill="${sil}"><circle cx="100" cy="60" r="26"/><path d="M70 38 Q100 14 130 38 L130 44 L70 44Z"/><path d="M55 100 Q100 85 145 100 L162 300 L172 440 L28 440 L38 300Z"/><path d="M140 110 Q175 190 130 250" stroke="${sil}" stroke-width="20" fill="none"/></svg>`);
  tl.fromTo(pm, { rotation: -1 }, { rotation: 1.2, duration: 4, yoyo: true, repeat: 3, ease: 'sine.inOut' }, t_(8.6));
  box(g2, { left: 0, top: 0, width: W, height: H, background: 'rgba(120,150,200,0.1)', mixBlendMode: 'multiply' }); motes(g2, 24, 150, 150, 560, 480, 3, 8.6, 9);
  drift(g2, t_(8.2), 9.5, { s1: 1.07, x1: -30, origin: '40% 55%' });
  // ---- 3. the telegram, '9 PM' stamped big (17.6-26.9 s)
  const g3 = layer(17.2, 26.2);
  box(g3, { left: 0, top: 0, width: W, height: H, background: 'radial-gradient(ellipse at 40% 20%, #364254, #10141c 70%)' }); beam(g3, 60, 140, 360, 300, -20, 700, 0.5); beam(g3, 260, 90, 600, 220, -20, 700, 0.35); motes(g3, 34, 100, 80, 900, 520, 8, 17.4, 9.5);
  const pp = box(g3, { left: 400, top: 105, width: 480, height: 350, background: 'linear-gradient(#efe6cc,#d8cba8)', boxShadow: '0 24px 60px rgba(0,0,0,0.7)', fontFamily: "'Courier New', monospace", color: '#2a2418', textAlign: 'center' });
  const ln = (y, sz, txt, ls) => box(pp, { left: 0, top: y, width: 480, fontSize: sz, letterSpacing: ls, fontWeight: 700, opacity: 0 }, txt);
  const l1 = ln(26, 22, 'TELEGRAM  —  URGENT', '5px'), l2 = ln(78, 20, 'FROM KOLKATA G.P.O.', '3px'), l3 = ln(122, 24, 'MOTHER PASSED AWAY LAST NIGHT', '1px');
  const st = box(pp, { left: 90, top: 185, width: 300, height: 120, border: '7px solid #7a1d1d', borderRadius: 10, color: '#7a1d1d', fontFamily: "'Courier New', monospace", fontWeight: 900, fontSize: 84, lineHeight: '106px', whiteSpace: 'nowrap', textAlign: 'center', opacity: 0, rotate: '-4deg' }, '9 PM');
  tl.fromTo(pp, { y: 70, opacity: 0, rotation: -5 }, { y: 0, opacity: 1, rotation: -2, duration: 1.6, ease: 'sine.out' }, t_(17.8)).to(pp, { rotation: -1.2, y: 4, duration: 3.2, yoyo: true, repeat: 2, ease: 'sine.inOut' }, t_(19.6));
  tl.to(l1, { opacity: 0.85, duration: 0.8 }, t_(19.4)).to(l2, { opacity: 0.85, duration: 0.8 }, t_(20.4)).to(l3, { opacity: 0.85, duration: 0.8 }, t_(21.4)).fromTo(st, { opacity: 0, scale: 1.3 }, { opacity: 0.92, scale: 1, duration: 0.5, ease: 'power2.in' }, t_(23.5));
  const hand = (x, rot) => box(g3, { left: x, top: 418, width: 120, height: 130, borderRadius: '45% 45% 30% 30%', background: '#090b10', rotate: rot + 'deg' }); const hl = hand(372, -14), hr = hand(808, 14); box(g3, { left: 390, top: 425, width: 60, height: 38, borderRadius: 20, background: '#090b10' }); box(g3, { left: 830, top: 425, width: 60, height: 38, borderRadius: 20, background: '#090b10' });
  tl.fromTo([hl, hr], { y: 60 }, { y: 0, duration: 1.6, ease: 'sine.out' }, t_(17.8));
  drift(g3, t_(17.2), 9.5, { s1: 1.06, origin: '50% 45%' });
  // ---- 4. grandmother blows out the lamp (26.9-37.4 s): flame dies at ~32 s, then darkness
  const g4 = layer(26.5, 35.2);
  box(g4, { left: 0, top: 0, width: W, height: H, background: 'linear-gradient(#2b1708, #0d0603)' });
  const wall = box(g4, { left: 280, top: 60, width: 1000, height: 700, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,160,70,0.55), rgba(0,0,0,0) 65%)' }); tl.to(wall, { opacity: 0.7, duration: 2.2, yoyo: true, repeat: 2, ease: 'sine.inOut' }, t_(27)); tl.to(wall, { opacity: 0, duration: 1.8 }, t_(32.2));
  box(g4, { left: 640, top: 478, width: 300, height: 120, background: '#100804' }); box(g4, { left: 748, top: 440, width: 64, height: 40, borderRadius: '10px 10px 30px 30px', background: 'linear-gradient(#a8742c,#4a2f10)' }); box(g4, { left: 776, top: 424, width: 8, height: 18, background: '#2a1a08' });
  glow(g4, { x: 780, y: 410, r: 250, T: t_(26.9), D: 5.1 }); const fl = box(g4, { left: 767, top: 378, width: 26, height: 48, background: 'linear-gradient(#fff6c8,#ffb347 70%,#ff7a18)', borderRadius: '50% 50% 50% 50% / 70% 70% 30% 30%', transformOrigin: '50% 100%', mixBlendMode: 'screen' }); const RF = rr(4);
  for (let t = 26.9; t < 32; t += 0.1 + RF() * 0.15) tl.set(fl, { scaleY: 0.85 + RF() * 0.35, scaleX: 0.9 + RF() * 0.2, rotation: (RF() - 0.5) * 8 }, t_(t));
  tl.to(glow(g4, { x: 780, y: 410, r: 60, color: 'rgba(255,200,120,0.9)', T: t_(26.9), D: 0.1, flicker: false }), { opacity: 0, duration: 1.2 }, t_(32));
  tl.to(fl, { rotation: 42, scaleY: 0.5, duration: 0.55, ease: 'sine.in' }, t_(32)).to(fl, { opacity: 0, duration: 0.3 }, t_(32.5));
  const gm = box(g4, { left: 300, top: 110, width: 300, height: 500, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 300 500" width="300" height="500"><path d="M120 110 Q80 140 70 250 L60 500 L270 500 L250 300 Q222 190 204 120Z" fill="#090403"/><circle cx="168" cy="70" r="31" fill="#090403"/><circle cx="132" cy="54" r="17" fill="#090403"/><path d="M196 52 Q204 72 192 90" stroke="#c4803c" stroke-width="3" fill="none" opacity="0.6"/></svg>`);
  tl.to(gm, { rotation: 9, x: 24, duration: 3.5, ease: 'sine.inOut' }, t_(28.2)).to(gm, { rotation: 11, x: 34, duration: 1.2, ease: 'sine.inOut' }, t_(31)).to(gm, { rotation: 3, x: 6, duration: 3, ease: 'sine.inOut' }, t_(33));
  const sm = box(g4, { left: 740, top: 230, width: 120, height: 200, filter: 'blur(2px)' }, `<svg viewBox="0 0 120 200" width="120" height="200" style="overflow:visible"><path pathLength="1" d="M40 190 C52 160 20 140 40 112 C60 84 24 64 46 34 C58 16 50 6 60 0" stroke="rgba(210,210,215,0.65)" stroke-width="4" fill="none" stroke-linecap="round" style="stroke-dasharray:1;stroke-dashoffset:1"/></svg>`);
  const sp = sm.querySelector('path'); tl.fromTo(sp, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2.4, ease: 'sine.out' }, t_(32.3)); tl.to(sm, { opacity: 0, x: 22, y: -30, duration: 2.5 }, t_(33.6)); tl.set(sm, { opacity: 0 }, T); tl.set(sm, { opacity: 1 }, t_(32.3));
  const dk = box(g4, { left: 0, top: 0, width: W, height: H, background: '#000', opacity: 0 }); tl.to(dk, { opacity: 1, duration: 2.6, ease: 'sine.in' }, t_(32.6));
  // ---- 5. five cold orbs on black: appear one by one, vanish one by one, the fifth last (37.4-52 s)
  const g5 = layer(37, 0), R5 = rr(9);
  [[-150, -20], [-72, 38], [0, -34], [74, 34], [150, -14]].forEach(([dx, dy], i) => {
    const e = box(g5, { left: 640 + dx - 28, top: 330 + dy - 28, width: 56, height: 56, borderRadius: '50%', background: 'radial-gradient(circle, #fff 0%, #b8e4ff 14%, rgba(120,170,255,0.28) 42%, rgba(0,0,0,0) 70%)', mixBlendMode: 'screen', opacity: 0 });
    tl.to(e, { opacity: 0.95, duration: 1.6 }, t_(38.6 + i * 2)).to(e, { opacity: 0, duration: i < 4 ? 0.5 : 1.0 }, t_(i < 4 ? 48.7 + i * 0.6 : 51.1));
    tl.to(e, { y: 7 - R5() * 14, x: 5 - R5() * 10, scale: 1.2, duration: 2 + R5() * 1.5, yoyo: true, repeat: 8, ease: 'sine.inOut' }, t_(38.6 + i * 2));
  });
})();
