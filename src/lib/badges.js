/* Badges — récompenser des choses réelles, pas la simple présence.

   Chaque badge se calcule à partir de la progression : rien n'est stocké,
   rien ne peut être perdu. Un badge obtenu reste obtenu tant que le travail
   qui l'a produit tient.

   Volontairement : aucun classement entre élèves. Il motive les trois
   premiers et décourage les autres, et il rend visible ce qu'il vaut mieux
   ne pas exposer dans une classe. */

import { categorie, joursActifs } from "./leitner.js";

const acquis = (items, prog) =>
  items.filter((i) => categorie(prog[i.cle]) === "acquis").length;

export function badges({ progression, lexique, verbes, unites, temps }) {
  const out = [];
  const totalAcquis =
    acquis(lexique, progression) + acquis(verbes, progression);

  // paliers de volume
  for (const [seuil, nom] of [[25, "Premiers pas"], [100, "Centaine"],
                              [250, "Deux cent cinquante"], [500, "Cinq cents"],
                              [1000, "Millier"]]) {
    out.push({
      cle: `volume-${seuil}`, nom, detail: `${seuil} mots parfaitement connus`,
      obtenu: totalAcquis >= seuil, progres: Math.min(1, totalAcquis / seuil),
      famille: "volume",
    });
  }

  // unités terminées
  for (const u of unites) {
    const items = lexique.filter((i) => i.unite === u.nom);
    if (!items.length) continue;
    const a = acquis(items, progression);
    out.push({
      cle: `unite-${u.nom}`, nom: u.nom, detail: `${a}/${items.length} mots`,
      obtenu: a === items.length, progres: a / items.length, famille: "unite",
    });
  }

  // temps verbaux maîtrisés
  for (const t of temps) {
    const items = verbes.filter((i) => i.tempsCle === t.cle);
    if (!items.length) continue;
    const a = acquis(items, progression);
    out.push({
      cle: `temps-${t.cle}`, nom: t.nom, detail: `${a}/${items.length} verbes`,
      obtenu: a === items.length, progres: a / items.length, famille: "temps",
    });
  }

  // régularité
  const j = joursActifs(progression);
  for (const [seuil, nom] of [[5, "Régulier"], [10, "Très régulier"]]) {
    out.push({
      cle: `regularite-${seuil}`, nom,
      detail: `travailler ${seuil} jours sur 14`,
      obtenu: j >= seuil, progres: Math.min(1, j / seuil), famille: "regularite",
    });
  }

  return out;
}
