import React, { useEffect, useState } from "react";
import { avancementUnite, resultatDefi, SEUIL_DEFI } from "../lib/saison.js";
import { mesProductions } from "../lib/store.js";

/* Une unité : ses objectifs, puis les étapes du parcours, dans l'ordre. */
export default function Unite({ unite: u, code, progression, decouverts, onEtape, onRetour }) {
  const a = avancementUnite(u, progression, decouverts);
  const defi = resultatDefi(progression, u.id);
  const [retours, setRetours] = useState([]);
  useEffect(() => {
    mesProductions(code).then((l) => setRetours(l.filter((p) => p.unite === u.id)));
  }, [code, u.id]);

  return (
    <>
      <div className="bar">
        <div className="wrap barIn">
          <button className="lien" onClick={onRetour}>← Saison {u.semestre}</button>
          <span className="note" style={{ fontSize: 12.5 }}>{a.vus} / {a.total} éléments vus</span>
        </div>
      </div>

      <div className="main wrap">
        <p className="uniteNum">{u.facultative ? "Unité facultative" : u.complete ? `Unité ${u.numero}` : "Thème"}</p>
        <h1 className="uniteTitre">{u.titre}</h1>
        <p className="uniteSous">{u.sous}</p>

        {(u.oral || u.ecrit) && (
          <div className="objectifs">
            {u.oral && <div><span className="objectifsL">À l'oral</span>{u.oral}</div>}
            {u.ecrit && <div><span className="objectifsL">À l'écrit</span>{u.ecrit}</div>}
          </div>
        )}

        <ol className="etapes">
          {a.etapes.map((e, k) => {
            const cours = !e.fait && e.part > 0;
            return (
              <li key={e.cle}>
                <button className={"etape" + (e.fait ? " faite" : cours ? " encours" : "")}
                  onClick={() => onEtape(e.cle)}>
                  <span className="etapeNum" aria-hidden="true">{e.fait ? "✓" : k + 1}</span>
                  <span className="etapeCorps">
                    <span className="etapeNom">{e.nom}</span>
                    <span className="etapeSous">
                      {e.cle === "defi"
                        ? defi ? `Dernier test : ${defi.score} % (il faut ${SEUIL_DEFI} %)` : e.sous
                        : e.total ? `${e.sous} · ${e.n} / ${e.total}` : e.sous}
                    </span>
                  </span>
                  {cours && (
                    <span className="etapeAnneau" style={{ "--p": `${Math.round(e.part * 100)}%` }} aria-hidden="true" />
                  )}
                </button>
              </li>
            );
          })}
        </ol>

        {retours.some((r) => r.commentaire) && (
          <div className="retourProf">
            <h2 className="h2" style={{ marginBottom: 8 }}>Retour de votre enseignant</h2>
            {retours.filter((r) => r.commentaire).map((r) => (
              <div key={r.id} style={{ marginBottom: 12 }}>
                <p className="retourCommentaire">{r.commentaire}</p>
                <details>
                  <summary className="note">Votre texte du {new Date(r.cree).toLocaleDateString("fr-CH")}</summary>
                  <p className="retourTexte">{r.texte}</p>
                </details>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
