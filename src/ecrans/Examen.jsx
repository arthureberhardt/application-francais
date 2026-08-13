import React, { useState, useMemo, useEffect, useRef } from "react";
import { itemsCumules, itemsDe, NOM_CATEGORIE } from "../lib/items.js";
import { evalue, diff } from "../lib/correction.js";
import { question } from "../lib/questions.js";
import { enregistrerItem } from "../lib/store.js";
import { conjugaison, synonyme, contraire, famille, preposition, disponibilite } from "../lib/exercices.js";

/* Examen blanc.

   Il existe pour une raison précise : le pourcentage affiché sur l'accueil est
   calculé à partir de questions posées avec indices, correction immédiate et
   répétition espacée. Ces conditions sont favorables — le chiffre surestime.

   Ici, l'inverse : série chronométrée, aucun indice, aucune correction avant
   la fin, tirage sur tout ce qui a été vu. Et surtout, l'examen blanc
   NE MODIFIE PAS la progression. Il mesure, il ne récompense pas.

   Seul le résultat est conservé, sous une clé « examen:S5 », avec boite = 0
   pour qu'il n'apparaisse pas dans le compte des boîtes de Leitner.        */

const NB_QUESTIONS = 40;
const SECONDES_PAR_QUESTION = 30;
/* Le vivier compte beaucoup plus de couples verbe × temps que de mots :
   en S5, 1 360 contre 600. Un tirage au hasard donnerait un examen aux deux
   tiers grammatical, et ne toucherait qu'une partie des thèmes. On tire donc
   séparément entre trois parts : mots, verbes, et compétences ciblées
   (synonymes, contraires, familles, prépositions, conjugaison en contexte). */
const PART_LEXIQUE = 0.4;
const PART_VERBES = 0.3;
// le reste (0.3) va aux compétences ciblées

/* Les exercices spéciaux tournent en QCM à l'entraînement — c'est voulu, ça
   entraîne à reconnaître par élimination. Un examen, lui, se passe toujours
   en production, sans aucun choix multiple : on réutilise leur logique de
   génération telle quelle (le calcul du trou, les réponses acceptées) et on
   force simplement le rendu en saisie libre plutôt qu'en QCM. Le genre
   (« le » ou « la ») reste à l'entraînement seulement : converti en saisie,
   ce ne serait plus qu'un tirage à pile ou face, sans valeur de mesure. */
const EXOS_COMPETENCES = [conjugaison, synonyme, contraire, famille, preposition];

function questionCompetence(exo, item, tous) {
  const q = exo.question(item, tous);
  return { ...q, type: "saisie", options: undefined, placeholder: "votre réponse", astuce: null };
}

const chrono = (s) =>
  `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/** Aucune question à choix multiple : un examen se passe en production.
    Le QCM d'origine peut venir d'un mot ou d'un verbe (le seul QCM verbe est
    le choix de l'auxiliaire) — il ne faut jamais traiter l'un comme l'autre :
    un item verbe n'a ni `fr` ni `cat`, et les y chercher produit une question
    cassée dont la réponse attendue est `undefined`. */
function questionExamen(item, semestre, vocab) {
  const q = question(item, { boite: 3, ok: 3, essais: 5 }, vocab, semestre);
  if (q.type !== "qcm") return { ...q, astuce: null };

  if (item.module === "verbes") {
    return {
      type: "saisie",
      consigne: "Donnez le participe passé",
      invite: item.inf,
      aide: item.de,
      placeholder: "le participe passé",
      reponse: item.participe,
      aussi: [],
    };
  }
  return {
    type: "saisie",
    consigne: "Écrivez ce mot en français",
    invite: item.de,
    aide: NOM_CATEGORIE[item.cat],
    placeholder: "écrivez en français",
    reponse: item.fr,
    aussi: [],
  };
}

export default function Examen({ semestre, code, progression, onFin }) {
  const vocab = itemsDe(semestre).lexique;

  const serie = useMemo(() => {
    const tout = itemsCumules(semestre).filter((i) => i.module !== "approfondissement");
    const melange = (a) => [...a].sort(() => Math.random() - 0.5);

    const mots = tout.filter((i) => i.module === "lexique");
    const verbes = tout.filter((i) => i.module === "verbes");
    const nMots = Math.min(mots.length, Math.round(NB_QUESTIONS * PART_LEXIQUE));
    const nVerbes = Math.min(verbes.length, Math.round(NB_QUESTIONS * PART_VERBES));
    const nCompetences = NB_QUESTIONS - nMots - nVerbes;

    // les mots : au moins un par thème, puis complément au hasard
    const parTheme = {};
    for (const m of mots) (parTheme[m.unite] = parTheme[m.unite] || []).push(m);
    const choisis = [];
    for (const groupe of melange(Object.values(parTheme))) {
      if (choisis.length >= nMots) break;
      choisis.push(melange(groupe)[0]);
    }
    for (const m of melange(mots)) {
      if (choisis.length >= nMots) break;
      if (!choisis.includes(m)) choisis.push(m);
    }

    // les verbes : au moins un par temps, puis complément au hasard
    const parTemps = {};
    for (const v of verbes) (parTemps[v.tempsCle] = parTemps[v.tempsCle] || []).push(v);
    const choisisV = [];
    for (const groupe of melange(Object.values(parTemps))) {
      if (choisisV.length >= nVerbes) break;
      choisisV.push(melange(groupe)[0]);
    }
    for (const v of melange(verbes)) {
      if (choisisV.length >= nVerbes) break;
      if (!choisisV.includes(v)) choisisV.push(v);
    }

    // les compétences ciblées : réparties le plus possible entre les cinq
    // types disponibles, chacun tiré parmi les mots qui s'y prêtent
    const parExo = {};
    for (const exo of EXOS_COMPETENCES) {
      const eligibles = melange(mots.filter(exo.eligible));
      if (eligibles.length) parExo[exo.cle] = { exo, pool: eligibles };
    }
    const choisisC = [];
    let tour = 0;
    while (choisisC.length < nCompetences) {
      const actifs = Object.values(parExo).filter((g) => g.pool.length > tour);
      if (!actifs.length) break;
      for (const g of actifs) {
        if (choisisC.length >= nCompetences) break;
        choisisC.push({ exo: g.exo, item: g.pool[tour] });
      }
      tour++;
    }

    const q3 = choisisC.map(({ exo, item }) => ({ item, q: questionCompetence(exo, item, mots) }));
    const q1 = choisis.map((item) => ({ item, q: questionExamen(item, semestre, vocab) }));
    const q2 = choisisV.map((item) => ({ item, q: questionExamen(item, semestre, vocab) }));

    return melange([...q1, ...q2, ...q3]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [semestre]);

  const [k, setK] = useState(0);
  const [saisies, setSaisies] = useState({});
  const [courant, setCourant] = useState("");
  const [reste, setReste] = useState(serie.length * SECONDES_PAR_QUESTION);
  const [fini, setFini] = useState(false);
  const champ = useRef(null);

  useEffect(() => {
    if (fini) return;
    const t = setInterval(() => setReste((r) => (r <= 1 ? (setFini(true), 0) : r - 1)), 1000);
    return () => clearInterval(t);
  }, [fini]);

  useEffect(() => { if (!fini && champ.current) champ.current.focus(); }, [k, fini]);

  if (!serie.length) {
    return (
      <div className="main wrap" style={{ paddingTop: 70, maxWidth: 460 }}>
        <p className="note">Il n'y a pas encore assez de mots pour un examen blanc.</p>
        <button className="btn" style={{ marginTop: 18 }} onClick={onFin}>Retour</button>
      </div>
    );
  }

  if (fini) {
    return <Resultat serie={serie} saisies={saisies} semestre={semestre}
      code={code} progression={progression} onFin={onFin} />;
  }

  const { q } = serie[k];
  const suivant = () => {
    const s = { ...saisies, [k]: courant };
    setSaisies(s);
    setCourant(s[k + 1] || "");
    if (k + 1 >= serie.length) setFini(true);
    else setK(k + 1);
  };
  const precedent = () => {
    const s = { ...saisies, [k]: courant };
    setSaisies(s);
    setK(k - 1);
    setCourant(s[k - 1] || "");
  };

  const urgent = reste < 60;

  return (
    <>
      <div className="bar">
        <div className="wrap barIn">
          <button className="lien" onClick={onFin}>← Abandonner</button>
          <span className={"chrono" + (urgent ? " urgent" : "")}>{chrono(reste)}</span>
          <span className="mono" style={{ fontSize: 12.5, color: "var(--ardoise)" }}>
            {k + 1} / {serie.length}
          </span>
        </div>
        <div className="prog">
          <div className="progIn" style={{ width: `${(k / serie.length) * 100}%` }} />
        </div>
      </div>

      <div className="main wrap">
        <div className="bandeauExamen">
          Examen blanc — aucune correction avant la fin. Vos réponses ne changent
          pas vos résultats habituels.
        </div>

        <div className="carte apparait" key={k}>
          <div className="sur">{q.consigne}</div>
          <div className="dsp questionMot">{q.invite}</div>
          {q.aide && <div className="note">{q.aide}</div>}
          <input
            ref={champ} className="champ" style={{ marginTop: 18 }}
            value={courant} placeholder={q.placeholder}
            onChange={(e) => setCourant(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && suivant()}
          />
        </div>

        <div style={{ display: "flex", gap: 9, marginTop: 14 }}>
          {k > 0 && (
            <button className="btn2" style={{ flex: "0 0 auto" }} onClick={precedent}>
              ← Précédent
            </button>
          )}
          <button className="btn" onClick={suivant}>
            {k + 1 >= serie.length ? "Terminer l'examen" : "Question suivante"}
          </button>
        </div>

        <p className="note" style={{ marginTop: 14, fontSize: 12.5 }}>
          Vous pouvez revenir en arrière. Si vous ne savez pas, laissez vide et continuez :
          une réponse au hasard ne vous aide pas à savoir où vous en êtes.
        </p>
      </div>
    </>
  );
}

/* ─────────── résultat et diagnostic ─────────── */
function Resultat({ serie, saisies, semestre, code, progression, onFin }) {
  const corrige = serie.map(({ item, q }, i) => {
    const rep = (saisies[i] || "").trim();
    const verdict = rep ? evalue(rep, q.reponse, q.aussi) : "faux";
    return { item, q, rep, juste: verdict !== "faux", verdict };
  });

  const justes = corrige.filter((c) => c.juste).length;
  const part = Math.round((justes / corrige.length) * 100);

  // le résultat est conservé, mais avec boite = 0 : il n'entre pas dans les boîtes
  useEffect(() => {
    const etat = { boite: 0, ok: justes, essais: corrige.length, echecs: 0, du: 0, maj: Date.now() };
    const cle = `examen:S${semestre}`;
    enregistrerItem(code, cle, etat, { ...progression, [cle]: etat });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const parGroupe = (cle, nom) => {
    const g = {};
    for (const c of corrige) {
      const k = c.item[cle];
      if (!k) continue;
      g[k] = g[k] || { juste: 0, total: 0 };
      g[k].total++;
      if (c.juste) g[k].juste++;
    }
    return Object.entries(g)
      .map(([k, v]) => ({ nom: k, ...v, part: Math.round((v.juste / v.total) * 100) }))
      .sort((a, b) => a.part - b.part);
  };

  const themes = parGroupe("unite");
  const temps = parGroupe("temps");
  const rates = corrige.filter((c) => !c.juste);

  const verdict =
    part >= 85 ? "Vous êtes prêt pour le test."
    : part >= 70 ? "C'est presque bon. Encore un peu de travail."
    : part >= 50 ? "La base est là, mais ce n'est pas encore suffisant."
    : "Il faut reprendre le travail régulièrement.";

  return (
    <>
      <div className="bar">
        <div className="wrap barIn">
          <button className="lien" onClick={onFin}>← Retour</button>
          <span className="sur">résultat</span>
          <span style={{ width: 60 }} />
        </div>
      </div>

      <div className="main wrap">
        <div className="sur">Examen blanc terminé</div>
        <div className="dsp" style={{ fontSize: 56, margin: "10px 0 2px" }}>{part} %</div>
        <p className="note" style={{ fontSize: 15, marginBottom: 6 }}>
          {justes} bonnes réponses sur {corrige.length}.
        </p>
        <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 24 }}>{verdict}</p>

        {themes.length > 1 && (
          <Diagnostic titre="Par thème" lignes={themes} />
        )}
        {temps.length > 0 && (
          <Diagnostic titre="Par temps du verbe" lignes={temps} />
        )}

        {rates.length > 0 && (
          <>
            <div className="sur" style={{ margin: "26px 0 10px" }}>
              Ce que vous n'avez pas trouvé
            </div>
            <div className="listeC">
              {rates.map((c, i) => (
                <div key={i} className="rangExamen">
                  <div style={{ fontSize: 13.5, color: "var(--ardoise)", marginBottom: 3 }}>
                    {c.q.invite}
                  </div>
                  {c.rep && c.q.reponse ? (
                    <div style={{ fontSize: 15, marginBottom: 2 }}>
                      {diff(c.rep, String(c.q.reponse).split(/[,·]/)[0].trim()).map((s, j) => (
                        <span key={j} className={s.t === "trop" ? "dTrop" : s.t === "accent" ? "dAcc" : ""}>
                          {s.ch}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontSize: 13.5, color: "var(--ardoise-clair)", fontStyle: "italic" }}>
                      pas de réponse
                    </div>
                  )}
                  <div style={{ fontSize: 15.5, fontWeight: 700, color: "var(--vert)" }}>
                    {c.q.reponse}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <button className="btn" style={{ marginTop: 22 }} onClick={onFin}>
          Retour à l'accueil
        </button>
      </div>
    </>
  );
}

function Diagnostic({ titre, lignes }) {
  const couleur = (p) => (p >= 85 ? "var(--vert)" : p >= 60 ? "var(--ambre)" : "var(--rouge)");
  return (
    <div style={{ marginBottom: 20 }}>
      <div className="sur" style={{ marginBottom: 10 }}>{titre}</div>
      <div style={{ display: "grid", gap: 9 }}>
        {lignes.map((l) => (
          <div key={l.nom}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, marginBottom: 4 }}>
              <span style={{ fontWeight: 600 }}>{l.nom}</span>
              <span className="mono" style={{ color: "var(--ardoise)", fontSize: 12 }}>
                {l.juste}/{l.total}
              </span>
            </div>
            <div className="jaugeFine">
              <div style={{ width: `${l.part}%`, background: couleur(l.part) }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
