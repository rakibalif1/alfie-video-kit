---
name: alfie-video
description: Make a short vertical (9:16, 720p) explainer video with free anime-style 3D characters Alfie and The Narrator, code-made gestures, lip-sync and two free voices. Use for money, banking and trading explainer Shorts, or any episode of the Alfie series.
---

# /alfie-video

First read `MEMORY.md` in the kit folder: it holds the owner's rules and decisions.

You write one small file, `episode.json`. The kit does everything else (voices, timing, animation, render, mux). Do NOT write drawing code: that is what makes episodes expensive.

## Steps
1. Ask the user if the topic, angle or facts are unclear. Verify facts and figures with real sources first (UK context, pounds). Never invent numbers. End money videos with "This is not financial advice." and never promise profits.
2. Write the script as `lines` (see below). 150-190 words total for 60-75 s. Structure: hook in the first 2 seconds (a threat, a mystery or a shocking true fact, never "Today we learn what X is"), why it matters to a normal UK person, ONE plain-sentence definition, ONE worked example with real numbers acted out by Alfie, a twist or common mistake, a one-sentence recap, a motivating last line.
3. Show the user the lines and wait for an OK.
4. `mkdir -p ~/episodes/<name>`, save `episode.json` there (copy `examples/inflation/episode.json` as a start).
5. Run `<kit>/make.sh ~/episodes/<name>` (kit = the folder containing this skill's parent, normally /home/user/alfie-video-kit). First run needs `<kit>/install.sh`. About 2-3 minutes per 15 s of video.
6. Check the result: ffprobe, then one frame per line (`ffmpeg -ss T -i out.mp4 -frames:v 1`), look at one contact sheet, and say honestly which shots are weak. Output: `~/episodes/<name>/out.mp4` (720x1280).

## episode.json
```
{ "title": "...", "currency": "£",
  "cast": { "N": {"model": "Sakurada_Fumiriya", "name": "The Narrator"}, "A": {"model": "HairSample_Male", "name": "Alfie"} },
  "props": [ {"type":"coin","fromLine":0,"toLine":2,"scale":[1,0.4]}, {"type":"stack","fromLine":4,"count":9}, {"type":"bars","fromLine":1,"toLine":3,"from":[0.3,0.4,0.5],"to":[0.4,0.8,1.2]} ],
  "lines": [ {"who":"N","text":"...","gesture":"explain","cam":"wide","react":{"A":"shrug"}} ] }
```
- `who`: N = Narrator (posh British voice), A = Alfie (young American voice), C = a third voice (needs a third cast entry with id "C").
- gestures (each plays a real recorded animation, blended smoothly between lines): explain (talking with hand gestures), point, panic (hand raised, shocked face), cheer, shrug, wave, nod, angry, walk, sit. The character who is not speaking listens, or set `react`, e.g. "react":{"A":"shrug"}. For any other clip add "clip":"<name>" to a line; names are in animations/UAL_Standard.glb (e.g. Idle_Talking_Loop, Idle_Loop, Interact, Dance_Loop, Hit_Chest, Hit_Head, Walk_Loop, Jog_Fwd_Loop, Sitting_Talking_Loop, Spell_Simple_Idle_Loop, Punch_Jab, Sword_Attack, PickUp_Table, Roll). Characters stay in place; sitting has no chair prop yet.
- cam: wide, mid, closeN, closeA, low. Change the camera on most lines.
- props: coin (shrinks or grows), stack (coins pop up), bars (three bars rise or fall); line numbers start at 0.
- Characters (free, CC0) are in `characters/`: Sakurada_Fumiriya, HairSample_Male (anime style); Bizdude, CoolMoneyBag, StonksReporter, Mister, HodlerKing, Mafiossini (toy style, only tested standing still). Do not mix anime and toy style in one scene without checking. See `characters/LICENSES.md`.


## Stories with several characters (see examples/bank-run)
- `cast`: any ids, each `{"model": "<file in characters/>", "name": "..."}`. Voice codes N (British narrator), A (Alfie), V, R, S, C; change a voice with `"voices": {"V": ["af_bella", 1.08, "en-us"]}` (voice, speed, language).
- `sets`: named locations `{sky, floor, skylineVisible, cast:[ids on stage], layout:{id:{x,z,yaw,h}}, pieces:[...]}`. Pieces: wall, sign (text), counter, vault, posts (queue barrier), tree. Start a line with `"set":"name"` to cut to a location (everyone is placed at that set's layout).
- `move`: on a line, `"move":{"V":{"x":0.7}}` walks that character to the new spot (uses the real walking clip). Visible stage is about x -1.2 to 1.2; x beyond 1.5 is off-screen (use it to walk a character in).
- cam: `wide`, `mid`, `low`, `close:ID`, `mid:ID`, `two:ID:ID` (frames two characters). Cut often, but keep the speaker on screen.
- More gestures: flinch (Hit_Chest), run. Props can add `"setName":"bank"` to show only in one set.
- Renders at about 5 frames per second: run `make.sh` in the background (`setsid nohup`) and poll.


## Richer worlds, crowds, costumes, emotions (see examples/bank-run)
- Make scenes busy and colourful: many things to look at (the owner wants viewers "flooded" with detail). Use every set with a bright sky (`skyTop`, `skyBottom`), `light`, and 8-15 pieces.
- More piece types: buildings (windowed city skyline, auto-added when `skylineVisible` is not false), road, car, bus (they drive past), lamp, bunting, balloons, tv (live screen with scrolling ticker: `title`, `ticker`, `bg`), poster, checker (marble floor), column, clock (moving hands), plant, tree, vault, counter, sign, wall, posts, infocard (animated bar panel: `title`, `rows:[{label,value 0-1,text,color}]`, `fromLine`, `toLine`).
- Costumes: `"look":{"skin","hair","top","bottom","shoes"}` on a cast member or extra recolours VRoid-style characters (flat colours; a crude but effective way to make many different people).
- Crowd: top-level `"extras":[{model, set:[names], x, z, yaw, h, clip, phase, look, react:{from,to,clip}, walk:{x0,x1,speed}}]`. Use a diverse mix of skin tones, hair colours and clothes. Walkers cross the street; queue people react (e.g. panic) between lines `from`..`to`.
- Camera `high` shows the upper part of the frame (use it when an infocard or screen is the point of the line).
- Emotion: `"emotion":"panic"` on a line changes that voice's speed, pitch and loudness. Values: calm, excited, panic, sad, angry, cheer, worried, sly. Use varied emotions so voices are not flat.

## Rules
- Movement comes from a free recorded library, so it is natural but generic: no custom acting, eyes do not follow anything, lip-sync follows loudness only. Say so honestly. Do not claim film-quality CGI.
- To save tokens: write only episode.json, do not read the kit's source files unless something breaks, do not view every frame.
- Ask the user questions whenever in doubt.
