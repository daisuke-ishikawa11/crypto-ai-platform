#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:3000}"

echo "[Supabase Health] base=${BASE_URL}"

check() {
  local path="$1" name="$2"
  echo "- Checking ${name} (${path})"
  resp=$(curl -fsSL "${BASE_URL}${path}") || { echo "  ERROR: request failed"; return 1; }
  ok=$(echo "$resp" | jq -r '.success // .ok // false' 2>/dev/null || echo "false")
  if [[ "$ok" != "true" ]]; then
    echo "  ERROR: unhealthy -> $resp"
    return 1
  fi
  echo "  OK"
}

rc=0
check "/api/health/supabase" "Supabase DB" || rc=1
check "/api/health/supabase-auth" "Supabase Auth" || rc=1

if [[ $rc -ne 0 ]]; then
  echo "[Supabase Health] FAILURE"; exit 1
fi
echo "[Supabase Health] OK"
