const CACHE_NAME = 'kinoteka-cache-v4';
const urlsToCache = [
  '/kinoteka/',
  '/kinoteka/index.html',
  '/kinoteka/film.html',
  '/kinoteka/serial.html',
  '/kinoteka/stil.css',
  '/kinoteka/manifest.json',
  '/kinoteka/icons/icon-192x192.png',
  '/kinoteka/icons/icon-512x512.png',
  'https://aif-s3.aif.ru/images/025/364/a9a0f1974d40b12e43789b6327ba148d.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
