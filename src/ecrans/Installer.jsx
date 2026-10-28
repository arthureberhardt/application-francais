import React, { useEffect, useState } from "react";

/* Installer l'application : une icône sur le téléphone ou l'ordinateur.

   Chrome, Edge et Android proposent une vraie boîte d'installation, qu'on
   déclenche avec l'événement « beforeinstallprompt ». Safari (iPhone, iPad,
   Mac) ne le fait jamais : il faut passer par le menu Partager. On détecte
   donc l'appareil et on montre la bonne marche à suivre. */

let invite = null;
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); invite = e; });
}

export const estInstallee = () =>
  typeof window !== "undefined" &&
  (window.matchMedia?.("(display-mode: standalone)").matches || window.navigator.standalone === true);

function appareil() {
  const ua = navigator.userAgent || "";
  const ios = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (ios) return "ios";
  if (/Android/.test(ua)) return "android";
  if (/Macintosh/.test(ua) && /Safari/.test(ua) && !/Chrome|Edg/.test(ua)) return "macsafari";
  return "ordinateur";
}

export default function Installer({ onFin }) {
  const [type] = useState(appareil);
  const [possible, setPossible] = useState(Boolean(invite));
  const [fait, setFait] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setPossible(Boolean(invite)), 600);
    return () => clearInterval(t);
  }, []);

  const installer = async () => {
    if (!invite) return;
    invite.prompt();
    const r = await invite.userChoice;
    if (r.outcome === "accepted") setFait(true);
    invite = null;
    setPossible(false);
  };

  return (
    <>
      <div className="bar">
        <div className="wrap barIn">
          <button className="lien" onClick={onFin}>← Retour</button>
          <span />
        </div>
      </div>
      <div className="main wrap" style={{ maxWidth: 560 }}>
        <h1 className="uniteTitre" style={{ fontSize: 28 }}>Une icône sur votre écran</h1>
        <p className="uniteSous">
          L'application s'ouvre alors comme une vraie app, en plein écran, sans passer par le navigateur.
          Rien à télécharger dans un store.
        </p>

        {estInstallee() || fait ? (
          <div className="envoye">C'est fait : l'application est installée sur cet appareil.</div>
        ) : possible ? (
          <button className="btn" onClick={installer}>Installer l'application</button>
        ) : type === "ios" ? (
          <ol className="pas">
            <li>Ouvrez cette page dans <strong>Safari</strong>.</li>
            <li>Touchez le bouton <strong>Partager</strong> (le carré avec une flèche vers le haut), en bas ou en haut de l'écran.</li>
            <li>Faites défiler et choisissez <strong>Sur l'écran d'accueil</strong>.</li>
            <li>Touchez <strong>Ajouter</strong>. L'icône apparaît sur votre écran d'accueil.</li>
          </ol>
        ) : type === "android" ? (
          <ol className="pas">
            <li>Ouvrez cette page dans <strong>Chrome</strong>.</li>
            <li>Touchez le menu <strong>⋮</strong> en haut à droite.</li>
            <li>Choisissez <strong>Installer l'application</strong> ou <strong>Ajouter à l'écran d'accueil</strong>.</li>
          </ol>
        ) : type === "macsafari" ? (
          <ol className="pas">
            <li>Dans Safari, ouvrez le menu <strong>Fichier</strong>.</li>
            <li>Choisissez <strong>Ajouter au Dock</strong>.</li>
          </ol>
        ) : (
          <ol className="pas">
            <li>Ouvrez cette page dans <strong>Chrome</strong> ou <strong>Edge</strong>.</li>
            <li>Cliquez sur l'icône d'installation à droite de la barre d'adresse (un écran avec une flèche).</li>
            <li>Ou ouvrez le menu <strong>⋮</strong> puis <strong>Installer « Français »</strong>.</li>
          </ol>
        )}

        <p className="note" style={{ marginTop: 22, fontSize: 12.5 }}>
          Votre code reste le même : vos résultats vous suivent entre l'application installée, le navigateur
          et vos autres appareils.
        </p>
      </div>
    </>
  );
}
