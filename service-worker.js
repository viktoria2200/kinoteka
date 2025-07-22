const CACHE_NAME = 'kinoteka-cache-v1';
const urlsToCache = [
  '/kinoteka/',
  '/kinoteka/index.html',
  '/kinoteka/film.html',
  '/kinoteka/serial.html',
  '/kinoteka/stil.css',
  '/kinoteka/icons/icon-192x192.png',
  '/kinoteka/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
