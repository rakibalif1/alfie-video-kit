// ===== ILLUSTRATED cast kit (original characters): realistic proportions, real garments, matching skin + hair. Needs kit.js (box, W, H, tl, rnd). =====
// illus(c, {x, y (feet), s, skin, hairStyle, hair, outfit:'kameez'|'saree'|'kurta'|'kaftan'|'ankara'|'blazer'|'jumper', c1, c2, c3 (outfit colours), cover:'hijab'|'gele'|'cap', facial, glasses, T, D})
let _ill = 0;
const SK = { b1: '#f4d3bc', b2: '#efc4a4', b3: '#e6b894', a1: '#d9a074', a2: '#c68e63', a3: '#b07a50', f1: '#8a5a3b', f2: '#6e4529', f3: '#573520' };
const shade = (hex, k) => { const n = parseInt(hex.slice(1), 16), f = (v) => Math.max(0, Math.min(255, Math.round(v + (k > 0 ? (255 - v) : v) * k))); return '#' + [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(f).map((v) => v.toString(16).padStart(2, '0')).join(''); };
function patDef(id, type, a, b, c) {   // SVG <pattern>: ankara | kente | floral | stripe
  const P = {
    ankara: `<rect width="44" height="44" fill="${a}"/><circle cx="22" cy="22" r="14" fill="${b}"/><circle cx="22" cy="22" r="8" fill="${a}"/><circle cx="22" cy="22" r="3.5" fill="${c}"/><path d="M0 0 L8 4 L0 8Z M44 44 L36 40 L44 36Z" fill="${c}"/>`,
    kente: `<rect width="30" height="30" fill="${a}"/><rect x="0" y="0" width="30" height="7" fill="${b}"/><rect x="0" y="12" width="30" height="5" fill="${c}"/><rect x="0" y="22" width="30" height="8" fill="#14101c"/><rect x="4" y="3" width="6" height="2" fill="#fff"/><rect x="18" y="25" width="6" height="2" fill="${a}"/>`,
    floral: `<rect width="22" height="22" fill="${a}"/><circle cx="11" cy="11" r="2.4" fill="${c}"/><circle cx="11" cy="5.5" r="2.6" fill="${b}"/><circle cx="16.5" cy="11" r="2.6" fill="${b}"/><circle cx="11" cy="16.5" r="2.6" fill="${b}"/><circle cx="5.5" cy="11" r="2.6" fill="${b}"/>`,
    stripe: `<rect width="16" height="16" fill="${a}"/><rect width="16" height="4" fill="${b}"/><rect y="9" width="16" height="2" fill="${c}"/>` }[type];
  const w = { ankara: 44, kente: 30, floral: 22, stripe: 16 }[type];
  return `<pattern id="${id}" width="${w}" height="${w}" patternUnits="userSpaceOnUse">${P}</pattern>`;
}
function illusHead(o, id) {
  const sk = o.skin, sd = shade(sk, -0.2), hair = o.hair || '#1a1210', dk = '#2a1810', lip = o.lip || shade(sk, -0.28);
  const curl = (n) => { let s = ''; for (let i = 0; i < n; i++) { const a = Math.PI * (1.05 + (i / (n - 1)) * 0.9), r = 31; s += `<circle cx="${50 + Math.cos(a) * r}" cy="${44 + Math.sin(a) * r * 1.02}" r="${8 + (i % 2) * 2}" fill="${hair}"/>`; } return s; };
  const HB = { natural: curl(11) + `<ellipse cx="50" cy="26" rx="26" ry="14" fill="${hair}"/>`, puff: `<circle cx="50" cy="8" r="17" fill="${hair}"/>` + curl(7),
    braids: `<path d="M20 52 Q16 12 50 8 Q84 12 80 52 L84 118 L72 118 L72 60 L28 60 L28 118 L16 118Z" fill="${hair}"/>`, bun: `<circle cx="50" cy="8" r="12" fill="${hair}"/><path d="M20 54 Q16 12 50 12 Q84 12 80 54 Q78 30 50 26 Q22 30 20 54Z" fill="${hair}"/>`,
    plait: `<path d="M20 54 Q16 12 50 12 Q84 12 80 54 Q78 30 50 26 Q22 30 20 54Z" fill="${hair}"/>`, short: `<path d="M20 54 Q16 12 50 12 Q84 12 80 54 Q78 30 50 26 Q22 30 20 54Z" fill="${hair}"/>`,
    bob: `<path d="M16 60 Q10 8 50 6 Q90 8 84 60 L84 96 Q70 100 66 80 L34 80 Q30 100 16 96Z" fill="${hair}"/>`, pony: `<path d="M20 54 Q16 12 50 12 Q84 12 80 54 Q78 30 50 26 Q22 30 20 54Z" fill="${hair}"/><path d="M78 30 Q104 40 98 86 Q92 70 82 58Z" fill="${hair}"/>`, none: '' }[o.hairStyle || 'short'] || '';
  const HF = { natural: '', puff: '', braids: '', bun: '', plait: `<path d="M24 50 Q30 24 50 24 Q70 24 76 50 Q64 34 50 34 Q36 34 24 50Z" fill="${hair}"/><path d="M70 40 Q92 70 80 130 L70 130 Q78 80 62 50Z" fill="${hair}"/>`,
    short: `<path d="M22 50 Q24 18 50 18 Q78 18 78 50 Q70 30 52 32 Q36 34 30 54Z" fill="${hair}"/>`, bob: `<path d="M22 56 Q22 18 50 16 Q78 18 78 56 Q66 30 50 32 Q36 30 22 56Z" fill="${hair}"/>`, pony: `<path d="M22 54 Q24 18 50 18 Q76 18 78 54 Q66 30 50 32 Q36 30 22 54Z" fill="${hair}"/>`, none: '' }[o.hairStyle || 'short'] || '';
  const cv = o.cover === 'hijab' ? { back: `<path d="M6 70 Q0 -2 50 -4 Q100 -2 94 70 Q100 118 76 132 L24 132 Q0 118 6 70Z" fill="${o.cc1}"/>`, front: `<path d="M20 54 Q22 16 50 14 Q78 16 80 54 Q70 30 50 30 Q30 30 20 54Z" fill="${o.cc1}"/><path d="M16 62 Q10 110 34 124 L24 128 Q0 112 6 70Z M84 62 Q90 110 66 124 L76 128 Q100 112 94 70Z" fill="${o.cc2 || o.cc1}"/>` }
    : o.cover === 'gele' ? { back: '', front: `<path d="M16 46 Q8 -6 52 -10 Q96 -6 86 46 Q70 22 50 24 Q30 22 16 46Z" fill="url(#${o.gp})"/><path d="M14 40 Q10 4 38 -4 Q20 14 24 40Z" fill="${o.cc2}" opacity=".45"/><path d="M40 -10 Q70 -14 90 14 Q84 -2 60 -2Z" fill="${o.cc1}"/><ellipse cx="78" cy="-4" rx="14" ry="9" transform="rotate(-25 78 -4)" fill="url(#${o.gp})"/><ellipse cx="30" cy="-6" rx="12" ry="8" transform="rotate(20 30 -6)" fill="url(#${o.gp})"/>` }
    : o.cover === 'cap' ? { back: '', front: `<path d="M22 40 Q22 6 50 6 Q78 6 78 40 Q50 28 22 40Z" fill="${o.cc1}"/><path d="M24 38 Q50 27 76 38 L76 32 Q50 21 24 32Z" fill="${o.cc2}"/>` } : { back: '', front: '' };
  const eye = (cx) => `<g class="${id}_e"><path d="M${cx - 8} 54 Q${cx} 47 ${cx + 8} 54 Q${cx} 60 ${cx - 8} 54Z" fill="#fff"/><g class="${id}_ir"><circle cx="${cx}" cy="54" r="3.7" fill="${o.eye || '#3a2414'}"/><circle cx="${cx}" cy="54" r="1.8" fill="#000"/><circle cx="${cx - 1.4}" cy="52.6" r="1.1" fill="#fff"/></g><path d="M${cx - 9} 54.5 Q${cx} 46 ${cx + 9} 54.5" fill="none" stroke="${dk}" stroke-width="1.8" stroke-linecap="round"/></g>`;
  const fac = o.facial === 'beard' ? `<path d="M25 62 Q26 94 50 98 Q74 94 75 62 Q71 82 50 85 Q29 82 25 62Z" fill="${hair}"/><path d="M42 78 Q50 74 58 78" stroke="${hair}" stroke-width="3" fill="none"/>` : o.facial === 'stubble' ? `<path d="M26 64 Q28 90 50 94 Q72 90 74 64 Q70 82 50 86 Q30 82 26 64Z" fill="${hair}" opacity=".35"/>` : '';
  const gl = o.glasses ? `<g fill="none" stroke="#2b2d42" stroke-width="2"><circle cx="38" cy="54" r="10.5"/><circle cx="62" cy="54" r="10.5"/><path d="M48.5 53 H51.5"/></g>` : '';
  return `<svg viewBox="0 0 100 110" width="100%" height="100%" style="overflow:visible" data-id="${id}">${cv.back}${HB}<rect x="43" y="82" width="14" height="22" fill="${sd}"/><ellipse cx="23" cy="58" rx="4.5" ry="7" fill="${sk}"/><ellipse cx="77" cy="58" rx="4.5" ry="7" fill="${sk}"/>
  <path d="M24 50 Q24 18 50 18 Q76 18 76 50 Q76 80 50 92 Q24 80 24 50Z" fill="${sk}"/><path d="M76 50 Q76 80 50 92 Q64 84 70 56 Q74 40 70 28Q76 36 76 50Z" fill="${sd}" opacity=".35"/>
  <ellipse cx="32" cy="68" rx="6" ry="3.4" fill="#e8574b" opacity=".18"/><ellipse cx="68" cy="68" rx="6" ry="3.4" fill="#e8574b" opacity=".18"/>
  <g id="${id}_eyes">${eye(38)}${eye(62)}</g>
  <path id="${id}_bl" d="M29 44 Q38 39 46 44" fill="none" stroke="${hair === '#f2f2f2' ? '#999' : (o.brow || hair)}" stroke-width="2.8" stroke-linecap="round"/><path id="${id}_br" d="M54 44 Q62 39 71 44" fill="none" stroke="${o.brow || hair}" stroke-width="2.8" stroke-linecap="round"/>
  <path d="M50 57 Q46.5 67 50 69 Q53 70 54.5 67.5" fill="none" stroke="${sd}" stroke-width="1.7" stroke-linecap="round"/>
  <path id="${id}_m" d="M42 77 Q50 82 58 77" fill="${lip}" stroke="${lip}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${fac}${gl}${HF}${cv.front}</svg>`;
}
const IMOUTH = { laugh: 'M38 74 Q50 98 62 74 Q50 78 38 74Z', smile: 'M42 77 Q50 82 58 77', grin: 'M40 75 Q50 86 60 75 Q50 79 40 75Z', open: 'M43 76 Q50 88 57 76 Q50 73 43 76Z', o: 'M46.5 77 Q50 83 53.5 77 Q50 74 46.5 77Z', frown: 'M43 81 Q50 75 57 81', smirk: 'M43 79 Q52 82 59 74' };
const IBROW = { norm: ['M29 44 Q38 39 46 44', 'M54 44 Q62 39 71 44'], angry: ['M29 41 Q38 43 46 48', 'M54 48 Q62 43 71 41'], sad: ['M29 48 Q38 43 46 41', 'M54 41 Q62 43 71 48'], surp: ['M29 38 Q38 33 46 38', 'M54 38 Q62 33 71 38'], sly: ['M29 43 Q38 41 46 46', 'M54 39 Q62 33 71 37'], happy: ['M29 43 Q38 38 46 43', 'M54 43 Q62 38 71 43'] };
function illus(c, o) {
  const id = 'il' + (++_ill), s = o.s || 1.4, skin = o.skin || SK.a2, sd = shade(skin, -0.18), c1 = o.c1 || '#3a86ff', c2 = o.c2 || '#ffd166', c3 = o.c3 || '#e63946', out = o.outfit || 'blazer', shoeC = o.shoe || '#2b2d42';
  let defs = '', fillA = c1, fillB = c2;
  if (out === 'ankara') { defs += patDef(id + 'p', 'ankara', c1, c2, c3); fillA = `url(#${id}p)`; }
  if (out === 'kameez') { defs += patDef(id + 'b', 'floral', c2, c3, c1); fillB = `url(#${id}b)`; }
  if (out === 'saree') { defs += patDef(id + 'b', 'stripe', c2, c3, c1); fillB = `url(#${id}b)`; }
  const kp = (out === 'kaftan') ? (defs += patDef(id + 'k', 'kente', '#f2c200', '#1a8a3a', '#d62828'), `url(#${id}k)`) : null;
  if (o.cover === 'gele') { defs += patDef(id + 'g', 'ankara', o.cc1 || c3, o.cc2 || c2, c1); o.gp = id + 'g'; }
  const ho = Object.assign({ skin }, o);
  const L = { // [sleeve length upper, sleeve length lower, sleeve half-width, flare]
    kameez: [52, 40, 9, 1], saree: [30, 0, 9, 0], kurta: [52, 44, 9, 1], kaftan: [52, 44, 14, 6], ankara: [26, 0, 9, 3], blazer: [52, 44, 9, 0], jumper: [52, 44, 9, 0] }[out];
  const sleeveCol = { kameez: c1, saree: c1, kurta: c1, kaftan: c1, ankara: fillA, blazer: c1, jumper: c3 }[out];
  const arm = (side) => { const sx = side === 'f' ? 112 : 48, w = L[2], f = L[3];
    return `<g id="${id}_a${side}"><path d="M${sx - 7} 90 L${sx - 6} 138 L${sx + 6} 138 L${sx + 7} 90Z" fill="${skin}"/><path d="M${sx - w - 1} 92 Q${sx} 76 ${sx + w + 1} 92 Q${sx + w + f} 100 ${sx + w + f} ${84 + L[0]} L${sx - w - f} ${84 + L[0]} Q${sx - w - f} 100 ${sx - w - 1} 92Z" fill="${sleeveCol}"/>
      <g id="${id}_f${side}"><path d="M${sx - 6} 136 L${sx - 5.5} 184 L${sx + 5.5} 184 L${sx + 6} 136Z" fill="${skin}"/>${L[1] ? `<path d="M${sx - w - f} 134 L${sx - w - f + 1} ${134 + L[1]} L${sx + w + f - 1} ${134 + L[1]} L${sx + w + f} 134Z" fill="${sleeveCol}"/><rect x="${sx - w - f + 1}" y="${134 + L[1] - 4}" width="${2 * (w + f) - 2}" height="5" fill="${out === 'kaftan' || out === 'kameez' ? c2 : shade(sleeveCol, -0.25)}"/>` : ''}<path d="M${sx - 6} 182 Q${sx - 9} 194 ${sx - 4} 199 Q${sx + 2} 202 ${sx + 7} 195 Q${sx + 8} 187 ${sx + 6} 182Z" fill="${skin}"/>${out === 'saree' || out === 'kameez' ? `<path d="M${sx - 6} 178 H${sx + 6}" stroke="${c2}" stroke-width="3"/><path d="M${sx - 6} 172 H${sx + 6}" stroke="${c3}" stroke-width="2.4"/>` : ''}</g></g>`; };
  const LSET = (col, to, w, shoe, top = 200, bare = false) => { const xl = 68, xr = 92, ww = w || 9; const leg = (x) => col ? `<path d="M${x - ww} ${top} L${x - ww + 1} ${to} L${x + ww - 1} ${to} L${x + ww} ${top}Z" fill="${col}"/>` : '';
    return `<g id="${id}_l1">${leg(xl)}<path d="M${xl - ww} 302 L${xl - ww} 318 Q${xl - ww - 14} 321 ${xl - ww - 16} 326 L${xl + ww + 2} 326 L${xl + ww} 304Z" fill="${shoe}"/></g><g id="${id}_l2">${leg(xr)}<path d="M${xr + ww} 302 L${xr + ww} 318 Q${xr + ww + 14} 321 ${xr + ww + 16} 326 L${xr - ww - 2} 326 L${xr - ww} 304Z" fill="${shoe}"/></g>`; };
  const legs = (col, to = 306, w = 11) => `<path d="M${80 - w - 12} 200 L${80 - w - 14} ${to} L${80 - 3} ${to} L${80 - 1} 200Z M${80 + w + 12} 200 L${80 + w + 14} ${to} L${80 + 3} ${to} L${80 + 1} 200Z" fill="${col}"/>`;
  const shoes = (col) => `<path d="M52 300 L52 318 Q40 322 38 326 L72 326 L74 302Z M108 300 L108 318 Q120 322 122 326 L88 326 L86 302Z" fill="${col}"/>`;
  const barelegs = (to) => `<path d="M62 ${to} L61 308 L74 308 L75 ${to}Z M98 ${to} L99 308 L86 308 L85 ${to}Z" fill="${skin}"/>`;
  let back = '', body = '', over = '', lower = '';
  if (out === 'kameez') { lower = LSET(c3, 308, 8, '#9b2226'); body = `<path d="M46 86 Q80 78 114 86 L120 170 L130 252 Q80 264 30 252 L40 170Z" fill="${c1}"/><path d="M30 238 Q80 250 130 238 L130 252 Q80 264 30 252Z" fill="${fillB}"/><path d="M66 82 Q80 100 94 82" fill="none" stroke="${c2}" stroke-width="3"/><path d="M80 98 L80 150" stroke="${shade(c1, -0.2)}" stroke-width="1.5"/>`; over = `<path d="M52 86 Q82 96 112 124 Q118 168 100 214 L116 214 Q132 160 120 112 Q98 84 72 84Z" fill="${c3}"/><path d="M104 150 Q108 190 100 214" stroke="${c2}" stroke-width="3" fill="none"/>`; back = `<path d="M44 90 Q32 150 38 240 L58 240 Q52 150 60 96Z" fill="${c3}"/>`; }
  if (out === 'saree') { lower = LSET(null, 0, 9, '#6d4c41'); body = `<rect x="52" y="124" width="56" height="16" fill="${skin}"/><path d="M48 128 L34 306 Q80 318 126 306 L112 128Z" fill="${c1}"/><path d="M34 292 Q80 304 126 292 L126 306 Q80 318 34 306Z" fill="${fillB}"/><path d="M70 140 L64 300 M82 140 L80 304 M94 140 L98 300" stroke="${shade(c1, -0.22)}" stroke-width="2" fill="none"/><path d="M46 86 Q80 78 114 86 L112 130 Q80 138 48 130Z" fill="${c3}"/><path d="M68 82 Q80 98 92 82" fill="none" stroke="${c2}" stroke-width="3"/>`; over = `<path d="M40 86 Q74 104 120 142 L126 178 Q84 160 56 122 L36 96Z" fill="${c2}"/><path d="M40 86 Q74 104 120 142" stroke="${c3}" stroke-width="3" fill="none"/><path d="M104 150 Q134 208 122 270 L100 270 Q106 206 98 160Z" fill="${c2}"/><path d="M100 262 H122" stroke="${c3}" stroke-width="4"/>`; }
  if (out === 'kurta') { lower = LSET('#f1ede4', 308, 9, '#5a3a22'); body = `<path d="M46 86 Q80 78 114 86 L122 168 L128 240 Q80 250 32 240 L38 168Z" fill="${c1}"/><rect x="70" y="80" width="20" height="8" rx="3" fill="${shade(c1, -0.2)}"/><path d="M80 90 L80 200" stroke="${shade(c1, -0.25)}" stroke-width="2"/>${[104, 128, 152, 176].map((y) => `<circle cx="80" cy="${y}" r="2.2" fill="${shade(c1, -0.35)}"/>`).join('')}`; over = `<path d="M47 88 L68 92 L66 188 L38 180Z M113 88 L92 92 L94 188 L122 180Z" fill="${c3}"/><path d="M68 92 L66 188 M92 92 L94 188" stroke="${c2}" stroke-width="2.5"/>`; }
  if (out === 'kaftan') { lower = LSET(shade(c1, -0.1), 308, 9, '#3b2a1a', 250); body = `<path d="M44 86 Q80 78 116 86 L127 170 L136 264 Q80 276 24 264 L33 170Z" fill="${c1}"/><path d="M62 82 Q80 114 98 82 L98 94 Q80 126 62 94Z" fill="${c2}"/><path d="M66 100 L94 100 M70 112 L90 112" stroke="${c2}" stroke-width="2"/>`; over = `<path d="M52 84 Q58 150 62 218 L78 218 Q70 150 66 90Z" fill="${kp}"/><path d="M108 84 Q102 150 98 218 L82 218 Q90 150 94 90Z" fill="${kp}"/>`; }
  if (out === 'ankara') { lower = LSET(skin, 308, 6, '#7b2d26', 270); body = `<path d="M48 86 Q80 78 112 86 L110 148 Q134 176 142 282 Q80 298 18 282 Q26 176 50 148Z" fill="${fillA}"/><path d="M50 146 Q80 156 110 146 L111 160 Q80 170 49 160Z" fill="${c3}"/><path d="M62 82 Q80 98 98 82" fill="none" stroke="${c2}" stroke-width="2.6"/>`; over = `<g>${[64, 70, 76, 82, 88, 94, 100].map((x, i) => `<circle cx="${x}" cy="${96 + Math.abs(i - 3) * 2.6}" r="2.4" fill="${c2}"/>`).join('')}</g>`; }
  if (out === 'blazer') { lower = LSET('#4a4e69', 308, 10, '#1b1b24'); body = `<path d="M46 86 Q80 78 114 86 L118 176 L42 176Z" fill="${c1}"/><path d="M66 84 L80 142 L94 84Z" fill="#fff"/><path d="M64 84 L78 150 L52 120Z M96 84 L82 150 L108 120Z" fill="${shade(c1, -0.15)}"/><path d="M80 150 L80 176" stroke="${shade(c1, -0.3)}" stroke-width="2"/>`; }
  if (out === 'jumper') { lower = LSET('#8d6e4a', 308, 10, '#f1f1f1'); body = `<path d="M46 86 Q80 78 114 86 L120 180 L40 180Z" fill="${c3}"/><path d="M66 82 L80 112 L94 82Z" fill="#cfe8ff"/><path d="M62 82 L80 118 L98 82 L98 90 L80 126 L62 90Z" fill="${shade(c3, -0.25)}"/><path d="M40 170 H120" stroke="${shade(c3, -0.25)}" stroke-width="6"/>`; }
  const g = box(c, { left: o.x - 80 * s, top: o.y - 326 * s, width: 160 * s, height: 330 * s, opacity: o.opacity ?? 1 });
  g.innerHTML = `<svg viewBox="0 0 160 330" width="100%" height="100%" style="overflow:visible"><defs>${defs}</defs><ellipse cx="80" cy="326" rx="52" ry="6" fill="rgba(0,0,0,.18)"/>${lower}<g id="${id}_t"><g id="${id}_dr0">${back}</g>${body}<g id="${id}_ab">${arm('b')}</g><g id="${id}_dr1">${over}</g><g id="${id}_af">${arm('f')}</g><g id="${id}_h"><g transform="translate(50 24) scale(.6)">${illusHead(ho, id)}</g></g></g></svg>`;
  if (o.flip) gsap.set(g, { scaleX: -1 });
  const q = (k) => g.querySelector('#' + id + '_' + k), P = { t: q('t'), h: q('h'), ab: q('ab'), af: q('af'), abf: q('fb'), aff: q('ff'), dr0: q('dr0'), dr1: q('dr1') };
  const hs = g.querySelector('svg[data-id]'), hid = hs.dataset.id, hq = (k) => hs.querySelector('#' + hid + '_' + k);
  const eyes = hq('eyes'), mouth = hq('m'), bl = hq('bl'), br = hq('br');
  gsap.set(P.ab, { svgOrigin: '48 86' }); gsap.set(P.af, { svgOrigin: '112 86' }); gsap.set(P.abf, { svgOrigin: '48 136' }); gsap.set(P.aff, { svgOrigin: '112 136' });
  gsap.set(P.h, { svgOrigin: '80 80' }); gsap.set(P.t, { svgOrigin: '80 180' }); gsap.set(eyes, { svgOrigin: '50 54' }); gsap.set([P.dr0, P.dr1], { svgOrigin: '80 90' });
  gsap.set(P.ab, { rotation: 3 }); gsap.set(P.af, { rotation: -3 });
  const api = { g, P, face: { eyes, mouth } };
  const legA = q('l1'), legB = q('l2'); if (legA) { gsap.set(legA, { svgOrigin: '68 198' }); gsap.set(legB, { svgOrigin: '92 198' }); }
  const irs = [...g.querySelectorAll('[class$="_ir"]')];
  // idle life: breathing, weight shift, torso lean, head micro-motion, arm and cloth sway (never frozen)
  api.breathe = (T, D) => { const n = Math.max(1, Math.floor(D / 3.4)), r = (a, b) => a + rnd() * (b - a);
    tl.to(P.t, { scaleY: 1.014, duration: 1.7, yoyo: true, repeat: n * 2, ease: 'sine.inOut' }, T);
    tl.to(P.h, { y: -1.2, duration: 1.7, yoyo: true, repeat: n * 2, ease: 'sine.inOut' }, T + 0.2);
    tl.to(P.t, { rotation: r(1, 1.8), x: r(1.5, 3), duration: r(2.6, 3.4), yoyo: true, repeat: Math.floor(D / 3), ease: 'sine.inOut' }, T);          // weight shift / lean
    tl.to(P.h, { rotation: r(1.5, 3), duration: r(2.2, 3), yoyo: true, repeat: Math.floor(D / 2.6), ease: 'sine.inOut' }, T + 0.4);
    tl.to(P.af, { rotation: -6, duration: r(2, 3), yoyo: true, repeat: Math.floor(D / 2.5), ease: 'sine.inOut' }, T + 0.3); tl.to(P.ab, { rotation: 6, duration: r(2, 3), yoyo: true, repeat: Math.floor(D / 2.5), ease: 'sine.inOut' }, T + 0.7);
    tl.to([P.dr0, P.dr1], { rotation: 1.8, duration: 2.2, yoyo: true, repeat: Math.floor(D / 2.2), ease: 'sine.inOut' }, T); };
  api.blink = (T, D) => { for (let t = T + 1.3; t < T + D; t += 2.6 + rnd() * 2.4) { tl.to(eyes, { scaleY: 0.1, duration: 0.07, yoyo: true, repeat: 1 }, t); if (rnd() < 0.2) tl.to(eyes, { scaleY: 0.1, duration: 0.07, yoyo: true, repeat: 1 }, t + 0.3); } };
  api.look = (dx, dy, T, d = 0.3) => tl.to(irs, { x: dx, y: dy || 0, duration: d, ease: 'power2.out' }, T);
  api.emote = (name, T) => { const b = IBROW[{ angry: 'angry', sad: 'sad', surprised: 'surp', sly: 'sly', happy: 'happy', laugh: 'happy', normal: 'norm' }[name] || 'norm'];
    const m = { angry: IMOUTH.frown, sad: IMOUTH.frown, surprised: IMOUTH.o, sly: IMOUTH.smirk, happy: IMOUTH.grin, laugh: IMOUTH.laugh, normal: IMOUTH.smile }[name] || IMOUTH.smile;
    tl.set(bl, { attr: { d: b[0] } }, T); tl.set(br, { attr: { d: b[1] } }, T); tl.set(mouth, { attr: { d: m } }, T);
    tl.to(eyes, { scaleY: name === 'laugh' ? 0.3 : name === 'happy' ? 0.82 : name === 'surprised' ? 1.18 : name === 'sad' ? 0.8 : 1, duration: 0.12 }, T);
    if (name === 'angry') { tl.to(P.h, { rotation: 3, y: 2, duration: 0.3 }, T); } if (name === 'surprised') { tl.fromTo(P.t, { y: 0 }, { y: -4, duration: 0.15, yoyo: true, repeat: 1 }, T); } };
  api.talk = (T, D) => { for (let t = T; t < T + D - 0.2; t += 0.15) { tl.set(mouth, { attr: { d: [IMOUTH.o, IMOUTH.open, IMOUTH.smile, IMOUTH.open, IMOUTH.grin][Math.floor(rnd() * 5)] } }, t); }
    tl.set(mouth, { attr: { d: IMOUTH.smile } }, T + D);
    for (let t = T; t < T + D - 0.5; t += 0.55 + rnd() * 0.3) { tl.to(P.h, { y: 2, rotation: (rnd() - 0.5) * 5, duration: 0.18, ease: 'sine.out' }, t); tl.to(P.h, { y: -0.5, duration: 0.25, ease: 'sine.inOut' }, t + 0.2); } };
  api.head = (deg, T, d = 1.2) => tl.to(P.h, { rotation: deg, duration: d, ease: 'sine.inOut' }, T);
  api.arm = (side, sh, el, T, d = 0.8) => { tl.to(side === 'f' ? P.af : P.ab, { rotation: sh, duration: d, ease: 'sine.inOut' }, T); tl.to(side === 'f' ? P.aff : P.abf, { rotation: el, duration: d, ease: 'sine.inOut' }, T); };
  // expressive talking gestures: lift, beat, open palm, return; opposite arm joins sometimes; torso turns into the gesture
  api.gesture = (T, D) => { let t = T, k = 0; while (t < T + D - 0.7) { const side = k % 3 === 2 ? 'b' : 'f', up = -45 - rnd() * 40, bend = -30 - rnd() * 50; api.arm(side, up, bend, t, 0.4); tl.to(P.t, { rotation: side === 'f' ? -2 : 2, duration: 0.4 }, t);
      api.arm(side, up + 14, bend + 14, t + 0.5, 0.25); api.arm(side, up, bend, t + 0.75, 0.25); api.arm(side, -5, -8, t + 1.1, 0.5); tl.to(P.t, { rotation: 0, duration: 0.5 }, t + 1.1); t += 1.7 + rnd() * 0.9; k++; } };
  api.laugh = (T, D) => { api.emote('laugh', T); for (let t = T; t < T + D; t += 0.2) { tl.to(P.t, { y: 3, duration: 0.1, yoyo: true, repeat: 1 }, t); tl.set(mouth, { attr: { d: t % 0.4 < 0.2 ? IMOUTH.laugh : IMOUTH.open } }, t); }
    tl.to(P.h, { rotation: -7, duration: 0.3 }, T); for (let t = T + 0.3; t < T + D; t += 0.3) tl.to(P.h, { rotation: (t % 0.6 < 0.3) ? -9 : -4, duration: 0.15 }, t); tl.to(P.aff, { rotation: -80, duration: 0.3 }, T); tl.to(P.af, { rotation: -30, duration: 0.3 }, T);
    tl.to([P.af, P.aff, P.h], { rotation: 0, duration: 0.4 }, T + D); api.emote('normal', T + D + 0.05); };
  api.walk = (T, D, dx = 0, p = 0.6) => { const n = Math.max(1, Math.floor(D / p));
    tl.fromTo(legA, { rotation: 20 }, { rotation: -20, duration: p, repeat: n, yoyo: true, ease: 'sine.inOut' }, T); tl.fromTo(legB, { rotation: -20 }, { rotation: 20, duration: p, repeat: n, yoyo: true, ease: 'sine.inOut' }, T);
    tl.fromTo(P.af, { rotation: -18 }, { rotation: 18, duration: p, repeat: n, yoyo: true, ease: 'sine.inOut' }, T); tl.fromTo(P.ab, { rotation: 18 }, { rotation: -18, duration: p, repeat: n, yoyo: true, ease: 'sine.inOut' }, T);
    tl.fromTo(P.t, { y: 0, rotation: -1.5 }, { y: -4, rotation: 1.5, duration: p / 2, repeat: n * 2 + 1, yoyo: true, ease: 'sine.inOut' }, T); tl.fromTo([P.dr0, P.dr1], { rotation: -4 }, { rotation: 5, duration: p, repeat: n, yoyo: true, ease: 'sine.inOut' }, T);
    if (dx) tl.fromTo(g, { x: 0 }, { x: dx, duration: D, ease: 'none' }, T); };
  if (o.T !== undefined) api.blink(o.T, o.D || 20);
  return api;
}
// the illustrated cast: outfit and appearance match each other
const ICAST = {
  amina: { name: 'AMINA', note: 'Pakistan · salwar kameez + hijab', skin: SK.a2, hairStyle: 'none', cover: 'hijab', cc1: '#c2185b', cc2: '#e91e63', eye: '#3a2414', outfit: 'kameez', c1: '#e91e63', c2: '#ffd166', c3: '#8e24aa' },
  priya: { name: 'PRIYA', note: 'India · saree', skin: SK.a1, hairStyle: 'plait', hair: '#1a1210', outfit: 'saree', c1: '#2a9d8f', c2: '#f4a261', c3: '#9b2226', lip: '#b5485a' },
  rahim: { name: 'RAHIM', note: 'Bangladesh · kurta + waistcoat', skin: SK.a3, hairStyle: 'short', hair: '#14100e', facial: 'stubble', outfit: 'kurta', c1: '#e9f5db', c2: '#bc6c25', c3: '#283618' },
  kofi: { name: 'KOFI', note: 'Ghana · kaftan + kente stole', skin: SK.f2, hairStyle: 'none', hair: '#0b0b10', cover: 'cap', cc1: '#8b5e34', cc2: '#f2c200', outfit: 'kaftan', c1: '#1b4332', c2: '#f2c200', c3: '#d62828', brow: '#0b0b10' },
  ada: { name: 'ADA', note: 'Nigeria · Ankara dress + gele', skin: SK.f1, hairStyle: 'none', hair: '#0b0b10', cover: 'gele', cc1: '#f72585', cc2: '#ffd60a', outfit: 'ankara', c1: '#1d3557', c2: '#f4a261', c3: '#e63946', brow: '#0b0b10', lip: '#7b2d26' },
  emma: { name: 'EMMA', note: 'Britain · blazer + blouse', skin: SK.b1, hairStyle: 'bob', hair: '#6b4423', eye: '#4a7c59', outfit: 'blazer', c1: '#1d3557', lip: '#c4545f' },
  tom: { name: 'TOM', note: 'Britain · shirt + jumper', skin: SK.b2, hairStyle: 'short', hair: '#a8501c', eye: '#5b7fa6', outfit: 'jumper', c1: '#cfe8ff', c3: '#9b2226', facial: 'stubble' }
};
