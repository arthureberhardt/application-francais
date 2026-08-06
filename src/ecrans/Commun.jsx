import React from "react";
import { categorie, etatVerbe, NB_BOITES, INTERVALLES } from "../lib/leitner.js";

export const COULEUR = { inconnu: "#CBD2DC", vu: "var(--ambre)", acquis: "var(--vert)" };
export const ETIQUETTE = { inconnu: "non connu", vu: "vu", acquis: "parfaitement connu" };

/* Le rail des cinq boîtes — l'élément central de l'interface.
   L'élève voit où se trouve chaque carte et pourquoi elle y est. */
export function Rail({ progression, actif, flash }) {
  const boites = Array.from({ length: NB_BOITES }, (_, i) => i + 1);
  const compte = boites.map(
    (b) => Object.values(progression).filter((p) => p.boite === b && p.ok > 0).length
  );
  const libelle = boites.map((b) => {
    const j = INTERVALLES[b];
    return j <= 1 ? "1 jour" : j < 30 ? `${j} jours` : `${Math.round(j / 30)} mois`;
  });
  return (
    <div className="rail">
      {boites.map((b, i) => (
        <div key={b} className={"boite" + (actif === b ? " on" : "") + (flash === b ? " flash" : "")}>
          <div className="jeton" />
          <div className="boiteN">{compte[i]}</div>
          <div className="boiteL">boîte {b}</div>
          <div className="boiteL" style={{ opacity: 0.6 }}>{libelle[i]}</div>
        </div>
      ))}
    </div>
  );
}

/* Anneau de progression — le pourcentage d'éléments parfaitement connus. */
export function Anneau({ part }) {
  const r = 43;
  const c = 2 * Math.PI * r;
  return (
    <div className="anneau">
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <defs>
          <linearGradient id="grAnneau" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#A9D4EE" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="7.5" />
        <circle
          cx="50" cy="50" r={r} fill="none" stroke="url(#grAnneau)" strokeWidth="7.5"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - part / 100)}
          style={{ transition: "stroke-dashoffset .8s cubic-bezier(.2,.85,.25,1)" }}
        />
      </svg>
      <div className="anneauTexte">
        <span className="anneauN">{part}%</span>
        <span className="anneauU mono">ACQUIS</span>
      </div>
    </div>
  );
}

/* @param items   les mots (un objet = un mot)
   @param verbes  les verbes groupés (un objet = un verbe, tous temps confondus) */
export function Statistiques({ progression, items, verbes = [] }) {
  const c = { inconnu: 0, vu: 0, acquis: 0 };
  items.forEach((i) => c[categorie(progression[i.cle])]++);
  verbes.forEach((v) => c[etatVerbe(v.couples, progression)]++);
  const total = items.length + verbes.length;
  const cases = [
    ["inconnu", "non connus", c.inconnu, "var(--ardoise)"],
    ["vu", "vus", c.vu, "var(--ambre)"],
    ["acquis", "parfaitement connus", c.acquis, "var(--vert)"],
  ];
  return (
    <>
      <div className="jauge" style={{ marginBottom: 11 }}>
        {[["var(--vert)", c.acquis], ["var(--ambre)", c.vu], ["#E7EAF0", c.inconnu]].map(
          ([fond, v], k) => (
            <div key={k} style={{ background: fond, width: `${(v / total) * 100}%`, transition: ".4s" }} />
          )
        )}
      </div>
      <div className="grille3">
        {cases.map(([cls, l, v, couleur]) => (
          <div className={"stat " + cls} key={l}>
            <div className="statN" style={{ color: couleur }}>{v}</div>
            <div className="statL">{l}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export const Ligne = ({ libelle, valeur }) => (
  <div style={{ fontSize: 13.5, lineHeight: 1.55 }}>
    <span className="sur" style={{ marginRight: 7 }}>{libelle}</span>
    <span style={{ color: "var(--encre)" }}>{valeur}</span>
  </div>
);

/* Fenêtre modale — utilisée pour les fiches de mot et de verbe. */
export function Fenetre({ titre, sous, onFermer, children }) {
  return (
    <div className="voile" onClick={onFermer}>
      <div className="fenetre" onClick={(e) => e.stopPropagation()}>
        <button className="fermer" onClick={onFermer} aria-label="Fermer">×</button>
        <div className="fenetreTete">
          <div className="poignee" />
          <div className="dsp" style={{ fontSize: 25, paddingRight: 34 }}>{titre}</div>
          {sous && <div className="note" style={{ marginTop: 3 }}>{sous}</div>}
        </div>
        <div className="fenetreCorps">{children}</div>
      </div>
    </div>
  );
}

/* Objectif du jour — un horizon court, remis à zéro chaque matin. */
export function ObjectifJour({ fait, objectif }) {
  const part = Math.min(1, fait / objectif);
  const atteint = fait >= objectif;
  return (
    <div className="objectif">
      <div className="objectifBarre">
        <div style={{ width: `${part * 100}%`,
          background: atteint ? "#8FD6B4" : "rgba(255,255,255,.82)" }} />
      </div>
      <span style={{ fontSize: 12, color: "rgba(255,255,255,.72)" }}>
        {atteint
          ? `Objectif du jour atteint : ${fait} mots travaillés. Bravo.`
          : `Objectif du jour : ${fait} sur ${objectif} mots travaillés.`}
      </span>
    </div>
  );
}
