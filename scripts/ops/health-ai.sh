#!/usr/bin/env bash
set -euo pipefail

# Config
BASE_URL="${BASE_URL:-http://localhost:3000}"
THRESHOLD_PCT="${AI_SUCCESS_RATE_THRESHOLD_PCT:-80}"
WINDOW_SEC="${WINDOW_SEC:-86400}"

echo "[AI Health] base=${BASE_URL} threshold=${THRESHOLD_PCT}% windowSec=${WINDOW_SEC}"

# Fetch stats
resp=$(curl -fsSL "${BASE_URL}/api/defi/risk/ai-stats")
ok=$(echo "$resp" | jq -r '.success')
if [[ "$ok" != "true" ]]; then
  echo "[AI Health] stats: failed to fetch"
  exit 2
fi

successRate=$(echo "$resp" | jq -r '.data.successRate')
total=$(echo "$resp" | jq -r '.data.total')
failRate=$(echo "$resp" | jq -r '.data.failureRate // 0')
rateLimited=$(echo "$resp" | jq -r '.data.failuresByReason.rate_limited // 0')

sr_pct=$(awk -v r="$successRate" 'BEGIN{ printf("%.1f", r*100) }')
echo "[AI Health] successRate=${sr_pct}% total=${total} failureRate=${failRate} rateLimited=${rateLimited}"

if (( $(echo "$sr_pct < $THRESHOLD_PCT" | bc -l) )); then
  echo "[AI Health] ERROR: successRate below threshold (${sr_pct}% < ${THRESHOLD_PCT}%)"
  exit 1
fi

echo "[AI Health] OK"
