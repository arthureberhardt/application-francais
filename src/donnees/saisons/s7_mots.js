/* Saison S7 — fiches nouvelles (N7-…) et répartition des mots par unité. */

const f = (id, fr, de, cat, unite, exemple, extra = {}) => ({
  id, fr, de, cat, unite, gram: "", construction: "", exemple,
  famille: "", syn: "", ant: "", piege: "", ...extra,
});

export const MOTS_AJOUTS_S7 = [
  /* U2 · Lumières */
  f("N7-001", "le philosophe", "der Philosoph", "N", "Lumières", "Voltaire est le philosophe le plus célèbre des Lumières."),
  f("N7-002", "la raison", "die Vernunft", "N", "Lumières", "Les Lumières placent la raison au-dessus des préjugés.", { piege: "« avoir raison » = recht haben." }),
  f("N7-003", "l'Encyclopédie (f.)", "die Encyclopédie", "N", "Lumières", "Diderot et d'Alembert dirigent l'Encyclopédie."),
  f("N7-004", "l'obscurantisme (m.)", "der Obskurantismus", "N", "Lumières", "Les philosophes combattent l'obscurantisme."),
  f("N7-005", "le despotisme", "der Despotismus", "N", "Lumières", "Montesquieu critique le despotisme."),
  f("N7-007", "le progrès des connaissances", "der Fortschritt des Wissens", "L", "Lumières", "Les Lumières croient au progrès des connaissances."),
  f("N7-008", "l'esprit critique", "der kritische Geist", "N", "Lumières", "Les Lumières veulent développer l'esprit critique."),
  /* U6 · S'engager */
  f("N7-020", "l'ONG (f.)", "die NGO", "N", "Engagement", "Elle travaille pour une ONG de défense des droits humains."),
  f("N7-021", "le bénévolat", "die Freiwilligenarbeit", "N", "Engagement", "Le bénévolat donne du sens à mon temps libre."),
  f("N7-022", "le, la bénévole", "der, die Freiwillige", "N", "Engagement", "Les bénévoles distribuent des repas."),
  f("N7-023", "la pétition", "die Petition", "N", "Engagement", "La pétition a recueilli 50 000 signatures."),
  f("N7-024", "humanitaire", "humanitär", "A", "Engagement", "Elle part en mission humanitaire."),
  f("N7-025", "les droits humains (m.)", "die Menschenrechte", "N", "Engagement", "Amnesty International défend les droits humains."),
  f("N7-026", "la cause", "die Sache, das Anliegen", "N", "Engagement", "Il s'engage pour la cause animale."),
  f("N7-027", "le, la militant(e)", "der Aktivist, die Aktivistin", "N", "Engagement", "Les militants ont bloqué le pont."),
  f("N7-028", "la manifestation", "die Demonstration", "N", "Engagement", "La manifestation pour le climat a réuni 10 000 personnes."),
  f("N7-029", "la mobilisation", "die Mobilisierung", "N", "Engagement", "La mobilisation des jeunes a surpris les politiques."),
  f("N7-030", "faire bouger les choses", "etwas bewegen", "L", "Engagement", "On peut faire bouger les choses à notre échelle."),
  f("N7-031", "l'appel (m.)", "der Aufruf", "N", "Engagement", "Les étudiants ont lancé un appel à la grève."),
  f("N7-032", "rester les bras croisés", "untätig bleiben", "L", "Engagement", "Nous ne pouvons pas rester les bras croisés."),
  f("N7-033", "l'indignation (f.)", "die Empörung", "N", "Engagement", "L'indignation ne suffit pas : il faut agir."),
  /* U7 · Construire un essai */
  f("N7-040", "le plan dialectique", "der dialektische Aufbau", "N", "Essai", "Le plan dialectique : thèse, antithèse, synthèse."),
  f("N7-041", "le dépassement", "die Überwindung (Synthese)", "N", "Essai", "La synthèse propose un dépassement de l'opposition."),
  /* ligne de lecture */
  f("N7-060", "l'apologue (m.)", "das Lehrstück, die Lehrerzählung", "N", "Lire", "La fable et le conte philosophique sont des apologues."),
  f("N7-061", "la morale", "die Moral (einer Geschichte)", "N", "Lire", "La morale de la fable est à la fin."),
  f("N7-062", "le marivaudage", "das Marivaudage (verspieltes Liebesgeplänkel)", "N", "Lire", "Le marivaudage est un jeu de mots et de sentiments."),
  f("N7-063", "l'antiphrase (f.)", "die Antiphrase", "N", "Lire", "« Bravo ! » après une erreur, c'est une antiphrase."),
  f("N7-064", "la fausse naïveté", "die gespielte Naivität", "N", "Lire", "Voltaire utilise la fausse naïveté de Candide pour critiquer."),
  f("N7-065", "le commentaire composé", "der thematische Kommentar", "N", "Lire", "Le commentaire composé s'organise en axes."),
  f("N7-066", "l'axe (m.) de lecture", "die Leseachse", "N", "Lire", "Le premier axe porte sur la satire."),
];

export const MOTS_S7 = {
  "S7-U1": [
    "S6-028", "S6-029", "S6-030", "S6-031", "S6-032", "S6-033", "S6-034", "S6-036", "S6-037", "S6-039", "S6-040",
    "S6-097", "S6-098", "S6-099", "S6-100", "S6-101", "S6-102", "S6-103", "S6-104", "S6-105", "S6-108",
    "S6-146", "S6-147", "S6-148", "S6-149", "S6-B1015", "S6-B1016", "S6-B1017", "S6-B1028", "S6-B1029",
    "S6-A070", "S6-A071", "S6-A074", "S6-A075", "S6-A077", "S6-A079", "S6-A083", "S6-A085", "S6-A086",
  ],
  "S7-U2": [
    "S7-A030", "S7-A031", "S7-A032", "S7-A033", "HL-003", "HL-025", "RE-021",
    "SP2-001", "SP2-002", "SP2-003", "SP2-004", "SP2-005", "SP2-006", "SP2-007", "SP2-008", "SP2-009", "SP2-010",
    "SP2-011", "SP2-013", "SP2-014", "SP2-016", "SP2-017", "SP2-018", "SP2-020", "SP2-021", "SP2-023", "SP2-024", "SP2-025",
    "N7-001", "N7-002", "N7-003", "N7-004", "N7-005", "S8-A021", "N7-007", "N7-008",
  ],
  "S7-U3": [
    "S7-008", "S7-009", "S7-010", "S7-011", "S7-012", "S7-013", "S7-014", "S7-016", "S7-019", "S7-020", "S7-032",
    "S7-042", "S7-043", "S7-044", "S7-045", "S7-047", "S7-048", "S7-049", "S7-050", "S7-051", "S7-052", "S7-053",
    "S7-054", "S7-056", "S7-057", "S7-059", "S7-084", "S7-085", "S7-086", "S7-087", "S7-089",
    "S7-104", "S7-107", "S7-109", "S7-110", "S7-111", "S7-112", "S7-113",
    "S7-140", "S7-142", "S7-143", "S7-150", "S7-A034", "S7-A035", "S7-A036", "S7-A037", "S7-A038",
    "S7-A041", "S7-A051", "S7-A053", "S7-B1005", "S7-B1007", "S7-B1027", "S7-B1028",
  ],
  "S7-U4": [
    "S5-002", "S5-003", "S5-004", "S5-005", "S5-006", "S5-007", "S5-008", "S5-009", "S5-010", "S5-011", "S5-012",
    "S5-041", "S5-042", "S5-043", "S5-044", "S5-045", "S5-046", "S5-047", "S5-048", "S5-049", "S5-050", "S5-052",
    "S5-081", "S5-082", "S5-083", "S5-084", "S5-085", "S5-107", "S5-139", "S5-141", "S5-143", "S5-144",
    "S5-A001", "S5-A006", "S5-A007", "S5-A008", "S5-A009", "S5-A010", "S5-A011", "S5-A012", "S5-A013", "S5-A014",
    "S5-A016", "S5-A023", "S5-A024", "S5-A025", "S5-A026", "S5-A027", "S5-A034", "S5-B1008", "S5-B1014",
  ],
  "S7-U5": [
    "S8-014", "S8-015", "S8-016", "S8-017", "S8-052", "S8-053", "S8-054", "S8-055", "S8-056", "S8-057",
    "S8-084", "S8-085", "S8-086", "S8-A031", "S8-A033", "S8-A036", "S8-A040", "S8-A041", "S8-A042", "S8-A043",
    "S8-A045", "S8-A046", "S8-A047", "S8-A050", "S8-A054", "S8-B1006", "S8-B1007",
  ],
  "S7-U6": [
    "N7-020", "N7-021", "N7-022", "N7-023", "N7-024", "N7-025", "N7-026", "N7-027", "N7-028", "N7-029",
    "N7-030", "N7-031", "N7-032", "N7-033", "S5-013", "S5-014", "S5-015", "S5-016", "S5-142", "S1-A038",
  ],
  "S7-U7": [
    "S7-115", "S7-116", "S7-123", "S7-124", "S7-125", "S7-126", "S7-127", "S7-128", "S7-129", "S7-130", "S7-131",
    "S7-132", "S7-133", "S7-134", "S7-135", "S7-137", "S7-138", "S7-A085", "S7-A086", "S7-A087", "S7-A090",
    "S7-A091", "S7-A092", "S7-A093", "S7-A094", "S7-A096", "S7-B1011", "S7-B1019", "S7-B1020", "S7-B1021",
    "S7-B1022", "S7-B1023", "S7-B1024", "S8-025", "S8-026", "S8-027", "S8-028", "S8-030", "S8-031", "S8-032",
    "S8-033", "S8-034", "N7-040", "N7-041",
  ],
};

export const FILS_S7 = {
  "S7-U1": { adjectifs: ["AN-008", "AN-030", "AN-031"], argumentation: ["S6-109", "S6-110"] },
  "S7-U2": { adjectifs: ["CI-033", "CI-034", "CI-037"], argumentation: ["S5-123", "S5-124"] },
  "S7-U3": { adjectifs: ["S7-090", "S7-092", "S7-100", "S7-101"], argumentation: ["S5-127", "S5-128", "S6-120"] },
  "S7-U4": { adjectifs: ["S5-A033", "AN-062", "AN-063"], argumentation: ["S5-129", "S5-130", "S6-132"] },
  "S7-U5": { adjectifs: ["S7-A097", "S7-A098", "S7-A099", "S7-A100"], argumentation: ["S5-118", "S5-131", "S6-B1020", "S6-B1022"] },
  "S7-U6": { adjectifs: ["CI-035", "CI-036", "CI-038", "S7-102"], argumentation: ["S6-133", "S6-130", "S6-131"] },
  "S7-U7": { adjectifs: ["AN-009", "AN-010", "S7-099"], argumentation: ["S6-129", "S6-137", "S6-138", "S5-137", "S5-138"] },
};
