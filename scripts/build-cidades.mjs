// Gera as 15 páginas /cidades/<slug>/index.html a partir de cidades/cidades.json
// (conteúdo único por cidade) + o template do sistema visual "leve" (assets/shine-leve.css).
// O <head> de cada página (title, metas, canonical, JSON-LD) é preservado do arquivo existente.
// Blocos compartilhados (header, faixa, prova, comparação, rodapé, barra, scripts): scripts/partials.mjs
// Uso: node scripts/build-cidades.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { WA, esc, cleanHead, header, cityChip, strip, proof, compare, footer, waFloat, bar, tail } from './partials.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(join(ROOT, 'cidades', 'cidades.json'), 'utf8'));

function body(d) {
  const gallery = d.gallery.map((g) => `        <figure><div class="sl-media"><img src="${g.src}" alt="${esc(g.alt)}" width="800" height="800" loading="lazy" decoding="async"></div><figcaption><span>${g.tag}</span><p>${g.cap}</p></figcaption></figure>`).join('\n');
  const steps = d.steps.map((s, i) => `        <div class="sl-step"><div class="sl-step__n">${i + 1}</div><h3>${s.h}</h3><p>${s.p}</p></div>`).join('\n');
  const faq = d.faq.map((f) => `        <details><summary>${f.q}</summary><div>${f.a}</div></details>`).join('\n');
  const nearby = d.nearby.map(([slug, name]) => `<a href="/cidades/${slug}/">${name}</a>`).join('');
  return `<body data-wa-context="a página de ${d.city}">
${header('/cidades-atendidas.html')}
  <section class="sl-hero">
    <div class="sl-hero__img"><img src="/hero-sala.avif" alt="${esc(d.hero_alt)}" width="1920" height="1080" fetchpriority="high" decoding="async"></div>
    <div class="sl-wrap"><div class="sl-hero__in">
      <nav aria-label="Breadcrumb"><ol class="sl-crumbs">
        <li><a href="/">Início</a></li><li aria-hidden="true">/</li>
        <li><a href="/cidades-atendidas.html">Cidades</a></li><li aria-hidden="true">/</li>
        <li aria-current="page">${d.city}</li>
      </ol></nav>
      <p class="sl-kicker">${d.badge}</p>
      <h1 class="sl-h1">${d.h1_pre} <em>${d.h1_em}</em></h1>
      <div class="sl-hero__rule"></div>
      <p class="sl-lede">${d.hero_p}</p>
      <a class="sl-btn" data-wa="conversar" href="${WA}" target="_blank" rel="noopener noreferrer">Falar com um consultor →</a>
      <p class="sl-note">Sem compromisso · Resposta em minutos · Você decide o próximo passo</p>
    </div></div>
  </section>
${cityChip(d.city)}${strip()}
  <main>
    <section class="sl-section sl-reveal"><div class="sl-wrap sl-grid-2">
      <div class="sl-media"><img src="${d.imag_img}" alt="${esc(d.imag_alt)}" width="800" height="1000" loading="lazy" decoding="async"></div>
      <div class="sl-copy">
        <p class="sl-kicker">${d.imag_kicker}</p>
        <h2 class="sl-h2">${d.imag_h2}</h2>
        <p>${d.imag_p}</p>
        <a class="sl-btn sl-btn--green" data-wa="estimativa" href="${WA}" target="_blank" rel="noopener noreferrer">Quero esse resultado na minha casa →</a>
      </div>
    </div></section>

    <section class="sl-section sl-reveal"><div class="sl-wrap sl-grid-2 sl-grid-2--img-right">
      <div class="sl-media"><img src="${d.story_img}" alt="${esc(d.story_alt)}" width="800" height="1000" loading="lazy" decoding="async"></div>
      <div class="sl-copy">
        <p class="sl-kicker">${d.story_kicker}</p>
        <h2 class="sl-h2">${d.story_h2}</h2>
        <p>${d.story_p1}</p>
        <p>${d.story_p2}</p>
        <a class="sl-btn sl-btn--ghost" data-wa="estimativa" href="${WA}" target="_blank" rel="noopener noreferrer">Receber uma estimativa para o meu ambiente →</a>
      </div>
    </div></section>
${proof(d.city)}
    <section class="sl-section sl-reveal"><div class="sl-wrap">
      <div class="sl-center" style="margin-bottom:32px">
        <p class="sl-kicker sl-kicker--center">Projetos reais · Sul Fluminense</p>
        <h2 class="sl-h2">${d.gal_h2}</h2>
        <p class="sl-sub">${d.gal_p}</p>
      </div>
      <div class="sl-gallery">
${gallery}
      </div>
      <div class="sl-center" style="margin-top:34px"><a class="sl-btn sl-btn--ghost" data-wa="estimativa" href="${WA}" target="_blank" rel="noopener noreferrer">${d.gal_cta}</a></div>
    </div></section>
${compare()}
    <section class="sl-section sl-reveal"><div class="sl-wrap">
      <div class="sl-center" style="margin-bottom:34px">
        <p class="sl-kicker sl-kicker--center">Do contato à instalação</p>
        <h2 class="sl-h2">Como funciona em <em>${d.city}</em></h2>
      </div>
      <div class="sl-steps">
${steps}
      </div>
    </div></section>

    <section class="sl-band"><div class="sl-wrap">
      <p class="sl-kicker">Depoimento real · ${d.city}</p>
      <div class="sl-stars" aria-label="5 estrelas">★★★★★</div>
      <blockquote class="sl-quote">"${d.quote}"</blockquote>
      <p class="sl-quote-by">${d.quote_by}<small>${d.quote_sub}</small></p>
    </div></section>

    <section class="sl-section"><div class="sl-wrap">
      <div class="sl-center" style="margin-bottom:28px">
        <p class="sl-kicker sl-kicker--center">Dúvidas frequentes</p>
        <h2 class="sl-h2">Perguntas sobre <em>${d.city}</em></h2>
      </div>
      <div class="sl-faq">
${faq}
      </div>
    </div></section>

    <section class="sl-band"><div class="sl-wrap sl-center">
      <p class="sl-kicker sl-kicker--center">Consultoria em domicílio · ${d.city}</p>
      <h2 class="sl-h2">${d.cta_h2}</h2>
      <p class="sl-sub" style="margin:0 auto 26px">${d.cta_p}</p>
      <a class="sl-btn" data-wa="agendar" href="${WA}" target="_blank" rel="noopener noreferrer">Agendar consultoria em casa →</a>
      <p class="sl-note">Gratuita · Sem compromisso · (24) 99329-8763</p>
    </div></section>

    <section class="sl-section sl-section--tight"><div class="sl-wrap">
      <p class="sl-label">Explore o site</p>
      <div class="sl-links">
        <a href="/cortinas/">Cortinas sob medida</a><a href="/persianas/">Persianas técnicas</a><a href="/cortina-motorizada/">Cortina motorizada</a><a href="/cortina-wave/">Cortina wave</a>
        <a href="/blackout-e-forros/">Blackout e forros</a><a href="/portfolio/">Portfólio real</a><a href="/blog/">Blog e dicas</a><a href="/cidades-atendidas.html">Todas as cidades</a>
      </div>
      <p class="sl-label" style="margin-top:34px">Também atendemos na região</p>
      <div class="sl-chips">${nearby}</div>
    </div></section>
  </main>
${footer()}${waFloat()}${bar('single')}${tail()}`;
}

let n = 0;
for (const slug of readdirSync(join(ROOT, 'cidades'), { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name)) {
  const d = data[slug];
  if (!d) throw new Error(`sem dados em cidades.json para ${slug}`);
  const file = join(ROOT, 'cidades', slug, 'index.html');
  const src = readFileSync(file, 'utf8');
  writeFileSync(file, cleanHead(src.split('<body')[0]) + body(d));
  n++;
}
console.log(`build-cidades: ${n} páginas geradas`);
