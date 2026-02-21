#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

GA_ID="G-3T725VG0NZ"
ADS_ID="AW-628717241"
META_PIXEL_ID="6127327264052084"
TARGET_URL="${1:-https://www.shinecortinas.com/}"

printf "== Auditoria local (arquivos HTML) ==\n"
missing=0
while IFS= read -r -d '' file; do
  content="$(cat "$file")"
  has_ga=0
  has_ads=0
  has_meta=0
  [[ "$content" == *"gtag('config', '$GA_ID')"* ]] && has_ga=1
  [[ "$content" == *"gtag('config', '$ADS_ID')"* ]] && has_ads=1
  [[ "$content" == *"fbq('init', '$META_PIXEL_ID')"* ]] && has_meta=1

  if (( has_ga == 0 || has_ads == 0 || has_meta == 0 )); then
    printf "FALTA TRACKING: %s (GA:%s ADS:%s META:%s)\n" "$file" "$has_ga" "$has_ads" "$has_meta"
    missing=$((missing+1))
  fi
done < <(find . -name "*.html" -print0)

if (( missing == 0 )); then
  printf "OK: todos os HTMLs têm GA, Google Ads e Meta Pixel.\n"
else
  printf "ERRO: %s arquivo(s) com tracking incompleto.\n" "$missing"
fi

printf "\n== Auditoria remota (%s) ==\n" "$TARGET_URL"
if [[ "$TARGET_URL" == *"pages.dev"* ]]; then
  printf "ALERTA: você está auditando um domínio pages.dev (preview).\n"
  printf "        Tag Assistant pode não reproduzir o mesmo comportamento do domínio final.\n"
fi

remote_html=""
remote_headers=""
if ! remote_headers="$(curl -sSIL "$TARGET_URL")"; then
  printf "ERRO: não foi possível ler headers de %s\n" "$TARGET_URL"
  exit 1
fi
if ! remote_html="$(curl -fsSL "$TARGET_URL")"; then
  printf "ERRO: não foi possível ler HTML de %s\n" "$TARGET_URL"
  exit 1
fi

check_contains() {
  local needle="$1"
  local ok_msg="$2"
  local err_msg="$3"
  if [[ "$remote_html" == *"$needle"* ]]; then
    printf "OK: %s\n" "$ok_msg"
  else
    printf "ERRO: %s\n" "$err_msg"
  fi
}

check_contains "gtag('config', '$GA_ID')" "Google tag (GA4) encontrada" "Google tag (GA4) NÃO encontrada"
check_contains "gtag('config', '$ADS_ID')" "Google Ads encontrada" "Google Ads NÃO encontrada"
check_contains "fbq('init', '$META_PIXEL_ID')" "Meta Pixel encontrado" "Meta Pixel NÃO encontrado"

csp_line="$(printf '%s\n' "$remote_headers" | awk 'BEGIN{IGNORECASE=1}/^content-security-policy:/{sub(/^content-security-policy:[[:space:]]*/,"",$0); print; exit}')"
if [[ -n "$csp_line" ]]; then
  printf "\nCSP detectado: %s\n" "$csp_line"
  if [[ "$csp_line" != *"googletagmanager.com"* && "$csp_line" != *"https:"* ]]; then
    printf "ALERTA: CSP pode bloquear googletagmanager.com\n"
  fi
  if [[ "$csp_line" != *"google-analytics.com"* && "$csp_line" != *"https:"* ]]; then
    printf "ALERTA: CSP pode bloquear google-analytics.com\n"
  fi
fi

printf "\n== Guia rápido para Tag Assistant ==\n"
printf "1) Teste preferencialmente no domínio final (www.shinecortinas.com).\n"
printf "2) Abra janela anônima SEM extensões de bloqueio (adblock, anti-tracker, privacy).\n"
printf "3) Conecte o Tag Assistant e recarregue a página uma vez.\n"
printf "4) Se ainda falhar, rode novamente este script com a URL exata analisada.\n"
