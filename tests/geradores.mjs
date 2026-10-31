// Camada 1b: o HTML publicado tem que ser exatamente o que os geradores produzem.
// Se alguém editar à mão uma página gerada, o próximo build apaga a edição em silêncio.
// Roda cada gerador, compara com o git e desfaz. Só roda com a árvore limpa (para não apagar trabalho local).
import { execSync } from 'node:child_process';
import { ROOT, Relatorio } from './lib.mjs';

const R = new Relatorio('Camada 1b: páginas geradas batem com os geradores');
const sh = (c) => execSync(c, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

if (sh('git status --porcelain').trim()) {
  console.log('Árvore de trabalho com alterações: rode depois de commitar (este teste roda os geradores e desfaz).');
  process.exit(process.env.CI ? 1 : 0);
}

// bloqueia = gerador confiável (reproduz o HTML publicado). aviso = dívida conhecida
// (auditoria 31/10/2026: blog, páginas internas e especiais receberam ajustes no HTML depois do
// último build e os geradores ainda gravam a data do dia). Quando alinhar, mude para 'erro'.
const GERADORES = [
  { script: 'scripts/build-home.mjs', nivel: 'erro' },
  { script: 'scripts/build-cidades.mjs', nivel: 'erro' },
  { script: 'scripts/build-blog.mjs', nivel: 'aviso' },
  { script: 'scripts/build-paginas.mjs', nivel: 'aviso' },
  { script: 'scripts/build-especiais.mjs', nivel: 'aviso' },
];

for (const g of GERADORES) {
  try {
    sh(`node ${g.script}`);
  } catch (e) {
    R.erro('Gerador quebrou', g.script, (e.stderr || e.message).split('\n').slice(0, 3).join(' '));
    continue;
  }
  const mudou = sh('git status --porcelain').split('\n').filter(Boolean).map((l) => l.slice(3));
  if (mudou.length) {
    const linhas = sh('git diff --stat').trim().split('\n').pop();
    (g.nivel === 'erro' ? R.erro : R.aviso).call(R,
      g.nivel === 'erro' ? 'HTML gerado editado à mão (o próximo build desfaz a edição)' : 'Gerador ainda não reproduz o HTML publicado (dívida conhecida)',
      g.script, `${mudou.length} arquivo(s): ${mudou.slice(0, 4).join(', ')}${mudou.length > 4 ? '…' : ''} (${linhas})`);
  } else R.passou(g.script);
  sh('git checkout -- . && git clean -fdq -- . ":!node_modules" ":!tests/node_modules"');
}

process.exit(R.imprimir());
