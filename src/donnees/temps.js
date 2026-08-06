// Les temps qui existent dans l'application.
//   type "conjugaison" = des formes à produire
//   type "compose"     = interrogé sur le participe, l'auxiliaire et l'accord ;
//                        auxTemps indique à quel temps se met l'auxiliaire
//
// Le semestre d'introduction n'est pas ici : il dépend de la filière.

export const TEMPS = [
 {
  "cle": "present",
  "nom": "présent",
  "type": "conjugaison"
 },
 {
  "cle": "imperatif",
  "nom": "impératif",
  "type": "conjugaison"
 },
 {
  "cle": "imparfait",
  "nom": "imparfait",
  "type": "conjugaison"
 },
 {
  "cle": "passecompose",
  "nom": "passé composé",
  "type": "compose",
  "auxTemps": "present"
 },
 {
  "cle": "futur",
  "nom": "futur simple",
  "type": "conjugaison"
 },
 {
  "cle": "conditionnel",
  "nom": "conditionnel présent",
  "type": "conjugaison"
 },
 {
  "cle": "plusqueparfait",
  "nom": "plus-que-parfait",
  "type": "compose",
  "auxTemps": "imparfait"
 },
 {
  "cle": "subjonctif",
  "nom": "subjonctif présent",
  "type": "conjugaison"
 },
 {
  "cle": "participepresent",
  "nom": "participe présent",
  "type": "conjugaison",
  "personnes": [
   "forme unique"
  ]
 }
];

export const TEMPS_PAR_CLE = Object.fromEntries(TEMPS.map((t) => [t.cle, t]));
