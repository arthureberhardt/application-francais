import React from "react";

/* Page d'aide.

   Le public est constitué d'élèves de français langue étrangère : en début
   de cursus, ils sont en A2. Tous les textes de l'application, celui-ci
   compris, sont écrits à ce niveau — phrases courtes, présent, vocabulaire
   concret, une idée par phrase. */

const SECTIONS = [
  {
    titre: "À quoi sert cette application ?",
    texte: [
      "Elle vous aide à apprendre les mots et les verbes du cours de français.",
      "Vous répondez à des questions. L'application corrige tout de suite et vous montre la bonne réponse.",
      "Elle retient ce que vous savez déjà et ce que vous devez encore travailler.",
    ],
  },
  {
    titre: "Votre code",
    texte: [
      "Votre enseignant vous donne un code, par exemple OB-3A-07.",
      "Ce code garde vos résultats. Il n'y a ni nom, ni adresse, ni mot de passe.",
      "Utilisez toujours le même code, sur l'ordinateur comme sur le téléphone.",
      "Choisissez aussi votre classe : Gymnase ou FMS. Le programme n'est pas le même.",
    ],
  },
  {
    titre: "Les trois couleurs",
    couleurs: true,
    texte: [
      "Chaque mot a une couleur. Elle montre où vous en êtes avec ce mot.",
    ],
  },
  {
    titre: "Pourquoi revenir plus tard ?",
    boites: true,
    texte: [
      "Chaque mot est rangé dans une boîte, de 1 à 7.",
      "Bonne réponse : le mot monte d'une boîte. Faute : il retourne dans la boîte 1.",
      "Plus la boîte est haute, plus le mot attend longtemps avant de revenir.",
      "À partir de la boîte 5, le mot compte comme « parfaitement connu ». Il continue quand même à revenir, mais de plus en plus rarement.",
      "C'est le plus important : répéter cinq fois le même jour ne sert à rien. Il faut revenir demain, puis dans trois jours, puis dans une semaine.",
      "Cinq minutes chaque jour valent mieux qu'une heure le dimanche.",
    ],
  },
  {
    titre: "Les exercices",
    liste: [
      ["Les mots", "Vous apprenez les mots du semestre. Vous pouvez choisir un seul thème."],
      ["Les verbes", "Vous conjuguez les verbes aux temps que vous avez appris."],
      ["Tout revoir", "Un mélange de mots et de verbes, de ce semestre et des semestres avant."],
      ["Mots difficiles", "Les mots où vous faites souvent des fautes. Ici, on vous montre d'abord la réponse."],
      ["Pour aller plus loin", "Des mots en plus. Il suffit de les comprendre, pas de les écrire."],
      ["Exercices spéciaux", "Conjuguer un verbe dans une phrase, le genre des noms (« le » ou « la » ?), les prépositions, les synonymes, les contraires, les familles de mots."],
      ["Dictée", "Vous écoutez le mot et vous l'écrivez. Utile pour entendre la différence entre « le vent » et « le vin »."],
      ["Examen blanc", "Un vrai test, chronométré, sans aide. Il ne change pas vos résultats : il vous dit seulement où vous en êtes."],
    ],
  },
  {
    titre: "Quand suis-je prêt pour le test ?",
    texte: [
      "En haut de l'écran, vous voyez un pourcentage.",
      "Il compte les mots et les verbes que vous connaissez parfaitement.",
      "À partir de 85 %, vous êtes prêt.",
      "Attention : les mots de « Pour aller plus loin » ne comptent pas dans ce pourcentage.",
      "Pour être sûr, faites un examen blanc : là, vous n'avez aucune aide, comme le jour du test.",
    ],
  },
  {
    titre: "Écrire les accents",
    texte: [
      "Sous la case de réponse, il y a une petite barre avec les accents : é è ê à ç ô î û ë ï.",
      "Cliquez sur une lettre pour l'écrire. C'est plus rapide que le clavier, surtout sur téléphone.",
    ],
  },
  {
    titre: "Écouter les mots",
    texte: [
      "Le petit haut-parleur lit le mot ou la phrase à voix haute.",
      "Dans la correction, vous pouvez écouter la bonne réponse et l'exemple.",
      "Le son vient de votre appareil. Il fonctionne très bien sur iPhone et sur Mac.",
    ],
  },
  {
    titre: "Les fautes d'accent",
    texte: [
      "Si vous oubliez seulement un accent, la réponse compte comme juste.",
      "L'application écrit alors « Attention à l'accent » et vous montre la bonne forme.",
      "L'article ne compte jamais comme une faute : « das Fenster » et « Fenster » sont tous les deux justes.",
      "Les lettres en trop sont barrées en rouge. Les accents oubliés sont en orange.",
    ],
  },
  {
    titre: "Sur le téléphone",
    texte: [
      "Ouvrez l'adresse dans votre navigateur.",
      "Sur iPhone : bouton Partager, puis « Sur l'écran d'accueil ».",
      "Sur Android : menu, puis « Ajouter à l'écran d'accueil ».",
      "L'application s'ouvre alors en grand, comme une vraie application.",
    ],
  },
];

const COULEURS = [
  ["#CBD2DC", "non connu", "Vous n'avez pas encore trouvé la bonne réponse."],
  ["var(--ambre)", "vu", "Vous avez déjà trouvé au moins une fois. Continuez."],
  ["var(--vert)", "parfaitement connu", "Cinq bonnes réponses, à des jours différents. Le mot est appris."],
];

export default function Aide({ onFin }) {
  return (
    <>
      <div className="bar">
        <div className="wrap barIn">
          <button className="lien" onClick={onFin}>← Retour</button>
          <span className="sur">aide</span>
          <span style={{ width: 60 }} />
        </div>
      </div>

      <div className="main wrap">
        <h1 className="dsp" style={{ fontSize: 30, marginBottom: 8 }}>
          Comment ça marche ?
        </h1>
        <p className="note" style={{ marginBottom: 26 }}>
          Prenez deux minutes pour lire cette page. Vous gagnerez beaucoup de temps ensuite.
        </p>

        {SECTIONS.map((s, i) => (
          <div key={s.titre} className="aideBloc" style={{ animationDelay: `${i * 40}ms` }}>
            <h2 className="h2" style={{ marginBottom: 9 }}>{s.titre}</h2>

            {s.texte && s.texte.map((t, k) => (
              <p key={k} className="aideP">{t}</p>
            ))}

            {s.couleurs && (
              <div style={{ display: "grid", gap: 9, marginTop: 12 }}>
                {COULEURS.map(([c, nom, explication]) => (
                  <div key={nom} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                    <span className="pastille" style={{ background: c, marginTop: 6 }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{nom}</div>
                      <div className="note" style={{ fontSize: 13 }}>{explication}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {s.boites && (
              <div className="aideBoites">
                {[["1", "demain"], ["2", "demain"], ["3", "3 jours"],
                  ["4", "7 jours"], ["5", "21 jours"], ["6", "2 mois"],
                  ["7", "5 mois"]].map(([n, quand]) => (
                  <div key={n} className="aideBoite">
                    <div className="boiteN">{n}</div>
                    <div className="boiteL">{quand}</div>
                  </div>
                ))}
              </div>
            )}

            {s.liste && (
              <div style={{ display: "grid", gap: 11, marginTop: 10 }}>
                {s.liste.map(([nom, explication]) => (
                  <div key={nom}>
                    <div style={{ fontWeight: 700, fontSize: 14.5 }}>{nom}</div>
                    <div className="note" style={{ fontSize: 13.5 }}>{explication}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <button className="btn" style={{ marginTop: 8 }} onClick={onFin}>
          J'ai compris
        </button>
      </div>
    </>
  );
}
