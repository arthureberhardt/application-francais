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
