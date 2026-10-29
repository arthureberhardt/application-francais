/* FMS : compléments pour qu'aucune étape n'ait moins de dix éléments. */
const T = (fr, de, situation, trou) => ({ fr, de, situation, trou });
const P = (de, fr, aussi = []) => ({ de, fr, aussi });
const M = (fr, de, cat, exemple) => ({ fr, de, cat, exemple });

export default {
  /* ─── S1 ─── */
  "F1-U0": { phrases: [P("Mein Lieblingstag ist der Freitag.", "Mon jour préféré, c'est le vendredi.", ["Mon jour préféré est le vendredi."])] },
  "F1-U1": { tournures: [
    T("Je suis en première année à l'ECG.", "Ich bin im ersten Jahr an der FMS.", "Vous vous présentez.", "année"),
    T("Tu as des frères et sœurs ?", "Hast du Geschwister?", "Vous interviewez un camarade.", "frères"),
  ] },
  "F1-U2": { tournures: [
    T("Je ne prends jamais de petit-déjeuner.", "Ich frühstücke nie.", "Vous parlez de vos habitudes.", "jamais"),
    T("Le mercredi après-midi, je suis libre.", "Am Mittwochnachmittag habe ich frei.", "Vous parlez de votre horaire.", "libre"),
  ] },
  "F1-U3": { tournures: [
    T("Il y a beaucoup de lumière.", "Es gibt viel Licht.", "Vous décrivez une pièce.", "lumière"),
    T("Je n'ai pas de bureau dans ma chambre.", "Ich habe keinen Schreibtisch in meinem Zimmer.", "Vous décrivez ce qui manque.", "bureau"),
  ] },
  "F1-U4": { tournures: [
    T("C'est la deuxième rue à droite.", "Es ist die zweite Strasse rechts.", "Vous expliquez le chemin.", "deuxième"),
    T("Vous ne pouvez pas vous tromper.", "Sie können sich nicht verirren.", "Vous rassurez quelqu'un.", "tromper"),
  ] },
  "F1-U5": { tournures: [
    T("Il me faut aussi un litre de lait.", "Ich brauche auch einen Liter Milch.", "Vous complétez vos achats.", "litre"),
    T("Ça fait combien en tout ?", "Wie viel macht das insgesamt?", "Vous payez au marché.", "tout"),
  ] },
  "F1-U6": { tournures: [
    T("Je vais au cinéma une fois par mois.", "Ich gehe einmal pro Monat ins Kino.", "Vous parlez de vos sorties.", "mois"),
    T("Le dimanche, je ne fais rien.", "Am Sonntag mache ich nichts.", "Vous parlez du week-end.", "rien"),
  ] },
  "F1-L1": {
    tournures: [
      T("Max et Lucie sont deux amis curieux.", "Max und Lucie sind zwei neugierige Freunde.", "Vous présentez les héros.", "curieux"),
      T("Qui a envoyé ce message ?", "Wer hat diese Nachricht geschickt?", "Vous posez une question sur l'histoire.", "envoyé"),
    ],
    phrases: [
      P("Sie öffnen den Umschlag zusammen.", "Ils ouvrent l'enveloppe ensemble."),
      P("Die Geschichte beginnt in einer Schule.", "L'histoire commence dans une école."),
    ],
  },
  "F1-L2": {
    tournures: [
      T("Ils traversent la ville en métro.", "Sie durchqueren die Stadt mit der Metro.", "Vous racontez le trajet.", "traversent"),
      T("Cet indice les mène au cimetière.", "Dieser Hinweis führt sie zum Friedhof.", "Vous suivez l'enquête.", "mène"),
    ],
    phrases: [
      P("Sie gehen über eine Brücke über die Seine.", "Ils traversent un pont sur la Seine."),
      P("Sie zeigen das Foto einem Polizisten.", "Ils montrent la photo à un policier."),
    ],
  },
  "F1-L3": {
    tournures: [
      T("Il dit qu'il était à la maison.", "Er sagt, dass er zu Hause war.", "Vous rapportez un alibi.", "maison"),
      T("Je pense qu'elle dit la vérité.", "Ich denke, dass sie die Wahrheit sagt.", "Vous donnez votre avis.", "vérité"),
    ],
    phrases: [
      P("Der Mann im Mantel verfolgt sie.", "L'homme au manteau les suit."),
      P("Lucie glaubt ihm nicht.", "Lucie ne le croit pas."),
    ],
  },
  "F1-L4": {
    mots: [M("deviner", "erraten", "V", "Je n'ai pas deviné qui était le coupable.")],
    tournures: [
      T("Je n'ai pas deviné la fin.", "Ich habe das Ende nicht erraten.", "Vous réagissez à la fin.", "deviné"),
      T("C'est un livre facile à lire.", "Es ist ein leicht zu lesendes Buch.", "Vous donnez votre avis.", "facile"),
    ],
    phrases: [P("Max und Lucie lösen das Rätsel.", "Max et Lucie résolvent l'énigme.")],
  },
  /* ─── S2 ─── */
  "F2-U0": { phrases: [
    P("Unsere Lehrerin ist streng, aber gerecht.", "Notre professeure est stricte, mais juste.", ["Notre enseignante est stricte, mais juste."]),
    P("Seine Freunde sind sehr nett.", "Ses amis sont très gentils."),
  ] },
  "F2-U1": { tournures: [
    T("Je me prépare en dix minutes.", "Ich mache mich in zehn Minuten bereit.", "Vous parlez de votre matin.", "prépare"),
    T("Le soir, je me détends devant une série.", "Am Abend entspanne ich mich bei einer Serie.", "Vous parlez de votre soirée.", "détends"),
  ] },
  "F2-U2": { tournures: [
    T("Nous sommes partis tôt le matin.", "Wir sind früh am Morgen losgefahren.", "Vous racontez une sortie.", "partis"),
    T("Ce n'était pas une bonne idée !", "Das war keine gute Idee!", "Vous jugez une sortie.", "idée"),
  ] },
  "F2-U3": { tournures: [
    T("Ma grand-mère me racontait des histoires.", "Meine Grossmutter erzählte mir Geschichten.", "Vous racontez une habitude.", "racontait"),
    T("J'étais un enfant très timide.", "Ich war ein sehr schüchternes Kind.", "Vous vous décrivez enfant.", "timide"),
  ] },
  "F2-U4": { tournures: [
    T("J'ai besoin d'un certificat médical.", "Ich brauche ein Arztzeugnis.", "Vous êtes chez le médecin.", "certificat"),
    T("Je m'entraîne trois fois par semaine.", "Ich trainiere dreimal pro Woche.", "Vous parlez de votre sport.", "entraîne"),
  ] },
  "F2-U5": { tournures: [
    T("Elle est moins chère que l'autre.", "Sie ist weniger teuer als die andere.", "Vous comparez des prix.", "moins"),
    T("Je la prends en bleu.", "Ich nehme sie in Blau.", "Vous choisissez une couleur.", "bleu"),
  ] },
  "F2-U6": { tournures: [
    T("Le rendez-vous est à la gare à 7 h 45.", "Treffpunkt ist um 7.45 Uhr am Bahnhof.", "Vous organisez le départ.", "rendez-vous"),
    T("Nous avons décidé de visiter Fribourg.", "Wir haben beschlossen, Freiburg zu besuchen.", "Vous présentez votre choix.", "décidé"),
  ] },
  "F2-L1": {
    mots: [M("le personnage principal", "die Hauptfigur", "N", "Le personnage principal est une petite fille.")],
    tournures: [
      T("L'histoire est très courte : trois pages.", "Die Geschichte ist sehr kurz: drei Seiten.", "Vous présentez le texte.", "courte"),
      T("Le problème arrive quand…", "Das Problem kommt, als…", "Vous expliquez le problème.", "arrive"),
    ],
    phrases: [
      P("Der Titel macht neugierig.", "Le titre rend curieux."),
      P("Wer ist die Hauptfigur?", "Qui est le personnage principal ?"),
    ],
  },
  "F2-L2": {
    mots: [
      M("courageux, courageuse", "mutig", "A", "L'héroïne est très courageuse."),
      M("le défaut", "der Fehler, die Schwäche", "N", "Son grand défaut, c'est l'orgueil."),
    ],
    tournures: [
      T("Son plus grand défaut, c'est…", "Ihre grösste Schwäche ist…", "Vous décrivez un personnage.", "défaut"),
      T("Il veut prouver qu'il est capable.", "Er will beweisen, dass er fähig ist.", "Vous expliquez sa motivation.", "prouver"),
    ],
    phrases: [
      P("Die Heldin hat keine Angst.", "L'héroïne n'a pas peur."),
      P("Er ist eifersüchtig auf seinen Bruder.", "Il est jaloux de son frère."),
    ],
  },
  "F2-L3": {
    mots: [
      M("ce jour-là", "an diesem Tag", "L", "Ce jour-là, il pleuvait très fort."),
      M("ensuite", "danach", "C", "Ensuite, elle est sortie dans la rue."),
    ],
    tournures: [
      T("Ensuite, tout est allé très vite.", "Danach ging alles sehr schnell.", "Vous racontez la suite.", "vite"),
      T("Personne ne savait ce qui allait arriver.", "Niemand wusste, was passieren würde.", "Vous créez du suspense.", "arriver"),
    ],
    phrases: [P("Der Hund bellte die ganze Nacht.", "Le chien aboyait toute la nuit.")],
  },
  "F2-L4": {
    mots: [
      M("la fin heureuse", "das Happy End", "N", "Je préfère les histoires avec une fin heureuse."),
      M("la fin triste", "das traurige Ende", "N", "La fin triste m'a fait pleurer."),
    ],
    tournures: [
      T("Dans ma version, le héros rentre chez lui.", "In meiner Version kehrt der Held nach Hause zurück.", "Vous présentez votre fin.", "rentre"),
      T("J'ai choisi une fin ouverte.", "Ich habe ein offenes Ende gewählt.", "Vous expliquez votre choix.", "ouverte"),
    ],
    phrases: [
      P("Am Ende sind alle glücklich.", "À la fin, tout le monde est heureux."),
      P("Ich habe ein anderes Ende erfunden.", "J'ai inventé une autre fin."),
    ],
  },
  /* ─── S3 ─── */
  "F3-U0": { phrases: [
    P("Er hat ihr geholfen.", "Il l'a aidée."),
    P("Wir haben ihnen ein Geschenk gegeben.", "Nous leur avons donné un cadeau.", ["On leur a donné un cadeau."]),
  ] },
  "F3-U1": { tournures: [
    T("Pour devenir infirmier, il faut faire une formation de trois ans.", "Um Pfleger zu werden, muss man eine dreijährige Ausbildung machen.", "Vous parlez de la formation.", "devenir"),
    T("J'aimerais travailler avec des personnes âgées.", "Ich würde gerne mit älteren Menschen arbeiten.", "Vous parlez de vos souhaits.", "âgées"),
  ] },
  "F3-U2": { tournures: [
    T("Je commence mon stage lundi prochain.", "Ich beginne mein Praktikum nächsten Montag.", "Vous parlez de votre stage.", "commence"),
    T("On m'a confié des tâches variées.", "Man hat mir verschiedene Aufgaben anvertraut.", "Vous racontez votre stage.", "confié"),
  ] },
  "F3-U3": { tournures: [
    T("Il en faut deux cuillères à soupe.", "Man braucht zwei Esslöffel davon.", "Vous donnez une quantité.", "cuillères"),
    T("C'est prêt dans dix minutes !", "In zehn Minuten ist es fertig!", "Vous annoncez le repas.", "prêt"),
  ] },
  "F3-U4": { tournures: [
    T("Il vaut mieux manger des fruits que des bonbons.", "Es ist besser, Früchte statt Süssigkeiten zu essen.", "Vous donnez un conseil.", "mieux"),
    T("Je fais du yoga pour me détendre.", "Ich mache Yoga, um mich zu entspannen.", "Vous parlez de votre bien-être.", "yoga"),
  ] },
  "F3-U5": { tournures: [
    T("Je vous rappelle dès que possible.", "Ich rufe Sie so bald wie möglich zurück.", "Vous répondez au téléphone.", "rappelle"),
    T("Pouvez-vous confirmer par mail ?", "Können Sie per Mail bestätigen?", "Vous demandez une confirmation.", "confirmer"),
  ] },
  "F3-U6": { tournures: [
    T("Je ferai tout pour réussir.", "Ich werde alles tun, um es zu schaffen.", "Vous êtes motivé(e).", "réussir"),
    T("Si ça ne marche pas, j'essaierai autre chose.", "Wenn es nicht klappt, versuche ich etwas anderes.", "Vous avez un plan B.", "essaierai"),
  ] },
  /* ─── S4 ─── */
  "F4-U1": { tournures: [
    T("C'est la ville où je suis né(e).", "Das ist die Stadt, in der ich geboren bin.", "Vous parlez de vos origines.", "né"),
    T("On y parle aussi une langue locale.", "Man spricht dort auch eine lokale Sprache.", "Vous présentez les langues.", "locale"),
  ] },
  "F4-U2": { tournures: [
    T("Je lui ai envoyé le lien.", "Ich habe ihm/ihr den Link geschickt.", "Vous partagez une info.", "lien"),
    T("Je ne leur réponds jamais.", "Ich antworte ihnen nie.", "Vous parlez des messages inconnus.", "réponds"),
  ] },
  "F4-U3": { tournures: [
    T("Au centre du tableau, il y a…", "In der Mitte des Bildes gibt es…", "Vous décrivez une œuvre.", "centre"),
    T("Travaillez lentement et calmement.", "Arbeitet langsam und ruhig.", "Vous animez un atelier.", "calmement"),
  ] },
  "F4-U4": { tournures: [
    T("Si j'avais plus de temps, je ferais du théâtre.", "Wenn ich mehr Zeit hätte, würde ich Theater spielen.", "Vous imaginez.", "temps"),
    T("À ta place, je n'hésiterais pas.", "An deiner Stelle würde ich nicht zögern.", "Vous conseillez.", "hésiterais"),
  ] },
  "F4-U5": { tournures: [
    T("Je n'en parle plus.", "Ich spreche nicht mehr davon.", "Vous fermez un sujet.", "parle"),
    T("J'y pense tous les jours.", "Ich denke jeden Tag daran.", "Vous parlez d'un souci.", "pense"),
  ] },
  "F4-U6": { tournures: [
    T("Certains pensent que c'est inutile.", "Einige denken, dass es nutzlos ist.", "Vous présentez un avis contraire.", "inutile"),
    T("Il est temps d'agir.", "Es ist Zeit zu handeln.", "Vous appelez à agir.", "agir"),
  ] },
  "F4-L1": {
    mots: [
      M("l'auteur francophone, l'autrice francophone", "der frankophone Autor, die frankophone Autorin", "N", "Nous lisons une autrice francophone du Québec."),
      M("le passage préféré", "die Lieblingsstelle", "N", "Chacun lit son passage préféré au club."),
    ],
    tournures: [
      T("Le livre a été écrit en français par une autrice sénégalaise.", "Das Buch wurde von einer senegalesischen Autorin auf Französisch geschrieben.", "Vous présentez l'autrice.", "sénégalaise"),
      T("Mon passage préféré est à la page…", "Meine Lieblingsstelle ist auf Seite…", "Vous partagez un passage.", "passage"),
    ],
    phrases: [
      P("Wir lesen jede Woche zwei Kapitel.", "Nous lisons deux chapitres chaque semaine.", ["On lit deux chapitres chaque semaine."]),
      P("Der Anfang ist ein bisschen langsam.", "Le début est un peu lent."),
    ],
  },
  "F4-L2": {
    tournures: [
      T("Il pense souvent à son village.", "Er denkt oft an sein Dorf.", "Vous parlez des souvenirs.", "village"),
      T("Elle se sent étrangère dans son propre pays.", "Sie fühlt sich fremd im eigenen Land.", "Vous parlez d'identité.", "étrangère"),
    ],
    phrases: [
      P("Sie vermisst ihre Grossmutter.", "Sa grand-mère lui manque."),
      P("Er spricht zwei Sprachen zu Hause.", "Il parle deux langues à la maison."),
    ],
  },
  "F4-L3": {
    mots: [M("citer", "zitieren", "V", "Je cite une phrase du chapitre 5.")],
    tournures: [
      T("Je trouve cette scène injuste.", "Ich finde diese Szene ungerecht.", "Vous réagissez.", "injuste"),
      T("Cette phrase m'a touché(e).", "Dieser Satz hat mich berührt.", "Vous parlez d'une citation.", "touché"),
    ],
    phrases: [
      P("Die Lehrerin verteidigt die neue Schülerin.", "La professeure défend la nouvelle élève.", ["L'enseignante défend la nouvelle élève."]),
      P("Diese Szene zeigt Rassismus.", "Cette scène montre le racisme."),
    ],
  },
  "F4-L4": {
    mots: [
      M("le bilan du club", "die Bilanz des Clubs", "N", "Le bilan du club est très positif."),
      M("convaincre", "überzeugen", "V", "Elle a convaincu tout le groupe."),
    ],
    tournures: [
      T("Tu m'as convaincu(e).", "Du hast mich überzeugt.", "Vous changez d'avis.", "convaincu"),
      T("Nous sommes tous d'accord sur un point.", "Wir sind uns in einem Punkt alle einig.", "Vous faites le bilan.", "point"),
    ],
    phrases: [P("Ich würde dieses Buch weiterempfehlen.", "Je recommanderais ce livre.")],
  },
  /* ─── S5 ─── */
  "F5-U1": { tournures: [
    T("Je vais vous expliquer le traitement.", "Ich werde Ihnen die Behandlung erklären.", "Vous informez un patient.", "expliquer"),
    T("Il a demandé quand il pourrait rentrer.", "Er hat gefragt, wann er nach Hause gehen könne.", "Vous rapportez une question.", "quand"),
  ] },
  "F5-U2": { tournures: [
    T("On range ensemble ?", "Räumen wir zusammen auf?", "Vous motivez des enfants.", "range"),
    T("Il est interdit de sortir seul.", "Es ist verboten, allein hinauszugehen.", "Vous rappelez une règle.", "interdit"),
  ] },
  "F5-U3": { tournures: [
    T("Le voleur avait préparé son coup.", "Der Dieb hatte seine Tat vorbereitet.", "Vous racontez un fait divers.", "préparé"),
    T("La victime est sortie indemne.", "Das Opfer blieb unverletzt.", "Vous rassurez.", "indemne"),
  ] },
  "F5-U4": { tournures: [
    T("Le parc sera rénové l'année prochaine.", "Der Park wird nächstes Jahr renoviert.", "Vous annoncez un projet.", "rénové"),
    T("Les habitants ont été consultés.", "Die Bewohner wurden befragt.", "Vous parlez de participation.", "consultés"),
  ] },
  "F5-U5": { tournures: [
    T("Elle a avoué qu'elle avait des complexes.", "Sie hat zugegeben, dass sie Komplexe hatte.", "Vous rapportez un témoignage.", "avoué"),
    T("Il a ajouté qu'il se sentait mieux.", "Er hat hinzugefügt, dass er sich besser fühle.", "Vous rapportez des paroles.", "ajouté"),
  ] },
  "F5-U6": { tournures: [
    T("D'une part…, d'autre part…", "Einerseits…, andererseits…", "Vous organisez vos arguments.", "part"),
    T("Cet argument ne tient pas.", "Dieses Argument hält nicht stand.", "Vous réfutez.", "tient"),
  ] },
  "F5-L1": {
    mots: [M("le grand ensemble", "die Grosssiedlung", "N", "Il habite dans un grand ensemble des années 1970.")],
    tournures: [
      T("Le héros a seize ans et vit dans une tour.", "Der Held ist sechzehn und lebt in einem Hochhaus.", "Vous présentez le héros.", "tour"),
      T("La langue du livre est très orale.", "Die Sprache des Buches ist sehr mündlich.", "Vous parlez du style.", "orale"),
    ],
    phrases: [
      P("Seine Mutter arbeitet nachts.", "Sa mère travaille la nuit."),
      P("Er träumt davon, die Siedlung zu verlassen.", "Il rêve de quitter la cité."),
    ],
  },
  "F5-L2": {
    tournures: [
      T("Les voisins s'entraident.", "Die Nachbarn helfen sich gegenseitig.", "Vous décrivez la solidarité.", "entraident"),
      T("Le quartier a mauvaise réputation.", "Das Quartier hat einen schlechten Ruf.", "Vous parlez de l'image du quartier.", "réputation"),
    ],
    phrases: [P("Viele Familien kommen aus Afrika.", "Beaucoup de familles viennent d'Afrique.")],
  },
  "F5-L3": {
    tournures: [
      T("Il a été arrêté devant ses amis.", "Er wurde vor seinen Freunden festgenommen.", "Vous racontez une scène.", "arrêté"),
      T("La justice semble injuste ici.", "Die Justiz scheint hier ungerecht.", "Vous jugez une scène.", "justice"),
    ],
    phrases: [
      P("Er hat nichts gestohlen.", "Il n'a rien volé."),
      P("Seine Mutter weint im Polizeiposten.", "Sa mère pleure au commissariat."),
    ],
  },
  "F5-L4": {
    mots: [M("l'image (f.) de la banlieue", "das Bild der Vorstadt", "N", "Les médias donnent souvent une mauvaise image de la banlieue.")],
    tournures: [
      T("Les médias montrent seulement les problèmes.", "Die Medien zeigen nur die Probleme.", "Vous critiquez les médias.", "médias"),
      T("Ce livre m'a fait changer d'avis.", "Dieses Buch hat meine Meinung geändert.", "Vous faites le bilan.", "changer"),
    ],
    phrases: [
      P("Die Schule kann Chancen geben.", "L'école peut donner des chances."),
      P("Er hat sein Diplom trotz allem geschafft.", "Il a réussi son diplôme malgré tout."),
    ],
  },
  /* ─── S6 ─── */
  "F6-U1": { tournures: [
    T("Je souhaite que chacun trouve sa place.", "Ich wünsche, dass jeder seinen Platz findet.", "Vous parlez d'inclusion.", "place"),
    T("Il faut que nous agissions ensemble.", "Wir müssen zusammen handeln.", "Vous appelez à agir.", "agissions"),
  ] },
  "F6-U2": { tournures: [
    T("Je voudrais que vous échangiez ce produit.", "Ich möchte, dass Sie dieses Produkt umtauschen.", "Vous réclamez.", "échangiez"),
    T("J'ai gardé le ticket de caisse.", "Ich habe den Kassenzettel aufbewahrt.", "Vous prouvez votre achat.", "ticket"),
  ] },
  "F6-U3": { tournures: [
    T("Je suis désolé(e) que tu sois triste.", "Es tut mir leid, dass du traurig bist.", "Vous consolez quelqu'un.", "désolé"),
    T("Ça me fait plaisir que tu viennes.", "Es freut mich, dass du kommst.", "Vous exprimez votre joie.", "plaisir"),
  ] },
  "F6-U4": { tournures: [
    T("Je souligne les mots-clés.", "Ich unterstreiche die Schlüsselwörter.", "Vous appliquez une stratégie.", "souligne"),
    T("Le texte compare deux points de vue.", "Der Text vergleicht zwei Standpunkte.", "Vous résumez un texte.", "compare"),
  ] },
  "F6-U5": { tournures: [
    T("Pendant l'écoute, je note les chiffres.", "Während des Hörens notiere ich die Zahlen.", "Vous appliquez une stratégie.", "chiffres"),
    T("Je garde dix minutes pour relire.", "Ich behalte zehn Minuten zum Durchlesen.", "Vous gérez votre temps.", "relire"),
  ] },
  "F6-U6": { tournures: [
    T("Je vais vous présenter le roman…", "Ich werde Ihnen den Roman… vorstellen.", "Vous commencez l'oral.", "présenter"),
    T("Pour finir, je dirai que…", "Zum Schluss möchte ich sagen, dass…", "Vous concluez.", "finir"),
  ] },
  "F6-L1": {
    mots: [
      M("l'éditeur, l'éditrice", "der Verlag, der Verleger", "N", "L'éditeur a publié ce roman en 2018."),
      M("emprunter (un livre)", "(ein Buch) ausleihen", "L", "J'ai emprunté ce livre à la bibliothèque."),
    ],
    tournures: [
      T("J'ai trouvé ce livre à la bibliothèque.", "Ich habe dieses Buch in der Bibliothek gefunden.", "Vous expliquez votre choix.", "bibliothèque"),
      T("Ce roman a reçu un prix.", "Dieser Roman hat einen Preis erhalten.", "Vous présentez le livre.", "prix"),
    ],
    phrases: [
      P("Das Buch hat 220 Seiten.", "Le livre a 220 pages."),
      P("Ich habe dieses Buch wegen des Covers gewählt.", "J'ai choisi ce livre à cause de la couverture."),
    ],
  },
  "F6-L2": {
    mots: [
      M("l'étape (f.) importante", "der wichtige Schritt", "N", "Je garde seulement les étapes importantes."),
      M("au fil des pages", "im Laufe der Seiten", "L", "Au fil des pages, le héros change."),
    ],
    tournures: [
      T("Au fil des pages, le héros change.", "Im Laufe der Seiten verändert sich der Held.", "Vous résumez l'évolution.", "pages"),
      T("Je résume l'histoire en dix phrases.", "Ich fasse die Geschichte in zehn Sätzen zusammen.", "Vous expliquez votre méthode.", "dix"),
    ],
    phrases: [P("Das Buch erzählt zehn Jahre seines Lebens.", "Le livre raconte dix ans de sa vie.")],
  },
  "F6-L3": {
    mots: [
      M("situer un extrait", "einen Auszug einordnen", "L", "D'abord, je situe l'extrait dans le livre."),
      M("lire avec expression", "ausdrucksvoll lesen", "L", "Je lis l'extrait avec expression."),
    ],
    tournures: [
      T("Je vais maintenant lire l'extrait.", "Ich lese jetzt den Auszug.", "Vous passez à la lecture.", "lire"),
      T("Ce passage est le plus émouvant du livre.", "Diese Stelle ist die berührendste des Buches.", "Vous justifiez votre choix.", "émouvant"),
    ],
    phrases: [
      P("Die Erzählerin spricht mit ihrem Vater.", "La narratrice parle avec son père."),
      P("Dieser Satz zeigt ihre Einsamkeit.", "Cette phrase montre sa solitude."),
    ],
  },
  "F6-L4": {
    mots: [
      M("justifier sa réponse", "seine Antwort begründen", "L", "Il faut toujours justifier sa réponse."),
      M("la question personnelle", "die persönliche Frage", "N", "À la fin, l'examinateur pose une question personnelle."),
    ],
    tournures: [
      T("Je n'ai pas bien compris la question.", "Ich habe die Frage nicht gut verstanden.", "Vous demandez de répéter.", "compris"),
      T("Pour moi, le personnage le plus intéressant est…", "Für mich ist die interessanteste Figur…", "Vous répondez à une question.", "intéressant"),
    ],
    phrases: [
      P("Ich würde dieses Buch meinen Freunden empfehlen.", "Je recommanderais ce livre à mes amis."),
      P("Die Prüfung dauert fünfzehn Minuten.", "L'examen dure quinze minutes."),
    ],
  },
};
