import React from "react";

/* Petites icônes maison, dans un seul style cohérent — traits arrondis,
   2px, sans remplissage — plutôt qu'une bibliothèque entière pour une
   dizaine de pictogrammes. Elles remplacent les barres de couleur plates
   qui donnaient à l'écran d'accueil un air de gabarit non fini. */

const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.8,
  strokeLinecap: "round", strokeLinejoin: "round" };

export const IconCible = (p) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r=".8" fill="currentColor" stroke="none" />
  </svg>
);
export const IconLivre = (p) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}>
    <path d="M4 5.2c0-.7.6-1.2 1.3-1.1C7.6 4.4 10 5 12 6.4 14 5 16.4 4.4 18.7 4.1c.7-.1 1.3.4 1.3 1.1v12.6c0 .6-.5 1-1.1 1.1-2.4.2-4.9.9-6.9 2.1-2-1.2-4.5-1.9-6.9-2.1-.6 0-1.1-.5-1.1-1.1V5.2Z" />
    <path d="M12 6.4v13.5" />
  </svg>
);
export const IconVerbe = (p) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}>
    <path d="M4 12c1.5-4.5 4-6.5 6-6.5s3 2 3 5-1 5-3 5-3.5-2-3.5-2" />
    <path d="M14 12c1.2-4 3.2-6.5 5-6.5" /><path d="M13 5.5h6" />
  </svg>
);
export const IconMelange = (p) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}>
    <path d="M3 6h4.5l9 12H21" /><path d="M3 18h4.5l2-2.7" /><path d="M13.5 8.7 16.5 6H21" />
    <path d="M18.5 3.5 21 6l-2.5 2.5M18.5 20.5 21 18l-2.5-2.5" />
  </svg>
);
export const IconEtoile = (p) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}>
    <path d="M12 3.5l2.4 5.3 5.7.6-4.3 3.9 1.2 5.6L12 15.9l-5 3 1.2-5.6-4.3-3.9 5.7-.6L12 3.5Z" />
  </svg>
);
export const IconAlerte = (p) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}>
    <path d="M12 4 21 19H3L12 4Z" /><path d="M12 10v4" /><circle cx="12" cy="16.6" r=".9" fill="currentColor" stroke="none" />
  </svg>
);
export const IconOreille = (p) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}>
    <path d="M4 13c0-4.4 3.6-8 8-8s8 3.6 8 8v3a3 3 0 0 1-3 3h-1v-5" />
    <path d="M8 13a4 4 0 0 1 8 0v4a2.5 2.5 0 0 1-2.5 2.5H13" />
  </svg>
);
export const IconPlus = (p) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" /><path d="M12 8.2v7.6M8.2 12h7.6" />
  </svg>
);
export const IconChrono = (p) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}>
    <circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.6 2.6" /><path d="M9.5 3.5h5" />
  </svg>
);
export const IconTrophee = (p) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}>
    <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" /><path d="M7 5H4.5A1.5 1.5 0 0 0 3 6.5C3 8.5 4.5 10 6.5 10" />
    <path d="M17 5h2.5A1.5 1.5 0 0 1 21 6.5c0 2-1.5 3.5-3.5 3.5" />
    <path d="M12 14v3M9 20.5h6M9.5 20.5c0-1.8.8-3 2.5-3.5 1.7.5 2.5 1.7 2.5 3.5" />
  </svg>
);
export const IconListe = (p) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}>
    <path d="M8 6h12M8 12h12M8 18h12" /><circle cx="4" cy="6" r="1" fill="currentColor" stroke="none" />
    <circle cx="4" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="4" cy="18" r="1" fill="currentColor" stroke="none" />
  </svg>
);
