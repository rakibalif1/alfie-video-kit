#!/usr/bin/env bash
# On-demand installer for three third-party tools (reviewed). Usage: install_extra_tools.sh [cab|openmontage|mpt|all]
# Each goes in /home/user/<name>. Together about 2.5 GB, so this is not part of the automatic startup.
set -e
W="${1:-all}"; cd /home/user
get() { [ -d "$2/.git" ] || git clone -q --depth 1 "https://github.com/$1.git" "$2"; }
if [ "$W" = cab ] || [ "$W" = all ]; then get JohnHeibel/ClaudeAnimationBase ClaudeAnimationBase; (cd ClaudeAnimationBase && npm install --no-audit --no-fund --silent); echo "ClaudeAnimationBase ready"; fi
if [ "$W" = openmontage ] || [ "$W" = all ]; then get calesthio/OpenMontage OpenMontage; (cd OpenMontage && make setup); echo "OpenMontage ready (open Claude in /home/user/OpenMontage to use its 141 skills)"; fi
if [ "$W" = mpt ] || [ "$W" = all ]; then get harry0703/MoneyPrinterTurbo MoneyPrinterTurbo; (cd MoneyPrinterTurbo && python3 -m venv .venv && .venv/bin/pip install -q --upgrade pip && .venv/bin/pip install -q -r requirements.txt); echo "MoneyPrinterTurbo ready (needs your own LLM and Pexels keys in config.toml)"; fi
