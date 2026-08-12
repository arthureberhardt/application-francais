import React, { useState, useCallback } from "react";
import Connexion from "./ecrans/Connexion.jsx";
import Accueil from "./ecrans/Accueil.jsx";
import Seance from "./ecrans/Seance.jsx";
import Liste from "./ecrans/Liste.jsx";
import Badges from "./ecrans/Badges.jsx";
import Aide from "./ecrans/Aide.jsx";
import Examen from "./ecrans/Examen.jsx";
import Enseignant from "./ecrans/Enseignant.jsx";
import { chargerProgression, lireSemestre, ecrireSemestre, lireFiliere, ecrireFiliere } from "./lib/store.js";
import { choisirFiliere, filiereActive } from "./lib/items.js";

export default function App() {
  const [code, setCode] = useState(null);
  const [filiere, setFiliere] = useState(() => choisirFiliere(lireFiliere() || "gymnase").cle);
  const [semestre, setSem] = useState(lireSemestre());
  const [semestreMax, setSemestreMax] = useState(null);
  const [progression, setProgression] = useState({});
  const [seance, setSeance] = useState(null); // { mode, unite }
  const [liste, setListe] = useState(false);
  const [badges, setBadges] = useState(false);
  const [aide, setAide] = useState(false);
  const [examen, setExamen] = useState(false);
  const [chargement, setChargement] = useState(false);
  const [enseignant, setEnseignant] = useState(false);

  const entrer = useCallback(async (c, cleFiliere, semMax) => {
    setChargement(true);
    if (cleFiliere) {
      choisirFiliere(cleFiliere);
      ecrireFiliere(cleFiliere);
      setFiliere(cleFiliere);
      // le semestre courant doit exister dans la filière choisie
      const max = filiereActive().semestres.length;
      if (lireSemestre() > max) { ecrireSemestre(1); setSem(1); }
    }
    setSemestreMax(semMax ?? null);
    // si l'enseignant a resserré la limite depuis la dernière visite, le
    // semestre déjà mémorisé sur cet appareil peut la dépasser : on le ramène
    if (semMax && lireSemestre() > semMax) { ecrireSemestre(semMax); setSem(semMax); }
    setProgression(await chargerProgression(c));
    setCode(c);
    setChargement(false);
    // À la toute première connexion, on montre l'aide : personne ne devine
    // seul pourquoi il faut revenir demain plutôt que répéter cinq fois.
    try {
      if (!localStorage.getItem("fle:aideVue")) {
        setAide(true);
        localStorage.setItem("fle:aideVue", "1");
      }
    } catch {}
  }, []);

  const setSemestre = (n) => {
    if (semestreMax && n > semestreMax) return; // barrière silencieuse, en plus des boutons désactivés
    setSem(n); ecrireSemestre(n);
  };
  const quitter = () => { setCode(null); setProgression({}); setSemestreMax(null); setSeance(null); setListe(false); setBadges(false); setAide(false); setExamen(false); };

  return (
    <div className="fle">
      {enseignant ? (
        <Enseignant onFin={() => setEnseignant(false)} />
      ) : !code ? (
        chargement ? (
          <div className="wrap" style={{ paddingTop: 90 }}>
            <div className="note">Chargement…</div>
          </div>
        ) : (
          <Connexion onEntrer={entrer} onEnseignant={() => setEnseignant(true)} />
        )
      ) : seance ? (
        <Seance
          mode={seance.mode} filtre={seance.filtre} semestre={semestre} code={code}
          progression={progression} setProgression={setProgression}
          onFin={() => setSeance(null)}
          onLancerRattrapage={(items) => setSeance({ mode: "rattrapage", filtre: { items } })}
        />
      ) : liste ? (
        <Liste semestre={semestre} progression={progression} onFin={() => setListe(false)} />
      ) : examen ? (
        <Examen semestre={semestre} code={code} progression={progression}
          onFin={() => setExamen(false)} />
      ) : aide ? (
        <Aide onFin={() => setAide(false)} />
      ) : badges ? (
        <Badges semestre={semestre} progression={progression} onFin={() => setBadges(false)} />
      ) : (
        <Accueil
          code={code} semestre={semestre} setSemestre={setSemestre} semestreMax={semestreMax}
          progression={progression}
          onLancer={(mode, filtre) => setSeance({ mode, filtre })}
          onConsulter={() => setListe(true)}
          onBadges={() => setBadges(true)}
          onAide={() => setAide(true)}
          onExamen={() => setExamen(true)}
          onQuitter={quitter}
        />
      )}
    </div>
  );
}
