#!/usr/bin/env bash
# Capture desktop + mobile screenshots of $CAPTURE_URL into $CAPTURE_DIR.
# Delegates browser work to the runtime default-capture script; leaves the app running.
set -euo pipefail
cd "$(dirname "$0")"
/usr/bin/time -p test -n "${CAPTURE_URL:?Set CAPTURE_URL.}"
/usr/bin/time -p test -n "${CAPTURE_DIR:?Set CAPTURE_DIR.}"
/usr/bin/time -p test -n "${RUNTIME_DIR:?Set RUNTIME_DIR.}"
/usr/bin/time -p mkdir -p "$CAPTURE_DIR"
/usr/bin/time -p test -f "$RUNTIME_DIR/scripts/default-capture.mjs"
/usr/bin/time -p node "$RUNTIME_DIR/scripts/default-capture.mjs"
/usr/bin/time -p test -f "$CAPTURE_DIR/final-desktop.png"
/usr/bin/time -p test -f "$CAPTURE_DIR/final-mobile.png"
