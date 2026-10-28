import React, { useState, useEffect } from "react";
import { envoyerProduction, enLigne } from "../lib/store.js";

/* La mini-production du défi : un court texte avec des éléments imposés,
   une liste de contrôle, puis l'envoi à l'enseignant. Le modèle n'apparaît
   qu'après l'envoi — sinon on le recopie. */
/* Sert pour trois textes : le défi d'une unité, le carnet de lecture d'une
   station de lecture, et l'entraînement à une évaluation.
   tache = { consigne, motsImposes?, controle, modele, titre? }
   cible = ce qui est enregistré côté enseignant (unité, station ou évaluation). */
export default function Production({ unite, code, onFin, tache, cible, titre, onEnvoye, minimum = 30 }) {
  const d = tache || unite.defi;
  const id = cible || unite.id;
  const cleBrouillon = `fle:brouillon:${code}:${id}`;
  const [texte, setTexte] = useState(() => {
    try { return localStorage.getItem(cleBrouillon) || ""; } catch { return ""; }
  });
  const [coches, setCoches] = useState([]);
  const [etat, setEtat] = useState(null); // null | "envoi" | "envoye" | "erreur" | "horsligne"

  useEffect(() => {
    try { localStorage.setItem(cleBrouillon, texte); } catch {}
  }, [texte]); // eslint-disable-line

  const mots = texte.trim() ? texte.trim().split(/\s+/).length : 0;
  const pret = mots >= minimum && coches.length === d.controle.length;

  const envoyer = async () => {
    if (!enLigne) { setEtat("horsligne"); return; }
    setEtat("envoi");
    const r = await envoyerProduction(code, id, d.consigne, texte.trim());
    if (r.erreur) { setEtat("erreur"); return; }
    try { localStorage.removeItem(cleBrouillon); } catch {}
    setEtat("envoye");
    onEnvoye && onEnvoye();
  };

  return (
    <>
      <div className="bar">
        <div className="wrap barIn">
          <button className="lien" onClick={onFin}>← {unite.titre}</button>
          <span className="note" style={{ fontSize: 12.5 }}>{mots} mot{mots > 1 ? "s" : ""}</span>
        </div>
      </div>

      <div className="main wrap" style={{ maxWidth: 620 }}>
        <h1 className="uniteTitre" style={{ fontSize: 28 }}>{titre || d.titre || "Votre texte"}</h1>
        <p className="consigne">{d.consigne}</p>

        {d.motsImposes?.length > 0 && <div className="imposes">
          <span className="note">À utiliser :</span>
          {d.motsImposes.map((m) => {
            const present = texte.toLowerCase().includes(m.split(/[ /]/)[0].toLowerCase().replace(/\+.*$/, ""));
            return <span key={m} className={"impose" + (present ? " ok" : "")}>{m}</span>;
          })}
        </div>}

        {etat !== "envoye" && (
          <>
            <textarea className="champ zoneTexte" value={texte} rows={10}
              placeholder="Écrivez ici. Votre brouillon est gardé sur cet appareil."
              onChange={(e) => setTexte(e.target.value)} spellCheck={false} />

            <div className="controle">
              <p className="h2" style={{ fontSize: 16, margin: "0 0 8px" }}>Avant d'envoyer, je vérifie :</p>
              {d.controle.map((c, i) => (
                <label key={i} className="controleLigne">
                  <input type="checkbox" checked={coches.includes(i)}
                    onChange={(e) => setCoches(e.target.checked ? [...coches, i] : coches.filter((x) => x !== i))} />
                  <span>{c}</span>
                </label>
              ))}
            </div>

            <button className="btn" disabled={!pret || etat === "envoi"} onClick={envoyer}>
              {etat === "envoi" ? "Envoi…" : "Envoyer à mon enseignant"}
            </button>
            {!pret && (
              <p className="note" style={{ marginTop: 10, fontSize: 12.5 }}>
                Au moins {minimum} mots, et toutes les cases cochées.
              </p>
            )}
            {etat === "erreur" && (
              <p className="note" style={{ color: "var(--rouge)", marginTop: 10 }}>
                L'envoi n'a pas fonctionné. Votre texte est gardé : réessayez dans un moment.
              </p>
            )}
            {etat === "horsligne" && (
              <p className="note" style={{ color: "var(--rouge)", marginTop: 10 }}>
                L'application n'est pas reliée à la base de données sur cet appareil. Copiez votre texte et
                envoyez-le à votre enseignant par un autre moyen.
              </p>
            )}
          </>
        )}

        {etat === "envoye" && (
          <div className="apparait">
            <div className="envoye">Envoyé. Votre enseignant le lira ; son retour apparaîtra ici, dans l'unité.</div>
            {d.modele && <>
            <h2 className="h2" style={{ margin: "22px 0 8px" }}>Un exemple de texte réussi</h2>
            <p className="modele">{d.modele}</p></>}
            <p className="note" style={{ fontSize: 12.5 }}>
              Comparez : qu'est-ce que le modèle fait que votre texte ne fait pas encore ?
            </p>
            <button className="btn" style={{ marginTop: 16 }} onClick={onFin}>Retour à l'unité</button>
          </div>
        )}
      </div>
    </>
  );
}
