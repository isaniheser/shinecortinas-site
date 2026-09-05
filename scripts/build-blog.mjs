// Gera artigos do blog no sistema visual "leve".
// Fonte dos fatos: conhecimento do Isani (ver CLAUDE.md → "Fatos de produto").
// Nada aqui pode contradizer aquela seção. Uso: node scripts/build-blog.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { WA, esc, cleanHead, header, cityChip, footer, waFloat, bar, tail, CSS_V, FONTS } from './partials.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://www.shinecortinas.com';
const TODAY = new Date().toISOString().slice(0, 10);

const POSTS = [
  {
    slug: 'tipos-de-forro-para-cortina',
    title: 'Tipos de forro para cortina: translúcido, semi blackout e blackout 100%',
    seoTitle: 'Tipos de Forro para Cortina: Translúcido, Semi Blackout e Blackout 100% | ShineCortinas',
    description: 'O forro decide o resultado da cortina. Entenda o forro translúcido, o semi blackout de 70% e o blackout 100%, e qual deles resolve cada ambiente.',
    kicker: 'Tecidos e forros',
    published: '2026-02-19',
    modified: TODAY,
    // Resposta direta no primeiro parágrafo: é o trecho que buscadores e IAs citam.
    lead: 'O forro da cortina se divide em dois grupos. O <strong>forro translúcido</strong> dá privacidade, protege o tecido decorativo e quebra parte da claridade, sem escurecer o ambiente. O <strong>forro blackout</strong> tem duas versões: o de <strong>70%</strong>, chamado de semi blackout, que deixa o ambiente em penumbra, e o de <strong>100%</strong>, que bloqueia a passagem de luz pelo tecido e é o que entrega escuro de verdade.',
    body: `
      <h2>O forro é a camada que ninguém vê e que decide o resultado</h2>
      <p>O forro é uma segunda camada acoplada atrás do tecido decorativo da cortina. Quem entra no ambiente vê o linho, o voil ou o veludo que você escolheu. O forro fica escondido, mas é ele que determina quanta luz entra, quanta privacidade você tem de dia e quanto tempo o tecido de frente vai durar bonito.</p>
      <p>Por isso a escolha do forro não é um detalhe do fim do projeto. Ela vem junto com a escolha do tecido, porque as duas decisões juntas é que formam o resultado.</p>

      <h2>Forro translúcido: privacidade e proteção, sem escurecer</h2>
      <p>O forro translúcido cumpre três funções. Dá <strong>privacidade</strong> durante o dia, sem fechar o ambiente. <strong>Protege o tecido decorativo</strong> da cortina, que fica exposto ao sol todos os dias. E <strong>quebra parte da claridade</strong>, suavizando a luz que entra.</p>
      <p>É a escolha de quem quer o ambiente claro, mas sem a sensação de estar exposto e sem que o tecido bonito da frente sofra com o sol. Não é a escolha de quem precisa dormir de dia.</p>

      <h2>Forro blackout: duas versões, dois resultados diferentes</h2>
      <p>Quando o assunto é escurecer, o forro blackout se divide em duas subcategorias, e a diferença entre elas é o que mais gera confusão na hora de comprar.</p>

      <h3>Semi blackout (70%)</h3>
      <p>Reduz boa parte da luz e deixa o ambiente em <strong>penumbra</strong>. Serve para quem quer dormir melhor, assistir televisão de dia com conforto ou baixar a temperatura do quarto, mas não faz questão de escuro absoluto.</p>

      <h3>Blackout 100%</h3>
      <p>Bloqueia a passagem de luz pelo tecido. É o forro que entrega <strong>escuro de verdade</strong>: quem trabalha à noite e dorme de dia, quarto de bebê, quem tem sono leve, sala de projeção. Se o objetivo é quarto realmente escuro, a cortina com forro blackout 100% resolve.</p>

      <h2>E as persianas?</h2>
      <p>As persianas também têm material com blackout 100%. Ou seja, a decisão entre cortina e persiana não é a mesma decisão do nível de escurecimento: existe persiana que escurece por completo, do mesmo jeito que existe cortina que apenas filtra a luz.</p>

      <h2>Qual escolher para cada objetivo</h2>
      <div class="sl-tablewrap"><table>
        <thead><tr><th>Você quer</th><th>Forro indicado</th><th>Resultado no ambiente</th></tr></thead>
        <tbody>
          <tr><td>Privacidade de dia</td><td>Translúcido</td><td>Ambiente claro, sem exposição para a rua</td></tr>
          <tr><td>Proteger o tecido do sol</td><td>Translúcido</td><td>O tecido de frente dura mais</td></tr>
          <tr><td>Dormir melhor, sem escuro total</td><td>Semi blackout (70%)</td><td>Penumbra</td></tr>
          <tr><td>Sala de TV confortável de dia</td><td>Semi blackout (70%)</td><td>Tela sem reflexo, ambiente ainda legível</td></tr>
          <tr><td>Quarto escuro de verdade</td><td>Blackout 100%</td><td>Escuro mesmo ao meio-dia</td></tr>
          <tr><td>Dormir de dia, quarto de bebê</td><td>Blackout 100%</td><td>Escuro mesmo ao meio-dia</td></tr>
        </tbody>
      </table></div>

      <h2>Como a Shine define o forro do seu projeto</h2>
      <p>Na consultoria em domicílio, o consultor vê a janela, a orientação do sol e a rotina da casa, e apresenta o tecido decorativo junto com o forro correspondente. Você compara as opções no seu próprio ambiente, com a luz real daquele cômodo, antes de decidir qualquer coisa.</p>
      <p>Veja também as <a href="/cortinas/">cortinas sob medida</a>, as <a href="/persianas/">persianas técnicas</a> e a página de <a href="/blackout-e-forros/">blackout e forros</a>. A Shine atende com consultoria gratuita em domicílio em <a href="/cidades/volta-redonda/">Volta Redonda</a>, <a href="/cidades/barra-mansa/">Barra Mansa</a>, <a href="/cidades/resende/">Resende</a> e em todo o <a href="/cidades-atendidas.html">Sul Fluminense</a>.</p>
    `,
    faq: [
      ['Qual a diferença entre forro translúcido e forro blackout?',
       'O forro translúcido dá privacidade, protege o tecido decorativo do sol e quebra parte da claridade, mas não escurece o ambiente. O forro blackout serve para escurecer e existe em duas versões: 70% (semi blackout), que deixa penumbra, e 100%, que bloqueia a passagem de luz pelo tecido.'],
      ['O que é semi blackout?',
       'Semi blackout é o forro blackout de 70%. Ele reduz boa parte da luz e deixa o ambiente em penumbra. É indicado para quem quer dormir melhor ou assistir televisão de dia, mas não precisa de escuro absoluto.'],
      ['O que resolve um quarto realmente escuro?',
       'A cortina com forro blackout 100%. Esse forro bloqueia a passagem de luz pelo tecido e é o que entrega escuro de verdade, inclusive ao meio-dia. É a indicação para quem trabalha à noite, tem bebê em casa ou sono leve.'],
      ['Persiana também escurece por completo?',
       'Sim. As persianas também têm material com blackout 100%. A escolha entre cortina e persiana é uma decisão de estética e de uso; o nível de escurecimento depende do material escolhido.'],
      ['Qual a diferença entre tecido blackout e forro blackout?',
       'O tecido blackout é o próprio tecido da cortina, que já bloqueia a luz. O forro blackout é uma segunda camada acoplada atrás de uma cortina decorativa, somando escurecimento sem abrir mão da estética do tecido de frente.'],
    ],
  },
];

function build(post) {
  const url = `${BASE}/blog/${post.slug}`;
  const faqHtml = post.faq.map(([q, a]) => `        <details><summary>${q}</summary><div>${a}</div></details>`).join('\n');
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${BASE}/#org`, name: 'ShineCortinas', url: BASE, logo: `${BASE}/logo-shine.avif`,
        sameAs: ['https://www.instagram.com/shinecortinas/', 'https://www.facebook.com/shinecortinas', 'https://www.tiktok.com/@shinecortinas', 'https://www.youtube.com/@shinecortinas', 'https://www.pinterest.com/shinecortinas'] },
      { '@type': 'Person', '@id': `${BASE}/#isani`, name: 'Isani Oliveira', jobTitle: 'CEO e especialista em cortinas sob medida', url: `${BASE}/sobre/`, worksFor: { '@id': `${BASE}/#org` } },
      { '@type': 'Article', '@id': `${url}#article`, headline: post.title, description: post.description,
        datePublished: post.published, dateModified: post.modified,
        author: { '@id': `${BASE}/#isani` }, publisher: { '@id': `${BASE}/#org` },
        mainEntityOfPage: { '@id': url }, inLanguage: 'pt-BR',
        about: ['forro para cortina', 'blackout', 'semi blackout', 'cortinas sob medida'] },
      { '@type': 'FAQPage', '@id': `${url}#faq`,
        mainEntity: post.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
      { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${BASE}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog/` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url } ] },
      { '@type': 'WebPage', '@id': url, url, name: post.seoTitle, inLanguage: 'pt-BR',
        breadcrumb: { '@id': `${url}#breadcrumb` }, dateModified: post.modified,
        speakable: { '@type': 'SpeakableSpecification', xpath: ['/html/body//h1', '/html/body//p[@class="sl-lead"]'] } },
    ],
  };

  const head = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <meta name="theme-color" content="#16302A">
  <title>${esc(post.seoTitle)}</title>
  <meta name="description" content="${esc(post.description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:title" content="${esc(post.seoTitle)}">
  <meta property="og:description" content="${esc(post.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${BASE}/blackouts-tecnicos.avif">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@shinecortinas">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${FONTS}" rel="stylesheet">
  <script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
  </script>
  <link rel="stylesheet" href="/assets/shine-leve.css?v=${CSS_V}">
  <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
</head>
`;

  const body = `<body data-wa-context="o artigo sobre ${esc(post.kicker.toLowerCase())}">
${header('/blog/')}
  <section class="sl-hero sl-hero--post">
    <div class="sl-wrap"><div class="sl-hero__in">
      <nav aria-label="Breadcrumb"><ol class="sl-crumbs">
        <li><a href="/">Início</a></li><li aria-hidden="true">/</li>
        <li><a href="/blog/">Blog</a></li><li aria-hidden="true">/</li>
        <li aria-current="page">${post.kicker}</li>
      </ol></nav>
      <p class="sl-kicker">${post.kicker}</p>
      <h1 class="sl-h1" style="font-size:clamp(28px,4.2vw,46px)">${post.title}</h1>
      <p class="sl-postmeta"><span>Por <a href="/sobre/">Isani Oliveira</a>, CEO da ShineCortinas</span><span>Atualizado em ${post.modified.split('-').reverse().join('/')}</span></p>
    </div></div>
  </section>
${cityChip(null)}
  <main>
    <article class="sl-section"><div class="sl-wrap">
      <div class="sl-article">
        <p class="sl-lead">${post.lead}</p>
${post.body.trim()}
        <div class="sl-cta-inline">
          <h3>Não sabe qual forro o seu ambiente pede?</h3>
          <p>O consultor vai até a sua casa com o mostruário e mostra a diferença na luz do seu próprio cômodo. Gratuito e sem compromisso.</p>
          <a class="sl-btn" data-wa="estimativa" href="${WA}" target="_blank" rel="noopener noreferrer">Falar com um consultor →</a>
        </div>
      </div>
    </div></article>

    <section class="sl-section"><div class="sl-wrap">
      <div class="sl-center" style="margin-bottom:28px">
        <p class="sl-kicker sl-kicker--center">Dúvidas frequentes</p>
        <h2 class="sl-h2">Perguntas sobre <em>forro de cortina</em></h2>
      </div>
      <div class="sl-faq">
${faqHtml}
      </div>
    </div></section>

    <section class="sl-band"><div class="sl-wrap sl-center">
      <p class="sl-kicker sl-kicker--center">Consultoria em domicílio · Sul Fluminense</p>
      <h2 class="sl-h2">Veja os tecidos e os forros <em>na sua casa</em></h2>
      <p class="sl-sub" style="margin:0 auto 26px">A consultoria é gratuita, vai até você e não obriga a decidir nada na hora.</p>
      <a class="sl-btn" data-wa="agendar" href="${WA}" target="_blank" rel="noopener noreferrer">Agendar consultoria em casa →</a>
      <p class="sl-note">Gratuita · Sem compromisso · (24) 99329-8763</p>
    </div></section>

    <section class="sl-section sl-section--tight"><div class="sl-wrap">
      <p class="sl-label">Continue no site</p>
      <div class="sl-links">
        <a href="/blog/o-que-e-blackout">O que é blackout</a><a href="/cortinas/">Cortinas sob medida</a><a href="/persianas/">Persianas técnicas</a><a href="/blackout-e-forros/">Blackout e forros</a>
        <a href="/blog/">Todos os artigos</a><a href="/portfolio/">Projetos reais</a><a href="/metodo/">Como funciona</a><a href="/cidades-atendidas.html">Cidades atendidas</a>
      </div>
    </div></section>
  </main>
${footer()}${waFloat()}${bar('single')}${tail()}`;

  const file = join(ROOT, 'blog', post.slug, 'index.html');
  if (!existsSync(file)) throw new Error(`pasta do post não existe: blog/${post.slug}/`);
  writeFileSync(file, head + body);
  return post.slug;
}

const done = POSTS.map(build);
console.log(`build-blog: ${done.length} artigo(s) gerado(s) — ${done.join(', ')}`);
