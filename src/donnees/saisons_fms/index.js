/* Le registre des semestres FMS rédigés. Même format que les saisons du
   gymnase (voir ../saisons/index.js) ; les identifiants commencent par F :
   unités F1-U1, stations F1-L1, points GF1-…, exercices f1…, tournures TF…,
   phrases PF…, textes XF…, évaluations F1-EV-…, fiches nouvelles F1-0…    */



import f1 from "./f1.js";
import f2 from "./f2.js";
import f3 from "./f3.js";
import f4 from "./f4.js";
import f5 from "./f5.js";
import f6 from "./f6.js";

import DIX from "./dix.js";
import { nommer } from "../noms_stations.js";

const SEMESTRES = { 1: f1, 2: f2, 3: f3, 4: f4, 5: f5, 6: f6 };

/* Les compléments (dix.js) s'ajoutent à chaque unité ou station, avec des
   identifiants dérivés : <station>-T9, -P3, -M1… */
function completer(s) {
  const tournures = [...s.tournures], phrases = [...s.phrases], motsAjouts = [...(s.motsAjouts || [])];
  const ajouter = (u) => {
    const a = DIX[u.id];
    if (!a) return u;
    (a.tournures || []).forEach((t, i) => tournures.push({ ...t, id: `${u.id}-T${i + 1}`, unite: u.id }));
    (a.phrases || []).forEach((p, i) => phrases.push({ ...p, id: `${u.id}-P${i + 1}`, unite: u.id }));
    const mots = (a.mots || []).map((m, i) => {
      const fiche = { id: `${u.id}-M${i + 1}`, unite: "Lire", gram: "", construction: "", famille: "", syn: "", ant: "", piege: "", ...m };
      motsAjouts.push(fiche);
      return fiche.id;
    });
    return { ...u, mots: [...(u.mots || []), ...mots] };
  };
  const unites = s.unites.map(ajouter).map(nommer);
  const lecture = s.lecture && { ...s.lecture, stations: s.lecture.stations.map(ajouter).map(nommer) };
  return { ...s, unites, lecture, tournures, phrases, motsAjouts };
}

export const SAISONS_FMS = Object.fromEntries(
  Object.entries(SEMESTRES).map(([n, s]) => [n, completer(s)]));
