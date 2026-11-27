// ===== ROAD: Arun walks the embankment on a moonless night (scene 'road') =====
(function () {
  const w = win('road'), c = S('road'), T = w.T, D = w.D, L = box(c, { left: 0, top: 0, width: W, height: H });
  const LX = 214, LY = 466;                                  // lamp position at start (inside walker wrapper)
  const grp = (p, z) => box(p, { left: 0, top: 0, width: W, height: H, zIndex: z });
  // thin curved reeds. o: {x0,x1,y,n,h,color,sw,seed,cat}
  function reeds(p, o) {
    const R = rr(o.seed || 4);
    for (let i = 0; i < o.n; i++) {
      const x = o.x0 + R() * (o.x1 - o.x0), h = o.h * (0.55 + R() * 0.6), b = (R() - 0.5) * h * 0.5, sw = o.sw * (0.7 + R() * 0.6);
      const head = o.cat && R() < 0.35 ? `<path d="M${20 + b * 1.6} ${h * 0.12} L${20 + b * 1.75} ${h * 0.02}" stroke="${o.color}" stroke-width="${sw * 3.2}" stroke-linecap="round"/>` : '';
      const e = box(p, { left: x - 20, top: o.y - h, width: 40, height: h, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 40 ${h}" width="40" height="${h}" style="overflow:visible"><path d="M20 ${h} Q${20 + b * 0.2} ${h * 0.5} ${20 + b * 1.6} ${h * 0.1}" stroke="${o.color}" stroke-width="${sw}" fill="none" stroke-linecap="round"/>${head}</svg>`);
      tl.fromTo(e, { rotation: -1.5 - R() * 2 }, { rotation: 1.5 + R() * 3, duration: 2.2 + R() * 2.5, yoyo: true, repeat: Math.max(1, Math.floor(D / 3.5)), ease: 'sine.inOut' }, T + R() * 2);
    }
  }
  const cam = box(L, { left: 0, top: 0, width: W, height: H, transformOrigin: '854px 466px' });

  // ---- sky: no moon, few stars, dying orange horizon
  sky(cam, { top: '#03040e', mid: '#0a1030', bot: '#1a2350', stars: 14, T, D, seed: 12 });
  const dusk = box(cam, { left: 0, top: 250, width: W, height: 170, background: 'linear-gradient(rgba(255,120,50,0), rgba(255,120,50,0.5) 75%, rgba(255,150,70,0))', filter: 'blur(14px)', opacity: 0.8 });
  tl.to(dusk, { opacity: 0, duration: 10, ease: 'sine.inOut' }, T);
  // ---- heavy low clouds (bruise purple / slate), thickening so stars vanish
  const clouds = grp(cam, 2); const CR = rr(66);
  for (let i = 0; i < 9; i++) {
    const wd = 700 + CR() * 600, ht = 150 + CR() * 120, purple = i % 3 === 0;
    const e = box(clouds, { left: -300 + i * 160 + CR() * 100, top: -40 + CR() * 260, width: wd, height: ht, borderRadius: '50%', filter: 'blur(34px)', background: `radial-gradient(ellipse, ${purple ? 'rgba(66,40,78,0.95)' : 'rgba(40,46,66,0.95)'} 0%, rgba(14,14,30,0.6) 55%, rgba(0,0,0,0) 72%)` });
    tl.to(e, { x: (CR() < 0.5 ? -1 : 1) * (120 + CR() * 160), duration: D, ease: 'none' }, T);
  }
  tl.fromTo(clouds, { opacity: 0.35 }, { opacity: 1, duration: 14, ease: 'sine.inOut' }, T);
  // ---- far shore: wedding lights (behind him, left) and treeline
  const wed = grp(cam, 3), WR = rr(88);
  box(wed, { left: 20, top: 330, width: 420, height: 120, background: 'radial-gradient(ellipse, rgba(255,150,60,0.55) 0%, rgba(255,120,40,0.18) 45%, rgba(0,0,0,0) 72%)', filter: 'blur(8px)', mixBlendMode: 'screen' });
  ridge(cam, { y: 300, h: 98, color: '#070a15', seed: 17, amp: 14, jag: 8, trees: 34, treeH: 70, drift: -30, T, D });
  for (let i = 0; i < 16; i++) {
    const x = 70 + WR() * 290, y = 386 + WR() * 8, sz = 2 + WR() * 2.2;
    const dot = box(wed, { left: x, top: y, width: sz, height: sz, borderRadius: '50%', background: i % 3 ? '#ffc56a' : '#ff8a3d', boxShadow: '0 0 6px 2px rgba(255,170,80,0.7)' });
    const rf = box(wed, { left: x - 0.5, top: 400, width: sz * 0.8, height: 18 + WR() * 40, background: 'linear-gradient(rgba(255,170,80,0.55), rgba(255,170,80,0))', filter: 'blur(1.5px)' });
    for (let t = 0; t < D; t += 0.5 + WR() * 0.9) tl.set(dot, { opacity: 0.55 + WR() * 0.45 }, T + t);
    tl.to(rf, { scaleX: 2.2, opacity: 0.4, duration: 1.2 + WR(), yoyo: true, repeat: Math.max(1, Math.floor(D / 2)), ease: 'sine.inOut' }, T);
  }
  tl.to(wed, { opacity: 0.4, duration: D, ease: 'none' }, T);
  // ---- water (ripples fade late: calm veil rises) + low mist
  water(cam, { y: 398, h: 322, T, D, seed: 51 });
  const calm = box(cam, { left: 0, top: 398, width: W, height: 322, background: 'linear-gradient(#050a1e, #02040c)', opacity: 0 });
  tl.to(calm, { opacity: 0.88, duration: 12, ease: 'sine.inOut' }, T + 30);
  const wed2 = grp(cam, 4); // reflections stay above the veil
  box(wed2, { left: 60, top: 400, width: 330, height: 50, background: 'radial-gradient(ellipse, rgba(255,150,60,0.3), rgba(0,0,0,0) 70%)', filter: 'blur(8px)', opacity: 0.6 });
  mist(cam, { y: 405, h: 110, op: 0.26, n: 5, T, D, seed: 9, speed: 0.7 });
  // ---- embankment path (raised strip) with a faint rim
  let pts = ''; const PR = rr(33);
  for (let i = 0; i <= 40; i++) pts += `${(i / 40) * (W + 40) - 20},${(5 + PR() * 3).toFixed(1)} `;
  box(cam, { left: 0, top: 500, width: W, height: 60 }, `<svg viewBox="0 0 ${W} 60" width="${W}" height="60" style="overflow:visible"><polygon points="-20,60 ${pts} ${W + 20},60" fill="#04060c"/><polyline points="${pts}" fill="none" stroke="#202a52" stroke-width="1.5" opacity="0.5"/></svg>`);
  box(cam, { left: 0, top: 548, width: W, height: 30, background: 'linear-gradient(rgba(2,4,10,0.9), rgba(2,4,10,0))' });
  // mid reeds along the far and near bank
  reeds(cam, { x0: -20, x1: W, y: 508, n: 55, h: 52, color: '#03050b', sw: 1.6, seed: 5, cat: true });
  // ---- Arun: walker wrapper (man + lamp + light pool), moves left to right
  const wk = box(cam, { left: 0, top: 0, width: W, height: H, zIndex: 5 });
  box(wk, { left: LX - 200, top: 507 - 18, width: 400, height: 36, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,180,80,0.5), rgba(255,150,50,0.12) 55%, rgba(0,0,0,0) 72%)', mixBlendMode: 'screen' });
  const refl = box(wk, { left: LX - 14, top: 552, width: 28, height: 90, background: 'linear-gradient(rgba(255,190,90,0.55), rgba(255,170,60,0))', filter: 'blur(5px)' });
  tl.to(refl, { scaleX: 1.9, opacity: 0.55, duration: 1.4, yoyo: true, repeat: Math.max(1, Math.floor(D / 1.4)), ease: 'sine.inOut' }, T);
  const halo = box(wk, { left: LX - 260, top: LY - 260, width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,180,80,0.34) 0%, rgba(255,140,50,0.1) 40%, rgba(0,0,0,0) 70%)', mixBlendMode: 'screen' });
  tl.to(halo, { scale: 0.5, duration: 14, ease: 'sine.inOut' }, T + 30);
  // own walker (kit man() legs pivot wrongly in SVG): body, swinging legs via svgOrigin, bob, kit lamp in hand
  function walker(p, o) {
    const s = o.s, g = box(p, { left: o.x - 40 * s, top: o.y - 180 * s, width: 80 * s, height: 180 * s });
    g.innerHTML = '<svg viewBox="0 0 80 180" width="100%" height="100%" style="overflow:visible"><rect class="lb" x="34" y="92" width="11" height="80" rx="5" fill="#050608"/><path d="M26 30 Q26 18 40 18 Q54 18 54 32 L56 96 L24 96Z" fill="#07090e"/><circle cx="40" cy="12" r="12" fill="#07090e"/><path d="M38 40 L56 66 L62 96" stroke="#07090e" stroke-width="9" stroke-linecap="round" fill="none"/><rect class="lf" x="34" y="92" width="11" height="80" rx="5" fill="#090b11"/></svg>';
    const lb = g.querySelector('.lb'), lf = g.querySelector('.lf'), n = Math.floor(o.D / 0.8);
    tl.fromTo(lf, { rotation: 18, svgOrigin: '39.5 92' }, { rotation: -18, svgOrigin: '39.5 92', duration: 0.8, repeat: n, yoyo: true, ease: 'sine.inOut' }, o.T);
    tl.fromTo(lb, { rotation: -18, svgOrigin: '39.5 92' }, { rotation: 18, svgOrigin: '39.5 92', duration: 0.8, repeat: n, yoyo: true, ease: 'sine.inOut' }, o.T);
    tl.fromTo(g, { y: 0 }, { y: -3 * s, duration: 0.4, repeat: n * 2 + 1, yoyo: true, ease: 'sine.inOut' }, o.T);
    lamp(p, { x: o.x + 22 * s, y: o.y - 84 * s + 10 * s, s: s * 0.9, T: o.T, D: o.D });
  }
  walker(wk, { x: 200, y: 509, s: 0.65, T, D });
  tl.to(wk, { x: 60, duration: 10, ease: 'sine.inOut' }, T);
  tl.to(wk, { x: 560, duration: 20, ease: 'none' }, T + 10);
  tl.to(wk, { x: 640, duration: 14, ease: 'sine.out' }, T + 30);
  // ---- thickening mist (fog rolls in at the end)
  const fog = grp(cam, 6);
  mist(fog, { y: 430, h: 220, op: 0.26, n: 7, T, D, seed: 29, speed: 0.6, color: 'rgba(95,110,140,0.5)' });
  mist(fog, { y: 520, h: 160, op: 0.2, n: 4, T, D, seed: 31, speed: 0.5, color: 'rgba(80,95,125,0.5)' });
  tl.fromTo(fog, { opacity: 0.1 }, { opacity: 1, duration: 14, ease: 'sine.inOut' }, T + 28);
  // ---- foreground reeds, framing the corners (low and dark, below the lamp action)
  const fgr = grp(cam, 7);
  reeds(fgr, { x0: -30, x1: 190, y: 735, n: 20, h: 270, color: '#010204', sw: 2.6, seed: 7, cat: true });
  reeds(fgr, { x0: 1090, x1: 1320, y: 735, n: 20, h: 250, color: '#010204', sw: 2.6, seed: 8, cat: true });
  // ---- the dark closes in around the lamp
  const vig = box(wk, { left: LX - 1300, top: LY - 1300, width: 2600, height: 2600, zIndex: 20, opacity: 0, background: 'radial-gradient(circle, rgba(1,2,6,0) 5%, rgba(1,2,6,0.55) 14%, rgba(1,2,6,0.93) 30%, #010206 50%)' });
  tl.to(vig, { opacity: 1, duration: 14, ease: 'sine.inOut' }, T + 30);
  tl.to(vig, { scale: 0.75, duration: 14, ease: 'sine.inOut' }, T + 30);
  // ---- slow camera: gentle drift, then a push toward the lamp
  tl.fromTo(cam, { scale: 1.0, x: 0 }, { scale: 1.05, x: -12, duration: 30, ease: 'none' }, T);
  tl.to(cam, { scale: 1.3, x: -30, duration: 14.5, ease: 'sine.inOut' }, T + 30);
})();
