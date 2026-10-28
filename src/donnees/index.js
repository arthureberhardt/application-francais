/* Le contenu de l'application.

   mots.js         — toutes les fiches, une seule fois
   mots_ajouts.js  — fiches ajoutées lors de la refonte 2026
   verbes.js       — tous les verbes et leurs formes, une seule fois
   temps.js        — tous les temps existants
   filieres/       — qui enseigne quoi, et quand
   saisons/        — les saisons organisées en unités (S1 pour l'instant)

   Une fiche n'appartient à aucune filière : ce sont les filières qui la
   citent. Le gymnase et la FMS partagent donc exactement le même contenu.  */

import gymnase from "./filieres/gymnase.js";
import fms from "./filieres/fms.js";
import { MOTS as MOTS_BASE } from "./mots.js";
import { MOTS_AJOUTS } from "./mots_ajouts.js";
import { VERBES as VERBES_BASE } from "./verbes.js";
import { VERBES_AJOUTS } from "./verbes_ajouts.js";
import { SAISONS } from "./saisons/index.js";
import { SAISONS_FMS } from "./saisons_fms/index.js";

const TOUTES = [...Object.values(SAISONS), ...Object.values(SAISONS_FMS)];

// Les surcharges remplacent l'exemple (et parfois la traduction) de fiches
// reprises dans une saison : un exemple adapté au niveau sert toutes les filières.
const SURCHARGES = Object.assign({}, ...TOUTES.map((s) => s.surcharges || {}));
const AJOUTS_SAISONS = TOUTES.flatMap((s) => s.motsAjouts || []);
// La Suisse n'écrit pas « ß » : on affiche « ss » partout (heissen, gross).
const suisse = (m) => (m.de && m.de.includes("ß") ? { ...m, de: m.de.replace(/ß/g, "ss") } : m);
export const MOTS = [...MOTS_BASE, ...MOTS_AJOUTS, ...AJOUTS_SAISONS].map((m) =>
  suisse(SURCHARGES[m.id] ? { ...m, ...SURCHARGES[m.id] } : m));
export const PAR_ID = Object.fromEntries(MOTS.map((m) => [m.id, m]));
export const VERBES = [...VERBES_BASE, ...VERBES_AJOUTS].map(suisse);
export const VERBE_PAR_INF = Object.fromEntries(VERBES.map((v) => [v.inf, v]));
export { TEMPS } from "./temps.js";

/* Les saisons rédigées font foi pour leur filière : leurs mots et leurs verbes
   remplacent ceux du semestre, et sont retirés des autres semestres. Ce qui
   n'a trouvé place dans aucune unité reste en reconnaissance dans son
   semestre d'origine : aucune fiche ne disparaît. */
function appliquerSaisons(filiere, SAISONS) {
  const idsSaison = (s) => [
    ...s.unites.flatMap((u) => [...(u.mots || []), ...Object.values(u.fils || {}).flat()]),
    ...(s.lecture?.stations || []).flatMap((st) => [...(st.notions || []), ...(st.mots || [])]),
  ];
  // les verbes d'une unité facultative (les bases) ne sont « pris » par personne
  const verbesSaison = (s) => [...new Set(s.unites.filter((u) => !u.facultative).flatMap((u) => u.verbes || []))];
  const pris = new Set(Object.values(SAISONS).flatMap(idsSaison));
  const verbesPris = new Set(Object.values(SAISONS).flatMap(verbesSaison));
  // un temps placé par une saison n'est introduit qu'une fois
  const tempsPris = new Set(Object.values(SAISONS).flatMap((s) => s.temps || []));
  for (const sem of filiere.semestres) {
    const saison = SAISONS[sem.numero];
    if (saison) {
      const anciens = [...sem.mots, ...sem.appro];
      sem.mots = [...new Set([
        ...saison.unites.filter((u) => !u.facultative).flatMap((u) => [...(u.mots || []), ...Object.values(u.fils || {}).flat()]),
        ...(saison.lecture?.stations || []).flatMap((st) => [...(st.notions || []), ...(st.mots || [])]),
      ])];
      sem.appro = [...new Set(anciens.filter((id) => !pris.has(id)))];
      sem.verbes = verbesSaison(saison);
      if (saison.temps) sem.tempsCles = saison.temps;
    } else {
      sem.mots = sem.mots.filter((id) => !pris.has(id));
      sem.appro = sem.appro.filter((id) => !pris.has(id));
      sem.verbes = sem.verbes.filter((v) => !verbesPris.has(v));
      sem.tempsCles = sem.tempsCles.filter((t) => !tempsPris.has(t));
    }
  }
  return filiere;
}
appliquerSaisons(gymnase, SAISONS);
appliquerSaisons(fms, SAISONS_FMS);

export const FILIERES = [gymnase, fms];
export const filierePar = (cle) => FILIERES.find((f) => f.cle === cle) || gymnase;
