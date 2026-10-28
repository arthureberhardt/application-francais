import React from "react";

/* Une règle de grammaire, en français simple, avant les exercices.
   Le gras est noté **ainsi** dans les données. */
export function Gras({ texte }) {
  const morceaux = texte.split(/(\*\*[^*]+\*\*)/g);
  return morceaux.map((m, i) =>
    m.startsWith("**") ? <strong key={i}>{m.slice(2, -2)}</strong> : <React.Fragment key={i}>{m}</React.Fragment>);
}

export default function Regle({ unite, onExercices, onFin }) {
  return (
    <>
      <div className="bar">
        <div className="wrap barIn">
          <button className="lien" onClick={onFin}>← {unite.titre}</button>
          <span />
        </div>
      </div>
      <div className="main wrap" style={{ maxWidth: 620 }}>
        {unite.points.map((g) => (
          <section key={g.id} className="regle">
            <h2 className="regleTitre">{g.titre}</h2>
            {g.explication.map((l, i) => (
              <p key={i} className="regleLigne"><Gras texte={l} /></p>
            ))}
          </section>
        ))}
        <button className="btn" style={{ marginTop: 10 }} onClick={onExercices}>
          Faire les exercices
        </button>
        <p className="note" style={{ marginTop: 12, fontSize: 12.5 }}>
          La règle reste disponible : vous pouvez revenir ici à tout moment depuis l'unité.
        </p>
      </div>
    </>
  );
}
