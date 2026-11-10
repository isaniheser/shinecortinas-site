// Módulo compartilhado do Acervo Mosaico Bento (4+4 progressivo, filtros de 2 níveis,
// pasta de referências com ♡ e sincronização automática com /api/instagram).
// Usado tanto na Home (scripts/build-home.mjs) quanto em /portfolio/ (scripts/build-paginas.mjs).

import { esc } from './partials.mjs';

export const BENTO_ITEMS = [
  {
    id: 'duplo',
    cats: 'tecido wave pedireitoduplo motorizada insta',
    img: '/hall-wave-volta-redonda-800.avif',
    srcset: '/hall-wave-volta-redonda-800.avif 800w, /hall-wave-volta-redonda.avif 1216w',
    alt: 'Obra real de Cortina Wave em pé-direito alto instalada em Volta Redonda RJ',
    pos: 'center 45%',
    tag: '🟢 Obra Real · Volta Redonda',
    title: 'Pé-Direito Duplo · Wave',
    sub: '▶ Vídeo real · Ver ficha',
    initialClass: 'bento-pos-0'
  },
  {
    id: 'resende_real',
    cats: 'tecido wave pedireitoduplo motorizada insta',
    img: '/poster-cortina-motorizada-wave-resende.avif',
    alt: 'Obra real de Cortina Wave motorizada instalada em Resende RJ',
    pos: 'center 50%',
    tag: '🟢 Obra Real · Resende',
    title: 'Wave Motorizada · Resende',
    sub: '▶ Vídeo real · Ver ficha',
    initialClass: 'bento-pos-1'
  },
  {
    id: 'madeira',
    cats: 'persiana horizontal madeira insta',
    img: '/madeira-sq.avif',
    alt: 'Obra real de Persiana Horizontal de Madeira 50 mm em Barra Mansa RJ',
    pos: 'center 50%',
    tag: '🟢 Obra Real · Barra Mansa',
    title: 'Persiana Madeira 50 mm',
    sub: '▶ Vídeo real · Ver ficha',
    initialClass: 'bento-pos-2'
  },
  {
    id: 'solar',
    cats: 'estruturada rolo persiana',
    img: '/tela-solar-sq.avif',
    alt: 'Imagem de referência de Persiana Rolô Tela Solar corta-calor para varanda',
    pos: 'center 55%',
    tag: '✦ Referência · Tela Solar',
    title: 'Persiana Rolô · Tela Solar',
    sub: 'Corta-calor UV · Ver ficha',
    initialClass: 'bento-pos-3'
  },
  {
    id: 'wave',
    cats: 'tecido wave',
    img: '/cortina-sob-medida.avif',
    alt: 'Imagem de referência de Cortina Prega Wave sob medida para sala',
    pos: 'center 65%',
    tag: '✦ Referência · Wave',
    title: 'Cortina Wave · Sala',
    sub: 'Toque de linho · Ver ficha',
    initialClass: 'is-hidden'
  },
  {
    id: 'blackout',
    cats: 'tecido wave blackout',
    img: '/blackouts-tecnicos.avif',
    alt: 'Imagem de referência de Cortina com Forro Blackout 100% para quarto e sala de TV',
    pos: 'center 55%',
    tag: '✦ Referência · Blackout',
    title: 'Blackout 100%',
    sub: 'Bloqueio de luz · Ver ficha',
    initialClass: 'is-hidden'
  },
  {
    id: 'vassouras',
    cats: 'tecido wave pedireitoduplo blackout insta',
    img: '/poster-cortina-cabana-chale-vassouras.avif',
    alt: 'Obra real de cortina sob medida em Chalé A-Frame em Vassouras RJ',
    pos: 'center 45%',
    tag: '🟢 Obra Real · Vassouras',
    title: 'Chalé A-Frame · Vão Alto',
    sub: '▶ Vídeo real · Ver ficha',
    initialClass: 'is-hidden'
  },
  {
    id: 'aluminio',
    cats: 'persiana horizontal aluminio',
    img: '/persiana-motorizada-sq.avif',
    alt: 'Imagem de referência de Persiana Horizontal de Alumínio 50 mm e 16 mm',
    pos: 'center 50%',
    tag: '✦ Referência · Alumínio',
    title: 'Persiana de Alumínio 50 mm e 16 mm',
    sub: 'Fácil limpeza · Ver ficha',
    initialClass: 'is-hidden'
  },
  {
    id: 'barradopirai',
    cats: 'tecido wave insta',
    img: '/poster-cortina-wave-linho-barra-do-pirai.avif',
    alt: 'Obra real de Cortina Wave com toque de linho instalada em Barra do Piraí RJ',
    pos: 'center 50%',
    tag: '🟢 Obra Real · Barra do Piraí',
    title: 'Wave Toque de Linho',
    sub: '▶ Vídeo real · Ver ficha',
    initialClass: 'is-hidden'
  },
  {
    id: 'mangaratiba',
    cats: 'estruturada rolo motorizada insta',
    img: '/poster-cortina-screen-motorizada-mangaratiba.avif',
    alt: 'Obra real de Persiana Rolô Screen motorizada em Mangaratiba RJ',
    pos: 'center 50%',
    tag: '🟢 Obra Real · Mangaratiba',
    title: 'Rolô Screen Motorizada',
    sub: '▶ Vídeo real · Ver ficha',
    initialClass: 'is-hidden'
  },
  {
    id: 'pregamacho',
    cats: 'tecido pregafemea pregamacho franzida',
    img: '/linha-puro-800.avif',
    srcset: '/linha-puro-800.avif 760w, /linha-puro.avif 1696w',
    alt: 'Imagem de referência de Cortina Prega Fêmea, Prega Macho e Franzida em tecido toque de linho',
    pos: 'center 50%',
    tag: '✦ Referência · Alfaiataria',
    title: 'Prega Fêmea, Macho e Franzida',
    sub: 'Costura própria · Ver ficha',
    initialClass: 'is-hidden'
  },
  {
    id: 'motor',
    cats: 'motorizada tecido wave',
    img: '/automacao-sq.avif',
    alt: 'Imagem de referência de Cortina Motorizada com controle remoto e Alexa',
    pos: 'center 75%',
    tag: '✦ Referência · Automação',
    title: 'Motorizada · Alexa e Controle',
    sub: 'Até 5 anos garantia · Ver ficha',
    initialClass: 'is-hidden'
  },
  {
    id: 'bainha',
    cats: 'tecido wave insta',
    img: '/poster-ajuste-bainha-em-casa-alfaiataria.avif',
    alt: 'Obra real mostrando ajuste de bainha a 1 cm do piso em Volta Redonda RJ',
    pos: 'center 50%',
    tag: '🟢 Obra Real · Volta Redonda',
    title: 'Bainha a 1 cm do Piso',
    sub: '▶ Vídeo real · Ver ficha',
    initialClass: 'is-hidden'
  },
  {
    id: 'lavagem',
    cats: 'lavagem',
    img: '/lavagem-vertical-cortinas-800.avif',
    alt: 'Serviço de lavagem e secagem vertical de cortinas de tecido',
    pos: '50% 68%',
    tag: '🟢 Serviço · 6 Cidades',
    title: 'Lavagem de Cortinas de Tecido',
    sub: 'Retirada em casa · Ver ficha',
    initialClass: 'is-hidden'
  },
  {
    id: 'romana',
    cats: 'estruturada romana doublevision persiana',
    img: '/blackout-sq.avif',
    alt: 'Imagem de referência de Persiana Romana e Double Vision sob medida',
    pos: 'center 50%',
    tag: '✦ Referência · Romana & Double',
    title: 'Romana & Double Vision',
    sub: 'Gomos estruturados · Ver ficha',
    initialClass: 'is-hidden'
  },
  {
    id: 'vertical',
    cats: 'persiana vertical estruturada painel',
    img: '/hero-sala-800.avif',
    srcset: '/hero-sala-800.avif 800w, /hero-sala-1200.avif 1200w, /hero-sala.avif 1920w',
    alt: 'Imagem de referência de Persiana Vertical e Cortina Painel para grandes vãos',
    pos: 'center 50%',
    tag: '✦ Referência · Grandes Vãos',
    title: 'Persiana Vertical & Painel',
    sub: 'Giro 180° e folhas largas · Ver ficha',
    initialClass: 'is-hidden'
  }
];

export function renderBentoSection({ isPortfolioPage = false } = {}) {
  const lastLink = isPortfolioPage
    ? '<a href="/videos/">Vídeos de Obras Reais ↗</a>'
    : '<a href="/portfolio/">Portfólio Completo ↗</a>';

  return `      <!-- ACERVO EM MOSAICO BENTO (4 POR VEZ + SINCRONIZADO COM @SHINECORTINAS) -->
      <section class="d-portfolio-sec" id="portfolio">
        <div class="d-container">
          <div class="d-sec-header">
            <p class="d-kicker">Acervo e Soluções · Obras Reais e Referências Sob Medida</p>
            <h2 class="d-h2">Escolha o modelo <em>ou toque na foto para abrir a ficha.</em></h2>
            <p class="d-sub">Filtre pela solução ideal para a sua janela ou toque no card para ver especificações, legenda do @shinecortinas, vídeo e orçamento rápido:</p>
          </div>

          <div class="d-intent-bar">
            <div class="d-intent-filters" id="main-group-filters" role="group" aria-label="Filtrar projetos por categoria">
              <button type="button" class="d-filter-btn is-active" id="filter-btn-all" data-group="all" onclick="selectMainGroup('all', this)">✦ Todos (${BENTO_ITEMS.length})</button>
              <button type="button" class="d-filter-btn" id="filter-btn-insta" data-group="insta" onclick="selectMainGroup('insta', this)">🟢 Obras Reais (6)</button>
              <button type="button" class="d-filter-btn" data-group="tecido" onclick="selectMainGroup('tecido', this)">Cortinas de Tecido ▾</button>
              <button type="button" class="d-filter-btn" data-group="estruturada" onclick="selectMainGroup('estruturada', this)">Rolô · Romana · Painel ▾</button>
              <button type="button" class="d-filter-btn" data-group="persiana" onclick="selectMainGroup('persiana', this)">Persianas ▾</button>
              <button type="button" class="d-filter-btn" data-group="pedireitoduplo" onclick="selectMainGroup('pedireitoduplo', this)">Pé-Direito Duplo</button>
              <button type="button" class="d-filter-btn" data-group="motorizada" onclick="selectMainGroup('motorizada', this)">Cortina Motorizada</button>
              <button type="button" class="d-filter-btn" data-group="blackout" onclick="selectMainGroup('blackout', this)">Blackout 100%</button>
              <button type="button" class="d-filter-btn" data-group="lavagem" onclick="selectMainGroup('lavagem', this)">Lavagem Vertical</button>
            </div>

            <div class="d-subgroup-panel" id="sub-group-panel">
              <div class="d-subgroup-header">
                <span id="sub-group-title">Acabamentos disponíveis:</span>
                <span id="sub-group-count"></span>
              </div>
              <div class="d-subgroup-list" id="sub-group-list"></div>
              <div class="d-hashtag-rule-badge" id="sub-group-rule"></div>
            </div>
          </div>

          <div class="d-ig-grid" id="cases-grid">
${BENTO_ITEMS.map(
  (item) => `            <div class="d-ig-tile ${item.initialClass}" role="button" tabindex="0" data-cat="${item.cats}" data-id="${item.id}" onclick="openCaseSheet('${item.id}')">
              <img src="${item.img}"${item.srcset ? ` srcset="${item.srcset}" sizes="(max-width: 960px) 60vw, 480px"` : ''} alt="${esc(item.alt)}" width="400" height="400" loading="lazy" decoding="async" style="object-position: ${item.pos};">
              <div class="d-ig-tile__top">
                <span class="d-ig-tag">${esc(item.tag)}</span>
                <button type="button" class="d-ig-heart" aria-label="Salvar projeto na pasta de referências" onclick="event.stopPropagation(); toggleTileRef('${item.id}')">♡</button>
              </div>
              <div class="d-ig-tile__bottom">
                <strong>${esc(item.title)}</strong>
                <span>${esc(item.sub)}</span>
              </div>
            </div>`
).join('\n')}
          </div>

          <div class="d-bento-more-wrap" id="bento-more-wrap">
            <button type="button" class="d-bento-more-btn" id="bento-more-btn" onclick="toggleMoreProjects()">
              ➕ Ver mais projetos (+4 opções) ↓
            </button>
            <span class="d-bento-counter" id="bento-counter">Mostrando 4 de ${BENTO_ITEMS.length} projetos do acervo</span>
          </div>

          <p class="d-portfolio-caption">Fotos identificadas com 🟢 retratam obras reais entregues pela nossa equipe no Sul Fluminense e sincronizadas com @shinecortinas. Fotos com ✦ são referências técnicas das soluções.</p>

          <!-- BARRA DE ENVIO DA SELEÇÃO DE PROJETOS PARA O WHATSAPP (OCULTA QUANDO 0 SALVAS) -->
          <div class="d-selection-bar is-empty" id="selection-bar">
            <div class="d-selection-info">
              <strong id="selection-title">📋 Sua pasta de referências (0 salvas)</strong>
              <p id="selection-desc">Toque no ♡ nas fotos acima para salvar seus projetos preferidos e enviar pelo WhatsApp.</p>
            </div>
            <a id="selection-wa-btn" class="d-gold-btn" data-wa="favoritos" data-wa-custom="1" href="https://wa.me/5524993298763?text=Ol%C3%A1%21%20Estava%20navegando%20pelo%20portf%C3%B3lio%20da%20Shine%20e%20gostaria%20de%20agendar%20uma%20consultoria%20gratuita%20em%20casa." target="_blank" rel="noopener">
              Enviar Minha Seleção pelo WhatsApp →
            </a>
          </div>

          <!-- BARRA DE PÁGINAS DEDICADAS DE SOLUÇÕES E SERVIÇOS -->
          <div class="d-solutions-bar">
            <span class="d-solutions-bar__title">Explorar páginas completas por solução:</span>
            <div class="d-solutions-links">
              <a href="/cortinas/">Cortinas Sob Medida ↗</a>
              <a href="/cortina-wave/">Cortina Prega Wave ↗</a>
              <a href="/persianas/">Persianas Sob Medida ↗</a>
              <a href="/cortina-motorizada/">Cortina Motorizada ↗</a>
              <a href="/blackout-e-forros/">Blackout e Forros ↗</a>
              <a href="/trilhos-e-acionamentos/">Trilhos e Acionamentos ↗</a>
              <a href="/lavagem-de-cortinas/">Lavagem de Cortinas ↗</a>
              ${lastLink}
            </div>
          </div>
        </div>
      </section>`;
}

export function renderBentoModals({ includeArticleModal = false, includeMenuModal = false, foundedYear = 2009 } = {}) {
  const caseModal = `  <!-- MODAL EXPANSÍVEL DO ACERVO -->
  <div class="d-case-modal" id="case-sheet-modal" role="dialog" aria-modal="true" aria-labelledby="sheet-title" onclick="if(event.target===this) closeCaseSheet()">
    <div class="d-case-sheet-popup">
      <div class="d-sheet-handle"></div>
      <div class="d-sheet-media">
        <img id="sheet-img" src="/cortina-sob-medida.avif" alt="Projeto ShineCortinas" width="400" height="400" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='/cortina-sob-medida.avif'">
        <button type="button" class="d-sheet-close" onclick="closeCaseSheet()">Fechar ✕</button>
        <button type="button" class="d-sheet-nav d-sheet-nav--prev" id="sheet-prev-btn" aria-label="Foto anterior" onclick="stepSheetGallery(-1)" style="display:none;">‹</button>
        <button type="button" class="d-sheet-nav d-sheet-nav--next" id="sheet-next-btn" aria-label="Próxima foto" onclick="stepSheetGallery(1)" style="display:none;">›</button>
        <span class="d-sheet-counter" id="sheet-counter" style="display:none;">1 / 1</span>
        <button type="button" id="sheet-video-btn" style="display:none; position:absolute; left:12px; bottom:12px; background:rgba(8,19,15,0.92); color:#FAF6EE; border:1.5px solid #C9A252; border-radius:99px; padding:8px 14px; font-size:12px; font-weight:700; cursor:pointer;">▶ Assistir Vídeo Real</button>
      </div>
      <div class="d-sheet-content">
        <div class="d-sheet-kicker" id="sheet-kicker">✦ Referência da Solução · Cortina Wave</div>
        <h3 id="sheet-title">Sala vestida do teto ao piso com luz suave</h3>
        <div class="d-sheet-details">
          <div id="sheet-prob-row">
            <strong>O que o ambiente pedia:</strong>
            <span id="sheet-prob">A sala parecia vazia e a claridade direta incomodava no sofá à tarde.</span>
          </div>
          <div>
            <strong id="sheet-sol-label">Solução sob medida Shine:</strong>
            <span id="sheet-sol">Cortina Prega Wave em tecido toque de linho com forro translúcido independente e acabamento a 1 cm do piso.</span>
          </div>
        </div>
        <a id="sheet-page-link" href="/cortina-wave/" class="d-sheet-page-link">Ver página completa desta solução ↗</a>
        <div class="d-sheet-actions">
          <button type="button" class="d-sheet-save-btn" id="sheet-save-btn" onclick="toggleTileRef(currentSheetId)">
            ♡ Salvar referência
          </button>
          <a class="d-gold-btn" id="sheet-wa-btn" data-wa="modal-acervo" data-wa-custom="1" style="padding: 14px 10px; font-size: 12.5px; border-radius: 14px;" href="https://wa.me/5524993298763?text=Ol%C3%A1%21%20Vi%20um%20projeto%20no%20acervo%20da%20Shine%20e%20quero%20or%C3%A7ar." target="_blank" rel="noopener">
            💬 Orçar igual →
          </a>
        </div>
      </div>
    </div>
  </div>`;

  const articleModal = includeArticleModal
    ? `
  <!-- MODAL LEITOR DE RESUMOS DO BLOG -->
  <div class="d-case-modal" id="article-sheet-modal" role="dialog" aria-modal="true" aria-labelledby="art-title" onclick="if(event.target===this) closeArticleSheet()">
    <div class="d-case-sheet-popup">
      <div class="d-sheet-handle"></div>
      <div class="d-sheet-content" style="padding-top: 10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <div class="d-sheet-kicker" id="art-kicker" style="margin:0;">📖 Blog do Isani · Guia Técnico</div>
          <button type="button" onclick="closeArticleSheet()" style="background:#0F201A; color:#fff; border:0; border-radius:99px; padding:6px 12px; font-size:12px; font-weight:700; cursor:pointer;">Fechar ✕</button>
        </div>
        <h3 id="art-title" style="font-size:22px; margin-bottom:12px;">Qual a medida ideal do cortineiro de gesso?</h3>
        <div class="d-sheet-details" id="art-body" style="font-size:13px; line-height:1.6;"></div>
        <a id="art-full-link" href="/blog/altura-ideal-da-cortina/" class="d-sheet-page-link">Abrir artigo completo no Blog ↗</a>
        <a class="d-gold-btn" id="art-wa-btn" data-wa="modal-blog" data-wa-custom="1" style="width:100%; font-size:12.5px; padding:14px 12px;" href="https://wa.me/5524993298763?text=Ol%C3%A1%21%20Estava%20lendo%20o%20guia%20t%C3%A9cnico%20no%20site%20da%20Shine%20e%20quero%20tirar%20uma%20d%C3%BAvida." target="_blank" rel="noopener">
          💬 Tirar dúvida com o Isani no WhatsApp →
        </a>
      </div>
    </div>
  </div>`
    : '';

  const menuModal = includeMenuModal
    ? `
  <!-- GAVETA DE MENU COMPLETO DO SITE -->
  <div class="d-case-modal" id="menu-sheet-modal" role="dialog" aria-modal="true" aria-label="Menu de navegação completa" onclick="if(event.target===this) closeMenuSheet()">
    <div class="d-case-sheet-popup">
      <div class="d-sheet-handle"></div>
      <div class="d-sheet-content" style="padding-top: 8px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <div>
            <div class="d-sheet-kicker" style="margin:0;">Navegação Completa · ShineCortinas</div>
            <h3 style="font-size:21px; margin:0;">Menu, Soluções e Cidades</h3>
          </div>
          <button type="button" onclick="closeMenuSheet()" style="background:#0F201A; color:#fff; border:0; border-radius:99px; padding:6px 13px; font-size:12px; font-weight:700; cursor:pointer;">Fechar ✕</button>
        </div>

        <div class="d-menu-group">
          <span class="d-menu-group-title">Páginas de Soluções Sob Medida</span>
          <div class="d-menu-links">
            <a href="/cortinas/" class="d-menu-item">
              <span>Cortinas Sob Medida</span>
              <small>Wave, Prega e Franzida</small>
            </a>
            <a href="/cortina-wave/" class="d-menu-item">
              <span>Cortina Prega Wave</span>
              <small>Toque de linho do teto ao piso</small>
            </a>
            <a href="/persianas/" class="d-menu-item">
              <span>Persianas Sob Medida</span>
              <small>Rolô, Romana, Madeira e Alumínio</small>
            </a>
            <a href="/cortina-motorizada/" class="d-menu-item">
              <span>Cortina Motorizada</span>
              <small>Controle remoto e Alexa</small>
            </a>
            <a href="/blackout-e-forros/" class="d-menu-item">
              <span>Blackout e Forros</span>
              <small>Blackout 100% e 70%</small>
            </a>
            <a href="/trilhos-e-acionamentos/" class="d-menu-item">
              <span>Trilhos e Acionamentos</span>
              <small>Tubo Suíço e Cortineiro</small>
            </a>
            <a href="/lavagem-de-cortinas/" class="d-menu-item">
              <span>Lavagem de Cortinas</span>
              <small>6 cidades atendidas</small>
            </a>
            <a href="/videos/" class="d-menu-item">
              <span>Vídeos de Obras Reais</span>
              <small>8 instalações filmadas</small>
            </a>
          </div>
        </div>

        <div class="d-menu-group">
          <span class="d-menu-group-title">📖 Guias Técnicos do Blog</span>
          <div class="d-menu-blog-list">
            <a href="/blog/altura-ideal-da-cortina/" class="d-menu-blog-btn">
              <div>Altura ideal da cortina e medidas de cortineiro</div>
              <span>Abrir ↗</span>
            </a>
            <a href="/blog/tipos-de-forro-para-cortina/" class="d-menu-blog-btn">
              <div>Tipos de forro para cortina: translúcido, 70% e 100%</div>
              <span>Abrir ↗</span>
            </a>
            <a href="/blog/por-que-escolher-cortina-motorizada/" class="d-menu-blog-btn">
              <div>Cortina motorizada elétrica ou a bateria</div>
              <span>Abrir ↗</span>
            </a>
            <a href="/blog/" class="d-menu-blog-btn">
              <div>Ver todos os 16 guias técnicos do Blog da Shine</div>
              <span>Abrir ↗</span>
            </a>
          </div>
        </div>

        <div class="d-menu-group">
          <span class="d-menu-group-title">Institucional e Atendimento</span>
          <div class="d-menu-links">
            <a href="/sobre/" class="d-menu-item">
              <span>Sobre Nós</span>
              <small>Isani Oliveira · Desde ${foundedYear}</small>
            </a>
            <a href="/cidades-atendidas/" class="d-menu-item">
              <span>15 Cidades Atendidas</span>
              <small>Sul Fluminense</small>
            </a>
            <a href="/faq/" class="d-menu-item">
              <span>Perguntas Frequentes</span>
              <small>Dúvidas sobre visita e prazos</small>
            </a>
            <a href="#selection-bar" class="d-menu-item" onclick="closeMenuSheet()">
              <span id="menu-saved-label">♡ Meus Salvos (0)</span>
              <small>Sua pasta de referências</small>
            </a>
          </div>
        </div>

        <a class="d-gold-btn" data-wa="menu-modal" data-wa-custom="1" style="width:100%; font-size:12.5px; padding:14px 12px;" href="https://wa.me/5524993298763?text=Ol%C3%A1%21%20Estava%20no%20menu%20do%20site%20da%20Shine%20e%20quero%20agendar%20uma%20consultoria%20gratuita." target="_blank" rel="noopener">
          💬 Falar Direto no WhatsApp (24) 99329-8763 →
        </a>
      </div>
    </div>
  </div>`
    : '';

  const videoModal = `
  <!-- MODAL DE VÍDEO REAL DA CIDADE -->
  <div class="d-video-modal" id="video-modal" role="dialog" aria-modal="true" aria-labelledby="video-modal-title" onclick="if(event.target===this) closeVideoModal()">
    <div class="d-video-player">
      <div class="d-video-player__top">
        <strong id="video-modal-title">📍 Obra Real ShineCortinas</strong>
        <button type="button" class="d-video-close" onclick="closeVideoModal()">Fechar ✕</button>
      </div>
      <div class="d-video-player__box" id="video-modal-box"></div>
      <div class="d-video-player__foot">
        <a id="video-modal-wa" class="d-gold-btn" data-wa="modal-video" data-wa-custom="1" style="width: 100%; font-size: 12.5px;" href="https://wa.me/5524993298763?text=Ol%C3%A1%21%20Assistindo%20ao%20v%C3%ADdeo%20de%20obra%20real%20no%20site%20da%20Shine%2C%20quero%20um%20projeto%20igual%20na%20minha%20janela." target="_blank" rel="noopener">
          💬 Quero um projeto igual na minha janela →
        </a>
        <a id="video-modal-page" href="/videos/" class="d-video-page-link">Ver ficha técnica completa deste vídeo ↗</a>
      </div>
    </div>
  </div>`;

  return [caseModal, articleModal, menuModal, videoModal].filter(Boolean).join('\n');
}
