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
    // un adverbe s'intercale souvent entre l'auxiliaire et le participe
    // (« a beaucoup grandi », « as bien dormi ») : on tolère un seul mot
    // intermédiaire avant de renoncer à chercher plus loin en arrière.
    const ADVERBES_INTERCALES = new Set([
      "bien","mal","beaucoup","peu","déjà","encore","enfin","toujours",
      "souvent","vraiment","presque","trop","si","tant","jamais","rarement",
    ]);
    let debut = i;
    let sauts = 0;
    for (let k = i - 2; k >= 0; k -= 2) {
      let m = propre(mots[k]).toLowerCase();
      const elide = m.match(/^[a-z]'(.+)/);
      if (elide) m = elide[1];
      if (AUXILIAIRES.has(m) || (pronominal && REFLEXIFS.has(m))) { debut = k; break; }
      if (sauts === 0 && ADVERBES_INTERCALES.has(sansAcc(m))) { sauts = 1; continue; }
      break;
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

/* Nommer le temps réel de la forme masquée.

   Une collègue a fait remarquer, à raison, qu'« à la forme qui convient »
   ne dit rien : parfois le contexte suffit à deviner le temps, souvent non
   — surtout pour distinguer un imparfait d'un conditionnel, qui partagent
   les mêmes terminaisons. On compare donc la forme trouvée aux tables de
   conjugaison du verbe et on nomme le temps dans la consigne. */

const NOMS_TEMPS = {
  present: "présent", imparfait: "imparfait", futur: "futur simple",
  conditionnel: "conditionnel présent", subjonctif: "subjonctif présent",
  imperatif: "impératif", participepresent: "participe présent",
};
const AUX_PAR_FORME = {
  ai: ["avoir", "present", 0], as: ["avoir", "present", 1], a: ["avoir", "present", 2],
  avons: ["avoir", "present", 3], avez: ["avoir", "present", 4], ont: ["avoir", "present", 5],
  suis: ["être", "present", 0], es: ["être", "present", 1], est: ["être", "present", 2],
  sommes: ["être", "present", 3], êtes: ["être", "present", 4], sont: ["être", "present", 5],
  avais: ["avoir", "imparfait", 0], avait: ["avoir", "imparfait", 2],
  avions: ["avoir", "imparfait", 3], aviez: ["avoir", "imparfait", 4], avaient: ["avoir", "imparfait", 5],
  étais: ["être", "imparfait", 0], était: ["être", "imparfait", 2],
  étions: ["être", "imparfait", 3], étiez: ["être", "imparfait", 4], étaient: ["être", "imparfait", 5],
};

/* Un pronom sujet élidé (j'habite, n'exagère jamais…) colle au verbe sans
   espace : split(/\s+/) laisse alors « j'habite » comme un seul jeton, et
   « j'habite » ne correspond à aucune forme de la table. On l'enlève d'abord,
   comme on enlève déjà « me/te/se » pour un pronominal. */
const strip = (nu) => nu.replace(/^(me |te |se |nous |vous |m'|t'|s'|j'|n'|qu'|c')/i, "").trim();

function identifierTemps(verbe, forme) {
  const nu = sansAcc(strip(forme));
  const mots = nu.split(" ");
  if (mots.length > 1 && AUX_PAR_FORME[mots[0]]) {
    const [, auxTemps] = AUX_PAR_FORME[mots[0]];
    return auxTemps === "present" ? "passé composé" : "plus-que-parfait";
  }
  for (const cle of ["present", "imparfait", "futur", "conditionnel", "subjonctif"]) {
    const formes = verbe[cle];
    if (!formes) continue;
    if (formes.some((f) => sansAcc(f) === nu)) return NOMS_TEMPS[cle];
  }
  if (verbe.imperatif && verbe.imperatif.some((f) => sansAcc(f) === nu)) return "impératif";
  return null;
}

/* Repli pour les verbes hors des 220 du curriculum grammatical — la plupart
   du vocabulaire. On reconnaît le temps à sa terminaison, ce qui marche bien
   pour les verbes réguliers et pour l'essentiel des irréguliers, parce que
   les terminaisons personnelles ne varient pas d'un verbe à l'autre. Cela ne
   couvre pas le subjonctif, dont la terminaison chevauche le présent : dans
   ce cas on préfère se taire plutôt que d'affirmer un temps qui n'est peut-
   être pas le bon. */
function identifierTempsParTerminaison(forme) {
  const nu = sansAcc(strip(forme));
  const mots = nu.split(" ");
  if (mots.length > 1 && AUX_PAR_FORME[mots[0]]) {
    const [, auxTemps] = AUX_PAR_FORME[mots[0]];
    return auxTemps === "present" ? "passé composé" : "plus-que-parfait";
  }
  const dernier = mots[mots.length - 1];
  if (/(rais|rait|rions|riez|raient)$/.test(dernier)) return "conditionnel présent";
  if (/(rai|ras|ra|rons|rez|ront)$/.test(dernier)) return "futur simple";
  if (/(ais|ait|ions|iez|aient)$/.test(dernier)) return "imparfait";
  return null; // présent, subjonctif, impératif : trop ambigus sans la table
}

export const conjugaison = {
  cle: "conjugaison",
  nom: "Conjuguer dans la phrase",
  sous: "Le verbe est enlevé de la phrase. Le temps est indiqué : à vous de le conjuguer.",
  eligible: (i) => i.cat === "V" && Boolean(masquerVerbe(i.fr, i.exemple)),
  question: (item, tous, verbeParInf) => {
    const m = masquerVerbe(item.fr, item.exemple);
    const infNu = item.fr.replace(/^(se |s')/, "");
    const verbe = verbeParInf ? verbeParInf(infNu) : null;
    const temps = verbe
      ? identifierTemps(verbe, m.forme)
      : identifierTempsParTerminaison(m.forme);
    return {
      type: "saisie",
      consigne: temps
        ? `Conjuguez ce verbe au ${temps}`
        : "Mettez le verbe à la forme qui convient",
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
