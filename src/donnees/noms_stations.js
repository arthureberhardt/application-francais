/* Les noms de station : un ou deux mots, comme sur un plan de métro.
   Le titre d'origine reste visible comme « thème » sous le nom.          */

export const NOMS_STATIONS = {
  /* ── Gymnase S1 ── */
  "S1-U0": "Fondations", "S1-U1": "Rencontres", "S1-U2": "Calendrier", "S1-U3": "Foyer", "S1-U4": "Marché",
  "S1-U5": "Carrefour", "S1-U6": "Montmartre", "S1-U7": "Récréation",
  "S1-L1": "Commissariat", "S1-L2": "Interrogatoire", "S1-L3": "Alibi", "S1-L4": "Fausse Piste", "S1-L5": "Aveux",
  /* ── S2 ── */
  "S2-U1": "Enfance", "S2-U2": "Anecdote", "S2-U3": "Grand Départ", "S2-U4": "Faits Divers", "S2-U5": "Stade",
  "S2-U6": "Carnaval", "S2-U7": "Nostalgie",
  "S2-L1": "Aéroport", "S2-L2": "Dépaysement", "S2-L3": "Malentendu", "S2-L4": "Complicité", "S2-L5": "Tournant", "S2-L6": "Retour",
  /* ── S3 ── */
  "S3-U1": "Avenir", "S3-U2": "Orientation", "S3-U3": "Entreprise", "S3-U4": "Bien-Être", "S3-U5": "Agora",
  "S3-U6": "Galerie", "S3-U7": "Cinéma",
  "S3-L1": "Couverture", "S3-L2": "Dilemme", "S3-L3": "Réplique", "S3-L4": "Message", "S3-L5": "Critique",
  /* ── S4 ── */
  "S4-U1": "Hypothèse", "S4-U2": "Réseau", "S4-U3": "Soldes", "S4-U4": "Francophonie", "S4-U5": "Verlan",
  "S4-U6": "Réconciliation", "S4-U7": "Utopie",
  "S4-L1": "Club", "S4-L2": "Deux Rives", "S4-L3": "Narrateur", "S4-L4": "Préjugés", "S4-L5": "Débat",
  /* ── S5 ── */
  "S5-U1": "Porte-Parole", "S5-U2": "Kiosque", "S5-U3": "La Une", "S5-U4": "Écoquartier", "S5-U5": "Tribunal",
  "S5-U6": "Forum", "S5-U7": "Dystopie",
  "S5-L1": "Incipit", "S5-L2": "Absurde", "S5-L3": "Métaphore", "S5-L4": "Mouvements", "S5-L5": "Huis Clos",
  /* ── S6 ── */
  "S6-U1": "Nécessité", "S6-U2": "Émotions", "S6-U3": "Grande École", "S6-U4": "Égalité", "S6-U5": "Miroir",
  "S6-U6": "Réclamation", "S6-U7": "Tribune",
  "S6-L1": "La Chute", "S6-L2": "Fantastique", "S6-L3": "Coulisses", "S6-L4": "Panorama", "S6-L5": "Confrontation",
  /* ── S7 ── */
  "S7-U1": "Figures", "S7-U2": "Lumières", "S7-U3": "Bastille", "S7-U4": "Climat", "S7-U5": "Laboratoire",
  "S7-U6": "Engagement", "S7-U7": "Dialectique",
  "S7-L1": "Candide", "S7-L2": "Ironie", "S7-L3": "La Fontaine", "S7-L4": "Mascarade", "S7-L5": "Commentaire",
  /* ── S8 ── */
  "S8-U1": "Palais Fédéral", "S8-U2": "Éthique", "S8-U3": "Bourse", "S8-U4": "Style", "S8-U5": "Siècles",
  "S8-U6": "Rédaction", "S8-U7": "Grand Oral",
  "S8-L1": "Palais-Royal", "S8-L2": "Tartuffe", "S8-L3": "Versailles", "S8-L4": "Correspondances", "S8-L5": "Terminus",

  /* ── FMS S1 ── */
  "F1-U0": "Fondations", "F1-U1": "Rencontres", "F1-U2": "Horloge", "F1-U3": "Foyer", "F1-U4": "Carrefour",
  "F1-U5": "Marché", "F1-U6": "Temps Libre",
  "F1-L1": "Enveloppe", "F1-L2": "Père-Lachaise", "F1-L3": "Alibi", "F1-L4": "Aveux",
  /* ── FMS S2 ── */
  "F2-U0": "Fondations", "F2-U1": "Réveil", "F2-U2": "Samedi Soir", "F2-U3": "Enfance", "F2-U4": "Stade",
  "F2-U5": "Boutique", "F2-U6": "Léman",
  "F2-L1": "Nouvelle", "F2-L2": "Héros", "F2-L3": "Soudain", "F2-L4": "Dénouement",
  /* ── FMS S3 ── */
  "F3-U0": "Fondations", "F3-U1": "Métiers", "F3-U2": "Stage", "F3-U3": "Fourneaux", "F3-U4": "Bien-Être",
  "F3-U5": "Messagerie", "F3-U6": "Avenir",
  "F3-L1": "Rideau", "F3-L2": "Répétition", "F3-L3": "Marée Haute", "F3-L4": "Applaudissements",
  /* ── FMS S4 ── */
  "F4-U1": "Francophonie", "F4-U2": "Réseau", "F4-U3": "Atelier", "F4-U4": "Hypothèse", "F4-U5": "Réconciliation",
  "F4-U6": "Climat",
  "F4-L1": "Club", "F4-L2": "Deux Rives", "F4-L3": "Citation", "F4-L4": "Débat",
  /* ── FMS S5 ── */
  "F5-U1": "Hôpital", "F5-U2": "Crèche", "F5-U3": "Faits Divers", "F5-U4": "Banlieue", "F5-U5": "Miroir",
  "F5-U6": "Tribune",
  "F5-L1": "La Cité", "F5-L2": "Voisinage", "F5-L3": "Commissariat", "F5-L4": "Égalité",
  /* ── FMS S6 ── */
  "F6-U1": "Solidarité", "F6-U2": "Repair Café", "F6-U3": "Émotions", "F6-U4": "Lecture", "F6-U5": "Examen",
  "F6-U6": "Grand Oral",
  "F6-L1": "Bibliothèque", "F6-L2": "Résumé", "F6-L3": "Extrait", "F6-L4": "Terminus",
};

/** Donne à une unité ou une station son nom de station ; l'ancien titre devient le thème. */
export const nommer = (u) => (NOMS_STATIONS[u.id] ? { ...u, theme: u.titre, titre: NOMS_STATIONS[u.id] } : u);
