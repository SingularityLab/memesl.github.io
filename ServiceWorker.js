const cacheName = "DefaultCompany-Quantum-Sports-Arena-Brawler-0.1.0";
const contentToCache = [
    "Build/5b38133561fc4365bcea13022f79e19b.loader.js",
    "Build/56374c057e759b41f6d4a7f8349cfbff.framework.js",
    "Build/472a1e8937078f0bd591e08f526b69c7.data",
    "Build/fca3e58e66804fbe325afebbcb7e5dc4.wasm",
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
