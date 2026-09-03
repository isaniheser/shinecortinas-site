// Palpite de cidade pelo IP (Cloudflare fornece request.cf.city). Sem cookies, sem
// armazenamento, sem identificar ninguém: devolve só o slug de uma das 15 cidades
// atendidas, ou nulo. O navegador usa isso apenas como sugestão inicial.
const MAP = {
  'volta redonda': 'volta-redonda', 'barra mansa': 'barra-mansa', 'resende': 'resende', 'porto real': 'porto-real',
  'itatiaia': 'itatiaia', 'penedo': 'penedo', 'visconde de maua': 'visconde-de-maua', 'maromba': 'maromba',
  'pinheiral': 'pinheiral', 'pirai': 'pirai', 'barra do pirai': 'barra-do-pirai', 'valenca': 'valenca',
  'vassouras': 'vassouras', 'engenheiro paulo de frontin': 'paulo-de-frontin', 'paulo de frontin': 'paulo-de-frontin',
  'miguel pereira': 'miguel-pereira',
};
const norm = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

export async function onRequestGet({ request }) {
  const cf = request.cf || {};
  const slug = cf.country === 'BR' ? (MAP[norm(cf.city)] || null) : null;
  return new Response(JSON.stringify({ slug }), {
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}
