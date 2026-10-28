/* La série de jours.

   Un jour compte dès qu'une séance est terminée. Un oubli n'efface pas tout :
   un « joker » par semaine couvre un jour manqué. Ce qui compte, c'est de
   revenir souvent, pas d'être parfait — et une série qui tombe à zéro au
   premier oubli décourage plus qu'elle ne motive.                          */

const JOUR = 86400000;
const iso = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** @param jours  ensemble de dates « AAAA-MM-JJ »
    @returns { serie, aujourdhui, jokerUtilise } */
export function calculerSerie(jours) {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  const aujourdhui = jours.has(iso(d));
  if (!aujourdhui) d.setTime(d.getTime() - JOUR); // la série d'hier tient encore aujourd'hui
  let serie = 0;
  const jokers = []; // jours manqués couverts, en millisecondes
  for (let k = 0; k < 400; k++) {
    if (jours.has(iso(d))) {
      serie++;
    } else {
      // joker : seulement au milieu d'une série (la veille a été travaillée)
      // et au plus un par période de sept jours
      const veille = new Date(d.getTime() - JOUR);
      const recent = jokers.some((m) => m - d.getTime() < 7 * JOUR);
      if (serie === 0 || recent || !jours.has(iso(veille))) break;
      jokers.push(d.getTime());
    }
    d.setTime(d.getTime() - JOUR);
  }
  return { serie, aujourdhui, jokerUtilise: jokers.length > 0 };
}

/** Les 14 derniers jours, du plus ancien au plus récent, pour les petits points. */
export function quatorzeJours(jours) {
  const out = [];
  const d = new Date();
  for (let k = 13; k >= 0; k--) {
    const x = new Date(d.getTime() - k * JOUR);
    out.push(jours.has(iso(x)));
  }
  return out;
}
