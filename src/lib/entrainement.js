/* Entraînement choisi par l'élève : compétences centrales et « à la carte ». */

import { COMPETENCES } from "../donnees/competences.js";
import { filiereActive, itemsDe } from "./items.js";
import { stationsDe, uniteParId, tousItems } from "./saison.js";
import { categorie, estDifficile } from "./leitner.js";
import { composer } from "./seance.js";

export const semestreDeStation = (id) => Number((id.match(/^[SF](\d)-/) || [])[1] || 0);

/** Les compétences centrales d'un semestre, dans la filière active. Au dernier
    semestre du gymnase, la répétition porte toutes les compétences d'avant. */
export function competencesDe(sem) {
  const table = COMPETENCES[filiereActive().cle] || {};
  const liste = table[sem] || [];
  return liste.map((c) => (c.id === "C8-REPETITION"
    ? { ...c, precedentes: Object.entries(table).filter(([n]) => Number(n) < sem).flatMap(([n, l]) => l.map((x) => ({ ...x, semestre: Number(n) }))) }
    : { ...c, semestre: sem }));
}

const unique = (l) => [...new Map(l.map((i) => [i.cle, i])).values()];

/** Tous les éléments qui entraînent une compétence. */
export function itemsCompetence(c) {
  const out = [];
  const sems = new Set();
  for (const id of c.unites) {
    const sem = semestreDeStation(id);
    const u = sem && uniteParId(sem, id);
    if (!u) continue;
    sems.add(sem);
    out.push(...u.tournures, ...u.phrases, ...u.lexique.filter((i) => i.fil || u.type === "lecture"));
  }
  const points = new Set(c.points);
  for (const sem of sems) {
    for (const u of stationsDe(sem)) out.push(...u.grammaire.filter((i) => points.has(i.point)));
  }
  if (c.temps.length && sems.size) {
    const sem = Math.max(...sems);
    out.push(...itemsDe(sem).verbes.filter((i) => c.temps.includes(i.tempsCle)));
  }
  return unique(out);
}

export function avancementItems(items, progression) {
  const acquis = items.filter((i) => categorie(progression[i.cle]) === "acquis").length;
  const vus = items.filter((i) => progression[i.cle]?.essais > 0).length;
  return { total: items.length, acquis, vus, part: items.length ? Math.round((vus / items.length) * 100) : 0 };
}

/* ─────────── à la carte ─────────── */
export const MODULES = [
  { cle: "lexique", nom: "Mots" },
  { cle: "verbes", nom: "Verbes" },
  { cle: "grammaire", nom: "Grammaire" },
  { cle: "tournures", nom: "Tournures" },
  { cle: "phrases", nom: "Phrases et textes" },
];

export const FILTRES = [
  { cle: "tout", nom: "Tout" },
  { cle: "nouveaux", nom: "Pas encore vus" },
  { cle: "vus", nom: "Déjà vus" },
  { cle: "difficiles", nom: "Mes difficultés" },
];

/** Les éléments correspondant à un choix de l'élève. */
export function itemsChoix({ semestre, stations, modules, temps, points, filtre }, progression) {
  const toutes = stationsDe(semestre);
  const choisies = stations?.length ? toutes.filter((u) => stations.includes(u.id)) : toutes;
  let items = [];
  for (const u of choisies) {
    if (modules.includes("lexique")) items.push(...u.lexique);
    if (modules.includes("verbes")) items.push(...u.verbes.filter((v) => !temps?.length || temps.includes(v.tempsCle)));
    if (modules.includes("grammaire")) items.push(...u.grammaire.filter((g) => !points?.length || points.includes(g.point)));
    if (modules.includes("tournures")) items.push(...u.tournures);
    if (modules.includes("phrases")) items.push(...u.phrases);
  }
  items = unique(items);
  const p = (i) => progression[i.cle];
  if (filtre === "nouveaux") items = items.filter((i) => !p(i)?.essais);
  if (filtre === "vus") items = items.filter((i) => p(i)?.essais > 0);
  if (filtre === "difficiles") items = items.filter((i) => estDifficile(p(i)) || (p(i)?.echecs > 0 && categorie(p(i)) !== "acquis"));
  return items;
}

/** Une séance tirée d'une liste d'éléments, à la longueur voulue. Les
    familles (mots, verbes, grammaire, tournures, phrases) alternent : les
    centaines de formes verbales ne doivent pas noyer le reste. Dans chaque
    famille, l'ordre suit la répétition espacée (nouveau, dû, en cours…). */
export function composerLibre(items, progression, longueur = 15) {
  const familles = {};
  for (const i of items) {
    const f = i.module === "texte" ? "phrase" : i.module;
    (familles[f] = familles[f] || []).push(i);
  }
  const files = Object.values(familles).map((l) => composer(l, progression, "libre", l.length));
  const choisis = [];
  while (choisis.length < Math.min(longueur, items.length)) {
    let ajoute = false;
    for (const f of files) {
      if (choisis.length >= longueur) break;
      const i = f.shift();
      if (i) { choisis.push(i); ajoute = true; }
    }
    if (!ajoute) break;
  }
  return choisis.sort(() => Math.random() - 0.5);
}

export { tousItems };
