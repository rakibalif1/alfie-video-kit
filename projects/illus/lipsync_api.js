// lipsyncAttach(api, P, mouth): adds api.lipsync(cues, T) to a rig from illus(). Paste into illus.js after api.speak
// (replaces api.speak / api.talk for spoken lines). Needs the globals tl (gsap timeline) as everywhere in illus.js.
// cues = [{t, shape:'A'..'F', s?:1}] from out/lipsync.py (t relative to the line start); T = line start on the timeline.
// Shapes: A closed, B small, C open, D wide, E round, F pucker. Mouth leads the audio by 0.04 s, every shape is held >= 0.07 s.
function lipsyncAttach(api, P, mouth) {
  const MP = { // paths drawn in the same 100x100 head box as IMOUTH (C = IMOUTH.open, A = IMOUTH.smile)
    A: 'M42 77 Q50 82 58 77',
    B: 'M43 76.5 Q50 81 57 76.5 Q50 78 43 76.5Z',
    C: 'M43 76 Q50 88 57 76 Q50 73 43 76Z',
    D: 'M41.6 74.6 Q50 91.4 58.4 74.6 Q50 77.4 41.6 74.6Z',   // IMOUTH.laugh scaled 0.7 about (50,76)
    E: 'M46.5 77 Q50 83 53.5 77 Q50 74 46.5 77Z',             // IMOUTH.o
    F: 'M47.4 77 Q50 83 52.6 77 Q50 74 47.4 77Z' };            // IMOUTH.o, scaleX 0.7
  const LEAD = 0.04, HOLD = 0.07;
  // brows live in the head svg next to the mouth: ids are <headid>_bl / <headid>_br (mouth id is <headid>_m)
  const bid = mouth.id.slice(0, -1), root = mouth.ownerSVGElement || mouth.parentNode;
  const brows = ['bl', 'br'].map((k) => root.querySelector('#' + bid + k)).filter(Boolean);
  let nodSide = 1;
  api.lipsync = (cues, T, o = {}) => {
    if (!cues || !cues.length) return;
    const lead = o.lead ?? LEAD, hold = o.hold ?? HOLD;
    let last = null, lastT = -9;
    cues.forEach((c, i) => {
      const nxt = cues[i + 1], shape = MP[c.shape] ? c.shape : 'A';
      let t = T + c.t - lead;
      if (shape === last) { if (c.s) stress(t); return; }
      if (t - lastT < hold) { // too soon after the previous change: push to the end of its hold, or drop if the next cue arrives first
        const te = lastT + hold;
        if (shape !== 'A' && nxt && T + nxt.t - lead <= te) { if (c.s) stress(te); return; }
        t = te;
      }
      tl.set(mouth, { attr: { d: MP[shape] } }, t); last = shape; lastT = t;
      if (c.s) stress(t);
    });
    const end = T + cues[cues.length - 1].t - lead;
    if (last !== 'A') tl.set(mouth, { attr: { d: MP.A } }, Math.max(end, lastT + hold));
    function stress(t) { // nod on a loud peak, brows up for a moment (leads the sound like the mouth)
      if (o.nod === false) return;
      const r = 2.2 * nodSide; nodSide = -nodSide;
      tl.to(P.h, { y: 2.4, rotation: r, duration: 0.1, ease: 'power2.out' }, t);
      tl.to(P.h, { y: -0.4, rotation: 0, duration: 0.3, ease: 'sine.inOut' }, t + 0.12);
      brows.forEach((b) => { tl.to(b, { y: -3, duration: 0.08, ease: 'power2.out' }, t); tl.to(b, { y: 0, duration: 0.25, ease: 'sine.inOut' }, t + 0.3); });
    }
  };
  return api;
}
if (typeof module !== 'undefined') module.exports = { lipsyncAttach };
