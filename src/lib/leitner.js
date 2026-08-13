/* Répétition espacée — système de Leitner à cinq boîtes.

   Ce qui compte n'est pas le nombre de bonnes réponses, mais l'intervalle
   entre elles. Cinq réussites dans la même séance ne prouvent rien ;
   cinq réussites étalées sur un mois prouvent que le mot est en mémoire.

   Les trois catégories visibles par l'élève :
     jamais réussi            → « non connu »
     au moins une réussite    → « vu »
     boîte 5 et 5 réussites   → « parfaitement connu »

   Un quatrième état, transversal, signale les mots qui résistent :
   voir « difficile » plus bas.                                              */

/* Intervalles en jours ; l'index est le numéro de boîte.

   Les deux dernières boîtes servent l'entretien, pas l'apprentissage. Sans
   elles, un mot su depuis six mois revenait encore toutes les trois semaines :
   en fin de quatrième année, cela représentait plus de deux cents questions
   par jour rien que pour ne pas reculer. Un mot appris doit s'espacer, sinon
   le programme finit par s'étrangler lui-même. */
export const INTERVALLES = [0, 0, 1, 3, 7, 21, 60, 150];
export const NB_BOITES = 7;
export const SEUIL = 5;
export const SEUIL_DIFFICILE = 4; // échecs cumulés avant signalement
const JOUR = 86400000;

export const etatInitial = () => ({ boite: 1, ok: 0, essais: 0, echecs: 0, du: 0, maj: 0 });

export function categorie(p) {
  if (!p || p.ok === 0) return "inconnu";
  if (p.ok >= SEUIL && p.boite >= 5) return "acquis";
  return "vu";
}

/* Un « mot difficile » est un mot qui a été raté plusieurs fois sans jamais
   se fixer. Le laisser dans le cycle ordinaire ne sert à rien : il revient,
   il est raté, il retombe en boîte 1. Il faut le traiter autrement — d'où
   un mode dédié, où le mot est d'abord montré avant d'être demandé. */
export const estDifficile = (p) =>
  Boolean(p) && (p.echecs || 0) >= SEUIL_DIFFICILE && categorie(p) !== "acquis";

export function apresReponse(p, juste) {
  const e = p ? { ...p } : etatInitial();
  e.essais++;
  e.echecs = e.echecs || 0;
  if (juste) {
    e.ok++;
    e.boite = Math.min(NB_BOITES, e.boite + 1);
  } else {
    e.echecs++;
    e.ok = Math.max(0, e.ok - 1);
    e.boite = 1;
  }
  e.du = Date.now() + INTERVALLES[e.boite] * JOUR;
  e.maj = Date.now();
  return e;
}

export const jamaisVu = (p) => !p || p.essais === 0;
export const estDu = (p) => p && p.essais > 0 && p.du <= Date.now();

/* ── régularité ──
   Non pas une série, qui punit l'oubli d'un jour et pousse à ouvrir
   l'application pour ne rien faire, mais le nombre de jours réellement
   travaillés sur les quatorze derniers. Même information, sans la culpabilité. */
export function joursActifs(progression, fenetre = 14) {
  const limite = Date.now() - fenetre * JOUR;
  const jours = new Set();
  for (const p of Object.values(progression)) {
    if (p && p.maj && p.maj >= limite) {
      jours.add(new Date(p.maj).toISOString().slice(0, 10));
    }
  }
  return jours.size;
}

export const travailleAujourdhui = (progression) => {
  const j = new Date().toISOString().slice(0, 10);
  return Object.values(progression).some(
    (p) => p && p.maj && new Date(p.maj).toISOString().slice(0, 10) === j
  );
};

/* ── objectif du jour ──
   Un pourcentage global monte de quelques dixièmes par séance : il ne
   récompense rien à l'échelle d'une journée. L'objectif quotidien donne un
   horizon court, atteignable en dix minutes, et il se remet à zéro chaque
   matin — ce qui évite qu'un retard s'accumule. */
export const OBJECTIF_JOUR = 20;

export function travailAujourdhui(progression) {
  const j = new Date().toISOString().slice(0, 10);
  return Object.values(progression).filter(
    (p) => p && p.maj && new Date(p.maj).toISOString().slice(0, 10) === j
  ).length;
}

/** Un verbe est acquis quand il l'est à tous les temps enseignés. */
export function etatVerbe(couples, progression) {
  const a = couples.filter((c) => categorie(progression[c.cle]) === "acquis").length;
  if (a === couples.length) return "acquis";
  return couples.some((c) => categorie(progression[c.cle]) !== "inconnu") ? "vu" : "inconnu";
}

/* ─────────── Domaines faibles — pour le mode adaptatif ─────────── */
/* Le même principe que le diagnostic de classe côté enseignant, mais tourné
   vers l'élève lui-même : repérer, parmi les thèmes et les temps déjà
   travaillés, ceux où le taux de réussite est le plus bas — pas seulement
   ce qui est dû aujourd'hui, mais ce qui résiste vraiment. Un domaine
   n'apparaît que s'il compte au moins SEUIL_DOMAINE éléments essayés,
   pour qu'un seul mot raté ne fausse pas le diagnostic. */
export const SEUIL_DOMAINE = 5;
const SEUIL_FAIBLESSE = 0.7; // en dessous de 70 % de réussite, un domaine compte comme faible

export function domainesFaibles(items, progression, { seuil = SEUIL_DOMAINE, top = 3 } = {}) {
  const parDomaine = {};
  for (const i of items) {
    const cle = i.module === "verbes" ? `temps:${i.tempsCle}` : `unite:${i.unite}`;
    const p = progression[i.cle];
    if (!p || p.essais === 0) continue; // jamais tenté : ne renseigne rien sur une faiblesse
    const d = (parDomaine[cle] = parDomaine[cle] || { total: 0, reussis: 0, items: [] });
    d.total++;
    if (categorie(p) === "acquis") d.reussis++;
    d.items.push(i);
  }
  return Object.entries(parDomaine)
    .filter(([, d]) => d.total >= seuil)
    .map(([cle, d]) => {
      const [type, nom] = cle.split(/:(.+)/);
      return { type, nom, taux: d.reussis / d.total, items: d.items };
    })
    .filter((d) => d.taux < SEUIL_FAIBLESSE) // un domaine déjà solide n'est pas une faiblesse
    .sort((a, b) => a.taux - b.taux)
    .slice(0, top);
}
