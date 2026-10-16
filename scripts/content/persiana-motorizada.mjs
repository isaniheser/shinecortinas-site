// Fonte: entrevistas de Isani Oliveira registradas em CLAUDE.md e docs/recebidos-do-isani.md (16/10/2026).

export default {
  slug: 'como-funciona-persiana-motorizada',
  layout: 'editorial',
  sectionLabel: 'Persianas e Automação',
  title: 'Como funciona a persiana motorizada: energia, bateria e o que acontece quando falta luz',
  seoTitle: 'Como Funciona a Persiana Motorizada? Bateria e Luz | ShineCortinas',
  description: 'Entenda como funciona a persiana motorizada na prática: motores elétricos ou a bateria (média de 6 meses) e por que Rolô e Romana travam sem energia.',
  published: '2026-02-19',
  modified: new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' }),
  kicker: 'Persianas e Automação',
  ogImage: '/automacao.avif',
  about: ['como funciona persiana motorizada', 'persiana motorizada a bateria', 'persiana rolô motorizada', 'persiana romana motorizada'],
  speakableXPath: ['/html/body//h1', '/html/body//div[@class="sl-ed-lead"]/p[1]'],
  tocNote: 'Saiba quando dá para usar motor a bateria e por que a persiana que enrola no tubo se comporta diferente da cortina quando falta luz.',
  related: [
    ['/cortina-motorizada/', 'Cortina e persiana motorizada'],
    ['/persianas/', 'Persianas sob medida'],
    ['/blog/por-que-escolher-cortina-motorizada/', 'Por que escolher cortina motorizada'],
    ['/blog/persiana-ideal-para-cada-ambiente/', 'Persiana ideal para cada ambiente'],
    ['/videos/cortina-screen-motorizada-mangaratiba/', 'Vídeo: Tela solar motorizada'],
    ['/trilhos-e-acionamentos/', 'Trilhos e acionamentos'],
  ],
  hero: {
    eyebrow: 'O olhar de quem instala',
    h1: 'Como funciona a<br>persiana motorizada:',
    h1em: 'energia, bateria e falta de luz.',
    lead: `<p>Muita gente acha que toda <a href="/cortina-motorizada/">persiana motorizada</a> funciona igual a uma cortina de tecido no trilho, mas a mecânica por dentro é bem diferente. Nas persianas que sobem enrolando, como a Rolô, a Romana e a Horizontal, o motor fica embutido dentro do tubo superior e segura todo o peso da peça.</p>
      <p>Aqui você vai entender quando dá para usar motor a bateria recarregável (que dura em média 6 meses por carga) e por que, quando acaba a energia elétrica, as persianas que enrolam na horizontal não podem ser abertas com a mão, exceto os modelos Painel e Vertical.</p>`,
    readTo: 'energia-e-bateria',
    readText: 'Compare o motor ligado na energia com o motor a bateria',
    photo: '/automacao.avif',
    photoWidth: 1920,
    photoHeight: 1080,
    photoAlt: 'Persiana e cortina motorizada acionadas por controle remoto em projeto da ShineCortinas',
    photoTag: 'Automação residencial · Sul Fluminense',
    photoCaption: 'O motor fica escondido dentro do tubo da persiana e responde ao controle, celular ou comando de voz.',
  },
  sections: [
    {
      id: 'energia-e-bateria',
      toc: 'Rede elétrica x Bateria (6 meses)',
      label: 'Alimentação do motor',
      h2: 'Motor ligado na energia elétrica ou motor a bateria: quanto tempo dura a carga?',
      html: `<p>Quando vamos motorizar uma persiana ou cortina, existem duas formas de alimentar o motor: ligando em um ponto de energia elétrica (110V ou 220V) próximo ao cabeçote, ou utilizando um <strong>motor com bateria interna recarregável</strong>.</p>
        <p>Nós trabalhamos com motores a bateria para alguns modelos, mas essa opção <strong>deve ser sempre consultada antes com os nossos especialistas</strong>. Na visita técnica, nós medimos a largura, a altura e o peso do material para confirmar se o motor a bateria comporta aquela peça com folga.</p>
        <h3>Quanto tempo dura a bateria de uma persiana ou cortina motorizada?</h3>
        <p>Dependendo do uso diário, a carga da bateria dura <strong>em média 6 meses</strong>. Nos manuais dos principais fabricantes de motores de lítio do mercado, a autonomia fica na faixa de <strong>3 a 9 meses por recarga</strong>, variando conforme o peso da peça e quantas vezes por dia você sobe e desce a persiana. Quando a carga chega no fim, um aviso luminoso indica a hora de plugar o carregador na tomada, exatamente como você faz com um celular, sem precisar desmontar a persiana.</p>
        <figure class="sl-ed-fig sl-ed-figure">
          <div class="sl-ed-figtop"><span class="sl-ed-eyebrow">Desenho 01</span><span>As duas formas de alimentar o motor da persiana ou cortina</span></div>
          <div class="sl-ed-cards sl-ed-two">
            <div class="sl-ed-card">
              <h3>Motor com Ponto de Energia (110V / 220V)</h3>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 205" role="img" aria-label="Motor tubular ligado diretamente em ponto de energia elétrica no cortineiro">
                <rect x="12" y="12" width="256" height="180" rx="6" fill="#fbfaf7" stroke="#ddd6c8"/>
                <rect x="44" y="42" width="192" height="18" rx="4" fill="#16302a"/>
                <rect x="48" y="72" width="38" height="26" rx="4" fill="#e8e2d5" stroke="#16302a" stroke-width="1.5"/>
                <circle cx="61" cy="85" r="2.5" fill="#16302a"/><circle cx="73" cy="85" r="2.5" fill="#16302a"/>
                <path d="M67 72V60" stroke="#9b713a" stroke-width="2.5"/>
                <text x="162" y="84" font-family="Montserrat, Arial, sans-serif" font-size="11" font-weight="600" fill="#16302a" text-anchor="middle">Ligado direto no cortineiro</text>
                <text x="162" y="102" font-family="Montserrat, Arial, sans-serif" font-size="10.5" fill="#45584e" text-anchor="middle">Força total para grandes vãos</text>
                <text x="140" y="180" font-family="Montserrat, Arial, sans-serif" font-size="11" font-weight="600" fill="#16302a" text-anchor="middle">Zero preocupação com recarga</text>
              </svg>
              <p>Quando já existe ponto elétrico próximo ao cortineiro, o motor fica alimentado direto na rede.</p>
            </div>
            <div class="sl-ed-card">
              <h3>Motor a Bateria Recarregável (Média de 6 meses)</h3>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 205" role="img" aria-label="Motor com bateria interna recarregável durando em média 6 meses por carga">
                <rect x="12" y="12" width="256" height="180" rx="6" fill="#fbfaf7" stroke="#ddd6c8"/>
                <rect x="44" y="42" width="192" height="18" rx="4" fill="#16302a"/>
                <rect x="86" y="78" width="96" height="36" rx="5" fill="#f2f6ef" stroke="#16302a" stroke-width="2"/>
                <rect x="182" y="88" width="6" height="16" rx="2" fill="#16302a"/>
                <rect x="92" y="84" width="24" height="24" rx="2" fill="#284b40"/>
                <rect x="120" y="84" width="24" height="24" rx="2" fill="#284b40"/>
                <rect x="148" y="84" width="24" height="24" rx="2" fill="#9b713a"/>
                <text x="140" y="138" font-family="Montserrat, Arial, sans-serif" font-size="11.5" font-weight="700" fill="#16302a" text-anchor="middle">Dura em média 6 meses por carga</text>
                <text x="140" y="155" font-family="Montserrat, Arial, sans-serif" font-size="10" fill="#45584e" text-anchor="middle">(varia de 3 a 9 meses conforme uso e tamanho)</text>
                <text x="140" y="180" font-family="Montserrat, Arial, sans-serif" font-size="10.5" font-weight="600" fill="#9b713a" text-anchor="middle">Sem quebrar parede (consultar modelos)</text>
              </svg>
              <p>Disponível para modelos específicos sob consulta. Instala sem obra elétrica e recarrega por cabo.</p>
            </div>
          </div>
          <figcaption>Comparativo entre o motor alimentado na rede elétrica e o motor com bateria interna de lítio.</figcaption>
        </figure>`,
    },
    {
      id: 'falta-de-energia-persiana',
      toc: 'O que acontece se acabar a luz',
      label: 'Engrenagem e freio',
      h2: 'Por que a persiana Rolô, Romana e Horizontal não abre na mão quando acaba a energia',
      html: `<p>Aqui entra uma explicação técnica que eu faço questão de deixar clara antes da compra. Lá no artigo sobre <a href="/blog/por-que-escolher-cortina-motorizada/">cortina motorizada de tecido</a>, eu expliquei que, quando acaba a luz, você puxa a cortina de pano com a mão e ela corre livre no trilho.</p>
        <p>Já na <strong>persiana motorizada</strong>, quando acaba a energia elétrica, devido ao sistema de engrenagem e do próprio motor, principalmente na <strong>Rolô, na Romana e na Horizontal de alumínio</strong>, se torna inviável, ou melhor, <strong>impossível a abertura manual</strong> delas.</p>
        <h3>Qual o motivo disso? E quais são as exceções?</h3>
        <p>Veja bem: essas persianas (Rolô, Romana e Horizontal) funcionam enrolando na horizontal lá no tubo de cima. O motor precisa ter um freio interno na engrenagem o tempo todo para segurar a persiana parada na altura em que você deixou. Se a engrenagem ficasse solta para você puxar na mão, a persiana não ia parar no lugar e despencaria toda de uma vez pelo próprio peso.</p>
        <p>As únicas exceções são a <strong>persiana Painel e a persiana Vertical</strong> (além da cortina de tecido). Como o Painel e a Vertical correm para os lados em vez de enrolar para cima, elas não dependem desse freio contra a gravidade.</p>
        <figure class="sl-ed-fig sl-ed-figure">
          <div class="sl-ed-figtop"><span class="sl-ed-eyebrow">Desenho 02</span><span>Por que as persianas que enrolam ficam travadas sem energia (e as exceções)</span></div>
          <div class="sl-ed-cards sl-ed-two">
            <div class="sl-ed-card">
              <h3>Rolô, Romana e Horizontal: travadas sem energia</h3>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 205" role="img" aria-label="Persiana Rolô, Romana e Horizontal seguras pelo freio da engrenagem quando falta energia">
                <rect x="12" y="12" width="256" height="180" rx="6" fill="#fbfaf7" stroke="#ddd6c8"/>
                <rect x="52" y="30" width="176" height="20" rx="10" fill="#16302a"/>
                <circle cx="72" cy="40" r="7" fill="#9b713a"/>
                <rect x="58" y="50" width="164" height="82" fill="#dfd5c0" stroke="#8c7b65" stroke-width="1.5"/>
                <line x1="54" y1="132" x2="226" y2="132" stroke="#16302a" stroke-width="3"/>
                <text x="140" y="94" font-family="Montserrat, Arial, sans-serif" font-size="11" font-weight="600" fill="#16302a" text-anchor="middle">Freio da engrenagem segura o pano</text>
                <text x="140" y="160" font-family="Montserrat, Arial, sans-serif" font-size="10.5" fill="#8c3b2b" font-weight="600" text-anchor="middle">Se ficasse solta, desceria de uma vez</text>
                <text x="140" y="180" font-family="Montserrat, Arial, sans-serif" font-size="10.5" fill="#45584e" text-anchor="middle">Por isso não abre na mão sem luz</text>
              </svg>
              <p>Como funcionam enrolando na horizontal, a engrenagem trava a peça para ela não despencar.</p>
            </div>
            <div class="sl-ed-card">
              <h3>Exceções: Persiana Painel, Vertical e Cortina</h3>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 205" role="img" aria-label="Persiana Painel e Vertical correndo para o lado no trilho mesmo sem energia">
                <rect x="12" y="12" width="256" height="180" rx="6" fill="#fbfaf7" stroke="#ddd6c8"/>
                <rect x="44" y="30" width="192" height="8" rx="2" fill="#16302a"/>
                <rect x="54" y="40" width="44" height="106" fill="#e6decb" stroke="#8c7b65" stroke-width="1.5"/>
                <rect x="92" y="40" width="44" height="106" fill="#dfd5c0" stroke="#8c7b65" stroke-width="1.5"/>
                <rect x="130" y="40" width="44" height="106" fill="#e6decb" stroke="#8c7b65" stroke-width="1.5"/>
                <path d="M186 92H228M220 85L228 92L220 99" fill="none" stroke="#16302a" stroke-width="2.2" stroke-linecap="round"/>
                <text x="140" y="168" font-family="Montserrat, Arial, sans-serif" font-size="11" font-weight="600" fill="#16302a" text-anchor="middle">Correm para os lados sem peso de queda</text>
                <text x="140" y="184" font-family="Montserrat, Arial, sans-serif" font-size="10.5" fill="#45584e" text-anchor="middle">Permitem abertura manual se faltar energia</text>
              </svg>
              <p>Por correrem na lateral em vez de enrolar para cima, o Painel e a Vertical podem ser abertos.</p>
            </div>
          </div>
          <figcaption>Diferença de comportamento na falta de energia entre persianas de enrolar (Rolô, Romana, Horizontal) e sistemas de correr lateralmente.</figcaption>
        </figure>`,
    },
    {
      id: 'vantagens-grandes-vaos',
      toc: 'Varandas, pé-direito duplo e garantia',
      label: 'Quando vale motorizar',
      h2: 'Em vãos grandes e pé-direito duplo, o motor elimina o esforço na cordinha',
      html: `<p>Quando uma persiana Rolô de tela solar na varanda ou uma persiana Romana na sala é muito larga ou muito alta, o peso do tecido enrolado lá em cima fica considerável. No sistema manual, a pessoa acaba fazendo muita força na correntinha ou na cordinha, e qualquer puxão torto desgasta o comando.</p>
        <p>Com a persiana motorizada, o motor gira o tubo por igual, subindo e parando exatamente no ponto programado. Isso protege o mecanismo, evita que a peça enrole desalinhada e eleva a garantia para <strong>até 5 anos</strong>.</p>
        <div class="sl-ed-table"><table>
          <thead><tr><th>Modelo</th><th>Sentido de abertura</th><th>Abre com a mão se faltar luz?</th><th>Opção de motor a bateria?</th></tr></thead>
          <tbody>
            <tr><td><strong>Persiana Rolô (Tela Solar ou Blackout)</strong></td><td>Sobe enrolando na horizontal</td><td>Não (freio de engrenagem)</td><td>Sim, sob consulta técnica</td></tr>
            <tr><td><strong>Persiana Romana</strong></td><td>Sobe em gomos horizontais</td><td>Não (freio de engrenagem)</td><td>Sim, sob consulta técnica</td></tr>
            <tr><td><strong>Persiana Horizontal (Alumínio / Madeira)</strong></td><td>Sobe e bascula na horizontal</td><td>Não (freio de engrenagem)</td><td>Sim, sob consulta técnica</td></tr>
            <tr><td><strong>Persiana Painel e Vertical</strong></td><td>Corre para as laterais</td><td>Sim</td><td>Sob consulta técnica</td></tr>
            <tr><td><strong>Cortina de Tecido (Trilho Motorizado)</strong></td><td>Corre para as laterais + toque inteligente</td><td>Sim, desliza livre na mão</td><td>Sim, sob consulta técnica</td></tr>
          </tbody>
        </table></div>`,
    },
    {
      id: 'perguntas',
      toc: 'Perguntas frequentes',
      label: 'Dúvidas rápidas',
      h2: 'Perguntas frequentes sobre persiana motorizada',
      faq: true,
      html: `<p>Respostas práticas para você escolher sua persiana motorizada sabendo exatamente como ela trabalha.</p>`,
    },
    {
      id: 'consultoria',
      toc: 'Consultoria em casa',
      label: 'Converse com a Shine',
      closing: true,
      h2: 'Descubra qual motorização é a ideal para as suas janelas e varanda',
      html: `<p>Na consultoria gratuita em domicílio, nós avaliamos se o seu ambiente pede motor elétrico ou a bateria, testamos o espaço do cortineiro e mostramos os tecidos de tela solar, blackout e translúcidos na luz da sua casa.</p><p>Atendemos Volta Redonda, Resende, Barra Mansa, Penedo e todo o Sul Fluminense.</p>`,
      cta: 'Agendar consultoria em casa →',
      img: '/automacao.avif',
      imgAlt: 'Persiana e cortina motorizada instalada pela ShineCortinas',
    },
  ],
  faq: [
    [
      'Quanto tempo dura a bateria de uma persiana motorizada?',
      'Dependendo da frequência de uso e do tamanho da peça, a carga da bateria dura em média 6 meses (variando na faixa técnica de 3 a 9 meses). A disponibilidade de motor a bateria deve ser consultada antes com os nossos especialistas conforme o modelo escolhido.',
    ],
    [
      'Dá para abrir a persiana Rolô ou Romana na mão quando acaba a energia elétrica?',
      'Não. Na persiana Rolô, na Romana e na Horizontal de alumínio, devido ao sistema de engrenagem e freio interno do motor (que segura a peça para ela não descer solta de uma vez), é impossível abrir manualmente quando falta energia. As exceções são a persiana Painel, a Vertical e a cortina de tecido.',
    ],
    [
      'Se eu escolher motor a bateria, ela funciona mesmo quando falta luz na rua?',
      'Sim. Como o motor a bateria usa a carga armazenada na própria bateria interna (e não a rede elétrica da tomada naquele momento), ele continua subindo e descendo pelo controle remoto mesmo durante uma queda de energia na rua.',
    ],
    [
      'Quando vale mais a pena motorizar a persiana?',
      'Eu indico sem pensar duas vezes em pé-direito duplo, janelas altas e vãos muito grandes, como varandas gourmet com várias peças. O motor evita ficar forçando a cordinha com o peso da persiana e aumenta a garantia para até 5 anos.',
    ],
    [
      'Onde fica o motor da persiana motorizada?',
      'Nas persianas Rolô, Romana, Double Vision e Horizontal, o motor tem formato tubular e fica totalmente escondido por dentro do tubo superior da persiana, sem ficar aparente na parede.',
    ],
    [
      'A persiana motorizada pode ser controlada pelo celular e pela Alexa?',
      'Sim. Nossos sistemas de motorização contam com integração IoT para abrir e fechar pelo controle remoto, pelo aplicativo no celular, por horários programados ou por voz na Alexa, Google Home e Apple Home.',
    ],
  ],
};
