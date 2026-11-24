#!/usr/bin/env bash
# One-time, safe to re-run: JS libraries, a Python voice environment, the free Kokoro voice model, and the /alfie-video skill.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"; HOME_DIR="${ALFIE_HOME:-$HOME/.alfie}"; mkdir -p "$HOME_DIR/models"
cd "$ROOT" && [ -d node_modules/three ] || npm install --silent --no-audit --no-fund
[ -x "$HOME_DIR/venv/bin/python" ] || python3 -m venv "$HOME_DIR/venv"
"$HOME_DIR/venv/bin/python" -c "import kokoro_onnx, soundfile, numpy" 2>/dev/null || "$HOME_DIR/venv/bin/python" -m pip install -q numpy soundfile kokoro-onnx
R=https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0
for f in kokoro-v1.0.onnx voices-v1.0.bin; do [ -s "$HOME_DIR/models/$f" ] || curl -fsSL -o "$HOME_DIR/models/$f" "$R/$f"; done
mkdir -p "${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}"; ln -sfn "$ROOT/skills/alfie-video" "${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}/alfie-video"
echo "alfie-video-kit ready (use: $ROOT/make.sh <episode-folder>)"
