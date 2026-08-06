-- ============================================================
--  Base de données — application de vocabulaire
--  À exécuter une seule fois dans Supabase : SQL Editor → New query → coller → Run
-- ============================================================

-- Une ligne par élève et par élément (mot ou couple verbe × temps).
create table if not exists progression (
  code    text        not null,           -- le code pseudonyme de l'élève
  cle     text        not null,           -- identifiant de l'élément, ex. "v:S1-042"
  boite   smallint    not null default 1, -- boîte de Leitner, 1 à 5
  ok      smallint    not null default 0, -- réussites espacées cumulées
  essais  integer     not null default 0,
  du      bigint      not null default 0, -- prochaine échéance (millisecondes)
  maj     timestamptz not null default now(),
  primary key (code, cle)
);

create index if not exists progression_code_idx on progression (code);

-- ============================================================
--  Sécurité
-- ============================================================
-- L'application n'utilise pas de comptes nominatifs : chaque élève entre un code.
-- La clé « anon » est publique par nature (elle est dans le code du site).
-- On active donc RLS et on autorise lecture et écriture sur cette table seule.
--
-- Ce que cela implique, en clair : un élève qui connaîtrait le code d'un autre
-- pourrait voir et modifier sa progression. Comme aucune donnée personnelle
-- n'est stockée — ni nom, ni adresse, ni date de naissance — le risque porte
-- sur des scores de vocabulaire, pas sur des données sensibles.
--
-- Si vous voulez fermer cela plus tard : ajoutez une colonne « jeton » remplie
-- à la première connexion, et exigez-la dans les politiques ci-dessous.

alter table progression enable row level security;

drop policy if exists progression_lecture on progression;
create policy progression_lecture
  on progression for select
  using (true);

drop policy if exists progression_ecriture on progression;
create policy progression_ecriture
  on progression for insert
  with check (true);

drop policy if exists progression_maj on progression;
create policy progression_maj
  on progression for update
  using (true) with check (true);

-- ============================================================
--  Vue pratique : où en est chaque classe
--  (Supabase → Table editor → progression_resume)
-- ============================================================
create or replace view progression_resume as
select
  code,
  count(*)                                             as elements_travailles,
  count(*) filter (where boite >= 5 and ok >= 5)       as parfaitement_connus,
  count(*) filter (where boite between 3 and 4)        as vus,
  count(*) filter (where boite <= 2)                   as non_connus,
  max(maj)                                             as derniere_activite
from progression
group by code
order by derniere_activite desc;
