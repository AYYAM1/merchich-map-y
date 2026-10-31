const CACHE = "merchich-map-v1";
const APP = ["./", "./index.html", "./manifest.webmanifest", "./icon.svg"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Cache the app shell and third-party map tiles as they are viewed.
  if (url.origin === self.location.origin || url.hostname.includes("tile.openstreetmap.org") || url.hostname.includes("arcgisonline.com")) {
    event.respondWith(caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(response => {
        const copy = response.clone();
        if (response.ok || response.type === "opaque") caches.open(CACHE).then(cache => cache.put(req, copy)).catch(()=>{});
        return response;
      }).catch(() => cached || caches.match("./index.html"));
    }));
  }
});
