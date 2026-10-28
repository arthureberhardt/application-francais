import React, { useMemo, useEffect, useState } from "react";
import { listeSemestres, filiereActive, itemsCumules } from "../lib/items.js";
import { estDu, categorie } from "../lib/leitner.js";
import { unitesDe, avancementUnite, uniteCourante, nomSemestre } from "../lib/saison.js";
import { calculerSerie, quatorzeJours } from "../lib/serie.js";
import { objectifClasse } from "../lib/store.js";
import { estInstallee } from "./Installer.jsx";

/* L'accueil : une séance du jour, puis la saison dessinée comme une ligne
   de métro — chaque unité est une station. */
export default function Saison({
  code, semestre, setSemestre, semestreMax, progression, decouverts, jours,
  onJour, onUnite, onCarnet, onInstaller, onQuitter,
}) {
  const unites = unitesDe(semestre);
  const courante = uniteCourante(semestre, progression, decouverts);
  const etats = useMemo(
    () => Object.fromEntries(unites.map((u) => [u.id, avancementUnite(u, progression, decouverts)])),
    [unites, progression, decouverts]
  );
  const { serie, aujourdhui } = calculerSerie(jours);
  const points = quatorzeJours(jours);

  const dus = useMemo(
    () => itemsCumules(semestre).filter((i) => estDu(progression[i.cle]) && categorie(progression[i.cle]) !== "acquis").length,
    [semestre, progression]
  );
  const etatCourante = courante ? etats[courante.id] : null;

  const [objectif, setObjectif] = useState(null);
  useEffect(() => { objectifClasse(code).then(setObjectif); }, [code]);

  return (
    <>
      <div className="bandeau bandeauSaison">
        <div className="wrap">
          <div className="bandeauHaut">
            <span className="code">{code}</span>
            <button className="lienClair" onClick={onQuitter}>Changer de code</button>
          </div>

          <div className="serie">
            <div className="serieN">
              <span className="dsp">{serie}</span>
              <span>{serie === 1 ? "jour de suite" : "jours de suite"}</span>
            </div>
            <div className="seriePoints" aria-label="Les 14 derniers jours">
              {points.map((on, i) => <span key={i} className={"seriePoint" + (on ? " on" : "")} />)}
            </div>
            <p className="serieNote">
              {aujourdhui
                ? "Fait pour aujourd'hui. À demain !"
                : serie > 0
                ? "Une séance aujourd'hui et la série continue."
                : "Une séance par jour suffit. Un oubli par semaine est pardonné."}
            </p>
          </div>

          {objectif && objectif.eleves > 0 && <ObjectifClasse o={objectif} />}
        </div>
      </div>

      <div className="main wrap mainSaison avecNav">
        <button className="seanceJour" onClick={onJour}>
          <span className="seanceJourTitre">Séance du jour</span>
          <span className="seanceJourDetail">
            12 questions, environ 5 minutes.{" "}
            {dus > 0 ? `${dus} élément${dus > 1 ? "s" : ""} à revoir` : "Rien d'urgent à revoir"}
            {courante && etatCourante && !etatCourante.valide ? `, et la suite de « ${courante.titre} ».` : "."}
          </span>
          <span className="seanceJourBouton">Commencer</span>
        </button>

        {!estInstallee() && (
          <button className="bandeInstaller" onClick={onInstaller}>
            Mettre l'application sur l'écran d'accueil
          </button>
        )}

        <div className="saisonTete">
          <div>
            <h2 className="saisonTitre">Saison {semestre}</h2>
            <p className="note" style={{ margin: 0 }}>{nomSemestre(semestre)}</p>
          </div>
          <div className="saisonChoix" role="group" aria-label="Choisir la saison">
            {listeSemestres().map((s) => {
              const verrou = Boolean(semestreMax) && s.numero > semestreMax;
              return (
                <button key={s.numero} disabled={verrou}
                  className={"saisonBtn" + (s.numero === semestre ? " on" : "")}
                  title={verrou ? "Pas encore ouvert par votre enseignant" : `Saison ${s.numero}`}
                  onClick={() => setSemestre(s.numero)}>
                  {s.numero}
                </button>
              );
            })}
          </div>
        </div>

        <ol className="ligne">
          {unites.map((u) => {
            const e = etats[u.id];
            const estCourante = courante && u.id === courante.id;
            const classe = e.valide ? "valide" : estCourante ? "courante" : e.commencee ? "commencee" : "";
            return (
              <li key={u.id} className={"station " + classe + (u.facultative ? " facultative" : "")}>
                <button className="stationBtn" onClick={() => onUnite(u.id)}>
                  <span className="stationPoint" aria-hidden="true" />
                  <span className="stationCorps">
                    <span className="stationTitre">
                      {u.complete && <span className="stationNum">{u.numero}</span>}
                      {u.titre}
                    </span>
                    <span className="stationSous">
                      {u.facultative ? "Facultatif · " : ""}
                      {e.valide
                        ? "Unité validée"
                        : e.commencee && e.prochaine
                        ? `Prochaine étape : ${e.prochaine.nom.toLowerCase()}`
                        : u.sous}
                    </span>
                    {e.commencee && !e.valide && (
                      <span className="stationJauge"><span style={{ width: `${Math.round((e.vus / e.total) * 100)}%` }} /></span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {!unites.some((u) => u.complete) && (
          <p className="note">
            Cette saison n'est pas encore découpée en unités complètes : vous y trouvez les mots et
            les verbes par thème. Les exercices de grammaire et de phrases arrivent.
          </p>
        )}

        <p className="note" style={{ marginTop: 22, fontSize: 12.5 }}>
          Filière : {filiereActive().nom}. Vos progrès, la liste des mots et la grille des verbes sont dans le{" "}
          <button className="lienTexte" onClick={onCarnet}>carnet</button>.
        </p>
      </div>
    </>
  );
}

function ObjectifClasse({ o }) {
  const part = Math.min(100, Math.round((o.seances_mois / Math.max(1, o.objectif_mois)) * 100));
  return (
    <div className="objectif">
      <div className="objectifTexte">
        <span>Objectif de la {o.classe} ce mois-ci</span>
        <span className="objectifN">{o.seances_mois} / {o.objectif_mois} séances</span>
      </div>
      <div className="objectifJauge"><span style={{ width: `${part}%` }} /></div>
      <p className="serieNote">
        {o.actifs_semaine} élève{o.actifs_semaine > 1 ? "s" : ""} sur {o.eleves} ont travaillé cette semaine.
        Chaque séance compte pour toute la classe.
      </p>
    </div>
  );
}
