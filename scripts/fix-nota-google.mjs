// Alinha o texto visível de todas as páginas à nota pública do Google (4,9 com 294
// avaliações, coletada em 06/09/2026). As strings são as mesmas de scripts/partials.mjs
// e scripts/paginas.mjs; este script só cobre páginas que os builds não regeram.
// Uso: node scripts/fix-nota-google.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const SUBS = [
  ['<span class="sl-stat__n">5.0</span><div><h3>Nota máxima no Google, com 292 avaliações</h3>',
   '<span class="sl-stat__n">4,9</span><div><h3>Nota 4,9 no Google, com 294 avaliações</h3>'],
  ['Google 5.0 ★★★★★ · 292 avaliações', 'Google 4,9 ★★★★★ · 294 avaliações'],
  ['e avaliação 5.0 no Google', 'e nota 4,9 no Google, com 294 avaliações'],
  ['Avaliações reais · Google 5.0', 'Avaliações reais · Google 4,9'],
];

const files = execSync('git ls-files "*.html"', { encoding: 'utf8' }).split('\n').filter(Boolean);
let touched = 0;
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  let out = src;
  for (const [a, b] of SUBS) out = out.split(a).join(b);
  if (out !== src) { writeFileSync(f, out); touched++; }
}
console.log({ files: files.length, touched });
