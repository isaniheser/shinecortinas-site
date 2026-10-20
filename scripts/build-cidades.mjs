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

const LAUNDRY_SLUGS = new Set(['volta-redonda', 'barra-mansa', 'resende', 'barra-do-pirai', 'pirai', 'pinheiral']);

function cityFaqs(d) {
  const base = [...(d.faq || [])];
  const hasMotor = base.some((f) => /motorizad/i.test(f.q));
  if (!hasMotor) {
    base.push({
      q: `Vocês instalam cortina motorizada e persiana motorizada em ${d.city}?`,
      a: `Sim. Projetamos e instalamos cortina motorizada em trilho suíço Wave ou prega e persiana motorizada (rolô, tela solar e blackout) em ${d.city}. Trabalhamos com motorização Somfy e linhas homologadas silenciosas, com opção a bateria recarregável sem quebrar parede ou ponto 110V/220V e integração com Alexa, Google Home e Apple HomeKit.`,
    });
  }
  if (LAUNDRY_SLUGS.has(d.slug) && !base.some((f) => /lavagem|lavar/i.test(f.q))) {
    base.push({
      q: `Vocês fazem lavagem de cortinas sob medida em ${d.city}?`,
      a: `Sim. Em ${d.city}, nossa própria equipe retira sua cortina de tecido do trilho ou varão, realiza a lavagem técnica para linho, voil e blackout sem encolher e devolve instalada e alinhada no lugar.`,
    });
  }
  return base;
}

function citySolutions(d) {
  const isLaundry = LAUNDRY_SLUGS.has(d.slug);
  return `
    <section class="sl-section sl-reveal"><div class="sl-wrap">
      <div class="sl-center" style="margin-bottom:30px">
        <p class="sl-kicker sl-kicker--center">Soluções sob medida · ${d.city}</p>
        <h2 class="sl-h2">Cortina motorizada, Wave e persianas <em>em ${d.city}</em></h2>
        <p class="sl-sub">Do linho com forro blackout 100% à automação residencial compatível com Alexa e Google Home: conheça os sistemas que medimos a laser e instalamos em ${d.city}.</p>
      </div>
      <div class="sl-cards">
        <div class="sl-card"><div class="sl-media"><img src="/automacao-sq.avif" alt="${esc(`Cortina motorizada sob medida em ${d.city}, ShineCortinas`)}" width="800" height="600" loading="lazy" decoding="async"></div><div class="sl-card__body"><span>Automação residencial</span><h3>Cortina e persiana motorizada</h3><p>Trilho motorizado silencioso e persiana rolô motorizada em ${d.city}, com versão a bateria recarregável sem obra ou elétrica e comando por controle, celular e voz. <a href="/cortina-motorizada/">Ver cortina motorizada →</a></p></div></div>
        <div class="sl-card"><div class="sl-media"><img src="/duplo-sq.avif" alt="${esc(`Cortina Wave em linho e voil sob medida em ${d.city}, ShineCortinas`)}" width="800" height="600" loading="lazy" decoding="async"></div><div class="sl-card__body"><span>Alfaiataria têxtil</span><h3>Cortina Wave em linho e voil</h3><p>Ondas simétricas em trilho suíço de alumínio, prega americana ou prega macho, confeccionadas ao milímetro para salas e suítes em ${d.city}. <a href="/cortina-wave/">Ver cortina Wave →</a></p></div></div>
        <div class="sl-card"><div class="sl-media"><img src="/tela-solar-sq.avif" alt="${esc(`Persiana rolô tela solar e madeira sob medida em ${d.city}, ShineCortinas`)}" width="800" height="600" loading="lazy" decoding="async"></div><div class="sl-card__body"><span>Controle solar</span><h3>Persianas rolô, tela solar e madeira</h3><p>Tela solar 1%, 3% e 5% para varandas gourmet, Double Vision, romana e madeira natural instaladas por equipe própria em ${d.city}. <a href="/persianas/">Ver persianas →</a></p></div></div>
        <div class="sl-card"><div class="sl-media"><img src="/blackout-sq.avif" alt="${esc(`Cortina blackout 100% sob medida em ${d.city}, ShineCortinas`)}" width="800" height="600" loading="lazy" decoding="async"></div><div class="sl-card__body"><span>Conforto térmico e escuro real</span><h3>Blackout 100%, 80% e forros</h3><p>Forro blackout acoplado ou em trilho duplo para bloquear luz e calor em quartos, suítes e salas de TV em ${d.city}. <a href="/blackout-e-forros/">Ver blackout e forros →</a></p></div></div>
      </div>${isLaundry ? `
      <div class="sl-center" style="margin-top:28px"><p class="sl-sub" style="margin:0 auto">Já tem cortina de tecido instalada em ${d.city}? Conheça também nosso serviço de <a href="/lavagem-de-cortinas/"><strong>lavagem de cortinas com retirada e reinstalação em domicílio</strong></a>.</p></div>` : ''}
    </div></section>`;
}

function body(d) {
  const gallery = d.gallery.map((g) => `        <figure><div class="sl-media"><img src="${g.src}" alt="${esc(g.alt)}" width="800" height="800" loading="lazy" decoding="async"></div><figcaption><span>${g.tag}</span><p>${g.cap}</p></figcaption></figure>`).join('\n');
  const steps = d.steps.map((s, i) => `        <div class="sl-step"><div class="sl-step__n">${i + 1}</div><h3>${s.h}</h3><p>${s.p}</p></div>`).join('\n');
  const faq = cityFaqs(d).map((f) => `        <details><summary>${f.q}</summary><div>${f.a}</div></details>`).join('\n');
  const nearby = d.nearby.map(([slug, name]) => `<a href="/cidades/${slug}/">${name}</a>`).join('');
  return `<body data-concept="ambientes" data-logo-finish="aurora" data-wa-context="a página de ${d.city}">
${header('/cidades-atendidas/')}
  <section class="sl-hero">
    <div class="sl-hero__img"><img src="/hero-sala.avif" alt="${esc(d.hero_alt)}" width="1920" height="1080" fetchpriority="high" decoding="async"></div>
    <div class="sl-wrap"><div class="sl-hero__in">
      <nav aria-label="Breadcrumb"><ol class="sl-crumbs">
        <li><a href="/">Início</a></li><li aria-hidden="true">/</li>
        <li><a href="/cidades-atendidas/">Cidades</a></li><li aria-hidden="true">/</li>
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
${proof(d.city)}${citySolutions(d)}
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
      <p class="sl-kicker">Avaliação real no Google</p>
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
        <a href="/blackout-e-forros/">Blackout e forros</a><a href="/trilhos-e-acionamentos/">Trilhos e motores</a><a href="/lavagem-de-cortinas/">Lavagem de cortinas</a><a href="/portfolio/">Portfólio real</a><a href="/blog/">Blog e dicas</a><a href="/cidades-atendidas/">Todas as cidades</a>
      </div>
      <p class="sl-label" style="margin-top:34px">Também atendemos na região</p>
      <div class="sl-chips">${nearby}</div>
    </div></section>
  </main>
${footer()}${waFloat()}${bar('single')}${tail()}`;
}

// O depoimento visível é uma avaliação real e pública do Google (cidades.json: quote,
// quote_google_author, quote_date). Só por isso ele entra no JSON-LD como schema.org/Review,
// no nó LocalBusiness do <head>. Substituição por função: nunca passar texto gerado como
// 2º argumento de .replace() (bug do "$$").
function withReview(head, d) {
  const BASE = 'https://www.shinecortinas.com';
  const url = `${BASE}/cidades/${d.slug}/`;
  const faqs = cityFaqs(d);
  return head.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g, (m, open, raw, close) => {
    let ld; try { ld = JSON.parse(raw); } catch { return m; }
    const nodes = ld['@graph'] || [ld];
    const biz = nodes.find((x) => x['@type'] === 'LocalBusiness' || (Array.isArray(x['@type']) && x['@type'].includes('LocalBusiness')));
    if (biz && d.quote_google_author && d.quote_date) {
      biz.review = [{
        '@type': 'Review',
        author: { '@type': 'Person', name: d.quote_by },
        datePublished: d.quote_date,
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: d.quote.replace(/\s*\[…\]\s*/g, ' ').replace(/\s+/g, ' ').trim(),
      }];
    }
    const srv = nodes.find((x) => x['@type'] === 'Service');
    if (srv) {
      const offers = [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: `Cortina Motorizada Sob Medida em ${d.city}`, url: `${BASE}/cortina-motorizada/` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: `Persiana Motorizada em ${d.city}`, url: `${BASE}/cortina-motorizada/` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: `Cortina Wave em Linho e Voil em ${d.city}`, url: `${BASE}/cortina-wave/` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: `Persiana Rolô Tela Solar e Madeira em ${d.city}`, url: `${BASE}/persianas/` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: `Cortina Blackout 100% em ${d.city}`, url: `${BASE}/blackout-e-forros/` } },
      ];
      if (LAUNDRY_SLUGS.has(d.slug)) {
        offers.push({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: `Lavagem de Cortinas de Tecido em ${d.city}`, url: `${BASE}/lavagem-de-cortinas/` } });
      }
      srv.hasOfferCatalog = {
        '@type': 'OfferCatalog',
        name: `Cortinas, Persianas e Automação em ${d.city}`,
        itemListElement: offers,
      };
    }
    const person = nodes.find((x) => x['@type'] === 'Person');
    if (person) {
      person['@id'] = `${BASE}/#isani`;
      person.url = `${BASE}/sobre/`;
      if (!person.image) person.image = `${BASE}/isani-consultoria.avif`;
    }
    const faqNode = nodes.find((x) => x['@type'] === 'FAQPage');
    if (faqNode && faqs.length) {
      faqNode['@id'] = `${url}#faq`;
      faqNode.mainEntity = faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }));
    }
    const bcNode = nodes.find((x) => x['@type'] === 'BreadcrumbList');
    if (bcNode) {
      bcNode['@id'] = `${url}#breadcrumb`;
      bcNode.itemListElement = [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${BASE}/` },
        { '@type': 'ListItem', position: 2, name: 'Cidades', item: `${BASE}/cidades-atendidas/` },
        { '@type': 'ListItem', position: 3, name: d.city, item: url },
      ];
    }
    const indent = (raw.match(/\n(\s*)\S/) || [, '  '])[1];
    return open + '\n' + indent + JSON.stringify(ld, null, 2).replace(/\n/g, '\n' + indent) + '\n' + indent + close;
  });
}

const CITY_TITLES = {
  'volta-redonda': 'Cortinas, Persianas e Cortina Motorizada em Volta Redonda | ShineCortinas',
  'barra-do-pirai': 'Cortinas, Persianas e Cortina Motorizada em Barra do Piraí | ShineCortinas',
  'barra-mansa': 'Cortinas, Persianas e Cortina Motorizada em Barra Mansa | ShineCortinas',
  'itatiaia': 'Cortinas, Persianas e Cortina Motorizada em Itatiaia | ShineCortinas',
  'maromba': 'Cortinas, Persianas e Blackout Sob Medida em Maromba | ShineCortinas',
  'miguel-pereira': 'Cortinas, Persianas e Cortina Motorizada em Miguel Pereira | ShineCortinas',
  'paulo-de-frontin': 'Cortinas e Persianas Sob Medida em Paulo de Frontin | ShineCortinas',
  'penedo': 'Cortinas, Persianas e Cortina Motorizada em Penedo | ShineCortinas',
  'pinheiral': 'Cortinas, Persianas e Cortina Motorizada em Pinheiral | ShineCortinas',
  'pirai': 'Cortinas, Persianas e Cortina Motorizada em Piraí | ShineCortinas',
  'porto-real': 'Cortinas, Persianas e Cortina Motorizada em Porto Real | ShineCortinas',
  'resende': 'Cortinas, Persianas e Cortina Motorizada em Resende | ShineCortinas',
  'valenca': 'Cortinas, Persianas e Cortina Motorizada em Valença | ShineCortinas',
  'vassouras': 'Cortinas, Persianas e Cortina Motorizada em Vassouras | ShineCortinas',
  'visconde-de-maua': 'Cortinas, Persianas e Blackout Sob Medida em Visconde de Mauá | ShineCortinas',
};

const CITY_DESCS = {
  'volta-redonda': 'Cortinas sob medida, cortina motorizada, Wave e persianas em Volta Redonda. Levamos o mostruário até a sua casa, medimos a laser e instalamos. Consultoria gratuita em 12x.',
  'resende': 'Cortinas sob medida, cortina motorizada, Wave e persianas em Resende (Campos Elíseos, Morada da Colina, Alphaville). Medição a laser e instalação própria em até 12x.',
  'barra-mansa': 'Cortinas sob medida, cortina motorizada, Wave e persianas em Barra Mansa. A ShineCortinas vai até a sua casa, mede a laser e instala com equipe própria em até 12x.',
  'penedo': 'Cortinas sob medida, cortina motorizada, blackout térmico e persianas em Penedo para casas, chalés e pousadas. Visita com mostruário, medição a laser e instalação própria.',
  'itatiaia': 'Cortinas sob medida, cortina motorizada, Wave e persianas em Itatiaia. Atendimento em domicílio com mostruário completo, medição a laser e instalação própria.',
  'barra-do-pirai': 'Cortinas sob medida, cortina motorizada, Wave e persianas em Barra do Piraí. Consultoria gratuita em domicílio, medição a laser e instalação própria em até 12x.',
  'vassouras': 'Cortinas sob medida, cortina motorizada, Wave e persianas em Vassouras para residências e casarões do Vale do Café. Consultoria gratuita em domicílio em até 12x.',
  'valenca': 'Cortinas sob medida, cortina motorizada, Wave e persianas em Valença e Conservatória. Levamos o mostruário em casa, medimos a laser e instalamos com equipe própria.',
  'pirai': 'Cortinas sob medida, cortina motorizada, Wave e persianas em Piraí. Visita gratuita com mostruário completo, medição a laser e instalação própria em até 12x.',
  'pinheiral': 'Cortinas sob medida, cortina motorizada, Wave e persianas em Pinheiral. Atendimento rápido em domicílio com medição a laser e instalação própria em até 12x.',
  'porto-real': 'Cortinas sob medida, cortina motorizada, Wave e persianas em Porto Real. Consultoria gratuita na sua casa com medição a laser e instalação própria em até 12x.',
  'miguel-pereira': 'Cortinas sob medida, cortina motorizada, blackout térmico e persianas em Miguel Pereira. Visita agendada em domicílio, medição a laser e instalação própria.',
  'paulo-de-frontin': 'Cortinas sob medida, blackout térmico e persianas em Engenheiro Paulo de Frontin. Consultoria em domicílio com mostruário, medição a laser e instalação própria.',
  'visconde-de-maua': 'Cortinas sob medida, blackout térmico, linho e persianas em Visconde de Mauá para chalés, casas de serra e pousadas. Medição a laser e instalação própria.',
  'maromba': 'Cortinas sob medida, blackout térmico e persianas em Maromba e Maringá para chalés e pousadas da serra. Visita agendada com mostruário e instalação própria.',
};

let n = 0;
for (const slug of readdirSync(join(ROOT, 'cidades'), { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name)) {
  const d = data[slug];
  if (!d) throw new Error(`sem dados em cidades.json para ${slug}`);
  const file = join(ROOT, 'cidades', slug, 'index.html');
  const src = readFileSync(file, 'utf8');
  let rawHead = src.split('<body')[0];
  if (CITY_TITLES[slug]) {
    rawHead = rawHead.replace(/<title>[\s\S]*?<\/title>/, `<title>${CITY_TITLES[slug]}</title>`);
    rawHead = rawHead.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${CITY_TITLES[slug]}$2`);
  }
  if (CITY_DESCS[slug]) {
    rawHead = rawHead.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${CITY_DESCS[slug]}">`);
    rawHead = rawHead.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${CITY_DESCS[slug]}$2`);
  }
  rawHead = rawHead.replace(/mede a laser e instala — muitas vezes no mesmo dia\./g, 'mede a laser, confecciona sob medida e instala com equipe própria.');
  rawHead = rawHead.replace(/atendemos no mesmo dia, medimos a laser e instalamos\./g, 'levamos o mostruário em casa, medimos a laser e instalamos.');
  const head = withReview(cleanHead(rawHead, { crumbs: [['Início', 'https://www.shinecortinas.com/'], ['Cidades', 'https://www.shinecortinas.com/cidades-atendidas/'], [d.city, `https://www.shinecortinas.com/cidades/${slug}/`]] }), d);
  writeFileSync(file, head + body(d));
  n++;
}
console.log(`build-cidades: ${n} páginas geradas`);
