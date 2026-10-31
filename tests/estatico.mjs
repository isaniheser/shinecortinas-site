// Camada 1 da esteira: verificações rápidas no repositório, sem navegador e sem dependências.
// Uso: node tests/estatico.mjs            (todas as verificações)
//      BASE_REF=origin/main node tests/estatico.mjs   (também confere troca de ?v= nos assets alterados)
import { execSync } from 'node:child_process';
import { paginas, textoVisivel, frases as frasesDe, meta, jsonLd, nos, tipos, existe, ler, redirects, Relatorio, BASE, ROOT } from './lib.mjs';
import {
  REGRAS_TEXTO, PARCIMONIA, LUXO, BATERIA, BATERIA_RESSALVA, WHATSAPP, CALOR_5_6, CALOR_5_6_CONTEXTO,
} from './regras-conteudo.mjs';

const R = new Relatorio('Camada 1: verificações estáticas');
const PAGS = paginas();
const URLS = new Set(PAGS.map((p) => p.url));
const REDIR = redirects();
const REDIR_ESTATICO = new Map(REDIR.filter((r) => !r.origem.includes('*')).map((r) => [r.origem, r.destino]));

// Constantes oficiais vêm do mesmo lugar que os geradores usam.
const partials = ler('scripts/partials.mjs');
const NOTA = partials.match(/GOOGLE_RATING = '([\d.]+)'/)[1];
const TOTAL = partials.match(/GOOGLE_REVIEWS = '(\d+)'/)[1];

const noindex = (p) => /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(p.html) || p.url.startsWith('/lp/') || p.url === '/404.html';
const INDEXAVEIS = PAGS.filter((p) => !noindex(p));

// ---------- A. SEO por página ----------
const titulos = new Map(), descricoes = new Map();
for (const p of PAGS) {
  const title = meta(p.html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const desc = meta(p.html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const canon = meta(p.html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const h1 = (p.html.match(/<h1[\s>]/gi) || []).length;
  if (!/<html[^>]*\blang="pt-BR"/i.test(p.html)) R.erro('Página sem lang="pt-BR"', p.file);
  if (!title) R.erro('Página sem <title>', p.file);
  if (h1 !== 1 && !noindex(p)) R.erro('Página indexável sem exatamente 1 H1', p.file, `${h1} H1`);
  if (/<\\\/script>/.test(p.html)) R.erro('"<\\/script>" (página fica em branco)', p.file);
  if (noindex(p)) continue;
  if (!desc) R.erro('Página indexável sem meta description', p.file);
  if (canon !== BASE + p.url) R.erro('Canonical diferente da URL da página', p.file, `${canon} ≠ ${BASE + p.url}`);
  if (title && title.length > 70) R.aviso('Title acima de 70 caracteres (cortado no Google)', p.file, `${title.length}: ${title}`);
  if (desc && (desc.length < 90 || desc.length > 170)) R.aviso('Description fora de 90–170 caracteres', p.file, String(desc.length));
  titulos.set(title, [...(titulos.get(title) || []), p.file]);
  descricoes.set(desc, [...(descricoes.get(desc) || []), p.file]);
  const og = meta(p.html, /<meta\s+property="og:image"\s+content="([^"]*)"/i);
  if (!og) R.aviso('Página sem og:image', p.file);
  else if (/\.avif(\?|$)/i.test(og)) R.erro('og:image em AVIF (WhatsApp e Facebook não mostram a prévia)', p.file, og);
  else if (og.startsWith(BASE) && !existe(og.slice(BASE.length))) R.erro('og:image aponta para arquivo inexistente', p.file, og);
  const tw = meta(p.html, /<meta\s+name="twitter:image"\s+content="([^"]*)"/i);
  if (tw && /\.avif(\?|$)/i.test(tw)) R.erro('twitter:image em AVIF', p.file, tw);
}
for (const [t, fs] of titulos) if (fs.length > 1) R.erro('Title duplicado', fs.join(', '), t);
for (const [d, fs] of descricoes) if (fs.length > 1) R.erro('Description duplicada', fs.join(', '), d.slice(0, 80));
R.passou('SEO por página');

// ---------- B. Dados estruturados ----------
const avaliacoes = JSON.parse(ler('docs/dados-google/avaliacoes.json'));
const listaAv = Array.isArray(avaliacoes) ? avaliacoes : Object.values(avaliacoes).find(Array.isArray);
const norm = (s) => String(s || '').normalize('NFC').replace(/\s+/g, ' ').replace(/\s+([.,!?])/g, '$1').trim();
// Para comparar avaliações: as PALAVRAS têm que ser as do Google. Tipografia (espaços, maiúsculas,
// emoji, '!!!!' vs '!', ponto final ausente) não conta como alteração.
const chave = (s) => norm(s).toLowerCase().replace(/\p{Extended_Pictographic}|\u200d|\ufe0f|[\u{1F3FB}-\u{1F3FF}]/gu, '')
  .replace(/([!?.])\1+/g, '$1').replace(/[\s.!?,]+/g, ' ').trim();
const textosGoogle = listaAv.map((a) => ({ autor: a.autor, texto: chave(a.texto) }));

for (const p of PAGS) {
  for (const b of jsonLd(p.html)) {
    if (!b.ok) { R.erro('JSON-LD inválido', p.file, b.erro); continue; }
    nos(b.data, (no) => {
      const t = tipos(no);
      if (t.includes('LocalBusiness') || t.includes('HomeAndConstructionBusiness')) {
        const a = no.address || {};
        if (a.streetAddress || a.postalCode || no.geo) R.erro('LocalBusiness com endereço físico/CEP/geo (empresa é de área de serviço)', p.file);
        if (no.priceRange && no.priceRange !== '$$') R.erro('priceRange diferente de "$$" (bug do $$ no replace)', p.file, no.priceRange);
        if (no.telephone && no.telephone !== '+' + WHATSAPP) R.erro('Telefone do LocalBusiness diferente do oficial', p.file, no.telephone);
        const ar = no.aggregateRating;
        if (ar && (String(ar.ratingValue) !== NOTA || String(ar.reviewCount || ar.ratingCount) !== TOTAL)) {
          R.erro('aggregateRating diferente do oficial em scripts/partials.mjs', p.file, `${ar.ratingValue}/${ar.reviewCount || ar.ratingCount} ≠ ${NOTA}/${TOTAL}`);
        }
      }
      if (t.includes('Review')) {
        const autor = typeof no.author === 'object' ? no.author.name : no.author;
        const corpo = chave(no.reviewBody);
        const g = textosGoogle.filter((x) => x.autor.toLowerCase() === String(autor).toLowerCase());
        if (!g.length) R.erro('Review de autor que não está em avaliacoes.json (depoimento inventado?)', p.file, autor);
        else if (!g.some((x) => x.texto === corpo)) {
          // Aceita só corte de trecho inteiro no começo ou no fim, nunca texto alterado no meio.
          const parcial = g.some((x) => corpo.length > 40 && x.texto.includes(corpo));
          if (parcial) R.aviso('Review com trecho cortado do texto do Google', p.file, autor);
          else R.erro('Review com texto diferente do Google (tem que ser literal)', p.file, autor);
        }
      }
      if (t.includes('FAQPage')) {
        const visivel = textoVisivel(p.html);
        for (const q of no.mainEntity || []) {
          if (!visivel.replace(/\s+/g, ' ').includes(norm(q.name).slice(0, 60))) R.erro('Pergunta do FAQPage não aparece visível na página', p.file, q.name);
        }
      }
    });
  }
}
R.passou('Dados estruturados');

// ---------- C. Links, imagens, sitemap e páginas órfãs ----------
const entrada = new Map();
for (const p of PAGS) {
  for (const m of p.html.matchAll(/<a\b[^>]*\bhref="([^"]+)"[^>]*>/gi)) {
    let h = m[1];
    const tag = m[0];
    if (/target="_blank"/.test(tag) && !/noopener/.test(tag)) R.erro('target=_blank sem rel="noopener"', p.file, h);
    if (/^(mailto|tel|whatsapp|javascript|sms):|^#/.test(h)) continue;
    if (/wa\.me\//.test(h) && !h.includes('wa.me/' + WHATSAPP)) R.erro('Link de WhatsApp com número diferente do oficial', p.file, h.slice(0, 60));
    if (/^https?:\/\//.test(h)) {
      const u = new URL(h);
      if (!u.hostname.endsWith('shinecortinas.com')) continue;
      h = u.pathname;
    }
    if (h.startsWith('http://')) R.erro('Link http:// (conteúdo misto)', p.file, h);
    const alvo = new URL(h, BASE + p.url).pathname;
    if (URLS.has(alvo)) { if (alvo !== p.url) entrada.set(alvo, (entrada.get(alvo) || 0) + 1); }
    else if (URLS.has(alvo + '/')) R.aviso('Link sem barra final (passa por redirect 308)', p.file, alvo);
    else if (REDIR_ESTATICO.has(alvo)) R.aviso('Link interno aponta para endereço que redireciona', p.file, `${alvo} → ${REDIR_ESTATICO.get(alvo)}`);
    else if (!existe(alvo) && !alvo.startsWith('/api/')) R.erro('Link interno quebrado', p.file, alvo);
  }
  for (const m of p.html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = m[0];
    if (!/\salt=/.test(tag)) R.erro('Imagem sem alt', p.file, tag.slice(0, 90));
    if (!/\swidth=/.test(tag) || !/\sheight=/.test(tag)) R.aviso('Imagem sem width/height (página pula ao carregar)', p.file, tag.slice(0, 90));
  }
  for (const m of p.html.matchAll(/\b(?:src|srcset|imagesrcset|poster|href)="([^"]+)"/gi)) {
    for (const parte of m[1].split(',')) {
      const a = parte.trim().split(/\s+/)[0].split(/[?#]/)[0];
      if (!a.startsWith('/') || a.startsWith('//') || a.startsWith('/api/')) continue;
      if (/\.(avif|jpg|jpeg|png|webp|svg|ico|css|js|mp4|webm|json|xml|txt|webmanifest)$/i.test(a) && !existe(a)) R.erro('Arquivo referenciado não existe', p.file, a);
    }
  }
}
for (const p of INDEXAVEIS) {
  if (p.url !== '/' && !entrada.get(p.url)) R.erro('Página indexável sem nenhum link vindo de outra página (órfã)', p.file);
}
const sitemap = new Set([...ler('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(BASE, '')));
for (const p of INDEXAVEIS) if (!sitemap.has(p.url)) R.erro('Página indexável fora do sitemap.xml', p.file);
for (const u of sitemap) {
  const p = PAGS.find((x) => x.url === u);
  if (!p) R.erro('URL do sitemap sem página', u);
  else if (noindex(p)) R.erro('Página noindex dentro do sitemap', p.file);
}
if (!/^Sitemap: https:\/\/www\.shinecortinas\.com\/sitemap\.xml$/m.test(ler('robots.txt'))) R.erro('robots.txt sem a linha Sitemap correta', 'robots.txt');
if (/^Disallow:\s*\/\s*$/m.test(ler('robots.txt'))) R.erro('robots.txt bloqueando o site inteiro', 'robots.txt');
R.passou('Links, imagens e sitemap');

// ---------- D. Fatos e linguagem (CLAUDE.md) ----------
for (const p of PAGS) {
  const txt = textoVisivel(p.html).replace(/\n/g, ' ');
  const frases = frasesDe(p.html);
  for (const regra of REGRAS_TEXTO) {
    for (const m of txt.matchAll(regra.re)) {
      const i = m.index;
      const trecho = txt.slice(Math.max(0, i - 50), i + m[0].length + 50);
      if (regra.excecao && regra.excecao.test(trecho)) continue;
      (regra.nivel === 'erro' ? R.erro : R.aviso).call(R, regra.nome, p.file, `…${trecho}…`);
    }
  }
  for (const re of PARCIMONIA) {
    const n = (txt.match(re) || []).length;
    if (n > 1) R.erro(`"${re.source}" mais de 1x na página (usar com parcimônia)`, p.file, `${n}x`);
  }
  for (const m of txt.matchAll(LUXO)) {
    const trecho = txt.slice(Math.max(0, m.index - 40), m.index + 40);
    if (!/não é luxo|nada de luxo|sem luxo/i.test(trecho)) R.erro('Palavra "luxo" (marca mostra, não escreve)', p.file, `…${trecho}…`);
  }
  // A ressalva do motor a bateria precisa estar NA PÁGINA (títulos e perguntas podem citar
  // "a bateria" sem repetir a ressalva, desde que a página explique em algum ponto).
  const bat = frases.filter((f) => BATERIA.test(f) && !(BATERIA.lastIndex = 0));
  BATERIA.lastIndex = 0;
  if (bat.length && !BATERIA_RESSALVA.test(txt)) {
    R.erro('Motor a bateria sem "alguns modelos / mediante consulta" em nenhum ponto da página', p.file, bat[0].slice(0, 160));
  }
  // 5 a 6 °C é do forro blackout de tecido: "blackout" ou "forro" tem que estar por perto.
  for (const m of txt.matchAll(CALOR_5_6)) {
    const viz = txt.slice(Math.max(0, m.index - 300), m.index + 120);
    if (!CALOR_5_6_CONTEXTO.test(viz)) R.erro('"5 a 6 °C" longe de "forro"/"blackout" (o número é do forro blackout de tecido)', p.file, `…${txt.slice(Math.max(0, m.index - 80), m.index + 40)}…`);
  }
}
R.passou('Fatos e linguagem');

// ---------- E. _redirects (armadilhas do Cloudflare Pages) ----------
let primeiroCuringa = null;
let dinamicas = 0;
const origens = new Map();
for (const r of REDIR) {
  const temCuringa = r.origem.includes('*') || r.origem.includes(':');
  if (temCuringa && primeiroCuringa === null) primeiroCuringa = r.linha;
  if (primeiroCuringa !== null) dinamicas++;
  if (primeiroCuringa !== null && !temCuringa) R.erro('_redirects: regra estática depois de um curinga (o Cloudflare conta como dinâmica e pode descartar)', `_redirects:${r.linha}`, r.raw);
  if (!/^(301|302|303|307|308)$/.test(r.codigo || '')) R.erro('_redirects: código inválido (use 301/302/303/307/308; nunca 301! nem 410)', `_redirects:${r.linha}`, r.raw);
  if (!r.destino) R.erro('_redirects: linha sem destino', `_redirects:${r.linha}`, r.raw);
  if (/[^\x00-\x7F]/.test(r.origem)) R.erro('_redirects: origem com acento sem percent-encoding', `_redirects:${r.linha}`, r.raw);
  if (origens.has(r.origem)) R.erro('_redirects: origem repetida (só a primeira vale)', `_redirects:${r.linha}`, `${r.origem} (já na linha ${origens.get(r.origem)})`);
  origens.set(r.origem, r.linha);
  if (r.destino && r.destino.startsWith('/') && !r.destino.includes('?') && !r.destino.includes(':splat')) {
    const d = r.destino.split('#')[0];
    if (d !== '/' && !URLS.has(d)) R.erro('_redirects: destino não é uma página do site', `_redirects:${r.linha}`, r.raw);
  }
  if (r.origem.startsWith('/') && URLS.has(r.origem) && r.codigo !== '200') R.erro('_redirects: redireciona uma página que existe', `_redirects:${r.linha}`, r.raw);
}
if (dinamicas > 100) R.erro('_redirects: mais de 100 regras dinâmicas (o resto é descartado em silêncio)', '_redirects', String(dinamicas));
if (REDIR.length > 2100) R.erro('_redirects: acima do limite de 2.100 regras', '_redirects', String(REDIR.length));
R.passou('_redirects');

// ---------- F. Arquivos internos não podem ir ao ar ----------
const INTERNOS = ['docs', 'scripts', 'tests', '.github', '.agents', '.claude', 'CLAUDE.md', 'README.md', 'build.sh'];
const gen = ler('scripts/generate-sitemap.mjs');
const sh = ler('build.sh');
for (const x of INTERNOS) {
  if (!gen.includes(`'${x}'`)) R.erro('Pasta/arquivo interno fora da limpeza do deploy (generate-sitemap.mjs)', x);
  if (x !== 'build.sh' && !sh.includes(`$OUTPUT_DIR/${x}`)) R.erro('Pasta/arquivo interno fora da limpeza do deploy (build.sh)', x);
}
for (const x of ['/CLAUDE.md', '/docs/*', '/scripts/*', '/tests/*', '/.github/*', '/.agents/*']) {
  if (!REDIR.some((r) => r.origem === x)) R.erro('Arquivo interno sem redirect de segurança no _redirects', x);
}
R.passou('Arquivos internos');

// ---------- G. Cache: asset alterado precisa de ?v= novo ----------
const baseRef = process.env.BASE_REF;
if (baseRef) {
  try {
    const mb = execSync(`git merge-base ${baseRef} HEAD`, { cwd: ROOT, encoding: 'utf8' }).trim();
    const mudou = execSync(`git diff --name-only ${mb} -- assets`, { cwd: ROOT, encoding: 'utf8' })
      .split('\n').filter((f) => /\.(css|js)$/.test(f));
    for (const f of mudou) {
      const nome = f.split('/').pop().replace(/[.]/g, '\\.');
      const re = new RegExp(`${nome}\\?v=([\\w.-]+)`, 'g');
      const antes = new Set();
      for (const arq of execSync(`git grep -l "${f.split('/').pop()}" ${baseRef} -- "*.html"`, { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean)) {
        const conteudo = execSync(`git show "${arq}"`, { cwd: ROOT, encoding: 'utf8', maxBuffer: 20e6 });
        for (const m of conteudo.matchAll(re)) antes.add(m[1]);
      }
      for (const p of PAGS) {
        for (const m of p.html.matchAll(re)) {
          if (antes.has(m[1])) R.erro('Asset alterado com a mesma ?v= (o navegador usa a cópia antiga do cache por 1 ano)', p.file, `${f}?v=${m[1]}`);
        }
      }
    }
    R.passou('Versão de cache dos assets');
  } catch (e) {
    R.aviso('Não deu para comparar versões de cache com a base', baseRef, e.message.split('\n')[0]);
  }
}

// ---------- H. Versões de cache coerentes entre páginas ----------
const versoes = new Map();
for (const p of PAGS) {
  for (const m of p.html.matchAll(/\/assets\/(shine-[\w-]+\.(?:css|js))\?v=([\w.-]+)/g)) {
    if (!versoes.has(m[1])) versoes.set(m[1], new Map());
    const v = versoes.get(m[1]);
    v.set(m[2], [...(v.get(m[2]) || []), p.file]);
  }
}
for (const [asset, v] of versoes) {
  if (v.size > 1) {
    const resumo = [...v].map(([ver, fs]) => `v=${ver} em ${fs.length}`).join(', ');
    R.aviso('Mesmo asset com versões diferentes entre páginas', asset, resumo);
  }
}

process.exit(R.imprimir());
