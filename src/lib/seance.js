/* Composition d'une séance.

   Une séance ne doit pas être faite uniquement de mots nouveaux : l'élève
   n'aurait que des questions de reconnaissance et ne verrait aucune
   progression. Elle ne doit pas non plus être faite uniquement de révisions :
   rien de nouveau n'entrerait.

   Règle : au plus « nouveaux » découvertes, le reste en révision — d'abord ce
   qui est dû, puis ce qui ne l'est pas encore, les acquis en dernier.        */

import { jamaisVu, estDu, categorie } from "./leitner.js";

/* Le bilan est plus long : il porte sur plusieurs semestres et sert de
   répétition générale. Les séances ordinaires restent courtes pour pouvoir
   être faites dans les transports ou entre deux cours. */
export const FORMATS = {
  lexique: { longueur: 12, nouveaux: 4 },
  verbes: { longueur: 12, nouveaux: 4 },
  bilan: { longueur: 30, nouveaux: 6 },
  approfondissement: { longueur: 15, nouveaux: 8 },
  difficiles: { longueur: 10, nouveaux: 0 },
  dictee: { longueur: 12, nouveaux: 3 },
  special: { longueur: 12, nouveaux: 4 },
  rattrapage: { longueur: 99, nouveaux: 0 },
};

const melange = (a) => [...a].sort(() => Math.random() - 0.5);

export function composer(source, progression, mode = "lexique") {
  const { longueur, nouveaux: maxNouveaux } = FORMATS[mode] || FORMATS.lexique;

  const nouveaux = [];
  const dus = [];
  const enCours = [];
  const acquis = [];

  for (const i of source) {
    const p = progression[i.cle];
    if (jamaisVu(p)) nouveaux.push(i);
    else if (categorie(p) === "acquis") acquis.push(i);
    else if (estDu(p)) dus.push(i);
    else enCours.push(i);
  }

  const choisis = [];
  choisis.push(...melange(nouveaux).slice(0, maxNouveaux));
  for (const groupe of [dus, enCours, acquis, nouveaux]) {
    if (choisis.length >= longueur) break;
    for (const i of melange(groupe)) {
      if (choisis.length >= longueur) break;
      if (!choisis.includes(i)) choisis.push(i);
    }
  }
  return melange(choisis);
}
