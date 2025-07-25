const cacheName = "DefaultCompany-Quantum-Sports-Arena-Brawler-0.1.0";
const contentToCache = [
    "Build/dca7af23da618304201cceba496e53bb.loader.js",
    "Build/add09181dcaec87c8330b2ea2d613b1f.framework.js.br",
    "Build/c8040ea84123cb177767432e639fd0b1.data.br",
    "Build/01539cb0f0189de68fef5afc16db8147.wasm.br",
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
