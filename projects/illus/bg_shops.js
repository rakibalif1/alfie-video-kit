// ===== bg_shops.js : British high street building row (ground line y=470). Global: ukShops(w,{T,D,ground:470}) =====
// All real names come from UK_BRANDS (set window.NO_BRANDS=true for generic names). No Math.random: uses rr(seed).
(function () {
'use strict';
const UK_BRANDS = [   // [key, real name, generic name]
  ['boots', 'BOOTS', 'PHARMACY'],
  ['greggs', 'GREGGS', 'BAKERY'],
  ['hsbc', 'HSBC', 'BANK'],
  ['tesco', 'TESCO', 'SUPERMARKET'],
  ['poundland', 'POUNDLAND', 'DISCOUNT STORE'],
  ['costa', 'COSTA', 'COFFEE'],
];
const BR = (k) => { const e = UK_BRANDS.find((x) => x[0] === k); return window.NO_BRANDS ? e[2] : e[1]; };
const SKINS = ['#f1c9a5', '#d9a077', '#b9784c', '#8d5a3b', '#6b4430', '#f0d0b0'];
const SHIRTS = ['#d9544f', '#4f86c6', '#e6b84a', '#6bb36b', '#8a6bbf', '#e07fa8', '#f08a4b', '#4fb3b3', '#f2f2f2'];
const HAIRS = ['#1d1410', '#2b1d14', '#3b2a1c', '#0f0b09', '#6a4a2a', '#8a8a8a'];
const FONT = 'Arial Black, Arial, sans-serif';

window.ukShops = function ukShops(w, o) {
  o = o || {};
  const T = o.T || 0, D = o.D || 40, G = o.ground || 470;
  const R = rr(4471);
  const pick = (a) => a[Math.floor(R() * a.length)];
  const rep = (d) => Math.ceil(D / d) + 1;
  const root = box(w, { left: 0, top: 0, width: W, height: H });
  const far = box(root, { left: 0, top: 0, width: W, height: H });
  const row = box(root, { left: 0, top: 0, width: W, height: H });
  const front = box(root, { left: 0, top: 0, width: W, height: H });

  // ---------- tween helpers (all looping for the whole D) ----------
  const osc = (el, prop, amp, dur, lo) => { const f = {}, t = {}; f[prop] = lo === undefined ? -amp * R() : lo; t[prop] = amp; t.duration = dur; t.repeat = rep(dur); t.yoyo = true; t.ease = 'sine.inOut'; tl.fromTo(el, f, t, T + R() * 0.3); };
  const osc2 = (el, f, t, dur, ease) => { t.duration = dur; t.repeat = rep(dur); t.yoyo = true; t.ease = ease || 'sine.inOut'; tl.fromTo(el, f, t, T + R() * 0.3); };
  const flick = (el, hi, lo, per) => { const kf = []; let S = 0; for (let i = 0; i < 8; i++) { const d = per * (0.3 + R() * 0.9); kf.push({ opacity: R() < 0.45 ? lo + (hi - lo) * R() * 0.6 : hi, duration: d, ease: 'none' }); S += d; } tl.to(el, { keyframes: kf, repeat: Math.ceil(D / S) + 1 }, T + R() * 0.5); };
  const cycle = (els, per) => { const n = els.length, tot = n * per; els.forEach((el, i) => { const kf = []; if (i > 0) kf.push({ opacity: 0, duration: i * per, ease: 'none' }); kf.push({ opacity: 1, duration: 0.06, ease: 'none' }); kf.push({ opacity: 1, duration: per - 0.12, ease: 'none' }); kf.push({ opacity: 0, duration: 0.06, ease: 'none' }); if (i < n - 1) kf.push({ opacity: 0, duration: (n - 1 - i) * per, ease: 'none' }); el.style.opacity = i === 0 ? 1 : 0; tl.to(el, { keyframes: kf, repeat: Math.ceil(D / tot) + 1 }, T); }); };
  const txt = (p, css, html) => box(p, Object.assign({ fontFamily: FONT, whiteSpace: 'nowrap', textAlign: 'center', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: '1' }, css), html);

  // ---------- tiny people ----------
  function person(p, x, yb, o2) {
    o2 = o2 || {}; const s = o2.s || 2, skin = o2.skin || pick(SKINS), col = o2.col || pick(SHIRTS);
    const g = box(p, { left: x - 4 * s, top: yb - 17 * s, width: 8 * s, height: 17 * s });
    box(g, { left: 1.3 * s, top: 12 * s, width: 2.4 * s, height: 5 * s, background: o2.legs || '#38425a' });
    box(g, { left: 4.3 * s, top: 12 * s, width: 2.4 * s, height: 5 * s, background: o2.legs || '#38425a' });
    const body = box(g, { left: 0.5 * s, top: 5 * s, width: 7 * s, height: 8 * s, background: col, borderRadius: `${2 * s}px ${2 * s}px ${s}px ${s}px` });
    const head = box(g, { left: 1.4 * s, top: 0, width: 5.2 * s, height: 5.4 * s, background: skin, borderRadius: '50%' });
    box(head, { left: -0.2 * s, top: -0.4 * s, width: 5.6 * s, height: 2.8 * s, background: o2.hair || pick(HAIRS), borderRadius: '50% 50% 20% 20%' });
    const arm = box(g, { left: 6.6 * s, top: 5.6 * s, width: 1.9 * s, height: 6 * s, background: `linear-gradient(${col} 72%, ${skin} 72%)`, borderRadius: s, transformOrigin: '50% 8%' });
    return { g, arm, head, body };
  }

  // ---------- upstairs window life ----------
  function upWin(p, x, y, kind, arch) {
    const ww = 22, wh = 31;
    const fr = box(p, { left: x, top: y, width: ww, height: wh, background: '#f6f1e4', borderRadius: arch ? '11px 11px 1px 1px' : 1, boxShadow: '0 0 0 1px rgba(60,40,30,.28)' });
    const gl = box(fr, { left: 2, top: 2, width: ww - 4, height: wh - 4, overflow: 'hidden', borderRadius: arch ? '9px 9px 0 0' : 0, background: '#a9cbe0' });
    const gw = ww - 4, gh = wh - 4;
    if (kind === 0) { // curtains
      gl.style.background = '#e6d9a8'; const c1 = pick(['#c75d5d', '#5d86c7', '#5dab7e', '#d49a3a']);
      const l = box(gl, { left: 0, top: 0, width: gw * 0.42, height: gh, background: c1, transformOrigin: '0 0' });
      box(gl, { left: gw * 0.58, top: 0, width: gw * 0.42, height: gh, background: c1, transformOrigin: '100% 0' });
      osc2(l, { scaleX: 1 }, { scaleX: 0.55 }, 2.5 + R() * 2);
    } else if (kind === 1) { // cat on sill
      gl.style.background = '#f1e2ad'; const col = pick(['#e08a3c', '#444', '#9a9a9a']);
      box(gl, { left: 3, top: gh - 11, width: 11, height: 9, background: col, borderRadius: '50% 50% 20% 20%' });
      const hd = box(gl, { left: 10, top: gh - 17, width: 8, height: 8, background: col, borderRadius: '50%', transformOrigin: '50% 100%' });
      box(hd, { left: 0, top: -3, width: 0, height: 0, borderLeft: '2px solid transparent', borderRight: '2px solid transparent', borderBottom: `4px solid ${col}` });
      box(hd, { left: 4, top: -3, width: 0, height: 0, borderLeft: '2px solid transparent', borderRight: '2px solid transparent', borderBottom: `4px solid ${col}` });
      const tail = box(gl, { left: 1, top: gh - 15, width: 3, height: 12, background: col, borderRadius: 3, transformOrigin: '50% 100%' });
      osc(tail, 'rotation', 28, 0.9 + R() * 0.7); osc(hd, 'rotation', 10, 2 + R() * 2);
    } else if (kind === 2) { // person waving
      gl.style.background = '#f3e3a3'; const pp = person(gl, gw / 2 - 1, gh + 7, { s: 1.4 });
      osc(pp.arm, 'rotation', 60, 0.35 + R() * 0.2, -120 + 0); pp.arm.style.left = '2px'; pp.arm.style.transformOrigin = '50% 10%'; tl.set(pp.arm, { rotation: 150 }, 0);
      osc2(pp.arm, { rotation: 130 }, { rotation: 200 }, 0.32 + R() * 0.15);
      osc(pp.g, 'y', 1.2, 1.4);
    } else if (kind === 3) { // plant
      gl.style.background = '#d4e6ee'; box(gl, { left: 4, top: gh - 8, width: 10, height: 8, background: '#c7683e', borderRadius: '1px 1px 4px 4px' });
      const lv = box(gl, { left: 0, top: 0, width: gw, height: gh - 6, transformOrigin: '50% 100%' });
      for (let i = 0; i < 4; i++) box(lv, { left: 3 + i * 3, top: 4 + (i % 2) * 4, width: 5, height: 11, background: pick(['#4e9a52', '#66b25d', '#3d8a49']), borderRadius: '50%', transform: `rotate(${(i - 1.5) * 24}deg)` });
      osc(lv, 'rotation', 5, 2 + R() * 1.5);
    } else if (kind === 4) { // TV glow
      gl.style.background = '#6f8ec4'; box(gl, { left: 3, top: gh - 11, width: 8, height: 11, background: '#2b2f45', borderRadius: '4px 4px 0 0' }); box(gl, { left: 4, top: gh - 15, width: 6, height: 6, background: '#2b2f45', borderRadius: '50%' });
      const gv = box(gl, { left: 0, top: 0, width: gw, height: gh, background: 'radial-gradient(circle at 70% 40%, rgba(255,255,255,.7), rgba(120,170,255,.2) 70%)' });
      const kf = [], cols = ['#6f8ec4', '#c79ad8', '#7fc7b8', '#e0b36a']; let S = 0; for (let i = 0; i < 5; i++) { const d = 0.5 + R() * 0.9; kf.push({ backgroundColor: pick(cols), duration: d, ease: 'none' }); S += d; }
      tl.to(gl, { keyframes: kf, repeat: Math.ceil(D / S) + 1 }, T); flick(gv, 1, 0.3, 0.3);
    } else if (kind === 5) { // lamp lit
      gl.style.background = '#ffe08a'; const gv = box(gl, { left: 0, top: 0, width: gw, height: gh, background: 'radial-gradient(circle at 50% 35%, #fff6c8, rgba(255,200,90,0) 80%)' });
      box(gl, { left: 5, top: 12, width: 8, height: 5, background: '#d96f4f', borderRadius: '4px 4px 0 0' }); box(gl, { left: 8, top: 17, width: 2, height: 8, background: '#6b5b4a' }); flick(gv, 1, 0.55, 0.5);
    } else if (kind === 6) { // blinds
      gl.style.background = '#cfe0e8'; const bl = box(gl, { left: 0, top: 0, width: gw, height: gh * 0.8, background: 'repeating-linear-gradient(0deg,#efe8d0 0 2px,#d3c9a8 2px 3px)', transformOrigin: '50% 0' });
      osc2(bl, { scaleY: 0.35 }, { scaleY: 1 }, 3 + R() * 3);
    } else { // mug person with steam
      gl.style.background = '#f4e8c8'; const pp = person(gl, gw / 2, gh + 7, { s: 1.4 });
      const st = box(gl, { left: gw - 7, top: gh - 15, width: 2, height: 8, background: 'rgba(255,255,255,.85)', borderRadius: 2, opacity: 0.8 });
      box(gl, { left: gw - 8, top: gh - 8, width: 5, height: 5, background: '#d96f4f', borderRadius: '0 0 2px 2px' });
      tl.fromTo(st, { y: 3, opacity: 0.9 }, { y: -6, opacity: 0, duration: 1.6, repeat: rep(1.6), ease: 'sine.out' }, T + R());
      osc(pp.head, 'y', 1, 2.2);
    }
    box(p, { left: x - 2, top: y + wh, width: ww + 4, height: 3, background: '#e6dcc3', boxShadow: '0 1px 1px rgba(0,0,0,.2)' });
    if (R() < 0.28) { const fb = box(p, { left: x - 1, top: y + wh + 3, width: ww + 2, height: 5, background: '#8a5a3a' }); for (let i = 0; i < 6; i++) box(fb, { left: 1 + i * 3.4, top: -3 - (i % 2) * 2, width: 4, height: 4, borderRadius: '50%', background: pick(['#e9577a', '#f5c43c', '#fff', '#b46be0']) }); }
  }

  // ---------- facade textures ----------
  const brickBg = (c, k) => `repeating-linear-gradient(0deg, rgba(90,45,30,${k}) 0 1px, transparent 1px 6px), repeating-linear-gradient(90deg, rgba(90,45,30,${k * 0.6}) 0 1px, transparent 1px 13px), linear-gradient(90deg, rgba(255,255,255,.12), rgba(0,0,0,.07)), ${c}`;
  const renderBg = (c) => `repeating-linear-gradient(0deg, rgba(0,0,0,.035) 0 2px, transparent 2px 5px), radial-gradient(ellipse at 30% 20%, rgba(255,255,255,.28), transparent 60%), linear-gradient(180deg, rgba(255,255,255,.12), rgba(0,0,0,.07)), ${c}`;

  // ---------- fascia text fit ----------
  function fascia(p, x, y, wd, ht, text, bg, fg, serif) {
    const f = box(p, { left: x, top: y, width: wd, height: ht, background: bg, boxShadow: 'inset 0 -2px 0 rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.35)', overflow: 'hidden' });
    const cw = serif ? 0.58 : 0.66; let lines = [text], fs = Math.min(15, (wd - 8) / (text.length * cw), ht - 7);
    if (fs < 10.5 && text.indexOf(' ') > 0) {
      let best = -1, bd = 99; for (let i = 0; i < text.length; i++) if (text[i] === ' ' && Math.abs(i - text.length / 2) < bd) { bd = Math.abs(i - text.length / 2); best = i; }
      lines = [text.slice(0, best), text.slice(best + 1)]; const m = Math.max(lines[0].length, lines[1].length);
      fs = Math.min(13, (wd - 6) / (m * 0.6), (ht - 3) / 2.15);
    }
    fs = Math.max(8.5, fs);
    const t = txt(f, { left: 0, top: 0, width: wd, height: ht, color: fg, fontSize: fs, flexDirection: 'column', fontFamily: serif ? 'Georgia, serif' : (lines.length > 1 || fs < 10.5 ? 'Arial, sans-serif' : FONT), fontWeight: 'bold', letterSpacing: '0.2px', textShadow: '0 1px 0 rgba(0,0,0,.25)' }, lines.map((l) => `<div>${l}</div>`).join(''));
    return { f, t };
  }

  // ---------- shop interiors (inside window container p, size iw x ih; top 15px is hidden by the awning) ----------
  const shelf = (p, x0, x1, y, cols, hh) => { for (let x = x0; x < x1 - 5; x += 6) { const h = hh * (0.6 + R() * 0.5); box(p, { left: x, top: y - h, width: 5, height: h, background: pick(cols), borderRadius: 1 }); } box(p, { left: x0 - 1, top: y, width: x1 - x0 + 2, height: 2, background: '#8a7766' }); };
  const counter = (p, x, wd, ih, col, hh) => box(p, { left: x, top: ih - hh, width: wd, height: hh, background: col, borderTop: '2px solid rgba(255,255,255,.6)', zIndex: 3 });
  function worker(p, x, ih, o2) { const pp = person(p, x, ih - 6, o2); osc(pp.arm, 'rotation', 25, 0.7 + R() * 0.6); osc(pp.g, 'y', 1.2, 1.1 + R()); return pp; }
  function queue(p, x, ih, n, dir) { for (let i = 0; i < n; i++) { const pp = person(p, x + dir * i * 15, ih - 3, {}); osc(pp.g, 'x', 2.2, 1.6 + R() * 1.4); osc(pp.head, 'rotation', 8, 1.8 + R()); } }

  function interior(p, kind, iw, ih) {
    const pastel = ['#f4a6b8', '#a6d8f4', '#b9f0c4', '#fff', '#f9e29a', '#cbb6f0'];
    const warm = ['#e86b5d', '#f2c14e', '#5aa9e6', '#7bc47f', '#b58be0', '#f28c52', '#fff'];
    if (kind === 'pharm') { shelf(p, 3, iw - 3, 30, pastel, 9); shelf(p, 3, iw - 3, 46, pastel, 9); const cr = box(p, { left: 3, top: 20, width: 4, height: 12, background: '#4fd18b' }); box(p, { left: -1, top: 24, width: 12, height: 4, background: '#4fd18b' }); flick(cr, 1, 0.3, 0.4); counter(p, iw - 30, 28, ih, '#9ac8b8', 14); worker(p, iw - 14, ih - 10, {}); queue(p, iw - 44, ih, 1, -1); }
    else if (kind === 'news') { for (let r = 0; r < 2; r++) for (let i = 0; i < Math.floor((iw - 28) / 11); i++) box(p, { left: 4 + i * 11, top: 24 + r * 17, width: 9, height: 14, background: pick(warm), transform: `rotate(${(R() - 0.5) * 8}deg)` }); box(p, { left: iw - 22, top: 22, width: 18, height: 14, background: '#f8d34a' }); txt(p, { left: iw - 22, top: 22, width: 18, height: 14, fontSize: 6, color: '#a03030' }, 'LOTTO'); counter(p, iw - 34, 30, ih, '#b99870', 14); worker(p, iw - 18, ih - 10, {}); queue(p, 14, ih, 1, 1); }
    else if (kind === 'bakery') { shelf(p, 3, iw - 3, 30, ['#d9a35f', '#f2d49b', '#c27c40'], 8); counter(p, 3, iw - 6, ih, '#f5e6c8', 16); for (let i = 0; i < Math.floor((iw - 14) / 9); i++) box(p, { left: 6 + i * 9, top: ih - 22, width: 7, height: 6, borderRadius: '50% 50% 0 0', background: pick(['#d9a35f', '#e9b97a', '#b9783f', '#f1a6b4']), zIndex: 4 }); const bk = worker(p, iw / 2, ih - 14, { col: '#fff' }); queue(p, 10, ih + 8, 2, 1); }
    else if (kind === 'bank') { box(p, { left: 0, top: 0, width: iw, height: ih, background: 'linear-gradient(#f2f6fb,#dfe7f0)' }); box(p, { left: 6, top: 20, width: 14, height: 14, borderRadius: '50%', background: '#fff', border: '2px solid #678' }); const hh = box(p, { left: 12, top: 26, width: 1.5, height: 6, background: '#345', transformOrigin: '50% 100%' }); tl.fromTo(hh, { rotation: 0 }, { rotation: 360, duration: 12, repeat: rep(12), ease: 'none' }, T); counter(p, 28, iw - 32, ih, '#9fb1c6', 13); worker(p, 42, ih - 9, {}); worker(p, iw - 16, ih - 9, {}); queue(p, 20, ih + 5, 1, 1); }
    else if (kind === 'pub') { box(p, { left: 0, top: 0, width: iw, height: ih, background: 'linear-gradient(#d8b98c,#bd9467)' }); for (let i = 0; i < 10; i++) box(p, { left: 4 + i * 8, top: 22, width: 4, height: 8, background: pick(['#6aa86a', '#b57a3a', '#d9c06a']), borderRadius: 1 }); counter(p, 3, iw - 6, ih, '#6e4a2c', 14); for (let i = 0; i < 3; i++) box(p, { left: 12 + i * 10, top: ih - 22, width: 3, height: 8, background: '#d6d6d6', zIndex: 4 }); for (let i = 0; i < 3; i++) { const pp = person(p, 14 + i * 24, ih - 6, { s: 1.9 }); osc2(pp.arm, { rotation: 0 }, { rotation: -70 }, 1.6 + R() * 1.2); osc(pp.g, 'y', 1, 1.2 + R()); } }
    else if (kind === 'super') { for (let a = 0; a < 3; a++) { shelf(p, 4 + a * Math.floor(iw / 3.4), 4 + a * Math.floor(iw / 3.4) + 30, 30, warm, 9); shelf(p, 4 + a * Math.floor(iw / 3.4), 4 + a * Math.floor(iw / 3.4) + 30, 46, warm, 9); } const stk = person(p, iw - 56, ih - 8, { s: 1.8, col: '#6bb36b' }); osc2(stk.arm, { rotation: 20 }, { rotation: 150 }, 0.9); for (let i = 0; i < 2; i++) { box(p, { left: iw - 38 + i * 18, top: ih - 22, width: 14, height: 22, background: '#cfd6dd', zIndex: 3 }); worker(p, iw - 31 + i * 18, ih - 16, {}); } queue(p, iw - 62, ih + 8, 1, -1); }
    else if (kind === 'butcher') { box(p, { left: 0, top: 0, width: iw, height: ih, background: 'repeating-linear-gradient(90deg,#f7ece8 0 8px,#ecdad4 8px 9px)' }); for (let i = 0; i < 4; i++) { const h = box(p, { left: 8 + i * Math.floor((iw - 16) / 4), top: 14, width: 4, height: 22, background: i % 2 ? '#c24b45' : '#e58f86', borderRadius: '2px 2px 5px 5px', transformOrigin: '50% 0' }); osc(h, 'rotation', 7, 1.6 + R()); } const bt = box(p, { left: 3, top: 20, width: 20, height: 7, background: '#2e8b57', borderRadius: 2 }); txt(p, { left: 3, top: 20, width: 20, height: 7, fontSize: 5.5, color: '#fff', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }, 'HALAL'); counter(p, 3, iw - 6, ih, '#f3f3f3', 14); const b = worker(p, iw - 20, ih - 10, { col: '#fff' }); }
    else if (kind === 'afro') { shelf(p, 3, iw - 3, 30, ['#f2c14e', '#7bc47f', '#e07a3a', '#c9a15a'], 10); shelf(p, 3, iw - 3, 46, ['#e8d24a', '#4f9a52', '#d9552f', '#f2f2f2'], 9); for (let i = 0; i < 3; i++) { const cl = box(p, { left: 6 + i * 20, top: 12, width: 14, height: 14, background: pick(['#e0872e', '#2e9a8b', '#c04a7a', '#e6c42e']), transformOrigin: '50% 0' }); osc(cl, 'skewX', 7, 1.6 + R()); } counter(p, 3, 30, ih, '#9a6a3a', 14); worker(p, 20, ih - 10, { skin: '#6b4430' }); queue(p, iw - 20, ih, 1, -1); }
    else if (kind === 'sari') { box(p, { left: 0, top: 0, width: iw, height: ih, background: '#f6e3ee' }); for (let i = 0; i < Math.floor(iw / 12); i++) { const s = box(p, { left: 3 + i * 12, top: 10, width: 10, height: 56, background: `linear-gradient(180deg, ${pick(['#d9366b', '#e8a317', '#2a9d8f', '#6d3fb8', '#e55d2b'])} 0 70%, ${pick(['#f6d35a', '#fff'])} 70% 78%, ${pick(['#d9366b', '#2a9d8f'])} 78%)`, transformOrigin: '50% 0' }); osc(s, 'skewX', 5, 1.8 + R() * 1.2); } counter(p, 3, iw - 6, ih, '#e8cfa0', 8); }
    else if (kind === 'discount') { shelf(p, 3, iw - 3, 30, warm, 9); shelf(p, 3, iw - 3, 46, warm, 9); for (let i = 0; i < 5; i++) txt(p, { left: 6 + i * 13, top: 33 + (i % 2) * 8, width: 10, height: 9, borderRadius: '50%', background: '#ffe03a', color: '#a02020', fontSize: 5.5 }, '£1'); counter(p, iw - 28, 26, ih, '#b8a55a', 14); worker(p, iw - 14, ih - 10, {}); queue(p, 14, ih, 2, 1); }
    else if (kind === 'chippy') { box(p, { left: 0, top: 0, width: iw, height: ih, background: 'linear-gradient(#f8e9bf,#efd89a)' }); counter(p, 3, iw - 6, ih, '#d9d9d9', 16); const st = box(p, { left: 8, top: ih - 34, width: 5, height: 12, background: 'rgba(255,255,255,.9)', borderRadius: 3, zIndex: 4 }); tl.fromTo(st, { y: 4, opacity: 0.9 }, { y: -10, opacity: 0, duration: 1.5, repeat: rep(1.5), ease: 'sine.out' }, T); const sv = worker(p, iw - 16, ih - 12, { col: '#fff' }); queue(p, 14, ih + 8, 2, 1); }
    else if (kind === 'kebab') { box(p, { left: 0, top: 0, width: iw, height: ih, background: '#e8d2b0' }); const sp = box(p, { left: 8, top: 20, width: 14, height: 34, background: 'repeating-linear-gradient(0deg,#a65a2e 0 3px,#c9854e 3px 6px)', borderRadius: '30% 30% 45% 45%', boxShadow: '0 0 5px rgba(255,150,40,.5)' }); tl.fromTo(sp, { backgroundPosition: '0px 0px' }, { backgroundPosition: '0px 36px', duration: 2.4, repeat: rep(2.4), ease: 'none' }, T); box(p, { left: 14, top: 14, width: 2, height: 46, background: '#aaa' }); counter(p, 3, iw - 6, ih, '#c9c9c9', 12); const ch = worker(p, 38, ih - 8, { col: '#fff' }); osc2(ch.arm, { rotation: 10 }, { rotation: 70 }, 0.5); queue(p, iw - 14, ih + 6, 2, -1); }
    else if (kind === 'launder') { box(p, { left: 0, top: 0, width: iw, height: ih, background: '#e3f0f6' }); const n = Math.floor((iw - 6) / 21); for (let i = 0; i < n; i++) { box(p, { left: 3 + i * 21, top: 26, width: 19, height: 36, background: '#f4f6f8', borderRadius: 2, boxShadow: 'inset 0 0 0 1px #b6c2cc' }); const dr = box(p, { left: 5 + i * 21, top: 34, width: 15, height: 15, borderRadius: '50%', background: `conic-gradient(${pick(['#e55', '#58c', '#5b7'])} 0 25%, #fff 25% 50%, ${pick(['#fc4', '#a6d'])} 50% 75%, #fff 75%)`, boxShadow: '0 0 0 2px #9ab' }); tl.fromTo(dr, { rotation: 0 }, { rotation: i % 2 ? -360 : 360, duration: 1.3 + i * 0.25, repeat: rep(1.3 + i * 0.25), ease: 'none' }, T); } const fd = person(p, iw - 12, ih - 3, { s: 1.9 }); osc2(fd.arm, { rotation: 0 }, { rotation: 60 }, 0.8); }
    else if (kind === 'money') { box(p, { left: 0, top: 0, width: iw, height: ih, background: '#e9f4e8' }); const tk = box(p, { left: 4, top: 20, width: iw - 8, height: 13, background: '#10241a', borderRadius: 2 }); const rates = ['£1 = 140 BDT', '£1 = 108 INR', '£1 = 360 PKR', '£1 = 2100 NGN', '£1 = 17 GHS']; const els = rates.map((r) => txt(tk, { left: 0, top: 0, width: iw - 8, height: 13, fontSize: 7.5, color: '#4dff88', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }, r)); cycle(els, 1.8); counter(p, 3, iw - 6, ih, '#9ab7a2', 13); worker(p, iw / 2, ih - 9, {}); queue(p, 12, ih + 4, 1, 1); }
    else if (kind === 'coffee') { box(p, { left: 0, top: 0, width: iw, height: ih, background: 'linear-gradient(#e6cfa8,#cfae7e)' }); for (let i = 0; i < 4; i++) box(p, { left: 6 + i * 12, top: 24, width: 8, height: 9, background: '#fff', borderRadius: '1px 1px 4px 4px', boxShadow: '0 0 0 1px #b99' }); counter(p, 3, iw - 6, ih, '#6e4a2c', 15); const b = worker(p, iw - 18, ih - 10, { col: '#b8453a' }); const st = box(p, { left: iw - 38, top: ih - 34, width: 4, height: 11, background: 'rgba(255,255,255,.9)', borderRadius: 3, zIndex: 4 }); tl.fromTo(st, { y: 3, opacity: 0.9 }, { y: -9, opacity: 0, duration: 1.4, repeat: rep(1.4), ease: 'sine.out' }, T); queue(p, 14, ih + 8, 2, 1); }
  }

  // ---------- one shopfront. b = building wrapper, sx/sw = x and width inside the building, sy = shop zone top ----------
  const POSTERS = [['£1', '#ffe03a', '#a02020'], ['SALE', '#e55d5d', '#fff'], ['2 FOR 1', '#4f86c6', '#fff'], ['NEW', '#7bc47f', '#124'], ['HOT', '#f28c52', '#fff'], ['FRESH', '#9ad07a', '#124']];
  function shop(b, sx, sw, sy, sp) {
    const door = sp.door === 'l' ? 'l' : 'r';
    box(b, { left: sx, top: sy, width: sw, height: 112, background: sp.wall || '#8a7a70' });
    box(b, { left: sx, top: sy, width: 3, height: 112, background: 'rgba(255,255,255,.35)' });
    const fs = fascia(b, sx + 2, sy, sw - 4, 27, sp.name, sp.fas[0], sp.fas[1], sp.serif);
    if (sp.neon) flick(fs.t, 1, 0.45, 0.35);
    const dw = 19, ww = sw - 8 - dw - 3, wx = sx + 4 + (door === 'l' ? dw + 3 : 0), wy = sy + 29, wh = 76;
    const win = box(b, { left: wx, top: wy, width: ww, height: wh, overflow: 'hidden', background: sp.bg || '#f6ead0', boxShadow: '0 0 0 2px rgba(255,255,255,.55), 0 0 0 3px rgba(60,40,30,.3)' });
    interior(win, sp.kind, ww, wh);
    // glass shine sweep
    const sh = box(win, { left: -30, top: 0, width: 16, height: wh, background: 'linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.35),rgba(255,255,255,0))', transform: 'skewX(-18deg)', zIndex: 6 });
    tl.fromTo(sh, { x: 0 }, { x: ww + 50, duration: 3.5 + R() * 2, repeat: rep(3.5), repeatDelay: 3 + R() * 4, ease: 'sine.inOut' }, T + R() * 4);
    // posters
    for (let i = 0; i < 2; i++) { const ps = pick(POSTERS); const pst = txt(win, { left: 3 + R() * (ww - 26), top: 16 + R() * 8, width: 20, height: 11, background: ps[1], color: ps[2], fontSize: 6.5, transform: `rotate(${(R() - 0.5) * 14}deg)`, zIndex: 7, boxShadow: '0 1px 1px rgba(0,0,0,.3)' }, ps[0]); }
    if (sp.extra) sp.extra(win, ww, wh);
    // stall riser
    box(b, { left: wx - 2, top: wy + wh, width: ww + 4, height: sy + 112 - (wy + wh), background: sp.riser || '#6d5d57' });
    // door
    const dx = sx + 4 + (door === 'l' ? 0 : ww + 3);
    const dr = box(b, { left: dx, top: wy, width: dw, height: sy + 112 - wy, background: sp.doorc || '#4a5a6a', boxShadow: '0 0 0 1px rgba(255,255,255,.4)' });
    box(dr, { left: 2, top: 3, width: dw - 4, height: 52, background: 'linear-gradient(135deg,#e8f2f8,#bcd4e2)' });
    box(dr, { left: door === 'l' ? dw - 5 : 3, top: 34, width: 2, height: 10, background: '#e3c15a' });
    const hang = box(dr, { left: dw / 2 - 7, top: 14, width: 14, height: 8, transformOrigin: '50% 0' });
    const closed = !!sp.closed; txt(hang, { left: 0, top: 0, width: 14, height: 8, background: closed ? '#d94a4a' : '#3aa55a', color: '#fff', fontSize: 5, fontFamily: 'Arial, sans-serif', fontWeight: 'bold', borderRadius: 1 }, closed ? 'SHUT' : 'OPEN');
    osc(hang, 'rotation', 7, 1.7 + R());
    // awning
    const aw = box(b, { left: sx - 1, top: sy + 27, width: sw + 2, height: 22, transformOrigin: '50% 0', zIndex: 5 });
    const [c1, c2] = sp.awn;
    box(aw, { left: 0, top: 0, width: sw + 2, height: 13, background: `repeating-linear-gradient(90deg, ${c1} 0 9px, ${c2} 9px 18px)`, boxShadow: '0 2px 3px rgba(0,0,0,.25)' });
    box(aw, { left: 0, top: 13, width: sw + 2, height: 7, background: `radial-gradient(circle at 4.5px 0, ${c1} 4.6px, transparent 5px) 0 0/18px 7px repeat-x, radial-gradient(circle at 13.5px 0, ${c2} 4.6px, transparent 5px) 0 0/18px 7px repeat-x` });
    osc(aw, 'skewX', 1.4, 2.2 + R() * 1.5);
    if (sp.basket) { const bk = box(b, { left: sx + sw - 14, top: sy + 22, width: 12, height: 12, transformOrigin: '50% -8px', zIndex: 6 }); box(bk, { left: 0, top: 5, width: 12, height: 7, background: '#6b4a2a', borderRadius: '1px 1px 6px 6px' }); for (let i = 0; i < 5; i++) box(bk, { left: i * 2.4, top: 1 + (i % 2) * 2, width: 3.5, height: 3.5, borderRadius: '50%', background: pick(['#e9577a', '#f5c43c', '#fff', '#b46be0']) }); box(bk, { left: 5.5, top: -8, width: 1, height: 8, background: '#333' }); osc(bk, 'rotation', 6, 2 + R()); }
    // A-board
    if (sp.aboard) { const ab = box(b, { left: sx + (door === 'l' ? sw - 22 : 6), top: sy + 112 - 22, width: 17, height: 22, background: '#2b3a34', border: '1px solid #cdb', transform: `rotate(${(R() - 0.5) * 6}deg)`, zIndex: 8 }); txt(ab, { left: 0, top: 0, width: 17, height: 22, color: '#fff', fontSize: 5.2, fontFamily: 'Arial, sans-serif', fontWeight: 'bold', whiteSpace: 'normal', lineHeight: '1.05' }, sp.aboard); }
  }

  // ---------- upper floors + roof of one building ----------
  function building(sp) {
    const h = G - sp.top, upper = h - 112, b = box(row, { left: sp.x, top: sp.top, width: sp.w, height: h });
    const bg = sp.style === 'brick' ? brickBg(sp.col, 0.2) : renderBg(sp.col);
    const body = box(b, { left: 0, top: 0, width: sp.w, height: h, background: bg, boxShadow: 'inset 1px 0 0 rgba(70,40,30,.35), inset -1px 0 0 rgba(70,40,30,.35)' });
    if (sp.style === 'glass') return glassBldg(sp, b, h, upper);
    // cornice + parapet
    box(b, { left: -2, top: 0, width: sp.w + 4, height: 6, background: '#efe6d2', boxShadow: '0 2px 2px rgba(0,0,0,.18)' });
    box(b, { left: -2, top: 6, width: sp.w + 4, height: 2, background: 'rgba(60,40,30,.25)' });
    // chimneys
    (sp.chim || []).forEach((cx) => {
      const ch = box(b, { left: cx, top: -26, width: 15, height: 27, background: brickBg('#c28b73', 0.28), boxShadow: 'inset 0 0 0 1px rgba(70,40,30,.3)' });
      box(ch, { left: -2, top: -3, width: 19, height: 4, background: '#eee3cc' });
      box(b, { left: cx + 2, top: -33, width: 4, height: 8, background: '#c9663a' }); box(b, { left: cx + 9, top: -31, width: 4, height: 6, background: '#d37444' });
      for (let k = 0; k < 3; k++) { const sm = box(b, { left: cx + 2, top: -40, width: 11, height: 11, borderRadius: '50%', background: 'rgba(235,235,240,.8)', opacity: 0, filter: 'blur(1.5px)' }); tl.fromTo(sm, { x: 0, y: 0, scale: 0.5, opacity: 0.7 }, { x: 22 + R() * 14, y: -55 - R() * 12, scale: 2.1, opacity: 0, duration: 4, repeat: rep(4), ease: 'sine.out', immediateRender: false }, T + k * 1.33 + R() * 0.3); }
    });
    // roof extras
    if (sp.dish) { const dd = box(b, { left: sp.dish, top: 78, width: 10, height: 8, background: '#f0f0f0', borderRadius: '50% 50% 50% 50%', transform: 'rotate(-25deg)', boxShadow: '0 0 0 1px #999' }); box(b, { left: sp.dish + 4, top: 81, width: 1.5, height: 5, background: '#666' }); }
    if (sp.cat) { const c = sp.cat, ct = box(b, { left: c, top: -12, width: 16, height: 12 }); box(ct, { left: 0, top: 4, width: 11, height: 8, background: '#e08a3c', borderRadius: '50% 50% 20% 20%' }); box(ct, { left: 8, top: 0, width: 7, height: 7, background: '#e08a3c', borderRadius: '50%' }); const tt = box(ct, { left: -3, top: 2, width: 3, height: 11, background: '#e08a3c', borderRadius: 3, transformOrigin: '50% 100%' }); osc(tt, 'rotation', 30, 0.8); osc(ct, 'x', 6, 6 + R() * 3); }
    if (sp.flag) { const fp = box(b, { left: sp.flag, top: -34, width: 2, height: 36, background: '#777' }); const fl = box(b, { left: sp.flag + 2, top: -34, width: 28, height: 17, transformOrigin: '0 50%' }); fl.innerHTML = sp.flagSvg || ukFlag(); osc2(fl, { scaleX: 1, skewY: -3 }, { scaleX: 0.82, skewY: 4 }, 0.7 + R() * 0.3); }
    if (sp.drain) box(b, { left: sp.w - 5, top: 8, width: 3, height: upper - 6, background: 'linear-gradient(90deg,#4c4c52,#8a8a90)' });
    // floors
    if (sp.band) { const bd = txt(b, { left: 4, top: 9, width: sp.w - 8, height: upper - 8, background: 'linear-gradient(#f4f1e2,#e2decb)', color: '#1f6b64', fontSize: 22, letterSpacing: '2px', boxShadow: 'inset 0 0 0 2px #2f9c8f' }, BR('tesco')); box(b, { left: 4, top: upper - 1, width: sp.w - 8, height: 3, background: '#e07a3a' }); }
    const nf = sp.floors || Math.max(1, Math.round(upper / 50)), fh = upper / nf;
    const cols = Math.max(1, Math.round((sp.w - 8) / 38)), sp2 = sp.w / cols;
    for (let f = 0; f < (sp.band ? 0 : nf); f++) {
      if (f > 0) box(b, { left: 0, top: 8 + f * fh - 2, width: sp.w, height: 3, background: 'rgba(240,230,205,.8)' });
      for (let c = 0; c < cols; c++) {
        const k = Math.floor(R() * 8), arch = sp.style === 'brick' && R() < 0.5;
        if (sp.tudor) { const wx = c * sp2 + (sp2 - 22) / 2, wy = 8 + f * fh + (fh - 31) / 2; upWin(b, wx, wy, k, false); }
        else upWin(b, c * sp2 + (sp2 - 22) / 2, 8 + f * fh + (fh - 31) / 2 + 2, k, arch);
      }
    }
    if (sp.tudor) { // timber frame
      for (let f = 0; f <= nf; f++) box(b, { left: 0, top: 8 + f * fh - 1, width: sp.w, height: 3, background: '#6d5040' });
      for (let c = 0; c <= cols; c++) box(b, { left: c * sp2 - 1.5, top: 8, width: 3, height: upper, background: '#6d5040' });
      for (let f = 0; f < nf; f++) for (let c = 0; c < cols; c++) box(b, { left: c * sp2 + 2, top: 8 + f * fh + 2, width: 2, height: fh - 4, background: '#6d5040', transform: `rotate(${f % 2 ? 24 : -24}deg)`, opacity: 0.5 });
    }
    if (sp.toLet) { const tl2 = box(b, { left: sp.toLet, top: 8 + fh + 4, width: 22, height: 13, transformOrigin: '50% 0', zIndex: 4 }); txt(tl2, { left: 0, top: 0, width: 22, height: 13, background: '#fff', color: '#c33', fontSize: 6.5, border: '1px solid #c33' }, 'TO LET'); osc(tl2, 'rotation', 9, 1.9 + R()); }
    sp.shops.forEach((s) => { if (s.k === 'atm' || s.k === 'wall') return; shop(b, s.x, s.w, h - 112, s); });
    return b;
  }

  function ukFlag() {
    return '<svg viewBox="0 0 28 17" width="28" height="17"><rect width="28" height="17" fill="#2a4a8a"/><path d="M0 0L28 17M28 0L0 17" stroke="#fff" stroke-width="3.6"/><path d="M0 0L28 17M28 0L0 17" stroke="#c8333b" stroke-width="1.4"/><path d="M14 0V17M0 8.5H28" stroke="#fff" stroke-width="5.4"/><path d="M14 0V17M0 8.5H28" stroke="#c8333b" stroke-width="3"/></svg>';
  }
  function gFlag() { return '<svg viewBox="0 0 28 17" width="28" height="17"><rect width="28" height="17" fill="#fff" stroke="#bbb"/><path d="M14 0V17M0 8.5H28" stroke="#c8333b" stroke-width="4"/></svg>'; }

  // ---------- modern glass block ----------
  function glassBldg(sp, b, h, upper) {
    const sw = sp.w;
    box(b, { left: 0, top: 0, width: sw, height: h, background: 'linear-gradient(135deg,#bcdcea 0%,#8fbbd2 55%,#a9cfe0 100%)', boxShadow: 'inset 0 0 0 2px #dfe9ef' });
    box(b, { left: -2, top: -4, width: sw + 4, height: 6, background: '#cfd6db' });
    // roof plant, aerial, window-cleaning cradle
    box(b, { left: 12, top: -14, width: 34, height: 12, background: 'repeating-linear-gradient(90deg,#8d969c 0 3px,#a7b0b5 3px 6px)' });
    const fan = box(b, { left: 60, top: -12, width: 14, height: 10, background: '#9aa4aa', borderRadius: '50% 50% 0 0' }); box(fan, { left: 3, top: 2, width: 8, height: 2, background: '#556', transformOrigin: '50% 50%' }); osc(fan.firstChild, 'rotation', 180, 0.5);
    box(b, { left: 96, top: -30, width: 1.5, height: 30, background: '#667' }); const bl = box(b, { left: 94, top: -33, width: 5, height: 5, borderRadius: '50%', background: '#f55' }); flick(bl, 1, 0.1, 0.5);
    const cols = 5, nf = Math.round(upper / 40), fh = upper / nf, cw = sw / cols;
    for (let f = 0; f < nf; f++) for (let c = 0; c < cols; c++) {
      const cx = c * cw + 3, cy = 8 + f * fh + 3, cell = box(b, { left: cx, top: cy, width: cw - 6, height: fh - 7, overflow: 'hidden', background: R() < 0.25 ? 'linear-gradient(#fff3c4,#f6dc8b)' : 'linear-gradient(180deg,#d6ecf6,#9cc4d8)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.6)' });
      if (R() < 0.36) { const pp = person(cell, 7 + R() * (cw - 20), fh - 6, { s: 1.5 }); osc(pp.head, 'y', 1.2, 1 + R()); osc2(pp.arm, { rotation: -10 }, { rotation: 40 }, 0.4 + R() * 0.3); } else if (R() < 0.3) { const lt = box(cell, { left: 0, top: 0, width: cw - 6, height: fh - 7, background: 'rgba(255,240,170,.6)' }); flick(lt, 1, 0.3, 0.7); }
    }
    const sheen = box(b, { left: 0, top: 0, width: sw, height: h - 112, overflow: 'hidden', pointerEvents: 'none' }); const sb = box(sheen, { left: -60, top: -10, width: 30, height: h, background: 'linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.55),rgba(255,255,255,0))', transform: 'skewX(-20deg)' });
    tl.fromTo(sb, { x: 0 }, { x: sw + 120, duration: 4, repeat: rep(4), repeatDelay: 2.5, ease: 'sine.inOut' }, T + 1);
    // cleaner's cradle
    const cr = box(b, { left: sw - 34, top: 10, width: 24, height: 12, zIndex: 3 }); box(cr, { left: 3, top: -10, width: 1, height: 10, background: '#333' }); box(cr, { left: 20, top: -10, width: 1, height: 10, background: '#333' }); box(cr, { left: 0, top: 8, width: 24, height: 4, background: '#e0a020' }); const cp = person(cr, 12, 9, { s: 1.1, col: '#f08a4b' }); osc2(cp.arm, { rotation: 0 }, { rotation: 70 }, 0.6);
    osc2(cr, { y: 0 }, { y: upper - 60 }, 9 + R() * 3);
    // sign and bank ground floor
    const gy = h - 112;
    box(b, { left: 0, top: gy, width: sw, height: 112, background: '#8b9aa6' });
    const bk = sp.shops[0], bw = bk.w;
    const fs = fascia(b, 2, gy, bw - 2, 27, bk.name, bk.fas[0], bk.fas[1]);
    const win = box(b, { left: 5, top: gy + 29, width: bw - 8 - 22, height: 76, overflow: 'hidden', background: '#e8eef5', boxShadow: '0 0 0 2px rgba(255,255,255,.6)' }); interior(win, 'bank', bw - 8 - 22, 76);
    const sh = box(win, { left: -30, top: 0, width: 16, height: 76, background: 'linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.35),rgba(255,255,255,0))', transform: 'skewX(-18deg)', zIndex: 6 }); tl.fromTo(sh, { x: 0 }, { x: bw + 20, duration: 4, repeat: rep(4), repeatDelay: 4, ease: 'sine.inOut' }, T + 2);
    const door = box(b, { left: bw - 20, top: gy + 29, width: 18, height: 83, background: '#4a5a6a' }); box(door, { left: 2, top: 3, width: 14, height: 54, background: 'linear-gradient(135deg,#e8f2f8,#bcd4e2)' });
    const aw = box(b, { left: 1, top: gy + 27, width: bw, height: 20, transformOrigin: '50% 0', zIndex: 5 }); box(aw, { left: 0, top: 0, width: bw, height: 12, background: `repeating-linear-gradient(90deg,#5b6f86 0 9px,#8aa0b8 9px 18px)`, boxShadow: '0 2px 3px rgba(0,0,0,.25)' }); osc(aw, 'skewX', 1.2, 2.6);
    // ATM bay
    const ax = bw + 2, aw2 = sw - ax;
    box(b, { left: ax, top: gy + 30, width: aw2 - 2, height: 82, background: '#6f7f8c' });
    const atm = box(b, { left: ax + 6, top: gy + 40, width: 24, height: 46, background: 'linear-gradient(#b9c3cb,#8e99a3)', borderRadius: 2, boxShadow: '0 0 0 1px #556' });
    const scr = box(atm, { left: 3, top: 4, width: 18, height: 12, background: '#7fd3ff' }); flick(scr, 1, 0.55, 0.9); txt(atm, { left: 3, top: 4, width: 18, height: 12, fontSize: 5.5, color: '#134', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }, 'CASH');
    for (let i = 0; i < 6; i++) box(atm, { left: 4 + (i % 3) * 6, top: 20 + Math.floor(i / 3) * 5, width: 4, height: 3, background: '#445' });
    const slot = box(atm, { left: 4, top: 37, width: 16, height: 3, background: '#2c3a2c' }); flick(slot, 1, 0.2, 0.4);
    // queue at the ATM, standing on the pavement line
    for (let i = 0; i < 3; i++) { const pp = person(front, sp.x + ax + 36 + i * 13, G + 2, { s: 1.9 }); pp.g.style.zIndex = 9; osc(pp.g, 'x', 1.6, 1.5 + R()); osc(pp.head, 'rotation', 9, 1.6 + R()); if (i === 0) osc2(pp.g, { y: 0 }, { y: -3 }, 0.6); }
    return b;
  }

  // =============== BUILD ===============
  // distant roofline behind everything (soft, light)
  (function () {
    let x = -20;
    while (x < W) {
      const ww = 56 + R() * 56, top = 140 + R() * 130, c = pick(['#d8cabc', '#cfc3bd', '#d3d0c6', '#dccbb8']);
      const d = box(far, { left: x, top, width: ww, height: G - top, background: `repeating-linear-gradient(0deg, ${c} 0 9px, transparent 9px 19px), repeating-linear-gradient(90deg, rgba(120,150,180,.5) 0 7px, transparent 7px 15px), ${c}`, opacity: 0.95 });
      box(far, { left: x - 2, top: top - 4, width: ww + 4, height: 5, background: '#c9bbb0' });
      if (R() < 0.5) box(far, { left: x + R() * (ww - 12), top: top - 16, width: 9, height: 14, background: '#bda99c' });
      if (R() < 0.3) { const sm = box(far, { left: x + ww * 0.5, top: top - 24, width: 9, height: 9, borderRadius: '50%', background: 'rgba(240,240,245,.8)', opacity: 0, filter: 'blur(1.5px)' }); tl.fromTo(sm, { x: 0, y: 0, scale: 0.5, opacity: 0.6 }, { x: 18, y: -40, scale: 2, opacity: 0, duration: 4.5, repeat: rep(4.5), ease: 'sine.out', immediateRender: false }, T + R() * 3); }
      x += ww + 1;
    }
    // church clock tower
    const tx = 600, tw = 44;
    box(far, { left: tx, top: 70, width: tw, height: G - 70, background: brickBg('#e3d3b6', 0.2), boxShadow: 'inset 0 0 0 1px rgba(80,60,40,.3)' });
    box(far, { left: tx - 3, top: 66, width: tw + 6, height: 6, background: '#efe6d2' });
    box(far, { left: tx + 3, top: 14, width: 0, height: 0, borderLeft: `${tw / 2 - 3}px solid transparent`, borderRight: `${tw / 2 - 3}px solid transparent`, borderBottom: '54px solid #8fa0ad' });
    const vane = box(far, { left: tx + tw / 2 - 5, top: 2, width: 10, height: 12, transformOrigin: '50% 100%' }); box(vane, { left: 4.5, top: 0, width: 1.2, height: 12, background: '#555' }); box(vane, { left: 0, top: 1, width: 10, height: 4, background: '#d9a520', borderRadius: '0 50% 50% 0' }); osc(vane, 'skewX', 28, 3);
    const cf = box(far, { left: tx + 6, top: 82, width: 32, height: 32, borderRadius: '50%', background: '#fffdf0', boxShadow: '0 0 0 2px #7a6a3a' });
    for (let i = 0; i < 12; i++) box(cf, { left: 15, top: 2, width: 1.5, height: i % 3 === 0 ? 5 : 3, background: '#555', transformOrigin: '0.75px 14px', transform: `rotate(${i * 30}deg)` });
    const mh = box(cf, { left: 15.2, top: 4, width: 1.6, height: 12, background: '#222', transformOrigin: '50% 100%' }); const hh = box(cf, { left: 15, top: 7, width: 2.2, height: 9, background: '#222', transformOrigin: '50% 100%' });
    tl.fromTo(mh, { rotation: 0 }, { rotation: 360, duration: 12, repeat: rep(12), ease: 'none' }, T); tl.fromTo(hh, { rotation: 0 }, { rotation: 360, duration: 144, repeat: 1, ease: 'none' }, T);
    for (let i = 0; i < 3; i++) box(far, { left: tx + 8 + i * 11, top: 128 + 0, width: 7, height: 22, background: '#7a8a9a', borderRadius: '4px 4px 0 0' });
  })();

  const BW = [ // buildings, left to right; shop widths sum to building width
    { x: 0, w: 216, top: 150, style: 'brick', col: '#d6a089', chim: [26, 120], dish: 150, drain: true, toLet: 100, flag: 190, flagSvg: gFlag(), shops: [
      { x: 0, w: 78, name: BR('boots') === 'BOOTS' ? 'BOOTS' : BR('boots'), kind: 'pharm', fas: ['#bfe3cf', '#1d4a36'], awn: ['#5cae86', '#e9f5ee'], door: 'r', aboard: 'Flu jab? Just ask', basket: true },
      { x: 78, w: 66, name: 'Newsagent', kind: 'news', fas: ['#f5d99a', '#6a3b1e'], awn: ['#d9733d', '#f6e2c4'], door: 'l', aboard: 'WEATHER: still rain' },
      { x: 144, w: 72, name: BR('greggs'), kind: 'bakery', fas: ['#f2b86b', '#5a2d0f'], awn: ['#c8693a', '#f9e3c0'], door: 'r', aboard: 'Hot pies. Hot take: tea.' }] },
    { x: 216, w: 132, top: 66, style: 'glass', col: '#9bc', shops: [
      { x: 0, w: 92, name: BR('hsbc'), kind: 'bank', fas: ['#6c7b8a', '#fff'], awn: ['#5b6f86', '#8aa0b8'], door: 'r' }, { k: 'atm', x: 92, w: 40 }] },
    { x: 348, w: 108, top: 170, style: 'render', col: '#efe6d0', tudor: true, floors: 3, chim: [20, 74], flag: 80, drain: false, shops: [
      { x: 0, w: 108, name: 'The Red Lion', serif: true, kind: 'pub', fas: ['#4d7a58', '#f2d98a'], awn: ['#7a3b3b', '#e8d6c0'], door: 'l', aboard: 'QUIZ NIGHT: wrong answers welcome', basket: true, wall: '#6e5a4a' }] },
    { x: 456, w: 124, top: 326, style: 'render', col: '#e8e2cf', floors: 1, band: true, shops: [
      { x: 0, w: 124, name: 'OPEN LATE · FRESH · LOCAL', kind: 'super', fas: ['#d9efe9', '#1f6b64'], awn: ['#2f9c8f', '#f6efd9'], door: 'r', aboard: '3 for 2 on hope' }] },
    { x: 580, w: 228, top: 118, style: 'brick', col: '#e1c58a', chim: [30, 100, 190], dish: 60, drain: true, shops: [
      { x: 0, w: 68, name: 'Halal Butcher', kind: 'butcher', fas: ['#2e8b57', '#fff'], awn: ['#2e8b57', '#f4f4f4'], door: 'r', aboard: 'FRESH TODAY' },
      { x: 68, w: 90, name: 'Afro-Caribbean Foods', kind: 'afro', fas: ['#e6b422', '#3b1f0b'], awn: ['#2e8b57', '#e6b422'], door: 'l', aboard: 'Yam. Plantain. Joy.', basket: true },
      { x: 158, w: 70, name: 'Sari & Fabrics', kind: 'sari', fas: ['#c2185b', '#ffe9a8'], awn: ['#7b2fbf', '#f5c542'], door: 'r', aboard: 'Wedding season: panic early' }] },
    { x: 808, w: 140, top: 205, style: 'render', col: '#bcd3bb', chim: [100], cat: 20, shops: [
      { x: 0, w: 76, name: BR('poundland'), kind: 'discount', fas: ['#ffe27a', '#6a2b8a'], awn: ['#8a4fbf', '#ffe27a'], door: 'r' },
      { x: 76, w: 64, name: 'Chippy', kind: 'chippy', fas: ['#2f4d77', '#ffe9a8'], awn: ['#2f6d9a', '#f4f4f4'], door: 'l', neon: true, aboard: 'Salt & vinegar: ask for "plenty"' }] },
    { x: 948, w: 202, top: 160, style: 'brick', col: '#c99a86', chim: [18, 150], dish: 100, drain: true, toLet: 70, shops: [
      { x: 0, w: 70, name: 'Kebab House', kind: 'kebab', fas: ['#7a2a2a', '#ffd9a0'], awn: ['#a8322b', '#ffd9a0'], door: 'r', neon: true },
      { x: 70, w: 66, name: 'Launderette', kind: 'launder', fas: ['#bfe3f2', '#1a4d70'], awn: ['#3a8fc2', '#fff'], door: 'l', closed: false, aboard: 'Tumble dry: £3. Dignity: free' },
      { x: 136, w: 66, name: 'Money Transfer', kind: 'money', fas: ['#1f5a3a', '#bff5cc'], awn: ['#2e8b57', '#f4f4f4'], door: 'r', aboard: 'Home in 5 min*' }] },
    { x: 1150, w: 130, top: 230, style: 'render', col: '#bfd3e6', chim: [14], flag: 92, shops: [
      { x: 0, w: 72, name: BR('costa'), kind: 'coffee', fas: ['#6a3a22', '#f8e3c0'], awn: ['#8a4a2a', '#f8e3c0'], door: 'r', basket: true, aboard: 'Flat white. Flat wallet.' }, { k: 'wall', x: 72, w: 58 }] },
  ];
  BW.forEach((sp) => { sp.shops.forEach((s) => { if (!s.k) s.k = 'shop'; }); building(sp); });

  // poster wall (beside Costa)
  (function () {
    const px0 = 1222, py = G - 100, pw = 58;
    box(row, { left: px0, top: py, width: pw, height: 100, background: '#8a7a70' });
    const gigs = [['GIG', '#e55d5d'], ['LOST CAT', '#f5d142'], ['BINGO!', '#7bc47f'], ['VOTE', '#5aa9e6'], ['CIRCUS', '#c58be0'], ['YOGA', '#f28c52'], ['FREE PUPS', '#f2e0a8'], ['BAND NIGHT', '#e86bb0']];
    gigs.forEach((g, i) => { const p = txt(row, { left: px0 + 3 + (i % 2) * 27, top: py + 3 + Math.floor(i / 2) * 24, width: 25, height: 21, background: g[1], color: '#222', fontSize: 6.5, transform: `rotate(${(R() - 0.5) * 8}deg)`, whiteSpace: 'normal', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', boxShadow: '0 1px 2px rgba(0,0,0,.3)' }, g[0]); osc(p, 'rotation', 2.5, 2 + R() * 2); });
  })();

  // ---------- roof billboard above the low supermarket block ----------
  (function () {
    const bx = 470, by = 246;
    box(front, { left: bx + 20, top: by + 56, width: 3, height: 26, background: '#666' }); box(front, { left: bx + 94, top: by + 56, width: 3, height: 26, background: '#666' });
    const bd = box(front, { left: bx, top: by, width: 118, height: 58, background: '#2a2f38', padding: 0, boxShadow: '0 2px 4px rgba(0,0,0,.25)', overflow: 'hidden' });
    const ads = [['TEA:', 'the original hot drink', '#f4d98a', '#5a3010'], ['Queue here for', 'nothing in particular', '#cfe6f5', '#1f3d5a'], ["Sorry,", "we're open", '#f6c7d0', '#7a1f3a'], ['Umbrellas:', '4 seasons a day', '#d4efd0', '#1f5a2a'], ['Now with 12%', 'more weather', '#e6d8f5', '#472a7a']];
    const els = ads.map((a) => box(bd, { left: 2, top: 2, width: 114, height: 54, background: a[2] }, `<div style="font:bold 12px Georgia,serif;color:${a[3]};text-align:center;margin-top:8px">${a[0]}</div><div style="font:italic bold 12px Georgia,serif;color:${a[3]};text-align:center;margin-top:4px">${a[1]}</div><div style="font:8px Arial;color:${a[3]};text-align:center;margin-top:6px">a Public Information Poster</div>`));
    cycle(els, 4);
    for (let i = 0; i < 5; i++) { const lp = box(front, { left: bx + 8 + i * 25, top: by - 7, width: 6, height: 5, background: '#ffe9a0', borderRadius: '50% 50% 0 0' }); flick(lp, 1, 0.5, 0.8); }
  })();

  // ---------- bus shelter at the right, with a rotating advert, bench, waiting people ----------
  (function () {
    const sx = 1186, sy = G - 74, sw = 92;
    box(front, { left: sx, top: sy - 4, width: sw, height: 5, background: '#59616a', borderRadius: 2 });
    box(front, { left: sx + 2, top: sy, width: 3, height: 74, background: '#59616a' }); box(front, { left: sx + sw - 5, top: sy, width: 3, height: 74, background: '#59616a' });
    box(front, { left: sx + 5, top: sy + 1, width: sw - 10, height: 60, background: 'linear-gradient(135deg,rgba(220,238,248,.45),rgba(190,215,230,.35))' });
    const ad = box(front, { left: sx + sw - 38, top: sy + 6, width: 32, height: 50, background: '#cfe6f5', boxShadow: '0 0 0 1px #777', overflow: 'hidden' });
    const adsx = [['Tea. Just', 'tea.', '#f4d98a', '#5a3010'], ['Mind the', 'gap year', '#cfe6f5', '#1f3d5a'], ['Bus late?', 'Same.', '#f6c7d0', '#7a1f3a']];
    cycle(adsx.map((a) => box(ad, { left: 0, top: 0, width: 32, height: 50, background: a[2] }, `<div style="font:bold 8px Georgia,serif;color:${a[3]};text-align:center;margin-top:14px;line-height:1.2">${a[0]}<br>${a[1]}</div>`)), 3.5);
    box(front, { left: sx + 8, top: sy + 52, width: 38, height: 4, background: '#8b5a2b' }); box(front, { left: sx + 10, top: sy + 56, width: 2, height: 14, background: '#555' }); box(front, { left: sx + 42, top: sy + 56, width: 2, height: 14, background: '#555' });
    const p1 = person(front, sx + 18, sy + 53, { s: 1.9 }); osc2(p1.arm, { rotation: 0 }, { rotation: 100 }, 1.4); osc(p1.head, 'rotation', 8, 1.8);
    const p2 = person(front, sx + 34, sy + 53, { s: 1.9 }); osc(p2.head, 'rotation', 10, 2.3); osc(p2.g, 'y', 1, 1.5);
    const pole = box(front, { left: sx - 14, top: sy + 6, width: 3, height: 68, background: '#666' }); const sg = txt(front, { left: sx - 24, top: sy - 4, width: 24, height: 14, background: '#c33', color: '#fff', fontSize: 6, borderRadius: 2 }, 'BUS STOP'); osc(sg, 'rotation', 2, 2.5);
  })();

  // ---------- bunting along the pub and the Chippy ----------
  function bunting(x0, x1, y, n) {
    const cols = ['#d9544f', '#fff', '#4f86c6', '#e6b84a', '#6bb36b'];
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n, px0 = x0 + (x1 - x0) * t, py0 = y + Math.sin(t * Math.PI) * 10;
      const f = box(front, { left: px0 - 5, top: py0, width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `10px solid ${cols[i % cols.length]}`, transformOrigin: '50% 0' });
      osc(f, 'rotation', 14, 0.9 + R() * 0.8);
    }
    box(front, { left: x0, top: y - 1, width: x1 - x0, height: 1, background: 'rgba(60,40,30,.5)', transformOrigin: '0 0' });
  }
  bunting(350, 454, 330, 9); bunting(812, 946, 300, 11); bunting(1000, 1148, 320, 12);

  tl.set({}, {}, T + D);
  return { root, far, row, front };
};
})();
