// Gera artigos do blog no sistema visual "leve".
// Fonte dos fatos: conhecimento do Isani (ver CLAUDE.md → "Fatos de produto").
// Nada aqui pode contradizer aquela seção. Uso: node scripts/build-blog.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { WA, esc, cleanHead, header, cityChip, footer, waFloat, bar, tail, CSS_V, FONTS } from './partials.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://www.shinecortinas.com';
const TODAY = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' }); // data do Brasil, não UTC

const POSTS = [
  {
    slug: 'tipos-de-forro-para-cortina',
    title: 'Tipos de forro para cortina: translúcido, semi blackout e blackout 100%',
    seoTitle: 'Tipos de Forro para Cortina: Translúcido, Semi Blackout e Blackout 100% | ShineCortinas',
    description: 'O forro decide o resultado da cortina. Entenda o forro translúcido (gabardine, tergal, cetim, gorgurinho), o semi blackout de 70% e o blackout 100%.',
    kicker: 'Tecidos e forros',
    published: '2026-02-19',
    modified: '2026-09-07',
    // Resposta direta no primeiro parágrafo: é o trecho que buscadores e IAs citam.
    lead: 'O forro da cortina se divide em dois grupos. O <strong>forro translúcido</strong> dá privacidade, protege o tecido decorativo e quebra parte da claridade, sem escurecer o ambiente. O <strong>forro blackout</strong> tem duas versões: o de <strong>70%</strong>, chamado de semi blackout, que deixa o ambiente em penumbra, e o de <strong>100%</strong>, que bloqueia a passagem de luz pelo tecido e é o que entrega escuro de verdade.',
    body: `
      <h2>O forro é a camada que ninguém vê e que decide o resultado</h2>
      <p>O forro é uma segunda camada acoplada atrás do tecido decorativo da cortina. Quem entra no ambiente vê o linho, o voil ou o veludo que você escolheu. O forro fica escondido, mas é ele que determina quanta luz entra, quanta privacidade você tem de dia e quanto tempo o tecido de frente vai durar bonito.</p>
      <p>Por isso a escolha do forro não é um detalhe do fim do projeto. Ela vem junto com a escolha do tecido, porque as duas decisões juntas é que formam o resultado.</p>

      <h2>Forro translúcido: privacidade e proteção, sem escurecer</h2>
      <p>O forro translúcido cumpre três funções. Dá <strong>privacidade</strong> durante o dia, sem fechar o ambiente. <strong>Protege o tecido decorativo</strong> da cortina, que fica exposto ao sol todos os dias. E <strong>quebra parte da claridade</strong>, suavizando a luz que entra.</p>
      <p>É a escolha de quem quer o ambiente claro, mas sem a sensação de estar exposto e sem que o tecido bonito da frente sofra com o sol. Não é a escolha de quem precisa dormir de dia.</p>

      <h3>Os tecidos que compõem o forro translúcido</h3>
      <p>"Forro translúcido" é o nome do grupo, e dentro dele há mais de um tecido: <strong>gabardine</strong> (de algodão ou de poliéster), <strong>tergal</strong>, <strong>tergal verão</strong>, <strong>cetim</strong> e <strong>gorgurinho</strong>. Cada um se comporta de um jeito com a luz, com o caimento e com o tecido decorativo que vai na frente. A escolha entre eles é feita na consultoria, com o mostruário na mão e a luz do seu próprio ambiente.</p>

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
      <p>Veja também as <a href="/cortinas/">cortinas sob medida</a>, as <a href="/persianas/">persianas técnicas</a> e a página de <a href="/blackout-e-forros/">blackout e forros</a>. A Shine atende com consultoria gratuita em domicílio em <a href="/cidades/volta-redonda/">Volta Redonda</a>, <a href="/cidades/barra-mansa/">Barra Mansa</a>, <a href="/cidades/resende/">Resende</a> e em todo o <a href="/cidades-atendidas/">Sul Fluminense</a>.</p>
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
      ['Quais tecidos servem como forro translúcido?',
       'O forro translúcido é um grupo, e dentro dele há vários tecidos: gabardine (de algodão ou de poliéster), tergal, tergal verão, cetim e gorgurinho. Cada um responde de um jeito à luz e ao caimento, e a escolha é feita na consultoria, junto com o tecido decorativo da frente.'],
      ['Qual a diferença entre tecido blackout e forro blackout?',
       'O tecido blackout é o próprio tecido da cortina, que já bloqueia a luz. O forro blackout é uma segunda camada acoplada atrás de uma cortina decorativa, somando escurecimento sem abrir mão da estética do tecido de frente.'],
    ],
  },
  {
    slug: 'altura-ideal-da-cortina',
    title: 'Altura ideal da cortina: como eu decido a barra, o varão e a medida',
    seoTitle: 'Altura Ideal da Cortina: do Chão, do Teto e da Janela | ShineCortinas',
    description: 'Cortina de tecido vai até o chão. As três alturas de barra (bainha poodle, beijando o chão, um dedo), a regra dos 50 cm para fixar acima da janela, teto e cortineiro, e a medição em três pontos. Por Isani Oliveira.',
    kicker: 'Medidas e instalação',
    published: '2026-02-19',
    modified: TODAY,
    ogImage: '/hall-wave-volta-redonda.avif',
    faqEm: 'altura de cortina',
    bandH2: 'Deixe a medição <em>com a gente</em>',
    cta: { h3: 'Quer a altura certa sem risco de errar a medida?',
           p: 'Eu ou alguém da equipe vai até a sua casa, mede a laser nos três pontos e decide com você a altura da barra e a fixação. Gratuito e sem compromisso.' },
    related: [['/blog/bainha-de-cortina/', 'Bainha de cortina'], ['/blog/varao-para-cortina/', 'Varão para cortina'], ['/trilhos-e-acionamentos/', 'Trilhos e acionamentos'], ['/cortinas/', 'Cortinas sob medida'], ['/persianas/', 'Persianas'], ['/videos/ajuste-bainha-em-casa-alfaiataria/', 'Vídeo: ajuste de bainha em casa']],
    lead: 'Vou direto ao ponto, porque é a pergunta que mais escuto em 17 anos de consultoria: <strong>cortina de tecido vai até o chão</strong>. O que muda é como a barra termina, e aí existem três alturas: <strong>bainha poodle</strong>, <strong>beijando o chão</strong> e <strong>um dedo do chão</strong>. Em cima, com varão na parede, eu uso a <strong>regra dos 50 cm</strong>. Com cortineiro, o trilho vai dentro dele. E na hora de anotar a medida, <strong>largura primeiro, altura depois</strong>. Abaixo eu explico cada uma, com desenho.',
    body: `
      <div class="sl-toc"><p>Neste artigo</p><ol>
        <li><a href="#chao">Quanto a cortina fica do chão: as três alturas</a></li>
        <li><a href="#varao">Onde fixar em cima: a regra dos 50 cm</a></li>
        <li><a href="#teto">Fixação no teto e no cortineiro</a></li>
        <li><a href="#ambientes">Sala, quarto e janela com bancada</a></li>
        <li><a href="#largura">Largura: quanto passar da janela</a></li>
        <li><a href="#medir">Como eu meço: três pontos, largura antes da altura</a></li>
        <li><a href="#obstaculos">Ar-condicionado em cima da janela</a></li>
        <li><a href="#resumo">Resumo das medidas</a></li>
      </ol></div>

      <h2 id="chao">Quanto a cortina fica do chão: as três alturas</h2>
      <p>Antes de falar de centímetro, uma coisa que eu repito em toda consultoria: cortina de tecido não se faz na altura da janela. Imagina desperdiçar um tecido bonito cortando ele pela metade, "proporcional à janela". Para isso existe a <a href="/persianas/">persiana</a>, que é feita para o vão. A cortina desce até o piso. A decisão de verdade é como a barra encontra o chão, e existem três jeitos:</p>
      <figure class="sl-fig"><svg viewBox="0 0 660 250" role="img" aria-labelledby="fig1t"><title id="fig1t">Esquema das três alturas da barra da cortina em relação ao piso: bainha poodle, beijando o chão e um dedo do chão</title>
<g fill="none" stroke="#16302A" stroke-width="2"><line x1="20" y1="200" x2="640" y2="200"/></g>

<!-- painel 1: bainha poodle — tecido sobrando e amontoado no chão -->
<ellipse cx="120" cy="199" rx="78" ry="9" fill="#EFECE4"/>
<path d="M60,40 L60,148 C50,158 54,176 68,177 C80,178 78,192 94,193 C108,194 104,176 120,178 C136,180 132,196 150,192 C164,189 174,198 184,178 L184,40 Z" fill="#F3F1EB" stroke="#16302A" stroke-width="2" stroke-linejoin="round"/>
<g fill="none" stroke="#B9AF98" stroke-width="1.3" stroke-linecap="round">
  <path d="M64,168 Q76,180 90,174"/>
  <path d="M98,186 Q112,195 128,184"/>
  <path d="M136,182 Q150,190 166,174"/>
</g>
<g stroke="#DED8C8" stroke-width="1" fill="none"><path d="M86,45 L82,150"/><path d="M154,45 L160,150"/></g>

<!-- painel 2: beijando o chão -->
<rect x="270" y="40" width="120" height="160" fill="#F3F1EB" stroke="#16302A" stroke-width="2"/>
<g stroke="#DED8C8" stroke-width="1" fill="none"><path d="M300,45 L300,195"/><path d="M360,45 L360,195"/></g>

<!-- painel 3: um dedo do chão -->
<rect x="480" y="40" width="120" height="146" fill="#F3F1EB" stroke="#16302A" stroke-width="2"/>
<g stroke="#DED8C8" stroke-width="1" fill="none"><path d="M510,45 L510,181"/><path d="M570,45 L570,181"/></g>

<g stroke="#C6A868" stroke-width="1.2" fill="none"><line x1="60" y1="40" x2="184" y2="40"/><line x1="270" y1="40" x2="390" y2="40"/><line x1="480" y1="40" x2="600" y2="40"/></g>
<g fill="none" stroke="#7F6636" stroke-width="1.5"><path d="M540 186v14"/><path d="M535 186h10M535 200h10"/></g>
<text x="556" y="196" font-family="Montserrat,sans-serif" font-size="12" fill="#7F6636">1–2 cm</text>
<g font-family="Montserrat,sans-serif" font-size="13" fill="#16302A" text-anchor="middle" font-weight="600">
  <text x="122" y="230">Bainha poodle</text><text x="330" y="230">Beijando o chão</text><text x="540" y="230">Um dedo do chão</text>
</g>
<text x="122" y="214" font-family="Montserrat,sans-serif" font-size="11" fill="#6B7069" text-anchor="middle">tecido sobrando, amontoado</text>
</svg><figcaption>As três alturas da barra. O piso é a linha de baixo.</figcaption></figure>
      <p><strong>Bainha poodle.</strong> É o estilo europeu: a bainha fica sobrando e se acomoda no chão, arrastando de propósito. Dá volume e presença ao tecido.</p>
      <p><strong>Beijando o chão.</strong> Eu chamo de "pé de bailarina". A barra encosta de leve no piso, sem sobra.</p>
      <p><strong>Um dedo do chão.</strong> Uma folga de 1 a 2 centímetros entre a barra e o piso. É a mais comum nas casas.</p>
      <p>Qual das três? Não existe uma resposta única para toda casa. Isso depende do ambiente e do seu gosto, e é para isso que serve o olho do especialista na hora da visita: olhar o cômodo e dizer qual altura vai ficar melhor ali. Mas tem uma regra de que eu não abro mão:</p>
      <p class="sl-quoteline">Piso que reflete pede cortina beijando o chão.</p>
      <p>Hoje muita casa tem porcelanato polido, que funciona como um espelho. Agora imagine um quarto com esse piso e uma cortina a um dedo do chão. De manhã, a claridade entra por aquela frestinha, bate no piso espelhado e é jogada para cima. Você acorda com luz no teto. Nesse quarto, a barra tem que encostar no chão para bloquear essa claridade.</p>

      <div class="sl-aside"><strong>Leia também</strong><p>A bainha é o que define essas três alturas. No artigo sobre <a href="/blog/bainha-de-cortina/">bainha de cortina</a> eu explico como ela é feita e por que a costura tem que ser reta.</p></div>

      <h2 id="varao">Onde fixar em cima: a regra dos 50 cm</h2>
      <p>Existem dois tipos de fixação. <strong>Na parede</strong>, com suportes que seguram o tubo, que é o varão. E <strong>no teto</strong>, com trilho ou varão. Vou começar pela parede, que é a dúvida que mais chega.</p>
      <p>O objetivo é não deixar exposto o espaço entre a <strong>verga</strong>, que é o topo da janela ou da porta, e o teto. Mas sem exagerar para o outro lado, criando uma testeira enorme que atrapalha a arquitetura da casa. A regra que eu uso:</p>
      <figure class="sl-fig"><svg viewBox="0 0 660 300" role="img" aria-labelledby="fig2t"><title id="fig2t">Esquema da regra dos 50 cm: com 50 cm entre o topo da janela e o teto, o varão fica 25 cm acima da janela; janela perto do teto, varão rente ao teto</title>
<g fill="none" stroke="#16302A" stroke-width="2"><line x1="20" y1="30" x2="640" y2="30"/><line x1="20" y1="280" x2="640" y2="280"/><line x1="330" y1="30" x2="330" y2="280" stroke-dasharray="4 6" stroke="#DDD8CC"/></g>
<g fill="#fff" stroke="#16302A" stroke-width="2"><rect x="70" y="130" width="180" height="150"/><rect x="400" y="60" width="180" height="220"/></g>
<g stroke="#16302A" stroke-width="1" fill="none"><line x1="70" y1="205" x2="250" y2="205"/><line x1="160" y1="130" x2="160" y2="280"/><line x1="400" y1="170" x2="580" y2="170"/><line x1="490" y1="60" x2="490" y2="280"/></g>
<g stroke="#C6A868" stroke-width="5" stroke-linecap="round"><line x1="50" y1="80" x2="270" y2="80"/><line x1="380" y1="36" x2="600" y2="36"/></g>
<g fill="none" stroke="#7F6636" stroke-width="1.5"><path d="M290 30v100M285 30h10M285 130h10"/><path d="M40 80v50M35 80h10M35 130h10"/></g>
<g font-family="Montserrat,sans-serif" font-size="12" fill="#7F6636"><text x="298" y="84">50 cm</text><text x="14" y="112" transform="rotate(-90 14 112)" font-size="11">25 cm</text></g>
<g font-family="Montserrat,sans-serif" font-size="12" fill="#16302A" text-anchor="middle" font-weight="600"><text x="160" y="120">verga (topo da janela)</text><text x="160" y="55" fill="#7F6636" font-weight="400">varão a 25 cm da janela</text><text x="490" y="52" fill="#7F6636" font-weight="400">varão rente ao teto</text></g>
<text x="330" y="22" font-family="Montserrat,sans-serif" font-size="11" fill="#6B7069" text-anchor="middle">teto</text>
</svg><figcaption>À esquerda, a regra dos 50 cm: o varão divide o espaço. À direita, janela perto do teto: varão rente ao teto.</figcaption></figure>
      <p><strong>Se da verga até o teto ou a sanca tem uns 50 centímetros</strong>, eu divido: o varão fica <strong>25 centímetros acima da janela</strong>. Assim não sobra espaço demais nem do varão para o teto, nem do varão para a janela.</p>
      <p><strong>Se a janela já está quase encostada no teto</strong>, o varão vai <strong>rente ao teto</strong>, para aproveitar essa vantagem que o ambiente dá.</p>
      <p><strong>Se o vão entre a janela e o teto é muito grande</strong>, não adianta subir o varão para "alongar" o ambiente. Imagina o tubo lá em cima com um metro de parede nua até a janela. Fica horrível. Nesse caso não é o varão que resolve, é o projeto do ambiente que precisa ser olhado.</p>

      <div class="sl-aside"><strong>Leia também</strong><p>Tubo, suporte, ponteira: no artigo sobre <a href="/blog/varao-para-cortina/">varão para cortina</a> eu mostro o que muda de um varão para outro e como escolher.</p></div>

      <h2 id="teto">Fixação no teto e no cortineiro</h2>
      <p>No teto, a fixação pode ser feita direto na <strong>laje</strong>, no <strong>forro de gesso</strong> ou dentro do <strong>cortineiro</strong>. As três funcionam, desde que a fixação seja bem feita. Gesso aguenta cortina, sim, quando a bucha e o parafuso são os certos.</p>
      <p>Quando a casa tem cortineiro, a instalação vai <strong>dentro do cortineiro</strong>, ou numa <strong>sanca de gesso invertida</strong>. O trilho some e o tecido parece nascer do teto. É o acabamento mais limpo que existe.</p>
      <p>E uma coisa que eu nunca faço, nunca mesmo: <strong>varão de ilhós com suporte dentro de cortineiro</strong>. O cortineiro foi feito para receber trilho. Varão lá dentro estraga o acabamento e o funcionamento da cortina.</p>

      <h2 id="ambientes">Sala, quarto e janela com bancada</h2>
      <p>Na sala e no quarto, a regra é a mesma: até o chão, escolhendo entre as três alturas. No quarto, o piso polido costuma decidir sozinho pela barra beijando o chão, pelo motivo da claridade que eu contei acima.</p>
      <p>A única exceção é a janela que tem <strong>bancada ou pia</strong> embaixo. Aí a cortina pode terminar um pouco abaixo da bancada, proporcional ao vão, porque não tem como descer até o piso. Fora isso, cortina de tecido vai até o chão. Sempre.</p>

      <h2 id="largura">Largura: quanto passar da janela</h2>
      <p>Com varão na parede, o varão precisa passar de cada lado da janela <strong>o suficiente para acolher o pano da cortina recolhida</strong>. Ou seja: com a cortina aberta, todo o vidro tem que ficar livre.</p>
      <p>Não existe um número fixo. Passar 20 centímetros de cada lado pode não ser o suficiente, porque isso depende do volume de tecido. Uma cortina com mais onda ou mais prega pede mais espaço na lateral. O erro clássico é passar pouco e, com a cortina aberta, o tecido ainda cobrir um pedaço da janela.</p>

      <h2 id="medir">Como eu meço: três pontos, largura antes da altura</h2>
      <p>Quando a instalação vai no teto ou no cortineiro, eu meço a altura em <strong>três pontos, sempre da esquerda para a direita</strong>: lado esquerdo, meio e lado direito, do teto ao chão.</p>
      <figure class="sl-fig"><svg viewBox="0 0 660 240" role="img" aria-labelledby="fig3t"><title id="fig3t">Esquema da medição da altura em três pontos, da esquerda para a direita: lado esquerdo, meio e lado direito, do teto ao chão</title>
<g fill="none" stroke="#16302A" stroke-width="2"><line x1="20" y1="30" x2="640" y2="30"/><line x1="20" y1="210" x2="640" y2="213"/></g>
<g fill="#fff" stroke="#DDD8CC" stroke-width="1.5"><rect x="180" y="80" width="300" height="130"/></g>
<g fill="none" stroke="#7F6636" stroke-width="1.6"><path d="M100 30v180M95 30h10M95 210h10"/><path d="M330 30v181M325 30h10M325 211h10"/><path d="M560 30v183M555 30h10M555 213h10"/></g>
<g font-family="Playfair Display,serif" font-size="26" fill="#7F6636" text-anchor="middle"><text x="100" y="140">1</text><text x="330" y="140">2</text><text x="560" y="140">3</text></g>
<g font-family="Montserrat,sans-serif" font-size="12" fill="#16302A" text-anchor="middle" font-weight="600"><text x="100" y="232">esquerda</text><text x="330" y="232">meio</text><text x="560" y="232">direita</text></g>
<text x="330" y="22" font-family="Montserrat,sans-serif" font-size="11" fill="#6B7069" text-anchor="middle">do teto ao chão, sempre nesta ordem</text>
</svg><figcaption>Três medidas, da esquerda para a direita. Se elas diferem, o ambiente tem desnível.</figcaption></figure>
      <p>Por que três? Para descobrir se o ambiente tem diferença de altura de um lado para o outro. Isso influencia direto na confecção.</p>
      <p>O correto é não ter desnível. <strong>Até meio centímetro eu aceito.</strong> Quando chega a dois, três centímetros, e isso já aconteceu comigo, o caminho certo é chamar o gesseiro e fazer um enchimento na parte de cima. Em último caso, a gente ajusta a bainha no local.</p>
      <p>O que não se faz de jeito nenhum é costurar a bainha torta, na diagonal, para "compensar" o desnível. Isso danifica a trama do tecido, e com o tempo a cortina vai ficando desengonçada, com aqueles vincos que eu chamo de "caminho de rato". Se você já viu uma cortina torta na casa de alguém, quase sempre foi isso: uma costura enviesada. Cortina se costura em linha reta, no fio do tecido.</p>
      <p>E na hora de anotar a medida: <strong>a largura vem primeiro, a altura depois</strong>. Sempre. É a mesma regra da geometria, base vezes altura. Anotar ao contrário é uma das causas mais comuns de cortina que chega errada.</p>

      <h2 id="obstaculos">Ar-condicionado em cima da janela</h2>
      <p>O correto é a parte de cima da janela ficar <strong>livre</strong> para receber a cortina ou a persiana. Ar-condicionado não deveria ficar ali. Quando ele já está, ou quando tem outro obstáculo, eu preciso de <strong>no mínimo 30 centímetros livres</strong> para acomodar o suporte e o varão. Se esse espaço não existe, a solução passa a ser trilho no teto.</p>

      <h2 id="resumo">Resumo das medidas</h2>
      <div class="sl-tablewrap"><table>
        <thead><tr><th>Situação</th><th>O que eu uso</th></tr></thead>
        <tbody>
          <tr><td>Barra "um dedo do chão"</td><td>1 a 2 cm do piso</td></tr>
          <tr><td>Barra "beijando o chão"</td><td>Encostando de leve no piso; obrigatória em piso polido</td></tr>
          <tr><td>Bainha poodle</td><td>Sobra de tecido acomodada no chão</td></tr>
          <tr><td>Varão na parede, uns 50 cm até o teto</td><td>25 cm acima da verga</td></tr>
          <tr><td>Varão na parede, janela perto do teto</td><td>Rente ao teto</td></tr>
          <tr><td>Casa com cortineiro</td><td>Trilho dentro do cortineiro (ou sanca invertida); nunca varão de ilhós</td></tr>
          <tr><td>Desnível aceitável entre os três pontos</td><td>Até 0,5 cm</td></tr>
          <tr><td>Obstáculo acima da janela</td><td>Mínimo 30 cm livres para suporte e varão</td></tr>
          <tr><td>Ordem de anotação</td><td>Largura × altura</td></tr>
        </tbody>
      </table></div>

      <h2>Como fazemos na consultoria</h2>
      <p>Na visita, eu ou alguém da equipe mede a laser nos três pontos, confere a verga, o teto e o que tem acima da janela, e mostra as opções de barra com o tecido na mão, no seu ambiente. A escolha entre um dedo, beijar o chão ou bainha poodle é feita ali, com você, olhando o piso e a luz do cômodo. A cortina é confeccionada na medida exata e, quando o piso pede, a bainha é ajustada na sua casa, como neste <a href="/videos/ajuste-bainha-em-casa-alfaiataria/">vídeo de ajuste de bainha</a>.</p>
      <p>Veja também as <a href="/cortinas/">cortinas sob medida</a>, os <a href="/trilhos-e-acionamentos/">trilhos e acionamentos</a> e a <a href="/cortina-wave/">cortina wave</a>. A Shine atende com consultoria gratuita em todo o Sul Fluminense, de <a href="/cidades/volta-redonda/">Volta Redonda</a> a <a href="/cidades/resende/">Resende</a>.</p>
    `,
    faq: [
      ['Qual a altura da cortina no chão?',
       'A cortina de tecido vai até o chão. A barra pode terminar de três formas: com bainha poodle (sobra de tecido arrastando), beijando o chão (encostando de leve) ou a um dedo do chão (1 a 2 cm). Em piso polido que reflete a luz, a indicação é beijar o chão, para a claridade não entrar por baixo.'],
      ['Qual a altura ideal para cortina de sala e de quarto?',
       'Nos dois, até o chão. Na sala, a barra é escolhida pelo efeito desejado; no quarto, o piso polido costuma pedir a barra beijando o chão, porque o reflexo do piso joga a claridade para cima de manhã.'],
      ['Qual a altura da cortina acima da janela?',
       'Com varão fixado na parede, divida o espaço entre o topo da janela (a verga) e o teto. Com cerca de 50 cm de vão, o varão fica 25 cm acima da janela. Se a janela já está perto do teto, o varão vai rente ao teto.'],
      ['Qual a altura certa para colocar o varão de cortina?',
       'A mesma regra: 25 cm acima da janela quando há uns 50 cm até o teto, ou rente ao teto quando a janela está próxima dele. Nunca suba o varão deixando um vão de um metro de parede nua até a janela.'],
      ['O que vem primeiro na medida da cortina, altura ou largura?',
       'Largura primeiro, altura depois. Anote sempre largura × altura. Anotar ao contrário é uma causa comum de cortina confeccionada errada.'],
      ['Como medir a altura da cortina?',
       'Do teto ao chão, em três pontos, da esquerda para a direita: lado esquerdo, meio e lado direito. Isso mostra se há desnível. Até meio centímetro é aceitável; acima disso, corrige-se no gesso ou, em último caso, na bainha, nunca com costura enviesada.'],
      ['Cortina pode ficar na altura da janela?',
       'Cortina de tecido não. Ela vai até o chão; proporcional à janela é papel da persiana. A única exceção é janela com bancada ou pia embaixo, em que a cortina termina um pouco abaixo da bancada.'],
      ['Tem ar-condicionado acima da janela. E agora?',
       'O ideal é a parte de cima da janela ficar livre. Se o aparelho está lá, é preciso no mínimo 30 cm livres para o suporte e o varão. Sem esse espaço, a alternativa é trilho no teto.'],
    ],
  },
];

function build(post) {
  const url = `${BASE}/blog/${post.slug}/`;
  const faqHtml = post.faq.map(([q, a]) => `        <details><summary>${q}</summary><div>${a}</div></details>`).join('\n');
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${BASE}/#org`, name: 'ShineCortinas', url: BASE, logo: `${BASE}/logo-shine.avif`,
        sameAs: ['https://www.instagram.com/shinecortinas/', 'https://www.facebook.com/shinecortinas', 'https://www.tiktok.com/@shinecortinas', 'https://www.youtube.com/@shinecortinas', 'https://www.pinterest.com/shinecortinas'] },
      { '@type': 'Person', '@id': `${BASE}/#isani`, name: 'Isani Oliveira', jobTitle: 'Fundador e especialista em cortinas e persianas sob medida', description: 'Fundador da ShineCortinas, à frente da empresa desde 2009. Designer de interiores por formação prática, projeta cortinas e persianas sob medida para residências do Sul Fluminense.', url: `${BASE}/sobre/`, image: `${BASE}/isani-consultoria.avif`, worksFor: { '@id': `${BASE}/#org` } },
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
  <meta property="og:image" content="${BASE}${post.ogImage || '/blackouts-tecnicos.avif'}">
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
      <p class="sl-postmeta"><span>Por <a href="/sobre/">Isani Oliveira</a>, fundador da ShineCortinas e especialista em cortinas sob medida</span><span>Atualizado em ${post.modified.split('-').reverse().join('/')}</span></p>
    </div></div>
  </section>
${cityChip(null)}
  <main>
    <article class="sl-section"><div class="sl-wrap">
      <div class="sl-article">
        <p class="sl-lead">${post.lead}</p>
${post.body.trim()}
        <div class="sl-cta-inline">
          <h3>${post.cta?.h3 || 'Não sabe qual forro o seu ambiente pede?'}</h3>
          <p>${post.cta?.p || 'O consultor vai até a sua casa com o mostruário e mostra a diferença na luz do seu próprio cômodo. Gratuito e sem compromisso.'}</p>
          <a class="sl-btn" data-wa="estimativa" href="${WA}" target="_blank" rel="noopener noreferrer">Falar com um consultor →</a>
        </div>
      </div>
    </div></article>

    <section class="sl-section"><div class="sl-wrap">
      <div class="sl-center" style="margin-bottom:28px">
        <p class="sl-kicker sl-kicker--center">Dúvidas frequentes</p>
        <h2 class="sl-h2">Perguntas sobre <em>${post.faqEm || 'forro de cortina'}</em></h2>
      </div>
      <div class="sl-faq">
${faqHtml}
      </div>
    </div></section>

    <section class="sl-band"><div class="sl-wrap sl-center">
      <p class="sl-kicker sl-kicker--center">Consultoria em domicílio · Sul Fluminense</p>
      <h2 class="sl-h2">${post.bandH2 || 'Veja os tecidos e os forros <em>na sua casa</em>'}</h2>
      <p class="sl-sub" style="margin:0 auto 26px">A consultoria é gratuita, vai até você e não obriga a decidir nada na hora.</p>
      <a class="sl-btn" data-wa="agendar" href="${WA}" target="_blank" rel="noopener noreferrer">Agendar consultoria em casa →</a>
      <p class="sl-note">Gratuita · Sem compromisso · (24) 99329-8763</p>
    </div></section>

    <section class="sl-section sl-section--tight"><div class="sl-wrap">
      <p class="sl-label">Continue no site</p>
      <div class="sl-links">
${(post.related || [['/blog/o-que-e-blackout/', 'O que é blackout'], ['/cortinas/', 'Cortinas sob medida'], ['/persianas/', 'Persianas técnicas'], ['/blackout-e-forros/', 'Blackout e forros']]).map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}
        <a href="/blog/">Todos os artigos</a><a href="/portfolio/">Projetos reais</a><a href="/metodo/">Como funciona</a><a href="/cidades-atendidas/">Cidades atendidas</a>
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
