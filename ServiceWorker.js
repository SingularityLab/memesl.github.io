const cacheName = "DefaultCompany-Quantum-Sports-Arena-Brawler-0.1.1";
const contentToCache = [
    "Build/b4d024336e88d2ba052ff1e441d9f1cd.loader.js",
    "Build/7be99cb715c5b310a7a96a4a6c5c59b0.framework.js",
    "Build/e91a06e8c0b493cfd29e5966e7398e82.data",
    "Build/9817b7109bf89dbf166fa20a9016497c.wasm",
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
