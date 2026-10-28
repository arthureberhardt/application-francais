/* Saison S3 — fiches nouvelles (N3-…) et répartition des mots par unité. */

const f = (id, fr, de, cat, unite, exemple, extra = {}) => ({
  id, fr, de, cat, unite, gram: "", construction: "", exemple,
  famille: "", syn: "", ant: "", piege: "", ...extra,
});

export const MOTS_AJOUTS_S3 = [
  /* U1 · Plus tard */
  f("N3-001", "plus tard", "später", "C", "Projets et rêves", "Plus tard, je travaillerai à l'étranger."),
  f("N3-002", "dans dix ans", "in zehn Jahren", "L", "Projets et rêves", "Dans dix ans, j'aurai vingt-six ans.",
    { piege: "dans + durée = in (Zukunft) ; il y a + durée = vor (Vergangenheit)." }),
  f("N3-003", "un jour", "eines Tages", "L", "Projets et rêves", "Un jour, je ferai le tour du monde."),
  f("N3-004", "faire le tour du monde", "eine Weltreise machen", "L", "Projets et rêves", "Après la maturité, je ferai le tour du monde."),
  f("N3-005", "fonder une famille", "eine Familie gründen", "L", "Projets et rêves", "Elle veut fonder une famille avant trente ans."),
  f("N3-006", "d'ici (+ date)", "bis (spätestens)", "C", "Projets et rêves", "D'ici 2030, j'aurai fini mes études."),
  f("N3-007", "le tableau de visualisation", "das Vision Board", "N", "Projets et rêves", "Sur mon tableau de visualisation, il y a une photo de Tokyo."),
  f("N3-008", "se projeter", "sich vorstellen (Zukunft)", "V", "Projets et rêves", "J'ai du mal à me projeter dans dix ans."),
  /* U4 · Prendre soin de soi */
  f("N3-020", "le médecin", "der Arzt, die Ärztin", "N", "Corps et santé", "Je suis allé chez le médecin parce que j'avais de la fièvre.",
    { piege: "On dit « le médecin » aussi pour une femme ; « la médecin » est de plus en plus courant." }),
  f("N3-021", "le médicament", "das Medikament", "N", "Corps et santé", "Prends ce médicament deux fois par jour."),
  f("N3-022", "l'ordonnance (f.)", "das Rezept (Arzt)", "N", "Corps et santé", "Le pharmacien demande l'ordonnance.", { piege: "≠ la recette (de cuisine)." }),
  f("N3-023", "le rhume", "der Schnupfen", "N", "Corps et santé", "J'ai un rhume, je reste à la maison."),
  f("N3-024", "la grippe", "die Grippe", "N", "Corps et santé", "La moitié de la classe a la grippe."),
  f("N3-025", "la fièvre", "das Fieber", "N", "Corps et santé", "Il a 39 de fièvre."),
  f("N3-026", "avoir mal au dos", "Rückenschmerzen haben", "L", "Corps et santé", "Après six heures devant l'écran, j'ai mal au dos."),
  f("N3-027", "le sommeil", "der Schlaf", "N", "Corps et santé", "Le sommeil est essentiel pour apprendre.", { famille: "dormir · avoir sommeil · s'endormir" }),
  f("N3-028", "s'endormir", "einschlafen", "V", "Corps et santé", "Je m'endors souvent après minuit."),
  f("N3-029", "le stress", "der Stress", "N", "Corps et santé", "Avant les examens, le stress augmente."),
  f("N3-030", "faire une pause", "eine Pause machen", "L", "Corps et santé", "Fais une pause toutes les heures !"),
  f("N3-031", "l'alimentation (f.)", "die Ernährung", "N", "Corps et santé", "Une alimentation équilibrée aide à se concentrer."),
  f("N3-032", "se concentrer", "sich konzentrieren", "V", "Corps et santé", "Je n'arrive pas à me concentrer."),
  f("N3-033", "prendre soin de soi", "auf sich achten", "L", "Corps et santé", "Pendant les examens, il faut prendre soin de soi."),
  f("N3-034", "le courrier des lecteurs", "die Leserbriefe, die Ratgeberspalte", "N", "Corps et santé", "J'ai écrit au courrier des lecteurs d'un magazine."),
  /* U5 · À mon avis : indéfinis, opinion */
  f("N3-040", "plusieurs", "mehrere", "C", "Argumentation", "Plusieurs élèves sont d'accord avec moi.", { piege: "invariable : plusieurs filles, plusieurs garçons." }),
  f("N3-041", "certains, certaines", "gewisse, manche", "C", "Argumentation", "Certains pensent que les devoirs sont inutiles."),
  f("N3-042", "chacun, chacune", "jeder, jede (einzeln)", "C", "Argumentation", "Chacun a le droit de donner son avis."),
  f("N3-043", "la plupart (des)", "die meisten", "C", "Argumentation", "La plupart des jeunes ont un portable.", { piege: "La plupart des élèves pensent… (verbe au pluriel)." }),
  f("N3-044", "quelques-uns, quelques-unes", "einige", "C", "Argumentation", "Parmi mes amis, quelques-uns ne sont pas d'accord."),
  f("N3-045", "il me semble que", "mir scheint, dass", "L", "Argumentation", "Il me semble que tu as raison."),
  f("N3-046", "je suis convaincu(e) que", "ich bin überzeugt, dass", "L", "Argumentation", "Je suis convaincue que le sport aide à apprendre."),
  /* U6 · Regards sur l'art */
  f("N3-060", "l'artiste", "der Künstler, die Künstlerin", "N", "Arts", "L'artiste a peint ce mur en trois nuits."),
  f("N3-061", "la peinture", "die Malerei; die Farbe", "N", "Arts", "J'aime la peinture abstraite.", { piege: "« la peinture » = aussi die Farbe (pour peindre un mur)." }),
  f("N3-062", "le peintre, la peintre", "der Maler, die Malerin", "N", "Arts", "Monet est un peintre impressionniste."),
  f("N3-063", "le street art", "die Street-Art", "N", "Arts", "Le street art transforme les quartiers."),
  f("N3-064", "le graffiti", "das Graffiti", "N", "Arts", "Les murs du skatepark sont couverts de graffitis."),
  f("N3-065", "au premier coup d'œil", "auf den ersten Blick", "L", "Arts", "Au premier coup d'œil, on ne voit qu'une tache rouge."),
  f("N3-066", "les couleurs vives (f.)", "die kräftigen Farben", "N", "Arts", "Le tableau est plein de couleurs vives.", { ant: "les couleurs pâles" }),
  /* U7 · J'ai vu, j'ai aimé */
  f("N3-080", "l'épisode (m.)", "die Episode, die Folge", "N", "Cinéma et séries", "J'ai regardé trois épisodes d'affilée."),
  f("N3-081", "la saison (d'une série)", "die Staffel", "N", "Cinéma et séries", "La deuxième saison est meilleure que la première."),
  f("N3-082", "le spectateur, la spectatrice", "der Zuschauer, die Zuschauerin", "N", "Cinéma et séries", "Les spectateurs ont applaudi à la fin."),
  f("N3-083", "la plateforme de streaming", "die Streaming-Plattform", "N", "Cinéma et séries", "Le film est sorti directement sur une plateforme de streaming."),
  f("N3-084", "en version originale (VO)", "in Originalversion", "L", "Cinéma et séries", "Je regarde les séries en version originale sous-titrée."),
  f("N3-085", "le cinéma", "das Kino", "N", "Cinéma et séries", "On va au cinéma ce soir ?"),
  f("N3-086", "le coup de cœur", "der Favorit, die Herzensempfehlung", "N", "Cinéma et séries", "Mon coup de cœur de l'année, c'est cette série belge."),
  f("N3-087", "divertissant, divertissante", "unterhaltsam", "A", "Cinéma et séries", "C'est un film divertissant, mais un peu léger."),
  f("N3-088", "sortir (au cinéma)", "ins Kino kommen (Film)", "L", "Cinéma et séries", "Le film sort mercredi."),
  f("N3-089", "le navet", "der Flop, der schlechte Film (fam.)", "N", "Cinéma et séries", "Quel navet ! J'ai dormi pendant tout le film."),
  /* ligne de lecture */
  f("N3-100", "le thème", "das Thema", "N", "Lire", "Le thème principal du roman est l'écologie."),
  f("N3-101", "le sujet de société", "das gesellschaftliche Thema", "N", "Lire", "Ce roman aborde un sujet de société : la pauvreté."),
  f("N3-102", "aborder (un sujet)", "(ein Thema) ansprechen", "V", "Lire", "L'auteur aborde la question du climat."),
  f("N3-103", "le message (d'une œuvre)", "die Botschaft", "N", "Lire", "Quel est le message du roman ?"),
  f("N3-104", "dénoncer", "anprangern", "V", "Lire", "L'autrice dénonce l'indifférence des adultes."),
  f("N3-105", "le passage", "die Textstelle", "N", "Lire", "Relisez le passage de la page 52."),
];

export const MOTS_S3 = {
  "S3-U1": [
    "N3-001", "N3-002", "N3-003", "N3-004", "N3-005", "N3-006", "N3-007", "N3-008",
    "PR-001", "PR-002", "PR-003", "PR-004", "PR-005", "PR-006", "PR-007", "PR-008", "PR-009", "PR-010",
    "PR-011", "PR-012", "PR-013", "PR-014", "PR-016", "PR-017", "PR-018", "PR-020",
    "S3-069", "S3-070", "S3-071", "S3-023", "S3-024", "S3-025", "S3-026", "S3-027", "S3-146", "S3-114", "S3-115",
  ],
  "S3-U2": [
    "S3-001", "S3-002", "S3-003", "S3-004", "S3-005", "S3-006", "S3-008", "S3-009", "S3-021", "S3-022",
    "S3-049", "S3-050", "S3-051", "S3-052", "S3-053", "S3-055", "S3-072", "S3-073", "S3-074",
    "S3-092", "S3-093", "S3-094", "S3-096", "S3-097", "S3-098", "S3-139", "S3-140", "S3-144", "S3-145",
    "S3-A001", "S3-A003", "S3-A004", "S3-A005", "S3-A008", "S3-A017", "S3-A018", "S3-A019", "S3-A021", "S3-A022", "S3-A023",
    "S3-A026", "S3-B1001", "S3-B1002",
  ],
  "S3-U3": [
    "S3-010", "S3-011", "S3-012", "S3-013", "S3-014", "S3-015", "S3-016", "S3-017", "S3-018", "S3-019", "S3-020",
    "S3-056", "S3-057", "S3-058", "S3-059", "S3-060", "S3-061", "S3-062", "S3-063", "S3-064", "S3-066", "S3-067", "S3-068",
    "S3-091", "S3-099", "S3-100", "S3-101", "S3-102", "S3-107", "S3-108", "S3-113", "S3-116", "S3-118", "S3-141",
    "S3-A013", "S3-A014", "S3-A015", "S3-A016", "S3-A032", "S3-A033", "S3-A035", "S3-A036", "S3-B1003", "S3-B1016", "S3-B1017", "S3-B1030",
    "S3-A088",
  ],
  "S3-U4": [
    "S1-049", "S1-050", "S1-051", "S1-094", "S1-095", "S1-096", "S1-097", "S1-116", "S1-117", "S1-144", "S1-147", "S1-150",
    "S1-A083", "S1-A084", "S1-A086", "S1-A090", "S1-A092", "S1-A093", "S1-A098", "S1-A100", "S1-B110",
    "N3-020", "N3-021", "N3-022", "N3-023", "N3-024", "N3-025", "N3-026", "N3-027", "N3-028", "N3-029", "N3-030",
    "N3-031", "N3-032", "N3-033", "N3-034", "S5-A065", "S4-056",
  ],
  "S3-U5": [
    "S3-124", "S3-126", "S3-128", "S3-129", "S3-131", "S3-132", "S3-134", "S3-135", "S3-136",
    "N3-040", "N3-041", "N3-042", "N3-043", "N3-044", "S4-A076",
    "S2-045", "S2-046", "S3-036", "S3-041", "S3-044", "S3-045", "S3-046", "S3-047", "S3-048",
    "S3-087", "S3-088", "S3-089", "S3-109", "S3-110", "S3-150", "S3-A073", "S5-073", "S5-072", "S5-075",
    "S3-084", "S3-111", "S3-112",
  ],
  "S3-U6": [
    "N3-060", "N3-061", "N3-062", "N3-063", "N3-064", "N3-065", "N3-066",
    "S4-018", "S4-019", "S4-020", "S4-021", "S4-023", "S4-070", "S4-098", "S4-099", "S4-100", "S4-102", "S4-103",
    "S4-A025", "S4-A026", "S4-A027", "S4-A028", "S4-A029", "S4-A031", "S4-A032", "S4-A033", "S4-A035", "S4-A036",
    "S4-A041", "S4-B1008", "S4-B1017", "S7-027", "S7-028", "S7-071", "S7-072", "S7-097", "S7-098",
  ],
  "S3-U7": [
    "N3-080", "N3-081", "N3-082", "N3-083", "N3-084", "N3-085", "N3-086", "N3-087", "N3-088", "N3-089",
    "S4-016", "S4-017", "S4-061", "S4-062", "S4-063", "S4-064", "S4-065", "S4-144", "S4-073",
    "S4-A039", "S4-A042", "S4-A043", "S4-A044", "S4-A045", "S4-A046", "S7-068", "S7-A081", "S7-A082", "S7-A083", "S7-A074",
  ],
};

export const FILS_S3 = {
  "S3-U1": { adjectifs: ["AN-040", "AN-033"], argumentation: ["N3-045"] },
  "S3-U2": { adjectifs: ["S3-B1015", "S3-B1014"], argumentation: ["S5-122"] },
  "S3-U3": { adjectifs: ["AN-001", "AN-004"], argumentation: ["S4-137", "S4-138"] },
  "S3-U4": { adjectifs: ["S4-111", "S4-112"], argumentation: ["S5-125"] },
  "S3-U5": { adjectifs: ["AN-016", "AN-017"], argumentation: ["S5-126", "N3-046", "S8-104"] },
  "S3-U6": { adjectifs: ["AN-018", "AN-019", "AN-005", "AN-037"], argumentation: ["S3-130"] },
  "S3-U7": { adjectifs: ["AN-003", "AN-032", "AN-014"], argumentation: ["S3-A097"] },
};
