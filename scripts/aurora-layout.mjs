// Moldura mobile-first unificada da ShineCortinas (mesma identidade em vidro escuro da Home,
// barra flutuante inferior de 5 atalhos e gavetas rápidas do Consultor Isani e Menu Completo).
export const AURORA_V = '6';
export const AURORA_CSS = `<link rel="stylesheet" href="/assets/shine-aurora.css?v=${AURORA_V}">`;

const WA_MENU =
  'https://wa.me/5524993298763?text=Ol%C3%A1%2C%20eu%20vim%20do%20site%20da%20Shine%20e%20quero%20agendar%20uma%20consultoria%20gratuita%20em%20casa.';

const DESKTOP_NAV = [
  ['/cortinas/', 'Cortinas'],
  ['/persianas/', 'Persianas'],
  ['/cortina-motorizada/', 'Motorizadas'],
  ['/lavagem-de-cortinas/', 'Lavagem'],
  ['/portfolio/', 'Acervo'],
  ['/cidades-atendidas/', 'Cidades'],
  ['/blog/', 'Blog']
];

export function auroraHeader(currentPath = '') {
  const navLinks = DESKTOP_NAV.map(([url, label]) => {
    const active =
      currentPath === url ||
      (url === '/cidades-atendidas/' && String(currentPath).startsWith('/cidades/')) ||
      (url === '/blog/' && String(currentPath).startsWith('/blog/'));
    return `<a href="${url}"${active ? ' aria-current="page"' : ''}>${label}</a>`;
  }).join('');

  return `<header class="sa-header">
    <div class="sa-header__in">
      <a href="/" class="sa-brand">
        <img src="/logo-shine.avif" alt="ShineCortinas" width="40" height="40" decoding="async">
        <div class="sa-brand__text">
          <strong>SHINECORTINAS</strong>
          <small>Ateliê Sob Medida · Desde 2009</small>
        </div>
      </a>
      <nav class="sa-nav" aria-label="Navegação principal">
        <button type="button" class="sa-nav__consultor" data-open-consultor>✦ Consultor Isani</button>
        ${navLinks}
      </nav>
      <div class="sa-header__cta">
        <a href="/portfolio/#selection-bar" class="sa-saved-pill is-zero" data-header-saved>
          <span>♡</span> <span data-saved-short>0 salvas</span>
        </a>
        <a class="sa-gold-btn" data-wa="header" href="${WA_MENU}" target="_blank" rel="noopener noreferrer">
          <span class="sa-hide-mob">Receber </span>Ateliê em Casa →
        </a>
      </div>
    </div>
  </header>`;
}

export function auroraMenu() {
  return `<!-- BARRA FLUTUANTE INFERIOR ESTILO APP (5 ATALHOS PARA O POLEGAR) -->
  <nav class="sa-tabbar" aria-label="Menu inferior rápido">
    <a href="/" class="sa-tab" data-tab-match="home">
      <strong>⌂</strong>
      <span>Início</span>
    </a>
    <button type="button" class="sa-tab" data-open-consultor>
      <strong>✦</strong>
      <span>Consultor</span>
    </button>
    <a href="/portfolio/" class="sa-tab" data-tab-match="portfolio">
      <strong>⊞</strong>
      <span>Acervo</span>
    </a>
    <a href="/blog/" class="sa-tab" data-tab-match="blog">
      <strong>📖</strong>
      <span>Blog</span>
    </a>
    <button type="button" class="sa-tab" data-open-menu>
      <strong>☰</strong>
      <span>Menu</span>
      <em class="sa-tab-badge is-zero" data-saved-badge>0</em>
    </button>
  </nav>

  <!-- GAVETA INTERATIVA DO CONSULTOR DO ISANI (RESPOSTA IMEDIATA NA MESMA TELA) -->
  <div class="sa-modal" id="sa-consultor-modal" role="dialog" aria-modal="true" aria-labelledby="sa-cons-heading" hidden>
    <div class="sa-sheet">
      <div class="sa-sheet__handle"></div>
      <div class="sa-sheet__top">
        <div>
          <span class="sa-sheet__kicker">✦ Simulador Rápido · Desde 2009</span>
          <h3 id="sa-cons-heading">O que o Isani indica para o seu ambiente?</h3>
        </div>
        <button type="button" class="sa-sheet__close" data-close-modal>Fechar ✕</button>
      </div>

      <div class="sa-cons-controls">
        <span class="sa-cons-label">1. Toque no seu ambiente:</span>
        <div class="sa-cons-rooms" role="group" aria-label="Escolha o ambiente">
          <button type="button" class="sa-choice is-active" data-cons-room="estar">🛋️ Sala</button>
          <button type="button" class="sa-choice" data-cons-room="tv">📺 Sala TV</button>
          <button type="button" class="sa-choice" data-cons-room="quarto">🌙 Quarto</button>
          <button type="button" class="sa-choice" data-cons-room="varanda">☀️ Varanda</button>
          <button type="button" class="sa-choice" data-cons-room="office">💻 Escritório</button>
          <button type="button" class="sa-choice" data-cons-room="cozinha">🍽️ Cozinha</button>
          <button type="button" class="sa-choice sa-choice--wide" data-cons-room="banheiro">🚿 Banheiro</button>
        </div>

        <span class="sa-cons-label">2. Como é o topo da janela?</span>
        <div class="sa-cons-vaos" role="group" aria-label="Escolha o tipo de topo">
          <button type="button" class="sa-choice is-active" data-cons-vao="cortineiro">Com Gesso</button>
          <button type="button" class="sa-choice" data-cons-vao="semgesso">Sem Gesso</button>
          <button type="button" class="sa-choice" data-cons-vao="duplo">Pé-Direito Duplo</button>
        </div>
      </div>

      <div class="sa-cons-verdict" id="sa-cons-verdict" aria-live="polite">
        <div class="sa-cons-badge" id="sa-cons-badge">✓ Indicação: Sala de Estar · Com Gesso</div>
        <div class="sa-cons-head">
          <img src="/ceo-shine.avif" alt="Isani Oliveira, fundador da ShineCortinas" width="52" height="52" loading="lazy" decoding="async">
          <div>
            <strong id="sa-cons-title">Cortina Wave em Tecido Encorpado</strong>
            <span>Parecer de Isani Oliveira · Fundador da Shine</span>
          </div>
        </div>
        <p class="sa-cons-quote" id="sa-cons-quote">"Na sala de estar, indico tecido encorpado com toque de linho (acima de 170 g/m² e até 10% de linho na composição) que desce pesado e alinhado, sem amarrotar."</p>
        <div class="sa-cons-tech" id="sa-cons-tech"><strong>No cortineiro:</strong> Vão livre mínimo de 15 × 15 cm no gesso (18 a 20 cm para trilho duplo) e barra a 1 cm do piso.</div>
        <a id="sa-cons-wa" class="sa-gold-btn sa-gold-btn--full" data-wa="consultor-interno" data-wa-custom="1" href="${WA_MENU}" target="_blank" rel="noopener noreferrer">
          💬 Ver Amostras Dessa Solução em Casa →
        </a>
        <a id="sa-cons-page" class="sa-cons-link" href="/cortina-wave/">Ver página técnica sobre Cortina Prega Wave →</a>
      </div>
    </div>
  </div>

  <!-- GAVETA DE MENU COMPLETO DO SITE -->
  <div class="sa-modal" id="sa-menu-modal" role="dialog" aria-modal="true" aria-labelledby="sa-menu-heading" hidden>
    <div class="sa-sheet">
      <div class="sa-sheet__handle"></div>
      <div class="sa-sheet__top">
        <div>
          <span class="sa-sheet__kicker">Navegação Completa · ShineCortinas</span>
          <h3 id="sa-menu-heading">Soluções, Guias e Cidades</h3>
        </div>
        <button type="button" class="sa-sheet__close" data-close-modal>Fechar ✕</button>
      </div>

      <div class="sa-sheet__body">
        <div class="sa-menu-group">
          <span class="sa-menu-title">Soluções Sob Medida</span>
          <div class="sa-menu-grid">
            <a href="/cortinas/" class="sa-menu-card"><strong>Cortinas Sob Medida</strong><small>Wave, Prega e Franzida</small></a>
            <a href="/cortina-wave/" class="sa-menu-card"><strong>Cortina Prega Wave</strong><small>Toque de linho do teto ao piso</small></a>
            <a href="/persianas/" class="sa-menu-card"><strong>Persianas Sob Medida</strong><small>Rolô, Romana, Madeira e 50 mm</small></a>
            <a href="/cortina-motorizada/" class="sa-menu-card"><strong>Cortina Motorizada</strong><small>Controle remoto e Alexa</small></a>
            <a href="/blackout-e-forros/" class="sa-menu-card"><strong>Blackout e Forros</strong><small>Blackout 100% e 70%</small></a>
            <a href="/trilhos-e-acionamentos/" class="sa-menu-card"><strong>Trilhos e Acionamentos</strong><small>Tubo Suíço e Cortineiro</small></a>
            <a href="/lavagem-de-cortinas/" class="sa-menu-card"><strong>Lavagem de Cortinas</strong><small>Secagem vertical em 6 cidades</small></a>
            <a href="/videos/" class="sa-menu-card"><strong>Vídeos de Obras Reais</strong><small>8 instalações filmadas</small></a>
          </div>
        </div>

        <div class="sa-menu-group">
          <span class="sa-menu-title">📖 Guias Técnicos do Blog</span>
          <div class="sa-menu-list">
            <a href="/blog/altura-ideal-da-cortina/" class="sa-menu-row"><span>Altura ideal da cortina e medidas de cortineiro</span><b>Abrir ↗</b></a>
            <a href="/blog/tipos-de-forro-para-cortina/" class="sa-menu-row"><span>Tipos de forro: translúcido, 70% e blackout 100%</span><b>Abrir ↗</b></a>
            <a href="/blog/por-que-escolher-cortina-motorizada/" class="sa-menu-row"><span>Cortina motorizada elétrica ou a bateria</span><b>Abrir ↗</b></a>
            <a href="/blog/" class="sa-menu-row"><span>Ver todos os 16 guias técnicos do Blog</span><b>Abrir ↗</b></a>
          </div>
        </div>

        <div class="sa-menu-group">
          <span class="sa-menu-title">Acervo, Cidades e Institucional</span>
          <div class="sa-menu-grid">
            <a href="/portfolio/" class="sa-menu-card"><strong>Portfólio Completo</strong><small>Mosaico de obras e referências</small></a>
            <a href="/cidades-atendidas/" class="sa-menu-card"><strong>15 Cidades Atendidas</strong><small>Todo o Sul Fluminense</small></a>
            <a href="/metodo/" class="sa-menu-card"><strong>Como Funciona</strong><small>Visita, laser e instalação</small></a>
            <a href="/sobre/" class="sa-menu-card"><strong>Sobre Nós</strong><small>Isani Oliveira · Desde 2009</small></a>
            <a href="/faq/" class="sa-menu-card"><strong>Perguntas Frequentes</strong><small>Prazos, parcelamento e garantia</small></a>
            <a href="/portfolio/#selection-bar" class="sa-menu-card" data-menu-saved-link><strong data-saved-label>♡ Meus Salvos (0)</strong><small>Sua pasta de referências</small></a>
          </div>
        </div>

        <a class="sa-gold-btn sa-gold-btn--full" data-wa="menu-interno" href="${WA_MENU}" target="_blank" rel="noopener noreferrer">
          💬 Falar Direto no WhatsApp (24) 99329-8763 →
        </a>
      </div>
    </div>
  </div>`;
}

export function auroraHead(head) {
  const clean = head.replace(/\s*<link rel="stylesheet" href="\/assets\/shine-aurora\.css[^"\n]*">/g, '');
  if (clean.includes('/assets/shine-leve.css')) {
    return clean.replace(/(<link rel="stylesheet" href="\/assets\/shine-leve\.css[^"\n]*">)/, () => `$1\n  ${AURORA_CSS}`).replace('$1', () => {
      const m = clean.match(/<link rel="stylesheet" href="\/assets\/shine-leve\.css[^"\n]*">/);
      return m ? m[0] : '';
    });
  }
  if (clean.includes('<script type="application/ld+json">')) {
    return clean.replace('<script type="application/ld+json">', () => `${AURORA_CSS}\n  <script type="application/ld+json">`);
  }
  return clean.replace('</head>', () => `  ${AURORA_CSS}\n</head>`);
}
