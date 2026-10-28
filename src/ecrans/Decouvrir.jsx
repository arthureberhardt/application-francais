import React, { useState, useEffect } from "react";
import { Ecouter } from "./Outils.jsx";
import { Ligne } from "./Commun.jsx";
import { NOM_CATEGORIE } from "../lib/items.js";
import { lire } from "../lib/voix.js";

const LOT = 8;

/* Les fiches de l'unité, une à une, par lots de huit. Personne n'interroge :
   on regarde, on écoute, puis on passe à l'entraînement. Les mots déjà
   travaillés passent en dernier. */
export default function Decouvrir({ unite, progression, decouverts, onMarquer, onFin, onEntrainer }) {
  const [ordre] = useState(() => {
    const neufs = unite.lexique.filter((i) => !decouverts.has(i.cle) && !(progression[i.cle]?.essais > 0));
    const autres = unite.lexique.filter((i) => !neufs.includes(i));
    return [...neufs, ...autres];
  });
  const restants = ordre.filter((i) => !decouverts.has(i.cle) && !(progression[i.cle]?.essais > 0)).length;
  const lot = ordre.slice(0, LOT);
  const [k, setK] = useState(0);
  const item = lot[k];

  useEffect(() => {
    const t = setTimeout(() => item && lire(item.fr), 250);
    return () => clearTimeout(t);
  }, [k]); // eslint-disable-line

  if (!item) return null;
  const dernier = k === lot.length - 1;
  const terminer = () => { onMarquer(lot.map((i) => i.cle)); };

  return (
    <>
      <div className="bar">
        <div className="wrap barIn">
          <button className="lien" onClick={onFin}>← {unite.titre}</button>
          <span className="note" style={{ fontSize: 12.5 }}>{k + 1} / {lot.length}</span>
        </div>
        <div className="prog"><div className="progIn" style={{ width: `${((k + 1) / lot.length) * 100}%` }} /></div>
      </div>

      <div className="main wrap" style={{ maxWidth: 560 }}>
        <div className="fiche apparait" key={item.cle}>
          <p className="ficheCat">{NOM_CATEGORIE[item.cat] || ""}{item.duCours ? " · lexique du cours" : ""}</p>
          <div className="ficheMot">
            <span className="dsp">{item.fr}</span>
            <Ecouter texte={item.fr} />
          </div>
          <p className="ficheDe">{item.de}</p>
          {item.exemple && (
            <p className="ficheExemple">
              <span>{item.exemple}</span>
              <Ecouter texte={item.exemple} />
            </p>
          )}
          <div style={{ display: "grid", gap: 6, marginTop: 14 }}>
            {item.construction && <Ligne libelle="Construction" valeur={item.construction} />}
            {item.piege && <Ligne libelle="À retenir" valeur={item.piege} />}
            {item.famille && <Ligne libelle="Même famille" valeur={item.famille} />}
            {item.syn && <Ligne libelle="Synonyme" valeur={item.syn} />}
            {item.ant && <Ligne libelle="Contraire" valeur={item.ant} />}
          </div>
        </div>

        <div className="ficheNav">
          <button className="btn2" disabled={k === 0} onClick={() => setK(k - 1)}>Précédent</button>
          {dernier ? (
            <button className="btn" onClick={() => { terminer(); onEntrainer(lot); }}>
              M'entraîner sur ces {lot.length} mots
            </button>
          ) : (
            <button className="btn" onClick={() => setK(k + 1)}>Suivant</button>
          )}
        </div>
        {dernier && (
          <button className="lienTexte" style={{ marginTop: 14 }} onClick={() => { terminer(); onFin(); }}>
            Plus tard : revenir à l'unité
          </button>
        )}
        {restants > lot.length && (
          <p className="note" style={{ marginTop: 18, fontSize: 12.5 }}>
            Encore {restants - lot.length} mots à découvrir dans cette unité après ce lot.
          </p>
        )}
      </div>
    </>
  );
}
