/* La liste des codes en document Word : une page d'explications (en
   allemand, pour les élèves), puis un tableau par classe. Chargé à la
   demande : la bibliothèque docx ne pèse rien pour les élèves. */

const URL_APP = "https://application-francais.vercel.app";

export async function exporterCodesWord(classes, nomFichier = "codes-francais.docx") {
  const {
    Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell,
    WidthType, AlignmentType, ShadingType, BorderStyle,
  } = await import("docx");

  const police = "Calibri";
  const t = (texte, o = {}) => new TextRun({ text: texte, font: police, size: 22, ...o });
  const p = (enfants, o = {}) => new Paragraph({ children: Array.isArray(enfants) ? enfants : [t(enfants)], spacing: { after: 120 }, ...o });
  const bord = { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" };
  const bords = { top: bord, bottom: bord, left: bord, right: bord };
  const cellule = (texte, { entete = false, largeur, mono = false } = {}) => new TableCell({
    borders: bords,
    width: { size: largeur, type: WidthType.DXA },
    shading: entete ? { type: ShadingType.CLEAR, fill: "1B2A41", color: "auto" } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({ children: [t(texte, { bold: entete || mono, color: entete ? "FFFFFF" : undefined, font: mono ? "Consolas" : police })] })],
  });
  const LARGEURS = [4400, 2800, 1826];

  const sections = [];
  sections.push(
    new Paragraph({ heading: HeadingLevel.TITLE, children: [t("Französisch-App: deine Zugangscodes", { size: 40, bold: true })] }),
    p("So meldest du dich an:"),
    p([t("1. Öffne "), t(URL_APP, { bold: true }), t(" auf dem Handy oder dem Laptop.")]),
    p("2. Tipp auf «Gymnase» oder «FMS» (je nach deiner Schule)."),
    p("3. Gib deinen Code genau so ein, wie er unten steht, und tipp auf «Composter et entrer»."),
    p("Die App merkt sich deinen Code: Du musst ihn nur einmal eingeben. Auf dem Handy kannst du die App auf den Home-Bildschirm legen (Teilen → «Zum Home-Bildschirm»)."),
    p([t("Wichtig: ", { bold: true }), t("Der Code ist persönlich. Gib ihn nicht weiter – deine Lehrperson sieht damit deinen Fortschritt und deine Texte.")]),
  );

  for (const [nom, eleves] of classes) {
    const actifs = eleves.filter((e) => e.actif !== false)
      .sort((a, b) => a.code.localeCompare(b.code, "de", { numeric: true }));
    if (!actifs.length) continue;
    sections.push(
      new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 160 },
        children: [t(`Klasse ${nom}`, { size: 30, bold: true })] }),
      new Table({
        width: { size: LARGEURS.reduce((a, b) => a + b, 0), type: WidthType.DXA },
        columnWidths: LARGEURS,
        rows: [
          new TableRow({ tableHeader: true, children: [
            cellule("Name", { entete: true, largeur: LARGEURS[0] }),
            cellule("Code", { entete: true, largeur: LARGEURS[1] }),
            cellule("Schule", { entete: true, largeur: LARGEURS[2] }),
          ] }),
          ...actifs.map((e) => new TableRow({ children: [
            cellule(e.nom || "—", { largeur: LARGEURS[0] }),
            cellule(e.code, { largeur: LARGEURS[1], mono: true }),
            cellule(e.filiere === "fms" ? "FMS" : "Gymnase", { largeur: LARGEURS[2] }),
          ] })),
        ],
      }),
    );
  }

  const doc = new Document({
    styles: { default: { document: { run: { font: police, size: 22 } } } },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
      children: sections,
    }],
  });
  const blob = await Packer.toBlob(doc);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = nomFichier;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
