/* FMS S3 — ligne de lecture : « Frères de sang » (Mikaël Ollivier,
   Thierry Magnier, édition originale). Lu avec la F2d sur onze semaines,
   évalué par un résumé (130 à 150 mots). Les mots et les étapes suivent le
   dossier de l'enseignant : entrer dans le livre et le genre du polar, le
   prologue et le chapitre 1, le portrait de Martin, puis le résumé.      */

import { c, s, o, t, p, x, f, carnet } from "./aides.js";

export const MOTS_FRERES = [
  /* L1 · Le polar */
  f("F3-050", "le polar", "der Krimi", "N", "Roman policier", "« Frères de sang » est un polar pour les jeunes.", { syn: "le roman policier" }),
  f("F3-051", "le sang", "das Blut", "N", "Roman policier", "Deux frères ont le même sang : ils ont les mêmes parents."),
  f("F3-052", "l'hypothèse (f.)", "die Vermutung, die Hypothese", "N", "Roman policier", "Avant de lire, nous faisons des hypothèses sur l'histoire."),
  f("F3-053", "faire des hypothèses", "Vermutungen anstellen", "L", "Roman policier", "Regardez la couverture et faites des hypothèses."),
  f("F3-054", "probablement", "wahrscheinlich", "C", "Roman policier", "Le personnage principal est probablement le petit frère."),
  /* L2 · Le prologue et le chapitre 1 */
  f("F3-057", "le prologue", "der Prolog", "N", "Littérature", "Le prologue, c'est le texte avant le chapitre 1."),
  f("F3-059", "le copain, la copine", "der Kumpel, die Kollegin", "N", "Relations proches", "Avant, Martin avait beaucoup de copains."),
  f("F3-060", "sonner à la porte", "an der Tür klingeln", "L", "Roman policier", "Pendant le dîner, quelqu'un sonne à la porte."),
  f("F3-061", "le flic (fam.)", "der Bulle (ugs.)", "N", "Roman policier", "« Les flics sont là ! » Un flic, c'est un policier.", { piege: "familier : à l'écrit, on dit « le policier »." }),
  f("F3-062", "soupçonner qn d'avoir fait qc", "jdn verdächtigen, etw. getan zu haben", "L", "Roman policier", "La police soupçonne Brice d'avoir tué cinq personnes."),
  f("F3-063", "emmener qn", "jdn mitnehmen", "V", "Roman policier", "Les policiers emmènent Brice au commissariat.", { piege: "emmener (une personne) ≠ emporter (une chose)." }),
  f("F3-064", "chercher des preuves", "Beweise suchen", "L", "Roman policier", "Les policiers restent dans la maison et cherchent des preuves."),
  /* L3 · Martin, le personnage principal */
  f("F3-065", "loyal, loyale", "treu, loyal", "A", "Identité", "Martin est loyal : il défend son frère."),
  f("F3-066", "sensible", "sensibel, empfindsam", "A", "Identité", "Martin est sensible : il remarque tout.", { piege: "sensible ≠ vernünftig (= raisonnable)." }),
  f("F3-067", "admirer qn", "jdn bewundern", "V", "Identité", "Martin admire son grand frère."),
  f("F3-068", "croire à l'innocence de qn", "an jds Unschuld glauben", "L", "Roman policier", "Martin croit à l'innocence de Brice."),
  f("F3-069", "impuissant, impuissante", "machtlos", "A", "Sentiments", "Les parents se sentent impuissants."),
  f("F3-070", "désespéré, désespérée", "verzweifelt", "A", "Sentiments", "La mère est désespérée : elle pleure très fort."),
  f("F3-071", "la fiche d'identité", "der Steckbrief", "N", "Littérature", "Remplissez la fiche d'identité de Martin."),
  /* L4 · Le résumé */
  f("F3-072", "l'essentiel (m.)", "das Wesentliche", "N", "Littérature", "Un résumé garde seulement l'essentiel."),
  f("F3-073", "les cinq questions", "die fünf W-Fragen", "N", "Littérature", "Qui ? Où ? Quand ? Quoi ? Pourquoi ? Ce sont les cinq questions du résumé."),
  f("F3-074", "le connecteur", "das Verbindungswort", "N", "Littérature", "D'abord, ensuite, finalement : ce sont des connecteurs."),
  f("F3-075", "reformuler", "umformulieren", "V", "Littérature", "Dans un résumé, on reformule avec ses propres mots."),
  f("F3-076", "le nombre de mots", "die Anzahl Wörter", "N", "Littérature", "Le nombre de mots est limité : 130 à 150."),
  f("F3-077", "la phrase-clé", "der Schlüsselsatz", "N", "Littérature", "Soulignez une phrase-clé par paragraphe."),
  f("F3-078", "à la troisième personne", "in der dritten Person", "L", "Littérature", "Le roman est à la première personne, le résumé à la troisième personne."),
  f("F3-079", "la check-list", "die Checkliste", "N", "Littérature", "Avant de rendre le résumé, je relis ma check-list."),
  f("F3-080", "supprimer les détails", "Details weglassen", "L", "Littérature", "Pour résumer, il faut supprimer les détails."),
  f("F3-081", "le résumé de chapitre", "die Kapitelzusammenfassung", "N", "Littérature", "Chaque semaine, j'écris un résumé de chapitre."),
];

export const GRAMMAIRE_FRERES = [
  {
    id: "LF3-POLAR", unite: "F3-L1", titre: "Le polar et les hypothèses",
    explication: [
      "Un **polar** (= un roman policier) raconte un **crime** et une **enquête**. On y trouve une **victime**, des **suspects**, des **indices** et des **preuves**, un **mobile** (la raison du crime) et à la fin, souvent, un **coupable**.",
      "Avant de lire, on **fait des hypothèses** à partir du titre et de la couverture : *Je pense que…* · *L'histoire parle **peut-être** de…* · *Le personnage principal est **probablement**…*",
      "**Peut-être** = vielleicht (pas sûr) · **probablement** = wahrscheinlich (presque sûr) · **sûrement** = sicher.",
    ],
    exercices: [
      c("lf3p-01", "La personne qui fait l'enquête, c'est…", ["l'enquêteur", "la victime", "le suspect"], "l'enquêteur"),
      c("lf3p-02", "La raison du crime, c'est…", ["le mobile", "l'indice", "l'alibi"], "le mobile"),
      c("lf3p-03", "La personne qui a commis le crime, c'est…", ["le coupable", "le témoin", "l'avocat"], "le coupable"),
      c("lf3p-04", "Une empreinte sur un verre, c'est…", ["un indice", "un mobile", "un alibi"], "un indice"),
      c("lf3p-05", "Je ne suis pas sûr : c'est ___ un roman sur deux frères.", ["peut-être", "sûrement", "jamais"], "peut-être"),
      c("lf3p-06", "Le titre parle de sang : il y a ___ un crime.", ["probablement", "jamais", "rien"], "probablement"),
      c("lf3p-07", "Pour faire une hypothèse :", ["Je pense que le frère est innocent.", "Le livre a 200 pages.", "J'ai lu le livre hier."], "Je pense que le frère est innocent."),
      s("lf3p-08", "Complétez.", "Un roman policier s'appelle aussi un ___.", "polar"),
      s("lf3p-09", "Complétez.", "La police ___ Brice d'avoir tué cinq personnes.", "soupçonne"),
      s("lf3p-10", "Complétez.", "La personne qui est tuée, c'est la ___.", "victime"),
      o("lf3p-11", "L'histoire parle peut-être de deux frères."),
    ],
  },
  {
    id: "LF3-AVANT", unite: "F3-L2", titre: "Avant… maintenant : imparfait et présent",
    explication: [
      "Dans le prologue, Martin compare sa vie **avant** et **maintenant**.",
      "Pour parler d'**avant** (une habitude dans le passé), on utilise l'**imparfait** : il **avait** des copains, il **était** bon élève, il **jouait** au tennis.",
      "Pour parler de **maintenant**, on utilise le **présent** : il **a** quinze ans, il **est** seul, il **n'a plus** d'amis.",
      "**ne… plus** = nicht mehr : Avant, il jouait au tennis. Maintenant, il **ne** joue **plus** au tennis.",
    ],
    exercices: [
      c("lf3a-01", "Avant, Martin ___ beaucoup de copains.", ["avait", "a", "aura"], "avait"),
      c("lf3a-02", "Maintenant, il ___ seul.", ["est", "était", "a été"], "est"),
      c("lf3a-03", "Avant, il ___ au tennis.", ["jouait", "joue", "jouera"], "jouait"),
      c("lf3a-04", "Maintenant, il n'a ___ d'amis.", ["plus", "pas de plus", "jamais pas"], "plus"),
      c("lf3a-05", "Avant, il ___ bon élève.", ["était", "est", "sera"], "était"),
      s("lf3a-06", "Mettez à l'imparfait (avant).", "Il va au cinéma.", "Il allait au cinéma."),
      s("lf3a-07", "Mettez à l'imparfait (avant).", "Nous avons beaucoup d'amis.", "Nous avions beaucoup d'amis."),
      s("lf3a-08", "Mettez au présent (maintenant).", "Il était bon élève.", "Il est bon élève."),
      s("lf3a-09", "Répondez avec ne… plus.", "Martin joue encore au tennis ? — Non, …", "il ne joue plus au tennis.", ["il ne joue plus au tennis", "Non, il ne joue plus au tennis."]),
      s("lf3a-10", "Complétez à l'imparfait.", "Avant, la famille ___ (être) heureuse.", "était"),
      o("lf3a-11", "Avant, il avait des copains, maintenant il est seul."),
      o("lf3a-12", "Il ne joue plus au tennis."),
    ],
  },
  {
    id: "LF3-PORTRAIT", unite: "F3-L3", titre: "Faire le portrait d'un personnage",
    explication: [
      "Un portrait commence par l'**identité** : nom, âge, lieu, famille, école, loisirs.",
      "Puis le **caractère** avec des adjectifs **accordés** : il est loyal → elle est loyal**e** · seul → seul**e** · désespéré → désespéré**e** · sensible → sensible.",
      "On **justifie** chaque adjectif avec un exemple : *Martin est loyal **parce qu'**il croit à l'innocence de son frère.* · *Dans le texte, on le voit quand…*",
      "**Il est** + adjectif / métier · **C'est un garçon** + adjectif : *Il est sensible.* · *C'est un garçon sensible.*",
    ],
    exercices: [
      c("lf3r-01", "La mère est ___.", ["désespérée", "désespéré", "désespérés"], "désespérée"),
      c("lf3r-02", "Martin est ___ : il défend son frère.", ["loyal", "loyale", "loyaux"], "loyal"),
      c("lf3r-03", "Les parents sont ___.", ["impuissants", "impuissant", "impuissante"], "impuissants"),
      c("lf3r-04", "___ un garçon sensible.", ["C'est", "Il est", "Elle est"], "C'est"),
      c("lf3r-05", "Pour justifier un adjectif :", ["Martin est loyal parce qu'il défend Brice.", "Martin est loyal.", "Martin, loyal ?"], "Martin est loyal parce qu'il défend Brice."),
      c("lf3r-06", "Dans un portrait, on commence par…", ["l'identité", "la fin du livre", "son avis"], "l'identité"),
      s("lf3r-07", "Accordez l'adjectif.", "Elle se sent ___ (seul).", "seule"),
      s("lf3r-08", "Complétez.", "Martin ___ son grand frère : il le trouve génial.", "admire"),
      s("lf3r-09", "Complétez.", "Il croit à l'___ de son frère.", "innocence"),
      o("lf3r-10", "Martin est le personnage principal et le narrateur."),
    ],
  },
  {
    id: "LF3-RESUME", unite: "F3-L4", titre: "Résumer un roman : les règles",
    explication: [
      "Un résumé répond aux **cinq questions** : **qui ? où ? quand ? quoi ? pourquoi ?**",
      "Il est écrit au **présent**, à la **troisième personne** (le roman dit « je », le résumé dit « Martin »), **sans dialogue** et **sans avis personnel**.",
      "On garde **l'essentiel**, on **supprime les détails** et on **reformule** avec ses mots. On relie les étapes avec des **connecteurs** : *d'abord, ensuite, puis, mais, alors, finalement*.",
      "On respecte le **nombre de mots** : pour l'examen, 130 à 150 mots.",
    ],
    exercices: [
      c("lf3s-01", "Un résumé est écrit…", ["au présent", "au futur", "à l'impératif"], "au présent"),
      c("lf3s-02", "Le roman dit « je ». Le résumé dit…", ["« Martin »", "« je »", "« nous »"], "« Martin »"),
      c("lf3s-03", "Dans un résumé, on met…", ["l'essentiel", "tous les dialogues", "son avis"], "l'essentiel"),
      c("lf3s-04", "« Quand ? », c'est…", ["un soir, pendant le dîner", "dans la maison", "la police emmène Brice"], "un soir, pendant le dîner"),
      c("lf3s-05", "« Pourquoi ? », c'est…", ["on le soupçonne d'avoir tué cinq personnes", "la famille Lemeunier", "au Domaine de Sans-Souci"], "on le soupçonne d'avoir tué cinq personnes"),
      c("lf3s-06", "Quel connecteur pour la fin ?", ["finalement", "d'abord", "parce que"], "finalement"),
      s("lf3s-07", "Mettez à la troisième personne.", "Je pleure.", "Il pleure.", ["Martin pleure.", "Elle pleure."]),
      s("lf3s-08", "Mettez au présent.", "Les policiers ont emmené Brice.", "Les policiers emmènent Brice."),
      s("lf3s-09", "Complétez.", "Pour l'examen, le résumé fait 130 à 150 ___.", "mots"),
      o("lf3s-10", "Pendant le dîner, des policiers emmènent Brice."),
    ],
  },
];

export const TOURNURES_FRERES = [
  t("TF3L1-01", "F3-L1", "Le titre me fait penser à…", "Der Titel lässt mich an… denken.", "Vous réagissez au titre.", "titre"),
  t("TF3L1-02", "F3-L1", "Sur la couverture, on voit…", "Auf dem Umschlag sieht man…", "Vous décrivez la couverture.", "couverture"),
  t("TF3L1-03", "F3-L1", "L'histoire parle peut-être de…", "Die Geschichte handelt vielleicht von…", "Vous faites une hypothèse.", "peut-être"),
  t("TF3L1-04", "F3-L1", "Le personnage principal est probablement…", "Die Hauptfigur ist wahrscheinlich…", "Vous faites une hypothèse.", "probablement"),
  t("TF3L1-05", "F3-L1", "À mon avis, à la fin…", "Meiner Meinung nach am Ende…", "Vous imaginez la fin.", "fin"),
  t("TF3L1-06", "F3-L1", "C'est un polar pour les jeunes.", "Es ist ein Jugendkrimi.", "Vous présentez le genre.", "polar"),
  t("TF3L1-07", "F3-L1", "Le crime, c'est un meurtre.", "Das Verbrechen ist ein Mord.", "Vous présentez un polar.", "meurtre"),
  t("TF3L1-08", "F3-L1", "L'enquêteur cherche le coupable.", "Der Ermittler sucht den Täter.", "Vous expliquez un polar.", "coupable"),
  t("TF3L1-09", "F3-L1", "Mon polar préféré, c'est…", "Mein Lieblingskrimi ist…", "Vous parlez de vos goûts.", "préféré"),
  t("TF3L1-10", "F3-L1", "Je ne suis pas sûr(e), mais je pense que…", "Ich bin nicht sicher, aber ich denke, dass…", "Vous nuancez une hypothèse.", "sûr"),

  t("TF3L2-01", "F3-L2", "Dans le prologue, Martin raconte que…", "Im Prolog erzählt Martin, dass…", "Vous résumez le prologue.", "prologue"),
  t("TF3L2-02", "F3-L2", "Avant, il avait…, maintenant il…", "Früher hatte er…, jetzt…", "Vous comparez avant et maintenant.", "Avant"),
  t("TF3L2-03", "F3-L2", "Il n'a plus d'amis.", "Er hat keine Freunde mehr.", "Vous décrivez Martin maintenant.", "plus"),
  t("TF3L2-04", "F3-L2", "Un soir, quelqu'un sonne à la porte.", "Eines Abends klingelt jemand an der Tür.", "Vous racontez le chapitre 1.", "sonne"),
  t("TF3L2-05", "F3-L2", "Ce sont des policiers.", "Es sind Polizisten.", "Vous racontez le chapitre 1.", "policiers"),
  t("TF3L2-06", "F3-L2", "On soupçonne Brice d'avoir tué cinq personnes.", "Man verdächtigt Brice, fünf Menschen getötet zu haben.", "Vous expliquez l'accusation.", "soupçonne"),
  t("TF3L2-07", "F3-L2", "Le père appelle l'avocat de la famille.", "Der Vater ruft den Anwalt der Familie an.", "Vous racontez la réaction du père.", "avocat"),
  t("TF3L2-08", "F3-L2", "La mère pleure très fort.", "Die Mutter weint sehr laut.", "Vous décrivez une émotion.", "pleure"),
  t("TF3L2-09", "F3-L2", "Les policiers emmènent Brice.", "Die Polizisten nehmen Brice mit.", "Vous racontez l'arrestation.", "emmènent"),
  t("TF3L2-10", "F3-L2", "Quand la police arrive, Martin se sent perdu.", "Als die Polizei kommt, fühlt sich Martin verloren.", "Vous décrivez Martin.", "perdu"),

  t("TF3L3-01", "F3-L3", "Martin est le personnage principal et le narrateur.", "Martin ist die Hauptfigur und der Erzähler.", "Vous présentez Martin.", "narrateur"),
  t("TF3L3-02", "F3-L3", "Il a quatorze ans au début de l'histoire.", "Er ist am Anfang der Geschichte vierzehn.", "Vous donnez son âge.", "quatorze"),
  t("TF3L3-03", "F3-L3", "Il habite au Domaine de Sans-Souci, près de Paris.", "Er wohnt in der Siedlung Sans-Souci, in der Nähe von Paris.", "Vous situez Martin.", "habite"),
  t("TF3L3-04", "F3-L3", "Son père est neurochirurgien.", "Sein Vater ist Neurochirurg.", "Vous présentez la famille.", "neurochirurgien"),
  t("TF3L3-05", "F3-L3", "Son grand frère fait une école de cinéma.", "Sein grosser Bruder besucht eine Filmschule.", "Vous présentez Brice.", "cinéma"),
  t("TF3L3-06", "F3-L3", "Martin est loyal parce qu'il…", "Martin ist treu, weil er…", "Vous justifiez un adjectif.", "loyal"),
  t("TF3L3-07", "F3-L3", "Dans le texte, on le voit quand…", "Im Text sieht man das, als…", "Vous donnez un exemple.", "texte"),
  t("TF3L3-08", "F3-L3", "Il admire son grand frère.", "Er bewundert seinen grossen Bruder.", "Vous parlez de leur relation.", "admire"),
  t("TF3L3-09", "F3-L3", "Il croit à l'innocence de Brice.", "Er glaubt an Brices Unschuld.", "Vous expliquez son point de vue.", "innocence"),
  t("TF3L3-10", "F3-L3", "Mon adjectif va peut-être changer pendant la lecture.", "Mein Adjektiv ändert sich vielleicht während des Lesens.", "Vous gardez une hypothèse ouverte.", "changer"),

  t("TF3L4-01", "F3-L4", "Dans le roman « Frères de sang » de Mikaël Ollivier, …", "Im Roman « Frères de sang » von Mikaël Ollivier…", "Vous commencez un résumé.", "roman"),
  t("TF3L4-02", "F3-L4", "D'abord…, ensuite…, finalement…", "Zuerst…, dann…, schliesslich…", "Vous organisez votre résumé.", "ensuite"),
  t("TF3L4-03", "F3-L4", "Dans ce chapitre, …", "In diesem Kapitel…", "Vous résumez un chapitre.", "chapitre"),
  t("TF3L4-04", "F3-L4", "Le résumé répond aux cinq questions.", "Die Zusammenfassung beantwortet die fünf W-Fragen.", "Vous expliquez la méthode.", "questions"),
  t("TF3L4-05", "F3-L4", "J'enlève les détails et les dialogues.", "Ich lasse Details und Dialoge weg.", "Vous expliquez la méthode.", "dialogues"),
  t("TF3L4-06", "F3-L4", "J'écris avec mes propres mots.", "Ich schreibe mit meinen eigenen Worten.", "Vous reformulez.", "propres"),
  t("TF3L4-07", "F3-L4", "Mon résumé fait 140 mots.", "Meine Zusammenfassung hat 140 Wörter.", "Vous comptez les mots.", "mots"),
  t("TF3L4-08", "F3-L4", "Je relis ma check-list avant de rendre.", "Ich lese meine Checkliste, bevor ich abgebe.", "Vous vérifiez.", "relis"),
  t("TF3L4-09", "F3-L4", "Mais Martin est sûr d'une chose : …", "Aber Martin ist sich in einem Punkt sicher: …", "Vous faites avancer le résumé.", "sûr"),
  t("TF3L4-10", "F3-L4", "Il décide de mener sa propre enquête.", "Er beschliesst, selbst zu ermitteln.", "Vous racontez une décision.", "enquête"),
];

export const PHRASES_FRERES = [
  p("PF3L1-01", "F3-L1", "Es ist ein Jugendkrimi.", "C'est un polar pour les jeunes.", ["C'est un roman policier pour les jeunes."]),
  p("PF3L1-02", "F3-L1", "Der Titel bedeutet vielleicht, dass zwei Brüder dasselbe Blut haben.", "Le titre veut peut-être dire que deux frères ont le même sang."),
  p("PF3L1-03", "F3-L1", "Auf dem Umschlag sieht man einen jungen Mann.", "Sur la couverture, on voit un jeune homme."),
  p("PF3L1-04", "F3-L1", "Ich denke, dass die Hauptfigur der kleine Bruder ist.", "Je pense que le personnage principal est le petit frère."),
  p("PF3L1-05", "F3-L1", "Das Opfer wurde getötet.", "La victime a été tuée."),
  p("PF3L1-06", "F3-L1", "Die Polizei sucht Beweise.", "La police cherche des preuves."),
  p("PF3L1-07", "F3-L1", "Was ist das Motiv?", "Quel est le mobile ?"),
  p("PF3L1-08", "F3-L1", "Wir stellen Vermutungen über die Geschichte an.", "Nous faisons des hypothèses sur l'histoire.", ["On fait des hypothèses sur l'histoire."]),
  p("PF3L1-09", "F3-L1", "Es gibt wahrscheinlich einen Mord.", "Il y a probablement un meurtre."),
  p("PF3L1-10", "F3-L1", "Der Ermittler verhört den Verdächtigen.", "L'enquêteur interroge le suspect."),

  p("PF3L2-01", "F3-L2", "Im Prolog vergleicht Martin sein Leben früher und jetzt.", "Dans le prologue, Martin compare sa vie avant et maintenant."),
  p("PF3L2-02", "F3-L2", "Früher hatte er viele Kumpel.", "Avant, il avait beaucoup de copains."),
  p("PF3L2-03", "F3-L2", "Jetzt hat er keine Freunde mehr.", "Maintenant, il n'a plus d'amis."),
  p("PF3L2-04", "F3-L2", "Die Familie isst ruhig zu Abend.", "La famille dîne tranquillement."),
  p("PF3L2-05", "F3-L2", "Plötzlich klingelt jemand an der Tür.", "Soudain, quelqu'un sonne à la porte.", ["Tout à coup, quelqu'un sonne à la porte."]),
  p("PF3L2-06", "F3-L2", "Die Polizei verdächtigt Brice.", "La police soupçonne Brice."),
  p("PF3L2-07", "F3-L2", "Die Polizisten nehmen ihn mit.", "Les policiers l'emmènent."),
  p("PF3L2-08", "F3-L2", "Der Vater ruft André an, den Anwalt.", "Le père appelle André, l'avocat.", ["Le père téléphone à André, l'avocat."]),
  p("PF3L2-09", "F3-L2", "Die Polizisten bleiben im Haus und suchen Beweise.", "Les policiers restent dans la maison et cherchent des preuves."),
  p("PF3L2-10", "F3-L2", "Die Mutter weint.", "La mère pleure."),

  p("PF3L3-01", "F3-L3", "Martin ist vierzehn Jahre alt.", "Martin a quatorze ans."),
  p("PF3L3-02", "F3-L3", "Er ist die Hauptfigur und der Erzähler.", "Il est le personnage principal et le narrateur."),
  p("PF3L3-03", "F3-L3", "Seine Mutter ist künstlerische Leiterin.", "Sa mère est directrice artistique."),
  p("PF3L3-04", "F3-L3", "Er bewundert seinen grossen Bruder.", "Il admire son grand frère."),
  p("PF3L3-05", "F3-L3", "Er ist treu, weil er an die Unschuld seines Bruders glaubt.", "Il est loyal parce qu'il croit à l'innocence de son frère."),
  p("PF3L3-06", "F3-L3", "Er fühlt sich allein.", "Il se sent seul."),
  p("PF3L3-07", "F3-L3", "Die Eltern fühlen sich machtlos.", "Les parents se sentent impuissants."),
  p("PF3L3-08", "F3-L3", "Die Mutter ist verzweifelt.", "La mère est désespérée."),
  p("PF3L3-09", "F3-L3", "Früher spielte er Tennis.", "Avant, il jouait au tennis."),
  p("PF3L3-10", "F3-L3", "Er will seinen Bruder beschützen.", "Il veut protéger son frère."),

  p("PF3L4-01", "F3-L4", "Eine Zusammenfassung ist im Präsens geschrieben.", "Un résumé est écrit au présent."),
  p("PF3L4-02", "F3-L4", "Ich schreibe in der dritten Person.", "J'écris à la troisième personne."),
  p("PF3L4-03", "F3-L4", "Ich behalte nur das Wesentliche.", "Je garde seulement l'essentiel.", ["Je ne garde que l'essentiel."]),
  p("PF3L4-04", "F3-L4", "Ich lasse die Dialoge weg.", "J'enlève les dialogues.", ["Je supprime les dialogues."]),
  p("PF3L4-05", "F3-L4", "Zuerst stelle ich die Figuren vor.", "D'abord, je présente les personnages."),
  p("PF3L4-06", "F3-L4", "Dann erzähle ich die wichtigen Schritte.", "Ensuite, je raconte les étapes importantes."),
  p("PF3L4-07", "F3-L4", "Meine Zusammenfassung hat 135 Wörter.", "Mon résumé fait 135 mots.", ["Mon résumé a 135 mots."]),
  p("PF3L4-08", "F3-L4", "Ich formuliere mit meinen eigenen Worten um.", "Je reformule avec mes propres mots."),
  p("PF3L4-09", "F3-L4", "Ich gebe meine Meinung nicht.", "Je ne donne pas mon avis."),
  p("PF3L4-10", "F3-L4", "Schliesslich lese ich meine Checkliste.", "Finalement, je relis ma check-list.", ["Enfin, je relis ma check-list."]),
];

export const TEXTES_FRERES = [
  x("XF3L2-01", "F3-L2", "Le chapitre 1", "Complétez avec les mots du chapitre.",
    "Un soir, la famille Lemeunier {dîne|zu Abend essen} tranquillement. Soudain, quelqu'un {sonne|klingeln} à la porte. Ce sont des {policiers|Polizisten}. Ils {soupçonnent|verdächtigen} Brice d'avoir tué cinq personnes. Le père appelle André, l'{avocat|Anwalt} de la famille. La mère {pleure|weinen} très fort. Les policiers {emmènent|mitnehmen} Brice."),
  x("XF3L4-01", "F3-L4", "Un résumé en 40 mots", "Complétez le résumé du chapitre 1.",
    "{Dans|in} le premier chapitre du roman « Frères de sang » de Mikaël Ollivier, la famille Lemeunier dîne {quand|als} des policiers sonnent à la porte. Ils {soupçonnent|verdächtigen} Brice, dix-neuf ans, d'avoir tué cinq personnes et l'{emmènent|mitnehmen}. La mère pleure, le père {appelle|anrufen} l'avocat."),
];

export const EVALUATION_FRERES = {
  "F3-EV-RESUME": {
    titre: "« Frères de sang » : le résumé", type: "Littérature (écrit)", quand: "Fin de la lecture (semaine 11)",
    objectif: "Résumer une partie du roman en 130 à 150 mots, au présent, avec ses propres mots.",
    criteres: [
      { critere: "Contenu", detail: "Les cinq questions (qui, où, quand, quoi, pourquoi) et les étapes essentielles, dans l'ordre." },
      { critere: "Forme du résumé", detail: "Présent, troisième personne, pas de dialogue, pas d'avis personnel." },
      { critere: "Organisation", detail: "Connecteurs : d'abord, ensuite, puis, mais, alors, finalement." },
      { critere: "Langue et longueur", detail: "130 à 150 mots ; verbes et accords corrects ; mots du polar." },
    ],
    modele: {
      texte: "Dans le premier chapitre du roman « Frères de sang » de Mikaël Ollivier, la famille Lemeunier dîne quand des policiers sonnent à la porte. Ils soupçonnent Brice, dix-neuf ans, d'avoir tué cinq personnes et l'emmènent. La mère pleure, le père appelle l'avocat.",
      remarques: ["Exemple de 40 mots, pour un seul chapitre : à l'examen, le résumé porte sur une partie plus longue (130 à 150 mots).", "Titre et auteur dans la première phrase.", "Présent et troisième personne ; aucun dialogue."],
    },
    tournures: ["Dans le roman « Frères de sang » de Mikaël Ollivier, …", "D'abord… Ensuite… Finalement…", "Mais…", "Alors…"],
    conseils: ["Chaque semaine, écrivez le résumé du chapitre lu : 40 mots, puis 80, puis 130.", "Avant d'écrire, répondez aux cinq questions sur un brouillon.", "Comptez vos mots et relisez votre check-list."],
    entrainement: {
      titre: "Le résumé de deux chapitres",
      consigne: "Résumez les deux derniers chapitres lus en classe (100 à 130 mots), au présent et à la troisième personne.",
      controle: ["Je réponds aux cinq questions.", "J'écris au présent, à la troisième personne.", "Je n'ai ni dialogue ni avis personnel.", "J'ai entre 100 et 130 mots."],
      modele: "Dans les chapitres… du roman « Frères de sang », …",
    },
  },
};

export const LECTURE_FRERES = {
  titre: "« Frères de sang »",
  sous: "Mikaël Ollivier, Thierry Magnier · un polar jeunesse : la police soupçonne le grand frère de Martin · 11 semaines, vers le résumé",
  stations: [
    {
      id: "F3-L1", numero: 1, titre: "Entrer dans le livre", semaines: "1–2", chapitres: "Le titre, les couvertures, le genre",
      sous: "Faire des hypothèses, découvrir le genre du polar.",
      notions: ["F3-050", "F3-052", "F3-053"],
      mots: ["F3-051", "F3-054", "RP-008", "RP-015", "RP-003", "RP-004", "RP-018", "RP-026", "S6-008", "S6-009"],
      grammaire: ["LF3-POLAR"],
      carnet: carnet(
        "Avant de lire : que veut dire le titre « Frères de sang » ? Décrivez une couverture et faites trois hypothèses sur l'histoire (5 à 7 phrases).",
        ["Je propose un sens pour le titre.", "Je décris la couverture (on voit…, au premier plan…).", "Je fais trois hypothèses avec peut-être, probablement, je pense que.", "J'utilise au moins trois mots du polar."],
        "Pour moi, « Frères de sang » veut dire deux frères qui ont les mêmes parents, mais aussi qu'il y a un crime. Sur la couverture, on voit un jeune homme dans l'ombre. Au premier plan, il y a une grille. Je pense que le grand frère est en prison. L'histoire parle peut-être d'un meurtre. Le personnage principal est probablement le petit frère : il veut prouver que son frère est innocent."),
    },
    {
      id: "F3-L2", numero: 2, titre: "Le prologue et le chapitre 1", semaines: "3–4", chapitres: "Le prologue et le chapitre 1",
      sous: "Avant et maintenant ; un soir, la police sonne à la porte.",
      notions: ["F3-057"],
      mots: ["F3-059", "S3-009", "S3-105", "F3-060", "F3-061", "S6-045", "F3-062", "F3-063", "S2-052", "F3-064"],
      grammaire: ["LF3-AVANT"],
      carnet: carnet(
        "Résumez le chapitre 1 en répondant aux cinq questions, puis en 40 mots. Ajoutez une phrase : comment se sent Martin ?",
        ["Je réponds à qui, où, quand, quoi, pourquoi.", "Mon résumé fait environ 40 mots.", "J'écris au présent, sans dialogue.", "Je décris une émotion de Martin avec parce que."],
        "Qui ? la famille Lemeunier, des policiers, André. Où ? dans la maison, au Domaine de Sans-Souci. Quand ? un soir, pendant le dîner. Quoi ? la police emmène Brice. Pourquoi ? on le soupçonne d'avoir tué cinq personnes. — Dans le premier chapitre du roman « Frères de sang » de Mikaël Ollivier, la famille Lemeunier dîne quand des policiers sonnent à la porte. Ils soupçonnent Brice, dix-neuf ans, d'avoir tué cinq personnes et l'emmènent. La mère pleure, le père appelle l'avocat."),
    },
    {
      id: "F3-L3", numero: 3, titre: "Martin, le personnage principal", semaines: "5–6", chapitres: "La suite de la première partie",
      sous: "Fiche d'identité, caractère, relations : le portrait de Martin.",
      notions: ["F3-071", "S1-072"],
      mots: ["F3-065", "F3-066", "S1-124", "F3-067", "S4-045", "F3-068", "F3-069", "F3-070"],
      grammaire: ["LF3-PORTRAIT"],
      carnet: carnet(
        "Écrivez le portrait de Martin (60 à 80 mots) : identité, famille, avant et maintenant, trois adjectifs justifiés.",
        ["Je commence par l'identité (nom, âge, lieu, famille).", "J'utilise l'imparfait pour avant et le présent pour maintenant.", "J'utilise trois adjectifs, chacun justifié avec parce que.", "J'ai entre 60 et 80 mots."],
        "Martin Lemeunier est le personnage principal et le narrateur du roman. Il a quatorze ans et il habite au Domaine de Sans-Souci, près de Paris. Son père est neurochirurgien et sa mère est directrice artistique. Son grand frère, Brice, fait une école de cinéma. Avant, Martin avait des copains et il jouait au tennis. Maintenant, il n'a plus d'amis. Martin est loyal, parce qu'il croit à l'innocence de son frère."),
    },
    {
      id: "F3-L4", numero: 4, titre: "Le résumé", semaines: "7–11", chapitres: "Le reste du roman",
      sous: "Des résumés de chapitres de plus en plus longs, jusqu'à l'examen.",
      notions: ["F3-072", "F3-073", "F3-081"],
      mots: ["F3-074", "F3-075", "F3-076", "F3-077", "F3-078", "F3-079", "F3-080"],
      grammaire: ["LF3-RESUME"],
      evaluation: "F3-EV-RESUME",
      carnet: carnet(
        "Résumez les deux derniers chapitres lus (80 à 130 mots), au présent, à la troisième personne, sans dialogue ni avis. Comptez vos mots.",
        ["Je réponds aux cinq questions.", "J'écris au présent, à la troisième personne.", "J'utilise au moins quatre connecteurs.", "J'ai entre 80 et 130 mots, et j'ai relu ma check-list."],
        "Exemple pour le chapitre 1 (40 mots) : Dans le premier chapitre du roman « Frères de sang » de Mikaël Ollivier, la famille Lemeunier dîne quand des policiers sonnent à la porte. Ils soupçonnent Brice, dix-neuf ans, d'avoir tué cinq personnes et l'emmènent. La mère pleure, le père appelle l'avocat. — Pour deux chapitres, ajoutez les étapes suivantes avec ensuite, mais, alors, finalement."),
    },
  ],
};
