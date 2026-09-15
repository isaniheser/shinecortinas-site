(function () {
  'use strict';
  if (document.body.dataset.concept !== 'ambientes') return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menu = document.getElementById('pv-curtain-menu');
  const pull = document.querySelector('.pv-curtain-pull');
  const originalLogo = document.querySelector('.sl-header .sl-logo');

  document.body.dataset.logoFinish = 'aurora';
  if (originalLogo && !originalLogo.querySelector('.pv-logo-art')) {
    const art = document.createElement('span');
    art.className = 'pv-logo-art';
    art.setAttribute('aria-hidden', 'true');
    art.innerHTML = '<i></i><i></i><i></i>';
    originalLogo.prepend(art);
  }

  // Os links já estão no HTML; o JavaScript acrescenta o diálogo e os gestos.
  if (menu && pull && originalLogo && typeof menu.showModal === 'function') {
    const logo = document.createElement('button');
    logo.type = 'button';
    logo.className = 'sl-logo pv-logo-trigger';
    logo.innerHTML = originalLogo.innerHTML;
    logo.setAttribute('aria-label', 'ShineCortinas — abrir menu');
    logo.setAttribute('aria-haspopup', 'dialog');
    logo.setAttribute('aria-controls', menu.id);
    logo.setAttribute('aria-expanded', 'false');
    originalLogo.replaceWith(logo);

    let lastOpener = pull;
    function open(opener) {
      if (menu.open) return;
      lastOpener = opener;
      menu.showModal();
      pull.setAttribute('aria-expanded', 'true');
      logo.setAttribute('aria-expanded', 'true');
    }

    // Logo: puxar para baixo. Puxador: puxar para cima. Ambos aceitam clique.
    function bindPull(button, direction, threshold, property, factor) {
      let gesture = null;
      let ignoreClickUntil = 0;
      function clear() {
        gesture = null;
        button.style.removeProperty(property);
      }
      button.addEventListener('click', () => {
        if (performance.now() > ignoreClickUntil) open(button);
      });
      button.addEventListener('pointerdown', event => {
        if (event.button !== 0 || !event.isPrimary) return;
        gesture = {id: event.pointerId, y: event.clientY, distance: 0};
        button.setPointerCapture(event.pointerId);
      });
      button.addEventListener('pointermove', event => {
        if (!gesture || event.pointerId !== gesture.id) return;
        gesture.distance = Math.max(0, Math.min(90, (event.clientY - gesture.y) * direction));
        button.style.setProperty(property, (gesture.distance * factor) + 'px');
      });
      button.addEventListener('pointerup', event => {
        if (!gesture || event.pointerId !== gesture.id) return;
        const distance = gesture.distance;
        clear();
        if (distance >= threshold) {
          ignoreClickUntil = performance.now() + 500;
          open(button);
        } else if (distance > 8) {
          ignoreClickUntil = performance.now() + 500;
        }
      });
      button.addEventListener('pointercancel', clear);
      button.addEventListener('lostpointercapture', clear);
    }
    bindPull(logo, 1, 44, '--logo-pull', .55);
    bindPull(pull, -1, 35, '--curtain-pull', -.45);

    menu.addEventListener('close', () => {
      pull.setAttribute('aria-expanded', 'false');
      logo.setAttribute('aria-expanded', 'false');
      lastOpener.focus({preventScroll: true});
    });
    menu.addEventListener('click', event => {
      if (event.target !== menu) return;
      const bounds = menu.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) menu.close();
    });
    const scene = menu.querySelector('.pv-curtain-scene img');
    const sceneLinks = menu.querySelectorAll('[data-scene]');
    sceneLinks.forEach(link => {
      function preview() {
        if (scene && scene.getAttribute('src') !== link.dataset.scene) scene.src = link.dataset.scene;
        sceneLinks.forEach(item => item.classList.toggle('is-preview', item === link));
      }
      link.addEventListener('pointerenter', preview);
      link.addEventListener('focus', preview);
    });
    menu.querySelectorAll('a[href]').forEach(link => {
      if (location.pathname === new URL(link.href, location.href).pathname) {
        link.setAttribute('aria-current', 'page');
      }
    });
    document.body.classList.add('pv-enhanced');
  }

  const rail = document.querySelector('.pv-room-rail');
  if (rail) {
    const cards = [...rail.children];
    const tabs = [...document.querySelectorAll('[data-room]')];
    const previous = document.querySelector('[data-room-prev]');
    const next = document.querySelector('[data-room-next]');
    const position = document.querySelector('[data-room-position]');
    let current = 0;
    function indicate() {
      const bounds = rail.getBoundingClientRect();
      const padding = parseFloat(getComputedStyle(rail).paddingLeft);
      let nearest = Infinity;
      cards.forEach((card, index) => {
        const distance = Math.abs(card.getBoundingClientRect().left - bounds.left - padding);
        if (distance < nearest) { nearest = distance; current = index; }
      });
      tabs.forEach((button, index) => button.setAttribute('aria-pressed', String(index === current)));
      if (position) position.textContent = String(current + 1).padStart(2, '0');
      if (previous) previous.disabled = current === 0;
      if (next) next.disabled = current === cards.length - 1;
    }
    function go(index) {
      index = Math.max(0, Math.min(cards.length - 1, index));
      if (!cards[index]) return;
      rail.scrollTo({left: cards[index].offsetLeft - cards[0].offsetLeft, behavior: reduced ? 'instant' : 'smooth'});
    }
    tabs.forEach(button => button.addEventListener('click', () => go(Number(button.dataset.room))));
    if (previous) previous.addEventListener('click', () => go(current - 1));
    if (next) next.addEventListener('click', () => go(current + 1));
    rail.addEventListener('scroll', indicate, {passive: true});
    rail.addEventListener('keydown', event => {
      if (event.target !== rail) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        go(current + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    indicate();
  }

  // A altura fica estável; somente a névoa muda com a rolagem.
  let glassFrame = 0;
  function updateGlass() {
    glassFrame = 0;
    document.body.classList.toggle('pv-header-scrolled', window.scrollY > 48);
  }
  addEventListener('scroll', () => {
    if (!glassFrame) glassFrame = requestAnimationFrame(updateGlass);
  }, {passive: true});
  addEventListener('pageshow', updateGlass);
  updateGlass();
})();
