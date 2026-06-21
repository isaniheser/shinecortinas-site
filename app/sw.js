const CACHE = 'shine-app-v6';
const PRECACHE = [
  '/app/',
  '/app/index.html',
  '/logo-shine.avif',
  '/hero-sala.avif',
  '/automacao.avif',
  '/madeira.avif',
  '/blackout.avif',
  '/blackouts-tecnicos.avif',
  '/linha-puro.avif',
  '/cortina-sob-medida.avif',
  '/duplo.avif',
  '/persiana-motorizada.avif',
  '/selo-google.avif',
  '/selo-facebook.avif',
  '/resende-projeto-1.avif',
  '/resende-projeto-2.avif',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // A galeria do Instagram sempre busca da rede (dados frescos), nunca do cache.
  if (new URL(e.request.url).pathname.startsWith('/api/')) return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      });
    })
  );
});
