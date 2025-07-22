const CACHE_NAME = 'kinoteka-cache-v1';
const urlsToCache = [
  '/',
  '/main.html',
  '/film.html',
  '/serial.html',
  '/stil.css',
  'https://aif-s3.aif.ru/images/025/364/a9a0f1974d40b12e43789b6327ba148d.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});