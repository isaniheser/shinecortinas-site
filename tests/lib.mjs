// Funções comuns da esteira de qualidade (sem dependências externas).
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const BASE = 'https://www.shinecortinas.com';

// Pastas que não são site publicado.
const FORA = new Set(['.git', 'node_modules', 'docs', 'scripts', 'tests', '.github', '.claude', '.agents']);

// Lista as páginas HTML publicadas: [{ file, url, html }]
export function paginas() {
  const out = [];
  (function walk(dir) {
    for (const nome of readdirSync(dir)) {
      if (FORA.has(nome)) continue;
      const p = join(dir, nome);
      if (statSync(p).isDirectory()) walk(p);
      else if (nome.endsWith('.html')) {
        const rel = '/' + relative(ROOT, p).split('\\').join('/');
        const url = rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel;
        out.push({ file: relative(ROOT, p), url, html: readFileSync(p, 'utf8') });
      }
    }
  })(ROOT);
  return out.sort((a, b) => a.url.localeCompare(b.url));
}

export function decode(s) {
  return s
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

// Texto visível (sem script, style, svg e comentários).
export function textoVisivel(html) {
  const corpo = html.replace(/<head[\s\S]*?<\/head>/i, ' ');
  return decode(
    corpo
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<(script|style|svg|noscript|template)\b[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<\/?(p|div|li|ul|ol|h[1-6]|td|th|tr|dt|dd|summary|details|section|article|header|footer|nav|figure|figcaption|blockquote|button|a|br|span|strong)\b[^>]*>/gi, (t) => (/^<\/?(span|strong|a)\b/i.test(t) ? ' ' : '\n'))
      .replace(/<[^>]+>/g, ' ')
  ).replace(/[ \t\r]+/g, ' ').replace(/ ?\n[\n ]*/g, '\n').trim();
}

// Frases do texto visível (quebra em pontuação final e em fim de bloco).
export function frases(html) {
  return textoVisivel(html).split(/(?<=[.!?])\s+|\n/).map((f) => f.trim()).filter(Boolean);
}

// Pendências já conhecidas (tests/pendencias-conhecidas.json) viram aviso em vez de erro,
// para a esteira não bloquear o site por decisão que ainda depende do Isani.
let PEND = null;
export function pendencia(regra, onde, detalhe) {
  if (!PEND) {
    try { PEND = JSON.parse(readFileSync(join(ROOT, 'tests', 'pendencias-conhecidas.json'), 'utf8')).itens; }
    catch { PEND = []; }
  }
  return PEND.find((x) => x.regra === regra && (!x.onde || onde.includes(x.onde)) && (!x.contem || String(detalhe).includes(x.contem)));
}

export function meta(html, re) {
  const m = html.match(re);
  return m ? decode(m[1].trim()) : null;
}

export function jsonLd(html) {
  const blocos = [];
  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try { blocos.push({ ok: true, data: JSON.parse(m[1]) }); }
    catch (e) { blocos.push({ ok: false, erro: e.message }); }
  }
  return blocos;
}

// Percorre todos os nós de um JSON-LD.
export function nos(data, fn) {
  (function walk(x) {
    if (Array.isArray(x)) return x.forEach(walk);
    if (x && typeof x === 'object') {
      if (x['@type']) fn(x);
      Object.values(x).forEach(walk);
    }
  })(data);
}

export function tipos(no) {
  const t = no['@type'];
  return Array.isArray(t) ? t : [t];
}

export function existe(rel) {
  return existsSync(join(ROOT, decodeURIComponent(rel)));
}

export function ler(rel) {
  return readFileSync(join(ROOT, rel), 'utf8');
}

// Regras do _redirects: [{ linha, origem, destino, codigo, raw }]
export function redirects() {
  return ler('_redirects').split('\n').map((raw, i) => ({ raw, linha: i + 1 }))
    .filter((r) => r.raw.trim() && !r.raw.trim().startsWith('#'))
    .map((r) => {
      const [origem, destino, codigo] = r.raw.trim().split(/\s+/);
      return { ...r, origem, destino, codigo };
    });
}

// Relatório: erros bloqueiam, avisos só aparecem.
export class Relatorio {
  constructor(titulo) { this.titulo = titulo; this.erros = []; this.avisos = []; this.ok = []; }
  erro(regra, onde, detalhe = '') {
    const p = pendencia(regra, onde, detalhe);
    if (p) this.avisos.push({ regra: `Pendência conhecida: ${regra}`, onde, detalhe: `${detalhe} (${p.motivo})` });
    else this.erros.push({ regra, onde, detalhe });
  }
  aviso(regra, onde, detalhe = '') { this.avisos.push({ regra, onde, detalhe }); }
  passou(regra) { this.ok.push(regra); }
  imprimir() {
    const gh = !!process.env.GITHUB_ACTIONS;
    const linha = (x) => `${x.onde}${x.detalhe ? ' → ' + x.detalhe : ''}`;
    console.log(`\n=== ${this.titulo} ===`);
    for (const r of agrupar(this.erros)) {
      console.log(`\n✗ ${r.regra} (${r.itens.length})`);
      r.itens.slice(0, 40).forEach((x) => console.log('   ' + linha(x)));
      if (r.itens.length > 40) console.log(`   … e mais ${r.itens.length - 40}`);
      if (gh) console.log(`::error title=${r.regra}::${r.itens.length} ocorrência(s). Primeira: ${linha(r.itens[0]).slice(0, 300)}`);
    }
    for (const r of agrupar(this.avisos)) {
      console.log(`\n⚠ ${r.regra} (${r.itens.length})`);
      r.itens.slice(0, 15).forEach((x) => console.log('   ' + linha(x)));
      if (r.itens.length > 15) console.log(`   … e mais ${r.itens.length - 15}`);
      if (gh) console.log(`::warning title=${r.regra}::${r.itens.length} ocorrência(s). Primeira: ${linha(r.itens[0]).slice(0, 300)}`);
    }
    console.log(`\n${this.erros.length ? '✗' : '✓'} ${this.titulo}: ${this.erros.length} erro(s), ${this.avisos.length} aviso(s), ${this.ok.length} regra(s) sem problema.`);
    if (process.env.GITHUB_STEP_SUMMARY) {
      const md = [`### ${this.erros.length ? '❌' : '✅'} ${this.titulo}`, ''];
      for (const r of agrupar(this.erros)) md.push(`- ❌ **${r.regra}** (${r.itens.length}): \`${linha(r.itens[0]).slice(0, 200)}\``);
      for (const r of agrupar(this.avisos)) md.push(`- ⚠️ ${r.regra} (${r.itens.length}): \`${linha(r.itens[0]).slice(0, 200)}\``);
      md.push('', `${this.ok.length} regra(s) sem problema.`, '');
      import('node:fs').then(({ appendFileSync }) => appendFileSync(process.env.GITHUB_STEP_SUMMARY, md.join('\n') + '\n'));
    }
    return this.erros.length ? 1 : 0;
  }
}

function agrupar(lista) {
  const m = new Map();
  for (const x of lista) {
    if (!m.has(x.regra)) m.set(x.regra, []);
    m.get(x.regra).push(x);
  }
  return [...m].map(([regra, itens]) => ({ regra, itens }));
}
