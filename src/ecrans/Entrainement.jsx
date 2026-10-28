import React, { useMemo, useState } from "react";
import { stationsDe } from "../lib/saison.js";
import { tempsJusqua, listeSemestres } from "../lib/items.js";
import { itemsChoix, composerLibre, MODULES, FILTRES } from "../lib/entrainement.js";

const LONGUEURS = [10, 20, 30];
const basculer = (liste, x) => (liste.includes(x) ? liste.filter((y) => y !== x) : [...liste, x]);

/* L'entraînement à la carte : l'élève choisit le semestre, les unités, ce
   qu'il veut travailler (mots, verbes et temps, points de grammaire,
   tournures, phrases), quels éléments et combien de questions. */
export default function Entrainement({ semestre: semDepart, semestreMax, progression, onLancer, onFin }) {
  const semestres = listeSemestres().map((s) => s.numero).filter((n) => !semestreMax || n <= semestreMax);
  const [semestre, setSemestre] = useState(semDepart);
  const [stations, setStations] = useState([]);
  const [modules, setModules] = useState([]);
  const modulesEffectifs = modules.length ? modules : MODULES.map((m) => m.cle);
  const [temps, setTemps] = useState([]);
  const [points, setPoints] = useState([]);
  const [filtre, setFiltre] = useState("tout");
  const [longueur, setLongueur] = useState(20);

  const toutes = stationsDe(semestre);
  const choisies = stations.length ? toutes.filter((u) => stations.includes(u.id)) : toutes;
  const listePoints = [...new Map(choisies.flatMap((u) => u.points).map((g) => [g.id, g])).values()];
  const listeTemps = tempsJusqua(semestre).filter((t) => !t.reconnaissance);

  const items = useMemo(
    () => itemsChoix({ semestre, stations, modules: modulesEffectifs, temps, points, filtre }, progression),
    [semestre, stations, modules, temps, points, filtre, progression]
  );

  const changerSemestre = (n) => { setSemestre(n); setStations([]); setPoints([]); setTemps([]); };
  const lancer = () => {
    const nom = stations.length === 1 ? toutes.find((u) => u.id === stations[0])?.titre : `semestre ${semestre}`;
    onLancer(composerLibre(items, progression, longueur), `à la carte · ${nom}`);
  };

  return (
    <>
      <div className="bar">
        <div className="wrap barIn">
          <button className="lien" onClick={onFin}>← Retour</button>
          <span />
        </div>
      </div>
      <div className="main wrap" style={{ maxWidth: 620 }}>
        <h1 className="pageTitre">Mon entraînement</h1>
        <p className="note" style={{ margin: "0 0 18px" }}>Touchez ce que vous voulez travailler. Là où vous ne choisissez rien, tout est inclus.</p>

        {semestres.length > 1 && (
          <Bloc titre="Semestre">
            <div className="puces">
              {semestres.map((n) => (
                <button key={n} className={"puce" + (n === semestre ? " on" : "")} onClick={() => changerSemestre(n)}>S{n}</button>
              ))}
            </div>
          </Bloc>
        )}

        <Bloc titre="Unités et stations" note={stations.length ? `${stations.length} choisie${stations.length > 1 ? "s" : ""}` : "toutes"}>
          <div className="puces">
            {toutes.map((u) => (
              <button key={u.id} className={"puce" + (stations.includes(u.id) ? " on" : "")}
                onClick={() => { setStations(basculer(stations, u.id)); setPoints([]); }}>
                {u.type === "lecture" ? `Lecture ${u.numero}` : u.facultative ? "Bases" : u.complete ? u.numero : ""} · {u.titre}
              </button>
            ))}
          </div>
        </Bloc>

        <Bloc titre="Quoi" note={modules.length ? "" : "tout"}>
          <div className="puces">
            {MODULES.map((m) => (
              <button key={m.cle} className={"puce" + (modules.includes(m.cle) ? " on" : "")}
                onClick={() => setModules(basculer(modules, m.cle))}>
                {m.nom}
              </button>
            ))}
          </div>
        </Bloc>

        {modulesEffectifs.includes("verbes") && listeTemps.length > 1 && (
          <Bloc titre="Temps des verbes" note={temps.length ? "" : "tous"}>
            <div className="puces">
              {listeTemps.map((t) => (
                <button key={t.cle} className={"puce" + (temps.includes(t.cle) ? " on" : "")} onClick={() => setTemps(basculer(temps, t.cle))}>
                  {t.nom}
                </button>
              ))}
            </div>
          </Bloc>
        )}

        {modulesEffectifs.includes("grammaire") && listePoints.length > 0 && (
          <Bloc titre="Points de grammaire" note={points.length ? "" : "tous"}>
            <div className="puces">
              {listePoints.map((g) => (
                <button key={g.id} className={"puce" + (points.includes(g.id) ? " on" : "")} onClick={() => setPoints(basculer(points, g.id))}>
                  {g.titre}
                </button>
              ))}
            </div>
          </Bloc>
        )}

        <Bloc titre="Quels éléments">
          <div className="puces">
            {FILTRES.map((f) => (
              <button key={f.cle} className={"puce" + (filtre === f.cle ? " on" : "")} onClick={() => setFiltre(f.cle)}>{f.nom}</button>
            ))}
          </div>
        </Bloc>

        <Bloc titre="Combien de questions">
          <div className="puces">
            {LONGUEURS.map((n) => (
              <button key={n} className={"puce" + (longueur === n ? " on" : "")} onClick={() => setLongueur(n)}>{n}</button>
            ))}
          </div>
        </Bloc>

        <div className="lancerChoix">
          <button className="btn" disabled={!items.length} onClick={lancer}>
            {items.length ? `Commencer (${Math.min(longueur, items.length)} questions)` : "Rien à entraîner avec ce choix"}
          </button>
          <p className="note" style={{ fontSize: 12.5, marginTop: 8 }}>
            {items.length} élément{items.length > 1 ? "s" : ""} correspondent à votre choix.
          </p>
        </div>
      </div>
    </>
  );
}

const Bloc = ({ titre, note, children }) => (
  <section className="blocChoix">
    <h2 className="blocChoixTitre">{titre}{note ? <span className="blocChoixNote"> · {note}</span> : null}</h2>
    {children}
  </section>
);
