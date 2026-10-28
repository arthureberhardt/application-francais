/* Les saisons : un semestre = une ligne d'unités (deux semaines chacune)
   et, en parallèle, une ligne de lecture.

   Chaque saison rédigée vit dans src/donnees/saisons/sN.js, au même format
   (voir saisons/index.js). Pour un semestre pas encore rédigé, on construit
   des unités provisoires à partir des thèmes existants.

   Les clés de progression :
     v:<id>             un mot
     c:<verbe>:<temps>  un couple verbe × temps
     g:<id>             un exercice de grammaire
     t:<id>             une tournure
     p:<id>             une phrase à construire puis à traduire
     x:<id>             un texte à trous
     defi:<unité>       le résultat du défi (ok = score en %, essais = nombre de questions)
     carnet:<station>   le carnet de lecture envoyé pour une station de lecture
     eval:<évaluation>  l'entraînement à une évaluation envoyé
   Elles ne dépendent ni du semestre ni de la filière.                       */

import { PAR_ID, VERBE_PAR_INF } from "../donnees/index.js";
import { SAISONS } from "../donnees/saisons/index.js";
import { TEMPS_PAR_CLE } from "../donnees/temps.js";
import { itemsDe, infosSemestre, cleVerbe, PERSONNES, PRONOMS, PERS_IMPERATIF, filiereActive } from "./items.js";
import { categorie } from "./leitner.js";

export const ETAPES = [
  { cle: "decouvrir", nom: "Découvrir", sous: "Les mots de l'unité, un par un" },
  { cle: "entrainer", nom: "S'entraîner", sous: "Mots et verbes, jusqu'à les savoir" },
  { cle: "grammaire", nom: "Grammaire", sous: "La règle, puis des exercices" },
  { cle: "tournures", nom: "Tournures", sous: "Les phrases toutes faites pour communiquer" },
  { cle: "phrases", nom: "Phrases et textes", sous: "Construire, traduire, compléter un texte" },
  { cle: "defi", nom: "Défi", sous: "Un test, puis un petit texte pour votre enseignant" },
  { cle: "evaluation", nom: "Préparer l'évaluation", sous: "Les critères, un modèle, un entraînement" },
];

export const ETAPES_LECTURE = [
  { cle: "decouvrir", nom: "Découvrir", sous: "Les mots du livre et les notions de lecture" },
  { cle: "entrainer", nom: "S'entraîner", sous: "Jusqu'à les savoir" },
  { cle: "tournures", nom: "Tournures", sous: "Pour parler du livre" },
  { cle: "carnet", nom: "Carnet de lecture", sous: "Un court texte sur ce que vous avez lu" },
  { cle: "evaluation", nom: "Préparer l'évaluation", sous: "Les critères, un modèle, un entraînement" },
];

export const SEUIL_DEFI = 70;   // % de réussite au test pour valider l'unité
const SEUIL_ETAPE = 0.8;        // part d'éléments « vus » pour qu'une étape soit faite

/* ─────────── fiches ajoutées par l'enseignant ─────────── */
let FICHES_COURS = [];
export const definirFichesCours = (lignes) => { FICHES_COURS = lignes || []; CACHE = {}; };
// les premières fiches ont pu être rangées dans l'ancienne unité de lecture de S1
const ALIAS_STATION = { "S1-U7": "S1-L1" };

let CACHE = {};
export const saisonDe = (sem) => (filiereActive().cle === "gymnase" ? SAISONS[sem] || null : null);

/* ─────────── construction des éléments ─────────── */
function itemMot(id, sem, uniteId, fil) {
  const m = PAR_ID[id];
  if (!m) return null;
  return { ...m, cle: `v:${m.id}`, semestre: sem, bloc: 1, module: "lexique", uniteSaison: uniteId, fil: fil || null };
}

function itemFicheCours(f, sem, uniteId) {
  return {
    id: `FC-${f.id}`, fr: f.fr, de: f.de, cat: f.cat || "N", unite: "Lexique du cours",
    gram: "", construction: "", exemple: f.exemple || "", famille: "", syn: "", ant: "", piege: "",
    cle: `v:FC-${f.id}`, semestre: sem, bloc: 1, module: "lexique", uniteSaison: uniteId, duCours: true,
  };
}

/** Les temps travaillés jusqu'à un semestre, dans la filière active. */
function tempsJusqua(sem) {
  const temps = [];
  for (const s of filiereActive().semestres) {
    if (s.numero > sem) break;
    for (const t of s.tempsCles) if (TEMPS_PAR_CLE[t]) temps.push(TEMPS_PAR_CLE[t]);
  }
  return temps;
}

/* Les couples verbe × temps d'une liste de verbes, aux temps du semestre.
   Mêmes clés que le module « verbes » : la progression est partagée. */
export function itemsVerbes(infs, sem) {
  const temps = tempsJusqua(sem);
  const out = [];
  for (const inf of infs) {
    const v = VERBE_PAR_INF[inf];
    if (!v) continue;
    const id = cleVerbe(inf);
    for (const t of temps) {
      if (t.reconnaissance) continue; // le passé simple en reconnaissance ne se conjugue pas
      if (t.type !== "conjugaison") {
        out.push({
          cle: `c:${id}:${t.cle}`, module: "verbes", semestre: sem, inf: v.inf, de: v.de,
          temps: t.nom, tempsCle: t.cle, type: "compose", participe: v.participe, aux: v.aux,
          pronominal: v.pronominal, impersonnel: v.impersonnel, sansAccord: Boolean(v.sansAccord),
          auxTemps: t.auxTemps || "present", auxMode: t.auxMode || null,
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

function construireSaison(saison, sem) {
  const POINTS = Object.fromEntries((saison.grammaire || []).map((g) => [g.id, g]));
  const evals = saison.evaluations || {};

  const grammaire = (ids, uid) => (ids || []).flatMap((gid) => {
    const g = POINTS[gid];
    if (!g) return [];
    return g.exercices.map((e) => ({
      ...e, cle: `g:${e.id}`, module: "grammaire", point: g.id, pointTitre: g.titre, uniteSaison: uid,
    }));
  });
  const tournures = (uid) => (saison.tournures || []).filter((t) => t.unite === uid)
    .map((t) => ({ ...t, cle: `t:${t.id}`, module: "tournure", uniteSaison: uid }));
  const phrases = (uid) => (saison.phrases || []).filter((p) => p.unite === uid)
    .map((p) => ({ ...p, cle: `p:${p.id}`, module: "phrase", uniteSaison: uid }));
  const textes = (uid) => (saison.textes || []).filter((x) => x.unite === uid)
    .map((x) => ({ ...x, cle: `x:${x.id}`, module: "texte", uniteSaison: uid }));
  const cours = (sid) => FICHES_COURS
    .filter((f) => (ALIAS_STATION[f.unite] || f.unite || "") === sid)
    .map((f) => itemFicheCours(f, sem, sid));
  const evaluation = (eid) => (eid && evals[eid] ? { id: eid, ...evals[eid] } : null);

  const unites = (saison.unites || []).map((u) => {
    const fils = u.fils || {};
    const lexique = [
      ...(u.mots || []).map((id) => itemMot(id, sem, u.id)),
      ...(fils.adjectifs || []).map((id) => itemMot(id, sem, u.id, "adjectifs")),
      ...(fils.notions || []).map((id) => itemMot(id, sem, u.id, "notions")),
      ...(fils.argumentation || []).map((id) => itemMot(id, sem, u.id, "argumentation")),
    ].filter(Boolean);
    return {
      ...u, type: "unite", semestre: sem, complete: true,
      lexique: [...lexique, ...cours(u.id)],
      verbes: itemsVerbes(u.verbes || [], sem),
      grammaire: grammaire(u.grammaire, u.id),
      points: (u.grammaire || []).map((g) => POINTS[g]).filter(Boolean),
      tournures: tournures(u.id),
      phrases: [...phrases(u.id), ...textes(u.id)],
      defi: (saison.defis || {})[u.id] || null,
      evaluation: evaluation(u.evaluation),
    };
  });

  const lecture = saison.lecture ? {
    ...saison.lecture,
    stations: (saison.lecture.stations || []).map((st) => ({
      ...st, type: "lecture", semestre: sem, complete: true,
      lexique: [
        ...(st.notions || []).map((id) => itemMot(id, sem, st.id, "notions")),
        ...(st.mots || []).map((id) => itemMot(id, sem, st.id)),
        ...cours(st.id),
      ].filter(Boolean),
      verbes: [], grammaire: [], points: [], phrases: [],
      tournures: tournures(st.id),
      defi: null,
      evaluation: evaluation(st.evaluation),
    })),
  } : null;

  return { unites, lecture };
}

function unitesProvisoires(sem) {
  const { lexique, verbes } = itemsDe(sem);
  const parTheme = {};
  for (const i of lexique) (parTheme[i.unite] = parTheme[i.unite] || []).push(i);
  return Object.entries(parTheme).map(([nom, items], k) => ({
    id: `S${sem}-T${k + 1}`, numero: k + 1, titre: nom, sous: `${items.length} mots`, type: "unite",
    semestre: sem, complete: false, lexique: items, verbes: k === 0 ? verbes : [],
    grammaire: [], points: [], tournures: [], phrases: [], defi: null, evaluation: null,
  }));
}

function construire(sem) {
  if (CACHE[sem]) return CACHE[sem];
  const saison = saisonDe(sem);
  CACHE[sem] = saison ? construireSaison(saison, sem) : { unites: unitesProvisoires(sem), lecture: null };
  return CACHE[sem];
}

export const unitesDe = (sem) => construire(sem).unites;
export const lectureDe = (sem) => construire(sem).lecture;
/** Unités et stations de lecture : toutes les « stations » d'une saison. */
export const stationsDe = (sem) => [...unitesDe(sem), ...(lectureDe(sem)?.stations || [])];
export const uniteParId = (sem, id) => stationsDe(sem).find((u) => u.id === id);

/** Tous les éléments interrogeables d'une unité ou d'une station de lecture. */
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

export function etapesDisponibles(u) {
  if (u.type === "lecture") {
    return ETAPES_LECTURE.filter((e) =>
      e.cle === "decouvrir" ? u.lexique.length
      : e.cle === "entrainer" ? u.lexique.length
      : e.cle === "tournures" ? u.tournures.length
      : e.cle === "carnet" ? Boolean(u.carnet)
      : e.cle === "evaluation" ? Boolean(u.evaluation) : false);
  }
  return ETAPES.filter((e) =>
    e.cle === "defi" || e.cle === "decouvrir" || e.cle === "entrainer"
      ? true
      : e.cle === "evaluation" ? Boolean(u.evaluation)
      : itemsEtape(u, e.cle).length);
}

/* ─────────── avancement ─────────── */
const vu = (p) => p && p.ok > 0;

export function resultatDefi(progression, uniteId) {
  const p = progression[`defi:${uniteId}`];
  return p ? { score: p.ok, total: p.essais, date: p.maj } : null;
}
export const carnetEnvoye = (progression, stationId) => Boolean(progression[`carnet:${stationId}`]);
export const evalEnvoyee = (progression, evalId) => Boolean(progression[`eval:${evalId}`]);

export function avancementEtape(u, etape, progression, decouverts) {
  if (etape === "defi") {
    const r = resultatDefi(progression, u.id);
    return { part: r ? Math.min(1, r.score / SEUIL_DEFI) : 0, fait: Boolean(r && r.score >= SEUIL_DEFI) };
  }
  if (etape === "carnet") {
    const f = carnetEnvoye(progression, u.id);
    return { part: f ? 1 : 0, fait: f };
  }
  if (etape === "evaluation") {
    const f = u.evaluation && evalEnvoyee(progression, u.evaluation.id);
    return { part: f ? 1 : 0, fait: Boolean(f) };
  }
  const items = itemsEtape(u, etape);
  if (!items.length) return { part: 0, fait: false, vide: true };
  const n = etape === "decouvrir"
    ? items.filter((i) => decouverts.has(i.cle) || vu(progression[i.cle])).length
    : items.filter((i) => vu(progression[i.cle])).length;
  const part = n / items.length;
  return { part, fait: part >= SEUIL_ETAPE, n, total: items.length };
}

/** Une station est validée : unité → défi réussi ; lecture → carnet envoyé. */
export const stationValidee = (u, progression) =>
  u.type === "lecture" ? carnetEnvoye(progression, u.id) : (resultatDefi(progression, u.id)?.score || 0) >= SEUIL_DEFI;

export function avancementUnite(u, progression, decouverts) {
  const etapes = etapesDisponibles(u).map((e) => ({ ...e, ...avancementEtape(u, e.cle, progression, decouverts) }));
  const valide = stationValidee(u, progression);
  const items = tousItems(u);
  const acquis = items.filter((i) => categorie(progression[i.cle]) === "acquis").length;
  const vus = items.filter((i) => vu(progression[i.cle])).length;
  const prochaine = etapes.find((e) => !e.fait) || null;
  return { etapes, valide, acquis, vus, total: items.length, prochaine, commencee: vus > 0 || valide };
}

/** L'unité sur laquelle l'élève devrait avancer : la première non validée,
    hors unités facultatives. */
export function uniteCourante(sem, progression, decouverts) {
  const us = unitesDe(sem).filter((u) => !u.facultative);
  return us.find((u) => !avancementUnite(u, progression, decouverts).valide) || us[us.length - 1];
}

/** La station de lecture en cours : la première dont le carnet manque. */
export function stationLectureCourante(sem, progression) {
  const st = lectureDe(sem)?.stations || [];
  return st.find((s) => !carnetEnvoye(progression, s.id)) || st[st.length - 1] || null;
}

/** Tout ce qu'il y a à réviser dans la saison et les précédentes : uniquement
    les éléments déjà rencontrés (la découverte se fait dans l'unité). */
export function elementsRencontres(semMax, progression) {
  const out = [];
  const vus = new Set();
  for (let s = 1; s <= semMax; s++) {
    for (const u of stationsDe(s)) {
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
  const saison = saisonDe(sem);
  const s = infosSemestre(sem);
  if (saison?.titre) return `${saison.titre} · ${s?.niveau || ""}`;
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
