#!/usr/bin/env bash
set -euo pipefail

PRIMARY_ENV="/mnt/d/crypto-ai-platform/.env.local"
FALLBACK_ENV="/mnt/d/crypto-ai-platform/.env.example"
if [[ -f "$PRIMARY_ENV" ]]; then ENV="$PRIMARY_ENV"; elif [[ -f "$FALLBACK_ENV" ]]; then ENV="$FALLBACK_ENV"; else echo "ENV_FILE_NOT_FOUND"; exit 1; fi

getval() {
  local key="$1"
  local line
  line=$(grep -E "^${key}\s*=" "$ENV" | head -n1 || true)
  if [[ -z "$line" ]]; then
    return 1
  fi
  local val
  val=$(printf '%s' "$line" | sed -E 's/^[^=]+=//' | tr -d '\r')
  # trim surrounding quotes and spaces
  val=$(printf '%s' "$val" | sed -E "s/^\s*[\"']?//; s/[\"']?\s*$//")
  printf '%s' "$val"
}

SUP=$(getval NEXT_PUBLIC_SUPABASE_URL || true)
if [[ -n "${SUP:-}" ]]; then
  SUP="${SUP%/}"
  echo "SUPABASE_URL=$SUP"
  echo "---- Supabase auth health ----"
  curl -sS -i "$SUP/auth/v1/health" | head -n 8 || true
else
  echo "SUPABASE_URL_NOT_SET"
fi

echo "---- App supabase proxy health ----"
curl -sS http://localhost:3000/api/health/supabase || true

TOKEN=$(getval ALERTS_ADMIN_TOKEN || true)
if [[ -z "${TOKEN:-}" ]]; then
  TOKEN=$(getval METRICS_TOKEN || true)
fi

if [[ -n "${TOKEN:-}" ]]; then
  echo "---- Audit API (last 3) ----"
  curl -sS -H "x-learning-token: $TOKEN" "http://localhost:3000/api/learning/rewards/audit?limit=3" || true
else
  echo "TOKEN_NOT_SET"
fi
