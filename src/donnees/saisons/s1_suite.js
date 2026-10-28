/* Saison S1 — compléments de la refonte d'octobre 2026.

   - l'unité 7 devient « Au gymnase » ; la lecture quitte les unités pour une
     ligne de lecture parallèle (roman policier à Paris, cinq stations) ;
   - fils rouges : adjectifs et outils pour argumenter dans chaque unité,
     notions de lecture sur la ligne de lecture ;
   - davantage d'exercices : ~30 de grammaire et 15 phrases par unité,
     deux textes à trous par unité ;
   - onglets « Préparer l'évaluation ».                                    */

const f = (id, fr, de, cat, unite, exemple, extra = {}) => ({
  id, fr, de, cat, unite, gram: "", construction: "", exemple,
  famille: "", syn: "", ant: "", piege: "", ...extra,
});
const c = (id, phrase, options, reponse, explication) =>
  ({ id, type: "choix", phrase, options, reponse, explication });
const s = (id, consigne, phrase, reponse, aussi = [], explication = "") =>
  ({ id, type: "saisie", consigne, phrase, reponse, aussi, explication });
const o = (id, reponse, aussi = [], explication = "") =>
  ({ id, type: "ordre", reponse, aussi, explication });
const t = (id, unite, fr, de, situation, trou) => ({ id, unite, fr, de, situation, trou });
const p = (id, unite, de, fr, aussi = []) => ({ id, unite, de, fr, aussi });
const x = (id, unite, titre, consigne, texte) => ({ id, unite, titre, consigne, texte });

/* ─────────── Fiches nouvelles ─────────── */
export const MOTS_S1_SUITE = [
  // fils rouges : argumentation
  f("N1-801", "mais", "aber", "C", "Argumentation", "J'aime le sport, mais je déteste courir.",
    { piege: "« mais » oppose deux idées ; il y a souvent une virgule avant." }),
  f("N1-802", "je trouve que…", "ich finde, dass…", "L", "Argumentation", "Je trouve que ce film est trop long."),
  f("N1-803", "je pense que…", "ich denke, dass…", "L", "Argumentation", "Je pense que Maigret a raison."),
  f("N1-804", "à mon avis", "meiner Meinung nach", "L", "Argumentation", "À mon avis, le coupable, c'est le mari.",
    { syn: "selon moi", piege: "Jamais « selon mon avis »." }),
  f("N1-805", "ça me plaît", "das gefällt mir", "L", "Argumentation", "Ce quartier, ça me plaît beaucoup.",
    { ant: "ça ne me plaît pas" }),
  // fils rouges : adjectifs
  f("N1-806", "intelligent, intelligente", "intelligent, klug", "A", "Identité", "Ma sœur est très intelligente."),
  f("N1-807", "courageux, courageuse", "mutig", "A", "Identité", "Il est courageux : il n'a peur de rien.", { ant: "peureux" }),
  f("N1-808", "intéressant, intéressante", "interessant", "A", "Quotidien", "Ce documentaire est vraiment intéressant.",
    { ant: "ennuyeux" }),
  f("N1-809", "amusant, amusante", "lustig, unterhaltsam", "A", "Quotidien", "Le jeu est amusant.", { syn: "drôle" }),
  f("N1-810", "clair, claire", "hell", "A", "Logement", "Ma chambre est claire : elle a deux fenêtres.",
    { ant: "sombre", piege: "« clair » veut aussi dire « deutlich » : c'est clair !" }),
  f("N1-811", "sombre", "dunkel", "A", "Logement", "Le couloir est sombre.", { ant: "clair" }),
  f("N1-812", "animé, animée", "belebt", "A", "Ville", "Le soir, la place est très animée.", { ant: "calme, tranquille" }),
  f("N1-813", "tranquille", "ruhig", "A", "Ville", "J'habite dans une rue tranquille.", { syn: "calme" }),
  f("N1-814", "génial, géniale", "genial, toll", "A", "Voyages", "La vue depuis Montmartre est géniale !",
    { piege: "Pluriel masculin : géniaux." }),
  f("N1-815", "strict, stricte", "streng", "A", "École", "Notre prof de maths est stricte, mais juste."),
  f("N1-816", "nerveux, nerveuse", "nervös", "A", "Roman policier", "Le témoin a l'air nerveux.", { ant: "calme" }),
  f("N1-817", "mystérieux, mystérieuse", "geheimnisvoll", "A", "Roman policier", "Un homme mystérieux attend devant l'hôtel."),
  f("N1-818", "menteur, menteuse", "verlogen; Lügner", "A", "Roman policier", "Ne la crois pas, elle est menteuse.",
    { famille: "mentir · le mensonge" }),
  // notions de lecture
  f("N1-820", "le titre", "der Titel", "N", "Lire et résumer", "Le titre du roman est mystérieux."),
  f("N1-821", "le narrateur, la narratrice", "der Erzähler, die Erzählerin", "N", "Lire et résumer",
    "Le narrateur raconte l'histoire, mais il ne participe pas à l'enquête.",
    { piege: "Le narrateur n'est pas l'auteur : c'est la voix qui raconte." }),
  f("N1-822", "le cadre", "der Rahmen, das Setting", "N", "Lire et résumer", "Le cadre du roman, c'est Paris en hiver.",
    { piege: "Le cadre = le lieu + l'époque de l'histoire." }),
  f("N1-823", "le lieu", "der Ort", "N", "Lire et résumer", "Le lieu du crime est un petit hôtel."),
  f("N1-824", "l'époque", "die Zeit, die Epoche", "N", "Lire et résumer", "L'histoire se passe à l'époque de nos grands-parents."),
  f("N1-825", "l'intrigue", "die Handlung", "N", "Lire et résumer", "L'intrigue est simple, mais pleine de suspense."),
  f("N1-826", "le dénouement", "die Auflösung", "N", "Lire et résumer", "Au dénouement, on découvre le coupable."),
  f("N1-827", "le portrait", "das Porträt", "N", "Lire et résumer", "Le premier chapitre fait le portrait du commissaire."),
  f("N1-828", "la police", "die Polizei", "N", "Roman policier", "La police arrive sur les lieux du crime."),
  f("N1-829", "le policier, la policière", "der Polizist, die Polizistin", "N", "Roman policier", "Un policier garde la porte."),
  f("N1-830", "interroger", "befragen, verhören", "V", "Roman policier", "Maigret interroge la concierge.",
    { famille: "l'interrogatoire" }),
  f("N1-832", "le mensonge", "die Lüge", "N", "Roman policier", "Maigret découvre le mensonge du mari."),
  f("N1-833", "la vérité", "die Wahrheit", "N", "Roman policier", "Dites-moi la vérité !"),
  // unité 7 · Au gymnase
  f("N1-840", "le gymnase", "das Gymnasium", "N", "École", "Je suis en première année au gymnase.",
    { piege: "En France, « le gymnase » est une salle de sport ; on dit « le lycée »." }),
  f("N1-841", "les mathématiques (f.)", "die Mathematik", "N", "École", "J'ai mathématiques le lundi matin.", { syn: "les maths" }),
  f("N1-842", "l'allemand (m.)", "Deutsch", "N", "École", "En allemand, on lit un roman de Kafka.",
    { piege: "Langue : pas de majuscule (l'allemand) ; personne : un Allemand." }),
  f("N1-843", "l'anglais (m.)", "Englisch", "N", "École", "Notre prof d'anglais est écossaise."),
  f("N1-844", "l'histoire (f.)", "Geschichte (Fach)", "N", "École", "En histoire, on étudie la Révolution française."),
  f("N1-845", "la géographie", "Geografie", "N", "École", "En géographie, on fait des cartes."),
  f("N1-846", "la biologie", "Biologie", "N", "École", "En biologie, on observe des cellules."),
  f("N1-847", "la chimie", "Chemie", "N", "École", "Le labo de chimie est au sous-sol."),
  f("N1-848", "la physique", "Physik", "N", "École", "La physique, c'est difficile, mais passionnant."),
  f("N1-849", "l'option spécifique (f.)", "das Schwerpunktfach", "N", "École", "Mon option spécifique, c'est l'espagnol."),
  f("N1-850", "la salle de classe", "das Schulzimmer", "N", "École", "La salle de classe est au deuxième étage."),
  f("N1-851", "la bibliothèque", "die Bibliothek", "N", "École", "Je révise à la bibliothèque après les cours.",
    { piege: "≠ la librairie (Buchhandlung)." }),
  f("N1-852", "l'exposé (m.)", "das Referat", "N", "École", "Je fais un exposé sur Paris vendredi."),
  f("N1-853", "le cahier", "das Heft", "N", "École", "Écrivez les mots dans votre cahier."),
  f("N1-854", "la feuille", "das Blatt", "N", "École", "Prenez une feuille et un stylo."),
  f("N1-855", "l'ordinateur portable (m.)", "der Laptop", "N", "École", "On travaille souvent sur l'ordinateur portable."),
  f("N1-856", "la pause de midi", "die Mittagspause", "N", "École", "Pendant la pause de midi, on mange à la cafétéria."),
  f("N1-857", "le règlement", "die Hausordnung, die Regeln", "N", "École", "Le règlement interdit les portables en cours."),
  f("N1-858", "interdit, interdite", "verboten", "A", "École", "Il est interdit de manger en classe.", { ant: "permis, autorisé" }),
  f("N1-859", "absent, absente", "abwesend", "A", "École", "Lena est absente aujourd'hui : elle est malade.", { ant: "présent" }),
  f("N1-860", "avoir cours", "Unterricht haben", "L", "École", "Le mercredi après-midi, je n'ai pas cours."),
  f("N1-861", "prendre des notes", "Notizen machen", "L", "École", "Je prends des notes pendant le cours."),
  f("N1-862", "lever la main", "die Hand heben", "L", "École", "Levez la main avant de parler !"),
  f("N1-863", "rater un examen", "eine Prüfung nicht bestehen", "L", "École", "J'ai peur de rater l'examen.",
    { syn: "échouer à un examen", ant: "réussir un examen", piege: "« rater » est familier ; « échouer à » est neutre." }),
  f("N1-864", "avoir une bonne note", "eine gute Note haben", "L", "École", "Elle a une bonne note en chimie : un 5,5."),
  f("N1-865", "l'enseignant, l'enseignante", "die Lehrperson", "N", "École", "Les enseignants se retrouvent en salle des maîtres."),
];

/* ─────────── Unité 7 : Au gymnase ─────────── */
export const UNITE7_S1 = {
  id: "S1-U7", numero: 7, titre: "Au gymnase",
  sous: "Présenter son gymnase, son horaire, les règles de la classe.",
  oral: "Présenter son gymnase à un élève d'échange", ecrit: "Message à un correspondant sur sa nouvelle école",
  verbes: ["finir", "choisir", "apprendre", "comprendre", "réussir"],
  grammaire: ["G7-VERBES", "G7-REGLES"],
  mots: [
    "N1-840", "N1-841", "N1-842", "N1-843", "N1-844", "N1-845", "N1-846", "N1-847", "N1-848", "N1-849",
    "N1-850", "N1-851", "N1-852", "N1-853", "N1-854", "N1-855", "N1-856", "N1-857", "N1-858", "N1-859",
    "N1-860", "N1-861", "N1-862", "N1-863", "N1-864", "N1-865",
    "S1-A048", "S1-A050", "S1-A052", "S1-A054", "S1-A061", "S1-A062", "S1-A063", "S1-A064", "S1-A065",
    "S1-145", "S1-146", "S1-B112", "S1-A005", "S3-054", "S3-143", "S3-007",
  ],
};

/* Fils rouges : un même fil s'élargit d'unité en unité. */
export const FILS_S1 = {
  "S1-U1": { adjectifs: ["N1-806", "N1-807"], argumentation: ["N1-801", "N1-802"] },
  "S1-U2": { adjectifs: ["N1-808", "N1-809", "S4-101"], argumentation: ["S3-119", "N1-805"] },
  "S1-U3": { adjectifs: ["N1-810", "N1-811", "URB-035"], argumentation: ["N1-804"] },
  "S1-U4": { adjectifs: ["S4-116"], argumentation: ["S3-121"] },
  "S1-U5": { adjectifs: ["N1-812", "N1-813"], argumentation: ["S3-122"] },
  "S1-U6": { adjectifs: ["N1-814", "S5-089"], argumentation: ["N1-803", "S3-127"] },
  "S1-U7": { adjectifs: ["N1-815", "S3-095"], argumentation: ["S3-120"] },
};

/* L'onglet d'évaluation porté par chaque unité. */
export const EVAL_UNITES_S1 = {
  "S1-U1": "S1-EV-PORTRAIT",
  "S1-U3": "S1-EV-COCE",
  "S1-U4": "S1-EV-INTERRO",
  "S1-U6": "S1-EV-PARIS",
};

/* ─────────── Grammaire : exercices ajoutés aux points existants ─────────── */
export const EXERCICES_PLUS_S1 = {
  "G0-BASES": [
    c("g0-13", "Ils ___ deux chats.", ["ont", "sont", "avons"], "ont", "avoir : ils ont."),
    c("g0-14", "Vous ___ suisses ?", ["êtes", "avez", "sont"], "êtes"),
    s("g0-15", "Mettez au pluriel.", "le livre rouge", "les livres rouges"),
    s("g0-16", "Mettez au féminin.", "Il est content.", "Elle est contente."),
    c("g0-17", "J'habite ___ Zurich.", ["à", "en", "au"], "à", "Ville → à."),
    o("g0-18", "Il y a trois fenêtres dans la classe."),
  ],
  "G1-QUESTIONS": [
    c("g1q-13", "___ est-ce que tu t'appelles ?", ["Comment", "Quel", "Qui"], "Comment"),
    c("g1q-14", "___ frères et sœurs as-tu ?", ["Combien de", "Combien", "Quels"], "Combien de", "combien de + nom."),
    c("g1q-15", "___ tu apprends le français ? — Parce que j'aime la langue.", ["Pourquoi est-ce que", "Quand est-ce que", "Comment est-ce que"], "Pourquoi est-ce que"),
    c("g1q-16", "___ films aimes-tu ?", ["Quels", "Quelles", "Quel"], "Quels", "films : masculin pluriel."),
    s("g1q-17", "Posez la question avec l'inversion.", "Vous habitez à Lausanne ?", "Habitez-vous à Lausanne ?"),
    s("g1q-18", "Trouvez la question (tu, est-ce que).", "Réponse : « J'ai seize ans. »", "Quel âge est-ce que tu as ?", ["Quel âge as-tu ?", "Tu as quel âge ?"]),
  ],
  "G1-TONIQUES": [
    c("g1t-09", "Tu viens avec ___ ? (nous)", ["nous", "moi", "eux"], "nous"),
    c("g1t-10", "— J'adore le chocolat. — ___ aussi !", ["Moi", "Je", "Me"], "Moi"),
    c("g1t-11", "— Je n'aime pas le froid. — Moi ___ .", ["non plus", "aussi", "pas"], "non plus", "Phrase négative → non plus."),
    c("g1t-12", "Ce soir, je mange chez ___ (mes grands-parents).", ["eux", "elles", "lui"], "eux"),
    s("g1t-13", "Remplacez par un pronom tonique.", "Je travaille avec Sofia.", "Je travaille avec elle."),
    s("g1t-14", "Insistez avec un pronom tonique.", "Je préfère le thé. (moi)", "Moi, je préfère le thé."),
  ],
  "G2-PRESENT": [
    s("g2p-12", "Conjuguez au présent.", "Nous ___ (se lever) à six heures.", "nous levons", ["levons"], "nous nous levons."),
    s("g2p-13", "Conjuguez au présent.", "Tu ___ (faire) du sport ?", "fais"),
    s("g2p-14", "Conjuguez au présent.", "Elles ___ (aller) au cinéma.", "vont"),
    c("g2p-15", "Le samedi, je ___ tard.", ["me lève", "lève", "me levé"], "me lève"),
    o("g2p-16", "D'habitude, nous nous couchons vers dix heures."),
  ],
  "G2-NEGATION": [
    c("g2n-12", "Je ne sors ___ le dimanche soir. (nie)", ["jamais", "plus", "rien"], "jamais"),
    c("g2n-13", "Il ne fait ___ le week-end. (nichts)", ["rien", "personne", "jamais"], "rien"),
    s("g2n-14", "Répondez avec « ne… personne ».", "Tu vois quelqu'un ?", "Non, je ne vois personne."),
    s("g2n-15", "Répondez avec « ne… plus ».", "Tu joues encore au foot ?", "Non, je ne joue plus au foot."),
    o("g2n-16", "Je ne me lève jamais avant sept heures."),
  ],
  "G3-ILYA": [
    c("g3i-09", "___ une lampe sur mon bureau.", ["Il y a", "C'est", "Elle est"], "Il y a"),
    c("g3i-10", "___ ma chambre. Elle est petite.", ["C'est", "Il y a", "Il est"], "C'est"),
    c("g3i-11", "Voici ___ armoire. (à moi)", ["mon", "ma", "mes"], "mon", "Devant une voyelle, ma → mon."),
    c("g3i-12", "Ce sont ___ affaires. (à eux)", ["leurs", "leur", "ses"], "leurs"),
    s("g3i-13", "Complétez avec le possessif (à nous).", "___ appartement est au troisième étage.", "Notre"),
    s("g3i-14", "Complétez avec le possessif (à vous).", "___ chaises sont confortables.", "Vos"),
    o("g3i-15", "Il y a un tapis bleu au milieu de la chambre."),
  ],
  "G3-PREPOSITIONS": [
    c("g3p-09", "Le chat dort ___ le lit. (darunter)", ["sous", "sur", "dans"], "sous"),
    c("g3p-10", "La lampe est ___ bureau.", ["sur le", "sur", "au-dessus"], "sur le"),
    c("g3p-11", "Le miroir est ___ la porte.", ["à côté de", "à côté", "côté de"], "à côté de"),
    c("g3p-12", "Mon lit est ___ mur.", ["contre le", "contre de", "contre au"], "contre le"),
    s("g3p-13", "Complétez (de + le).", "L'étagère est à côté ___ lit.", "du"),
    s("g3p-14", "Complétez (de + les).", "Le tapis est en face ___ fenêtres.", "des"),
    o("g3p-15", "Au premier plan, il y a une table et deux chaises."),
  ],
  "G4-ARTICLES": [
    c("g4-15", "Je n'aime pas ___ poisson.", ["le", "de", "du"], "le", "Avec aimer / détester, l'article défini reste."),
    c("g4-16", "Il y a ___ fromage dans le frigo ?", ["du", "le", "de"], "du"),
  ],
  "G5-IMPERATIF": [
    s("g5i-09", "Mettez à l'impératif (vous).", "venir avec nous", "Venez avec nous."),
    s("g5i-10", "Mettez à l'impératif (tu).", "faire attention", "Fais attention."),
    s("g5i-11", "Mettez à l'impératif négatif (vous).", "prendre le métro", "Ne prenez pas le métro."),
    c("g5i-12", "(vous) ___ patients, le train a du retard.", ["Soyez", "Êtes", "Soyons"], "Soyez"),
    c("g5i-13", "(tu) ___ ton billet !", ["N'oublie pas", "N'oublies pas", "Oublie pas"], "N'oublie pas"),
    s("g5i-14", "Mettez à l'impératif (nous).", "se dépêcher", "Dépêchons-nous."),
    o("g5i-15", "Descendez à Bastille et prenez la ligne 5."),
  ],
  "G5-LIEUX": [
    c("g5l-09", "Le musée est ___ centre-ville.", ["au", "à la", "en"], "au"),
    c("g5l-10", "Je viens ___ Allemagne.", ["d'", "de la", "du"], "d'", "venir de + pays féminin : de / d'."),
    c("g5l-11", "Il rentre ___ Portugal.", ["du", "de", "des"], "du", "Pays masculin : du Portugal."),
    c("g5l-12", "On se retrouve ___ boulangerie ?", ["à la", "au", "chez la"], "à la"),
    s("g5l-13", "Complétez.", "Je vais ___ Italie cet été.", "en"),
    s("g5l-14", "Complétez.", "Mes cousins habitent ___ Canada.", "au"),
    o("g5l-15", "Ce soir, je vais chez Léa."),
  ],
  "G6-FUTURPROCHE": [
    s("g6f-10", "Mettez au futur proche.", "Je (se promener) dans le Marais.", "Je vais me promener dans le Marais."),
    s("g6f-11", "Mettez au passé récent.", "Nous (visiter) Notre-Dame.", "Nous venons de visiter Notre-Dame."),
    c("g6f-12", "Le film ___ commencer : vite, entrons !", ["va", "vient de", "est en train de"], "va"),
    c("g6f-13", "— Tu as faim ? — Non, je ___ manger.", ["viens de", "vais", "suis en train de"], "viens de"),
    s("g6f-14", "Mettez au futur proche, à la forme négative.", "Ils restent à l'hôtel.", "Ils ne vont pas rester à l'hôtel."),
    o("g6f-15", "On va prendre un bateau sur la Seine."),
  ],
  "G6-RELATIFS": [
    c("g6r-08", "Le Louvre est un musée ___ on peut visiter le soir.", ["qu'", "qui", "où"], "qu'"),
    c("g6r-09", "C'est le pont ___ je préfère.", ["que", "qui", "où"], "que"),
    c("g6r-10", "Paris est la ville ___ mon père est né.", ["où", "que", "qui"], "où"),
    c("g6r-11", "J'ai une amie ___ parle cinq langues.", ["qui", "que", "où"], "qui"),
    s("g6r-12", "Reliez avec « qui ».", "J'ai un cousin. Il habite à Lyon.", "J'ai un cousin qui habite à Lyon."),
    s("g6r-13", "Reliez avec « que ».", "C'est une photo. Je trouve cette photo magnifique.", "C'est une photo que je trouve magnifique."),
    s("g6r-14", "Reliez avec « où ».", "C'est l'auberge. Nous dormons dans cette auberge.", "C'est l'auberge où nous dormons."),
    o("g6r-15", "Montmartre est le quartier que je préfère."),
  ],
};

/* ─────────── Grammaire : points nouveaux ─────────── */
export const POINTS_PLUS_S1 = [
  {
    id: "G4-QUANTITES", unite: "S1-U4", titre: "Beaucoup, trop, assez · le, la, les pronoms",
    explication: [
      "Les quantités sont suivies de **de / d'** : **beaucoup de** pain, **trop de** sucre, **assez d'**argent, **un peu de** lait, **peu de** temps.",
      "**Combien de** + nom : **Combien de** pommes voulez-vous ?",
      "Pour ne pas répéter un nom défini, on utilise **le, la, l', les** devant le verbe : Le gâteau ? Je **le** prends. · La salade ? Je **la** prends. · Les frites ? Je **les** adore.",
      "À la négation, le pronom reste devant le verbe : Je **ne le** prends **pas**.",
    ],
    exercices: [
      c("g4q-01", "Il y a beaucoup ___ monde au marché.", ["de", "du", "des"], "de"),
      c("g4q-02", "Tu mets trop ___ sel !", ["de", "du", "le"], "de"),
      c("g4q-03", "Nous n'avons pas assez ___ argent.", ["d'", "de l'", "des"], "d'"),
      c("g4q-04", "___ bouteilles d'eau est-ce qu'on achète ?", ["Combien de", "Combien des", "Quelle"], "Combien de"),
      c("g4q-05", "Je voudrais un peu ___ crème.", ["de", "de la", "du"], "de"),
      c("g4q-06", "Le menu du jour ? Je ___ prends.", ["le", "la", "les"], "le"),
      c("g4q-07", "La tarte aux pommes ? Je ___ adore !", ["l'", "la", "le"], "l'", "Devant une voyelle : l'."),
      c("g4q-08", "Les crêpes ? Ma sœur ___ prépare le dimanche.", ["les", "le", "leur"], "les"),
      s("g4q-09", "Remplacez le nom par un pronom.", "Je prends la soupe.", "Je la prends."),
      s("g4q-10", "Remplacez le nom par un pronom.", "Il achète les tomates.", "Il les achète."),
      s("g4q-11", "Remplacez le nom par un pronom.", "Tu goûtes le fromage ?", "Tu le goûtes ?"),
      s("g4q-12", "Remplacez par un pronom, à la forme négative.", "Je ne mange pas le dessert.", "Je ne le mange pas."),
      s("g4q-13", "Complétez avec une quantité.", "Il y a ___ (zu viel) sucre dans ce café.", "trop de"),
      o("g4q-14", "Combien de pain est-ce que tu veux ?"),
      o("g4q-15", "Le gâteau au chocolat, je le prends."),
      o("g4q-16", "Nous n'avons pas assez de temps."),
    ],
  },
  {
    id: "G7-VERBES", unite: "S1-U7", titre: "Finir, choisir, apprendre : d'autres présents",
    explication: [
      "Verbes en **-ir** comme **finir** : je fin**is**, tu fin**is**, il fin**it**, nous fin**issons**, vous fin**issez**, ils fin**issent**. Aussi : choisir, réussir, grandir.",
      "**Prendre** et ses composés (**apprendre, comprendre**) : je prends, tu prends, il prend, nous pre**n**ons, vous pre**n**ez, ils pre**nn**ent.",
      "**Devoir / pouvoir / vouloir** + infinitif : je dois réviser · je peux sortir · je veux réussir.",
      "**Savoir** + infinitif = être capable : Je **sais** nager. · **Connaître** + nom : Je **connais** ce prof.",
    ],
    exercices: [
      s("g7v-01", "Conjuguez au présent.", "Les cours ___ (finir) à 16 h 30.", "finissent"),
      s("g7v-02", "Conjuguez au présent.", "Nous ___ (choisir) une option.", "choisissons"),
      s("g7v-03", "Conjuguez au présent.", "Tu ___ (réussir) toujours tes examens !", "réussis"),
      s("g7v-04", "Conjuguez au présent.", "Vous ___ (apprendre) l'italien ?", "apprenez"),
      s("g7v-05", "Conjuguez au présent.", "Ils ne ___ (comprendre) pas l'exercice.", "comprennent", [], "ils prennent, ils comprennent : deux n."),
      s("g7v-06", "Conjuguez au présent.", "Je ___ (finir) mes devoirs et je sors.", "finis"),
      c("g7v-07", "Elle ___ l'anglais depuis cinq ans.", ["apprend", "apprends", "apprent"], "apprend"),
      c("g7v-08", "Nous ___ bien le prof : il parle lentement.", ["comprenons", "comprennons", "comprendons"], "comprenons"),
      c("g7v-09", "Je ___ réviser ce soir : j'ai une interrogation demain.", ["dois", "doit", "devons"], "dois"),
      c("g7v-10", "Vous ___ ouvrir la fenêtre, s'il vous plaît ?", ["pouvez", "voulez", "savez"], "pouvez"),
      c("g7v-11", "Tu ___ nager ?", ["sais", "connais", "peux"], "sais", "Une compétence → savoir."),
      c("g7v-12", "Je ___ bien cette prof : elle est stricte.", ["connais", "sais", "comprends"], "connais", "Une personne → connaître."),
      s("g7v-13", "Mettez au pluriel.", "Il choisit la biologie.", "Ils choisissent la biologie."),
      s("g7v-14", "Mettez au singulier.", "Nous prenons des notes.", "Je prends des notes."),
      o("g7v-15", "Les élèves finissent leur exposé."),
      o("g7v-16", "Est-ce que tu comprends la question ?"),
    ],
  },
  {
    id: "G7-REGLES", unite: "S1-U7", titre: "Il faut, on doit, il est interdit de",
    explication: [
      "Pour une règle générale : **il faut** + infinitif. **Il faut** arriver à l'heure.",
      "Pour une personne : **devoir** + infinitif. Tu **dois** lever la main.",
      "La permission : **avoir le droit de** / **pouvoir** + infinitif. On **a le droit de** boire de l'eau en classe.",
      "L'interdiction : **il est interdit de** + infinitif · **on ne doit pas** · **il ne faut pas**. **Il est interdit de** fumer dans le bâtiment.",
      "Dans un règlement, on utilise aussi l'**impératif** ou l'**infinitif** : Éteignez vos portables. · Ne pas courir dans les couloirs.",
    ],
    exercices: [
      c("g7r-01", "___ éteindre son portable en classe.", ["Il faut", "Il doit", "On faut"], "Il faut"),
      c("g7r-02", "Les élèves ___ arriver à l'heure.", ["doivent", "doit", "devons"], "doivent"),
      c("g7r-03", "Il est interdit ___ manger dans la bibliothèque.", ["de", "à", "—"], "de"),
      c("g7r-04", "On ___ le droit de sortir pendant la pause.", ["a", "est", "fait"], "a"),
      c("g7r-05", "Il ne faut pas ___ en retard.", ["être", "es", "est"], "être"),
      c("g7r-06", "Quelle phrase exprime une interdiction ?", ["On ne doit pas courir dans les couloirs.", "On peut courir dehors.", "Il faut courir."], "On ne doit pas courir dans les couloirs."),
      s("g7r-07", "Transformez avec « il faut ».", "On doit faire attention.", "Il faut faire attention."),
      s("g7r-08", "Transformez avec « il est interdit de ».", "On ne doit pas fumer ici.", "Il est interdit de fumer ici."),
      s("g7r-09", "Transformez avec « devoir » (tu).", "Il faut rendre l'exposé lundi.", "Tu dois rendre l'exposé lundi."),
      s("g7r-10", "Transformez avec « avoir le droit de » (nous).", "Nous pouvons utiliser l'ordinateur.", "Nous avons le droit d'utiliser l'ordinateur.", [], "de + voyelle → d'."),
      s("g7r-11", "Mettez à l'impératif (vous).", "lever la main avant de parler", "Levez la main avant de parler."),
      s("g7r-12", "Mettez à l'impératif négatif (vous).", "faire du bruit", "Ne faites pas de bruit.", [], "Négation : pas de bruit."),
      c("g7r-13", "Tu ___ venir avec nous à la cafétéria ? — Oui, j'ai le temps.", ["peux", "dois", "faut"], "peux"),
      o("g7r-14", "Il est interdit d'utiliser le portable en classe."),
      o("g7r-15", "Il faut réviser régulièrement."),
    ],
  },
  /* ─ ligne de lecture ─ */
  {
    id: "L1-CADRE", unite: "S1-L1", titre: "Qui, où, quand ? Le cadre d'un roman",
    explication: [
      "Le **cadre** d'un roman, c'est le **lieu** et l'**époque** de l'histoire. On le trouve souvent dans les premières pages.",
      "Pour le présenter : L'histoire **se passe** à Paris, **en** hiver, **dans les années** cinquante. · **Il s'agit d'**un meurtre.",
      "Le **personnage principal** est au centre de l'histoire ; les autres sont des **personnages secondaires**.",
      "Le **narrateur** est la voix qui raconte. Il n'est pas l'auteur ! Chez Simenon, il ne dit pas « je » : il raconte à la 3e personne.",
    ],
    exercices: [
      c("l1-01", "L'histoire ___ à Paris.", ["se passe", "passe", "s'agit"], "se passe"),
      c("l1-02", "Il ___ d'une disparition.", ["s'agit", "se passe", "est"], "s'agit"),
      c("l1-03", "Le cadre d'un roman, c'est…", ["le lieu et l'époque", "le titre et l'auteur", "le début et la fin"], "le lieu et l'époque"),
      c("l1-04", "La voix qui raconte l'histoire s'appelle…", ["le narrateur", "l'auteur", "le personnage principal"], "le narrateur"),
      c("l1-05", "L'histoire se passe ___ hiver.", ["en", "au", "à l'"], "en", "en hiver, en été, en automne, mais au printemps."),
      c("l1-06", "L'histoire se passe ___ années cinquante.", ["dans les", "en", "aux"], "dans les"),
      c("l1-07", "Simenon est ___ du roman.", ["l'auteur", "le narrateur", "le personnage"], "l'auteur"),
      s("l1-08", "Complétez avec « il s'agit de » ou « l'histoire se passe ».", "___ dans un petit hôtel du quartier Montparnasse.", "L'histoire se passe"),
      s("l1-09", "Complétez avec « il s'agit de » ou « l'histoire se passe ».", "___ d'un vol de bijoux.", "Il s'agit"),
      o("l1-10", "Le personnage principal est un commissaire de police."),
      o("l1-11", "L'histoire se passe à Paris, en hiver."),
    ],
  },
  {
    id: "L3-PORTRAIT", unite: "S1-L3", titre: "Faire le portrait d'un personnage",
    explication: [
      "Le **physique** : Il **est** grand et gros. Il **a** les cheveux gris. Il **porte** un manteau noir et un chapeau.",
      "Le **caractère** : Il **est** calme, patient, mais parfois têtu.",
      "L'**impression** : Il **a l'air** nerveux. (l'adjectif s'accorde souvent avec la personne : elle a l'air nerveuse) · Il **semble** fatigué.",
      "Les **habitudes** : Il **fume** la pipe. Il **boit** souvent une bière.",
      "Pour justifier : Il est patient **parce qu'**il écoute les témoins pendant des heures.",
    ],
    exercices: [
      c("l3-01", "Le suspect ___ un manteau gris.", ["porte", "a l'air", "est"], "porte"),
      c("l3-02", "La concierge a l'air ___ .", ["nerveuse", "nerveux", "nerveuses"], "nerveuse"),
      c("l3-03", "Maigret ___ les cheveux courts.", ["a", "est", "porte"], "a"),
      c("l3-04", "Elle ___ fatiguée.", ["semble", "a l'air de", "porte"], "semble"),
      c("l3-05", "C'est une femme ___ : elle ne dit jamais la vérité.", ["menteuse", "honnête", "courageuse"], "menteuse"),
      s("l3-06", "Mettez au féminin.", "Le témoin est mystérieux.", "La témoin est mystérieuse.", ["Le témoin est mystérieuse."], "« témoin » reste souvent masculin ; on accepte la témoin."),
      s("l3-07", "Mettez au féminin.", "Il a l'air courageux.", "Elle a l'air courageuse."),
      s("l3-08", "Mettez au pluriel.", "Le suspect est nerveux.", "Les suspects sont nerveux.", [], "nerveux ne change pas au pluriel."),
      s("l3-09", "Justifiez avec « parce que ».", "Maigret est patient. Il écoute les témoins pendant des heures.", "Maigret est patient parce qu'il écoute les témoins pendant des heures."),
      o("l3-10", "Le mari a l'air très nerveux."),
      o("l3-11", "Elle porte une robe noire et un chapeau."),
    ],
  },
];

/* Le point « résumer » quitte l'unité 7 pour la dernière station de lecture. */
export const DEPLACEMENTS_POINTS_S1 = { "G7-RESUME": "S1-L5" };

/* ─────────── Tournures ─────────── */
export const TOURNURES_PLUS_S1 = [
  t("T7G-01", "S1-U7", "Je suis en première année au gymnase de…", "Ich bin im ersten Jahr am Gymnasium…", "Vous vous présentez à un élève d'échange.", "première"),
  t("T7G-02", "S1-U7", "Mon option spécifique, c'est…", "Mein Schwerpunktfach ist…", "Vous dites quelle option vous avez choisie.", "option"),
  t("T7G-03", "S1-U7", "Ma matière préférée, c'est la chimie.", "Mein Lieblingsfach ist Chemie.", "On vous demande ce que vous aimez à l'école.", "préférée"),
  t("T7G-04", "S1-U7", "Le lundi, j'ai cours de huit heures à seize heures.", "Am Montag habe ich von acht bis sechzehn Uhr Unterricht.", "Vous expliquez votre horaire.", "cours"),
  t("T7G-05", "S1-U7", "Est-ce que vous pouvez répéter, s'il vous plaît ?", "Können Sie bitte wiederholen?", "Vous n'avez pas compris la consigne du prof.", "répéter"),
  t("T7G-06", "S1-U7", "Comment est-ce qu'on dit « Referat » en français ?", "Wie sagt man „Referat“ auf Französisch?", "Il vous manque un mot.", "dit"),
  t("T7G-07", "S1-U7", "Qu'est-ce que ça veut dire ?", "Was bedeutet das?", "Vous ne comprenez pas un mot.", "veut"),
  t("T7G-08", "S1-U7", "Excusez-moi, je suis en retard.", "Entschuldigung, ich bin zu spät.", "Vous arrivez après le début du cours.", "retard"),
  t("T7G-09", "S1-U7", "On a une interrogation la semaine prochaine.", "Wir haben nächste Woche einen Test.", "Vous rappelez une date à un camarade.", "interrogation"),
  t("T7G-10", "S1-U7", "Tu peux me passer tes notes ?", "Kannst du mir deine Notizen geben?", "Vous étiez absent et vous demandez de l'aide.", "notes"),
  // ligne de lecture : nouvelles tournures
  t("TL-01", "S1-L2", "Qui est le narrateur ?", "Wer ist der Erzähler?", "Vous posez une question sur le texte.", "narrateur"),
  t("TL-02", "S1-L2", "Le chapitre se termine sur une question.", "Das Kapitel endet mit einer Frage.", "Vous commentez la fin d'un chapitre.", "termine"),
  t("TL-03", "S1-L3", "À mon avis, le coupable, c'est…", "Meiner Meinung nach ist der Täter…", "Vous faites une hypothèse.", "avis"),
  t("TL-04", "S1-L3", "Il a un alibi : il était au cinéma.", "Er hat ein Alibi: Er war im Kino.", "Vous expliquez pourquoi un suspect est innocent.", "alibi"),
  t("TL-05", "S1-L4", "Cet indice est important parce que…", "Dieser Hinweis ist wichtig, weil…", "Vous justifiez votre idée.", "indice"),
  t("TL-06", "S1-L4", "C'est une fausse piste.", "Das ist eine falsche Spur.", "Une idée de l'enquête ne mène à rien.", "piste"),
];
/* les tournures de l'ancienne unité « Lire et résumer » vont sur la ligne de lecture */
export const DEPLACEMENTS_TOURNURES_S1 = {
  "T7-01": "S1-L1", "T7-02": "S1-L1", "T7-03": "S1-L1", "T7-04": "S1-L2", "T7-05": "S1-L2",
  "T7-06": "S1-L5", "T7-07": "S1-L3", "T7-08": "S1-L3", "T7-09": "S1-L5", "T7-10": "S1-L5",
};
export const DEPLACEMENTS_PHRASES_S1 = {
  "P7-01": "S1-L1", "P7-02": "S1-L1", "P7-03": "S1-L1", "P7-04": "S1-L2", "P7-05": "S1-L3",
  "P7-06": "S1-L5", "P7-07": "S1-L3", "P7-08": "S1-L5",
};

/* ─────────── Phrases (traduire en entier) ─────────── */
export const PHRASES_PLUS_S1 = [
  p("P1-09", "S1-U1", "Mein bester Freund ist sehr lustig, aber manchmal faul.", "Mon meilleur ami est très drôle, mais parfois paresseux."),
  p("P1-10", "S1-U1", "Woher kommst du?", "D'où est-ce que tu viens ?", ["D'où viens-tu ?", "Tu viens d'où ?"]),
  p("P1-11", "S1-U1", "Ich finde, dass sie sehr mutig ist.", "Je trouve qu'elle est très courageuse."),
  p("P1-12", "S1-U1", "Er ist eher schüchtern, aber sehr nett.", "Il est plutôt timide, mais très gentil."),
  p("P1-13", "S1-U1", "Was gefällt dir an deiner Schwester?", "Qu'est-ce qui te plaît chez ta sœur ?"),
  p("P1-14", "S1-U1", "Wir haben eine Gemeinsamkeit: Wir lieben die Berge.", "Nous avons un point commun : nous adorons la montagne.", ["Nous avons un point commun : nous aimons la montagne.", "On a un point commun : on adore la montagne."]),
  p("P1-15", "S1-U1", "Ich auch! – Ich auch nicht.", "Moi aussi ! – Moi non plus."),
  p("P2-09", "S1-U2", "Ich stehe nie vor sieben Uhr auf.", "Je ne me lève jamais avant sept heures."),
  p("P2-10", "S1-U2", "Am Wochenende treffe ich meine Freunde.", "Le week-end, je retrouve mes amis.", ["Le week-end, je vois mes amis."]),
  p("P2-11", "S1-U2", "Hast du Lust, schwimmen zu gehen?", "Tu as envie d'aller nager ?", ["Ça te dit d'aller nager ?", "Est-ce que tu as envie d'aller nager ?"]),
  p("P2-12", "S1-U2", "Ich mache nichts am Sonntag.", "Je ne fais rien le dimanche.", ["Je ne fais rien dimanche."]),
  p("P2-13", "S1-U2", "Wir treffen uns um vier Uhr vor dem Kino.", "On se retrouve à quatre heures devant le cinéma.", ["Nous nous retrouvons à quatre heures devant le cinéma.", "On se retrouve à seize heures devant le cinéma."]),
  p("P2-14", "S1-U2", "Ich muss mich beeilen, ich bin spät dran.", "Je dois me dépêcher, je suis en retard."),
  p("P2-15", "S1-U2", "Ich tanze gern, weil es Spass macht.", "J'aime danser parce que c'est amusant.", ["J'aime danser parce que c'est drôle."]),
  p("P3-09", "S1-U3", "Mein Zimmer ist hell, weil es zwei Fenster hat.", "Ma chambre est claire parce qu'elle a deux fenêtres."),
  p("P3-10", "S1-U3", "Die Lampe ist auf dem Schreibtisch.", "La lampe est sur le bureau."),
  p("P3-11", "S1-U3", "Unter dem Bett liegt ein Teppich.", "Sous le lit, il y a un tapis.", ["Il y a un tapis sous le lit."]),
  p("P3-12", "S1-U3", "Meiner Meinung nach ist die Küche zu klein.", "À mon avis, la cuisine est trop petite."),
  p("P3-13", "S1-U3", "Ich räume mein Zimmer am Samstag auf.", "Je range ma chambre le samedi.", ["Je range ma chambre samedi."]),
  p("P3-14", "S1-U3", "Im Vordergrund sieht man zwei Kinder.", "Au premier plan, on voit deux enfants.", ["Au premier plan, il y a deux enfants."]),
  p("P3-15", "S1-U3", "Ihre Wohnung ist im dritten Stock.", "Leur appartement est au troisième étage.", ["Son appartement est au troisième étage."]),
  p("P4-09", "S1-U4", "Ich esse kein Fleisch, ich bin Vegetarierin.", "Je ne mange pas de viande, je suis végétarienne."),
  p("P4-10", "S1-U4", "Wie viele Äpfel möchten Sie?", "Combien de pommes voulez-vous ?", ["Combien de pommes est-ce que vous voulez ?", "Vous voulez combien de pommes ?"]),
  p("P4-11", "S1-U4", "Die Suppe? Ich nehme sie.", "La soupe ? Je la prends."),
  p("P4-12", "S1-U4", "Es hat zu viel Zucker in diesem Kuchen.", "Il y a trop de sucre dans ce gâteau."),
  p("P4-13", "S1-U4", "Die Rechnung, bitte.", "L'addition, s'il vous plaît."),
  p("P4-14", "S1-U4", "Ich hätte gern eine Flasche Wasser.", "Je voudrais une bouteille d'eau.", ["Je voudrais une bouteille d'eau, s'il vous plaît."]),
  p("P4-15", "S1-U4", "Das Gericht ist scharf, also trinke ich viel Wasser.", "Le plat est épicé, donc je bois beaucoup d'eau.", ["Le plat est épicé, alors je bois beaucoup d'eau."]),
  p("P5-09", "S1-U5", "Nehmen Sie die zweite Strasse rechts.", "Prenez la deuxième rue à droite."),
  p("P5-10", "S1-U5", "Die Apotheke ist neben der Bäckerei.", "La pharmacie est à côté de la boulangerie."),
  p("P5-11", "S1-U5", "Überquere die Strasse nicht hier!", "Ne traverse pas la rue ici !"),
  p("P5-12", "S1-U5", "Ich wohne in einem ruhigen Quartier.", "J'habite dans un quartier tranquille.", ["J'habite dans un quartier calme."]),
  p("P5-13", "S1-U5", "Wo ist die nächste Metrostation?", "Où est la station de métro la plus proche ?", ["Où est la prochaine station de métro ?"]),
  p("P5-14", "S1-U5", "Steigen Sie in Bastille um.", "Changez à Bastille.", ["Prenez la correspondance à Bastille."]),
  p("P5-15", "S1-U5", "Es ist nicht weit, also gehen wir zu Fuss.", "Ce n'est pas loin, alors on y va à pied.", ["Ce n'est pas loin, donc nous allons à pied.", "Ce n'est pas loin, alors nous allons à pied."]),
  p("P6-09", "S1-U6", "Morgen werden wir den Louvre besuchen.", "Demain, nous allons visiter le Louvre.", ["Demain, on va visiter le Louvre."]),
  p("P6-10", "S1-U6", "Wir sind gerade angekommen.", "Nous venons d'arriver.", ["On vient d'arriver."]),
  p("P6-11", "S1-U6", "Das ist das Quartier, das ich am liebsten habe.", "C'est le quartier que je préfère."),
  p("P6-12", "S1-U6", "Ich denke, dass Paris sehr teuer ist.", "Je pense que Paris est très cher."),
  p("P6-13", "S1-U6", "Zum Beispiel kann man eine Bootsfahrt machen.", "Par exemple, on peut faire un tour en bateau."),
  p("P6-14", "S1-U6", "Das ist die Jugendherberge, wo wir schlafen.", "C'est l'auberge de jeunesse où nous dormons.", ["C'est l'auberge de jeunesse où on dort."]),
  p("P6-15", "S1-U6", "Die Aussicht ist genial!", "La vue est géniale !"),
  p("P7G-01", "S1-U7", "Ich bin im ersten Jahr am Gymnasium.", "Je suis en première année au gymnase."),
  p("P7G-02", "S1-U7", "Mein Lieblingsfach ist Geschichte.", "Ma matière préférée, c'est l'histoire.", ["Ma matière préférée est l'histoire."]),
  p("P7G-03", "S1-U7", "Am Mittwochnachmittag habe ich keinen Unterricht.", "Le mercredi après-midi, je n'ai pas cours.", ["Mercredi après-midi, je n'ai pas cours."]),
  p("P7G-04", "S1-U7", "Man muss pünktlich sein.", "Il faut être à l'heure.", ["Il faut être ponctuel.", "On doit être à l'heure."]),
  p("P7G-05", "S1-U7", "Es ist verboten, in der Bibliothek zu essen.", "Il est interdit de manger dans la bibliothèque.", ["Il est interdit de manger à la bibliothèque."]),
  p("P7G-06", "S1-U7", "Die Schüler beenden ihren Vortrag.", "Les élèves finissent leur exposé."),
  p("P7G-07", "S1-U7", "Ich verstehe die Frage nicht.", "Je ne comprends pas la question."),
  p("P7G-08", "S1-U7", "Wir dürfen in der Pause hinausgehen.", "Nous avons le droit de sortir pendant la pause.", ["On a le droit de sortir pendant la pause."]),
  p("P7G-09", "S1-U7", "Sie wählt Biologie, weil sie Tiere liebt.", "Elle choisit la biologie parce qu'elle aime les animaux.", ["Elle choisit la biologie car elle aime les animaux."]),
  p("P7G-10", "S1-U7", "Hebt die Hand, bevor ihr sprecht!", "Levez la main avant de parler !"),
  p("P7G-11", "S1-U7", "Ich muss heute Abend für die Prüfung lernen.", "Je dois réviser pour l'examen ce soir.", ["Ce soir, je dois réviser pour l'examen."]),
  p("P7G-12", "S1-U7", "Unsere Lehrerin ist streng, aber gerecht.", "Notre prof est stricte, mais juste.", ["Notre professeure est stricte, mais juste.", "Notre enseignante est stricte, mais juste."]),
  p("P7G-13", "S1-U7", "Ich mache Notizen während des Unterrichts.", "Je prends des notes pendant le cours."),
  p("P7G-14", "S1-U7", "Er hat eine gute Note in Mathematik.", "Il a une bonne note en mathématiques.", ["Il a une bonne note en maths."]),
  p("P7G-15", "S1-U7", "Ich habe Angst, die Prüfung nicht zu bestehen.", "J'ai peur de rater l'examen.", ["J'ai peur d'échouer à l'examen."]),
  // ligne de lecture
  p("PL-01", "S1-L2", "Der Kommissar befragt die Hauswartin.", "Le commissaire interroge la concierge."),
  p("PL-02", "S1-L2", "Wer erzählt die Geschichte?", "Qui raconte l'histoire ?"),
  p("PL-03", "S1-L3", "Der Zeuge sieht nervös aus.", "Le témoin a l'air nerveux."),
  p("PL-04", "S1-L3", "Ich denke, dass die Frau lügt.", "Je pense que la femme ment."),
  p("PL-05", "S1-L4", "Die Polizei findet einen Fingerabdruck auf dem Glas.", "La police trouve une empreinte sur le verre."),
  p("PL-06", "S1-L4", "Das ist eine falsche Spur.", "C'est une fausse piste."),
  p("PL-07", "S1-L5", "Am Ende sagt der Täter die Wahrheit.", "À la fin, le coupable dit la vérité.", ["Finalement, le coupable dit la vérité."]),
];

/* ─────────── Textes à trous : plusieurs blancs sur un même écran ───────────
   {réponse/variante|indice} */
export const TEXTES_S1 = [
  x("X1-01", "S1-U1", "Une interview", "Complétez l'interview avec les mots interrogatifs.",
    "— {Comment|wie} est-ce que tu t'appelles ? — Je m'appelle Noah.\n— {Quel|welches} âge as-tu ? — J'ai quinze ans.\n— {Où/Où est-ce que|wo} tu habites ? — À Muttenz.\n— {Qu'est-ce que|was} tu fais le week-end ? — Je joue au basket.\n— {Pourquoi|warum} est-ce que tu aimes le basket ? — Parce que c'est un sport d'équipe."),
  x("X1-02", "S1-U1", "Le portrait de Mila", "Complétez avec les verbes au présent et les adjectifs accordés.",
    "Ma meilleure amie {s'appelle|s'appeler}. Elle {a|avoir} seize ans et elle {habite|habiter} à Bâle. Elle est très {curieuse|curieux} et un peu {bavarde|bavard}. Nous {sommes|être} amies depuis l'école primaire. Moi, je suis plutôt timide, mais {elle|pronom tonique}, elle parle avec tout le monde !"),
  x("X2-01", "S1-U2", "Ma journée", "Complétez avec les verbes pronominaux au présent.",
    "Le matin, je {me réveille|se réveiller} à six heures et demie, mais je {me lève|se lever} à sept heures. Mon frère et moi, nous {nous dépêchons|se dépêcher} parce que le bus part à sept heures vingt. Le soir, mes parents {se reposent|se reposer} devant la télé et moi, je {me couche|se coucher} vers dix heures."),
  x("X2-02", "S1-U2", "Un message", "Complétez le message avec la négation demandée.",
    "Salut ! Désolé, samedi je ne suis {pas|nicht} libre. Je ne sors {jamais|nie} le samedi soir : je travaille au café. Dimanche, je ne fais {rien|nichts}. On se retrouve dimanche ? Je ne connais {personne|niemanden} au club, tu peux venir avec moi ?"),
  x("X3-01", "S1-U3", "Ma chambre", "Complétez avec les prépositions de lieu.",
    "Ma chambre est petite, mais claire. Le lit est {contre|gegen} le mur, {sous|unter} la fenêtre. {À côté du/à côté du|neben} lit, il y a une petite table. Le bureau est {en face du|gegenüber} lit et {au-dessus du|über} bureau, il y a une étagère avec mes livres."),
  x("X3-02", "S1-U3", "Chez nous", "Complétez avec les possessifs.",
    "Voici {notre|unser} appartement. {Ma|meine} chambre est au fond du couloir. {Mon|mein} armoire est très grande. Mes parents ont {leur|ihr} chambre à côté de la cuisine. Et toi, comment est {ta|deine} chambre ?"),
  x("X4-01", "S1-U4", "Au marché", "Complétez avec du, de la, de l', des ou de.",
    "Aujourd'hui, j'achète {du|partitif} pain, {de la|partitif} salade et {des|pluriel} tomates. Je voudrais aussi un kilo {de|quantité} pommes. Je ne prends pas {de|négation} viande : je suis végétarien. Et pour boire, {de l'|partitif} eau minérale."),
  x("X4-02", "S1-U4", "Au restaurant", "Complétez le dialogue.",
    "— Bonjour, vous avez {choisi|gewählt} ? — Oui. Comme entrée, je voudrais la soupe. — Et comme plat {principal|Hauptgericht} ? — Le poisson, s'il vous plaît. — Le poisson ? Désolé, il n'y en a plus. — Alors, le steak. Je {le|Pronomen} prends bien cuit. — Et comme {boisson|Getränk} ? — Une bouteille d'eau. Et l'{addition|Rechnung}, s'il vous plaît !"),
  x("X5-01", "S1-U5", "Un itinéraire", "Complétez avec l'impératif (vous).",
    "Pour aller au musée, {sortez|sortir} de la gare et {tournez|tourner} à gauche. {Traversez|traverser} la place et {allez|aller} tout droit jusqu'au carrefour. Là, {prenez|prendre} le bus 30 et {descendez|descendre} à l'arrêt « Musée »."),
  x("X5-02", "S1-U5", "Où vas-tu ?", "Complétez avec à, au, à la, aux, en, chez.",
    "Ce matin, je vais {à la|à + la} pharmacie, puis {au|à + le} marché. À midi, je mange {chez|Person} ma grand-mère. L'été prochain, nous partons {en|Land, f.} Espagne et mon frère va {aux|à + les} États-Unis."),
  x("X6-01", "S1-U6", "Notre programme", "Complétez avec le futur proche ou le passé récent.",
    "Nous {venons d'|venir de} arriver à la gare de Lyon. Ce soir, nous {allons|aller} dîner dans le Marais. Demain matin, on {va|aller} visiter le Louvre. Ma sœur {vient de|venir de} réserver les billets en ligne !"),
  x("X6-02", "S1-U6", "Une carte postale", "Complétez avec qui, que ou où.",
    "Chère Maman, Paris est une ville {que|Relativpronomen} j'adore ! Nous dormons dans une auberge {qui|Subjekt} est près du canal Saint-Martin. Hier, nous avons visité Montmartre, le quartier {où|Ort} les peintres travaillaient. La tour Eiffel est le monument {que|Objekt} je préfère. Bisous, Lena"),
  x("X7-01", "S1-U7", "Mon gymnase", "Complétez avec les verbes au présent.",
    "Au gymnase, nous {avons|avoir} cours de huit heures à seize heures. J'{apprends|apprendre} l'anglais et l'italien. Cette année, nous {choisissons|choisir} notre option spécifique. Les cours {finissent|finir} tôt le mercredi. Je {comprends|comprendre} bien les maths, mais pas la chimie !"),
  x("X7-02", "S1-U7", "Le règlement", "Complétez le règlement.",
    "1. Il {faut|müssen} arriver à l'heure. 2. Il est {interdit|verboten} d'utiliser le portable en classe. 3. On a le {droit|Recht} de boire de l'eau pendant le cours. 4. Les élèves {doivent|devoir} prévenir quand ils sont absents. 5. {Levez|lever, Imperativ} la main avant de parler."),
  // ligne de lecture
  x("XL-01", "S1-L1", "Le début du roman", "Complétez la présentation du roman.",
    "Le {titre|Titel} du roman est « Maigret et la jeune morte ». L'{auteur|Autor}, c'est Georges Simenon. L'histoire {se passe|spielt} à Paris, dans les années cinquante. Il {s'agit|es geht um} d'un meurtre. Le personnage {principal|Haupt-} est le commissaire Maigret."),
  x("XL-02", "S1-L5", "Un résumé", "Complétez le résumé avec les connecteurs.",
    "{D'abord|zuerst}, la police trouve une jeune femme morte dans une rue. {Ensuite|dann}, Maigret interroge les personnes qui la connaissent. Le mari a un alibi, {donc|also} il n'est pas coupable. Maigret soupçonne une amie {parce qu'|weil} elle ment. {Finalement|schliesslich}, la coupable avoue."),
];

/* ─────────── Défi de l'unité 7 ─────────── */
export const DEFI_U7_S1 = {
  consigne: "Un élève d'échange de Lyon arrive dans votre classe. Écrivez-lui un message (6 à 8 phrases) : votre gymnase, votre horaire, vos matières préférées et trois règles importantes.",
  motsImposes: ["l'option spécifique", "avoir cours", "il faut", "il est interdit de"],
  controle: [
    "Je présente le gymnase, l'horaire et au moins deux matières.",
    "J'écris trois règles avec il faut, devoir ou il est interdit de.",
    "Les verbes en -ir et -re sont bien conjugués (nous finissons, ils comprennent).",
    "J'utilise les quatre éléments imposés.",
  ],
  modele: "Salut Hugo ! Bienvenue dans notre classe. Notre gymnase est grand et moderne, près de la gare. Nous avons cours de huit heures à seize heures, sauf le mercredi après-midi. Mon option spécifique, c'est la biologie, et ma matière préférée, c'est l'histoire. Il y a trois règles importantes : il faut arriver à l'heure, il est interdit d'utiliser le portable en classe et on doit lever la main avant de parler. Les profs sont stricts, mais sympas. À lundi !",
};

/* ─────────── Évaluations de la saison ─────────── */
export const EVALUATIONS_S1 = {
  "S1-EV-PORTRAIT": {
    titre: "Interview et portrait", type: "Oral et écrit", quand: "Fin de l'unité 1",
    objectif: "Interviewer une personne de la classe, puis écrire son portrait.",
    criteres: [
      { critere: "Questions variées", detail: "Est-ce que, inversion et mots interrogatifs (où, quand, pourquoi, qu'est-ce que…)." },
      { critere: "Portrait complet", detail: "Identité, caractère, passions, un point commun ; au moins trois adjectifs bien accordés." },
      { critere: "Langue", detail: "Présent correct, accords des adjectifs, pronoms toniques (moi aussi, avec lui)." },
      { critere: "Prononciation et aisance", detail: "Phrases complètes, on se comprend sans peine." },
    ],
    modele: {
      texte: "Elena a seize ans et elle vient de Lugano. Elle habite à Bâle depuis trois ans. Elle est ouverte et très drôle, mais elle est un peu têtue. Sa passion, c'est le volley : elle s'entraîne trois fois par semaine. Elle aime aussi cuisiner pour ses amis. Nous avons un point commun : nous détestons nous lever tôt ! Je trouve qu'elle est courageuse parce qu'elle parle trois langues et qu'elle change souvent d'école.",
      remarques: [
        "Ordre logique : identité, caractère, passions, point commun, avis.",
        "Adjectifs accordés au féminin : ouverte, têtue, courageuse.",
        "Un avis justifié à la fin : je trouve que… parce que…",
      ],
    },
    tournures: ["Est-ce que je peux te poser une question ?", "Depuis combien de temps est-ce que tu… ?", "Qu'est-ce qui te plaît dans… ?", "Elle est plutôt…, mais…", "Nous avons un point commun : …", "Je trouve qu'il est… parce que…"],
    conseils: ["Préparez huit questions, mais écoutez les réponses et rebondissez.", "Notez des mots-clés pendant l'interview, pas des phrases.", "Relisez les accords : elle est curieuse, il est curieux."],
    entrainement: {
      titre: "Le portrait d'un camarade",
      consigne: "Écrivez le portrait d'un camarade de classe ou d'une personne célèbre (7 à 10 phrases), à partir de cinq questions que vous lui posez (ou que vous imaginez).",
      controle: ["J'écris au présent, à la 3e personne.", "J'utilise au moins trois adjectifs de caractère, bien accordés.", "Je donne un avis justifié (je trouve que… parce que…).", "J'ai relu les accents."],
      modele: "Elena a seize ans et elle vient de Lugano… (voir l'exemple ci-dessus)",
    },
  },
  "S1-EV-COCE": {
    titre: "Compréhension orale et écrite", type: "Test écrit", quand: "Milieu de semestre",
    objectif: "Comprendre un document audio et un texte courts sur les thèmes des unités 1 à 3.",
    criteres: [
      { critere: "Informations principales", detail: "Qui ? Où ? Quand ? Quoi ? Je les retrouve dans le document." },
      { critere: "Détails", detail: "Chiffres, heures, lieux, adjectifs : je les note précisément." },
      { critere: "Réponses", detail: "Je réponds par des phrases courtes et complètes, avec les mots du texte quand c'est utile." },
    ],
    tournures: ["Selon le texte, …", "Dans le document, on apprend que…", "Le texte parle de…", "C'est faux, parce que…"],
    conseils: [
      "Lisez les questions avant d'écouter : elles disent ce qu'il faut chercher.",
      "À la première écoute, notez les mots-clés ; à la deuxième, complétez.",
      "Pour un vrai / faux, justifiez avec une phrase du texte.",
      "Entraînez-vous avec la séance du jour : les dictées et les questions « écouter » travaillent l'oreille.",
    ],
  },
  "S1-EV-INTERRO": {
    titre: "Interrogation de grammaire et de vocabulaire", type: "Interrogation écrite", quand: "Après l'unité 4",
    objectif: "Montrer qu'on maîtrise les bases du semestre : présent, questions, négation, articles, possessifs, lieux.",
    criteres: [
      { critere: "Présent", detail: "Verbes en -er, être, avoir, aller, faire, verbes pronominaux." },
      { critere: "Questions et négation", detail: "Est-ce que, inversion, mots interrogatifs ; ne… pas / jamais / rien / personne / plus." },
      { critere: "Articles", detail: "le / un / du ; de après une négation ou une quantité." },
      { critere: "Vocabulaire", detail: "Les mots des unités 1 à 4, écrits correctement avec leur article." },
    ],
    conseils: [
      "Faites les défis des unités 1 à 4 : ils reprennent exactement ces points.",
      "Dans le carnet, la liste « Difficiles » montre ce qui résiste encore : révisez-la en priorité.",
      "Apprenez chaque nom avec son article : la chambre, le lit, l'armoire (f.).",
    ],
  },
  "S1-EV-PARIS": {
    titre: "Un week-end à Paris", type: "Projet de groupe (oral)", quand: "Fin de l'unité 6",
    objectif: "En groupe, présenter le programme d'un week-end de deux jours à Paris pour la classe, avec un budget et un itinéraire.",
    criteres: [
      { critere: "Programme", detail: "Deux jours réalistes : transports, visites, repas, logement, budget." },
      { critere: "Langue", detail: "Futur proche (on va visiter), impératif (prenez la ligne 4), qui / que / où." },
      { critere: "Présentation", detail: "Chacun parle, sans lire ; un plan ou des images aident le public." },
      { critere: "Interaction", detail: "Le groupe répond aux questions de la classe." },
    ],
    modele: {
      texte: "Samedi matin, nous allons arriver à la gare de Lyon à neuf heures. D'abord, nous allons déposer nos sacs à l'auberge de jeunesse, qui est près du canal Saint-Martin. Ensuite, prenez la ligne 1 jusqu'à Concorde : nous allons visiter le musée d'Orsay. À midi, on va manger des crêpes dans le quartier Latin, le quartier que nous préférons. Le soir, nous allons faire un tour en bateau sur la Seine. Le budget pour deux jours, c'est environ 180 francs par personne.",
      remarques: ["Le programme suit l'ordre du temps : d'abord, ensuite, à midi, le soir.", "Futur proche partout ; l'impératif pour guider le public.", "Un chiffre précis rend le projet crédible."],
    },
    tournures: ["Nous allons arriver à…", "D'abord…, ensuite…, le soir…", "Prenez la ligne… jusqu'à…", "C'est le quartier où…", "Le budget, c'est environ…", "Vous avez des questions ?"],
    conseils: ["Répartissez les parties : transports, visites, repas, budget.", "Préparez une carte ou un plan de métro.", "Entraînez-vous à voix haute : trois minutes par personne au maximum."],
    entrainement: {
      titre: "Mon programme pour Paris",
      consigne: "Écrivez votre partie de la présentation (8 à 10 phrases) : un moment du week-end, avec l'itinéraire et ce qu'on va faire.",
      controle: ["J'utilise le futur proche.", "J'explique un itinéraire avec l'impératif.", "J'utilise qui, que ou où au moins deux fois.", "Je donne des heures et des lieux précis."],
      modele: "Samedi après-midi, nous allons visiter Montmartre. Prenez la ligne 12 jusqu'à Abbesses…",
    },
  },
  "S1-EV-RESUME": {
    titre: "Résumé de lecture", type: "Production écrite (PE)", quand: "Fin du roman",
    objectif: "Résumer un chapitre ou le roman entier, au présent, avec ses propres mots.",
    criteres: [
      { critere: "Contenu", detail: "Qui ? Où ? Quand ? Que se passe-t-il ? Les étapes essentielles, sans détails inutiles." },
      { critere: "Organisation", detail: "Connecteurs : d'abord, ensuite, puis, mais, parce que, donc, finalement." },
      { critere: "Langue", detail: "Présent, 3e personne, phrases complètes, pas de copie du livre." },
      { critere: "Longueur", detail: "Environ 120 mots ; pas d'avis personnel dans le résumé." },
    ],
    modele: {
      texte: "L'histoire se passe à Paris, dans les années cinquante. D'abord, la police trouve une jeune femme morte dans une rue, la nuit. Personne ne la connaît. Ensuite, le commissaire Maigret mène l'enquête : il interroge les personnes qui ont vu la victime ce soir-là. Il découvre qu'elle est seule à Paris et très pauvre. Une amie de la victime ment, donc Maigret la soupçonne, mais elle a un alibi. Puis Maigret trouve un indice important : une lettre. Finalement, il découvre le coupable, qui avoue le crime.",
      remarques: ["Le cadre d'abord (lieu, époque), puis les étapes dans l'ordre.", "Les connecteurs rendent l'ordre clair.", "Aucun « je » : le résumé n'est pas un avis."],
    },
    tournures: ["L'histoire se passe…", "Il s'agit de…", "Le personnage principal est…", "D'abord…, ensuite…, finalement…", "À la fin, …"],
    conseils: ["Faites une liste des événements, puis gardez les cinq plus importants.", "Fermez le livre pour écrire : vos mots, pas ceux de l'auteur.", "Relisez les terminaisons du présent."],
    entrainement: {
      titre: "Résumé d'un chapitre",
      consigne: "Résumez le chapitre que vous venez de lire (100 à 120 mots), au présent et avec vos propres mots.",
      controle: ["J'écris au présent, à la 3e personne.", "Je réponds à qui ? où ? quand ? que se passe-t-il ?", "J'utilise au moins quatre connecteurs.", "Je ne donne pas mon avis."],
      modele: "L'histoire se passe à Paris, dans les années cinquante… (voir l'exemple)",
    },
  },
};

/* ─────────── Ligne de lecture : roman policier à Paris ─────────── */
const carnet = (consigne, controle, modele) => ({ consigne, controle, modele });
export const LECTURE_S1 = {
  titre: "Un roman policier à Paris",
  sous: "par exemple un Maigret de Simenon · 10 semaines",
  stations: [
    {
      id: "S1-L1", numero: 1, titre: "Le début du roman", semaines: "1–2", chapitres: "Les deux premiers chapitres",
      sous: "Le titre, l'auteur, le cadre, le personnage principal.",
      notions: ["S4-068", "S4-069", "N1-820", "S4-066", "N1-704", "N1-705", "N1-822", "N1-823", "N1-824"],
      mots: ["S4-067", "N1-707", "S4-143", "RP-006", "RP-008", "RP-010", "RP-011", "N1-828"],
      grammaire: ["L1-CADRE"],
      carnet: carnet(
        "Présentez le début du roman (5 à 7 phrases) : le titre, l'auteur, le cadre (où ? quand ?), le personnage principal, et ce qui se passe au début.",
        ["Je donne le titre et l'auteur.", "Je présente le cadre : le lieu et l'époque.", "J'écris au présent.", "Je termine par une question que je me pose."],
        "Le roman s'appelle « Maigret et la jeune morte » et l'auteur est Georges Simenon. L'histoire se passe à Paris, la nuit, dans les années cinquante. Le personnage principal est le commissaire Maigret. Au début, la police trouve une jeune femme morte dans une petite rue. Elle porte une robe du soir. Je me demande : qui est cette femme ?"),
    },
    {
      id: "S1-L2", numero: 2, titre: "L'enquête commence", semaines: "3–4", chapitres: "Chapitres 3 et 4",
      sous: "Les témoins, l'interrogatoire, le narrateur.",
      notions: ["N1-821", "N1-827"],
      mots: ["S6-049", "N1-830", "RP-026", "RP-036", "RP-032", "RP-004", "RP-007", "N1-829", "N1-833"],
      carnet: carnet(
        "Racontez un interrogatoire du chapitre (5 à 7 phrases) : qui Maigret interroge, ce que la personne dit, et ce que Maigret pense.",
        ["Je présente le témoin (nom, âge, métier).", "Je rapporte deux réponses importantes.", "J'utilise des verbes au présent.", "Je donne mon avis avec « je pense que »."],
        "Dans le chapitre trois, Maigret interroge la concierge de l'immeuble. C'est une vieille femme bavarde. Elle dit qu'elle connaît la victime, mais qu'elle ne sait pas son nom. Elle explique que la jeune femme sort tous les soirs. Maigret écoute, mais il ne dit rien. Je pense que la concierge cache quelque chose."),
    },
    {
      id: "S1-L3", numero: 3, titre: "Les suspects", semaines: "5–6", chapitres: "Chapitres 5 et 6",
      sous: "Le portrait des suspects, le mobile, l'alibi.",
      notions: [],
      mots: ["RP-001", "RP-003", "RP-016", "RP-015", "RP-031", "S2-050", "N1-832", "RP-034", "RP-019", "N1-816", "N1-817", "N1-818"],
      grammaire: ["L3-PORTRAIT"],
      carnet: carnet(
        "Faites le portrait d'un suspect (6 à 8 phrases) : son physique, son caractère, son alibi, son mobile possible. À votre avis, est-il coupable ?",
        ["Je décris le physique et le caractère.", "J'utilise « avoir l'air » ou « sembler ».", "J'explique l'alibi et le mobile.", "Je donne mon avis avec « à mon avis… parce que… »."],
        "Le premier suspect est Louis, le petit ami de la victime. Il a trente ans, il est grand et maigre, et il porte toujours un vieux manteau. Il a l'air nerveux quand Maigret lui parle. Il dit qu'il est au cinéma le soir du crime, mais personne ne le voit. Son mobile ? Il est jaloux. À mon avis, il n'est pas coupable, parce qu'il pleure quand il apprend la mort de son amie."),
    },
    {
      id: "S1-L4", numero: 4, titre: "Indices et fausses pistes", semaines: "7–8", chapitres: "Chapitres 7 et 8",
      sous: "Les indices, le suspense, l'intrigue.",
      notions: ["N1-825"],
      mots: ["RP-013", "RP-014", "RP-018", "RP-027", "RP-028", "RP-029", "RP-030", "RP-035", "RP-039", "N1-714"],
      carnet: carnet(
        "Quel est l'indice le plus important jusqu'ici ? Expliquez pourquoi, puis faites une hypothèse : qui est le coupable ? (6 à 8 phrases)",
        ["Je décris l'indice.", "J'explique pourquoi il est important (parce que, donc).", "Je fais une hypothèse avec « je pense que » ou « à mon avis ».", "Je ne raconte pas la fin du livre si je la connais !"],
        "Pour moi, l'indice le plus important est la robe du soir de la victime. C'est une robe chère, mais la jeune femme est pauvre. Donc elle ne l'achète pas : quelqu'un la lui donne. Maigret pense la même chose, parce qu'il va dans un magasin de robes. À mon avis, la coupable est l'amie riche de la victime. Elle ment depuis le début !"),
    },
    {
      id: "S1-L5", numero: 5, titre: "Le dénouement", semaines: "9–10", chapitres: "La fin du roman",
      sous: "Le dénouement, le résumé, votre avis.",
      notions: ["N1-826"],
      mots: ["RP-002", "RP-033", "RP-017", "RP-037", "RP-038", "N1-710", "N1-711", "S4-015", "S6-038", "N1-713", "S3-133", "S1-127", "S1-128"],
      grammaire: ["G7-RESUME"],
      evaluation: "S1-EV-RESUME",
      carnet: carnet(
        "Donnez votre avis sur le roman (6 à 8 phrases) : ce qui vous plaît, ce qui ne vous plaît pas, le personnage que vous préférez. Recommandez-vous ce livre ?",
        ["Je ne raconte pas toute l'histoire : je donne mon avis.", "J'utilise je trouve que, à mon avis, parce que, mais.", "Je parle d'au moins un personnage.", "Je conclus : je recommande / je ne recommande pas ce livre."],
        "J'ai lu « Maigret et la jeune morte » et je trouve que c'est un bon roman policier. Ce qui me plaît, c'est l'ambiance de Paris la nuit. Le commissaire Maigret est mon personnage préféré parce qu'il est calme et humain : il comprend les gens. Mais le début est un peu lent. À mon avis, le dénouement est surprenant. Je recommande ce livre à mes camarades."),
    },
  ],
};
