import React from "react";
import { INTERVALLES } from "../lib/leitner.js";

/* L'aide : courte, dans l'ordre où l'élève en a besoin. Le premier écran
   (montré à la première connexion) tient en quatre blocs ; le reste est
   replié, pour qui se pose la question. */
export default function Aide({ premiere = false, onFin, onInstaller }) {
  return (
    <div className="main wrap avecNav" style={{ maxWidth: 620 }}>
      <h1 className="pageTitre">{premiere ? "Bienvenue" : "Aide"}</h1>
      <p className="uniteSous">
        Cette application vous fait travailler le vocabulaire, les verbes et les phrases du cours de
        français, un peu chaque jour.
      </p>

      <ol className="aideBlocs">
        <li>
          <h2>Une séance par jour</h2>
          <p>
            Ouvrez l'application et touchez <strong>Séance du jour</strong> : 12 questions, environ cinq
            minutes. Elle mélange ce qu'il faut revoir aujourd'hui et la suite de votre unité.
            Revenir chaque jour compte plus que travailler longtemps.
          </p>
        </li>
        <li>
          <h2>Une saison, des unités</h2>
          <p>
            Chaque semestre est une <strong>saison</strong>, dessinée comme une ligne de métro. Chaque
            station est une <strong>unité</strong> qui suit le cours, en six étapes : découvrir les mots,
            s'entraîner, la grammaire, les tournures, construire des phrases, puis le <strong>défi</strong>.
            Le défi se termine par un petit texte que votre enseignant lit et commente.
          </p>
        </li>
        <li>
          <h2>Les mots reviennent au bon moment</h2>
          <p>
            Une bonne réponse espace la prochaine question : demain, puis dans 3 jours, 7 jours, 3 semaines,
            2 mois, 5 mois. Une erreur fait revenir le mot dès la séance suivante. Un mot est <strong>su</strong> après cinq bonnes
            réponses à des jours différents : répéter cinq fois le même soir ne suffit pas.
          </p>
          <div className="aideIntervalles" aria-hidden="true">
            {INTERVALLES.slice(2).map((j, i) => (
              <span key={i}>{j <= 1 ? "1 j" : j < 30 ? `${j} j` : `${Math.round(j / 30)} mois`}</span>
            ))}
          </div>
        </li>
        <li>
          <h2>Votre code</h2>
          <p>
            Votre code remplace nom et mot de passe : avec lui, vous retrouvez vos résultats sur tous vos
            appareils. Ne le donnez à personne d'autre.
          </p>
          {onInstaller && (
            <button className="btn2" style={{ marginTop: 6 }} onClick={onInstaller}>
              Mettre l'application sur mon écran d'accueil
            </button>
          )}
        </li>
      </ol>

      <h2 className="sectionTitre">Questions fréquentes</h2>
      <div className="faq">
        <details>
          <summary>Et si j'oublie un jour ?</summary>
          <p>Un jour oublié par semaine ne casse pas votre série. Deux jours de suite, si.</p>
        </details>
        <details>
          <summary>Les accents comptent-ils ?</summary>
          <p>
            En saison 1, une réponse sans accent est « presque juste » : elle compte, mais l'application vous
            montre la bonne forme. À partir de la saison 2, un accent oublié est une faute. Sous chaque case
            de réponse, une barre permet d'écrire é, è, ê, à, ç… en un clic.
          </p>
        </details>
        <details>
          <summary>Ma réponse est juste, mais l'application dit faux.</summary>
          <p>
            Pour les phrases, les synonymes et les contraires, il existe souvent plusieurs bonnes réponses.
            Touchez « devrait être accepté » sous la correction : votre enseignant le verra et pourra
            l'ajouter pour tout le monde.
          </p>
        </details>
        <details>
          <summary>Comment écouter les mots ?</summary>
          <p>
            Le petit haut-parleur lit le mot ou la phrase à voix haute. Le son dépend de votre appareil ; il
            est très bon sur iPhone et sur Mac.
          </p>
        </details>
        <details>
          <summary>Où voir mes progrès ?</summary>
          <p>
            Dans le <strong>Carnet</strong> : vos chiffres, vos récompenses, la liste des mots, la grille des
            verbes et l'examen blanc.
          </p>
        </details>
        <details>
          <summary>Qui voit mes résultats ?</summary>
          <p>
            Vous et votre enseignant, qui voit votre progression et les textes de vos défis. Il n'y a aucun
            classement entre élèves ; l'objectif de classe ne montre qu'un total.
          </p>
        </details>
      </div>

      {premiere && (
        <button className="btn" style={{ marginTop: 22 }} onClick={onFin}>C'est parti</button>
      )}
    </div>
  );
}
