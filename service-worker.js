// Service worker de CENTINELA.
//
// Su ÚNICO propósito es cumplir el requisito de instalabilidad de los navegadores
// (una PWA necesita un service worker con manejador de 'fetch' para que aparezca
// la opción "Instalar app").
//
// Deliberadamente NO cachea nada: una versión anterior nos dejó atrapados en una
// build vieja del juego. Aquí todo va siempre a la red, así el jugador siempre
// recibe la última versión publicada.

self.addEventListener('install', () => {
  self.skipWaiting();               // activar de inmediato
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Borrar cualquier caché dejado por versiones anteriores.
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  // Siempre a la red; sin copias locales que puedan quedar obsoletas.
  event.respondWith(fetch(event.request).catch(() => Response.error()));
});
