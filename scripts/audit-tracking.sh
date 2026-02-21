#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

GA_ID="G-3T725VG0NZ"
ADS_ID="AW-628717241"
META_PIXEL_ID="6127327264052084"

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

printf "\n== Auditoria de produção (https://www.shinecortinas.com/) ==\n"
prod_html="$(curl -fsSL https://www.shinecortinas.com/)"

if [[ "$prod_html" == *"gtag('config', '$GA_ID')"* ]]; then
  printf "OK: Google tag (GA4) encontrada na home de produção.\n"
else
  printf "ERRO: Google tag (GA4) NÃO encontrada na home de produção.\n"
fi

if [[ "$prod_html" == *"gtag('config', '$ADS_ID')"* ]]; then
  printf "OK: Google Ads tag encontrada na home de produção.\n"
else
  printf "ERRO: Google Ads tag NÃO encontrada na home de produção.\n"
fi

if [[ "$prod_html" == *"fbq('init', '$META_PIXEL_ID')"* ]]; then
  printf "OK: Meta Pixel encontrado na home de produção.\n"
else
  printf "ERRO: Meta Pixel NÃO encontrado na home de produção.\n"
fi
