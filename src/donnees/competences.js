/* Les compétences centrales de chaque semestre : ce qui compte le plus.

   Chaque compétence renvoie aux unités et stations qui l'entraînent, aux
   points de grammaire, aux temps et aux évaluations qui la vérifient.
   L'élève les voit en haut de son semestre, avec sa progression et un
   entraînement ciblé. Au S8 (gymnase), la « répétition » reprend toutes
   les compétences des semestres précédents.                             */

const k = (id, titre, sous, { unites = [], points = [], temps = [], evaluations = [] } = {}) =>
  ({ id, titre, sous, unites, points, temps, evaluations });

const GYMNASE = {
  1: [
    k("C1-INTERVIEW", "L'interview", "Poser des questions et répondre, à la forme négative aussi.", {
      unites: ["S1-U1", "S1-U2"], points: ["G1-QUESTIONS", "G2-NEGATION", "G1-TONIQUES"], temps: ["present"],
      evaluations: ["S1-EV-PORTRAIT"] }),
    k("C1-RESUME", "Le résumé", "Résumer une histoire au présent, dans l'ordre, avec ses mots.", {
      unites: ["S1-L1", "S1-L3", "S1-L5"], points: ["G2-PRESENT", "G7-VERBES", "G7-RESUME", "L1-CADRE"], temps: ["present"],
      evaluations: ["S1-EV-RESUME"] }),
  ],
  2: [
    k("C2-RECIT", "Le récit", "Raconter au passé : passé composé pour les actions, imparfait pour le décor.", {
      unites: ["S2-U1", "S2-U2", "S2-U3", "S2-U4"], points: ["G2-IMPF", "G2-IMPE", "G2-PCA", "G2-PCI", "G2-PCE", "G2-PQP"],
      temps: ["passecompose", "imparfait"] }),
    k("C2-LITTERATURE", "Les bases littéraires", "Personnages, narrateur, point de vue, ordre du récit.", {
      unites: ["S2-L1", "S2-L2", "S2-L3", "S2-L4", "S2-L5", "S2-L6"], points: ["L2-CHRONO", "L2-PDV"],
      evaluations: ["S2-EV-INTERLIT"] }),
  ],
  3: [
    k("C3-AVIS", "L'avis justifié", "Donner son opinion et la justifier : parce que, car, donc, à mon avis.", {
      unites: ["S3-U5"], points: ["G3-CAUSE", "G3-INDEF"], evaluations: ["S3-EV-OPINION"] }),
    k("C3-CRITIQUE", "La critique", "Juger une œuvre, un film ou un livre de façon nuancée.", {
      unites: ["S3-U6", "S3-U7", "S3-L5"], points: ["G3-ADJ", "G3-NUANCE"], evaluations: ["S3-EV-CRITIQUE"] }),
    k("C3-VOEUX", "Vœux et souhaits", "Parler de ses projets et de ses rêves : futur simple et conditionnel.", {
      unites: ["S3-U1", "S3-U2", "S3-U3"], points: ["G3-FUTF", "G3-FUTE", "G3-CONDP", "G3-MODAUX"],
      temps: ["futur", "conditionnel"], evaluations: ["S3-EV-LETTRE"] }),
  ],
  4: [
    k("C4-HYPOTHESE", "L'hypothèse et la condition", "Si + présent, si + imparfait, si + plus-que-parfait.", {
      unites: ["S4-U1", "S4-U6", "S4-U7"], points: ["G4-SI1", "G4-SI2", "G4-SI3", "G4-HYPO", "G4-REGRET"],
      temps: ["conditionnel", "conditionnelpasse"] }),
    k("C4-OPINION", "L'opinion argumentée", "Argumenter, opposer, nuancer : une opinion plus complexe.", {
      unites: ["S4-U2", "S4-U3", "S4-U4"], points: ["G4-OPPOS", "G4-PROG"] }),
    k("C4-BOOKCLUB", "Le book club", "Lire en groupe, citer, commenter, débattre d'un roman.", {
      unites: ["S4-L1", "S4-L2", "S4-L3", "S4-L4", "S4-L5"], points: ["L4-FOCAL", "L4-CITER"],
      evaluations: ["S4-EV-EXTRAIT"] }),
  ],
  5: [
    k("C5-PRESSE", "Le discours indirect et la revue de presse", "Rapporter des paroles, citer ses sources, présenter l'actualité.", {
      unites: ["S5-U1", "S5-U2", "S5-U3"], points: ["G5-DI", "G5-CONC", "G5-INTIND", "G5-SOURCES", "G5-NOMIN"],
      evaluations: ["S5-EV-PRESSE", "S5-EV-COCE"] }),
    k("C5-LINEAIRE", "Le commentaire linéaire", "Lire un texte pas à pas : repérer un procédé, nommer son effet.", {
      unites: ["S5-L1", "S5-L2", "S5-L3", "S5-L4"], points: ["L5-PROC", "L5-LIN"], evaluations: ["S5-EV-LINEAIRE"] }),
  ],
  6: [
    k("C6-DEBAT", "Le subjonctif et le débat", "Exprimer la volonté, les sentiments, le doute ; débattre.", {
      unites: ["S6-U1", "S6-U2", "S6-U7"], points: ["G6-SUBJF", "G6-SUBJI", "G6-SENT", "G6-INFSUBJ", "G6-REFUT", "G6-PAROLE"],
      temps: ["subjonctif"], evaluations: ["S6-EV-DEBAT"] }),
    k("C6-REDACTION", "La rédaction argumentative", "Introduction, arguments, concession, conclusion.", {
      unites: ["S6-U3", "S6-U4"], points: ["G6-REDAC", "G6-SUBIND", "G6-CONCESS", "G6-BUT"], evaluations: ["S6-EV-REDAC"] }),
  ],
  7: [
    k("C7-ANALYSE", "L'analyse littéraire", "Figures de style, ironie, registres : analyser un texte.", {
      unites: ["S7-U1", "S7-L1", "S7-L2", "S7-L3", "S7-L4"], points: ["G7-ANA", "G7-FIGURES", "L7-IRONIE"] }),
    k("C7-COMPOSE", "Le commentaire composé", "Un plan en axes, des citations commentées.", {
      unites: ["S7-L5", "S7-U7"], points: ["L7-COMPOSE", "G7-DIAL"], evaluations: ["S7-EV-COMPOSE"] }),
  ],
  8: [
    k("C8-REPETITION", "Répétition", "Toutes les compétences centrales des semestres 1 à 7, à revoir avant la Maturité.", {
      unites: ["S8-U4", "S8-U6", "S8-U7", "S8-L5"], points: ["G8-REVISION", "G8-CORRIGER", "G8-ACCORDS"],
      evaluations: ["S8-EV-REDAC", "S8-EV-ORAL", "S8-EV-INTERRO"] }),
  ],
};

/* FMS : proposition tirée du plan de la filière (à ajuster). */
const FMS = {
  1: [
    k("CF1-INTERVIEW", "L'interview", "Se présenter, poser des questions, répondre à la forme négative.", {
      unites: ["F1-U1", "F1-U2"], points: ["G1-QUESTIONS", "G2-NEGATION", "GF1-ER"], temps: ["present"] }),
    k("CF1-RESUME", "Le résumé", "Résumer le polar au présent, dans l'ordre.", {
      unites: ["F1-L1", "F1-L3", "F1-L4"], points: ["L1-CADRE", "G7-RESUME"], temps: ["present"], evaluations: ["F1-EV-POLAR"] }),
  ],
  2: [
    k("CF2-RECIT", "Le récit", "Raconter au passé composé et à l'imparfait.", {
      unites: ["F2-U2", "F2-U3"], points: ["G2-PCA", "G2-PCE", "G2-IMPF", "G2-PCI"], temps: ["passecompose", "imparfait"] }),
    k("CF2-HISTOIRES", "Lire et raconter une histoire", "Comprendre une histoire courte et la raconter.", {
      unites: ["F2-L1", "F2-L2", "F2-L3", "F2-L4"], points: ["LF2-HISTOIRE", "LF2-RACONTER", "LF2-FIN"], evaluations: ["F2-EV-HISTOIRES"] }),
  ],
  3: [
    k("CF3-PROJETS", "Projets et souhaits", "Parler de son avenir et de son métier : futur et conditionnel.", {
      unites: ["F3-U1", "F3-U2", "F3-U6"], points: ["G3-FUTF", "G3-CONDP", "G3-FUTE"], temps: ["futur", "conditionnel"] }),
    k("CF3-AVIS", "L'avis justifié", "Donner et justifier son avis, conseiller.", {
      unites: ["F3-U4"], points: ["G3-CONSEIL"], evaluations: ["F3-EV-COCE"] }),
    k("CF3-RESUME", "Le résumé", "Résumer « Frères de sang » : les cinq questions, le présent, l'essentiel.", {
      unites: ["F3-L1", "F3-L2", "F3-L3", "F3-L4"], points: ["LF3-RESUME", "LF3-AVANT", "LF3-PORTRAIT"], evaluations: ["F3-EV-RESUME"] }),
  ],
  4: [
    k("CF4-HYPOTHESE", "L'hypothèse", "Imaginer et conseiller : si + imparfait → conditionnel.", {
      unites: ["F4-U4"], points: ["G4-SI2", "G3-MODAUX"], temps: ["conditionnel"] }),
    k("CF4-OPINION", "L'opinion argumentée", "Argumenter avec la cause, la conséquence, les exemples.", {
      unites: ["F4-U6", "F4-U2"], points: ["G3-CAUSE", "G3-INDEF", "G5-SOURCES"], evaluations: ["F4-EV-CE"] }),
    k("CF4-BOOKCLUB", "Le book club", "Lire en groupe, citer, débattre.", {
      unites: ["F4-L1", "F4-L2", "F4-L3", "F4-L4"], points: ["LF4-CLUB", "L4-CITER", "LF4-DEBAT"], evaluations: ["F4-EV-CLUB"] }),
  ],
  5: [
    k("CF5-RAPPORTER", "Le discours indirect", "Rapporter des paroles et des questions, au présent et au passé.", {
      unites: ["F5-U1", "F5-U5"], points: ["G3-DI", "G5-INTIND", "G5-DI", "G5-CONC"] }),
    k("CF5-REDACTION", "La rédaction argumentative", "Construire une argumentation de 250 mots.", {
      unites: ["F5-U6"], points: ["GF5-ARGU", "G4-SI3"], evaluations: ["F5-EV-REDAC"] }),
  ],
  6: [
    k("CF6-SUBJONCTIF", "Le subjonctif", "Il faut que, vouloir que, les sentiments.", {
      unites: ["F6-U1", "F6-U2", "F6-U3"], points: ["G6-SUBJF", "G6-SUBJI", "G6-SENT", "G6-INFSUBJ"], temps: ["subjonctif"] }),
    k("CF6-EXAMEN", "L'examen écrit", "Compréhension écrite et orale, rédaction argumentative.", {
      unites: ["F6-U4", "F6-U5"], points: ["GF6-CEQUI", "G6-REDAC", "GF6-TEMPS"], evaluations: ["F6-EV-BLANC"] }),
    k("CF6-ORAL", "L'oral sur un livre", "Présenter un extrait, répondre aux questions.", {
      unites: ["F6-U6", "F6-L3", "F6-L4"], points: ["GF6-ORAL", "LF6-EXTRAIT", "LF6-QUESTIONS"], evaluations: ["F6-EV-ORAL"] }),
  ],
};

export const COMPETENCES = { gymnase: GYMNASE, fms: FMS };
