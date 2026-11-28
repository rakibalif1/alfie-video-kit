// ===== bg_gags.js : tiny recurring background GAGS (family friendly, brand-free) =====
// ukGags(w,{T,D}) -> {layer}. 21 gags on a 60 s loop, repeated until D. ukGags.list = [{name,t0,t1}] (first loop).
// Everything is div/SVG built with kit.js box(); animation is only tl.fromTo/tl.set with finite repeats (no Math.random).
(function () {
  const UK_BRANDS = [];   // gags never use real brand names, array kept empty on purpose (NO_BRANDS has nothing to switch)
  const LOOP = 60;
  // name, duration (s), start times inside the 60 s loop (chosen so >= 3 gags play at every second, no zone overlaps)
  const DEF = [
    ['seagull_chips', 8, [32.5]], ['hat_chase', 7, [0]], ['dog_walks_owner', 8, [42]], ['umbrella_and_shorts', 8, [51.5]],
    ['pigeon_bus_ride', 9, [18]], ['map_in_wind', 7, [24]], ['bell_at_slow_crossing', 8, [8]], ['queue_starts_here', 9, [50.5]],
    ['hair_in_window', 7, [33]], ['bubbles_child', 8, [0]], ['cat_watches_pigeon', 8, [26]], ['tall_parcel_rider', 9, [8.5]],
    ['squirrel_lamppost', 8, [34.5]], ['free_sign_man', 9, [44.5]], ['mobility_scooter', 7, [17.5]], ['sorry_dance', 7, [0]],
    ['cloud_follows', 8, [43]], ['window_cleaner', 8, [5, 21, 51.5]], ['duster_window', 7, [39.5, 13.5, 31]],
    ['drone_parcel', 8, [37, 10, 18.5]], ['paper_plane_kid', 8, [0.5, 28, 47]]];
  const LIST = [];
  DEF.forEach(([n, d, ts]) => ts.forEach((t) => LIST.push({ name: n, t0: t, t1: t + d })));
  LIST.sort((a, b) => a.t0 - b.t0);

  // ---------- small helpers ----------
  const cyc = (el, a, b, per, t, d, ease) => tl.fromTo(el, a, Object.assign({}, b, { duration: per, repeat: Math.max(0, Math.floor(d / per) - 1), yoyo: true, ease: ease || 'sine.inOut', immediateRender: false }), t);
  const mv = (el, a, b, t, dur, ease) => tl.fromTo(el, a, Object.assign({}, b, { duration: dur, ease: ease || 'none', immediateRender: false }), t);
  const st = (el, props, t) => tl.set(el, props, t);
  const show = (c, t, d) => { tl.fromTo(c, { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, t); tl.fromTo(c, { opacity: 1 }, { opacity: 0, duration: 0.3, immediateRender: false }, t + d - 0.3); };
  function line(p, x1, y1, x2, y2, th, col) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
    const e = box(p, { left: x1, top: y1 - th / 2, width: L, height: th, background: col || '#333', borderRadius: th / 2 });
    gsap.set(e, { transformOrigin: '0 50%', rotation: Math.atan2(dy, dx) * 180 / Math.PI }); return e;
  }
  function bub(p, x, y, txt, wd) {
    wd = wd || Math.round(txt.length * 6.1 + 12);
    const b = box(p, { left: x - wd / 2, top: y, width: wd, height: 17, background: '#fff', border: '1.5px solid #2b2b3a', borderRadius: 8, font: 'bold 10px Arial', color: '#222', textAlign: 'center', lineHeight: 14, opacity: 0, zIndex: 5, whiteSpace: 'nowrap' }, txt);
    box(b, { left: wd / 2 - 4, top: 12, width: 6, height: 6, background: '#fff', borderRight: '1.5px solid #2b2b3a', borderBottom: '1.5px solid #2b2b3a', transform: 'rotate(45deg)' });
    gsap.set(b, { transformOrigin: '50% 130%' }); return b;
  }
  const say = (b, t, d) => { tl.fromTo(b, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.18, ease: 'back.out(2)', immediateRender: false }, t); tl.fromTo(b, { opacity: 1 }, { opacity: 0, duration: 0.18, immediateRender: false }, t + d - 0.18); };

  // little person (div parts) facing right; o.flip mirrors. feet at (o.x,o.y), height ~96*s
  function person(p, o) {
    const s = o.s || 1, skin = o.skin || '#e8b98f', shirt = o.shirt || '#d9534f', pants = o.pants || '#35508a', hair = o.hair || '#3a2a1c';
    const r = box(p, { left: o.x - 20, top: o.y - 96, width: 40, height: 96, zIndex: o.z || 0 });
    gsap.set(r, { transformOrigin: '50% 100%', scale: s });
    const f = box(r, { left: 0, top: 0, width: 40, height: 96 });
    if (o.flip) gsap.set(f, { scaleX: -1 });
    const legBg = o.shorts ? `linear-gradient(${pants} 0 15px,${skin} 15px)` : pants;
    const armL = box(f, { left: 2, top: 23, width: 7, height: 32, background: shirt, borderRadius: 4, filter: 'brightness(.88)' });
    const legL = box(f, { left: 11, top: 56, width: 9, height: 40, background: legBg, borderRadius: '4px 4px 3px 3px' });
    const legR = box(f, { left: 21, top: 56, width: 9, height: 40, background: legBg, borderRadius: '4px 4px 3px 3px' });
    box(legL, { left: -1, top: 34, width: 13, height: 6, background: '#262626', borderRadius: '3px 6px 2px 2px' });
    box(legR, { left: -1, top: 34, width: 13, height: 6, background: '#262626', borderRadius: '3px 6px 2px 2px' });
    const torso = box(f, { left: 8, top: 20, width: 24, height: 40, background: shirt, borderRadius: '10px 10px 5px 5px' });
    const armR = box(f, { left: 31, top: 23, width: 7, height: 32, background: shirt, borderRadius: 4 });
    box(armL, { left: 0, top: 27, width: 7, height: 7, background: skin, borderRadius: '50%' });
    box(armR, { left: 0, top: 27, width: 7, height: 7, background: skin, borderRadius: '50%' });
    const head = box(f, { left: 10, top: -1, width: 20, height: 21, background: skin, borderRadius: '50%' });
    if (!o.bald) box(head, { left: -1, top: -3, width: 22, height: 12, background: hair, borderRadius: '11px 11px 4px 4px' });
    box(head, { left: 6, top: 10, width: 3, height: 3, background: '#222', borderRadius: '50%' });
    box(head, { left: 13, top: 10, width: 3, height: 3, background: '#222', borderRadius: '50%' });
    box(head, { left: 7, top: 15, width: 8, height: 3, borderBottom: '1.5px solid #8a4a3a', borderRadius: '0 0 8px 8px' });
    gsap.set([legL, legR], { transformOrigin: '50% 6%' }); gsap.set([armL, armR], { transformOrigin: '50% 10%' }); gsap.set(head, { transformOrigin: '50% 100%' });
    return { r, f, legL, legR, armL, armR, head, torso };
  }
  function reset(P, t) { st([P.legL, P.legR, P.armL, P.armR], { rotation: 0 }, t); st(P.f, { y: 0 }, t); st(P.r, { x: 0, y: 0, rotation: 0 }, t); }
  function walk(P, t, d, per, amp, noArms) {
    cyc(P.legL, { rotation: -amp }, { rotation: amp }, per, t, d); cyc(P.legR, { rotation: amp }, { rotation: -amp }, per, t, d);
    if (!noArms) { cyc(P.armL, { rotation: amp * 0.9 }, { rotation: -amp * 0.9 }, per, t, d); cyc(P.armR, { rotation: -amp * 0.9 }, { rotation: amp * 0.9 }, per, t, d); }
    cyc(P.f, { y: 0 }, { y: -2 }, per / 2, t, d);
  }
  function gullEl(p) {
    const c = box(p, { left: 0, top: 0, width: 46, height: 28 }); const i = box(c, { left: 0, top: 0, width: 46, height: 28 });
    i.innerHTML = '<svg width="46" height="28" viewBox="0 0 46 28"><path d="M5 15 L0 12 L0 18Z" fill="#f4f4f4"/><path d="M5 15 Q12 10 24 11 Q34 10 38 14 Q34 20 24 20 Q12 21 5 15Z" fill="#fbfbfb" stroke="#c4cad0" stroke-width=".6"/><path d="M9 13 Q20 9 31 11 Q22 14 9 13Z" fill="#a9b4bf"/><circle cx="37" cy="12.5" r="4.2" fill="#fff"/><path d="M40.5 12 L46 13.2 L40.5 14.6Z" fill="#f2c230"/><circle cx="43.4" cy="14" r=".8" fill="#d33"/><circle cx="38.6" cy="11.8" r=".9" fill="#222"/><path d="M22 20 L21 25 M26 20 L26.6 25" stroke="#e58aa0" stroke-width="1.1"/></svg>';
    const wing = box(i, { left: 12, top: 2, width: 28, height: 16 });
    wing.innerHTML = '<svg width="28" height="16" viewBox="0 0 28 16"><path d="M2 14 Q10 2 26 1 L27 4 Q17 8 12 15Z" fill="#9aa7b4" stroke="#7b8896" stroke-width=".4"/><path d="M20 1.6 L27 1 L27 4 Q23 3.4 20 1.6Z" fill="#161616"/><circle cx="24" cy="2.6" r=".7" fill="#fff"/></svg>';
    gsap.set(wing, { transformOrigin: '8% 90%' }); return { c, i, wing };
  }
  function pigEl(p) {
    const c = box(p, { left: 0, top: 0, width: 36, height: 26 }); const i = box(c, { left: 0, top: 0, width: 36, height: 26 });
    i.innerHTML = '<svg width="36" height="26" viewBox="0 0 36 26"><path d="M6 12 L0 15 L6 17Z" fill="#5d6573"/><ellipse cx="16" cy="14" rx="11" ry="7" fill="#8e9aab"/><ellipse cx="22" cy="15" rx="6" ry="5" fill="#a9b4c4"/><path d="M13 20 L13 25 M18 20 L18 25" stroke="#d77f8f" stroke-width="1.3"/></svg>';
    const wing = box(i, { left: 7, top: 7, width: 20, height: 12 });
    wing.innerHTML = '<svg width="20" height="12" viewBox="0 0 20 12"><path d="M1 6 Q10 0 19 3 Q17 9 8 11Z" fill="#7d899c"/><path d="M6 3.5 L8 9 M10 2.5 L12 8" stroke="#1d2230" stroke-width="1.6"/></svg>';
    const hd = box(i, { left: 22, top: 2, width: 14, height: 14 });
    hd.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14"><circle cx="6" cy="6" r="4.2" fill="#69727f"/><ellipse cx="4.6" cy="9.2" rx="3.6" ry="2.8" fill="#4f9a7d" opacity=".75"/><ellipse cx="5" cy="9.6" rx="2.8" ry="2" fill="#8e5aa8" opacity=".55"/><circle cx="7.6" cy="5.2" r="1.1" fill="#e8832a"/><circle cx="7.8" cy="5.2" r=".5" fill="#111"/><path d="M9.8 6 L13.5 7.2 L9.8 8Z" fill="#d9d0c0"/></svg>';
    gsap.set(wing, { transformOrigin: '12% 70%' }); gsap.set(hd, { transformOrigin: '30% 90%' }); return { c, i, wing, hd };
  }
  function catEl(p, col) {
    col = col || '#d98c3f';
    const c = box(p, { left: 0, top: 0, width: 46, height: 36 });
    const tail = box(c, { left: 1, top: 14, width: 7, height: 22, borderRadius: 6, background: col }); gsap.set(tail, { transformOrigin: '50% 95%' });
    box(c, { left: 8, top: 14, width: 26, height: 22, borderRadius: '60% 60% 40% 40%', background: col });
    box(c, { left: 14, top: 18, width: 2, height: 10, background: 'rgba(120,60,10,.5)' }); box(c, { left: 20, top: 17, width: 2, height: 11, background: 'rgba(120,60,10,.5)' });
    const head = box(c, { left: 22, top: 3, width: 20, height: 17, borderRadius: '50%', background: col }); gsap.set(head, { transformOrigin: '40% 90%' });
    box(head, { left: 1, top: -5, width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderBottom: '8px solid ' + col });
    box(head, { left: 12, top: -5, width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderBottom: '8px solid ' + col });
    const e1 = box(head, { left: 5, top: 6, width: 4, height: 4, background: '#cde96a', borderRadius: '50%', border: '1px solid #222' });
    const e2 = box(head, { left: 12, top: 6, width: 4, height: 4, background: '#cde96a', borderRadius: '50%', border: '1px solid #222' });
    box(head, { left: 9, top: 11, width: 3, height: 2, background: '#e58aa0', borderRadius: '50%' });
    return { c, tail, head, e1, e2 };
  }
  function dogEl(p) {
    const c = box(p, { left: 0, top: 0, width: 64, height: 40 });
    const legs = [12, 19, 36, 43].map((x) => { const l = box(c, { left: x, top: 24, width: 5, height: 15, borderRadius: 3, background: '#9c6230' }); gsap.set(l, { transformOrigin: '50% 10%' }); return l; });
    box(c, { left: 8, top: 10, width: 40, height: 18, borderRadius: '9px 12px 8px 8px', background: '#b9793c' });
    const tail = box(c, { left: 2, top: 6, width: 5, height: 15, borderRadius: 3, background: '#b9793c' }); gsap.set(tail, { transformOrigin: '50% 100%', rotation: 30 });
    const head = box(c, { left: 42, top: 2, width: 20, height: 17, borderRadius: '8px 10px 6px 8px', background: '#b9793c' }); gsap.set(head, { transformOrigin: '20% 90%' });
    box(head, { left: 13, top: 8, width: 9, height: 7, borderRadius: 4, background: '#8a5528' }); box(head, { left: 19, top: 8, width: 3, height: 3, borderRadius: '50%', background: '#111' });
    box(head, { left: 8, top: 4, width: 3, height: 3, borderRadius: '50%', background: '#111' }); box(head, { left: 2, top: -2, width: 6, height: 11, borderRadius: '3px 3px 6px 6px', background: '#7a4a22' });
    box(c, { left: 40, top: 15, width: 5, height: 5, background: '#d33', borderRadius: 2 });
    return { c, legs, tail, head };
  }
  function bikeEl(p, o) {
    const c = box(p, { left: o.x, top: o.y - 46, width: 74, height: 46 });
    const mk1 = (lx) => { const wh = box(c, { left: lx, top: 20, width: 26, height: 26, borderRadius: '50%', border: '3px solid #222', background: 'rgba(255,255,255,.12)' }); box(wh, { left: 9, top: -1, width: 2, height: 20, background: '#555' }); box(wh, { left: -1, top: 9, width: 20, height: 2, background: '#555' }); return wh; };
    const rw = mk1(2), fw = mk1(48);
    const col = o.col || '#c0392b';
    [[15, 33, 35, 33], [35, 33, 30, 14], [30, 14, 15, 33], [30, 14, 54, 14], [35, 33, 54, 14], [54, 14, 61, 33], [54, 14, 58, 8], [30, 14, 29, 9]].forEach((a) => line(c, a[0], a[1], a[2], a[3], 2.4, col));
    box(c, { left: 24, top: 6, width: 12, height: 4, background: '#222', borderRadius: 3 }); box(c, { left: 56, top: 5, width: 7, height: 3, background: '#222', borderRadius: 2 });
    return { c, rw, fw };
  }
  const spinWheels = (b, t, d, per) => { [b.rw, b.fw].forEach((e) => tl.fromTo(e, { rotation: 0 }, { rotation: 360, duration: per, ease: 'none', repeat: Math.max(0, Math.floor(d / per) - 1), immediateRender: false }, t)); };

  // ---------- the gags ----------
  const B = {};

  B.seagull_chips = (c) => {
    const man = person(c, { x: 80, y: 695, s: 0.95, shirt: '#4a8f5a', hair: '#6b4a2a' });
    box(man.armR, { left: -3, top: 27, width: 13, height: 15, background: '#fffdf2', clipPath: 'polygon(0 0,100% 0,50% 100%)' });
    [[-1, 19, -15], [2, 17, 5], [5, 19, 18]].forEach((q) => box(man.armR, { left: q[0], top: q[1], width: 4, height: 10, background: '#f0c040', borderRadius: 2, transform: 'rotate(' + q[2] + 'deg)' }));
    const gl = gullEl(c); const chip = box(gl.i, { left: 41, top: 13, width: 9, height: 4, background: '#f0c040', borderRadius: 2, opacity: 0 });
    const oi = bub(c, 95, 584, 'OI! MY CHIPS!');
    return (t, d) => {
      reset(man, t); st(man.armR, { rotation: -80 }, t); st(chip, { opacity: 0 }, t); st(gl.c, { opacity: 1 }, t); st(gl.i, { scaleX: -1 }, t);
      cyc(gl.wing, { rotation: -35 }, { rotation: 45 }, 0.12, t, 4);
      mv(gl.c, { x: 330, y: 520 }, { x: 108, y: 636 }, t + 0.2, 1.5, 'power1.out');
      st(chip, { opacity: 1 }, t + 1.75); st(gl.i, { scaleX: 1 }, t + 1.85);
      mv(gl.c, { x: 108, y: 636 }, { x: 330, y: 470 }, t + 1.75, 2.0, 'power2.in');
      tl.fromTo(gl.c, { opacity: 1 }, { opacity: 0, duration: 0.3, immediateRender: false }, t + 3.5);
      tl.fromTo(man.armR, { rotation: -80 }, { rotation: -135, duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, t + 1.7);
      say(oi, t + 2.0, 1.6);
      mv(man.r, { x: 0 }, { x: 120 }, t + 2.0, 1.9, 'power1.out'); walk(man, t + 2.0, 1.9, 0.14, 42, true);
      cyc(man.armL, { rotation: 30 }, { rotation: -40 }, 0.14, t + 2.0, 1.9);
      st([man.legL, man.legR], { rotation: 0 }, t + 3.95);
      cyc(man.armR, { rotation: -120 }, { rotation: -170 }, 0.2, t + 3.95, d - 4.1);
    };
  };

  B.hat_chase = (c) => {
    const man = person(c, { x: 1330, y: 695, s: 0.9, flip: true, shirt: '#8c5ab8', pants: '#444', hair: '#999' });
    const hx = box(c, { left: 0, top: 0, width: 24, height: 18 }); const hy = box(hx, { left: 0, top: 0, width: 24, height: 18 }); const hat = box(hy, { left: 0, top: 0, width: 24, height: 18 });
    box(hat, { left: 5, top: 0, width: 14, height: 12, background: '#2d2d3a', borderRadius: '6px 6px 0 0' }); box(hat, { left: 0, top: 11, width: 24, height: 4, background: '#2d2d3a', borderRadius: 3 }); box(hat, { left: 5, top: 8, width: 14, height: 3, background: '#c0392b' });
    gsap.set(hat, { transformOrigin: '50% 50%' });
    const winds = [0, 1, 2].map((k) => box(c, { left: 1190 + k * 30, top: 626 + k * 17, width: 40, height: 2, background: 'rgba(255,255,255,.7)', borderRadius: 2, opacity: 0 }));
    const b = bub(c, 1110, 586, 'MY HAT!');
    return (t, d) => {
      reset(man, t); st(man.armL, { rotation: -75 }, t); st(man.armR, { rotation: -75 }, t);
      mv(hx, { x: 1255, y: 676 }, { x: 1040, y: 676 }, t + 0.3, 6.2); cyc(hy, { y: 0 }, { y: -16 }, 0.3, t + 0.3, 6.2, 'sine.out');
      tl.fromTo(hat, { rotation: 0 }, { rotation: -720, duration: 6.2, ease: 'none', immediateRender: false }, t + 0.3);
      mv(man.r, { x: 0 }, { x: -240 }, t + 0.3, 6.2); walk(man, t + 0.3, 6.2, 0.13, 45, true);
      winds.forEach((wd, k) => cyc(wd, { opacity: 0, x: 40 }, { opacity: 0.8, x: -60 }, 0.4 + k * 0.07, t + 0.2, d - 0.4, 'power1.in'));
      say(b, t + 1.8, 2.2);
    };
  };

  B.dog_walks_owner = (c) => {
    const grp = box(c, { left: 0, top: 0, width: 200, height: 720 });
    const man = person(grp, { x: 125, y: 695, s: 0.92, flip: true, shirt: '#3b8ea5', hair: '#222' });
    const dog = dogEl(grp); gsap.set(dog.c, { x: 20, y: 656, scaleX: -1 });
    line(grp, 104, 660, 46, 673, 1.5, '#a22');
    return (t, d) => {
      reset(man, t); st(grp, { x: 0 }, t);
      mv(grp, { x: 130 }, { x: -150 }, t + 0.2, d - 0.5);
      st(man.r, { rotation: 11 }, t); walk(man, t, d, 0.25, 32, true); st(man.armR, { rotation: -70 }, t); cyc(man.armL, { rotation: 20 }, { rotation: -25 }, 0.25, t, d);
      dog.legs.forEach((l, k) => cyc(l, { rotation: k % 2 ? -40 : 40 }, { rotation: k % 2 ? 40 : -40 }, 0.16, t, d, 'sine.inOut'));
      cyc(dog.tail, { rotation: 10 }, { rotation: 60 }, 0.08, t, d); cyc(dog.c, { y: 656 }, { y: 653 }, 0.1, t, d); cyc(dog.head, { rotation: -6 }, { rotation: 6 }, 0.2, t, d);
    };
  };

  B.umbrella_and_shorts = (c) => {
    const a = person(c, { x: 1185, y: 695, s: 0.92, shirt: '#444', pants: '#222', hair: '#ccc' });
    const umb = box(c, { left: 1148, top: 575, width: 80, height: 40 }); box(umb, { left: 0, top: 0, width: 80, height: 40, background: '#e0457b', borderRadius: '80px 80px 0 0' });
    [20, 40, 60].forEach((x) => box(umb, { left: x, top: 2, width: 1.5, height: 36, background: 'rgba(255,255,255,.35)' })); box(umb, { left: 39, top: 38, width: 2.5, height: 38, background: '#333' });
    const bz = person(c, { x: 1250, y: 695, s: 0.92, shorts: true, shirt: '#f0a020', pants: '#2a7fb8', hair: '#5a3a1a', skin: '#b87a50' });
    const pud = box(c, { left: 1214, top: 688, width: 74, height: 14, borderRadius: '50%', background: 'rgba(90,150,210,.8)', border: '1px solid #4a80b0' });
    const rip = [0, 1].map(() => box(c, { left: 1228, top: 690, width: 46, height: 10, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.9)' }));
    const b1 = bub(c, 1180, 553, 'FORECAST SAID RAIN'), b2 = bub(c, 1250, 585, 'LOVELY DAY!');
    return (t, d) => {
      reset(a, t); reset(bz, t); st(a.armR, { rotation: -20 }, t);
      cyc(a.f, { y: 0 }, { y: -1.5 }, 0.5, t, d); cyc(bz.legR, { rotation: 0 }, { rotation: -35 }, 0.3, t, d, 'power1.out'); cyc(bz.armR, { rotation: -10 }, { rotation: -50 }, 0.3, t, d);
      cyc(bz.f, { y: 0 }, { y: -2 }, 0.3, t, d, 'power1.out');
      rip.forEach((r, k) => tl.fromTo(r, { scale: 0.3, opacity: 1 }, { scale: 1.4, opacity: 0, duration: 0.6, ease: 'power1.out', repeat: Math.floor(d / 0.6) - 1, immediateRender: false }, t + k * 0.3));
      say(b1, t + 0.8, 2.6); say(b2, t + 4.2, 2.4);
    };
  };

  B.pigeon_bus_ride = (c) => {
    const sg = box(c, { left: 1236, top: 520, width: 44, height: 90 }); box(sg, { left: 19, top: 18, width: 4, height: 72, background: '#666' }); box(sg, { left: 0, top: 0, width: 42, height: 22, background: '#2060b0', border: '2px solid #fff', borderRadius: 3, font: 'bold 8px Arial', color: '#fff', textAlign: 'center', lineHeight: 18 }, 'BUS STOP');
    const bus = box(c, { left: 0, top: 506, width: 156, height: 92 });
    box(bus, { left: 0, top: 6, width: 150, height: 80, background: '#d63a3a', borderRadius: '9px 9px 4px 4px' }); box(bus, { left: 0, top: 44, width: 150, height: 5, background: '#f2f2f2' });
    for (let k = 0; k < 5; k++) { box(bus, { left: 10 + k * 26, top: 14, width: 20, height: 20, background: '#bfe1ee', borderRadius: 3, border: '1px solid #8aa' }); if (k < 4) box(bus, { left: 10 + k * 26, top: 53, width: 20, height: 16, background: '#bfe1ee', borderRadius: 3, border: '1px solid #8aa' }); }
    box(bus, { left: 112, top: 52, width: 24, height: 33, background: '#9cc9d8', border: '1px solid #678', borderRadius: 2 }); box(bus, { left: 4, top: 0, width: 64, height: 9, background: '#111', borderRadius: 2, font: 'bold 7px Arial', color: '#ffb000', lineHeight: 9, textAlign: 'center' }, 'TOWN CENTRE');
    const wh = [24, 112].map((x) => { const e = box(bus, { left: x, top: 72, width: 22, height: 22, borderRadius: '50%', background: '#222', border: '3px solid #555' }); box(e, { left: 6, top: 6, width: 4, height: 4, background: '#999', borderRadius: '50%' }); box(e, { left: 6, top: -1, width: 2, height: 12, background: '#888' }); return e; });
    const pg = pigEl(c); gsap.set(pg.i, { scaleX: -1 });
    return (t, d) => {
      st(pg.c, { x: 1241, y: 488 }, t); st(pg.hd, { rotation: 0 }, t); st(pg.wing, { rotation: 0 }, t);
      mv(bus, { x: 1290 }, { x: 1004 }, t + 0.2, 1.8, 'power2.out'); wh.forEach((e) => mv(e, { rotation: 0 }, { rotation: -540 }, t + 0.2, 1.8, 'power2.out'));
      cyc(pg.hd, { rotation: -10 }, { rotation: 25 }, 0.3, t, 3);
      // pigeon hops from the sign onto the roof
      mv(pg.c, { x: 1241, y: 488 }, { x: 1080, y: 470 }, t + 3.2, 0.7, 'sine.inOut'); cyc(pg.wing, { rotation: -40 }, { rotation: 40 }, 0.1, t + 3.2, 0.7);
      mv(pg.c, { x: 1080, y: 470 }, { x: 1080, y: 487 }, t + 3.9, 0.2, 'power2.in');
      mv(bus, { x: 1004 }, { x: 1320 }, t + 5.4, 2.6, 'power2.in'); wh.forEach((e) => mv(e, { rotation: 0 }, { rotation: 900 }, t + 5.4, 2.6, 'power2.in'));
      mv(pg.c, { x: 1080, y: 487 }, { x: 1396, y: 487 }, t + 5.4, 2.6, 'power2.in');
      cyc(pg.hd, { rotation: -5 }, { rotation: 22 }, 0.18, t + 4.1, 3.5);
      cyc(bus, { y: 0 }, { y: -1.5 }, 0.15, t + 5.4, 2.4);
    };
  };

  B.map_in_wind = (c) => {
    const P = person(c, { x: 75, y: 695, s: 0.95, shirt: '#e08a2c', hair: '#c9a24a' });
    const map = box(c, { left: 38, top: 586, width: 62, height: 48 }); gsap.set(map, { transformOrigin: '50% 100%' });
    map.innerHTML = '<svg width="62" height="48" viewBox="0 0 62 48"><rect width="62" height="48" fill="#f6ecc4" stroke="#9a8a5a"/><path d="M0 30 Q15 20 30 28 T62 18" stroke="#6bb3e0" stroke-width="5" fill="none"/><rect x="6" y="6" width="16" height="12" fill="#9ccf84"/><path d="M8 40 L24 34 L40 42 L56 30" stroke="#d33" stroke-width="2" stroke-dasharray="3 3" fill="none"/><path d="M31 0 V48 M0 24 H62" stroke="#c9b97a" stroke-width=".8"/><text x="40" y="12" font-size="8" font-family="Arial" fill="#444">N?</text></svg>';
    const winds = [0, 1, 2].map((k) => box(c, { left: 14 + k * 24, top: 620 + k * 18, width: 36, height: 2, background: 'rgba(255,255,255,.75)', borderRadius: 2, opacity: 0 }));
    const b = bub(c, 75, 562, 'WHICH WAY IS NORTH?');
    return (t, d) => {
      reset(P, t); st(P.armL, { rotation: -150 }, t); st(P.armR, { rotation: -150 }, t);
      cyc(map, { rotation: -14, skewX: -12, scaleX: 0.85 }, { rotation: 14, skewX: 14, scaleX: 1.15 }, 0.17, t, d);
      cyc(P.head, { rotation: -6 }, { rotation: 6 }, 0.4, t, d);
      cyc(P.f, { x: -2 }, { x: 3 }, 0.22, t, d); winds.forEach((wd, k) => cyc(wd, { opacity: 0, x: -30 }, { opacity: 0.85, x: 70 }, 0.35 + k * 0.08, t, d, 'power1.in'));
      say(b, t + 1.2, 3.5);
    };
  };

  B.bell_at_slow_crossing = (c) => {
    const olds = [0, 1, 2].map((k) => person(c, { x: 1240 + k * 34, y: 696, s: 0.74, flip: true, shirt: ['#b05', '#2a8', '#a73'][k], pants: '#555', hair: '#ddd' }));
    const bk = bikeEl(c, { x: 1250, y: 696, col: '#2a6' }); gsap.set(bk.c, { scale: 0.85, transformOrigin: '50% 100%' }); gsap.set(bk.c, { scaleX: -0.85 });
    const rider = person(bk.c, { x: 37, y: 38, s: 0.62, shirt: '#f2d02a', pants: '#223', hair: '#222' });
    const ding = bub(c, 1180, 592, 'DING DING!'), tut = bub(c, 1090, 604, 'SORRY, TAKING MY TIME', 130);
    const arcs = [0, 1].map((k) => box(c, { left: 1182 + k * 8, top: 628 - k * 6, width: 12 + k * 6, height: 12 + k * 6, borderRadius: '50%', border: '2px solid #333', borderColor: '#333 transparent transparent transparent', opacity: 0 }));
    return (t, d) => {
      const dur = 6.4;
      olds.forEach((p, k) => { reset(p, t); mv(p.r, { x: 0 }, { x: -230 }, t + 0.2, dur, 'sine.inOut'); walk(p, t + 0.2, dur, 0.55 + k * 0.05, 14); });
      mv(bk.c, { x: 0 }, { x: -225 }, t + 0.2, dur, 'sine.inOut'); spinWheels(bk, t + 0.2, dur, 1.4); cyc(rider.legL, { rotation: -30 }, { rotation: 30 }, 0.5, t + 0.2, dur); cyc(rider.legR, { rotation: 30 }, { rotation: -30 }, 0.5, t + 0.2, dur);
      st(rider.armL, { rotation: -60 }, t); st(rider.armR, { rotation: -60 }, t);
      arcs.forEach((a, k) => cyc(a, { opacity: 0 }, { opacity: 1 }, 0.18, t + 2.8 + k * 0.05, 1.8, 'none'));
      say(ding, t + 2.8, 1.8); say(tut, t + 4.8, 2.2);
    };
  };

  B.queue_starts_here = (c) => {
    box(c, { left: 22, top: 618, width: 4, height: 82, background: '#555' });
    box(c, { left: 6, top: 600, width: 84, height: 30, background: '#f5d020', border: '2px solid #222', borderRadius: 3, font: 'bold 10px Arial', color: '#111', textAlign: 'center', lineHeight: 12, paddingTop: 2 }, 'QUEUE STARTS<br>HERE &rarr;'.replace('&rarr;', '>>'));
    const cols = ['#c0392b', '#2980b9', '#27ae60', '#8e44ad', '#e67e22', '#16a085'];
    const ps = cols.map((cl, k) => person(c, { x: 62 + k * 30, y: 696, s: 0.7, flip: k % 2 === 0, shirt: cl, pants: '#334', hair: ['#222', '#7a4a1a', '#ccc', '#111'][k % 4], skin: ['#e8b98f', '#a8693f', '#d9a074'][k % 3] }));
    const b = bub(c, 150, 598, 'WHAT ARE WE QUEUING FOR?', 150);
    return (t, d) => {
      ps.forEach((p, k) => { reset(p, t); st(p.r, { opacity: 0, scale: 0.7 * 0.3 }, t); tl.fromTo(p.r, { opacity: 0, scale: 0.7 * 0.3 }, { opacity: 1, scale: 0.7, duration: 0.3, ease: 'back.out(2)', immediateRender: false }, t + 0.6 + k * 1.1); cyc(p.f, { y: 0 }, { y: -1.2 }, 0.9 + k * 0.1, t, d); });
      cyc(ps[1].armR, { rotation: -100 }, { rotation: -40 }, 0.5, t + 2, 5); cyc(ps[3].head, { rotation: -8 }, { rotation: 8 }, 0.8, t, d);
      say(b, t + 5.2, 3.3);
    };
  };

  B.hair_in_window = (c) => {
    const win = box(c, { left: 1024, top: 598, width: 66, height: 100, background: 'linear-gradient(135deg,#cbe8f4,#eaf6fb)', border: '4px solid #7c5f4a', borderRadius: 3 });
    box(win, { left: 0, top: 78, width: 58, height: 14, background: 'rgba(140,110,80,.25)' });
    const ref = person(win, { x: 30, y: 92, s: 0.82, shirt: '#2b6cb0', hair: '#222', skin: '#d9b390' }); gsap.set(ref.r, { opacity: 0.5 });
    box(c, { left: 1018, top: 696, width: 80, height: 5, background: '#8d7a68', borderRadius: 2 });
    const man = person(c, { x: 1124, y: 695, s: 0.9, flip: true, shirt: '#2b6cb0', hair: '#222', skin: '#d9b390' });
    const b = bub(c, 1124, 582, 'LOOKING GOOD, MATE'), b2 = bub(c, 1124, 582, 'THUMBS UP, MATE');
    return (t, d) => {
      reset(man, t); reset(ref, t); st(man.armL, { rotation: -10 }, t); st(ref.armL, { rotation: -10 }, t);
      cyc(man.armR, { rotation: -150 }, { rotation: -175 }, 0.22, t, 4.2); cyc(ref.armR, { rotation: -150 }, { rotation: -175 }, 0.22, t, 4.2);
      st([man.armR, ref.armR], { rotation: -60 }, t + 4.4);
      st(ref.armR, { rotation: -165 }, t + 4.7); cyc(ref.head, { rotation: -6 }, { rotation: 6 }, 0.3, t + 4.7, 2.2);
      cyc(man.head, { rotation: -4 }, { rotation: 4 }, 0.5, t, d); cyc(man.f, { y: 0 }, { y: -1 }, 0.6, t, d);
      say(b, t + 0.6, 3.4); say(b2, t + 4.6, 2.2);
    };
  };

  B.bubbles_child = (c) => {
    const kid = person(c, { x: 62, y: 696, s: 0.62, shirt: '#ff7aa8', pants: '#3a6ab0', hair: '#2a1a10', skin: '#a8693f' });
    const wand = box(c, { left: 86, top: 636, width: 16, height: 16, borderRadius: '50%', border: '2px solid #888' }); line(c, 82, 668, 90, 650, 1.5, '#888');
    const bs = [0, 1, 2, 3, 4, 5, 6].map((k) => box(c, { left: 94, top: 640, width: 7 + (k % 3) * 5, height: 7 + (k % 3) * 5, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.95)', background: 'radial-gradient(circle at 30% 30%,rgba(255,255,255,.85),rgba(150,210,255,.25))', opacity: 0 }));
    return (t, d) => {
      reset(kid, t); st(kid.armR, { rotation: -140 }, t); cyc(kid.armR, { rotation: -140 }, { rotation: -165 }, 0.5, t, d); cyc(wand, { rotation: -10 }, { rotation: 15 }, 0.5, t, d); cyc(kid.f, { y: 0 }, { y: -2 }, 0.45, t, d);
      bs.forEach((b, k) => {
        const per = 2.8, off = k * 0.45, n = Math.max(0, Math.floor((d - off) / per) - 1);
        tl.fromTo(b, { x: 0, y: 0, scale: 0.3 }, { x: 30 + (k * 11) % 40, y: -(100 + (k * 17) % 50), scale: 1, duration: per, ease: 'sine.out', repeat: n, immediateRender: false }, t + off);
        tl.to(b, { keyframes: { easeEach: 'none', '0%': { opacity: 0.9 }, '86%': { opacity: 0.9 }, '100%': { opacity: 0 } }, duration: per, ease: 'none', repeat: n, immediateRender: false }, t + off);
      });
    };
  };

  B.cat_watches_pigeon = (c) => {
    const cat = catEl(c); gsap.set(cat.c, { x: 1160, y: 662 });
    const pg = pigEl(c); gsap.set(pg.i, { scaleX: -1 }); box(c, { left: 1236, top: 694, width: 30, height: 4, background: 'rgba(0,0,0,.12)', borderRadius: '50%' });
    const b = bub(c, 1195, 628, 'NOT TODAY, PIGEON'), b2 = bub(c, 1180, 622, '...');
    return (t, d) => {
      st(cat.c, { x: 1160, y: 662, scaleY: 1 }, t); st(pg.c, { x: 1240, y: 672, opacity: 1, rotation: 0 }, t); st(pg.wing, { rotation: 0 }, t);
      cyc(cat.tail, { rotation: -25 }, { rotation: 35 }, 0.8, t, d); cyc(pg.hd, { rotation: 0 }, { rotation: 45 }, 0.22, t, 5.2); cyc(cat.head, { rotation: -4 }, { rotation: 8 }, 1, t, 3.5);
      cyc(cat.e1, { x: 0 }, { x: 1.5 }, 0.9, t, 3.5);
      tl.fromTo(cat.c, { scaleY: 1 }, { scaleY: 0.78, duration: 0.5, immediateRender: false, transformOrigin: '50% 100%' }, t + 3.2);
      cyc(cat.c, { x: 1160 }, { x: 1162 }, 0.06, t + 3.7, 1.3, 'none');
      mv(cat.c, { x: 1162 }, { x: 1208 }, t + 5.1, 0.35, 'power2.out'); cyc(cat.c, { y: 662 }, { y: 645 }, 0.17, t + 5.1, 0.35, 'sine.out');
      st(cat.c, { scaleY: 1 }, t + 5.5); cyc(pg.wing, { rotation: -50 }, { rotation: 40 }, 0.07, t + 5.2, 1.6);
      mv(pg.c, { x: 1240, y: 672 }, { x: 1330, y: 520 }, t + 5.2, 1.6, 'power2.in'); st(pg.c, { opacity: 0 }, t + 6.8);
      cyc(cat.head, { rotation: -12 }, { rotation: -16 }, 0.8, t + 6, 1.8);
      say(b, t + 1.0, 2.2); say(b2, t + 6.2, 1.6);
    };
  };

  B.tall_parcel_rider = (c) => {
    const unit = box(c, { left: 0, top: 636, width: 80, height: 60 }); const bk = bikeEl(unit, { x: 0, y: 60, col: '#1b7' });
    const rider = person(bk.c, { x: 36, y: 38, s: 0.62, shirt: '#11a36a', pants: '#223', hair: '#222', skin: '#c68e63' });
    const stk = box(bk.c, { left: 4, top: -118, width: 26, height: 126 }); gsap.set(stk, { transformOrigin: '50% 100%' });
    const cl = ['#c89a5e', '#b88547', '#d4a96a', '#a9763e'];
    for (let k = 0; k < 9; k++) { const bx = box(stk, { left: (k % 3) - 1, top: 126 - 14 * (k + 1), width: 24 - (k % 2), height: 14, background: cl[k % 4], border: '1px solid rgba(80,50,20,.6)' }); box(bx, { left: 10, top: 0, width: 4, height: 14, background: 'rgba(255,255,255,.4)' }); }
    box(stk, { left: 4, top: -14, width: 18, height: 14, background: '#fff', border: '1px solid #aaa', font: 'bold 6px Arial', color: '#c33', lineHeight: 12, textAlign: 'center' }, 'FRAGILE');
    const b = bub(c, 105, 540, 'IT IS FINE. IT IS FINE.', 130);
    box(c, { left: 70, top: 692, width: 90, height: 6, background: 'rgba(0,0,0,.12)', borderRadius: '50%' });
    return (t, d) => {
      st(unit, { x: -120, scaleX: 1 }, t);
      mv(unit, { x: -120 }, { x: 105 }, t + 0.1, 2.6, 'power2.out'); spinWheels(bk, t + 0.1, 2.6, 0.5);
      cyc(rider.legL, { rotation: -30 }, { rotation: 30 }, 0.3, t, 2.8); cyc(rider.legR, { rotation: 30 }, { rotation: -30 }, 0.3, t, 2.8);
      st(rider.armL, { rotation: -50 }, t); st(rider.armR, { rotation: -50 }, t);
      cyc(stk, { rotation: -3 }, { rotation: 4 }, 0.5, t, 2.7);
      cyc(stk, { rotation: -9 }, { rotation: 10 }, 0.7, t + 2.8, 3.2);
      say(b, t + 3, 3.2);
      mv(unit, { x: 105 }, { x: 105 }, t + 2.7, 0.1); st(unit, { scaleX: -1 }, t + 6.1);
      mv(unit, { x: 105 }, { x: -140 }, t + 6.2, 2.6, 'power2.in'); spinWheels(bk, t + 6.2, 2.6, 0.5);
      cyc(stk, { rotation: -4 }, { rotation: 5 }, 0.4, t + 6.2, 2.6);
    };
  };

  B.squirrel_lamppost = (c) => {
    box(c, { left: 1236, top: 430, width: 6, height: 270, background: '#4a5260', borderRadius: 2 }); box(c, { left: 1222, top: 426, width: 24, height: 5, background: '#4a5260', borderRadius: 3 }); box(c, { left: 1216, top: 430, width: 14, height: 9, background: '#ffe9a0', borderRadius: '2px 2px 7px 7px', border: '1px solid #4a5260' });
    const sq = box(c, { left: 1226, top: 0, width: 26, height: 34 });
    const tail = box(sq, { left: 15, top: 0, width: 11, height: 26, background: '#c96a22', borderRadius: '50% 50% 50% 60%' }); gsap.set(tail, { transformOrigin: '30% 100%' });
    box(sq, { left: 6, top: 10, width: 11, height: 20, background: '#c96a22', borderRadius: '50%' }); box(sq, { left: 9, top: 20, width: 5, height: 8, background: '#f0d9b0', borderRadius: '50%' });
    const hd = box(sq, { left: 3, top: 3, width: 12, height: 11, background: '#c96a22', borderRadius: '50%' }); box(hd, { left: 1, top: -3, width: 3, height: 5, background: '#c96a22', borderRadius: '50% 50% 0 0' }); box(hd, { left: 3, top: 4, width: 2.5, height: 2.5, background: '#111', borderRadius: '50%' });
    const nut = box(sq, { left: -2, top: 12, width: 6, height: 7, background: '#8a5a2a', borderRadius: '50%', opacity: 0 });
    const b = bub(c, 1180, 530, 'NUTS TO YOU TOO', 100);
    return (t, d) => {
      st(sq, { y: 664 }, t); st(nut, { opacity: 0 }, t);
      mv(sq, { y: 664 }, { y: 520 }, t + 0.3, 2.6, 'steps(9)'); cyc(tail, { rotation: -10 }, { rotation: 18 }, 0.4, t, d);
      st(nut, { opacity: 1 }, t + 3.1); cyc(hd, { rotation: -10 }, { rotation: 14 }, 0.12, t + 3.1, 2); cyc(nut, { y: 0 }, { y: -3 }, 0.12, t + 3.1, 2);
      say(b, t + 3.3, 2.4);
      mv(sq, { y: 520 }, { y: 664 }, t + 5.4, 2.2, 'steps(8)');
    };
  };

  B.free_sign_man = (c) => {
    const P = person(c, { x: 1085, y: 695, s: 0.95, shirt: '#e8543a', pants: '#2a3a5a', hair: '#222', skin: '#a8693f' });
    const sign = box(c, { left: 1030, top: 566, width: 110, height: 38, background: '#fffbe6', border: '2px solid #333', borderRadius: 3 }); gsap.set(sign, { transformOrigin: '50% 100%' });
    box(sign, { left: 52, top: 36, width: 4, height: 16, background: '#8a6a3a' });
    const tx = ['FREE HUGS', 'FREE ADVICE', 'FREE TEA<br>(NOT REALLY)'].map((s, k) => box(sign, { left: 0, top: 0, width: 106, height: 34, font: 'bold ' + (k === 2 ? 11 : 15) + 'px Arial Black, Arial', color: ['#d6336c', '#1c7ed6', '#2f9e44'][k], textAlign: 'center', lineHeight: k === 2 ? 13 : 34, paddingTop: k === 2 ? 4 : 0, opacity: 0 }, s));
    const bs = bub(c, 1085, 535, 'HUG?', 44);
    return (t, d) => {
      reset(P, t); st(P.armR, { rotation: -165 }, t); st(P.armL, { rotation: -20 }, t);
      cyc(sign, { rotation: -3 }, { rotation: 3 }, 0.6, t, d); cyc(P.f, { y: 0 }, { y: -1.5 }, 0.5, t, d); cyc(P.armL, { rotation: -20 }, { rotation: -150 }, 0.35, t + 6.1, 2.6);
      tx.forEach((e, k) => { st(e, { opacity: 0 }, t); st(e, { opacity: 1 }, t + 0.3 + k * 2.9); st(e, { opacity: 0 }, t + 0.3 + (k + 1) * 2.9 - 0.05); });
      say(bs, t + 1.2, 1.2);
    };
  };

  B.mobility_scooter = (c) => {
    const sc = box(c, { left: 0, top: 640, width: 96, height: 62 });
    box(sc, { left: 8, top: 40, width: 76, height: 10, background: '#6a6f85', borderRadius: 5 }); box(sc, { left: 14, top: 22, width: 22, height: 20, background: '#c0392b', borderRadius: '7px 7px 3px 3px' }); box(sc, { left: 60, top: 14, width: 4, height: 28, background: '#555' }); box(sc, { left: 52, top: 10, width: 20, height: 4, background: '#333', borderRadius: 2 });
    box(sc, { left: 2, top: 26, width: 14, height: 12, background: '#fff', border: '1.5px solid #333', font: 'bold 6px Arial', color: '#c00', lineHeight: 9, textAlign: 'center' }, '4 MPH');
    const wh = [12, 64].map((x) => { const e = box(sc, { left: x, top: 46, width: 16, height: 16, borderRadius: '50%', background: '#222', border: '3px solid #666' }); box(e, { left: 3, top: -1, width: 2, height: 10, background: '#999' }); return e; });
    const gran = person(sc, { x: 34, y: 44, s: 0.6, shirt: '#8fb8de', pants: '#556', hair: '#eee', skin: '#f1c9a5' });
    const mast = box(sc, { left: 21, top: -22, width: 2, height: 36, background: '#555' });
    const flag = box(sc, { left: 22, top: -22, width: 18, height: 11, background: '#c8102e', clipPath: 'polygon(0 0,100% 50%,0 100%)' }); gsap.set(flag, { transformOrigin: '0 50%' });
    const sp = [0, 1, 2].map((k) => box(c, { left: 1180, top: 668 + k * 9, width: 40, height: 2, background: 'rgba(60,60,70,.45)', borderRadius: 2, opacity: 0 }));
    const b = bub(c, 1080, 610, 'BEEP BEEP, COMING THROUGH', 150);
    return (t, d) => {
      reset(gran, t); st(sc, { x: 1320 }, t); st(gran.armR, { rotation: -70 }, t); st(gran.armL, { rotation: -70 }, t);
      mv(sc, { x: 1320 }, { x: 1060 }, t + 0.2, 1.6, 'power3.out'); wh.forEach((e) => mv(e, { rotation: 0 }, { rotation: -900 }, t + 0.2, 1.6, 'power3.out'));
      cyc(flag, { skewY: -10, scaleX: 1 }, { skewY: 12, scaleX: 0.75 }, 0.12, t, d); cyc(gran.head, { rotation: -4 }, { rotation: 4 }, 0.4, t + 1.8, 3);
      sp.forEach((s2, k) => cyc(s2, { opacity: 0, x: 30 }, { opacity: 0.8, x: -30 }, 0.2 + k * 0.05, t + 0.2, 1.5, 'power1.in'));
      say(b, t + 2.0, 2.8);
      mv(sc, { x: 1060 }, { x: 1340 }, t + 5, 1.8, 'power2.in'); wh.forEach((e) => mv(e, { rotation: 0 }, { rotation: 900 }, t + 5, 1.8, 'power2.in'));
    };
  };

  B.sorry_dance = (c) => {
    const a = person(c, { x: 160, y: 696, s: 0.8, shirt: '#3b7ddd', hair: '#222' }), b = person(c, { x: 232, y: 696, s: 0.8, flip: true, shirt: '#e0457b', hair: '#c9a24a', skin: '#d9a074' });
    const t1 = bub(c, 165, 598, 'SORRY!', 56), t2 = bub(c, 220, 598, 'NO, SORRY!', 70), t3 = bub(c, 198, 576, 'AFTER YOU...', 78);
    return (t, d) => {
      reset(a, t); reset(b, t); st(a.armR, { rotation: -20 }, t);
      cyc(a.r, { x: -8 }, { x: 8 }, 0.5, t, 5.4, 'power1.inOut'); cyc(b.r, { x: -8 }, { x: 8 }, 0.5, t, 5.4, 'power1.inOut');
      cyc(a.f, { y: 0 }, { y: -2 }, 0.25, t, 5.4); cyc(b.f, { y: 0 }, { y: -2 }, 0.25, t, 5.4); st([a.r, b.r], { x: 0 }, t + 5.5);
      cyc(a.armR, { rotation: -20 }, { rotation: -100 }, 0.3, t + 5.5, 1.5); cyc(b.armR, { rotation: -20 }, { rotation: -100 }, 0.3, t + 5.6, 1.4);
      say(t1, t + 0.5, 1.7); say(t2, t + 2.2, 1.9); say(t3, t + 4.6, 2.3);
    };
  };

  B.cloud_follows = (c) => {
    const P = person(c, { x: 1250, y: 696, s: 0.9, flip: true, shirt: '#e8c840', pants: '#334', hair: '#222', skin: '#d9b390' });
    const cl = box(c, { left: 0, top: 560, width: 64, height: 34 });
    [[0, 12, 32, 22], [18, 0, 32, 28], [34, 10, 30, 22]].forEach((q) => box(cl, { left: q[0], top: q[1], width: q[2], height: q[3], borderRadius: '50%', background: '#8d98a8' }));
    box(cl, { left: 8, top: 18, width: 48, height: 14, borderRadius: '50%', background: '#7b8696' });
    const drops = [0, 1, 2, 3].map((k) => box(cl, { left: 12 + k * 13, top: 34, width: 2, height: 8, background: '#5b9bd5', borderRadius: 1 }));
    const sun = box(c, { left: 1196, top: 520, width: 26, height: 26, borderRadius: '50%', background: '#ffd43b', boxShadow: '0 0 12px 4px rgba(255,212,59,.7)' });
    const b = bub(c, 1200, 566, 'EVERY. SINGLE. DAY.', 110);
    return (t, d) => {
      reset(P, t); mv(P.r, { x: 0 }, { x: -90 }, t + 0.2, 7, 'sine.inOut'); walk(P, t + 0.2, 7, 0.4, 28);
      mv(cl, { x: 1218 }, { x: 1128 }, t + 0.2, 7, 'sine.inOut'); cyc(cl, { y: 0 }, { y: -4 }, 0.9, t, d);
      cyc(sun, { scale: 1 }, { scale: 1.12 }, 1.2, t, d);
      drops.forEach((dr, k) => tl.fromTo(dr, { y: 0, opacity: 1 }, { y: 80, opacity: 0.2, duration: 0.5, ease: 'none', repeat: Math.floor(d / 0.5) - 1, immediateRender: false }, t + k * 0.12));
      say(b, t + 2.5, 3.4);
    };
  };

  B.window_cleaner = (c) => {
    const win = box(c, { left: 60, top: 112, width: 124, height: 104, background: 'linear-gradient(135deg,#bfe3f2,#e6f5fb)', border: '4px solid #7c5f4a' });
    box(win, { left: 58, top: 0, width: 3, height: 96, background: '#7c5f4a' });
    const dirt = box(win, { left: 0, top: 0, width: 116, height: 96, background: 'rgba(120,108,84,.5)' }); gsap.set(dirt, { transformOrigin: '0 50%' });
    line(c, 70, 40, 70, 222, 1.5, '#555'); line(c, 176, 40, 176, 222, 1.5, '#555');
    const plat = box(c, { left: 56, top: 222, width: 130, height: 6, background: '#555' }); box(c, { left: 56, top: 206, width: 3, height: 16, background: '#777' }); box(c, { left: 183, top: 206, width: 3, height: 16, background: '#777' });
    const bucket = box(c, { left: 158, top: 212, width: 14, height: 11, background: '#3b7ddd', borderRadius: '2px 2px 5px 5px' });
    const P = person(c, { x: 110, y: 222, s: 0.8, shirt: '#ffd43b', pants: '#2a4a8a', hair: '#e8a33a' });
    const sq = box(P.armR, { left: -6, top: 28, width: 24, height: 4, background: '#444', borderRadius: 2 });
    const star = box(c, { left: 170, top: 118, width: 14, height: 14, opacity: 0 }); star.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 0 L8.3 5.7 L14 7 L8.3 8.3 L7 14 L5.7 8.3 L0 7 L5.7 5.7Z" fill="#fff"/></svg>';
    const b = bub(c, 120, 78, 'STREAK-FREE (NEARLY)', 130);
    return (t, d) => {
      reset(P, t); st(P.armR, { rotation: -130 }, t); st(P.armL, { rotation: -10 }, t); st(dirt, { scaleX: 1 }, t);
      cyc(P.armR, { rotation: -115 }, { rotation: -155 }, 0.45, t, 5.6); cyc(P.r, { x: -14 }, { x: 14 }, 0.45, t, 5.6, 'sine.inOut');
      mv(dirt, { scaleX: 1 }, { scaleX: 0 }, t + 0.4, 5.4, 'steps(8)');
      cyc(plat, { y: 0 }, { y: -2 }, 1.3, t, d); cyc(bucket, { y: 0 }, { y: -2 }, 1.3, t, d);
      tl.fromTo(star, { opacity: 0, scale: 0.2, rotation: 0 }, { opacity: 1, scale: 1.4, rotation: 90, duration: 0.5, yoyo: true, repeat: 1, immediateRender: false }, t + 5.9);
      cyc(P.armR, { rotation: -150 }, { rotation: -175 }, 0.3, t + 6.1, 1.8); say(b, t + 5.6, 2.4);
    };
  };

  B.duster_window = (c) => {
    const win = box(c, { left: 70, top: 138, width: 84, height: 86, background: 'linear-gradient(#1c2a44,#3a4d70)', border: '4px solid #f2ede0', borderRadius: '3px' });
    box(win, { left: 0, top: 0, width: 18, height: 78, background: '#c0392b', borderRadius: '0 0 6px 2px' }); box(win, { left: 58, top: 0, width: 18, height: 78, background: '#c0392b', borderRadius: '0 0 2px 6px' });
    box(c, { left: 62, top: 222, width: 100, height: 6, background: '#8d7a68' }); box(c, { left: 68, top: 210, width: 14, height: 12, background: '#b5532e', borderRadius: '2px 2px 5px 5px' }); box(c, { left: 71, top: 196, width: 8, height: 14, background: '#3a9a4a', borderRadius: '50% 50% 0 0' });
    const gr = box(c, { left: 100, top: 156, width: 44, height: 70 });
    box(gr, { left: 6, top: 30, width: 32, height: 40, background: '#d6529a', borderRadius: '10px 10px 0 0' }); const hd = box(gr, { left: 11, top: 6, width: 22, height: 24, background: '#f1c9a5', borderRadius: '50%' });
    box(hd, { left: -2, top: -5, width: 26, height: 14, background: '#eee', borderRadius: '13px 13px 6px 6px' }); box(hd, { left: 6, top: 12, width: 3, height: 3, background: '#222', borderRadius: '50%' }); box(hd, { left: 14, top: 12, width: 3, height: 3, background: '#222', borderRadius: '50%' }); box(hd, { left: 5, top: 7, width: 7, height: 7, border: '1.5px solid #444', borderRadius: '50%' }); box(hd, { left: 13, top: 7, width: 7, height: 7, border: '1.5px solid #444', borderRadius: '50%' });
    const arm = box(c, { left: 112, top: 190, width: 8, height: 40, background: '#d6529a', borderRadius: 4 }); gsap.set(arm, { transformOrigin: '50% 10%' });
    const duster = box(arm, { left: -9, top: 32, width: 26, height: 22, background: 'radial-gradient(circle at 50% 30%,#f7d44a,#e08a1e)', borderRadius: '50% 50% 40% 40%' });
    const puffs = [0, 1, 2, 3, 4].map((k) => box(c, { left: 60, top: 220, width: 12 + k * 3, height: 12 + k * 3, borderRadius: '50%', background: 'rgba(190,185,170,.75)', opacity: 0 }));
    const b = bub(c, 114, 112, 'SPRING CLEAN!', 90);
    return (t, d) => {
      st(arm, { rotation: 70 }, t);
      cyc(arm, { rotation: 38 }, { rotation: 100 }, 0.14, t + 0.6, 4.6); cyc(gr, { y: 0 }, { y: -1.5 }, 0.3, t, d);
      puffs.forEach((p, k) => { const per = 1.5; tl.fromTo(p, { x: -4 * k, y: 0, scale: 0.4, opacity: 0.8 }, { x: -50 - k * 12, y: 20 + k * 9, scale: 1.7, opacity: 0, duration: per, ease: 'power1.out', repeat: Math.max(0, Math.floor((4.8 - k * 0.25) / per) - 1), immediateRender: false }, t + 0.7 + k * 0.25); });
      say(b, t + 1.2, 3.2);
    };
  };

  B.drone_parcel = (c) => {
    const win = box(c, { left: 1190, top: 160, width: 62, height: 72, background: 'linear-gradient(#27406b,#46618d)', border: '4px solid #f2ede0', borderRadius: 3 });
    const hd = box(win, { left: 17, top: 24, width: 22, height: 24, background: '#c68e63', borderRadius: '50%' }); box(hd, { left: -1, top: -4, width: 24, height: 13, background: '#222', borderRadius: '12px 12px 5px 5px' }); box(hd, { left: 6, top: 11, width: 3, height: 3, background: '#222', borderRadius: '50%' }); box(hd, { left: 13, top: 11, width: 3, height: 3, background: '#222', borderRadius: '50%' });
    box(win, { left: 12, top: 46, width: 34, height: 24, background: '#e0457b', borderRadius: '10px 10px 0 0' });
    const wv = box(win, { left: 40, top: 40, width: 7, height: 24, background: '#c68e63', borderRadius: 4 }); gsap.set(wv, { transformOrigin: '50% 90%' });
    box(c, { left: 1184, top: 230, width: 74, height: 6, background: '#8d7a68' });
    const dr = box(c, { left: 0, top: 0, width: 50, height: 30 }); box(dr, { left: 14, top: 8, width: 22, height: 10, background: '#444', borderRadius: 5 }); box(dr, { left: 22, top: 18, width: 6, height: 4, background: '#e33', borderRadius: 2 });
    const rot = [0, 36].map((x) => { line(dr, x + 4, 8, x + 13, 8 + 2, 2, '#444'); const r = box(dr, { left: x - 2, top: 3, width: 20, height: 4, borderRadius: '50%', background: 'rgba(60,60,60,.55)' }); return r; });
    const str = box(dr, { left: 24.5, top: 18, width: 1.5, height: 14, background: '#333' });
    const pk = box(dr, { left: 14, top: 32, width: 22, height: 17, background: '#c89a5e', border: '1px solid #7a5a2a' }); box(pk, { left: 9, top: 0, width: 3, height: 17, background: 'rgba(255,255,255,.55)' });
    const b = bub(c, 1160, 118, 'THANKS, DRONE!', 90);
    return (t, d) => {
      st(wv, { rotation: 0 }, t); st(pk, { y: 0, x: 0, opacity: 1 }, t); st(str, { height: 14 }, t);
      rot.forEach((r) => cyc(r, { scaleX: 1 }, { scaleX: 0.55 }, 0.05, t, d, 'none'));
      mv(dr, { x: 1330, y: 40 }, { x: 1130, y: 120 }, t + 0.2, 2.0, 'power2.out'); cyc(dr, { rotation: -4 }, { rotation: 4 }, 0.6, t + 0.2, 2);
      mv(dr, { x: 1130, y: 120 }, { x: 1130, y: 150 }, t + 2.2, 1.6, 'sine.inOut');
      mv(pk, { y: 0, x: 0 }, { y: 30, x: 0 }, t + 2.2, 1.6, 'sine.inOut'); mv(str, { height: 14 }, { height: 44 }, t + 2.2, 1.6, 'sine.inOut');
      mv(pk, { x: 0, y: 30 }, { x: 62, y: 30 }, t + 3.8, 0.5, 'power1.inOut'); st(pk, { opacity: 0 }, t + 4.3);
      cyc(wv, { rotation: -25 }, { rotation: 30 }, 0.25, t + 3.8, 3.6);
      mv(dr, { x: 1130, y: 150 }, { x: 1340, y: 20 }, t + 4.2, 2.0, 'power2.in'); st(str, { height: 14 }, t + 4.1);
      say(b, t + 4.4, 3.2);
    };
  };

  B.paper_plane_kid = (c) => {
    const win = box(c, { left: 1190, top: 120, width: 62, height: 72, background: 'linear-gradient(#27406b,#46618d)', border: '4px solid #f2ede0', borderRadius: 3 });
    const hd = box(win, { left: 16, top: 22, width: 22, height: 24, background: '#e8b98f', borderRadius: '50%' }); box(hd, { left: -1, top: -4, width: 24, height: 13, background: '#7a4a1a', borderRadius: '12px 12px 5px 5px' }); box(hd, { left: 5, top: 11, width: 3, height: 3, background: '#222', borderRadius: '50%' }); box(hd, { left: 13, top: 11, width: 3, height: 3, background: '#222', borderRadius: '50%' }); box(hd, { left: 6, top: 16, width: 9, height: 3, borderBottom: '1.5px solid #8a4a3a', borderRadius: '0 0 8px 8px' });
    box(win, { left: 12, top: 46, width: 34, height: 24, background: '#32a852', borderRadius: '10px 10px 0 0' });
    box(c, { left: 1184, top: 190, width: 74, height: 6, background: '#8d7a68' });
    const pl = box(c, { left: 1186, top: 150, width: 24, height: 14 }); gsap.set(pl, { transformOrigin: '50% 50%' });
    pl.innerHTML = '<svg width="24" height="14" viewBox="0 0 24 14"><path d="M0 7 L24 0 L16 14Z" fill="#fff" stroke="#8a9bb0" stroke-width=".8"/><path d="M0 7 L16 8 L24 0Z" fill="#dde6f0"/></svg>';
    const b = bub(c, 1150, 100, 'LOOK, IT COMES BACK!', 120);
    return (t, d) => {
      const per = 1.1, n = Math.max(0, Math.floor((d - 1.0) / per) - 1);
      tl.fromTo(pl, { x: 0, opacity: 1 }, { x: -112, duration: per, ease: 'sine.inOut', repeat: n, yoyo: true, immediateRender: false }, t + 0.8);
      tl.fromTo(pl, { y: 0 }, { y: 30, duration: per / 2, ease: 'sine.inOut', repeat: 2 * n + 1, yoyo: true, immediateRender: false }, t + 0.8);
      tl.fromTo(pl, { rotation: -20, scaleX: 1 }, { rotation: 25, scaleX: -1, duration: per, ease: 'sine.inOut', repeat: n, yoyo: true, immediateRender: false }, t + 0.8);
      cyc(hd, { rotation: -8 }, { rotation: 8 }, 0.5, t, d); say(b, t + 1.4, 3.6);
    };
  };

  // ---------- build + schedule ----------
  window.ukGags = function (w, o) {
    o = o || {}; const T = o.T || 0, D = o.D || LOOP;
    const layer = box(w, { left: 0, top: 0, width: W, height: H, overflow: 'hidden', pointerEvents: 'none' });
    DEF.forEach(([name, d, ts]) => {
      const c = box(layer, { left: 0, top: 0, width: W, height: H, opacity: 0 });
      const play = B[name](c);
      for (let k = 0; T + k * LOOP < T + D; k++) {
        ts.forEach((t0) => { const t = T + k * LOOP + t0; if (t < T + D - 0.5) { show(c, t, d); play(t, d); } });
      }
    });
    return { layer };
  };
  window.ukGags.list = LIST;
})();
