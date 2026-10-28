import React, { useState } from "react";
import { INTERVALLES } from "../lib/leitner.js";

/* L'aide. À la première connexion : trois écrans courts, un message chacun.
   Ensuite, depuis la barre du bas : la légende du plan et les questions
   fréquentes, repliées. */

const ECRANS = [
  {
    titre: "Une séance par jour",
    texte: (
      <>
        Touchez <strong>Séance du jour</strong> : 12 questions, environ cinq minutes. Elle mélange ce qu'il
        faut revoir aujourd'hui et la suite de votre unité. Revenir chaque jour compte plus que travailler
        longtemps : un jour oublié par semaine ne casse pas la série.
      </>
    ),
    dessin: "trajet",
  },
  {
    titre: "Votre saison est une ligne de métro",
    texte: (
      <>
        Chaque semestre est une <strong>saison</strong>. Ses stations sont les <strong>unités</strong> du
        cours, deux semaines chacune : découvrir, s'entraîner, grammaire, tournures, phrases et textes,
        puis le <strong>défi</strong>, qui finit par un petit texte que votre enseignant lit. En
        correspondance, la <strong>ligne de lecture</strong> suit le livre lu en classe, avec un carnet de
        lecture à chaque station.
      </>
    ),
    dessin: "ligne",
  },
  {
    titre: "Les mots reviennent au bon moment",
    texte: (
      <>
        Une bonne réponse espace la prochaine question ; une erreur fait revenir le mot dès la séance
        suivante. Un mot est <strong>su</strong> après cinq bonnes réponses à des jours différents. Votre
        code remplace nom et mot de passe : avec lui, vous retrouvez tout sur vos autres appareils.
      </>
    ),
    dessin: "intervalles",
  },
];

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

export default function Aide({ premiere = false, onFin, onInstaller }) {
  const [n, setN] = useState(0);

  if (premiere) {
    const e = ECRANS[n];
    const dernier = n === ECRANS.length - 1;
    return (
      <div className="main wrap" style={{ maxWidth: 560 }}>
        <ol className="aidePas" aria-label={`Écran ${n + 1} sur ${ECRANS.length}`}>
          {ECRANS.map((_, i) => <li key={i} className={i <= n ? "on" : ""} />)}
        </ol>
        <div className="aideEcran apparait" key={n}>
          <div className="plaque" style={{ marginBottom: 18 }}>
            <span className="plaqueNom">{e.titre}</span>
          </div>
          <Dessin type={e.dessin} />
          <p className="aideTexte">{e.texte}</p>
        </div>
        <div className="aideBoutons">
          {n > 0 && <button className="btn2" onClick={() => setN(n - 1)}>Retour</button>}
          <button className="btn" onClick={() => (dernier ? onFin() : setN(n + 1))}>
            {dernier ? "C'est parti" : "Suivant"}
          </button>
        </div>
        {!dernier && (
          <button className="lienTexte" style={{ marginTop: 16, fontSize: 13 }} onClick={onFin}>Passer</button>
        )}
      </div>
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
        <div><dt><span className="rond" style={{ width: 26, height: 26, fontSize: 13 }}>1</span></dt><dd>Le numéro de la saison (le semestre).</dd></div>
      </dl>

      <h2 className="planTitre">Questions fréquentes</h2>
      <div className="faq">
        <details>
          <summary>Les accents comptent-ils ?</summary>
          <p>
            En saison 1, une réponse sans accent est « presque juste ». À partir de la saison 2, un accent
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
          <summary>Qui voit mes résultats ?</summary>
          <p>
            Vous et votre enseignant. Il n'y a aucun classement ; l'objectif de classe ne montre qu'un total.
          </p>
        </details>
      </div>

      {onInstaller && (
        <button className="btn2" style={{ marginTop: 22 }} onClick={onInstaller}>
          Mettre l'application sur mon écran d'accueil
        </button>
      )}
    </div>
  );
}
