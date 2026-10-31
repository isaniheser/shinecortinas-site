// Camada 2 da esteira: o site aberto num navegador de verdade (celular), com Playwright + axe.
// Uso: cd tests && npm ci && node navegador.mjs            (sobe um servidor local na raiz do site)
//      SITE_URL=https://<prévia>.pages.dev node navegador.mjs  (testa uma prévia do Cloudflare)
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { createRequire } from 'node:module';
import { chromium, devices } from 'playwright';
import { ROOT, Relatorio } from './lib.mjs';

const require = createRequire(import.meta.url);
const AXE = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const BASELINE = JSON.parse(readFileSync(join(ROOT, 'tests', 'axe-conhecidos.json'), 'utf8')).regras;
const R = new Relatorio('Camada 2: navegador (celular)');

const PAGINAS = [
  '/', '/cidades/volta-redonda/', '/cidades/itatiaia/', '/cortinas/', '/persianas/', '/cortina-motorizada/',
  '/blog/', '/blog/o-que-e-blackout/', '/contato/', '/faq/', '/sobre/', '/portfolio/',
  '/videos/cortina-motorizada-wave-resende/', '/lavagem-de-cortinas/', '/lp/anuncio-d/',
];

// Orçamentos de velocidade (4G simulado + CPU 4x mais lenta). Erro bloqueia, aviso só alerta.
const ORCAMENTO = { lcpAviso: 2500, lcpErro: 4000, cls: 0.1, kbAviso: 750, kbErro: 1000 };

// ---------- servidor local que imita o Cloudflare Pages ----------
const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.avif': 'image/avif', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain', '.mp4': 'video/mp4', '.webmanifest': 'application/manifest+json' };
function servidor() {
  return new Promise((ok) => {
    const s = createServer((req, res) => {
      const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      let f = join(ROOT, path);
      if (existsSync(f) && statSync(f).isDirectory()) {
        if (!path.endsWith('/')) { res.writeHead(308, { Location: path + '/' }); return res.end(); }
        f = join(f, 'index.html');
      }
      if (!existsSync(f) || path.includes('..')) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(readFileSync(join(ROOT, '404.html')));
      }
      res.writeHead(200, { 'Content-Type': TIPOS[extname(f)] || 'application/octet-stream' });
      res.end(readFileSync(f));
    }).listen(0, '127.0.0.1', () => ok(s));
  });
}

const IGNORAR_REDE = /\/api\/(geo|instagram)|cloudflarestream|fonts\.g(oogleapis|static)\.com|cdninstagram|challenge-platform|cdn-cgi/;

async function main() {
  let srv = null;
  let BASE = process.env.SITE_URL;
  if (!BASE) { srv = await servidor(); BASE = `http://127.0.0.1:${srv.address().port}`; }
  console.log('Testando', BASE);
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ...devices['iPhone 13'], reducedMotion: 'reduce' });

  for (const url of PAGINAS) {
    const page = await ctx.newPage();
    const problemas = [];
    page.on('pageerror', (e) => problemas.push(['Erro de JavaScript na página', e.message]));
    page.on('console', (m) => { if (m.type() === 'error' && !IGNORAR_REDE.test(m.text() + (m.location()?.url || ''))) problemas.push(['Erro no console', m.text()]); });
    page.on('response', (r) => {
      const u = r.url();
      if (r.status() >= 400 && u.startsWith(BASE) && !IGNORAR_REDE.test(u)) problemas.push(['Arquivo do site com erro HTTP', `${r.status()} ${u.replace(BASE, '')}`]);
    });
    const resp = await page.goto(BASE + url, { waitUntil: 'load' });
    if (!resp || resp.status() !== 200) { R.erro('Página não abriu com 200', url, String(resp && resp.status())); await page.close(); continue; }
    await page.waitForTimeout(800);
    for (const [regra, det] of problemas) R.erro(regra, url, det);

    // Fontes: fora da LP, nada de Montserrat/Cinzel (identidade: Plus Jakarta Sans + Cormorant/Playfair).
    if (!url.startsWith('/lp/')) {
      const fontes = await page.evaluate(() => [...document.querySelectorAll('link[href*="fonts.googleapis"]')].map((l) => l.href).join(' '));
      if (/Montserrat|Cinzel/.test(fontes)) R.erro('Fonte fora da identidade visual (Montserrat/Cinzel)', url);
    }

    // Rolagem horizontal no celular (layout vazando).
    const vaza = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (vaza > 2) R.erro('Página rola para o lado no celular (algo mais largo que a tela)', url, `${vaza}px`);

    // Acessibilidade (axe, WCAG 2.2 AA).
    await page.addScriptTag({ content: AXE });
    const axe = await page.evaluate(async () => {
      const r = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } });
      return r.violations.map((v) => ({ id: v.id, impacto: v.impact, ajuda: v.help, n: v.nodes.length, alvo: v.nodes[0]?.target?.join(' ') }));
    });
    for (const v of axe) {
      const k = BASELINE[v.id];
      const conhecido = k && (!k.paginas || k.paginas.some((x) => url.startsWith(x))) ? k.motivo : null;
      const msg = `${v.ajuda} (${v.n}x; ex.: ${v.alvo})`;
      if (conhecido) R.aviso(`Acessibilidade conhecida: ${v.id}`, url, `${msg}. ${conhecido}`);
      else if (v.impacto === 'critical' || v.impacto === 'serious') R.erro(`Acessibilidade: ${v.id} (${v.impacto})`, url, msg);
      else R.aviso(`Acessibilidade: ${v.id} (${v.impacto})`, url, msg);
    }
    await page.close();
  }
  R.passou('Páginas sem erro de JavaScript e com acessibilidade conferida');

  // ---------- velocidade com 4G simulado ----------
  for (const url of ['/', '/cidades/volta-redonda/', '/blog/o-que-e-blackout/']) {
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    let bytes = 0;
    page.on('response', async (r) => { if (r.url().startsWith(BASE)) { const b = await r.body().catch(() => null); if (b) bytes += b.length; } });
    await page.addInitScript(() => {
      window.__lcp = 0; window.__cls = 0;
      new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.goto(BASE + url, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(2500);
    const { lcp, cls } = await page.evaluate(() => ({ lcp: window.__lcp, cls: window.__cls }));
    const kb = Math.round(bytes / 1024);
    const det = `LCP ${Math.round(lcp)} ms, CLS ${cls.toFixed(3)}, ${kb} KB do próprio site`;
    console.log(`  velocidade ${url}: ${det}`);
    if (lcp > ORCAMENTO.lcpErro) R.erro('Imagem principal demora demais (LCP)', url, det);
    else if (lcp > ORCAMENTO.lcpAviso) R.aviso('Imagem principal acima de 2,5 s (LCP)', url, det);
    if (cls > ORCAMENTO.cls) R.erro('Página pula enquanto carrega (CLS acima de 0,1)', url, det);
    if (kb > ORCAMENTO.kbErro) R.erro('Página pesada demais', url, det);
    else if (kb > ORCAMENTO.kbAviso) R.aviso('Página ficando pesada', url, det);
    await page.close();
  }
  R.passou('Velocidade');

  // ---------- Home: gavetas pelo teclado e histórico ----------
  {
    const page = await ctx.newPage();
    await page.goto(BASE + '/', { waitUntil: 'load' });
    const abre = page.locator('#cases-grid .d-ig-open').first();
    if (!(await abre.count())) R.erro('Cartão do acervo sem botão acessível pelo teclado', '/');
    else {
      await abre.focus();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);
      const s = await page.evaluate(() => {
        const m = document.getElementById('case-sheet-modal');
        return { aberta: m.classList.contains('is-open'), focoDentro: m.contains(document.activeElement), fundoInerte: document.getElementById('site-viewport').hasAttribute('inert') };
      });
      if (!s.aberta) R.erro('Enter no cartão do acervo não abre a ficha', '/');
      if (!s.focoDentro) R.erro('Foco não entra na gaveta aberta', '/');
      if (!s.fundoInerte) R.erro('Fundo continua clicável/focável com a gaveta aberta', '/');
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);
      const f = await page.evaluate(() => ({
        fechada: !document.getElementById('case-sheet-modal').classList.contains('is-open'),
        focoVoltou: !!document.activeElement && document.activeElement.classList.contains('d-ig-open'),
        url: location.pathname,
      }));
      if (!f.fechada) R.erro('Esc não fecha a gaveta', '/');
      if (!f.focoVoltou) R.erro('Foco não volta ao cartão depois de fechar a gaveta', '/');
      if (f.url !== '/') R.erro('Fechar a gaveta tirou o visitante da página', '/', f.url);
      await page.evaluate(() => openMenuSheet());
      await page.waitForTimeout(200);
      await page.goBack();
      await page.waitForTimeout(400);
      const v = await page.evaluate(() => ({ fechou: !document.getElementById('menu-sheet-modal').classList.contains('is-open'), url: location.pathname }));
      if (!v.fechou || v.url !== '/') R.erro('Botão voltar do celular não fecha a gaveta (ou sai da página)', '/', JSON.stringify(v));
    }
    await page.close();
  }
  R.passou('Gavetas da Home');

  // ---------- WhatsApp por plataforma ----------
  for (const [dev, esperado] of [['iPhone 13', /^https:\/\/wa\.me\/5524993298763/], ['Pixel 7', /^whatsapp:\/\/send\?phone=5524993298763/]]) {
    const c = await browser.newContext(devices[dev]);
    const page = await c.newPage();
    await page.goto(BASE + '/cidades/resende/', { waitUntil: 'load' });
    await page.waitForTimeout(300);
    const href = await page.evaluate(() => {
      const a = document.querySelector('a[href*="wa.me"], a[href^="whatsapp:"]');
      a.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
      return a.getAttribute('href');
    });
    if (!esperado.test(href || '')) R.erro('Link do WhatsApp errado para a plataforma', `${dev} /cidades/resende/`, href);
    await c.close();
  }
  R.passou('WhatsApp por plataforma');

  await browser.close();
  if (srv) srv.close();
  process.exit(R.imprimir());
}

main().catch((e) => { console.error(e); process.exit(1); });
