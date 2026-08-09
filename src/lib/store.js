/* Enregistrement de la progression.

   Deux modes, choisis automatiquement :
   — si VITE_SUPABASE_URL est renseigné dans .env, la progression va dans
     Supabase et suit l'élève d'un appareil à l'autre ;
   — sinon, elle reste dans le navigateur (localStorage).

   L'application fonctionne complètement sans Supabase. Branchez-le plus tard. */

import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const cle = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const enLigne = Boolean(url && cle);
const sb = enLigne ? createClient(url, cle) : null;

/* Diagnostic — pour savoir précisément ce qui manque quand la base n'est pas
   atteinte. Vite ne lit le fichier .env qu'au démarrage, et uniquement à la
   racine du projet : c'est la cause la plus fréquente. */
export const diagnostic = () => ({
  url: Boolean(url),
  cle: Boolean(cle),
  urlValide: Boolean(url && /^https:\/\/[a-z0-9-]+\.supabase\.(co|in)$/.test(url.trim())),
  cleForme: !cle ? "absente"
    : cle.startsWith("eyJ") ? "ancienne (anon public)"
    : cle.startsWith("sb_publishable_") ? "nouvelle (publishable)"
    : cle.startsWith("sb_secret_") || cle.startsWith("service_role") ? "SECRÈTE — à ne jamais utiliser ici"
    : "forme inattendue",
});

const cleLocale = (code) => `fle:${code}`;
const lireLocal = (code) => {
  try {
    return JSON.parse(localStorage.getItem(cleLocale(code)) || "{}");
  } catch {
    return {};
  }
};

export async function chargerProgression(code) {
  if (!enLigne) return lireLocal(code);
  const { data, error } = await sb
    .from("progression")
    .select("cle, boite, ok, essais, echecs, du, maj")
    .eq("code", code);
  if (error) {
    console.error("Lecture Supabase impossible, bascule en local :", error.message);
    return lireLocal(code);
  }
  const out = {};
  for (const l of data) {
    out[l.cle] = {
      boite: l.boite, ok: l.ok, essais: l.essais,
      echecs: l.echecs || 0, du: Number(l.du),
      maj: l.maj ? new Date(l.maj).getTime() : 0,
    };
  }
  return out;
}

/** Enregistre un seul item — appelé après chaque réponse. */
export async function enregistrerItem(code, cle, etat, progComplete) {
  try {
    localStorage.setItem(cleLocale(code), JSON.stringify(progComplete));
  } catch {}
  if (!enLigne) return;
  const { error } = await sb.from("progression").upsert(
    {
      code, cle,
      boite: etat.boite, ok: etat.ok, essais: etat.essais,
      echecs: etat.echecs || 0, du: etat.du,
      maj: new Date(etat.maj || Date.now()).toISOString(),
    },
    { onConflict: "code,cle" }
  );
  if (error) console.error("Écriture Supabase impossible :", error.message);
}

/** La filière et le semestre choisis restent mémorisés sur l'appareil. */
export const lireFiliere = () => {
  try { return localStorage.getItem("fle:filiere") || null; } catch { return null; }
};
export const ecrireFiliere = (cle) => {
  try { localStorage.setItem("fle:filiere", cle); } catch {}
};

export const lireSemestre = () => Number(localStorage.getItem("fle:semestre") || 1);
export const ecrireSemestre = (n) => {
  try { localStorage.setItem("fle:semestre", String(n)); } catch {}
};

/* ─────────── Espace enseignant ─────────── */

/** Vérifie un code auprès de Supabase avant de laisser entrer.
    Si la table des codes n'existe pas encore (avant que enseignant.sql soit
    exécuté) ou si Supabase n'est pas branché, on laisse passer : c'est le
    comportement d'avant, pour ne rien casser pendant la mise en place. */
export async function codeValide(code) {
  if (!enLigne) return { ok: true, classe: null, filiere: null, semestreMax: null };
  const { data, error } = await sb.rpc("verifier_code", { p_code: code });
  if (error) {
    // fonction pas encore créée : on ne bloque personne pour autant
    if (error.code === "42883" || /function .* does not exist/i.test(error.message)) {
      return { ok: true, classe: null, filiere: null, semestreMax: null };
    }
    console.error("Vérification du code impossible :", error.message);
    return { ok: true, classe: null, filiere: null, semestreMax: null };
  }
  if (!data || !data.length) return { ok: false, classe: null, filiere: null, semestreMax: null };
  return {
    ok: true, classe: data[0].classe, filiere: data[0].filiere,
    semestreMax: data[0].semestre_max ?? null,
  };
}

export async function connexionEnseignant(email, motDePasse) {
  if (!sb) return { erreur: "Supabase n'est pas configuré." };
  const { data, error } = await sb.auth.signInWithPassword({ email, password: motDePasse });
  if (error) return { erreur: error.message };
  return { session: data.session };
}

export async function deconnexionEnseignant() {
  if (sb) await sb.auth.signOut();
}

export async function sessionEnseignant() {
  if (!sb) return null;
  const { data } = await sb.auth.getSession();
  return data.session;
}

export async function listerSuivi() {
  if (!sb) return { erreur: "Supabase n'est pas configuré." };
  const { data, error } = await sb.from("suivi_classes").select("*");
  if (error) return { erreur: error.message };
  return { lignes: data };
}

export async function ajouterCodes(lignes) {
  // lignes : [{ code, classe, filiere, annee, nom? }, …] — nom est facultatif
  // et n'est jamais lu par le parcours élève, seulement par ce tableau de bord.
  if (!sb) return { erreur: "Supabase n'est pas configuré." };
  const { error } = await sb.from("codes").insert(lignes);
  if (error) return { erreur: error.message };
  return { ok: true };
}

export async function activerCode(code, actif) {
  if (!sb) return { erreur: "Supabase n'est pas configuré." };
  const { error } = await sb.from("codes").update({ actif }).eq("code", code);
  if (error) return { erreur: error.message };
  return { ok: true };
}

/** Efface définitivement une liste de codes : leur progression, puis les
    codes eux-mêmes. Fonctionne pour une classe entière comme pour un seul
    élève — c'est l'appelant qui décide de la portée. Irréversible : l'écran
    qui l'appelle doit faire confirmer avant. */
export async function supprimerCodes(codes) {
  if (!sb) return { erreur: "Supabase n'est pas configuré." };
  if (!codes.length) return { ok: true };
  const p = await sb.from("progression").delete().in("code", codes);
  if (p.error) return { erreur: p.error.message };
  const c = await sb.from("codes").delete().in("code", codes);
  if (c.error) return { erreur: c.error.message };
  return { ok: true };
}

/** Fixe (ou lève, avec null) la limite de semestre d'une classe entière.
    Un élève ne peut alors plus ouvrir un semestre au-delà de cette valeur,
    ni depuis le sélecteur ni en modifiant l'adresse ou son stockage local :
    la limite est revérifiée à chaque tentative, pas seulement à l'écran. */
export async function definirSemestreMax(codes, semestreMax) {
  if (!sb) return { erreur: "Supabase n'est pas configuré." };
  if (!codes.length) return { ok: true };
  const { error } = await sb.from("codes").update({ semestre_max: semestreMax }).in("code", codes);
  if (error) return { erreur: error.message };
  return { ok: true };
}

/** Attache ou retire le nom d'un élève sur son code. Réservé à votre compte,
    comme le reste de la table « codes » ; jamais exposé côté élève. */
export async function renommerCode(code, nom) {
  if (!sb) return { erreur: "Supabase n'est pas configuré." };
  const { error } = await sb.from("codes").update({ nom: nom.trim() || null }).eq("code", code);
  if (error) return { erreur: error.message };
  return { ok: true };
}

/** Toutes les lignes de progression des élèves d'une classe, non résumées —
    nécessaire pour repérer ce qui résiste à l'ensemble de la classe, pas
    seulement à un élève. Ne contient ni nom ni donnée personnelle : juste
    des codes pseudonymes et des états de boîte. */
export async function listerProgressionClasse(codes) {
  if (!sb) return { erreur: "Supabase n'est pas configuré." };
  if (!codes.length) return { lignes: [] };
  const { data, error } = await sb
    .from("progression")
    .select("code, cle, boite, ok")
    .in("code", codes);
  if (error) return { erreur: error.message };
  return { lignes: data };
}
