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

- Round 4: the owner found the 1-2 minute topics (inflation, bank run) not interesting or successful. Wants 5-minute widescreen videos plus vertical Shorts cut from them, better scripts and descriptions, richer skies and floors, characters higher in frame, and a Bangla version.
- Bangla: Kokoro has no Bangla. Meta MMS-TTS Bengali works on CPU but is non-commercial (test only). Indic Parler-TTS (Apache-2.0, commercial OK) is gated on Hugging Face: needs the owner's free account, accepted terms and a token. A working venv recipe is torch==2.11.0 + torchaudio==2.11.0 (CPU) + transformers 4.46 + parler-tts from git. Bangla captions need a Bengali font in the container (none installed yet).

- Round 5 (direction change): the owner and their friends found the money/banking topics generic and boring, so those are dropped for now (Bangla also paused). New idea: gaming-related Shorts (GTA 6 funny TV shows, radio, NPC moments). Rule: do NOT download or re-upload other people's streams or videos, or Rockstar's audio and music, without permission. Legit routes to offer: own gameplay captures (check Rockstar's current fan-content policy), permission-based clipping with credit, platform clip/remix tools, or ORIGINAL animated parody of GTA-style radio, TV and NPC humour using our kit (no Rockstar names, logos, characters or music).

- Round 6: the owner chose the ORIGINAL PARODY route (own jokes, GTA-style radio / TV / NPC humour, no Rockstar or streamer content) and can also record their own GTA 6 gameplay (a clip-cutter for their own footage is a possible later tool). First episode: examples/sunny-bay-radio (DJ Rick Neon, Intern Alfie, Brenda), 57 s widescreen plus two auto-cut Shorts.

- Round 7: the owner watched Sunny Bay Radio and rejected it ("awful, drop it"). Dropped so far: money/banking explainers, Money Stories, the original GTA-style parody. LESSON: do not invent topics, jokes or formats blind and then render them. First get a concrete reference from the owner (channels or videos they want to resemble in FORMAT, not content), or the topic and key ideas from the owner, then show a short outline, then produce. Keep the production kit (characters, animation, sets, voices, Shorts) as a tool; the content direction is still undecided.

## Extra skills installed (owner's request, all reviewed before install)
- Installed every new session in the background by the setup script: explainroo, linkedin-marketing (contains 12 LinkedIn sub-skills), remotion-to-hyperframes, slideshow, gbro-collage-broll (needs a paid GEMINI_API_KEY, built for Codex), claude-video-caption (Whisper captions), lemo-opuscar (downloads its library from its own GitHub on first use), 12 Reactive Resume career skills (resume-builder, accomplishment-inventory, healthcare-resume, resume-bullet-writer, resume-tailor, resume-proofreader, resume-content-guide, cover-letter-writer, application-answers, interview-prep, mock-interview, job-application-manager). Also hyperframes core + remotion-best-practices.
- NOT in the automatic setup: directing-stickman-videos (kaomei/stickman-video-director, skill folder 555 MB). Install on demand: npx skills add kaomei/stickman-video-director --skill directing-stickman-videos -g -y -a claude-code
- Third-party skills run with full agent permissions; review new ones before adding.

## Known weaknesses / to do
- No chair prop for sitting; eyes do not follow anything; lip-sync follows loudness only; some gestures are approximations (e.g. shrug).
- Background characters and crowds are not built yet.
- Voice cloning from the owner's own recording is a pending experiment (idea: Chatterbox, MIT licence; keep the reference clip in the owner's Google Drive; untested).
- The kit lives on branch `kit-v1` of this repo; the setup script clones that branch. Do not delete it.

## Keeping this memory current
- At the end of a chat, add new decisions and lessons here. If the repo is attached with push access, commit to branch `kit-v1` and push. If not, show the owner the exact lines to add.
- Never put secrets, emails or personal details in this file.
