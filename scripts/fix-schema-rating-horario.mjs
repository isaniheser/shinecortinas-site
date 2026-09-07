// Remove o aggregateRating autorreferente (nota do Google marcada como própria) e
// insere openingHoursSpecification (seg–sex 08:00–17:00, conforme Perfil da Empresa,
// coletado em 06/09/2026) em todo nó LocalBusiness dos JSON-LD do site.
// Uso: node scripts/fix-schema-rating-horario.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const HOURS = [{
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  opens: '08:00', closes: '17:00',
}];

const files = execSync('git ls-files "*.html"', { encoding: 'utf8' }).split('\n').filter(Boolean);
let removed = 0, hours = 0, touched = 0;

function walk(node, ctx) {
  if (Array.isArray(node)) return node.forEach(n => walk(n, ctx));
  if (!node || typeof node !== 'object') return;
  if ('aggregateRating' in node) { delete node.aggregateRating; ctx.removed++; }
  const t = node['@type'];
  if (t === 'LocalBusiness' || (Array.isArray(t) && t.includes('LocalBusiness'))) {
    if (!node.openingHoursSpecification) { node.openingHoursSpecification = HOURS; ctx.hours++; }
  }
  for (const k of Object.keys(node)) walk(node[k], ctx);
}

for (const f of files) {
  const src = readFileSync(f, 'utf8');
  const re = /(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g;
  let changed = false;
  const out = src.replace(re, (m, open, body, close) => {
    let data; try { data = JSON.parse(body); } catch { return m; }
    const ctx = { removed: 0, hours: 0 };
    walk(data, ctx);
    if (!ctx.removed && !ctx.hours) return m;
    removed += ctx.removed; hours += ctx.hours; changed = true;
    const indent = (body.match(/\n(\s*)\S/) || [, ''])[1];
    const pretty = JSON.stringify(data, null, 2).replace(/\n/g, '\n' + indent);
    return open + '\n' + indent + pretty + '\n' + indent + close;
  });
  if (changed) { writeFileSync(f, out); touched++; }
}
console.log({ files: files.length, touched, aggregateRatingRemovidos: removed, horariosInseridos: hours });
