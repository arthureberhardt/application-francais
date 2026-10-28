import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Secours from "./Secours.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Secours>
      <App />
    </Secours>
  </React.StrictMode>
);

// Le service worker n'est enregistré qu'en production : en développement,
// il garderait en cache des fichiers qu'on est en train de modifier.
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((e) => console.error("Service worker :", e));
    // À la toute première visite, la page a chargé ses fichiers avant que le
    // service worker ne soit actif : on les met en cache nous-mêmes, pour que
    // l'application s'ouvre ensuite même sans réseau. (Même nom que dans sw.js.)
    navigator.serviceWorker.ready.then(() => {
      const urls = performance.getEntriesByType("resource")
        .map((r) => r.name)
        .filter((u) => u.startsWith(location.origin) && /\/assets\//.test(u));
      if (urls.length && "caches" in window) caches.open("fle-v2026-1").then((c) => c.addAll(urls)).catch(() => {});
    });
  });
}
