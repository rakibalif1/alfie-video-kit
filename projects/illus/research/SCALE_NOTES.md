# Scale system notes (W4, task 5)

Files: /home/user/jobguide/project/src/perspective.js (new), /home/user/jobguide/project/src/bg_street.js (pedestrians, vehicles, furniture rewritten; backup of old: scratchpad bg_street_orig.js), /home/user/jobguide/itest/build_scale_test.py -> scale_test.html (hero test page; the manager's build_test.py was rewritten by someone else mid-task, so I did not touch it other than adding perspective.js to its module list).
Sheet: /home/user/illus2-job/out/scale_contact_sheet.png (4 frames: t=1.5, 5, 9, 13 s).

## The ground plane (perspective.js, load before bg_street.js)
- GROUND = {horizon:470, front:720, heroY:700, heroH:330, slope:0.0025, hazeBelow:560, haze:0.12}
- scaleAt(y) = 1 + (y-700)*0.0025 (floor 0.3). Values: 715->1.04, 700->1.00 (hero), 640->0.85, 620->0.80, 600->0.75, 560->0.65, 540->0.60, 520->0.55, 484->0.46, 470->0.43.
  NOTE: the brief gave two incompatible targets (0.55@520 -> 1.35@715 and hero=1.0@700). I kept hero=1.0@700 and 0.55@520, which gives 0.6@540 and 0.8@620 exactly as asked; the "1.35 at 715" figure is dropped.
- zFor(y)=round(10*y) (painter order, nearer = larger y). personPx(y)=330*scaleAt(y). hazeFor(y)=0.12 if y<560.
- contactShadow(parent,x,y,s,{rx,ry,op}): radial-gradient ellipse, rx=46*s, ry=7*s, op .34 (scales with depth). dropRigShadow(api) removes the rig's own flat ellipse.

## Heroes
Rig native s=1.0 at y=700 = 330 px tall (46% of frame), shadow via contactShadow. Measured in browser: 326 px feet-to-crown.

## Pedestrians (bg_street.js, person())
Real illus() characters, same rig/halo/proportions, size = scaleAt(y). 14 outfit sets in window.PED_SETS (ICAST outfits recoloured + 8 new option sets: suit, hoodie+cap, teal blazer, green jumper, older man with glasses, coral blazer student, magenta jumper older woman, plum blazer) with skin tones a1..f3, b1..b3.
Measured heights (hero = 326): y484 -> 150 px (0.46) x4 far-kerb walkers; zebra walkers y567 -> 218 (0.67), y584 -> 232 (0.71), they walk toward camera y556->602 and grow with scaleAt; pavement y634 -> 272 (0.83), 648 -> 284, 656 -> 290, 670 -> 302, 676 -> 306 (0.94).
Behaviours: 5 walkers (api.walk, stride p=0.78-0.25*(1-s), speed 85*s px/s), 1 dog walker (own dog + lead), 2 chatting (gesture + mouth loop, listener nods), 2 bus-queue (phone-looker with raised arm, bag), 2 zebra crossers, 4 far-kerb walkers. Props: bag, cup, phone, rucksack, dog. No walkers nearer than y=692 so heroes' feet stay clear.
Cheap mode: no talk loops, blink only for the 3 nearest (api.blink).
Cost (street module alone): 14 people = 69-96 DOM nodes each (about 1,100 total), whole street 3,193 nodes, 460 tweens, mean seek 6 ms (20 seeks), first cold seek 61 ms. Full test page (sky+shops+street+gags+heroes): 7,849 nodes, mean seek 20 ms, first seek 230 ms (cold), worst warm 67 ms (this includes bg_gags, which has 288 s of tweens and is not mine).

## Vehicles
Sized from the lane y: H=personPx(base). Car length 1.5 H, taxi 1.55 H, van 1.7 H, bus height 1.1 H, lorry height 1.05 H, moped 0.9 H, bike 0.95 H. Lanes: far fast y548 (H=205), far slow bikes y536, near fast y608 (H=254), near slow lorry y588. Convoys are spaced by real widths (no overlap), speeds 215 / 330 px/s. Contact shadow under each vehicle.
Honest caveat: strict physical scale would make the near bus ~480 px tall; I used the brief's 1.1-1.2x person height.

## Furniture, litter, pigeons
Drawn originally for a 100 px person; scaled by FK*scaleAt(y) about their feet, FK=1.6 (true would be 3.3, which swamps the frame). Pigeons and drifting litter scale with scaleAt too.

## Depth fade
One soft band over y 470..~560 at 12% haze (rgba 208,228,240), fading to 0 by y~600, drawn above the far lane and zebra walkers and below the near lane and pavement.

## Open issues (not fixed, outside this task)
1. bg_gags.js still draws its own tiny figures (kids, "SORRY", scooter kid ~90 px); they now look like toddlers next to 300 px adults. Needs the same person()/scaleAt treatment.
2. bg_shops.js buildings (still the tall version when I tested) vs the far-kerb walkers: at y484 a person is 150 px, so two-floor buildings of 190-250 px read as only ~1.5 persons high. Strict geometry needs buildings >= 450 px or far-kerb walkers hidden; I kept the far walkers because the brief wants them, drop them if buildings stay at 190-250.
3. Rig walks front-on and slides sideways (no side-view walk), so lateral walkers look like they glide; a turned/side leg cycle in illus.js would fix it (motion team).
4. I cannot watch video; checks were seeks and still frames only.
