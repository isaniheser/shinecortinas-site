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
  const cacheKey = new Request('https://shine.cache/instagram-feed');
  let cached = await cache.match(cacheKey);
  if (cached) return cached;

  const fields = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp';
  const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=24&access_token=${token}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      return new Response(JSON.stringify(data), {
        status: 502,
        headers: { 'content-type': 'application/json' },
      });
    }

    // Mantém só o essencial e usa thumbnail para vídeos (capa do reel)
    const items = (data.data || []).map((m) => ({
      id: m.id,
      caption: m.caption || '',
      type: m.media_type,
      image: m.media_type === 'VIDEO' ? m.thumbnail_url : m.media_url,
      permalink: m.permalink,
      timestamp: m.timestamp,
    }));

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
