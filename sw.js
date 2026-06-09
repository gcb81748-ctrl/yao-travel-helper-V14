const CACHE_NAME = "yao-travel-v25-password-gate-20260609";

const APP_FILES = [
  "./",
  "./index.html",
  "./style.css?v=25",
  "./app.js?v=25",
  "./firebase.js?v=25",
  "./manifest.json"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const requestUrl = new URL(event.request.url);

  // Firebase and Google CDN should always use network.
  if (
    requestUrl.hostname.includes("firebase") ||
    requestUrl.hostname.includes("googleapis") ||
    requestUrl.hostname.includes("gstatic")
  ) {
    event.respondWith(fetch(event.request));
    return;
  }

  // For core app files, try network first to avoid old JS/CSS on iPhone.
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          if (event.request.method === "GET") {
            cache.put(event.request, responseClone);
          }
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
