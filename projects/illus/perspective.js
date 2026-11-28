// perspective.js - ONE shared ground plane. Everything that stands on the ground (heroes, pedestrians, vehicles, furniture) takes its size from scaleAt(y).
// Calibration: a hero (illus rig at native s=1.0, 330 px tall = 46% of the 720 frame) stands at y=700.  scaleAt(700)=1.0, 620->0.80, 540->0.60, 520->0.55, 483->0.46.
// Needs kit.js (box). Load BEFORE bg_street.js.
(function () {
'use strict';
const GROUND = { horizon: 470, front: 720, heroY: 700, heroH: 330, slope: 0.0025, hazeBelow: 560, haze: 0.12 };
window.GROUND = GROUND;
// size factor at ground line y (linear in y, 1.0 at the hero line)
window.scaleAt = (y) => Math.max(0.3, 1 + (y - GROUND.heroY) * GROUND.slope);
// painter's order: larger y (nearer) draws later
window.zFor = (y) => Math.round(y * 10);
// pixel height of an average standing person at ground y
window.personPx = (y) => GROUND.heroH * window.scaleAt(y);
// 12% haze for anything farther than y=560 (used by bg_street as one soft band over the far half of the road)
window.hazeFor = (y) => (y < GROUND.hazeBelow ? GROUND.haze : 0);
// soft contact shadow centred on (x,y) for a thing with size factor s. ellipse is wide and flat; slightly softer + wider with depth
window.contactShadow = (parent, x, y, s, o) => {
  o = o || {}; const rx = (o.rx || 46) * s, ry = (o.ry || 7) * s, op = o.op === undefined ? 0.34 : o.op;
  return box(parent, { left: x - rx, top: y - ry * 0.55, width: rx * 2, height: ry * 2, borderRadius: '50%', zIndex: o.z === undefined ? 0 : o.z,
    background: `radial-gradient(ellipse at 50% 50%, rgba(22,18,34,${op}) 0%, rgba(22,18,34,${(op * 0.55).toFixed(3)}) 52%, rgba(22,18,34,0) 72%)` });
};
// remove the rig's own flat shadow ellipse so only the shared contact shadow is drawn
window.dropRigShadow = (api) => { const e = api.g.querySelector('svg > ellipse'); if (e) e.remove(); return api; };
})();
