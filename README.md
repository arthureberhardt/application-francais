# Vocabulaire et verbes — Gymnasium Oberwil

Application d'apprentissage du vocabulaire et des verbes français.
Huit semestres, 1 200 mots. Semestre 1 complet (fiches détaillées et
30 verbes au présent et à l'impératif) ; semestres 2 à 8 en vocabulaire seul
pour l'instant.

Connexion par **code pseudonyme** — ni nom, ni adresse, ni mot de passe.
Répétition espacée par **système de Leitner à cinq boîtes**.

---

## 1 · Faire tourner l'application sur votre ordinateur

Vous avez besoin de **Node.js**. Vérifiez s'il est déjà installé : ouvrez un
terminal dans VS Code (menu Terminal → Nouveau terminal) et tapez

```
node --version
```

Si une version s'affiche (18 ou plus), c'est bon. Sinon, installez-le depuis
<https://nodejs.org> — prenez la version « LTS ».

Ensuite, dans le terminal, à la racine de ce dossier :

```
npm install
npm run dev
```

Une adresse s'affiche, du type `http://localhost:5173`.
Ouvrez-la : l'application fonctionne.

À ce stade, **aucune base de données n'est nécessaire**. La progression est
enregistrée dans votre navigateur. C'est suffisant pour tester seul.

### Tester sur votre téléphone, sans rien déployer

Tant que l'ordinateur et le téléphone sont sur le **même réseau Wi-Fi** :

```
npm run dev:tel
```

Deux adresses s'affichent. Prenez celle appelée **Network**, du type
`http://192.168.1.34:5173`, et tapez-la dans le navigateur du téléphone.
L'interface est prévue pour les petits écrans.

Une fois l'application déployée (section suivante), elle s'ouvre depuis
n'importe quel téléphone avec une simple adresse web — et se pose sur l'écran
d'accueil comme une application : sur iPhone, bouton Partager → « Sur l'écran
d'accueil » ; sur Android, menu → « Ajouter à l'écran d'accueil ». Elle s'ouvre
alors en plein écran, sans barre de navigateur. Rien à publier sur l'App Store.

---

## 2 · Mettre l'application en ligne

Deux étapes, une trentaine de minutes.

### a. Publier le code sur GitHub

Dans VS Code, ouvrez l'onglet **Source Control** (l'icône avec des branches,
troisième dans la barre de gauche).

1. Cliquez sur **Initialize Repository**
2. Écrivez un message, par exemple `première version`, puis **Commit**
3. Cliquez sur **Publish Branch** et choisissez **privé**

Votre code est sur GitHub.

### b. Déployer sur Vercel

1. Créez un compte sur <https://vercel.com> en vous connectant avec GitHub
2. **Add New → Project**, choisissez votre dépôt
3. Vercel reconnaît Vite tout seul. Cliquez sur **Deploy**

Une adresse publique s'affiche. Chaque fois que vous ferez un **Commit** puis
un **Sync Changes** dans VS Code, le site se mettra à jour automatiquement.

---

## 3 · Brancher la base de données

Sans cette étape, un élève qui change d'appareil repart de zéro.

1. Créez un compte sur <https://supabase.com>, puis un projet
   (région : **Frankfurt** ou **Zurich**, pour que les données restent en Europe)
2. Dans le menu de gauche : **SQL Editor → New query**
3. Ouvrez le fichier `supabase/schema.sql` de ce dossier, copiez tout le
   contenu, collez-le, puis **Run**
4. Menu **Project Settings → API**. Copiez deux valeurs :
   - *Project URL*
   - *anon public* (la clé publique)
5. À la racine du projet, faites une copie de `.env.example` que vous nommez
   `.env`, et collez-y les deux valeurs :

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

6. Arrêtez le serveur (Ctrl+C dans le terminal) et relancez `npm run dev`

L'application détecte la configuration et bascule automatiquement.

7. Pour que le site en ligne y ait accès aussi : sur Vercel, **Settings →
   Environment Variables**, ajoutez les deux mêmes lignes, puis redéployez.

> Le fichier `.env` n'est **jamais** envoyé sur GitHub — il est exclu par
> `.gitignore`. C'est voulu.

---

## 4 · Suivre les élèves

Dans Supabase, **Table editor → progression_resume** : une ligne par code,
avec le nombre d'éléments parfaitement connus, vus, non connus, et la date de
dernière activité.

---

## 5 · Où se trouve quoi

```
src/
  App.jsx               aiguillage entre les trois écrans
  index.css             couleurs, typographie, mise en page
  donnees/
    mots.js             toutes les fiches, une seule fois (2 217)
    verbes.js           tous les verbes et leurs conjugaisons (220)
    temps.js            les temps qui existent
    filieres/
      gymnase.js        8 semestres, sortie B2.2
      fms.js            6 semestres, sortie B1
    index.js            rassemble le tout
  ecrans/
    Connexion.jsx       saisie du code
    Accueil.jsx         choix du semestre, tableau de bord, choix du mode
    Seance.jsx          déroulement d'une séance de 12 questions
    Commun.jsx          le rail des boîtes, les statistiques
  lib/
    leitner.js          la répétition espacée : boîtes, intervalles, catégories
    seance.js           comment se compose une séance (nouveaux / révisions)
    correction.js       comparaison des réponses et surlignage des erreurs
    questions.js        quelle question poser selon l'avancement
    items.js            construit la liste des éléments interrogeables
    store.js            enregistrement local ou Supabase
supabase/
  schema.sql            les tables à créer, une seule fois
```

### Deux filières, un seul contenu

Une fiche ne connaît ni son semestre ni sa filière. Ce sont les filières qui
citent les identifiants des mots qu'elles enseignent, et à quel moment.

Conséquence : **corriger une fiche corrige les deux filières**. Un exemple
amélioré, un piège ajouté profitent au gymnase comme à la FMS, sans recopie et
sans risque d'oublier une des deux.

Pour déplacer un mot d'un semestre à l'autre, il suffit de déplacer son
identifiant dans le fichier de filière. Les clés de progression étant liées aux
mots et non aux semestres, un élève ne perd rien.

### Ajouter du contenu

Les fiches sont dans `src/donnees/mots.js`. Pour enrichir un mot, remplissez
ses champs vides :

```js
{
  id: "S2-014",
  fr: "louer", de: "mieten",
  cat: "V", unite: "Logement", bloc: 3,
  construction: "louer qc à qn",          // ← à compléter
  exemple: "Nous louons un appartement.", // ← à compléter
  famille: "le loyer · la location",      // ← à compléter
  syn: "", ant: "", piege: ""
}
```

### Ajouter des verbes

Tous les verbes vivent dans `src/donnees/verbes.js`, avec le semestre où chacun
entre. Une entrée ressemble à ceci :

```js
{ inf: "choisir", de: "wählen", sem: 3,
  aux: "avoir", participe: "choisi", pronominal: false,
  present:   ["choisis","choisis","choisit","choisissons","choisissez","choisissent"],
  imperatif: ["choisis","choisissons","choisissez"],
  imparfait: ["choisissais","choisissais","choisissait","choisissions","choisissiez","choisissaient"] }
```

Mettez `imperatif: null` pour les verbes qui n'en ont pas (« pouvoir »).

### Ajouter un temps

Dans `src/donnees/temps.js`, ajoutez une ligne :

```js
{ cle: "futur", nom: "futur simple", sem: 3, type: "conjugaison" }
```

puis un champ `futur: [...]` sur chaque verbe concerné dans `verbes.js`.

**C'est tout.** Le principe cumulatif s'applique automatiquement : dès que le
futur entre en S3, les soixante verbes déjà connus sont interrogés au futur,
en plus du présent, de l'imparfait et du passé composé. Un verbe n'est acquis
que lorsqu'il est juste à tous les temps enseignés jusque-là.

Le type `"compose"` sert aux temps composés : l'application interroge alors le
participe passé, l'auxiliaire et la forme accordée, plutôt que six formes.

### Modifier les règles d'apprentissage

Tout est dans `src/lib/leitner.js` :

- `INTERVALLES` — le nombre de jours avant qu'une carte revienne, par boîte
- `SEUIL` — le nombre de réussites espacées pour « parfaitement connu »
- `categorie()` — la correspondance entre l'état et les trois catégories

Et dans `src/lib/seance.js` :

- `LONGUEUR` — le nombre de questions par séance (12)
- `NOUVEAUX_MAX` — le nombre de mots inédits par séance (4). Le reste est de
  la révision : c'est ce qui évite qu'une séance ne soit qu'une succession de
  premières rencontres.

---

## Protection des données

L'application ne collecte **aucune donnée personnelle** : pas de nom, pas
d'adresse, pas de date de naissance. Un code attribué en classe, et des
compteurs de vocabulaire.

Ce choix simplifie considérablement la conformité, mais ne dispense pas d'en
informer la direction et le délégué à la protection des données de
l'établissement avant tout usage avec des élèves.
