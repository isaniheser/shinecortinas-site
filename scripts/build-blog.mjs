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
    layout: 'editorial',
    title: 'Qual a altura ideal da cortina? Do chão ao teto',
    seoTitle: 'Altura Ideal da Cortina: do Chão, do Teto e da Janela | ShineCortinas',
    description: 'Cortina de tecido vai até o chão. As três alturas de barra (1 cm do chão, beijando o chão, efeito poodle), a regra de dividir o vão para fixar o varão, teto e cortineiro, e a medição em três pontos. Por Isani Oliveira.',
    kicker: 'Medidas e instalação',
    published: '2026-02-19',
    modified: TODAY,
    ogImage: '/hall-wave-volta-redonda.avif',
    faqEm: 'altura de cortina',
    tocNote: 'A medida certa começa com o olhar para o ambiente.',
    related: [['/blog/bainha-de-cortina/', 'Bainha de cortina'], ['/blog/varao-para-cortina/', 'Varão para cortina'], ['/blog/tipos-de-forro-para-cortina/', 'Tipos de forro'], ['/trilhos-e-acionamentos/', 'Trilhos e acionamentos'], ['/cortinas/', 'Cortinas sob medida'], ['/videos/ajuste-bainha-em-casa-alfaiataria/', 'Vídeo: ajuste de bainha em casa']],
    hero: {
      eyebrow: 'O olhar de quem instala',
      h1: 'Qual a altura<br>ideal da cortina?', h1em: 'Do chão ao teto.',
      lead: '<p><strong>Cortina de tecido vai até o chão.</strong> A barra pode terminar de três jeitos: a <strong>1 cm do chão</strong>, <strong>beijando o chão</strong> (o pé de bailarina) ou com o tecido <strong>sobrando no piso</strong> (efeito poodle). A escolha depende do ambiente, do uso e da luz.</p><p>Em cima, com varão na parede, eu divido ao meio o espaço entre a janela e o teto. Com cortineiro, o trilho vai dentro dele. E na hora de anotar a medida, largura primeiro, altura depois. Abaixo eu explico cada ponto, com desenho.</p>',
      readTo: 'chao', readText: 'Veja os três acabamentos',
      photo: '/hall-wave-volta-redonda.avif', photoAlt: 'Cortina wave off-white em hall com pé-direito duplo, projeto ShineCortinas em Volta Redonda',
      photoTag: 'Projeto ShineCortinas', photoCaption: 'Hall com pé-direito duplo · Volta Redonda · cortina wave em tecido de 170 g/m²',
    },
    sections: [
      { id: 'chao', toc: 'Os três acabamentos', h2: 'Quanto a cortina fica do chão?', html: `
            <p>Antes de falar de centímetro, uma coisa que eu repito em toda consultoria: cortina de tecido não se faz na altura da janela. Ela desce até o piso. A decisão de verdade é como a barra encontra o chão, e existem três jeitos:</p>
            <figure class="sl-ed-fig">
              <div class="sl-ed-figtop"><span class="sl-ed-eyebrow">Desenho 01</span><span>O encontro com o piso</span></div>
              <div class="sl-ed-hems">
                <div class="sl-ed-hem"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 230" role="img" aria-label="Barra a um centímetro do piso"><defs><marker id="arrow-barra-a-um-centimetro-do-piso" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse"><path d="M0 0L6 3L0 6" fill="#9b713a"/></marker></defs><path d="M12 202H248" stroke="#16302a" stroke-width="2"/><path d="M12 208H248" stroke="#ded8ca"/><path d="M45 25H205V180Q195 185 185 180T145 180T105 180T65 180Q55 185 45 180Z" fill="#e2d6c0" stroke="#9c8c72" stroke-width="1.5"/><path d="M65 25V180" stroke="#b9aa91" stroke-width="1.4"/><path d="M85 25V180" stroke="#b9aa91" stroke-width="1.4"/><path d="M105 25V180" stroke="#b9aa91" stroke-width="1.4"/><path d="M125 25V180" stroke="#b9aa91" stroke-width="1.4"/><path d="M145 25V180" stroke="#b9aa91" stroke-width="1.4"/><path d="M165 25V180" stroke="#b9aa91" stroke-width="1.4"/><path d="M185 25V180" stroke="#b9aa91" stroke-width="1.4"/><path d="M214 182H235M214 201H235M227 182V201" stroke="#9b713a"/><text x="135" y="222" fill="#16302a" text-anchor="middle" font-size="15">folga de 1 cm</text></svg><span class="sl-ed-hemnum">01</span><h4>1 cm do chão</h4><p>A barra fica a 1 cm do piso. É a mais comum nas casas.</p></div>
                <div class="sl-ed-hem"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 230" role="img" aria-label="Barra tocando suavemente o piso"><defs><marker id="arrow-barra-tocando-suavemente-o-piso" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse"><path d="M0 0L6 3L0 6" fill="#9b713a"/></marker></defs><path d="M12 202H248" stroke="#16302a" stroke-width="2"/><path d="M12 208H248" stroke="#ded8ca"/><path d="M45 25H205V201Q195 206 185 201T145 201T105 201T65 201Q55 206 45 201Z" fill="#e2d6c0" stroke="#9c8c72" stroke-width="1.5"/><path d="M65 25V201" stroke="#b9aa91" stroke-width="1.4"/><path d="M85 25V201" stroke="#b9aa91" stroke-width="1.4"/><path d="M105 25V201" stroke="#b9aa91" stroke-width="1.4"/><path d="M125 25V201" stroke="#b9aa91" stroke-width="1.4"/><path d="M145 25V201" stroke="#b9aa91" stroke-width="1.4"/><path d="M165 25V201" stroke="#b9aa91" stroke-width="1.4"/><path d="M185 25V201" stroke="#b9aa91" stroke-width="1.4"/></svg><span class="sl-ed-hemnum">02</span><h4>Beijando o chão</h4><p>O pé de bailarina: a barra encosta de leve, sem sobra.</p></div>
                <div class="sl-ed-hem"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 230" role="img" aria-label="Sobra de tecido apoiada no piso"><defs><marker id="arrow-sobra-de-tecido-apoiada-no-piso" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse"><path d="M0 0L6 3L0 6" fill="#9b713a"/></marker></defs><path d="M12 202H248" stroke="#16302a" stroke-width="2"/><path d="M12 208H248" stroke="#ded8ca"/><path d="M45 25H205V190Q205 202 220 207Q240 216 212 220L42 220Q19 214 35 207Q45 201 45 188Z" fill="#e2d6c0" stroke="#9c8c72" stroke-width="1.5"/><path d="M65 25V190Q65 205 58 214" fill="none" stroke="#b9aa91" stroke-width="1.4"/><path d="M85 25V190Q85 205 78 214" fill="none" stroke="#b9aa91" stroke-width="1.4"/><path d="M105 25V190Q105 205 98 214" fill="none" stroke="#b9aa91" stroke-width="1.4"/><path d="M125 25V190Q125 205 118 214" fill="none" stroke="#b9aa91" stroke-width="1.4"/><path d="M145 25V190Q145 205 138 214" fill="none" stroke="#b9aa91" stroke-width="1.4"/><path d="M165 25V190Q165 205 158 214" fill="none" stroke="#b9aa91" stroke-width="1.4"/><path d="M185 25V190Q185 205 178 214" fill="none" stroke="#b9aa91" stroke-width="1.4"/></svg><span class="sl-ed-hemnum">03</span><h4>Efeito poodle</h4><p>O estilo europeu: o tecido sobra e se acomoda no chão, de propósito.</p></div>
              </div>
              <figcaption>Três acabamentos possíveis. Esquemas sem escala; a escolha depende do ambiente e do caimento desejado.</figcaption>
            </figure>
            <p><strong>1 cm do chão.</strong> Uma folga pequena entre a barra e o piso. É a medida que vai anotada para a confecção, e a mais comum nas casas.</p>
            <p><strong>Beijando o chão.</strong> Eu chamo de pé de bailarina. A barra encosta de leve no piso, sem sobra. Pede o ambiente nivelado, senão um lado encosta antes do outro.</p>
            <p><strong>Efeito poodle.</strong> O estilo europeu: o tecido ultrapassa o piso e se acomoda no chão. A sobra é de propósito, faz parte do projeto. Não é cortina que ficou comprida por engano.</p>
            <p>Qual dos três? Não existe resposta única para toda casa. Depende do ambiente e do seu gosto, e é para isso que serve o olho de quem instala: olhar o cômodo e dizer qual vai ficar melhor ali. Mas tem uma regra de que eu não abro mão, e ela está na próxima seção.</p>
            <div class="sl-aside"><strong>Leia também</strong><p>A bainha é o que define esses três acabamentos. No artigo sobre <a href="/blog/bainha-de-cortina/">bainha de cortina</a> eu explico como ela é feita e por que a costura tem que ser reta.</p></div>` },

      { id: 'quarto', toc: 'O piso e a luz no quarto', h2: 'No quarto, o piso decide a altura', html: `
            <p class="sl-ed-scenario">Piso que reflete pede cortina beijando o chão.</p>
            <p>Hoje muita casa tem porcelanato polido, que funciona como espelho. Imagine um quarto com esse piso e a cortina a 1 cm do chão. De manhã, a claridade entra por aquela fresta, bate no piso e é jogada para cima. Você acorda com luz no teto.</p>
            <p>Nesse quarto, a barra tem que encostar no chão para bloquear essa claridade. Na sala, o efeito visual e o gosto pesam mais. No quarto, eu acrescento uma pergunta à escolha: como essa cortina vai se comportar quando o sol nascer?</p>
            <p>Encostar no chão não transforma o quarto em escuro total. Isso é trabalho do forro. Veja a diferença entre <a href="/blog/tipos-de-forro-para-cortina/">forro translúcido e blackout</a>.</p>` },

      { id: 'janela', toc: 'Janela pequena e bancada', h2: 'Janela pequena, bancada e pia', html: `
            <p>Janela pequena recebe cortina longa, até o chão. Imagina desperdiçar um tecido bonito cortando ele pela metade, "proporcional à janela". Para cobrir só a janela existe a <a href="/persianas/">persiana</a>, que é feita para o vão.</p>
            <p>A única exceção é a janela com <strong>bancada ou pia</strong> embaixo. Aí a cortina pode terminar um pouco abaixo da bancada, proporcional, porque não tem como descer até o piso. Fora isso, cortina de tecido vai até o chão. Sempre.</p>` },

      { id: 'varao', toc: 'Altura do varão', h2: 'Onde fixar o varão acima da janela', html: `
            <p>Existem dois tipos de fixação. <strong>Na parede</strong>, com suportes que seguram o tubo, que é o varão. E <strong>no teto</strong>, com trilho ou varão. Vou começar pela parede, que é a dúvida que mais chega.</p>
            <p>O objetivo é não deixar exposto o espaço entre a <strong>verga</strong>, que é o topo da janela ou da porta, e o teto. Mas sem criar uma testeira enorme que atrapalhe a arquitetura da casa. A regra que eu uso é dividir esse espaço ao meio:</p>
            <div class="sl-ed-table"><table>
              <thead><tr><th>Distância da verga ao teto ou à sanca</th><th>Onde fica o varão</th></tr></thead>
              <tbody>
                <tr><td>50 cm</td><td>No meio: 25 cm acima da janela</td></tr>
                <tr><td>1 m</td><td>No meio: 50 cm acima da janela</td></tr>
                <tr><td>20 a 30 cm</td><td>Rente ao teto, deixando pelo menos 10 a 15 cm acima da verga</td></tr>
              </tbody>
            </table></div>
            <figure class="sl-ed-fig">
              <div class="sl-ed-figtop"><span class="sl-ed-eyebrow">Desenho 02</span><span>Como dividir o espaço superior</span></div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 470 255" role="img" aria-label="Varão no meio de um espaço de cinquenta centímetros"><defs><marker id="arrow-varao-no-meio-de-um-espaco-de-cinquenta-centimetros" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse"><path d="M0 0L6 3L0 6" fill="#9b713a"/></marker></defs><rect x="60" y="120" width="260" height="90" fill="#f1f3ef" stroke="#a4b1a6"/><path d="M190 120V210" stroke="#a4b1a6"/><path d="M24 20H336" stroke="#16302a" stroke-width="3"/><text x="30" y="44" fill="#16302a" font-size="14">Teto ou sanca</text><path d="M40 70H330" stroke="#9b713a" stroke-width="5"/><circle cx="40" cy="70" r="6" fill="#9b713a"/><circle cx="330" cy="70" r="6" fill="#9b713a"/><text x="190" y="98" text-anchor="middle" fill="#16302a" font-size="14">Varão</text><path d="M340 120H382M340 20H382M374 20V120" stroke="#9b713a"/><text x="389" y="76" fill="#16302a" font-size="17">50 cm</text><path d="M17 70H32M17 120H50M24 70V120" stroke="#9b713a"/><text x="16" y="168" fill="#16302a" font-size="14">25 cm</text><path d="M29 146V124" stroke="#9b713a"/><text x="190" y="232" text-anchor="middle" fill="#16302a" font-size="15">Parte superior do vão · verga</text></svg>
              <figcaption>Varão na parede: com 50 cm entre a verga e o teto, o varão fica no meio, a 25 cm. Esquema sem escala.</figcaption>
            </figure>
            <p>Quando a janela já está quase encostada no teto, não tem o que dividir: o varão vai <strong>rente ao teto</strong>, com pelo menos uns 10 a 15 cm acima da verga, para a cortina cobrir bem a parte de cima e não passar luz por ali.</p>
            <p>O que eu nunca faço é subir o varão além do meio para "alongar" o ambiente. Imagina o tubo lá em cima com um metro de parede nua até a janela. Fica horrível. Defina a posição do varão antes de fechar a altura de confecção: mudar o varão de lugar depois muda a relação da barra com o chão.</p>
            <div class="sl-aside"><strong>Leia também</strong><p>Tubo, suporte, ponteira: no artigo sobre <a href="/blog/varao-para-cortina/">varão para cortina</a> eu mostro o que muda de um varão para outro e como escolher.</p></div>` },

      { id: 'teto', toc: 'Teto e cortineiro', h2: 'Fixação no teto e no cortineiro', html: `
            <p>No teto, a fixação pode ser feita direto na <strong>laje</strong>, no <strong>forro de gesso</strong> ou dentro do <strong>cortineiro</strong>. As três funcionam, desde que a fixação seja bem feita. Gesso aguenta cortina, sim, quando a bucha e o parafuso são os certos.</p>
            <p>Quando a casa tem cortineiro, a instalação vai <strong>dentro do cortineiro</strong>, ou numa <strong>sanca de gesso invertida</strong>. O trilho some e o tecido parece nascer do teto. É o acabamento mais limpo que existe.</p>
            <p>E uma coisa que eu nunca faço, nunca mesmo: <strong>varão de ilhós com suporte dentro de cortineiro</strong>. O cortineiro foi feito para receber trilho. Varão lá dentro estraga o acabamento e o funcionamento da cortina.</p>
            <p>Na medição, o ponto de partida é o plano onde o sistema vai ser fixado de fato: se o trilho vai dentro do cortineiro, é dali que se mede.</p>` },

      { id: 'medir', toc: 'Como medir', h2: 'Como eu meço: três pontos, da esquerda para a direita', html: `
            <p>Quando a instalação vai no teto ou no cortineiro, eu meço a altura em <strong>três pontos, sempre da esquerda para a direita</strong>: lado esquerdo, meio e lado direito, do teto ao chão.</p>
            <figure class="sl-ed-fig">
              <div class="sl-ed-figtop"><span class="sl-ed-eyebrow">Desenho 03</span><span>Uma altura, três conferências</span></div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 350" role="img" aria-label="Medição do teto ao piso à esquerda, ao centro e à direita"><defs><marker id="arrow-medicao-do-teto-ao-piso-a-esquerda-ao-centro-e-a-direita" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse"><path d="M0 0L6 3L0 6" fill="#9b713a"/></marker></defs><path d="M30 40H570M30 265H570" stroke="#16302a" stroke-width="3"/><text x="300" y="23" text-anchor="middle" fill="#16302a" font-size="16">Plano de instalação do trilho</text><text x="300" y="293" text-anchor="middle" fill="#16302a" font-size="16">Piso</text><rect x="175" y="95" width="250" height="115" fill="#eef1ec" stroke="#bac6bc"/><path d="M300 95V210" stroke="#bac6bc"/><path d="M90 52V252" stroke="#9b713a" stroke-width="2"/><path d="M85 61L90 51L95 61M85 243L90 253L95 243" fill="none" stroke="#9b713a" stroke-width="2"/><circle cx="90" cy="151" r="18" fill="#16302a"/><text x="90" y="157" text-anchor="middle" fill="white" font-size="17">1</text><text x="90" y="329" text-anchor="middle" fill="#16302a" font-size="16">Esquerda</text><path d="M300 52V252" stroke="#9b713a" stroke-width="2"/><path d="M295 61L300 51L305 61M295 243L300 253L305 243" fill="none" stroke="#9b713a" stroke-width="2"/><circle cx="300" cy="151" r="18" fill="#16302a"/><text x="300" y="157" text-anchor="middle" fill="white" font-size="17">2</text><text x="300" y="329" text-anchor="middle" fill="#16302a" font-size="16">Centro</text><path d="M510 52V252" stroke="#9b713a" stroke-width="2"/><path d="M505 61L510 51L515 61M505 243L510 253L515 243" fill="none" stroke="#9b713a" stroke-width="2"/><circle cx="510" cy="151" r="18" fill="#16302a"/><text x="510" y="157" text-anchor="middle" fill="white" font-size="17">3</text><text x="510" y="329" text-anchor="middle" fill="#16302a" font-size="16">Direita</text></svg>
              <figcaption>Anote os três valores separadamente. Se eles diferem, o ambiente tem desnível.</figcaption>
            </figure>
            <ol>
              <li><strong>Defina onde vai a fixação.</strong> Teto, cortineiro ou parede: é dali que se mede.</li>
              <li><strong>Meça à esquerda</strong>, do plano de fixação ao piso.</li>
              <li><strong>Repita no meio</strong>, com a mesma referência.</li>
              <li><strong>Meça à direita</strong> e anote o terceiro valor separado.</li>
              <li><strong>Compare os três.</strong> Se houver diferença, é o ambiente que está desnivelado, e isso se resolve antes da confecção.</li>
            </ol>
            <p>O correto é não ter desnível. <strong>Até meio centímetro eu aceito.</strong> Quando chega a dois, três centímetros, e isso já aconteceu comigo, o caminho certo é chamar o gesseiro e fazer um enchimento na parte de cima. Em último caso, a gente ajusta a bainha no local.</p>
            <p>O que não se faz de jeito nenhum é costurar a bainha torta, na diagonal, para "compensar" o desnível. Isso danifica a trama do tecido, e com o tempo a cortina vai ficando desengonçada, com aqueles vincos que eu chamo de "caminho de rato". Se você já viu uma cortina torta na casa de alguém, quase sempre foi isso. Cortina se costura em linha reta, no fio do tecido.</p>` },

      { id: 'largura-altura', toc: 'Largura × altura', h2: 'O que vem primeiro: largura ou altura?', html: `
            <p><strong>Largura primeiro, altura depois.</strong> Sempre. Anote largura × altura, na mesma ordem da geometria, base vezes altura. Anotar ao contrário é uma das causas mais comuns de cortina que chega errada.</p>
            <p>Exemplo só de anotação: 3,00 m de largura × 2,60 m de altura. Escreva o nome de cada medida e a unidade, e diga o que foi medido: a janela, o vão de instalação ou a cortina pronta. A distância do teto ao piso não é, sozinha, a altura de confecção: o acabamento da barra e o sistema escolhido entram nessa conta.</p>` },

      { id: 'laterais', toc: 'Espaço nas laterais', h2: 'Quanto o varão passa para cada lado da janela', html: `
            <p>Com varão na parede, o varão precisa passar de cada lado da janela <strong>o suficiente para acolher o pano da cortina recolhida</strong>. Ou seja: com a cortina aberta, todo o vidro tem que ficar livre.</p>
            <p>Não existe um número fixo. Passar 20 centímetros de cada lado pode não ser o suficiente, porque isso depende do volume de tecido. Uma cortina com mais onda ou mais prega pede mais espaço na lateral. O erro clássico é passar pouco e, com a cortina aberta, o tecido ainda cobrir um pedaço da janela.</p>` },

      { id: 'ar-condicionado', toc: 'Ar-condicionado', h2: 'E quando há ar-condicionado acima da janela?', html: `
            <p>O correto é a parte de cima da janela ficar <strong>livre</strong> para receber a cortina ou a persiana. Ar-condicionado não deveria ficar ali. Quando ele já está, ou quando tem outro obstáculo, eu preciso de <strong>no mínimo 30 centímetros livres</strong> para acomodar o suporte e o varão. Se esse espaço não existe, a solução passa a ser trilho no teto.</p>` },

      { id: 'antes-de-comprar', toc: 'Antes de comprar', h2: 'O que conferir antes de comprar ou mandar confeccionar', html: `
            <p>Os erros de medida quase sempre começam quando uma decisão é tomada sozinha. Antes de fechar, confira o conjunto:</p>
            <ul>
              <li>O trilho ou o varão já tem lugar definido?</li>
              <li>A barra vai ficar a 1 cm, beijando o chão ou com sobra no piso?</li>
              <li>A altura foi medida à esquerda, no meio e à direita?</li>
              <li>O espaço nas laterais comporta o tecido recolhido?</li>
              <li>Bancada, pia, cabeceira e ar-condicionado foram considerados?</li>
              <li>A anotação diz largura × altura, com unidade e o que foi medido?</li>
            </ul>` },

      { id: 'perguntas', toc: 'Perguntas frequentes', h2: 'Perguntas frequentes sobre altura de cortina', faq: true, html: `
            <p>As perguntas abaixo são as que mais chegam pelo Google e pelo WhatsApp. Respostas curtas, do jeito que eu respondo na consultoria.</p>` },

      { id: 'consultoria', toc: 'Consultoria em casa', label: 'Converse com a Shine', closing: true, h2: 'Acerte a medida no seu ambiente',
        html: `<p>A distância da barra ao piso, a posição do varão e o espaço para recolher o tecido precisam funcionar juntos. Na consultoria em domicílio, eu ou alguém da equipe mede a laser nos três pontos e decide com você o acabamento, com o tecido na mão, no seu cômodo.</p><p>Atendemos Volta Redonda, Resende, Barra Mansa e todo o Sul Fluminense. Gratuito e sem compromisso.</p>`,
        cta: 'Agendar consultoria em casa →', img: '/isani-consultoria-800.avif', imgAlt: 'Isani Oliveira em consultoria, conferindo o caimento de uma cortina de linho' },
    ],
    faq: [
      ['Qual a altura da cortina no chão?',
       'A cortina de tecido vai até o chão. A barra pode terminar de três formas: a 1 cm do chão, beijando o chão (encostando de leve) ou com o tecido sobrando no piso (efeito poodle). Em piso polido que reflete a luz, a indicação é beijar o chão, para a claridade não entrar por baixo.'],
      ['Qual a altura ideal para cortina de sala e de quarto?',
       'Nos dois, até o chão. Na sala, a barra é escolhida pelo efeito desejado; no quarto, o piso polido costuma pedir a barra beijando o chão, porque o reflexo do piso joga a claridade para cima de manhã.'],
      ['Qual a altura da cortina acima da janela?',
       'Com varão fixado na parede, divida ao meio o espaço entre o topo da janela (a verga) e o teto. Com 50 cm de vão, o varão fica 25 cm acima da janela; com 1 m, fica a 50 cm. Se sobram só 20 ou 30 cm, o varão vai rente ao teto, com pelo menos 10 a 15 cm acima da verga.'],
      ['Qual a altura certa para colocar o varão de cortina?',
       'A mesma regra: no meio do espaço entre a verga e o teto. Nunca suba o varão além disso deixando um metro de parede nua até a janela.'],
      ['O que vem primeiro na medida da cortina, altura ou largura?',
       'Largura primeiro, altura depois. Anote sempre largura × altura, com a unidade e o que foi medido. Anotar ao contrário é uma causa comum de cortina confeccionada errada.'],
      ['Como medir a altura da cortina?',
       'Do plano de fixação ao chão, em três pontos, da esquerda para a direita: lado esquerdo, meio e lado direito. Isso mostra se há desnível. Até meio centímetro é aceitável; acima disso, corrige-se no gesso ou, em último caso, na bainha, nunca com costura enviesada.'],
      ['Cortina pode ficar na altura da janela?',
       'Cortina de tecido não. Ela vai até o chão; proporcional à janela é papel da persiana. A única exceção é janela com bancada ou pia embaixo, em que a cortina termina um pouco abaixo da bancada.'],
      ['Tem ar-condicionado acima da janela. E agora?',
       'O ideal é a parte de cima da janela ficar livre. Se o aparelho está lá, é preciso no mínimo 30 cm livres para o suporte e o varão. Sem esse espaço, a alternativa é trilho no teto.'],
    ],
  },
  {
    slug: 'bainha-de-cortina',
    layout: 'editorial',
    title: 'Bainha de cortina: o tamanho da barra, a dobra e o ajuste',
    seoTitle: 'Bainha de Cortina: Tamanho da Barra, Bainha Dupla e Ajuste em Casa | ShineCortinas',
    description: 'Bainha é a costura; barra é o resultado. O tamanho da barra é proporcional ao pé-direito (15, 20 a 25, 30 cm), a bainha dupla é para tecido leve, e a costura tem que ser reta, no fio. Por Isani Oliveira.',
    kicker: 'Medidas e instalação',
    published: '2026-02-19',
    modified: TODAY,
    ogImage: '/isani-consultoria.avif',
    faqEm: 'bainha de cortina',
    tocNote: 'A bainha é a parte da cortina que a gente mais olha e menos entende.',
    related: [['/blog/altura-ideal-da-cortina/', 'Altura ideal da cortina'], ['/blog/varao-para-cortina/', 'Varão para cortina'], ['/blog/tipos-de-forro-para-cortina/', 'Tipos de forro'], ['/cortinas/', 'Cortinas sob medida'], ['/cortina-wave/', 'Cortina wave'], ['/videos/ajuste-bainha-em-casa-alfaiataria/', 'Vídeo: ajuste de bainha em casa']],
    hero: {
      eyebrow: 'O olhar de quem instala',
      h1: 'Bainha de cortina:', h1em: 'a costura que faz a barra.',
      lead: '<p><strong>A bainha é a dobra costurada na parte de baixo da cortina.</strong> É ela que faz a barra, e é ela que decide se a cortina termina a 1 cm do chão, beijando o chão ou com sobra. Muita gente diz "tamanho da bainha", mas o nome certo do que se vê é <strong>barra</strong>. O tamanho da barra não é fixo: é <strong>proporcional ao pé-direito</strong>. Em teto baixo, uns 15 cm; entre 2,50 e 2,70 m, 20 a 25 cm; perto de 3 m, 30 cm.</p><p>Tecido leve pede <strong>bainha dupla</strong>, para dar corpo. Tecido mais pesado fica bem com bainha simples. E a costura tem que ser reta, no fio do tecido, senão a cortina entorta com o tempo. Quando o pé-direito é alto, a nossa alfaiataria vai até a casa e ajusta a bainha no lugar.</p>',
      readTo: 'tamanho', readText: 'Veja a tabela de tamanho da barra',
      photo: '/isani-consultoria.avif', photoAlt: 'Isani Oliveira conferindo o caimento e a barra de uma cortina de linho durante uma consultoria',
      photoTag: 'Consultoria ShineCortinas', photoCaption: 'Isani conferindo o caimento e a barra de uma cortina de linho, com a equipe ao fundo',
    },
    sections: [
      { id: 'o-que-e', toc: 'Bainha e barra', h2: 'Bainha e barra não são a mesma coisa', html: `
            <p>Bainha é a dobra costurada na parte de baixo do tecido. Barra é o que você vê: a faixa final da cortina, do vinco da dobra até o chão. Uma é a costura, a outra é o resultado. Por isso, quando alguém me pergunta "qual o tamanho da bainha", a pergunta certa é <strong>qual o tamanho da barra</strong>. Quando a bainha é bem feita, a barra cai reta, pesa certo e para no lugar combinado.</p>
            <p>É a bainha que entrega os três acabamentos de que eu falo no artigo sobre <a href="/blog/altura-ideal-da-cortina/">altura ideal da cortina</a>: a barra a 1 cm do chão, a barra beijando o chão e o efeito poodle, com o tecido sobrando no piso. A altura é a decisão; a bainha é quem executa.</p>
            <div class="sl-aside"><strong>Leia também</strong><p>Antes de decidir a bainha, decida onde a cortina termina. No artigo sobre <a href="/blog/altura-ideal-da-cortina/">altura ideal da cortina</a> eu explico as três alturas, a regra do varão e como medir em três pontos.</p></div>` },

      { id: 'tamanho', toc: 'Tamanho da barra', h2: 'Tamanho da barra: proporcional ao pé-direito', html: `
            <p>A pergunta que mais chega é "qual o tamanho da bainha?", e o que a pessoa quer saber é o tamanho da barra. Não existe um número único. A barra tem que ser <strong>proporcional à altura do ambiente</strong>. Imagina uma cortina de 2,30 m de altura com uma barra de 30 cm: o teto fica achatado, esquisito. A mesma barra de 30 cm, num pé-direito de 3 m, fica bonita.</p>
            <div class="sl-ed-table"><table>
              <thead><tr><th>Pé-direito</th><th>Barra que eu uso</th></tr></thead>
              <tbody>
                <tr><td>Baixo, por volta de 2,30 m</td><td>Cerca de 15 cm</td></tr>
                <tr><td>2,50 a 2,70 m, o mais comum</td><td>20 a 25 cm</td></tr>
                <tr><td>2,90 a 3,00 m</td><td>30 cm</td></tr>
                <tr><td>Pé-direito duplo, 5 a 6 m</td><td>40 a 50 cm de barra com acabamento</td></tr>
              </tbody>
            </table></div>
            <figure class="sl-ed-fig">
              <div class="sl-ed-figtop"><span class="sl-ed-eyebrow">Desenho 01</span><span>A barra acompanha o pé-direito</span></div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 260" role="img" aria-label="Três pés-direitos diferentes com barras proporcionais: 15, 20 a 25 e 30 centímetros">
<g font-family="Montserrat,Arial,sans-serif" fill="#3f4740">
<!-- ambiente 1: pé-direito baixo -->
<path d="M40 96H190" stroke="#16302a" stroke-width="2"/><path d="M40 230H190" stroke="#16302a" stroke-width="2"/>
<path d="M60 100H170V228H60Z" fill="#e2d6c0" stroke="#9c8c72" stroke-width="1.5"/>
<g stroke="#c9b894" stroke-width="1"><path d="M78 102V226"/><path d="M96 102V226"/><path d="M114 102V226"/><path d="M132 102V226"/><path d="M150 102V226"/></g>
<rect x="60" y="216" width="110" height="12" fill="#c9b48a" stroke="#9c8c72" stroke-width="1.5"/>
<text x="115" y="88" font-size="11" text-anchor="middle" fill="#6d6e61">pé-direito 2,30 m</text>
<text x="115" y="248" font-size="12" text-anchor="middle" font-weight="600" fill="#9b713a">barra ~15 cm</text>
<!-- ambiente 2 -->
<path d="M245 60H395" stroke="#16302a" stroke-width="2"/><path d="M245 230H395" stroke="#16302a" stroke-width="2"/>
<path d="M265 64H375V228H265Z" fill="#e2d6c0" stroke="#9c8c72" stroke-width="1.5"/>
<g stroke="#c9b894" stroke-width="1"><path d="M283 66V226"/><path d="M301 66V226"/><path d="M319 66V226"/><path d="M337 66V226"/><path d="M355 66V226"/></g>
<rect x="265" y="209" width="110" height="19" fill="#c9b48a" stroke="#9c8c72" stroke-width="1.5"/>
<text x="320" y="52" font-size="11" text-anchor="middle" fill="#6d6e61">pé-direito 2,50 a 2,70 m</text>
<text x="320" y="248" font-size="12" text-anchor="middle" font-weight="600" fill="#9b713a">barra 20 a 25 cm</text>
<!-- ambiente 3 -->
<path d="M450 30H600" stroke="#16302a" stroke-width="2"/><path d="M450 230H600" stroke="#16302a" stroke-width="2"/>
<path d="M470 34H580V228H470Z" fill="#e2d6c0" stroke="#9c8c72" stroke-width="1.5"/>
<g stroke="#c9b894" stroke-width="1"><path d="M488 36V226"/><path d="M506 36V226"/><path d="M524 36V226"/><path d="M542 36V226"/><path d="M560 36V226"/></g>
<rect x="470" y="204" width="110" height="24" fill="#c9b48a" stroke="#9c8c72" stroke-width="1.5"/>
<text x="525" y="22" font-size="11" text-anchor="middle" fill="#6d6e61">pé-direito 2,90 a 3,00 m</text>
<text x="525" y="248" font-size="12" text-anchor="middle" font-weight="600" fill="#9b713a">barra 30 cm</text>
</g>
</svg>
              <figcaption>Quanto mais alto o ambiente, maior a barra. Esquema sem escala.</figcaption>
            </figure>
            <p>No pé-direito duplo, como num hall de entrada de 5 ou 6 metros, uma barra de 40 a 50 cm com acabamento é o que dá imponência ao tecido. É elegante, e valoriza a arquitetura em vez de disputar com ela.</p>` },

      { id: 'dupla', toc: 'Bainha dupla ou simples', h2: 'Bainha dupla ou simples: a gramatura decide', html: `
            <p>Gramatura é o peso do tecido por metro quadrado. Tecido leve, como o voil, tem gramatura <strong>abaixo de 150 g/m²</strong>. Nesses, eu faço <strong>bainha dupla</strong>: o tecido dobra duas vezes, e essa segunda dobra é que dá corpo à barra. Sem ela, a barra do voil fica mole e não cai reta.</p>
            <p>Tecido mais pesado, de <strong>170, 180 ou 200 g/m²</strong>, não precisa. A própria dobra já dá o efeito encorpado. Bainha dupla ali só acrescenta volume onde não faz falta.</p>
            <figure class="sl-ed-fig">
              <div class="sl-ed-figtop"><span class="sl-ed-eyebrow">Desenho 02</span><span>Uma dobra ou duas</span></div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 220" role="img" aria-label="Corte da bainha simples, com uma dobra, e da bainha dupla, com duas dobras">
<g font-family="Montserrat,Arial,sans-serif">
<!-- simples -->
<text x="160" y="28" font-size="12" text-anchor="middle" font-weight="600" fill="#16302a">Bainha simples</text>
<text x="160" y="46" font-size="11" text-anchor="middle" fill="#6d6e61">tecido de 170 a 200 g/m²</text>
<path d="M150 60V170Q150 182 162 182Q174 182 174 170V120" fill="none" stroke="#9c8c72" stroke-width="6" stroke-linecap="round"/>
<path d="M150 60V170Q150 182 162 182Q174 182 174 170V120" fill="none" stroke="#e2d6c0" stroke-width="3" stroke-linecap="round"/>
<path d="M196 120V182" stroke="#9b713a" stroke-width="1.2"/><path d="M191 120H201M191 182H201" stroke="#9b713a" stroke-width="1.2"/>
<text x="204" y="154" font-size="11" fill="#9b713a">uma dobra</text>
<!-- dupla -->
<text x="470" y="28" font-size="12" text-anchor="middle" font-weight="600" fill="#16302a">Bainha dupla</text>
<text x="470" y="46" font-size="11" text-anchor="middle" fill="#6d6e61">tecido leve, abaixo de 150 g/m²</text>
<path d="M440 60V170Q440 182 452 182Q464 182 464 170V132Q464 122 474 122Q484 122 484 132V170" fill="none" stroke="#9c8c72" stroke-width="6" stroke-linecap="round"/>
<path d="M440 60V170Q440 182 452 182Q464 182 464 170V132Q464 122 474 122Q484 122 484 132V170" fill="none" stroke="#e2d6c0" stroke-width="3" stroke-linecap="round"/>
<path d="M506 122V182" stroke="#9b713a" stroke-width="1.2"/><path d="M501 122H511M501 182H511" stroke="#9b713a" stroke-width="1.2"/>
<text x="514" y="154" font-size="11" fill="#9b713a">duas dobras, mais corpo</text>
<path d="M30 200H610" stroke="#ded8ca"/>
<text x="320" y="214" font-size="10" text-anchor="middle" fill="#6d6e61">corte visto de lado · esquema sem escala</text>
</g>
</svg>
              <figcaption>À esquerda, bainha simples para tecido encorpado. À direita, bainha dupla para tecido leve.</figcaption>
            </figure>` },

      { id: 'costura', toc: 'Costura reta, no fio', h2: 'Costura reta, no fio do tecido. Sempre.', html: `
            <p>Cortina se costura em linha reta, seguindo o fio do tecido. É a regra mais simples e a mais desrespeitada. Quando a costura sai enviesada, na diagonal, ela danifica a trama. Na hora parece que ficou bom. Com o tempo, a cortina vai ficando desengonçada, torta, com aqueles vincos que eu chamo de <strong>caminho de rato</strong>.</p>
            <p>Isso acontece muito quando alguém tenta corrigir na costura um problema que é do ambiente: teto desnivelado, piso fora de esquadro. Não é assim que se resolve. Desnível se corrige no gesso, e em último caso ajustando a bainha no local, com a costura continuando reta. Nunca costurando torto para "compensar".</p>` },

      { id: 'ajuste', toc: 'Ajuste em casa', h2: 'Ajuste em casa: a alfaiataria vai até você', html: `
            <p>A Shine tem uma <strong>equipe de alfaiataria</strong> que se desloca até a casa do cliente para ajustar a bainha no lugar. Não é para toda cortina. É para os casos em que não dá para prever, na oficina, como a cortina vai assentar depois de instalada.</p>
            <p>O caso clássico é o <strong>pé-direito alto</strong>. O tecido é pesado, o vão é grande, e só com a cortina pendurada é que se vê exatamente onde a barra vai parar. O outro caso é quando as <strong>ondas e os obstáculos do vão</strong> pedem uma adequação: um rodapé mais alto de um lado, um degrau, um móvel fixo.</p>
            <p>Nesses projetos, a cortina é instalada, a costureira confere a barra com a peça já no lugar e faz o ajuste ali. É o que você vê no <a href="/videos/ajuste-bainha-em-casa-alfaiataria/">vídeo do ajuste de bainha em casa</a>. Que eu saiba, somos a única empresa da região que leva a alfaiataria até o cliente.</p>` },

      { id: 'erros', toc: 'O erro que mais vejo', h2: 'O erro que mais vejo em bainha de cortina', html: `
            <p>Quando eu entro numa casa e a cortina está feia embaixo, quase sempre é a bainha. Ela está <strong>empachocada</strong>, embolada, com <strong>fio puxado</strong>, costurada com o <strong>ponto errado da máquina</strong>. Ou a cortina foi lavada, <strong>encolheu</strong>, e ninguém ajustou: a barra subiu e ficou curta.</p>
            <p>Dá para consertar? Dá, mas não é remendo. O caminho correto é <strong>desmanchar a bainha e refazer</strong>, com o ponto certo, no fio, na medida nova. Tentar "puxar" ou "esticar" só piora o caminho de rato.</p>
            <div class="sl-aside"><strong>Leia também</strong><p>A bainha cai bem quando o varão está na altura certa. No artigo sobre <a href="/blog/varao-para-cortina/">varão para cortina</a> eu mostro tubo, suporte e ponteira, e o que muda de um para outro.</p></div>` },

      { id: 'antes', toc: 'Antes de mandar fazer', h2: 'O que conferir antes de mandar fazer a bainha', html: `
            <ul>
              <li>Qual é o pé-direito? O tamanho da barra vai ser proporcional a ele.</li>
              <li>Qual é a gramatura do tecido? Abaixo de 150 g/m², bainha dupla.</li>
              <li>A barra vai ficar a 1 cm, beijando o chão ou com sobra? A bainha executa essa escolha.</li>
              <li>A altura foi medida em três pontos? Desnível se resolve antes da costura, não nela.</li>
              <li>É pé-direito alto ou vão com obstáculo? Então o ajuste é no local, com a cortina pendurada.</li>
            </ul>` },

      { id: 'perguntas', toc: 'Perguntas frequentes', h2: 'Perguntas frequentes sobre bainha de cortina', faq: true, html: `
            <p>Respostas curtas, do jeito que eu respondo na consultoria.</p>` },

      { id: 'consultoria', toc: 'Consultoria em casa', label: 'Converse com a Shine', closing: true, h2: 'A bainha certa começa na medição',
        html: `<p>Pé-direito, gramatura do tecido e o acabamento que você quer para a barra: as três coisas se decidem juntas, e na sua casa. Na consultoria em domicílio, eu ou alguém da equipe mede a laser, mostra o tecido no seu ambiente e define a bainha com você.</p><p>Atendemos Volta Redonda, Resende, Barra Mansa e todo o Sul Fluminense. Gratuito e sem compromisso.</p>`,
        cta: 'Agendar consultoria em casa →', img: '/hall-wave-volta-redonda-800.avif', imgAlt: 'Cortina wave com barra de acabamento em hall de pé-direito duplo, projeto ShineCortinas em Volta Redonda' },
    ],
    faq: [
      ['O que é a bainha da cortina?',
       'É a dobra costurada na parte de baixo do tecido, que forma a barra da cortina. A altura da cortina é a decisão; a bainha é quem executa: é ela que faz a barra parar a 1 cm do chão, beijar o chão ou sobrar no piso.'],
      ['Qual o tamanho ideal da bainha (barra) da cortina?',
       'O nome certo do que se mede é barra; a bainha é a costura que faz a barra. O tamanho é proporcional ao pé-direito. Em teto baixo, por volta de 2,30 m, cerca de 15 cm. Entre 2,50 e 2,70 m, 20 a 25 cm. Perto de 3 m, 30 cm. Em pé-direito duplo, de 5 a 6 m, uma barra de 40 a 50 cm com acabamento.'],
      ['Bainha dupla é melhor que bainha simples?',
       'Depende do tecido. Tecido leve, abaixo de 150 g/m², como o voil, pede bainha dupla para ganhar corpo. Tecido de 170 a 200 g/m² fica bem com bainha simples, porque a própria dobra já dá o efeito encorpado.'],
      ['A bainha pode ser ajustada depois da cortina instalada?',
       'Pode, e em pé-direito alto é o certo: só com a cortina pendurada dá para ver onde a barra vai parar. A Shine leva a equipe de alfaiataria até a casa para esse ajuste. A costura continua reta, no fio; o que muda é a medida.'],
      ['Minha cortina encolheu na lavagem e ficou curta. E agora?',
       'É um dos problemas mais comuns. O conserto correto é desmanchar a bainha e refazer na medida nova, com o ponto certo. Puxar ou esticar não resolve e estraga a trama.'],
      ['Por que a bainha da minha cortina ficou torta?',
       'Quase sempre por costura enviesada, na diagonal, feita para compensar um desnível do teto ou do piso. Isso danifica a trama e, com o tempo, a cortina fica desengonçada. Desnível se corrige no gesso ou no ajuste da bainha no local, nunca costurando torto.'],
    ],
  },
];

// ---- layout editorial (rascunho aprovado pelo Isani em 10/09/2026, portado para o sistema do site) ----
function editorialBody(post) {
  const secs = post.sections;
  const nn = (i) => String(i + 1).padStart(2, '0');
  const toc = secs.map((sec, i) => `<li><a href="#${sec.id}"><span>${nn(i)}</span>${sec.toc || sec.h2}</a></li>`).join('\n            ');
  const faqEd = post.faq.map(([q, a]) => `          <details class="sl-ed-faq"><summary>${q}</summary><div><p>${a}</p></div></details>`).join('\n');
  const sections = secs.map((sec, i) => {
    if (sec.closing) {
      return `          <section id="${sec.id}" class="sl-ed-sec sl-ed-closing">
            <div class="sl-ed-label">${nn(i)} / ${sec.label}</div>
            <h2>${sec.h2}</h2>
            <div>${sec.html}
              <a class="sl-btn" data-wa="agendar" href="${WA}" target="_blank" rel="noopener noreferrer">${sec.cta}</a>
            </div>
            <img src="${sec.img}" alt="${esc(sec.imgAlt)}" width="640" height="800" loading="lazy" decoding="async">
          </section>`;
    }
    const html = sec.faq ? sec.html + '\n' + faqEd : sec.html;
    return `          <section id="${sec.id}" class="sl-ed-sec">
            <div class="sl-ed-label">${nn(i)} / ${sec.label || 'Guia de medidas'}</div>
            <h2>${sec.h2}</h2>
${html}
          </section>`;
  }).join('\n');
  const h = post.hero;
  return `<body data-wa-context="o artigo sobre ${esc(post.kicker.toLowerCase())}">
${header('/blog/')}
${cityChip(null)}
  <main>
    <section class="sl-ed-hero">
      <div>
        <nav aria-label="Breadcrumb" class="sl-ed-crumbs"><a href="/">Início</a><span aria-hidden="true">/</span><a href="/blog/">Blog</a><span aria-hidden="true">/</span><span>${post.kicker}</span></nav>
        <p class="sl-ed-eyebrow">${h.eyebrow}</p>
        <h1 class="sl-ed-h1" id="topo">${h.h1} <em>${h.h1em}</em></h1>
        <div class="sl-ed-author"><img src="/isani-autor.avif" alt="Isani Oliveira, fundador da ShineCortinas" width="48" height="48" loading="eager" decoding="async"><div><strong>Por Isani Oliveira</strong><span>Fundador da ShineCortinas e especialista em cortinas sob medida · Atualizado em ${post.modified.split('-').reverse().join('/')}</span></div></div>
        <div class="sl-ed-lead">${h.lead}</div>
        <a class="sl-ed-readlink" href="#${h.readTo}">${h.readText} <span aria-hidden="true">↓</span></a>
      </div>
      <figure class="sl-ed-photo">
        <img src="${h.photo}" alt="${esc(h.photoAlt)}" width="1216" height="1632" fetchpriority="high" decoding="async">
        <figcaption><span>${h.photoTag}</span>${h.photoCaption}</figcaption>
      </figure>
    </section>

    <div class="sl-ed-shell" id="artigo">
      <aside class="sl-ed-toc">
        <nav aria-label="Neste artigo">
          <p class="sl-ed-eyebrow">Neste artigo</p>
          <ol>
            ${toc}
          </ol>
        </nav>
        <p class="sl-ed-tocnote">${post.tocNote}</p>
      </aside>
      <div class="sl-ed-col">
        <details class="sl-ed-tocm"><summary>Encontre sua dúvida neste artigo</summary><nav aria-label="Neste artigo"><ol>
            ${toc}
        </ol></nav></details>
        <article>
${sections}
        </article>
        <div class="sl-ed-authorend">
          <img src="/isani-autor.avif" alt="" width="64" height="64" loading="lazy" decoding="async">
          <p><strong>Conhecimento de quem está no projeto.</strong><br>Orientações de Isani Oliveira, fundador da ShineCortinas e especialista em cortinas sob medida, desde 2009 no Sul Fluminense. <a href="/sobre/">Conheça a Shine</a>.</p>
        </div>
      </div>
    </div>

    <section class="sl-section sl-section--tight"><div class="sl-wrap">
      <p class="sl-label">Continue no site</p>
      <div class="sl-links">
${(post.related || []).map(([hh, t]) => `<a href="${hh}">${t}</a>`).join('')}
        <a href="/blog/">Todos os artigos</a><a href="/portfolio/">Projetos reais</a><a href="/metodo/">Como funciona</a><a href="/cidades-atendidas/">Cidades atendidas</a>
      </div>
    </div></section>
  </main>
  <script>
    (function(){var l=[].slice.call(document.querySelectorAll('.sl-ed-toc a'));if(!l.length||!('IntersectionObserver' in window))return;
    var o=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;l.forEach(function(a){var on=a.hash==='#'+e.target.id;a.classList.toggle('active',on);if(on)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});});},{rootMargin:'-5% 0px -70% 0px'});
    document.querySelectorAll('.sl-ed-sec').forEach(function(s){o.observe(s);});})();
  </script>
${footer()}${waFloat()}${bar('single')}${tail()}`;
}

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
        ...(post.ogImage ? { image: `${BASE}${post.ogImage}` } : {}),
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

  const body = post.layout === 'editorial' ? editorialBody(post) : `<body data-wa-context="o artigo sobre ${esc(post.kicker.toLowerCase())}">
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
