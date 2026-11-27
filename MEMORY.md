# Project memory (read this first in every new chat)

This repo is public. It holds decisions and preferences for the owner's video project. No personal details belong here.

## The project
- Series format: **MONEY STORIES** = 60 to 90 second animated retellings of real UK money events (Northern Rock bank run done as episode 1). Always: a busy colourful screen (live news screens, tickers, infographic cards, crowd that reacts), the same cast (Alfie the viewer's stand-in, the posh Narrator, supporting characters), a real fact behind every story, a motivating end and "This is not financial advice." Idea list: Black Wednesday 1992, South Sea Bubble 1720, Barings 1995, inflation, compound interest, Bank of England rates.
- Faceless YouTube / Shorts channel. Topics: money, banking and trading explained simply (UK context), plus short story-style videos.
- Everything is made with code and free tools: no paid APIs, no ElevenLabs, no credits.
- The owner is not a prompt expert: they give a one-line idea, Claude turns it into the script, plan and video. They do not want to repeat themselves.

## Owner's rules (follow always)
- **Use the whole arsenal, not one tool.** The owner liking one look (HyperFrames pop-art) does NOT mean we only use that. For every video pick the best tool or combine tools: Alfie 3D kit, HyperFrames, OpenMontage (ink, mocap walks), Lemo-Opuscar (painterly and broadcast styles), ClaudeAnimationBase, explainroo, our own code (ambient sound, fog, particles). Choose per video and say why.
- **Use as FEW TOKENS as possible without lowering quality (owner, Dec 2026):** reuse existing projects and kits, detailed briefs, few review images, short worker reports, no repeated reading of big files.
- **Length is flexible, story quality is everything (owner, Dec 2026).** Never cut a story to hit a time. A longer film is fine if the narrative earns it. Judge every story on: specific sensory detail, slow rising dread, a strong ending, original folklore texture, and read-aloud rhythm. Show the owner a premise and a beat outline before writing the full story.
- **Ghost-story direction (Dec 2026):** entertainment, not logic or science. The WORDS are the strong side: Bengali and Indian ghost-story style, rich atmosphere and surroundings, slow low calm narration, no loud jump-scare voice. Visuals support the mood, they do not try to scare. 5-minute videos. Original stories only (folklore motifs are fine, no copying of published stories).
- **Name every delivered file with the tool/skill that made it** (for example queue_hyperframes.mp4) and say in the caption which skill or tool was used. Never send several files all called out.mp4.
- **Always show a progress bar** in every status update (for example [██████████░░░░░░░░░░] 50%, with what is done, what is running and time left).
- **/team = 4 workers always busy**: shared work queue in a job folder (tasks/, claims/, shared/brief.md, shared/protocol.md); finished workers claim the next free task; free workers help (QA, logs, split renders); the manager is never idle either. See skills/team/SKILL.md.
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

## Ghost-story pipeline (first film: "The Fifth Call", 5:58, delivered Dec 2026)
- Saved at projects/ghost-fifth-call (story in episode.json, scene files src/s_*.js, atmosphere kit src/kit.js, build.py, snap.cjs, team-brief/). Voice: `N[story]/[hush]/[dread]`, `W[old]`, `G[ghostly]` (echo) with pauses `{1.3}` via tools/two_voice.py; sound bed from tools/ambience.py (rain, frogs, crickets, wind, drone, heartbeat, thunder, birds, all synthesised); pad voice with 3 s lead and 5 s tail; scenes timed from tl.json by build.py; render with `npx --yes hyperframes@0.9.102 render . -o out.mp4 --workers 3` (about 15 minutes for 6 min); normalise loudness with loudnorm I=-16.
- How it was made fast: 4 workers on the shared work queue built 7 scenes plus cards in about 10 minutes (each scene one file, own snapshots via snap.cjs). Lessons: snap tool must hide scenes outside their window; give every scene a storyboard with beats; leave the bottom 130 px free for captions.
- Known weaknesses: silhouettes are simple, characters tiny in wide shots, flat rooster and hands in dawn, telegram text, size jump between room and dark scenes, narration 5:50 is longer than the 5:00 asked. I cannot hear or watch video, so voice quality and pacing are unchecked: ask the owner.

## Film 2: "The Signal-Man" (Dickens retold, 12:02, delivered Dec 2026)
- Saved at projects/signalman (episode.json, cues.json, src/s_*.js, kit.js with railway helpers, team-brief, team-tasks, script in projects/signalman/script.md). Owner chose it from a list of famous British ghost stories and wants: British style = hook at the start, slow patient build, twist at the end. Public-domain classics are fair game (Dickens, M. R. James, W. W. Jacobs); retell in our own words.
- Token-saving method that worked: reuse the previous project and kit, one shared brief plus detailed per-scene storyboards, workers write one scene file in one go and review only 2 contact sheets, 4 workers built 8 scenes in about 6 minutes (about 90k tokens each), manager reviews with 3 contact sheets, render 4 workers about 27 minutes for 12 minutes of film. One narrator reads everything (classic BBC reading style); only the ghost cry (echo) and the driver get other voices.
- Other ideas on the list: The Monkey's Paw, Casting the Runes, Borley Rectory (real legend), Oh Whistle and I'll Come to You, The Turn of the Screw.

## DECISION (owner liked row 3): the HyperFrames pop-art look is the preferred visual style for now
- Saved as projects/hyperframes-queue (flat SVG figures from src/rig.js with arms, legs and flapping mouth; bright pop-art scenes with sunburst, halftone dots, wipes, news ticker, gauge, timeline, shield, rule cards, confetti). Build: `cd projects/hyperframes-queue && python3 build.py` (joins src/*.js into index.html), then `npx --yes hyperframes@0.9.102 render` (CHROME=/opt/pw-browsers/chromium). Skills used: hyperframes, hyperframes-cli, hyperframes-registry, media-use. It was made by a Sonnet worker in about 15 minutes plus a 2 minute render.
- Known weaknesses to fix next: caption timing is estimated by letter count (Whisper models would not download), figures move stiffly, ticker text is tiny, 42 overlap warnings from `check`, one big index.html, captions sit below the safe zone. The topic itself (bank run) is still not a proven winner: ask the owner for the next topic.
- The Alfie 3D kit remains available for acting 3D characters.

## Tool comparison on 'The Queue' (same script and voice; workers judged from stills only, owner has the files)
- Alfie kit (baseline): the only one with real acting 3D characters; best so far. Recommended main tool.
- hyperframes 6/10 (busy colourful flat SVG figures, ticker, wipes); openmontage 6/10 (ink stick figures with real mocap walks, busy 7); lemo-opuscar 6 looks / 2 funny (broadcast-news look, no people, landscape); claudeanimationbase 6 look / 4 fit (hand-painted mascot, very slow, 10 s excerpt only, 2.2 h for 80 s); explainroo 4/10 (slides); moneyprinterturbo 3/10 (only re-cut footage; needs Pexels and LLM keys).
- Ideas to borrow: lemo-opuscar news strap, stamps and breaking chart; openmontage mocap walk cycles; hyperframes wipes and ticker. Files were in /home/user/compare (gone when the container resets).

## Extra tools (installed on request; reinstall with tools/install_extra_tools.sh [cab|openmontage|mpt|all])
- **ClaudeAnimationBase** (JohnHeibel): p5.js hand-drawn style animation of a small character; node render.mjs; about 8 seconds per frame on CPU (very slow), use --soft-gl; read its ANIMATION_GUIDE.md.
- **OpenMontage** (calesthio): agent-driven video production framework with 141 skills, local to /home/user/OpenMontage (do not copy its skills to the global folder: they would bloat every chat). `make preflight` showed free tools for analysis, audio processing, character animation, subtitles and video post; text-to-speech, video generation, image generation and music need API keys or extra models (the free Piper voice is installed but reported unavailable until a voice model is added).
- **MoneyPrinterTurbo** (harry0703): script-to-stock-footage video app (Streamlit/FastAPI). Needs the owner's own LLM key and Pexels/other stock key in config.toml; default voice is a cloud service. Not run yet.

## Known weaknesses / to do
- No chair prop for sitting; eyes do not follow anything; lip-sync follows loudness only; some gestures are approximations (e.g. shrug).
- Background characters and crowds are not built yet.
- Voice cloning from the owner's own recording is a pending experiment (idea: Chatterbox, MIT licence; keep the reference clip in the owner's Google Drive; untested).
- The kit lives on branch `kit-v1` of this repo; the setup script clones that branch. Do not delete it.

## Keeping this memory current
- At the end of a chat, add new decisions and lessons here. If the repo is attached with push access, commit to branch `kit-v1` and push. If not, show the owner the exact lines to add.
- Never put secrets, emails or personal details in this file.
