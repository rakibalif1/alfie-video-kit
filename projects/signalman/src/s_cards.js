// ===== CARDS: intro title (scene 'intro') and outro end card (scene 'outro') =====
(function () {
  // ---------- INTRO ----------
  const wi = win('intro'), ci = S('intro'), Ti = wi.T, Di = wi.D, Li = box(ci, { left: 0, top: 0, width: W, height: H });
  sky(Li, { top: '#02030a', mid: '#070e2a', bot: '#14285a', stars: 80, moon: { x: 640, y: 220, r: 56 }, T: Ti, D: Di, seed: 21 });
  mist(Li, { y: 430, h: 200, op: 0.34, n: 4, T: Ti, D: Di, seed: 6 });
  ridge(Li, { y: 560, h: 160, color: '#03040b', seed: 7, amp: 22, trees: 14, treeH: 60, T: Ti, D: Di });
  const pulse = box(Li, { left: 240, top: 120, width: 800, height: 520, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(70,110,255,0.34) 0%, rgba(40,70,200,0.1) 45%, rgba(0,0,0,0) 72%)', opacity: 0.4 });
  tl.to(pulse, { opacity: 0.95, scale: 1.1, duration: 1.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, Ti);
  tl.fromTo(Li, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'sine.out' }, Ti);
  tl.to(Li, { scale: 1.05, duration: Di, ease: 'none', transformOrigin: '50% 40%' }, Ti);
  const title = mk(Li, 'title', { top: '378px', fontFamily: 'Georgia, "Times New Roman", serif', fontSize: '78px', fontWeight: 'bold' });
  'THE SIGNAL-MAN'.split('').forEach((ch) => { const s = document.createElement('span'); s.textContent = ch === ' ' ? ' ' : ch; s.style.opacity = '0'; s.style.display = 'inline-block'; title.appendChild(s); });
  const letters = title.querySelectorAll('span');
  tl.fromTo(letters, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.075, ease: 'sine.out' }, Ti + 0.35);
  const sub = mk(Li, 'title', { top: '492px', fontFamily: 'Georgia, serif', fontSize: '28px', fontStyle: 'italic', letterSpacing: '5px', color: '#c4d2f0', opacity: 0 }, 'after Charles Dickens');
  tl.to(sub, { opacity: 0.7, duration: 0.8, ease: 'sine.out' }, Ti + 1.5);

  // ---------- OUTRO ----------
  const wo = win('outro'), co = S('outro'), To = wo.T, Do = wo.D, Lo = box(co, { left: 0, top: 0, width: W, height: H });
  sky(Lo, { top: '#02030a', mid: '#050a1c', bot: '#0c1838', stars: 55, moon: { x: 1090, y: 120, r: 18 }, T: To, D: Do, seed: 33 });
  mist(Lo, { y: 500, h: 160, op: 0.22, n: 3, T: To, D: Do, seed: 8 });
  tl.fromTo(Lo, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'sine.out' }, To);
  const t1 = mk(Lo, 'title', { top: '200px', fontFamily: 'Georgia, serif', fontSize: '60px', fontWeight: 'bold', letterSpacing: '12px', opacity: 0 }, 'NIGHT TALES');
  const t2 = mk(Lo, 'title', { top: '306px', fontFamily: 'Georgia, serif', fontSize: '28px', fontStyle: 'italic', letterSpacing: '3px', color: '#c4d2f0', textShadow: '0 2px 8px #000', opacity: 0 }, 'a new ghost story every week');
  const t3 = mk(Lo, 'title', { top: '368px', fontFamily: 'Georgia, serif', fontSize: '24px', letterSpacing: '2px', color: '#9fb3c8', textShadow: '0 2px 8px #000', opacity: 0 }, 'subscribe so you never miss the next call');
  tl.fromTo(t1, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7, ease: 'sine.out' }, To + 0.2);
  tl.fromTo(t2, { opacity: 0 }, { opacity: 0.85, duration: 0.6 }, To + 0.9);
  tl.fromTo(t3, { opacity: 0 }, { opacity: 0.75, duration: 0.6 }, To + 1.4);
  // five small orbs along the bottom, the fifth pulses
  for (let i = 0; i < 5; i++) {
    const x = 440 + i * 100, y = 560, last = i === 4;
    const o = box(Lo, { left: x - 30, top: y - 30, width: 60, height: 60, borderRadius: '50%', background: `radial-gradient(circle, #fff 0%, ${PAL.aleya} 16%, rgba(60,255,200,0.25) 42%, rgba(0,0,0,0) 70%)`, mixBlendMode: 'screen', opacity: 0 });
    tl.to(o, { opacity: last ? 0.9 : 0.5, duration: 0.5 }, To + 1.0 + i * 0.15);
    tl.to(o, { y: -6, duration: 1.4 + i * 0.2, yoyo: true, repeat: 3, ease: 'sine.inOut' }, To + 1.0);
    if (last) tl.to(o, { scale: 1.9, opacity: 1, duration: 0.7, yoyo: true, repeat: 4, ease: 'sine.inOut' }, To + 1.8);
  }
})();
