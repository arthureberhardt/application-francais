import React, { useState } from "react";
import {
  itemsDe, itemsCumules, listeSemestres, infosSemestre, unitesDe, tempsJusqua, verbesGroupes,
} from "../lib/items.js";
import { categorie, SEUIL, estDu, estDifficile, joursActifs, travailleAujourdhui,
  etatVerbe, travailAujourdhui, OBJECTIF_JOUR } from "../lib/leitner.js";
import { enLigne } from "../lib/store.js";
import { sonDisponible } from "../lib/voix.js";
import { filiereActive } from "../lib/items.js";
import { disponibilite } from "../lib/exercices.js";
import { Statistiques, Anneau, ObjectifJour } from "./Commun.jsx";

const SEUIL_EXAMEN = 85;

export default function Accueil({ code, semestre, setSemestre, semestreMax, progression, onLancer, onConsulter, onBadges, onAide, onExamen, onQuitter }) {
  const [ouvert, setOuvert] = useState(null); // "lexique" | "verbes" | "bilan"
  const [selLex, setSelLex] = useState([]);   // thèmes cochés en attente de lancement
  const [selVerb, setSelVerb] = useState([]); // temps cochés en attente de lancement
  const [illimiteLex, setIllimiteLex] = useState(false);
  const [illimiteVerb, setIllimiteVerb] = useState(false);
  const { lexique, approfondissement, verbes, tous } = itemsDe(semestre);
  const infos = infosSemestre(semestre);
  const cumul = itemsCumules(semestre);

  // les verbes se comptent en verbes, non en couples verbe × temps :
  // 220 verbes se conçoivent, 1 945 objets non.
  const verbesGr = verbesGroupes(semestre);
  const acquisMots = lexique.filter((i) => categorie(progression[i.cle]) === "acquis").length;
  const acquisVerbes = verbesGr.filter((v) => etatVerbe(v.couples, progression) === "acquis").length;
  const totalCompte = lexique.length + verbesGr.length;
  const part = totalCompte ? Math.round(((acquisMots + acquisVerbes) / totalCompte) * 100) : 0;
  const faitAujourdhui = travailAujourdhui(progression);
  const son = sonDisponible();
  const motsCumules = cumul.filter((i) => i.module === "lexique");
  const exos = disponibilite(motsCumules);
  const dus = cumul.filter((i) => estDu(progression[i.cle]) && categorie(progression[i.cle]) !== "acquis").length;
  const difficiles = cumul.filter((i) => estDifficile(progression[i.cle]));
  const jours = joursActifs(progression);
  const aujourdhui = travailleAujourdhui(progression);

  const titre =
    part >= SEUIL_EXAMEN ? "Vous êtes prêt pour le test."
    : part >= 50 ? "Vous avancez bien. Continuez."
    : part > 0 ? "Vous avez commencé. Bravo."
    : "Vous n'avez pas encore commencé.";

  const bascule = (k) => setOuvert(ouvert === k ? null : k);
  const compte = (items) => items.filter((i) => categorie(progression[i.cle]) === "acquis").length;

  return (
    <>
      {/* ═══ bandeau ═══ */}
      <div className="bandeau">
        <div className="wrap">
          <div className="bandeauHaut">
            <span style={{ display: "flex", gap: 7, alignItems: "center" }}>
              <span className="code">{code}</span>
              <span className="etiquetteFiliere">{filiereActive().nom}</span>
            </span>
            <div style={{ display: "flex", gap: 4 }}>
              <button className="lienClair" onClick={onAide}>Aide</button>
              <button className="lienClair" onClick={onQuitter}>Quitter</button>
            </div>
          </div>

          <div className="bilanHaut">
            <Anneau part={part} />
            <div style={{ minWidth: 0 }}>
              <div className="dsp" style={{ fontSize: 25, marginBottom: 6 }}>{titre}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.68)", lineHeight: 1.55 }}>
Vous êtes prêt à partir de {SEUIL_EXAMEN} %.
                {dus > 0 && <> Aujourd'hui, {dus} mot{dus > 1 ? "s sont" : " est"} à revoir.</>}
              </div>
            </div>
          </div>

          <ObjectifJour fait={faitAujourdhui} objectif={OBJECTIF_JOUR} />

          <div className="regularite">
            <div className="regJours">
              {Array.from({ length: 14 }, (_, i) => (
                <span key={i} className={"regPoint" + (i < jours ? " on" : "")} />
              ))}
            </div>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.68)" }}>
Vous avez travaillé {jours} jour{jours > 1 ? "s" : ""} sur les 14 derniers
              {aujourdhui ? ", dont aujourd'hui" : ""}.
            </span>
          </div>

          <div className="sur" style={{ marginBottom: 7 }}>Semestre</div>
          <div className="semestres">
            {listeSemestres().map((s) => {
              const verrouille = Boolean(semestreMax) && s.numero > semestreMax;
              return (
                <button
                  key={s.numero}
                  className={"semBtn" + (s.numero === semestre ? " on" : "") + (verrouille ? " verrouille" : "")}
                  onClick={() => { if (!verrouille) { setSemestre(s.numero); setOuvert(null); } }}
                  title={verrouille
                    ? "Pas encore ouvert par votre enseignant"
                    : `${s.niveau} · ${s.temps}`}
                >
                  {verrouille ? "🔒" : `S${s.numero}`}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="main wrap">
        <p className="note" style={{ fontSize: 12.5, marginTop: 0, marginBottom: 20 }}>
          Niveau {infos.niveau}. Ce semestre, vous travaillez : {infos.temps}.
        </p>

        <div className="sur" style={{ marginBottom: 9 }}>Vos résultats</div>
        <Statistiques progression={progression} items={lexique} verbes={verbesGr} />

        <div className="sur" style={{ margin: "26px 0 10px" }}>Choisissez un exercice</div>
        <div style={{ display: "grid", gap: 9 }}>

          {/* ── lexique ── */}
          <Mode
            couleur="var(--bleu)" titre="Les mots"
            detail={`${lexique.length} mots · ${unitesDe(semestre).length} thèmes`}
            sous="Apprenez les mots du semestre. Vous pouvez choisir un seul thème."
            compteur={`${compte(lexique)}/${lexique.length}`}
            onClick={() => bascule("lexique")}
          />
          {ouvert === "lexique" && (
            <div className="filtres">
              <Filtre tout libelle="Tous les mots du semestre" valeur={lexique.length}
                onClick={() => onLancer("lexique", {})} />
              {unitesDe(semestre).map((u) => {
                const items = lexique.filter((i) => i.unite === u.nom);
                return (
                  <Filtre key={u.nom} libelle={u.nom}
                    valeur={`${compte(items)}/${u.mots}`}
                    coche={selLex.includes(u.nom)}
                    onClick={() => setSelLex((s) =>
                      s.includes(u.nom) ? s.filter((x) => x !== u.nom) : [...s, u.nom])} />
                );
              })}
              <SelectionMultiple
                n={selLex.length} illimite={illimiteLex} setIllimite={setIllimiteLex}
                onLancer={() => onLancer("lexique", { unites: selLex, illimite: illimiteLex })}
              />
            </div>
          )}

          {/* ── verbes ── */}
          <Mode
            couleur="var(--rouge)" titre="Les verbes"
            detail={verbesGr.length
              ? `${verbesGr.length} verbes · ${tempsJusqua(semestre).length} temps`
              : "bientôt disponible"}
            sous="Conjuguez les verbes aux temps que vous avez appris jusqu'ici."
            compteur={verbesGr.length ? `${acquisVerbes}/${verbesGr.length}` : "—"}
            onClick={() => verbes.length && bascule("verbes")}
            inactif={!verbes.length}
          />
          {ouvert === "verbes" && (
            <div className="filtres">
              <Filtre tout libelle="Tous les temps ensemble" valeur={verbes.length}
                onClick={() => onLancer("verbes", {})} />
              {tempsJusqua(semestre).map((t) => {
                const items = verbes.filter((i) => i.tempsCle === t.cle);
                if (!items.length) return null;
                return (
                  <Filtre key={t.cle} libelle={t.nom}
                    valeur={`${compte(items)}/${items.length}`}
                    coche={selVerb.includes(t.cle)}
                    onClick={() => setSelVerb((s) =>
                      s.includes(t.cle) ? s.filter((x) => x !== t.cle) : [...s, t.cle])} />
                );
              })}
              <SelectionMultiple
                n={selVerb.length} illimite={illimiteVerb} setIllimite={setIllimiteVerb}
                onLancer={() => onLancer("verbes", { tempsCles: selVerb, illimite: illimiteVerb })}
              />
            </div>
          )}

          {/* ── exercices spéciaux ── */}
          {exos.length > 0 && (
            <>
              <Mode
                couleur="var(--ambre)" titre="Exercices spéciaux"
                detail={`${exos.length} sortes d'exercices`}
                sous="Conjuguer dans une phrase, le genre des noms, les prépositions, les synonymes, les contraires, les familles de mots."
                onClick={() => bascule("special")}
              />
              {ouvert === "special" && (
                <div className="filtres">
                  {exos.map((e) => (
                    <button key={e.cle} className="filtreBtn filtreLarge"
                      onClick={() => onLancer("special", { exercice: e.cle })}>
                      <span>
                        <span style={{ fontWeight: 700 }}>{e.nom}</span>
                        <span className="note" style={{ display: "block", fontSize: 12.5, marginTop: 2 }}>
                          {e.sous}
                        </span>
                      </span>
                      <span className="mono">{e.nombre}</span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ── dictée ── */}
          {son && (
            <Mode
              couleur="var(--bleu-fonce)" titre="Dictée"
              detail={`${lexique.length} mots · vous écoutez et vous écrivez`}
              sous="Le mot est lu à voix haute. Écrivez ce que vous entendez. C'est le seul exercice qui travaille l'orthographe à partir du son."
              onClick={() => onLancer("dictee", {})}
            />
          )}

          {/* ── mots difficiles ── */}
          {difficiles.length > 0 && (
            <Mode
              couleur="var(--ambre)" titre="Mots difficiles"
              detail={`${difficiles.length} mot${difficiles.length > 1 ? "s" : ""} vous résiste${difficiles.length > 1 ? "nt" : ""}`}
              sous="Vous faites souvent des fautes avec ces mots. Ici, on vous montre d'abord la réponse."
              onClick={() => onLancer("difficiles", {})}
            />
          )}

          {/* ── bilan ── */}
          <Mode
            couleur="var(--vert)" titre="Tout revoir"
            detail={dus > 0
              ? `${dus} mot${dus > 1 ? "s" : ""} à revoir aujourd'hui`
              : "rien d'urgent aujourd'hui"}
            sous={semestre === 1
              ? "Mots et verbes mélangés, 30 questions."
              : `Mots et verbes des semestres 1 à ${semestre}, mélangés, 30 questions.`}
            compteur={dus > 0 ? `${Math.min(dus, 30)} en attente` : "à jour"}
            onClick={() => bascule("bilan")}
          />
          {ouvert === "bilan" && (
            <div className="filtres">
              <Filtre tout libelle="Tout, depuis le début" valeur={dus > 0 ? `${dus} à revoir` : "à jour"}
                onClick={() => onLancer("bilan", {})} />
              {listeSemestres().filter((s) => s.numero <= semestre).map((s) => {
                const items = itemsDe(s.numero).lexique;
                return (
                  <Filtre key={s.numero} libelle={`Les mots du semestre ${s.numero}`}
                    valeur={`${compte(items)}/${items.length} mots`}
                    onClick={() => onLancer("bilan", { semestreCible: s.numero })} />
                );
              })}
            </div>
          )}
        </div>

        {approfondissement.length > 0 && (
          <>
            <div className="sur" style={{ margin: "26px 0 10px" }}>Pour aller plus loin</div>
            <Mode
              couleur="var(--ambre)" titre="Pour aller plus loin"
              detail={`${approfondissement.length} mots en plus`}
              sous="Ces mots ne sont pas obligatoires. Il suffit de les comprendre : on ne vous demande jamais de les écrire."
              compteur={`${compte(approfondissement)}/${approfondissement.length}`}
              onClick={() => onLancer("approfondissement", {})}
            />
          </>
        )}

        <div className="sur" style={{ margin: "26px 0 10px" }}>Vous tester</div>
        <Mode
          couleur="var(--encre)" titre="Examen blanc"
          detail="40 questions · 20 minutes"
          sous="Comme un vrai test : pas d'aide, pas de correction avant la fin. Vos réponses ici ne changent pas vos résultats habituels."
          onClick={onExamen}
        />

        <div className="sur" style={{ margin: "26px 0 10px" }}>Regarder sans être interrogé</div>
        <div style={{ display: "grid", gap: 9 }}>
        <Mode
          couleur="var(--vert)" titre="Vos récompenses" detail="ce que vous avez déjà gagné"
          sous="Elles récompensent votre travail à vous. Il n'y a aucun classement entre élèves."
          onClick={onBadges}
        />
        <Mode
          couleur="var(--ardoise)" titre="Tous les mots et tous les verbes" detail="la liste complète"
          sous="Regardez la liste, cherchez un mot, ouvrez une fiche. Personne ne vous interroge."
          onClick={onConsulter}
        />
        </div>

        <p className="note" style={{ marginTop: 24, fontSize: 12.5 }}>
          Un mot devient « vu » dès la première bonne réponse. Il devient
          « parfaitement connu » après {SEUIL} bonnes réponses, <em>à des jours
          différents</em>. Répéter cinq fois le même jour ne suffit pas.{" "}
          <button className="lienTexte" onClick={onAide}>Comment ça marche ?</button>
        </p>
        <p className="note" style={{ marginTop: 10, fontSize: 12.5 }}>
          {enLigne
            ? "Vos résultats sont enregistrés. Vous les retrouvez sur tous vos appareils avec le même code."
            : "Attention : vos résultats restent seulement sur cet appareil et dans ce navigateur. Sur téléphone, l'application posée sur l'écran d'accueil garde ses propres résultats, différents de ceux du navigateur."}
        </p>
      </div>
    </>
  );
}

function Mode({ couleur, titre, detail, sous, compteur, onClick, inactif }) {
  return (
    <button className="carteMode" disabled={inactif} onClick={onClick}>
      <div className="modeIn">
        <div className="modeBarre" style={{ background: couleur }} />
        <div className="modeCorps">
          <div className="modeTitre">
            <span className="h2">{titre}</span>
            {compteur && (
              <span className="mono" style={{ fontSize: 11.5, color: "var(--ardoise)" }}>{compteur}</span>
            )}
          </div>
          <div className="boiteL" style={{ margin: "3px 0 6px" }}>{detail}</div>
          <div className="note" style={{ fontSize: 13 }}>{sous}</div>
        </div>
      </div>
    </button>
  );
}

const Filtre = ({ libelle, valeur, onClick, tout, coche }) => (
  <button className={"filtreBtn" + (tout ? " tout" : "") + (coche ? " coche" : "")} onClick={onClick}>
    {!tout && (
      <span className="filtreCase" aria-hidden="true">{coche ? "✓" : ""}</span>
    )}
    <span>{libelle}</span>
    <span className="mono">{valeur}</span>
  </button>
);

/** Sous « tout » et les thèmes un par un : cocher plusieurs thèmes à la fois,
    et choisir une séance longue plutôt que la longueur habituelle de 12. */
function SelectionMultiple({ n, illimite, setIllimite, onLancer }) {
  if (!n) return null;
  return (
    <div className="selectionMultiple">
      <label className="illimiteCase">
        <input type="checkbox" checked={illimite} onChange={(e) => setIllimite(e.target.checked)} />
        <span>Séance longue, sans limite de questions</span>
      </label>
      <button className="btn" style={{ marginTop: 10 }} onClick={onLancer}>
        Lancer avec {n} thème{n > 1 ? "s" : ""} sélectionné{n > 1 ? "s" : ""}
      </button>
    </div>
  );
}
