import React, { useState, useMemo } from "react";
import { itemsDe, verbesConsultables, NOM_CATEGORIE } from "../lib/items.js";
import { categorie } from "../lib/leitner.js";
import { Ligne, Fenetre, COULEUR, ETIQUETTE } from "./Commun.jsx";

const sansAccents = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function Liste({ semestre, progression, onFin }) {
  const [onglet, setOnglet] = useState("mots");
  const [recherche, setRecherche] = useState("");
  const [ouvert, setOuvert] = useState(null);

  return (
    <>
      <div className="bar">
        <div className="wrap barIn">
          <button className="lien" onClick={onFin}>← Retour</button>
          <span className="sur">semestre {semestre}</span>
          <span style={{ width: 60 }} />
        </div>
      </div>

      <div className="main wrap">
        <div className="tab" style={{ marginBottom: 14 }}>
          <button className={onglet === "mots" ? "on" : ""} onClick={() => { setOnglet("mots"); setOuvert(null); }}>
            Les mots
          </button>
          <button className={onglet === "verbes" ? "on" : ""} onClick={() => { setOnglet("verbes"); setOuvert(null); }}>
            Les verbes
          </button>
        </div>

        <input
          className="champ"
          style={{ fontSize: 15, padding: "10px 14px", marginBottom: 16 }}
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder={onglet === "mots" ? "Cherchez un mot en français ou en allemand…" : "Cherchez un verbe…"}
        />

        {onglet === "mots" ? (
          <Mots semestre={semestre} progression={progression}
            recherche={recherche} setOuvert={setOuvert} />
        ) : (
          <Verbes semestre={semestre} progression={progression}
            recherche={recherche} setOuvert={setOuvert} />
        )}
      </div>

      {ouvert && onglet === "mots" && (
        <Fenetre
          titre={ouvert.fr} sous={ouvert.de}
          onFermer={() => setOuvert(null)}
        >
          <FicheMot m={ouvert} etat={progression[ouvert.cle]} />
        </Fenetre>
      )}
      {ouvert && onglet === "verbes" && (
        <Fenetre
          titre={ouvert.inf} sous={ouvert.de}
          onFermer={() => setOuvert(null)}
        >
          <FicheVerbe v={ouvert} progression={progression} />
        </Fenetre>
      )}
    </>
  );
}

/* ─────────── les mots, groupés par unité ─────────── */
function Mots({ semestre, progression, recherche, setOuvert }) {
  const groupes = useMemo(() => {
    const q = sansAccents(recherche.trim());
    const items = itemsDe(semestre).lexique.filter(
      (i) => !q || sansAccents(i.fr).includes(q) || sansAccents(i.de).includes(q)
    );
    const par = {};
    for (const i of items) (par[i.unite] = par[i.unite] || []).push(i);
    return Object.entries(par);
  }, [semestre, recherche]);

  if (!groupes.length) return <p className="note">Aucun mot ne correspond à votre recherche.</p>;

  return (
    <>
      {groupes.map(([unite, mots]) => {
        const a = mots.filter((m) => categorie(progression[m.cle]) === "acquis").length;
        return (
          <div key={unite} style={{ marginBottom: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 7 }}>
              <span className="sur">{unite}</span>
              <span className="mono" style={{ fontSize: 11, color: "var(--ardoise)" }}>
                {a}/{mots.length}
              </span>
            </div>
            <div className="listeC">
              {mots.map((m) => {
                const c = categorie(progression[m.cle]);
                return (
                  <button key={m.cle} className="rang" onClick={() => setOuvert(m)}>
                    <span className="pastille" style={{ background: COULEUR[c] }} title={ETIQUETTE[c]} />
                    <span className="rangFr">{m.fr}</span>
                    <span className="rangDe">{m.de}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}

function FicheMot({ m, etat }) {
  const c = categorie(etat);
  return (
    <div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
        <span className="pill" style={{ background: "#EEF1F5", color: "var(--ardoise)" }}>
          {NOM_CATEGORIE[m.cat]}
        </span>
        <span className="boiteL">
          {ETIQUETTE[c]}
          {etat && etat.ok > 0 && ` · boîte ${etat.boite} · ${etat.ok} réussite${etat.ok > 1 ? "s" : ""}`}
        </span>
      </div>
      <div style={{ display: "grid", gap: 6 }}>
        {m.exemple && <div style={{ fontSize: 15, fontStyle: "italic" }}>{m.exemple}</div>}
        {m.gram && <Ligne libelle="Grammaire" valeur={m.gram} />}
        {m.construction && <Ligne libelle="Construction" valeur={m.construction} />}
        {m.piege && <Ligne libelle="À retenir" valeur={m.piege} />}
        {m.famille && <Ligne libelle="Même famille" valeur={m.famille} />}
        {m.syn && <Ligne libelle="Synonyme" valeur={m.syn} />}
        {m.ant && <Ligne libelle="Contraire" valeur={m.ant} />}
        {!m.exemple && !m.piege && (
          <div className="note" style={{ fontSize: 12.5 }}>
            La fiche détaillée de ce mot n'est pas encore écrite.
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────── les verbes, avec toutes leurs conjugaisons ─────────── */
function Verbes({ semestre, progression, recherche, setOuvert }) {
  const liste = useMemo(() => {
    const q = sansAccents(recherche.trim());
    return verbesConsultables(semestre).filter(
      (v) => !q || sansAccents(v.inf).includes(q) || sansAccents(v.de).includes(q)
    );
  }, [semestre, recherche]);

  const parSemestre = useMemo(() => {
    const par = {};
    for (const v of liste) (par[v.sem] = par[v.sem] || []).push(v);
    return Object.entries(par);
  }, [liste]);

  if (!liste.length) return <p className="note">Aucun verbe ne correspond à votre recherche.</p>;

  return (
    <>
      {parSemestre.map(([sem, verbes]) => (
        <div key={sem} style={{ marginBottom: 22 }}>
          <div className="sur" style={{ marginBottom: 7 }}>
            verbes appris au semestre {sem} — {verbes.length} verbes
          </div>
          <div className="listeC">
            {verbes.map((v) => {
              const cles = v.temps.map((t) => `c:${v.id}:${t.cle}`);
              const a = cles.filter((c) => categorie(progression[c]) === "acquis").length;
              return (
                <button key={v.inf} className="rang" onClick={() => setOuvert(v)}>
                  <span className="pastille" style={{
                    background: a === cles.length ? "var(--vert)" : a > 0 ? "var(--ambre)" : "#CBD2DC",
                  }} />
                  <span className="rangFr">{v.inf}</span>
                  <span className="rangDe">{v.de}</span>
                  <span className="mono" style={{ fontSize: 11, color: "var(--ardoise)" }}>
                    {a}/{cles.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}

function FicheVerbe({ v, progression }) {
  const pers = v.impersonnel
    ? ["il"]
    : ["je", "tu", "il / elle", "nous", "vous", "ils / elles"];
  const persImp = ["(tu)", "(nous)", "(vous)"];

  return (
    <div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
        <span className="pill" style={{ background: "#EEF1F5", color: "var(--ardoise)" }}>
          auxiliaire {v.aux}
        </span>
        <span className="pill" style={{ background: "#EEF1F5", color: "var(--ardoise)" }}>
          participe : {v.participe}
        </span>
        {v.pronominal && (
          <span className="pill" style={{ background: "#EEF1F5", color: "var(--ardoise)" }}>
            pronominal
          </span>
        )}
        {v.impersonnel && (
          <span className="pill" style={{ background: "#EEF1F5", color: "var(--ardoise)" }}>
            impersonnel
          </span>
        )}
      </div>

      {v.temps.map((t) => {
        const c = categorie(progression[`c:${v.id}:${t.cle}`]);
        return (
          <div key={t.cle} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
              <span className="pastille" style={{ background: COULEUR[c] }} />
              <span className="sur">{t.nom}</span>
            </div>
            {t.formes ? (
              <div className="mono conj">
                {t.formes.map((f, i) => (
                  <div key={i}>
                    <span className="conjP">{(t.cle === "imperatif" ? persImp : pers)[i]}</span>
                    <span className="conjF">{f}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mono conj">
                <div><span className="conjP">forme</span>
                  <span className="conjF">
                    {v.impersonnel ? "il" : "il / elle"}{" "}
                    {v.aux === "être" ? (v.impersonnel ? "a" : "est") : "a"}{" "}
                    {v.participe}
                  </span>
                </div>
                {v.aux === "être" && !v.impersonnel && (
                  <div><span className="conjP">accord</span>
                    <span className="conjF">
                      elle {v.pronominal ? "s'est" : "est"} {v.participe}e ·
                      elles {v.pronominal ? "se sont" : "sont"} {v.participe}es
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
