// Camada 3 da esteira: confere o site NO AR (depois de cada publicação e toda madrugada).
// Pega o que nenhum teste local vê: _redirects descartado pelo Cloudflare, cabeçalhos, arquivos
// internos expostos, robôs de busca bloqueados, configuração mudada no painel.
// Uso: node tests/ao-vivo.mjs                       (site oficial)
//      SITE_URL=https://xxxx.pages.dev node tests/ao-vivo.mjs   (prévia: pula as checagens de domínio)
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, BASE, paginas, Relatorio } from './lib.mjs';

const SITE = (process.env.SITE_URL || BASE).replace(/\/$/, '');
const OFICIAL = SITE === BASE;
const R = new Relatorio(`Camada 3: site no ar (${SITE})`);
const UA = 'Mozilla/5.0 (compatible; ShineCortinas-Esteira/1.0; +https://www.shinecortinas.com/)';

async function pega(url, { ua = UA, seguir = false, metodo = 'GET' } = {}) {
  for (let tentativa = 1; tentativa <= 3; tentativa++) {
    try {
      const r = await fetch(url, { method: metodo, redirect: seguir ? 'follow' : 'manual', headers: { 'User-Agent': ua }, signal: AbortSignal.timeout(20000) });
      return r;
    } catch (e) {
      if (tentativa === 3) return { status: 0, erro: e.message, headers: new Headers() };
      await new Promise((ok) => setTimeout(ok, 2000 * tentativa));
    }
  }
}

// Roda em lotes para não sobrecarregar o site.
async function emLotes(itens, n, fn) {
  for (let i = 0; i < itens.length; i += n) await Promise.all(itens.slice(i, i + n).map(fn));
}

// 1. Todas as páginas do sitemap respondem 200 e com o canonical certo.
const sitemapTxt = await (await pega(SITE + '/sitemap.xml')).text?.() || '';
const urls = [...sitemapTxt.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urls.length < 40) R.erro('sitemap.xml no ar com poucas URLs', SITE + '/sitemap.xml', `${urls.length} URLs`);
await emLotes(urls, 6, async (u) => {
  const alvo = OFICIAL ? u : u.replace(BASE, SITE);
  const r = await pega(alvo);
  if (r.status !== 200) return R.erro('Página do sitemap não responde 200', alvo, String(r.status || r.erro));
  const html = await r.text();
  const canon = (html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i) || [])[1];
  if (canon !== u) R.erro('Canonical no ar diferente da URL do sitemap', alvo, String(canon));
});
R.passou('Páginas do sitemap');

// 2. Endereços antigos que o Google conhece têm que chegar numa página 200 (com no máximo 2 saltos).
const antigos = new Set();
try {
  for (const l of readFileSync(join(ROOT, 'docs/dados-google/gsc/paginas.csv'), 'utf8').split('\n').slice(1)) {
    const u = l.split(',')[0];
    if (u.startsWith(BASE)) antigos.add(u.replace(BASE, ''));
  }
} catch {}
for (const r of readFileSync(join(ROOT, '_redirects'), 'utf8').split('\n')) {
  const [o, d, c] = r.trim().split(/\s+/);
  if (o && o.startsWith('/') && !o.includes('*') && !o.startsWith('#') && /^30\d$/.test(c || '')) antigos.add(o);
}
const internos = new Set(['/CLAUDE.md', '/README.md', '/build.sh', '/.gitignore', '/.node-version', '/cidades/cidades.json', '/blog/posts.json', '/videos/videos.json']);
await emLotes([...antigos].filter((u) => !internos.has(u)), 6, async (u) => {
  let atual = SITE + u, saltos = 0, r;
  while (saltos <= 3) {
    r = await pega(atual);
    if (r.status >= 300 && r.status < 400 && r.headers.get('location')) {
      atual = new URL(r.headers.get('location'), atual).href;
      saltos++;
    } else break;
  }
  if (r.status !== 200) R.erro('Endereço antigo não chega numa página (redirect morto ou 404)', u, `${r.status || r.erro} em ${atual}`);
  else if (saltos > 2) R.aviso('Endereço antigo com redirect em cadeia', u, `${saltos} saltos até ${atual}`);
});
R.passou('Endereços antigos e _redirects');

// 3. Arquivos internos não podem ser servidos.
for (const u of ['/CLAUDE.md', '/README.md', '/build.sh', '/docs/pendencias.md', '/docs/dados-google/perfil.json', '/scripts/build-cidades.mjs',
  '/tests/estatico.mjs', '/tests/package.json', '/.github/workflows/qualidade.yml', '/.agents/rules/isani-estilo-criativo.md',
  '/cidades/cidades.json', '/blog/posts.json', '/videos/videos.json', '/instagram-feed.json', '/functions/api/instagram.js', '/.node-version', '/.gitignore']) {
  const r = await pega(SITE + u);
  if (r.status === 200) R.erro('Arquivo interno acessível no site', SITE + u, 'responde 200');
}
R.passou('Arquivos internos');

// 4. Cabeçalhos de segurança e cache.
{
  const r = await pega(SITE + '/');
  const h = r.headers;
  for (const [nome, re] of [['strict-transport-security', /max-age=\d{7,}/], ['x-content-type-options', /nosniff/], ['referrer-policy', /./], ['content-security-policy', /frame-ancestors/]]) {
    if (!re.test(h.get(nome) || '')) R.erro('Cabeçalho de segurança ausente', SITE + '/', nome);
  }
  const css = await pega(SITE + '/assets/shine-leve.css');
  if (!/immutable/.test(css.headers.get('cache-control') || '')) R.aviso('Assets sem cache longo (immutable)', '/assets/shine-leve.css', css.headers.get('cache-control'));
  const lp = await pega(SITE + '/lp/anuncio-d/');
  if (lp.status === 200 && !/noindex/.test(lp.headers.get('x-robots-tag') || '')) R.erro('Landing de anúncio sem noindex no cabeçalho', '/lp/anuncio-d/');
}
R.passou('Cabeçalhos');

// 5. Robôs de busca e de IA recebem a página (o Cloudflare não pode desafiar nem bloquear).
const ROBOS = {
  Googlebot: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  Bingbot: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  YandexBot: 'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)',
  GPTBot: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)',
  'OAI-SearchBot': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)',
  ClaudeBot: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)',
  PerplexityBot: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)',
  facebookexternalhit: 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
  WhatsApp: 'WhatsApp/2.23.20.0',
};
for (const [nome, ua] of Object.entries(ROBOS)) {
  const r = await pega(SITE + '/cidades/volta-redonda/', { ua });
  const html = r.status === 200 ? await r.text() : '';
  if (r.status !== 200 || !/<h1/i.test(html)) R.erro('Robô de busca/IA não recebe a página', nome, `status ${r.status || r.erro}`);
}
const robots = await (await pega(SITE + '/robots.txt')).text();
if (/^Disallow:\s*\/\s*$/m.test(robots)) R.erro('robots.txt no ar bloqueando o site', SITE + '/robots.txt');
R.passou('Robôs');

// 6. Imagem de compartilhamento (prévia do WhatsApp) sai em JPG/PNG de verdade.
{
  const amostra = paginas().filter((p) => ['/', '/cidades/resende/', '/cortinas/', '/blog/o-que-e-blackout/'].includes(p.url));
  for (const p of amostra) {
    const r = await pega(SITE + p.url);
    const html = await r.text();
    const og = (html.match(/<meta\s+property="og:image"\s+content="([^"]*)"/i) || [])[1];
    if (!og) { R.erro('Página no ar sem og:image', p.url); continue; }
    const img = await pega(OFICIAL ? og : og.replace(BASE, SITE), { metodo: 'GET' });
    const tipo = img.headers.get('content-type') || '';
    if (img.status !== 200 || !/image\/(jpeg|png)/.test(tipo)) R.erro('Prévia do WhatsApp/Facebook quebrada (og:image não é JPG/PNG acessível)', p.url, `${og} → ${img.status} ${tipo}`);
  }
}
R.passou('Imagem de compartilhamento');

// 7. Domínio: sem www e http vão para https://www com 301 (só no site oficial).
if (OFICIAL) {
  for (const u of ['https://shinecortinas.com/', 'http://www.shinecortinas.com/', 'http://shinecortinas.com/']) {
    const r = await pega(u);
    const loc = r.headers.get('location') || '';
    if (![301, 308].includes(r.status) || !loc.startsWith('https://www.shinecortinas.com/')) R.erro('Domínio alternativo não redireciona para https://www', u, `${r.status} → ${loc}`);
  }
  const r404 = await pega(SITE + '/pagina-que-nao-existe-esteira/');
  if (r404.status !== 404) R.erro('Página inexistente não responde 404 (soft 404)', '/pagina-que-nao-existe-esteira/', String(r404.status));
  R.passou('Domínio e 404');
}

process.exit(R.imprimir());
