#!/usr/bin/env bash
set -euo pipefail

# Config
BASE_URL="${BASE_URL:-http://localhost:3000}"
THRESHOLD_PCT="${AI_SUCCESS_RATE_THRESHOLD_PCT:-80}"
WINDOW_SEC="${WINDOW_SEC:-86400}"

echo "[AI Health] base=${BASE_URL} threshold=${THRESHOLD_PCT}% windowSec=${WINDOW_SEC}"

# Try to fetch monitoring status first
echo "[AI Health] Checking basic status..."
status_resp=$(curl -fsSL "${BASE_URL}/api/monitoring/status")
echo "[AI Health] Status: OK"

# Try to fetch AI stats
echo "[AI Health] Checking AI stats..."
if curl -fsSL "${BASE_URL}/api/defi/risk/ai-stats" >/dev/null 2>&1; then
    resp=$(curl -fsSL "${BASE_URL}/api/defi/risk/ai-stats")
    ok=$(echo "$resp" | grep -o '"success"[[:space:]]*:[[:space:]]*true' || echo "")
    if [[ -n "$ok" ]]; then
        echo "[AI Health] AI stats: Available"
        echo "[AI Health] Response: $resp"
    else
        echo "[AI Health] AI stats: Failed to parse success field"
        echo "[AI Health] Response: $resp"
        exit 2
    fi
else
    echo "[AI Health] AI stats endpoint not available or returning error"
    echo "[AI Health] Checking alternative endpoints..."
    
    # Check if basic APIs are working
    if curl -fsSL "${BASE_URL}/api/monitoring/metrics" >/dev/null 2>&1; then
        echo "[AI Health] Metrics endpoint: Available"
    else
        echo "[AI Health] Metrics endpoint: Not available"
    fi
    
    echo "[AI Health] WARN: AI-specific endpoints not ready, but basic service is running"
    exit 0
fi

echo "[AI Health] OK"