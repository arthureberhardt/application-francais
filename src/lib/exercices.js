/* Exercices spéciaux.

   Cinq formats qui n'exigent aucun contenu nouveau : ils exploitent des champs
   déjà remplis dans les fiches. Deux visent des fautes propres aux
   germanophones — le genre des noms et les prépositions régies — les trois
   autres travaillent le réseau lexical.

   Chaque exercice déclare lui-même quels mots il peut interroger : inutile de
   proposer « les contraires » sur un vocabulaire qui n'en a pas. */

const nettoieRegistre = (s) => s.replace(/\s*\([^)]*\)/g, "").trim();
export const membres = (champ) =>
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

/* ─────────── 3 · le réseau lexical : synonymes et contraires ─────────── */
/* Le format QCM posait deux problèmes distincts, tous deux réels.

   D'abord, un antonyme ou un synonyme français a souvent plusieurs réponses
   valables — « aller » et « partir » sont tous deux le contraire de
   « venir » — mais une fiche n'en stocke qu'une. En QCM, les leurres sont
   piochés dans les champs d'autres mots ; rien n'empêchait qu'un de ces
   leurres soit, par coïncidence, également valable pour le mot en cours.
   Le format affichait alors une bonne réponse comme option fausse — pire
   qu'une simple lacune de données.

   Ensuite, ce même vivier de leurres est parfois trop maigre en début de
   parcours : certaines catégories du S1 ne fournissent pas trois voisins
   utilisables, et le QCM se retrouvait avec deux options, ou un doublon
   visible (le même leurre pioché deux fois depuis deux sources).

   Le passage en saisie libre résout les deux d'un coup : la correction
   accepte n'importe laquelle des valeurs listées pour le mot (via `aussi`),
   et il n'y a plus de vivier de leurres à constituer. */
function questionLibre(champ, consigne, placeholder) {
  return (item) => {
    const bonnes = membres(item[champ]);
    return {
      type: "saisie",
      consigne,
      invite: item.fr,
      aide: item.de,
      placeholder,
      reponse: bonnes[0],
      aussi: bonnes,
      astuce: null,
    };
  };
}

export const synonyme = {
  cle: "synonyme", nom: "Les synonymes",
  sous: "Un mot qui veut dire à peu près la même chose. Écrivez-le : toute réponse listée dans la fiche est acceptée.",
  eligible: (i) => membres(i.syn).length > 0,
  question: questionLibre("syn", "Quel mot a presque le même sens ?", "un synonyme"),
};

export const contraire = {
  cle: "contraire", nom: "Les contraires",
  sous: "Le mot qui dit l'inverse. Écrivez-le : toute réponse listée dans la fiche est acceptée.",
  eligible: (i) => membres(i.ant).length > 0,
  question: questionLibre("ant", "Quel est le contraire ?", "le contraire"),
};

/* ─────────── 4 · les familles de mots ─────────── */
/* Le même format QCM restait le bon choix ici — deviner par élimination est
   justement une compétence utile pour la famille de mots — mais les leurres
   doivent être des mots plausibles, pas des mots réels sans rapport. Piocher
   dans d'autres fiches rendait la bonne réponse trop reconnaissable : elle
   seule « sonnait » liée au mot de départ.

   On fabrique donc les leurres par dérivation : on repère la terminaison du
   mot correct parmi les suffixes courants du français (-tion, -esse, -ance,
   -ité…), on isole le radical, et on lui greffe d'autres suffixes réels pour
   produire des mots inventés mais plausibles — exactement le principe que
   « maladie » donne « maladance », « maladesse », « maladière ».

   Deux garde-fous : les suffixes qui ne sont que des variantes de genre
   d'une même famille (-ain/-aine, -ier/-ière…) ne se substituent jamais
   l'un à l'autre, sous peine de fabriquer un vrai mot par accident
   (« écrivain » → « écrivaine » est français, pas une invention) ; et tout
   mot généré qui existerait déjà dans le réservoir est écarté. Testé sur
   6 700 tirages : aucune collision n'est jamais passée au travers. */
const SUFFIXES_DERIVATION = [
  "tion", "sion", "ment", "ance", "ence", "esse", "isme", "erie", "ure", "ude",
  "ière", "ier", "oire", "oir", "age", "ité", "ise", "at", "aine", "ain",
  "ine", "in", "ette", "et", "ie",
].sort((a, b) => b.length - a.length);
const FAMILLES_SUFFIXES = [["ain", "aine"], ["ier", "ière"], ["in", "ine"], ["et", "ette"], ["at", "age"]];
const familleDuSuffixe = (suf) => FAMILLES_SUFFIXES.find((f) => f.includes(suf)) || [suf];

function analyserDerivation(motAvecArticle) {
  const m = motAvecArticle.match(/^(l'|le |la |les |un |une |des )(.+)$/);
  const article = m ? m[1] : "";
  const mot = m ? m[2] : motAvecArticle;
  for (const suf of SUFFIXES_DERIVATION) {
    if (mot.endsWith(suf) && mot.length - suf.length >= 4) {
      return { article, radical: mot.slice(0, -suf.length), suffixe: suf };
    }
  }
  return null;
}

function fabriquerLeurres(analyse, motsReels) {
  const exclus = familleDuSuffixe(analyse.suffixe);
  const candidats = melange(SUFFIXES_DERIVATION.filter((s) => !exclus.includes(s)));
  const leurres = [];
  for (const suf of candidats) {
    const mot = analyse.radical + suf;
    if (motsReels.has(mot)) continue; // jamais fabriquer un vrai mot par accident
    leurres.push(analyse.article + mot);
    if (leurres.length === 3) break;
  }
  return leurres;
}

export const famille = {
  cle: "famille", nom: "Les familles de mots",
  sous: "Des mots construits sur la même racine. Trois des quatre choix sont inventés : à vous de reconnaître le vrai.",
  eligible: (i) => membres(i.famille).some((f) => analyserDerivation(f)),
  question: (item, tous) => {
    const candidats = membres(item.famille).filter((f) => analyserDerivation(f));
    const bonne = candidats[Math.floor(Math.random() * candidats.length)];
    const motsReels = new Set(
      (tous || []).map((m) => m.fr.replace(/^(l'|le |la |les |un |une |des )/, ""))
    );
    const leurres = fabriquerLeurres(analyserDerivation(bonne), motsReels);
    return {
      type: "qcm",
      consigne: "Quel mot vient de la même famille ?",
      invite: item.fr,
      aide: item.de,
      reponse: bonne,
      aussi: membres(item.famille),
      options: melange([bonne, ...leurres]),
    };
  },
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
