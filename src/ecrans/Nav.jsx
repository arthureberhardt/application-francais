import React from "react";

/* La barre du bas : trois endroits, toujours au même endroit. */
const ICONES = {
  saison: (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="7" y1="4" x2="7" y2="20" />
      <circle cx="7" cy="6" r="2.4" fill="var(--carte)" />
      <circle cx="7" cy="12" r="2.4" fill="currentColor" />
      <circle cx="7" cy="18" r="2.4" fill="var(--carte)" />
      <line x1="12" y1="6" x2="20" y2="6" /><line x1="12" y1="12" x2="20" y2="12" /><line x1="12" y1="18" x2="17" y2="18" />
    </svg>
  ),
  carnet: (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" />
      <path d="M5 17a3 3 0 0 1 3-3h11" />
      <line x1="9" y1="8" x2="15" y2="8" strokeLinecap="round" />
    </svg>
  ),
  aide: (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.3c-.7.3-1 .8-1 1.5v.3" />
      <circle cx="12" cy="17" r=".6" fill="currentColor" />
    </svg>
  ),
};

export default function Nav({ actif, onChoisir }) {
  return (
    <nav className="nav" aria-label="Navigation principale">
      {[["saison", "Saison"], ["carnet", "Carnet"], ["aide", "Aide"]].map(([cle, nom]) => (
        <button key={cle} className={"navBtn" + (actif === cle ? " on" : "")}
          aria-current={actif === cle ? "page" : undefined} onClick={() => onChoisir(cle)}>
          {ICONES[cle]}
          <span>{nom}</span>
        </button>
      ))}
    </nav>
  );
}
