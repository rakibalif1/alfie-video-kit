# Shared brief: "The Fifth Call" (a 6-minute Bengali-style ghost story, animated)

WHAT THIS IS: an original ghost story narrated by one calm low voice. The WORDS carry the fear; the pictures set a slow, eerie MOOD (they do not try to scare). Think moonlit silhouettes, mist, lanterns, rain, still black water. Animation is code (HTML/SVG/CSS + GSAP) rendered by HyperFrames at 1280x720. Each scene is a file src/s_<name>.js that you write. The narration, captions, sound, scene fades and vignette/grain are done for you.

PROJECT: /home/user/ghost/project (read-only except YOUR scene file). Files you need:
- src/kit.js: the helper kit (read it fully, it is ~150 lines): sky, ridge, mist, glow, lamp, man (walking silhouette), bamboo, orbs (aleya lights), rain, water, fire, flash, drift, palm, hut, plus rr (seeded random), mk, box, S, win, PAL.
- src/s_dusk.js: the finished opening scene. COPY ITS STYLE: layered parallax, glows, particles, slow camera drift.
- ../episode.json: the story (field "scene" tells which lines belong to your scene) and ../tl.json (voice timings). scenes.json has every scene window (seconds).
- The 3 s intro offset is already included in win('<scene>') -> {T, D, E}. Always build your scene INSIDE `const c = S('<scene>'); const w = win('<scene>'); const T = w.T, D = w.D;`.

HOW TO WORK (each worker has its own output files, never touch index.html or other workers' files):
1. Read the lines of your scene in ../episode.json and its storyboard in your task file.
2. Write src/s_<name>.js (an IIFE like s_dusk.js).
3. Build only your scene: `cd /home/user/ghost/project && python3 build.py <name> --out=/tmp/w_<name>.html` (dusk is not included unless you list it; that is fine).
4. Look at frames: `CHROME=/opt/pw-browsers/chromium NODE_PATH=/home/user/claude-animation-skills/kit/node_modules node snap.cjs <t1,t2,...> /tmp/snaps_<name> /tmp/w_<name>.html` (times in seconds inside your window; use 6 to 8 times). Combine frames with ffmpeg into one contact sheet (hstack/xstack) and LOOK at it with the Read tool (you can view images). Fix what looks wrong. Repeat at least twice.
5. Keep each scene file under ~150 lines. If something in kit.js is missing, write the helper inside your own file (do NOT edit kit.js).

STYLE RULES: palette from PAL (deep indigo/black, moon blue-white, lamp amber, aleya green-cyan, mist grey-blue). Something must ALWAYS be moving slowly (mist, flames, rain, sway, drift), but never fast or flashy: no strobing, no screen shake, no jump scares. Keep the bottom 130 px (y > 590) free of important detail: captions live there. Don't add text on screen (captions already exist) except where your task says so. High contrast silhouettes against glow, depth through layers (at least 4 layers: sky, far, mid, foreground). Match the tempo of the narration: the scene should visibly change a little every 8 to 12 seconds (camera push, light change, a new element appearing) following the story beats in the task.
SOUND is mixed separately. You cannot hear or watch video, only look at frames. Say so honestly in your report.
TIME BOX: 30 minutes per scene. Report in at most 80 words per scene (what you built, what is still weak).
