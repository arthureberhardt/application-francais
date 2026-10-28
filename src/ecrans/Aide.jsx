import React, { useState } from "react";
import { INTERVALLES } from "../lib/leitner.js";

/* L'aide. À la première connexion : trois écrans courts, un message chacun.
   Ensuite, depuis la barre du bas : la légende du plan et les questions
   fréquentes, repliées. */

/* Le message d'accueil existe en français et en allemand : il doit être
   compris dès le premier jour, avant que le français le permette. */
const ECRANS = [
  {
    dessin: "trajet",
    fr: {
      titre: "Une séance par jour",
      texte: (
        <>
          Touchez <strong>Séance du jour</strong> : 12 questions, environ cinq minutes. Elle mélange ce qu'il
          faut revoir aujourd'hui et la suite de votre unité. Revenir chaque jour compte plus que travailler
          longtemps : un jour oublié par semaine ne casse pas la série.
        </>
      ),
    },
    de: {
      titre: "Eine Lektion pro Tag",
      texte: (
        <>
          Tippen Sie auf <strong>Séance du jour</strong>: 12 Fragen, etwa fünf Minuten. Die Lektion mischt, was
          Sie heute wiederholen sollten, mit dem nächsten Teil Ihrer Unité. Jeden Tag ein bisschen bringt mehr
          als selten lange: Ein vergessener Tag pro Woche unterbricht Ihre Serie nicht.
        </>
      ),
    },
  },
  {
    dessin: "ligne",
    fr: {
      titre: "Votre semestre est une ligne de métro",
      texte: (
        <>
          Chaque <strong>semestre</strong> est une ligne. Ses stations sont les <strong>unités</strong> du
          cours, deux semaines chacune : découvrir, s'entraîner, grammaire, tournures, phrases et textes,
          puis le <strong>défi</strong>, qui finit par un petit texte que votre enseignant lit. En
          correspondance, la <strong>ligne de lecture</strong> suit le livre lu en classe, avec un carnet de
          lecture à chaque station.
        </>
      ),
    },
    de: {
      titre: "Ihr Semester ist eine Metrolinie",
      texte: (
        <>
          Jedes <strong>Semester</strong> ist eine Linie. Ihre Stationen sind die <strong>Unités</strong> des
          Unterrichts, je zwei Wochen: entdecken, üben, Grammatik, Wendungen, Sätze und Texte, dann der
          {" "}<strong>Défi</strong>, ein kurzer Test mit einem kleinen Text, den Ihre Lehrperson liest. Als
          Umsteigelinie folgt die <strong>Leselinie</strong> dem Buch, das in der Klasse gelesen wird, mit
          einem Lesejournal an jeder Station.
        </>
      ),
    },
  },
  {
    dessin: "intervalles",
    fr: {
      titre: "Les mots reviennent au bon moment",
      texte: (
        <>
          Une bonne réponse espace la prochaine question ; une erreur fait revenir le mot dès la séance
          suivante. Un mot est <strong>su</strong> après cinq bonnes réponses à des jours différents. Votre
          code remplace nom et mot de passe : avec lui, vous retrouvez tout sur vos autres appareils.
        </>
      ),
    },
    de: {
      titre: "Die Wörter kommen im richtigen Moment zurück",
      texte: (
        <>
          Nach einer richtigen Antwort dauert es länger, bis die Frage wiederkommt; nach einem Fehler kommt
          das Wort schon in der nächsten Lektion zurück. Ein Wort gilt als <strong>gelernt</strong> nach fünf
          richtigen Antworten an verschiedenen Tagen. Ihr Code ersetzt Name und Passwort: Damit finden Sie
          alles auf Ihren anderen Geräten wieder.
        </>
      ),
    },
  },
];

const BOUTONS = {
  fr: { retour: "Retour", suivant: "Suivant", parti: "C'est parti", passer: "Passer l'introduction", ecran: "Écran" },
  de: { retour: "Zurück", suivant: "Weiter", parti: "Los geht's", passer: "Einführung überspringen", ecran: "Seite" },
};

function Dessin({ type }) {
  if (type === "intervalles") {
    return (
      <div className="aideIntervalles" aria-hidden="true">
        {INTERVALLES.slice(2).map((j, i) => (
          <span key={i}>{j <= 1 ? "1 j" : j < 30 ? `${j} j` : `${Math.round(j / 30)} mois`}</span>
        ))}
      </div>
    );
  }
  if (type === "trajet") {
    return (
      <ol className="trajet" aria-hidden="true" style={{ margin: "4px 0 16px" }}>
        {Array.from({ length: 12 }, (_, i) => <li key={i} className={i < 5 ? "passee" : i === 5 ? "ici" : ""}><span /></li>)}
      </ol>
    );
  }
  return (
    <svg className="aidePlan" viewBox="0 0 320 96" aria-hidden="true">
      <line x1="20" y1="34" x2="300" y2="34" stroke="var(--ligne)" strokeWidth="8" strokeLinecap="round" />
      {[20, 76, 132, 188, 244, 300].map((x, i) => (
        <circle key={x} cx={x} cy="34" r={i === 2 ? 9 : 7} fill={i < 2 ? "var(--encre)" : "#fff"} stroke="var(--encre)" strokeWidth={i === 2 ? 5 : 4} />
      ))}
      <line x1="132" y1="34" x2="132" y2="78" stroke="var(--encre)" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="104" y1="78" x2="244" y2="78" stroke="var(--ligne)" strokeWidth="5" strokeLinecap="round" fill="none" opacity=".55" />
      {[104, 174, 244].map((x) => <rect key={x} x={x - 6} y="72" width="12" height="12" rx="3" fill="#fff" stroke="var(--encre)" strokeWidth="3" />)}
    </svg>
  );
}

export default function Aide({ premiere = false, onFin, onInstaller, onQuitter, code }) {
  const [n, setN] = useState(0);
  const [intro, setIntro] = useState(premiere);
  const [langue, setLangue] = useState(() => {
    try { return localStorage.getItem("fle:langueIntro") || "fr"; } catch { return "fr"; }
  });
  const choisirLangue = (l) => { setLangue(l); try { localStorage.setItem("fle:langueIntro", l); } catch {} };
  const finIntro = () => { setN(0); if (premiere) onFin(); else setIntro(false); };

  if (intro) {
    const e = ECRANS[n][langue];
    const t = BOUTONS[langue];
    const dernier = n === ECRANS.length - 1;
    return (
      <>
        <header className="mur aideMur">
          <div className="wrap" style={{ maxWidth: 560 }}>
            <div className="langue" role="group" aria-label="Langue / Sprache">
              {[["fr", "Français"], ["de", "Deutsch"]].map(([l, nom]) => (
                <button key={l} className={langue === l ? "on" : ""} aria-pressed={langue === l}
                  lang={l} onClick={() => choisirLangue(l)}>{nom}</button>
              ))}
            </div>
            <ol className="aidePas" aria-label={`${t.ecran} ${n + 1} / ${ECRANS.length}`}>
              {ECRANS.map((_, i) => <li key={i} className={i <= n ? "on" : ""} />)}
            </ol>
            <div className="plaque apparait" key={n + langue}>
              <span className="plaqueNom" lang={langue}>{e.titre}</span>
            </div>
          </div>
        </header>
        <div className="main wrap" style={{ maxWidth: 560 }}>
          <div className="apparait" key={n + langue}>
            <Dessin type={ECRANS[n].dessin} />
            <p className="aideTexte" lang={langue}>{e.texte}</p>
          </div>
          <div className="aideBoutons">
            {n > 0 && <button className="btn2" onClick={() => setN(n - 1)}>{t.retour}</button>}
            <button className="btn" onClick={() => (dernier ? finIntro() : setN(n + 1))}>
              {dernier ? t.parti : t.suivant}
            </button>
          </div>
          {!dernier && (
            <button className="lienTexte" style={{ marginTop: 18, fontSize: 14 }} onClick={finIntro}>{t.passer}</button>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="main wrap avecNav" style={{ maxWidth: 620 }}>
      <h1 className="pageTitre">Aide</h1>

      <h2 className="planTitre" style={{ marginTop: 8 }}>Lire le plan</h2>
      <dl className="legendePlan">
        <div><dt><span className="lp lpVide" /></dt><dd>Une unité à faire. Deux semaines, sept étapes.</dd></div>
        <div><dt><span className="lp lpIci" /></dt><dd>L'unité en cours : la séance du jour y puise la nouveauté.</dd></div>
        <div><dt><span className="lp lpPlein" /></dt><dd>Une unité validée : défi réussi à 70 % au moins.</dd></div>
        <div><dt><span className="lp lpTiret" /></dt><dd>Une unité facultative, pour reprendre les bases.</dd></div>
        <div><dt><span className="lp lpCarre" /></dt><dd>Une station de lecture : des mots du livre et un carnet à envoyer.</dd></div>
        <div><dt><span className="rond" style={{ width: 26, height: 26, fontSize: 13 }}>1</span></dt><dd>Le numéro du semestre.</dd></div>
      </dl>

      <h2 className="planTitre">Questions fréquentes</h2>
      <div className="faq">
        <details>
          <summary>Les accents comptent-ils ?</summary>
          <p>
            Au semestre 1, une réponse sans accent est « presque juste ». À partir du semestre 2, un accent
            oublié est une faute. Une barre sous chaque case permet d'écrire é, è, ê, à, ç… en un clic.
          </p>
        </details>
        <details>
          <summary>Ma réponse est juste, mais l'application dit faux.</summary>
          <p>
            Il existe souvent plusieurs bonnes réponses. Touchez « devrait être accepté » sous la correction :
            votre enseignant le verra et pourra l'ajouter pour tout le monde.
          </p>
        </details>
        <details>
          <summary>Que contient « Préparer l'évaluation » ?</summary>
          <p>
            Ce qui sera évalué, un exemple réussi et commenté, les tournures utiles, et un entraînement que
            vous pouvez envoyer à votre enseignant avant l'évaluation.
          </p>
        </details>
        <details>
          <summary>Pourquoi une date sous certaines stations ?</summary>
          <p>
            Votre enseignant fixe la date à laquelle une unité ou un carnet de lecture devrait être fait. Ce
            n'est pas une note : c'est un repère pour ne pas prendre de retard.
          </p>
        </details>
        <details>
          <summary>Dois-je entrer mon code à chaque fois ?</summary>
          <p>
            Non : l'application garde votre code sur cet appareil et s'ouvre directement. Sur un appareil
            partagé, utilisez « Changer de code » ci-dessous en partant.
          </p>
        </details>
        <details>
          <summary>Qui voit mes résultats ?</summary>
          <p>
            Vous et votre enseignant. Il n'y a aucun classement ; l'objectif de classe ne montre qu'un total.
          </p>
        </details>
      </div>

      <h2 className="planTitre">L'application</h2>
      <div style={{ display: "grid", gap: 8 }}>
        <button className="btn2 large" onClick={() => setIntro(true)}>
          Revoir l'introduction <span lang="de" className="note">(auch auf Deutsch)</span>
        </button>
        {onInstaller && (
          <button className="btn2 large" onClick={onInstaller}>Mettre l'application sur l'écran d'accueil</button>
        )}
        {onQuitter && (
          <button className="btn2 large" onClick={onQuitter}>
            Changer de code{code ? <span className="note"> (actuellement {code})</span> : null}
          </button>
        )}
      </div>
    </div>
  );
}
