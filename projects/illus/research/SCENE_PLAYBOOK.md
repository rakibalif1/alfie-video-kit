# SCENE PLAYBOOK (W2, task 2_scene_research)
Tags: [S] = supported by a source (link at bottom, from search snippets only; WebFetch was blocked by the network allow-list, so I read no full pages). [D] = derived by me from perspective geometry for our 1280x720 frame. [H] = practitioner heuristic I am proposing, NOT confirmed by a source: test by eye. I cannot watch or hear video; frame measurements are by eye from the 4-frame sheet (each panel is 640x360, so x2 for real px, error about 20%).

## 1. Perspective and scale (fixes the "pedestrian vs hero size" complaint)
- [S] Horizon line = camera height; far things shrink toward it. Low or eye-level horizon is simpler for character size relations. Feet on the ground plane, with contact shadows, stop characters looking like they float.
- [D] Put horizon at hero eye level. For hero height Hh and feet y=Yf: horizon Yh = Yf - 0.93*Hh. Any standing adult's head top sits on that line at ANY depth; children (0.6-0.75 of adult) sit below it. Quick check for the artist: draw the line, heads must touch it.
- [D] Scale at ground y: s(y) = (y - Yh) / (Yf - Yh). Person height = Hh * s(y) * (0.95..1.05 variation). Nothing is sized by hand, everything comes from its feet y. Use this for pedestrians, vehicles, lamp posts, bins, doors.
- [D] Recommended wide-shot numbers: Hh = 280 px (39% of frame), Yf = 620 (86%), Yh = 360 (50%). Table (adult height by feet y): y=407 far pavement/shop base 50 px | 430: 76 | 470: 118 | 520 (road near lane): 172 | 560 near kerb: 215 | 600: 258 | 620 hero line: 280. So a pedestrian right behind the heroes (y 600) is 92% of hero height, not 17% as in our test.
- [D] Pedestrian-to-hero ratio rule: same feet y = ratio 1.0. Never place a small figure near hero feet y. Small figures only on far pavement/road (y < 470, ratio < 0.42).
- [D] Vehicles: real heights bus 3.0 m, car 1.5 m, van 2.0 m; px per metre = Hh/1.7 * s(y). At road y=470 a bus is about 200 px tall, a car about 100 px.
- [H] Stagger group feet: hero trio at y = 620, 632, 612 (+/-10-20 px), each scaled by s(y), so they sit in the space instead of in a lineup; turn to 3/4 toward the speaker.

## 2. Shot sizes and camera
- [S] Shot types are framed wide / medium (waist up) / close-up (chest up); common practice goes wide first (context) then closer. [S weak] No source gave seconds per shot for explainers; film average is 4-6 s.
- [H] Wide: hero 38-45% of frame height, feet 85-90%. Medium (waist-up): head height 20-24% of frame, eyes at 33-38% from top (rule of thirds), body cropped at the bottom edge. Close-up: head height 45-55%, eyes about 38% from top.
- [H] Dialogue plan for 16 s: wide establishing 2-3 s, then medium singles of 3-4 s on the speaker, one two-shot at the end. Cut on a sentence/clause boundary, never mid-word. Aim for a visible change every 3-5 s, so about 4 shots per 16 s instead of 1.
- [H] Camera moves: slow push-in 3-6% scale over a shot, or a 40-80 px pan; no moves while the speaker gestures strongly. Stage the move with eased gsap, not linear.
- [S] Parallax: foreground moves fastest, background slowest (no source gave ratios). [H] Layers at 1.0 / 0.6 / 0.3 / 0.1 (hero plane / street / buildings / sky).

## 3. Focus control (background must not compete with faces)
- [S] Faking depth of field in 2D = blur on background layers; far objects have less detail, lower contrast and softer lights/darks, and subtle blur beats heavy blur. Busy backgrounds fight the character for attention; keep character sharp and background calmer.
- [H] Background: desaturate 30-40%, lift darks / cut contrast 20-30%, push toward sky colour (atmospheric fade) 15-25% for the far plane. Blur 1.5-2 px wide shots, 3-4 px medium/close. If SVG blur is slow at seek, bake it as a cheap flat tint overlay instead (a semi-transparent gradient rect costs 1 node). Heroes keep full saturation.
- [H] Quiet zone: behind each face a box 1.8x head width by 1.6x head height with no text, no windows, no signs, at most 2 close hues, contrast against skin. Use sky/plain wall/awning shade, not brick or bright signs. Avoid orange/brown/pink brick directly behind brown skin.
- [H] Motion budget: max 3 moving background things near the focus area; max 6-8 background movers on screen overall; far pedestrians walk, but only at 40% of hero speed and with simplified bodies. One "gag" at a time, one per 4-6 s, at the frame edge, never within 200 px of a face or during a key word.
- [H] Any text in the background must be >= 24 px and have a purpose, otherwise remove it (unreadable micro text is noise).

## 4. Colour, light, grounding
- [H] 60-30-10: 60% muted neutrals (sky, pavement, walls), 30% mid-saturation secondary (shops, bus), 10% saturated accent (clothes of the speaker). Max 4-5 hues in the background.
- [S] Contact shadows at feet connect figures to ground. [H] Ellipse under each figure: rx = 18% of height (50 px for 280), ry = 0.18*rx, opacity 0.30, plus a larger soft ellipse (rx 30%, opacity 0.12). Shadow direction follows the sun (sun top right means shadows fall left and slightly forward). Give pedestrians the same shadow, scaled by s(y).
- [H] One shade tone 12-18% darker on the side away from the sun on clothes and skin, same on all figures.
- [H] Pose: weight shift (hip 4-6 px, shoulders counter-tilt 2 deg), head tilt 1-3 deg, arms never hang as straight tubes: elbow bend 10-20 deg at rest; listeners idle-breathe and blink but hold still.

## 5. Captions, pacing, sound
- [S] Captions sit in the lower part inside a safe area; Ofcom says safe caption area of a 14:9 display; one secondary source quotes line height 8% of video height and 90% safe area (unverified). Line length: Channel 4 38 (max 42 factual), Shelter 38, Clearcast 36; max 2 lines.
- [H] Caption band y = 640-700 (89-97%), font 36-40 px (5-5.5%), max 38 chars/line, 2 lines. Hero feet must end above it (Yf=620), so captions never cover legs. Dim the speaker chip into the caption line.
- [S] Music about 10-15 dB below voice (Descript), 9-18 dB (CapCut guide). [H] Street ambience bed at -30 dB under voice, one soft whoosh (-24 dB) per cut at most, no sound on gags.

## 6. British high street (for drawing)
- [S] Victorian shopfront: fascia sign band above shop window; tall windows; upper floors originally residential; slate roofs and timber sash windows typical (Historic England, Building Conservation, Haringey Bruce Grove guide). Haringey says late-Victorian high streets are fairly uniform at THREE storeys: the owner asks us for 2 floors, which is also common in smaller towns: so use shop + 2 upper floors is NOT the same as "2 storeys total". Ask the manager which is meant. Below I assume shop + 2 upper floors total.
- [H] Parts: stallriser (low plinth, 0.4 m), shop window, door recess, fascia 0.5-0.6 m tall with name in plain lettering, pilasters/console brackets at both ends, roll-out awning or fixed canopy, first-floor sash windows (two panes over two, 1.5 m tall, 3-5 per terrace unit), shallower second-floor windows, cornice, parapet or eaves, pitched slate roof (30-40 deg, ridge parallel to street or gable ends), chimney stacks with pots every 2-3 units, TV aerials/satellite dish, downpipes. Pavement furniture: lamp post, post box, bins, bollards, bike stand, A-board, bus stop, zebra/Belisha beacon.
- [D] Heights at the far plane s = 0.18 (px per metre 29.6): shopfront 3.6 m = 107 px | first floor 2.8 m = 83 px | second 2.5 m = 74 px | pitched roof 2.2 m = 65 px | chimney +1.2 m = 36 px. Base y = 407, total 329 px so the ridge is at y = 78 (11% from top) and chimneys y = 42. Buildings span 46% of the frame height at most, sky strip above.
- [H] Vary: 4-6 different facades of 5-7 m width (130-190 px at this plane), 2 roof heights, colour per unit (brick red, cream render, grey, blue-painted), no 5-storey blocks.

# Our frames vs professional practice
Frame observations are by eye from /home/user/jobguide/out/illustrated_test_frames.jpg (1280x720 sheet of four 640x360 frames; coordinates x2 = real).
| # | What I see | Professional practice | Concrete fix with numbers |
|---|---|---|---|
| 1 | Heroes about 350 px tall (50%), pedestrians about 50-65 px (about 15-18%) while standing 30-60 px from hero feet y | Same feet y = same height | Size by s(y) formula; at y=600 adult = 258 px; small figures only y<470 |
| 2 | Vehicles seem about half the height their road position implies (bus about 110 px vs about 200 px) | Props follow the same ground scale | Use px/m = 164.7*s(y); bus 3.0 m, car 1.5 m |
| 3 | Buildings 5-7 storeys, filling about 5-52% of height, windows tiny | 2 floors over shop, ridge about 11% from top | Layout of section 6: ridge y=78, base y=407 |
| 4 | Sky crowded: planes, birds, sun with rays, flags, bunting, a TV-in-window gag, window people | Calm sky, 1 focal event | At most 1 plane or bird flock at a time, no rays behind heads, window people only on far plane at 30% opacity |
| 5 | Background as saturated and contrasty as characters | Background lower saturation/contrast, hero pops | Desaturate 35%, contrast -25%, atmospheric fade 20%; blur 1.5-2 px |
| 6 | Faces sit against windows, shop signs (HSBC, Costa area), bright gele/pink and brick | Quiet zone behind faces | Clear 1.8x head width by 1.6x head height box; plain sky/awning shade |
| 7 | Tiny gag text and speech bubbles (about 10 px) everywhere | Only readable text | Min 24 px, max 1 gag at a time, outside 200 px of faces |
| 8 | Captions (about 45 px, bold white with outline) cover hero legs, feet and pavement crowd | Caption band clear of action | Feet y=620, caption band 640-700, 36-40 px, 2 lines max of 38 chars |
| 9 | No visible contact shadow; feet end on busy pavement/road line (could not verify at this resolution) | Contact + cast shadow | Ellipse rx 50 px, ry 9 px, opacity 0.30 plus soft rx 84 px opacity 0.12 |
| 10 | Three heroes in a straight row with equal spacing, frontal, same feet y, all about 50% height | Triangle staging, overlap, depth | Feet y 620/632/612, scale by s(y), turn 3/4 toward speaker, spacing uneven (30-40%) |
| 11 | Same wide framing in all 4 frames (no medium/close-up) | Shot variety, cut every 3-5 s | 4 shots in 16 s: wide 2.5 s, 3 medium singles 3-4 s, ends on two-shot |
| 12 | Standing poses near-symmetrical, arms hang straight (I cannot judge movement from stills; the owner says it is unnatural) | Weight shift, overlap, holds | Hip shift 4-6 px, head tilt 1-3 deg, elbow bend 10-20 deg, listeners hold still |
| 13 | No shadow/light on characters; flat fills; sun top right but no matching shade | Consistent light | One shade tone 15% darker on the side away from sun on all figures |
| 14 | Horizon not readable; building bases, road and heroes do not agree on eye level | Horizon = camera height | Yh = 360, heads of adults touch it |
| 15 | Many pedestrians animate at once (about 40+ small figures visible) | Few background movers | Max 6-8 moving, rest static or hidden; walk at 40% hero speed |
| 16 | Three hero colours (saree green, navy blazer, Ankara print) are fine but print-heavy dress competes with busy backing | Hero is the saturation peak | Keep heroes full saturation, fade backing; plain quiet zone behind print |

## Open issues
- Owner's "2 floors": sources say UK high streets are mostly 2-3 storeys; I assumed shop + 2 upper floors. Confirm.
- Section 1 and 6 numbers are derived; check by overlay on a rendered frame. All [H] numbers are untested proposals.
- No source found for explainer cut intervals, blur amounts, or parallax ratios.

## Sources (search results only; no pages could be fetched)
- Horizon/ground plane: https://binus.ac.id/bandung/dkv/2025/11/04/backgrounds-that-breathe-creating-depth-in-flat-worlds/ , https://www.brianlemay.com/Pages/animationschool/layout/perspective/perspective03.html , https://community.wacom.com/en-de/how-to-draw-backgrounds-bam , https://posemy.art/blog/align-multiple-characters-in-one-scene/ , https://www.vyond.com/blog/simple-perspective-for-2d-animation/
- Shots: https://studiobinder.com/blog/ultimate-guide-to-camera-shots/ , https://www.videomaker.com/article/f5/7575-nice-shot-a-guide-to-common-video-shot-types/
- Focus/staging: https://gibias.gitbooks.io/art204/content/unit4/camera.html , https://library.fiveable.me/2d-animation/unit-22/parallax-scrolling-multi-plane-techniques/study-guide/Mbdp6dUdC2ja2FmS , https://brianlemay.com/Pages/animationschool/animation/lipsyncbook/staging.html , https://blog.cg-wire.com/staging-animation-principle
- Captions: https://design.shelter.org.uk/digital-framework/video-captioning , https://clevercast.com/bbc-subtitling-guidelines , https://www.ofcom.org.uk/siteassets/resources/documents/consultations/category-2-6-weeks/178126-review-of-access-services-code/associated-documents/provision-of-tv-access-services-guideline.pdf , https://help.clearcast.co.uk/en/article/clearcast-subtitling-style-guidance-for-tv-ads
- Pacing/sound: https://descript.com/blog/article/advice-for-video-editors-from-youtube-video-editors , https://www.capcut.com/create/fast-cut-video-audio-editing-tone-and-pacing , https://www.visla.us/blog/?p=6849
- Architecture: https://buildingconservation.com/articles/shop/shopfronts.htm , https://haringey.gov.uk/sites/default/files/2024-11/bgca_design_guide_final.pdf , https://www.royalgreenwich.gov.uk/download/downloads/id/8029/shopfront_design_toolkit_for_woolwich_conservation_area.pdf , https://historicengland.org.uk/education/training-skills/training/webinars/recordings/webinar-on-talking-shop-an-introduction-to-historic-shopfronts
