// ================= SCENE 6 : FSCS protection (57.4 - 66.2) =================
(function () {
  const c = S('s6'), T = 57.4, D = 8.8;
  box(c, { left: 0, top: 0, width: W, height: H, background: 'linear-gradient(#0e7c86, #3b82f6)' });
  sunburst(c, '#7fe8d8', '#2aa6c4', T, D, 1900, -420, 0.35);
  dots(c, '#fff', 36, 0.12);
  // coins orbiting the shield
  const sh = box(c, { left: 175, top: 190, width: 370, height: 444 }, ICON.shield('#19c3b1', '#3b82f6'));
  tl.fromTo(sh, { scale: 0, opacity: 0, rotation: -30 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.8)' }, T + 0.25);
  tl.fromTo(sh, { y: 0 }, { y: -14, duration: 0.7, repeat: 11, yoyo: true, ease: 'sine.inOut' }, T + 0.9);
  const glow = box(c, { left: 110, top: 150, width: 500, height: 520, borderRadius: '50%', background: 'radial-gradient(rgba(255,255,255,.7), rgba(255,255,255,0) 65%)', zIndex: 0 });
  tl.fromTo(glow, { scale: 0.7, opacity: 0.2 }, { scale: 1.15, opacity: 0.8, duration: 0.8, repeat: 9, yoyo: true, ease: 'sine.inOut' }, T);
  for (let k = 0; k < 8; k++) {
    const cn = box(c, { left: 330, top: 380, width: 60, height: 60, zIndex: 6 }, ICON.coin());
    const ph = k / 8 * Math.PI * 2;
    const o = { a: ph };
    tl.fromTo(cn, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3 }, T + 0.5 + k * 0.1);
    tl.to(o, { a: ph + Math.PI * 4, duration: 8, ease: 'none', onUpdate: () => { gsap.set(cn, { x: Math.cos(o.a) * 250, y: Math.sin(o.a) * 70 - Math.sin(o.a) * 0 + (Math.sin(o.a) > 0 ? 0 : 0), zIndex: Math.sin(o.a) > 0 ? 9 : 2 }); } }, T + 0.5);
  }
  const uk = tagbox(c, 'UK SAVINGS', { left: 195, top: 640, width: 330, fontSize: 40, lineHeight: '56px' }, '#ff3b5c', T + 0.9, 3.0, -3); uk.style.zIndex = 12;
  // limit bar
  const bar = box(c, { left: 70, top: 730, width: 580, height: 50, background: '#fff', border: '6px solid #1b1f5e', borderRadius: 25, overflow: 'hidden', zIndex: 12 });
  const fill = box(bar, { left: 0, top: 0, width: 0, height: 38, background: 'repeating-linear-gradient(45deg,#2ecc71 0 18px,#27ae60 18px 36px)' });
  tl.fromTo(bar, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3 }, 60.3);
  tl.to(fill, { width: 380, duration: 1.2, ease: 'power2.out' }, 60.6);
  const flag = box(c, { left: 420, top: 690, width: 150, height: 44, background: '#ffd23f', border: '5px solid #1b1f5e', borderRadius: 10, fontFamily: 'Archivo Black', fontSize: 26, textAlign: 'center', lineHeight: '34px', zIndex: 13 }, 'LIMIT £?');
  pop(flag, 61.6, { rot0: 20, rot: -4 });
  const ln = box(c, { left: 450 + 0, top: 730, width: 8, height: 56, background: '#c8102e', zIndex: 13 });
  tl.fromTo(ln, { scaleY: 0 }, { scaleY: 1, duration: 0.2 }, 61.6);
  // name
  const fs = box(c, { left: 120, top: 190, width: 480, height: 150, zIndex: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Archivo Black', fontSize: 110, color: '#fff', WebkitTextStroke: '8px #1b1f5e', paintOrder: 'stroke fill', textShadow: '0 8px 0 #1b1f5e' }, 'FSCS');
  slam(fs, 62.0, -5);
  const fn = box(c, { left: 60, top: 795, width: 600, height: 120, zIndex: 14, fontFamily: 'Archivo Black', fontSize: 30, textAlign: 'center', color: '#fff', lineHeight: '38px', WebkitTextStroke: '5px #1b1f5e', paintOrder: 'stroke fill' }, 'FINANCIAL SERVICES<br>COMPENSATION SCHEME');
  tl.fromTo(fn, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, 62.4);
  hide(fn, 64.6, 0.2);
  // magnifier: check the limit yourself
  const mag = box(c, { left: 250, top: 520, width: 260, height: 260, zIndex: 20 });
  mag.innerHTML = `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="82" cy="82" r="62" fill="rgba(255,255,255,.35)" stroke="#1b1f5e" stroke-width="14"/><path d="M128 128 L186 186" stroke="#1b1f5e" stroke-width="22" stroke-linecap="round"/><path d="M52 60 Q70 40 98 46" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" opacity=".8"/></svg>`;
  tl.fromTo(mag, { x: 400, y: 200, opacity: 0, scale: 0.4 }, { x: 150, y: 190, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }, 64.7);
  tl.to(mag, { x: 20, y: 180, duration: 0.7, ease: 'sine.inOut', repeat: 1, yoyo: true }, 65.2);
  const chk = tagbox(c, 'CHECK THE LIMIT YOURSELF', { left: 40, top: 810, width: 640, fontSize: 34, lineHeight: '52px' }, '#ffd23f', 64.8, 0, 2);
  chk.style.color = '#1b1f5e'; chk.style.zIndex = 14;
  // calm customers stroll to a small safe bank at the bottom
  const rr = mulberry32(61);
  for (let i = 0; i < 7; i++) {
    const P = person(c, crowdOpts(rr), -150, 1035 - (i % 2) * 8, 0.52);
    const st = T + 0.3 + i * 0.9;
    tl.fromTo(P.d, { x: 0 }, { x: 900, duration: 5.5, ease: 'none' }, st);
    walk(P, st, 5.5, 0.34, 22);
    mood(P, st, 'happy');
  }
  // bottom shields line
  confetti(c, 360, 560, 62.0, 22, 8);
})();
