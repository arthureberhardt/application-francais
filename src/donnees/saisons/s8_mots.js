/* Saison S8 — fiches nouvelles (N8-…) et répartition des mots par unité. */

const f = (id, fr, de, cat, unite, exemple, extra = {}) => ({
  id, fr, de, cat, unite, gram: "", construction: "", exemple,
  famille: "", syn: "", ant: "", piege: "", ...extra,
});

export const MOTS_AJOUTS_S8 = [
  /* U3 · économie et chiffres */
  f("N8-001", "la courbe", "die Kurve", "N", "Chiffres", "La courbe du chômage baisse depuis trois ans."),
  f("N8-002", "la moitié", "die Hälfte", "N", "Chiffres", "La moitié des jeunes travaillent pendant leurs études.", { piege: "Accord : la moitié des élèves sont / est (les deux sont admis)." }),
  f("N8-003", "le tiers", "das Drittel", "N", "Chiffres", "Un tiers des déchets est recyclé."),
  f("N8-004", "le produit intérieur brut (PIB)", "das Bruttoinlandprodukt (BIP)", "N", "Chiffres", "Le PIB suisse a augmenté de 1,5 %."),
  /* U4 · varier son style */
  f("N8-020", "la répétition", "die Wiederholung", "N", "Style", "Évitez les répétitions : utilisez un pronom ou un synonyme."),
  f("N8-021", "le synonyme", "das Synonym", "N", "Style", "« Souligner » est un synonyme de « mettre en évidence »."),
  f("N8-022", "la périphrase", "die Umschreibung", "N", "Style", "« La Ville Lumière » est une périphrase pour Paris."),
  /* U6 · rédaction de Maturité */
  f("N8-040", "le brouillon", "der Entwurf", "N", "Maturité", "Faites un plan détaillé au brouillon."),
  f("N8-041", "la consigne", "die Aufgabenstellung", "N", "Maturité", "Lisez attentivement la consigne avant d'écrire."),
  f("N8-042", "la relecture", "das Korrekturlesen", "N", "Maturité", "Gardez dix minutes pour la relecture."),
  f("N8-043", "le faux ami", "der falsche Freund", "N", "Maturité", "« Actuel » est un faux ami : il signifie « aktuell », pas « tatsächlich »."),
  /* U7 · oral de Maturité */
  f("N8-050", "l'examinateur, l'examinatrice", "der Prüfer, die Prüferin", "N", "Maturité", "L'examinatrice vous pose des questions sur l'extrait."),
  f("N8-051", "le temps de préparation", "die Vorbereitungszeit", "L", "Maturité", "Vous avez vingt minutes de temps de préparation."),
  f("N8-052", "avoir un trou de mémoire", "ein Blackout haben", "L", "Maturité", "Si vous avez un trou de mémoire, regardez votre plan."),
  f("N8-053", "rebondir sur une question", "an eine Frage anknüpfen", "L", "Maturité", "Un bon candidat sait rebondir sur une question."),
  /* ligne de lecture */
  f("N8-060", "l'hypocrisie (f.)", "die Heuchelei", "N", "Lire", "Molière dénonce l'hypocrisie des faux dévots."),
  f("N8-061", "hypocrite", "heuchlerisch", "A", "Lire", "Tartuffe est un personnage hypocrite."),
  f("N8-062", "le faux dévot", "der Scheinheilige", "N", "Lire", "Tartuffe est un faux dévot qui trompe Orgon."),
  f("N8-063", "le valet, la servante", "der Diener, die Dienerin", "N", "Lire", "Chez Molière, la servante est souvent plus lucide que son maître."),
  f("N8-064", "l'avare (m./f.)", "der Geizhals", "N", "Lire", "Harpagon, l'avare, aime son argent plus que ses enfants."),
  f("N8-065", "la mise en relation", "das In-Beziehung-Setzen", "N", "Lire", "À l'oral, la mise en relation de deux œuvres est valorisée."),
  f("N8-066", "le fil rouge", "der rote Faden", "N", "Lire", "La liberté est le fil rouge de nos lectures de l'année."),
  f("N8-067", "la question d'interprétation", "die Interpretationsfrage", "N", "Lire", "Une question d'interprétation demande votre lecture personnelle, justifiée."),
];

export const MOTS_S8 = {
  "S8-U1": [
    "S8-001", "S8-002", "S8-003", "S8-004", "S8-005", "S8-006", "S8-007", "S8-008", "S8-009", "S8-010", "S8-011", "S8-012", "S8-013",
    "S8-035", "S8-036", "S8-037", "S8-038", "S8-039", "S8-040", "S8-041", "S8-042", "S8-043", "S8-044", "S8-045", "S8-046",
    "S8-047", "S8-048", "S8-049", "S8-050", "S8-051", "S8-073", "S8-074", "S8-075", "S8-076", "S8-077", "S8-078",
    "S8-A001", "S8-A002", "S8-A003", "S8-A004", "S8-A005", "S8-A006", "S8-A007", "S8-A009", "S8-A010", "S8-A011",
    "S8-A012", "S8-A013", "S8-A014", "S8-A015", "S8-A016", "S8-A017", "S8-A018", "S8-A020", "S8-A022", "S8-A023",
    "S8-A024", "S8-A025", "S8-A029", "S8-A030", "S8-B1009", "S8-B1011", "S8-B1012",
  ],
  "S8-U2": [
    "S8-020", "S8-021", "S8-022", "S8-023", "S8-061", "S8-062", "S8-065", "S8-079", "S8-080", "S8-081", "S8-082", "S8-083",
    "S8-088", "S8-089", "S8-090", "S8-091", "S8-092", "S8-139", "S8-140", "S8-141",
    "S8-A055", "S8-A056", "S8-A059", "S8-A062", "S8-A064", "S8-A067", "S8-A068", "S8-A069", "S8-A070", "S8-A071",
    "S8-A072", "S8-A073", "S8-A074", "S8-A075", "S8-A078", "S8-A079", "S8-A080", "S8-B1008", "S8-B1032",
    "RE-001", "RE-002", "RE-003", "RE-004", "RE-005", "RE-006", "RE-007", "RE-008", "RE-009", "RE-010", "RE-011",
    "RE-014", "RE-015", "RE-016", "RE-017", "RE-018", "RE-024", "RE-028", "RE-029",
  ],
  "S8-U3": [
    "S6-A028", "S6-A032", "S6-A033", "S6-A034", "S6-A038", "S6-A041", "S6-B1004",
    "S3-090", "S3-103", "S3-A056", "S3-A059", "S3-A060", "S3-A061", "S3-A063", "S3-A064", "S3-A065", "S3-A067",
    "S3-B1009", "S3-B1010", "S3-B1011", "S3-B1021",
    "S8-A085", "S8-A086", "S8-A087", "S8-A088", "S8-126", "S8-127", "S8-097",
    "JOU-021", "JOU-022", "JOU-026", "N8-001", "N8-002", "N8-003", "N8-004",
  ],
  "S8-U4": [
    "S7-004", "S7-038", "S7-117", "S7-120", "S7-121", "S7-122", "S7-A011", "S7-A023", "S7-A024", "S7-A025", "S7-A026",
    "S7-B1003", "S7-B1004", "S7-B1013", "S7-B1026",
    "S8-120", "S8-121", "S8-122", "S8-123", "S8-124", "S8-128", "S8-129", "S8-130", "S8-131", "S8-132", "S8-133",
    "S8-B1017", "S8-B1018", "S8-B1019", "S8-B1020", "S8-B1021", "S8-B1022", "S8-B1024",
    "N8-020", "N8-021", "N8-022",
  ],
  "S8-U5": [
    "HL-001", "HL-002", "HL-005", "HL-007", "HL-008", "HL-009", "HL-024",
    "S8-066", "S8-067", "S8-069", "S8-070", "S8-071", "S8-072", "S8-A090", "S8-A091",
    "S7-025", "S7-026", "S7-030", "S7-031", "S7-033", "S7-034", "S7-069", "S7-070", "S7-095", "S7-096",
    "S7-A072", "S7-A073", "S7-A075", "S7-A076", "S7-A077", "S7-A078", "S7-A079", "S7-A080", "S7-B1029",
  ],
  "S8-U6": [
    "S3-A090", "S3-A094", "S3-A095", "S3-A096", "S3-A100", "S3-B1024", "S3-B1025", "S3-B1029",
    "S5-040", "S5-109", "S5-110", "S5-111", "S5-112", "S5-113", "S5-114", "S5-115", "S5-A084", "S6-A098",
    "S4-125", "S4-126", "S4-127",
    "S8-024", "S8-029", "S8-068", "S8-093", "S8-094", "S8-095", "S8-096", "S8-098", "S8-099",
    "S8-114", "S8-115", "S8-116", "S8-117", "S8-118", "S8-119",
    "S8-A081", "S8-A082", "S8-A083", "S8-A084", "S8-A089",
    "N8-040", "N8-041", "N8-042", "N8-043",
  ],
  "S8-U7": [
    "S4-121", "S4-122", "S4-B1022", "S5-105", "S5-106", "S5-108", "S5-132", "S5-133", "S5-140", "S5-A096", "S5-A097", "S6-114",
    "S8-145", "S8-146", "S8-147", "S8-B1029", "S8-A026", "S8-A027", "S8-A028",
    "S8-100", "S8-101", "S8-102", "S8-103", "S8-109", "S8-110", "S8-111", "S8-112", "S8-113", "S8-125",
    "S8-134", "S8-135", "S8-137", "S8-138", "S8-148", "S8-149", "S8-150",
    "S8-A092", "S8-A093", "S8-A094", "S8-A095", "S8-A096", "S8-A097", "S8-A098", "S8-A099", "S8-A100",
    "S8-B1027", "S8-B1028", "N8-050", "N8-051", "N8-052", "N8-053",
  ],
};

export const FILS_S8 = {
  "S8-U1": { adjectifs: ["AN-065", "AN-066", "AN-067"], argumentation: ["S3-B1026", "S3-B1027"] },
  "S8-U2": { adjectifs: ["AN-020", "AN-021", "AN-061"], argumentation: ["S3-B1028", "S5-B1015"] },
  "S8-U3": { adjectifs: ["AN-058", "AN-064", "AN-051"], argumentation: ["S6-B1021", "S6-134"] },
  "S8-U4": { adjectifs: ["AN-011", "AN-012", "AN-013"], argumentation: ["S4-124", "S6-A094"] },
  "S8-U5": { adjectifs: ["AN-034", "AN-029", "AN-068"], argumentation: ["S5-A094", "S5-A095"] },
  "S8-U6": { adjectifs: ["AN-053", "AN-055", "AN-054"], argumentation: ["S3-A089", "S3-A093"] },
  "S8-U7": { adjectifs: ["AN-056", "AN-057", "AN-039", "AN-049"], argumentation: ["S6-135", "S6-136"] },
};
