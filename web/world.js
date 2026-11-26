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
