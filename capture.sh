#!/usr/bin/env bash
# Capture desktop + mobile screenshots of the exact $CAPTURE_URL into $CAPTURE_DIR.
# Exit 75 = temporary navigation/browser infrastructure failure.
# Exit 1  = script misuse or rendering defect (missing/empty screenshots).
# Capture output stays outside the source tree; the app is left running.
set -euo pipefail

cd "$(dirname "$0")"

if [ -z "${CAPTURE_URL:-}" ]; then
  echo "capture.sh: CAPTURE_URL environment variable is required." >&2
  exit 1
fi
if [ -z "${CAPTURE_DIR:-}" ]; then
  echo "capture.sh: CAPTURE_DIR environment variable is required." >&2
  exit 1
fi
if [ -z "${RUNTIME_DIR:-}" ]; then
  echo "capture.sh: RUNTIME_DIR environment variable is required." >&2
  exit 1
fi

/usr/bin/time -p mkdir -p "$CAPTURE_DIR"

code=0
/usr/bin/time -p node "${RUNTIME_DIR}/scripts/default-capture.mjs" || code=$?
if [ "$code" -ne 0 ]; then
  echo "capture.sh: browser capture failed with exit $code." >&2
  exit "$code"
fi

# Rendering-defect gate: both screenshots must exist and be non-empty.
/usr/bin/time -p test -s "$CAPTURE_DIR/final-desktop.png" || {
  echo "capture.sh: rendering defect: final-desktop.png is missing or empty." >&2
  exit 1
}
/usr/bin/time -p test -s "$CAPTURE_DIR/final-mobile.png" || {
  echo "capture.sh: rendering defect: final-mobile.png is missing or empty." >&2
  exit 1
}
/usr/bin/time -p ls -la "$CAPTURE_DIR/final-desktop.png" "$CAPTURE_DIR/final-mobile.png"
echo "capture.sh: OK — $CAPTURE_URL captured to $CAPTURE_DIR."
