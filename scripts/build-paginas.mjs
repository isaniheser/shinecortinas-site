// Gera as páginas de produto/institucionais no sistema visual "leve".
// Conteúdo em scripts/paginas.mjs. O <head> (title, metas, canonical, JSON-LD) é
// preservado do arquivo, com title/description atualizados e o FAQPage sincronizado
// com o que fica visível na página. Uso: node scripts/build-paginas.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { WA, esc, cleanHead, header, cityChip, strip, proof, compare, footer, waFloat, bar, tail } from './partials.mjs';
import { PAGINAS } from './paginas.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://www.shinecortinas.com';
const TODAY = new Date().toISOString().slice(0, 10);

const GALERIA = [
  ['/automacao-sq.avif', 'Automação', 'Cortina motorizada', 'Cortina motorizada em sala de estar, projeto ShineCortinas'],
  ['/blackout-sq.avif', 'Blackout', 'Forro blackout 100%', 'Tecido blackout do mostruário ShineCortinas'],
  ['/persiana-motorizada-sq.avif', 'Persiana', 'Persiana motorizada', 'Persiana rolô motorizada em sala de estar, projeto ShineCortinas'],
  ['/duplo-sq.avif', 'Duplo', 'Voil + linho', 'Sala com cortina dupla de voil e linho, projeto ShineCortinas'],
  ['/tela-solar-sq.avif', 'Tela solar', 'Vista livre, sol controlado', 'Sala envidraçada com rolô screen, projeto ShineCortinas'],
  ['/madeira-sq.avif', 'Madeira', 'Persiana de madeira', 'Ambiente com persiana horizontal de madeira, projeto ShineCortinas'],
];

const PASSOS = [
  ['Você fala com a gente', 'WhatsApp, Instagram ou telefone. Em minutos você fala com um consultor de verdade, sem robô e sem formulário.'],
  ['Agendamos a visita gratuita', 'O consultor vai até a sua casa, na sua cidade, no dia e horário que funcionar para você.'],
  ['Medição a laser', 'Cada ambiente medido com equipamento profissional. A medida é responsabilidade nossa, não sua.'],
  ['Projeto e aprovação', 'Você vê tecidos, cores e modelos no seu ambiente e aprova cada detalhe antes de qualquer compromisso.'],
  ['Confecção sob medida', 'Sua cortina ou persiana é feita do zero para a sua janela. Nada de peça genérica adaptada.'],
  ['Instalação pela nossa equipe', 'Chegamos, instalamos e saímos deixando o ambiente limpo. Na maioria dos projetos, tudo no mesmo dia.'],
];

const bloco = {
  prose: (b) => `
    <section class="sl-section sl-reveal"><div class="sl-wrap"><div class="sl-article">
      <h2 class="sl-h2">${b.h2}</h2>
      ${b.p.map((x) => `<p>${x}</p>`).join('\n      ')}
      ${b.list ? `<ul>${b.list.map((x) => `<li>${x}</li>`).join('')}</ul>` : ''}
    </div></div></section>`,

  cards: (b) => `
    <section class="sl-section sl-reveal"><div class="sl-wrap">
      <div class="sl-center" style="margin-bottom:30px">
        <p class="sl-kicker sl-kicker--center">O que a gente faz</p>
        <h2 class="sl-h2">${b.h2}</h2>
        ${b.sub ? `<p class="sl-sub">${b.sub}</p>` : ''}
      </div>
      <div class="sl-cards">
${b.items.map((i) => `        <div class="sl-card"><div class="sl-media"><img src="${i.img}" alt="${esc(i.alt || `${i.h} — ShineCortinas`)}" width="800" height="600" loading="lazy" decoding="async">${i.ref ? '<span class="sl-media__ref">Referência do modelo, em outro ambiente</span>' : ''}</div><div class="sl-card__body"><span>${i.tag}</span><h3>${i.h}</h3><p>${i.p}</p></div></div>`).join('\n')}
      </div>
    </div></section>`,

  table: (b) => `
    <section class="sl-section sl-reveal"><div class="sl-wrap">
      <div class="sl-center" style="margin-bottom:26px"><h2 class="sl-h2">${b.h2}</h2></div>
      <div class="sl-tablewrap" style="max-width:820px;margin:0 auto"><table>
        <thead><tr>${b.head.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
        <tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
      </table></div>
    </div></section>`,

  gallery: () => `
    <section class="sl-section sl-reveal"><div class="sl-wrap">
      <div class="sl-gallery">
${GALERIA.map(([src, tag, cap, alt]) => `        <figure><div class="sl-media"><img src="${src}" alt="${esc(alt)}" width="800" height="800" loading="lazy" decoding="async"></div><figcaption><span>${tag}</span><p>${cap}</p></figcaption></figure>`).join('\n')}
      </div>
    </div></section>`,

  steps6: () => `
    <section class="sl-section sl-reveal"><div class="sl-wrap">
      <div class="sl-center" style="margin-bottom:34px">
        <p class="sl-kicker sl-kicker--center">Simples, transparente, sem surpresa</p>
        <h2 class="sl-h2">Os seis passos do <em>atendimento Shine</em></h2>
      </div>
      <div class="sl-steps sl-steps--6">
${PASSOS.map(([h, p], i) => `        <div class="sl-step"><div class="sl-step__n">${i + 1}</div><h3>${h}</h3><p>${p}</p></div>`).join('\n')}
      </div>
    </div></section>`,

  ceo: () => `
    <section class="sl-section sl-reveal"><div class="sl-wrap sl-ceo">
      <img src="/ceo-shine.avif" alt="Isani Oliveira, fundador e CEO da ShineCortinas" width="320" height="320" loading="lazy" decoding="async">
      <div>
        <p class="sl-kicker">Quem responde por cada projeto</p>
        <blockquote class="sl-ceo__quote">"Alinhamento se faz antes. Depois disso, o que vier é justificativa."</blockquote>
        <p>Isani Oliveira fundou a Shine em 2009 e continua à frente de cada projeto. A missão é garantir engenharia e cuidado para a sua família, com o mesmo padrão em cada medida e em cada instalação.</p>
        <p class="sl-quote-by" style="margin-top:12px">Isani Oliveira<small>Fundador e CEO da ShineCortinas</small></p>
      </div>
    </div></section>`,

  contato: () => `
    <section class="sl-section sl-reveal"><div class="sl-wrap">
      <div class="sl-contato">
        <div><span>WhatsApp</span><a class="sl-contato__big" data-wa="conversar" href="${WA}" target="_blank" rel="noopener noreferrer">(24) 99329-8763</a><p>Resposta em minutos, por um consultor de verdade.</p></div>
        <div><span>Telefone</span><p class="sl-contato__big">(24) 3338-3069</p><p>Para quem prefere falar por telefone.</p></div>
        <div><span>Sede</span><p class="sl-contato__big">Volta Redonda, RJ</p><p>Rua K, 60. O atendimento principal é na sua casa, em todo o Sul Fluminense.</p></div>
      </div>
    </div></section>`,

  proof: () => proof(null),
  compare: () => compare(),
};

function render(p) {
  const corpo = p.blocos.map((b) => bloco[b.t](b)).join('\n');
  const faq = p.faq.map(([q, a]) => `        <details><summary>${q}</summary><div>${a}</div></details>`).join('\n');
  const links = p.links.map(([h, t]) => `<a href="${h}">${t}</a>`).join('');
  return `<body data-wa-context="a página de ${esc(p.kicker.toLowerCase())}">
${header('/' + p.dir + '/')}
  <section class="sl-hero sl-hero--interna">
    <div class="sl-hero__img"><img src="${p.hero}" alt="${esc(p.heroAlt)}" width="1920" height="1080" fetchpriority="high" decoding="async"></div>
    <div class="sl-wrap"><div class="sl-hero__in">
      <nav aria-label="Breadcrumb"><ol class="sl-crumbs">
        <li><a href="/">Início</a></li><li aria-hidden="true">/</li>
        <li aria-current="page">${p.kicker}</li>
      </ol></nav>
      <p class="sl-kicker">${p.kicker}</p>
      <h1 class="sl-h1">${p.h1}</h1>
      <div class="sl-hero__rule"></div>
      <p class="sl-lede">${p.lead}</p>
      <a class="sl-btn" data-wa="conversar" href="${WA}" target="_blank" rel="noopener noreferrer">Falar com um consultor →</a>
      <p class="sl-note">Sem compromisso · Resposta em minutos · Você decide o próximo passo</p>
    </div></div>
  </section>
${cityChip(null)}${strip()}
  <main>
${corpo}

    <section class="sl-section sl-reveal"><div class="sl-wrap">
      <div class="sl-center" style="margin-bottom:28px">
        <p class="sl-kicker sl-kicker--center">Dúvidas frequentes</p>
        <h2 class="sl-h2">Perguntas sobre <em>${p.kicker.toLowerCase()}</em></h2>
      </div>
      <div class="sl-faq">
${faq}
      </div>
    </div></section>

    <section class="sl-band"><div class="sl-wrap sl-center">
      <p class="sl-kicker sl-kicker--center">Consultoria em domicílio · Sul Fluminense</p>
      <h2 class="sl-h2">Pronto para ver os tecidos <em>na sua casa?</em></h2>
      <p class="sl-sub" style="margin:0 auto 26px">A consultoria é gratuita, vai até você e não obriga a decidir nada na hora.</p>
      <a class="sl-btn" data-wa="agendar" href="${WA}" target="_blank" rel="noopener noreferrer">Agendar consultoria em casa →</a>
      <p class="sl-note">Gratuita · Sem compromisso · (24) 99329-8763</p>
    </div></section>

    <section class="sl-section sl-section--tight"><div class="sl-wrap">
      <p class="sl-label">Explore o site</p>
      <div class="sl-links">${links}</div>
    </div></section>
  </main>
${footer()}${waFloat()}${bar('single')}${tail()}`;
}

// Atualiza title/description e sincroniza o FAQPage do JSON-LD com a FAQ visível.
function ajustaHead(head, p) {
  const url = `${BASE}/${p.dir}/`;
  head = head.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(p.title)}</title>`);
  head = head.replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(p.description)}$2`);
  head = head.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(p.title)}$2`);
  head = head.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(p.description)}$2`);
  const m = head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (m) {
    const ld = JSON.parse(m[1]);
    const g = ld['@graph'] || [ld];
    const faqNode = {
      '@type': 'FAQPage', '@id': `${url}#faq`,
      mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    };
    const i = g.findIndex((n) => n['@type'] === 'FAQPage');
    if (i >= 0) g[i] = faqNode; else g.push(faqNode);
    const biz = g.find((n) => n['@type'] === 'LocalBusiness');
    if (biz) {
      biz['@id'] = `${BASE}/#biz`;
      if (!biz.priceRange) biz.priceRange = '$$';
      if (biz.address && !biz.address.streetAddress) biz.address = { '@type': 'PostalAddress', streetAddress: 'Rua K, 60', ...biz.address };
    }
    const org = g.find((n) => n['@type'] === 'Organization' && !n['@id']);
    if (org) org['@id'] = `${BASE}/#org`;
    const j = g.findIndex((n) => n['@type'] === 'WebPage');
    const web = { '@type': 'WebPage', '@id': url, url, name: p.title, inLanguage: 'pt-BR', dateModified: TODAY,
      about: { '@id': `${BASE}/#biz` },
      speakable: { '@type': 'SpeakableSpecification', xpath: ['/html/body//h1', '/html/body//p[@class="sl-lede"]'] } };
    if (j >= 0) g[j] = web; else g.push(web);
    const out = ld['@graph'] ? { ...ld, '@graph': g } : { '@context': 'https://schema.org', '@graph': g };
    head = head.replace(m[0], () => `<script type="application/ld+json">\n${JSON.stringify(out, null, 2)}\n</script>`);
  }
  return head;
}

let n = 0;
for (const p of PAGINAS) {
  const file = join(ROOT, p.dir, 'index.html');
  if (!existsSync(file)) throw new Error(`página não existe: ${p.dir}/`);
  const src = readFileSync(file, 'utf8');
  writeFileSync(file, ajustaHead(cleanHead(src.split('<body')[0]), p) + render(p));
  n++;
}
console.log(`build-paginas: ${n} páginas geradas`);
