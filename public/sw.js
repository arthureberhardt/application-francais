/* Service worker : rend l'application installable et lui permet de
   s'ouvrir même sans réseau (dans le train, sans Wi-Fi).

   — Les pages : réseau d'abord, copie en cache si le réseau manque.
   — Les fichiers de l'application (/assets/…, icônes) : cache d'abord ; leur
     nom change à chaque nouvelle version, il n'y a donc jamais de vieux
     fichier servi par erreur.
   — Supabase et tout autre domaine : jamais touchés. La progression passe
     toujours directement par le réseau.                                    */

const CACHE = "fle-v2026-2";
const BASE = ["/", "/index.html", "/manifest.webmanifest", "/icone-192.png", "/icone-512.png", "/apple-touch-icon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(BASE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((cles) => Promise.all(cles.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((r) => { const copie = r.clone(); caches.open(CACHE).then((c) => c.put("/index.html", copie)); return r; })
        .catch(() => caches.match("/index.html"))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then((trouve) => trouve || fetch(req).then((r) => {
      if (r.ok && (url.pathname.startsWith("/assets/") || /\.(png|svg|webmanifest|woff2?)$/.test(url.pathname))) {
        const copie = r.clone();
        caches.open(CACHE).then((c) => c.put(req, copie));
      }
      return r;
    }))
  );
});
