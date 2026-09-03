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

  function message(kind) {
    var c = cityName(); var where = c ? ' Sou de ' + c + '.' : '';
    var ctx = context();
    if (kind === 'agendar') return 'Olá, vim do site da Shine.' + where + ' Quero agendar a consultoria gratuita em casa.';
    if (kind === 'estimativa') return 'Olá, vim do site da Shine.' + where + ' Quero uma estimativa para o meu ambiente (vi: ' + ctx + ').';
    return 'Olá, vim do site da Shine.' + where + ' Quero falar com um consultor sobre cortinas e persianas (vi: ' + ctx + ').';
  }

  function isWa(a) { return a && /wa\.me\//.test(a.getAttribute('href') || ''); }

  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('a');
    if (!isWa(a)) return;
    var kind = a.getAttribute('data-wa') || 'conversar';
    a.setAttribute('href', 'https://wa.me/' + NUMBER + '?text=' + encodeURIComponent(message(kind)));
  }, true);

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

  /* palpite pelo IP só quando não há memória nem página de cidade */
  if (!state.slug && window.fetch) {
    fetch('/api/geo', { credentials: 'omit' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (g) {
      if (g && g.slug && CITIES[g.slug] && !state.slug) { state.slug = g.slug; state.source = 'ip'; renderChips(); }
    }).catch(function () {});
  }
})();
