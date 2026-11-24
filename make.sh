#!/usr/bin/env bash
# Build a video from an episode folder: make.sh <episode-dir>   (folder holds episode.json)
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"; EP="$(cd "${1:?usage: make.sh <episode-dir>}" && pwd)"
PY="${ALFIE_HOME:-$HOME/.alfie}/venv/bin/python"; [ -x "$PY" ] || { echo "not installed: run $ROOT/install.sh"; exit 1; }
cd "$EP"; rm -rf audio; mkdir -p audio
echo "== lines";  "$PY" "$ROOT/tools/prep.py" "$EP"
echo "== voices"; "$PY" -I "$ROOT/tools/two_voice.py"
echo "== timing"; "$PY" "$ROOT/tools/timing.py" "$EP"
echo "== render"; node "$ROOT/tools/render.js" "$EP"
echo "== mux";    ffmpeg -v error -y -i silent.mp4 -i audio/vo.wav -c:v copy -c:a aac -b:a 160k -shortest out.mp4
ffprobe -v error -show_entries format=duration -of default=nw=1 out.mp4; echo "done: $EP/out.mp4"
