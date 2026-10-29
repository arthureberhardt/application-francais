/* FMS S3 — Se projeter, travailler (A2+).
   Le futur simple et le conditionnel de politesse, tournés vers les métiers
   (santé, social, pédagogie, arts), le stage, la cuisine et le bien-être.
   Ligne de lecture : « Frères de sang » (Mikaël Ollivier), voir f3_freres.js. */

import { reprendre, c, s, o, t, p, x, f, carnet } from "./aides.js";
import {
  MOTS_FRERES, GRAMMAIRE_FRERES, TOURNURES_FRERES, PHRASES_FRERES, TEXTES_FRERES, EVALUATION_FRERES, LECTURE_FRERES,
} from "./f3_freres.js";

/* ─────────── fiches nouvelles ─────────── */
const MOTS_AJOUTS = [
  /* U1 · Des métiers */
  f("F3-001", "l'infirmier, l'infirmière", "der Pfleger, die Pflegefachfrau", "N", "Travail", "L'infirmière passe dans les chambres à sept heures."),
  f("F3-002", "l'éducateur, l'éducatrice de l'enfance", "der Kindererzieher, die Kindererzieherin", "N", "Travail", "Mon frère est éducateur de l'enfance dans une crèche."),
  f("F3-003", "l'assistant socio-éducatif, l'assistante socio-éducative", "die Fachperson Betreuung (FaBe)", "N", "Travail", "Elle fait un apprentissage d'assistante socio-éducative."),
  f("F3-004", "le cuisinier, la cuisinière", "der Koch, die Köchin", "N", "Travail", "Le cuisinier prépare le menu du jour.", { piege: "la cuisinière = aussi der Kochherd." }),
  f("F3-005", "le, la graphiste", "der Grafiker, die Grafikerin", "N", "Travail", "La graphiste a dessiné l'affiche du festival."),
  f("F3-006", "l'aide-soignant, l'aide-soignante", "der Pflegehelfer, die Pflegehelferin", "N", "Travail", "L'aide-soignant aide les patients à se lever."),
  f("F3-007", "le pharmacien, la pharmacienne", "der Apotheker, die Apothekerin", "N", "Travail", "Demandez conseil au pharmacien."),
  f("F3-008", "le, la physiothérapeute", "der Physiotherapeut, die Physiotherapeutin", "N", "Travail", "Après mon accident, je suis allé chez la physiothérapeute."),
  f("F3-009", "le travailleur social, la travailleuse sociale", "der Sozialarbeiter, die Sozialarbeiterin", "N", "Travail", "La travailleuse sociale aide les familles en difficulté."),
  f("F3-010", "la crèche", "die Kinderkrippe, die Kita", "N", "Travail", "Ma petite sœur va à la crèche trois jours par semaine."),
  /* U2 · Mon stage */
  f("F3-015", "le lieu de stage", "der Praktikumsort", "N", "Orientation", "Mon lieu de stage est un EMS à Liestal."),
  f("F3-016", "le, la responsable de stage", "die Praktikumsbetreuerin, der Praktikumsbetreuer", "N", "Orientation", "Ma responsable de stage est très patiente."),
  f("F3-017", "le rapport de stage", "der Praktikumsbericht", "N", "Orientation", "Je dois rendre mon rapport de stage en juin."),
  /* U3 · En cuisine */
  f("F3-020", "le tablier", "die Schürze", "N", "Alimentation", "Mettez un tablier avant de cuisiner."),
  f("F3-021", "l'hygiène (f.)", "die Hygiene", "N", "Alimentation", "En cuisine, l'hygiène est très importante."),
  f("F3-022", "la pâte", "der Teig", "N", "Alimentation", "Laissez reposer la pâte pendant une heure.", { piege: "les pâtes (pl.) = die Teigwaren ; la pâte = der Teig." }),
  f("F3-023", "faire cuire", "kochen (lassen), garen", "L", "Alimentation", "Faites cuire les pommes de terre vingt minutes."),
  f("F3-024", "la pomme de terre", "die Kartoffel", "N", "Alimentation", "J'épluche les pommes de terre."),
  ...MOTS_FRERES,
];

/* ─────────── unités ─────────── */
const UNITES = [
  {
    id: "F3-U0", numero: 0, titre: "Les bases", facultative: true,
    sous: "Pronoms, passé composé et imparfait, accords : revoir avant d'avancer.",
    oral: null, ecrit: null,
    verbes: ["voir", "recevoir"],
    grammaire: ["G2-PRON", "GF3-BASES"],
    mots: [
      "S2-041", "S2-042", "S2-044", "S2-150", "S2-149", "S1-149", "S2-047", "S2-093", "S2-097",
      "S2-124", "S2-137", "S2-138", "S1-A006", "S2-050", "S2-051", "S2-053", "S2-054",
    ],
  },
  {
    id: "F3-U1", numero: 1, titre: "Des métiers", semaines: "1–3",
    sous: "Présenter un métier de la santé, du social, de l'éducation ou des arts.",
    oral: "Présenter un métier", ecrit: "Le métier de mes rêves",
    verbes: ["devenir", "aider", "soigner"],
    grammaire: ["G3-FUTF", "GF3-METIERS"],
    mots: [
      "S3-056", "S3-057", "S3-058", "S3-059", "S3-063", "S3-065", "S3-099", "S3-101", "S3-108", "S3-019",
      "N3-001", "N3-002", "S3-069", "N1-865", "F3-001", "F3-002", "F3-003", "F3-004", "F3-005", "F3-006",
      "F3-007", "F3-008", "F3-009", "F3-010",
    ],
  },
  {
    id: "F3-U2", numero: 2, titre: "Mon stage", semaines: "4–5",
    sous: "Décrire un lieu de stage, écrire à un employeur.",
    oral: "Appeler un lieu de stage", ecrit: "Une demande de stage",
    verbes: ["demander", "remercier", "proposer", "postuler"],
    grammaire: ["G3-CONDP", "G3-CONSTR"],
    mots: [
      "S3-052", "F3-015", "F3-016", "F3-017", "S3-A013", "S3-A014", "S3-A015", "S3-B1030", "S3-011",
      "S3-060", "S3-061", "S3-062", "S3-064", "S3-107", "S3-095", "S3-097", "S3-A029", "S3-A036",
      "S3-A051", "S3-B1001", "S3-A086", "S3-A088", "S3-109",
    ],
  },
  {
    id: "F3-U3", numero: 3, titre: "En cuisine", semaines: "6–8",
    sous: "Lire et donner une recette, cuisiner en groupe.",
    oral: "Expliquer une recette en direct", ecrit: "Une recette pour la classe",
    verbes: ["cuisiner", "préparer", "goûter", "boire", "mélanger"],
    grammaire: ["GF3-IMPPRON", "G4-ENQ"],
    mots: [
      "S2-140", "F3-023", "S2-A014", "S2-A015", "S2-A016", "S2-A017", "S2-A019", "S2-A020", "S4-034",
      "S4-036", "S4-037", "S4-088", "S4-090", "S4-116", "S4-A100", "S2-A012", "S2-A009", "S2-A013",
      "F3-020", "F3-021", "F3-022", "F3-024", "S4-111", "S4-112",
    ],
  },
  {
    id: "F3-U4", numero: 4, titre: "Prendre soin de soi", semaines: "9–10",
    sous: "Sommeil, stress, alimentation : demander et donner des conseils.",
    oral: "Conseiller un ou une camarade", ecrit: "Réponse à un courrier des lecteurs",
    verbes: ["se sentir", "guérir", "éviter", "se détendre"],
    grammaire: ["G3-CONSEIL", "G1-TONIQUES"],
    evaluation: "F3-EV-COCE",
    mots: [
      "N3-021", "N3-022", "N3-024", "N3-026", "N3-027", "N3-029", "N3-030", "N3-031", "N3-032", "N3-033",
      "S1-049", "S1-A100", "S1-051", "S3-118", "S5-A065", "S1-A093", "S1-A096", "S1-144", "S3-089",
      "S1-B111", "N3-034",
    ],
  },
  {
    id: "F3-U5", numero: 5, titre: "Communiquer", semaines: "11–12",
    sous: "Mail, téléphone, message vocal : se faire comprendre.",
    oral: "Laisser un message vocal", ecrit: "Un mail formel",
    verbes: ["répondre", "envoyer", "appeler", "contacter"],
    grammaire: ["G4-ENY", "GF3-MAIL"],
    mots: [
      "S3-038", "S3-039", "S3-040", "S3-084", "S3-085", "S3-086", "S3-111", "S3-112", "S3-149", "S3-A074",
      "S3-A075", "S3-A076", "S3-A077", "S3-A079", "S3-A080", "S3-A081", "S3-B1023", "S3-B1012",
      "N4-020", "N4-021", "N4-026", "S1-024", "S2-043",
    ],
  },
  {
    id: "F3-U6", numero: 6, titre: "Plus tard", semaines: "13–15",
    sous: "Projets et rêves : se projeter.",
    oral: "Présenter son projet d'avenir", ecrit: "Lettre à moi dans dix ans",
    verbes: ["espérer", "souhaiter", "décider", "réussir"],
    grammaire: ["G3-FUTE", "G4-SI1"],
    mots: [
      "PR-001", "PR-002", "PR-003", "PR-005", "PR-006", "PR-007", "PR-008", "PR-013", "PR-014", "PR-017",
      "PR-018", "PR-020", "S3-023", "S3-024", "S3-005", "S3-007", "S3-070", "S3-071", "S3-144", "N3-003",
      "N3-004", "N3-005", "N3-008", "S3-140", "S3-139",
    ],
  },
];

/* ─────────── grammaire ─────────── */
const GRAMMAIRE = [
  reprendre("G2-PRON", "F3-U0"),
  {
    id: "GF3-BASES", unite: "F3-U0", titre: "Passé composé ou imparfait ? L'accord du participe",
    explication: [
      "**Imparfait** : le décor, la description, l'habitude (il **faisait** beau, j'**allais** souvent à la piscine). **Passé composé** : une action précise, terminée (soudain, il **a commencé** à pleuvoir).",
      "Avec **être**, le participe s'accorde avec le sujet : elle est parti**e**, ils sont arrivé**s**, elles se sont levé**es**.",
      "Avec **avoir**, le participe ne s'accorde pas avec le sujet : elle a mang**é**, ils ont fin**i**.",
      "Les verbes avec être : aller, venir, arriver, partir, entrer, sortir, monter, descendre, naître, mourir, rester, tomber, retourner, devenir, revenir + tous les verbes pronominaux.",
    ],
    exercices: [
      c("f3ba-01", "Quand j'étais petite, je ___ souvent chez ma tante.", ["dormais", "ai dormi", "dormirai"], "dormais", "Habitude → imparfait."),
      c("f3ba-02", "Hier, je ___ à 6 heures.", ["me suis levé", "me levais", "m'ai levé"], "me suis levé"),
      c("f3ba-03", "Il ___ beau, alors nous sommes sortis.", ["faisait", "a fait", "fera"], "faisait"),
      c("f3ba-04", "Mes cousines sont ___ hier.", ["arrivées", "arrivé", "arrivés"], "arrivées"),
      c("f3ba-05", "Elles ont ___ toute la journée.", ["travaillé", "travaillées", "travaillés"], "travaillé", "Avec avoir : pas d'accord avec le sujet."),
      c("f3ba-06", "Nous ___ à la maison parce qu'il pleuvait.", ["sommes restés", "avons restés", "restions resté"], "sommes restés"),
      c("f3ba-07", "Ma grand-mère est ___ en 1950.", ["née", "né", "nées"], "née"),
      s("f3ba-08", "Mettez au passé composé.", "Elle part à huit heures.", "Elle est partie à huit heures."),
      s("f3ba-09", "Mettez au passé composé.", "Nous nous dépêchons.", "Nous nous sommes dépêchés.", ["Nous nous sommes dépêchées."]),
      s("f3ba-10", "Mettez au passé composé.", "Ils prennent le train.", "Ils ont pris le train."),
      s("f3ba-11", "Mettez à l'imparfait.", "Nous avons un chien.", "Nous avions un chien."),
      s("f3ba-12", "Complétez au passé composé.", "Mes amies ___ (venir) à ma fête.", "sont venues"),
      o("f3ba-13", "Il pleuvait quand nous sommes sortis."),
      o("f3ba-14", "Elle est tombée et elle s'est fait mal."),
      o("f3ba-15", "Avant, je jouais au foot tous les samedis."),
    ],
  },
  reprendre("G3-FUTF", "F3-U1"),
  {
    id: "GF3-METIERS", unite: "F3-U1", titre: "Les noms de métiers au féminin · c'est / il est",
    explication: [
      "Beaucoup de métiers ont une forme masculine et féminine : infirmi**er** → infirmi**ère**, cuisini**er** → cuisini**ère**, vend**eur** → vend**euse**, éduca**teur** → éduca**trice**, pharmac**ien** → pharmac**ienne**, assistant → assistant**e**.",
      "Certains noms sont identiques : **le / la** graphiste, **le / la** physiothérapeute, **le / la** journaliste, **le / la** secrétaire.",
      "Les formes féminines en **-e** sont de plus en plus courantes : professeur**e**, auteur**e** ou autr**ice**, ingénieur**e**.",
      "**Il / Elle est** + métier, **sans article** : Elle **est infirmière**. Mais **C'est un / une** + métier : **C'est une** infirmière très gentille.",
      "**Travailler comme** + métier : Il travaille **comme** cuisinier. · **Travailler dans** + lieu : dans un hôpital, dans une crèche.",
    ],
    exercices: [
      c("f3me-01", "Mon père est infirmier, ma mère est ___ aussi.", ["infirmière", "infirmiere", "infirmieuse"], "infirmière"),
      c("f3me-02", "Elle travaille comme ___ dans une crèche.", ["éducatrice", "éducateuse", "éducateur"], "éducatrice"),
      c("f3me-03", "Ma tante est ___. Elle vend des chaussures.", ["vendeuse", "vendrice", "vendeure"], "vendeuse"),
      c("f3me-04", "Mon frère est ___.", ["graphiste", "un graphiste", "le graphiste"], "graphiste", "Il est + métier, sans article."),
      c("f3me-05", "___ une cuisinière excellente.", ["C'est", "Elle est", "Il est"], "C'est", "C'est un / une + métier + adjectif."),
      c("f3me-06", "Elle travaille ___ un hôpital.", ["dans", "comme", "chez"], "dans"),
      c("f3me-07", "Il travaille ___ aide-soignant.", ["comme", "dans", "en"], "comme"),
      c("f3me-08", "Le féminin de « pharmacien » est…", ["pharmacienne", "pharmaciene", "pharmacière"], "pharmacienne"),
      s("f3me-09", "Mettez au féminin.", "Il est cuisinier.", "Elle est cuisinière."),
      s("f3me-10", "Mettez au féminin.", "Il est travailleur social.", "Elle est travailleuse sociale."),
      s("f3me-11", "Mettez au féminin.", "Il est assistant socio-éducatif.", "Elle est assistante socio-éducative."),
      s("f3me-12", "Complétez avec c'est ou il / elle est.", "___ physiothérapeute depuis dix ans. (elle)", "Elle est"),
      o("f3me-13", "Plus tard, je serai éducatrice de l'enfance."),
      o("f3me-14", "C'est une graphiste très créative."),
      o("f3me-15", "Mon cousin travaille comme cuisinier dans un hôtel."),
    ],
  },
  reprendre("G3-CONDP", "F3-U2"),
  reprendre("G3-CONSTR", "F3-U2"),
  {
    id: "GF3-IMPPRON", unite: "F3-U3", titre: "L'impératif avec les pronoms : coupez-les !",
    explication: [
      "À l'impératif **positif**, le pronom se place **après** le verbe, avec un trait d'union : Coupe**-les** ! Goûtez**-la** ! Mets**-en** !",
      "**me** et **te** deviennent **moi** et **toi** : Aide**-moi** ! Lave**-toi** les mains !",
      "À l'impératif **négatif**, le pronom reste **devant** le verbe : Ne **les** coupe pas ! Ne **me** dérange pas !",
      "**en** remplace une quantité : Du sucre ? Mets**-en** deux cuillères. · N'**en** mets pas trop !",
      "Avec **en**, les verbes en -er gardent le **s** : Mange**s-en** ! Achète**s-en** ! (pour la prononciation).",
    ],
    exercices: [
      c("f3ip-01", "Les tomates ? Coupe-___ en morceaux.", ["les", "leur", "en"], "les"),
      c("f3ip-02", "La sauce ? Goûtez-___ !", ["la", "le", "lui"], "la"),
      c("f3ip-03", "Le sel ? N'___ mets pas trop !", ["en", "le", "y"], "en"),
      c("f3ip-04", "Tu peux m'aider ? — Oui, aide-___ !", ["moi", "me", "m'"], "moi"),
      c("f3ip-05", "Avant de cuisiner, lave-___ les mains.", ["toi", "te", "tu"], "toi"),
      c("f3ip-06", "Le four ? Ne ___ ouvre pas maintenant !", ["l'", "le", "en"], "l'"),
      c("f3ip-07", "Du beurre ? Mets-___ un peu.", ["en", "le", "y"], "en"),
      c("f3ip-08", "Des pommes ? ___-en trois.", ["Achètes", "Achète", "Achetez-les"], "Achètes", "Devant en : achètes-en."),
      s("f3ip-09", "Remplacez par un pronom.", "Épluchez les pommes de terre.", "Épluchez-les."),
      s("f3ip-10", "Remplacez par un pronom.", "Mets la pâte au frigo.", "Mets-la au frigo."),
      s("f3ip-11", "Mettez à la forme négative.", "Mélange-les.", "Ne les mélange pas."),
      s("f3ip-12", "Remplacez par en.", "Ajoutez du lait.", "Ajoutez-en."),
      o("f3ip-13", "Prends le couteau et coupe-les en petits morceaux."),
      o("f3ip-14", "Ne le mets pas dans le four tout de suite."),
      o("f3ip-15", "Du sucre ? Mets-en deux cuillères."),
    ],
  },
  reprendre("G4-ENQ", "F3-U3"),
  reprendre("G3-CONSEIL", "F3-U4"),
  reprendre("G1-TONIQUES", "F3-U4"),
  reprendre("G4-ENY", "F3-U5"),
  {
    id: "GF3-MAIL", unite: "F3-U5", titre: "Écrire un mail formel",
    explication: [
      "**L'objet** dit en quelques mots pourquoi on écrit : *Demande de stage*, *Absence du 12 mars*.",
      "**La formule d'appel** : Madame, Monsieur, (si on ne connaît pas le nom) · Madame Rossi, · Bonjour Monsieur Keller, (moins formel). Jamais « Salut » !",
      "**Le corps** : la raison du mail dans la première phrase (*Je vous écris pour…*), puis les détails, puis ce qu'on attend (*Pourriez-vous… ?*).",
      "**La formule finale** : Meilleures salutations, · Avec mes meilleures salutations, · Cordialement, (plus court) · puis prénom et nom.",
      "Vouvoiement et conditionnel de politesse : *Je voudrais…, Je souhaiterais…, Pourriez-vous… ?*",
    ],
    exercices: [
      c("f3ml-01", "Vous écrivez à une entreprise sans connaître le nom :", ["Madame, Monsieur,", "Salut,", "Coucou,"], "Madame, Monsieur,"),
      c("f3ml-02", "La première phrase du mail :", ["Je vous écris pour vous demander une place de stage.", "Ça va ?", "Bisous !"], "Je vous écris pour vous demander une place de stage."),
      c("f3ml-03", "La formule finale la plus formelle :", ["Avec mes meilleures salutations,", "À plus !", "Bises,"], "Avec mes meilleures salutations,"),
      c("f3ml-04", "___-vous me répondre avant vendredi ?", ["Pourriez", "Pouvez-tu", "Peux"], "Pourriez"),
      c("f3ml-05", "Dans l'objet, on écrit…", ["Demande de stage", "Bonjour Madame", "Merci beaucoup"], "Demande de stage"),
      c("f3ml-06", "Je ___ un stage de deux semaines en juillet.", ["souhaiterais", "souhaite-tu", "souhaitez"], "souhaiterais"),
      c("f3ml-07", "Vous trouverez mon CV en ___.", ["pièce jointe", "objet", "destinataire"], "pièce jointe"),
      c("f3ml-08", "Pour remercier poliment :", ["Je vous remercie de votre réponse.", "Merci, à plus !", "Thanks !"], "Je vous remercie de votre réponse."),
      s("f3ml-09", "Rendez la phrase polie (conditionnel).", "Je veux un rendez-vous.", "Je voudrais un rendez-vous.", ["Je souhaiterais un rendez-vous.", "J'aimerais un rendez-vous."]),
      s("f3ml-10", "Rendez la question polie.", "Vous pouvez m'appeler ?", "Pourriez-vous m'appeler ?"),
      s("f3ml-11", "Complétez.", "Je vous ___ pour vous demander des informations.", "écris"),
      s("f3ml-12", "Complétez.", "Je reste à votre ___ pour un entretien.", "disposition"),
      o("f3ml-13", "Je vous écris pour vous demander une place de stage."),
      o("f3ml-14", "Je vous remercie de votre réponse."),
      o("f3ml-15", "Pourriez-vous me rappeler demain matin ?"),
    ],
  },
  reprendre("G3-FUTE", "F3-U6"),
  reprendre("G4-SI1", "F3-U6"),
  ...GRAMMAIRE_FRERES,
];

/* ─────────── tournures ─────────── */
const TOURNURES = [
  t("TF31-01", "F3-U1", "Plus tard, je voudrais travailler comme…", "Später möchte ich als… arbeiten.", "Vous parlez de votre futur métier.", "comme"),
  t("TF31-02", "F3-U1", "Ce qui me plaît dans ce métier, c'est…", "Was mir an diesem Beruf gefällt, ist…", "Vous expliquez votre choix.", "plaît"),
  t("TF31-03", "F3-U1", "Il faut être patient(e) et à l'écoute.", "Man muss geduldig sein und gut zuhören können.", "Vous décrivez les qualités nécessaires.", "écoute"),
  t("TF31-04", "F3-U1", "On travaille en équipe, avec des horaires irréguliers.", "Man arbeitet im Team, mit unregelmässigen Arbeitszeiten.", "Vous décrivez les conditions de travail.", "équipe"),
  t("TF31-05", "F3-U1", "La formation dure trois ans.", "Die Ausbildung dauert drei Jahre.", "Vous parlez de la formation.", "dure"),
  t("TF31-06", "F3-U1", "C'est un métier utile, mais fatigant.", "Es ist ein nützlicher, aber anstrengender Beruf.", "Vous donnez votre avis sur un métier.", "utile"),
  t("TF31-07", "F3-U1", "Je m'intéresse au domaine de la santé.", "Ich interessiere mich für den Gesundheitsbereich.", "Vous parlez de vos intérêts.", "intéresse"),
  t("TF31-08", "F3-U1", "Dans dix ans, je serai…", "In zehn Jahren werde ich… sein.", "Vous vous projetez.", "serai"),

  t("TF32-01", "F3-U2", "Je cherche une place de stage pour l'été.", "Ich suche einen Praktikumsplatz für den Sommer.", "Vous appelez un lieu de stage.", "place"),
  t("TF32-02", "F3-U2", "Est-ce que je pourrais parler à la responsable ?", "Könnte ich mit der Verantwortlichen sprechen?", "Vous téléphonez à une entreprise.", "pourrais"),
  t("TF32-03", "F3-U2", "Je vous appelle au sujet de l'annonce.", "Ich rufe Sie wegen des Inserats an.", "Vous expliquez pourquoi vous appelez.", "sujet"),
  t("TF32-04", "F3-U2", "Je suis disponible du 1er au 15 juillet.", "Ich bin vom 1. bis 15. Juli verfügbar.", "Vous donnez vos disponibilités.", "disponible"),
  t("TF32-05", "F3-U2", "Je vous remercie de votre réponse.", "Ich danke Ihnen für Ihre Antwort.", "Vous remerciez poliment.", "remercie"),
  t("TF32-06", "F3-U2", "Pendant mon stage, j'ai appris à…", "Während meines Praktikums habe ich gelernt…", "Vous racontez votre stage.", "appris"),
  t("TF32-07", "F3-U2", "Ma responsable m'a demandé de…", "Meine Betreuerin hat mich gebeten…", "Vous racontez une consigne.", "demandé"),
  t("TF32-08", "F3-U2", "Ce stage m'a confirmé(e) dans mon choix.", "Dieses Praktikum hat mich in meiner Wahl bestätigt.", "Vous faites le bilan du stage.", "confirmé"),

  t("TF33-01", "F3-U3", "Pour quatre personnes, il faut…", "Für vier Personen braucht man…", "Vous lisez les ingrédients.", "personnes"),
  t("TF33-02", "F3-U3", "Préchauffez le four à 180 degrés.", "Heizen Sie den Ofen auf 180 Grad vor.", "Vous donnez une étape de recette.", "Préchauffez"),
  t("TF33-03", "F3-U3", "Laissez cuire vingt minutes.", "Lassen Sie es zwanzig Minuten kochen.", "Vous donnez un temps de cuisson.", "Laissez"),
  t("TF33-04", "F3-U3", "Goûte et ajoute du sel si nécessaire.", "Probier und füge bei Bedarf Salz hinzu.", "Vous cuisinez avec quelqu'un.", "Goûte"),
  t("TF33-05", "F3-U3", "Tu peux me passer la poêle ?", "Kannst du mir die Bratpfanne geben?", "Vous demandez un ustensile.", "passer"),
  t("TF33-06", "F3-U3", "Attention, c'est chaud !", "Achtung, das ist heiss!", "Vous prévenez quelqu'un.", "chaud"),
  t("TF33-07", "F3-U3", "Ça sent bon !", "Das riecht gut!", "Vous faites un compliment en cuisine.", "sent"),
  t("TF33-08", "F3-U3", "Lavez-vous les mains et mettez un tablier.", "Waschen Sie sich die Hände und ziehen Sie eine Schürze an.", "Vous rappelez les règles d'hygiène.", "tablier"),

  t("TF34-01", "F3-U4", "Je dors mal en ce moment.", "Ich schlafe zurzeit schlecht.", "Vous expliquez un problème.", "dors"),
  t("TF34-02", "F3-U4", "Tu devrais faire une pause.", "Du solltest eine Pause machen.", "Vous donnez un conseil.", "devrais"),
  t("TF34-03", "F3-U4", "À ta place, j'éteindrais mon téléphone le soir.", "An deiner Stelle würde ich am Abend mein Handy ausschalten.", "Vous donnez un conseil personnel.", "place"),
  t("TF34-04", "F3-U4", "Il vaut mieux manger équilibré.", "Es ist besser, ausgewogen zu essen.", "Vous donnez un conseil général.", "vaut"),
  t("TF34-05", "F3-U4", "Qu'est-ce que tu me conseilles ?", "Was rätst du mir?", "Vous demandez un conseil.", "conseilles"),
  t("TF34-06", "F3-U4", "Je suis stressé(e) avant les examens.", "Ich bin vor den Prüfungen gestresst.", "Vous parlez du stress.", "stressé"),
  t("TF34-07", "F3-U4", "Prends soin de toi !", "Pass auf dich auf!", "Vous terminez une conversation.", "soin"),
  t("TF34-08", "F3-U4", "Ça m'aide à me détendre.", "Das hilft mir, mich zu entspannen.", "Vous parlez d'une activité.", "détendre"),

  t("TF35-01", "F3-U5", "Je vous écris pour…", "Ich schreibe Ihnen, um…", "Vous commencez un mail formel.", "écris"),
  t("TF35-02", "F3-U5", "Vous trouverez mon CV en pièce jointe.", "Im Anhang finden Sie meinen Lebenslauf.", "Vous envoyez un document.", "jointe"),
  t("TF35-03", "F3-U5", "Bonjour, c'est… Je vous laisse un message au sujet de…", "Guten Tag, hier ist… Ich hinterlasse Ihnen eine Nachricht wegen…", "Vous laissez un message vocal.", "laisse"),
  t("TF35-04", "F3-U5", "Vous pouvez me rappeler au 079…", "Sie können mich unter 079… zurückrufen.", "Vous donnez votre numéro.", "rappeler"),
  t("TF35-05", "F3-U5", "Je n'ai pas bien compris, vous pouvez répéter ?", "Ich habe nicht gut verstanden, können Sie wiederholen?", "Vous êtes au téléphone.", "répéter"),
  t("TF35-06", "F3-U5", "Ne quittez pas, je vous la passe.", "Bleiben Sie dran, ich verbinde Sie mit ihr.", "Vous répondez au téléphone.", "quittez"),
  t("TF35-07", "F3-U5", "Dans l'attente de votre réponse, …", "In Erwartung Ihrer Antwort…", "Vous terminez un mail formel.", "attente"),
  t("TF35-08", "F3-U5", "Meilleures salutations", "Freundliche Grüsse", "Vous signez un mail formel.", "salutations"),

  t("TF36-01", "F3-U6", "Mon rêve, c'est de…", "Mein Traum ist es, …", "Vous parlez de votre rêve.", "rêve"),
  t("TF36-02", "F3-U6", "J'ai l'intention de…", "Ich habe vor, …", "Vous annoncez un projet.", "intention"),
  t("TF36-03", "F3-U6", "Si je réussis mon diplôme, je…", "Wenn ich mein Diplom schaffe, werde ich…", "Vous parlez d'une condition.", "réussis"),
  t("TF36-04", "F3-U6", "Je me suis fixé un objectif.", "Ich habe mir ein Ziel gesetzt.", "Vous parlez de votre motivation.", "objectif"),
  t("TF36-05", "F3-U6", "Je ne sais pas encore, j'hésite entre… et…", "Ich weiss es noch nicht, ich schwanke zwischen… und…", "Vous n'êtes pas sûr(e).", "hésite"),
  t("TF36-06", "F3-U6", "Ça vaut la peine d'essayer.", "Es lohnt sich, es zu versuchen.", "Vous encouragez quelqu'un.", "peine"),
  t("TF36-07", "F3-U6", "On verra bien !", "Wir werden sehen!", "Vous restez ouvert(e).", "verra"),
  t("TF36-08", "F3-U6", "Étape par étape, j'y arriverai.", "Schritt für Schritt werde ich es schaffen.", "Vous êtes déterminé(e).", "arriverai"),

  ...TOURNURES_FRERES,
];

/* ─────────── phrases ─────────── */
const PHRASES = [
  p("PF30-01", "F3-U0", "Ich habe ihr gestern geschrieben.", "Je lui ai écrit hier."),
  p("PF30-02", "F3-U0", "Wir haben sie am Bahnhof gesehen.", "Nous l'avons vue à la gare.", ["On l'a vue à la gare.", "Nous les avons vus à la gare."]),
  p("PF30-03", "F3-U0", "Sie sind um acht Uhr angekommen.", "Ils sont arrivés à huit heures.", ["Elles sont arrivées à huit heures."]),
  p("PF30-04", "F3-U0", "Es regnete, als ich das Haus verlassen habe.", "Il pleuvait quand je suis sorti de la maison.", ["Il pleuvait quand je suis sortie de la maison.", "Il pleuvait quand j'ai quitté la maison."]),
  p("PF30-05", "F3-U0", "Ich vertraue ihm.", "Je lui fais confiance."),
  p("PF30-06", "F3-U0", "Wir verstehen uns gut mit unseren Nachbarn.", "Nous nous entendons bien avec nos voisins.", ["On s'entend bien avec nos voisins."]),
  p("PF30-07", "F3-U0", "Sie hat mir ein Geschenk gegeben.", "Elle m'a donné un cadeau.", ["Elle m'a offert un cadeau."]),
  p("PF30-08", "F3-U0", "Er hat gelogen.", "Il a menti."),

  p("PF31-01", "F3-U1", "Später werde ich Pflegefachfrau.", "Plus tard, je serai infirmière.", ["Plus tard, je deviendrai infirmière."]),
  p("PF31-02", "F3-U1", "Er arbeitet als Koch in einem Restaurant.", "Il travaille comme cuisinier dans un restaurant."),
  p("PF31-03", "F3-U1", "Sie ist Kindererzieherin in einer Kita.", "Elle est éducatrice de l'enfance dans une crèche."),
  p("PF31-04", "F3-U1", "Die Ausbildung dauert drei Jahre.", "La formation dure trois ans."),
  p("PF31-05", "F3-U1", "Man muss geduldig sein.", "Il faut être patient.", ["Il faut être patiente."]),
  p("PF31-06", "F3-U1", "Es ist ein nützlicher Beruf.", "C'est un métier utile."),
  p("PF31-07", "F3-U1", "Ich werde mich um ältere Menschen kümmern.", "Je m'occuperai des personnes âgées."),
  p("PF31-08", "F3-U1", "Der Lohn ist nicht sehr hoch.", "Le salaire n'est pas très élevé."),
  p("PF31-09", "F3-U1", "Sie wird Grafikerin werden.", "Elle deviendra graphiste."),
  p("PF31-10", "F3-U1", "Wir werden den Patienten helfen.", "Nous aiderons les patients."),

  p("PF32-01", "F3-U2", "Ich suche einen Praktikumsplatz.", "Je cherche une place de stage."),
  p("PF32-02", "F3-U2", "Ich möchte ein Praktikum in einem Spital machen.", "Je voudrais faire un stage dans un hôpital.", ["J'aimerais faire un stage dans un hôpital.", "Je souhaiterais faire un stage dans un hôpital."]),
  p("PF32-03", "F3-U2", "Könnten Sie mir mehr Informationen geben?", "Pourriez-vous me donner plus d'informations ?"),
  p("PF32-04", "F3-U2", "Meine Betreuerin hat mich gebeten, das Zimmer vorzubereiten.", "Ma responsable m'a demandé de préparer la chambre."),
  p("PF32-05", "F3-U2", "Ich danke Ihnen für Ihre Antwort.", "Je vous remercie de votre réponse."),
  p("PF32-06", "F3-U2", "Ich bin im Juli verfügbar.", "Je suis disponible en juillet."),
  p("PF32-07", "F3-U2", "Er hat mir vorgeschlagen, am Montag zu kommen.", "Il m'a proposé de venir lundi."),
  p("PF32-08", "F3-U2", "Ich habe meine Bewerbung geschickt.", "J'ai envoyé mon dossier de candidature.", ["J'ai envoyé ma candidature."]),
  p("PF32-09", "F3-U2", "Meine Kollegen sind sehr nett.", "Mes collègues sont très gentils.", ["Mes collègues sont très sympas."]),
  p("PF32-10", "F3-U2", "Ich muss einen Praktikumsbericht schreiben.", "Je dois écrire un rapport de stage."),

  p("PF33-01", "F3-U3", "Für vier Personen braucht man sechs Kartoffeln.", "Pour quatre personnes, il faut six pommes de terre."),
  p("PF33-02", "F3-U3", "Schälen Sie sie und schneiden Sie sie in Stücke.", "Épluchez-les et coupez-les en morceaux."),
  p("PF33-03", "F3-U3", "Den Ofen auf 200 Grad vorheizen.", "Préchauffez le four à 200 degrés."),
  p("PF33-04", "F3-U3", "Salz? Gib nicht zu viel davon hinein!", "Du sel ? N'en mets pas trop !"),
  p("PF33-05", "F3-U3", "Probier die Sauce!", "Goûte la sauce !"),
  p("PF33-06", "F3-U3", "Lassen Sie es zwanzig Minuten kochen.", "Laissez cuire vingt minutes.", ["Faites cuire vingt minutes."]),
  p("PF33-07", "F3-U3", "Waschen Sie sich die Hände vor dem Kochen.", "Lavez-vous les mains avant de cuisiner."),
  p("PF33-08", "F3-U3", "Der Teig muss eine Stunde ruhen.", "La pâte doit reposer une heure.", ["La pâte doit reposer pendant une heure."]),
  p("PF33-09", "F3-U3", "Wir kochen jeden Freitag zusammen.", "Nous cuisinons ensemble tous les vendredis.", ["On cuisine ensemble tous les vendredis."]),
  p("PF33-10", "F3-U3", "Das ist eine Spezialität aus meiner Region.", "C'est une spécialité de ma région."),

  p("PF34-01", "F3-U4", "Du solltest früher ins Bett gehen.", "Tu devrais te coucher plus tôt."),
  p("PF34-02", "F3-U4", "An deiner Stelle würde ich eine Pause machen.", "À ta place, je ferais une pause."),
  p("PF34-03", "F3-U4", "Ich fühle mich gestresst.", "Je me sens stressé.", ["Je me sens stressée."]),
  p("PF34-04", "F3-U4", "Es ist besser, Bildschirme am Abend zu vermeiden.", "Il vaut mieux éviter les écrans le soir."),
  p("PF34-05", "F3-U4", "Der Arzt hat mir ein Rezept gegeben.", "Le médecin m'a donné une ordonnance."),
  p("PF34-06", "F3-U4", "Ich habe seit einer Woche Rückenschmerzen.", "J'ai mal au dos depuis une semaine."),
  p("PF34-07", "F3-U4", "Atme tief ein und entspann dich.", "Respire profondément et détends-toi."),
  p("PF34-08", "F3-U4", "Und du, wie geht es dir?", "Et toi, comment tu vas ?", ["Et toi, comment vas-tu ?", "Et toi, ça va ?"]),
  p("PF34-09", "F3-U4", "Sie hat die Grippe, sie bleibt im Bett.", "Elle a la grippe, elle reste au lit."),
  p("PF34-10", "F3-U4", "Ich kann mich nicht konzentrieren.", "Je n'arrive pas à me concentrer.", ["Je ne peux pas me concentrer."]),

  p("PF35-01", "F3-U5", "Ich schreibe Ihnen, um einen Termin zu vereinbaren.", "Je vous écris pour prendre rendez-vous."),
  p("PF35-02", "F3-U5", "Im Anhang finden Sie meinen Lebenslauf.", "Vous trouverez mon CV en pièce jointe.", ["Vous trouverez mon curriculum vitæ en pièce jointe."]),
  p("PF35-03", "F3-U5", "Können Sie mich zurückrufen?", "Vous pouvez me rappeler ?", ["Pourriez-vous me rappeler ?"]),
  p("PF35-04", "F3-U5", "Ich habe eine Nachricht auf dem Anrufbeantworter hinterlassen.", "J'ai laissé un message sur le répondeur."),
  p("PF35-05", "F3-U5", "Gehst du morgen hin? — Ja, ich gehe hin.", "Tu y vas demain ? — Oui, j'y vais."),
  p("PF35-06", "F3-U5", "Hast du Nachrichten bekommen? — Ja, ich habe drei bekommen.", "Tu as reçu des messages ? — Oui, j'en ai reçu trois."),
  p("PF35-07", "F3-U5", "Ich habe ihr gestern geantwortet.", "Je lui ai répondu hier."),
  p("PF35-08", "F3-U5", "Ich bin ab 17 Uhr erreichbar.", "Je suis joignable à partir de 17 heures."),
  p("PF35-09", "F3-U5", "Freundliche Grüsse", "Meilleures salutations", ["Avec mes meilleures salutations", "Cordialement"]),
  p("PF35-10", "F3-U5", "Ich habe mein Passwort vergessen.", "J'ai oublié mon mot de passe."),

  p("PF36-01", "F3-U6", "Mein Traum ist es, in Kanada zu leben.", "Mon rêve, c'est de vivre au Canada.", ["Mon rêve est de vivre au Canada."]),
  p("PF36-02", "F3-U6", "Wenn ich das Diplom schaffe, mache ich eine Ausbildung.", "Si je réussis mon diplôme, je ferai une formation."),
  p("PF36-03", "F3-U6", "Eines Tages werde ich eine Familie gründen.", "Un jour, je fonderai une famille."),
  p("PF36-04", "F3-U6", "Ich habe beschlossen, eine Lehre zu machen.", "J'ai décidé de faire un apprentissage."),
  p("PF36-05", "F3-U6", "Ich hoffe, dass ich Erfolg haben werde.", "J'espère que je réussirai."),
  p("PF36-06", "F3-U6", "Es lohnt sich, es zu versuchen.", "Ça vaut la peine d'essayer.", ["Cela vaut la peine d'essayer."]),
  p("PF36-07", "F3-U6", "Ich habe mir ein realistisches Ziel gesetzt.", "Je me suis fixé un objectif réaliste.", ["Je me suis fixée un objectif réaliste."]),
  p("PF36-08", "F3-U6", "Wir werden sehen!", "On verra !", ["Nous verrons !"]),
  p("PF36-09", "F3-U6", "Ich werde eine Weltreise machen.", "Je ferai le tour du monde.", ["Je vais faire le tour du monde."]),
  p("PF36-10", "F3-U6", "Sie wünscht sich, Pflegefachfrau zu werden.", "Elle souhaite devenir infirmière."),

  ...PHRASES_FRERES,
];

/* ─────────── textes à trous ─────────── */
const TEXTES = [
  x("XF31-01", "F3-U1", "Mon futur métier", "Complétez au futur simple.",
    "Dans cinq ans, je {serai|être} infirmière. Je {travaillerai|travailler} dans un hôpital à Bâle. Je {m'occuperai|s'occuper} des enfants malades. Mes horaires ne {seront|être} pas faciles, mais je {ferai|faire} un métier utile. Mes parents {seront|être} fiers de moi !"),
  x("XF32-01", "F3-U2", "Une demande de stage", "Complétez le mail.",
    "{Madame|Anrede}, Monsieur, je vous écris pour vous demander une place de {stage|Praktikum}. Je {souhaiterais|souhaiter, Konditional} travailler deux semaines dans votre crèche en juillet. Je suis {motivée|motiviert} et j'aime les enfants. {Pourriez|pouvoir, Konditional}-vous me dire si c'est possible ? Je vous {remercie|danken} de votre réponse."),
  x("XF33-01", "F3-U3", "Le gratin de pommes de terre", "Complétez avec l'impératif et les pronoms.",
    "{Préchauffez|vorheizen} le four à 200 degrés. Prenez les pommes de terre et {épluchez-les|schälen + sie}. Ensuite, {coupez-les|schneiden + sie} en rondelles. Du fromage ? {Mettez-en|mettre + davon} beaucoup ! Ne {le|COD} mettez pas tout de suite : {attendez|warten} dix minutes."),
  x("XF34-01", "F3-U4", "Le courrier des lecteurs", "Complétez avec les conseils.",
    "Cher Tim, tu {devrais|devoir, Konditional} dormir au moins huit heures. Il {vaut|valoir} mieux éteindre ton téléphone à neuf heures. À ta {place|Stelle}, je {ferais|faire, Konditional} du sport deux fois par semaine. Et surtout, prends {soin|Sorge} de toi !"),
  x("XF35-01", "F3-U5", "Un message vocal", "Complétez avec y, en et les mots du téléphone.",
    "Bonjour Madame Roth, c'est Lena Meier. Je vous {laisse|hinterlassen} un message au sujet du stage. Le rendez-vous de jeudi ? Oui, j'{y|dorthin} serai à dix heures. Les documents ? J'{en|davon} ai trois, je vous les apporte. Vous pouvez me {rappeler|zurückrufen} au 079 123 45 67. Meilleures {salutations|Grüsse}."),
  x("XF36-01", "F3-U6", "Mes projets", "Complétez (si + présent → futur).",
    "Si je {réussis|réussir, Präsens} mon diplôme, je {ferai|faire, Futur} une formation d'éducatrice. Si j'ai de l'argent, je {voyagerai|voyager, Futur} en Amérique du Sud. Mon rêve, c'est {d'ouvrir|de + ouvrir} une crèche. Étape par étape, j'y {arriverai|arriver, Futur} !"),
  ...TEXTES_FRERES,
];

/* ─────────── défis ─────────── */
const DEFIS = {
  "F3-U1": {
    consigne: "Présentez le métier de vos rêves (8 à 10 phrases) : ce qu'on fait, où on travaille, les qualités nécessaires, la formation, et votre vie dans ce métier plus tard.",
    motsImposes: ["je travaillerai comme", "il faut être…", "la formation dure…", "dans dix ans"],
    controle: ["J'écris au moins cinq verbes au futur simple.", "J'utilise le nom du métier au masculin ou au féminin correctement.", "Je cite deux qualités.", "J'utilise les quatre éléments imposés."],
    modele: "Plus tard, je travaillerai comme éducatrice de l'enfance. C'est un métier du domaine social. On s'occupe d'enfants de quelques mois à six ans, dans une crèche ou une garderie. Il faut être patiente, créative et responsable. La formation dure trois ans, dans une école supérieure. Dans dix ans, je travaillerai dans une crèche à Bâle. J'organiserai des activités de bricolage et de musique. Je ne gagnerai pas beaucoup, mais je ferai un métier utile et joyeux.",
  },
  "F3-U2": {
    consigne: "Écrivez un mail pour demander une place de stage (8 à 10 lignes) dans un lieu qui correspond à votre profil (santé, social, pédagogie, arts).",
    motsImposes: ["Madame, Monsieur,", "je souhaiterais", "pourriez-vous", "meilleures salutations"],
    controle: ["Le mail a un objet, une formule d'appel et une formule finale.", "J'explique qui je suis et pourquoi ce stage.", "J'utilise au moins trois conditionnels de politesse.", "Je vouvoie du début à la fin."],
    modele: "Objet : demande de stage. Madame, Monsieur, je suis élève en deuxième année à l'École de culture générale de Liestal. Je souhaiterais faire un stage de deux semaines dans votre EMS, du 1er au 12 juillet. Je m'intéresse beaucoup au métier d'assistante en soins et santé communautaire. Je suis patiente, ponctuelle et j'aime le contact avec les personnes âgées. Pourriez-vous me dire si une place est encore libre ? Je serais très heureuse de vous rencontrer. Meilleures salutations, Mia Keller.",
  },
  "F3-U3": {
    consigne: "Écrivez une recette de votre famille ou de votre région pour la classe (10 à 12 lignes) : ingrédients, ustensiles, étapes, un conseil.",
    motsImposes: ["pour… personnes, il faut", "coupez-les / mettez-en", "laissez cuire", "attention !"],
    controle: ["J'écris les étapes à l'impératif.", "J'utilise au moins trois pronoms (les, la, en) avec l'impératif.", "J'utilise des quantités.", "Je donne un conseil d'hygiène ou de sécurité."],
    modele: "Les crêpes de ma grand-mère. Pour six personnes, il faut 250 grammes de farine, quatre œufs, un demi-litre de lait, une pincée de sel et un peu de beurre. Il faut aussi un grand bol et une poêle. D'abord, lavez-vous les mains. Mettez la farine dans le bol et ajoutez les œufs. Mélangez-les bien. Versez le lait petit à petit. Laissez reposer la pâte une heure. Faites chauffer la poêle avec un peu de beurre. Versez une louche de pâte et laissez cuire une minute de chaque côté. Attention, la poêle est très chaude ! Du sucre ? Mettez-en sur les crêpes. Bon appétit !",
  },
  "F3-U4": {
    consigne: "Un ami vous écrit : « Je dors mal, je suis toujours fatigué et stressé. » Répondez-lui (8 à 10 phrases) avec des conseils.",
    motsImposes: ["tu devrais", "à ta place, je…", "il vaut mieux", "prends soin de toi"],
    controle: ["Je montre que je comprends son problème.", "Je donne au moins quatre conseils différents.", "J'utilise le conditionnel (devrais, ferais…).", "J'utilise les quatre éléments imposés."],
    modele: "Salut Noah, je comprends, le stress avant les examens, c'est horrible ! Tu devrais te coucher tous les jours à la même heure. Il vaut mieux éteindre ton téléphone une heure avant de dormir. À ta place, je ferais du sport l'après-midi : ça aide à bien dormir. Tu pourrais aussi faire une liste de tes devoirs, pour être plus organisé. Évite le café et les boissons énergisantes ! Et parle de ton stress à quelqu'un, à tes parents ou à moi. Prends soin de toi ! Bises, Sara.",
  },
  "F3-U5": {
    consigne: "Vous êtes malade et vous ne pouvez pas aller à votre stage. Écrivez un mail formel à votre responsable (7 à 9 lignes) et préparez le texte d'un message vocal (3 à 4 phrases).",
    motsImposes: ["Objet :", "je vous écris pour", "pourriez-vous", "meilleures salutations"],
    controle: ["Le mail a un objet, une formule d'appel et une formule finale.", "J'explique la situation et je propose une solution.", "Le message vocal donne mon nom, la raison et mon numéro.", "Je vouvoie."],
    modele: "Objet : absence du lundi 14 avril. Madame Roth, je vous écris pour vous informer que je suis malade. J'ai de la fièvre depuis hier soir et le médecin m'a dit de rester à la maison deux jours. Je ne pourrai donc pas venir au stage lundi et mardi. Je vous enverrai le certificat médical par mail. Pourriez-vous informer l'équipe ? Je vous remercie de votre compréhension. Meilleures salutations, Lena Meier. — Message vocal : Bonjour Madame Roth, c'est Lena Meier, la stagiaire. Je suis malade et je ne peux pas venir lundi. Je vous ai envoyé un mail. Vous pouvez me rappeler au 079 123 45 67. Merci et bonne journée !",
  },
  "F3-U6": {
    consigne: "Écrivez une lettre à vous-même dans dix ans (8 à 10 phrases) : votre métier, votre lieu de vie, vos rêves réalisés ou non.",
    motsImposes: ["dans dix ans", "si + présent → futur", "j'espère que", "mon rêve, c'est de…"],
    controle: ["J'utilise au moins six verbes au futur simple.", "J'utilise si + présent → futur.", "Je parle du métier, du lieu et d'un rêve.", "J'utilise les quatre éléments imposés."],
    modele: "Chère Ana du futur, dans dix ans, tu auras vingt-sept ans. J'espère que tu seras physiothérapeute, comme tu le veux depuis toujours. Tu habiteras peut-être à Lausanne, au bord du lac. Si tu as du temps, tu joueras encore au volley le mercredi soir. Mon rêve, c'est de travailler un jour avec une équipe de sport professionnelle. Si tu as réussi, bravo ! Sinon, ce n'est pas grave : tu trouveras une autre voie. N'oublie pas tes amis de l'école. Je t'embrasse, Ana (seize ans).",
  },
};

/* ─────────── évaluations ─────────── */
const EVALUATIONS = {
  "F3-EV-COCE": {
    titre: "Compréhension orale et écrite + opinion argumentée", type: "Test écrit", quand: "Après l'unité 4",
    objectif: "Comprendre un document audio et un texte (interview d'un professionnel, article sur la santé), puis écrire une opinion argumentée de 8 à 10 phrases.",
    criteres: [
      { critere: "Compréhension", detail: "Je retrouve les idées principales et les détails (chiffres, métiers, conseils)." },
      { critere: "Opinion", detail: "Avis clair, deux ou trois arguments, un exemple." },
      { critere: "Organisation", detail: "Introduction (avis), arguments avec connecteurs, conclusion." },
      { critere: "Langue", detail: "Futur, conditionnel de politesse et de conseil ; mots des unités 1 à 4." },
    ],
    modele: {
      texte: "Faut-il faire un stage avant de choisir son métier ? À mon avis, oui, c'est indispensable. D'abord, un stage permet de découvrir la réalité du travail. Par exemple, pendant mon stage dans une crèche, j'ai compris que le métier est très fatigant, mais aussi très riche. Ensuite, on rencontre des professionnels qui peuvent nous conseiller. Enfin, un stage est un plus dans le dossier de candidature. Bien sûr, il n'est pas toujours facile de trouver une place. Pour conclure, je pense que chaque élève devrait faire au moins un stage.",
      remarques: ["La question est reprise au début.", "Trois arguments annoncés par d'abord, ensuite, enfin.", "Une petite concession (bien sûr…) avant la conclusion."],
    },
    tournures: ["Selon la personne interviewée, …", "À mon avis, …", "D'abord… Ensuite… Enfin…", "Par exemple, …", "Bien sûr, … mais…", "Pour conclure, …"],
    conseils: [
      "Écoutez des interviews courtes de professionnels (RTS, sites d'orientation).",
      "Pour l'opinion : notez votre avis et trois arguments avant d'écrire.",
      "Relisez les verbes au futur et au conditionnel.",
    ],
    entrainement: {
      titre: "Mon opinion argumentée",
      consigne: "« Les écrans le soir sont-ils dangereux pour le sommeil ? » Écrivez votre opinion (8 à 10 phrases).",
      controle: ["Mon avis est dans l'introduction.", "J'ai au moins deux arguments et un exemple.", "J'utilise d'abord, ensuite, pour conclure.", "Je relis les accords et les verbes."],
      modele: "À mon avis, les écrans le soir sont un vrai problème…",
    },
  },
  ...EVALUATION_FRERES,
};

/* ─────────── ligne de lecture ─────────── */
const LECTURE = LECTURE_FRERES;

export default {
  numero: 3,
  titre: "Se projeter, travailler",
  unites: UNITES,
  grammaire: GRAMMAIRE,
  tournures: TOURNURES,
  phrases: PHRASES,
  textes: TEXTES,
  defis: DEFIS,
  evaluations: EVALUATIONS,
  lecture: LECTURE,
  motsAjouts: MOTS_AJOUTS,
  surcharges: {},
};
