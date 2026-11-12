/* ==========================================================================
   SHINECORTINAS — INTERATIVIDADE UNIFICADA DAS PÁGINAS INTERNAS, CIDADES E BLOG
   Consultor do Isani em gaveta instantânea + Menu Completo + Sincronia de Favoritos
   ========================================================================== */
(function () {
  'use strict';

  var FAVS_KEY = 'shine.favoritos';
  var JOURNEY_KEY = 'shine.jornada';
  var IS_PHONE = /Android.*Mobile|iPhone|iPod/i.test(navigator.userAgent || '');
  var state = { room: 'estar', vao: 'cortineiro' };
  var lastOpener = null;

  var ROOMS = {
    estar: {
      name: 'Sala de Estar',
      kind: 'tecido',
      title: 'Cortina Wave em Tecido Encorpado',
      quote:
        '"Na sala de estar, a cortina precisa conversar com o sofá e o tapete. Indico tecido encorpado com toque de linho (acima de 170 g/m² e até 10% de linho na composição) que desce pesado e alinhado, sem amarrotar."',
      url: '/cortina-wave/',
      label: 'Ver página técnica sobre Cortina Prega Wave →'
    },
    tv: {
      name: 'Sala de TV',
      kind: 'tecido',
      title: 'Cortina de Tecido + Forro Blackout 100%',
      quote:
        '"Na sala de TV prefiro cortina de tecido com forro blackout 100%, que deixa o ambiente acolhedor, reduz de 5 a 6 °C do calor e veda melhor nas laterais. Branco ou areia vedam 100% igual ao escuro."',
      url: '/blackout-e-forros/',
      label: 'Ver página técnica sobre Blackout e Forros →'
    },
    quarto: {
      name: 'Quarto / Suíte',
      kind: 'tecido',
      title: 'Cortina com Blackout 100% ou Romana',
      quote:
        '"Para escurecer o quarto de verdade e ganhar conforto térmico, trabalhamos com forro blackout 100% no cortineiro, opção de transpasse central de 15 cm e pontas laterais fixadas."',
      url: '/blackout-e-forros/',
      label: 'Ver página técnica sobre Blackout e Forros →'
    },
    varanda: {
      name: 'Varanda Gourmet',
      kind: 'estruturada',
      title: 'Persiana Rolô Tela Solar (Corta-Calor)',
      quote:
        '"Para varanda gourmet e sacada, indico Tela Solar (Screen) ou Pinpoint com fibra de vidro: filtra os raios UV e reduz o calor em até cerca de 11 °C mantendo a vista externa."',
      url: '/persianas/',
      label: 'Ver página técnica sobre Persianas Sob Medida →'
    },
    office: {
      name: 'Escritório',
      kind: 'estruturada',
      title: 'Persiana Madeira 50 mm, Romana ou Double Vision',
      quote:
        '"Para controlar o reflexo nas telas com presença arquitetônica, indico Double Vision, Romana ou a Persiana Horizontal de Madeira natural de 50 mm."',
      url: '/persianas/',
      label: 'Ver página técnica sobre Persianas Sob Medida →'
    },
    cozinha: {
      name: 'Cozinha',
      kind: 'estruturada',
      title: 'Persiana Rolô Tela Solar 5% ou Alumínio',
      quote:
        '"Na cozinha, onde há gordura e vapor, indico Persiana Rolô em Tela Solar 5% (lavável com pano úmido) ou Horizontal de Alumínio (50 mm ou 16 mm) pela praticidade de limpeza."',
      url: '/persianas/',
      label: 'Ver página técnica sobre Persianas Sob Medida →'
    },
    banheiro: {
      name: 'Banheiro',
      kind: 'estruturada',
      title: 'Persiana Rolô ou Horizontal de Alumínio 16 mm',
      quote:
        '"Para janela de banheiro com vapor e umidade, indico Persiana Rolô sintética ou Horizontal de Alumínio de 16 mm, materiais laváveis que secam rápido."',
      url: '/persianas/',
      label: 'Ver página técnica sobre Persianas Sob Medida →'
    }
  };

  var VAOS = {
    cortineiro: {
      name: 'Com Gesso',
      label: 'No cortineiro:',
      tecido: 'Vão livre mínimo de 15 × 15 cm no gesso (18 a 20 cm para trilho duplo) e barra a 1 cm do piso.',
      estruturada: 'Tubo ou cabeçote embutido dentro do cortineiro de gesso, deixando apenas a tela ou as lâminas aparentes.'
    },
    semgesso: {
      name: 'Sem Gesso',
      label: 'Sem cortineiro:',
      tecido: 'Em vãos acima de 2,00 m usamos Tubo Suíço em alumínio para a cortina deslizar inteira sem travar no suporte central.',
      estruturada: 'Instalamos com bandô técnico em alumínio coordenado com a peça para acabamento limpo na parede ou no teto.'
    },
    duplo: {
      name: 'Pé-Direito Duplo',
      label: 'Pé-direito duplo:',
      tecido: 'Trilho motorizado com controle, Alexa e Touch Motion (na cortina de tecido abre manualmente se faltar luz).',
      estruturada: 'Motorização silenciosa por controle ou Alexa com até 5 anos de garantia.'
    }
  };

  function getSavedCount() {
    try {
      var raw = localStorage.getItem(FAVS_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr.filter(Boolean).length : 0;
    } catch (_) {
      return 0;
    }
  }

  function syncSavedBadges() {
    var count = getSavedCount();
    document.querySelectorAll('[data-saved-badge]').forEach(function (el) {
      el.textContent = String(count);
      el.classList.toggle('is-zero', count === 0);
    });
    document.querySelectorAll('[data-saved-label]').forEach(function (el) {
      el.textContent = '♡ Meus Salvos (' + count + ')';
    });
    document.querySelectorAll('[data-saved-short]').forEach(function (el) {
      el.textContent = count === 1 ? '1 salva' : count + ' salvas';
    });
    document.querySelectorAll('[data-header-saved]').forEach(function (el) {
      el.classList.toggle('is-zero', count === 0);
    });
  }

  function getUtmSuffix() {
    if (typeof window.getShineUtmSuffix === 'function') {
      return window.getShineUtmSuffix();
    }
    try {
      var raw = localStorage.getItem('shine.utm.v2') || sessionStorage.getItem('shine.utm');
      if (!raw) return '';
      var u = JSON.parse(raw);
      if (!u) return '';
      var isG = Boolean(u.gclid || u.gbraid || u.wbraid || u.gad_source);
      var tag = u.campaign || u.utm_campaign || u.source || u.utm_source || (isG ? 'Google Ads' : u.fbclid ? 'Instagram/Meta' : '');
      return tag ? ' [anúncio: ' + tag + ']' : '';
    } catch (_) {
      return '';
    }
  }

  function buildWaHref(msg) {
    var suffix = getUtmSuffix();
    var full = suffix && msg.indexOf('[anúncio:') === -1 ? msg + suffix : msg;
    var encoded = encodeURIComponent(full);
    return 'https://wa.me/5524993298763?text=' + encoded;
  }

  function updateConsultorUI() {
    var r = ROOMS[state.room];
    var v = VAOS[state.vao];
    if (!r || !v) return;

    document.querySelectorAll('[data-cons-room]').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-cons-room') === state.room);
    });
    document.querySelectorAll('[data-cons-vao]').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-cons-vao') === state.vao);
    });

    var badge = document.getElementById('sa-cons-badge');
    var title = document.getElementById('sa-cons-title');
    var quote = document.getElementById('sa-cons-quote');
    var tech = document.getElementById('sa-cons-tech');
    var wa = document.getElementById('sa-cons-wa');
    var page = document.getElementById('sa-cons-page');

    if (badge) badge.textContent = '✓ Indicação: ' + r.name + ' · ' + v.name;
    if (title) title.textContent = r.title;
    if (quote) quote.textContent = r.quote;
    if (tech) {
      tech.innerHTML =
        '<strong>' + v.label + '</strong> ' + (r.kind === 'estruturada' ? v.estruturada : v.tecido);
    }

    var ctx = document.body.getAttribute('data-wa-context') || '';
    var ctxNote = ctx ? ' (estou vendo ' + ctx + ')' : '';
    var msg =
      'Olá! Vi a indicação do Isani para ' +
      r.name +
      ' (' +
      v.name +
      ': ' +
      r.title +
      ')' +
      ctxNote +
      ' e quero agendar minha consultoria gratuita em casa.';

    if (wa) {
      wa.href = buildWaHref(msg);
      if (IS_PHONE) wa.removeAttribute('target');
    }
    if (page) {
      if (state.vao === 'duplo') {
        page.href = '/cortina-motorizada/';
        page.textContent = 'Ver página técnica sobre Cortina Motorizada →';
      } else {
        page.href = r.url;
        page.textContent = r.label;
      }
    }

    try {
      var jRaw = sessionStorage.getItem(JOURNEY_KEY);
      var j = jRaw ? JSON.parse(jRaw) : {};
      j.consultor = r.name + ' · ' + v.name + ' (' + r.title + ')';
      sessionStorage.setItem(JOURNEY_KEY, JSON.stringify(j));
    } catch (_) {}
  }

  function openModal(modal, opener) {
    if (!modal) return;
    closeModals(false);
    lastOpener = opener || document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    var sheet = modal.querySelector('.sa-sheet');
    if (sheet) sheet.scrollTop = 0;
    try {
      if (!history.state || !history.state.saModal) {
        history.pushState({ saModal: true }, '');
      }
    } catch (_) {}
    var closeBtn = modal.querySelector('[data-close-modal]');
    if (closeBtn) closeBtn.focus({ preventScroll: true });
  }

  function closeModals(restoreFocus) {
    var anyClosed = false;
    ['sa-consultor-modal', 'sa-menu-modal'].forEach(function (id) {
      var m = document.getElementById(id);
      if (m && !m.hidden) {
        m.hidden = true;
        anyClosed = true;
      }
    });
    if (anyClosed) {
      var otherOpen = document.querySelector('.d-case-modal.is-open, .d-video-modal.is-open');
      if (!otherOpen) document.body.style.overflow = '';
      if (restoreFocus !== false && lastOpener && typeof lastOpener.focus === 'function') {
        try {
          lastOpener.focus({ preventScroll: true });
        } catch (_) {}
      }
      lastOpener = null;
    }
  }

  // Destaca aba ativa na barra inferior
  var path = location.pathname;
  document.querySelectorAll('.sa-tab[data-tab-match]').forEach(function (tab) {
    var key = tab.getAttribute('data-tab-match');
    var active =
      (key === 'home' && path === '/') ||
      (key === 'portfolio' && (path.indexOf('/portfolio') === 0 || path.indexOf('/videos') === 0)) ||
      (key === 'blog' && path.indexOf('/blog') === 0);
    if (active) {
      tab.classList.add('is-active');
      tab.setAttribute('aria-current', 'page');
    }
  });

  // Se já estiver em /portfolio/, link de salvos rola suavemente na própria página
  if (path === '/portfolio/') {
    document.querySelectorAll('[data-menu-saved-link], [data-header-saved]').forEach(function (a) {
      a.setAttribute('href', '#selection-bar');
      a.addEventListener('click', function () {
        closeModals(false);
      });
    });
  }

  document.addEventListener('click', function (e) {
    var openCons = e.target.closest('[data-open-consultor]');
    if (openCons) {
      e.preventDefault();
      updateConsultorUI();
      openModal(document.getElementById('sa-consultor-modal'), openCons);
      return;
    }
    var openMenu = e.target.closest('[data-open-menu]');
    if (openMenu) {
      e.preventDefault();
      syncSavedBadges();
      openModal(document.getElementById('sa-menu-modal'), openMenu);
      return;
    }
    var closeBtn = e.target.closest('[data-close-modal]');
    if (closeBtn) {
      e.preventDefault();
      closeModals(true);
      return;
    }
    if (e.target && e.target.classList && e.target.classList.contains('sa-modal')) {
      closeModals(true);
      return;
    }
    var roomBtn = e.target.closest('[data-cons-room]');
    if (roomBtn) {
      state.room = roomBtn.getAttribute('data-cons-room');
      updateConsultorUI();
      return;
    }
    var vaoBtn = e.target.closest('[data-cons-vao]');
    if (vaoBtn) {
      state.vao = vaoBtn.getAttribute('data-cons-vao');
      updateConsultorUI();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModals(true);
  });

  window.addEventListener('popstate', function () {
    closeModals(false);
  });

  window.addEventListener('storage', syncSavedBadges);
  syncSavedBadges();
  updateConsultorUI();
})();
