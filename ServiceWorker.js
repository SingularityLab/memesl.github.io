const cacheName = "DefaultCompany-Quantum-Sports-Arena-Brawler-0.1.0";
const contentToCache = [
    "Build/da69fdada7df6d7ae3200bb050479f96.loader.js",
    "Build/add09181dcaec87c8330b2ea2d613b1f.framework.js.br",
    "Build/67dc887e1b7bfadaaaacf27302eb34f4.data.br",
    "Build/358c8d50eb20c94306f3f87d60fc4c65.wasm.br",
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
