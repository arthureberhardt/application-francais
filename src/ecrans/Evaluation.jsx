import React from "react";
import { Ecouter } from "./Outils.jsx";

/* Préparer l'évaluation de la période : ce qui est évalué, un modèle
   commenté, les tournures utiles, puis un entraînement envoyé à
   l'enseignant (comme le texte d'un défi). */
export default function Evaluation({ unite, evaluation: ev, fait, onEntrainer, onFin }) {
  return (
    <>
      <div className="bar">
        <div className="wrap barIn">
          <button className="lien" onClick={onFin}>← {unite.titre}</button>
          <span />
        </div>
      </div>
      <div className="main wrap" style={{ maxWidth: 640 }}>
        <p className="uniteNum">{ev.type}{ev.quand ? ` · ${ev.quand}` : ""}</p>
        <h1 className="uniteTitre" style={{ fontSize: "clamp(26px, 6vw, 34px)" }}>{ev.titre}</h1>
        {ev.objectif && <p className="uniteSous">{ev.objectif}</p>}

        {ev.criteres?.length > 0 && (
          <section className="evalBloc">
            <h2 className="regleTitre">Ce qui est évalué</h2>
            <dl className="criteres">
              {ev.criteres.map((c, i) => (
                <div key={i} className="critere">
                  <dt>{c.critere}</dt>
                  <dd>{c.detail}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {ev.modele && (
          <section className="evalBloc">
            <h2 className="regleTitre">Un exemple réussi</h2>
            <p className="modele">{ev.modele.texte}</p>
            {ev.modele.remarques?.length > 0 && (
              <ul className="remarques">
                {ev.modele.remarques.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            )}
          </section>
        )}

        {ev.tournures?.length > 0 && (
          <section className="evalBloc">
            <h2 className="regleTitre">Tournures utiles</h2>
            <ul className="tournuresListe">
              {ev.tournures.map((t, i) => (
                <li key={i}><span>{t}</span><Ecouter texte={t.replace(/…/g, "")} /></li>
              ))}
            </ul>
          </section>
        )}

        {ev.conseils?.length > 0 && (
          <section className="evalBloc">
            <h2 className="regleTitre">Conseils</h2>
            <ul className="remarques">
              {ev.conseils.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </section>
        )}

        {ev.entrainement && (
          <>
            <button className="btn" style={{ marginTop: 8 }} onClick={onEntrainer}>
              {fait ? "Refaire l'entraînement" : "M'entraîner : écrire et envoyer à mon enseignant"}
            </button>
            {fait && <p className="note" style={{ marginTop: 10 }}>Entraînement déjà envoyé : votre enseignant l'a reçu.</p>}
          </>
        )}
      </div>
    </>
  );
}
