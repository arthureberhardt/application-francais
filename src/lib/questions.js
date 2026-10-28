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
import { SAISONS } from "../donnees/saisons/index.js";
import { SAISONS_FMS } from "../donnees/saisons_fms/index.js";
import { EXERCICES } from "./exercices.js";
import { VERBE_PAR_INF } from "../donnees/index.js";
import { sonDisponible } from "./voix.js";

/* Un mot déjà bien ancré (boîte 3 et plus) n'est pas toujours redemandé de la
   même façon : une fois sur trois environ, la question change de format —
   dictée, genre, préposition, synonyme, contraire, famille de mots, verbe à
   conjuguer dans sa phrase. Ce sont les anciens « exercices spéciaux » : ils
   ne demandent plus d'aller les chercher, ils viennent au bon moment. */
const PART_VARIANTES = 0.35;

function questionVariante(item, vocab) {
  const possibles = EXERCICES.filter((e) => e.eligible(item));
  if (sonDisponible()) possibles.push("dictee");
  if (!possibles.length || Math.random() > PART_VARIANTES) return null;
  const e = possibles[Math.floor(Math.random() * possibles.length)];
  if (e === "dictee") {
    return {
      type: "saisie", dictee: texteADicter(item.fr), consigne: "Écoutez, puis écrivez le mot",
      invite: null, aide: item.de, placeholder: "écrivez ce que vous entendez",
      reponse: item.fr, aussi: [texteADicter(item.fr)], astuce: null, variante: "dictée",
    };
  }
  try {
    const q = e.question(item, vocab, (inf) => VERBE_PAR_INF[inf]);
    return q && q.reponse ? { ...q, variante: e.nom, exoCle: e.cle } : null;
  } catch {
    return null;
  }
}

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
  futur: {
    avoir: ["aurai", "auras", "aura", "aurons", "aurez", "auront"],
    être: ["serai", "seras", "sera", "serons", "serez", "seront"],
  },
  conditionnel: {
    avoir: ["aurais", "aurais", "aurait", "aurions", "auriez", "auraient"],
    être: ["serais", "serais", "serait", "serions", "seriez", "seraient"],
  },
  subjonctif: {
    avoir: ["aie", "aies", "ait", "ayons", "ayez", "aient"],
    être: ["sois", "sois", "soit", "soyons", "soyez", "soient"],
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
  const forme = item.pronominal ? `${s.mot} ${s.refl}${aux} ${pp}` : `${s.mot} ${aux} ${pp}`;
  // au subjonctif passé, la forme se donne avec « que » : qu'il soit parti
  if (item.auxTemps === "subjonctif") return /^[aeiouéèêh]/i.test(forme) ? `qu'${forme}` : `que ${forme}`;
  return forme;
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
    aussi: [formeComposee(item, s).replace(/^(que |qu')/, ""), formeComposee(item, s).replace(/^(que |qu')/, "").replace(`${s.mot} `, "")],
    astuce: item.aux === "être" && !item.sansAccord ? "Attention : le participe s'accorde." : null,
  };
}

/* ── grammaire, tournures, phrases (saisons refondues) ── */
const melange = (a) => [...a].sort(() => Math.random() - 0.5);

/** Découpe une phrase en étiquettes ; la ponctuation isolée (« ? », « ! »)
    reste collée au mot qui la précède, comme on l'écrirait. */
export function etiquettes(phrase) {
  const brut = phrase.trim().split(/\s+/);
  const out = [];
  for (const m of brut) {
    if (/^[?!:;»]+$/.test(m) && out.length) out[out.length - 1] += " " + m;
    else out.push(m);
  }
  return out;
}

function questionGrammaire(item) {
  if (item.type === "choix") {
    return {
      type: "qcm", consigne: item.pointTitre, invite: item.phrase, phraseLongue: true,
      reponse: item.reponse, aussi: [], options: melange(item.options), explication: item.explication,
    };
  }
  if (item.type === "ordre") {
    return {
      type: "ordre", consigne: "Remettez les mots dans l'ordre", invite: null,
      mots: melange(etiquettes(item.reponse)), reponse: item.reponse, aussi: item.aussi || [],
      explication: item.explication,
    };
  }
  return {
    type: "saisie", consigne: item.consigne, invite: item.phrase, phraseLongue: true,
    placeholder: item.reponse.split(" ").length > 2 ? "écrivez la phrase entière" : "votre réponse",
    reponse: item.reponse, aussi: item.aussi || [], explication: item.explication,
  };
}

const TOURNURES = [...Object.values(SAISONS), ...Object.values(SAISONS_FMS)].flatMap((s) => s.tournures || []);

function questionTournure(item, p) {
  // d'abord reconnaître la bonne réplique dans une situation, puis la compléter
  // les leurres viennent de la même unité : même thème, fonctions différentes
  if (!p || p.boite <= 2) {
    // les leurres viennent d'abord de la même unité, puis du même semestre
    const autres = (liste) => liste.filter((v) => v.id !== item.id && v.fr !== item.fr);
    const memeUnite = melange(autres(TOURNURES.filter((t) => t.unite === item.unite)));
    const memeSemestre = melange(autres(TOURNURES.filter((t) => t.unite !== item.unite && t.unite.split("-")[0] === item.unite.split("-")[0])));
    const leurres = [...new Set([...memeUnite, ...memeSemestre].map((v) => v.fr))].slice(0, 2);
    return {
      type: "qcm", consigne: "Que dites-vous ?", invite: item.situation, phraseLongue: true,
      reponse: item.fr, aussi: [], options: melange([item.fr, ...leurres]),
    };
  }
  const troue = item.fr.replace(item.trou, "………");
  return {
    type: "saisie", consigne: "Complétez la tournure", invite: troue, phraseLongue: true,
    aide: `${item.de} · ${item.situation}`, placeholder: "le mot qui manque",
    reponse: item.trou, aussi: [],
  };
}

/* Textes à trous : chaque blanc s'écrit {réponse/variante|indice} dans les
   données. « {suis allé/suis allée|aller} » → deux réponses acceptées,
   indice « aller » affiché dans le blanc. */
export function decouperTrous(texte) {
  const segments = [];
  const re = /\{([^}|]+)(?:\|([^}]*))?\}/g;
  let dernier = 0, m, n = 0;
  while ((m = re.exec(texte))) {
    if (m.index > dernier) segments.push({ texte: texte.slice(dernier, m.index) });
    segments.push({ blanc: n++, reponses: m[1].split("/").map((x) => x.trim()), indice: (m[2] || "").trim() });
    dernier = re.lastIndex;
  }
  if (dernier < texte.length) segments.push({ texte: texte.slice(dernier) });
  return segments;
}

function questionTexte(item) {
  const segments = decouperTrous(item.texte);
  return {
    type: "trous", consigne: item.consigne || "Complétez le texte", titre: item.titre, segments,
    blancs: segments.filter((x) => x.blanc !== undefined),
    reponse: segments.map((x) => (x.texte ?? x.reponses[0])).join(""),
  };
}

function questionPhrase(item, p) {
  if (!p || p.boite <= 1) {
    return {
      type: "ordre", consigne: "Traduisez en remettant les mots dans l'ordre", invite: item.de, phraseLongue: true,
      mots: melange(etiquettes(item.fr)), reponse: item.fr, aussi: item.aussi || [],
    };
  }
  return {
    type: "saisie", consigne: "Traduisez en français", invite: item.de, phraseLongue: true,
    placeholder: "écrivez la phrase en français", reponse: item.fr, aussi: item.aussi || [],
  };
}

/* ── point d'entrée ── */
export function question(item, p, vocabDuSemestre, semestreCourant, mode) {
  // phrase: true → la correction compare des phrases entières (voir correction.js)
  if (item.module === "grammaire") return { ...questionGrammaire(item), phrase: true };
  if (item.module === "tournure") return { ...questionTournure(item, p), phrase: true };
  if (item.module === "phrase") return { ...questionPhrase(item, p), phrase: true };
  if (item.module === "texte") return { ...questionTexte(item), phrase: true };

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
    // au subjonctif, la forme se donne avec « que » : que je parle, qu'il parle
    if (item.tempsCle === "subjonctif" && pronom) {
      const avec = avecPronom(forme, pronom)[0];
      const que = /^[aeiouéèêh]/i.test(avec) ? `qu'${avec}` : `que ${avec}`;
      const personne = item.personnes[i];
      const queP = /^[aeiouéèêh]/i.test(personne) ? `qu'${personne}` : `que ${personne}`;
      return {
        type: "saisie",
        consigne: "Conjuguez au subjonctif présent",
        invite: item.inf,
        aide: `${queP} … · ${item.de}`,
        placeholder: `${queP} …`,
        reponse: que,
        aussi: [avec, forme],
        astuce: "« que » et le pronom peuvent être écrits ou non.",
      };
    }
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
    // des leurres de même catégorie d'abord ; s'il en manque, n'importe quel mot du semestre
    const differents = vocabDuSemestre.filter((v) => v.fr !== item.fr && v.de !== item.de);
    const leurres = [...new Set([
      ...melange(differents.filter((v) => v.cat === item.cat)),
      ...melange(differents.filter((v) => v.cat !== item.cat)),
    ].map((v) => v.de))].slice(0, 3);
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

  if (p && p.boite >= 3 && mode !== "examen") {
    const v = questionVariante(item, vocabDuSemestre);
    if (v) return v;
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
