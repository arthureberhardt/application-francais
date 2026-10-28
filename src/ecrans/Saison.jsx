import React, { useMemo, useEffect, useState } from "react";
import { listeSemestres, filiereActive, itemsCumules } from "../lib/items.js";
import { estDu, categorie } from "../lib/leitner.js";
import {
  unitesDe, lectureDe, avancementUnite, uniteCourante, stationLectureCourante, saisonDe, nomSemestre,
} from "../lib/saison.js";
import { calculerSerie, quatorzeJours } from "../lib/serie.js";
import { objectifClasse, ciblesClasse } from "../lib/store.js";
import { estInstallee } from "./Installer.jsx";

const dateCourte = (d) => new Date(d).toLocaleDateString("fr-CH", { day: "numeric", month: "short" });

/* L'accueil : la plaque de la saison, la séance du jour, puis le plan de la
   ligne — les unités en stations, et la ligne de lecture en correspondance. */
export default function Saison({
  code, semestre, setSemestre, semestreMax, progression, decouverts, jours,
  onJour, onUnite, onCarnet, onInstaller, onQuitter,
}) {
  const unites = unitesDe(semestre);
  const lecture = lectureDe(semestre);
  const saison = saisonDe(semestre);
  const courante = uniteCourante(semestre, progression, decouverts);
  const lectureCourante = stationLectureCourante(semestre, progression);
  const etats = useMemo(
    () => Object.fromEntries([...unites, ...(lecture?.stations || [])].map((u) => [u.id, avancementUnite(u, progression, decouverts)])),
    [unites, lecture, progression, decouverts]
  );
  const { serie, aujourdhui } = calculerSerie(jours);
  const points = quatorzeJours(jours);

  const dus = useMemo(
    () => itemsCumules(semestre).filter((i) => estDu(progression[i.cle]) && categorie(progression[i.cle]) !== "acquis").length,
    [semestre, progression]
  );
  const etatCourante = courante ? etats[courante.id] : null;

  const [objectif, setObjectif] = useState(null);
  const [cibles, setCibles] = useState({});
  useEffect(() => {
    objectifClasse(code).then(setObjectif);
    ciblesClasse(code).then(setCibles);
  }, [code]);

  return (
    <>
      <header className="bandeau bandeauSaison">
        <div className="wrap">
          <div className="teteHaut">
            <span className="ticketMini" title="Votre code">{code}</span>
            <button className="lienClair" onClick={onQuitter}>Changer de code</button>
          </div>

          <div className="plaque plaqueSaison">
            <span className="rond grand" aria-hidden="true">{semestre}</span>
            <span>
              <span className="plaqueSur">Saison {semestre}</span>
              <span className="plaqueNom">{saison?.titre || nomSemestre(semestre)}</span>
            </span>
          </div>

          <div className="compteurs">
            <div className="compteur">
              <span className="compteurN">{serie}</span>
              <span className="compteurL">{serie === 1 ? "jour de suite" : "jours de suite"}</span>
              <span className="seriePoints" aria-label="Les 14 derniers jours">
                {points.map((on, i) => <span key={i} className={"seriePoint" + (on ? " on" : "")} />)}
              </span>
            </div>
            {objectif && objectif.eleves > 0 && (
              <div className="compteur">
                <span className="compteurN">{objectif.seances_mois}<span className="compteurSur">/{objectif.objectif_mois}</span></span>
                <span className="compteurL">séances de la {objectif.classe} ce mois</span>
                <span className="objectifJauge">
                  <span style={{ width: `${Math.min(100, Math.round((objectif.seances_mois / Math.max(1, objectif.objectif_mois)) * 100))}%` }} />
                </span>
              </div>
            )}
          </div>
          <p className="teteNote">
            {aujourdhui
              ? "Fait pour aujourd'hui. À demain !"
              : serie > 0
              ? "Une séance aujourd'hui et la série continue."
              : "Une séance par jour suffit. Un oubli par semaine est pardonné."}
          </p>
        </div>
      </header>

      <div className="main wrap mainSaison avecNav">
        <button className="seanceJour" onClick={onJour}>
          <span className="seanceJourTitre">Séance du jour</span>
          <span className="seanceJourDetail">
            12 questions, environ 5 minutes.{" "}
            {dus > 0 ? `${dus} élément${dus > 1 ? "s" : ""} à revoir` : "Rien d'urgent à revoir"}
            {courante && etatCourante && !etatCourante.valide ? `, et la suite de « ${courante.titre} »` : ""}
            {lectureCourante ? ` et de la lecture.` : "."}
          </span>
          <span className="seanceJourBouton">Commencer</span>
        </button>

        {!estInstallee() && (
          <button className="bandeInstaller" onClick={onInstaller}>
            Mettre l'application sur l'écran d'accueil
          </button>
        )}

        <h2 className="planTitre">Plan de la ligne</h2>
        <ol className="ligne">
          {unites.map((u) => (
            <Station key={u.id} u={u} e={etats[u.id]} courante={courante && u.id === courante.id}
              cible={cibles[u.id]} onClick={() => onUnite(u.id)} />
          ))}
        </ol>

        {lecture && (
          <>
            <div className="correspondance">
              <span className="correspondanceSigne" aria-hidden="true" />
              <span>
                <span className="correspondanceTitre">Correspondance : ligne de lecture</span>
                <span className="correspondanceSous">{lecture.titre}{lecture.sous ? ` · ${lecture.sous}` : ""}</span>
              </span>
            </div>
            <ol className="ligne ligneLecture">
              {lecture.stations.map((st) => (
                <Station key={st.id} u={st} e={etats[st.id]} courante={lectureCourante && st.id === lectureCourante.id}
                  cible={cibles[st.id]} onClick={() => onUnite(st.id)} lecture />
              ))}
            </ol>
          </>
        )}

        {!unites.some((u) => u.complete) && (
          <p className="note">
            Cette saison n'est pas encore découpée en unités complètes : vous y trouvez les mots et
            les verbes par thème. Les exercices de grammaire et de phrases arrivent.
          </p>
        )}

        <h2 className="planTitre">Autres saisons</h2>
        <div className="saisonChoix" role="group" aria-label="Choisir la saison">
          {listeSemestres().map((s) => {
            const verrou = Boolean(semestreMax) && s.numero > semestreMax;
            return (
              <button key={s.numero} disabled={verrou}
                className={"rond choix l" + s.numero + (s.numero === semestre ? " on" : "")}
                title={verrou ? "Pas encore ouvert par votre enseignant" : `Saison ${s.numero}`}
                aria-label={`Saison ${s.numero}${verrou ? " (fermée)" : ""}`}
                onClick={() => setSemestre(s.numero)}>
                {s.numero}
              </button>
            );
          })}
        </div>

        <p className="note" style={{ marginTop: 22, fontSize: 12.5 }}>
          Filière : {filiereActive().nom}. Vos progrès, la liste des mots et la grille des verbes sont dans le{" "}
          <button className="lienTexte" onClick={onCarnet}>carnet</button>.
        </p>
      </div>
    </>
  );
}

function Station({ u, e, courante, cible, onClick, lecture }) {
  const classe = e.valide ? "valide" : courante ? "courante" : e.commencee ? "commencee" : "";
  const enRetard = cible && !e.valide && new Date(cible) < new Date(new Date().toDateString());
  return (
    <li className={"station " + classe + (u.facultative ? " facultative" : "")}>
      <button className="stationBtn" onClick={onClick}>
        <span className="stationPoint" aria-hidden="true" />
        <span className="stationCorps">
          <span className="stationTitre">
            {u.complete && !u.facultative && <span className="stationNum">{u.numero}</span>}
            {u.titre}
          </span>
          <span className="stationSous">
            {u.facultative ? "Facultatif · " : ""}
            {lecture && u.semaines ? `Semaines ${u.semaines} · ` : ""}
            {e.valide
              ? lecture ? "Carnet envoyé" : "Unité validée"
              : e.commencee && e.prochaine
              ? `Prochaine étape : ${e.prochaine.nom.toLowerCase()}`
              : u.sous}
          </span>
          {cible && !e.valide && (
            <span className={"stationCible" + (enRetard ? " retard" : "")}>
              {enRetard ? "À rattraper : prévu pour le " : "À valider d'ici le "}{dateCourte(cible)}
            </span>
          )}
          {e.commencee && !e.valide && e.total > 0 && (
            <span className="stationJauge"><span style={{ width: `${Math.round((e.vus / e.total) * 100)}%` }} /></span>
          )}
        </span>
      </button>
    </li>
  );
}
