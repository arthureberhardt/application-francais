/* Outils communs aux semestres FMS.

   Les points de grammaire du gymnase sont repris tels quels quand le niveau
   est le même : mêmes exercices, mêmes clés de progression (g:<id>). Un élève
   qui change de filière garde donc ce qu'il a appris.                       */

import { SAISONS } from "../saisons/index.js";

const POINTS_GYMNASE = Object.fromEntries(
  Object.values(SAISONS).flatMap((s) => s.grammaire || []).map((g) => [g.id, g]));

/** Reprend un point de grammaire du gymnase et le rattache à une unité FMS. */
export function reprendre(id, unite) {
  const g = POINTS_GYMNASE[id];
  if (!g) throw new Error(`Point de grammaire du gymnase introuvable : ${id}`);
  return { ...g, unite };
}

export const c = (id, phrase, options, reponse, explication) =>
  ({ id, type: "choix", phrase, options, reponse, explication });
export const s = (id, consigne, phrase, reponse, aussi = [], explication = "") =>
  ({ id, type: "saisie", consigne, phrase, reponse, aussi, explication });
export const o = (id, reponse, aussi = [], explication = "") =>
  ({ id, type: "ordre", reponse, aussi, explication });
export const t = (id, unite, fr, de, situation, trou) => ({ id, unite, fr, de, situation, trou });
export const p = (id, unite, de, fr, aussi = []) => ({ id, unite, de, fr, aussi });
export const x = (id, unite, titre, consigne, texte) => ({ id, unite, titre, consigne, texte });
export const f = (id, fr, de, cat, unite, exemple, extra = {}) => ({
  id, fr, de, cat, unite, gram: "", construction: "", exemple, famille: "", syn: "", ant: "", piege: "", ...extra,
});
export const carnet = (consigne, controle, modele) => ({ consigne, controle, modele });
