#!/usr/bin/env bash
set -euo pipefail

OUTPUT_DIR="${1:-.}"

node scripts/generate-sitemap.mjs "$OUTPUT_DIR"
echo "Sitemap generated in: $OUTPUT_DIR/sitemap.xml"
ls -lh "$OUTPUT_DIR/sitemap.xml" "$OUTPUT_DIR/robots.txt"

exit 0
