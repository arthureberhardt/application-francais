-- ============================================================
--  Stations de contrôle — à exécuter une fois, après refonte2026.sql
--  Supabase → SQL Editor → New query → coller tout → Run
--  Le fichier peut être relancé sans risque.
-- ============================================================
--
-- Pour chaque classe, vous fixez une date à laquelle une station (unité,
-- station de lecture) doit être validée. Les élèves voient la date sur
-- leur ligne ; vous voyez dans l'espace enseignant qui est à l'heure.

create table if not exists cibles (
  classe   text not null,
  station  text not null,
  jour     date not null,
  primary key (classe, station)
);

alter table cibles enable row level security;

-- vous seul lisez et modifiez la table ; les élèves passent par la fonction
drop policy if exists cibles_enseignant on cibles;
create policy cibles_enseignant on cibles
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Les dates de la classe d'un code : station et jour, rien d'autre.
create or replace function mes_cibles(p_code text)
returns table (station text, jour date)
language sql security definer stable set search_path = public
as $$
  select ci.station, ci.jour from cibles ci
  where ci.classe = (
    select c.classe from codes c
    where upper(c.code) = upper(trim(p_code)) and c.actif
    limit 1
  );
$$;
revoke all on function mes_cibles(text) from public;
grant execute on function mes_cibles(text) to anon, authenticated;
