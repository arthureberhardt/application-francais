/* Le contenu de l'application.

   mots.js    — toutes les fiches, une seule fois
   verbes.js  — tous les verbes et leurs formes, une seule fois
   temps.js   — tous les temps existants
   filieres/  — qui enseigne quoi, et quand

   Une fiche n'appartient à aucune filière : ce sont les filières qui la
   citent. Le gymnase et la FMS partagent donc exactement le même contenu.  */

import gymnase from "./filieres/gymnase.js";
import fms from "./filieres/fms.js";

export { MOTS, PAR_ID } from "./mots.js";
export { VERBES, VERBE_PAR_INF } from "./verbes.js";
export { TEMPS } from "./temps.js";

export const FILIERES = [gymnase, fms];
export const filierePar = (cle) => FILIERES.find((f) => f.cle === cle) || gymnase;
