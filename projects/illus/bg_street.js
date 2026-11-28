// bg_street.js - ukStreet(w,{T,D}): UK road (y 470..620) + pavement (y 620..720), traffic keeps LEFT.
// Near (lower) lanes move right-to-left, far (upper) lanes left-to-right. Everything deterministic (rr seeds only).
(function () {
'use strict';
const UK_BRANDS = ["Argos", "Nando's", "Pret", "Greggs"];          // real names (own lettering, positive context only)
const GEN = ["HOME STORE", "TAKEAWAY", "COFFEE", "BAKERY"];            // used when window.NO_BRANDS = true
const BR = i => String(window.NO_BRANDS ? GEN[i] : UK_BRANDS[i]).toUpperCase();

function shade(h, k) { const n = parseInt(h.slice(1), 16); const f = c => Math.max(0, Math.min(255, Math.round(k < 0 ? c * (1 + k) : c + (255 - c) * k))); return '#' + ((1 << 24) + (f(n >> 16) << 16) + (f((n >> 8) & 255) << 8) + f(n & 255)).toString(16).slice(1); }
function sv(p, x, y, w, h, vw, vh, inner, css) { return box(p, Object.assign({ left: x, top: y, width: w, height: h }, css || {}), `<svg viewBox="0 0 ${vw} ${vh}" width="${w}" height="${h}" style="overflow:visible;display:block">${inner}</svg>`); }
// repeating tween, stays inside [T, T+D]
function lp(el, from, to, dur, T, D, o) { o = o || {}; const rd = o.repeatDelay || 0; tl.fromTo(el, from, Object.assign({ duration: dur, repeat: Math.max(0, Math.floor(D / (dur + rd)) - 1), ease: 'none', immediateRender: false }, to, o), T); }
// conveyor: x from x0 to x1 (loops), starting at progress s px, speed v px/s, covering exactly [T,T+D]
function conv(el, x0, x1, s, v, T, D) {
  const sg = Math.sign(x1 - x0), S = Math.abs(x1 - x0); let t = 0;
  const first = (S - s) / v;
  if (first >= D) { tl.fromTo(el, { x: x0 + sg * s }, { x: x0 + sg * (s + v * D), duration: D, ease: 'none' }, T); return; }
  tl.fromTo(el, { x: x0 + sg * s }, { x: x1, duration: first, ease: 'none' }, T); t = first;
  const P = S / v, n = Math.floor((D - t) / P);
  if (n > 0) { tl.fromTo(el, { x: x0 }, { x: x1, duration: P, repeat: n - 1, ease: 'none', immediateRender: false }, T + t); t += n * P; }
  const rem = D - t; if (rem > 0.02) tl.fromTo(el, { x: x0 }, { x: x0 + sg * v * rem, duration: rem, ease: 'none', immediateRender: false }, T + t);
}
const prog = (at, x0, dir, S) => (((dir * (at - x0)) % S) + S) % S;
const SK = ['#f2c9a8', '#e3b08a', '#c98e62', '#a8693f', '#7b4b2c', '#58341f', '#3a2214'];
const tx = (f, w, x, y, s, sz, fill, wt) => `<text transform="translate(${x} ${y})${f ? ' scale(-1 1)' : ''}" text-anchor="middle" font-family="Arial Black,Arial" font-weight="${wt || 900}" font-size="${sz}" fill="${fill}">${s}</text>`;
const whl = (cx, cy, r) => `<g transform="translate(${cx} ${cy})"><g class="wh"><circle r="${r}" fill="#1c1d22"/><circle r="${(r * .64).toFixed(1)}" fill="#cfd2d8"/><circle r="${(r * .2).toFixed(1)}" fill="#5d626a"/>${[0, 72, 144, 216, 288].map(a => `<line x2="${(r * .6 * Math.cos(a * Math.PI / 180)).toFixed(1)}" y2="${(r * .6 * Math.sin(a * Math.PI / 180)).toFixed(1)}" stroke="#4a4f57" stroke-width="1.5"/>`).join('')}<circle cx="${(r * .42).toFixed(1)}" r="${(r * .1).toFixed(1)}" fill="#e53935"/></g></g>`;
const hd = (cx, cy, r, sk, hr) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${sk}"/><path d="M${cx - r} ${cy} Q${cx - r * .3} ${cy - r * 1.5} ${cx + r * .9} ${cy - r * .5} L${cx + r * .6} ${cy - r * .2} Q${cx} ${cy - r * .7} ${cx - r} ${cy + r * .2}Z" fill="${hr}"/>`;
const WIN = '#bfe4f4', WIN2 = '#8cc3de';
const lights = (w, hy, ty, hx) => `<ellipse class="hl" cx="${w + 18}" cy="${hy}" rx="30" ry="9" fill="rgba(255,244,170,.38)"/><rect x="${w - 9}" y="${hy - 3}" width="8" height="6" rx="2" fill="#fff7c4"/><rect x="2" y="${ty - 3}" width="6" height="7" rx="2" fill="#d8201c"/><ellipse class="brk" cx="0" cy="${ty}" rx="13" ry="8" fill="rgba(255,50,40,.7)" style="opacity:0"/>`;

// ---------- vehicles (drawn facing right; mirrored by f for the near lanes) ----------
const VT = {
  hatch(f, o) { const c = o.col, w = 180, h = 64, d = shade(c, -.32);
    return { w, h, wheels: [[42, 52, 11], [140, 52, 11]], exh: [2, 52], body:
      `<path d="M4 46 L4 34 Q4 30 10 29 L38 27 L52 10 Q54 8 58 8 L112 8 Q118 8 122 12 L142 27 L168 30 Q178 32 178 40 L178 46 Q178 50 172 50 L10 50 Q4 50 4 46Z" fill="${c}"/>
      <path d="M48 27 L58 12 L84 12 L84 27Z" fill="${WIN}"/><path d="M88 27 L88 12 L112 12 L130 27Z" fill="${WIN}"/><path d="M60 14 L66 14 L56 26 L50 26Z" fill="#fff" opacity=".5"/>
      <circle cx="68" cy="21" r="4.6" fill="${SK[o.sk || 2]}"/><circle cx="104" cy="20" r="4.6" fill="${SK[(o.sk || 2) + 2 > 6 ? 1 : (o.sk || 2) + 2]}"/><path d="M86 28 V48" stroke="${d}" stroke-width="1.5"/><rect x="92" y="31" width="8" height="2.4" rx="1" fill="${d}"/>
      <rect x="6" y="43" width="168" height="5" fill="rgba(0,0,0,.22)"/><circle cx="42" cy="50" r="14" fill="#25262b"/><circle cx="140" cy="50" r="14" fill="#25262b"/>
      <rect x="130" y="25" width="7" height="4" rx="1.5" fill="${d}"/><rect x="167" y="41" width="9" height="4" fill="#f5f5f0"/><rect x="4" y="41" width="7" height="4" fill="#f0c91c"/>${lights(w - 2, 35, 36)}` }; },
  taxi(f, o) { const w = 190, h = 72;
    return { w, h, wheels: [[44, 58, 12], [146, 58, 12]], exh: [2, 58], body:
      `<path d="M4 50 L4 38 Q4 32 12 31 L44 30 L48 12 Q50 8 56 8 L124 8 Q130 8 132 14 L136 30 L176 34 Q186 36 186 44 L186 50 Q186 54 180 54 L10 54Z" fill="#202228"/>
      <path d="M54 29 L56 13 L86 13 L86 29Z" fill="${WIN}"/><path d="M90 29 L90 13 L122 13 L128 29Z" fill="${WIN}"/><circle cx="106" cy="23" r="4.8" fill="${SK[3]}"/><circle cx="68" cy="23" r="4.6" fill="${SK[1]}"/><rect x="88" y="13" width="2.4" height="16" fill="#202228"/>
      <rect x="76" y="0" width="32" height="9" rx="2" fill="#ffd95a"/>${tx(f, w, 92, 7.6, 'TAXI', 8, '#2a2a2a')}<rect x="6" y="46" width="176" height="5" fill="rgba(255,255,255,.14)"/>
      <circle cx="44" cy="54" r="15" fill="#15161a"/><circle cx="146" cy="54" r="15" fill="#15161a"/><rect x="170" y="44" width="10" height="4" fill="#f5f5f0"/><rect x="4" y="44" width="7" height="4" fill="#f0c91c"/>${lights(w - 4, 40, 40)}` }; },
  van(f, o) { const w = 236, h = 86, c = o.col || '#f3f3f0';
    return { w, h, wheels: [[50, 73, 13], [196, 73, 13]], exh: [2, 70], body:
      `<path d="M4 68 L4 8 Q4 4 8 4 L156 4 L156 26 L192 26 Q200 26 206 33 L228 50 Q234 54 234 60 L234 68 Q234 72 228 72 L10 72 Q4 72 4 68Z" fill="${c}"/>
      <rect x="4" y="52" width="152" height="8" fill="${o.st || '#2b6cb0'}"/><rect x="4" y="62" width="152" height="3" fill="${o.st || '#2b6cb0'}" opacity=".6"/>${tx(f, w, 80, 38, BR(o.b || 0), 15, o.st || '#2b6cb0')}
      <path d="M170 28 L194 28 L216 50 L170 50Z" fill="${WIN}"/><circle cx="184" cy="38" r="5" fill="${SK[4]}"/><path d="M158 26 V70" stroke="#c9c9c4" stroke-width="1.5"/>
      <circle cx="50" cy="72" r="16" fill="#25262b"/><circle cx="196" cy="72" r="16" fill="#25262b"/><rect x="224" y="58" width="9" height="5" fill="#f5f5f0"/>${lights(w - 2, 52, 52)}` }; },
  bus(f, o) { const w = 334, h = 126, c = o.col || '#d6232b', rt = o.rt || '25'; let win = '';
    for (let i = 0; i < 8; i++) { win += `<rect x="${18 + i * 35}" y="14" width="31" height="27" rx="3" fill="${WIN}"/>`; if ([0, 2, 3, 5, 7].includes(i)) win += `<circle cx="${33 + i * 35}" cy="${27 + (i % 2)}" r="5" fill="${SK[(i * 3 + 1) % 7]}"/><path d="M${28 + i * 35} 26 q5 -9 10 0z" fill="${['#2a1c14', '#c9a24a', '#1b1b1b', '#6b3a1e'][i % 4]}"/>`; }
    for (let i = 0; i < 5; i++) { win += `<rect x="${18 + i * 35}" y="55" width="31" height="26" rx="3" fill="${WIN}"/>`; if ([1, 3, 4].includes(i)) win += `<circle cx="${33 + i * 35}" cy="${68}" r="5" fill="${SK[(i * 2 + 3) % 7]}"/><path d="M${28 + i * 35} 67 q5 -9 10 0z" fill="#2b1d16"/>`; }
    win += `<rect x="198" y="52" width="38" height="46" rx="2" fill="#5d7f95"/><line x1="217" y1="52" x2="217" y2="98" stroke="#2e4452" stroke-width="2"/>`;
    win += `<rect x="244" y="55" width="70" height="30" rx="4" fill="${WIN}"/><circle cx="296" cy="68" r="5.4" fill="${SK[2]}"/><path d="M290 67 q6 -10 12 0z" fill="#20160f"/>`;
    return { w, h, wheels: [[72, 111, 15], [266, 111, 15]], exh: [2, 100], body:
      `<rect x="4" y="3" width="326" height="100" rx="11" fill="${c}"/><rect x="4" y="3" width="326" height="6" rx="3" fill="${shade(c, -.25)}"/><rect x="4" y="40" width="326" height="13" fill="${shade(c, -.14)}"/>${win}
      <rect x="244" y="42" width="72" height="10" rx="2" fill="#15130e"/>${tx(f, w, 280, 50.3, rt + '  Town Centre', 8.2, '#ffb52e', 700)}
      <rect x="22" y="85" width="168" height="15" rx="3" fill="#fbf2d9"/><rect x="22" y="85" width="40" height="15" rx="3" fill="#ef7d22"/>${tx(f, w, 42, 96.4, BR(2), 9, '#fff')}${tx(f, w, 128, 96.6, 'Fresh, hot, every day', 8, '#7a4a1b', 700)}
      <rect x="4" y="100" width="326" height="8" fill="#2a2a2e"/><circle cx="72" cy="108" r="19" fill="#202126"/><circle cx="266" cy="108" r="19" fill="#202126"/>
      <rect x="320" y="84" width="9" height="7" rx="2" fill="#fff7c4"/><rect x="4" y="84" width="7" height="9" rx="2" fill="#e8281f"/>${lights(w - 6, 87, 88)}` }; },
  lorry(f, o) { const w = 290, h = 118;
    return { w, h, wheels: [[62, 102, 14], [122, 102, 14], [246, 102, 14]], exh: [264, 0], body:
      `<rect x="6" y="14" width="206" height="82" rx="7" fill="#2f7d4a"/><rect x="6" y="64" width="206" height="8" fill="#eaf3e8"/><rect x="0" y="22" width="9" height="74" fill="#555a60"/>${tx(f, w, 108, 52, 'WASTE &amp; RECYCLING', 12, '#fff')}${tx(f, w, 108, 62, 'COUNCIL SERVICES', 6.5, '#d8ecd8', 700)}
      <path d="M214 34 L252 34 Q262 34 267 44 L284 66 Q288 72 288 78 L288 98 L214 98Z" fill="#e8eaea"/><path d="M228 40 L252 40 Q258 40 262 47 L272 62 L228 62Z" fill="${WIN}"/><circle cx="244" cy="52" r="5.4" fill="${SK[5]}"/><path d="M238 51 q6 -9 12 0z" fill="#e8601a"/>
      <rect x="2" y="48" width="12" height="38" rx="4" fill="#ff7a14"/><rect x="2" y="56" width="12" height="3" fill="#f2f5d0"/><circle cx="8" cy="40" r="6" fill="${SK[4]}"/><path d="M2 38 q6 -9 12 0z" fill="#ffd400"/><rect x="2" y="84" width="5" height="14" fill="#2b2f45"/><rect x="9" y="84" width="5" height="14" fill="#2b2f45"/>
      <rect x="261" y="0" width="5" height="34" fill="#4c4f55"/><circle class="bcn" cx="240" cy="28" r="5" fill="#ffae00"/><rect x="214" y="90" width="76" height="8" fill="#2d2f35"/>
      <circle cx="62" cy="102" r="17" fill="#25262b"/><circle cx="122" cy="102" r="17" fill="#25262b"/><circle cx="246" cy="102" r="17" fill="#25262b"/><rect x="278" y="76" width="9" height="6" fill="#fff7c4"/>${lights(w - 2, 80, 80)}` }; },
  moped(f, o) { const w = 112, h = 80;
    return { w, h, wheels: [[22, 66, 12], [90, 66, 12]], exh: [4, 62], body:
      `<rect x="3" y="12" width="42" height="28" rx="4" fill="#d9531e"/><rect x="3" y="12" width="42" height="5" rx="2" fill="${shade('#d9531e', -.25)}"/>${tx(f, w, 24, 31, BR(1), 8, '#fff')}
      <path d="M26 56 Q26 46 40 46 L70 46 L74 36 L84 36 L86 60 L74 62 L36 62Z" fill="#2f5aa8"/><rect x="34" y="40" width="30" height="7" rx="3" fill="#222"/>
      <path d="M74 36 L80 14 L88 14" stroke="#555" stroke-width="3" fill="none"/><path d="M52 40 Q54 22 60 20 L66 22 L68 40Z" fill="#ff6a00"/><rect x="55" y="26" width="9" height="3" fill="#f2f5d0"/>
      <path d="M62 24 L80 28 L84 16" stroke="#ff6a00" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M52 44 L66 56 L76 54" stroke="#2c3350" stroke-width="7" stroke-linecap="round" fill="none"/>
      <circle cx="62" cy="10" r="7" fill="${SK[3]}"/><path d="M54 10 Q55 0 63 1 Q70 2 70 10Z" fill="#1f2d4f"/><rect x="62" y="6" width="8" height="5" fill="#9fd4ee"/><circle cx="22" cy="66" r="13" fill="#25262b"/><circle cx="90" cy="66" r="13" fill="#25262b"/>${lights(w - 2, 40, 36)}` }; },
  bike(f, o) { const w = 102, h = 86;
    return { w, h, wheels: [[22, 69, 15], [80, 69, 15]], exh: null, body:
      `<g stroke="#2c3036" stroke-width="2.6" fill="none" stroke-linecap="round"><path d="M22 69 L42 40 L66 40 L80 69 M22 69 L48 69 L42 40 M48 69 L66 40 M66 40 L68 32 M62 32 L74 32"/></g>
      <g transform="translate(42 38)"><g class="lgA"><path d="M0 0 L10 17 L5 34" stroke="#27324f" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="2" y="32" width="11" height="4" rx="2" fill="#222"/></g><g class="lgB"><path d="M0 0 L10 17 L5 34" stroke="#3b4770" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="2" y="32" width="11" height="4" rx="2" fill="#222"/></g></g>
      <path d="M44 38 L60 14" stroke="#e6ff1f" stroke-width="12" stroke-linecap="round"/><path d="M47 33 L56 21" stroke="#fff" stroke-width="2.2" opacity=".85"/><path d="M52 27 L60 17" stroke="#fff" stroke-width="2" opacity=".0"/><rect x="38" y="16" width="14" height="14" rx="3" fill="#ef7d22"/>
      <path d="M58 18 L72 31" stroke="#e6ff1f" stroke-width="5" stroke-linecap="round"/><circle cx="64" cy="8" r="6.4" fill="${SK[o.sk || 4]}"/><path d="M57 8 Q58 -1 65 0 Q72 1 71 8Z" fill="#2a8be8"/><rect x="2" y="48" width="7" height="3.4" fill="#e8281f"/><ellipse class="brk" cx="3" cy="49" rx="8" ry="6" fill="rgba(255,50,40,.7)" style="opacity:0"/>` }; }
};

// ---------- pedestrians (walk cycles) ----------
function wk(o) {
  const sk = o.skin, hr = o.hair || '#1b1410', top = o.top, bot = o.bot || '#33384a', shoe = o.shoe || '#2a2a2e', ty = o.type || 'trou', acc = o.acc || 'none', hdt = o.head || 'hair', slv = o.sleeve || 'short';
  let vw = 44; if (acc === 'push') vw = 82; if (acc === 'dog') vw = 96; if (acc === 'umb') vw = 56;
  const idle = !!o.idle, dk = c => shade(c, -.2);
  const arm = (cls, col, extra, rot) => `<g transform="translate(22 26)"><g class="${cls}" ${rot ? `transform="rotate(${rot})"` : ''}><rect x="-2.6" y="-1" width="5.2" height="17" rx="2.6" fill="${col}"/><rect x="-2.3" y="14" width="4.6" height="12" rx="2.3" fill="${slv === 'long' ? col : sk}"/><circle cx="0" cy="27.5" r="2.7" fill="${sk}"/>${extra || ''}</g></g>`;
  const leg = (cls, col, rot) => { const wd = ty === 'kurta' ? 9 : 7.2, up = ty === 'shorts' ? 18 : (ty === 'dress' || ty === 'sari') ? 0 : 38;
    return `<g transform="translate(22 54)"><g class="${cls}" ${rot ? `transform="rotate(${rot})"` : ''}><rect x="${-wd / 2}" y="-2" width="${wd}" height="40" rx="3" fill="${up >= 38 ? col : sk}"/>${up > 0 && up < 38 ? `<rect x="${-wd / 2}" y="-2" width="${wd}" height="${up + 2}" rx="3" fill="${col}"/>` : ''}<path d="M-4 36 h8 q5 0 7 5 v3 h-15z" fill="${shoe}"/></g></g>`; };
  let torso;
  if (ty === 'dress') torso = `<g transform="translate(22 54)"><g class="sk"><path d="M-8 -28 Q0 -34 8 -28 L8 -10 L16 26 Q0 31 -16 26 L-8 -10Z" fill="${top}"/><path d="M-16 24 Q0 29 16 24 L16 26 Q0 31 -16 26Z" fill="${o.trim || dk(top)}"/>${o.pat ? `<g fill="${o.pat}" opacity=".8"><circle cx="-6" cy="4" r="2.4"/><circle cx="5" cy="10" r="2.4"/><circle cx="-2" cy="19" r="2.4"/><circle cx="9" cy="-2" r="2"/><circle cx="-9" cy="16" r="2"/></g>` : ''}</g></g>`;
  else if (ty === 'sari') torso = `<path d="M15 26 Q22 21 29 26 L30 46 L14 46Z" fill="${o.blouse || dk(top)}"/><g transform="translate(22 54)"><g class="sk"><path d="M-9 -10 L9 -10 L13 36 Q0 40 -13 36Z" fill="${top}"/><path d="M-13 33 Q0 37 13 33 L13 36 Q0 40 -13 36Z" fill="${o.trim || '#e6b84a'}"/><path d="M-5 -30 L1 -32 L10 4 L3 8Z" fill="${top}" stroke="${o.trim || '#e6b84a'}" stroke-width="1.4"/><path d="M-9 -10 L9 -10" stroke="${o.trim || '#e6b84a'}" stroke-width="2"/></g></g>`;
  else if (ty === 'kurta') torso = `<g transform="translate(22 54)"><g class="sk"><path d="M-7 -28 Q0 -34 7 -28 L9 20 L-9 20Z" fill="${top}"/><rect x="-1" y="-30" width="2" height="16" fill="${dk(top)}" opacity=".5"/></g></g>`;
  else torso = `<path d="M15 26 Q22 21 29 26 L30 56 Q22 59 14 56Z" fill="${top}"/>${o.vest ? `<path d="M15 26 Q22 21 29 26 L30 56 Q22 59 14 56Z" fill="${o.vest}"/><rect x="14" y="36" width="16" height="3" fill="#f2f5d0"/>` : ''}${ty === 'shorts' || o.lanyard ? '' : `<rect x="14" y="52" width="16" height="4" fill="${bot}"/>`}${o.lanyard ? '<path d="M20 24 L22 38 L24 24" stroke="#2a8be8" stroke-width="1.4" fill="none"/><rect x="21" y="38" width="4" height="5" fill="#fff"/>' : ''}`;
  const rk = acc === 'rucksack' ? `<rect x="9" y="26" width="9" height="19" rx="3.5" fill="${o.bagc || '#c8482b'}"/>` : '';
  let head = '';
  const face = `<circle cx="29.2" cy="14.4" r="1.8" fill="${sk}"/><circle cx="26.2" cy="12" r="1" fill="#1a1210"/><path d="M26 17.2 q2 1 3.6 0" stroke="${shade(sk, -.35)}" stroke-width=".8" fill="none"/>`;
  const hcol = o.hcol || '#d65a1b';
  if (hdt === 'hijab') head = `<path d="M13 14 Q12 3 22 3 Q31 3 30 14 L32 22 Q31 31 24 34 L13 34 Q10 23 13 14Z" fill="${hcol}"/><circle cx="23.2" cy="13.6" r="6.3" fill="${sk}"/><circle cx="29" cy="14.6" r="1.6" fill="${sk}"/><circle cx="26.4" cy="12.4" r="1" fill="#1a1210"/><path d="M15 9 Q22 2 30 9 L29.4 11 Q23 6 16 12Z" fill="${hcol}"/>`;
  else if (hdt === 'gele') head = `<rect x="19" y="20" width="4" height="7" fill="${sk}"/><circle cx="22" cy="13.5" r="7.2" fill="${sk}"/>${face}<ellipse cx="20" cy="4.5" rx="11.5" ry="6.2" fill="${hcol}"/><path d="M10 6 Q20 11 30 5" stroke="${shade(hcol, -.3)}" stroke-width="1.2" fill="none"/><path d="M13 1.5 Q20 6 28 2" stroke="${shade(hcol, .35)}" stroke-width="1.2" fill="none"/><path d="M26 2 Q36 -3 34 6 Q31 3 27 7Z" fill="${hcol}"/>`;
  else if (hdt === 'topi') head = `<rect x="19" y="20" width="4" height="7" fill="${sk}"/><circle cx="22" cy="13.5" r="7.2" fill="${sk}"/>${face}<path d="M14.8 11 Q14 5 22 5 Q27 5 29 9 Q22 7 18 12Z" fill="${hr}"/><path d="M14.5 8.5 Q15 2 22 2.4 Q29 3 29.5 8.5 L29.5 9.4 L14.5 9.4Z" fill="#f3f0e4"/><path d="M15 6.6 h14" stroke="#c9b87a" stroke-width="1"/>`;
  else if (hdt === 'cap') head = `<rect x="19" y="20" width="4" height="7" fill="${sk}"/><circle cx="22" cy="13.5" r="7.2" fill="${sk}"/>${face}<path d="M14.8 10 Q14 3.4 22 3.4 Q30 3.4 29.6 9.6 L32 10 Q31 12 28 11 L15 11Z" fill="${o.hcol || '#5a5d66'}"/>`;
  else if (hdt === 'hood') head = `<rect x="19" y="20" width="4" height="7" fill="${sk}"/><circle cx="19.5" cy="14" r="10" fill="${top}"/><circle cx="22.5" cy="13.6" r="6.6" fill="${sk}"/><circle cx="28.3" cy="14.6" r="1.6" fill="${sk}"/><circle cx="26" cy="12.2" r="1" fill="#1a1210"/>`;
  else head = `<rect x="19" y="20" width="4" height="7" fill="${sk}"/><path d="M14.5 11 q-2 8 1 15 q-3 -6 -1.5 -15Z" fill="${hr}" ${hdt === 'long' ? '' : 'opacity="0"'}/>${hdt === 'long' ? `<path d="M15 11 Q13 3 22 3.4 Q30 4 29 11 Q22 7 17 12 L18 30 Q12 30 14 12Z" fill="${hr}"/>` : ''}<circle cx="22" cy="13.5" r="7.2" fill="${sk}"/>${face}${hdt === 'bun' ? `<circle cx="15.5" cy="6" r="3.6" fill="${hr}"/>` : ''}${hdt === 'long' ? '' : `<path d="M14.8 12 Q13.6 4 22 4.2 Q30 5 29 10 Q26 6.6 22 7.4 Q18 8 16.5 14Z" fill="${hr}"/>`}${hdt === 'headband' ? `<path d="M15 8.4 Q22 4.6 29.4 8.6" stroke="#e8281f" stroke-width="2.2" fill="none"/>` : ''}`;
  // accessories
  let aF = '', extraBody = '', fixedArmF = null;
  if (acc === 'bag') aF = `<rect x="-3" y="28" width="12" height="14" rx="1.6" fill="${o.bagc || '#2b8c5a'}"/><path d="M0 28 Q3 22 6 28" stroke="#222" stroke-width="1" fill="none"/>`;
  if (acc === 'bags') aF = `<rect x="-3" y="28" width="12" height="15" rx="1.6" fill="${o.bagc || '#e0b020'}"/><path d="M0 28 Q3 22 6 28" stroke="#222" stroke-width="1" fill="none"/>`;
  if (acc === 'umb') fixedArmF = `<g transform="translate(22 26)"><path d="M0 0 L8 12 L11 -2" stroke="${top}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="11" cy="-3" r="2.7" fill="${sk}"/></g><g transform="translate(33 -3)"><g class="ub"><path d="M0 0 V-34" stroke="#333" stroke-width="1.6"/><path d="M-21 -34 Q0 -54 21 -34 Q10 -39 0 -37 Q-10 -39 -21 -34Z" fill="${o.ubc || '#1f2a44'}"/><path d="M-21 -34 Q-10 -39 0 -37 Q10 -39 21 -34" stroke="rgba(255,255,255,.35)" stroke-width="1" fill="none"/></g></g>`;
  if (acc === 'phone') fixedArmF = `<g transform="translate(22 26)"><path d="M0 0 L5 16 L9 -5" stroke="${top}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="9.4" cy="-6" r="2.6" fill="${sk}"/><rect x="9" y="-14" width="4" height="9" rx="1" fill="#1a1d24"/><rect x="9.8" y="-12.6" width="2.4" height="5.6" fill="#8ad4ff"/></g>`;
  if (acc === 'push') fixedArmF = `<g transform="translate(22 26)"><path d="M0 0 L13 12 L17 18" stroke="${top}" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="18" cy="19" r="2.6" fill="${sk}"/></g><path d="M38 44 H46 L52 64" stroke="#444" stroke-width="2.4" fill="none"/><path d="M46 60 Q62 56 76 64 L76 78 L52 78Z" fill="${o.pc || '#3b6fc0'}"/><path d="M50 60 Q56 40 76 52 Q70 58 62 60Z" fill="${shade(o.pc || '#3b6fc0', -.25)}"/><circle cx="64" cy="58" r="5" fill="${SK[1]}"/><path d="M52 78 L50 90 M72 78 L74 90" stroke="#444" stroke-width="2"/>${whl(50, 91, 7)}${whl(76, 91, 7)}`;
  if (acc === 'dog') extraBody = `<path d="M33 54 Q48 62 66 74" stroke="#d33" stroke-width="1" fill="none"/><g transform="translate(0 0)"><g transform="translate(55 70)"><g class="tail"><path d="M0 0 Q1 -8 5 -7" stroke="#b9854e" stroke-width="3" fill="none" stroke-linecap="round"/></g></g><g transform="translate(60 84)"><g class="dA"><rect x="-2" y="-4" width="4" height="14" rx="2" fill="#a2713f"/></g></g><g transform="translate(78 84)"><g class="dB"><rect x="-2" y="-4" width="4" height="14" rx="2" fill="#a2713f"/></g></g><ellipse cx="70" cy="76" rx="15" ry="7.5" fill="#c4915a"/><g transform="translate(62 84)"><g class="dB"><rect x="-2" y="-4" width="4" height="14" rx="2" fill="#c4915a"/></g></g><g transform="translate(80 84)"><g class="dA"><rect x="-2" y="-4" width="4" height="14" rx="2" fill="#c4915a"/></g></g><circle cx="86" cy="70" r="6.5" fill="#c4915a"/><path d="M89 72 L96 74 L90 77Z" fill="#c4915a"/><circle cx="96" cy="74" r="1.3" fill="#222"/><path d="M82 66 Q80 76 84 78 Q86 70 86 65Z" fill="#7d5128"/><circle cx="87" cy="68" r="1" fill="#222"/><rect x="79" y="74" width="5" height="2" fill="#d33"/></g>`;
  if (acc === 'dog') fixedArmF = `<g transform="translate(22 26)"><path d="M0 0 L9 14 L13 22" stroke="${top}" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="14" cy="23.5" r="2.6" fill="${sk}"/></g>`;
  const lr = o.lean ? ` transform="rotate(${o.lean} 22 98)"` : '';
  let s = `<ellipse cx="22" cy="98" rx="${o.shw || 15}" ry="2.8" fill="rgba(40,35,30,.22)"/><g${lr}><g class="bodyg">${rk}`;
  const skirtT = ty === 'dress' || ty === 'sari' || ty === 'kurta';
  const bk = idle ? ' ' : '';
  s += arm('aB', dk(slv === 'long' || true ? top : top), '', idle ? -6 : 0);
  if (!skirtT) s += leg('gB', dk(bot), idle ? -5 : 0) + torso + leg('gF', bot, idle ? 5 : 0);
  else s += leg('gB', dk(bot), idle ? -5 : 0) + leg('gF', bot, idle ? 5 : 0) + torso;
  s += `<g class="hdg">${head}</g>`;
  s += extraBody;
  s += fixedArmF || arm('aF', top, aF, idle ? 8 : 0);
  s += '</g></g>';
  return { svg: s, vw };
}

// ---------- tiny helper: instantiate a walker ----------
function addWalker(layer, o, T, D) {
  const b = wk(o), sc = o.sc, ww = b.vw * sc, hh = 100 * sc;
  const el = box(layer, { left: 0, top: o.y - hh, width: ww, height: hh });
  const inner = box(el, { left: 0, top: 0, width: ww, height: hh, transformOrigin: `${22 / b.vw * 100}% 50%`, transform: o.dir < 0 ? 'scaleX(-1)' : 'none' }, `<svg viewBox="0 0 ${b.vw} 100" width="${ww}" height="${hh}" style="overflow:visible;display:block">${b.svg}</svg>`);
  const q = c => el.querySelectorAll('.' + c), run = !!o.run, per = run ? 0.17 : (o.per || 0.34), amp = o.idle ? 0 : (run ? 44 : (o.amp || 25));
  if (!o.idle) {
    const lF = q('gF'), lB = q('gB'), aF = q('aF'), aB = q('aB');
    const A = [...lF, ...(o.acc === 'push' || o.acc === 'umb' || o.acc === 'phone' || o.acc === 'dog' ? [] : []), ...aB], B = [...lB, ...aF];
    if (o.acc === 'push' || o.acc === 'umb' || o.acc === 'phone' || o.acc === 'dog') { A.length = 0; B.length = 0; A.push(...lF, ...aB); B.push(...lB); }
    lp(A, { rotation: amp }, { rotation: -amp, yoyo: true, ease: 'sine.inOut' }, per, T, D);
    lp(B, { rotation: -amp }, { rotation: amp, yoyo: true, ease: 'sine.inOut' }, per, T, D);
    lp(el, { y: 0 }, { y: -(run ? 3.4 : 1.8) * sc, yoyo: true, ease: 'sine.inOut' }, per, T, D);
    const skg = q('sk'); if (skg.length) lp(skg, { skewX: -3 }, { skewX: 3, yoyo: true, ease: 'sine.inOut' }, per * 2, T, D);
    if (run) lp(q('bodyg'), { rotation: 1 }, { rotation: -1, yoyo: true, ease: 'sine.inOut' }, per, T, D);
  } else {
    lp(q('bodyg'), { y: 0 }, { y: -0.7, yoyo: true, ease: 'sine.inOut' }, 1.3 + (o.ph || 0) * .3, T + (o.ph || 0) * .4, D);
  }
  const ub = q('ub'); if (ub.length) lp(ub, { rotation: -3 }, { rotation: 3, yoyo: true, ease: 'sine.inOut' }, 1.4, T, D);
  const tail = q('tail'); if (tail.length) lp(tail, { rotation: -14 }, { rotation: 18, yoyo: true, ease: 'sine.inOut' }, 0.18, T, D);
  const dA = q('dA'), dB = q('dB'); if (dA.length) { lp(dA, { rotation: 30 }, { rotation: -30, yoyo: true, ease: 'sine.inOut' }, per, T, D); lp(dB, { rotation: -30 }, { rotation: 30, yoyo: true, ease: 'sine.inOut' }, per, T, D); }
  const wh = q('wh'); if (wh.length) lp(wh, { rotation: 0 }, { rotation: 360 }, 2 * Math.PI * 7 * sc / o.v, T, D);
  if (!o.idle) {
    const gap = o.gap || 300, x0 = o.dir > 0 ? -ww - 20 : W + 20, S = W + ww + 40 + gap, x1 = x0 + o.dir * S;
    conv(el, x0, x1, prog(o.at, x0, o.dir, S), o.v, T, D);
  } else tl.set(el, { x: o.at }, T);
  return el;
}

// ---------- static decor builders ----------
function pigeon(p, x, y, sc, flip, T, D, seed, o) {
  o = o || {};
  const R = rr(seed), body = `<ellipse cx="22" cy="23" rx="14" ry="8.4" fill="#8e99ac"/><path d="M8 22 L-2 26 L9 28Z" fill="#6c7689"/><ellipse cx="29" cy="24" rx="7" ry="6.5" fill="#a7b1c2"/><path d="M8 21 Q22 14 32 20 Q26 31 12 28Z" fill="#7a859a"/><path d="M13 20 L25 19" stroke="#15171c" stroke-width="2.2"/><path d="M12 24 L24 23.4" stroke="#15171c" stroke-width="2.2"/>
  <path d="M30 14 Q38 12 37 22 Q33 24 29 21Z" fill="#6d4a9b"/><path d="M31 15 Q36 14 36 19 Q33 20 31 18Z" fill="#3a9a6c"/>`;
  const legs = `<path d="M21 30 L20 38 M26 30 L27 38" stroke="#d98aa0" stroke-width="1.6"/><path d="M17 38.4 h5 M25 38.4 h5" stroke="#d98aa0" stroke-width="1.6"/>`;
  const head = `<g transform="translate(34 17)"><g class="pk"><circle cx="3" cy="-3" r="5" fill="#586277"/><path d="M7 -3 L12 -2 L7 0Z" fill="#c9c3b8"/><circle cx="4.2" cy="-4.4" r="1.7" fill="#f08a1c"/><circle cx="4.5" cy="-4.4" r=".8" fill="#111"/></g></g>`;
  const wing = o.fly ? `<g transform="translate(22 19)"><g class="wg"><path d="M0 0 Q-14 -24 6 -26 Q10 -14 10 -2Z" fill="#7a859a"/><path d="M-4 -12 L7 -14" stroke="#15171c" stroke-width="1.6"/></g></g>` : '';
  const el = sv(p, x, y - 40 * sc, 48 * sc, 40 * sc, 48, 40, `<ellipse cx="22" cy="39" rx="13" ry="2" fill="rgba(0,0,0,.18)"/>${o.fly ? '' : legs}${body}${head}${wing}`, { transform: flip ? 'scaleX(-1)' : 'none' });
  const pk = el.querySelector('.pk');
  if (!o.fly) {
    const kf = [{ rotation: 0, duration: .5 + R() * .9 }, { rotation: 38, duration: .09 }, { rotation: 4, duration: .1 }, { rotation: 38, duration: .09 }, { rotation: 0, duration: .1 }, { rotation: -6, duration: .3 }, { rotation: 0, duration: .25 }, { rotation: 36, duration: .09 }, { rotation: 2, duration: .12 }, { rotation: 0, duration: .5 + R() }];
    const cyc = kf.reduce((a, k) => a + k.duration, 0);
    tl.to(pk, { keyframes: kf, repeat: Math.max(0, Math.floor(D / cyc) - 1), ease: 'none' }, T + R());
    lp(el, { x: 0 }, { x: (flip ? -1 : 1) * (8 + R() * 14), yoyo: true, ease: 'sine.inOut' }, 1.6 + R() * 1.4, T, D, { repeatDelay: 1 + R() * 2 });
  } else {
    lp(el.querySelector('.wg'), { rotation: -48 }, { rotation: 40, yoyo: true, ease: 'sine.inOut' }, .13, T, D);
    lp(pk, { rotation: -6 }, { rotation: 6, yoyo: true, ease: 'sine.inOut' }, .6, T, D);
  }
  return el;
}

function lampPost(p, x, y, T, D, perch) {
  const h = 224, el = sv(p, x - 40, y - h, 80, h, 80, h, `<ellipse cx="40" cy="${h - 1}" rx="14" ry="3" fill="rgba(0,0,0,.18)"/><rect x="34" y="${h - 14}" width="12" height="14" rx="2" fill="#3f4a49"/><rect x="37" y="14" width="6" height="${h - 20}" fill="#56635f"/><rect x="37" y="14" width="2" height="${h - 20}" fill="rgba(255,255,255,.2)"/><path d="M40 16 Q40 2 56 2 L70 2" stroke="#56635f" stroke-width="5" fill="none"/><path d="M60 -2 h22 l-4 9 h-14z" fill="#3a4443"/><rect x="64" y="7" width="14" height="3" fill="#fff6c0"/>
   <g transform="translate(40 96)"><circle r="12" cx="0" cy="0" fill="#3b5a3b"/><path d="M-14 4 Q0 20 14 4Z" fill="#2c4a2f"/><circle cx="-6" cy="-3" r="3" fill="#e0405a"/><circle cx="4" cy="2" r="3" fill="#ffd23c"/><circle cx="7" cy="-5" r="2.6" fill="#a96ee0"/><circle cx="-2" cy="6" r="2.4" fill="#fff"/></g>
   <rect x="22" y="50" width="36" height="22" rx="2" fill="#3e8f6a"/><text x="40" y="65" text-anchor="middle" font-family="Arial Black,Arial" font-size="9" fill="#fff">PARK &#8594;</text>`);
  return el;
}

function litterBin(p, x, y, T, D, col, seed) {
  const el = sv(p, x - 22, y - 62, 44, 62, 44, 62, `<ellipse cx="22" cy="60" rx="14" ry="2.6" fill="rgba(0,0,0,.2)"/><rect x="10" y="22" width="24" height="38" rx="4" fill="${col}"/><rect x="10" y="22" width="5" height="38" rx="3" fill="rgba(255,255,255,.2)"/><rect x="8" y="16" width="28" height="8" rx="3" fill="${shade(col, -.25)}"/><rect x="14" y="26" width="16" height="9" rx="4" fill="#15161a"/><rect x="14" y="40" width="16" height="2" fill="rgba(255,255,255,.45)"/><rect x="14" y="46" width="16" height="2" fill="rgba(255,255,255,.45)"/>
    <g transform="translate(22 16)"><g class="bg"><path d="M-9 0 Q-13 -9 -4 -13 Q0 -19 5 -13 Q12 -10 9 0Z" fill="#e9eef2"/><path d="M-3 -12 L-1 -6 M3 -12 L2 -6" stroke="#b8c2cc" stroke-width="1"/></g></g>`);
  lp(el.querySelector('.bg'), { skewX: -6, scaleY: .96 }, { skewX: 7, scaleY: 1.04, yoyo: true, ease: 'sine.inOut' }, .5 + (seed % 3) * .1, T, D);
  return el;
}
function blackBin(p, x, y, T, D) {
  const el = sv(p, x - 40, y - 64, 90, 64, 90, 64, `<ellipse cx="42" cy="62" rx="34" ry="3" fill="rgba(0,0,0,.2)"/><rect x="10" y="12" width="26" height="50" rx="4" fill="#33363c"/><rect x="8" y="8" width="30" height="8" rx="3" fill="#25272c"/><rect x="14" y="22" width="18" height="10" rx="4" fill="#0e0f12"/><rect x="10" y="12" width="4" height="50" rx="2" fill="rgba(255,255,255,.14)"/>
   <path d="M44 62 Q38 44 50 40 Q56 34 62 40 Q72 46 66 62Z" fill="#17181c"/><path d="M52 40 Q56 36 58 40" stroke="#555" stroke-width="2" fill="none"/><path d="M62 62 Q60 50 70 48 Q76 44 80 50 Q86 56 82 62Z" fill="#202228"/><path d="M71 48 Q75 44 77 48" stroke="#666" stroke-width="1.6" fill="none"/>
   <g class="fl1"><circle r="1.2" fill="#222"/></g><g class="fl2"><circle r="1.2" fill="#222"/></g>`);
  const a = el.querySelectorAll('.fl1'), b = el.querySelectorAll('.fl2');
  tl.to(a, { keyframes: [{ x: 44, y: 24, duration: .3 }, { x: 56, y: 18, duration: .25 }, { x: 62, y: 30, duration: .3 }, { x: 48, y: 34, duration: .25 }, { x: 40, y: 22, duration: .3 }], repeat: Math.max(0, Math.floor(D / 1.4) - 1), ease: 'sine.inOut' }, T);
  tl.to(b, { keyframes: [{ x: 66, y: 34, duration: .25 }, { x: 74, y: 28, duration: .3 }, { x: 80, y: 38, duration: .3 }, { x: 70, y: 40, duration: .3 }, { x: 62, y: 30, duration: .25 }], repeat: Math.max(0, Math.floor(D / 1.4) - 1), ease: 'sine.inOut' }, T + .2);
  return el;
}
function recyc(p, x, y) {
  const wb = (x0, c, lid) => `<ellipse cx="${x0 + 17}" cy="62" rx="20" ry="3" fill="rgba(0,0,0,.2)"/><rect x="${x0}" y="22" width="34" height="38" rx="4" fill="${c}"/><rect x="${x0 - 2}" y="${lid ? 12 : 17}" width="38" height="8" rx="3" fill="${shade(c, -.25)}" transform="${lid ? `rotate(-10 ${x0 + 17} 20)` : ''}"/><circle cx="${x0 + 4}" cy="60" r="4" fill="#222"/><circle cx="${x0 + 30}" cy="60" r="4" fill="#222"/><path d="M${x0 + 17} 30 l7 12 h-14z" fill="none" stroke="#fff" stroke-width="2.4" opacity=".85"/><rect x="${x0 + 6}" y="48" width="22" height="7" fill="#fff" opacity=".9"/><text x="${x0 + 17}" y="54" text-anchor="middle" font-family="Arial" font-weight="700" font-size="5.6" fill="#333">PAPER</text>`;
  return sv(p, x - 40, y - 64, 90, 64, 90, 64, wb(2, '#2b6fb8', false) + wb(46, '#2e8b4e', true));
}
function postbox(p, x, y) { return sv(p, x - 22, y - 64, 44, 64, 44, 64, `<ellipse cx="22" cy="62" rx="16" ry="2.6" fill="rgba(0,0,0,.2)"/><rect x="6" y="52" width="32" height="10" rx="2" fill="#8c1218"/><rect x="7" y="16" width="30" height="38" fill="#c8202a"/><rect x="7" y="16" width="6" height="38" fill="rgba(255,255,255,.18)"/><path d="M5 18 Q22 -6 39 18Z" fill="#c8202a"/><path d="M5 18 H39" stroke="#8c1218" stroke-width="3"/><rect x="12" y="26" width="20" height="4" rx="1.5" fill="#15100f"/><rect x="13" y="36" width="18" height="10" rx="1" fill="#f3efe0"/><path d="M15 39 h14 M15 42 h10" stroke="#555" stroke-width="1"/><rect x="2" y="10" width="0" height="0"/><rect x="29" y="6" width="9" height="6" fill="#ffd23c" transform="rotate(14 33 9)"/>`); }
function bollards(p, x, y, n) { let s = ''; for (let i = 0; i < n; i++) s += `<rect x="${i * 30 + 2}" y="0" width="9" height="30" rx="3" fill="#3a3f46"/><rect x="${i * 30 + 2}" y="8" width="9" height="4" fill="#f4f4ef"/><rect x="${i * 30 + 2}" y="14" width="9" height="3" fill="#e0262a"/><ellipse cx="${i * 30 + 6.5}" cy="31" rx="8" ry="2" fill="rgba(0,0,0,.2)"/>`; return sv(p, x, y - 32, n * 30, 34, n * 30, 34, s); }
function aboard(p, x, y, T, D) { const el = sv(p, x - 24, y - 64, 48, 64, 48, 64, `<g transform="translate(24 62)"><g class="ab"><path d="M-17 0 L-10 -60 L10 -60 L17 0Z" fill="#2c3a30"/><path d="M-14 -4 L-8 -56 L8 -56 L14 -4Z" fill="#26362b"/><rect x="-9" y="-54" width="18" height="4" fill="#d9c9a0"/><text x="0" y="-45" text-anchor="middle" font-family="Georgia" font-weight="700" font-size="7" fill="#fff">Fresh</text><text x="0" y="-36" text-anchor="middle" font-family="Georgia" font-weight="700" font-size="8" fill="#ffd36a">COFFEE</text><path d="M-6 -30 q6 -4 12 0 v8 q-6 4 -12 0z" fill="none" stroke="#fff" stroke-width="1"/><text x="0" y="-12" text-anchor="middle" font-family="Georgia" font-size="6" fill="#fff">Open! Come in</text></g></g>`); lp(el.querySelector('.ab'), { rotation: -1.4 }, { rotation: 1.4, yoyo: true, ease: 'sine.inOut' }, 1.7, T, D); return el; }
function cycleRack(p, x, y) { const wheel = (cx) => `<circle cx="${cx}" cy="40" r="16" fill="none" stroke="#2c3036" stroke-width="2.6"/><circle cx="${cx}" cy="40" r="2" fill="#555"/><path d="M${cx - 15} 40 H${cx + 15} M${cx} 25 V55" stroke="#8a8e95" stroke-width=".7"/>`;
  return sv(p, x - 50, y - 62, 100, 62, 100, 62, `<path d="M10 58 V30 Q10 24 16 24 Q22 24 22 30 V58 M40 58 V30 Q40 24 46 24 Q52 24 52 30 V58 M70 58 V30 Q70 24 76 24 Q82 24 82 30 V58" stroke="#8c9096" stroke-width="3.4" fill="none"/>${wheel(31)}<path d="M31 40 L48 40 L56 24 L34 24Z" stroke="#c0392b" stroke-width="3" fill="none"/><path d="M56 24 L62 20 H68" stroke="#333" stroke-width="2.4" fill="none"/><path d="M14 36 Q30 30 48 36" stroke="#e8c030" stroke-width="2" fill="none"/><text x="78" y="16" text-anchor="middle" font-family="Georgia" font-size="6.5" font-style="italic" fill="#586">still locked up!</text>`); }
function bench(p, x, y) { return sv(p, x - 36, y - 40, 72, 42, 72, 42, `<ellipse cx="36" cy="40" rx="32" ry="3" fill="rgba(0,0,0,.2)"/><path d="M6 16 L6 38 M66 16 L66 38 M10 26 H62" stroke="#2e5a3e" stroke-width="3" fill="none"/><rect x="4" y="2" width="64" height="5" rx="2" fill="#a66a35"/><rect x="4" y="9" width="64" height="5" rx="2" fill="#b57840"/><rect x="2" y="22" width="68" height="5" rx="2" fill="#a66a35"/><rect x="8" y="27" width="4" height="12" fill="#2e5a3e"/><rect x="60" y="27" width="4" height="12" fill="#2e5a3e"/>`); }
function oldMan(p, x, y, T, D) {
  const el = sv(p, x - 30, y - 62, 70, 62, 70, 62, `<path d="M30 46 L52 46 L54 58" stroke="#5b5f6e" stroke-width="8" stroke-linecap="round" fill="none"/><rect x="50" y="54" width="12" height="6" rx="3" fill="#2a2420"/><path d="M26 22 Q36 18 40 26 L40 46 L24 46Z" fill="#8a5d3b"/><rect x="34" y="12" width="5" height="8" fill="#e3b08a"/><circle cx="37" cy="9" r="7.4" fill="#e3b08a"/><circle cx="43.8" cy="10" r="1.7" fill="#e3b08a"/><circle cx="41" cy="7.6" r="1" fill="#222"/><path d="M29.6 7 Q30 -1 38 0 Q46 1 45 6 L50 7 L40 8Z" fill="#6d6f75"/><path d="M30 8 q-2 4 0 6" stroke="#eee" stroke-width="2.4" fill="none"/>
   <g transform="translate(34 26)"><g class="thr"><path d="M0 0 L12 8 L22 4" stroke="#8a5d3b" stroke-width="5.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="23" cy="3.6" r="2.8" fill="#e3b08a"/></g></g><circle class="cr1" cx="58" cy="30" r="1.4" fill="#e8d5a0" opacity="0"/><circle class="cr2" cx="58" cy="30" r="1.4" fill="#e8d5a0" opacity="0"/><circle class="cr3" cx="58" cy="30" r="1.4" fill="#e8d5a0" opacity="0"/>`);
  lp(el.querySelector('.thr'), { rotation: 18 }, { rotation: -42, yoyo: true, ease: 'power2.inOut' }, .5, T, D, { repeatDelay: 1.1 });
  ['cr1', 'cr2', 'cr3'].forEach((c, i) => tl.fromTo(el.querySelector('.' + c), { x: 0, y: 0, opacity: 1 }, { keyframes: { x: [0, 14, 24 + i * 4], y: [0, -6, 22 - i * 3], opacity: [1, 1, 0], easeEach: 'none' }, duration: .8, repeat: Math.max(0, Math.floor(D / 2.2) - 1), repeatDelay: 1.4, ease: 'none', immediateRender: false }, T + .35 + i * .1));
  return el;
}
function belisha(p, x, y, T, D) { const el = sv(p, x - 14, y - 94, 28, 96, 28, 96, `<ellipse cx="14" cy="94" rx="9" ry="2.4" fill="rgba(0,0,0,.2)"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="11" y="${30 + i * 8}" width="6" height="8" fill="${i % 2 ? '#111' : '#f3f3ee'}"/>`).join('')}<circle class="gl" cx="14" cy="22" r="10" fill="#ff9d1a"/><circle cx="11" cy="19" r="3" fill="#fff" opacity=".5"/><circle class="gh" cx="14" cy="22" r="20" fill="rgba(255,170,40,.35)"/>`);
  lp(el.querySelector('.gl'), { opacity: .35 }, { opacity: 1, yoyo: true, ease: 'none' }, .5, T, D); lp(el.querySelector('.gh'), { opacity: 0 }, { opacity: 1, yoyo: true, ease: 'none' }, .5, T, D); return el; }
function pelican(p, x, y, T, D) { const el = sv(p, x - 20, y - 120, 40, 122, 40, 122, `<ellipse cx="20" cy="120" rx="10" ry="2.6" fill="rgba(0,0,0,.2)"/><rect x="17" y="20" width="6" height="100" fill="#6b7075"/><rect x="8" y="2" width="24" height="34" rx="4" fill="#25272b"/><circle cx="20" cy="12" r="0" fill="#fff"/><g class="rd"><circle cx="20" cy="11" r="7" fill="#e5322d"/><path d="M20 6 l3 3 v5 h-6 v-5z" fill="#ff9a95"/></g><g class="gr" style="opacity:0"><circle cx="20" cy="26" r="7" fill="#2fcf6a"/><path d="M20 21 l3 3 l-1 2 l1 4 h-6 l1 -4 l-1 -2z" fill="#c8ffd8"/></g><circle cx="20" cy="11" r="7" fill="none" stroke="#111" stroke-width="1"/><rect x="24" y="52" width="14" height="18" rx="2" fill="#d6b52a"/><circle cx="31" cy="60" r="3.4" fill="#222"/><text x="31" y="68.6" text-anchor="middle" font-family="Arial" font-size="3.6" font-weight="700" fill="#222">WAIT</text>`);
  const cyc = 9, rd = el.querySelector('.rd'), gr = el.querySelector('.gr');
  tl.to(rd, { keyframes: [{ opacity: 1, duration: 5 }, { opacity: 0, duration: .01 }, { opacity: 0, duration: 4 - .01 }], repeat: Math.max(0, Math.floor(D / cyc) - 1), ease: 'none' }, T);
  tl.to(gr, { keyframes: [{ opacity: 0, duration: 5 }, { opacity: 1, duration: .01 }, { opacity: 1, duration: 2.5 }, { opacity: .1, duration: .15 }, { opacity: 1, duration: .15 }, { opacity: .1, duration: .15 }, { opacity: 1, duration: .15 }, { opacity: 0, duration: .01 }, { opacity: 0, duration: .88 }], repeat: Math.max(0, Math.floor(D / cyc) - 1), ease: 'none' }, T);
  return el; }
function busStop(p, x, y, T, D) {
  const el = sv(p, x - 90, y - 150, 190, 152, 190, 152, `<ellipse cx="95" cy="150" rx="82" ry="3.4" fill="rgba(0,0,0,.2)"/>
   <rect x="8" y="20" width="132" height="128" fill="rgba(170,215,235,.22)" stroke="#6c8190" stroke-width="1"/><rect x="2" y="12" width="144" height="10" rx="3" fill="#cf2a31"/><rect x="2" y="12" width="144" height="3" fill="#ee6a6f"/><rect x="6" y="22" width="5" height="126" fill="#5b6a75"/><rect x="138" y="22" width="5" height="126" fill="#5b6a75"/>
   <rect x="100" y="40" width="34" height="78" fill="#fff5da" stroke="#555" stroke-width="1.2"/><rect x="102" y="42" width="30" height="40" fill="#f09a35"/><text x="117" y="58" text-anchor="middle" font-family="Arial Black,Arial" font-size="7" fill="#fff">DAY OUT</text><text x="117" y="68" text-anchor="middle" font-family="Arial" font-size="5" fill="#fff">trains &amp; buses</text><path d="M104 74 L130 74" stroke="#fff" stroke-width="1.4"/><rect x="104" y="88" width="26" height="2" fill="#bbb"/><rect x="104" y="94" width="26" height="2" fill="#bbb"/><rect x="104" y="100" width="20" height="2" fill="#bbb"/><rect x="104" y="106" width="24" height="2" fill="#bbb"/>
   <rect x="20" y="32" width="72" height="22" rx="2" fill="#111"/><text x="26" y="41.6" font-family="Arial Black,Arial" font-size="7.4" fill="#ffb52e">25 Town Centre</text><text class="m3" x="26" y="51.6" font-family="Arial Black,Arial" font-size="7.4" fill="#ffb52e">3 min</text><text class="m2" x="26" y="51.6" font-family="Arial Black,Arial" font-size="7.4" fill="#ffb52e" style="opacity:0">1 min</text><text class="m1" x="26" y="51.6" font-family="Arial Black,Arial" font-size="7.4" fill="#ffb52e" style="opacity:0">DUE</text>
   <rect x="22" y="112" width="70" height="6" rx="2" fill="#b5834a"/><rect x="26" y="118" width="3" height="14" fill="#4b5a63"/><rect x="84" y="118" width="3" height="14" fill="#4b5a63"/>
   <rect x="156" y="14" width="5" height="136" fill="#5d6870"/><rect x="146" y="2" width="26" height="26" rx="13" fill="#2b5fae"/><text x="159" y="12" text-anchor="middle" font-family="Arial Black,Arial" font-size="5" fill="#fff">BUS</text><text x="159" y="19" text-anchor="middle" font-family="Arial Black,Arial" font-size="5" fill="#fff">STOP</text><rect x="147" y="30" width="24" height="14" fill="#fff" stroke="#555" stroke-width=".8"/><text x="159" y="40" text-anchor="middle" font-family="Arial Black,Arial" font-size="7" fill="#d6232b">25 88</text>`);
  const cyc = 9, mk3 = (cls, a, b) => { const o = []; if (a > 0) o.push({ opacity: 0, duration: a }); o.push({ opacity: 1, duration: .01 }, { opacity: 1, duration: 3 - .01 }); if (cyc - a - 3 > 0) o.push({ opacity: 0, duration: cyc - a - 3 }); tl.to(el.querySelector('.' + cls), { keyframes: o, repeat: Math.max(0, Math.floor(D / cyc) - 1), ease: 'none' }, T); };
  mk3('m3', 0); mk3('m2', 3); mk3('m1', 6);
  return el;
}
function drift(layer, kind, o, T, D) {   // blown litter / leaves; generic places only
  const R = rr(o.seed), sc = o.sc || 1, dir = o.dir || 1; let svg, w, h;
  if (kind === 'crisps') { w = 18; h = 14; svg = `<path d="M1 3 L16 1 L17 11 L2 13Z" fill="#d9a21b"/><path d="M1 3 L16 1" stroke="#fff" stroke-width="1.5" stroke-dasharray="1.5 1"/><path d="M5 7 q4 -3 8 0 q-4 3 -8 0" fill="#e8442c"/>`; }
  else if (kind === 'news') { w = 30; h = 22; svg = `<path d="M2 3 L28 1 L29 20 L3 21Z" fill="#efeee6"/><path d="M5 6 H25 M5 10 H25 M5 14 H18" stroke="#777" stroke-width="1.4"/><rect x="5" y="5" width="9" height="6" fill="#999" opacity=".7"/>`; }
  else if (kind === 'bag') { w = 26; h = 30; svg = `<path d="M13 1 Q3 4 3 16 Q4 27 13 29 Q22 27 23 16 Q23 4 13 1Z" fill="rgba(255,255,255,.55)" stroke="rgba(190,210,225,.9)" stroke-width="1"/><path d="M9 1 Q13 -5 17 1" stroke="rgba(255,255,255,.8)" stroke-width="1.6" fill="none"/>`; }
  else if (kind === 'cup') { w = 14; h = 16; svg = `<path d="M2 3 H12 L10.6 14 H3.4Z" fill="#f4f1e8"/><rect x="2" y="3" width="10" height="3" fill="#8a5a2c"/>`; }
  else { w = 14; h = 10; const c = ['#b5632a', '#d4a02a', '#8a4a1f', '#c9531e'][o.seed % 4]; svg = `<path d="M1 5 Q7 -2 13 5 Q7 11 1 5Z" fill="${c}"/><path d="M1 5 H13" stroke="#5a2a10" stroke-width=".8"/>`; }
  const ww = w * sc, hh = h * sc, el = box(layer, { left: 0, top: o.y - hh, width: ww, height: hh }), inn = box(el, { left: 0, top: 0, width: ww, height: hh }, `<svg viewBox="0 0 ${w} ${h}" width="${ww}" height="${hh}" style="overflow:visible;display:block">${svg}</svg>`);
  const x0 = dir > 0 ? -ww - 10 : W + 10, S = W + ww + 20 + (o.gap || 200), x1 = x0 + dir * S;
  conv(el, x0, x1, prog(o.at, x0, o.dir, S), o.v, T, D);
  const rot = kind === 'cup' || kind === 'crisps' || kind === 'leaf' ? 360 * dir : 0;
  if (kind === 'crisps') { lp(el, { y: 0 }, { y: -(8 + R() * 8), yoyo: true, ease: 'power2.out' }, .26 + R() * .1, T, D); tl.set(el, { rotation: 0 }, T); lp(inn, { rotation: 0 }, { rotation: 360 * dir }, .55, T, D); }
  else if (kind === 'cup') { lp(inn, { rotation: 0 }, { rotation: 360 * dir }, 1.1, T, D); lp(el, { y: 0 }, { y: -2, yoyo: true, ease: 'sine.inOut' }, .3, T, D); }
  else if (kind === 'news') { lp(inn, { scaleX: 1, skewY: -10 }, { scaleX: .35, skewY: 12, yoyo: true, ease: 'sine.inOut' }, .32 + R() * .1, T, D); lp(el, { y: 0 }, { y: -(24 + R() * 18), yoyo: true, ease: 'sine.inOut' }, .9 + R() * .3, T, D); }
  else if (kind === 'bag') { lp(inn, { scaleX: .8, scaleY: 1.1, rotation: -12 }, { scaleX: 1.15, scaleY: .85, rotation: 14, yoyo: true, ease: 'sine.inOut' }, .5, T, D); lp(el, { y: 0 }, { y: -(30 + R() * 20), yoyo: true, ease: 'sine.inOut' }, 1.5 + R(), T, D); }
  else { lp(inn, { rotation: -20, scaleX: 1 }, { rotation: 200 * dir, scaleX: .5, yoyo: true, ease: 'sine.inOut' }, .5 + R() * .4, T, D); lp(el, { y: 0 }, { y: -(6 + R() * 12), yoyo: true, ease: 'sine.inOut' }, .5 + R() * .4, T, D); }
  return el;
}
function mobility(layer, T, D, y, sc, dir, at, v) {
  const w = 96, h = 78, ww = w * sc, hh = h * sc;
  const el = box(layer, { left: 0, top: y - hh, width: ww, height: hh });
  const inner = box(el, { left: 0, top: 0, width: ww, height: hh, transformOrigin: '50% 50%', transform: dir < 0 ? 'scaleX(-1)' : 'none' }, `<svg viewBox="0 0 ${w} ${h}" width="${ww}" height="${hh}" style="overflow:visible;display:block"><ellipse cx="46" cy="76" rx="38" ry="3" fill="rgba(0,0,0,.22)"/>
    <g transform="translate(6 0)"><g class="flg"><path d="M0 40 V-8" stroke="#555" stroke-width="1.2"/><path d="M0 -8 L16 -4 L0 1Z" fill="#ff8a00"/></g></g>
    <rect x="8" y="46" width="64" height="16" rx="5" fill="#2f5aa8"/><rect x="28" y="30" width="12" height="18" fill="#2f5aa8"/><rect x="12" y="28" width="18" height="22" rx="3" fill="#3a6bc0"/><path d="M58 46 L62 22 L68 22" stroke="#444" stroke-width="3.4" fill="none"/><rect x="64" y="40" width="26" height="14" rx="2" fill="#bbb" stroke="#666"/><path d="M64 40 h26" stroke="#666"/><path d="M68 40 q5 -10 10 0z" fill="#e7a94a"/><rect x="74" y="34" width="8" height="6" fill="#d33" />
    <path d="M30 38 L52 38 L56 56" stroke="#4a4f66" stroke-width="8" stroke-linecap="round" fill="none"/><rect x="52" y="54" width="12" height="5" rx="2" fill="#333"/><path d="M26 18 Q36 14 42 22 L42 38 L26 38Z" fill="#8f2e3c"/><circle cx="36" cy="9" r="7.4" fill="#e3b08a"/><circle cx="43" cy="10" r="1.8" fill="#e3b08a"/><circle cx="40.6" cy="7.8" r="1" fill="#222"/><path d="M28.4 7 Q29 -1 37 0 Q45 1 44 6 L49 7 L40 8Z" fill="#7a5a3a"/><path d="M36 22 L50 28 L62 22" stroke="#8f2e3c" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="62.6" cy="22" r="2.6" fill="#e3b08a"/>
    ${whl(16, 68, 8)}${whl(76, 68, 8)}</svg>`);
  lp(inner.querySelector('.flg'), { skewX: -10 }, { skewX: 12, yoyo: true, ease: 'sine.inOut' }, .25, T, D);
  lp(el.querySelectorAll('.wh'), { rotation: 0 }, { rotation: -360 }, 2 * Math.PI * 8 * sc / v, T, D);
  lp(el, { y: 0 }, { y: -1.2, yoyo: true, ease: 'sine.inOut' }, .35, T, D);
  const x0 = dir > 0 ? -ww - 20 : W + 20, S = W + ww + 40 + 500; conv(el, x0, x0 + dir * S, prog(at, x0, dir, S), v, T, D);
  return el;
}
function kidScooter(layer, T, D, y, sc, dir, at, v) {
  const w = 76, h = 92, ww = w * sc, hh = h * sc;
  const el = box(layer, { left: 0, top: y - hh, width: ww, height: hh });
  box(el, { left: 0, top: 0, width: ww, height: hh, transformOrigin: '50% 50%', transform: dir < 0 ? 'scaleX(-1)' : 'none' }, `<svg viewBox="0 0 ${w} ${h}" width="${ww}" height="${hh}" style="overflow:visible;display:block"><ellipse cx="40" cy="90" rx="30" ry="2.6" fill="rgba(0,0,0,.2)"/>
    <path d="M14 82 H58 L62 84 M58 82 L54 46 M50 44 H62" stroke="#e8281f" stroke-width="3.2" fill="none" stroke-linecap="round"/>
    <g transform="translate(36 50)"><g class="kk"><rect x="-3" y="0" width="6" height="32" rx="3" fill="#2d3c78"/><path d="M-4 31 h8 q5 0 6 4 v3 h-14z" fill="#f2f2f2"/></g></g>
    <rect x="30" y="50" width="6" height="28" rx="3" fill="#23316a" transform="rotate(-6 33 50)"/><path d="M30 76 h10 q4 0 5 4 v2 h-15z" fill="#f2f2f2"/>
    <rect x="22" y="22" width="14" height="30" rx="5" fill="#f08a1c"/><rect x="8" y="26" width="12" height="20" rx="4" fill="#2a6fd0"/><path d="M30 28 L44 40 L52 42" stroke="#f08a1c" stroke-width="4.6" stroke-linecap="round" fill="none"/><circle cx="53" cy="42" r="2.4" fill="#a8693f"/>
    <circle cx="30" cy="14" r="8" fill="#a8693f"/><circle cx="37.6" cy="15.4" r="1.8" fill="#a8693f"/><circle cx="35" cy="12" r="1" fill="#222"/><path d="M21 14 Q21 3 31 3.4 Q40 4 39 12 Q30 8 21 14Z" fill="#2a8be8"/>
    ${whl(14, 82, 7)}${whl(60, 82, 7)}</svg>`);
  lp(el.querySelector('.kk'), { rotation: 8 }, { rotation: -42, yoyo: true, ease: 'power1.inOut' }, .5, T, D, { repeatDelay: .25 });
  lp(el.querySelectorAll('.wh'), { rotation: 0 }, { rotation: 360 }, 2 * Math.PI * 7 * sc / v, T, D);
  lp(el, { y: 0 }, { y: -1.6, yoyo: true, ease: 'sine.inOut' }, .375, T, D);
  const x0 = dir > 0 ? -ww - 20 : W + 20, S = W + ww + 40 + 600; conv(el, x0, x0 + dir * S, prog(at, x0, dir, S), v, T, D);
  return el;
}

// ---------- the road and pavement textures ----------
function roadSvg(p) {
  const R = rr(4242); let s = `<defs><linearGradient id="usA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#868a92"/><stop offset=".5" stop-color="#737780"/><stop offset="1" stop-color="#686c74"/></linearGradient>
   <linearGradient id="usP" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eaf6fd"/><stop offset="1" stop-color="#a9cde2"/></linearGradient>
   <filter id="usg" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7"/><feColorMatrix type="matrix" values="0 0 0 0 0.05  0 0 0 0 0.05  0 0 0 0 0.07  0 0 0 1.3 -0.5"/></filter>
   <filter id="usg2" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="1" seed="21"/><feColorMatrix type="matrix" values="0 0 0 0 0.95  0 0 0 0 0.95  0 0 0 0 0.98  0 0 0 1.4 -0.78"/></filter></defs>`;
  s += `<rect x="0" y="470" width="1280" height="16" fill="#d3cfc3"/>`;
  for (let x = 0; x < 1280; x += 26) s += `<line x1="${x}" y1="470" x2="${x + 3}" y2="484" stroke="rgba(70,65,55,.26)"/>`;
  for (let i = 0; i < 26; i++) s += `<rect x="${R() * 1280}" y="${471 + R() * 9}" width="${8 + R() * 18}" height="${2 + R() * 3}" fill="rgba(0,0,0,.05)"/>`;
  s += `<rect x="0" y="484" width="1280" height="4" fill="#ece8dc"/><rect x="0" y="488" width="1280" height="4" fill="rgba(0,0,0,.22)"/>`;
  s += `<rect x="0" y="488" width="1280" height="132" fill="url(#usA)"/><rect x="0" y="488" width="1280" height="132" filter="url(#usg)" opacity=".55"/><rect x="0" y="488" width="1280" height="132" filter="url(#usg2)" opacity=".45"/>`;
  // tyre tracks
  [[525, 12], [551, 12], [583, 14], [606, 12]].forEach(([y, h]) => { s += `<rect x="0" y="${y - h / 2}" width="1280" height="${h}" fill="rgba(25,25,35,.09)"/>`; });
  // repairs, cracks, patches
  for (let i = 0; i < 9; i++) { const x = R() * 1200, y = 496 + R() * 100, w = 40 + R() * 110, h = 6 + R() * 10; s += `<path d="M${x} ${y} l${w} ${(R() - .5) * 3} l${(R() - .5) * 6} ${h} l${-w} ${(R() - .5) * 4}Z" fill="rgba(35,38,48,${.25 + R() * .2})" stroke="rgba(0,0,0,.25)" stroke-width="1"/>`; }
  for (let i = 0; i < 16; i++) { let x = R() * 1280, y = 492 + R() * 120, d = `M${x} ${y}`; for (let k = 0; k < 5; k++) { x += (R() - .3) * 28; y += (R() - .5) * 9; d += ` L${x.toFixed(1)} ${y.toFixed(1)}`; } s += `<path d="${d}" stroke="rgba(20,20,28,.5)" stroke-width="1.2" fill="none"/>`; }
  for (let i = 0; i < 30; i++) s += `<ellipse cx="${R() * 1280}" cy="${494 + R() * 120}" rx="${3 + R() * 9}" ry="${1 + R() * 2.2}" fill="rgba(15,15,22,${.12 + R() * .14})"/>`;   // oil stains
  for (let i = 0; i < 26; i++) s += `<circle cx="${R() * 1280}" cy="${492 + R() * 122}" r="${1.2 + R() * 1.4}" fill="rgba(235,230,225,.5)"/>`;   // bits
  // manhole + drains
  s += `<ellipse cx="330" cy="600" rx="24" ry="5.6" fill="#4b4f57" stroke="#2b2e34" stroke-width="1.4"/>`; for (let i = -4; i <= 4; i++) s += `<line x1="${330 + i * 5}" y1="595.6" x2="${330 + i * 5}" y2="604.4" stroke="#2e3138" stroke-width="1.2"/>`;
  s += `<ellipse cx="860" cy="545" rx="14" ry="3.2" fill="#555a62" stroke="#2b2e34" stroke-width="1"/><ellipse cx="86" cy="576" rx="12" ry="2.8" fill="#555a62" stroke="#2b2e34" stroke-width="1"/>`;
  for (let i = 0; i < 6; i++) { const x = 120 + i * 220; s += `<rect x="${x}" y="612" width="36" height="6" fill="#2d3036"/>${[0, 1, 2, 3, 4, 5, 6].map(k => `<line x1="${x + 3 + k * 5}" y1="612" x2="${x + 3 + k * 5}" y2="618" stroke="#7a7f88" stroke-width="1.2"/>`).join('')}`; }
  // markings
  s += `<line x1="0" y1="568.5" x2="1280" y2="568.5" stroke="#f4f4ee" stroke-width="4.6" stroke-dasharray="54 44"/>`;
  s += `<line x1="0" y1="610.6" x2="1280" y2="610.6" stroke="#e8c53a" stroke-width="2.4"/><line x1="0" y1="615.2" x2="1280" y2="615.2" stroke="#e8c53a" stroke-width="2.4"/><line x1="0" y1="496" x2="1280" y2="496" stroke="#e8c53a" stroke-width="1.5"/><line x1="0" y1="498.8" x2="1280" y2="498.8" stroke="#e8c53a" stroke-width="1.5"/>`;
  // zebra crossing (stripes run along the road, stacked across it)
  [[502, 5], [514, 6.4], [528, 7.8], [544, 9.4], [562, 11], [582, 12.4]].forEach(([y, h], i) => { s += `<path d="M${842 - i * 3} ${y} H${1002 + i * 3} L${1004 + i * 3} ${y + h} H${840 - i * 3}Z" fill="#f4f4ee" opacity=".93"/>`; });
  s += `<text transform="translate(920 606) scale(1 .45)" text-anchor="middle" font-family="Arial Black,Arial" font-size="19" fill="#f4f4ee" opacity=".85" letter-spacing="2">LOOK RIGHT</text>`;
  s += `<rect x="430" y="594" width="150" height="17" fill="none" stroke="#e8c53a" stroke-width="1.8" stroke-dasharray="7 4"/><text transform="translate(505 608) scale(1 .5)" text-anchor="middle" font-family="Arial Black,Arial" font-size="19" fill="#f4f4ee" opacity=".85">BUS STOP</text>`;
  // puddles with sky reflection
  [[700, 590, 78, 7.4], [186, 604, 44, 4.6], [1130, 548, 40, 4], [470, 536, 28, 3.4], [1232, 600, 36, 4.4]].forEach(([x, y, rx, ry]) => { s += `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="url(#usP)" opacity=".72"/><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1"/><path d="M${x - rx * .6} ${y - ry * .2} H${x - rx * .1} M${x + rx * .2} ${y + ry * .25} H${x + rx * .6}" stroke="#fff" stroke-width="1.4" opacity=".8"/><path d="M${x - rx * .3} ${y - ry * .5} v${ry} M${x + rx * .1} ${y - ry * .6} v${ry * 1.2}" stroke="rgba(180,70,70,.35)" stroke-width="2"/>`; });
  return s;
}

function paveSvg(p) {
  const R = rr(777); let s = `<defs><linearGradient id="usB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfcabd"/><stop offset="1" stop-color="#b7b1a2"/></linearGradient><linearGradient id="usK" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ebe7da"/><stop offset="1" stop-color="#c8c3b4"/></linearGradient>
  <pattern id="usT" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#e1b83a"/><circle cx="3" cy="3" r="1.5" fill="#b8901c"/></pattern></defs>`;
  s += `<rect x="0" y="620" width="1280" height="100" fill="url(#usB)"/><rect x="0" y="620" width="1280" height="4.4" fill="#f3efe3"/><rect x="0" y="624" width="1280" height="9" fill="url(#usK)"/><rect x="0" y="633" width="1280" height="8" fill="rgba(0,0,0,.14)"/>`;
  for (let x = 0; x < 1280; x += 92) s += `<line x1="${x}" y1="620" x2="${x}" y2="633" stroke="rgba(60,55,45,.4)" stroke-width="1.2"/>`;
  const rows = [641, 658, 679, 705, 740]; // joints
  for (let i = 0; i < rows.length - 1; i++) {
    const y0 = rows[i], y1 = rows[i + 1], wd = [50, 60, 74, 92][i];
    for (let x = ((i * 23) % wd) - wd; x < 1280; x += wd) { const tone = R(); s += `<rect x="${x}" y="${y0}" width="${wd}" height="${y1 - y0}" fill="${tone < .3 ? 'rgba(255,255,255,.12)' : tone < .6 ? 'rgba(0,0,0,.05)' : 'rgba(0,0,0,0)'}"/><line x1="${x}" y1="${y0}" x2="${x}" y2="${y1}" stroke="rgba(60,55,45,.34)" stroke-width="1.2"/>`; }
    s += `<line x1="0" y1="${y0}" x2="1280" y2="${y0}" stroke="rgba(60,55,45,.38)" stroke-width="1.3"/>`;
  }
  // tactile paving at crossing, drain, manholes
  s += `<rect x="826" y="634" width="190" height="14" fill="url(#usT)" opacity=".92"/><rect x="826" y="634" width="190" height="14" fill="none" stroke="rgba(100,80,10,.5)"/>`;
  s += `<rect x="180" y="666" width="30" height="20" fill="#7d8186" stroke="#4b4f55"/>${[0, 1, 2, 3, 4, 5].map(k => `<line x1="${184 + k * 4.4}" y1="666" x2="${184 + k * 4.4}" y2="686" stroke="#4b4f55"/>`).join('')}<rect x="610" y="694" width="46" height="18" rx="2" fill="#8d9096" stroke="#55585e"/><text x="633" y="707" text-anchor="middle" font-family="Arial" font-size="8" font-weight="700" fill="#3c3f44">WATER</text><rect x="1010" y="672" width="40" height="16" rx="2" fill="#8d9096" stroke="#55585e"/><path d="M1016 677 h28 M1016 682 h28" stroke="#5a5d63"/>`;
  // wet patches, gum, stains, cracks, leaves
  for (let i = 0; i < 9; i++) s += `<ellipse cx="${R() * 1280}" cy="${644 + R() * 70}" rx="${26 + R() * 54}" ry="${5 + R() * 9}" fill="rgba(60,80,100,.14)"/><ellipse cx="${R() * 1280}" cy="${648 + R() * 66}" rx="${10 + R() * 22}" ry="${2 + R() * 3}" fill="rgba(255,255,255,.16)"/>`;
  for (let i = 0; i < 70; i++) s += `<circle cx="${R() * 1280}" cy="${636 + R() * 82}" r="${.9 + R() * 1.7}" fill="rgba(70,62,55,${.35 + R() * .3})"/>`;
  for (let i = 0; i < 18; i++) { let x = R() * 1280, y = 640 + R() * 70, d = `M${x} ${y}`; for (let k = 0; k < 4; k++) { x += (R() - .4) * 22; y += (R() - .5) * 8; d += ` L${x.toFixed(1)} ${y.toFixed(1)}`; } s += `<path d="${d}" stroke="rgba(50,45,38,.5)" stroke-width="1" fill="none"/>`; }
  for (let i = 0; i < 22; i++) { const x = R() * 1280, y = 640 + R() * 76; s += `<path d="M${x} ${y} q4 -5 8 0 q-4 5 -8 0z" fill="${['#b5632a', '#d4a02a', '#8a4a1f', '#a85a1e'][i % 4]}" transform="rotate(${R() * 180} ${x} ${y})" opacity=".85"/>`; }
  // chalk hopscotch
  for (let i = 0; i < 5; i++) { const x = 1190 + (i % 2) * 24 - (i === 2 || i === 0 ? 12 : 0), y = 710 - i * 15; s += `<rect x="${i === 2 ? 1178 : 1178}" y="${y - 12}" width="22" height="13" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.2" transform="translate(${i % 2 ? 16 : 0} 0)"/>`; }
  s += `<text x="1200" y="704" font-family="Arial" font-size="9" fill="rgba(255,255,255,.6)">1</text><text x="1216" y="689" font-family="Arial" font-size="9" fill="rgba(255,255,255,.6)">2</text><text x="1200" y="674" font-family="Arial" font-size="9" fill="rgba(255,255,255,.6)">3</text><text x="1216" y="659" font-family="Arial" font-size="9" fill="rgba(255,255,255,.6)">4</text>`;
  // gutter litter on a generic stretch (no brand sign near)
  s += `<g transform="translate(396 626)"><rect width="10" height="4" rx="1.5" fill="#c9d3da"/><rect x="2" y="1" width="5" height="1.4" fill="#e8281f"/></g><g transform="translate(405 631) rotate(8)"><path d="M0 0 L10 -2 L11 4 L1 5Z" fill="#e8d6a8"/></g><g transform="translate(60 628)"><rect width="4" height="9" rx="1.6" fill="#8fd0ea" opacity=".8"/></g>`;
  return s;
}

// ---------- main ----------
window.ukStreet = function (w, o) {
  const T = o.T || 0, D = o.D || 40;
  const root = box(w, { left: 0, top: 0, width: W, height: H, overflow: 'hidden', pointerEvents: 'none' });
  const road = box(root, { left: 0, top: 470, width: W, height: 150 }); road.innerHTML = `<svg viewBox="0 470 1280 150" width="1280" height="150" style="display:block">${roadSvg(root)}</svg>`;
  // puddle ripples
  [[700, 590, 78, 7.4], [186, 604, 44, 4.6], [1130, 548, 40, 4]].forEach(([x, y, rx, ry], i) => {
    for (let k = 0; k < 2; k++) { const rg = box(root, { left: x - rx * .5 + (k ? 18 : -14), top: y - ry * .5, width: rx, height: ry, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.8)', opacity: 0 });
      tl.fromTo(rg, { scale: .2, opacity: .9 }, { scale: 1, opacity: 0, duration: 1.1, repeat: Math.max(0, Math.floor(D / 1.7) - 1), repeatDelay: .6, ease: 'sine.out', immediateRender: false }, T + k * .8 + i * .3); }
  });
  // far pavement walkers (tiny)
  const far = box(root, { left: 0, top: 0, width: W, height: H });
  const fcols = [['#c0392b', '#2d3550'], ['#2c8a6b', '#4a4a52'], ['#e0a526', '#33384a'], ['#6a4fb0', '#2d3550'], ['#d4604a', '#3a3a40']];
  for (let i = 0; i < 6; i++) addWalker(far, { skin: SK[(i * 2 + 1) % 7], top: fcols[i % 5][0], bot: fcols[i % 5][1], hair: '#1d1612', type: i % 3 === 2 ? 'dress' : 'trou', head: i % 4 === 1 ? 'hijab' : 'hair', hcol: '#3a6ea5', acc: i % 3 === 0 ? 'bag' : 'none', sc: .27, y: 483, dir: i % 2 ? -1 : 1, v: 14 + i * 3, at: 100 + i * 210, gap: 150, per: .5, amp: 22 }, T, D);

  const lanes = {};
  const lane = (name) => lanes[name] = box(root, { left: 0, top: 0, width: W, height: H });
  const farSlow = lane('farSlow'), farFast = lane('farFast'), nearSlow = lane('nearSlow'), nearFast = lane('nearFast');
  let vid = 0;
  function veh(parent, o) {
    const f = o.dir < 0, b = VT[o.t](f, o), ww = b.w * o.sc, hh = b.h * o.sc, R = rr(300 + (vid++) * 17);
    const el = box(parent, { left: 0, top: o.base - hh + 1, width: ww, height: hh });
    const svg = `<svg viewBox="0 0 ${b.w} ${b.h}" width="${ww}" height="${hh}" style="overflow:visible;display:block"><g ${f ? `transform="translate(${b.w} 0) scale(-1 1)"` : ''}><g class="bd">${b.body}</g>${b.wheels.map(q => whl(q[0], q[1], q[2])).join('')}</g></svg>`;
    el.insertAdjacentHTML('afterbegin', svg);
    const q = c => el.querySelectorAll('.' + c);
    lp(q('wh'), { rotation: 0 }, { rotation: 360 }, 2 * Math.PI * b.wheels[0][2] * o.sc / o.v, T, D);
    lp(q('bd'), { y: 0 }, { y: o.t === 'bike' ? -1.8 : -1.5, yoyo: true, ease: 'sine.inOut' }, o.t === 'bike' ? .3 : .28 + R() * .18, T, D);
    if (q('lgA').length) { lp(q('lgA'), { rotation: -26 }, { rotation: 22, yoyo: true, ease: 'sine.inOut' }, .42, T, D); lp(q('lgB'), { rotation: 22 }, { rotation: -26, yoyo: true, ease: 'sine.inOut' }, .42, T, D); }
    if (q('brk').length) lp(q('brk'), { opacity: 0 }, { opacity: 1, yoyo: true, ease: 'none' }, .1, T + R() * 3, D, { repeatDelay: 1.6 + R() * 2.6 });
    if (q('bcn').length) lp(q('bcn'), { opacity: .15 }, { opacity: 1, yoyo: true, ease: 'none' }, .28, T, D);
    if (b.exh) for (let k = 0; k < 2; k++) {
      const ex = b.exh, px0 = (f ? (b.w - ex[0]) : ex[0]) * o.sc, py0 = ex[1] * o.sc, r = (o.t === 'lorry' ? 7 : 5) * o.sc;
      const pf = box(el, { left: px0 - r, top: py0 - r, width: r * 2, height: r * 2, borderRadius: '50%', background: o.t === 'lorry' ? 'rgba(80,80,86,.55)' : 'rgba(225,225,230,.6)', opacity: 0 });
      tl.fromTo(pf, { x: 0, y: 0, scale: .4, opacity: .65 }, { x: (f ? 1 : -1) * -34 * o.sc + (f ? 0 : 0), y: -(o.t === 'lorry' ? 40 : 20) * o.sc, scale: 2, opacity: 0, duration: 1.1, repeat: Math.max(0, Math.floor(D / 1.7) - 1), repeatDelay: .6, ease: 'sine.out', immediateRender: false }, T + k * .85 + R() * .4);
    }
    const x0 = o.dir > 0 ? -ww - 20 : W + 20, x1 = x0 + o.dir * o.S, s0 = o.s;
    conv(el, x0, x1, s0, o.v, T, D);
    return el;
  }
  // far lane (cars go LEFT TO RIGHT), fast convoy, S common so nobody overlaps
  const FF = { dir: 1, base: 556, v: 168, S: 3000 };
  veh(farFast, Object.assign({ t: 'hatch', col: '#c9ccd2', sc: .78, s: 380, sk: 1 }, FF));
  veh(farFast, Object.assign({ t: 'taxi', sc: .76, s: 900 }, FF));
  veh(farFast, Object.assign({ t: 'van', sc: .74, s: 1350, b: 0, st: '#2b6cb0' }, FF));
  veh(farFast, Object.assign({ t: 'bus', rt: '88', col: '#cf2a31', sc: .66, s: 1950 }, FF));
  veh(farFast, Object.assign({ t: 'hatch', col: '#d95a2b', sc: .78, s: 2550, sk: 4 }, FF));
  veh(farSlow, { t: 'bike', dir: 1, base: 540, sc: .74, v: 78, S: 2100, s: 500, sk: 3 });
  veh(farSlow, { t: 'bike', dir: 1, base: 541, sc: .72, v: 78, S: 2100, s: 1400, sk: 1 });
  const NF = { dir: -1, base: 608, v: 236, S: 3400 };
  veh(nearFast, Object.assign({ t: 'hatch', col: '#2f6fc4', sc: 1, s: 60, sk: 3 }, NF));
  veh(nearFast, Object.assign({ t: 'bus', rt: '25', col: '#d6232b', sc: 1, s: 560 }, NF));
  veh(nearFast, Object.assign({ t: 'taxi', sc: 1, s: 1100 }, NF));
  veh(nearFast, Object.assign({ t: 'moped', sc: .95, s: 1650 }, NF));
  veh(nearFast, Object.assign({ t: 'van', sc: 1, s: 2250, b: 0, col: '#f6f6f2', st: '#d93a2b' }, NF));
  veh(nearFast, Object.assign({ t: 'hatch', col: '#e1b21a', sc: 1, s: 2850, sk: 5 }, NF));
  veh(nearSlow, { t: 'lorry', dir: -1, base: 588, sc: .92, v: 58, S: 2300, s: 300 });

  // pavement
  const pave = box(root, { left: 0, top: 620, width: W, height: 100 }); pave.innerHTML = `<svg viewBox="0 620 1280 100" width="1280" height="100" style="display:block">${paveSvg()}</svg>`;
  const items = [], P = box(root, { left: 0, top: 0, width: W, height: H });
  const add = (y, fn) => items.push([y, fn]);
  // furniture
  add(640, p => lampPost(p, 90, 640, T, D)); add(640, p => lampPost(p, 745, 640, T, D)); add(640, p => lampPost(p, 1215, 640, T, D));
  add(646, p => litterBin(p, 330, 648, T, D, '#c8202a', 1)); add(646, p => blackBin(p, 1060, 648, T, D));
  add(650, p => recyc(p, 1150, 652)); add(650, p => postbox(p, 255, 650));
  add(648, p => busStop(p, 560, 650, T, D)); add(648, p => bollards(p, 395, 640, 4));
  add(652, p => bench(p, 905, 656)); add(656, p => oldMan(p, 906, 656, T, D)); add(664, p => aboard(p, 800, 668, T, D));
  add(650, p => cycleRack(p, 1105, 652)); add(640, p => belisha(p, 826, 642, T, D)); add(640, p => pelican(p, 1022, 642, T, D));
  add(660, p => pigeon(p, 955, 689, 1, false, T, D, 11)); add(660, p => pigeon(p, 986, 696, .9, true, T, D, 12)); add(660, p => pigeon(p, 930, 700, .95, false, T, D, 13));
  add(716, p => pigeon(p, 612, 712, 1.1, true, T, D, 14)); add(716, p => pigeon(p, 220, 700, 1, false, T, D, 15));
  // pigeon perched on a lamp head
  add(300, p => pigeon(p, 818, 424, .8, true, T, D, 16));
  // waiting queue at the bus stop (idle)
  const Q = [{ skin: SK[1], top: '#2f6f9f', bot: '#2b2d3a', hair: '#2a1a12', head: 'long', acc: 'phone', sc: .98, y: 668, at: 520 }, { skin: SK[4], top: '#c8c3b4', bot: '#2e3a52', hair: '#111', head: 'hair', acc: 'rucksack', bagc: '#c8482b', sc: .96, y: 672, at: 548, ph: 1 }, { skin: SK[2], top: '#7b3b91', bot: '#7b3b91', type: 'dress', hair: '#111', head: 'hijab', hcol: '#e9e1ce', acc: 'bag', bagc: '#d14', sc: .94, y: 670, at: 576, ph: 2 }];
  Q.forEach(q => add(q.y, p => addWalker(p, Object.assign({ idle: true, dir: 1, v: 1 }, q), T, D)));
  const WK = [
    { skin: SK[2], top: '#e0457b', trim: '#e6b84a', type: 'sari', hair: '#1a110c', head: 'bun', acc: 'bag', bagc: '#2b8c5a', sc: .8, y: 654, dir: 1, v: 46, at: 160, blouse: '#8a2342' },
    { skin: SK[3], top: '#8fc3e6', bot: '#8fc3e6', type: 'kurta', hair: '#161616', head: 'topi', acc: 'none', sc: 1.04, y: 708, dir: -1, v: 62, at: 1010, shoe: '#6d4a2a' },
    { skin: SK[1], top: '#1d6e6b', bot: '#1d6e6b', type: 'dress', hair: '#111', head: 'hijab', hcol: '#14304f', sleeve: 'long', acc: 'push', pc: '#3b6fc0', sc: .95, y: 692, dir: 1, v: 40, at: 330 },
    { skin: SK[6], top: '#e9ab1d', bot: '#c7371d', type: 'dress', pat: '#2b1d8a', trim: '#2b1d8a', hair: '#111', head: 'gele', hcol: '#e86a17', acc: 'bags', sc: .88, y: 674, dir: -1, v: 52, at: 700 },
    { skin: SK[0], top: '#232a3a', bot: '#232a3a', hair: '#7b5a2a', head: 'hair', sleeve: 'long', acc: 'umb', ubc: '#c8202a', sc: .64, y: 642, dir: 1, v: 38, at: 420 },
    { skin: SK[5], top: '#3b3f4a', bot: '#2a4a8a', hair: '#111', head: 'hood', acc: 'phone', sc: .78, y: 664, dir: -1, v: 55, at: 1160 },
    { skin: SK[3], top: '#16a39a', bot: '#222', type: 'shorts', hair: '#111', head: 'headband', run: true, lean: 6, vest: '#ffe14a', sc: 1, y: 700, dir: 1, v: 150, at: 80, gap: 700 },
    { skin: SK[1], top: '#f2efe4', bot: '#4a4f6e', hair: '#3a2a1a', head: 'hair', sleeve: 'long', acc: 'dog', sc: .7, y: 647, dir: -1, v: 36, at: 880 },
    { skin: SK[4], top: '#2e4d3a', bot: '#c8b48a', hair: '#0f0f0f', head: 'cap', hcol: '#d9c38c', sleeve: 'long', acc: 'none', sc: .78, y: 664, dir: 1, v: 50, at: 640, lanyard: false },
    { skin: SK[2], top: '#2fa0d8', bot: '#2fa0d8', hair: '#111', head: 'bun', lanyard: true, acc: 'bag', bagc: '#333', sc: .62, y: 641, dir: -1, v: 44, at: 330 },
    { skin: SK[3], top: '#3a3a42', bot: '#1d1d24', hair: '#111', head: 'cap', hcol: '#c8462b', sleeve: 'long', acc: 'bag', bagc: '#c7c7c0', sc: 1.02, y: 703, dir: 1, v: 58, at: 540 },
    { skin: SK[2], top: '#2e8b6b', trim: '#d0a030', type: 'sari', blouse: '#7a2a2a', hair: '#161616', head: 'long', acc: 'bags', sc: .92, y: 686, dir: -1, v: 50, at: 1100 },
    { skin: SK[5], top: '#f2f2f2', bot: '#2d3550', hair: '#111', head: 'hair', acc: 'rucksack', bagc: '#2a8be8', sc: .74, y: 656, dir: 1, v: 54, at: 40, per: .3 },
    { skin: SK[0], top: '#6d5a44', bot: '#51565f', hair: '#bbbbbb', head: 'cap', hcol: '#6b6f78', sleeve: 'long', acc: 'none', sc: .76, y: 662, dir: -1, v: 28, at: 760, per: .46, amp: 18 },
    { skin: SK[4], top: '#ffdf2b', vest: '#ffdf2b', bot: '#33384a', hair: '#111', head: 'hair', acc: 'rucksack', bagc: '#1b6bd0', sc: .86, y: 678, dir: 1, v: 60, at: 940 }
  ];
  WK.forEach(q => add(q.y, p => addWalker(p, q, T, D)));
  add(676, p => mobility(p, T, D, 678, .9, 1, 520, 46));
  add(697, p => kidScooter(p, T, D, 696, .84, -1, 330, 96));
  items.sort((a, b) => a[0] - b[0]).forEach(it => it[1](P));
  // blown litter and leaves on generic stretches (flying/rolling along; never beside a brand sign)
  const L = box(root, { left: 0, top: 0, width: W, height: H });
  drift(L, 'crisps', { y: 706, sc: 1, dir: 1, v: 140, at: 200, seed: 31, gap: 600 }, T, D);
  drift(L, 'news', { y: 690, sc: 1, dir: -1, v: 95, at: 800, seed: 32, gap: 500 }, T, D);
  drift(L, 'cup', { y: 714, sc: 1, dir: -1, v: 60, at: 1100, seed: 33, gap: 400 }, T, D);
  drift(L, 'bag', { y: 640, sc: 1.2, dir: 1, v: 70, at: 300, seed: 34, gap: 800 }, T, D);
  drift(L, 'leaf', { y: 700, sc: 1, dir: 1, v: 80, at: 500, seed: 35, gap: 300 }, T, D); drift(L, 'leaf', { y: 664, sc: .9, dir: 1, v: 62, at: 900, seed: 36, gap: 300 }, T, D);
  drift(L, 'leaf', { y: 716, sc: 1, dir: -1, v: 70, at: 400, seed: 37, gap: 300 }, T, D); drift(L, 'leaf', { y: 618, sc: .8, dir: -1, v: 110, at: 650, seed: 38, gap: 300 }, T, D);
  // pigeons in flight over the road
  const fl = box(root, { left: 0, top: 0, width: W, height: H });
  [{ y: 560, dir: 1, v: 90, at: 200, seed: 41 }, { y: 520, dir: -1, v: 120, at: 900, seed: 42 }].forEach(f => {
    const el = pigeon(fl, 0, f.y, .7, f.dir < 0, T, D, f.seed, { fly: true }), R = rr(f.seed);
    const x0 = f.dir > 0 ? -60 : W + 20, S = W + 100 + 500; conv(el, x0, x0 + f.dir * S, prog(f.at, x0, f.dir, S), f.v, T, D);
    lp(el, { y: 0 }, { y: -22, yoyo: true, ease: 'sine.inOut' }, 1.1 + R(), T, D);
  });
  root.querySelectorAll('svg g').forEach(g => g.setAttribute('data-svg-origin', '0 0'));   // gsap: rotate SVG parts about their own local origin
  return { root, road, pave, traffic: lanes, people: P };
};
})();
