/* Saison S1 — Présent, impératif.
   Une unité = un parcours en six étapes : découvrir, s'entraîner, grammaire,
   tournures, construire des phrases, défi.

   Formats d'exercices de grammaire :
     choix  — phrase avec « ___ », options, réponse
     saisie — consigne + phrase à transformer ou compléter ; réponse (+ aussi)
     ordre  — réponse : la phrase à reconstituer à partir de ses mots          */

import { MOTS_S1, SURCHARGES_S1 } from "./s1_mots.js";

/* ─────────── Unités ─────────── */
export const UNITES_S1 = [
  {
    id: "S1-U0", numero: 0, titre: "Les bases", facultative: true,
    sous: "Pour revoir ce que vous avez appris au secondaire I.",
    oral: null, ecrit: null,
    verbes: ["parler", "écouter", "regarder", "travailler", "jouer", "entrer"],
    grammaire: ["G0-BASES"],
  },
  {
    id: "S1-U1", numero: 1, titre: "Moi et les autres",
    sous: "Se présenter, interviewer quelqu'un, faire un portrait.",
    oral: "Mener une interview", ecrit: "Écrire un portrait",
    verbes: ["être", "avoir", "s'appeler", "habiter", "aimer", "préférer", "connaître"],
    grammaire: ["G1-QUESTIONS", "G1-TONIQUES"],
  },
  {
    id: "S1-U2", numero: 2, titre: "Ma semaine",
    sous: "Raconter son quotidien, parler de ses loisirs, prendre rendez-vous.",
    oral: "Prendre rendez-vous", ecrit: "Message pour fixer un rendez-vous",
    verbes: ["faire", "aller", "se lever", "se coucher", "se dépêcher", "sortir", "dormir", "pouvoir", "vouloir"],
    grammaire: ["G2-PRESENT", "G2-NEGATION"],
  },
  {
    id: "S1-U3", numero: 3, titre: "Chez moi",
    sous: "Décrire sa chambre, un lieu, une image.",
    oral: "Décrire une chambre ou une image", ecrit: "Décrire sa chambre",
    verbes: ["mettre", "ouvrir"],
    grammaire: ["G3-ILYA", "G3-PREPOSITIONS"],
  },
  {
    id: "S1-U4", numero: 4, titre: "À table",
    sous: "Faire les courses, commander au restaurant.",
    oral: "Commander au restaurant", ecrit: "Liste de courses et menu",
    verbes: ["manger", "boire", "acheter", "prendre"],
    grammaire: ["G4-ARTICLES"],
  },
  {
    id: "S1-U5", numero: 5, titre: "En ville",
    sous: "Demander et expliquer son chemin, prendre les transports.",
    oral: "Demander et expliquer son chemin", ecrit: "Expliquer un itinéraire",
    verbes: ["venir", "descendre", "devoir", "savoir"],
    grammaire: ["G5-IMPERATIF", "G5-LIEUX"],
  },
  {
    id: "S1-U6", numero: 6, titre: "Un week-end à Paris",
    sous: "Planifier un séjour, écrire une carte postale.",
    oral: "Planifier un week-end", ecrit: "Carte postale de Paris",
    verbes: ["voir", "partir", "dire"],
    grammaire: ["G6-FUTURPROCHE", "G6-RELATIFS"],
  },
  {
    id: "S1-U7", numero: 7, titre: "Lire et résumer",
    sous: "Parler d'un roman policier, résumer un chapitre, faire le portrait d'un personnage.",
    oral: "Résumer un chapitre", ecrit: "Résumé et portrait de personnage",
    verbes: ["lire", "écrire"],
    grammaire: ["G7-RESUME"],
  },
].map((u) => ({ ...u, mots: MOTS_S1[u.id] || [] }));

export { SURCHARGES_S1 };

/* ─────────── Grammaire ─────────── */
const c = (id, phrase, options, reponse, explication) =>
  ({ id, type: "choix", phrase, options, reponse, explication });
const s = (id, consigne, phrase, reponse, aussi = [], explication = "") =>
  ({ id, type: "saisie", consigne, phrase, reponse, aussi, explication });
const o = (id, reponse, aussi = [], explication = "") =>
  ({ id, type: "ordre", reponse, aussi, explication });

export const GRAMMAIRE_S1 = [
  {
    id: "G0-BASES", unite: "S1-U0", titre: "Les bases",
    explication: [
      "Les noms ont un genre : **un** livre, **une** table ; **le** stylo, **la** classe, **l'**école (devant une voyelle), **les** élèves.",
      "**Être** et **avoir** : je suis, tu es, il est, nous sommes, vous êtes, ils sont · j'ai, tu as, il a, nous avons, vous avez, ils ont.",
      "Les verbes en **-er** : je parl**e**, tu parl**es**, il parl**e**, nous parl**ons**, vous parl**ez**, ils parl**ent**.",
      "La négation entoure le verbe : je **ne** parle **pas** italien · je **n'**aime **pas** le froid.",
      "**Il y a** + nom présente quelque chose : il y a un livre sur la table.",
    ],
    exercices: [
      c("g0-01", "C'est ___ appartement.", ["un", "une"], "un", "« appartement » est masculin."),
      c("g0-02", "C'est ___ école.", ["une", "un"], "une", "« école » est féminin."),
      c("g0-03", "J'___ seize ans.", ["ai", "suis", "a"], "ai", "L'âge se dit avec avoir : j'ai seize ans."),
      c("g0-04", "Nous ___ en première année.", ["sommes", "avons", "êtes"], "sommes", "être : nous sommes."),
      s("g0-05", "Conjuguez le verbe.", "Tu ___ (parler) français ?", "parles", ["tu parles"], "tu → -es"),
      s("g0-06", "Conjuguez le verbe.", "Ils ___ (écouter) de la musique.", "écoutent", ["ils écoutent"], "ils → -ent (qu'on n'entend pas)"),
      s("g0-07", "Conjuguez le verbe.", "Nous ___ (travailler) beaucoup.", "travaillons", ["nous travaillons"], "nous → -ons"),
      s("g0-08", "Mettez à la forme négative (ne… pas).", "J'aime les maths.", "Je n'aime pas les maths.", [], "Devant une voyelle, ne → n'."),
      c("g0-09", "___ un livre sur la table.", ["Il y a", "C'est", "Il est"], "Il y a", "Pour présenter un objet : il y a."),
      c("g0-10", "Les chaussures sont ___.", ["noires", "noirs", "noire"], "noires", "chaussures : féminin pluriel → noires."),
      c("g0-11", "Elle ___ à l'école à vélo.", ["va", "vais", "vont"], "va", "aller : elle va."),
      o("g0-12", "Je ne parle pas italien."),
    ],
  },

  {
    id: "G1-QUESTIONS", unite: "S1-U1", titre: "Poser une question",
    explication: [
      "Trois façons de poser la même question :",
      "1. **L'intonation** (à l'oral, familier) : Tu habites à Bâle ? · Tu habites où ?",
      "2. **Est-ce que** (neutre, toujours correct) : **Est-ce que** tu habites à Bâle ? · Où **est-ce que** tu habites ?",
      "3. **L'inversion** (à l'écrit, plus formel) : Habites-tu à Bâle ? · Où habites-tu ? Avec il / elle et une voyelle, on ajoute **-t-** : Habite-**t**-il ici ?",
      "Les mots interrogatifs : qui, où, quand, comment, pourquoi, combien, **qu'est-ce que** (quoi ? objet), **qu'est-ce qui** (quoi ? sujet), **quel / quelle / quels / quelles** + nom.",
    ],
    exercices: [
      c("g1q-01", "___ tu habites ? — À Liestal.", ["Où est-ce que", "Qu'est-ce que", "Pourquoi est-ce que"], "Où est-ce que", "La réponse est un lieu → où."),
      c("g1q-02", "___ tu fais le week-end ? — Je joue au foot.", ["Qu'est-ce que", "Qu'est-ce qui", "Est-ce que"], "Qu'est-ce que", "On demande une chose, complément du verbe → qu'est-ce que."),
      c("g1q-03", "___ âge as-tu ?", ["Quel", "Quelle", "Quels"], "Quel", "« âge » est masculin singulier."),
      c("g1q-04", "___ est ta matière préférée ?", ["Quelle", "Quel", "Quelles"], "Quelle", "« matière » est féminin singulier."),
      s("g1q-05", "Posez la question avec « est-ce que ».", "Tu aimes le sport ?", "Est-ce que tu aimes le sport ?"),
      s("g1q-06", "Posez la question avec l'inversion.", "Tu parles anglais ?", "Parles-tu anglais ?", [], "Verbe-sujet, avec un trait d'union."),
      s("g1q-07", "Posez la question avec l'inversion.", "Il aime la musique ?", "Aime-t-il la musique ?", [], "Verbe terminé par une voyelle + il → -t-."),
      o("g1q-08", "Depuis quand est-ce que tu joues du piano ?"),
      o("g1q-09", "Où habitent tes grands-parents ?"),
      c("g1q-10", "— ___ ne va pas ? — J'ai mal à la tête.", ["Qu'est-ce qui", "Qu'est-ce que", "Qui"], "Qu'est-ce qui", "La chose est sujet du verbe → qu'est-ce qui."),
      s("g1q-11", "Posez la question avec « d'où » et « est-ce que ».", "Réponse : « Je viens de Lugano. »", "D'où est-ce que tu viens ?", ["D'où est-ce que vous venez ?"]),
      c("g1q-12", "Quelle question est la plus formelle ?", ["D'où venez-vous ?", "D'où est-ce que vous venez ?", "Vous venez d'où ?"], "D'où venez-vous ?", "L'inversion est la forme la plus soutenue."),
    ],
  },

  {
    id: "G1-TONIQUES", unite: "S1-U1", titre: "Moi, toi, lui…",
    explication: [
      "Les pronoms toniques : **moi, toi, lui, elle, nous, vous, eux, elles**.",
      "On les utilise après une préposition : avec **moi**, chez **lui**, pour **eux**.",
      "Pour insister : **Moi**, je préfère le thé. · C'est **elle** qui a raison.",
      "Dans les réponses courtes : **Moi aussi.** (même avis, phrase positive) · **Moi non plus.** (même avis, phrase négative)",
    ],
    exercices: [
      c("g1t-01", "Tu viens avec ___ ?", ["moi", "je", "me"], "moi", "Après une préposition : moi."),
      c("g1t-02", "___, je préfère le thé.", ["Moi", "Je", "Me"], "Moi", "Pour insister : moi, je…"),
      c("g1t-03", "— Qui a gagné, Léa ? — Oui, c'est ___.", ["elle", "la", "lui"], "elle", "Après c'est : elle."),
      c("g1t-04", "Je dîne chez ___ (mes cousins).", ["eux", "ils", "leur"], "eux", "masculin pluriel → eux."),
      c("g1t-05", "J'aime le jazz. — ___ aussi !", ["Moi", "Je", "Me"], "Moi", "Réponse courte : moi aussi."),
      c("g1t-06", "Je n'aime pas les maths. — Moi ___ !", ["non plus", "aussi", "pas"], "non plus", "La phrase est négative → moi non plus."),
      s("g1t-07", "Remplacez le nom par un pronom.", "Je pars avec Marc.", "Je pars avec lui."),
      s("g1t-08", "Remplacez le nom par un pronom.", "Elle travaille pour ses parents.", "Elle travaille pour eux."),
    ],
  },

  {
    id: "G2-PRESENT", unite: "S1-U2", titre: "Le présent et les verbes pronominaux",
    explication: [
      "Verbes en **-er** : -e, -es, -e, -ons, -ez, -ent.",
      "Verbes **pronominaux** : le pronom change avec la personne. Je **me** lève, tu **te** lèves, il / elle **se** lève, nous **nous** levons, vous **vous** levez, ils / elles **se** lèvent.",
      "Devant une voyelle : me → **m'**, te → **t'**, se → **s'** (je m'habille, il s'ennuie).",
      "À l'impératif, le pronom passe après le verbe : **Lève-toi !** · **Dépêchez-vous !**",
    ],
    exercices: [
      s("g2p-01", "Conjuguez le verbe.", "Le matin, je ___ (se réveiller) à six heures.", "me réveille", ["je me réveille"]),
      s("g2p-02", "Conjuguez le verbe.", "Nous ___ (se coucher) tard le samedi.", "nous couchons", ["nous nous couchons"]),
      s("g2p-03", "Conjuguez le verbe.", "Tu ___ (s'habiller) très vite !", "t'habilles", ["tu t'habilles"], "te + voyelle → t'"),
      s("g2p-04", "Conjuguez le verbe.", "Ils ___ (se dépêcher) pour attraper le bus.", "se dépêchent", ["ils se dépêchent"]),
      s("g2p-05", "Conjuguez le verbe.", "Elle ___ (s'ennuyer) en cours de maths.", "s'ennuie", ["elle s'ennuie"]),
      s("g2p-06", "Conjuguez le verbe.", "Vous ___ (se reposer) le dimanche ?", "vous reposez", ["vous vous reposez"]),
      c("g2p-07", "Je ___ amuse bien à cette fête.", ["m'", "me", "se"], "m'", "me + voyelle → m'."),
      c("g2p-08", "(se lever, tu) ___ !", ["Lève-toi", "Te lève", "Lève-te"], "Lève-toi", "Impératif : verbe-toi."),
      c("g2p-09", "(se dépêcher, vous) ___ !", ["Dépêchez-vous", "Vous dépêchez", "Dépêchez-toi"], "Dépêchez-vous"),
      o("g2p-10", "Je me lève à sept heures."),
      o("g2p-11", "Est-ce que tu te couches tard ?"),
    ],
  },

  {
    id: "G2-NEGATION", unite: "S1-U2", titre: "La négation",
    explication: [
      "La négation a deux parties autour du verbe : **ne … pas**.",
      "D'autres formes : **ne … plus** (nicht mehr), **ne … jamais** (nie), **ne … rien** (nichts), **ne … personne** (niemand).",
      "Avec un verbe pronominal, le pronom reste avec le verbe : je **ne me** lève **pas** tôt.",
      "Après la négation, un / une / du / de la / des deviennent **de** : je ne mange **pas de** viande.",
      "En sujet : **Personne ne** vient. · **Rien ne** change.",
    ],
    exercices: [
      s("g2n-01", "Mettez à la forme négative (ne… jamais).", "Je fais toujours du sport.", "Je ne fais jamais de sport.", [], "du → de après la négation."),
      s("g2n-02", "Mettez à la forme négative (ne… plus).", "Il habite encore chez ses parents.", "Il n'habite plus chez ses parents."),
      s("g2n-03", "Mettez à la forme négative (ne… personne).", "Je vois quelqu'un.", "Je ne vois personne."),
      s("g2n-04", "Mettez à la forme négative (ne… rien).", "Elle mange quelque chose.", "Elle ne mange rien."),
      s("g2n-05", "Mettez à la forme négative (ne… pas).", "Je me lève tôt le dimanche.", "Je ne me lève pas tôt le dimanche.", [], "Le pronom reste avec le verbe."),
      c("g2n-06", "Tu sors encore ce soir ? — Non, je ne sors ___.", ["plus", "jamais", "rien"], "plus", "encore ↔ ne… plus."),
      c("g2n-07", "Il y a quelqu'un ? — Non, ___ n'est là.", ["personne", "rien", "jamais"], "personne"),
      c("g2n-08", "Qu'est-ce que tu fais ? — Je ne fais ___.", ["rien", "personne", "jamais"], "rien"),
      o("g2n-09", "Je ne bois jamais de café."),
      o("g2n-10", "Nous ne nous levons pas tôt."),
      s("g2n-11", "Corrigez la phrase.", "Je mange pas de viande.", "Je ne mange pas de viande.", [], "À l'écrit, le « ne » est obligatoire."),
    ],
  },

  {
    id: "G3-ILYA", unite: "S1-U3", titre: "Il y a, c'est, les possessifs",
    explication: [
      "**Il y a** + un / une / des / du… présente ce qui se trouve quelque part : Dans ma chambre, **il y a** un lit.",
      "**C'est** + nom avec article ou + adjectif décrit : **C'est** un lit confortable. · **C'est** pratique.",
      "Les possessifs s'accordent avec l'objet possédé : **mon** / **ma** / **mes**, **ton** / **ta** / **tes**, **son** / **sa** / **ses**, **notre** / **nos**, **votre** / **vos**, **leur** / **leurs**.",
      "Devant une voyelle, ma / ta / sa deviennent **mon / ton / son** : **mon** armoire, **son** étagère.",
    ],
    exercices: [
      c("g3i-01", "Dans ma chambre, ___ un grand lit.", ["il y a", "c'est", "il est"], "il y a"),
      c("g3i-02", "___ un lit très confortable.", ["C'est", "Il y a", "Il est"], "C'est"),
      c("g3i-03", "J'adore ___ armoire.", ["mon", "ma", "mes"], "mon", "armoire : féminin mais voyelle → mon."),
      c("g3i-04", "Où sont ___ clés ?", ["mes", "mon", "ma"], "mes"),
      c("g3i-05", "Paul range ___ chambre.", ["sa", "son", "ses"], "sa", "Le possessif s'accorde avec « chambre », pas avec Paul."),
      c("g3i-06", "Mes parents ont un appartement. ___ appartement est grand.", ["Leur", "Leurs", "Son"], "Leur"),
      c("g3i-07", "Nous aimons ___ quartier.", ["notre", "nos", "votre"], "notre"),
      o("g3i-08", "Il y a une lampe à côté du lit."),
    ],
  },

  {
    id: "G3-PREPOSITIONS", unite: "S1-U3", titre: "Situer dans l'espace",
    explication: [
      "**sur** (auf), **sous** (unter), **dans** (in), **devant** (vor), **derrière** (hinter), **entre** (zwischen), **contre** (an, gegen).",
      "Avec **de** : à côté **de**, en face **de**, au fond **de**, au-dessus **de**, au milieu **de**.",
      "Attention : de + le = **du** · de + les = **des** · de la et de l' ne changent pas. À côté **du** lit, au fond **de la** pièce.",
    ],
    exercices: [
      s("g3p-01", "Complétez (de + la).", "Le tapis est au milieu ___ pièce.", "de la"),
      s("g3p-02", "Complétez (de + le).", "La lampe est à côté ___ lit.", "du", [], "de + le = du"),
      s("g3p-03", "Complétez.", "La salle de bains est au fond ___ couloir.", "du"),
      s("g3p-04", "Complétez (de + les).", "Le miroir est au-dessus ___ étagères.", "des", [], "de + les = des"),
      c("g3p-05", "Le chat dort ___ le lit. (unter)", ["sous", "sur", "dans"], "sous"),
      c("g3p-06", "Les livres sont ___ l'étagère. (auf)", ["sur", "sous", "contre"], "sur"),
      c("g3p-07", "Mon bureau est ___ la fenêtre. (gegenüber)", ["en face de", "à côté de", "derrière"], "en face de"),
      o("g3p-08", "Mon bureau est en face de la fenêtre."),
    ],
  },

  {
    id: "G4-ARTICLES", unite: "S1-U4", titre: "Le, un, du : les articles",
    explication: [
      "**Le / la / les** : en général, ce qu'on aime ou déteste. J'adore **le** chocolat.",
      "**Un / une / des** : une chose qu'on peut compter. J'achète **une** pomme, **des** pommes.",
      "**Du / de la / de l'** (partitif) : une partie, une quantité qu'on ne compte pas. Je mange **du** pain, **de la** salade, je bois **de l'**eau.",
      "Après une **négation** : **de / d'**. Je ne mange **pas de** viande. Il n'y a **plus d'**eau.",
      "Après une **quantité** : **de / d'**. Un kilo **de** pommes, une bouteille **d'**eau, beaucoup **de** pain.",
    ],
    exercices: [
      c("g4-01", "J'adore ___ chocolat.", ["le", "du", "un"], "le", "Goût en général → le."),
      c("g4-02", "Le matin, je mange ___ pain.", ["du", "le", "de"], "du", "Une partie → du."),
      c("g4-03", "Tu veux ___ eau ?", ["de l'", "du", "de la"], "de l'"),
      c("g4-04", "Elle achète ___ pommes.", ["des", "de", "les"], "des"),
      c("g4-05", "Je ne mange pas ___ viande.", ["de", "de la", "la"], "de", "Après la négation → de."),
      c("g4-06", "Il n'y a plus ___ lait.", ["de", "du", "le"], "de"),
      c("g4-07", "Je voudrais un kilo ___ tomates.", ["de", "des", "du"], "de", "Après une quantité → de."),
      c("g4-08", "Il boit beaucoup ___ café.", ["de", "du", "le"], "de"),
      s("g4-09", "Complétez avec du, de la ou de l'.", "Je prends ___ salade.", "de la"),
      s("g4-10", "Complétez avec du, de la ou de l'.", "Nous achetons ___ pain.", "du"),
      s("g4-11", "Mettez à la forme négative (ne… pas).", "J'ai du pain.", "Je n'ai pas de pain."),
      s("g4-12", "Mettez à la forme négative (ne… plus).", "Je bois de l'eau.", "Je ne bois plus d'eau.", [], "de + voyelle → d'."),
      o("g4-13", "Je voudrais une bouteille d'eau, s'il vous plaît."),
      o("g4-14", "Il n'y a pas de fromage dans le frigo."),
    ],
  },

  {
    id: "G5-IMPERATIF", unite: "S1-U5", titre: "L'impératif",
    explication: [
      "Pour donner un ordre, un conseil, un itinéraire : trois personnes (tu, nous, vous), sans pronom sujet.",
      "Tourne ! · Tournons ! · Tournez !",
      "Verbes en **-er** : pas de **s** avec tu. Tu tournes → **Tourne** à gauche !",
      "Irréguliers : **va**, **sois**, **aie**, **fais**, **prends**, **viens**.",
      "Négation : **Ne** traverse **pas** ici ! · Pronominal : Dépêche-**toi** !",
    ],
    exercices: [
      s("g5i-01", "Mettez à l'impératif (vous).", "tourner à gauche", "Tournez à gauche."),
      s("g5i-02", "Mettez à l'impératif (tu).", "traverser la place", "Traverse la place.", [], "Verbe en -er : pas de s."),
      s("g5i-03", "Mettez à l'impératif (vous).", "prendre la ligne 4", "Prenez la ligne 4.", ["Prenez la ligne quatre."]),
      s("g5i-04", "Mettez à l'impératif (tu).", "aller tout droit", "Va tout droit.", [], "aller : va (sans s)."),
      s("g5i-05", "Mettez à l'impératif (nous).", "descendre à la prochaine station", "Descendons à la prochaine station."),
      c("g5i-06", "(tu) ___ ! Le bus arrive.", ["Dépêche-toi", "Te dépêche", "Dépêches-toi"], "Dépêche-toi"),
      c("g5i-07", "Ne ___ pas la rue ici !", ["traverse", "traverses", "traverser"], "traverse"),
      o("g5i-08", "Prenez la deuxième rue à gauche."),
    ],
  },

  {
    id: "G5-LIEUX", unite: "S1-U5", titre: "À, au, en, chez",
    explication: [
      "**à** + ville : à Paris, à Bâle.",
      "à + le = **au** (au cinéma, au Portugal) · à + les = **aux** (aux États-Unis) · **à la** pharmacie · **à l'**hôtel.",
      "**en** + pays féminin : en France, en Suisse, en Italie.",
      "**chez** + personne : chez le médecin, chez moi, chez mes grands-parents.",
    ],
    exercices: [
      c("g5l-01", "Je vais ___ cinéma.", ["au", "à le", "à la"], "au", "à + le = au."),
      c("g5l-02", "Elle va ___ pharmacie.", ["à la", "au", "en"], "à la"),
      c("g5l-03", "On part ___ France.", ["en", "au", "à"], "en"),
      c("g5l-04", "Je vais ___ Paris.", ["à", "en", "au"], "à"),
      c("g5l-05", "Il va ___ médecin.", ["chez le", "au", "à le"], "chez le", "Une personne → chez."),
      c("g5l-06", "Nous allons ___ États-Unis.", ["aux", "au", "en"], "aux"),
      s("g5l-07", "Complétez.", "Je retrouve mes amis ___ gare.", "à la"),
      s("g5l-08", "Complétez.", "Ce soir, je dors ___ ma grand-mère.", "chez"),
    ],
  },

  {
    id: "G6-FUTURPROCHE", unite: "S1-U6", titre: "Bientôt, en ce moment, à l'instant",
    explication: [
      "**Futur proche** : aller + infinitif. Demain, on **va visiter** le Louvre.",
      "**Passé récent** : venir de + infinitif. Nous **venons d'arriver**.",
      "**Être en train de** + infinitif : une action en cours. Je **suis en train de** manger.",
      "Négation du futur proche : on **ne va pas** prendre le bus.",
    ],
    exercices: [
      s("g6f-01", "Mettez au futur proche.", "Nous (visiter) le musée d'Orsay.", "Nous allons visiter le musée d'Orsay."),
      s("g6f-02", "Mettez au futur proche.", "Tu (prendre) le métro ?", "Tu vas prendre le métro ?"),
      s("g6f-03", "Mettez au passé récent.", "Le train (arriver).", "Le train vient d'arriver."),
      s("g6f-04", "Mettez au passé récent.", "Je (réserver) l'auberge de jeunesse.", "Je viens de réserver l'auberge de jeunesse."),
      s("g6f-05", "Utilisez « être en train de ».", "Ils (manger) des crêpes.", "Ils sont en train de manger des crêpes."),
      c("g6f-06", "Demain, je ___ me promener sur les quais.", ["vais", "viens de", "suis en train de"], "vais"),
      c("g6f-07", "Attends, je ___ téléphoner à ma mère, je finis dans deux minutes.", ["suis en train de", "viens de", "vais"], "suis en train de"),
      s("g6f-08", "Mettez à la forme négative.", "On va prendre le bus.", "On ne va pas prendre le bus."),
      o("g6f-09", "Nous allons visiter la tour Eiffel demain."),
    ],
  },

  {
    id: "G6-RELATIFS", unite: "S1-U6", titre: "Qui, que, où",
    explication: [
      "Les pronoms relatifs relient deux phrases.",
      "**qui** remplace le sujet : C'est un quartier. Le quartier est animé. → C'est un quartier **qui** est animé.",
      "**que / qu'** remplace le complément : C'est le musée. Je préfère ce musée. → C'est le musée **que** je préfère.",
      "**où** remplace un lieu (ou un moment) : C'est la ville **où** j'habite.",
    ],
    exercices: [
      c("g6r-01", "C'est un quartier ___ est très animé.", ["qui", "que", "où"], "qui", "Le quartier est sujet de « est »."),
      c("g6r-02", "C'est le musée ___ je préfère.", ["que", "qui", "où"], "que"),
      c("g6r-03", "C'est la ville ___ j'habite.", ["où", "que", "qui"], "où"),
      c("g6r-04", "Montmartre est le quartier ___ on va visiter samedi.", ["qu'", "qui", "où"], "qu'", "que + voyelle → qu'."),
      c("g6r-05", "J'ai un ami ___ habite à Paris.", ["qui", "que", "où"], "qui"),
      s("g6r-06", "Reliez avec « où ».", "C'est le café. On se retrouve dans ce café.", "C'est le café où on se retrouve.", ["C'est le café où l'on se retrouve."]),
      o("g6r-07", "C'est le café où on se retrouve."),
    ],
  },

  {
    id: "G7-RESUME", unite: "S1-U7", titre: "Résumer une histoire",
    explication: [
      "Un résumé s'écrit **au présent**, à la 3e personne, **avec ses propres mots**. Il ne donne pas son avis.",
      "Il répond à quatre questions : **qui ?** **où ?** **quand ?** **que se passe-t-il ?**",
      "Les connecteurs donnent l'ordre : **d'abord**, **ensuite**, **puis**, **finalement / à la fin**.",
      "Et la logique : **mais** (opposition), **parce que** (cause), **donc / alors** (conséquence).",
    ],
    exercices: [
      c("g7-01", "___, Maigret arrive sur les lieux du crime. Ensuite, il interroge les témoins.", ["D'abord", "Finalement", "Donc"], "D'abord"),
      c("g7-02", "Le suspect a un alibi, ___ il n'est pas le coupable.", ["donc", "mais", "parce que"], "donc"),
      c("g7-03", "Maigret est fatigué ___ il travaille toute la nuit.", ["parce qu'", "donc", "mais"], "parce qu'"),
      c("g7-04", "Le témoin parle beaucoup, ___ il ne dit rien d'important.", ["mais", "donc", "parce que"], "mais"),
      c("g7-05", "Un résumé s'écrit…", ["au présent", "au passé composé", "au futur"], "au présent"),
      c("g7-06", "Dans un résumé, on…", ["utilise ses propres mots", "recopie des phrases du livre", "donne son avis à chaque phrase"], "utilise ses propres mots"),
      s("g7-07", "Conjuguez au présent.", "Maigret ___ (allumer) sa pipe.", "allume"),
      s("g7-08", "Conjuguez au présent.", "Le commissaire ___ (prendre) un taxi.", "prend"),
      s("g7-09", "Conjuguez au présent.", "Les témoins ___ (dire) la vérité ?", "disent"),
      c("g7-10", "Quelle phrase est un bon début de résumé ?", ["L'histoire se passe à Paris, en hiver.", "J'adore ce livre.", "Le livre a cent quatre-vingts pages."], "L'histoire se passe à Paris, en hiver."),
      o("g7-11", "Au début de l'histoire, Maigret est à son bureau."),
      o("g7-12", "Finalement, le coupable avoue tout."),
    ],
  },
];

/* ─────────── Tournures ─────────── */
// trou : le mot masqué quand on demande de compléter la tournure
const t = (id, unite, fr, de, situation, trou) => ({ id, unite, fr, de, situation, trou });

export const TOURNURES_S1 = [
  t("T1-01", "S1-U1", "Je me présente : je m'appelle…", "Ich stelle mich vor: Ich heisse…", "Vous commencez une présentation devant la classe.", "présente"),
  t("T1-02", "S1-U1", "Est-ce que je peux te poser une question ?", "Darf ich dir eine Frage stellen?", "Vous voulez commencer une interview poliment.", "poser"),
  t("T1-03", "S1-U1", "Qu'est-ce qui te plaît dans ton sport ?", "Was gefällt dir an deinem Sport?", "Vous voulez savoir ce que la personne aime dans son sport.", "plaît"),
  t("T1-04", "S1-U1", "Depuis combien de temps est-ce que tu joues ?", "Seit wie lange spielst du?", "Vous demandez la durée d'une activité.", "temps"),
  t("T1-05", "S1-U1", "Il a l'air sympathique.", "Er sieht sympathisch aus.", "Vous décrivez l'impression que donne une personne sur une photo.", "l'air"),
  t("T1-06", "S1-U1", "Elle est plutôt timide.", "Sie ist eher schüchtern.", "Vous nuancez un trait de caractère.", "plutôt"),
  t("T1-07", "S1-U1", "Ce qui me plaît chez elle, c'est sa patience.", "Was mir an ihr gefällt, ist ihre Geduld.", "Vous dites la qualité que vous aimez chez une amie.", "chez"),
  t("T1-08", "S1-U1", "Merci pour tes réponses !", "Danke für deine Antworten!", "Vous terminez l'interview.", "réponses"),
  t("T1-09", "S1-U1", "Nous avons un point commun : la musique.", "Wir haben eine Gemeinsamkeit: die Musik.", "Vous découvrez que vous aimez la même chose que la personne.", "commun"),
  t("T1-10", "S1-U1", "Selon lui, le sport, c'est la vie.", "Für ihn ist Sport das Leben.", "Vous rapportez l'avis de la personne interviewée.", "Selon"),

  t("T2-01", "S1-U2", "Tu es libre samedi ?", "Hast du am Samstag Zeit?", "Vous proposez une activité à un ami.", "libre"),
  t("T2-02", "S1-U2", "Ça te dit d'aller au cinéma ?", "Hast du Lust, ins Kino zu gehen?", "Vous faites une proposition à un ami.", "dit"),
  t("T2-03", "S1-U2", "Ça me va.", "Das passt mir.", "Vous acceptez l'heure proposée.", "va"),
  t("T2-04", "S1-U2", "Je suis désolé, je ne peux pas.", "Tut mir leid, ich kann nicht.", "Vous refusez poliment une invitation.", "désolé"),
  t("T2-05", "S1-U2", "On se retrouve où ?", "Wo treffen wir uns?", "Vous voulez fixer le lieu du rendez-vous.", "retrouve"),
  t("T2-06", "S1-U2", "À quelle heure ?", "Um wie viel Uhr?", "Vous demandez l'heure du rendez-vous.", "heure"),
  t("T2-07", "S1-U2", "Je voudrais prendre rendez-vous, s'il vous plaît.", "Ich möchte bitte einen Termin vereinbaren.", "Vous téléphonez chez le dentiste.", "rendez-vous"),
  t("T2-08", "S1-U2", "Est-ce que jeudi à 16 heures vous convient ?", "Passt Ihnen Donnerstag um 16 Uhr?", "Vous proposez poliment une date à un adulte.", "convient"),
  t("T2-09", "S1-U2", "On peut reporter à demain ?", "Können wir es auf morgen verschieben?", "Vous ne pouvez pas aujourd'hui, mais demain, oui.", "reporter"),
  t("T2-10", "S1-U2", "D'habitude, je me lève à six heures.", "Normalerweise stehe ich um sechs Uhr auf.", "Vous décrivez votre routine du matin.", "D'habitude"),

  t("T3-01", "S1-U3", "Dans ma chambre, il y a un lit et un bureau.", "In meinem Zimmer gibt es ein Bett und einen Schreibtisch.", "Vous commencez la description de votre chambre.", "il y a"),
  t("T3-02", "S1-U3", "Ce que j'aime dans ma chambre, c'est la lumière.", "Was ich an meinem Zimmer mag, ist das Licht.", "Vous dites ce que vous préférez dans votre chambre.", "Ce que"),
  t("T3-03", "S1-U3", "Sur l'image, on voit une famille.", "Auf dem Bild sieht man eine Familie.", "Vous commencez à décrire une photo.", "voit"),
  t("T3-04", "S1-U3", "Au premier plan, il y a deux enfants.", "Im Vordergrund gibt es zwei Kinder.", "Vous décrivez ce qui est devant, sur l'image.", "premier"),
  t("T3-05", "S1-U3", "À l'arrière-plan, on voit des montagnes.", "Im Hintergrund sieht man Berge.", "Vous décrivez le fond de l'image.", "l'arrière-plan"),
  t("T3-06", "S1-U3", "En haut à gauche, il y a le soleil.", "Oben links ist die Sonne.", "Vous situez un détail sur l'image.", "haut"),
  t("T3-07", "S1-U3", "On dirait que c'est l'été.", "Es sieht aus, als wäre Sommer.", "Vous faites une hypothèse sur l'image.", "dirait"),
  t("T3-08", "S1-U3", "L'ambiance est calme.", "Die Stimmung ist ruhig.", "Vous décrivez l'atmosphère de l'image.", "ambiance"),
  t("T3-09", "S1-U3", "Mon lit est contre le mur.", "Mein Bett steht an der Wand.", "Vous dites où se trouve votre lit.", "contre"),
  t("T3-10", "S1-U3", "Il manque une chaise.", "Es fehlt ein Stuhl.", "Vous dites qu'un objet n'est pas là.", "manque"),

  t("T4-01", "S1-U4", "Je voudrais un café, s'il vous plaît.", "Ich hätte gern einen Kaffee, bitte.", "Vous commandez poliment.", "voudrais"),
  t("T4-02", "S1-U4", "Pour moi, ce sera le poisson.", "Für mich bitte den Fisch.", "Le serveur demande ce que vous prenez.", "sera"),
  t("T4-03", "S1-U4", "Vous avez une table pour deux ?", "Haben Sie einen Tisch für zwei?", "Vous entrez dans un restaurant avec un ami.", "table"),
  t("T4-04", "S1-U4", "Qu'est-ce que vous me conseillez ?", "Was empfehlen Sie mir?", "Vous ne savez pas quoi choisir sur la carte.", "conseillez"),
  t("T4-05", "S1-U4", "L'addition, s'il vous plaît.", "Die Rechnung, bitte.", "Vous voulez payer.", "L'addition"),
  t("T4-06", "S1-U4", "Je peux payer par carte ?", "Kann ich mit Karte bezahlen?", "Vous n'avez pas d'argent liquide.", "carte"),
  t("T4-07", "S1-U4", "C'est combien ?", "Wie viel kostet das?", "Vous voulez connaître un prix au marché.", "combien"),
  t("T4-08", "S1-U4", "Il me faut un kilo de pommes.", "Ich brauche ein Kilo Äpfel.", "Vous faites les courses au marché.", "faut"),
  t("T4-09", "S1-U4", "Ce sera tout ?", "Ist das alles?", "Le vendeur demande si vous voulez autre chose.", "tout"),
  t("T4-10", "S1-U4", "Bon appétit !", "En Guete! (Guten Appetit!)", "Le repas commence.", "appétit"),

  t("T5-01", "S1-U5", "Pardon, pour aller à la gare ?", "Entschuldigung, wie komme ich zum Bahnhof?", "Vous demandez votre chemin à un passant.", "aller"),
  t("T5-02", "S1-U5", "C'est loin d'ici ?", "Ist es weit von hier?", "Vous voulez savoir la distance.", "loin"),
  t("T5-03", "S1-U5", "Prenez la deuxième rue à gauche.", "Nehmen Sie die zweite Strasse links.", "Vous expliquez le chemin à un touriste.", "deuxième"),
  t("T5-04", "S1-U5", "Continuez tout droit jusqu'au feu.", "Gehen Sie geradeaus bis zur Ampel.", "Vous indiquez une direction.", "Continuez"),
  t("T5-05", "S1-U5", "C'est à cinq minutes à pied.", "Es ist fünf Minuten zu Fuss.", "Vous indiquez la distance.", "pied"),
  t("T5-06", "S1-U5", "Vous ne pouvez pas le manquer.", "Sie können es nicht verfehlen.", "Vous rassurez la personne.", "manquer"),
  t("T5-07", "S1-U5", "Quelle ligne est-ce que je dois prendre ?", "Welche Linie muss ich nehmen?", "Vous êtes dans le métro et vous hésitez.", "ligne"),
  t("T5-08", "S1-U5", "Descendez à la station Concorde.", "Steigen Sie an der Station Concorde aus.", "Vous expliquez où quitter le métro.", "Descendez"),
  t("T5-09", "S1-U5", "Excusez-moi, je suis perdu.", "Entschuldigung, ich habe mich verirrt.", "Vous ne savez plus où vous êtes.", "perdu"),
  t("T5-10", "S1-U5", "Merci beaucoup, bonne journée !", "Vielen Dank, einen schönen Tag!", "Vous remerciez la personne.", "journée"),

  t("T6-01", "S1-U6", "Samedi matin, on va à Montmartre.", "Am Samstagmorgen gehen wir nach Montmartre.", "Vous présentez le programme du week-end.", "va"),
  t("T6-02", "S1-U6", "Ça vaut la peine de monter à la tour Eiffel.", "Es lohnt sich, auf den Eiffelturm zu steigen.", "Vous recommandez une visite.", "peine"),
  t("T6-03", "S1-U6", "C'est un endroit où on mange très bien.", "Das ist ein Ort, wo man sehr gut isst.", "Vous décrivez un lieu à Paris.", "endroit"),
  t("T6-04", "S1-U6", "On vient d'arriver à Paris.", "Wir sind gerade in Paris angekommen.", "Vous commencez une carte postale.", "vient"),
  t("T6-05", "S1-U6", "Il fait beau et tout va bien.", "Das Wetter ist schön und alles ist gut.", "Vous donnez des nouvelles dans une carte postale.", "tout"),
  t("T6-06", "S1-U6", "Je t'embrasse.", "Liebe Grüsse.", "Vous terminez une carte postale à un proche.", "embrasse"),
  t("T6-07", "S1-U6", "À bientôt !", "Bis bald!", "Vous dites au revoir à l'écrit.", "bientôt"),
  t("T6-08", "S1-U6", "Combien coûte l'entrée ?", "Wie viel kostet der Eintritt?", "Vous êtes à la caisse du musée.", "l'entrée"),
  t("T6-09", "S1-U6", "Il faut réserver à l'avance.", "Man muss im Voraus reservieren.", "Vous expliquez une condition de visite.", "l'avance"),
  t("T6-10", "S1-U6", "On a le temps de faire un tour en bateau.", "Wir haben Zeit für eine Bootsfahrt.", "Vous dites qu'une activité est possible dans le programme.", "temps"),

  t("T7-01", "S1-U7", "L'histoire se passe à Paris.", "Die Geschichte spielt in Paris.", "Vous indiquez le lieu du roman.", "passe"),
  t("T7-02", "S1-U7", "Il s'agit d'un meurtre.", "Es geht um einen Mord.", "Vous dites le sujet du roman.", "s'agit"),
  t("T7-03", "S1-U7", "Le personnage principal est un commissaire.", "Die Hauptfigur ist ein Kommissar.", "Vous présentez le héros.", "principal"),
  t("T7-04", "S1-U7", "Au début de l'histoire, Maigret est à son bureau.", "Am Anfang der Geschichte ist Maigret in seinem Büro.", "Vous résumez la première partie.", "début"),
  t("T7-05", "S1-U7", "Le commissaire découvre que le témoin ment.", "Der Kommissar entdeckt, dass der Zeuge lügt.", "Vous racontez un moment important de l'enquête.", "découvre"),
  t("T7-06", "S1-U7", "À la fin, le coupable avoue.", "Am Ende gesteht der Täter.", "Vous résumez la dernière partie.", "fin"),
  t("T7-07", "S1-U7", "Ce chapitre montre que Maigret est patient.", "Dieses Kapitel zeigt, dass Maigret geduldig ist.", "Vous expliquez ce qu'on apprend dans un chapitre.", "montre"),
  t("T7-08", "S1-U7", "C'est un homme calme et patient.", "Er ist ein ruhiger und geduldiger Mann.", "Vous faites le portrait de Maigret.", "patient"),
  t("T7-09", "S1-U7", "Ce que j'aime dans ce roman, c'est l'ambiance.", "Was mir an diesem Roman gefällt, ist die Stimmung.", "Vous donnez votre avis sur le livre.", "j'aime"),
  t("T7-10", "S1-U7", "Je le recommande parce qu'il est plein de suspense.", "Ich empfehle ihn, weil er sehr spannend ist.", "Vous conseillez le livre à un ami.", "recommande"),
];

/* ─────────── Phrases à construire puis à traduire ─────────── */
const p = (id, unite, de, fr, aussi = []) => ({ id, unite, de, fr, aussi });

export const PHRASES_S1 = [
  p("P0-01", "S1-U0", "Ich habe einen Bruder und eine Schwester.", "J'ai un frère et une sœur."),
  p("P0-02", "S1-U0", "Meine Mutter ist Lehrerin.", "Ma mère est professeure.", ["Ma mère est prof.", "Ma mère est enseignante."]),
  p("P0-03", "S1-U0", "Heute regnet es.", "Aujourd'hui, il pleut.", ["Il pleut aujourd'hui."]),
  p("P0-04", "S1-U0", "Ich spreche nicht Italienisch.", "Je ne parle pas italien."),
  p("P0-05", "S1-U0", "Wo ist mein Kugelschreiber?", "Où est mon stylo ?"),
  p("P0-06", "S1-U0", "Am Montag haben wir Französisch.", "Lundi, nous avons français.", ["Nous avons français lundi.", "On a français lundi.", "Le lundi, nous avons français."]),

  p("P1-01", "S1-U1", "Ich heisse Lena und wohne in Basel.", "Je m'appelle Lena et j'habite à Bâle.", ["Je m'appelle Lena et j'habite Bâle."]),
  p("P1-02", "S1-U1", "Seit wann spielst du Gitarre?", "Depuis quand est-ce que tu joues de la guitare ?", ["Depuis quand joues-tu de la guitare ?", "Tu joues de la guitare depuis quand ?"]),
  p("P1-03", "S1-U1", "Meine Schwester ist neugierig und sehr offen.", "Ma sœur est curieuse et très ouverte."),
  p("P1-04", "S1-U1", "Ich verstehe mich gut mit meinem Bruder.", "Je m'entends bien avec mon frère."),
  p("P1-05", "S1-U1", "Was ist deine Leidenschaft?", "Quelle est ta passion ?", ["C'est quoi, ta passion ?"]),
  p("P1-06", "S1-U1", "Er ist eher schüchtern, aber sehr nett.", "Il est plutôt timide, mais très gentil.", ["Il est plutôt timide mais très gentil.", "Il est plutôt timide, mais très sympathique."]),
  p("P1-07", "S1-U1", "Woher kommst du?", "D'où est-ce que tu viens ?", ["D'où viens-tu ?", "Tu viens d'où ?"]),
  p("P1-08", "S1-U1", "Ich mag Sport, und du?", "J'aime le sport, et toi ?", ["J'aime le sport et toi ?"]),

  p("P2-01", "S1-U2", "Ich stehe um sieben Uhr auf.", "Je me lève à sept heures."),
  p("P2-02", "S1-U2", "Hast du am Mittwoch Zeit?", "Tu es libre mercredi ?", ["Est-ce que tu es libre mercredi ?", "Es-tu libre mercredi ?"]),
  p("P2-03", "S1-U2", "Ich gehe nie ins Kino.", "Je ne vais jamais au cinéma."),
  p("P2-04", "S1-U2", "Wir treffen uns vor dem Bahnhof.", "On se retrouve devant la gare.", ["Nous nous retrouvons devant la gare."]),
  p("P2-05", "S1-U2", "Tut mir leid, ich kann nicht.", "Je suis désolé, je ne peux pas.", ["Je suis désolée, je ne peux pas.", "Désolé, je ne peux pas.", "Désolée, je ne peux pas."]),
  p("P2-06", "S1-U2", "Beeil dich, der Bus kommt!", "Dépêche-toi, le bus arrive !"),
  p("P2-07", "S1-U2", "Normalerweise mache ich meine Hausaufgaben am Abend.", "D'habitude, je fais mes devoirs le soir.", ["D'habitude je fais mes devoirs le soir."]),
  p("P2-08", "S1-U2", "Am Sonntag stehe ich nicht früh auf.", "Le dimanche, je ne me lève pas tôt.", ["Dimanche, je ne me lève pas tôt.", "Je ne me lève pas tôt le dimanche."]),

  p("P3-01", "S1-U3", "In meinem Zimmer gibt es ein Bett und einen Schreibtisch.", "Dans ma chambre, il y a un lit et un bureau.", ["Dans ma chambre il y a un lit et un bureau."]),
  p("P3-02", "S1-U3", "Die Lampe steht neben dem Bett.", "La lampe est à côté du lit."),
  p("P3-03", "S1-U3", "Meine Bücher sind auf dem Regal.", "Mes livres sont sur l'étagère."),
  p("P3-04", "S1-U3", "Die Katze schläft unter dem Tisch.", "Le chat dort sous la table."),
  p("P3-05", "S1-U3", "Im Hintergrund sieht man einen Berg.", "À l'arrière-plan, on voit une montagne.", ["À l'arrière-plan on voit une montagne."]),
  p("P3-06", "S1-U3", "Unsere Wohnung ist klein, aber praktisch.", "Notre appartement est petit, mais pratique.", ["Notre appartement est petit mais pratique."]),
  p("P3-07", "S1-U3", "Ihr Zimmer ist immer sauber.", "Sa chambre est toujours propre."),
  p("P3-08", "S1-U3", "Der Teppich liegt in der Mitte des Zimmers.", "Le tapis est au milieu de la chambre.", ["Le tapis est au milieu de la pièce."]),

  p("P4-01", "S1-U4", "Ich hätte gern ein Glas Wasser, bitte.", "Je voudrais un verre d'eau, s'il vous plaît.", ["Je voudrais un verre d'eau, s'il te plaît."]),
  p("P4-02", "S1-U4", "Ich esse kein Fleisch.", "Je ne mange pas de viande."),
  p("P4-03", "S1-U4", "Wir kaufen Brot und Käse.", "Nous achetons du pain et du fromage.", ["On achète du pain et du fromage."]),
  p("P4-04", "S1-U4", "Die Rechnung, bitte!", "L'addition, s'il vous plaît !"),
  p("P4-05", "S1-U4", "Ein Kilo Tomaten, bitte.", "Un kilo de tomates, s'il vous plaît."),
  p("P4-06", "S1-U4", "Ich liebe Schokolade.", "J'adore le chocolat.", ["J'aime le chocolat."]),
  p("P4-07", "S1-U4", "Haben Sie ein vegetarisches Gericht?", "Vous avez un plat végétarien ?", ["Avez-vous un plat végétarien ?", "Est-ce que vous avez un plat végétarien ?"]),
  p("P4-08", "S1-U4", "Als Nachspeise nehme ich einen Kuchen.", "Comme dessert, je prends un gâteau.", ["En dessert, je prends un gâteau.", "Comme dessert je prends un gâteau."]),

  p("P5-01", "S1-U5", "Entschuldigung, wie komme ich zum Bahnhof?", "Pardon, pour aller à la gare ?", ["Excusez-moi, pour aller à la gare ?", "Pardon, comment est-ce que je vais à la gare ?"]),
  p("P5-02", "S1-U5", "Gehen Sie geradeaus und dann links.", "Allez tout droit, puis à gauche.", ["Allez tout droit et puis à gauche.", "Continuez tout droit, puis tournez à gauche."]),
  p("P5-03", "S1-U5", "Die Apotheke ist neben der Post.", "La pharmacie est à côté de la poste."),
  p("P5-04", "S1-U5", "Ich gehe ins Museum.", "Je vais au musée."),
  p("P5-05", "S1-U5", "Wir fahren nach Frankreich.", "Nous allons en France.", ["On va en France."]),
  p("P5-06", "S1-U5", "Nehmen Sie die Linie 4.", "Prenez la ligne 4.", ["Prenez la ligne quatre."]),
  p("P5-07", "S1-U5", "Ist es weit von hier?", "C'est loin d'ici ?", ["Est-ce que c'est loin d'ici ?"]),
  p("P5-08", "S1-U5", "Überquere die Strasse nicht hier!", "Ne traverse pas la rue ici !"),

  p("P6-01", "S1-U6", "Morgen werden wir den Louvre besichtigen.", "Demain, nous allons visiter le Louvre.", ["Demain, on va visiter le Louvre.", "Demain nous allons visiter le Louvre."]),
  p("P6-02", "S1-U6", "Wir sind gerade angekommen.", "Nous venons d'arriver.", ["On vient d'arriver."]),
  p("P6-03", "S1-U6", "Ich bin gerade am Essen.", "Je suis en train de manger."),
  p("P6-04", "S1-U6", "Das ist das Viertel, das ich bevorzuge.", "C'est le quartier que je préfère."),
  p("P6-05", "S1-U6", "Das ist ein Café, wo man gut isst.", "C'est un café où on mange bien.", ["C'est un café où l'on mange bien."]),
  p("P6-06", "S1-U6", "Die Aussicht ist wunderschön.", "La vue est magnifique."),
  p("P6-07", "S1-U6", "Man muss im Voraus reservieren.", "Il faut réserver à l'avance."),
  p("P6-08", "S1-U6", "Am Abend gehen wir an der Seine spazieren.", "Le soir, nous nous promenons sur les quais de la Seine.", ["Le soir, on se promène sur les quais de la Seine.", "Le soir, on se promène au bord de la Seine.", "Le soir, nous nous promenons au bord de la Seine."]),

  p("P7-01", "S1-U7", "Die Geschichte spielt in Paris.", "L'histoire se passe à Paris."),
  p("P7-02", "S1-U7", "Es geht um einen Mord in einem Hotel.", "Il s'agit d'un meurtre dans un hôtel."),
  p("P7-03", "S1-U7", "Die Hauptfigur ist ein Kommissar.", "Le personnage principal est un commissaire."),
  p("P7-04", "S1-U7", "Zuerst befragt Maigret die Zeugen.", "D'abord, Maigret interroge les témoins.", ["D'abord Maigret interroge les témoins."]),
  p("P7-05", "S1-U7", "Der Verdächtige hat ein Alibi.", "Le suspect a un alibi."),
  p("P7-06", "S1-U7", "Am Ende gesteht der Täter.", "À la fin, le coupable avoue.", ["Finalement, le coupable avoue."]),
  p("P7-07", "S1-U7", "Maigret verdächtigt den Ehemann, weil er lügt.", "Maigret soupçonne le mari parce qu'il ment."),
  p("P7-08", "S1-U7", "Ich empfehle diesen Roman.", "Je recommande ce roman."),
];

/* ─────────── Défis : la mini-production de fin d'unité ─────────── */
export const DEFIS_S1 = {
  "S1-U1": {
    consigne: "Écrivez le portrait d'une personne de votre entourage (5 à 8 phrases) : qui elle est, son caractère, ses passions, votre point commun.",
    motsImposes: ["curieux / curieuse", "s'entendre bien avec", "la passion", "depuis"],
    controle: [
      "J'écris au présent.",
      "J'utilise au moins trois adjectifs de caractère, bien accordés.",
      "J'utilise les quatre éléments imposés.",
      "J'ai relu les accents et les terminaisons des verbes.",
    ],
    modele: "Mon cousin Elias a dix-sept ans et il habite à Zurich. Il est curieux et très ouvert : il parle avec tout le monde. Sa passion, c'est la photographie. Il fait des photos depuis trois ans et il gagne parfois des concours. Il est un peu têtu, mais il est généreux. Nous avons un point commun : nous adorons la montagne. Je m'entends très bien avec lui.",
  },
  "S1-U2": {
    consigne: "Écrivez un message à un ami pour fixer un rendez-vous ce week-end : proposez une activité, un jour, une heure et un lieu. Votre ami n'est pas libre samedi : proposez une autre solution.",
    motsImposes: ["être libre", "se retrouver", "reporter", "d'habitude"],
    controle: [
      "Il y a une activité, un jour, une heure et un lieu.",
      "J'utilise une négation (ne… pas / jamais / plus).",
      "Les verbes pronominaux sont corrects (je me…, on se…).",
      "J'utilise les quatre éléments imposés.",
    ],
    modele: "Salut Noé ! Ça te dit d'aller à la piscine ce week-end ? D'habitude, je vais à la piscine le samedi, mais tu n'es pas libre samedi, alors on peut reporter à dimanche. On se retrouve devant la gare à 14 heures ? Si l'heure ne te va pas, dis-moi. À plus !",
  },
  "S1-U3": {
    consigne: "Décrivez votre chambre (ou la chambre de vos rêves) en 6 à 8 phrases : les meubles, leur place, ce que vous aimez.",
    motsImposes: ["il y a", "à côté de", "au-dessus de", "contre"],
    controle: [
      "J'utilise « il y a » pour présenter les objets.",
      "Après « de », j'écris du / de la / de l' / des correctement.",
      "Les possessifs sont bien accordés (mon / ma / mes).",
      "J'utilise les quatre éléments imposés.",
    ],
    modele: "Ma chambre est petite, mais elle est claire. Il y a un lit contre le mur et, à côté du lit, une petite lampe. En face de la fenêtre, il y a mon bureau avec mon ordinateur. Au-dessus du bureau, j'ai une étagère pour mes livres. Mes vêtements sont dans l'armoire, à côté de la porte. Ce que j'aime dans ma chambre, c'est le grand tapis au milieu de la pièce.",
  },
  "S1-U4": {
    consigne: "Vous organisez un repas pour quatre amis. Écrivez la liste des courses avec les quantités, puis expliquez en quatre phrases ce que vous préparez.",
    motsImposes: ["un kilo de", "une bouteille de", "du / de la", "pas de"],
    controle: [
      "Après une quantité, j'écris « de » (un kilo de pommes).",
      "Après une négation, j'écris « de » (pas de viande).",
      "J'utilise du / de la / de l' pour une partie.",
      "J'utilise les quatre éléments imposés.",
    ],
    modele: "Liste : un kilo de tomates, une bouteille d'huile d'olive, deux paquets de pâtes, du fromage, du pain, de la salade et une bouteille de jus de pomme. Je prépare des pâtes à la tomate parce que tout le monde aime ça. Mon ami Luca est végétarien, alors il n'y a pas de viande. En entrée, il y a de la salade. Comme dessert, je fais un gâteau au chocolat.",
  },
  "S1-U5": {
    consigne: "Une correspondante française arrive à la gare de votre ville. Expliquez-lui par écrit le chemin de la gare jusqu'à chez vous (6 à 8 phrases).",
    motsImposes: ["prends", "tout droit", "traverse", "à côté de"],
    controle: [
      "J'utilise l'impératif avec « tu » : prends, tourne, traverse… (sans « s » pour les verbes en -er).",
      "J'utilise au moins trois prépositions de lieu.",
      "Les articles après « à » sont corrects (au, à la, aux).",
      "J'utilise les quatre éléments imposés.",
    ],
    modele: "Quand tu sors de la gare, prends le bus numéro 10. Descends à l'arrêt « Marché ». Ensuite, traverse la place et va tout droit jusqu'au feu. Au feu, tourne à gauche. Ma maison est la troisième à droite, à côté de la boulangerie. C'est à cinq minutes à pied. Si tu es perdue, appelle-moi !",
  },
  "S1-U6": {
    consigne: "Écrivez une carte postale de Paris à un ami (6 à 8 phrases) : où vous êtes, ce que vous venez de faire, ce que vous êtes en train de faire et ce que vous allez faire demain.",
    motsImposes: ["venir de", "être en train de", "aller + infinitif", "où"],
    controle: [
      "J'ai une formule de début et de fin (Cher… / Je t'embrasse).",
      "J'utilise le passé récent, « être en train de » et le futur proche.",
      "J'utilise au moins un pronom relatif (qui, que, où).",
      "J'utilise les quatre éléments imposés.",
    ],
    modele: "Chère Mila, nous venons d'arriver à Paris et il fait beau ! En ce moment, je suis en train de boire un chocolat chaud dans un café où les serveurs sont très sympathiques. Cet après-midi, nous visitons Montmartre : la vue sur Paris est magnifique. Demain, nous allons visiter le Louvre et voir la Joconde, un tableau qui est très célèbre. Le soir, on va se promener sur les quais. Je t'embrasse, Léo",
  },
  "S1-U7": {
    consigne: "Écrivez le résumé du chapitre que vous venez de lire (6 à 8 phrases), au présent, avec vos propres mots.",
    motsImposes: ["l'histoire se passe", "d'abord / ensuite", "le personnage principal", "parce que"],
    controle: [
      "J'écris au présent.",
      "J'écris avec mes propres mots, sans recopier le livre.",
      "J'utilise des connecteurs (d'abord, ensuite, mais, donc, finalement).",
      "Je réponds aux questions : qui ? où ? quand ? que se passe-t-il ?",
    ],
    modele: "(Exemple inventé) L'histoire se passe à Paris, en hiver, dans les années cinquante. Le personnage principal est le commissaire Maigret, un homme calme et patient. D'abord, la police trouve un homme mort dans un petit hôtel. Ensuite, Maigret va sur les lieux du crime et il interroge les témoins. La concierge dit qu'elle ne voit personne, mais Maigret ne la croit pas, parce qu'elle a l'air nerveuse. Finalement, le commissaire trouve un indice important dans la chambre.",
  },
};

/* ─────────── La saison, au format commun (voir saisons/index.js) ─────────── */
export default {
  numero: 1,
  titre: "Se présenter, décrire, s'orienter",
  unites: UNITES_S1,
  grammaire: GRAMMAIRE_S1,
  tournures: TOURNURES_S1,
  phrases: PHRASES_S1,
  textes: [],
  defis: DEFIS_S1,
  evaluations: {},
  lecture: null,
  surcharges: SURCHARGES_S1,
};
