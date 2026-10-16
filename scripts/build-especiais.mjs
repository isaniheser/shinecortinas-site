// Migra para o sistema visual "leve" as páginas com conteúdo próprio, preservando o que
// já existe: /faq/ (21 perguntas), /videos/ (8 vídeos), /cidades-atendidas/ (15 cidades),
// /blog/ (índice) e os 16 posts (texto atual mantido; reescrita de copy é etapa separada).
// Uso: node scripts/build-especiais.mjs
import { readFileSync, writeFileSync, readdirSync, existsSync , statSync} from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { WA, CSS_V, esc, syncBrandFacts, cleanHead, normalizaCanonical, header, cityChip, strip, footer, waFloat, bar, tail } from './partials.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://www.shinecortinas.com';
const TODAY = new Date().toISOString().slice(0, 10);
const dec = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');

const CITIES = [
  ['volta-redonda', 'Volta Redonda'], ['barra-mansa', 'Barra Mansa'], ['resende', 'Resende'], ['porto-real', 'Porto Real'],
  ['itatiaia', 'Itatiaia'], ['penedo', 'Penedo'], ['visconde-de-maua', 'Visconde de Mauá'], ['maromba', 'Maromba'],
  ['pinheiral', 'Pinheiral'], ['pirai', 'Piraí'], ['barra-do-pirai', 'Barra do Piraí'], ['valenca', 'Valença'],
  ['vassouras', 'Vassouras'], ['paulo-de-frontin', 'Engenheiro Paulo de Frontin'], ['miguel-pereira', 'Miguel Pereira'],
];

const heroInterna = (kicker, h1, lead, img, alt, crumbs) => `
  <section class="sl-hero sl-hero--interna">
    <div class="sl-hero__img"><img src="${img}" alt="${esc(alt)}" width="1920" height="1080" fetchpriority="high" decoding="async"></div>
    <div class="sl-wrap"><div class="sl-hero__in">
      <nav aria-label="Breadcrumb"><ol class="sl-crumbs">${crumbs}</ol></nav>
      <p class="sl-kicker">${kicker}</p>
      <h1 class="sl-h1">${h1}</h1>
      <div class="sl-hero__rule"></div>
      <p class="sl-lede">${lead}</p>
      <a class="sl-btn" data-wa="conversar" href="${WA}" target="_blank" rel="noopener noreferrer">Falar com um consultor →</a>
      <p class="sl-note">Sem compromisso · Resposta em minutos · Você decide o próximo passo</p>
    </div></div>
  </section>`;

const ctaFinal = () => `
    <section class="sl-band"><div class="sl-wrap sl-center">
      <p class="sl-kicker sl-kicker--center">Consultoria em domicílio · Sul Fluminense</p>
      <h2 class="sl-h2">Pronto para ver os tecidos <em>na sua casa?</em></h2>
      <p class="sl-sub" style="margin:0 auto 26px">A consultoria é gratuita, vai até você e não obriga a decidir nada na hora.</p>
      <a class="sl-btn" data-wa="agendar" href="${WA}" target="_blank" rel="noopener noreferrer">Agendar consultoria em casa →</a>
      <p class="sl-note">Gratuita · Sem compromisso · (24) 99329-8763</p>
    </div></section>`;

const explore = (pares) => `
    <section class="sl-section sl-section--tight"><div class="sl-wrap">
      <p class="sl-label">Explore o site</p>
      <div class="sl-links">${pares.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</div>
    </div></section>`;

// ------------------------------------------------------------------ /faq/
function buildFaq() {
  const file = join(ROOT, 'faq', 'index.html');
  const src = readFileSync(file, 'utf8');
  const ldRaw = src.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
  const ld = JSON.parse(ldRaw);
  const g = ld['@graph'] || [ld];
  const perguntas = (g.find((n) => n['@type'] === 'FAQPage') || {}).mainEntity.map((q) => [q.name.trim(), syncBrandFacts(q.acceptedAnswer.text.trim())]);
  const grupos = [
    ['A empresa', ['O que é a ShineCortinas', 'A ShineCortinas tem loja', 'Há quanto tempo', 'Vocês atendem fora', 'Qual a melhor loja']],
    ['Atendimento e prazos', ['Como funciona a consultoria', 'Quanto tempo leva', 'Vocês trabalham com cortina pronta', 'Como funciona o investimento', 'Como posso parcelar', 'Qual a garantia']],
    ['Produtos e tecidos', ['Qual a diferença entre cortina e persiana', 'O blackout', 'O que é cortina Wave', 'Qual tipo de cortina escolher', 'Qual tecido de cortina é melhor', 'Cortina motorizada vale']],
    ['Casos especiais', ['Vocês lavam', 'Vocês atendem pousadas', 'Qual tecido de cortina resiste', 'Como escolher cortina para casarão']],
  ];
  const usadas = new Set();
  const secoes = grupos.map(([titulo, prefixos]) => {
    const itens = perguntas.filter(([q]) => !usadas.has(q) && prefixos.some((p) => q.startsWith(p)));
    itens.forEach(([q]) => usadas.add(q));
    return { titulo, itens };
  });
  const sobra = perguntas.filter(([q]) => !usadas.has(q));
  if (sobra.length) secoes.push({ titulo: 'Outras dúvidas', itens: sobra });

  const corpo = secoes.filter((s) => s.itens.length).map((s) => `
    <section class="sl-section sl-reveal"><div class="sl-wrap">
      <div class="sl-center" style="margin-bottom:26px"><h2 class="sl-h2">${s.titulo}</h2></div>
      <div class="sl-faq">
${s.itens.map(([q, a]) => `        <details><summary>${esc(q)}</summary><div>${esc(a)}</div></details>`).join('\n')}
      </div>
    </div></section>`).join('\n');

  const head = cleanHead(src.split('<body')[0], { crumbs: [['Início', `${BASE}/`], ['FAQ', `${BASE}/faq/`]] });
  const body = `<body data-concept="ambientes" data-logo-finish="aurora" data-wa-context="a página de perguntas frequentes">
${header('/faq/')}${heroInterna('Perguntas frequentes',
    'As respostas que a gente <em>mais dá</em> no WhatsApp',
    `Reunimos aqui ${perguntas.length} perguntas que os clientes fazem antes de fechar um projeto: empresa, prazos, tecidos, garantia e casos especiais. Se a sua não estiver aqui, é só chamar no WhatsApp.`,
    '/hero-sala.avif', 'Ambiente com cortinas sob medida da ShineCortinas',
    '<li><a href="/">Início</a></li><li aria-hidden="true">/</li><li aria-current="page">FAQ</li>')}
${cityChip(null)}${strip()}
  <main>
${corpo}
${ctaFinal()}
${explore([['/cortinas/', 'Cortinas'], ['/persianas/', 'Persianas'], ['/blackout-e-forros/', 'Blackout e forros'], ['/cortina-motorizada/', 'Motorizada'], ['/metodo/', 'Como funciona'], ['/portfolio/', 'Projetos'], ['/blog/', 'Blog'], ['/cidades-atendidas/', 'Cidades']])}
  </main>
${footer()}${waFloat()}${bar('single')}${tail()}`;
  writeFileSync(file, head + body);
  return perguntas.length;
}

// ---------------------------------------------------------------- /videos/
function buildVideos() {
  const file = join(ROOT, 'videos', 'index.html');
  const src = readFileSync(file, 'utf8');
  const cards = JSON.parse(readFileSync(join(ROOT, 'videos', 'videos.json'), 'utf8'));
  const grid = cards.map((c) => `        <a class="sl-card" href="${c.href}"><div class="sl-media sl-media--video"><img src="${c.img}" alt="${esc(c.alt)}" width="800" height="450" loading="lazy" decoding="async"><span class="sl-play" aria-hidden="true">▶</span></div><div class="sl-card__body"><span>Vídeo</span><h3>${esc(c.titulo)}</h3><p>${esc(c.resumo)}</p><em>Assistir →</em></div></a>`).join('\n');

  const head = cleanHead(src.split('<body')[0], { crumbs: [['Início', `${BASE}/`], ['Vídeos', `${BASE}/videos/`]] });
  const body = `<body data-concept="ambientes" data-logo-finish="aurora" data-wa-context="a página de vídeos">
${header('/videos/')}${heroInterna('Vídeos',
    'Projetos entregues, <em>em movimento</em>',
    'Instalação, automação e caimento em ambientes reais do Sul Fluminense. É a prova que uma foto não consegue dar: como a cortina se comporta quando abre, fecha e corre no trilho.',
    '/hero-sala.avif', 'Projetos em vídeo da ShineCortinas',
    '<li><a href="/">Início</a></li><li aria-hidden="true">/</li><li aria-current="page">Vídeos</li>')}
${cityChip(null)}${strip()}
  <main>
    <section class="sl-section sl-reveal"><div class="sl-wrap">
      <div class="sl-cards">
${grid}
      </div>
    </div></section>
${ctaFinal()}
${explore([['/portfolio/', 'Projetos reais'], ['/cortinas/', 'Cortinas'], ['/persianas/', 'Persianas'], ['/cortina-wave/', 'Cortina wave'], ['/cortina-motorizada/', 'Motorizada'], ['/metodo/', 'Como funciona'], ['/blog/', 'Blog'], ['/cidades-atendidas/', 'Cidades']])}
  </main>
${footer()}${waFloat()}${bar('single')}${tail()}`;
  writeFileSync(file, head + body);
  return cards.length;
}

// ------------------------------------------------- /cidades-atendidas/
function buildHub() {
  const file = join(ROOT, 'cidades-atendidas', 'index.html');
  const src = readFileSync(file, 'utf8');
  const head = cleanHead(src.split('<body')[0], { crumbs: [['Início', `${BASE}/`], ['Cidades', `${BASE}/cidades-atendidas/`]] });
  const cards = CITIES.map(([s, n]) => `        <a class="sl-citycard" href="/cidades/${s}/"><h3>${n}</h3><span>Ver a página de ${n} →</span></a>`).join('\n');
  const body = `<body data-concept="ambientes" data-logo-finish="aurora" data-wa-context="a página de cidades atendidas">
${header('/cidades-atendidas/')}${heroInterna('Cidades atendidas',
    'Atendemos <em>15 cidades</em> do Sul Fluminense',
    'O consultor vai até a sua casa, na sua cidade, com o mostruário completo. Cada cidade tem a sua própria página, com as perguntas e o conteúdo de lá.',
    '/hero-sala.avif', 'Cortinas sob medida no Sul Fluminense — ShineCortinas',
    '<li><a href="/">Início</a></li><li aria-hidden="true">/</li><li aria-current="page">Cidades</li>')}
${strip()}
  <main>
    <section class="sl-section sl-reveal"><div class="sl-wrap">
      <div class="sl-citygrid">
${cards}
      </div>
    </div></section>
${ctaFinal()}
${explore([['/cortinas/', 'Cortinas'], ['/persianas/', 'Persianas'], ['/blackout-e-forros/', 'Blackout e forros'], ['/cortina-motorizada/', 'Motorizada'], ['/metodo/', 'Como funciona'], ['/portfolio/', 'Projetos'], ['/videos/', 'Vídeos'], ['/faq/', 'FAQ']])}
  </main>
${footer()}${waFloat()}${bar('single')}${tail()}`;
  writeFileSync(file, head + body);
  return CITIES.length;
}

// ------------------------------------------------------------------ /blog/
function buildBlogIndex() {
  const file = join(ROOT, 'blog', 'index.html');
  const src = readFileSync(file, 'utf8');
  const posts = JSON.parse(readFileSync(join(ROOT, 'blog', 'posts.json'), 'utf8'));
  const lista = posts.map((p) => `        <a class="sl-post" href="${p.href}"><span>Artigo</span><h3>${esc(p.titulo)}</h3><p>${esc(p.resumo)}</p></a>`).join('\n');
  let rawHead = src.split('<body')[0];
  rawHead = rawHead.replace(/<title>[\s\S]*?<\/title>/, '<title>Guias de Cortinas e Persianas Sob Medida | ShineCortinas</title>');
  rawHead = rawHead.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="Guias práticos da ShineCortinas sobre tecidos, forros, blackout, altura de cortina, bainha, varão, persianas e automação para você escolher sem erro.">');
  const head = cleanHead(rawHead, { crumbs: [['Início', `${BASE}/`], ['Blog', `${BASE}/blog/`]] });
  const body = `<body data-concept="ambientes" data-logo-finish="aurora" data-wa-context="o blog">
${header('/blog/')}${heroInterna('Blog',
    'Guias para escolher <em>sem erro</em>',
    'O que a gente explica na consultoria, escrito. Tecidos, forros, sistemas, medidas e os erros que mais aparecem em quem compra sem orientação técnica.',
    '/linha-puro.avif', 'Tecidos selecionados pela ShineCortinas',
    '<li><a href="/">Início</a></li><li aria-hidden="true">/</li><li aria-current="page">Blog</li>')}
${cityChip(null)}
  <main>
    <section class="sl-section sl-reveal"><div class="sl-wrap">
      <div class="sl-posts sl-posts--index">
${lista}
      </div>
    </div></section>
${ctaFinal()}
${explore([['/cortinas/', 'Cortinas'], ['/persianas/', 'Persianas'], ['/blackout-e-forros/', 'Blackout e forros'], ['/cortina-wave/', 'Cortina wave'], ['/metodo/', 'Como funciona'], ['/portfolio/', 'Projetos'], ['/videos/', 'Vídeos'], ['/cidades-atendidas/', 'Cidades']])}
  </main>
${footer()}${waFloat()}${bar('single')}${tail()}`;
  writeFileSync(file, head + body);
  return posts.length;
}

const POST_META = {
  'como-escurecer-quarto-sala-tv': ['Como Escurecer Quarto e Sala de TV com Cortina | ShineCortinas', 'Veja como escurecer quarto e sala de TV com cortina sob medida: diferença entre blackout 100% e 70%, influência da cor do tecido e ajustes na instalação.'],
  'como-funciona-persiana-motorizada': ['Como Funciona a Persiana Motorizada? Bateria e Luz | ShineCortinas', 'Entenda como funciona a persiana motorizada na prática: motores elétricos ou a bateria (média de 6 meses) e por que Rolô e Romana travam sem energia.'],
  'cortina-ou-persiana-na-cozinha': ['Cortina ou Persiana na Cozinha: Qual Escolher | ShineCortinas', 'Cortina ou persiana na cozinha? Entenda por que a persiana Rolô Tela Solar e a Horizontal de Alumínio vencem na limpeza contra gordura, vapor e umidade da pia.'],
  'linho-para-cortinas': ['Linho para Cortinas: Caimento, Gramatura e Lavagem | ShineCortinas', 'Quer cortina de linho? Entenda por que indico no máximo 10% de linho ou 100% poliéster que imita linho, gramatura acima de 170 g/m² e tecido peletizado.'],
  'persiana-ideal-para-cada-ambiente': ['Persiana Ideal para Cada Ambiente: Guia Prático | ShineCortinas', 'Descubra a persiana ideal para cada ambiente da casa: Tela Solar na varanda, Double Vision e Romana no escritório, Romana e Rolô no quarto, e 16 mm no banheiro.'],
  'persiana-para-dividir-ambientes': ['Persiana para Dividir Ambientes Funciona? | ShineCortinas', 'Vale a pena usar persiana para dividir ambientes? Veja a opinião sincera de Isani Oliveira sobre por que separar espaço pede parede de drywall e não persiana.'],
  'persiana-vertical-ou-horizontal': ['Persiana Vertical ou Horizontal: 50 mm e Vãos | ShineCortinas', 'Persiana vertical ou horizontal: veja por que indico a vertical para porta de correr e vãos largos e a horizontal de 50 mm (madeira ou alumínio) para salas.'],
  'por-que-escolher-cortina-motorizada': ['Por Que Escolher Cortina Motorizada? Toque e Vãos | ShineCortinas', 'Entenda por que escolher cortina motorizada: abertura com leve toque no tecido, funcionamento normal quando falta luz e proteção para pé-direito duplo.'],
  'qual-cortina-escolher-para-sala': ['Qual Cortina Escolher para Sala: Pregas e Cores | ShineCortinas', 'Saiba escolher a cortina ideal para a sala: modelos Wave, prega fêmea, macho, americana, tombada e franzida, e como combinar com o estofado e o tapete.'],
  'quantidade-de-tecido-para-cortina-wave': ['Quantidade de Tecido para Cortina Wave: 2:1 a 3:1 | ShineCortinas', 'Saiba calcular a quantidade de tecido para cortina Wave (proporções 2:1, 2,5:1 e 3:1), cordão espaçador 0,4 a 0,8, tipos de forro e cortineiro mínimo 15x15 cm.'],
  'varao-para-cortina': ['Varão para Cortina: Tubo Suíço, Altura e Medidas | ShineCortinas', 'Saiba escolher varão para cortina: diâmetros de 19 mm e 28 mm em alumínio, varão simples ou duplo, suporte central acima de 2 m e como funciona o tubo suíço.'],
};

const VIDEO_META = {
  'ajuste-bainha-em-casa-alfaiataria': ['Ajuste de Bainha em Domicílio: Alfaiataria | ShineCortinas', null],
  'cortina-cabana-chale-vassouras': ['Cortina Sob Medida em Chalé A-Frame Vassouras | ShineCortinas', 'Projeto sob medida em chalé A-Frame em Vassouras: cortina que acompanha o vão inclinado da cabana, garantindo conforto térmico, caimento e privacidade.'],
  'cortina-motorizada-wave-resende': ['Cortina Motorizada Wave em Resende RJ | ShineCortinas', null],
  'cortina-screen-motorizada-mangaratiba': ['Cortina Tela Solar Motorizada em Mangaratiba | ShineCortinas', null],
  'experiencia-tecidos-alfaiataria': ['Mostruário em Domicílio e Tecidos Sob Medida | ShineCortinas', null],
  'instalacao-sul-fluminense': ['Instalação de Cortinas no Sul Fluminense | ShineCortinas', null],
  'persiana-horizontal-madeira-barra-mansa': ['Persiana de Madeira 50mm em Barra Mansa | ShineCortinas', null],
};

// --------------------------------------------- posts do blog (visual apenas)
// O texto atual é mantido; a reescrita de copy é etapa separada (docs/fila-de-conteudo.md).
// Mantém head, header, rodapé e tail sincronizados mesmo nas páginas já migradas.
function sincronizaCss(file, src, sectionPath = '/blog/', crumbs, metaFix) {
  let [rawHead, rest] = src.split('<body');
  if (!rest) return;
  if (metaFix && metaFix[0]) rawHead = rawHead.replace(/<title>[\s\S]*?<\/title>/, `<title>${metaFix[0]}</title>`);
  if (metaFix && metaFix[1]) rawHead = rawHead.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${metaFix[1]}">`);
  rawHead = rawHead.replace(/Por que escolher cortina motorizada em projetos de alto padrão/g, 'Por que escolher cortina motorizada em projetos sob medida');
  rawHead = rawHead.replace(/Cortina Motorizada Wave de Alto Padrão em Resende RJ/g, 'Cortina Motorizada Wave Sob Medida em Resende RJ');
  rawHead = rawHead.replace(/levamos o mostruário de alto padrão até sua obra/g, 'levamos o mostruário completo até a sua casa');
  const head = cleanHead(rawHead, { crumbs });
  let body = '<body' + rest;
  body = body.replace(/acabamento de alto padrão\./g, 'acabamento sob medida.');
  body = body.replace(/Em projetos de alto padrão, o material/g, 'Em projetos sob medida, o material');
  body = body.replace(/Por que escolher cortina motorizada em projetos de alto padrão/g, 'Por que escolher cortina motorizada em projetos sob medida');
  body = body.replace(/Cortina Motorizada Wave de Alto Padrão em Resende RJ/g, 'Cortina Motorizada Wave Sob Medida em Resende RJ');
  body = body.replace(/levamos o mostruário de alto padrão até sua obra/g, 'levamos o mostruário completo até a sua casa');
  body = body.replace(/<header class="(?:pv-header|sl-header)"[\s\S]*?<\/header>(?:\s*<nav class="sl-nav-fallback"[\s\S]*?<\/nav>)*/, header(sectionPath).trim());
  body = body.replace(/<footer class="sl-footer">[\s\S]*?<\/html>\s*$/, `${footer().trimStart()}${waFloat()}${bar('single')}${tail()}`);
  writeFileSync(file, head + body);
}

function buildPosts() {
  const dirs = readdirSync(join(ROOT, 'blog'), { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);
  let n = 0;
  for (const slug of dirs) {
    const file = join(ROOT, 'blog', slug, 'index.html');
    const src = readFileSync(file, 'utf8');
    const curLabel = (src.match(/<li aria-current="page">([^<]+)<\/li>/) || src.match(/<nav aria-label="Breadcrumb"[^>]*>[\s\S]*?<span>([^<]+)<\/span>\s*<\/nav>/) || [, 'Artigo'])[1].trim();
    const crumbs = [['Início', `${BASE}/`], ['Blog', `${BASE}/blog/`], [curLabel, `${BASE}/blog/${slug}/`]];
    if (src.includes('shine-leve.css')) { sincronizaCss(file, src, '/blog/', crumbs, POST_META[slug]); continue; } // já migrado (ex.: tipos-de-forro)
    const mainM = src.match(/<main[^>]*>([\s\S]*?)<\/main>/);
    if (!mainM) { console.warn(`  (sem <main>) ${slug}`); continue; }
    let main = mainM[1];
    const h1 = (main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, slug])[1].replace(/<[^>]+>/g, '').trim();
    const meta = (main.match(/<p><strong>Atualizado em:<\/strong>([^<]*)</) || [, ''])[1].trim().replace(/·.*$/, '').trim();
    // remove do corpo: link de voltar, h1 e linha de meta (viram hero)
    main = main.replace(/<p><a href="\/blog\/"[^>]*>[\s\S]*?<\/a><\/p>/, '')
               .replace(/<h1[^>]*>[\s\S]*?<\/h1>/, '')
               .replace(/<p><strong>Atualizado em:<\/strong>[\s\S]*?<\/p>/, '')
               .replace(/ class="[^"]*"/g, '')
               .replace(/<div>\s*<h2>/g, '<h2>').replace(/<section[^>]*>/g, '').replace(/<\/section>/g, '')
               .replace(/<table>/g, '<div class="sl-tablewrap"><table>').replace(/<\/table>/g, '</table></div>')
               .trim();
    const lead = (main.match(/<p>([\s\S]*?)<\/p>/) || [, ''])[1];
    main = main.replace(/<p>[\s\S]*?<\/p>/, '');
    const head = cleanHead(src.split('<body')[0], { crumbs });
    const body = `<body data-concept="ambientes" data-logo-finish="aurora" data-wa-context="o artigo &quot;${esc(h1)}&quot;">
${header('/blog/')}
  <section class="sl-hero sl-hero--post">
    <div class="sl-wrap"><div class="sl-hero__in">
      <nav aria-label="Breadcrumb"><ol class="sl-crumbs">
        <li><a href="/">Início</a></li><li aria-hidden="true">/</li>
        <li><a href="/blog/">Blog</a></li><li aria-hidden="true">/</li>
        <li aria-current="page">Artigo</li>
      </ol></nav>
      <p class="sl-kicker">Blog ShineCortinas</p>
      <h1 class="sl-h1" style="font-size:clamp(28px,4.2vw,46px)">${esc(h1)}</h1>
      <p class="sl-postmeta"><span>Por <a href="/sobre/">Isani Oliveira</a>, fundador da ShineCortinas e especialista em cortinas sob medida</span>${meta ? `<span>Atualizado em ${esc(meta)}</span>` : ''}</p>
    </div></div>
  </section>
${cityChip(null)}
  <main>
    <article class="sl-section"><div class="sl-wrap"><div class="sl-article">
      ${lead ? `<p class="sl-lead">${lead}</p>` : ''}
${main}
      <div class="sl-cta-inline">
        <h3>Quer aplicar isso no seu ambiente?</h3>
        <p>O consultor vai até a sua casa com o mostruário e mede a laser. Gratuito e sem compromisso.</p>
        <a class="sl-btn" data-wa="estimativa" href="${WA}" target="_blank" rel="noopener noreferrer">Falar com um consultor →</a>
      </div>
    </div></div></article>
${ctaFinal()}
${explore([['/blog/', 'Todos os artigos'], ['/cortinas/', 'Cortinas'], ['/persianas/', 'Persianas'], ['/blackout-e-forros/', 'Blackout e forros'], ['/cortina-wave/', 'Cortina wave'], ['/metodo/', 'Como funciona'], ['/portfolio/', 'Projetos'], ['/cidades-atendidas/', 'Cidades']])}
  </main>
${footer()}${waFloat()}${bar('single')}${tail()}`;
    writeFileSync(file, head + body);
    n++;
  }
  return n;
}


// -------------------------------------------- páginas individuais de vídeo
function buildVideoPages() {
  const dir = join(ROOT, 'videos');
  let n = 0;
  for (const f of readdirSync(dir).filter((x) => statSync(join(dir, x)).isDirectory())) {
    const file = join(dir, f, 'index.html'); // /videos/<slug>/index.html → URL /videos/<slug>/
    const src = readFileSync(file, 'utf8');
    const crumbs = [['Início', `${BASE}/`], ['Vídeos', `${BASE}/videos/`], ['Projeto', `${BASE}/videos/${f}/`]];
    if (src.includes('shine-leve.css')) { sincronizaCss(file, src, '/videos/', crumbs, VIDEO_META[f]); continue; }
    const h1 = dec((src.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, ''])[1].replace(/<[^>]+>/g, '').trim());
    const iframe = (src.match(/<iframe[\s\S]*?<\/iframe>/) || [''])[0]
      .replace(/ class="[^"]*"/, '').replace('<iframe', '<iframe class="sl-embed"');
    const lead = dec(((src.match(/<h1[^>]*>[\s\S]*?<\/h1>\s*<p[^>]*>([\s\S]*?)<\/p>/) || [, ''])[1]).replace(/<[^>]+>/g, '').trim());
    const extra = [...src.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>\s*<p[^>]*>([\s\S]*?)<\/p>/g)]
      .map((m) => `      <h2 class="sl-h2">${dec(m[1].replace(/<[^>]+>/g, '').trim())}</h2>\n      <p>${dec(m[2].replace(/<[^>]+>/g, '').trim())}</p>`).join('\n');
    const head = cleanHead(src.split('<body')[0], { crumbs });
    const body = `<body data-concept="ambientes" data-logo-finish="aurora" data-wa-context="o vídeo &quot;${esc(h1)}&quot;">
${header('/videos/')}
  <section class="sl-hero sl-hero--post">
    <div class="sl-wrap"><div class="sl-hero__in">
      <nav aria-label="Breadcrumb"><ol class="sl-crumbs">
        <li><a href="/">Início</a></li><li aria-hidden="true">/</li>
        <li><a href="/videos/">Vídeos</a></li><li aria-hidden="true">/</li>
        <li aria-current="page">Projeto</li>
      </ol></nav>
      <p class="sl-kicker">Vídeo · projeto real</p>
      <h1 class="sl-h1" style="font-size:clamp(28px,4.2vw,44px)">${esc(h1)}</h1>
    </div></div>
  </section>
${cityChip(null)}
  <main>
    <section class="sl-section"><div class="sl-wrap"><div class="sl-article">
      ${lead ? `<p class="sl-lead">${esc(lead)}</p>` : ''}
      <div class="sl-videobox">${iframe}</div>
${extra}
      <div class="sl-cta-inline">
        <h3>Quer um projeto assim na sua casa?</h3>
        <p>O consultor vai até você com o mostruário e mede a laser. Gratuito e sem compromisso.</p>
        <a class="sl-btn" data-wa="estimativa" href="${WA}" target="_blank" rel="noopener noreferrer">Falar com um consultor →</a>
      </div>
    </div></div></section>
${ctaFinal()}
${explore([['/videos/', 'Todos os vídeos'], ['/portfolio/', 'Projetos'], ['/cortinas/', 'Cortinas'], ['/persianas/', 'Persianas'], ['/cortina-wave/', 'Cortina wave'], ['/cortina-motorizada/', 'Motorizada'], ['/metodo/', 'Como funciona'], ['/cidades-atendidas/', 'Cidades']])}
  </main>
${footer()}${waFloat()}${bar('single')}${tail()}`;
    writeFileSync(file, head + body);
    n++;
  }
  return n;
}

// ------------------------------------------------------------------- 404
function build404() {
  const file = join(ROOT, '404.html');
  let src = readFileSync(file, 'utf8');
  if (!/name="robots"/.test(src)) src = src.replace('</title>', '</title>\n  <meta name="robots" content="noindex, follow">');
  const head = cleanHead(src.split('<body')[0], { semSchema: true });
  const body = `<body data-concept="ambientes" data-logo-finish="aurora" data-wa-context="uma página não encontrada">
${header('/')}
  <main>
    <section class="sl-section" style="padding-top:clamp(80px,14vw,140px)"><div class="sl-wrap sl-center">
      <p class="sl-kicker sl-kicker--center">Erro 404</p>
      <h1 class="sl-h2" style="font-size:clamp(30px,4.6vw,48px)">Esta página <em>mudou de lugar</em></h1>
      <p class="sl-sub" style="margin:0 auto 26px">O endereço que você abriu não existe mais. Comece pelo início ou vá direto para o que você procurava.</p>
      <a class="sl-btn" href="/">Voltar para o início →</a>
    </div></section>
${explore([['/cortinas/', 'Cortinas'], ['/persianas/', 'Persianas'], ['/blackout-e-forros/', 'Blackout e forros'], ['/cortina-motorizada/', 'Motorizada'], ['/portfolio/', 'Projetos'], ['/videos/', 'Vídeos'], ['/blog/', 'Blog'], ['/cidades-atendidas/', 'Cidades']])}
  </main>
${footer()}${waFloat()}${tail()}`;
  writeFileSync(file, head + body);
}

build404();
console.log(`build-especiais: /faq (${buildFaq()} perguntas), /videos (${buildVideos()} vídeos), hub (${buildHub()} cidades), /blog (${buildBlogIndex()} posts), posts migrados: ${buildPosts()}, vídeos individuais: ${buildVideoPages()}, 404 ok`);
