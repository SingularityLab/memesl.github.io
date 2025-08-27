const cacheName = "DefaultCompany-Quantum-Sports-Arena-Brawler-0.1.2";
const contentToCache = [
    "Build/f9d95a9bbb45bb62df9d35dbb68a8296.loader.js",
    "Build/7be99cb715c5b310a7a96a4a6c5c59b0.framework.js",
    "Build/db71cfc2f1fb5b3b36cacaecae0d67f7.data",
    "Build/15feb4504c77229e3104701b2bc345e5.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
