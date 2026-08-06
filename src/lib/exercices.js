/* Exercices spéciaux.

   Cinq formats qui n'exigent aucun contenu nouveau : ils exploitent des champs
   déjà remplis dans les fiches. Deux visent des fautes propres aux
   germanophones — le genre des noms et les prépositions régies — les trois
   autres travaillent le réseau lexical.

   Chaque exercice déclare lui-même quels mots il peut interroger : inutile de
   proposer « les contraires » sur un vocabulaire qui n'en a pas. */

const nettoieRegistre = (s) => s.replace(/\s*\([^)]*\)/g, "").trim();
const membres = (champ) =>
  (champ || "").split("·").map(nettoieRegistre).filter(Boolean);
const sansArticle = (s) =>
  s.split(",")[0].trim().replace(/^(le |la |les |l'|un |une |des )/, "");

const melange = (a) => [...a].sort(() => Math.random() - 0.5);

/* ─────────── 1 · le genre des noms ─────────── */
/* La faute la plus tenace chez un germanophone : « le » et « la » ne
   correspondent à rien en allemand. Le cas difficile est celui des noms qui
   commencent par une voyelle — « l'étage », « l'ascenseur » — où l'article
   élidé ne dit rien. Ce sont eux qu'il faut interroger. */
export const genre = {
  cle: "genre",
  nom: "Le genre des noms",
  sous: "« le » ou « la » ? C'est la faute la plus fréquente, et l'allemand n'aide pas.",
  eligible: (i) =>
    i.cat === "N" && /^(masculin|féminin)$/.test((i.gram || "").trim()),
  question: (item) => ({
    type: "qcm",
    consigne: "Masculin ou féminin ?",
    invite: sansArticle(item.fr),
    aide: item.de,
    reponse: (item.gram || "").startsWith("masculin") ? "le" : "la",
    aussi: [],
    options: ["le", "la"],
  }),
};

/* ─────────── 2 · les prépositions régies ─────────── */
const PREPOSITIONS = ["à", "de", "d'", "en", "sur", "dans", "pour",
                      "contre", "avec", "par", "chez", "vers", "envers", "auprès de"];

function prepositionDe(construction) {
  if (!construction) return null;
  const mots = construction.split(/[\s·]+/);
  for (const m of mots) {
    const n = m.replace(/[,.]/g, "");
    if (PREPOSITIONS.includes(n)) return n;
  }
  return null;
}

export const preposition = {
  cle: "preposition",
  nom: "Les prépositions",
  sous: "« renoncer à » ou « renoncer de » ? Chaque verbe impose la sienne, et elle ne se devine pas.",
  eligible: (i) => Boolean(prepositionDe(i.construction)),
  question: (item) => {
    const bonne = prepositionDe(item.construction);
    const trou = item.construction.replace(
      new RegExp(`(^|[\\s·])${bonne.replace("'", "['’]")}([\\s·]|$)`),
      "$1 ……… $2"
    );
    const autres = melange(PREPOSITIONS.filter((p) => p !== bonne && p.length <= 5)).slice(0, 3);
    return {
      type: "qcm",
      consigne: "Quelle préposition ?",
      invite: trou.trim(),
      aide: `${item.fr} · ${item.de}`,
      reponse: bonne,
      aussi: [],
      options: melange([bonne, ...autres]),
    };
  },
};

/* ─────────── 3, 4, 5 · le réseau lexical ─────────── */
function questionChamp(champ, consigne) {
  return (item, tous) => {
    const bonnes = membres(item[champ]);
    const bonne = bonnes[Math.floor(Math.random() * bonnes.length)];
    const leurres = melange(
      tous
        .filter((a) => a.cle !== item.cle && a[champ] && a.cat === item.cat)
        .flatMap((a) => membres(a[champ]))
        .filter((m) => m && !bonnes.includes(m))
    ).slice(0, 3);
    return {
      type: "qcm",
      consigne,
      invite: item.fr,
      aide: item.de,
      reponse: bonne,
      aussi: bonnes,
      options: melange([bonne, ...leurres]),
    };
  };
}

export const synonyme = {
  cle: "synonyme", nom: "Les synonymes",
  sous: "Un mot qui veut dire à peu près la même chose. Utile pour éviter les répétitions à l'écrit.",
  eligible: (i) => membres(i.syn).length > 0,
  question: questionChamp("syn", "Quel mot a presque le même sens ?"),
};

export const contraire = {
  cle: "contraire", nom: "Les contraires",
  sous: "Le mot qui dit l'inverse. On retient souvent mieux deux mots opposés qu'un mot seul.",
  eligible: (i) => membres(i.ant).length > 0,
  question: questionChamp("ant", "Quel est le contraire ?"),
};

export const famille = {
  cle: "famille", nom: "Les familles de mots",
  sous: "Des mots construits sur la même racine. Un mot connu en fait deviner trois autres.",
  eligible: (i) => membres(i.famille).length > 0,
  question: questionChamp("famille", "Quel mot vient de la même famille ?"),
};

/* ─────────── 6 · la conjugaison en contexte ─────────── */
/* Les phrases d'exemple ont été écrites au temps du semestre : celles du S2
   sont au passé composé et à l'imparfait, celles du S3 au futur et au
   conditionnel. Masquer le verbe dans sa propre phrase donne donc, sans écrire
   une ligne, un exercice de conjugaison au temps travaillé — et en contexte,
   ce qu'un tableau de conjugaison ne fait jamais. */

const AUXILIAIRES = new Set([
  "ai","as","a","avons","avez","ont",
  "suis","es","est","sommes","êtes","sont",
  "avais","avait","avions","aviez","avaient",
  "étais","était","étions","étiez","étaient",
  "aurai","auras","aura","aurons","aurez","auront",
  "serai","seras","sera","serons","serez","seront",
  "aurais","aurait","aurions","auriez","auraient",
  "serais","serait","serions","seriez","seraient",
]);
const REFLEXIFS = new Set(["me","te","se","nous","vous","m'","t'","s'"]);

const sansAcc = (x) => x.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const propre = (x) => x.replace(/[.,;:!?«»"]/g, "");

/** Repère le groupe verbal dans la phrase et le remplace par un blanc. */
export function masquerVerbe(inf, exemple) {
  if (!exemple) return null;
  // « nous » et « vous » sont réfléchis pour « nous levons », sujets pour
  // « nous pourrions ». On ne les absorbe donc que si le verbe est pronominal.
  const pronominal = /^(se |s')/.test(inf);
  const base = inf.replace(/^(se |s')/, "");
  const radical = sansAcc(base).slice(0, Math.max(4, base.length - 3));

  const mots = exemple.split(/(\s+)/);
  for (let i = 0; i < mots.length; i++) {
    const brut = propre(mots[i]);
    if (brut.length < 3) continue;
    const noyau = sansAcc(brut).replace(/^[a-z]['’]/, "");
    if (!noyau.includes(radical)) continue;

    // on remonte pour absorber l'auxiliaire et le pronom réfléchi
    let debut = i;
    for (let k = i - 2; k >= 0; k -= 2) {
      // sans retirer les accents : « à » deviendrait « a », donc l'auxiliaire avoir
      const m = propre(mots[k]).toLowerCase();
      if (AUXILIAIRES.has(m) || (pronominal && REFLEXIFS.has(m))) debut = k;
      else break;
    }
    const groupe = mots.slice(debut, i + 1).join("").trim();
    const avant = mots.slice(0, debut).join("");
    const apres = mots.slice(i + 1).join("");
    const ponctuation = mots[i].slice(propre(mots[i]).length);
    const forme = propre(groupe);
    // si la phrase emploie l'infinitif, la question serait triviale :
    // l'aide affiche justement l'infinitif
    if (sansAcc(forme) === sansAcc(inf) || sansAcc(forme) === sansAcc(base)) return null;
    return {
      phrase: `${avant}………${ponctuation}${apres}`.replace(/\s+/g, " ").trim(),
      forme,
    };
  }
  return null;
}

export const conjugaison = {
  cle: "conjugaison",
  nom: "Conjuguer dans la phrase",
  sous: "Le verbe est enlevé de la phrase. À vous de le remettre au bon temps.",
  eligible: (i) => i.cat === "V" && Boolean(masquerVerbe(i.fr, i.exemple)),
  question: (item) => {
    const m = masquerVerbe(item.fr, item.exemple);
    return {
      type: "saisie",
      consigne: "Mettez le verbe à la forme qui convient",
      invite: m.phrase,
      aide: `${item.fr} · ${item.de}`,
      placeholder: "le verbe conjugué",
      reponse: m.forme,
      aussi: [],
      astuce: null,
    };
  },
};

export const EXERCICES = [conjugaison, genre, preposition, synonyme, contraire, famille];
export const exercicePar = (cle) => EXERCICES.find((e) => e.cle === cle);

/** Combien de mots chaque exercice peut interroger dans un vivier donné. */
export function disponibilite(items) {
  return EXERCICES.map((e) => ({
    ...e, nombre: items.filter(e.eligible).length,
  })).filter((e) => e.nombre >= 8);
}
