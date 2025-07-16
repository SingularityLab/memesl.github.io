const cacheName = "DefaultCompany-Quantum-Sports-Arena-Brawler-0.1.0";
const contentToCache = [
    "Build/e580f129e6820f9e99a5da3d927384ba.loader.js",
    "Build/fa57abfdab4242eea7c9324e17a3c2dd.framework.js",
    "Build/997062b043608e8f02270273476f3807.data",
    "Build/ce913de0a479fd3a55aede07916c337e.wasm",
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
