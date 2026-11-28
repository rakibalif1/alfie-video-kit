// ===== bg_gags.js v2 : recurring background GAGS on the SHARED GROUND PLANE (family friendly, brand-free) =====
// ukGags(w,{T,D}) -> {layer}. 21 gags on a 120 s loop (repeated until D). ukGags.list = [{name,t0,t1}] (first loop).
// SCALE RULES (see out/SCALE_NOTES.md): every PERSON is a real illus() rig (same art as the pedestrians, outfits from window.PED_SETS) sized by scaleAt(feet y)
// (needs perspective.js loaded first; bg_street.js loaded first gives PED_SETS). Animals and props are sized from the same person height HP(y)=326*scaleAt(y):
// dog = 30% (knee height), cat 19%, gull 20%, pigeon 15%, squirrel 17%, bike wheel 38%, bus 1.1 x lane person height.
// People are drawn by a small ACTOR POOL (gags never overlap in time, so rigs are re-used) to keep the DOM small. Animation = tl.fromTo/tl.set only, finite repeats, no Math.random.
(function () {
  const LOOP = 120;
  const DEF = [];   // [name, duration, [start times]] filled from the two street lanes below
  const LANE_L = [['seagull_chips', 7], ['window_cleaner', 7], ['map_in_wind', 6], ['queue_starts_here', 8], ['paper_plane_kid', 8], ['tall_parcel_rider', 8], ['dog_walks_owner', 7], ['bubbles_child', 7], ['window_cleaner', 7], ['squirrel_lamppost', 7], ['paper_plane_kid', 8], ['cat_watches_pigeon', 7]];
  const LANE_R = [['hat_chase', 6], ['duster_window', 6.5], ['umbrella_and_shorts', 7], ['drone_parcel', 7.5], ['bell_at_slow_crossing', 7], ['hair_in_window', 6], ['free_sign_man', 7], ['duster_window', 6.5], ['mobility_scooter', 6], ['cloud_follows', 7], ['drone_parcel', 7.5], ['sorry_dance', 6], ['pigeon_bus_ride', 8]];
  (function plan() {   // one gag per side at a time (left lane: x<260 + facade top-left, right lane: x>1020 + facade top-right)
    const put = (lane, t, gap) => lane.forEach(([n, d]) => { let e = DEF.find((q) => q[0] === n && q[1] === d); if (!e) { e = [n, d, []]; DEF.push(e); } e[2].push(+t.toFixed(2)); t += d + gap; });
    put(LANE_L, 1.0, 2.75); put(LANE_R, 3.5, 2.2);
  })();
  const LIST = [];
  DEF.forEach(([n, d, ts]) => ts.forEach((t) => LIST.push({ name: n, t0: t, t1: t + d })));
  LIST.sort((a, b) => a.t0 - b.t0);

  // ---------- ground plane helpers ----------
  const u = (y) => (window.scaleAt ? window.scaleAt(y) : Math.max(0.3, 1 + (y - 700) * 0.0025));
  const zf = (y) => Math.round(y * 10);
  const HP = (y) => 326 * u(y);                    // average adult height in px at feet y
  const Y0 = 655;                                  // pavement line used by most gags (scaleAt 0.89, adult 289 px)

  // ---------- small animation helpers ----------
  const cyc = (el, a, b, per, t, d, ease) => tl.fromTo(el, a, Object.assign({}, b, { duration: per, repeat: Math.max(0, Math.floor(d / per) - 1), yoyo: true, ease: ease || 'sine.inOut', immediateRender: false }), t);
  const mv = (el, a, b, t, dur, ease) => tl.fromTo(el, a, Object.assign({}, b, { duration: dur, ease: ease || 'none', immediateRender: false }), t);
  const st = (el, props, t) => tl.set(el, props, t);
  const fade = (c, t, d) => { tl.fromTo(c, { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, t); tl.fromTo(c, { opacity: 1 }, { opacity: 0, duration: 0.3, immediateRender: false }, t + d - 0.3); };
  const G = (p, x, y, m, z) => { const g = box(p, { left: 0, top: 0, width: 1, height: 1, zIndex: z || 0 }); gsap.set(g, { x, y, scale: m, transformOrigin: '0px 0px' }); return g; };
  function line(p, x1, y1, x2, y2, th, col) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
    const e = box(p, { left: x1, top: y1 - th / 2, width: L, height: th, background: col || '#333', borderRadius: th / 2 });
    gsap.set(e, { transformOrigin: '0 50%', rotation: Math.atan2(dy, dx) * 180 / Math.PI }); return e;
  }
  let AL, FL, BL;   // actor layer, front layer, bubble layer (set in ukGags)

  // speech bubble: 22 px bold text, '|' = line break. x = point the tail aims at, y = top edge. Clamped inside the frame.
  function bub(x, y, txt, o) {
    const ln = txt.split('|'), ml = Math.max.apply(null, ln.map((s) => s.length)), wd = Math.round(ml * 14.4 + 28), ht = ln.length * 26 + 12;
    const left = Math.max(8, Math.min(W - 8 - wd, x - wd / 2)), tx = Math.max(20, Math.min(wd - 20, x - left));
    const b = box(BL, { left, top: y, width: wd, height: ht, background: '#fff', border: '3px solid #2b2b3a', borderRadius: 14, font: 'bold 22px Arial', color: '#222', textAlign: 'center', lineHeight: 26, paddingTop: 3, opacity: 0, zIndex: 5, whiteSpace: 'nowrap' }, ln.join('<br>'));
    box(b, { left: tx - 7, top: ht - 9, width: 14, height: 14, background: '#fff', borderRight: '3px solid #2b2b3a', borderBottom: '3px solid #2b2b3a', transform: 'rotate(45deg)' });
    gsap.set(b, { transformOrigin: tx + 'px ' + (ht + 8) + 'px' }); return b;
  }
  const say = (b, t, d) => { tl.fromTo(b, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.18, ease: 'back.out(2)', immediateRender: false }, t); tl.fromTo(b, { opacity: 1 }, { opacity: 0, duration: 0.18, immediateRender: false }, t + d - 0.18); };

  // ---------- actor pool: real illus() rigs, re-used by gags that never overlap in time ----------
  const POOL = [], MAXPOOL = 10;
  const SETS = () => window.PED_SETS || [ICAST.emma, ICAST.tom, ICAST.priya, ICAST.rahim, ICAST.kofi, ICAST.ada, ICAST.amina];
  const free = (a, iv) => iv.every(([s, e]) => a.busy.every(([s2, e2]) => e <= s2 || s >= e2));
  function mkActor(idx) {
    const S = SETS(), set = S[idx % S.length];
    const wrap = box(AL, { left: 0, top: 0, width: 1, height: 1, opacity: 0 });
    const cs = window.contactShadow ? window.contactShadow(wrap, 0, 0, 1) : box(wrap, { left: -46, top: -4, width: 92, height: 14, borderRadius: '50%', background: 'rgba(22,18,34,.3)' });
    const api = illus(wrap, Object.assign({ x: 0, y: 0, s: 1 }, set));
    if (window.dropRigShadow) window.dropRigShadow(api);
    api.g.style.filter = 'drop-shadow(0 0 2px rgba(255,255,255,.9))';
    gsap.set(wrap, { transformOrigin: '0px 0px' });
    const legs = [api.g.querySelector('[id$="_l1"]'), api.g.querySelector('[id$="_l2"]')].filter(Boolean);
    return { api, P: api.P, wrap, cs, legs, busy: [], set: idx, skin: set.skin, mouth: api.face.mouth };
  }
  function take(info, prefs, sh) {   // pick (or create) an actor that is free during every play of this gag
    const iv = info.ts.map((t) => [t - 0.8, t + info.d + 0.8]);
    let a = null;
    for (const p of prefs) { a = POOL.find((q) => q.set === p && free(q, iv)); if (a) break; }
    if (!a && POOL.length < MAXPOOL) { a = mkActor(prefs[0]); POOL.push(a); }
    if (!a) a = POOL.find((q) => free(q, iv));
    if (!a) { a = mkActor(prefs[0]); POOL.push(a); }
    a.busy.push.apply(a.busy, iv); if (sh) a.sh = true; return a;
  }
  // put the actor on the ground at (x, feet y) for [t, t+d]: size from the ground plane (hs = height factor), optional clip (local polygon), no-shadow for riders/windows
  function enter(a, t, d, o) {
    const y = o.y, sc = u(o.sy === undefined ? y : o.sy) * (o.hs || 1); a.sc = sc; a.X = o.x; a.Y = y; a.flip = !!o.flip;
    const fx = o.flip ? -1 : 1;
    tl.set(a.wrap, { x: o.x, y, scaleX: sc * fx, scaleY: sc, zIndex: o.z === undefined ? zf(y) : o.z, opacity: 0, clipPath: o.clip || 'none', filter: o.filter || 'none' }, t - 0.03);
    if (a.sh) tl.set(a.cs, { opacity: o.noShadow ? 0 : 1 }, t - 0.03);   // only actors used by riders/scooter ever hide their shadow
    fade(a.wrap, t, d);
    settle(a, t - 0.03);
  }
  function settle(a, t) {
    const P = a.P;
    tl.set([P.t, P.h, P.af, P.ab, P.abw, P.afw, P.abf, P.aff, P.dr0, P.dr1].concat(a.legs), { rotation: 0, x: 0, y: 0, scaleY: 1 }, t);
  }
  // cheap expression change: mouth shape only (1 tween instead of the rig's 4)
  const FACE = () => ({ happy: IMOUTH.grin, normal: IMOUTH.smile, angry: IMOUTH.frown, sad: IMOUTH.frown, surprised: IMOUTH.o });
  const emo = (a, name, t) => tl.set(a.mouth, { attr: { d: FACE()[name] || IMOUTH.smile } }, t);
  // props that live inside the rig (hands, legs): created hidden, switched on per play
  function attach(a, parent, html) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.innerHTML = html; parent.appendChild(g); gsap.set(g, { opacity: 0 }); return g;
  }
  const vis = (g, t, d) => { tl.set(g, { opacity: 1 }, t); tl.set(g, { opacity: 0 }, t + d); };
  // rig coords <-> screen (feet at wrap origin, rig point (80,326) = feet)
  const toScr = (a, rx, ry) => [a.X + (rx - 80) * a.sc * (a.flip ? -1 : 1), a.Y + (ry - 326) * a.sc];

  // 2-link arm IK in rig units. Upper arm 50, forearm+hand 55. Returns [shoulder, elbow] rotations of the FRONT arm (shoulder x=112).
  function ik(sx, tx, ty) {
    const L1 = 50, L2 = 55, dx = tx - sx, dy = ty - 86, dl = Math.max(1, Math.hypot(dx, dy)), d = Math.min(L1 + L2 - 0.5, Math.max(8, dl));
    const Tx = sx + dx * d / dl, Ty = 86 + dy * d / dl, base = Math.atan2(-dx, dy);
    const A = Math.acos(Math.max(-1, Math.min(1, (L1 * L1 + d * d - L2 * L2) / (2 * L1 * d)))); let best = null;
    [A, -A].forEach((a) => {
      const th1 = base + a, ex = sx - L1 * Math.sin(th1), ey = 86 + L1 * Math.cos(th1); let el = Math.atan2(-(Tx - ex), Ty - ey) - th1;
      while (el > Math.PI) el -= 2 * Math.PI; while (el < -Math.PI) el += 2 * Math.PI;
      let s1 = th1; while (s1 > Math.PI) s1 -= 2 * Math.PI; while (s1 < -Math.PI) s1 += 2 * Math.PI;
      const sc = ey + 0.15 * ex; if (!best || sc > best.sc) best = { sc, sh: s1 * 180 / Math.PI, el: el * 180 / Math.PI };
    });
    return [best.sh, best.el];
  }
  // reach the target (rig coords) with the front arm (o.f) and/or the back arm (o.b). o.up = tilt in degrees: wrist counter-rotates so a held prop stays that far from upright
  function pose(a, t, dur, o) {
    const P = a.P, ease = o.ease || 'sine.inOut';
    if (o.f) { const [sh, el] = ik(112, o.f[0], o.f[1]); tl.to(P.af, { rotation: sh, duration: dur, ease }, t); tl.to(P.aff, { rotation: el, duration: dur, ease }, t); if (o.up !== undefined) tl.to(P.afw, { rotation: -(sh + el) + o.up, duration: dur, ease }, t); }
    if (o.b) { const [sh, el] = ik(112, 160 - o.b[0], o.b[1]); tl.to(P.ab, { rotation: -sh, duration: dur, ease }, t); tl.to(P.abf, { rotation: -el, duration: dur, ease }, t); }
  }
  // arm swings between two targets (yoyo) for d seconds
  function swing(a, side, A, B, per, t, d, up) {
    const sx = 112, s = side === 'f' ? 1 : -1, ax = side === 'f' ? A[0] : 160 - A[0], bx = side === 'f' ? B[0] : 160 - B[0];
    const [s1, e1] = ik(sx, ax, A[1]), [s2, e2] = ik(sx, bx, B[1]), U = side === 'f' ? a.P.af : a.P.ab, F = side === 'f' ? a.P.aff : a.P.abf;
    const o = (v) => ({ rotation: s * v });
    cyc(U, o(s1), o(s2), per, t, d); cyc(F, o(e1), o(e2), per, t, d);
    if (up !== undefined && side === 'f') cyc(a.P.afw, { rotation: -(s1 + e1) + up }, { rotation: -(s2 + e2) + up }, per, t, d);
  }
  // own walk cycle (so the rig's leg/arm values can be reset exactly when it ends). returns the real duration
  function walk(a, t, D, p, o) {
    o = o || {}; const n = Math.max(1, Math.floor(D / p)), P = a.P, la = o.leg === undefined ? 20 : o.leg, am = o.arm === undefined ? 16 : o.arm, lean = o.lean || 0, L = a.legs, dur = p * (n + 1);
    const lp = (el, f, g, per, k) => tl.fromTo(el, f, Object.assign({ duration: per, repeat: k, yoyo: true, ease: 'sine.inOut', immediateRender: false }, g), t);
    lp(L[0], { rotation: la }, { rotation: -la }, p, n); lp(L[1], { rotation: -la }, { rotation: la }, p, n);
    if (am) { lp(P.af, { rotation: -am }, { rotation: am }, p, n); lp(P.ab, { rotation: am }, { rotation: -am }, p, n); }
    lp(P.t, { y: 0, rotation: lean - 1.2 }, { y: -4 * a.sc, rotation: lean + 1.2 }, p / 2, n * 2 + 1);
    tl.set([L[0], L[1], P.t], { rotation: 0, y: 0 }, t + dur); if (am) { tl.set(P.af, { rotation: -3 }, t + dur); tl.set(P.ab, { rotation: 3 }, t + dur); }
    return dur;
  }

  // ---------- animals and props (art drawn on a small grid, scaled by G() from the person height) ----------
  function gullEl(p) {
    const c = box(p, { left: -23, top: -14, width: 46, height: 28 }); const i = box(c, { left: 0, top: 0, width: 46, height: 28 });
    i.innerHTML = '<svg width="46" height="28" viewBox="0 0 46 28"><path d="M5 15 L0 12 L0 18Z" fill="#f4f4f4"/><path d="M5 15 Q12 10 24 11 Q34 10 38 14 Q34 20 24 20 Q12 21 5 15Z" fill="#fbfbfb" stroke="#c4cad0" stroke-width=".6"/><path d="M9 13 Q20 9 31 11 Q22 14 9 13Z" fill="#a9b4bf"/><circle cx="37" cy="12.5" r="4.2" fill="#fff"/><path d="M40.5 12 L46 13.2 L40.5 14.6Z" fill="#f2c230"/><circle cx="43.4" cy="14" r=".8" fill="#d33"/><circle cx="38.6" cy="11.8" r=".9" fill="#222"/><path d="M22 20 L21 25 M26 20 L26.6 25" stroke="#e58aa0" stroke-width="1.1"/></svg>';
    const wing = box(i, { left: 12, top: 2, width: 28, height: 16 });
    wing.innerHTML = '<svg width="28" height="16" viewBox="0 0 28 16"><path d="M2 14 Q10 2 26 1 L27 4 Q17 8 12 15Z" fill="#9aa7b4" stroke="#7b8896" stroke-width=".4"/><path d="M20 1.6 L27 1 L27 4 Q23 3.4 20 1.6Z" fill="#161616"/></svg>';
    gsap.set(wing, { transformOrigin: '8% 90%' }); return { c, i, wing };
  }
  function pigEl(p) {   // bottom-centre origin
    const c = box(p, { left: -18, top: -26, width: 36, height: 26 }); const i = box(c, { left: 0, top: 0, width: 36, height: 26 });
    i.innerHTML = '<svg width="36" height="26" viewBox="0 0 36 26"><path d="M6 12 L0 15 L6 17Z" fill="#5d6573"/><ellipse cx="16" cy="14" rx="11" ry="7" fill="#8e9aab"/><ellipse cx="22" cy="15" rx="6" ry="5" fill="#a9b4c4"/><path d="M13 20 L13 25 M18 20 L18 25" stroke="#d77f8f" stroke-width="1.3"/></svg>';
    const wing = box(i, { left: 7, top: 7, width: 20, height: 12 });
    wing.innerHTML = '<svg width="20" height="12" viewBox="0 0 20 12"><path d="M1 6 Q10 0 19 3 Q17 9 8 11Z" fill="#7d899c"/><path d="M6 3.5 L8 9 M10 2.5 L12 8" stroke="#1d2230" stroke-width="1.6"/></svg>';
    const hd = box(i, { left: 22, top: 2, width: 14, height: 14 });
    hd.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14"><circle cx="6" cy="6" r="4.2" fill="#69727f"/><ellipse cx="4.6" cy="9.2" rx="3.6" ry="2.8" fill="#4f9a7d" opacity=".75"/><circle cx="7.6" cy="5.2" r="1.1" fill="#e8832a"/><circle cx="7.8" cy="5.2" r=".5" fill="#111"/><path d="M9.8 6 L13.5 7.2 L9.8 8Z" fill="#d9d0c0"/></svg>';
    gsap.set(wing, { transformOrigin: '12% 70%' }); gsap.set(hd, { transformOrigin: '30% 90%' }); return { c, i, wing, hd };
  }
  function catEl(p, col) {   // bottom-centre origin
    col = col || '#d98c3f';
    const c = box(p, { left: -23, top: -36, width: 46, height: 36 });
    const tail = box(c, { left: 1, top: 14, width: 7, height: 22, borderRadius: 6, background: col }); gsap.set(tail, { transformOrigin: '50% 95%' });
    box(c, { left: 8, top: 14, width: 26, height: 22, borderRadius: '60% 60% 40% 40%', background: col });
    box(c, { left: 14, top: 18, width: 2, height: 10, background: 'rgba(120,60,10,.5)' }); box(c, { left: 20, top: 17, width: 2, height: 11, background: 'rgba(120,60,10,.5)' });
    const head = box(c, { left: 22, top: 3, width: 20, height: 17, borderRadius: '50%', background: col }); gsap.set(head, { transformOrigin: '40% 90%' });
    box(head, { left: 1, top: -5, width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderBottom: '8px solid ' + col });
    box(head, { left: 12, top: -5, width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderBottom: '8px solid ' + col });
    const e1 = box(head, { left: 5, top: 6, width: 4, height: 4, background: '#cde96a', borderRadius: '50%', border: '1px solid #222' });
    box(head, { left: 12, top: 6, width: 4, height: 4, background: '#cde96a', borderRadius: '50%', border: '1px solid #222' });
    box(head, { left: 9, top: 11, width: 3, height: 2, background: '#e58aa0', borderRadius: '50%' });
    return { c, tail, head, e1 };
  }
  function dogEl(p) {   // bottom-centre origin, faces right, 64 x 40
    const c = box(p, { left: -32, top: -40, width: 64, height: 40 });
    const legs = [12, 19, 36, 43].map((x) => { const l = box(c, { left: x, top: 24, width: 5, height: 15, borderRadius: 3, background: '#9c6230' }); gsap.set(l, { transformOrigin: '50% 10%' }); return l; });
    box(c, { left: 8, top: 10, width: 40, height: 18, borderRadius: '9px 12px 8px 8px', background: '#b9793c' });
    const tail = box(c, { left: 2, top: 6, width: 5, height: 15, borderRadius: 3, background: '#b9793c' }); gsap.set(tail, { transformOrigin: '50% 100%', rotation: 30 });
    const head = box(c, { left: 42, top: 2, width: 20, height: 17, borderRadius: '8px 10px 6px 8px', background: '#b9793c' }); gsap.set(head, { transformOrigin: '20% 90%' });
    box(head, { left: 13, top: 8, width: 9, height: 7, borderRadius: 4, background: '#8a5528' }); box(head, { left: 19, top: 8, width: 3, height: 3, borderRadius: '50%', background: '#111' });
    box(head, { left: 8, top: 4, width: 3, height: 3, borderRadius: '50%', background: '#111' }); box(head, { left: 2, top: -2, width: 6, height: 11, borderRadius: '3px 3px 6px 6px', background: '#7a4a22' });
    box(c, { left: 40, top: 15, width: 5, height: 5, background: '#d33', borderRadius: 2 });
    return { c, legs, tail, head };
  }
  function bikeEl(p, col) {   // bottom-centre origin, faces right, 74 x 46 (wheel 26)
    const c = box(p, { left: -37, top: -46, width: 74, height: 46 });
    const mk1 = (lx) => { const wh = box(c, { left: lx, top: 20, width: 26, height: 26, borderRadius: '50%', border: '3px solid #222', background: 'rgba(255,255,255,.12)' }); box(wh, { left: 9, top: -1, width: 2, height: 20, background: '#555' }); box(wh, { left: -1, top: 9, width: 20, height: 2, background: '#555' }); return wh; };
    const rw = mk1(2), fw = mk1(48);
    [[15, 33, 35, 33], [35, 33, 30, 14], [30, 14, 15, 33], [30, 14, 54, 14], [35, 33, 54, 14], [54, 14, 61, 33], [54, 14, 58, 8], [30, 14, 29, 9]].forEach((q) => line(c, q[0], q[1], q[2], q[3], 2.4, col || '#c0392b'));
    box(c, { left: 24, top: 6, width: 12, height: 4, background: '#222', borderRadius: 3 }); box(c, { left: 56, top: 5, width: 7, height: 3, background: '#222', borderRadius: 2 });
    return { c, rw, fw };
  }
  const spinWheels = (b, t, d, per, dir) => { [b.rw, b.fw].forEach((e) => tl.fromTo(e, { rotation: 0 }, { rotation: 360 * (dir || 1), duration: per, ease: 'none', repeat: Math.max(0, Math.floor(d / per) - 1), immediateRender: false }, t)); };
  // window with an interior (back layer c) and a frame + sill (front layer f). Returns the opening {x,y,w,h}
  function windowFrame(c, f, x, y, w, h, o) {
    o = o || {};
    box(c, { left: x, top: y, width: w, height: h, background: o.glass || 'linear-gradient(#1c2a44,#3a4d70)' });
    if (o.curtains) { box(c, { left: x, top: y, width: w * 0.2, height: h * 0.9, background: o.curtains, borderRadius: '0 0 6px 2px' }); box(c, { left: x + w * 0.8, top: y, width: w * 0.2, height: h * 0.9, background: o.curtains, borderRadius: '0 0 2px 6px' }); }
    box(f, { left: x - 5, top: y - 5, width: w + 10, height: h + 10, border: '5px solid #f2ede0', borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,.35)' });
    box(f, { left: x - 10, top: y + h, width: w + 20, height: 8, background: '#8d7a68', borderRadius: 2 });
    return { x, y, w, h };
  }
  // clip polygon (actor local px) that hides everything below screen line yCut. Optional left/right/top keep the arm free
  function clipBelow(a, yCut) { const L = (yCut - a.Y) / a.sc; return 'polygon(-400px -900px,400px -900px,400px ' + L.toFixed(1) + 'px,-400px ' + L.toFixed(1) + 'px)'; }

  // ---------- the gags ----------
  const B = {};

  B.seagull_chips = (c, info) => {   // left lane. man holds a chip cone, a gull (20% of his height) steals it
    const man = take(info, [11, 0, 6]), X = 118, Y = Y0, s = u(Y);
    const cone = attach(man, man.P.afw, '<path d="M101 172 L123 172 L112 204Z" fill="#fffdf2" stroke="#d8d2b8" stroke-width="1"/><g class="ch"><path d="M104 150 L108 172 M112 146 L112 172 M120 151 L116 172" stroke="#f0c040" stroke-width="6" stroke-linecap="round"/></g>');
    const chips = cone.querySelector('.ch');
    const gG = G(c, 0, 0, 0.2 * 326 * s / 28, 3), gl = gullEl(gG); gsap.set(gG, { opacity: 0 });
    const chip = box(gl.i, { left: 41, top: 13, width: 9, height: 4, background: '#f0c040', borderRadius: 2, opacity: 0 });
    const oi = bub(X + 6, Y - HP(Y) - 96, 'OI! MY|CHIPS!');
    const hand = (() => { const [x, y] = [X + (190 - 80) * s, Y + (96 - 326) * s]; return [x, y]; })();
    return (t, d) => {
      enter(man, t, d, { x: X, y: Y, hs: 1 }); vis(cone, t, d); st(chips, { opacity: 1 }, t);
      pose(man, t + 0.1, 0.5, { f: [190, 96], up: 0 });
      st(gG, { opacity: 1, x: 420, y: 150 }, t); st(gl.i, { scaleX: -1 }, t); st(chip, { opacity: 0 }, t);
      cyc(gl.wing, { rotation: -35 }, { rotation: 45 }, 0.12, t, 3.6);
      mv(gG, { x: 420, y: 150 }, { x: hand[0] + 6, y: hand[1] - 8 }, t + 0.4, 1.3, 'power1.out');
      st(chips, { opacity: 0 }, t + 1.75); st(chip, { opacity: 1 }, t + 1.75); st(gl.i, { scaleX: 1 }, t + 1.8);
      mv(gG, { x: hand[0] + 6, y: hand[1] - 8 }, { x: 470, y: 170 }, t + 1.75, 1.9, 'power2.in'); st(gG, { opacity: 0 }, t + 3.7);
      emo(man, 'angry', t + 1.8); emo(man, 'normal', t + d - 0.6);
      pose(man, t + 1.85, 0.3, { f: [150, 10], b: [10, 14], up: 0 });
      swing(man, 'f', [150, 10], [140, -14], 0.2, t + 2.2, d - 2.9); swing(man, 'b', [10, 14], [20, -12], 0.22, t + 2.2, d - 2.9);
      cyc(man.P.t, { y: 0 }, { y: -5 }, 0.2, t + 2.2, d - 2.9);
      say(oi, t + 2.0, 2.4);
    };
  };

  B.hat_chase = (c, info) => {   // right lane. an older man runs in from the right after his hat
    const man = take(info, [4, 0]), Y = Y0, s = u(Y), HPY = HP(Y);
    const hG = G(c, 1260, Y - HPY * 0.97, 0.17 * 326 * s / 24, 3), hy = box(hG, { left: -12, top: -9, width: 24, height: 18 }); const hat = box(hy, { left: 0, top: 0, width: 24, height: 18 });
    box(hat, { left: 5, top: 0, width: 14, height: 12, background: '#2d2d3a', borderRadius: '6px 6px 0 0' }); box(hat, { left: 0, top: 11, width: 24, height: 4, background: '#2d2d3a', borderRadius: 3 }); box(hat, { left: 5, top: 8, width: 14, height: 3, background: '#c0392b' });
    const winds = [0, 1, 2].map((k) => box(c, { left: 1160 + k * 40, top: 300 + k * 40, width: 110, height: 3, background: 'rgba(255,255,255,.8)', borderRadius: 2, opacity: 0 }));
    const b = bub(1135, Y - HPY - 90, 'MY HAT!');
    return (t, d) => {
      enter(man, t, d, { x: 1345, y: Y }); const dur = 5.4;
      mv(man.wrap, { x: 1345 }, { x: 1112 }, t + 0.3, dur); walk(man, t + 0.3, dur, 0.3, { leg: 24, arm: 0 });
      pose(man, t + 0.3, 0.4, { f: [150, 14], b: [10, 14] }); swing(man, 'f', [150, 14], [138, -8], 0.3, t + 0.8, dur - 0.5); swing(man, 'b', [10, 14], [22, -8], 0.3, t + 0.8, dur - 0.5);
      mv(hG, { x: 1262 }, { x: 1040 }, t + 0.3, dur); cyc(hy, { y: 0 }, { y: -26 }, 0.35, t + 0.3, dur, 'sine.out');
      tl.fromTo(hat, { rotation: 0 }, { rotation: -720, duration: dur, ease: 'none', immediateRender: false }, t + 0.3);
      winds.forEach((wd, k) => cyc(wd, { opacity: 0, x: 50 }, { opacity: 0.85, x: -80 }, 0.4 + k * 0.07, t + 0.2, d - 0.5, 'power1.in'));
      emo(man, 'surprised', t + 0.3); emo(man, 'normal', t + d - 0.5);
      say(b, t + 1.8, 2.4);
    };
  };

  B.dog_walks_owner = (c, info) => {   // left lane. a dog (knee height = 30% of the owner) drags its owner in from the left, then stops to sniff
    const man = take(info, [6, 11]), Y = Y0, s = u(Y), XO = 75, LEAD = 140, m = 0.3 * 326 * s / 40, SH = 235;
    const mover = box(c, { left: 0, top: 0, width: 1, height: 1 });
    const dogX = XO + LEAD, dG = G(mover, dogX, Y, m, 2), dog = dogEl(dG);
    const hx = XO + (172 - 80) * s, hy = Y + (112 - 326) * s, cx = dogX + 10 * m, cy = Y - 26 * m;
    line(mover, hx, hy, cx, cy, 2.5, '#a22');
    box(mover, { left: dogX - 34 * m, top: Y - 3, width: 68 * m, height: 8, borderRadius: '50%', background: 'rgba(22,18,34,.28)', zIndex: 1 });
    const b = bub(XO + 30, Y - HP(Y) - 96, 'FIVE MORE|MINUTES?');
    return (t, d) => {
      enter(man, t, d, { x: XO - SH, y: Y }); const dur = 2.7;
      mv(man.wrap, { x: XO - SH }, { x: XO }, t + 0.3, dur, 'power1.out'); mv(mover, { x: -SH }, { x: 0 }, t + 0.3, dur, 'power1.out');
      walk(man, t + 0.3, dur, 0.45, { leg: 18, arm: 0, lean: 6 });
      pose(man, t + 0.1, 0.4, { f: [172, 112] }); tl.to(man.P.t, { rotation: 6, duration: 0.4, ease: 'sine.inOut' }, t + 0.3 + dur);
      dog.legs.forEach((l, k) => cyc(l, { rotation: k % 2 ? -40 : 40 }, { rotation: k % 2 ? 40 : -40 }, 0.2, t + 0.3, dur));
      tl.set(dog.legs, { rotation: 0 }, t + 0.3 + dur + 0.25);
      cyc(dog.tail, { rotation: 10 }, { rotation: 60 }, 0.1, t, d); cyc(dog.c, { y: 0 }, { y: -2 }, 0.12, t + 0.3, dur); cyc(dog.head, { rotation: 0 }, { rotation: 30 }, 0.4, t + 0.3 + dur, d - dur - 0.7);
      emo(man, 'sad', t + 3.2); emo(man, 'normal', t + d - 0.4);
      say(b, t + 3.4, 3.0);
    };
  };

  B.umbrella_and_shorts = (c, info, f) => {   // right lane. one man under an umbrella on a sunny day, one in shorts stamping in a puddle
    const A = take(info, [0, 4]), Bz = take(info, [3, 11]), XA = 1118, XB = 1218, YA = 655, YB = 659, sA = u(YA), sB = u(YB);
    const umb = attach(A, A.P.afw, '<path d="M112 212 L112 84" stroke="#333" stroke-width="3.5"/><path d="M48 92 Q112 24 176 92 Q144 80 112 92 Q80 80 48 92Z" fill="#e0457b"/><path d="M80 62 L90 90 M112 44 L112 90 M144 62 L134 90" stroke="rgba(255,255,255,.4)" stroke-width="2.5"/>');
    const pants = [], sk = Bz.skin;
    const shorts = Bz.legs.map((l) => attach(Bz, l, `<rect x="${(l === Bz.legs[0] ? 68 : 92) - 11}" y="250" width="22" height="53" fill="${sk}"/>`));
    const pud = box(c, { left: XB - 70, top: YB - 12, width: 140, height: 26, borderRadius: '50%', background: 'rgba(90,150,210,.85)', border: '2px solid #4a80b0' });
    const rip = [0, 1].map(() => box(f, { left: XB - 56, top: YB - 8, width: 112, height: 18, borderRadius: '50%', border: '2.5px solid rgba(255,255,255,.9)', opacity: 0 }));
    const b1 = bub(XA, YA - HP(YA) - 160, 'FORECAST SAID|RAIN'), b2 = bub(XB, YB - HP(YB) - 70, 'LOVELY|DAY!');
    return (t, d) => {
      enter(A, t, d, { x: XA, y: YA }); enter(Bz, t, d, { x: XB, y: YB, flip: true }); vis(umb, t, d); shorts.forEach((g) => vis(g, t, d));
      pose(A, t + 0.1, 0.5, { f: [142, 62], up: -18 }); emo(A, 'angry', t + 0.6); emo(A, 'normal', t + d - 0.5);
      cyc(A.P.t, { rotation: -1 }, { rotation: 1.5 }, 0.8, t, d);
      emo(Bz, 'happy', t + 0.3); emo(Bz, 'normal', t + d - 0.5);
      cyc(Bz.legs[0], { rotation: 0 }, { rotation: -30 }, 0.3, t, d - 0.3, 'power1.out'); cyc(Bz.legs[1], { rotation: -30 }, { rotation: 0 }, 0.3, t, d - 0.3, 'power1.out');
      cyc(Bz.P.t, { y: 0 }, { y: -7 }, 0.3, t, d - 0.3, 'power1.out'); pose(Bz, t + 0.3, 0.4, { f: [150, 66], b: [10, 66] });
      rip.forEach((r, k) => tl.fromTo(r, { scale: 0.4, opacity: 1 }, { scale: 1.35, opacity: 0, duration: 0.6, ease: 'power1.out', repeat: Math.floor(d / 0.6) - 1, immediateRender: false }, t + k * 0.3));
      say(b1, t + 0.8, 2.6); say(b2, t + 4.2, 2.4);
    };
  };

  B.pigeon_bus_ride = (c, info, f) => {   // right lane. bus in the far lane (height 1.1 x lane person height); the pigeon hops from the stop sign onto the roof and rides away
    const LY = 548, H = HP(LY) * 1.1, mb = H / 92, bus = box(c, { left: 0, top: 0, width: 150, height: 92 }); gsap.set(bus, { x: 1330, y: LY - 92 * mb, scale: mb, transformOrigin: '0px 0px' });
    box(bus, { left: 0, top: 6, width: 150, height: 80, background: '#d63a3a', borderRadius: '9px 9px 4px 4px' }); box(bus, { left: 0, top: 44, width: 150, height: 5, background: '#f2f2f2' });
    for (let k = 0; k < 5; k++) { box(bus, { left: 10 + k * 26, top: 14, width: 20, height: 20, background: '#bfe1ee', borderRadius: 3, border: '1px solid #8aa' }); if (k < 4) box(bus, { left: 10 + k * 26, top: 53, width: 20, height: 16, background: '#bfe1ee', borderRadius: 3, border: '1px solid #8aa' }); }
    box(bus, { left: 112, top: 52, width: 24, height: 33, background: '#9cc9d8', border: '1px solid #678', borderRadius: 2 }); box(bus, { left: 4, top: 0, width: 64, height: 9, background: '#111', borderRadius: 2, font: 'bold 7px Arial', color: '#ffb000', lineHeight: 9, textAlign: 'center' }, 'TOWN CENTRE');
    const wh = [24, 112].map((x) => { const e = box(bus, { left: x, top: 72, width: 22, height: 22, borderRadius: '50%', background: '#222', border: '3px solid #555' }); box(e, { left: 6, top: 6, width: 4, height: 4, background: '#999', borderRadius: '50%' }); box(e, { left: 6, top: -1, width: 2, height: 12, background: '#888' }); return e; });
    const SY = 600, SX = 1030, sg = G(f, SX, SY, 1, 2); box(sg, { left: -2, top: -HP(SY) * 0.95, width: 5, height: HP(SY) * 0.95, background: '#666' }); box(sg, { left: -34, top: -HP(SY) * 0.95 - 14, width: 68, height: 36, background: '#2060b0', border: '3px solid #fff', borderRadius: 4, font: 'bold 15px Arial', color: '#fff', textAlign: 'center', lineHeight: 28 }, 'BUS STOP');
    const pm = 0.15 * 326 * u(SY) / 26, pG = G(f, SX, SY - HP(SY) * 0.95 - 14, pm, 4), pg = pigEl(pG); gsap.set(pg.i, { scaleX: -1 });
    return (t, d) => {
      const stopX = 1060, roofX = stopX + 60 * mb, roofY = LY - 92 * mb + 4 * mb;
      st(pG, { x: SX, y: SY - HP(SY) * 0.95 - 14, scale: pm }, t); st(pg.hd, { rotation: 0 }, t); st(pg.wing, { rotation: 0 }, t);
      mv(bus, { x: 1330 }, { x: stopX }, t + 0.2, 1.8, 'power2.out'); wh.forEach((e) => mv(e, { rotation: 0 }, { rotation: -540 }, t + 0.2, 1.8, 'power2.out'));
      cyc(pg.hd, { rotation: -10 }, { rotation: 25 }, 0.3, t, 3);
      mv(pG, { x: SX, y: SY - HP(SY) * 0.95 - 14, scale: pm }, { x: roofX, y: roofY, scale: pm * 0.85 }, t + 3.2, 0.8, 'sine.inOut'); cyc(pg.wing, { rotation: -40 }, { rotation: 40 }, 0.1, t + 3.2, 0.8);
      cyc(pg.hd, { rotation: -5 }, { rotation: 22 }, 0.18, t + 4.1, 3.4);
      const out = 3.0, dx = -1500;   // bus drives off to the left in the far lane, pigeon on the roof
      mv(bus, { x: stopX }, { x: stopX + dx }, t + 4.6, out, 'power2.in'); wh.forEach((e) => mv(e, { rotation: 0 }, { rotation: -900 }, t + 4.6, out, 'power2.in'));
      mv(pG, { x: roofX, y: roofY, scale: pm * 0.85 }, { x: roofX + dx, y: roofY, scale: pm * 0.85 }, t + 4.6, out, 'power2.in');
    };
  };

  B.map_in_wind = (c, info) => {   // left lane
    const P = take(info, [8, 2]), X = 116, Y = Y0, s = u(Y);
    const map = attach(P, P.P.afw, '<g class="mp"><rect x="52" y="96" width="118" height="100" fill="#f6ecc4" stroke="#9a8a5a" stroke-width="3"/><path d="M52 150 Q82 126 112 144 T170 118" stroke="#6bb3e0" stroke-width="12" fill="none"/><rect x="62" y="104" width="34" height="26" fill="#9ccf84"/><path d="M60 184 L96 168 L130 186 L162 162" stroke="#d33" stroke-width="4" stroke-dasharray="7 7" fill="none"/><path d="M111 96 V196 M52 146 H170" stroke="#c9b97a" stroke-width="1.6"/></g>');
    const mp = map.querySelector('.mp'); gsap.set(mp, { svgOrigin: '112 196' });
    const winds = [0, 1, 2].map((k) => box(c, { left: 10 + k * 40, top: 440 + k * 36, width: 90, height: 3, background: 'rgba(255,255,255,.8)', borderRadius: 2, opacity: 0 }));
    const b = bub(X + 20, Y - HP(Y) - 100, 'WHICH WAY|IS NORTH?');
    return (t, d) => {
      enter(P, t, d, { x: X, y: Y }); vis(map, t, d);
      pose(P, t + 0.1, 0.5, { f: [150, 48], up: 0 }); pose(P, t + 0.1, 0.5, { b: [30, 120] });
      cyc(mp, { rotation: -14, skewX: -12, scaleX: 0.85 }, { rotation: 14, skewX: 14, scaleX: 1.15 }, 0.17, t, d);
      cyc(P.P.h, { rotation: -7 }, { rotation: 7 }, 0.45, t + 0.5, d - 0.6); cyc(P.P.t, { x: -3 }, { x: 4 }, 0.25, t + 0.5, d - 0.6);
      emo(P, 'surprised', t + 0.6); emo(P, 'normal', t + d - 0.6);
      winds.forEach((wd, k) => cyc(wd, { opacity: 0, x: -30 }, { opacity: 0.85, x: 90 }, 0.35 + k * 0.08, t, d, 'power1.in'));
      say(b, t + 1.2, 3.5);
    };
  };

  B.bell_at_slow_crossing = (c, info) => {   // right lane. two slow walkers, a cyclist stuck behind rings the bell
    const o1 = take(info, [12]), o2 = take(info, [4, 0]), rd = take(info, [1, 5], true), Y = Y0, s = u(Y), m = 0.38 * 326 * s / 26;
    const bG = G(c, 0, Y, m, 1), bk = bikeEl(bG, '#2a6'); gsap.set(bk.c, { scaleX: -1 });   // faces left
    const arcs = [0, 1].map((k) => box(bG, { left: -50 - k * 5, top: -52 - k * 6, width: 14 + k * 8, height: 14 + k * 8, borderRadius: '50%', border: '2.5px solid #333', borderColor: '#333 transparent transparent transparent', opacity: 0 }));
    const ding = bub(1262, Y - HP(Y) - 80, 'DING DING!'), tut = bub(1110, Y - HP(Y) - 94, 'SORRY, TAKING|MY TIME');
    return (t, d) => {
      const dur = 6.2, bx0 = 1340, bx1 = 1218;
      enter(o1, t, d, { x: 1150, y: Y }); enter(o2, t, d, { x: 1232, y: Y + 3 }); enter(rd, t, d, { x: bx0, y: Y - 26, sy: Y, noShadow: true, z: zf(Y - 1) });
      mv(o1.wrap, { x: 1150 }, { x: 1060 }, t + 0.2, dur, 'sine.inOut'); mv(o2.wrap, { x: 1232 }, { x: 1142 }, t + 0.2, dur, 'sine.inOut');
      walk(o1, t + 0.2, dur, 0.9, { leg: 11, arm: 7 }); walk(o2, t + 0.2, dur, 0.95, { leg: 11, arm: 7 });
      st(bG, { x: bx0 }, t); mv(bG, { x: bx0 }, { x: bx1 }, t + 0.2, dur, 'sine.inOut'); mv(rd.wrap, { x: bx0 }, { x: bx1 }, t + 0.2, dur, 'sine.inOut'); spinWheels(bk, t + 0.2, dur, 1.3);
      cyc(rd.legs[0], { rotation: -26 }, { rotation: 26 }, 0.5, t + 0.2, dur); cyc(rd.legs[1], { rotation: 26 }, { rotation: -26 }, 0.5, t + 0.2, dur);
      pose(rd, t + 0.1, 0.4, { f: [150, 118], b: [10, 118] });
      pose(rd, t + 2.8, 0.2, { f: [150, 60] }); pose(rd, t + 3.3, 0.2, { f: [150, 118] });
      arcs.forEach((a, k) => cyc(a, { opacity: 0 }, { opacity: 1 }, 0.18, t + 2.8 + k * 0.05, 1.8, 'none'));
      say(ding, t + 2.8, 1.8); say(tut, t + 4.8, 2.1);
    };
  };

  B.queue_starts_here = (c, info) => {   // left lane. a sign, then three people join an invisible queue
    const Y = Y0, hp = HP(Y), pl = [take(info, [0]), take(info, [2]), take(info, [7, 13])], xs = [135, 195, 255], ys = [Y, Y - 3, Y - 6];
    box(c, { left: 28, top: Y - hp * 1.2, width: 6, height: hp * 1.2, background: '#555' });
    box(c, { left: 6, top: Y - hp * 1.2 - 58, width: 176, height: 58, background: '#f5d020', border: '3px solid #222', borderRadius: 4, font: 'bold 20px Arial', color: '#111', textAlign: 'center', lineHeight: 24, paddingTop: 3, whiteSpace: 'nowrap' }, 'QUEUE STARTS<br>HERE >>');
    const b = bub(xs[1] + 10, ys[2] - hp - 100, 'WHAT ARE WE|QUEUING FOR?');
    return (t, d) => {
      pl.forEach((a, k) => { const t0 = t + 0.6 + k * 1.5; enter(a, t0, d - 0.6 - k * 1.5, { x: xs[k], y: ys[k] }); cyc(a.P.t, { y: 0 }, { y: -1.5 }, 1.1 + k * 0.1, t0, d - 1.2 - k * 1.5); });
      pose(pl[1], t + 2.3, 0.4, { f: [150, 40] }); pose(pl[1], t + 4.6, 0.5, { f: [138, 150] });
      cyc(pl[2].P.h, { rotation: -8 }, { rotation: 8 }, 0.8, t + 3.2, 4);
      emo(pl[2], 'surprised', t + 5.0); emo(pl[2], 'normal', t + d - 0.6);
      say(b, t + 5.0, 3.0);
    };
  };

  B.hair_in_window = (c, info) => {   // right lane. a man checks his hair in a glass panel, his reflection gives him a thumbs up
    const man = take(info, [11, 0]), ref = take(info, [11, 0]), Y = Y0, hp = HP(Y), XM = 1086, XR = 1212;
    const px = 1138, pw = 142; box(c, { left: px, top: Y - hp * 1.12, width: pw, height: hp * 1.12, background: 'linear-gradient(135deg,#cbe8f4,#eaf6fb)', border: '5px solid #6d5a4a', borderRadius: 3 });
    box(c, { left: px + 18, top: Y - hp * 1.12 + 10, width: 14, height: hp * 1.12 - 20, background: 'rgba(255,255,255,.35)', transform: 'skewX(-12deg)' }); box(c, { left: px - 8, top: Y - 2, width: pw + 16, height: 6, background: '#8d7a68', borderRadius: 2 });
    const b = bub(XM, Y - hp - 100, 'LOOKING|GOOD, MATE'), b2 = bub(XR - 10, Y - hp - 100, 'THUMBS UP,|MATE');
    return (t, d) => {
      enter(man, t, d, { x: XM, y: Y }); enter(ref, t, d, { x: XR, y: Y + 2, flip: true, z: zf(Y) + 1, filter: 'opacity(.5) saturate(.7) brightness(1.1)' });
      [man, ref].forEach((a, k) => {
        const t0 = t + k * 0.5;
        pose(a, t0 + 0.2, 0.4, { f: [104, 30] }); swing(a, 'f', [104, 30], [112, 20], 0.22, t0 + 0.7, 3.4 - k * 0.5); cyc(a.P.h, { rotation: -4 }, { rotation: 4 }, 0.5, t0 + 0.7, d - 1.2);
      });
      pose(man, t + 4.0, 0.3, { f: [150, 130] }); pose(ref, t + 4.0, 0.3, { f: [150, 130] }); pose(ref, t + 4.7, 0.3, { f: [140, 24] }); swing(ref, 'f', [140, 24], [140, 0], 0.25, t + 5.0, 1.0); emo(ref, 'happy', t + 4.7); emo(ref, 'normal', t + d - 0.3);
      say(b, t + 0.6, 3.4); say(b2, t + 4.6, 1.3);
    };
  };

  B.bubbles_child = (c, info) => {   // left lane. a child (62% of an adult) blows bubbles
    const kid = take(info, [5, 1]), X = 96, Y = Y0, hs = 0.62, sc = u(Y) * hs;
    const wand = attach(kid, kid.P.afw, '<path d="M112 196 V160" stroke="#888" stroke-width="3"/><circle cx="112" cy="146" r="16" fill="none" stroke="#888" stroke-width="3.5"/>');
    const wx = X + (150 - 80) * sc, wy = Y + (74 - 326) * sc - 40 * sc, bs = [0, 1, 2, 3, 4].map((k) => { const sz = 20 + (k % 3) * 11; return box(c, { left: wx - sz / 2, top: wy - sz / 2, width: sz, height: sz, borderRadius: '50%', border: '2px solid rgba(255,255,255,.95)', background: 'radial-gradient(circle at 30% 30%,rgba(255,255,255,.85),rgba(150,210,255,.25))', opacity: 0 }); });
    return (t, d) => {
      enter(kid, t, d, { x: X, y: Y, hs }); vis(wand, t, d); pose(kid, t + 0.1, 0.4, { f: [150, 74], up: 0 });
      swing(kid, 'f', [150, 74], [152, 54], 0.5, t + 0.6, d - 0.7, 0); emo(kid, 'happy', t + 0.3); emo(kid, 'normal', t + d - 0.5); cyc(kid.P.t, { y: 0 }, { y: -2 }, 0.4, t + 0.6, d - 0.7);
      bs.forEach((b, k) => {
        const per = 2.8, off = 0.4 + k * 0.55, n = Math.max(0, Math.floor((d - off) / per) - 1);
        tl.fromTo(b, { x: 0, y: 0, scale: 0.3, opacity: 0 }, { keyframes: { x: [0, 30 + (k * 23) % 70, 60 + (k * 31) % 110], y: [0, -(90 + (k * 17) % 60), -(170 + (k * 29) % 90)], scale: [0.3, 1, 1.05], opacity: [0.9, 0.9, 0], easeEach: 'sine.out' }, duration: per, ease: 'none', repeat: n, immediateRender: false }, t + off);
      });
    };
  };

  B.cat_watches_pigeon = (c, info) => {   // left lane. cat 19%, pigeon 15% of an adult
    const Y = 665, s = u(Y), HPY = HP(Y);
    const cG = G(c, 92, Y, 0.19 * 326 * s / 36, 2), cat = catEl(cG), pG = G(c, 214, Y + 3, 0.15 * 326 * s / 26, 2), pg = pigEl(pG); gsap.set(pg.i, { scaleX: -1 });
    box(c, { left: 188, top: Y, width: 54, height: 8, background: 'rgba(0,0,0,.16)', borderRadius: '50%' });
    const b = bub(110, Y - HPY * 0.42 - 60, 'NOT TODAY,|PIGEON'), b2 = bub(160, Y - HPY * 0.42 - 20, '...');
    return (t, d) => {
      st(cG, { x: 92, y: Y, opacity: 1 }, t); st(cat.c, { scaleY: 1 }, t); st(pG, { x: 214, y: Y + 3, opacity: 1, rotation: 0 }, t); st(pg.wing, { rotation: 0 }, t);
      cyc(cat.tail, { rotation: -25 }, { rotation: 35 }, 0.8, t, d); cyc(pg.hd, { rotation: 0 }, { rotation: 45 }, 0.22, t, 5.2); cyc(cat.head, { rotation: -4 }, { rotation: 8 }, 1, t, 3.5);
      tl.fromTo(cat.c, { scaleY: 1 }, { scaleY: 0.78, duration: 0.5, immediateRender: false, transformOrigin: '50% 100%' }, t + 3.2);
      cyc(cat.c, { x: 0 }, { x: 2 }, 0.06, t + 3.7, 1.3, 'none');
      st(cat.c, { scaleY: 1 }, t + 5.1); mv(cG, { x: 92 }, { x: 150 }, t + 5.1, 0.35, 'power2.out'); cyc(cG, { y: Y }, { y: Y - 36 }, 0.17, t + 5.1, 0.35, 'sine.out');
      cyc(pg.wing, { rotation: -50 }, { rotation: 40 }, 0.07, t + 5.2, 1.6);
      mv(pG, { x: 214, y: Y + 3 }, { x: 360, y: 140 }, t + 5.2, 1.6, 'power2.in'); st(pG, { opacity: 0 }, t + 6.8);
      cyc(cat.head, { rotation: -12 }, { rotation: -16 }, 0.8, t + 6, 0.9);
      say(b, t + 1.0, 2.2); say(b2, t + 6.2, 0.75);
    };
  };

  B.tall_parcel_rider = (c, info) => {   // left lane. cyclist with a tall stack, stops, wobbles, turns round
    const rd = take(info, [1, 10], true), Y = Y0, s = u(Y), m = 0.38 * 326 * s / 26;
    const bG = G(c, -200, Y, m, 1), inner = box(bG, { left: 0, top: 0, width: 1, height: 1 }), bk = bikeEl(inner, '#1b7');
    const stk = box(inner, { left: -34, top: -126, width: 26, height: 100 }); gsap.set(stk, { transformOrigin: '50% 100%' });
    const cl = ['#c89a5e', '#b88547', '#d4a96a', '#a9763e'];
    for (let k = 0; k < 8; k++) { const bx = box(stk, { left: (k % 3) - 1, top: 100 - 12 * (k + 1), width: 24 - (k % 2), height: 12, background: cl[k % 4], border: '1px solid rgba(80,50,20,.6)' }); box(bx, { left: 10, top: 0, width: 4, height: 12, background: 'rgba(255,255,255,.4)' }); }
    box(stk, { left: 3, top: -14, width: 20, height: 12, background: '#fff', border: '1px solid #aaa', font: 'bold 7px Arial', color: '#c33', lineHeight: 10, textAlign: 'center' }, 'FRAGILE');
    const b = bub(120, Y - HP(Y) - 130, 'IT IS FINE.|IT IS FINE.');
    return (t, d) => {
      enter(rd, t, d, { x: -200, y: Y - 26, sy: Y, noShadow: true, z: zf(Y - 1) }); st(bG, { x: -200 }, t); st(inner, { scaleX: 1 }, t);
      mv(bG, { x: -200 }, { x: 118 }, t + 0.1, 2.6, 'power2.out'); mv(rd.wrap, { x: -200 }, { x: 118 }, t + 0.1, 2.6, 'power2.out'); spinWheels(bk, t + 0.1, 2.6, 0.5);
      cyc(rd.legs[0], { rotation: -26 }, { rotation: 26 }, 0.3, t, 2.8); cyc(rd.legs[1], { rotation: 26 }, { rotation: -26 }, 0.3, t, 2.8);
      pose(rd, t + 0.1, 0.4, { f: [150, 120], b: [10, 120] });
      cyc(stk, { rotation: -3 }, { rotation: 4 }, 0.5, t, 2.7); cyc(stk, { rotation: -9 }, { rotation: 10 }, 0.7, t + 2.8, 3.2);
      emo(rd, 'surprised', t + 2.9); emo(rd, 'normal', t + 6.2);
      say(b, t + 3.0, 3.2);
      st(inner, { scaleX: -1 }, t + 6.1); st(rd.wrap, { scaleX: -rd.sc }, t + 6.1);
      mv(bG, { x: 118 }, { x: -230 }, t + 6.2, 1.6, 'power2.in'); mv(rd.wrap, { x: 118 }, { x: -230 }, t + 6.2, 1.6, 'power2.in'); spinWheels(bk, t + 6.2, 1.6, 0.5, -1);
      cyc(stk, { rotation: -4 }, { rotation: 5 }, 0.4, t + 6.2, 1.5);
    };
  };

  B.squirrel_lamppost = (c, info) => {   // left lane. lamp post 1.75 x adult height, squirrel 17% of an adult climbs it
    const Y = 668, s = u(Y), hp = HP(Y), ph = hp * 1.75, PX = 34;
    box(c, { left: PX - 7, top: Y - ph, width: 14, height: ph, background: '#4a5260', borderRadius: 3 }); box(c, { left: PX - 7, top: Y - ph - 6, width: 70, height: 10, background: '#4a5260', borderRadius: 4 }); box(c, { left: PX + 44, top: Y - ph + 2, width: 30, height: 20, background: '#ffe9a0', borderRadius: '3px 3px 14px 14px', border: '2px solid #4a5260' });
    const m = 0.17 * 326 * s / 34, sG = G(c, PX + 26, Y, m, 2), sq = box(sG, { left: -13, top: -34, width: 26, height: 34 });
    const tail = box(sq, { left: 15, top: 0, width: 11, height: 26, background: '#c96a22', borderRadius: '50% 50% 50% 60%' }); gsap.set(tail, { transformOrigin: '30% 100%' });
    box(sq, { left: 6, top: 10, width: 11, height: 20, background: '#c96a22', borderRadius: '50%' }); box(sq, { left: 9, top: 20, width: 5, height: 8, background: '#f0d9b0', borderRadius: '50%' });
    const hd = box(sq, { left: 3, top: 3, width: 12, height: 11, background: '#c96a22', borderRadius: '50%' }); box(hd, { left: 1, top: -3, width: 3, height: 5, background: '#c96a22', borderRadius: '50% 50% 0 0' }); box(hd, { left: 3, top: 4, width: 2.5, height: 2.5, background: '#111', borderRadius: '50%' });
    const nut = box(sq, { left: -2, top: 12, width: 6, height: 7, background: '#8a5a2a', borderRadius: '50%', opacity: 0 });
    const topY = Y - hp * 1.25, b = bub(PX + 90, topY - 100, 'NUTS TO|YOU TOO');
    return (t, d) => {
      st(sG, { y: Y }, t); st(nut, { opacity: 0 }, t);
      mv(sG, { y: Y }, { y: topY }, t + 0.3, 2.6, 'steps(9)'); cyc(tail, { rotation: -10 }, { rotation: 18 }, 0.4, t, d);
      st(nut, { opacity: 1 }, t + 3.1); cyc(hd, { rotation: -10 }, { rotation: 14 }, 0.12, t + 3.1, 2); cyc(nut, { y: 0 }, { y: -3 }, 0.12, t + 3.1, 2);
      say(b, t + 3.3, 2.4);
      mv(sG, { y: topY }, { y: Y }, t + 5.4, 1.5, 'steps(8)');
    };
  };

  B.free_sign_man = (c, info) => {   // right lane. a man holds a hand-written sign over his head
    const P = take(info, [10, 0, 6]), X = 1128, Y = Y0, hp = HP(Y), s = u(Y);
    const mk = (txt, col, fs, y) => `<text x="112" y="${y}" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="${fs}" fill="${col}">${txt}</text>`;
    const sign = attach(P, P.P.afw, `<path d="M112 206 V84" stroke="#8a6a3a" stroke-width="5"/><g class="sg"><rect x="14" y="14" width="196" height="76" rx="5" fill="#fffbe6" stroke="#333" stroke-width="4"/><g class="x0">${mk('FREE HUGS', '#d6336c', 30, 66)}</g><g class="x1">${mk('FREE ADVICE', '#1c7ed6', 27, 66)}</g><g class="x2">${mk('FREE TEA', '#2f9e44', 25, 44)}${mk('(NOT REALLY)', '#2f9e44', 22, 74)}</g></g>`);
    const sg = sign.querySelector('.sg'), tx = [0, 1, 2].map((k) => sign.querySelector('.x' + k)); gsap.set(sg, { svgOrigin: '112 100' });
    const b = bub(X + 20, Y - hp - 180, 'HUG?');
    return (t, d) => {
      enter(P, t, d, { x: X, y: Y }); vis(sign, t, d); pose(P, t + 0.1, 0.5, { f: [146, 70], up: 0 });
      cyc(sg, { rotation: -3 }, { rotation: 3 }, 0.6, t + 0.6, d - 0.7); cyc(P.P.t, { y: 0 }, { y: -1.5 }, 0.5, t, d);
      swing(P, 'b', [20, 70], [-30, 20], 0.7, t + 5.6, 1.3);
      tx.forEach((e, k) => { st(e, { opacity: 0 }, t); st(e, { opacity: 1 }, t + 0.3 + k * 2.2); st(e, { opacity: 0 }, t + 0.3 + (k + 1) * 2.2 - 0.05); });
      emo(P, 'happy', t + 0.4); emo(P, 'normal', t + d - 0.4);
      say(b, t + 1.2, 1.5);
    };
  };

  B.mobility_scooter = (c, info, f) => {   // right lane. a granny in a mobility scooter drives in, stops, drives out. scooter body sits in front of her legs
    const g = take(info, [12], true), Y = Y0, s = u(Y), hp = HP(Y);
    const sc = G(f, 1420, Y, 1, 1);
    box(sc, { left: -112, top: -150, width: 224, height: 110, background: '#c0392b', borderRadius: '30px 22px 10px 10px', boxShadow: 'inset 0 -14px 0 rgba(0,0,0,.18)' }); box(sc, { left: -112, top: -104, width: 224, height: 8, background: 'rgba(255,255,255,.5)' });
    box(sc, { left: -100, top: -48, width: 200, height: 14, background: '#6a6f85', borderRadius: 7 });
    box(sc, { left: 50, top: -228, width: 7, height: 82, background: '#555' }); box(sc, { left: 22, top: -236, width: 62, height: 10, background: '#333', borderRadius: 5 });
    box(sc, { left: -98, top: -130, width: 52, height: 30, background: '#fff', border: '2px solid #333', font: 'bold 14px Arial', color: '#c00', lineHeight: 26, textAlign: 'center' }, '4 MPH');
    const wh = [-66, 66].map((x) => { const e = box(sc, { left: x - 28, top: -56, width: 56, height: 56, borderRadius: '50%', background: '#222', border: '7px solid #666' }); box(e, { left: 17, top: -3, width: 4, height: 28, background: '#999' }); return e; });
    box(sc, { left: -104, top: -250, width: 4, height: 104, background: '#555' });
    const flag = box(sc, { left: -100, top: -250, width: 42, height: 24, background: '#c8102e', clipPath: 'polygon(0 0,100% 50%,0 100%)' }); gsap.set(flag, { transformOrigin: '0 50%' });
    const sp = [0, 1, 2].map((k) => box(f, { left: 1110, top: Y - 70 + k * 20, width: 80, height: 3, background: 'rgba(60,60,70,.5)', borderRadius: 2, opacity: 0 }));
    const b = bub(1110, Y - hp - 70, 'BEEP BEEP,|COMING THROUGH');
    return (t, d) => {
      const stop = 1128, hx = 80 + (57 + 5) / s, hy = 326 + (Y - 232 - (Y - 34)) / s;
      enter(g, t, d, { x: 1420 - 6, y: Y - 34, sy: Y, noShadow: true, z: zf(Y) - 2 });
      st(sc, { x: 1420 }, t); mv(sc, { x: 1420 }, { x: stop }, t + 0.2, 1.6, 'power3.out'); mv(g.wrap, { x: 1414 }, { x: stop - 6 }, t + 0.2, 1.6, 'power3.out');
      wh.forEach((e) => mv(e, { rotation: 0 }, { rotation: -720 }, t + 0.2, 1.6, 'power3.out'));
      pose(g, t + 0.1, 0.4, { f: [hx, hy], b: [hx - 38, hy + 6] });
      cyc(flag, { skewY: -10, scaleX: 1 }, { skewY: 12, scaleX: 0.75 }, 0.12, t, d); cyc(g.P.h, { rotation: -5 }, { rotation: 5 }, 0.45, t + 1.8, 2.9);
      sp.forEach((s2, k) => cyc(s2, { opacity: 0, x: 40 }, { opacity: 0.8, x: -30 }, 0.2 + k * 0.05, t + 0.2, 1.5, 'power1.in'));
      emo(g, 'happy', t + 1.9); emo(g, 'normal', t + 4.8);
      say(b, t + 2.0, 2.8);
      mv(sc, { x: stop }, { x: 1420 }, t + 4.6, 1.2, 'power2.in'); mv(g.wrap, { x: stop - 6 }, { x: 1414 }, t + 4.6, 1.2, 'power2.in'); wh.forEach((e) => mv(e, { rotation: 0 }, { rotation: 720 }, t + 4.6, 1.2, 'power2.in'));
    };
  };

  B.sorry_dance = (c, info) => {   // right lane. two people dodge each other politely
    const a = take(info, [6, 0]), b2 = take(info, [9, 8]), Y = Y0, hp = HP(Y), XA = 1096, XB = 1200;
    const t1 = bub(XA, Y - hp - 90, 'SORRY!'), t2 = bub(XB, Y - hp - 90, 'NO, SORRY!'), t3 = bub(1148, Y - hp - 130, 'AFTER YOU...');
    return (t, d) => {
      enter(a, t, d, { x: XA, y: Y }); enter(b2, t, d, { x: XB, y: Y + 3, flip: true });
      [a, b2].forEach((q, k) => { const x0 = k ? XB : XA; cyc(q.wrap, { x: x0 - 9 }, { x: x0 + 9 }, 0.5, t + 0.3, 5.1, 'power1.inOut'); cyc(q.P.t, { y: 0 }, { y: -3 }, 0.25, t + 0.3, 5.1); emo(q, 'surprised', t + 0.4); emo(q, 'normal', t + d - 0.8); });
      st(a.wrap, { x: XA }, t + 5.5); st(b2.wrap, { x: XB }, t + 5.5);
      swing(a, 'f', [150, 100], [120, 20], 0.3, t + 5.5, 1.0); swing(b2, 'f', [150, 100], [120, 20], 0.3, t + 5.6, 0.9);
      say(t1, t + 0.5, 1.7); say(t2, t + 2.2, 1.9); say(t3, t + 4.6, 1.3);
    };
  };

  B.cloud_follows = (c, info, f) => {   // right lane. a rain cloud (half an adult wide) follows one man; the sun is somewhere else
    const P = take(info, [0, 11]), Y = Y0, hp = HP(Y), s = u(Y), cm = 0.5 * hp / 64;
    const cG = G(c, 1240, Y - hp - 6 - 34 * cm, cm, 3);
    [[0, 12, 32, 22], [18, 0, 32, 28], [34, 10, 30, 22]].forEach((q) => box(cG, { left: q[0] - 32, top: q[1], width: q[2], height: q[3], borderRadius: '50%', background: '#8d98a8' }));
    box(cG, { left: -24, top: 18, width: 48, height: 14, borderRadius: '50%', background: '#7b8696' });
    const dG = G(f, 1240, Y - hp - 6, cm, 3), drops = [0, 1, 2, 3].map((k) => box(dG, { left: -22 + k * 13, top: 0, width: 3, height: 10, background: '#5b9bd5', borderRadius: 1.5 }));
    const sun = box(c, { left: 1198, top: 150, width: 52, height: 52, borderRadius: '50%', background: '#ffd43b', boxShadow: '0 0 20px 8px rgba(255,212,59,.7)' });
    const b = bub(1190, Y - hp - 6 - 34 * cm - 100, 'EVERY. SINGLE.|DAY.');
    return (t, d) => {
      enter(P, t, d, { x: 1250, y: Y }); const dur = 6.4;
      mv(P.wrap, { x: 1250 }, { x: 1135 }, t + 0.3, dur, 'sine.inOut'); walk(P, t + 0.3, dur, 0.55, { leg: 15, arm: 10 });
      mv(cG, { x: 1240 }, { x: 1125 }, t + 0.3, dur, 'sine.inOut'); mv(dG, { x: 1240 }, { x: 1125 }, t + 0.3, dur, 'sine.inOut'); cyc(cG, { y: Y - hp - 6 - 34 * cm }, { y: Y - hp - 6 - 34 * cm - 5 }, 0.9, t, d);
      cyc(sun, { scale: 1 }, { scale: 1.12 }, 1.2, t, d);
      drops.forEach((dr, k) => tl.fromTo(dr, { y: 0, opacity: 1 }, { y: 70 / cm, opacity: 0.2, duration: 0.5, ease: 'none', repeat: Math.floor(d / 0.5) - 1, immediateRender: false }, t + k * 0.12));
      emo(P, 'sad', t + 1.0); emo(P, 'normal', t + d - 0.4); say(b, t + 2.5, 3.4);
    };
  };

  B.window_cleaner = (c, info, f) => {   // left top. cradle in front of the first floor, cleaner at ground-plane size of the shop row (y 470)
    const P = take(info, [6, 0], true), LY = 470, PY = 357, ps = u(LY) * 0.9;
    const wx = 62, wy = 274, ww = 150, wh = 76;
    box(c, { left: wx, top: wy, width: ww, height: wh, background: 'linear-gradient(135deg,#bfe3f2,#e6f5fb)' });
    const dirt = box(c, { left: wx, top: wy, width: ww, height: wh, background: 'rgba(120,108,84,.5)', zIndex: 1 }); gsap.set(dirt, { transformOrigin: '0 50%' });
    box(f, { left: wx - 5, top: wy - 5, width: ww + 10, height: wh + 10, border: '5px solid #7c5f4a', borderRadius: 3 }); box(f, { left: wx + ww / 2, top: wy, width: 4, height: wh, background: '#7c5f4a' });
    line(c, 44, 232, 44, PY, 2.5, '#555'); line(c, 226, 232, 226, PY, 2.5, '#555');
    const plat = box(f, { left: 36, top: PY, width: 198, height: 8, background: '#555', zIndex: 3 }); box(f, { left: 38, top: PY - 20, width: 4, height: 22, background: '#777' }); box(f, { left: 226, top: PY - 20, width: 4, height: 22, background: '#777' });
    const bucket = box(f, { left: 196, top: PY - 14, width: 22, height: 15, background: '#3b7ddd', borderRadius: '3px 3px 7px 7px', zIndex: 3 });
    const sq = attach(P, P.P.afw, '<rect x="84" y="176" width="58" height="9" rx="3" fill="#444"/><rect x="108" y="184" width="6" height="14" fill="#444"/>');
    const star = box(f, { left: 196, top: 286, width: 22, height: 22, opacity: 0, zIndex: 4 }); star.innerHTML = '<svg width="22" height="22" viewBox="0 0 14 14"><path d="M7 0 L8.3 5.7 L14 7 L8.3 8.3 L7 14 L5.7 8.3 L0 7 L5.7 5.7Z" fill="#fff"/></svg>';
    const b = bub(120, 130, 'STREAK-FREE|(NEARLY)');
    return (t, d) => {
      enter(P, t, d, { x: 112, y: PY, sy: LY, hs: 0.9, noShadow: true, z: 9000 }); vis(sq, t, d); st(dirt, { scaleX: 1 }, t);
      pose(P, t + 0.1, 0.4, { f: [158, 128] }); swing(P, 'f', [158, 128], [166, 168], 0.45, t + 0.5, 5.6, 0); cyc(P.P.t, { x: -2 }, { x: 3 }, 0.9, t + 0.5, 5.6);
      mv(dirt, { scaleX: 1 }, { scaleX: 0 }, t + 0.4, 5.4, 'steps(8)');
      cyc(plat, { y: 0 }, { y: -2 }, 1.3, t, d); cyc(bucket, { y: 0 }, { y: -2 }, 1.3, t, d);
      tl.fromTo(star, { opacity: 0, scale: 0.2, rotation: 0 }, { opacity: 1, scale: 1.4, rotation: 90, duration: 0.5, yoyo: true, repeat: 1, immediateRender: false }, t + 5.9);
      emo(P, 'happy', t + 5.8); emo(P, 'normal', t + d - 0.5); say(b, t + 5.6, 1.4);
    };
  };

  B.duster_window = (c, info, f) => {   // right top. an older woman dusts out of a first-floor window
    const g = take(info, [12]), LY = 470, ps = u(LY), op = windowFrame(c, f, 1084, 288, 76, 64, { curtains: '#c0392b' });
    box(c, { left: 1096, top: 336, width: 22, height: 18, background: '#b5532e', borderRadius: '3px 3px 8px 8px' }); box(c, { left: 1102, top: 316, width: 12, height: 22, background: '#3a9a4a', borderRadius: '50% 50% 0 0' });
    const duster = attach(g, g.P.afw, '<path d="M112 200 V150" stroke="#8a5a2a" stroke-width="4"/><ellipse cx="112" cy="136" rx="22" ry="26" fill="#e8b22e"/><path d="M96 126 Q112 100 128 126" fill="#f7d44a"/>');
    const puffs = [0, 1, 2].map((k) => box(f, { left: 1168, top: 330, width: 16 + k * 4, height: 16 + k * 4, borderRadius: '50%', background: 'rgba(190,185,170,.8)', opacity: 0 }));
    const b = bub(1122, 190, 'SPRING|CLEAN!');
    return (t, d) => {
      const hs = 1, HY = 298 + (326 - 20) * ps;
      enter(g, t, d, { x: 1120, y: HY, sy: LY, noShadow: true, z: 9000, clip: clipBelow({ Y: HY, sc: ps }, 352) }); vis(duster, t, d);
      pose(g, t + 0.1, 0.4, { f: [172, 60], up: 0 }); swing(g, 'f', [172, 70], [176, 28], 0.2, t + 0.6, 4.6, 0); cyc(g.P.h, { rotation: -4 }, { rotation: 4 }, 0.5, t + 0.6, 4.6);
      emo(g, 'happy', t + 0.5); emo(g, 'normal', t + d - 0.5);
      puffs.forEach((p, k) => { const per = 1.5; tl.fromTo(p, { x: 4 * k, y: 0, scale: 0.4, opacity: 0.8 }, { x: 50 + k * 10, y: 24 + k * 9, scale: 1.7, opacity: 0, duration: per, ease: 'power1.out', repeat: Math.max(0, Math.floor((4.6 - k * 0.25) / per) - 1), immediateRender: false }, t + 0.7 + k * 0.25); });
      say(b, t + 1.2, 3.2);
    };
  };

  B.drone_parcel = (c, info, f) => {   // right top. a drone (a third of an adult wide) lowers a parcel to a first-floor window
    const g = take(info, [11, 0]), LY = 470, ps = u(LY), op = windowFrame(c, f, 1084, 288, 76, 64, { curtains: '#2a7fb8' });
    const dr = box(c, { left: 0, top: 0, width: 50, height: 30, zIndex: 3 }); gsap.set(dr, { scale: 2.0, transformOrigin: '25px 15px' }); box(dr, { left: 14, top: 8, width: 22, height: 10, background: '#444', borderRadius: 5 }); box(dr, { left: 22, top: 18, width: 6, height: 4, background: '#e33', borderRadius: 2 });
    const rot = [0, 36].map((x) => { line(dr, x + 4, 8, x + 13, 10, 2, '#444'); return box(dr, { left: x - 2, top: 3, width: 20, height: 4, borderRadius: '50%', background: 'rgba(60,60,60,.55)' }); });
    const str = box(dr, { left: 24.5, top: 18, width: 1.5, height: 14, background: '#333' });
    const pk = box(dr, { left: 14, top: 32, width: 22, height: 17, background: '#c89a5e', border: '1px solid #7a5a2a' }); box(pk, { left: 9, top: 0, width: 3, height: 17, background: 'rgba(255,255,255,.55)' });
    const b = bub(1150, 196, 'THANKS,|DRONE!');
    return (t, d) => {
      const HY = 298 + (326 - 20) * ps;
      enter(g, t, d, { x: 1122, y: HY, sy: LY, noShadow: true, z: 9000, clip: clipBelow({ Y: HY, sc: ps }, 352) });
      st(pk, { y: 0, x: 0, opacity: 1 }, t); st(str, { height: 14 }, t); 
      mv(dr, { x: 1360, y: 90 }, { x: 1132, y: 126 }, t + 0.2, 2.0, 'power2.out'); cyc(dr, { rotation: -4 }, { rotation: 4 }, 0.6, t + 0.2, 2);
      mv(dr, { x: 1132, y: 126 }, { x: 1132, y: 140 }, t + 2.2, 1.6, 'sine.inOut');
      mv(pk, { y: 0, x: 0 }, { y: 32, x: 0 }, t + 2.2, 1.6, 'sine.inOut'); mv(str, { height: 14 }, { height: 46 }, t + 2.2, 1.6, 'sine.inOut');
      mv(pk, { x: 0, y: 32 }, { x: -50, y: 32 }, t + 3.8, 0.5, 'power1.inOut'); st(pk, { opacity: 0 }, t + 4.3);
      pose(g, t + 3.3, 0.4, { f: [150, 70] }); swing(g, 'f', [160, 36], [170, 64], 0.25, t + 4.0, 3.2);
      emo(g, 'happy', t + 3.8); emo(g, 'normal', t + d - 0.4);
      mv(dr, { x: 1132, y: 140 }, { x: 1360, y: 70 }, t + 4.2, 2.0, 'power2.in'); st(str, { height: 14 }, t + 4.1);
      say(b, t + 4.4, 3.0);
    };
  };

  B.paper_plane_kid = (c, info, f) => {   // left top. a child leans out of a first-floor window, the paper plane comes back
    const g = take(info, [5, 1]), LY = 470, ps = u(LY) * 0.85, op = windowFrame(c, f, 86, 288, 74, 64, { curtains: '#32a852' });
    const pl = box(f, { left: 0, top: 0, width: 24, height: 14, zIndex: 5 }); gsap.set(pl, { scale: 2.4, transformOrigin: '50% 50%' });
    pl.innerHTML = '<svg width="24" height="14" viewBox="0 0 24 14"><path d="M0 7 L24 0 L16 14Z" fill="#fff" stroke="#8a9bb0" stroke-width=".8"/><path d="M0 7 L16 8 L24 0Z" fill="#dde6f0"/></svg>';
    const b = bub(124, 196, 'LOOK, IT|COMES BACK!');
    return (t, d) => {
      const HY = 300 + (326 - 20) * ps, per = 1.1, n = Math.max(0, Math.floor((d - 1.0) / per) - 1);
      enter(g, t, d, { x: 124, y: HY, sy: LY, hs: 0.85, noShadow: true, z: 9000, clip: clipBelow({ Y: HY, sc: ps }, 352) });
      st(pl, { x: 168, y: 300, opacity: 0 }, t);
      tl.fromTo(pl, { x: 168, opacity: 1 }, { x: 296, duration: per, ease: 'sine.inOut', repeat: n, yoyo: true, immediateRender: false }, t + 0.8);
      tl.fromTo(pl, { y: 300 }, { y: 336, duration: per / 2, ease: 'sine.inOut', repeat: 2 * n + 1, yoyo: true, immediateRender: false }, t + 0.8);
      tl.fromTo(pl, { rotation: -20, scaleX: 2.4 }, { rotation: 25, scaleX: -2.4, duration: per, ease: 'sine.inOut', repeat: n, yoyo: true, immediateRender: false }, t + 0.8);
      pose(g, t + 0.3, 0.3, { f: [166, 76] }); swing(g, 'f', [170, 40], [176, 80], per / 2, t + 0.8, d - 1.4); cyc(g.P.h, { rotation: -6 }, { rotation: 6 }, 0.5, t, d - 0.6);
      emo(g, 'happy', t + 0.4); emo(g, 'normal', t + d - 0.4); say(b, t + 1.4, 3.6);
    };
  };

  // ---------- build + schedule ----------
  window.ukGags = function (w, o) {
    o = o || {}; const T = o.T || 0, D = o.D || LOOP;
    const layer = box(w, { left: 0, top: 0, width: W, height: H, overflow: 'hidden', pointerEvents: 'none' });
    POOL.length = 0; AL = box(layer, { left: 0, top: 0, width: W, height: H, zIndex: 2 }); FL = box(layer, { left: 0, top: 0, width: W, height: H, zIndex: 3 }); BL = box(layer, { left: 0, top: 0, width: W, height: H, zIndex: 4 });
    const COST = {}; const order = DEF.slice().sort((a, b) => a[2][0] - b[2][0]);
    order.forEach(([name, d, ts]) => {
      const c = box(layer, { left: 0, top: 0, width: W, height: H, opacity: 0, zIndex: 1 }), f = box(FL, { left: 0, top: 0, width: W, height: H, opacity: 0 });
      const n0 = tl.getChildren(true, true, true).length, play = B[name](c, { name, d, ts }, f);
      for (let k = 0; T + k * LOOP < T + D; k++) {
        ts.forEach((t0) => { const t = T + k * LOOP + t0; if (t < T + D - 0.5) { fade(c, t, d); if (f.childNodes.length) fade(f, t, d); play(t, d); } });
      }
      COST[name] = tl.getChildren(true, true, true).length - n0;
    });
    window.ukGags.last = { layer, pool: POOL, cost: COST };
    return { layer, pool: POOL };
  };
  window.ukGags.list = LIST; window.ukGags.loop = LOOP;
})();
