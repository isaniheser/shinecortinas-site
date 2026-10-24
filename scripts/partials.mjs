import {auroraHeader,auroraMenu,auroraHead,AURORA_V} from './aurora-layout.mjs';
// Blocos compartilhados do sistema visual "leve" (header, faixa, rodapé, barra fixa, scripts).
// Usados por build-cidades.mjs e build-home.mjs. Alterar aqui muda todas as páginas geradas.

export const WA = 'https://wa.me/5524993298763?text=Ol%C3%A1%2C%20eu%20vim%20do%20site%20da%20Shine%20e%20quero%20agendar%20uma%20consultoria%20gratuita%20em%20casa.';
export const FONTS = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Cinzel:wght@700&family=Playfair+Display:ital,wght@0,500;0,600;1,500&display=swap';
export const CSS_V = '16';
export const JS_V = '6';
export const FOUNDED_YEAR = 2009;
export const CURRENT_YEAR = new Date().getFullYear();
export const YEARS_ACTIVE = CURRENT_YEAR - FOUNDED_YEAR;
export const GOOGLE_RATING = '4.9';
export const GOOGLE_RATING_PT = '4,9';
export const GOOGLE_REVIEWS = '297';

export const syncBrandFacts = (s) => String(s)
  .replace(/\b29[0-9] avaliações/g, `${GOOGLE_REVIEWS} avaliações`)
  .replace(/\b1[6-9] anos\b/g, `${YEARS_ACTIVE} anos`);

export const esc = (s) => String(s).replace(/&(?!(amp|lt|gt|quot|#\d+);)/g, '&amp;').replace(/"/g, '&quot;');

export const waIcon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
export const waIconSmall = waIcon.replace('width="28" height="28"', 'width="20" height="20"');
export const telIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';

export const NAV = [
  ['/cortinas/', 'Cortinas'], ['/persianas/', 'Persianas'], ['/lavagem-de-cortinas/', 'Lavagem'], ['/metodo/', 'Como funciona'],
  ['/cidades-atendidas/', 'Cidades'], ['/portfolio/', 'Projetos'], ['/sobre/', 'Sobre'], ['/blog/', 'Blog'],
];

// Canonical de página-pasta tem que terminar em '/', que é a URL que o Cloudflare serve e o sitemap declara.
// Normaliza canonical, og:url e toda ocorrência da mesma URL entre aspas (JSON-LD, links).
export function normalizaCanonical(html) {
  const cm = html.match(/<link rel="canonical" href="(https:\/\/www\.shinecortinas\.com\/[^"]*?)"/);
  if (!cm || cm[1].endsWith('/') || /\.[a-z0-9]+$/i.test(cm[1])) return html;
  return html.split(`"${cm[1]}"`).join(`"${cm[1]}/"`);
}

const SAME_AS = [
  'https://www.instagram.com/shinecortinas/',
  'https://www.facebook.com/shinecortinas',
  'https://www.youtube.com/@shinecortinas',
  'https://www.tiktok.com/@shinecortinas',
  'https://www.pinterest.com/shinecortinas',
];

export function normalizaJsonLd(head, crumbs) {
  const m = head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!m) return head;
  let data;
  try { data = JSON.parse(m[1]); } catch { return head; }
  const graph = data['@graph'] || (Array.isArray(data) ? data : [data]);
  const can = (head.match(/<link rel="canonical" href="([^"]+)"/) || [, 'https://www.shinecortinas.com/'])[1];
  const title = (head.match(/<title>([\s\S]*?)<\/title>/) || [, 'ShineCortinas'])[1].trim();
  const desc = (head.match(/<meta name="description" content="([^"]*)"/) || [, ''])[1].trim();

  const fixPerson = (p) => {
    if (!p || typeof p !== 'object' || p['@type'] !== 'Person') return;
    if (!p.name || p.name.startsWith('Isani')) {
      p['@id'] = 'https://www.shinecortinas.com/#isani';
      p.name = 'Isani Oliveira';
      p.jobTitle = 'Fundador e especialista em cortinas e persianas sob medida';
      p.url = 'https://www.shinecortinas.com/sobre/';
      p.image = 'https://www.shinecortinas.com/isani-consultoria.avif';
      p.worksFor = { '@id': 'https://www.shinecortinas.com/#org' };
    }
  };

  let existingMod = null;
  for (const n of graph) {
    if (!n || typeof n !== 'object') continue;
    if (n.dateModified && !existingMod) existingMod = n.dateModified;
    const t = n['@type'];
    if (t === 'Organization' || (Array.isArray(t) && t.includes('Organization'))) {
      n['@id'] = 'https://www.shinecortinas.com/#org';
      n.name = 'ShineCortinas';
      n.url = 'https://www.shinecortinas.com/';
      if (!n.logo) n.logo = 'https://www.shinecortinas.com/logo-shine.avif';
      n.sameAs = SAME_AS;
      n.contactPoint = [
        { '@type': 'ContactPoint', telephone: '+5524993298763', contactType: 'customer service', areaServed: 'BR', availableLanguage: 'Portuguese' },
      ];
    }
    if (t === 'LocalBusiness' || t === 'HomeAndConstructionBusiness' || (Array.isArray(t) && (t.includes('LocalBusiness') || t.includes('HomeAndConstructionBusiness')))) {
      n['@id'] = 'https://www.shinecortinas.com/#biz';
      n.name = 'ShineCortinas';
      n.url = 'https://www.shinecortinas.com/';
      n.telephone = '+5524993298763';
      n.contactPoint = [
        { '@type': 'ContactPoint', telephone: '+5524993298763', contactType: 'customer service', areaServed: 'BR', availableLanguage: 'Portuguese' },
      ];
      n.priceRange = '$$';
      if (!n.image) n.image = 'https://www.shinecortinas.com/hero-sala.avif';
      n.address = { '@type': 'PostalAddress', addressLocality: 'Volta Redonda', addressRegion: 'RJ', addressCountry: 'BR' };
      delete n.geo;
      if (!n.areaServed) {
        n.areaServed = [
          { '@type': 'City', name: 'Volta Redonda' },
          { '@type': 'City', name: 'Barra Mansa' },
          { '@type': 'City', name: 'Resende' },
          { '@type': 'AdministrativeArea', name: 'Sul Fluminense, RJ' },
        ];
      }
      n.openingHoursSpecification = [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' },
      ];
      n.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: GOOGLE_RATING,
        reviewCount: GOOGLE_REVIEWS,
        bestRating: '5',
        worstRating: '1',
      };
    }
    if (t === 'FAQPage' && Array.isArray(n.mainEntity)) {
      n.mainEntity.forEach((q) => {
        if (q && q.acceptedAnswer && q.acceptedAnswer.text) {
          q.acceptedAnswer.text = syncBrandFacts(q.acceptedAnswer.text);
        }
      });
    }
    fixPerson(n);
    if (n.author) fixPerson(n.author);
    if (n.founder) fixPerson(n.founder);
    if (n.reviewedBy) fixPerson(n.reviewedBy);
    if (Array.isArray( crumbs ) && crumbs.length && t === 'BreadcrumbList') {
      n.itemListElement = crumbs.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item }));
    }
  }

  let wp = graph.find((n) => n && (n['@type'] === 'WebPage' || n['@type'] === 'AboutPage' || n['@type'] === 'ContactPage' || n['@type'] === 'CollectionPage'));
  if (!wp) {
    wp = { '@type': 'WebPage', '@id': can, url: can, name: title, description: desc, inLanguage: 'pt-BR', isPartOf: { '@id': 'https://www.shinecortinas.com/#website' } };
    graph.push(wp);
  }
  if (!wp.dateModified) wp.dateModified = existingMod || '2026-09-14';
  if (Array.isArray(crumbs) && crumbs.length && !graph.some((n) => n && n['@type'] === 'BreadcrumbList')) {
    graph.push({ '@type': 'BreadcrumbList', itemListElement: crumbs.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) });
  }

  const out = data['@graph'] ? { ...data, '@graph': graph } : { '@context': 'https://schema.org', '@graph': graph };
  return head.replace(m[0], () => `<script type="application/ld+json">\n  ${JSON.stringify(out, null, 2)}\n  </script>`);
}

// Limpa o <head> herdado (Tailwind, estilos inline, redirect de celular) e injeta o CSS do sistema.
export function cleanHead(head, opts = {}) {
  head = head.replace('<html lang="pt-BR" class="scroll-smooth">', '<html lang="pt-BR">');
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
  // Fontes: 34 páginas ficaram sem Playfair/Montserrat por herdarem um head sem o link (auditoria 08/09/2026).
  if (!/fonts\.googleapis\.com/.test(head)) head = head.replace('<link rel="stylesheet" href="/assets/shine-leve.css', `<link rel="preconnect" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link href="${FONTS}" rel="stylesheet">\n  <link rel="stylesheet" href="/assets/shine-leve.css`);
  // Canonical de página-pasta tem que terminar em '/', que é a URL que o Cloudflare serve e o sitemap declara.
  // Normaliza canonical, og:url e toda ocorrência da mesma URL no JSON-LD (breadcrumb, mainEntityOfPage).
  head = normalizaCanonical(head);
  head = head.split('"https://www.shinecortinas.com/sobre"').join('"https://www.shinecortinas.com/sobre/"');
  head = syncBrandFacts(head);
  const precisaLd = opts.semSchema !== true;
  if (precisaLd) head = normalizaJsonLd(head, opts.crumbs);
  if (!/shine-leve\.css/.test(head) || (precisaLd && !/application\/ld\+json/.test(head)) || /tailwind|location\.replace\('\/app\/'\)/.test(head)) throw new Error('head inválido');
  return auroraHead(head);
}

export function header(currentPath) { return auroraHeader(currentPath); }

export function cityChip(cityName) {
  const label = cityName ? `Atendendo em ${cityName}` : 'Atendemos todo o Sul Fluminense';
  return `
  <div class="sl-citybar"><div class="sl-wrap" style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px;"><span class="sl-chip" data-city-chip>
    <span data-city-label>${label}</span>
    <button type="button" class="sl-chip__btn" popovertarget="city-pop">${cityName ? 'trocar' : 'minha cidade'}</button>
    <div id="city-pop" popover class="sl-citypop"><p>Escolha a sua cidade</p><div class="sl-citypop__list" data-city-list></div></div>
  </span><a href="/#diagnostico-isani" class="sl-chip" style="text-decoration:none;background:linear-gradient(135deg,#DDBB6E 0%,#C9A252 55%,#B38A3B 100%);color:#08130F;font-weight:700;border-color:#C9A252;">✦ Simular Meu Ambiente</a><a href="/#obras-reais" class="sl-chip" style="text-decoration:none;font-weight:600;">▶ Obras em Vídeo</a></div></div>
`;
}

export function strip() {
  return `
  <div class="sl-strip"><div class="sl-wrap sl-strip__in">
    <span class="sl-strip__item"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><span data-years-text>${YEARS_ACTIVE} anos</span> no Sul Fluminense</span>
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
        <div class="sl-stat"><span class="sl-stat__n" data-since="${FOUNDED_YEAR}">${YEARS_ACTIVE}</span><div><h3>Anos medindo, confeccionando e instalando</h3><p>Desde ${FOUNDED_YEAR} no Sul Fluminense. Cortina sob medida é o que a gente faz, não uma linha a mais no catálogo.</p></div></div>
        <div class="sl-stat"><span class="sl-stat__n">${GOOGLE_RATING_PT}</span><div><h3>Nota ${GOOGLE_RATING_PT} no Google, com ${GOOGLE_REVIEWS} avaliações</h3><p>Cliente satisfeito volta para o segundo ambiente e indica para o vizinho.</p></div></div>
        <div class="sl-stat"><span class="sl-stat__n">9 mil</span><div><h3>Ambientes transformados na região</h3><p>Salas, quartos, escritórios e projetos corporativos, todos medidos e instalados pela nossa equipe.</p></div></div>
        <div class="sl-stat"><span class="sl-stat__n">100%</span><div><h3>Equipe própria, do consultor ao instalador</h3><p>Medição, confecção e instalação são feitas pela nossa gente. Não terceirizamos a sua casa.</p></div></div>
      </div>
      <div class="sl-seals">
        <img src="/selo-premio.avif" alt="Excelência em confecção sob medida ShineCortinas" width="56" height="56" loading="lazy" decoding="async">
        <img src="/selo-diamante.avif" alt="Selo de qualidade ShineCortinas" width="56" height="56" loading="lazy" decoding="async">
        <p>Confecção própria sob medida e acabamento de alfaiataria reconhecido em toda a região.</p>
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
        <div class="sl-compare__row"><div>Garantia de loja: meses</div><div>1 ano (e até 5 anos na motorização)</div></div>
        <div class="sl-compare__row"><div>Erro de medida é problema seu</div><div>A medida é responsabilidade nossa</div></div>
      </div>
    </div></section>
`;
}

export function footer() {
  return `
  <footer class="sl-footer"><div class="sl-wrap">
    <div style="background:#08130F;color:#FAF6EE;border:1.5px solid rgba(201,162,82,0.45);border-radius:18px;padding:24px 20px;margin-bottom:32px;text-align:center;">
      <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.16em;color:#DDBB6E;margin:0 0 6px;">✦ Ferramenta Interativa · Consultor do Isani</p>
      <h3 style="font-family:var(--serif);font-size:clamp(21px,3vw,28px);color:#FAF6EE;margin:0 0 8px;font-weight:600;">Qual modelo o Isani indicaria para o <em>seu ambiente hoje?</em></h3>
      <p style="font-size:13.5px;color:rgba(250,246,238,0.82);max-width:540px;margin:0 auto 16px;">Toque no seu cômodo (Sala, Quarto, Varanda, Cozinha ou Pé-Direito Duplo) e veja na hora a especificação técnica e vídeos de obras reais filmadas na região.</p>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:10px;">
        <a href="/#diagnostico-isani" style="display:inline-flex;align-items:center;justify-content:center;padding:13px 20px;border-radius:12px;background:linear-gradient(135deg,#DDBB6E 0%,#C9A252 55%,#B38A3B 100%);color:#08130F;font-weight:700;font-size:13px;text-decoration:none;">✦ Testar Consultor por Ambiente →</a>
        <a href="/#obras-reais" style="display:inline-flex;align-items:center;justify-content:center;padding:13px 18px;border-radius:12px;border:1px solid rgba(201,162,82,0.55);background:rgba(255,255,255,0.06);color:#FAF6EE;font-weight:600;font-size:13px;text-decoration:none;">▶ Assistir Obras em Vídeo →</a>
      </div>
    </div>
    <div class="sl-footer__grid">
      <div>
        <a href="/" class="sl-logo" aria-label="ShineCortinas — início"><img src="/logo-shine.avif" alt="ShineCortinas" width="56" height="56" loading="lazy" decoding="async"></a>
        <p style="margin-top:14px">Volta Redonda, RJ · Consultoria em domicílio<br>Atendemos todo o Sul Fluminense.<br>Sob medida para cada ambiente, desde ${FOUNDED_YEAR}.</p>
      </div>
      <div>
        <h4>Fale conosco</h4>
        <a class="sl-footer__phone" data-wa="conversar" href="${WA}">(24) 99329-8763</a>
        <p style="margin-top:10px">Na visita você conhece o projeto, os tecidos e as condições, inclusive o parcelamento em até 12x.</p>
      </div>
      <div>
        <h4>Redes</h4>
        <p><a href="https://www.instagram.com/shinecortinas/" rel="me noopener" target="_blank">Instagram</a> · <a href="https://www.facebook.com/shinecortinas" rel="me noopener" target="_blank">Facebook</a> · <a href="https://www.youtube.com/@shinecortinas" rel="me noopener" target="_blank">YouTube</a><br><a href="https://www.tiktok.com/@shinecortinas" rel="me noopener" target="_blank">TikTok</a> · <a href="https://www.pinterest.com/shinecortinas" rel="me noopener" target="_blank">Pinterest</a></p>
      </div>
    </div>
    <div class="sl-footer__bottom"><span>© <span data-current-year>${CURRENT_YEAR}</span> ShineCortinas</span><span>Google ${GOOGLE_RATING_PT} ★★★★★ · ${GOOGLE_REVIEWS} avaliações</span></div>
  </div></footer>
`;
}

// Botão flutuante de WhatsApp visível durante a rolagem em todas as páginas.
export function waFloat() {
  return `
  <a class="sl-wa" data-wa="conversar" href="${WA}" target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp">${waIcon}</a>
`;
}
export function bar() { return ''; }

export function tail() {
  return `
  ${auroraMenu()}
  <script data-cfasync="false" src="/assets/shine-aurora.js?v=${AURORA_V}" defer></script>
  <script data-cfasync="false" src="/assets/shine-wa.js?v=${JS_V}" defer></script>
  <script type="speculationrules">
  {"prefetch":[{"where":{"and":[{"href_matches":"/*"},{"not":{"href_matches":"/lp/*"}},{"not":{"href_matches":"/app/*"}}]},"eagerness":"moderate"}]}
  </script>

</body>
</html>
`;
}
