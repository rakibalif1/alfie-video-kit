// ===== POND: crumbled ghat steps, aleya lights turning to face Arun (scene 'pond') =====
(function () {
  const w = win('pond'), c = S('pond'), T = w.T, D = w.D, R = rr(404);
  const P = box(c, { left: 0, top: 0, width: W, height: H });       // camera push layer (end of scene)
  const L = box(P, { left: 0, top: 0, width: W, height: H });       // gentle drift layer
  sky(L, { top: '#03051a', mid: '#0a1640', bot: '#1d3366', stars: 55, seed: 12, T, D });
  // moon behind clouds
  const mx = 900, my = 120;
  box(L, { left: mx - 130, top: my - 130, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(190,215,255,0.5) 0%, rgba(120,150,255,0.14) 40%, rgba(0,0,0,0) 70%)' });
  const moon = box(L, { left: mx - 26, top: my - 26, width: 52, height: 52, borderRadius: '50%', background: 'radial-gradient(circle at 38% 36%, #fff, #eef3ff 55%, #b9c6e6)', boxShadow: '0 0 50px 10px rgba(180,205,255,0.45)' });
  tl.to(moon, { opacity: 0.8, duration: 5, yoyo: true, repeat: Math.floor(D / 5), ease: 'sine.inOut' }, T);
  for (let i = 0; i < 6; i++) { const cl = box(L, { left: 560 + i * 90 + R() * 40, top: my - 40 + R() * 70, width: 300 + R() * 160, height: 40 + R() * 36, borderRadius: '50%', background: 'rgba(8,14,38,0.88)', filter: 'blur(14px)' }); tl.fromTo(cl, { x: -60 }, { x: 90 + R() * 80, duration: D, ease: 'none' }, T); }
  // pond: black water with a pale reflection of the clouded moon
  const wt = box(L, { left: 0, top: 0, width: W, height: H }); water(wt, { y: 352, h: 380, moonX: mx, T, D, seed: 51 });
  Object.assign(wt.children[1].style, { maskImage: 'linear-gradient(90deg,transparent,#000 50%,transparent)', webkitMaskImage: 'linear-gradient(90deg,transparent,#000 50%,transparent)', opacity: 0.7 });
  box(L, { left: 0, top: 352, width: W, height: 370, background: 'linear-gradient(rgba(2,4,12,0.15), rgba(1,2,6,0.7))' });
  ridge(L, { y: 262, h: 96, color: '#050a1a', seed: 6, amp: 26, trees: 16, treeH: 70, drift: -26, T, D });
  // far shore with a tiny set of old steps (the ripple starts here)
  box(L, { left: 690, top: 340, width: 110, height: 24 }, `<svg viewBox="0 0 110 24" width="100%" height="100%"><path d="M0 24 L0 16 L22 16 L22 11 L46 11 L46 6 L74 6 L74 2 L110 2 L110 24Z" fill="#2a3246"/><path d="M0 16 H22 M22 11 H46 M46 6 H74 M74 2 H110" stroke="#7d8ba8" stroke-width="1.3" opacity="0.6"/></svg>`);
  // rolling mist over the water: thin at first, thick once the lights come
  const m1 = box(L, { left: 0, top: 0, width: W, height: H, opacity: 0.5 }); mist(m1, { y: 330, h: 90, op: 0.2, n: 4, T, D, seed: 9 });
  const m2 = box(L, { left: 0, top: 0, width: W, height: H, opacity: 0 }); mist(m2, { y: 380, h: 140, op: 0.4, n: 5, T, D, seed: 19, speed: 1.4 });
  tl.to(m2, { opacity: 1, duration: 10 }, T + 12);
  // aleya lights (own version: idle drift in an inner wrapper, arc moves on the outer one)
  const N = 9, orbsL = [];
  for (let i = 0; i < N; i++) {
    const bx = 480 + R() * 680, by = 285 + R() * 150, r = 10 + R() * 5, o = box(L, { left: bx - r * 3, top: by - r * 3, width: r * 6, height: r * 6, opacity: 0 }), inn = box(o, { left: 0, top: 0, width: r * 6, height: r * 6 });
    box(inn, { left: -r * 0.5, top: r * 6 + 20 + i * 2, width: r * 7, height: r * 2.2, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(125,255,217,0.42), rgba(0,0,0,0) 70%)', mixBlendMode: 'screen' });
    box(inn, { left: 0, top: 0, width: r * 6, height: r * 6, borderRadius: '50%', background: `radial-gradient(circle, #fff 0%, ${PAL.aleya} 18%, rgba(60,255,200,0.25) 42%, rgba(0,0,0,0) 70%)`, mixBlendMode: 'screen' }, '', 'abs gr');
    const em = box(inn, { left: 0, top: 0, width: r * 6, height: r * 6, borderRadius: '50%', background: 'radial-gradient(circle, #ffe0a0 0%, #ff7a2a 20%, rgba(160,40,0,0.25) 45%, rgba(0,0,0,0) 70%)', mixBlendMode: 'screen', opacity: 0 });
    tl.to(o, { opacity: 0.95, duration: 1.8 }, T + 12.5 + i * 1.45);
    tl.to(inn, { x: (R() - 0.5) * 60, y: (R() - 0.5) * 24, duration: 3 + R() * 3, yoyo: true, repeat: Math.floor(D / 4), ease: 'sine.inOut' }, T);
    tl.to(o, { opacity: 0.55 + 0.1 * (i % 3), duration: 2.2, yoyo: true, repeat: 8, ease: 'sine.inOut' }, T + 15 + i * 1.45);
    orbsL.push({ o, inn, em, bx, by, r });
  }
  // one by one they turn: glide into a curved line pointing at Arun
  orbsL.sort((a, b) => b.bx - a.bx).forEach((q, i) => {
    const tx = 1030 - i * 85, ty = 418 - 62 * Math.sin(Math.PI * (i + 0.6) / (N + 1.2)) + i * 3, t0 = T + 27.2 + i * 0.6;
    tl.to(q.o, { x: tx - q.bx, y: ty - q.by, scale: 0.8 + i * 0.07, duration: 4.2, ease: 'sine.inOut' }, t0);
    tl.to(q.inn.querySelector('.gr'), { scale: 1.25, duration: 1.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t0 + 3.5);
    // 'I have kept your rice': they dim to embers
    tl.to(q.inn.querySelector('.gr'), { opacity: 0.12, duration: 5, ease: 'sine.in' }, T + 35.5 + i * 0.25);
    tl.to(q.em, { opacity: 0.7, duration: 5, ease: 'sine.in' }, T + 35.5 + i * 0.25);
    tl.to(q.o, { scale: 0.55 + i * 0.03, duration: 6, ease: 'sine.in' }, T + 35.5 + i * 0.25);
  });
  // pale ripple rings from the far steps
  for (let k = 0; k < 3; k++) { const rg = box(L, { left: 745 - 30, top: 366 - 8, width: 60, height: 16, borderRadius: '50%', border: '2px solid rgba(190,215,255,0.7)', opacity: 0 }); tl.fromTo(rg, { scale: 0.3, opacity: 0.5 }, { scale: 10, opacity: 0, duration: 6, ease: 'sine.out' }, T + 36.5 + k * 1.6); }
  // foreground: the broken ghat (stepped profile), cracks, moonlit edges
  let pts = '0,455 300,455', tops = '', cracks = '';
  for (let i = 0; i < 7; i++) {
    const x = 300 + i * 72, y = 455 + i * 24 + (R() - 0.5) * 5, miss = i === 3 || i === 5 ? 22 + R() * 14 : 0;
    pts += ` ${x},${y} ${x + 72 - miss},${y + (miss ? 5 : 0)}` + (miss ? ` ${x + 72 - miss + 6},${y + 24 - 2}` : '');
    tops += `<path d="M${x} ${y} L${x + 72 - miss} ${y}" stroke="#8b99b8" stroke-width="4" opacity="${0.85 - i * 0.07}"/>`;
    for (let k = 0; k < 2; k++) { const cx = x + 8 + R() * 50, cy = y + 6; cracks += `<path d="M${cx} ${cy} l${R() * 8 - 4} 7 l${R() * 10 - 5} 6 l${R() * 8 - 4} 8" stroke="#06080f" stroke-width="1.6" fill="none"/>`; }
  }
  pts += ' 800,720 0,720';
  box(L, { left: 0, top: 0, width: W, height: H }, `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><defs><linearGradient id="gh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#333c50"/><stop offset="0.55" stop-color="#10141f"/><stop offset="1" stop-color="#0b0e18"/></linearGradient></defs><polygon points="${pts}" fill="url(#gh)"/>${tops}${cracks}<path d="M0 455 H300" stroke="#8b99b8" stroke-width="2" opacity="0.35"/></svg>`);
  box(L, { left: -10, top: 400, width: 360, height: 70, background: 'linear-gradient(rgba(5,7,15,0), #05070f)', opacity: 0.0 });
  // Arun on the bank with his lamp; its glow also falls on the steps and the water
  const ax = 205, ay = 455, s = 0.65;
  const a = box(L, { left: ax - 40 * s, top: ay - 180 * s, width: 80 * s, height: 180 * s }, `<svg viewBox="0 0 80 180" width="100%" height="100%" style="overflow:visible"><rect x="30" y="92" width="11" height="84" rx="5" fill="#050608"/><rect x="41" y="92" width="11" height="84" rx="5" fill="#07090e"/><path d="M26 30 Q26 18 40 18 Q54 18 54 32 L56 96 L24 96Z" fill="#07090e"/><circle cx="40" cy="12" r="12" fill="#07090e"/><path d="M38 40 L60 70 L66 80" stroke="#07090e" stroke-width="9" stroke-linecap="round" fill="none"/></svg>`);
  tl.to(a, { rotation: 0.8, duration: 3, yoyo: true, repeat: Math.floor(D / 3), ease: 'sine.inOut', transformOrigin: '50% 100%' }, T);
  lamp(L, { x: ax + 30 * s, y: ay - 82 * s, s: 0.8, r: 190, T, D });
  const rf = box(L, { left: 330, top: 470, width: 70, height: 120, background: 'linear-gradient(rgba(255,179,71,0.35), rgba(255,179,71,0))', filter: 'blur(8px)', opacity: 0.8 });
  for (let t = T; t < T + D; t += 0.3) tl.set(rf, { opacity: 0.5 + R() * 0.4, scaleX: 0.8 + R() * 0.5 }, t);
  // leaning banyan: hanging aerial roots at right
  box(L, { left: 880, top: -20, width: 440, height: 70, background: '#03050c', borderRadius: '0 0 0 80%', transform: 'rotate(-3deg)' });
  for (let i = 0; i < 9; i++) {
    const x = 930 + i * 38 + R() * 20, h = 200 + R() * 220, e = box(L, { left: x, top: 20, width: 24, height: h, transformOrigin: '50% 0%' }, `<svg viewBox="0 0 24 ${h}" width="24" height="${h}"><path d="M12 0 Q${R() * 24} ${h * 0.4} ${6 + R() * 12} ${h}" stroke="#03050c" stroke-width="${3 + R() * 4}" fill="none" stroke-linecap="round"/></svg>`);
    tl.fromTo(e, { rotation: -2.5 }, { rotation: 3, duration: 3 + R() * 3, yoyo: true, repeat: Math.floor(D / 4), ease: 'sine.inOut' }, T + R());
  }
  mist(box(L, { left: 0, top: 0, width: W, height: H, opacity: 0.8 }), { y: 500, h: 100, op: 0.1, n: 3, T, D, seed: 29 });
  box(L, { left: 0, top: 600, width: W, height: 120, background: 'linear-gradient(rgba(3,4,10,0), #03040a 80%)' });
  drift(L, T, D, { s0: 1.0, s1: 1.04, x1: -14, origin: '50% 60%' });
  tl.fromTo(P, { scale: 1 }, { scale: 1.35, duration: D - 37, ease: 'sine.inOut', transformOrigin: '17% 62%' }, T + 37);
})();
