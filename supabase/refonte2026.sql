-- ============================================================
--  Refonte 2026 — à exécuter une fois, après schema.sql et enseignant.sql
--  Supabase → SQL Editor → New query → coller tout → Run
--  Le fichier peut être relancé sans risque.
-- ============================================================
--
-- Ajoute quatre choses :
--   1. « activite »      : combien de séances chaque code fait par jour
--                          (série de jours, objectif collectif de la classe) ;
--   2. « productions »   : les textes envoyés à la fin de chaque défi,
--                          que vous lisez et commentez dans l'espace enseignant ;
--   3. « fiches_cours »  : le lexique que vous ajoutez vous-même
--                          (par exemple celui du Maigret lu en classe) ;
--   4. les fonctions qui permettent à l'application élève d'y accéder sans
--      jamais pouvoir lister les codes ni les textes des autres.
--
-- Aucune donnée nominative : un code, une date, un nombre, un texte d'élève.

-- ============================================================
--  0 · Un code est-il actif ?  (utilisé par les règles d'accès)
-- ============================================================
-- La table « codes » n'est lisible que par vous. Une règle d'accès qui la
-- consulte directement échouerait donc pour un élève : on passe par une
-- fonction qui a le droit de la lire et ne répond que oui ou non.
create or replace function code_actif(p_code text)
returns boolean
language sql security definer stable set search_path = public
as $$
  select exists (select 1 from codes c where c.code = p_code and c.actif);
$$;
revoke all on function code_actif(text) from public;
grant execute on function code_actif(text) to anon, authenticated;

-- ============================================================
--  1 · Activité : séances par code et par jour
-- ============================================================
create table if not exists activite (
  code      text    not null references codes(code) on delete cascade,
  jour      date    not null,
  seances   integer not null default 0,
  questions integer not null default 0,
  primary key (code, jour)
);

alter table activite enable row level security;

-- les élèves n'y accèdent que par les fonctions ci-dessous
drop policy if exists activite_enseignant on activite;
create policy activite_enseignant on activite
  for select using (auth.role() = 'authenticated');

create or replace function noter_seance(p_code text, p_questions integer)
returns void
language plpgsql security definer set search_path = public
as $$
begin
  if not code_actif(p_code) then return; end if;
  insert into activite (code, jour, seances, questions)
  values (p_code, (now() at time zone 'Europe/Zurich')::date, 1, greatest(coalesce(p_questions, 0), 0))
  on conflict (code, jour) do update
    set seances = activite.seances + 1,
        questions = activite.questions + excluded.questions;
end;
$$;
revoke all on function noter_seance(text, integer) from public;
grant execute on function noter_seance(text, integer) to anon, authenticated;

-- Les jours travaillés d'un code : pour que la série suive d'un appareil à l'autre.
create or replace function mes_jours(p_code text)
returns table (jour date)
language sql security definer stable set search_path = public
as $$
  select a.jour from activite a
  where a.code = p_code and a.jour > current_date - 120
  order by a.jour;
$$;
revoke all on function mes_jours(text) from public;
grant execute on function mes_jours(text) to anon, authenticated;

-- L'objectif collectif : une seule ligne, sans aucun code ni nom.
-- Objectif du mois = 12 séances par élève actif de la classe.
create or replace function objectif_classe(p_code text)
returns table (classe text, eleves integer, actifs_semaine integer, seances_mois integer, objectif_mois integer)
language sql security definer stable set search_path = public
as $$
  with moi as (
    select c.classe from codes c
    where upper(c.code) = upper(trim(p_code)) and c.actif
    limit 1
  ),
  membres as (
    select c.code from codes c
    where c.actif and c.classe = (select classe from moi)
  )
  select
    (select classe from moi),
    (select count(*) from membres)::integer,
    (select count(distinct a.code) from activite a
       where a.code in (select code from membres) and a.jour > current_date - 7)::integer,
    (select coalesce(sum(a.seances), 0) from activite a
       where a.code in (select code from membres)
         and date_trunc('month', a.jour) = date_trunc('month', current_date))::integer,
    ((select count(*) from membres) * 12)::integer
  where exists (select 1 from moi);
$$;
revoke all on function objectif_classe(text) from public;
grant execute on function objectif_classe(text) to anon, authenticated;

-- ============================================================
--  2 · Productions : les textes des défis
-- ============================================================
create table if not exists productions (
  id          bigint generated always as identity primary key,
  code        text not null references codes(code) on delete cascade,
  unite       text not null,
  consigne    text,
  texte       text not null check (char_length(texte) between 1 and 5000),
  cree        timestamptz not null default now(),
  statut      text not null default 'nouvelle' check (statut in ('nouvelle', 'lue')),
  commentaire text,
  lue         timestamptz
);

create index if not exists productions_code_idx on productions (code);

alter table productions enable row level security;

-- Un élève peut déposer un texte sous un code actif — rien d'autre.
drop policy if exists productions_depot on productions;
create policy productions_depot on productions
  for insert to anon, authenticated
  with check (code_actif(code) and statut = 'nouvelle' and commentaire is null);

-- Vous seul lisez, commentez et supprimez.
drop policy if exists productions_lecture on productions;
create policy productions_lecture on productions
  for select using (auth.role() = 'authenticated');

drop policy if exists productions_maj on productions;
create policy productions_maj on productions
  for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists productions_suppression on productions;
create policy productions_suppression on productions
  for delete using (auth.role() = 'authenticated');

-- L'élève retrouve ses propres textes et vos commentaires avec son code.
create or replace function mes_productions(p_code text)
returns table (id bigint, unite text, cree timestamptz, statut text, commentaire text, texte text)
language sql security definer stable set search_path = public
as $$
  select p.id, p.unite, p.cree, p.statut, p.commentaire, p.texte
  from productions p
  where p.code = p_code
  order by p.cree desc
  limit 50;
$$;
revoke all on function mes_productions(text) from public;
grant execute on function mes_productions(text) to anon, authenticated;

-- ============================================================
--  3 · Lexique du cours, saisi par vous
-- ============================================================
create table if not exists fiches_cours (
  id      bigint generated always as identity primary key,
  unite   text not null default 'S1-U7',   -- l'unité qui l'accueille
  fr      text not null,
  de      text not null,
  exemple text,
  cat     text not null default 'N',
  actif   boolean not null default true,
  cree    timestamptz not null default now()
);

alter table fiches_cours enable row level security;

drop policy if exists fiches_cours_lecture on fiches_cours;
create policy fiches_cours_lecture on fiches_cours
  for select using (true);

drop policy if exists fiches_cours_ecriture on fiches_cours;
create policy fiches_cours_ecriture on fiches_cours
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ============================================================
--  Pour vérifier que tout est en place :
--    select * from objectif_classe('UN-CODE-DE-TEST');
--  doit renvoyer une ligne avec le nom de la classe.
-- ============================================================
