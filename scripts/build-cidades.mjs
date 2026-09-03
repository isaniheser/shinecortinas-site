// Gera as 15 páginas /cidades/<slug>/index.html a partir de cidades/cidades.json
// (conteúdo único por cidade) + o template do sistema visual "leve" (assets/shine-leve.css).
// O <head> de cada página (title, metas, canonical, JSON-LD) é preservado do arquivo existente.
// Uso: node scripts/build-cidades.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(join(ROOT, 'cidades', 'cidades.json'), 'utf8'));
const WA = 'https://wa.me/5524993298763?text=Ol%C3%A1%2C%20eu%20vim%20do%20site%20da%20Shine%20e%20quero%20agendar%20uma%20consultoria%20gratuita%20em%20casa.';
const FONTS = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Cinzel:wght@700&family=Playfair+Display:ital,wght@0,500;0,600;1,500&display=swap';
const CSS_V = '4';

const esc = (s) => String(s).replace(/&(?!(amp|lt|gt|quot|#\d+);)/g, '&amp;').replace(/"/g, '&quot;');

function cleanHead(head) {
  head = head.replace(/\s*<link rel="preload" href="\/assets\/tailwind.generated.css"[^>]*>/, '');
  head = head.replace(/\s*<link rel="stylesheet" href="\/assets\/tailwind.generated.css">/, '');
  head = head.replace(/\s*<link rel="stylesheet" href="\/assets\/cidades.css[^"]*">/, '');
  head = head.replace(/\s*<link rel="stylesheet" href="\/assets\/shine-leve.css[^"]*">/, '');
  head = head.replace(/\s*<style>[\s\S]*?<\/style>/, '');
  head = head.replace('content="#000000"', 'content="#16302A"');
  head = head.replace(/href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]+"/, `href="${FONTS}"`);
  head = head.replace('<link rel="icon" type="image/png"', `<link rel="stylesheet" href="/assets/shine-leve.css?v=${CSS_V}">\n  <link rel="icon" type="image/png"`);
  if (!/shine-leve\.css/.test(head) || !/application\/ld\+json/.test(head) || /tailwind/.test(head)) throw new Error('head inválido');
  return head;
}

const waIcon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
const waIconSmall = waIcon.replace('width="28" height="28"','width="20" height="20"');
const telIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';

function body(d) {
  const nav = (cur) => `
      <nav class="sl-nav" aria-label="Menu principal">
        <a href="/cortinas/">Cortinas</a>
        <a href="/persianas/">Persianas</a>
        <a href="/metodo/">Como funciona</a>
        <a href="/cidades-atendidas.html" aria-current="true">Cidades</a>
        <a href="/portfolio/">Projetos</a>
        <a href="/blog/">Blog</a>
        <a class="sl-btn" data-wa="conversar" href="${WA}" target="_blank" rel="noopener noreferrer">Falar com um consultor</a>
      </nav>`;
  const gallery = d.gallery.map((g) => `        <figure><div class="sl-media"><img src="${g.src}" alt="${esc(g.alt)}" width="800" height="800" loading="lazy" decoding="async"></div><figcaption><span>${g.tag}</span><p>${g.cap}</p></figcaption></figure>`).join('\n');
  const steps = d.steps.map((s, i) => `        <div class="sl-step"><div class="sl-step__n">${i + 1}</div><h3>${s.h}</h3><p>${s.p}</p></div>`).join('\n');
  const faq = d.faq.map((f) => `        <details><summary>${f.q}</summary><div>${f.a}</div></details>`).join('\n');
  const nearby = d.nearby.map(([slug, name]) => `<a href="/cidades/${slug}/">${name}</a>`).join('');
  return `<body data-wa-context="a página de ${d.city}">

  <header class="sl-header">
    <div class="sl-wrap sl-header__in">
      <a href="/" class="sl-logo" aria-label="ShineCortinas — início"><span class="sl-logo__mark">S</span><span class="sl-logo__name">SHINE</span></a>${nav()}
      <button class="sl-menu-btn" id="menu-btn" aria-label="Abrir menu" aria-expanded="false" aria-controls="mobile-menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>
      </button>
    </div>
    <div class="sl-wrap"><nav id="mobile-menu" class="sl-menu" aria-label="Menu">
      <a href="/">Início</a><a href="/cortinas/">Cortinas</a><a href="/persianas/">Persianas</a><a href="/metodo/">Como funciona</a><a href="/cidades-atendidas.html">Cidades atendidas</a><a href="/portfolio/">Projetos</a><a href="/blog/">Blog</a>
      <a data-wa="conversar" href="${WA}" target="_blank" rel="noopener noreferrer">Falar com um consultor →</a>
    </nav></div>
  </header>

  <section class="sl-hero">
    <div class="sl-hero__img"><img src="/hero-sala.avif" alt="${esc(d.hero_alt)}" width="1920" height="1080" fetchpriority="high" decoding="async"></div>
    <div class="sl-wrap"><div class="sl-hero__in">
      <nav aria-label="Breadcrumb"><ol class="sl-crumbs">
        <li><a href="/">Início</a></li><li aria-hidden="true">/</li>
        <li><a href="/cidades-atendidas.html">Cidades</a></li><li aria-hidden="true">/</li>
        <li aria-current="page">${d.city}</li>
      </ol></nav>
      <p class="sl-kicker">${d.badge}</p>
      <h1 class="sl-h1">${d.h1_pre} <em>${d.h1_em}</em></h1>
      <div class="sl-hero__rule"></div>
      <p class="sl-lede">${d.hero_p}</p>
      <a class="sl-btn" data-wa="conversar" href="${WA}" target="_blank" rel="noopener noreferrer">Falar com um consultor →</a>
      <p class="sl-note">Sem compromisso · Resposta em minutos · Você decide o próximo passo</p>
    </div></div>
  </section>

  <div class="sl-citybar"><div class="sl-wrap"><span class="sl-chip" data-city-chip>
    <span data-city-label>Atendendo em ${d.city}</span>
    <button type="button" class="sl-chip__btn" popovertarget="city-pop">trocar</button>
    <div id="city-pop" popover class="sl-citypop"><p>Escolha a sua cidade</p><div class="sl-citypop__list" data-city-list></div></div>
  </span></div></div>

  <div class="sl-strip"><div class="sl-wrap sl-strip__in">
    <span class="sl-strip__item"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>17 anos no Sul Fluminense</span>
    <span class="sl-strip__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Consultoria gratuita em casa</span>
    <span class="sl-strip__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>Parcele em até 12x</span>
    <span class="sl-strip__item">${telIcon}Atendimento humano, sem robô</span>
  </div></div>

  <main>
    <section class="sl-section"><div class="sl-wrap sl-grid-2">
      <div class="sl-media"><img src="${d.imag_img}" alt="${esc(d.imag_alt)}" width="800" height="1000" loading="lazy" decoding="async"></div>
      <div class="sl-copy">
        <p class="sl-kicker">${d.imag_kicker}</p>
        <h2 class="sl-h2">${d.imag_h2}</h2>
        <p>${d.imag_p}</p>
        <a class="sl-btn sl-btn--green" data-wa="estimativa" href="${WA}" target="_blank" rel="noopener noreferrer">Quero esse resultado na minha casa →</a>
      </div>
    </div></section>

    <section class="sl-section"><div class="sl-wrap sl-grid-2 sl-grid-2--img-right">
      <div class="sl-media"><img src="${d.story_img}" alt="${esc(d.story_alt)}" width="800" height="1000" loading="lazy" decoding="async"></div>
      <div class="sl-copy">
        <p class="sl-kicker">${d.story_kicker}</p>
        <h2 class="sl-h2">${d.story_h2}</h2>
        <p>${d.story_p1}</p>
        <p>${d.story_p2}</p>
        <a class="sl-btn sl-btn--ghost" data-wa="estimativa" href="${WA}" target="_blank" rel="noopener noreferrer">Receber uma estimativa para o meu ambiente →</a>
      </div>
    </div></section>

    <section class="sl-section"><div class="sl-wrap">
      <p class="sl-kicker">Por que a gente pode falar sobre isso</p>
      <h2 class="sl-h2">Somos referência em cortinas no Sul Fluminense</h2>
      <p class="sl-sub">${d.city} e região. O consultor vai até a sua casa sem custo.</p>
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

    <section class="sl-section"><div class="sl-wrap">
      <div class="sl-center" style="margin-bottom:32px">
        <p class="sl-kicker sl-kicker--center">Projetos reais · Sul Fluminense</p>
        <h2 class="sl-h2">${d.gal_h2}</h2>
        <p class="sl-sub">${d.gal_p}</p>
      </div>
      <div class="sl-gallery">
${gallery}
      </div>
      <div class="sl-center" style="margin-top:34px"><a class="sl-btn sl-btn--ghost" data-wa="estimativa" href="${WA}" target="_blank" rel="noopener noreferrer">${d.gal_cta}</a></div>
    </div></section>

    <section class="sl-section"><div class="sl-wrap">
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
        <div class="sl-compare__row"><div>Erro de medida é problema seu</div><div>A medida é responsabilidade nossa</div></div>
      </div>
    </div></section>

    <section class="sl-section"><div class="sl-wrap">
      <div class="sl-center" style="margin-bottom:34px">
        <p class="sl-kicker sl-kicker--center">Do contato à instalação</p>
        <h2 class="sl-h2">Como funciona em <em>${d.city}</em></h2>
      </div>
      <div class="sl-steps">
${steps}
      </div>
    </div></section>

    <section class="sl-band"><div class="sl-wrap">
      <p class="sl-kicker">Depoimento real · ${d.city}</p>
      <div class="sl-stars" aria-label="5 estrelas">★★★★★</div>
      <blockquote class="sl-quote">"${d.quote}"</blockquote>
      <p class="sl-quote-by">${d.quote_by}<small>${d.quote_sub}</small></p>
    </div></section>

    <section class="sl-section"><div class="sl-wrap">
      <div class="sl-center" style="margin-bottom:28px">
        <p class="sl-kicker sl-kicker--center">Dúvidas frequentes</p>
        <h2 class="sl-h2">Perguntas sobre <em>${d.city}</em></h2>
      </div>
      <div class="sl-faq">
${faq}
      </div>
    </div></section>

    <section class="sl-band"><div class="sl-wrap sl-center">
      <p class="sl-kicker sl-kicker--center">Consultoria em domicílio · ${d.city}</p>
      <h2 class="sl-h2">${d.cta_h2}</h2>
      <p class="sl-sub" style="margin:0 auto 26px">${d.cta_p}</p>
      <a class="sl-btn" data-wa="agendar" href="${WA}" target="_blank" rel="noopener noreferrer">Agendar consultoria em casa →</a>
      <p class="sl-note">Gratuita · Sem compromisso · (24) 99329-8763</p>
    </div></section>

    <section class="sl-section sl-section--tight"><div class="sl-wrap">
      <p class="sl-label">Explore o site</p>
      <div class="sl-links">
        <a href="/cortinas/">Cortinas sob medida</a><a href="/persianas/">Persianas técnicas</a><a href="/cortina-motorizada/">Cortina motorizada</a><a href="/cortina-wave/">Cortina wave</a>
        <a href="/blackout-e-forros/">Blackout e forros</a><a href="/portfolio/">Portfólio real</a><a href="/blog/">Blog e dicas</a><a href="/cidades-atendidas.html">Todas as cidades</a>
      </div>
      <p class="sl-label" style="margin-top:34px">Também atendemos na região</p>
      <div class="sl-chips">${nearby}</div>
    </div></section>
  </main>

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

  <a class="sl-wa" data-wa="conversar" href="${WA}" target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp">${waIcon}</a>
  <div class="sl-bar">
    <a class="sl-btn" data-wa="conversar" href="${WA}" target="_blank" rel="noopener noreferrer">${waIconSmall}Falar com um consultor pelo WhatsApp</a>
  </div>

  <script src="/assets/shine-wa.js?v=1" defer></script>
  <script type="speculationrules">
  {"prefetch":[{"where":{"and":[{"href_matches":"/*"},{"not":{"href_matches":"/lp/*"}},{"not":{"href_matches":"/app/*"}}]},"eagerness":"moderate"}]}
  </script>
  <script>
    (function(){
      var btn=document.getElementById('menu-btn'),menu=document.getElementById('mobile-menu');
      btn.addEventListener('click',function(){var open=menu.hasAttribute('data-open');if(open){menu.removeAttribute('data-open');btn.setAttribute('aria-expanded','false');}else{menu.setAttribute('data-open','');btn.setAttribute('aria-expanded','true');}});
    })();
  </script>
</body>
</html>
`;
}

let n = 0;
for (const slug of readdirSync(join(ROOT, 'cidades'), { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name)) {
  const d = data[slug];
  if (!d) throw new Error(`sem dados em cidades.json para ${slug}`);
  const file = join(ROOT, 'cidades', slug, 'index.html');
  const src = readFileSync(file, 'utf8');
  const head = cleanHead(src.split('<body')[0]);
  writeFileSync(file, head + body(d));
  n++;
}
console.log(`build-cidades: ${n} páginas geradas`);
