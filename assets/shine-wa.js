/* ShineCortinas — memória de cidade + WhatsApp com contexto.
   - Numa página /cidades/<slug>/ grava a cidade no navegador (primeira parte, sem identificar ninguém).
   - Em qualquer página, ao tocar num link wa.me, monta a mensagem com cidade + contexto da página.
   - Se não houver memória, pede um palpite a /api/geo (cidade pelo IP, via Cloudflare) e só sugere.
   - A etiqueta [data-city-chip] mostra "Atendendo em X" e permite trocar. */
(function () {
  var KEY = 'shine.cidade';
  var CITIES = {
    'volta-redonda': 'Volta Redonda', 'barra-mansa': 'Barra Mansa', 'resende': 'Resende', 'porto-real': 'Porto Real',
    'itatiaia': 'Itatiaia', 'penedo': 'Penedo', 'visconde-de-maua': 'Visconde de Mauá', 'maromba': 'Maromba',
    'pinheiral': 'Pinheiral', 'pirai': 'Piraí', 'barra-do-pirai': 'Barra do Piraí', 'valenca': 'Valença',
    'vassouras': 'Vassouras', 'paulo-de-frontin': 'Engenheiro Paulo de Frontin', 'miguel-pereira': 'Miguel Pereira'
  };
  var NUMBER = '5524993298763';

  function read() { try { var v = JSON.parse(localStorage.getItem(KEY) || 'null'); return v && CITIES[v.slug] ? v : null; } catch (e) { return null; } }
  function save(slug, source) { try { localStorage.setItem(KEY, JSON.stringify({ slug: slug, source: source, t: Date.now() })); } catch (e) {} }
  function slugFromPath() { var m = location.pathname.match(/^\/cidades\/([a-z-]+)\//); return m && CITIES[m[1]] ? m[1] : null; }

  var state = { slug: null, source: null };
  var here = slugFromPath();
  if (here) { state.slug = here; state.source = 'pagina'; save(here, 'pagina'); }
  else { var m = read(); if (m) { state.slug = m.slug; state.source = m.source; } }

  function cityName() { return state.slug ? CITIES[state.slug] : null; }

  function context() {
    var el = document.querySelector('[data-wa-context]');
    if (el) return el.getAttribute('data-wa-context');
    var t = document.title.split('|')[0].trim();
    return t.length > 70 ? t.slice(0, 67) + '…' : t;
  }

  function getJourneyDetails() {
    var j = window.shineJourney || null;
    if (!j) {
      try { j = JSON.parse(sessionStorage.getItem('shine.jornada') || 'null'); } catch (e) {}
    }
    var favs = [];
    try {
      var rawFavs = JSON.parse(localStorage.getItem('shine.favoritos') || '[]');
      if (Array.isArray(rawFavs)) favs = rawFavs;
    } catch (e) {}
    return {
      consultor: j && j.consultor ? String(j.consultor) : null,
      obras: j && Array.isArray(j.obras) ? j.obras : [],
      videos: j && Array.isArray(j.videos) ? j.videos : [],
      artigos: j && Array.isArray(j.artigos) ? j.artigos : [],
      favoritos: favs
    };
  }

  function message(kind) {
    var c = cityName(); var where = (c && state.source !== 'ip') ? ' Atendimento em ' + c + '.' : ''; // cidade por IP é só palpite: não vira afirmação
    var ctx = context();
    if (kind === 'agendar') return 'Olá, vim do site da Shine.' + where + ' Quero agendar a consultoria gratuita em casa.';
    if (kind === 'estimativa') return 'Olá, vim do site da Shine.' + where + ' Quero uma estimativa para o meu ambiente (vi: ' + ctx + ').';
    return 'Olá, vim do site da Shine.' + where + ' Quero falar com um consultor sobre cortinas e persianas (vi: ' + ctx + ').';
  }

  var IS_MOBILE = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  // No iPhone/iPad o wa.me já é link universal (abre o app direto e, sem app, a página web).
  // whatsapp:// só no Android, onde abre o app sem a página intermediária.
  var APP_SCHEME = /Android/i.test(navigator.userAgent);

  function isWa(a) {
    if (!a) return false;
    var h = a.getAttribute('href') || '';
    return /wa\.me\/|api\.whatsapp\.com\/|whatsapp:\/\/send/.test(h);
  }

  function extractTextParam(href) {
    try {
      var m = String(href || '').match(/[?&]text=([^&#]*)/);
      return m ? decodeURIComponent(m[1].replace(/\+/g, '%20')) : '';
    } catch (e) {
      return '';
    }
  }

  function applyWaHref(a) {
    var kind = a.getAttribute('data-wa') || 'conversar';
    var txt = '';
    if (!a.hasAttribute('data-wa-custom')) {
      txt = message(kind);
    } else {
      txt = extractTextParam(a.getAttribute('href'));
      if (!txt) txt = message(kind);
    }
    if (IS_MOBILE) a.removeAttribute('target');
    if (APP_SCHEME) {
      a.setAttribute('href', 'whatsapp://send?phone=' + NUMBER + (txt ? '&text=' + encodeURIComponent(txt) : ''));
    } else {
      a.setAttribute('href', 'https://wa.me/' + NUMBER + (txt ? '?text=' + encodeURIComponent(txt) : ''));
    }
    return kind;
  }

  function getUtmDetails() {
    var saved = null;
    try { saved = JSON.parse(sessionStorage.getItem('shine.utm') || 'null'); } catch (e) {}
    try {
      var qs = new URLSearchParams(location.search);
      var src = qs.get('utm_source');
      var med = qs.get('utm_medium');
      var cmp = qs.get('utm_campaign');
      if (src || med || cmp) {
        saved = { source: src || '', medium: med || '', campaign: cmp || '' };
        sessionStorage.setItem('shine.utm', JSON.stringify(saved));
      }
    } catch (e) {}
    return saved;
  }
  getUtmDetails();

  function trackWa(kind) {
    var dados = {
      origem_link: kind,
      pagina: location.pathname,
      contexto: context(),
      destino: APP_SCHEME ? 'app_direto' : (IS_MOBILE ? 'link_universal' : 'web')
    };
    var c = cityName();
    if (c && state.source !== 'ip') dados.cidade = c;
    var utm = getUtmDetails();
    if (utm && utm.source) dados.utm_source = utm.source;
    if (utm && utm.medium) dados.utm_medium = utm.medium;
    if (utm && utm.campaign) dados.utm_campaign = utm.campaign;
    var jd = getJourneyDetails();
    if (jd.consultor) dados.jornada_consultor = jd.consultor;
    if (jd.obras.length) dados.jornada_obras = jd.obras.join(' | ');
    if (jd.favoritos.length) dados.jornada_favoritos = jd.favoritos.join(' | ');
    if (jd.videos.length) dados.jornada_videos = jd.videos.join(' | ');
    try {
      if (window.zaraz && typeof window.zaraz.track === 'function') {
        window.zaraz.track('Contact', dados);
        return;
      }
    } catch (e) {}
    window.dataLayer = window.dataLayer || [];
    var d = { event: 'Contact' };
    for (var k in dados) if (Object.prototype.hasOwnProperty.call(dados, k)) d[k] = dados[k];
    window.dataLayer.push(d);
  }

  document.addEventListener('pointerdown', function (ev) {
    var a = ev.target && ev.target.closest && ev.target.closest('a');
    if (!isWa(a)) return;
    applyWaHref(a);
  }, true);

  document.addEventListener('touchstart', function (ev) {
    var a = ev.target && ev.target.closest && ev.target.closest('a');
    if (!isWa(a)) return;
    applyWaHref(a);
  }, { capture: true, passive: true });

  document.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest && ev.target.closest('a');
    if (!isWa(a)) return;
    var kind = applyWaHref(a);
    trackWa(kind);
    if (!ev.defaultPrevented) fallbackToWeb(a);
  }, true);

  /* whatsapp:// (Android) abre o app direto, mas sem o app instalado o toque não faz nada.
     Se a página continuar visível e com foco 3 s depois do toque, o app não abriu: vai para wa.me.
     Diálogo de "abrir app?" (navegador do Instagram/Facebook) tira o foco da janela e cancela. */
  var fallbackTimer = null;
  function fallbackToWeb(a) {
    if (!APP_SCHEME) return;
    var h = a.getAttribute('href') || '';
    var m = h.match(/^whatsapp:\/\/send\?phone=(\d+)(?:&text=(.*))?$/);
    if (!m) return;
    var web = 'https://wa.me/' + m[1] + (m[2] ? '?text=' + m[2] : '');
    var left = false;
    function gone() { left = true; }
    clearTimeout(fallbackTimer);
    document.addEventListener('visibilitychange', gone, { once: true });
    window.addEventListener('pagehide', gone, { once: true });
    window.addEventListener('blur', gone, { once: true });
    fallbackTimer = setTimeout(function () {
      document.removeEventListener('visibilitychange', gone);
      window.removeEventListener('pagehide', gone);
      window.removeEventListener('blur', gone);
      if (!left && !document.hidden && document.hasFocus()) location.href = web;
    }, 3000);
  }


  if (IS_MOBILE) {
    document.querySelectorAll('a').forEach(function (a) {
      if (isWa(a)) applyWaHref(a);
    });
  }

  /* etiqueta "Atendendo em X · trocar" */
  function renderChips() {
    var chips = document.querySelectorAll('[data-city-chip]');
    if (!chips.length) return;
    var c = cityName();
    chips.forEach(function (chip) {
      var label = chip.querySelector('[data-city-label]');
      if (label) label.textContent = c ? 'Atendendo em ' + c : 'Atendemos todo o Sul Fluminense';
      var list = chip.querySelector('[data-city-list]');
      if (list && !list.children.length) {
        Object.keys(CITIES).forEach(function (slug) {
          var b = document.createElement('button'); b.type = 'button'; b.textContent = CITIES[slug]; b.setAttribute('data-slug', slug);
          if (slug === state.slug) b.setAttribute('aria-current', 'true');
          b.addEventListener('click', function () {
            state.slug = slug; state.source = 'escolha'; save(slug, 'escolha'); renderChips();
            if (list.parentElement && list.parentElement.hidePopover) { try { list.parentElement.hidePopover(); } catch (e) {} }
            if (!here) location.href = '/cidades/' + slug + '/';
          });
          list.appendChild(b);
        });
      }
    });
  }
  renderChips();

  /* atualização automática do tempo de atuação (desde 2009) e ano do rodapé */
  var yr = new Date().getFullYear();
  if (yr >= 2026) {
    var yrs = yr - 2009;
    document.querySelectorAll('[data-since]').forEach(function (el) { el.textContent = String(yr - (Number(el.getAttribute('data-since')) || 2009)); });
    document.querySelectorAll('[data-years-text]').forEach(function (el) { el.textContent = yrs + ' anos'; });
    document.querySelectorAll('[data-current-year]').forEach(function (el) { el.textContent = String(yr); });
  }

  /* palpite pelo IP só quando não há memória nem página de cidade */
  if (!state.slug && window.fetch) {
    fetch('/api/geo', { credentials: 'omit' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (g) {
      if (g && g.slug && CITIES[g.slug] && !state.slug) { state.slug = g.slug; state.source = 'ip'; renderChips(); }
    }).catch(function () {});
  }
})();
