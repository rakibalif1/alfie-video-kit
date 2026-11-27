// ===== DUSK: the village at nightfall (scene 'dusk') =====
(function () {
  const w = win('dusk'), c = S('dusk'), T = w.T, D = w.D, L = box(c, { left: 0, top: 0, width: W, height: H });
  sky(L, { top: '#140d2e', mid: '#4a2458', bot: '#e8864e', stars: 35, moon: { x: 1000, y: 140, r: 22 }, T, D });
  // a thin band of afterglow on the horizon
  const glowBand = box(L, { left: 0, top: 360, width: W, height: 90, background: 'linear-gradient(rgba(255,150,70,0), rgba(255,150,70,0.45), rgba(255,150,70,0))', filter: 'blur(14px)' });
  tl.to(glowBand, { opacity: 0.25, duration: D * 0.8, ease: 'none' }, T);
  ridge(L, { y: 370, h: 150, color: '#1d1233', seed: 3, amp: 36, drift: -30, T, D });
  ridge(L, { y: 420, h: 150, color: '#120b24', seed: 8, amp: 30, trees: 20, treeH: 60, drift: -60, T, D });
  // flooded paddy fields reflecting the last light
  box(L, { left: 0, top: 480, width: W, height: 240, background: 'linear-gradient(#5a2d4f, #1a0f2c 40%, #070510)' });
  for (let i = 0; i < 9; i++) { const ln = box(L, { left: -50, top: 500 + i * 22, width: W + 100, height: 2, background: `rgba(255,170,110,${0.26 - i * 0.025})` }); tl.to(ln, { x: (i % 2 ? 1 : -1) * 30, duration: 6, yoyo: true, repeat: Math.max(1, Math.floor(D / 6)), ease: 'sine.inOut' }, T); }
  hut(L, { x: 300, y: 505, s: 0.9, T, D }); hut(L, { x: 540, y: 495, s: 0.65, T, D }); hut(L, { x: 820, y: 500, s: 0.8, T, D }); hut(L, { x: 1010, y: 492, s: 0.55, T, D, lit: true });
  mist(L, { y: 470, h: 120, op: 0.28, n: 4, T, D });
  // conch shell calls: soft rings spreading from three houses, one after another
  [[300, 470, 1.5], [820, 466, 4.0], [540, 462, 6.5]].forEach(([x, y, dt]) => { for (let k = 0; k < 3; k++) { const r = box(L, { left: x - 20, top: y - 20, width: 40, height: 40, borderRadius: '50%', border: '2px solid rgba(255,210,150,0.8)', opacity: 0 }); tl.fromTo(r, { scale: 0.3, opacity: 0.7 }, { scale: 9, opacity: 0, duration: 3, ease: 'sine.out' }, T + dt + k * 0.7); } });
  // fireflies in the foreground grass
  orbs(L, { n: 12, x0: 60, x1: 1220, y0: 520, y1: 650, T, D, color: '#e8ff9a', seed: 77 });
  palm(L, { x: 90, y: 700, s: 1.35, h: 360, T, D }); palm(L, { x: 1190, y: 700, s: 1.15, h: 330, T, D }); palm(L, { x: 205, y: 700, s: 0.9, h: 300, T, D });
  box(L, { left: 0, top: 640, width: W, height: 80, background: 'linear-gradient(rgba(5,4,12,0), #05040c 70%)' });
  drift(L, T, D, { s0: 1.0, s1: 1.07, x1: -24, origin: '50% 62%' });
})();
