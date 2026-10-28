/* Les compléments des stations de lecture (et de quelques unités) :
   tournures, phrases, textes, un outil de lecture (point de grammaire)
   et des mots, pour qu'aucune étape ne se réduise à une ou deux questions. */
import l12 from "./l1_2.js";
import l34 from "./l3_4.js";
import l56 from "./l5_6.js";
import l78 from "./l7_8.js";
import dix from "./l_dix.js";

const BASE = { ...l12, ...l34, ...l56, ...l78 };
const fusion = (a = {}, b = {}) => {
  const out = { ...a };
  for (const k of ["mots", "tournures", "phrases", "textes"]) if (b[k]) out[k] = [...(a[k] || []), ...b[k]];
  if (b.grammaire && !a.grammaire) out.grammaire = b.grammaire;
  return out;
};
export const LECTURES_PLUS = Object.fromEntries(
  [...new Set([...Object.keys(BASE), ...Object.keys(dix)])].map((id) => [id, fusion(BASE[id], dix[id])]));
