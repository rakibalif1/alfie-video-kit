// Retargets Quaternius "Universal Animation Library" clips (CC0, Rigify-style DEF- bones) onto a VRM character.
// Both rigs start from a T-pose facing +z. We copy each bone's world-space rotation change from rest, per frame.
export function makeRetargeter(THREE, gltf, vrm, flip) {
  const root = gltf.scene, byName = {}; root.traverse((o) => { byName[o.name] = o; });
  const map = { hips: 'DEF-hips', spine: 'DEF-spine001', chest: 'DEF-spine002', upperChest: 'DEF-spine003', neck: 'DEF-neck', head: 'DEF-head' };
  for (const [S, s] of [['left', 'L'], ['right', 'R']]) {
    Object.assign(map, { [S + 'Shoulder']: `DEF-shoulder${s}`, [S + 'UpperArm']: `DEF-upper_arm${s}`, [S + 'LowerArm']: `DEF-forearm${s}`, [S + 'Hand']: `DEF-hand${s}`,
      [S + 'UpperLeg']: `DEF-thigh${s}`, [S + 'LowerLeg']: `DEF-shin${s}`, [S + 'Foot']: `DEF-foot${s}`, [S + 'Toes']: `DEF-toe${s}` });
    for (const [F, f] of [['Index', 'index'], ['Middle', 'middle'], ['Ring', 'ring'], ['Little', 'pinky']]) ['Proximal', 'Intermediate', 'Distal'].forEach((seg, i) => { map[S + F + seg] = `DEF-f_${f}.0${i + 1}.${s}`.replace(/\./g, ''); });
    ['Metacarpal', 'Proximal', 'Distal'].forEach((seg, i) => { map[S + 'Thumb' + seg] = `DEF-thumb.0${i + 1}.${s}`.replace(/\./g, ''); });
  }
  const pairs = [];
  for (const [v, s] of Object.entries(map)) { const node = vrm.humanoid.getNormalizedBoneNode(v), src = byName[s.replace(/\./g, '')]; if (node && src) pairs.push({ v, node, src }); }
  const depth = (n) => { let d = 0; for (let o = n; o.parent; o = o.parent) d++; return d; };
  pairs.sort((a, b) => depth(a.node) - depth(b.node));
  const mixer = new THREE.AnimationMixer(root), clips = Object.fromEntries(gltf.animations.map((a) => [a.name, a])), acts = {};
  let current = null;
  const setClip = (name, t) => {
    if (current !== name) { mixer.stopAllAction(); acts[name] = acts[name] || mixer.clipAction(clips[name]); acts[name].reset().play(); current = name; }
    mixer.setTime(t); root.updateMatrixWorld(true);
  };
  setClip('A_TPose', 0);
  const rest = {}, qa = new THREE.Quaternion();
  for (const p of pairs) rest[p.v] = p.src.getWorldQuaternion(new THREE.Quaternion()).clone();
  const srcHips = byName['DEF-hips'], restHipsPos = srcHips.getWorldPosition(new THREE.Vector3()).clone();
  const vHips = vrm.humanoid.getNormalizedBoneNode('hips'), vRestPos = vHips.position.clone(), ratio = vRestPos.y / restHipsPos.y;
  const has = (n) => !!clips[n];
  return {
    has, clipNames: Object.keys(clips), duration: (n) => clips[n].duration,
    // returns { q: {bone: local Quaternion}, hips: Vector3 } for clip `name` at time t (loops)
    sample(name, t) {
      const d = clips[name].duration; setClip(name, ((t % d) + d) % d);
      const world = new Map(), q = {};
      for (const p of pairs) {
        const delta = p.src.getWorldQuaternion(new THREE.Quaternion()).multiply(qa.copy(rest[p.v]).invert());
        if (flip) { delta.x = -delta.x; delta.z = -delta.z; }
        const parentW = world.get(p.node.parent) || new THREE.Quaternion();
        world.set(p.node, delta); q[p.v] = parentW.clone().invert().multiply(delta);
      }
      const dp = srcHips.getWorldPosition(new THREE.Vector3()).sub(restHipsPos).multiplyScalar(ratio); if (flip) { dp.x = -dp.x; dp.z = -dp.z; }
      return { q, hips: vRestPos.clone().add(dp), rest: vRestPos };
    },
    // writes a (possibly blended) pose to the character
    apply(a, b, u) {
      for (const p of pairs) { const out = b && u > 0 ? a.q[p.v].clone().slerp(b.q[p.v], u) : a.q[p.v]; p.node.quaternion.copy(out); }
      vHips.position.copy(b && u > 0 ? a.hips.clone().lerp(b.hips, u) : a.hips);
    },
  };
}
