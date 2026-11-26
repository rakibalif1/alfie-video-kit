# Project memory (read this first in every new chat)

This repo is public. It holds decisions and preferences for the owner's video project. No personal details belong here.

## The project
- Series format: **MONEY STORIES** = 60 to 90 second animated retellings of real UK money events (Northern Rock bank run done as episode 1). Always: a busy colourful screen (live news screens, tickers, infographic cards, crowd that reacts), the same cast (Alfie the viewer's stand-in, the posh Narrator, supporting characters), a real fact behind every story, a motivating end and "This is not financial advice." Idea list: Black Wednesday 1992, South Sea Bubble 1720, Barings 1995, inflation, compound interest, Bank of England rates.
- Faceless YouTube / Shorts channel. Topics: money, banking and trading explained simply (UK context), plus short story-style videos.
- Everything is made with code and free tools: no paid APIs, no ElevenLabs, no credits.
- The owner is not a prompt expert: they give a one-line idea, Claude turns it into the script, plan and video. They do not want to repeat themselves.

## Owner's rules (follow always)
- **Ask questions whenever in doubt.** Do not guess.
- **Be honest**: say plainly what is weak, untested or unproven. Never claim a video is good without having checked frames. Claude cannot watch or listen to video, only inspect frames and files.
- **Hook first**: the first 2 seconds must be a threat, a mystery or a shocking true fact. Never "Today we learn what X is". Avoid crowded, generic topics.
- **Scripts must not be rushed**: 60 to 90 seconds, clear for a beginner: hook, why it matters, one plain definition, one worked example with real numbers, twist, recap, motivating end.
- **Facts**: verify with real sources, UK context (pounds, Bank of England, FSCS). Never invent numbers. End money videos with "This is not financial advice." Never promise profits or get-rich-quick results.
- Original stories only. Take inspiration from themes, never copy someone's post or script.
- Quality bar: the owner rejected stiff animation. Characters must move their whole body naturally. Check frames before saying a video is good.
- Video size: 720x1280 (9:16) is fine. No 2K or 4K needed.
- Save tokens: write only `episode.json`, run `make.sh`, do not read the kit's source unless something breaks, one video per chat, show the script and wait for OK before the long render.
- Keep what is saved on the account: the setup script is on the Default cloud environment. It has a 100-line limit, so keep it small and test any change before saving.

## Characters and voices (all free)
- **Alfie**: young male, anime style (HairSample_Male, orange hoodie look), voice `am_michael` (young American, chosen by the owner, with emotion tags). Series hero.
- **The Narrator**: posh British (Sakurada_Fumiriya), voice `bm_lewis`.
- Supporting: Vivi (Vivi, voice af_bella), Ms Rubin the manager (Victoria_Rubin, voice bf_isabella). More CC0 characters are listed in `characters/LICENSES.md`; toy-style ones were only tested standing still.
- Voice codes in episode lines: N narrator, A Alfie, V Vivi, R Rubin, S, C extras. Override per episode with `"voices"` in episode.json.
- The old name "Pip" and the Hindi-based voice were dropped. Stickman style was replaced; it is still available as github.com/artemnovitckii/claude-animation-skills (tested commit 86f70106c9aeae1334184467da5776c533ada3bc) if the owner wants it back.

## How videos are made (the kit in this repo)
- `skills/alfie-video/SKILL.md` has the full instructions and the episode.json format. Examples: `examples/inflation`, `examples/bank-run` (a 4-character story with 3 sets, walking and camera moves).
- Pipeline: `make.sh <episode-folder>` makes voices (Kokoro), timing, renders with three.js + @pixiv/three-vrm in headless Chromium, mixes audio. Output `out.mp4`.
- Movement comes from real recorded clips (Quaternius Universal Animation Library, CC0) retargeted onto VRM characters by `web/retarget.js`.
- Rendering is CPU only: about 5 frames per second at 720x1280 (a 90 s video takes roughly 9 to 10 minutes). Run it in the background and wait.
- Use `CHROME=/opt/pw-browsers/chromium` (set in the environment). Run long jobs with `setsid nohup`, not in the foreground.

## Feedback history
- Round 1 (stickman/old kit): stiff animation rejected. Round 2: real recorded movement accepted as a big improvement.
- Round 3 ("The Queue" story): narrator and Ms Rubin voices were fine; Alfie's voice (am_echo) was flat with no emotion, so it was replaced (emotion tags added, new voice being chosen by the owner). Staging was "dull and gloomy": the owner wants an epic, busy, colourful, information-rich world with many people of different races, modern clothes, costume changes, lots of props. The kit now has crowds, costumes (colour tints), a lively city street and bank interior, moving traffic, live screens and animated infographic cards.
- The owner wants to be asked what makes the video unique and wants ideas offered.

## Known weaknesses / to do
- No chair prop for sitting; eyes do not follow anything; lip-sync follows loudness only; some gestures are approximations (e.g. shrug).
- Background characters and crowds are not built yet.
- Voice cloning from the owner's own recording is a pending experiment (idea: Chatterbox, MIT licence; keep the reference clip in the owner's Google Drive; untested).
- The kit lives on branch `kit-v1` of this repo; the setup script clones that branch. Do not delete it.

## Keeping this memory current
- At the end of a chat, add new decisions and lessons here. If the repo is attached with push access, commit to branch `kit-v1` and push. If not, show the owner the exact lines to add.
- Never put secrets, emails or personal details in this file.
