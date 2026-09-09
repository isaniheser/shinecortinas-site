#!/usr/bin/env bash
set -euo pipefail

OUTPUT_DIR="${1:-.}"

node scripts/generate-sitemap.mjs "$OUTPUT_DIR"
echo "Sitemap generated in: $OUTPUT_DIR/sitemap.xml"
ls -lh "$OUTPUT_DIR/sitemap.xml" "$OUTPUT_DIR/robots.txt"

# O Cloudflare publica a pasta inteira. Sem isto, CLAUDE.md, docs/ e scripts/ ficavam
# acessíveis ao público (auditoria de 08/09/2026). Só roda dentro do build do Cloudflare
# (CF_PAGES=1) para nunca apagar arquivos do repositório local.
if [ "${CF_PAGES:-}" = "1" ]; then
  rm -rf "$OUTPUT_DIR/docs" "$OUTPUT_DIR/scripts" "$OUTPUT_DIR/CLAUDE.md" "$OUTPUT_DIR/README.md" \
         "$OUTPUT_DIR/cidades/cidades.json" "$OUTPUT_DIR/blog/posts.json" "$OUTPUT_DIR/videos/videos.json" \
         "$OUTPUT_DIR/.claude" "$OUTPUT_DIR/.gitignore" "$OUTPUT_DIR/.node-version"
  echo "Arquivos internos removidos do deploy."
fi

exit 0
