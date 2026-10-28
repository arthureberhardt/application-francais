import React, { useState, useMemo, useRef, useEffect } from "react";
import { itemsDe, itemsCumules, infosSemestre } from "../lib/items.js";
import { apresReponse, etatInitial, estDifficile, domainesFaibles } from "../lib/leitner.js";
import { composer, composerAdaptatif } from "../lib/seance.js";
import { evalue, diff } from "../lib/correction.js";
import { question } from "../lib/questions.js";
import { exercicePar } from "../lib/exercices.js";
import { VERBE_PAR_INF } from "../donnees/index.js";
import { enregistrerItem, proposerMot } from "../lib/store.js";
import { Ligne } from "./Commun.jsx";
import { INTERVALLES } from "../lib/leitner.js";

/* Quand l'élément reviendra : plus parlant qu'un numéro de boîte. */
const retourDans = (boite) => {
  const j = INTERVALLES[boite] || 0;
  if (j === 0) return "revient dans cette séance ou la suivante";
  if (j === 1) return "revient demain";
  if (j < 30) return `revient dans ${j} jours`;
  return `revient dans ${Math.round(j / 30)} mois`;
};
import { Ecouter, BarreAccents } from "./Outils.jsx";
import { lire, taire, sonDisponible } from "../lib/voix.js";

export default function Seance({ mode, filtre = {}, semestre, code, progression, setProgression, motsValides = {}, onFin, onLancerRattrapage, onTermine, serie = 0 }) {
  const { unite, tempsCle, semestreCible, exercice } = filtre;
  const exo = exercice ? exercicePar(exercice) : null;

  const bassin = useMemo(() => {
    // le rattrapage porte sur une liste précise — les mots ratés à l'instant
    // — pas sur une sélection recalculée : composer() choisirait selon les
    // dates d'échéance, ce qui n'a aucun sens juste après une faute.
    if (mode === "rattrapage") return [...(filtre.items || [])].sort(() => Math.random() - 0.5);
    // séances composées à l'avance : unité, séance du jour, défi
    if (filtre.bassin) return filtre.bassin;

    if (mode === "adaptatif") {
      const tout = itemsCumules(semestre).filter((i) => i.module !== "approfondissement");
      const domaines = filtre.domaines || domainesFaibles(tout, progression);
      return composerAdaptatif(tout, progression, domaines);
    }

    let source;
    if (mode === "bilan") {
      source = semestreCible ? itemsDe(semestreCible).lexique : itemsCumules(semestre);
    } else if (mode === "dictee") {
      source = itemsDe(semestre).lexique;
    } else if (mode === "special") {
      const tout = itemsCumules(semestre).filter((i) => i.module === "lexique");
      source = exo ? tout.filter(exo.eligible) : [];
    } else if (mode === "difficiles") {
      source = itemsCumules(semestre).filter((i) => estDifficile(progression[i.cle]));
    } else {
      source = itemsDe(semestre)[mode] || [];
    }
    if (unite) source = source.filter((i) => i.unite === unite);
    if (tempsCle) source = source.filter((i) => i.tempsCle === tempsCle);
    if (filtre.unites?.length) source = source.filter((i) => filtre.unites.includes(i.unite));
    if (filtre.tempsCles?.length) source = source.filter((i) => filtre.tempsCles.includes(i.tempsCle));
    return composer(source, progression, mode, filtre.illimite ? source.length : undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, semestre, unite, tempsCle, semestreCible, filtre.unites, filtre.tempsCles, filtre.illimite]);

  const NOM_MODE = {
    lexique: "les mots", verbes: "les verbes", bilan: "tout revoir",
    difficiles: "mots difficiles", approfondissement: "pour aller plus loin",
    dictee: "dictée", special: "exercice spécial", rattrapage: "vos fautes de tout à l'heure",
    adaptatif: "session adaptée à vous",
  };
  const etiquette =
    filtre.titre || (exo && exo.nom.toLowerCase()) || unite || tempsCle ||
    (semestreCible ? `semestre ${semestreCible}` : NOM_MODE[mode] || mode);

  const vocabDuSemestre = itemsDe(semestre).lexique;
  // les leurres des exercices spéciaux se prennent dans tout le vivier,
  // pas seulement dans les douze questions de la séance
  const bassinComplet = useMemo(
    () => (exo ? itemsCumules(semestre).filter((i) => i.module === "lexique").filter(exo.eligible) : []),
    [exercice, semestre] // eslint-disable-line
  );

  const [k, setK] = useState(0);
  const [saisie, setSaisie] = useState("");
  const [choisis, setChoisis] = useState([]); // étiquettes posées, pour « ordre » (indices)
  const [trous, setTrous] = useState({});     // réponses des blancs, pour « trous »
  const [retour, setRetour] = useState(null);
  const [justes, setJustes] = useState(0);
  const [rates, setRates] = useState([]);
  const [resultats, setResultats] = useState([]); // juste / faux, question par question (pour le trajet)
  const [suite, setSuite] = useState(0);          // bonnes réponses d'affilée
  const [serieDebut] = useState(serie);
  const champ = useRef(null);
  const boutonSuivant = useRef(null);
  // Le focus est donné au bouton Suivant sur un cycle séparé de la touche
  // Entrée qui vient de valider — sinon le relâchement de cette même touche,
  // encore en vol, arrive sur le bouton fraîchement focalisé et avance tout
  // seul à la question suivante avant que la correction soit lisible.
  useEffect(() => {
    if (!retour) return;
    const id = requestAnimationFrame(() => boutonSuivant.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [retour]);
  const son = sonDisponible();

  const item = bassin[k];
  const q = useMemo(
    () => {
      if (!item) return null;
      if (exo) {
        const q = exo.question(item, bassinComplet, (inf) => VERBE_PAR_INF[inf]);
        // les propositions d'élèves déjà validées par l'enseignant élargissent
        // silencieusement les réponses acceptées, sans jamais toucher au
        // contenu de l'application elle-même
        const extra = motsValides[item.cle];
        if (extra?.length) return { ...q, aussi: [...(q.aussi || []), ...extra] };
        return q;
      }
      const q = question(item, progression[item.cle], vocabDuSemestre, semestre, mode);
      const extra = motsValides[item.cle];
      if (extra?.length && q.type !== "qcm") return { ...q, aussi: [...(q.aussi || []), ...extra] };
      return q;
    },
    [item] // eslint-disable-line
  );

  /* En mode « mots difficiles », le mot est montré avant d'être demandé :
     le redemander à l'aveugle une sixième fois ne servirait à rien. */
  // un mot qui résiste est d'abord montré, dans n'importe quelle séance
  const resiste = (i) => i && i.module === "lexique" && estDifficile(progression[i.cle]);
  const [devoile, setDevoile] = useState(mode === "difficiles" || resiste(bassin[0]));
  useEffect(() => setDevoile(mode === "difficiles" || resiste(bassin[k])), [k, mode]); // eslint-disable-line

  useEffect(() => {
    if (!retour && champ.current) champ.current.focus();
  }, [k, retour]);

  // en dictée, le mot est lu dès qu'il apparaît
  useEffect(() => {
    if (q && q.dictee && !retour) {
      const t = setTimeout(() => lire(q.dictee), 260);
      return () => clearTimeout(t);
    }
  }, [k]); // eslint-disable-line

  useEffect(() => () => taire(), []);

  if (!item) return <Fin justes={justes} total={bassin.length} rates={rates} onFin={onFin}
    onRattrapage={(items) => onLancerRattrapage(items)} onTermine={onTermine} defi={mode === "defi"}
    serie={serie} serieDebut={serieDebut} />;

  const noter = (juste) => {
    setResultats((r) => { const n = [...r]; n[k] = juste; return n; });
    setSuite((x) => (juste ? x + 1 : 0));
  };

  /* Un texte à trous est juste si tous ses blancs le sont ; chaque blanc
     est corrigé séparément pour que l'élève voie où il s'est trompé. */
  const validerTrous = () => {
    if (retour) return;
    const resultats = q.blancs.map((b) => {
      const v = evalue(trous[b.blanc] || "", b.reponses[0], b.reponses.slice(1), { phrase: true });
      return v === "proche" && semestre >= 2 ? "accent" : v;
    });
    const nbJustes = resultats.filter((v) => v === "exact" || v === "proche").length;
    const juste = nbJustes === resultats.length;
    const etat = apresReponse(progression[item.cle], juste);
    const suivante = { ...progression, [item.cle]: etat };
    setProgression(suivante);
    enregistrerItem(code, item.cle, etat, suivante);
    setRetour({ verdict: juste ? "exact" : "faux", reponse: "", boite: etat.boite, resultats, nbJustes });
    noter(juste);
    if (juste) setJustes((x) => x + 1);
    else if (mode !== "rattrapage") setRates((r) => [...r, item]);
  };

  const valider = (reponse) => {
    if (retour) return;
    let verdict =
      q.type === "qcm"
        ? reponse === q.reponse ? "exact" : "faux"
        : evalue(reponse, q.reponse, q.aussi, { phrase: q.phrase });
    // Les accents : tolérés (« presque ») en S1, comptés comme faute ensuite.
    const accentFaute = verdict === "proche" && semestre >= 2;
    const juste = verdict !== "faux" && !accentFaute;
    if (accentFaute) verdict = "accent";

    const etat = apresReponse(progression[item.cle], juste);
    const suivante = { ...progression, [item.cle]: etat };
    setProgression(suivante);
    enregistrerItem(code, item.cle, etat, suivante);

    setRetour({ verdict, reponse, boite: etat.boite });
    noter(juste);
    if (juste) setJustes((x) => x + 1);
    // en rattrapage on ne re-signale pas une faute : sinon un mot raté deux
    // fois de suite s'empilerait sans fin dans sa propre liste de reprise
    else if (mode !== "rattrapage") setRates((r) => [...r, item]);
  };

  const suivant = () => { setRetour(null); setSaisie(""); setChoisis([]); setTrous({}); setK(k + 1); };
  const phraseOrdre = q.type === "ordre" ? choisis.map((i) => q.mots[i]).join(" ") : "";

  const bon = retour && retour.verdict !== "faux" && retour.verdict !== "accent";
  return (
    <>
      <div className="bar barSeance">
        <div className="wrap barIn">
          <button className="lien" onClick={() => onFin()} aria-label="Arrêter la séance">← Arrêter</button>
          <span className="sur">{etiquette}</span>
          {suite >= 3 ? (
            <span className="suite" key={suite} aria-live="polite">{suite} de suite</span>
          ) : (
            <span className="compteurQ">{k + 1} / {bassin.length}</span>
          )}
        </div>
        {bassin.length <= 24 ? (
          <div className="wrap">
            <ol className="trajet" aria-label={`Question ${k + 1} sur ${bassin.length}`}>
              {bassin.map((_, i) => (
                <li key={i} className={(i < k || (i === k && retour) ? "passee" : i === k ? "ici" : "") + (resultats[i] === false ? " rate" : "")}><span /></li>
              ))}
            </ol>
          </div>
        ) : (
          <div className="prog">
            <div className="progIn" style={{ width: `${((k + (retour ? 1 : 0)) / bassin.length) * 100}%` }} />
          </div>
        )}
      </div>

      <div className="main wrap" style={{ maxWidth: 640 }}>
        {devoile && !retour && item.module !== "verbes" && (
          <div className="carte rappelDifficile">
            <div className="sur">Ce mot vous résiste. Regardez-le bien.</div>
            <div className="dsp" style={{ fontSize: 28, margin: "8px 0 3px" }}>{item.fr}</div>
            <div className="note">{item.de}</div>
            {item.exemple && <div className="exempleCorr" style={{ marginTop: 8 }}>{item.exemple}</div>}
            <button className="btn2" style={{ marginTop: 12 }} onClick={() => setDevoile(false)}>
              C'est bon, posez-moi la question
            </button>
          </div>
        )}

        <div key={k} className={"carte carteQuestion apparait" + (retour ? (bon ? " juste" : " faux") : "")}
          style={devoile && !retour ? { opacity: .35 } : null}>
          {retour && bon && <span className="tampon" aria-hidden="true">✓</span>}
          <div className="plaqueQ">{q.consigne}</div>
          {q.dictee ? (
            <div className="zoneEcoute">
              <Ecouter texte={q.dictee} grand libelle="Réécouter" />
              <Ecouter texte={q.dictee} lent grand libelle="Plus lentement" />
            </div>
          ) : (
            q.invite && <div className={"questionMot" + (q.phraseLongue ? " questionPhrase" : "")}>
              <span>{q.invite}</span>
              {son && item.module === "lexique" && !q.reponse.includes(q.invite) && (
                <Ecouter texte={q.invite} />
              )}
            </div>
          )}
          {q.aide && <p className="aideQ">{q.aide}</p>}
          {!retour && q.astuce && <div className="astuce">{q.astuce}</div>}

          {q.type === "trous" ? (
            <Trous q={q} trous={trous} setTrous={setTrous} retour={retour} />
          ) : q.type === "ordre" ? (
            <Ordre q={q} choisis={choisis} setChoisis={setChoisis} retour={retour} />
          ) : q.type === "qcm" ? (
            <div className="qcm">
              {q.options.map((o) => (
                <button key={o} disabled={Boolean(retour)}
                  className={"opt" + (retour ? (o === q.reponse ? " j" : o === retour.reponse ? " f" : " attenue") : "")}
                  onClick={() => valider(o)}>
                  {o}
                </button>
              ))}
            </div>
          ) : (
            <input
              ref={champ}
              className="champ"
              value={retour ? retour.reponse : saisie}
              disabled={Boolean(retour)}
              style={{ marginTop: 18 }}
              placeholder={q.placeholder}
              autoCapitalize="off" autoCorrect="off" spellCheck={false}
              onChange={(e) => setSaisie(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                e.preventDefault();
                valider(saisie);
              }}
            />
          )}
          {!retour && q.type === "saisie" && (
            <BarreAccents champRef={champ} valeur={saisie} onChange={setSaisie} />
          )}

          {!retour && q.type !== "qcm" && (
            q.type !== "trous" && q.type !== "ordre" && !saisie.trim() ? (
              <button className="btn2" style={{ marginTop: 14, width: "100%" }} onClick={() => valider("")}>
                Je ne sais pas : voir la réponse
              </button>
            ) : (
              <button className="btn" style={{ marginTop: 14 }}
                disabled={(q.type === "ordre" && choisis.length !== q.mots.length) ||
                  (q.type === "trous" && q.blancs.some((b) => !(trous[b.blanc] || "").trim()))}
                onClick={() => (q.type === "trous" ? validerTrous() : valider(q.type === "ordre" ? phraseOrdre : saisie))}>
                Vérifier
              </button>
            )
          )}

          {retour && <Correction retour={retour} q={q} item={item} exo={exo} code={code} />}
        </div>

        {retour && (
          <button ref={boutonSuivant} className="btn" style={{ marginTop: 14 }} onClick={suivant}>
            {k + 1 < bassin.length ? "Question suivante" : "Terminer"}
          </button>
        )}
      </div>
    </>
  );
}

function Correction({ retour, q, item, exo, code }) {
  const bon = retour.verdict !== "faux" && retour.verdict !== "accent";
  const attendu = q.phrase ? q.reponse : q.reponse.split(/[,·]/)[0].trim();
  const [propose, setPropose] = useState(false);
  const [envoye, setEnvoye] = useState(false);

  // Le signalement n'a de sens que pour synonymes et contraires : ce sont
  // les deux exercices où plusieurs réponses différentes peuvent être
  // également valables, et où la fiche n'en liste souvent qu'une seule.
  // Même chose pour les phrases à traduire ou à transformer : il existe
  // souvent une autre formulation correcte que la fiche ne prévoit pas.
  // toute réponse écrite jugée fausse peut être signalée, sauf une conjugaison
  // (la forme y est unique) et une dictée (on écrit ce qu'on entend)
  const peutProposer =
    !bon && retour.reponse && q.type === "saisie" && item.module !== "verbes" && !q.dictee;

  const envoyerProposition = async () => {
    setPropose(true);
    await proposerMot(code, item.cle, retour.reponse, item.fr || q.reponse);
    setEnvoye(true);
  };

  const VERDICT = {
    exact: ["Juste", "ok"],
    proche: ["Presque : attention aux accents", "ok"],
    accent: ["Il manque un accent", "err"],
    faux: [retour.reponse || q.type === "trous" ? "Pas encore" : "La réponse", "err"],
  };
  const [mot, ton] = VERDICT[retour.verdict] || VERDICT.faux;

  return (
    <div className="correction">
      <div className="verdict">
        <span className={"verdictMot " + ton}>{mot}</span>
        <span className="verdictRetour">{bon ? retourDans(retour.boite) : "revient bientôt"}</span>
      </div>

      {q.explication && <div className="explication">{q.explication}</div>}

      {q.type === "trous" && (
        <p className="note" style={{ margin: "0 0 8px" }}>
          {retour.nbJustes} blanc{retour.nbJustes > 1 ? "s" : ""} juste{retour.nbJustes > 1 ? "s" : ""} sur {q.blancs.length}.
          {retour.verdict !== "exact" && " La bonne réponse est en vert à côté de chaque erreur."}
        </p>
      )}

      {retour.verdict !== "exact" && q.type !== "trous" && (
        <>
          {retour.reponse && q.type !== "qcm" && (
            <div className="diffLigne">
              {diff(retour.reponse, attendu).map((x, i) => (
                <span key={i} className={x.t === "trop" ? "dTrop" : x.t === "accent" ? "dAcc" : "dOk"}>{x.ch}</span>
              ))}
            </div>
          )}
          <div className="reponseAttendue">
            {q.reponse}
            <Ecouter texte={q.reponse} />
          </div>

          {peutProposer && (
            <div className={"proposer" + (envoye ? " fait" : "")}>
              {envoye ? "Transmis à votre enseignant. Merci !" : (
                <>Votre réponse vous semble juste ?{" "}
                  <button disabled={propose} onClick={envoyerProposition}>La signaler à l'enseignant</button>
                </>
              )}
            </div>
          )}
        </>
      )}

      {item.module === "lexique" && (
        <div className="details">
          {item.exemple && (
            <div className="exempleCorr">
              <span>{item.exemple}</span>
              <Ecouter texte={item.exemple} />
            </div>
          )}
          {item.construction && <Ligne libelle="Construction" valeur={item.construction} />}
          {item.piege && <Ligne libelle="À retenir" valeur={item.piege} />}
          {item.famille && <Ligne libelle="Même famille" valeur={item.famille} />}
          {item.syn && <Ligne libelle="Synonyme" valeur={item.syn} />}
          {item.ant && <Ligne libelle="Contraire" valeur={item.ant} />}
        </div>
      )}

      {item.module === "tournure" && (
        <div className="details">
          <Ligne libelle="Situation" valeur={item.situation} />
          <Ligne libelle="En allemand" valeur={item.de} />
        </div>
      )}

      {item.module === "phrase" && q.type === "ordre" && (
        <div className="details"><Ligne libelle="En allemand" valeur={item.de} /></div>
      )}

      {item.module === "verbes" && (
        <div className="details">
          <div className="sur">{item.inf}, {item.temps}</div>
          {item.type === "conjugaison" ? (
            <div className="conjTable">
              {item.formes.map((f, i) => (
                <div key={i}><span>{item.tempsCle === "subjonctif"
                  ? (/^[aeiouéèêh]/i.test(item.personnes[i]) ? `qu'${item.personnes[i]}` : `que ${item.personnes[i]}`)
                  : item.personnes[i]}</span><b>{f}</b></div>
              ))}
            </div>
          ) : (
            <>
              <Ligne libelle="Participe" valeur={item.participe} />
              <Ligne libelle="Auxiliaire" valeur={item.aux} />
              {item.aux === "être" && (
                <Ligne libelle="Accord" valeur={item.pronominal
                  ? `il s'est ${item.participe}, elle s'est ${item.participe}e, elles se sont ${item.participe}es`
                  : `il est ${item.participe}, elle est ${item.participe}e, elles sont ${item.participe}es`} />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* Un texte à trous : les blancs sont des champs dans le texte. Après
   correction, chaque blanc juste passe au vert ; un blanc faux montre
   la bonne réponse à côté de ce que l'élève a écrit. */
function Trous({ q, trous, setTrous, retour }) {
  return (
    <div className="trous">
      {q.titre && <p className="trousTitre">{q.titre}</p>}
      <p className="trousTexte">
        {q.segments.map((seg, i) => {
          if (seg.texte !== undefined) return <React.Fragment key={i}>{seg.texte}</React.Fragment>;
          const res = retour?.resultats?.[seg.blanc];
          const ok = res === "exact" || res === "proche";
          return (
            <span key={i} className="blancBoite">
              <input
                className={"blanc" + (retour ? (ok ? " ok" : " ko") : "")}
                value={trous[seg.blanc] || ""}
                disabled={Boolean(retour)}
                placeholder={seg.indice || "…"}
                size={Math.max(4, (seg.indice || seg.reponses[0]).length + 1)}
                aria-label={seg.indice ? `blanc : ${seg.indice}` : "blanc"}
                onChange={(e) => setTrous({ ...trous, [seg.blanc]: e.target.value })}
              />
              {retour && !ok && <span className="blancCorrige">{seg.reponses[0]}</span>}
            </span>
          );
        })}
      </p>
    </div>
  );
}

/* Les étiquettes à remettre dans l'ordre. Un clic pose le mot dans la
   phrase, un clic dans la phrase le retire. */
function Ordre({ q, choisis, setChoisis, retour }) {
  return (
    <div style={{ marginTop: 16 }}>
      <div className={"ordrePhrase" + (retour ? " fige" : "")} aria-live="polite">
        {choisis.length === 0 && <span className="ordreVide">Touchez les mots dans le bon ordre</span>}
        {choisis.map((i, k) => (
          <button key={k} className="etiquette posee" disabled={Boolean(retour)}
            onClick={() => setChoisis(choisis.filter((_, j) => j !== k))}>
            {q.mots[i]}
          </button>
        ))}
      </div>
      {!retour && (
        <div className="ordreReserve">
          {q.mots.map((m, i) => (
            <button key={i} className="etiquette" disabled={choisis.includes(i)}
              onClick={() => setChoisis([...choisis, i])}>
              {m}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* Le compteur qui défile jusqu'au score. */
function useDefile(cible, duree = 700) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setV(cible); return; }
    let raf; const t0 = performance.now();
    const pas = (t) => {
      const p = Math.min(1, (t - t0) / duree);
      setV(Math.round(cible * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(pas);
    };
    raf = requestAnimationFrame(pas);
    return () => cancelAnimationFrame(raf);
  }, [cible, duree]);
  return v;
}

function Fin({ justes, total, rates, onFin, onRattrapage, onTermine, defi, serie, serieDebut }) {
  const p = total ? Math.round((justes / total) * 100) : 0;
  // signalé une seule fois, au premier affichage de l'écran de fin
  useEffect(() => { onTermine && onTermine({ justes, total }); }, []); // eslint-disable-line
  const n = useDefile(defi ? p : justes);
  const serieMonte = serie > serieDebut;
  const uniques = [...new Map(rates.map((i) => [i.cle, i])).values()]; // un mot raté deux fois ne compte qu'une fois

  return (
    <div className="mur terminusMur" style={{ flex: 1 }}>
      <div className="wrap" style={{ maxWidth: 520 }}>
        <div className="plaque terminus"><span className="plaqueNom">Terminus</span></div>
        <div className="score" aria-label={defi ? `${p} %` : `${justes} sur ${total}`}>
          {defi ? <>{n}<span className="scoreSur"> %</span></> : <>{n}<span className="scoreSur"> / {total}</span></>}
        </div>
        <p className="scoreL">
          {defi
            ? p >= 70
              ? "Défi réussi. Il reste à écrire votre texte : c'est lui que votre enseignant lira."
              : "Pas encore : il faut 70 % pour valider l'unité. Vous pouvez quand même écrire votre texte, puis retenter le défi."
            : p >= 80
            ? "Très bien. Revenez demain : c'est en revenant souvent que les mots restent."
            : p >= 50
            ? "Pas mal. Ce qui est raté revient dès la prochaine séance."
            : "C'était difficile. Plusieurs petites séances valent mieux qu'une longue."}
        </p>
        {defi && p >= 70 && <span className="valideTampon">Validé</span>}

        {!defi && serieMonte && (
          <div className="finSerie">
            <span className="serieN flip"><span>{serie}</span></span>
            <span className="serieL">{serie === 1 ? "premier jour de série" : `jours de suite`}</span>
          </div>
        )}

        <div className="finActions">
          <button className="btn" onClick={() => onFin(defi ? { justes, total, part: p } : undefined)}>
            {defi ? (p >= 70 ? "Écrire mon texte" : "Retour à l'unité") : "Continuer"}
          </button>
          {defi && p < 70 && (
            <button className="btn2" onClick={() => onFin({ justes, total, part: p, ecrire: true })}>
              Écrire mon texte maintenant
            </button>
          )}
          {!defi && uniques.length > 0 && (
            <button className="btn2" onClick={() => onRattrapage(uniques)}>
              Refaire {uniques.length === 1 ? "la question ratée" : `les ${uniques.length} questions ratées`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
