import React from "react";
import { lire } from "../lib/voix.js";

/* Bouton d'écoute. */
export function Ecouter({ texte, lent = false, libelle = "Écouter", grand = false }) {
  if (!texte) return null;
  return (
    <button
      className={"ecouter" + (grand ? " grand" : "")}
      onClick={() => lire(texte, lent ? 0.7 : 1)}
      title={libelle}
      aria-label={libelle}
      type="button"
    >
      <svg viewBox="0 0 24 24" width={grand ? 26 : 17} height={grand ? 26 : 17}
        fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5 6 9H3v6h3l5 4V5z" />
        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
        {grand && <path d="M18.5 5.5a9 9 0 0 1 0 13" />}
      </svg>
      {grand && <span>{libelle}</span>}
    </button>
  );
}

/* Barre d'accents.

   Un élève qui écrit « eleve » connaît le mot ; il ne sait pas taper l'accent.
   Sur téléphone, il faut maintenir une touche et choisir dans un menu. Cette
   friction n'a rien à voir avec le français : on la supprime. */
const ACCENTS = ["é", "è", "ê", "à", "ç", "ô", "î", "û", "ë", "ï"];

export function BarreAccents({ champRef, valeur, onChange, actif = true }) {
  if (!actif) return null;
  const inserer = (c) => {
    const el = champRef.current;
    if (!el) return onChange(valeur + c);
    const d = el.selectionStart ?? valeur.length;
    const f = el.selectionEnd ?? valeur.length;
    onChange(valeur.slice(0, d) + c + valeur.slice(f));
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(d + 1, d + 1);
    });
  };
  return (
    <div className="barreAccents">
      {ACCENTS.map((c) => (
        <button key={c} type="button" className="toucheAccent"
          onMouseDown={(e) => e.preventDefault()} onClick={() => inserer(c)}>
          {c}
        </button>
      ))}
    </div>
  );
}
