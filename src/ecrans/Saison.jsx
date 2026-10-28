import React, { useMemo, useEffect, useState } from "react";
import { listeSemestres, itemsCumules } from "../lib/items.js";
import { estDu, categorie } from "../lib/leitner.js";
import {
  unitesDe, lectureDe, avancementUnite, uniteCourante, stationLectureCourante, saisonDe, nomSemestre,
} from "../lib/saison.js";
import { calculerSerie, quatorzeJours } from "../lib/serie.js";
import { objectifClasse, ciblesClasse } from "../lib/store.js";
import { estInstallee } from "./Installer.jsx";

const dateCourte = (d) => new Date(d).toLocaleDateString("fr-CH", { day: "numeric", month: "short" });

/* La série est affichée sur un indicateur à palettes. Quand elle a grandi
   depuis la dernière visite, les palettes tournent une fois. */
function useSerieAnimee(code, serie) {
  const cle = `fle:serieVue:${code}`;
  const [flip] = useState(() => {
    try { return serie > Number(localStorage.getItem(cle) || 0); } catch { return false; }
  });
  useEffect(() => { try { localStorage.setItem(cle, String(serie)); } catch {} }, [cle, serie]);
  return flip;
}

/* L'accueil : le mur de faïence avec la plaque de la saison et la série,
   la séance du jour, puis le plan de la ligne et sa correspondance. */
export default function Saison({
  code, semestre, setSemestre, semestreMax, progression, decouverts, jours,
  onJour, onUnite, onInstaller,
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
  const flip = useSerieAnimee(code, serie);

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

  const [installerVu, setInstallerVu] = useState(() => {
    try { return Boolean(localStorage.getItem("fle:installerMasque")); } catch { return false; }
  });
  const masquerInstaller = (e) => {
    e.stopPropagation();
    setInstallerVu(true);
    try { localStorage.setItem("fle:installerMasque", "1"); } catch {}
  };

  const detail = [
    dus > 0 ? `${dus} élément${dus > 1 ? "s" : ""} à revoir` : null,
    courante && etatCourante && !etatCourante.valide ? `la suite de « ${courante.titre} »` : null,
    lectureCourante ? "les mots de la lecture" : null,
  ].filter(Boolean);

  return (
    <>
      <header className="mur accueilMur">
        <div className="wrap">
          <div className="accueilHaut">
            <span className="ticketMini" title="Votre code">{code}</span>
          </div>

          <div className="plaque plaqueSaison">
            <span className="rond grand" aria-hidden="true">{semestre}</span>
            <span>
              <span className="plaqueSur">Semestre {semestre}</span>
              <span className="plaqueNom">{saison?.titre || nomSemestre(semestre)}</span>
            </span>
          </div>

          <div className="serie">
            <span className={"serieN" + (flip ? " flip" : "")} aria-hidden="true"><span>{serie}</span></span>
            <span className="serieTexte">
              <span className="serieL">{serie === 1 ? "jour de suite" : `jours de suite`}</span>
              <span className="seriePoints" aria-label="Les 14 derniers jours">
                {points.map((on, i) => <span key={i} className={"seriePoint" + (on ? " on" : "")} />)}
              </span>
            </span>
          </div>
          {objectif && objectif.eleves > 0 && (
            <div className="objectifClasse">
              <span>{objectif.classe} : {objectif.seances_mois} / {objectif.objectif_mois} séances ce mois</span>
              <span className="objectifJauge">
                <span style={{ width: `${Math.min(100, Math.round((objectif.seances_mois / Math.max(1, objectif.objectif_mois)) * 100))}%` }} />
              </span>
            </div>
          )}
        </div>
      </header>

      <div className="main wrap mainSaison avecNav">
        <div className={"seanceJour" + (aujourdhui ? " faite" : "")}>
          <span className="seanceJourTitre">Séance du jour</span>
          <span className="seanceJourDetail">
            {aujourdhui
              ? "Faite pour aujourd'hui. Une deuxième séance est toujours possible."
              : `12 questions, cinq minutes${detail.length ? " : " + detail.join(", ") : ""}.`}
          </span>
          <button className="btn" onClick={onJour}>{aujourdhui ? "Encore une séance" : "Commencer"}</button>
        </div>

        {!estInstallee() && !installerVu && (
          <div className="bandeInstaller" role="button" tabIndex={0} onClick={onInstaller}
            onKeyDown={(e) => e.key === "Enter" && onInstaller()}>
            <span>Mettre l'application sur l'écran d'accueil</span>
            <button className="bandeFermer" aria-label="Masquer" onClick={masquerInstaller}>×</button>
          </div>
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
                <span className="correspondanceSous">{lecture.titre}</span>
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

        {listeSemestres().length > 1 && (
          <>
            <h2 className="planTitre">Changer de semestre</h2>
            <div className="saisonChoix" role="group" aria-label="Choisir le semestre">
              {listeSemestres().map((s) => {
                const verrou = Boolean(semestreMax) && s.numero > semestreMax;
                return (
                  <button key={s.numero} disabled={verrou}
                    className={"rond choix l" + s.numero + (s.numero === semestre ? " on" : "")}
                    title={verrou ? "Pas encore ouvert par votre enseignant" : `Semestre ${s.numero}`}
                    aria-label={`Semestre ${s.numero}${verrou ? " (fermée)" : ""}`}
                    aria-pressed={s.numero === semestre}
                    onClick={() => setSemestre(s.numero)}>
                    {s.numero}
                  </button>
                );
              })}
            </div>
          </>
        )}
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
            <span>
              {u.complete && !u.facultative && <span className="stationNum">{u.numero} </span>}
              {u.titre}
              {courante && !e.valide && <span className="stationIci">Vous êtes ici</span>}
            </span>
          </span>
          <span className="stationSous">
            {u.facultative ? "Facultatif · " : ""}
            {lecture && u.semaines ? `Semaines ${u.semaines} : ` : ""}
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
