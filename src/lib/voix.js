/* Lecture à voix haute.

   Le navigateur sait lire du texte en français : aucun service externe, aucun
   fichier à produire, aucun coût. La qualité dépend de l'appareil — elle est
   excellente sur macOS et iOS, correcte sur Android, variable sur Windows.

   Si le navigateur ne sait pas le faire, tout ce qui touche au son disparaît
   de l'interface plutôt que de proposer un bouton qui ne marche pas. */

const API = typeof window !== "undefined" && window.speechSynthesis;

let voixFr = null;
let pretes = false;

function chercherVoix() {
  if (!API) return null;
  const toutes = API.getVoices();
  if (!toutes.length) return null;
  pretes = true;
  // on préfère une voix suisse romande, puis française, puis n'importe quelle
  // voix française disponible
  voixFr =
    toutes.find((v) => v.lang === "fr-CH") ||
    toutes.find((v) => v.lang === "fr-FR" && /Amélie|Thomas|Audrey|Aurélie/i.test(v.name)) ||
    toutes.find((v) => v.lang === "fr-FR") ||
    toutes.find((v) => v.lang && v.lang.startsWith("fr")) ||
    null;
  return voixFr;
}

if (API) {
  chercherVoix();
  API.onvoiceschanged = chercherVoix;
}

/** Le son est-il utilisable sur cet appareil ? */
export function sonDisponible() {
  if (!API) return false;
  if (!pretes) chercherVoix();
  return Boolean(voixFr) || API.getVoices().length > 0;
}

/**
 * @param {string} texte
 * @param {number} vitesse  1 = normal, 0.75 pour une seconde écoute plus lente
 */
export function lire(texte, vitesse = 1) {
  if (!API || !texte) return;
  API.cancel();
  const u = new SpeechSynthesisUtterance(texte);
  if (!voixFr) chercherVoix();
  if (voixFr) u.voice = voixFr;
  u.lang = voixFr ? voixFr.lang : "fr-FR";
  u.rate = vitesse;
  u.pitch = 1;
  API.speak(u);
}

export function taire() {
  if (API) API.cancel();
}

/* Pour la dictée, on retire l'article : « la fenêtre » se dicte « fenêtre »,
   sinon l'article donne le genre et l'exercice perd la moitié de son intérêt.
   On garde en revanche les locutions entières. */
export function texteADicter(fr) {
  const seul = fr.split(",")[0].trim();
  return seul.replace(/^(le |la |les |l'|un |une |des )/, "");
}
