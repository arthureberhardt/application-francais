import React, { useState } from "react";
import { enLigne, diagnostic, codeValide } from "../lib/store.js";
import { FILIERES } from "../donnees/index.js";

function Diagnostic() {
  const d = diagnostic();
  const ligne = (ok, texte) => (
    <div style={{ display: "flex", gap: 7, alignItems: "flex-start", marginTop: 5 }}>
      <span style={{ color: ok ? "var(--vert)" : "var(--rouge)", fontWeight: 700 }}>
        {ok ? "✓" : "✗"}
      </span>
      <span>{texte}</span>
    </div>
  );
  return (
    <details className="diag">
      <summary>Vos résultats restent seulement sur cet appareil. Pourquoi ?</summary>
      <div style={{ marginTop: 10 }}>
        {ligne(d.url, d.url ? "VITE_SUPABASE_URL est lue" : "VITE_SUPABASE_URL n'est pas lue")}
        {d.url && ligne(d.urlValide, d.urlValide
          ? "l'adresse a la bonne forme"
          : "l'adresse ne ressemble pas à https://xxxxx.supabase.co")}
        {ligne(d.cle, d.cle ? `clé lue — forme : ${d.cleForme}` : "VITE_SUPABASE_ANON_KEY n'est pas lue")}
      </div>
      <ol style={{ margin: "12px 0 0", paddingLeft: 18, lineHeight: 1.75 }}>
        <li>Le fichier doit s'appeler exactement <code>.env</code> et se trouver
            <strong> à la racine</strong> du projet, à côté de <code>package.json</code> —
            pas dans <code>src/</code>.</li>
        <li>Pas de guillemets, pas d'espace autour du signe égal.</li>
        <li>Arrêtez le serveur et relancez <code>npm run dev</code> : Vite ne lit
            ce fichier qu'au démarrage.</li>
        <li>Sur le site en ligne, les variables se règlent dans Vercel, puis il
            faut redéployer.</li>
      </ol>
    </details>
  );
}

export default function Connexion({ onEntrer, onEnseignant }) {
  const [v, setV] = useState("");
  const [filiere, setFiliere] = useState(null);
  const [verif, setVerif] = useState(false);
  const [erreur, setErreur] = useState(null);
  const valide = /^[A-Z0-9-]{3,32}$/.test(v.trim());
  const troplong = v.trim().length > 32;

  const entrer = async () => {
    if (!valide || verif) return;
    setErreur(null);
    setVerif(true);
    const c = v.trim();
    const res = await codeValide(c);
    setVerif(false);
    if (!res.ok) {
      setErreur("Ce code n'est pas reconnu. Vérifiez auprès de votre enseignant.");
      return;
    }
    // si le serveur connaît la filière de ce code, elle prime sur le choix
    // manuel — utile si l'élève s'est trompé de bouton
    const f = res.filiere || filiere;
    if (!f) { setErreur("Choisissez d'abord votre classe."); return; }
    onEntrer(c, f, res.semestreMax);
  };

  return (
    <div className="wrap" style={{ paddingTop: 64, maxWidth: 460 }}>
      <div className="sur">Gymnasium Oberwil · français</div>
      <h1 className="dsp h1" style={{ margin: "12px 0 6px" }}>
        Vocabulaire<br />et verbes
      </h1>
      <p className="note" style={{ marginBottom: 20 }}>
        Entrez le code que votre enseignant vous a donné.
        Il n'y a ni nom, ni adresse, ni mot de passe : ce code garde vos résultats.
      </p>

      <div className="sur" style={{ marginBottom: 8 }}>Votre classe</div>
      <div className="choixFiliere">
        {FILIERES.map((f) => (
          <button key={f.cle}
            className={"carteFiliere" + (filiere === f.cle ? " on" : "")}
            onClick={() => { setFiliere(f.cle); setErreur(null); }}>
            <span className="carteFiliereNom">{f.nom}</span>
            <span className="carteFiliereSous">
              {f.semestres.length} semestres · niveau {f.sortie}
            </span>
          </button>
        ))}
      </div>

      <input
        className="champ mono"
        value={v}
        autoFocus
        onChange={(e) => { setV(e.target.value.toUpperCase()); setErreur(null); }}
        onKeyDown={(e) => e.key === "Enter" && entrer()}
        placeholder="OB-3A-07"
        style={{ letterSpacing: ".1em", marginBottom: 12 }}
      />
      <button className="btn" disabled={!valide || verif} onClick={entrer}>
        {verif ? "Vérification…" : "Commencer"}
      </button>

      {erreur && (
        <p className="note" style={{ marginTop: 10, fontSize: 12.5, color: "var(--rouge)" }}>
          {erreur}
        </p>
      )}
      {!erreur && v.trim() && !valide && (
        <p className="note" style={{ marginTop: 10, fontSize: 12.5, color: "var(--rouge)" }}>
          {troplong
            ? "Ce code est trop long (32 caractères maximum)."
            : "Le code ne peut contenir que des lettres, des chiffres et des tirets, sur au moins 3 caractères."}
        </p>
      )}
      {!erreur && !filiere && (
        <p className="note" style={{ marginTop: 10, fontSize: 12.5 }}>
          Choisissez d'abord votre classe. En cas de doute, demandez à votre enseignant.
        </p>
      )}

      {enLigne ? (
        <p className="note" style={{ marginTop: 18, fontSize: 12 }}>
          Votre progression est enregistrée et vous suit d'un appareil à l'autre.
        </p>
      ) : (
        <Diagnostic />
      )}

      <button className="lienTexte" style={{ marginTop: 26, fontSize: 12 }}
        onClick={onEnseignant}>
        Espace enseignant
      </button>
    </div>
  );
}
