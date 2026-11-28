# TOOLS REPORT (W1): free tools to raise quality of our code-made 2D character videos

Method: web search plus fetch of project pages. Nothing was installed or run (as instructed), so every "works on our box" statement is UNTESTED. I have no shell in this session (only search/fetch/read/write), so sizes I could not read from a page are marked UNVERIFIED. Blocked from this sandbox (could not fetch): en.wikipedia.org, adobe.com, kenney.nl, openpeeps.com, alphacephei.com (Vosk), api.github.com (403). Facts from those come only from search snippets.

## RECOMMENDED SHORTLIST (max 4, in order)
1. Rhubarb Lip Sync: replaces our random mouth with audio-driven visemes. Biggest visible gain per hour of work.
2. faster-whisper (tiny or base, int8): pronunciation QA loop for "UK", "SIM" and other words (transcribe the Kokoro wav, compare to the `say` text).
3. Audio-envelope fallback lip-sync (no install, numpy only), used if Rhubarb cannot be downloaded in this sandbox.
4. HyperFrames agent skills (/hyperframes, /hyperframes-registry, /style-sampling): our renderer's own Apache-2.0 skill pack; gives pattern blocks and render-failure recovery. Low effort if the coder's environment already has npx.
Not recommended now: Rive, Spine, Inochi2D, Theatre.js, CMU mocap (cost/effort or licence/account problems, see below).

## Ranked candidates (value-for-effort)

### 1. Rhubarb Lip Sync
- Gives: from a wav/ogg, timed mouth cues A-F plus G, H, X (same set as in MOTION_PLAYBOOK d). Formats: tsv (default), json, xml, dat. Dialog file option (`-d`) takes the spoken text and improves recognition; we have the `say` field, so always pass it. Source: README (read directly) https://github.com/DanielSWolf/rhubarb-lip-sync
- Licence: MIT (LICENSE.md read directly: https://raw.githubusercontent.com/DanielSWolf/rhubarb-lip-sync/master/LICENSE.md). Bundled CMU Sphinx US English acoustic model is BSD-2-clause-like; keep notices. Generated lip-sync data belongs to us.
- Size: UNVERIFIED (release page lists 5 assets, names and sizes not visible to me; latest tag 1.14.0, dated 03 Apr, year not shown). Linux build exists per README. Check assets at https://github.com/DanielSWolf/rhubarb-lip-sync/releases
- CPU: command-line tool, one worker thread per core by default; use `--threads 1` while other workers run. No speed benchmark published; clips of 5-20 s should be seconds (UNVERIFIED estimate). English only for the default recogniser (good: Kokoro bf_isabella is English).
- Install: `mkdir -p /tmp/rhubarb && cd /tmp/rhubarb && curl -L -o r.zip <Linux asset URL from releases page> && unzip r.zip` (needs the res/ folder next to the binary).
- 3-line test:
  `printf 'First, check your visa conditions.' > /tmp/rhubarb/d.txt`
  `/tmp/rhubarb/rhubarb -f json -d /tmp/rhubarb/d.txt --extendedShapes GX -o /tmp/rhubarb/cues.json line.wav`  (X is on by default; check that the flag spelling matches `rhubarb --help`)
  `python3 -c "import json;print(json.load(open('/tmp/rhubarb/cues.json'))['mouthCues'][:6])"`  then map A..H,X to our IMOUTH paths and emit `tl.set(mouth,{attr:{d}},cue.start)` per cue.

### 2. faster-whisper (pronunciation QA)
- Gives: speech-to-text on our TTS output so we can check that the voice said "U K" and "sim" the way we meant (compare transcript with `say`). Word timestamps (`word_timestamps=True`) also give word boundaries for nods and gestures.
- Licence: MIT (read from https://github.com/SYSTRAN/faster-whisper).
- Size: tiny/base models are downloaded from Hugging Face on first use (size UNVERIFIED; the tiny multilingual model is of the order of 75 MB in my memory, not checked). Needs huggingface.co to be reachable from the sandbox: UNVERIFIED. Fallback: copy model files from a machine that can reach it.
- CPU: README benchmark is for the small model, 13 min audio, 8 threads i7-12700K: int8 1m42s, 1.5 GB RAM. Tiny is much smaller; a 16 s clip should take a few seconds on 4 cores (estimate, UNVERIFIED).
- Install: `/tmp/alfie-test/venv/bin/pip install faster-whisper`
- 3-line test:
  `from faster_whisper import WhisperModel`
  `m=WhisperModel("tiny.en",device="cpu",compute_type="int8"); seg,_=m.transcribe("line.wav",word_timestamps=True)`
  `print(" ".join(w.word for s in seg for w in s.words))`
- Caveat: Whisper "hears" what it expects, so it can hide a bad pronunciation. Use it to catch gross errors (spelled-out letters vs a word), and keep a human or listening check for the rest. Vosk (small English model, Apache) is an alternative: could not verify its size or licence here (alphacephei.com blocked).

### 3. Audio-envelope lip-sync fallback (no download)
- Gives: mouth-open amount from the wav RMS (every 33 ms) mapped to shapes C/D/B/X with minimum holds; better than random, worse than Rhubarb (cannot tell M/B/P closures or round vowels without text).
- Licence/size: our own code, numpy + wave module only (numpy is probably in the venv; UNVERIFIED).
- Test: `python3 -c "import wave,numpy as n;w=wave.open('line.wav');a=n.frombuffer(w.readframes(w.getnframes()),n.int16)/32768;r=w.getframerate()//30;print([round(float(n.sqrt((a[i:i+r]**2).mean())),3) for i in range(0,len(a),r)][:30])"`

### 4. HyperFrames skills (our renderer's agent pack)
- Gives: 9 published skills: /hyperframes, /hyperframes-cli (render failure recovery), /hyperframes-registry (about 450 ready-made blocks and components), /media-use (music, voiceover, transcripts), /style-sampling, /reverse-any-video, /figma, /slideshow, /remotion-to-hyperframes. Source: https://github.com/heygen-com/hyperframes
- Licence: Apache 2.0, no per-render fees (read from the repo page).
- Size/CPU: text skill files, no GPU. Needs node/npx.
- Install: `npx hyperframes skills update`  or  `npx skills add heygen-com/hyperframes --all`  or  `claude plugin marketplace add heygen-com/hyperframes && claude plugin install hyperframes@hyperframes`
- 3-line test: `npx hyperframes init /tmp/hf-demo` ; open its generated HTML; compare how its registry blocks handle easing/typography vs ours.
- Other skill lists found (third-party directories, not verified): Remotion official skills `npx skills add remotion-dev/skills` (React based, different renderer, so only useful for ideas); community directories claudemarketplaces.com, skills.sh, skillsmp.com. I did not find a single "awesome claude skills" list that I could confirm. Nothing found for 2D character animation specifically.

### 5. Open Peeps (CC0 hand-drawn people parts)
- Gives: mix-and-match SVG heads/bodies/poses; could provide background pedestrians in ONE consistent style. Per search snippets and its own site: CC0, free for commercial use, no attribution required (https://openpeeps.com; site fetch blocked for me, so UNVERIFIED first hand).
- Concerns: black-line hand-drawn style does not match our flat puppet; the real fix for the "different size and style pedestrians" complaint is to draw pedestrians with the SAME rig at smaller scale (see scale system task). Use only if you want a different look. Not rigged for animation (static poses).
- Other packs: unDraw allows commercial use but forbids redistributing assets in packs and AI training use (https://undraw.co/license). Humaaans licence is contradictory across sources (CC0 vs "free for commercial" vs CC BY-NC): do NOT use until checked on the creator's page. Kenney (CC0 from my memory) is mostly game sprites: UNVERIFIED, site blocked.

### 6. CMU Graphics Lab Motion Capture Database (mocap to drive the 2D rig)
- Gives: real human walk/gesture joint rotations (BVH/ASF-AMC) that could be projected to 2D angles for shoulder/elbow/hip and baked into GSAP keyframes. Very natural arcs.
- Licence: summaries say free for all uses incl. commercial but not for resale of the data, credit requested; converted copies differ (one FBX copy is CC BY-NC 4.0). Read the official FAQ https://mocap.cs.cmu.edu/resources.php before using. Search snippets only.
- Cost: needs a BVH parser plus a 3D-to-2D projection and retarget (a day of work, not 25 minutes), and talking-head gestures in the DB are few (mostly walking, sports, motions). Mixamo is excluded (needs an Adobe account). OpenPose (video to pose) is non-commercial only: do not use.

### 7. Theatre.js (keyframe editor + runtime)
- Core @theatre/core is Apache; Studio @theatre/studio is AGPL-3.0, but the final bundle includes only core (README read directly: https://github.com/theatre-js/theatre). Gives a visual graph editor to hand-tune curves. Cost: it would replace/compete with our GSAP timeline and needs a browser GUI session; low value for an agent pipeline.

### 8. Rive / Inochi2D / Spine / DragonBones / Lottie
- Rive: runtime MIT (https://github.com/rive-app/rive-wasm), but writing the shipped .riv needs a free Rive account and free exports show a splash screen: fails our "no accounts" rule. 
- Inochi2D: BSD-2-Clause, real 2D puppet runtime, but written in D; wasm needs a patched druntime/toolchain on Linux (README read: https://github.com/Inochi2D/inochi2d). Too heavy for our HTML/SVG renderer.
- Spine: runtimes need a Spine licence for distribution (informal forum answers: https://en.esotericsoftware.com/forum/d/17246-license-for-runtimes ): excluded (paid).
- DragonBones, Lottie/dotLottie, Motion Canvas, anime.js, SVG rigging libraries: NOT verified (no page fetched). Not needed: our GSAP + SVG rig already has the same capabilities; the quality gap is in the motion data, not the runtime (see MOTION_PLAYBOOK.md).

## Honest gaps
- No tool was run; no download sizes were read; Rhubarb Linux asset name and size, faster-whisper tiny size, Vosk, Lottie, DragonBones, Kenney, Open Peeps site were not verified first hand.
- I cannot hear audio: judging pronunciation or lip-sync quality needs the owner or a transcript check.
- Claim protocol note: my session had no mkdir tool, so I claimed this task by writing /home/user/illus2-job/claims/3_tools_research/owner.txt (non-atomic).
