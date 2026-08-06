/* Génère la question posée pour un élément, selon son état d'avancement.

   Lexique — on ne demande pas de produire un mot jamais rencontré.
     première rencontre     → QCM (reconnaissance)
     ensuite                → production vers l'allemand
     à partir de la boîte 3 → production vers le français

   Verbes — deux régimes selon le temps.
     conjugaison → une personne tirée au sort, forme à produire
     composé     → le participe, l'auxiliaire, ou la forme complète avec accord */

import { NOM_CATEGORIE } from "./items.js";
import { palier, trouer } from "./paliers.js";
import { texteADicter } from "./voix.js";

/* ── conjugaison simple ── */
function avecPronom(forme, pronom) {
  if (!pronom) return [];
  const voyelle = /^[aeéèêiouyh']/i.test(forme);
  const p = pronom === "je" && voyelle ? "j'" : pronom + " ";
  return [p + forme];
}

/* ── passé composé ── */
const ARTICLE = {
  present: "au présent",
  imparfait: "à l'imparfait",
  imperatif: "à l'impératif",
  futur: "au futur simple",
  conditionnel: "au conditionnel présent",
  subjonctif: "au subjonctif présent",
  participepresent: "au participe présent",
  subjonctif: "au subjonctif",
};

/* L'auxiliaire, au temps qu'exige le temps composé :
   présent pour le passé composé, imparfait pour le plus-que-parfait. */
const AUX = {
  present: {
    avoir: ["ai", "as", "a", "avons", "avez", "ont"],
    être: ["suis", "es", "est", "sommes", "êtes", "sont"],
  },
  imparfait: {
    avoir: ["avais", "avais", "avait", "avions", "aviez", "avaient"],
    être: ["étais", "étais", "était", "étions", "étiez", "étaient"],
  },
};
// sujets choisis pour faire apparaître l'accord
const SUJETS = [
  { mot: "il", i: 2, acc: "", refl: "s'" },
  { mot: "elle", i: 2, acc: "e", refl: "s'" },
  { mot: "ils", i: 5, acc: "s", refl: "se " },
  { mot: "elles", i: 5, acc: "es", refl: "se " },
  { mot: "nous", i: 3, acc: "s", refl: "nous " },
];

function formeComposee(item, s) {
  const aux = AUX[item.auxTemps || "present"][item.aux][s.i];
  const accord = item.aux === "être" && !item.sansAccord;
  const pp = accord ? item.participe + s.acc : item.participe;
  return item.pronominal ? `${s.mot} ${s.refl}${aux} ${pp}` : `${s.mot} ${aux} ${pp}`;
}

function questionComposee(item) {
  const tirage = Math.random();
  if (tirage < 0.34) {
    return {
      type: "saisie",
      consigne: "Donnez le participe passé",
      invite: item.inf,
      aide: item.de,
      placeholder: "le participe passé",
      reponse: item.participe,
      aussi: [],
      astuce: null,
    };
  }
  if (tirage < 0.5) {
    return {
      type: "qcm",
      consigne: `Quel auxiliaire au ${item.temps} ?`,
      invite: item.inf,
      aide: item.de,
      reponse: item.aux,
      aussi: [],
      options: ["avoir", "être"],
    };
  }
  const choix = item.impersonnel ? [SUJETS[0]] : SUJETS;
  const s = choix[Math.floor(Math.random() * choix.length)];
  return {
    type: "saisie",
    consigne: item.temps.charAt(0).toUpperCase() + item.temps.slice(1),
    invite: item.inf,
    aide: `${s.mot} … · ${item.de}`,
    placeholder: `${s.mot} …`,
    reponse: formeComposee(item, s),
    aussi: [formeComposee(item, s).replace(`${s.mot} `, "")],
    astuce: item.aux === "être" && !item.sansAccord ? "Attention : le participe s'accorde." : null,
  };
}

/* ── point d'entrée ── */
export function question(item, p, vocabDuSemestre, semestreCourant, mode) {
  /* Dictée : on entend, on écrit. C'est le seul exercice qui travaille le lien
     entre le son et l'orthographe — celui qui manque le plus à des
     germanophones, pour qui « le vent » et « le vin » se confondent. */
  if (mode === "dictee") {
    return {
      type: "saisie",
      dictee: texteADicter(item.fr),
      consigne: "Écoutez, puis écrivez le mot",
      invite: null,
      aide: item.de,
      placeholder: "écrivez ce que vous entendez",
      reponse: item.fr,
      aussi: [texteADicter(item.fr)],
      astuce: null,
    };
  }

  if (item.module === "verbes") {
    if (item.type === "compose") return questionComposee(item);
    const i = Math.floor(Math.random() * item.formes.length);
    const forme = item.formes[i];
    const pronom = item.pronoms ? item.pronoms[i] : null;
    return {
      type: "saisie",
      consigne: `Conjuguez ${ARTICLE[item.tempsCle] || "au " + item.temps}`,
      invite: item.inf,
      aide: item.tempsCle === "participepresent"
        ? `${item.de} — le gérondif est ce participe précédé de « en »`
        : `${item.personnes[i]} · ${item.de}`,
      placeholder: item.tempsCle === "imperatif" ? "la forme de l'impératif" : "le verbe conjugué",
      reponse: forme,
      aussi: avecPronom(forme, pronom),
      astuce: pronom ? "Vous pouvez écrire le pronom ou non : « parle » et « je parle » sont acceptés." : null,
    };
  }

  /* Couche d'approfondissement : reconnaissance seulement.
     On ne demande jamais de produire un mot destiné à être compris,
     non employé. Le QCM est donc le seul format. */
  const premiereFois = !p || p.essais === 0;
  if (premiereFois || item.module === "approfondissement") {
    const leurres = vocabDuSemestre
      .filter((v) => v.cat === item.cat && v.fr !== item.fr)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((v) => v.de);
    return {
      type: "qcm",
      consigne: "Que veut dire ce mot ?",
      invite: item.fr,
      aide: `${NOM_CATEGORIE[item.cat]} · ${item.unite}`,
      reponse: item.de,
      aussi: [],
      options: [item.de, ...leurres].sort(() => Math.random() - 0.5),
    };
  }

  /* Le format dépend de l'ancienneté du mot : voir paliers.js */
  const niveau = semestreCourant ? palier(item, semestreCourant) : "traduction";

  if (niveau === "trou" || niveau === "construction") {
    const troue = trouer(item.fr, item.exemple);
    if (troue) {
      return {
        type: "saisie",
        consigne: niveau === "construction" ? "Complétez. Attention à la préposition." : "Quel mot manque dans cette phrase ?",
        invite: troue,
        aide: niveau === "construction" && item.construction
          ? `${item.de} · ${item.construction}`
          : item.de,
        placeholder: "le mot qui manque",
        reponse: item.fr,
        aussi: [item.fr.replace(/^(le |la |les |l'|un |une |des )/, "")],
        astuce: null,
      };
    }
  }

  if (niveau === "production" || niveau === "trou" || p.boite >= 3) {
    return {
      type: "saisie", consigne: "Écrivez ce mot en français", invite: item.de,
      aide: NOM_CATEGORIE[item.cat], placeholder: "écrivez en français",
      reponse: item.fr, aussi: [],
    };
  }
  return {
    type: "saisie", consigne: "Écrivez ce mot en allemand", invite: item.fr,
    aide: `${NOM_CATEGORIE[item.cat]} · ${item.unite}`, placeholder: "écrivez en allemand",
    reponse: item.de, aussi: [],
  };
}
