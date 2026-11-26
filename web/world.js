// Set pieces for the Alfie video kit: city street, bank interior, props, animated signs and info cards.
// buildPiece(THREE, spec, ctx) -> { obj: Object3D, update?(t, lineIdx) }
const rng = (seed) => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const C = (THREE, hex) => new THREE.Color(hex);
export const std = (THREE, c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85, ...o });
const cv = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; };

export function gradientTexture(THREE, top, bottom) {
  const [c, g] = cv(4, 256), gr = g.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, top); gr.addColorStop(1, bottom); g.fillStyle = gr; g.fillRect(0, 0, 4, 256); return new THREE.CanvasTexture(c);
}
function windowsTexture(THREE, wall, seed, cols, rows, shop) {
  const r = rng(seed), [c, g] = cv(256, 512); g.fillStyle = wall; g.fillRect(0, 0, 256, 512);
  const ww = 256 / cols, wh = (512 - (shop ? 110 : 20)) / rows;
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const lit = r() > 0.55; g.fillStyle = lit ? '#ffe8a3' : '#6c8bb5'; g.fillRect(x * ww + ww * 0.2, 12 + y * wh + wh * 0.18, ww * 0.6, wh * 0.62);
    g.fillStyle = 'rgba(255,255,255,0.35)'; g.fillRect(x * ww + ww * 0.2, 12 + y * wh + wh * 0.18, ww * 0.6, wh * 0.12);
    g.fillStyle = '#ffffff'; g.fillRect(x * ww + ww * 0.15, 12 + y * wh + wh * 0.8, ww * 0.7, 5);
  }
  if (shop) { const sc = ['#e63946', '#2a9d8f', '#f4a261', '#6a4c93', '#1d3557'][Math.floor(r() * 5)]; g.fillStyle = sc; g.fillRect(0, 512 - 104, 256, 30); g.fillStyle = '#cfe8f7'; g.fillRect(14, 512 - 70, 228, 62); g.fillStyle = '#fff'; g.font = 'bold 22px Arial'; g.textAlign = 'center'; g.fillText(['CAFE', 'SHOP', 'PHARMACY', 'BAKERY', 'FLOWERS', 'BOOKS'][Math.floor(r() * 6)], 128, 512 - 82); }
  const t = new THREE.CanvasTexture(c); return t;
}
function label(THREE, text, bg, fg, w = 512, h = 256, size = 0.4) { const [c, g] = cv(w, h); g.fillStyle = bg; g.fillRect(0, 0, w, h); g.fillStyle = fg; g.font = `bold ${Math.floor(h * size)}px Arial`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text, w / 2, h / 2 + 4); return new THREE.CanvasTexture(c); }

function car(THREE, color) {
  const g = new THREE.Group(), body = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.4, 0.7), std(THREE, color, { roughness: 0.4, metalness: 0.3 })); body.position.y = 0.4;
  const cab = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.35, 0.62), std(THREE, '#cfe8f7', { roughness: 0.2 })); cab.position.set(-0.05, 0.75, 0);
  g.add(body, cab); for (const x of [-0.5, 0.5]) for (const z of [-0.36, 0.36]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.12, 16), std(THREE, '#222')); w.rotation.x = Math.PI / 2; w.position.set(x, 0.17, z); g.add(w); }
  return g;
}
function lamp(THREE) { const g = new THREE.Group(); const p = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 2.6, 10), std(THREE, '#2b2f3a')); p.position.y = 1.3; const h = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 10), new THREE.MeshBasicMaterial({ color: '#fff4c2' })); h.position.set(0.18, 2.6, 0); const a = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.05, 0.05), std(THREE, '#2b2f3a')); a.position.set(0.1, 2.58, 0); g.add(p, h, a); return g; }

export function buildPiece(THREE, p, ctx = {}) {
  const g = new THREE.Group(); g.position.set(p.x || 0, p.y || 0, p.z || 0); let update = null; const t3 = THREE;
  switch (p.type) {
    case 'wall': { const m = new t3.Mesh(new t3.BoxGeometry(p.w || 12, p.h || 3.4, 0.2), std(t3, p.color || '#efe4c8')); m.position.set(0, (p.h || 3.4) / 2, p.zz ?? -2.0); g.position.z = 0; g.add(m); break; }
    case 'sign': { const m = new t3.Mesh(new t3.PlaneGeometry(p.w || 1.6, (p.w || 1.6) / 2), new t3.MeshBasicMaterial({ map: label(t3, p.text || 'BANK', p.bg || '#1d3557', p.fg || '#ffffff') })); m.position.y = p.yy ?? 2.4; g.add(m); break; }
    case 'poster': { const w = p.w || 0.8, h = p.h || 1.1, m = new t3.Mesh(new t3.PlaneGeometry(w, h), new t3.MeshBasicMaterial({ map: label(t3, p.text || 'SAVE', p.bg || '#ffd166', p.fg || '#1d3557', 256, Math.round(256 * h / w), 0.22) })); m.position.y = p.yy ?? 1.6; g.add(m); break; }
    case 'counter': { const w = p.w || 1.8, b = new t3.Mesh(new t3.BoxGeometry(w, 0.95, 0.55), std(t3, p.color || '#8d6e4b')); b.position.y = 0.475; const t = new t3.Mesh(new t3.BoxGeometry(w + 0.1, 0.07, 0.65), std(t3, '#e9dcc3')); t.position.y = 0.98; g.add(b, t); break; }
    case 'vault': { const d = new t3.Mesh(new t3.CylinderGeometry(0.85, 0.85, 0.2, 48), std(t3, '#9aa3ad', { metalness: 0.7, roughness: 0.35 })); d.rotation.x = Math.PI / 2; d.position.y = 1.2; const r = new t3.Mesh(new t3.TorusGeometry(0.62, 0.05, 12, 40), std(t3, '#5c6670')); r.position.set(0, 1.2, 0.12); const h = new t3.Mesh(new t3.BoxGeometry(0.9, 0.08, 0.08), std(t3, '#5c6670')); h.position.set(0, 1.2, 0.2); const h2 = h.clone(); h2.rotation.z = Math.PI / 2; g.add(d, r, h, h2); update = (t) => { h.rotation.z = h2.rotation.z = 0; }; break; }
    case 'posts': { for (let i = 0; i < (p.n || 4); i++) { const post = new t3.Mesh(new t3.CylinderGeometry(0.04, 0.05, 0.9, 12), std(t3, '#333b4a')); post.position.set(i * (p.gap || 0.7), 0.45, 0); const knob = new t3.Mesh(new t3.SphereGeometry(0.07, 10, 8), std(t3, '#e9c46a', { metalness: 0.6 })); knob.position.set(i * (p.gap || 0.7), 0.93, 0); g.add(post, knob); if (i) { const rope = new t3.Mesh(new t3.BoxGeometry(p.gap || 0.7, 0.04, 0.04), std(t3, '#c0392b')); rope.position.set((i - 0.5) * (p.gap || 0.7), 0.8, 0); g.add(rope); } } break; }
    case 'tree': { const tr = new t3.Mesh(new t3.CylinderGeometry(0.1, 0.14, 1.0, 10), std(t3, '#7a5a3a')); tr.position.y = 0.5; g.add(tr); [[0, 1.35, 0, 0.55], [0.25, 1.1, 0.1, 0.4], [-0.25, 1.15, -0.05, 0.42]].forEach(([x, y, z, r]) => { const lf = new t3.Mesh(new t3.SphereGeometry(r, 16, 12), std(t3, '#52b788')); lf.position.set(x, y, z); g.add(lf); }); break; }
    case 'plant': { const pot = new t3.Mesh(new t3.CylinderGeometry(0.2, 0.15, 0.3, 14), std(t3, '#c1666b')); pot.position.y = 0.15; g.add(pot); for (let i = 0; i < 5; i++) { const lf = new t3.Mesh(new t3.SphereGeometry(0.18, 10, 8), std(t3, ['#40916c', '#52b788', '#2d6a4f'][i % 3])); lf.scale.y = 1.6; lf.position.set(Math.cos(i * 1.3) * 0.15, 0.55 + (i % 2) * 0.12, Math.sin(i * 1.3) * 0.15); g.add(lf); } break; }
    case 'column': { const c = new t3.Mesh(new t3.CylinderGeometry(0.22, 0.25, p.h || 3.2, 20), std(t3, '#f1ece0')); c.position.y = (p.h || 3.2) / 2; const b = new t3.Mesh(new t3.BoxGeometry(0.7, 0.18, 0.7), std(t3, '#d8cfb8')); b.position.y = 0.09; const t = b.clone(); t.position.y = (p.h || 3.2) - 0.09; g.add(c, b, t); break; }
    case 'checker': { const [c, gg] = cv(256, 256); for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) { gg.fillStyle = (x + y) % 2 ? (p.a || '#f4efe4') : (p.b || '#3d405b'); gg.fillRect(x * 32, y * 32, 32, 32); } const tx = new t3.CanvasTexture(c); tx.wrapS = tx.wrapT = t3.RepeatWrapping; tx.repeat.set(4, 4); const m = new t3.Mesh(new t3.PlaneGeometry(p.w || 9, p.d || 6), new t3.MeshStandardMaterial({ map: tx, roughness: 0.3 })); m.rotation.x = -Math.PI / 2; m.position.y = 0.01; g.add(m); break; }
    case 'clock': { const [c, gg] = cv(256, 256); const m = new t3.Mesh(new t3.CircleGeometry(p.r || 0.5, 40), new t3.MeshBasicMaterial({ map: new t3.CanvasTexture(c) })); m.position.y = p.yy ?? 2.7; g.add(m); update = (t) => { gg.fillStyle = '#fff'; gg.fillRect(0, 0, 256, 256); gg.strokeStyle = '#1d3557'; gg.lineWidth = 14; gg.beginPath(); gg.arc(128, 128, 118, 0, 7); gg.stroke(); gg.lineWidth = 8; for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; gg.beginPath(); gg.moveTo(128 + Math.sin(a) * 96, 128 - Math.cos(a) * 96); gg.lineTo(128 + Math.sin(a) * 112, 128 - Math.cos(a) * 112); gg.stroke(); } const hand = (a, l, w) => { gg.lineWidth = w; gg.beginPath(); gg.moveTo(128, 128); gg.lineTo(128 + Math.sin(a) * l, 128 - Math.cos(a) * l); gg.stroke(); }; hand(t * 0.5, 100, 6); hand(t * 0.04, 62, 10); m.material.map.needsUpdate = true; }; break; }
    case 'palm': { const h = p.h || 2.6; for (let i = 0; i < 6; i++) { const seg = new t3.Mesh(new t3.CylinderGeometry(0.1 - i * 0.008, 0.11 - i * 0.008, h / 6, 8), std(t3, '#8d6e4b')); seg.position.set(Math.sin(i * 0.35) * 0.12 * i * 0.3, (i + 0.5) * h / 6, 0); seg.rotation.z = -0.06 * i; g.add(seg); } const top = new t3.Group(); top.position.set(0.1, h, 0); for (let k = 0; k < 7; k++) { const lf = new t3.Mesh(new t3.ConeGeometry(0.16, 1.1, 4), std(t3, ['#2d9d5a', '#3dbb6d', '#27824a'][k % 3])); lf.rotation.z = Math.PI / 2 - 0.5; lf.rotation.y = k * 0.9; lf.position.set(Math.cos(k * 0.9) * 0.45, -0.05, Math.sin(k * 0.9) * 0.45); lf.lookAt(new t3.Vector3(Math.cos(k * 0.9) * 2, -0.9, Math.sin(k * 0.9) * 2).add(top.position)); lf.rotateX(Math.PI / 2); top.add(lf); } g.add(top); update = (t) => { top.rotation.y = Math.sin(t * 0.8) * 0.05; }; break; }
    case 'mic': { const st = new t3.Mesh(new t3.CylinderGeometry(0.02, 0.03, 1.3, 10), std(t3, '#333b4a')); st.position.y = 0.65; const base = new t3.Mesh(new t3.CylinderGeometry(0.18, 0.2, 0.04, 16), std(t3, '#333b4a')); base.position.y = 0.02; const head = new t3.Mesh(new t3.SphereGeometry(0.1, 14, 12), std(t3, '#222', { metalness: 0.6 })); head.position.y = 1.38; const pop = new t3.Mesh(new t3.CylinderGeometry(0.12, 0.12, 0.01, 20), std(t3, '#111')); pop.rotation.x = Math.PI / 2; pop.position.set(0, 1.4, 0.16); g.add(st, base, head, pop); break; }
    case 'speaker': { const b = new t3.Mesh(new t3.BoxGeometry(0.7, p.h || 1.4, 0.5), std(t3, '#1b1b2f')); b.position.y = (p.h || 1.4) / 2; g.add(b); const cones = []; [0.3, 0.8].forEach((k, i) => { const c = new t3.Mesh(new t3.CircleGeometry(i ? 0.14 : 0.24, 24), new t3.MeshBasicMaterial({ color: '#3a3a5c' })); c.position.set(0, (p.h || 1.4) * (i ? 0.78 : 0.34), 0.26); g.add(c); cones.push(c); }); update = (t) => cones.forEach((c, i) => c.scale.setScalar(1 + 0.08 * Math.sin(t * 14 + i))); break; }
    case 'record': { const [c, gg] = cv(256, 256); gg.fillStyle = '#111'; gg.beginPath(); gg.arc(128, 128, 124, 0, 7); gg.fill(); gg.strokeStyle = '#2a2a2a'; gg.lineWidth = 2; for (let r = 40; r < 120; r += 8) { gg.beginPath(); gg.arc(128, 128, r, 0, 7); gg.stroke(); } gg.fillStyle = p.color || '#ff2fd6'; gg.beginPath(); gg.arc(128, 128, 36, 0, 7); gg.fill(); const m = new t3.Mesh(new t3.CircleGeometry(p.r || 0.4, 40), new t3.MeshBasicMaterial({ map: new t3.CanvasTexture(c), transparent: true })); m.position.y = p.yy ?? 2.2; g.add(m); update = (t) => { m.rotation.z = -t * 2.5; }; break; }
    case 'equalizer': { const n = p.n || 14, bars = []; for (let i = 0; i < n; i++) { const m = new t3.Mesh(new t3.BoxGeometry(0.12, 1, 0.1), new t3.MeshBasicMaterial({ color: new t3.Color().setHSL(0.9 - i / n * 0.5, 1, 0.6) })); m.position.set((i - n / 2) * 0.16, 0.5, 0); g.add(m); bars.push(m); } update = (t) => bars.forEach((m, i) => { const h = 0.15 + (0.5 + 0.5 * Math.sin(t * (5 + i % 4) + i)) * (p.h || 0.8); m.scale.y = h; m.position.y = h / 2; }); break; }
    case 'neon': { const m = new t3.Mesh(new t3.PlaneGeometry(p.w || 2.0, (p.w || 2.0) / 3), new t3.MeshBasicMaterial({ map: label(t3, p.text || 'WAVE 99.9', p.bg || '#12002b', p.fg || '#ff4fd8', 512, 170, 0.5), transparent: true })); m.position.y = p.yy ?? 2.6; g.add(m); update = (t) => { m.material.opacity = 0.82 + 0.18 * Math.sin(t * 9) * Math.sin(t * 3.3); }; break; }
    case 'lamp': { g.add(lamp(t3)); break; }
    case 'road': { const [c, gg] = cv(512, 128); gg.fillStyle = '#464b57'; gg.fillRect(0, 0, 512, 128); gg.fillStyle = '#f4d35e'; for (let x = 0; x < 512; x += 64) gg.fillRect(x, 60, 36, 8); const tx = new t3.CanvasTexture(c); tx.wrapS = t3.RepeatWrapping; tx.repeat.set(3, 1); const m = new t3.Mesh(new t3.PlaneGeometry(p.w || 16, p.d || 1.6), new t3.MeshStandardMaterial({ map: tx, roughness: 1 })); m.rotation.x = -Math.PI / 2; m.position.y = 0.012; g.add(m); break; }
    case 'car': case 'bus': { const o = p.type === 'bus' ? (() => { const b = new t3.Group(), body = new t3.Mesh(new t3.BoxGeometry(3.0, 0.9, 0.8), std(t3, p.color || '#e63946', { roughness: 0.4 })); body.position.y = 0.7; const win = new t3.Mesh(new t3.BoxGeometry(2.8, 0.35, 0.82), std(t3, '#cfe8f7', { roughness: 0.2 })); win.position.y = 0.95; b.add(body, win); for (const x of [-1, 1]) for (const z of [-0.4, 0.4]) { const w = new t3.Mesh(new t3.CylinderGeometry(0.22, 0.22, 0.14, 16), std(t3, '#222')); w.rotation.x = Math.PI / 2; w.position.set(x, 0.22, z); b.add(w); } return b; })() : car(t3, p.color || '#2a9d8f'); g.add(o); const sp = p.speed || 0.8, lo = p.lo ?? -6, hi = p.hi ?? 6, ph = p.phase || 0; update = (t) => { const L = hi - lo; let x = ((p.x0 ?? lo) - lo + sp * t + ph * L) % L; if (x < 0) x += L; o.position.x = lo + x - (p.x || 0); o.rotation.y = sp < 0 ? Math.PI : 0; }; break; }
    case 'buildings': {
      const r = rng(p.seed || 7), n = p.n || 9, pal = p.palette || ['#f4a261', '#e9c46a', '#8ecae6', '#cdb4db', '#ffafcc', '#a8dadc', '#f1faee', '#ffb703'];
      for (let i = 0; i < n; i++) { const w = 1.1 + r() * 0.5, h = 2.8 + r() * 3.2, wall = pal[Math.floor(r() * pal.length)], tex = windowsTexture(t3, wall, 100 + i + (p.seed || 0), 3, Math.max(3, Math.round(h * 1.1)), i % 2 === 0);
        const side = std(t3, wall), face = new t3.MeshStandardMaterial({ map: tex, roughness: 0.9 }), m = new t3.Mesh(new t3.BoxGeometry(w, h, 0.9), [side, side, side, side, face, side]); m.position.set(-5.2 + i * (10.4 / (n - 1)) , h / 2, 0); g.add(m);
        const roof = new t3.Mesh(new t3.BoxGeometry(w + 0.1, 0.1, 1.0), std(t3, '#555b6e')); roof.position.set(m.position.x, h + 0.05, 0); g.add(roof); }
      break; }
    case 'bunting': { const n = p.n || 12, cols = p.colors || ['#e63946', '#ffd166', '#06d6a0', '#118ab2', '#ef476f']; const flags = []; for (let i = 0; i < n; i++) { const f = new t3.Mesh(new t3.ConeGeometry(0.12, 0.28, 3), new t3.MeshBasicMaterial({ color: cols[i % cols.length] })); f.rotation.z = Math.PI; const u = i / (n - 1); f.position.set(lerp(p.x1 ?? -3, p.x2 ?? 3, u), (p.y ?? 3) - Math.sin(u * Math.PI) * 0.35, 0); g.add(f); flags.push(f); } update = (t) => flags.forEach((f, i) => { f.rotation.y = Math.sin(t * 2 + i) * 0.4; }); break; }
    case 'balloons': { const cols = ['#ef476f', '#ffd166', '#06d6a0', '#118ab2', '#9b5de5'], bs = []; for (let i = 0; i < (p.n || 6); i++) { const b = new t3.Mesh(new t3.SphereGeometry(0.2, 14, 12), std(t3, cols[i % 5], { roughness: 0.3 })); b.scale.y = 1.25; b.position.set((i - (p.n || 6) / 2) * 0.35, 2.2 + (i % 3) * 0.3, 0); g.add(b); bs.push(b); } update = (t) => bs.forEach((b, i) => { b.position.y = 2.2 + (i % 3) * 0.3 + Math.sin(t * 1.3 + i) * 0.08; }); break; }
    case 'tv': { const w = p.w || 1.4, h = w * 0.56, [c, gg] = cv(512, 288), tex = new t3.CanvasTexture(c); const scr = new t3.Mesh(new t3.PlaneGeometry(w, h), new t3.MeshBasicMaterial({ map: tex })); scr.position.y = p.yy ?? 2.2; const fr = new t3.Mesh(new t3.BoxGeometry(w + 0.1, h + 0.1, 0.06), std(t3, '#16181d')); fr.position.set(0, scr.position.y, -0.04); g.add(fr, scr);
      const msg = p.ticker || 'BREAKING: BANK IN TROUBLE  •  SAVERS QUEUE FOR THEIR MONEY  •  MARKETS FALL  •  '; update = (t) => { gg.fillStyle = p.bg || '#d00000'; gg.fillRect(0, 0, 512, 288); gg.fillStyle = '#fff'; gg.fillRect(0, 200, 512, 60); gg.fillStyle = '#d00000'; gg.font = 'bold 34px Arial'; gg.textAlign = 'left'; gg.fillText(msg + msg, -((t * 120) % (gg.measureText(msg).width || 600)), 242); gg.fillStyle = '#fff'; gg.font = 'bold 52px Arial'; gg.textAlign = 'center'; gg.fillText(p.title || 'BREAKING NEWS', 256, 90); gg.beginPath(); gg.arc(256, 150, 20 + 6 * Math.sin(t * 6), 0, 7); gg.fillStyle = '#ffd166'; gg.fill(); tex.needsUpdate = true; }; break; }
    case 'infocard': { // animated panel: title + bars, pops in between fromLine..toLine
      const w = p.w || 1.5, h = p.h || 1.0, [c, gg] = cv(512, Math.round(512 * h / w)), tex = new t3.CanvasTexture(c), m = new t3.Mesh(new t3.PlaneGeometry(w, h), new t3.MeshBasicMaterial({ map: tex, transparent: true })); m.position.y = p.yy ?? 2.2; g.add(m);
      const rows = p.rows || []; update = (t, idx, tl) => { const a = tl(p.fromLine ?? 0).start, b = tl(p.toLine ?? p.fromLine ?? 0).end, on = t >= a - 0.2 && t <= b + 0.6, k = Math.max(0, Math.min(1, (t - a + 0.2) / 0.35)); m.visible = on; m.scale.setScalar(on ? 0.6 + 0.4 * (1 - Math.pow(1 - k, 3)) : 0.01); if (!on) return;
        const H = c.height; gg.clearRect(0, 0, 512, H); gg.fillStyle = p.bg || 'rgba(20,30,60,0.92)'; gg.beginPath(); gg.roundRect(0, 0, 512, H, 36); gg.fill(); gg.fillStyle = '#ffd166'; gg.font = 'bold 44px Arial'; gg.textAlign = 'center'; gg.fillText(p.title || '', 256, 62);
        rows.forEach((r, i) => { const y = 120 + i * ((H - 150) / Math.max(1, rows.length)), fill = Math.min(1, Math.max(0, (t - a - i * 0.35) / 0.6)); gg.fillStyle = '#fff'; gg.font = 'bold 30px Arial'; gg.textAlign = 'left'; gg.fillText(r.label, 28, y + 26); gg.fillStyle = 'rgba(255,255,255,0.18)'; gg.fillRect(28, y + 40, 456, 26); gg.fillStyle = r.color || '#06d6a0'; gg.fillRect(28, y + 40, 456 * (r.value ?? 0.5) * fill, 26); gg.fillStyle = '#fff'; gg.textAlign = 'right'; gg.fillText(r.text || '', 484, y + 26); }); tex.needsUpdate = true; }; break; }
  }
  if (p.s) g.scale.setScalar(p.s);
  return { obj: g, update };
}
const lerp = (a, b, u) => a + (b - a) * u;

export function makeClouds(THREE, n = 6) {
  const g = new THREE.Group(), cl = [], r = rng(11);
  for (let i = 0; i < n; i++) { const c = new THREE.Group(); for (let k = 0; k < 4; k++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.5 + r() * 0.4, 14, 10), new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.92, fog: false })); s.position.set(k * 0.6 - 0.9, r() * 0.25, 0); s.scale.y = 0.6; c.add(s); } c.position.set(-8 + r() * 16, 4.6 + r() * 2.2, -9 - r() * 3); c.userData.v = 0.1 + r() * 0.15; g.add(c); cl.push(c); }
  return { obj: g, update: (t) => cl.forEach((c, i) => { c.position.x = ((c.position.x + 9 + c.userData.v * 0.033) % 18) - 9; }) };
}

// recolour skin / hair / clothes of a VRM (look = {skin, hair, top, bottom, shoes}); works on VRoid-style material names
export function tintVRM(THREE, vrm, look) {
  if (!look) return;
  vrm.scene.traverse((o) => {
    if (!o.isMesh) return; const arr = Array.isArray(o.material) ? o.material : [o.material];
    arr.forEach((m) => {
      const n = m.name || ''; let col = null, flat = false;
      if (/SKIN/.test(n) && look.skin) col = look.skin;
      else if (/HAIR/.test(n) && look.hair) { col = look.hair; flat = true; }
      else if (/CLOTH/.test(n)) { if (/Tops|Onepiece/i.test(n) && look.top) { col = look.top; flat = true; } else if (/Bottoms/i.test(n) && look.bottom) { col = look.bottom; flat = true; } else if (/Shoes/i.test(n) && look.shoes) { col = look.shoes; flat = true; } }
      if (!col || !m.color) return; m.color.set(col);
      if (flat) { try { m.map = null; if ('shadeMultiplyTexture' in m) m.shadeMultiplyTexture = null; if (m.shadeColorFactor) m.shadeColorFactor.copy(m.color).multiplyScalar(0.7); } catch (e) {} }
      else if (m.shadeColorFactor) m.shadeColorFactor.copy(m.color).multiplyScalar(0.8);
      m.needsUpdate = true;
    });
  });
}

// ---------- skies and floors with character
export function floorTexture(THREE, style, repeat = 8) {
  const [c, g] = cv(512, 512); let base = '#ffffff';
  if (style === 'grid') { g.fillStyle = '#0b1030'; g.fillRect(0, 0, 512, 512); g.strokeStyle = '#19f0ff'; g.lineWidth = 5; g.shadowColor = '#19f0ff'; g.shadowBlur = 14; for (let i = 0; i <= 512; i += 128) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 512); g.moveTo(0, i); g.lineTo(512, i); g.stroke(); } g.shadowBlur = 0; g.strokeStyle = '#ff2fd6'; g.lineWidth = 2; for (let i = 64; i < 512; i += 128) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 512); g.stroke(); } }
  else if (style === 'wood') { const r = rng(5); for (let y = 0; y < 8; y++) { g.fillStyle = ['#b07a4b', '#a46f40', '#bd8756', '#9a6a3e'][y % 4]; g.fillRect(0, y * 64, 512, 62); g.fillStyle = 'rgba(60,30,10,0.18)'; for (let k = 0; k < 14; k++) g.fillRect(r() * 512, y * 64 + r() * 60, 30 + r() * 80, 2); g.fillStyle = '#6e4626'; g.fillRect((y % 2) * 256 + 120, y * 64, 3, 62); } }
  else if (style === 'cobble') { const r = rng(9); g.fillStyle = '#7d7f86'; g.fillRect(0, 0, 512, 512); for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) { const sh = 110 + Math.floor(r() * 60); g.fillStyle = `rgb(${sh},${sh},${sh + 8})`; g.beginPath(); g.roundRect(x * 64 + (y % 2) * 32 + 3, y * 64 + 3, 56, 56, 14); g.fill(); } }
  else if (style === 'grass') { const r = rng(3); g.fillStyle = '#4caf50'; g.fillRect(0, 0, 512, 512); for (let k = 0; k < 2200; k++) { g.fillStyle = ['#43a047', '#66bb6a', '#2e7d32', '#81c784'][Math.floor(r() * 4)]; g.fillRect(r() * 512, r() * 512, 3, 10); } g.fillStyle = '#ffeb3b'; for (let k = 0; k < 30; k++) { g.beginPath(); g.arc(r() * 512, r() * 512, 4, 0, 7); g.fill(); } }
  else if (style === 'tiles') { g.fillStyle = '#e8e2d2'; g.fillRect(0, 0, 512, 512); g.strokeStyle = '#b9b19a'; g.lineWidth = 4; for (let i = 0; i <= 512; i += 128) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 512); g.moveTo(0, i); g.lineTo(512, i); g.stroke(); } g.fillStyle = 'rgba(255,255,255,0.25)'; g.fillRect(0, 0, 512, 6); }
  else if (style === 'carpet') { g.fillStyle = '#9d0208'; g.fillRect(0, 0, 512, 512); g.strokeStyle = '#ffba08'; g.lineWidth = 6; g.strokeRect(24, 24, 464, 464); g.lineWidth = 3; g.strokeRect(48, 48, 416, 416); g.fillStyle = '#ffba08'; for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(256, 96 + i * 8); g.lineTo(416 - i * 8, 256); g.lineTo(256, 416 - i * 8); g.lineTo(96 + i * 8, 256); g.closePath(); g.globalAlpha = 0.18; g.fill(); g.globalAlpha = 1; } }
  else { g.fillStyle = base; g.fillRect(0, 0, 512, 512); }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat, repeat); t.anisotropy = 4; return t;
}

// decor in front of the sky sphere: sun, moon, stars, neon sun, lightning. Returns { obj, update(t) -> flash 0..1 }
export function makeSkyDecor(THREE, style) {
  const g = new THREE.Group(), r = rng(21); let flash = () => 0;
  const disc = (rad, color, x, y, op = 1) => { const m = new THREE.Mesh(new THREE.CircleGeometry(rad, 48), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: op, fog: false })); m.position.set(x, y, -17); g.add(m); return m; };
  if (style === 'sunset' || style === 'dawn') { disc(7, style === 'dawn' ? '#ffd1a0' : '#ff9e5e', 4, 2.0, 0.28); disc(4.2, style === 'dawn' ? '#ffe6c7' : '#ffb347', 4, 2.0, 0.55); disc(2.6, '#fff3c4', 4, 2.0); }
  if (style === 'day') { disc(5.5, '#fff6b0', 6, 9, 0.3); disc(2.4, '#fff9d6', 6, 9); }
  if (style === 'night' || style === 'neon') {
    const n = 380, pos = new Float32Array(n * 3); for (let i = 0; i < n; i++) { pos[i * 3] = -22 + r() * 44; pos[i * 3 + 1] = 2.5 + r() * 17; pos[i * 3 + 2] = -17; }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); const pm = new THREE.PointsMaterial({ color: '#ffffff', size: 0.14, transparent: true, fog: false }); g.add(new THREE.Points(geo, pm));
    if (style === 'night') { disc(3.0, '#f5f3e7', -5, 9); disc(2.8, '#0b1030', -4.1, 9.5, 0.0); const cut = disc(2.5, '#0b1a3a', -3.9, 9.4); } else { const [c, gg] = cv(256, 256); const gr = gg.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, '#ffe66d'); gr.addColorStop(1, '#ff2fd6'); gg.fillStyle = gr; gg.beginPath(); gg.arc(128, 128, 126, 0, 7); gg.fill(); gg.globalCompositeOperation = 'destination-out'; for (let i = 0; i < 8; i++) gg.fillRect(0, 130 + i * 16, 256, 3 + i * 1.6); const sun = new THREE.Mesh(new THREE.CircleGeometry(5, 48), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, fog: false })); sun.position.set(0, 4.5, -17); g.add(sun); }
    g.userData.stars = pm;
  }
  if (style === 'storm') { flash = (t) => { const k = Math.sin(t * 3.1) * Math.sin(t * 7.3) * Math.sin(t * 1.7); return k > 0.88 ? 1 : 0; }; }
  return { obj: g, update: (t) => { if (g.userData.stars) g.userData.stars.opacity = 0.65 + 0.35 * Math.sin(t * 2.2); return flash(t); } };
}
export const SKY_STYLES = { day: ['#4aa8ff', '#e8f6ff'], sunset: ['#3a2a78', '#ff9e7d'], dawn: ['#6a7fdb', '#ffd9b0'], night: ['#050a24', '#1f3a7a'], storm: ['#2b3138', '#7f8a94'], neon: ['#1a0536', '#ff4fa3'] };
