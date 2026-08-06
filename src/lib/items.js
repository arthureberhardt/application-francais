/* Construit la liste des éléments interrogeables, pour une filière et un
   semestre donnés.

   Deux modules :
   — « lexique » : un élément par mot ;
   — « verbes »  : un élément par couple verbe × temps.

   Le couple verbe × temps est le cœur du système. « prendre » peut être acquis
   au présent, vu à l'imparfait et inconnu au subjonctif. C'est ce qui permet
   de dire « ton imparfait tient, ton subjonctif ne tient pas ».

   Le cumul se fait sur deux axes : au semestre s, on interroge tous les verbes
   introduits jusqu'à s, à tous les temps introduits jusqu'à s.

   Les clés de progression ne dépendent ni du semestre ni de la filière : un
   élève qui change de filière garde tout ce qu'il a appris.                 */

import { PAR_ID, VERBE_PAR_INF, TEMPS, filierePar } from "../donnees/index.js";
import { TEMPS_PAR_CLE } from "../donnees/temps.js";

export const PERSONNES = ["je", "tu", "il / elle", "nous", "vous", "ils / elles"];
export const PRONOMS = ["je", "tu", "il", "nous", "vous", "ils"];
export const PERS_IMPERATIF = ["(tu)", "(nous)", "(vous)"];
export const NOM_CATEGORIE = {
  V: "verbe", N: "nom", A: "adjectif", C: "connecteur", L: "locution",
};

export const cleVerbe = (inf) =>
  inf.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
     .toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");

/* Les blocs découpent un semestre en cinq vagues d'introduction. Ils se
   calculent : chaque catégorie est distribuée à tour de rôle, de sorte qu'un
   bloc contienne toujours des verbes, des noms et des connecteurs. */
function blocs(ids) {
  const par = {};
  for (const id of ids) {
    const m = PAR_ID[id];
    if (m) (par[m.cat] = par[m.cat] || []).push(id);
  }
  const out = {};
  for (const cat of ["V", "N", "A", "C", "L"]) {
    (par[cat] || []).forEach((id, i) => { out[id] = (i % 5) + 1; });
  }
  return out;
}

function lexiqueDe(sem, ids, module) {
  const b = blocs(ids);
  return ids
    .map((id) => PAR_ID[id])
    .filter(Boolean)
    .map((m) => ({ ...m, cle: `v:${m.id}`, semestre: sem, bloc: b[m.id] || 1, module }));
}

function verbesDe(filiere, n) {
  const out = [];
  const temps = [];
  for (const s of filiere.semestres) {
    if (s.numero > n) break;
    for (const t of s.tempsCles) {
      const def = TEMPS_PAR_CLE[t];
      if (def) temps.push({ ...def, sem: s.numero });
    }
  }
  for (const s of filiere.semestres) {
    if (s.numero > n) break;
    for (const inf of s.verbes) {
      const v = VERBE_PAR_INF[inf];
      if (!v) continue;
      const id = cleVerbe(inf);
      for (const t of temps) {
        if (t.type === "conjugaison") {
          const formes = v[t.cle];
          if (!formes) continue;
          const personnes = t.personnes
            ? t.personnes
            : v.impersonnel ? ["il"]
            : t.cle === "imperatif" ? PERS_IMPERATIF : PERSONNES;
          out.push({
            cle: `c:${id}:${t.cle}`, module: "verbes", semestre: s.numero,
            inf: v.inf, de: v.de, temps: t.nom, tempsCle: t.cle, type: "conjugaison",
            formes, personnes,
            pronoms: t.personnes ? null
              : v.impersonnel ? ["il"]
              : t.cle === "imperatif" ? null : PRONOMS,
          });
        } else {
          out.push({
            cle: `c:${id}:${t.cle}`, module: "verbes", semestre: s.numero,
            inf: v.inf, de: v.de, temps: t.nom, tempsCle: t.cle, type: "compose",
            participe: v.participe, aux: v.aux, pronominal: v.pronominal,
            impersonnel: v.impersonnel, sansAccord: Boolean(v.sansAccord),
            auxTemps: t.auxTemps || "present",
          });
        }
      }
    }
  }
  return out;
}

/* ─────────── filière active ─────────── */
let FILIERE = filierePar("gymnase");
let CACHE = {};

export function choisirFiliere(cle) {
  FILIERE = filierePar(cle);
  CACHE = {};
  return FILIERE;
}
export const filiereActive = () => FILIERE;

function semestreDe(n) {
  return FILIERE.semestres.find((s) => s.numero === n) || FILIERE.semestres[0];
}

function construire(n) {
  if (CACHE[n]) return CACHE[n];
  const s = semestreDe(n);
  const lexique = lexiqueDe(s.numero, s.mots, "lexique");
  const approfondissement = lexiqueDe(s.numero, s.appro, "approfondissement");
  const verbes = verbesDe(FILIERE, s.numero);
  CACHE[n] = { lexique, approfondissement, verbes, tous: [...lexique, ...verbes] };
  return CACHE[n];
}

export const itemsDe = (n) => construire(n);
export const infosSemestre = (n) => semestreDe(n);

export const listeSemestres = () =>
  FILIERE.semestres.map((s) => ({
    numero: s.numero, niveau: s.niveau, temps: s.temps,
    mots: s.mots.length, approfondissement: s.appro.length,
  }));

/** Les temps enseignés jusqu'à un semestre donné, dans la filière active. */
export const tempsJusqua = (n) => {
  const out = [];
  for (const s of FILIERE.semestres) {
    if (s.numero > n) break;
    for (const t of s.tempsCles) {
      const def = TEMPS_PAR_CLE[t];
      if (def) out.push(def);
    }
  }
  return out;
};

export function itemsCumules(n) {
  const out = [...construire(n).verbes];
  for (const s of FILIERE.semestres) {
    if (s.numero > n) break;
    out.push(...construire(s.numero).lexique);
  }
  return out;
}

export function unitesDe(n) {
  const compte = {};
  for (const i of construire(n).lexique) compte[i.unite] = (compte[i.unite] || 0) + 1;
  return Object.entries(compte).map(([nom, mots]) => ({ nom, mots }));
}

export function verbesGroupes(n) {
  const par = {};
  for (const i of construire(n).verbes) {
    const id = i.cle.split(":")[1];
    (par[id] = par[id] || { inf: i.inf, de: i.de, sem: i.semestre, couples: [] }).couples.push(i);
  }
  return Object.values(par);
}

export function verbesConsultables(n) {
  const temps = tempsJusqua(n);
  const vus = [];
  for (const s of FILIERE.semestres) {
    if (s.numero > n) break;
    for (const inf of s.verbes) {
      const v = VERBE_PAR_INF[inf];
      if (v) vus.push({ ...v, sem: s.numero, id: cleVerbe(inf) });
    }
  }
  return vus.map((v) => ({
    ...v,
    temps: temps.map((t) => ({ ...t, formes: t.type === "conjugaison" ? v[t.cle] : null })),
  }));
}

export { TEMPS };
