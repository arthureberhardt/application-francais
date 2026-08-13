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
  adaptatif: { longueur: 15, nouveaux: 2 },
};

/* Une séance adaptative n'est pas juste « ce qui est dû » : elle force la
   moitié de la séance à venir des domaines les plus faibles de l'élève,
   même quand ces éléments ne sont pas encore dus selon Leitner — parce que
   « pas encore dû » et « pas encore su » sont deux choses différentes, et
   un domaine vraiment faible mérite d'être revu plus tôt que prévu. L'autre
   moitié suit le fonctionnement normal, pour ne pas abandonner la
   discipline de répétition espacée sur le reste du programme. */
const PART_DOMAINES_FAIBLES = 0.6;

export function composerAdaptatif(source, progression, domaines, longueurForcee) {
  const { longueur: longueurDefaut, nouveaux: maxNouveaux } = FORMATS.adaptatif;
  const longueur = longueurForcee || longueurDefaut;
  const nDomaines = Math.round(longueur * PART_DOMAINES_FAIBLES);

  const clesDomaines = new Set(domaines.flatMap((d) => d.items.map((i) => i.cle)));
  const cachePoolFaible = melange(source.filter((i) => clesDomaines.has(i.cle)));
  const choisisFaibles = cachePoolFaible.slice(0, nDomaines);

  const reste = source.filter((i) => !choisisFaibles.includes(i));
  const complement = composer(reste, progression, "lexique", longueur - choisisFaibles.length);

  return melange([...choisisFaibles, ...complement]);
}

const melange = (a) => [...a].sort(() => Math.random() - 0.5);

export function composer(source, progression, mode = "lexique", longueurForcee) {
  const { longueur: longueurDefaut, nouveaux: maxNouveaux } = FORMATS[mode] || FORMATS.lexique;
  const longueur = longueurForcee || longueurDefaut;

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
