/* Raccourcis pour écrire les compléments des stations de lecture. */
export const T = (fr, de, situation, trou) => ({ fr, de, situation, trou });
export const P = (de, fr, aussi = []) => ({ de, fr, aussi });
export const X = (titre, consigne, texte) => ({ titre, consigne, texte });
export const M = (fr, de, cat, exemple) => ({ fr, de, cat, exemple });
export const c = (id, phrase, options, reponse, explication) => ({ id, type: "choix", phrase, options, reponse, explication });
export const s = (id, consigne, phrase, reponse, aussi = [], explication = "") => ({ id, type: "saisie", consigne, phrase, reponse, aussi, explication });
export const o = (id, reponse, aussi = [], explication = "") => ({ id, type: "ordre", reponse, aussi, explication });
