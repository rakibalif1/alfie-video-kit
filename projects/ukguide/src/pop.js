// ===== UK GUIDE pop-art kit (1280x720). Needs kit.js (box, mk, rr, S, win, W, H, tl), kit2.js (puppet), anime.js (animePuppet, CAST). =====
const INK = '#14101c';
const PP = { yellow: '#ffe066', orange: '#ff9f1c', red: '#e63946', blue: '#3a86ff', navy: '#1d3557', teal: '#2a9d8f', pink: '#f72585', purple: '#7b2cbf', green: '#38b000', cream: '#fff8e1', white: '#ffffff', sky: '#8ecae6', mint: '#b7e4c7', grey: '#e9ecef' };
const FONT = '"Arial Black", Impact, Arial, sans-serif';
window.SFX = window.SFX || [];
const sfx = (name, t, vol) => window.SFX.push([name, +(+t).toFixed(2), vol ?? 1]);   // names: stamp pop ding whoosh cash buzz tick chime ring coin swish thud
const LS = (scene, who) => LINES.filter((l) => l.scene === scene && (!who || l.who === who));   // lines of a scene (start, dur, who, text)

// flat colour background with halftone dots that drift slowly
function bgPop(c, o) {
  const e = box(c, { left: -60, top: -60, width: W + 120, height: H + 120, background: `radial-gradient(circle, ${o.dot || 'rgba(20,16,28,0.13)'} 2.6px, transparent 3px) 0 0/${o.size || 26}px ${o.size || 26}px, ${o.color || PP.yellow}` });
  tl.to(e, { x: -26, y: -26, duration: o.D || 60, ease: 'none' }, o.T || 0); return e;
}
// pop an element in (scale + fade with overshoot) at T, optionally pop out at `out`
function pop(el, T, o = {}) {
  gsap.set(el, { opacity: 0, scale: o.from ?? 0.2, rotation: o.rot ?? 0 });
  tl.to(el, { opacity: 1, scale: o.to ?? 1, rotation: o.rot ?? 0, duration: o.d ?? 0.45, ease: 'back.out(2.2)' }, T);
  if (o.out !== undefined) tl.to(el, { opacity: 0, scale: 0.6, duration: 0.3, ease: 'power2.in' }, o.out);
  if (o.sfx !== false) sfx(o.sfx || 'pop', T + 0.05, o.vol ?? 0.6);
  return el;
}
// slide an element in from a side
function slide(el, T, o = {}) {
  const from = { left: { x: -(o.dist ?? 700) }, right: { x: o.dist ?? 700 }, up: { y: -(o.dist ?? 500) }, down: { y: o.dist ?? 500 } }[o.from || 'left'];
  gsap.set(el, Object.assign({ opacity: 0 }, from)); tl.to(el, { opacity: 1, x: 0, y: 0, duration: o.d ?? 0.6, ease: 'power3.out' }, T);
  if (o.out !== undefined) tl.to(el, { opacity: 0, duration: 0.3 }, o.out); if (o.sfx !== false) sfx('swish', T, 0.4); return el;
}
// rounded card with thick outline and hard shadow. o: {x,y (centre), w,h, html, bg, color, size, rot, T, out}
function card(c, o) {
  const e = box(c, { left: o.x - o.w / 2, top: o.y - o.h / 2, width: o.w, height: o.h, background: o.bg || PP.white, color: o.color || INK, border: `5px solid ${INK}`, borderRadius: o.r ?? 18, boxShadow: `7px 7px 0 ${INK}`,
    font: `${o.weight || 900} ${o.size || 30}px/${(o.size || 30) * 1.15}px ${FONT}`, textAlign: o.align || 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 16px', boxSizing: 'border-box', opacity: 0 }, o.html || '');
  pop(e, o.T, { rot: o.rot ?? 0, out: o.out, sfx: o.sfx }); return e;
}
// slam-down stamp (RED by default). o: {x,y,text,color,rot,w,size,T,out}
function stamp(c, o) {
  const w = o.w || 300, e = box(c, { left: o.x - w / 2, top: o.y - 42, width: w, height: 84, border: `7px solid ${o.color || PP.red}`, borderRadius: 14, color: o.color || PP.red, font: `900 ${o.size || 44}px/70px ${FONT}`, textAlign: 'center', letterSpacing: '3px', background: 'rgba(255,255,255,0.9)', opacity: 0 }, o.text);
  gsap.set(e, { scale: 3.2, rotation: (o.rot ?? -8) + 12 });
  tl.to(e, { opacity: 1, scale: 1, rotation: o.rot ?? -8, duration: 0.18, ease: 'power4.in' }, o.T); tl.to(e, { x: '+=4', duration: 0.04, yoyo: true, repeat: 3 }, o.T + 0.18);
  sfx('stamp', o.T + 0.16, 0.9); if (o.out !== undefined) tl.to(e, { opacity: 0, duration: 0.25 }, o.out); return e;
}
// comic starburst behind something. o: {x,y,r,color,T,out}
function burst(c, o) {
  const n = 14, pts = []; for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * Math.PI * 2, r = i % 2 ? o.r * 0.68 : o.r; pts.push(`${o.r + Math.cos(a) * r},${o.r + Math.sin(a) * r}`); }
  const e = box(c, { left: o.x - o.r, top: o.y - o.r, width: o.r * 2, height: o.r * 2, opacity: 0 }, `<svg viewBox="0 0 ${o.r * 2} ${o.r * 2}" width="100%" height="100%"><polygon points="${pts.join(' ')}" fill="${o.color || PP.orange}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/></svg>`);
  pop(e, o.T, { out: o.out, sfx: false }); tl.to(e, { rotation: 6, duration: 2, yoyo: true, repeat: 20, ease: 'sine.inOut' }, o.T); return e;
}
// speech bubble with name tag. o: {x,y (bubble centre), w, text, who:'KIRAN', color (tag), tail:'left'|'right'|'down', T, D}
function speech(c, o) {
  const w = o.w || 380, cpl = Math.floor((w - 44) / (0.56 * (o.size || 28))), h = o.h || Math.max(86, 40 + (o.size || 28) * 1.25 * Math.ceil(o.text.length / cpl)), e = box(c, { left: o.x - w / 2, top: o.y - h / 2, width: w, height: h, opacity: 0 });
  const tail = o.tail === 'right' ? `<polygon points="${w - 70},${h - 4} ${w - 30},${h + 36} ${w - 36},${h - 4}" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>` : o.tail === 'left' ? `<polygon points="36,${h - 4} 28,${h + 36} 76,${h - 4}" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>` : '';
  e.innerHTML = `<svg viewBox="0 0 ${w} ${h + 40}" width="${w}" height="${h + 40}" style="position:absolute;left:0;top:0;overflow:visible"><rect x="3" y="3" width="${w - 6}" height="${h - 6}" rx="26" fill="#fff" stroke="${INK}" stroke-width="5"/>${tail}<rect x="30" y="${h - 8}" width="${o.tail ? 46 : 0}" height="10" fill="#fff"/></svg>`;
  box(e, { left: 0, top: 0, width: w, height: h, font: `800 ${o.size || 28}px/1.15 Arial, sans-serif`, color: INK, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 22px 8px', boxSizing: 'border-box' }, o.text);
  if (o.who) box(e, { left: 18, top: -22, background: o.color || PP.blue, color: '#fff', font: `900 20px/1 ${FONT}`, padding: '6px 14px', border: `4px solid ${INK}`, borderRadius: 10, letterSpacing: '1px' }, o.who);
  pop(e, o.T, { out: o.T + (o.D ?? 3), sfx: false, d: 0.3 }); return e;
}
// character helpers
function cast(c, key, o) { return animePuppet(c, Object.assign({}, CAST[key], o)); }
// make a character talk and react for every line of `who` in `scene` (mouth flaps + emotion from the line's emotion tag). Returns the lines.
function talkLines(p, scene, who) {
  const map = { angry: 'angry', sad: 'sad', surprised: 'surprised', sly: 'sly', excited: 'happy', cheer: 'happy', panic: 'surprised', worried: 'sad', calm: 'normal' };
  return LS(scene, who).map((l) => { const L = LINES.indexOf(l); p.emote(map[(EPLINES[L] || {}).emotion] || 'normal', l.start); p.talk(l.start, l.dur); return l; });
}
// money bar. o: {x,y,w,h,color,label,T} -> {fill, set(frac,T,d)}
function moneyBar(c, o) {
  const e = box(c, { left: o.x - o.w / 2, top: o.y, width: o.w, height: o.h, background: '#fff', border: `5px solid ${INK}`, borderRadius: 16, overflow: 'hidden', boxShadow: `6px 6px 0 ${INK}`, opacity: 0 });
  const fill = box(e, { left: 0, bottom: 0, width: '100%', height: '100%', background: o.color || PP.green, transformOrigin: '50% 100%' });
  box(e, { left: 0, top: 4, width: '100%', textAlign: 'center', font: `900 ${o.size || 26}px ${FONT}`, color: INK }, o.label || '');
  pop(e, o.T, { sfx: false }); return { el: e, fill, set: (f, T, d = 0.6) => tl.to(fill, { scaleY: f, duration: d, ease: 'power3.out' }, T) };
}
// phone mock. o: {x,y (centre), s, html (screen content), T} -> {el, screen}
function phone(c, o) {
  const s = o.s || 1, e = box(c, { left: o.x - 130 * s, top: o.y - 250 * s, width: 260, height: 500, transformOrigin: '0 0', transform: `scale(${s})`, opacity: 0 });
  e.style.left = (o.x - 130 * s) + 'px'; e.style.top = (o.y - 250 * s) + 'px';
  box(e, { left: 0, top: 0, width: 260, height: 500, background: INK, borderRadius: 40, boxShadow: `9px 9px 0 rgba(0,0,0,.35)` });
  const screen = box(e, { left: 12, top: 14, width: 236, height: 472, background: '#fff', borderRadius: 30, overflow: 'hidden', font: '700 22px Arial', color: INK }, o.html || '');
  box(e, { left: 92, top: 18, width: 76, height: 18, background: INK, borderRadius: 12 });
  tl.fromTo(e, { opacity: 0, y: 160 }, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.6)' }, o.T); sfx('swish', o.T, 0.4); return { el: e, screen };
}
// flat scenery
function skyline(c, o) {   // row of flat buildings. o:{y (ground line), n, seed, colors[], minH, maxH, T, D, drift}
  const R = rr(o.seed || 5), cols = o.colors || ['#5c677d', '#7d8597', '#979dac'], wrap = box(c, { left: -100, top: 0, width: W + 200, height: H });
  let x = -40; while (x < W + 140) { const w = 90 + R() * 110, h = (o.minH || 160) + R() * ((o.maxH || 330) - (o.minH || 160)), col = cols[Math.floor(R() * cols.length)];
    let win = ''; for (let yy = 22; yy < h - 30; yy += 38) for (let xx = 14; xx < w - 24; xx += 32) if (R() > 0.35) win += `<rect x="${xx}" y="${yy}" width="16" height="22" rx="3" fill="${R() > 0.7 ? '#ffe066' : 'rgba(255,255,255,.55)'}"/>`;
    box(wrap, { left: x + 100, top: o.y - h, width: w, height: h }, `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><rect x="2" y="2" width="${w - 4}" height="${h - 2}" fill="${col}" stroke="${INK}" stroke-width="4"/>${win}</svg>`); x += w + 8 + R() * 12; }
  if (o.drift) tl.to(wrap, { x: o.drift, duration: o.D || 60, ease: 'none' }, o.T || 0); return wrap;
}
function ground(c, o) { return box(c, { left: -20, top: o.y, width: W + 40, height: H - o.y + 20, background: o.color || '#4a4e69', borderTop: `6px solid ${INK}` }); }
function bus(c, o) {   // red double-decker side view. o:{x,y (bottom-left), s, T, from, to, D}
  const s = o.s || 1, e = box(c, { left: o.x, top: o.y - 210 * s, width: 420 * s, height: 210 * s });
  let w1 = '', w2 = ''; for (let i = 0; i < 6; i++) { w1 += `<rect x="${30 + i * 62}" y="28" width="46" height="40" rx="6" fill="#bde0fe" stroke="${INK}" stroke-width="4"/>`; w2 += `<rect x="${30 + i * 62}" y="100" width="46" height="40" rx="6" fill="#bde0fe" stroke="${INK}" stroke-width="4"/>`; }
  e.innerHTML = `<svg viewBox="0 0 420 210" width="100%" height="100%"><rect x="6" y="10" width="408" height="170" rx="22" fill="#e63946" stroke="${INK}" stroke-width="6"/><rect x="6" y="84" width="408" height="10" fill="#b5171e"/>${w1}${w2}<circle cx="96" cy="184" r="26" fill="${INK}"/><circle cx="96" cy="184" r="11" fill="#adb5bd"/><circle cx="326" cy="184" r="26" fill="${INK}"/><circle cx="326" cy="184" r="11" fill="#adb5bd"/></svg>`;
  if (o.to !== undefined) tl.fromTo(e, { x: o.from ?? -600 }, { x: o.to, duration: o.D || 6, ease: 'power2.out' }, o.T || 0); return e;
}
// icons (inline svg strings, 64x64, thick outline). iconBox puts one in a coloured circle that pops in.
const ICONS = {
  phone: '<rect x="18" y="6" width="28" height="52" rx="6" fill="#fff"/><rect x="22" y="12" width="20" height="34" fill="#8ecae6"/><circle cx="32" cy="52" r="2.5" fill="#14101c"/>',
  laptop: '<rect x="12" y="14" width="40" height="28" rx="3" fill="#8ecae6"/><path d="M6 46 H58 L54 52 H10Z" fill="#fff"/>',
  sim: '<path d="M16 6 H40 L50 16 V58 H16Z" fill="#ffd166"/><rect x="24" y="28" width="18" height="18" rx="3" fill="#b8860b"/>',
  bank: '<path d="M8 24 L32 8 L56 24Z" fill="#fff"/><rect x="12" y="28" width="8" height="22" fill="#fff"/><rect x="28" y="28" width="8" height="22" fill="#fff"/><rect x="44" y="28" width="8" height="22" fill="#fff"/><rect x="8" y="52" width="48" height="6" fill="#fff"/>',
  card: '<rect x="6" y="14" width="52" height="36" rx="6" fill="#ffd166"/><rect x="6" y="22" width="52" height="8" fill="#14101c"/><rect x="12" y="38" width="16" height="5" fill="#fff"/>',
  doc: '<path d="M14 6 H38 L50 18 V58 H14Z" fill="#fff"/><path d="M20 28 H44 M20 36 H44 M20 44 H36" stroke="#14101c" stroke-width="3"/>',
  calendar: '<rect x="8" y="12" width="48" height="44" rx="6" fill="#fff"/><rect x="8" y="12" width="48" height="12" fill="#e63946"/><path d="M20 34 H44 M20 44 H36" stroke="#14101c" stroke-width="3"/>',
  shield: '<path d="M32 6 L54 14 V32 Q54 50 32 58 Q10 50 10 32 V14Z" fill="#38b000"/><path d="M21 32 L29 40 L44 22" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  search: '<circle cx="27" cy="27" r="16" fill="#bde0fe"/><path d="M39 39 L56 56" stroke="#14101c" stroke-width="7" stroke-linecap="round"/>',
  bus: '<rect x="8" y="12" width="48" height="36" rx="8" fill="#e63946"/><rect x="14" y="18" width="14" height="12" fill="#bde0fe"/><rect x="34" y="18" width="14" height="12" fill="#bde0fe"/><circle cx="20" cy="50" r="6" fill="#14101c"/><circle cx="44" cy="50" r="6" fill="#14101c"/>',
  house: '<path d="M6 30 L32 8 L58 30Z" fill="#e63946"/><rect x="12" y="30" width="40" height="26" fill="#fff"/><rect x="27" y="38" width="12" height="18" fill="#ffd166"/>',
  key: '<circle cx="20" cy="32" r="12" fill="#ffd166"/><path d="M30 32 H58 M48 32 V42 M56 32 V40" stroke="#14101c" stroke-width="6"/>',
  cross: '<rect x="8" y="8" width="48" height="48" rx="10" fill="#fff"/><path d="M32 16 V48 M16 32 H48" stroke="#2a9d8f" stroke-width="10"/>',
  ballot: '<rect x="10" y="28" width="44" height="28" rx="4" fill="#3a86ff"/><rect x="22" y="22" width="20" height="6" fill="#14101c"/><path d="M20 6 H44 V30 H20Z" fill="#fff"/><path d="M26 16 L31 21 L40 11" stroke="#38b000" stroke-width="4" fill="none"/>',
  pound: '<circle cx="32" cy="32" r="26" fill="#ffd166"/><text x="32" y="44" font-size="34" font-family="Arial Black" text-anchor="middle" fill="#14101c" stroke="none">£</text>',
  warn: '<path d="M32 6 L60 56 H4Z" fill="#ffd166"/><path d="M32 22 V38" stroke="#14101c" stroke-width="6" stroke-linecap="round"/><circle cx="32" cy="47" r="3.5" fill="#14101c"/>',
  tick: '<circle cx="32" cy="32" r="26" fill="#38b000"/><path d="M18 33 L28 43 L47 22" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  xmark: '<circle cx="32" cy="32" r="26" fill="#e63946"/><path d="M20 20 L44 44 M44 20 L20 44" stroke="#fff" stroke-width="7" stroke-linecap="round"/>',
  lock: '<path d="M20 28 V20 Q20 8 32 8 Q44 8 44 20 V28" fill="none" stroke="#14101c" stroke-width="6"/><rect x="12" y="28" width="40" height="28" rx="6" fill="#ffd166"/><circle cx="32" cy="42" r="4" fill="#14101c"/>',
  pin: '<path d="M32 58 Q12 34 12 24 A20 20 0 0 1 52 24 Q52 34 32 58Z" fill="#e63946"/><circle cx="32" cy="24" r="8" fill="#fff"/>',
  id: '<rect x="6" y="14" width="52" height="36" rx="6" fill="#bde0fe"/><circle cx="22" cy="30" r="7" fill="#fff"/><path d="M34 26 H52 M34 34 H48" stroke="#14101c" stroke-width="3"/>',
  bell: '<path d="M32 8 Q16 8 16 28 V38 L10 46 H54 L48 38 V28 Q48 8 32 8Z" fill="#ffd166"/><circle cx="32" cy="52" r="5" fill="#ffd166"/>',
  clock: '<circle cx="32" cy="32" r="26" fill="#fff"/><path d="M32 16 V32 L44 38" stroke="#14101c" stroke-width="5" fill="none" stroke-linecap="round"/>',
  user: '<circle cx="32" cy="22" r="13" fill="#fff"/><path d="M8 58 Q8 36 32 36 Q56 36 56 58Z" fill="#fff"/>',
  map: '<path d="M6 14 L22 8 L42 14 L58 8 V50 L42 56 L22 50 L6 56Z" fill="#b7e4c7"/><path d="M22 8 V50 M42 14 V56" stroke="#14101c" stroke-width="3"/>',
  train: '<rect x="12" y="8" width="40" height="40" rx="10" fill="#3a86ff"/><rect x="18" y="14" width="28" height="16" fill="#bde0fe"/><circle cx="22" cy="38" r="3" fill="#ffd166"/><circle cx="42" cy="38" r="3" fill="#ffd166"/><path d="M18 56 L24 48 M46 56 L40 48" stroke="#14101c" stroke-width="4"/>',
  school: '<path d="M6 26 L32 10 L58 26Z" fill="#7b2cbf"/><rect x="12" y="26" width="40" height="28" fill="#fff"/><rect x="27" y="36" width="10" height="18" fill="#ffd166"/>',
  car: '<path d="M6 40 L12 24 H44 L54 40 V48 H6Z" fill="#3a86ff"/><rect x="16" y="28" width="12" height="10" fill="#bde0fe"/><rect x="32" y="28" width="10" height="10" fill="#bde0fe"/><circle cx="18" cy="50" r="6" fill="#14101c"/><circle cx="44" cy="50" r="6" fill="#14101c"/>',
  book: '<path d="M8 12 H30 Q32 12 32 16 V54 Q30 50 8 50Z" fill="#fff"/><path d="M56 12 H34 Q32 12 32 16 V54 Q34 50 56 50Z" fill="#ffd166"/>',
  tv: '<rect x="6" y="12" width="52" height="34" rx="6" fill="#8ecae6"/><path d="M22 54 H42 M32 46 V54" stroke="#14101c" stroke-width="5"/>',
  wifi: '<path d="M8 26 Q32 4 56 26 M16 36 Q32 20 48 36 M24 46 Q32 38 40 46" stroke="#14101c" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="32" cy="54" r="4" fill="#14101c"/>',
  suitcase: '<rect x="8" y="18" width="48" height="36" rx="6" fill="#3a86ff"/><path d="M24 18 V10 H40 V18" stroke="#14101c" stroke-width="5" fill="none"/><rect x="28" y="30" width="8" height="8" fill="#ffd166"/>',
  sofa: '<rect x="8" y="26" width="48" height="22" rx="8" fill="#e76f51"/><rect x="4" y="32" width="12" height="20" rx="5" fill="#e76f51"/><rect x="48" y="32" width="12" height="20" rx="5" fill="#e76f51"/>',
  stethoscope: '<path d="M18 8 V28 Q18 42 32 42 Q46 42 46 28 V8" stroke="#14101c" stroke-width="5" fill="none"/><circle cx="46" cy="48" r="8" fill="#2a9d8f"/>'
};
function icon(name, size, bg) { return `<svg viewBox="0 0 64 64" width="${size || 64}" height="${size || 64}" style="overflow:visible;stroke:${INK};stroke-width:3;stroke-linejoin:round">${bg ? `<circle cx="32" cy="32" r="31" fill="${bg}"/>` : ''}${ICONS[name] || ICONS.warn}</svg>`; }
function iconBox(c, o) {   // o: {x,y,size,name,bg,T,out,label}
  const s = o.size || 110, e = box(c, { left: o.x - s / 2, top: o.y - s / 2, width: s, height: s, filter: `drop-shadow(5px 5px 0 ${INK})`, opacity: 0 }, icon(o.name, s, o.bg || PP.white));
  if (o.label) box(e, { left: -40, top: s + 4, width: s + 80, textAlign: 'center', font: `900 ${o.lsize || 24}px ${FONT}`, color: o.lcolor || INK, textShadow: '0 0 6px #fff, 0 0 6px #fff' }, o.label);
  pop(e, o.T, { out: o.out, sfx: o.sfx }); return e;
}
// big outlined headline text. o: {x,y,text,size,color,T,out,w}
function headline(c, o) {
  const w = o.w || 1000, e = box(c, { left: o.x - w / 2, top: o.y, width: w, textAlign: 'center', font: `900 ${o.size || 64}px/1.05 ${FONT}`, color: o.color || '#fff', WebkitTextStroke: `${Math.max(3, (o.size || 64) / 12)}px ${INK}`, paintOrder: 'stroke fill', textShadow: `5px 6px 0 ${INK}`, opacity: 0 }, o.text);
  pop(e, o.T, { out: o.out, rot: o.rot ?? -2, sfx: o.sfx }); return e;
}
