// ===== NIGHT TALES atmosphere kit (1280x720). Every scene builds into its own <div id="s_<name>"> using these helpers. =====
// Scene windows: win('road') -> {T: start, D: duration, E: end} in seconds (already includes the 3 s intro offset).
const W = 1280, H = 720;
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;}}
const rr = (seed) => mulberry32(seed);
function mk(parent, cls, css, html) { const d = document.createElement('div'); if (cls) d.className = cls; if (css) Object.assign(d.style, css); if (html !== undefined) d.innerHTML = html; parent.appendChild(d); return d; }
const px = (o) => { const r = {}; for (const k in o) r[k] = typeof o[k] === 'number' && !['opacity', 'zIndex', 'flex', 'fontWeight'].includes(k) ? o[k] + 'px' : o[k]; return r; };
const box = (p, css, html, cls) => mk(p, cls || 'abs', px(css), html);
const S = (name) => document.getElementById('s_' + name);
const win = (name) => { const s = SC[name]; return { T: s.t0, D: s.t1 - s.t0, E: s.t1 }; };
const PAL = { sky0: '#04061a', sky1: '#0d1a45', sky2: '#27407a', moon: '#eef3ff', ink: '#05070f', mist: '#9fb3c8', lamp: '#ffb347', aleya: '#7dffd9', warm: '#ff8a3d', blood: '#7a0e1c' };

// ---- sky: gradient, twinkling stars, moon with glow. o: {top,mid,bot,stars,moon:{x,y,r},T,D}
function sky(c, o) {
  const T = o.T, D = o.D, R = rr(o.seed || 5);
  box(c, { left: 0, top: 0, width: W, height: H, background: `linear-gradient(${o.top || PAL.sky0} 0%, ${o.mid || PAL.sky1} 55%, ${o.bot || PAL.sky2} 100%)` });
  for (let i = 0; i < (o.stars ?? 90); i++) {
    const s = box(c, { left: R() * W, top: R() * H * 0.62, width: 1 + R() * 2.2, height: 1 + R() * 2.2, borderRadius: '50%', background: '#fff', opacity: 0.25 + R() * 0.7 });
    tl.to(s, { opacity: 0.1 + R() * 0.3, duration: 1 + R() * 2, repeat: Math.max(1, Math.floor(D / 2.5)), yoyo: true, ease: 'sine.inOut' }, T + R() * 2);
  }
  let moon = null;
  if (o.moon) {
    const m = o.moon; moon = box(c, { left: m.x - m.r * 4, top: m.y - m.r * 4, width: m.r * 8, height: m.r * 8 });
    box(moon, { left: 0, top: 0, width: m.r * 8, height: m.r * 8, borderRadius: '50%', background: 'radial-gradient(circle, rgba(190,215,255,0.38) 0%, rgba(120,150,255,0.12) 38%, rgba(0,0,0,0) 70%)' });
    box(moon, { left: m.r * 3, top: m.r * 3, width: m.r * 2, height: m.r * 2, borderRadius: '50%', background: `radial-gradient(circle at 38% 36%, #fff 0%, ${PAL.moon} 55%, #b9c6e6 100%)`, boxShadow: '0 0 60px 12px rgba(180,205,255,0.5)' });
    tl.to(moon, { scale: 1.04, duration: 6, yoyo: true, repeat: Math.max(1, Math.floor(D / 6)), ease: 'sine.inOut' }, T);
  }
  return { moon };
}

// ---- silhouette hills / treeline. o: {y,h,color,seed,amp,drift,trees,T,D}
function ridge(c, o) {
  const R = rr(o.seed || 3), n = 60, w = W * 1.4, pts = [];
  for (let i = 0; i <= n; i++) { const x = (i / n) * w; let y = o.h - (o.amp || 40) * (0.5 + 0.5 * Math.sin(i * 0.31 + R() * 0.6)) - R() * (o.jag || 14); pts.push(`${x.toFixed(1)},${y.toFixed(1)}`); }
  let trees = '';
  for (let i = 0; i < (o.trees ?? 0); i++) { const x = R() * w, hh = 50 + R() * (o.treeH || 80); trees += `<path d="M${x} ${o.h} L${x - 6} ${o.h - hh * 0.4} L${x - 20} ${o.h - hh * 0.5} L${x} ${o.h - hh} L${x + 20} ${o.h - hh * 0.5} L${x + 6} ${o.h - hh * 0.4}Z" fill="${o.color}"/>`; }
  const el = box(c, { left: -W * 0.2, top: o.y, width: w, height: o.h + 2 }, `<svg viewBox="0 0 ${w} ${o.h + 2}" width="${w}" height="${o.h + 2}"><polygon points="0,${o.h + 2} ${pts.join(' ')} ${w},${o.h + 2}" fill="${o.color}"/>${trees}</svg>`);
  if (o.drift) tl.to(el, { x: o.drift, duration: o.D, ease: 'none' }, o.T);
  return el;
}

// ---- soft drifting mist bands. o: {y,h,op,color,n,T,D,speed}
function mist(c, o) {
  const R = rr(o.seed || 9);
  for (let i = 0; i < (o.n || 3); i++) {
    const wd = 900 + R() * 700, e = box(c, { left: -wd * 0.3 + R() * W, top: o.y + R() * (o.h || 120) * 0.6, width: wd, height: (o.h || 120) * (0.6 + R() * 0.6), borderRadius: '50%', background: `radial-gradient(ellipse, ${o.color || 'rgba(170,190,215,0.55)'} 0%, rgba(0,0,0,0) 70%)`, opacity: (o.op ?? 0.35) * (0.6 + R() * 0.6), filter: 'blur(16px)' });
    tl.to(e, { x: (R() < 0.5 ? -1 : 1) * (80 + R() * 220) * (o.speed || 1), duration: o.D, ease: 'none' }, o.T);
  }
}

// ---- warm glow with candle-like flicker. o: {x,y,r,color,op,T,D,flicker}
function glow(c, o) {
  const R = rr((o.x | 0) + 11), g = box(c, { left: o.x - o.r, top: o.y - o.r, width: o.r * 2, height: o.r * 2, borderRadius: '50%', background: `radial-gradient(circle, ${o.color || 'rgba(255,184,71,0.75)'} 0%, rgba(255,140,40,0.25) 35%, rgba(0,0,0,0) 70%)`, opacity: o.op ?? 0.9, mixBlendMode: 'screen' });
  if (o.flicker !== false) for (let t = o.T; t < o.T + o.D; t += 0.12 + R() * 0.2) tl.set(g, { opacity: (o.op ?? 0.9) * (0.62 + R() * 0.38), scale: 0.93 + R() * 0.14 }, t);
  return g;
}

// ---- hurricane lamp (svg) with glow. Returns the container
function lamp(c, o) {
  const e = box(c, { left: o.x - 20 * (o.s || 1), top: o.y - 30 * (o.s || 1), width: 40 * (o.s || 1), height: 60 * (o.s || 1) }, `<svg viewBox="0 0 40 60" width="100%" height="100%"><path d="M13 4 H27 V10 H13Z" fill="#111"/><path d="M11 12 H29 L32 44 H8Z" fill="rgba(255,200,120,0.55)" stroke="#111" stroke-width="2"/><path d="M20 44 C14 36 16 28 20 20 C24 28 26 36 20 44Z" fill="#fff6c8"/><rect x="6" y="44" width="28" height="7" rx="2" fill="#111"/><path d="M14 4 C14 -2 26 -2 26 4" fill="none" stroke="#111" stroke-width="2"/></svg>`);
  glow(c, { x: o.x, y: o.y, r: o.r || 150 * (o.s || 1), T: o.T, D: o.D });
  return e;
}

// ---- walking silhouette man in side view, optionally with a lamp. o: {x,y,s,T,D,from,to,lamp}
function man(c, o) {
  const s = o.s || 1, g = box(c, { left: o.x - 40 * s, top: o.y - 180 * s, width: 80 * s, height: 180 * s });
  g.innerHTML = `<svg viewBox="0 0 80 180" width="100%" height="100%" style="overflow:visible"><g id="m_back"><rect x="34" y="92" width="11" height="80" rx="5" fill="#050608" transform-origin="39 92"/></g><path d="M26 30 Q26 18 40 18 Q54 18 54 32 L56 96 L24 96Z" fill="#07090e"/><circle cx="40" cy="12" r="12" fill="#07090e"/><path d="M38 40 L56 66 L62 96" stroke="#07090e" stroke-width="9" stroke-linecap="round" fill="none"/><g id="m_front"><rect x="34" y="92" width="11" height="80" rx="5" fill="#090b11" transform-origin="39 92"/></g></svg>`;
  const back = g.querySelector('#m_back rect'), front = g.querySelector('#m_front rect');
  const steps = Math.floor(o.D / 0.55);
  tl.fromTo(front, { rotation: 22 }, { rotation: -22, duration: 0.55, repeat: steps, yoyo: true, ease: 'sine.inOut' }, o.T);
  tl.fromTo(back, { rotation: -22 }, { rotation: 22, duration: 0.55, repeat: steps, yoyo: true, ease: 'sine.inOut' }, o.T);
  tl.fromTo(g, { y: 0 }, { y: -5 * s, duration: 0.275, repeat: steps * 2 + 1, yoyo: true, ease: 'sine.inOut' }, o.T);
  if (o.to !== undefined) tl.fromTo(g, { x: o.from || 0 }, { x: o.to, duration: o.D, ease: 'none' }, o.T);
  if (o.lamp) { const l = lamp(c, { x: o.x + 36 * s, y: o.y - 78 * s, s: s * 0.9, T: o.T, D: o.D }); if (o.to !== undefined) tl.fromTo(l, { x: o.from || 0 }, { x: o.to, duration: o.D, ease: 'none' }, o.T); }
  return g;
}

// ---- bamboo grove swaying. o: {x0,x1,y,n,h,T,D}
function bamboo(c, o) {
  const R = rr(o.seed || 21);
  for (let i = 0; i < (o.n || 14); i++) {
    const x = o.x0 + R() * (o.x1 - o.x0), h = (o.h || 520) * (0.7 + R() * 0.4), wd = 8 + R() * 8;
    let nodes = ''; for (let k = 1; k < 9; k++) nodes += `<rect x="-2" y="${(h / 9) * k}" width="${wd + 4}" height="4" fill="#000" opacity="0.55"/>`;
    const st = box(c, { left: x, top: o.y - h, width: wd, height: h, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 ${wd} ${h}" width="${wd}" height="${h}" style="overflow:visible"><rect width="${wd}" height="${h}" rx="4" fill="${o.color || '#07100d'}"/>${nodes}</svg>`);
    tl.fromTo(st, { rotation: -2 - R() * 3 }, { rotation: 2 + R() * 4, duration: 1.8 + R() * 2.2, yoyo: true, repeat: Math.max(1, Math.floor(o.D / 3)), ease: 'sine.inOut' }, o.T + R());
  }
}

// ---- glowing orbs (aleya / will-o'-the-wisp). o: {n,x0,x1,y0,y1,T,D,color}
function orbs(c, o) {
  const R = rr(o.seed || 31), list = [];
  for (let i = 0; i < (o.n || 7); i++) {
    const x = o.x0 + R() * (o.x1 - o.x0), y = o.y0 + R() * (o.y1 - o.y0), r = 10 + R() * 14;
    const e = box(c, { left: x - r * 3, top: y - r * 3, width: r * 6, height: r * 6, borderRadius: '50%', background: `radial-gradient(circle, #fff 0%, ${o.color || PAL.aleya} 18%, rgba(60,255,200,0.25) 42%, rgba(0,0,0,0) 70%)`, mixBlendMode: 'screen', opacity: 0 });
    tl.to(e, { opacity: 0.9, duration: 1.4 }, o.T + R() * 3);
    tl.to(e, { x: (R() - 0.5) * 120, y: (R() - 0.5) * 50, duration: 3 + R() * 3, yoyo: true, repeat: Math.max(1, Math.floor(o.D / 5)), ease: 'sine.inOut' }, o.T);
    list.push({ e, x, y, r });
  }
  return list;
}

// ---- slanted rain. o: {n,op,T,D,len}
function rain(c, o) {
  const R = rr(o.seed || 41), wrap = box(c, { left: -100, top: -100, width: W + 200, height: H + 200, opacity: o.op ?? 0.4, overflow: 'hidden' });
  for (let i = 0; i < (o.n || 110); i++) {
    const s = box(wrap, { left: R() * (W + 200), top: R() * (H + 200), width: 1.3, height: o.len || 34, background: 'linear-gradient(rgba(200,220,255,0), rgba(200,220,255,0.9))', transform: 'rotate(12deg)' });
    const dur = 0.45 + R() * 0.3;
    tl.fromTo(s, { y: -140 }, { y: H + 260, x: 60, duration: dur, repeat: Math.floor(o.D / dur), ease: 'none' }, o.T + R() * dur);
  }
  return wrap;
}

// ---- water with moon reflection and ripples. o: {y,h,T,D,moonX}
function water(c, o) {
  const R = rr(o.seed || 51);
  box(c, { left: 0, top: o.y, width: W, height: o.h, background: 'linear-gradient(#0a1432, #02040c)' });
  if (o.moonX !== undefined) { const m = box(c, { left: o.moonX - 40, top: o.y + 6, width: 80, height: o.h - 10, background: 'linear-gradient(rgba(200,220,255,0.55), rgba(200,220,255,0))', filter: 'blur(6px)' }); tl.to(m, { scaleX: 1.5, opacity: 0.6, duration: 1.7, yoyo: true, repeat: Math.max(1, Math.floor(o.D / 1.7)), ease: 'sine.inOut' }, o.T); }
  for (let i = 0; i < 14; i++) { const l = box(c, { left: R() * W, top: o.y + 10 + R() * (o.h - 20), width: 60 + R() * 140, height: 2, background: 'rgba(170,200,255,0.25)' }); tl.to(l, { x: (R() < 0.5 ? -1 : 1) * 60, opacity: 0.05, duration: 2 + R() * 2, yoyo: true, repeat: Math.max(1, Math.floor(o.D / 3)), ease: 'sine.inOut' }, o.T); }
}

// ---- crackling fire. o: {x,y,s,T,D}
function fire(c, o) {
  const s = o.s || 1, R = rr(o.x | 0 || 61);
  box(c, { left: o.x - 20 * s, top: o.y - 6 * s, width: 40 * s, height: 10 * s, background: '#1a0f08', borderRadius: 6 });
  for (let i = 0; i < 3; i++) {
    const f = box(c, { left: o.x - (14 - i * 5) * s, top: o.y - (46 - i * 10) * s, width: (28 - i * 8) * s, height: (46 - i * 10) * s, background: ['#ff7a18', '#ffb347', '#fff3b0'][i], borderRadius: '50% 50% 50% 50% / 70% 70% 30% 30%', transformOrigin: '50% 100%', mixBlendMode: 'screen' });
    for (let t = o.T; t < o.T + o.D; t += 0.1 + R() * 0.15) tl.set(f, { scaleY: 0.8 + R() * 0.5, scaleX: 0.85 + R() * 0.3, rotation: (R() - 0.5) * 10 }, t);
  }
  glow(c, { x: o.x, y: o.y - 30 * s, r: 220 * s, T: o.T, D: o.D });
}

// ---- lightning-ish soft flash (sky). t: time
function flash(c, t, strength = 0.5) { const f = box(c, { left: 0, top: 0, width: W, height: H, background: '#dfe8ff', opacity: 0, zIndex: 40 }); tl.set(f, { opacity: strength }, t).to(f, { opacity: 0.1, duration: 0.07 }, t + 0.07).to(f, { opacity: strength * 0.8, duration: 0.05 }, t + 0.15).to(f, { opacity: 0, duration: 0.5 }, t + 0.2); }

// ---- scene fade in / out (dip to black)
function fadeScene(el, T, D, fin = 1.4, fout = 1.2) { tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: fin, ease: 'sine.out' }, T); tl.to(el, { opacity: 0, duration: fout, ease: 'sine.in' }, T + D - fout); }

// ---- slow camera drift on a scene's inner layer
function drift(el, T, D, o = {}) { tl.fromTo(el, { scale: o.s0 || 1.0, x: o.x0 || 0, y: o.y0 || 0 }, { scale: o.s1 || 1.06, x: o.x1 || 0, y: o.y1 || 0, duration: D, ease: 'none', transformOrigin: o.origin || '50% 50%' }, T); }

// ---- palm tree silhouette with swaying crown. o: {x,y,s,h,color,T,D}
function palm(c, o) {
  const s = o.s || 1, h = (o.h || 300) * s, col = o.color || '#05070f', R = rr((o.x | 0) + 77);
  let fr = ''; for (let i = 0; i < 9; i++) { const a = -Math.PI * 0.95 + (i / 8) * Math.PI * 0.9 + (R() - 0.5) * 0.2, L = (70 + R() * 50) * s; fr += `<path d="M0 0 Q${Math.cos(a) * L * 0.5} ${Math.sin(a) * L * 0.5 - 22 * s} ${Math.cos(a) * L} ${Math.sin(a) * L + 22 * s}" stroke="${col}" stroke-width="${5 * s}" fill="none" stroke-linecap="round"/>`; }
  const e = box(c, { left: o.x - 120 * s, top: o.y - h - 70 * s, width: 240 * s, height: h + 70 * s, transformOrigin: '50% 100%' }, `<svg viewBox="${-120 * s} ${-70 * s} ${240 * s} ${h + 70 * s}" width="${240 * s}" height="${h + 70 * s}" style="overflow:visible"><path d="M${-5 * s} ${h} Q${8 * s} ${h * 0.5} 0 0 L${6 * s} 0 Q${16 * s} ${h * 0.5} ${5 * s} ${h}Z" fill="${col}"/>${fr}</svg>`);
  tl.fromTo(e, { rotation: -1.2 }, { rotation: 1.6, duration: 3 + R() * 2, yoyo: true, repeat: Math.max(1, Math.floor((o.D || 30) / 4)), ease: 'sine.inOut' }, o.T || 0);
  return e;
}

// ---- village hut silhouette with a warm window and drifting smoke. o: {x,y,s,lit,T,D}
function hut(c, o) {
  const s = o.s || 1, R = rr((o.x | 0) + 5);
  box(c, { left: o.x - 60 * s, top: o.y - 70 * s, width: 120 * s, height: 70 * s }, `<svg viewBox="0 0 120 70" width="100%" height="100%"><path d="M0 70 V34 L60 2 L120 34 V70Z" fill="#0a0812"/><path d="M-4 38 L60 0 L124 38 L116 40 L60 8 L4 40Z" fill="#14101f"/>${o.lit === false ? '' : '<rect x="46" y="38" width="22" height="26" fill="#ffb347"/><rect x="56" y="38" width="2" height="26" fill="#0a0812"/>'}</svg>`);
  if (o.lit !== false) { glow(c, { x: o.x - 2 * s, y: o.y - 24 * s, r: 70 * s, T: o.T || 0, D: o.D || 30, op: 0.7 }); for (let i = 0; i < 4; i++) { const sm = box(c, { left: o.x + 30 * s, top: o.y - 80 * s, width: 22 * s, height: 22 * s, borderRadius: '50%', background: 'rgba(170,170,190,0.22)', filter: 'blur(5px)', opacity: 0 }); tl.fromTo(sm, { y: 0, x: 0, opacity: 0.35, scale: 0.6 }, { y: -90 * s, x: 24 * s, opacity: 0, scale: 2.2, duration: 5, repeat: Math.max(1, Math.floor((o.D || 30) / 5)), ease: 'sine.out' }, (o.T || 0) + i * 1.25); } }
}
