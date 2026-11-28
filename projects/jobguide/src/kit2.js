// ===== NIGHT TALES kit 2: articulated puppet + cinematic frame. Loaded after kit.js. =====
// puppet(c, o): front/three-quarter silhouette with head, two-segment arms, two-segment legs, coat tail, rim light.
//   o: {x,y (feet position), s, hat:'top'|'cap'|'none', coat, rim, flip, lamp:'right'|'left'|null, T, D}
//   returns {g, breathe, walk, head, arm, sit?, lampG, swing}
function puppet(c, o) {
  const s = o.s || 1, coat = o.coat || '#0b0e18', coat2 = o.coat2 || '#05070c', rim = o.rim || 'rgba(150,185,255,0.55)';
  const g = box(c, { left: o.x - 60 * s, top: o.y - 220 * s, width: 120 * s, height: 220 * s, opacity: o.opacity ?? 1 });
  g.style.filter = `drop-shadow(${o.flip ? -2 : 2}px 0 0 ${rim}) drop-shadow(0 0 6px rgba(0,0,0,0.6))`;
  if (o.flip) gsap.set(g, { scaleX: -1 });
  const id = 'pg' + Math.floor(rnd() * 1e6);
  const hat = o.hat === 'top' ? `<rect x="49" y="12" width="22" height="22" rx="2" fill="${coat2}"/><rect x="43" y="32" width="34" height="4" rx="2" fill="${coat2}"/>`
    : o.hat === 'cap' ? `<path d="M46 34 Q46 18 60 18 Q74 18 74 34 Z" fill="${coat2}"/><rect x="62" y="31" width="20" height="4" rx="2" fill="${coat2}"/>` : '';
  const arm = (id2, sx) => `<g id="${id}_${id2}"><path d="M${sx - 5} 70 Q${sx - 6} 88 ${sx - 4.5} 99 L${sx + 4.5} 99 Q${sx + 6} 88 ${sx + 5} 70Z" fill="${coat}"/><g id="${id}_${id2}f"><path d="M${sx - 4.5} 97 L${sx - 3.5} 124 L${sx + 3.5} 124 L${sx + 4.5} 97Z" fill="${coat}"/><circle cx="${sx}" cy="127" r="4.6" fill="${coat2}"/></g></g>`;
  const leg = (id2, hx) => `<g id="${id}_${id2}"><path d="M${hx - 8} 126 L${hx - 7} 168 L${hx + 7} 168 L${hx + 8} 126Z" fill="${coat2}"/><g id="${id}_${id2}s"><path d="M${hx - 7} 166 L${hx - 6} 210 L${hx + 6} 210 L${hx + 7} 166Z" fill="${coat2}"/><path d="M${hx - 7} 208 L${hx + 13} 208 Q${hx + 15} 216 ${hx + 8} 216 L${hx - 7} 216Z" fill="${coat2}"/></g></g>`;
  g.innerHTML = `<svg viewBox="0 0 120 220" width="100%" height="100%" style="overflow:visible"><defs><linearGradient id="${id}c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${coat}"/><stop offset="1" stop-color="${coat2}"/></linearGradient></defs>
    ${leg('lb', 52)}${leg('lf', 68)}
    <g id="${id}_t">${arm('ab', 36)}
      <path d="M38 64 Q60 55 82 64 L90 160 Q60 170 30 160Z" fill="url(#${id}c)"/><path d="M34 150 L26 192 Q60 200 94 192 L86 150Z" fill="${coat2}" id="${id}_tail"/>
      <g id="${id}_h"><rect x="55" y="48" width="10" height="12" fill="${coat2}"/><ellipse cx="60" cy="40" rx="12" ry="14" fill="${coat2}"/>${hat}</g>
      ${arm('af', 84)}</g></svg>`;
  const q = (k) => g.querySelector('#' + id + '_' + k);
  const P = { lb: q('lb'), lf: q('lf'), lbs: q('lbs'), lfs: q('lfs'), t: q('t'), ab: q('ab'), abf: q('abf'), af: q('af'), aff: q('aff'), h: q('h'), tail: q('tail') };
  gsap.set(P.ab, { svgOrigin: '36 70' }); gsap.set(P.af, { svgOrigin: '84 70' }); gsap.set(P.abf, { svgOrigin: '36 98' }); gsap.set(P.aff, { svgOrigin: '84 98' });
  gsap.set(P.h, { svgOrigin: '60 56' }); gsap.set(P.t, { svgOrigin: '60 128' }); gsap.set(P.lb, { svgOrigin: '52 126' }); gsap.set(P.lf, { svgOrigin: '68 126' });
  gsap.set(P.lbs, { svgOrigin: '52 167' }); gsap.set(P.lfs, { svgOrigin: '68 167' }); gsap.set(P.tail, { svgOrigin: '60 150' });
  gsap.set(P.ab, { rotation: 4 }); gsap.set(P.af, { rotation: -4 });
  const api = { g, P };
  // slow breathing + tiny weight shift for the whole of [T, T+D]
  api.breathe = (T, D, amt = 1) => {
    const n = Math.max(1, Math.floor(D / 3.4));
    tl.to(P.t, { scaleY: 1 + 0.014 * amt, duration: 1.7, yoyo: true, repeat: n * 2, ease: 'sine.inOut' }, T);
    tl.to(P.h, { y: -1.1 * amt, duration: 1.7, yoyo: true, repeat: n * 2, ease: 'sine.inOut' }, T + 0.15);
    tl.to([P.ab, P.af], { rotation: '+=1.8', duration: 1.7, yoyo: true, repeat: n * 2, ease: 'sine.inOut' }, T + 0.3);
    tl.to(P.tail, { rotation: 1.6, duration: 2.4, yoyo: true, repeat: Math.floor(D / 2.4), ease: 'sine.inOut' }, T);
    tl.to(g, { rotation: 0.5 * amt, duration: 4.5, yoyo: true, repeat: Math.max(1, Math.floor(D / 4.5)), ease: 'sine.inOut', transformOrigin: '50% 100%' }, T);
  };
  // head: rotate (deg, +ve = tilt right) and nod (y offset)
  api.head = (deg, T, d = 1.2, ease = 'sine.inOut') => tl.to(P.h, { rotation: deg, duration: d, ease }, T);
  // arm('f'|'b', shoulderDeg, elbowDeg, T, d): shoulder rotates the whole arm, elbow bends the forearm
  api.arm = (side, sh, el, T, d = 1.0, ease = 'sine.inOut') => {
    const a = side === 'f' ? P.af : P.ab, f = side === 'f' ? P.aff : P.abf;
    tl.to(a, { rotation: sh, duration: d, ease }, T); tl.to(f, { rotation: el, duration: d, ease }, T);
  };
  // walk in place or across: stride period p, travelling dx pixels over D
  api.walk = (T, D, dx = 0, p = 0.62, lean = 2) => {
    const n = Math.max(1, Math.floor(D / p));
    tl.fromTo(P.lf, { rotation: 24 }, { rotation: -24, duration: p, repeat: n, yoyo: true, ease: 'sine.inOut' }, T);
    tl.fromTo(P.lb, { rotation: -24 }, { rotation: 24, duration: p, repeat: n, yoyo: true, ease: 'sine.inOut' }, T);
    tl.fromTo(P.lfs, { rotation: 4 }, { rotation: 32, duration: p, repeat: n, yoyo: true, ease: 'sine.in' }, T);
    tl.fromTo(P.lbs, { rotation: 32 }, { rotation: 4, duration: p, repeat: n, yoyo: true, ease: 'sine.out' }, T);
    tl.fromTo(P.af, { rotation: -16 }, { rotation: 16, duration: p, repeat: n, yoyo: true, ease: 'sine.inOut' }, T);
    tl.fromTo(P.ab, { rotation: 16 }, { rotation: -16, duration: p, repeat: n, yoyo: true, ease: 'sine.inOut' }, T);
    tl.fromTo(P.t, { rotation: -lean, y: 0 }, { rotation: lean, y: -2.6, duration: p / 2, repeat: n * 2 + 1, yoyo: true, ease: 'sine.inOut' }, T);
    tl.fromTo(P.h, { rotation: -1.2 }, { rotation: 1.2, duration: p, repeat: n, yoyo: true, ease: 'sine.inOut' }, T);
    tl.fromTo(P.tail, { rotation: -5 }, { rotation: 7, duration: p, repeat: n, yoyo: true, ease: 'sine.inOut' }, T);
    if (dx) tl.fromTo(g, { x: 0 }, { x: dx, duration: D, ease: 'none' }, T);
  };
  // hold a lamp in the front hand (glow follows the forearm). Returns swing(T,D)
  if (o.lamp) {
    const hx = 84, lg = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    lg.innerHTML = `<line x1="${hx}" y1="127" x2="${hx}" y2="137" stroke="#222" stroke-width="1.4"/><rect x="${hx - 5}" y="137" width="10" height="14" rx="2" fill="#18110a" stroke="#caa766" stroke-width="1"/><rect x="${hx - 3}" y="140" width="6" height="8" fill="#ffd27a"/>`;
    P.aff.appendChild(lg); api.lampG = lg; gsap.set(lg, { svgOrigin: `${hx} 127` });
    tl.to(lg, { rotation: 9, duration: 1.4, yoyo: true, repeat: Math.max(1, Math.floor((o.D || 40) / 1.4)), ease: 'sine.inOut' }, o.T || 0);
    api.glow = glow(g, { x: 60 * s + 0, y: 148 * s, r: 120 * s, color: 'rgba(255,190,100,0.55)', op: 0.9, T: o.T || 0, D: o.D || 40 });
    api.glow.style.left = (hx * s - 120 * s) + 'px'; api.glow.style.mixBlendMode = 'screen';
  }
  return api;
}

// breath fog puffs from a point in `c` (world coordinates)
function breathFog(c, x, y, T, D, every = 2.7, dx = 40) {
  const R = rr(Math.floor(x + y));
  for (let t = T; t < T + D; t += every) {
    const b = box(c, { left: x - 9, top: y - 9, width: 18, height: 18, borderRadius: '50%', background: 'rgba(215,225,240,0.5)', filter: 'blur(5px)', opacity: 0 });
    tl.fromTo(b, { x: 0, y: 0, scale: 0.4, opacity: 0.5 }, { x: dx + R() * 20, y: -16 - R() * 14, scale: 2.4, opacity: 0, duration: 3.0, ease: 'sine.out' }, t);
  }
}

// god-rays: soft light cone from (x,y) widening downwards/outwards. o: {x,y,len,spread,rot,color,op,T,D}
function lightCone(c, o) {
  const len = o.len || 420, sp = o.spread || 150;
  const e = box(c, { left: o.x - sp, top: o.y, width: sp * 2, height: len, transformOrigin: '50% 0%', mixBlendMode: 'screen', opacity: 0, pointerEvents: 'none',
    background: `linear-gradient(${o.color || 'rgba(255,200,130,0.5)'}, rgba(255,200,130,0))`, clipPath: `polygon(46% 0, 54% 0, 100% 100%, 0 100%)`, filter: 'blur(6px)' });
  e.style.transform = `rotate(${o.rot || 0}deg)`;
  tl.to(e, { opacity: o.op ?? 0.55, duration: 2 }, o.T);
  tl.to(e, { opacity: (o.op ?? 0.55) * 0.7, duration: 1.3, yoyo: true, repeat: Math.max(1, Math.floor(o.D / 1.3)), ease: 'sine.inOut' }, o.T + 2);
  return e;
}

// floating dust / ash / ember motes. o: {x0,x1,y0,y1,n,color,T,D,size,rise}
function motes(c, o) {
  const R = rr(o.seed || 77);
  for (let i = 0; i < (o.n || 28); i++) {
    const sz = (o.size || 2.2) * (0.5 + R()), e = box(c, { left: o.x0 + R() * (o.x1 - o.x0), top: o.y0 + R() * (o.y1 - o.y0), width: sz, height: sz, borderRadius: '50%', background: o.color || 'rgba(255,235,200,0.9)', opacity: 0, boxShadow: `0 0 ${sz * 3}px ${o.color || 'rgba(255,220,170,0.8)'}` });
    const d = 5 + R() * 6;
    tl.fromTo(e, { opacity: 0, x: 0, y: 0 }, { opacity: 0.2 + R() * 0.6, x: (R() - 0.5) * 60, y: (o.rise ?? -40) * (0.4 + R()), duration: d, yoyo: true, repeat: Math.max(1, Math.floor(o.D / d / 1)), ease: 'sine.inOut' }, o.T + R() * 4);
  }
}
