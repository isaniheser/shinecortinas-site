// Conteúdo das páginas de produto e institucionais, no sistema visual "leve".
// FONTE DOS FATOS: as 21 perguntas que já estavam na /faq/ do site, a landing /lp/anuncio-d/,
// a home e as correções do Isani (CLAUDE.md → "Fatos de produto"). Nada foi inventado.
// Itens marcados com CONFIRMAR no comentário aguardam validação do Isani.

export const PAGINAS = [
  // ---------------------------------------------------------------- CORTINAS
  {
    dir: 'cortinas',
    title: 'Cortinas Sob Medida em Volta Redonda e Sul Fluminense | ShineCortinas',
    description: 'Cortinas sob medida com caimento impecável: wave, linho, voil, veludo e blackout. Consultoria gratuita em casa, medição a laser e instalação própria.',
    kicker: 'Cortinas sob medida',
    h1: 'Cortinas sob medida, com o <em>caimento</em> que a foto de loja não mostra',
    lead: 'Cortina sob medida é tecido escolhido para o seu ambiente, medida a laser na sua janela e confeccionada do zero. O que muda o resultado não é só o tecido de frente: é a combinação dele com o forro, o trilho e a instalação.',
    hero: '/cortina-sob-medida.avif',
    heroAlt: 'Sala com cortina de linho sob medida instalada pela ShineCortinas',
    blocos: [
      { t: 'prose', h2: 'O que define uma cortina bem resolvida', p: [
        'Três decisões fazem o resultado: o <strong>tecido decorativo</strong>, que é o que se vê; o <strong>forro</strong>, que fica escondido e decide luz e privacidade; e o <strong>acionamento</strong>, que define o uso no dia a dia.',
        'É por isso que a escolha não se faz por foto. Na consultoria, o consultor leva o mostruário até a sua casa, e você compara os tecidos com a luz real do seu cômodo, na hora do dia em que você mais usa o ambiente.',
      ] },
      { t: 'cards', h2: 'Tecidos que trabalhamos', sub: 'A escolha depende do ambiente, da incidência de sol e do efeito que você procura.', items: [
        { tag: 'Leveza', h: 'Voil', p: 'Tecido leve que filtra a luz e mantém o ambiente claro. Muito usado em camada dupla, com uma segunda cortina por trás.', img: '/duplo.avif' },
        { tag: 'Natural', h: 'Linho', p: 'Textura natural e caimento generoso. É o tecido de quem quer o ar de projeto de arquitetura na sala.', img: '/linha-puro.avif' },
        { tag: 'Sofisticação', h: 'Veludo', p: 'Peso, profundidade de cor e conforto acústico. Indicado para salas de estar e ambientes de receber.', img: '/cortina-sob-medida.avif' },
        { tag: 'Escurecimento', h: 'Blackout', p: 'Tecido que bloqueia a luz. Pode ser o próprio tecido da cortina ou entrar como forro atrás do tecido decorativo.', img: '/blackouts-tecnicos.avif' },
      ] },
      { t: 'prose', h2: 'O forro decide o resultado', p: [
        'O forro é a segunda camada, acoplada atrás do tecido decorativo. Ele existe em dois grupos: o <strong>forro translúcido</strong>, que dá privacidade, protege o tecido de frente do sol e quebra parte da claridade; e o <strong>forro blackout</strong>, em duas versões — <strong>70%</strong>, o semi blackout, que deixa o ambiente em penumbra, e <strong>100%</strong>, que entrega escuro de verdade.',
        'Se o objetivo é quarto realmente escuro, a cortina com forro blackout 100% resolve. Entenda a diferença no artigo <a href="/blog/tipos-de-forro-para-cortina">tipos de forro para cortina</a>.',
      ] },
      { t: 'compare' },
      { t: 'prose', h2: 'Cortina ou persiana?', p: [
        'Cortina é confeccionada em tecido — voil, linho, veludo, blackout — e oferece mais versatilidade estética e controle de caimento. Persiana é estruturada em lâminas (madeira, alumínio, PVC) ou em enrolamento (rolô, double vision) e oferece controle mais preciso da entrada de luz e calor.',
        'A escolha depende do ambiente, da exposição solar e do estilo desejado. Veja também as <a href="/persianas/">persianas técnicas</a>.',
      ] },
      { t: 'proof' },
    ],
    faq: [
      ['Qual a diferença entre cortina e persiana?', 'Cortina é confeccionada em tecido — voil, linho, veludo, blackout — e oferece mais versatilidade estética e controle de caimento. Persiana é estruturada em lâminas (madeira, alumínio, PVC) ou enrolamento (rolô, double vision) e oferece controle mais preciso da entrada de luz e calor. A escolha depende do ambiente, da exposição solar e do estilo desejado.'],
      ['Qual tipo de cortina escolher para sala?', 'Para salas, as opções mais indicadas são: voil com blackout em sistema duplo, que dá leveza durante o dia e escurecimento quando necessário; linho ou tecido texturizado para ambientes com iluminação natural generosa; e cortina wave quando o objetivo é um acabamento arquitetônico limpo. A escolha depende da exposição solar, do pé-direito e do estilo da sala.'],
      ['Qual tecido de cortina é melhor para quarto?', 'Para quartos, o blackout é o mais indicado, especialmente para quem trabalha em turnos, tem filhos pequenos ou quarto com exposição solar intensa. Para quem prefere luz filtrada, o double vision permite ajustar entre o tecido blackout e a luz suave. Para suítes com proposta estética mais elaborada, linho com forro oferece caimento elegante.'],
      ['Vocês lavam e fazem manutenção de cortinas?', 'Sim. A ShineCortinas oferece serviço completo de lavagem e manutenção: retiramos a cortina, mesmo em pé-direito alto, lavamos com tratamento técnico e reinstalamos.'],
      ['Quanto tempo leva para instalar?', 'Na maioria dos projetos, a instalação é concluída no mesmo dia da consultoria. A equipe chega, trabalha com limpeza e sai deixando o ambiente pronto, sem entulho.'],
    ],
    links: [['/cortina-wave/', 'Cortina wave'], ['/blackout-e-forros/', 'Blackout e forros'], ['/cortina-motorizada/', 'Cortina motorizada'], ['/persianas/', 'Persianas técnicas'],
            ['/trilhos-e-acionamentos/', 'Trilhos e acionamentos'], ['/portfolio/', 'Projetos reais'], ['/metodo/', 'Como funciona'], ['/cidades-atendidas.html', 'Cidades atendidas']],
  },

  // --------------------------------------------------------------- PERSIANAS
  {
    dir: 'persianas',
    title: 'Persianas Sob Medida em Volta Redonda e Sul Fluminense | ShineCortinas',
    description: 'Persianas sob medida: rolô, double vision, screen, vertical e de madeira. Controle preciso de luz e calor, com consultoria gratuita em casa e instalação própria.',
    kicker: 'Persianas técnicas',
    h1: 'Persianas sob medida, para controlar a luz <em>no detalhe</em>',
    lead: 'Persiana é estruturada em lâminas — madeira, alumínio, PVC — ou em enrolamento, como o rolô e o double vision. Em relação à cortina, ela oferece controle mais preciso da entrada de luz e de calor, com um desenho mais discreto na janela.',
    hero: '/persiana-motorizada.avif',
    heroAlt: 'Sala com persiana rolô screen instalada pela ShineCortinas',
    blocos: [
      { t: 'cards', h2: 'Os sistemas que trabalhamos', sub: 'Cada um resolve um problema diferente de luz, calor e privacidade.', items: [
        { tag: 'Enrolamento', h: 'Rolô', p: 'O sistema mais discreto. O tecido enrola no topo da janela e desaparece quando aberto. Existe em versão screen, translúcida e blackout.', img: '/persiana-motorizada.avif' },
        { tag: 'Controle solar', h: 'Screen (tela solar)', p: 'Tecido técnico que corta o calor e o reflexo sem esconder a vista da janela. Ideal para salas envidraçadas e home office.', img: '/tela-solar.avif' },
        { tag: 'Dupla função', h: 'Double vision', p: 'Duas faixas de tecido que se alternam: abre para a luz suave, fecha para privacidade, sem trocar de sistema.', img: '/duplo.avif' },
        { tag: 'Natural', h: 'Madeira', p: 'Lâminas de madeira que dão calor visual e controle de luz por inclinação. Para escritórios, cozinhas e varandas.', img: '/madeira.avif' },
        { tag: 'Vãos largos', h: 'Vertical', p: 'Lâminas verticais para janelas e portas largas, com abertura lateral e controle por rotação.', img: '/automacao.avif' },
        { tag: 'Escurecimento', h: 'Blackout 100%', p: 'As persianas também têm material blackout 100%, para quem precisa de escuro no quarto ou no home office.', img: '/blackouts-tecnicos.avif' },
      ] },
      { t: 'prose', h2: 'Como escolher entre eles', p: [
        'A decisão começa pela orientação da janela e pelo uso do ambiente. Janela que recebe sol forte no fim da tarde pede screen ou madeira; quarto de quem dorme de dia pede material blackout 100%; home office com reunião por vídeo pede controle de reflexo.',
        'Na consultoria em domicílio, o consultor mede a laser e apresenta os sistemas no seu próprio ambiente, com a luz daquele horário. Você compara antes de decidir.',
      ] },
      { t: 'proof' },
    ],
    faq: [
      ['Qual a diferença entre cortina e persiana?', 'Cortina é confeccionada em tecido e oferece mais versatilidade estética e controle de caimento. Persiana é estruturada em lâminas (madeira, alumínio, PVC) ou enrolamento (rolô, double vision) e oferece controle mais preciso da entrada de luz e calor.'],
      ['Persiana também escurece por completo?', 'Sim. As persianas têm material com blackout 100%. A escolha entre cortina e persiana é de estética e de uso; o nível de escurecimento depende do material escolhido.'],
      ['Qual persiana é melhor para home office?', 'Para home office, o screen (tela solar) corta o reflexo no monitor e reduz o calor sem esconder a vista. Quando é preciso escurecer para reuniões por vídeo ou projeção, o rolô com material blackout resolve.'],
      ['Persiana de madeira serve para cozinha?', 'Sim. As lâminas dão controle de luz por inclinação e resistem bem ao uso diário. Na consultoria o consultor avalia a exposição a vapor e calor do seu ambiente antes de indicar.'],
      ['Vocês instalam persiana motorizada em apartamento?', 'Sim. O sistema não exige obra: o motor é fixado com acabamento embutido no sanca ou no trilho, sem danificar a estrutura do apartamento.'],
    ],
    links: [['/cortinas/', 'Cortinas sob medida'], ['/cortina-motorizada/', 'Persiana motorizada'], ['/blackout-e-forros/', 'Blackout e forros'], ['/trilhos-e-acionamentos/', 'Trilhos e acionamentos'],
            ['/portfolio/', 'Projetos reais'], ['/videos/', 'Vídeos'], ['/metodo/', 'Como funciona'], ['/cidades-atendidas.html', 'Cidades atendidas']],
  },

  // ------------------------------------------------------- BLACKOUT E FORROS
  {
    dir: 'blackout-e-forros',
    title: 'Blackout e Forros para Cortina: Translúcido, 70% e 100% | ShineCortinas',
    description: 'O forro decide quanta luz entra. Entenda o forro translúcido, o semi blackout de 70% e o blackout 100%, e qual deles resolve o seu ambiente.',
    kicker: 'Blackout e forros',
    h1: 'O forro é a camada que <em>decide</em> quanta luz entra',
    lead: 'O forro se divide em dois grupos. O forro translúcido dá privacidade, protege o tecido decorativo e quebra parte da claridade, sem escurecer. O forro blackout tem duas versões: 70%, o semi blackout, que deixa penumbra, e 100%, que bloqueia a passagem de luz pelo tecido e entrega escuro de verdade.',
    hero: '/blackouts-tecnicos.avif',
    heroAlt: 'Ambiente escurecido com cortina de blackout instalada pela ShineCortinas',
    blocos: [
      { t: 'prose', h2: 'Forro translúcido', p: [
        'Cumpre três funções: dá <strong>privacidade</strong> durante o dia sem fechar o ambiente, <strong>protege o tecido decorativo</strong> da cortina, que fica exposto ao sol todos os dias, e <strong>quebra parte da claridade</strong>.',
        '"Forro translúcido" é o nome do grupo. Dentro dele há mais de um tecido: gabardine (de algodão ou de poliéster), tergal, tergal verão, cetim e gorgurinho. Cada um se comporta de um jeito com a luz e com o caimento, e a escolha é feita na consultoria, junto com o tecido de frente.',
      ] },
      { t: 'prose', h2: 'Forro blackout: 70% e 100%', p: [
        '<strong>Semi blackout (70%)</strong> reduz boa parte da luz e deixa o ambiente em penumbra. Serve para quem quer dormir melhor ou assistir televisão de dia com conforto, sem fazer questão de escuro absoluto.',
        '<strong>Blackout 100%</strong> bloqueia a passagem de luz pelo tecido. É o que entrega escuro de verdade: quem trabalha à noite e dorme de dia, quarto de bebê, quem tem sono leve, sala de projeção. Para quarto realmente escuro, a cortina com forro blackout 100% resolve.',
        'As persianas também têm material com blackout 100%, então a decisão entre cortina e persiana é separada da decisão do nível de escurecimento.',
      ] },
      { t: 'table', h2: 'Qual forro para cada objetivo', head: ['Você quer', 'Forro indicado', 'Resultado'], rows: [
        ['Privacidade de dia', 'Translúcido', 'Ambiente claro, sem exposição para a rua'],
        ['Proteger o tecido do sol', 'Translúcido', 'O tecido de frente dura mais'],
        ['Dormir melhor, sem escuro total', 'Semi blackout (70%)', 'Penumbra'],
        ['Sala de TV confortável de dia', 'Semi blackout (70%)', 'Tela sem reflexo'],
        ['Quarto escuro de verdade', 'Blackout 100%', 'Escuro mesmo ao meio-dia'],
      ] },
      { t: 'proof' },
    ],
    faq: [
      ['O blackout bloqueia toda a luz do quarto?', 'Depende do forro. O forro blackout 100% bloqueia a passagem de luz pelo tecido e é ele que entrega o quarto escuro de verdade. O forro blackout de 70%, chamado de semi blackout, deixa o ambiente em penumbra. Na consultoria o consultor mede a janela e indica o forro certo para o escurecimento que você procura.'],
      ['Qual a diferença entre tecido blackout e forro blackout?', 'O tecido blackout é o próprio tecido da cortina, que já bloqueia a luz. O forro blackout é uma segunda camada acoplada atrás de uma cortina decorativa, somando escurecimento sem abrir mão da estética do tecido de frente.'],
      ['Qual a diferença entre forro translúcido e forro blackout?', 'O forro translúcido dá privacidade, protege o tecido decorativo do sol e quebra parte da claridade, mas não escurece. O forro blackout serve para escurecer e existe em duas versões: 70%, que deixa penumbra, e 100%, que bloqueia a passagem de luz pelo tecido.'],
      ['Quais tecidos servem como forro translúcido?', 'Gabardine (de algodão ou de poliéster), tergal, tergal verão, cetim e gorgurinho. Cada um responde de um jeito à luz e ao caimento, e a escolha é feita na consultoria, junto com o tecido decorativo da frente.'],
      ['Persiana também escurece por completo?', 'Sim. As persianas têm material com blackout 100%.'],
    ],
    links: [['/blog/tipos-de-forro-para-cortina', 'Artigo: tipos de forro'], ['/cortinas/', 'Cortinas sob medida'], ['/persianas/', 'Persianas técnicas'], ['/cortina-wave/', 'Cortina wave'],
            ['/blog/o-que-e-blackout', 'O que é blackout'], ['/portfolio/', 'Projetos reais'], ['/metodo/', 'Como funciona'], ['/cidades-atendidas.html', 'Cidades atendidas']],
  },

  // ------------------------------------------------------------ CORTINA WAVE
  {
    dir: 'cortina-wave',
    title: 'Cortina Wave Sob Medida: Ondas Regulares e Uniformes | ShineCortinas',
    description: 'Cortina wave é o sistema com trilho especial que forma ondas regulares e uniformes no tecido, criando um desenho contínuo do teto ao chão.',
    kicker: 'Cortina wave',
    h1: 'Cortina wave: a onda que fica <em>regular</em> do teto ao chão',
    lead: 'Cortina wave é um sistema com trilho especial que cria ondas regulares e uniformes no tecido, formando um desenho contínuo. É diferente da cortina comum, em que as pregas são costuradas e o volume varia ao longo do vão.',
    hero: '/cortina-sob-medida.avif',
    heroAlt: 'Cortina wave em linho com ondas regulares, projeto ShineCortinas',
    blocos: [
      { t: 'prose', h2: 'Por que a wave virou o padrão de projeto', p: [
        'A onda uniforme dá ao ambiente uma leitura limpa e contínua, sem os volumes irregulares que aparecem quando a prega é costurada de forma manual. É o acabamento que arquitetos costumam especificar quando querem que a cortina acompanhe a arquitetura, e não compita com ela.',
        'O efeito depende do trilho, da quantidade de tecido e da confecção. Não é um tecido específico: você escolhe linho, voil, veludo ou blackout, e o sistema wave define o desenho.',
      ] },
      { t: 'prose', h2: 'Quando a wave é a melhor escolha', p: [
        'Ela rende especialmente bem em vãos largos e pé-direito alto, onde a irregularidade das pregas ficaria evidente. Também é a escolha natural de quem quer uma cortina que atravesse a parede inteira com um desenho só.',
        'Para escurecer, a wave aceita forro: translúcido para privacidade, semi blackout de 70% para penumbra e blackout 100% para escuro total. Veja <a href="/blackout-e-forros/">blackout e forros</a>.',
      ] },
      { t: 'proof' },
    ],
    faq: [
      ['O que é cortina wave?', 'Cortina wave é um sistema com trilho especial que cria ondas regulares e uniformes no tecido, formando um desenho contínuo, diferente da cortina comum em que as pregas são costuradas e o volume varia.'],
      ['A cortina wave aceita blackout?', 'Sim. A wave é um sistema de trilho e confecção, não um tecido. Ela aceita forro translúcido, semi blackout de 70% ou blackout 100%, conforme o escurecimento que você procura.'],
      ['A wave pode ser motorizada?', 'Sim. O sistema wave é compatível com motorização, que costuma render bem justamente em vãos largos e janelas altas, onde a wave é mais usada.'],
      ['Qual tecido combina com cortina wave?', 'Linho, voil e veludo são os mais pedidos. A escolha depende da luz do ambiente e do efeito que você procura, e é feita na consultoria com o mostruário na sua casa.'],
    ],
    links: [['/cortinas/', 'Cortinas sob medida'], ['/blackout-e-forros/', 'Blackout e forros'], ['/cortina-motorizada/', 'Cortina motorizada'], ['/trilhos-e-acionamentos/', 'Trilhos e acionamentos'],
            ['/portfolio/', 'Projetos reais'], ['/videos/', 'Vídeos'], ['/persianas/', 'Persianas'], ['/cidades-atendidas.html', 'Cidades atendidas']],
  },

  // ------------------------------------------------------- CORTINA MOTORIZADA
  {
    dir: 'cortina-motorizada',
    title: 'Cortina e Persiana Motorizada com IoT | ShineCortinas',
    description: 'Cortina e persiana motorizada com sistema IoT de 7ª geração: abre pelo celular, pelo controle ou por voz, com Alexa, Google Home e Apple Home.',
    kicker: 'Automação',
    h1: 'Cortina motorizada: a janela que obedece <em>à sua voz</em>',
    lead: 'A motorização vale especialmente em janelas altas ou de difícil acesso, salas com grandes vãos e ambientes com várias cortinas. O sistema IoT de 7ª geração abre e fecha pelo celular, pelo controle ou por comando de voz.',
    hero: '/automacao.avif',
    heroAlt: 'Cortina motorizada sendo acionada por controle remoto em sala de estar',
    blocos: [
      { t: 'prose', h2: 'Quando a motorização se paga', p: [
        'Em janela alta, cada abertura manual é um esforço, e com o tempo vira uma cortina que ninguém abre. Em sala com vários panos, motorizar transforma cinco gestos em um. E em ambientes de vidro grande, o acionamento programado ajuda a controlar o calor antes de o sol bater.',
        'Também há o cuidado com o tecido: o acionamento correto reduz o manuseio direto do pano, que é onde a cortina costuma sujar e desgastar.',
      ] },
      { t: 'prose', h2: 'Integração com a casa conectada', p: [
        'Os motores são compatíveis com Alexa, Google Home e Apple Home, então a cortina entra nas mesmas rotinas da iluminação e do ar-condicionado. Também funciona por controle e por aplicativo, sem depender de assistente de voz.',
        'Em apartamento, o sistema não exige obra: o motor é fixado com acabamento embutido no sanca ou no trilho, sem danificar a estrutura.',
      ] },
      { t: 'proof' },
    ],
    faq: [
      ['Cortina motorizada vale a pena?', 'Sim, especialmente em janelas altas ou de difícil acesso, salas com grandes vãos e ambientes com múltiplas cortinas. A motorização de 7ª geração permite acionamento por controle, celular ou voz.'],
      ['Vocês instalam persiana motorizada em apartamento?', 'Sim. O sistema não requer obra: o motor é fixado com acabamento embutido no sanca ou no trilho, sem danificar a estrutura do apartamento.'],
      ['Funciona com Alexa e Google Home?', 'Sim. Os motores são compatíveis com Alexa, Google Home e Apple Home, e também funcionam por controle remoto e aplicativo.'],
      ['Qual a garantia da motorização?', 'A garantia parte de 1 ano na instalação e chega a até 8 anos em projetos com motorização.'],
    ],
    links: [['/cortinas/', 'Cortinas sob medida'], ['/persianas/', 'Persianas técnicas'], ['/cortina-wave/', 'Cortina wave'], ['/trilhos-e-acionamentos/', 'Trilhos e acionamentos'],
            ['/blog/por-que-escolher-cortina-motorizada', 'Artigo sobre motorização'], ['/videos/', 'Vídeos'], ['/portfolio/', 'Projetos reais'], ['/cidades-atendidas.html', 'Cidades atendidas']],
  },

  // -------------------------------------------------- TRILHOS E ACIONAMENTOS
  {
    dir: 'trilhos-e-acionamentos',
    title: 'Trilhos e Acionamentos para Cortina Sob Medida | ShineCortinas',
    description: 'Trilho, varão e acionamento definem o uso diário da cortina. Entenda as opções e como a escolha muda o caimento e a durabilidade do projeto.',
    kicker: 'Trilhos e acionamentos',
    h1: 'Trilhos e acionamentos: a parte que <em>ninguém elogia</em> e todo mundo sente',
    lead: 'O trilho e o acionamento não aparecem na foto, mas são eles que definem se a cortina abre com leveza todo dia, se o tecido corre alinhado e se o projeto continua funcionando anos depois.',
    hero: '/automacao.avif',
    heroAlt: 'Trilho e acionamento de cortina instalados pela ShineCortinas',
    blocos: [
      { t: 'prose', h2: 'Trilho ou varão', p: [
        'O trilho aproxima o tecido da parede e dá uma leitura mais limpa, além de ser o que permite sistemas como a <a href="/cortina-wave/">cortina wave</a>. O varão é um elemento aparente, decorativo, e pede mais atenção à saída da bainha e ao volume das pregas.',
        'A escolha entre os dois não é só estética: muda o desenho da cortina, a forma de abrir e o que dá para fazer com o tecido.',
      ] },
      { t: 'prose', h2: 'Acionamento: manual ou motorizado', p: [
        'O acionamento deve ser definido pela frequência de uso e pela ergonomia. Em vãos maiores e janelas altas, a solução motorizada eleva o conforto e preserva o tecido, porque reduz o manuseio direto do pano.',
        'Veja as opções de <a href="/cortina-motorizada/">motorização com IoT</a>, compatíveis com Alexa, Google Home e Apple Home.',
      ] },
      { t: 'proof' },
    ],
    faq: [
      ['Trilho ou varão: qual escolher?', 'O trilho aproxima o tecido da parede, dá uma leitura mais limpa e permite sistemas como a cortina wave. O varão é aparente e decorativo, e pede mais atenção à saída da bainha e ao volume de pregas.'],
      ['Vale motorizar todas as cortinas da casa?', 'Nem sempre. A motorização rende mais em janelas altas, vãos largos e ambientes com várias cortinas. Em janelas de uso simples, o acionamento manual costuma atender bem.'],
      ['O trilho aparece depois de instalado?', 'Depende do projeto. Em muitos casos o trilho fica embutido no sanca ou coberto pelo próprio cabeçote da cortina. Na consultoria o consultor avalia o acabamento do teto antes de indicar.'],
    ],
    links: [['/cortina-motorizada/', 'Cortina motorizada'], ['/cortina-wave/', 'Cortina wave'], ['/cortinas/', 'Cortinas sob medida'], ['/persianas/', 'Persianas técnicas'],
            ['/metodo/', 'Como funciona'], ['/portfolio/', 'Projetos reais'], ['/faq/', 'Perguntas frequentes'], ['/cidades-atendidas.html', 'Cidades atendidas']],
  },

  // ------------------------------------------------------------------ MÉTODO
  {
    dir: 'metodo',
    title: 'Como Funciona: Consultoria em Domicílio e Instalação | ShineCortinas',
    description: 'Do primeiro contato à instalação: consultoria gratuita em casa, medição a laser, projeto aprovado por você, confecção sob medida e instalação pela nossa equipe.',
    kicker: 'Como funciona',
    h1: 'Do primeiro contato à instalação, <em>sem surpresa</em>',
    lead: 'A Shine trabalha com consultoria em domicílio: o consultor vai até a sua casa com o mostruário completo, mede cada janela a laser e apresenta as opções no seu próprio ambiente. Você decide com calma, sem sair de casa e sem pressão.',
    hero: '/cortina-sob-medida.avif',
    heroAlt: 'Consultor da ShineCortinas apresentando tecidos na casa do cliente',
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
      ['Tenho que ir até a loja?', 'Não. A ShineCortinas tem sede em Volta Redonda, mas o modelo principal é a consultoria em domicílio: o consultor vai até você.'],
      ['Quanto tempo leva para instalar?', 'Na maioria dos projetos, a instalação é concluída no mesmo dia. A equipe chega, trabalha com limpeza e sai deixando o ambiente pronto, sem entulho.'],
      ['Qual a garantia?', 'A garantia parte de 1 ano na instalação, estende-se a 5 anos para cortinas e persianas e chega a até 8 anos em projetos com motorização.'],
      ['Como posso parcelar?', 'Em até 12x no cartão de crédito. As condições são apresentadas durante a consultoria em domicílio, junto com o projeto.'],
    ],
    links: [['/cortinas/', 'Cortinas sob medida'], ['/persianas/', 'Persianas técnicas'], ['/portfolio/', 'Projetos reais'], ['/videos/', 'Vídeos'],
            ['/sobre/', 'Sobre a Shine'], ['/faq/', 'Perguntas frequentes'], ['/contato/', 'Contato'], ['/cidades-atendidas.html', 'Cidades atendidas']],
  },

  // ------------------------------------------------------------------- SOBRE
  {
    dir: 'sobre',
    title: 'Sobre a ShineCortinas: 17 Anos no Sul Fluminense | ShineCortinas',
    description: 'Fundada em 2009 e dirigida por Isani Oliveira, a ShineCortinas atende 15 cidades do Sul Fluminense com equipe própria, do consultor ao instalador.',
    kicker: 'Sobre a Shine',
    h1: 'Dezessete anos medindo, confeccionando e <em>instalando</em>',
    lead: 'A ShineCortinas é uma empresa de cortinas e persianas sob medida com sede em Volta Redonda, no Rio de Janeiro. Desde 2009 atende o Sul Fluminense com equipe própria — do consultor que vai à sua casa ao instalador que fecha o projeto.',
    hero: '/hero-sala.avif',
    heroAlt: 'Projeto de cortinas sob medida executado pela ShineCortinas',
    blocos: [
      { t: 'proof' },
      { t: 'ceo' },
      { t: 'prose', h2: 'Onde atendemos', p: [
        'São 15 cidades do Sul Fluminense: Volta Redonda, Barra Mansa, Resende, Itatiaia, Penedo, Visconde de Mauá, Maromba, Porto Real, Pinheiral, Piraí, Barra do Piraí, Valença, Vassouras, Engenheiro Paulo de Frontin e Miguel Pereira. Cada uma tem <a href="/cidades-atendidas.html">a sua própria página</a>, com as perguntas e os projetos de lá.',
        'Além das residências, a Shine atende pousadas, chalés, hotéis e ambientes comerciais, com experiência especial em projetos para pousadas da região serrana.',
      ] },
      { t: 'prose', h2: 'Quem confia no padrão Shine', p: [
        'Entre os projetos corporativos entregues estão UNIMED, Volkswagen, CSN, Banco do Brasil, Sicredi e OAB.',
      ] },
    ],
    faq: [
      ['O que é a ShineCortinas e o que ela oferece?', 'A ShineCortinas é uma empresa especializada em cortinas e persianas sob medida, sediada em Volta Redonda (RJ), atendendo todo o Sul Fluminense há 17 anos, com consultoria gratuita em domicílio, medição a laser, confecção e instalação por equipe própria.'],
      ['Há quanto tempo a ShineCortinas existe?', 'Desde 2009, com 17 anos de atuação no Sul Fluminense, mais de 9.000 projetos entregues e avaliação 5.0 no Google.'],
      ['A ShineCortinas tem loja física?', 'Sim, a sede fica em Volta Redonda (RJ). O modelo principal, no entanto, é a consultoria em domicílio: o consultor vai até a sua casa com o mostruário completo.'],
      ['Vocês atendem pousadas e ambientes comerciais?', 'Sim. A ShineCortinas atende residências, pousadas, chalés, hotéis e ambientes comerciais, com experiência especial em projetos para pousadas na região serrana do Sul Fluminense.'],
    ],
    links: [['/metodo/', 'Como funciona'], ['/portfolio/', 'Projetos reais'], ['/videos/', 'Vídeos'], ['/cidades-atendidas.html', 'Cidades atendidas'],
            ['/cortinas/', 'Cortinas'], ['/persianas/', 'Persianas'], ['/faq/', 'Perguntas frequentes'], ['/contato/', 'Contato']],
  },

  // --------------------------------------------------------------- PORTFÓLIO
  {
    dir: 'portfolio',
    title: 'Portfólio: Projetos Reais de Cortinas e Persianas | ShineCortinas',
    description: 'Ambientes medidos, confeccionados e instalados pela equipe da ShineCortinas no Sul Fluminense. Cortina wave, blackout, motorizada, screen e persiana de madeira.',
    kicker: 'Projetos reais',
    h1: 'Ambientes que a nossa equipe <em>entregou</em>',
    lead: 'Cada projeto abaixo foi medido, confeccionado e instalado pela equipe da Shine. Sem filtro e sem render: é o resultado que o cliente vê ao chegar em casa.',
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
            ['/cortina-motorizada/', 'Cortina motorizada'], ['/blackout-e-forros/', 'Blackout e forros'], ['/metodo/', 'Como funciona'], ['/cidades-atendidas.html', 'Cidades atendidas']],
  },

  // ----------------------------------------------------------------- CONTATO
  {
    dir: 'contato',
    title: 'Contato ShineCortinas: WhatsApp e Consultoria Gratuita | ShineCortinas',
    description: 'Fale com um consultor da ShineCortinas pelo WhatsApp e agende a consultoria gratuita em domicílio no Sul Fluminense. Sede em Volta Redonda (RJ).',
    kicker: 'Contato',
    h1: 'Fale com um consultor <em>de verdade</em>',
    lead: 'Sem robô, sem formulário e sem espera. Você manda uma mensagem no WhatsApp e um consultor responde em minutos para entender o seu ambiente e, se você quiser, agendar a consultoria gratuita em casa.',
    hero: '/cortina-sob-medida.avif',
    heroAlt: 'Atendimento ShineCortinas para agendamento de consultoria em domicílio',
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
    links: [['/metodo/', 'Como funciona'], ['/cortinas/', 'Cortinas'], ['/persianas/', 'Persianas'], ['/portfolio/', 'Projetos reais'],
            ['/faq/', 'Perguntas frequentes'], ['/sobre/', 'Sobre a Shine'], ['/videos/', 'Vídeos'], ['/cidades-atendidas.html', 'Cidades atendidas']],
  },
];
