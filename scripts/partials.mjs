// Blocos compartilhados do sistema visual "leve" (header, faixa, rodapé, barra fixa, scripts).
// Usados por build-cidades.mjs e build-home.mjs. Alterar aqui muda todas as páginas geradas.

export const WA = 'https://wa.me/5524993298763?text=Ol%C3%A1%2C%20eu%20vim%20do%20site%20da%20Shine%20e%20quero%20agendar%20uma%20consultoria%20gratuita%20em%20casa.';
export const FONTS = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Cinzel:wght@700&family=Playfair+Display:ital,wght@0,500;0,600;1,500&display=swap';
export const CSS_V = '6';
export const JS_V = '2';

export const esc = (s) => String(s).replace(/&(?!(amp|lt|gt|quot|#\d+);)/g, '&amp;').replace(/"/g, '&quot;');

export const waIcon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
export const waIconSmall = waIcon.replace('width="28" height="28"', 'width="20" height="20"');
export const telIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';

export const NAV = [
  ['/cortinas/', 'Cortinas'], ['/persianas/', 'Persianas'], ['/metodo/', 'Como funciona'],
  ['/cidades-atendidas.html', 'Cidades'], ['/portfolio/', 'Projetos'], ['/blog/', 'Blog'],
];

// Limpa o <head> herdado (Tailwind, estilos inline, redirect de celular) e injeta o CSS do sistema.
export function cleanHead(head, opts = {}) {
  head = head.replace(/\s*<script>\s*\(function\(\)\{\s*if \(\/Mobi[\s\S]*?<\/script>/, '');
  head = head.replace(/\s*<link rel="alternate" media="only screen[^>]*>/, '');
  head = head.replace(/\s*<link rel="preload" href="\/?assets\/tailwind.generated.css"[^>]*>/, '');
  head = head.replace(/\s*<link rel="stylesheet" href="\/?assets\/tailwind.generated.css">/, '');
  head = head.replace(/\s*<link rel="stylesheet" href="\/assets\/cidades.css[^"]*">/, '');
  head = head.replace(/\s*<link rel="stylesheet" href="\/assets\/shine-leve.css[^"]*">/, '');
  head = head.replace(/\s*<style>[\s\S]*?<\/style>/g, '');
  head = head.replace('content="#000000"', 'content="#16302A"');
  head = head.replace(/href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]+"/, `href="${FONTS}"`);
  head = head.replace(/<link rel="preload" as="image" href="hero-sala.avif"/, '<link rel="preload" as="image" href="/hero-sala.avif"');
  head = head.replace('<link rel="icon" type="image/png"', `<link rel="stylesheet" href="/assets/shine-leve.css?v=${CSS_V}">\n  <link rel="icon" type="image/png"`);
  const precisaLd = opts.semSchema !== true;
  if (!/shine-leve\.css/.test(head) || (precisaLd && !/application\/ld\+json/.test(head)) || /tailwind|location\.replace\('\/app\/'\)/.test(head)) throw new Error('head inválido');
  return head;
}

export function header(currentPath) {
  const links = NAV.map(([h, t]) => `        <a href="${h}"${h === currentPath ? ' aria-current="true"' : ''}>${t}</a>`).join('\n');
  const mobile = [['/', 'Início'], ...NAV.map(([h, t]) => [h, t === 'Cidades' ? 'Cidades atendidas' : t])]
    .map(([h, t]) => `<a href="${h}">${t}</a>`).join('');
  return `
  <header class="sl-header">
    <div class="sl-wrap sl-header__in">
      <a href="/" class="sl-logo" aria-label="ShineCortinas — início"><span class="sl-logo__mark">S</span><span class="sl-logo__name">SHINE</span></a>
      <nav class="sl-nav" aria-label="Menu principal">
${links}
        <a class="sl-btn" data-wa="conversar" href="${WA}" target="_blank" rel="noopener noreferrer">Falar com um consultor</a>
      </nav>
      <button class="sl-menu-btn" id="menu-btn" aria-label="Abrir menu" aria-expanded="false" aria-controls="mobile-menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>
      </button>
    </div>
    <div class="sl-wrap"><nav id="mobile-menu" class="sl-menu" aria-label="Menu">
      ${mobile}
      <a data-wa="conversar" href="${WA}" target="_blank" rel="noopener noreferrer">Falar com um consultor →</a>
    </nav></div>
  </header>
`;
}

export function cityChip(cityName) {
  const label = cityName ? `Atendendo em ${cityName}` : 'Atendemos todo o Sul Fluminense';
  return `
  <div class="sl-citybar"><div class="sl-wrap"><span class="sl-chip" data-city-chip>
    <span data-city-label>${label}</span>
    <button type="button" class="sl-chip__btn" popovertarget="city-pop">${cityName ? 'trocar' : 'minha cidade'}</button>
    <div id="city-pop" popover class="sl-citypop"><p>Escolha a sua cidade</p><div class="sl-citypop__list" data-city-list></div></div>
  </span></div></div>
`;
}

export function strip() {
  return `
  <div class="sl-strip"><div class="sl-wrap sl-strip__in">
    <span class="sl-strip__item"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>17 anos no Sul Fluminense</span>
    <span class="sl-strip__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Consultoria gratuita em casa</span>
    <span class="sl-strip__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>Parcele em até 12x</span>
    <span class="sl-strip__item">${telIcon}Atendimento humano, sem robô</span>
  </div></div>
`;
}

export function proof(cityName) {
  const sub = cityName ? `${cityName} e região. O consultor vai até a sua casa sem custo.` : 'Volta Redonda, Barra Mansa, Resende e mais 12 cidades. O consultor vai até a sua casa sem custo.';
  return `
    <section class="sl-section" id="prova"><div class="sl-wrap">
      <p class="sl-kicker">Por que a gente pode falar sobre isso</p>
      <h2 class="sl-h2">Somos referência em cortinas no Sul Fluminense</h2>
      <p class="sl-sub">${sub}</p>
      <div class="sl-stats" style="margin-top:28px">
        <div class="sl-stat"><span class="sl-stat__n">17</span><div><h3>Anos medindo, confeccionando e instalando</h3><p>Desde 2009 no Sul Fluminense. Cortina sob medida é o que a gente faz, não uma linha a mais no catálogo.</p></div></div>
        <div class="sl-stat"><span class="sl-stat__n">5.0</span><div><h3>Nota máxima no Google, com 292 avaliações</h3><p>Cliente satisfeito volta para o segundo ambiente e indica para o vizinho.</p></div></div>
        <div class="sl-stat"><span class="sl-stat__n">9 mil</span><div><h3>Ambientes entregues na região</h3><p>Salas, quartos, escritórios e projetos corporativos, todos medidos e instalados pela nossa equipe.</p></div></div>
        <div class="sl-stat"><span class="sl-stat__n">100%</span><div><h3>Equipe própria, do consultor ao instalador</h3><p>Medição, confecção e instalação são feitas pela nossa gente. Não terceirizamos a sua casa.</p></div></div>
      </div>
      <div class="sl-seals">
        <img src="/selo-premio.avif" alt="Prêmio de excelência ShineCortinas" width="56" height="56" loading="lazy" decoding="async">
        <img src="/selo-diamante.avif" alt="Selo de qualidade ShineCortinas" width="56" height="56" loading="lazy" decoding="async">
        <p>Cortinas premiadas e reconhecidas pelo trabalho de confecção sob medida na região.</p>
      </div>
    </div></section>
`;
}

export function compare() {
  return `
    <section class="sl-section" id="comparativo"><div class="sl-wrap">
      <div class="sl-center" style="margin-bottom:30px">
        <p class="sl-kicker sl-kicker--center">Antes de decidir</p>
        <h2 class="sl-h2">Comprar pela internet ou <em>sob medida?</em></h2>
      </div>
      <div class="sl-compare">
        <div class="sl-compare__row sl-compare__head"><div>Pela internet</div><div>Com a Shine</div></div>
        <div class="sl-compare__row"><div>Você mede sozinho</div><div>Medição a laser feita por nós, na sua casa</div></div>
        <div class="sl-compare__row"><div>Escolhe o tecido pela tela</div><div>Sente a textura e vê a cor no seu ambiente</div></div>
        <div class="sl-compare__row"><div>Compra trilho e acionamento à parte</div><div>Projeto completo, com trilho e acionamento</div></div>
        <div class="sl-compare__row"><div>Instalador desconhecido</div><div>Equipe própria, instalação no dia combinado</div></div>
        <div class="sl-compare__row"><div>Garantia de loja: meses</div><div>1 ano na instalação, até 5 em cortinas e até 8 em motorização</div></div>
        <div class="sl-compare__row"><div>Erro de medida é problema seu</div><div>A medida é responsabilidade nossa</div></div>
      </div>
    </div></section>
`;
}

export function footer() {
  return `
  <footer class="sl-footer"><div class="sl-wrap">
    <div class="sl-footer__grid">
      <div>
        <a href="/" class="sl-logo"><span class="sl-logo__mark">S</span><span class="sl-logo__name">SHINE</span></a>
        <p style="margin-top:14px">Rua K, 60 · Volta Redonda, RJ<br>Atendemos todo o Sul Fluminense.<br>Sob medida para cada ambiente, desde 2009.</p>
      </div>
      <div>
        <h4>Fale conosco</h4>
        <a class="sl-footer__phone" data-wa="conversar" href="${WA}">(24) 99329-8763</a>
        <p>(24) 3338-3069</p>
        <p style="margin-top:10px">Na visita você conhece o projeto, os tecidos e as condições, inclusive o parcelamento em até 12x.</p>
      </div>
      <div>
        <h4>Redes</h4>
        <p><a href="https://www.instagram.com/shinecortinas/" rel="me noopener" target="_blank">Instagram</a> · <a href="https://www.facebook.com/shinecortinas" rel="me noopener" target="_blank">Facebook</a> · <a href="https://www.youtube.com/@shinecortinas" rel="me noopener" target="_blank">YouTube</a><br><a href="https://www.tiktok.com/@shinecortinas" rel="me noopener" target="_blank">TikTok</a> · <a href="https://www.pinterest.com/shinecortinas" rel="me noopener" target="_blank">Pinterest</a></p>
      </div>
    </div>
    <div class="sl-footer__bottom"><span>© 2026 ShineCortinas</span><span>Google 5.0 ★★★★★ · 292 avaliações</span></div>
  </div></footer>
`;
}

export function waFloat() {
  return `
  <a class="sl-wa" data-wa="conversar" href="${WA}" target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp">${waIcon}</a>
`;
}

// Barra fixa do celular: uma ação (cidades) ou abas estilo app (home).
export function bar(kind) {
  if (kind === 'tabs') {
    const icon = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">${d}</svg>`;
    return `
  <nav class="sl-tabs" aria-label="Atalhos">
    <a href="#top" aria-current="page">${icon('<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>')}<span>Início</span></a>
    <a href="#solucoes">${icon('<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9h18M8 4v16"/>')}<span>Soluções</span></a>
    <a href="/portfolio/">${icon('<rect x="3" y="3" width="18" height="18" rx="1"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/>')}<span>Projetos</span></a>
    <a href="#cidades">${icon('<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>')}<span>Cidades</span></a>
    <a class="sl-tabs__wa" data-wa="conversar" href="${WA}" target="_blank" rel="noopener noreferrer">${waIconSmall}<span>WhatsApp</span></a>
  </nav>
`;
  }
  return `
  <div class="sl-bar">
    <a class="sl-btn" data-wa="conversar" href="${WA}" target="_blank" rel="noopener noreferrer">${waIconSmall}Falar com um consultor pelo WhatsApp</a>
  </div>
`;
}

export function tail() {
  return `
  <script src="/assets/shine-wa.js?v=${JS_V}" defer></script>
  <script type="speculationrules">
  {"prefetch":[{"where":{"and":[{"href_matches":"/*"},{"not":{"href_matches":"/lp/*"}},{"not":{"href_matches":"/app/*"}}]},"eagerness":"moderate"}]}
  </script>
  <script>
    (function(){
      var btn=document.getElementById('menu-btn'),menu=document.getElementById('mobile-menu');
      if(btn&&menu){btn.addEventListener('click',function(){var open=menu.hasAttribute('data-open');if(open){menu.removeAttribute('data-open');btn.setAttribute('aria-expanded','false');}else{menu.setAttribute('data-open','');btn.setAttribute('aria-expanded','true');}});}
    })();
  </script>
</body>
</html>
`;
}
