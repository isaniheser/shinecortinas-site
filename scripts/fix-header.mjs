// Renova o <header class="sl-header"> de TODAS as páginas do sistema leve com o header()
// atual de partials.mjs (menu desktop + menu do celular). Cobre as páginas que os builds
// não regeram (produto/institucionais quando build-paginas não roda, vídeos, posts antigos).
// Uso: node scripts/fix-header.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { header } from './partials.mjs';

const files = execSync('git ls-files "*.html"', { encoding: 'utf8' }).split('\n').filter(Boolean)
  .filter((f) => !f.startsWith('lp/'));
let touched = 0;
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  const m = src.match(/\n?<header class="sl-header">[\s\S]*?<\/header>/);
  if (!m) continue;
  const cur = (src.match(/<a href="([^"]+)" aria-current="true">/) || [])[1] || null;
  const fresh = header(cur).replace(/^\n/, '');
  const out = src.replace(m[0], () => (m[0].startsWith('\n') ? '\n' : '') + fresh);
  if (out !== src) { writeFileSync(f, out); touched++; }
}
console.log({ files: files.length, touched });
