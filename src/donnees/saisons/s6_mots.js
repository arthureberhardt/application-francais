/* Saison S6 — fiches nouvelles (N6-…) et répartition des mots par unité. */

const f = (id, fr, de, cat, unite, exemple, extra = {}) => ({
  id, fr, de, cat, unite, gram: "", construction: "", exemple,
  famille: "", syn: "", ant: "", piege: "", ...extra,
});

export const MOTS_AJOUTS_S6 = [
  /* U1 · Il faut que… */
  f("N6-001", "la règle (de vie)", "die Regel", "N", "Vie en commun", "Il faut que chacun respecte les règles.", { piege: "« la règle » est aussi das Lineal." }),
  f("N6-002", "la vie en commun", "das Zusammenleben", "N", "Vie en commun", "La vie en commun exige des compromis."),
  f("N6-003", "la colocation", "die Wohngemeinschaft", "N", "Vie en commun", "En colocation, il faut que tout le monde fasse la vaisselle."),
  f("N6-004", "le, la colocataire", "der Mitbewohner, die Mitbewohnerin", "N", "Vie en commun", "Mes colocataires sont étudiants en droit."),
  f("N6-005", "les tâches ménagères (f.)", "die Hausarbeit", "N", "Vie en commun", "Nous partageons les tâches ménagères."),
  f("N6-006", "le savoir-vivre", "die guten Manieren", "N", "Vie en commun", "Dire bonjour, c'est la base du savoir-vivre."),
  f("N6-007", "le délégué, la déléguée de classe", "der Klassensprecher, die Klassensprecherin", "N", "Vie en commun", "La déléguée de classe a parlé au directeur."),
  f("N6-008", "le droit et le devoir", "Recht und Pflicht", "L", "Vie en commun", "Chaque élève a des droits et des devoirs."),
  f("N6-009", "facultatif, facultative", "freiwillig, fakultativ", "A", "Vie en commun", "Le cours de chant est facultatif.", { ant: "obligatoire" }),
  f("N6-010", "la sanction", "die Sanktion, die Strafe", "N", "Vie en commun", "Le retard entraîne une sanction."),
  f("N6-011", "tolérer", "dulden", "V", "Vie en commun", "On ne tolère aucune insulte."),
  f("N6-012", "il est indispensable que", "es ist unerlässlich, dass", "L", "Vie en commun", "Il est indispensable que tout le monde soit à l'heure."),
  f("N6-013", "exiger que", "verlangen, dass", "L", "Vie en commun", "Le prof exige que nous rendions le travail lundi."),
  f("N6-015", "le respect", "der Respekt", "N", "Vie en commun", "Le respect est la première règle."),
  /* U4 · Égaux ? */
  f("N6-030", "l'égalité (f.)", "die Gleichheit, die Gleichstellung", "N", "Égalité", "L'égalité entre femmes et hommes est inscrite dans la Constitution."),
  f("N6-031", "l'inclusion (f.)", "die Inklusion", "N", "Égalité", "L'inclusion des élèves handicapés progresse."),
  f("N6-032", "le handicap", "die Behinderung", "N", "Égalité", "Elle se déplace en fauteuil depuis un accident, mais son handicap ne l'arrête pas."),
  f("N6-033", "la parité", "die Parität", "N", "Égalité", "Le gouvernement respecte la parité : autant de femmes que d'hommes."),
  f("N6-034", "l'égalité salariale (f.)", "die Lohngleichheit", "N", "Égalité", "L'égalité salariale n'est toujours pas atteinte."),
  f("N6-035", "le féminisme", "der Feminismus", "N", "Égalité", "Le féminisme a obtenu de nombreux droits."),
  f("N6-036", "le sexisme", "der Sexismus", "N", "Égalité", "Cette publicité est accusée de sexisme."),
  f("N6-037", "le racisme", "der Rassismus", "N", "Égalité", "Le racisme est puni par la loi."),
  f("N6-038", "la minorité", "die Minderheit", "N", "Égalité", "Les droits des minorités doivent être protégés."),
  f("N6-039", "la diversité", "die Vielfalt", "N", "Égalité", "La diversité est une richesse."),
  f("N6-040", "le droit de vote", "das Stimmrecht", "N", "Égalité", "En Suisse, les femmes ont obtenu le droit de vote fédéral en 1971."),
  f("N6-041", "avoir beau (+ inf.)", "noch so sehr …", "L", "Égalité", "J'ai beau expliquer, il ne comprend pas."),
  f("N6-042", "l'émancipation (f.)", "die Emanzipation", "N", "Égalité", "L'école a joué un rôle dans l'émancipation des femmes."),
  f("N6-043", "le plafond de verre", "die gläserne Decke", "N", "Égalité", "Peu de femmes dirigent de grandes entreprises : c'est le plafond de verre."),
  f("N6-044", "le stéréotype de genre", "das Geschlechterstereotyp", "N", "Égalité", "« Les filles sont nulles en maths » : c'est un stéréotype de genre."),
  f("N6-045", "l'écart (m.)", "die Lücke, der Abstand", "N", "Égalité", "L'écart de salaire est encore de 18 %."),
  f("N6-046", "la représentation", "die Vertretung, die Darstellung", "N", "Égalité", "La représentation des femmes au Parlement a augmenté."),
  f("N6-047", "la grève féministe", "der Frauenstreik", "N", "Égalité", "Le 14 juin 2019, des centaines de milliers de personnes ont participé à la grève féministe."),
  f("N6-048", "le congé parental", "der Elternurlaub", "N", "Égalité", "Un vrai congé parental favoriserait l'égalité."),
  /* U6 · Je proteste */
  f("N6-060", "le consommateur, la consommatrice", "der Konsument, die Konsumentin", "N", "Consommation", "Les consommateurs ont des droits."),
  f("N6-061", "la réclamation", "die Reklamation", "N", "Consommation", "J'ai envoyé une réclamation au service client."),
  f("N6-062", "la garantie", "die Garantie", "N", "Consommation", "Le téléphone est encore sous garantie."),
  f("N6-063", "défectueux, défectueuse", "defekt, fehlerhaft", "A", "Consommation", "Le produit est arrivé défectueux."),
  f("N6-064", "le service client", "der Kundendienst", "N", "Consommation", "J'ai appelé trois fois le service client."),
  f("N6-065", "le colis", "das Paket", "N", "Consommation", "Le colis n'est jamais arrivé."),
  f("N6-066", "la livraison", "die Lieferung", "N", "Consommation", "La livraison a pris trois semaines."),
  f("N6-067", "la commande", "die Bestellung", "N", "Consommation", "Votre commande n° 4521 a été expédiée."),
  f("N6-068", "obtenir gain de cause", "Recht bekommen", "L", "Consommation", "Après trois lettres, elle a obtenu gain de cause."),
  f("N6-069", "dans l'attente de votre réponse", "in Erwartung Ihrer Antwort", "L", "Consommation", "Dans l'attente de votre réponse, je vous prie d'agréer…"),
  /* U7 · Le grand débat */
  f("N6-080", "le modérateur, la modératrice", "der Moderator, die Moderatorin", "N", "Débat", "La modératrice donne la parole à chaque camp."),
  f("N6-081", "prendre la parole", "das Wort ergreifen", "L", "Débat", "Je voudrais prendre la parole."),
  f("N6-082", "céder la parole", "das Wort übergeben", "L", "Débat", "Je cède la parole à mon collègue."),
  f("N6-084", "il n'en reste pas moins que", "nichtsdestotrotz, dennoch bleibt", "L", "Débat", "Certes, c'est cher ; il n'en reste pas moins que c'est nécessaire."),
  f("N6-085", "contrairement à ce que…", "im Gegensatz zu dem, was…", "L", "Débat", "Contrairement à ce que vous dites, les chiffres baissent."),
  /* lecture */
  f("N6-100", "la tirade", "die Tirade (lange Replik)", "N", "Lire", "La tirade du héros dure deux pages."),
  f("N6-101", "le fantastique", "das Fantastische", "N", "Lire", "Le fantastique fait hésiter le lecteur entre réel et surnaturel."),
  f("N6-102", "la nouvelle à chute", "die Kurzgeschichte mit Pointe", "N", "Lire", "Maupassant est le maître de la nouvelle à chute."),
  f("N6-103", "le surnaturel", "das Übernatürliche", "N", "Lire", "Rien n'est surnaturel… ou presque."),
  f("N6-104", "le roman d'anticipation", "der Zukunftsroman", "N", "Lire", "« Panorama » est un roman d'anticipation."),
];

export const MOTS_S6 = {
  "S6-U1": [
    "N6-001", "N6-002", "N6-003", "N6-004", "N6-005", "N6-006", "N6-007", "N6-008", "N6-009", "N6-010",
    "N6-011", "N6-012", "N6-013", "S4-A060", "N6-015", "RE-020",
  ],
  "S6-U2": [
    "SC-001", "SC-002", "SC-003", "SC-004", "SC-007", "SC-008", "SC-009", "SC-010", "SC-011", "SC-012",
    "SC-013", "SC-015", "SC-016", "SC-017", "SC-018", "SC-019", "SC-020", "SC-021", "SC-022", "SC-023",
    "SC-024", "SC-026", "SC-027", "SC-028", "SC-029",
  ],
  "S6-U3": [
    "S6-022", "S6-023", "S6-024", "S6-025", "S6-026", "S6-027", "S6-062", "S6-063", "S6-064", "S6-065",
    "S6-066", "S6-067", "S6-068", "S6-069", "S6-091", "S6-092", "S6-093", "S6-094", "S6-095", "S6-096",
    "S6-143", "S6-144", "S6-145", "S6-A045", "S6-A046", "S6-A049", "S6-A051", "S6-A054", "S6-A055",
    "S6-A056", "S6-A061", "S6-A062", "S6-A063", "S6-A064",
  ],
  "S6-U4": [
    "N6-030", "N6-031", "N6-032", "N6-033", "N6-034", "N6-035", "N6-036", "N6-037", "N6-038", "N6-039",
    "N6-040", "N6-041", "N6-042", "N6-043", "N6-044", "N6-045", "N6-046", "N6-047", "N6-048",
    "S6-A044", "S6-B1027", "S6-060",
  ],
  "S6-U5": [
    "S5-025", "S5-026", "S5-027", "S5-028", "S5-029", "S5-030", "S5-031", "S5-032", "S5-061", "S5-062",
    "S5-063", "S5-064", "S5-065", "S5-066", "S5-067", "S5-068", "S5-069", "S5-070", "S5-071", "S5-095",
    "S5-096", "S5-097", "S5-098", "S5-145", "S5-146", "S5-A058", "S5-A059", "S5-A060", "S5-A064",
    "S5-A066", "S5-A067", "S5-A068", "S5-A070", "S5-A071", "S5-A072", "S5-A074", "S5-A075", "S5-A076",
    "S5-B1006", "S5-B1017",
  ],
  "S6-U6": [
    "N6-060", "N6-061", "N6-062", "N6-063", "N6-064", "N6-065", "N6-066", "N6-067", "N6-068", "N6-069",
    "S3-A072", "S3-A070", "S6-015", "S6-016", "S6-017", "S6-018", "S6-019", "S6-020", "S6-021", "S6-054",
    "S6-055", "S6-056", "S6-057", "S6-058", "S6-061", "S6-080", "S6-088", "S6-A029", "S6-A030", "S6-A031",
    "S6-A035", "S6-A036", "S6-A040",
  ],
  "S6-U7": [
    "N6-080", "N6-081", "N6-082", "N6-084", "N6-085",
    "S6-A089", "S6-A090", "S6-A091", "S6-A092", "S6-A093", "S6-A095", "S6-A096", "S6-A097", "S6-A100",
    "S6-150", "S5-147", "S5-148", "S5-149", "S5-150", "S5-B1007", "S5-B1010", "S5-B1011", "S5-B1012", "S6-079",
  ],
};

export const FILS_S6 = {
  "S6-U1": { adjectifs: ["S5-A080", "AN-038"], argumentation: ["S6-112", "S6-111"] },
  "S6-U2": { adjectifs: ["AN-048", "AN-069", "AN-070", "AN-071", "SC-031"], argumentation: ["S6-124"] },
  "S6-U3": { adjectifs: ["AN-043", "AN-072"], argumentation: ["S6-125", "S6-119"] },
  "S6-U4": { adjectifs: ["S6-B1012", "S6-090"], argumentation: ["S5-120", "S5-121", "S5-119", "S6-117", "S6-116"] },
  "S6-U5": { adjectifs: ["S5-A079", "AN-045", "AN-046"], argumentation: ["S6-126", "S6-127", "S6-128"] },
  "S6-U6": { adjectifs: ["S6-089", "AN-059"], argumentation: ["S6-121", "S6-122"] },
  "S6-U7": { adjectifs: ["AN-035", "AN-036"], argumentation: ["S6-115", "S6-123"] },
};
