#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

GA_ID="G-3T725VG0NZ"
ADS_ID="AW-628717241"
META_PIXEL_ID="6127327264052084"
TARGET_BASE="${1:-https://www.shinecortinas.com}"

PATHS=(
  "/"
  "/cidades-atendidas"
  "/cidades/penedo/"
  "/cortinas"
  "/persianas"
  "/contato"
)

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

if [[ "$TARGET_BASE" == */ ]]; then
  TARGET_BASE="${TARGET_BASE%/}"
fi

printf "\n== Auditoria remota (base: %s) ==\n" "$TARGET_BASE"
if [[ "$TARGET_BASE" == *"pages.dev"* ]]; then
  printf "ALERTA: domínio preview pages.dev detectado (resultado pode divergir do domínio final).\n"
fi

check_url() {
  local url="$1"
  printf "\n-- URL: %s\n" "$url"

  local headers html final_url csp_line
  if ! headers="$(curl -sSIL "$url")"; then
    printf "ERRO: falha ao ler headers.\n"
    return
  fi
  if ! html="$(curl -fsSL "$url")"; then
    printf "ERRO: falha ao ler HTML.\n"
    return
  fi

  final_url="$(curl -sSL -o /dev/null -w '%{url_effective}' "$url")"
  printf "Final URL: %s\n" "$final_url"

  if [[ "$html" == *"gtag('config', '$GA_ID')"* ]]; then
    printf "OK: GA4 encontrada.\n"
  else
    printf "ERRO: GA4 não encontrada.\n"
  fi

  if [[ "$html" == *"gtag('config', '$ADS_ID')"* ]]; then
    printf "OK: Google Ads encontrada.\n"
  else
    printf "ERRO: Google Ads não encontrada.\n"
  fi

  if [[ "$html" == *"fbq('init', '$META_PIXEL_ID')"* ]]; then
    printf "OK: Meta Pixel encontrado.\n"
  else
    printf "ERRO: Meta Pixel não encontrado.\n"
  fi

  csp_line="$(printf '%s\n' "$headers" | awk 'BEGIN{IGNORECASE=1}/^content-security-policy:/{sub(/^content-security-policy:[[:space:]]*/,"",$0); print; exit}')"
  if [[ -n "$csp_line" ]]; then
    printf "CSP: %s\n" "$csp_line"
  fi
}

for path in "${PATHS[@]}"; do
  check_url "${TARGET_BASE}${path}"
done

printf "\n== Checagem de host canônico (www x sem www) ==\n"
if [[ "$TARGET_BASE" == *"www."* ]]; then
  base_no_www="${TARGET_BASE/https:\/\/www./https://}"
  base_www="$TARGET_BASE"
else
  base_no_www="$TARGET_BASE"
  base_www="${TARGET_BASE/https:\/\//https://www.}"
fi

for b in "$base_no_www" "$base_www"; do
  effective="$(curl -sSL -o /dev/null -w '%{url_effective}' "$b/")"
  printf "%s/ -> %s\n" "$b" "$effective"
done

printf "\n== Interpretação para Tag Assistant ==\n"
printf "1) Inicie a sessão no MESMO host final (se redireciona para www, inicie com www).\n"
printf "2) Não use preview randômico (ex.: hash.pages.dev) para validar produção.\n"
printf "3) Teste em janela anônima sem extensões de bloqueio.\n"
printf "4) Recarregue após conectar o Tag Assistant.\n"
