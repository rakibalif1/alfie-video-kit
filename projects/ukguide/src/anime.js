// ===== ORIGINAL anime-style cast kit (no third-party characters). Needs kit.js + kit2.js (puppet). =====
// animeHead(o) -> svg string (viewBox 0 0 100 110). animePuppet(c,o) -> puppet with an anime head and a face API.
//   o: {x,y,s, skin, hair, hairStyle:'spiky'|'hightop'|'swept'|'bob'|'bun'|'hijab'|'cap'|'bald', eye, top, bottom, acc:'glasses'|'shades'|'headband'|null, accColor, rim}
const SKIN = { warm: '#c98a5b', brown: '#9a6240', deep: '#6b4328', tan: '#d9a074', light: '#f1c8a5' };
const EYEBROW = { norm: ['M29 41 Q37 36 45 41', 'M55 41 Q63 36 71 41'], angry: ['M29 37 Q37 40 45 46', 'M55 46 Q63 40 71 37'], sad: ['M29 46 Q37 40 45 37', 'M55 37 Q63 40 71 46'],
  surp: ['M29 33 Q37 28 45 33', 'M55 33 Q63 28 71 33'], sly: ['M29 40 Q37 38 45 43', 'M55 36 Q63 30 71 34'], happy: ['M29 40 Q37 35 45 40', 'M55 40 Q63 35 71 40'] };
const MOUTH = { smile: 'M41 74 Q50 82 59 74', grin: 'M38 72 Q50 88 62 72 Q50 76 38 72Z', open: 'M42 74 Q50 90 58 74 Q50 70 42 74Z', o: 'M46 75 Q50 83 54 75 Q50 71 46 75Z', frown: 'M42 80 Q50 72 58 80', flat: 'M43 77 L57 77', smirk: 'M42 77 Q52 80 60 72' };
function hairBack(st, c) {
  const m = {
    spiky: `<path d="M16 54 L10 32 L22 38 L18 12 L32 26 L36 2 L47 22 L56 0 L62 22 L76 4 L76 26 L90 18 L82 40 L90 56 Q86 28 50 22 Q14 28 16 54Z" fill="${c}"/>`,
    hightop: `<path d="M18 50 L20 6 Q50 -6 80 6 L82 50 Q80 30 50 26 Q20 30 18 50Z" fill="${c}"/>`,
    swept: `<path d="M16 54 Q12 8 52 6 Q90 8 84 54 Q82 28 50 24 Q18 28 16 54Z" fill="${c}"/>`,
    bob: `<path d="M12 56 Q8 6 50 4 Q92 6 88 56 L92 96 L72 88 L28 88 L8 96Z" fill="${c}"/>`,
    bun: `<circle cx="50" cy="6" r="13" fill="${c}"/><path d="M16 54 Q12 10 50 8 Q88 10 84 54 Q82 28 50 24 Q18 28 16 54Z" fill="${c}"/>`,
    hijab: `<path d="M10 62 Q4 2 50 0 Q96 2 90 62 Q94 104 72 112 L28 112 Q6 104 10 62Z" fill="${c}"/>`,
    cap: `<path d="M16 50 Q16 8 50 8 Q84 8 84 50 Q82 26 50 24 Q18 26 16 50Z" fill="${c}"/>`,
    bald: '' };
  return m[st] ?? '';
}
function hairFront(st, c) {
  const m = {
    spiky: `<path d="M22 44 L26 22 L36 38 L46 18 L56 38 L68 20 L76 42 Q50 30 22 44Z" fill="${c}"/>`,
    hightop: `<path d="M20 40 Q22 24 50 22 Q78 24 80 40 Q76 30 50 29 Q24 30 20 40Z" fill="${c}"/>`,
    swept: `<path d="M20 46 Q22 18 52 16 Q80 18 80 46 Q70 28 48 32 Q34 36 30 52 Q24 52 20 46Z" fill="${c}"/><path d="M56 16 Q68 34 44 40" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/>`,
    bob: `<path d="M20 48 Q22 20 50 18 Q78 20 80 48 Q66 28 50 30 Q34 28 20 48Z" fill="${c}"/>`,
    bun: `<path d="M20 46 Q22 20 50 18 Q78 20 80 46 Q66 28 50 30 Q34 28 20 46Z" fill="${c}"/>`,
    hijab: `<path d="M22 50 Q24 18 50 16 Q76 18 78 50 Q70 28 50 28 Q30 28 22 50Z" fill="${c}"/><path d="M20 58 Q18 96 36 108 L30 112 Q10 100 12 62Z M80 58 Q82 96 64 108 L70 112 Q90 100 88 62Z" fill="${c}"/>`,
    cap: `<path d="M16 46 Q16 10 50 10 Q84 10 84 46 L90 44 Q92 52 84 52 L16 52Z" fill="${c}"/>`,
    bald: '' };
  return m[st] ?? '';
}
function animeHead(o) {
  const skin = o.skin || SKIN.warm, hair = o.hair || '#15121a', eye = o.eye || '#3b2a5a', id = 'ah' + Math.floor(Math.random() * 1e6), dk = '#1a1020';
  const acc = o.acc === 'glasses' ? `<g fill="none" stroke="${o.accColor || '#22222a'}" stroke-width="2.2"><circle cx="36" cy="56" r="12.5"/><circle cx="64" cy="56" r="12.5"/><path d="M48.5 55 H51.5"/></g>`
    : o.acc === 'shades' ? `<g id="${id}_sh"><rect x="22" y="48" width="25" height="15" rx="6" fill="${o.accColor || '#10101a'}"/><rect x="53" y="48" width="25" height="15" rx="6" fill="${o.accColor || '#10101a'}"/><path d="M47 54 H53" stroke="#10101a" stroke-width="2"/><path d="M26 52 L34 50" stroke="#fff" stroke-opacity=".5" stroke-width="2" stroke-linecap="round"/></g>`
    : o.acc === 'headband' ? `<path d="M19 34 Q50 18 81 34 L80 40 Q50 25 20 40Z" fill="${o.accColor || '#e63946'}"/>` : '';
  const eyes = (cx) => `<g class="${id}_eye"><ellipse cx="${cx}" cy="56" rx="9.5" ry="11.5" fill="#fff"/><circle cx="${cx}" cy="58" r="7.4" fill="${eye}"/><circle cx="${cx}" cy="58.5" r="3.8" fill="${dk}"/><circle cx="${cx - 2.6}" cy="54.6" r="2.6" fill="#fff"/><circle cx="${cx + 2.8}" cy="61.6" r="1.3" fill="#fff"/><path d="M${cx - 10} 53 Q${cx} 42 ${cx + 10} 53" fill="none" stroke="${dk}" stroke-width="3" stroke-linecap="round"/></g>`;
  return `<svg viewBox="0 0 100 110" width="100%" height="100%" style="overflow:visible" data-id="${id}">${hairBack(o.hairStyle || 'swept', hair)}
    <rect x="42" y="84" width="16" height="14" fill="${skin}"/>
    <ellipse cx="21" cy="58" rx="4" ry="6" fill="${skin}"/><ellipse cx="79" cy="58" rx="4" ry="6" fill="${skin}"/>
    <path d="M22 52 Q22 20 50 20 Q78 20 78 52 Q78 82 50 90 Q22 82 22 52Z" fill="${skin}"/>
    <ellipse cx="31" cy="70" rx="6" ry="3.4" fill="#e8574b" opacity=".22"/><ellipse cx="69" cy="70" rx="6" ry="3.4" fill="#e8574b" opacity=".22"/>
    <g id="${id}_eyes">${eyes(37)}${eyes(63)}</g>
    <path id="${id}_bl" d="${EYEBROW.norm[0]}" fill="none" stroke="${hair === '#f2f2f2' ? '#999' : dk}" stroke-width="3.2" stroke-linecap="round"/><path id="${id}_br" d="${EYEBROW.norm[1]}" fill="none" stroke="${dk}" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M49 66 Q50.5 69 52 66" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="1.6" stroke-linecap="round"/>
    <path id="${id}_m" d="${MOUTH.smile}" fill="${dk}" stroke="${dk}" stroke-width="2" stroke-linejoin="round"/>
    ${acc}${hairFront(o.hairStyle || 'swept', hair)}</svg>`;
}
// anime puppet: body from puppet() (outfit colours), anime head with blink/talk/emote methods
function animePuppet(c, o) {
  const top = o.top || '#3a86ff', bottom = o.bottom || '#22223b', skin = o.skin || SKIN.warm;
  const p = puppet(c, { x: o.x, y: o.y, s: o.s || 1, hat: 'none', coat: top, coat2: bottom, rim: 'rgba(0,0,0,0)', flip: o.flip, opacity: o.opacity ?? 1, lamp: o.lamp, T: o.T, D: o.D });
  p.g.style.filter = 'drop-shadow(2.5px 0 0 #14101c) drop-shadow(-2.5px 0 0 #14101c) drop-shadow(0 2.5px 0 #14101c) drop-shadow(0 -2.5px 0 #14101c)';
  p.g.querySelectorAll('circle').forEach((ci) => { if (ci.getAttribute('r') === '4.6') ci.setAttribute('fill', skin); });
  const P = p.P; P.h.innerHTML = `<g transform="translate(13 -17) scale(.94)">${animeHead(o)}</g>`;
  P.t.appendChild(P.h); const svg = P.h.querySelector('svg'), id = svg.dataset.id, q = (k) => P.h.querySelector('#' + id + '_' + k);
  const eyes = q('eyes'), mouth = q('m'), bl = q('bl'), br = q('br');
  gsap.set(eyes, { svgOrigin: '50 56' }); p.face = { eyes, mouth, bl, br };
  p.blink = (T, D) => { for (let t = T + 1.2; t < T + D; t += 2.4 + Math.random() * 2.4) tl.to(eyes, { scaleY: 0.08, duration: 0.07, yoyo: true, repeat: 1 }, t); };
  p.emote = (name, T) => { const b = EYEBROW[{ angry: 'angry', sad: 'sad', surprised: 'surp', sly: 'sly', happy: 'happy', normal: 'norm' }[name] || 'norm'];
    const m = { angry: MOUTH.frown, sad: MOUTH.frown, surprised: MOUTH.o, sly: MOUTH.smirk, happy: MOUTH.grin, normal: MOUTH.smile }[name] || MOUTH.smile;
    tl.set(bl, { attr: { d: b[0] } }, T); tl.set(br, { attr: { d: b[1] } }, T); tl.set(mouth, { attr: { d: m } }, T); };
  p.talk = (T, D) => { for (let t = T; t < T + D - 0.2; t += 0.17) tl.set(mouth, { attr: { d: Math.random() < 0.3 ? MOUTH.o : MOUTH.open } }, t); tl.set(mouth, { attr: { d: MOUTH.smile } }, T + D); };
  if (o.T !== undefined) p.blink(o.T, o.D || 20);
  return p;
}
// the named cast (all original characters)
const CAST = {
  kiran: { name: 'KIRAN', role: 'the Fixer (mentor)', skin: SKIN.tan, hair: '#10323a', hairStyle: 'swept', eye: '#1f7a8c', top: '#22223b', bottom: '#3d405b', acc: 'shades', accColor: '#10101a' },
  chidi: { name: 'CHIDI', role: 'newcomer from Lagos', skin: SKIN.deep, hair: '#0d0d12', hairStyle: 'hightop', eye: '#4a2c1a', top: '#ff7b00', bottom: '#1d3557', acc: 'headband', accColor: '#e63946' },
  rahim: { name: 'RAHIM', role: 'newcomer from Dhaka', skin: SKIN.brown, hair: '#14100e', hairStyle: 'swept', eye: '#3b2a1a', top: '#2a9d8f', bottom: '#264653', acc: 'glasses', accColor: '#2b2d42' },
  amina: { name: 'AMINA', role: 'newcomer from Karachi', skin: SKIN.warm, hair: '#7b2cbf', hairStyle: 'hijab', eye: '#3b2a5a', top: '#e0aaff', bottom: '#5a189a' },
  priya: { name: 'PRIYA', role: 'newcomer from Delhi', skin: SKIN.warm, hair: '#1a1018', hairStyle: 'bob', eye: '#3b1f10', top: '#f72585', bottom: '#3a0ca3' },
  kofi: { name: 'KOFI', role: 'newcomer from Accra', skin: SKIN.deep, hair: '#0b0b10', hairStyle: 'cap', eye: '#3a2412', top: '#ffd60a', bottom: '#003566' },
  mrdeal: { name: 'MR DEAL', role: 'pushy salesman', skin: SKIN.light, hair: '#c1121f', hairStyle: 'spiky', eye: '#1b4332', top: '#d00000', bottom: '#370617' },
  slick: { name: 'SLICK SID', role: 'the "agent" (scammer)', skin: SKIN.tan, hair: '#111', hairStyle: 'swept', eye: '#6a040f', top: '#3c096c', bottom: '#10002b', acc: 'shades', accColor: '#10101a' },
  mrrush: { name: 'MR RUSH', role: 'rushed landlord', skin: SKIN.light, hair: '#bbb', hairStyle: 'bald', eye: '#555', top: '#6c757d', bottom: '#343a40', acc: 'glasses', accColor: '#444' },
  fake: { name: 'OFFICER FAKE', role: 'scam caller', skin: SKIN.light, hair: '#222', hairStyle: 'cap', eye: '#333', top: '#1d3557', bottom: '#0b1d3a' }
};
