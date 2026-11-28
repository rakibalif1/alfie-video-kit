// ===== bg_sky.js : rich illustrated UK sky (y 0..420, base gradient reaches y 470 so no gap behind the buildings). =====
// ukSky(w, {T, D, mood:'day'|'dusk'|'grey'}) -> {wrap, clip, sun, flocks, planes}
// Needs kit.js globals: box, rr, W, H, tl and a global gsap. No Math.random. No emoji. No external assets.
(function () {
  const UK_BRANDS = {
    airlines: ['British Airways', 'easyJet', 'Ryanair', 'Virgin Atlantic', 'Jet2', 'TUI'],
    generic: 'AIRLINE'
  };
  const brandName = (i) => (window.NO_BRANDS ? UK_BRANDS.generic : UK_BRANDS.airlines[i % UK_BRANDS.airlines.length]);
  const BANNERS = ['SORRY!', 'IS IT TEA TIME YET?', 'MIND THE GAP', "IT'S NOT RAINING (YET)"];
  const rep = (h, D, off) => Math.max(1, Math.ceil((D - (off || 0)) / h) - 1);

  const PAL = {
    day: { g: [['#3a86d6', 0], ['#6db6ee', 45], ['#bfe3fa', 80], ['#e6f5ff', 100]], cloud: { wh: '#ffffff', sh: '#b4c8e0', hl: '#ffffff' }, dens: 1 },
    dusk: { g: [['#3b3f94', 0], ['#8a63a8', 30], ['#e37fa0', 58], ['#ffb070', 82], ['#ffd89a', 100]], cloud: { wh: '#ffd2c2', sh: '#a0689c', hl: '#fff0d8' }, dens: 1 },
    grey: { g: [['#7f8c98', 0], ['#a3afba', 50], ['#c9d1d8', 100]], cloud: { wh: '#e6eaee', sh: '#8f9ba7', hl: '#f6f8fa' }, dens: 1.5 }
  };

  // ---------- bird art (all facing right; flipped by scaleX -1 when needed) ----------
  function gullHTML() {
    const wing = (far) => {
      const c1 = far ? '#7e8d9b' : '#a0b1c0', c2 = far ? '#75848f' : '#94a6b6';
      return `<g class="A"><path d="M50 38 L76 38 C74 20 70 4 66 -12 L48 -12 C48 6 49 22 50 38Z" fill="${c1}"/><path d="M50 38 L58 38 C55 20 53 4 51 -12 L48 -12 C48 6 49 22 50 38Z" fill="#eef2f5"/><g class="H"><path d="M48 -12 L66 -12 C65 -36 58 -58 44 -74 C45 -52 46 -30 48 -12Z" fill="${c2}"/><path d="M44 -74 C54 -62 61 -50 63.5 -38 L47 -40 C46 -52 45 -62 44 -74Z" fill="#15181d"/><circle cx="52.5" cy="-54" r="1.8" fill="#fff"/><circle cx="53" cy="-46" r="1.4" fill="#fff"/></g></g>`;
    };
    return wing(true) +
      `<path d="M20 40 L-6 36 Q-8 42 -6 47 L20 48Z" fill="#f2f5f7"/>` +
      `<path d="M16 42 C26 34 50 31 70 33 C86 34 96 38 98 44 C94 52 78 56 58 55 C38 54 24 50 16 42Z" fill="#fdfdfd" stroke="#d3dae0" stroke-width=".7"/>` +
      `<path d="M30 47 C46 54 74 55 94 47 C88 54 74 57 58 56 C44 55 34 52 30 47Z" fill="#dfe6ec"/>` +
      `<path d="M62 55 L52 63 M66 55 L56 64" stroke="#e98ea0" stroke-width="1.7" stroke-linecap="round"/>` +
      `<path d="M92 36 C95 30 105 30 108 37 C108 43 102 47 95 47 C90 46 89 40 92 36Z" fill="#fefefe" stroke="#d3dae0" stroke-width=".6"/>` +
      `<path d="M106.5 37 L120 38.5 Q121.5 41 118 42.3 L106.5 42.3Z" fill="#f2c230"/><path d="M117 41.4 L121 43.4 L118 43.8Z" fill="#e9b11c"/><circle cx="116" cy="42" r="1.4" fill="#d6322b"/>` +
      `<circle cx="100" cy="36" r="2.3" fill="#f3e48c"/><circle cx="100.4" cy="36" r="1.1" fill="#111"/>` +
      wing(false);
  }
  function pigeonHTML() {
    const wing = (far) => {
      const c1 = far ? '#8997ac' : '#9dacc1', c2 = far ? '#74839a' : '#8190a8';
      return `<g class="A"><path d="M44 38 L68 38 C66 22 62 8 58 -2 L42 -2 C42 12 43 26 44 38Z" fill="${c1}"/><path d="M43.4 14 L65.4 14 L64.4 19 L43.2 19Z" fill="#23272e"/><path d="M43 26 L66.6 26 L66 30.5 L43.4 30.5Z" fill="#23272e"/><g class="H"><path d="M42 -2 L58 -2 C57 -18 50 -34 38 -46 C38 -30 40 -14 42 -2Z" fill="${c2}"/><path d="M38 -46 C47 -36 54 -26 56 -18 L40 -18 C39 -28 38.5 -38 38 -46Z" fill="#3a4150"/></g></g>`;
    };
    return wing(true) +
      `<path d="M16 40 L-6 36 L-6 47 L16 48Z" fill="#5d6a7d"/><path d="M-6 36 L-1 36.5 L-1 46.5 L-6 47Z" fill="#1d2026"/>` +
      `<path d="M12 40 C20 30 44 28 62 32 C78 34 88 38 88 45 C84 56 66 60 46 58 C28 56 16 48 12 40Z" fill="#8c9aad"/>` +
      `<ellipse cx="68" cy="49" rx="17" ry="7.5" fill="#a9b6c6"/><ellipse cx="18" cy="40" rx="6" ry="3.4" fill="#e6eaee"/>` +
      `<path d="M44 58 L37 66 M50 58 L43 67" stroke="#d98a98" stroke-width="1.8" stroke-linecap="round"/>` +
      `<circle cx="91" cy="37" r="8.5" fill="#5b677c"/><ellipse cx="82" cy="42" rx="8" ry="7" fill="url(#skyNeck)"/>` +
      `<path d="M98.5 36 L106 37.5 L98.5 40Z" fill="#2c2c30"/><circle cx="99" cy="36.4" r="1.6" fill="#eceff1"/>` +
      `<circle cx="94" cy="35.4" r="2.1" fill="#f39a2a"/><circle cx="94.3" cy="35.4" r=".9" fill="#000"/>` +
      wing(false);
  }
  function swiftHTML() {
    const wing = (c) => `<g class="A"><path d="M31 11 C36 -3 32 -16 8 -28 C20 -12 18 -2 22 11Z" fill="${c}"/></g>`;
    return wing('#2b2832') + `<path d="M6 12 L-8 5 L-2 13 L-8 21 L8 14Z" fill="#17151b"/><path d="M-2 14 L8 11 C22 7 42 8 54 11.5 C46 16 24 16 10 15Z" fill="#17151b"/><circle cx="52" cy="11.5" r="3.6" fill="#1b1a20"/>` + wing('#17151b');
  }
  function speckHTML() { return `<g class="A"><path d="M0 4 Q3.5 -1 7 4 Q10.5 -1 14 4" stroke="#3a4856" stroke-width="1.3" fill="none" stroke-linecap="round"/></g>`; }
  const KINDS = {
    gull: { html: gullHTML, vb: '-12 -80 144 154', w: 144, h: 154, ox: 67, oy: 122, sh: '62 38', wr: '57 -12' },
    pigeon: { html: pigeonHTML, vb: '-10 -48 120 110', w: 120, h: 110, ox: 60, oy: 90, sh: '56 38', wr: '50 -2' },
    swift: { html: swiftHTML, vb: '-10 -30 70 56', w: 70, h: 56, ox: 38, oy: 42, sh: '30 11', wr: '27 -6' },
    speck: { html: speckHTML, vb: '0 -4 14 12', w: 14, h: 12, ox: 7, oy: 8, sh: '7 4', wr: '7 4' }
  };

  function makeBird(parent, kind, s) {
    const K = KINDS[kind];
    const pos = box(parent, { left: 0, top: 0, width: 1, height: 1 });
    const fl = box(pos, { left: -K.ox * s, top: -K.oy * s, width: K.w * s, height: K.h * s });
    fl.innerHTML = `<svg viewBox="${K.vb}" width="${K.w * s}" height="${K.h * s}" style="overflow:visible;display:block">${K.html()}</svg>`;
    gsap.set(fl, { transformOrigin: `${K.ox * s}px ${K.oy * s}px` });
    const A = Array.from(fl.querySelectorAll('.A')), H = Array.from(fl.querySelectorAll('.H'));
    A.forEach((a) => gsap.set(a, { svgOrigin: K.sh }));
    H.forEach((x) => gsap.set(x, { svgOrigin: K.wr }));
    return { pos, fl, A, H, s };
  }
  // flapping: arm scaleY up->down (yoyo), hand lags by a quarter beat, body bobs against the wings
  function flap(b, t0, D, o) {
    const h = o.h, r = rep(h, D, 0), st = t0 + (o.ph || 0), up = o.up ?? 1, dn = o.dn ?? -0.75;
    b.A.forEach((a, i) => tl.fromTo(a, { scaleY: up }, { scaleY: dn * (b.A.length > 1 && i === 0 ? 0.9 : 1), duration: h, repeat: r, yoyo: true, ease: 'sine.inOut' }, st + i * 0.02));
    b.H.forEach((x, i) => tl.fromTo(x, { rotation: o.r0 ?? -14 }, { rotation: o.r1 ?? 14, duration: h, repeat: r, yoyo: true, ease: 'sine.inOut' }, st + h * 0.22 + i * 0.02));
    tl.fromTo(b.fl, { y: (o.bob ?? 3) * b.s * 1.6 }, { y: -(o.bob ?? 3) * b.s * 1.6, duration: h, repeat: r, yoyo: true, ease: 'sine.inOut' }, st);
  }
  // gliding: wings held in a shallow V, tiny flex, slow banking
  function glide(b, t0, D, o) {
    const g = o.g ?? 0.5;
    b.A.forEach((a, i) => { gsap.set(a, { scaleY: g }); tl.fromTo(a, { scaleY: g }, { scaleY: g - 0.13, duration: 1.7 + i * 0.2, repeat: rep(1.7, D), yoyo: true, ease: 'sine.inOut' }, t0 + (o.ph || 0)); });
    b.H.forEach((x) => { gsap.set(x, { rotation: -18 }); tl.fromTo(x, { rotation: -18 }, { rotation: -6, duration: 2.3, repeat: rep(2.3, D), yoyo: true, ease: 'sine.inOut' }, t0 + (o.ph || 0)); });
    tl.fromTo(b.fl, { rotation: -6 }, { rotation: 7, duration: 3.1 + (o.ph || 0) * 0.3, repeat: rep(3.1, D), yoyo: true, ease: 'sine.inOut' }, t0);
  }
  // back-and-forth soaring path with the facing flipped at every turn (el = the element to mirror)
  function soar(pos, flipEl, t0, D, o) {
    const h = o.h;
    tl.fromTo(pos, { x: o.x0 }, { x: o.x1, duration: h, ease: 'sine.inOut', repeat: rep(h, D), yoyo: true }, t0);
    tl.fromTo(pos, { y: o.y0 - o.ya }, { y: o.y0 + o.ya, duration: h * 0.5, ease: 'sine.inOut', repeat: rep(h * 0.5, D), yoyo: true }, t0 + (o.yph || 0));
    const dir0 = o.x1 >= o.x0 ? 1 : -1;
    if (dir0 < 0) gsap.set(flipEl, { scaleX: -1 });
    for (let k = 1; k * h < D; k++) tl.set(flipEl, { scaleX: (k % 2 ? -1 : 1) * dir0 }, t0 + k * h);
  }
  function tinyRock(el, t0, D, a, h) { tl.fromTo(el, { rotation: -a }, { rotation: a, duration: h, repeat: rep(h, D), yoyo: true, ease: 'sine.inOut' }, t0); }

  // ---------- clouds ----------
  function cloudSVG(R, w, h, c) {
    const n = 5 + Math.floor(R() * 4), P = [];
    for (let i = 0; i < n; i++) { const f = (i + 0.5) / n, r = h * (0.2 + 0.32 * Math.sin(Math.PI * f) * (0.7 + 0.5 * R())); P.push({ x: w * (0.1 + 0.8 * f) + (R() - 0.5) * w * 0.04, r, y: h - r - R() * 0.06 * h }); }
    let s = `<rect x="${w * 0.07}" y="${h * 0.7}" width="${w * 0.86}" height="${h * 0.3}" rx="${h * 0.14}" fill="${c.sh}"/>`;
    P.forEach((p) => { s += `<circle cx="${p.x.toFixed(1)}" cy="${(p.y + 3).toFixed(1)}" r="${p.r.toFixed(1)}" fill="${c.sh}"/>`; });
    s += `<rect x="${w * 0.08}" y="${h * 0.66}" width="${w * 0.84}" height="${h * 0.28}" rx="${h * 0.13}" fill="${c.wh}"/>`;
    P.forEach((p) => { s += `<circle cx="${p.x.toFixed(1)}" cy="${(p.y - 2).toFixed(1)}" r="${(p.r * 0.94).toFixed(1)}" fill="${c.wh}"/>`; });
    P.forEach((p) => { if (p.r > h * 0.26) s += `<circle cx="${(p.x - p.r * 0.22).toFixed(1)}" cy="${(p.y - p.r * 0.34).toFixed(1)}" r="${(p.r * 0.55).toFixed(1)}" fill="${c.hl}" opacity=".85"/>`; });
    return `<svg viewBox="0 0 ${w.toFixed(0)} ${h.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" style="display:block;overflow:visible">${s}</svg>`;
  }
  function cloudLayer(clip, R, o) {
    const Wd = W + o.speed * o.D + 240, strip = box(clip, { left: -80, top: 0, width: Wd, height: 470, opacity: o.op });
    for (let x = R() * 120; x < Wd - 160;) {
      const h = o.hMin + R() * (o.hMax - o.hMin), w = h * (2.1 + R() * 1.5), y = o.y0 + R() * (o.y1 - o.y0);
      box(strip, { left: x, top: y, width: w, height: h }, cloudSVG(R, w, h, o.pal));
      x += w + o.gap * (0.5 + R());
    }
    tl.fromTo(strip, { x: 0 }, { x: -o.speed * o.D, duration: o.D, ease: 'none' }, o.T);
    return strip;
  }
  function cirrus(clip, R, o) {
    const Wd = W + o.speed * o.D + 400, strip = box(clip, { left: -100, top: 0, width: Wd, height: 300, opacity: o.op });
    for (let i = 0; i < 9; i++) {
      const w = 320 + R() * 380, h = 12 + R() * 16, x = R() * (Wd - w), y = 14 + R() * 230;
      const e = box(strip, { left: x, top: y, width: w, height: h, borderRadius: '50%', background: `radial-gradient(ellipse, ${o.col} 0%, rgba(255,255,255,0) 70%)` });
      gsap.set(e, { rotation: -3 + R() * 6, skewX: -20 });
    }
    tl.fromTo(strip, { x: 0 }, { x: -o.speed * o.D, duration: o.D, ease: 'none' }, o.T);
  }

  // ---------- sun ----------
  function sun(clip, mood, T, D) {
    if (mood === 'grey') {
      const g = box(clip, { left: 760, top: -80, width: 560, height: 360, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0) 70%)' });
      tl.fromTo(g, { opacity: 0.6 }, { opacity: 1, duration: 5, repeat: rep(5, D), yoyo: true, ease: 'sine.inOut' }, T);
      return g;
    }
    const dusk = mood === 'dusk', sx = dusk ? 330 : 1010, sy = dusk ? 316 : 112, r = dusk ? 56 : 42;
    const glowCol = dusk ? '255,170,90' : '255,244,200';
    const halo = box(clip, { left: sx - 340, top: sy - 340, width: 680, height: 680, borderRadius: '50%', background: `radial-gradient(circle, rgba(${glowCol},0.7) 0%, rgba(${glowCol},0.28) 22%, rgba(${glowCol},0) 62%)` });
    tl.fromTo(halo, { scale: 0.96 }, { scale: 1.07, duration: 3.2, repeat: rep(3.2, D), yoyo: true, ease: 'sine.inOut' }, T);
    const rays = box(clip, { left: sx - 400, top: sy - 400, width: 800, height: 800, borderRadius: '50%', background: `repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,235,0.22) 0deg 3deg, rgba(255,255,235,0) 3deg 11deg)`, webkitMaskImage: 'radial-gradient(circle, #000 4%, rgba(0,0,0,0.5) 30%, transparent 62%)', maskImage: 'radial-gradient(circle, #000 4%, rgba(0,0,0,0.5) 30%, transparent 62%)', opacity: dusk ? 0.8 : 1 });
    tl.fromTo(rays, { rotation: 0 }, { rotation: 66, duration: Math.max(D, 30), ease: 'none' }, T);
    box(clip, { left: sx - r, top: sy - r, width: r * 2, height: r * 2, borderRadius: '50%', background: dusk ? 'radial-gradient(circle at 40% 40%, #fff6c8 0%, #ffd070 55%, #ff9a4a 100%)' : 'radial-gradient(circle at 40% 40%, #ffffff 0%, #fff6c4 45%, #ffe074 100%)', boxShadow: `0 0 50px 14px rgba(${glowCol},0.6)` });
    // faint lens flare ghosts along the line sun -> frame centre
    [[0.34, 14, '255,230,160', 0.17], [0.55, 26, '150,215,255', 0.13], [0.8, 11, '255,170,200', 0.14], [1.1, 36, '255,255,255', 0.09], [1.45, 18, '255,215,140', 0.12]].forEach((f, i) => {
      const x = sx + (640 - sx) * f[0], y = sy + (300 - sy) * f[0];
      const c = box(clip, { left: x - f[1], top: y - f[1], width: f[1] * 2, height: f[1] * 2, borderRadius: '50%', background: `radial-gradient(circle, rgba(${f[2]},${f[3] * 1.6}) 0%, rgba(${f[2]},${f[3]}) 60%, rgba(${f[2]},0) 72%)`, border: f[1] > 20 ? `2px solid rgba(${f[2]},${f[3]})` : 'none' });
      tl.fromTo(c, { opacity: 0.55 }, { opacity: 1, duration: 2.2 + i * 0.7, repeat: rep(2.2 + i * 0.7, D), yoyo: true, ease: 'sine.inOut' }, T + i * 0.3);
    });
  }

  // ---------- aeroplanes ----------
  function airlinerHTML(tail, accent, txtId, name, flipped, shown) {
    const t = `<g transform="${flipped ? 'translate(236 0) scale(-1 1) translate(-236 0)' : ''}"><text id="${txtId}" x="188" y="78" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="15" textLength="${Math.min(150, 10 * name.length + 4)}" lengthAdjust="spacingAndGlyphs" fill="${accent}" opacity="${shown ? 1 : 0}">${name}</text></g>`;
    return `<svg viewBox="0 0 440 120" width="440" height="120" style="overflow:visible;display:block">
      <path d="M20 56 L70 56 L52 74 L24 72Z" fill="#cfd8e2"/>
      <path d="M44 50 L14 2 L44 2 L108 50Z" fill="${tail}"/><path d="M28 18 L38 18 L72 50 L58 50Z" fill="rgba(255,255,255,0.32)"/>
      <path d="M8 40 L52 49 L356 49 C398 49 428 58 438 68 C428 79 398 87 356 87 L66 87 C38 87 20 66 8 40Z" fill="url(#skyFus)" stroke="#c4d0dc" stroke-width="1"/>
      <path d="M66 82 L392 82 L399 84.5 L70 84.5Z" fill="${accent}" opacity=".9"/>
      <line x1="118" y1="59" x2="352" y2="59" stroke="#4f6e8d" stroke-width="5" stroke-dasharray="4.5 5.5"/>
      <path d="M394 55 L412 55 L423 61 L394 62Z" fill="#33516c"/>
      <rect x="98" y="53" width="11" height="22" rx="3" fill="none" stroke="#b5c2cf"/><rect x="362" y="53" width="11" height="22" rx="3" fill="none" stroke="#b5c2cf"/>
      <path d="M196 84 L300 84 L252 118 L214 118Z" fill="#e3eaf1" stroke="#b9c5d1"/>
      <path d="M242 100 H286 a9 9 0 0 1 0 18 H242Z" fill="#d3dbe4" stroke="#a9b6c3"/><ellipse cx="291" cy="109" rx="3.4" ry="8" fill="#46515c"/><rect x="250" y="106" width="30" height="3" fill="${accent}" opacity=".8"/>
      ${t}</svg>`;
  }
  function airliner(clip, o) {
    // o: {s, y, dir:1|-1, speed, T, D, start (visible start x or null), legs offset gap, tails, firstAirline}
    const s = o.s, L = 900, pos = box(clip, { left: 0, top: 0, width: 1, height: 1 }), fl = box(pos, { left: 0, top: 0, width: 440 * s, height: 120 * s });
    const wide = box(fl, { left: 238 * s - L, top: 109 * s - 15, width: L, height: 30, background: 'radial-gradient(ellipse at 100% 50%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.14) 45%, rgba(255,255,255,0) 72%)' });
    const core = box(fl, { left: 238 * s - L * 0.92, top: 109 * s - 4, width: L * 0.92, height: 8, borderRadius: 4, background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.92) 100%)' });
    const core2 = box(fl, { left: 238 * s - L * 0.7, top: 109 * s + 5, width: L * 0.7, height: 5, borderRadius: 3, background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 55%, rgba(255,255,255,0.8) 100%)' });
    tl.fromTo(wide, { scaleY: 0.8 }, { scaleY: 1.35, duration: 3.4, repeat: rep(3.4, o.D), yoyo: true, ease: 'sine.inOut' }, o.T);
    const holder = box(fl, { left: 0, top: 0, width: 440 * s, height: 120 * s });
    const flipped = o.dir < 0;
    // one svg per leg (each its own airline name); only the current leg is shown
    const legsInfo = [];
    const dist = W + L + 440 * s + 200;
    let t = o.T, k = 0, startX = o.start;
    while (t < o.T + o.D + 1 && k < 6) {
      const name = brandName(o.first + k), svgBox = box(holder, { left: 0, top: 0, width: 440 * s, height: 120 * s, opacity: k === 0 ? 1 : 0 });
      const tailCol = ['#2a9d8f', '#6a4c93', '#d98e2b', '#c4455a', '#3d7ab8', '#7a9a2e'][(o.first + k * 2) % 6];
      const acc = ['#1f6f8b', '#b33a5e', '#2f8f5b', '#c0702a', '#5a4fa3', '#a63d3d'][(o.first + k) % 6];
      svgBox.innerHTML = airlinerHTML(tailCol, acc, 'skytxt' + o.first + '_' + k, name, flipped, true);
      const x0 = k === 0 && startX !== undefined && startX !== null ? startX : (o.dir > 0 ? -440 * s - 100 : W + 100);
      const x1 = o.dir > 0 ? W + L + 100 : -L - 440 * s - 100;
      const dur = Math.abs(x1 - x0) / o.speed;
      tl.fromTo(pos, { x: x0 }, { x: x1, duration: dur, ease: 'none' }, t);
      if (k > 0) { tl.set(svgBox, { opacity: 1 }, t); }
      if (k > 0) { legsInfo[k - 1].box && tl.set(legsInfo[k - 1].box, { opacity: 0 }, t); }
      legsInfo.push({ box: svgBox });
      t += dur + (o.gap ?? 2); k++;
    }
    // legs after the first start hidden; hide leg0 once leg1 begins (done above)
    gsap.set(holder, { transformOrigin: '0 0' });
    if (flipped) gsap.set(fl, { transformOrigin: `${236 * s}px 0px`, scaleX: -1 });
    tl.fromTo(pos, { y: o.y }, { y: o.y + 5, duration: 6, repeat: rep(6, o.D), yoyo: true, ease: 'sine.inOut' }, o.T);
    tl.fromTo(holder, { rotation: -0.5 }, { rotation: 0.6, duration: 5, repeat: rep(5, o.D), yoyo: true, ease: 'sine.inOut' }, o.T);
    gsap.set(pos, { y: o.y });
    return pos;
  }

  function bannerPlane(clip, o) {
    const s = o.s, ban = BANNERS;
    const pos = box(clip, { left: 0, top: 0, width: 1, height: 1 });
    const planeW = 130 * s, ropeX = 4 * s;
    const plane = box(pos, { left: 0, top: 0, width: planeW, height: 56 * s });
    plane.innerHTML = `<svg viewBox="0 0 130 56" width="${planeW}" height="${56 * s}" style="overflow:visible;display:block">
      <path d="M22 32 L2 12 L13 12 L34 26Z" fill="#d64545"/><path d="M26 33 L6 36 L6 31 L28 29Z" fill="#e9e3d6"/>
      <path d="M20 31 C20 23 40 21 62 21 L100 23 C112 25 118 29 118 33 C118 39 110 41 100 41 L40 41 C28 41 20 37 20 31Z" fill="#f6f2e8" stroke="#cfc8b8" stroke-width=".8"/>
      <path d="M24 35 L112 35 L110 38 L28 38Z" fill="#d64545" opacity=".85"/>
      <path d="M86 25 L100 25 L107 31 L86 31Z" fill="#7aa5c8"/>
      <path d="M50 19 L96 19 L100 12 L54 12Z" fill="#f1ead8" stroke="#bfb7a3" stroke-width=".8"/>
      <path d="M64 20 L60 40 M84 20 L92 40" stroke="#4a4a4a" stroke-width="1.2"/>
      <circle cx="60" cy="46" r="4.2" fill="#2f2f33"/><circle cx="96" cy="45" r="4.2" fill="#2f2f33"/><path d="M60 41 V46 M96 41 V45" stroke="#4a4a4a" stroke-width="1.4"/>
      <ellipse class="prop" cx="121" cy="32" rx="2.6" ry="15" fill="rgba(50,50,50,0.38)"/><circle cx="119.5" cy="32" r="2.4" fill="#b33a3a"/></svg>`;
    const prop = plane.querySelector('.prop'); gsap.set(prop, { svgOrigin: '121 32' });
    tl.fromTo(prop, { scaleY: 1 }, { scaleY: 0.55, duration: 0.05, repeat: Math.ceil(o.D / 0.05), yoyo: true, ease: 'none' }, o.T);
    // banner instances (one per leg), made of wavy vertical slices
    const BW = 460, BH = 56, nSl = 10, sw = BW / nSl, tot = 520;
    const dist = W + 140 + (tot + 130) * s, legDur = dist / o.speed;
    let t = o.T, k = 0, prevBox = null;
    while (t < o.T + o.D + 1 && k < 5) {
      const txt = ban[(o.first + k) % ban.length], inst = box(pos, { left: ropeX - tot * s, top: 34 * s - BH * s / 2, width: tot * s, height: BH * s, opacity: k === 0 ? 1 : 0 });
      let defs = '', slices = '';
      const content = `<rect x="3" y="5" width="${BW - 6}" height="${BH - 10}" rx="5" fill="#fff6d6" stroke="#c0392b" stroke-width="3"/><text x="${BW / 2}" y="${BH / 2 + 9}" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="26" fill="#a2252d" textLength="${Math.min(BW - 36, 17 * txt.length + 6)}" lengthAdjust="spacingAndGlyphs">${txt}</text>`;
      for (let i = 0; i < nSl; i++) {
        defs += `<clipPath id="skybc${o.first}_${k}_${i}"><rect x="${i * sw - 0.5}" y="-10" width="${sw + 1}" height="${BH + 20}"/></clipPath>`;
        slices += `<g class="sl" clip-path="url(#skybc${o.first}_${k}_${i})">${content}</g>`;
      }
      inst.innerHTML = `<svg viewBox="0 0 ${tot} ${BH}" width="${tot * s}" height="${BH * s}" style="overflow:visible;display:block"><defs>${defs}</defs><path d="M${BW - 4} 28 Q${BW + 28} 40 ${tot} 30" stroke="#3a3a3a" stroke-width="1.6" fill="none"/>${slices}</svg>`;
      Array.from(inst.querySelectorAll('.sl')).forEach((sl, i) => {
        tl.fromTo(sl, { y: -3.5 }, { y: 3.5, duration: 0.42, repeat: rep(0.42, o.D), yoyo: true, ease: 'sine.inOut' }, t + i * 0.07);
      });
      const xs = k === 0 ? o.start : (-(tot * s) - 20 + ropeX);
      tl.fromTo(pos, { x: xs }, { x: W + 40, duration: Math.abs(W + 40 - xs) / o.speed, ease: 'none' }, t);
      if (k > 0) { tl.set(inst, { opacity: 1 }, t); tl.set(prevBox, { opacity: 0 }, t); }
      prevBox = inst;
      t += Math.abs(W + 40 - xs) / o.speed + 1.5; k++;
    }
    tl.fromTo(pos, { y: o.y }, { y: o.y + 9, duration: 2.6, repeat: rep(2.6, o.D), yoyo: true, ease: 'sine.inOut' }, o.T);
    gsap.set(pos, { y: o.y });
    tl.fromTo(plane, { rotation: -1.5 }, { rotation: 1.8, duration: 1.9, repeat: rep(1.9, o.D), yoyo: true, ease: 'sine.inOut' }, o.T);
    return pos;
  }

  function helicopter(clip, o) {
    const s = o.s, pos = box(clip, { left: 0, top: 0, width: 1, height: 1, opacity: 0.8 });
    const fl = box(pos, { left: 0, top: 0, width: 90 * s, height: 44 * s });
    fl.innerHTML = `<svg viewBox="0 0 90 44" width="${90 * s}" height="${44 * s}" style="overflow:visible;display:block">
      <path d="M52 22 L86 16 L87 20 L54 27Z" fill="#5b6b7b"/><path d="M84 8 L88 8 L89 20 L84 19Z" fill="#4c5b6a"/>
      <ellipse cx="36" cy="25" rx="22" ry="12" fill="#5f7284"/><path d="M22 24 C24 17 34 15 42 17 L44 26 L20 28Z" fill="#a7c4dc"/>
      <path d="M36 12 L36 8" stroke="#3d4955" stroke-width="2"/><rect class="mr" x="2" y="6" width="76" height="2.4" rx="1.2" fill="#2f3943" opacity=".75"/>
      <path d="M18 40 L56 40 M26 36 L24 40 M46 36 L48 40" stroke="#3d4955" stroke-width="1.8" stroke-linecap="round"/>
      <ellipse class="tr" cx="87" cy="14" rx="2" ry="8" fill="rgba(40,40,40,0.5)"/></svg>`;
    const mr = fl.querySelector('.mr'), tr = fl.querySelector('.tr');
    gsap.set(mr, { svgOrigin: '40 7' }); gsap.set(tr, { svgOrigin: '87 14' });
    tl.fromTo(mr, { scaleX: 1 }, { scaleX: 0.6, duration: 0.06, repeat: Math.ceil(o.D / 0.06), yoyo: true, ease: 'none' }, o.T);
    tl.fromTo(tr, { scaleY: 1 }, { scaleY: 0.25, duration: 0.05, repeat: Math.ceil(o.D / 0.05), yoyo: true, ease: 'none' }, o.T);
    tl.fromTo(fl, { rotation: 2 }, { rotation: 7, duration: 2.2, repeat: rep(2.2, o.D), yoyo: true, ease: 'sine.inOut' }, o.T);
    const dir = o.dir;
    if (dir < 0) gsap.set(fl, { transformOrigin: `${45 * s}px 0px`, scaleX: -1 });
    const x0 = o.x0, x1 = o.x1, dur = Math.abs(x1 - x0) / o.speed;
    tl.fromTo(pos, { x: x0 }, { x: x1, duration: dur, ease: 'none' }, o.T);
    let t = o.T + dur, k = 0;
    while (t < o.T + o.D && k < 4) {
      const a = dir > 0 ? -120 : W + 120, b = dir > 0 ? W + 120 : -120, d = Math.abs(b - a) / o.speed;
      tl.fromTo(pos, { x: a }, { x: b, duration: d, ease: 'none' }, t); t += d; k++;
    }
    tl.fromTo(pos, { y: o.y }, { y: o.y + 14, duration: 3.3, repeat: rep(3.3, o.D), yoyo: true, ease: 'sine.inOut' }, o.T);
    gsap.set(pos, { y: o.y });
  }

  function balloon(clip, o) {
    const s = o.s, pos = box(clip, { left: 0, top: 0, width: 1, height: 1 });
    const fl = box(pos, { left: -50 * s, top: -146 * s, width: 100 * s, height: 150 * s });
    const cols = ['#e63946', '#ffd166', '#06b48a', '#2a84c4', '#f08a24', '#8e5bd0'];
    let bands = '';
    for (let i = 0; i < 6; i++) bands += `<path d="M${4 + i * 15.3} 0 L${4 + (i + 1) * 15.3} 0 L${4 + (i + 1) * 15.3} 110 L${4 + i * 15.3} 110Z" fill="${cols[i]}"/>`;
    fl.innerHTML = `<svg viewBox="0 0 100 150" width="${100 * s}" height="${150 * s}" style="overflow:visible;display:block">
      <defs><clipPath id="skyBal"><path d="M50 4 C14 4 4 40 14 66 C20 80 32 92 38 100 L62 100 C68 92 80 80 86 66 C96 40 86 4 50 4Z"/></clipPath></defs>
      <g clip-path="url(#skyBal)">${bands}<ellipse cx="34" cy="34" rx="16" ry="26" fill="#fff" opacity=".22"/><path d="M70 0 C96 30 90 70 62 100 L100 100 L100 0Z" fill="#000" opacity=".13"/>
      <path d="M50 4 C38 30 38 70 44 100 M50 4 C62 30 62 70 56 100" stroke="rgba(0,0,0,0.18)" stroke-width="1" fill="none"/></g>
      <path d="M38 100 L62 100 L60 108 L40 108Z" fill="#3a3a3a"/><path d="M40 108 L44 128 M60 108 L56 128" stroke="#5a4a3a" stroke-width="1.2"/>
      <rect x="42" y="128" width="16" height="13" rx="2" fill="#a9733c"/><path d="M42 134 H58 M47 128 V141 M53 128 V141" stroke="#7d5126" stroke-width="1"/>
      <path class="fl" d="M50 108 Q45 115 50 123 Q55 115 50 108Z" fill="#ffb22e"/></svg>`;
    const f = fl.querySelector('.fl'); gsap.set(f, { svgOrigin: '50 108' });
    tl.fromTo(f, { scaleY: 0.7, opacity: 0.8 }, { scaleY: 1.25, opacity: 1, duration: 0.17, repeat: Math.ceil(o.D / 0.17), yoyo: true, ease: 'sine.inOut' }, o.T);
    gsap.set(fl, { transformOrigin: `${50 * s}px ${140 * s}px` });
    tl.fromTo(fl, { rotation: -3 }, { rotation: 3, duration: 3.6, repeat: rep(3.6, o.D), yoyo: true, ease: 'sine.inOut' }, o.T);
    tl.fromTo(pos, { x: o.x0 }, { x: Math.max(-60, o.x0 - o.speed * o.D), duration: o.D, ease: 'none' }, o.T);
    tl.fromTo(pos, { y: o.y }, { y: o.y + 16, duration: 5.5, repeat: rep(5.5, o.D), yoyo: true, ease: 'sine.inOut' }, o.T);
    gsap.set(pos, { y: o.y });
  }

  // ---------- main ----------
  window.ukSky = function ukSky(w, opts) {
    opts = opts || {};
    const T = opts.T || 0, D = opts.D || 40, mood = PAL[opts.mood] ? opts.mood : 'day', P = PAL[mood];
    const wrap = box(w, { left: 0, top: 0, width: W, height: H, overflow: 'hidden' });
    wrap.id = 'sky_wrap';
    const defs = box(wrap, { left: 0, top: 0, width: 0, height: 0 }, `<svg width="0" height="0" style="position:absolute"><defs>
      <linearGradient id="skyNeck" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3fae8a"/><stop offset=".55" stop-color="#7a5fb8"/><stop offset="1" stop-color="#2e8f72"/></linearGradient>
      <linearGradient id="skyFus" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#f1f5f9"/><stop offset="1" stop-color="#cdd8e3"/></linearGradient></defs></svg>`);
    const clip = box(wrap, { left: 0, top: 0, width: W, height: 470, overflow: 'hidden' });
    // 1) gradient + horizon haze
    box(clip, { left: 0, top: 0, width: W, height: 470, background: `linear-gradient(${P.g.map((g) => g[0] + ' ' + g[1] + '%').join(',')})` });
    box(clip, { left: 0, top: 300, width: W, height: 170, background: 'linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.35))' });
    // 2) sun
    sun(clip, mood, T, D);
    // 3) cloud layers (back to front) + thin streaks
    const R = rr(4242);
    cirrus(clip, R, { speed: 3, op: mood === 'grey' ? 0.5 : 0.8, col: 'rgba(255,255,255,0.7)', T, D });
    cloudLayer(clip, R, { y0: 215, y1: 345, hMin: 34, hMax: 60, gap: 50 / P.dens, speed: 6, op: 0.8, pal: P.cloud, T, D });
    cloudLayer(clip, R, { y0: 100, y1: 270, hMin: 58, hMax: 96, gap: 90 / P.dens, speed: 13, op: 0.93, pal: P.cloud, T, D });
    cloudLayer(clip, R, { y0: 290, y1: 380, hMin: 70, hMax: 120, gap: 150 / P.dens, speed: 22, op: 0.97, pal: P.cloud, T, D });
    // 4) distant specks, helicopter, balloon (far things first)
    const far = box(clip, { left: 0, top: 0, width: W, height: 420 });
    const Rb = rr(777);
    for (let i = 0; i < 14; i++) {
      const b = makeBird(far, 'speck', 0.8 + Rb() * 0.7), cx = 80 + Rb() * 1100, y = 70 + Rb() * 250, dir = Rb() < 0.5 ? -1 : 1, hh = 0.2 + Rb() * 0.12;
      flap(b, T, D, { h: hh, ph: Rb() * hh, up: 1, dn: -0.6, r0: 0, r1: 0, bob: 0.4 });
      tl.fromTo(b.pos, { x: cx }, { x: cx + dir * (60 + Rb() * 140), duration: D, ease: 'none' }, T);
      tl.fromTo(b.pos, { y }, { y: y + 10 + Rb() * 16, duration: 3 + Rb() * 3, repeat: rep(4, D), yoyo: true, ease: 'sine.inOut' }, T);
      gsap.set(b.pos, { y });
    }
    helicopter(clip, { s: 0.85, y: 212, dir: -1, x0: 600, x1: -130, speed: 38, T, D });
    balloon(clip, { s: 0.78, x0: 1150, y: 232, speed: 8, T, D });
    // 5) high airliners with contrails
    const planes = [];
    planes.push(airliner(clip, { s: 0.34, y: 80, dir: -1, speed: 60, T: T + 0.001, D, start: 980, first: 3, gap: 2 }));
    planes.push(airliner(clip, { s: 0.62, y: 34, dir: 1, speed: 92, T, D, start: 150, first: 0, gap: 2 }));
    // 6) banner plane
    planes.push(bannerPlane(clip, { s: 0.95, y: 168, speed: 68, T, D, start: 620, first: 1 }));
    // 7) birds: swifts, pigeons, lone gulls, V flocks
    const sw = box(clip, { left: 0, top: 0, width: W, height: 420 });
    const Rs = rr(31);
    for (let i = 0; i < 7; i++) {
      const b = makeBird(sw, 'swift', 0.6 + Rs() * 0.3), dir = i % 3 === 2 ? -1 : 1, y = 60 + Rs() * 270, spd = 330 + Rs() * 150;
      if (dir < 0) gsap.set(b.fl, { scaleX: -1 });
      flap(b, T, D, { h: 0.07 + Rs() * 0.02, ph: Rs() * 0.06, up: 1, dn: -0.7, bob: 0.5 });
      const a = dir > 0 ? -100 : W + 100, z = dir > 0 ? W + 100 : -100, xs = a + (z - a) * (0.05 + 0.8 * Rs()), dur0 = Math.abs(z - xs) / spd;
      tl.fromTo(b.pos, { x: xs }, { x: z, duration: dur0, ease: 'none' }, T + i * 0.35);
      const dur = Math.abs(z - a) / spd, gap = 1.5 + Rs() * 3, cyc = dur + gap;
      for (let t = T + i * 0.35 + dur0 + gap, k = 0; t < T + D && k < 8; t += cyc, k++) tl.fromTo(b.pos, { x: a }, { x: z, duration: dur, ease: 'none' }, t);
      tl.fromTo(b.pos, { y: y - 26 }, { y: y + 26, duration: 0.9 + Rs() * 0.7, repeat: rep(1.2, D), yoyo: true, ease: 'sine.inOut' }, T);
      gsap.set(b.pos, { y });
    }
    // pigeon flock wheeling
    const pf = box(clip, { left: 0, top: 0, width: 1, height: 1 }), pg = box(pf, { left: 0, top: 0, width: 1, height: 1 });
    const Rp = rr(55);
    for (let i = 0; i < 11; i++) {
      const b = makeBird(pg, 'pigeon', 0.42 + Rp() * 0.08), ox = (Rp() - 0.5) * 300, oy = (Rp() - 0.5) * 120, hh = 0.1 + Rp() * 0.03;
      gsap.set(b.pos, { x: ox, y: oy });
      flap(b, T, D, { h: hh, ph: Rp() * hh, up: 1, dn: -0.7, r0: -10, r1: 12, bob: 2.2 });
      tl.fromTo(b.fl, { x: -4 }, { x: 4, duration: 1.1 + Rp(), repeat: rep(1.5, D), yoyo: true, ease: 'sine.inOut' }, T);
    }
    soar(pf, pg, T, D, { x0: 420, x1: 900, y0: 150, ya: 36, h: 7.5, yph: 1.2 });
    tinyRock(pg, T, D, 8, 3.7);
    // lone gulls
    const lone = [
      { s: 0.78, x0: 110, x1: 600, y0: 262, ya: 18, h: 9, mode: 'flap', fh: 0.34, ph: 0.05 },
      { s: 0.62, x0: 1180, x1: 760, y0: 120, ya: 14, h: 11, mode: 'glide', g: 0.5, ph: 0.5 },
      { s: 0.95, x0: 760, x1: 1170, y0: 322, ya: 12, h: 8.5, mode: 'glide', g: 0.42, ph: 1.1 },
      { s: 0.55, x0: 300, x1: 880, y0: 82, ya: 10, h: 12, mode: 'flap', fh: 0.42, ph: 0.12 }
    ];
    lone.forEach((g, i) => {
      const b = makeBird(clip, 'gull', g.s);
      if (g.mode === 'flap') flap(b, T, D, { h: g.fh, ph: g.ph, up: 1, dn: -0.7, bob: 3 }); else glide(b, T, D, { g: g.g, ph: g.ph });
      soar(b.pos, b.fl, T, D, { x0: g.x0, x1: g.x1, y0: g.y0, ya: g.ya, h: g.h, yph: i * 0.8 });
    });
    // V flocks of gulls (near and far)
    function vflock(n, s, x0, x1, y, speed, dir, seed, glideN) {
      const R2 = rr(seed), f = box(clip, { left: 0, top: 0, width: 1, height: 1 }), g = box(f, { left: 0, top: 0, width: 1, height: 1 });
      for (let i = 0; i < n; i++) {
        const rank = Math.ceil(i / 2), side = i % 2 ? 1 : -1, b = makeBird(g, 'gull', s * (0.9 + R2() * 0.2));
        gsap.set(b.pos, { x: -rank * 40 * s * 2.4 + (R2() - 0.5) * 10 * s, y: i === 0 ? 0 : side * rank * 11 * s * 2.4 + (R2() - 0.5) * 8 * s });
        if (i >= n - glideN) glide(b, T, D, { g: 0.45, ph: R2() * 1.5 }); else { const hh = 0.3 + R2() * 0.1; flap(b, T, D, { h: hh, ph: R2() * hh, up: 1, dn: -0.7, bob: 3 }); }
        tl.fromTo(b.fl, { x: -2 }, { x: 2, duration: 1.3 + R2(), repeat: rep(1.8, D), yoyo: true, ease: 'sine.inOut' }, T);
      }
      if (dir < 0) gsap.set(g, { scaleX: -1 });
      const dur0 = Math.abs(x1 - x0) / speed;
      tl.fromTo(f, { x: x0 }, { x: x1, duration: dur0, ease: 'none' }, T);
      const a = dir > 0 ? -520 : W + 520, z = dir > 0 ? W + 520 : -520, d2 = Math.abs(z - a) / speed;
      for (let t = T + dur0 + 2, k = 0; t < T + D && k < 4; t += d2 + 2, k++) tl.fromTo(f, { x: a }, { x: z, duration: d2, ease: 'none' }, t);
      tl.fromTo(f, { y: y - 16 }, { y: y + 16, duration: 4.5, repeat: rep(4.5, D), yoyo: true, ease: 'sine.inOut' }, T);
      gsap.set(f, { y });
      tinyRock(g, T, D, 2.5, 3.3);
      return f;
    }
    const flocks = [vflock(9, 0.5, 80, W + 520, 188, 62, 1, 9, 2), vflock(5, 0.26, W - 100, -520, 70, 34, -1, 19, 1)];
    return { wrap, clip, flocks, planes };
  };
})();
