/* Un petit conjugueur pour les verbes réguliers ajoutés par les saisons.
   Il produit exactement le format de verbes.js. Les verbes irréguliers
   restent écrits à la main (verbes_ajouts.js).

   er(inf, de, options) — verbes en -er, avec leurs particularités
     d'orthographe : -cer, -ger, e/é + consonne + er, -eler/-eter doublés
     (options.double), -yer.
   ir(inf, de, options) — verbes en -ir du type finir.
   options : { aux: "être", participe, futur: radical irrégulier }        */

const VOYELLE = /^[aeiouyhâàéèêîïôûœ]/i;
const PRON = ["me", "te", "se", "nous", "vous", "se"];
const PRON_IMP = ["toi", "nous", "vous"];
const elide = (p, forme) => (VOYELLE.test(forme) && p.length === 2 && p !== "se" ? p[0] + "'" + forme : VOYELLE.test(forme) && p === "se" ? "s'" + forme : `${p} ${forme}`);

function pronominaliser(v) {
  const out = { ...v, pronominal: true, aux: "être" };
  for (const t of ["present", "imparfait", "futur", "conditionnel", "subjonctif"]) {
    out[t] = v[t].map((f, i) => elide(PRON[i], f));
  }
  out.imperatif = v.imperatif.map((f, i) => `${f}-${PRON_IMP[i]}`);
  out.participepresent = [elide("se", v.participepresent[0])];
  return out;
}

export function er(infComplet, de, o = {}) {
  const pron = /^(se |s')/.test(infComplet);
  const inf = infComplet.replace(/^(se |s')/, "");
  const r = inf.slice(0, -2);
  // radicaux : fort (je, tu, il, ils) et faible (nous, vous)
  let fort = r, faible = r, futur = inf;
  const m = r.match(/^(.*)([eé])([^aeiouyéè]+)$/);
  if (/yer$/.test(inf)) {
    fort = r.slice(0, -1) + "i";
    futur = o.futur ? o.futur : /ayer$/.test(inf) ? inf : r.slice(0, -1) + "ier";
  } else if (m && m[2] === "e") {
    if (o.double) { fort = r + m[3].slice(-1); futur = fort + "er"; }
    else { fort = m[1] + "è" + m[3]; futur = fort + "er"; }
  } else if (m && m[2] === "é") {
    fort = m[1] + "è" + m[3];
  }
  if (o.futur) futur = o.futur;
  const nous = /cer$/.test(inf) ? r.slice(0, -1) + "ç" : /ger$/.test(inf) ? r + "e" : r;
  const impA = /cer$/.test(inf) ? r.slice(0, -1) + "ç" : /ger$/.test(inf) ? r + "e" : r;
  const v = {
    inf: infComplet, de, aux: o.aux || "avoir", participe: o.participe || r + "é", pronominal: false, impersonnel: false,
    present: [fort + "e", fort + "es", fort + "e", nous + "ons", faible + "ez", fort + "ent"],
    imperatif: [fort + "e", nous + "ons", faible + "ez"],
    imparfait: [impA + "ais", impA + "ais", impA + "ait", r + "ions", r + "iez", impA + "aient"],
    futur: ["ai", "as", "a", "ons", "ez", "ont"].map((t) => futur + t),
    conditionnel: ["ais", "ais", "ait", "ions", "iez", "aient"].map((t) => futur + t),
    subjonctif: [fort + "e", fort + "es", fort + "e", r + "ions", r + "iez", fort + "ent"],
    participepresent: [nous + "ant"],
  };
  return pron ? pronominaliser(v) : v;
}

export function ir(infComplet, de, o = {}) {
  const pron = /^(se |s')/.test(infComplet);
  const inf = infComplet.replace(/^(se |s')/, "");
  const r = inf.slice(0, -2);
  const v = {
    inf: infComplet, de, aux: o.aux || "avoir", participe: o.participe || r + "i", pronominal: false, impersonnel: false,
    present: ["is", "is", "it", "issons", "issez", "issent"].map((t) => r + t),
    imperatif: ["is", "issons", "issez"].map((t) => r + t),
    imparfait: ["issais", "issais", "issait", "issions", "issiez", "issaient"].map((t) => r + t),
    futur: ["ai", "as", "a", "ons", "ez", "ont"].map((t) => inf + t),
    conditionnel: ["ais", "ais", "ait", "ions", "iez", "aient"].map((t) => inf + t),
    subjonctif: ["isse", "isses", "isse", "issions", "issiez", "issent"].map((t) => r + t),
    participepresent: [r + "issant"],
  };
  return pron ? pronominaliser(v) : v;
}

/* Un verbe irrégulier écrit à la main, avec le pronom réfléchi ajouté si besoin. */
export function irr(v) {
  const pron = /^(se |s')/.test(v.inf);
  const base = { pronominal: false, impersonnel: false, ...v };
  return pron ? { ...pronominaliser(base), inf: v.inf } : base;
}

/* Un verbe formé sur un autre par un préfixe (revenir sur venir…). */
export function prefixe(source, pre, inf, de, o = {}) {
  const map = (l) => l.map((f) => pre + f);
  return {
    ...source, inf, de, ...o,
    participe: o.participe || pre + source.participe,
    present: map(source.present), imperatif: map(source.imperatif), imparfait: map(source.imparfait),
    futur: map(source.futur), conditionnel: map(source.conditionnel), subjonctif: map(source.subjonctif),
    participepresent: map(source.participepresent),
  };
}
