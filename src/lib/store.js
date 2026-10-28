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

  // Rattrapage : tout ce qui existe en local mais pas sur le serveur — ou en
  // local avec une mise à jour plus récente — vient d'une période où
  // l'écriture avait échoué (ex. colonne manquante). On le pousse d'un coup,
  // silencieusement, sans attendre que l'élève retombe un jour sur ces mots.
  const local = lireLocal(code);
  const aEnvoyer = Object.entries(local).filter(([cle, etat]) => {
    const distant = out[cle];
    return !distant || (etat.maj || 0) > (distant.maj || 0);
  });
  if (aEnvoyer.length) {
    const lignes = aEnvoyer.map(([cle, etat]) => ({
      code, cle,
      boite: etat.boite, ok: etat.ok, essais: etat.essais,
      echecs: etat.echecs || 0, du: etat.du,
      maj: new Date(etat.maj || Date.now()).toISOString(),
    }));
    const { error: errRattrapage } = await sb
      .from("progression").upsert(lignes, { onConflict: "code,cle" });
    if (errRattrapage) {
      console.error("Rattrapage impossible :", errRattrapage.message);
    } else {
      for (const [cle, etat] of aEnvoyer) out[cle] = etat;
    }
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

/* ─────────── Mots proposés par les élèves ─────────── */

/** Un élève signale qu'un mot devrait être accepté. `fr` est purement
    informatif — ça évite à l'enseignant de devoir rouvrir la fiche pour
    savoir de quel mot il s'agit en la validant. */
export async function proposerMot(code, cle, mot, fr) {
  if (!sb) return { erreur: "Supabase n'est pas configuré." };
  const { error } = await sb.from("suggestions").insert({ code, cle, mot, fr });
  if (error) return { erreur: error.message };
  return { ok: true };
}

export async function listerSuggestions() {
  if (!sb) return { erreur: "Supabase n'est pas configuré." };
  const { data, error } = await sb
    .from("suggestions").select("*")
    .eq("statut", "attente").order("cree", { ascending: false });
  if (error) return { erreur: error.message };
  return { lignes: data };
}

/** Valider une proposition l'ajoute immédiatement aux mots acceptés, sans
    toucher au contenu de l'application ni redéploiement. */
export async function validerSuggestion(id, cle, mot) {
  if (!sb) return { erreur: "Supabase n'est pas configuré." };
  const up = await sb.from("synonymes_valides").upsert({ cle, mot });
  if (up.error) return { erreur: up.error.message };
  const { error } = await sb.from("suggestions").update({ statut: "validee" }).eq("id", id);
  if (error) return { erreur: error.message };
  return { ok: true };
}

export async function rejeterSuggestion(id) {
  if (!sb) return { erreur: "Supabase n'est pas configuré." };
  const { error } = await sb.from("suggestions").update({ statut: "rejetee" }).eq("id", id);
  if (error) return { erreur: error.message };
  return { ok: true };
}

/** Chargée une fois à la connexion, comme la progression : tous les mots
    déjà validés par l'enseignant, groupés par fiche. */
export async function chargerSynonymesValides() {
  if (!sb) return {};
  const { data, error } = await sb.from("synonymes_valides").select("cle, mot");
  if (error) { console.error("Chargement des mots validés impossible :", error.message); return {}; }
  const out = {};
  for (const l of data) (out[l.cle] = out[l.cle] || []).push(l.mot);
  return out;
}

/* ─────────── Refonte 2026 : séances, objectif de classe, productions ─────────── */

/* Les jours travaillés sont gardés sur l'appareil (pour la série) et, en
   ligne, comptés dans « activite » pour l'objectif collectif de la classe.
   Rien de nominatif : un code, un jour, un nombre de séances. */
const cleJours = (code) => `fle:jours:${code}`;
const aujourdhuiISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
export function lireJours(code) {
  try { return new Set(JSON.parse(localStorage.getItem(cleJours(code)) || "[]")); } catch { return new Set(); }
}
export async function noterSeance(code, questions) {
  const jours = lireJours(code);
  jours.add(aujourdhuiISO());
  try { localStorage.setItem(cleJours(code), JSON.stringify([...jours].sort().slice(-120))); } catch {}
  if (!enLigne) return;
  const { error } = await sb.rpc("noter_seance", { p_code: code, p_questions: questions });
  if (error) console.error("Séance non comptée :", error.message);
}

/** L'objectif de la classe : null si la base n'est pas branchée ou si la
    fonction n'existe pas encore (avant refonte2026.sql). */
export async function objectifClasse(code) {
  if (!enLigne) return null;
  const { data, error } = await sb.rpc("objectif_classe", { p_code: code });
  if (error || !data || !data.length) return null;
  return data[0];
}

/* Les jours où l'élève a travaillé, d'après le serveur — pour que la série
   suive d'un appareil à l'autre. */
export async function joursServeur(code) {
  if (!enLigne) return [];
  const { data, error } = await sb.rpc("mes_jours", { p_code: code });
  if (error || !data) return [];
  return data.map((l) => l.jour);
}

export async function envoyerProduction(code, unite, consigne, texte) {
  if (!enLigne) return { erreur: "hors ligne" };
  const { error } = await sb.from("productions").insert({ code, unite, consigne, texte });
  if (error) return { erreur: error.message };
  return { ok: true };
}

export async function mesProductions(code) {
  if (!enLigne) return [];
  const { data, error } = await sb.rpc("mes_productions", { p_code: code });
  if (error || !data) return [];
  return data;
}

export async function listerProductions() {
  if (!sb) return { erreur: "Supabase n'est pas configuré." };
  const { data, error } = await sb.from("productions").select("*").order("cree", { ascending: false }).limit(400);
  if (error) return { erreur: error.message };
  return { lignes: data };
}

export async function commenterProduction(id, commentaire) {
  if (!sb) return { erreur: "Supabase n'est pas configuré." };
  const { error } = await sb.from("productions")
    .update({ commentaire: commentaire.trim() || null, statut: "lue", lue: new Date().toISOString() })
    .eq("id", id);
  if (error) return { erreur: error.message };
  return { ok: true };
}

/* Le lexique ajouté par l'enseignant (lectures en cours). Lisible par tous :
   c'est du contenu de cours, pas une donnée d'élève. */
export async function chargerFichesCours() {
  if (!enLigne) return [];
  const { data, error } = await sb.from("fiches_cours").select("*").eq("actif", true).order("id");
  if (error || !data) return [];
  return data;
}

export async function ajouterFicheCours(f) {
  if (!sb) return { erreur: "Supabase n'est pas configuré." };
  const { error } = await sb.from("fiches_cours").insert(f);
  if (error) return { erreur: error.message };
  return { ok: true };
}

export async function retirerFicheCours(id) {
  if (!sb) return { erreur: "Supabase n'est pas configuré." };
  const { error } = await sb.from("fiches_cours").update({ actif: false }).eq("id", id);
  if (error) return { erreur: error.message };
  return { ok: true };
}
