const CACHE = "merchich-map-v2";
const APP = ["./", "./index.html", "./manifest.webmanifest", "./icon.svg"];
// Bibliothèques mises en cache pour que le calcul de gisement fonctionne hors ligne sur le terrain.
const LIBS = [
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
  "https://cdn.jsdelivr.net/npm/proj4@2.11.0/dist/proj4.js"
];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(async cache => {
    await cache.addAll(APP);
    await Promise.all(LIBS.map(u => cache.add(new Request(u, { mode: "cors" })).catch(() => {})));
  }).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const isApp = url.origin === self.location.origin;
  const isLib = url.hostname === "unpkg.com" || url.hostname === "cdn.jsdelivr.net";
  const isTile = url.hostname.includes("tile.openstreetmap.org") || url.hostname.includes("arcgisonline.com");
  if (isApp) {
    // Réseau d'abord pour l'application (mises à jour visibles), cache en secours hors ligne.
    event.respondWith(fetch(req).then(response => {
      if (response.ok) { const copy = response.clone(); caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {}); }
      return response;
    }).catch(() => caches.match(req).then(c => c || caches.match("./index.html"))));
  } else if (isLib || isTile) {
    // Cache d'abord pour les bibliothèques versionnées et les tuiles déjà consultées.
    event.respondWith(caches.match(req).then(cached => cached || fetch(req).then(response => {
      if (response.ok || response.type === "opaque") { const copy = response.clone(); caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {}); }
      return response;
    })));
  }
});
