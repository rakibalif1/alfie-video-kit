# alfie-video-kit

Free, code-made short videos with anime-style 3D characters (Alfie and The Narrator), free voices and no paid APIs.

- `install.sh` - one-time setup (JS libraries, free Kokoro voice, the /alfie-video skill)
- `make.sh <episode-folder>` - builds `out.mp4` (720x1280) from `episode.json`
- `skills/alfie-video/SKILL.md` - instructions for Claude
- `MEMORY.md` - the owner's rules and project decisions (read first)
- `examples/inflation/`, `examples/bank-run/` - sample episodes (the second is a 4-character story)
- `characters/` - CC0 VRM characters, see `characters/LICENSES.md`
- `animations/` - CC0 recorded movement clips (Quaternius), retargeted onto the characters by `web/retarget.js`

Built with three.js, @pixiv/three-vrm (MIT) and kokoro-onnx. Rendering uses a headless browser on the CPU.
