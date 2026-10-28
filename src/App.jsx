import React, { useState, useCallback, useEffect } from "react";
import Connexion from "./ecrans/Connexion.jsx";
import Seance from "./ecrans/Seance.jsx";
import Liste from "./ecrans/Liste.jsx";
import Badges from "./ecrans/Badges.jsx";
import Aide from "./ecrans/Aide.jsx";
import Examen from "./ecrans/Examen.jsx";
import Enseignant from "./ecrans/Enseignant.jsx";
import Saison from "./ecrans/Saison.jsx";
import Unite from "./ecrans/Unite.jsx";
import Decouvrir from "./ecrans/Decouvrir.jsx";
import Regle from "./ecrans/Regle.jsx";
import Production from "./ecrans/Production.jsx";
import Evaluation from "./ecrans/Evaluation.jsx";
import Installer from "./ecrans/Installer.jsx";
import Carnet from "./ecrans/Carnet.jsx";
import Nav from "./ecrans/Nav.jsx";
import {
  chargerProgression, chargerSynonymesValides, lireSemestre, ecrireSemestre, lireFiliere, ecrireFiliere,
  enregistrerItem, noterSeance, lireJours, joursServeur, chargerFichesCours, codeValide,
} from "./lib/store.js";

/* La session reste ouverte sur l'appareil : le code est gardé jusqu'à ce que
   l'élève choisisse « Changer de code » dans l'aide. */
const CLE_SESSION = "fle:session";
const lireSession = () => {
  try { return JSON.parse(localStorage.getItem(CLE_SESSION) || "null"); } catch { return null; }
};
const ecrireSession = (s) => {
  try { s ? localStorage.setItem(CLE_SESSION, JSON.stringify(s)) : localStorage.removeItem(CLE_SESSION); } catch {}
};
import { choisirFiliere, filiereActive, itemsCumules } from "./lib/items.js";
import {
  uniteParId, uniteCourante, itemsEtape, elementsRencontres, lireDecouverts, marquerDecouverts,
  definirFichesCours, stationLectureCourante, evalEnvoyee,
} from "./lib/saison.js";
import { composer, composerJour, composerDefi } from "./lib/seance.js";
import { calculerSerie } from "./lib/serie.js";

/* Chaque saison prend la couleur d'une ligne du métro parisien (lignes 1 à 8). */
const LIGNES = {
  1: ["#FFCD00", "#101E31"], 2: ["#003CA6", "#FFFFFF"], 3: ["#837902", "#FFFFFF"], 4: ["#CF009E", "#FFFFFF"],
  5: ["#FF7E2E", "#101E31"], 6: ["#6ECA97", "#101E31"], 7: ["#FA9ABA", "#101E31"], 8: ["#E19BDF", "#101E31"],
};

export default function App() {
  const [code, setCode] = useState(null);
  const [reprise] = useState(lireSession);
  const [filiere, setFiliere] = useState(() => choisirFiliere(lireFiliere() || "gymnase").cle);
  const [semestre, setSem] = useState(lireSemestre());
  const [semestreMax, setSemestreMax] = useState(null);
  const [progression, setProgression] = useState({});
  const [motsValides, setMotsValides] = useState({});
  const [decouverts, setDecouverts] = useState(new Set());
  const [jours, setJours] = useState(new Set());
  const [seance, setSeance] = useState(null); // { mode, filtre, retour }
  // vue : saison | carnet | aide | unite | decouvrir | regle | production | installer
  const [vue, setVue] = useState({ type: "saison" });
  const [liste, setListe] = useState(false);
  const [badges, setBadges] = useState(false);
  const [premiereAide, setPremiereAide] = useState(false);
  const [examen, setExamen] = useState(false);
  const [chargement, setChargement] = useState(() => Boolean(lireSession()?.code));
  const [enseignant, setEnseignant] = useState(false);

  const entrer = useCallback(async (c, cleFiliere, semMax) => {
    setChargement(true);
    if (cleFiliere) {
      choisirFiliere(cleFiliere);
      ecrireFiliere(cleFiliere);
      setFiliere(cleFiliere);
      const max = filiereActive().semestres.length;
      if (lireSemestre() > max) { ecrireSemestre(1); setSem(1); }
    }
    setSemestreMax(semMax ?? null);
    if (semMax && lireSemestre() > semMax) { ecrireSemestre(semMax); setSem(semMax); }
    const [prog, fiches] = await Promise.all([chargerProgression(c), chargerFichesCours()]);
    definirFichesCours(fiches);
    setProgression(prog);
    setDecouverts(lireDecouverts(c));
    const locaux = lireJours(c);
    setJours(locaux);
    joursServeur(c).then((j) => { if (j.length) setJours(new Set([...locaux, ...j])); });
    chargerSynonymesValides().then(setMotsValides);
    setCode(c);
    ecrireSession({ code: c, filiere: cleFiliere || null, semMax: semMax ?? null });
    setVue({ type: "saison" });
    setChargement(false);
    try {
      if (!localStorage.getItem("fle:aideVue2026")) {
        setPremiereAide(true);
        localStorage.setItem("fle:aideVue2026", "1");
      }
    } catch {}
  }, []);

  const setSemestre = (n) => {
    if (semestreMax && n > semestreMax) return;
    setSem(n); ecrireSemestre(n);
  };
  const quitter = () => {
    ecrireSession(null);
    setCode(null); setProgression({}); setSemestreMax(null); setSeance(null); setVue({ type: "saison" });
    setListe(false); setBadges(false); setPremiereAide(false); setExamen(false);
  };

  /* Au démarrage : on rouvre la dernière session tout de suite (même hors
     ligne), puis on revérifie le code en arrière-plan. Un code supprimé par
     l'enseignant ramène à l'écran de connexion. */
  useEffect(() => {
    if (!reprise?.code) return;
    entrer(reprise.code, reprise.filiere, reprise.semMax);
    codeValide(reprise.code).then((res) => {
      if (!res.ok) { quitter(); return; }
      if ((res.semestreMax ?? null) !== (reprise.semMax ?? null)) {
        setSemestreMax(res.semestreMax ?? null);
        ecrireSession({ ...reprise, semMax: res.semestreMax ?? null });
      }
    });
  }, []); // eslint-disable-line

  const unite = vue.uniteId ? uniteParId(semestre, vue.uniteId) : null;

  // chaque nouvel écran s'ouvre en haut de page
  useEffect(() => { window.scrollTo(0, 0); }, [vue, seance, premiereAide, examen]);

  /* ── lancer les séances ── */
  const lancerJour = () => {
    const courante = uniteCourante(semestre, progression, decouverts);
    // les nouveautés suivent l'ordre de l'unité : d'abord les mots déjà
    // découverts, puis le reste du parcours
    // la station de lecture en cours apporte aussi ses mots : on lit en parallèle
    const lecture = stationLectureCourante(semestre, progression);
    const nouveautes = courante ? [
      ...courante.lexique.filter((i) => decouverts.has(i.cle)),
      ...(lecture ? lecture.lexique.filter((i) => decouverts.has(i.cle)) : []),
      ...courante.lexique,
      ...courante.verbes, ...courante.grammaire, ...courante.tournures, ...courante.phrases,
    ] : [];
    const vus = new Map();
    for (const i of [...elementsRencontres(semestre, progression),
      ...itemsCumules(semestre).filter((i) => progression[i.cle]?.essais > 0)]) vus.set(i.cle, i);
    const bassin = composerJour([...new Map(nouveautes.map((i) => [i.cle, i])).values()], [...vus.values()], progression);
    setSeance({ mode: "jour", filtre: { bassin, titre: "séance du jour" }, retour: { type: "saison" } });
  };

  /* Marquer qu'un texte a été envoyé (carnet de lecture, entraînement à une
     évaluation) : une ligne de progression, pour que l'élève et l'enseignant
     le voient sur tous les appareils. */
  const marquerEnvoi = (cle) => {
    const etat = { boite: 1, ok: 1, essais: 1, echecs: 0, du: 0, maj: Date.now() };
    const suivante = { ...progression, [cle]: etat };
    setProgression(suivante);
    enregistrerItem(code, cle, etat, suivante);
  };

  const lancerEtape = (u, etape, items) => {
    if (etape === "decouvrir") { setVue({ type: "decouvrir", uniteId: u.id }); return; }
    if (etape === "carnet") { setVue({ type: "carnetLecture", uniteId: u.id }); return; }
    if (etape === "evaluation") { setVue({ type: "evaluation", uniteId: u.id }); return; }
    if (etape === "grammaire" && !items) { setVue({ type: "regle", uniteId: u.id }); return; }
    if (etape === "defi") {
      setSeance({ mode: "defi", filtre: { bassin: composerDefi(u), titre: `défi · ${u.titre}`, unite: u.id },
        retour: { type: "unite", uniteId: u.id } });
      return;
    }
    const source = items || itemsEtape(u, etape);
    const bassin = composer(source, progression, "unite");
    setSeance({ mode: "unite", filtre: { bassin, titre: u.titre }, retour: { type: "unite", uniteId: u.id } });
  };

  const finSeance = (res) => {
    const s = seance;
    setSeance(null);
    if (s?.mode === "defi" && res && typeof res.part === "number") {
      const cle = `defi:${s.filtre.unite}`;
      const ancien = progression[cle];
      // on garde le meilleur résultat : un défi raté ne fait pas perdre une unité validée
      if (!ancien || res.part >= ancien.ok) {
        const etat = { boite: 1, ok: res.part, essais: res.total, echecs: 0, du: 0, maj: Date.now() };
        const suivante = { ...progression, [cle]: etat };
        setProgression(suivante);
        enregistrerItem(code, cle, etat, suivante);
      }
      const u = uniteParId(semestre, s.filtre.unite);
      if (res.part >= 70 && u?.defi) { setVue({ type: "production", uniteId: u.id }); return; }
    }
    setVue(s?.retour || { type: "saison" });
  };

  const seanceTerminee = ({ total }) => {
    if (!total) return;
    noterSeance(code, total);
    setJours(lireJours(code));
  };

  let ecran;
  if (enseignant) {
    ecran = <Enseignant onFin={() => setEnseignant(false)} />;
  } else if (!code) {
    ecran = chargement
      ? <div className="wrap" style={{ paddingTop: 90 }}><div className="note">Chargement…</div></div>
      : <Connexion onEntrer={entrer} onEnseignant={() => setEnseignant(true)} />;
  } else if (seance) {
    ecran = (
      <Seance
        mode={seance.mode} filtre={seance.filtre} semestre={semestre} code={code}
        progression={progression} setProgression={setProgression} motsValides={motsValides}
        onFin={finSeance} onTermine={seanceTerminee} serie={calculerSerie(jours).serie}
        onLancerRattrapage={(items) => setSeance({ mode: "rattrapage", filtre: { items }, retour: seance.retour })}
      />
    );
  } else if (liste) {
    ecran = <Liste semestre={semestre} progression={progression} onFin={() => setListe(false)} />;
  } else if (examen) {
    ecran = <Examen semestre={semestre} code={code} progression={progression} onFin={() => setExamen(false)} />;
  } else if (premiereAide) {
    ecran = <Aide premiere onFin={() => setPremiereAide(false)} />;
  } else if (badges) {
    ecran = <Badges semestre={semestre} progression={progression} onFin={() => setBadges(false)} />;
  } else if (vue.type === "installer") {
    ecran = <Installer onFin={() => setVue({ type: "saison" })} />;
  } else if (vue.type === "unite" && unite) {
    ecran = (
      <Unite unite={unite} code={code} progression={progression} decouverts={decouverts}
        onEtape={(e) => lancerEtape(unite, e)} onRetour={() => setVue({ type: "saison" })} />
    );
  } else if (vue.type === "decouvrir" && unite) {
    ecran = (
      <Decouvrir unite={unite} progression={progression} decouverts={decouverts}
        onMarquer={(cles) => setDecouverts(new Set(marquerDecouverts(code, cles)))}
        onFin={() => setVue({ type: "unite", uniteId: unite.id })}
        onEntrainer={(lot) => lancerEtape(unite, "entrainer", lot)} />
    );
  } else if (vue.type === "regle" && unite) {
    ecran = (
      <Regle unite={unite} onFin={() => setVue({ type: "unite", uniteId: unite.id })}
        onExercices={() => lancerEtape(unite, "grammaire", unite.grammaire)} />
    );
  } else if (vue.type === "carnetLecture" && unite) {
    ecran = (
      <Production unite={unite} code={code} tache={unite.carnet} cible={unite.id} titre="Carnet de lecture"
        minimum={25} onEnvoye={() => marquerEnvoi(`carnet:${unite.id}`)}
        onFin={() => setVue({ type: "unite", uniteId: unite.id })} />
    );
  } else if (vue.type === "evaluation" && unite?.evaluation) {
    ecran = (
      <Evaluation unite={unite} evaluation={unite.evaluation}
        fait={evalEnvoyee(progression, unite.evaluation.id)}
        onEntrainer={() => setVue({ type: "entrainementEval", uniteId: unite.id })}
        onFin={() => setVue({ type: "unite", uniteId: unite.id })} />
    );
  } else if (vue.type === "entrainementEval" && unite?.evaluation) {
    ecran = (
      <Production unite={unite} code={code} tache={unite.evaluation.entrainement}
        cible={`eval:${unite.evaluation.id}`} titre={unite.evaluation.titre}
        onEnvoye={() => marquerEnvoi(`eval:${unite.evaluation.id}`)}
        onFin={() => setVue({ type: "evaluation", uniteId: unite.id })} />
    );
  } else if (vue.type === "production" && unite) {
    ecran = <Production unite={unite} code={code} onFin={() => setVue({ type: "unite", uniteId: unite.id })} />;
  } else if (vue.type === "carnet") {
    ecran = (
      <Carnet semestre={semestre} progression={progression} decouverts={decouverts}
        onLancer={(mode, filtre) => setSeance({ mode, filtre, retour: { type: "carnet" } })}
        onExamen={() => setExamen(true)} />
    );
  } else if (vue.type === "aide") {
    ecran = <Aide code={code} onQuitter={quitter} onInstaller={() => setVue({ type: "installer" })} />;
  } else {
    ecran = (
      <Saison
        code={code} semestre={semestre} setSemestre={setSemestre} semestreMax={semestreMax}
        progression={progression} decouverts={decouverts} jours={jours}
        onJour={lancerJour} onUnite={(id) => setVue({ type: "unite", uniteId: id })}
        onCarnet={() => setVue({ type: "carnet" })}
        onInstaller={() => setVue({ type: "installer" })} onQuitter={quitter}
      />
    );
  }

  const [ligne, ligneTexte] = LIGNES[semestre] || LIGNES[1];
  // la barre du bas n'apparaît que sur les trois écrans principaux
  const onglet = code && !seance && !liste && !examen && !badges && !premiereAide && !enseignant
    && ["saison", "carnet", "aide"].includes(vue.type) ? vue.type : null;
  return (
    <div className="fle" style={{ "--ligne": ligne, "--ligne-texte": ligneTexte }}>
      {ecran}
      {onglet && <Nav actif={onglet} onChoisir={(t) => { setVue({ type: t }); window.scrollTo(0, 0); }} />}
    </div>
  );
}
