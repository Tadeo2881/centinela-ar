// Service worker mínimo: solo existe para que el navegador considere el sitio
// "instalable" como app. No cachea nada — el juego necesita red para GPS/multijugador.
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { self.clients.claim(); });
self.addEventListener('fetch', (e) => { /* passthrough, sin caché */ });
