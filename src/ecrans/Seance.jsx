import React, { useState, useMemo, useRef, useEffect } from "react";
import { itemsDe, itemsCumules, infosSemestre } from "../lib/items.js";
import { apresReponse, etatInitial, estDifficile } from "../lib/leitner.js";
import { composer } from "../lib/seance.js";
import { evalue, diff } from "../lib/correction.js";
import { question } from "../lib/questions.js";
import { exercicePar } from "../lib/exercices.js";
import { VERBE_PAR_INF } from "../donnees/index.js";
import { enregistrerItem } from "../lib/store.js";
import { Rail, Ligne } from "./Commun.jsx";
import { Ecouter, BarreAccents } from "./Outils.jsx";
import { lire, taire, sonDisponible } from "../lib/voix.js";

export default function Seance({ mode, filtre = {}, semestre, code, progression, setProgression, onFin }) {
  const { unite, tempsCle, semestreCible, exercice } = filtre;
  const exo = exercice ? exercicePar(exercice) : null;

  const bassin = useMemo(() => {
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
    return composer(source, progression, mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, semestre, unite, tempsCle, semestreCible]);

  const NOM_MODE = {
    lexique: "les mots", verbes: "les verbes", bilan: "tout revoir",
    difficiles: "mots difficiles", approfondissement: "pour aller plus loin",
    dictee: "dictée", special: "exercice spécial",
  };
  const etiquette =
    (exo && exo.nom.toLowerCase()) || unite || tempsCle ||
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
  const [retour, setRetour] = useState(null);
  const [flash, setFlash] = useState(null);
  const [justes, setJustes] = useState(0);
  const champ = useRef(null);
  const son = sonDisponible();

  const item = bassin[k];
  const q = useMemo(
    () => {
      if (!item) return null;
      if (exo) return exo.question(item, bassinComplet, (inf) => VERBE_PAR_INF[inf]);
      return question(item, progression[item.cle], vocabDuSemestre, semestre, mode);
    },
    [item] // eslint-disable-line
  );

  /* En mode « mots difficiles », le mot est montré avant d'être demandé :
     le redemander à l'aveugle une sixième fois ne servirait à rien. */
  const [devoile, setDevoile] = useState(mode === "difficiles");
  useEffect(() => setDevoile(mode === "difficiles"), [k, mode]);

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

  if (!item) return <Fin justes={justes} total={bassin.length} onFin={onFin} />;

  const valider = (reponse) => {
    if (retour) return;
    const verdict =
      q.type === "qcm"
        ? reponse === q.reponse ? "exact" : "faux"
        : evalue(reponse, q.reponse, q.aussi);
    const juste = verdict !== "faux";

    const etat = apresReponse(progression[item.cle], juste);
    const suivante = { ...progression, [item.cle]: etat };
    setProgression(suivante);
    enregistrerItem(code, item.cle, etat, suivante);

    setRetour({ verdict, reponse, boite: etat.boite });
    setFlash(etat.boite);
    if (juste) setJustes((x) => x + 1);
    setTimeout(() => setFlash(null), 500);
  };

  const suivant = () => { setRetour(null); setSaisie(""); setK(k + 1); };

  return (
    <>
      <div className="bar">
        <div className="wrap barIn">
          <button className="lien" onClick={onFin}>← Arrêter</button>
          <span className="sur">{etiquette}</span>
          <span className="mono" style={{ fontSize: 12.5, color: "var(--ardoise)" }}>
            {k + 1} / {bassin.length}
          </span>
        </div>
        <div className="prog">
          <div className="progIn" style={{ width: `${(k / bassin.length) * 100}%` }} />
        </div>
      </div>

      <div className="main wrap">
        {devoile && !retour && item.module !== "verbes" && (
          <div className="carte rappelDifficile">
            <div className="sur">Ce mot vous résiste. Regardez-le bien.</div>
            <div className="dsp" style={{ fontSize: 24, margin: "8px 0 3px" }}>{item.fr}</div>
            <div className="note">{item.de}</div>
            {item.exemple && (
              <div style={{ fontSize: 14.5, fontStyle: "italic", marginTop: 8 }}>{item.exemple}</div>
            )}
            <button className="btn2" style={{ marginTop: 12 }} onClick={() => setDevoile(false)}>
              C'est bon, posez-moi la question
            </button>
          </div>
        )}

        <div className="carte apparait" style={devoile && !retour ? { opacity: .35 } : null}>
          <div className="sur">{q.consigne}</div>
          {q.dictee ? (
            <div className="zoneEcoute">
              <Ecouter texte={q.dictee} grand libelle="Réécouter" />
              <Ecouter texte={q.dictee} lent libelle="Plus lentement" />
            </div>
          ) : (
            <div className="dsp questionMot">
              {q.invite}
              {son && item.module === "lexique" && !q.reponse.includes(q.invite) && (
                <Ecouter texte={q.invite} />
              )}
            </div>
          )}
          {q.aide && <div className="note" style={{ marginBottom: 4 }}>{q.aide}</div>}
          {!retour && q.astuce && (
            <div className="boiteL" style={{ marginTop: 6 }}>{q.astuce}</div>
          )}

          {q.type === "qcm" ? (
            <div className="qcm" style={{ marginTop: 18 }}>
              {q.options.map((o) => (
                <button
                  key={o}
                  className={
                    "opt" +
                    (retour ? (o === q.reponse ? " j" : o === retour.reponse ? " f" : "") : "")
                  }
                  onClick={() => valider(o)}
                >
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
              onChange={(e) => setSaisie(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && valider(saisie)}
            />
          )}
          {!retour && q.type !== "qcm" && (
            <BarreAccents champRef={champ} valeur={saisie} onChange={setSaisie} />
          )}

          {!retour && q.type !== "qcm" && (
            <button className="btn" style={{ marginTop: 12 }} onClick={() => valider(saisie)}>
              Vérifier
            </button>
          )}

          {retour && <Correction retour={retour} q={q} item={item} />}
        </div>

        {retour && (
          <button className="btn" style={{ marginTop: 14 }} onClick={suivant} autoFocus>
            Suivant
          </button>
        )}
      </div>

      <div className="pied">
        <div className="wrap">
          <Rail
            progression={progression}
            actif={retour ? retour.boite : (progression[item.cle] || etatInitial()).boite}
            flash={flash}
          />
        </div>
      </div>
    </>
  );
}

function Correction({ retour, q, item }) {
  const bon = retour.verdict !== "faux";
  const attendu = q.reponse.split(/[,·]/)[0].trim();

  return (
    <div className="apparait" style={{ marginTop: 20, paddingTop: 18, borderTop: "1px solid var(--trait)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span
          className={"pill " + (bon ? "ok" : "err")}
          style={{ background: bon ? "#EDF5F2" : "#FCEDED" }}
        >
          {retour.verdict === "exact"
            ? "Juste !"
            : retour.verdict === "proche"
            ? "Juste ! Attention à l'orthographe"
            : "Faux"}
        </span>
        <span className="boiteL">ce mot passe dans la boîte {retour.boite}</span>
      </div>

      {retour.verdict !== "exact" && (
        <>
          {retour.reponse && (
            <div style={{ fontSize: 18, marginBottom: 6 }}>
              {diff(retour.reponse, attendu).map((s, i) => (
                <span
                  key={i}
                  className={s.t === "trop" ? "dTrop" : s.t === "accent" ? "dAcc" : "dOk"}
                >
                  {s.ch}
                </span>
              ))}
            </div>
          )}
          <div style={{ fontSize: 19, fontWeight: 600, display: "flex",
            alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {q.reponse}
            <Ecouter texte={q.reponse} />
          </div>
        </>
      )}

      {item.module === "lexique" && (
        <div style={{ marginTop: 14, display: "grid", gap: 6 }}>
          {item.exemple && (
            <div style={{ fontSize: 15, fontStyle: "italic", display: "flex",
              alignItems: "flex-start", gap: 8 }}>
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

      {item.module === "verbes" && (
        <div style={{ marginTop: 14 }}>
          <div className="sur" style={{ marginBottom: 6 }}>
            {item.inf} · {item.temps}
          </div>
          {item.type === "conjugaison" ? (
            <div className="mono" style={{ fontSize: 13, lineHeight: 1.9, color: "var(--ardoise)" }}>
              {item.formes.map((f, i) => (
                <div key={i}>
                  <span style={{ display: "inline-block", minWidth: 82 }}>{item.personnes[i]}</span>
                  <span style={{ color: "var(--encre)", fontWeight: 600 }}>{f}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gap: 5 }}>
              <Ligne libelle="Participe" valeur={item.participe} />
              <Ligne libelle="Auxiliaire" valeur={item.aux} />
              {item.aux === "être" && (
                <Ligne
                  libelle="Accord"
                  valeur={
                    item.pronominal
                      ? `il s'est ${item.participe} · elle s'est ${item.participe}e · elles se sont ${item.participe}es`
                      : `il est ${item.participe} · elle est ${item.participe}e · elles sont ${item.participe}es`
                  }
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Fin({ justes, total, onFin }) {
  const p = total ? Math.round((justes / total) * 100) : 0;
  return (
    <div className="main wrap" style={{ paddingTop: 60, maxWidth: 460 }}>
      <div className="sur">Exercice terminé</div>
      <div className="dsp" style={{ fontSize: 52, margin: "10px 0 2px" }}>
        {justes} / {total}
      </div>
      <p className="note" style={{ marginBottom: 26 }}>
        {p >= 80
          ? "Très bien. Revenez demain : c'est en revenant souvent que les mots restent."
          : p >= 50
          ? "Pas mal. Les mots ratés sont retournés dans la boîte 1. Ils reviendront vite."
          : "C'était difficile. Faites plutôt plusieurs petits exercices qu'un seul long."}
      </p>
      <button className="btn" onClick={onFin}>Retour à l'accueil</button>
    </div>
  );
}
