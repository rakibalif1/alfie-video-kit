# MOTION PLAYBOOK for the SVG + GSAP puppet rig (W1)

Legend: [S#] = backed by source link in section (f). [E] = engineering recipe from standard animation practice, tuned for our rig; NOT verified by any single source, so tune by eye. I cannot watch video, only frames and code. Assume 30 fps (1 frame = 0.033 s). Angles are GSAP `rotation` degrees; positive = clockwise.

## (a) Idle cycle (never frozen, never busy)
- Breath: 14-16 per minute = period 3.8-4.2 s. Real adults rest at 12-20/min [S4]. Chest/torso scaleY 1.012-1.018 (about 1.5%), shoulders rise 1.0-1.5 px (at s=1), head rises 0.6 px, delayed 0.2-0.3 s after chest. Ease `sine.inOut`, inhale slightly shorter (1.7 s) than exhale (2.2 s) [E].
- Weight shift: every 6-9 s (random in that range), 0.9-1.4 s long, ease `power2.inOut`. Pelvis x shifts 3-5 px toward the support leg, torso counter-leans 1-1.5 deg. HOLD 3-5 s before the next shift. A shift is a one-way move with a hold, NOT a continuous yoyo [E, moving-hold idea S5].
- Contrapposto: hip line tilts 2-3 deg toward the unloaded leg; shoulder line tilts the OPPOSITE way by 1.5-2.5 deg; head tilts back toward the hip side by 1-2 deg; unloaded leg knee bends (foot rotates 3-5 deg, heel lifted 1-2 px). Never mirror left and right [S6, E].
- Head micro motion: 1-2 px drift and 0.5-1.5 deg tilt every 2-4 s, period different from the breath (use 2.9 s vs 4 s so they never lock in phase) [E].
- Arms in idle: hang with elbows 8-14 deg bent, upper arm 3-6 deg out; left and right out of phase by 0.6-1.2 s; amplitude 1.5-3 deg only (current rig uses 6 deg, too much) [E].
- Blink: rate 15-20 per minute at rest, 26-32 in conversation [S3]. So one blink every 2-4 s while talking, 3-5 s while listening. Duration 100-150 ms is typical, up to 400 ms reported [S3]. Recipe: close 3 frames (0.1 s, `power2.in`), hold 1 frame, open 4 frames (0.13 s, `power2.out`), total about 0.25 s. Rig currently uses 0.07 s close and 0.07 s open = too snappy [E].
- Double blink: 15-20% of blinks, second one 0.25-0.4 s after the first [E]. Blink on head turns, on topic changes and at the end of sentences (a blink hides the eye jump [S2]).
- Eye darts: every 1.5-4 s a 1-3 px iris shift, 2-3 frames, `power3.out`, then HOLD. Look away (up-side) when "thinking" at sentence start, return to the listener at sentence end. Listener looks at speaker, with a dart to the other character every 3-5 s [E, S5 lists eye darts as a moving-hold category].

## (b) Gesture vocabulary (shoulder = upper arm angle from hanging, elbow = extra forearm bend; for the rig, negative = forward/up as in api.arm)
Phases for EVERY gesture: ANTICIPATION (small opposite move, 0.10-0.15 s, 3-6 deg back, `power1.in`) -> STROKE (fast, 0.18-0.30 s, `power3.out`) -> OVERSHOOT (extra 8-15%, 0.10 s, `back.out(1.4)` or a 2-key overshoot) -> HOLD (0.35-0.8 s, with 1-2 deg moving hold) -> SETTLE (0.4-0.6 s back to idle, `power2.inOut`, with 1 small rebound of 2-3 deg) [S1, S5, E]. Stagger: shoulder starts t, elbow t+0.07 s (2 frames), wrist/hand t+0.10-0.13 s (3-4 frames); hand finishes last [S1, S6].
- Beat (emphasis on a stressed word): forearm only, elbow 25 deg down-and-up, 0.12 s down, 0.18 s up, `power2.out` / `power2.in`; shoulder 5 deg. Land the down-beat ON the stressed syllable. 1 beat per phrase, not per word [E].
- Open palm (explain, offer): shoulder -35 to -50, elbow -55 to -75, palm turns up (hand rotation 20-30 deg), `back.out(1.4)`, hold 0.6 s.
- Point (to something): shoulder -70 to -90, elbow -5 to -15 (nearly straight); anticipation: pull back 8 deg first; overshoot 6 deg; hold 0.8-1.2 s; head and eyes arrive BEFORE the hand (see c).
- Count on fingers: forearm up, elbow -95, shoulder -20; each count = tiny 4 deg snap of the hand, 0.35-0.5 s apart, `back.out(2)`; show 1, 2, 3 by swapping hand shapes if available.
- Shrug: shoulders rise 6-8 px over 0.18 s (`power2.out`), elbows out 12-18 deg, palms open, head tilts 4-6 deg and drops 2 px, mouth corners down; hold 0.5 s; release 0.5 s with a small 2 px undershoot.
- Hands to chest ("I", "me", sincerity): shoulder -25, elbow -105 (hand reaches sternum), `power2.out` 0.35 s, hold 0.8 s, tiny nod 3 deg.
- Arms crossed: both elbows -110, hands tuck to opposite elbows, 0.5 s `power2.inOut`; torso leans back 1.5 deg; hold for the whole beat of the line; breath continues.
- Wave: shoulder -100, elbow -70; forearm waves +/-18 deg, 4-6 swings at 0.22 s each (`sine.inOut`), amplitude decaying 100% to 60%; wrist leads the swing by 3 frames; ends with settle.
- Emphasis (big): both arms, shoulder -60, torso lean forward 2-3 deg + head drop 4 px on the stress, anticipation: chest rises 1.5% inhale 0.2 s before.
- Overlapping action: forearm lags upper arm 2-4 frames, hand lags forearm 2-4 frames more [S1, S6]. Hair/cloth drag: dr (saree pallu, dupatta, hijab end, gele tie) starts 4-6 frames after the torso moves, overshoots 1.5x the body rotation and takes 0.6-0.9 s to settle (`elastic.out(1, 0.5)` at small amplitude, or two `sine` swings 100%/40%) [E]. Heavier = more lag (kaftan sleeves, saree) [S1].
- Easing names to use: ease-out for strokes (`power2.out`, `power3.out`), ease-in-out for settles (`power2.inOut`, `sine.inOut`), `back.out(1.4)` for overshoots, `elastic.out(1,0.5)` ONLY for cloth/hair, never `none` (linear) except walking translation. Do not put two ease-ins back to back [S6].
- Do NOT use yoyo for gestures (it makes the return a mirror of the way out). Return on a different path, slower than the stroke (stroke 0.25 s, settle 0.5 s) [E].

## (c) Turning to look (staggered)
- Order and offsets (typical for a gaze shift to a visual target, eyes lead; variation per person [S2]): t+0.00 anticipation blink or eyes dart (iris shifts 3-4 px, `power3.out`, 0.08 s); t+0.06-0.10 head starts (rotation 8-15 deg toward target, 0.35-0.45 s, `power2.inOut`, a 1-2 px chin dip during the move gives an arc [S2]); t+0.12-0.18 torso follows (rotation 3-5 deg, 0.5-0.6 s); t+0.2-0.3 pointing arm/shoulder if any; feet/pelvis last, shift 3 px (0.7 s). Everything ends in the reverse order, eyes arrive first, torso last: overlap of 0.1-0.2 s.
- Head overshoots its target by 1-2 deg then settles back in 0.15 s; torso undershoots. Add a blink at the end 40% of the time.
- Our flat front-facing puppet cannot truly turn: fake a turn by head rotation 6-10 deg + x shift 3-5 px of the whole face group toward the target + squash the far-side ear/cheek; do not go beyond 12 deg [E].

## (d) Lip-sync
- Viseme set, 6 shapes (Rhubarb basic set A-F) [S7]: A closed (P B M, also pause X relaxed); B slightly open, teeth clenched (K S T, EE); C open (EH, AE); D wide open (AA); E rounded (AO, ER); F puckered (UW, OW, W). Optional: G teeth on lower lip (F, V); H tongue up (long L); X idle. Use C as in-between for A/B to D and E for C/D to F, so the mouth never jumps [S7]. Adobe Character Animator uses 11 audio-driven visemes (Neutral, Ah, D, Ee, F, L, M, Oh, R, S, Uh, W-Oo) as a bigger set [S8, from search snippet].
- Rig mouth map for our IMOUTH paths [E]: A=smile (closed line), B=grin narrow, C=open, D=laugh path (widest) at 70% scale, E=o, F=o narrowed (scaleX 0.7), X=smile.
- Audio sync rules: generate cues from the real audio, not random (current api.talk picks a RANDOM shape every 0.15 s). Free tool: Rhubarb Lip Sync (open source, outputs timed A-H,X cues as TSV/JSON) [S7]; offline fallback: sample the wav RMS envelope every 33 ms from the Kokoro file in Python, map level to shapes: <2% X, 2-8% B/C, 8-18% C, 18-35% D, with F/E where the vowel is round (use word text) [E]. UNVERIFIED: I did not install or test Rhubarb here.
- Rules [S9, E]: hit the primary opens and closes first; hold each shape at least 2 frames (0.07 s), usually 3-5 frames (0.1-0.17 s); no shape change faster than 0.06 s; closed mouth A on every M/B/P; shapes appear about 1-2 frames BEFORE the sound (mouth leads audio); on pauses > 0.15 s go to X. Mouth timing should look right even with sound muted [S9].
- Head and brows: on each stressed word nod 2-4 deg and drop 2-3 px (0.12 s down `power2.out`, 0.25 s up), no nod on unstressed words; eyebrows raise 2-3 px on questions and new information (0.1 s up, hold 0.4 s); a blink at the start of a new sentence; nods no more than one per 0.6 s [E].

## (e) Eight reasons rigs look robotic and the fix
1. Constant speed, abrupt stops: use ease-out strokes, ease-in-out settles, vary durations 0.2-0.6 s [S6].
2. No anticipation/overshoot: add 3-6 deg back-move before and 8-15% overshoot after every stroke [S5, S6].
3. All joints move at once: stagger shoulder, elbow, hand by 2-4 frames; head after eyes; torso last [S1, S6].
4. Mirror or yoyo symmetry (paper doll): different left and right phases, asymmetric poses, return paths slower than the way out [S6].
5. Never holding: gestures and idle should alternate move and hold (0.3-1 s holds) with tiny moving holds; "too much motion looks floaty, too little looks dead" [S5].
6. No weight: bodies need pelvis shift, torso counter-lean, shoulder tilt, foot planted; feet must never slide or rotate with the body [E].
7. Random or fixed-rate mouth, no emphasis: audio-driven visemes, nods on stress, brows on questions (see d) [S7, S9].
8. Everything loops at the same period: pick incommensurate periods (breath 3.9 s, sway 7.3 s, head 2.9 s, blink random 2-5 s) and random per-character phase offsets [E].

## (f) Sources
- S1 Follow through and overlapping action (Wikipedia): https://en.wikipedia.org/wiki/Follow_through_and_overlapping_action
- S2 Animation Mentor, overlap/head-eye (and ICMI12 Andrist paper on head-eye coordination): https://www.animationmentor.com/?p=87279 and https://pages.cs.wisc.edu/~bilge/pubs/2012/ICMI12-W-Andrist.pdf
- S3 Blink rate patterns (1997): https://pubmed.ncbi.nlm.nih.gov/9399231/ (rest 17, conversation 26, reading 4.5 per min) and 2022 wearable study https://pmc.ncbi.nlm.nih.gov/articles/PMC9927758/ (conversation 32.4 per min)
- S4 Respiratory rate (12-20 breaths/min): https://www.mayoclinic.org/how-to-measure-respiratory-rate/art-20482580
- S5 Moving holds (AnimSchool / Animation Mentor): https://blog.animschool.edu/?p=858 and https://animationmentor.com/blog/why-all-animators-need-to-master-the-moving-hold
- S6 Why animation looks stiff (RebusFarm, Jitter easing, AnimSchool overlap in the body): https://rebusfarm.net/blog/follow-through-and-overlapping-action-the-animation-principle-that-prevents-stiff-motion , https://help.jitter.video/en/articles/16072578-fix-robotic-animations-with-the-right-easing-curve , https://blog.animschool.edu/2018/01/23/loosening-up-animation-with-overlap-in-the-body/
- S7 Rhubarb Lip Sync mouth shapes A-H, X (read directly): https://github.com/DanielSWolf/rhubarb-lip-sync
- S8 Adobe Character Animator visemes (only seen in search snippets; page blocked in this sandbox): https://www.adobe.com/learn/adobe-character-animator/web/lip-sync-mouth-shapes
- S9 Lip sync tips (Pluralsight, Toon Boom): https://www.pluralsight.com/blog/film-games/proven-tips-animating-believable-lip-sync , https://learn.toonboom.com/modules/lip-sync-animation1/topic/phrasing-and-lip-syncing
- Not reachable here (domain blocked): en.wikipedia.org fetch, adobe.com fetch, schoolofmotion.com fetch. Search snippets only. Nothing found specific to Kurzgesagt/TED-Ed methods, Spine/Rive/DragonBones/Moho pages, so no claims are made about them.

## Why ours looks unnatural (from frames + illus.js)
Frames (/home/user/jobguide/out/illustrated_test_frames.jpg, viewed): the three characters stand frontal, feet together, arms hanging straight, legs are plain columns (no hip tilt, no knee, no weight on one leg), identical posture in all 4 frames; in frame 2 Emma's arm is a stiff straight horizontal bar. Faces show an almost fixed smile line. They are 5-8x taller than the street pedestrians, so scale reads wrong (a separate fix for the background workers).
Code:
- api.breathe: scaleY 1.014 at 3.4 s period (17.6/min, ok) but ALL parts yoyo with sine.inOut, torso/head/arms/cloth each at near-identical 2-3 s periods = phase-locked "swaying robot". Arms swing +/-6 deg continuously (too large); there is no weight shift hold, no hip/leg motion at all (legs only move in api.walk).
- api.blink: first blink at T+1.3 then every 2.6-5.0 s, close 0.07 s + open 0.07 s, linear default ease (too fast, mechanical); double blink 20% ok. Rate 12-23/min is fine for rest, a bit low for conversation.
- api.talk: mouth shape is RANDOM every 0.15 s from 5 paths, not tied to audio, so lips move during pauses and do not close on M/B/P. Head nod every 0.55-0.85 s on a timer, not on stressed words, rotation random +/-2.5 deg.
- api.gesture: shoulder and forearm tweened with the same start and same duration (no 2-4 frame lag), `sine.inOut` everywhere (no anticipation, no overshoot except a +14 deg bump), return is a straight slow slide to -5/-8, arm angles up -45..-85 with bend -30..-80 chosen randomly with no meaning (no point/open palm/count), no hand rotation, cloth (dr) does not react, torso rotation only +/-2 deg, feet never adjust. Every third gesture uses the back arm: same timing as the front arm.
- api.look: only moves the irises 0.3 s `power2.out`; no head/torso follow and no blink, so a look never reads as a turn.
