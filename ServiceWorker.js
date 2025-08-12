const cacheName = "DefaultCompany-Quantum-Sports-Arena-Brawler-0.1.0";
const contentToCache = [
    "Build/c02dffa8d27e5f0f2153d3e4d1171cc8.loader.js",
    "Build/56374c057e759b41f6d4a7f8349cfbff.framework.js",
    "Build/b776584a3c1c44b0ed917d2a44d045c3.data",
    "Build/a7d71f3cdd5a4bdbc4dc4bf519a5cf74.wasm",
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
