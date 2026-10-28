/* Le registre des saisons rédigées (filière gymnase).

   Chaque saison exporte par défaut un objet au même format :

   {
     numero, titre,
     temps: ["futur", …]              // temps introduits (facultatif : sinon ceux de la filière)
     unites: [{ id, numero, titre, sous, oral, ecrit, facultative?,
                mots: [ids], fils: { adjectifs, notions, argumentation },
                verbes: [infinitifs], grammaire: [ids de points], evaluation?: id }],
     lecture: { titre, sous, stations: [{ id, numero, titre, sous, semaines,
                notions: [ids], mots: [ids], carnet: { consigne, controle, modele },
                evaluation?: id }] },
     grammaire: [{ id, titre, explication: [lignes], exercices: [...] }],
     tournures: [{ id, unite, fr, de, situation, trou, fil? }],
     phrases:   [{ id, unite, de, fr, aussi }],
     textes:    [{ id, unite, titre, consigne, texte }],   // blancs : {réponse/variante|indice}
     defis:     { [unité]: { consigne, motsImposes, controle, modele } },
     evaluations: { [id]: { titre, type, quand, criteres, modele, tournures, entrainement } },
     motsAjouts: [fiches],             // fiches nouvelles de la saison
     surcharges: { [id]: { exemple?, de? } },
   }                                                                          */

import s1 from "./s1.js";
import s2 from "./s2.js";
import s3 from "./s3.js";
import s4 from "./s4.js";
import s5 from "./s5.js";
import s6 from "./s6.js";
import s7 from "./s7.js";
import s8 from "./s8.js";
import { COMPLEMENTS } from "./complements.js";
import { nommer } from "../noms_stations.js";
import { CONSTRUCTIONS } from "./constructions.js";
import { LECTURES_PLUS } from "./lectures/index.js";

// les constructions verbales (un point par saison), les compléments des
// stations de lecture et les compléments d'exhaustivité
function completer(s) {
  const k = CONSTRUCTIONS[s.numero];
  const grammaire = [...(s.grammaire || []), ...(k ? [k.point] : [])];
  const tournures = [...(s.tournures || [])];
  const phrases = [...(s.phrases || [])];
  const textes = [...(s.textes || [])];
  const motsAjouts = [...(s.motsAjouts || [])];

  // ajoute les compléments d'une station ; rend les ids de mots et de points ajoutés
  const ajouter = (id) => {
    const a = LECTURES_PLUS[id];
    if (!a) return { mots: [], points: [] };
    (a.tournures || []).forEach((t, i) => tournures.push({ ...t, id: `${id}-T${i + 1}`, unite: id }));
    (a.phrases || []).forEach((p, i) => phrases.push({ ...p, id: `${id}-P${i + 1}`, unite: id }));
    (a.textes || []).forEach((x, i) => textes.push({ ...x, id: `${id}-X${i + 1}`, unite: id }));
    const mots = (a.mots || []).map((m, i) => {
      const fiche = { id: `${id}-M${i + 1}`, unite: "Lire", gram: "", construction: "", famille: "", syn: "", ant: "", piege: "", ...m };
      motsAjouts.push(fiche);
      return fiche.id;
    });
    const points = [];
    if (a.grammaire) {
      grammaire.push({ id: `${id}-OUTIL`, unite: id, ...a.grammaire });
      points.push(`${id}-OUTIL`);
    }
    return { mots, points };
  };

  const unites = s.unites.map((u) => {
    const a = ajouter(u.id);
    return {
      ...u,
      mots: [...u.mots, ...(COMPLEMENTS[u.id] || []), ...a.mots],
      grammaire: [...(u.grammaire || []), ...(k && k.unite === u.id ? [k.point.id] : []), ...a.points],
    };
  });
  const lecture = s.lecture && {
    ...s.lecture,
    stations: s.lecture.stations.map((st) => {
      const a = ajouter(st.id);
      return { ...st, mots: [...(st.mots || []), ...a.mots], grammaire: [...(st.grammaire || []), ...a.points] };
    }),
  };
  return { ...s, grammaire, tournures, phrases, textes, motsAjouts, unites: unites.map(nommer),
    lecture: lecture && { ...lecture, stations: lecture.stations.map(nommer) } };
}

export const SAISONS = Object.fromEntries(
  Object.entries({ 1: s1, 2: s2, 3: s3, 4: s4, 5: s5, 6: s6, 7: s7, 8: s8 }).map(([n, s]) => [n, completer(s)]),
);
