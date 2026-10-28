/* Saison S5 — fiches nouvelles (N5-…) et répartition des mots par unité. */

const f = (id, fr, de, cat, unite, exemple, extra = {}) => ({
  id, fr, de, cat, unite, gram: "", construction: "", exemple,
  famille: "", syn: "", ant: "", piege: "", ...extra,
});

export const MOTS_AJOUTS_S5 = [
  /* U1 · Il a dit que… */
  f("N5-001", "déclarer", "erklären", "V", "Discours rapporté", "Le ministre a déclaré qu'il démissionnait."),
  f("N5-002", "annoncer", "ankündigen", "V", "Discours rapporté", "La direction a annoncé que les cours seraient annulés."),
  f("N5-003", "ajouter", "hinzufügen", "V", "Discours rapporté", "Elle a ajouté qu'elle ne regrettait rien."),
  f("N5-004", "promettre", "versprechen", "V", "Discours rapporté", "Il a promis qu'il reviendrait."),
  f("N5-005", "rapporter", "wiedergeben, berichten", "V", "Discours rapporté", "Le journaliste rapporte les paroles du témoin."),
  f("N5-006", "révéler", "enthüllen", "V", "Discours rapporté", "L'enquête a révélé que le maire mentait."),
  f("N5-007", "prétendre", "behaupten", "V", "Discours rapporté", "Il prétend qu'il n'était pas là.", { piege: "« prétendre » = behaupten (souvent un doute), pas « vorgeben »." }),
  f("N5-008", "démentir", "dementieren", "V", "Discours rapporté", "Le club a démenti l'information."),
  f("N5-009", "les propos (m.)", "die Äusserungen", "N", "Discours rapporté", "Ses propos ont choqué le public."),
  f("N5-010", "la citation", "das Zitat", "N", "Discours rapporté", "Cette citation est de Simone Veil."),
  f("N5-011", "la déclaration", "die Erklärung, die Aussage", "N", "Discours rapporté", "Dans sa déclaration, elle remercie ses électeurs."),
  f("N5-012", "la conférence de presse", "die Pressekonferenz", "N", "Discours rapporté", "L'entraîneur a parlé lors d'une conférence de presse."),
  f("N5-013", "le, la porte-parole", "der Sprecher, die Sprecherin", "N", "Discours rapporté", "Le porte-parole de la police a confirmé l'arrestation."),
  f("N5-014", "l'interviewé, l'interviewée", "die befragte Person", "N", "Discours rapporté", "L'interviewée explique qu'elle a quitté son pays à dix ans."),
  f("N5-015", "le discours rapporté", "die indirekte Rede", "N", "Discours rapporté", "Dans un article, le discours rapporté est partout."),
  f("N5-016", "se demander", "sich fragen", "V", "Discours rapporté", "Je me demande s'il dit la vérité."),
  /* U2 · L'info en question */
  f("N5-020", "la revue de presse", "die Presseschau", "N", "Médias", "Chaque lundi, deux élèves présentent une revue de presse."),
  f("N5-021", "la rédaction", "die Redaktion", "N", "Médias", "La rédaction du journal compte vingt journalistes."),
  f("N5-022", "le conditionnel journalistique", "der journalistische Konditional", "N", "Médias", "« Le suspect aurait fui » : c'est le conditionnel journalistique.",
    { piege: "Il signale une information non confirmée." }),
  f("N5-023", "l'information non confirmée", "die unbestätigte Information", "N", "Médias", "Attention, c'est une information non confirmée."),
  f("N5-024", "la fausse nouvelle", "die Falschmeldung, Fake News", "N", "Médias", "Cette fausse nouvelle a été partagée des milliers de fois."),
  /* U3 · À la une */
  f("N5-030", "le gros titre", "die Schlagzeile", "N", "Médias", "Le gros titre du jour parle des inondations."),
  f("N5-031", "à la une", "auf der Titelseite", "L", "Médias", "Ce fait divers est à la une de tous les journaux."),
  f("N5-032", "la voix passive", "das Passiv", "N", "Médias", "Dans les titres, on utilise souvent la voix passive."),
  /* U4 · La ville de demain */
  f("N5-040", "l'écoquartier (m.)", "das Ökoquartier", "N", "Ville", "Un écoquartier va être construit sur l'ancienne friche."),
  f("N5-042", "le toit végétalisé", "das begrünte Dach", "N", "Ville", "Les toits végétalisés rafraîchissent la ville."),
  /* U5 · Au tribunal */
  f("N5-051", "l'accusé, l'accusée", "der, die Angeklagte", "N", "Justice", "L'accusé nie les faits."),
  f("N5-052", "le jury", "die Geschworenen", "N", "Justice", "Le jury s'est retiré pour délibérer."),
  f("N5-053", "acquitter", "freisprechen", "V", "Justice", "L'accusée a été acquittée faute de preuves."),
  /* U6 · Société en débat */
  f("N5-060", "le sans-abri", "der, die Obdachlose", "N", "Société", "Le nombre de sans-abri augmente en hiver.", { piege: "invariable : des sans-abri." }),
  f("N5-061", "la précarité", "die prekäre Lage", "N", "Société", "Beaucoup d'étudiants vivent dans la précarité."),
  f("N5-063", "la solidarité", "die Solidarität", "N", "Société", "La solidarité entre voisins s'est renforcée."),
  /* U7 · Demain, quelle société ? */
  f("N5-070", "la caméra de surveillance", "die Überwachungskamera", "N", "Société de demain", "La ville a installé cent caméras de surveillance."),
  f("N5-071", "la reconnaissance faciale", "die Gesichtserkennung", "N", "Société de demain", "La reconnaissance faciale est interdite dans certains pays."),
  f("N5-072", "la dystopie", "die Dystopie", "N", "Société de demain", "« 1984 » d'Orwell est la dystopie la plus célèbre."),
  f("N5-073", "le contrôle", "die Kontrolle", "N", "Société de demain", "Le contrôle des données doit rester démocratique."),
  f("N5-074", "la liberté individuelle", "die persönliche Freiheit", "N", "Société de demain", "La sécurité ne doit pas menacer la liberté individuelle."),
  f("N5-075", "l'article d'anticipation", "der Zukunftsartikel", "N", "Société de demain", "Écrivez un article d'anticipation daté de 2050."),
  f("N5-076", "risquer de", "Gefahr laufen zu", "L", "Société de demain", "Cette loi risque de limiter nos libertés."),
  /* lecture : XXe siècle */
  f("N5-080", "l'incipit (m.)", "der Romananfang", "N", "Lire", "L'incipit de « L'Étranger » est l'un des plus célèbres de la littérature."),
  f("N5-081", "le commentaire linéaire", "der lineare Kommentar", "N", "Lire", "Le commentaire linéaire suit le texte du début à la fin."),
  f("N5-082", "le mouvement (d'un texte)", "der Abschnitt (eines Textes)", "N", "Lire", "Le texte se divise en trois mouvements."),
  f("N5-083", "l'effet (m.)", "die Wirkung", "N", "Lire", "Quel effet cette phrase produit-elle sur le lecteur ?"),
  f("N5-084", "le huis clos", "das Kammerspiel", "N", "Lire", "Dans un huis clos, les personnages ne peuvent pas sortir."),
  f("N5-085", "le registre tragique", "das tragische Register", "N", "Lire", "La scène relève du registre tragique."),
];

export const MOTS_S5 = {
  "S5-U1": [
    "N5-001", "N5-002", "N5-003", "N5-004", "N5-005", "N5-006", "N5-007", "N5-008", "N5-009", "N5-010",
    "N5-011", "N5-012", "N5-013", "N5-014", "N5-015", "N5-016",
    "S5-033", "S5-034", "S5-035", "S5-036", "S5-038", "S5-039", "S6-035", "QI-027", "S7-018",
  ],
  "S5-U2": [
    "S4-010", "S4-011", "S4-012", "S4-013", "S4-014", "S4-049", "S4-050", "S4-051", "S4-052", "S4-053", "S4-054",
    "S4-060", "S4-139", "S4-140", "S4-141", "S4-A007", "S4-A008", "S4-A009", "S4-A010", "S4-A011", "S4-A021", "S4-A023",
    "S4-B1002", "N5-020", "N5-021", "N5-022", "N5-023", "N5-024",
    "QI-009", "QI-016", "QI-020", "QI-024", "QI-025", "QI-026", "QI-028", "QI-029", "QI-030",
  ],
  "S5-U3": [
    "S4-A002", "S4-A003", "S4-A004", "S4-A005", "S4-A006", "S4-C005", "S4-A012", "S4-A013",
    "JOU-001", "JOU-002", "JOU-003", "JOU-004", "JOU-007", "JOU-008", "JOU-009", "JOU-010", "JOU-011", "JOU-012",
    "JOU-027", "N5-030", "N5-031", "N5-032", "S6-A008", "S4-A022",
  ],
  "S5-U4": [
    "URB-001", "URB-002", "URB-003", "URB-005", "URB-006", "URB-008", "URB-009", "URB-011", "URB-013", "URB-015",
    "URB-016", "URB-018", "URB-019", "URB-020", "URB-022", "URB-024", "URB-025", "URB-027", "URB-030", "URB-031",
    "URB-032", "URB-033", "URB-034", "URB-036", "URB-037",
    "S5-021", "S5-022", "S5-024", "S5-053", "S5-056", "S5-057", "S5-058", "S5-059", "S5-060",
    "S5-086", "S5-087", "S5-088", "S5-090", "S5-A035", "S5-A036", "S5-A037", "S5-A042", "S5-A043", "S5-A044",
    "S5-A046", "S5-A047", "S5-A048", "S5-A049", "S5-A050", "S5-A051", "S5-A053", "S5-B1004",
    "N5-040", "S2-A038", "N5-042",
  ],
  "S5-U5": [
    "S6-001", "S6-002", "S6-003", "S6-004", "S6-005", "S6-006", "S6-007", "S6-008", "S6-010", "S6-012", "S6-013", "S6-014",
    "S6-041", "S6-042", "S6-043", "S6-044", "S6-045", "S6-046", "S6-047", "S6-050", "S6-051", "S6-053",
    "S6-081", "S6-082", "S6-083", "S6-084", "S6-085", "S6-086", "S6-087", "S6-140", "S6-142",
    "S6-A001", "S6-A002", "S6-A009", "S6-A010", "S6-A011", "S6-A012", "S6-A014", "S6-A016", "S6-A018", "S6-A019", "S6-A021",
    "S6-A024", "S6-B1026", "S7-A050", "N5-051", "N5-052", "N5-053", "S3-A082",
  ],
  "S5-U6": [
    "S4-028", "S4-043", "S4-081", "S4-082", "S4-A067", "S4-A069", "S4-A071", "S4-A072", "S4-A073", "S4-A074",
    "S4-B1011", "S4-B1018", "JOU-005", "JOU-006", "JOU-013", "JOU-014", "JOU-015", "JOU-017", "JOU-019",
    "JOU-020", "JOU-023", "JOU-024", "JOU-025", "JOU-028", "JOU-029",
    "N5-060", "N5-061", "S6-059", "N5-063", "S6-A080",
  ],
  "S5-U7": [
    "N5-070", "N5-071", "N5-072", "N5-073", "N5-074", "N5-075", "N5-076",
    "S8-060", "S8-A076", "S8-A077", "S8-A049", "S8-018", "S8-087", "S8-064", "S8-143", "S8-144", "S8-A060",
  ],
};

export const FILS_S5 = {
  "S5-U1": { adjectifs: ["S6-106", "S6-107"], argumentation: ["S8-105", "S8-106"] },
  "S5-U2": { adjectifs: ["S4-B1015", "S4-B1014", "AN-015"], argumentation: ["S5-077", "S5-A091"] },
  "S5-U3": { adjectifs: ["S4-093", "S4-094", "S4-B1013"], argumentation: ["S5-A090", "S5-A092"] },
  "S5-U4": { adjectifs: ["S5-A055", "S5-A056"], argumentation: ["S5-076"] },
  "S5-U5": { adjectifs: ["AN-041", "AN-047", "S6-B1009"], argumentation: ["S8-107", "S8-108"] },
  "S5-U6": { adjectifs: ["S5-A098", "S5-A099", "S5-A100", "AN-050"], argumentation: ["S5-A087", "S5-A088", "S5-A089", "S5-136"] },
  "S5-U7": { adjectifs: ["S5-099", "S5-100", "S5-101", "S5-102", "S5-103"], argumentation: ["S5-A083", "S5-A085"] },
};
