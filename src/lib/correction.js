/* Correction automatique des réponses saisies.

   Trois verdicts :
     "exact"   la réponse est juste
     "proche"  juste, mais un accent ou une majuscule diffère
     "faux"

   Deux principes, appris de l'usage :

   1. L'article ne doit jamais faire échouer une réponse, dans aucune des deux
      langues. « das Fenster » et « Fenster » sont tous deux justes, et l'élève
      qui écrit l'article en sait plutôt davantage. Ce n'est pas non plus une
      faute d'orthographe : le verdict reste « exact ».

   2. Les traductions notées « Freund(in) », « Erwachsene(r) », « Schüler(in) »
      désignent deux formes réelles. Les deux doivent être acceptées.
      Une parenthèse précédée d'une espace — « gestört sein (Apparat) » — est
      au contraire une glose : elle ne fait pas partie de la réponse.        */

const ARTICLES =
  /^(le |la |les |l'|un |une |des |du |de la |der |die |das |den |dem |des |ein |eine |einen |einem |eines )/;

const sansAccents = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const nettoie = (s) =>
  s.toLowerCase().trim().replace(/\s+/g, " ").replace(/[.!?;:]+$/g, "").replace(/['']/g, "'");
const sansArticle = (s) => s.replace(ARTICLES, "");

/** Un champ peut contenir plusieurs réponses acceptables : « lieben, mögen ». */
export const variantes = (champ) =>
  champ.split(/[,·]/).map((x) => x.trim()).filter(Boolean);

/** « Schüler(in) » → ["Schüler", "Schülerin"] ; « aller (Apparat) » → ["aller"]. */
function developper(forme) {
  const glose = forme.replace(/\s+\([^)]*\)/g, "").trim();
  const suffixe = /(\S)\(([^)]+)\)/;
  const m = glose.match(suffixe);
  if (!m) return [glose];
  const sans = glose.replace(suffixe, "$1");
  const avec = glose.replace(suffixe, "$1$2");
  return [...new Set([sans, avec].flatMap(developper))];
}

/** Toutes les écritures acceptables d'une réponse, sous forme normalisée. */
function formes(champ) {
  const out = new Set();
  for (const v of variantes(champ)) {
    for (const f of developper(v)) {
      const n = nettoie(f);
      if (!n) continue;
      out.add(n);
      out.add(sansArticle(n));
    }
  }
  return out;
}

/**
 * @param {string} saisie    ce qu'a écrit l'élève
 * @param {string} attendu   la réponse de référence
 * @param {string[]} [aussi] autres formulations acceptées
 */
export function evalue(saisie, attendu, aussi = []) {
  const s = nettoie(saisie);
  if (!s) return "faux";

  const attendues = formes(attendu);
  for (const a of aussi) for (const f of formes(a)) attendues.add(f);

  const proposees = new Set([s, sansArticle(s)]);
  for (const p of proposees) if (attendues.has(p)) return "exact";

  const souples = new Set([...attendues].map((a) => sansAccents(a)));
  for (const p of proposees) if (souples.has(sansAccents(p))) return "proche";

  return "faux";
}

/** Diff caractère par caractère entre la saisie et la forme correcte.
    Renvoie des segments { ch, t } où t vaut "ok", "accent" ou "trop". */
export function diff(saisie, correct) {
  const a = [...saisie];
  const b = [...correct];
  const n = a.length;
  const m = b.length;
  const memes = (x, y) => sansAccents(x).toLowerCase() === sansAccents(y).toLowerCase();

  const dp = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = memes(a[i], b[j])
        ? dp[i + 1][j + 1] + 1
        : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const out = [];
  const push = (ch, t) => {
    const dernier = out[out.length - 1];
    if (dernier && dernier.t === t) dernier.ch += ch;
    else out.push({ ch, t });
  };

  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (memes(a[i], b[j])) {
      push(a[i], a[i] === b[j] ? "ok" : "accent");
      i++; j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      push(a[i], "trop");
      i++;
    } else {
      j++;
    }
  }
  while (i < n) { push(a[i], "trop"); i++; }
  return out;
}
