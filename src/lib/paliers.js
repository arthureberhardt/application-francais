/* Bilan par paliers.

   Le défaut d'un bilan ordinaire est que la question reste la même : traduire
   un mot dans un sens ou dans l'autre. En S7, redemander la traduction d'un
   mot appris en S1 ne mesure plus rien et n'apprend rien.

   Le format doit donc dépendre de l'ancienneté du mot, c'est-à-dire de l'écart
   entre le semestre où il a été introduit et le semestre courant :

     écart 0      traduction — le mot est récent, il s'agit encore de le fixer
     écart 1      phrase à trou — le mot doit être reconnu en contexte
     écart 2+     production vers le français, sans indice
     écart 3+     production avec la construction régie imposée

   La phrase à trou ne demande aucun contenu supplémentaire : chaque mot du
   noyau possède déjà son exemple. Il suffit d'y masquer le mot.            */

const sansAccents = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const nu = (s) =>
  s.replace(/^(le |la |les |l'|un |une |des )/, "").split(",")[0].trim();

/** Cherche le mot dans son exemple et le remplace par un blanc.
    Renvoie null si le mot ne s'y retrouve pas — on retombe alors
    sur une question de traduction. */
export function trouer(fr, exemple) {
  if (!exemple) return null;
  const cible = nu(fr);

  // 1. la locution entière, telle quelle
  const direct = new RegExp(`\\b${cible.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
  if (direct.test(exemple)) return exemple.replace(direct, "………");

  // 2. le mot principal, par son radical — l'exemple le porte souvent fléchi
  const principal = cible.split(/[ '’]/).filter((m) => m.length > 3).pop() || cible;
  const radical = sansAccents(principal).toLowerCase().slice(0, Math.max(4, principal.length - 3));
  const mots = exemple.split(/(\s+)/);
  for (let i = 0; i < mots.length; i++) {
    const brut = mots[i].replace(/[.,;:!?«»"]/g, "");
    if (brut.length < 3) continue;
    // « t'appelles » porte bien le radical de « s'appeler » : on ignore l'élision
    const noyau = sansAccents(brut).toLowerCase().replace(/^[a-z]['’]/, "");
    if (noyau.includes(radical)) {
      mots[i] = mots[i].replace(brut, "………");
      return mots.join("");
    }
  }
  return null;
}

export function palier(item, semestreCourant) {
  const ecart = Math.max(0, semestreCourant - (item.semestre || semestreCourant));
  if (ecart >= 3 && item.construction) return "construction";
  if (ecart >= 2) return "production";
  if (ecart >= 1) return "trou";
  return "traduction";
}
