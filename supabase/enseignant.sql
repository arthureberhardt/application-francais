-- ============================================================
--  Espace enseignant — à exécuter une fois, après schema.sql
--  Supabase → SQL Editor → New query → coller → Run
-- ============================================================
--
-- Ce fichier ajoute trois choses :
--   1. une table des codes valides, pour que l'application n'accepte
--      plus n'importe quel code tapé ;
--   2. une restriction sur la table progression, pour qu'un élève ne
--      puisse plus écrire sous un code qui n'existe pas ;
--   3. une vue de suivi par classe, réservée à votre compte.
--
-- Avant d'exécuter ce fichier, créez votre compte enseignant :
--   Authentication → Users → Add user → votre e-mail + un mot de passe.
--   Puis, dans Authentication → Providers → Email, désactivez
--   « Enable email signups » : personne d'autre ne pourra créer de compte.

-- ============================================================
--  1 · La table des codes
-- ============================================================
create table if not exists codes (
  code    text primary key,
  classe  text not null,                 -- ex. "4a", "3k", "F2d"
  filiere text not null default 'gymnase'
          check (filiere in ('gymnase', 'fms')),
  annee   text not null default to_char(now(), 'YY'),
  actif   boolean not null default true,
  cree    timestamptz not null default now()
);

create index if not exists codes_classe_idx on codes (classe);

alter table codes enable row level security;

-- Personne ne lit ou n'écrit directement cette table sauf vous, connecté.
drop policy if exists codes_enseignant on codes;
create policy codes_enseignant
  on codes for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- La seule porte d'entrée pour l'application élève : une fonction qui répond
-- « oui, ce code existe, voici sa classe et sa filière » — ou rien du tout.
-- Elle ne permet à personne de lister les codes, seulement de vérifier le sien.
create or replace function verifier_code(p_code text)
returns table (classe text, filiere text)
language sql security definer set search_path = public
as $$
  select c.classe, c.filiere
  from codes c
  where upper(c.code) = upper(trim(p_code)) and c.actif = true
  limit 1;
$$;

revoke all on function verifier_code(text) from public;
grant execute on function verifier_code(text) to anon, authenticated;

-- ============================================================
--  2 · La progression n'accepte plus qu'un code déclaré et actif
-- ============================================================
-- Tant que la table « codes » est vide, ces politiques laisseraient tout
-- bloqué : remplissez-la d'abord (voir la section 3 depuis l'application),
-- puis exécutez ce bloc.

drop policy if exists progression_lecture on progression;
create policy progression_lecture
  on progression for select
  using (true);  -- la lecture reste ouverte : c'est ce qui charge sa propre progression

drop policy if exists progression_ecriture on progression;
create policy progression_ecriture
  on progression for insert
  with check (
    exists (select 1 from codes c where c.code = progression.code and c.actif)
  );

drop policy if exists progression_maj on progression;
create policy progression_maj
  on progression for update
  using (
    exists (select 1 from codes c where c.code = progression.code and c.actif)
  )
  with check (
    exists (select 1 from codes c where c.code = progression.code and c.actif)
  );

-- ============================================================
--  3 · Vue de suivi par classe — réservée à votre compte
-- ============================================================
create or replace view suivi_classes as
select
  c.classe,
  c.filiere,
  c.code,
  c.actif,
  count(p.cle) filter (where p.boite > 0)                    as elements_travailles,
  count(p.cle) filter (where p.boite >= 5 and p.ok >= 5)      as parfaitement_connus,
  max(p.maj)                                                  as derniere_activite,
  (select p2.ok from progression p2
     where p2.code = c.code and p2.cle like 'examen:%'
     order by p2.maj desc limit 1)                            as dernier_examen_score,
  (select p2.essais from progression p2
     where p2.code = c.code and p2.cle like 'examen:%'
     order by p2.maj desc limit 1)                            as dernier_examen_total
from codes c
left join progression p on p.code = c.code
group by c.classe, c.filiere, c.code, c.actif
order by c.classe, c.code;

alter view suivi_classes set (security_invoker = true);

-- La vue hérite des politiques de « codes » : elle n'est donc lisible
-- que par vous, connecté. Rien à ajouter ici.

-- ============================================================
--  Pour retirer une volée sans perdre l'historique
-- ============================================================
--   update codes set actif = false where annee = '25';
--
-- Pour l'effacer complètement :
--   delete from progression where code in (select code from codes where annee = '25');
--   delete from codes where annee = '25';
