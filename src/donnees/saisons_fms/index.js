/* Le registre des semestres FMS rédigés. Même format que les saisons du
   gymnase (voir ../saisons/index.js) ; les identifiants commencent par F :
   unités F1-U1, stations F1-L1, points GF1-…, exercices f1…, tournures TF…,
   phrases PF…, textes XF…, évaluations F1-EV-…, fiches nouvelles F1-0…    */



import f1 from "./f1.js";
import f2 from "./f2.js";
import f3 from "./f3.js";
import f4 from "./f4.js";
import f5 from "./f5.js";

const SEMESTRES = { 1: f1, 2: f2, 3: f3, 4: f4, 5: f5 };

export const SAISONS_FMS = Object.fromEntries(
  Object.entries(SEMESTRES).map(([n, s]) => [n, { ...s, motsAjouts: s.motsAjouts || [] }]));
