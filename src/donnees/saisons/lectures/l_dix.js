/* Compléments pour qu'aucune étape n'ait moins de dix éléments
   (tournures, phrases, mots des stations de lecture). */
import { T, P, M } from "./aides.js";

export default {
  "S1-U0": {
    phrases: [
      P("Wie spät ist es? — Es ist halb neun.", "Quelle heure est-il ? — Il est huit heures et demie.", ["Il est quelle heure ? — Il est huit heures et demie."]),
      P("Mein Bruder ist nicht gross, er ist klein.", "Mon frère n'est pas grand, il est petit."),
    ],
  },
  "S1-L1": {
    tournures: [
      T("Le roman commence par une scène de crime.", "Der Roman beginnt mit einer Tatortszene.", "Vous décrivez le début.", "commence"),
      T("J'ai lu les deux premiers chapitres.", "Ich habe die ersten zwei Kapitel gelesen.", "Vous dites où vous en êtes.", "chapitres"),
    ],
    phrases: [
      P("Der Kommissar raucht Pfeife.", "Le commissaire fume la pipe."),
      P("Die Geschichte spielt im Winter in Paris.", "L'histoire se passe en hiver à Paris.", ["L'histoire se passe à Paris en hiver."]),
    ],
  },
  "S1-L2": {
    tournures: [
      T("Le témoin hésite avant de répondre.", "Der Zeuge zögert, bevor er antwortet.", "Vous décrivez un interrogatoire.", "hésite"),
      T("Qu'est-ce que vous faisiez hier soir ?", "Was haben Sie gestern Abend gemacht?", "Le commissaire interroge un témoin.", "faisiez"),
    ],
    phrases: [
      P("Die Concierge kennt alle Mieter.", "La concierge connaît tous les locataires."),
      P("Maigret glaubt dem Zeugen nicht.", "Maigret ne croit pas le témoin."),
    ],
  },
  "S1-L3": {
    tournures: [
      T("Il était où au moment du crime ?", "Wo war er zur Tatzeit?", "Vous vérifiez un alibi.", "moment"),
      T("Personne ne peut confirmer son alibi.", "Niemand kann sein Alibi bestätigen.", "Vous doutez d'un suspect.", "confirmer"),
    ],
    phrases: [
      P("Der Neffe braucht Geld.", "Le neveu a besoin d'argent."),
      P("Niemand hat sie gesehen.", "Personne ne l'a vue.", ["Personne ne l'a vu."]),
    ],
  },
  "S1-L4": {
    tournures: [
      T("Tout à coup, Maigret comprend.", "Plötzlich versteht Maigret.", "Vous racontez un moment clé.", "comprend"),
      T("Cette piste ne mène nulle part.", "Diese Spur führt nirgendwohin.", "Vous parlez d'une fausse piste.", "nulle"),
    ],
    phrases: [
      P("Der Kommissar findet einen Brief im Zimmer.", "Le commissaire trouve une lettre dans la chambre."),
      P("Ich weiss noch nicht, wer der Täter ist.", "Je ne sais pas encore qui est le coupable."),
    ],
  },
  "S1-L5": {
    tournures: [
      T("Le coupable est la personne la moins suspecte.", "Der Täter ist die am wenigsten verdächtige Person.", "Vous parlez de la fin.", "suspecte"),
      T("En résumé, c'est l'histoire d'un crime à Paris.", "Zusammengefasst ist es die Geschichte eines Verbrechens in Paris.", "Vous résumez le roman.", "résumé"),
    ],
    phrases: [
      P("Am Ende gesteht der Mörder alles.", "À la fin, le meurtrier avoue tout."),
      P("Ich habe das Ende nicht erraten.", "Je n'ai pas deviné la fin."),
    ],
  },
  "S2-L1": {
    mots: [M("le séjour à l'étranger", "der Auslandaufenthalt", "N", "Son séjour à l'étranger dure une année.")],
    tournures: [
      T("Elle fait sa valise la veille du départ.", "Sie packt ihren Koffer am Abend vor der Abreise.", "Vous racontez le départ.", "valise"),
      T("Au moment de partir, elle a pleuré.", "Im Moment der Abfahrt hat sie geweint.", "Vous décrivez une émotion.", "pleuré"),
    ],
    phrases: [
      P("Ihre Mutter hat sie zum Flughafen gebracht.", "Sa mère l'a emmenée à l'aéroport.", ["Sa mère l'a accompagnée à l'aéroport."]),
      P("Sie hatte Angst, aber sie war auch neugierig.", "Elle avait peur, mais elle était aussi curieuse."),
    ],
  },
  "S2-L2": {
    mots: [
      M("dépaysant, dépaysante", "fremd, ungewohnt", "A", "Les premiers jours sont très dépaysants."),
      M("la langue locale", "die Landessprache", "N", "Elle ne comprend pas encore la langue locale."),
    ],
    tournures: [
      T("Les gens parlaient très vite.", "Die Leute sprachen sehr schnell.", "Vous décrivez une difficulté.", "vite"),
      T("Elle regardait tout avec curiosité.", "Sie betrachtete alles mit Neugier.", "Vous décrivez l'héroïne.", "curiosité"),
    ],
    phrases: [
      P("Die Strassen waren eng und laut.", "Les rues étaient étroites et bruyantes."),
      P("Sie hat zum ersten Mal Schnee gesehen.", "Elle a vu la neige pour la première fois."),
    ],
  },
  "S2-L3": {
    mots: [
      M("se sentir seul, seule", "sich einsam fühlen", "L", "Le soir, elle se sent seule dans sa chambre."),
      M("le conflit", "der Konflikt", "N", "Le conflit avec sa famille d'accueil grandit."),
    ],
    tournures: [
      T("Elle n'osait pas parler en classe.", "Sie traute sich nicht, in der Klasse zu sprechen.", "Vous décrivez une difficulté.", "osait"),
      T("Personne ne la comprenait.", "Niemand verstand sie.", "Vous décrivez la solitude.", "comprenait"),
    ],
    phrases: [
      P("Sie hat ihre Mutter jeden Abend angerufen.", "Elle a appelé sa mère tous les soirs."),
      P("Er hat ihr nie gesagt, dass er traurig war.", "Il ne lui a jamais dit qu'il était triste."),
    ],
  },
  "S2-L4": {
    mots: [
      M("la rencontre", "die Begegnung", "N", "Cette rencontre change tout."),
      M("se lier d'amitié avec", "sich anfreunden mit", "L", "Elle se lie d'amitié avec sa voisine."),
    ],
    tournures: [
      T("Ils se sont rencontrés à la cantine.", "Sie haben sich in der Mensa kennengelernt.", "Vous racontez une rencontre.", "rencontrés"),
      T("Grâce à lui, elle a retrouvé le sourire.", "Dank ihm hat sie wieder gelächelt.", "Vous parlez d'une amitié.", "sourire"),
    ],
    phrases: [
      P("Sie sind jeden Tag zusammen zur Schule gegangen.", "Ils allaient tous les jours ensemble à l'école.", ["Ils sont allés à l'école ensemble tous les jours."]),
      P("Er hat ihr die Stadt gezeigt.", "Il lui a montré la ville."),
    ],
  },
  "S2-L5": {
    tournures: [
      T("À ce moment-là, tout a basculé.", "In diesem Moment hat sich alles verändert.", "Vous parlez du tournant.", "basculé"),
      T("Elle a pris une grande décision.", "Sie hat eine grosse Entscheidung getroffen.", "Vous racontez un choix.", "décision"),
    ],
    phrases: [
      P("Plötzlich hat sie die Wahrheit verstanden.", "Tout à coup, elle a compris la vérité.", ["Soudain, elle a compris la vérité."]),
      P("Er hatte den Brief nie abgeschickt.", "Il n'avait jamais envoyé la lettre."),
    ],
  },
  "S2-L6": {
    mots: [
      M("le bilan", "die Bilanz", "N", "À la fin, elle fait le bilan de son année."),
      M("changer de regard", "seine Sichtweise ändern", "L", "Pendant ce séjour, elle a changé de regard sur sa famille."),
    ],
    tournures: [
      T("Elle n'est plus la même qu'au début.", "Sie ist nicht mehr dieselbe wie am Anfang.", "Vous parlez de l'évolution.", "même"),
      T("Si j'étais elle, je serais restée.", "Wenn ich sie wäre, wäre ich geblieben.", "Vous donnez votre avis sur la fin.", "restée"),
    ],
    phrases: [
      P("Sie hat am Flughafen ihre Freunde umarmt.", "Elle a serré ses amis dans ses bras à l'aéroport."),
      P("Dieses Jahr hat ihr Leben verändert.", "Cette année a changé sa vie."),
    ],
  },
  "S3-L1": {
    mots: [
      M("le cadre (d'une histoire)", "der Rahmen, der Schauplatz", "N", "Le cadre du roman est un village au bord de la mer."),
      M("concerner", "betreffen", "V", "Ce problème nous concerne tous."),
    ],
    tournures: [
      T("Le roman se passe de nos jours.", "Der Roman spielt in der heutigen Zeit.", "Vous présentez le cadre.", "jours"),
      T("Je pense que l'histoire finira mal.", "Ich denke, dass die Geschichte schlecht enden wird.", "Vous faites une hypothèse.", "finira"),
    ],
    phrases: [
      P("Das Buch erzählt die Geschichte einer jungen Aktivistin.", "Le livre raconte l'histoire d'une jeune militante."),
      P("Ich habe dieses Buch gewählt, weil mich das Thema interessiert.", "J'ai choisi ce livre parce que le sujet m'intéresse."),
    ],
  },
  "S3-L2": {
    mots: [
      M("hésiter entre", "schwanken zwischen", "L", "Elle hésite entre son rêve et sa famille."),
      M("s'opposer à", "sich widersetzen", "L", "Le père s'oppose à ce projet."),
    ],
    tournures: [
      T("Elle ferait mieux de dire la vérité.", "Sie sollte besser die Wahrheit sagen.", "Vous conseillez un personnage.", "mieux"),
      T("Son choix me paraît courageux.", "Seine Wahl scheint mir mutig.", "Vous jugez un choix.", "courageux"),
    ],
    phrases: [
      P("Er würde gern bleiben, aber er muss gehen.", "Il aimerait rester, mais il doit partir."),
      P("Was würdest du an ihrer Stelle tun?", "Que ferais-tu à sa place ?", ["Qu'est-ce que tu ferais à sa place ?"]),
    ],
  },
  "S3-L3": {
    mots: [
      M("l'échange (m.) de répliques", "der Wortwechsel", "N", "L'échange de répliques est très rapide."),
      M("le ton", "der Ton(fall)", "N", "Le ton devient agressif."),
    ],
    tournures: [
      T("Elle répond sur un ton ironique.", "Sie antwortet in ironischem Ton.", "Vous analysez une réplique.", "ironique"),
      T("Le silence en dit long.", "Das Schweigen sagt viel.", "Vous commentez une pause.", "silence"),
    ],
    phrases: [
      P("Die Mutter unterbricht ihre Tochter.", "La mère interrompt sa fille."),
      P("Am Ende der Szene geht er wortlos hinaus.", "À la fin de la scène, il sort sans un mot.", ["À la fin de la scène, il sort sans rien dire."]),
    ],
  },
  "S3-L4": {
    mots: [
      M("alerter l'opinion", "die Öffentlichkeit aufrütteln", "L", "Ce livre veut alerter l'opinion sur le climat."),
      M("l'indifférence (f.) générale", "die allgemeine Gleichgültigkeit", "N", "L'auteur critique l'indifférence générale."),
    ],
    tournures: [
      T("Ce message est encore actuel aujourd'hui.", "Diese Botschaft ist heute noch aktuell.", "Vous jugez le message.", "actuel"),
      T("Le livre nous pousse à agir.", "Das Buch bewegt uns zum Handeln.", "Vous parlez de l'effet du livre.", "pousse"),
    ],
    phrases: [
      P("Die Autorin will uns zum Nachdenken bringen.", "L'autrice veut nous faire réfléchir.", ["L'auteure veut nous faire réfléchir."]),
      P("Ich bin nur teilweise einverstanden.", "Je ne suis d'accord qu'en partie.", ["Je suis d'accord en partie."]),
    ],
  },
  "S3-L5": {
    mots: [
      M("captiver", "fesseln", "V", "L'histoire m'a captivé du début à la fin."),
      M("conseiller un livre", "ein Buch empfehlen", "L", "Je conseille ce livre à tous ceux qui aiment les débats."),
    ],
    tournures: [
      T("Je l'ai lu d'une traite.", "Ich habe es in einem Zug gelesen.", "Vous dites que le livre est captivant.", "traite"),
      T("Il manque un peu de suspense.", "Es fehlt ein bisschen Spannung.", "Vous critiquez le livre.", "manque"),
    ],
    phrases: [
      P("Ich würde diesem Buch vier Sterne geben.", "Je donnerais quatre étoiles à ce livre."),
      P("Die Figuren sind glaubwürdig.", "Les personnages sont crédibles."),
    ],
  },
  "S4-L1": {
    mots: [
      M("se réunir", "sich treffen, zusammenkommen", "V", "Le club se réunit le jeudi."),
      M("le chapitre d'ouverture", "das Eröffnungskapitel", "N", "Le chapitre d'ouverture présente le quartier."),
    ],
    tournures: [
      T("Je suis chargé(e) de résumer le chapitre.", "Ich bin beauftragt, das Kapitel zusammenzufassen.", "Vous expliquez votre rôle.", "chargé"),
      T("J'ai noté trois mots difficiles.", "Ich habe drei schwierige Wörter notiert.", "Vous êtes chercheur de mots.", "noté"),
    ],
    phrases: [
      P("Jede Person hat eine Rolle im Club.", "Chaque personne a un rôle dans le club."),
      P("Der Anfang des Buches hat mich überrascht.", "Le début du livre m'a surpris.", ["Le début du livre m'a surprise."]),
    ],
  },
  "S4-L2": {
    mots: [
      M("l'appartenance (f.)", "die Zugehörigkeit", "N", "La question de l'appartenance traverse le roman."),
      M("la langue maternelle", "die Muttersprache", "N", "Sa langue maternelle est le wolof."),
    ],
    tournures: [
      T("Il ne sait plus d'où il vient.", "Er weiss nicht mehr, woher er kommt.", "Vous parlez d'identité.", "vient"),
      T("Elle parle français à l'école et arabe à la maison.", "Sie spricht in der Schule Französisch und zu Hause Arabisch.", "Vous décrivez la double culture.", "maison"),
    ],
    phrases: [
      P("Er fühlt sich weder hier noch dort zu Hause.", "Il ne se sent chez lui ni ici ni là-bas."),
      P("Ihre Grossmutter erzählt ihr von ihrem Land.", "Sa grand-mère lui parle de son pays."),
    ],
  },
  "S4-L3": {
    mots: [
      M("le narrateur-personnage", "die Erzählerfigur", "N", "Le narrateur-personnage raconte ses propres souvenirs."),
      M("s'adresser au lecteur", "sich an den Leser wenden", "L", "Le narrateur s'adresse au lecteur dès la première page."),
    ],
    tournures: [
      T("On découvre ses pensées les plus secrètes.", "Man entdeckt seine geheimsten Gedanken.", "Vous parlez du narrateur interne.", "pensées"),
      T("Ce point de vue est limité.", "Diese Perspektive ist beschränkt.", "Vous analysez la focalisation.", "limité"),
    ],
    phrases: [
      P("Der Erzähler erzählt in der Ich-Form.", "Le narrateur raconte à la première personne."),
      P("Wir wissen nicht, was die anderen denken.", "Nous ne savons pas ce que pensent les autres.", ["On ne sait pas ce que pensent les autres."]),
    ],
  },
  "S4-L4": {
    mots: [
      M("le préjugé tenace", "das hartnäckige Vorurteil", "N", "Ce préjugé tenace blesse le héros."),
      M("se révolter", "sich auflehnen", "V", "À la fin de la scène, il se révolte."),
    ],
    tournures: [
      T("Personne ne prend sa défense.", "Niemand verteidigt ihn.", "Vous décrivez une injustice.", "défense"),
      T("Cette scène m'a mis(e) en colère.", "Diese Szene hat mich wütend gemacht.", "Vous réagissez.", "colère"),
    ],
    phrases: [
      P("Er wird ohne Grund kontrolliert.", "Il est contrôlé sans raison."),
      P("Diese Ungerechtigkeit ist schwer zu ertragen.", "Cette injustice est difficile à supporter."),
    ],
  },
  "S4-L5": {
    mots: [
      M("argumenter", "argumentieren", "V", "Chacun doit argumenter avec des exemples du livre."),
      M("la conclusion du club", "das Fazit des Clubs", "N", "La conclusion du club est plutôt positive."),
    ],
    tournures: [
      T("Je partage ton avis.", "Ich teile deine Meinung.", "Vous êtes d'accord.", "partage"),
      T("Ce que tu dis me fait changer d'avis.", "Was du sagst, lässt mich meine Meinung ändern.", "Vous changez d'avis.", "avis"),
    ],
    phrases: [
      P("Kannst du ein Beispiel geben?", "Tu peux donner un exemple ?", ["Est-ce que tu peux donner un exemple ?"]),
      P("Wir sind uns über das Ende nicht einig.", "Nous ne sommes pas d'accord sur la fin.", ["On n'est pas d'accord sur la fin."]),
    ],
  },
  "S5-L1": {
    mots: [
      M("la première phrase", "der erste Satz", "N", "La première phrase est devenue célèbre."),
      M("donner le ton", "den Ton angeben", "L", "La première phrase donne le ton du roman."),
    ],
    tournures: [
      T("Le lecteur est plongé directement dans l'action.", "Der Leser wird direkt in die Handlung geworfen.", "Vous analysez l'incipit.", "plongé"),
      T("Cet incipit crée un effet d'étrangeté.", "Dieser Romananfang erzeugt eine Wirkung der Fremdheit.", "Vous nommez un effet.", "étrangeté"),
    ],
    phrases: [
      P("Der Erzähler erwähnt den Tod seiner Mutter ohne Gefühle.", "Le narrateur évoque la mort de sa mère sans émotion."),
      P("Wir wissen noch nicht, wer erzählt.", "Nous ne savons pas encore qui raconte.", ["On ne sait pas encore qui raconte."]),
    ],
  },
  "S5-L2": {
    mots: [
      M("l'étrangeté (f.)", "die Fremdheit", "N", "Son étrangeté choque les autres personnages."),
      M("le refus des conventions", "die Ablehnung der Konventionen", "N", "Son refus des conventions le rend suspect."),
    ],
    tournures: [
      T("Il dit toujours ce qu'il pense.", "Er sagt immer, was er denkt.", "Vous décrivez sa sincérité.", "pense"),
      T("Son comportement choque la société.", "Sein Verhalten schockiert die Gesellschaft.", "Vous expliquez le conflit.", "choque"),
    ],
    phrases: [
      P("Er hat am Begräbnis nicht geweint.", "Il n'a pas pleuré à l'enterrement."),
      P("Die Geschworenen verurteilen ihn wegen seiner Gleichgültigkeit.", "Les jurés le condamnent à cause de son indifférence."),
    ],
  },
  "S5-L3": {
    mots: [
      M("l'effet (m.) de sens", "die Bedeutungswirkung", "N", "Chaque procédé produit un effet de sens."),
      M("connoter", "mitbedeuten", "V", "Le mot « soleil » connote ici la violence."),
    ],
    tournures: [
      T("Ce procédé renforce l'impression de…", "Dieses Stilmittel verstärkt den Eindruck von…", "Vous analysez un effet.", "renforce"),
      T("Le rythme s'accélère.", "Der Rhythmus beschleunigt sich.", "Vous analysez le style.", "accélère"),
    ],
    phrases: [
      P("Die Sonne wird zur Bedrohung.", "Le soleil devient une menace."),
      P("Dieses Bild drückt die Einsamkeit aus.", "Cette image exprime la solitude."),
    ],
  },
  "S5-L4": {
    mots: [
      M("la problématique de lecture", "die Leitfrage der Analyse", "N", "La problématique de lecture guide tout le commentaire."),
      M("analyser pas à pas", "Schritt für Schritt analysieren", "L", "Le commentaire linéaire analyse le texte pas à pas."),
    ],
    tournures: [
      T("Ce mouvement va de la ligne 1 à la ligne 8.", "Dieser Abschnitt reicht von Zeile 1 bis Zeile 8.", "Vous délimitez un mouvement.", "mouvement"),
      T("Le verbe « … » montre que…", "Das Verb « … » zeigt, dass…", "Vous analysez un mot.", "verbe"),
    ],
    phrases: [
      P("Im dritten Abschnitt ändert sich der Ton.", "Dans le troisième mouvement, le ton change."),
      P("Ich zitiere den Text, um meine Analyse zu belegen.", "Je cite le texte pour justifier mon analyse."),
    ],
  },
  "S5-L5": {
    mots: [
      M("enfermé, enfermée", "eingeschlossen", "A", "Les trois personnages sont enfermés ensemble."),
      M("l'au-delà (m.)", "das Jenseits", "N", "La pièce se passe dans l'au-delà."),
    ],
    tournures: [
      T("Il n'y a ni fenêtre ni miroir.", "Es gibt weder Fenster noch Spiegel.", "Vous décrivez le décor.", "miroir"),
      T("Ils ne peuvent pas échapper aux autres.", "Sie können den anderen nicht entkommen.", "Vous expliquez le huis clos.", "échapper"),
    ],
    phrases: [
      P("Die Tür öffnet sich, aber niemand geht hinaus.", "La porte s'ouvre, mais personne ne sort."),
      P("Jeder braucht den Blick der anderen.", "Chacun a besoin du regard des autres."),
    ],
  },
  "S6-L1": {
    mots: [
      M("le dénouement inattendu", "die unerwartete Auflösung", "N", "Le dénouement inattendu surprend le lecteur."),
      M("bref, brève", "kurz", "A", "Une nouvelle est un récit bref."),
    ],
    tournures: [
      T("Il faut que je relise la première page.", "Ich muss die erste Seite nochmals lesen.", "Vous comprenez la chute.", "relise"),
      T("Bien que la nouvelle soit courte, elle est dense.", "Obwohl die Novelle kurz ist, ist sie dicht.", "Vous jugez le texte.", "dense"),
    ],
    phrases: [
      P("Ich hätte dieses Ende nicht erwartet.", "Je ne m'attendais pas à cette fin."),
      P("Die Novelle hat nur zwei Figuren.", "La nouvelle n'a que deux personnages."),
    ],
  },
  "S6-L2": {
    mots: [
      M("étrange", "seltsam", "A", "Des choses étranges arrivent la nuit."),
      M("douter", "zweifeln", "V", "Le narrateur doute de sa propre raison."),
    ],
    tournures: [
      T("Je doute que le narrateur soit fou.", "Ich bezweifle, dass der Erzähler verrückt ist.", "Vous donnez votre interprétation.", "doute"),
      T("Le surnaturel entre dans la vie quotidienne.", "Das Übernatürliche dringt in den Alltag ein.", "Vous définissez le fantastique.", "quotidienne"),
    ],
    phrases: [
      P("Der Erzähler hört nachts Schritte.", "Le narrateur entend des pas la nuit."),
      P("Niemand glaubt ihm.", "Personne ne le croit."),
    ],
  },
  "S6-L3": {
    mots: [
      M("le metteur en scène, la metteuse en scène", "der Regisseur, die Regisseurin", "N", "La metteuse en scène a choisi un décor très simple."),
      M("le rideau", "der Vorhang", "N", "Le rideau tombe à la fin de l'acte."),
    ],
    tournures: [
      T("Je voudrais que la scène soit jouée plus lentement.", "Ich möchte, dass die Szene langsamer gespielt wird.", "Vous proposez une mise en scène.", "lentement"),
      T("Le spectateur rit, mais le personnage souffre.", "Der Zuschauer lacht, aber die Figur leidet.", "Vous analysez la double énonciation.", "souffre"),
    ],
    phrases: [
      P("Die Szene endet mit einem Streit.", "La scène se termine par une dispute."),
      P("Der Diener versteckt sich hinter dem Vorhang.", "Le valet se cache derrière le rideau."),
    ],
  },
  "S6-L4": {
    mots: [
      M("l'espace (m.) privé", "der private Raum", "N", "Dans ce roman, l'espace privé n'existe plus."),
      M("observer", "beobachten", "V", "Les voisins observent tout."),
    ],
    tournures: [
      T("Il est inquiétant que tout le monde accepte ce contrôle.", "Es ist beunruhigend, dass alle diese Kontrolle akzeptieren.", "Vous réagissez.", "inquiétant"),
      T("Ce monde ressemble au nôtre.", "Diese Welt ähnelt der unseren.", "Vous comparez avec aujourd'hui.", "ressemble"),
    ],
    phrases: [
      P("Niemand hat etwas zu verbergen, sagen sie.", "Personne n'a rien à cacher, disent-ils."),
      P("Ich möchte nicht, dass alle mein Leben sehen.", "Je ne veux pas que tout le monde voie ma vie."),
    ],
  },
  "S6-L5": {
    mots: [
      M("le rapprochement", "die Annäherung, der Vergleich", "N", "Le rapprochement des deux œuvres est intéressant."),
      M("opposer", "gegenüberstellen", "V", "On peut opposer les deux héros."),
    ],
    tournures: [
      T("Bien que les époques soient différentes, le thème est le même.", "Obwohl die Epochen verschieden sind, ist das Thema dasselbe.", "Vous comparez deux œuvres.", "époques"),
      T("Je préfère la nouvelle, car elle est plus surprenante.", "Ich ziehe die Novelle vor, denn sie ist überraschender.", "Vous défendez un choix.", "surprenante"),
    ],
    phrases: [
      P("Beide Werke handeln von der Angst.", "Les deux œuvres parlent de la peur.", ["Les deux œuvres traitent de la peur."]),
      P("Im Gegensatz zum Roman ist das Stück komisch.", "Contrairement au roman, la pièce est comique."),
    ],
  },
  "S7-L1": {
    mots: [
      M("le voyage initiatique", "die Initiationsreise", "N", "Candide fait un voyage initiatique."),
      M("la naïveté", "die Naivität", "N", "La naïveté de Candide fait sourire le lecteur."),
    ],
    tournures: [
      T("Candide apprend peu à peu à penser par lui-même.", "Candide lernt nach und nach, selbst zu denken.", "Vous parlez de l'évolution du héros.", "lui-même"),
      T("Le conte se moque de la philosophie de Leibniz.", "Die Erzählung macht sich über Leibniz' Philosophie lustig.", "Vous situez la cible.", "moque"),
    ],
    phrases: [
      P("Candide reist um die ganze Welt.", "Candide voyage dans le monde entier.", ["Candide parcourt le monde entier."]),
      P("Jedes Kapitel bringt ein neues Unglück.", "Chaque chapitre apporte un nouveau malheur."),
    ],
  },
  "S7-L2": {
    mots: [
      M("la cible (de la satire)", "die Zielscheibe (der Satire)", "N", "La cible de la satire, ce sont les philosophes optimistes."),
      M("railler", "verspotten", "V", "Voltaire raille les philosophes optimistes."),
    ],
    tournures: [
      T("Le narrateur feint l'admiration.", "Der Erzähler täuscht Bewunderung vor.", "Vous expliquez l'ironie.", "feint"),
      T("Sous l'humour se cache une critique sévère.", "Hinter dem Humor verbirgt sich eine scharfe Kritik.", "Vous analysez la satire.", "humour"),
    ],
    phrases: [
      P("Der Krieg wird als schönes Schauspiel beschrieben.", "La guerre est décrite comme un beau spectacle."),
      P("Der Leser muss das Gegenteil verstehen.", "Le lecteur doit comprendre le contraire."),
    ],
  },
  "S7-L3": {
    mots: [
      M("la leçon", "die Lehre", "N", "Chaque fable donne une leçon."),
      M("personnifier", "personifizieren", "V", "La Fontaine personnifie les animaux."),
    ],
    tournures: [
      T("Le loup représente le puissant.", "Der Wolf steht für den Mächtigen.", "Vous interprétez une fable.", "représente"),
      T("Cette fable critique la cour du roi.", "Diese Fabel kritisiert den Königshof.", "Vous expliquez la cible.", "cour"),
    ],
    phrases: [
      P("Der Fuchs ist schlauer als der Rabe.", "Le renard est plus rusé que le corbeau."),
      P("Die Moral steht manchmal am Anfang.", "La morale est parfois au début."),
    ],
  },
  "S7-L4": {
    mots: [M("le masque", "die Maske", "N", "Chacun porte un masque dans cette comédie.")],
    tournures: [
      T("Le déguisement permet de découvrir la vérité.", "Die Verkleidung ermöglicht es, die Wahrheit zu entdecken.", "Vous analysez l'intrigue.", "déguisement"),
      T("Les sentiments résistent aux préjugés sociaux.", "Die Gefühle widerstehen den sozialen Vorurteilen.", "Vous interprétez la pièce.", "préjugés"),
    ],
    phrases: [
      P("Dorante verliebt sich in die Dienerin.", "Dorante tombe amoureux de la servante."),
      P("Der Vater weiss alles von Anfang an.", "Le père sait tout depuis le début."),
    ],
  },
  "S7-L5": {
    mots: [
      M("le plan du commentaire", "die Gliederung des Kommentars", "N", "Le plan du commentaire a deux axes."),
      M("la phrase de transition", "der Überleitungssatz", "N", "Une phrase de transition relie les deux axes."),
    ],
    tournures: [
      T("Nous verrons dans un second axe que…", "Wir werden in einem zweiten Teil sehen, dass…", "Vous annoncez le plan.", "axe"),
      T("Cette analyse nous amène à…", "Diese Analyse führt uns zu…", "Vous faites une transition.", "amène"),
    ],
    phrases: [
      P("Im zweiten Teil untersuchen wir die Ironie.", "Dans un second axe, nous étudierons l'ironie."),
      P("Dieses Zitat zeigt die Kritik des Autors.", "Cette citation montre la critique de l'auteur."),
    ],
  },
  "S8-L1": {
    tournures: [
      T("Molière a écrit cette pièce en 1664.", "Molière hat dieses Stück 1664 geschrieben.", "Vous situez l'œuvre.", "écrit"),
      T("Toute la famille parle de Tartuffe avant de le voir.", "Die ganze Familie spricht von Tartuffe, bevor man ihn sieht.", "Vous analysez l'exposition.", "famille"),
    ],
    phrases: [
      P("Die Grossmutter verteidigt Tartuffe.", "La grand-mère défend Tartuffe."),
      P("Die Szene beginnt mit einem Streit.", "La scène commence par une dispute."),
    ],
  },
  "S8-L2": {
    tournures: [
      T("Le rire devient une arme contre l'hypocrisie.", "Das Lachen wird zur Waffe gegen die Heuchelei.", "Vous expliquez la satire.", "arme"),
      T("La scène du placard est un comique de situation.", "Die Szene im Schrank ist Situationskomik.", "Vous nommez un comique.", "placard"),
    ],
    phrases: [
      P("Orgon versteckt sich unter dem Tisch.", "Orgon se cache sous la table."),
      P("Das Publikum lacht über seine Blindheit.", "Le public rit de son aveuglement."),
    ],
  },
  "S8-L3": {
    mots: [M("la bienséance", "der Anstand (Regel des klassischen Theaters)", "N", "La bienséance interdit de montrer la mort sur scène.")],
    tournures: [
      T("La violence n'est pas montrée sur scène.", "Gewalt wird nicht auf der Bühne gezeigt.", "Vous expliquez la bienséance.", "violence"),
      T("Le théâtre classique cherche l'équilibre et la raison.", "Das klassische Theater sucht Gleichgewicht und Vernunft.", "Vous définissez le classicisme.", "équilibre"),
    ],
    phrases: [
      P("Die Handlung dauert einen einzigen Tag.", "L'action dure une seule journée."),
      P("Der König rettet die Familie im letzten Moment.", "Le roi sauve la famille au dernier moment."),
    ],
  },
  "S8-L4": {
    tournures: [
      T("Ces deux œuvres se répondent.", "Diese beiden Werke antworten einander.", "Vous reliez deux œuvres.", "répondent"),
      T("Le thème de l'aveuglement relie Orgon et Candide.", "Das Thema der Verblendung verbindet Orgon und Candide.", "Vous trouvez un point commun.", "aveuglement"),
    ],
    phrases: [
      P("Beide Figuren lassen sich täuschen.", "Les deux personnages se laissent tromper."),
      P("Im Unterschied zu Molière ist Camus nicht komisch.", "À la différence de Molière, Camus n'est pas comique."),
    ],
  },
  "S8-L5": {
    mots: [
      M("la réponse structurée", "die gegliederte Antwort", "N", "Une réponse structurée commence par l'idée principale."),
      M("reformuler la question", "die Frage umformulieren", "L", "Je reformule la question pour être sûr de la comprendre."),
    ],
    tournures: [
      T("Je commence par répondre directement à la question.", "Ich beginne damit, die Frage direkt zu beantworten.", "Vous structurez la réponse.", "directement"),
      T("Pour illustrer, je citerai la ligne 8.", "Zur Veranschaulichung zitiere ich Zeile 8.", "Vous appuyez votre réponse.", "illustrer"),
    ],
    phrases: [
      P("Diese Szene zeigt die Heuchelei Tartuffes.", "Cette scène montre l'hypocrisie de Tartuffe."),
      P("Ich verbinde dieses Werk mit Candide.", "Je relie cette œuvre à Candide.", ["Je mets cette œuvre en relation avec Candide."]),
    ],
  },
};
