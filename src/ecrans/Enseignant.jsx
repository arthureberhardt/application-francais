import React, { useState, useEffect, useMemo } from "react";
import {
  connexionEnseignant, deconnexionEnseignant, sessionEnseignant,
  listerSuivi, ajouterCodes, activerCode, renommerCode, supprimerCodes,
  listerProgressionClasse, enLigne,
} from "../lib/store.js";
import { FILIERES, PAR_ID, TEMPS } from "../donnees/index.js";
import { categorie } from "../lib/leitner.js";

/* Repère ce qui résiste à toute une classe, pas seulement à un élève.
   Le nom du temps est directement encodé dans la clé de progression
   (« c:{verbe}:{tempsCle} ») : nul besoin de recharger les tables de
   conjugaison pour l'agrégation, juste de découper la chaîne. */
const NOM_TEMPS = Object.fromEntries(TEMPS.map((t) => [t.cle, t.nom]));
const SEUIL_SIGNIFICATIF = 5; // en dessous, un seul élève peut fausser le chiffre

function agreger(lignes, { prefixe, nommer }) {
  const par = {};
  for (const l of lignes) {
    if (!l.cle.startsWith(prefixe)) continue;
    const nom = nommer(l.cle);
    if (!nom) continue;
    (par[nom] = par[nom] || { total: 0, acquis: 0 });
    par[nom].total++;
    if (categorie(l) === "acquis") par[nom].acquis++;
  }
  return Object.entries(par)
    .filter(([, v]) => v.total >= SEUIL_SIGNIFICATIF)
    .map(([nom, v]) => ({ nom, ...v, part: Math.round((v.acquis / v.total) * 100) }))
    .sort((a, b) => a.part - b.part);
}

const agregerParTemps = (lignes) =>
  agreger(lignes, { prefixe: "c:", nommer: (cle) => NOM_TEMPS[cle.split(":")[2]] });

const agregerParTheme = (lignes) =>
  agreger(lignes, { prefixe: "v:", nommer: (cle) => PAR_ID[cle.slice(2)]?.unite });

/* Espace enseignant.

   Séparé du parcours élève : accessible depuis un lien discret sur l'écran
   de connexion, jamais depuis l'intérieur de l'application. Protégé par un
   vrai compte (Supabase Auth), pas par un mot de passe écrit dans le code —
   un mot de passe dans le code source est lisible par n'importe quel élève
   en trois clics, ce n'est pas une protection.

   Conçu pour un seul enseignant et quelques classes, pas pour un
   établissement entier : pas de rôles, pas de permissions déléguées. */

const AUJOURDHUI = () => new Date().toISOString().slice(0, 10).replace(/^20/, "");

/* Le nom d'une classe est libre — « Enseignants — test » doit rester lisible
   à l'écran. Le code d'un élève, lui, doit rester court : c'est ce préfixe,
   dérivé automatiquement du nom mais éditable, qui sert à construire les
   codes plutôt que le nom entier. */
function slugCode(s) {
  return (
    s.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10) || "CLASSE"
  );
}

export default function Enseignant({ onFin }) {
  const [session, setSession] = useState(undefined); // undefined = en cours de vérification
  const [erreurAuth, setErreurAuth] = useState(null);

  useEffect(() => {
    sessionEnseignant().then(setSession);
  }, []);

  if (!enLigne) {
    return (
      <Cadre onFin={onFin} titre="Espace enseignant">
        <p className="note">
          Supabase n'est pas configuré sur cet appareil. L'espace enseignant
          a besoin d'une connexion à la base de données pour fonctionner.
        </p>
      </Cadre>
    );
  }

  if (session === undefined) {
    return <Cadre onFin={onFin} titre="Espace enseignant"><p className="note">Chargement…</p></Cadre>;
  }

  if (!session) {
    return (
      <Cadre onFin={onFin} titre="Espace enseignant">
        <FormulaireConnexion onConnecte={setSession} erreur={erreurAuth} setErreur={setErreurAuth} />
      </Cadre>
    );
  }

  return (
    <Cadre onFin={onFin} titre="Espace enseignant"
      surTitre={session.user.email}
      action={<button className="lien" onClick={async () => { await deconnexionEnseignant(); setSession(null); }}>
        Se déconnecter
      </button>}>
      <TableauDeBord />
    </Cadre>
  );
}

function Cadre({ titre, surTitre, action, onFin, children }) {
  return (
    <>
      <div className="bar">
        <div className="wrap barIn">
          <button className="lien" onClick={onFin}>← Retour</button>
          <span className="sur">{surTitre || "enseignant"}</span>
          {action || <span style={{ width: 60 }} />}
        </div>
      </div>
      <div className="main wrap">
        <h1 className="dsp" style={{ fontSize: 28, marginBottom: 18 }}>{titre}</h1>
        {children}
      </div>
    </>
  );
}

function FormulaireConnexion({ onConnecte, erreur, setErreur }) {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [attente, setAttente] = useState(false);

  const connecter = async () => {
    setAttente(true); setErreur(null);
    const res = await connexionEnseignant(email.trim(), mdp);
    setAttente(false);
    if (res.erreur) setErreur(res.erreur);
    else onConnecte(res.session);
  };

  return (
    <div style={{ maxWidth: 360 }}>
      <p className="note" style={{ marginBottom: 18 }}>
        Réservé à votre compte. Le mot de passe se règle dans Supabase,
        sous Authentication → Users.
      </p>
      <input className="champ" type="email" placeholder="votre e-mail"
        value={email} onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: 10 }} autoFocus />
      <input className="champ" type="password" placeholder="mot de passe"
        value={mdp} onChange={(e) => setMdp(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && connecter()}
        style={{ marginBottom: 10 }} />
      {erreur && <p className="note" style={{ color: "var(--rouge)", marginBottom: 10 }}>{erreur}</p>}
      <button className="btn" disabled={attente || !email || !mdp} onClick={connecter}>
        {attente ? "Connexion…" : "Se connecter"}
      </button>
    </div>
  );
}

function TableauDeBord() {
  const [lignes, setLignes] = useState(null);
  const [erreur, setErreur] = useState(null);
  const [creation, setCreation] = useState(false);

  const charger = async () => {
    const res = await listerSuivi();
    if (res.erreur) setErreur(res.erreur);
    else { setLignes(res.lignes); setErreur(null); }
  };
  useEffect(() => { charger(); }, []);

  const classes = useMemo(() => {
    if (!lignes) return [];
    const par = {};
    for (const l of lignes) (par[l.classe] = par[l.classe] || []).push(l);
    return Object.entries(par).sort(([a], [b]) => a.localeCompare(b));
  }, [lignes]);

  if (erreur) {
    return (
      <div>
        <p className="note" style={{ color: "var(--rouge)" }}>{erreur}</p>
        {erreur.includes("does not exist") && (
          <p className="note" style={{ marginTop: 8 }}>
            La table des codes n'est pas encore créée. Exécutez{" "}
            <code>supabase/enseignant.sql</code> dans Supabase → SQL Editor.
          </p>
        )}
      </div>
    );
  }
  if (!lignes) return <p className="note">Chargement…</p>;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <p className="note" style={{ margin: 0 }}>
          {lignes.length} élève{lignes.length > 1 ? "s" : ""} · {classes.length} classe{classes.length > 1 ? "s" : ""}
        </p>
        <button className="btn2" onClick={() => setCreation(!creation)}>
          {creation ? "Fermer" : "+ Nouvelle classe"}
        </button>
      </div>

      {creation && <CreerClasse onFait={() => { setCreation(false); charger(); }} />}

      {classes.length === 0 && !creation && (
        <p className="note">Aucune classe pour l'instant. Créez-en une pour générer des codes.</p>
      )}

      {classes.map(([nom, eleves]) => (
        <Classe key={nom} nom={nom} eleves={eleves} onChange={charger} />
      ))}
    </>
  );
}

function CreerClasse({ onFait }) {
  const [classe, setClasse] = useState("");
  const [prefixe, setPrefixe] = useState("");
  const [prefixeTouche, setPrefixeTouche] = useState(false);
  const [filiere, setFiliere] = useState("gymnase");
  const [nb, setNb] = useState(20);
  const [noms, setNoms] = useState("");
  const [attente, setAttente] = useState(false);

  // Le préfixe suit le nom tant qu'on n'y a pas touché soi-même — comme un
  // champ d'URL qui se déduit d'un titre, mais reste modifiable.
  const changerClasse = (v) => {
    setClasse(v);
    if (!prefixeTouche) setPrefixe(slugCode(v));
  };

  // Une liste collée (un nom par ligne) prime sur le nombre saisi : c'est
  // elle qui fixe combien de codes créer, dans le même ordre.
  const listeNoms = noms.split("\n").map((n) => n.trim()).filter(Boolean);
  const total = listeNoms.length || nb;
  const prefixeFinal = (prefixe || slugCode(classe)).slice(0, 12);

  const creer = async () => {
    if (!classe.trim()) return;
    setAttente(true);
    const annee = AUJOURDHUI();
    const lignes = Array.from({ length: total }, (_, i) => ({
      code: `${annee}-${prefixeFinal}-${String(i + 1).padStart(2, "0")}`,
      classe: classe.trim(), filiere, annee,
      nom: listeNoms[i] || null,
    }));
    const res = await ajouterCodes(lignes);
    setAttente(false);
    if (!res.erreur) onFait();
  };

  return (
    <div className="carte" style={{ marginBottom: 20 }}>
      <div className="sur" style={{ marginBottom: 12 }}>Nouvelle classe</div>
      <div style={{ display: "grid", gap: 10 }}>
        <input className="champ" placeholder="nom de classe ou de groupe, ex. 4a"
          value={classe} onChange={(e) => changerClasse(e.target.value)} style={{ fontSize: 15 }} />

        <div>
          <input className="champ mono" maxLength={12}
            value={prefixeFinal}
            onChange={(e) => { setPrefixe(e.target.value.toUpperCase()); setPrefixeTouche(true); }}
            style={{ fontSize: 14, letterSpacing: ".05em" }} />
          <p className="note" style={{ fontSize: 12, margin: "5px 0 0" }}>
            Ce préfixe apparaît dans le code de chaque élève, ex. {AUJOURDHUI()}-{prefixeFinal}-01.
            Raccourcissez-le si le nom de classe est long.
          </p>
        </div>

        <div className="tab">
          {FILIERES.map((f) => (
            <button key={f.cle} className={filiere === f.cle ? "on" : ""}
              onClick={() => setFiliere(f.cle)}>{f.nom}</button>
          ))}
        </div>

        <textarea className="champ" rows={5}
          placeholder={"Liste de noms, un par ligne (facultatif)\nDupont Élise\nMartin Noah\n…"}
          value={noms} onChange={(e) => setNoms(e.target.value)}
          style={{ fontSize: 13.5, resize: "vertical", lineHeight: 1.6 }} />
        <p className="note" style={{ fontSize: 12, margin: 0 }}>
          Les noms restent visibles seulement par vous. Les codes ne les
          contiennent jamais et sont ceux que les élèves saisiront.
        </p>

        {!listeNoms.length && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="note" style={{ fontSize: 13 }}>Nombre d'élèves</span>
            <input className="champ" type="number" min="1" max="40" value={nb}
              onChange={(e) => setNb(Number(e.target.value))}
              style={{ width: 80, fontSize: 15, padding: "10px 12px" }} />
          </div>
        )}

        <button className="btn" disabled={attente || !classe.trim() || !prefixeFinal} onClick={creer}>
          {attente ? "Création…" : `Créer ${total} code${total > 1 ? "s" : ""}`}
        </button>
      </div>
    </div>
  );
}

function Classe({ nom, eleves, onChange }) {
  const [ouvert, setOuvert] = useState(false);
  const [ajout, setAjout] = useState(false);
  const [confirmSuppr, setConfirmSuppr] = useState(false);
  const [suppression, setSuppression] = useState(false);
  const actifs = eleves.filter((e) => e.actif);
  const travaillent = actifs.filter((e) => e.elements_travailles > 0).length;

  const basculer = () => { setOuvert(!ouvert); setConfirmSuppr(false); setAjout(false); };

  const supprimer = async () => {
    if (!confirmSuppr) { setConfirmSuppr(true); return; }
    setSuppression(true);
    const res = await supprimerCodes(eleves.map((e) => e.code));
    setSuppression(false);
    if (!res.erreur) onChange();
  };

  return (
    <div className="carte" style={{ marginBottom: 14 }}>
      <button style={{ width: "100%", textAlign: "left" }} onClick={basculer}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span className="h2">{nom}</span>
          <span className="mono" style={{ fontSize: 12, color: "var(--ardoise)" }}>
            {eleves[0].filiere === "gymnase" ? "Gymnase" : "FMS"} · {actifs.length} actifs
          </span>
        </div>
        <div className="note" style={{ fontSize: 13, marginTop: 4 }}>
          {travaillent}/{actifs.length} ont déjà commencé à travailler
        </div>
      </button>

      {ouvert && (
        <div style={{ marginTop: 16, borderTop: "1px solid var(--trait)", paddingTop: 14 }}>
          <PointsFaibles codes={actifs.map((e) => e.code)} />

          <div className="listeC" style={{ boxShadow: "none", marginTop: 18 }}>
            {eleves.map((e) => (
              <LigneEleve key={e.code} e={e} onChange={onChange} />
            ))}
          </div>

          {ajout && (
            <AjouterEleves nom={nom} filiere={eleves[0].filiere} eleves={eleves}
              onFait={() => { setAjout(false); onChange(); }} />
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
            <button className="btn2" onClick={() => setAjout(!ajout)}>
              {ajout ? "Fermer" : "+ Ajouter des élèves"}
            </button>
            <button className="btn2" onClick={() => exporterCodes(nom, eleves)}>
              Copier la liste des codes
            </button>
            <button className="btn2"
              style={confirmSuppr ? { borderColor: "var(--rouge)", color: "var(--rouge)" } : undefined}
              disabled={suppression} onClick={supprimer}>
              {suppression
                ? "Suppression…"
                : confirmSuppr
                ? `Confirmer : effacer ${nom} et ses ${eleves.length} élève${eleves.length > 1 ? "s" : ""}`
                : "Supprimer la classe"}
            </button>
          </div>
          {confirmSuppr && (
            <p className="note" style={{ color: "var(--rouge)", fontSize: 12, marginTop: 8 }}>
              Cela efface aussi tout l'historique de progression des {eleves.length} élèves. Irréversible.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function AjouterEleves({ nom, filiere, eleves, onFait }) {
  const [noms, setNoms] = useState("");
  const [nb, setNb] = useState(5);
  const [attente, setAttente] = useState(false);

  // On reprend exactement le même préfixe que les codes déjà créés pour
  // cette classe, en repartant du premier numéro libre — pas d'année ni de
  // préfixe à ressaisir, et aucun risque de collision avec un élève existant,
  // même désactivé, puisque son numéro reste réservé.
  const prefixe = eleves[0].code.replace(/-\d+$/, "");
  const annee = prefixe.split("-")[0];
  const dernier = Math.max(
    0, ...eleves.map((e) => parseInt(e.code.match(/-(\d+)$/)?.[1] || "0", 10))
  );

  const listeNoms = noms.split("\n").map((n) => n.trim()).filter(Boolean);
  const total = listeNoms.length || nb;

  const ajouter = async () => {
    setAttente(true);
    const lignes = Array.from({ length: total }, (_, i) => ({
      code: `${prefixe}-${String(dernier + i + 1).padStart(2, "0")}`,
      classe: nom, filiere, annee,
      nom: listeNoms[i] || null,
    }));
    const res = await ajouterCodes(lignes);
    setAttente(false);
    if (!res.erreur) onFait();
  };

  return (
    <div className="carte" style={{ margin: "14px 0", background: "#FAFBFC" }}>
      <div className="sur" style={{ marginBottom: 10 }}>
        Ajouter à {nom} — à partir de {prefixe}-{String(dernier + 1).padStart(2, "0")}
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        <textarea className="champ" rows={4}
          placeholder={"Liste de noms, un par ligne (facultatif)\nDupont Élise\n…"}
          value={noms} onChange={(e) => setNoms(e.target.value)}
          style={{ fontSize: 13.5, resize: "vertical", lineHeight: 1.6 }} />
        {!listeNoms.length && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="note" style={{ fontSize: 13 }}>Nombre d'élèves à ajouter</span>
            <input className="champ" type="number" min="1" max="40" value={nb}
              onChange={(e) => setNb(Number(e.target.value))}
              style={{ width: 80, fontSize: 15, padding: "10px 12px" }} />
          </div>
        )}
        <button className="btn" disabled={attente} onClick={ajouter}>
          {attente ? "Ajout…" : `Ajouter ${total} élève${total > 1 ? "s" : ""}`}
        </button>
      </div>
    </div>
  );
}

function PointsFaibles({ codes }) {
  const [lignes, setLignes] = useState(null);
  const [ouvert, setOuvert] = useState(false);
  const [erreur, setErreur] = useState(null);

  const charger = async () => {
    if (lignes) { setOuvert(!ouvert); return; }
    const res = await listerProgressionClasse(codes);
    if (res.erreur) { setErreur(res.erreur); return; }
    setLignes(res.lignes);
    setOuvert(true);
  };

  const temps = useMemo(() => (lignes ? agregerParTemps(lignes) : []), [lignes]);
  const themes = useMemo(() => (lignes ? agregerParTheme(lignes) : []), [lignes]);

  return (
    <div>
      <button className="btn2" onClick={charger}>
        {ouvert ? "Masquer les points faibles" : "Voir les points faibles de la classe"}
      </button>
      {erreur && <p className="note" style={{ color: "var(--rouge)", marginTop: 8 }}>{erreur}</p>}

      {ouvert && lignes && (
        <div style={{ marginTop: 16 }}>
          {temps.length === 0 && themes.length === 0 ? (
            <p className="note">
              Pas encore assez de données pour dégager une tendance de classe.
            </p>
          ) : (
            <>
              {temps.length > 0 && <Jauges titre="Par temps du verbe" lignes={temps} />}
              {themes.length > 0 && <Jauges titre="Par thème" lignes={themes.slice(0, 8)} />}
              <p className="note" style={{ fontSize: 11.5, marginTop: 4 }}>
                Ne sont affichés que les points travaillés par au moins
                {" "}{SEUIL_SIGNIFICATIF} couples élève-mot, pour qu'un seul élève ne fausse pas le tableau.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function Jauges({ titre, lignes }) {
  const couleur = (p) => (p >= 70 ? "var(--vert)" : p >= 40 ? "var(--ambre)" : "var(--rouge)");
  return (
    <div style={{ marginBottom: 18 }}>
      <div className="sur" style={{ marginBottom: 10 }}>{titre}</div>
      <div style={{ display: "grid", gap: 9 }}>
        {lignes.map((l) => (
          <div key={l.nom}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, marginBottom: 4 }}>
              <span style={{ fontWeight: 600 }}>{l.nom}</span>
              <span className="mono" style={{ color: "var(--ardoise)", fontSize: 12 }}>{l.part}%</span>
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

function LigneEleve({ e, onChange }) {
  const [nom, setNom] = useState(e.nom || "");
  const [sauve, setSauve] = useState(false);
  const [confirmSuppr, setConfirmSuppr] = useState(false);
  useEffect(() => { setNom(e.nom || ""); }, [e.nom]);

  const bascule = async () => { await activerCode(e.code, !e.actif); onChange(); };
  const sauver = async () => {
    if (nom === (e.nom || "")) return;
    setSauve(true);
    await renommerCode(e.code, nom);
    setSauve(false);
    onChange();
  };
  const supprimer = async () => {
    if (!confirmSuppr) { setConfirmSuppr(true); return; }
    await supprimerCodes([e.code]);
    onChange();
  };
  const derniereActivite = e.derniere_activite
    ? new Date(e.derniere_activite).toLocaleDateString("fr-CH")
    : "jamais";
  const examen = e.dernier_examen_total
    ? `${Math.round((e.dernier_examen_score / e.dernier_examen_total) * 100)} %`
    : "—";

  return (
    <div className="rang" style={{ flexDirection: "column", alignItems: "stretch", gap: 6, opacity: e.actif ? 1 : 0.45 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <input
          value={nom} placeholder="Nom (facultatif, visible par vous seul)"
          onChange={(ev) => setNom(ev.target.value)}
          onBlur={sauver}
          onKeyDown={(ev) => ev.key === "Enter" && ev.target.blur()}
          style={{
            flex: 1, border: "none", borderBottom: "1px solid var(--trait)",
            background: "transparent", fontSize: 13.5, padding: "2px 0",
            color: nom ? "var(--encre)" : "var(--ardoise)",
          }}
        />
        <span className="mono" style={{ fontSize: 11.5, color: "var(--ardoise)", flexShrink: 0 }}>
          {e.code}{sauve ? " · …" : ""}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <span className="rangDe" style={{ fontSize: 12.5 }}>
          {e.parfaitement_connus} acquis · dernier examen {examen} · vu le {derniereActivite}
        </span>
        <span style={{ display: "flex", gap: 12, flexShrink: 0 }}>
          <button className="lien" style={{ fontSize: 12 }} onClick={bascule}>
            {e.actif ? "Retirer" : "Réactiver"}
          </button>
          <button className="lien" style={{ fontSize: 12, color: confirmSuppr ? "var(--rouge)" : undefined }}
            onClick={supprimer}>
            {confirmSuppr ? "Confirmer ?" : "Supprimer"}
          </button>
        </span>
      </div>
    </div>
  );
}

function exporterCodes(nom, eleves) {
  const texte = eleves.map((e) => e.code).join("\n");
  navigator.clipboard?.writeText(texte);
}
