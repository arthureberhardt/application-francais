/* Le registre des saisons rédigées (filière gymnase).

   Chaque saison exporte par défaut un objet au même format :

   {
     numero, titre,
     temps: ["futur", …]              // temps introduits (facultatif : sinon ceux de la filière)
     unites: [{ id, numero, titre, sous, oral, ecrit, facultative?,
                mots: [ids], fils: { adjectifs, notions, argumentation },
                verbes: [infinitifs], grammaire: [ids de points], evaluation?: id }],
     lecture: { titre, sous, stations: [{ id, numero, titre, sous, semaines,
                notions: [ids], mots: [ids], carnet: { consigne, controle, modele },
                evaluation?: id }] },
     grammaire: [{ id, titre, explication: [lignes], exercices: [...] }],
     tournures: [{ id, unite, fr, de, situation, trou, fil? }],
     phrases:   [{ id, unite, de, fr, aussi }],
     textes:    [{ id, unite, titre, consigne, texte }],   // blancs : {réponse/variante|indice}
     defis:     { [unité]: { consigne, motsImposes, controle, modele } },
     evaluations: { [id]: { titre, type, quand, criteres, modele, tournures, entrainement } },
     motsAjouts: [fiches],             // fiches nouvelles de la saison
     surcharges: { [id]: { exemple?, de? } },
   }                                                                          */

import s1 from "./s1.js";
import s2 from "./s2.js";
import s3 from "./s3.js";
import s4 from "./s4.js";
import s5 from "./s5.js";

export const SAISONS = { 1: s1, 2: s2, 3: s3, 4: s4, 5: s5 };
