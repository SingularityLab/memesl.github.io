const cacheName = "DefaultCompany-Quantum-Sports-Arena-Brawler-0.1.6";
const contentToCache = [
    "Build/9a4501d4b6a9483d7e47a84404cdba7e.loader.js",
    "Build/7be99cb715c5b310a7a96a4a6c5c59b0.framework.js",
    "Build/6344d134e9ea19cb33796fbc7be1e163.data",
    "Build/a6ff49101feb6ba5e272f24abee823cd.wasm",
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
