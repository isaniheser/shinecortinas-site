// Gera a home (index.html) no sistema visual "leve": uma página só para celular e desktop.
// O <head> existente (title, metas, canonical, JSON-LD) é preservado e limpo; o redirect de
// celular para /app/ é removido; FAQPage e WebPage entram no JSON-LD.
// Uso: node scripts/build-home.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { WA, esc, cleanHead, header, cityChip, strip, proof, compare, footer, waFloat, bar, tail } from './partials.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FILE = join(ROOT, 'index.html');
const BASE = 'https://www.shinecortinas.com';
const TODAY = new Date().toISOString().slice(0, 10);

const CITIES = [
  ['volta-redonda', 'Volta Redonda'], ['barra-mansa', 'Barra Mansa'], ['resende', 'Resende'], ['porto-real', 'Porto Real'],
  ['itatiaia', 'Itatiaia'], ['penedo', 'Penedo'], ['visconde-de-maua', 'Visconde de Mauá'], ['maromba', 'Maromba'],
  ['pinheiral', 'Pinheiral'], ['pirai', 'Piraí'], ['barra-do-pirai', 'Barra do Piraí'], ['valenca', 'Valença'],
  ['vassouras', 'Vassouras'], ['paulo-de-frontin', 'Engenheiro Paulo de Frontin'], ['miguel-pereira', 'Miguel Pereira'],
];

const SOLUCOES = [
  { href: '/cortinas/', img: '/cortina-sob-medida.avif', tag: 'Cortinas', h: 'Cortinas sob medida', p: 'Wave, prega, painel e linho. Cabeçote com memória e barra dupla para o caimento que não desmancha.' },
  { href: '/persianas/', img: '/persiana-motorizada.avif', tag: 'Persianas', h: 'Persianas técnicas', p: 'Rolô, romana, double vision, vertical e screen. Luz e privacidade na medida de cada janela.' },
  { href: '/cortina-motorizada/', img: '/automacao.avif', tag: 'Automação', h: 'Cortinas e persianas motorizadas', p: 'Motores de 7ª geração, silenciosos, com Alexa, Google Home e Apple Home. Abre pelo celular ou pela voz.' },
  { href: '/blackout-e-forros/', img: '/blackouts-tecnicos.avif', tag: 'Blackout', h: 'Blackout técnico e forros', p: 'Forro translúcido para privacidade, semi blackout de 70% para penumbra e blackout 100% para escuro total. O forro define o resultado.' },
  { href: '/cortina-wave/', img: '/linha-puro.avif', tag: 'Linha Puro', h: 'Linho e tecidos selecionados', p: 'Curadoria de tecidos que você sente na mão, na sua sala, antes de decidir.' },
  { href: '/persianas/', img: '/madeira.avif', tag: 'Madeira', h: 'Persianas de madeira', p: 'Toque natural e controle de luz por lâminas. Para cozinhas, escritórios e varandas.' },
];

const PASSOS = [
  ['Você fala com a gente', 'WhatsApp, Instagram ou telefone. Em minutos você fala com um consultor de verdade, sem robô e sem formulário.'],
  ['Agendamos a visita gratuita', 'O consultor vai até a sua casa, na sua cidade, no dia e horário que funcionar para você.'],
  ['Medição a laser', 'Cada ambiente medido com equipamento profissional. A medida é responsabilidade nossa, não sua.'],
  ['Projeto e aprovação', 'Você vê tecidos, cores e modelos no seu ambiente e aprova cada detalhe antes de qualquer compromisso.'],
  ['Confecção sob medida', 'Sua cortina ou persiana é feita do zero para a sua janela. Nada de peça genérica adaptada.'],
  ['Instalação pela nossa equipe', 'Chegamos, instalamos e saímos deixando o ambiente limpo. Na maioria dos projetos, tudo no mesmo dia.'],
];

const FAQ = [
  ['Como funciona o investimento num projeto sob medida?', 'Cada projeto é único, então não há tabela de preços fixa: o valor depende do ambiente, dos tecidos escolhidos e do tipo de instalação. Na consultoria em domicílio, gratuita, o consultor apresenta as opções e as condições, incluindo a comodidade de parcelar em até 12x. Você decide com calma, sem compromisso.'],
  ['Vocês atendem na minha cidade?', 'Sim. Atendemos todo o Sul Fluminense: Volta Redonda, Barra Mansa, Resende, Itatiaia, Penedo, Visconde de Mauá, Maromba, Porto Real, Pinheiral, Piraí, Barra do Piraí, Valença, Vassouras, Engenheiro Paulo de Frontin e Miguel Pereira. O consultor vai até você.'],
  ['Tenho que ir até a loja?', 'Não. Somos pioneiros no modelo de consultoria em domicílio: o especialista vai até a sua casa com o mostruário, mede cada ambiente a laser e apresenta as melhores opções no seu espaço. Você escolhe sem sair de casa e sem pressão.'],
  ['Quanto tempo leva para instalar?', 'Na grande maioria dos projetos, a instalação é concluída no mesmo dia. A equipe chega, trabalha com limpeza e sai deixando o ambiente pronto, sem entulho.'],
  ['O blackout bloqueia toda a luz do quarto?', 'Depende do forro. O forro blackout 100% bloqueia a passagem de luz pelo tecido e é ele que entrega o quarto escuro de verdade. O forro blackout de 70%, chamado de semi blackout, deixa o ambiente em penumbra. Na consultoria o consultor mede a janela e indica o forro certo para o escurecimento que você procura.'],
  ['Qual é a garantia?', 'A garantia parte de 1 ano na instalação, chega a 5 anos em cortinas e a até 8 anos nos projetos com motorização. Se surgir qualquer problema, você nos chama e a gente resolve, sem burocracia e sem custo adicional.'],
];

const BLOG = [
  ['/blog/por-que-escolher-cortina-motorizada', 'Automação', 'Por que escolher uma cortina motorizada', 'Motores de 7ª geração, silêncio e integração com a casa conectada.'],
  ['/blog/o-que-e-blackout', 'Blackout', 'O que é blackout e quando faz diferença', 'Não é só tecido grosso: entenda a trama, o forro e o peso da instalação.'],
  ['/blog/linho-para-cortinas', 'Tecidos', 'Linho para cortinas: caimento e memória', 'Por que as cortinas da Shine mantêm a forma ano após ano.'],
];

// Regras do simulador "qual cortina para o meu ambiente?" — validar com o Isani.
// Regras do simulador. 5º campo: true = a foto mostra exatamente esse ambiente/solução;
// false = foto de referência do modelo (outro ambiente) até termos a foto certa — ver docs/fotos-necessarias.md
const SIM = {
  escurecer: {
    quarto: ['Cortina com forro blackout 100%', 'É o que entrega quarto escuro de verdade: o forro blackout 100% bloqueia a passagem de luz pelo tecido. Resolve quem trabalha à noite ou tem bebê em casa.', '/blackouts-tecnicos.avif', '/blackout-e-forros/', false],
    sala: ['Blackout técnico para sala e home theater', 'Escuridão de cinema quando você quiser, com o acabamento de cortina.', '/blackouts-tecnicos.avif', '/blackout-e-forros/', true],
    escritorio: ['Persiana rolô blackout', 'Barra a luz que bate no monitor e na câmera da reunião, com acionamento discreto.', '/blackouts-tecnicos.avif', '/persianas/', false],
    cozinha: ['Persiana rolô blackout', 'Escurece quando você precisa, com tecido fácil de limpar.', '/blackouts-tecnicos.avif', '/persianas/', false],
  },
  privacidade: {
    sala: ['Voil com cortina de linho', 'O voil dá privacidade sem escurecer; a segunda camada fecha quando você quiser.', '/duplo.avif', '/cortinas/', true],
    quarto: ['Cortina dupla com forro', 'Quem define a privacidade é o forro: o translúcido fecha a vista de dia, e o blackout 100% fecha à noite, com a luz acesa.', '/duplo.avif', '/blackout-e-forros/', false],
    escritorio: ['Persiana double vision', 'Faixas que abrem e fecham a visão de fora sem perder a luz.', '/persiana-motorizada.avif', '/persianas/', false],
    cozinha: ['Persiana de madeira', 'Lâminas que fecham a visão e resistem ao dia a dia da cozinha.', '/madeira.avif', '/persianas/', false],
  },
  sol: {
    sala: ['Tela solar screen', 'Corta o calor e o reflexo sem esconder a vista da janela.', '/tela-solar.avif', '/persianas/', true],
    quarto: ['Screen com blackout', 'Screen para o dia, blackout para dormir: dois sistemas na mesma janela.', '/persiana-motorizada.avif', '/persianas/', false],
    escritorio: ['Tela solar screen', 'Reflexo zero na tela e temperatura mais baixa, com a vista preservada.', '/persiana-motorizada.avif', '/persianas/', false],
    cozinha: ['Persiana rolô screen', 'Sol controlado e limpeza simples.', '/persiana-motorizada.avif', '/persianas/', false],
  },
  decorar: {
    sala: ['Cortina wave em linho', 'Ondas regulares do teto ao chão. É o acabamento de projeto de arquitetura.', '/cortina-sob-medida.avif', '/cortina-wave/', true],
    quarto: ['Cortina wave com forro', 'Caimento perfeito e o conforto do forro para dormir melhor.', '/cortina-sob-medida.avif', '/cortina-wave/', false],
    escritorio: ['Persiana de madeira', 'Toque natural e ar de biblioteca, com luz por lâminas.', '/madeira.avif', '/persianas/', true],
    cozinha: ['Persiana de madeira', 'Calor visual e praticidade na limpeza.', '/madeira.avif', '/persianas/', false],
  },
};

function readReviews(ld) {
  const biz = ld['@graph'].find((n) => n['@type'] === 'LocalBusiness');
  return (biz && biz.review ? biz.review : []).map((r) => ({ name: r.author && r.author.name, body: r.reviewBody })).filter((r) => r.name && r.body);
}

function body(reviews) {
  const cidades = CITIES.map(([s, n]) => `<a href="/cidades/${s}/">${n}</a>`).join('');
  const solucoes = SOLUCOES.map((s) => `        <a class="sl-card" href="${s.href}"><div class="sl-media"><img src="${s.img}" alt="${esc(s.h)} — ShineCortinas" width="800" height="1000" loading="lazy" decoding="async"></div><div class="sl-card__body"><span>${s.tag}</span><h3>${s.h}</h3><p>${s.p}</p><em>Ver detalhes →</em></div></a>`).join('\n');
  const passos = PASSOS.map(([h, p], i) => `        <div class="sl-step"><div class="sl-step__n">${i + 1}</div><h3>${h}</h3><p>${p}</p></div>`).join('\n');
  const faq = FAQ.map(([q, a]) => `        <details><summary>${q}</summary><div>${a}</div></details>`).join('\n');
  const blog = BLOG.map(([h, t, ti, p]) => `        <a class="sl-post" href="${h}"><span>${t}</span><h3>${ti}</h3><p>${p}</p></a>`).join('\n');
  const quotes = reviews.slice(0, 5).map((r) => `        <figure class="sl-quotecard"><div class="sl-stars" aria-label="5 estrelas">★★★★★</div><blockquote>"${esc(r.body)}"</blockquote><figcaption>${esc(r.name)}<small>Avaliação real no Google</small></figcaption></figure>`).join('\n');

  return `<body id="top" data-wa-context="a página inicial">
${header('/')}
  <section class="sl-hero sl-hero--home">
    <div class="sl-hero__img"><img src="/hero-sala.avif" alt="Sala com cortina sob medida do teto ao chão, projeto ShineCortinas" width="1920" height="1080" fetchpriority="high" decoding="async"></div>
    <div class="sl-wrap"><div class="sl-hero__in">
      <p class="sl-kicker">Volta Redonda · Sul Fluminense · desde 2009</p>
      <h1 class="sl-h1">Cortinas e Persianas Sob Medida em <em>Volta Redonda</em> e todo o Sul Fluminense</h1>
      <div class="sl-hero__rule"></div>
      <p class="sl-lede">O consultor vai até a sua casa, mede a laser e você escolhe os tecidos no seu próprio ambiente. Consultoria gratuita, sem compromisso, e você decide no seu tempo.</p>
      <a class="sl-btn" data-wa="conversar" href="${WA}" target="_blank" rel="noopener noreferrer">Falar com um consultor →</a>
      <p class="sl-note">Sem compromisso · Resposta em minutos · Você decide o próximo passo</p>
    </div></div>
  </section>
${cityChip(null)}${strip()}
  <main>
    <section class="sl-section sl-reveal"><div class="sl-wrap sl-grid-2">
      <div class="sl-media"><img src="/cortina-sob-medida.avif" alt="Sala com cortina de linho sob medida, caimento perfeito, projeto ShineCortinas" width="800" height="1000" loading="lazy" decoding="async"></div>
      <div class="sl-copy">
        <p class="sl-kicker">Imagine só</p>
        <h2 class="sl-h2">A luz entrando do jeito certo, <em>todo dia.</em></h2>
        <p>Cortina sob medida não é cortina de prateleira. Cada projeto começa com medição a laser e uma curadoria de tecidos escolhida para o seu ambiente, apresentada na sua casa.</p>
        <p>Há 17 anos fazemos isso em Volta Redonda, Barra Mansa, Resende e em toda a região, com <strong>equipe própria do consultor ao instalador</strong> e a comodidade de parcelar em até 12x.</p>
        <a class="sl-btn sl-btn--green" data-wa="estimativa" href="${WA}" target="_blank" rel="noopener noreferrer">Quero esse resultado na minha casa →</a>
      </div>
    </div></section>

    <section class="sl-section sl-reveal" id="simulador"><div class="sl-wrap">
      <div class="sl-center" style="margin-bottom:26px">
        <p class="sl-kicker sl-kicker--center">Em três toques</p>
        <h2 class="sl-h2">Qual cortina para o <em>meu ambiente?</em></h2>
        <p class="sl-sub">Escolha o cômodo e o que você precisa. A gente sugere o caminho e você confirma na visita.</p>
      </div>
      <form class="sl-sim" id="sim" data-sim>
        <fieldset><legend>1. O cômodo</legend>
          <label><input type="radio" name="comodo" value="sala" checked><span>Sala</span></label>
          <label><input type="radio" name="comodo" value="quarto"><span>Quarto</span></label>
          <label><input type="radio" name="comodo" value="escritorio"><span>Home office</span></label>
          <label><input type="radio" name="comodo" value="cozinha"><span>Cozinha / área</span></label>
        </fieldset>
        <fieldset><legend>2. O que você precisa</legend>
          <label><input type="radio" name="objetivo" value="decorar" checked><span>Decorar</span></label>
          <label><input type="radio" name="objetivo" value="escurecer"><span>Escurecer</span></label>
          <label><input type="radio" name="objetivo" value="privacidade"><span>Privacidade</span></label>
          <label><input type="radio" name="objetivo" value="sol"><span>Controlar o sol</span></label>
        </fieldset>
        <fieldset><legend>3. Um extra</legend>
          <label><input type="checkbox" name="motor" value="1"><span>Quero abrir pelo celular ou pela voz</span></label>
        </fieldset>
        <div class="sl-sim__result" data-sim-result aria-live="polite">
          <div class="sl-media"><img data-sim-img src="/cortina-sob-medida.avif" alt="Sugestão de cortina para o seu ambiente" width="800" height="1000" loading="lazy" decoding="async"><span class="sl-sim__ref" data-sim-ref hidden>Referência do modelo, em outro ambiente</span></div>
          <div>
            <p class="sl-kicker">Nossa sugestão</p>
            <h3 data-sim-title>Cortina wave em linho</h3>
            <p data-sim-text>Ondas regulares do teto ao chão. É o acabamento de projeto de arquitetura.</p>
            <p class="sl-sim__motor" data-sim-motor hidden>Com motorização de 7ª geração: silenciosa, com Alexa, Google Home e Apple Home.</p>
            <div class="sl-sim__actions">
              <a class="sl-btn" data-wa="estimativa" href="${WA}" target="_blank" rel="noopener noreferrer">Receber uma estimativa para este ambiente →</a>
              <a class="sl-btn sl-btn--ghost" data-sim-link href="/cortina-wave/">Ver detalhes</a>
            </div>
          </div>
        </div>
      </form>
    </div></section>

    <section class="sl-section sl-reveal" id="solucoes"><div class="sl-wrap">
      <div class="sl-center" style="margin-bottom:30px">
        <p class="sl-kicker sl-kicker--center">O que a gente faz</p>
        <h2 class="sl-h2">Soluções sob medida para <em>cada janela</em></h2>
        <p class="sl-sub">Da cortina de linho à persiana motorizada. Tudo medido, confeccionado e instalado pela nossa equipe.</p>
      </div>
      <div class="sl-cards">
${solucoes}
      </div>
    </div></section>
${proof(null)}
    <section class="sl-section sl-section--tight sl-reveal"><div class="sl-wrap sl-center">
      <p class="sl-label">Quem confia no padrão Shine</p>
      <div class="sl-clients"><span>UNIMED</span><span>Volkswagen</span><span>CSN</span><span>Banco do Brasil</span><span>Sicredi</span><span>OAB</span></div>
    </div></section>
${compare()}
    <section class="sl-section sl-reveal" id="metodo"><div class="sl-wrap">
      <div class="sl-center" style="margin-bottom:34px">
        <p class="sl-kicker sl-kicker--center">Simples, transparente, sem surpresa</p>
        <h2 class="sl-h2">Como funciona o <em>atendimento Shine</em></h2>
      </div>
      <div class="sl-steps sl-steps--6">
${passos}
      </div>
    </div></section>

    <section class="sl-band" id="depoimentos"><div class="sl-wrap">
      <p class="sl-kicker">Avaliações reais · Google 5.0</p>
      <h2 class="sl-h2">O que dizem depois da <em>instalação</em></h2>
      <div class="sl-quotes">
${quotes}
      </div>
    </div></section>

    <section class="sl-section sl-reveal" id="cidades"><div class="sl-wrap">
      <div class="sl-center" style="margin-bottom:26px">
        <p class="sl-kicker sl-kicker--center">Presença regional</p>
        <h2 class="sl-h2">Atendemos <em>15 cidades</em> do Sul Fluminense</h2>
        <p class="sl-sub">Cada cidade tem uma página própria, com perguntas, depoimento e projetos de lá. Escolha a sua.</p>
      </div>
      <div class="sl-chips">${cidades}</div>
      <p class="sl-center" style="margin-top:22px"><a href="/cidades-atendidas.html" class="sl-btn sl-btn--ghost">Ver todas as cidades →</a></p>
    </div></section>

    <section class="sl-section sl-reveal" id="blog"><div class="sl-wrap">
      <div class="sl-center" style="margin-bottom:26px">
        <p class="sl-kicker sl-kicker--center">A palavra do especialista</p>
        <h2 class="sl-h2">Guias para escolher <em>sem erro</em></h2>
      </div>
      <div class="sl-posts">
${blog}
      </div>
      <p class="sl-center" style="margin-top:22px"><a href="/blog/" class="sl-btn sl-btn--ghost">Ver o blog completo →</a></p>
    </div></section>

    <section class="sl-section sl-reveal" id="faq"><div class="sl-wrap">
      <div class="sl-center" style="margin-bottom:28px">
        <p class="sl-kicker sl-kicker--center">Dúvidas frequentes</p>
        <h2 class="sl-h2">Antes de chamar a gente</h2>
      </div>
      <div class="sl-faq">
${faq}
      </div>
    </div></section>

    <section class="sl-section sl-reveal" id="ceo"><div class="sl-wrap sl-ceo">
      <img src="/ceo-shine.avif" alt="Isani Oliveira, fundador e CEO da ShineCortinas" width="320" height="320" loading="lazy" decoding="async">
      <div>
        <p class="sl-kicker">Quem responde por cada projeto</p>
        <blockquote class="sl-ceo__quote">"Alinhamento se faz antes. Depois disso, o que vier é justificativa."</blockquote>
        <p>Minha missão é garantir engenharia e cuidado para a sua família. Desde 2009, cada medida e cada instalação passam pelo mesmo padrão.</p>
        <p class="sl-quote-by" style="margin-top:12px">Isani Oliveira<small>Fundador e CEO · <a href="/sobre/">conheça a história</a></small></p>
      </div>
    </div></section>

    <section class="sl-band"><div class="sl-wrap sl-center">
      <p class="sl-kicker sl-kicker--center">Consultoria em domicílio · Sul Fluminense</p>
      <h2 class="sl-h2">Pronto para ver os tecidos <em>na sua sala?</em></h2>
      <p class="sl-sub" style="margin:0 auto 26px">A consultoria é gratuita, vai até a sua casa e você não precisa decidir nada na hora.</p>
      <a class="sl-btn" data-wa="agendar" href="${WA}" target="_blank" rel="noopener noreferrer">Agendar consultoria em casa →</a>
      <p class="sl-note">Gratuita · Sem compromisso · (24) 99329-8763</p>
    </div></section>

    <section class="sl-section sl-section--tight"><div class="sl-wrap">
      <p class="sl-label">Explore o site</p>
      <div class="sl-links">
        <a href="/cortinas/">Cortinas sob medida</a><a href="/persianas/">Persianas técnicas</a><a href="/cortina-motorizada/">Cortina motorizada</a><a href="/cortina-wave/">Cortina wave</a>
        <a href="/blackout-e-forros/">Blackout e forros</a><a href="/trilhos-e-acionamentos/">Trilhos e acionamentos</a><a href="/portfolio/">Portfólio real</a><a href="/videos/">Vídeos</a>
        <a href="/metodo/">Método</a><a href="/sobre/">Sobre a Shine</a><a href="/faq/">Perguntas frequentes</a><a href="/contato/">Contato</a>
      </div>
    </div></section>
  </main>
${footer()}${waFloat()}${bar('tabs')}
  <script>
    (function(){
      var SIM=${JSON.stringify(SIM)};
      var f=document.getElementById('sim'); if(!f) return;
      var img=f.querySelector('[data-sim-img]'),ref=f.querySelector('[data-sim-ref]'),tt=f.querySelector('[data-sim-title]'),tx=f.querySelector('[data-sim-text]'),mo=f.querySelector('[data-sim-motor]'),ln=f.querySelector('[data-sim-link]');
      var rooms={sala:'sala',quarto:'quarto',escritorio:'home office',cozinha:'cozinha'};
      function upd(){
        var c=f.comodo.value,o=f.objetivo.value,m=f.motor.checked,r=SIM[o][c];
        tt.textContent=r[0]; tx.textContent=r[1]; img.src=r[2]; img.alt=r[0]; ln.href=r[3]; mo.hidden=!m; ref.hidden=!!r[4];
        document.body.setAttribute('data-wa-context','o simulador: '+rooms[c]+', '+f.objetivo.value+(m?', com motorização':'')+' → '+r[0]);
      }
      f.addEventListener('change',upd); upd();
    })();
  </script>${tail()}`;
}

// ---- monta ----
const src = readFileSync(FILE, 'utf8');
let head = cleanHead(src.split('<body')[0]);
const ldm = head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
const ld = JSON.parse(ldm[1]);
const reviews = readReviews(ld);
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
writeFileSync(FILE, head + body(reviews));
console.log(`build-home: index.html gerado (${reviews.length} avaliações, ${FAQ.length} FAQs)`);
