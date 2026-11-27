// ---------- helpers ----------
const W = 720, H = 1280;
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;}}
const R = mulberry32(2007);
const pick = (arr, r = R) => arr[Math.floor(r() * arr.length)];
function mk(parent, cls, css, html) {
  const d = document.createElement('div');
  if (cls) d.className = cls;
  if (css) Object.assign(d.style, css);
  if (html !== undefined) d.innerHTML = html;
  parent.appendChild(d);
  return d;
}
const px = (o) => { const r = {}; for (const k in o) r[k] = typeof o[k] === 'number' ? o[k] + 'px' : o[k]; return r; };
const box = (p, css, html, cls) => mk(p, cls || 'abs', px(css), html);
const S = (id) => document.getElementById(id);
const C = { navy:'#1b1f5e', red:'#ff3b5c', yel:'#ffd23f', grn:'#2ecc71', pur:'#8e5cff', org:'#ff8a3d', pink:'#ff6fb5', teal:'#19c3b1', sky:'#6cd0ff', cream:'#fff1d0', blue:'#3b82f6' };

// ---------- icons (svg strings) ----------
const ICON = {
  house: (c = '#ff8a3d', r = '#c0392b') => `<svg viewBox="0 0 100 100" width="100%" height="100%"><rect x="18" y="44" width="64" height="44" rx="4" fill="${c}" stroke="#1b1f5e" stroke-width="5"/><path d="M8 48 L50 14 L92 48Z" fill="${r}" stroke="#1b1f5e" stroke-width="5" stroke-linejoin="round"/><rect x="42" y="62" width="16" height="26" rx="3" fill="#fff1d0" stroke="#1b1f5e" stroke-width="4"/><rect x="24" y="52" width="13" height="13" fill="#bfeaff" stroke="#1b1f5e" stroke-width="3"/><rect x="63" y="52" width="13" height="13" fill="#bfeaff" stroke="#1b1f5e" stroke-width="3"/></svg>`,
  coin: (t = '£') => `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="50" r="42" fill="#ffd23f" stroke="#1b1f5e" stroke-width="6"/><circle cx="50" cy="50" r="30" fill="none" stroke="#e8a900" stroke-width="4"/><text x="50" y="66" text-anchor="middle" font-family="Archivo Black, Poppins" font-size="44" fill="#1b1f5e">${t}</text></svg>`,
  note: (t = '£100', c = '#2ecc71') => `<svg viewBox="0 0 200 100" width="100%" height="100%"><rect x="4" y="6" width="192" height="88" rx="10" fill="${c}" stroke="#1b1f5e" stroke-width="6"/><rect x="14" y="16" width="172" height="68" rx="6" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="8 6" opacity=".7"/><circle cx="100" cy="50" r="28" fill="#fff" opacity=".35"/><text x="100" y="64" text-anchor="middle" font-family="Archivo Black, Poppins" font-size="40" fill="#1b1f5e">${t}</text></svg>`,
  shield: (c1 = '#19c3b1', c2 = '#3b82f6') => `<svg viewBox="0 0 100 120" width="100%" height="100%"><defs><linearGradient id="shg${c1.slice(1)}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><path d="M50 6 L90 20 V58 C90 86 70 105 50 114 C30 105 10 86 10 58 V20Z" fill="url(#shg${c1.slice(1)})" stroke="#1b1f5e" stroke-width="6" stroke-linejoin="round"/><path d="M30 60 L45 76 L72 42" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  pig: () => `<svg viewBox="0 0 120 100" width="100%" height="100%"><ellipse cx="60" cy="56" rx="44" ry="34" fill="#ff9ec8" stroke="#1b1f5e" stroke-width="5"/><path d="M30 28 L36 10 L50 24Z" fill="#ff9ec8" stroke="#1b1f5e" stroke-width="5" stroke-linejoin="round"/><ellipse cx="102" cy="58" rx="12" ry="14" fill="#ff7bb5" stroke="#1b1f5e" stroke-width="5"/><circle cx="99" cy="55" r="2.5" fill="#1b1f5e"/><circle cx="105" cy="55" r="2.5" fill="#1b1f5e"/><circle cx="80" cy="44" r="4.5" fill="#1b1f5e"/><rect x="48" y="24" width="26" height="6" rx="3" fill="#1b1f5e"/><rect x="34" y="80" width="12" height="16" rx="4" fill="#ff9ec8" stroke="#1b1f5e" stroke-width="4"/><rect x="72" y="80" width="12" height="16" rx="4" fill="#ff9ec8" stroke="#1b1f5e" stroke-width="4"/></svg>`,
  bulb: () => `<svg viewBox="0 0 100 130" width="100%" height="100%"><path d="M50 8 C20 8 10 34 22 54 C30 66 34 72 34 84 H66 C66 72 70 66 78 54 C90 34 80 8 50 8Z" fill="#ffd23f" stroke="#1b1f5e" stroke-width="6"/><rect x="34" y="88" width="32" height="12" rx="4" fill="#9aa3c7" stroke="#1b1f5e" stroke-width="5"/><rect x="38" y="104" width="24" height="12" rx="5" fill="#9aa3c7" stroke="#1b1f5e" stroke-width="5"/><path d="M40 60 L50 40 L60 60" fill="none" stroke="#e8a900" stroke-width="5" stroke-linecap="round"/></svg>`,
  cup: () => `<svg viewBox="0 0 100 90" width="100%" height="100%"><path d="M14 22 H74 V50 C74 70 62 80 44 80 C26 80 14 70 14 50Z" fill="#fff" stroke="#1b1f5e" stroke-width="6" stroke-linejoin="round"/><path d="M74 30 C96 28 96 58 72 58" fill="none" stroke="#1b1f5e" stroke-width="6"/><rect x="14" y="22" width="60" height="12" fill="#c98a52" stroke="#1b1f5e" stroke-width="5"/><ellipse cx="44" cy="84" rx="38" ry="5" fill="#ff6fb5" stroke="#1b1f5e" stroke-width="4"/></svg>`,
  bank: (w = '#fff1d0') => `<svg viewBox="0 0 200 170" width="100%" height="100%"><path d="M10 52 L100 6 L190 52Z" fill="#ff8a3d" stroke="#1b1f5e" stroke-width="6" stroke-linejoin="round"/><rect x="14" y="56" width="172" height="14" fill="${w}" stroke="#1b1f5e" stroke-width="5"/><rect x="30" y="74" width="20" height="62" fill="${w}" stroke="#1b1f5e" stroke-width="5"/><rect x="72" y="74" width="20" height="62" fill="${w}" stroke="#1b1f5e" stroke-width="5"/><rect x="114" y="74" width="20" height="62" fill="${w}" stroke="#1b1f5e" stroke-width="5"/><rect x="156" y="74" width="20" height="62" fill="${w}" stroke="#1b1f5e" stroke-width="5"/><rect x="8" y="138" width="184" height="20" rx="3" fill="#cfd8e3" stroke="#1b1f5e" stroke-width="5"/><circle cx="100" cy="34" r="8" fill="#ffd23f" stroke="#1b1f5e" stroke-width="4"/></svg>`,
  x: () => `<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M14 14 L86 86 M86 14 L14 86" stroke="#ff3b5c" stroke-width="18" stroke-linecap="round"/><path d="M14 14 L86 86 M86 14 L14 86" stroke="#fff" stroke-width="6" stroke-linecap="round"/></svg>`,
  tick: () => `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="50" r="44" fill="#2ecc71" stroke="#1b1f5e" stroke-width="6"/><path d="M26 52 L44 70 L76 32" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  q: (c = '#ffd23f') => `<svg viewBox="0 0 80 110" width="100%" height="100%"><text x="40" y="92" text-anchor="middle" font-family="Archivo Black, Poppins" font-size="110" fill="${c}" stroke="#1b1f5e" stroke-width="7" paint-order="stroke">?</text></svg>`,
  star: (c = '#ffd23f') => `<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M50 4 L62 36 L96 38 L70 60 L79 94 L50 75 L21 94 L30 60 L4 38 L38 36Z" fill="${c}" stroke="#1b1f5e" stroke-width="5" stroke-linejoin="round"/></svg>`,
  cal: (n, c = '#fff') => `<svg viewBox="0 0 100 110" width="100%" height="100%"><rect x="6" y="14" width="88" height="90" rx="12" fill="${c}" stroke="#1b1f5e" stroke-width="6"/><path d="M6 26 a12 12 0 0 1 12 -12 h64 a12 12 0 0 1 12 12 v18 H6Z" fill="#ff3b5c" stroke="#1b1f5e" stroke-width="6"/><rect x="26" y="4" width="10" height="20" rx="4" fill="#1b1f5e"/><rect x="64" y="4" width="10" height="20" rx="4" fill="#1b1f5e"/><text x="50" y="90" text-anchor="middle" font-family="Archivo Black, Poppins" font-size="44" fill="#1b1f5e">${n}</text></svg>`,
  cloud: (c = '#fff') => `<svg viewBox="0 0 200 100" width="100%" height="100%"><path d="M40 90 C10 90 8 52 36 50 C34 24 70 14 84 34 C96 6 140 12 142 44 C176 38 192 82 160 90Z" fill="${c}" stroke="#1b1f5e" stroke-width="5" stroke-linejoin="round"/></svg>`,
  vault: () => `<svg viewBox="0 0 140 140" width="100%" height="100%"><rect x="10" y="10" width="120" height="120" rx="16" fill="#9aa3c7" stroke="#1b1f5e" stroke-width="6"/><circle cx="70" cy="70" r="40" fill="#cfd8e3" stroke="#1b1f5e" stroke-width="6"/><g class="vwheel"><circle cx="70" cy="70" r="16" fill="#ffd23f" stroke="#1b1f5e" stroke-width="5"/><path d="M70 40 V100 M40 70 H100 M49 49 L91 91 M91 49 L49 91" stroke="#1b1f5e" stroke-width="5" stroke-linecap="round"/></g></svg>`,
};
const icon = (parent, name, css, ...a) => box(parent, css, ICON[name](...a));

// ---------- characters ----------
function hairBack(style, c) {
  if (style === 'long') return `<ellipse cx="60" cy="56" rx="36" ry="38" fill="${c}"/>`;
  if (style === 'pony') return `<ellipse cx="96" cy="56" rx="10" ry="24" fill="${c}" transform="rotate(-24 96 56)"/>`;
  if (style === 'bun') return `<circle cx="60" cy="12" r="13" fill="${c}"/>`;
  return '';
}
function hairFront(style, c) {
  switch (style) {
    case 'spiky': return `<path d="M28 44 L24 22 L38 30 L38 8 L52 24 L60 2 L68 24 L82 8 L82 30 L96 22 L92 44 Q76 30 60 32 Q44 30 28 44Z" fill="${c}"/>`;
    case 'pony': return `<path d="M28 44 Q26 12 60 12 Q94 12 92 44 Q78 26 60 30 Q42 26 28 44Z" fill="${c}"/><rect x="86" y="30" width="12" height="8" rx="3" fill="#ff3b5c"/>`;
    case 'bun': return `<path d="M28 44 Q26 14 60 14 Q94 14 92 44 Q78 28 60 30 Q42 28 28 44Z" fill="${c}"/>`;
    case 'cap': return `<path d="M28 42 Q28 12 60 12 Q92 12 92 42Z" fill="${c}"/><rect x="58" y="32" width="46" height="9" rx="4" fill="${c}"/>`;
    case 'bowler': return `<ellipse cx="60" cy="26" rx="44" ry="8" fill="#222"/><path d="M34 26 Q34 -6 60 -6 Q86 -6 86 26Z" fill="#222"/><rect x="34" y="18" width="52" height="7" fill="#c0392b"/>`;
    case 'long': return `<path d="M26 50 Q24 12 60 12 Q96 12 94 50 Q80 28 60 30 Q40 28 26 50Z" fill="${c}"/>`;
    case 'bald': return '';
    default: return `<path d="M29 44 Q28 14 60 14 Q92 14 91 44 Q78 28 60 31 Q42 28 29 44Z" fill="${c}"/>`;
  }
}
function figSVG(o) {
  const skin = o.skin || '#f2c7a0', hair = o.hair || '#4a2c17', top = o.top || '#3b82f6', pants = o.pants || '#2b2f55', shoe = o.shoe || '#fff';
  const extra = o.extra || '';
  return `<svg viewBox="0 0 120 240"><g class="bd">
  <g class="lL"><rect x="40" y="140" width="17" height="88" rx="8" fill="${pants}"/><ellipse cx="46" cy="230" rx="14" ry="7" fill="${shoe}" stroke="#1b1f5e" stroke-width="3"/></g>
  <g class="lR"><rect x="63" y="140" width="17" height="88" rx="8" fill="${pants}"/><ellipse cx="74" cy="230" rx="14" ry="7" fill="${shoe}" stroke="#1b1f5e" stroke-width="3"/></g>
  <g class="aL"><rect x="22" y="82" width="15" height="62" rx="7.5" fill="${top}"/><circle cx="29.5" cy="146" r="9" fill="${skin}"/></g>
  <rect x="32" y="78" width="56" height="76" rx="22" fill="${top}"/>${o.torsoExtra || ''}
  <g class="aR"><rect x="83" y="82" width="15" height="62" rx="7.5" fill="${top}"/><circle cx="90.5" cy="146" r="9" fill="${skin}"/></g>
  <g class="hd">${hairBack(o.hs, hair)}
   <rect x="52" y="70" width="16" height="14" fill="${skin}"/>
   <circle cx="60" cy="48" r="30" fill="${skin}"/>
   <circle cx="40" cy="58" r="5" fill="#ff8aa0" opacity=".45"/><circle cx="80" cy="58" r="5" fill="#ff8aa0" opacity=".45"/>
   ${hairFront(o.hs, hair)}
   <g class="eL"><ellipse cx="49" cy="50" rx="6.5" ry="7.5" fill="#fff" stroke="#1b1f5e" stroke-width="2"/><circle cx="50" cy="51" r="3.4" fill="#1b1f5e"/></g>
   <g class="eR"><ellipse cx="71" cy="50" rx="6.5" ry="7.5" fill="#fff" stroke="#1b1f5e" stroke-width="2"/><circle cx="70" cy="51" r="3.4" fill="#1b1f5e"/></g>
   <path class="brL" d="M41 38 Q49 34 57 38" fill="none" stroke="#1b1f5e" stroke-width="4" stroke-linecap="round"/>
   <path class="brR" d="M63 38 Q71 34 79 38" fill="none" stroke="#1b1f5e" stroke-width="4" stroke-linecap="round"/>
   <ellipse class="mo" cx="60" cy="66" rx="8.5" ry="6" fill="#8a1c2f" stroke="#1b1f5e" stroke-width="2"/>
   ${extra}
   <path class="sw" d="M86 30 Q92 42 86 48 Q80 42 86 30Z" fill="#6cd0ff" stroke="#1b1f5e" stroke-width="2" opacity="0"/>
  </g></g></svg>`;
}
const PART = ['bd','lL','lR','aL','aR','hd','eL','eR','brL','brR','mo','sw'];
function person(parent, o, x, ground, s = 1, flip = false) {
  const d = mk(parent, 'person', { left: x + 'px', top: (ground - 300) + 'px' });
  d.innerHTML = figSVG(o);
  const P = { d, o, s, flip };
  PART.forEach((k) => P[k] = d.querySelector('.' + k));
  gsap.set(d, { scaleX: flip ? -s : s, scaleY: s, transformOrigin: '50% 100%' });
  gsap.set(P.lL, { svgOrigin: '48 140' }); gsap.set(P.lR, { svgOrigin: '72 140' });
  gsap.set(P.aL, { svgOrigin: '30 86' }); gsap.set(P.aR, { svgOrigin: '90 86' });
  gsap.set(P.hd, { svgOrigin: '60 76' });
  gsap.set(P.brL, { svgOrigin: '49 38' }); gsap.set(P.brR, { svgOrigin: '71 38' });
  gsap.set(P.eL, { svgOrigin: '49 50' }); gsap.set(P.eR, { svgOrigin: '71 50' });
  gsap.set(P.mo, { svgOrigin: '60 66', scaleY: 0.25 });
  return P;
}
const CAST = {
  alfie: { skin: '#f2c7a0', hair: '#4a2c17', hs: 'spiky', top: '#3b82f6', pants: '#2b2f55', torsoExtra: '<rect x="56" y="86" width="8" height="52" fill="#fff" opacity=".6"/>' },
  vivi: { skin: '#a8714d', hair: '#d6338a', hs: 'pony', top: '#ffcc00', pants: '#6a3fd1', shoe: '#ff3b5c' },
  rubin: { skin: '#f4cfb0', hair: '#cfcfdc', hs: 'bun', top: '#8e3fd6', pants: '#333a66', torsoExtra: '<path d="M44 80 L60 108 L76 80Z" fill="#ff6fb5"/>', extra: '<g fill="none" stroke="#1b1f5e" stroke-width="3"><circle cx="49" cy="50" r="10"/><circle cx="71" cy="50" r="10"/><path d="M59 50 H61"/></g>' },
  narr: { skin: '#f4cfb0', hair: '#222', hs: 'bowler', top: '#222', pants: '#222', extra: '<path d="M44 62 Q60 56 76 62 Q70 72 60 66 Q50 72 44 62Z" fill="#6b4a2b"/><circle cx="71" cy="50" r="11" fill="none" stroke="#e8a900" stroke-width="3"/>' },
};
const SKINS = ['#f2c7a0', '#e8b48a', '#c98f6b', '#a8714d', '#7a4b30', '#f6d5b8'];
const HAIRS = ['#222', '#4a2c17', '#e8c26a', '#c0392b', '#888', '#6b3fa0'];
const TOPS = ['#ff3b5c', '#ffd23f', '#2ecc71', '#8e5cff', '#ff8a3d', '#19c3b1', '#ff6fb5', '#3b82f6', '#fff'];
const PANTS = ['#2b2f55', '#444b6e', '#1b6b5a', '#5a3a2a', '#6a3fd1'];
const HSTYLES = ['short', 'cap', 'bald', 'long', 'spiky', 'bun', 'pony'];
function crowdOpts(r = R) { return { skin: pick(SKINS, r), hair: pick(HAIRS, r), hs: pick(HSTYLES, r), top: pick(TOPS, r), pants: pick(PANTS, r), shoe: pick(['#fff', '#ff3b5c', '#222', '#ffd23f'], r) }; }

// ---------- character animation ----------
function walk(P, t0, dur, per = 0.28, amp = 26) {
  const n = Math.max(1, Math.round(dur / per)) - 1;
  const o = { duration: per, ease: 'sine.inOut', repeat: n, yoyo: true };
  tl.fromTo(P.lL, { rotation: -amp }, { rotation: amp, ...o }, t0);
  tl.fromTo(P.lR, { rotation: amp }, { rotation: -amp, ...o }, t0);
  tl.fromTo(P.aL, { rotation: amp * 1.1 }, { rotation: -amp * 1.1, ...o }, t0);
  tl.fromTo(P.aR, { rotation: -amp * 1.1 }, { rotation: amp * 1.1, ...o }, t0);
  tl.fromTo(P.bd, { y: 0 }, { y: -5, duration: per / 2, ease: 'sine.inOut', repeat: n * 2 + 1, yoyo: true }, t0);
  const e = t0 + (n + 1) * per;
  tl.to([P.lL, P.lR, P.aL, P.aR, P.bd], { rotation: 0, y: 0, duration: 0.15 }, e);
}
function bob(P, t0, dur, amp = 4, per = 0.5) {
  const n = Math.max(1, Math.round(dur / per)) - 1;
  tl.fromTo(P.bd, { y: 0 }, { y: -amp, duration: per, ease: 'sine.inOut', repeat: n, yoyo: true }, t0);
}
function sway(P, t0, dur, amp = 3, per = 0.7) {
  const n = Math.max(1, Math.round(dur / per)) - 1;
  tl.fromTo(P.hd, { rotation: -amp }, { rotation: amp, duration: per, ease: 'sine.inOut', repeat: n, yoyo: true }, t0);
}
function talk(P, t0, dur, seed = 1) {
  const r = mulberry32(Math.floor(t0 * 100) + seed);
  let t = t0 + 0.05; const end = t0 + dur - 0.12;
  while (t < end) {
    const open = 0.35 + r() * 0.65;
    tl.to(P.mo, { scaleY: open, duration: 0.07 }, t);
    tl.to(P.mo, { scaleY: 0.2, duration: 0.07 }, t + 0.1 + r() * 0.05);
    t += 0.2 + r() * 0.08;
  }
  tl.to(P.mo, { scaleY: 0.25, duration: 0.08 }, t0 + dur - 0.1);
  // head nods while talking
  tl.fromTo(P.hd, { y: 0 }, { y: -2, duration: 0.18, repeat: Math.max(1, Math.round(dur / 0.18) - 1), yoyo: true, ease: 'sine.inOut' }, t0);
}
function mood(P, t, m, d = 0.18) {
  const M = {
    normal: { bl: 0, br: 0, by: 0, es: 1, sw: 0, mo: 0.25 },
    panic: { bl: -22, br: 22, by: -5, es: 1.3, sw: 1, mo: 0.9 },
    sad: { bl: 18, br: -18, by: 0, es: 0.9, sw: 0, mo: 0.15 },
    happy: { bl: -8, br: 8, by: -3, es: 1.05, sw: 0, mo: 0.6 },
  }[m];
  tl.to(P.brL, { rotation: M.bl, y: M.by, duration: d }, t);
  tl.to(P.brR, { rotation: M.br, y: M.by, duration: d }, t);
  tl.to([P.eL, P.eR], { scale: M.es, duration: d }, t);
  tl.to(P.sw, { opacity: M.sw, duration: d }, t);
  if (m === 'panic') {
    tl.fromTo(P.sw, { y: 0 }, { y: 14, duration: 0.5, repeat: 3, ease: 'power1.in' }, t);
  }
}
function shake(target, t, dur, amp = 6, f = 0.04, seed = 3) {
  const r = mulberry32(seed + Math.floor(t * 10));
  const n = Math.round(dur / f);
  for (let i = 0; i < n; i++) {
    tl.to(target, { x: (r() - 0.5) * 2 * amp, y: (r() - 0.5) * 2 * amp, duration: f }, t + i * f);
  }
  tl.to(target, { x: 0, y: 0, duration: f }, t + dur);
}
function pop(el, t, opt = {}) {
  tl.fromTo(el, { scale: opt.from ?? 0, opacity: 0, transformOrigin: opt.o || '50% 50%', rotation: opt.rot0 ?? 0 }, { scale: 1, opacity: 1, rotation: opt.rot ?? 0, duration: opt.d ?? 0.4, ease: opt.ease || 'back.out(2.2)' }, t);
}
function hide(el, t, d = 0.2) { tl.to(el, { opacity: 0, scale: 0.7, duration: d, ease: 'power2.in' }, t); }
function slam(el, t, rot = -6) {
  tl.fromTo(el, { scale: 3.2, opacity: 0, rotation: rot + 14 }, { scale: 1, opacity: 1, rotation: rot, duration: 0.28, ease: 'power4.in' }, t);
}
function bubble(parent, text, x, y, t, dur, cls = '', fs = 40) {
  const b = box(parent, { left: x, top: y }, text, 'bubble ' + cls);
  b.style.fontSize = fs + 'px';
  b.style.zIndex = 30;
  b.style.transformOrigin = '50% 100%';
  gsap.set(b, { xPercent: -50, yPercent: -100, opacity: 0 });
  tl.fromTo(b, { scale: 0.2, opacity: 0, rotation: -8 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.3, ease: 'back.out(2.4)' }, t);
  tl.to(b, { scale: 1.05, duration: 0.25, repeat: Math.max(1, Math.round(dur / 0.25) - 1), yoyo: true, ease: 'sine.inOut' }, t + 0.35);
  tl.to(b, { opacity: 0, scale: 0.6, duration: 0.18, ease: 'power2.in' }, t + dur - 0.18);
  return b;
}
function headline(parent, text, x, y, size, color, t, dur, rot = 0, w = 720) {
  const h = box(parent, { left: x, top: y, width: w, fontSize: size, color: color || '#fff', lineHeight: 1.0 }, text, 'h1');
  gsap.set(h, { rotation: rot });
  pop(h, t, { rot: rot, rot0: rot - 10 });
  if (dur) hide(h, t + dur - 0.2);
  return h;
}
function tagbox(parent, text, css, bg, t, dur, rot = 0) {
  const b = box(parent, { ...css, background: bg }, text, 'tag');
  pop(b, t, { rot, rot0: rot - 8 });
  if (dur) hide(b, t + dur - 0.2);
  return b;
}
function sunburst(parent, c1, c2, t0, dur, size = 1900, top = -300, op = 0.5) {
  const b = box(parent, { left: (W - size) / 2, top, width: size, height: size, borderRadius: '50%', opacity: op, background: `repeating-conic-gradient(${c1} 0deg 10deg, ${c2} 10deg 20deg)` });
  tl.fromTo(b, { rotation: 0 }, { rotation: 36 * (dur / 6), duration: dur, ease: 'none' }, t0);
  return b;
}
function cloudDrift(parent, t0, dur, n = 4, seed = 5) {
  const r = mulberry32(seed);
  for (let i = 0; i < n; i++) {
    const w = 130 + r() * 120, y = 70 + r() * 360;
    const c = box(parent, { left: -300, top: y, width: w, height: w / 2, opacity: 0.95 }, ICON.cloud());
    const sp = 60 + r() * 60;
    tl.fromTo(c, { x: r() * 700 }, { x: 900, duration: Math.max(dur, 1), ease: 'none' }, t0);
    c.dataset.sp = sp;
  }
}
function dots(parent, color, size = 34, op = 0.18) {
  return box(parent, { left: 0, top: 0, width: W, height: H, opacity: op, backgroundImage: `radial-gradient(${color} 22%, transparent 24%)`, backgroundSize: `${size}px ${size}px` });
}
function coinsBurst(parent, cx, cy, t, n = 14, seed = 9, size = 48, spread = 340, label = '£') {
  const r = mulberry32(seed);
  for (let i = 0; i < n; i++) {
    const c = box(parent, { left: cx - size / 2, top: cy - size / 2, width: size, height: size, opacity: 0, zIndex: 25 }, ICON.coin(label));
    const a = -Math.PI * (0.1 + 0.8 * r()), v = 120 + r() * spread;
    tl.fromTo(c, { x: 0, y: 0, scale: 0.3, opacity: 1, rotation: 0 }, { x: Math.cos(a) * v, y: Math.sin(a) * v, scale: 1, rotation: r() * 720 - 360, duration: 0.45, ease: 'power2.out' }, t + i * 0.02);
    tl.to(c, { y: '+=' + (260 + r() * 200), opacity: 0, duration: 0.7, ease: 'power2.in' }, t + 0.45 + i * 0.02);
  }
}
function confetti(parent, cx, cy, t, n = 40, seed = 4) {
  const r = mulberry32(seed), cols = [C.red, C.yel, C.grn, C.pur, C.org, C.pink, C.teal, C.sky];
  for (let i = 0; i < n; i++) {
    const c = box(parent, { left: cx, top: cy, width: 14 + r() * 10, height: 22 + r() * 12, background: cols[i % cols.length], borderRadius: 3, opacity: 0, zIndex: 40 });
    const a = -Math.PI * (0.05 + 0.9 * r()), v = 200 + r() * 520;
    tl.fromTo(c, { x: 0, y: 0, opacity: 1, rotation: 0 }, { x: Math.cos(a) * v, y: Math.sin(a) * v, rotation: r() * 900 - 450, duration: 0.7, ease: 'power2.out' }, t + r() * 0.1);
    tl.to(c, { y: '+=' + (500 + r() * 400), x: '+=' + ((r() - 0.5) * 160), rotation: '+=' + (r() * 500), opacity: 0.0, duration: 1.4 + r() * 0.6, ease: 'power1.in' }, t + 0.7);
  }
}
function speedLines(parent, t0, dur, n = 14, seed = 11, col = '#fff') {
  const r = mulberry32(seed);
  for (let i = 0; i < n; i++) {
    const w = 160 + r() * 260, y = 120 + r() * 880;
    const l = box(parent, { left: 0, top: y, width: w, height: 8, background: col, opacity: 0.0, borderRadius: 4 });
    const st = t0 + r() * 0.5;
    const rounds = Math.max(1, Math.floor(dur / 0.45));
    tl.fromTo(l, { x: 820, opacity: 0.8 }, { x: -w - 100, duration: 0.45 + r() * 0.2, ease: 'none', repeat: rounds, repeatDelay: r() * 0.2 }, st);
  }
}

// ---------- script lines, captions, narrator badge ----------
const LINES = [
 {"i":0,"who":"N","text":"September 2007. Thousands of people queue outside a British bank to take their savings out.","start":0.0,"dur":6.841},
 {"i":1,"who":"N","text":"Nobody robbed it. Nothing was stolen. So why did the bank start to fall apart?","start":6.961,"dur":5.311},
 {"i":2,"who":"V","text":"Alfie! Alfie! Have you seen the news? Our bank is in trouble!","start":12.512,"dur":2.839},
 {"i":3,"who":"A","text":"What?! My savings are in there! Everything I have!","start":15.691,"dur":2.325},
 {"i":4,"who":"V","text":"Come on, get in the queue before it all runs out!","start":18.355,"dur":2.306},
 {"i":5,"who":"A","text":"Please, I need all my money out. Right now!","start":21.001,"dur":2.183},
 {"i":6,"who":"R","text":"I'm sorry, Alfie. Your money isn't sitting in a box with your name on it.","start":23.525,"dur":3.575},
 {"i":7,"who":"R","text":"When you save a hundred pounds, we lend most of it to people buying homes. We keep only a little as cash.","start":27.32,"dur":5.929},
 {"i":8,"who":"A","text":"What?! So where is my money?!","start":33.369,"dur":1.319},
 {"i":9,"who":"R","text":"In thousands of mortgages. That works perfectly, until everyone asks for it back on the same day.","start":35.028,"dur":5.477},
 {"i":10,"who":"N","text":"That is a bank run. The longer the queue, the more people panic. And the panic itself becomes the crisis.","start":40.726,"dur":6.583},
 {"i":11,"who":"N","text":"It happened to Northern Rock. The queues lasted four days, until the government guaranteed savers' money. Within five months, the bank was nationalised.","start":47.528,"dur":9.871},
 {"i":12,"who":"N","text":"Today, UK savings are protected up to a limit by the Financial Services Compensation Scheme. Check the current limit yourself.","start":57.519,"dur":8.562},
 {"i":13,"who":"A","text":"So... I panicked for nothing?","start":66.201,"dur":1.649},
 {"i":14,"who":"V","text":"Not for nothing. You learned something. Panic is expensive, Alfie.","start":68.19,"dur":3.532},
 {"i":15,"who":"N","text":"Know where your money lives. Stay calm. Check what is protected. This is not financial advice.","start":71.942,"dur":6.669},
 {"i":16,"who":"A","text":"Right. Deep breaths. Fancy a cup of tea?","start":78.83,"dur":2.135}
];
// word timings: split each line's span across its words in proportion to length (+ pause weight after punctuation)
const WORDS = [];
LINES.forEach((L) => {
  const ws = L.text.split(/\s+/);
  const wt = ws.map((w) => w.replace(/[^\w']/g, '').length + 1.5 + (/[.?!]$/.test(w) ? 2.5 : /,$/.test(w) ? 1.2 : 0));
  const tot = wt.reduce((a, b) => a + b, 0);
  let t = L.start;
  const span = L.dur - 0.08;
  ws.forEach((w, k) => {
    const d = span * wt[k] / tot;
    WORDS.push({ line: L.i, w, s: t, e: t + d, who: L.who });
    t += d;
  });
});
(function buildCaptions() {
  const cont = S('caps');
  const NAMEC = { N: '#ffd23f', V: '#ff6fb5', A: '#6cd0ff', R: '#b894ff' };
  LINES.forEach((L) => {
    const ws = WORDS.filter((x) => x.line === L.i);
    const groups = []; let g = [];
    ws.forEach((w, k) => {
      g.push(w);
      const end = /[.?!]$/.test(w.w) || (/,$/.test(w.w) && g.length >= 2) || g.length >= 4;
      if (end || k === ws.length - 1) { groups.push(g); g = []; }
    });
    // merge a trailing single word into the previous group if it is short
    for (let k = groups.length - 1; k > 0; k--) { if (groups[k].length === 1 && groups[k - 1].length < 4) { groups[k - 1] = groups[k - 1].concat(groups[k]); groups.splice(k, 1); } }
    groups.forEach((gr) => {
      const gd = mk(cont, 'cg', {});
      const spans = gr.map((w) => { const s = mk(gd, 'cw', {}, w.w.replace(/^[\"']|[\"']$/g, '')); return s; });
      const t0 = gr[0].s, t1 = Math.min(gr[gr.length - 1].e + 0.06, 81.3);
      tl.fromTo(gd, { opacity: 0, scale: 0.8, y: 14 }, { opacity: 1, scale: 1, y: 0, duration: 0.14, ease: 'back.out(2)' }, Math.max(0, t0 - 0.06));
      tl.set(gd, { opacity: 0 }, t1);
      gr.forEach((w, k) => {
        tl.fromTo(spans[k], { backgroundColor: 'rgba(0,0,0,0)', color: '#fff', scale: 1, '--sc': '#1b1f5e' }, { backgroundColor: NAMEC[L.who], color: '#1b1f5e', scale: 1.12, '--sc': NAMEC[L.who], duration: 0.08, ease: 'power2.out' }, w.s);
        tl.to(spans[k], { backgroundColor: 'rgba(0,0,0,0)', color: '#fff', scale: 1, '--sc': '#1b1f5e', duration: 0.08 }, w.e);
      });
    });
  });
})();
// narrator badge (a posh gentleman in a bowler hat) pops up whenever the narrator speaks
(function narratorBadge() {
  const b = S('badge');
  b.innerHTML = `<div style="position:absolute;left:0;top:0;width:128px;height:128px;border-radius:50%;background:#ffd23f;border:6px solid #1b1f5e;overflow:hidden;box-shadow:0 6px 0 rgba(0,0,0,.25)"><div id="nbp" style="position:absolute;left:-18px;top:6px;width:165px;height:330px"></div></div><div class="tag" style="position:absolute;left:-6px;top:112px;width:140px;font-size:17px;padding:2px 0;background:#1b1f5e;border-width:3px;border-radius:10px">NARRATOR</div>`;
  const np = person(S('nbp'), CAST.narr, 0, 300, 1);
  gsap.set(np.d, { left: 0, top: 0, transformOrigin: '0 0', scaleX: 1.1, scaleY: 1.1 });
  gsap.set(b, { opacity: 0, scale: 0 });
  LINES.filter((L) => L.who === 'N').forEach((L) => {
    pop(b, L.start, { d: 0.3, o: '0% 0%' });
    talk(np, L.start, L.dur, 7);
    tl.to(b, { opacity: 0, scale: 0, duration: 0.2, ease: 'power2.in' }, L.start + L.dur - 0.05);
  });
})();
// scene wipes: coloured strips sweep across, midpoint on the cut
function wipe(tc) {
  const w = S('wipe'), cols = ['#ff3b5c', '#ffd23f', '#19c3b1', '#8e5cff'];
  cols.forEach((c, i) => {
    const s = mk(w, 'strip', { background: c });
    gsap.set(s, { skewX: -12, x: -2200 });
    tl.fromTo(s, { x: -2200 }, { x: 900, duration: 0.6, ease: 'power2.inOut' }, tc - 0.3 + i * 0.06);
  });
}
