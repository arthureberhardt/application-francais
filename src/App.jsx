import React, { useState, useCallback } from "react";
import Connexion from "./ecrans/Connexion.jsx";
import Accueil from "./ecrans/Accueil.jsx";
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
import Installer from "./ecrans/Installer.jsx";
import {
  chargerProgression, chargerSynonymesValides, lireSemestre, ecrireSemestre, lireFiliere, ecrireFiliere,
  enregistrerItem, noterSeance, lireJours, joursServeur, chargerFichesCours,
} from "./lib/store.js";
import { choisirFiliere, filiereActive, itemsCumules } from "./lib/items.js";
import {
  uniteParId, uniteCourante, itemsEtape, elementsRencontres, lireDecouverts, marquerDecouverts,
  definirFichesCours,
} from "./lib/saison.js";
import { composer, composerJour, composerDefi } from "./lib/seance.js";

/* Chaque saison prend la couleur d'une ligne du métro parisien (lignes 1 à 8). */
const LIGNES = {
  1: ["#FFCD00", "#101E31"], 2: ["#003CA6", "#FFFFFF"], 3: ["#837902", "#FFFFFF"], 4: ["#CF009E", "#FFFFFF"],
  5: ["#FF7E2E", "#101E31"], 6: ["#6ECA97", "#101E31"], 7: ["#FA9ABA", "#101E31"], 8: ["#E19BDF", "#101E31"],
};

export default function App() {
  const [code, setCode] = useState(null);
  const [filiere, setFiliere] = useState(() => choisirFiliere(lireFiliere() || "gymnase").cle);
  const [semestre, setSem] = useState(lireSemestre());
  const [semestreMax, setSemestreMax] = useState(null);
  const [progression, setProgression] = useState({});
  const [motsValides, setMotsValides] = useState({});
  const [decouverts, setDecouverts] = useState(new Set());
  const [jours, setJours] = useState(new Set());
  const [seance, setSeance] = useState(null); // { mode, filtre, retour }
  // vue : saison | autres | unite | decouvrir | regle | production | installer
  const [vue, setVue] = useState({ type: "saison" });
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
    setVue({ type: "saison" });
    setChargement(false);
    try {
      if (!localStorage.getItem("fle:aideVue")) {
        setAide(true);
        localStorage.setItem("fle:aideVue", "1");
      }
    } catch {}
  }, []);

  const setSemestre = (n) => {
    if (semestreMax && n > semestreMax) return;
    setSem(n); ecrireSemestre(n);
  };
  const quitter = () => {
    setCode(null); setProgression({}); setSemestreMax(null); setSeance(null); setVue({ type: "saison" });
    setListe(false); setBadges(false); setAide(false); setExamen(false);
  };

  const unite = vue.uniteId ? uniteParId(semestre, vue.uniteId) : null;

  /* ── lancer les séances ── */
  const lancerJour = () => {
    const courante = uniteCourante(semestre, progression, decouverts);
    // les nouveautés suivent l'ordre de l'unité : d'abord les mots déjà
    // découverts, puis le reste du parcours
    const nouveautes = courante ? [
      ...courante.lexique.filter((i) => decouverts.has(i.cle)),
      ...courante.lexique,
      ...courante.verbes, ...courante.grammaire, ...courante.tournures, ...courante.phrases,
    ] : [];
    const vus = new Map();
    for (const i of [...elementsRencontres(semestre, progression),
      ...itemsCumules(semestre).filter((i) => progression[i.cle]?.essais > 0)]) vus.set(i.cle, i);
    const bassin = composerJour([...new Map(nouveautes.map((i) => [i.cle, i])).values()], [...vus.values()], progression);
    setSeance({ mode: "jour", filtre: { bassin, titre: "séance du jour" }, retour: { type: "saison" } });
  };

  const lancerEtape = (u, etape, items) => {
    if (etape === "decouvrir") { setVue({ type: "decouvrir", uniteId: u.id }); return; }
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
        onFin={finSeance} onTermine={seanceTerminee}
        onLancerRattrapage={(items) => setSeance({ mode: "rattrapage", filtre: { items }, retour: seance.retour })}
      />
    );
  } else if (liste) {
    ecran = <Liste semestre={semestre} progression={progression} onFin={() => setListe(false)} />;
  } else if (examen) {
    ecran = <Examen semestre={semestre} code={code} progression={progression} onFin={() => setExamen(false)} />;
  } else if (aide) {
    ecran = <Aide onFin={() => setAide(false)} />;
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
  } else if (vue.type === "production" && unite) {
    ecran = <Production unite={unite} code={code} onFin={() => setVue({ type: "unite", uniteId: unite.id })} />;
  } else if (vue.type === "autres") {
    ecran = (
      <Accueil
        code={code} semestre={semestre} setSemestre={setSemestre} semestreMax={semestreMax}
        progression={progression}
        onLancer={(mode, filtre) => setSeance({ mode, filtre, retour: { type: "autres" } })}
        onConsulter={() => setListe(true)} onBadges={() => setBadges(true)}
        onAide={() => setAide(true)} onExamen={() => setExamen(true)} onQuitter={quitter}
        onRetour={() => setVue({ type: "saison" })}
      />
    );
  } else {
    ecran = (
      <Saison
        code={code} semestre={semestre} setSemestre={setSemestre} semestreMax={semestreMax}
        progression={progression} decouverts={decouverts} jours={jours}
        onJour={lancerJour} onUnite={(id) => setVue({ type: "unite", uniteId: id })}
        onAutres={() => setVue({ type: "autres" })} onAide={() => setAide(true)}
        onInstaller={() => setVue({ type: "installer" })} onQuitter={quitter}
      />
    );
  }

  const [ligne, ligneTexte] = LIGNES[semestre] || LIGNES[1];
  return <div className="fle" style={{ "--ligne": ligne, "--ligne-texte": ligneTexte }}>{ecran}</div>;
}
