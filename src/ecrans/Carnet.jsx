import React, { useMemo, useState } from "react";
import { itemsDe, tempsJusqua, verbesGroupes, verbesConsultables } from "../lib/items.js";
import { categorie, etatVerbe } from "../lib/leitner.js";
import { unitesDe, avancementUnite } from "../lib/saison.js";
import { badges } from "../lib/badges.js";
import Liste, { FicheVerbe } from "./Liste.jsx";
import { Fenetre, COULEUR, ETIQUETTE } from "./Commun.jsx";

/* Le carnet : consulter et voir ses progrès. Personne n'y interroge, sauf si
   l'élève lance lui-même un entraînement ciblé (un temps, l'examen blanc,
   les mots « pour aller plus loin »). */
export default function Carnet({ semestre, progression, decouverts, onLancer, onExamen }) {
  const [vue, setVue] = useState("progres");
  return (
    <div className="main wrap avecNav">
      <h1 className="pageTitre">Carnet</h1>
      <p className="note" style={{ margin: "0 0 16px" }}>Saison {semestre} : ce que vous savez déjà, et ce qui reste.</p>

      <div className="segments" role="tablist">
        {[["progres", "Progrès"], ["mots", "Mots"], ["verbes", "Verbes"]].map(([cle, nom]) => (
          <button key={cle} role="tab" aria-selected={vue === cle}
            className={"segment" + (vue === cle ? " on" : "")} onClick={() => setVue(cle)}>
            {nom}
          </button>
        ))}
      </div>

      {vue === "progres" && (
        <Progres semestre={semestre} progression={progression} decouverts={decouverts}
          onLancer={onLancer} onExamen={onExamen} />
      )}
      {vue === "mots" && <Liste semestre={semestre} progression={progression} integre ongletImpose="mots" />}
      {vue === "verbes" && <GrilleVerbes semestre={semestre} progression={progression} onLancer={onLancer} />}
    </div>
  );
}

function Progres({ semestre, progression, decouverts, onLancer, onExamen }) {
  const { lexique, verbes, approfondissement } = itemsDe(semestre);
  const verbesGr = verbesGroupes(semestre);
  const unites = unitesDe(semestre);
  const etats = unites.map((u) => ({ u, a: avancementUnite(u, progression, decouverts) }));
  const completes = unites.some((u) => u.complete);

  const mots = {
    acquis: lexique.filter((i) => categorie(progression[i.cle]) === "acquis").length,
    vus: lexique.filter((i) => categorie(progression[i.cle]) === "vu").length,
  };
  const verbesAcquis = verbesGr.filter((v) => etatVerbe(v.couples, progression) === "acquis").length;
  const liste = badges({
    progression, lexique, verbes,
    unites: completes ? [] : unites.map((u) => ({ nom: u.titre })),
    temps: tempsJusqua(semestre),
  });

  return (
    <>
      <div className="chiffres">
        <Chiffre n={mots.acquis} sur={lexique.length} titre="mots sus" detail={`${mots.vus} en cours`} />
        <Chiffre n={verbesAcquis} sur={verbesGr.length} titre="verbes maîtrisés" detail="à tous les temps vus" />
        {completes && (
          <Chiffre n={etats.filter((e) => e.a.valide && !e.u.facultative).length}
            sur={unites.filter((u) => !u.facultative).length} titre="unités validées" detail="défi réussi" />
        )}
      </div>
      <p className="note" style={{ fontSize: 12.5, margin: "8px 0 22px" }}>
        Un mot est « su » après cinq bonnes réponses données à des jours différents.
      </p>

      <div className="actionsCarnet">
        <button className="carteCarnet" onClick={onExamen}>
          <span className="carteCarnetTitre">Examen blanc</span>
          <span className="carteCarnetSous">40 questions en 20 minutes, sans aide, comme un vrai test. Vos résultats habituels ne changent pas.</span>
        </button>
        {approfondissement.length > 0 && (
          <button className="carteCarnet" onClick={() => onLancer("approfondissement", {})}>
            <span className="carteCarnetTitre">Pour aller plus loin</span>
            <span className="carteCarnetSous">{approfondissement.length} mots à comprendre en lisant. On ne vous demande jamais de les écrire.</span>
          </button>
        )}
      </div>

      <h2 className="sectionTitre">Récompenses</h2>
      <p className="note" style={{ margin: "0 0 12px" }}>
        Elles arrivent toutes seules. Il n'y a aucun classement entre élèves.
      </p>
      <div className="grilleBadges">
        {liste.map((b) => (
          <div key={b.cle} className={"badge" + (b.obtenu ? " obtenu" : "")}>
            <div className="badgeRond">
              <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
                <circle cx="20" cy="20" r="17" fill="none" stroke="var(--trait)" strokeWidth="3.5" />
                <circle cx="20" cy="20" r="17" fill="none"
                  stroke={b.obtenu ? "var(--vert)" : "var(--encre)"} strokeWidth="3.5"
                  strokeLinecap="round" transform="rotate(-90 20 20)"
                  strokeDasharray={2 * Math.PI * 17}
                  strokeDashoffset={2 * Math.PI * 17 * (1 - b.progres)} />
              </svg>
              {b.obtenu && <span className="badgeCoche">✓</span>}
            </div>
            <div className="badgeNom">{b.nom}</div>
            <div className="badgeDetail">{b.detail}</div>
          </div>
        ))}
      </div>
    </>
  );
}

const Chiffre = ({ n, sur, titre, detail }) => (
  <div className="chiffre">
    <div className="chiffreN"><span>{n}</span><span className="chiffreSur">/{sur}</span></div>
    <div className="chiffreTitre">{titre}</div>
    <div className="chiffreDetail">{detail}</div>
  </div>
);

/* La grille verbe × temps : chaque case se colore à mesure que la forme est
   maîtrisée. On voit d'un coup d'œil « mon présent tient, mon imparfait non ». */
function GrilleVerbes({ semestre, progression, onLancer }) {
  const temps = tempsJusqua(semestre);
  const verbes = verbesGroupes(semestre);
  const fiches = useMemo(() => Object.fromEntries(verbesConsultables(semestre).map((v) => [v.inf, v])), [semestre]);
  const [ouvert, setOuvert] = useState(null);

  if (!verbes.length) return <p className="note">Pas encore de verbes dans cette saison.</p>;

  return (
    <>
      <div className="legende">
        {["inconnu", "vu", "acquis"].map((c) => (
          <span key={c}><span className="pastille" style={{ background: COULEUR[c] }} /> {ETIQUETTE[c]}</span>
        ))}
      </div>
      <div className="grilleDefil">
        <table className="grilleVerbes">
          <thead>
            <tr>
              <th scope="col">Verbe</th>
              {temps.map((t) => <th key={t.cle} scope="col">{t.nom}</th>)}
            </tr>
          </thead>
          <tbody>
            {verbes.map((v) => (
              <tr key={v.inf}>
                <th scope="row">
                  <button className="lienVerbe" onClick={() => setOuvert(fiches[v.inf] || null)}>{v.inf}</button>
                </th>
                {temps.map((t) => {
                  const c = v.couples.find((x) => x.tempsCle === t.cle);
                  const etat = c ? categorie(progression[c.cle]) : null;
                  return (
                    <td key={t.cle}>
                      {etat && <span className={"caseVerbe " + etat} title={`${v.inf}, ${t.nom} : ${ETIQUETTE[etat]}`} />}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="sectionTitre">S'entraîner sur un temps</h2>
      <div className="tempsBoutons">
        {temps.map((t) => (
          <button key={t.cle} className="btn2" onClick={() => onLancer("verbes", { tempsCles: [t.cle], titre: t.nom })}>
            {t.nom}
          </button>
        ))}
        <button className="btn2" onClick={() => onLancer("verbes", { titre: "tous les temps" })}>tous les temps</button>
      </div>

      {ouvert && (
        <Fenetre titre={ouvert.inf} sous={ouvert.de} onFermer={() => setOuvert(null)}>
          <FicheVerbe v={ouvert} progression={progression} />
        </Fenetre>
      )}
    </>
  );
}
