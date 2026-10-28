/* Les saisons : un semestre découpé en unités, chaque unité en six étapes.

   S1 est entièrement rédigée (grammaire, tournures, phrases, défi). Pour les
   semestres pas encore refondus, on construit des unités « provisoires » à
   partir des thèmes existants : seules les étapes Découvrir, S'entraîner et
   Défi y sont disponibles.

   Les clés de progression :
     v:<id>             un mot (comme avant)
     c:<verbe>:<temps>  un couple verbe × temps (comme avant)
     g:<id>             un exercice de grammaire
     t:<id>             une tournure
     p:<id>             une phrase à construire puis à traduire
     defi:<unité>       le résultat du défi (ok = score en %, essais = nombre de questions)
   Elles ne dépendent ni du semestre ni de la filière.                       */

import { PAR_ID, VERBE_PAR_INF } from "../donnees/index.js";
import { UNITES_S1, GRAMMAIRE_S1, TOURNURES_S1, PHRASES_S1, DEFIS_S1 } from "../donnees/saisons/s1.js";
import { TEMPS_PAR_CLE } from "../donnees/temps.js";
import { itemsDe, infosSemestre, cleVerbe, PERSONNES, PRONOMS, PERS_IMPERATIF, filiereActive } from "./items.js";
import { categorie } from "./leitner.js";

export const ETAPES = [
  { cle: "decouvrir", nom: "Découvrir", sous: "Les mots de l'unité, un par un" },
  { cle: "entrainer", nom: "S'entraîner", sous: "Mots et verbes, jusqu'à les savoir" },
  { cle: "grammaire", nom: "Grammaire", sous: "La règle, puis des exercices" },
  { cle: "tournures", nom: "Tournures", sous: "Les phrases toutes faites pour communiquer" },
  { cle: "phrases", nom: "Construire des phrases", sous: "Remettre dans l'ordre, puis traduire" },
  { cle: "defi", nom: "Défi", sous: "Un test, puis un petit texte pour votre enseignant" },
];

export const SEUIL_DEFI = 70;   // % de réussite au test pour valider l'unité
const SEUIL_ETAPE = 0.8;        // part d'éléments « vus » pour qu'une étape soit faite

const GRAMMAIRE_PAR_ID = Object.fromEntries(GRAMMAIRE_S1.map((g) => [g.id, g]));

/* ─────────── fiches ajoutées par l'enseignant ───────────
   Le lexique des lectures en cours (le Maigret, par exemple) est saisi dans
   l'espace enseignant et chargé à la connexion. On le garde ici pour que
   l'unité concernée l'intègre comme ses propres mots. */
let FICHES_COURS = [];
export const definirFichesCours = (lignes) => { FICHES_COURS = lignes || []; CACHE = {}; };

let CACHE = {};

/* ─────────── construction des éléments ─────────── */
function itemMot(id, sem, uniteId) {
  const m = PAR_ID[id];
  if (!m) return null;
  return { ...m, cle: `v:${m.id}`, semestre: sem, bloc: 1, module: "lexique", uniteSaison: uniteId };
}

function itemFicheCours(f, sem, uniteId) {
  return {
    id: `FC-${f.id}`, fr: f.fr, de: f.de, cat: f.cat || "N", unite: "Lexique du cours",
    gram: "", construction: "", exemple: f.exemple || "", famille: "", syn: "", ant: "", piege: "",
    cle: `v:FC-${f.id}`, semestre: sem, bloc: 1, module: "lexique", uniteSaison: uniteId, duCours: true,
  };
}

/* Les couples verbe × temps d'une liste de verbes, aux temps du semestre.
   Mêmes clés que le module « verbes » du semestre : la progression est partagée. */
function itemsVerbes(infs, sem) {
  const temps = [];
  for (const s of filiereActive().semestres) {
    if (s.numero > sem) break;
    for (const t of s.tempsCles) if (TEMPS_PAR_CLE[t]) temps.push(TEMPS_PAR_CLE[t]);
  }
  const out = [];
  for (const inf of infs) {
    const v = VERBE_PAR_INF[inf];
    if (!v) continue;
    const id = cleVerbe(inf);
    for (const t of temps) {
      if (t.type !== "conjugaison") {
        out.push({
          cle: `c:${id}:${t.cle}`, module: "verbes", semestre: sem, inf: v.inf, de: v.de,
          temps: t.nom, tempsCle: t.cle, type: "compose", participe: v.participe, aux: v.aux,
          pronominal: v.pronominal, impersonnel: v.impersonnel, sansAccord: Boolean(v.sansAccord),
          auxTemps: t.auxTemps || "present",
        });
        continue;
      }
      const formes = v[t.cle];
      if (!formes) continue;
      const personnes = t.personnes ? t.personnes
        : v.impersonnel ? ["il"] : t.cle === "imperatif" ? PERS_IMPERATIF : PERSONNES;
      out.push({
        cle: `c:${id}:${t.cle}`, module: "verbes", semestre: sem, inf: v.inf, de: v.de,
        temps: t.nom, tempsCle: t.cle, type: "conjugaison", formes, personnes,
        pronoms: t.personnes ? null : v.impersonnel ? ["il"] : t.cle === "imperatif" ? null : PRONOMS,
      });
    }
  }
  return out;
}

function itemsGrammaire(u) {
  return (u.grammaire || []).flatMap((gid) => {
    const g = GRAMMAIRE_PAR_ID[gid];
    if (!g) return [];
    return g.exercices.map((e) => ({
      ...e, cle: `g:${e.id}`, module: "grammaire", point: g.id, pointTitre: g.titre, uniteSaison: u.id,
    }));
  });
}

const itemsTournures = (u) =>
  TOURNURES_S1.filter((t) => t.unite === u.id).map((t) => ({ ...t, cle: `t:${t.id}`, module: "tournure", uniteSaison: u.id }));

const itemsPhrases = (u) =>
  PHRASES_S1.filter((p) => p.unite === u.id).map((p) => ({ ...p, cle: `p:${p.id}`, module: "phrase", uniteSaison: u.id }));

/* ─────────── unités d'un semestre ─────────── */
export function unitesDe(sem) {
  if (CACHE[sem]) return CACHE[sem];
  let unites;
  if (sem === 1 && filiereActive().cle === "gymnase") {
    unites = UNITES_S1.map((u) => {
      const lexique = u.mots.map((id) => itemMot(id, sem, u.id)).filter(Boolean);
      // le lexique saisi par l'enseignant rejoint l'unité de lecture (ou celle indiquée)
      const cours = FICHES_COURS.filter((f) => (f.unite || "S1-U7") === u.id).map((f) => itemFicheCours(f, sem, u.id));
      return {
        ...u, semestre: sem, complete: true,
        lexique: [...lexique, ...cours],
        verbes: itemsVerbes(u.verbes, sem),
        grammaire: itemsGrammaire(u),
        points: (u.grammaire || []).map((g) => GRAMMAIRE_PAR_ID[g]).filter(Boolean),
        tournures: itemsTournures(u),
        phrases: itemsPhrases(u),
        defi: DEFIS_S1[u.id] || null,
      };
    });
  } else {
    // unités provisoires : une par thème du semestre
    const { lexique, verbes } = itemsDe(sem);
    const parTheme = {};
    for (const i of lexique) (parTheme[i.unite] = parTheme[i.unite] || []).push(i);
    unites = Object.entries(parTheme).map(([nom, items], k) => ({
      id: `S${sem}-T${k + 1}`, numero: k + 1, titre: nom, sous: `${items.length} mots`,
      semestre: sem, complete: false, lexique: items, verbes: k === 0 ? verbes : [],
      grammaire: [], points: [], tournures: [], phrases: [], defi: null,
    }));
  }
  CACHE[sem] = unites;
  return unites;
}

export const uniteParId = (sem, id) => unitesDe(sem).find((u) => u.id === id);

/** Tous les éléments interrogeables d'une unité. */
export const tousItems = (u) =>
  [...u.lexique, ...u.verbes, ...u.grammaire, ...u.tournures, ...u.phrases];

/** Les éléments d'une étape. */
export function itemsEtape(u, etape) {
  switch (etape) {
    case "decouvrir": return u.lexique;
    case "entrainer": return [...u.lexique, ...u.verbes];
    case "grammaire": return u.grammaire;
    case "tournures": return u.tournures;
    case "phrases": return u.phrases;
    case "defi": return tousItems(u);
    default: return [];
  }
}

export const etapesDisponibles = (u) =>
  ETAPES.filter((e) => e.cle === "defi" || e.cle === "decouvrir" || e.cle === "entrainer" || itemsEtape(u, e.cle).length);

/* ─────────── avancement ─────────── */
const vu = (p) => p && p.ok > 0;

export function resultatDefi(progression, uniteId) {
  const p = progression[`defi:${uniteId}`];
  return p ? { score: p.ok, total: p.essais, date: p.maj } : null;
}

export function avancementEtape(u, etape, progression, decouverts) {
  if (etape === "defi") {
    const r = resultatDefi(progression, u.id);
    return { part: r ? Math.min(1, r.score / SEUIL_DEFI) : 0, fait: Boolean(r && r.score >= SEUIL_DEFI) };
  }
  const items = itemsEtape(u, etape);
  if (!items.length) return { part: 0, fait: false, vide: true };
  const n = etape === "decouvrir"
    ? items.filter((i) => decouverts.has(i.cle) || vu(progression[i.cle])).length
    : items.filter((i) => vu(progression[i.cle])).length;
  const part = n / items.length;
  return { part, fait: part >= SEUIL_ETAPE, n, total: items.length };
}

export function avancementUnite(u, progression, decouverts) {
  const etapes = etapesDisponibles(u).map((e) => ({ ...e, ...avancementEtape(u, e.cle, progression, decouverts) }));
  const valide = etapes.find((e) => e.cle === "defi")?.fait || false;
  const items = tousItems(u);
  const acquis = items.filter((i) => categorie(progression[i.cle]) === "acquis").length;
  const vus = items.filter((i) => vu(progression[i.cle])).length;
  const prochaine = etapes.find((e) => !e.fait) || null;
  return { etapes, valide, acquis, vus, total: items.length, prochaine, commencee: vus > 0 };
}

/** L'unité sur laquelle l'élève devrait avancer : la première non validée,
    hors unités facultatives. */
export function uniteCourante(sem, progression, decouverts) {
  const us = unitesDe(sem).filter((u) => !u.facultative);
  return us.find((u) => !avancementUnite(u, progression, decouverts).valide) || us[us.length - 1];
}

/** Tout ce qu'il y a à réviser dans la saison et les précédentes : uniquement
    les éléments déjà rencontrés (la découverte se fait dans l'unité). */
export function elementsRencontres(semMax, progression) {
  const out = [];
  const vus = new Set();
  for (let s = 1; s <= semMax; s++) {
    for (const u of unitesDe(s)) {
      for (const i of tousItems(u)) {
        if (vus.has(i.cle)) continue;
        vus.add(i.cle);
        if (progression[i.cle]?.essais > 0) out.push(i);
      }
    }
  }
  return out;
}

export const nomSemestre = (sem) => {
  const s = infosSemestre(sem);
  return s ? `${s.niveau} · ${s.temps}` : "";
};

/* ─────────── découvertes (sur l'appareil) ─────────── */
const cleDec = (code) => `fle:decouverts:${code}`;
export function lireDecouverts(code) {
  try { return new Set(JSON.parse(localStorage.getItem(cleDec(code)) || "[]")); } catch { return new Set(); }
}
export function marquerDecouverts(code, cles) {
  const s = lireDecouverts(code);
  for (const c of cles) s.add(c);
  try { localStorage.setItem(cleDec(code), JSON.stringify([...s])); } catch {}
  return s;
}
