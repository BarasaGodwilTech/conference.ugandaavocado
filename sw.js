const VERSION = 'v1';
const CACHE_NAME = `uac-cache-${VERSION}`;

const OFFLINE_URL = '/offline.html';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/program.html',
  '/registration.html',
  '/thank-you.html',
  '/404.html',
  OFFLINE_URL,
  '/css/style.css',
  '/css/responsive.css',
  '/css/responsive-additions.css',
  '/js/script.js',
  '/js/data.js',
  '/images/logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
        return Promise.resolve();
      })))
      .then(() => self.clients.claim())
  );
});

function isNavigationRequest(request) {
  return request.mode === 'navigate' || (request.destination === 'document');
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // Offline-first for navigation: try network, fallback to offline page
  if (isNavigationRequest(request)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(request)
      .then((cached) => cached || fetch(request).then((response) => {
        // Only cache successful, basic responses
        if (response && response.status === 200 && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      }))
  );
});
