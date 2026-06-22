// Service worker de DESATIVAÇÃO do PWA antigo (/app).
// Objetivo: limpar o app que ficou instalado/cacheado nos aparelhos e levar
// quem abrir o app de volta para o site. Substitui a versão cache-first anterior.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // 1) Apaga todos os caches deste origin (só o /app usava cache).
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    } catch (e) {}
    // 2) Remove o próprio service worker.
    try { await self.registration.unregister(); } catch (e) {}
    // 3) Manda as janelas abertas do app para o site.
    try {
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((c) => c.navigate('/'));
    } catch (e) {}
  })());
});

// Sem cache: tudo vai direto para a rede (o /app está sendo aposentado).
self.addEventListener('fetch', () => {});
