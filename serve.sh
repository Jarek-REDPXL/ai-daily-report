#!/usr/bin/env bash
# Launch the live site locally, then open it in your browser.
PORT="${1:-8099}"
echo "Serving The AI Edge at http://localhost:$PORT  (Ctrl-C to stop)"
( sleep 1; (xdg-open "http://localhost:$PORT" || open "http://localhost:$PORT") >/dev/null 2>&1 ) &
exec python3 -m http.server "$PORT"
