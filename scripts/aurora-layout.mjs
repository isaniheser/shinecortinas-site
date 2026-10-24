// Navegação aprovada: HTML real para links, com aprimoramento progressivo no navegador.
export const AURORA_V = '5';
export const AURORA_CSS = `<link rel="stylesheet" href="/assets/shine-aurora.css?v=${AURORA_V}">`;
const WA_MENU = 'https://wa.me/5524993298763?text=Ol%C3%A1%2C%20eu%20vim%20do%20site%20da%20Shine%20e%20quero%20agendar%20uma%20consultoria%20gratuita%20em%20casa.';
const entries = [
  ['Cortinas','Textura e caimento','/cortinas/','/cortina-sob-medida.avif'],
  ['Persianas','Desenhe a sua luz','/persianas/','/persiana-motorizada.avif'],
  ['Projetos','Encontre inspiração','/portfolio/','/hero-sala.avif'],
  ['Guias','Escolha com confiança','/blog/','/duplo-sq.avif'],
  ['Sobre a Shine','Conheça nossa história','/sobre/','/isani-consultoria-800.avif'],
  ['Vamos conversar','Seu ambiente começa aqui','/contato/','/cortina-sob-medida.avif'],
];
const extra = [['/#diagnostico-isani','✦ Consultor Isani'],['/#obras-reais','▶ Obras em Vídeo'],['/cortina-motorizada/','Automação'],['/lavagem-de-cortinas/','Lavagem'],['/metodo/','Como funciona'],['/cidades-atendidas/','Cidades']];

export function auroraHeader() {
  return `<header class="sl-header"><div class="sl-wrap sl-header__in"><a href="/" class="sl-logo" aria-label="ShineCortinas, início"><img src="/logo-shine.avif" alt="ShineCortinas" width="70" height="70" decoding="async"></a><a class="sl-header__cta" data-wa="conversar" href="${WA_MENU}" target="_blank" rel="noopener noreferrer">Orçar no WhatsApp →</a></div></header>
  <nav class="sl-nav-fallback" aria-label="Navegação principal"><a href="/">Início</a>${entries.map(([name,,url])=>`<a href="${url}">${name}</a>`).join('')}${extra.map(([url,name])=>`<a href="${url}">${name}</a>`).join('')}</nav>`;
}

export function auroraMenu() {
  return `<dialog class="pv-curtain-menu" id="pv-curtain-menu" aria-label="Explore a Shine">
  <div class="pv-curtain-scene" aria-hidden="true"><img src="/cortina-sob-medida.avif" alt="" width="637" height="791" loading="lazy" decoding="async"><div></div></div>
  <div class="pv-curtain-content"><header><a href="/" aria-label="Início da Shine"><img src="/logo-shine.avif" alt="ShineCortinas" width="66" height="66" decoding="async"></a><form method="dialog"><button aria-label="Fechar menu">Fechar ×</button></form></header>
  <p class="pv-curtain-eyebrow">Cada escolha abre uma possibilidade</p>
  <nav aria-label="Seções da Shine">${entries.map(([name,desc,url,img],i)=>`<a href="${url}" data-scene="${img}"><span class="pv-curtain-number">0${i+1}</span><span><strong>${name}</strong><small>${desc}</small></span><b aria-hidden="true">↗</b></a>`).join('')}</nav>
  <a class="pv-curtain-wa" data-wa="conversar" href="${WA_MENU}" target="_blank" rel="noopener noreferrer">Falar com um consultor no WhatsApp <span aria-hidden="true">↗</span></a>
  <footer>${extra.map(([url,name])=>`<a href="${url}">${name}</a>`).join('')}</footer><p class="pv-curtain-signature">Sob medida para o seu jeito de viver.</p></div>
  <div class="pv-curtain-wing pv-curtain-wing--left" aria-hidden="true"></div><div class="pv-curtain-wing pv-curtain-wing--right" aria-hidden="true"></div></dialog>
  <button type="button" class="pv-curtain-pull" aria-haspopup="dialog" aria-controls="pv-curtain-menu" aria-expanded="false" aria-label="Explorar a Shine: toque ou puxe para cima"><span class="pv-pull-handle" aria-hidden="true"></span><span>Explore a Shine <b aria-hidden="true">↑</b></span><small>Toque ou puxe</small></button>`;
}

export function auroraHead(head) {
  const clean = head.replace(/\s*<link rel="stylesheet" href="\/assets\/shine-aurora\.css[^"\n]*">/g, '');
  if (clean.includes('/assets/shine-leve.css')) {
    return clean.replace(/(<link rel="stylesheet" href="\/assets\/shine-leve\.css[^"\n]*">)/, `$1\n  ${AURORA_CSS}`);
  }
  if (clean.includes('<script type="application/ld+json">')) {
    return clean.replace('<script type="application/ld+json">', `${AURORA_CSS}\n  <script type="application/ld+json">`);
  }
  return clean.replace('</head>', `  ${AURORA_CSS}\n</head>`);
}
