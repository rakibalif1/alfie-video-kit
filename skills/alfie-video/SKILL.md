---
name: alfie-video
description: Make a short vertical (9:16, 720p) explainer video with free anime-style 3D characters Alfie and The Narrator, code-made gestures, lip-sync and two free voices. Use for money, banking and trading explainer Shorts, or any episode of the Alfie series.
---

# /alfie-video

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

## Rules
- Movement comes from a free recorded library, so it is natural but generic: no custom acting, eyes do not follow anything, lip-sync follows loudness only. Say so honestly. Do not claim film-quality CGI.
- To save tokens: write only episode.json, do not read the kit's source files unless something breaks, do not view every frame.
- Ask the user questions whenever in doubt.
