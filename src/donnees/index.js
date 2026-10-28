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
import { SURCHARGES_S1 } from "./saisons/s1_mots.js";

// Les surcharges remplacent l'exemple (et parfois la traduction) de fiches
// reprises en S1 : un exemple au présent sert toutes les filières.
const SURCHARGES = { ...SURCHARGES_S1 };
// La Suisse n'écrit pas « ß » : on affiche « ss » partout (heissen, gross).
const suisse = (m) => (m.de && m.de.includes("ß") ? { ...m, de: m.de.replace(/ß/g, "ss") } : m);
export const MOTS = [...MOTS_BASE, ...MOTS_AJOUTS].map((m) =>
  suisse(SURCHARGES[m.id] ? { ...m, ...SURCHARGES[m.id] } : m));
export const PAR_ID = Object.fromEntries(MOTS.map((m) => [m.id, m]));
export const VERBES = [...VERBES_BASE, ...VERBES_AJOUTS].map(suisse);
export const VERBE_PAR_INF = Object.fromEntries(VERBES.map((v) => [v.inf, v]));
export { TEMPS } from "./temps.js";

export const FILIERES = [gymnase, fms];
export const filierePar = (cle) => FILIERES.find((f) => f.cle === cle) || gymnase;
