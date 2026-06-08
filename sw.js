self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("yao-travel-v16-firebase").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./style.css",
        "./app.js",
        "./firebase.js",
        "./manifest.json"
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== "yao-travel-v16-firebase")
          .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const responseClone = response.clone();
        caches.open("yao-travel-v16-firebase").then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
