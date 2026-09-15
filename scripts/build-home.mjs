// Home Ambientes aprovada pelo Isani em 15/09/2026. Preserva metadados e provas reais.
import {readFileSync,writeFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {WA,esc,cleanHead,header,footer,tail} from './partials.mjs';
const ROOT=join(dirname(fileURLToPath(import.meta.url)),'..');
const FILE=join(ROOT,'index.html');
const BASE='https://www.shinecortinas.com';
const TODAY='2026-09-15';
const CITIES = [
  ['volta-redonda', 'Volta Redonda'], ['barra-mansa', 'Barra Mansa'], ['resende', 'Resende'], ['porto-real', 'Porto Real'],
  ['itatiaia', 'Itatiaia'], ['penedo', 'Penedo'], ['visconde-de-maua', 'Visconde de Mauá'], ['maromba', 'Maromba'],
  ['pinheiral', 'Pinheiral'], ['pirai', 'Piraí'], ['barra-do-pirai', 'Barra do Piraí'], ['valenca', 'Valença'],
  ['vassouras', 'Vassouras'], ['paulo-de-frontin', 'Engenheiro Paulo de Frontin'], ['miguel-pereira', 'Miguel Pereira'],
];

const FAQ = [
  ['Como funciona o investimento num projeto sob medida?', 'Cada projeto é único, então não há tabela de preços fixa: o valor depende do ambiente, dos tecidos escolhidos e do tipo de instalação. Na consultoria em domicílio, gratuita, o consultor apresenta as opções e as condições, incluindo a comodidade de parcelar em até 12x. Você decide com calma, sem compromisso.'],
  ['Vocês atendem na minha cidade?', 'Sim. Atendemos todo o Sul Fluminense: Volta Redonda, Barra Mansa, Resende, Itatiaia, Penedo, Visconde de Mauá, Maromba, Porto Real, Pinheiral, Piraí, Barra do Piraí, Valença, Vassouras, Engenheiro Paulo de Frontin e Miguel Pereira. O consultor vai até você.'],
  ['Tenho que ir até a loja?', 'Não. Somos pioneiros no modelo de consultoria em domicílio: o especialista vai até a sua casa com o mostruário, mede cada ambiente a laser e apresenta as melhores opções no seu espaço. Você escolhe sem sair de casa e sem pressão.'],
  ['Quanto tempo leva para instalar?', 'Na grande maioria dos projetos, a instalação é concluída no mesmo dia. A equipe chega, trabalha com limpeza e sai deixando o ambiente pronto, sem entulho.'],
  ['O blackout bloqueia toda a luz do quarto?', 'Depende do forro. O forro blackout 100% bloqueia a passagem de luz pelo tecido e é ele que entrega o quarto escuro de verdade. O forro blackout de 70%, chamado de semi blackout, deixa o ambiente em penumbra. Na consultoria o consultor mede a janela e indica o forro certo para o escurecimento que você procura.'],
  ['Qual é a garantia?', 'A garantia é de 1 ano para cortinas e persianas não motorizadas e chega a até 5 anos nos projetos motorizados. Se surgir qualquer problema, você nos chama e a nossa equipe resolve.'],
];

const BLOG = [
  ['/blog/por-que-escolher-cortina-motorizada/', 'Automação', 'Por que escolher uma cortina motorizada', 'Motores de 7ª geração, silêncio e integração com a casa conectada.'],
  ['/blog/o-que-e-blackout/', 'Blackout', 'O que é blackout e quando faz diferença', 'Não é só tecido grosso: entenda a trama, o forro e o peso da instalação.'],
  ['/blog/linho-para-cortinas/', 'Tecidos', 'Linho para cortinas: caimento e memória', 'Por que as cortinas da Shine mantêm a forma ano após ano.'],
];

// Regras do simulador "qual cortina para o meu ambiente?" — validar com o Isani.
// Regras do simulador. 5º campo: true = a foto mostra exatamente esse ambiente/solução;
// false = foto de referência do modelo (outro ambiente) até termos a foto certa — ver docs/fotos-necessarias.md
function readReviews(ld) {
  const biz = ld['@graph'].find((n) => n['@type'] === 'LocalBusiness');
  return (biz && biz.review ? biz.review : []).map((r) => ({ name: r.author && r.author.name, body: r.reviewBody })).filter((r) => r.name && r.body);
}

const products=[['Cortinas','Caimento que acolhe.','/cortina-sob-medida.avif','/cortinas/'],['Persianas','A luz, na sua medida.','/persiana-motorizada.avif','/persianas/'],['Automação','Conforto em um toque.','/automacao.avif','/cortina-motorizada/'],['Blackout e forros','O conforto começa por dentro.','/blackouts-tecnicos.avif','/blackout-e-forros/']];
function collection(){return `<section class="pv-section" id="solucoes"><div class="pv-section-head"><div><p class="pv-eyebrow">Para cada janela, uma possibilidade</p><h2>Encontre o seu <em>jeito de morar.</em></h2></div><a class="pv-text-link" href="/portfolio/">Explore os projetos ↗</a></div><div class="pv-products">${products.map(([name,line,img,url],i)=>`<a class="pv-product" href="${url}"><div class="pv-product-image"><img src="${img}" alt="Referência de ${name.toLowerCase()}" loading="lazy" width="800" height="1000"><span>0${i+1}</span></div><div><h3>${name}</h3><p>${line}</p><span class="pv-arrow" aria-hidden="true">↗</span></div></a>`).join('')}</div><p class="pv-caption">Imagens de referência das soluções. Conheça os projetos na seção Portfólio.</p></section>`;}
function story(){return `<section class="pv-story" id="metodo"><div class="pv-story-photo"><img src="/isani-consultoria-800.avif" alt="Isani Oliveira, da ShineCortinas" width="800" height="1000" loading="lazy"></div><div><p class="pv-eyebrow">O ateliê vai até você</p><h2>É na sua casa que tudo <em>faz sentido.</em></h2><p>A cor na sua luz. A textura nas suas mãos. A medida da sua janela. Nosso consultor leva o mostruário até você e acompanha a escolha de perto.</p><ol><li><span>01</span>Conversamos sobre o seu ambiente.</li><li><span>02</span>Levamos os tecidos e medimos a laser.</li><li><span>03</span>Você aprova. Nossa equipe instala.</li></ol><a class="pv-button" data-wa="agendar" href="${WA}" target="_blank" rel="noopener">Agendar uma consultoria ↗</a><small>Gratuita e sem compromisso · Sul Fluminense</small></div></section>`;}
function journal(){return `<section class="pv-journal pv-section" id="blog"><p class="pv-eyebrow">Antes de escolher</p><h2>Uma conversa com <em>quem entende.</em></h2><a href="/blog/tipos-de-forro-para-cortina/"><span>01 / Tecidos</span><h3>O que muda quando você escolhe o forro certo?</h3><b aria-hidden="true">↗</b></a><a href="/blog/o-que-e-blackout/"><span>02 / Luz</span><h3>Blackout 70% ou 100%: entenda a diferença.</h3><b aria-hidden="true">↗</b></a><a href="/blog/altura-ideal-da-cortina/"><span>03 / Proporção</span><h3>A altura da cortina muda o ambiente inteiro.</h3><b aria-hidden="true">↗</b></a></section>`;}

function trust(reviews){return `<section class="pv-section pv-home-trust" id="depoimentos"><p class="pv-eyebrow">Avaliações reais · Google 4,9</p><h2>O que dizem depois da <em>instalação.</em></h2><div class="sl-quotes">${reviews.map(r=>`<blockquote class="sl-quote"><p>${esc(r.body)}</p><footer>${esc(r.name)} · Google</footer></blockquote>`).join('')}</div></section>
<section class="pv-section pv-home-trust" id="cidades"><p class="pv-eyebrow">Perto de você</p><h2>Cortinas e persianas sob medida <em>no Sul Fluminense.</em></h2><p>Desde 2009, em Volta Redonda. Levamos o mostruário e a consultoria até a sua casa.</p><div class="sl-chips">${CITIES.map(([slug,name])=>`<a href="/cidades/${slug}/">${name}</a>`).join('')}</div></section>
<section class="pv-section pv-home-trust" id="faq"><p class="pv-eyebrow">Dúvidas frequentes</p><h2>Antes de <em>escolher.</em></h2><div class="sl-faq">${FAQ.map(([q,a])=>`<details><summary>${q}</summary><div>${a}</div></details>`).join('')}</div><div class="sl-links"><a href="/cortina-wave/">Cortina wave</a><a href="/trilhos-e-acionamentos/">Trilhos e acionamentos</a><a href="/videos/">Vídeos</a><a href="/faq/">Mais perguntas</a></div></section>`;}
// ---- monta ----
const src = readFileSync(FILE, 'utf8');
let head = cleanHead(src.split('<body')[0]);
const ldm = head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
const ld = JSON.parse(ldm[1]);
const reviews = readReviews(ld);
const rooms=[['Sala','Para ficar mais um pouco.','Luz, textura e acolhimento.','/cortina-sob-medida.avif','/cortinas/'],['Quarto','O mundo pode esperar.','Conheça as opções de blackout e forros.','/blackouts-tecnicos.avif','/blackout-e-forros/'],['Home office','Seu ritmo. Sua luz.','Persianas para organizar a claridade.','/persiana-motorizada.avif','/persianas/']];
const explore=`<main id="conteudo"><section class="pv-explore-hero" id="top"><div class="pv-explore-intro"><p class="pv-eyebrow">Sua casa, do seu jeito</p><h1>Onde você quer<br>se sentir <em>melhor?</em></h1><p>Comece por um ambiente. Explore as possibilidades.</p></div><div class="pv-room-tabs" role="group" aria-label="Escolher ambiente">${rooms.map(([name],i)=>`<button type="button" data-room="${i}" aria-pressed="${i===0}">${name}</button>`).join('')}</div><div class="pv-room-rail" tabindex="0" role="region" aria-label="Ambientes: deslize ou use os botões">${rooms.map(([name,title,desc,img,url],i)=>`<article class="pv-room-card"><img ${i===0?'fetchpriority="high"':'loading="lazy"'} decoding="async" src="${img}" alt="Imagem de referência da solução para ${name.toLowerCase()}" width="800" height="1000"><div class="pv-room-copy"><span>0${i+1} / ${name}</span><h2>${title}</h2><p>${desc}</p><a href="${url}">Explorar ${name.toLowerCase()} <span aria-hidden="true">↗</span></a></div></article>`).join('')}</div><div class="pv-rail-controls"><span><b data-room-position>01</b> / 03 · Deslize para explorar</span><div><button type="button" data-room-prev aria-label="Ambiente anterior">←</button><button type="button" data-room-next aria-label="Próximo ambiente">→</button></div></div><p class="pv-caption">Imagens de referência das soluções, inclusive em outros ambientes.</p></section><section class="pv-explore-question pv-section"><p class="pv-eyebrow">A escolha começa com uma conversa</p><h2>Você traz a ideia.<br><em>A gente cuida da medida.</em></h2><a class="pv-button" href="${WA}" target="_blank" rel="noopener">Conte como é o seu ambiente ↗</a></section>${story()}${collection()}${journal()}${trust(reviews)}</main>`;

// FAQPage + WebPage (sem duplicar)
ld['@graph'] = ld['@graph'].filter((n) => !['FAQPage', 'WebPage'].includes(n['@type']));
ld['@graph'].push({
  '@type': 'FAQPage', '@id': `${BASE}/#faq`,
  mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});
ld['@graph'].push({
  '@type': 'WebPage', '@id': `${BASE}/`, url: `${BASE}/`, name: 'Loja de Cortinas e Persianas em Volta Redonda | ShineCortinas',
  inLanguage: 'pt-BR', isPartOf: { '@id': `${BASE}/#website` }, about: { '@id': `${BASE}/#biz` }, dateModified: TODAY,
  speakable: { '@type': 'SpeakableSpecification', xpath: ['/html/body//h1', '/html/body//h1/following-sibling::p[1]'] },
});
head = head.replace(ldm[0], () => `<script type="application/ld+json">\n${JSON.stringify(ld, null, 2)}\n</script>`);
if (!/rel="canonical" href="https:\/\/www\.shinecortinas\.com\/"/.test(head)) throw new Error('canonical da home ausente');
head=head.replace(/<link rel="preload" as="image"[^>]+>/g,'');
head=head.replace(/[ \t]+$/gm,'');
head=head.replace('</head>', '<link rel="preload" as="image" href="/cortina-sob-medida.avif" fetchpriority="high">\n</head>');
writeFileSync(FILE,head+'<body class="pv-home" data-concept="ambientes" data-logo-finish="aurora" data-wa-context="a página inicial">'+header('/')+explore+footer()+tail());
console.log(`build-home: index.html gerado (${reviews.length} avaliações, ${FAQ.length} FAQs)`);
