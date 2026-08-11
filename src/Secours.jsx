import React from "react";

/* Sans ce filet, une erreur JavaScript n'importe où dans l'application — un
   champ manquant, une donnée inattendue — fait disparaître tout l'écran sans
   aucun message, comme c'est arrivé avec l'examen blanc. React arrête le
   rendu au premier composant qui plante, mais rien n'empêche de recharger. */
export default class Secours extends React.Component {
  constructor(props) {
    super(props);
    this.state = { erreur: null };
  }
  static getDerivedStateFromError(erreur) {
    return { erreur };
  }
  componentDidCatch(erreur, info) {
    console.error("Erreur non rattrapée :", erreur, info);
  }
  render() {
    if (!this.state.erreur) return this.props.children;
    return (
      <div style={{
        maxWidth: 440, margin: "90px auto", padding: "0 24px",
        fontFamily: "Avenir Next, system-ui, sans-serif", textAlign: "center",
      }}>
        <div style={{ fontSize: 15, color: "#5D6B84", letterSpacing: ".05em", marginBottom: 10 }}>
          une erreur est survenue
        </div>
        <h1 style={{ fontSize: 22, marginBottom: 14 }}>
          Quelque chose s'est mal passé
        </h1>
        <p style={{ fontSize: 15, color: "#5D6B84", marginBottom: 24, lineHeight: 1.6 }}>
          Votre progression déjà enregistrée n'est pas perdue. Rechargez la
          page pour continuer.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            background: "#14243A", color: "#fff", border: "none",
            borderRadius: 10, padding: "12px 28px", fontSize: 15,
            fontWeight: 600, cursor: "pointer",
          }}
        >
          Recharger
        </button>
      </div>
    );
  }
}
