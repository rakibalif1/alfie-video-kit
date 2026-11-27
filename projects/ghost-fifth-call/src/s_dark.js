// ===== DARK: the hours of waiting, the fifth call, the lamp goes out (scene 'dark') =====
// Timeline inside the scene: 0-14 near-dark room, 14-26 push-in + heartbeat, 18-28 tilt to floor, 28.5 lamp out, 34-45 breath fog.
(function () {
  const w = win('dark'), c = S('dark'), T = w.T, D = w.D, R = rr(606);
  const P = box(c, { left: 0, top: 0, width: W, height: H }), Q = box(P, { left: 0, top: 0, width: W, height: H }), L = box(Q, { left: 0, top: 0, width: W, height: H });
  const OUT = T + 28.5;
  // wall and floor
  box(L, { left: 0, top: 0, width: W, height: 560, background: 'linear-gradient(#0c0a14, #15101a 70%, #0d0a12)' });
  for (let i = 0; i < 5; i++) box(L, { left: 60 + R() * 1100, top: 20 + R() * 400, width: 1.5, height: 50 + R() * 90, background: 'rgba(0,0,0,0.35)', transform: `rotate(${R() * 30 - 15}deg)` });
  box(L, { left: 0, top: 548, width: W, height: 560, background: 'linear-gradient(#120e16, #050408 45%, #020204)' });
  for (let i = 0; i < 10; i++) box(L, { left: 0, top: 560 + i * i * 4 + i * 8, width: W, height: 2, background: 'rgba(0,0,0,0.5)' });
  // window: dim blue pane, outside glows going out one by one, thin rain, shutter slats
  const wx = 870, wy = 130, ww = 240, wh = 290;
  const pane = box(L, { left: wx, top: wy, width: ww, height: wh, background: 'linear-gradient(#274c92, #12296a)', overflow: 'hidden', opacity: 0.5 });
  for (let t = 0; t < 9; t += 0.18) tl.set(pane, { opacity: 0.4 + R() * 0.28 }, T + t);
  tl.set(pane, { opacity: 0.42 }, T + 9.2);
  [[40, 200, '#ffd08a'], [110, 230, '#9dffd9'], [170, 190, '#ffd08a'], [70, 150, '#c9ffb0'], [200, 240, '#ffd08a']].forEach(([x, y, col], i) => {
    const g = box(pane, { left: x, top: y, width: 10, height: 10, borderRadius: '50%', background: col, boxShadow: `0 0 18px 8px ${col}`, opacity: 0.8 });
    tl.fromTo(g, { opacity: 0.8 }, { opacity: 0, duration: 1.6 }, T + 1.8 + i * 2.1);
  });
  const rw = box(pane, { left: 0, top: 0, width: ww, height: wh, overflow: 'hidden' }), rn = rain(box(rw, { left: 0, top: 0, width: ww, height: wh }), { n: 45, op: 0.5, T, D: 12, len: 22, seed: 14 });
  tl.fromTo(rw, { opacity: 1 }, { opacity: 0, duration: 10, ease: 'sine.in' }, T);
  for (let i = 0; i < 6; i++) box(L, { left: wx + i * (ww / 5) - 3, top: wy, width: 7, height: wh, background: '#07060c' });
  [0, 0.5, 1].forEach((f) => box(L, { left: wx - 8, top: wy + f * wh - 4, width: ww + 16, height: 9, background: '#07060c' }));
  // bed (charpoy) with a dark gap beneath it
  box(L, { left: 70, top: 482, width: 440, height: 66, background: '#010103' });
  box(L, { left: 40, top: 466, width: 490, height: 16, background: '#1a131d', borderRadius: 4 });
  [50, 500].forEach((x) => box(L, { left: x, top: 482, width: 16, height: 66, background: '#0b080e' }));
  box(L, { left: 55, top: 454, width: 160, height: 14, background: '#241a26', borderRadius: 7 });
  // Arun, seated on the bed edge, head bowed, still (breathing only)
  const ar = box(L, { left: 330, top: 222, width: 260, height: 330 }, `<svg viewBox="0 0 200 254" width="100%" height="100%"><g fill="#040408" stroke="#040408"><path d="M45 175 Q38 100 70 62 Q96 50 106 72 Q112 120 100 178Z" stroke="none"/><circle cx="104" cy="42" r="22" stroke="none"/><path d="M68 170 L150 176" stroke-width="38" stroke-linecap="round"/><path d="M150 176 L158 238" stroke-width="28" stroke-linecap="round"/><ellipse cx="170" cy="248" rx="22" ry="7" stroke="none"/><path d="M95 88 L134 140 L152 162" stroke-width="17" stroke-linecap="round" fill="none"/></g></svg>`);
  tl.fromTo(ar, { scaleY: 1 }, { scaleY: 1.012, duration: 3.5, yoyo: true, repeat: Math.floor(D / 3.5), ease: 'sine.inOut', transformOrigin: '50% 100%' }, T);
  // table and the lamp (own build so the flame and glow can be shrunk and snuffed)
  box(L, { left: 630, top: 456, width: 150, height: 10, background: '#1c141a' });
  [640, 760].forEach((x) => box(L, { left: x, top: 466, width: 10, height: 84, background: '#0a070c' }));
  const lx = 705, ly = 424;
  const G = box(L, { left: lx - 400, top: ly - 400, width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,170,70,0.5) 0%, rgba(255,120,40,0.16) 30%, rgba(0,0,0,0) 62%)', mixBlendMode: 'screen', opacity: 0.5 });
  const lm = box(L, { left: lx - 18, top: ly - 28, width: 36, height: 54 }, `<svg viewBox="0 0 40 60" width="100%" height="100%" style="overflow:visible"><path d="M13 4 H27 V10 H13Z" fill="#111"/><path class="gl" d="M11 12 H29 L32 44 H8Z" fill="rgba(255,200,120,0.55)" stroke="#111" stroke-width="2"/><path class="fl" d="M20 44 C14 36 16 28 20 20 C24 28 26 36 20 44Z" fill="#fff6c8"/><rect x="6" y="44" width="28" height="7" rx="2" fill="#111"/></svg>`);
  const fl = lm.querySelector('.fl'), gl = lm.querySelector('.gl');
  for (let t = 0; t < 26; t += 0.14 + R() * 0.12) { const k = t < 14 ? 1 : 0.5; tl.set(fl, { scaleY: 0.85 + R() * 0.3 * k, scaleX: 0.9 + R() * 0.2, svgOrigin: '20 44' }, T + t); if (t < 14) tl.set(G, { opacity: 0.4 + R() * 0.14 }, T + t); }
  for (let t = 14; t < 26; t++) { const b = T + t; tl.fromTo(G, { opacity: 0.5, scale: 1 }, { opacity: 0.64, scale: 1.07, duration: 0.12, ease: 'power2.out', immediateRender: false }, b).to(G, { opacity: 0.5, scale: 1, duration: 0.2 }, b + 0.12).to(G, { opacity: 0.58, scale: 1.04, duration: 0.1 }, b + 0.34).to(G, { opacity: 0.5, scale: 1, duration: 0.25 }, b + 0.44); }
  tl.fromTo(fl, { scaleY: 0.9, svgOrigin: '20 44' }, { scaleY: 0.4, duration: 2.4, ease: 'sine.in', svgOrigin: '20 44', immediateRender: false }, T + 26);
  tl.to(G, { opacity: 0.3, duration: 2.4 }, T + 26.05);
  tl.to(fl, { scaleY: 0, duration: 0.2, svgOrigin: '20 44' }, OUT).to(G, { opacity: 0, duration: 0.6 }, OUT).to(gl, { opacity: 0.1, duration: 0.5 }, OUT);
  // dust in the lamp light
  const dust = box(L, { left: 0, top: 0, width: W, height: H, opacity: 0 });
  for (let i = 0; i < 18; i++) { const d = box(dust, { left: lx - 160 + R() * 320, top: ly - 130 + R() * 230, width: 2.5, height: 2.5, borderRadius: '50%', background: '#ffd9a0', opacity: 0.4 + R() * 0.5 }); tl.fromTo(d, { x: 0, y: 0 }, { x: R() * 40 - 20, y: -30 - R() * 30, duration: 5 + R() * 4, yoyo: true, repeat: 5, ease: 'sine.inOut' }, T + R() * 3); }
  tl.fromTo(dust, { opacity: 0 }, { opacity: 1, duration: 2 }, T + 12).to(dust, { opacity: 0, duration: 1.5 }, T + 27.5);
  // darkness when the lamp dies
  const dk = box(L, { left: -200, top: -200, width: W + 400, height: H + 900, background: '#000', opacity: 0 });
  tl.to(dk, { opacity: 0.58, duration: 0.8 }, OUT);
  // cold light along the floor and under the bed ('Look under the bed')
  const strip = box(L, { left: 0, top: 548, width: W, height: 40, background: 'linear-gradient(rgba(120,170,255,0), rgba(120,170,255,0.4) 30%, rgba(0,0,0,0))', filter: 'blur(5px)', opacity: 0 });
  const edge = box(L, { left: 70, top: 543, width: 440, height: 4, background: 'rgba(170,205,255,0.8)', filter: 'blur(2px)', opacity: 0 });
  const spill = box(L, { left: 0, top: 0, width: W, height: 800, filter: 'blur(12px)' }, `<svg viewBox="0 0 ${W} 800" width="${W}" height="800"><polygon points="${wx},548 ${wx + ww},548 ${wx + ww + 120},800 ${wx - 90},800" fill="rgba(80,130,230,0.16)"/></svg>`);
  tl.fromTo(strip, { opacity: 0 }, { opacity: 0.8, duration: 5 }, T + 19);
  tl.fromTo(edge, { opacity: 0 }, { opacity: 0.55, duration: 4 }, T + 22);
  tl.to(strip, { opacity: 0.4, duration: 3 }, OUT + 1).to(edge, { opacity: 0.3, duration: 3 }, OUT + 1);
  // breath: a pale fog puff slides out from under the bed and dissolves
  for (let i = 0; i < 7; i++) { const f = box(L, { left: 230 + R() * 160, top: 520, width: 110, height: 60, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(215,230,255,0.55), rgba(0,0,0,0) 70%)', filter: 'blur(9px)', opacity: 0, mixBlendMode: 'screen' }); tl.fromTo(f, { x: 0, y: 0, scale: 0.6, opacity: 0 }, { x: 150 + R() * 140, y: -50 - R() * 60, scale: 3, opacity: 0.42, duration: 3, ease: 'sine.out' }, T + 34 + i * 0.9).to(f, { opacity: 0, duration: 3.5, x: '+=60', y: '-=30', scale: 3.8 }, T + 37 + i * 0.9); }
  // camera: slow push to the lamp, then a tilt down to the floor
  tl.fromTo(P, { scale: 1 }, { scale: 1.16, duration: 30, ease: 'sine.inOut', transformOrigin: '58% 62%' }, T + 6);
  tl.fromTo(Q, { y: 0 }, { y: -130, duration: 9, ease: 'sine.inOut' }, T + 19);
})();
