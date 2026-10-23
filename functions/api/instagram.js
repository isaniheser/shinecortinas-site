// Cloudflare Pages Function — Sincronizador Inteligente @shinecortinas -> Mosaico Bento do Site
// Filtra por #acervoshine / #nosite (ou #shinecortinas com bloqueio anti-feriado)
// e organiza automaticamente em Grupos e Subgrupos com herança transversal.
// Inclui sanitização completa de copywriting (CLAUDE.md) e fallback resiliente.

const BLOCKED_KEYWORDS = [
  'feriado',
  'recesso',
  'feliz natal',
  'boas festas',
  'feliz ano novo',
  'dia das mães',
  'dia das maes',
  'dia dos pais',
  'dia da mulher',
  'dia do cliente',
  'horário de funcionamento',
  'horario de funcionamento',
  'estaremos fechados',
  'comunicado',
  'vaga de emprego',
  'estamos contratando',
  'reflexãododia',
  'reflexaododia',
  'mindset',
  'desenvolvimentopessoal',
];

const CITY_MAP = [
  { match: ['volta redonda', 'voltaredonda', 'unimed vr'], label: 'Volta Redonda' },
  { match: ['resende'], label: 'Resende' },
  { match: ['vassouras'], label: 'Vassouras' },
  { match: ['barra mansa', 'barramansa'], label: 'Barra Mansa' },
  { match: ['barra do piraí', 'barra do pirai', 'barradopirai'], label: 'Barra do Piraí' },
  { match: ['porto real', 'portoreal'], label: 'Porto Real' },
  { match: ['itatiaia', 'penedo'], label: 'Penedo · Itatiaia' },
  { match: ['visconde de mauá', 'visconde de maua', 'viscondedemaua', 'mauá', 'maua'], label: 'Visconde de Mauá' },
  { match: ['maromba'], label: 'Maromba' },
  { match: ['valença', 'valenca'], label: 'Valença' },
  { match: ['miguel pereira', 'miguelpereira'], label: 'Miguel Pereira' },
  { match: ['mangaratiba'], label: 'Mangaratiba' },
  { match: ['angra', 'angradosreis'], label: 'Angra dos Reis' },
  { match: ['piraí', 'pirai'], label: 'Piraí' },
  { match: ['pinheiral'], label: 'Pinheiral' },
  { match: ['paulo de frontin', 'paulodefrontin'], label: 'Eng. Paulo de Frontin' },
];

export function sanitizeBrandText(raw = '') {
  const cleanedLines = String(raw)
    .replace(/\u2800+/g, '')
    .split('\n')
    .map((line) => line.replace(/#[A-Za-z0-9_À-ÿ]+/g, '').trim())
    .filter((line) => {
      if (!line) return false;
      const lower = line.toLowerCase();
      if (
        lower.includes('clique no link da bio') ||
        lower.includes('link da bio') ||
        lower.includes('comenta aqui') ||
        lower.includes('salve esse post') ||
        lower.includes('volta redonda - barra mansa') ||
        lower.includes('volta redonda, barra mansa') ||
        lower.startsWith('📍')
      ) {
        return false;
      }
      // Remove linhas finais compostas apenas por tags CamelCase sem '#' (ex: CortinaDeTecido PeDireitoAlto)
      const tokens = line.split(/\s+/).filter(Boolean);
      const camelCount = tokens.filter((t) => /^[A-ZÀ-Ý][a-zà-ÿ]+[A-ZÀ-Ý][A-Za-z0-9À-ÿ]*$/.test(t)).length;
      if (tokens.length >= 2 && camelCount / tokens.length >= 0.5) {
        return false;
      }
      return true;
    });

  return cleanedLines
    .join(' ')
    .replace(/\b([A-ZÀ-Ý][a-zà-ÿ]+[A-ZÀ-Ý][A-Za-z0-9À-ÿ]*\s*){2,}/g, ' ')
    .replace(/[—–]/g, ', ')
    .replace(/;/g, '.')
    .replace(/hotel de luxo/gi, 'hotel cinco estrelas')
    .replace(/quartos?\s+vip/gi, 'suítes sob medida')
    .replace(/\bvip\b/gi, 'exclusivo')
    .replace(/cabe no (seu )?bolso/gi, 'tem excelente custo-benefício')
    .replace(/pagando caro/gi, 'investindo sem orientação técnica')
    .replace(/capa de revista/gi, 'arquitetura residencial')
    .replace(/não é luxo/gi, 'não é supérfluo')
    .replace(/\bluxo\b/gi, 'alto padrão')
    .replace(/\bluxuos[oa]s?\b/gi, 'sofisticad$1')
    .replace(/\bpremium\b/gi, 'sob medida')
    .replace(/\bQuietLuxury\b/gi, '')
    .replace(/\bluxury\b/gi, 'alto padrão')
    .replace(/\btotal\b/gi, 'completo')
    .replace(/\b16 anos\b/gi, '17 anos')
    .replace(/instala(mos)? em um dia/gi, 'instala com hora marcada')
    .replace(/\s+,/g, ',')
    .replace(/,\s*,+/g, ', ')
    .replace(/\.\s*\.+/g, '.')
    .replace(/\s+/g, ' ')
    .replace(/^[.,\s…]+/, '')
    .trim();
}

export function extractMetadataFromCaption(caption = '') {
  const lower = caption.toLowerCase();

  // Remove rodapé genérico de lista de cidades ("Volta Redonda, Barra Mansa, Resende...") para detectar apenas a cidade real da obra
  const bodyWithoutFooter = lower
    .split('\n')
    .filter(
      (line) =>
        !line.includes('volta redonda, barra mansa') &&
        !line.includes('volta redonda - barra mansa') &&
        !line.includes('barra mansa, volta redonda') &&
        !line.startsWith('📍')
    )
    .join(' ');

  // 1. Detecta a cidade na legenda ou na hashtag única da obra (padrão: Sul Fluminense)
  let city = 'Sul Fluminense';
  for (const c of CITY_MAP) {
    if (c.match.some((m) => bodyWithoutFooter.includes(m))) {
      city = c.label;
      break;
    }
  }

  // 2. Detecta Grupos e Subgrupos com Herança Inteligente (ex: Madeira/Alumínio -> Horizontal -> Persiana)
  const catSet = new Set(['insta']);

  // FAMÍLIA 1: Cortinas de Tecido (Wave, Prega Fêmea, Prega Macho, Franzida)
  if (lower.includes('#cortinawave') || lower.includes('cortina wave') || lower.includes('modelo wave') || lower.includes('ondas')) {
    catSet.add('tecido');
    catSet.add('wave');
  }
  if (lower.includes('#pregafemea') || lower.includes('#cortinapregafemea') || lower.includes('prega fêmea') || lower.includes('prega femea')) {
    catSet.add('tecido');
    catSet.add('pregafemea');
  }
  if (lower.includes('#pregamacho') || lower.includes('#cortinapregamacho') || lower.includes('prega macho')) {
    catSet.add('tecido');
    catSet.add('pregamacho');
  }
  if (lower.includes('#cortinafranzida') || lower.includes('cortina franzida') || lower.includes('franzida')) {
    catSet.add('tecido');
    catSet.add('franzida');
  }
  if (
    lower.includes('#cortinadetecido') ||
    lower.includes('linho') ||
    lower.includes('gaze') ||
    lower.includes('170g') ||
    lower.includes('bainha')
  ) {
    catSet.add('tecido');
    if (!catSet.has('pregafemea') && !catSet.has('pregamacho') && !catSet.has('franzida')) {
      catSet.add('wave');
    }
  }

  // FAMÍLIA 2: Cortinas Estruturadas (Rolô, Romana, Double Vision, Painel)
  if (
    lower.includes('#cortinarolo') ||
    lower.includes('#persianarolo') ||
    lower.includes('#roloscreen') ||
    lower.includes('#telasolar') ||
    lower.includes('rolô') ||
    lower.includes('tela solar') ||
    lower.includes('screen')
  ) {
    catSet.add('estruturada');
    catSet.add('rolo');
  }
  if (lower.includes('#cortinaromana') || lower.includes('#persianaromana') || lower.includes('romana')) {
    catSet.add('estruturada');
    catSet.add('romana');
  }
  if (
    lower.includes('#doublevision') ||
    lower.includes('#cortinadoublevision') ||
    lower.includes('#persianadoublevision') ||
    lower.includes('double vision')
  ) {
    catSet.add('estruturada');
    catSet.add('doublevision');
  }
  if (lower.includes('#cortinapainel') || lower.includes('#persianapainel') || lower.includes('cortina painel')) {
    catSet.add('estruturada');
    catSet.add('painel');
  }

  // FAMÍLIA 3: Persianas (Vertical, Horizontal -> Madeira e Alumínio herdam Horizontal automaticamente)
  if (lower.includes('#persianavertical') || lower.includes('persiana vertical')) {
    catSet.add('persiana');
    catSet.add('vertical');
  }
  if (lower.includes('#persianahorizontal') || lower.includes('persiana horizontal')) {
    catSet.add('persiana');
    catSet.add('horizontal');
  }
  if (lower.includes('#persianademadeira') || lower.includes('persiana de madeira') || lower.includes('madeira 50')) {
    catSet.add('persiana');
    catSet.add('horizontal');
    catSet.add('madeira');
  }
  if (
    lower.includes('#persianadealuminio') ||
    lower.includes('persiana de alumínio') ||
    lower.includes('persiana de aluminio')
  ) {
    catSet.add('persiana');
    catSet.add('horizontal');
    catSet.add('aluminio');
  }

  // GRUPOS TRANSVERSAIS: Pé-Direito Duplo, Motorizada, Blackout 100%, Lavagem
  if (
    lower.includes('#pedireitoduplo') ||
    lower.includes('#pedireitoalto') ||
    lower.includes('pé-direito') ||
    lower.includes('pe-direito') ||
    lower.includes('duplo')
  ) {
    catSet.add('pedireitoduplo');
  }
  if (
    lower.includes('#cortinamotorizada') ||
    lower.includes('#persianamotorizada') ||
    lower.includes('motorizada') ||
    lower.includes('automação') ||
    lower.includes('automacao')
  ) {
    catSet.add('motorizada');
  }
  if (lower.includes('#cortinablackout') || lower.includes('blackout')) {
    catSet.add('blackout');
  }
  if (lower.includes('#lavagemdecortinas') || lower.includes('lavagem')) {
    catSet.add('lavagem');
  }

  // Se nenhum subgrupo específico foi citado no post, classifica em tecido/wave por padrão
  if (catSet.size === 1) {
    catSet.add('tecido');
    catSet.add('wave');
  }

  const cats = Array.from(catSet);

  // 3. Sanitiza o texto da legenda conforme regras estritas do CLAUDE.md
  const cleanText = sanitizeBrandText(caption);
  const firstSentence = (cleanText.split(/[.!?\n]/)[0] || 'Obra Real ShineCortinas').trim();
  const title = firstSentence.length > 44 ? firstSentence.slice(0, 42).trim() + '…' : firstSentence;

  const isPinned =
    lower.includes('#acervoshine') ||
    lower.includes('#nosite') ||
    lower.includes('#acervo') ||
    lower.includes('#site');

  return {
    city,
    cats,
    title,
    cleanCaption: cleanText || 'Obra sob medida instalada pela ShineCortinas no Sul Fluminense.',
    isPinned,
  };
}

export function isApprovedWorkPost(caption = '') {
  const lower = caption.toLowerCase();
  if (
    lower.includes('#acervoshine') ||
    lower.includes('#nosite') ||
    lower.includes('#acervo') ||
    lower.includes('#site') ||
    lower.includes('#obrasrealizadas')
  ) {
    return true;
  }
  if (BLOCKED_KEYWORDS.some((kw) => lower.includes(kw))) {
    return false;
  }
  return lower.includes('#shinecortinas') || /\bshinecortinas\b/.test(lower.split('\n').slice(-3).join(' '));
}

async function serveFallbackFeed(request, env) {
  try {
    if (env && env.ASSETS) {
      const fallbackUrl = new URL('/instagram-feed.json', request.url);
      const fallbackRes = await env.ASSETS.fetch(fallbackUrl);
      if (fallbackRes && fallbackRes.ok) {
        return new Response(fallbackRes.body, {
          status: 200,
          headers: {
            'content-type': 'application/json',
            'cache-control': 'public, max-age=300',
            'x-shine-fallback': 'static-json',
          },
        });
      }
    }
  } catch (_) {}
  return new Response(JSON.stringify({ count: 0, items: [], fallback: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}

export async function onRequest(context) {
  const { request, env } = context;
  const token = env.IG_TOKEN;

  if (!token) {
    return serveFallbackFeed(request, env);
  }

  const cache = caches.default;
  const cacheKey = new Request('https://shine.cache/instagram-feed-v4-brand-clean');
  let cached = await cache.match(cacheKey);
  if (cached) return cached;

  const fields =
    'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,children{media_type,media_url,thumbnail_url}';
  const isFacebookGraphToken = token.startsWith('EAA');
  const url = isFacebookGraphToken
    ? `https://graph.facebook.com/v20.0/17841402778658958/media?fields=${fields}&limit=30&access_token=${token}`
    : `https://graph.instagram.com/me/media?fields=${fields}&limit=30&access_token=${token}`;

  const cover = (n) => (n.media_type === 'VIDEO' ? n.thumbnail_url : n.media_url) || null;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4500);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    const data = await res.json();

    if (data.error) {
      return serveFallbackFeed(request, env);
    }

    const rawItems = (data.data || []).filter((m) => isApprovedWorkPost(m.caption || ''));

    const items = rawItems.map((m) => {
      const children =
        m.media_type === 'CAROUSEL_ALBUM' && m.children && m.children.data
          ? m.children.data.map((c) => ({
              type: c.media_type,
              image: cover(c),
              video: c.media_type === 'VIDEO' ? c.media_url || null : null,
            }))
          : [];

      const meta = extractMetadataFromCaption(m.caption || '');

      return {
        id: m.id,
        cleanCaption: meta.cleanCaption,
        title: meta.title,
        city: meta.city,
        cats: meta.cats,
        isPinned: meta.isPinned,
        type: m.media_type,
        image: cover(m) || (children[0] && children[0].image) || null,
        video: m.media_type === 'VIDEO' ? m.media_url || null : null,
        permalink: m.permalink,
        timestamp: m.timestamp,
        children,
      };
    });

    items.sort((a, b) => Number(b.isPinned) - Number(a.isPinned));

    const body = JSON.stringify({
      hashtagRule: '#acervoshine / #nosite + grupos com herança inteligente',
      count: items.length,
      items,
    });
    const response = new Response(body, {
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
        'access-control-allow-origin': 'https://www.shinecortinas.com',
      },
    });

    context.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch (_) {
    clearTimeout(timeoutId);
    return serveFallbackFeed(request, env);
  }
}
