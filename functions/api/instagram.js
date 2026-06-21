// Cloudflare Pages Function — feed do Instagram da Shine
// O token fica guardado como variável de ambiente (IG_TOKEN) no painel da Cloudflare,
// nunca exposto no código do site. Resposta cacheada por 1h na borda da Cloudflare.

export async function onRequest(context) {
  const { env } = context;
  const token = env.IG_TOKEN;

  if (!token) {
    return new Response(JSON.stringify({ error: 'IG_TOKEN não configurado' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }

  const cache = caches.default;
  // v2: novo formato inclui vídeo e filhos de carrossel — chave nova para não servir cache antigo
  const cacheKey = new Request('https://shine.cache/instagram-feed-v2');
  let cached = await cache.match(cacheKey);
  if (cached) return cached;

  // Pede também os "children" (itens de carrossel) com seus próprios media_url/thumbnail
  const fields =
    'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,children{media_type,media_url,thumbnail_url}';
  const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=24&access_token=${token}`;

  // Capa/imagem de um nó (item ou filho): vídeo usa thumbnail, foto usa media_url
  const cover = (n) => (n.media_type === 'VIDEO' ? n.thumbnail_url : n.media_url) || null;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      return new Response(JSON.stringify(data), {
        status: 502,
        headers: { 'content-type': 'application/json' },
      });
    }

    const items = (data.data || []).map((m) => {
      // Filhos do carrossel (cada um pode ser foto ou vídeo)
      const children =
        m.media_type === 'CAROUSEL_ALBUM' && m.children && m.children.data
          ? m.children.data.map((c) => ({
              type: c.media_type,
              image: cover(c),
              video: c.media_type === 'VIDEO' ? c.media_url || null : null,
            }))
          : [];

      return {
        id: m.id,
        caption: m.caption || '',
        type: m.media_type,
        // imagem usada na grade (capa). Carrossel: capa = media_url ou 1ª foto do álbum
        image: cover(m) || (children[0] && children[0].image) || null,
        // url do vídeo (mp4) quando o post é um vídeo/reel
        video: m.media_type === 'VIDEO' ? m.media_url || null : null,
        permalink: m.permalink,
        timestamp: m.timestamp,
        children,
      };
    });

    const body = JSON.stringify({ items });
    const response = new Response(body, {
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=3600',
        'access-control-allow-origin': '*',
      },
    });

    context.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
