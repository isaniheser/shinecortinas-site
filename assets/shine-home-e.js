/* ==========================================================================
   SHINECORTINAS — PRÉVIA E (INTERATIVIDADE MOBILE, CONSULTOR, BENTO E MODAIS)
   ========================================================================== */
const STORAGE_KEY_FAVS = 'shine.favoritos';
const STORAGE_KEY_JOURNEY = 'shine.jornada';
const savedReferences = new Set();
let diagState = { room: 'estar', vao: 'cortineiro' };
let currentSheetId = 'wave';

const shineJourney = {
  consultor: null,
  obras: [],
  videos: [],
  artigos: [],
  verMaisCliques: 0
};

function loadJourney() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY_JOURNEY);
    if (!raw) return;
    const obj = JSON.parse(raw);
    if (obj && typeof obj === 'object') {
      if (obj.consultor) shineJourney.consultor = String(obj.consultor);
      if (Array.isArray(obj.obras)) shineJourney.obras = obj.obras.slice(-3);
      if (Array.isArray(obj.videos)) shineJourney.videos = obj.videos.slice(-2);
      if (Array.isArray(obj.artigos)) shineJourney.artigos = obj.artigos.slice(-2);
      if (typeof obj.verMaisCliques === 'number') shineJourney.verMaisCliques = obj.verMaisCliques;
    }
  } catch (_) {}
  window.shineJourney = shineJourney;
}

function saveJourney() {
  window.shineJourney = shineJourney;
  try {
    sessionStorage.setItem(STORAGE_KEY_JOURNEY, JSON.stringify(shineJourney));
  } catch (_) {}
}

function addUniqueRecent(list, val, maxLen) {
  if (!val) return;
  const idx = list.indexOf(val);
  if (idx !== -1) list.splice(idx, 1);
  list.push(val);
  while (list.length > maxLen) list.shift();
}

function trackShineEvent(eventName, params) {
  const payload = Object.assign({ pagina: location.pathname }, params || {});
  try {
    if (window.zaraz && typeof window.zaraz.track === 'function') {
      window.zaraz.track(eventName, payload);
    }
  } catch (_) {}
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, payload));
  } catch (_) {}
}

function loadSavedReferences() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FAVS);
    if (!raw) return;
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) {
      arr.forEach((item) => {
        if (typeof item === 'string' && item.trim()) savedReferences.add(item);
      });
    }
  } catch (_) {}
}

function persistSavedReferences() {
  try {
    localStorage.setItem(STORAGE_KEY_FAVS, JSON.stringify(Array.from(savedReferences)));
  } catch (_) {}
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getFallbackImageForCats(catsStr) {
  const c = String(catsStr || '');
  if (c.includes('madeira')) return '/madeira-sq.avif';
  if (c.includes('aluminio') || c.includes('persiana')) return '/persiana-motorizada-sq.avif';
  if (c.includes('rolo') || c.includes('romana') || c.includes('doublevision')) return '/tela-solar-sq.avif';
  if (c.includes('pedireitoduplo')) return '/duplo-sq.avif';
  if (c.includes('blackout')) return '/blackouts-tecnicos.avif';
  if (c.includes('lavagem')) return '/lavagem-vertical-cortinas-800.avif';
  return '/cortina-sob-medida.avif';
}

function pushModalHistoryState() {
  try {
    if (!history.state || !history.state.shineModal) {
      history.pushState({ shineModal: true }, '');
    }
  } catch (_) {}
}

function syncBodyScrollLock() {
  const anyOpen = document.querySelector('.d-case-modal.is-open, .d-video-modal.is-open');
  document.body.style.overflow = anyOpen ? 'hidden' : '';
}

const blogArticles = {
  cortineiro: {
    kicker: '📖 Guia de Obra · Por Isani Oliveira',
    title: 'Qual a medida ideal do cortineiro de gesso para Cortina Wave?',
    fullUrl: '/blog/altura-ideal-da-cortina/',
    body: '<p style="margin-bottom:10px;"><strong>1. O mínimo que eu peço (15 × 15 cm):</strong> Quando vou na obra do cliente, a primeira coisa que confiro no gesso é o vão livre. Para a Cortina Prega Wave correr solta nas proporções 2:1, 2,5:1 ou 3:1 sem amassar no vidro, peço o mínimo de <strong>15 cm de largura (profundidade) por 15 cm de altura interna (15 × 15 cm)</strong>.</p><p style="margin-bottom:10px;"><strong>2. Cortina dupla e forros:</strong> Para trilho duplo (cortina na frente e forro translúcido ou blackout atrás) ou curva motorizada, o ideal é deixar de <strong>18 cm a 20 cm</strong>. Se o cliente quiser o forro de trás também no modelo Wave, precisa de <strong>11 cm de distância</strong> entre a cortina da frente e a de trás para as ondas não se tocarem.</p><p><strong>3. Atenção ao ar-condicionado:</strong> Se o aparelho split ficar acima da janela, desconte a projeção dele antes de abrir o rasgo no gesso.</p>',
    wa: 'Olá! Li o guia do Isani sobre medidas de cortineiro de gesso no Blog da Shine e quero tirar uma dúvida sobre a minha obra.'
  },
  telasolar: {
    kicker: '📖 Comparativo Prático · Por Isani Oliveira',
    title: 'Tela Solar, Blackout 100% ou Toque de Linho com Forro: qual usar em cada janela?',
    fullUrl: '/blog/tipos-de-forro-para-cortina/',
    body: '<p style="margin-bottom:10px;"><strong>• Varanda Gourmet e Cozinha (Tela Solar):</strong> Muita gente me pergunta como cortar o sol forte sem fechar a vista. Nas persianas com fibra de vidro, como a Screen (Tela Solar) e a Pinpoint, temos relato de redução de <strong>até cerca de 11 °C</strong> mantendo a claridade agradável.</p><p style="margin-bottom:10px;"><strong>• Suítes e Salas de TV (Blackout 100% vs. 70%):</strong> Na maioria das salas de TV prefiro trabalhar com cortina de tecido, que deixa o ambiente acolhedor e veda melhor nas laterais. No <strong>Blackout 100%</strong> (que reduz de <strong>5 a 6 °C</strong> na temperatura medida no ambiente), a cor do tecido não influencia: branco, areia ou off-white vedam 100% igual. Já no <strong>Blackout 70% (semi blackout)</strong>, a cor clara deixa passar mais luz que a escura.</p><p><strong>• Sala de Estar (Toque de Linho acima de 170 g/m²):</strong> Quando o cliente deseja linho, indico tecido com no máximo 10% de linho ou 100% poliéster que imita linho, sempre com gramatura superior a <strong>170 g/m²</strong> (ou tecido peletizado sedoso). Acima de 10% de linho na composição o tecido amarrota com facilidade e pode encolher na lavagem.</p>',
    wa: 'Olá! Li o comparativo do Isani entre Tela Solar, Blackout e Toque de Linho e quero ver as amostras na minha casa.'
  },
  motorizada: {
    kicker: '📖 Pé-Direito Duplo · Por Isani Oliveira',
    title: 'Cortina motorizada elétrica ou a bateria: o que prever antes da pintura?',
    fullUrl: '/blog/por-que-escolher-cortina-motorizada/',
    body: '<p style="margin-bottom:10px;"><strong>• Por que indico em pé-direito duplo:</strong> Em janelões altos ou vãos muito grandes, a motorização evita forçar a cordinha ou o trilho com o peso do tecido, reduz manutenção e amplia a garantia para <strong>até 5 anos</strong> (contra 1 ano nos modelos não motorizados).</p><p style="margin-bottom:10px;"><strong>• Elétrica ou a Bateria:</strong> Se houver ponto 110V ou 220V no cortineiro, ligamos direto na rede. Se o gesso já estiver fechado sem tomada, temos motores a bateria recarregável para alguns modelos (mediante consulta), com carga que dura em média <strong>6 meses</strong> (faixa de 3 a 9 meses conforme o uso).</p><p><strong>• E se acabar a energia?</strong> Veja bem: na <strong>cortina motorizada de tecido (trilho motorizado)</strong>, você consegue abrir e fechar com a mão se faltar luz, e ela tem reconhecimento de toque (dando um leve puxão no tecido, o motor abre sozinho). Já nas <strong>persianas motorizadas</strong>, por causa do freio da engrenagem que impede a peça de despencar, não é possível abrir manualmente a Rolô, a Romana e a Horizontal de alumínio quando falta luz, exceto nos modelos Painel e Vertical.</p>',
    wa: 'Olá! Li o artigo do Isani sobre cortina motorizada no Blog da Shine e quero orçar para o meu projeto.'
  },
  lavagem: {
    kicker: '📖 Conservação · Por Isani Oliveira',
    title: 'Por que nunca lavar cortina sob medida na máquina doméstica?',
    fullUrl: '/blog/lavagem-de-cortinas-sob-medida/',
    body: '<p style="margin-bottom:10px;"><strong>O perigo da máquina doméstica:</strong> Quando o cliente coloca uma cortina sob medida no tambor da máquina comum, o atrito quebra as fibras do tecido, encolhe a altura da bainha e estraga a película traseira do blackout.</p><p style="margin-bottom:10px;"><strong>Como nós cuidamos na Shine:</strong> Cada material de cortina de tecido (microfibra, blackout de tecido com bloqueador interno ou blackout com película traseira) exige higienização profissional específica. Em <strong>Volta Redonda, Barra Mansa, Resende, Barra do Piraí, Piraí e Pinheiral</strong>, nossa equipe retira sua cortina de tecido em casa, faz a lavagem e secagem na vertical e revisa rodízios, ganchos, trilhos e bainha antes de reinstalar.</p>',
    wa: 'Olá! Li o artigo do Isani sobre lavagem vertical de cortinas e quero saber como funciona para as minhas cortinas.'
  }
};

function openArticleSheet(id) {
  const art = blogArticles[id];
  if (!art) return;
  addUniqueRecent(shineJourney.artigos, art.title, 2);
  saveJourney();
  trackShineEvent('shine_blog_leitura', { artigo_id: id, titulo: art.title });
  document.getElementById('art-kicker').textContent = art.kicker;
  document.getElementById('art-title').textContent = art.title;
  document.getElementById('art-body').innerHTML = art.body;
  const fullLink = document.getElementById('art-full-link');
  if (fullLink && art.fullUrl) {
    fullLink.href = art.fullUrl;
  }
  document.getElementById('art-wa-btn').href = 'https://wa.me/5524993298763?text=' + encodeURIComponent(art.wa);
  const modal = document.getElementById('article-sheet-modal');
  const popup = modal.querySelector('.d-case-sheet-popup');
  if (popup) popup.scrollTop = 0;
  pushModalHistoryState();
  modal.classList.add('is-open');
  syncBodyScrollLock();
}

function closeArticleSheet() {
  const modal = document.getElementById('article-sheet-modal');
  if (modal) modal.classList.remove('is-open');
  syncBodyScrollLock();
}

function openMenuSheet() {
  const count = savedReferences.size;
  trackShineEvent('shine_menu_aberto', { salvos: count });
  const lbl = document.getElementById('menu-saved-label');
  if (lbl) lbl.textContent = '♡ Meus Salvos (' + count + ')';
  const modal = document.getElementById('menu-sheet-modal');
  const popup = modal.querySelector('.d-case-sheet-popup');
  if (popup) popup.scrollTop = 0;
  pushModalHistoryState();
  modal.classList.add('is-open');
  syncBodyScrollLock();
}

function closeMenuSheet() {
  const modal = document.getElementById('menu-sheet-modal');
  if (modal) modal.classList.remove('is-open');
  syncBodyScrollLock();
}

const caseCatalog = {
  wave: {
    refTitle: 'Sala: Cortina Prega Wave com Toque de Linho',
    kicker: '✦ Referência da Solução · Cortina Wave',
    title: 'Sala vestida do teto ao piso com luz suave',
    img: '/cortina-sob-medida.avif',
    prob: 'A sala parecia vazia e a claridade direta incomodava no sofá durante a tarde.',
    sol: 'Cortina Prega Wave em tecido encorpado com toque de linho (acima de 170 g/m²), forro translúcido independente e acabamento a 1 cm do piso.',
    videoId: 'bb5e291aafac2c7c9c24b4b5fcd2af98',
    pageUrl: '/cortina-wave/'
  },
  duplo: {
    refTitle: 'Pé-Direito Duplo: Cortina Wave Motorizada',
    kicker: '✦ Referência da Solução · Pé-Direito Duplo',
    title: 'Pé-direito duplo com caimento contínuo do teto ao piso',
    img: '/duplo-sq.avif',
    prob: 'Janelão alto de pé-direito duplo precisava de controle de luz sem perder a imponência da sala.',
    sol: 'Cortina Wave sob medida do teto ao piso com trilho motorizado silencioso, ondas simétricas e até 5 anos de garantia no motor.',
    videoId: 'bf8afe030678afeb1e9bb2ebc369d4c4',
    pageUrl: '/cortina-motorizada/'
  },
  blackout: {
    refTitle: 'Quarto e TV: Forro Blackout 100% Sob Medida',
    kicker: '✦ Referência da Solução · Blackout 100%',
    title: 'Quarto escuro de verdade e conforto térmico',
    img: '/blackouts-tecnicos.avif',
    prob: 'Fresta de sol acordava o casal cedo e causava reflexo na tela da TV.',
    sol: 'Cortina de tecido na frente com forro blackout 100% por trás (reduz de 5 a 6 °C do calor), opção de transpasse central de 15 cm e pontas laterais fixadas.',
    pageUrl: '/blackout-e-forros/'
  },
  solar: {
    refTitle: 'Varanda: Persiana Rolô Tela Solar Corta-Calor',
    kicker: '✦ Referência da Solução · Tela Solar',
    title: 'Fim do sol forte na varanda sem perder a vista',
    img: '/tela-solar-sq.avif',
    prob: 'O sol da tarde esquentava a varanda inteira e desbotava os móveis.',
    sol: 'Persiana Rolô em Tela Solar (Screen) com fibra de vidro que filtra os raios UV e reduz o calor em até cerca de 11 °C mantendo a vista externa.',
    pageUrl: '/persianas/'
  },
  resende_real: {
    refTitle: 'Obra Real em Resende: Cortina Wave Motorizada',
    kicker: '🟢 Obra Real Filmada · Resende RJ',
    title: 'Cortina Wave motorizada instalada em Resende',
    img: '/poster-cortina-motorizada-wave-resende.avif',
    prob: 'Sala integrada em Resende pedia abertura prática por controle remoto e ondas simétricas do teto ao piso.',
    sol: 'Cortina Prega Wave motorizada confeccionada no ateliê da Shine e instalada pela nossa equipe própria em Resende.',
    videoId: 'bf8afe030678afeb1e9bb2ebc369d4c4',
    pageUrl: '/videos/cortina-motorizada-wave-resende/'
  },
  madeira: {
    refTitle: 'Obra Real em Barra Mansa: Persiana de Madeira 50 mm',
    kicker: '🟢 Obra Real Filmada · Barra Mansa RJ',
    title: 'Persiana Horizontal de Madeira 50 mm que veste a janela',
    img: '/madeira-sq.avif',
    prob: 'O ambiente pedia presença arquitetônica e controle fino da entrada de sol.',
    sol: 'Persiana Horizontal em lâminas de madeira natural de 50 mm sob medida com acionamento leve e giro de lâminas.',
    videoId: 'e5cbe78a24295d14cfa224fbc07fe627',
    pageUrl: '/videos/persiana-horizontal-madeira-barra-mansa/'
  },
  aluminio: {
    refTitle: 'Persiana Horizontal de Alumínio 25 mm Sob Medida',
    kicker: '✦ Referência da Solução · Persiana de Alumínio',
    title: 'Persiana Horizontal de Alumínio com fácil limpeza',
    img: '/persiana-motorizada-sq.avif',
    prob: 'Cozinha, banheiro e home office precisavam de controle de claridade durável e resistente à umidade.',
    sol: 'Persiana Horizontal em lâminas de alumínio sob medida, prática de higienizar e resistente ao vapor.',
    pageUrl: '/persianas/'
  },
  vassouras: {
    refTitle: 'Obra Real em Vassouras: Chalé A-Frame Sob Medida',
    kicker: '🟢 Obra Real Filmada · Vassouras RJ',
    title: 'Modelagem sob medida para vão inclinado em Chalé A-Frame',
    img: '/poster-cortina-cabana-chale-vassouras.avif',
    prob: 'Janelão triangular inclinado onde cortinas comuns não conseguem correr.',
    sol: 'Modelagem sob medida acompanhando a inclinação do telhado A-Frame em Vassouras com conforto térmico e privacidade completa.',
    videoId: '7ca4a561d6c2b83619fe8f61a3938f85',
    pageUrl: '/videos/cortina-cabana-chale-vassouras/'
  },
  barradopirai: {
    refTitle: 'Obra Real em Barra do Piraí: Cortina Wave Toque de Linho',
    kicker: '🟢 Obra Real Filmada · Barra do Piraí RJ',
    title: 'Textura de linho com luz filtrada e caimento alinhado',
    img: '/poster-cortina-wave-linho-barra-do-pirai.avif',
    prob: 'Cliente queria a textura elegante do linho sem tecido que amarrota ou encolhe na lavagem.',
    sol: 'Cortina Wave em tecido encorpado com toque de linho e forro independente instalada em Barra do Piraí.',
    videoId: '7c540a12c9b267eb30ef2d195258e617',
    pageUrl: '/videos/cortina-wave-linho-barra-do-pirai/'
  },
  mangaratiba: {
    refTitle: 'Obra Real em Mangaratiba: Screen Tela Solar Motorizada',
    kicker: '🟢 Obra Real Filmada · Mangaratiba RJ',
    title: 'Proteção contra maresia e sol forte com vista livre',
    img: '/poster-cortina-screen-motorizada-mangaratiba.avif',
    prob: 'Sol intenso batendo na fachada envidraçada de frente para o verde e o mar.',
    sol: 'Persiana Rolô Screen Tela Solar motorizada que filtra o calor e os raios UV preservando a vista com um toque.',
    videoId: '43fabc4ce7fc6528fc8a1594bad09a96',
    pageUrl: '/videos/cortina-screen-motorizada-mangaratiba/'
  },
  pregamacho: {
    refTitle: 'Cortina Prega Fêmea, Prega Macho e Franzida',
    kicker: '✦ Referência da Solução · Alfaiataria Clássica',
    title: 'Alfaiataria clássica em Prega Fêmea, Macho e Franzida',
    img: '/linha-puro.avif',
    prob: 'Cliente buscava o caimento clássico de marcenaria tradicional com volume estruturado no cabeçote.',
    sol: 'Costura própria no ateliê da Shine em Prega Fêmea, Prega Macho ou Franzida com acabamento a 1 cm do piso e bainha dupla nos tecidos leves.',
    videoId: '77a0dba5ef28b998dc81c346352e9a2f',
    pageUrl: '/cortinas/'
  },
  motor: {
    refTitle: 'Automação: Cortina Motorizada (Controle e Alexa)',
    kicker: '✦ Referência da Solução · Motorização',
    title: 'Abertura pelo controle, Alexa ou leve toque na mão',
    img: '/automacao-sq.avif',
    prob: 'Vão amplo e alto ou cortineiro fechado sem ponto elétrico próximo.',
    sol: 'Motorização silenciosa elétrica ou a bateria recarregável (duração média de 6 meses), com até 5 anos de garantia nos projetos motorizados.',
    videoId: 'bf8afe030678afeb1e9bb2ebc369d4c4',
    pageUrl: '/cortina-motorizada/'
  },
  bainha: {
    refTitle: 'Obra Real em Volta Redonda: Bainha a 1 cm do Piso',
    kicker: '🟢 Obra Real Filmada · Volta Redonda RJ',
    title: 'O acabamento a 1 cm do piso que não arrasta nem fica curto',
    img: '/poster-ajuste-bainha-em-casa-alfaiataria.avif',
    prob: 'Pisos com leve desnível deixam cortinas prontas arrastando de um lado e curtas do outro.',
    sol: 'Medição a laser e conferência de bainha na casa do cliente pela equipe própria da Shine.',
    videoId: 'c9058bc905c6e533b7a31c6013677fbe',
    pageUrl: '/videos/ajuste-bainha-em-casa-alfaiataria/'
  },
  lavagem: {
    refTitle: 'Serviço: Lavagem Vertical de Cortinas de Tecido',
    kicker: '🟢 Serviço Especializado · 6 Cidades Atendidas',
    title: 'Retiramos sua cortina de tecido em casa, higienizamos e reinstalamos',
    img: '/lavagem-vertical-cortinas-800.avif',
    prob: 'Lavar cortina sob medida na máquina doméstica quebra as fibras, encolhe o tecido e danifica o blackout.',
    sol: 'Atendemos Volta Redonda, Barra Mansa, Resende, Barra do Piraí, Piraí e Pinheiral: retiramos sua cortina de tecido, higienizamos na vertical conforme o material e reinstalamos revisando trilhos e deslizantes.',
    pageUrl: '/lavagem-de-cortinas/'
  },
  romana: {
    refTitle: 'Persiana Romana e Double Vision Sob Medida',
    kicker: '✦ Referência da Solução · Romana & Double Vision',
    title: 'Gomos horizontais estruturados e faixas translúcidas',
    img: '/blackout-sq.avif',
    prob: 'Janela acima de bancada e home office precisavam de recolhimento compacto com estética acolhedora.',
    sol: 'Persiana Romana com varetas horizontais alinhadas ou Double Vision com faixas alternadas para dosar a luz ao longo do dia.',
    pageUrl: '/persianas/'
  },
  vertical: {
    refTitle: 'Persiana Vertical e Painel para Grandes Vãos',
    kicker: '✦ Referência da Solução · Grandes Vãos',
    title: 'Persiana Vertical e Painel com recolhimento lateral limpo',
    img: '/hero-sala.avif',
    prob: 'Portas de correr e grandes vãos pediam controle gradual da claridade e passagem livre.',
    sol: 'Persiana Vertical com giro de 180° ou Painel em trilho multipistas confeccionados sob medida para o vão.',
    pageUrl: '/trilhos-e-acionamentos/'
  }
};

const isaniRooms = {
  estar: {
    name: 'Sala de Estar',
    kind: 'tecido',
    img: '/cortina-sob-medida.avif',
    title: 'Cortina Wave em Tecido Encorpado',
    quote: '"Na sala de estar, a cortina precisa conversar com o sofá e o tapete. Indico tecido encorpado com toque de linho (acima de 170 g/m² e até 10% de linho na composição) que desce pesado e alinhado, sem amarrotar."'
  },
  tv: {
    name: 'Sala de TV',
    kind: 'tecido',
    img: '/blackouts-tecnicos.avif',
    title: 'Cortina de Tecido + Forro Blackout 100%',
    quote: '"Na maioria das salas de TV prefiro cortina de tecido com forro blackout 100%, que deixa o ambiente acolhedor, reduz de 5 a 6 °C do calor e veda melhor nas laterais. A cor pode ser clara: branco ou areia vedam 100% igual ao escuro."'
  },
  quarto: {
    name: 'Quarto / Suíte',
    kind: 'tecido',
    img: '/blackout-sq.avif',
    title: 'Cortina com Blackout 100% ou Romana',
    quote: '"Para escurecer o quarto de verdade e ganhar conforto térmico, trabalhamos com forro blackout 100% no cortineiro, opção de transpasse central de 15 cm e pontas laterais fixadas."'
  },
  varanda: {
    name: 'Varanda Gourmet',
    kind: 'estruturada',
    img: '/tela-solar-sq.avif',
    title: 'Persiana Rolô Tela Solar (Corta-Calor)',
    quote: '"Para varanda gourmet e sacada, a campeã é a Tela Solar (Screen) ou Pinpoint com fibra de vidro: filtra os raios solares e reduz o calor em até cerca de 11 °C mantendo a vista externa."'
  },
  office: {
    name: 'Escritório',
    kind: 'estruturada',
    img: '/madeira-sq.avif',
    title: 'Persiana Madeira 50 mm, Romana ou Double Vision',
    quote: '"Para controlar o reflexo nas telas com presença arquitetônica, indico Double Vision, Romana ou a Persiana Horizontal de Madeira natural de 50 mm."'
  },
  cozinha: {
    name: 'Cozinha',
    kind: 'estruturada',
    img: '/persiana-motorizada-sq.avif',
    title: 'Persiana Rolô Tela Solar 5% ou Alumínio',
    quote: '"Na cozinha, onde há gordura e vapor do preparo, indico a Persiana Rolô em Tela Solar 5% (lavável com pano úmido) ou a Horizontal de Alumínio 25 mm pela facilidade de limpeza."'
  },
  banheiro: {
    name: 'Banheiro',
    kind: 'estruturada',
    img: '/persiana-motorizada-sq.avif',
    title: 'Persiana Horizontal de Alumínio ou PVC',
    quote: '"Para janela de banheiro e área com vapor direto do chuveiro, trabalhamos com Persiana Horizontal em Alumínio ou PVC, materiais que não absorvem umidade nem mofam."'
  }
};

const isaniVaos = {
  cortineiro: {
    name: 'Com Gesso',
    label: 'No seu cortineiro:',
    textTecido: 'Pedimos vão livre mínimo de 15 × 15 cm no gesso para a onda correr livre (18 a 20 cm para trilho duplo), com acabamento a 1 cm do piso e bainha dupla nos tecidos leves.',
    textEstruturada: 'O tubo ou cabeçote fica embutido dentro do cortineiro de gesso, deixando apenas a tela ou as lâminas aparentes.'
  },
  semgesso: {
    name: 'Sem Gesso',
    label: 'Sem cortineiro de gesso:',
    textTecido: 'Em vãos acima de 2,00 m usamos o Tubo Suíço em alumínio: a cortina desliza por baixo de ponta a ponta sem travar no suporte central.',
    textEstruturada: 'Instalamos com bandô técnico em alumínio coordenado com a peça para acabamento limpo na parede ou no teto.'
  },
  duplo: {
    name: 'Pé-Direito Duplo',
    label: 'Em pé-direito duplo:',
    textTecido: 'Indicamos trilho motorizado com acionamento no controle, Alexa ou leve toque no tecido (na cortina de tecido é possível abrir manualmente se faltar luz).',
    textEstruturada: 'Indicamos motorização com acionamento silencioso por controle ou Alexa (nas persianas Rolô, Romana e Horizontal o freio do motor trava a abertura manual se faltar luz, exceto Painel e Vertical).'
  }
};

function setIsaniDiag(type, val) {
  diagState[type] = val;
  if (type === 'room') {
    ['estar', 'tv', 'quarto', 'varanda', 'office', 'cozinha', 'banheiro'].forEach((k) => {
      const el = document.getElementById('diag-r-' + k);
      if (el) el.classList.toggle('is-active', k === val);
    });
  } else {
    ['cortineiro', 'semgesso', 'duplo'].forEach((k) => {
      const el = document.getElementById('diag-v-' + k);
      if (el) el.classList.toggle('is-active', k === val);
    });
  }
  const r = isaniRooms[diagState.room];
  const v = isaniVaos[diagState.vao];
  if (!r || !v) return;
  shineJourney.consultor = r.name + ' · ' + v.name + ' (' + r.title + ')';
  saveJourney();
  trackShineEvent('shine_consultor', {
    ambiente: r.name,
    vao: v.name,
    solucao: r.title
  });
  document.getElementById('isani-diag-badge').textContent = '✓ Indicação para: ' + r.name + ' · ' + v.name;
  document.getElementById('isani-diag-img').src = r.img;
  document.getElementById('isani-diag-title').textContent = r.title;
  document.getElementById('isani-diag-p1').textContent = r.quote;
  document.getElementById('isani-diag-vao-label').textContent = v.label;
  document.getElementById('isani-diag-vao-text').textContent = r.kind === 'estruturada' ? v.textEstruturada : v.textTecido;

  const box = document.getElementById('isani-verdict-box');
  if (box) {
    box.classList.remove('is-flashing');
    requestAnimationFrame(() => box.classList.add('is-flashing'));
  }

  const msg = `Olá! Vi a indicação do Isani no site para ${r.name} (${v.name}: ${r.title}) e quero agendar minha consultoria gratuita em casa.`;
  const waBtn = document.getElementById('isani-diag-wa');
  if (waBtn) {
    waBtn.href = 'https://wa.me/5524993298763?text=' + encodeURIComponent(msg);
  }
}

function openCaseSheet(id) {
  currentSheetId = id;
  const item = caseCatalog[id];
  if (!item) return;
  addUniqueRecent(shineJourney.obras, item.refTitle, 3);
  saveJourney();
  trackShineEvent('shine_obra_aberta', {
    obra_id: id,
    titulo: item.refTitle,
    tem_video: Boolean(item.videoId)
  });
  const sheetImg = document.getElementById('sheet-img');
  sheetImg.onerror = function () {
    this.onerror = null;
    this.src = '/cortina-sob-medida.avif';
  };
  sheetImg.src = item.img;
  document.getElementById('sheet-kicker').textContent = item.kicker;
  document.getElementById('sheet-title').textContent = item.title;
  document.getElementById('sheet-prob').textContent = item.prob;
  document.getElementById('sheet-sol').textContent = item.sol;
  document.getElementById('sheet-wa-btn').href =
    'https://wa.me/5524993298763?text=' +
    encodeURIComponent('Olá! Gostei da referência "' + item.refTitle + '" no site da Shine e quero orçar.');
  const pageLink = document.getElementById('sheet-page-link');
  if (pageLink) {
    if (item.pageUrl) {
      pageLink.style.display = 'inline-block';
      pageLink.href = item.pageUrl;
    } else {
      pageLink.style.display = 'none';
    }
  }
  const vBtn = document.getElementById('sheet-video-btn');
  if (vBtn) {
    if (item.videoId) {
      vBtn.style.display = 'inline-flex';
      vBtn.onclick = function () {
        closeCaseSheet();
        openVideoModal(
          item.kicker,
          item.videoId,
          'Vi o vídeo "' + item.refTitle + '" no site e quero orçar um projeto semelhante.',
          item.pageUrl || '/videos/'
        );
      };
    } else {
      vBtn.style.display = 'none';
    }
  }
  syncSheetSaveButton();
  const modal = document.getElementById('case-sheet-modal');
  const popup = modal.querySelector('.d-case-sheet-popup');
  if (popup) popup.scrollTop = 0;
  pushModalHistoryState();
  modal.classList.add('is-open');
  syncBodyScrollLock();
}

function closeCaseSheet() {
  const modal = document.getElementById('case-sheet-modal');
  if (modal) modal.classList.remove('is-open');
  syncBodyScrollLock();
}

function syncSheetSaveButton() {
  const item = caseCatalog[currentSheetId];
  const btn = document.getElementById('sheet-save-btn');
  if (!btn || !item) return;
  const saved = savedReferences.has(item.refTitle);
  btn.classList.toggle('is-saved', saved);
  btn.textContent = saved ? '♥ Salvo nos Favoritos' : '♡ Salvar referência';
}

function syncSavedTilesDOM() {
  Object.keys(caseCatalog).forEach((id) => {
    const item = caseCatalog[id];
    if (!item) return;
    const isSaved = savedReferences.has(item.refTitle);
    const tile = document.querySelector('.d-ig-tile[data-id="' + id + '"]');
    const heart = tile ? tile.querySelector('.d-ig-heart') : null;
    if (tile) tile.classList.toggle('is-saved', isSaved);
    if (heart) {
      heart.classList.toggle('is-saved', isSaved);
      heart.textContent = isSaved ? '♥' : '♡';
    }
  });
}

function toggleTileRef(id) {
  const item = caseCatalog[id];
  if (!item) return;
  let acao = 'salvar';
  if (savedReferences.has(item.refTitle)) {
    savedReferences.delete(item.refTitle);
    acao = 'remover';
  } else {
    savedReferences.add(item.refTitle);
  }
  persistSavedReferences();
  syncSavedTilesDOM();
  syncSheetSaveButton();
  updateSelectionUI();
  trackShineEvent('shine_favorito', {
    obra_id: id,
    titulo: item.refTitle,
    acao: acao,
    total_salvos: savedReferences.size
  });
}

function updateSelectionUI() {
  const count = savedReferences.size;
  const list = Array.from(savedReferences);
  const headerCount = document.getElementById('header-saved-count');
  const igTabCount = document.getElementById('ig-tab-count');
  const selBar = document.getElementById('selection-bar');
  const selTitle = document.getElementById('selection-title');
  const selDesc = document.getElementById('selection-desc');
  const selBtn = document.getElementById('selection-wa-btn');

  if (headerCount) headerCount.textContent = count === 1 ? '1 salva' : count + ' salvas';
  if (igTabCount) {
    igTabCount.textContent = count;
    igTabCount.classList.toggle('is-zero', count === 0);
  }

  if (!selBar || !selTitle || !selDesc || !selBtn) return;

  if (count === 0) {
    selBar.classList.add('is-empty');
    selTitle.textContent = '📋 Sua pasta de referências (0 salvas)';
    selDesc.textContent = 'Toque no ♡ nas fotos acima para salvar seus projetos preferidos e enviar pelo WhatsApp.';
    selBtn.textContent = 'Enviar Minha Seleção pelo WhatsApp →';
    selBtn.href =
      'https://wa.me/5524993298763?text=' +
      encodeURIComponent('Olá! Estava navegando pelo portfólio da Shine e gostaria de agendar uma consultoria gratuita em casa.');
  } else {
    selBar.classList.remove('is-empty');
    selTitle.textContent = '📋 ' + count + (count === 1 ? ' referência salva' : ' referências salvas') + ' para a visita:';
    selDesc.textContent = list.join('  •  ');
    selBtn.textContent = 'Enviar ' + count + (count === 1 ? ' Referência' : ' Referências') + ' pelo WhatsApp →';

    const msg =
      'Olá! Naveguei pelo acervo da Shine e salvei estas referências para a minha casa:\n\n' +
      list.map((item, idx) => idx + 1 + '. ' + item).join('\n') +
      '\n\nGostaria de agendar a consultoria gratuita com o mostruário.';
    selBtn.href = 'https://wa.me/5524993298763?text=' + encodeURIComponent(msg);
  }
}

const groupTaxonomy = {
  tecido: {
    title: 'Escolha o acabamento da Cortina de Tecido:',
    subgroups: [
      { cat: 'tecido', label: 'Todas de Tecido', rule: '✦ Alfaiataria sob medida do teto ao piso a 1 cm do chão, com bainha dupla nos tecidos leves.' },
      { cat: 'wave', label: 'Cortina Wave', rule: '✦ Ondas simétricas e contínuas que deslizam suaves no cortineiro (15 × 15 cm) ou no Tubo Suíço.' },
      { cat: 'pregafemea', label: 'Prega Fêmea', rule: '✦ Pregas embutidas com caimento clássico e estruturado para salas e suítes.' },
      { cat: 'pregamacho', label: 'Prega Macho', rule: '✦ Volume tradicional de alfaiataria com pregas salientes costuradas no ateliê.' },
      { cat: 'franzida', label: 'Cortina Franzida', rule: '✦ Franzimento delicado e contínuo no cabeçote com textura acolhedora.' }
    ]
  },
  estruturada: {
    title: 'Escolha o modelo (Rolô, Romana, Double Vision ou Painel):',
    subgroups: [
      { cat: 'estruturada', label: 'Todos os Modelos', rule: '✦ Proteção solar técnica e recolhimento compacto para varandas, salas e quartos.' },
      { cat: 'rolo', label: 'Persiana Rolô', rule: '✦ Tela Solar corta-calor (reduz até cerca de 11 °C na fibra de vidro) ou Blackout em recolhimento cilíndrico.' },
      { cat: 'romana', label: 'Persiana Romana', rule: '✦ Recolhimento em gomos horizontais alinhados, ideal para janelas acima de bancadas.' },
      { cat: 'doublevision', label: 'Double Vision', rule: '✦ Faixas alternadas translúcidas e opacas para dosar a luz e a privacidade.' },
      { cat: 'painel', label: 'Cortina Painel', rule: '✦ Folhas largas que correm em trilho multipistas para portas de correr e grandes vãos.' }
    ]
  },
  persiana: {
    title: 'Escolha o modelo ou material da Persiana:',
    subgroups: [
      { cat: 'persiana', label: 'Todas Persianas', rule: '✦ Controle preciso de claridade e ventilação com giro de lâminas.' },
      { cat: 'horizontal', label: 'Persiana Horizontal', rule: '✦ Inclui todas as nossas Persianas Horizontais em Madeira Natural 50 mm e Alumínio 25 mm.' },
      { cat: 'madeira', label: 'Persiana de Madeira', rule: '✦ Persiana Horizontal em lâminas naturais de 50 mm para salas e escritórios.' },
      { cat: 'aluminio', label: 'Persiana de Alumínio', rule: '✦ Persiana Horizontal em lâminas de 25 mm resistente à umidade para cozinhas e banheiros.' },
      { cat: 'vertical', label: 'Persiana Vertical', rule: '✦ Lâminas verticais com giro de 180° e recolhimento lateral para grandes vãos.' }
    ]
  }
};

let currentFilterCat = 'all';
let currentMainGroup = 'all';
let visibleBentoLimit = 4;

function countTilesForCat(cat) {
  const allTiles = Array.from(document.querySelectorAll('.d-ig-tile'));
  if (cat === 'all') return allTiles.length;
  return allTiles.filter((tile) => {
    const tokens = (tile.getAttribute('data-cat') || '').split(/\s+/);
    return tokens.includes(cat);
  }).length;
}

function selectMainGroup(groupKey, btn) {
  document.querySelectorAll('#main-group-filters .d-filter-btn').forEach((b) => b.classList.remove('is-active'));
  if (btn) {
    btn.classList.add('is-active');
    btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }
  currentMainGroup = groupKey;
  currentFilterCat = groupKey;
  visibleBentoLimit = 4;
  trackShineEvent('shine_filtro_acervo', { grupo: groupKey });

  if (groupKey === 'insta') {
    syncInstagramHashtagFeed(true);
  }

  const panel = document.getElementById('sub-group-panel');
  const titleEl = document.getElementById('sub-group-title');
  const listEl = document.getElementById('sub-group-list');
  const ruleEl = document.getElementById('sub-group-rule');

  if (groupTaxonomy[groupKey]) {
    const cfg = groupTaxonomy[groupKey];
    titleEl.textContent = cfg.title;
    listEl.style.display = 'flex';
    listEl.innerHTML = '';
    cfg.subgroups.forEach((sg, idx) => {
      const c = countTilesForCat(sg.cat);
      const sbtn = document.createElement('button');
      sbtn.type = 'button';
      sbtn.setAttribute('data-subcat', sg.cat);
      sbtn.setAttribute('data-sublabel', sg.label);
      sbtn.className = 'd-sub-btn' + (idx === 0 ? ' is-active' : '');
      sbtn.textContent = sg.label + ' (' + c + ')';
      sbtn.onclick = function () {
        document.querySelectorAll('#sub-group-list .d-sub-btn').forEach((b) => b.classList.remove('is-active'));
        sbtn.classList.add('is-active');
        currentFilterCat = sg.cat;
        visibleBentoLimit = 4;
        ruleEl.innerHTML = sg.rule;
        trackShineEvent('shine_filtro_acervo', { grupo: groupKey, subgrupo: sg.cat });
        renderBentoGrid();
      };
      listEl.appendChild(sbtn);
    });
    ruleEl.innerHTML = cfg.subgroups[0].rule;
    panel.classList.add('is-open');
  } else {
    panel.classList.remove('is-open');
  }

  renderBentoGrid();
}

function renderBentoGrid() {
  const allTiles = Array.from(document.querySelectorAll('.d-ig-tile'));
  const matching = allTiles.filter((tile) => {
    const tokens = (tile.getAttribute('data-cat') || '').split(/\s+/);
    return currentFilterCat === 'all' || tokens.includes(currentFilterCat);
  });

  allTiles.forEach((tile) => {
    tile.classList.add('is-hidden');
    tile.classList.remove('bento-pos-0', 'bento-pos-1', 'bento-pos-2', 'bento-pos-3');
  });

  const shown = matching.slice(0, visibleBentoLimit);
  shown.forEach((tile, idx) => {
    tile.classList.remove('is-hidden');
    tile.classList.add('bento-pos-' + (idx % 4));
  });

  const countEl = document.getElementById('sub-group-count');
  if (countEl) {
    countEl.textContent = matching.length + (matching.length === 1 ? ' item' : ' itens');
  }

  const wrap = document.getElementById('bento-more-wrap');
  const btn = document.getElementById('bento-more-btn');
  const counter = document.getElementById('bento-counter');
  if (!wrap || !btn || !counter) return;

  if (matching.length <= 4) {
    wrap.style.display = 'none';
  } else {
    wrap.style.display = 'flex';
    const remaining = matching.length - shown.length;
    if (remaining > 0) {
      const nextBatch = Math.min(4, remaining);
      btn.textContent = '➕ Ver mais projetos (+' + nextBatch + ' opções) ↓';
      counter.textContent = 'Mostrando ' + shown.length + ' de ' + matching.length + ' projetos do acervo';
    } else {
      btn.textContent = '↑ Recolher galeria (Ver apenas 4)';
      counter.textContent = 'Mostrando todos os ' + matching.length + ' projetos do acervo';
    }
  }
}

function toggleMoreProjects() {
  const allTiles = Array.from(document.querySelectorAll('.d-ig-tile'));
  const matching = allTiles.filter((tile) => {
    const tokens = (tile.getAttribute('data-cat') || '').split(/\s+/);
    return currentFilterCat === 'all' || tokens.includes(currentFilterCat);
  });
  if (visibleBentoLimit < matching.length) {
    visibleBentoLimit += 4;
    shineJourney.verMaisCliques = (shineJourney.verMaisCliques || 0) + 1;
    saveJourney();
    trackShineEvent('shine_ver_mais', {
      filtro: currentFilterCat,
      visiveis: Math.min(visibleBentoLimit, matching.length),
      total: matching.length
    });
  } else {
    visibleBentoLimit = 4;
    const p = document.getElementById('portfolio');
    if (p) p.scrollIntoView({ behavior: 'smooth' });
  }
  renderBentoGrid();
}

function openVideoModal(title, videoIdOrUrl, waText, pageUrl) {
  addUniqueRecent(shineJourney.videos, title, 2);
  saveJourney();
  trackShineEvent('shine_video_play', {
    titulo: title,
    video_id: String(videoIdOrUrl)
  });
  document.getElementById('video-modal-title').textContent = title;
  const box = document.getElementById('video-modal-box');
  if (String(videoIdOrUrl).startsWith('http')) {
    box.innerHTML =
      '<video src="' +
      escapeHtml(videoIdOrUrl) +
      '" controls autoplay playsinline style="width:100%;height:100%;object-fit:cover;"></video>';
  } else {
    const cleanVideoId = String(videoIdOrUrl).replace(/[^a-zA-Z0-9_-]/g, '');
    box.innerHTML =
      '<iframe src="https://customer-zheg6rb9ddhx9h8y.cloudflarestream.com/' +
      cleanVideoId +
      '/iframe?autoplay=true&muted=false&preload=true" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen title="' +
      escapeHtml(title) +
      '"></iframe>';
  }
  document.getElementById('video-modal-wa').href =
    'https://wa.me/5524993298763?text=' + encodeURIComponent('Olá! ' + waText);
  document.getElementById('video-modal-wa').textContent = '💬 Quero orçar um projeto igual →';
  const vPage = document.getElementById('video-modal-page');
  if (vPage) {
    vPage.href = pageUrl || '/videos/';
  }
  pushModalHistoryState();
  document.getElementById('video-modal').classList.add('is-open');
  syncBodyScrollLock();
}

function closeVideoModal() {
  const box = document.getElementById('video-modal-box');
  if (box) box.innerHTML = '';
  const modal = document.getElementById('video-modal');
  if (modal) modal.classList.remove('is-open');
  syncBodyScrollLock();
}

function closeAllModals() {
  closeCaseSheet();
  closeArticleSheet();
  closeMenuSheet();
  closeVideoModal();
}

function setViewportMode(mode) {
  if (mode === 'mobile') {
    document.body.classList.add('is-mobile-sim');
  } else {
    document.body.classList.remove('is-mobile-sim');
  }
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeAllModals();
  }
});

window.addEventListener('popstate', function () {
  const anyOpen = document.querySelector('.d-case-modal.is-open, .d-video-modal.is-open');
  if (anyOpen) {
    closeAllModals();
  }
});

// SINCRONIZADOR AUTOMÁTICO COM /api/instagram (FILTRADO POR #acervoshine)
let isSyncingInstagram = false;
let hasSyncedCurated = false;

async function syncInstagramHashtagFeed(includeAllApproved = false) {
  if (isSyncingInstagram) return;
  if (hasSyncedCurated && !includeAllApproved) return;
  isSyncingInstagram = true;
  try {
    const res = await fetch('/api/instagram');
    if (!res.ok) return;
    const data = await res.json();
    if (!data || !Array.isArray(data.items) || data.items.length === 0) return;

    const grid = document.querySelector('.d-ig-grid');
    if (!grid) return;

    // Por padrão no carregamento do acervo, injeta apenas posts marcados explicitamente com #acervoshine / #nosite (isPinned === true).
    const postsToInject = includeAllApproved
      ? data.items
      : data.items.filter((p) => p && p.isPinned === true);

    const anchorTile = grid.children[3] || null;
    postsToInject.forEach((post, i) => {
      if (!post.image) return;
      const safeId = 'ig_live_' + String(post.id || i).replace(/[^a-zA-Z0-9_-]/g, '');
      if (caseCatalog[safeId]) return;

      const isReel = post.type === 'VIDEO' && post.video;
      const city = post.city || 'Sul Fluminense';
      const title = post.title || 'Obra Real @shinecortinas';
      const cats = Array.isArray(post.cats) ? post.cats.join(' ') : 'insta tecido wave';
      const fallbackImg = getFallbackImageForCats(cats);

      caseCatalog[safeId] = {
        refTitle: (isReel ? 'Reel @shine: ' : 'Obra @shine: ') + title + ' (' + city + ')',
        kicker: (isReel ? '▶ Reel @shinecortinas · ' : '🟢 Obra @shinecortinas · ') + city,
        title: title,
        img: post.image,
        prob: 'Projeto real publicado no nosso Instagram oficial @shinecortinas (' + city + ').',
        sol: post.cleanCaption || post.caption || 'Confeccionada sob medida no ateliê da Shine com instalação própria.',
        videoId: isReel ? post.video : null,
        pageUrl: '/portfolio/'
      };

      const tile = document.createElement('div');
      tile.className = 'd-ig-tile is-hidden';
      tile.setAttribute('data-id', safeId);
      tile.setAttribute('data-cat', cats);
      tile.onclick = function () {
        openCaseSheet(safeId);
      };
      tile.innerHTML =
        '<img src="' +
        escapeHtml(post.image) +
        '" alt="' +
        escapeHtml(title) +
        '" width="400" height="400" loading="lazy" decoding="async" onerror="this.onerror=null;this.src=\'' +
        fallbackImg +
        '\'">' +
        '<div class="d-ig-tile__top">' +
        '<span class="d-ig-tag d-ig-tag--live">' +
        (isReel ? '▶ Reel · ' : '🟢 @shine · ') +
        escapeHtml(city) +
        '</span>' +
        '<button type="button" class="d-ig-heart" aria-label="Salvar projeto na pasta de referências" onclick="event.stopPropagation(); toggleTileRef(\'' +
        safeId +
        '\')">♡</button>' +
        '</div>' +
        '<div class="d-ig-tile__bottom">' +
        '<strong>' +
        escapeHtml(title) +
        '</strong>' +
        '<span>' +
        (isReel ? '▶ Vídeo real · Toque para assistir' : 'Obra real · Ver ficha') +
        '</span>' +
        '</div>';

      if (post.isPinned) {
        grid.insertBefore(tile, grid.firstChild);
      } else if (i === 0 && anchorTile) {
        grid.insertBefore(tile, anchorTile);
      } else {
        grid.appendChild(tile);
      }
    });

    hasSyncedCurated = true;
    syncSavedTilesDOM();

    const allTiles = Array.from(document.querySelectorAll('.d-ig-tile'));
    const instaTiles = allTiles.filter((t) => (t.getAttribute('data-cat') || '').split(/\s+/).includes('insta'));
    const btnAll = document.getElementById('filter-btn-all');
    const btnInsta = document.getElementById('filter-btn-insta');
    if (btnAll) btnAll.textContent = '✦ Todos (' + allTiles.length + ')';
    if (btnInsta) btnInsta.textContent = '🟢 Obras Reais (' + instaTiles.length + ')';

    document.querySelectorAll('#sub-group-list .d-sub-btn').forEach((sbtn) => {
      const cat = sbtn.getAttribute('data-subcat');
      const lbl = sbtn.getAttribute('data-sublabel');
      if (cat && lbl) {
        sbtn.textContent = lbl + ' (' + countTilesForCat(cat) + ')';
      }
    });

    renderBentoGrid();
  } catch (_) {
    // Mantém o acervo curado caso /api/instagram esteja offline
  } finally {
    isSyncingInstagram = false;
  }
}

// Inicialização
loadJourney();
loadSavedReferences();
syncSavedTilesDOM();
updateSelectionUI();

if ('IntersectionObserver' in window) {
  const navTabs = Array.from(document.querySelectorAll('.d-ig-tab[data-nav-sec]'));
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navTabs.forEach((t) => t.classList.toggle('is-highlight', t.getAttribute('data-nav-sec') === id));
        }
      });
    },
    { rootMargin: '-35% 0px -50% 0px', threshold: 0 }
  );
  ['top', 'diagnostico-isani', 'portfolio', 'blog'].forEach((secId) => {
    const el = document.getElementById(secId);
    if (el) spyObserver.observe(el);
  });

  // Dispara sync do Instagram quando o visitante se aproxima do portfólio
  const portfolioEl = document.getElementById('portfolio');
  if (portfolioEl) {
    const igObserver = new IntersectionObserver(
      (entries, obs) => {
        if (entries.some((e) => e.isIntersecting)) {
          obs.disconnect();
          syncInstagramHashtagFeed(false);
        }
      },
      { rootMargin: '300px 0px' }
    );
    igObserver.observe(portfolioEl);
  }
}

if (location.search.includes('sim=mobile')) {
  setViewportMode('mobile');
}
renderBentoGrid();
