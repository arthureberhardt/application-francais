import React from "react";
import { itemsDe, unitesDe, tempsJusqua } from "../lib/items.js";
import { badges } from "../lib/badges.js";

const FAMILLES = [
  ["volume", "Nombre de mots appris"],
  ["unite", "Thèmes terminés"],
  ["temps", "Temps des verbes"],
  ["regularite", "Travail régulier"],
];

export default function Badges({ semestre, progression, onFin }) {
  const { lexique, verbes } = itemsDe(semestre);
  const liste = badges({
    progression, lexique, verbes,
    unites: unitesDe(semestre),
    temps: tempsJusqua(semestre),
  });
  const obtenus = liste.filter((b) => b.obtenu).length;

  return (
    <>
      <div className="bar">
        <div className="wrap barIn">
          <button className="lien" onClick={onFin}>← Retour</button>
          <span className="sur">semestre {semestre}</span>
          <span className="mono" style={{ fontSize: 12, color: "var(--ardoise)" }}>
            {obtenus}/{liste.length}
          </span>
        </div>
      </div>

      <div className="main wrap">
        <div className="sur">Vos récompenses</div>
        <h2 className="dsp" style={{ fontSize: 25, margin: "8px 0 6px" }}>
          Vous en avez gagné {obtenus} sur {liste.length}
        </h2>
        <p className="note" style={{ marginBottom: 22 }}>
          Ces récompenses arrivent toutes seules quand vous travaillez.
          Il n'y a aucun classement : personne ne voit vos résultats à part vous
          et votre enseignant.
        </p>

        {FAMILLES.map(([cle, titre]) => {
          const g = liste.filter((b) => b.famille === cle);
          if (!g.length) return null;
          return (
            <div key={cle} style={{ marginBottom: 24 }}>
              <div className="sur" style={{ marginBottom: 9 }}>{titre}</div>
              <div className="grilleBadges">
                {g.map((b, i) => (
                  <div key={b.cle}
                    className={"badge" + (b.obtenu ? " obtenu" : "")}
                    style={{ animationDelay: `${i * 28}ms` }}>
                    <div className="badgeRond">
                      <svg viewBox="0 0 40 40" width="40" height="40">
                        <circle cx="20" cy="20" r="17" fill="none"
                          stroke="var(--trait)" strokeWidth="3.5" />
                        <circle cx="20" cy="20" r="17" fill="none"
                          stroke={b.obtenu ? "var(--vert)" : "var(--bleu)"} strokeWidth="3.5"
                          strokeLinecap="round" transform="rotate(-90 20 20)"
                          strokeDasharray={2 * Math.PI * 17}
                          strokeDashoffset={2 * Math.PI * 17 * (1 - b.progres)} />
                      </svg>
                      {b.obtenu && <span className="badgeCoche">✓</span>}
                    </div>
                    <div className="badgeNom">{b.nom}</div>
                    <div className="badgeDetail">{b.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
