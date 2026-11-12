/* ShineCortinas — memória de cidade + atribuição Google/Meta Ads + WhatsApp com fallback seguro.
   - Numa página /cidades/<slug>/ grava a cidade no navegador (primeira parte, sem identificar ninguém).
   - Preserva UTMs e click IDs (gclid, gbraid, wbraid, gad_source, fbclid) por 30 dias em localStorage.
   - Em celulares, abre direto no app (whatsapp://send) com fallback automático para wa.me se o WebView bloquear;
     em iPads, tablets e computadores, usa https://wa.me direto sem travar. */
(function () {
  var KEY = 'shine.cidade';
  var UTM_KEY = 'shine.utm.v2';
  var UTM_TTL = 30 * 24 * 60 * 60 * 1000;
  var VISITOR_KEY = 'sc_visitante_id';
  var CITIES = {
    'volta-redonda': 'Volta Redonda', 'barra-mansa': 'Barra Mansa', 'resende': 'Resende', 'porto-real': 'Porto Real',
    'itatiaia': 'Itatiaia', 'penedo': 'Penedo', 'visconde-de-maua': 'Visconde de Mauá', 'maromba': 'Maromba',
    'pinheiral': 'Pinheiral', 'pirai': 'Piraí', 'barra-do-pirai': 'Barra do Piraí', 'valenca': 'Valença',
    'vassouras': 'Vassouras', 'paulo-de-frontin': 'Engenheiro Paulo de Frontin', 'miguel-pereira': 'Miguel Pereira'
  };
  var NUMBER = '5524993298763';

  function uuid() {
    try { if (window.crypto && crypto.randomUUID) return crypto.randomUUID(); } catch (e) {}
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  var visitorId = '';
  try {
    visitorId = localStorage.getItem(VISITOR_KEY) || '';
    if (!visitorId) {
      visitorId = uuid();
      localStorage.setItem(VISITOR_KEY, visitorId);
    }
  } catch (e) {
    visitorId = uuid();
  }

  (function syncZarazVisitor() {
    var tries = 0;
    (function applyId() {
      tries += 1;
      if (window.zaraz && typeof window.zaraz.set === 'function') {
        try { window.zaraz.set('external_id', visitorId); } catch (e) {}
        return;
      }
      if (tries < 16) window.setTimeout(applyId, 300);
    })();
  })();

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
      var savedV2 = JSON.parse(localStorage.getItem('shine_saved_cases_v2') || '[]');
      if (Array.isArray(savedV2) && savedV2.length) {
        favs = savedV2.map(function (it) { return it && (it.title || it.id) ? String(it.title || it.id) : ''; }).filter(Boolean);
      } else {
        var rawFavs = JSON.parse(localStorage.getItem('shine.favoritos') || '[]');
        if (Array.isArray(rawFavs)) favs = rawFavs;
      }
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
    var c = cityName(); var where = (c && state.source !== 'ip') ? ' Atendimento em ' + c + '.' : '';
    var ctx = context();
    if (kind === 'agendar') return 'Olá, vim do site da Shine.' + where + ' Quero agendar a consultoria gratuita em casa.';
    if (kind === 'estimativa') return 'Olá, vim do site da Shine.' + where + ' Quero uma estimativa para o meu ambiente (vi: ' + ctx + ').';
    return 'Olá, vim do site da Shine.' + where + ' Quero falar com um consultor sobre cortinas e persianas (vi: ' + ctx + ').';
  }

  // Apenas smartphones reais usam esquema nativo whatsapp://send; iPads/tablets e computadores usam wa.me.
  var IS_PHONE = /Android.*Mobile|iPhone|iPod/i.test(navigator.userAgent || '');

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

  function getUtmDetails() {
    var saved = null;
    var now = Date.now();
    try {
      var rawV2 = JSON.parse(localStorage.getItem(UTM_KEY) || 'null');
      if (rawV2 && (!rawV2.ts || (now - rawV2.ts) < UTM_TTL)) saved = rawV2;
    } catch (e) {}
    if (!saved) {
      try { saved = JSON.parse(sessionStorage.getItem('shine.utm') || 'null'); } catch (e) {}
    }
    try {
      var qs = new URLSearchParams(location.search);
      var src = qs.get('utm_source');
      var med = qs.get('utm_medium');
      var cmp = qs.get('utm_campaign');
      var cnt = qs.get('utm_content');
      var trm = qs.get('utm_term');
      var gclid = qs.get('gclid');
      var gbraid = qs.get('gbraid');
      var wbraid = qs.get('wbraid');
      var gadSource = qs.get('gad_source');
      var fbclid = qs.get('fbclid');
      if (src || med || cmp || cnt || trm || gclid || gbraid || wbraid || gadSource || fbclid) {
        saved = {
          source: src || (saved && saved.source) || '',
          medium: med || (saved && saved.medium) || '',
          campaign: cmp || (saved && saved.campaign) || '',
          content: cnt || (saved && saved.content) || '',
          term: trm || (saved && saved.term) || '',
          gclid: gclid || (saved && saved.gclid) || '',
          gbraid: gbraid || (saved && saved.gbraid) || '',
          wbraid: wbraid || (saved && saved.wbraid) || '',
          gad_source: gadSource || (saved && saved.gad_source) || '',
          fbclid: fbclid || (saved && saved.fbclid) || '',
          ts: now
        };
        try { localStorage.setItem(UTM_KEY, JSON.stringify(saved)); } catch (e) {}
        try { sessionStorage.setItem('shine.utm', JSON.stringify(saved)); } catch (e) {}
      }
    } catch (e) {}
    return saved;
  }
  getUtmDetails();

  function utmSuffix() {
    var u = getUtmDetails();
    if (!u || typeof u !== 'object') return '';
    var isGoogleAds = Boolean(u.gclid || u.gbraid || u.wbraid || u.gad_source);
    var tag = u.campaign || u.utm_campaign || u.source || u.utm_source || (isGoogleAds ? 'Google Ads' : u.fbclid ? 'Instagram/Meta' : '');
    return tag ? ' [anúncio: ' + tag + ']' : '';
  }

  window.getShineUtmDetails = getUtmDetails;
  window.getShineUtmSuffix = utmSuffix;

  function buildWaUrls(txt) {
    var q = txt ? encodeURIComponent(txt) : '';
    return {
      app: 'whatsapp://send?phone=' + NUMBER + (q ? '&text=' + q : ''),
      web: 'https://wa.me/' + NUMBER + (q ? '?text=' + q : '')
    };
  }

  function resolveWaText(a) {
    var kind = a.getAttribute('data-wa') || 'conversar';
    var txt = '';
    if (!a.hasAttribute('data-wa-custom')) {
      txt = message(kind);
    } else {
      txt = a.getAttribute('data-wa-raw-text') || extractTextParam(a.getAttribute('href'));
      if (txt && !a.hasAttribute('data-wa-raw-text')) {
        a.setAttribute('data-wa-raw-text', txt.replace(/\s*\[anúncio:[^\]]*\]\s*$/, ''));
        txt = a.getAttribute('data-wa-raw-text');
      }
      if (!txt) txt = message(kind);
    }
    var suf = utmSuffix();
    if (txt && suf && txt.indexOf('[anúncio:') === -1) {
      txt = txt + suf;
    }
    return { kind: kind, text: txt };
  }

  function syncWaWebHref(a) {
    var res = resolveWaText(a);
    var urls = buildWaUrls(res.text);
    // Mantém SEMPRE https://wa.me/... no atributo href para que o gatilho nativo
    // do Cloudflare Zaraz (a[href*="wa.me"] -> whatsapp_click no GA4/Google Ads)
    // escute 100% dos cliques em smartphones, tablets e computadores.
    a.setAttribute('href', urls.web);
    a.setAttribute('data-wa-app-url', urls.app);
    a.setAttribute('data-wa-web-fallback', urls.web);
    if (IS_PHONE) {
      a.removeAttribute('target');
    }
    return { kind: res.kind, app: urls.app, web: urls.web };
  }

  function fulfilDynamicZarazWaClick(a) {
    if (!a || a.__shineInitialWaMe) return;
    try {
      if (window.zaraz && typeof window.zaraz.fulfilTrigger === 'function') {
        var attrs = { textContent: a.textContent || '' };
        for (var i = 0; i < a.attributes.length; i += 1) {
          var at = a.attributes[i];
          attrs[at.nodeName] = at.nodeValue;
        }
        window.zaraz.fulfilTrigger('LaIT', 'kdXw', attrs);
      }
    } catch (e) {}
  }

  function scheduleWebFallback(webUrl) {
    if (!IS_PHONE || !webUrl) return;
    var cancelled = false;
    var cancel = function () {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pagehide', cancel);
      window.removeEventListener('blur', cancel);
    };
    var onVis = function () {
      if (document.hidden) cancel();
    };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('pagehide', cancel, { once: true });
    window.addEventListener('blur', cancel, { once: true });
    window.setTimeout(function () {
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pagehide', cancel);
      window.removeEventListener('blur', cancel);
      if (!cancelled && !document.hidden) {
        window.location.href = webUrl;
      }
    }, 1800);
  }

  function trackWa(kind) {
    var dados = {
      event_id: uuid(),
      external_id: visitorId,
      origem_link: kind,
      pagina: location.pathname,
      contexto: context(),
      destino: IS_PHONE ? 'app_direto' : 'web'
    };
    var c = cityName();
    if (c && state.source !== 'ip') dados.cidade = c;
    var utm = getUtmDetails();
    if (utm) {
      if (utm.source) dados.utm_source = utm.source;
      if (utm.medium) dados.utm_medium = utm.medium;
      if (utm.campaign) dados.utm_campaign = utm.campaign;
      if (utm.content) dados.utm_content = utm.content;
      if (utm.term) dados.utm_term = utm.term;
      if (utm.gclid) dados.gclid = utm.gclid;
      if (utm.gbraid) dados.gbraid = utm.gbraid;
      if (utm.wbraid) dados.wbraid = utm.wbraid;
      if (utm.gad_source) dados.gad_source = utm.gad_source;
      if (utm.fbclid) dados.fbclid = utm.fbclid;
    }
    var jd = getJourneyDetails();
    if (jd.consultor) dados.jornada_consultor = jd.consultor;
    if (jd.obras.length) dados.jornada_obras = jd.obras.slice(0, 8).join(' | ');
    if (jd.favoritos.length) dados.jornada_favoritos = jd.favoritos.slice(0, 8).join(' | ');
    if (jd.videos.length) dados.jornada_videos = jd.videos.slice(0, 8).join(' | ');
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

  document.querySelectorAll('a[href*="wa.me"]').forEach(function (a) {
    a.__shineInitialWaMe = true;
    if (IS_PHONE) a.removeAttribute('target');
  });

  document.addEventListener('pointerdown', function (ev) {
    var a = ev.target && ev.target.closest && ev.target.closest('a');
    if (!isWa(a)) return;
    syncWaWebHref(a);
  }, true);

  document.addEventListener('touchstart', function (ev) {
    var a = ev.target && ev.target.closest && ev.target.closest('a');
    if (!isWa(a)) return;
    syncWaWebHref(a);
  }, { capture: true, passive: true });

  // Fase de borbulhamento (false) para que o listener nativo do Zaraz anexado
  // diretamente ao elemento <a> dispare whatsapp_click ANTES do redirecionamento app.
  document.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest && ev.target.closest('a');
    if (!isWa(a)) return;
    var info = syncWaWebHref(a);
    fulfilDynamicZarazWaClick(a);
    trackWa(info.kind);
    if (IS_PHONE && !ev.defaultPrevented && ev.button === 0 && !ev.metaKey && !ev.ctrlKey && !ev.shiftKey && !ev.altKey) {
      ev.preventDefault();
      scheduleWebFallback(info.web);
      window.location.href = info.app;
    }
  }, false);

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
