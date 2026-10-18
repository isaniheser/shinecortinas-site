// Conteúdo das páginas de produto e institucionais, no sistema visual "leve".
// FONTE DOS FATOS: as 21 perguntas da /faq/ do site, a landing /lp/anuncio-d/,
// a home e as especificações técnicas validadas pelo Isani (CLAUDE.md e docs/recebidos-do-isani.md).

import sala from './content/sala.mjs';
import linho from './content/linho.mjs';
import wave from './content/wave.mjs';
import cortinaMotorizada from './content/cortina-motorizada.mjs';
import verticalHorizontal from './content/vertical-horizontal.mjs';
import persianaAmbiente from './content/persiana-ambiente.mjs';
import escurecer from './content/escurecer.mjs';
import varao from './content/varao.mjs';
import lavagem from './content/lavagem.mjs';

function fig(post, idx, kicker, h2, sub) {
  const all = post.sections.map((s) => s.html).join('\n');
  const m = [...all.matchAll(/<figure class="sl-ed-fig[^"]*">([\s\S]*?)<\/figure>/g)][idx];
  const inner = m ? m[1] : '';
  const top = inner.match(/<div class="sl-ed-figtop">([\s\S]*?)<\/div>/);
  const cap = inner.match(/<figcaption>([\s\S]*?)<\/figcaption>/);
  const body = inner
    .replace(/<div class="sl-ed-figtop">[\s\S]*?<\/div>/, '')
    .replace(/<figcaption>[\s\S]*?<\/figcaption>/, '')
    .trim();
  const spans = top ? [...top[1].matchAll(/<span[^>]*>([\s\S]*?)<\/span>/g)] : [];
  return {
    t: 'diagram',
    kicker,
    h2,
    sub,
    figKicker: spans[0] ? spans[0][1] : 'Esquema técnico Shine',
    figRight: spans[1] ? spans[1][1] : 'Padrão de oficina e instalação',
    body,
    cap: cap ? cap[1] : '',
  };
}

export const PAGINAS = [
  // ---------------------------------------------------------------- CORTINAS
  {
    dir: 'cortinas',
    title: 'Cortinas Sob Medida em Volta Redonda e Região | ShineCortinas',
    description: 'Cortinas sob medida com acabamento de alfaiataria: Wave, prega fêmea, macho, americana, tombada e franzida. Tecidos acima de 170 g/m², medição a laser e instalação própria.',
    kicker: 'Cortinas sob medida',
    h1: 'Cortinas sob medida, com o <em>caimento</em> que a foto de loja não mostra',
    lead: 'Cortina sob medida é tecido escolhido na luz real da sua sala ou do seu quarto, medida a laser na sua janela e confeccionada do zero na nossa oficina. O que muda o resultado é a união entre a gramatura do tecido, o modelo da prega, o forro, a bainha dupla e o trilho.',
    hero: '/cortina-sob-medida.avif',
    heroAlt: 'Sala com cortina de linho sob medida instalada pela ShineCortinas',
    blocos: [
      { t: 'prose', h2: 'O que define uma cortina bem resolvida', p: [
        'Três decisões fazem o resultado na parede: o <strong>tecido decorativo</strong> da frente, que veste o ambiente e conversa com o estofado e o tapete, o <strong>forro</strong> que corre por trás controlando a claridade e protegendo a fibra contra o sol, e o <strong>sistema de prega e trilho</strong> que sustenta o desenho do teto ao chão.',
        'É por isso que não indicamos escolher tecido por foto de celular. Na consultoria em domicílio, levamos o mostruário completo até a sua casa para você sentir o toque na mão e ver como a trama reage contra a luz da sua própria janela.',
      ] },
      { t: 'cards', h2: 'Tecidos e composições que trabalhamos', sub: 'Priorizamos tecidos com gramatura acima de 170 g/m² para garantir peso, prumo e resistência ao sol.', items: [
        { tag: 'Caimento e textura', h: 'Linho técnico e misto (até 10%)', p: 'Trabalhamos com 100% poliéster que imita o linho com perfeição ou tecidos com no máximo 10% de linho natural. Assim a cortina tem caimento sedoso, não fica armada, não amarrota fácil e não encolhe na lavagem.', img: '/linha-puro.avif', alt: 'Tecido de linho do mostruário ShineCortinas' },
        { tag: 'Leveza e luz', h: 'Voil e tramas leves', p: 'Tecidos translúcidos que filtram a claridade e mantêm a sala iluminada com privacidade. Muito utilizados na frente de um forro slim ou de um blackout.', img: '/duplo.avif', alt: 'Sala com cortina dupla de voil e linho, projeto ShineCortinas' },
        { tag: 'Peso e presença', h: 'Tecidos encorpados e veludo', p: 'Tecidos peletizados, escovados ou de alta gramatura que entregam volume nobre, conforto acústico e maior resistência contra a queima pelo sol.', img: '/cortina-sob-medida.avif', alt: 'Sala com cortina sob medida, projeto ShineCortinas', ref: true },
        { tag: 'Escurecimento', h: 'Blackout 70% e 100%', p: 'Pode entrar como forro costurado ou em trilho separado atrás do tecido principal. O 70% deixa uma penumbra suave para a TV e o 100% veda toda a luz para dormir.', img: '/blackouts-tecnicos.avif', alt: 'Home theater escurecido com blackout, projeto ShineCortinas' },
      ] },
      fig(
        sala,
        0,
        'Alfaiataria sob medida',
        'Os 6 modelos de confecção que trabalhamos',
        'Da onda contínua da Wave às pregas clássicas de alfaiataria, cada cabeçote é montado conforme o estilo do seu projeto.'
      ),
      { t: 'prose', h2: 'Gramatura acima de 170 g/m² e bainha dupla de 15 a 20 cm', p: [
        'Um erro comum de quem compra cortina pronta é levar um pano fino que fica voando e abrindo na barra. Aqui na Shine nós sempre indicamos tecidos com <strong>gramatura superior a 170 gramas por metro quadrado</strong> (a menos que seja um tecido peletizado e escovado de trama bem fechada). Esse peso faz a onda descer reta como um prumo e protege melhor a fibra contra o sol.',
        'Na base da cortina, confeccionamos a <strong>bainha dupla com 15 cm ou 20 cm de altura</strong> (usando de 30 cm a 40 cm de tecido dobrado internamente) e instalamos a barra beijando o piso. Para ver todos os detalhes técnicos, confira nossos guias sobre <a href="/blog/linho-para-cortinas/">linho e gramatura</a>, <a href="/blog/altura-ideal-da-cortina/">altura ideal da cortina</a> e <a href="/blog/bainha-de-cortina/">bainha de alfaiataria</a>.',
      ] },
      fig(
        linho,
        1,
        'Peso e durabilidade',
        'Por que a gramatura acima de 170 g/m² muda o caimento',
        'O peso por metro quadrado é o que faz a cortina assentar desde o primeiro dia e resistir melhor à incidência solar.'
      ),
      { t: 'table', h2: 'Qual modelo de cortina combina com cada proposta', sub: 'Todos os seis modelos são confeccionados sob medida na nossa oficina.', head: ['Modelo de confecção', 'Desenho na janela', 'Onde mais indicamos'], rows: [
        ['Cortina Wave', 'Ondas contínuas e uniformes no trilho (proporções 2:1, 2,5:1 ou 3:1)', 'Salas contemporâneas, pés-direitos duplos e grandes vãos'],
        ['Prega Fêmea', 'Dobras voltadas para dentro com frente limpa e alinhada', 'Salas elegantes e quartos com cortineiro mais enxuto'],
        ['Prega Macho', 'Gomos salientes voltados para a frente com bastante corpo', 'Salas amplas que pedem presença de tecido'],
        ['Prega Americana', 'Três dobras unidas no topo formando um leque clássico', 'Projetos tradicionais, casarões e salas acolhedoras'],
        ['Prega Tombada', 'Dobras deitadas na mesma direção em sequência contínua', 'Salas e suítes, inclusive como opção de forro'],
        ['Modelo Franzido', 'Micro-dobras cheias no cabeçote com volume generoso', 'Quartos e salas de estilo clássico ou romântico'],
      ] },
      { t: 'compare' },
      { t: 'guides', kicker: 'Aprenda antes de escolher', h2: 'Guias técnicos do Isani sobre <em>cortinas</em>', sub: 'Artigos completos escritos com a experiência prática das nossas instalações no Sul Fluminense.', items: [
        ['/blog/qual-cortina-escolher-para-sala/', 'Sala de estar', 'Qual cortina escolher para a sala: modelos e cores', 'Como harmonizar Wave, prega fêmea, macho, americana e tombada com o sofá e o tapete.'],
        ['/blog/linho-para-cortinas/', 'Tecidos e fibras', 'Linho para cortinas: composição e gramatura', 'Por que indicamos até 10% de linho ou 100% poliéster com toque de linho e gramatura acima de 170 g/m².'],
        ['/blog/quantidade-de-tecido-para-cortina-wave/', 'Cortina Wave', 'Quantidade de tecido na Wave: 2:1, 2,5:1 e 3:1', 'O cálculo de tecido, os cordões espaçadores 0,4, 0,5 e 0,8 e o cortineiro mínimo de 15x15 cm.'],
        ['/blog/altura-ideal-da-cortina/', 'Medidas', 'Altura ideal da cortina: do teto ao piso', 'Por que a cortina do teto ao chão alonga a parede e como deixamos a barra beijando o piso.'],
        ['/blog/bainha-de-cortina/', 'Acabamento', 'Bainha de cortina: barra dupla de 15 a 20 cm', 'Como a dobra dupla de 30 a 40 cm de tecido dá peso e alinhamento para a base da cortina.'],
        ['/blog/lavagem-de-cortinas-sob-medida/', 'Lavagem e manutenção', 'Lavagem e secagem vertical de cortinas sob medida', 'Por que lavar de outro jeito faz o tecido perder o DNA e como revisamos deslizantes, costura e bainha.'],
      ] },
      { t: 'proof' },
    ],
    faq: [
      ['Quais modelos de prega vocês confeccionam?', 'Confeccionamos cortina Wave, prega fêmea, prega macho, prega americana, prega tombada e modelo franzido. Todos são feitos sob medida e indicados conforme o espaço do cortineiro, o tecido escolhido e o estilo da decoração.'],
      ['Por que vocês indicam tecido com até 10% de linho ou 100% poliéster?', 'Quando o tecido passa de 10% de linho puro, ele costuma ficar armado, amassa com muita facilidade e corre risco de encolher na lavagem. O poliéster moderno imita com perfeição a trama do linho, da seda e do algodão, mantendo o caimento sedoso e a manutenção prática.'],
      ['Qual a gramatura ideal para uma cortina ter bom caimento?', 'Indicamos tecidos com gramatura superior a 170 gramas por metro quadrado (exceto quando é um tecido peletizado e escovado de trama bem fechada). Abaixo disso o tecido perde peso, não forma onda definida e queima mais rápido no sol.'],
      ['Como escolher a cor da cortina para a sala?', 'A cortina funciona como pano de fundo e faz a transição entre os itens decorativos, conversando principalmente com o estofado e o tapete. Para quem ainda não definiu o sofá ou o tapete, o ideal é trabalhar com tons neutros e pastéis.'],
      ['Vocês lavam e fazem manutenção de cortinas?', 'Sim. Nossa equipe vai até a sua casa, retira as cortinas de tecido, faz a lavagem e a secagem na vertical para manter os vincos e o DNA do tecido, passa, revisa deslizantes, costuras, trilhos e bainha, e reinstala. Atendemos lavagem em Volta Redonda, Barra Mansa, Resende, Barra do Piraí, Piraí e Pinheiral (exclusivamente para cortinas de tecido).'],
      ['Quanto tempo leva para instalar?', 'Trabalhamos exclusivamente sob medida: após a medição a laser, cada peça é confeccionada para o seu vão. Quando fica pronta e agendamos a entrega, o serviço de instalação em si leva poucas horas em uma única visita na maioria dos projetos, deixando o ambiente limpo e pronto.'],
    ],
    links: [['/cortina-wave/', 'Cortina wave'], ['/blackout-e-forros/', 'Blackout e forros'], ['/cortina-motorizada/', 'Cortina motorizada'], ['/lavagem-de-cortinas/', 'Lavagem de cortinas'],
            ['/persianas/', 'Persianas técnicas'], ['/trilhos-e-acionamentos/', 'Trilhos e acionamentos'], ['/portfolio/', 'Projetos reais'], ['/metodo/', 'Como funciona'], ['/cidades-atendidas/', 'Cidades atendidas']],
  },

  // --------------------------------------------------------------- PERSIANAS
  {
    dir: 'persianas',
    title: 'Persianas Sob Medida em Volta Redonda e Região | ShineCortinas',
    description: 'Persianas sob medida: Rolô, Romana, Double Vision, Screen 5%, Champion para varanda, Vertical e Horizontal 50 mm em madeira ou alumínio. Medição a laser.',
    kicker: 'Persianas técnicas',
    h1: 'Persianas sob medida, para controlar a luz <em>no detalhe</em>',
    lead: 'Persiana é estruturada em lâminas horizontais ou verticais, em gomos dobráveis como a Romana, ou em enrolamento contínuo como a Rolô e a Double Vision. Cada ambiente da casa pede um modelo e um material específicos para resolver sol, calor, umidade ou reflexo na tela.',
    hero: '/persiana-motorizada.avif',
    heroAlt: 'Sala com persiana rolô screen instalada pela ShineCortinas',
    blocos: [
      { t: 'cards', h2: 'Os sistemas de persiana que trabalhamos', sub: 'Do controle solar técnico na varanda à imponência das lâminas de 50 mm na sala.', items: [
        { tag: 'Versatilidade', h: 'Rolô (Screen, Translúcida e Blackout)', p: 'O tecido enrola em um tubo superior compacto. Na versão Tela Solar 5%, corta o calor e o reflexo mantendo a vista externa e facilitando a limpeza.', img: '/persiana-motorizada.avif', alt: 'Persiana rolô screen instalada em sala pela ShineCortinas' },
        { tag: 'Varanda e sacada', h: 'Persiana Champion e Tela Solar', p: 'Projetadas para áreas gourmet, varandas e sacadas envidraçadas que recebem sol forte e vento, filtrando os raios solares sem fechar a paisagem.', img: '/tela-solar.avif', alt: 'Varanda envidraçada com tela solar instalada pela ShineCortinas' },
        { tag: 'Escritório e quarto', h: 'Persiana Romana e Double Vision', p: 'A Romana recolhe em gomos horizontais elegantes, ótima para quartos e home office. Já a Double Vision alterna faixas translúcidas e opacas para dosar a luz no monitor.', img: '/duplo.avif', alt: 'Ambiente com controle de luz sob medida, projeto ShineCortinas', ref: true },
        { tag: 'Ambientes de luxo', h: 'Horizontal 50 mm (Madeira e Alumínio)', p: 'Lâminas largas de 50 mm em madeira natural ou alumínio com opção de fita decorativa. Trazem imponência, volume arquitetônico e controle fino de luz por inclinação.', img: '/madeira.avif', alt: 'Ambiente com persiana horizontal de madeira 50 mm instalada pela ShineCortinas' },
        { tag: 'Portas de correr', h: 'Persiana Vertical', p: 'Ideal para portas de correr e vãos muito largos, pois recolhe para a lateral acompanhando o sentido da porta e liberando a passagem.', img: '/automacao.avif', alt: 'Grande vão com sistema sob medida, projeto ShineCortinas', ref: true },
        { tag: 'Áreas úmidas', h: 'Horizontal de Alumínio 16 mm', p: 'Lâminas leves que não absorvem vapor nem criam mofo. Junto com a Rolô sintética, é a nossa indicação certeira para banheiros e lavabos.', img: '/blackouts-tecnicos.avif', alt: 'Ambiente técnico com controle de privacidade, projeto ShineCortinas', ref: true },
      ] },
      fig(
        persianaAmbiente,
        0,
        'Indicação por cômodo',
        'Qual persiana escolher para cada ambiente da casa',
        'Cada cômodo tem uma exigência diferente de sol, umidade, limpeza e estética.'
      ),
      { t: 'prose', h2: 'Onde cada persiana entrega o melhor resultado', p: [
        'Para <strong>portas de correr e vãos largos</strong>, indicamos a persiana vertical porque ela abre para o lado no mesmo sentido da porta. Já quando o cliente busca imponência para um <strong>ambiente de luxo</strong>, nossa recomendação é a persiana horizontal de <strong>50 mm</strong>, tanto de madeira quanto de alumínio, que veste a janela como uma peça de mobiliário.',
        'Um ponto de transparência importante da nossa consultoria: <strong>não indicamos usar persiana ou cortina para dividir ambientes no meio do cômodo</strong>. Persiana foi feita para janela e decoração. Quando a necessidade é separar dois espaços, o caminho correto é uma divisória estrutural ou drywall. Veja a explicação completa no nosso artigo <a href="/blog/persiana-para-dividir-ambientes/">persiana para dividir ambientes vale a pena?</a>.',
      ] },
      fig(
        verticalHorizontal,
        0,
        'Sentido de abertura e lâminas',
        'Persiana Vertical vs. Horizontal de 50 mm',
        'Por que o tipo de abertura da janela ou porta define o modelo antes mesmo da cor.'
      ),
      { t: 'table', h2: 'Resumo técnico de indicação por ambiente', sub: 'Recomendações práticas que levamos na consultoria em domicílio.', head: ['Ambiente', 'Modelos indicados pela Shine', 'Principal vantagem prática'], rows: [
        ['Varanda, sacada e área gourmet', 'Persiana Champion e Tela Solar', 'Bloqueia o calor e os raios UV mantendo a vista livre e a ventilação'],
        ['Escritório e home office', 'Double Vision e Romana', 'Elimina o reflexo direto no monitor com estética executiva e aconchegante'],
        ['Quarto e suíte', 'Romana e Rolô (com opção Blackout 100%)', 'Recolhimento compacto acima da bancada ou cabeceira e vedação de luz'],
        ['Sala e ambientes de luxo', 'Horizontal 50 mm (Madeira ou Alumínio)', 'Lâminas largas de 50 mm que trazem imponência, requinte e giro de 180°'],
        ['Portas de correr e grandes vãos', 'Persiana Vertical', 'Abertura lateral que libera a passagem sem precisar subir a peça inteira'],
        ['Cozinha', 'Rolô em Tela Solar 5% ou Alumínio', 'Não retém cheiro de fritura e limpa fácil com pano úmido e detergente neutro'],
        ['Banheiro e lavabo', 'Rolô ou Horizontal de Alumínio 16 mm', 'Resistência total ao vapor do chuveiro com privacidade imediata'],
      ] },
      { t: 'guides', kicker: 'Guias técnicos de persianas', h2: 'Leia os artigos do Isani sobre <em>persianas</em>', sub: 'Tire todas as dúvidas técnicas antes de definir o modelo da sua janela.', items: [
        ['/blog/persiana-ideal-para-cada-ambiente/', 'Guia por cômodo', 'A persiana ideal para cada ambiente da casa', 'Por que indicamos Champion na varanda, Double Vision e Romana no escritório e 16 mm no banheiro.'],
        ['/blog/persiana-vertical-ou-horizontal/', 'Comparativo', 'Persiana vertical ou horizontal: 50 mm, madeira e alumínio', 'Quando usar a vertical em portas de correr e quando apostar na horizontal de 50 mm.'],
        ['/blog/cortina-ou-persiana-na-cozinha/', 'Cozinha e área gourmet', 'Cortina ou persiana na cozinha: Tela Solar 5% e limpeza', 'Por que o tecido comum acumula gordura e como a tela solar 5% e o alumínio facilitam o dia a dia.'],
        ['/blog/como-funciona-persiana-motorizada/', 'Automação', 'Como funciona a persiana motorizada: elétrica e bateria', 'Autonomia média de 6 meses nos motores a bateria e como o freio mecânico atua na falta de luz.'],
        ['/blog/persiana-para-dividir-ambientes/', 'Opinião sincera', 'Persiana para dividir ambientes vale a pena?', 'Por que somos contra improvisar persiana como parede divisória e quando cada modelo brilha na janela.'],
        ['/videos/persiana-horizontal-madeira-barra-mansa/', 'Vídeo real', 'Persiana horizontal de madeira em Barra Mansa', 'Veja em vídeo o acabamento das lâminas de 50 mm com fita decorativa instaladas pela nossa equipe.'],
      ] },
      { t: 'proof' },
    ],
    faq: [
      ['Qual persiana vocês indicam para varanda, quarto, escritório e banheiro?', 'Para varanda e sacada indicamos a Persiana Champion e a Tela Solar. Para escritório e home office, Double Vision e Romana. Para quarto, Romana e Rolô (inclusive com blackout 100%). E para banheiro, Rolô ou Horizontal de alumínio de 16 mm.'],
      ['Qual a diferença entre a persiana horizontal de 50 mm e a de 16 mm?', 'A horizontal de 50 mm (em madeira natural ou alumínio) tem lâminas largas e imponentes, indicada para salas e ambientes de luxo. Já a horizontal de alumínio de 16 mm tem lâminas finas e leves, ideal para banheiros e janelas menores.'],
      ['Qual persiana é melhor para cozinha?', 'Na cozinha indicamos a persiana Rolô em Tela Solar 5% ou a Horizontal de alumínio. Diferente da cortina de tecido tradicional, elas não absorvem gordura nem cheiro e podem ser limpas facilmente com pano úmido e detergente neutro.'],
      ['Persiana também escurece por completo?', 'Sim. As persianas Rolô e Romana contam com tecidos blackout 100% que bloqueiam totalmente a passagem de luz pelo material.'],
      ['Vale a pena usar persiana para dividir ambientes?', 'Não recomendamos. Persiana e cortina são feitas para vestir janelas e decorar. No meio de um cômodo de passagem, a peça balança e pode danificar. Para separar espaços, o ideal é fazer uma parede de drywall.'],
      ['Vocês instalam persiana motorizada a bateria ou elétrica?', 'Sim. Trabalhamos tanto com motores ligados na rede elétrica quanto com motores a bateria interna recarregável (para modelos compatíveis, com carga durando em média 6 meses), sem necessidade de quebrar parede.'],
    ],
    links: [['/cortinas/', 'Cortinas sob medida'], ['/cortina-motorizada/', 'Persiana motorizada'], ['/blackout-e-forros/', 'Blackout e forros'], ['/trilhos-e-acionamentos/', 'Trilhos e acionamentos'],
            ['/portfolio/', 'Projetos reais'], ['/videos/', 'Vídeos'], ['/metodo/', 'Como funciona'], ['/cidades-atendidas/', 'Cidades atendidas']],
  },

  // ------------------------------------------------------- BLACKOUT E FORROS
  {
    dir: 'blackout-e-forros',
    title: 'Blackout e Forros de Cortina: Translúcido, 70% e 100% | ShineCortinas',
    description: 'Forro translúcido (gabardine, cetim, tergal, microfibra), semi blackout 70% e blackout 100%. Veja como vedar a luz no quarto com trilho triplo e transpasse.',
    kicker: 'Blackout e forros',
    h1: 'O forro é a camada que <em>decide</em> quanta luz entra',
    lead: 'O forro corre atrás do tecido decorativo e se divide em dois grupos: o forro translúcido, que dá privacidade de dia e protege o tecido nobre contra o sol, e o forro blackout, nas versões de 70% (semi blackout para penumbra) e 100% (bloqueio total da luz pelo material).',
    hero: '/blackouts-tecnicos.avif',
    heroAlt: 'Ambiente escurecido com cortina de blackout instalada pela ShineCortinas',
    blocos: [
      { t: 'prose', h2: 'Forro translúcido: proteção solar, privacidade e caimento', p: [
        'O <strong>forro translúcido</strong> cumpre três funções essenciais: garante privacidade durante o dia sem precisar acender a lâmpada, quebra o excesso de claridade e serve como escudo para o sol não queimar a fibra do tecido decorativo da frente.',
        'Dentro do grupo dos translúcidos trabalhamos com várias opções e gramaturas no nosso mostruário: <strong>gabardine</strong> (de algodão ou poliéster, como o de 100 g/m²), <strong>tergal e tergal verão</strong> (como o de 70 g/m²), <strong>cetim</strong> (em opções de 70, 90 ou 110 g/m²), <strong>microfibra</strong> (65 ou 100 g/m²) e <strong>gorgurinho</strong>. Na cortina Wave, ele pode ser confeccionado no modelo <strong>forro slim</strong> (reto como um painel, ocupando menos espaço no cortineiro) ou em pregas.',
      ] },
      { t: 'prose', h2: 'Forro blackout: a diferença real entre 70% e 100%', p: [
        'O <strong>semi blackout (70%)</strong> filtra a maior parte do sol e deixa o ambiente em uma penumbra confortável. É ótimo para salas de TV e quartos de quem não gosta de escuridão total. Nele, a cor influencia: um semi blackout 70% em tom escuro segura um pouco mais a claridade do que um tom branco ou cru.',
        'Já o <strong>blackout 100%</strong> possui revestimento vedante que bloqueia totalmente a passagem de luz pelo tecido, seja ele claro ou escuro. Além do escuro para dormir até mais tarde, em relatos práticos das nossas instalações o forro blackout de tecido ajuda a <strong>reduzir a temperatura do ambiente em cerca de 5 a 6 °C</strong> nos dias de sol forte.',
      ] },
      fig(
        escurecer,
        0,
        'Controle luminoso',
        'Como o Blackout 100% e o Semi Blackout 70% se comportam contra o sol',
        'No blackout 100% a luz para na barreira técnica independentemente da cor. No 70% o ambiente fica em penumbra suave.'
      ),
      { t: 'prose', h2: 'Como deixar o quarto escuro de verdade (sem frestas de luz)', p: [
        'Ter o tecido blackout 100% é metade do caminho. A outra metade é impedir que a claridade escape pelas bordas da janela. Por isso projetamos a cortina subindo até o teto ou dentro do cortineiro de gesso, descendo até beijar o piso e avançando com sobra generosa para as laterais.',
        'Para fechar o pacote técnico nos quartos mais exigentes, utilizamos <strong>finalizadores nas pontas do trilho</strong> (que mantêm as extremidades encostadas na parede) e, quando o cliente quer zero fresta no meio da janela, o <strong>trilho triplo com transpasse central de 15 cm</strong>, onde uma banda cruza 15 cm por trás da outra.',
      ] },
      fig(
        escurecer,
        1,
        'Engenharia da instalação',
        'Por que a cortina sob medida veda melhor as bordas do que a rolô',
        'Enquanto a persiana rolô deixa frestas naturais nas laterais do tubo, a cortina sob medida cobre o vão com folga do teto ao chão.'
      ),
      { t: 'table', h2: 'Qual forro escolher para o seu objetivo', sub: 'Comparativo direto entre as opções que levamos na consultoria em domicílio.', head: ['Seu objetivo no ambiente', 'Forro indicado pela Shine', 'Resultado na prática'], rows: [
        ['Privacidade de dia mantendo a sala clara', 'Forro translúcido (gabardine, cetim, tergal ou microfibra)', 'Luz natural difusa, sem ninguém ver de fora para dentro'],
        ['Proteger o linho da frente contra o sol', 'Forro translúcido ou semi blackout 70%', 'Preserva a fibra do tecido nobre por muitos anos'],
        ['Cortar o reflexo na TV sem breu total', 'Semi blackout 70%', 'Penumbra aconchegante e conforto térmico'],
        ['Quarto escuro para dormir de dia', 'Blackout 100% + sobras laterais e finalizadores', 'Bloqueio completo da luz pelo tecido e redução térmica de cerca de 5 a 6 °C'],
        ['Eliminar o risco de luz no meio da cortina', 'Blackout 100% em trilho triplo com transpasse de 15 cm', 'Sobreposição central de 15 cm sem fresta entre os dois panos'],
      ] },
      { t: 'guides', kicker: 'Guias técnicos de escurecimento', h2: 'Aprofunde nos artigos do Isani sobre <em>forros e blackout</em>', sub: 'Entenda cada detalhe técnico antes de definir o projeto do seu quarto ou sala de TV.', items: [
        ['/blog/tipos-de-forro-para-cortina/', 'Guia completo', 'Tipos de forro para cortina: translúcido, 70% e 100%', 'Conheça o gabardine, o tergal verão, o cetim, a microfibra e como escolher o forro certo.'],
        ['/blog/o-que-e-blackout/', 'Luz e conforto térmico', 'O que é blackout para cortina? Entenda o 70% e o 100%', 'A diferença entre tecido blackout e forro blackout e o impacto na temperatura do quarto.'],
        ['/blog/como-escurecer-quarto-sala-tv/', 'Instalação sem frestas', 'Como escurecer quarto ou sala de TV de verdade', 'Cortineiro, sobras laterais, finalizadores nas pontas e o trilho triplo com transpasse de 15 cm.'],
      ] },
      { t: 'proof' },
    ],
    faq: [
      ['O blackout bloqueia toda a luz do quarto?', 'Depende da versão escolhida. O forro blackout 100% bloqueia totalmente a passagem de luz pelo tecido e entrega o quarto escuro de verdade. Já o forro blackout de 70% (semi blackout) deixa o ambiente em penumbra.'],
      ['Quais tecidos vocês utilizam como forro translúcido?', 'Trabalhamos com gabardine (de algodão ou poliéster, ex. 100 g/m²), tergal e tergal verão (ex. 70 g/m²), cetim (70, 90 ou 110 g/m²), microfibra (65 ou 100 g/m²) e gorgurinho. Cada opção é escolhida na visita junto com o tecido da frente.'],
      ['Como evitar que a luz entre pelo meio ou pelas laterais da cortina?', 'Projetamos a cortina do teto ao chão com sobras laterais generosas, usamos finalizadores nas pontas do trilho para encostar a cortina na parede e, quando necessário, instalamos o trilho triplo com transpasse central de 15 cm para cruzar as duas bandas no meio.'],
      ['Quais tipos de prega o forro pode ter atrás da cortina Wave?', 'O forro pode ser feito no modelo slim (reto, sem prega, igual a um painel, ótimo para economizar espaço), em prega tombada, prega plissada, prega fêmea, prega macho ou até no modelo Wave (desde que haja 11 cm de distância entre os trilhos).'],
      ['O forro blackout ajuda a diminuir o calor do quarto?', 'Sim. Em relatos de campo das nossas instalações, o forro blackout de tecido reduz a temperatura interna do ambiente em cerca de 5 a 6 °C nos horários de sol forte.'],
    ],
    links: [['/blog/tipos-de-forro-para-cortina/', 'Artigo: tipos de forro'], ['/cortinas/', 'Cortinas sob medida'], ['/persianas/', 'Persianas técnicas'], ['/cortina-wave/', 'Cortina wave'],
            ['/blog/o-que-e-blackout/', 'O que é blackout'], ['/portfolio/', 'Projetos reais'], ['/metodo/', 'Como funciona'], ['/cidades-atendidas/', 'Cidades atendidas']],
  },

  // ------------------------------------------------------------ CORTINA WAVE
  {
    dir: 'cortina-wave',
    title: 'Cortina Wave Sob Medida: Proporções 2:1, 2,5:1 e 3:1 | ShineCortinas',
    description: 'Cortina Wave sob medida nas proporções 2:1, 2,5:1 e 3:1 com cordão espaçador 0,4, 0,5 e 0,8. Descubra a medida do cortineiro 15x15 cm e as opções de forro.',
    kicker: 'Cortina wave',
    h1: 'Cortina wave: a onda que fica <em>regular</em> do teto ao chão',
    lead: 'Na cortina Wave, as ondas não dependem da sorte na hora de puxar o pano. Elas são guiadas por um cordão espaçador dentro do trilho e calculadas na oficina nas proporções 2:1, 2,5:1 ou 3:1 para descerem alinhadas do teto até beijar o piso.',
    hero: '/cortina-sob-medida.avif',
    heroAlt: 'Cortina wave em linho com ondas regulares, projeto ShineCortinas',
    blocos: [
      { t: 'prose', h2: 'Proporções 2:1, 2,5:1 e 3:1 e o cordão espaçador (0,4, 0,5 e 0,8)', p: [
        'O segredo de uma cortina Wave imponente está na quantidade de tecido por metro de trilho e na distância entre os carrinhos deslizantes. Aqui na Shine confeccionamos a Wave nas proporções <strong>2:1</strong> (onda mais leve), <strong>2,5:1</strong> (equilíbrio clássico de profundidade) e <strong>3:1</strong> (onda profunda e cheia).',
        'Dentro do trilho utilizamos o <strong>cordão espaçador nas medidas de 0,4, 0,5 e 0,8</strong>, combinado com uma técnica própria de confecção que <strong>reduz o espaço entre as ondas</strong>. Isso evita que a cortina fique aberta ou esgarçada quando fechada, mantendo as curvas próximas e simétricas de ponta a ponta.',
      ] },
      fig(
        wave,
        0,
        'Geometria das ondas',
        'As proporções 2:1, 2,5:1 e 3:1 vistas de cima no trilho',
        'Como a quantidade de tecido e o cordão espaçador (0,4, 0,5 e 0,8) definem a profundidade e a proximidade das curvas.'
      ),
      { t: 'prose', h2: 'O cortineiro ideal de 15x15 cm e os 6 tipos de forro', p: [
        'Para que a onda da cortina Wave faça a curva completa para a frente e para trás sem amassar no gesso nem enroscar no forro, eu sempre peço um <strong>cortineiro de no mínimo 15 por 15 centímetros</strong> (15 cm de largura ou profundidade interna por 15 cm de altura).',
        'Atrás da cortina Wave podemos trabalhar com o <strong>forro slim</strong> (reto, sem prega, igual a um painel, perfeito para não tomar profundidade), além do forro em <strong>prega tombada, prega plissada, prega fêmea, prega macho</strong> e até o forro no próprio <strong>modelo Wave</strong>. Quando o cliente deseja os dois tecidos no modelo Wave, deixamos <strong>11 cm de distância</strong> entre o trilho da frente e o de trás para uma onda nunca bater na outra.',
      ] },
      fig(
        wave,
        1,
        'Medidas de obra e gesso',
        'O cortineiro 15x15 cm e o espaçamento entre cortina e forro',
        'Planejar a caixa do cortineiro com 15 cm de profundidade por 15 cm de altura garante que as ondas deslizem livres.'
      ),
      { t: 'table', h2: 'Especificações técnicas da Cortina Wave Shine', sub: 'Parâmetros reais utilizados pela nossa oficina e equipe de instalação.', head: ['Item técnico', 'Opções que trabalhamos', 'Indicação prática do Isani'], rows: [
        ['Proporção de tecido', '2:1, 2,5:1 e 3:1', 'Define o volume de pano (de 2 m a 3 m de tecido para cada 1 m de trilho)'],
        ['Cordão espaçador', '0,4, 0,5 e 0,8', 'Técnica exclusiva que reduz o espaço entre as ondas para não esgarçar'],
        ['Medida do cortineiro', 'Mínimo 15 x 15 cm', '15 cm de profundidade por 15 cm de altura para trabalhar com bastante espaço'],
        ['Forro Slim (reto)', 'Painel reto no trilho traseiro', 'Melhor escolha para economizar profundidade dentro do cortineiro'],
        ['Forros em prega', 'Tombada, plissada, fêmea e macho', 'Dão mais corpo ao forro translúcido ou blackout sem exigir cortineiro gigante'],
        ['Duplo Wave (frente + forro)', '11 cm entre os dois trilhos', 'Exige cortineiro mais profundo para as ondas da frente e de trás não se tocarem'],
        ['Tecido e gramatura', 'Acima de 170 g/m² (até 10% linho ou 100% poliéster)', 'Garante peso para a onda cair reta, sem armar e sem encolher na lavagem'],
      ] },
      { t: 'guides', kicker: 'Guias técnicos sobre Cortina Wave', h2: 'Tudo o que você precisa saber antes de encomendar a sua <em>Wave</em>', sub: 'Artigos e vídeos reais das nossas instalações no Sul Fluminense.', items: [
        ['/blog/quantidade-de-tecido-para-cortina-wave/', 'Cálculo e cortineiro', 'Quantidade de tecido para cortina Wave: 2:1, 2,5:1 e 3:1', 'Entenda o cordão espaçador 0,4, 0,5 e 0,8, os tipos de forro e o cortineiro 15x15 cm.'],
        ['/blog/linho-para-cortinas/', 'Tecido ideal', 'Linho para cortinas: por que a gramatura define a onda', 'Por que usamos tecidos acima de 170 g/m² e poliéster com toque de linho para a Wave não armar.'],
        ['/blog/bainha-de-cortina/', 'Acabamento de base', 'Bainha dupla de 15 a 20 cm na cortina Wave', 'Como o peso da barra dupla mantém as ondas alinhadas até beijar o piso.'],
        ['/videos/cortina-wave-linho-barra-do-pirai/', 'Vídeo em Barra do Piraí', 'Cortina Wave em linho instalada em Barra do Piraí', 'Veja em movimento o deslize e o alinhamento das ondas em um projeto residencial real.'],
        ['/videos/cortina-motorizada-wave-resende/', 'Vídeo em Resende', 'Cortina Wave motorizada em Resende', 'Assista à abertura silenciosa da cortina Wave automatizada pela nossa equipe.'],
        ['/blog/tipos-de-forro-para-cortina/', 'Controle de luz', 'Como escolher o forro certo para a sua cortina Wave', 'Translúcido, semi blackout 70% ou blackout 100%: qual colocar atrás da sua Wave.'],
      ] },
      { t: 'proof' },
    ],
    faq: [
      ['Quais são as proporções de tecido da cortina Wave?', 'Confeccionamos a cortina Wave nas proporções 2:1 (2 metros de tecido para cada 1 metro de trilho), 2,5:1 (2,50 metros por metro) e 3:1 (3 metros por metro). Quanto maior a proporção, mais profundas e cheias ficam as ondas.'],
      ['Qual o tamanho mínimo do cortineiro de gesso para a cortina Wave?', 'O tamanho mínimo que exigimos para trabalhar com bastante espaço na cortina Wave com forro é 15x15 cm: 15 cm de largura (profundidade interna) por 15 cm de altura.'],
      ['Quais medidas de cordão espaçador vocês utilizam?', 'Trabalhamos com cordões espaçadores de 0,4, 0,5 e 0,8, aplicando uma técnica na confecção que reduz o espaço entre as ondas para deixar o caimento mais próximo e elegante.'],
      ['Qual forro vai atrás da cortina Wave?', 'Podemos usar o forro slim (reto, sem prega, igual a um painel), forro em prega tombada, prega plissada, prega fêmea, prega macho ou até forro no modelo Wave. Para usar o forro também em Wave, é necessário deixar 11 cm de distância entre a cortina da frente e a de trás para as ondas não se tocarem.'],
      ['A cortina Wave pode ser motorizada?', 'Sim. O trilho motorizado da cortina Wave conta inclusive com acionamento inteligente por toque (Touch Motion), além de controle remoto, aplicativo e comando de voz.'],
    ],
    links: [['/cortinas/', 'Cortinas sob medida'], ['/blackout-e-forros/', 'Blackout e forros'], ['/cortina-motorizada/', 'Cortina motorizada'], ['/trilhos-e-acionamentos/', 'Trilhos e acionamentos'],
            ['/portfolio/', 'Projetos reais'], ['/videos/', 'Vídeos'], ['/persianas/', 'Persianas'], ['/cidades-atendidas/', 'Cidades atendidas']],
  },

  // ------------------------------------------------------- CORTINA MOTORIZADA
  {
    dir: 'cortina-motorizada',
    title: 'Cortina e Persiana Motorizada: Elétrica, Bateria e Touch Motion | ShineCortinas',
    description: 'Cortina e persiana motorizada com garantia de até 5 anos. Motores elétricos ou a bateria (carga de ~6 meses), sistema Touch Motion e integração com Alexa.',
    kicker: 'Automação',
    h1: 'Cortina motorizada: a janela que obedece <em>ao seu toque e à sua voz</em>',
    lead: 'Mais do que abrir a cortina pela Alexa, pelo celular ou pelo controle remoto, a motorização preserva o tecido e multiplica a vida útil do conjunto, especialmente em pés-direitos duplos e grandes vãos. Trabalhamos com motores elétricos e opções a bateria recarregável, com até 5 anos de garantia.',
    hero: '/automacao.avif',
    heroAlt: 'Cortina motorizada sendo acionada por controle remoto em sala de estar',
    blocos: [
      { t: 'prose', h2: 'Sistema Touch Motion e o que acontece quando acaba a energia', p: [
        'Muita gente tem receio de motorizar a cortina da sala ou do quarto e ficar com ela travada se faltar luz na rua. Na <strong>cortina motorizada de tecido (trilho motorizado)</strong>, você consegue abrir e fechar a cortina normalmente com a mão quando acaba a energia. E no dia a dia com energia, o trilho tem uma inteligência muito prática chamada <strong>Touch Motion</strong>: basta dar um leve puxão no pano e o motor reconhece o movimento, abrindo ou fechando tudo sozinho sem você precisar procurar o controle remoto.',
        'Já nas <strong>persianas motorizadas de enrolar</strong> (como Rolô, Romana e Horizontal de alumínio), o funcionamento é diferente: como o tecido sobe enrolado num tubo horizontal, a engrenagem do motor possui um freio mecânico que trava a peça na falta de energia para ela não despencar (exceto nos modelos Painel e Vertical, que correm na horizontal). Explicamos essa diferença em detalhes no artigo <a href="/blog/como-funciona-persiana-motorizada/">como funciona a persiana motorizada</a>.',
      ] },
      fig(
        cortinaMotorizada,
        0,
        'Inteligência no trilho',
        'O acionamento por toque (Touch Motion) e a abertura manual sem energia',
        'No trilho motorizado de cortina de pano, um leve toque dispara o motor e a embreagem libera o movimento manual se faltar luz.'
      ),
      { t: 'prose', h2: 'Motores a bateria (autonomia média de 6 meses) e pé-direito duplo', p: [
        'Seu apartamento já está pronto e não tem ponto elétrico ao lado do cortineiro? Para diversos modelos de cortinas e persianas, trabalhamos com <strong>motores a bateria interna recarregável</strong> (mediante avaliação técnica dos nossos especialistas para o peso do vão). Dependendo do uso, a carga da bateria dura <strong>em média 6 meses</strong>, e para recarregar basta conectar o cabo carregador como se fosse um celular, sem quebrar gesso nem puxar fio aparente.',
        'Quando o projeto envolve um <strong>pé-direito duplo ou vãos muito largos e pesados</strong>, nós indicamos a motorização sem pensar duas vezes. Puxar uma cortina alta pela mão ou forçar a cordinha todo dia tensiona a costura e os carrinhos. Com o motor conduzindo o peso de forma constante lá em cima, a cortina não sofre tranco e a garantia chega a <strong>até 5 anos nos sistemas motorizados</strong>.',
      ] },
      fig(
        cortinaMotorizada,
        1,
        'Engenharia e durabilidade',
        'Por que motorizar sem pensar duas vezes em pé-direito duplo e grandes vãos',
        'O motor traciona o peso uniformemente pelo trilho superior, protegendo o tecido e ampliando a garantia para até 5 anos.'
      ),
      { t: 'table', h2: 'Comparativo: Cortina de Tecido Motorizada vs. Persiana Motorizada', sub: 'Entenda como cada sistema opera na prática.', head: ['Característica', 'Cortina de Tecido Motorizada (Trilho)', 'Persiana Motorizada (Rolô, Romana e Horizontal)'], rows: [
        ['Alimentação disponível', 'Ponto elétrico (110V/220V) ou motor a bateria (sob consulta)', 'Ponto elétrico (110V/220V) ou motor a bateria (sob consulta)'],
        ['Duração média da bateria', 'Cerca de 6 meses por carga (conforme o uso)', 'Cerca de 6 meses por carga (conforme o uso)'],
        ['Se acabar a energia elétrica', 'Abre e fecha normalmente com a mão pelo trilho', 'Fica travada pelo freio da engrenagem (exceto Painel e Vertical)'],
        ['Acionamento por toque no pano', 'Sim (sistema inteligente Touch Motion)', 'Acionamento por controle remoto, app ou comando de voz'],
        ['Casa conectada (IoT)', 'Compatível com Alexa, Google Home e Apple Home', 'Compatível com Alexa, Google Home e Apple Home'],
        ['Garantia Shine', 'Até 5 anos no sistema motorizado', 'Até 5 anos no sistema motorizado'],
      ] },
      { t: 'guides', kicker: 'Guias e vídeos de automação', h2: 'Veja os detalhes técnicos da <em>motorização</em>', sub: 'Artigos escritos pelo Isani e vídeos reais de projetos automatizados entregues pela Shine.', items: [
        ['/blog/por-que-escolher-cortina-motorizada/', 'Cortina de tecido', 'Por que escolher cortina motorizada: Touch Motion e bateria', 'Como funciona o reconhecimento de toque no pano, a abertura sem energia e a vantagem no pé-direito duplo.'],
        ['/blog/como-funciona-persiana-motorizada/', 'Persianas técnicas', 'Como funciona a persiana motorizada: motores e modelos', 'Por que as persianas de enrolar travam na falta de luz e quando usar motor a bateria ou ponto elétrico.'],
        ['/videos/cortina-motorizada-wave-resende/', 'Vídeo em Resende', 'Cortina motorizada Wave em Resende', 'Assista ao deslizamento contínuo e silencioso de uma cortina Wave motorizada instalada pela nossa equipe.'],
        ['/videos/cortina-screen-motorizada-mangaratiba/', 'Vídeo em Mangaratiba', 'Persiana Screen motorizada em grande vão', 'Veja na prática o recolhimento automatizado de telas solares em área envidraçada.'],
      ] },
      { t: 'proof' },
    ],
    faq: [
      ['Preciso quebrar a parede se não tiver tomada perto da janela?', 'Não necessariamente. Trabalhamos com motores a bateria interna recarregável para diversos modelos de cortinas e persianas (mediante consulta com nossos especialistas para avaliar o peso e o vão). A carga dura em média 6 meses dependendo do uso.'],
      ['O que acontece com a cortina ou persiana motorizada se acabar a luz?', 'Na cortina motorizada de pano (trilho motorizado), você consegue abrir e fechar normalmente com a mão. Já nas persianas motorizadas que funcionam enrolando na horizontal (Rolô, Romana e Horizontal de alumínio), o sistema de engrenagem trava o tubo na falta de luz para a peça não descer sozinha, exceto nos modelos Painel e Vertical.'],
      ['Como funciona o sistema Touch Motion da cortina motorizada?', 'É um recurso inteligente do trilho motorizado: quando você dá um leve toque ou puxão no tecido indicando a direção, o motor reconhece o movimento e abre ou fecha a cortina inteira sozinho, dispensando o controle remoto.'],
      ['Por que a motorização é tão indicada para pé-direito duplo e vãos grandes?', 'Porque em cortinas muito altas e largas o peso do tecido é grande. O motor puxa tudo pelo topo com força constante, evitando que alguém force a cordinha ou puxe a barra lateral. Isso aumenta a vida útil da cortina e garante até 5 anos de garantia na motorização.'],
      ['Funciona com Alexa, Google Home e celular?', 'Sim. Os motores IoT de 7ª geração funcionam por controle remoto, aplicativo no celular e comando de voz (Alexa, Google Home e Apple Home), permitindo inclusive programar horários de abertura e fechamento.'],
    ],
    links: [['/cortinas/', 'Cortinas sob medida'], ['/persianas/', 'Persianas técnicas'], ['/cortina-wave/', 'Cortina wave'], ['/trilhos-e-acionamentos/', 'Trilhos e acionamentos'],
            ['/blog/por-que-escolher-cortina-motorizada/', 'Artigo sobre motorização'], ['/videos/', 'Vídeos'], ['/portfolio/', 'Projetos reais'], ['/cidades-atendidas/', 'Cidades atendidas']],
  },

  // -------------------------------------------------- TRILHOS E ACIONAMENTOS
  {
    dir: 'trilhos-e-acionamentos',
    title: 'Trilhos e Acionamentos para Cortina: Trilho Suíço, Varão e Cortineiro | ShineCortinas',
    description: 'Trilho suíço em alumínio, cortineiro 15x15 cm, trilho triplo com transpasse de 15 cm e varão de 19 mm ou 28 mm com suporte central. Veja como escolher.',
    kicker: 'Trilhos e acionamentos',
    h1: 'Trilhos e acionamentos: a engenharia que <em>ninguém vê</em> e todo mundo sente',
    lead: 'O trilho e o acionamento são a fundação mecânica da cortina. São eles que definem se a onda corre leve sem engasgar na emenda, se a luz vaza pelo topo da janela e se uma cortina pesada vai continuar alinhada daqui a dez anos.',
    hero: '/automacao.avif',
    heroAlt: 'Cortina motorizada com acionamento por controle, projeto ShineCortinas',
    blocos: [
      { t: 'prose', h2: 'Trilho no cortineiro (15x15 cm), trilho na laje ou varão aparente?', p: [
        'Sempre que a obra tem rebaixo de gesso, recomendamos planejar um <strong>cortineiro com no mínimo 15 por 15 centímetros</strong> (15 cm de profundidade por 15 cm de altura). Essa medida acomoda com folga o trilho da <a href="/cortina-wave/">cortina Wave</a> e o trilho do forro sem que as ondas raspem no gesso. E quando o ambiente não tem gesso? Nós fixamos o <strong>trilho suíço de alumínio direto na laje</strong>, fazendo a cortina nascer colada no teto para alongar a parede e vedar a luz superior.',
        'Já para quem faz questão da estética do <strong>varão aparente</strong>, dimensionamos a espessura do tubo pelo peso do projeto: <strong>varão de 19 mm</strong> para cortinas leves em vãos menores e <strong>varão de 28 mm</strong> para cortinas encorpadas, blackout ou janelas largas. Acima de <strong>2,00 metros de largura</strong>, instalamos obrigatoriamente o suporte central para o tubo não envergar no meio.',
      ] },
      fig(
        varao,
        0,
        'Engenharia de sustentação',
        'Varão tradicional vs. Tubo Suíço em vãos acima de 2,00 m',
        'Por que o suporte central é obrigatório acima de 2 metros e como o tubo suíço permite que a cortina corra livre por baixo do suporte.'
      ),
      { t: 'prose', h2: 'Trilho simples, duplo e triplo com transpasse central de 15 cm', p: [
        'A escolha do trilho também resolve problemas específicos de luz e espaço. No sistema tradicional de sala ou quarto, usamos o <strong>trilho duplo</strong> (ou dois trilhos paralelos): o tecido principal na frente e o forro translúcido ou blackout correndo independente atrás.',
        'Quando o cliente precisa de escuridão total no quarto e não quer aquele fio de sol passando no meio onde as duas partes do blackout se encontram, instalamos o <strong>trilho triplo com transpasse central de 15 cm</strong>. Nele, uma banda do blackout corre em um canal e a outra banda corre no canal vizinho, cruzando 15 centímetros no centro da janela. E na montagem do varão duplo, sempre posicionamos o blackout no suporte traseiro (colado na parede) e a cortina decorativa no suporte dianteiro.',
      ] },
      fig(
        varao,
        1,
        'Montagem em camada dupla',
        'Como posicionamos o forro blackout e o tecido principal no suporte duplo',
        'O blackout fica no canal traseiro próximo ao vidro para barrar a luz na origem, enquanto o tecido nobre veste a frente.'
      ),
      { t: 'table', h2: 'Qual estrutura escolher para a sua janela', sub: 'Comparativo técnico entre as soluções de fixação e acionamento da Shine.', head: ['Sistema de fixação', 'Medida / Especificação técnica', 'Onde entrega o melhor resultado'], rows: [
        ['Trilho dentro do cortineiro', 'Cortineiro mínimo de 15 x 15 cm', 'Esconde toda a ferragem e o cabeçote, ideal para cortina Wave com forro'],
        ['Trilho suíço direto na laje', 'Perfil de alumínio fixado no teto', 'Ambientes sem rebaixo de gesso que pedem cortina do teto ao chão sem vazar luz'],
        ['Trilho triplo com transpasse', 'Sobreposição central de 15 cm no blackout', 'Quartos e suítes que exigem vedação total da fresta central entre os panos'],
        ['Varão aparente de 19 mm', 'Tubo de 19 mm (suporte central acima de 2 m)', 'Janelas compactas com cortinas leves de voil ou linho sem forro pesado'],
        ['Varão aparente de 28 mm / Tubo Suíço', 'Tubo reforçado de 28 mm', 'Cortinas pesadas, duplas ou vãos largos que precisam de firmeza sem selar'],
        ['Trilho motorizado com Touch Motion', 'Elétrico ou a bateria (garantia até 5 anos)', 'Pés-direitos duplos, grandes vãos de sala e automação residencial IoT'],
      ] },
      { t: 'guides', kicker: 'Guias técnicos de instalação', h2: 'Leia os artigos do Isani sobre <em>trilhos, varões e medidas</em>', sub: 'Veja na prática como planejar o cortineiro e escolher a ferragem certa.', items: [
        ['/blog/varao-para-cortina/', 'Varão ou trilho', 'Varão para cortina: medidas de 19 mm e 28 mm e suporte central', 'Quando usar varão aparente, tubo suíço deslizante ou trilho fixado direto no teto.'],
        ['/blog/quantidade-de-tecido-para-cortina-wave/', 'Cortineiro 15x15 cm', 'O cortineiro 15x15 cm e o cordão espaçador da Wave', 'Por que a profundidade do gesso e o cordão 0,4, 0,5 e 0,8 mudam o movimento da cortina.'],
        ['/blog/como-escurecer-quarto-sala-tv/', 'Trilho triplo', 'Como funciona o trilho triplo com transpasse de 15 cm', 'O recurso técnico que elimina a fresta de luz no encontro central do blackout.'],
        ['/blog/por-que-escolher-cortina-motorizada/', 'Trilho motorizado', 'Trilho motorizado com sistema Touch Motion', 'Como o trilho inteligente reconhece o toque na cortina e abre manualmente se faltar energia.'],
      ] },
      { t: 'proof' },
    ],
    faq: [
      ['Trilho ou varão: qual é melhor para a minha cortina?', 'Sempre que o objetivo é um acabamento arquitetônico limpo do teto ao chão (especialmente na cortina Wave) ou vedar a entrada de luz pelo topo, o trilho de alumínio no cortineiro ou direto na laje é a melhor escolha. O varão é indicado quando não há gesso e você quer que a ferragem apareça como detalhe decorativo.'],
      ['Qual medida devo deixar no cortineiro de gesso?', 'Pedimos no mínimo 15 por 15 centímetros (15 cm de profundidade por 15 cm de altura) para trabalhar com folga na cortina Wave com forro. Se o projeto tiver tanto a cortina da frente quanto o forro no modelo Wave, é preciso considerar também 11 cm de distância entre os dois trilhos.'],
      ['Quando usar varão de 19 mm e quando usar varão de 28 mm?', 'O varão de 19 mm serve para janelas menores e cortinas leves de uma única camada. Já o varão de 28 mm é muito mais robusto, indicado para vãos largos, cortinas duplas ou tecidos encorpados com blackout, evitando que o tubo envergue.'],
      ['Por que o suporte central é obrigatório acima de 2 metros no varão?', 'Porque qualquer tubo acima de 2,00 metros de largura sofre flexão no meio com o peso da cortina. Com o suporte central o varão fica 100% reto, dividindo a cortina em duas bandas simétricas ou usando tubo suíço deslizante para correr por baixo do suporte.'],
      ['O que é o trilho triplo com transpasse de 15 cm?', 'É um trilho com três canais onde as duas bandas do forro blackout correm em pistas separadas e se cruzam por 15 centímetros no meio da janela, eliminando aquele risco de claridade central nos quartos.'],
    ],
    links: [['/cortina-motorizada/', 'Cortina motorizada'], ['/cortina-wave/', 'Cortina wave'], ['/cortinas/', 'Cortinas sob medida'], ['/persianas/', 'Persianas técnicas'],
            ['/metodo/', 'Como funciona'], ['/portfolio/', 'Projetos reais'], ['/faq/', 'Perguntas frequentes'], ['/cidades-atendidas/', 'Cidades atendidas']],
  },

  // ------------------------------------------------------------------ MÉTODO
  {
    dir: 'metodo',
    title: 'Como Funciona: Consultoria e Instalação | ShineCortinas',
    description: 'Do primeiro contato à instalação: consultoria gratuita em casa, medição a laser, projeto aprovado por você, confecção sob medida e instalação pela nossa equipe.',
    kicker: 'Como funciona',
    h1: 'Do primeiro contato à instalação, <em>sem surpresa</em>',
    lead: 'A Shine trabalha com consultoria em domicílio: o consultor vai até a sua casa com o mostruário completo, mede cada janela a laser e apresenta as opções no seu próprio ambiente. Você decide com calma, sem sair de casa e sem pressão.',
    hero: '/isani-consultoria.avif', heroSrcset: '/isani-consultoria-800.avif 800w, /isani-consultoria.avif 1108w', heroW: 1108, heroH: 1484, heroPessoa: true,
    heroAlt: 'Isani Oliveira conferindo o caimento de uma cortina de linho durante a instalação, com a equipe ShineCortinas ao fundo',
    blocos: [
      { t: 'steps6' },
      { t: 'prose', h2: 'Por que a medição é responsabilidade nossa', p: [
        'Quem compra pela internet mede sozinho, e o erro de medida é problema do cliente. No modelo da Shine, a medição é feita pela nossa equipe, com equipamento a laser, e a responsabilidade pelo resultado é nossa.',
        'É essa diferença que evita o retrabalho: cortina curta, trilho no lugar errado, tecido que não fecha o vão.',
      ] },
      { t: 'compare' },
      { t: 'proof' },
    ],
    faq: [
      ['Como funciona a consultoria gratuita em domicílio?', 'O consultor vai até a sua casa com todo o mostruário de tecidos, trilhos e sistemas. Mede cada janela e vão com precisão a laser, apresenta as opções adequadas ao ambiente e as condições, incluindo o parcelamento em até 12x. É gratuito e sem compromisso.'],
      ['Tenho que ir até a loja?', 'Não. Nossa base operacional fica em Volta Redonda e atendemos exclusivamente no modelo de consultoria em domicílio: o consultor vai até você com todo o mostruário.'],
      ['Quanto tempo leva para instalar?', 'Trabalhamos exclusivamente sob medida: após a medição a laser, cada peça é confeccionada para o seu vão. Quando fica pronta e agendamos a entrega, o serviço de instalação em si leva poucas horas em uma única visita na maioria dos projetos, deixando o ambiente limpo e pronto.'],
      ['Qual a garantia?', 'A garantia é de 1 ano nas cortinas e persianas não motorizadas e chega a até 5 anos nos projetos motorizados.'],
      ['Como posso parcelar?', 'Em até 12x no cartão de crédito. As condições são apresentadas durante a consultoria em domicílio, junto com o projeto.'],
    ],
    links: [['/cortinas/', 'Cortinas sob medida'], ['/persianas/', 'Persianas técnicas'], ['/portfolio/', 'Projetos reais'], ['/videos/', 'Vídeos'],
            ['/sobre/', 'Sobre a Shine'], ['/faq/', 'Perguntas frequentes'], ['/contato/', 'Contato'], ['/cidades-atendidas/', 'Cidades atendidas']],
  },

  // ------------------------------------------------------------------- SOBRE
  {
    dir: 'sobre',
    title: 'Sobre a ShineCortinas: Desde 2009 no Sul Fluminense | ShineCortinas',
    description: 'Fundada em 2009 e dirigida por Isani Oliveira, a ShineCortinas atende 15 cidades do Sul Fluminense com equipe própria, do consultor ao instalador.',
    kicker: 'Sobre a Shine',
    h1: 'Desde 2009 medindo, confeccionando e <em>instalando</em>',
    lead: 'A ShineCortinas é uma empresa de cortinas e persianas sob medida com base em Volta Redonda, no Rio de Janeiro. Desde 2009 atende o Sul Fluminense com equipe própria, do consultor que vai à sua casa ao instalador que fecha o projeto.',
    hero: '/isani-consultoria.avif', heroSrcset: '/isani-consultoria-800.avif 800w, /isani-consultoria.avif 1108w', heroW: 1108, heroH: 1484, heroPessoa: true,
    heroAlt: 'Isani Oliveira conferindo o caimento de uma cortina de linho durante a instalação, com a equipe ShineCortinas ao fundo',
    blocos: [
      { t: 'proof' },
      { t: 'ceo' },
      { t: 'figure', kicker: 'Equipe própria', h2: 'Quem mede, confecciona e instala', sub: 'Consultores e instaladores da própria Shine: do primeiro contato ao acabamento, sem terceirização.', src: '/equipe-shine.avif', srcset: '/equipe-shine-800.avif 800w, /equipe-shine.avif 1374w', w: 1374, h: 1145, alt: 'Equipe da ShineCortinas reunida, de uniforme, com Isani Oliveira ao centro', cap: 'A equipe ShineCortinas, com Isani Oliveira ao centro.' },
      { t: 'prose', h2: 'Onde atendemos', p: [
        'São 15 cidades do Sul Fluminense: Volta Redonda, Barra Mansa, Resende, Itatiaia, Penedo, Visconde de Mauá, Maromba, Porto Real, Pinheiral, Piraí, Barra do Piraí, Valença, Vassouras, Engenheiro Paulo de Frontin e Miguel Pereira. Cada uma tem <a href="/cidades-atendidas/">a sua própria página</a>, com as perguntas e os projetos de lá.',
        'Além das residências, a Shine atende pousadas, chalés, hotéis e ambientes comerciais, com experiência especial em projetos para pousadas da região serrana.',
      ] },
      { t: 'prose', h2: 'Quem confia no padrão Shine', p: [
        'Entre os projetos corporativos entregues estão UNIMED, Volkswagen, CSN, Banco do Brasil, Sicredi e OAB.',
      ] },
    ],
    faq: [
      ['O que é a ShineCortinas e o que ela oferece?', 'A ShineCortinas é uma empresa especializada em cortinas e persianas sob medida, com base em Volta Redonda (RJ), atendendo todo o Sul Fluminense desde 2009 com consultoria gratuita em domicílio, medição a laser, confecção e instalação por equipe própria.'],
      ['Há quanto tempo a ShineCortinas existe?', 'Desde 2009 no Sul Fluminense, com mais de 9.000 ambientes transformados e nota 4,9 no Google, com 297 avaliações.'],
      ['A ShineCortinas tem loja física?', 'Não trabalhamos com loja física aberta ao público. Nossa base fica em Volta Redonda (RJ) e atendemos exclusivamente no modelo de consultoria em domicílio: o consultor vai até a sua casa com o mostruário completo.'],
      ['Vocês atendem pousadas e ambientes comerciais?', 'Sim. A ShineCortinas atende residências, pousadas, chalés, hotéis e ambientes comerciais, com experiência especial em projetos para pousadas na região serrana do Sul Fluminense.'],
    ],
    links: [['/metodo/', 'Como funciona'], ['/portfolio/', 'Projetos reais'], ['/videos/', 'Vídeos'], ['/cidades-atendidas/', 'Cidades atendidas'],
            ['/cortinas/', 'Cortinas'], ['/persianas/', 'Persianas'], ['/faq/', 'Perguntas frequentes'], ['/contato/', 'Contato']],
  },

  // --------------------------------------------------------------- PORTFÓLIO
  {
    dir: 'portfolio',
    title: 'Portfólio: Projetos Reais de Cortinas e Persianas | ShineCortinas',
    description: 'Ambientes medidos, confeccionados e instalados pela equipe da ShineCortinas no Sul Fluminense. Cortina wave, blackout, motorizada, screen e persiana de madeira.',
    kicker: 'Projetos reais',
    h1: 'Ambientes que a nossa equipe <em>entregou</em>',
    lead: 'Cada projeto abaixo foi medido, confeccionado e instalado pela equipe da Shine. Acabamento de alfaiataria sob medida: é o resultado que o cliente vê ao chegar em casa.',
    hero: '/hero-sala.avif',
    heroAlt: 'Sala com cortina sob medida instalada pela ShineCortinas',
    blocos: [
      { t: 'gallery' },
      { t: 'prose', h2: 'Quer ver em movimento?', p: [
        'A página de <a href="/videos/">vídeos</a> reúne instalações e projetos entregues, incluindo cortina wave em linho em Barra do Piraí, screen motorizada e cortina motorizada wave em Resende.',
      ] },
      { t: 'proof' },
    ],
    faq: [
      ['As fotos são de projetos reais?', 'Sim. Todos os ambientes mostrados foram medidos, confeccionados e instalados pela equipe da ShineCortinas.'],
      ['Posso ver projetos na minha cidade?', 'Sim. Cada uma das 15 cidades atendidas tem a sua própria página, com perguntas e conteúdo locais. Comece pela lista de cidades atendidas.'],
      ['Vocês atendem projetos corporativos?', 'Sim. Entre os projetos entregues estão UNIMED, Volkswagen, CSN, Banco do Brasil, Sicredi e OAB, além de pousadas e hotéis da região serrana.'],
    ],
    links: [['/videos/', 'Vídeos'], ['/cortinas/', 'Cortinas sob medida'], ['/persianas/', 'Persianas técnicas'], ['/cortina-wave/', 'Cortina wave'],
            ['/cortina-motorizada/', 'Cortina motorizada'], ['/blackout-e-forros/', 'Blackout e forros'], ['/metodo/', 'Como funciona'], ['/cidades-atendidas/', 'Cidades atendidas']],
  },

  // ----------------------------------------------------------------- CONTATO
  {
    dir: 'contato',
    title: 'Contato e Consultoria Gratuita pelo WhatsApp | ShineCortinas',
    description: 'Fale com um consultor da ShineCortinas pelo WhatsApp e agende a consultoria gratuita em domicílio no Sul Fluminense. Sede em Volta Redonda (RJ).',
    kicker: 'Contato',
    h1: 'Fale com um consultor <em>de verdade</em>',
    lead: 'Sem robô, sem formulário e sem espera. Você manda uma mensagem no WhatsApp e um consultor responde em minutos para entender o seu ambiente e, se você quiser, agendar a consultoria gratuita em casa.',
    hero: '/cortina-sob-medida.avif',
    heroAlt: 'Sala com cortina de linho sob medida, projeto ShineCortinas',
    blocos: [
      { t: 'contato' },
      { t: 'prose', h2: 'Como funciona o primeiro contato', p: [
        'Você não precisa saber o que quer. A conversa começa pelo ambiente: qual cômodo, o que incomoda hoje, se é sol, claridade, privacidade ou acabamento. A partir daí o consultor indica os caminhos e, se fizer sentido, marca a visita.',
        'A consultoria é gratuita, sem compromisso, e acontece no dia e horário que funcionar para você.',
      ] },
      { t: 'proof' },
    ],
    faq: [
      ['Como agendo a consultoria gratuita?', 'Pelo WhatsApp (24) 99329-8763. Um consultor responde em minutos, entende o seu ambiente e agenda a visita no dia e horário que funcionar para você.'],
      ['Vocês atendem fora de Volta Redonda?', 'Sim. A ShineCortinas atende 15 cidades do Sul Fluminense: Volta Redonda, Barra Mansa, Resende, Itatiaia, Penedo, Visconde de Mauá, Maromba, Porto Real, Pinheiral, Piraí, Barra do Piraí, Valença, Vassouras, Engenheiro Paulo de Frontin e Miguel Pereira.'],
      ['A visita tem custo?', 'Não. A consultoria em domicílio é gratuita e sem compromisso.'],
    ],
    links: [['/metodo/', 'Como funciona'], ['/cortinas/', 'Cortinas'], ['/lavagem-de-cortinas/', 'Lavagem de cortinas'], ['/persianas/', 'Persianas'], ['/portfolio/', 'Projetos reais'],
            ['/faq/', 'Perguntas frequentes'], ['/sobre/', 'Sobre a Shine'], ['/videos/', 'Vídeos'], ['/cidades-atendidas/', 'Cidades atendidas']],
  },

  // --------------------------------------------------- LAVAGEM DE CORTINAS
  {
    dir: 'lavagem-de-cortinas',
    title: 'Lavagem de Cortinas em Volta Redonda, Resende e Região | ShineCortinas',
    description: 'Lavagem e secagem vertical de cortinas de tecido com retirada e reinstalação em casa. Revisão de deslizantes, costuras, trilhos e ajuste de bainha com garantia Shine.',
    kicker: 'Lavagem de cortinas',
    h1: 'Lavagem e secagem vertical para a sua cortina <em>não perder o DNA</em>',
    lead: 'A equipe da Shine vai até a sua casa, retira as cortinas de tecido, faz a lavagem e a secagem na vertical para manter os vincos e as dobras originais, passa e reinstala tudo no lugar. E enquanto a cortina está no nosso ateliê, revisamos deslizantes, costuras, trilhos e fazemos o ajuste de bainha se o tecido encolher.',
    hero: '/lavagem-vertical-cortinas.avif',
    heroSrcset: '/lavagem-vertical-cortinas-800.avif 800w, /lavagem-vertical-cortinas.avif 1376w',
    heroW: 1376,
    heroH: 768,
    heroAlt: 'Especialista da ShineCortinas alinhando e vaporizando na vertical as ondas de uma cortina sob medida',
    blocos: [
      { t: 'prose', h2: 'Por que lavar de outro jeito estraga o caimento da cortina', p: [
        'Uma cortina sob medida tem muitos metros de tecido trabalhado, entretela, pregas medidas na fita e barra dupla alinhada no fio. Quando você lava uma peça dessas de outro modo, batendo embolada em tambor ou em lavanderia comum de roupa, <strong>o tecido perde o DNA dele</strong> e perde aquele caimento bonito.',
        'É por isso que na lavanderia da Shine utilizamos o <strong>modo de lavagem e secagem vertical</strong>. Mantemos os vincos e as dobras originais da cortina do começo ao fim, evitando que o tecido danifique e garantindo que ela volte para a sua janela com o mesmo prumo de quando foi confeccionada.',
      ] },
      fig(
        lavagem,
        0,
        'Lavagem e secagem vertical',
        'Como preservamos os vincos e o DNA do tecido',
        'Diferente da lavagem comum de tambor que torce a fibra, nosso processo vertical mantém as pregas e ondas alinhadas.'
      ),
      { t: 'cards', h2: 'O serviço completo da Shine, da retirada à reinstalação', sub: 'Você não precisa subir em escada nem carregar peso. Nossa equipe própria cuida de tudo.', items: [
        { tag: 'Passo 1 · Na sua casa', h: 'Retirada e conferência dos trilhos', p: 'Nossa equipe vai até a sua residência, retira as cortinas com todo cuidado (inclusive em pé-direito alto) e já avalia se algum trilho precisa de reforço ou alinhamento.', img: '/equipe-shine-800.avif', alt: 'Equipe própria da ShineCortinas uniformizada' },
        { tag: 'Passo 2 · Lavanderia Shine', h: 'Lavagem, secagem e passadoria vertical', p: 'Lavamos e secamos a cortina na vertical para preservar a memória das ondas e os vincos da prega. Depois passamos toda a peça respeitando a fibra do tecido e do forro.', img: '/lavagem-vertical-cortinas-800.avif', alt: 'Acabamento e vaporização vertical de cortina na ShineCortinas' },
        { tag: 'Passo 3 · Revisão de ateliê', h: 'Deslizantes, costuras e ajuste de bainha', p: 'Analisamos se há algum deslizante solto para recolocar, reforçamos costuras soltas e, se o tecido tiver encolhido na lavagem, fazemos o ajuste de bainha na nossa oficina.', img: '/linha-puro.avif', alt: 'Detalhe de tecido e acabamento de alfaiataria ShineCortinas' },
        { tag: 'Passo 4 · Entrega pronta', h: 'Reinstalação com caimento perfeito', p: 'Voltamos até a sua casa, reforçamos os trilhos se necessário, penduramos a cortina higienizada e deixamos as dobras e a barra perfeitamente alinhadas no piso.', img: '/poster-lavagem-cortinas.avif', alt: 'Sala com cortina Wave higienizada e reinstalada pela ShineCortinas' },
      ] },
      fig(
        lavagem,
        1,
        'Garantia exclusiva de ateliê',
        'Os 4 pontos de revisão que nenhuma lavanderia comum entrega',
        'Só quem é fábrica de cortinas e tem equipe própria de instalação consegue cuidar do tecido, da costura e do trilho ao mesmo tempo.'
      ),
      { t: 'prose', h2: 'A garantia de ajuste de bainha que só a Shine dá', p: [
        'Tem tecido que encolhe na lavagem, principalmente quando possui porcentagem de fibra natural na composição. Quando você manda lavar fora, se a cortina encolher 3 ou 4 centímetros e ficar curta demais na janela, ninguém resolve.',
        'Aqui na Shine nós damos essa garantia: quando fazemos a lavagem, conferimos todas as medidas e, <strong>se precisar fazer ajuste de bainha por encolhimento do tecido, o nosso ateliê faz</strong>. Assim a sua cortina volta beijando o piso exatamente como deve ser.',
      ] },
      { t: 'table', h2: 'O que lavamos e quais cidades atendemos', sub: 'Trabalhamos exclusivamente com cortinas de tecido nas 6 cidades abaixo.', head: ['Item', 'Como funciona na Lavanderia Shine'], rows: [
        ['O que lavamos', 'Apenas cortinas de tecido (de pano): Wave, prega fêmea, macho, americana, tombada, franzida, voil, linho e forros de tecido ou blackout costurado'],
        ['O que não lavamos', 'Não lavamos persianas (não fazemos lavagem de Rolô, Romana, Double Vision, Vertical nem Horizontal)'],
        ['Retirada e entrega', 'Feitas pela equipe própria da Shine na casa do cliente, com reinstalação completa'],
        ['Revisão inclusa', 'Recolocação de deslizantes soltos, reparo de costuras soltas, reforço de trilhos e ajuste de bainha se necessário'],
        ['Cidades atendidas na lavagem', 'Volta Redonda, Barra Mansa, Resende, Barra do Piraí, Piraí e Pinheiral'],
      ] },
      { t: 'guides', kicker: 'Aprenda com quem confecciona', h2: 'Guias técnicos sobre <em>lavagem, bainha e tecidos</em>', sub: 'Entenda como cuidamos de cada detalhe da sua cortina sob medida.', items: [
        ['/blog/lavagem-de-cortinas-sob-medida/', 'Lavanderia Shine', 'Lavagem de cortinas sob medida: secagem vertical e revisão de ateliê', 'Por que lavar de outro jeito faz o tecido perder o DNA e como funciona nosso passo a passo completo.'],
        ['/blog/bainha-de-cortina/', 'Acabamento', 'Bainha de cortina: barra dupla de 15 a 20 cm e ajuste no fio', 'Como a dobra dupla dá peso à cortina e permite ajustar a altura quando necessário.'],
        ['/blog/linho-para-cortinas/', 'Tecidos e fibras', 'Linho para cortinas: composição e gramatura acima de 170 g/m²', 'Por que a composição certa evita que o tecido deforme ou encolha além da conta.'],
        ['/blog/tipos-de-forro-para-cortina/', 'Forros e proteção', 'Tipos de forro para cortina: translúcido, 70% e 100%', 'Como o forro protege o tecido principal contra o sol e como cada material deve ser higienizado.'],
        ['/blog/altura-ideal-da-cortina/', 'Medidas', 'Altura ideal da cortina: do teto ao piso', 'O padrão de 1 cm do chão que mantém a barra limpa e elegante no dia a dia.'],
        ['/cortinas/', 'Cortinas novas', 'Cortinas sob medida: Wave e pregas de alfaiataria', 'Quer renovar um ambiente com uma cortina nova? Conheça nossos tecidos e modelos sob medida.'],
      ] },
      { t: 'proof' },
    ],
    faq: [
      ['Como funciona o serviço de lavagem de cortinas da Shine?', 'A equipe própria da Shine vai até a sua casa, retira as cortinas de tecido, leva para a nossa lavanderia especializada, faz a lavagem e a secagem na vertical mantendo os vincos e as dobras, passa, revisa deslizantes, costuras, trilhos e bainha, e entrega a cortina reinstalada no lugar.'],
      ['Por que vocês utilizam lavagem e secagem vertical?', 'Porque se você lavar e secar uma cortina sob medida de outra forma, batendo embolada em tambor, o tecido perde o DNA dele e perde o caimento. Na lavagem e secagem vertical nós preservamos os vincos e as ondas originais da cortina sem danificar a fibra.'],
      ['Vocês dão garantia de ajuste se a cortina encolher?', 'Sim. Tem tecido que encolhe na lavagem. Por termos ateliê próprio de costura, se a sua cortina precisar de ajuste de bainha após a lavagem, nós fazemos esse ajuste com garantia total, o que nenhuma lavanderia comum faz.'],
      ['O que vocês revisam na cortina e no trilho?', 'Durante o serviço analisamos se tem algum deslizante solto e recolocamos, ajustamos se tiver alguma costura solta, conferimos e reforçamos os trilhos na sua casa se precisar e fazemos ajuste de bainha quando necessário.'],
      ['Vocês lavam persiana Rolô, Romana ou Double Vision?', 'Não. Nosso serviço de lavanderia atende exclusivamente cortinas de tecido (de pano). Não mexemos com lavagem de persiana Romana, Rolô, Double Vision, Vertical ou Horizontal.'],
      ['Em quais cidades vocês atendem a lavagem de cortinas?', 'No momento atendemos o serviço de lavagem de cortinas em 6 cidades do Sul Fluminense: Volta Redonda, Barra Mansa, Resende, Barra do Piraí, Piraí e Pinheiral.'],
    ],
    links: [['/blog/lavagem-de-cortinas-sob-medida/', 'Artigo sobre lavagem vertical'], ['/cortinas/', 'Cortinas sob medida'], ['/cortina-wave/', 'Cortina wave'], ['/blackout-e-forros/', 'Blackout e forros'],
            ['/trilhos-e-acionamentos/', 'Trilhos e acionamentos'], ['/metodo/', 'Como funciona'], ['/cidades-atendidas/', 'Cidades atendidas'], ['/contato/', 'Contato']],
  },
];
