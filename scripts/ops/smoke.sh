#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:3000}"

echo "[Smoke] base=${BASE_URL}"

pass=0
fail=0

check_json_true(){
  local path="$1" key="$2" name="$3"
  printf -- "- %-40s %s\n" "$name" "$path"
  local resp; resp=$(curl -fsSL "${BASE_URL}${path}" || true)
  local ok; ok=$(jq -r "${key}" <<<"${resp}" 2>/dev/null || echo false)
  if [[ "$ok" == "true" ]]; then
    echo "  OK"; pass=$((pass+1))
  else
    echo "  FAIL resp=${resp}"; fail=$((fail+1))
  fi
}

check_status(){
  local method="$1" path="$2" expect="$3" name="$4" body="${5:-}"
  printf -- "- %-40s %s %s\n" "$name" "$method" "$path"
  local code
  if [[ "$method" == "GET" ]]; then
    code=$(curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}${path}")
  else
    code=$(curl -s -o /dev/null -w "%{http_code}" -H 'Content-Type: application/json' -d "$body" -X "$method" "${BASE_URL}${path}")
  fi
  if [[ "$code" == "$expect" ]]; then echo "  OK($code)"; pass=$((pass+1)); else echo "  FAIL($code)"; fail=$((fail+1)); fi
}

# Core health
check_json_true "/api/health" ".ok" "Health"
check_json_true "/api/health/supabase" ".success" "Supabase DB"
check_json_true "/api/health/supabase-auth" ".success" "Supabase Auth"

# AI stats
check_json_true "/api/defi/risk/ai-stats" ".success" "AI Stats (agg)"
check_json_true "/api/defi/risk/ai-stats/timeseries?windowSec=3600&bucketSec=300" ".success" "AI Stats (ts)"

# Alerts basic
check_status GET "/api/alerts" 200 "Alerts list"
check_status POST "/api/alerts" 400 "Alerts create (invalid)" '{"type":"price_above"}'

echo "[Smoke] pass=${pass} fail=${fail}"
if [[ $fail -ne 0 ]]; then exit 1; fi
echo "[Smoke] OK"
